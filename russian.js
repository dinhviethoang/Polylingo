/**
 * russian.js — Mục tiếng Nga của PolyLingo (window.RuStudio)
 * Các mục: Tổng quan, Bảng chữ Kirin, Lộ trình 35 bài, Từ vựng A1, 6 cách, Thẻ ghi nhớ (SM-2),
 * Tập viết chữ, Luyện gõ (phiên âm Latinh → Kirin, bàn phím ЙЦУКЕН trên màn hình), Kiểm tra.
 * Dữ liệu: data/ru/*.js qua window.RuCore.load(). Luyện nói và Hội thoại dùng talk.js và app.js sẵn có.
 * Khung giao diện dùng chung lớp .ja-* trong japanese.css; phần riêng ở russian.css (.ru-*).
 * Khóa lưu: ru_learn_progress_v1, ru_sm2_data, ru_typing_stats, ru_quiz_wrongs, ru_letter_stats.
 */
(function () {
  'use strict';

  const KEYS = {
    progress: 'ru_learn_progress_v1',
    sm2: 'ru_sm2_data',
    typing: 'ru_typing_stats',
    wrongs: 'ru_quiz_wrongs',
    letters: 'ru_letter_stats'
  };
  const SECTIONS = ['home', 'cyrillic', 'learn', 'vocab', 'cases', 'flashcards', 'writing', 'typing', 'quiz'];
  const KEY_ROWS = ['йцукенгшщзхъ', 'фывапролджэ', 'ячсмитьбю', 'ё'];
  const CASE_SHORT = ['Cách 1', 'Cách 2', 'Cách 3', 'Cách 4', 'Cách 5', 'Cách 6'];
  const GENDER_CHOICES = { m: 'Giống đực', f: 'Giống cái', n: 'Giống trung', pl: 'Chỉ có số nhiều' };

  /* ---------- Tiện ích ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ic = (n, o) => (window.PolyIcons ? window.PolyIcons.svg(n, Object.assign({ size: 18 }, o || {})) : '');
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (arr, n) => shuffle(arr).slice(0, n);
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* bộ nhớ đầy hoặc bị chặn */ } }
  };
  const core = () => window.RuCore;
  const data = () => core().load();

  function speak(text, rate) {
    const t = core().stripStress(text);
    if (!t) return;
    if (window.app && typeof window.app.speakText === 'function') { window.app.speakText(t, rate || null, 'ru-RU'); return; }
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'ru-RU';
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
  const ru = s => `<span class="ru-text" lang="ru">${esc(s)}</span>`;

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
  /** Các cách đặt trọng âm sai của một từ (để hỏi chọn trọng âm đúng). */
  function stressVariants(w) {
    const plain = w.plain;
    const out = [];
    Array.from(plain).forEach((ch, i) => {
      if ('аеиоуыэюяАЕИОУЫЭЮЯ'.includes(ch)) out.push(plain.slice(0, i + 1) + core().ACUTE + plain.slice(i + 1));
    });
    return out;
  }
  const canStress = w => !/[\s-]/.test(w.plain) && !/ё/i.test(w.plain) && core().vowelCount(w.plain) >= 2 && w.word.includes(core().ACUTE);
  const Q = {
    meaning(w, pool) {
      return mcq(`<div class="ja-q-big">${ru(w.word)}</div><div class="ja-q-sub">${esc(w.translit)}</div>`, w.vi, distractors(w, pool, 'vi', 3),
        { audio: w.word, ask: 'Từ này nghĩa là gì?', wordId: w.id, explain: `${w.word} = ${w.vi}` });
    },
    listen(w, pool) {
      return mcq(`<button type="button" class="ja-big-play" data-act="speak" data-text="${esc(w.word)}" aria-label="Nghe lại">${ic('volume', { size: 34 })}</button>`,
        w.word, distractors(w, pool, 'word', 3), { audio: w.word, autoplay: true, ask: 'Nghe và chọn từ đúng:', wordId: w.id, explain: `${w.word} = ${w.vi}`, choiceClass: 'ru-choice' });
    },
    viToRu(w, pool) {
      return mcq(`<div class="ja-q-mid">${esc(w.vi)}</div>`, w.word, distractors(w, pool, 'word', 3),
        { ask: 'Chọn từ tiếng Nga đúng nghĩa:', wordId: w.id, explain: `${w.vi} = ${w.word} (${w.translit})`, choiceClass: 'ru-choice' });
    },
    type(w) {
      return { kind: 'type', prompt: `<div class="ja-q-mid">${esc(w.vi)}</div><div class="ja-q-sub">${esc(w.posLabel)}</div>`, expected: w.word,
        ask: 'Gõ từ tiếng Nga (chữ Kirin hoặc phiên âm Latinh):', wordId: w.id, audio: w.word, explain: `${w.vi} = ${w.word} (${w.translit})` };
    },
    gender(w) {
      const right = GENDER_CHOICES[w.gender];
      return mcq(`<div class="ja-q-big">${ru(w.word)}</div><div class="ja-q-sub">${esc(w.vi)}</div>`, right, Object.values(GENDER_CHOICES).filter(x => x !== right),
        { ask: 'Danh từ này thuộc giống nào?', wordId: w.id, audio: w.word, explain: `${w.word}: ${w.genderLabel}${w.pl ? ` · số nhiều ${w.pl}` : ''}` });
    },
    stress(w) {
      const all = stressVariants(w);
      const right = w.word.normalize('NFC');
      const wrong = all.map(x => x.normalize('NFC')).filter(x => x !== right).slice(0, 3);
      return mcq(`<div class="ja-q-mid">${esc(w.vi)}</div>`, right, wrong,
        { ask: 'Trọng âm của từ này rơi vào đâu?', wordId: w.id, audio: w.word, explain: `${w.word} (${w.translit})`, choiceClass: 'ru-choice' });
    },
    letter(x, pool, typed) {
      if (typed) {
        return { kind: 'type', prompt: `<div class="ja-q-giant ru-text">${esc(x.upper)} ${esc(x.lower)}</div>`, expected: x.latin, latinOnly: true,
          ask: 'Gõ cách đọc Latinh của chữ này:', audio: x.example, letterKey: x.lower, explain: `${x.upper} ${x.lower} = ${x.latin}, ${x.say}` };
      }
      const wrong = pick(pool.filter(y => y.latin !== x.latin), 3).map(y => y.latin);
      return mcq(`<div class="ja-q-giant ru-text">${esc(x.upper)} ${esc(x.lower)}</div>`, x.latin, Array.from(new Set(wrong)),
        { ask: 'Chữ này đọc là gì?', audio: x.example, letterKey: x.lower, explain: `${x.upper} ${x.lower} = ${x.latin}, ${x.say}. Ví dụ: ${x.example} (${x.exampleVi})` });
    },
    conj(w, form) {
      const res = core().conjugate(w, form);
      const tense = core().PAST.includes(form) ? 'quá khứ' : w.fut ? 'tương lai đơn' : 'hiện tại';
      return { kind: 'type', prompt: `<div class="ja-q-big">${ru(w.word)}</div><div class="ja-q-sub">${esc(w.vi)}</div>`,
        expected: res, ask: `Chia ${tense}, ngôi ${core().FORM_LABELS[form]}:`, wordId: w.id, audio: res,
        explain: `${w.word} → ${res}` };
    },
    caseDrill(d) {
      return mcq(`<div class="ja-q-mid">${ru(d.s.replace('___', '…'))}</div><div class="ja-q-sub">(${esc(d.base)}) · ${esc(d.vi)}</div>`, d.answer, d.wrong.slice(0, 3),
        { ask: 'Chọn dạng đúng để điền vào chỗ trống:', audio: d.s.replace('___', d.answer), explain: `${d.s.replace('___', d.answer)} · ${CASE_SHORT[d.case - 1]}`, choiceClass: 'ru-choice' });
    }
  };
  function wordQuestions(words, pool, n, types) {
    const list = pick(words, Math.min(n, words.length));
    return list.map((w, i) => {
      let t = types[i % types.length];
      if (t === 'gender' && !(w.pos === 'n' && GENDER_CHOICES[w.gender])) t = 'meaning';
      if (t === 'stress' && !canStress(w)) t = 'listen';
      if (t === 'type' && w.plain.length > 14) t = 'viToRu';
      return Q[t](w, pool);
    });
  }

  /* ---------- Bảng chữ ---------- */
  function letterGrid(list, active) {
    return `<div class="ru-letter-grid">${list.map(x => `<button type="button" class="ja-kana-cell ru-letter ${x.type === 'v' ? 'is-vowel' : x.type === 's' ? 'is-sign' : ''} ${active === x.lower ? 'active' : ''}" data-act="letter-detail" data-char="${esc(x.lower)}">
      <span class="ru-text">${esc(x.upper)}${esc(x.lower)}</span><small>${esc(x.latin)}</small></button>`).join('')}</div>`;
  }
  function findLetter(ch) { return data().letters.find(x => x.lower === ch || x.upper === ch); }
  function letterDetail(ch) {
    const x = findLetter(ch);
    if (!x) return '';
    const typeLabel = x.type === 'v' ? 'Nguyên âm' : x.type === 's' ? 'Dấu (không đọc)' : 'Phụ âm';
    return `<div class="ja-card ja-kana-detail">
      <div class="ja-kana-detail-top">
        <div class="ja-kana-giant ru-text">${esc(x.upper)}${esc(x.lower)}</div>
        <div>
          <div class="ja-kana-romaji">${esc(x.latin)} <span class="ja-small ja-muted">[${esc(x.ipa)}]</span></div>
          <div class="ja-small">${esc(typeLabel)}</div>
          <div class="ja-actions">${speakBtn(x.example, 'Nghe từ ví dụ')}<a class="ja-btn ja-btn-ghost" href="#ru/writing?char=${encodeURIComponent(x.lower)}">${ic('pen')} Tập viết</a></div>
        </div>
      </div>
      <p><strong>Cách đọc:</strong> ${esc(x.say)}</p>
      <p class="ja-muted"><strong>Mẹo nhớ:</strong> ${esc(x.tip)}</p>
      <div class="ja-chip-row"><button type="button" class="ja-chip" data-act="speak" data-text="${esc(x.example)}">${ru(x.example)} ${esc(core().translit(x.example))} · ${esc(x.exampleVi)}</button></div>
    </div>`;
  }
  function renderRules(idx) {
    const rules = data().rules;
    const list = idx ? idx.map(i => rules[i]).filter(Boolean) : rules;
    return list.map(r => `<div class="ja-card"><h3>${esc(r.title)}</h3><p>${esc(r.desc)}</p><ul class="ja-rule-list">${r.items.map(it => `<li>${esc(it)}</li>`).join('')}</ul></div>`).join('');
  }
  function keyboardMap() {
    const L = data().letters;
    const latin = ch => { const x = L.find(y => y.lower === ch); return x ? x.latin : ''; };
    return `<div class="ru-kbd" aria-label="Bàn phím tiếng Nga ЙЦУКЕН">${KEY_ROWS.map(row => `<div class="ru-kbd-row">${Array.from(row).map(ch => `<button type="button" class="ru-key" data-act="speak" data-text="${esc(ch)}"><span class="ru-text">${esc(ch)}</span><small>${esc(latin(ch))}</small></button>`).join('')}</div>`).join('')}</div>`;
  }
  function screenKeys() {
    return `<div class="ru-kbd ru-kbd-mini" aria-label="Bàn phím Kirin trên màn hình">${KEY_ROWS.map(row => `<div class="ru-kbd-row">${Array.from(row).map(ch => `<button type="button" class="ru-key" data-act="key-insert" data-ch="${esc(ch)}" tabindex="-1">${esc(ch)}</button>`).join('')}</div>`).join('')}
      <div class="ru-kbd-row"><button type="button" class="ru-key ru-key-wide" data-act="key-insert" data-ch=" " tabindex="-1">cách</button><button type="button" class="ru-key ru-key-wide" data-act="key-back" tabindex="-1">${ic('arrow-left', { size: 14 })} xóa</button></div></div>`;
  }

  /* ---------- Vẽ khung trang ---------- */
  function hero(title, sub, side) {
    return `<header class="ja-hero ru-hero"><div><p class="ja-eyebrow">Русский язык · Tiếng Nga</p><h1 class="ja-title">${esc(title)}</h1>${sub ? `<p class="ja-sub">${esc(sub)}</p>` : ''}</div>${side || ''}</header>`;
  }

  const RuStudio = {
    SECTIONS,
    el: null,
    section: 'home',
    state: {},
    quiz: null,

    show(el, section, params) {
      if (!el || !window.RuCore) return;
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
      try { el.scrollIntoView({ block: 'start' }); window.scrollTo(0, 0); } catch (e) { /* bỏ qua */ }
    },
    hide() {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    },
    render() {
      const fn = this['render_' + this.section] || this.render_home;
      this.el.innerHTML = `<div class="ja-wrap ru-wrap">${fn.call(this)}</div>`;
      if (this.afterRender) { const f = this.afterRender; this.afterRender = null; f(); }
    },

    /* ===== Tổng quan ===== */
    render_home() {
      const d = data();
      const p = getProgress();
      const done = d.lessons.filter(l => p.lessons[l.id] && p.lessons[l.id].completed).length;
      const nx = nextLesson();
      const due = dueIds().length;
      const nouns = d.words.filter(w => w.ex && w.pos !== 'exp');
      const wod = nouns[Math.floor(Date.now() / 86400000) % nouns.length];
      const cards = [
        ['cyrillic', 'languages', 'Bảng chữ Kirin', '33 chữ, "bạn giả", trọng âm, bàn phím'],
        ['learn', 'map', 'Lộ trình 35 bài', '6 bài chữ cái và 29 bài A1'],
        ['vocab', 'book-open', 'Từ vựng A1', `${d.words.length} từ có trọng âm, giống, câu ví dụ`],
        ['cases', 'layers', '6 cách', 'Bảng biến cách, đại từ, tính từ, luyện điền'],
        ['flashcards', 'cards', 'Thẻ ghi nhớ', due ? `${due} thẻ đến hạn ôn hôm nay` : 'Ôn ngắt quãng SM-2'],
        ['writing', 'pen', 'Tập viết', 'Viết chữ in hoa, in thường theo mẫu'],
        ['typing', 'keyboard', 'Luyện gõ', 'Gõ phiên âm ra chữ Kirin, chia động từ'],
        ['quiz', 'target', 'Kiểm tra', 'Nghĩa, nghe, giống, trọng âm, cách'],
        ['talk', 'mic', 'Luyện nói', 'Nói từng từ, nhập vai, đóng vai A–B'],
        ['dialogues', 'chat', 'Hội thoại', '10 bài hội thoại đời thường A1']
      ];
      return `${hero('Tiếng Nga cho người Việt', 'Từ bảng chữ Kirin đến trình độ A1 (ТРКИ), từng bài nhỏ mỗi ngày. Mỗi từ đều đánh dấu trọng âm và có phiên âm Latinh.',
        `<div class="ja-hero-seal ru-seal ru-text" aria-hidden="true">Я</div>`)}
        <section class="ja-grid-2">
          <div class="ja-card ja-next">
            <p class="ja-eyebrow">Bài tiếp theo</p>
            <h2>Bài ${nx.no}: ${esc(nx.title)}</h2>
            <p class="ja-muted">${esc(nx.goal)}</p>
            <div class="ja-progress"><span style="width:${Math.round(done / d.lessons.length * 100)}%"></span></div>
            <p class="ja-small">Đã xong ${done}/${d.lessons.length} bài · Đã thuộc ${learnedCount()} từ</p>
            <a class="ja-btn ja-btn-primary" href="#ru/learn?lesson=${nx.id}">${ic('play')} Học ngay</a>
          </div>
          <div class="ja-card ja-wod">
            <p class="ja-eyebrow">Từ của ngày</p>
            <div class="ja-wod-word">${ru(wod.word)} ${speakBtn(wod.word)}</div>
            <p><strong>${esc(wod.vi)}</strong> · ${esc(wod.translit)}</p>
            ${wod.ex ? `<p class="ja-ex">${ru(wod.ex.ru)}<br><span class="ja-muted">${esc(wod.ex.vi)}</span></p>` : ''}
          </div>
        </section>
        <section class="ja-feature-grid">
          ${cards.map(c => `<a class="ja-feature" href="#ru/${c[0]}"><span class="ja-feature-icon">${ic(c[1], { size: 22 })}</span><span><strong>${c[2]}</strong><small>${esc(c[3])}</small></span></a>`).join('')}
        </section>
        <section class="ja-card ja-tip">
          <h3>${ic('lightbulb')} Ba điều người Việt cần để ý</h3>
          <p><strong>Trọng âm:</strong> mỗi từ có một âm tiết đọc mạnh (dấu ́ trong PolyLingo). Nguyên âm không có trọng âm đọc nhẹ đi: молоко́ đọc "ma-la-kô".</p>
          <p><strong>Giống và cách:</strong> danh từ có 3 giống, đổi đuôi theo 6 cách. Học từ nào nhớ luôn giống của từ đó.</p>
          <p><strong>Cụm phụ âm:</strong> đọc liền, đừng chèn thêm "ơ": встре́ча là "fstrê-cha", không phải "vơ-xơ-tre-cha".</p>
          <p class="ja-small ja-muted">Cách học tham khảo khung ТРКИ A1 và các trang dạy tiếng Nga uy tín (học chữ theo nhóm, từ đi kèm trọng âm, ôn ngắt quãng). Nội dung do PolyLingo tự soạn.</p>
        </section>`;
    },

    /* ===== Bảng chữ Kirin ===== */
    render_cyrillic() {
      const d = data();
      const tab = this.state.alphaTab || 'all';
      const tabs = [['all', 'Bảng 33 chữ'], ['friends', 'Chữ quen và "bạn giả"'], ['rules', 'Quy tắc phát âm'], ['keyboard', 'Bàn phím'], ['drill', 'Luyện nhận chữ']];
      let body = '';
      if (tab === 'all') {
        const active = this.state.letter && findLetter(this.state.letter) ? this.state.letter : 'а';
        body = `<div class="ja-grid-2 ja-kana-layout"><div class="ja-card">${letterGrid(d.letters, active)}
          <p class="ja-small ja-muted">Ô đậm là nguyên âm, ô gạch là dấu mềm, dấu cứng. Bấm để nghe từ ví dụ.</p></div><div>${letterDetail(active)}</div></div>`;
      } else if (tab === 'friends') {
        const g1 = d.letters.filter(x => x.group === 1);
        const same = g1.filter(x => !/Bạn giả/.test(x.tip));
        const fake = g1.filter(x => /Bạn giả/.test(x.tip));
        body = `<div class="ja-grid-2"><div class="ja-card"><h3>Đọc như chữ Latinh</h3>${letterGrid(same)}<p class="ja-muted">${same.map(x => x.upper).join(', ')}: nhìn sao đọc vậy (О không trọng âm đọc gần "a").</p></div>
          <div class="ja-card"><h3>"Bạn giả": trông quen, đọc khác</h3>${fake.map(x => `<div class="ja-confuse"><span class="ja-kana-mid ru-text">${esc(x.upper)}${esc(x.lower)}</span><div><strong>${esc(x.latin)}</strong><p>${esc(x.tip)}</p><p class="ja-muted">${ru(x.example)} · ${esc(x.exampleVi)}</p></div></div>`).join('')}</div></div>`;
      } else if (tab === 'rules') {
        body = renderRules();
      } else if (tab === 'keyboard') {
        body = `<div class="ja-card"><h3>Bàn phím tiếng Nga ЙЦУКЕН</h3><p class="ja-muted">Trên Windows: Cài đặt › Thời gian và ngôn ngữ › Thêm ngôn ngữ Русский, rồi chuyển bằng Win + Cách. Trên điện thoại: thêm bàn phím Tiếng Nga. Nếu chưa cài, ở mục Luyện gõ bạn có thể gõ phiên âm Latinh (privet → привет) hoặc bấm bàn phím trên màn hình.</p>${keyboardMap()}</div>`;
      } else {
        body = this.letterDrillSetup();
      }
      return `${hero('Bảng chữ Kirin', '33 chữ: 10 nguyên âm, 21 phụ âm và 2 dấu. Học theo 4 nhóm, bấm vào chữ để xem cách đọc và mẹo nhớ.')}
        <nav class="ja-tabs" role="tablist">${tabs.map(t => `<button type="button" role="tab" aria-selected="${tab === t[0]}" class="ja-tab ${tab === t[0] ? 'active' : ''}" data-act="alpha-tab" data-tab="${t[0]}">${t[1]}</button>`).join('')}</nav>
        <div class="ja-quiz-host">${body}</div>`;
    },
    letterDrillSetup() {
      const groups = this.state.drillGroups || [1, 2];
      const stats = store.get(KEYS.letters, {});
      const weak = Object.keys(stats).filter(k => stats[k].fail > stats[k].ok);
      const names = { 1: 'Nhóm 1: chữ quen', 2: 'Nhóm 2: chữ riêng', 3: 'Nhóm 3: âm xuýt', 4: 'Nhóm 4: nguyên âm mềm, dấu' };
      return `<div class="ja-card">
        <h3>Luyện nhận chữ</h3>
        <div class="ja-field"><span>Chọn nhóm</span><div class="ja-chip-row">${[1, 2, 3, 4].map(g => `<button type="button" class="ja-chip ${groups.includes(g) ? 'on' : ''}" data-act="drill-group" data-group="${g}">${names[g]}</button>`).join('')}</div></div>
        <div class="ja-actions">
          <button type="button" class="ja-btn ja-btn-primary" data-act="drill-start" data-mode="mcq">${ic('target')} Chọn đáp án</button>
          <button type="button" class="ja-btn" data-act="drill-start" data-mode="type">${ic('keyboard')} Gõ phiên âm</button>
          ${weak.length ? `<button type="button" class="ja-btn ja-btn-ghost" data-act="drill-start" data-mode="weak">${ic('refresh')} Ôn ${weak.length} chữ hay sai</button>` : ''}
        </div>
      </div>`;
    },
    startLetterDrill(mode) {
      const d = data();
      const groups = this.state.drillGroups || [1, 2];
      let pool = d.letters.filter(x => groups.includes(x.group));
      if (mode === 'weak') {
        const stats = store.get(KEYS.letters, {});
        pool = d.letters.filter(x => stats[x.lower] && stats[x.lower].fail > stats[x.lower].ok);
      }
      if (!pool.length) { toast('Hãy chọn ít nhất một nhóm chữ.', 'warning'); return; }
      const big = pool.length >= 4 ? pool : d.letters;
      const qs = pick(pool, Math.min(15, Math.max(10, pool.length))).map(x => Q.letter(x, big, mode === 'type' && x.type !== 's'));
      this.startQuiz(qs, { title: 'Luyện nhận chữ', host: '.ja-quiz-host' });
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
            return `<a class="ja-lesson ${r.completed ? 'done' : ''} ${nx.id === l.id ? 'next' : ''} ${l.checkpoint ? 'checkpoint' : ''}" href="#ru/learn?lesson=${l.id}">
              <span class="ja-lesson-no">${l.no}</span>
              <span class="ja-lesson-body"><strong>${esc(l.title)}</strong><small>${esc(l.goal)}</small>
              <span class="ja-lesson-meta">${l.stage === 'alpha' ? 'Chữ cái và phát âm' : `${l.wordIds.length} từ`}${l.checkpoint ? ' · Kiểm tra chặng' : ''}</span></span>
              <span class="ja-stars" aria-label="${stars} sao">${[1, 2, 3].map(i => ic(i <= stars ? 'star-filled' : 'star', { size: 14 })).join('')}</span>
              ${nx.id === l.id ? '<span class="ja-badge">Học tiếp</span>' : ''}
            </a>`;
          }).join('')}
        </div></section>`;
      }).join('');
      return `${hero('Lộ trình Nhập môn và A1', '35 bài: 6 bài chữ cái và phát âm, 29 bài theo khung ТРКИ A1. Mỗi bài cần đạt 60% (bài kiểm tra chặng cần 80%) để tính là xong.')}${stages}`;
    },
    renderLesson(l) {
      const step = this.state.lessonStep && this.state.lessonFor === l.id ? this.state.lessonStep : 'learn';
      const d = data();
      const words = l.wordIds.map(id => d.wordMap[id]).filter(Boolean);
      const isAlpha = l.stage === 'alpha';
      const steps = isAlpha
        ? [['learn', 'Chữ cái'], ['practice', l.checkpoint ? 'Kiểm tra chặng' : 'Luyện tập']]
        : [['learn', 'Từ vựng'], ['grammar', 'Ngữ pháp'], ['practice', l.checkpoint ? 'Kiểm tra chặng' : 'Luyện tập']];
      const r = getProgress().lessons[l.id] || {};
      let body = '';
      if (step === 'learn' && isAlpha) {
        const list = l.letters || [];
        const active = this.state.letter && list.find(x => x.lower === this.state.letter) ? this.state.letter : list[0] && list[0].lower;
        body = `${l.alpha.rules ? renderRules(l.alpha.rules) : ''}<div class="ja-grid-2 ja-kana-layout"><div class="ja-card">${letterGrid(list, active)}</div><div>${letterDetail(active)}</div></div>`;
      } else if (step === 'learn') {
        body = `<div class="ja-actions"><button type="button" class="ja-btn" data-act="play-all" data-lesson="${l.id}">${ic('play')} Nghe tất cả</button>
          <button type="button" class="ja-btn ja-btn-ghost" data-act="deck-add" data-lesson="${l.id}">${ic('plus')} Thêm ${words.length} từ vào thẻ ghi nhớ</button></div>
          <div class="ja-word-list">${words.map(w => this.wordCard(w)).join('')}</div>`;
      } else if (step === 'grammar') {
        body = (l.grammar || []).map(g => `<div class="ja-card ja-grammar"><h3>${ru(g.p)}</h3><p>${esc(g.vi)}</p>
          ${(g.ex || []).map(e => `<div class="ja-ex-row">${speakBtn(e[0])}<div><div>${ru(e[0])}</div><div class="ja-muted">${esc(e[1])}</div></div></div>`).join('')}</div>`).join('');
      } else {
        body = `<div class="ja-card"><p>${l.checkpoint ? 'Kiểm tra chặng gồm câu hỏi của các bài gần nhất, cần đạt <strong>80%</strong>.' : 'Làm 10 câu hỏi về bài này, cần đạt <strong>60%</strong>. Sao: 60% một sao, 75% hai sao, 90% ba sao.'}</p>
          ${r.best ? `<p class="ja-muted">Điểm cao nhất: ${r.best}%</p>` : ''}
          <button type="button" class="ja-btn ja-btn-primary" data-act="lesson-quiz" data-lesson="${l.id}">${ic('play')} Bắt đầu</button></div>`;
      }
      const idx = d.lessons.indexOf(l);
      const prev = d.lessons[idx - 1];
      const next = d.lessons[idx + 1];
      return `<a class="ja-back" href="#ru/learn">${ic('arrow-left')} Lộ trình</a>
        ${hero(`Bài ${l.no}: ${l.title}`, `Mục tiêu: ${l.goal}`, `<div class="ja-stars ja-stars-lg">${[1, 2, 3].map(i => ic(i <= (r.stars || 0) ? 'star-filled' : 'star', { size: 22 })).join('')}</div>`)}
        <nav class="ja-tabs" role="tablist">${steps.map((s, i) => `<button type="button" role="tab" aria-selected="${step === s[0]}" class="ja-tab ${step === s[0] ? 'active' : ''}" data-act="lesson-step" data-step="${s[0]}" data-lesson="${l.id}">${i + 1}. ${s[1]}</button>`).join('')}</nav>
        <div class="ja-quiz-host">${body}</div>
        <div class="ja-lesson-nav">${prev ? `<a class="ja-btn ja-btn-ghost" href="#ru/learn?lesson=${prev.id}">${ic('chevron-left')} Bài ${prev.no}</a>` : '<span></span>'}${next ? `<a class="ja-btn ja-btn-ghost" href="#ru/learn?lesson=${next.id}">Bài ${next.no} ${ic('chevron-right')}</a>` : ''}</div>`;
    },
    startLessonQuiz(l) {
      const d = data();
      let qs;
      if (l.stage === 'alpha') {
        const pool = l.letters || d.letters;
        qs = pick(pool, 10).map((x, i) => Q.letter(x, pool.length >= 4 ? pool : d.letters, i % 3 === 2 && x.type !== 's'));
        if (l.no >= 5) {
          const stressWords = d.words.filter(w => w.lesson <= 9 && canStress(w));
          pick(stressWords, 4).forEach(w => qs.push(Q.stress(w)));
          qs = shuffle(qs);
        }
      } else {
        const range = l.checkpoint ? d.lessons.filter(x => x.stage !== 'alpha' && x.no <= l.no && x.no > l.no - 5) : [l];
        const ids = Array.from(new Set(range.flatMap(x => x.wordIds)));
        const words = ids.map(id => d.wordMap[id]).filter(Boolean);
        qs = wordQuestions(words, d.words, l.checkpoint ? 15 : 10, ['meaning', 'listen', 'viToRu', 'gender', 'stress', 'type']);
        const drills = d.caseDrills.filter(x => (d.cases.find(c => c.no === x.case) || {}).lesson <= l.no);
        if (l.no >= 14 && drills.length) { pick(drills, 2).forEach(x => qs.push(Q.caseDrill(x))); qs = shuffle(qs); }
      }
      this.startQuiz(qs, {
        title: `Bài ${l.no}`, host: '.ja-quiz-host',
        onFinish: (pct) => {
          const res = saveLessonResult(l.id, pct, !!l.checkpoint);
          if (l.stage !== 'alpha') addToDeck(l.wordIds);
          return res.passed ? `Đạt ${res.stars} sao.${l.stage !== 'alpha' ? ' Từ của bài đã vào thẻ ghi nhớ.' : ''}` : `Cần ${res.need}% để qua bài. Học lại rồi thử lần nữa nhé.`;
        }
      });
    },
    wordCard(w) {
      let extra = '';
      if (w.pos === 'n') extra = [w.genderLabel, w.animate ? 'chỉ người/con vật' : '', w.pl ? `số nhiều: <span class="ru-text">${esc(w.pl)}</span>` : ''].filter(Boolean).join(' · ');
      else if (w.pos === 'v') {
        const p = core().presentForms(w);
        const past = core().pastForms(w);
        extra = p ? `${w.fut ? 'Tương lai' : 'Hiện tại'}: <span class="ru-text">я ${esc(p[0])}, ты ${esc(p[1])}, они ${esc(p[5])}</span>${w.group ? ` · nhóm ${esc(w.group)}` : ''}${past ? ` · Quá khứ: <span class="ru-text">${esc(past[0])}, ${esc(past[1])}</span>` : ''}` : '';
      } else if (w.pos === 'adj') {
        const a = core().adjForms(w);
        if (a) extra = `<span class="ru-text">${esc(a.m)} · ${esc(a.f)} · ${esc(a.n)} · ${esc(a.pl)}</span>`;
      }
      return `<article class="ja-word">
        <div class="ja-word-main">${ru(w.word)} ${speakBtn(w.word)}</div>
        <div class="ja-word-info">
          <div><strong>${esc(w.vi)}</strong> <span class="ja-pos">${esc(w.posLabel)}</span></div>
          <div class="ja-small ja-muted">${esc(w.translit)}</div>
          ${extra ? `<div class="ja-small">${extra}</div>` : ''}
          ${w.ex ? `<div class="ja-ex-row ja-small">${speakBtn(w.ex.ru, 'Nghe câu ví dụ')}<div>${ru(w.ex.ru)}<br><span class="ja-muted">${esc(w.ex.vi)}</span></div></div>` : ''}
        </div>
      </article>`;
    },

    /* ===== Từ vựng ===== */
    render_vocab() {
      const d = data();
      const st = this.state.vocab || (this.state.vocab = { lesson: '', pos: '', q: '' });
      const lessons = d.lessons.filter(l => l.stage !== 'alpha');
      return `${hero(`Từ vựng A1 · ${d.words.length} từ`, 'Lọc theo bài, theo từ loại hoặc tìm bằng tiếng Việt, chữ Kirin, phiên âm Latinh. Dấu ́ chỉ trọng âm.')}
        <div class="ja-card ja-filters">
          <label class="ja-field"><span>Bài</span><select data-act="vocab-filter" data-key="lesson"><option value="">Tất cả bài</option>${lessons.map(l => `<option value="${l.no}" ${String(st.lesson) === String(l.no) ? 'selected' : ''}>Bài ${l.no}: ${esc(l.title)}</option>`).join('')}</select></label>
          <label class="ja-field"><span>Từ loại</span><select data-act="vocab-filter" data-key="pos"><option value="">Tất cả</option>${Object.entries(core().POS_LABELS).map(([k, v]) => `<option value="${k}" ${st.pos === k ? 'selected' : ''}>${esc(v)}</option>`).join('')}</select></label>
          <label class="ja-field ja-field-grow"><span>Tìm</span><input type="search" data-act="vocab-search" value="${esc(st.q)}" placeholder="vd: nhà, дом, dom"></label>
        </div>
        <div id="ru-vocab-results">${this.vocabResults()}</div>`;
    },
    vocabResults() {
      const d = data();
      const st = this.state.vocab;
      const q = (st.q || '').trim().toLowerCase();
      const qCyr = q && !core().isCyrillic(q) ? core().plainKey(core().latinToCyr(q)) : core().plainKey(q);
      let list = d.words.filter(w =>
        (!st.lesson || w.lesson === Number(st.lesson) || w.reviewIn.includes(Number(st.lesson))) &&
        (!st.pos || w.pos === st.pos) &&
        (!q || w.vi.toLowerCase().includes(q) || core().plainKey(w.plain).includes(qCyr) || core().stripStress(w.translit).toLowerCase().normalize('NFD').replace(/́/g, '').includes(q)));
      const total = list.length;
      const limit = this.state.vocabLimit || 60;
      list = list.slice(0, limit);
      return `<p class="ja-small ja-muted">${total} từ</p><div class="ja-word-list">${list.map(w => this.wordCard(w)).join('')}</div>
        ${total > limit ? `<div class="ja-center"><button type="button" class="ja-btn" data-act="vocab-more">Xem thêm ${Math.min(60, total - limit)} từ</button></div>` : ''}`;
    },

    /* ===== 6 cách ===== */
    render_cases() {
      const d = data();
      const tab = this.state.caseTab || 'overview';
      const tabs = [['overview', '6 cách'], ['nouns', 'Bảng danh từ'], ['pronouns', 'Đại từ'], ['adj', 'Tính từ'], ['drill', 'Luyện điền']];
      let body = '';
      if (tab === 'overview') {
        body = `<div class="ja-grid-2 ru-case-grid">${d.cases.map(c => `<div class="ja-card ru-case-card"><p class="ja-eyebrow">Cách ${c.no} · học ở bài ${c.lesson}</p><h3>${esc(c.vi)}</h3>
          <p class="ru-text ja-small">${esc(c.name)} · ${esc(c.q)}</p>
          <ul class="ja-rule-list">${c.use.map(u => `<li>${esc(u)}</li>`).join('')}</ul>
          <p class="ja-small"><strong>Đuôi:</strong> ${esc(c.endings)}</p>
          ${c.ex.map(e => `<div class="ja-ex-row ja-small">${speakBtn(e[0])}<div>${ru(e[0])}<br><span class="ja-muted">${esc(e[1])}</span></div></div>`).join('')}</div>`).join('')}</div>`;
      } else if (tab === 'nouns') {
        body = `<div class="ja-card ru-table-wrap"><table class="ru-table"><thead><tr><th scope="col">Từ</th>${CASE_SHORT.map(c => `<th scope="col">${c}</th>`).join('')}</tr></thead><tbody>
          ${d.declensions.map(n => `<tr><th scope="row">${ru(n.word)}<small>${esc(n.vi)} · ${esc(n.type)}</small></th>${n.forms.map(f => `<td>${ru(f)}</td>`).join('')}</tr>`).join('')}
          </tbody></table></div><p class="ja-small ja-muted">Cách 6 viết kèm giới từ о (об trước nguyên âm). Trọng âm có thể dịch chuyển khi biến cách, như стол → стола́.</p>`;
      } else if (tab === 'pronouns') {
        body = `<div class="ja-card ru-table-wrap"><table class="ru-table"><thead><tr><th scope="col">Đại từ</th>${CASE_SHORT.map(c => `<th scope="col">${c}</th>`).join('')}</tr></thead><tbody>
          ${d.pronouns.map(n => `<tr><th scope="row">${ru(n.word)}</th>${n.forms.map(f => `<td>${ru(f)}</td>`).join('')}</tr>`).join('')}
          </tbody></table></div><p class="ja-small ja-muted">Sau giới từ, он/она/они thêm н-: у него, к ней, с ними.</p>`;
      } else if (tab === 'adj') {
        const a = d.adjCases;
        body = a ? `<div class="ja-card ru-table-wrap"><h3>${ru(a.word)} · ${esc(a.vi)}</h3><table class="ru-table"><thead><tr><th scope="col">Cách</th>${a.cols.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>
          ${a.rows.map((r, i) => `<tr><th scope="row">${CASE_SHORT[i]}</th>${r.map(f => `<td>${ru(f)}</td>`).join('')}</tr>`).join('')}
          </tbody></table><p class="ja-small ja-muted">Cách 4 giống đực và số nhiều: chỉ đồ vật giữ như cách 1, chỉ người và con vật giống cách 2.</p></div>` : '';
      } else {
        body = `<div class="ja-card"><h3>Luyện điền đúng cách</h3><p class="ja-muted">${d.caseDrills.length} câu, mỗi lượt 10 câu. Chọn dạng đúng của từ trong ngoặc.</p>
          <div class="ja-chip-row">${[0, 2, 3, 4, 5, 6].map(n => `<button type="button" class="ja-chip ${(this.state.drillCase || 0) === n ? 'on' : ''}" data-act="case-filter" data-case="${n}">${n ? CASE_SHORT[n - 1] : 'Tất cả'}</button>`).join('')}</div>
          <div class="ja-actions"><button type="button" class="ja-btn ja-btn-primary" data-act="case-start">${ic('play')} Bắt đầu</button></div></div>`;
      }
      return `${hero('6 cách của danh từ', 'Danh từ, đại từ, tính từ đổi đuôi theo vai trò trong câu. Mỗi cách trả lời một câu hỏi riêng; học dần theo lộ trình.')}
        <nav class="ja-tabs" role="tablist">${tabs.map(t => `<button type="button" role="tab" aria-selected="${tab === t[0]}" class="ja-tab ${tab === t[0] ? 'active' : ''}" data-act="case-tab" data-tab="${t[0]}">${t[1]}</button>`).join('')}</nav>
        <div class="ja-quiz-host">${body}</div>`;
    },
    startCaseDrill() {
      const d = data();
      const c = this.state.drillCase || 0;
      const pool = d.caseDrills.filter(x => !c || x.case === c);
      this.startQuiz(pick(pool, Math.min(10, pool.length)).map(x => Q.caseDrill(x)), { title: 'Luyện điền', host: '.ja-quiz-host' });
    },

    /* ===== Thẻ ghi nhớ ===== */
    render_flashcards() {
      const fc = this.state.fc;
      if (fc && fc.queue && fc.idx < fc.queue.length) return this.flashcardView();
      const d = data();
      const due = dueIds();
      const deckSize = Object.keys(sm2Data()).length;
      const lessons = d.lessons.filter(l => l.stage !== 'alpha');
      const done = fc && fc.queue && fc.queue.length ? `<div class="ja-card ja-result"><h3>${ic('party-popper')} Xong lượt ôn</h3><p>Bạn đã ôn ${fc.queue.length} thẻ, nhớ ${fc.good}/${fc.queue.length}.</p></div>` : '';
      return `${hero('Thẻ ghi nhớ', 'Ôn ngắt quãng SM-2: thẻ nhớ tốt sẽ lâu mới gặp lại, thẻ quên sẽ quay lại sau 10 phút.')}
        ${done}
        <div class="ja-grid-2">
          <div class="ja-card"><h3>Ôn thẻ đến hạn</h3><p class="ja-big-num">${due.length}</p><p class="ja-muted">Trong bộ thẻ có ${deckSize} từ. Từ của bài học tự vào bộ thẻ khi bạn qua bài.</p>
            <button type="button" class="ja-btn ja-btn-primary" data-act="fc-start" data-scope="due" ${due.length ? '' : 'disabled'}>${ic('play')} Ôn ngay</button></div>
          <div class="ja-card"><h3>Học thẻ theo bài</h3>
            <label class="ja-field"><span>Bài</span><select id="ru-fc-lesson">${lessons.map(l => `<option value="${l.id}">Bài ${l.no}: ${esc(l.title)}</option>`).join('')}</select></label>
            <label class="ja-field"><span>Mặt trước</span><select id="ru-fc-mode"><option value="ru">Tiếng Nga → nghĩa</option><option value="vi">Nghĩa → tiếng Nga</option><option value="audio">Nghe → nghĩa</option></select></label>
            <button type="button" class="ja-btn" data-act="fc-start" data-scope="lesson">${ic('cards')} Bắt đầu</button></div>
        </div>`;
    },
    startFlashcards(scope) {
      const d = data();
      let ids = [];
      let mode = 'ru';
      if (scope === 'due') ids = shuffle(dueIds()).slice(0, 30);
      else {
        const sel = this.el.querySelector('#ru-fc-lesson');
        const m = this.el.querySelector('#ru-fc-mode');
        const l = d.lessons.find(x => x.id === (sel && sel.value));
        mode = (m && m.value) || 'ru';
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
        : fc.mode === 'audio' ? `<button type="button" class="ja-big-play" data-act="speak" data-text="${esc(w.word)}">${ic('volume', { size: 34 })}</button>`
          : `<div class="ja-q-big">${ru(w.word)}</div>`;
      if (fc.mode === 'audio' && !fc.flipped) this.afterRender = () => speak(w.word);
      return `${hero('Thẻ ghi nhớ', `Thẻ ${fc.idx + 1}/${fc.queue.length}`)}
        <div class="ja-progress"><span style="width:${Math.round(fc.idx / fc.queue.length * 100)}%"></span></div>
        <div class="ja-card ja-flash ${fc.flipped ? 'flipped' : ''}" data-act="fc-flip" role="button" tabindex="0" aria-label="Lật thẻ">
          ${front}
          ${fc.flipped ? `<div class="ja-flash-back">
            <div class="ja-q-big">${ru(w.word)} ${speakBtn(w.word)}</div>
            <p><strong>${esc(w.vi)}</strong> · ${esc(w.translit)}</p>
            ${w.genderLabel ? `<p class="ja-small">${esc(w.genderLabel)}${w.pl ? ` · số nhiều ${ru(w.pl)}` : ''}</p>` : ''}
            ${w.ex ? `<p class="ja-ex">${ru(w.ex.ru)}<br><span class="ja-muted">${esc(w.ex.vi)}</span></p>` : ''}
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
      const ch = this.params.get('char') || this.state.writeChar || 'а';
      const x = findLetter(ch) || d.letters[0];
      this.state.writeChar = x.lower;
      this.afterRender = () => this.setupCanvas();
      return `${hero('Tập viết chữ Kirin', 'Tô theo chữ mờ rồi tự viết. Viết chữ hoa và chữ thường, sau đó viết lại từ ví dụ.')}
        <div class="ja-grid-2 ja-write-layout">
          <div class="ja-card">
            <div class="ja-write-stage ru-write-stage">
              <div class="ru-write-guide ru-text" id="ru-write-guide" aria-hidden="true">${esc(x.upper)}${esc(x.lower)}</div>
              <canvas id="ru-write-canvas" class="ja-write-canvas" width="320" height="320" aria-label="Khung viết thử"></canvas>
            </div>
            <div class="ja-actions">
              <button type="button" class="ja-btn" data-act="write-clear">${ic('refresh')} Xóa nét</button>
              <label class="ja-check"><input type="checkbox" id="ru-write-guide-toggle" checked> Hiện chữ mờ</label>
            </div>
            <div class="ja-write-info">
              <div class="ja-kana-giant ru-text">${esc(x.upper)}${esc(x.lower)}</div>
              <div><div class="ja-hv-big">${esc(x.latin)}</div><div class="ja-small">${esc(x.say)}</div><div class="ja-small ja-muted">${ru(x.example)} · ${esc(x.exampleVi)}</div>${speakBtn(x.example)}</div>
            </div>
          </div>
          <div class="ja-card ja-write-picker">
            <h3>Chọn chữ</h3>
            <div class="ja-pick-grid">${d.letters.map(y => `<a class="ja-pick ${y.lower === x.lower ? 'active' : ''}" href="#ru/writing?char=${encodeURIComponent(y.lower)}"><span class="ru-text">${esc(y.upper)}${esc(y.lower)}</span></a>`).join('')}</div>
            <h3>Chữ viết tay khác chữ in</h3>
            <ul class="ja-rule-list ja-small">
              <li>т viết tay trông như chữ m Latinh.</li>
              <li>д viết tay trông như chữ g, có đuôi kéo xuống.</li>
              <li>и viết tay trông như chữ u; й thêm dấu cong phía trên.</li>
              <li>п viết tay trông như chữ n; г trông như s ngược.</li>
              <li>Chữ л, м, я viết tay bắt đầu bằng một móc nhỏ ở chân trái.</li>
            </ul>
          </div>
        </div>`;
    },
    setupCanvas() {
      const cv = this.el.querySelector('#ru-write-canvas');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const style = getComputedStyle(this.el);
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = (style.getPropertyValue('--accent') || '#1D4E9E').trim() || '#1D4E9E';
      let drawing = false;
      const pos = e => {
        const r = cv.getBoundingClientRect();
        return [(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height];
      };
      cv.onpointerdown = e => { drawing = true; const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y); e.preventDefault(); };
      cv.onpointermove = e => { if (!drawing) return; const [x, y] = pos(e); ctx.lineTo(x, y); ctx.stroke(); e.preventDefault(); };
      cv.onpointerup = cv.onpointerleave = () => { drawing = false; };
    },

    /* ===== Luyện gõ ===== */
    render_typing() {
      const stats = store.get(KEYS.typing, { total: 0, correct: 0, best: 0 });
      const d = data();
      const lessons = d.lessons.filter(l => l.stage !== 'alpha');
      const modes = [['word', 'Nghĩa → gõ từ'], ['copy', 'Chép lại từ'], ['listen', 'Nghe → gõ'], ['letter', 'Chữ Kirin → phiên âm'], ['conj', 'Chia động từ']];
      return `${hero('Luyện gõ tiếng Nga', 'Gõ bằng bàn phím tiếng Nga, bàn phím trên màn hình, hoặc gõ phiên âm Latinh để máy đổi sang chữ Kirin: privet → привет, zh → ж, sh → ш, ch → ч, ya → я, y → ы, \' → ь.')}
        <div class="ja-grid-2">
          <div class="ja-card">
            <label class="ja-field"><span>Chế độ</span><select id="ru-type-mode">${modes.map(m => `<option value="${m[0]}">${m[1]}</option>`).join('')}</select></label>
            <label class="ja-field"><span>Phạm vi từ</span><select id="ru-type-scope"><option value="all">Tất cả từ A1</option>${lessons.map(l => `<option value="${l.no}">Bài ${l.no}: ${esc(l.title)}</option>`).join('')}</select></label>
            <button type="button" class="ja-btn ja-btn-primary" data-act="type-start">${ic('keyboard')} Bắt đầu 15 câu</button>
          </div>
          <div class="ja-card"><h3>Thống kê</h3>
            <p>Đã gõ: <strong>${stats.total}</strong> · Đúng: <strong>${stats.total ? Math.round(stats.correct / stats.total * 100) : 0}%</strong> · Chuỗi đúng dài nhất: <strong>${stats.best}</strong></p>
            <p class="ja-small ja-muted">Không cần gõ dấu trọng âm. ё gõ là е cũng được tính đúng.</p>
          </div>
        </div>`;
    },
    startTyping() {
      const d = data();
      const mode = (this.el.querySelector('#ru-type-mode') || {}).value || 'word';
      const scope = (this.el.querySelector('#ru-type-scope') || {}).value || 'all';
      let words = scope === 'all' ? d.words : d.words.filter(w => w.lesson === Number(scope) || w.reviewIn.includes(Number(scope)));
      words = words.filter(w => w.plain.length <= 16);
      let qs;
      if (mode === 'letter') {
        const pool = d.letters.filter(x => x.type !== 's');
        qs = pick(pool, 15).map(x => Q.letter(x, pool, true));
      } else if (mode === 'conj') {
        let verbs = words.filter(w => w.pos === 'v' && core().presentForms(w));
        if (verbs.length < 5) verbs = d.words.filter(w => w.pos === 'v' && core().presentForms(w));
        const forms = ['ya', 'ty', 'on', 'my', 'vy', 'oni', 'pm', 'pf', 'pp'];
        qs = pick(verbs, 15).map((w, i) => Q.conj(w, forms[i % forms.length]));
      } else {
        qs = pick(words, 15).map(w => {
          const q = Q.type(w);
          if (mode === 'listen') { q.prompt = `<button type="button" class="ja-big-play" data-act="speak" data-text="${esc(w.word)}">${ic('volume', { size: 34 })}</button>`; q.autoplay = true; q.ask = 'Nghe rồi gõ lại từ:'; }
          if (mode === 'copy') { q.prompt = `<div class="ja-q-big">${ru(w.word)}</div><div class="ja-q-sub">${esc(w.vi)}</div>`; q.ask = 'Gõ lại từ này:'; }
          return q;
        });
      }
      this.startQuiz(qs, { title: 'Luyện gõ', host: '.ja-wrap', typingStats: true });
    },

    /* ===== Kiểm tra ===== */
    render_quiz() {
      const d = data();
      const lessons = d.lessons.filter(l => l.stage !== 'alpha');
      const wrongs = store.get(KEYS.wrongs, []).filter(id => d.wordMap[id]);
      return `${hero('Kiểm tra', 'Trắc nghiệm tổng hợp: nghĩa, nghe chọn từ, giống của danh từ, trọng âm và 6 cách. Câu sai được lưu để ôn lại.')}
        <div class="ja-grid-2">
          <div class="ja-card">
            <label class="ja-field"><span>Từ bài</span><select id="ru-quiz-from">${lessons.map(l => `<option value="${l.no}">Bài ${l.no}</option>`).join('')}</select></label>
            <label class="ja-field"><span>Đến bài</span><select id="ru-quiz-to">${lessons.map(l => `<option value="${l.no}" ${l.no === 35 ? 'selected' : ''}>Bài ${l.no}</option>`).join('')}</select></label>
            <label class="ja-field"><span>Số câu</span><select id="ru-quiz-n"><option>10</option><option selected>20</option><option>30</option></select></label>
            <div class="ja-field"><span>Dạng câu hỏi</span><div class="ja-chip-row">
              ${[['meaning', 'Nghĩa'], ['listen', 'Nghe'], ['viToRu', 'Việt → Nga'], ['gender', 'Giống'], ['stress', 'Trọng âm'], ['cases', '6 cách']].map(t => `<label class="ja-chip ja-chip-check"><input type="checkbox" class="ru-quiz-type" value="${t[0]}" checked> ${t[1]}</label>`).join('')}
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
      let caseQs = [];
      if (onlyWrongs) {
        words = store.get(KEYS.wrongs, []).map(id => d.wordMap[id]).filter(Boolean);
        n = Math.min(20, words.length); types = ['meaning', 'viToRu', 'listen'];
      } else {
        let a = Number(this.el.querySelector('#ru-quiz-from').value), b = Number(this.el.querySelector('#ru-quiz-to').value);
        if (a > b) [a, b] = [b, a];
        n = Number(this.el.querySelector('#ru-quiz-n').value) || 20;
        types = Array.from(this.el.querySelectorAll('.ru-quiz-type:checked')).map(x => x.value);
        if (!types.length) types = ['meaning'];
        words = d.words.filter(w => w.lesson >= a && w.lesson <= b);
        if (types.includes('cases')) {
          const drills = d.caseDrills.filter(x => (d.cases.find(c => c.no === x.case) || {}).lesson <= b);
          caseQs = pick(drills, Math.ceil(n * 0.2)).map(x => Q.caseDrill(x));
        }
      }
      const wordTypes = types.filter(t => t !== 'cases');
      let qs = wordTypes.length ? wordQuestions(words, d.words, n - caseQs.length, wordTypes) : [];
      qs = shuffle(qs.concat(caseQs));
      if (!qs.length) { toast('Không đủ từ trong phạm vi đã chọn.', 'warning'); return; }
      this.startQuiz(qs, {
        title: 'Kiểm tra', host: '.ja-wrap',
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
          : `<div class="ja-type-box"><input type="text" class="ja-type-input ru-type-input" id="ru-type-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${q.latinOnly ? 'vd: zh' : 'vd: privet hoặc привет'}" aria-label="Ô gõ đáp án">
              <div class="ja-type-preview ru-text" id="ru-type-preview" aria-live="polite"></div>
              <button type="button" class="ja-btn ja-btn-primary" data-act="quiz-submit">Kiểm tra</button></div>
              ${q.latinOnly ? '' : `<details class="ru-kbd-toggle"><summary>${ic('keyboard', { size: 14 })} Bàn phím Kirin trên màn hình</summary>${screenKeys()}</details>`}`}
        <div class="ja-feedback" id="ru-feedback" aria-live="assertive"></div>
      </div>`;
      if (q.autoplay && q.audio) setTimeout(() => speak(q.audio), 200);
      const inp = host.querySelector('#ru-type-input');
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
      if (q.letterKey) {
        const st = store.get(KEYS.letters, {});
        const s = st[q.letterKey] || { ok: 0, fail: 0 };
        ok ? s.ok++ : s.fail++;
        st[q.letterKey] = s;
        store.set(KEYS.letters, st);
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
        const inp = host.querySelector('#ru-type-input');
        if (inp) { inp.disabled = true; inp.classList.add(ok ? 'correct' : 'wrong'); }
      }
      if (q.audio && (ok || q.kind === 'type')) speak(q.audio);
      const fb = host.querySelector('#ru-feedback');
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
        ${wrongWords.length ? `<h4>Từ cần ôn</h4><div class="ja-chip-row">${wrongWords.map(w => `<button type="button" class="ja-chip" data-act="speak" data-text="${esc(w.word)}">${ru(w.word)} · ${esc(w.vi)}</button>`).join('')}</div>` : ''}
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
        case 'alpha-tab': this.state.alphaTab = t.dataset.tab; this.render(); break;
        case 'letter-detail': {
          this.state.letter = t.dataset.char;
          const x = findLetter(t.dataset.char);
          if (x) speak(x.example);
          if (this.quiz) break;
          this.render(); break;
        }
        case 'drill-group': {
          const g = Number(t.dataset.group);
          let gs = (this.state.drillGroups || [1, 2]).slice();
          gs = gs.includes(g) ? gs.filter(x => x !== g) : gs.concat(g);
          this.state.drillGroups = gs; this.render(); break;
        }
        case 'drill-start': this.startLetterDrill(t.dataset.mode); break;
        case 'case-tab': this.state.caseTab = t.dataset.tab; this.render(); break;
        case 'case-filter': this.state.drillCase = Number(t.dataset.case); this.render(); break;
        case 'case-start': this.startCaseDrill(); break;
        case 'lesson-step': this.state.lessonStep = t.dataset.step; this.state.lessonFor = t.dataset.lesson; this.render(); break;
        case 'lesson-quiz': { const l = d.lessons.find(x => x.id === t.dataset.lesson); if (l) this.startLessonQuiz(l); break; }
        case 'deck-add': { const l = d.lessons.find(x => x.id === t.dataset.lesson); const n = l ? addToDeck(l.wordIds) : 0; toast(n ? `Đã thêm ${n} từ vào thẻ ghi nhớ.` : 'Các từ này đã có trong thẻ ghi nhớ.', 'success'); break; }
        case 'play-all': {
          const l = d.lessons.find(x => x.id === t.dataset.lesson);
          if (l) speak(l.wordIds.map(id => d.wordMap[id] && d.wordMap[id].word).filter(Boolean).join(', '), 0.85);
          break;
        }
        case 'vocab-more': this.state.vocabLimit = (this.state.vocabLimit || 60) + 60; this.el.querySelector('#ru-vocab-results').innerHTML = this.vocabResults(); break;
        case 'fc-start': this.startFlashcards(t.dataset.scope); break;
        case 'fc-flip': if (!e.target.closest('button')) { this.state.fc.flipped = !this.state.fc.flipped; this.render(); } break;
        case 'fc-grade': this.gradeFlashcard(Number(t.dataset.grade)); break;
        case 'write-clear': { const cv = this.el.querySelector('#ru-write-canvas'); if (cv) cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); break; }
        case 'type-start': this.startTyping(); break;
        case 'quiz-start': this.startBigQuiz(false); break;
        case 'quiz-wrongs': this.startBigQuiz(true); break;
        case 'quiz-choose': { const q = this.quiz && this.quiz.qs[this.quiz.i]; if (q) this.answerQuiz(Number(t.dataset.i) === q.answer, Number(t.dataset.i)); break; }
        case 'quiz-submit': this.submitTyped(); break;
        case 'quiz-next': if (this.quiz) { this.quiz.i++; this.renderQuiz(); } break;
        case 'quiz-again': if (this.lastQuizQs) this.startQuiz(shuffle(this.lastQuizQs), this.lastQuizOpts); break;
        case 'quiz-quit': this.quiz = null; this.render(); break;
        case 'key-insert':
        case 'key-back': {
          const inp = this.el.querySelector('#ru-type-input');
          if (!inp || inp.disabled) break;
          if (act === 'key-back') inp.value = inp.value.slice(0, -1);
          else {
            // Đang gõ Latinh thì đổi phần đã gõ sang Kirin trước khi thêm chữ từ bàn phím.
            const base = /[a-z]/i.test(inp.value) ? RuCore.latinToCyr(inp.value) : inp.value;
            inp.value = base + t.dataset.ch;
          }
          inp.focus();
          this.updatePreview(inp);
          break;
        }
        default: break;
      }
    },
    submitTyped() {
      const z = this.quiz;
      if (!z || z.answered) return;
      const q = z.qs[z.i];
      const inp = this.el.querySelector('#ru-type-input');
      const val = inp ? inp.value : '';
      if (!val.trim()) return;
      let ok;
      if (q.latinOnly) {
        const v = val.trim().toLowerCase();
        ok = v === String(q.expected).toLowerCase() || (q.expected === 'y' && v === 'i') || (q.expected === 'kh' && (v === 'h' || v === 'x')) || (q.expected === "'" && v === '`');
      } else ok = core().answerMatches(q.expected, val);
      this.answerQuiz(!!ok);
    },
    updatePreview(inp) {
      const pv = this.el.querySelector('#ru-type-preview');
      const q = this.quiz && this.quiz.qs[this.quiz.i];
      if (pv) pv.textContent = q && !q.latinOnly && /[a-zA-Z']/.test(inp.value) ? core().latinToCyr(inp.value) : '';
    },
    onInput(e) {
      if (e.target.matches('[data-act="vocab-search"]')) {
        this.state.vocab.q = e.target.value;
        this.state.vocabLimit = 60;
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => { const r = this.el.querySelector('#ru-vocab-results'); if (r) r.innerHTML = this.vocabResults(); }, 150);
      } else if (e.target.id === 'ru-type-input') {
        this.updatePreview(e.target);
      }
    },
    onChange(e) {
      if (e.target.matches('[data-act="vocab-filter"]')) {
        this.state.vocab[e.target.dataset.key] = e.target.value;
        this.state.vocabLimit = 60;
        const r = this.el.querySelector('#ru-vocab-results');
        if (r) r.innerHTML = this.vocabResults();
      } else if (e.target.id === 'ru-write-guide-toggle') {
        const g = this.el.querySelector('#ru-write-guide');
        if (g) g.style.visibility = e.target.checked ? '' : 'hidden';
      }
    },
    onKey(e) {
      if (e.target.id === 'ru-type-input' && e.key === 'Enter') {
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

  // Phím tắt toàn trang cho thẻ ghi nhớ và trắc nghiệm (khi tiêu điểm không nằm trong khung tiếng Nga)
  if (typeof document !== 'undefined') {
    document.addEventListener('keydown', e => {
      if (!RuStudio.el || !RuStudio.el.classList.contains('active') || RuStudio.el.contains(e.target)) return;
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      RuStudio.onKey(e);
    });
  }

  if (typeof window !== 'undefined') window.RuStudio = RuStudio;
  if (typeof module !== 'undefined' && module.exports) module.exports = RuStudio;
})();
