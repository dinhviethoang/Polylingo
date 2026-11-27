/**
 * account.js — Tài khoản, sao lưu và đồng bộ tiến độ học.
 *
 * - Xuất/Nhập tiến độ ra file JSON (không cần tài khoản, chạy cả khi mở bằng file://).
 * - Đăng ký / đăng nhập qua API Cloudflare Pages Functions (/api/...), lưu tiến độ vào D1.
 * - Khi đã đăng nhập: tự đẩy tiến độ lên máy chủ khi có thay đổi (mỗi 60 giây và khi rời trang),
 *   và hỏi người học chọn bản nào nếu máy này và máy chủ khác nhau.
 *
 * Tiến độ = toàn bộ localStorage của trang, trừ các khóa nội bộ bắt đầu bằng "pl_sync_".
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  const INTERNAL_PREFIX = 'pl_sync_';
  const K_VERSION = INTERNAL_PREFIX + 'version';
  const K_LAST = INTERNAL_PREFIX + 'last_pushed';
  const K_USER = INTERNAL_PREFIX + 'user';
  const SYNC_INTERVAL_MS = 60 * 1000;
  const MAX_BYTES = 1800 * 1024; // giới hạn một dòng D1 ~2MB
  const API_AVAILABLE = /^https?:$/.test(location.protocol);

  const icon = (n, size) => (window.PolyIcons ? window.PolyIcons.svg(n, { size: size || 18 }) : '');

  /* ---------------- Ảnh chụp tiến độ ---------------- */
  const Progress = {
    collect() {
      const data = {};
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (!k || k.startsWith(INTERNAL_PREFIX)) continue;
          data[k] = localStorage.getItem(k);
        }
      } catch (_) { /* localStorage bị chặn */ }
      return data;
    },
    serialize(data) {
      const keys = Object.keys(data).sort();
      const ordered = {};
      keys.forEach(k => { ordered[k] = data[k]; });
      return JSON.stringify(ordered);
    },
    isEmpty(data) {
      return !data || Object.keys(data).length === 0;
    },
    apply(data) {
      if (!data || typeof data !== 'object') throw new Error('Dữ liệu không hợp lệ');
      const keep = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(INTERNAL_PREFIX)) keep[k] = localStorage.getItem(k);
      }
      localStorage.clear();
      Object.keys(keep).forEach(k => localStorage.setItem(k, keep[k]));
      Object.keys(data).forEach(k => {
        if (typeof data[k] === 'string' && !k.startsWith(INTERNAL_PREFIX)) localStorage.setItem(k, data[k]);
      });
    },
    exportFile() {
      const payload = {
        app: 'polylingo',
        format: 1,
        exportedAt: new Date().toISOString(),
        data: Progress.collect()
      };
      const blob = new Blob([JSON.stringify(payload, null, 1)], { type: 'application/json' });
      const a = document.createElement('a');
      const d = new Date();
      const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      a.href = URL.createObjectURL(blob);
      a.download = `polylingo-tien-do-${stamp}.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    },
    parseFile(text) {
      const obj = JSON.parse(text);
      if (!obj || obj.app !== 'polylingo' || typeof obj.data !== 'object') {
        throw new Error('File này không phải file sao lưu Polylingo.');
      }
      return obj;
    }
  };

  /* ---------------- Gọi API ---------------- */
  async function api(path, opts = {}) {
    const res = await fetch('/api' + path, {
      method: opts.method || 'GET',
      credentials: 'same-origin',
      headers: opts.body !== undefined ? { 'Content-Type': 'application/json' } : {},
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      keepalive: !!opts.keepalive
    });
    let json = null;
    try { json = await res.json(); } catch (_) { /* không có body */ }
    if (!res.ok) {
      const err = new Error((json && json.error) || `Lỗi máy chủ (${res.status})`);
      err.status = res.status;
      err.body = json;
      throw err;
    }
    return json || {};
  }

  /* ---------------- Đồng bộ ---------------- */
  const Sync = {
    user: null,
    timer: null,
    busy: false,

    getVersion() { return parseInt(localStorage.getItem(K_VERSION) || '0', 10) || 0; },
    setVersion(v) { localStorage.setItem(K_VERSION, String(v || 0)); },

    async init() {
      try {
        const cached = localStorage.getItem(K_USER);
        if (cached) this.user = JSON.parse(cached);
      } catch (_) { /* bỏ qua */ }
      UI.renderButton();
      if (!API_AVAILABLE) return;
      try {
        const me = await api('/auth/me');
        this.setUser(me.user || null);
        if (this.user) await this.reconcile();
      } catch (_) {
        // Không có API (mở bằng file:// hoặc máy chủ chưa có D1) → chỉ dùng Xuất/Nhập file.
      }
    },

    setUser(user) {
      this.user = user;
      try {
        if (user) localStorage.setItem(K_USER, JSON.stringify(user));
        else localStorage.removeItem(K_USER);
      } catch (_) { /* bỏ qua */ }
      UI.renderButton();
      if (user) this.start(); else this.stop();
    },

    start() {
      this.stop();
      this.timer = setInterval(() => this.push().catch(() => {}), SYNC_INTERVAL_MS);
    },
    stop() {
      if (this.timer) clearInterval(this.timer);
      this.timer = null;
    },

    /** Sau khi đăng nhập / tải trang: so máy này với máy chủ. */
    async reconcile() {
      const remote = await api('/progress');
      const local = Progress.collect();
      const localStr = Progress.serialize(local);
      if (!remote.data) {
        // Máy chủ chưa có gì → đẩy máy này lên.
        await this.push(true);
        return;
      }
      const remoteStr = Progress.serialize(remote.data);
      if (remoteStr === localStr) {
        this.setVersion(remote.version);
        localStorage.setItem(K_LAST, localStr);
        return;
      }
      const lastPushed = localStorage.getItem(K_LAST);
      const localChanged = lastPushed !== localStr;
      const sameBase = this.getVersion() === remote.version;
      if (Progress.isEmpty(local) || (!localChanged && !sameBase)) {
        // Máy này trống, hoặc không đổi gì kể từ lần đẩy trước còn máy chủ có bản mới → tải về.
        this.applyRemote(remote);
        return;
      }
      if (localChanged && sameBase) {
        await this.push(true);
        return;
      }
      // Cả hai bên đều đổi → hỏi người học.
      UI.askConflict(remote);
    },

    applyRemote(remote) {
      Progress.apply(remote.data);
      this.setVersion(remote.version);
      localStorage.setItem(K_LAST, Progress.serialize(remote.data));
      UI.toast('Đã tải tiến độ từ tài khoản. Đang làm mới trang...');
      setTimeout(() => location.reload(), 600);
    },

    async push(force, keepalive) {
      if (!this.user || this.busy) return;
      const data = Progress.collect();
      const str = Progress.serialize(data);
      if (!force && localStorage.getItem(K_LAST) === str) return;
      if (str.length > MAX_BYTES) {
        UI.setStatus('Tiến độ quá lớn để đồng bộ (thường do video tự thêm có phụ đề dài). Hãy dùng Xuất file.');
        return;
      }
      this.busy = true;
      try {
        const res = await api('/progress', {
          method: 'PUT',
          body: { data, baseVersion: this.getVersion() },
          keepalive
        });
        this.setVersion(res.version);
        localStorage.setItem(K_LAST, str);
        UI.setStatus('Đã đồng bộ lúc ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
      } catch (e) {
        if (e.status === 409 && e.body && e.body.remote) {
          UI.askConflict(e.body.remote);
        } else if (e.status === 401) {
          this.setUser(null);
        } else {
          UI.setStatus('Chưa đồng bộ được: ' + e.message);
        }
      } finally {
        this.busy = false;
      }
    },

    async overwriteRemote() {
      // Ghi đè máy chủ bằng máy này: lấy version hiện tại của máy chủ làm gốc.
      const remote = await api('/progress');
      this.setVersion(remote.version || 0);
      await this.push(true);
    }
  };

  /* ---------------- Giao diện ---------------- */
  const UI = {
    modal: null,
    statusText: '',

    toast(msg) {
      if (window.app && typeof window.app.showToast === 'function') window.app.showToast(msg, 'info');
    },

    setStatus(text) {
      this.statusText = text;
      const el = document.getElementById('acc-sync-status');
      if (el) el.textContent = text;
    },

    renderButton() {
      const btn = document.getElementById('btn-account');
      if (!btn) return;
      const u = Sync.user;
      btn.innerHTML = icon('user', 18) + `<span class="acc-btn-label">${u ? escapeHtml(u.name || u.email.split('@')[0]) : 'Đăng nhập'}</span>`;
      btn.setAttribute('aria-label', u ? `Tài khoản ${u.email}` : 'Đăng nhập hoặc sao lưu tiến độ');
      btn.classList.toggle('is-signed-in', !!u);
    },

    open() {
      this.close();
      const wrap = document.createElement('div');
      wrap.className = 'acc-overlay';
      wrap.innerHTML = `
        <div class="acc-modal" role="dialog" aria-modal="true" aria-labelledby="acc-title">
          <button type="button" class="acc-close" aria-label="Đóng">${icon('x', 20)}</button>
          <div class="acc-body"></div>
        </div>`;
      document.body.appendChild(wrap);
      this.modal = wrap;
      wrap.addEventListener('click', e => { if (e.target === wrap) this.close(); });
      wrap.querySelector('.acc-close').addEventListener('click', () => this.close());
      document.addEventListener('keydown', this._esc = (e) => { if (e.key === 'Escape') this.close(); });
      this.renderBody();
      const first = wrap.querySelector('input, button.acc-primary');
      if (first) first.focus();
    },

    close() {
      if (this.modal) this.modal.remove();
      this.modal = null;
      if (this._esc) document.removeEventListener('keydown', this._esc);
      const btn = document.getElementById('btn-account');
      if (btn && document.activeElement === document.body) btn.focus();
    },

    renderBody(mode) {
      if (!this.modal) return;
      const body = this.modal.querySelector('.acc-body');
      const u = Sync.user;
      const backupHtml = `
        <section class="acc-section">
          <h3>${icon('save', 18)} Sao lưu bằng file</h3>
          <p class="acc-muted">Tải toàn bộ tiến độ (từ đã học, bài học, xu, vườn...) về máy, hoặc khôi phục từ file đã lưu.</p>
          <div class="acc-row">
            <button type="button" class="acc-btn" data-act="export">${icon('arrow-down', 16)} Xuất tiến độ</button>
            <label class="acc-btn">${icon('folder', 16)} Nhập từ file
              <input type="file" accept="application/json,.json" data-act="import" hidden>
            </label>
          </div>
        </section>`;

      if (u) {
        body.innerHTML = `
          <h2 id="acc-title">Tài khoản của bạn</h2>
          <p class="acc-muted">Đăng nhập: <strong>${escapeHtml(u.email)}</strong></p>
          <section class="acc-section">
            <h3>${icon('cloud', 18)} Đồng bộ tiến độ</h3>
            <p class="acc-muted">Tiến độ tự lưu lên tài khoản mỗi phút khi có thay đổi. Đăng nhập trên máy khác để học tiếp.</p>
            <p class="acc-status" id="acc-sync-status" aria-live="polite">${escapeHtml(this.statusText || '')}</p>
            <div class="acc-row">
              <button type="button" class="acc-btn acc-primary" data-act="sync">${icon('refresh', 16)} Đồng bộ ngay</button>
              <button type="button" class="acc-btn" data-act="logout">Đăng xuất</button>
            </div>
          </section>
          ${backupHtml}`;
      } else {
        const isRegister = mode === 'register';
        const formHtml = API_AVAILABLE ? `
          <form class="acc-form" novalidate>
            <h2 id="acc-title">${isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}</h2>
            <p class="acc-muted">${isRegister ? 'Lưu tiến độ lên mây để học tiếp trên mọi thiết bị.' : 'Học tiếp đúng chỗ đã dừng, trên mọi thiết bị.'}</p>
            ${isRegister ? `<label>Tên hiển thị<input name="name" autocomplete="nickname" maxlength="40"></label>` : ''}
            <label>Email<input name="email" type="email" autocomplete="email" required></label>
            <label>Mật khẩu<input name="password" type="password" autocomplete="${isRegister ? 'new-password' : 'current-password'}" minlength="8" required></label>
            <p class="acc-error" role="alert" aria-live="assertive"></p>
            <button type="submit" class="acc-btn acc-primary acc-wide">${isRegister ? 'Đăng ký' : 'Đăng nhập'}</button>
            <p class="acc-switch">${isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}
              <button type="button" class="acc-link" data-act="${isRegister ? 'to-login' : 'to-register'}">${isRegister ? 'Đăng nhập' : 'Đăng ký miễn phí'}</button></p>
          </form>` : `
          <h2 id="acc-title">Sao lưu tiến độ</h2>
          <p class="acc-muted">Bạn đang mở trang trực tiếp từ máy (file://), nên chưa dùng được tài khoản. Vẫn có thể sao lưu bằng file bên dưới.</p>`;
        body.innerHTML = formHtml + backupHtml;
        const form = body.querySelector('form');
        if (form) form.addEventListener('submit', e => this.submitAuth(e, isRegister));
      }

      body.querySelectorAll('[data-act]').forEach(el => {
        const act = el.getAttribute('data-act');
        if (act === 'import') {
          el.addEventListener('change', () => this.importFile(el.files && el.files[0]));
          return;
        }
        el.addEventListener('click', () => this.handle(act));
      });
    },

    async handle(act) {
      if (act === 'export') Progress.exportFile();
      if (act === 'to-register') this.renderBody('register');
      if (act === 'to-login') this.renderBody('login');
      if (act === 'sync') {
        this.setStatus('Đang đồng bộ...');
        try { await Sync.reconcile(); if (!this.statusText.startsWith('Đã')) this.setStatus('Đã đồng bộ.'); }
        catch (e) { this.setStatus('Chưa đồng bộ được: ' + e.message); }
      }
      if (act === 'logout') {
        await Sync.push(false).catch(() => {});
        try { await api('/auth/logout', { method: 'POST', body: {} }); } catch (_) { /* bỏ qua */ }
        Sync.setUser(null);
        this.renderBody('login');
      }
    },

    async submitAuth(e, isRegister) {
      e.preventDefault();
      const form = e.target;
      const err = form.querySelector('.acc-error');
      const btn = form.querySelector('button[type=submit]');
      const fd = new FormData(form);
      const email = String(fd.get('email') || '').trim();
      const password = String(fd.get('password') || '');
      err.textContent = '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'Email chưa đúng.'; return; }
      if (password.length < 8) { err.textContent = 'Mật khẩu cần ít nhất 8 ký tự.'; return; }
      btn.disabled = true;
      try {
        const body = { email, password };
        if (isRegister) body.name = String(fd.get('name') || '').trim();
        const res = await api(isRegister ? '/auth/register' : '/auth/login', { method: 'POST', body });
        Sync.setUser(res.user);
        this.renderBody();
        this.setStatus('Đang so tiến độ với tài khoản...');
        await Sync.reconcile();
        if (this.statusText.startsWith('Đang')) this.setStatus('Đã đồng bộ.');
      } catch (ex) {
        err.textContent = ex.message;
      } finally {
        btn.disabled = false;
      }
    },

    importFile(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const obj = Progress.parseFile(String(reader.result || ''));
          const when = obj.exportedAt ? new Date(obj.exportedAt).toLocaleString('vi-VN') : 'không rõ';
          this.confirm(
            'Khôi phục tiến độ từ file?',
            `File lưu lúc ${when}. Tiến độ hiện tại trên máy này sẽ bị thay bằng nội dung file.`,
            'Khôi phục',
            async () => {
              Progress.apply(obj.data);
              if (Sync.user) await Sync.overwriteRemote().catch(() => {});
              location.reload();
            }
          );
        } catch (ex) {
          this.toast(ex.message || 'Không đọc được file.');
        }
      };
      reader.readAsText(file);
    },

    askConflict(remote) {
      const when = remote.updatedAt ? new Date(remote.updatedAt).toLocaleString('vi-VN') : '';
      if (!this.modal) this.open();
      const body = this.modal.querySelector('.acc-body');
      body.innerHTML = `
        <h2 id="acc-title">Chọn tiến độ muốn giữ</h2>
        <p class="acc-muted">Tiến độ trên máy này khác với bản trong tài khoản${when ? ` (lưu lúc ${escapeHtml(when)})` : ''}. Bạn muốn giữ bản nào?</p>
        <div class="acc-choice">
          <button type="button" class="acc-btn acc-primary" data-c="remote">${icon('cloud', 16)} Dùng bản trong tài khoản</button>
          <button type="button" class="acc-btn" data-c="local">${icon('save', 16)} Giữ bản trên máy này</button>
        </div>
        <p class="acc-muted acc-small">Mẹo: bấm "Xuất tiến độ" trước nếu muốn giữ một bản dự phòng.</p>
        <button type="button" class="acc-link" data-c="export">Xuất tiến độ máy này ra file</button>`;
      body.querySelector('[data-c=remote]').addEventListener('click', () => Sync.applyRemote(remote));
      body.querySelector('[data-c=local]').addEventListener('click', async () => {
        await Sync.overwriteRemote();
        this.renderBody();
      });
      body.querySelector('[data-c=export]').addEventListener('click', () => Progress.exportFile());
    },

    confirm(title, text, okLabel, onOk) {
      if (!this.modal) this.open();
      const body = this.modal.querySelector('.acc-body');
      body.innerHTML = `
        <h2 id="acc-title">${escapeHtml(title)}</h2>
        <p class="acc-muted">${escapeHtml(text)}</p>
        <div class="acc-row">
          <button type="button" class="acc-btn acc-primary" data-c="ok">${escapeHtml(okLabel)}</button>
          <button type="button" class="acc-btn" data-c="cancel">Hủy</button>
        </div>`;
      body.querySelector('[data-c=ok]').addEventListener('click', onOk);
      body.querySelector('[data-c=cancel]').addEventListener('click', () => this.renderBody());
    }
  };

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ---------------- Khởi động ---------------- */
  function boot() {
    const btn = document.getElementById('btn-account');
    if (btn) btn.addEventListener('click', () => UI.open());
    Sync.init();
    const flush = () => { if (Sync.user) Sync.push(false, true).catch(() => {}); };
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
    window.addEventListener('pagehide', flush);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.PolyAccount = { Progress, Sync, UI, open: () => UI.open() };
})();
