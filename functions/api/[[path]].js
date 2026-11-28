/**
 * API tài khoản & tiến độ Polylingo — Cloudflare Pages Functions + D1 (binding: DB).
 *
 *   POST /api/auth/register  { email, password, name? }
 *   POST /api/auth/login     { email, password }
 *   POST /api/auth/logout
 *   GET  /api/auth/me
 *   GET  /api/config                → { turnstileSiteKey|null }
 *   POST /api/auth/reset            { email, recoveryCode, newPassword }  (quên mật khẩu)
 *   POST /api/auth/change-password  { currentPassword, newPassword }
 *   POST /api/auth/recovery-code    { password } → mã khôi phục mới
 *   POST /api/auth/delete           { password }  (xóa tài khoản + tiến độ)
 *   GET  /api/progress       → { data|null, version, updatedAt }
 *   PUT  /api/progress       { data, baseVersion } → { version, updatedAt } | 409 { remote }
 *
 * Phiên đăng nhập: cookie HttpOnly "pl_session" (token ngẫu nhiên), D1 chỉ lưu SHA-256 của token.
 * Mật khẩu: PBKDF2-SHA256 100.000 vòng, salt 16 byte.
 */

const COOKIE = 'pl_session';
const SESSION_DAYS = 30;
const PBKDF2_ITER = 100000;
const MAX_PROGRESS_BYTES = 1900 * 1024;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_FAILS = 10;      // mỗi email
const LOGIN_MAX_FAILS_IP = 30;   // mỗi IP (trường học, quán net dùng chung IP)
const REGISTER_WINDOW_MS = 60 * 60 * 1000;
const REGISTER_MAX_PER_IP = 5;   // tối đa 5 tài khoản mới / IP / giờ

export async function onRequest(context) {
  const { request, env } = context;
  try {
    if (!env.DB) return json({ error: 'Máy chủ chưa gắn cơ sở dữ liệu (D1 binding "DB").' }, 503);

    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/api/, '').replace(/\/+$/, '') || '/';
    const method = request.method.toUpperCase();

    // Chống CSRF: yêu cầu ghi phải cùng nguồn và gửi JSON.
    if (method !== 'GET' && method !== 'HEAD') {
      const origin = request.headers.get('Origin');
      if (origin && origin !== url.origin) return json({ error: 'Nguồn yêu cầu không hợp lệ.' }, 403);
      const ct = request.headers.get('Content-Type') || '';
      if (!ct.includes('application/json')) return json({ error: 'Cần gửi JSON.' }, 415);
    }

    const route = `${method} ${path}`;
    switch (route) {
      case 'POST /auth/register': return await register(request, env);
      case 'POST /auth/login': return await login(request, env);
      case 'POST /auth/logout': return await logout(request, env);
      case 'GET /auth/me': return await me(request, env);
      case 'GET /config': return json({ turnstileSiteKey: env.TURNSTILE_SITE_KEY || null });
      case 'POST /auth/reset': return await resetPassword(request, env);
      case 'POST /auth/change-password': return await changePassword(request, env);
      case 'POST /auth/recovery-code': return await newRecoveryCode(request, env);
      case 'POST /auth/delete': return await deleteAccount(request, env);
      case 'GET /progress': return await getProgress(request, env);
      case 'PUT /progress': return await putProgress(request, env);
      default: return json({ error: 'Không tìm thấy.' }, 404);
    }
  } catch (e) {
    // Ghi log để xem được trong Cloudflare (Pages → Functions → Real-time logs). Không ghi body vì có mật khẩu.
    console.error('[api] lỗi', request.method, new URL(request.url).pathname, e && e.stack ? e.stack : e);
    return json({ error: 'Lỗi máy chủ. Vui lòng thử lại.' }, 500);
  }
}

/* ---------------- Tài khoản ---------------- */

