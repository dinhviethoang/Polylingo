/**
 * dictation.js — Mục "Nghe gõ câu": nghe (hoặc nhìn) một câu rồi gõ lại nguyên câu.
 * Tô đúng/sai từng từ, bắt sửa lại chỗ sai trước khi qua câu mới.
 * Tiếng Anh gõ chữ; tiếng Trung gõ pinyin (không cần dấu) hoặc chữ Hán.
 * Câu lấy từ Hội thoại và câu ví dụ của từ vựng sẵn có.
 * window.SentenceDictation = { mount(el), onShow(params, langId), onHide() }
 */
(function () {
  'use strict';

  const root = typeof window !== 'undefined' ? window : globalThis;
  const B = () => root.PolyBoost || {};
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const icon = (n, size) => (root.PolyIcons ? root.PolyIcons.svg(n, { size: size || 18 }) : '');
  const SESSION_SIZE = 10;
  const MAX_TRIES = 3;

  /** Gom câu luyện từ dữ liệu sẵn có (hàm thuần). */
  function collectSentences(lang, source, data) {
    const d = data || root;
    const out = [];
    const seen = new Set();
    const push = (s) => {
      if (!s || !s.text || seen.has(s.text)) return;
      seen.add(s.text);
      out.push(s);
    };
    if (lang === 'zh') {
      if (source !== 'examples') {
        (d.DIALOGUES || []).forEach(dl => (dl.lines || []).forEach((l, i) => {
          push({ id: `d:${dl.id}:${i}`, text: l.zh, py: l.py, vi: l.vi, from: dl.title });
        }));
      }
      if (source !== 'dialogues') {
        (d.VOCAB || []).forEach(v => {
          if (v && v.ex && v.ex.zh && v.ex.py) push({ id: `w:${v.id}`, text: v.ex.zh, py: v.ex.py, vi: v.ex.vi, from: `Ví dụ của ${v.hanzi}` });
        });
      }
      return out.filter(s => {
        const n = (s.text.match(/[㐀-鿿]/g) || []).length;
        return n >= 2 && n <= 18 && s.py;
      });
    }
    if (source !== 'examples') {
      (d.EN_DIALOGUES || d.DIALOGUES_EN || []).forEach(dl => (dl.lines || []).forEach((l, i) => {
        push({ id: `d:${dl.id}:${i}`, text: l.en || l.zh, vi: l.vi, from: dl.title });
      }));
    }
    if (source !== 'dialogues') {
      const words = d.EN_WORDS ? (Array.isArray(d.EN_WORDS) ? d.EN_WORDS : Object.values(d.EN_WORDS)) : [];
      words.forEach(w => {
        if (w && w.ex && w.ex.en) push({ id: `w:${w.word}`, text: w.ex.en, vi: w.ex.vi, from: `Ví dụ của "${w.word}"` });
      });
    }
    return out.filter(s => {
      const n = (s.text.match(/[A-Za-z']+/g) || []).length;
      return n >= 3 && n <= 14;
    });
  }

  function pickSession(list, seenMap, size, rng) {
    const r = rng || Math.random;
    const fresh = list.filter(s => !seenMap[s.id]);
    const pool = fresh.length >= size ? fresh : list;
    const copy = pool.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, size);
  }

  function statsKey(lang) { return `${lang}_dictation_stats_v1`; }
  function loadStats(lang) {
    try {
      const raw = localStorage.getItem(statsKey(lang));
      const s = raw ? JSON.parse(raw) : null;
      return s && typeof s === 'object' ? Object.assign({ done: 0, firstTry: 0, seen: {} }, s) : { done: 0, firstTry: 0, seen: {} };
    } catch (_) { return { done: 0, firstTry: 0, seen: {} }; }
  }
  function saveStats(lang, s) {
    try { localStorage.setItem(statsKey(lang), JSON.stringify(s)); } catch (_) { /* bỏ qua */ }
  }

  const SentenceDictation = {
    el: null,
    lang: 'en',
    mode: 'listen', // listen | copy
    source: 'mixed',
    queue: [],
    idx: 0,
    tries: 0,
    result: null,
    revealed: false,
    sessionStats: null,

    mount(el) { this.el = el; },

    onShow(params, langId) {
      const lang = langId === 'zh' ? 'zh' : 'en';
      if (lang !== this.lang || !this.queue.length) {
        this.lang = lang;
        this.newSession();
      } else {
        this.render();
      }
    },

    onHide() {
      if (root.speechSynthesis) root.speechSynthesis.cancel();
    },

    newSession() {
      const list = collectSentences(this.lang, this.source);
      const stats = loadStats(this.lang);
      this.queue = pickSession(list, stats.seen || {}, SESSION_SIZE);
      this.idx = 0;
      this.tries = 0;
      this.result = null;
      this.revealed = false;
      this.retyped = new Set();
      this.sessionStats = { firstTry: 0, done: 0, wrongWords: [] };
      this.render(true);
    },

    current() { return this.queue[this.idx] || null; },

    say(slow) {
      const s = this.current();
      if (!s) return;
      const app = root.app;
      const tts = this.lang === 'en' ? 'en-US' : 'zh-CN';
      if (app && typeof app.speakText === 'function') app.speakText(s.text, slow ? 0.6 : null, tts);
    },

    render(autoplay) {
      if (!this.el) return;
      const s = this.current();
      const stats = loadStats(this.lang);
      const isZh = this.lang === 'zh';
      const head = `
        <div class="pb-page-head">
          <div>
            <h2 class="pb-page-title">${icon('keyboard', 24)} Nghe gõ câu</h2>
            <p class="pb-muted">Nghe một câu, gõ lại nguyên câu, sửa chỗ sai cho tới khi đúng. Tự gõ lại buộc não nhớ lại từng từ nên nhớ lâu hơn chỉ đọc.</p>
          </div>
          <div class="pb-page-stats"><strong>${stats.done || 0}</strong><span>câu đã gõ</span></div>
        </div>
        <div class="pb-toolbar">
          <label>Cách luyện
            <select id="pb-dict-mode">
              <option value="listen" ${this.mode === 'listen' ? 'selected' : ''}>Nghe rồi gõ (ẩn câu)</option>
              <option value="copy" ${this.mode === 'copy' ? 'selected' : ''}>Nhìn và nghe rồi gõ lại</option>
            </select>
          </label>
          <label>Nguồn câu
            <select id="pb-dict-source">
              <option value="mixed" ${this.source === 'mixed' ? 'selected' : ''}>Tất cả</option>
              <option value="dialogues" ${this.source === 'dialogues' ? 'selected' : ''}>Hội thoại</option>
              <option value="examples" ${this.source === 'examples' ? 'selected' : ''}>Câu ví dụ từ vựng</option>
            </select>
          </label>
          <button type="button" class="pb-btn pb-btn-ghost" data-d="new">${icon('refresh', 15)} Lượt mới</button>
        </div>`;

      if (!s) {
        const ss = this.sessionStats || { firstTry: 0, done: 0, wrongWords: [] };
        const added = ss.added || 0;
        this.el.innerHTML = head + `
          <div class="pb-card pb-dict-done">
            <h3 class="pb-card-title">Xong lượt ${ss.done} câu</h3>
            <p class="pb-big">${ss.firstTry}/${ss.done} <span>câu đúng ngay lần đầu</span></p>
            ${ss.wrongWords.length ? `<p class="pb-muted">Chỗ hay sai: ${ss.wrongWords.slice(0, 12).map(esc).join(', ')}</p>` : ''}
            ${added ? `<p class="pb-muted">Đã thêm ${added} từ hay sai vào Kho ôn chung.</p>` : ''}
            <div class="pb-row">
              <button type="button" class="pb-btn pb-btn-primary" data-d="new">Luyện tiếp 10 câu</button>
              <a class="pb-btn pb-btn-outline" href="#${this.lang}/flashcards?mode=due">Ôn thẻ</a>
            </div>
          </div>`;
        this.bind();
        return;
      }

      const showText = this.mode === 'copy' || this.revealed;
      const mustRetype = this.revealed && !(this.result && this.result.ok);
      const placeholder = isZh ? 'Gõ pinyin không cần dấu (wo hen hao) hoặc chữ Hán' : 'Gõ lại cả câu tiếng Anh';
      let feedback = '';
      if (this.result) {
        const r = this.result;
        if (r.ok) {
          feedback = `<p class="pb-good">${icon('check-circle', 16)} Chính xác${this.tries === 1 ? ' ngay lần đầu' : ''}!</p>`;
        } else if (this.revealed) {
          feedback = `<p class="pb-bad">Xem câu mẫu ở trên, gõ lại đúng một lần để ghi nhớ rồi qua câu mới.</p>`;
        } else {
          feedback = `<p class="pb-bad">Đúng ${r.accuracy}%. Sửa những chữ tô đỏ rồi bấm Kiểm tra lại (lần ${this.tries}/${MAX_TRIES}).</p>`;
        }
        feedback = (B().SentenceCheck ? B().SentenceCheck.render(r) : '') + feedback;
      }

      this.el.innerHTML = head + `
        <div class="pb-card pb-dict-card">
          <div class="pb-try-progress"><span class="pb-muted pb-small">Câu ${this.idx + 1}/${this.queue.length} · ${esc(s.from || '')}</span>
            <div class="pb-dots">${this.queue.map((_, i) => `<span class="pb-dot ${i < this.idx ? 'is-done' : ''} ${i === this.idx ? 'is-now' : ''}"></span>`).join('')}</div>
          </div>
          <div class="pb-dict-audio">
            <button type="button" class="pb-play-big" data-d="play" aria-label="Nghe câu">${icon('volume', 30)}</button>
            <button type="button" class="pb-btn pb-btn-ghost" data-d="slow">${icon('speaker-slow', 16)} Nghe chậm</button>
            <button type="button" class="pb-btn pb-btn-ghost" data-d="hint">${this.showHint ? 'Ẩn nghĩa' : 'Gợi ý nghĩa'}</button>
          </div>
          ${this.showHint || showText ? `<p class="pb-dict-vi">${esc(s.vi || '')}</p>` : ''}
          ${showText ? `<div class="pb-dict-text" lang="${this.lang}">${esc(s.text)}${s.py ? `<div class="pb-muted">${esc(s.py)}</div>` : ''}</div>` : ''}
          <textarea id="pb-dict-input" class="pb-input pb-textarea" rows="2" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${placeholder}" ${this.result && this.result.ok ? 'disabled' : ''}>${esc(this.draft || '')}</textarea>
          <div class="pb-dict-feedback" aria-live="polite">${feedback}</div>
          <div class="pb-row">
            ${this.result && this.result.ok
              ? `<button type="button" class="pb-btn pb-btn-primary" data-d="next">${this.idx + 1 >= this.queue.length ? 'Xem kết quả' : 'Câu tiếp'} ${icon('arrow-right', 15)}</button>`
              : `<button type="button" class="pb-btn pb-btn-primary" data-d="check">Kiểm tra</button>
                 ${!this.revealed ? '<button type="button" class="pb-btn pb-btn-ghost" data-d="reveal">Xem đáp án</button>' : ''}`}
          </div>
          <p class="pb-muted pb-small">Phím tắt: Enter để kiểm tra, Ctrl + Space để nghe lại.${mustRetype ? ' Đã xem đáp án: gõ lại đúng để tiếp tục.' : ''}</p>
        </div>`;
      this.bind();
      const inp = this.el.querySelector('#pb-dict-input');
      if (inp && !(this.result && this.result.ok)) inp.focus();
      if (autoplay) setTimeout(() => this.say(false), 250);
    },

    bind() {
      const el = this.el;
      const on = (sel, ev, fn) => { const x = el.querySelector(sel); if (x) x.addEventListener(ev, fn); };
      on('#pb-dict-mode', 'change', (e) => { this.mode = e.target.value; this.render(); });
      on('#pb-dict-source', 'change', (e) => { this.source = e.target.value; this.newSession(); });
      el.querySelectorAll('[data-d]').forEach(b => b.addEventListener('click', () => this.action(b.getAttribute('data-d'))));
      const inp = el.querySelector('#pb-dict-input');
      if (inp) {
        inp.addEventListener('input', () => { this.draft = inp.value; });
        inp.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.action(this.result && this.result.ok ? 'next' : 'check'); }
          else if (e.key === ' ' && e.ctrlKey) { e.preventDefault(); this.say(false); }
        });
      }
    },

    action(a) {
      if (a === 'new') return this.newSession();
      if (a === 'play') return this.say(false);
      if (a === 'slow') return this.say(true);
      if (a === 'hint') { this.showHint = !this.showHint; return this.render(); }
      if (a === 'reveal') { this.revealed = true; this.tries = Math.max(this.tries, MAX_TRIES); return this.render(); }
      if (a === 'check') return this.check();
      if (a === 'next') {
        this.idx++;
        this.tries = 0;
        this.result = null;
        this.revealed = false;
        this.draft = '';
        this.showHint = false;
        if (this.idx >= this.queue.length) this.finishSession();
        return this.render(this.idx < this.queue.length);
      }
      return null;
    },

    check() {
      const s = this.current();
      const inp = this.el.querySelector('#pb-dict-input');
      if (!s || !inp || !inp.value.trim()) return;
      this.draft = inp.value;
      const sc = B().SentenceCheck;
      if (!sc) return;
      const res = sc.compare(this.lang, s.text, inp.value, { py: s.py });
      this.tries++;
      this.result = res;
      if (!res.ok) {
        res.wrong.forEach(w => { if (!this.sessionStats.wrongWords.includes(w)) this.sessionStats.wrongWords.push(w); });
        if (this.tries >= MAX_TRIES) this.revealed = true;
      } else {
        const stats = loadStats(this.lang);
        stats.done = (stats.done || 0) + 1;
        stats.seen = stats.seen || {};
        stats.seen[s.id] = Date.now();
        const first = this.tries === 1 && !this.revealed;
        if (first) { stats.firstTry = (stats.firstTry || 0) + 1; this.sessionStats.firstTry++; }
        this.sessionStats.done++;
        saveStats(this.lang, stats);
        if (root.Economy && typeof root.Economy.reward === 'function') {
          try { root.Economy.reward('sentenceTyped', { firstTry: first }); } catch (_) { /* bỏ qua */ }
        }
        if (root.app && typeof root.app.updateStreak === 'function') root.app.updateStreak();
        this.say(false);
      }
      this.render();
    },

    finishSession() {
      const ss = this.sessionStats;
      const bank = B().ReviewBank;
      if (!bank || !ss.wrongWords.length) return;
      let words = ss.wrongWords;
      if (this.lang === 'zh' && B().segmentZh) {
        // Chữ Hán sai → các từ có trong từ điển; pinyin sai thì không suy ra được từ nên bỏ qua.
        words = B().segmentZh(ss.wrongWords.join('')).map(v => v.hanzi);
      }
      ss.added = bank.addMany(this.lang, words, 'today');
    }
  };

  root.SentenceDictation = SentenceDictation;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SentenceDictation, collectSentences, pickSession };
  }
})();
