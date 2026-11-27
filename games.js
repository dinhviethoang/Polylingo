/**
 * games.js — Phân hệ Mini-Game Tiếng Trung (HSK1)
 * Cung cấp 3 trò chơi: Ghép cặp tốc độ, Mưa chữ, Nghe chọn chữ.
 * Tích hợp Economy, WebAudio, speechSynthesis zh-CN, lưu trữ localStorage.
 */

(function () {
  'use strict';

  const LOCAL_ICONS = {
    'volume-x': '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>',
    'cloud-rain': '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path>',
    'rocket': '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>'
  };

  const ic = (name, opts = {}) => {
    if (typeof window !== 'undefined' && window.PolyIcons && window.PolyIcons.has(name)) {
      return window.PolyIcons.svg(name, opts);
    }
    if (typeof PolyIcons !== 'undefined' && PolyIcons.has && PolyIcons.has(name)) {
      return PolyIcons.svg(name, opts);
    }
    if (LOCAL_ICONS[name]) {
      const size = opts.size || opts.width || 24;
      const cls = ('ds-icon ' + (opts.className || opts.class || '')).trim();
      const fill = opts.fill || 'none';
      const strokeWidth = opts.strokeWidth || 2;
      return `<svg class="${cls}" aria-hidden="true" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${fill}" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${LOCAL_ICONS[name]}</svg>`;
    }
    return '';
  };

  /* ==========================================================================
     1. PURE UTILITIES & PINYIN COMPARISON
     ========================================================================== */

  const TONE_CHAR_MAP = {
    'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
    'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
    'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
    'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
    'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
    'ǖ': 'ü', 'ǘ': 'ü', 'ǚ': 'ü', 'ǜ': 'ü',
    'Ā': 'A', 'Á': 'A', 'Ǎ': 'A', 'À': 'A',
    'Ē': 'E', 'É': 'E', 'Ě': 'E', 'È': 'E',
    'Ī': 'I', 'Í': 'I', 'Ǐ': 'I', 'Ì': 'I',
    'Ō': 'O', 'Ó': 'O', 'Ǒ': 'O', 'Ò': 'O',
    'Ū': 'U', 'Ú': 'U', 'Ǔ': 'U', 'Ù': 'U',
    'Ǖ': 'Ü', 'Ǘ': 'Ü', 'Ǚ': 'Ü', 'Ǜ': 'Ü'
  };

  const TONE_VOWELS = {
    'a': ['a', 'ā', 'á', 'ǎ', 'à'],
    'e': ['e', 'ē', 'é', 'ě', 'è'],
    'o': ['o', 'ō', 'ó', 'ǒ', 'ò'],
    'i': ['i', 'ī', 'í', 'ǐ', 'ì'],
    'u': ['u', 'ū', 'ú', 'ǔ', 'ù'],
    'v': ['v', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
    'ü': ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ']
  };

  /**
   * Bỏ dấu thanh của chuỗi Pinyin
   * @param {string} py - Pinyin có dấu hoặc số
   * @returns {string} - Pinyin đã loại bỏ dấu thanh và số thanh
   */
  function stripTones(py) {
    if (!py || typeof py !== 'string') return '';
    return py
      .replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛ]/g, ch => TONE_CHAR_MAP[ch] || ch)
      .replace(/[1-5]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Đặt dấu thanh vào nguyên âm chuẩn ngữ âm Pinyin
   */
  function markSyllable(syl, tone) {
    if (!syl) return '';
    let s = syl.replace(/u:/gi, 'ü').replace(/v/gi, 'ü');
    if (!tone || tone < 1 || tone > 4) return s;

    let idx = -1;
    const lower = s.toLowerCase();
    if (lower.includes('a')) idx = lower.indexOf('a');
    else if (lower.includes('e')) idx = lower.indexOf('e');
    else if (lower.includes('iu')) idx = lower.indexOf('iu') + 1;
    else if (lower.includes('ui')) idx = lower.indexOf('ui') + 1;
    else if (lower.includes('o')) idx = lower.indexOf('o');
    else if (lower.includes('i')) idx = lower.indexOf('i');
    else if (lower.includes('u')) idx = lower.indexOf('u');
    else if (lower.includes('ü')) idx = lower.indexOf('ü');

    if (idx !== -1) {
      const ch = s[idx].toLowerCase();
      const mapped = TONE_VOWELS[ch] ? TONE_VOWELS[ch][tone] : ch;
      return s.slice(0, idx) + mapped + s.slice(idx + 1);
    }
    return s;
  }

  /**
   * Chuyển Pinyin số (ni3hao3) sang Pinyin có dấu (nǐhǎo)
   */
  function convertPinyinNumbersToMarks(str) {
    if (!str || typeof str !== 'string') return '';
    return str.replace(/([a-zA-ZüÜ:vV]+)([1-5])/g, (m, syl, tone) => {
      return markSyllable(syl, parseInt(tone, 10));
    });
  }

  /**
   * Chuẩn hóa pinyin để so khớp phần âm gốc (base letters)
   */
  function normalizePinyinBase(str) {
    return stripTones(str)
      .toLowerCase()
      .replace(/u:/g, 'v')
      .replace(/ü/g, 'v')
      .replace(/[^a-z0-9]/g, '');
  }

  /**
   * Chuẩn hóa pinyin có dấu thanh
   */
  function normalizeMarkedPinyin(str) {
    return str.toLowerCase()
      .replace(/u:/g, 'ü')
      .replace(/v/g, 'ü')
      .replace(/[^a-z0-9āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, '');
  }

  /**
   * So khớp pinyin lỏng (hỗ trợ không dấu, có dấu hoặc kèm số thanh)
   * @param {string} input - Người dùng gõ (ví dụ: nihao, ni3hao3, nǐ hǎo)
   * @param {string} py - Pinyin mục tiêu chuẩn (ví dụ: nǐ hǎo)
   * @returns {boolean}
   */
  function matchPinyinLoose(input, py) {
    if (!input || !py || typeof input !== 'string' || typeof py !== 'string') return false;

    // Ưu tiên dùng TypingPractice.compareInputToTarget nếu có trong môi trường trình duyệt
    if (typeof window !== 'undefined' && window.TypingPractice && typeof window.TypingPractice.compareInputToTarget === 'function') {
      try {
        const tpRes = window.TypingPractice.compareInputToTarget(input, py, 'tone_less');
        if (tpRes && tpRes.isAllCorrect) return true;
      } catch (e) {
        // Fallback sang hàm thuần bên dưới
      }
    }

    const rawInput = input.trim().toLowerCase();
    const rawPy = py.trim().toLowerCase();

    const baseInput = normalizePinyinBase(rawInput);
    const baseTarget = normalizePinyinBase(rawPy);

    // Kiểm tra âm gốc (có hỗ trợ ü/v và u nếu gõ lỏng)
    const baseMatched = (baseInput === baseTarget) ||
      (baseInput.replace(/u/g, 'v') === baseTarget.replace(/u/g, 'v'));

    if (!baseMatched) return false;

    const hasNumbers = /[1-5]/.test(rawInput);
    const hasMarks = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(rawInput);

    // Nếu người dùng không nhập số thanh hay dấu thanh => chấp nhận so khớp lỏng
    if (!hasNumbers && !hasMarks) {
      return true;
    }

    // Nếu người dùng chủ động gõ dấu thanh hoặc số thanh, kiểm tra độ chính xác thanh điệu
    const markedInput = normalizeMarkedPinyin(convertPinyinNumbersToMarks(rawInput));
    const markedTarget = normalizeMarkedPinyin(convertPinyinNumbersToMarks(rawPy));

    return markedInput === markedTarget;
  }

  /**
   * Lấy key định danh từ vựng (chuỗi hanzi hoặc id)
   */
  function getWordKey(w) {
    if (!w) return '';
    if (typeof w === 'string') return w;
    return w.hanzi || w.id || JSON.stringify(w);
  }

  /**
   * Chọn n từ gây nhiễu (distractors) từ danh sách từ vựng, không trùng với word
   */
  function pickDistractors(word, pool, n = 3) {
    if (!pool || !Array.isArray(pool) || n <= 0) return [];
    const targetKey = getWordKey(word);

    const seen = new Set([targetKey]);
    const candidates = [];

    for (let i = 0; i < pool.length; i++) {
      const item = pool[i];
      const key = getWordKey(item);
      if (key && !seen.has(key)) {
        seen.add(key);
        candidates.push(item);
      }
    }

    // Xáo trộn ngẫu nhiên Fisher-Yates
    const shuffled = candidates.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = tmp;
    }

    return shuffled.slice(0, n);
  }

  /**
   * Tính điểm theo chuỗi combo đúng liên tiếp (streak)
   * Hệ số nhân: streak < 2: 1x, 2..3: 1.2x, 4..6: 1.5x, 7..9: 2.0x, >=10: 3.0x
   */
  function scoreCombo(base, streak) {
    const b = typeof base === 'number' && !isNaN(base) ? base : 10;
    const s = typeof streak === 'number' && !isNaN(streak) && streak > 0 ? streak : 0;

    let multiplier = 1.0;
    if (s >= 10) multiplier = 3.0;
    else if (s >= 7) multiplier = 2.0;
    else if (s >= 4) multiplier = 1.5;
    else if (s >= 2) multiplier = 1.2;

    return Math.round(b * multiplier);
  }

  /**
   * Tính phần thưởng kinh tế (Xu & XP) theo công thức quy định
   */
  function calculateGameRewards(score) {
    const safeScore = Math.max(0, Math.floor(score || 0));
    const coins = Math.min(30, Math.floor(safeScore / 10));
    const xp = Math.min(40, Math.floor(safeScore / 5));
    return { coins, xp };
  }

  /* ==========================================================================
     2. AUDIO ENGINE & SOUND EFFECTS (WEBAUDIO)
     ========================================================================== */

  const SoundFX = {
    enabled: true,
    ctx: null,

    init() {
      if (typeof window === 'undefined') return;
      try {
        const stored = localStorage.getItem('zh_games_sound');
        if (stored !== null) {
          this.enabled = stored === '1';
        }
      } catch (e) {}

      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx && !this.ctx) {
          this.ctx = new AudioCtx();
        }
      } catch (e) {
        this.ctx = null;
      }
    },

    toggle() {
      this.enabled = !this.enabled;
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('zh_games_sound', this.enabled ? '1' : '0');
        }
      } catch (e) {}
      return this.enabled;
    },

    play(type) {
      if (!this.enabled || typeof window === 'undefined') return;
      if (!this.ctx) this.init();
      if (!this.ctx) return;

      try {
        if (this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        if (type === 'correct') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587, t);
          osc.frequency.exponentialRampToValueAtTime(880, t + 0.12);
          gain.gain.setValueAtTime(0.06, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
          osc.start(t);
          osc.stop(t + 0.15);
        } else if (type === 'wrong') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(160, t);
          osc.frequency.linearRampToValueAtTime(120, t + 0.18);
          gain.gain.setValueAtTime(0.04, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
          osc.start(t);
          osc.stop(t + 0.2);
        } else if (type === 'match') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523, t);
          osc.frequency.setValueAtTime(659, t + 0.08);
          gain.gain.setValueAtTime(0.07, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
          osc.start(t);
          osc.stop(t + 0.22);
        } else if (type === 'hit') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, t);
          osc.frequency.exponentialRampToValueAtTime(130, t + 0.14);
          gain.gain.setValueAtTime(0.08, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
          osc.start(t);
          osc.stop(t + 0.14);
        } else if (type === 'gameover') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(330, t);
          osc.frequency.linearRampToValueAtTime(165, t + 0.35);
          gain.gain.setValueAtTime(0.06, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
          osc.start(t);
          osc.stop(t + 0.38);
        } else if (type === 'record') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523, t);
          osc.frequency.setValueAtTime(659, t + 0.08);
          osc.frequency.setValueAtTime(784, t + 0.16);
          osc.frequency.setValueAtTime(1046, t + 0.24);
          gain.gain.setValueAtTime(0.08, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
          osc.start(t);
          osc.stop(t + 0.45);
        }
      } catch (e) {
        // Bỏ qua lỗi audio context
      }
    }
  };

  /**
   * Phát âm tiếng Trung giọng chuẩn zh-CN
   */
  function speakChinese(text) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'zh-CN';
      u.rate = 0.85;
      const voices = window.speechSynthesis.getVoices();
      const zhVoice = voices.find(v => v.lang && (v.lang === 'zh-CN' || v.lang.startsWith('zh')));
      if (zhVoice) u.voice = zhVoice;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ==========================================================================
     3. DATA SOURCE & VOCABULARY FILTERING
     ========================================================================== */

  /**
   * Lấy danh sách từ vựng theo phạm vi ("learned" hoặc "all")
   */
  function getVocabularyPool(scope = 'learned') {
    let allWords = [];

    // Ưu tiên 1: window.HSK1_WORDS (hanzi -> {py, vi, hv})
    if (typeof window !== 'undefined' && window.HSK1_WORDS && typeof window.HSK1_WORDS === 'object') {
      allWords = Object.entries(window.HSK1_WORDS).map(([hanzi, val]) => ({
        id: hanzi,
        hanzi,
        pinyin: val.py || val.pinyin || '',
        vi: val.vi || '',
        hv: val.hv || ''
      }));
    }
    // Ưu tiên 2: window.VOCAB (mảng {hanzi, pinyin, vi})
    else if (typeof window !== 'undefined' && Array.isArray(window.VOCAB)) {
      allWords = window.VOCAB.map(v => ({
        id: v.id || v.hanzi,
        hanzi: v.hanzi,
        pinyin: v.pinyin || v.py || '',
        vi: v.vi || '',
        pos: v.pos || '',
        topic: v.topic || ''
      }));
    }

    // Dự phòng an toàn nếu chưa nạp được dữ liệu
    if (allWords.length === 0) {
      allWords = [
        { id: 'w1', hanzi: '你好', pinyin: 'nǐ hǎo', vi: 'xin chào' },
        { id: 'w2', hanzi: '谢谢', pinyin: 'xièxie', vi: 'cảm ơn' },
        { id: 'w3', hanzi: '再见', pinyin: 'zàijiàn', vi: 'tạm biệt' },
        { id: 'w4', hanzi: '不客气', pinyin: 'bù kèqi', vi: 'không có gì' },
        { id: 'w5', hanzi: '对不起', pinyin: 'duìbuqǐ', vi: 'xin lỗi' },
        { id: 'w6', hanzi: '没关系', pinyin: 'méi guānxi', vi: 'không sao' },
        { id: 'w7', hanzi: '我', pinyin: 'wǒ', vi: 'tôi' },
        { id: 'w8', hanzi: '你', pinyin: 'nǐ', vi: 'bạn' },
        { id: 'w9', hanzi: '他', pinyin: 'tā', vi: 'anh ấy' },
        { id: 'w10', hanzi: '好', pinyin: 'hǎo', vi: 'tốt, khỏe' },
        { id: 'w11', hanzi: '是', pinyin: 'shì', vi: 'là, phải' },
        { id: 'w12', hanzi: '叫', pinyin: 'jiào', vi: 'gọi là, tên là' }
      ];
    }

    if (scope === 'all') {
      return allWords;
    }

    // Xử lý phạm vi "Từ đã học"
    try {
      const rawProgress = typeof localStorage !== 'undefined' ? localStorage.getItem('zh_learn_progress_v1') : null;
      if (rawProgress) {
        const progress = JSON.parse(rawProgress);
        const finishedLessons = new Set();

        if (progress && progress.lessons) {
          Object.entries(progress.lessons).forEach(([lessonId, lData]) => {
            if (lData && (lData.stars > 0 || lData.completed)) {
              finishedLessons.add(lessonId);
            }
          });
        }

        const learnedHanzi = new Set();
        if (typeof window !== 'undefined' && window.CURRICULUM && Array.isArray(window.CURRICULUM.levels)) {
          window.CURRICULUM.levels.forEach(lvl => {
            (lvl.units || []).forEach(unit => {
              (unit.lessons || []).forEach(les => {
                if (finishedLessons.has(les.id) && Array.isArray(les.newWords)) {
                  les.newWords.forEach(w => {
                    if (typeof w === 'string') learnedHanzi.add(w);
                    else if (w && w.hanzi) learnedHanzi.add(w.hanzi);
                  });
                }
              });
            });
          });
        }

        if (learnedHanzi.size > 0) {
          const learnedPool = allWords.filter(w => learnedHanzi.has(w.hanzi));
          // Nếu có đủ từ đã học để chơi (tối thiểu 8 từ), dùng danh sách này
          if (learnedPool.length >= 8) {
            return learnedPool;
          }
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc tiến độ học:', e);
    }

    // Nếu chưa có bài nào hoàn thành hoặc danh sách từ học quá ít => dùng tất cả
    return allWords;
  }

  /* ==========================================================================
     4. BEST SCORES STORAGE
     ========================================================================== */

  const BEST_STORAGE_KEY = 'zh_games_best';

  function getBestScores() {
    try {
      if (typeof localStorage === 'undefined') return {};
      const raw = localStorage.getItem(BEST_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveBestScore(gameId, score) {
    try {
      if (typeof localStorage === 'undefined') return false;
      const scores = getBestScores();
      const current = scores[gameId] || 0;
      if (score > current) {
        scores[gameId] = score;
        localStorage.setItem(BEST_STORAGE_KEY, JSON.stringify(scores));
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  /* ==========================================================================
     5. MINI-GAMES CONTROLLER & STATE
     ========================================================================== */

  const State = {
    container: null,
    scope: 'learned', // 'learned' | 'all'
    activeGame: null, // null | 'match' | 'rain' | 'listen'
    activeGameInstance: null
  };

  /**
   * Khởi tạo giao diện sảnh chính
   */
  function renderLobby() {
    if (!State.container) return;

    // Dừng game đang chạy nếu có
    if (State.activeGameInstance && typeof State.activeGameInstance.destroy === 'function') {
      State.activeGameInstance.destroy();
      State.activeGameInstance = null;
    }
    State.activeGame = null;

    const bestScores = getBestScores();
    const vocabPool = getVocabularyPool(State.scope);
    const soundText = SoundFX.enabled ? `${ic('volume')} Âm thanh: Bật` : `${ic('volume-x')} Âm thanh: Tắt`;

    State.container.innerHTML = `
      <div class="games-module">
        <header class="games-lobby-header">
          <h1 class="games-lobby-title">${ic('gamepad')} Trò Chơi Tiếng Trung</h1>
          <p class="games-lobby-desc">Luyện phản xạ Hán tự, Pinyin và thính lực qua các mini-game sinh động</p>
        </header>

        <section class="games-toolbar">
          <div class="games-filter-group">
            <span class="games-filter-label">Phạm vi từ vựng:</span>
            <div class="games-scope-selector">
              <button type="button" class="games-scope-btn ${State.scope === 'learned' ? 'active' : ''}" data-scope="learned">
                Từ đã học
              </button>
              <button type="button" class="games-scope-btn ${State.scope === 'all' ? 'active' : ''}" data-scope="all">
                Tất cả HSK1
              </button>
            </div>
            <span class="games-scope-count">(${vocabPool.length} từ khả dụng)</span>
          </div>

          <button type="button" class="games-sound-btn" id="games-sound-toggle">
            ${soundText}
          </button>
        </section>

        <div class="games-grid">
          <!-- Trò 1: Ghép cặp tốc độ -->
          <article class="game-card">
            <span class="game-card-badge">${ic('clock')} 60 Giây</span>
            <div>
              <span class="game-card-icon">${ic('zap')}</span>
              <h2 class="game-card-title">Ghép Cặp Tốc Độ</h2>
              <p class="game-card-desc">Lật và ghép 6 cặp chữ Hán ↔ nghĩa tiếng Việt thật nhanh. Càng ghép liên tiếp combo càng cao!</p>
            </div>
            <div class="game-card-footer">
              <div class="game-card-best">
                ${ic('trophy')} Kỷ lục: <strong>${bestScores.match || 0} đ</strong>
              </div>
              <button type="button" class="game-play-btn" data-start-game="match">
                Chơi ngay →
              </button>
            </div>
          </article>

          <!-- Trò 2: Mưa chữ -->
          <article class="game-card">
            <span class="game-card-badge">${ic('heart')} 3 Mạng</span>
            <div>
              <span class="game-card-icon">${ic('cloud-rain')}</span>
              <h2 class="game-card-title">Mưa Chữ Hán</h2>
              <p class="game-card-desc">Chữ Hán rơi từ trên cao xuống. Gõ pinyin (không dấu hoặc kèm số thanh) rồi Enter để bắn hạ!</p>
            </div>
            <div class="game-card-footer">
              <div class="game-card-best">
                ${ic('trophy')} Kỷ lục: <strong>${bestScores.rain || 0} đ</strong>
              </div>
              <button type="button" class="game-play-btn" data-start-game="rain">
                Chơi ngay →
              </button>
            </div>
          </article>

          <!-- Trò 3: Nghe chọn chữ -->
          <article class="game-card">
            <span class="game-card-badge">${ic('target')} 10 Câu</span>
            <div>
              <span class="game-card-icon">${ic('headphones')}</span>
              <h2 class="game-card-title">Nghe Chọn Chữ</h2>
              <p class="game-card-desc">Luyện thính lực qua phát âm chuẩn Bắc Kinh. Nghe từ và bấm chọn 1 trong 4 chữ Hán tương ứng.</p>
            </div>
            <div class="game-card-footer">
              <div class="game-card-best">
                ${ic('trophy')} Kỷ lục: <strong>${bestScores.listen || 0} đ</strong>
              </div>
              <button type="button" class="game-play-btn" data-start-game="listen">
                Chơi ngay →
              </button>
            </div>
          </article>
        </div>
      </div>
    `;

    // Sự kiện chuyển đổi phạm vi
    const scopeBtns = State.container.querySelectorAll('.games-scope-btn');
    scopeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        State.scope = btn.getAttribute('data-scope');
        renderLobby();
      });
    });

    // Sự kiện bật/tắt âm thanh
    const soundBtn = State.container.querySelector('#games-sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const isEnabled = SoundFX.toggle();
        soundBtn.innerHTML = isEnabled ? `${ic('volume')} Âm thanh: Bật` : `${ic('volume-x')} Âm thanh: Tắt`;
        SoundFX.play('correct');
      });
    }

    // Sự kiện bắt đầu trò chơi
    const playBtns = State.container.querySelectorAll('[data-start-game]');
    playBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const gameType = btn.getAttribute('data-start-game');
        startGame(gameType);
      });
    });
  }

  /**
   * Bắt đầu một trò chơi cụ thể
   */
  function startGame(gameType) {
    if (State.activeGameInstance && typeof State.activeGameInstance.destroy === 'function') {
      State.activeGameInstance.destroy();
    }
    State.activeGame = gameType;

    const pool = getVocabularyPool(State.scope);

    if (gameType === 'match') {
      State.activeGameInstance = new SpeedMatchGame(State.container, pool);
    } else if (gameType === 'rain') {
      State.activeGameInstance = new HanziRainGame(State.container, pool);
    } else if (gameType === 'listen') {
      State.activeGameInstance = new ListenPickGame(State.container, pool);
    }
    State.activeGameInstance.init();
  }

  /* ==========================================================================
     6. GAME 1: GHÉP CẶP TỐC ĐỘ (SPEED MATCH)
     ========================================================================== */

  class SpeedMatchGame {
    constructor(container, pool) {
      this.container = container;
      this.pool = pool;
      this.timeLeft = 60;
      this.timerId = null;
      this.score = 0;
      this.streak = 0;
      this.selectedCard = null;
      this.isBusy = false;
      this.missedWords = [];
      this.matchedPairsCount = 0;
    }

    init() {
      this.renderFrame();
      this.startTimer();
      this.generateNewGrid();
    }

    renderFrame() {
      this.container.innerHTML = `
        <div class="games-module">
          <div class="game-active-header">
            <button type="button" class="game-back-btn" id="match-back-btn">
              ← Về sảnh
            </button>
            <div class="game-stats-bar">
              <div class="game-stat-item timer">
                ⏱️ Thời gian: <strong id="match-timer">60s</strong>
              </div>
              <div class="game-stat-item score">
                Điểm: <strong id="match-score">0</strong>
              </div>
              <div id="match-combo-box"></div>
            </div>
          </div>

          <div class="match-game-wrapper">
            <div class="match-grid" id="match-grid"></div>
          </div>
        </div>
      `;

      const backBtn = this.container.querySelector('#match-back-btn');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          this.destroy();
          renderLobby();
        });
      }
    }

    startTimer() {
      const timerEl = this.container.querySelector('#match-timer');
      this.timerId = setInterval(() => {
        this.timeLeft--;
        if (timerEl) timerEl.textContent = `${this.timeLeft}s`;

        if (this.timeLeft <= 0) {
          this.destroy();
          SoundFX.play('gameover');
          showSummaryScreen('match', this.score, this.missedWords);
        }
      }, 1000);
    }

    generateNewGrid() {
      const gridEl = this.container.querySelector('#match-grid');
      if (!gridEl) return;
      gridEl.innerHTML = '';
      this.selectedCard = null;
      this.isBusy = false;

      // Chọn ngẫu nhiên 6 từ trong pool
      const shuffledPool = this.pool.slice().sort(() => 0.5 - Math.random());
      const selectedWords = shuffledPool.slice(0, Math.min(6, shuffledPool.length));

      // Tạo 12 thẻ (6 Hanzi, 6 Vi)
      const cards = [];
      selectedWords.forEach((w, idx) => {
        cards.push({
          id: `h_${idx}`,
          wordId: w.id || w.hanzi,
          type: 'hanzi',
          text: w.hanzi,
          wordObj: w
        });
        cards.push({
          id: `v_${idx}`,
          wordId: w.id || w.hanzi,
          type: 'vi',
          text: w.vi,
          wordObj: w
        });
      });

      // Xáo trộn 12 thẻ
      cards.sort(() => 0.5 - Math.random());

      cards.forEach(card => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `match-card ${card.type === 'hanzi' ? 'card-hanzi games-hanzi' : 'card-vi'}`;
        btn.setAttribute('data-card-id', card.id);
        btn.innerHTML = `<span class="match-card-content">${card.text}</span>`;
        btn.addEventListener('click', () => this.handleCardClick(btn, card));
        gridEl.appendChild(btn);
      });
    }

    handleCardClick(cardEl, cardData) {
      if (this.isBusy || cardEl.classList.contains('matched') || cardEl.classList.contains('selected')) {
        return;
      }

      // Thẻ thứ nhất
      if (!this.selectedCard) {
        this.selectedCard = { el: cardEl, data: cardData };
        cardEl.classList.add('selected');
        return;
      }

      // Thẻ thứ hai
      const first = this.selectedCard;

      // Nếu bấm cùng 1 loại (cùng chữ Hán hoặc cùng tiếng Việt) => chuyển vùng chọn
      if (first.data.type === cardData.type) {
        first.el.classList.remove('selected');
        this.selectedCard = { el: cardEl, data: cardData };
        cardEl.classList.add('selected');
        return;
      }

      // Khác loại: kiểm tra xem có cùng wordId không
      cardEl.classList.add('selected');
      this.isBusy = true;

      if (first.data.wordId === cardData.wordId) {
        // GHÉP ĐÚNG
        this.streak++;
        const pts = scoreCombo(10, this.streak);
        this.score += pts;
        this.updateStats();

        SoundFX.play('match');

        first.el.classList.remove('selected');
        cardEl.classList.remove('selected');
        first.el.classList.add('matched');
        cardEl.classList.add('matched');

        this.selectedCard = null;
        this.isBusy = false;
        this.matchedPairsCount++;

        // Kiểm tra xem đã hết cả 6 cặp chưa
        const gridEl = this.container.querySelector('#match-grid');
        const remaining = gridEl.querySelectorAll('.match-card:not(.matched)');
        if (remaining.length === 0) {
          // Thưởng hoàn thành bàn +25 điểm và tiếp tục lưới mới
          this.score += 25;
          this.updateStats();
          setTimeout(() => {
            this.generateNewGrid();
          }, 300);
        }
      } else {
        // GHÉP SAI
        this.streak = 0;
        this.updateStats();
        SoundFX.play('wrong');

        // Lưu từ vào danh sách sai để ôn
        if (first.data.wordObj && !this.missedWords.some(w => w.hanzi === first.data.wordObj.hanzi)) {
          this.missedWords.push(first.data.wordObj);
        }
        if (cardData.wordObj && !this.missedWords.some(w => w.hanzi === cardData.wordObj.hanzi)) {
          this.missedWords.push(cardData.wordObj);
        }

        first.el.classList.add('error');
        cardEl.classList.add('error');

        setTimeout(() => {
          first.el.classList.remove('selected', 'error');
          cardEl.classList.remove('selected', 'error');
          this.selectedCard = null;
          this.isBusy = false;
        }, 450);
      }
    }

    updateStats() {
      const scoreEl = this.container.querySelector('#match-score');
      if (scoreEl) scoreEl.textContent = this.score;

      const comboBox = this.container.querySelector('#match-combo-box');
      if (comboBox) {
        if (this.streak >= 2) {
          comboBox.innerHTML = `<span class="game-combo-pill">${ic('fire')} Combo x${this.streak}</span>`;
        } else {
          comboBox.innerHTML = '';
        }
      }
    }

    destroy() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      this.isBusy = false;
    }
  }

  /* ==========================================================================
     7. GAME 2: MƯA CHỮ HÁN (HANZI RAIN)
     ========================================================================== */

  class HanziRainGame {
    constructor(container, pool) {
      this.container = container;
      this.pool = pool;
      this.lives = 3;
      this.score = 0;
      this.streak = 0;
      this.fallingWords = []; // { id, word, x, y, speed, el }
      this.nextId = 1;
      this.spawnTimerId = null;
      this.animFrameId = null;
      this.lastTimestamp = 0;
      this.missedWords = [];
      this.isOver = false;
    }

    init() {
      this.renderFrame();
      this.bindControls();
      this.startSpawning();
      this.animFrameId = requestAnimationFrame(ts => this.gameLoop(ts));
    }

    renderFrame() {
      this.container.innerHTML = `
        <div class="games-module">
          <div class="game-active-header">
            <button type="button" class="game-back-btn" id="rain-back-btn">
              ← Về sảnh
            </button>
            <div class="game-stats-bar">
              <div class="game-stat-item lives" id="rain-lives">
                ${ic('heart', { fill: 'currentColor' }).repeat(3)}
              </div>
              <div class="game-stat-item score">
                Điểm: <strong id="rain-score">0</strong>
              </div>
              <div id="rain-combo-box"></div>
            </div>
          </div>

          <div class="rain-game-wrapper">
            <div class="rain-stage" id="rain-stage">
              <div class="rain-ground" id="rain-ground">
                ${ic('alert')} KHU VỰC NGUY HIỂM — ĐỪNG ĐỂ CHỮ CHẠM ĐẤT
              </div>
            </div>

            <div class="rain-control-bar">
              <input type="text"
                     class="rain-input"
                     id="rain-input"
                     placeholder="Gõ Pinyin (vd: nihao, ni3hao3) rồi ấn Enter..."
                     autocomplete="off"
                     autocorrect="off"
                     autocapitalize="off"
                     spellcheck="false" />
              <button type="button" class="rain-fire-btn" id="rain-fire-btn">
                Bắn ${ic('rocket')}
              </button>
            </div>
          </div>
        </div>
      `;

      const input = this.container.querySelector('#rain-input');
      if (input) setTimeout(() => input.focus(), 50);
    }

    bindControls() {
      const backBtn = this.container.querySelector('#rain-back-btn');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          this.destroy();
          renderLobby();
        });
      }

      const input = this.container.querySelector('#rain-input');
      const fireBtn = this.container.querySelector('#rain-fire-btn');

      const submitAttempt = () => {
        if (!input || this.isOver) return;
        const text = input.value.trim();
        if (!text) return;
        this.checkAnswer(text, input);
      };

      if (input) {
        input.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            submitAttempt();
          }
        });
      }

      if (fireBtn) {
        fireBtn.addEventListener('click', e => {
          e.preventDefault();
          submitAttempt();
        });
      }
    }

    startSpawning() {
      const spawnNext = () => {
        if (this.isOver) return;
        this.spawnWord();
        // Tốc độ spawn giảm dần nhẹ theo điểm số (nhanh hơn khi điểm cao)
        const delay = Math.max(1400, 2600 - Math.floor(this.score / 50) * 150);
        this.spawnTimerId = setTimeout(spawnNext, delay);
      };
      this.spawnTimerId = setTimeout(spawnNext, 800);
    }

    spawnWord() {
      if (this.isOver) return;
      const stage = this.container.querySelector('#rain-stage');
      if (!stage) return;

      // Tối đa 3 chữ rơi cùng lúc để màn hình gọn gàng
      if (this.fallingWords.length >= 3) return;

      const word = this.pool[Math.floor(Math.random() * this.pool.length)];
      if (!word) return;

      const el = document.createElement('div');
      el.className = 'rain-word-drop';
      el.innerHTML = `
        <span class="rain-word-hanzi games-hanzi">${word.hanzi}</span>
        <span class="rain-word-hint">${word.vi}</span>
      `;

      // Vị trí X ngẫu nhiên từ 15% đến 85%
      const xPercent = 15 + Math.random() * 70;
      el.style.left = `${xPercent}%`;
      el.style.top = '0px';

      stage.appendChild(el);

      // Tốc độ rơi tính theo pixel mỗi giây
      const baseSpeed = 40 + Math.min(60, Math.floor(this.score / 60) * 8);

      this.fallingWords.push({
        id: this.nextId++,
        word,
        x: xPercent,
        y: 0,
        speed: baseSpeed,
        el
      });
    }

    gameLoop(timestamp) {
      if (this.isOver) return;

      if (!this.lastTimestamp) this.lastTimestamp = timestamp;
      const dt = (timestamp - this.lastTimestamp) / 1000;
      this.lastTimestamp = timestamp;

      const stage = this.container.querySelector('#rain-stage');
      const maxHeight = stage ? stage.clientHeight - 48 : 300;

      for (let i = this.fallingWords.length - 1; i >= 0; i--) {
        const item = this.fallingWords[i];
        item.y += item.speed * dt;
        if (item.el) {
          item.el.style.top = `${item.y}px`;
        }

        // Chạm đất
        if (item.y >= maxHeight) {
          this.handleWordHitGround(item, i);
        }
      }

      if (!this.isOver) {
        this.animFrameId = requestAnimationFrame(ts => this.gameLoop(ts));
      }
    }

    handleWordHitGround(item, index) {
      if (item.el && item.el.parentNode) {
        item.el.parentNode.removeChild(item.el);
      }
      this.fallingWords.splice(index, 1);

      this.lives--;
      this.streak = 0;
      this.updateStats();

      // Lưu từ sai để ôn
      if (item.word && !this.missedWords.some(w => w.hanzi === item.word.hanzi)) {
        this.missedWords.push(item.word);
      }

      SoundFX.play('wrong');

      const ground = this.container.querySelector('#rain-ground');
      if (ground) {
        ground.classList.remove('danger-flash');
        void ground.offsetWidth;
        ground.classList.add('danger-flash');
      }

      if (this.lives <= 0) {
        this.destroy();
        SoundFX.play('gameover');
        showSummaryScreen('rain', this.score, this.missedWords);
      }
    }

    checkAnswer(inputVal, inputEl) {
      // Tìm từ rơi gần mặt đất nhất (ưu tiên cao nhất) mà pinyin khớp
      let matchedIndex = -1;
      let maxY = -1;

      for (let i = 0; i < this.fallingWords.length; i++) {
        const item = this.fallingWords[i];
        if (matchPinyinLoose(inputVal, item.word.pinyin)) {
          if (item.y > maxY) {
            maxY = item.y;
            matchedIndex = i;
          }
        }
      }

      if (matchedIndex !== -1) {
        // Bắn trúng!
        const hitItem = this.fallingWords[matchedIndex];
        this.fallingWords.splice(matchedIndex, 1);

        this.streak++;
        const pts = scoreCombo(15, this.streak);
        this.score += pts;
        this.updateStats();

        SoundFX.play('hit');

        if (hitItem.el) {
          hitItem.el.classList.add('exploding');
          setTimeout(() => {
            if (hitItem.el && hitItem.el.parentNode) {
              hitItem.el.parentNode.removeChild(hitItem.el);
            }
          }, 350);
        }

        inputEl.value = '';
      } else {
        // Gõ sai
        inputEl.classList.remove('shake');
        void inputEl.offsetWidth;
        inputEl.classList.add('shake');
        setTimeout(() => inputEl.classList.remove('shake'), 300);
      }
    }

    updateStats() {
      const scoreEl = this.container.querySelector('#rain-score');
      if (scoreEl) scoreEl.textContent = this.score;

      const livesEl = this.container.querySelector('#rain-lives');
      if (livesEl) {
        let hearts = '';
        for (let i = 0; i < 3; i++) {
          hearts += i < this.lives
            ? ic('heart', { fill: 'currentColor' })
            : ic('heart', { strokeWidth: 1.5, className: 'heart-empty' });
        }
        livesEl.innerHTML = hearts;
      }

      const comboBox = this.container.querySelector('#rain-combo-box');
      if (comboBox) {
        if (this.streak >= 2) {
          comboBox.innerHTML = `<span class="game-combo-pill">${ic('fire')} Combo x${this.streak}</span>`;
        } else {
          comboBox.innerHTML = '';
        }
      }
    }

    destroy() {
      this.isOver = true;
      if (this.spawnTimerId) {
        clearTimeout(this.spawnTimerId);
        this.spawnTimerId = null;
      }
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
      this.fallingWords.forEach(item => {
        if (item.el && item.el.parentNode) {
          item.el.parentNode.removeChild(item.el);
        }
      });
      this.fallingWords = [];
    }
  }

  /* ==========================================================================
     8. GAME 3: NGHE CHỌN CHỮ (LISTEN & PICK)
     ========================================================================== */

  class ListenPickGame {
    constructor(container, pool) {
      this.container = container;
      this.pool = pool;
      this.currentRound = 0;
      this.totalRounds = 10;
      this.score = 0;
      this.streak = 0;
      this.currentTarget = null;
      this.missedWords = [];
      this.isAnswering = false;
      this.keyHandler = null;
      this.advanceTimerId = null;
    }

    init() {
      this.renderFrame();
      this.bindKeys();
      this.nextQuestion();
    }

    renderFrame() {
      this.container.innerHTML = `
        <div class="games-module">
          <div class="game-active-header">
            <button type="button" class="game-back-btn" id="listen-back-btn">
              ← Về sảnh
            </button>
            <div class="game-stats-bar">
              <div class="game-stat-item">
                Câu: <strong id="listen-round-num">1/10</strong>
              </div>
              <div class="game-stat-item score">
                Điểm: <strong id="listen-score">0</strong>
              </div>
              <div id="listen-combo-box"></div>
            </div>
          </div>

          <div class="listen-game-wrapper">
            <div class="listen-progress-line">
              <div class="listen-progress-fill" id="listen-progress-fill" style="width: 10%;"></div>
            </div>

            <div class="listen-audio-card">
              <button type="button" class="listen-speaker-btn" id="listen-speak-btn" title="Bấm để nghe lại">
                ${ic('volume')}
              </button>
              <div class="listen-audio-prompt">Bấm loa để nghe phát âm, sau đó chọn chữ Hán đúng:</div>
            </div>

            <div class="listen-options-grid" id="listen-options-grid"></div>
          </div>
        </div>
      `;

      const backBtn = this.container.querySelector('#listen-back-btn');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          this.destroy();
          renderLobby();
        });
      }

      const speakBtn = this.container.querySelector('#listen-speak-btn');
      if (speakBtn) {
        speakBtn.addEventListener('click', () => {
          if (this.currentTarget) {
            speakChinese(this.currentTarget.hanzi);
            speakBtn.classList.remove('pulsing');
            void speakBtn.offsetWidth;
            speakBtn.classList.add('pulsing');
          }
        });
      }
    }

    bindKeys() {
      this.keyHandler = e => {
        if (this.isAnswering) return;
        const key = e.key.toUpperCase();
        let optIndex = -1;
        if (key === '1' || key === 'A') optIndex = 0;
        else if (key === '2' || key === 'B') optIndex = 1;
        else if (key === '3' || key === 'C') optIndex = 2;
        else if (key === '4' || key === 'D') optIndex = 3;

        if (optIndex !== -1) {
          const btns = this.container.querySelectorAll('.listen-opt-btn');
          if (btns && btns[optIndex]) {
            btns[optIndex].click();
          }
        }
      };
      window.addEventListener('keydown', this.keyHandler);
    }

    nextQuestion() {
      this.currentRound++;
      if (this.currentRound > this.totalRounds) {
        this.destroy();
        SoundFX.play('record');
        showSummaryScreen('listen', this.score, this.missedWords);
        return;
      }

      this.isAnswering = false;

      // Cập nhật thông số câu hỏi
      const roundNumEl = this.container.querySelector('#listen-round-num');
      if (roundNumEl) roundNumEl.textContent = `${this.currentRound}/${this.totalRounds}`;

      const progressFill = this.container.querySelector('#listen-progress-fill');
      if (progressFill) {
        progressFill.style.width = `${(this.currentRound / this.totalRounds) * 100}%`;
      }

      // Chọn 1 từ đích và 3 từ gây nhiễu
      const target = this.pool[Math.floor(Math.random() * this.pool.length)];
      this.currentTarget = target;

      const distractors = pickDistractors(target, this.pool, 3);
      const options = [target, ...distractors].sort(() => 0.5 - Math.random());

      // Phát âm từ đích
      speakChinese(target.hanzi);

      const speakBtn = this.container.querySelector('#listen-speak-btn');
      if (speakBtn) {
        speakBtn.classList.remove('pulsing');
        void speakBtn.offsetWidth;
        speakBtn.classList.add('pulsing');
      }

      // Render 4 đáp án
      const gridEl = this.container.querySelector('#listen-options-grid');
      if (!gridEl) return;
      gridEl.innerHTML = '';

      const letters = ['A', 'B', 'C', 'D'];
      options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'listen-opt-btn';
        btn.innerHTML = `
          <span class="listen-opt-badge">${letters[idx]}</span>
          <span class="listen-opt-hanzi games-hanzi">${opt.hanzi}</span>
        `;
        btn.addEventListener('click', () => this.handleSelectOption(btn, opt, target));
        gridEl.appendChild(btn);
      });
    }

    handleSelectOption(selectedBtn, chosenWord, targetWord) {
      if (this.isAnswering) return;
      this.isAnswering = true;

      const allBtns = this.container.querySelectorAll('.listen-opt-btn');

      if (chosenWord.hanzi === targetWord.hanzi) {
        // ĐÚNG
        selectedBtn.classList.add('correct');
        this.streak++;
        const pts = scoreCombo(20, this.streak);
        this.score += pts;
        this.updateStats();
        SoundFX.play('correct');
      } else {
        // SAI
        selectedBtn.classList.add('wrong');
        this.streak = 0;
        this.updateStats();
        SoundFX.play('wrong');

        if (!this.missedWords.some(w => w.hanzi === targetWord.hanzi)) {
          this.missedWords.push(targetWord);
        }

        // Đánh dấu thẻ đúng để người chơi nhận diện
        allBtns.forEach(btn => {
          const hanziEl = btn.querySelector('.listen-opt-hanzi');
          if (hanziEl && hanziEl.textContent === targetWord.hanzi) {
            btn.classList.add('highlight-correct');
          }
        });
      }

      this.advanceTimerId = setTimeout(() => {
        this.nextQuestion();
      }, 850);
    }

    updateStats() {
      const scoreEl = this.container.querySelector('#listen-score');
      if (scoreEl) scoreEl.textContent = this.score;

      const comboBox = this.container.querySelector('#listen-combo-box');
      if (comboBox) {
        if (this.streak >= 2) {
          comboBox.innerHTML = `<span class="game-combo-pill">${ic('fire')} Combo x${this.streak}</span>`;
        } else {
          comboBox.innerHTML = '';
        }
      }
    }

    destroy() {
      this.isAnswering = true;
      if (this.advanceTimerId) {
        clearTimeout(this.advanceTimerId);
        this.advanceTimerId = null;
      }
      if (this.keyHandler) {
        window.removeEventListener('keydown', this.keyHandler);
        this.keyHandler = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  }

  /* ==========================================================================
     9. SUMMARY SCREEN & ECONOMY INTEGRATION
     ========================================================================== */

  /**
   * Hiển thị màn tổng kết sau khi kết thúc một ván chơi
   */
  function showSummaryScreen(gameType, score, missedWords) {
    if (!State.container) return;

    // Lưu kỷ lục cá nhân
    const isNewRecord = saveBestScore(gameType, score);
    const bestScores = getBestScores();
    const currentBest = bestScores[gameType] || score;

    // Trao thưởng Economy
    const rewards = calculateGameRewards(score);
    if (typeof window !== 'undefined' && window.Economy && typeof window.Economy.earn === 'function') {
      try {
        window.Economy.earn('game', rewards);
      } catch (e) {
        console.warn('Lỗi gọi window.Economy:', e);
      }
    }

    let gameTitle = 'Ghép cặp';
    if (gameType === 'rain') gameTitle = 'Mưa chữ Hán';
    if (gameType === 'listen') gameTitle = 'Nghe chọn chữ';

    const recordHtml = isNewRecord
      ? `<div class="summary-badge-record">${ic('trophy')} Kỷ lục mới xuất sắc!</div>`
      : `<div class="summary-score-label">Kỷ lục của bạn: <strong>${currentBest} điểm</strong></div>`;

    // Render danh sách từ sai để ôn
    let reviewHtml = '';
    if (missedWords && missedWords.length > 0) {
      const wordItems = missedWords.map(w => `
        <div class="summary-review-item">
          <div class="summary-review-word">
            <span class="summary-review-hanzi games-hanzi">${w.hanzi}</span>
            <span class="summary-review-py">${w.pinyin || ''}</span>
            <span class="summary-review-vi">${w.vi || ''}</span>
          </div>
          <button type="button" class="summary-review-audio-btn" data-audio-hanzi="${w.hanzi}" title="Nghe phát âm">
            ${ic('volume')}
          </button>
        </div>
      `).join('');

      reviewHtml = `
        <div class="summary-review-box">
          <div class="summary-review-title">
            <span>${ic('pen')} Từ cần ôn lại (${missedWords.length} từ):</span>
          </div>
          <div class="summary-review-list">
            ${wordItems}
          </div>
        </div>
      `;
    } else {
      reviewHtml = `
        <div class="summary-review-box">
          <div class="summary-review-perfect">
            ${ic('sparkle')} Hoàn hảo! Bạn không sai bất kỳ từ nào trong ván này!
          </div>
        </div>
      `;
    }

    State.container.innerHTML = `
      <div class="games-module">
        <div class="games-summary-card">
          <h2 class="summary-title">${ic('trophy')} Tổng Kết — ${gameTitle}</h2>

          <div class="summary-score-box">
            <div class="summary-score-num">${score}</div>
            <div class="summary-score-label">Điểm số đạt được</div>
          </div>

          ${recordHtml}

          <div class="summary-rewards">
            <span class="reward-chip coins">+${rewards.coins} Xu ${ic('coin')}</span>
            <span class="reward-chip xp">+${rewards.xp} XP ${ic('zap')}</span>
          </div>

          ${reviewHtml}

          <div class="summary-actions">
            <button type="button" class="summary-btn retry" id="summary-retry-btn">
              ${ic('refresh')} Chơi lại
            </button>
            <button type="button" class="summary-btn lobby" id="summary-lobby-btn">
              ${ic('home')} Về sảnh trò chơi
            </button>
          </div>
        </div>
      </div>
    `;

    // Sự kiện nghe lại phát âm các từ sai
    const audioBtns = State.container.querySelectorAll('[data-audio-hanzi]');
    audioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-audio-hanzi');
        if (text) speakChinese(text);
      });
    });

    // Nút chơi lại
    const retryBtn = State.container.querySelector('#summary-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        startGame(gameType);
      });
    }

    // Nút về sảnh
    const lobbyBtn = State.container.querySelector('#summary-lobby-btn');
    if (lobbyBtn) {
      lobbyBtn.addEventListener('click', () => {
        renderLobby();
      });
    }
  }

  /* ==========================================================================
     10. PUBLIC API INTERFACE (window.MiniGames)
     ========================================================================== */

  const MiniGames = {
    stripTones,
    matchPinyinLoose,
    pickDistractors,
    scoreCombo,
    convertPinyinNumbersToMarks,
    calculateGameRewards,
    getVocabularyPool,
    SoundFX,

    mount(containerEl) {
      if (!containerEl) {
        console.error('[MiniGames] containerEl không hợp lệ');
        return;
      }
      State.container = containerEl;
      SoundFX.init();
      renderLobby();
    },

    onShow() {
      // Khi tab hiển thị lại: nếu chưa có sảnh thì render sảnh
      if (State.container && !State.activeGameInstance) {
        renderLobby();
      }
    },

    onHide() {
      // Dừng toàn bộ timer, hoạt ảnh và âm thanh khi rời tab
      if (State.activeGameInstance && typeof State.activeGameInstance.destroy === 'function') {
        State.activeGameInstance.destroy();
        State.activeGameInstance = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.MiniGames = MiniGames;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      stripTones,
      matchPinyinLoose,
      pickDistractors,
      scoreCombo,
      convertPinyinNumbersToMarks,
      calculateGameRewards,
      getVocabularyPool,
      MiniGames
    };
  }
})();