async function register(request, env) {
  const body = await readJson(request);
  const email = normEmail(body.email);
  const password = typeof body.password === 'string' ? body.password : '';
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 40) : '';
  if (!email) return json({ error: 'Email chưa đúng.' }, 400);
  if (!validPassword(password)) return json({ error: 'Mật khẩu cần từ 8 đến 200 ký tự.' }, 400);

  if (!(await verifyTurnstile(request, env, body.turnstileToken))) {
    return json({ error: 'Chưa qua bước kiểm tra chống máy tự động. Hãy thử lại.' }, 400);
  }

  const now = Date.now();
  const ipKey = 'reg:' + (request.headers.get('CF-Connecting-IP') || '');
  await env.DB.prepare('DELETE FROM login_attempts WHERE at < ?').bind(now - REGISTER_WINDOW_MS).run();
  const regs = await env.DB.prepare('SELECT COUNT(*) AS n FROM login_attempts WHERE key = ? AND at >= ?')
    .bind(ipKey, now - REGISTER_WINDOW_MS).first();
  if (regs && regs.n >= REGISTER_MAX_PER_IP) {
    return json({ error: 'Đã tạo quá nhiều tài khoản từ mạng này. Hãy thử lại sau 1 giờ.' }, 429);
  }

  const exists = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
  if (exists) return json({ error: 'Email này đã có tài khoản. Hãy đăng nhập.' }, 409);

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, PBKDF2_ITER);
  const recoveryCode = makeRecoveryCode();
  const res = await env.DB.prepare(
    'INSERT INTO users (email, name, password_hash, password_salt, password_iter, recovery_hash) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(email, name, b64(hash), b64(salt), PBKDF2_ITER, await sha256(normCode(recoveryCode))).run();
  await env.DB.prepare('INSERT INTO login_attempts (key, at) VALUES (?, ?)').bind(ipKey, now).run();
  const userId = res.meta.last_row_id;
  return await startSession(env, { id: userId, email, name }, 201, { recoveryCode });
}

/* ---------------- Quên / đổi mật khẩu, xóa tài khoản ---------------- */

async function resetPassword(request, env) {
  const body = await readJson(request);
  const email = normEmail(body.email);
  const code = normCode(body.recoveryCode);
  const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';
  if (!email || !code) return json({ error: 'Email hoặc mã khôi phục chưa đúng.' }, 400);
  if (!validPassword(newPassword)) return json({ error: 'Mật khẩu mới cần từ 8 đến 200 ký tự.' }, 400);
  if (!(await verifyTurnstile(request, env, body.turnstileToken))) {
    return json({ error: 'Chưa qua bước kiểm tra chống máy tự động. Hãy thử lại.' }, 400);
  }

  const now = Date.now();
  const ip = request.headers.get('CF-Connecting-IP') || '';
  if (await tooManyFails(env, email, ip, now)) {
    return json({ error: 'Bạn nhập sai quá nhiều lần. Hãy thử lại sau 15 phút.' }, 429);
  }
  const user = await env.DB.prepare('SELECT id, email, name, recovery_hash FROM users WHERE email = ?').bind(email).first();
  const ok = !!(user && user.recovery_hash && timingSafeEqual(await sha256(code), user.recovery_hash));
  if (!ok) {
    await recordFail(env, email, ip, now);
    return json({ error: 'Email hoặc mã khôi phục chưa đúng.' }, 401);
  }
  const recoveryCode = makeRecoveryCode();
  await setPassword(env, user.id, newPassword, await sha256(normCode(recoveryCode)));
  await env.DB.prepare('DELETE FROM sessions WHERE user_id = ?').bind(user.id).run();
  await env.DB.prepare('DELETE FROM login_attempts WHERE key = ?').bind(email).run();
  return await startSession(env, user, 200, { recoveryCode });
}

