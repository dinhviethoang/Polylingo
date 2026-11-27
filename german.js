/**
 * german.js — Mục tiếng Đức của PolyLingo (window.DeStudio)
 * Các mục: Tổng quan, Phát âm & bảng chữ cái, Lộ trình 30 bài A1, Từ vựng, Ngữ pháp, Thẻ ghi nhớ (SM-2),
 * Luyện gõ (từ, mạo từ, số nhiều, chia động từ, nghe chép câu), Kiểm tra.
 * Dữ liệu: data/de/*.js qua window.DeCore.load(). Luyện nói và Hội thoại dùng talk.js và app.js sẵn có.
 * Khóa lưu: de_learn_progress_v1, de_sm2_data, de_typing_stats, de_quiz_wrongs, de_sound_stats.
 */
(function () {
  'use strict';

  const KEYS = {
    progress: 'de_learn_progress_v1',
    sm2: 'de_sm2_data',
    typing: 'de_typing_stats',
    wrongs: 'de_quiz_wrongs',
    sounds: 'de_sound_stats'
  };
  const SECTIONS = ['home', 'alphabet', 'learn', 'vocab', 'grammar', 'flashcards', 'typing', 'quiz'];
  const ARTICLES = ['der', 'die', 'das'];

  /* ---------- Tiện ích ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ic = (n, o) => (window.PolyIcons ? window.PolyIcons.svg(n, Object.assign({ size: 18 }, o || {})) : '');
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (arr, n) => shuffle(arr).slice(0, n);
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* bộ nhớ đầy hoặc bị chặn */ } }
  };
  const core = () => window.DeCore;
  const data = () => core().load();

  function speak(text, rate) {
    if (!text) return;
    if (window.app && typeof window.app.speakText === 'function') { window.app.speakText(text, rate || null, 'de-DE'); return; }
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    if (rate) u.rate = rate;
    window.speechSynthesis.speak(u);
  }
  function reward(key, payload) {
    try { if (window.Economy && typeof window.Economy.reward === 'function') window.Economy.reward(key, payload); } catch (e) { /* bỏ qua */ }
  }
  function markStudied() {
    try { if (window.app && typeof window.app.updateStreak === 'function') window.app.updateStreak(); } catch (e) { /* bỏ qua */ }
  }
  function toast(msg, type) {
    if (window.app && typeof window.app.showToast === 'function') window.app.showToast(msg, type || 'info');
  }
  function speakBtn(text, label) {
    return `<button type="button" class="de-icon-btn" data-act="speak" data-text="${esc(text)}" aria-label="${esc(label || 'Nghe phát âm')}" title="Nghe">${ic('volume')}</button>`;
  }
  /** Từ có tô màu theo giống: der xanh dương, die đỏ, das xanh lá. */
  function wordHtml(w) {
    if (w.pos === 'n' && w.art) {
      const shown = w.art === 'pl' ? 'die' : w.art;
      return `<span class="de-de"><span class="de-art de-art-${esc(w.art)}">${esc(shown)}</span> ${esc(w.word)}</span>`;
    }
    return `<span class="de-de">${esc(w.word)}</span>`;
  }
  const sayOf = w => w.display;

  /* ---------- Tiến độ ---------- */
  function getProgress() { return store.get(KEYS.progress, { lessons: {}, lastLesson: null }); }
  function saveLessonResult(lessonId, pct, isCheckpoint) {
    const p = getProgress();
    const need = isCheckpoint ? 80 : 60;
    const stars = pct >= 90 ? 3 : pct >= 75 ? 2 : pct >= need ? 1 : 0;
    const prev = p.lessons[lessonId] || { stars: 0, best: 0 };
    const firstPass = !prev.completed && stars > 0;
    p.lessons[lessonId] = { stars: Math.max(prev.stars || 0, stars), best: Math.max(prev.best || 0, pct), completed: prev.completed || stars > 0, at: Date.now() };
    p.lastLesson = lessonId;
    store.set(KEYS.progress, p);
    if (firstPass) {
      reward(isCheckpoint ? 'checkpointPass' : 'lessonDone');
      if (pct === 100) reward('lessonPerfect');
    }
    markStudied();
    return { stars, passed: stars > 0, need };
  }
  function nextLesson() {
    const p = getProgress();
    return data().lessons.find(l => !(p.lessons[l.id] && p.lessons[l.id].completed)) || data().lessons[data().lessons.length - 1];
  }
  function sm2Data() { return store.get(KEYS.sm2, {}); }
  function addToDeck(ids) {
    const d = sm2Data();
    let added = 0;
    ids.forEach(id => { if (!d[id]) { d[id] = { ef: 2.5, interval: 0, repetition: 0, due: Date.now() }; added++; } });
    store.set(KEYS.sm2, d);
    return added;
  }
  function learnedCount() {
    const d = sm2Data();
    return Object.keys(d).filter(id => d[id] && (d[id].repetition >= 2 || d[id].interval >= 3)).length;
  }
  function dueIds() {
    const d = sm2Data();
    const now = Date.now();
    return Object.keys(d).filter(id => d[id] && (d[id].due || 0) <= now && data().wordMap[id]);
  }

  /* ---------- Sinh câu hỏi ---------- */
  function distractors(target, pool, field, n) {
    const seen = new Set([target[field]]);
    const same = shuffle(pool.filter(w => w.pos === target.pos && w.id !== target.id));
    const rest = shuffle(pool.filter(w => w.pos !== target.pos && w.id !== target.id));
    const out = [];
    for (const w of same.concat(rest)) {
      if (out.length >= n) break;
      if (!w[field] || seen.has(w[field])) continue;
      seen.add(w[field]);
      out.push(w[field]);
    }
    return out;
  }
  function mcq(prompt, correct, wrongs, extra) {
    const choices = shuffle([correct].concat(wrongs));
    return Object.assign({ kind: 'mcq', prompt, choices, answer: choices.indexOf(correct) }, extra || {});
  }
  const hasArticle = w => w.pos === 'n' && ARTICLES.includes(w.art);
  const explainOf = w => `${w.display} = ${w.vi}${w.plural ? ` (số nhiều: ${w.plural})` : ''}`;
  const Q = {
    meaning(w, pool) {
      return mcq(`<div class="de-q-big">${wordHtml(w)}</div>`, w.vi, distractors(w, pool, 'vi', 3),
        { audio: sayOf(w), ask: 'Từ này nghĩa là gì?', wordId: w.id, explain: explainOf(w) });
    },
    listen(w, pool) {
      return mcq(`<button type="button" class="de-big-play" data-act="speak" data-text="${esc(sayOf(w))}" aria-label="Nghe lại">${ic('volume', { size: 34 })}</button>`,
        w.display, distractors(w, pool, 'display', 3), { audio: sayOf(w), autoplay: true, ask: 'Nghe và chọn từ đúng:', wordId: w.id, explain: explainOf(w), choiceClass: 'de-de' });
    },
    viToDe(w, pool) {
      return mcq(`<div class="de-q-mid">${esc(w.vi)}</div>`, w.display, distractors(w, pool, 'display', 3),
        { ask: 'Chọn từ tiếng Đức đúng nghĩa:', wordId: w.id, explain: explainOf(w), choiceClass: 'de-de' });
    },
    article(w) {
      return { kind: 'mcq', prompt: `<div class="de-q-big de-de">${esc(w.word)}</div><div class="de-q-sub">${esc(w.vi)}</div>`, choices: ARTICLES.slice(), answer: ARTICLES.indexOf(w.art),
        ask: 'Chọn mạo từ đúng (der, die hay das?):', wordId: w.id, audio: sayOf(w), explain: `${w.display} (${core().GENDER[w.art].label})`, choiceClass: 'de-de de-choice-art' };
    },
    type(w) {
      const expected = [w.display];
      return { kind: 'type', prompt: `<div class="de-q-mid">${esc(w.vi)}</div>${w.pos === 'n' && w.art ? '<div class="de-q-sub">Gõ kèm mạo từ der, die hoặc das</div>' : ''}`,
        expected, noun: w.pos === 'n' ? w.word : '', ask: 'Gõ từ tiếng Đức có nghĩa này:', wordId: w.id, audio: sayOf(w), explain: explainOf(w) };
    },
    plural(w) {
      return { kind: 'type', prompt: `<div class="de-q-big">${wordHtml(w)}</div><div class="de-q-sub">${esc(w.vi)}</div>`, expected: [w.plural, w.plural.replace(/^die\s+/, '')],
        ask: 'Gõ dạng số nhiều:', wordId: w.id, audio: w.plural, explain: `${w.display} → ${w.plural}` };
    },
    conj(w, person, tense) {
      const ans = tense === 'perfekt' ? core().perfekt(w, person) : core().conjugate(w, person);
      const label = core().PERSON_LABELS[person];
      return { kind: 'type', prompt: `<div class="de-q-big de-de">${esc(w.word)}</div><div class="de-q-sub">${esc(w.vi)}</div>`,
        expected: [ans], ask: tense === 'perfekt' ? `Chia Perfekt với "${label}" (vd: hat gemacht):` : `Chia hiện tại với "${label}":`, wordId: w.id,
        audio: `${person === 'er' ? 'er' : person} ${ans}`, explain: `${label} ${ans}` };
    },
    dictation(w) {
      return { kind: 'type', long: true, prompt: `<button type="button" class="de-big-play" data-act="speak" data-text="${esc(w.ex.de)}" aria-label="Nghe lại">${ic('volume', { size: 34 })}</button>
          <div class="de-actions de-center-row"><button type="button" class="de-btn de-btn-ghost" data-act="speak-slow" data-text="${esc(w.ex.de)}">Nghe chậm</button></div>`,
        expected: [w.ex.de], sentence: w.ex.de, ask: 'Nghe rồi gõ lại cả câu:', wordId: w.id, audio: w.ex.de, autoplay: true, explain: `${w.ex.de} = ${w.ex.vi}` };
    },
    pair(p) {
      const i = Math.random() < 0.5 ? 0 : 2;
      const correct = p[i];
      return mcq(`<button type="button" class="de-big-play" data-act="speak" data-text="${esc(correct)}" aria-label="Nghe lại">${ic('volume', { size: 34 })}</button>`,
        correct, [p[i === 0 ? 2 : 0]], { audio: correct, autoplay: true, ask: `Nghe và chọn từ đúng (${p[4]}):`, soundKey: p[4], choiceClass: 'de-de',
          explain: `${p[0]} (${p[1]}) · ${p[2]} (${p[3]})` });
    },
    soundWord(e, pool) {
      const wrong = pick(pool.filter(x => x.w !== e.w), 3).map(x => x.w);
      return mcq(`<button type="button" class="de-big-play" data-act="speak" data-text="${esc(e.w)}" aria-label="Nghe lại">${ic('volume', { size: 34 })}</button>`,
        e.w, Array.from(new Set(wrong)), { audio: e.w, autoplay: true, ask: 'Nghe và chọn từ bạn nghe được:', choiceClass: 'de-de', explain: `${e.w} = ${e.vi}` });
    },
    spell(e) {
      const letters = Array.from(e.w.toUpperCase()).join(', ');
      return { kind: 'type', prompt: `<button type="button" class="de-big-play" data-act="speak" data-text="${esc(letters)}" data-rate="0.7" aria-label="Nghe đánh vần">${ic('volume', { size: 34 })}</button>`,
        expected: [e.w], audio: e.w, ask: 'Nghe đánh vần rồi gõ lại từ:', autoplay: true, autoplayText: letters, autoplayRate: 0.7, explain: `${letters} → ${e.w} (${e.vi})` };
    }
  };
  function wordQuestions(words, pool, n, types) {
    const list = pick(words, Math.min(n, words.length));
    return list.map((w, i) => {
      let t = types[i % types.length];
      if (t === 'article' && !hasArticle(w)) t = 'meaning';
      if (t === 'plural' && !w.plural) t = 'viToDe';
      return Q[t](w, pool);
    });
  }
  function soundPool(groupIds) {
    const S = data().sounds || { groups: [] };
    const out = [];
    S.groups.filter(g => !groupIds || groupIds.includes(g.id)).forEach(g => g.items.forEach(it => it.ex.forEach(e => { if (!/\s/.test(e.w)) out.push(e); })));
    return out;
  }
  function soundQuestions(groupIds, n) {
    const S = data().sounds;
    const pool = soundPool(groupIds);
    const qs = pick(pool, Math.ceil(n * 0.6)).map(e => Q.soundWord(e, pool.length >= 4 ? pool : soundPool()));
    pick(S.pairs, n - qs.length).forEach(p => qs.push(Q.pair(p)));
    return shuffle(qs);
  }

  /* ---------- Vẽ khung trang ---------- */
  function hero(title, sub, side) {
    return `<header class="de-hero"><div><p class="de-eyebrow">Deutsch · Tiếng Đức</p><h1 class="de-title">${esc(title)}</h1>${sub ? `<p class="de-sub">${esc(sub)}</p>` : ''}</div>${side || ''}</header>`;
  }
  function conjTableHtml(w) {
    const t = core().conjTable(w);
    if (!t) return '';
    const info = core().verbInfo(w);
    return `<table class="de-table de-conj"><thead><tr><th>Ngôi</th><th>Hiện tại</th>${info.perfekt ? '<th>Perfekt</th>' : ''}</tr></thead><tbody>
      ${t.map(r => `<tr><td>${esc(r.label)}</td><td class="de-de ${(r.person === 'du' || r.person === 'er') && info.stemChange ? 'de-hl' : ''}">${esc(r.present)}</td>${info.perfekt ? `<td class="de-de">${esc(r.perfekt)}</td>` : ''}</tr>`).join('')}
    </tbody></table>`;
  }
  function tableHtml(tb) {
    if (!tb) return '';
    return `<div class="de-table-wrap"><table class="de-table"><thead><tr>${tb.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${tb.rows.map(r => `<tr>${r.map((c, i) => `<td class="${i ? 'de-de' : ''}">${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  const DeStudio = {
    SECTIONS,
    el: null,
    section: 'home',
    state: {},
    quiz: null,

    show(el, section, params) {
      if (!el || !window.DeCore) return;
      if (this.el !== el) {
        this.el = el;
        el.addEventListener('click', e => this.onClick(e));
        el.addEventListener('input', e => this.onInput(e));
        el.addEventListener('keydown', e => this.onKey(e));
        el.addEventListener('change', e => this.onChange(e));
      }
      this.section = SECTIONS.includes(section) ? section : 'home';
      this.params = params || new URLSearchParams();
      this.quiz = null;
      this.render();
      try { window.scrollTo(0, 0); } catch (e) { /* bỏ qua */ }
    },
    hide() {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    },
    render() {
      const fn = this['render_' + this.section] || this.render_home;
      this.el.innerHTML = `<div class="de-wrap">${fn.call(this)}</div>`;
      if (this.afterRender) { const f = this.afterRender; this.afterRender = null; f(); }
    },

    /* ===== Tổng quan ===== */
    render_home() {
      const d = data();
      const p = getProgress();
      const done = d.lessons.filter(l => p.lessons[l.id] && p.lessons[l.id].completed).length;
      const nx = nextLesson();
      const due = dueIds().length;
      const withEx = d.words.filter(w => w.ex && w.pos !== 'num');
      const wod = withEx[Math.floor(Date.now() / 86400000) % withEx.length];
      const cards = [
        ['alphabet', 'languages', 'Phát âm', 'Bảng chữ cái, Ä Ö Ü, ch, sch, luyện nghe'],
        ['learn', 'map', `Lộ trình ${d.lessons.length} bài`, '3 bài phát âm và 27 bài A1, mỗi bài một mục tiêu'],
        ['vocab', 'book-open', 'Từ vựng A1', `${d.words.length} từ có mạo từ, số nhiều, câu ví dụ`],
        ['grammar', 'scroll', 'Ngữ pháp', `${d.grammar.length} bảng tra nhanh: mạo từ, cách, chia động từ`],
        ['flashcards', 'cards', 'Thẻ ghi nhớ', due ? `${due} thẻ đến hạn ôn hôm nay` : 'Ôn ngắt quãng SM-2'],
        ['typing', 'keyboard', 'Luyện gõ', 'Gõ từ, mạo từ, số nhiều, chia động từ, nghe chép câu'],
        ['quiz', 'target', 'Kiểm tra', 'Trắc nghiệm nghĩa, nghe, der/die/das'],
        ['talk', 'mic', 'Luyện nói', 'Nói từng từ, nhập vai 6 tình huống, đóng vai A–B'],
        ['dialogues', 'chat', 'Hội thoại', '10 bài hội thoại đời sống ở Đức']
      ];
      return `${hero('Tiếng Đức cho người Việt', 'Từ bảng chữ cái đến trình độ A1, từng bài nhỏ mỗi ngày. Danh từ luôn học kèm mạo từ, động từ luôn có bảng chia.',
        '<div class="de-hero-flag" aria-hidden="true"><span></span><span></span><span></span></div>')}
        <section class="de-grid-2">
          <div class="de-card de-next">
            <p class="de-eyebrow">Bài tiếp theo</p>
            <h2>Bài ${nx.no}: ${esc(nx.title)}</h2>
            <p class="de-muted">${esc(nx.goal)}</p>
            <div class="de-progress"><span style="width:${Math.round(done / d.lessons.length * 100)}%"></span></div>
            <p class="de-small">Đã xong ${done}/${d.lessons.length} bài · Đã thuộc ${learnedCount()} từ</p>
            <a class="de-btn de-btn-primary" href="#de/learn?lesson=${nx.id}">${ic('play')} Học ngay</a>
          </div>
          <div class="de-card de-wod">
            <p class="de-eyebrow">Từ của ngày</p>
            <div class="de-wod-word">${wordHtml(wod)} ${speakBtn(sayOf(wod))}</div>
            <p><strong>${esc(wod.vi)}</strong> · ${esc(wod.posLabel)}${wod.plural ? ` · số nhiều: <span class="de-de">${esc(wod.plural)}</span>` : ''}</p>
            <p class="de-ex"><span class="de-de">${esc(wod.ex.de)}</span><br><span class="de-muted">${esc(wod.ex.vi)}</span></p>
          </div>
        </section>
        <section class="de-feature-grid">
          ${cards.map(c => `<a class="de-feature" href="#de/${c[0]}"><span class="de-feature-icon">${ic(c[1], { size: 22 })}</span><span><strong>${c[2]}</strong><small>${esc(c[3])}</small></span></a>`).join('')}
        </section>
        <section class="de-card de-tip">
          <h3>${ic('lightbulb')} Mẹo cho người Việt</h3>
          <p>Tiếng Đức viết bằng chữ Latinh và đọc gần như "viết sao đọc vậy", nên chỉ cần vài tuần là đọc được. Hai điều khó nhất là <strong>giống của danh từ</strong> (der, die, das) và <strong>vị trí của động từ</strong>. Màu chữ trong app giúp bạn nhớ giống: <span class="de-art de-art-der">der</span> <span class="de-art de-art-die">die</span> <span class="de-art de-art-das">das</span>.</p>
          <p class="de-small de-muted">Cách học tham khảo từ các trang dạy tiếng Đức uy tín (bài học theo mục tiêu giao tiếp, danh sách từ A1, ôn ngắt quãng, tô màu giống danh từ). Nội dung do PolyLingo tự soạn.</p>
        </section>`;
    },

    /* ===== Phát âm ===== */
    render_alphabet() {
      const S = data().sounds;
      const tab = this.state.abcTab || 'abc';
      const tabs = [['abc', 'Bảng chữ cái'], ['sounds', 'Quy tắc phát âm'], ['pairs', 'Cặp âm dễ nhầm'], ['drill', 'Luyện nghe']];
      let body = '';
      if (tab === 'abc') {
        const sel = S.alphabet.find(a => a.ch === this.state.abcChar) || S.alphabet[0];
        body = `<div class="de-grid-2 de-abc-layout"><div class="de-card"><div class="de-abc-grid">
            ${S.alphabet.map(a => `<button type="button" class="de-abc-cell ${a.ch === sel.ch ? 'active' : ''}" data-act="abc" data-ch="${esc(a.ch)}"><span class="de-de">${esc(a.ch)}${a.ch.length === 1 && a.ch !== 'ß' ? esc(a.ch.toLowerCase()) : ''}</span><small>${esc(a.say)}</small></button>`).join('')}
          </div></div>
          <div class="de-card de-abc-detail">
            <div class="de-abc-top"><div class="de-abc-giant de-de">${esc(sel.ch)}</div><div><div class="de-abc-name">Tên chữ: <strong class="de-de">${esc(sel.name)}</strong></div><div class="de-muted">Đọc gần như: ${esc(sel.say)}</div>${speakBtn(sel.name, 'Nghe tên chữ')}</div></div>
            <div class="de-chip-row">${sel.ex.map(e => `<button type="button" class="de-chip" data-act="speak" data-text="${esc(e.w)}"><span class="de-de">${esc(e.w)}</span> · ${esc(e.vi)}</button>`).join('')}</div>
          </div></div>`;
      } else if (tab === 'sounds') {
        body = S.groups.map(g => this.soundGroupHtml(g)).join('');
      } else if (tab === 'pairs') {
        body = `<div class="de-card"><p class="de-muted">Bấm từng từ để nghe, chú ý chỗ khác nhau. Sau đó vào "Luyện nghe" để tự kiểm tra.</p>
          <div class="de-pair-list">${S.pairs.map(p => `<div class="de-pair"><button type="button" class="de-chip" data-act="speak" data-text="${esc(p[0])}"><span class="de-de">${esc(p[0])}</span> · ${esc(p[1])}</button>
            <span class="de-pair-vs">${esc(p[4])}</span><button type="button" class="de-chip" data-act="speak" data-text="${esc(p[2])}"><span class="de-de">${esc(p[2])}</span> · ${esc(p[3])}</button></div>`).join('')}</div></div>`;
      } else {
        const stats = store.get(KEYS.sounds, {});
        const weak = Object.keys(stats).filter(k => stats[k].fail > stats[k].ok);
        body = `<div class="de-card"><h3>Luyện nghe phát âm</h3>
          <p class="de-muted">Máy đọc một từ, bạn chọn từ nghe được. Có hai kiểu: phân biệt cặp âm dễ nhầm và nghe đánh vần rồi gõ lại từ.</p>
          <div class="de-actions">
            <button type="button" class="de-btn de-btn-primary" data-act="drill-start" data-mode="listen">${ic('volume')} Nghe và chọn (12 câu)</button>
            <button type="button" class="de-btn" data-act="drill-start" data-mode="spell">${ic('keyboard')} Nghe đánh vần, gõ từ</button>
          </div>
          ${weak.length ? `<p class="de-small de-muted">Âm bạn hay nhầm: ${weak.map(esc).join(', ')}</p>` : ''}</div>`;
      }
      return `${hero('Phát âm và bảng chữ cái', 'Tiếng Đức đọc khá đúng theo mặt chữ. Học tên 30 chữ cái, rồi các quy tắc đọc khác tiếng Việt. Bấm loa để nghe giọng đọc tiếng Đức.')}
        <nav class="de-tabs" role="tablist">${tabs.map(t => `<button type="button" role="tab" aria-selected="${tab === t[0]}" class="de-tab ${tab === t[0] ? 'active' : ''}" data-act="abc-tab" data-tab="${t[0]}">${t[1]}</button>`).join('')}</nav>
        <div class="de-quiz-host">${body}</div>`;
    },
    soundGroupHtml(g) {
      return `<div class="de-card de-sound-group"><h3>${esc(g.title)}</h3><p class="de-muted">${esc(g.desc)}</p>
        ${g.items.map(it => `<div class="de-sound-item"><div class="de-sound-head"><strong class="de-de">${esc(it.sound)}</strong></div><p>${esc(it.tip)}</p>
          <div class="de-chip-row">${it.ex.map(e => `<button type="button" class="de-chip" data-act="speak" data-text="${esc(e.w)}"><span class="de-de">${esc(e.w)}</span> · ${esc(e.vi)}</button>`).join('')}</div></div>`).join('')}</div>`;
    },
    startSoundDrill(mode) {
      let qs;
      if (mode === 'spell') {
        const pool = data().words.filter(w => w.pos === 'n' && w.word.length >= 3 && w.word.length <= 7 && !/[\s-]/.test(w.word));
        qs = pick(pool, 10).map(w => Q.spell({ w: w.word, vi: w.vi }));
      } else qs = soundQuestions(null, 12);
      this.startQuiz(qs, { title: 'Luyện nghe', host: '.de-quiz-host', onFinish: () => '' });
    },

    /* ===== Lộ trình ===== */
    render_learn() {
      const id = this.params.get('lesson');
      const lesson = id && data().lessons.find(l => l.id === id);
      if (lesson) return this.renderLesson(lesson);
      const d = data();
      const p = getProgress();
      const nx = nextLesson();
      const stages = (d.curriculum.stages || []).map(st => {
        const list = d.lessons.filter(l => l.no >= st.range[0] && l.no <= st.range[1]);
        return `<section class="de-stage"><h2 class="de-stage-title">${esc(st.title)}</h2><div class="de-lesson-grid">
          ${list.map(l => {
            const r = p.lessons[l.id] || {};
            const stars = r.stars || 0;
            return `<a class="de-lesson ${r.completed ? 'done' : ''} ${nx.id === l.id ? 'next' : ''} ${l.checkpoint ? 'checkpoint' : ''}" href="#de/learn?lesson=${l.id}">
              <span class="de-lesson-no">${l.no}</span>
              <span class="de-lesson-body"><strong>${esc(l.title)}</strong><small>${esc(l.goal)}</small>
              <span class="de-lesson-meta">${l.stage === 'sounds' ? 'Phát âm' : `${l.wordIds.length} từ · ${(l.grammar || []).length} mẫu câu`}${l.checkpoint ? ' · Kiểm tra chặng' : ''}</span></span>
              <span class="de-stars" aria-label="${stars} sao">${[1, 2, 3].map(i => ic(i <= stars ? 'star-filled' : 'star', { size: 14 })).join('')}</span>
              ${nx.id === l.id ? '<span class="de-badge">Học tiếp</span>' : ''}
            </a>`;
          }).join('')}
        </div></section>`;
      }).join('');
      return `${hero('Lộ trình tiếng Đức A1', `${d.lessons.length} bài: 3 bài phát âm, 27 bài theo khung A1. Mỗi bài cần đạt 60% (bài kiểm tra chặng cần 80%) để tính là xong.`)}${stages}`;
    },
    renderLesson(l) {
      const step = this.state.lessonStep && this.state.lessonFor === l.id ? this.state.lessonStep : 'learn';
      const d = data();
      const words = l.wordIds.map(id => d.wordMap[id]).filter(Boolean);
      const isSound = l.stage === 'sounds';
      const steps = isSound
        ? [['learn', 'Phát âm'], ['practice', l.checkpoint ? 'Kiểm tra chặng' : 'Luyện tập']]
        : [['learn', 'Từ vựng'], ['grammar', 'Ngữ pháp'], ['practice', l.checkpoint ? 'Kiểm tra chặng' : 'Luyện tập']];
      const r = getProgress().lessons[l.id] || {};
      let body = '';
      if (step === 'learn' && isSound) {
        const S = d.sounds;
        body = (l.sounds || []).map(id => S.groups.find(g => g.id === id)).filter(Boolean).map(g => this.soundGroupHtml(g)).join('');
        if ((l.sounds || []).includes('abc')) body += `<div class="de-card"><p>Xem đủ 30 chữ cái và tên chữ ở mục <a class="de-link" href="#de/alphabet">Phát âm</a>.</p></div>`;
      } else if (step === 'learn') {
        body = `<div class="de-actions"><button type="button" class="de-btn" data-act="play-all" data-lesson="${l.id}">${ic('play')} Nghe tất cả</button>
          <button type="button" class="de-btn de-btn-ghost" data-act="deck-add" data-lesson="${l.id}">${ic('plus')} Thêm ${words.length} từ vào thẻ ghi nhớ</button></div>
          <div class="de-word-list">${words.map(w => this.wordCard(w)).join('')}</div>`;
      } else if (step === 'grammar') {
        const ref = d.grammar.filter(g => g.lesson === l.no);
        body = (l.grammar || []).map(g => `<div class="de-card de-grammar"><h3 class="de-de">${esc(g.p)}</h3><p>${esc(g.vi)}</p>
          ${(g.ex || []).map(e => `<div class="de-ex-row">${speakBtn(e[0])}<div><div class="de-de">${esc(e[0])}</div><div class="de-muted">${esc(e[1])}</div></div></div>`).join('')}</div>`).join('')
          + (ref.length ? `<div class="de-card"><p>Bảng tra liên quan: ${ref.map(g => `<a class="de-link" href="#de/grammar?topic=${g.id}">${esc(g.title)}</a>`).join(' · ')}</p></div>` : '');
      } else {
        body = `<div class="de-card"><p>${l.checkpoint ? 'Kiểm tra chặng gồm câu hỏi của các bài gần nhất, cần đạt <strong>80%</strong>.' : 'Làm 10 câu hỏi về bài này, cần đạt <strong>60%</strong>. Sao: 60% một sao, 75% hai sao, 90% ba sao.'}</p>
          ${r.best ? `<p class="de-muted">Điểm cao nhất: ${r.best}%</p>` : ''}
          <button type="button" class="de-btn de-btn-primary" data-act="lesson-quiz" data-lesson="${l.id}">${ic('play')} Bắt đầu</button></div>`;
      }
      const idx = d.lessons.indexOf(l);
      const prev = d.lessons[idx - 1];
      const next = d.lessons[idx + 1];
      return `<a class="de-back" href="#de/learn">${ic('arrow-left')} Lộ trình</a>
        ${hero(`Bài ${l.no}: ${l.title}`, `Mục tiêu: ${l.goal}`, `<div class="de-stars de-stars-lg">${[1, 2, 3].map(i => ic(i <= (r.stars || 0) ? 'star-filled' : 'star', { size: 22 })).join('')}</div>`)}
        <nav class="de-tabs" role="tablist">${steps.map((s, i) => `<button type="button" role="tab" aria-selected="${step === s[0]}" class="de-tab ${step === s[0] ? 'active' : ''}" data-act="lesson-step" data-step="${s[0]}" data-lesson="${l.id}">${i + 1}. ${s[1]}</button>`).join('')}</nav>
        <div class="de-quiz-host">${body}</div>
        <div class="de-lesson-nav">${prev ? `<a class="de-btn de-btn-ghost" href="#de/learn?lesson=${prev.id}">${ic('chevron-left')} Bài ${prev.no}</a>` : '<span></span>'}${next ? `<a class="de-btn de-btn-ghost" href="#de/learn?lesson=${next.id}">Bài ${next.no} ${ic('chevron-right')}</a>` : ''}</div>`;
    },
    startLessonQuiz(l) {
      const d = data();
      let qs;
      if (l.stage === 'sounds') {
        qs = soundQuestions(l.checkpoint ? null : l.sounds, 10);
      } else {
        const range = l.checkpoint ? d.lessons.filter(x => x.stage !== 'sounds' && x.no <= l.no && x.no > l.no - 5) : [l];
        const ids = Array.from(new Set(range.flatMap(x => x.wordIds)));
        const words = ids.map(id => d.wordMap[id]).filter(Boolean);
        qs = wordQuestions(words, d.words, l.checkpoint ? 15 : 10, ['meaning', 'listen', 'article', 'viToDe', 'type']);
      }
      this.startQuiz(qs, {
        title: `Bài ${l.no}`, host: '.de-quiz-host',
        onFinish: (pct) => {
          const res = saveLessonResult(l.id, pct, !!l.checkpoint);
          if (l.stage !== 'sounds') addToDeck(l.wordIds);
          return res.passed ? `Đạt ${res.stars} sao.${l.stage !== 'sounds' ? ' Từ của bài đã vào thẻ ghi nhớ.' : ''}` : `Cần ${res.need}% để qua bài. Xem lại bài rồi thử lần nữa nhé.`;
        }
      });
    },
    wordCard(w) {
      const info = core().verbInfo(w);
      const open = this.state.conjOpen === w.id;
      return `<article class="de-word">
        <div class="de-word-main">${wordHtml(w)} ${speakBtn(sayOf(w))}</div>
        <div class="de-word-info">
          <div><strong>${esc(w.vi)}</strong> <span class="de-pos">${esc(w.posLabel)}</span>${w.art === 'pl' ? ' <span class="de-pos">chỉ có số nhiều</span>' : ''}</div>
          ${w.plural ? `<div class="de-small">Số nhiều: <span class="de-de">${esc(w.plural)}</span></div>` : ''}
          ${info ? `<div class="de-small">du <span class="de-de">${esc(core().conjugate(w, 'du'))}</span> · er <span class="de-de">${esc(core().conjugate(w, 'er'))}</span>${info.perfekt ? ` · Perfekt: <span class="de-de">${esc(w.forms.perfekt)}</span>` : ''}
            <button type="button" class="de-link-btn" data-act="conj-toggle" data-id="${esc(w.id)}">${open ? 'Ẩn bảng chia' : 'Bảng chia'}</button></div>${open ? conjTableHtml(w) : ''}` : ''}
          ${w.ex ? `<div class="de-ex-row de-small">${speakBtn(w.ex.de, 'Nghe câu ví dụ')}<div><span class="de-de">${esc(w.ex.de)}</span><br><span class="de-muted">${esc(w.ex.vi)}</span></div></div>` : ''}
        </div>
      </article>`;
    },

    /* ===== Từ vựng ===== */
    render_vocab() {
      const d = data();
      const st = this.state.vocab || (this.state.vocab = { lesson: '', pos: '', q: '' });
      const lessons = d.lessons.filter(l => l.stage !== 'sounds');
      return `${hero(`Từ vựng A1 · ${d.words.length} từ`, 'Lọc theo bài, theo từ loại hoặc giống, tìm bằng tiếng Việt hay tiếng Đức (gõ ae, oe, ue, ss thay cho ä, ö, ü, ß cũng được).')}
        <div class="de-card de-filters">
          <label class="de-field"><span>Bài</span><select data-act="vocab-filter" data-key="lesson"><option value="">Tất cả bài</option>${lessons.map(l => `<option value="${l.no}" ${String(st.lesson) === String(l.no) ? 'selected' : ''}>Bài ${l.no}: ${esc(l.title)}</option>`).join('')}</select></label>
          <label class="de-field"><span>Từ loại</span><select data-act="vocab-filter" data-key="pos"><option value="">Tất cả</option>
            <option value="der" ${st.pos === 'der' ? 'selected' : ''}>Danh từ der</option><option value="die" ${st.pos === 'die' ? 'selected' : ''}>Danh từ die</option><option value="das" ${st.pos === 'das' ? 'selected' : ''}>Danh từ das</option>
            ${Object.entries(core().POS_LABELS).map(([k, v]) => `<option value="${k}" ${st.pos === k ? 'selected' : ''}>${esc(v)}</option>`).join('')}</select></label>
          <label class="de-field de-field-grow"><span>Tìm</span><input type="search" data-act="vocab-search" value="${esc(st.q)}" placeholder="vd: ăn, essen, Tisch, Brüder"></label>
        </div>
        <div id="de-vocab-results">${this.vocabResults()}</div>`;
    },
    vocabResults() {
      const d = data();
      const st = this.state.vocab;
      const raw = (st.q || '').trim();
      const q = raw.toLowerCase();
      const qf = core().fold(raw);
      const byGender = ARTICLES.includes(st.pos);
      let list = d.words.filter(w =>
        (!st.lesson || w.lesson === Number(st.lesson) || w.reviewIn.includes(Number(st.lesson))) &&
        (!st.pos || (byGender ? w.pos === 'n' && w.art === st.pos : w.pos === st.pos)) &&
        (!q || w.vi.toLowerCase().includes(q) || core().fold(w.display).includes(qf) || (w.plural && core().fold(w.plural).includes(qf))));
      const total = list.length;
      const limit = this.state.vocabLimit || 60;
      list = list.slice(0, limit);
      return `<p class="de-small de-muted">${total} từ</p><div class="de-word-list">${list.map(w => this.wordCard(w)).join('')}</div>
        ${total > limit ? `<div class="de-center"><button type="button" class="de-btn" data-act="vocab-more">Xem thêm ${Math.min(60, total - limit)} từ</button></div>` : ''}`;
    },

    /* ===== Ngữ pháp ===== */
    render_grammar() {
      const d = data();
      const sel = this.params.get('topic') || this.state.grammarSel || d.grammar[0].id;
      const g = d.grammar.find(x => x.id === sel) || d.grammar[0];
      const sorted = d.grammar.slice().sort((a, b) => a.lesson - b.lesson);
      return `${hero('Ngữ pháp A1', 'Bảng tra nhanh, giải thích bằng tiếng Việt. Mỗi chủ đề ghi bài học đầu tiên dùng đến nó.')}
        <div class="de-grammar-layout">
          <nav class="de-card de-grammar-nav" aria-label="Chủ đề ngữ pháp">${sorted.map(x => `<button type="button" class="de-gnav ${x.id === g.id ? 'active' : ''}" data-act="grammar-open" data-id="${x.id}"><span>${esc(x.title)}</span><small>Bài ${x.lesson}</small></button>`).join('')}</nav>
          <article class="de-card de-grammar-body">
            <h2>${esc(g.title)}</h2>
            <p>${esc(g.desc)}</p>
            ${tableHtml(g.table)}
            ${(g.notes || []).length ? `<ul class="de-rule-list">${g.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
            ${(g.ex || []).map(e => `<div class="de-ex-row">${speakBtn(e[0])}<div><div class="de-de">${esc(e[0])}</div><div class="de-muted">${esc(e[1])}</div></div></div>`).join('')}
            <div class="de-actions"><a class="de-btn de-btn-ghost" href="#de/learn?lesson=de-l${g.lesson}">${ic('map')} Học ở bài ${g.lesson}</a></div>
          </article>
        </div>`;
    },

    /* ===== Thẻ ghi nhớ ===== */
    render_flashcards() {
      const fc = this.state.fc;
      if (fc && fc.queue && fc.idx < fc.queue.length) return this.flashcardView();
      const d = data();
      const due = dueIds();
      const deckSize = Object.keys(sm2Data()).length;
      const lessons = d.lessons.filter(l => l.stage !== 'sounds');
      const done = fc && fc.queue && fc.queue.length ? `<div class="de-card de-result"><h3>${ic('party-popper')} Xong lượt ôn</h3><p>Bạn đã ôn ${fc.queue.length} thẻ, nhớ ${fc.good}/${fc.queue.length}.</p></div>` : '';
      return `${hero('Thẻ ghi nhớ', 'Ôn ngắt quãng SM-2: thẻ nhớ tốt sẽ lâu mới gặp lại, thẻ quên sẽ quay lại sau 10 phút. Danh từ luôn hiện kèm mạo từ.')}
        ${done}
        <div class="de-grid-2">
          <div class="de-card"><h3>Ôn thẻ đến hạn</h3><p class="de-big-num">${due.length}</p><p class="de-muted">Trong bộ thẻ có ${deckSize} từ. Từ của bài học tự vào bộ thẻ khi bạn qua bài.</p>
            <button type="button" class="de-btn de-btn-primary" data-act="fc-start" data-scope="due" ${due.length ? '' : 'disabled'}>${ic('play')} Ôn ngay</button></div>
          <div class="de-card"><h3>Học thẻ theo bài</h3>
            <label class="de-field"><span>Bài</span><select id="de-fc-lesson">${lessons.map(l => `<option value="${l.id}">Bài ${l.no}: ${esc(l.title)}</option>`).join('')}</select></label>
            <label class="de-field"><span>Mặt trước</span><select id="de-fc-mode"><option value="de">Tiếng Đức → nghĩa</option><option value="vi">Nghĩa → tiếng Đức</option><option value="audio">Nghe → nghĩa</option></select></label>
            <button type="button" class="de-btn" data-act="fc-start" data-scope="lesson">${ic('cards')} Bắt đầu</button></div>
        </div>`;
    },
    startFlashcards(scope) {
      const d = data();
      let ids = [];
      let mode = 'de';
      if (scope === 'due') ids = shuffle(dueIds()).slice(0, 30);
      else {
        const sel = this.el.querySelector('#de-fc-lesson');
        const m = this.el.querySelector('#de-fc-mode');
        const l = d.lessons.find(x => x.id === (sel && sel.value));
        mode = (m && m.value) || 'de';
        ids = l ? l.wordIds.slice() : [];
        addToDeck(ids);
      }
      if (!ids.length) { toast('Chưa có thẻ nào để ôn.', 'info'); return; }
      this.state.fc = { queue: ids, idx: 0, flipped: false, good: 0, mode };
      this.render();
    },
    flashcardView() {
      const fc = this.state.fc;
      const w = data().wordMap[fc.queue[fc.idx]];
      if (!w) { fc.idx++; return this.render_flashcards(); }
      const front = fc.mode === 'vi' ? `<div class="de-q-mid">${esc(w.vi)}</div>`
        : fc.mode === 'audio' ? `<button type="button" class="de-big-play" data-act="speak" data-text="${esc(sayOf(w))}">${ic('volume', { size: 34 })}</button>`
          : `<div class="de-q-big">${wordHtml(w)}</div>`;
      if (fc.mode === 'audio' && !fc.flipped) this.afterRender = () => speak(sayOf(w));
      return `${hero('Thẻ ghi nhớ', `Thẻ ${fc.idx + 1}/${fc.queue.length}`)}
        <div class="de-progress"><span style="width:${Math.round(fc.idx / fc.queue.length * 100)}%"></span></div>
        <div class="de-card de-flash ${fc.flipped ? 'flipped' : ''}" data-act="fc-flip" role="button" tabindex="0" aria-label="Lật thẻ">
          ${front}
          ${fc.flipped ? `<div class="de-flash-back">
            <div class="de-q-big">${wordHtml(w)} ${speakBtn(sayOf(w))}</div>
            <p><strong>${esc(w.vi)}</strong> · ${esc(w.posLabel)}${w.plural ? ` · số nhiều: <span class="de-de">${esc(w.plural)}</span>` : ''}</p>
            ${w.ex ? `<p class="de-ex"><span class="de-de">${esc(w.ex.de)}</span><br><span class="de-muted">${esc(w.ex.vi)}</span></p>` : ''}
          </div>` : '<p class="de-muted de-small">Bấm vào thẻ hoặc phím Cách để lật</p>'}
        </div>
        ${fc.flipped ? `<div class="de-grade-row">
          <button type="button" class="de-btn de-grade-0" data-act="fc-grade" data-grade="1">Quên <small>1</small></button>
          <button type="button" class="de-btn de-grade-1" data-act="fc-grade" data-grade="3">Khó <small>2</small></button>
          <button type="button" class="de-btn de-grade-2" data-act="fc-grade" data-grade="4">Nhớ <small>3</small></button>
          <button type="button" class="de-btn de-grade-3" data-act="fc-grade" data-grade="5">Dễ <small>4</small></button>
        </div>` : ''}`;
    },
    gradeFlashcard(grade) {
      const fc = this.state.fc;
      const id = fc.queue[fc.idx];
      const d = sm2Data();
      d[id] = core().sm2(d[id], grade);
      store.set(KEYS.sm2, d);
      if (grade >= 3) fc.good++;
      reward('flashcard');
      markStudied();
      fc.idx++;
      fc.flipped = false;
      this.render();
    },

    /* ===== Luyện gõ ===== */
    render_typing() {
      const stats = store.get(KEYS.typing, { total: 0, correct: 0, best: 0 });
      const d = data();
      const lessons = d.lessons.filter(l => l.stage !== 'sounds');
      const modes = [['word', 'Nghĩa → gõ từ'], ['listen', 'Nghe → gõ từ'], ['dictation', 'Nghe chép cả câu'], ['article', 'Chọn der / die / das'],
        ['plural', 'Gõ số nhiều'], ['conj', 'Chia động từ hiện tại'], ['perfekt', 'Chia Perfekt']];
      const mode = this.state.typeMode || 'word';
      return `${hero('Luyện gõ tiếng Đức', 'Không có bàn phím tiếng Đức? Gõ ae, oe, ue, ss (hoặc a: o: u:) thay cho ä, ö, ü, ß, hoặc bấm các nút chữ đặc biệt. Danh từ cần gõ kèm mạo từ.')}
        <div class="de-grid-2">
          <div class="de-card">
            <label class="de-field"><span>Chế độ</span><select id="de-type-mode">${modes.map(m => `<option value="${m[0]}" ${mode === m[0] ? 'selected' : ''}>${m[1]}</option>`).join('')}</select></label>
            <label class="de-field"><span>Phạm vi từ</span><select id="de-type-scope"><option value="all">Tất cả từ A1</option>${lessons.map(l => `<option value="${l.no}">Bài ${l.no}: ${esc(l.title)}</option>`).join('')}</select></label>
            <button type="button" class="de-btn de-btn-primary" data-act="type-start">${ic('keyboard')} Bắt đầu 15 câu</button>
          </div>
          <div class="de-card"><h3>Thống kê</h3>
            <p>Đã gõ: <strong>${stats.total}</strong> · Đúng: <strong>${stats.total ? Math.round(stats.correct / stats.total * 100) : 0}%</strong> · Chuỗi đúng dài nhất: <strong>${stats.best}</strong></p>
            <div class="de-small de-muted"><p>Không phân biệt chữ hoa, chữ thường và dấu câu khi chấm. "Nghe chép cả câu" dùng câu ví dụ của từ vựng, có nút nghe chậm.</p></div>
          </div>
        </div>`;
    },
    startTyping() {
      const d = data();
      const mode = (this.el.querySelector('#de-type-mode') || {}).value || 'word';
      const scope = (this.el.querySelector('#de-type-scope') || {}).value || 'all';
      this.state.typeMode = mode;
      let words = scope === 'all' ? d.words : d.words.filter(w => w.lesson === Number(scope) || w.reviewIn.includes(Number(scope)));
      const widen = (list, fn) => { const f = list.filter(fn); return f.length >= 5 ? f : d.words.filter(fn); };
      let qs;
      if (mode === 'article') qs = pick(widen(words, hasArticle), 15).map(w => Q.article(w));
      else if (mode === 'plural') qs = pick(widen(words, w => !!w.plural), 15).map(w => Q.plural(w));
      else if (mode === 'conj' || mode === 'perfekt') {
        const verbs = widen(words, w => { const i = core().verbInfo(w); return i && (mode === 'conj' || i.perfekt); });
        const persons = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'];
        qs = pick(verbs, 15).map((w, i) => Q.conj(w, mode === 'conj' ? persons[(i * 5 + 1) % 6] : persons[i % 6], mode === 'conj' ? 'present' : 'perfekt'));
      } else if (mode === 'dictation') qs = pick(widen(words, w => w.ex && w.ex.de.split(' ').length <= 9), 10).map(w => Q.dictation(w));
      else {
        qs = pick(words.filter(w => w.pos !== 'num' || mode === 'listen'), 15).map(w => {
          const q = Q.type(w);
          if (mode === 'listen') { q.prompt = `<button type="button" class="de-big-play" data-act="speak" data-text="${esc(sayOf(w))}">${ic('volume', { size: 34 })}</button>`; q.autoplay = true; q.ask = 'Nghe rồi gõ lại từ (danh từ gõ kèm mạo từ):'; }
          return q;
        });
      }
      if (!qs.length) { toast('Không đủ từ trong phạm vi đã chọn.', 'warning'); return; }
      this.startQuiz(qs, { title: 'Luyện gõ', host: '.de-wrap', typingStats: true, onFinish: () => '' });
    },

    /* ===== Kiểm tra ===== */
    render_quiz() {
      const d = data();
      const lessons = d.lessons.filter(l => l.stage !== 'sounds');
      const wrongs = store.get(KEYS.wrongs, []).filter(id => d.wordMap[id]);
      const last = lessons[lessons.length - 1].no;
      return `${hero('Kiểm tra', 'Trắc nghiệm tổng hợp: nghĩa của từ, nghe chọn từ, Việt → Đức, mạo từ der/die/das. Câu sai được lưu để ôn lại.')}
        <div class="de-grid-2">
          <div class="de-card">
            <label class="de-field"><span>Từ bài</span><select id="de-quiz-from">${lessons.map(l => `<option value="${l.no}">Bài ${l.no}</option>`).join('')}</select></label>
            <label class="de-field"><span>Đến bài</span><select id="de-quiz-to">${lessons.map(l => `<option value="${l.no}" ${l.no === last ? 'selected' : ''}>Bài ${l.no}</option>`).join('')}</select></label>
            <label class="de-field"><span>Số câu</span><select id="de-quiz-n"><option>10</option><option selected>20</option><option>30</option></select></label>
            <div class="de-field"><span>Dạng câu hỏi</span><div class="de-chip-row">
              ${[['meaning', 'Nghĩa'], ['listen', 'Nghe'], ['viToDe', 'Việt → Đức'], ['article', 'der/die/das'], ['type', 'Gõ từ']].map(t => `<label class="de-chip de-chip-check"><input type="checkbox" class="de-quiz-type" value="${t[0]}" ${t[0] !== 'type' ? 'checked' : ''}> ${t[1]}</label>`).join('')}
            </div></div>
            <button type="button" class="de-btn de-btn-primary" data-act="quiz-start">${ic('play')} Bắt đầu</button>
          </div>
          <div class="de-card"><h3>Ôn câu sai</h3><p class="de-big-num">${wrongs.length}</p><p class="de-muted">Những từ bạn từng trả lời sai trong Kiểm tra.</p>
            <button type="button" class="de-btn" data-act="quiz-wrongs" ${wrongs.length ? '' : 'disabled'}>${ic('refresh')} Ôn lại</button></div>
        </div>`;
    },
    startBigQuiz(onlyWrongs) {
      const d = data();
      let words, n, types;
      if (onlyWrongs) {
        words = store.get(KEYS.wrongs, []).map(id => d.wordMap[id]).filter(Boolean);
        n = Math.min(20, words.length); types = ['meaning', 'viToDe', 'article', 'listen'];
      } else {
        let a = Number(this.el.querySelector('#de-quiz-from').value), b = Number(this.el.querySelector('#de-quiz-to').value);
        if (a > b) [a, b] = [b, a];
        n = Number(this.el.querySelector('#de-quiz-n').value) || 20;
        types = Array.from(this.el.querySelectorAll('.de-quiz-type:checked')).map(x => x.value);
        if (!types.length) types = ['meaning'];
        words = d.words.filter(w => w.lesson >= a && w.lesson <= b);
      }
      const qs = wordQuestions(words, d.words, n, types);
      if (!qs.length) { toast('Không đủ từ trong phạm vi đã chọn.', 'warning'); return; }
      this.startQuiz(qs, {
        title: 'Kiểm tra', host: '.de-wrap',
        onFinish: (pct, wrongIds, rightIds) => {
          let list = store.get(KEYS.wrongs, []);
          list = list.filter(id => !rightIds.includes(id)).concat(wrongIds.filter(id => !list.includes(id)));
          store.set(KEYS.wrongs, list.slice(-200));
          markStudied();
          return wrongIds.length ? `${wrongIds.length} từ sai đã được lưu vào mục Ôn câu sai.` : 'Không sai câu nào!';
        }
      });
    },

    /* ===== Bộ máy câu hỏi dùng chung ===== */
    startQuiz(questions, opts) {
      this.quiz = { qs: questions, i: 0, correct: 0, answered: false, wrongIds: [], rightIds: [], streak: 0, opts };
      this.renderQuiz();
    },
    quizHost() {
      const sel = this.quiz && this.quiz.opts.host;
      return (sel && this.el.querySelector(sel)) || this.el.querySelector('.de-wrap');
    },
    renderQuiz() {
      const z = this.quiz;
      const host = this.quizHost();
      if (!z || !host) return;
      if (z.i >= z.qs.length) return this.finishQuiz();
      const q = z.qs[z.i];
      z.answered = false;
      host.innerHTML = `<div class="de-card de-quiz">
        <div class="de-quiz-top"><span>${esc(z.opts.title)} · Câu ${z.i + 1}/${z.qs.length}</span><span>${ic('check-circle', { size: 14 })} ${z.correct}</span>
          <button type="button" class="de-icon-btn" data-act="quiz-quit" aria-label="Thoát">${ic('x')}</button></div>
        <div class="de-progress"><span style="width:${Math.round(z.i / z.qs.length * 100)}%"></span></div>
        <p class="de-quiz-ask">${esc(q.ask || '')}</p>
        <div class="de-quiz-prompt">${q.prompt}</div>
        ${q.kind === 'mcq'
          ? `<div class="de-choices ${q.choices.length === 3 ? 'de-choices-3' : ''}">${q.choices.map((c, i) => `<button type="button" class="de-choice ${q.choiceClass || ''}" data-act="quiz-choose" data-i="${i}"><kbd>${i + 1}</kbd> ${esc(c)}</button>`).join('')}</div>`
          : `<div class="de-type-box">${q.long ? '<textarea class="de-type-input de-type-long" id="de-type-input" rows="2" autocomplete="off" autocapitalize="off" spellcheck="false" lang="de" aria-label="Ô gõ đáp án"></textarea>'
            : '<input type="text" class="de-type-input" id="de-type-input" autocomplete="off" autocapitalize="off" spellcheck="false" lang="de" aria-label="Ô gõ đáp án">'}
              <div class="de-umlaut-keys" role="group" aria-label="Chữ đặc biệt">${['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map(k => `<button type="button" class="de-key" data-act="ins" data-ch="${k}">${k}</button>`).join('')}</div>
              <button type="button" class="de-btn de-btn-primary" data-act="quiz-submit">Kiểm tra</button></div>`}
        <div class="de-feedback" id="de-feedback" aria-live="assertive"></div>
      </div>`;
      if (q.autoplay) setTimeout(() => speak(q.autoplayText || q.audio, q.autoplayRate), 200);
      const inp = host.querySelector('#de-type-input');
      if (inp) setTimeout(() => inp.focus(), 50);
    },
    answerQuiz(ok, picked, note) {
      const z = this.quiz;
      if (!z || z.answered) return;
      z.answered = true;
      const q = z.qs[z.i];
      const host = this.quizHost();
      if (ok) { z.correct++; z.streak++; reward(z.opts.typingStats ? 'typingWord' : 'quizCorrect'); }
      else z.streak = 0;
      if (q.wordId) (ok ? z.rightIds : z.wrongIds).push(q.wordId);
      if (q.soundKey) {
        const st = store.get(KEYS.sounds, {});
        const s = st[q.soundKey] || { ok: 0, fail: 0 };
        ok ? s.ok++ : s.fail++;
        st[q.soundKey] = s;
        store.set(KEYS.sounds, st);
      }
      if (z.opts.typingStats) {
        const st = store.get(KEYS.typing, { total: 0, correct: 0, best: 0 });
        st.total++; if (ok) st.correct++; st.best = Math.max(st.best || 0, z.streak);
        store.set(KEYS.typing, st);
      }
      if (q.kind === 'mcq') {
        host.querySelectorAll('.de-choice').forEach((b, i) => {
          b.disabled = true;
          if (i === q.answer) b.classList.add('correct');
          else if (i === picked) b.classList.add('wrong');
        });
      } else {
        const inp = host.querySelector('#de-type-input');
        if (inp) { inp.disabled = true; inp.classList.add(ok ? 'correct' : 'wrong'); }
        host.querySelectorAll('.de-key').forEach(b => { b.disabled = true; });
      }
      if (q.audio && (ok || q.kind === 'type')) speak(q.audio);
      const fb = host.querySelector('#de-feedback');
      if (fb) {
        fb.className = `de-feedback ${ok ? 'ok' : 'bad'}`;
        fb.innerHTML = `<strong>${ok ? 'Chính xác!' : 'Chưa đúng.'}</strong> <span>${note ? `${note} ` : ''}${esc(q.explain || '')}</span>
          <button type="button" class="de-btn de-btn-primary" data-act="quiz-next">${z.i + 1 >= z.qs.length ? 'Xem kết quả' : 'Câu tiếp'} ${ic('arrow-right')}</button>`;
        const nb = fb.querySelector('button');
        if (nb) setTimeout(() => nb.focus(), 30);
      }
    },
    finishQuiz() {
      const z = this.quiz;
      const host = this.quizHost();
      const pct = Math.round(z.correct / z.qs.length * 100);
      const msg = z.opts.onFinish ? z.opts.onFinish(pct, z.wrongIds, z.rightIds) : '';
      const d = data();
      const wrongWords = Array.from(new Set(z.wrongIds)).map(id => d.wordMap[id]).filter(Boolean);
      host.innerHTML = `<div class="de-card de-result">
        <div class="de-result-score ${pct >= 80 ? 'good' : pct >= 60 ? 'mid' : 'low'}">${pct}%</div>
        <p>Đúng ${z.correct}/${z.qs.length} câu.</p>
        ${msg ? `<p>${esc(msg)}</p>` : ''}
        ${wrongWords.length ? `<h4>Từ cần ôn</h4><div class="de-chip-row">${wrongWords.map(w => `<button type="button" class="de-chip" data-act="speak" data-text="${esc(sayOf(w))}">${wordHtml(w)} · ${esc(w.vi)}</button>`).join('')}</div>` : ''}
        <div class="de-actions"><button type="button" class="de-btn de-btn-primary" data-act="quiz-again">${ic('refresh')} Làm lại</button><button type="button" class="de-btn de-btn-ghost" data-act="quiz-quit">Xong</button></div>
      </div>`;
      this.lastQuizQs = z.qs;
      this.lastQuizOpts = z.opts;
      this.quiz = null;
    },
    submitTyped() {
      const z = this.quiz;
      if (!z || z.answered) return;
      const q = z.qs[z.i];
      const inp = this.el.querySelector('#de-type-input');
      const val = inp ? inp.value : '';
      if (!val.trim()) return;
      const ok = core().answerMatches(q.expected, val);
      let note = '';
      if (!ok && q.noun && core().fold(core().typeUmlauts(val)).split(' ').pop() === core().fold(q.noun)) note = 'Đúng từ rồi, nhưng cần đúng mạo từ.';
      if (!ok && q.sentence) {
        const cmp = core().compareWords(q.sentence, core().typeUmlauts(val));
        note = `Đúng ${cmp.perWord.filter(x => x.ok).length}/${cmp.perWord.length} từ.`;
      }
      this.answerQuiz(ok, undefined, note);
    },

    /* ===== Sự kiện ===== */
    onClick(e) {
      const t = e.target.closest('[data-act]');
      if (!t || !this.el.contains(t)) return;
      const act = t.dataset.act;
      const d = data();
      switch (act) {
        case 'speak': e.preventDefault(); e.stopPropagation(); speak(t.dataset.text, t.dataset.rate ? Number(t.dataset.rate) : null); break;
        case 'speak-slow': speak(t.dataset.text, 0.6); break;
        case 'abc-tab': this.state.abcTab = t.dataset.tab; this.render(); break;
        case 'abc': { this.state.abcChar = t.dataset.ch; const a = d.sounds.alphabet.find(x => x.ch === t.dataset.ch); if (a) speak(a.name); this.render(); break; }
        case 'drill-start': this.startSoundDrill(t.dataset.mode); break;
        case 'lesson-step': this.state.lessonStep = t.dataset.step; this.state.lessonFor = t.dataset.lesson; this.render(); break;
        case 'lesson-quiz': { const l = d.lessons.find(x => x.id === t.dataset.lesson); if (l) this.startLessonQuiz(l); break; }
        case 'deck-add': { const l = d.lessons.find(x => x.id === t.dataset.lesson); const n = l ? addToDeck(l.wordIds) : 0; toast(n ? `Đã thêm ${n} từ vào thẻ ghi nhớ.` : 'Các từ này đã có trong thẻ ghi nhớ.', 'success'); break; }
        case 'play-all': {
          const l = d.lessons.find(x => x.id === t.dataset.lesson);
          if (l) speak(l.wordIds.map(id => d.wordMap[id] && sayOf(d.wordMap[id])).filter(Boolean).join('. '), 0.85);
          break;
        }
        case 'conj-toggle': {
          this.state.conjOpen = this.state.conjOpen === t.dataset.id ? null : t.dataset.id;
          const art = t.closest('.de-word');
          const w = d.wordMap[t.dataset.id];
          if (art && w) art.outerHTML = this.wordCard(w);
          break;
        }
        case 'vocab-more': this.state.vocabLimit = (this.state.vocabLimit || 60) + 60; this.el.querySelector('#de-vocab-results').innerHTML = this.vocabResults(); break;
        case 'grammar-open': this.state.grammarSel = t.dataset.id; this.params = new URLSearchParams(); this.render(); break;
        case 'fc-start': this.startFlashcards(t.dataset.scope); break;
        case 'fc-flip': if (!e.target.closest('button')) { this.state.fc.flipped = !this.state.fc.flipped; this.render(); } break;
        case 'fc-grade': this.gradeFlashcard(Number(t.dataset.grade)); break;
        case 'type-start': this.startTyping(); break;
        case 'quiz-start': this.startBigQuiz(false); break;
        case 'quiz-wrongs': this.startBigQuiz(true); break;
        case 'quiz-choose': { const q = this.quiz && this.quiz.qs[this.quiz.i]; if (q) this.answerQuiz(Number(t.dataset.i) === q.answer, Number(t.dataset.i)); break; }
        case 'quiz-submit': this.submitTyped(); break;
        case 'ins': {
          const inp = this.el.querySelector('#de-type-input');
          if (inp && !inp.disabled) {
            const s = inp.selectionStart != null ? inp.selectionStart : inp.value.length;
            const en = inp.selectionEnd != null ? inp.selectionEnd : s;
            inp.value = inp.value.slice(0, s) + t.dataset.ch + inp.value.slice(en);
            inp.focus();
            try { inp.setSelectionRange(s + 1, s + 1); } catch (err) { /* bỏ qua */ }
          }
          break;
        }
        case 'quiz-next': if (this.quiz) { this.quiz.i++; this.renderQuiz(); } break;
        case 'quiz-again': if (this.lastQuizQs) this.startQuiz(shuffle(this.lastQuizQs), this.lastQuizOpts); break;
        case 'quiz-quit': this.quiz = null; this.render(); break;
        default: break;
      }
    },
    onInput(e) {
      if (e.target.matches('[data-act="vocab-search"]')) {
        this.state.vocab.q = e.target.value;
        this.state.vocabLimit = 60;
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => { const r = this.el.querySelector('#de-vocab-results'); if (r) r.innerHTML = this.vocabResults(); }, 150);
      } else if (e.target.id === 'de-type-input') {
        // Gõ a: o: u: s: tự đổi thành ä ö ü ß
        const v = e.target.value;
        const nv = core().typeUmlauts(v);
        if (nv !== v) { const pos = e.target.selectionStart - (v.length - nv.length); e.target.value = nv; try { e.target.setSelectionRange(pos, pos); } catch (err) { /* bỏ qua */ } }
      }
    },
    onChange(e) {
      if (e.target.matches('[data-act="vocab-filter"]')) {
        this.state.vocab[e.target.dataset.key] = e.target.value;
        this.state.vocabLimit = 60;
        const r = this.el.querySelector('#de-vocab-results');
        if (r) r.innerHTML = this.vocabResults();
      }
    },
    onKey(e) {
      if (e.target.id === 'de-type-input' && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (this.quiz && this.quiz.answered) { this.quiz.i++; this.renderQuiz(); } else this.submitTyped();
        return;
      }
      if (this.quiz && !this.quiz.answered && /^[1-4]$/.test(e.key) && !/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) {
        const q = this.quiz.qs[this.quiz.i];
        if (q && q.kind === 'mcq' && q.choices[Number(e.key) - 1] !== undefined) this.answerQuiz(Number(e.key) - 1 === q.answer, Number(e.key) - 1);
        return;
      }
      if (this.section === 'flashcards' && this.state.fc && this.state.fc.queue && !/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this.state.fc.flipped = !this.state.fc.flipped; this.render(); }
        else if (this.state.fc.flipped && /^[1-4]$/.test(e.key)) this.gradeFlashcard([1, 3, 4, 5][Number(e.key) - 1]);
      }
    }
  };

  // Phím tắt toàn trang cho thẻ ghi nhớ và trắc nghiệm (khi tiêu điểm không nằm trong khung tiếng Đức)
  if (typeof document !== 'undefined') {
    document.addEventListener('keydown', e => {
      if (!DeStudio.el || !DeStudio.el.classList.contains('active') || DeStudio.el.contains(e.target)) return;
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      DeStudio.onKey(e);
    });
  }

  DeStudio._Q = Q;
  if (typeof window !== 'undefined') window.DeStudio = DeStudio;
  if (typeof module !== 'undefined' && module.exports) module.exports = DeStudio;
})();
