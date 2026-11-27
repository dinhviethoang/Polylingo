/**
 * Kiểm thử API tài khoản (functions/api/[[path]].js) với D1 giả lập bằng node:sqlite.
 * Chạy: node tests/api.test.js   (cần Node 22.5+)
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

let DatabaseSync;
try {
  ({ DatabaseSync } = require('node:sqlite'));
} catch (_) {
  console.log('Bỏ qua: Node này chưa có node:sqlite.');
  process.exit(0);
}

function makeD1() {
  const db = new DatabaseSync(':memory:');
  db.exec(fs.readFileSync(path.join(__dirname, '..', 'migrations', '0001_init.sql'), 'utf8'));
  const stmt = (sql, args = []) => ({
    bind: (...a) => stmt(sql, a),
    first: async () => db.prepare(sql).get(...args) || null,
    all: async () => ({ results: db.prepare(sql).all(...args) }),
    run: async () => {
      const r = db.prepare(sql).run(...args);
      return { meta: { last_row_id: Number(r.lastInsertRowid), changes: Number(r.changes) } };
    }
  });
  return {
    prepare: (sql) => stmt(sql),
    batch: async (list) => Promise.all(list.map(s => s.run()))
  };
}

let passed = 0;
async function test(name, fn) {
  try {
    await fn();
    passed++;
    console.log('  ✓ ' + name);
  } catch (e) {
    console.error('  ✗ ' + name + '\n    ' + (e && e.stack || e));
    process.exitCode = 1;
  }
}

(async () => {
  const mod = await import(pathToFileURL(path.join(__dirname, '..', 'functions', 'api', '[[path]].js')).href);
  const env = { DB: makeD1() };
  const ORIGIN = 'https://polylingo.pages.dev';

  async function call(method, p, body, cookie, extraHeaders = {}) {
    const headers = { ...extraHeaders };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (cookie) headers.Cookie = cookie;
    if (method !== 'GET' && !('Origin' in headers)) headers.Origin = ORIGIN;
    const req = new Request(ORIGIN + '/api' + p, {
      method, headers, body: body !== undefined ? JSON.stringify(body) : undefined
    });
    const res = await mod.onRequest({ request: req, env });
    const setCookie = res.headers.get('Set-Cookie');
    return { status: res.status, json: await res.json(), cookie: setCookie ? setCookie.split(';')[0] : null, setCookie };
  }

  console.log('API tài khoản & tiến độ');
  let cookieA;

  await test('đăng ký trả về cookie HttpOnly và user', async () => {
    const r = await call('POST', '/auth/register', { email: 'Hoc.Vien@Example.com', password: 'matkhau123', name: 'Học viên' });
    assert.strictEqual(r.status, 201);
    assert.strictEqual(r.json.user.email, 'hoc.vien@example.com');
    assert.ok(/HttpOnly/.test(r.setCookie) && /Secure/.test(r.setCookie) && /SameSite=Lax/.test(r.setCookie));
    cookieA = r.cookie;
  });

  await test('không cho đăng ký trùng email (không phân biệt hoa thường)', async () => {
    const r = await call('POST', '/auth/register', { email: 'hoc.vien@example.com', password: 'matkhau456' });
    assert.strictEqual(r.status, 409);
  });

  await test('từ chối mật khẩu ngắn và email sai', async () => {
    assert.strictEqual((await call('POST', '/auth/register', { email: 'a@b.co', password: '123' })).status, 400);
    assert.strictEqual((await call('POST', '/auth/register', { email: 'khong-phai-email', password: 'matkhau123' })).status, 400);
  });

  await test('mật khẩu không lưu dạng rõ', async () => {
    const row = await env.DB.prepare('SELECT password_hash FROM users WHERE email = ?').bind('hoc.vien@example.com').first();
    assert.ok(row.password_hash && !row.password_hash.includes('matkhau123'));
  });

  await test('/auth/me nhận ra người đã đăng nhập', async () => {
    const r = await call('GET', '/auth/me', undefined, cookieA);
    assert.strictEqual(r.json.user.email, 'hoc.vien@example.com');
    const anon = await call('GET', '/auth/me');
    assert.strictEqual(anon.json.user, null);
  });

  await test('đăng nhập sai mật khẩu trả 401, đúng thì 200', async () => {
    assert.strictEqual((await call('POST', '/auth/login', { email: 'hoc.vien@example.com', password: 'sai-mat-khau' })).status, 401);
    const ok = await call('POST', '/auth/login', { email: 'HOC.VIEN@example.com', password: 'matkhau123' });
    assert.strictEqual(ok.status, 200);
    assert.ok(ok.cookie);
  });

  await test('tiến độ: chưa có thì data null, cần đăng nhập', async () => {
    assert.strictEqual((await call('GET', '/progress')).status, 401);
    const r = await call('GET', '/progress', undefined, cookieA);
    assert.strictEqual(r.json.data, null);
    assert.strictEqual(r.json.version, 0);
  });

  await test('tiến độ: lưu rồi đọc lại, version tăng', async () => {
    const data = { hsk_sm2_data: '{"你":{"ef":2.5}}', app_wallet_v1: '{"coins":50}' };
    const p1 = await call('PUT', '/progress', { data, baseVersion: 0 }, cookieA);
    assert.strictEqual(p1.status, 200);
    assert.strictEqual(p1.json.version, 1);
    const g = await call('GET', '/progress', undefined, cookieA);
    assert.deepStrictEqual(g.json.data, data);
    const p2 = await call('PUT', '/progress', { data: { ...data, x: '1' }, baseVersion: 1 }, cookieA);
    assert.strictEqual(p2.json.version, 2);
  });

  await test('tiến độ: version cũ bị từ chối 409 kèm bản trên máy chủ', async () => {
    const r = await call('PUT', '/progress', { data: { a: '1' }, baseVersion: 1 }, cookieA);
    assert.strictEqual(r.status, 409);
    assert.strictEqual(r.json.remote.version, 2);
    assert.strictEqual(r.json.remote.data.x, '1');
  });

  await test('tiến độ: giá trị không phải chuỗi bị từ chối', async () => {
    const r = await call('PUT', '/progress', { data: { a: 1 }, baseVersion: 2 }, cookieA);
    assert.strictEqual(r.status, 400);
  });

  await test('người khác không đọc được tiến độ của mình', async () => {
    const b = await call('POST', '/auth/register', { email: 'nguoi.khac@example.com', password: 'matkhau789' });
    const r = await call('GET', '/progress', undefined, b.cookie);
    assert.strictEqual(r.json.data, null);
  });

  await test('chặn yêu cầu ghi từ nguồn khác (CSRF) và không phải JSON', async () => {
    const r = await call('PUT', '/progress', { data: {}, baseVersion: 0 }, cookieA, { Origin: 'https://evil.example' });
    assert.strictEqual(r.status, 403);
    const req = new Request(ORIGIN + '/api/auth/login', { method: 'POST', headers: { Origin: ORIGIN, 'Content-Type': 'text/plain' }, body: '{}' });
    const res = await mod.onRequest({ request: req, env });
    assert.strictEqual(res.status, 415);
  });

  await test('khóa tạm sau 10 lần sai', async () => {
    for (let i = 0; i < 10; i++) await call('POST', '/auth/login', { email: 'nguoi.khac@example.com', password: 'sai' + i + 'xxxxxx' });
    const r = await call('POST', '/auth/login', { email: 'nguoi.khac@example.com', password: 'matkhau789' });
    assert.strictEqual(r.status, 429);
  });

  await test('đăng xuất xóa phiên', async () => {
    const r = await call('POST', '/auth/logout', {}, cookieA);
    assert.strictEqual(r.status, 200);
    assert.ok(/Max-Age=0/.test(r.setCookie));
    const after = await call('GET', '/auth/me', undefined, cookieA);
    assert.strictEqual(after.json.user, null);
  });

  await test('thiếu D1 trả 503 rõ ràng', async () => {
    const res = await mod.onRequest({ request: new Request(ORIGIN + '/api/auth/me'), env: {} });
    assert.strictEqual(res.status, 503);
  });

  console.log(process.exitCode ? 'CÓ LỖI' : `OK ${passed} tests`);
})();