async function changePassword(request, env) {
  const user = await currentUser(request, env);
  if (!user) return json({ error: 'Bạn cần đăng nhập.' }, 401);
  const body = await readJson(request);
  const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';
  if (!validPassword(newPassword)) return json({ error: 'Mật khẩu mới cần từ 8 đến 200 ký tự.' }, 400);
  if (!(await checkPassword(env, user.id, body.currentPassword))) return json({ error: 'Mật khẩu hiện tại chưa đúng.' }, 401);
  await setPassword(env, user.id, newPassword, null);
  // Đăng xuất mọi thiết bị khác, giữ phiên hiện tại.
  await env.DB.prepare('DELETE FROM sessions WHERE user_id = ? AND token_hash != ?')
    .bind(user.id, await sha256(getCookie(request, COOKIE))).run();
  return json({ ok: true });
}

async function newRecoveryCode(request, env) {
  const user = await currentUser(request, env);
  if (!user) return json({ error: 'Bạn cần đăng nhập.' }, 401);
  const body = await readJson(request);
  if (!(await checkPassword(env, user.id, body.password))) return json({ error: 'Mật khẩu chưa đúng.' }, 401);
  const recoveryCode = makeRecoveryCode();
  await env.DB.prepare('UPDATE users SET recovery_hash = ? WHERE id = ?').bind(await sha256(normCode(recoveryCode)), user.id).run();
  return json({ recoveryCode });
}

async function deleteAccount(request, env) {
  const user = await currentUser(request, env);
  if (!user) return json({ error: 'Bạn cần đăng nhập.' }, 401);
  const body = await readJson(request);
  if (!(await checkPassword(env, user.id, body.password))) return json({ error: 'Mật khẩu chưa đúng.' }, 401);
  await env.DB.batch([
    env.DB.prepare('DELETE FROM progress WHERE user_id = ?').bind(user.id),
    env.DB.prepare('DELETE FROM sessions WHERE user_id = ?').bind(user.id),
    env.DB.prepare('DELETE FROM users WHERE id = ?').bind(user.id)
  ]);
  return json({ ok: true }, 200, { 'Set-Cookie': cookie('', 0) });
}

async function checkPassword(env, userId, password) {
  if (typeof password !== 'string' || !password) return false;
  const row = await env.DB.prepare('SELECT password_hash, password_salt, password_iter FROM users WHERE id = ?').bind(userId).first();
  if (!row) return false;
  const hash = await pbkdf2(password, unb64(row.password_salt), row.password_iter);
  return timingSafeEqual(b64(hash), row.password_hash);
}

async function setPassword(env, userId, password, recoveryHash) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, PBKDF2_ITER);
  if (recoveryHash) {
    await env.DB.prepare('UPDATE users SET password_hash = ?, password_salt = ?, password_iter = ?, recovery_hash = ? WHERE id = ?')
      .bind(b64(hash), b64(salt), PBKDF2_ITER, recoveryHash, userId).run();
  } else {
    await env.DB.prepare('UPDATE users SET password_hash = ?, password_salt = ?, password_iter = ? WHERE id = ?')
      .bind(b64(hash), b64(salt), PBKDF2_ITER, userId).run();
  }
}

async function tooManyFails(env, email, ip, now) {
  await env.DB.prepare('DELETE FROM login_attempts WHERE at < ? AND key NOT LIKE ?').bind(now - LOGIN_WINDOW_MS, 'reg:%').run();
  const fails = await env.DB.prepare(
    'SELECT SUM(key = ?) AS byEmail, SUM(key = ?) AS byIp FROM login_attempts WHERE key IN (?, ?) AND at >= ?'
  ).bind(email, 'ip:' + ip, email, 'ip:' + ip, now - LOGIN_WINDOW_MS).first();
  return !!(fails && ((fails.byEmail || 0) >= LOGIN_MAX_FAILS || (fails.byIp || 0) >= LOGIN_MAX_FAILS_IP));
}

async function recordFail(env, email, ip, now) {
  await env.DB.batch([
    env.DB.prepare('INSERT INTO login_attempts (key, at) VALUES (?, ?)').bind(email, now),
    env.DB.prepare('INSERT INTO login_attempts (key, at) VALUES (?, ?)').bind('ip:' + ip, now)
  ]);
}

function validPassword(p) {
  return typeof p === 'string' && p.length >= 8 && p.length <= 200;
}

