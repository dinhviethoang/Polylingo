/**
 * boost.js — Các tiện ích học dùng chung cho mọi mục của Polylingo.
 *
 *  - SentenceCheck: so câu người học gõ với câu mẫu, tô đúng/sai từng từ (Gõ câu, Video, Học thử).
 *  - TextUtil: chuẩn hóa tiếng Việt / pinyin, chấm bài dịch theo ý chính.
 *  - ReviewBank: gom từ ở Lộ trình, Video, Tra từ, Gõ câu về một bộ thẻ ôn SM-2 chung.
 *  - StudyTimer: đếm số phút học thật mỗi ngày (chỉ khi đang thao tác), mục tiêu ngày theo phút.
 *  - Lookup: bôi đen / bấm đúp một từ ở bất kỳ mục nào để tra nghĩa, nghe và thêm vào thẻ ôn.
 *  - LevelPick: chọn trình độ khi bắt đầu để bỏ qua phần quá dễ của Lộ trình.
 *  - Portal: khối Học thử 1 phút, thẻ Hôm nay (phút học, từ cần ôn) và phần giới thiệu + hỏi đáp.
 *
 * Toàn bộ lưu ở localStorage nên tự đồng bộ cùng tài khoản (account.js gom mọi khóa).
 * Chạy được trong Node (module.exports) để kiểm thử các hàm thuần.
 */
