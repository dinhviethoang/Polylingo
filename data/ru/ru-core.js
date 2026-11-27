/**
 * data/ru/ru-core.js — Lõi xử lý tiếng Nga dùng chung cho russian.js, talk.js, boost.js và bài kiểm thử.
 * 1. Trọng âm, chuẩn hóa, chuyển tự Kirin ↔ Latinh (gõ phiên âm ra chữ Kirin)
 * 2. Chia động từ (hiện tại hoặc tương lai đơn, quá khứ), đuôi tính từ
 * 3. So câu nói (luyện nói), SM-2
 * 4. Đọc dữ liệu data/ru/*.js và gom thành bài học
 */
(function () {
  'use strict';
  const ACUTE = '́';
  const VOWELS = 'аеёиоуыэюя';
  const HUSH = 'гкхжшчщ';

  /* ---------- 1. Chuẩn hóa và chuyển tự ---------- */
  const stripStress = s => String(s == null ? '' : s).replace(/[́̀]/g, '');
  const isCyrillic = s => /[Ѐ-ӿ]/.test(s);
  function plainKey(s) {
    return stripStress(s).toLowerCase().replace(/ё/g, 'е')
      .replace(/[.,!?…:;«»"“”()]/g, ' ').replace(/[—–]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  const looseKey = s => plainKey(s).replace(/[ьъ]/g, '').replace(/э/g, 'е').replace(/й/g, 'и').replace(/ы/g, 'и').replace(/-/g, ' ');
  function vowelCount(s) { return (stripStress(s).toLowerCase().match(/[аеёиоуыэюя]/g) || []).length; }

  const C2L = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: "'", э: 'e', ю: 'yu', я: 'ya' };
  /** Chuyển tự sang Latinh, giữ dấu trọng âm trên nguyên âm Latinh: молоко́ → molokó */
  function translit(s) {
    let out = '';
    const chars = Array.from(String(s || ''));
    chars.forEach((ch, i) => {
      if (ch === ACUTE) { out += ACUTE; return; }
      const low = ch.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(C2L, low)) {
        let t = C2L[low];
        // е ở đầu từ hoặc sau nguyên âm đọc "ye"
        if (low === 'е') { const prev = (chars[i - 1] || '').toLowerCase(); if (!prev || /[\s\-аеёиоуыэюяьъ]/.test(prev)) t = 'ye'; }
        out += ch !== low && t ? t[0].toUpperCase() + t.slice(1) : t;
      } else out += ch;
    });
    return out.normalize('NFC');
  }

  const L2C = [['shch', 'щ'], ['sch', 'щ'], ['zh', 'ж'], ['kh', 'х'], ['ts', 'ц'], ['ch', 'ч'], ['sh', 'ш'], ['yo', 'ё'], ['yu', 'ю'], ['ya', 'я'], ['ye', 'е'], ['jo', 'ё'], ['ju', 'ю'], ['ja', 'я'], ['je', 'е'], ["''", 'ъ'], ['eh', 'э']];
  const L1 = { a: 'а', b: 'б', v: 'в', w: 'в', g: 'г', d: 'д', z: 'з', i: 'и', j: 'й', k: 'к', l: 'л', m: 'м', n: 'н', o: 'о', p: 'п', r: 'р', s: 'с', t: 'т', u: 'у', f: 'ф', h: 'х', x: 'х', c: 'ц', "'": 'ь', '"': 'ъ', '`': 'ь' };
  /** Gõ phiên âm Latinh ra chữ Kirin: privet → привет, zdravstvuyte → здравствуйте, novyy → новый */
  function latinToCyr(input) {
    const s = String(input || '').toLowerCase();
    let out = '';
    let i = 0;
    while (i < s.length) {
      let hit = null;
      for (const [k, v] of L2C) { if (s.startsWith(k, i)) { hit = [k, v]; break; } }
      if (hit) { out += hit[1]; i += hit[0].length; continue; }
      const ch = s[i];
      const prev = out.slice(-1);
      if (ch === 'y') out += prev && VOWELS.includes(prev) ? 'й' : 'ы';
      else if (ch === 'e') out += !prev || /[\s\-]/.test(prev) ? 'э' : 'е';
      else out += L1[ch] !== undefined ? L1[ch] : ch;
      i++;
    }
    return out;
  }
  /** Đáp án gõ đúng không: nhận chữ Kirin (bỏ qua trọng âm, ё = е) hoặc phiên âm Latinh. */
  function answerMatches(expected, input) {
    const raw = String(input || '').trim();
    if (!raw) return false;
    const e = plainKey(expected);
    if (isCyrillic(raw)) return plainKey(raw) === e;
    const conv = latinToCyr(raw);
    return plainKey(conv) === e || looseKey(conv) === looseKey(expected);
  }

  /** So câu nói nghe được với câu mẫu theo từng chữ cái (luyện nói). */
  function compareText(target, heard) {
    const a = Array.from(plainKey(target).replace(/[\s-]/g, ''));
    const b = Array.from(plainKey(heard).replace(/[\s-]/g, ''));
    const n = a.length, m = b.length;
    if (!n) return { score: 0, perWord: [] };
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    const ok = new Array(n).fill(false);
    let i = n, j = m;
    while (i > 0 && j > 0) {
      if (a[i - 1] === b[j - 1]) { ok[i - 1] = true; i--; j--; }
      else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
      else j--;
    }
    const matched = dp[n][m];
    const extra = Math.max(0, m - matched);
    const score = Math.max(0, Math.min(100, Math.round(matched / n * 100 - extra / n * 30)));
    const heardWords = new Set(plainKey(heard).split(' '));
    const perWord = stripStress(target).split(/\s+/).filter(Boolean).map(w => ({ w, ok: heardWords.has(plainKey(w)) }));
    return { score, perWord, perChar: a.map((ch, k) => ({ ch, ok: ok[k] })) };
  }

  /* ---------- 2. Chia động từ và tính từ ---------- */
  const FORM_LABELS = { ya: 'я', ty: 'ты', on: 'он / она', my: 'мы', vy: 'вы', oni: 'они', pm: 'quá khứ, giống đực (он)', pf: 'quá khứ, giống cái (она)', pn: 'quá khứ, giống trung (оно)', pp: 'quá khứ, số nhiều (они)' };
  const PRESENT = ['ya', 'ty', 'on', 'my', 'vy', 'oni'];
  const PAST = ['pm', 'pf', 'pn', 'pp'];
  function presentForms(w) {
    const f = w.forms || [];
    if (f.length === 6) return f.slice();
    if (f.length !== 3) return null;
    const [ya, ty, oni] = f;
    const refl = /ся$/.test(ty);
    const base = refl ? ty.slice(0, -2) : ty;
    if (!/шь$/.test(base)) return null;
    const stem = base.slice(0, -2);
    const r = x => (refl ? x + (/[аеёиоуыэюя́]$/.test(x) ? 'сь' : 'ся') : x);
    return [ya, ty, r(stem + 'т'), r(stem + 'м'), r(stem + 'те'), oni];
  }
  function pastForms(w) {
    if (w.past && w.past.length === 4) return w.past.slice();
    const inf = w.word;
    const plain = stripStress(inf);
    let stem, ends;
    if (/ться$/.test(plain)) { stem = inf.replace(/ться$/, ''); ends = ['лся', 'лась', 'лось', 'лись']; }
    else if (/ть$/.test(plain)) { stem = inf.replace(/ть$/, ''); ends = ['л', 'ла', 'ло', 'ли']; }
    else return null;
    if (vowelCount(stem) <= 1) stem = stripStress(stem); // động từ một âm tiết: trọng âm quá khứ hay dịch chuyển, không đánh dấu
    return ends.map(e => stem + e);
  }
  function conjugate(w, form) {
    if (!w || w.pos !== 'v') return null;
    if (PRESENT.includes(form)) { const p = presentForms(w); return p ? p[PRESENT.indexOf(form)] : null; }
    if (PAST.includes(form)) { const p = pastForms(w); return p ? p[PAST.indexOf(form)] : null; }
    return form === 'inf' ? w.word : null;
  }
  function verbGroup(w) {
    const p = presentForms(w);
    if (!p) return '';
    if ((w.forms || []).length === 6) return 'bất quy tắc';
    return /ишь(ся)?$/.test(stripStress(p[1])) ? 'II' : 'I';
  }
  /** Đuôi tính từ: {m, f, n, pl} */
  function adjForms(w) {
    const word = w.word || w;
    const plain = stripStress(word);
    const end = plain.slice(-2);
    const stemPlain = plain.slice(0, -2);
    const last = stemPlain.slice(-1);
    if (end === 'ой') {
      const pl = HUSH.includes(last) ? 'и́е' : 'ы́е';
      return { m: word, f: stemPlain + 'а́я', n: stemPlain + 'о́е', pl: stemPlain + pl };
    }
    if (end !== 'ый' && end !== 'ий') return null;
    const stem = word.slice(0, word.length - 2);
    if (end === 'ый') return { m: word, f: stem + 'ая', n: stem + 'ое', pl: stem + 'ые' };
    if ('гкх'.includes(last)) return { m: word, f: stem + 'ая', n: stem + 'ое', pl: stem + 'ие' };
    if ('жшчщ'.includes(last)) return { m: word, f: stem + 'ая', n: stem + 'ее', pl: stem + 'ие' };
    return { m: word, f: stem + 'яя', n: stem + 'ее', pl: stem + 'ие' };
  }

  const POS_LABELS = { n: 'Danh từ', v: 'Động từ', adj: 'Tính từ', adv: 'Trạng từ', pron: 'Đại từ', num: 'Số từ', prep: 'Giới từ', conj: 'Liên từ', part: 'Tiểu từ', q: 'Từ để hỏi', exp: 'Cụm từ' };
  const GENDER_LABELS = { m: 'giống đực', f: 'giống cái', n: 'giống trung', pl: 'chỉ có số nhiều' };

  /* ---------- 3. SM-2 ---------- */
  function sm2(card, grade) {
    const c = Object.assign({ ef: 2.5, interval: 0, repetition: 0, due: 0 }, card || {});
    const q = Math.max(0, Math.min(5, grade));
    if (q < 3) { c.repetition = 0; c.interval = 0; }
    else {
      c.repetition += 1;
      c.interval = c.repetition === 1 ? 1 : c.repetition === 2 ? 3 : Math.round(c.interval * c.ef);
    }
    c.ef = Math.max(1.3, c.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    const now = Date.now();
    c.due = q < 3 ? now + 10 * 60 * 1000 : now + c.interval * 86400000;
    c.last = now;
    return c;
  }

  /* ---------- 4. Đọc dữ liệu ---------- */
  function parseAlphabetRaw(raw) {
    return String(raw || '').split('\n').map(l => l.trim()).filter(Boolean).map(l => {
      const f = l.split('|');
      const [upper, lower] = f[0].split(' ');
      return { upper, lower, latin: f[1], ipa: f[2], say: f[3], type: f[4], group: Number(f[5]), example: f[6], exampleVi: f[7], tip: f[8] };
    });
  }
  function parseWordsRaw(chunks) {
    const words = [];
    const map = {};
    const lessonTitles = {};
    let lesson = 0;
    (Array.isArray(chunks) ? chunks : [chunks]).join('\n').split('\n').forEach(line => {
      const l = line.trim();
      if (!l) return;
      const m = l.match(/^#L(\d+)\s*(.*)$/);
      if (m) { lesson = Number(m[1]); lessonTitles[lesson] = m[2]; return; }
      const f = l.split('|');
      const word = f[0].trim();
      const id = stripStress(word);
      if (map[id]) { if (!map[id].reviewIn.includes(lesson)) map[id].reviewIn.push(lesson); return; }
      const pos = f[2];
      const extra = (f[3] || '').split(';').map(x => x.trim()).filter(Boolean);
      const w = { id, word, plain: id, vi: f[1], pos, posLabel: POS_LABELS[pos] || pos, lesson, reviewIn: [], translit: translit(word) };
      if (pos === 'n' && extra.length) {
        const g = extra[0];
        w.animate = /a$/.test(g);
        w.gender = g.replace(/a$/, '');
        w.genderLabel = GENDER_LABELS[w.gender] || '';
      }
      extra.forEach(x => { if (/^pl=/.test(x)) w.pl = x.slice(3); });
      if (pos === 'v') {
        w.forms = (extra[0] || '').split(',').map(s => s.trim()).filter(Boolean);
        w.fut = extra.includes('fut');
        const past = extra.find(x => /^past=/.test(x));
        if (past) w.past = past.slice(5).split(',').map(s => s.trim());
        w.group = verbGroup(w);
      }
      if (f[4]) w.ex = { ru: f[4], vi: f[5] || '' };
      words.push(w);
      map[id] = w;
    });
    return { words, map, lessonTitles };
  }

  let cache = null;
  function load() {
    if (cache) return cache;
    const w = typeof window !== 'undefined' ? window : {};
    const letters = parseAlphabetRaw(w.RU_ALPHABET_RAW || '');
    const parsed = parseWordsRaw(w.RU_WORDS_RAW || []);
    const cur = w.RU_CURRICULUM || { lessons: [], stages: [] };
    const lessons = cur.lessons.map(l => {
      const ids = parsed.words.filter(x => x.lesson === l.no).map(x => x.id);
      parsed.words.forEach(x => { if (x.reviewIn.includes(l.no) && !ids.includes(x.id)) ids.push(x.id); });
      const stage = l.no <= 6 ? 'alpha' : 'a1';
      const out = Object.assign({}, l, { id: 'ru-l' + l.no, stage, wordIds: ids });
      if (l.alpha) out.letters = letters.filter(x => l.alpha.groups.includes(x.group));
      return out;
    });
    cache = {
      words: parsed.words, wordMap: parsed.map, letters, lessons, curriculum: cur,
      rules: w.RU_SOUND_RULES || [], cases: w.RU_CASES || [], declensions: w.RU_DECLENSIONS || [],
      pronouns: w.RU_PRONOUN_CASES || [], adjCases: w.RU_ADJ_CASES || null, caseDrills: w.RU_CASE_DRILLS || []
    };
    if (typeof window !== 'undefined') window.RU_WORDS = parsed.map;
    return cache;
  }
  function _reset() { cache = null; }

  const RuCore = {
    ACUTE, stripStress, plainKey, looseKey, isCyrillic, vowelCount, translit, latinToCyr, answerMatches, compareText,
    FORM_LABELS, PRESENT, PAST, presentForms, pastForms, conjugate, verbGroup, adjForms, POS_LABELS, GENDER_LABELS,
    sm2, parseAlphabetRaw, parseWordsRaw, load, _reset
  };
  if (typeof window !== 'undefined') window.RuCore = RuCore;
  if (typeof module !== 'undefined' && module.exports) module.exports = RuCore;
})();
