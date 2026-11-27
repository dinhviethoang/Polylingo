/**
 * game/farm.js - "Vườn Treo Tri Thức" (Vertical Hanging Gardens)
 * Web học ngoại ngữ đa ngôn ngữ cho người Việt.
 * Thể loại: Vườn chậu cây nhiều tầng trên mây nhìn ngang 2D, nâng cấp chậu, 16 loại cây,
 * chăm sóc gắn với học từ vựng (bắt sâu đố vui), bảng đơn hàng khinh khí cầu, linh thú.
 * Hỗ trợ chạy cả trên trình duyệt và Node.js test runner.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Nạp Thư Viện Sprites & Kinh Tế (Node.js hoặc Browser)
     ========================================================================== */

  let Sprites = null;
  if (typeof module !== 'undefined' && module.exports) {
    try {
      Sprites = require('./sprites.js');
    } catch (e) {
      Sprites = null;
    }
  } else if (typeof window !== 'undefined') {
    Sprites = window.FarmSprites || window.Sprites || null;
  }

  let PolyIcons = null;
  if (typeof module !== 'undefined' && module.exports) {
    try {
      PolyIcons = require('../icons.js');
    } catch (e) {
      try {
        PolyIcons = require('./icons.js');
      } catch (e2) {
        PolyIcons = null;
      }
    }
  } else if (typeof window !== 'undefined') {
    PolyIcons = window.PolyIcons || null;
  }

  function farmIcon(name, opts = {}) {
    const pi = (typeof window !== 'undefined' && window.PolyIcons) || PolyIcons;
    if (pi && typeof pi.svg === 'function') {
      return pi.svg(name, opts);
    }
    return '';
  }

  function getEconomy() {
    if (typeof window !== 'undefined' && window.Economy) {
      return window.Economy;
    }
    if (typeof module !== 'undefined' && module.exports) {
      try {
        return require('./economy.js');
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  // Dự phòng định nghĩa cây trồng và hạng chậu nếu chưa nạp sprites
  const CROP_DEFS = (Sprites && Sprites.CROP_DEFS) ? Sprites.CROP_DEFS : {
    chrysanthemum: { id: 'chrysanthemum', name: 'Hoa Cúc', hanzi: '菊花', pinyin: 'júhuā', meaning: 'Hoa cúc vàng', category: 'flower', seedCost: 6, growMinutes: 1, maxHarvests: 1, yield: 2, sellPrice: 6, xp: 6, unlockLevel: 1 },
    lotus:         { id: 'lotus', name: 'Hoa Sen', hanzi: '莲花', pinyin: 'liánhuā', meaning: 'Hoa sen thuần khiết', category: 'flower', seedCost: 14, growMinutes: 2, maxHarvests: 2, yield: 2, sellPrice: 14, xp: 12, unlockLevel: 2 },
    peony:         { id: 'peony', name: 'Mẫu Đơn', hanzi: '牡丹', pinyin: 'mǔdān', meaning: 'Mẫu đơn vương giả', category: 'flower', seedCost: 30, growMinutes: 4, maxHarvests: 2, yield: 3, sellPrice: 22, xp: 25, unlockLevel: 5 },
    peach_blossom: { id: 'peach_blossom', name: 'Hoa Đào', hanzi: '桃花', pinyin: 'táohuā', meaning: 'Hoa đào ngày Tết', category: 'flower', seedCost: 48, growMinutes: 6, maxHarvests: 3, yield: 3, sellPrice: 32, xp: 40, unlockLevel: 7 },
    plum_blossom:  { id: 'plum_blossom', name: 'Hoa Mai', hanzi: '梅花', pinyin: 'méihuā', meaning: 'Hoa mai kiên cường', category: 'flower', seedCost: 75, growMinutes: 8, maxHarvests: 3, yield: 4, sellPrice: 46, xp: 60, unlockLevel: 10 },
    strawberry:    { id: 'strawberry', name: 'Dâu Tây', hanzi: '草莓', pinyin: 'cǎoméi', meaning: 'Dâu tây đỏ mọng', category: 'crop', seedCost: 10, growMinutes: 1.5, maxHarvests: 3, yield: 3, sellPrice: 8, xp: 8, unlockLevel: 1 },
    tomato:        { id: 'tomato', name: 'Cà Chua', hanzi: '西红柿', pinyin: 'xīhóngshì', meaning: 'Cà chua chín đỏ', category: 'crop', seedCost: 16, growMinutes: 2.5, maxHarvests: 2, yield: 3, sellPrice: 13, xp: 14, unlockLevel: 2 },
    pumpkin:       { id: 'pumpkin', name: 'Bí Ngô', hanzi: '南瓜', pinyin: 'nánguā', meaning: 'Bí ngô vàng óng', category: 'crop', seedCost: 22, growMinutes: 3.5, maxHarvests: 1, yield: 1, sellPrice: 42, xp: 20, unlockLevel: 3 },
    watermelon:    { id: 'watermelon', name: 'Dưa Hấu', hanzi: '西瓜', pinyin: 'xīguā', meaning: 'Dưa hấu mát ngọt', category: 'crop', seedCost: 35, growMinutes: 5, maxHarvests: 1, yield: 1, sellPrice: 70, xp: 30, unlockLevel: 4 },
    tea:           { id: 'tea', name: 'Cây Trà', hanzi: '茶', pinyin: 'chá', meaning: 'Búp trà xanh thơm', category: 'crop', seedCost: 45, growMinutes: 5, maxHarvests: 4, yield: 3, sellPrice: 24, xp: 36, unlockLevel: 6 },
    bamboo:        { id: 'bamboo', name: 'Tre Trúc', hanzi: '竹子', pinyin: 'zhúzi', meaning: 'Khóm tre măng non', category: 'crop', seedCost: 65, growMinutes: 7, maxHarvests: 2, yield: 4, sellPrice: 50, xp: 52, unlockLevel: 8 },
    grape:         { id: 'grape', name: 'Nho Tím', hanzi: '葡萄', pinyin: 'pútao', meaning: 'Chùm nho mọng nước', category: 'crop', seedCost: 80, growMinutes: 8, maxHarvests: 3, yield: 4, sellPrice: 45, xp: 66, unlockLevel: 9 },
    apple:         { id: 'apple', name: 'Cây Táo', hanzi: '苹果', pinyin: 'píngguǒ', meaning: 'Táo đỏ giòn ngọt', category: 'crop', seedCost: 100, growMinutes: 10, maxHarvests: 4, yield: 4, sellPrice: 58, xp: 85, unlockLevel: 11 },
    orange:        { id: 'orange', name: 'Cây Cam', hanzi: '橙子', pinyin: 'chéngzi', meaning: 'Cam vàng mọng nước', category: 'crop', seedCost: 125, growMinutes: 12, maxHarvests: 4, yield: 5, sellPrice: 65, xp: 100, unlockLevel: 12 },
    ginseng:       { id: 'ginseng', name: 'Nhân Sâm', hanzi: '人参', pinyin: 'rénshēn', meaning: 'Nhân sâm trường thọ', category: 'rare', seedCost: 220, growMinutes: 15, maxHarvests: 2, yield: 2, sellPrice: 240, xp: 180, unlockLevel: 14 },
    celestial_peach: { id: 'celestial_peach', name: 'Đào Tiên', hanzi: '仙桃', pinyin: 'xiāntáo', meaning: 'Đào tiên bồng lai', category: 'rare', seedCost: 380, growMinutes: 20, maxHarvests: 3, yield: 3, sellPrice: 340, xp: 280, unlockLevel: 16 }
  };

  const POT_TIERS = (Sprites && Sprites.POT_TIERS) ? Sprites.POT_TIERS : {
    clay:      { id: 'clay', name: 'Đất nung', fullName: 'Chậu Đất Nung', cost: 30, unlockLevel: 1, upgrades: [{ star: 1, speed: 0, yieldBonus: 0, xpBonus: 0, doubleChance: 0 }] },
    ceramic:   { id: 'ceramic', name: 'Gốm men', fullName: 'Chậu Gốm Men', cost: 150, unlockLevel: 3, upgrades: [{ star: 1, speed: 0.15, yieldBonus: 0.15, xpBonus: 0.20, doubleChance: 0.12 }] },
    porcelain: { id: 'porcelain', name: 'Sứ lam', fullName: 'Chậu Sứ Lam', cost: 400, unlockLevel: 6, upgrades: [{ star: 1, speed: 0.28, yieldBonus: 0.30, xpBonus: 0.45, doubleChance: 0.22 }] },
    jade:      { id: 'jade', name: 'Ngọc bích', fullName: 'Chậu Ngọc Bích', cost: 1000, unlockLevel: 9, upgrades: [{ star: 1, speed: 0.40, yieldBonus: 0.55, xpBonus: 0.75, doubleChance: 0.32 }] },
    gold:      { id: 'gold', name: 'Hoàng kim', fullName: 'Chậu Hoàng Kim', cost: 2500, unlockLevel: 13, upgrades: [{ star: 1, speed: 0.52, yieldBonus: 0.85, xpBonus: 1.25, doubleChance: 0.42 }] }
  };

  const THEMES = (Sprites && Sprites.THEMES) ? Sprites.THEMES : {
    chinese:  { id: 'chinese', langCode: 'zh', name: 'Vườn tre Trung Hoa', icon: '🎋', accent: '#B3261E' },
    japanese: { id: 'japanese', langCode: 'ja', name: 'Vườn anh đào Nhật', icon: '🌸', accent: '#E05D82' },
    english:  { id: 'english', langCode: 'en', name: 'Vườn hoa hồng Anh', icon: '🌹', accent: '#2563EB' },
    russian:  { id: 'russian', langCode: 'ru', name: 'Vườn bạch dương Nga', icon: '🌻', accent: '#D97706' }
  };

  // Chi phí và cấp mở tầng (Tối đa 8 tầng - Tầng 1, 2, 3 có sẵn)
  const TIER_UNLOCKS = [
    { tier: 1, cost: 0, level: 1 },
    { tier: 2, cost: 0, level: 1 },
    { tier: 3, cost: 0, level: 1 },
    { tier: 4, cost: 500, level: 6 },
    { tier: 5, cost: 900, level: 8 },
    { tier: 6, cost: 1500, level: 11 },
    { tier: 7, cost: 2500, level: 14 },
    { tier: 8, cost: 4000, level: 18 }
  ];

  // Cấu hình Tiên Vườn trợ thủ mỗi tầng
  const FAIRY_CONFIG = {
    names: {
      chinese: 'Tiên Trúc',
      japanese: 'Tiên Anh Đào',
      english: 'Tiên Hồng',
      russian: 'Tiên Bạch Dương'
    },
    upgrades: [
      { level: 1, name: 'Cấp 1: Tự tưới cây khát', desc: 'Dùng giọt nước tưới cây cần nước trên tầng', cost: 100, playerLevel: 1 },
      { level: 2, name: 'Cấp 2: Tự thu hoạch vào kho', desc: 'Thu hoạch cây chín cất vào kho', cost: 250, playerLevel: 2 },
      { level: 3, name: 'Cấp 3: Tự gieo lại hạt giống', desc: 'Mua lại loại hạt vừa thu để gieo tiếp', cost: 500, playerLevel: 4 },
      { level: 4, name: 'Cấp 4: Tăng tốc & May mắn', desc: 'Chu kỳ nhanh gấp đôi + 10% cơ hội +1 nông sản', cost: 1000, playerLevel: 6 },
      { level: 5, name: 'Cấp 5: Làm việc ngoại tuyến', desc: 'Chăm sóc vườn cả khi đóng game (tối đa 8 giờ)', cost: 2000, playerLevel: 8 }
    ]
  };

  // Kho từ vựng dự phòng cho đố vui bắt sâu (chọn nghĩa tiếng Trung)
  const BACKUP_VOCAB = [
    { hanzi: '水', pinyin: 'shuǐ', vi: 'Nước / Nước uống', wrongs: ['Lửa', 'Đất', 'Gió'] },
    { hanzi: '茶', pinyin: 'chá', vi: 'Trà / Chè', wrongs: ['Cà phê', 'Nước ngọt', 'Rượu'] },
    { hanzi: '花', pinyin: 'huā', vi: 'Hoa / Bông hoa', wrongs: ['Cây cỏ', 'Chiếc lá', 'Cành cây'] },
    { hanzi: '树', pinyin: 'shù', vi: 'Cây cối', wrongs: ['Bụi cỏ', 'Bông hoa', 'Hạt mầm'] },
    { hanzi: '草', pinyin: 'cǎo', vi: 'Cỏ', wrongs: ['Rừng rậm', 'Cành lá', 'Gốc cây'] },
    { hanzi: '果', pinyin: 'guǒ', vi: 'Quả / Trái cây', wrongs: ['Rễ cây', 'Thân cây', 'Lá cây'] },
    { hanzi: '苹果', pinyin: 'píngguǒ', vi: 'Quả táo', wrongs: ['Quả chuối', 'Quả dưa hấu', 'Quả dâu tây'] },
    { hanzi: '西瓜', pinyin: 'xīguā', vi: 'Dưa hấu', wrongs: ['Dưa lê', 'Bí đỏ', 'Bí đao'] },
    { hanzi: '太阳', pinyin: 'tàiyáng', vi: 'Mặt trời', wrongs: ['Mặt trăng', 'Ngôi sao', 'Đám mây'] },
    { hanzi: '月亮', pinyin: 'yuèliang', vi: 'Mặt trăng', wrongs: ['Mặt trời', 'Cầu vồng', 'Cơn gió'] },
    { hanzi: '云', pinyin: 'yún', vi: 'Mây / Đám mây', wrongs: ['Sương mù', 'Cơn mưa', 'Tuyết trắng'] },
    { hanzi: '雨', pinyin: 'yǔ', vi: 'Mưa', wrongs: ['Nắng', 'Gió', 'Mây'] },
    { hanzi: '朋友', pinyin: 'péngyou', vi: 'Bạn bè', wrongs: ['Thầy giáo', 'Bác sĩ', 'Học sinh'] },
    { hanzi: '老师', pinyin: 'lǎoshī', vi: 'Thầy cô giáo', wrongs: ['Học trò', 'Bảo vệ', 'Kỹ sư'] },
    { hanzi: '学习', pinyin: 'xuéxí', vi: 'Học tập', wrongs: ['Vui chơi', 'Nghỉ ngơi', 'Làm việc'] },
    { hanzi: '书', pinyin: 'shū', vi: 'Sách / Vở', wrongs: ['Bút viết', 'Cái bàn', 'Cái ghế'] }
  ];

  /* ==========================================================================
     1.5. Hạt Giống Từ Vựng, Chu Trình Lặp Lại Ngắt Quãng (SRS) & Từ Điển Vườn
     ========================================================================== */

  // Khoảng ôn tập chuẩn SRS: 10 phút -> 1 ngày -> 3 ngày -> 7 ngày
  const SRS_INTERVALS = [
    10 * 60 * 1000,           // GĐ 1: 10 phút (600,000ms)
    24 * 60 * 60 * 1000,       // GĐ 2: 1 ngày (86,400,000ms)
    3 * 24 * 60 * 60 * 1000,   // GĐ 3: 3 ngày (259,200,000ms)
    7 * 24 * 60 * 60 * 1000    // GĐ 4: 7 ngày (604,800,000ms)
  ];

  let _hsk1WordsCache = null;
  function getHsk1Words() {
    if (typeof window !== 'undefined' && window.HSK1_WORDS && Object.keys(window.HSK1_WORDS).length > 0) {
      return window.HSK1_WORDS;
    }
    if (_hsk1WordsCache) return _hsk1WordsCache;
    let dict = {};
    if (typeof require !== 'undefined') {
      try {
        if (typeof global !== 'undefined' && !global.window) global.window = global;
        const a = require('../data/zh/hsk1-words-a.js');
        const b = require('../data/zh/hsk1-words-b.js');
        dict = Object.assign({}, a || {}, b || {}, (typeof global !== 'undefined' && global.window && global.window.HSK1_WORDS) || {});
      } catch (e) {
        try {
          const a = require('./data/zh/hsk1-words-a.js');
          const b = require('./data/zh/hsk1-words-b.js');
          dict = Object.assign({}, a || {}, b || {});
        } catch (_) {}
      }
    }
    _hsk1WordsCache = dict;
    return dict;
  }

  let _curriculumCache = null;
  function getCurriculum() {
    if (typeof window !== 'undefined' && window.CURRICULUM) {
      return window.CURRICULUM;
    }
    if (_curriculumCache) return _curriculumCache;
    let curr = null;
    if (typeof require !== 'undefined') {
      try {
        if (typeof global !== 'undefined' && !global.window) global.window = global;
        curr = require('../data/zh/curriculum.js');
      } catch (e) {
        try {
          curr = require('./data/zh/curriculum.js');
        } catch (_) {}
      }
    }
    _curriculumCache = curr;
    return curr;
  }

  function getSpeechHelpers() {
    let norm = (typeof window !== 'undefined' && window.normalizeHanzi) || null;
    let score = (typeof window !== 'undefined' && window.scoreRecognition) || null;
    if ((!norm || !score) && typeof require !== 'undefined') {
      try {
        const sp = require('../speak.js');
        norm = norm || sp.normalizeHanzi;
        score = score || sp.scoreRecognition;
      } catch (e) {
        try {
          const sp = require('./speak.js');
          norm = norm || sp.normalizeHanzi;
          score = score || sp.scoreRecognition;
        } catch (_) {}
      }
    }
    if (!norm) {
      norm = function(s) {
        if (!s || typeof s !== 'string') return '';
        return s.replace(/[\s\p{P}\p{S}]/gu, '');
      };
    }
    if (!score) {
      score = function(target, transcripts) {
        const normTarget = norm(target);
        if (!transcripts || !Array.isArray(transcripts) || transcripts.length === 0) return { score: 0 };
        for (const item of transcripts) {
          const raw = typeof item === 'string' ? item : ((item && item.transcript) || '');
          if (norm(raw) === normTarget) return { score: 1.0, best: raw };
        }
        return { score: 0, best: '' };
      };
    }
    return { normalizeHanzi: norm, scoreRecognition: score };
  }

  function resolveWordInfo(hanzi, customDict) {
    if (!hanzi) return { hanzi: '', py: '', vi: '', hv: '', ex: null };
    if (customDict && customDict[hanzi]) {
      const w = customDict[hanzi];
      return {
        hanzi,
        py: w.py || w.pinyin || '',
        vi: w.vi || w.meaning || '',
        hv: w.hv || w.hanViet || '',
        ex: w.ex || (w.example ? { zh: w.example.zh, py: w.example.py, vi: w.example.vi } : null)
      };
    }
    const dict = getHsk1Words();
    if (dict && dict[hanzi]) {
      const w = dict[hanzi];
      return {
        hanzi,
        py: w.py || w.pinyin || '',
        vi: w.vi || w.meaning || '',
        hv: w.hv || w.hanViet || '',
        ex: w.ex || (w.example ? { zh: w.example.zh, py: w.example.py, vi: w.example.vi } : null)
      };
    }
    const backup = BACKUP_VOCAB.find(b => b.hanzi === hanzi);
    if (backup) {
      return {
        hanzi,
        py: backup.pinyin || '',
        vi: backup.vi || '',
        hv: '',
        ex: null
      };
    }
    return {
      hanzi,
      py: '',
      vi: hanzi,
      hv: '',
      ex: null
    };
  }

  function getLearnedWords(options = {}) {
    const eco = getEconomy();
    const prog = options.learnProgress || (eco ? eco.getLearnProgress() : { lessons: {} });
    const completedLessons = Object.keys(prog.lessons || {}).filter(id => {
      const l = prog.lessons[id];
      return l && (l.stars > 0 || l.score > 0 || l.best > 0 || l.doneAt || l.completed);
    });

    const wordsMap = new Map();
    const curr = options.curriculum || getCurriculum();

    if (curr && curr.levels) {
      for (const lvl of curr.levels) {
        if (!lvl.units) continue;
        for (const unit of lvl.units) {
          if (!unit.lessons) continue;
          for (const lesson of unit.lessons) {
            if (completedLessons.includes(lesson.id)) {
              if (Array.isArray(lesson.newWords)) {
                for (const hanzi of lesson.newWords) {
                  if (!wordsMap.has(hanzi)) {
                    wordsMap.set(hanzi, resolveWordInfo(hanzi, options.customDict));
                  }
                }
              }
            }
          }
        }
      }
    }

    if (Array.isArray(options.learnedWords)) {
      for (const hanzi of options.learnedWords) {
        if (!wordsMap.has(hanzi)) {
          wordsMap.set(hanzi, resolveWordInfo(hanzi, options.customDict));
        }
      }
    }

    const state = options.state || (eco ? eco.getState() : null);
    if (state && state.farm && state.farm.wordbook) {
      Object.keys(state.farm.wordbook).forEach(key => {
        const entry = state.farm.wordbook[key];
        if (entry && !entry.isNormalCrop && entry.hanzi && !wordsMap.has(entry.hanzi)) {
          wordsMap.set(entry.hanzi, resolveWordInfo(entry.hanzi, options.customDict));
        }
      });
    }

    return Array.from(wordsMap.values());
  }

  function sowWordSeedIntoSlot(slotIndex, hanzi, options = {}) {
    const eco = getEconomy();
    const state = options.state || (eco ? eco.getState() : null);
    if (!state || !state.farm) return { success: false, error: 'Không tìm thấy nông trại' };
    const farm = state.farm;

    const learned = getLearnedWords(options);
    const isLearned = learned.some(w => w.hanzi === hanzi);
    if (!isLearned && !options.force) {
      if (eco && typeof eco.showToast === 'function') {
        eco.showToast(`${farmIcon('alert', { className: 'vt-icon-warn' })} Từ "${hanzi}" chưa được học! Hãy hoàn thành bài học chứa từ này để nhận hạt giống.`);
      }
      return { success: false, error: 'Chỉ có thể gieo từ vựng đã học' };
    }

    if (slotIndex === null || slotIndex === undefined) {
      const emptySlot = farm.slots.find(s => s && s.pot && !s.pot.crop);
      if (!emptySlot) {
        if (eco && typeof eco.showToast === 'function') {
          eco.showToast(`${farmIcon('alert', { className: 'vt-icon-warn' })} Không có chậu trống để gieo hạt!`);
        }
        return { success: false, error: 'Không có chậu trống' };
      }
      slotIndex = emptySlot.slotIndex;
    }

    const slot = farm.slots[slotIndex];
    if (!slot || !slot.pot) {
      return { success: false, error: 'Chưa có chậu ở ô này' };
    }
    if (slot.pot.crop) {
      return { success: false, error: 'Chậu đã có cây' };
    }

    const now = options.now || Date.now();
    const intervals = options.intervals || SRS_INTERVALS;
    const initialInterval = options.initialInterval || intervals[0];
    const wordData = resolveWordInfo(hanzi, options.customDict);

    slot.pot.crop = {
      cropId: 'word_tree',
      isWordTree: true,
      wordHanzi: hanzi,
      wordData: wordData,
      stage: 1,
      reviewsPassed: 0,
      intervalIndex: 0,
      intervalMs: initialInterval,
      plantedAt: now,
      lastReviewedAt: now,
      dueAt: now + initialInterval,
      watered: true,
      isRipe: false,
      boostedStages: [],
      pest: null
    };

    if (!farm.wordbook) farm.wordbook = {};
    farm.wordbook[hanzi] = {
      hanzi,
      pinyin: wordData.py,
      meaning: wordData.vi,
      hanViet: wordData.hv,
      example: wordData.ex,
      status: 'growing',
      stage: 1,
      reviewsPassed: 0,
      isWordTree: true,
      plantedAt: now
    };

    if (eco && typeof eco.saveState === 'function') {
      eco.saveState();
    }

    if (typeof playChime === 'function') playChime(true);
    if (typeof speakText === 'function') speakText(hanzi);
    if (eco && typeof eco.showToast === 'function') {
      eco.showToast(`${farmIcon('sprout', { className: 'vt-icon-sprout' })} Đã gieo Cây Từ "${hanzi}" (${wordData.py})! Hãy chăm sóc và ôn tập ngắt quãng nhé.`);
    }

    if (typeof refreshTiersView === 'function') refreshTiersView();
    if (typeof updateHUDValues === 'function') updateHUDValues();

    return { success: true, slotIndex, crop: slot.pot.crop };
  }

  function reviewWordTree(slotOrCrop, isCorrect, now = Date.now(), options = {}) {
    const crop = (slotOrCrop && slotOrCrop.pot) ? slotOrCrop.pot.crop : slotOrCrop;
    if (!crop || !crop.isWordTree) return null;

    const intervals = options.intervals || SRS_INTERVALS;
    const eco = getEconomy();
    const hanzi = crop.wordHanzi;

    if (isCorrect) {
      crop.reviewsPassed = (crop.reviewsPassed || 0) + 1;
      crop.lastReviewedAt = now;

      if (crop.reviewsPassed >= 4) {
        crop.stage = 4;
        crop.isRipe = true;
        crop.dueAt = 0;
      } else {
        crop.stage = Math.min(4, (crop.stage || 1) + 1);
        crop.intervalIndex = Math.min(intervals.length - 1, (crop.intervalIndex !== undefined ? crop.intervalIndex : 0) + 1);
        crop.intervalMs = intervals[crop.intervalIndex];
        crop.dueAt = now + crop.intervalMs;
      }

      const state = options.state || (eco ? eco.getState() : null);
      if (state && state.farm) {
        if (!state.farm.wordbook) state.farm.wordbook = {};
        if (state.farm.wordbook[hanzi]) {
          state.farm.wordbook[hanzi].stage = crop.stage;
          state.farm.wordbook[hanzi].reviewsPassed = crop.reviewsPassed;
          state.farm.wordbook[hanzi].status = crop.isRipe ? 'ripe' : 'growing';
        }
      }

      if (eco && typeof eco.saveState === 'function') {
        eco.saveState();
      }

      return {
        success: true,
        correct: true,
        stage: crop.stage,
        reviewsPassed: crop.reviewsPassed,
        intervalMs: crop.intervalMs,
        dueAt: crop.dueAt,
        isRipe: crop.isRipe
      };
    } else {
      crop.lastReviewedAt = now;
      if (crop.intervalIndex !== undefined && crop.intervalIndex > 0) {
        crop.intervalIndex = crop.intervalIndex - 1;
        crop.intervalMs = intervals[crop.intervalIndex];
      } else {
        crop.intervalMs = Math.max(5 * 60 * 1000, Math.round((crop.intervalMs || intervals[0]) * 0.5));
      }
      crop.dueAt = now + crop.intervalMs;

      if (eco && typeof eco.getLearnProgress === 'function') {
        const prog = eco.getLearnProgress();
        if (!prog.hardWords) prog.hardWords = {};
        const curCount = typeof prog.hardWords[hanzi] === 'number' ? prog.hardWords[hanzi] : (prog.hardWords[hanzi]?.reviewsCount || 0);
        prog.hardWords[hanzi] = curCount + 1;
        if (typeof eco._setLearnProgress === 'function') {
          eco._setLearnProgress(prog);
        }
      }

      const state = options.state || (eco ? eco.getState() : null);
      if (state && state.farm) {
        if (!state.farm.wordbook) state.farm.wordbook = {};
        if (state.farm.wordbook[hanzi]) {
          state.farm.wordbook[hanzi].status = 'growing';
        }
      }

      if (eco && typeof eco.saveState === 'function') {
        eco.saveState();
      }

      return {
        success: true,
        correct: false,
        stage: crop.stage,
        reviewsPassed: crop.reviewsPassed,
        intervalMs: crop.intervalMs,
        dueAt: crop.dueAt,
        isRipe: false,
        correctAnswer: crop.wordData || resolveWordInfo(hanzi, options.customDict)
      };
    }
  }

  function boostPlantByName(slotIndex, answer, options = {}) {
    const eco = getEconomy();
    const state = options.state || (eco ? eco.getState() : null);
    if (!state || !state.farm) return { success: false, reason: 'no_farm' };
    const farm = state.farm;
    const slot = farm.slots[slotIndex];
    if (!slot || !slot.pot || !slot.pot.crop) return { success: false, reason: 'no_crop' };

    const crop = slot.pot.crop;
    if (crop.isWordTree) return { success: false, reason: 'is_word_tree' };

    const now = options.now || Date.now();
    const st = plotStatus(slot, now);
    if (st.state !== 'growing') {
      return { success: false, reason: 'not_growing' };
    }

    crop.boostedStages = crop.boostedStages || [];
    if (crop.boostedStages.includes(st.stage)) {
      return { success: false, reason: 'already_boosted' };
    }

    const cDef = st.cropDef || CROP_DEFS[crop.cropId] || CROP_DEFS.chrysanthemum;
    const helpers = getSpeechHelpers();

    let isMatch = false;
    if (typeof answer === 'string') {
      const cleanAnswer = answer.trim().toLowerCase().replace(/[\s\p{P}]/gu, '');
      const cleanPinyin = (cDef.pinyin || '').toLowerCase().replace(/[\s\p{P}]/gu, '');
      const normHanzi = helpers.normalizeHanzi(cDef.hanzi);
      const cleanNormAnswer = helpers.normalizeHanzi(answer);

      if (cleanAnswer === cleanPinyin || cleanNormAnswer === normHanzi) {
        isMatch = true;
      } else {
        const stripTone = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ü/g, 'v');
        if (stripTone(cleanAnswer) === stripTone(cleanPinyin)) {
          isMatch = true;
        }
      }
    } else if (Array.isArray(answer)) {
      const res = helpers.scoreRecognition(cDef.hanzi, answer);
      if (res && res.score >= 0.7) {
        isMatch = true;
      }
    }

    if (!isMatch) {
      return { success: false, reason: 'incorrect' };
    }

    crop.boostedStages.push(st.stage);
    const baseMinutes = cDef.growMinutes || 2;
    const baseGrowMs = baseMinutes * 60 * 1000;
    crop.accumulatedGrowthMs = (crop.accumulatedGrowthMs || 0) + Math.round(baseGrowMs * 0.10);

    if (eco && typeof eco.saveState === 'function') {
      eco.saveState();
    }

    return { success: true, stage: st.stage, newAccumulated: crop.accumulatedGrowthMs };
  }

  /* ==========================================================================
     2. Dữ liệu & Tự Động Chuyển Đổi Dữ Liệu Cũ (Migration)
     ========================================================================== */

  /**
   * Tạo 6 ô chậu trống cho 1 tầng
   */
  function createTierSlots(tierIdx) {
    const slots = [];
    for (let i = 0; i < 6; i++) {
      slots.push({
        slotIndex: (tierIdx * 6) + i,
        pot: null
      });
    }
    return slots;
  }

  /**
   * Sinh 3 đơn hàng khinh khí cầu ngẫu nhiên
   */
  function generateBalloonOrders() {
    const customers = [
      { id: 'tieu-mai', name: 'Tiểu Mai', avatar: '👧', quote: '我想买一些新鲜的水果！' },
      { id: 'thay-ly', name: 'Thầy Lý', avatar: '👨‍🏫', quote: '请帮我准备 这些，非常感谢！' },
      { id: 'bac-vuong', name: 'Bác Vương', avatar: '👴', quote: '这里的农产品真好，品质很棒！' },
      { id: 'co-lan', name: 'Cô Lan', avatar: '👩', quote: '太棒了，这正是我要找的！' },
      { id: 'su-phu-chu', name: 'Sư phụ Chu', avatar: '🧔', quote: '辛苦你了，慢慢准备不用急！' }
    ];
    const cropKeys = Object.keys(CROP_DEFS);
    const orders = [];

    for (let i = 0; i < 3; i++) {
      const cust = customers[(i + Math.floor(Math.random() * customers.length)) % customers.length];
      const cropKey1 = cropKeys[Math.floor(Math.random() * Math.min(6, cropKeys.length))];
      const count1 = 2 + Math.floor(Math.random() * 3);
      const cropDef1 = CROP_DEFS[cropKey1];

      const rewardCoins = (cropDef1.sellPrice * count1 * 1.8) + 20;
      const rewardXp = (cropDef1.xp * count1 * 1.5) + 15;
      const materialsPool = ['clay', 'glaze', 'jadePowder'];
      const matKey = materialsPool[Math.floor(Math.random() * materialsPool.length)];

      orders.push({
        id: 'order_' + Date.now() + '_' + i,
        npcId: cust.id,
        customer: cust.name,
        avatar: cust.avatar,
        customerQuote: cust.quote,
        cropId: cropKey1,
        count: count1,
        rewardCoins: Math.round(rewardCoins),
        rewardXp: Math.round(rewardXp),
        rewardMaterial: { type: matKey, count: 1 + Math.floor(Math.random() * 2) },
        usedHint: false,
        delivered: false
      });
    }
    return orders;
  }

  /**
   * Đảm bảo và chuyển đổi cấu trúc dữ liệu farm
   */
  function ensureFarmState(customState) {
    const eco = getEconomy();
    const state = customState || (eco ? eco.getState() : null);
    if (!state) return null;

    let needSave = false;

    // Chuyển đổi từ dữ liệu nông trại cũ (nếu có plots dạng ô ruộng isometric)
    if (!state.farm || state.farm.version !== 2) {
      const oldPlots = (state.farm && state.farm.plots) || [];
      const migratedItems = {};

      // Thu hồi nông sản cũ vào kho
      oldPlots.forEach(p => {
        if (p && p.cropId) {
          migratedItems[p.cropId] = (migratedItems[p.cropId] || 0) + 1;
        }
      });

      // Tạo cấu trúc mới: Vườn Treo Tri Thức (Người chơi mới có sẵn ít nhất 3 tầng)
      const initialSlots = [];
      for (let i = 0; i < 18; i++) {
        initialSlots.push({ slotIndex: i, pot: null });
      }
      // Tặng chậu Đất nung tân thủ tại ô số 0
      initialSlots[0].pot = {
        type: 'clay',
        stars: 1,
        crop: null
      };

      state.farm = {
        version: 2,
        name: 'Vườn Treo Tri Thức',
        tierCount: 3,
        tierThemes: ['chinese', 'japanese', 'english'],
        activeTier: 0,
        slots: initialSlots,
        fairies: [
          { level: 0, enabled: { water: true, harvest: true, replant: true }, lastWorkAt: 0 },
          { level: 0, enabled: { water: true, harvest: true, replant: true }, lastWorkAt: 0 },
          { level: 0, enabled: { water: true, harvest: true, replant: true }, lastWorkAt: 0 }
        ],
        warehouse: {
          capacity: 50,
          items: Object.assign({ chrysanthemum: 2, strawberry: 2 }, migratedItems)
        },
        wordbook: {},
        materials: {
          clay: 6,
          glaze: 2,
          jadePowder: 0,
          goldLeaf: 0
        },
        fertilizer: 3,
        orders: generateBalloonOrders(),
        ordersRefreshedAt: Date.now(),
        tutorialStep: 0,
        lastActiveAt: Date.now()
      };

      needSave = true;
    }

    // Đảm bảo dữ liệu cũ có tierCount < 3 tự nâng lên 3 khi tải (thêm slot trống, giữ chậu/cây cũ)
    if (!state.farm.tierCount || state.farm.tierCount < 3) {
      state.farm.tierCount = 3;
      needSave = true;
    }

    // Đảm bảo danh sách phong cách tầng đủ ít nhất 3 tầng
    const defaultThemes = ['chinese', 'japanese', 'english'];
    if (!state.farm.tierThemes || !Array.isArray(state.farm.tierThemes)) {
      state.farm.tierThemes = ['chinese', 'japanese', 'english'];
      needSave = true;
    } else {
      while (state.farm.tierThemes.length < 3) {
        state.farm.tierThemes.push(defaultThemes[state.farm.tierThemes.length]);
        needSave = true;
      }
    }

    // Đảm bảo các ô chậu: tối thiểu 18 ô (3 tầng x 6 ô)
    if (!state.farm.slots || !Array.isArray(state.farm.slots)) {
      state.farm.slots = [];
      needSave = true;
    }
    const targetSlotsCount = state.farm.tierCount * 6;
    while (state.farm.slots.length < targetSlotsCount) {
      state.farm.slots.push({
        slotIndex: state.farm.slots.length,
        pot: null
      });
      needSave = true;
    }

    // Đảm bảo dữ liệu Tiên Vườn cho từng tầng
    if (!state.farm.fairies || !Array.isArray(state.farm.fairies)) {
      state.farm.fairies = [];
      needSave = true;
    }
    while (state.farm.fairies.length < state.farm.tierCount) {
      state.farm.fairies.push({
        level: 0,
        enabled: { water: true, harvest: true, replant: true },
        lastWorkAt: 0
      });
      needSave = true;
    }

    if (!state.farm.lastActiveAt) {
      state.farm.lastActiveAt = Date.now();
      needSave = true;
    }
    if (!state.farm.materials) {
      state.farm.materials = { clay: 6, glaze: 2, jadePowder: 0, goldLeaf: 0 };
      needSave = true;
    }
    if (typeof state.farm.fertilizer !== 'number') {
      state.farm.fertilizer = 3;
      needSave = true;
    }
    if (!state.farm.orders || state.farm.orders.length === 0) {
      state.farm.orders = generateBalloonOrders();
      needSave = true;
    }
    if (!state.farm.tierThemes) {
      state.farm.tierThemes = ['chinese'];
      needSave = true;
    }
    if (!state.farm.wordbook) {
      state.farm.wordbook = {};
      needSave = true;
    }

    if (!customState && needSave && eco && typeof eco.saveState === 'function') {
      eco.saveState();
    }
    return state.farm;
  }

  /* ==========================================================================
     3. Tính Toán Trạng Thái Cây Trồng Trong Chậu (plotStatus / getPotStatus)
     ========================================================================== */

  /**
   * Tính trạng thái của 1 ô chậu (chuẩn API cho cả game và tests)
   * Trả về: { state: 'empty'|'thirsty'|'growing'|'pest'|'ripe', progress, stage, timeRemainingMs, cropDef }
   */
  function plotStatus(plotOrSlot, now = Date.now(), cropDefs = CROP_DEFS) {
    if (!plotOrSlot) return { state: 'empty', progress: 0, stage: 0 };

    // Hỗ trợ cả cấu trúc slot mới { pot: { crop: ... } } và plot cũ { cropId, plantedAt, wateredCount }
    let pot = null;
    let crop = null;

    if (plotOrSlot.pot !== undefined) {
      // Cấu trúc mới
      pot = plotOrSlot.pot;
      if (!pot) return { state: 'empty', progress: 0, stage: 0 };
      crop = pot.crop;
    } else if (plotOrSlot.cropId !== undefined) {
      // Cấu trúc tương thích cũ cho test runner
      if (!plotOrSlot.cropId) return { state: 'empty', progress: 0, stage: 0 };
      const cDef = cropDefs[plotOrSlot.cropId] || CROP_DEFS.chrysanthemum;
      const totalGrowMs = (cDef.growMinutes || 2) * 60 * 1000;
      const elapsed = Math.max(0, now - (plotOrSlot.plantedAt || now));
      const waterReq = cDef.waterNeeded !== undefined ? cDef.waterNeeded : 1;
      const watered = (plotOrSlot.wateredCount || 0) >= waterReq;

      // Nếu cần 2 lần tưới và mới tưới 1 lần sau nửa chặng
      const progress = Math.min(1, elapsed / totalGrowMs);
      if (waterReq >= 2 && plotOrSlot.wateredCount < 2 && progress >= 0.5) {
        return { state: 'thirsty', progress, stage: progress < 0.3 ? 1 : (progress < 0.7 ? 2 : 3) };
      }

      if (!watered && (plotOrSlot.wateredCount || 0) === 0) {
        return { state: 'thirsty', progress: 0, stage: 1 };
      }

      if (progress >= 1 && watered) {
        return { state: 'ripe', progress: 1, stage: 4 };
      }
      if (progress >= 1 && !watered) {
        return { state: 'thirsty', progress: 1, stage: 3 };
      }

      const stage = progress < 0.25 ? 1 : (progress < 0.6 ? 2 : (progress < 0.95 ? 3 : 4));
      return { state: 'growing', progress, stage };
    }

    if (!crop || !crop.cropId) {
      return { state: 'empty', progress: 0, stage: 0 };
    }

    // XỬ LÝ CÂY TỪ VỰNG (Word Tree - Sinh trưởng theo Lặp lại ngắt quãng SRS)
    if (crop.isWordTree || crop.cropId === 'word_tree') {
      const wordHanzi = crop.wordHanzi || '字';
      const wData = crop.wordData || resolveWordInfo(wordHanzi);
      const cDef = {
        name: `Cây Từ (${wordHanzi})`,
        hanzi: wordHanzi,
        pinyin: wData.py || '',
        meaning: wData.vi || '',
        isWordTree: true
      };

      if (crop.pest) {
        return {
          state: 'pest',
          progress: (crop.reviewsPassed || 0) / 4,
          stage: crop.stage || 1,
          timeRemainingMs: Math.max(0, (crop.dueAt || 0) - now),
          isWordTree: true,
          wordHanzi: wordHanzi,
          cropDef: cDef,
          pest: crop.pest
        };
      }

      if (crop.isRipe || (crop.reviewsPassed || 0) >= 4) {
        return {
          state: 'ripe',
          progress: 1.0,
          stage: 4,
          timeRemainingMs: 0,
          isWordTree: true,
          wordHanzi: wordHanzi,
          cropDef: Object.assign({}, cDef, { name: `Quả Tri Thức (${wordHanzi})` })
        };
      }

      if (now >= (crop.dueAt || 0)) {
        return {
          state: 'thirsty_word',
          isWordDue: true,
          progress: (crop.reviewsPassed || 0) / 4,
          stage: crop.stage || 1,
          timeRemainingMs: 0,
          isWordTree: true,
          wordHanzi: wordHanzi,
          cropDef: cDef
        };
      }

      const elapsed = Math.max(0, now - (crop.lastReviewedAt || crop.plantedAt || now));
      const subProg = Math.min(1.0, elapsed / (crop.intervalMs || SRS_INTERVALS[0]));
      const totalProg = Math.min(1.0, ((crop.reviewsPassed || 0) + subProg) / 4);

      return {
        state: 'growing',
        progress: totalProg,
        stage: crop.stage || 1,
        timeRemainingMs: Math.max(0, (crop.dueAt || 0) - now),
        isWordTree: true,
        wordHanzi: wordHanzi,
        cropDef: cDef
      };
    }

    const cDef = cropDefs[crop.cropId] || CROP_DEFS[crop.cropId] || CROP_DEFS.chrysanthemum;
    const baseMinutes = cDef.growMinutes || 2;
    const baseGrowMs = baseMinutes * 60 * 1000;

    // Tính giảm thời gian từ hạng chậu
    let potSpeedBonus = 0;
    if (pot && pot.type && POT_TIERS[pot.type]) {
      const pTier = POT_TIERS[pot.type];
      const starIdx = Math.min((pot.stars || 1) - 1, (pTier.upgrades || []).length - 1);
      if (starIdx >= 0 && pTier.upgrades[starIdx]) {
        potSpeedBonus = pTier.upgrades[starIdx].speed || 0;
      }
    }

    // Tính tốc độ từ linh thú
    let petSpeedMult = 1.0;
    const eco = getEconomy();
    if (eco && typeof eco.cropSpeedMultiplier === 'function') {
      petSpeedMult = eco.cropSpeedMultiplier();
    }

    const effectiveGrowMs = Math.max(10000, Math.round(baseGrowMs * (1 - potSpeedBonus) / petSpeedMult));

    // Tính thời gian đã lớn tích lũy
    let totalGrownMs = crop.accumulatedGrowthMs || 0;
    if (crop.watered && crop.lastWateredAt) {
      totalGrownMs += Math.max(0, now - crop.lastWateredAt);
    }

    const progress = Math.min(1.0, totalGrownMs / effectiveGrowMs);
    const timeRemainingMs = Math.max(0, effectiveGrowMs - totalGrownMs);

    // Xác định giai đoạn hình ảnh (1: mầm, 2: non, 3: nụ/hoa, 4: chín)
    let stage = 1;
    if (progress >= 1.0) stage = 4;
    else if (progress >= 0.6) stage = 3;
    else if (progress >= 0.25) stage = 2;
    else stage = 1;

    // Kiểm tra sâu bệnh
    if (crop.pest) {
      return {
        state: 'pest',
        progress,
        stage,
        timeRemainingMs,
        cropDef: cDef,
        pest: crop.pest
      };
    }

    // Nếu đã đủ thời gian lớn
    if (progress >= 1.0) {
      return {
        state: 'ripe',
        progress: 1.0,
        stage: 4,
        timeRemainingMs: 0,
        cropDef: cDef
      };
    }

    // Nếu chưa được tưới nước cho giai đoạn hiện tại
    if (!crop.watered) {
      return {
        state: 'thirsty',
        progress,
        stage,
        timeRemainingMs,
        cropDef: cDef
      };
    }

    return {
      state: 'growing',
      progress,
      stage,
      timeRemainingMs,
      cropDef: cDef
    };
  }

  /* ==========================================================================
     3.1. Logic Tiên Vườn Tự Động (Fairy Helper Pure Logic)
     ========================================================================== */

  /**
   * Hàm thuần tính toán 1 nhịp làm việc của Tiên Vườn cho toàn bộ các tầng
   * Dễ dàng kiểm thử độc lập trong test suite (Node.js & Browser)
   * @param {Object} state - State của Economy / Farm
   * @param {number} now - Mốc thời gian hiện tại (Date.now())
   * @param {Object} options - Các tùy chọn bổ sung: { force: boolean, offlineOnlyLevel5: boolean, random: number }
   * @returns {Array} Danh sách các hành động đã thực hiện
   */
  function _fairyTick(state, now = Date.now(), options = {}) {
    if (!state || !state.farm) {
      const empty = [];
      empty.wateredCount = 0;
      empty.harvestedCount = 0;
      empty.replantedCount = 0;
      return empty;
    }
    const farm = state.farm;
    if (!farm.fairies || !Array.isArray(farm.fairies)) {
      const empty = [];
      empty.wateredCount = 0;
      empty.harvestedCount = 0;
      empty.replantedCount = 0;
      return empty;
    }

    const actions = [];
    const cropDefs = options.cropDefs || CROP_DEFS;
    const tierCount = farm.tierCount || (farm.fairies ? farm.fairies.length : 1);

    for (let tierIdx = 0; tierIdx < tierCount; tierIdx++) {
      const fairy = farm.fairies[tierIdx];
      if (!fairy || fairy.level < 1) continue;

      // Nếu đang trong chế độ mô phỏng ngoại tuyến: chỉ tiên Cấp 5 mới làm việc
      if (options.offlineOnlyLevel5 && fairy.level < 5) continue;

      // Chu kỳ làm việc: Cấp 1-3 là 5000ms, Cấp 4+ là 2500ms (nhanh hơn 50%)
      const interval = (fairy.level >= 4) ? 2500 : 5000;
      if (!options.force && (now - (fairy.lastWorkAt || 0) < interval)) {
        continue;
      }

      const startSlot = tierIdx * 6;
      const endSlot = startSlot + 6;
      const tierSlots = (farm.slots || []).slice(startSlot, endSlot);

      let actionDoneThisTick = false;

      // 1. CẤP 1: TỰ TƯỚI CÂY KHÁT TRÊN TẦNG
      if (fairy.level >= 1 && (fairy.enabled?.water !== false) && !actionDoneThisTick) {
        for (const slot of tierSlots) {
          if (!slot || !slot.pot || !slot.pot.crop) continue;
          const crop = slot.pot.crop;

          // Tiên KHÔNG bắt sâu - chỉ báo hiệu '!' cho người chơi
          if (crop.pest) {
            fairy.alertPest = true;
            fairy.bubbleText = 'Có sâu bệnh! ' + farmIcon('bug');
            continue;
          }

          // Tiên KHÔNG ôn thay: không trả lời câu hỏi Cây Từ, chỉ tưới; hiện alert nếu khát chữ
          if (crop.isWordTree) {
            if (now >= (crop.dueAt || 0) && !crop.isRipe) {
              fairy.alertWordDue = true;
              fairy.bubbleText = 'Cây từ khát chữ! ' + farmIcon('book-open');
            }
            if (!crop.watered) {
              if ((state.water || 0) >= 1) {
                state.water -= 1;
                crop.watered = true;
                crop.lastWateredAt = now;
                fairy.lastWorkAt = now;
                fairy.status = 'watered';
                fairy.bubbleText = 'Đã tưới nước!';

                const act = { type: 'water', tierIndex: tierIdx, slotIndex: slot.slotIndex };
                actions.push(act);
                actionDoneThisTick = true;
                break;
              } else {
                fairy.status = 'sad_water';
                fairy.bubbleText = 'Học thêm để có nước ' + farmIcon('droplet', { className: 'vt-icon-water' });
                fairy.lastWorkAt = now;
                actionDoneThisTick = true;
                break;
              }
            }
            continue;
          }

          if (!crop.watered) {
            if ((state.water || 0) >= 1) {
              state.water -= 1;
              crop.watered = true;
              crop.lastWateredAt = now;
              fairy.lastWorkAt = now;
              fairy.status = 'watered';
              fairy.bubbleText = 'Đã tưới nước!';

              const act = { type: 'water', tierIndex: tierIdx, slotIndex: slot.slotIndex };
              actions.push(act);
              actionDoneThisTick = true;
              break;
            } else {
              // Hết nước -> ngồi buồn + nhắc học thêm
              fairy.status = 'sad_water';
              fairy.bubbleText = 'Học thêm để có nước ' + farmIcon('droplet', { className: 'vt-icon-water' });
              fairy.lastWorkAt = now;
              actionDoneThisTick = true;
              break;
            }
          }
        }
      }

      // 2. CẤP 2: TỰ THU HOẠCH CÂY CHÍN VÀO KHO
      if (fairy.level >= 2 && (fairy.enabled?.harvest !== false) && !actionDoneThisTick) {
        for (const slot of tierSlots) {
          if (!slot || !slot.pot || !slot.pot.crop) continue;
          const crop = slot.pot.crop;
          if (crop.pest || crop.isWordTree) continue; // Bỏ qua cây có sâu và Cây Từ (tiên không ôn thay)

          const st = plotStatus(slot, now, cropDefs);
          if (st.state === 'ripe') {
            // Kiểm tra dung lượng kho
            if (!farm.warehouse) farm.warehouse = { capacity: 50, items: {} };
            if (!farm.warehouse.items) {
              const keys = Object.keys(farm.warehouse).filter(k => k !== 'capacity' && k !== 'items');
              farm.warehouse.items = {};
              keys.forEach(k => {
                farm.warehouse.items[k] = farm.warehouse[k];
              });
            }

            const warehouseItems = farm.warehouse.items;
            const currentTotal = Object.values(warehouseItems).reduce((sum, v) => sum + (v || 0), 0);
            const capacity = farm.warehouse.capacity || 50;

            if (currentTotal >= capacity) {
              // Kho đầy -> dừng và báo
              fairy.status = 'warehouse_full';
              fairy.bubbleText = 'Kho đã đầy! ' + farmIcon('package');
              fairy.lastWorkAt = now;
              actionDoneThisTick = true;
              break;
            }

            const cDef = cropDefs[crop.cropId] || cropDefs.chrysanthemum;
            let yieldAmt = cDef.yield || 1;

            // Cấp 4: 10% cơ hội thu thêm 1 sản phẩm
            const randVal = (options.random !== undefined) ? options.random : Math.random();
            if (fairy.level >= 4 && randVal < 0.10) {
              yieldAmt += 1;
            }

            warehouseItems[crop.cropId] = (warehouseItems[crop.cropId] || 0) + yieldAmt;
            state.xp = (state.xp || 0) + (cDef.xp || 5);

            // Ghi nhớ loại hạt vừa thu hoạch để Cấp 3 gieo lại
            const harvestedCropId = crop.cropId;
            slot.lastHarvestCropId = harvestedCropId;
            fairy.lastHarvestCropId = harvestedCropId;

            // Xử lý cây nhiều lần thu hoạch
            const left = (crop.harvestsLeft !== undefined ? crop.harvestsLeft : cDef.maxHarvests) - 1;
            if (left > 0) {
              crop.harvestsLeft = left;
              crop.watered = false;
              crop.accumulatedGrowthMs = 0;
              crop.lastWateredAt = null;
            } else {
              slot.pot.crop = null;
            }

            fairy.lastWorkAt = now;
            fairy.status = 'harvested';
            fairy.bubbleText = 'Đã thu hoạch!';

            const act = {
              type: 'harvest',
              tierIndex: tierIdx,
              slotIndex: slot.slotIndex,
              cropId: harvestedCropId,
              yield: yieldAmt
            };
            actions.push(act);
            actionDoneThisTick = true;

            // Nếu tiên Cấp 3 trở lên và ô hiện đã trống: tự động gieo lại ngay lập tức
            if (fairy.level >= 3 && (fairy.enabled?.replant !== false) && !slot.pot.crop) {
              if ((state.coins || 0) >= cDef.seedCost) {
                state.coins -= cDef.seedCost;
                slot.pot.crop = {
                  cropId: harvestedCropId,
                  plantedAt: now,
                  watered: false,
                  lastWateredAt: null,
                  accumulatedGrowthMs: 0
                };
                fairy.bubbleText = `Đã thu & gieo ${cDef.name}! ${farmIcon('sprout', { className: 'vt-icon-sprout' })}`;
                actions.push({
                  type: 'replant',
                  tierIndex: tierIdx,
                  slotIndex: slot.slotIndex,
                  cropId: harvestedCropId
                });
              } else {
                fairy.bubbleText = 'Thu xong, thiếu xu gieo lại! ' + farmIcon('coin', { className: 'vt-icon-coin' });
              }
            }
            break;
          }
        }
      }

      // 3. CẤP 3: TỰ GIEO LẠI LOẠI HẠT VỪA THU (cho các ô trống có sẵn)
      if (fairy.level >= 3 && (fairy.enabled?.replant !== false) && !actionDoneThisTick) {
        for (const slot of tierSlots) {
          if (!slot || !slot.pot || slot.pot.crop) continue;
          const replantCropId = slot.lastHarvestCropId || fairy.lastHarvestCropId;
          if (replantCropId && replantCropId !== 'word_tree' && cropDefs[replantCropId]) {
            const cDef = cropDefs[replantCropId];
            if ((state.coins || 0) >= cDef.seedCost) {
              state.coins -= cDef.seedCost;
              slot.pot.crop = {
                cropId: replantCropId,
                plantedAt: now,
                watered: false,
                lastWateredAt: null,
                accumulatedGrowthMs: 0
              };

              fairy.lastWorkAt = now;
              fairy.status = 'replanted';
              fairy.bubbleText = `Đã gieo ${cDef.name}! ${farmIcon('sprout', { className: 'vt-icon-sprout' })}`;

              const act = {
                type: 'replant',
                tierIndex: tierIdx,
                slotIndex: slot.slotIndex,
                cropId: replantCropId
              };
              actions.push(act);
              actionDoneThisTick = true;
              break;
            } else {
              fairy.status = 'no_coins';
              fairy.bubbleText = 'Thiếu xu gieo hạt! ' + farmIcon('coin', { className: 'vt-icon-coin' });
              fairy.lastWorkAt = now;
              actionDoneThisTick = true;
              break;
            }
          }
        }
      }
    }

    actions.wateredCount = actions.filter(a => a.type === 'water').length;
    actions.harvestedCount = actions.filter(a => a.type === 'harvest').length;
    actions.replantedCount = actions.filter(a => a.type === 'replant').length;

    return actions;
  }

  /**
   * Tính bù công việc ngoại tuyến cho Tiên Vườn Cấp 5 (tối đa 8 giờ)
   */
  function _simulateOfflineFairies(state, now = Date.now()) {
    if (!state || !state.farm) return null;
    const farm = state.farm;
    const lastActive = farm.lastActiveAt || now;
    const maxOfflineMs = 8 * 3600 * 1000; // Tối đa 8 giờ
    const rawElapsed = Math.max(0, now - lastActive);
    const elapsed = Math.min(maxOfflineMs, rawElapsed);

    // Chỉ thực thi nếu có ít nhất 1 tiên Cấp 5 và đã qua ít nhất 30 giây
    const hasLv5 = (farm.fairies || []).some(f => f && f.level >= 5);
    if (!hasLv5 || elapsed < 30000) {
      farm.lastActiveAt = now;
      return null;
    }

    let totalWatered = 0;
    let totalHarvested = 0;
    let totalReplanted = 0;

    // Bước nhảy mô phỏng: mỗi bước 20 giây
    const stepMs = 20000;
    const steps = Math.min(1440, Math.floor(elapsed / stepMs));
    let simTime = lastActive;

    for (let s = 0; s < steps; s++) {
      simTime += stepMs;
      const acts = _fairyTick(state, simTime, { force: true, offlineOnlyLevel5: true });
      for (const a of acts) {
        if (a.type === 'water') totalWatered++;
        else if (a.type === 'harvest') totalHarvested++;
        else if (a.type === 'replant') totalReplanted++;
      }
    }

    farm.lastActiveAt = now;
    return { elapsed, totalWatered, totalHarvested, totalReplanted };
  }

  /* ==========================================================================
     4. Âm Thanh & Phát Âm Web Speech API
     ========================================================================== */

  function speakText(text) {
    if (typeof window === 'undefined') return;
    if ('speechSynthesis' in window && text) {
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'zh-CN';
        u.rate = 0.85;
        window.speechSynthesis.speak(u);
      } catch (e) {
        console.warn('SpeechSynthesis error:', e);
      }
    }
  }

  function playChime(success = true) {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (success) {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else {
        osc.frequency.setValueAtTime(260, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {}
  }

  /* ==========================================================================
     5. Giao Diện & Điều Khiển (Mount, Render, HUD, Modals)
     ========================================================================== */

  let rootContainer = null;
  let animTimer = null;
  let activeModal = null;
  let selectedSlotIndex = null;
  let selectedTool = 'hand'; // 'hand' | 'seed' | 'water' | 'fertilizer'
  let currentTutorialStep = 0;

  function mount(container) {
    if (typeof document === 'undefined') return;
    rootContainer = (typeof container === 'string') ? document.querySelector(container) : container;
    if (!rootContainer) return;

    if (typeof window !== 'undefined' && !window.__vtVisibilityListenerAdded) {
      window.__vtVisibilityListenerAdded = true;
      document.addEventListener('visibilitychange', () => {
        const stage = document.getElementById('vt-game-stage');
        if (!stage) return;
        if (document.hidden) {
          stage.classList.add('is-paused');
        } else {
          stage.classList.remove('is-paused');
        }
      });
    }

    ensureFarmState();
    renderMainGameUI();
    bindEvents();
    onShow();
  }

  let fairyTimer = null;

  function startFairyLoop() {
    if (fairyTimer) clearInterval(fairyTimer);
    fairyTimer = setInterval(() => {
      const eco = getEconomy();
      if (!eco) return;
      const state = eco.getState();
      if (!state || !state.farm) return;
      const acts = _fairyTick(state, Date.now());
      if (acts.length > 0) {
        eco.saveState();
        refreshTiersView();
        updateHUDValues();
      }
    }, 3000);
  }

  function stopFairyLoop() {
    if (fairyTimer) {
      clearInterval(fairyTimer);
      fairyTimer = null;
    }
  }

  function onShow() {
    ensureFarmState();
    if (!rootContainer) return;

    const stage = document.getElementById('vt-game-stage');
    if (stage) stage.classList.remove('is-paused');

    // Chạy bù công việc ngoại tuyến cho Tiên Cấp 5
    const eco = getEconomy();
    if (eco) {
      const state = eco.getState();
      if (state && state.farm) {
        const report = _simulateOfflineFairies(state, Date.now());
        if (report && (report.totalWatered > 0 || report.totalHarvested > 0 || report.totalReplanted > 0)) {
          showOfflineFairiesReport(report);
        }
      }
    }

    // Khởi động vòng lặp kiểm tra thời gian lớn & sâu bệnh
    if (!animTimer) {
      animTimer = setInterval(() => {
        updateCropGrowthCycle();
        refreshTiersView();
        updateHUDValues();
      }, 1000);
    }
    startFairyLoop();

    renderMainGameUI();
    scrollToActiveTier();
  }

  function onHide() {
    const stage = document.getElementById('vt-game-stage');
    if (stage) stage.classList.add('is-paused');

    if (animTimer) {
      clearInterval(animTimer);
      animTimer = null;
    }
    stopFairyLoop();
    if (activeModal && activeModal.parentNode) {
      activeModal.parentNode.removeChild(activeModal);
      activeModal = null;
    }
    const eco = getEconomy();
    if (eco) {
      const state = eco.getState();
      if (state && state.farm) {
        state.farm.lastActiveAt = Date.now();
        eco.saveState();
      }
    }
  }

  /**
   * Cập nhật chu kỳ sinh trưởng & xác suất phát sinh sâu bệnh
   */
  function updateCropGrowthCycle() {
    const eco = getEconomy();
    if (!eco) return;
    const state = eco.getState();
    const farm = state.farm;
    if (!farm || !farm.slots) return;

    const now = Date.now();
    let changed = false;

    farm.slots.forEach(slot => {
      if (slot && slot.pot && slot.pot.crop) {
        const crop = slot.pot.crop;
        const st = plotStatus(slot, now);

        // Sinh sâu xanh ngẫu nhiên khi đang lớn (khoảng 3% mỗi 10s)
        if (st.state === 'growing' && !crop.pest && Math.random() < 0.03) {
          crop.pest = getRandomVocabQuiz(state, eco.getLearnProgress());
          changed = true;
        }

        // Tự động chuyển mốc thu hoạch nếu đã chín
        if (st.state === 'ripe' && !crop.wasRipeNotified) {
          crop.wasRipeNotified = true;
          changed = true;
        }
      }
    });

    if (changed) {
      eco.saveState();
    }
  }

  /**
   * Sinh 1 câu đố từ vựng để bắt sâu (Ưu tiên từ trong hardWords và Cây Từ tới hạn)
   */
  function getRandomVocabQuiz(customState, customProgress) {
    const eco = getEconomy();
    const prog = customProgress || (eco ? eco.getLearnProgress() : { hardWords: {} });
    const st = customState || (eco ? eco.getState() : null);

    // 1. Thu thập từ ưu tiên: hardWords và Cây Từ tới hạn ôn
    const priorityWords = [];
    if (prog && prog.hardWords) {
      Object.keys(prog.hardWords).forEach(k => {
        const val = prog.hardWords[k];
        const count = typeof val === 'number' ? val : (val && val.reviewsCount ? val.reviewsCount : (val ? 1 : 0));
        if (count > 0 && !priorityWords.includes(k)) {
          priorityWords.push(k);
        }
      });
    }

    if (st && st.farm && Array.isArray(st.farm.slots)) {
      const now = Date.now();
      st.farm.slots.forEach(s => {
        if (s && s.pot && s.pot.crop && s.pot.crop.isWordTree) {
          const c = s.pot.crop;
          if (now >= (c.dueAt || 0) && !c.isRipe && c.wordHanzi) {
            if (!priorityWords.includes(c.wordHanzi)) {
              priorityWords.push(c.wordHanzi);
            }
          }
        }
      });
    }

    let targetHanzi = null;
    let targetInfo = null;

    if (priorityWords.length > 0) {
      targetHanzi = priorityWords[Math.floor(Math.random() * priorityWords.length)];
      targetInfo = resolveWordInfo(targetHanzi);
    }

    const dict = getHsk1Words();
    const dictKeys = Object.keys(dict || {});

    if (!targetHanzi && dictKeys.length > 4) {
      targetHanzi = dictKeys[Math.floor(Math.random() * dictKeys.length)];
      targetInfo = resolveWordInfo(targetHanzi);
    }

    if (targetHanzi && targetInfo && targetInfo.vi) {
      const distractors = [];
      const pool = dictKeys.filter(k => k !== targetHanzi);
      while (distractors.length < 3 && pool.length > 0) {
        const randIdx = Math.floor(Math.random() * pool.length);
        const randKey = pool.splice(randIdx, 1)[0];
        const dInfo = resolveWordInfo(randKey);
        if (dInfo && dInfo.vi && dInfo.vi !== targetInfo.vi && !distractors.includes(dInfo.vi)) {
          distractors.push(dInfo.vi);
        }
      }
      while (distractors.length < 3) {
        const b = BACKUP_VOCAB[Math.floor(Math.random() * BACKUP_VOCAB.length)];
        if (b && b.vi !== targetInfo.vi && !distractors.includes(b.vi)) {
          distractors.push(b.vi);
        }
      }

      const options = [targetInfo.vi, ...distractors].sort(() => 0.5 - Math.random());
      return {
        hanzi: targetHanzi,
        pinyin: targetInfo.py,
        vi: targetInfo.vi,
        options,
        correctAnswer: targetInfo.vi
      };
    }

    // Dự phòng BACKUP_VOCAB
    const item = BACKUP_VOCAB[Math.floor(Math.random() * BACKUP_VOCAB.length)];
    const options = [item.vi, ...item.wrongs].sort(() => 0.5 - Math.random());
    return {
      hanzi: item.hanzi,
      pinyin: item.pinyin,
      vi: item.vi,
      options,
      correctAnswer: item.vi
    };
  }

  /**
   * Dựng khung giao diện chính của Vườn Treo
   */
  let stageResizeObserver = null;

  /**
   * Căn chỉnh tỷ lệ khung Game Stage chuẩn theo kích thước nhìn (viewport / container)
   * Ngang: 1280x720 (w >= 760px). Dọc: 720x1280 (w < 760px).
   * Tự động tính scale transform để VỪA KHÍT khung nhìn, letterbox bằng nền trời/mây.
   */
  function updateStageScale() {
    if (typeof document === 'undefined') return;
    const stage = document.getElementById('vt-game-stage');
    if (!stage || !rootContainer) return;

    const w = rootContainer.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1280);
    const h = rootContainer.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 720);

    const isPortrait = (w < 760);
    const targetW = isPortrait ? 720 : 1280;
    const targetH = isPortrait ? 1280 : 720;

    const scale = Math.min(w / targetW, h / targetH);

    stage.classList.toggle('is-portrait', isPortrait);
    stage.classList.toggle('is-landscape', !isPortrait);
    stage.style.width = targetW + 'px';
    stage.style.height = targetH + 'px';
    stage.style.transform = `translate(-50%, -50%) scale(${scale})`;

    const eco = getEconomy();
    const farm = eco ? eco.getState().farm : null;
    if (farm && farm.tutorialStep < 5) {
      showTutorialStep(farm.tutorialStep);
    } else {
      const ov = document.getElementById('vt-tutorial-overlay');
      if (ov) ov.style.display = 'none';
      if (rootContainer) {
        rootContainer.querySelectorAll('.vt-tut-highlight').forEach(el => el.classList.remove('vt-tut-highlight'));
      }
    }

    updateElevatorVisibility();
  }

  function renderSunshineBanner() {
    const eco = getEconomy();
    if (!eco) return '';
    const isActive = typeof eco.isLearningSunshineActive === 'function' ? eco.isLearningSunshineActive() : false;
    if (isActive) {
      return `
        <div class="vt-sunshine-chip is-active" title="Vườn đang có Nắng Học Tập! Cây lớn nhanh +15%">
          <span class="vt-sun-icon">${farmIcon('sun')}</span>
          <span class="vt-sun-txt">Nắng Học Tập (+15% tốc độ)</span>
        </div>
      `;
    } else {
      return `
        <a href="#zh/learn" class="vt-sunshine-chip is-inactive" title="Học 1 bài học hoặc đạt 20 KN hôm nay để vườn có Nắng!">
          <span class="vt-sun-icon">${farmIcon('cloud')}</span>
          <span class="vt-sun-txt">Học 1 bài để vườn có nắng</span>
        </a>
      `;
    }
  }

  function renderSunshineSkyFX() {
    const eco = getEconomy();
    if (!eco || typeof eco.isLearningSunshineActive !== 'function' || !eco.isLearningSunshineActive()) {
      return '';
    }
    return `
      <div class="vt-sunshine-rainbow">
        <svg viewBox="0 0 400 200" width="100%" height="100%" preserveAspectRatio="none">
          <path d="M 40,200 A 160,160 0 0 1 360,200" fill="none" stroke="rgba(255, 107, 107, 0.45)" stroke-width="12" />
          <path d="M 52,200 A 148,148 0 0 1 348,200" fill="none" stroke="rgba(255, 169, 77, 0.45)" stroke-width="12" />
          <path d="M 64,200 A 136,136 0 0 1 336,200" fill="none" stroke="rgba(255, 230, 109, 0.45)" stroke-width="12" />
          <path d="M 76,200 A 124,124 0 0 1 324,200" fill="none" stroke="rgba(78, 205, 196, 0.45)" stroke-width="12" />
          <path d="M 88,200 A 112,112 0 0 1 312,200" fill="none" stroke="rgba(84, 160, 255, 0.45)" stroke-width="12" />
          <path d="M 100,200 A 100,100 0 0 1 300,200" fill="none" stroke="rgba(155, 89, 182, 0.45)" stroke-width="12" />
        </svg>
      </div>
    `;
  }

  function renderStreakDecorations() {
    const eco = getEconomy();
    if (!eco || typeof eco.getStreakDecorations !== 'function') return '';
    const dec = eco.getStreakDecorations();
    let html = '';
    if (dec.ribbon) {
      html += `
        <div class="vt-decor-item vt-decor-ribbon" title="Dải lụa đỏ may mắn (Chuỗi ${dec.streakCount} ngày học)">
          <svg width="40" height="60" viewBox="0 0 40 60">
            <path d="M 20,0 C 15,15 10,25 8,45 C 12,48 16,52 20,60 C 24,52 28,48 32,45 C 30,25 25,15 20,0 Z" fill="#DC2626" />
            <circle cx="20" cy="12" r="5" fill="#FCD34D" stroke="#B45309" stroke-width="1.5" />
          </svg>
        </div>
      `;
    }
    if (dec.windChime) {
      html += `
        <div class="vt-decor-item vt-decor-chime" title="Chuông gió trúc thanh tao (Chuỗi ${dec.streakCount} ngày học)">
          <svg width="36" height="55" viewBox="0 0 36 55">
            <line x1="18" y1="0" x2="18" y2="15" stroke="#7A4B2A" stroke-width="2" />
            <path d="M 8,15 Q 18,8 28,15 L 26,26 Q 18,22 10,26 Z" fill="#D97706" />
            <line x1="14" y1="26" x2="14" y2="46" stroke="#B45309" stroke-width="2" />
            <line x1="22" y1="26" x2="22" y2="46" stroke="#B45309" stroke-width="2" />
            <rect x="15" y="46" width="6" height="9" fill="#10B981" rx="2" />
          </svg>
        </div>
      `;
    }
    if (dec.lantern) {
      html += `
        <div class="vt-decor-item vt-decor-lantern" title="Đèn lồng Bồng Lai (Chuỗi ${dec.streakCount} ngày học)">
          <svg width="42" height="65" viewBox="0 0 42 65">
            <line x1="21" y1="0" x2="21" y2="10" stroke="#7A4B2A" stroke-width="2" />
            <rect x="14" y="10" width="14" height="4" fill="#F59E0B" rx="1" />
            <ellipse cx="21" cy="30" rx="16" ry="17" fill="#EF4444" stroke="#B91C1C" stroke-width="2" />
            <ellipse cx="21" cy="30" rx="8" ry="17" fill="none" stroke="#FBBF24" stroke-width="1.5" />
            <rect x="15" y="47" width="12" height="3" fill="#F59E0B" rx="1" />
            <line x1="21" y1="50" x2="21" y2="65" stroke="#DC2626" stroke-width="2.5" />
          </svg>
        </div>
      `;
    }
    return html;
  }

  function updateQuestRedDot() {
    const dot = document.getElementById('vt-quest-red-dot');
    if (!dot) return;
    const eco = getEconomy();
    if (!eco || typeof eco.questStatus !== 'function') return;
    const quests = eco.questStatus();
    const hasUnclaimed = quests.some(q => !q.claimed);
    dot.style.display = hasUnclaimed ? 'block' : 'none';
  }

  function updateWordDueDot() {
    if (typeof document === 'undefined') return;
    const dot = document.getElementById('vt-word-due-dot');
    if (!dot) return;
    const eco = getEconomy();
    const state = eco ? eco.getState() : null;
    if (!state || !state.farm || !Array.isArray(state.farm.slots)) {
      dot.style.display = 'none';
      return;
    }
    const now = Date.now();
    const hasDue = state.farm.slots.some(s => s && s.pot && s.pot.crop && s.pot.crop.isWordTree && now >= (s.pot.crop.dueAt || 0) && !s.pot.crop.isRipe);
    dot.style.display = hasDue ? 'flex' : 'none';
  }

  /**
   * Dựng khung giao diện chính của Vườn Treo
   */
  function renderMainGameUI() {
    if (!rootContainer) return;
    const eco = getEconomy();
    const state = eco ? eco.getState() : {};
    const farm = (state && state.farm) || ensureFarmState();
    const levelInfo = eco ? eco.levelInfo(state.xp || 0) : { level: 1, cur: 0, need: 100 };

    rootContainer.innerHTML = `
      <div class="vt-game-wrapper" id="vt-game-wrapper">
        <!-- 1. Bầu Trời Gradient Pastel Nhẹ & Mây Mềm Phía Xa -->
        <div class="vt-sky-backdrop" id="vt-sky-backdrop">
          <!-- Cầu vồng và vạt nắng học tập khi kích hoạt -->
          ${renderSunshineSkyFX()}
          <!-- 2 lớp mây mềm phía xa bồng bềnh -->
          <div class="vt-clouds-layer vt-clouds-back"></div>
          <div class="vt-clouds-layer vt-clouds-front"></div>
        </div>

        <!-- 2. SÂN KHẤU CỐ ĐỊNH CHUẨN KIỂU GAME (Fixed Virtual Stage) -->
        <div class="vt-game-stage is-landscape" id="vt-game-stage">
          <!-- Mặt trời cười Kawaii nhỏ gọn (nằm trong stage để scale chuẩn theo tỷ lệ) -->
          <div class="vt-celestial-body" id="vt-celestial-body">
            <div class="vt-sun-content">
              <div class="vt-sun-eye eye-l"></div>
              <div class="vt-sun-eye eye-r"></div>
              <div class="vt-sun-blush blush-l"></div>
              <div class="vt-sun-blush blush-r"></div>
              <div class="vt-sun-mouth"></div>
            </div>
            <div class="vt-moon-content">
              <div class="vt-moon-crescent"></div>
              <div class="vt-moon-eye"></div>
              <div class="vt-moon-blush"></div>
            </div>
          </div>

          <!-- HUD TRÊN GỌN GÀNG: Về trang học | Cấp + Thanh KN | Nắng học tập | Xu | Nước | Nút ⋯ gom vật liệu/phân bón -->
          <header class="vt-top-hud">
            <div class="vt-hud-left">
              <button class="vt-btn-back" id="vt-btn-back" title="Quay lại bài học">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                <span>Bài học</span>
              </button>
              <div class="vt-profile-pill" id="vt-profile-pill" title="Cấp độ người học và điểm kinh nghiệm">
                <div class="vt-avatar-circle">
                  ${Sprites ? Sprites.renderHUDIconSVG('level', 22) : farmIcon('star', { className: 'vt-icon-star' })}
                </div>
                <div class="vt-level-meta">
                  <div class="vt-level-name">Cấp ${levelInfo.level}</div>
                  <div class="vt-xp-track">
                    <div class="vt-xp-fill" style="width: ${Math.round((levelInfo.cur / levelInfo.need) * 100)}%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Nắng học tập Banner / Prompt -->
            <div class="vt-hud-center" id="vt-hud-sunshine-wrap">
              ${renderSunshineBanner()}
            </div>

            <div class="vt-hud-right">
              <div class="vt-res-chip vt-chip-coins" title="Xu kiếm được từ học tập và làm vườn">
                <span class="vt-res-icon-svg">${Sprites ? Sprites.renderHUDIconSVG('coins', 22) : farmIcon('coin', { className: 'vt-icon-coin' })}</span>
                <span class="vt-res-val" id="hud-val-coins">${state.coins || 0}</span>
              </div>
              <div class="vt-res-chip vt-chip-water" title="Giọt nước tưới cây (chỉ kiếm được khi hoàn thành bài học)">
                <span class="vt-res-icon-svg">${Sprites ? Sprites.renderHUDIconSVG('water', 22) : farmIcon('droplet', { className: 'vt-icon-water' })}</span>
                <span class="vt-res-val" id="hud-val-water">${state.water || 0}</span>
              </div>
              <!-- Nút ⋯ gom vật liệu nâng cấp chậu & phân bón -->
              <div class="vt-hud-more-wrapper">
                <button class="vt-res-chip vt-chip-more" id="vt-btn-hud-more" title="Xem túi nguyên liệu & phân bón">
                  <span>⋯</span>
                </button>
                <div class="vt-hud-popover" id="vt-hud-popover" style="display:none;">
                  <div class="vt-popover-item">
                    <span class="vt-pop-icon">${Sprites ? Sprites.renderHUDIconSVG('fertilizer', 18) : farmIcon('flask')}</span>
                    <span class="vt-pop-name">Phân bón:</span>
                    <span class="vt-pop-val" id="hud-pop-val-fert">${farm.fertilizer || 0}</span>
                  </div>
                  <div class="vt-popover-item">
                    <span class="vt-pop-icon">${Sprites ? Sprites.renderHUDIconSVG('materials', 18) : farmIcon('layers')}</span>
                    <span class="vt-pop-name">Đất sét:</span>
                    <span class="vt-pop-val" id="hud-pop-val-clay">${(farm.materials && farm.materials.clay) || 0}</span>
                  </div>
                  <div class="vt-popover-item">
                    <span class="vt-pop-icon">${farmIcon('layers')}</span>
                    <span class="vt-pop-name">Men gốm:</span>
                    <span class="vt-pop-val" id="hud-pop-val-glaze">${(farm.materials && farm.materials.glaze) || 0}</span>
                  </div>
                  <div class="vt-popover-item">
                    <span class="vt-pop-icon">${farmIcon('gem')}</span>
                    <span class="vt-pop-name">Bột ngọc:</span>
                    <span class="vt-pop-val" id="hud-pop-val-jade">${(farm.materials && farm.materials.jadePowder) || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <!-- VÙNG TÒA VƯỜN TREO CÁC TẦNG XẾP CHỒNG (Cuộn dọc mượt nếu >3 tầng) -->
          <div class="vt-balcony-stage-wrap" id="vt-balcony-stage-wrap">
            <!-- Được render động bởi refreshTiersView() -->
          </div>

          <!-- THANG MÁY CỐ ĐỊNH CẠNH PHẢI (Chỉ hiện khi có cuộn & >3 tầng) -->
          <div class="vt-elevator-panel" id="vt-elevator-panel" style="display:none;">
            <button class="vt-elevator-btn" id="vt-btn-tier-up" title="Lên tầng trên">▲</button>
            <div class="vt-elevator-floor-badge" id="vt-tier-current-label">Tầng ${(farm.activeTier || 0) + 1}/${farm.tierCount}</div>
            <button class="vt-elevator-btn" id="vt-btn-tier-down" title="Xuống tầng dưới">▼</button>
          </div>

          <!-- THANH CÔNG CỤ DƯỚI (Nhiệm vụ có chấm đỏ) -->
          <footer class="vt-bottom-bar" id="vt-bottom-bar">
            <!-- 1. Tay/Thu hoạch -->
            <button class="vt-bar-btn ${selectedTool === 'hand' ? 'is-active' : ''}" data-tool="hand" title="Thu hoạch nông sản chín & xem thông tin">
              <span class="vt-btn-icon-svg">${Sprites ? Sprites.renderToolIconSVG('hand', 30) : farmIcon('sprout')}</span>
              <span class="vt-btn-text">Thu hoạch</span>
            </button>
            <!-- 2. Hạt giống -->
            <button class="vt-bar-btn ${selectedTool === 'seed' ? 'is-active' : ''}" data-tool="seed" title="Mở túi hạt giống">
              <span class="vt-btn-icon-svg">${Sprites ? Sprites.renderToolIconSVG('seed', 30) : farmIcon('sprout')}</span>
              <span class="vt-btn-text">Hạt giống</span>
            </button>
            <!-- 3. Tưới nước -->
            <button class="vt-bar-btn ${selectedTool === 'water' ? 'is-active' : ''}" data-tool="water" title="Tưới nước cho cây">
              <span class="vt-btn-icon-svg">${Sprites ? Sprites.renderToolIconSVG('water', 30) : farmIcon('droplet')}</span>
              <span class="vt-btn-text">Tưới nước</span>
            </button>
            <!-- 4. Nhiệm vụ (có chấm đỏ) -->
            <button class="vt-bar-btn" id="vt-btn-open-quests" title="Nhiệm vụ ngày & Rương thưởng">
              <span class="vt-btn-icon-svg">${farmIcon('target', { size: 24 })}</span>
              <span class="vt-btn-text">Nhiệm vụ</span>
              <span class="vt-quest-red-dot" id="vt-quest-red-dot" style="display:none;"></span>
            </button>
            <!-- 5. Sổ Từ Vườn (chấm ! khi có cây tới hạn) -->
            <button class="vt-bar-btn" id="vt-btn-open-wordbook" title="Sổ Từ Vườn: Danh sách từ đã gieo/thu & Ôn cây tới hạn">
              <span class="vt-btn-icon-svg">${farmIcon('book-open', { size: 24 })}</span>
              <span class="vt-btn-text">Sổ Từ</span>
              <span class="vt-word-due-dot" id="vt-word-due-dot" style="display:none;">!</span>
            </button>
            <!-- 6. Cửa hàng -->
            <button class="vt-bar-btn" id="vt-btn-open-shop" title="Cửa hàng mua chậu & hạt giống">
              <span class="vt-btn-icon-svg">${Sprites ? Sprites.renderToolIconSVG('shop', 30) : farmIcon('store')}</span>
              <span class="vt-btn-text">Cửa hàng</span>
            </button>
            <!-- 7. Kho -->
            <button class="vt-bar-btn" id="vt-btn-open-warehouse" title="Kho nông sản & Bán chợ">
              <span class="vt-btn-icon-svg">${Sprites ? Sprites.renderToolIconSVG('warehouse', 30) : farmIcon('package')}</span>
              <span class="vt-btn-text">Kho</span>
            </button>
            <!-- 8. Thêm ⋯ -->
            <div class="vt-bottom-more-wrap">
              <button class="vt-bar-btn ${selectedTool === 'fertilizer' ? 'is-active' : ''}" id="vt-btn-bottom-more" title="Thêm chức năng: Đơn hàng, Linh thú, Bón phân">
                <span class="vt-btn-icon-svg">⋯</span>
                <span class="vt-btn-text">Thêm</span>
              </button>
              <div class="vt-bottom-more-menu" id="vt-bottom-more-menu" style="display:none;">
                <button class="vt-menu-item" id="vt-sub-btn-wordbook">
                  <span class="vt-menu-icon">${farmIcon('book-open', { size: 18 })}</span>
                  <span class="vt-menu-txt">Sổ Từ Vườn</span>
                </button>
                <button class="vt-menu-item" id="vt-sub-btn-orders">
                  <span class="vt-menu-icon">${farmIcon('file-text', { size: 18 })}</span>
                  <span class="vt-menu-txt">Đơn hàng</span>
                </button>
                <button class="vt-menu-item" id="vt-sub-btn-pets">
                  <span class="vt-menu-icon">${Sprites ? Sprites.renderToolIconSVG('pets', 22) : farmIcon('paw', { size: 18 })}</span>
                  <span class="vt-menu-txt">Linh thú</span>
                </button>
                <button class="vt-menu-item" id="vt-sub-btn-tree-quest">
                  <span class="vt-menu-icon">${farmIcon('sprout', { size: 18 })}</span>
                  <span class="vt-menu-txt">Cây Tri Thức</span>
                </button>
                <button class="vt-menu-item" id="vt-sub-btn-fertilizer">
                  <span class="vt-menu-icon">${Sprites ? Sprites.renderToolIconSVG('fertilizer', 22) : farmIcon('flask', { size: 18 })}</span>
                  <span class="vt-menu-txt">Bón phân</span>
                </button>
              </div>
            </div>
          </footer>

          <!-- LỚP HƯỚNG DẪN TÂN THỦ GỌN GÀNG KHÔNG CHE CHẬU -->
          <div class="vt-tutorial-overlay" id="vt-tutorial-overlay" style="display:none;"></div>
        </div>
      </div>
    `;

    refreshTiersView();
    bindEvents();
    checkTutorialProgress();
    updateStageScale();
    updateQuestRedDot();
    updateWordDueDot();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateStageScale);
      if (typeof ResizeObserver !== 'undefined' && !stageResizeObserver && rootContainer) {
        stageResizeObserver = new ResizeObserver(() => updateStageScale());
        stageResizeObserver.observe(rootContainer);
      }
    }
  }

  /**
   * Cập nhật các số liệu HUD
   */
  function updateHUDValues() {
    if (typeof document === 'undefined') return;
    const eco = getEconomy();
    if (!eco) return;
    const state = eco.getState();
    const farm = state.farm || {};

    const elCoins = document.getElementById('hud-val-coins');
    const elWater = document.getElementById('hud-val-water');
    if (elCoins) elCoins.textContent = state.coins || 0;
    if (elWater) elWater.textContent = state.water || 0;

    const popFert = document.getElementById('hud-pop-val-fert');
    const popClay = document.getElementById('hud-pop-val-clay');
    const popGlaze = document.getElementById('hud-pop-val-glaze');
    const popJade = document.getElementById('hud-pop-val-jade');
    if (popFert) popFert.textContent = farm.fertilizer || 0;
    if (popClay) popClay.textContent = (farm.materials && farm.materials.clay) || 0;
    if (popGlaze) popGlaze.textContent = (farm.materials && farm.materials.glaze) || 0;
    if (popJade) popJade.textContent = (farm.materials && farm.materials.jadePowder) || 0;

    const elSunshine = document.getElementById('vt-hud-sunshine-wrap');
    if (elSunshine) elSunshine.innerHTML = renderSunshineBanner();

    updateQuestRedDot();
    updateWordDueDot();
  }

  /**
   * Sinh HTML cho Ô Tiên Vườn ở mép phải ban công
   */
  function renderFairySpotHTML(fairy, tierIdx, themeId) {
    const fNames = FAIRY_CONFIG.names;
    const fName = fNames[themeId] || 'Tiên Vườn';
    const isHired = (fairy && fairy.level >= 1);

    if (!isHired) {
      return `
        <div class="vt-fairy-card is-unhired" data-tier="${tierIdx}" title="Thuê ${fName} chăm sóc tầng này (100 xu)">
          <div class="vt-fairy-svg-wrap">
            ${Sprites ? Sprites.renderFairySVG(themeId, 0, true, 78) : farmIcon('sparkle')}
          </div>
          <button class="vt-btn-hire-fairy" data-tier="${tierIdx}" title="Thuê ${fName} (100 xu)">
            <span class="vt-hire-txt">Thuê 100 xu</span>
          </button>
        </div>
      `;
    }

    const bubbleHTML = (fairy.bubbleText) ? `
      <div class="vt-fairy-speech-bubble" id="vt-fairy-bubble-${tierIdx}">${fairy.bubbleText}</div>
    ` : '';

    return `
      <div class="vt-fairy-card is-hired" data-tier="${tierIdx}" title="${fName} Cấp ${fairy.level} - Chạm để mở Bảng Tiên">
        <div class="vt-fairy-svg-wrap vt-fairy-flying">
          ${Sprites ? Sprites.renderFairySVG(themeId, fairy.level, false, 78) : farmIcon('sparkle')}
          ${bubbleHTML}
        </div>
        <div class="vt-fairy-nameplate">
          <span class="vt-fairy-name-text">${fName}</span>
          <span class="vt-fairy-level-badge">Cấp ${fairy.level}</span>
        </div>
      </div>
    `;
  }

  /**
   * Dựng lại toàn bộ các ban công tầng xếp chồng như tòa vườn treo (Tầng 1 dưới cùng)
   */
  function refreshTiersView() {
    if (typeof document === 'undefined') return;
    const container = document.getElementById('vt-balcony-stage-wrap');
    if (!container) return;

    const eco = getEconomy();
    const state = eco ? eco.getState() : {};
    const farm = (state && state.farm) || ensureFarmState();
    const stage = document.getElementById('vt-game-stage');
    const isPortrait = stage ? stage.classList.contains('is-portrait') : false;

    let towerHTML = '';

    // 1. CÂY TRI THỨC (World Tree SVG làm trục chính đỡ các tầng vườn)
    const treeSVG = (Sprites && typeof Sprites.renderWorldTreeSVG === 'function') ?
      Sprites.renderWorldTreeSVG(farm.tierCount, farm.tierThemes, { isPortrait }) : '';
    towerHTML += `<div class="vt-world-tree-bg" id="vt-world-tree-bg">${treeSVG}${renderStreakDecorations()}</div>`;

    // 2. Nút mở tầng mới nếu chưa đạt tối đa 8 tầng (Chồi cây non phát sáng trên ngọn)
    if (farm.tierCount < 8) {
      const nextTier = farm.tierCount + 1;
      const nextUnlock = TIER_UNLOCKS.find(u => u.tier === nextTier) || TIER_UNLOCKS[farm.tierCount];
      const tierCheck = (eco && typeof eco.canUnlockTier === 'function') ? eco.canUnlockTier(nextTier) : { checkpointPassed: true };
      const signLabel = !tierCheck.checkpointPassed ? `${farmIcon('lock', { size: 14 })} Cần vượt ${tierCheck.checkpointName || 'Kiểm tra'} (${nextUnlock.cost} xu)` : `Chồi Non Mở Tầng ${nextTier} (${nextUnlock.cost} xu)`;
      towerHTML += `
        <div class="vt-tower-unlock-wrap">
          <button class="vt-hanging-wood-sign vt-sign-unlock vt-sprout-unlock-btn" id="vt-btn-unlock-tier" title="Mở rộng thêm 1 tầng vườn trên ngọn cây đại thụ">
            <span class="vt-sprout-leaf">${farmIcon('sprout', { size: 18 })}</span>
            <span class="vt-sign-board-text">${signLabel}</span>
            <span class="vt-sprout-sparkle">${farmIcon('sparkle', { size: 16 })}</span>
          </button>
        </div>
      `;
    }

    // 3. Vẽ mọi tầng vườn vươn ra từ cành cây: từ Tầng cao nhất ở trên xuống Tầng 1 dưới cùng
    for (let t = farm.tierCount - 1; t >= 0; t--) {
      const themeId = (farm.tierThemes && farm.tierThemes[t]) || (t === 0 ? 'chinese' : (t === 1 ? 'japanese' : 'english'));
      const themeObj = THEMES[themeId] || THEMES.chinese;
      const fairy = (farm.fairies && farm.fairies[t]) || { level: 0 };
      const deckSVG = Sprites ? Sprites.renderTierDeckSVG(themeId, t + 1, { withCloudBase: t === 0 }) : '';

      // 6 ô chậu trên tầng này
      const startSlot = t * 6;
      let potsHTML = '';
      for (let s = 0; s < 6; s++) {
        const slotIdx = startSlot + s;
        const slotData = (farm.slots && farm.slots[slotIdx]) || { slotIndex: slotIdx, pot: null };
        potsHTML += renderSinglePotSlotHTML(slotData, slotIdx);
      }

      // Ô Tiên ở mép phải cành
      const fairyHTML = renderFairySpotHTML(fairy, t, themeId);

      // Nhánh nối giữa các tầng
      let pillarHTML = '';
      if (t < farm.tierCount - 1) {
        pillarHTML = `
          <div class="vt-tier-pillars">
            <div class="vt-pillar pillar-l"></div>
            <div class="vt-pillar pillar-r"></div>
          </div>
        `;
      }

      towerHTML += `
        ${pillarHTML}
        <section class="vt-balcony-tier theme-${themeId}" id="vt-tier-${t}" data-tier="${t}">
          <div class="vt-balcony-inner">
            <!-- Nhãn Tầng N là tấm biển gỗ nhỏ đóng trên cành sát thân cây -->
            <button class="vt-tier-badge-compact vt-branch-sign" data-tier="${t}" title="Tầng ${t + 1}: ${themeObj.name} - Chạm để đổi phong cách">
              <span class="vt-branch-nail nail-l"></span>
              <span class="vt-branch-nail nail-r"></span>
              <span class="vt-tier-num">Tầng ${t + 1}</span>
              <span class="vt-tier-theme-icon">${(Sprites && typeof Sprites.renderThemeIconSVG === 'function') ? Sprites.renderThemeIconSVG(themeId, 22) : (themeObj.icon || '')}</span>
            </button>

            <!-- 6 ô chậu cây to, rõ, cách đều trên cành -->
            <div class="vt-tier-pots-row">
              ${potsHTML}
            </div>

            <!-- Ô Tiên ở đầu cành bên phải -->
            <div class="vt-fairy-spot" id="vt-fairy-spot-${t}" data-tier="${t}">
              ${fairyHTML}
            </div>
          </div>

          <!-- Sàn gỗ & Lan can ôm theo cành lớn -->
          <div class="vt-balcony-deck-wrap">
            ${deckSVG}
          </div>
        </section>
      `;
    }

    // 4. Linh thú đang đi theo (state.activePet) ngồi trên cành/gốc cây trong vườn
    let activePetObj = null;
    if (eco && typeof eco.getActivePet === 'function') {
      activePetObj = eco.getActivePet();
    } else if (state && state.activePet && Array.isArray(state.pets)) {
      const p = state.pets.find(pet => pet.id === state.activePet || pet.type === state.activePet);
      if (p && !p.isEgg) activePetObj = p;
    }
    const petDefs = (eco && eco.PET_DEFS) || {};
    if (activePetObj) {
      const petDef = petDefs[activePetObj.type] || { name: 'Linh thú', desc: 'Đồng hành chăm chỉ' };
      towerHTML += `
        <div class="vt-active-pet-garden-wrap" id="vt-active-pet-garden-wrap" data-pet-type="${activePetObj.type}" title="${petDef.name} - Chạm để xem buff">
          <div class="vt-active-pet-avatar">
            ${Sprites ? Sprites.renderPetSVG(activePetObj.type, 72, 72) : farmIcon('paw', { size: 48 })}
          </div>
          <div class="vt-pet-buff-bubble" id="vt-pet-buff-bubble" style="display:none;">
            <strong>${petDef.name}:</strong> ${petDef.desc}
          </div>
        </div>
      `;
    }

    container.innerHTML = towerHTML;

    // Cập nhật nhãn tầng trên thang máy
    const activeTierIdx = Math.max(0, Math.min(farm.tierCount - 1, farm.activeTier || 0));
    const tierLabel = document.getElementById('vt-tier-current-label');
    if (tierLabel) {
      tierLabel.textContent = `Tầng ${activeTierIdx + 1}/${farm.tierCount}`;
    }

    const btnUp = document.getElementById('vt-btn-tier-up');
    const btnDown = document.getElementById('vt-btn-tier-down');
    if (btnUp) btnUp.disabled = (activeTierIdx >= farm.tierCount - 1);
    if (btnDown) btnDown.disabled = (activeTierIdx <= 0);

    updateElevatorVisibility();
    bindEvents();
  }

  /**
   * Cập nhật hiển thị thang máy: Ẩn khi mọi tầng đã thấy trọn (tierCount <= 3 hoặc wrap không cần cuộn); chỉ hiện khi có cuộn
   */
  function updateElevatorVisibility() {
    if (typeof document === 'undefined') return;
    const el = document.getElementById('vt-elevator-panel');
    const wrap = document.getElementById('vt-balcony-stage-wrap');
    if (!el) return;
    const eco = getEconomy();
    const farm = eco ? eco.getState().farm : null;
    const tierCount = farm ? (farm.tierCount || 3) : 3;

    const hasScroll = wrap ? (wrap.scrollHeight > wrap.clientHeight + 4) : false;
    const shouldShow = (tierCount > 3) && hasScroll;
    el.style.display = shouldShow ? 'flex' : 'none';
  }

  /**
   * Sinh HTML cho 1 ô đặt chậu
   */
  function renderSinglePotSlotHTML(slotData, slotIndex) {
    const pot = slotData ? slotData.pot : null;

    if (!pot) {
      return `
        <div class="vt-pot-slot is-empty" data-slot-index="${slotIndex}" title="Ô trống - Chạm để đặt chậu cây mới">
          ${Sprites && Sprites.renderEmptySlotSVG ? Sprites.renderEmptySlotSVG(105, 78) : `
            <div class="vt-empty-slot-marker">
              <span class="vt-plus-icon">+</span>
              <span class="vt-empty-label">Đặt chậu</span>
            </div>
          `}
        </div>
      `;
    }

    const st = plotStatus(slotData, Date.now());
    const potTierObj = POT_TIERS[pot.type] || POT_TIERS.clay;
    const potName = potTierObj.fullName || potTierObj.name || 'Chậu Đất Nung';
    const potTitle = `${potName} ${pot.stars || 1} sao`;

    const potSVG = Sprites ? Sprites.renderPotSVG(pot.type || 'clay', pot.stars || 1, 98, 70, st.state) : '<div class="pot-box">Chậu</div>';

    let plantSVG = '';
    let statusBadgeHTML = '';
    let hanziTagHTML = '';

    if (pot.crop && pot.crop.cropId) {
      const cropDef = st.cropDef || CROP_DEFS[pot.crop.cropId] || CROP_DEFS.chrysanthemum;
      const isWordTree = !!(pot.crop.isWordTree || pot.crop.cropId === 'word_tree');
      const isThirsty = (st.state === 'thirsty' || st.state === 'thirsty_word');
      const hasPest = (st.state === 'pest');

      plantSVG = Sprites ? Sprites.renderPlantSVG(
        isWordTree ? 'word_tree' : pot.crop.cropId,
        st.stage,
        isThirsty,
        hasPest,
        98,
        108,
        isWordTree ? pot.crop.wordHanzi : null
      ) : '';

      // Nhãn tên tiếng Trung chỉ hiện khi chạm / hover
      hanziTagHTML = `
        <div class="vt-crop-hanzi-tag" title="${cropDef.meaning || cropDef.name}">
          <span class="vt-tag-hanzi">${cropDef.hanzi}</span>
          <span class="vt-tag-pinyin">${cropDef.pinyin || ''}</span>
        </div>
      `;

      if (st.state === 'ripe') {
        statusBadgeHTML = `<div class="vt-status-pill is-ripe animate-bounce">${farmIcon('sprout', { size: 14 })} ${isWordTree ? 'Hái quả!' : 'Thu hoạch!'}</div>`;
      } else if (st.state === 'pest') {
        statusBadgeHTML = `<div class="vt-status-pill is-pest animate-pulse">${farmIcon('bug', { size: 14 })} Bắt sâu!</div>`;
      } else if (isWordTree && (st.isWordDue || st.state === 'thirsty_word')) {
        statusBadgeHTML = `<div class="vt-status-pill is-word-due animate-pulse">${farmIcon('book-open', { size: 14 })} Khát chữ! <span class="vt-pot-due-dot">!</span></div>`;
      } else if (st.state === 'thirsty') {
        statusBadgeHTML = `<div class="vt-status-pill is-thirsty">${farmIcon('droplet', { size: 14 })} Cần tưới</div>`;
      } else {
        const percent = Math.round(st.progress * 100);
        statusBadgeHTML = `
          <div class="vt-growth-mini-bar" title="Tiến độ lớn: ${percent}% ${isWordTree ? `(GĐ ${st.stage}/4)` : ''}">
            <div class="vt-mini-bar-fill ${isWordTree ? 'vt-word-bar-fill' : ''}" style="width:${percent}%"></div>
          </div>
        `;
      }
    }

    return `
      <div class="vt-pot-slot has-pot pot-${pot.type || 'clay'} pot-state-${st.state || 'normal'} ${st.isWordDue ? 'has-word-due' : ''}" data-slot-index="${slotIndex}" title="${potTitle}">
        ${st.isWordDue ? '<span class="vt-pot-word-due-badge" title="Cây từ khát chữ! Chạm để ôn tập.">!</span>' : ''}
        ${hanziTagHTML}
        <div class="vt-pot-stack">
          <!-- Cây trồng vươn lên trên chậu -->
          <div class="vt-plant-layer">
            ${plantSVG}
          </div>
          <!-- Chậu nâng đỡ bên dưới -->
          <div class="vt-pot-layer">
            ${potSVG}
          </div>
        </div>
        ${statusBadgeHTML}
      </div>
    `;
  }

  /**
   * Căn giữa tầm nhìn hoặc cuộn tới tầng đang chọn
   */
  function scrollToActiveTier() {
    const eco = getEconomy();
    const farm = eco ? eco.getState().farm : null;
    const activeIdx = farm ? (farm.activeTier || 0) : 0;
    const tierEl = document.getElementById(`vt-tier-${activeIdx}`);
    if (tierEl) {
      tierEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    const tierLabel = document.getElementById('vt-tier-current-label');
    if (tierLabel && farm) {
      tierLabel.textContent = `Tầng ${activeIdx + 1}/${farm.tierCount}`;
    }
    const btnUp = document.getElementById('vt-btn-tier-up');
    const btnDown = document.getElementById('vt-btn-tier-down');
    if (btnUp && farm) btnUp.disabled = (activeIdx >= farm.tierCount - 1);
    if (btnDown && farm) btnDown.disabled = (activeIdx <= 0);
  }

  /**
   * Kiểm tra bằng document.elementFromPoint tại tâm từng chậu để đảm bảo bấm trúng chậu đó
   */
  function checkPotVisibility() {
    if (typeof document === 'undefined') return [];
    const eco = getEconomy();
    const farm = eco ? eco.getState().farm : null;
    if (!farm) return [];

    const results = [];
    const count = Math.min(farm.slots.length, Math.max(18, farm.tierCount * 6));
    const slotsToCheck = farm.slots.slice(0, count);
    slotsToCheck.forEach(slot => {
      const slotEl = document.querySelector(`.vt-pot-slot[data-slot-index="${slot.slotIndex}"]`);
      if (slotEl) {
        const rect = slotEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const elemAtPoint = document.elementFromPoint(centerX, centerY);
        const isVisible = !!(elemAtPoint && (slotEl.contains(elemAtPoint) || elemAtPoint.contains(slotEl)));
        results.push({
          slotIndex: slot.slotIndex,
          centerX: Math.round(centerX),
          centerY: Math.round(centerY),
          elemTag: elemAtPoint ? elemAtPoint.tagName : null,
          elemClass: elemAtPoint ? (typeof elemAtPoint.className === 'string' ? elemAtPoint.className : '') : null,
          isVisible
        });
      }
    });
    return results;
  }


  /* ==========================================================================
     6. Xử Lý Tương Tác & Thao Tác Trồng Trọt
     ========================================================================== */

  let rootEventsInitialized = false;

  function toggleHudPopover() {
    const pop = document.getElementById('vt-hud-popover');
    if (!pop) return;
    pop.style.display = (pop.style.display === 'none' || !pop.style.display) ? 'block' : 'none';
  }

  function toggleBottomMoreMenu() {
    const menu = document.getElementById('vt-bottom-more-menu');
    if (!menu) return;
    menu.style.display = (menu.style.display === 'none' || !menu.style.display) ? 'flex' : 'none';
  }

  function hideBottomMoreMenu() {
    const menu = document.getElementById('vt-bottom-more-menu');
    if (menu) menu.style.display = 'none';
  }

  function handleFairyClick(tierIdx) {
    const eco = getEconomy();
    if (!eco) return;
    const farm = eco.getState().farm;
    const fairy = (farm.fairies && farm.fairies[tierIdx]) || { level: 0 };
    if (fairy.level < 1) {
      openHireFairyModal(tierIdx);
    } else {
      openFairyModal(tierIdx);
    }
  }

  function bindEvents() {
    if (!rootContainer) return;

    // Nút về trang học
    const btnBack = document.getElementById('vt-btn-back');
    if (btnBack) {
      btnBack.onclick = () => {
        if (typeof window !== 'undefined') {
          window.location.hash = '#/';
        }
      };
    }

    // Các nút chọn công cụ ở thanh dưới
    rootContainer.querySelectorAll('.vt-bar-btn[data-tool]').forEach(btn => {
      btn.onclick = () => {
        selectedTool = btn.dataset.tool;
        rootContainer.querySelectorAll('.vt-bar-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        if (selectedTool === 'seed') {
          openSeedBagModal();
        }
      };
    });

    // Mở các modal chức năng từ thanh công cụ
    const btnQuests = document.getElementById('vt-btn-open-quests');
    if (btnQuests) btnQuests.onclick = () => openQuestsModal();

    const btnWordbook = document.getElementById('vt-btn-open-wordbook');
    if (btnWordbook) btnWordbook.onclick = () => openGardenWordbookModal();

    const subWordbook = document.getElementById('vt-sub-btn-wordbook');
    if (subWordbook) {
      subWordbook.onclick = () => {
        hideBottomMoreMenu();
        openGardenWordbookModal();
      };
    }

    const btnShop = document.getElementById('vt-btn-open-shop');
    if (btnShop) btnShop.onclick = () => openShopModal();

    const btnWarehouse = document.getElementById('vt-btn-open-warehouse');
    if (btnWarehouse) btnWarehouse.onclick = () => openWarehouseModal();

    const btnHudMore = document.getElementById('vt-btn-hud-more');
    if (btnHudMore) btnHudMore.onclick = () => toggleHudPopover();

    const btnBottomMore = document.getElementById('vt-btn-bottom-more');
    if (btnBottomMore) btnBottomMore.onclick = () => toggleBottomMoreMenu();

    const subOrders = document.getElementById('vt-sub-btn-orders');
    if (subOrders) {
      subOrders.onclick = () => {
        hideBottomMoreMenu();
        openOrdersModal();
      };
    }

    const subPets = document.getElementById('vt-sub-btn-pets');
    if (subPets) {
      subPets.onclick = () => {
        hideBottomMoreMenu();
        openPetsModal();
      };
    }

    const subTree = document.getElementById('vt-sub-btn-tree-quest');
    if (subTree) {
      subTree.onclick = () => {
        hideBottomMoreMenu();
        openTreeAwakeningModal();
      };
    }

    const subFert = document.getElementById('vt-sub-btn-fertilizer');
    if (subFert) {
      subFert.onclick = () => {
        hideBottomMoreMenu();
        selectedTool = 'fertilizer';
        rootContainer.querySelectorAll('.vt-bar-btn').forEach(b => b.classList.remove('is-active'));
        btnBottomMore.classList.add('is-active');
      };
    }

    // Nút điều hướng tầng
    const btnUp = document.getElementById('vt-btn-tier-up');
    if (btnUp) {
      btnUp.onclick = () => {
        const eco = getEconomy();
        const farm = eco ? eco.getState().farm : null;
        if (farm && farm.activeTier < farm.tierCount - 1) {
          farm.activeTier++;
          eco.saveState();
          scrollToActiveTier();
        }
      };
    }

    const btnDown = document.getElementById('vt-btn-tier-down');
    if (btnDown) {
      btnDown.onclick = () => {
        const eco = getEconomy();
        const farm = eco ? eco.getState().farm : null;
        if (farm && farm.activeTier > 0) {
          farm.activeTier--;
          eco.saveState();
          scrollToActiveTier();
        }
      };
    }

    // Ủy quyền sự kiện (Event Delegation) trên container gốc để mọi chậu và tiên bấm được sau mỗi lần vẽ lại
    if (!rootEventsInitialized) {
      rootEventsInitialized = true;

      rootContainer.addEventListener('click', (e) => {
        // 1. Chạm vào ô chậu cây
        const potEl = e.target.closest('.vt-pot-slot');
        if (potEl) {
          const slotIdx = parseInt(potEl.dataset.slotIndex, 10);
          if (!isNaN(slotIdx)) {
            handlePotSlotClick(slotIdx);
            return;
          }
        }

        // 2. Chạm vào ô Tiên hoặc nút Thuê tiên
        const fairyEl = e.target.closest('.vt-fairy-spot, .vt-fairy-card, .vt-btn-hire-fairy');
        if (fairyEl) {
          const tierIdx = parseInt(fairyEl.dataset.tier, 10);
          if (!isNaN(tierIdx)) {
            handleFairyClick(tierIdx);
            return;
          }
        }

        // 3. Chạm vào nhãn tầng để đổi phong cách ban công
        const badgeEl = e.target.closest('.vt-tier-badge-compact');
        if (badgeEl) {
          const tierIdx = parseInt(badgeEl.dataset.tier, 10);
          if (!isNaN(tierIdx)) {
            openThemePickerModal(tierIdx);
            return;
          }
        }

        // 4. Nút mở tầng mới trên đỉnh tháp
        if (e.target.closest('#vt-btn-unlock-tier')) {
          unlockNewTier();
          return;
        }

        // 5. Chạm vào Linh thú trong vườn -> Bật/tắt bong bóng tác dụng thưởng
        const petGardenEl = e.target.closest('#vt-active-pet-garden-wrap');
        if (petGardenEl) {
          const bubble = document.getElementById('vt-pet-buff-bubble');
          if (bubble) {
            const isHidden = bubble.style.display === 'none' || !bubble.style.display;
            bubble.style.display = isHidden ? 'block' : 'none';
          }
          return;
        }

        // Bấm ra ngoài linh thú thì ẩn bubble
        if (!e.target.closest('#vt-active-pet-garden-wrap')) {
          const bubble = document.getElementById('vt-pet-buff-bubble');
          if (bubble) bubble.style.display = 'none';
        }

        // Đóng popover HUD nếu bấm ra ngoài
        if (!e.target.closest('.vt-hud-more-wrapper')) {
          const pop = document.getElementById('vt-hud-popover');
          if (pop) pop.style.display = 'none';
        }

        // Đóng menu Thêm nếu bấm ra ngoài
        if (!e.target.closest('.vt-bottom-more-wrap')) {
          hideBottomMoreMenu();
        }
      });
    }
  }

  /**
   * Xử lý khi người chơi bấm vào 1 ô chậu cây
   */
  function handlePotSlotClick(slotIndex) {
    const eco = getEconomy();
    if (!eco) return;
    const state = eco.getState();
    const farm = state.farm;
    const slot = farm.slots[slotIndex];

    // 1. Ô chưa có chậu -> Mở gợi ý mua / đặt chậu
    if (!slot || !slot.pot) {
      openPlacePotModal(slotIndex);
      return;
    }

    const pot = slot.pot;
    const st = plotStatus(slot, Date.now());

    // 2. Chậu chưa có cây trồng -> Mở túi hạt giống gieo hạt
    if (!pot.crop) {
      selectedSlotIndex = slotIndex;
      openSeedBagModal(slotIndex);
      return;
    }

    // 3. Có sâu bệnh -> Mở đố vui bắt sâu ngay!
    if (st.state === 'pest') {
      openPestQuizModal(slotIndex);
      return;
    }

    // 4. Cây đã chín -> Thu hoạch!
    if (st.state === 'ripe') {
      harvestCrop(slotIndex);
      return;
    }

    // 4b. Cây Từ tới hạn ôn -> "Khát chữ" -> Mở câu hỏi nhớ lại SRS!
    if (pot.crop && pot.crop.isWordTree && (st.isWordDue || st.state === 'thirsty_word')) {
      openWordRecallQuizModal(slotIndex);
      return;
    }

    // 5. Thao tác theo công cụ đang cầm:
    if (selectedTool === 'water') {
      waterCrop(slotIndex);
      return;
    }
    if (selectedTool === 'fertilizer') {
      fertilizeCrop(slotIndex);
      return;
    }

    // 6. Mặc định: Xem thông tin cây, nghe phát âm tiếng Trung & Nâng cấp chậu
    openPlantDetailModal(slotIndex);
  }

  /**
   * Tưới nước cho cây
   */
  function waterCrop(slotIndex) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const slot = farm.slots[slotIndex];
    if (!slot || !slot.pot || !slot.pot.crop) return;

    if (slot.pot.crop.watered) {
      eco.showToast(`${farmIcon('droplet', { className: 'vt-icon-water' })} Cây đã đủ nước cho đợt này rồi!`);
      return;
    }

    if ((state.water || 0) < 1) {
      eco.showToast(`${farmIcon('alert', { className: 'vt-icon-warn' })} Bạn đã hết nước! Hãy hoàn thành các bài học để nhận thêm nước.`);
      return;
    }

    state.water -= 1;
    slot.pot.crop.watered = true;
    slot.pot.crop.lastWateredAt = Date.now();
    if (eco && typeof eco.recordGardenAction === 'function') {
      eco.recordGardenAction('water', 1);
    }
    eco.saveState();
    playChime(true);
    eco.showToast(`${farmIcon('droplet', { className: 'vt-icon-water' })} Đã tưới nước! Cây tiếp tục lớn nhanh.`);

    // Hoạt ảnh giọt nước rơi
    showWaterDropAnim(slotIndex);
    refreshTiersView();
    updateHUDValues();

    if (farm.tutorialStep === 3) {
      advanceTutorial(4);
    }
  }

  /**
   * Bón phân rút ngắn 50% thời gian lớn còn lại
   */
  function fertilizeCrop(slotIndex) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const slot = farm.slots[slotIndex];
    if (!slot || !slot.pot || !slot.pot.crop) return;

    if ((farm.fertilizer || 0) < 1) {
      eco.showToast(`${farmIcon('alert', { className: 'vt-icon-warn' })} Hết phân bón! Hoàn thành bài học hoặc giao đơn hàng để nhận phân bón.`);
      return;
    }

    const st = plotStatus(slot, Date.now());
    if (st.state === 'ripe') {
      eco.showToast(`${farmIcon('sprout', { className: 'vt-icon-sprout' })} Cây đã chín rồi, hãy thu hoạch ngay!`);
      return;
    }

    farm.fertilizer -= 1;
    // Rút ngắn 600.000ms (10 phút) hoặc 50% thời gian còn lại
    const advanceMs = Math.max(120000, Math.round(st.timeRemainingMs * 0.5));
    slot.pot.crop.accumulatedGrowthMs = (slot.pot.crop.accumulatedGrowthMs || 0) + advanceMs;
    eco.saveState();
    playChime(true);
    eco.showToast(`${farmIcon('sparkle', { className: 'vt-icon-sparkle' })} Bón phân thành công! Rút ngắn ${Math.round(advanceMs / 60000)} phút lớn.`);
    refreshTiersView();
    updateHUDValues();
  }

  /**
   * Thu hoạch nông sản
   */
  function triggerHarvestFX(slotIndex, yieldAmount, xpGained) {
    if (typeof document === 'undefined') return;
    const slotEl = document.querySelector(`.vt-pot-slot[data-slot-index="${slotIndex}"]`);
    if (!slotEl) return;

    const charms = [farmIcon('sparkle', { size: 18 }), farmIcon('star-filled', { size: 18 }), farmIcon('heart', { size: 18 }), farmIcon('sprout', { size: 18 })];
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = 'vt-harvest-particle';
      p.innerHTML = charms[i % charms.length];
      const angle = (i / 6) * 2 * Math.PI;
      const dist = 32 + Math.random() * 20;
      p.style.setProperty('--dx', `${Math.round(Math.cos(angle) * dist)}px`);
      p.style.setProperty('--dy', `${Math.round(Math.sin(angle) * dist - 25)}px`);
      slotEl.appendChild(p);
      setTimeout(() => { if (p.parentNode) p.parentNode.removeChild(p); }, 900);
    }

    const flyLabel = document.createElement('div');
    flyLabel.className = 'vt-fly-xp-label';
    flyLabel.textContent = `+${xpGained} KN`;
    slotEl.appendChild(flyLabel);
    setTimeout(() => { if (flyLabel.parentNode) flyLabel.parentNode.removeChild(flyLabel); }, 1000);
  }

  function harvestCrop(slotIndex) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const slot = farm.slots[slotIndex];
    if (!slot || !slot.pot || !slot.pot.crop) return;

    const pot = slot.pot;
    const crop = pot.crop;

    // XỬ LÝ THU HOẠCH CÂY TỪ CHÍN -> QUẢ TRI THỨC
    if (crop.isWordTree) {
      const xpGained = 80;
      const coinsGained = 60;
      eco.earn('word_tree_harvest', { coins: coinsGained, xp: xpGained });

      if (!farm.warehouse) farm.warehouse = { capacity: 50, items: {} };
      if (!farm.warehouse.items) farm.warehouse.items = {};
      farm.warehouse.items.knowledge_fruit = (farm.warehouse.items.knowledge_fruit || 0) + 1;

      // Đánh dấu "Đã thuộc" trong Sổ Từ Vườn
      if (!farm.wordbook) farm.wordbook = {};
      farm.wordbook[crop.wordHanzi] = {
        hanzi: crop.wordHanzi,
        pinyin: crop.wordData?.py || '',
        meaning: crop.wordData?.vi || '',
        hanViet: crop.wordData?.hv || '',
        example: crop.wordData?.ex || null,
        status: 'mastered',
        masteredAt: Date.now(),
        isWordTree: true
      };

      if (eco && typeof eco.recordGardenAction === 'function') {
        eco.recordGardenAction('harvest', 1);
      }

      pot.crop = null;
      eco.saveState();
      playChime(true);
      eco.showToast(`${farmIcon('sparkle', { className: 'vt-icon-sparkle' })} Thu hoạch Quả Tri Thức "${crop.wordHanzi}" (+${coinsGained} xu, +${xpGained} KN)! Từ vựng đã thuộc!`);
      refreshTiersView();
      updateHUDValues();
      return;
    }

    const cDef = CROP_DEFS[crop.cropId] || CROP_DEFS.chrysanthemum;

    // Kiểm tra sức chứa kho
    const currentWarehouseCount = Object.values(farm.warehouse.items || {}).reduce((a, b) => a + b, 0);
    if (currentWarehouseCount >= (farm.warehouse.capacity || 50)) {
      eco.showToast(`${farmIcon('alert', { className: 'vt-icon-warn' })} Kho nông sản đã đầy! Hãy vào Kho bán bớt hoặc nâng cấp kho.`);
      openWarehouseModal();
      return;
    }

    // Tính sản lượng thu được & cơ hội x2 từ chậu cao cấp
    let yieldAmount = cDef.yield || 1;
    const potTier = POT_TIERS[pot.type];
    const starIdx = Math.min((pot.stars || 1) - 1, (potTier.upgrades || []).length - 1);
    const upgradeStats = (potTier.upgrades && potTier.upgrades[starIdx]) || {};

    if (upgradeStats.yieldBonus) {
      yieldAmount += Math.round(yieldAmount * upgradeStats.yieldBonus);
    }

    let isDouble = false;
    if (upgradeStats.doubleChance && Math.random() < upgradeStats.doubleChance) {
      yieldAmount *= 2;
      isDouble = true;
    }

    // Cộng nông sản vào kho
    farm.warehouse.items[crop.cropId] = (farm.warehouse.items[crop.cropId] || 0) + yieldAmount;
    if (eco && typeof eco.recordGardenAction === 'function') {
      eco.recordGardenAction('harvest', yieldAmount);
    }

    // Cộng kinh nghiệm người chơi
    const xpBonus = upgradeStats.xpBonus || 0;
    const xpGained = Math.round((cDef.xp || 5) * (1 + xpBonus));
    eco.earn('crop_harvest', { xp: xpGained });

    // Xác suất rơi vật liệu nâng cấp chậu (35% cơ hội)
    let droppedMat = null;
    if (Math.random() < 0.35) {
      const matKeys = ['clay', 'glaze', 'jadePowder'];
      droppedMat = matKeys[Math.floor(Math.random() * matKeys.length)];
      farm.materials[droppedMat] = (farm.materials[droppedMat] || 0) + 1;
    }

    // Xử lý cây thu hoạch nhiều lần
    crop.harvestsLeft = (crop.harvestsLeft !== undefined ? crop.harvestsLeft : cDef.maxHarvests) - 1;

    let toastMsg = `${farmIcon('sprout', { className: 'vt-icon-sprout' })} Thu hoạch được ${yieldAmount} ${cDef.name} (+${xpGained} KN)!`;
    if (isDouble) toastMsg = `${farmIcon('sparkle')} May mắn x2 thu hoạch! ` + toastMsg;
    if (droppedMat) {
      const matNames = { clay: 'Đất sét', glaze: 'Men gốm', jadePowder: 'Bột ngọc', goldLeaf: 'Vàng lá' };
      toastMsg += ` ${farmIcon('layers')} Nhận được 1 ${matNames[droppedMat]}!`;
    }

    // Thu hoạch lần đầu mỗi loại cây thường -> thêm tên cây vào Sổ Từ Vườn
    if (!farm.wordbook) farm.wordbook = {};
    if (!farm.wordbook[crop.cropId]) {
      farm.wordbook[crop.cropId] = {
        id: crop.cropId,
        hanzi: cDef.hanzi,
        pinyin: cDef.pinyin,
        meaning: cDef.meaning,
        hanViet: cDef.hanViet || '',
        example: { zh: `这是${cDef.hanzi}。`, py: `Zhè shì ${cDef.pinyin}.`, vi: `Đây là ${cDef.name}.` },
        status: 'mastered',
        isNormalCrop: true,
        harvestedAt: Date.now()
      };
      toastMsg += ` ${farmIcon('book-open')} Đã thêm "${cDef.name}" (${cDef.hanzi}) vào Sổ Từ Vườn!`;
    }

    playChime(true);
    eco.showToast(toastMsg);

    if (crop.harvestsLeft > 0) {
      // Cây tiếp tục chu kỳ sau, cần tưới lại nước
      crop.watered = false;
      crop.accumulatedGrowthMs = 0;
      crop.lastWateredAt = null;
      crop.wasRipeNotified = false;
    } else {
      // Cây đã hết số lần thu hoạch -> Chậu trở lại trống
      pot.crop = null;
    }

    eco.saveState();
    refreshTiersView();
    updateHUDValues();

    if (farm.tutorialStep === 4) {
      advanceTutorial(5);
    }
  }

  /**
   * Mở Tầng Ban Công Mới (Mở rộng vườn treo)
   */
  function unlockNewTier() {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    if (farm.tierCount >= 8) {
      eco.showToast('Vườn treo đã đạt tối đa 8 tầng rực rỡ!');
      return;
    }

    const nextTier = farm.tierCount + 1;
    const nextUnlock = TIER_UNLOCKS.find(u => u.tier === nextTier) || TIER_UNLOCKS[farm.tierCount];
    const playerLvl = eco.levelInfo(state.xp).level;

    if (playerLvl < nextUnlock.level) {
      eco.showToast(`${farmIcon('alert')} Yêu cầu đạt Cấp ${nextUnlock.level} để mở tầng mới (Hiện tại: Cấp ${playerLvl})!`);
      return;
    }

    // Điều kiện mở tầng: Tầng 4+ cần CẢ xu VÀ Checkpoint tương ứng
    if (typeof eco.canUnlockTier === 'function') {
      const check = eco.canUnlockTier(nextTier);
      if (!check.checkpointPassed) {
        eco.showToast(`${farmIcon('lock')} Cần vượt ${check.checkpointName} (Điểm ≥ 80%) để mở Tầng ${nextTier}!`);
        return;
      }
      if (!check.hasCoins) {
        eco.showToast(`${farmIcon('coin', { className: 'vt-icon-coin' })} Không đủ xu! Cần ${check.cost} xu để mở Tầng ${nextTier}.`);
        return;
      }
    }

    if (!eco.spend(nextUnlock.cost)) {
      eco.showToast(`${farmIcon('alert')} Không đủ xu! Cần ${nextUnlock.cost} xu để mở tầng mới.`);
      return;
    }

    // Mở thêm 1 tầng mới
    const newTierIdx = farm.tierCount;
    farm.tierCount += 1;
    const themePool = ['chinese', 'japanese', 'english', 'russian'];
    farm.tierThemes.push(themePool[newTierIdx % themePool.length]);
    farm.activeTier = newTierIdx;

    // Bổ sung 6 ô chậu mới cho tầng này
    for (let i = 0; i < 6; i++) {
      farm.slots.push({
        slotIndex: (newTierIdx * 6) + i,
        pot: null
      });
    }

    // Bổ sung dữ liệu Tiên Vườn cho tầng mới
    if (!farm.fairies) farm.fairies = [];
    while (farm.fairies.length < farm.tierCount) {
      farm.fairies.push({
        level: 0,
        enabled: { water: true, harvest: true, replant: true },
        lastWorkAt: 0
      });
    }

    eco.saveState();
    playChime(true);
    eco.showToast(`${farmIcon('party-popper')} Chúc mừng! Bạn đã mở thành công Tầng ${farm.tierCount} Vườn Treo!`);
    refreshTiersView();
    scrollToActiveTier();
  }

  /* ==========================================================================
     7. Các Cửa Sổ Modal (Hạt Giống, Cửa Hàng, Bắt Sâu, Nâng Cấp Chậu...)
     ========================================================================== */

  function closeModal() {
    if (activeModal && activeModal.parentNode) {
      activeModal.parentNode.removeChild(activeModal);
      activeModal = null;
    }
  }

  function showModal(contentHTML, title = '', customClass = '') {
    closeModal();
    const overlay = document.createElement('div');
    overlay.className = 'vt-modal-overlay';
    overlay.innerHTML = `
      <div class="vt-modal-dialog ${customClass}">
        <div class="vt-modal-header">
          <h3 class="vt-modal-title">${title}</h3>
          <button class="vt-modal-close-btn" id="vt-modal-close-btn" title="Đóng">&times;</button>
        </div>
        <div class="vt-modal-body">
          ${contentHTML}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    activeModal = overlay;

    overlay.querySelector('#vt-modal-close-btn').onclick = closeModal;
    overlay.onclick = (e) => {
      if (e.target === overlay) closeModal();
    };
    return overlay;
  }

  /**
   * Modal 1: Túi Hạt Giống (Sow Seeds - Hạt Thường & Hạt Từ Vựng)
   */
  function openSeedBagModal(targetSlotIndex = selectedSlotIndex, initialTab = 'crops') {
    const eco = getEconomy();
    const state = eco.getState();
    const playerLvl = eco.levelInfo(state.xp).level;
    const learnedWords = getLearnedWords();

    const cropList = Object.values(CROP_DEFS);
    let normalCropsHTML = '';

    cropList.forEach(crop => {
      const isLocked = playerLvl < crop.unlockLevel;
      const canAfford = (state.coins || 0) >= crop.seedCost;

      normalCropsHTML += `
        <div class="vt-seed-card ${isLocked ? 'is-locked' : ''}">
          <div class="vt-seed-preview">
            <span class="vt-seed-hanzi">${crop.hanzi}</span>
            <span class="vt-seed-pinyin">${crop.pinyin}</span>
          </div>
          <div class="vt-seed-info">
            <div class="vt-seed-name">${crop.name} <span class="vt-seed-cat">(${crop.categoryName || 'Hoa & Quả'})</span></div>
            <div class="vt-seed-meta">${farmIcon('hourglass', { size: 13 })} ${crop.growMinutes} phút · ${farmIcon('repeat', { size: 13 })} ${crop.maxHarvests} lần thu · ${farmIcon('zap', { size: 13 })} +${crop.xp} KN</div>
            <div class="vt-seed-price">Giá hạt: ${farmIcon('coin', { className: 'vt-icon-coin', size: 14 })} ${crop.seedCost} xu</div>
          </div>
          <div class="vt-seed-action">
            ${isLocked ? `
              <span class="vt-badge-locked">Cấp ${crop.unlockLevel} mở</span>
            ` : `
              <button class="vt-btn-sow ${!canAfford ? 'is-disabled' : ''}" data-crop-id="${crop.id}">
                Gieo hạt
              </button>
            `}
          </div>
        </div>
      `;
    });

    let wordSeedsHTML = '';
    if (learnedWords.length === 0) {
      wordSeedsHTML = `
        <div class="vt-empty-wordseeds-notice">
          <div style="font-size:32px; margin-bottom:8px;">${farmIcon('sprout', { size: 36 })}</div>
          <div style="font-weight:700; color:#1E293B; margin-bottom:4px;">Chưa có hạt giống từ vựng nào!</div>
          <p style="font-size:13px; color:#64748B; line-height:1.5;">Hãy hoàn thành các bài học trong lộ trình học tập (#zh/learn) để nhận hạt giống từ vựng miễn phí.</p>
          <a href="#zh/learn" class="vt-btn-go-learn" style="display:inline-block; margin-top:12px;">Đến trang Bài học</a>
        </div>
      `;
    } else {
      learnedWords.forEach(w => {
        const isPlanted = (state.farm.slots || []).some(s => s && s.pot && s.pot.crop && s.pot.crop.isWordTree && s.pot.crop.wordHanzi === w.hanzi);
        wordSeedsHTML += `
          <div class="vt-seed-card vt-word-seed-card">
            <div class="vt-seed-preview" style="background:#ECFDF5; border-color:#6EE7B7;">
              <span class="vt-seed-hanzi" style="color:#047857;">${w.hanzi}</span>
              <span class="vt-seed-pinyin" style="color:#065F46;">${w.py}</span>
            </div>
            <div class="vt-seed-info">
              <div class="vt-seed-name">${w.vi} ${w.hv ? `<span class="vt-seed-cat">(${w.hv})</span>` : ''}</div>
              <div class="vt-seed-meta">${farmIcon('refresh', { size: 13 })} Lặp lại ngắt quãng SRS (4 giai đoạn) · ${farmIcon('sparkle', { size: 13 })} Thu Quả Tri Thức</div>
              <div class="vt-seed-price" style="color:#059669; font-weight:700;">${farmIcon('gift', { size: 14 })} Miễn phí (Từ đã học)</div>
            </div>
            <div class="vt-seed-action">
              ${isPlanted ? `
                <span class="vt-badge-planted">Đang gieo</span>
              ` : `
                <button class="vt-btn-sow-word" data-hanzi="${w.hanzi}">
                  Gieo Cây Từ
                </button>
              `}
            </div>
          </div>
        `;
      });
    }

    const modal = showModal(`
      <div class="vt-seed-bag-modal">
        <div class="vt-seed-bag-tabs">
          <button class="vt-seed-tab ${initialTab === 'crops' ? 'is-active' : ''}" id="vt-tab-crops">${farmIcon('sprout', { size: 16 })} Cây Thường (${cropList.length})</button>
          <button class="vt-seed-tab ${initialTab === 'words' ? 'is-active' : ''}" id="vt-tab-words">${farmIcon('book-open', { size: 16 })} Cây Từ Vựng (${learnedWords.length} từ đã học)</button>
        </div>
        <div class="vt-seed-tab-pane" id="vt-pane-crops" style="${initialTab === 'crops' ? '' : 'display:none;'}">
          <p class="vt-modal-subtext">Chọn loại hạt giống hoa thơm, rau ngọt hoặc cây quý để gieo vào chậu:</p>
          <div class="vt-seed-list-grid">${normalCropsHTML}</div>
        </div>
        <div class="vt-seed-tab-pane" id="vt-pane-words" style="${initialTab === 'words' ? '' : 'display:none;'}">
          <p class="vt-modal-subtext">Gieo từ vựng đã học thành "Cây Từ" để ôn tập ngắt quãng (SRS) và thu hoạch "Quả Tri Thức":</p>
          <div class="vt-seed-list-grid">${wordSeedsHTML}</div>
        </div>
      </div>
    `, `${farmIcon('sprout')} Túi Hạt Giống`);

    const tabCrops = modal.querySelector('#vt-tab-crops');
    const tabWords = modal.querySelector('#vt-tab-words');
    const paneCrops = modal.querySelector('#vt-pane-crops');
    const paneWords = modal.querySelector('#vt-pane-words');

    if (tabCrops && tabWords) {
      tabCrops.onclick = () => {
        tabCrops.classList.add('is-active');
        tabWords.classList.remove('is-active');
        paneCrops.style.display = 'block';
        paneWords.style.display = 'none';
      };
      tabWords.onclick = () => {
        tabWords.classList.add('is-active');
        tabCrops.classList.remove('is-active');
        paneWords.style.display = 'block';
        paneCrops.style.display = 'none';
      };
    }

    modal.querySelectorAll('.vt-btn-sow').forEach(btn => {
      btn.onclick = () => {
        const cropId = btn.dataset.cropId;
        sowSeedIntoSlot(targetSlotIndex, cropId);
        closeModal();
      };
    });

    modal.querySelectorAll('.vt-btn-sow-word').forEach(btn => {
      btn.onclick = () => {
        const hanzi = btn.dataset.hanzi;
        sowWordSeedIntoSlot(targetSlotIndex, hanzi);
        closeModal();
      };
    });
  }

  /**
   * Tiến hành gieo hạt vào ô chậu
   */
  function sowSeedIntoSlot(slotIndex, cropId) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const cropDef = CROP_DEFS[cropId];
    if (!cropDef) return;

    if (slotIndex === null || slotIndex === undefined) {
      // Tìm ô chậu đầu tiên còn trống chưa có cây
      const emptySlot = farm.slots.find(s => s.pot && !s.pot.crop);
      if (!emptySlot) {
        eco.showToast(`${farmIcon('alert')} Không có chậu trống! Hãy đặt chậu mới hoặc thu hoạch cây cũ.`);
        return;
      }
      slotIndex = emptySlot.slotIndex;
    }

    const slot = farm.slots[slotIndex];
    if (!slot || !slot.pot) {
      eco.showToast(`${farmIcon('alert')} Ô này chưa có chậu cây!`);
      return;
    }

    if (!eco.spend(cropDef.seedCost)) {
      eco.showToast(`${farmIcon('alert')} Không đủ xu mua hạt giống! Cần ${cropDef.seedCost} xu.`);
      return;
    }

    // Gieo hạt: Bắt đầu ở trạng thái cần tưới nước
    slot.pot.crop = {
      cropId: cropDef.id,
      plantedAt: Date.now(),
      watered: false,
      lastWateredAt: null,
      accumulatedGrowthMs: 0,
      harvestsLeft: cropDef.maxHarvests,
      pest: null
    };

    eco.saveState();
    playChime(true);
    speakText(cropDef.hanzi);
    eco.showToast(`${farmIcon('sprout')} Đã gieo ${cropDef.name} (${cropDef.hanzi})! Hãy tưới nước để cây lớn.`);
    refreshTiersView();
    updateHUDValues();

    if (farm.tutorialStep === 2) {
      advanceTutorial(3);
    }
  }

  /**
   * Modal 2: Cửa Hàng (Shop - Mua Chậu Cây & Vật Phẩm)
   */
  function openShopModal() {
    const eco = getEconomy();
    const state = eco.getState();
    const playerLvl = eco.levelInfo(state.xp).level;

    const potList = Object.values(POT_TIERS);
    let potsHTML = '';

    potList.forEach(pot => {
      const isLocked = playerLvl < pot.unlockLevel;
      const canAfford = (state.coins || 0) >= pot.cost;

      potsHTML += `
        <div class="vt-shop-pot-card ${isLocked ? 'is-locked' : ''}">
          <div class="vt-pot-card-preview">
            ${Sprites ? Sprites.renderPotSVG(pot.id, 1, 90, 60, 'happy') : ''}
          </div>
          <div class="vt-pot-card-info">
            <div class="vt-pot-card-title">${pot.fullName}</div>
            <div class="vt-pot-card-desc">${pot.desc}</div>
            <div class="vt-pot-card-price">Giá mua: ${farmIcon('coin', { className: 'vt-icon-coin', size: 14 })} ${pot.cost} xu</div>
          </div>
          <div class="vt-pot-card-action">
            ${isLocked ? `
              <span class="vt-badge-locked">Cấp ${pot.unlockLevel} mở</span>
            ` : `
              <button class="vt-btn-buy-pot ${!canAfford ? 'is-disabled' : ''}" data-pot-type="${pot.id}">
                Mua chậu
              </button>
            `}
          </div>
        </div>
      `;
    });

    const modal = showModal(`
      <div class="vt-shop-modal">
        <p class="vt-modal-subtext">Mua chậu cao cấp để tăng sản lượng, giảm thời gian lớn và nhận cơ hội x2 mùa vụ:</p>
        <div class="vt-shop-pots-grid">
          ${potsHTML}
        </div>
      </div>
    `, `${farmIcon('store')} Cửa Hàng Vườn Treo`);

    modal.querySelectorAll('.vt-btn-buy-pot').forEach(btn => {
      btn.onclick = () => {
        const pType = btn.dataset.potType;
        buyAndPlacePot(pType);
        closeModal();
      };
    });

    if (state.farm && state.farm.tutorialStep === 0) {
      advanceTutorial(1);
    }
  }

  /**
   * Mua và đặt chậu vào ô trống đầu tiên
   */
  function buyAndPlacePot(potType) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const potDef = POT_TIERS[potType];
    if (!potDef) return;

    // Tìm ô trống
    const emptySlot = farm.slots.find(s => !s.pot);
    if (!emptySlot) {
      eco.showToast(`${farmIcon('alert')} Tất cả các ô trên các tầng đã đầy chậu! Hãy mở tầng mới để thêm chỗ.`);
      return;
    }

    if (!eco.spend(potDef.cost)) {
      eco.showToast(`${farmIcon('alert')} Không đủ xu! Cần ${potDef.cost} xu để mua ${potDef.fullName}.`);
      return;
    }

    emptySlot.pot = {
      type: potDef.id,
      stars: 1,
      crop: null
    };

    eco.saveState();
    playChime(true);
    eco.showToast(`${farmIcon('party-popper')} Mua thành công ${potDef.fullName}! Chậu đã được đặt vào Tầng ${Math.floor(emptySlot.slotIndex / 6) + 1}.`);
    refreshTiersView();
    updateHUDValues();

    if (farm.tutorialStep === 1) {
      advanceTutorial(2);
    }
  }

  /**
   * Modal 3: Đặt Chậu Vào Ô Trống (Place Pot)
   */
  function openPlacePotModal(slotIndex) {
    const eco = getEconomy();
    const state = eco.getState();

    showModal(`
      <div class="vt-place-pot-prompt">
        <p>Ô này đang trống. Bạn muốn đặt loại chậu nào vào ô này?</p>
        <div style="display:flex; gap:12px; justify-content:center; margin-top:16px;">
          <button class="vt-btn-primary" id="vt-btn-goto-shop-pots">Vào Cửa Hàng Mua Chậu</button>
        </div>
      </div>
    `, `${farmIcon('layers')} Đặt Chậu Cây`);

    const btnShop = document.getElementById('vt-btn-goto-shop-pots');
    if (btnShop) {
      btnShop.onclick = () => {
        closeModal();
        openShopModal();
      };
    }
  }

  /**
   * Modal 4: Chi Tiết Cây & Học Từ Vựng Tiếng Trung (Plant Detail & Pronounce)
   */
  function openPlantDetailModal(slotIndex) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const slot = farm.slots[slotIndex];
    if (!slot || !slot.pot) return;

    const pot = slot.pot;
    const crop = pot.crop;
    const st = plotStatus(slot, Date.now());
    const cDef = st.cropDef || (crop ? CROP_DEFS[crop.cropId] : null);

    let contentHTML = '';

    if (crop && crop.isWordTree) {
      const wData = crop.wordData || resolveWordInfo(crop.wordHanzi);
      contentHTML = `
        <div class="vt-plant-detail-box">
          <div class="vt-detail-vocab-banner" style="background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); border-color: #6EE7B7;">
            <div class="vt-vocab-hanzi-large" style="color:#047857;">${crop.wordHanzi}</div>
            <div class="vt-vocab-pinyin-large" style="color:#065F46;">${wData.py}</div>
            <div class="vt-vocab-meaning-large" style="color:#064E3B;">"${wData.vi}"</div>
            ${wData.hv ? `<div style="font-size:12px; color:#047857; margin-top:2px;">Hán Việt: <strong>${wData.hv}</strong></div>` : ''}
            <button class="vt-btn-listen-audio" id="vt-btn-listen-pronounce" title="Nghe phát âm chuẩn">
              ${farmIcon('volume')} Nghe phát âm
            </button>
          </div>

          ${wData.ex ? `
            <div class="vt-detail-example-box" style="margin-top:10px; padding:8px 12px; background:#F8FAFC; border-radius:8px; border:1px solid #E2E8F0; font-size:13px;">
              <div style="font-weight:700; color:#334155;">Ví dụ:</div>
              <div style="color:#0F172A;">${wData.ex.zh}</div>
              <div style="color:#64748B; font-size:12px;">${wData.ex.py}</div>
              <div style="color:#475569;">${wData.ex.vi}</div>
            </div>
          ` : ''}

          <div class="vt-detail-stats-grid">
            <div class="vt-stat-item">
              <span class="vt-stat-label">Loại cây:</span>
              <span class="vt-stat-val" style="color:#047857; font-weight:700;">${farmIcon('sprout')} Cây Từ Vựng</span>
            </div>
            <div class="vt-stat-item">
              <span class="vt-stat-label">Giai đoạn SRS:</span>
              <span class="vt-stat-val vt-val-highlight">GĐ ${crop.stage || 1} / 4 (Nhớ: ${crop.reviewsPassed || 0}/4)</span>
            </div>
            <div class="vt-stat-item">
              <span class="vt-stat-label">Trạng thái:</span>
              <span class="vt-stat-val">${st.isWordDue ? farmIcon('clock') + ' Khát chữ (Cần ôn)!' : (st.state === 'ripe' ? farmIcon('sparkle') + ' Đã chín mọng' : farmIcon('sprout') + ' Đang lớn')}</span>
            </div>
            <div class="vt-stat-item">
              <span class="vt-stat-label">Lần ôn kế tiếp:</span>
              <span class="vt-stat-val">${st.timeRemainingMs > 0 ? `Còn ${Math.ceil(st.timeRemainingMs / 60000)} phút` : 'Tới hạn ôn tập'}</span>
            </div>
          </div>

          <div class="vt-detail-actions-row">
            ${st.isWordDue ? `
              <button class="vt-btn-primary" id="vt-btn-modal-recall-quiz" style="background:#059669; border-color:#047857;">${farmIcon('book-open')} Ôn Tập Khát Chữ</button>
            ` : ''}
            ${st.state === 'ripe' ? `
              <button class="vt-btn-primary" id="vt-btn-modal-harvest" style="background:#F59E0B; border-color:#B45309;">${farmIcon('sparkle')} Hái Quả Tri Thức</button>
            ` : ''}
            <button class="vt-btn-outline" id="vt-btn-modal-upgrade-pot">${farmIcon('star')} Nâng Cấp Chậu</button>
          </div>
        </div>
      `;
    } else if (cDef) {
      const isBoosted = crop && crop.boostedStages && crop.boostedStages.includes(st.stage);
      contentHTML = `
        <div class="vt-plant-detail-box">
          <div class="vt-detail-vocab-banner">
            <div class="vt-vocab-hanzi-large">${cDef.hanzi}</div>
            <div class="vt-vocab-pinyin-large">${cDef.pinyin}</div>
            <div class="vt-vocab-meaning-large">"${cDef.meaning}"</div>
            <button class="vt-btn-listen-audio" id="vt-btn-listen-pronounce" title="Nghe phát âm chuẩn">
              ${farmIcon('volume')} Nghe phát âm
            </button>
          </div>

          <div class="vt-detail-stats-grid">
            <div class="vt-stat-item">
              <span class="vt-stat-label">Loại cây:</span>
              <span class="vt-stat-val">${cDef.name} (${cDef.categoryName || 'Hoa & Quả'})</span>
            </div>
            <div class="vt-stat-item">
              <span class="vt-stat-label">Trạng thái:</span>
              <span class="vt-stat-val vt-val-highlight">${st.state === 'ripe' ? farmIcon('sprout') + ' Đã chín' : (st.state === 'thirsty' ? farmIcon('droplet') + ' Cần tưới nước' : farmIcon('sprout') + ' Đang lớn')}</span>
            </div>
            <div class="vt-stat-item">
              <span class="vt-stat-label">Tiến độ sinh trưởng:</span>
              <span class="vt-stat-val">${Math.round(st.progress * 100)}%</span>
            </div>
            <div class="vt-stat-item">
              <span class="vt-stat-label">Số lần thu còn lại:</span>
              <span class="vt-stat-val">${crop.harvestsLeft !== undefined ? crop.harvestsLeft : cDef.maxHarvests} lần</span>
            </div>
          </div>

          <div class="vt-detail-actions-row">
            ${st.state === 'thirsty' ? `
              <button class="vt-btn-primary" id="vt-btn-modal-water">${farmIcon('droplet')} Tưới Nước</button>
            ` : ''}
            ${st.state === 'growing' && !isBoosted ? `
              <button class="vt-btn-primary" id="vt-btn-modal-call-name" style="background:#0284C7; border-color:#0369A1;">${farmIcon('mic')} Gọi Tên Cây (+10% tốc độ)</button>
            ` : ''}
            ${st.state === 'growing' && isBoosted ? `
              <span class="vt-badge-boosted" style="font-size:12px; color:#0369A1; background:#E0F2FE; padding:6px 10px; border-radius:999px; font-weight:600;">${farmIcon('sparkle')} Đã gọi tên GĐ ${st.stage} (+10%)</span>
            ` : ''}
            ${st.state === 'growing' ? `
              <button class="vt-btn-secondary" id="vt-btn-modal-fertilize">${farmIcon('flask')} Bón Phân (Còn ${farm.fertilizer || 0})</button>
            ` : ''}
            ${st.state === 'ripe' ? `
              <button class="vt-btn-primary" id="vt-btn-modal-harvest">${farmIcon('sprout')} Thu Hoạch Ngay</button>
            ` : ''}
            <button class="vt-btn-outline" id="vt-btn-modal-upgrade-pot">${farmIcon('star')} Nâng Cấp Chậu</button>
          </div>
        </div>
      `;
    } else {
      contentHTML = `
        <div class="vt-plant-detail-box">
          <p>Chậu này hiện đang trống chưa có hạt giống.</p>
          <div style="display:flex; gap:10px; justify-content:center; margin-top:16px;">
            <button class="vt-btn-primary" id="vt-btn-modal-sow">${farmIcon('sprout')} Gieo Hạt Giống</button>
            <button class="vt-btn-outline" id="vt-btn-modal-upgrade-pot">${farmIcon('star')} Nâng Cấp Chậu</button>
          </div>
        </div>
      `;
    }

    const modal = showModal(contentHTML, `${farmIcon('sprout')} Chi Tiết ${pot.type ? POT_TIERS[pot.type].fullName : 'Chậu'} ${pot.stars} Sao`);

    const btnAudio = modal.querySelector('#vt-btn-listen-pronounce');
    if (btnAudio && cDef) {
      btnAudio.onclick = () => speakText(cDef.hanzi);
    }
    const btnRecall = modal.querySelector('#vt-btn-modal-recall-quiz');
    if (btnRecall) {
      btnRecall.onclick = () => {
        closeModal();
        openWordRecallQuizModal(slotIndex);
      };
    }
    const btnCallName = modal.querySelector('#vt-btn-modal-call-name');
    if (btnCallName) {
      btnCallName.onclick = () => {
        closeModal();
        openNamePlantModal(slotIndex);
      };
    }
    const btnWater = modal.querySelector('#vt-btn-modal-water');
    if (btnWater) {
      btnWater.onclick = () => {
        closeModal();
        waterCrop(slotIndex);
      };
    }
    const btnFert = modal.querySelector('#vt-btn-modal-fertilize');
    if (btnFert) {
      btnFert.onclick = () => {
        closeModal();
        fertilizeCrop(slotIndex);
      };
    }
    const btnHarvest = modal.querySelector('#vt-btn-modal-harvest');
    if (btnHarvest) {
      btnHarvest.onclick = () => {
        closeModal();
        harvestCrop(slotIndex);
      };
    }
    const btnSow = modal.querySelector('#vt-btn-modal-sow');
    if (btnSow) {
      btnSow.onclick = () => {
        closeModal();
        openSeedBagModal(slotIndex);
      };
    }
    const btnUpPot = modal.querySelector('#vt-btn-modal-upgrade-pot');
    if (btnUpPot) {
      btnUpPot.onclick = () => {
        closeModal();
        openPotUpgradeModal(slotIndex);
      };
    }
  }

  /**
   * Modal 4b: GỌI TÊN CÂY THƯỜNG (Nói hoặc gõ pinyin -> Lớn nhanh 10%)
   */
  function openNamePlantModal(slotIndex) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const slot = farm.slots[slotIndex];
    if (!slot || !slot.pot || !slot.pot.crop) return;

    const crop = slot.pot.crop;
    const cDef = CROP_DEFS[crop.cropId] || CROP_DEFS.chrysanthemum;
    const hasMic = eco.checkMicSupport();

    const modal = showModal(`
      <div class="vt-name-plant-modal">
        <div class="vt-name-plant-preview" style="text-align:center; margin-bottom:8px;">
          ${Sprites ? Sprites.renderPlantSVG(crop.cropId, 2, false, false, 80, 85) : farmIcon('sprout')}
        </div>
        <div style="font-weight:700; font-size:18px; color:#1E293B; text-align:center;">${cDef.name} (${cDef.hanzi})</div>
        <p class="vt-modal-subtext" style="text-align:center;">Gọi đúng tên tiếng Trung (nói qua micro hoặc gõ pinyin) để kích thích cây <strong>lớn nhanh hơn 10%</strong>!</p>

        <div class="vt-name-plant-input-box" style="margin-top:14px; text-align:center;">
          <input type="text" id="vt-input-plant-pinyin" placeholder="Gõ pinyin chuẩn (vd: ${cDef.pinyin})..." class="vt-input-pinyin" style="width:80%; max-width:280px; padding:8px 12px; border-radius:8px; border:1px solid #CBD5E1; font-size:14px;" />
          <div style="display:flex; gap:8px; justify-content:center; margin-top:10px;">
            <button class="vt-btn-primary" id="vt-btn-confirm-name">Xác nhận gọi tên</button>
            ${hasMic ? `<button class="vt-btn-secondary" id="vt-btn-mic-name">${farmIcon('mic')} Nói tên cây</button>` : ''}
          </div>
        </div>

        <div id="vt-name-feedback" style="display:none; margin-top:12px;"></div>
      </div>
    `, `${farmIcon('mic')} Gọi Tên Cây: ${cDef.name}`);

    const inputPinyin = modal.querySelector('#vt-input-plant-pinyin');
    const btnConfirm = modal.querySelector('#vt-btn-confirm-name');
    const btnMic = modal.querySelector('#vt-btn-mic-name');
    const feedbackBox = modal.querySelector('#vt-name-feedback');

    function checkAnswer(valOrTranscripts) {
      const res = boostPlantByName(slotIndex, valOrTranscripts);
      if (res.success) {
        playChime(true);
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div class="vt-feedback-box is-success" style="background:#ECFDF5; border:1px solid #6EE7B7; border-radius:8px; padding:10px; margin-top:10px;">
            <div style="font-weight:700; font-size:15px; color:#065F46;">${farmIcon('check-circle')} CHÍNH XÁC!</div>
            <div style="font-size:13px; color:#047857; margin-top:4px;">
              Bạn đã gọi đúng tên ${cDef.name} (${cDef.hanzi} - ${cDef.pinyin})! Cây đã được tăng tốc lớn nhanh 10%! ${farmIcon('zap')}
            </div>
            <button class="vt-btn-primary" id="vt-btn-name-done" style="margin-top:10px;">Tuyệt vời</button>
          </div>
        `;
        const btnDone = modal.querySelector('#vt-btn-name-done');
        if (btnDone) btnDone.onclick = () => {
          closeModal();
          refreshTiersView();
          updateHUDValues();
        };
      } else {
        playChime(false);
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div class="vt-feedback-box is-danger" style="background:#FEF2F2; border:1px solid #FECACA; border-radius:8px; padding:10px; margin-top:10px;">
            <div style="font-weight:700; font-size:14px; color:#991B1B;">${farmIcon('x')} Chưa chính xác rồi!</div>
            <div style="font-size:12px; color:#7F1D1D; margin-top:4px;">
              Gợi ý: Pinyin chuẩn của ${cDef.name} là <strong>${cDef.pinyin}</strong>. Hãy thử lại nhé!
            </div>
          </div>
        `;
      }
    }

    if (btnConfirm && inputPinyin) {
      btnConfirm.onclick = () => checkAnswer(inputPinyin.value);
      inputPinyin.onkeydown = (e) => {
        if (e.key === 'Enter') checkAnswer(inputPinyin.value);
      };
    }

    if (btnMic) {
      btnMic.onclick = () => {
        btnMic.innerHTML = `${farmIcon('mic')} Đang nghe...`;
        btnMic.classList.add('is-listening');
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) {
          eco.showToast('Microphone không được hỗ trợ!');
          btnMic.innerHTML = `${farmIcon('mic')} Nói tên cây`;
          return;
        }
        try {
          const rec = new SpeechRec();
          rec.lang = 'zh-CN';
          rec.maxAlternatives = 3;
          rec.onresult = (e) => {
            btnMic.innerHTML = `${farmIcon('mic')} Nói tên cây`;
            btnMic.classList.remove('is-listening');
            const transcripts = [];
            for (let i = 0; i < e.results[0].length; i++) {
              transcripts.push(e.results[0][i].transcript);
            }
            checkAnswer(transcripts);
          };
          rec.onerror = () => {
            btnMic.innerHTML = `${farmIcon('mic')} Nói tên cây`;
            btnMic.classList.remove('is-listening');
            eco.showToast('Không nghe rõ, hãy thử lại hoặc gõ pinyin.');
          };
          rec.start();
        } catch (_) {
          btnMic.innerHTML = `${farmIcon('mic')} Nói tên cây`;
          btnMic.classList.remove('is-listening');
        }
      };
    }
  }

  /**
   * Modal 4c: CÂU HỎI NHỚ LẠI CÂY TỪ (SRS Recall Quiz)
   */
  function openWordRecallQuizModal(slotIndex, onNext) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const slot = farm.slots[slotIndex];
    if (!slot || !slot.pot || !slot.pot.crop || !slot.pot.crop.isWordTree) {
      if (typeof onNext === 'function') onNext();
      return;
    }

    const crop = slot.pot.crop;
    const hanzi = crop.wordHanzi;
    const wordData = crop.wordData || resolveWordInfo(hanzi);
    const helpers = getSpeechHelpers();
    const hasMic = eco.checkMicSupport();

    speakText(hanzi);

    // Chuẩn bị 3 đáp án nhiễu
    const dict = getHsk1Words();
    const dictKeys = Object.keys(dict || {}).filter(k => k !== hanzi);
    const distractors = [];
    while (distractors.length < 3 && dictKeys.length > 0) {
      const rIdx = Math.floor(Math.random() * dictKeys.length);
      const k = dictKeys.splice(rIdx, 1)[0];
      const dInfo = resolveWordInfo(k);
      if (dInfo && dInfo.vi && dInfo.vi !== wordData.vi && !distractors.includes(dInfo.vi)) {
        distractors.push(dInfo.vi);
      }
    }
    while (distractors.length < 3) {
      const b = BACKUP_VOCAB[Math.floor(Math.random() * BACKUP_VOCAB.length)];
      if (b && b.vi !== wordData.vi && !distractors.includes(b.vi)) {
        distractors.push(b.vi);
      }
    }

    const options = [wordData.vi, ...distractors].sort(() => 0.5 - Math.random());
    let optionsHTML = '';
    options.forEach((opt, idx) => {
      optionsHTML += `
        <button class="vt-quiz-opt-btn vt-word-opt-btn" data-option="${opt}">
          ${String.fromCharCode(65 + idx)}. ${opt}
        </button>
      `;
    });

    const modal = showModal(`
      <div class="vt-word-recall-modal">
        <div class="vt-recall-badge" style="display:inline-block; padding:4px 12px; background:#ECFDF5; color:#047857; font-weight:700; border-radius:999px; margin-bottom:10px; font-size:13px;">${farmIcon('book-open')} Giai đoạn ${crop.stage || 1} / 4</div>
        <p class="vt-quiz-prompt" style="font-size:14px; color:#334155; margin-bottom:12px;">Cây Từ đang "khát chữ"! Hãy nhớ lại và chọn đúng nghĩa tiếng Việt để giúp cây phát triển:</p>

        <div class="vt-quiz-word-card" style="text-align:center; padding:16px; background:#F8FAFC; border-radius:12px; border:1px solid #E2E8F0; margin-bottom:16px;">
          <div class="vt-quiz-hanzi" style="font-size:46px; font-weight:900; color:#047857;">${hanzi}</div>
          <div class="vt-quiz-pinyin" id="vt-recall-pinyin" style="color:#065F46; font-size:16px; margin:4px 0 8px;">${wordData.py}</div>
          <button class="vt-btn-listen-small" id="vt-btn-recall-speech" title="Nghe lại phát âm">${farmIcon('volume')} Nghe phát âm</button>
        </div>

        <div class="vt-quiz-options-list">
          ${optionsHTML}
        </div>

        <!-- Tùy chọn gõ Pinyin hoặc đọc mic -->
        <div class="vt-recall-alt-box" style="margin-top:14px; padding:10px; background:#F1F5F9; border-radius:8px; text-align:center;">
          <div style="font-size:12px; color:#64748B; margin-bottom:6px;">Hoặc gõ Pinyin / Đọc to qua Mic:</div>
          <div style="display:flex; gap:6px; justify-content:center; flex-wrap:wrap;">
            <input type="text" id="vt-input-recall-pinyin" placeholder="Gõ pinyin..." class="vt-input-pinyin" style="padding:6px 10px; border-radius:6px; border:1px solid #CBD5E1; font-size:13px; width:150px;" />
            <button class="vt-btn-primary" id="vt-btn-check-pinyin" style="padding:6px 12px; font-size:13px;">Kiểm tra</button>
            ${hasMic ? `<button class="vt-btn-secondary" id="vt-btn-mic-read" title="Đọc to qua microphone">${farmIcon('mic')} Đọc</button>` : ''}
          </div>
        </div>

        <div id="vt-recall-feedback" style="display:none; margin-top:14px;"></div>
      </div>
    `, `${farmIcon('book-open')} Cây Từ Khát Chữ — Ôn Tập Ngắt Quãng`);

    const btnSpeech = modal.querySelector('#vt-btn-recall-speech');
    if (btnSpeech) btnSpeech.onclick = () => speakText(hanzi);

    const feedbackBox = modal.querySelector('#vt-recall-feedback');

    function handleResult(isCorrect) {
      const res = reviewWordTree(slot, isCorrect);
      playChime(isCorrect);
      modal.querySelectorAll('.vt-word-opt-btn').forEach(b => {
        b.disabled = true;
        if (b.dataset.option === wordData.vi) {
          b.classList.add('is-correct');
        } else if (!isCorrect && b.classList.contains('is-clicked')) {
          b.classList.add('is-wrong');
        }
      });

      if (isCorrect) {
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div class="vt-feedback-box is-success" style="background:#ECFDF5; border:1px solid #6EE7B7; border-radius:8px; padding:12px;">
            <div style="font-weight:700; font-size:15px; color:#065F46;">${farmIcon('check-circle')} CHÍNH XÁC!</div>
            <div style="font-size:13px; color:#047857; margin-top:4px;">
              ${res.isRipe ? `${farmIcon('sparkle')} Tuyệt vời! Bạn đã nhớ từ qua 4 lần ôn ngắt quãng! Cây đã kết "Quả Tri Thức" sẵn sàng thu hoạch!` : `${farmIcon('sprout')} Cây Từ đã lớn lên Giai đoạn ${res.stage}/4! Khoảng ôn kế tiếp đã được tăng lên.`}
            </div>
            <button class="vt-btn-primary" id="vt-btn-recall-continue" style="margin-top:10px;">${typeof onNext === 'function' ? 'Tiếp tục cây kế tiếp ' + farmIcon('arrow-right') + '' : 'Hoàn thành'}</button>
          </div>
        `;
      } else {
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div class="vt-feedback-box is-danger" style="background:#FEF2F2; border:1px solid #FECACA; border-radius:8px; padding:12px;">
            <div style="font-weight:700; font-size:15px; color:#991B1B;">${farmIcon('x')} CHƯA CHÍNH XÁC!</div>
            <div style="font-size:13px; color:#7F1D1D; margin-top:4px;">
              Đáp án đúng: <strong>${wordData.vi}</strong> (${wordData.py})<br/>
              ${wordData.ex ? `Ví dụ: <em>${wordData.ex.zh}</em> — ${wordData.ex.vi}<br/>` : ''}
              Khoảng ôn tập đã được rút ngắn và từ vựng đã được lưu vào Sổ từ khó để ôn lại.
            </div>
            <button class="vt-btn-primary" id="vt-btn-recall-continue" style="margin-top:10px;">${typeof onNext === 'function' ? 'Tiếp tục ' + farmIcon('arrow-right') + '' : 'Đã hiểu'}</button>
          </div>
        `;
      }

      const btnContinue = modal.querySelector('#vt-btn-recall-continue');
      if (btnContinue) {
        btnContinue.onclick = () => {
          closeModal();
          refreshTiersView();
          updateHUDValues();
          if (typeof onNext === 'function') onNext();
        };
      }
    }

    modal.querySelectorAll('.vt-word-opt-btn').forEach(btn => {
      btn.onclick = () => {
        btn.classList.add('is-clicked');
        const chosen = btn.dataset.option;
        handleResult(chosen === wordData.vi);
      };
    });

    const inputPinyin = modal.querySelector('#vt-input-recall-pinyin');
    const btnCheckPinyin = modal.querySelector('#vt-btn-check-pinyin');
    if (btnCheckPinyin && inputPinyin) {
      btnCheckPinyin.onclick = () => {
        const val = inputPinyin.value.trim().toLowerCase().replace(/[\s\p{P}]/gu, '');
        const targetPy = (wordData.py || '').toLowerCase().replace(/[\s\p{P}]/gu, '');
        const stripTone = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ü/g, 'v');
        const isCorrect = (val === targetPy || stripTone(val) === stripTone(targetPy));
        handleResult(isCorrect);
      };
      inputPinyin.onkeydown = (e) => {
        if (e.key === 'Enter') btnCheckPinyin.click();
      };
    }

    const btnMic = modal.querySelector('#vt-btn-mic-read');
    if (btnMic) {
      btnMic.onclick = () => {
        btnMic.innerHTML = `${farmIcon('mic')} Đang nghe...`;
        btnMic.classList.add('is-listening');
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) {
          eco.showToast('Microphone không được hỗ trợ trên trình duyệt này!');
          btnMic.innerHTML = `${farmIcon('mic')} Đọc`;
          return;
        }
        try {
          const rec = new SpeechRec();
          rec.lang = 'zh-CN';
          rec.maxAlternatives = 3;
          rec.onresult = (e) => {
            btnMic.innerHTML = `${farmIcon('mic')} Đọc`;
            btnMic.classList.remove('is-listening');
            const transcripts = [];
            for (let i = 0; i < e.results[0].length; i++) {
              transcripts.push(e.results[0][i].transcript);
            }
            const res = helpers.scoreRecognition(hanzi, transcripts);
            handleResult(res.score >= 0.7);
          };
          rec.onerror = () => {
            btnMic.innerHTML = `${farmIcon('mic')} Đọc`;
            btnMic.classList.remove('is-listening');
            eco.showToast('Không nhận diện được giọng nói, vui lòng thử lại hoặc chọn đáp án.');
          };
          rec.start();
        } catch (_) {
          btnMic.innerHTML = `${farmIcon('mic')} Đọc`;
          btnMic.classList.remove('is-listening');
        }
      };
    }
  }

  /**
   * Modal 4d: SỔ TỪ VƯỜN (Garden Wordbook / Lexicon)
   */
  function openGardenWordbookModal(initialFilter = 'all') {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const now = Date.now();

    if (!farm.wordbook) farm.wordbook = {};

    const entries = Object.values(farm.wordbook);

    // Tính toán liveStatus cho từng từ
    entries.forEach(item => {
      if (item.isWordTree) {
        const slot = (farm.slots || []).find(s => s && s.pot && s.pot.crop && s.pot.crop.isWordTree && s.pot.crop.wordHanzi === item.hanzi);
        if (slot) {
          item.slotIndex = slot.slotIndex;
          const st = plotStatus(slot, now);
          if (st.state === 'ripe') {
            item.liveStatus = 'ripe';
          } else if (st.isWordDue || now >= (slot.pot.crop.dueAt || 0)) {
            item.liveStatus = 'due';
          } else {
            item.liveStatus = 'growing';
          }
          item.stage = slot.pot.crop.stage || 1;
        } else {
          item.liveStatus = 'mastered';
          item.slotIndex = null;
        }
      } else {
        item.liveStatus = 'mastered';
      }
    });

    const countGrowing = entries.filter(e => e.liveStatus === 'growing').length;
    const countDue = entries.filter(e => e.liveStatus === 'due' || e.liveStatus === 'ripe').length;
    const countMastered = entries.filter(e => e.liveStatus === 'mastered').length;
    const totalCount = entries.length;

    let curFilter = initialFilter;

    function renderModalContent() {
      const filtered = entries.filter(e => {
        if (curFilter === 'growing') return e.liveStatus === 'growing';
        if (curFilter === 'due') return e.liveStatus === 'due' || e.liveStatus === 'ripe';
        if (curFilter === 'mastered') return e.liveStatus === 'mastered';
        return true;
      });

      let listHTML = '';
      if (filtered.length === 0) {
        listHTML = `
          <div class="vt-empty-wb-notice" style="text-align:center; padding:30px 15px; color:#64748B;">
            <span style="font-size:36px; display:block; margin-bottom:8px;">${farmIcon('book-open', { size: 36 })}</span>
            <div style="font-weight:700; color:#1E293B; margin-bottom:4px;">Chưa có từ vựng nào trong mục này</div>
            <p style="font-size:13px; color:#64748B;">Hãy gieo Cây Từ từ các bài học đã xong hoặc thu hoạch cây nông sản để làm dày thêm Sổ Từ Vườn nhé!</p>
          </div>
        `;
      } else {
        filtered.forEach(w => {
          let badgeHTML = '';
          if (w.liveStatus === 'growing') {
            badgeHTML = `<span class="vt-wb-badge is-growing">${farmIcon('sprout')} Đang lớn (GĐ ${w.stage || 1}/4)</span>`;
          } else if (w.liveStatus === 'due') {
            badgeHTML = `<span class="vt-wb-badge is-due">${farmIcon('clock')} Tới hạn ôn!</span>`;
          } else if (w.liveStatus === 'ripe') {
            badgeHTML = `<span class="vt-wb-badge is-ripe">${farmIcon('sparkle')} Chín mọng!</span>`;
          } else {
            badgeHTML = `<span class="vt-wb-badge is-mastered">${farmIcon('star')} Đã thuộc</span>`;
          }

          let actionBtn = '';
          if (w.liveStatus === 'due' && w.slotIndex !== null) {
            actionBtn = `<button class="vt-btn-wb-quiz" data-slot="${w.slotIndex}">Ôn ngay</button>`;
          } else if (w.liveStatus === 'ripe' && w.slotIndex !== null) {
            actionBtn = `<button class="vt-btn-wb-harvest" data-slot="${w.slotIndex}">Hái quả</button>`;
          }

          const previewSVG = Sprites ? Sprites.renderPlantSVG(w.isNormalCrop ? w.id : 'word_tree', w.stage || 4, false, false, 55, 60, w.hanzi) : farmIcon('sprout');

          listHTML += `
            <div class="vt-wb-card ${w.liveStatus === 'due' ? 'has-glow' : ''}">
              <div class="vt-wb-preview">
                ${previewSVG}
              </div>
              <div class="vt-wb-body">
                <div class="vt-wb-header-row">
                  <span class="vt-wb-hanzi">${w.hanzi}</span>
                  <span class="vt-wb-pinyin">${w.pinyin || ''}</span>
                  ${w.hanViet ? `<span class="vt-wb-hv">[${w.hanViet}]</span>` : ''}
                  <button class="vt-btn-wb-audio" data-hanzi="${w.hanzi}" title="Nghe phát âm">${farmIcon('volume', { size: 16 })}</button>
                </div>
                <div class="vt-wb-meaning">${w.meaning || ''}</div>
                ${w.example ? `
                  <div class="vt-wb-example" title="Câu ví dụ">
                    <span class="vt-ex-zh">${w.example.zh}</span>
                    <span class="vt-ex-vi">${w.example.vi}</span>
                  </div>
                ` : ''}
              </div>
              <div class="vt-wb-status-col">
                ${badgeHTML}
                ${actionBtn}
              </div>
            </div>
          `;
        });
      }

      return `
        <div class="vt-wordbook-modal">
          <div class="vt-wb-top-bar">
            <div class="vt-wb-tabs">
              <button class="vt-wb-tab ${curFilter === 'all' ? 'is-active' : ''}" data-filter="all">Tất cả (${totalCount})</button>
              <button class="vt-wb-tab ${curFilter === 'growing' ? 'is-active' : ''}" data-filter="growing">${farmIcon('sprout')} Đang lớn (${countGrowing})</button>
              <button class="vt-wb-tab ${curFilter === 'due' ? 'is-active' : ''}" data-filter="due">${farmIcon('clock')} Tới hạn ôn (${countDue})</button>
              <button class="vt-wb-tab ${curFilter === 'mastered' ? 'is-active' : ''}" data-filter="mastered">${farmIcon('star')} Đã thuộc (${countMastered})</button>
            </div>
            <div class="vt-wb-action-wrap">
              <button class="vt-btn-review-due ${countDue === 0 ? 'is-disabled' : ''}" id="vt-btn-review-all-due" ${countDue === 0 ? 'disabled' : ''}>
                ${farmIcon('bell')} Ôn các cây tới hạn (${countDue})
              </button>
            </div>
          </div>
          <div class="vt-wb-list">
            ${listHTML}
          </div>
        </div>
      `;
    }

    const modal = showModal(renderModalContent(), `${farmIcon('book-open')} Sổ Từ Vườn Treo Tri Thức`);

    function attachListeners() {
      modal.querySelectorAll('.vt-wb-tab').forEach(tBtn => {
        tBtn.onclick = () => {
          curFilter = tBtn.dataset.filter;
          const body = modal.querySelector('.vt-modal-body');
          if (body) {
            body.innerHTML = renderModalContent();
            attachListeners();
          }
        };
      });

      modal.querySelectorAll('.vt-btn-wb-audio').forEach(btn => {
        btn.onclick = () => speakText(btn.dataset.hanzi);
      });

      modal.querySelectorAll('.vt-btn-wb-quiz').forEach(btn => {
        btn.onclick = () => {
          const sIdx = Number(btn.dataset.slot);
          closeModal();
          openWordRecallQuizModal(sIdx, () => openGardenWordbookModal('due'));
        };
      });

      modal.querySelectorAll('.vt-btn-wb-harvest').forEach(btn => {
        btn.onclick = () => {
          const sIdx = Number(btn.dataset.slot);
          harvestCrop(sIdx);
          closeModal();
          openGardenWordbookModal('all');
        };
      });

      const btnReviewAll = modal.querySelector('#vt-btn-review-all-due');
      if (btnReviewAll) {
        btnReviewAll.onclick = () => {
          const dueSlots = [];
          (farm.slots || []).forEach(s => {
            if (s && s.pot && s.pot.crop && s.pot.crop.isWordTree) {
              if (now >= (s.pot.crop.dueAt || 0) && !s.pot.crop.isRipe) {
                dueSlots.push(s.slotIndex);
              }
            }
          });

          if (dueSlots.length === 0) {
            eco.showToast('Không có cây nào tới hạn ôn tập!');
            return;
          }

          closeModal();

          function runQueue(queue) {
            if (queue.length === 0) {
              eco.showToast(`${farmIcon('party-popper')} Bạn đã hoàn thành tất cả các lượt ôn tập tới hạn!`);
              openGardenWordbookModal('all');
              return;
            }
            openWordRecallQuizModal(queue[0], () => runQueue(queue.slice(1)));
          }

          runQueue(dueSlots);
        };
      }
    }

    attachListeners();
  }

  /**
   * Modal 5: NÂNG CẤP CHẬU (Pot Upgrade Card with Before/After Stats & Materials)
   */
  function openPotUpgradeModal(slotIndex) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const slot = farm.slots[slotIndex];
    if (!slot || !slot.pot) return;

    const pot = slot.pot;
    const tier = POT_TIERS[pot.type] || POT_TIERS.clay;
    const currentStars = pot.stars || 1;

    const isMaxTierAndStar = (pot.type === 'gold' && currentStars >= 5);

    // Xác định cấp kế tiếp: lên sao hoặc đột phá sang hạng sau
    let nextTierId = pot.type;
    let nextStars = currentStars + 1;
    let costCoins = 50;
    let requiredMaterials = { clay: 2 };
    let successRate = 0.85;
    let isEvolve = false;

    if (currentStars >= 5) {
      if (tier.nextTier) {
        isEvolve = true;
        nextTierId = tier.nextTier;
        nextStars = 1;
        costCoins = tier.evolveCostCoins || 300;
        requiredMaterials = tier.evolveMat || { clay: 5 };
        successRate = tier.evolveRate || 0.60;
      }
    } else {
      const up = tier.upgrades[currentStars]; // Nâng lên sao tiếp theo
      if (up) {
        costCoins = up.costCoins || 50;
        requiredMaterials = up.mat || { clay: 2 };
        successRate = up.rate || 0.80;
      }
    }

    // Chỉ số hiện tại vs Chỉ số sau khi nâng cấp
    const curStats = (tier.upgrades && tier.upgrades[currentStars - 1]) || { speed: 0, yieldBonus: 0, xpBonus: 0, doubleChance: 0 };
    const nextTierObj = POT_TIERS[nextTierId] || tier;
    const nextStats = (nextTierObj.upgrades && nextTierObj.upgrades[nextStars - 1]) || { speed: 0, yieldBonus: 0, xpBonus: 0, doubleChance: 0 };

    // Kiểm tra đủ nguyên liệu & xu
    const canAffordCoins = (state.coins || 0) >= costCoins;
    let canAffordMaterials = true;
    const matNames = { clay: 'Đất sét', glaze: 'Men gốm', jadePowder: 'Bột ngọc', goldLeaf: 'Vàng lá' };

    let materialsListHTML = '';
    Object.entries(requiredMaterials).forEach(([mKey, needed]) => {
      const owned = (farm.materials && farm.materials[mKey]) || 0;
      if (owned < needed) canAffordMaterials = false;
      materialsListHTML += `
        <div class="vt-req-mat-chip ${owned < needed ? 'is-lacking' : ''}">
          <span class="vt-req-mat-name">${matNames[mKey] || mKey}:</span>
          <span class="vt-req-mat-count">${owned} / ${needed}</span>
        </div>
      `;
    });

    const modal = showModal(`
      <div class="vt-upgrade-modal-card">
        <!-- So sánh trước và sau khi nâng cấp -->
        <div class="vt-upgrade-compare-row">
          <div class="vt-upgrade-side vt-side-before">
            <div class="vt-upgrade-preview">
              ${Sprites ? Sprites.renderPotSVG(pot.type, currentStars, 85, 55, 'happy') : ''}
            </div>
            <div class="vt-upgrade-side-title">${tier.fullName}</div>
            <div class="vt-upgrade-stars-cur">${farmIcon('star', { className: 'vt-icon-star' }).repeat(currentStars)}</div>
          </div>

          <div class="vt-upgrade-arrow">${farmIcon('arrow-right')}</div>

          <div class="vt-upgrade-side vt-side-after">
            <div class="vt-upgrade-preview">
              ${Sprites ? Sprites.renderPotSVG(nextTierId, nextStars, 85, 55, 'ripe') : ''}
            </div>
            <div class="vt-upgrade-side-title">${nextTierObj.fullName}</div>
            <div class="vt-upgrade-stars-next">${farmIcon('star', { className: 'vt-icon-star' }).repeat(nextStars)}</div>
          </div>
        </div>

        <!-- Bảng chỉ số thay đổi rõ ràng -->
        <div class="vt-upgrade-stats-table">
          <div class="vt-up-row">
            <span>${farmIcon('hourglass')} Giảm thời gian lớn:</span>
            <span class="vt-up-val">-${Math.round((curStats.speed || 0) * 100)}% ${farmIcon('arrow-right')} <strong>-${Math.round((nextStats.speed || 0) * 100)}%</strong></span>
          </div>
          <div class="vt-up-row">
            <span>${farmIcon('sprout')} Tăng sản lượng:</span>
            <span class="vt-up-val">+${Math.round((curStats.yieldBonus || 0) * 100)}% ${farmIcon('arrow-right')} <strong>+${Math.round((nextStats.yieldBonus || 0) * 100)}%</strong></span>
          </div>
          <div class="vt-up-row">
            <span>${farmIcon('star')} Tăng kinh nghiệm:</span>
            <span class="vt-up-val">+${Math.round((curStats.xpBonus || 0) * 100)}% ${farmIcon('arrow-right')} <strong>+${Math.round((nextStats.xpBonus || 0) * 100)}%</strong></span>
          </div>
          <div class="vt-up-row">
            <span>${farmIcon('sparkle')} Tỉ lệ x2 thu hoạch:</span>
            <span class="vt-up-val">${Math.round((curStats.doubleChance || 0) * 100)}% ${farmIcon('arrow-right')} <strong>${Math.round((nextStats.doubleChance || 0) * 100)}%</strong></span>
          </div>
        </div>

        <!-- Yêu cầu chi phí & tỉ lệ thành công -->
        <div class="vt-upgrade-cost-box">
          <div class="vt-cost-heading">Nguyên liệu cần thiết:</div>
          <div class="vt-materials-req-list">
            ${materialsListHTML}
          </div>
          <div class="vt-cost-coins-line">
            Phí gia công: ${farmIcon('coin', { className: 'vt-icon-coin' })} <strong>${costCoins} xu</strong> (Hiện có: ${state.coins || 0} xu)
          </div>
          <div class="vt-success-rate-line">
            ${farmIcon('target')} Tỉ lệ thành công: <strong style="color:#16a34a;">${Math.round(successRate * 100)}%</strong>
          </div>
          <div class="vt-upgrade-safe-note">
            ${farmIcon('shield')} An toàn: Thất bại không mất chậu, chỉ tiêu hao nguyên liệu và xu.
          </div>
        </div>

        <!-- Nút bấm nâng cấp -->
        <div class="vt-upgrade-btn-wrap">
          ${isMaxTierAndStar ? `
            <button class="vt-btn-primary is-disabled">Đã Đạt Cấp Tối Đa</button>
          ` : `
            <button class="vt-btn-primary ${(!canAffordCoins || !canAffordMaterials) ? 'is-disabled' : ''}" id="vt-btn-execute-upgrade">
              ${farmIcon('sparkle')} Nâng Cấp Ngay
            </button>
          `}
        </div>
      </div>
    `, isEvolve ? `${farmIcon('sparkle')} Đột Phá Hạng Chậu Mới` : `${farmIcon('star')} Nâng Cấp Sao Chậu`);

    const btnExec = modal.querySelector('#vt-btn-execute-upgrade');
    if (btnExec && !isMaxTierAndStar) {
      btnExec.onclick = () => {
        executePotUpgrade(slotIndex, nextTierId, nextStars, costCoins, requiredMaterials, successRate);
      };
    }
  }

  /**
   * Thực hiện nâng cấp chậu (có tỉ lệ thành công / thất bại)
   */
  function executePotUpgrade(slotIndex, nextTierId, nextStars, costCoins, reqMaterials, successRate) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const slot = farm.slots[slotIndex];
    if (!slot || !slot.pot) return;

    if (!eco.spend(costCoins)) {
      eco.showToast(`${farmIcon('alert')} Không đủ xu để nâng cấp!`);
      return;
    }

    // Trừ vật liệu
    Object.entries(reqMaterials).forEach(([mKey, count]) => {
      farm.materials[mKey] = Math.max(0, (farm.materials[mKey] || 0) - count);
    });

    const isSuccess = Math.random() < successRate;

    if (isSuccess) {
      slot.pot.type = nextTierId;
      slot.pot.stars = nextStars;
      eco.saveState();
      playChime(true);
      showUpgradeAnimation(true);
      eco.showToast(`${farmIcon('party-popper')} Nâng cấp thành công! Chậu đạt ${POT_TIERS[nextTierId].fullName} ${nextStars} Sao!`);
    } else {
      eco.saveState();
      playChime(false);
      showUpgradeAnimation(false);
      eco.showToast(`${farmIcon('info')} Rất tiếc, lần nâng cấp này chưa thành công! Chậu vẫn nguyên vẹn.`);
    }

    closeModal();
    refreshTiersView();
    updateHUDValues();
  }

  /**
   * Hoạt ảnh nâng cấp chậu thành công / thất bại
   */
  function showUpgradeAnimation(isSuccess) {
    if (typeof document === 'undefined') return;
    const splash = document.createElement('div');
    splash.className = 'vt-upgrade-fx-splash';
    splash.innerHTML = isSuccess ? `
      <div class="vt-fx-box vt-fx-success">
        <div class="vt-upgrade-star-ring">
          <span>${farmIcon('star')}</span><span>${farmIcon('sparkle')}</span><span>${farmIcon('star')}</span><span>${farmIcon('sparkle')}</span>
        </div>
        <div class="vt-fx-stars">${farmIcon('sparkle')} ${farmIcon('star')} ${farmIcon('sparkle')}</div>
        <div class="vt-fx-title">${farmIcon('party-popper')} NÂNG CẤP THÀNH CÔNG! ${farmIcon('party-popper')}</div>
      </div>
    ` : `
      <div class="vt-fx-box vt-fx-fail">
        <div class="vt-fx-stars">${farmIcon('cloud')}</div>
        <div class="vt-fx-title">CHƯA THÀNH CÔNG</div>
      </div>
    `;
    document.body.appendChild(splash);
    setTimeout(() => {
      if (splash.parentNode) splash.parentNode.removeChild(splash);
    }, 1500);
  }

  /**
   * Modal 6: BẮT SÂU ĐỐ VUI (Pest Catching Vocab Quiz)
   */
  function openPestQuizModal(slotIndex) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const slot = farm.slots[slotIndex];
    if (!slot || !slot.pot || !slot.pot.crop || !slot.pot.crop.pest) return;

    const quiz = slot.pot.crop.pest;
    speakText(quiz.hanzi);

    let optionsHTML = '';
    quiz.options.forEach((opt, idx) => {
      optionsHTML += `
        <button class="vt-quiz-opt-btn" data-option="${opt}">
          ${String.fromCharCode(65 + idx)}. ${opt}
        </button>
      `;
    });

    const modal = showModal(`
      <div class="vt-pest-quiz-modal">
        <div class="vt-pest-mascot">${farmIcon('bug', { size: 48 })}</div>
        <p class="vt-quiz-prompt">Chú sâu xanh đang gặm lá! Hãy chọn đúng nghĩa tiếng Việt để bắt sâu và nhận thưởng:</p>

        <div class="vt-quiz-word-card">
          <div class="vt-quiz-hanzi">${quiz.hanzi}</div>
          <div class="vt-quiz-pinyin">${quiz.pinyin}</div>
          <button class="vt-btn-listen-small" id="vt-btn-quiz-speech" title="Nghe lại phát âm">${farmIcon('volume')} Nghe phát âm</button>
        </div>

        <div class="vt-quiz-options-list">
          ${optionsHTML}
        </div>
      </div>
    `, `${farmIcon('bug')} Bắt Sâu Vui Học Tiếng Trung`);

    const btnSpeech = modal.querySelector('#vt-btn-quiz-speech');
    if (btnSpeech) {
      btnSpeech.onclick = () => speakText(quiz.hanzi);
    }

    modal.querySelectorAll('.vt-quiz-opt-btn').forEach(btn => {
      btn.onclick = () => {
        const chosen = btn.dataset.option;
        if (chosen === quiz.correctAnswer) {
          // Trả lời đúng!
          slot.pot.crop.pest = null;
          eco.earn('pest_caught', { coins: 15, xp: 10 });
          if (typeof eco.recordGardenAction === 'function') {
            eco.recordGardenAction('pest', 1);
          }
          playChime(true);
          eco.showToast(`${farmIcon('party-popper')} Chính xác! Đã bắt sâu thành công (+15 xu, +10 KN)!`);
          closeModal();
          refreshTiersView();
          updateHUDValues();
        } else {
          // Trả lời sai
          playChime(false);
          btn.classList.add('is-wrong');
          eco.showToast(`${farmIcon('x')} Chưa đúng rồi! Hãy thử nghe lại và chọn đáp án khác.`);
        }
      };
    });
  }

  /**
   * Modal 7: Kho Nông Sản & Bán Ở Chợ (Warehouse & Market)
   */
  function openWarehouseModal() {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const warehouse = farm.warehouse || { capacity: 50, items: {} };

    const totalCount = Object.values(warehouse.items || {}).reduce((a, b) => a + b, 0);
    const sellMultiplier = eco.sellPriceMultiplier();

    let itemsHTML = '';
    Object.entries(warehouse.items || {}).forEach(([cropId, count]) => {
      if (count <= 0) return;
      const cDef = CROP_DEFS[cropId] || { name: cropId, sellPrice: 10 };
      const singlePrice = Math.round(cDef.sellPrice * sellMultiplier);
      const allPrice = singlePrice * count;

      itemsHTML += `
        <div class="vt-warehouse-row">
          <div class="vt-wh-info">
            <span class="vt-wh-name">${cDef.name}</span>
            <span class="vt-wh-count">x${count}</span>
            <span class="vt-wh-single-price">(${farmIcon('coin', { className: 'vt-icon-coin', size: 13 })} ${singlePrice} xu/cái)</span>
          </div>
          <div class="vt-wh-actions">
            <button class="vt-btn-sm-sell" data-crop="${cropId}" data-amount="1">Bán 1 (${farmIcon('coin', { className: 'vt-icon-coin', size: 13 })} ${singlePrice})</button>
            <button class="vt-btn-sm-sell vt-btn-sell-all" data-crop="${cropId}" data-amount="${count}">Bán hết (${farmIcon('coin', { className: 'vt-icon-coin', size: 13 })} ${allPrice})</button>
          </div>
        </div>
      `;
    });

    if (!itemsHTML) {
      itemsHTML = '<p class="vt-empty-wh-note">Kho đang trống. Hãy thu hoạch cây trồng trên ban công để mang về kho!</p>';
    }

    const modal = showModal(`
      <div class="vt-warehouse-modal">
        <div class="vt-wh-capacity-banner">
          <span>${farmIcon('package')} Sức chứa kho: <strong>${totalCount} / ${warehouse.capacity}</strong></span>
          <button class="vt-btn-upgrade-wh" id="vt-btn-expand-warehouse" title="Mở rộng thêm 25 ô sức chứa">
            + Mở rộng kho (100 xu)
          </button>
        </div>

        <div class="vt-wh-items-list">
          ${itemsHTML}
        </div>
      </div>
    `, `${farmIcon('package')} Kho Nông Sản & Chợ Buôn`);

    modal.querySelectorAll('.vt-btn-sm-sell').forEach(btn => {
      btn.onclick = () => {
        const cropId = btn.dataset.crop;
        const amount = parseInt(btn.dataset.amount, 10);
        sellCropsFromWarehouse(cropId, amount);
        closeModal();
      };
    });

    const btnExpand = modal.querySelector('#vt-btn-expand-warehouse');
    if (btnExpand) {
      btnExpand.onclick = () => {
        if (!eco.spend(100)) {
          eco.showToast(`${farmIcon('alert')} Không đủ 100 xu để mở rộng kho!`);
          return;
        }
        warehouse.capacity += 25;
        eco.saveState();
        playChime(true);
        eco.showToast(`${farmIcon('party-popper')} Mở rộng kho thành công! Sức chứa mới: ${warehouse.capacity}`);
        closeModal();
        openWarehouseModal();
      };
    }
  }

  /**
   * Modal 7b: BẢNG NHIỆM VỤ NGÀY (Daily Quests & Chest)
   */
  function openQuestsModal() {
    const eco = getEconomy();
    if (!eco) return;
    const quests = (typeof eco.questStatus === 'function') ? eco.questStatus() : [];
    const state = eco.getState();
    const isChestClaimed = (state.today && state.today.dailyChestClaimed);
    const allQuestsClaimed = quests.length === 3 && quests.every(q => q.claimed);

    let questsHTML = '';
    quests.forEach((q, idx) => {
      const studyCur = (q.study && q.study.current) || 0;
      const studyTgt = (q.study && q.study.target) || 1;
      const studyPct = Math.min(100, Math.round((studyCur / studyTgt) * 100));

      const gardenCur = (q.garden && q.garden.current) || 0;
      const gardenTgt = (q.garden && q.garden.target) || 1;
      const gardenPct = Math.min(100, Math.round((gardenCur / gardenTgt) * 100));

      const rew = q.reward || {};
      const matNames = { clay: 'Đất sét', glaze: 'Men gốm', jadePowder: 'Bột ngọc', goldLeaf: 'Vàng lá' };
      const rewParts = [`${farmIcon('coin', { className: 'vt-icon-coin', size: 14 })} +${rew.coins || 0} xu`, `${farmIcon('droplet', { className: 'vt-icon-water', size: 14 })} +${rew.water || 0} nước`];
      if (rew.fertilizer) rewParts.push(`${farmIcon('flask', { size: 14 })} +${rew.fertilizer} phân bón`);
      if (rew.materials) {
        Object.entries(rew.materials).forEach(([m, count]) => {
          rewParts.push(`${farmIcon('layers', { size: 14 })} +${count} ${matNames[m] || m}`);
        });
      }

      questsHTML += `
        <div class="vt-quest-card ${q.completed ? 'is-completed' : ''} ${q.claimed ? 'is-claimed' : ''}">
          <div class="vt-quest-header">
            <span class="vt-quest-idx">Nhiệm vụ #${idx + 1}</span>
            <span class="vt-quest-reward-tag">${rewParts.join(' · ')}</span>
          </div>

          <!-- Phần 1: Học tập -->
          <div class="vt-quest-part vt-quest-study">
            <div class="vt-quest-part-header">
              <span class="vt-part-tag vt-tag-study">${farmIcon('book-open', { size: 13 })} Học tập</span>
              <span class="vt-part-title">${q.study ? q.study.title : 'Học bài'}</span>
              <span class="vt-part-count">${studyCur}/${studyTgt}</span>
            </div>
            <div class="vt-quest-progress-bar">
              <div class="vt-progress-fill vt-fill-study" style="width: ${studyPct}%"></div>
            </div>
            ${q.study && !q.study.completed ? `
              <a href="${q.study.actionUrl || '#zh/learn'}" class="vt-btn-quest-go" onclick="closeModal()">
                ${q.study.actionText || 'Đi học ngay'} ${farmIcon('arrow-right')}
              </a>
            ` : `<span class="vt-part-done">${farmIcon('check')} Đạt yêu cầu học</span>`}
          </div>

          <!-- Phần 2: Nông trại -->
          <div class="vt-quest-part vt-quest-garden">
            <div class="vt-quest-part-header">
              <span class="vt-part-tag vt-tag-garden">${farmIcon('sprout', { size: 13 })} Vườn treo</span>
              <span class="vt-part-title">${q.garden ? q.garden.title : 'Làm vườn'}</span>
              <span class="vt-part-count">${gardenCur}/${gardenTgt}</span>
            </div>
            <div class="vt-quest-progress-bar">
              <div class="vt-progress-fill vt-fill-garden" style="width: ${gardenPct}%"></div>
            </div>
            ${q.garden && q.garden.completed ? `<span class="vt-part-done">${farmIcon('check')} Đạt yêu cầu vườn</span>` : `<span class="vt-part-pending">Đang thực hiện trong vườn</span>`}
          </div>

          <!-- Nút nhận thưởng -->
          <div class="vt-quest-action-row">
            ${q.claimed ? `
              <span class="vt-badge-claimed">${farmIcon('check')} Đã nhận thưởng</span>
            ` : q.completed ? `
              <button class="vt-btn-claim-quest" data-quest-id="${q.id}">
                ${farmIcon('gift')} Nhận Thưởng
              </button>
            ` : `
              <span class="vt-badge-inprogress">Chưa hoàn thành</span>
            `}
          </div>
        </div>
      `;
    });

    const chestHTML = `
      <div class="vt-daily-chest-box ${allQuestsClaimed ? 'is-ready' : 'is-locked'} ${isChestClaimed ? 'is-opened' : ''}">
        <div class="vt-chest-icon">${isChestClaimed ? farmIcon('inbox', { size: 36 }) : (allQuestsClaimed ? farmIcon('gift', { size: 36, className: 'vt-icon-chest' }) : farmIcon('lock', { size: 36 }))}</div>
        <div class="vt-chest-info">
          <div class="vt-chest-title">Rương Tri Thức Hằng Ngày</div>
          <div class="vt-chest-desc">
            ${isChestClaimed ? 'Đã mở hôm nay! Hẹn gặp lại bạn vào ngày mai.' :
              allQuestsClaimed ? 'Cả 3 nhiệm vụ đã hoàn thành! Bấm để mở rương nhận thưởng lớn & hạt giống hiếm!' :
              'Hoàn thành và nhận đủ 3 nhiệm vụ ngày để mở khóa Rương Tri Thức.'}
          </div>
        </div>
        <div class="vt-chest-action">
          ${isChestClaimed ? `
            <span class="vt-badge-claimed">Đã nhận</span>
          ` : allQuestsClaimed ? `
            <button class="vt-btn-open-chest" id="vt-btn-claim-daily-chest">
              Mở Rương ${farmIcon('gift', { size: 16 })}
            </button>
          ` : `
            <span class="vt-chest-locked-pill">Cần 3/3 xong</span>
          `}
        </div>
      </div>
    `;

    const modal = showModal(`
      <div class="vt-quests-modal-content">
        <p class="vt-modal-subtext">Hoàn thành cả phần học tập và vườn treo mỗi ngày để nhận quà và thắp sáng Cây Tri Thức:</p>
        <div class="vt-quests-list">
          ${questsHTML}
        </div>
        ${chestHTML}
      </div>
    `, `${farmIcon('target')} Bảng Nhiệm Vụ Ngày & Rương Thưởng`);

    modal.querySelectorAll('.vt-btn-claim-quest').forEach(btn => {
      btn.onclick = () => {
        const qid = btn.dataset.questId;
        if (eco.claimQuest(qid)) {
          playChime(true);
          updateHUDValues();
          updateQuestRedDot();
    updateWordDueDot();
          openQuestsModal();
        }
      };
    });

    const btnChest = modal.querySelector('#vt-btn-claim-daily-chest');
    if (btnChest) {
      btnChest.onclick = () => {
        const res = eco.claimDailyChest();
        if (res) {
          playChime(true);
          updateHUDValues();
          updateQuestRedDot();
    updateWordDueDot();
          openQuestsModal();
        }
      };
    }
  }

  /**
   * Modal 7c: CHUỖI NHIỆM VỤ CHÍNH - ĐÁNH THỨC CÂY TRI THỨC
   */
  function openTreeAwakeningModal() {
    const eco = getEconomy();
    if (!eco) return;
    const status = (typeof eco.getTreeAwakeningStatus === 'function') ? eco.getTreeAwakeningStatus() : { allQuests: [] };
    const cur = status.activeQuest;

    let stepsHTML = '';
    (status.allQuests || []).forEach(q => {
      stepsHTML += `
        <div class="vt-tree-step-card ${q.isCompleted ? 'is-completed' : ''} ${q.isClaimed ? 'is-claimed' : ''} ${!q.isUnlocked ? 'is-locked' : ''}">
          <div class="vt-tree-step-num">Bước ${q.step}</div>
          <div class="vt-tree-step-content">
            <div class="vt-tree-step-title">${q.title}</div>
            <div class="vt-tree-step-req">${q.reqText}</div>
          </div>
          <div class="vt-tree-step-status">
            ${q.isClaimed ? '<span class="vt-badge-claimed">' + farmIcon('check') + ' Đã nhận</span>' :
              q.isCompleted ? `<button class="vt-btn-claim-tree" data-step="${q.step}">Nhận quà</button>` :
              q.isUnlocked ? `<a href="#zh/learn" class="vt-btn-go-learn" onclick="closeModal()">Đi học</a>` :
              '<span class="vt-badge-locked">' + farmIcon('lock', { size: 12 }) + ' Khóa</span>'}
          </div>
        </div>
      `;
    });

    const modal = showModal(`
      <div class="vt-tree-awakening-modal">
        <div class="vt-fairy-story-banner">
          <div class="vt-story-fairy-avatar">
            ${Sprites ? Sprites.renderFairySVG('chinese', 2, false, 72) : farmIcon('sparkle')}
          </div>
          <div class="vt-story-speech-bubble">
            <div class="vt-story-speaker">Tiên Trúc dẫn chuyện:</div>
            <div class="vt-story-text">“${cur ? cur.story : 'Cây Tri Thức đã bừng sáng khắp muôn trùng mây!'}”</div>
          </div>
        </div>

        <h4 style="font-size:16px; color:#7A4B2A; margin:16px 0 8px 0; font-family:var(--vt-font-heading);">Lộ trình Đánh thức Cây Tri Thức (HSK1):</h4>
        <div class="vt-tree-steps-list">
          ${stepsHTML}
        </div>
      </div>
    `, `${farmIcon('sprout')} Chuỗi Nhiệm Vụ: Đánh Thức Cây Tri Thức`);

    modal.querySelectorAll('.vt-btn-claim-tree').forEach(btn => {
      btn.onclick = () => {
        const step = parseInt(btn.dataset.step, 10);
        if (eco.claimTreeAwakening(step)) {
          playChime(true);
          updateHUDValues();
          openTreeAwakeningModal();
        }
      };
    });
  }
  function sellCropsFromWarehouse(cropId, amount) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const warehouse = farm.warehouse;
    const current = (warehouse.items && warehouse.items[cropId]) || 0;
    if (current < amount) return;

    const cDef = CROP_DEFS[cropId] || { name: cropId, sellPrice: 10 };
    const sellMultiplier = eco.sellPriceMultiplier();
    const totalCoins = Math.round(cDef.sellPrice * sellMultiplier * amount);

    warehouse.items[cropId] -= amount;
    if (warehouse.items[cropId] <= 0) delete warehouse.items[cropId];

    eco.earn('crop_sold', { coins: totalCoins });
    playChime(true);
    eco.showToast(`${farmIcon('coin', { className: 'vt-icon-coin' })} Đã bán ${amount} ${cDef.name}, thu về ${totalCoins} xu!`);
    updateHUDValues();
  }

  /**
   * Modal 8: BẢNG ĐƠN HÀNG KHINH KHÍ CẦU (Balloon Orders)
   */
  function openOrdersModal() {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const orders = farm.orders || [];
    const warehouse = farm.warehouse || { items: {} };

    let ordersHTML = '';
    orders.forEach((ord, idx) => {
      const cDef = CROP_DEFS[ord.cropId] || { name: ord.cropId, hanzi: ord.cropId, pinyin: '', meaning: '' };
      const owned = (warehouse.items && warehouse.items[ord.cropId]) || 0;
      const canDeliver = owned >= ord.count && !ord.delivered;
      const matNames = { clay: 'Đất sét', glaze: 'Men gốm', jadePowder: 'Bột ngọc', goldLeaf: 'Vàng lá' };
      const custQuote = ord.customerQuote || '我想买一些新鲜的农产品！';

      const coinsStandard = ord.rewardCoins;
      const coinsBonus = Math.round(ord.rewardCoins * 1.5);
      const xpStandard = ord.rewardXp;
      const xpBonus = Math.round(ord.rewardXp * 1.5);

      const coinsToShow = ord.usedHint ? coinsStandard : coinsBonus;
      const xpToShow = ord.usedHint ? xpStandard : xpBonus;

      ordersHTML += `
        <div class="vt-order-card ${ord.delivered ? 'is-delivered' : ''}">
          <div class="vt-order-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <div class="vt-order-customer" style="display:flex; align-items:center; gap:8px;">
              <span class="vt-cust-avatar" style="display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px;">${(Sprites && typeof Sprites.renderNpcAvatarSVG === 'function') ? Sprites.renderNpcAvatarSVG(ord.npcId || ord.customer || ord.id || 'default', 40) : (ord.avatar || '')}</span>
              <span class="vt-cust-name" style="font-weight:700; color:#4A2B11;">${ord.customer}</span>
            </div>
            <div class="vt-cust-speech-wrap" style="display:flex; align-items:center; gap:6px;">
              <span class="vt-cust-quote" style="font-size:13px; font-style:italic; color:#5B3A1E; background:rgba(0,0,0,0.04); padding:3px 8px; border-radius:6px;">“${custQuote}”</span>
              <button type="button" class="vt-btn-speak-order" data-speech="${custQuote}" title="Nghe câu tiếng Trung của khách" style="background:#EEF2FF; border:1px solid #C7D2FE; border-radius:50%; width:28px; height:28px; cursor:pointer; font-size:13px; display:inline-flex; align-items:center; justify-content:center;">${farmIcon('volume')}</button>
            </div>
          </div>

          <div class="vt-order-requirement" style="background:#FFF9F0; border:1.5px dashed #D97706; border-radius:8px; padding:10px; margin-bottom:8px;">
            <div style="font-size:15px; color:#1E293B;">
              Cần: <strong style="font-size:18px; color:#B45309;">${ord.count}x</strong>
              <span class="vt-order-crop-hanzi" style="font-size:22px; font-weight:800; color:#DC2626; margin:0 4px; font-family:'Noto Serif SC', serif;">${cDef.hanzi || cDef.name}</span>
              <span style="font-size:13px; color:#64748B;">(Kho có: ${owned})</span>
            </div>
            <div class="vt-order-hint-row" style="margin-top:6px; font-size:13px;">
              ${ord.usedHint ? `
                <div class="vt-hint-revealed" style="color:#059669; font-weight:600;">
                  ${farmIcon('book-open')} Pinyin: <em>${cDef.pinyin || ''}</em> · Nghĩa: <em>${cDef.meaning || cDef.name}</em>
                </div>
              ` : `
                <button type="button" class="vt-btn-show-hint" data-order-idx="${idx}" style="background:#F3F4F6; border:1px solid #D1D5DB; border-radius:6px; padding:3px 8px; font-size:12px; cursor:pointer; color:#4B5563;">
                  ${farmIcon('lightbulb')} Xem Gợi ý (mất thưởng +50% chữ Hán)
                </button>
              `}
            </div>
          </div>

          <div class="vt-order-rewards" style="font-size:13px; color:#475569; margin-bottom:8px;">
            Thưởng: ${farmIcon('coin', { className: 'vt-icon-coin' })} <strong>+${coinsToShow} xu</strong> · ${farmIcon('zap')} <strong>+${xpToShow} KN</strong> · ${farmIcon('layers')} +${ord.rewardMaterial ? ord.rewardMaterial.count : 1} ${matNames[ord.rewardMaterial ? ord.rewardMaterial.type : 'clay']}
            ${!ord.usedHint && !ord.delivered ? `
              <span class="vt-bonus-pill" style="display:inline-block; background:#FEF3C7; color:#B45309; border:1px solid #FCD34D; border-radius:999px; padding:1px 6px; font-size:11px; font-weight:700; margin-left:4px;">${farmIcon('sparkle')} +50% Thưởng Hán Tự</span>
            ` : ''}
          </div>

          <div class="vt-order-action">
            ${ord.delivered ? `
              <span class="vt-badge-delivered">Đã giao hàng</span>
            ` : `
              <button class="vt-btn-deliver ${!canDeliver ? 'is-disabled' : ''}" data-order-idx="${idx}">
                Giao đơn ${!ord.usedHint ? '(+50% Thưởng)' : ''}
              </button>
            `}
          </div>
        </div>
      `;
    });

    const modal = showModal(`
      <div class="vt-orders-modal">
        <p class="vt-modal-subtext">Khinh khí cầu mang tới các đơn đặt hàng bằng <strong>chữ Hán</strong> từ khách phương xa. Nhớ được chữ Hán không cần gợi ý nhận ngay <strong>+50% thưởng</strong> và tính 1 lần ôn từ:</p>
        <div class="vt-orders-list-grid">
          ${ordersHTML}
        </div>
      </div>
    `, `${farmIcon('file-text')} Bảng Đơn Hàng Chữ Hán`);

    modal.querySelectorAll('.vt-btn-speak-order').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const text = btn.dataset.speech;
        speakText(text);
      };
    });

    modal.querySelectorAll('.vt-btn-show-hint').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.orderIdx, 10);
        if (orders[idx]) {
          orders[idx].usedHint = true;
          eco.saveState();
          openOrdersModal();
        }
      };
    });

    modal.querySelectorAll('.vt-btn-deliver').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.orderIdx, 10);
        deliverBalloonOrder(idx);
        closeModal();
      };
    });
  }

  /**
   * Giao đơn hàng khinh khí cầu
   */
  function deliverBalloonOrder(orderIdx) {
    const eco = getEconomy();
    const state = eco.getState();
    const farm = state.farm;
    const ord = farm.orders[orderIdx];
    if (!ord || ord.delivered) return;

    const warehouse = farm.warehouse;
    const owned = (warehouse.items && warehouse.items[ord.cropId]) || 0;
    if (owned < ord.count) {
      eco.showToast(`${farmIcon('alert')} Trong kho chưa đủ nông sản để giao đơn này!`);
      return;
    }

    // Trừ nông sản trong kho
    warehouse.items[ord.cropId] -= ord.count;
    if (warehouse.items[ord.cropId] <= 0) delete warehouse.items[ord.cropId];

    const cDef = CROP_DEFS[ord.cropId] || { name: ord.cropId, hanzi: ord.cropId };
    const noHintBonus = !ord.usedHint;
    const finalCoins = noHintBonus ? Math.round(ord.rewardCoins * 1.5) : ord.rewardCoins;
    const finalXp = noHintBonus ? Math.round(ord.rewardXp * 1.5) : ord.rewardXp;

    // Nhận xu, KN và vật liệu
    eco.earn('order_delivered', { coins: finalCoins, xp: finalXp });
    if (ord.rewardMaterial) {
      const mType = ord.rewardMaterial.type;
      farm.materials[mType] = (farm.materials[mType] || 0) + (ord.rewardMaterial.count || 1);
    }
    ord.delivered = true;

    // Nếu không dùng gợi ý: tính 1 lần ôn từ đó
    if (noHintBonus && typeof eco.recordWordReview === 'function') {
      eco.recordWordReview(ord.cropId);
    }

    // Đếm hành động làm vườn
    if (typeof eco.recordGardenAction === 'function') {
      eco.recordGardenAction('order', 1);
    }

    eco.saveState();
    playChime(true);
    if (noHintBonus) {
      eco.showToast(`${farmIcon('party-popper')} Xuất sắc! Bạn nhớ đúng chữ Hán "${cDef.hanzi || cDef.name}" (+50% thưởng: +${finalCoins} xu, +${finalXp} KN)!`);
    } else {
      eco.showToast(`${farmIcon('party-popper')} Giao đơn hàng cho ${ord.customer} thành công (+${finalCoins} xu, +${finalXp} KN)!`);
    }
    updateHUDValues();
  }

  /**
   * Modal 9: QUẢN LÝ LINH THÚ (Pets)
   */
  function openPetsModal() {
    const eco = getEconomy();
    const state = eco ? eco.getState() : {};
    const petDefs = (eco && eco.PET_DEFS) || {};

    let petsHTML = '';
    Object.values(petDefs).forEach(pDef => {
      const owned = (state.pets || []).find(p => p.type === pDef.id || p.id === pDef.id);
      const isActive = (state.activePet === (owned && owned.id)) || (state.activePet === pDef.id);

      let avatarSVG = '';
      if (owned && owned.isEgg) {
        avatarSVG = (Sprites && typeof Sprites.renderPetEggSVG === 'function')
          ? Sprites.renderPetEggSVG(pDef.id, 96, 96)
          : farmIcon('sparkle');
      } else {
        avatarSVG = (Sprites && typeof Sprites.renderPetSVG === 'function')
          ? Sprites.renderPetSVG(pDef.id, 96, 96)
          : farmIcon('paw', { size: 72 });
      }

      let statusHTML = '';
      let actionHTML = '';

      if (owned) {
        if (owned.isEgg) {
          const prog = owned.eggXpProgress || 0;
          const needed = owned.eggXpNeeded || 100;
          const pct = Math.min(100, Math.round((prog / needed) * 100));
          statusHTML = `
            <div class="vt-pet-status-badge is-egg">${farmIcon('sparkle')} Trứng đang ấp (${prog}/${needed} KN)</div>
            <div class="vt-pet-meter-wrap" title="Tiến độ ấp trứng qua học tập">
              <div class="vt-pet-meter-bar"><div class="vt-pet-meter-fill fill-egg" style="width: ${pct}%;"></div></div>
            </div>
          `;
          actionHTML = `<button class="vt-btn-pet-equip is-egg-btn" disabled>${farmIcon('sparkle')} Đang ấp...</button>`;
        } else {
          const lvl = owned.level || 1;
          const satiety = owned.satiety !== undefined ? owned.satiety : 100;
          const currentXp = owned.xp || 0;
          const neededXp = lvl * 100;
          const xpPct = Math.min(100, Math.round((currentXp / neededXp) * 100));
          statusHTML = `
            <div class="vt-pet-level-row">
              <span class="vt-pet-level-badge">${farmIcon('star')} Cấp ${lvl}</span>
              ${pDef.rare ? `<span class="vt-pet-rare-badge">Hiếm ${farmIcon('sparkle')}</span>` : ''}
            </div>
            <div class="vt-pet-meter-wrap" title="Độ no của linh thú">
              <div class="vt-pet-meter-label"><span>Độ no:</span> <strong>${satiety}%</strong></div>
              <div class="vt-pet-meter-bar"><div class="vt-pet-meter-fill fill-hunger" style="width: ${satiety}%;"></div></div>
            </div>
            <div class="vt-pet-meter-wrap" title="Kinh nghiệm lên cấp">
              <div class="vt-pet-meter-label"><span>Kinh nghiệm:</span> <strong>${currentXp}/${neededXp} KN</strong></div>
              <div class="vt-pet-meter-bar"><div class="vt-pet-meter-fill fill-xp" style="width: ${xpPct}%;"></div></div>
            </div>
          `;
          actionHTML = `
            <button class="vt-btn-pet-equip ${isActive ? 'is-equipped' : ''}" data-pet-id="${owned.id || pDef.id}">
              ${isActive ? farmIcon('check') + ' Đang đi theo' : `${farmIcon('paw')} Cho đi theo`}
            </button>
          `;
        }
      } else {
        statusHTML = `
          <div class="vt-pet-locked-notice">${farmIcon('lock')} Chưa sở hữu</div>
          <div class="vt-pet-locked-hint">Làm bài tập & hoàn thành đơn hàng để nhận trứng!</div>
        `;
        actionHTML = `<button class="vt-btn-pet-equip is-locked-btn" disabled>${farmIcon('lock')} Chưa có</button>`;
      }

      petsHTML += `
        <div class="vt-pet-manage-card theme-pet-${pDef.id} ${isActive ? 'is-active-pet' : ''} ${!owned ? 'is-locked-pet' : ''}">
          <div class="vt-pet-card-avatar" title="${pDef.name}">
            ${avatarSVG}
          </div>
          <div class="vt-pet-card-body">
            <div class="vt-pet-card-top">
              <h4 class="vt-pet-card-name">${pDef.name}</h4>
              <span class="vt-pet-card-tag tag-${pDef.country}">${pDef.countryName}</span>
            </div>
            <div class="vt-pet-card-desc">${farmIcon('lightbulb')} ${pDef.desc}</div>
            <div class="vt-pet-card-status">
              ${statusHTML}
            </div>
            <div class="vt-pet-card-action">
              ${actionHTML}
            </div>
          </div>
        </div>
      `;
    });

    const modal = showModal(`
      <div class="vt-pets-modal">
        <p class="vt-modal-subtext">8 linh thú đại diện cho 4 nền văn hóa đồng hành cùng bạn trên đại thụ tri thức:</p>
        <div class="vt-pets-grid-list">
          ${petsHTML}
        </div>
      </div>
    `, `${farmIcon('paw')} Linh Thú Trợ Thủ`, 'vt-pets-modal-dialog');

    modal.querySelectorAll('.vt-btn-pet-equip:not([disabled])').forEach(btn => {
      btn.onclick = () => {
        const pId = btn.dataset.petId;
        state.activePet = pId;
        eco.saveState();
        playChime(true);
        eco.showToast(`${farmIcon('paw')} Đã đổi linh thú đồng hành!`);
        closeModal();
        refreshTiersView();
      };
    });
  }

  /**
   * Modal 10: Xem Kho Vật Liệu
   */
  function openMaterialsModal() {
    const eco = getEconomy();
    const farm = eco.getState().farm;
    const mats = farm.materials || {};

    showModal(`
      <div class="vt-materials-modal-view">
        <p class="vt-modal-subtext">Vật liệu quý dùng để nâng cấp sao và đột phá hạng chậu cây:</p>
        <div class="vt-mat-display-grid">
          <div class="vt-mat-box">
            <span class="vt-mat-icon">${farmIcon('layers')}</span>
            <span class="vt-mat-title">Đất sét</span>
            <span class="vt-mat-amount">${mats.clay || 0}</span>
          </div>
          <div class="vt-mat-box">
            <span class="vt-mat-icon">${farmIcon('layers')}</span>
            <span class="vt-mat-title">Men gốm</span>
            <span class="vt-mat-amount">${mats.glaze || 0}</span>
          </div>
          <div class="vt-mat-box">
            <span class="vt-mat-icon">${farmIcon('gem')}</span>
            <span class="vt-mat-title">Bột ngọc</span>
            <span class="vt-mat-amount">${mats.jadePowder || 0}</span>
          </div>
          <div class="vt-mat-box">
            <span class="vt-mat-icon">${farmIcon('sparkle')}</span>
            <span class="vt-mat-title">Vàng lá</span>
            <span class="vt-mat-amount">${mats.goldLeaf || 0}</span>
          </div>
        </div>
        <p class="vt-mat-hint">${farmIcon('lightbulb')} Gợi ý: Thu hoạch nông sản, giao đơn hàng khinh khí cầu và làm nhiệm vụ học tập để nhận thêm vật liệu!</p>
      </div>
    `, `${farmIcon('layers')} Kho Vật Liệu Nâng Cấp`);
  }

  /**
   * Modal 11: Đổi Phong Cách Tầng Ban Công (Theme Picker)
   */
  function openThemePickerModal(tierIndex) {
    const eco = getEconomy();
    const farm = eco.getState().farm;

    let themesHTML = '';
    Object.values(THEMES).forEach(th => {
      themesHTML += `
        <div class="vt-theme-card" data-theme-id="${th.id}">
          <div class="vt-theme-title">${th.name}</div>
          <div class="vt-theme-desc">${th.desc}</div>
          <button class="vt-btn-apply-theme" data-theme-id="${th.id}">Áp dụng</button>
        </div>
      `;
    });

    const modal = showModal(`
      <div class="vt-theme-picker-modal">
        <p class="vt-modal-subtext">Chọn phong cách trang trí ban công gắn với 4 ngôn ngữ của web:</p>
        <div class="vt-themes-list-grid">
          ${themesHTML}
        </div>
      </div>
    `, `${farmIcon('palette')} Đổi Phong Cách Tầng ${tierIndex + 1}`);

    modal.querySelectorAll('.vt-btn-apply-theme').forEach(btn => {
      btn.onclick = () => {
        const thId = btn.dataset.themeId;
        farm.tierThemes[tierIndex] = thId;
        eco.saveState();
        playChime(true);
        eco.showToast(`${farmIcon('palette')} Đã đổi Tầng ${tierIndex + 1} sang phong cách ${THEMES[thId].name}!`);
        closeModal();
        refreshTiersView();
      };
    });
  }

  /**
   * Modal: Thuê Tiên Vườn Mới Cho Tầng
   */
  function openHireFairyModal(tierIdx) {
    const eco = getEconomy();
    if (!eco) return;
    const farm = eco.getState().farm;
    const themeId = (farm.tierThemes && farm.tierThemes[tierIdx]) || 'chinese';
    const fNames = FAIRY_CONFIG.names;
    const fName = fNames[themeId] || 'Tiên Vườn';
    const cost = 100;

    const content = `
      <div class="vt-hire-fairy-dialog" style="text-align:center; padding: 10px;">
        <div style="margin: 0 auto 12px; width: 72px; height: 72px;">
          ${Sprites ? Sprites.renderFairySVG(themeId, 1, false, 72) : farmIcon('sparkle')}
        </div>
        <h4 style="font-size: 18px; color: #7A4B2A; margin: 0 0 6px 0; font-family: var(--vt-font-heading);">${fName} (Tầng ${tierIdx + 1})</h4>
        <p style="font-size: 14px; color: #5B3A1E; line-height: 1.45; margin: 0 0 14px 0;">
          Thuê <strong>${fName}</strong> để tự động chăm sóc tầng này!<br>
          Ở Cấp 1, tiên sẽ <strong>tự động tưới nước</strong> cho mọi cây khát trên tầng bằng giọt nước của bạn.
        </p>
        <div style="background: #FFFDF8; border: 2px solid #7A4B2A; border-radius: 12px; padding: 10px; margin-bottom: 16px;">
          <span style="font-size: 14px; color: #7A4B2A; font-weight: 600;">Chi phí thuê: </span>
          <strong style="font-size: 16px; color: #B45309;">${cost} ${farmIcon('coin', { className: 'vt-icon-coin' })}</strong>
        </div>
        <div style="display:flex; gap: 10px; justify-content:center;">
          <button id="btn-confirm-hire-fairy" style="flex:1; padding: 10px; background: #22C55E; color: #FFF; border: 2px solid #15803D; border-radius: 999px; font-weight: 700; font-size: 15px; cursor: pointer; box-shadow: 0 3px 0 #15803D;">
            Thuê Tiên (100 xu)
          </button>
          <button id="btn-cancel-hire-fairy" style="padding: 10px 18px; background: #E2E8F0; color: #475569; border: 2px solid #94A3B8; border-radius: 999px; font-weight: 700; font-size: 14px; cursor: pointer;">
            Để sau
          </button>
        </div>
      </div>
    `;

    const m = showModal(content, `${farmIcon('sparkle')} THUÊ TIÊN CHO TẦNG ${tierIdx + 1}`);
    const btnCancel = m.querySelector('#btn-cancel-hire-fairy');
    if (btnCancel) btnCancel.onclick = closeModal;

    const btnConfirm = m.querySelector('#btn-confirm-hire-fairy');
    if (btnConfirm) {
      btnConfirm.onclick = () => {
        if (!eco.spend(cost)) {
          eco.showToast(`${farmIcon('alert')} Bạn không đủ xu để thuê tiên!`);
          return;
        }
        if (!farm.fairies) farm.fairies = [];
        farm.fairies[tierIdx] = {
          level: 1,
          enabled: { water: true, harvest: true, replant: true },
          lastWorkAt: Date.now()
        };
        eco.saveState();
        playChime(true);
        eco.showToast(`${farmIcon('party-popper')} Chúc mừng bạn đã thuê thành công ${fName} cho Tầng ${tierIdx + 1}!`);
        closeModal();
        refreshTiersView();
        updateHUDValues();
      };
    }
  }

  /**
   * Modal: Bảng Tiên Vườn (Nâng cấp & Bật/Tắt tính năng)
   */
  function openFairyModal(tierIdx) {
    const eco = getEconomy();
    if (!eco) return;
    const state = eco.getState();
    const farm = state.farm;
    const fairy = (farm.fairies && farm.fairies[tierIdx]) || { level: 1, enabled: { water: true, harvest: true, replant: true } };
    const themeId = (farm.tierThemes && farm.tierThemes[tierIdx]) || 'chinese';
    const fNames = FAIRY_CONFIG.names;
    const fName = fNames[themeId] || 'Tiên Vườn';

    const upgradeConfigs = FAIRY_CONFIG.upgrades;
    const curLevel = fairy.level || 1;
    const nextUpgrade = upgradeConfigs.find(u => u.level === curLevel + 1);
    const playerLevel = eco.levelInfo(state.xp || 0).level;

    let upgradeBtnHTML = '';
    if (nextUpgrade) {
      const fairyCheck = (eco && typeof eco.canUpgradeFairy === 'function')
        ? eco.canUpgradeFairy(nextUpgrade.level)
        : { canUpgrade: true, lessonsPassed: true, reqLessons: 0, lessonsCompleted: 0 };

      upgradeBtnHTML = `
        <div class="vt-fairy-upgrade-box" style="margin-top: 14px; background: #FFFDF8; border: 2px solid #7A4B2A; border-radius: 12px; padding: 12px; text-align: center;">
          <div style="font-size: 14px; color: #5B3A1E; margin-bottom: 6px;">
            Nâng cấp: <strong>${nextUpgrade.name}</strong><br>
            Chi phí: <strong style="color:#B45309;">${nextUpgrade.cost} ${farmIcon('coin', { className: 'vt-icon-coin' })}</strong> | Người chơi: <strong>Cấp ${nextUpgrade.playerLevel}</strong>
            ${fairyCheck.reqLessons > 0 ? `<br>Yêu cầu học tập: <strong>Đã học ${fairyCheck.lessonsCompleted}/${fairyCheck.reqLessons} bài</strong>` : ''}
          </div>
          ${!fairyCheck.lessonsPassed ? `
            <div style="margin-top: 6px; padding: 8px; background: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 8px; color: #DC2626; font-size: 13px; font-weight: 600;">
              ${farmIcon('lock')} Cần học tối thiểu ${fairyCheck.reqLessons} bài để nâng cấp tiên lên Cấp ${nextUpgrade.level}!<br>
              <a href="#zh/learn" onclick="closeModal()" style="display:inline-block; margin-top:6px; padding:5px 14px; background:#10B981; color:#fff; border-radius:999px; text-decoration:none; font-weight:700; font-size:12px;">
                Đi học ngay ${farmIcon('arrow-right')}
              </a>
            </div>
          ` : `
            <button id="btn-upgrade-fairy-now" style="width: 100%; padding: 10px; background: #3B82F6; color: #fff; border: 2px solid #1D4ED8; border-radius: 999px; font-weight: 700; font-size: 15px; cursor: pointer; box-shadow: 0 3px 0 #1D4ED8;">
              ${farmIcon('star')} Nâng Cấp Lên Cấp ${nextUpgrade.level} (${nextUpgrade.cost} xu)
            </button>
          `}
        </div>
      `;
    } else {
      upgradeBtnHTML = `
        <div style="margin-top: 14px; background: #FEF3C7; border: 2px solid #D97706; border-radius: 12px; padding: 10px; text-align: center; font-size: 15px; font-weight: 800; color: #B45309;">
          ${farmIcon('sparkle')} ${fName} đã đạt Cấp tối đa (Cấp 5)!
        </div>
      `;
    }

    const content = `
      <div class="vt-fairy-modal-body" style="padding: 4px;">
        <div style="display:flex; align-items:center; gap: 14px; background: #FFFDF8; border: 2px solid #7A4B2A; border-radius: 14px; padding: 12px; margin-bottom: 14px;">
          <div style="width: 72px; height: 72px; flex-shrink: 0;">
            ${Sprites ? Sprites.renderFairySVG(themeId, curLevel, false, 72) : farmIcon('sparkle')}
          </div>
          <div>
            <div style="font-size: 18px; font-weight: 800; color: #7A4B2A; font-family: var(--vt-font-heading);">${fName} - Tầng ${tierIdx + 1}</div>
            <div style="font-size: 14px; font-weight: 700; color: #B45309;">Cấp độ: ${farmIcon('star')} ${curLevel} / 5</div>
            <div style="font-size: 13px; color: #64748B;">Trợ thủ tự động chăm sóc và thu hoạch ban công.</div>
          </div>
        </div>

        <div class="vt-fairy-feature-list" style="display:flex; flex-direction:column; gap: 8px;">
          <!-- Cấp 1 -->
          <div style="display:flex; align-items:center; justify-content:space-between; background: #FFFDF8; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 8px 12px;">
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 20px;">${farmIcon('droplet', { className: 'vt-icon-water' })}</span>
              <div>
                <div style="font-size: 14px; font-weight: 700; color: #1E293B;">Cấp 1: Tự tưới cây khát</div>
                <div style="font-size: 12px; color: #64748B;">Dùng giọt nước trong ví tưới cây cần nước</div>
              </div>
            </div>
            <div>
              <label class="vt-switch" style="cursor:pointer; display:inline-flex; align-items:center; gap: 6px;">
                <input type="checkbox" id="fairy-chk-water" ${fairy.enabled?.water !== false ? 'checked' : ''}>
                <span style="font-size: 13px; font-weight: 700;">Bật</span>
              </label>
            </div>
          </div>

          <!-- Cấp 2 -->
          <div style="display:flex; align-items:center; justify-content:space-between; background: #FFFDF8; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 8px 12px;">
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 20px;">${farmIcon('sprout')}</span>
              <div>
                <div style="font-size: 14px; font-weight: 700; color: #1E293B;">Cấp 2: Tự thu hoạch cây chín</div>
                <div style="font-size: 12px; color: #64748B;">Tự thu hoạch nông sản chín cất vào kho</div>
              </div>
            </div>
            <div>
              ${curLevel >= 2 ? `
                <label class="vt-switch" style="cursor:pointer; display:inline-flex; align-items:center; gap: 6px;">
                  <input type="checkbox" id="fairy-chk-harvest" ${fairy.enabled?.harvest !== false ? 'checked' : ''}>
                  <span style="font-size: 13px; font-weight: 700;">Bật</span>
                </label>
              ` : '<span style="font-size: 12px; color: #94A3B8; font-weight: 700;">' + farmIcon('lock') + ' Cấp 2</span>'}
            </div>
          </div>

          <!-- Cấp 3 -->
          <div style="display:flex; align-items:center; justify-content:space-between; background: #FFFDF8; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 8px 12px;">
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 20px;">${farmIcon('sprout')}</span>
              <div>
                <div style="font-size: 14px; font-weight: 700; color: #1E293B;">Cấp 3: Tự gieo lại hạt giống</div>
                <div style="font-size: 12px; color: #64748B;">Mua lại loại hạt vừa thu để gieo tiếp</div>
              </div>
            </div>
            <div>
              ${curLevel >= 3 ? `
                <label class="vt-switch" style="cursor:pointer; display:inline-flex; align-items:center; gap: 6px;">
                  <input type="checkbox" id="fairy-chk-replant" ${fairy.enabled?.replant !== false ? 'checked' : ''}>
                  <span style="font-size: 13px; font-weight: 700;">Bật</span>
                </label>
              ` : '<span style="font-size: 12px; color: #94A3B8; font-weight: 700;">' + farmIcon('lock') + ' Cấp 3</span>'}
            </div>
          </div>

          <!-- Cấp 4 -->
          <div style="display:flex; align-items:center; justify-content:space-between; background: #FFFDF8; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 8px 12px;">
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 20px;">${farmIcon('zap')}</span>
              <div>
                <div style="font-size: 14px; font-weight: 700; color: #1E293B;">Cấp 4: Tăng tốc 50% & May mắn</div>
                <div style="font-size: 12px; color: #64748B;">Chu kỳ nhanh gấp đôi + 10% cơ hội +1 sản phẩm</div>
              </div>
            </div>
            <div>
              ${curLevel >= 4 ? '<span style="font-size: 12px; color: #16A34A; font-weight: 800;">' + farmIcon('check') + ' Kích hoạt</span>' : '<span style="font-size: 12px; color: #94A3B8; font-weight: 700;">' + farmIcon('lock') + ' Cấp 4</span>'}
            </div>
          </div>

          <!-- Cấp 5 -->
          <div style="display:flex; align-items:center; justify-content:space-between; background: #FFFDF8; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 8px 12px;">
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 20px;">${farmIcon('moon')}</span>
              <div>
                <div style="font-size: 14px; font-weight: 700; color: #1E293B;">Cấp 5: Làm việc ngoại tuyến</div>
                <div style="font-size: 12px; color: #64748B;">Tự chăm sóc khi đóng game (tối đa 8 giờ)</div>
              </div>
            </div>
            <div>
              ${curLevel >= 5 ? '<span style="font-size: 12px; color: #16A34A; font-weight: 800;">' + farmIcon('check') + ' Kích hoạt</span>' : '<span style="font-size: 12px; color: #94A3B8; font-weight: 700;">' + farmIcon('lock') + ' Cấp 5</span>'}
            </div>
          </div>
        </div>

        ${upgradeBtnHTML}
      </div>
    `;

    const m = showModal(content, `${farmIcon('sparkle')} BẢNG TIÊN VƯỜN - ${fName.toUpperCase()}`);

    const chkWater = m.querySelector('#fairy-chk-water');
    if (chkWater) {
      chkWater.onchange = () => {
        fairy.enabled.water = chkWater.checked;
        eco.saveState();
      };
    }
    const chkHarvest = m.querySelector('#fairy-chk-harvest');
    if (chkHarvest) {
      chkHarvest.onchange = () => {
        fairy.enabled.harvest = chkHarvest.checked;
        eco.saveState();
      };
    }
    const chkReplant = m.querySelector('#fairy-chk-replant');
    if (chkReplant) {
      chkReplant.onchange = () => {
        fairy.enabled.replant = chkReplant.checked;
        eco.saveState();
      };
    }

    const btnUpgrade = m.querySelector('#btn-upgrade-fairy-now');
    if (btnUpgrade && nextUpgrade) {
      btnUpgrade.onclick = () => {
        if (typeof eco.canUpgradeFairy === 'function') {
          const fairyCheck = eco.canUpgradeFairy(nextUpgrade.level);
          if (!fairyCheck.lessonsPassed) {
            eco.showToast(`${farmIcon('lock')} Cần hoàn thành tối thiểu ${fairyCheck.reqLessons} bài học (hiện tại: ${fairyCheck.lessonsCompleted})!`);
            return;
          }
        }
        if (playerLevel < nextUpgrade.playerLevel) {
          eco.showToast(`${farmIcon('alert')} Yêu cầu đạt Cấp người chơi ${nextUpgrade.playerLevel} để nâng cấp Tiên!`);
          return;
        }
        if (!eco.spend(nextUpgrade.cost)) {
          eco.showToast(`${farmIcon('alert')} Không đủ xu! Cần ${nextUpgrade.cost} xu để nâng cấp Tiên.`);
          return;
        }
        fairy.level = nextUpgrade.level;
        fairy.lastWorkAt = Date.now();
        eco.saveState();
        playChime(true);
        eco.showToast(`${farmIcon('party-popper')} Chúc mừng! ${fName} đã lên Cấp ${fairy.level}!`);
        closeModal();
        refreshTiersView();
        updateHUDValues();
      };
    }
  }

  /**
   * Modal: Báo cáo công việc ngoại tuyến của Tiên Cấp 5
   */
  function showOfflineFairiesReport(report) {
    if (!report || (report.totalWatered === 0 && report.totalHarvested === 0 && report.totalReplanted === 0)) return;
    const hours = (report.elapsed / (3600 * 1000)).toFixed(1);
    const content = `
      <div class="vt-offline-report-body" style="text-align:center; padding: 10px;">
        <div style="font-size: 48px; margin-bottom: 8px;">${farmIcon('sparkle', { size: 48 })}</div>
        <p style="font-size: 15px; font-weight: 600; color: #5B3A1E; margin-bottom: 16px;">
          Trong lúc bạn vắng (${hours} giờ), các Tiên Vườn Cấp 5 đã tự động chăm sóc:
        </p>
        <div style="display:flex; justify-content:space-around; gap: 10px; margin-bottom: 20px; background: rgba(254, 243, 199, 0.5); padding: 12px; border-radius: 12px; border: 2px solid #7A4B2A;">
          <div><div style="font-size: 24px;">${farmIcon('droplet', { size: 24, className: 'vt-icon-water' })}</div><div style="font-size: 15px; font-weight: 700; color: #15803D;">Tưới ${report.totalWatered}</div></div>
          <div><div style="font-size: 24px;">${farmIcon('sprout', { size: 24 })}</div><div style="font-size: 15px; font-weight: 700; color: #B45309;">Thu ${report.totalHarvested}</div></div>
          <div><div style="font-size: 24px;">${farmIcon('sprout', { size: 24 })}</div><div style="font-size: 15px; font-weight: 700; color: #0284C7;">Gieo ${report.totalReplanted}</div></div>
        </div>
        <button id="btn-close-offline-report" style="width: 100%; padding: 10px; font-size: 15px; font-weight: 700; border-radius: 999px; background: #10B981; color: #fff; border: 2px solid #065F46; cursor: pointer; box-shadow: 0 3px 0 #065F46;">
          Tuyệt vời, cảm ơn các Tiên!
        </button>
      </div>
    `;
    const m = showModal(content, `${farmIcon('moon')} BÁO CÁO NGOẠI TUYẾN`);
    const btn = m.querySelector('#btn-close-offline-report');
    if (btn) btn.onclick = closeModal;
  }

  /* ==========================================================================
     8. Hướng Dẫn Tân Thủ 5 Bước (Tutorial)
     ========================================================================== */

  function checkTutorialProgress() {
    const eco = getEconomy();
    const farm = eco ? eco.getState().farm : null;
    if (!farm || farm.tutorialStep >= 5) {
      const ov = document.getElementById('vt-tutorial-overlay');
      if (ov) ov.style.display = 'none';
      if (rootContainer) {
        rootContainer.querySelectorAll('.vt-tut-highlight').forEach(el => el.classList.remove('vt-tut-highlight'));
      }
      return;
    }
    showTutorialStep(farm.tutorialStep);
  }

  function showTutorialStep(step) {
    const ov = document.getElementById('vt-tutorial-overlay');
    if (!ov) return;

    if (rootContainer) {
      rootContainer.querySelectorAll('.vt-tut-highlight').forEach(el => el.classList.remove('vt-tut-highlight'));
    }

    const steps = [
      { text: 'Bước 1/5: Chào mừng bạn đến Vườn Treo! Mở Cửa Hàng để nhận thêm chậu và hạt giống.', target: '#vt-btn-open-shop' },
      { text: 'Bước 2/5: Mua Chậu Đất Nung và đặt vào ô ban công trên tầng.', target: '.vt-pot-slot.is-empty' },
      { text: 'Bước 3/5: Chạm vào chậu cây để gieo hạt giống hoa cúc.', target: '.vt-pot-slot.has-pot' },
      { text: 'Bước 4/5: Cây đang cần nước! Chạm vào cây và nhấn nút Tưới Nước.', target: '.vt-pot-slot.has-pot' },
      { text: 'Bước 5/5: Cây đã chín vàng rực! Chạm vào cây để thu hoạch mùa màng đầu tiên!', target: '.vt-pot-slot.has-pot' }
    ];

    const cur = steps[step];
    if (!cur) {
      ov.style.display = 'none';
      return;
    }

    ov.style.display = 'block';

    // Nếu đã qua bước 1 (step >= 1): Hiển thị dạng thanh chỉ dẫn nhỏ gọn ở góc, không che chậu
    if (step >= 1) {
      ov.innerHTML = `
        <div class="vt-tut-compact-bar">
          <span class="vt-tut-compact-text">${farmIcon('lightbulb')} ${cur.text}</span>
          <button class="vt-tut-skip-btn" id="vt-tut-skip-btn">Bỏ qua</button>
        </div>
      `;
      const btnSkip = ov.querySelector('#vt-tut-skip-btn');
      if (btnSkip) {
        btnSkip.onclick = () => advanceTutorial(5);
      }
      return;
    }

    // Bước 0: Chỉ vào nút Cửa hàng ở thanh dưới
    const stageEl = document.getElementById('vt-game-stage');
    const targetEl = rootContainer ? rootContainer.querySelector(cur.target) : null;

    let targetX = 640;
    let targetY = 660;

    if (stageEl && targetEl) {
      targetEl.classList.add('vt-tut-highlight');
      const sRect = stageEl.getBoundingClientRect();
      const tRect = targetEl.getBoundingClientRect();
      const isPortrait = stageEl.classList.contains('is-portrait');
      const stageW = isPortrait ? 720 : 1280;
      const scale = sRect.width / stageW;

      targetX = (tRect.left + tRect.width / 2 - sRect.left) / scale;
      targetY = (tRect.top + tRect.height / 2 - sRect.top) / scale;
    }

    ov.innerHTML = `
      <div class="vt-tut-target-ring" style="left: ${targetX}px; top: ${targetY}px;"></div>
      <div class="vt-tut-pointer-hand down" style="left: ${targetX}px; top: ${targetY - 55}px;">
        <span class="vt-tut-hand-icon">${farmIcon('chevron-right')}</span>
      </div>
      <div class="vt-tut-dialog-box">
        <div class="vt-tut-dialog-text">${cur.text}</div>
        <button class="vt-tut-skip-btn" id="vt-tut-skip-btn">Bỏ qua</button>
      </div>
    `;

    const btnSkip = ov.querySelector('#vt-tut-skip-btn');
    if (btnSkip) {
      btnSkip.onclick = () => {
        advanceTutorial(5);
      };
    }
  }


  function advanceTutorial(nextStep) {
    const eco = getEconomy();
    if (!eco) return;
    const farm = eco.getState().farm;
    if (!farm) return;
    farm.tutorialStep = nextStep;
    eco.saveState();
    checkTutorialProgress();
  }

  function showWaterDropAnim(slotIndex) {
    const slotEl = rootContainer ? rootContainer.querySelector(`.vt-pot-slot[data-slot-index="${slotIndex}"]`) : null;
    if (!slotEl) return;
    const drop = document.createElement('div');
    drop.className = 'vt-water-drop-fx';
    drop.innerHTML = farmIcon('droplet', { className: 'vt-icon-water', size: 20 });
    slotEl.appendChild(drop);
    setTimeout(() => {
      if (drop.parentNode) drop.parentNode.removeChild(drop);
    }, 800);
  }

  // Tự động căn giữa tầng hiện tại khi đổi kích thước màn hình
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      updateStageScale();
    });
  }

  /* ==========================================================================
     9. Public API Export
     ========================================================================== */

  const Farm = {
    mount,
    onShow,
    onHide,
    plotStatus,
    getPotStatus: plotStatus,
    checkPotVisibility,
    scrollToActiveTier,
    _fairyTick,
    _simulateOfflineFairies,
    ensureFarmState,
    FAIRY_CONFIG,
    closeModal,
    CROP_DEFS,
    POT_TIERS,
    THEMES,
    TIER_UNLOCKS,
    SRS_INTERVALS,
    getLearnedWords,
    resolveWordInfo,
    sowWordSeedIntoSlot,
    reviewWordTree,
    boostPlantByName,
    harvestCrop,
    openGardenWordbookModal,
    openWordRecallQuizModal,
    openNamePlantModal,
    getRandomVocabQuiz
  };

  if (typeof window !== 'undefined') {
    window.Farm = Farm;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      Farm,
      plotStatus,
      getPotStatus: plotStatus,
      checkPotVisibility,
      scrollToActiveTier,
      _fairyTick,
      _simulateOfflineFairies,
      ensureFarmState,
      FAIRY_CONFIG,
      closeModal,
      CROP_DEFS,
      POT_TIERS,
      THEMES,
      TIER_UNLOCKS,
      SRS_INTERVALS,
      getLearnedWords,
      resolveWordInfo,
      sowWordSeedIntoSlot,
      reviewWordTree,
      boostPlantByName,
      harvestCrop,
      openGardenWordbookModal,
      openWordRecallQuizModal,
      openNamePlantModal,
      getRandomVocabQuiz
    };
  }

})();
