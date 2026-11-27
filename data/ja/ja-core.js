/**
 * data/ja/ja-core.js
 * Lõi xử lý tiếng Nhật (không phụ thuộc giao diện, chạy được trong Node để test):
 *  - Đổi Hiragana ⇄ Katakana, kana → romaji (Hepburn), romaji → kana (gõ như bộ gõ IME)
 *  - Chia động từ: ます / ません / ました / て / た / ない
 *  - Đọc từ vựng (data/ja/words-*.js) và Kanji (data/ja/kanji.js), tính âm Hán Việt, gán bài học
 *  - SM-2 cho thẻ ghi nhớ
 * Xuất ra window.JaCore.
 */
if (typeof window === 'undefined') { global.window = global; }

(function () {
  'use strict';

  /* ---------- 1. Kana ---------- */
  const isHiragana = ch => ch >= 'ぁ' && ch <= 'ゖ';
  const isKatakana = ch => ch >= 'ァ' && ch <= 'ヶ';
  const isKana = ch => isHiragana(ch) || isKatakana(ch) || ch === 'ー' || ch === '・';
  const isKanji = ch => /[一-鿿々]/.test(ch);

  function toHiragana(s) {
    return Array.from(String(s || '')).map(ch => isKatakana(ch) ? String.fromCharCode(ch.charCodeAt(0) - 0x60) : ch).join('');
  }
  function toKatakana(s) {
    return Array.from(String(s || '')).map(ch => isHiragana(ch) ? String.fromCharCode(ch.charCodeAt(0) + 0x60) : ch).join('');
  }

  const BASE = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'ゐ': 'i', 'ゑ': 'e', 'を': 'o', 'ん': 'n', 'ゔ': 'vu',
    'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o', 'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo', 'ゎ': 'wa'
  };
  const YOON_SPECIAL = { 'し': 'sh', 'ち': 'ch', 'じ': 'j', 'ぢ': 'j' };
  const SMALL_Y = { 'ゃ': 'a', 'ゅ': 'u', 'ょ': 'o' };
  const SMALL_V = { 'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o' };

  /** Kana → romaji Hepburn (ー kéo dài nguyên âm trước; っ gấp đôi phụ âm; ん trước nguyên âm thành n'). */
  function kanaToRomaji(input) {
    const s = toHiragana(input);
    const chars = Array.from(s);
    let out = '';
    let geminate = false;
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      const next = chars[i + 1];
      if (ch === 'っ') { geminate = true; continue; }
      if (ch === 'ー') {
        const m = out.match(/[aeiou]$/);
        if (m) out += m[0];
        continue;
      }
      let syl;
      if (next && SMALL_Y[next] && BASE[ch] && ch !== 'ん') {
        const head = YOON_SPECIAL[ch] || BASE[ch].slice(0, -1) + 'y';
        syl = head + SMALL_Y[next];
        i++;
      } else if (next && SMALL_V[next] && BASE[ch] && /[うふてでつ]/.test(ch)) {
        const head = { 'う': 'w', 'ふ': 'f', 'て': 't', 'で': 'd', 'つ': 'ts' }[ch];
        syl = head + SMALL_V[next];
        i++;
      } else if (BASE[ch] !== undefined) {
        syl = BASE[ch];
        if (ch === 'ん' && next && (/[あいうえおやゆよ]/.test(next))) syl = "n'";
      } else {
        syl = ch === '　' ? ' ' : ch;
      }
      if (geminate) {
        if (/^ch/.test(syl)) syl = 't' + syl;
        else if (/^[bcdfghjklmpqrstvwxyz]/.test(syl)) syl = syl[0] + syl;
        geminate = false;
      }
      out += syl;
    }
    return out;
  }

  // Bảng romaji → hiragana cho bộ gõ (khóa dài trước)
  const R2K = {};
  Object.entries(BASE).forEach(([k, r]) => {
    if (/[ぁぃぅぇぉゃゅょゎゐゑゔ]/.test(k)) return;
    if (!R2K[r]) R2K[r] = k;
  });
  Object.assign(R2K, {
    'wo': 'を', 'si': 'し', 'ti': 'ち', 'tu': 'つ', 'hu': 'ふ', 'zi': 'じ', 'di': 'ぢ', 'du': 'づ', 'nn': 'ん', "n'": 'ん',
    'ji': 'じ', 'ja': 'じゃ', 'ju': 'じゅ', 'jo': 'じょ', 'je': 'じぇ', 'jya': 'じゃ', 'jyu': 'じゅ', 'jyo': 'じょ',
    'zya': 'じゃ', 'zyu': 'じゅ', 'zyo': 'じょ', 'sha': 'しゃ', 'shu': 'しゅ', 'sho': 'しょ', 'she': 'しぇ',
    'sya': 'しゃ', 'syu': 'しゅ', 'syo': 'しょ', 'cha': 'ちゃ', 'chu': 'ちゅ', 'cho': 'ちょ', 'che': 'ちぇ',
    'tya': 'ちゃ', 'tyu': 'ちゅ', 'tyo': 'ちょ', 'cya': 'ちゃ', 'cyu': 'ちゅ', 'cyo': 'ちょ',
    'fa': 'ふぁ', 'fi': 'ふぃ', 'fe': 'ふぇ', 'fo': 'ふぉ', 'ti-': 'ちー', 'thi': 'てぃ', 'dhi': 'でぃ', 'wi': 'うぃ', 'we': 'うぇ',
    'xa': 'ぁ', 'xi': 'ぃ', 'xu': 'ぅ', 'xe': 'ぇ', 'xo': 'ぉ', 'la': 'ぁ', 'li': 'ぃ', 'lu': 'ぅ', 'le': 'ぇ', 'lo': 'ぉ',
    'xya': 'ゃ', 'xyu': 'ゅ', 'xyo': 'ょ', 'lya': 'ゃ', 'lyu': 'ゅ', 'lyo': 'ょ', 'xtu': 'っ', 'ltu': 'っ', 'xtsu': 'っ', 'ltsu': 'っ',
    '-': 'ー', 'va': 'ゔぁ', 'vi': 'ゔぃ', 'vu': 'ゔ', 've': 'ゔぇ', 'vo': 'ゔぉ'
  });
  ['k', 'g', 'n', 'h', 'b', 'p', 'm', 'r'].forEach(c => {
    const base = { k: 'き', g: 'ぎ', n: 'に', h: 'ひ', b: 'び', p: 'ぴ', m: 'み', r: 'り' }[c];
    R2K[c + 'ya'] = base + 'ゃ'; R2K[c + 'yu'] = base + 'ゅ'; R2K[c + 'yo'] = base + 'ょ';
  });
  const R2K_KEYS = Object.keys(R2K).sort((a, b) => b.length - a.length);
  const R2K_MAX = R2K_KEYS[0].length;

  /**
   * Romaji → hiragana. final=true: chữ n đứng cuối cũng thành ん (dùng khi chấm điểm);
   * final=false: giữ n cuối để người dùng gõ tiếp (dùng khi hiện trực tiếp lúc gõ).
   */
  function romajiToKana(input, final = true, loose = false) {
    const s = String(input || '').toLowerCase();
    let out = '';
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      // Phụ âm đôi → っ (trừ nn)
      if (c !== 'n' && /[bcdfghjklmpqrstvwxyz]/.test(c) && s[i + 1] === c) {
        out += 'っ'; i++; continue;
      }
      if (c === 't' && s.slice(i, i + 3) === 'tch') { out += 'っ'; i++; continue; }
      // n + phụ âm (không phải y, n) → ん
      if (c === 'n') {
        const nx = s[i + 1];
        if (nx === undefined) { if (final) { out += 'ん'; } else { out += 'n'; } i++; continue; }
        if (nx !== 'y' && !/[aeiou']/.test(nx) && nx !== 'n') { out += 'ん'; i++; continue; }
        if (loose && nx === 'n' && /[aeiouy]/.test(s[i + 2] || '')) { out += 'ん'; i++; continue; }
      }
      let matched = false;
      for (let len = Math.min(R2K_MAX, s.length - i); len > 0; len--) {
        const chunk = s.slice(i, i + len);
        if (R2K[chunk]) { out += R2K[chunk]; i += len; matched = true; break; }
      }
      if (!matched) { out += c; i++; }
    }
    return out;
  }

  /** Chuẩn hoá để so đáp án: bỏ khoảng trắng/dấu câu, đổi katakana → hiragana, romaji → kana. */
  function normalizeAnswer(s, loose = false) {
    let t = String(s || '').trim();
    if (/[a-zA-Z]/.test(t)) t = romajiToKana(t.replace(/\s+/g, ''), true, loose);
    t = t.replace(/[\s。、！？!?.,・「」『』（）()〜~]/g, '');
    return toHiragana(t);
  }

  /** Đáp án gõ (romaji hoặc kana) có khớp cách đọc kana không. Chấp nhận cả "konnichiha" lẫn "konnnichiha". */
  function answerMatches(expectedKana, input) {
    const target = normalizeAnswer(expectedKana);
    if (!target) return false;
    return normalizeAnswer(input) === target || normalizeAnswer(input, true) === target;
  }

  /** So từng ký tự (LCS), trả về điểm 0–100 và mảng đúng/sai theo ký tự đích. */
  function compareChars(target, heard) {
    const a = Array.from(normalizeAnswer(target));
    const b = Array.from(normalizeAnswer(heard));
    const n = a.length, m = b.length;
    if (!n) return { score: 0, perChar: [] };
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
    const ok = new Array(n).fill(false);
    let i = n, j = m;
    while (i > 0 && j > 0) {
      if (a[i - 1] === b[j - 1]) { ok[i - 1] = true; i--; j--; }
      else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
      else j--;
    }
    const matched = ok.filter(Boolean).length;
    const extra = Math.max(0, m - matched);
    const score = Math.max(0, Math.round((matched / n) * 100 - (extra / Math.max(n, 1)) * 30));
    return { score: Math.min(100, score), perChar: a.map((ch, k) => ({ ch, ok: ok[k] })) };
  }

  /* ---------- 2. Chia động từ ---------- */
  const U_TO = {
    'う': { i: 'い', a: 'わ', te: 'って', ta: 'った' }, 'く': { i: 'き', a: 'か', te: 'いて', ta: 'いた' },
    'ぐ': { i: 'ぎ', a: 'が', te: 'いで', ta: 'いだ' }, 'す': { i: 'し', a: 'さ', te: 'して', ta: 'した' },
    'つ': { i: 'ち', a: 'た', te: 'って', ta: 'った' }, 'ぬ': { i: 'に', a: 'な', te: 'んで', ta: 'んだ' },
    'ぶ': { i: 'び', a: 'ば', te: 'んで', ta: 'んだ' }, 'む': { i: 'み', a: 'ま', te: 'んで', ta: 'んだ' },
    'る': { i: 'り', a: 'ら', te: 'って', ta: 'った' }
  };
  const FORM_LABELS = { dict: 'Thể từ điển', masu: 'Thể ます', masen: 'Phủ định ません', mashita: 'Quá khứ ました', te: 'Thể て', ta: 'Thể た', nai: 'Thể ない' };

  function conjugateOne(base, pos, form) {
    if (!base) return '';
    if (form === 'dict') return base;
    const stemForms = stem => ({ masu: stem + 'ます', masen: stem + 'ません', mashita: stem + 'ました' });
    if (pos === 'v3') {
      if (/する$/.test(base)) {
        const pre = base.slice(0, -2);
        return Object.assign(stemForms(pre + 'し'), { te: pre + 'して', ta: pre + 'した', nai: pre + 'しない' })[form] || '';
      }
      if (/くる$/.test(base)) {
        const pre = base.slice(0, -2);
        return Object.assign(stemForms(pre + 'き'), { te: pre + 'きて', ta: pre + 'きた', nai: pre + 'こない' })[form] || '';
      }
      if (/来る$/.test(base)) {
        const pre = base.slice(0, -2);
        return Object.assign(stemForms(pre + '来'), { te: pre + '来て', ta: pre + '来た', nai: pre + '来ない' })[form] || '';
      }
    }
    if (pos === 'v2') {
      const stem = base.slice(0, -1);
      return Object.assign(stemForms(stem), { te: stem + 'て', ta: stem + 'た', nai: stem + 'ない' })[form] || '';
    }
    if (pos === 'v1') {
      const last = base.slice(-1);
      const pre = base.slice(0, -1);
      const t = U_TO[last];
      if (!t) return '';
      const isIku = /行く$/.test(base) || /いく$/.test(base);
      const te = isIku ? pre + 'って' : pre + t.te;
      const ta = isIku ? pre + 'った' : pre + t.ta;
      let nai = pre + t.a + 'ない';
      if (base === 'ある') nai = 'ない';
      return Object.assign(stemForms(pre + t.i), { te, ta, nai })[form] || '';
    }
    return '';
  }

  /** Chia động từ cho cả dạng chữ Hán và dạng kana của một từ. */
  function conjugate(word, form) {
    if (!word || !/^v[123]$/.test(word.pos)) return null;
    const kana = conjugateOne(word.kana, word.pos, form);
    const written = word.kanji ? conjugateOne(word.kanji, word.pos, form) : kana;
    return { written, kana, romaji: kanaToRomaji(kana) };
  }

  /* ---------- 3. Từ vựng và Kanji ---------- */
  const POS_LABELS = {
    n: 'danh từ', pron: 'đại từ', q: 'từ để hỏi', num: 'số từ', ctr: 'lượng từ', v1: 'động từ nhóm I', v2: 'động từ nhóm II',
    v3: 'động từ nhóm III', ai: 'tính từ đuôi い', an: 'tính từ đuôi な', adv: 'phó từ', exp: 'cụm từ', conj: 'liên từ'
  };

  function parseKanjiRaw(raw) {
    const list = [];
    String(raw || '').split('\n').forEach(line => {
      line = line.trim();
      if (!line) return;
      const [ch, hv, on, kun, vi, strokes, tip] = line.split('|');
      list.push({ ch, hv, on: on ? on.split('・') : [], kun: kun ? kun.split('・') : [], vi, strokes: parseInt(strokes, 10) || 0, tip: tip || '' });
    });
    return list;
  }

  function buildHanVietMap(kanjiList, extra) {
    const map = Object.assign({}, extra || {});
    (kanjiList || []).forEach(k => { map[k.ch] = k.hv; });
    return map;
  }

  function hanVietOf(text, map) {
    const chars = Array.from(String(text || '')).filter(isKanji);
    if (!chars.length) return '';
    const parts = [];
    chars.forEach(c => { parts.push(c === '々' ? (parts[parts.length - 1] || '?') : (map[c] || '?')); });
    return parts.join(' ');
  }

  /** Đọc các khối từ vựng thô → danh sách từ (bỏ trùng; từ trùng ghi thêm bài ôn lại). */
  function parseWordsRaw(rawBlocks, hvMap) {
    const words = [];
    const byKey = {};
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
        const cols = line.split('|');
        const kanji = (cols[0] || '').trim();
        const kana = (cols[1] || '').trim();
        if (!kana) return;
        const pos = (cols[3] || 'n').trim();
        const key = `${kanji || kana}|${kana}|${pos}`;
        if (byKey[key]) {
          const w = byKey[key];
          if (!w.reviewIn.includes(lesson) && w.lesson !== lesson) w.reviewIn.push(lesson);
          if (!lessonWordIds[lesson].includes(w.id)) lessonWordIds[lesson].push(w.id);
          return;
        }
        let id = kanji || kana;
        if (words.some(x => x.id === id)) id = `${id}_${pos}`;
        const w = {
          id,
          word: kanji || kana,
          kanji,
          kana,
          romaji: kanaToRomaji(kana),
          vi: (cols[2] || '').trim(),
          pos,
          posLabel: POS_LABELS[pos] || pos,
          lesson,
          topic: `l${lesson}`,
          topicName: lessonTitles[lesson] || `Bài ${lesson}`,
          hanViet: kanji ? hanVietOf(kanji, hvMap || {}) : '',
          ex: cols[4] ? { ja: cols[4].trim(), vi: (cols[5] || '').trim() } : null,
          reviewIn: []
        };
        byKey[key] = w;
        words.push(w);
        lessonWordIds[lesson].push(w.id);
      });
    });
    return { words, lessonTitles, lessonWordIds };
  }

  /** Gắn bài học đầu tiên có từ chứa chữ đó, và tối đa 4 từ ví dụ cho mỗi Kanji. */
  function attachKanjiLessons(kanjiList, words) {
    kanjiList.forEach(k => {
      const ex = words.filter(w => w.kanji && w.kanji.includes(k.ch));
      k.examples = ex.slice(0, 4).map(w => ({ id: w.id, word: w.word, kana: w.kana, vi: w.vi }));
      k.lesson = ex.length ? Math.min(...ex.map(w => w.lesson)) : 35;
    });
    return kanjiList;
  }

  /* ---------- 4. SM-2 ---------- */
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

  /* ---------- 5. Gom dữ liệu khi chạy trên web ---------- */
  let cache = null;
  function load() {
    if (cache) return cache;
    const w = typeof window !== 'undefined' ? window : {};
    const kanji = parseKanjiRaw(w.JA_KANJI_RAW || '');
    const hvMap = buildHanVietMap(kanji, w.JA_HANVIET_EXTRA || {});
    const parsed = parseWordsRaw(w.JA_WORDS_RAW || [], hvMap);
    attachKanjiLessons(kanji, parsed.words);
    const curr = w.JA_CURRICULUM || { lessons: [] };
    const lessons = (curr.lessons || []).map(l => Object.assign({}, l, {
      wordIds: parsed.lessonWordIds[l.no] || [],
      kanjiChars: kanji.filter(k => k.lesson === l.no).map(k => k.ch)
    }));
    const wordMap = {};
    parsed.words.forEach(x => { wordMap[x.id] = x; });
    cache = { words: parsed.words, wordMap, kanji, hvMap, lessons, curriculum: curr, kana: w.JA_KANA || null };
    // Bản đồ JA_WORDS theo id để các module dùng chung (kho ôn, tra từ) đọc như EN_WORDS
    w.JA_WORDS = wordMap;
    return cache;
  }

  const JaCore = {
    isHiragana, isKatakana, isKana, isKanji, toHiragana, toKatakana, kanaToRomaji, romajiToKana,
    normalizeAnswer, answerMatches, compareChars, conjugate, conjugateOne, FORM_LABELS, POS_LABELS,
    parseKanjiRaw, buildHanVietMap, hanVietOf, parseWordsRaw, attachKanjiLessons, sm2, load,
    _reset() { cache = null; }
  };

  if (typeof window !== 'undefined') window.JaCore = JaCore;
  if (typeof module !== 'undefined' && module.exports) module.exports = JaCore;
})();