(function () {
  'use strict';

  const root = typeof window !== 'undefined' ? window : globalThis;
  const hasDOM = typeof document !== 'undefined' && typeof document.createElement === 'function';

  /* ======================================================================
     0. Lưu trữ & ngày
     ====================================================================== */
  const store = {
    get(key, fallback) {
      try {
        if (typeof localStorage === 'undefined') return fallback;
        const raw = localStorage.getItem(key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (_) { return fallback; }
    },
    set(key, val) {
      try {
        if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(val));
      } catch (_) { /* bộ nhớ đầy hoặc bị chặn */ }
    }
  };

  /** Ngày theo giờ máy người học (YYYY-MM-DD), dùng cho phút học. */
  function localDate(d) {
    const x = d || new Date();
    const m = String(x.getMonth() + 1).padStart(2, '0');
    const day = String(x.getDate()).padStart(2, '0');
    return `${x.getFullYear()}-${m}-${day}`;
  }
  /** Ngày dạng ISO như thẻ ghi nhớ SM-2 trong app.js đang dùng. */
  function isoDate(offsetDays) {
    return new Date(Date.now() + (offsetDays || 0) * 86400000).toISOString().slice(0, 10);
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  const icon = (n, size) => (root.PolyIcons && typeof root.PolyIcons.svg === 'function' ? root.PolyIcons.svg(n, { size: size || 18 }) : '');

  /* ======================================================================
     1. Chuẩn hóa văn bản
     ====================================================================== */
  const CJK_RE = /[㐀-鿿豈-﫿]/;
  const CJK_RE_G = /[㐀-鿿豈-﫿]/g;

  function stripMarks(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  /** Tiếng Việt → chữ thường không dấu, chỉ chữ/số và khoảng trắng đơn. */
  function normalizeVi(s) {
    return stripMarks(String(s || '').toLowerCase().replace(/đ/g, 'd'))
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  /** Pinyin → chữ thường, bỏ dấu thanh và số thanh, ü/v → u. */
  function normalizePinyin(s) {
    return stripMarks(String(s || '').toLowerCase())
      .replace(/[1-5]/g, '')
      .replace(/v/g, 'u');
  }

  function hasCJK(s) {
    return CJK_RE.test(String(s || ''));
  }

  /* ======================================================================
     2. So câu (SentenceCheck)
     ====================================================================== */

  /** Đánh dấu phần tử nào của a nằm trong dãy con chung dài nhất với b. */
  function lcsFlags(a, b) {
    const n = a.length;
    const m = b.length;
    const dp = [];
    for (let i = 0; i <= n; i++) dp.push(new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    const flagsA = new Array(n).fill(false);
    const flagsB = new Array(m).fill(false);
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
      if (a[i] === b[j]) {
        flagsA[i] = true;
        flagsB[j] = true;
        i++; j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) {
        i++;
      } else {
        j++;
      }
    }
    return { flagsA, flagsB, length: dp[0][0] };
  }

  /** Tách câu tiếng Anh thành từ: giữ chữ để hiển thị, khóa so sánh bỏ dấu câu và dấu nháy. */
  function tokenizeEn(text) {
    const out = [];
    const re = /[A-Za-z0-9À-ɏ]+(?:['’][A-Za-z]+)*/g;
    let m;
    const s = String(text || '');
    while ((m = re.exec(s))) {
      out.push({ text: m[0], key: m[0].toLowerCase().replace(/['’]/g, '') });
    }
    return out;
  }

  /** Tách pinyin thành từ (theo khoảng trắng / dấu câu của câu mẫu). */
  function tokenizePinyin(py) {
    return String(py || '')
      .split(/[\s,.!?;:，。！？；：“”"'‘’、（）()…—-]+/)
      .filter(Boolean)
      .map(t => ({ text: t, key: normalizePinyin(t).replace(/[^a-z]/g, '') }))
      .filter(t => t.key);
  }

  function tokenizeHanzi(text) {
    return (String(text || '').match(CJK_RE_G) || []).map(ch => ({ text: ch, key: ch }));
  }

  /**
   * So câu gõ với câu mẫu.
   * @param {'en'|'zh'} lang
   * @param {string} target  câu mẫu (tiếng Anh, hoặc chữ Hán)
   * @param {string} input   câu người học gõ
   * @param {{py?: string}} [opts] pinyin của câu mẫu (tiếng Trung, khi gõ pinyin)
   * @returns {{ok:boolean, accuracy:number, mode:string, tokens:Array<{text:string, ok:boolean}>, extra:number, wrong:string[]}}
   */
  function compareSentence(lang, target, input, opts) {
    const o = opts || {};
    const raw = String(input || '');
    let mode = 'words';
    let tokens;

    if (lang === 'zh') {
      const useHanzi = hasCJK(raw) || !o.py;
      mode = useHanzi ? 'hanzi' : 'pinyin';
      tokens = useHanzi ? tokenizeHanzi(target) : tokenizePinyin(o.py);
      // So theo từng chữ cái/chữ Hán để "gāoxìng" và "gao xing" đều đúng.
      const flat = [];
      tokens.forEach((t, ti) => { Array.from(t.key).forEach(ch => flat.push({ ch, ti })); });
      const inputChars = useHanzi
        ? (raw.match(CJK_RE_G) || [])
        : Array.from(normalizePinyin(raw).replace(/[^a-z]/g, ''));
      const res = lcsFlags(flat.map(f => f.ch), inputChars);
      const okByToken = tokens.map(() => true);
      flat.forEach((f, idx) => { if (!res.flagsA[idx]) okByToken[f.ti] = false; });
      const extra = inputChars.length - res.length;
      const total = flat.length || 1;
      const out = tokens.map((t, i) => ({ text: t.text, ok: okByToken[i] }));
      return {
        ok: flat.length > 0 && res.length === flat.length && extra === 0,
        accuracy: Math.round((res.length / total) * 100),
        mode,
        tokens: out,
        extra,
        wrong: out.filter(t => !t.ok).map(t => t.text)
      };
    }

    tokens = tokenizeEn(target);
    const inTokens = tokenizeEn(raw);
    const res = lcsFlags(tokens.map(t => t.key), inTokens.map(t => t.key));
    const out = tokens.map((t, i) => ({ text: t.text, ok: res.flagsA[i] }));
    const extra = inTokens.length - res.length;
    return {
      ok: tokens.length > 0 && res.length === tokens.length && extra === 0,
      accuracy: Math.round((res.length / (tokens.length || 1)) * 100),
      mode,
      tokens: out,
      extra,
      wrong: out.filter(t => !t.ok).map(t => t.text)
    };
  }

  /** HTML tô màu kết quả so câu. */
  function renderCompare(result) {
    if (!result) return '';
    const joiner = result.mode === 'hanzi' ? '' : ' ';
    const body = result.tokens.map(t => `<span class="pb-tok ${t.ok ? 'is-ok' : 'is-bad'}">${esc(t.text)}</span>`).join(joiner);
    const extra = result.extra > 0 ? `<span class="pb-tok-extra">+${result.extra} ${result.mode === 'words' ? 'từ' : 'ký tự'} thừa</span>` : '';
    return `<div class="pb-compare pb-compare-${result.mode}">${body}${extra}</div>`;
  }

  /* ======================================================================
     3. Chấm bài dịch theo ý chính
     ====================================================================== */

  /**
   * @param {string} input  bản dịch tiếng Việt của người học
   * @param {string[]} keys ý chính, mỗi ý có thể có nhiều cách nói cách nhau bởi "|"
   * @returns {{score:number, hits:string[], misses:string[]}}
   */
  function scoreTranslation(input, keys) {
    const text = ` ${normalizeVi(input)} `;
    const list = Array.isArray(keys) ? keys : [];
    const hits = [];
    const misses = [];
    list.forEach(k => {
      const alts = String(k).split('|').map(a => normalizeVi(a)).filter(Boolean);
      const label = String(k).split('|')[0].trim();
      if (alts.some(a => text.includes(` ${a} `))) hits.push(label);
      else misses.push(label);
    });
    const score = list.length ? Math.round((hits.length / list.length) * 100) : (normalizeVi(input) ? 100 : 0);
    return { score, hits, misses };
  }

  /* ======================================================================
     4. Từ điển chung (cho Tra từ và Kho ôn)
     ====================================================================== */
  function enWordList() {
    const raw = root.EN_WORDS;
    if (!raw) return [];
    const list = Array.isArray(raw) ? raw : Object.values(raw);
    list.forEach(w => { if (w && !w.id && w.word) w.id = w.word; });
    return list;
  }
  function zhWordList() {
    return Array.isArray(root.VOCAB) ? root.VOCAB : [];
  }

  let zhIndex = null;
  let zhIndexSize = -1;
  function getZhIndex() {
    const vocab = zhWordList();
    if (zhIndex && zhIndexSize === vocab.length) return zhIndex;
    zhIndex = {};
    vocab.forEach(v => { if (v && v.hanzi && !zhIndex[v.hanzi]) zhIndex[v.hanzi] = v; });
    zhIndexSize = vocab.length;
    return zhIndex;
  }

  /** Các dạng gốc có thể của một từ tiếng Anh (books → book, studied → study, making → make). */
  function enStems(w) {
    const s = String(w || '').toLowerCase().replace(/[’']/g, "'");
    const out = [s];
    const push = x => { if (x && x.length > 1 && !out.includes(x)) out.push(x); };
    if (s.endsWith("'s")) push(s.slice(0, -2));
    if (s.endsWith('ies')) push(s.slice(0, -3) + 'y');
    if (s.endsWith('es')) push(s.slice(0, -2));
    if (s.endsWith('s')) push(s.slice(0, -1));
    if (s.endsWith('ied')) push(s.slice(0, -3) + 'y');
    if (s.endsWith('ed')) { push(s.slice(0, -2)); push(s.slice(0, -1)); }
    if (s.endsWith('ing')) { push(s.slice(0, -3)); push(s.slice(0, -3) + 'e'); }
    if (/(.)\1(ed|ing)$/.test(s)) push(s.replace(/(.)\1(ed|ing)$/, '$1'));
    return out;
  }

  /**
   * Tra một từ. Tiếng Trung lấy đoạn dài nhất có trong từ điển tính từ đầu chuỗi.
   * @returns {null|{lang, word, phonetic, vi, hv?, pos?, ex?, id?}}
   */
  /** Tra từ tiếng Nhật trong từ vựng N5 (data/ja qua JaCore): khớp dài nhất từ đầu chuỗi, theo chữ Hán hoặc kana. */
  function lookupJa(s) {
    const core = root.JaCore;
    if (!core) return null;
    const d = core.load();
    const text = s.replace(/[\s。、！？「」]/g, '');
    for (let len = Math.min(8, text.length); len >= 1; len--) {
      const cand = text.slice(0, len);
      const w = d.words.find(x => x.kanji === cand) || d.words.find(x => x.kana === cand);
      if (w) {
        return { lang: 'ja', word: w.word, phonetic: w.kanji ? `${w.kana} · ${w.romaji}` : w.romaji, vi: w.vi, hv: w.hanViet || '',
          pos: w.posLabel || '', ex: w.ex ? { ja: w.ex.ja, vi: w.ex.vi } : null, id: w.id, speakText: w.kana };
      }
    }
    return null;
  }

  /** Tra từ tiếng Đức trong từ vựng A1 (data/de qua DeCore): bỏ mạo từ, nhận cả số nhiều và dạng chia của động từ. */
  function lookupDe(s) {
    const core = root.DeCore;
    if (!core) return null;
    const m = s.match(/[A-Za-zÄÖÜäöüß-]+/g);
    if (!m) return null;
    const w = core.lookup(m.join(' ')) || core.lookup(m[m.length - 1]) || core.lookup(m[0]);
    if (!w) return null;
    return { lang: 'de', word: w.display, phonetic: w.plural ? `số nhiều: ${w.plural}` : (w.forms && w.forms.perfekt ? `${w.forms.er} · ${w.forms.perfekt}` : ''),
      vi: w.vi, hv: '', pos: w.posLabel || '', ex: w.ex ? { de: w.ex.de, vi: w.ex.vi } : null, id: w.id, speakText: w.display };
  }

  /** Tra từ tiếng Nga trong từ vựng A1 (data/ru qua RuCore): khớp nguyên dạng, nếu không thì bỏ dần đuôi biến cách. */
  function lookupRu(s) {
    const core = root.RuCore;
    if (!core) return null;
    const d = core.load();
    const first = core.plainKey(s).split(' ')[0] || '';
    if (!/[а-я]/.test(first)) return null;
    const key = w => core.plainKey(w.plain);
    let w = d.words.find(x => key(x) === core.plainKey(s)) || d.words.find(x => key(x) === first);
    for (let cut = 1; !w && cut <= 3 && first.length - cut >= 3; cut++) {
      const stem = first.slice(0, -cut);
      w = d.words.find(x => !/\s/.test(x.plain) && key(x).startsWith(stem) && key(x).length - stem.length <= 3);
    }
    if (!w) return null;
    return { lang: 'ru', word: w.word, phonetic: w.translit, vi: w.vi, pos: [w.posLabel, w.genderLabel].filter(Boolean).join(', '),
      ex: w.ex ? { ru: w.ex.ru, vi: w.ex.vi } : null, id: w.id, speakText: core.stripStress(w.word) };
  }

  function lookupWord(text, langHint) {
    const s = String(text || '').trim();
    if (!s) return null;
    if (langHint === 'ja') return lookupJa(s);
    if (langHint === 'de') return lookupDe(s);
    if (langHint === 'ru') return lookupRu(s);
    if (hasCJK(s)) {
      const chars = (s.match(CJK_RE_G) || []).join('');
      const idx = getZhIndex();
      const hsk = root.HSK1_WORDS || {};
      for (let len = Math.min(4, chars.length); len >= 1; len--) {
        const cand = chars.slice(0, len);
        const v = idx[cand];
        const h = hsk[cand];
        if (v || h) {
          return {
            lang: 'zh',
            word: cand,
            phonetic: (v && v.pinyin) || (h && h.py) || '',
            vi: (v && v.vi) || (h && h.vi) || '',
            hv: (v && v.hv) || (h && h.hv) || '',
            pos: (v && v.pos) || (h && h.pos) || '',
            ex: (v && v.ex) || (h && h.ex) || null,
            id: v ? v.id : null
          };
        }
      }
      const ch = chars[0];
      const map = root.CHAR_PINYIN || {};
      if (ch && map[ch]) {
        return { lang: 'zh', word: ch, phonetic: map[ch], vi: '', hv: '', pos: '', ex: null, id: null };
      }
      return null;
    }
    if (langHint === 'zh') return null;
    const raw = root.EN_WORDS || {};
    const m = s.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/);
    if (!m) return null;
    enWordList();
    const stems = enStems(m[0]);
    for (const st of stems) {
      const w = raw[st] || (Array.isArray(raw) ? raw.find(x => x.word === st) : null);
      if (w) {
        return { lang: 'en', word: w.word, phonetic: w.ipa || '', vi: w.vi || '', hv: '', pos: w.pos || '', ex: w.ex || null, id: w.id || w.word, note: w.note || '' };
      }
    }
    return null;
  }

  /** Tách chuỗi chữ Hán thành các từ có trong từ điển (khớp dài nhất), bỏ chữ lẻ không có. */
  function segmentZh(text) {
    const chars = (String(text || '').match(CJK_RE_G) || []);
    const idx = getZhIndex();
    const out = [];
    let i = 0;
    while (i < chars.length) {
      let found = null;
      for (let len = Math.min(4, chars.length - i); len >= 1; len--) {
        const cand = chars.slice(i, i + len).join('');
        if (idx[cand]) { found = idx[cand]; break; }
      }
      if (found) { out.push(found); i += found.hanzi.length; } else { i += 1; }
    }
    return out;
  }

  /* ======================================================================
     5. Kho ôn chung (ReviewBank)
     ====================================================================== */
  const ReviewBank = {
    sm2Key(lang) { return lang === 'en' ? 'en_sm2_data' : (lang === 'ja' || lang === 'ru' || lang === 'de') ? `${lang}_sm2_data` : 'hsk_sm2_data'; },

    vocab(lang) { return lang === 'en' ? enWordList() : zhWordList(); },

    findId(lang, word) {
      if (!word) return null;
      if (lang === 'en') {
        const raw = root.EN_WORDS || {};
        for (const st of enStems(word)) {
          if (raw[st]) return raw[st].id || raw[st].word;
        }
        return null;
      }
      const v = getZhIndex()[word];
      return v ? v.id : null;
    },

    /** Thêm 1 từ vào thẻ ôn. Trả về 'added' | 'exists' | 'unknown'. */
    addWord(lang, word, when) {
      if (lang === 'ja' || lang === 'ru' || lang === 'de') {
        // Thẻ tiếng Nhật, Nga, Đức do japanese.js, russian.js, german.js quản lý (khóa ja_/ru_/de_sm2_data, định dạng {ef, interval, repetition, due})
        const info = lang === 'ja' ? lookupJa(word) : lang === 'ru' ? lookupRu(word) : lookupDe(word);
        if (!info) return 'unknown';
        const key = this.sm2Key(lang);
        const data = store.get(key, {});
        if (data[info.id]) return 'exists';
        data[info.id] = { ef: 2.5, interval: 0, repetition: 0, due: Date.now() + (when === 'tomorrow' ? 86400000 : 0) };
        store.set(key, data);
        return 'added';
      }
      const id = this.findId(lang, word);
      if (!id) return 'unknown';
      const data = store.get(this.sm2Key(lang), {});
      if (data[id]) return 'exists';
      data[id] = { interval: 0, repetition: 0, efactor: 2.5, dueDate: isoDate(when === 'tomorrow' ? 1 : 0), source: 'bank' };
      store.set(this.sm2Key(lang), data);
      return 'added';
    },

    addMany(lang, words, when) {
      let added = 0;
      const data = store.get(this.sm2Key(lang), {});
      (words || []).forEach(w => {
        const id = this.findId(lang, w);
        if (!id || data[id]) return;
        data[id] = { interval: 0, repetition: 0, efactor: 2.5, dueDate: isoDate(when === 'tomorrow' ? 1 : 0), source: 'bank' };
        added++;
      });
      if (added) store.set(this.sm2Key(lang), data);
      return added;
    },

    /** Gom từ đã học ở Lộ trình (ôn từ ngày mai) và từ khó / từ lưu từ Video (ôn ngay hôm nay). */
    sync(lang) {
      if (lang !== 'zh' && lang !== 'en') return 0;
      const key = this.sm2Key(lang);
      const data = store.get(key, {});
      if (data.undefined) { delete data.undefined; store.set(key, data); } // thẻ tiếng Anh cũ thiếu mã
      const prog = store.get(`${lang}_learn_progress_v1`, {}) || {};
      const hard = Object.keys(prog.hardWords || {}).filter(w => {
        const v = prog.hardWords[w];
        return typeof v === 'number' ? v > 0 : !!v;
      });
      const learned = Object.keys(prog.learnedWords || {});
      return this.addMany(lang, hard, 'today') + this.addMany(lang, learned, 'tomorrow');
    },

    dueCount(lang) {
      const data = store.get(this.sm2Key(lang), {});
      const today = isoDate(0);
      return Object.keys(data).filter(k => k !== 'undefined' && data[k] && data[k].dueDate && data[k].dueDate <= today).length;
    },

    totalCount(lang) {
      const data = store.get(this.sm2Key(lang), {});
      return Object.keys(data).filter(k => k !== 'undefined').length;
    }
  };

  /* ======================================================================
     6. Đếm phút học (StudyTimer)
     ====================================================================== */
  const TIME_KEY = 'app_study_time_v1';
  const GOAL_KEY = 'app_study_goal_min_v1';
  const GOAL_OPTIONS = [5, 10, 15, 20, 30, 45, 60];
  const IDLE_MS = 60 * 1000;
  const TICK_MS = 10 * 1000;

  /** Cộng giây học vào trạng thái (hàm thuần, dễ kiểm thử). Chỉ giữ 90 ngày gần nhất. */
  function addStudySeconds(state, date, lang, secs) {
    const s = state && typeof state === 'object' ? state : {};
    s.days = s.days || {};
    const d = s.days[date] || { t: 0 };
    d.t = (d.t || 0) + secs;
    if (lang) d[lang] = (d[lang] || 0) + secs;
    s.days[date] = d;
    const keys = Object.keys(s.days).sort();
    while (keys.length > 90) delete s.days[keys.shift()];
    return s;
  }

  const StudyTimer = {
    lastActivity: 0,
    timer: null,
    listeners: [],

    goal() {
      const g = parseInt(store.get(GOAL_KEY, 15), 10);
      return GOAL_OPTIONS.includes(g) ? g : 15;
    },
    setGoal(min) {
      const g = parseInt(min, 10);
      store.set(GOAL_KEY, GOAL_OPTIONS.includes(g) ? g : 15);
      this.emit();
    },
    secondsOn(date, lang) {
      const st = store.get(TIME_KEY, {});
      const d = (st.days || {})[date || localDate()];
      if (!d) return 0;
      return lang ? (d[lang] || 0) : (d.t || 0);
    },
    minutesToday(lang) { return Math.floor(this.secondsOn(localDate(), lang) / 60); },

    /** Số ngày liên tiếp (tính tới hôm nay hoặc hôm qua) đạt mục tiêu phút. */
    goalStreak() {
      const st = store.get(TIME_KEY, {});
      const days = st.days || {};
      const goalSec = this.goal() * 60;
      let n = 0;
      const d = new Date();
      if (!(days[localDate(d)] && days[localDate(d)].t >= goalSec)) d.setDate(d.getDate() - 1);
      for (;;) {
        const rec = days[localDate(d)];
        if (rec && rec.t >= goalSec) { n++; d.setDate(d.getDate() - 1); } else break;
      }
      return n;
    },

    last7() {
      const st = store.get(TIME_KEY, {});
      const out = [];
      const d = new Date();
      d.setDate(d.getDate() - 6);
      for (let i = 0; i < 7; i++) {
        const key = localDate(d);
        out.push({ date: key, min: Math.floor((((st.days || {})[key] || {}).t || 0) / 60), dow: d.getDay() });
        d.setDate(d.getDate() + 1);
      }
      return out;
    },

    onChange(fn) { this.listeners.push(fn); },
    emit() { this.listeners.forEach(fn => { try { fn(); } catch (_) { /* bỏ qua */ } }); },

    /** Đang ở một mục học của ngôn ngữ (không tính Trang chủ chung và Vườn). */
    currentLang() {
      const app = root.app;
      if (app && app.currentLang && app.currentTab) return app.currentLang;
      return null;
    },

    mediaActive() {
      try {
        if (root.speechSynthesis && root.speechSynthesis.speaking) return true;
        const app = root.app;
        if (app && app.currentTab === 'videos' && root.VideoLearn && root.VideoLearn.isPlaying) return true;
      } catch (_) { /* bỏ qua */ }
      return false;
    },

    tick() {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;
      const lang = this.currentLang();
      if (!lang) return;
      const active = (Date.now() - this.lastActivity) < IDLE_MS || this.mediaActive();
      if (!active) return;
      const date = localDate();
      const goalSec = this.goal() * 60;
      const before = this.secondsOn(date);
      const st = addStudySeconds(store.get(TIME_KEY, {}), date, lang, TICK_MS / 1000);
      const after = st.days[date].t;
      if (before < goalSec && after >= goalSec && !st.days[date].g) {
        st.days[date].g = 1;
        store.set(TIME_KEY, st);
        this.celebrate();
      } else {
        store.set(TIME_KEY, st);
      }
      if (Math.floor(before / 60) !== Math.floor(after / 60)) this.emit();
    },

    celebrate() {
      const app = root.app;
      if (app && typeof app.showToast === 'function') {
        app.showToast(`Đã đạt mục tiêu ${this.goal()} phút học hôm nay. Thưởng thêm xu và nước cho Vườn!`, 'success');
      }
      if (root.Economy && typeof root.Economy.reward === 'function') {
        try { root.Economy.reward('dailyGoal'); } catch (_) { /* bỏ qua */ }
      }
    },

    start() {
      if (this.timer || !hasDOM) return;
      const mark = () => { this.lastActivity = Date.now(); };
      ['pointerdown', 'keydown', 'wheel', 'touchstart', 'input'].forEach(ev => {
        document.addEventListener(ev, mark, { passive: true, capture: true });
      });
      this.timer = setInterval(() => this.tick(), TICK_MS);
    }
  };

  /** Vòng tròn tiến độ nhỏ (SVG). */
  function ringSvg(pct, size) {
    const s = size || 56;
    const r = (s - 8) / 2;
    const c = 2 * Math.PI * r;
    const off = c * (1 - Math.max(0, Math.min(1, pct)));
    return `<svg class="pb-ring" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" aria-hidden="true">
      <circle cx="${s / 2}" cy="${s / 2}" r="${r}" fill="none" stroke-width="6" class="pb-ring-bg"/>
      <circle cx="${s / 2}" cy="${s / 2}" r="${r}" fill="none" stroke-width="6" class="pb-ring-bar"
        stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}" stroke-linecap="round"
        transform="rotate(-90 ${s / 2} ${s / 2})"/>
    </svg>`;
  }

  function goalSelectHtml(id) {
    const g = StudyTimer.goal();
    return `<select class="pb-goal-select" id="${id}" aria-label="Mục tiêu phút học mỗi ngày">
      ${GOAL_OPTIONS.map(v => `<option value="${v}" ${v === g ? 'selected' : ''}>${v} phút/ngày</option>`).join('')}
    </select>`;
  }

  /** Dòng "Hôm nay x/y phút" ở chân menu dọc. */
  function renderSidebarMinutes() {
    if (!hasDOM) return;
    const footer = document.querySelector('.sidebar-footer');
    if (!footer) return;
    let el = document.getElementById('pb-side-minutes');
    if (!el) {
      el = document.createElement('div');
      el.id = 'pb-side-minutes';
      el.className = 'pb-side-minutes';
      footer.appendChild(el);
    }
    const min = StudyTimer.minutesToday();
    const goal = StudyTimer.goal();
    const pct = Math.min(100, Math.round((min / goal) * 100));
    el.innerHTML = `
      <div class="pb-side-row">
        <span>${icon('clock', 13)} Hôm nay</span>
        <strong>${min}/${goal} phút</strong>
      </div>
      <div class="pb-side-track"><div class="pb-side-fill" style="width:${pct}%"></div></div>`;
    el.title = 'Chỉ tính lúc bạn đang học (bấm, gõ, nghe). Đổi mục tiêu ở trang Tổng quan.';
  }

  /* ======================================================================
     7. Tra từ ở mọi trang (Lookup)
     ====================================================================== */
  const LOOKUP_OFF_KEY = 'app_lookup_off';

  const Lookup = {
    btn: null,
    card: null,
    pending: null,

    enabled() { return !store.get(LOOKUP_OFF_KEY, false); },
    setEnabled(on) { store.set(LOOKUP_OFF_KEY, !on); },

    init() {
      if (!hasDOM || this.inited) return;
      this.inited = true;
      const onEnd = () => setTimeout(() => this.checkSelection(), 10);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchend', onEnd);
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closeAll(); });
      document.addEventListener('pointerdown', (e) => {
        if (this.card && !this.card.contains(e.target) && (!this.btn || !this.btn.contains(e.target))) this.closeCard();
      });
      window.addEventListener('scroll', () => this.hideButton(), { passive: true, capture: true });
    },

    checkSelection() {
      if (!this.enabled()) return this.hideButton();
      const sel = window.getSelection ? window.getSelection() : null;
      const text = sel ? String(sel).trim() : '';
      if (!text || text.length > 24 || !sel.rangeCount) return this.hideButton();
      const node = sel.anchorNode && (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement);
      if (!node || !node.closest) return this.hideButton();
      if (!node.closest('.app-main')) return this.hideButton();
      if (node.closest('input, textarea, select, [contenteditable="true"], #tab-videos, .pb-lookup-card, #tab-writing, .ja-quiz, .ja-write-stage, .ru-write-stage, .de-quiz')) return this.hideButton();
      const info = lookupWord(text, document.documentElement.getAttribute('data-target-lang'));
      if (!info) return this.hideButton();
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      this.showButton(rect, info);
    },

    showButton(rect, info) {
      if (!this.btn) {
        this.btn = document.createElement('button');
        this.btn.type = 'button';
        this.btn.className = 'pb-lookup-btn';
        this.btn.addEventListener('mousedown', e => e.preventDefault());
        this.btn.addEventListener('click', () => {
          const rect = this.btn.getBoundingClientRect();
          this.hideButton();
          try { window.getSelection().removeAllRanges(); } catch (_) { /* bỏ qua */ }
          if (this.pending) this.showCard(this.pending, rect);
        });
        document.body.appendChild(this.btn);
      }
      this.pending = info;
      this.btn.innerHTML = `${icon('search', 14)} Tra “${esc(info.word)}”`;
      const top = Math.max(8, rect.top - 40);
      const left = Math.min(window.innerWidth - 150, Math.max(8, rect.left + rect.width / 2 - 60));
      this.btn.style.top = `${top}px`;
      this.btn.style.left = `${left}px`;
      this.btn.hidden = false;
    },

    hideButton() { if (this.btn) this.btn.hidden = true; },

    closeCard() { if (this.card) { this.card.remove(); this.card = null; } },
    closeAll() { this.hideButton(); this.closeCard(); },

    speak(info) {
      const app = root.app;
      const tts = info.lang === 'en' ? 'en-US' : info.lang === 'ja' ? 'ja-JP' : info.lang === 'ru' ? 'ru-RU' : info.lang === 'de' ? 'de-DE' : 'zh-CN';
      if (app && typeof app.speakText === 'function') app.speakText(info.speakText || info.word, null, tts);
    },

    showCard(info, anchorRect) {
      this.closeCard();
      const card = document.createElement('div');
      card.className = 'pb-lookup-card';
      card.setAttribute('role', 'dialog');
      card.setAttribute('aria-label', `Tra từ ${info.word}`);
      const ex = info.ex || null;
      const exText = ex ? (ex.ja || ex.ru || ex.de || ex.en || ex.zh || '') : '';
      const exPh = ex ? (ex.py || ex.ipa || '') : '';
      card.innerHTML = `
        <div class="pb-lookup-head">
          <span class="pb-lookup-word" lang="${['en', 'ja', 'ru', 'de'].includes(info.lang) ? info.lang : 'zh'}">${esc(info.word)}</span>
          <button type="button" class="pb-icon-btn" data-a="speak" aria-label="Nghe phát âm">${icon('volume', 18)}</button>
          <button type="button" class="pb-icon-btn pb-lookup-x" data-a="close" aria-label="Đóng">${icon('x', 16)}</button>
        </div>
        ${info.phonetic ? `<div class="pb-lookup-ph">${esc(info.phonetic)}</div>` : ''}
        ${info.vi ? `<div class="pb-lookup-vi">${esc(info.vi)}</div>` : '<div class="pb-lookup-vi pb-muted">Chưa có nghĩa trong từ điển của Polylingo.</div>'}
        ${info.hv ? `<div class="pb-lookup-meta">Hán Việt: <em>${esc(info.hv)}</em></div>` : ''}
        ${info.pos ? `<div class="pb-lookup-meta">Từ loại: ${esc(info.pos)}</div>` : ''}
        ${exText ? `<div class="pb-lookup-ex"><div lang="${['en', 'ja', 'ru', 'de'].includes(info.lang) ? info.lang : 'zh'}">${esc(exText)}</div>${exPh ? `<div class="pb-muted">${esc(exPh)}</div>` : ''}${ex.vi ? `<div>${esc(ex.vi)}</div>` : ''}</div>` : ''}
        <div class="pb-lookup-actions">
          ${info.id ? '<button type="button" class="pb-btn pb-btn-primary" data-a="add">' + icon('plus', 15) + ' Thêm vào thẻ ôn</button>' : ''}
          <button type="button" class="pb-btn pb-btn-ghost" data-a="off">Tắt tra nhanh</button>
        </div>`;
      document.body.appendChild(card);
      const r = anchorRect || { top: 80, left: 20, bottom: 100 };
      const w = Math.min(320, window.innerWidth - 24);
      card.style.width = `${w}px`;
      const left = Math.min(window.innerWidth - w - 12, Math.max(12, r.left - 40));
      let top = r.bottom + 8;
      const h = card.offsetHeight || 220;
      if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 8);
      card.style.left = `${left}px`;
      card.style.top = `${top}px`;
      card.addEventListener('click', (e) => {
        const b = e.target.closest('[data-a]');
        if (!b) return;
        const a = b.getAttribute('data-a');
        if (a === 'close') this.closeCard();
        else if (a === 'speak') this.speak(info);
        else if (a === 'add') {
          const res = ReviewBank.addWord(info.lang, info.word, 'today');
          b.disabled = true;
          b.innerHTML = `${icon('check', 15)} ${res === 'exists' ? 'Đã có trong thẻ ôn' : 'Đã thêm, ôn hôm nay'}`;
        } else if (a === 'off') {
          this.setEnabled(false);
          this.closeCard();
          if (root.app && root.app.showToast) root.app.showToast('Đã tắt tra nhanh. Bật lại ở trang Tổng quan của ngôn ngữ.', 'info');
        }
      });
      this.card = card;
      this.speak(info);
    }
  };

  /* ======================================================================
     8. Chọn trình độ (LevelPick)
     ====================================================================== */
  const LEVEL_KEY = 'app_level_pick_v1';
  const LEVEL_OPTIONS = {
    zh: [
      { id: 'new', label: 'Mới bắt đầu', desc: 'Học từ phát âm Pinyin và 4 thanh điệu.', skip: [] },
      { id: 'pinyin', label: 'Đã biết Pinyin', desc: 'Bỏ qua cấp Nhập môn, vào thẳng HSK1.', skip: ['intro'] }
    ],
    en: [
      { id: 'new', label: 'Mới bắt đầu', desc: 'Học từ chào hỏi, số đếm, bảng chữ cái.', skip: [] },
      { id: 'basic', label: 'Đã biết cơ bản', desc: 'Bỏ qua cấp Starter, vào thẳng A1.', skip: ['starter'] }
    ]
  };

  function curriculumFor(lang) {
    return lang === 'en' ? (root.EN_CURRICULUM || root.CURRICULUM_EN) : root.CURRICULUM;
  }

  /** Đánh dấu các cấp được bỏ qua là đã xong (hàm thuần trên object tiến độ). */
  function applyLevelSkip(progress, curriculum, levelIds) {
    const prog = progress && typeof progress === 'object' ? progress : {};
    prog.lessons = prog.lessons || {};
    prog.checkpoints = prog.checkpoints || {};
    const now = Date.now();
    let count = 0;
    ((curriculum && curriculum.levels) || []).forEach(lvl => {
      if (!levelIds.includes(lvl.id)) return;
      (lvl.units || []).forEach(unit => {
        (unit.lessons || []).forEach(l => {
          const rec = prog.lessons[l.id];
          if (!rec || !(rec.stars >= 1)) {
            prog.lessons[l.id] = Object.assign({}, rec || {}, { stars: 1, best: 60, doneAt: now, skipped: true });
            count++;
          }
        });
        const threshold = (unit.checkpoint && unit.checkpoint.passPercent) || 80;
        const cur = prog.checkpoints[unit.id];
        const curScore = typeof cur === 'object' && cur ? (cur.score || cur.best || 0) : (cur || 0);
        if (curScore < threshold) prog.checkpoints[unit.id] = threshold;
      });
    });
    return { progress: prog, count };
  }

  const LevelPick = {
    get(lang) { return (store.get(LEVEL_KEY, {}) || {})[lang] || null; },
    choose(lang, optId) {
      const opts = LEVEL_OPTIONS[lang] || [];
      const opt = opts.find(o => o.id === optId);
      if (!opt) return 0;
      const all = store.get(LEVEL_KEY, {}) || {};
      all[lang] = optId;
      store.set(LEVEL_KEY, all);
      if (!opt.skip.length) return 0;
      const key = `${lang}_learn_progress_v1`;
      const res = applyLevelSkip(store.get(key, {}), curriculumFor(lang), opt.skip);
      store.set(key, res.progress);
      return res.count;
    }
  };

  /* ======================================================================
     9. Thẻ "Hôm nay" ở trang Tổng quan của ngôn ngữ
     ====================================================================== */
  function renderLangHome(lang) {
    if (!hasDOM || (lang !== 'zh' && lang !== 'en')) return;
    const pane = document.getElementById('tab-home');
    if (!pane) return;
    ReviewBank.sync(lang);
    let box = document.getElementById('pb-home-boost');
    if (!box) {
      box = document.createElement('div');
      box.id = 'pb-home-boost';
      pane.insertBefore(box, pane.firstChild);
    }
    const min = StudyTimer.minutesToday(lang);
    const all = StudyTimer.minutesToday();
    const goal = StudyTimer.goal();
    const due = ReviewBank.dueCount(lang);
    const total = ReviewBank.totalCount(lang);
    const streak = StudyTimer.goalStreak();
    const week = StudyTimer.last7();
    const maxMin = Math.max(goal, ...week.map(d => d.min));
    const dows = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const level = LevelPick.get(lang);
    const opts = LEVEL_OPTIONS[lang] || [];

    box.innerHTML = `
      ${!level ? `
      <div class="pb-card pb-level-card">
        <div>
          <h3 class="pb-card-title">Bạn đang ở trình độ nào?</h3>
          <p class="pb-muted">Chọn một lần để Lộ trình bắt đầu đúng chỗ. Đổi lại được bất cứ lúc nào.</p>
        </div>
        <div class="pb-level-opts">
          ${opts.map(o => `<button type="button" class="pb-level-opt" data-level="${o.id}"><strong>${esc(o.label)}</strong><span>${esc(o.desc)}</span></button>`).join('')}
        </div>
      </div>` : ''}
      <div class="pb-home-grid">
        <div class="pb-card pb-goal-card">
          <div class="pb-ring-wrap">${ringSvg(all / goal, 64)}<span class="pb-ring-num">${all}</span></div>
          <div class="pb-goal-info">
            <h3 class="pb-card-title">Phút học hôm nay</h3>
            <p class="pb-muted">${all}/${goal} phút${lang === 'zh' || lang === 'en' ? ` · ${min} phút ở ngôn ngữ này` : ''}${streak > 0 ? ` · ${streak} ngày liền đạt mục tiêu` : ''}</p>
            ${goalSelectHtml('pb-goal-select-home')}
          </div>
          <div class="pb-week" aria-label="Phút học 7 ngày qua">
            ${week.map(d => `<div class="pb-week-col" title="${d.date}: ${d.min} phút"><div class="pb-week-bar ${d.min >= goal ? 'is-done' : ''}" style="height:${Math.max(4, Math.round((d.min / maxMin) * 44))}px"></div><span>${dows[d.dow]}</span></div>`).join('')}
          </div>
        </div>
        <div class="pb-card pb-review-card">
          <h3 class="pb-card-title">${icon('cards', 18)} Kho ôn chung</h3>
          <p class="pb-big">${due} <span>từ cần ôn hôm nay</span></p>
          <p class="pb-muted">${total} từ trong kho. Từ học ở Lộ trình, từ khó, từ lưu ở Video và từ bạn tra đều tự vào đây.</p>
          <a class="pb-btn pb-btn-primary" href="#${lang}/flashcards?mode=due">${due > 0 ? 'Ôn ngay' : 'Học từ mới'}</a>
        </div>
        <div class="pb-card pb-quick-card">
          <h3 class="pb-card-title">Luyện nhanh</h3>
          <a class="pb-quick-link" href="#${lang}/dictation">${icon('keyboard', 18)}<span><strong>Nghe gõ câu</strong><em>Nghe, gõ lại cả câu, sửa chỗ sai</em></span></a>
          <a class="pb-quick-link" href="#${lang}/reading">${icon('book-open', 18)}<span><strong>Đọc và dịch</strong><em>Bài đọc ngắn, dịch từng câu có chấm</em></span></a>
          <label class="pb-switch"><input type="checkbox" id="pb-lookup-toggle" ${Lookup.enabled() ? 'checked' : ''}> Bôi đen một từ để tra nhanh</label>
          ${level ? `<button type="button" class="pb-link-btn" data-level-reset="1">Đổi trình độ (${esc((opts.find(o => o.id === level) || {}).label || level)})</button>` : ''}
        </div>
      </div>`;

    const sel = box.querySelector('#pb-goal-select-home');
    if (sel) sel.addEventListener('change', () => { StudyTimer.setGoal(sel.value); renderLangHome(lang); renderSidebarMinutes(); });
    const tg = box.querySelector('#pb-lookup-toggle');
    if (tg) tg.addEventListener('change', () => Lookup.setEnabled(tg.checked));
    box.querySelectorAll('[data-level]').forEach(b => b.addEventListener('click', () => {
      const n = LevelPick.choose(lang, b.getAttribute('data-level'));
      if (root.app && root.app.showToast) {
        root.app.showToast(n > 0 ? `Đã bỏ qua ${n} bài quá dễ. Lộ trình mở từ cấp tiếp theo.` : 'Đã lưu. Lộ trình bắt đầu từ bài đầu tiên.', 'success');
      }
      renderLangHome(lang);
    }));
    const rs = box.querySelector('[data-level-reset]');
    if (rs) rs.addEventListener('click', () => {
      const all2 = store.get(LEVEL_KEY, {}) || {};
      delete all2[lang];
      store.set(LEVEL_KEY, all2);
      renderLangHome(lang);
    });
  }

  /* ======================================================================
     10. Trang chủ chung: Học thử, thẻ Hôm nay, giới thiệu + hỏi đáp
     ====================================================================== */
  const TRY_WORDS = {
    en: ['hello', 'water', 'friend', 'book'],
    zh: ['你好', '谢谢', '水', '朋友']
  };

  function buildTryout(lang) {
    const vocab = lang === 'en' ? enWordList() : zhWordList();
    if (!vocab.length) return [];
    const pick = TRY_WORDS[lang].map(w => vocab.find(v => (v.word || v.hanzi) === w)).filter(Boolean);
    while (pick.length < 4 && vocab[pick.length]) pick.push(vocab[pick.length]);
    const meaningPool = vocab.slice(0, 60).map(v => v.vi).filter(Boolean);
    const steps = pick.map((v, i) => {
      const right = v.vi;
      const wrongs = [];
      for (let k = (i * 7 + 3) % meaningPool.length; wrongs.length < 3 && k < meaningPool.length * 2; k += 5) {
        const m = meaningPool[k % meaningPool.length];
        if (m !== right && !wrongs.includes(m)) wrongs.push(m);
      }
      const options = [right, ...wrongs];
      const rot = i % options.length;
      const shuffled = options.slice(rot).concat(options.slice(0, rot));
      return {
        type: i % 2 === 0 ? 'listen' : 'read',
        word: v.word || v.hanzi,
        phonetic: v.ipa || v.pinyin || '',
        options: shuffled,
        answer: shuffled.indexOf(right)
      };
    });
    let sentences = [];
    if (lang === 'en') {
      sentences = [
        { text: 'Hello, how are you today?', vi: 'Xin chào, hôm nay bạn thế nào?' },
        { text: 'I am fine, thank you.', vi: 'Tôi khỏe, cảm ơn bạn.' }
      ];
    } else {
      sentences = [
        { text: '你好！你好吗？', py: 'Nǐ hǎo! Nǐ hǎo ma?', vi: 'Xin chào! Bạn khỏe không?' },
        { text: '我很好，谢谢！', py: 'Wǒ hěn hǎo, xièxie!', vi: 'Tôi rất khỏe, cảm ơn!' }
      ];
    }
    sentences.forEach((s, i) => steps.push(Object.assign({ type: i === 0 ? 'copy' : 'dictate' }, s)));
    return steps;
  }

  const Tryout = {
    lang: 'en',
    steps: [],
    idx: 0,
    score: 0,
    answered: false,
    el: null,

    mount(el) {
      this.el = el;
      const last = store.get('app_last_lang', 'en');
      this.lang = last === 'zh' ? 'zh' : 'en';
      this.reset();
    },
    reset() {
      this.steps = buildTryout(this.lang);
      this.idx = 0;
      this.score = 0;
      this.answered = false;
      this.render();
    },
    tts() { return this.lang === 'en' ? 'en-US' : 'zh-CN'; },
    say(text, slow) {
      const app = root.app;
      if (app && typeof app.speakText === 'function') app.speakText(text, slow ? 0.6 : null, this.tts());
    },
    render() {
      const el = this.el;
      if (!el) return;
      const total = this.steps.length;
      const head = `
        <div class="pb-try-head">
          <div>
            <span class="hp-eyebrow hp-eyebrow-caps">HỌC THỬ 1 PHÚT</span>
            <h2 class="hp-section-title">Thử ngay, không cần tài khoản</h2>
            <p class="hp-section-sub">6 câu nhỏ: nghe, đọc, chọn nghĩa và gõ lại cả câu. Xong rồi mới quyết định có học tiếp hay không.</p>
          </div>
          <div class="pb-seg" role="tablist" aria-label="Chọn ngôn ngữ học thử">
            <button type="button" role="tab" class="${this.lang === 'en' ? 'is-on' : ''}" data-try-lang="en" aria-selected="${this.lang === 'en'}">Tiếng Anh</button>
            <button type="button" role="tab" class="${this.lang === 'zh' ? 'is-on' : ''}" data-try-lang="zh" aria-selected="${this.lang === 'zh'}">Tiếng Trung</button>
          </div>
        </div>`;
      let body = '';
      if (!total) {
        body = '<p class="pb-muted">Dữ liệu đang tải...</p>';
      } else if (this.idx >= total) {
        const good = this.score >= total - 1;
        body = `
          <div class="pb-try-done">
            <div class="pb-try-score">${this.score}/${total}</div>
            <p>${good ? 'Rất tốt! Bạn đã sẵn sàng cho bài đầu tiên.' : 'Khởi đầu tốt. Lộ trình sẽ dạy lại từng bước thật chậm.'}</p>
            <div class="pb-try-actions">
              <a class="pb-btn pb-btn-primary" href="#${this.lang}/learn">Học bài đầu tiên</a>
              <button type="button" class="pb-btn pb-btn-outline" data-try="account">Tạo tài khoản để lưu tiến độ</button>
              <button type="button" class="pb-btn pb-btn-ghost" data-try="again">Làm lại</button>
            </div>
            <p class="pb-muted pb-small">Không bắt buộc đăng ký. Tiến độ vẫn được lưu trên máy này.</p>
          </div>`;
      } else {
        const st = this.steps[this.idx];
        const dots = this.steps.map((_, i) => `<span class="pb-dot ${i < this.idx ? 'is-done' : ''} ${i === this.idx ? 'is-now' : ''}"></span>`).join('');
        let q = '';
        if (st.type === 'listen' || st.type === 'read') {
          q = `
            <p class="pb-try-q">${st.type === 'listen' ? 'Nghe và chọn nghĩa đúng' : 'Từ này nghĩa là gì?'}</p>
            <div class="pb-try-word">
              ${st.type === 'listen'
                ? `<button type="button" class="pb-play-big" data-try="play" aria-label="Nghe lại">${icon('volume', 28)}</button>`
                : `<span class="pb-try-target" lang="${this.lang}">${esc(st.word)}</span>`}
              ${this.answered || st.type === 'read' ? `<span class="pb-muted">${esc(st.type === 'listen' ? st.word + ' · ' : '')}${esc(st.phonetic)}</span>` : ''}
            </div>
            <div class="pb-try-opts">
              ${st.options.map((o, i) => {
                let cls = '';
                if (this.answered) cls = i === st.answer ? 'is-ok' : (i === this.picked ? 'is-bad' : '');
                return `<button type="button" class="pb-opt ${cls}" data-opt="${i}" ${this.answered ? 'disabled' : ''}>${esc(o)}</button>`;
              }).join('')}
            </div>`;
        } else {
          const showText = st.type === 'copy';
          q = `
            <p class="pb-try-q">${showText ? 'Nghe, nhìn rồi gõ lại cả câu' : 'Nghe rồi gõ lại câu bạn nghe được'}</p>
            <div class="pb-try-word">
              <button type="button" class="pb-play-big" data-try="play" aria-label="Nghe câu">${icon('volume', 28)}</button>
              <button type="button" class="pb-btn pb-btn-ghost pb-small" data-try="slow">Nghe chậm</button>
            </div>
            ${showText || this.answered ? `<div class="pb-try-sentence" lang="${this.lang}">${esc(st.text)}${st.py ? `<div class="pb-muted">${esc(st.py)}</div>` : ''}</div>` : `<div class="pb-muted">Gợi ý nghĩa: ${esc(st.vi)}</div>`}
            <div class="pb-try-input-row">
              <input type="text" class="pb-input" id="pb-try-input" value="${esc(this.answered ? (this.lastInput || '') : '')}" autocomplete="off" autocapitalize="off" spellcheck="false"
                placeholder="${this.lang === 'zh' ? 'Gõ pinyin không cần dấu (ni hao) hoặc chữ Hán' : 'Gõ lại câu tiếng Anh'}" ${this.answered ? 'disabled' : ''}>
              <button type="button" class="pb-btn pb-btn-primary" data-try="check" ${this.answered ? 'disabled' : ''}>Kiểm tra</button>
            </div>
            <div id="pb-try-result">${this.lastCompare ? renderCompare(this.lastCompare) : ''}</div>`;
        }
        body = `
          <div class="pb-try-card">
            <div class="pb-try-progress"><span class="pb-muted pb-small">Câu ${this.idx + 1}/${total}</span><div class="pb-dots">${dots}</div></div>
            ${q}
            ${this.answered ? `<div class="pb-try-next"><span class="${this.lastOk ? 'pb-good' : 'pb-bad'}">${this.lastOk ? 'Chính xác!' : 'Chưa đúng, xem đáp án ở trên.'}</span><button type="button" class="pb-btn pb-btn-primary" data-try="next">${this.idx + 1 >= total ? 'Xem kết quả' : 'Câu tiếp'}</button></div>` : ''}
          </div>`;
      }
      el.innerHTML = head + body;
      this.bind();
      const st = this.steps[this.idx];
      if (st && !this.answered && st.type === 'listen' && this.autoplay) this.say(st.word);
      if (st && !this.answered && (st.type === 'copy' || st.type === 'dictate')) {
        const inp = el.querySelector('#pb-try-input');
        if (inp && this.autoplay) inp.focus();
      }
    },
    bind() {
      const el = this.el;
      el.querySelectorAll('[data-try-lang]').forEach(b => b.addEventListener('click', () => {
        this.lang = b.getAttribute('data-try-lang');
        this.lastCompare = null;
        this.reset();
      }));
      el.querySelectorAll('[data-opt]').forEach(b => b.addEventListener('click', () => {
        const st = this.steps[this.idx];
        this.picked = parseInt(b.getAttribute('data-opt'), 10);
        this.lastOk = this.picked === st.answer;
        if (this.lastOk) this.score++;
        this.answered = true;
        if (st.type === 'read') this.say(st.word);
        this.render();
      }));
      const act = (name, fn) => { const b = el.querySelector(`[data-try="${name}"]`); if (b) b.addEventListener('click', fn); };
      act('play', () => { const st = this.steps[this.idx]; this.say(st.word || st.text); });
      act('slow', () => { const st = this.steps[this.idx]; this.say(st.text, true); });
      act('check', () => this.check());
      act('next', () => { this.idx++; this.answered = false; this.lastCompare = null; this.autoplay = true; this.render(); });
      act('again', () => { this.lastCompare = null; this.reset(); });
      act('account', () => { if (root.PolyAccount && root.PolyAccount.open) root.PolyAccount.open(); });
      const inp = el.querySelector('#pb-try-input');
      if (inp) inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); this.check(); } });
    },
    check() {
      const st = this.steps[this.idx];
      const inp = this.el.querySelector('#pb-try-input');
      if (!inp || !inp.value.trim()) return;
      this.lastInput = inp.value;
      const res = compareSentence(this.lang, st.text, inp.value, { py: st.py });
      this.lastCompare = res;
      this.lastOk = res.ok || res.accuracy >= 90;
      if (this.lastOk) this.score++;
      this.answered = true;
      this.render();
    }
  };

  function contentCounts() {
    const c = {};
    c.zhWords = zhWordList().length;
    c.enWords = enWordList().length;
    const lessons = (cur) => ((cur && cur.levels) || []).reduce((a, l) => a + (l.units || []).reduce((b, u) => b + (u.lessons || []).length, 0), 0);
    c.lessons = lessons(root.CURRICULUM) + lessons(root.EN_CURRICULUM || root.CURRICULUM_EN);
    const arr = (x) => (Array.isArray(x) ? x.length : 0);
    c.dialogues = arr(root.DIALOGUES) + arr(root.EN_DIALOGUES || root.DIALOGUES_EN);
    c.talk = arr(root.TALK_SCENARIOS) + arr(root.EN_TALK_SCENARIOS) + arr(root.TALK_DIALOGUES) + arr(root.EN_TALK_DIALOGUES);
    c.videos = arr(root.VIDEOS_ZH) + arr(root.VIDEOS_EN);
    c.reading = arr(root.READING_ZH) + arr(root.READING_EN);
    return c;
  }

  function aboutHtml() {
    const c = contentCounts();
    const fmt = (n) => Number(n || 0).toLocaleString('vi-VN');
    const stats = [
      { n: c.zhWords + c.enWords, l: 'từ vựng có ví dụ', d: `${fmt(c.zhWords)} từ HSK1 và ${fmt(c.enWords)} từ tiếng Anh` },
      { n: c.lessons, l: 'bài trong Lộ trình', d: 'Nhập môn, HSK1, Starter và A1' },
      { n: c.dialogues + c.talk, l: 'hội thoại và tình huống nói', d: 'Nghe mẫu, đóng vai, nói theo' },
      { n: c.videos >= 5 ? c.videos : 0, l: 'video có phụ đề song ngữ', d: 'Tra từ, nói theo, nghe chép, điền từ' },
      { n: c.reading, l: 'bài đọc và dịch', d: 'Dịch từng câu, chấm theo ý chính' }
    ].filter(s => s.n > 0);
    const faqs = [
      ['Polylingo có mất phí không?', 'Không. Mọi bài học, trò chơi và Vườn đều miễn phí.'],
      ['Có bắt buộc tạo tài khoản không?', 'Không. Tiến độ tự lưu trên máy bạn đang dùng. Tạo tài khoản khi bạn muốn học tiếp trên máy khác hoặc sợ mất dữ liệu.'],
      ['Dữ liệu học của tôi lưu ở đâu?', 'Trên trình duyệt của bạn. Nếu đăng nhập, bản sao được lưu trên máy chủ của Polylingo để đồng bộ. Bạn có thể xuất ra file hoặc xóa tài khoản bất cứ lúc nào.'],
      ['Mỗi ngày nên học bao lâu?', 'Từ 10 đến 20 phút đều đặn tốt hơn một buổi dài rồi bỏ. Đặt mục tiêu phút ở trang Tổng quan của từng ngôn ngữ. Polylingo chỉ đếm lúc bạn đang thao tác.'],
      ['Điểm phát âm và điểm dịch có chính xác không?', 'Đó là điểm ước lượng để bạn tự theo dõi. Điểm phát âm dựa vào nhận giọng nói của trình duyệt, điểm dịch dựa vào các ý chính của câu. Hãy xem đáp án mẫu để tự so.'],
      ['Dùng trên điện thoại được không?', 'Được. Mở bằng trình duyệt, chọn "Thêm vào màn hình chính" để dùng như một ứng dụng, kể cả khi mạng chập chờn.']
    ];
    return `
      <section class="pb-about" aria-label="Vì sao Polylingo giúp nhớ lâu">
        <div class="hp-section-header">
          <span class="hp-eyebrow hp-eyebrow-caps">CÁCH POLYLINGO GIÚP BẠN NHỚ</span>
          <h2 class="hp-section-title">Học ít mỗi ngày, ôn đúng lúc sắp quên</h2>
          <p class="hp-section-sub">Trí nhớ mờ dần sau vài ngày nếu không gặp lại. Mỗi lần ôn đúng lúc, đường quên thoải hơn và bạn nhớ lâu hơn.</p>
        </div>
        <div class="pb-about-grid">
          <figure class="pb-curve">
            <svg viewBox="0 0 320 170" role="img" aria-label="Minh họa: nhớ giảm dần, mỗi lần ôn lại thì giảm chậm hơn">
              <line x1="30" y1="140" x2="310" y2="140" class="pb-axis"/>
              <line x1="30" y1="14" x2="30" y2="140" class="pb-axis"/>
              <path d="M30 20 C60 90 90 115 300 128" class="pb-curve-forget"/>
              <path d="M30 20 C45 55 60 66 75 70 L75 22 C100 55 125 64 150 66 L150 22 C190 45 230 52 300 54" class="pb-curve-review"/>
              <circle cx="75" cy="22" r="4" class="pb-curve-dot"/><circle cx="150" cy="22" r="4" class="pb-curve-dot"/>
              <text x="34" y="156" class="pb-curve-label">Hôm nay</text>
              <text x="250" y="156" class="pb-curve-label">Vài tuần</text>
              <text x="232" y="114" class="pb-curve-label">Không ôn</text>
              <text x="236" y="38" class="pb-curve-label">Có ôn</text>
            </svg>
            <figcaption class="pb-muted pb-small">Hình minh họa nguyên lý, không phải số liệu người học.</figcaption>
          </figure>
          <ol class="pb-steps">
            <li><strong>Học bài nhỏ</strong><span>Mỗi bài 10 đến 15 phút: nghe, nhìn, nói, gõ.</span></li>
            <li><strong>Gõ lại cả câu</strong><span>Tự gõ lại buộc não nhớ lại từng từ, sửa đến khi đúng.</span></li>
            <li><strong>Tự vào kho ôn</strong><span>Từ đã học, từ khó và từ bạn tra được hẹn ôn đúng ngày sắp quên.</span></li>
          </ol>
        </div>
        ${stats.length ? `<div class="pb-stats">${stats.map(s => `<div class="pb-stat"><strong>${fmt(s.n)}</strong><span>${esc(s.l)}</span><em>${esc(s.d)}</em></div>`).join('')}</div>` : ''}
        <div class="pb-faq">
          <h3 class="pb-faq-title">Câu hỏi thường gặp</h3>
          ${faqs.map(([q, a]) => `<details class="pb-faq-item"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
        </div>
      </section>`;
  }

  function todayMiniHtml() {
    const all = StudyTimer.minutesToday();
    const goal = StudyTimer.goal();
    const last = store.get('app_last_lang', 'zh');
    const lang = last === 'en' ? 'en' : 'zh';
    ReviewBank.sync('zh');
    ReviewBank.sync('en');
    const dueZh = ReviewBank.dueCount('zh');
    const dueEn = ReviewBank.dueCount('en');
    return `
      <div class="pb-mini-today">
        <div class="pb-mini-item">
          <div class="pb-ring-wrap pb-ring-sm">${ringSvg(all / goal, 44)}<span class="pb-ring-num">${all}</span></div>
          <div><strong>${all}/${goal} phút</strong><span class="pb-muted pb-small">Phút học hôm nay</span></div>
        </div>
        <a class="pb-mini-item" href="#${dueEn > dueZh ? 'en' : lang}/flashcards?mode=due">
          <span class="pb-mini-icon">${icon('cards', 20)}</span>
          <div><strong>${dueZh + dueEn} từ cần ôn</strong><span class="pb-muted pb-small">Trung ${dueZh} · Anh ${dueEn}</span></div>
        </a>
      </div>`;
  }

  function decoratePortal(container) {
    if (!hasDOM || !container) return;
    const right = container.querySelector('.hp-today-right');
    if (right && !right.querySelector('.pb-mini-today')) right.insertAdjacentHTML('afterbegin', todayMiniHtml());
    const today = container.querySelector('.hp-today-grid');
    if (today && !container.querySelector('#pb-tryout')) {
      const sec = document.createElement('section');
      sec.id = 'pb-tryout';
      sec.className = 'pb-tryout';
      sec.setAttribute('aria-label', 'Học thử');
      today.insertAdjacentElement('afterend', sec);
      Tryout.mount(sec);
    }
    const footer = container.querySelector('.hp-footer');
    if (footer && !container.querySelector('.pb-about')) footer.insertAdjacentHTML('beforebegin', aboutHtml());
  }

  /* ======================================================================
     11. Khởi động
     ====================================================================== */
  function init() {
    if (!hasDOM) return;
    StudyTimer.start();
    StudyTimer.onChange(renderSidebarMinutes);
    Lookup.init();
    renderSidebarMinutes();
  }

  const PolyBoost = {
    TextUtil: { normalizeVi, normalizePinyin, stripMarks, hasCJK, tokenizeEn, tokenizePinyin, localDate, isoDate, esc },
    SentenceCheck: { compare: compareSentence, render: renderCompare, lcsFlags },
    scoreTranslation,
    lookupWord,
    segmentZh,
    enStems,
    ReviewBank,
    StudyTimer,
    addStudySeconds,
    Lookup,
    LevelPick,
    LEVEL_OPTIONS,
    applyLevelSkip,
    buildTryout,
    contentCounts,
    renderLangHome,
    renderSidebarMinutes,
    decoratePortal,
    init
  };

  root.PolyBoost = PolyBoost;
  if (hasDOM) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = PolyBoost;
})();
