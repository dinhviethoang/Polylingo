/**
 * reading.js — Mục "Đọc và dịch": bài đọc ngắn song ngữ do Polylingo tự soạn.
 * Đọc cả bài (nghe, bật/tắt pinyin), rồi dịch từng câu sang tiếng Việt.
 * Chấm theo các ý chính của câu (điểm ước lượng), sau đó hiện bản dịch mẫu để tự so.
 * window.ReadTranslate = { mount(el), onShow(params, langId), onHide() }
 */
(function () {
  'use strict';

  const root = typeof window !== 'undefined' ? window : globalThis;
  const B = () => root.PolyBoost || {};
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const icon = (n, size) => (root.PolyIcons ? root.PolyIcons.svg(n, { size: size || 18 }) : '');
  const PASS = 70;

  function texts(lang) {
    return (lang === 'zh' ? root.READING_ZH : root.READING_EN) || [];
  }
  function progKey(lang) { return `${lang}_reading_progress_v1`; }
  function loadProg(lang) {
    try { return JSON.parse(localStorage.getItem(progKey(lang)) || '{}') || {}; } catch (_) { return {}; }
  }
  function saveProg(lang, p) {
    try { localStorage.setItem(progKey(lang), JSON.stringify(p)); } catch (_) { /* bỏ qua */ }
  }
  function sentText(lang, s) { return lang === 'zh' ? s.zh : s.en; }

  function verdict(score) {
    if (score >= 85) return { cls: 'pb-good', text: 'Rất sát nghĩa' };
    if (score >= PASS) return { cls: 'pb-good', text: 'Đúng ý chính' };
    if (score >= 40) return { cls: 'pb-warn', text: 'Gần đúng, còn thiếu ý' };
    return { cls: 'pb-bad', text: 'Chưa đúng ý' };
  }

  /** Từ trong bài có trong từ điển (để hiện mục "Từ trong bài"). */
  function glossary(lang, text) {
    const b = B();
    const out = [];
    const seen = new Set();
    if (lang === 'zh' && b.segmentZh) {
      b.segmentZh(text.sentences.map(s => s.zh).join('')).forEach(v => {
        if (seen.has(v.hanzi) || v.hanzi.length < 2 && !/[水茶书钱]/.test(v.hanzi)) return;
        seen.add(v.hanzi);
        out.push({ w: v.hanzi, ph: v.pinyin, vi: v.vi });
      });
    } else if (b.lookupWord) {
      const words = text.sentences.map(s => s.en).join(' ').match(/[A-Za-z']+/g) || [];
      const common = new Set(['a', 'an', 'the', 'i', 'is', 'it', 'and', 'my', 'to', 'of', 'in', 'at', 'on', 'he', 'she', 'we', 'for', 'her', 'his', 'me', 'him', 'are', 'so', 'by', 'but', 'with', 'there', 'one', 'can']);
      words.forEach(w => {
        const k = w.toLowerCase();
        if (common.has(k)) return;
        const info = b.lookupWord(w, 'en');
        if (!info || seen.has(info.word)) return;
        seen.add(info.word);
        out.push({ w: info.word, ph: info.phonetic, vi: info.vi });
      });
    }
    return out.slice(0, 12);
  }

  const ReadTranslate = {
    el: null,
    lang: 'en',
    current: null,
    idx: 0,
    answers: [],
    showPy: true,

    mount(el) { this.el = el; },

    onShow(params, langId) {
      this.lang = langId === 'zh' ? 'zh' : 'en';
      const id = params && params.get ? params.get('text') : null;
      const t = id ? texts(this.lang).find(x => x.id === id) : null;
      if (t) this.open(t.id);
      else { this.current = null; this.render(); }
    },

    onHide() { if (root.speechSynthesis) root.speechSynthesis.cancel(); },

    say(text, slow) {
      const app = root.app;
      if (app && typeof app.speakText === 'function') app.speakText(text, slow ? 0.6 : null, this.lang === 'en' ? 'en-US' : 'zh-CN');
    },

    open(id) {
      this.current = texts(this.lang).find(x => x.id === id) || null;
      this.idx = -1; // -1 = đọc cả bài trước
      this.answers = [];
      this.saved = false;
      this.render();
    },

    render() {
      if (!this.el) return;
      if (!this.current) return this.renderList();
      if (this.idx < 0) return this.renderRead();
      if (this.idx >= this.current.sentences.length) return this.renderDone();
      return this.renderSentence();
    },

    renderList() {
      const prog = loadProg(this.lang);
      const list = texts(this.lang);
      this.el.innerHTML = `
        <div class="pb-page-head">
          <div>
            <h2 class="pb-page-title">${icon('book-open', 24)} Đọc và dịch</h2>
            <p class="pb-muted">Đọc một bài ngắn, nghe đọc mẫu, rồi tự dịch từng câu sang tiếng Việt. Polylingo chấm theo ý chính và cho xem bản dịch mẫu để bạn tự so.</p>
          </div>
        </div>
        <div class="pb-read-grid">
          ${list.map(t => {
            const p = prog[t.id];
            return `<button type="button" class="pb-card pb-read-item" data-open="${t.id}">
              <span class="pb-chip">${esc(t.level)}</span>
              <strong lang="${this.lang}">${esc(t.title)}</strong>
              <span class="pb-muted">${esc(t.titleVi)} · ${t.sentences.length} câu</span>
              ${p ? `<span class="pb-read-best ${p.best >= PASS ? 'pb-good' : 'pb-warn'}">Điểm cao nhất ${p.best}%</span>` : '<span class="pb-read-best pb-muted">Chưa làm</span>'}
            </button>`;
          }).join('') || '<p class="pb-muted">Chưa có bài đọc.</p>'}
        </div>`;
      this.el.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => this.open(b.getAttribute('data-open'))));
    },

    backBar() {
      return `<button type="button" class="pb-link-btn" data-r="back">${icon('arrow-left', 15)} Tất cả bài đọc</button>`;
    },

    renderRead() {
      const t = this.current;
      const isZh = this.lang === 'zh';
      const gl = glossary(this.lang, t);
      this.el.innerHTML = `
        ${this.backBar()}
        <div class="pb-card pb-read-passage">
          <div class="pb-row pb-row-between">
            <div><h2 class="pb-card-title" lang="${this.lang}">${esc(t.title)}</h2><p class="pb-muted">${esc(t.titleVi)}</p></div>
            <div class="pb-row">
              <button type="button" class="pb-btn pb-btn-ghost" data-r="playall">${icon('volume', 16)} Nghe cả bài</button>
              ${isZh ? `<button type="button" class="pb-btn pb-btn-ghost" data-r="py">${this.showPy ? 'Ẩn pinyin' : 'Hiện pinyin'}</button>` : ''}
            </div>
          </div>
          <div class="pb-passage" lang="${this.lang}">
            ${t.sentences.map((s, i) => `<span class="pb-passage-s" data-say="${i}">${isZh && this.showPy ? `<ruby>${esc(s.zh)}<rt>${esc(s.py)}</rt></ruby>` : esc(sentText(this.lang, s))}</span>`).join(isZh ? '' : ' ')}
          </div>
          <p class="pb-muted pb-small">Bấm vào một câu để nghe. Bôi đen một từ để tra nghĩa.</p>
        </div>
        ${gl.length ? `<div class="pb-card"><h3 class="pb-card-title">Từ trong bài</h3><div class="pb-gloss">${gl.map(g => `<div class="pb-gloss-item"><strong lang="${this.lang}">${esc(g.w)}</strong><span class="pb-muted">${esc(g.ph || '')}</span><span>${esc(g.vi || '')}</span></div>`).join('')}</div></div>` : ''}
        <div class="pb-row"><button type="button" class="pb-btn pb-btn-primary" data-r="start">Bắt đầu dịch từng câu ${icon('arrow-right', 15)}</button></div>`;
      this.bindCommon();
      this.el.querySelectorAll('[data-say]').forEach(x => x.addEventListener('click', () => this.say(sentText(this.lang, t.sentences[+x.getAttribute('data-say')]))));
    },

    renderSentence() {
      const t = this.current;
      const s = t.sentences[this.idx];
      const ans = this.answers[this.idx];
      const isZh = this.lang === 'zh';
      let result = '';
      if (ans) {
        const v = verdict(ans.score);
        result = `
          <div class="pb-read-result">
            <p class="${v.cls}"><strong>${ans.score}%</strong> · ${v.text}</p>
            ${ans.hits.length ? `<p class="pb-small">Đã có ý: ${ans.hits.map(h => `<span class="pb-tag is-ok">${esc(h)}</span>`).join(' ')}</p>` : ''}
            ${ans.misses.length ? `<p class="pb-small">Còn thiếu: ${ans.misses.map(h => `<span class="pb-tag is-bad">${esc(h)}</span>`).join(' ')}</p>` : ''}
            <div class="pb-read-ref"><span class="pb-muted pb-small">Bản dịch mẫu</span><p>${esc(s.vi)}</p></div>
          </div>`;
      }
      this.el.innerHTML = `
        ${this.backBar()}
        <div class="pb-card pb-read-card">
          <div class="pb-try-progress"><span class="pb-muted pb-small">${esc(t.title)} · Câu ${this.idx + 1}/${t.sentences.length}</span>
            <div class="pb-dots">${t.sentences.map((_, i) => `<span class="pb-dot ${i < this.idx ? 'is-done' : ''} ${i === this.idx ? 'is-now' : ''}"></span>`).join('')}</div>
          </div>
          <div class="pb-read-src" lang="${this.lang}">
            <button type="button" class="pb-icon-btn" data-r="say" aria-label="Nghe câu">${icon('volume', 20)}</button>
            <div><div class="pb-read-line">${esc(sentText(this.lang, s))}</div>${isZh && this.showPy ? `<div class="pb-muted">${esc(s.py)}</div>` : ''}</div>
          </div>
          <label class="pb-small pb-muted" for="pb-read-input">Dịch câu trên sang tiếng Việt</label>
          <textarea id="pb-read-input" class="pb-input pb-textarea" rows="2" placeholder="Gõ bản dịch của bạn, có dấu hay không dấu đều được" ${ans ? 'disabled' : ''}>${esc(ans ? ans.text : (this.draft || ''))}</textarea>
          ${result}
          <div class="pb-row">
            ${ans
              ? `<button type="button" class="pb-btn pb-btn-primary" data-r="next">${this.idx + 1 >= t.sentences.length ? 'Xem kết quả' : 'Câu tiếp'} ${icon('arrow-right', 15)}</button>
                 <button type="button" class="pb-btn pb-btn-ghost" data-r="retry">Dịch lại câu này</button>`
              : `<button type="button" class="pb-btn pb-btn-primary" data-r="check">Chấm</button>
                 <button type="button" class="pb-btn pb-btn-ghost" data-r="skip">Bỏ qua, xem bản mẫu</button>`}
          </div>
          <p class="pb-muted pb-small">Điểm chỉ là ước lượng theo ý chính của câu, dùng để tự theo dõi. Dịch khác chữ nhưng đúng nghĩa vẫn là đúng.</p>
        </div>`;
      this.bindCommon();
      const inp = this.el.querySelector('#pb-read-input');
      if (inp && !ans) {
        inp.focus();
        inp.addEventListener('input', () => { this.draft = inp.value; });
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.check(); } });
      }
    },

    renderDone() {
      const t = this.current;
      const scores = this.answers.map(a => (a ? a.score : 0));
      const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      if (!this.saved) {
        const prog = loadProg(this.lang);
        const prev = prog[t.id] || { best: 0, times: 0 };
        prog[t.id] = { best: Math.max(prev.best || 0, avg), last: avg, times: (prev.times || 0) + 1, at: Date.now() };
        saveProg(this.lang, prog);
        this.saved = true;
      }
      const v = verdict(avg);
      this.el.innerHTML = `
        ${this.backBar()}
        <div class="pb-card pb-dict-done">
          <h3 class="pb-card-title">Xong bài “${esc(t.titleVi)}”</h3>
          <p class="pb-big ${v.cls}">${avg}% <span>${v.text}</span></p>
          <ol class="pb-read-review">
            ${t.sentences.map((s, i) => `<li><span lang="${this.lang}">${esc(sentText(this.lang, s))}</span><span class="pb-muted">${esc(s.vi)}</span><strong class="${verdict(scores[i] || 0).cls}">${scores[i] || 0}%</strong></li>`).join('')}
          </ol>
          <div class="pb-row">
            <button type="button" class="pb-btn pb-btn-primary" data-r="again">Làm lại bài này</button>
            <button type="button" class="pb-btn pb-btn-outline" data-r="back">Chọn bài khác</button>
          </div>
        </div>`;
      this.bindCommon();
    },

    bindCommon() {
      this.el.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => this.action(b.getAttribute('data-r'))));
    },

    action(a) {
      const t = this.current;
      if (a === 'back') { this.current = null; return this.render(); }
      if (a === 'py') { this.showPy = !this.showPy; return this.render(); }
      if (a === 'playall') return this.say(t.sentences.map(s => sentText(this.lang, s)).join(this.lang === 'zh' ? '' : ' '));
      if (a === 'start') { this.idx = 0; return this.render(); }
      if (a === 'say') return this.say(sentText(this.lang, t.sentences[this.idx]));
      if (a === 'check') return this.check();
      if (a === 'skip') { this.answers[this.idx] = { text: '', score: 0, hits: [], misses: t.sentences[this.idx].keys.map(k => k.split('|')[0]) }; return this.render(); }
      if (a === 'retry') { this.answers[this.idx] = null; this.draft = ''; return this.render(); }
      if (a === 'next') { this.idx++; this.draft = ''; return this.render(); }
      if (a === 'again') return this.open(t.id);
      return null;
    },

    check() {
      const s = this.current.sentences[this.idx];
      const inp = this.el.querySelector('#pb-read-input');
      if (!inp || !inp.value.trim() || !B().scoreTranslation) return;
      const res = B().scoreTranslation(inp.value, s.keys);
      this.answers[this.idx] = Object.assign({ text: inp.value }, res);
      if (res.score >= PASS && root.Economy && typeof root.Economy.reward === 'function') {
        try { root.Economy.reward('readingSentence'); } catch (_) { /* bỏ qua */ }
      }
      if (root.app && typeof root.app.updateStreak === 'function') root.app.updateStreak();
      this.render();
    }
  };

  root.ReadTranslate = ReadTranslate;
  if (typeof module !== 'undefined' && module.exports) module.exports = { ReadTranslate, verdict, glossary };
})();
