/**
 * practice.js - Module Luyện tập theo bài học với 10 dạng bài (Polylingo Lesson Practice)
 * Web học ngoại ngữ đa ngôn ngữ cho người Việt (HTML/CSS/JS thuần, không framework)
 * Hỗ trợ đa ngôn ngữ: zh (Tiếng Trung HSK) & en (Tiếng Anh CEFR)
 * Tương thích cả trình duyệt và Node.js test runner.
 */

(function () {
  'use strict';

  // Thiết lập global.window an toàn trong môi trường Node.js
  if (typeof window === 'undefined') {
    global.window = typeof globalThis !== 'undefined' ? globalThis : {};
  }

  /* ==========================================================================
     0. BIỂU TƯỢNG SVG NỘI TUYẾN KIỂU LUCIDE (Stroke 2px, Round caps, Aria-label)
     Lấy từ window.PolyIcons nếu có sẵn, giữ bản dự phòng FALLBACK_ICONS cho Node test
     ========================================================================== */

  const FALLBACK_ICONS = {
    arrowLeft: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Quay lại" role="img"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Tiếp tục" role="img"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
    close: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Đóng" role="img"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    check: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Chính xác" role="img"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    x: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Chưa đúng" role="img"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    speaker: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Phát âm" role="img"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`,
    speakerSlow: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Phát âm chậm 0.7x" role="img"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
    mic: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Micro" role="img"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
    micOff: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Tắt micro" role="img"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
    sparkle: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Luyện tập" role="img"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"></path></svg>`,
    trophy: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Thành tích" role="img"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34"></path><path d="M6 2h12v7a6 6 0 0 1-12 0V2z"></path></svg>`,
    clock: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Thời gian" role="img"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    repeat: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Lặp lại" role="img"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>`,
    bookOpen: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Kiểm tra nghĩa" role="img"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
    spellCheck: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Kiểm tra từ" role="img"><path d="m6 16 6-12 6 12"></path><path d="M8 12h8"></path><path d="m16 20 2 2 4-4"></path></svg>`,
    languages: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Pinyin / Phiên âm" role="img"><path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></svg>`,
    arrowLeftRight: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Nối từ" role="img"><polyline points="8 4 4 8 8 12"></polyline><polyline points="16 12 20 16 16 20"></polyline><line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></svg>`,
    layoutGrid: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Bộ thủ / Cấu tạo" role="img"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    penTool: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Thứ tự nét" role="img"><path d="m12 19 7-7 3 3-7 7-3-3z"></path><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="m2 2 7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`,
    keyboard: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Gõ từ" role="img"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="6" y1="8" x2="6" y2="8"></line><line x1="10" y1="8" x2="10" y2="8"></line><line x1="14" y1="8" x2="14" y2="8"></line><line x1="18" y1="8" x2="18" y2="8"></line><line x1="6" y1="12" x2="6" y2="12"></line><line x1="10" y1="12" x2="10" y2="12"></line><line x1="14" y1="12" x2="14" y2="12"></line><line x1="18" y1="12" x2="18" y2="12"></line><line x1="7" y1="16" x2="17" y2="16"></line></svg>`,
    shuffle: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Tổng hợp" role="img"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>`,
    headphones: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Nghe chép câu" role="img"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
    lightbulb: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Gợi ý" role="img"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>`
  };

  const ICONS = (function () {
    const hasPoly = typeof window !== 'undefined' && window.PolyIcons && typeof window.PolyIcons.svg === 'function';
    const base = Object.assign({}, FALLBACK_ICONS);
    if (hasPoly) {
      for (const key of Object.keys(FALLBACK_ICONS)) {
        if (window.PolyIcons.has(key)) {
          base[key] = window.PolyIcons.svg(key);
        }
      }
    }
    return new Proxy(base, {
      get(target, prop) {
        if (typeof prop === 'string') {
          if (typeof window !== 'undefined' && window.PolyIcons && window.PolyIcons.has(prop)) {
            return window.PolyIcons.svg(prop);
          }
        }
        return target[prop];
      }
    });
  })();

  /* ==========================================================================
     1. CẤU HÌNH 10 DẠNG BÀI TẬP (PRACTICE TYPES CONFIGURATION)
     ========================================================================== */

  const PRACTICE_TYPES = {
    meaning: {
      id: 'meaning',
      name: 'Kiểm tra nghĩa',
      nameEn: 'Kiểm tra nghĩa',
      desc: 'Chữ Hán + Pinyin → Chọn nghĩa tiếng Việt chính xác',
      descEn: 'Từ tiếng Anh + IPA → Chọn nghĩa tiếng Việt chính xác',
      iconKey: 'bookOpen'
    },
    word: {
      id: 'word',
      name: 'Kiểm tra từ vựng',
      nameEn: 'Kiểm tra từ vựng',
      desc: 'Nghĩa tiếng Việt → Nhận diện chữ Hán tương ứng',
      descEn: 'Nghĩa tiếng Việt → Chọn từ tiếng Anh tương ứng',
      iconKey: 'spellCheck'
    },
    pinyin: {
      id: 'pinyin',
      aliasEn: 'ipa',
      name: 'Kiểm tra Pinyin',
      nameEn: 'Kiểm tra IPA',
      desc: 'Chữ Hán → Chọn Pinyin đúng (phân biệt thanh điệu)',
      descEn: 'Ký hiệu IPA → Nhận diện từ tiếng Anh chuẩn xác',
      iconKey: 'languages'
    },
    pronunciation: {
      id: 'pronunciation',
      name: 'Luyện phát âm AI',
      nameEn: 'Luyện phát âm AI',
      desc: 'Đọc to từ vựng qua micro với nhận diện giọng nói zh-CN',
      descEn: 'Đọc to từ tiếng Anh qua micro với nhận diện chuẩn en-US',
      iconKey: 'mic'
    },
    matching: {
      id: 'matching',
      name: 'Nối từ 2 cột',
      nameEn: 'Nối từ 2 cột',
      desc: 'Ghép 5 cặp chữ Hán ↔ nghĩa tiếng Việt trên 2 cột',
      descEn: 'Ghép 5 cặp từ tiếng Anh ↔ nghĩa tiếng Việt trên 2 cột',
      iconKey: 'arrowLeftRight'
    },
    radical: {
      id: 'radical',
      aliasEn: 'stress',
      name: 'Chọn bộ thủ & Chiết tự',
      nameEn: 'Chọn trọng âm từ',
      desc: 'Xác định bộ thủ chính xác, xem chiết tự và mẹo nhớ',
      descEn: 'Nhận biết âm tiết mang trọng âm chính (ˈ) qua IPA',
      iconKey: 'layoutGrid'
    },
    stroke: {
      id: 'stroke',
      aliasEn: 'spelling',
      name: 'Luyện thứ tự nét',
      nameEn: 'Chính tả (Nghe & Viết)',
      desc: 'Viết theo thứ tự nét chuẩn với HanziWriter quiz',
      descEn: 'Nghe phát âm từ tiếng Anh và gõ chính xác chính tả',
      iconKey: 'penTool'
    },
    typing: {
      id: 'typing',
      name: 'Gõ từ phản xạ',
      nameEn: 'Gõ từ từ nghĩa',
      desc: 'Nghe âm + xem nghĩa rồi gõ Pinyin (nhận cả số & không dấu)',
      descEn: 'Xem nghĩa tiếng Việt và gõ từ vựng tiếng Anh tương ứng',
      iconKey: 'keyboard'
    },
    mixed: {
      id: 'mixed',
      name: 'Luyện tập tổng hợp',
      nameEn: 'Luyện tập tổng hợp',
      desc: 'Trộn ngẫu nhiên các dạng câu hỏi thử thách toàn diện',
      descEn: 'Bộ câu hỏi kết hợp đa dạng kiểm tra mọi kỹ năng',
      iconKey: 'shuffle'
    },
    dictation: {
      id: 'dictation',
      name: 'Nghe chép câu ví dụ',
      nameEn: 'Nghe chép câu ví dụ',
      desc: 'Nghe câu đời thường (nút chậm) và sắp xếp các từ thành câu',
      descEn: 'Nghe câu hoàn chỉnh tiếng Anh và ghép đúng thứ tự từ',
      iconKey: 'headphones'
    }
  };

  /* ==========================================================================
     2. NẠP DỮ LIỆU AN TOÀN TRÊN NODE.JS & TRÌNH DUYỆT
     ========================================================================== */

  let nodeZhWords = null;
  let nodeEnWords = null;
  let nodeCurriculum = null;
  let nodeCharDecomp = null;
  let nodeRadicals = null;
  let nodeExamplesExtra = null;
  let nodeSpeak = null;

  if (typeof require !== 'undefined') {
    try {
      const ha = require('./data/zh/hsk1-words-a.js');
      const hb = require('./data/zh/hsk1-words-b.js');
      nodeZhWords = Object.assign({}, window.HSK1_WORDS || ha.HSK1_WORDS || ha, hb.HSK1_WORDS || hb);
    } catch (_) {}
    try {
      const wa = require('./data/en/words-a.js');
      const wb = require('./data/en/words-b.js');
      nodeEnWords = Object.assign({}, window.EN_WORDS || wa.EN_WORDS || wa, wb.EN_WORDS || wb);
    } catch (_) {}
    try {
      nodeCurriculum = require('./data/zh/curriculum.js');
    } catch (_) {}
    try {
      require('./data/zh/char-decomp.js');
      nodeCharDecomp = window.CHAR_DECOMP;
    } catch (_) {}
    try {
      require('./data/zh/radicals.js');
      nodeRadicals = window.RADICALS;
    } catch (_) {}
    try {
      require('./data/zh/examples-extra.js');
      nodeExamplesExtra = window.ZH_EXAMPLES_EXTRA;
    } catch (_) {}
    try {
      nodeSpeak = require('./speak.js');
    } catch (_) {}
  }

  function getGlobalData(key) {
    if (typeof window !== 'undefined' && window[key]) return window[key];
    if (key === 'CHAR_DECOMP') return nodeCharDecomp || {};
    if (key === 'RADICALS') return nodeRadicals || [];
    if (key === 'ZH_EXAMPLES_EXTRA') return nodeExamplesExtra || {};
    if (key === 'HSK1_WORDS') return nodeZhWords || {};
    if (key === 'EN_WORDS') return nodeEnWords || {};
    if (key === 'CURRICULUM') return nodeCurriculum || {};
    return null;
  }

  /* ==========================================================================
     3. PURE HELPER FUNCTIONS: GIẢI MÃ, LỌC TỪ & TẠO BỘ NHIỄU
     ========================================================================== */

  /**
   * Giải mã từ vựng an toàn theo cấu trúc chuẩn của Polylingo
   */
  function resolvePracticeWord(rawKey, dict, lang = 'zh') {
    if (!rawKey) return null;
    if (typeof rawKey === 'object' && rawKey.vi && (rawKey.hanzi || rawKey.word)) {
      return {
        hanzi: rawKey.hanzi || rawKey.word,
        word: rawKey.word || rawKey.hanzi,
        pinyin: rawKey.pinyin || rawKey.py || rawKey.ipa || '',
        ipa: rawKey.ipa || '',
        vi: rawKey.vi || '',
        hanViet: rawKey.hanViet || rawKey.hv || '',
        pos: rawKey.pos || '',
        note: rawKey.note || '',
        ex: rawKey.ex || null
      };
    }

    const key = typeof rawKey === 'string' ? rawKey.trim() : (rawKey.word || rawKey.hanzi || '');
    if (!key) return null;

    if (typeof window !== 'undefined' && window.LearnPath && typeof window.LearnPath.resolveWord === 'function') {
      try {
        const res = window.LearnPath.resolveWord(key, dict);
        if (res && res.vi) return res;
      } catch (_) {}
    }

    if (lang === 'en') {
      const enDict = dict || getGlobalData('EN_WORDS') || {};
      const ew = enDict[key] || enDict[key.toLowerCase()];
      if (ew) {
        return {
          hanzi: ew.word || key,
          word: ew.word || key,
          pinyin: ew.ipa || '',
          ipa: ew.ipa || '',
          vi: ew.vi || '',
          hanViet: '',
          pos: ew.pos || '',
          note: ew.note || '',
          ex: ew.ex ? { zh: ew.ex.en, en: ew.ex.en, py: ew.ipa || '', vi: ew.ex.vi || '' } : null
        };
      }
    } else {
      const zhDict = dict || getGlobalData('HSK1_WORDS') || {};
      const zw = zhDict[key];
      if (zw) {
        return {
          hanzi: key,
          word: key,
          pinyin: zw.py || zw.pinyin || '',
          ipa: '',
          vi: zw.vi || '',
          hanViet: zw.hv || zw.hanViet || '',
          pos: zw.pos || '',
          note: zw.note || '',
          ex: zw.ex || (zw.example ? { zh: zw.example.zh, py: zw.example.py, vi: zw.example.vi } : null)
        };
      }
    }

    return {
      hanzi: key,
      word: key,
      pinyin: '',
      ipa: '',
      vi: key,
      hanViet: '',
      pos: '',
      note: '',
      ex: null
    };
  }

  /**
   * Lấy danh sách từ đầy đủ của bài học
   */
  function resolveLessonWords(lesson, wordsDict = null, lang = 'zh') {
    if (!lesson) return [];
    const list = lesson.newWords || lesson.words || [];
    return list.map(item => resolvePracticeWord(item, wordsDict, lang)).filter(Boolean);
  }

  /**
   * Lọc danh sách từ theo phạm vi: 'all' (Toàn bài), 'hard' (Từ hay nhầm), 'learned' (Từ đã học)
   */
  function filterPracticeWords(words, scope = 'all', progress = null) {
    if (!Array.isArray(words) || words.length === 0) {
      return { words: [], isEmpty: true, message: 'Bài học chưa có từ vựng nào.' };
    }

    const prog = progress || { hardWords: {}, learnedWords: {}, lessons: {} };
    const hardMap = prog.hardWords || {};
    const learnedMap = prog.learnedWords || {};

    if (scope === 'hard') {
      const filtered = words.filter(w => {
        const key = w.hanzi || w.word;
        return (hardMap[key] || 0) > 0;
      });
      if (filtered.length === 0) {
        return {
          words: [],
          isEmpty: true,
          message: 'Chưa có từ hay nhầm trong bài này! Bạn có thể chọn "Toàn bài" để bắt đầu luyện tập.'
        };
      }
      return { words: filtered, isEmpty: false, message: '' };
    }

    if (scope === 'learned') {
      const filtered = words.filter(w => {
        const key = w.hanzi || w.word;
        return !!learnedMap[key];
      });
      if (filtered.length === 0) {
        return {
          words: [],
          isEmpty: true,
          message: 'Chưa có từ nào được đánh dấu đã học trong bài này! Hãy học nhóm từ trước hoặc chọn "Toàn bài".'
        };
      }
      return { words: filtered, isEmpty: false, message: '' };
    }

    return { words: words.slice(), isEmpty: false, message: '' };
  }

  /**
   * Xáo trộn mảng ngẫu nhiên (Fisher-Yates)
   */
  function shuffleArray(arr) {
    const res = arr.slice();
    for (let i = res.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = res[i];
      res[i] = res[j];
      res[j] = tmp;
    }
    return res;
  }

  /**
   * Sinh danh sách Pinyin nhiễu: cùng âm khác thanh điệu, hoặc lấy từ từ điển/bài học
   */
  const TONE_MAP_REPLACEMENTS = {
    'ā': ['á', 'ǎ', 'à', 'a'], 'á': ['ā', 'ǎ', 'à', 'a'], 'ǎ': ['ā', 'á', 'à', 'a'], 'à': ['ā', 'á', 'ǎ', 'a'],
    'ō': ['ó', 'ǒ', 'ò', 'o'], 'ó': ['ō', 'ǒ', 'ò', 'o'], 'ǒ': ['ō', 'ó', 'ò', 'o'], 'ò': ['ō', 'ó', 'ǒ', 'o'],
    'ē': ['é', 'ě', 'è', 'e'], 'é': ['ē', 'ě', 'è', 'e'], 'ě': ['ē', 'é', 'è', 'e'], 'è': ['ē', 'é', 'ě', 'e'],
    'ī': ['í', 'ǐ', 'ì', 'i'], 'í': ['ī', 'ǐ', 'ì', 'i'], 'ǐ': ['ī', 'í', 'ì', 'i'], 'ì': ['ī', 'í', 'ǐ', 'i'],
    'ū': ['ú', 'ǔ', 'ù', 'u'], 'ú': ['ū', 'ǔ', 'ù', 'u'], 'ǔ': ['ū', 'ú', 'ù', 'u'], 'ù': ['ū', 'ú', 'ǔ', 'u'],
    'ǖ': ['ǘ', 'ǚ', 'ǜ', 'ü'], 'ǘ': ['ǖ', 'ǚ', 'ǜ', 'ü'], 'ǚ': ['ǖ', 'ǘ', 'ǜ', 'ü'], 'ǜ': ['ǖ', 'ǘ', 'ǚ', 'ü']
  };

  function mutatePinyinTone(py) {
    if (!py || typeof py !== 'string') return '';
    const chars = Array.from(py);
    const candidateIndices = [];
    chars.forEach((c, i) => {
      if (TONE_MAP_REPLACEMENTS[c]) candidateIndices.push(i);
    });

    if (candidateIndices.length === 0) return '';
    const idx = candidateIndices[candidateIndices.length - 1];
    const originalChar = chars[idx];
    const replacements = TONE_MAP_REPLACEMENTS[originalChar];
    const newChar = replacements[Math.floor(Math.random() * replacements.length)];
    chars[idx] = newChar;
    return chars.join('');
  }

  function generatePinyinDistractors(targetWord, allWords = [], count = 3) {
    const targetPy = (targetWord.pinyin || targetWord.py || '').trim();
    const set = new Set();
    const result = [];

    // 1. Sinh biến thể khác thanh
    let attempts = 0;
    while (result.length < count && attempts < 10) {
      attempts++;
      const mutated = mutatePinyinTone(targetPy);
      if (mutated && mutated !== targetPy && !set.has(mutated)) {
        set.add(mutated);
        result.push(mutated);
      }
    }

    // 2. Bổ sung từ danh sách từ trong bài hoặc từ điển
    const pool = (allWords && allWords.length > 0) ? allWords : Object.values(getGlobalData('HSK1_WORDS') || {});
    for (const w of shuffleArray(pool)) {
      if (result.length >= count) break;
      const py = (w.pinyin || w.py || '').trim();
      if (py && py !== targetPy && !set.has(py)) {
        set.add(py);
        result.push(py);
      }
    }

    // 3. Fallback an toàn nếu kho từ quá ít
    const fallbacks = ['nǐ', 'hǎo', 'wǒ', 'shì', 'xièxie', 'zàijiàn', 'qǐng', 'duì', 'bù'];
    for (const fb of fallbacks) {
      if (result.length >= count) break;
      if (fb !== targetPy && !set.has(fb)) {
        set.add(fb);
        result.push(fb);
      }
    }

    return result.slice(0, count);
  }

  function generateMeaningDistractors(targetWord, allWords = [], count = 3) {
    const targetVi = (targetWord.vi || '').trim();
    const targetPos = targetWord.pos || '';
    const set = new Set();
    const result = [];

    // Ưu tiên từ cùng từ loại (pos) trong kho
    const pool = (allWords && allWords.length > 0) ? allWords : Object.values(getGlobalData('HSK1_WORDS') || {});
    const samePosWords = targetPos ? pool.filter(w => w.pos === targetPos && (w.vi || '').trim() !== targetVi) : [];

    for (const w of shuffleArray(samePosWords)) {
      if (result.length >= count) break;
      const vi = (w.vi || '').trim();
      if (vi && vi !== targetVi && !set.has(vi)) {
        set.add(vi);
        result.push(vi);
      }
    }

    for (const w of shuffleArray(pool)) {
      if (result.length >= count) break;
      const vi = (w.vi || '').trim();
      if (vi && vi !== targetVi && !set.has(vi)) {
        set.add(vi);
        result.push(vi);
      }
    }

    const fallbackMeanings = ['xin chào', 'tạm biệt', 'cảm ơn', 'tốt, khỏe', 'tôi, mình', 'bạn, anh, chị', 'là, phải', 'không'];
    for (const fb of fallbackMeanings) {
      if (result.length >= count) break;
      if (fb !== targetVi && !set.has(fb)) {
        set.add(fb);
        result.push(fb);
      }
    }

    return result.slice(0, count);
  }

  function generateWordDistractors(targetWord, allWords = [], count = 3, lang = 'zh') {
    const targetKey = (targetWord.hanzi || targetWord.word || '').trim();
    const set = new Set();
    const result = [];

    const pool = (allWords && allWords.length > 0)
      ? allWords
      : Object.values(lang === 'en' ? (getGlobalData('EN_WORDS') || {}) : (getGlobalData('HSK1_WORDS') || {}));

    for (const w of shuffleArray(pool)) {
      if (result.length >= count) break;
      const k = (w.hanzi || w.word || '').trim();
      if (k && k !== targetKey && !set.has(k)) {
        set.add(k);
        result.push(k);
      }
    }

    const fallbacksZh = ['你', '好', '我', '他', '她', '们', '是', '不', '很'];
    const fallbacksEn = ['hello', 'good', 'morning', 'thank', 'you', 'nice', 'welcome', 'see'];
    const fallbacks = lang === 'en' ? fallbacksEn : fallbacksZh;

    for (const fb of fallbacks) {
      if (result.length >= count) break;
      if (fb !== targetKey && !set.has(fb)) {
        set.add(fb);
        result.push(fb);
      }
    }

    return result.slice(0, count);
  }

  /**
   * Lấy chiết tự và thông tin bộ thủ từ CHAR_DECOMP
   */
  function getWordRadicalInfo(charOrWord, charDecomp = null, radicalsList = null) {
    const decompDict = charDecomp || getGlobalData('CHAR_DECOMP') || {};
    const radList = radicalsList || getGlobalData('RADICALS') || [];

    if (!charOrWord) return null;
    const str = typeof charOrWord === 'string' ? charOrWord.trim() : (charOrWord.hanzi || charOrWord.word || '');
    if (!str) return null;

    // Tìm chữ Hán hợp lệ trong chuỗi
    let targetChar = '';
    for (const ch of Array.from(str)) {
      if (decompDict[ch]) {
        targetChar = ch;
        break;
      }
    }
    if (!targetChar) targetChar = Array.from(str)[0];

    const decomp = decompDict[targetChar] || {
      py: '',
      hv: '',
      meaning: '',
      strokes: 0,
      structure: 'độc thể',
      parts: [],
      radical: targetChar,
      mnemonic: 'Chữ Hán căn bản.'
    };

    const radChar = decomp.radical || targetChar;
    const radDetail = radList.find(r => r.r === radChar || r.alt === radChar);

    return {
      char: targetChar,
      radical: radChar,
      radicalVi: radDetail ? `${radDetail.vi} (${radDetail.py})` : (decomp.hv || 'Bộ thủ chuẩn'),
      structure: decomp.structure || 'hợp thể',
      parts: decomp.parts || [],
      strokes: decomp.strokes || 0,
      mnemonic: decomp.mnemonic || 'Mẹo nhớ: Quan sát cấu tạo nét và bộ thủ để ghi nhớ sâu sắc.',
      meaning: decomp.meaning || ''
    };
  }

  function generateRadicalDistractors(correctRadical, radicalsList = null, charDecomp = null, count = 3) {
    const radList = radicalsList || getGlobalData('RADICALS') || [];
    const set = new Set();
    const result = [];

    for (const rad of shuffleArray(radList)) {
      if (result.length >= count) break;
      const r = rad.r || rad.alt || '';
      if (r && r !== correctRadical && !set.has(r)) {
        set.add(r);
        result.push({
          radical: r,
          radicalVi: `${rad.vi} (${rad.py})`
        });
      }
    }

    const fallbacks = [
      { radical: '亻', radicalVi: 'người (nhân)' },
      { radical: '口', radicalVi: 'miệng (khẩu)' },
      { radical: '女', radicalVi: 'phụ nữ (nữ)' },
      { radical: '氵', radicalVi: 'nước (thủy)' },
      { radical: '木', radicalVi: 'cây gỗ (mộc)' }
    ];

    for (const fb of fallbacks) {
      if (result.length >= count) break;
      if (fb.radical !== correctRadical && !set.has(fb.radical)) {
        set.add(fb.radical);
        result.push(fb);
      }
    }

    return result.slice(0, count);
  }

  /**
   * Lấy thông tin trọng âm và tách âm tiết từ phiên âm IPA & từ vựng tiếng Anh
   */
  const IPA_VOWEL_REGEX = /iː|uː|ɑː|ɔː|ɜː|eɪ|aɪ|ɔɪ|aʊ|oʊ|əʊ|ɪə|eə|ʊə|ɪ|i|e|æ|ɒ|ʊ|u|ʌ|ə|ɑ|ɔ/g;

  function countIpaSyllables(ipa) {
    if (!ipa || typeof ipa !== 'string') return 0;
    const clean = ipa.replace(/^\/|\/$/g, '').trim();
    const vowelMatches = clean.match(IPA_VOWEL_REGEX) || [];
    const syllabicCons = clean.match(/([bdfɡkpstvzʃʒθð])([lnm])(?=[^a-zæɑɔəɜɪʊʌ]|$)/g) || [];
    return vowelMatches.length + syllabicCons.length;
  }

  function splitWordSyllables(word) {
    if (!word || typeof word !== 'string') return [];
    if (typeof window !== 'undefined' && typeof window.splitEnglishWordSyllables === 'function') {
      try {
        const res = window.splitEnglishWordSyllables(word);
        if (Array.isArray(res) && res.length > 0) return res;
      } catch (_) {}
    }
    if (nodeSpeak && typeof nodeSpeak.splitEnglishWordSyllables === 'function') {
      try {
        const res = nodeSpeak.splitEnglishWordSyllables(word);
        if (Array.isArray(res) && res.length > 0) return res;
      } catch (_) {}
    }
    const clean = word.toLowerCase().trim();
    if (clean.includes('-')) return clean.split('-').filter(Boolean);
    const VOWELS = /[aeiouy]+/g;
    const vowelMatches = [];
    let match;
    while ((match = VOWELS.exec(clean)) !== null) {
      vowelMatches.push({ start: match.index, end: match.index + match[0].length });
    }
    if (vowelMatches.length <= 1) return [clean];
    const syls = [];
    let prevCut = 0;
    for (let k = 0; k < vowelMatches.length - 1; k++) {
      const v1End = vowelMatches[k].end;
      const v2Start = vowelMatches[k + 1].start;
      const consLen = v2Start - v1End;
      const cut = consLen <= 1 ? v1End : v1End + Math.floor(consLen / 2);
      syls.push(clean.slice(prevCut, cut));
      prevCut = cut;
    }
    syls.push(clean.slice(prevCut));
    return syls;
  }

  function getWordStressInfo(wordObj) {
    if (!wordObj) return { word: '', ipa: '', stressIndex: 1, totalSyllables: 1, syllables: [] };
    const w = (wordObj.word || wordObj.hanzi || '').trim();
    const ipa = (wordObj.ipa || '').trim();

    if (!ipa) return { word: w, ipa: '', stressIndex: 1, totalSyllables: 1, syllables: [w] };

    const clean = ipa.replace(/^\/|\/$/g, '').trim();
    let stressIndex = 1;
    if (clean.includes('ˈ')) {
      const before = clean.split('ˈ')[0];
      const matches = before.match(IPA_VOWEL_REGEX);
      stressIndex = (matches ? matches.length : 0) + 1;
    }

    const syls = splitWordSyllables(w);
    const ipaSylCount = countIpaSyllables(clean);
    const totalSyllables = clean.includes('ˈ')
      ? Math.max(stressIndex, ipaSylCount, syls.length || 1)
      : Math.max(ipaSylCount, syls.length || 1);

    return {
      word: w,
      ipa: ipa,
      stressIndex: stressIndex,
      totalSyllables: totalSyllables,
      syllables: syls
    };
  }

  /**
   * Chấm điểm Pinyin nhập vào (hỗ trợ có dấu, không dấu, số thanh, v/u:)
   */
  function gradePinyinInput(input, targetPinyin, hanzi = '') {
    if (!input || !targetPinyin) return false;
    const cleanIn = input.trim().toLowerCase();
    const cleanTar = targetPinyin.trim().toLowerCase();

    if (cleanIn === cleanTar) return true;

    if (typeof window !== 'undefined' && window.LearnPath && typeof window.LearnPath.comparePinyin === 'function') {
      try {
        const lpRes = window.LearnPath.comparePinyin(cleanIn, cleanTar, hanzi);
        if (lpRes) return true;
      } catch (_) {}
    }

    if (typeof window !== 'undefined' && window.TypingPractice && typeof window.TypingPractice.compareInputToTarget === 'function') {
      try {
        const tpRes = window.TypingPractice.compareInputToTarget(cleanIn, cleanTar, 'no_tone', hanzi);
        if (tpRes && tpRes.isAllCorrect) return true;
      } catch (_) {}
    }

    // Chuẩn hóa và so khớp bỏ thanh điệu (hỗ trợ v = ü = u, u: = u, số thanh 1-5)
    const stripTone = (s) => s.toLowerCase()
      .replace(/v/g, 'u')
      .replace(/u:/g, 'u')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[1-5]/g, '')
      .replace(/[\s,\.!\?_'-]+/g, '');

    return stripTone(cleanIn) === stripTone(cleanTar);
  }

  /**
   * Chấm điểm cặp nối từ 2 cột
   */
  function gradeMatchPair(card1, card2) {
    if (!card1 || !card2) return false;
    if (card1.type === card2.type) return false;
    return card1.pairId === card2.pairId;
  }

  /* ==========================================================================
     4. TẠO CÂU HỎI CHO TỪNG DẠNG BÀI (QUESTION GENERATOR)
     ========================================================================== */

  function generateQuizQuestions(wordsList, practiceType, lang = 'zh', options = {}) {
    if (!Array.isArray(wordsList) || wordsList.length === 0) return [];
    const count = options.limit || Math.min(10, wordsList.length);
    const targetWords = shuffleArray(wordsList).slice(0, count);
    const allWords = wordsList;

    let type = practiceType;
    if (lang === 'en') {
      if (type === 'pinyin') type = 'ipa';
      if (type === 'radical') type = 'stress';
      if (type === 'stroke') type = 'spelling';
    }

    const questions = [];

    // Hỗ trợ dạng i (Luyện tập tổng hợp)
    if (type === 'mixed') {
      const allowedSubTypes = lang === 'en'
        ? ['meaning', 'word', 'ipa', 'stress', 'spelling', 'typing', 'matching']
        : ['meaning', 'word', 'pinyin', 'radical', 'typing', 'matching', 'stroke'];

      targetWords.forEach((tw, idx) => {
        const subType = allowedSubTypes[idx % allowedSubTypes.length];
        const subQuestions = generateQuizQuestions([tw], subType, lang, { limit: 1 });
        if (subQuestions && subQuestions.length > 0) {
          questions.push(subQuestions[0]);
        }
      });
      return questions;
    }

    // 1. Dạng a: Kiểm tra nghĩa (meaning)
    if (type === 'meaning') {
      targetWords.forEach((tw, idx) => {
        const distractors = generateMeaningDistractors(tw, allWords, 3);
        const optionsList = shuffleArray([tw.vi, ...distractors]);
        questions.push({
          id: `q-meaning-${idx + 1}`,
          type: 'meaning',
          targetWord: tw,
          prompt: lang === 'en' ? tw.word : tw.hanzi,
          subPrompt: lang === 'en' ? tw.ipa : tw.pinyin,
          promptAudio: lang === 'en' ? tw.word : tw.hanzi,
          questionText: 'Chọn nghĩa tiếng Việt chính xác:',
          correctAnswer: tw.vi,
          options: optionsList,
          correctIndex: optionsList.indexOf(tw.vi)
        });
      });
      return questions;
    }

    // 2. Dạng b: Kiểm tra từ (word)
    if (type === 'word') {
      targetWords.forEach((tw, idx) => {
        const correctVal = lang === 'en' ? tw.word : tw.hanzi;
        const distractors = generateWordDistractors(tw, allWords, 3, lang);
        const optionsList = shuffleArray([correctVal, ...distractors]);
        questions.push({
          id: `q-word-${idx + 1}`,
          type: 'word',
          targetWord: tw,
          prompt: tw.vi,
          subPrompt: tw.pos ? `Từ loại: ${tw.pos}` : '',
          promptAudio: '',
          questionText: lang === 'en' ? 'Chọn từ tiếng Anh chính xác:' : 'Chọn chữ Hán chính xác:',
          correctAnswer: correctVal,
          options: optionsList,
          correctIndex: optionsList.indexOf(correctVal)
        });
      });
      return questions;
    }

    // 3. Dạng c (zh): Kiểm tra Pinyin
    if (type === 'pinyin') {
      targetWords.forEach((tw, idx) => {
        const distractors = generatePinyinDistractors(tw, allWords, 3);
        const optionsList = shuffleArray([tw.pinyin, ...distractors]);
        questions.push({
          id: `q-pinyin-${idx + 1}`,
          type: 'pinyin',
          targetWord: tw,
          prompt: tw.hanzi,
          subPrompt: tw.vi,
          promptAudio: tw.hanzi,
          questionText: 'Chọn Pinyin chính xác (chú ý thanh điệu):',
          correctAnswer: tw.pinyin,
          options: optionsList,
          correctIndex: optionsList.indexOf(tw.pinyin)
        });
      });
      return questions;
    }

    // 3b. Dạng c (en): Kiểm tra IPA
    if (type === 'ipa') {
      targetWords.forEach((tw, idx) => {
        const distractors = generateWordDistractors(tw, allWords, 3, 'en');
        const optionsList = shuffleArray([tw.word, ...distractors]);
        questions.push({
          id: `q-ipa-${idx + 1}`,
          type: 'ipa',
          targetWord: tw,
          prompt: tw.ipa || tw.word,
          subPrompt: tw.vi,
          promptAudio: tw.word,
          questionText: 'Chọn từ tương ứng với phiên âm IPA:',
          correctAnswer: tw.word,
          options: optionsList,
          correctIndex: optionsList.indexOf(tw.word)
        });
      });
      return questions;
    }

    // 4. Dạng d: Kiểm tra phát âm (pronunciation)
    if (type === 'pronunciation') {
      targetWords.forEach((tw, idx) => {
        questions.push({
          id: `q-pronounce-${idx + 1}`,
          type: 'pronunciation',
          targetWord: tw,
          prompt: lang === 'en' ? tw.word : tw.hanzi,
          subPrompt: lang === 'en' ? tw.ipa : tw.pinyin,
          meaning: tw.vi,
          promptAudio: lang === 'en' ? tw.word : tw.hanzi,
          speechLang: lang === 'en' ? 'en-US' : 'zh-CN',
          questionText: 'Nhấn giữ Micro và đọc to rõ ràng từ vựng:'
        });
      });
      return questions;
    }

    // 5. Dạng e: Nối từ (matching)
    if (type === 'matching') {
      const matchWords = targetWords.slice(0, 5);
      const pairs = matchWords.map((tw, idx) => ({
        pairId: `pair-${idx + 1}`,
        left: lang === 'en' ? tw.word : tw.hanzi,
        leftSub: lang === 'en' ? tw.ipa : tw.pinyin,
        right: tw.vi,
        targetWord: tw
      }));

      questions.push({
        id: `q-matching-1`,
        type: 'matching',
        pairs: pairs,
        totalPairs: pairs.length,
        questionText: 'Nối các cặp từ và nghĩa tương ứng trên 2 cột:'
      });
      return questions;
    }

    // 6. Dạng f (zh): Chọn bộ thủ & Chiết tự (radical)
    if (type === 'radical') {
      targetWords.forEach((tw, idx) => {
        const decompInfo = getWordRadicalInfo(tw.hanzi);
        const correctRad = decompInfo ? decompInfo.radical : tw.hanzi;
        const correctLabel = decompInfo ? `${decompInfo.radical} — ${decompInfo.radicalVi}` : correctRad;

        const distractors = generateRadicalDistractors(correctRad, null, null, 3);
        const rawOptions = [
          { radical: correctRad, label: correctLabel, isCorrect: true },
          ...distractors.map(d => ({ radical: d.radical, label: `${d.radical} — ${d.radicalVi}`, isCorrect: false }))
        ];

        const shuffledOptions = shuffleArray(rawOptions);
        const optionsLabels = shuffledOptions.map(o => o.label);

        questions.push({
          id: `q-radical-${idx + 1}`,
          type: 'radical',
          targetWord: tw,
          prompt: decompInfo ? decompInfo.char : tw.hanzi,
          subPrompt: tw.pinyin,
          promptAudio: tw.hanzi,
          questionText: 'Xác định bộ thủ chính xác của chữ Hán này:',
          correctAnswer: correctLabel,
          options: optionsLabels,
          correctIndex: optionsLabels.indexOf(correctLabel),
          decompInfo: decompInfo
        });
      });
      return questions;
    }

    // 6b. Dạng f (en): Chọn trọng âm từ (stress)
    if (type === 'stress') {
      const isEligibleStressWord = (w) => {
        if (!w || !w.ipa) return false;
        if (!w.ipa.includes('ˈ')) return false;
        const info = getWordStressInfo(w);
        return info.totalSyllables >= 2;
      };

      const eligibleLessonWords = [];
      const seenWords = new Set();

      targetWords.forEach(tw => {
        if (isEligibleStressWord(tw)) {
          const lower = (tw.word || '').toLowerCase();
          if (!seenWords.has(lower)) {
            seenWords.add(lower);
            eligibleLessonWords.push(tw);
          }
        }
      });

      // Nếu không đủ từ nhiều âm tiết trong bài học, lấy thêm từ EN_WORDS cùng cấp/chủ đề
      const desiredCount = options.limit || Math.min(10, Math.max(targetWords.length, 5));
      if (eligibleLessonWords.length < desiredCount) {
        const allEnWords = getGlobalData('EN_WORDS') || {};
        const enList = Object.values(allEnWords);
        const targetTopics = new Set(wordsList.map(w => w.topic).filter(Boolean));
        const targetLevels = new Set(wordsList.map(w => w.level).filter(Boolean));

        const candidates = enList.filter(w => {
          const lower = (w.word || '').toLowerCase();
          return !seenWords.has(lower) && isEligibleStressWord(w);
        });

        candidates.sort((a, b) => {
          const aTopic = targetTopics.has(a.topic) ? 1 : 0;
          const bTopic = targetTopics.has(b.topic) ? 1 : 0;
          const aLevel = targetLevels.has(a.level) ? 1 : 0;
          const bLevel = targetLevels.has(b.level) ? 1 : 0;
          const scoreA = aTopic * 2 + aLevel;
          const scoreB = bTopic * 2 + bLevel;
          return scoreB - scoreA;
        });

        const needed = desiredCount - eligibleLessonWords.length;
        const pickedExtra = shuffleArray(candidates.slice(0, Math.max(needed * 2, needed))).slice(0, needed);
        pickedExtra.forEach(pw => {
          seenWords.add((pw.word || '').toLowerCase());
          eligibleLessonWords.push(Object.assign({}, pw, { isExpanded: true }));
        });
      }

      const finalWords = eligibleLessonWords.slice(0, desiredCount);

      finalWords.forEach((tw, idx) => {
        const stressInfo = getWordStressInfo(tw);
        const correctIdx = stressInfo.stressIndex;
        const totalSyl = stressInfo.totalSyllables;

        const optionsList = [];
        for (let s = 1; s <= totalSyl; s++) {
          optionsList.push(`Âm tiết thứ ${s}`);
        }

        const correctAns = `Âm tiết thứ ${correctIdx}`;
        const syls = stressInfo.syllables && stressInfo.syllables.length > 1
          ? stressInfo.syllables.join('·')
          : tw.word;

        const isExpanded = !!tw.isExpanded;
        const subPromptText = isExpanded
          ? `${tw.ipa || ''} (từ mở rộng)`.trim()
          : (tw.ipa || '');

        questions.push({
          id: `q-stress-${idx + 1}`,
          type: 'stress',
          lang: 'en',
          targetWord: tw,
          prompt: syls,
          subPrompt: subPromptText,
          promptAudio: tw.word,
          questionText: 'Trọng âm chính (ˈ) rơi vào âm tiết thứ mấy?',
          correctAnswer: correctAns,
          options: optionsList,
          correctIndex: optionsList.indexOf(correctAns),
          stressInfo: stressInfo,
          isExpanded: isExpanded
        });
      });
      return questions;
    }

    // 7. Dạng g (zh): Luyện thứ tự nét (stroke)
    if (type === 'stroke') {
      targetWords.forEach((tw, idx) => {
        const chars = Array.from((tw.hanzi || '').trim()).filter(ch => /[\u4e00-\u9fa5]/.test(ch));
        questions.push({
          id: `q-stroke-${idx + 1}`,
          type: 'stroke',
          targetWord: tw,
          word: tw.hanzi,
          chars: chars.length > 0 ? chars : [tw.hanzi],
          pinyin: tw.pinyin,
          meaning: tw.vi,
          promptAudio: tw.hanzi,
          questionText: 'Luyện tập viết các nét theo thứ tự chuẩn:'
        });
      });
      return questions;
    }

    // 7b. Dạng g (en): Chính tả (spelling)
    if (type === 'spelling') {
      targetWords.forEach((tw, idx) => {
        questions.push({
          id: `q-spelling-${idx + 1}`,
          type: 'spelling',
          targetWord: tw,
          prompt: tw.vi,
          subPrompt: tw.ipa,
          promptAudio: tw.word,
          expectedAnswer: tw.word,
          questionText: 'Nghe phát âm và gõ chính xác chính tả từ tiếng Anh:'
        });
      });
      return questions;
    }

    // 8. Dạng h: Gõ từ phản xạ (typing)
    if (type === 'typing') {
      targetWords.forEach((tw, idx) => {
        questions.push({
          id: `q-typing-${idx + 1}`,
          type: 'typing',
          targetWord: tw,
          prompt: lang === 'en' ? tw.vi : tw.vi,
          subPrompt: lang === 'en' ? tw.ipa : tw.hanzi,
          promptAudio: lang === 'en' ? tw.word : tw.hanzi,
          expectedAnswer: lang === 'en' ? tw.word : tw.pinyin,
          expectedDisplay: lang === 'en' ? tw.word : tw.pinyin,
          questionText: lang === 'en' ? 'Gõ từ tiếng Anh tương ứng với nghĩa:' : 'Nghe và gõ Pinyin (chấp nhận cả số thanh hoặc không dấu):'
        });
      });
      return questions;
    }

    // 10. Dạng j: Nghe chép câu ví dụ (dictation)
    if (type === 'dictation') {
      const extraExamples = getGlobalData('ZH_EXAMPLES_EXTRA') || {};
      targetWords.forEach((tw, idx) => {
        let sentenceZh = '';
        let sentencePy = '';
        let sentenceVi = '';
        let rawTokens = [];

        if (lang === 'zh') {
          const exList = extraExamples[tw.hanzi];
          if (Array.isArray(exList) && exList.length > 0) {
            const exItem = exList[0];
            sentenceZh = exItem.zh;
            sentencePy = exItem.py;
            sentenceVi = exItem.vi;
            rawTokens = (exItem.tokens || []).map(t => t.w).filter(w => !/^[\s，。！？、；：“”‘’（）—…,.!?;:()]+$/.test(w));
          } else if (tw.ex && tw.ex.zh) {
            sentenceZh = tw.ex.zh;
            sentencePy = tw.ex.py || '';
            sentenceVi = tw.ex.vi || '';
            rawTokens = Array.from(sentenceZh).filter(ch => !/^[\s，。！？、；：“”‘’（）—…,.!?;:()]+$/.test(ch));
          } else {
            sentenceZh = `${tw.hanzi}很好。`;
            sentencePy = `${tw.pinyin} hěn hǎo.`;
            sentenceVi = 'Rất tốt.';
            rawTokens = [tw.hanzi, '很', '好'];
          }
        } else {
          // Tiếng Anh
          if (tw.ex && tw.ex.en) {
            sentenceZh = tw.ex.en;
            sentenceVi = tw.ex.vi || '';
            sentencePy = tw.ipa || '';
            rawTokens = tw.ex.en.replace(/[.,!?;:()]/g, '').split(/\s+/).filter(Boolean);
          } else {
            sentenceZh = `This is ${tw.word}.`;
            sentenceVi = `Đây là ${tw.word}.`;
            rawTokens = ['This', 'is', tw.word];
          }
        }

        const shuffledTokens = shuffleArray(rawTokens.map((w, tIdx) => ({ id: `tok-${tIdx}`, text: w })));

        questions.push({
          id: `q-dictation-${idx + 1}`,
          type: 'dictation',
          targetWord: tw,
          sentenceText: sentenceZh,
          sentencePy: sentencePy,
          sentenceVi: sentenceVi,
          promptAudio: sentenceZh,
          tokens: shuffledTokens,
          correctTokens: rawTokens,
          questionText: 'Nghe câu và sắp xếp các từ thành câu hoàn chỉnh:'
        });
      });
      return questions;
    }

    return questions;
  }

  /* ==========================================================================
     5. CẬP NHẬT TIẾN ĐỘ & PHẦN THƯỞNG KINH TẾ (PROGRESS & STREAK)
     ========================================================================== */

  /**
   * Cập nhật điểm cao nhất và điều chỉnh hardWords (giảm khi đúng liên tiếp 3 lần)
   */
  function updatePracticeProgress(progress, lessonId, practiceType, sessionResult) {
    const prog = progress || { lessons: {}, checkpoints: {}, hardWords: {}, learnedWords: {}, practice: {}, practiceStreak: {} };
    prog.practice = prog.practice || {};
    prog.practice[lessonId] = prog.practice[lessonId] || {};
    prog.hardWords = prog.hardWords || {};
    prog.practiceStreak = prog.practiceStreak || {};

    const prevRecord = prog.practice[lessonId][practiceType] || { best: 0, last: 0, lastDate: 0 };
    const newScore = typeof sessionResult.score === 'number' ? sessionResult.score : Math.round((sessionResult.correctCount / Math.max(1, sessionResult.totalCount)) * 100);

    prog.practice[lessonId][practiceType] = {
      best: Math.max(prevRecord.best || 0, newScore),
      last: newScore,
      lastDate: Date.now()
    };

    // Xử lý từ sai: cộng vào hardWords, reset chuỗi đúng
    if (Array.isArray(sessionResult.wrongWords)) {
      sessionResult.wrongWords.forEach(w => {
        const key = typeof w === 'string' ? w : (w.hanzi || w.word);
        if (key) {
          prog.hardWords[key] = (prog.hardWords[key] || 0) + 1;
          prog.practiceStreak[key] = 0;
        }
      });
    }

    // Xử lý từ đúng: tăng chuỗi đúng, đạt 3 lần liên tiếp thì giảm hardWords
    if (Array.isArray(sessionResult.correctWords)) {
      sessionResult.correctWords.forEach(w => {
        const key = typeof w === 'string' ? w : (w.hanzi || w.word);
        if (key) {
          prog.practiceStreak[key] = (prog.practiceStreak[key] || 0) + 1;
          if (prog.practiceStreak[key] >= 3) {
            if (prog.hardWords[key] && prog.hardWords[key] > 0) {
              prog.hardWords[key] = Math.max(0, prog.hardWords[key] - 1);
            }
            prog.practiceStreak[key] = 0;
          }
        }
      });
    }

    return prog;
  }

  /* ==========================================================================
     6. MODULE CONTROLLER: LESSON PRACTICE
     ========================================================================== */

  const LessonPractice = {
    containerEl: null,
    lesson: null,
    unit: null,
    lang: 'zh',
    learnPath: null,
    scope: 'all', // 'all' | 'hard' | 'learned'
    practiceType: 'hub', // 'hub' | practice type id
    questions: [],
    currentIndex: 0,
    answers: [],
    correctCount: 0,
    wrongWords: [],
    correctWords: [],
    startTime: 0,
    elapsedSeconds: 0,
    timerInterval: null,
    speechRecognition: null,
    isAnswered: false,
    hanziWriter: null,

    /**
     * Điểm vào hiển thị module Luyện tập
     */
    render(options) {
      this.containerEl = options.containerEl;
      this.lesson = options.lesson;
      this.unit = options.unit;
      this.lang = options.lang || 'zh';
      this.learnPath = options.learnPath;
      this.practiceType = options.practiceType || 'hub';

      if (!this.containerEl || !this.lesson) return;

      if (this.practiceType === 'hub') {
        this.renderHub();
      } else {
        this.startSession(this.practiceType);
      }
    },

    /**
     * 1. Hiển thị Trang Trung tâm luyện tập (Practice Hub)
     */
    renderHub() {
      const lesson = this.lesson;
      const unit = this.unit || { title: 'Lộ trình chuẩn', theme: 'Luyện tập' };
      const wordsList = resolveLessonWords(lesson, (this.learnPath && this.learnPath.words) || null, this.lang);

      const prog = (this.learnPath && this.learnPath.progress) || { hardWords: {}, learnedWords: {}, practice: {} };
      const lessonPracticeData = (prog.practice && prog.practice[lesson.id]) || {};

      // Đếm số lượng theo 3 phạm vi
      const hardCount = wordsList.filter(w => (prog.hardWords && prog.hardWords[w.hanzi || w.word] > 0)).length;
      const learnedCount = wordsList.filter(w => (prog.learnedWords && prog.learnedWords[w.hanzi || w.word])).length;

      const { words: activeScopeWords, isEmpty, message } = filterPracticeWords(wordsList, this.scope, prog);

      const typeKeys = Object.keys(PRACTICE_TYPES);

      let html = `
        <div class="practice-container">
          <header class="practice-hub-header">
            <div class="practice-header-top">
              <button class="practice-back-btn" id="btn-practice-back-lesson">
                ${ICONS.arrowLeft} <span>Quay lại bài học</span>
              </button>
              <span class="practice-lesson-tag">${unit.title} • ${unit.theme}</span>
            </div>

            <div class="practice-title-section">
              <h1 class="practice-main-title">Luyện tập theo bài: ${lesson.title}</h1>
              <p class="practice-main-desc">${this.lang === 'en'
                ? '10 dạng bài tập chuyên sâu củng cố trọn vẹn từ vựng, ngữ âm, trọng âm và ngữ cảnh.'
                : '10 dạng bài tập chuyên sâu củng cố trọn vẹn từ vựng, ngữ âm, chiết tự và ngữ cảnh.'}</p>
            </div>

            <!-- Bộ chọn phạm vi từ vựng -->
            <div class="practice-scope-card">
              <span class="practice-scope-label">Chọn phạm vi luyện tập:</span>
              <div class="practice-scope-options" role="radiogroup">
                <button class="practice-scope-btn ${this.scope === 'all' ? 'active' : ''}" data-scope="all">
                  Toàn bài <span class="scope-count">(${wordsList.length})</span>
                </button>
                <button class="practice-scope-btn ${this.scope === 'hard' ? 'active' : ''}" data-scope="hard">
                  Từ hay nhầm <span class="scope-count">(${hardCount})</span>
                </button>
                <button class="practice-scope-btn ${this.scope === 'learned' ? 'active' : ''}" data-scope="learned">
                  Từ đã học <span class="scope-count">(${learnedCount})</span>
                </button>
              </div>

              ${isEmpty ? `
                <div class="practice-empty-alert">
                  ${ICONS.lightbulb}
                  <span>${message}</span>
                </div>
              ` : ''}
            </div>
          </header>

          <!-- Lưới 10 thẻ dạng bài -->
          <main class="practice-grid-10">
      `;

      typeKeys.forEach((key, idx) => {
        const item = PRACTICE_TYPES[key];
        const title = this.lang === 'en' ? item.nameEn : item.name;
        const desc = this.lang === 'en' ? item.descEn : item.desc;
        const iconSvg = ICONS[item.iconKey] || ICONS.sparkle;

        const record = lessonPracticeData[key] || lessonPracticeData[item.aliasEn] || null;
        const hasScore = record && typeof record.best === 'number';
        const bestScore = hasScore ? `${record.best}%` : '--';
        const lastDoneStr = record && record.lastDate ? this.formatTimeAgo(record.lastDate) : 'Chưa luyện tập';

        html += `
          <div class="practice-card-item" data-type="${key}">
            <div class="practice-card-top">
              <div class="practice-card-icon-wrap">${iconSvg}</div>
              <div class="practice-card-info">
                <div class="practice-card-badge-row">
                  <span class="practice-card-num">Dạng ${idx + 1}</span>
                </div>
                <h2 class="practice-card-title">${title}</h2>
                <p class="practice-card-desc">${desc}</p>
              </div>
            </div>
            <div class="practice-card-footer">
              <div class="practice-score-stat ${hasScore ? 'has-score' : ''}">
                ${ICONS.trophy} Điểm cao: <b>${bestScore}</b> • ${lastDoneStr}
              </div>
              <button class="practice-btn-start" data-type="${key}" ${isEmpty ? 'disabled' : ''}>
                <span>Luyện tập</span> ${ICONS.arrowRight}
              </button>
            </div>
          </div>
        `;
      });

      html += `
          </main>
        </div>
      `;

      this.containerEl.innerHTML = html;
      this.attachHubEvents();
    },

    attachHubEvents() {
      // Nút quay lại bài học
      const backBtn = this.containerEl.querySelector('#btn-practice-back-lesson');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          if (typeof window !== 'undefined') {
            window.location.hash = `#${this.lang}/learn?lesson=${this.lesson.id}`;
          }
        });
      }

      // Chọn phạm vi
      this.containerEl.querySelectorAll('.practice-scope-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.scope = btn.getAttribute('data-scope');
          this.renderHub();
        });
      });

      // Bấm vào thẻ để bắt đầu luyện tập
      this.containerEl.querySelectorAll('.practice-card-item, .practice-btn-start').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const type = el.getAttribute('data-type');
          if (type) {
            if (typeof window !== 'undefined') {
              window.location.hash = `#${this.lang}/learn?lesson=${this.lesson.id}&practice=${type}`;
            } else {
              this.startSession(type);
            }
          }
        });
      });
    },

    /**
     * Định dạng thời gian tương đối thân thiện
     */
    formatTimeAgo(timestamp) {
      if (!timestamp) return 'Chưa làm';
      const diffSec = Math.floor((Date.now() - timestamp) / 1000);
      if (diffSec < 60) return 'Vừa xong';
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `${diffMin} phút trước`;
      const diffHour = Math.floor(diffMin / 60);
      if (diffHour < 24) return `${diffHour} giờ trước`;
      const diffDay = Math.floor(diffHour / 24);
      return `${diffDay} ngày trước`;
    },

    /**
     * 2. Bắt đầu một lượt làm bài (10 câu)
     */
    startSession(type) {
      this.practiceType = type;
      const lesson = this.lesson;
      const allWords = resolveLessonWords(lesson, (this.learnPath && this.learnPath.words) || null, this.lang);
      const prog = (this.learnPath && this.learnPath.progress) || {};

      const { words: activeWords, isEmpty, message } = filterPracticeWords(allWords, this.scope, prog);

      if (isEmpty || activeWords.length === 0) {
        alert(message || 'Không có từ vựng phù hợp để luyện tập.');
        this.renderHub();
        return;
      }

      this.questions = generateQuizQuestions(activeWords, type, this.lang, { limit: 10 });
      if (!this.questions || this.questions.length === 0) {
        alert('Không thể tạo bộ câu hỏi cho dạng bài này.');
        this.renderHub();
        return;
      }

      this.currentIndex = 0;
      this.answers = [];
      this.correctCount = 0;
      this.wrongWords = [];
      this.correctWords = [];
      this.startTime = Date.now();
      this.isAnswered = false;

      this.renderQuestionRunner();
    },

    /**
     * 3. Hiển thị giao diện chạy câu hỏi
     */
    renderQuestionRunner() {
      const q = this.questions[this.currentIndex];
      const total = this.questions.length;
      const currentStep = this.currentIndex + 1;
      const pct = Math.round(((currentStep - 1) / total) * 100);

      const typeConfig = PRACTICE_TYPES[this.practiceType] || PRACTICE_TYPES.meaning;
      const title = this.lang === 'en' ? typeConfig.nameEn : typeConfig.name;

      let html = `
        <div class="practice-container">
          <header class="practice-runner-header">
            <div class="practice-runner-top-nav">
              <button class="practice-back-btn" id="btn-runner-quit">
                ${ICONS.arrowLeft} <span>Thoát</span>
              </button>
              <div class="practice-runner-meta">
                <span class="runner-type-badge">${title}</span>
                <span class="runner-step-text">Câu <b>${currentStep}</b>/${total}</span>
              </div>
            </div>
            <div class="practice-progress-track">
              <div class="practice-progress-fill" style="width: ${pct}%"></div>
            </div>
          </header>

          <main class="practice-stage-card" id="practice-stage-mount">
            <!-- Khu vực nội dung câu hỏi chuyên biệt -->
          </main>

          <div id="practice-feedback-mount"></div>
        </div>
      `;

      this.containerEl.innerHTML = html;

      // Nút thoát về Hub
      const quitBtn = this.containerEl.querySelector('#btn-runner-quit');
      if (quitBtn) {
        quitBtn.addEventListener('click', () => {
          if (confirm('Bạn có chắc muốn dừng bài luyện tập này không?')) {
            if (typeof window !== 'undefined') {
              window.location.hash = `#${this.lang}/learn?lesson=${this.lesson.id}&practice=hub`;
            } else {
              this.renderHub();
            }
          }
        });
      }

      this.renderQuestionContent(q);
      this.attachGlobalKeyboardShortcuts();
    },

    /**
     * Render nội dung chi tiết theo từng dạng câu hỏi
     */
    renderQuestionContent(q) {
      const stage = this.containerEl.querySelector('#practice-stage-mount');
      if (!stage) return;
      this.isAnswered = false;

      // Hủy bỏ âm thanh và nhận diện giọng nói trước đó nếu có
      this.cleanupSpeech();

      // Dạng trắc nghiệm 4 lựa chọn (meaning, word, pinyin, ipa, radical, stress)
      if (q.options && Array.isArray(q.options)) {
        this.renderMultipleChoiceStage(stage, q);
      } else if (q.type === 'matching') {
        this.renderMatchingStage(stage, q);
      } else if (q.type === 'stroke') {
        this.renderStrokeStage(stage, q);
      } else if (q.type === 'typing' || q.type === 'spelling') {
        this.renderTypingStage(stage, q);
      } else if (q.type === 'pronunciation') {
        this.renderPronounceStage(stage, q);
      } else if (q.type === 'dictation') {
        this.renderDictationStage(stage, q);
      }
    },

    /**
     * Dạng trắc nghiệm chuẩn 4 đáp án (meaning, word, pinyin, ipa, radical, stress)
     */
    renderMultipleChoiceStage(stage, q) {
      const isEn = (this.lang === 'en' || q.lang === 'en' || q.type === 'ipa' || q.type === 'stress');
      const promptClass = isEn ? 'practice-prompt-main' : 'practice-prompt-hanzi';
      const subPromptClass = isEn ? 'practice-prompt-sub' : 'practice-prompt-pinyin';

      stage.innerHTML = `
        <div class="practice-question-header">
          <div class="practice-question-instruction">${q.questionText}</div>
          <div class="practice-prompt-display">
            <span class="${promptClass}">${q.prompt}</span>
            ${q.subPrompt ? `<span class="${subPromptClass}">${q.subPrompt}</span>` : ''}
            ${q.promptAudio ? `
              <button class="practice-prompt-audio-btn" id="btn-prompt-audio" aria-label="Phát âm">
                ${ICONS.speaker} <span>Nghe phát âm</span>
              </button>
            ` : ''}
          </div>
        </div>

        <div class="practice-choices-grid" role="group">
          ${q.options.map((opt, i) => `
            <button class="practice-choice-btn" data-choice-index="${i}">
              <span class="practice-choice-key">${i + 1}</span>
              <span class="practice-choice-text">${opt}</span>
            </button>
          `).join('')}
        </div>

        ${q.decompInfo ? `<div id="decomp-reveal-placeholder"></div>` : ''}
      `;

      // Nút nghe phát âm
      const audioBtn = stage.querySelector('#btn-prompt-audio');
      if (audioBtn) {
        audioBtn.addEventListener('click', () => {
          this.speak(q.promptAudio, this.lang === 'en' ? 'en-US' : 'zh-CN');
        });
      }

      // Xử lý chọn đáp án
      stage.querySelectorAll('.practice-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (this.isAnswered) return;
          const selectedIdx = parseInt(btn.getAttribute('data-choice-index'), 10);
          this.handleChoiceAnswer(selectedIdx, q, stage);
        });
      });
    },

    handleChoiceAnswer(selectedIdx, q, stage) {
      this.isAnswered = true;
      const isCorrect = (selectedIdx === q.correctIndex);
      const allBtns = stage.querySelectorAll('.practice-choice-btn');

      allBtns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correctIndex) {
          btn.classList.add(isCorrect ? 'selected-correct' : 'reveal-correct');
        } else if (i === selectedIdx && !isCorrect) {
          btn.classList.add('selected-wrong');
        }
      });

      // Nếu là dạng bộ thủ: mở bảng chiết tự và mẹo nhớ
      if (q.decompInfo) {
        const ph = stage.querySelector('#decomp-reveal-placeholder');
        if (ph) {
          const d = q.decompInfo;
          ph.innerHTML = `
            <div class="decomp-info-panel">
              <div class="decomp-header-row">
                <span class="decomp-char-badge">${d.char} (${d.structure})</span>
                <span>Bộ thủ: <b>${d.radical}</b></span>
              </div>
              ${d.parts && d.parts.length > 0 ? `
                <div class="decomp-parts-list">
                  Thành phần: ${d.parts.map(p => `<span class="decomp-part-item">${p}</span>`).join('')}
                </div>
              ` : ''}
              <div class="decomp-mnemonic-box">
                <b>Mẹo nhớ:</b> ${d.mnemonic}
              </div>
            </div>
          `;
        }
      }

      this.processQuestionResult(isCorrect, q.targetWord, q.correctAnswer);
    },

    /**
     * Dạng nối từ (Matching - 5 cặp 2 cột)
     */
    renderMatchingStage(stage, q) {
      let selectedLeft = null;
      let selectedRight = null;
      let matchedCount = 0;
      const totalPairs = q.pairs.length;

      const leftItems = shuffleArray(q.pairs.map(p => ({ pairId: p.pairId, text: p.left, sub: p.leftSub })));
      const rightItems = shuffleArray(q.pairs.map(p => ({ pairId: p.pairId, text: p.right })));

      stage.innerHTML = `
        <div class="practice-question-header">
          <div class="practice-question-instruction">${q.questionText}</div>
        </div>

        <div class="matching-board">
          <div class="matching-column" id="col-left">
            ${leftItems.map((item, idx) => `
              <div class="matching-card" data-side="left" data-pair-id="${item.pairId}" tabindex="0">
                <span>${item.text}</span>
              </div>
            `).join('')}
          </div>
          <div class="matching-column" id="col-right">
            ${rightItems.map((item, idx) => `
              <div class="matching-card" data-side="right" data-pair-id="${item.pairId}" tabindex="0">
                <span>${item.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      const checkMatch = () => {
        if (!selectedLeft || !selectedRight) return;
        const pLeft = selectedLeft.getAttribute('data-pair-id');
        const pRight = selectedRight.getAttribute('data-pair-id');

        if (pLeft === pRight) {
          // Đúng cặp
          selectedLeft.classList.add('matched');
          selectedRight.classList.add('matched');
          selectedLeft.classList.remove('selected');
          selectedRight.classList.remove('selected');
          selectedLeft = null;
          selectedRight = null;
          matchedCount++;
          this.playTone('correct');

          if (matchedCount >= totalPairs) {
            this.processQuestionResult(true, null, 'Nối đúng tất cả các cặp từ!');
          }
        } else {
          // Sai cặp
          selectedLeft.classList.add('wrong-shake');
          selectedRight.classList.add('wrong-shake');
          this.playTone('wrong');
          setTimeout(() => {
            if (selectedLeft) {
              selectedLeft.classList.remove('wrong-shake', 'selected');
              selectedLeft = null;
            }
            if (selectedRight) {
              selectedRight.classList.remove('wrong-shake', 'selected');
              selectedRight = null;
            }
          }, 400);
        }
      };

      stage.querySelectorAll('.matching-card').forEach(card => {
        card.addEventListener('click', () => {
          if (card.classList.contains('matched')) return;
          const side = card.getAttribute('data-side');

          if (side === 'left') {
            if (selectedLeft) selectedLeft.classList.remove('selected');
            selectedLeft = card;
            card.classList.add('selected');
          } else {
            if (selectedRight) selectedRight.classList.remove('selected');
            selectedRight = card;
            card.classList.add('selected');
          }

          checkMatch();
        });
      });
    },

    /**
     * Dạng thứ tự nét HanziWriter (Stroke quiz)
     */
    renderStrokeStage(stage, q) {
      let charIdx = 0;
      const chars = q.chars || [q.word];
      let totalMistakes = 0;
      let currentStrokeIdx = 0;
      let currentStartQuiz = null;

      stage.innerHTML = `
        <div class="practice-question-header">
          <div class="practice-question-instruction">${q.questionText}</div>
          <div class="stroke-char-picker-row">
            ${chars.map((ch, i) => `
              <button class="stroke-char-tab ${i === 0 ? 'active' : ''}" data-char-index="${i}">${ch}</button>
            `).join('')}
          </div>
        </div>

        <div class="stroke-stage-wrap">
          <div class="stroke-writer-canvas-box" id="writer-target-box">
            <!-- HanziWriter Canvas -->
          </div>

          <div class="stroke-actions-row">
            <button class="stroke-btn-action" id="btn-stroke-hint">${ICONS.lightbulb} Gợi ý nét</button>
            <button class="stroke-btn-action" id="btn-stroke-reset">${ICONS.repeat} Viết lại</button>
            <button class="stroke-btn-action" id="btn-stroke-skip">Bỏ qua chữ này</button>
          </div>
        </div>
      `;

      const targetBox = stage.querySelector('#writer-target-box');

      const initWriterForChar = (ch) => {
        if (!targetBox) return;
        targetBox.innerHTML = '';
        currentStrokeIdx = 0;

        if (typeof window === 'undefined' || typeof window.HanziWriter === 'undefined' || typeof window.HanziWriter.create !== 'function') {
          targetBox.innerHTML = `
            <div style="padding: 1rem; text-align: center; color: var(--muted); font-size: 0.875rem;">
              Không thể tải thư viện HanziWriter (cần kết nối mạng tải dữ liệu nét).<br><br>
              <button class="learn-btn-secondary" id="btn-offline-skip">Bỏ qua bài này</button>
            </div>
          `;
          const skipBtn = targetBox.querySelector('#btn-offline-skip');
          if (skipBtn && typeof skipBtn.addEventListener === 'function') {
            skipBtn.addEventListener('click', () => {
              this.processQuestionResult(true, q.targetWord, 'Đã hoàn thành');
            });
          }
          return;
        }

        try {
          this.hanziWriter = window.HanziWriter.create('writer-target-box', ch, {
            width: 240,
            height: 240,
            padding: 15,
            showOutline: true,
            strokeAnimationSpeed: 1.2,
            strokeColor: '#b3261e',
            radicalColor: '#10b981',
            highlightColor: '#f59e0b',
            drawingColor: '#981f18',
            onLoadCharDataError: () => {
              targetBox.innerHTML = `
                <div style="padding: 1rem; text-align: center; color: var(--muted); font-size: 0.875rem;">
                  Lỗi tải dữ liệu nét của chữ "${ch}".<br>
                  <button class="learn-btn-secondary" id="btn-err-skip">Tiếp tục</button>
                </div>
              `;
              const errSkipBtn = targetBox.querySelector('#btn-err-skip');
              if (errSkipBtn && typeof errSkipBtn.addEventListener === 'function') {
                errSkipBtn.addEventListener('click', () => advanceToNextChar());
              }
            }
          });

          const startQuiz = () => {
            if (!this.hanziWriter || typeof this.hanziWriter.quiz !== 'function') return;
            this.hanziWriter.quiz({
              showHintAfterMisses: 3,
              highlightOnComplete: true,
              onCorrectStroke: (strokeData) => {
                if (strokeData && typeof strokeData.strokeNum === 'number') {
                  currentStrokeIdx = strokeData.strokeNum + 1;
                } else {
                  currentStrokeIdx++;
                }
              },
              onMistake: (strokeData) => {
                totalMistakes++;
                if (strokeData && typeof strokeData.strokeNum === 'number') {
                  currentStrokeIdx = strokeData.strokeNum;
                }
              },
              onComplete: (summary) => {
                advanceToNextChar();
              }
            });
          };

          currentStartQuiz = startQuiz;
          startQuiz();
        } catch (_) {
          advanceToNextChar();
        }
      };

      const advanceToNextChar = () => {
        charIdx++;
        if (charIdx < chars.length) {
          const tabs = stage.querySelectorAll('.stroke-char-tab');
          if (tabs && typeof tabs.forEach === 'function') {
            tabs.forEach((tab, i) => {
              if (tab && tab.classList && typeof tab.classList.toggle === 'function') {
                tab.classList.toggle('active', i === charIdx);
              }
            });
          }
          initWriterForChar(chars[charIdx]);
        } else {
          // Hoàn thành cả từ
          const isSuccess = (totalMistakes <= 3);
          this.processQuestionResult(isSuccess, q.targetWord, `Hoàn thành viết từ (${totalMistakes} nét sai)`);
        }
      };

      initWriterForChar(chars[0]);

      const hintBtn = stage.querySelector('#btn-stroke-hint');
      if (hintBtn && typeof hintBtn.addEventListener === 'function') {
        hintBtn.addEventListener('click', () => {
          if (!this.hanziWriter) return;
          if (typeof this.hanziWriter.highlightStroke === 'function') {
            this.hanziWriter.highlightStroke(currentStrokeIdx);
          } else if (typeof this.hanziWriter.animateCharacter === 'function') {
            let restarted = false;
            const restart = () => {
              if (restarted) return;
              restarted = true;
              if (typeof currentStartQuiz === 'function') currentStartQuiz();
            };
            try {
              const res = this.hanziWriter.animateCharacter({ onComplete: restart });
              if (res && typeof res.then === 'function') {
                res.then(restart).catch(() => {});
              }
            } catch (_) {
              restart();
            }
          }
        });
      }

      const resetBtn = stage.querySelector('#btn-stroke-reset');
      if (resetBtn && typeof resetBtn.addEventListener === 'function') {
        resetBtn.addEventListener('click', () => {
          initWriterForChar(chars[charIdx]);
        });
      }

      const skipBtn = stage.querySelector('#btn-stroke-skip');
      if (skipBtn && typeof skipBtn.addEventListener === 'function') {
        skipBtn.addEventListener('click', () => {
          advanceToNextChar();
        });
      }
    },

    /**
     * Dạng gõ từ / chính tả (Typing & Spelling)
     */
    renderTypingStage(stage, q) {
      const isEn = (this.lang === 'en' || q.lang === 'en' || q.type === 'spelling');
      const promptClass = isEn ? 'practice-prompt-main' : 'practice-prompt-hanzi';
      const subPromptClass = isEn ? 'practice-prompt-sub' : 'practice-prompt-pinyin';
      const typingHint = isEn
        ? 'Gõ đúng chính tả, không phân biệt hoa thường'
        : 'Gợi ý: chấp nhận cả số thanh (ni3 hao3), không thanh (ni hao) hoặc có dấu chuẩn.';

      stage.innerHTML = `
        <div class="practice-question-header">
          <div class="practice-question-instruction">${q.questionText}</div>
          <div class="practice-prompt-display">
            <span class="${promptClass}">${q.prompt}</span>
            ${q.subPrompt ? `<span class="${subPromptClass}">${q.subPrompt}</span>` : ''}
            <button class="practice-prompt-audio-btn" id="btn-typing-audio">
              ${ICONS.speaker} <span>Nghe phát âm</span>
            </button>
          </div>
        </div>

        <div class="typing-practice-wrap">
          <input type="text" class="typing-input-field" id="practice-typing-input" placeholder="Nhập câu trả lời..." autocomplete="off" autocapitalize="off" spellcheck="false" />
          <button class="learn-btn-primary" id="btn-typing-submit">Kiểm tra (Enter)</button>
          <div class="typing-hint-note">${typingHint}</div>
        </div>
      `;

      const input = stage.querySelector('#practice-typing-input');
      const submitBtn = stage.querySelector('#btn-typing-submit');
      const audioBtn = stage.querySelector('#btn-typing-audio');

      if (audioBtn) {
        audioBtn.addEventListener('click', () => {
          this.speak(q.promptAudio, this.lang === 'en' ? 'en-US' : 'zh-CN');
        });
      }

      if (input) {
        setTimeout(() => {
          if (typeof input.focus === 'function') input.focus();
        }, 100);
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            submitBtn.click();
          }
        });
      }

      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          if (this.isAnswered || !input) return;
          const userVal = input.value.trim();
          if (!userVal) return;

          this.isAnswered = true;
          input.disabled = true;
          submitBtn.disabled = true;

          let isCorrect = false;
          if (q.type === 'spelling' || isEn) {
            isCorrect = (userVal.toLowerCase() === (q.expectedAnswer || '').toLowerCase());
          } else {
            isCorrect = gradePinyinInput(userVal, q.expectedAnswer, q.targetWord ? q.targetWord.hanzi : '');
          }

          this.processQuestionResult(isCorrect, q.targetWord, q.expectedDisplay || q.expectedAnswer);
        });
      }
    },

    /**
     * Dạng luyện phát âm qua Micro AI
     */
    renderPronounceStage(stage, q) {
      const isEn = (this.lang === 'en' || q.lang === 'en');
      const promptClass = isEn ? 'practice-prompt-main' : 'practice-prompt-hanzi';
      const subPromptClass = isEn ? 'practice-prompt-sub' : 'practice-prompt-pinyin';

      stage.innerHTML = `
        <div class="practice-question-header">
          <div class="practice-question-instruction">${q.questionText}</div>
          <div class="practice-prompt-display">
            <span class="${promptClass}">${q.prompt}</span>
            <span class="${subPromptClass}">${q.subPrompt}</span>
            <span style="font-size: 1rem; color: var(--muted);">${q.meaning}</span>
            <button class="practice-prompt-audio-btn" id="btn-pronounce-sample">
              ${ICONS.speaker} <span>Nghe mẫu</span>
            </button>
          </div>
        </div>

        <div class="pronounce-stage-wrap">
          <button class="mic-action-btn" id="btn-start-mic" aria-label="Bật mic đọc">
            ${ICONS.mic}
          </button>
          <div class="pronounce-status-text" id="pronounce-status">Bấm nút Micro để bắt đầu đọc</div>
          <button class="learn-btn-secondary" id="btn-switch-listen-mode" style="margin-top: 0.5rem;">
            Chuyển sang chế độ nghe chọn ${isEn ? 'từ' : 'chữ'} (không dùng mic)
          </button>
        </div>
      `;

      const sampleBtn = stage.querySelector('#btn-pronounce-sample');
      if (sampleBtn) {
        sampleBtn.addEventListener('click', () => {
          this.speak(q.promptAudio, q.speechLang);
        });
      }

      const micBtn = stage.querySelector('#btn-start-mic');
      const statusEl = stage.querySelector('#pronounce-status');
      const switchBtn = stage.querySelector('#btn-switch-listen-mode');

      if (switchBtn) {
        switchBtn.addEventListener('click', () => {
          // Chuyển sang dạng nghe chọn chữ
          const distractors = generateWordDistractors(q.targetWord, (this.learnPath && this.learnPath.words) || [], 3, this.lang);
          const fallbackOptions = shuffleArray([q.prompt, ...distractors]);
          const fallbackQ = {
            id: q.id,
            type: 'word',
            lang: this.lang,
            targetWord: q.targetWord,
            prompt: q.meaning,
            subPrompt: isEn ? 'Nghe phát âm và chọn từ chính xác:' : 'Nghe phát âm và chọn chữ chính xác:',
            promptAudio: q.promptAudio,
            questionText: isEn ? 'Nghe phát âm và chọn từ đúng:' : 'Nghe phát âm và chọn chữ đúng:',
            correctAnswer: q.prompt,
            options: fallbackOptions,
            correctIndex: fallbackOptions.indexOf(q.prompt)
          };
          this.renderMultipleChoiceStage(stage, fallbackQ);
          this.speak(q.promptAudio, q.speechLang);
        });
      }

      if (micBtn && typeof window !== 'undefined') {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) {
          if (statusEl) statusEl.textContent = 'Trình duyệt chưa hỗ trợ Web Speech API. Vui lòng bấm nút bên dưới để làm bài.';
          return;
        }

        let isRec = false;
        micBtn.addEventListener('click', () => {
          if (this.isAnswered) return;
          if (isRec) {
            if (this.speechRecognition) this.speechRecognition.stop();
            return;
          }

          try {
            const rec = new SpeechRec();
            rec.lang = q.speechLang;
            rec.continuous = false;
            rec.interimResults = false;
            rec.maxAlternatives = 3;
            this.speechRecognition = rec;

            rec.onstart = () => {
              isRec = true;
              micBtn.classList.add('recording');
              if (statusEl) statusEl.textContent = 'Đang lắng nghe... Hãy đọc to từ vựng!';
            };

            rec.onresult = (event) => {
              isRec = false;
              micBtn.classList.remove('recording');
              const transcripts = [];
              for (let i = 0; i < event.results[0].length; i++) {
                transcripts.push(event.results[0][i].transcript);
              }

              let scoreRes = { score: 0 };
              if (typeof window.scoreRecognition === 'function') {
                scoreRes = window.scoreRecognition(q.prompt, transcripts);
              } else if (nodeSpeak && typeof nodeSpeak.scoreRecognition === 'function') {
                scoreRes = nodeSpeak.scoreRecognition(q.prompt, transcripts);
              } else {
                scoreRes = { score: transcripts.some(t => t.includes(q.prompt)) ? 100 : 50 };
              }

              const isPass = (scoreRes.score >= 60);
              if (statusEl) statusEl.textContent = `Điểm AI: ${scoreRes.score}% (${transcripts[0] || ''})`;
              this.isAnswered = true;
              this.processQuestionResult(isPass, q.targetWord, q.prompt);
            };

            rec.onerror = () => {
              isRec = false;
              micBtn.classList.remove('recording');
              if (statusEl) statusEl.textContent = 'Không nhận diện được giọng nói. Hãy thử lại hoặc chuyển chế độ.';
            };

            rec.start();
          } catch (_) {
            if (statusEl) statusEl.textContent = 'Lỗi truy cập micro. Hãy kiểm tra quyền truy cập micro.';
          }
        });
      }
    },

    /**
     * Dạng nghe chép câu / Sắp xếp token (Dictation)
     */
    renderDictationStage(stage, q) {
      let selectedTokens = [];

      stage.innerHTML = `
        <div class="practice-question-header">
          <div class="practice-question-instruction">${q.questionText}</div>
          <div class="dictation-audio-controls">
            <button class="learn-btn-primary" id="btn-play-sentence" aria-label="Nghe câu bình thường">
              ${ICONS.speaker} <span>Nghe câu (1.0x)</span>
            </button>
            <button class="learn-btn-secondary" id="btn-play-sentence-slow" aria-label="Nghe câu chậm">
              ${ICONS.speakerSlow} <span>Nghe chậm (0.7x)</span>
            </button>
          </div>
          ${q.sentenceVi ? `<div style="font-size: 0.9375rem; color: var(--muted); margin-top: 0.5rem;">Nghĩa: ${q.sentenceVi}</div>` : ''}
        </div>

        <div class="dictation-tokens-stage">
          <div class="dictation-target-slots" id="target-slots-box">
            <span style="color: var(--muted); font-size: 0.875rem;" id="slots-placeholder">Chạm các từ bên dưới để ghép vào câu...</span>
          </div>

          <div class="dictation-token-bank" id="token-bank-box">
            ${q.tokens.map((tok) => `
              <button class="word-token-btn" data-tok-id="${tok.id}">${tok.text}</button>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: center; gap: 0.75rem;">
            <button class="learn-btn-primary" id="btn-dictation-submit">Kiểm tra câu</button>
            <button class="learn-btn-secondary" id="btn-dictation-reset">Xóa làm lại</button>
          </div>
        </div>
      `;

      const playNormalBtn = stage.querySelector('#btn-play-sentence');
      const playSlowBtn = stage.querySelector('#btn-play-sentence-slow');
      const slotsBox = stage.querySelector('#target-slots-box');
      const bankBox = stage.querySelector('#token-bank-box');
      const submitBtn = stage.querySelector('#btn-dictation-submit');
      const resetBtn = stage.querySelector('#btn-dictation-reset');

      const speechLang = this.lang === 'en' ? 'en-US' : 'zh-CN';

      if (playNormalBtn) {
        playNormalBtn.addEventListener('click', () => this.speak(q.promptAudio, speechLang, 1.0));
      }
      if (playSlowBtn) {
        playSlowBtn.addEventListener('click', () => this.speak(q.promptAudio, speechLang, 0.7));
      }

      // Tự động phát âm thanh lần đầu
      setTimeout(() => this.speak(q.promptAudio, speechLang, 1.0), 300);

      const renderSlots = () => {
        if (!slotsBox) return;
        if (selectedTokens.length === 0) {
          slotsBox.innerHTML = '<span style="color: var(--muted); font-size: 0.875rem;">Chạm các từ bên dưới để ghép vào câu...</span>';
          return;
        }
        slotsBox.innerHTML = selectedTokens.map((tok, i) => `
          <button class="word-token-btn" data-slot-index="${i}">${tok.text}</button>
        `).join('');

        slotsBox.querySelectorAll('.word-token-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-slot-index'), 10);
            const removed = selectedTokens.splice(idx, 1)[0];
            const bankBtn = bankBox.querySelector(`[data-tok-id="${removed.id}"]`);
            if (bankBtn) bankBtn.classList.remove('used');
            renderSlots();
          });
        });
      };

      if (bankBox && typeof bankBox.querySelectorAll === 'function') {
        bankBox.querySelectorAll('.word-token-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            if (btn.classList && typeof btn.classList.contains === 'function' && btn.classList.contains('used')) return;
            const tokId = typeof btn.getAttribute === 'function' ? btn.getAttribute('data-tok-id') : null;
            const tokObj = q.tokens.find(t => t.id === tokId);
            if (tokObj) {
              if (btn.classList && typeof btn.classList.add === 'function') btn.classList.add('used');
              selectedTokens.push(tokObj);
              renderSlots();
            }
          });
        });
      }

      if (resetBtn && typeof resetBtn.addEventListener === 'function') {
        resetBtn.addEventListener('click', () => {
          selectedTokens = [];
          if (bankBox && typeof bankBox.querySelectorAll === 'function') {
            bankBox.querySelectorAll('.word-token-btn').forEach(b => {
              if (b.classList && typeof b.classList.remove === 'function') b.classList.remove('used');
            });
          }
          renderSlots();
        });
      }

      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          if (this.isAnswered) return;
          this.isAnswered = true;
          submitBtn.disabled = true;

          const formedSentence = selectedTokens.map(t => t.text).join(this.lang === 'en' ? ' ' : '');
          const correctSentenceClean = q.correctTokens.join(this.lang === 'en' ? ' ' : '');

          const isCorrect = (formedSentence === correctSentenceClean);
          this.processQuestionResult(isCorrect, q.targetWord, q.sentenceText);
        });
      }
    },

    /**
     * 4. Xử lý phản hồi kết quả câu hỏi tức thì
     */
    processQuestionResult(isCorrect, targetWord, answerText) {
      const feedbackMount = this.containerEl.querySelector('#practice-feedback-mount');
      if (!feedbackMount) return;

      if (isCorrect) {
        this.correctCount++;
        this.playTone('correct');
        if (targetWord) this.correctWords.push(targetWord);

        // Thưởng Economy
        if (typeof window !== 'undefined' && window.Economy && typeof window.Economy.reward === 'function') {
          try {
            window.Economy.reward('quizCorrect');
          } catch (_) {}
        }
      } else {
        this.playTone('wrong');
        if (targetWord) this.wrongWords.push(targetWord);
      }

      const isLast = (this.currentIndex >= this.questions.length - 1);

      feedbackMount.innerHTML = `
        <div class="practice-feedback-bar ${isCorrect ? 'correct' : 'wrong'}" role="status" aria-live="polite">
          <div class="practice-feedback-left">
            <div class="practice-feedback-icon">${isCorrect ? ICONS.check : ICONS.x}</div>
            <div>
              <div class="practice-feedback-title">${isCorrect ? 'Chính xác! Rất tốt' : 'Chưa chính xác!'}</div>
              <div class="practice-feedback-sub">Đáp án: <b>${answerText || ''}</b></div>
            </div>
          </div>
          <button class="practice-btn-next" id="btn-question-next">
            <span>${isLast ? 'Xem kết quả' : 'Câu tiếp theo'}</span> ${ICONS.arrowRight}
          </button>
        </div>
      `;

      const nextBtn = feedbackMount.querySelector('#btn-question-next');
      if (nextBtn) {
        nextBtn.focus();
        nextBtn.addEventListener('click', () => {
          this.advanceNextQuestion();
        });
      }
    },

    advanceNextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
        this.renderQuestionRunner();
      } else {
        this.finishSession();
      }
    },

    /**
     * 5. Kết thúc lượt luyện tập & Lưu điểm
     */
    finishSession() {
      this.cleanupSpeech();
      const total = this.questions.length;
      const scorePct = Math.round((this.correctCount / Math.max(1, total)) * 100);
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);

      // Cập nhật tiến độ lưu trữ
      if (this.learnPath) {
        const prog = this.learnPath.progress || {};
        const updated = updatePracticeProgress(prog, this.lesson.id, this.practiceType, {
          score: scorePct,
          correctCount: this.correctCount,
          totalCount: total,
          correctWords: this.correctWords,
          wrongWords: this.wrongWords
        });
        if (typeof window !== 'undefined' && window.LearnPath && typeof window.LearnPath.saveProgress === 'function') {
          window.LearnPath.saveProgress(updated);
        }
      }

      this.playTone('complete');
      this.renderResultsScreen(scorePct, elapsed);
    },

    /**
     * 6. Hiển thị Màn hình tổng kết (Results Screen)
     */
    renderResultsScreen(scorePct, elapsedSeconds) {
      const min = Math.floor(elapsedSeconds / 60);
      const sec = elapsedSeconds % 60;
      const timeStr = `${min > 0 ? min + 'm ' : ''}${sec}s`;

      const hasMistakes = (this.wrongWords.length > 0);

      let html = `
        <div class="practice-container">
          <div class="practice-results-card">
            <div class="results-trophy-badge">${ICONS.trophy}</div>
            <h1 class="results-title">Hoàn thành bài luyện tập!</h1>
            <p class="results-subtitle">Bài: <b>${this.lesson.title}</b></p>

            <div class="results-metrics-grid">
              <div class="results-metric-box">
                <span class="results-metric-num">${scorePct}%</span>
                <span class="results-metric-label">Độ chính xác</span>
              </div>
              <div class="results-metric-box">
                <span class="results-metric-num">${this.correctCount}/${this.questions.length}</span>
                <span class="results-metric-label">Số câu đúng</span>
              </div>
              <div class="results-metric-box">
                <span class="results-metric-num">${timeStr}</span>
                <span class="results-metric-label">Thời gian</span>
              </div>
            </div>

            ${hasMistakes ? `
              <div class="mistakes-section">
                <div class="mistakes-section-title">
                  ${ICONS.x} Các từ cần ôn tập (${this.wrongWords.length} từ đã ghi vào sổ tay):
                </div>
                <div class="mistakes-cards-grid">
                  ${this.wrongWords.map(w => `
                    <div class="mistake-word-chip" data-word="${w.hanzi || w.word}">
                      <span class="${this.lang === 'en' ? 'chip-word' : 'chip-hanzi'}">${w.hanzi || w.word}</span>
                      <span>${w.pinyin || w.ipa}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <div class="results-actions-row">
              ${hasMistakes ? `
                <button class="learn-btn-primary btn-gold" id="btn-retry-mistakes">
                  ${ICONS.repeat} Làm lại câu sai (${this.wrongWords.length})
                </button>
              ` : ''}
              <button class="learn-btn-secondary" id="btn-retry-all">
                ${ICONS.repeat} Luyện lại dạng này
              </button>
              <button class="learn-btn-secondary" id="btn-practice-hub-jump">
                ${ICONS.sparkle} Chọn dạng khác
              </button>
              <button class="learn-btn-secondary" id="btn-return-lesson">
                Về bài học
              </button>
            </div>
          </div>
        </div>
      `;

      this.containerEl.innerHTML = html;

      // Xử lý các nút bấm kết quả
      const retryMistakesBtn = this.containerEl.querySelector('#btn-retry-mistakes');
      if (retryMistakesBtn) {
        retryMistakesBtn.addEventListener('click', () => {
          this.questions = generateQuizQuestions(this.wrongWords, this.practiceType, this.lang, { limit: 10 });
          this.currentIndex = 0;
          this.correctCount = 0;
          this.wrongWords = [];
          this.correctWords = [];
          this.startTime = Date.now();
          this.renderQuestionRunner();
        });
      }

      const retryAllBtn = this.containerEl.querySelector('#btn-retry-all');
      if (retryAllBtn) {
        retryAllBtn.addEventListener('click', () => {
          this.startSession(this.practiceType);
        });
      }

      const hubJumpBtn = this.containerEl.querySelector('#btn-practice-hub-jump');
      if (hubJumpBtn) {
        hubJumpBtn.addEventListener('click', () => {
          if (typeof window !== 'undefined') {
            window.location.hash = `#${this.lang}/learn?lesson=${this.lesson.id}&practice=hub`;
          } else {
            this.renderHub();
          }
        });
      }

      const returnLessonBtn = this.containerEl.querySelector('#btn-return-lesson');
      if (returnLessonBtn) {
        returnLessonBtn.addEventListener('click', () => {
          if (typeof window !== 'undefined') {
            window.location.hash = `#${this.lang}/learn?lesson=${this.lesson.id}`;
          }
        });
      }
    },

    /**
     * Hỗ trợ phím tắt số 1-4 và Enter
     */
    attachGlobalKeyboardShortcuts() {
      if (typeof window === 'undefined') return;
      const keyHandler = (e) => {
        if (!this.containerEl) return;
        const targetTag = (e.target.tagName || '').toLowerCase();
        if (targetTag === 'input' || targetTag === 'textarea') return;

        if (['1', '2', '3', '4'].includes(e.key) && !this.isAnswered) {
          const idx = parseInt(e.key, 10) - 1;
          const choiceBtn = this.containerEl.querySelector(`.practice-choice-btn[data-choice-index="${idx}"]`);
          if (choiceBtn && !choiceBtn.disabled) {
            choiceBtn.click();
          }
        } else if (e.key === 'Enter') {
          const nextBtn = this.containerEl.querySelector('#btn-question-next');
          if (nextBtn) {
            nextBtn.click();
          }
        }
      };

      window.removeEventListener('keydown', this._activeKeyHandler);
      this._activeKeyHandler = keyHandler;
      window.addEventListener('keydown', keyHandler);
    },

    /**
     * Phát âm thanh mẫu
     */
    speak(text, speechLang = 'zh-CN', rate = 1.0) {
      if (typeof window === 'undefined' || !window.speechSynthesis || !text) return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = speechLang;
        u.rate = rate;
        window.speechSynthesis.speak(u);
      } catch (_) {}
    },

    /**
     * Web Audio Tone Beep
     */
    playTone(type) {
      if (typeof window === 'undefined') return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        const now = ctx.currentTime;

        if (type === 'correct') {
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
        } else if (type === 'wrong') {
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.setValueAtTime(196, now + 0.1);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          osc.start(now);
          osc.stop(now + 0.3);
        } else if (type === 'complete') {
          const notes = [523.25, 659.25, 783.99, 1046.5];
          notes.forEach((freq, idx) => {
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.connect(g);
            g.connect(ctx.destination);
            const t = now + idx * 0.08;
            o.frequency.setValueAtTime(freq, t);
            g.gain.setValueAtTime(0.18, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
            o.start(t);
            o.stop(t + 0.3);
          });
        }
      } catch (_) {}
    },

    /**
     * Dọn dẹp tài nguyên khi ẩn hoặc chuyển tab
     */
    cleanupSpeech() {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (this.speechRecognition) {
        try {
          this.speechRecognition.abort();
        } catch (_) {}
        this.speechRecognition = null;
      }
    },

    onHide() {
      this.cleanupSpeech();
      if (typeof window !== 'undefined' && this._activeKeyHandler) {
        window.removeEventListener('keydown', this._activeKeyHandler);
      }
    }
  };

  /* ==========================================================================
     7. GLOBAL EXPORTS CHO TRÌNH DUYỆT & NODE.JS
     ========================================================================== */

  if (typeof window !== 'undefined') {
    window.LessonPractice = LessonPractice;
    window.PRACTICE_TYPES = PRACTICE_TYPES;
    window.updatePracticeProgress = updatePracticeProgress;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      LessonPractice,
      PRACTICE_TYPES,
      ICONS,
      resolveLessonWords,
      filterPracticeWords,
      generateQuizQuestions,
      generatePinyinDistractors,
      generateMeaningDistractors,
      generateWordDistractors,
      getWordRadicalInfo,
      generateRadicalDistractors,
      getWordStressInfo,
      countIpaSyllables,
      splitWordSyllables,
      gradePinyinInput,
      gradeMatchPair,
      updatePracticeProgress
    };
  }
})();
