/**
 * japanese.js — Mục tiếng Nhật của PolyLingo (window.JaStudio)
 * Các mục: Tổng quan, Bảng chữ Kana, Lộ trình 35 bài, Từ vựng N5, Kanji, Thẻ ghi nhớ (SM-2),
 * Tập viết (thứ tự nét KanjiVG), Luyện gõ (romaji → kana), Kiểm tra.
 * Dữ liệu: data/ja/*.js qua window.JaCore.load(). Luyện nói và Hội thoại dùng talk.js và app.js sẵn có.
 * Khóa lưu: ja_learn_progress_v1, ja_sm2_data, ja_typing_stats, ja_quiz_wrongs, ja_kana_stats.
 */
(function () {
  'use strict';

  const KEYS = {
    progress: 'ja_learn_progress_v1',
    sm2: 'ja_sm2_data',
    typing: 'ja_typing_stats',
    wrongs: 'ja_quiz_wrongs',
    kana: 'ja_kana_stats'
  };
  const SECTIONS = ['home', 'kana', 'learn', 'vocab', 'kanji', 'flashcards', 'writing', 'typing', 'quiz'];
  const KANJIVG_BASE = 'https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/';
  const VOWEL_COL = { a: 0, i: 1, u: 2, e: 3, o: 4 };

  /* ---------- Tiện ích ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ic = (n, o) => (window.PolyIcons ? window.PolyIcons.svg(n, Object.assign({ size: 18 }, o || {})) : '');
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (arr, n) => shuffle(arr).slice(0, n);
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* bộ nhớ đầy hoặc bị chặn */ } }
  };
  const core = () => window.JaCore;
  const data = () => core().load();

  function speak(text, rate) {
    if (!text) return;
    if (window.app && typeof window.app.speakText === 'function') { window.app.speakText(text, rate || null, 'ja-JP'); return; }
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
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
    return `<button type="button" class="ja-icon-btn" data-act="speak" data-text="${esc(text)}" aria-label="${esc(label || 'Nghe phát âm')}" title="Nghe">${ic('volume')}</button>`;
  }
  function rubyWord(w) {
    if (!w.kanji) return `<span class="ja-jp">${esc(w.kana)}</span>`;
    return `<ruby class="ja-jp">${esc(w.kanji)}<rt>${esc(w.kana)}</rt></ruby>`;
  }

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
  const Q = {
    meaning(w, pool) {
      return mcq(`<div class="ja-q-big">${rubyWord(w)}</div>`, w.vi, distractors(w, pool, 'vi', 3),
        { audio: w.kana, ask: 'Từ này nghĩa là gì?', wordId: w.id, explain: `${w.word} (${w.kana}) = ${w.vi}` });
    },
    reading(w, pool) {
      const others = pool.filter(x => x.kanji);
      return mcq(`<div class="ja-q-big ja-jp">${esc(w.kanji)}</div><div class="ja-q-sub">${esc(w.vi)}</div>`, w.kana, distractors(w, others, 'kana', 3),
        { ask: 'Chọn cách đọc đúng:', wordId: w.id, explain: `${w.kanji} đọc là ${w.kana} (${w.romaji})`, choiceClass: 'ja-jp' });
    },
    listen(w, pool) {
      return mcq(`<button type="button" class="ja-big-play" data-act="speak" data-text="${esc(w.kana)}" aria-label="Nghe lại">${ic('volume', { size: 34 })}</button>`,
        w.word, distractors(w, pool, 'word', 3), { audio: w.kana, autoplay: true, ask: 'Nghe và chọn từ đúng:', wordId: w.id, explain: `${w.word} (${w.kana}) = ${w.vi}`, choiceClass: 'ja-jp' });
    },
    viToJa(w, pool) {
      return mcq(`<div class="ja-q-mid">${esc(w.vi)}</div>`, w.word, distractors(w, pool, 'word', 3),
        { ask: 'Chọn từ tiếng Nhật đúng nghĩa:', wordId: w.id, explain: `${w.vi} = ${w.word} (${w.kana})`, choiceClass: 'ja-jp' });
    },
    type(w) {
      return { kind: 'type', prompt: `<div class="ja-q-big ja-jp">${esc(w.word)}</div><div class="ja-q-sub">${esc(w.vi)}</div>`, expected: w.kana,
        ask: 'Gõ cách đọc bằng romaji (hoặc kana):', wordId: w.id, audio: w.kana, explain: `${w.word} đọc là ${w.kana} (${w.romaji})` };
    },
    kanjiHV(k, all) {
      const label = x => `${x.hv} · ${x.vi}`;
      const wrong = pick(all.filter(x => x.ch !== k.ch), 3).map(label);
      return mcq(`<div class="ja-q-big ja-jp">${esc(k.ch)}</div>`, label(k), wrong, { ask: 'Chữ Kanji này âm Hán Việt và nghĩa là gì?', explain: `${k.ch}: ${k.hv} (${k.vi})` });
    },
    kana(item, pool, typed) {
      if (typed) {
        return { kind: 'type', prompt: `<div class="ja-q-giant ja-jp">${esc(item.kana)}</div>`, expected: item.kana, romajiOnly: true, romaji: item.romaji,
          ask: 'Gõ romaji của chữ này:', audio: item.kana, kanaKey: item.kana, explain: `${item.kana} = ${item.romaji}` };
      }
      const wrong = pick(pool.filter(x => x.romaji !== item.romaji), 3).map(x => x.romaji);
      return mcq(`<div class="ja-q-giant ja-jp">${esc(item.kana)}</div>`, item.romaji, Array.from(new Set(wrong)),
        { ask: 'Chữ này đọc là gì?', audio: item.kana, kanaKey: item.kana, explain: `${item.kana} = ${item.romaji}` });
    },
    conj(w, form) {
      const res = core().conjugate(w, form);
      return { kind: 'type', prompt: `<div class="ja-q-big ja-jp">${esc(w.word)}</div><div class="ja-q-sub">${esc(w.vi)} · ${esc(w.posLabel)}</div>`,
        expected: res.kana, ask: `Chia sang ${core().FORM_LABELS[form]} (gõ romaji hoặc kana):`, wordId: w.id,
        explain: `${w.word} → ${res.written} (${res.kana})` };
    }
  };
  function wordQuestions(words, pool, n, types) {
    const list = pick(words, Math.min(n, words.length));
    return list.map((w, i) => {
      let t = types[i % types.length];
      if (t === 'reading' && !w.kanji) t = 'meaning';
      return Q[t](w, pool);
    });
  }

  /* ---------- Kana ---------- */
  function kanaSets() {
    const K = (data().kana) || { hiragana: [], katakana: [], dakuten: [], yoon: [] };
    return {
      hiragana: K.hiragana || [],
      katakana: (K.katakana || []).map(x => ({ kana: x.kana, romaji: x.romaji, row: x.row, mnemonic: x.mnemonic, examples: x.examples || [], strokes: x.strokes })),
      dakuten: K.dakuten || [],
      dakutenKata: (K.dakuten || []).map(x => ({ kana: x.katakana, romaji: x.romaji })),
      yoon: K.yoon || [],
      yoonKata: (K.yoon || []).map(x => ({ kana: x.katakana, romaji: x.romaji })),
      raw: K
    };
  }
  function kanaPool(set, rows) {
    const S = kanaSets();
    if (set === 'dakuten') return S.dakuten.concat(S.yoon);
    if (set === 'mixed') return S.hiragana.concat(S.katakana, S.dakuten, S.yoon.slice(0, 12));
    const list = S[set] || [];
    return rows && rows.length ? list.filter(x => rows.includes(x.row)) : list;
  }
  function gojuonGrid(list, activeChar) {
    const rows = [];
    const byRow = {};
    list.forEach(x => { (byRow[x.row] = byRow[x.row] || []).push(x); if (!rows.includes(x.row)) rows.push(x.row); });
    return `<div class="ja-gojuon" role="grid">
      <div class="ja-gojuon-head" role="row"><span></span>${['a', 'i', 'u', 'e', 'o'].map(v => `<span role="columnheader">${v}</span>`).join('')}</div>
      ${rows.map(r => {
        const cells = [null, null, null, null, null];
        byRow[r].forEach(x => {
          const v = x.romaji === 'n' ? 0 : VOWEL_COL[x.romaji.slice(-1)];
          if (v !== undefined && !cells[v]) cells[v] = x;
        });
        return `<div class="ja-gojuon-row" role="row"><span class="ja-gojuon-label">${r === 'n' ? 'n' : r}</span>${cells.map(c => c
          ? `<button type="button" class="ja-kana-cell ${activeChar === c.kana ? 'active' : ''}" data-act="kana-detail" data-char="${esc(c.kana)}"><span class="ja-jp">${esc(c.kana)}</span><small>${esc(c.romaji)}</small></button>`
          : '<span class="ja-kana-empty"></span>').join('')}</div>`;
      }).join('')}
    </div>`;
  }
  function flatGrid(list) {
    return `<div class="ja-kana-flat">${list.map(c => `<button type="button" class="ja-kana-cell" data-act="speak" data-text="${esc(c.kana)}"><span class="ja-jp">${esc(c.kana)}</span><small>${esc(c.romaji)}</small></button>`).join('')}</div>`;
  }
  function findKana(ch) {
    const S = kanaSets();
    return S.hiragana.concat(S.katakana).find(x => x.kana === ch);
  }
  function kanaDetail(ch) {
    const x = findKana(ch);
    if (!x) return '';
    return `<div class="ja-card ja-kana-detail">
      <div class="ja-kana-detail-top">
        <div class="ja-kana-giant ja-jp">${esc(x.kana)}</div>
        <div>
          <div class="ja-kana-romaji">${esc(x.romaji)}</div>
          <div class="ja-actions">${speakBtn(x.kana)}<a class="ja-btn ja-btn-ghost" href="#ja/writing?char=${encodeURIComponent(x.kana)}">${ic('pen')} Xem thứ tự nét</a></div>
        </div>
      </div>
      ${x.mnemonic ? `<p><strong>Mẹo nhớ:</strong> ${esc(x.mnemonic)}</p>` : ''}
      ${x.mouth ? `<p><strong>Khẩu hình:</strong> ${esc(x.mouth)}</p>` : ''}
      ${x.commonErrors ? `<p class="ja-muted"><strong>Người Việt hay sai:</strong> ${esc(x.commonErrors)}</p>` : ''}
      ${(x.examples || []).length ? `<div class="ja-chip-row">${x.examples.map(e => `<button type="button" class="ja-chip" data-act="speak" data-text="${esc(e.word)}"><span class="ja-jp">${esc(e.word)}</span> ${esc(e.romaji)} · ${esc(e.vi)}</button>`).join('')}</div>` : ''}
    </div>`;
  }
  function renderRules(K) {
    const blocks = [];
    const pushRule = r => {
      if (!r || !r.title) return;
      const list = r.rules || r.hiraganaRules || [];
      blocks.push(`<div class="ja-card"><h3>${esc(r.title)}</h3><p>${esc(r.desc || '')}</p>${list.length ? `<ul class="ja-rule-list">${list.map(it => `<li>${esc(Object.values(it).filter(v => typeof v === 'string').join(' · '))}</li>`).join('')}</ul>` : ''}</div>`);
    };
    const R = K.rules || {};
    Object.keys(R).forEach(k => pushRule(R[k]));
    if (K.stress) Object.keys(K.stress).forEach(k => pushRule(K.stress[k]));
    if (K.linking) Object.keys(K.linking).forEach(k => pushRule(K.linking[k]));
    return blocks.join('');
  }

  /* ---------- Vẽ khung trang ---------- */
  function hero(title, sub, side) {
    return `<header class="ja-hero"><div><p class="ja-eyebrow">日本語 · Tiếng Nhật</p><h1 class="ja-title">${esc(title)}</h1>${sub ? `<p class="ja-sub">${esc(sub)}</p>` : ''}</div>${side || ''}</header>`;
  }

  const JaStudio = {
    SECTIONS,
    el: null,
    section: 'home',
    state: {},
    quiz: null,

    show(el, section, params) {
      if (!el || !window.JaCore) return;
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
      this.stopWriting();
      this.render();
      try { el.scrollIntoView({ block: 'start' }); window.scrollTo(0, 0); } catch (e) { /* bỏ qua */ }
    },
    hide() {
      this.stopWriting();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    },
    render() {
      const fn = this['render_' + this.section] || this.render_home;
      this.el.innerHTML = `<div class="ja-wrap">${fn.call(this)}</div>`;
      if (this.afterRender) { const f = this.afterRender; this.afterRender = null; f(); }
    },

    /* ===== Tổng quan ===== */
    render_home() {
      const d = data();
      const p = getProgress();
      const done = d.lessons.filter(l => p.lessons[l.id] && p.lessons[l.id].completed).length;
      const nx = nextLesson();
      const due = dueIds().length;
      const dayIdx = Math.floor(Date.now() / 86400000) % d.words.length;
      const wod = d.words.filter(w => w.kanji)[dayIdx % d.words.filter(w => w.kanji).length];
      const cards = [
        ['kana', 'languages', 'Bảng chữ Kana', 'Hiragana, Katakana, âm đục, âm ghép, luyện nhận chữ'],
        ['learn', 'map', 'Lộ trình 35 bài', '6 bài Kana và 29 bài N5, mỗi bài một mục tiêu'],
        ['vocab', 'book-open', 'Từ vựng N5', `${d.words.length} từ có romaji, Hán Việt, câu ví dụ`],
        ['kanji', 'scroll', 'Kanji N5', `${d.kanji.length} chữ có âm Hán Việt, On, Kun`],
        ['flashcards', 'cards', 'Thẻ ghi nhớ', due ? `${due} thẻ đến hạn ôn hôm nay` : 'Ôn ngắt quãng SM-2'],
        ['writing', 'pen', 'Tập viết', 'Xem thứ tự nét và viết theo'],
        ['typing', 'keyboard', 'Luyện gõ', 'Gõ romaji ra kana, chia động từ'],
        ['quiz', 'target', 'Kiểm tra', 'Trắc nghiệm nghĩa, cách đọc, nghe, Kanji'],
        ['talk', 'mic', 'Luyện nói', 'Nói từng từ, nhập vai, đóng vai A–B'],
        ['dialogues', 'chat', 'Hội thoại', '10 bài hội thoại đời thường N5']
      ];
      return `${hero('Tiếng Nhật cho người Việt', 'Từ bảng chữ cái đến JLPT N5, từng bài nhỏ mỗi ngày. Mỗi chữ Kanji đều có âm Hán Việt để bạn nhớ nhanh hơn.',
        `<div class="ja-hero-seal ja-jp" aria-hidden="true">学</div>`)}
        <section class="ja-grid-2">
          <div class="ja-card ja-next">
            <p class="ja-eyebrow">Bài tiếp theo</p>
            <h2>Bài ${nx.no}: ${esc(nx.title)}</h2>
            <p class="ja-muted">${esc(nx.goal)}</p>
            <div class="ja-progress"><span style="width:${Math.round(done / d.lessons.length * 100)}%"></span></div>
            <p class="ja-small">Đã xong ${done}/${d.lessons.length} bài · Đã thuộc ${learnedCount()} từ</p>
            <a class="ja-btn ja-btn-primary" href="#ja/learn?lesson=${nx.id}">${ic('play')} Học ngay</a>
          </div>
          <div class="ja-card ja-wod">
            <p class="ja-eyebrow">Từ của ngày</p>
            <div class="ja-wod-word">${rubyWord(wod)} ${speakBtn(wod.kana)}</div>
            <p><strong>${esc(wod.vi)}</strong> · ${esc(wod.romaji)}</p>
            ${wod.hanViet ? `<p class="ja-hv">Hán Việt: ${esc(wod.hanViet)}</p>` : ''}
            ${wod.ex ? `<p class="ja-ex"><span class="ja-jp">${esc(wod.ex.ja)}</span><br><span class="ja-muted">${esc(wod.ex.vi)}</span></p>` : ''}
          </div>
        </section>
        <section class="ja-feature-grid">
          ${cards.map(c => `<a class="ja-feature" href="#ja/${c[0]}"><span class="ja-feature-icon">${ic(c[1], { size: 22 })}</span><span><strong>${c[2]}</strong><small>${esc(c[3])}</small></span></a>`).join('')}
        </section>
        <section class="ja-card ja-tip">
          <h3>${ic('lightbulb')} Lợi thế của người Việt</h3>
          <p>Khoảng 60% từ Hán trong tiếng Nhật có âm Hán Việt gần với tiếng Việt: 学生 (gakusei) là HỌC SINH, 電話 (denwa) là ĐIỆN THOẠI. Hãy để ý dòng "Hán Việt" ở mỗi từ.</p>
          <p class="ja-small ja-muted">Cách học tham khảo từ các trang dạy tiếng Nhật uy tín (học Kana theo hàng, Kanji đi kèm từ vựng, ôn ngắt quãng). Nội dung do PolyLingo tự soạn.</p>
        </section>`;
    },

    /* ===== Bảng chữ Kana ===== */
    render_kana() {
      const S = kanaSets();
      const tab = this.state.kanaTab || 'hiragana';
      const tabs = [['hiragana', 'Hiragana'], ['katakana', 'Katakana'], ['dakuten', 'Âm đục & ghép'], ['confusing', 'Chữ dễ nhầm'], ['rules', 'Quy tắc đọc'], ['drill', 'Luyện nhận chữ']];
      let body = '';
      if (tab === 'hiragana' || tab === 'katakana') {
        const active = this.state.kanaChar && findKana(this.state.kanaChar) ? this.state.kanaChar : S[tab][0] && S[tab][0].kana;
        body = `<div class="ja-grid-2 ja-kana-layout"><div class="ja-card">${gojuonGrid(S[tab], active)}</div><div>${kanaDetail(active)}</div></div>`;
      } else if (tab === 'dakuten') {
        body = `<div class="ja-card"><h3>Âm đục (゛) và bán đục (゜)</h3><p class="ja-muted">Thêm hai chấm: k→g, s→z, t→d, h→b. Thêm vòng tròn: h→p.</p>${flatGrid(S.dakuten)}${flatGrid(S.dakutenKata)}</div>
          <div class="ja-card"><h3>Âm ghép (ゃ ゅ ょ nhỏ)</h3><p class="ja-muted">Chữ cột i + ゃ/ゅ/ょ viết nhỏ, đọc liền thành một âm: き+ゃ = きゃ (kya).</p>${flatGrid(S.yoon)}${flatGrid(S.yoonKata)}</div>`;
      } else if (tab === 'confusing') {
        const list = S.raw.confusingLetters || [];
        body = `<div class="ja-grid-2">${list.map(c => `<div class="ja-card"><h3>${esc(c.pair)}</h3>${[c.charA, c.charB].filter(Boolean).map(x => `<div class="ja-confuse"><span class="ja-kana-mid ja-jp">${esc(x.char)}</span><div><strong>${esc(x.romaji)}</strong><p>${esc(x.strokes || '')}</p><p class="ja-muted">${esc(x.tip || '')}</p></div></div>`).join('')}</div>`).join('')}</div>`;
      } else if (tab === 'rules') {
        body = renderRules(S.raw);
      } else {
        body = this.kanaDrillSetup();
      }
      return `${hero('Bảng chữ Kana', 'Hiragana dùng cho từ thuần Nhật và đuôi ngữ pháp; Katakana dùng cho từ mượn và tên nước ngoài. Học từng hàng, bấm vào chữ để nghe và xem mẹo nhớ.')}
        <nav class="ja-tabs" role="tablist">${tabs.map(t => `<button type="button" role="tab" aria-selected="${tab === t[0]}" class="ja-tab ${tab === t[0] ? 'active' : ''}" data-act="kana-tab" data-tab="${t[0]}">${t[1]}</button>`).join('')}</nav>
        <div class="ja-quiz-host">${body}</div>`;
    },
    kanaDrillSetup() {
      const set = this.state.drillSet || 'hiragana';
      const rows = this.state.drillRows || ['a', 'ka', 'sa'];
      const allRows = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa', 'n'];
      const stats = store.get(KEYS.kana, {});
      const weak = Object.keys(stats).filter(k => stats[k].fail > stats[k].ok).slice(0, 20);
      return `<div class="ja-card">
        <h3>Luyện nhận chữ</h3>
        <div class="ja-field"><span>Bảng chữ</span><div class="ja-chip-row">
          ${[['hiragana', 'Hiragana'], ['katakana', 'Katakana'], ['dakuten', 'Âm đục & ghép']].map(s => `<button type="button" class="ja-chip ${set === s[0] ? 'on' : ''}" data-act="drill-set" data-set="${s[0]}">${s[1]}</button>`).join('')}
        </div></div>
        ${set !== 'dakuten' ? `<div class="ja-field"><span>Chọn hàng</span><div class="ja-chip-row">${allRows.map(r => `<button type="button" class="ja-chip ${rows.includes(r) ? 'on' : ''}" data-act="drill-row" data-row="${r}">${r}</button>`).join('')}
          <button type="button" class="ja-chip" data-act="drill-row" data-row="*">Tất cả</button></div></div>` : ''}
        <div class="ja-actions">
          <button type="button" class="ja-btn ja-btn-primary" data-act="drill-start" data-mode="mcq">${ic('target')} Chọn đáp án</button>
          <button type="button" class="ja-btn" data-act="drill-start" data-mode="type">${ic('keyboard')} Gõ romaji</button>
          ${weak.length ? `<button type="button" class="ja-btn ja-btn-ghost" data-act="drill-start" data-mode="weak">${ic('refresh')} Ôn ${weak.length} chữ hay sai</button>` : ''}
        </div>
      </div>`;
    },
    startKanaDrill(mode) {
      const set = this.state.drillSet || 'hiragana';
      const rows = this.state.drillRows || ['a', 'ka', 'sa'];
      let pool = set === 'dakuten' ? kanaPool('dakuten') : kanaPool(set, rows);
      if (mode === 'weak') {
        const stats = store.get(KEYS.kana, {});
        const weak = Object.keys(stats).filter(k => stats[k].fail > stats[k].ok);
        const all = kanaPool('mixed');
        pool = all.filter(x => weak.includes(x.kana));
      }
      if (!pool.length) { toast('Hãy chọn ít nhất một hàng chữ.', 'warning'); return; }
      const qs = pick(pool, Math.min(15, Math.max(10, pool.length))).map(x => Q.kana(x, pool.length >= 4 ? pool : kanaPool('mixed'), mode === 'type'));
      this.startQuiz(qs, { title: 'Luyện nhận chữ', host: '.ja-quiz-host', onFinish: () => {} });
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
        return `<section class="ja-stage"><h2 class="ja-stage-title">${esc(st.title)}</h2><div class="ja-lesson-grid">
          ${list.map(l => {
            const r = p.lessons[l.id] || {};
            const stars = r.stars || 0;
            return `<a class="ja-lesson ${r.completed ? 'done' : ''} ${nx.id === l.id ? 'next' : ''} ${l.checkpoint ? 'checkpoint' : ''}" href="#ja/learn?lesson=${l.id}">
              <span class="ja-lesson-no">${l.no}</span>
              <span class="ja-lesson-body"><strong>${esc(l.title)}</strong><small>${esc(l.goal)}</small>
              <span class="ja-lesson-meta">${l.stage === 'kana' ? 'Bảng chữ' : `${l.wordIds.length} từ${l.kanjiChars.length ? ` · ${l.kanjiChars.length} Kanji` : ''}`}${l.checkpoint ? ' · Kiểm tra chặng' : ''}</span></span>
              <span class="ja-stars" aria-label="${stars} sao">${[1, 2, 3].map(i => ic(i <= stars ? 'star-filled' : 'star', { size: 14 })).join('')}</span>
              ${nx.id === l.id ? '<span class="ja-badge">Học tiếp</span>' : ''}
            </a>`;
          }).join('')}
        </div></section>`;
      }).join('');
      return `${hero('Lộ trình Nhập môn và N5', '35 bài: 6 bài bảng chữ, 29 bài theo khung JLPT N5. Mỗi bài cần đạt 60% (bài kiểm tra chặng cần 80%) để tính là xong.')}${stages}`;
    },
    renderLesson(l) {
      const step = this.state.lessonStep && this.state.lessonFor === l.id ? this.state.lessonStep : 'learn';
      const d = data();
      const words = l.wordIds.map(id => d.wordMap[id]).filter(Boolean);
      const isKana = l.stage === 'kana';
      const steps = isKana
        ? [['learn', 'Bảng chữ'], ['practice', l.checkpoint ? 'Kiểm tra chặng' : 'Luyện tập']]
        : [['learn', 'Từ vựng'], ['kanji', 'Kanji'], ['grammar', 'Ngữ pháp'], ['practice', l.checkpoint ? 'Kiểm tra chặng' : 'Luyện tập']];
      const r = getProgress().lessons[l.id] || {};
      let body = '';
      if (step === 'learn' && isKana) body = this.kanaLessonBody(l);
      else if (step === 'learn') {
        body = `<div class="ja-actions"><button type="button" class="ja-btn" data-act="play-all" data-lesson="${l.id}">${ic('play')} Nghe tất cả</button>
          <button type="button" class="ja-btn ja-btn-ghost" data-act="deck-add" data-lesson="${l.id}">${ic('plus')} Thêm ${words.length} từ vào thẻ ghi nhớ</button></div>
          <div class="ja-word-list">${words.map(w => this.wordCard(w)).join('')}</div>`;
      } else if (step === 'kanji') {
        const ks = l.kanjiChars.map(ch => d.kanji.find(k => k.ch === ch)).filter(Boolean);
        body = ks.length ? `<div class="ja-kanji-cards">${ks.map(k => this.kanjiCard(k)).join('')}</div>` : '<p class="ja-muted">Bài này không có Kanji mới. Các từ đã dùng Kanji của bài trước.</p>';
      } else if (step === 'grammar') {
        body = (l.grammar || []).map(g => `<div class="ja-card ja-grammar"><h3 class="ja-jp">${esc(g.p)}</h3><p>${esc(g.vi)}</p>
          ${(g.ex || []).map(e => `<div class="ja-ex-row">${speakBtn(e[0])}<div><div class="ja-jp">${esc(e[0])}</div><div class="ja-muted">${esc(e[1])}</div></div></div>`).join('')}</div>`).join('');
      } else {
        body = `<div class="ja-card"><p>${l.checkpoint ? `Kiểm tra chặng gồm câu hỏi của 5 bài gần nhất, cần đạt <strong>80%</strong>.` : 'Làm 10 câu hỏi về bài này, cần đạt <strong>60%</strong>. Sao: 60% một sao, 75% hai sao, 90% ba sao.'}</p>
          ${r.best ? `<p class="ja-muted">Điểm cao nhất: ${r.best}%</p>` : ''}
          <button type="button" class="ja-btn ja-btn-primary" data-act="lesson-quiz" data-lesson="${l.id}">${ic('play')} Bắt đầu</button></div>`;
      }
      const idx = d.lessons.indexOf(l);
      const prev = d.lessons[idx - 1];
      const next = d.lessons[idx + 1];
      return `<a class="ja-back" href="#ja/learn">${ic('arrow-left')} Lộ trình</a>
        ${hero(`Bài ${l.no}: ${l.title}`, `Mục tiêu: ${l.goal}`, `<div class="ja-stars ja-stars-lg">${[1, 2, 3].map(i => ic(i <= (r.stars || 0) ? 'star-filled' : 'star', { size: 22 })).join('')}</div>`)}
        <nav class="ja-tabs" role="tablist">${steps.map((s, i) => `<button type="button" role="tab" aria-selected="${step === s[0]}" class="ja-tab ${step === s[0] ? 'active' : ''}" data-act="lesson-step" data-step="${s[0]}" data-lesson="${l.id}">${i + 1}. ${s[1]}</button>`).join('')}</nav>
        <div class="ja-quiz-host">${body}</div>
        <div class="ja-lesson-nav">${prev ? `<a class="ja-btn ja-btn-ghost" href="#ja/learn?lesson=${prev.id}">${ic('chevron-left')} Bài ${prev.no}</a>` : '<span></span>'}${next ? `<a class="ja-btn ja-btn-ghost" href="#ja/learn?lesson=${next.id}">Bài ${next.no} ${ic('chevron-right')}</a>` : ''}</div>`;
    },
    kanaLessonBody(l) {
      const S = kanaSets();
      const k = l.kana || {};
      if (k.set === 'dakuten') return `<div class="ja-card"><h3>Âm đục và bán đục</h3>${flatGrid(S.dakuten)}</div><div class="ja-card"><h3>Âm ghép</h3>${flatGrid(S.yoon)}</div>`;
      if (k.set === 'mixed') return renderRules(S.raw) || '<p>Ôn lại hai bảng chữ.</p>';
      const list = (S[k.set] || []).filter(x => (k.rows || []).includes(x.row));
      const active = this.state.kanaChar && list.find(x => x.kana === this.state.kanaChar) ? this.state.kanaChar : list[0] && list[0].kana;
      return `<div class="ja-grid-2 ja-kana-layout"><div class="ja-card">${gojuonGrid(list, active)}</div><div>${kanaDetail(active)}</div></div>`;
    },
    startLessonQuiz(l) {
      const d = data();
      let qs;
      if (l.stage === 'kana') {
        const k = l.kana || {};
        const pool = kanaPool(k.set, k.rows);
        qs = pick(pool, 10).map((x, i) => Q.kana(x, pool.length >= 4 ? pool : kanaPool('mixed'), i % 3 === 2));
      } else {
        const range = l.checkpoint ? d.lessons.filter(x => x.stage !== 'kana' && x.no <= l.no && x.no > l.no - 5) : [l];
        const ids = Array.from(new Set(range.flatMap(x => x.wordIds)));
        const words = ids.map(id => d.wordMap[id]).filter(Boolean);
        qs = wordQuestions(words, d.words, l.checkpoint ? 15 : 10, ['meaning', 'listen', 'reading', 'viToJa', 'type']);
        const ks = range.flatMap(x => x.kanjiChars).map(ch => d.kanji.find(k => k.ch === ch)).filter(Boolean);
        pick(ks, Math.min(2, ks.length)).forEach(k => qs.push(Q.kanjiHV(k, d.kanji)));
        qs = shuffle(qs);
      }
      this.startQuiz(qs, {
        title: `Bài ${l.no}`, host: '.ja-quiz-host',
        onFinish: (pct) => {
          const res = saveLessonResult(l.id, pct, !!l.checkpoint);
          if (l.stage !== 'kana') addToDeck(l.wordIds);
          return res.passed ? `Đạt ${res.stars} sao. Từ của bài đã vào thẻ ghi nhớ.` : `Cần ${res.need}% để qua bài. Học lại phần từ vựng rồi thử lần nữa nhé.`;
        }
      });
    },
    wordCard(w) {
      return `<article class="ja-word">
        <div class="ja-word-main">${rubyWord(w)} ${speakBtn(w.kana)}</div>
        <div class="ja-word-info">
          <div><strong>${esc(w.vi)}</strong> <span class="ja-pos">${esc(w.posLabel)}</span></div>
          <div class="ja-small ja-muted">${esc(w.romaji)}${w.hanViet ? ` · <span class="ja-hv">${esc(w.hanViet)}</span>` : ''}</div>
          ${/^v[123]$/.test(w.pos) ? `<div class="ja-small">ます: <span class="ja-jp">${esc(core().conjugate(w, 'masu').written)}</span> · て: <span class="ja-jp">${esc(core().conjugate(w, 'te').written)}</span></div>` : ''}
          ${w.ex ? `<div class="ja-ex-row ja-small">${speakBtn(w.ex.ja, 'Nghe câu ví dụ')}<div><span class="ja-jp">${esc(w.ex.ja)}</span><br><span class="ja-muted">${esc(w.ex.vi)}</span></div></div>` : ''}
        </div>
      </article>`;
    },
    kanjiCard(k) {
      return `<article class="ja-kanji-card">
        <button type="button" class="ja-kanji-big ja-jp" data-act="kanji-open" data-char="${esc(k.ch)}" aria-label="Xem chữ ${esc(k.ch)}">${esc(k.ch)}</button>
        <div class="ja-kanji-info">
          <div class="ja-hv-big">${esc(k.hv)}</div>
          <div>${esc(k.vi)} · ${k.strokes} nét</div>
          <div class="ja-small"><span class="ja-label">On</span> <span class="ja-jp">${esc(k.on.join('、') || '—')}</span> <span class="ja-label">Kun</span> <span class="ja-jp">${esc(k.kun.join('、') || '—')}</span></div>
          <div class="ja-small ja-muted">${esc(k.tip)}</div>
          <div class="ja-chip-row">${k.examples.map(e => `<button type="button" class="ja-chip" data-act="speak" data-text="${esc(e.kana)}"><span class="ja-jp">${esc(e.word)}</span> ${esc(e.vi)}</button>`).join('')}</div>
          <a class="ja-link" href="#ja/writing?char=${encodeURIComponent(k.ch)}">${ic('pen', { size: 14 })} Tập viết</a>
        </div>
      </article>`;
    },

    /* ===== Từ vựng ===== */
    render_vocab() {
      const d = data();
      const st = this.state.vocab || (this.state.vocab = { lesson: '', pos: '', q: '' });
      const lessons = d.lessons.filter(l => l.stage !== 'kana');
      return `${hero(`Từ vựng N5 · ${d.words.length} từ`, 'Lọc theo bài, theo từ loại hoặc tìm bằng tiếng Việt, kana, romaji. Bấm loa để nghe.')}
        <div class="ja-card ja-filters">
          <label class="ja-field"><span>Bài</span><select data-act="vocab-filter" data-key="lesson"><option value="">Tất cả bài</option>${lessons.map(l => `<option value="${l.no}" ${String(st.lesson) === String(l.no) ? 'selected' : ''}>Bài ${l.no}: ${esc(l.title)}</option>`).join('')}</select></label>
          <label class="ja-field"><span>Từ loại</span><select data-act="vocab-filter" data-key="pos"><option value="">Tất cả</option>${Object.entries(core().POS_LABELS).map(([k, v]) => `<option value="${k}" ${st.pos === k ? 'selected' : ''}>${esc(v)}</option>`).join('')}</select></label>
          <label class="ja-field ja-field-grow"><span>Tìm</span><input type="search" data-act="vocab-search" value="${esc(st.q)}" placeholder="vd: ăn, たべる, taberu, 食"></label>
        </div>
        <div id="ja-vocab-results">${this.vocabResults()}</div>`;
    },
    vocabResults() {
      const d = data();
      const st = this.state.vocab;
      const q = (st.q || '').trim().toLowerCase();
      const qKana = q && /[a-z]/.test(q) ? core().romajiToKana(q) : q;
      let list = d.words.filter(w =>
        (!st.lesson || w.lesson === Number(st.lesson) || w.reviewIn.includes(Number(st.lesson))) &&
        (!st.pos || w.pos === st.pos) &&
        (!q || w.vi.toLowerCase().includes(q) || w.romaji.includes(q.replace(/\s/g, '')) || w.kana.includes(qKana) || (w.kanji && w.kanji.includes(q)) || w.hanViet.toLowerCase().includes(q)));
      const total = list.length;
      const limit = this.state.vocabLimit || 60;
      list = list.slice(0, limit);
      return `<p class="ja-small ja-muted">${total} từ</p><div class="ja-word-list">${list.map(w => this.wordCard(w)).join('')}</div>
        ${total > limit ? `<div class="ja-center"><button type="button" class="ja-btn" data-act="vocab-more">Xem thêm ${Math.min(60, total - limit)} từ</button></div>` : ''}`;
    },

    /* ===== Kanji ===== */
    render_kanji() {
      const d = data();
      const sel = this.params.get('char') || this.state.kanjiSel;
      const k = sel && d.kanji.find(x => x.ch === sel);
      const groups = {};
      d.kanji.forEach(x => { (groups[x.lesson] = groups[x.lesson] || []).push(x); });
      return `${hero(`Kanji N5 · ${d.kanji.length} chữ`, 'Mỗi chữ có âm Hán Việt, âm On (đọc theo Hán), âm Kun (đọc thuần Nhật), mẹo nhớ và từ ví dụ. Kanji được xếp theo bài học đầu tiên dùng đến chữ đó.')}
        ${k ? `<div class="ja-kanji-focus">${this.kanjiCard(k)}</div>` : ''}
        ${Object.keys(groups).sort((a, b) => a - b).map(no => `<section class="ja-stage"><h3 class="ja-stage-title">Bài ${no}</h3><div class="ja-kanji-grid">
          ${groups[no].map(x => `<button type="button" class="ja-kanji-tile ${k && k.ch === x.ch ? 'active' : ''}" data-act="kanji-open" data-char="${esc(x.ch)}"><span class="ja-jp">${esc(x.ch)}</span><small>${esc(x.hv)}</small></button>`).join('')}
        </div></section>`).join('')}`;
    },

    /* ===== Thẻ ghi nhớ ===== */
    render_flashcards() {
      const fc = this.state.fc;
      if (fc && fc.queue && fc.idx < fc.queue.length) return this.flashcardView();
      const d = data();
      const due = dueIds();
      const deckSize = Object.keys(sm2Data()).length;
      const lessons = d.lessons.filter(l => l.stage !== 'kana');
      const done = fc && fc.queue && fc.queue.length ? `<div class="ja-card ja-result"><h3>${ic('party-popper')} Xong lượt ôn</h3><p>Bạn đã ôn ${fc.queue.length} thẻ, nhớ ${fc.good}/${fc.queue.length}.</p></div>` : '';
      return `${hero('Thẻ ghi nhớ', 'Ôn ngắt quãng SM-2: thẻ nhớ tốt sẽ lâu mới gặp lại, thẻ quên sẽ quay lại sau 10 phút.')}
        ${done}
        <div class="ja-grid-2">
          <div class="ja-card"><h3>Ôn thẻ đến hạn</h3><p class="ja-big-num">${due.length}</p><p class="ja-muted">Trong bộ thẻ có ${deckSize} từ. Từ của bài học tự vào bộ thẻ khi bạn qua bài.</p>
            <button type="button" class="ja-btn ja-btn-primary" data-act="fc-start" data-scope="due" ${due.length ? '' : 'disabled'}>${ic('play')} Ôn ngay</button></div>
          <div class="ja-card"><h3>Học thẻ theo bài</h3>
            <label class="ja-field"><span>Bài</span><select id="ja-fc-lesson">${lessons.map(l => `<option value="${l.id}">Bài ${l.no}: ${esc(l.title)}</option>`).join('')}</select></label>
            <label class="ja-field"><span>Mặt trước</span><select id="ja-fc-mode"><option value="ja">Tiếng Nhật → nghĩa</option><option value="vi">Nghĩa → tiếng Nhật</option><option value="audio">Nghe → nghĩa</option></select></label>
            <button type="button" class="ja-btn" data-act="fc-start" data-scope="lesson">${ic('cards')} Bắt đầu</button></div>
        </div>`;
    },
    startFlashcards(scope) {
      const d = data();
      let ids = [];
      let mode = 'ja';
      if (scope === 'due') ids = shuffle(dueIds()).slice(0, 30);
      else {
        const sel = this.el.querySelector('#ja-fc-lesson');
        const m = this.el.querySelector('#ja-fc-mode');
        const l = d.lessons.find(x => x.id === (sel && sel.value));
        mode = (m && m.value) || 'ja';
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
      const front = fc.mode === 'vi' ? `<div class="ja-q-mid">${esc(w.vi)}</div>`
        : fc.mode === 'audio' ? `<button type="button" class="ja-big-play" data-act="speak" data-text="${esc(w.kana)}">${ic('volume', { size: 34 })}</button>`
          : `<div class="ja-q-big ja-jp">${esc(w.word)}</div>`;
      if (fc.mode === 'audio' && !fc.flipped) this.afterRender = () => speak(w.kana);
      return `${hero('Thẻ ghi nhớ', `Thẻ ${fc.idx + 1}/${fc.queue.length}`)}
        <div class="ja-progress"><span style="width:${Math.round(fc.idx / fc.queue.length * 100)}%"></span></div>
        <div class="ja-card ja-flash ${fc.flipped ? 'flipped' : ''}" data-act="fc-flip" role="button" tabindex="0" aria-label="Lật thẻ">
          ${front}
          ${fc.flipped ? `<div class="ja-flash-back">
            <div class="ja-q-big">${rubyWord(w)} ${speakBtn(w.kana)}</div>
            <p><strong>${esc(w.vi)}</strong> · ${esc(w.romaji)}</p>
            ${w.hanViet ? `<p class="ja-hv">Hán Việt: ${esc(w.hanViet)}</p>` : ''}
            ${w.ex ? `<p class="ja-ex"><span class="ja-jp">${esc(w.ex.ja)}</span><br><span class="ja-muted">${esc(w.ex.vi)}</span></p>` : ''}
          </div>` : '<p class="ja-muted ja-small">Bấm vào thẻ hoặc phím Cách để lật</p>'}
        </div>
        ${fc.flipped ? `<div class="ja-grade-row">
          <button type="button" class="ja-btn ja-grade-0" data-act="fc-grade" data-grade="1">Quên <small>1</small></button>
          <button type="button" class="ja-btn ja-grade-1" data-act="fc-grade" data-grade="3">Khó <small>2</small></button>
          <button type="button" class="ja-btn ja-grade-2" data-act="fc-grade" data-grade="4">Nhớ <small>3</small></button>
          <button type="button" class="ja-btn ja-grade-3" data-act="fc-grade" data-grade="5">Dễ <small>4</small></button>
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

    /* ===== Tập viết ===== */
    render_writing() {
      const d = data();
      const S = kanaSets();
      const ch = this.params.get('char') || this.state.writeChar || d.kanji[0].ch;
      this.state.writeChar = ch;
      const k = d.kanji.find(x => x.ch === ch);
      const kana = !k && findKana(ch);
      this.afterRender = () => this.loadStrokes(ch);
      return `${hero('Tập viết', 'Xem thứ tự nét rồi tô theo trên khung. Dữ liệu nét: KanjiVG (CC BY-SA 3.0).')}
        <div class="ja-grid-2 ja-write-layout">
          <div class="ja-card">
            <div class="ja-write-stage">
              <div class="ja-write-svg" id="ja-write-svg" aria-live="polite"><p class="ja-muted">Đang tải nét chữ…</p></div>
              <canvas id="ja-write-canvas" class="ja-write-canvas" width="320" height="320" aria-label="Khung viết thử"></canvas>
            </div>
            <div class="ja-actions">
              <button type="button" class="ja-btn ja-btn-primary" data-act="write-animate">${ic('play')} Xem nét</button>
              <button type="button" class="ja-btn" data-act="write-clear">${ic('refresh')} Xóa nét tô</button>
              <label class="ja-check"><input type="checkbox" id="ja-write-guide" checked data-act="write-guide"> Hiện chữ mờ</label>
            </div>
            <div class="ja-write-info">
              <div class="ja-kana-giant ja-jp">${esc(ch)}</div>
              <div>${k ? `<div class="ja-hv-big">${esc(k.hv)}</div><div>${esc(k.vi)} · ${k.strokes} nét</div><div class="ja-small ja-muted">${esc(k.tip)}</div>` : kana ? `<div class="ja-hv-big">${esc(kana.romaji)}</div><div class="ja-small ja-muted">${esc(kana.mnemonic || '')}</div>` : ''}
                ${speakBtn(k ? (k.examples[0] ? k.examples[0].kana : ch) : ch)}</div>
            </div>
          </div>
          <div class="ja-card ja-write-picker">
            <h3>Chọn chữ</h3>
            <div class="ja-chip-row"><button type="button" class="ja-chip ${this.state.writeSet !== 'kana' ? 'on' : ''}" data-act="write-set" data-set="kanji">Kanji</button><button type="button" class="ja-chip ${this.state.writeSet === 'kana' ? 'on' : ''}" data-act="write-set" data-set="kana">Hiragana · Katakana</button></div>
            <div class="ja-pick-grid">${(this.state.writeSet === 'kana' ? S.hiragana.concat(S.katakana).map(x => x.kana) : d.kanji.map(x => x.ch)).map(c => `<a class="ja-pick ${c === ch ? 'active' : ''}" href="#ja/writing?char=${encodeURIComponent(c)}"><span class="ja-jp">${esc(c)}</span></a>`).join('')}</div>
          </div>
        </div>`;
    },
    loadStrokes(ch) {
      const host = this.el.querySelector('#ja-write-svg');
      this.setupCanvas();
      if (!host) return;
      const code = ch.codePointAt(0).toString(16).padStart(5, '0');
      const token = this.writeToken = Date.now();
      fetch(KANJIVG_BASE + code + '.svg').then(r => { if (!r.ok) throw new Error('http ' + r.status); return r.text(); }).then(txt => {
        if (this.writeToken !== token) return;
        const doc = new DOMParser().parseFromString(txt, 'image/svg+xml');
        const paths = Array.from(doc.querySelectorAll('path')).map(p => p.getAttribute('d')).filter(Boolean);
        const nums = Array.from(doc.querySelectorAll('text')).map(t => ({ x: (t.getAttribute('transform') || '').match(/matrix\(1 0 0 1 ([\d.]+) ([\d.]+)\)/), n: t.textContent }));
        if (!paths.length) throw new Error('no paths');
        host.innerHTML = `<svg viewBox="0 0 109 109" class="ja-strokes" role="img" aria-label="Thứ tự nét chữ ${esc(ch)}">
          <g class="ja-strokes-guide">${paths.map(d => `<path d="${esc(d)}"/>`).join('')}</g>
          <g class="ja-strokes-anim">${paths.map((d, i) => `<path d="${esc(d)}" data-i="${i}"/>`).join('')}</g>
          <g class="ja-strokes-num">${nums.map(t => t.x ? `<text x="${t.x[1]}" y="${t.x[2]}">${esc(t.n)}</text>` : '').join('')}</g>
        </svg>`;
        this.animateStrokes();
      }).catch(() => {
        if (this.writeToken !== token) return;
        host.innerHTML = `<div class="ja-write-fallback ja-jp">${esc(ch)}</div><p class="ja-small ja-muted">Không tải được dữ liệu nét (cần mạng). Bạn vẫn có thể tô theo chữ mẫu.</p>`;
      });
    },
    animateStrokes() {
      const svg = this.el && this.el.querySelector('.ja-strokes');
      if (!svg) return;
      const paths = Array.from(svg.querySelectorAll('.ja-strokes-anim path'));
      clearTimeout(this.writeTimer);
      paths.forEach(p => {
        const len = p.getTotalLength ? p.getTotalLength() : 100;
        p.style.transition = 'none';
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
      });
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let i = 0;
      const stepFn = () => {
        if (i >= paths.length) return;
        const p = paths[i];
        p.getBoundingClientRect();
        p.style.transition = reduce ? 'none' : 'stroke-dashoffset 0.55s ease';
        p.style.strokeDashoffset = 0;
        i++;
        this.writeTimer = setTimeout(stepFn, reduce ? 50 : 650);
      };
      stepFn();
    },
    setupCanvas() {
      const cv = this.el.querySelector('#ja-write-canvas');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const style = getComputedStyle(this.el);
      ctx.lineWidth = 9;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = (style.getPropertyValue('--accent') || '#1e3a5f').trim() || '#1e3a5f';
      let drawing = false;
      const pos = e => {
        const r = cv.getBoundingClientRect();
        const t = e.touches ? e.touches[0] : e;
        return [(t.clientX - r.left) * cv.width / r.width, (t.clientY - r.top) * cv.height / r.height];
      };
      const down = e => { drawing = true; const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y); e.preventDefault(); };
      const move = e => { if (!drawing) return; const [x, y] = pos(e); ctx.lineTo(x, y); ctx.stroke(); e.preventDefault(); };
      const up = () => { drawing = false; };
      cv.onpointerdown = down; cv.onpointermove = move; cv.onpointerup = up; cv.onpointerleave = up;
    },
    stopWriting() { clearTimeout(this.writeTimer); this.writeToken = 0; },

    /* ===== Luyện gõ ===== */
    render_typing() {
      const t = this.state.typing;
      const stats = store.get(KEYS.typing, { total: 0, correct: 0, best: 0 });
      if (t && t.active) return this.typingView();
      const d = data();
      const lessons = d.lessons.filter(l => l.stage !== 'kana');
      const modes = [['kana', 'Chữ Kana → romaji'], ['word', 'Từ → cách đọc'], ['listen', 'Nghe → gõ'], ['meaning', 'Nghĩa → gõ'], ['conj', 'Chia động từ']];
      return `${hero('Luyện gõ tiếng Nhật', 'Gõ romaji, máy tự đổi sang kana như bộ gõ tiếng Nhật: "taberu" → たべる, "kk" → っk, "nn" → ん, "-" → ー.')}
        <div class="ja-grid-2">
          <div class="ja-card">
            <label class="ja-field"><span>Chế độ</span><select id="ja-type-mode">${modes.map(m => `<option value="${m[0]}" ${t && t.mode === m[0] ? 'selected' : ''}>${m[1]}</option>`).join('')}</select></label>
            <label class="ja-field"><span>Phạm vi từ</span><select id="ja-type-scope"><option value="all">Tất cả từ N5</option>${lessons.map(l => `<option value="${l.no}">Bài ${l.no}: ${esc(l.title)}</option>`).join('')}</select></label>
            <button type="button" class="ja-btn ja-btn-primary" data-act="type-start">${ic('keyboard')} Bắt đầu 15 câu</button>
          </div>
          <div class="ja-card"><h3>Thống kê</h3>
            <p>Đã gõ: <strong>${stats.total}</strong> · Đúng: <strong>${stats.total ? Math.round(stats.correct / stats.total * 100) : 0}%</strong> · Chuỗi đúng dài nhất: <strong>${stats.best}</strong></p>
            <div class="ja-small ja-muted"><p>Bảng gõ nhanh: shi/si = し, chi/ti = ち, tsu/tu = つ, fu/hu = ふ, ji/zi = じ, sha = しゃ, cha = ちゃ, wo = を, xtsu = っ.</p></div>
          </div>
        </div>`;
    },
    startTyping() {
      const d = data();
      const mode = (this.el.querySelector('#ja-type-mode') || {}).value || 'word';
      const scope = (this.el.querySelector('#ja-type-scope') || {}).value || 'all';
      let words = scope === 'all' ? d.words : d.words.filter(w => w.lesson === Number(scope) || w.reviewIn.includes(Number(scope)));
      words = words.filter(w => w.pos !== 'exp' || w.kana.length <= 8);
      let qs;
      if (mode === 'kana') {
        const pool = kanaPool('mixed');
        qs = pick(pool, 15).map(x => Q.kana(x, pool, true));
      } else if (mode === 'conj') {
        let verbs = words.filter(w => /^v[123]$/.test(w.pos));
        if (verbs.length < 5) verbs = d.words.filter(w => /^v[123]$/.test(w.pos));
        const forms = ['masu', 'te', 'nai', 'ta', 'masen', 'mashita'];
        qs = pick(verbs, 15).map((w, i) => Q.conj(w, forms[i % forms.length]));
      } else {
        qs = pick(words, 15).map(w => {
          const q = Q.type(w);
          if (mode === 'listen') { q.prompt = `<button type="button" class="ja-big-play" data-act="speak" data-text="${esc(w.kana)}">${ic('volume', { size: 34 })}</button>`; q.autoplay = true; q.ask = 'Nghe rồi gõ lại từ (romaji hoặc kana):'; }
          if (mode === 'meaning') { q.prompt = `<div class="ja-q-mid">${esc(w.vi)}</div>`; q.ask = 'Gõ từ tiếng Nhật có nghĩa này:'; }
          return q;
        });
      }
      this.state.typing = { mode };
      this.startQuiz(qs, {
        title: 'Luyện gõ', host: '.ja-wrap', typingStats: true,
        onFinish: () => { this.state.typing = null; return ''; }
      });
    },

    /* ===== Kiểm tra ===== */
    render_quiz() {
      const d = data();
      const lessons = d.lessons.filter(l => l.stage !== 'kana');
      const wrongs = store.get(KEYS.wrongs, []).filter(id => d.wordMap[id]);
      return `${hero('Kiểm tra', 'Trắc nghiệm tổng hợp: nghĩa của từ, cách đọc Kanji, nghe chọn từ, Hán Việt. Câu sai được lưu để ôn lại.')}
        <div class="ja-grid-2">
          <div class="ja-card">
            <label class="ja-field"><span>Từ bài</span><select id="ja-quiz-from">${lessons.map(l => `<option value="${l.no}">Bài ${l.no}</option>`).join('')}</select></label>
            <label class="ja-field"><span>Đến bài</span><select id="ja-quiz-to">${lessons.map(l => `<option value="${l.no}" ${l.no === 35 ? 'selected' : ''}>Bài ${l.no}</option>`).join('')}</select></label>
            <label class="ja-field"><span>Số câu</span><select id="ja-quiz-n"><option>10</option><option selected>20</option><option>30</option></select></label>
            <div class="ja-field"><span>Dạng câu hỏi</span><div class="ja-chip-row">
              ${[['meaning', 'Nghĩa'], ['reading', 'Cách đọc'], ['listen', 'Nghe'], ['viToJa', 'Việt → Nhật'], ['kanji', 'Kanji Hán Việt']].map(t => `<label class="ja-chip ja-chip-check"><input type="checkbox" class="ja-quiz-type" value="${t[0]}" checked> ${t[1]}</label>`).join('')}
            </div></div>
            <button type="button" class="ja-btn ja-btn-primary" data-act="quiz-start">${ic('play')} Bắt đầu</button>
          </div>
          <div class="ja-card"><h3>Ôn câu sai</h3><p class="ja-big-num">${wrongs.length}</p><p class="ja-muted">Những từ bạn từng trả lời sai trong Kiểm tra.</p>
            <button type="button" class="ja-btn" data-act="quiz-wrongs" ${wrongs.length ? '' : 'disabled'}>${ic('refresh')} Ôn lại</button></div>
        </div>`;
    },
    startBigQuiz(onlyWrongs) {
      const d = data();
      let words, n, types;
      if (onlyWrongs) {
        words = store.get(KEYS.wrongs, []).map(id => d.wordMap[id]).filter(Boolean);
        n = Math.min(20, words.length); types = ['meaning', 'viToJa', 'listen'];
      } else {
        let a = Number(this.el.querySelector('#ja-quiz-from').value), b = Number(this.el.querySelector('#ja-quiz-to').value);
        if (a > b) [a, b] = [b, a];
        n = Number(this.el.querySelector('#ja-quiz-n').value) || 20;
        types = Array.from(this.el.querySelectorAll('.ja-quiz-type:checked')).map(x => x.value);
        if (!types.length) types = ['meaning'];
        words = d.words.filter(w => w.lesson >= a && w.lesson <= b);
        this.quizKanji = types.includes('kanji') ? d.kanji.filter(k => k.lesson >= a && k.lesson <= b) : [];
      }
      const wordTypes = types.filter(t => t !== 'kanji');
      let qs = wordTypes.length ? wordQuestions(words, d.words, types.includes('kanji') ? Math.ceil(n * 0.8) : n, wordTypes) : [];
      if (!onlyWrongs && types.includes('kanji')) pick(this.quizKanji, n - qs.length).forEach(k => qs.push(Q.kanjiHV(k, d.kanji)));
      qs = shuffle(qs);
      if (!qs.length) { toast('Không đủ từ trong phạm vi đã chọn.', 'warning'); return; }
      this.startQuiz(qs, {
        title: 'Kiểm tra', host: '.ja-wrap', saveWrongs: true,
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
      return (sel && this.el.querySelector(sel)) || this.el.querySelector('.ja-wrap');
    },
    renderQuiz() {
      const z = this.quiz;
      const host = this.quizHost();
      if (!z || !host) return;
      if (z.i >= z.qs.length) return this.finishQuiz();
      const q = z.qs[z.i];
      z.answered = false;
      host.innerHTML = `<div class="ja-card ja-quiz">
        <div class="ja-quiz-top"><span>${esc(z.opts.title)} · Câu ${z.i + 1}/${z.qs.length}</span><span>${ic('check-circle', { size: 14 })} ${z.correct}</span>
          <button type="button" class="ja-icon-btn" data-act="quiz-quit" aria-label="Thoát">${ic('x')}</button></div>
        <div class="ja-progress"><span style="width:${Math.round(z.i / z.qs.length * 100)}%"></span></div>
        <p class="ja-quiz-ask">${esc(q.ask || '')}</p>
        <div class="ja-quiz-prompt">${q.prompt}</div>
        ${q.kind === 'mcq'
          ? `<div class="ja-choices">${q.choices.map((c, i) => `<button type="button" class="ja-choice ${q.choiceClass || ''}" data-act="quiz-choose" data-i="${i}"><kbd>${i + 1}</kbd> ${esc(c)}</button>`).join('')}</div>`
          : `<div class="ja-type-box"><input type="text" class="ja-type-input" id="ja-type-input" autocomplete="off" autocapitalize="off" spellcheck="false" lang="ja" placeholder="${q.romajiOnly ? 'vd: ka' : 'vd: taberu'}" aria-label="Ô gõ đáp án">
              <div class="ja-type-preview ja-jp" id="ja-type-preview" aria-live="polite"></div>
              <button type="button" class="ja-btn ja-btn-primary" data-act="quiz-submit">Kiểm tra</button></div>`}
        <div class="ja-feedback" id="ja-feedback" aria-live="assertive"></div>
      </div>`;
      if (q.autoplay && q.audio) setTimeout(() => speak(q.audio), 200);
      const inp = host.querySelector('#ja-type-input');
      if (inp) setTimeout(() => inp.focus(), 50);
    },
    answerQuiz(ok, picked) {
      const z = this.quiz;
      if (!z || z.answered) return;
      z.answered = true;
      const q = z.qs[z.i];
      const host = this.quizHost();
      if (ok) { z.correct++; z.streak++; reward(z.opts.typingStats ? 'typingWord' : 'quizCorrect'); }
      else z.streak = 0;
      if (q.wordId) (ok ? z.rightIds : z.wrongIds).push(q.wordId);
      if (q.kanaKey) {
        const st = store.get(KEYS.kana, {});
        const s = st[q.kanaKey] || { ok: 0, fail: 0 };
        ok ? s.ok++ : s.fail++;
        st[q.kanaKey] = s;
        store.set(KEYS.kana, st);
      }
      if (z.opts.typingStats) {
        const st = store.get(KEYS.typing, { total: 0, correct: 0, best: 0 });
        st.total++; if (ok) st.correct++; st.best = Math.max(st.best || 0, z.streak);
        store.set(KEYS.typing, st);
      }
      if (q.kind === 'mcq') {
        host.querySelectorAll('.ja-choice').forEach((b, i) => {
          b.disabled = true;
          if (i === q.answer) b.classList.add('correct');
          else if (i === picked) b.classList.add('wrong');
        });
      } else {
        const inp = host.querySelector('#ja-type-input');
        if (inp) { inp.disabled = true; inp.classList.add(ok ? 'correct' : 'wrong'); }
      }
      if (q.audio && (ok || q.kind === 'type')) speak(q.audio);
      const fb = host.querySelector('#ja-feedback');
      if (fb) {
        fb.className = `ja-feedback ${ok ? 'ok' : 'bad'}`;
        fb.innerHTML = `<strong>${ok ? 'Chính xác!' : 'Chưa đúng.'}</strong> <span>${esc(q.explain || '')}</span>
          <button type="button" class="ja-btn ja-btn-primary" data-act="quiz-next">${z.i + 1 >= z.qs.length ? 'Xem kết quả' : 'Câu tiếp'} ${ic('arrow-right')}</button>`;
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
      host.innerHTML = `<div class="ja-card ja-result">
        <div class="ja-result-score ${pct >= 80 ? 'good' : pct >= 60 ? 'mid' : 'low'}">${pct}%</div>
        <p>Đúng ${z.correct}/${z.qs.length} câu.</p>
        ${msg ? `<p>${esc(msg)}</p>` : ''}
        ${wrongWords.length ? `<h4>Từ cần ôn</h4><div class="ja-chip-row">${wrongWords.map(w => `<button type="button" class="ja-chip" data-act="speak" data-text="${esc(w.kana)}"><span class="ja-jp">${esc(w.word)}</span> ${esc(w.kana)} · ${esc(w.vi)}</button>`).join('')}</div>` : ''}
        <div class="ja-actions"><button type="button" class="ja-btn ja-btn-primary" data-act="quiz-again">${ic('refresh')} Làm lại</button><button type="button" class="ja-btn ja-btn-ghost" data-act="quiz-quit">Xong</button></div>
      </div>`;
      this.lastQuizQs = z.qs;
      this.lastQuizOpts = z.opts;
      this.quiz = null;
    },

    /* ===== Sự kiện ===== */
    onClick(e) {
      const t = e.target.closest('[data-act]');
      if (!t || !this.el.contains(t)) return;
      const act = t.dataset.act;
      const d = data();
      switch (act) {
        case 'speak': e.preventDefault(); e.stopPropagation(); speak(t.dataset.text); break;
        case 'kana-tab': this.state.kanaTab = t.dataset.tab; this.render(); break;
        case 'kana-detail': this.state.kanaChar = t.dataset.char; speak(t.dataset.char); this.render(); break;
        case 'drill-set': this.state.drillSet = t.dataset.set; this.render(); break;
        case 'drill-row': {
          const all = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa', 'n'];
          let rows = (this.state.drillRows || ['a', 'ka', 'sa']).slice();
          const r = t.dataset.row;
          if (r === '*') rows = rows.length === all.length ? ['a'] : all.slice();
          else rows = rows.includes(r) ? rows.filter(x => x !== r) : rows.concat(r);
          this.state.drillRows = rows; this.render(); break;
        }
        case 'drill-start': this.startKanaDrill(t.dataset.mode); break;
        case 'lesson-step': this.state.lessonStep = t.dataset.step; this.state.lessonFor = t.dataset.lesson; this.render(); break;
        case 'lesson-quiz': { const l = d.lessons.find(x => x.id === t.dataset.lesson); if (l) this.startLessonQuiz(l); break; }
        case 'deck-add': { const l = d.lessons.find(x => x.id === t.dataset.lesson); const n = l ? addToDeck(l.wordIds) : 0; toast(n ? `Đã thêm ${n} từ vào thẻ ghi nhớ.` : 'Các từ này đã có trong thẻ ghi nhớ.', 'success'); break; }
        case 'play-all': {
          const l = d.lessons.find(x => x.id === t.dataset.lesson);
          if (l) speak(l.wordIds.map(id => d.wordMap[id] && d.wordMap[id].kana).filter(Boolean).join('、'), 0.85);
          break;
        }
        case 'vocab-more': this.state.vocabLimit = (this.state.vocabLimit || 60) + 60; this.el.querySelector('#ja-vocab-results').innerHTML = this.vocabResults(); break;
        case 'kanji-open': {
          const ch = t.dataset.char;
          if (this.section === 'kanji') { this.state.kanjiSel = ch; this.params = new URLSearchParams(); this.render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
          else window.location.hash = `#ja/kanji?char=${encodeURIComponent(ch)}`;
          break;
        }
        case 'fc-start': this.startFlashcards(t.dataset.scope); break;
        case 'fc-flip': if (!e.target.closest('button')) { this.state.fc.flipped = !this.state.fc.flipped; this.render(); } break;
        case 'fc-grade': this.gradeFlashcard(Number(t.dataset.grade)); break;
        case 'write-animate': this.animateStrokes(); break;
        case 'write-clear': { const cv = this.el.querySelector('#ja-write-canvas'); if (cv) cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); break; }
        case 'write-set': this.state.writeSet = t.dataset.set; this.params = new URLSearchParams(); this.render(); break;
        case 'type-start': this.startTyping(); break;
        case 'quiz-start': this.startBigQuiz(false); break;
        case 'quiz-wrongs': this.startBigQuiz(true); break;
        case 'quiz-choose': { const q = this.quiz && this.quiz.qs[this.quiz.i]; if (q) this.answerQuiz(Number(t.dataset.i) === q.answer, Number(t.dataset.i)); break; }
        case 'quiz-submit': this.submitTyped(); break;
        case 'quiz-next': if (this.quiz) { this.quiz.i++; this.renderQuiz(); } break;
        case 'quiz-again': if (this.lastQuizQs) this.startQuiz(shuffle(this.lastQuizQs), this.lastQuizOpts); break;
        case 'quiz-quit': this.quiz = null; this.state.typing = null; this.render(); break;
        default: break;
      }
    },
    submitTyped() {
      const z = this.quiz;
      if (!z || z.answered) return;
      const q = z.qs[z.i];
      const inp = this.el.querySelector('#ja-type-input');
      const val = inp ? inp.value : '';
      if (!val.trim()) return;
      let ok;
      if (q.romajiOnly) {
        ok = core().answerMatches(q.expected, val) || val.trim().toLowerCase() === String(q.romaji || '').toLowerCase();
      } else {
        ok = core().answerMatches(q.expected, val) || (q.wordId && data().wordMap[q.wordId] && data().wordMap[q.wordId].kanji === val.trim());
      }
      this.answerQuiz(!!ok);
    },
    onInput(e) {
      if (e.target.matches('[data-act="vocab-search"]')) {
        this.state.vocab.q = e.target.value;
        this.state.vocabLimit = 60;
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => { const r = this.el.querySelector('#ja-vocab-results'); if (r) r.innerHTML = this.vocabResults(); }, 150);
      } else if (e.target.id === 'ja-type-input') {
        const pv = this.el.querySelector('#ja-type-preview');
        const v = e.target.value;
        if (pv) pv.textContent = /[a-zA-Z]/.test(v) ? core().romajiToKana(v, false) : '';
      }
    },
    onChange(e) {
      if (e.target.matches('[data-act="vocab-filter"]')) {
        this.state.vocab[e.target.dataset.key] = e.target.value;
        this.state.vocabLimit = 60;
        const r = this.el.querySelector('#ja-vocab-results');
        if (r) r.innerHTML = this.vocabResults();
      } else if (e.target.id === 'ja-write-guide') {
        const g = this.el.querySelector('.ja-strokes-guide');
        if (g) g.style.display = e.target.checked ? '' : 'none';
      }
    },
    onKey(e) {
      if (e.target.id === 'ja-type-input' && e.key === 'Enter') {
        e.preventDefault();
        if (this.quiz && this.quiz.answered) { this.quiz.i++; this.renderQuiz(); } else this.submitTyped();
        return;
      }
      if (this.quiz && !this.quiz.answered && /^[1-4]$/.test(e.key) && e.target.tagName !== 'INPUT') {
        const q = this.quiz.qs[this.quiz.i];
        if (q && q.kind === 'mcq' && q.choices[Number(e.key) - 1] !== undefined) this.answerQuiz(Number(e.key) - 1 === q.answer, Number(e.key) - 1);
        return;
      }
      if (this.section === 'flashcards' && this.state.fc && this.state.fc.queue && e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this.state.fc.flipped = !this.state.fc.flipped; this.render(); }
        else if (this.state.fc.flipped && /^[1-4]$/.test(e.key)) this.gradeFlashcard([1, 3, 4, 5][Number(e.key) - 1]);
      }
    }
  };

  // Phím tắt toàn trang cho thẻ ghi nhớ và trắc nghiệm (khi tiêu điểm không nằm trong khung tiếng Nhật)
  if (typeof document !== 'undefined') {
    document.addEventListener('keydown', e => {
      if (!JaStudio.el || !JaStudio.el.classList.contains('active') || JaStudio.el.contains(e.target)) return;
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      JaStudio.onKey(e);
    });
  }

  if (typeof window !== 'undefined') window.JaStudio = JaStudio;
  if (typeof module !== 'undefined' && module.exports) module.exports = JaStudio;
})();
