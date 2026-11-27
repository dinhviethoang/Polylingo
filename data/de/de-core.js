/**
 * data/de/de-core.js
 * Lõi xử lý tiếng Đức (không phụ thuộc giao diện, chạy được trong Node để test):
 *  - Chuẩn hóa câu trả lời: không phân biệt hoa thường, gõ ae/oe/ue/ss thay cho ä/ö/ü/ß
 *  - Đọc từ vựng (data/de/words-*.js), gán bài học, mạo từ, số nhiều
 *  - Chia động từ hiện tại (cả động từ tách, đổi nguyên âm) và Perfekt
 *  - So khớp lời nói theo từ (cho Luyện nói), SM-2 cho thẻ ghi nhớ
 * Xuất ra window.DeCore.
 */
if (typeof window === 'undefined') { global.window = global; }

(function () {
  'use strict';

  /* ---------- 1. Chuẩn hóa ---------- */
  const NUM_WORDS = {
    0: 'null', 1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf', 6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun', 10: 'zehn',
    11: 'elf', 12: 'zwölf', 13: 'dreizehn', 14: 'vierzehn', 15: 'fünfzehn', 16: 'sechzehn', 17: 'siebzehn', 18: 'achtzehn', 19: 'neunzehn',
    20: 'zwanzig', 21: 'einundzwanzig', 30: 'dreißig', 40: 'vierzig', 50: 'fünfzig', 100: 'hundert'
  };

  /** Đổi về dạng so sánh: chữ thường, ä→ae, ö→oe, ü→ue, ß→ss, bỏ dấu câu, gộp khoảng trắng. */
  function fold(s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[’']/g, '')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  /** Gõ thay thế kiểu bàn phím không có Umlaut: a: / a" → ä, s: → ß (dùng khi xem trước ô gõ). */
  function typeUmlauts(s) {
    return String(s || '').replace(/([aouAOU])[:"]/g, (m, v) => ({ a: 'ä', o: 'ö', u: 'ü', A: 'Ä', O: 'Ö', U: 'Ü' }[v])).replace(/s:/g, 'ß');
  }
  function answerMatches(expected, given) {
    const g = fold(typeUmlauts(given));
    if (!g) return false;
    const list = Array.isArray(expected) ? expected : [expected];
    return list.some(e => fold(e) === g);
  }

  /* ---------- 2. Từ loại, mạo từ ---------- */
  const POS_LABELS = {
    n: 'danh từ', v: 'động từ', adj: 'tính từ', adv: 'trạng từ', pron: 'đại từ', poss: 'từ sở hữu', art: 'mạo từ',
    prep: 'giới từ', num: 'số từ', q: 'từ để hỏi', conj: 'liên từ', exp: 'câu, cụm từ'
  };
  const GENDER = {
    der: { label: 'giống đực', short: 'm', css: 'der' },
    die: { label: 'giống cái', short: 'f', css: 'die' },
    das: { label: 'giống trung', short: 'n', css: 'das' },
    pl: { label: 'chỉ có số nhiều', short: 'pl', css: 'pl' }
  };

  /* ---------- 3. Chia động từ ---------- */
  const PERSONS = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'];
  const PERSON_LABELS = { ich: 'ich', du: 'du', er: 'er/sie/es', wir: 'wir', ihr: 'ihr', sie: 'sie/Sie' };
  const IRREG = {
    sein: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'],
    haben: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
    werden: ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'],
    wissen: ['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'],
    können: ['kann', 'kannst', 'kann', 'können', 'könnt', 'können'],
    müssen: ['muss', 'musst', 'muss', 'müssen', 'müsst', 'müssen'],
    dürfen: ['darf', 'darfst', 'darf', 'dürfen', 'dürft', 'dürfen'],
    sollen: ['soll', 'sollst', 'soll', 'sollen', 'sollt', 'sollen'],
    wollen: ['will', 'willst', 'will', 'wollen', 'wollt', 'wollen'],
    mögen: ['mag', 'magst', 'mag', 'mögen', 'mögt', 'mögen'],
    möchten: ['möchte', 'möchtest', 'möchte', 'möchten', 'möchtet', 'möchten'],
    tun: ['tue', 'tust', 'tut', 'tun', 'tut', 'tun']
  };
  const needsE = stem => /(t|d|[^aeiouäöülrmnh][mn])$/.test(stem);

  /** Chia hiện tại một động từ không tách. erForm: dạng ngôi er cho sẵn (để biết đổi nguyên âm). */
  function presentSimple(inf, erForm, duOverride) {
    if (IRREG[inf]) return IRREG[inf].slice();
    let stem;
    if (/e[lr]n$/.test(inf)) stem = inf.slice(0, -1);
    else if (inf.endsWith('en')) stem = inf.slice(0, -2);
    else if (inf.endsWith('n')) stem = inf.slice(0, -1);
    else stem = inf;
    const e = needsE(stem) ? 'e' : '';
    const regEr = stem + e + 't';
    let du = /[sßzx]$/.test(stem) ? stem + 't' : stem + e + 'st';
    let er = regEr;
    if (erForm && erForm !== regEr) {
      er = erForm;
      const duStem = erForm.endsWith('t') ? erForm.slice(0, -1) : erForm;
      du = /[sßzx]$/.test(duStem) ? duStem + 't' : duStem + 'st';
    }
    if (duOverride) du = duOverride;
    const wir = /e[lr]n$/.test(inf) ? inf : (inf.endsWith('en') ? inf : stem + 'n');
    const ich = /eln$/.test(inf) ? stem.slice(0, -2) + 'le' : stem + 'e';
    return [ich, du, er, wir, stem + e + 't', wir];
  }

  /** Thông tin chia của một từ: { inf, base, prefix, er, perfekt:{aux, part}, du } hoặc null nếu không chia được. */
  function verbInfo(w) {
    if (!w || w.pos !== 'v' || !w.forms || !w.forms.er) return null;
    if (/^sich /.test(w.word)) return null;
    const erParts = w.forms.er.split(' ');
    let prefix = '';
    let base = w.word;
    if (erParts.length > 1) {
      prefix = erParts.slice(1).join(' ');
      if (!w.word.startsWith(prefix)) return null;
      base = w.word.slice(prefix.length).trim();
    }
    let perfekt = null;
    if (w.forms.perfekt && w.forms.perfekt !== '-') {
      const m = w.forms.perfekt.match(/^(hat|ist)\s+(.+)$/);
      if (m) perfekt = { aux: m[1] === 'ist' ? 'sein' : 'haben', part: m[2] };
    }
    const regular = IRREG[base] ? null : presentSimple(base, '', '')[2];
    return { inf: w.word, base, prefix, er: erParts[0], du: w.forms.du || '', perfekt, stemChange: !!regular && regular !== erParts[0] };
  }

  /** Chia hiện tại: conjugate(w, 'du') → "fährst", động từ tách → "stehst auf". */
  function conjugate(w, person) {
    const info = verbInfo(w);
    if (!info) return '';
    const idx = PERSONS.indexOf(person);
    if (idx < 0) return '';
    const forms = presentSimple(info.base, info.er, info.du);
    return info.prefix ? `${forms[idx]} ${info.prefix}` : forms[idx];
  }
  function perfekt(w, person) {
    const info = verbInfo(w);
    if (!info || !info.perfekt) return '';
    const idx = PERSONS.indexOf(person);
    if (idx < 0) return '';
    return `${IRREG[info.perfekt.aux][idx]} ${info.perfekt.part}`;
  }
  function conjTable(w) {
    const info = verbInfo(w);
    if (!info) return null;
    return PERSONS.map(p => ({ person: p, label: PERSON_LABELS[p], present: conjugate(w, p), perfekt: perfekt(w, p) }));
  }

  /* ---------- 4. Đọc từ vựng ---------- */
  function parseWordsRaw(rawBlocks) {
    const words = [];
    const byKey = {};
    const ids = new Set();
    const lessonTitles = {};
    const lessonWordIds = {};
    let lesson = 0;
    (rawBlocks || []).forEach(block => {
      String(block || '').split('\n').forEach(line => {
        line = line.trim();
        if (!line) return;
        const head = line.match(/^#L(\d+)\s*(.*)$/);
        if (head) {
          lesson = parseInt(head[1], 10);
          lessonTitles[lesson] = head[2] || '';
          lessonWordIds[lesson] = lessonWordIds[lesson] || [];
          return;
        }
        const c = line.split('|').map(x => x.trim());
        const art = c[0] || '';
        const word = c[1] || '';
        if (!word) return;
        const pos = c[4] || 'n';
        const key = `${art}|${word}|${pos}`;
        if (byKey[key]) {
          const w = byKey[key];
          if (w.lesson !== lesson && !w.reviewIn.includes(lesson)) w.reviewIn.push(lesson);
          if (!lessonWordIds[lesson].includes(w.id)) lessonWordIds[lesson].push(w.id);
          return;
        }
        let id = art && art !== 'pl' ? `${art} ${word}` : word;
        if (ids.has(id)) id = `${id}_${pos}`;
        ids.add(id);
        const formsRaw = c[2] || '';
        let forms = {};
        let plural = '';
        if (pos === 'n') plural = formsRaw === '-' ? '' : formsRaw;
        if (pos === 'v' && formsRaw) {
          const fp = formsRaw.split(';').map(x => x.trim());
          forms = { er: fp[0] || '', perfekt: fp[1] || '', du: (fp[2] || '').replace(/^du\s+/, '') };
        }
        const articleShown = art === 'pl' ? 'die' : art;
        const w = {
          id,
          art,
          gender: GENDER[art] ? art : '',
          word,
          display: articleShown ? `${articleShown} ${word}` : word,
          plural,
          forms,
          vi: c[3] || '',
          pos,
          posLabel: POS_LABELS[pos] || pos,
          lesson,
          topic: `l${lesson}`,
          topicName: lessonTitles[lesson] || `Bài ${lesson}`,
          ex: c[5] ? { de: c[5], vi: c[6] || '' } : null,
          reviewIn: []
        };
        byKey[key] = w;
        words.push(w);
        lessonWordIds[lesson].push(w.id);
      });
    });
    return { words, lessonTitles, lessonWordIds };
  }

  /* ---------- 5. So khớp lời nói theo từ ---------- */
  function tokens(s) {
    return fold(s).split(' ').filter(Boolean).map(t => (/^\d+$/.test(t) && NUM_WORDS[t] ? fold(NUM_WORDS[t]) : t));
  }
  /** So câu mẫu với câu nhận diện được: điểm 0–100 theo số từ khớp (LCS), kèm từng từ đúng/sai. */
  function compareWords(target, heard) {
    const rawT = String(target || '').trim().split(/\s+/).filter(Boolean);
    const t = rawT.map(x => tokens(x).join(''));
    const h = tokens(heard);
    const n = t.length;
    const m = h.length;
    if (!n) return { score: 0, perWord: [] };
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        dp[i][j] = t[i - 1] && t[i - 1] === h[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    const ok = new Array(n).fill(false);
    let i = n, j = m;
    while (i > 0 && j > 0) {
      if (t[i - 1] && t[i - 1] === h[j - 1] && dp[i][j] === dp[i - 1][j - 1] + 1) { ok[i - 1] = true; i--; j--; }
      else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
      else j--;
    }
    const valid = t.filter(Boolean).length || 1;
    const score = Math.round(ok.filter(Boolean).length / valid * 100);
    return { score, perWord: rawT.map((word, k) => ({ word, ok: ok[k] || !t[k] })) };
  }

  /** Gợi ý phát âm cho người Việt dựa trên chữ có trong câu. */
  function pronunciationTips(text) {
    const s = String(text || '').toLowerCase();
    const tips = [];
    if (/[äöü]/.test(s)) tips.push('Ü đọc như "i" nhưng tròn môi; Ö đọc như "ê" nhưng tròn môi; Ä gần như "e".');
    if (/ch/.test(s)) tips.push('"ch" sau a/o/u đọc khàn trong cổ họng (Bach), sau e/i/ä/ö/ü đọc như "h" xì nhẹ (ich).');
    if (/sch|^st|^sp| st| sp/.test(s)) tips.push('"sch" đọc như "s" uốn lưỡi; "st", "sp" đầu từ đọc là "st", "sp" có "s" uốn lưỡi.');
    if (/r/.test(s)) tips.push('"r" đọc trong cổ họng; "-er" cuối từ đọc nhẹ thành "ơ".');
    if (/[bdg]\b/.test(s)) tips.push('b, d, g ở cuối từ đọc thành p, t, k (Tag → "ták").');
    if (/ei|ie/.test(s)) tips.push('"ei" đọc là "ai", "ie" đọc là "i" dài.');
    if (/z/.test(s)) tips.push('"z" đọc là "ts".');
    return tips.slice(0, 2).join(' ');
  }

  /* ---------- 6. SM-2 ---------- */
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

  /* ---------- 7. Gom dữ liệu khi chạy trên web ---------- */
  let cache = null;
  function load() {
    if (cache) return cache;
    const w = typeof window !== 'undefined' ? window : {};
    const parsed = parseWordsRaw(w.DE_WORDS_RAW || []);
    const curr = w.DE_CURRICULUM || { lessons: [] };
    const lessons = (curr.lessons || []).map(l => Object.assign({}, l, { wordIds: parsed.lessonWordIds[l.no] || [] }));
    const wordMap = {};
    parsed.words.forEach(x => { wordMap[x.id] = x; });
    cache = { words: parsed.words, wordMap, lessons, curriculum: curr, sounds: w.DE_SOUNDS || null, grammar: w.DE_GRAMMAR || [] };
    // Bản đồ DE_WORDS theo id để các module dùng chung (kho ôn, tra từ) đọc được
    w.DE_WORDS = wordMap;
    return cache;
  }

  /** Tra một từ tiếng Đức (bỏ mạo từ, thử cả dạng số nhiều và dạng chia của động từ). */
  function lookup(text) {
    const d = load();
    const q = fold(String(text || '').replace(/^(der|die|das|ein|eine)\s+/i, ''));
    if (!q) return null;
    const byWord = d.words.find(x => fold(x.word) === q);
    if (byWord) return byWord;
    const byPlural = d.words.find(x => x.plural && fold(x.plural.replace(/^die\s+/, '')) === q);
    if (byPlural) return byPlural;
    return d.words.find(x => x.pos === 'v' && PERSONS.some(p => fold(conjugate(x, p).split(' ')[0]) === q)) || null;
  }

  const DeCore = {
    fold, typeUmlauts, answerMatches, POS_LABELS, GENDER, PERSONS, PERSON_LABELS,
    verbInfo, conjugate, perfekt, conjTable, parseWordsRaw, compareWords, pronunciationTips, sm2, load, lookup,
    _reset() { cache = null; }
  };

  if (typeof window !== 'undefined') window.DeCore = DeCore;
  if (typeof module !== 'undefined' && module.exports) module.exports = DeCore;
})();