/** Mã khôi phục dạng XXXX-XXXX-XXXX-XXXX (bỏ chữ dễ nhầm 0/O, 1/I/L). ~80 bit ngẫu nhiên. */
function makeRecoveryCode() {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let out = '';
  for (let i = 0; i < 16; i++) {
    out += alphabet[bytes[i] % alphabet.length];
    if (i % 4 === 3 && i < 15) out += '-';
  }
  return out;
}

function normCode(v) {
  return typeof v === 'string' ? v.toUpperCase().replace(/[^A-Z0-9]/g, '') : '';
}

/** Cloudflare Turnstile: chỉ bật khi đã đặt biến TURNSTILE_SECRET_KEY (+ TURNSTILE_SITE_KEY) cho dự án Pages. */
async function verifyTurnstile(request, env, token) {
  if (!env.TURNSTILE_SECRET_KEY) return true;
  if (typeof token !== 'string' || !token) return false;
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET_KEY);
  form.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.append('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const data = await r.json();
    return !!data.success;
  } catch (_) {
    return false;
  }
}

async function login(request, env) {
  const body = await readJson(request);
  const email = normEmail(body.email);
  const password = typeof body.password === 'string' ? body.password : '';
  if (!email || !password) return json({ error: 'Email hoặc mật khẩu chưa đúng.' }, 400);

  const now = Date.now();
  const ip = request.headers.get('CF-Connecting-IP') || '';
  if (await tooManyFails(env, email, ip, now)) {
    return json({ error: 'Bạn nhập sai quá nhiều lần. Hãy thử lại sau 15 phút.' }, 429);
  }

  const user = await env.DB.prepare(
    'SELECT id, email, name, password_hash, password_salt, password_iter FROM users WHERE email = ?'
  ).bind(email).first();

  let ok = false;
  if (user) {
    const hash = await pbkdf2(password, unb64(user.password_salt), user.password_iter);
    ok = timingSafeEqual(b64(hash), user.password_hash);
  } else {
    // Vẫn tính băm để thời gian phản hồi giống nhau, tránh dò email.
    await pbkdf2(password, new Uint8Array(16), PBKDF2_ITER);
  }

  if (!ok) {
    await recordFail(env, email, ip, now);
    return json({ error: 'Email hoặc mật khẩu chưa đúng.' }, 401);
  }
  await env.DB.prepare('DELETE FROM login_attempts WHERE key = ?').bind(email).run();
  return await startSession(env, user, 200);
}

async function logout(request, env) {
  const token = getCookie(request, COOKIE);
  if (token) {
    await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256(token)).run();
  }
  return json({ ok: true }, 200, { 'Set-Cookie': cookie('', 0) });
}

async function me(request, env) {
  const user = await currentUser(request, env);
  return json({ user: user ? publicUser(user) : null });
}

/* ---------------- Tiến độ ---------------- */

async function getProgress(request, env) {
  const user = await currentUser(request, env);
  if (!user) return json({ error: 'Bạn cần đăng nhập.' }, 401);
  const row = await env.DB.prepare('SELECT data, version, updated_at FROM progress WHERE user_id = ?').bind(user.id).first();
  if (!row) return json({ data: null, version: 0, updatedAt: null });
  return json({ data: JSON.parse(row.data), version: row.version, updatedAt: toIso(row.updated_at) });
}

async function putProgress(request, env) {
  const user = await currentUser(request, env);
  if (!user) return json({ error: 'Bạn cần đăng nhập.' }, 401);

  const raw = await request.text();
  if (raw.length > MAX_PROGRESS_BYTES + 1024) return json({ error: 'Tiến độ quá lớn để đồng bộ.' }, 413);
  let body;
  try { body = JSON.parse(raw); } catch (_) { return json({ error: 'JSON không hợp lệ.' }, 400); }

  const data = body && body.data;
  if (!data || typeof data !== 'object' || Array.isArray(data)) return json({ error: 'Thiếu dữ liệu tiến độ.' }, 400);
  for (const [k, v] of Object.entries(data)) {
    if (typeof k !== 'string' || typeof v !== 'string') return json({ error: 'Dữ liệu tiến độ không hợp lệ.' }, 400);
  }
  const dataStr = JSON.stringify(data);
  if (dataStr.length > MAX_PROGRESS_BYTES) return json({ error: 'Tiến độ quá lớn để đồng bộ.' }, 413);
  const baseVersion = Number.isInteger(body.baseVersion) ? body.baseVersion : 0;

  const row = await env.DB.prepare('SELECT data, version, updated_at FROM progress WHERE user_id = ?').bind(user.id).first();
  if (!row) {
    await env.DB.prepare(
      "INSERT INTO progress (user_id, data, version, updated_at) VALUES (?, ?, 1, datetime('now'))"
    ).bind(user.id, dataStr).run();
    return json({ version: 1, updatedAt: new Date().toISOString() });
  }
  if (row.version !== baseVersion) {
    return json({
      error: 'Tiến độ trong tài khoản đã thay đổi từ thiết bị khác.',
      remote: { data: JSON.parse(row.data), version: row.version, updatedAt: toIso(row.updated_at) }
    }, 409);
  }
  const res = await env.DB.prepare(
    "UPDATE progress SET data = ?, version = version + 1, updated_at = datetime('now') WHERE user_id = ? AND version = ?"
  ).bind(dataStr, user.id, baseVersion).run();
  if (!res.meta.changes) return json({ error: 'Có thiết bị khác vừa lưu, hãy thử lại.' }, 409);
  return json({ version: baseVersion + 1, updatedAt: new Date().toISOString() });
}

/* ---------------- Phiên đăng nhập ---------------- */

async function startSession(env, user, status, extra) {
  const token = b64url(crypto.getRandomValues(new Uint8Array(32)));
  const expires = Date.now() + SESSION_DAYS * 86400 * 1000;
  await env.DB.batch([
    env.DB.prepare('DELETE FROM sessions WHERE user_id = ? AND expires_at < ?').bind(user.id, Date.now()),
    env.DB.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').bind(await sha256(token), user.id, expires)
  ]);
  return json({ user: publicUser(user), ...(extra || {}) }, status, { 'Set-Cookie': cookie(token, SESSION_DAYS * 86400) });
}

async function currentUser(request, env) {
  const token = getCookie(request, COOKIE);
  if (!token) return null;
  const row = await env.DB.prepare(
    'SELECT u.id, u.email, u.name, u.recovery_hash IS NOT NULL AS has_recovery, s.expires_at FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ?'
  ).bind(await sha256(token)).first();
  if (!row || row.expires_at < Date.now()) return null;
  return row;
}

function publicUser(u) {
  const out = { id: u.id, email: u.email, name: u.name || '' };
  if (u.has_recovery !== undefined) out.hasRecoveryCode = !!u.has_recovery;
  return out;
}

function cookie(value, maxAge) {
  return `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

function getCookie(request, name) {
  const header = request.headers.get('Cookie') || '';
  for (const part of header.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return rest.join('=');
  }
  return null;
}

/* ---------------- Tiện ích ---------------- */

function json(obj, status = 200, headers = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers }
  });
}

async function readJson(request) {
  try { return (await request.json()) || {}; } catch (_) { return {}; }
}

function normEmail(v) {
  if (typeof v !== 'string') return '';
  const e = v.trim().toLowerCase();
  return e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e : '';
}

function toIso(sqliteDate) {
  return sqliteDate ? new Date(sqliteDate.replace(' ', 'T') + 'Z').toISOString() : null;
}

async function pbkdf2(password, salt, iterations) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return new Uint8Array(bits);
}

async function sha256(text) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return b64(new Uint8Array(d));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function b64(bytes) {
  let s = '';
  for (const x of bytes) s += String.fromCharCode(x);
  return btoa(s);
}
function unb64(str) {
  const s = atob(str);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}
function b64url(bytes) {
  return b64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
