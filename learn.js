/**
 * learn.js - Lộ trình học bài bản Polylingo (#zh/learn, #en/learn)
 * Thiết kế cho nền tảng đa ngôn ngữ Polylingo (HTML/CSS/JS thuần, không framework)
 * Cấu trúc: CẤP → BÀI THEO CHỦ ĐỀ → NHÓM 5 TỪ (4 BƯỚC) → THẺ TỪ ĐẦY ĐỦ
 */

(function () {
  'use strict';

  const STORAGE_KEY_ZH = 'zh_learn_progress_v1';
  const STORAGE_KEY_EN = 'en_learn_progress_v1';

  /* ==========================================================================
     0. BIỂU TƯỢNG SVG NỘI TUYẾN KIỂU LUCIDE (Stroke 2px, Round caps, Aria-label)
     Lấy từ window.PolyIcons nếu có sẵn, giữ bản dự phòng FALLBACK_ICONS cho Node test
     ========================================================================== */

  const FALLBACK_ICONS = {
    speaker: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Phát âm" role="img"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`,
    speakerSlow: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Phát âm chậm 0.7x" role="img"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
    play: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Phát" role="img"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
    pause: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Tạm dừng" role="img"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
    eye: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Hiện chữ" role="img"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
    eyeOff: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Che chữ" role="img"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`,
    check: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Đã hoàn thành" role="img"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    repeat: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Lặp lại" role="img"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>`,
    arrowLeft: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Quay lại" role="img"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Tiếp theo" role="img"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
    starFilled: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Đạt sao" role="img"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    starOutline: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Chưa đạt sao" role="img"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    lock: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Khóa" role="img"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
    book: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Sách từ vựng" role="img"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    bookmark: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Lưu vào thẻ ôn" role="img"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`,
    close: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Đóng" role="img"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    trophy: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Kiểm tra chặng" role="img"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34"></path><path d="M6 2h12v7a6 6 0 0 1-12 0V2z"></path></svg>`,
    clock: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Thời lượng" role="img"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    sparkle: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Điểm mới" role="img"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"></path></svg>`,
    lightbulb: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" role="img"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>`
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
     1. TỪ VỰNG DỰ PHÒNG & GIẢI MÃ TỪ VỰNG AN TOÀN
     ========================================================================== */

  const FALLBACK_WORDS = {
    '啊': { py: 'ā', vi: 'a, a ha (thán từ)', hv: 'a', pos: 'thán từ', ex: { zh: '啊，太好了！', py: 'Ā, tài hǎo le!', vi: 'A, tuyệt quá!' } },
    '喔': { py: 'ō', vi: 'ồ, ô (tiếng gà gáy, thán từ)', hv: 'ác', pos: 'thán từ', ex: { zh: '喔，我知道了。', py: 'Ō, wǒ zhīdào le.', vi: 'Ồ, tôi biết rồi.' } },
    '鹅': { py: 'é', vi: 'con ngỗng', hv: 'nga', pos: 'danh từ', ex: { zh: '白鹅在水里游泳。', py: 'Bái é zài shuǐ lǐ yóuyǒng.', vi: 'Ngỗng trắng bơi dưới nước.' } },
    '衣': { py: 'yī', vi: 'áo, quần áo', hv: 'y', pos: 'danh từ', ex: { zh: '这是一件新衣服。', py: 'Zhè释 shì yí jiàn xīn yīfu.', vi: 'Đây là một chiếc áo mới.' } },
    '乌': { py: 'wū', vi: 'đen, con quạ', hv: 'ô', pos: 'tính từ', ex: { zh: '天上有乌云。', py: 'Tiān shàng yǒu wūyún.', vi: 'Trên trời có mây đen.' } },
    '怕': { py: 'pà', vi: 'sợ, sợ hãi', hv: 'phạ', pos: 'động từ', ex: { zh: '爸爸不怕冷。', py: 'Bàba bú pà lěng.', vi: 'Bố không sợ lạnh.' } },
    '发': { py: 'fā', vi: 'phát ra, gửi đi', hv: 'phát', pos: 'động từ', ex: { zh: '发电子邮件。', py: 'Fā diànzǐ yóujiàn.', vi: 'Gửi thư điện tử.' } },
    '爬': { py: 'pá', vi: 'leo, trèo, bò', hv: 'bà', pos: 'động từ', ex: { zh: '我们去爬山吧。', py: 'Wǒmen qù páshān ba.', vi: 'Chúng mình đi leo núi đi.' } },
    '飞': { py: 'fēi', vi: 'bay', hv: 'phi', pos: 'động từ', ex: { zh: '小鸟在天上飞。', py: 'Xiǎoniǎo zài tiānshàng fēi.', vi: 'Chim non bay trên trời.' } },
    '白': { py: 'bái', vi: 'trắng, màu trắng', hv: 'bạch', pos: 'tính từ', ex: { zh: '白色的衣服很好看。', py: 'Báisè de yīfu hěn hǎokàn.', vi: 'Áo màu trắng rất đẹp.' } },
    '歌': { py: 'gē', vi: 'bài hát, ca khúc', hv: 'ca', pos: 'danh từ', ex: { zh: '他在唱歌。', py: 'Tā zài chànggē.', vi: 'Anh ấy đang hát bài hát.' } },
    '哭': { py: 'kū', vi: 'khóc', hv: 'khốc', pos: 'động từ', ex: { zh: '小弟弟不要哭。', py: 'Xiǎo dìdi bú yào kū.', vi: 'Em trai nhỏ đừng khóc.' } },
    '渴': { py: 'kě', vi: 'khát (nước)', hv: 'khát', pos: 'tính từ', ex: { zh: '我渴了，想喝水。', py: 'Wǒ kě le, xiǎng hē shuǐ.', vi: 'Tôi khát rồi, muốn uống nước.' } },
    '句': { py: 'jù', vi: 'câu (lượng từ, danh từ)', hv: 'cú', pos: 'lượng từ', ex: { zh: '请说一句话。', py: 'Qǐng shuō yí jù huà.', vi: 'Xin hãy nói một câu.' } },
    '绿': { py: 'lǜ', vi: 'xanh lá cây', hv: 'lục', pos: 'tính từ', ex: { zh: '绿色的草地。', py: 'Lǜsè de cǎodì.', vi: 'Bãi cỏ xanh mướt.' } }
  };

  let nodeEnWords = null;
  let nodeZhWords = null;
  if (typeof require !== 'undefined') {
    try {
      const wa = require('./data/en/words-a.js');
      const wb = require('./data/en/words-b.js');
      nodeEnWords = Object.assign({}, wa.EN_WORDS || wa, wb.EN_WORDS || wb);
    } catch (_) {}
    try {
      const ha = require('./data/zh/hsk1-words-a.js');
      const hb = require('./data/zh/hsk1-words-b.js');
      nodeZhWords = Object.assign({}, ha.HSK1_WORDS || ha, hb.HSK1_WORDS || hb);
    } catch (_) {}
  }

  function resolveWord(rawKey, customDict = null) {
    if (!rawKey) return null;
    const key = typeof rawKey === 'string' ? rawKey.trim() : (rawKey.word || rawKey.hanzi || '');
    const lowerKey = key.toLowerCase();

    // 1. Từ điển tùy chỉnh truyền vào (bỏ qua nếu truyền nhầm curriculum object)
    if (customDict && !customDict.levels) {
      if (customDict[key] || customDict[lowerKey]) {
        const w = customDict[key] || customDict[lowerKey];
        const wKey = w.word || w.hanzi || key;
        return {
          hanzi: wKey,
          word: wKey,
          pinyin: w.ipa || w.pinyin || w.py || '',
          ipa: w.ipa || '',
          vi: w.vi || '',
          hanViet: w.hv || w.hanViet || '',
          pos: w.pos || '',
          note: w.note || '',
          ex: w.ex ? {
            zh: w.ex.zh || w.ex.en || '',
            en: w.ex.en || w.ex.zh || '',
            py: w.ex.py || w.ipa || '',
            vi: w.ex.vi || ''
          } : null
        };
      }
    }

    // 2. Tra cứu từ điển toàn cục theo tiếng Anh
    if (typeof window !== 'undefined' && window.EN_WORDS) {
      if (window.EN_WORDS[key] || window.EN_WORDS[lowerKey]) {
        const ew = window.EN_WORDS[key] || window.EN_WORDS[lowerKey];
        const wKey = ew.word || key;
        return {
          hanzi: wKey,
          word: wKey,
          pinyin: ew.ipa || '',
          ipa: ew.ipa || '',
          vi: ew.vi || '',
          hanViet: '',
          pos: ew.pos || '',
          note: ew.note || '',
          ex: ew.ex ? {
            zh: ew.ex.en,
            en: ew.ex.en,
            py: ew.ipa || '',
            vi: ew.ex.vi || ''
          } : null
        };
      }
    }

    if (nodeEnWords && (nodeEnWords[key] || nodeEnWords[lowerKey])) {
      const ew = nodeEnWords[key] || nodeEnWords[lowerKey];
      const wKey = ew.word || key;
      return {
        hanzi: wKey,
        word: wKey,
        pinyin: ew.ipa || '',
        ipa: ew.ipa || '',
        vi: ew.vi || '',
        hanViet: '',
        pos: ew.pos || '',
        note: ew.note || '',
        ex: ew.ex ? {
          zh: ew.ex.en,
          en: ew.ex.en,
          py: ew.ipa || '',
          vi: ew.ex.vi || ''
        } : null
      };
    }

    // 3. Tra cứu HSK1_WORDS
    if (typeof window !== 'undefined' && window.HSK1_WORDS && window.HSK1_WORDS[key]) {
      const w = window.HSK1_WORDS[key];
      return {
        hanzi: key,
        word: key,
        pinyin: w.py || w.pinyin || '',
        ipa: '',
        vi: w.vi || '',
        hanViet: w.hv || w.hanViet || '',
        pos: w.pos || '',
        note: w.note || '',
        ex: w.ex || (w.example ? { zh: w.example.zh, py: w.example.py, vi: w.example.vi } : null)
      };
    }

    if (nodeZhWords && nodeZhWords[key]) {
      const w = nodeZhWords[key];
      return {
        hanzi: key,
        word: key,
        pinyin: w.py || w.pinyin || '',
        ipa: '',
        vi: w.vi || '',
        hanViet: w.hv || w.hanViet || '',
        pos: w.pos || '',
        note: w.note || '',
        ex: w.ex || (w.example ? { zh: w.example.zh, py: w.example.py, vi: w.example.vi } : null)
      };
    }

    // 4. Tra cứu VOCAB mảng nếu có
    if (typeof window !== 'undefined' && Array.isArray(window.VOCAB)) {
      const found = window.VOCAB.find(v => v.hanzi === key || v.word === key);
      if (found) {
        return {
          hanzi: found.hanzi || found.word || key,
          word: found.word || found.hanzi || key,
          pinyin: found.pinyin || found.py || '',
          ipa: found.ipa || '',
          vi: found.vi || '',
          hanViet: found.hv || found.hanViet || '',
          pos: found.pos || '',
          note: found.note || '',
          ex: found.ex || null
        };
      }
    }

    // 5. Fallback từ vựng cục bộ
    if (FALLBACK_WORDS[key]) {
      const f = FALLBACK_WORDS[key];
      return {
        hanzi: key,
        word: key,
        pinyin: f.py,
        ipa: '',
        vi: f.vi,
        hanViet: f.hv || '',
        pos: f.pos || '',
        note: f.note || '',
        ex: f.ex
      };
    }

    // Trả về đối tượng tối thiểu nếu không tìm thấy
    return {
      hanzi: key,
      word: key,
      pinyin: '',
      ipa: '',
      vi: '',
      hanViet: '',
      pos: '',
      note: '',
      ex: null
    };
  }

  /* ==========================================================================
     2. ÂM THANH WEB AUDIO & SPEECH SYNTHESIS
     ========================================================================== */

  let audioCtx = null;
  function getAudioCtx() {
    if (typeof window === 'undefined') return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function playTone(type) {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

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
  }

  function speakText(text, lang = null, rate = 1.0) {
    if (typeof window === 'undefined' || !window.speechSynthesis || !text) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const targetLang = lang || (typeof LearnPath !== 'undefined' && LearnPath.lang === 'en' ? 'en-US' : 'zh-CN');
      utterance.lang = targetLang;
      utterance.rate = rate;

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const prefix = targetLang.slice(0, 2).toLowerCase();
        const matched = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
        if (matched) utterance.voice = matched;
      }
      window.speechSynthesis.speak(utterance);
    } catch (_) {}
  }

  /* ==========================================================================
     3. CÁC HÀM THUẦN (PURE UTILITIES - ĐƯỢC TEST TRỰC TIẾP)
     ========================================================================== */

  /**
   * Tính số sao theo phần trăm đúng (Quy tắc mới: 3 sao >= 90%, 2 sao >= 75%, 1 sao >= 60%, dưới 60% = 0 sao)
   */
  function starsFor(pct) {
    if (typeof pct !== 'number' || isNaN(pct)) return 0;
    if (pct >= 90) return 3;
    if (pct >= 75) return 2;
    if (pct >= 60) return 1;
    return 0;
  }

  /**
   * Nhãn tiến độ bước học: không bao giờ vượt quá totalSteps/totalSteps,
   * khi xong hiện "Hoàn thành {groupLabel}" (hoặc "Chưa đạt" nếu nhóm dưới 60%).
   */
  function getStepSummaryLabel(currentStep, groupLabel, totalSteps = 4, passed = true) {
    if (currentStep > totalSteps) {
      return passed ? `Hoàn thành ${groupLabel}` : `Chưa đạt ${groupLabel}`;
    }
    const safeStep = Math.min(Math.max(currentStep, 1), totalSteps);
    return `Bước ${safeStep}/${totalSteps} • ${groupLabel}`;
  }

  /**
   * Tính kết quả bài học khi xong mọi nhóm:
   * Bài chỉ hoàn thành khi MỌI nhóm đã xong (done: true, >= 60%).
   * Số sao: 3 sao >= 90%, 2 sao >= 75%, 1 sao >= 60% (trung bình các nhóm).
   */
  function calculateLessonResult(totalGroups, groups) {
    if (!totalGroups || totalGroups <= 0) return { isComplete: false, pct: 0, stars: 0 };
    const groupIndices = Array.from({ length: totalGroups }, (_, i) => i);
    const grps = groups || {};
    const allDone = groupIndices.every(idx => grps[idx] && grps[idx].done === true);
    if (!allDone) {
      return { isComplete: false, pct: 0, stars: 0 };
    }
    let sumPct = 0;
    for (let idx of groupIndices) {
      const g = grps[idx];
      let gPct = 0;
      if (typeof g.pct === 'number') {
        gPct = g.pct;
      } else if (typeof g.correctCount === 'number' && g.totalCount > 0) {
        gPct = Math.round((g.correctCount / g.totalCount) * 100);
      } else if (g.done) {
        gPct = 100;
      }
      sumPct += gPct;
    }
    const avgPct = Math.round(sumPct / totalGroups);
    const stars = starsFor(avgPct);
    return {
      isComplete: stars >= 1,
      pct: avgPct,
      stars: stars
    };
  }

  /**
   * Lấy danh sách cấp độ đang mở
   */
  function getOpenLevels(curriculum) {
    if (!curriculum || !Array.isArray(curriculum.levels)) return [];
    return curriculum.levels.filter(lvl => {
      if (lvl.locked) return false;
      if (curriculum.standard && curriculum.standard.includes('HSK')) {
        return lvl.id === 'intro' || lvl.id === 'hsk1';
      }
      return true;
    });
  }

  /**
   * Kiểm tra bài học đã mở khóa chưa
   * Hỗ trợ linh hoạt cả 2 chữ ký:
   * 1. isLessonUnlocked(curriculum, progress, lessonId)
   * 2. isLessonUnlocked(lessonId, curriculum, progress)
   */
  function isLessonUnlocked(arg1, arg2, arg3) {
    let curriculum = null;
    let progress = null;
    let lessonId = null;

    if (typeof arg1 === 'string') {
      lessonId = arg1;
      curriculum = arg2;
      progress = arg3;
    } else if (typeof arg3 === 'string') {
      curriculum = arg1;
      progress = arg2;
      lessonId = arg3;
    } else if (arg1 && arg1.levels) {
      curriculum = arg1;
      lessonId = typeof arg2 === 'string' ? arg2 : arg3;
      progress = typeof arg2 === 'object' ? arg2 : arg3;
    }

    if (!curriculum || !lessonId) return false;
    const prog = progress || { lessons: {}, checkpoints: {} };

    const isLessonCompleted = (lId) => {
      if (!prog || !prog.lessons || !prog.lessons[lId]) return false;
      const rec = prog.lessons[lId];
      if (rec === true) return true;
      if (typeof rec === 'object') {
        if (typeof rec.stars === 'number') return rec.stars >= 1;
        if (typeof rec.done === 'boolean') return rec.done;
        if (typeof rec.score === 'number') return rec.score >= 60;
        if (typeof rec.best === 'number') return rec.best >= 60;
        return !!(rec.completedAt || rec.doneAt);
      }
      return false;
    };

    if (isLessonCompleted(lessonId)) return true;

    let targetLevel = null;
    let targetUnit = null;
    let targetLesson = null;
    let lIdx = -1;
    let uIdx = -1;

    for (const lvl of curriculum.levels || []) {
      for (let u = 0; u < (lvl.units || []).length; u++) {
        const unit = lvl.units[u];
        for (let l = 0; l < (unit.lessons || []).length; l++) {
          if (unit.lessons[l].id === lessonId) {
            targetLevel = lvl;
            targetUnit = unit;
            targetLesson = unit.lessons[l];
            uIdx = u;
            lIdx = l;
            break;
          }
        }
        if (targetLesson) break;
      }
      if (targetLesson) break;
    }

    if (!targetLesson || !targetLevel || !targetUnit) return false;
    if (targetLevel.locked) return false;
    if (curriculum.standard && curriculum.standard.includes('HSK')) {
      if (targetLevel.id !== 'intro' && targetLevel.id !== 'hsk1') return false;
    }

    if (uIdx === 0 && lIdx === 0) return true;

    if (lIdx > 0) {
      const prevLesson = targetUnit.lessons[lIdx - 1];
      return isLessonCompleted(prevLesson.id);
    }

    if (uIdx > 0) {
      const prevUnit = targetLevel.units[uIdx - 1];
      const threshold = (prevUnit.checkpoint && prevUnit.checkpoint.passPercent) || 80;
      const cpVal = (prog.checkpoints && (prog.checkpoints[prevUnit.id] ?? prog.checkpoints['checkpoint-' + prevUnit.id])) ?? 0;
      const cpScore = typeof cpVal === 'object' && cpVal !== null ? (cpVal.score ?? cpVal.best ?? 0) : cpVal;
      return cpScore >= threshold;
    }

    return false;
  }

  /**
   * Tìm bài học tiếp theo cần học
   */
  function nextLesson(curriculum, progress) {
    if (!curriculum || !Array.isArray(curriculum.levels)) return null;
    const prog = progress || { lessons: {}, checkpoints: {} };

    const isLessonCompleted = (lId) => {
      if (!prog || !prog.lessons || !prog.lessons[lId]) return false;
      const rec = prog.lessons[lId];
      if (rec === true) return true;
      if (typeof rec === 'object') {
        if (typeof rec.stars === 'number') return rec.stars >= 1;
        if (typeof rec.done === 'boolean') return rec.done;
        if (typeof rec.score === 'number') return rec.score >= 60;
        if (typeof rec.best === 'number') return rec.best >= 60;
        return !!(rec.completedAt || rec.doneAt);
      }
      return false;
    };

    for (const lvl of curriculum.levels) {
      if (lvl.locked) continue;
      if (curriculum.standard && curriculum.standard.includes('HSK')) {
        if (lvl.id !== 'intro' && lvl.id !== 'hsk1') continue;
      }
      for (const unit of lvl.units || []) {
        for (const lesson of unit.lessons || []) {
          const isDone = isLessonCompleted(lesson.id);
          if (!isDone && isLessonUnlocked(curriculum, prog, lesson.id)) {
            return lesson;
          }
        }
      }
    }
    return null;
  }

  /**
   * Tách câu khớp tham lam dài nhất (cho phân tích và sắp xếp câu)
   */
  function splitSentence(sentence, knownWords) {
    if (!sentence || typeof sentence !== 'string') return [];
    
    // Nếu là câu tiếng Latin/tiếng Anh (không chứa ký tự Hán CJK)
    const hasCJK = /[\u4e00-\u9fa5]/.test(sentence);
    if (!hasCJK) {
      // Tách theo từ tiếng Anh, loại bỏ dấu câu (!?,:;)"'
      const clean = sentence.replace(/["'’“”,.!?:;\-—–\(\)\[\]\/]/g, ' ');
      return clean.trim().split(/\s+/).filter(Boolean);
    }

    const punctuationRegex = /[\s，。！？、；：“”‘’（）—…,.!?;:()]/;
    const sortedWords = (knownWords || [])
      .filter(w => typeof w === 'string' && w.length > 0)
      .sort((a, b) => b.length - a.length);

    const tokens = [];
    let i = 0;
    while (i < sentence.length) {
      const char = sentence[i];
      if (punctuationRegex.test(char)) {
        i++;
        continue;
      }

      let matched = null;
      for (const kw of sortedWords) {
        if (sentence.startsWith(kw, i)) {
          matched = kw;
          break;
        }
      }

      if (matched) {
        tokens.push(matched);
        i += matched.length;
      } else {
        tokens.push(char);
        i++;
      }
    }
    return tokens;
  }

  /**
   * Chia danh sách từ thành từng nhóm 5 từ
   * Ví dụ: 12 từ -> [Phần 1 (1–5) (5 từ), Phần 2 (6–10) (5 từ), Phần 3 (11–12) (2 từ)]
   */
  function chunkWords(words, size = 5) {
    if (!Array.isArray(words) || words.length === 0) return [];
    const chunks = [];
    const total = words.length;
    for (let i = 0; i < total; i += size) {
      const slice = words.slice(i, i + size);
      const start = i + 1;
      const end = Math.min(i + size, total);
      chunks.push({
        index: Math.floor(i / size),
        label: `Phần ${Math.floor(i / size) + 1} (${start}–${end})`,
        start: i,
        end: end - 1,
        words: slice,
        count: slice.length
      });
    }
    return chunks;
  }

  /**
   * Lọc từ theo trạng thái: 'all' | 'unlearned' | 'hard' | 'learned'
   */
  function filterWords(words, filterType, progress = {}, lessonId = '') {
    if (!Array.isArray(words)) return { items: [], counts: { all: 0, unlearned: 0, hard: 0, learned: 0 } };
    const prog = progress || {};
    const learnedWords = prog.learnedWords || {};
    const hardWords = prog.hardWords || {};
    const lessonRecord = (prog.lessons && lessonId) ? prog.lessons[lessonId] : null;

    const isWordLearned = (w) => {
      const key = typeof w === 'string' ? w : (w.word || w.hanzi || '');
      return !!learnedWords[key] || (lessonRecord && lessonRecord.stars >= 1);
    };

    const isWordHard = (w) => {
      const key = typeof w === 'string' ? w : (w.word || w.hanzi || '');
      return !!hardWords[key] && hardWords[key] > 0;
    };

    let unlearnedCount = 0;
    let hardCount = 0;
    let learnedCount = 0;

    words.forEach(w => {
      const learned = isWordLearned(w);
      const hard = isWordHard(w);
      if (learned) learnedCount++;
      else unlearnedCount++;
      if (hard) hardCount++;
    });

    const counts = {
      all: words.length,
      unlearned: unlearnedCount,
      hard: hardCount,
      learned: learnedCount
    };

    let items = words;
    if (filterType === 'unlearned') {
      items = words.filter(w => !isWordLearned(w));
    } else if (filterType === 'hard') {
      items = words.filter(w => isWordHard(w));
    } else if (filterType === 'learned') {
      items = words.filter(w => isWordLearned(w));
    }

    return { items, counts };
  }

  /**
   * Chấm điểm cặp thẻ ghép nghĩa (Bước 2)
   */
  function gradeMatchPair(card1, card2) {
    if (!card1 || !card2) return false;
    if (card1.type === card2.type) return false;
    return card1.pairId === card2.pairId;
  }

  /**
   * So sánh Pinyin nhập vào (chấp nhận có dấu, không dấu, số thanh)
   */
  function comparePinyin(input, targetPinyin, hanzi) {
    if (!input || !targetPinyin) return false;
    const cleanIn = input.trim().toLowerCase();
    const cleanTar = targetPinyin.trim().toLowerCase();

    if (cleanIn === cleanTar) return true;

    if (typeof window !== 'undefined' && window.TypingPractice && typeof window.TypingPractice.compareInputToTarget === 'function') {
      try {
        const res = window.TypingPractice.compareInputToTarget(cleanIn, cleanTar, 'tone_mark', hanzi);
        if (res && res.isAllCorrect) return true;
        const resNoTone = window.TypingPractice.compareInputToTarget(cleanIn, cleanTar, 'no_tone', hanzi);
        if (resNoTone && resNoTone.isAllCorrect) return true;
      } catch (_) {}
    }

    const stripTone = (s) => s.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[1-5]/g, '')
      .replace(/[\s,\.!\?_'-]+/g, '')
      .replace(/ü/g, 'v');

    return stripTone(cleanIn) === stripTone(cleanTar);
  }

  /**
   * Hiển thị Pinyin trên từng chữ bằng thẻ <ruby>
   * Hỗ trợ tokens (từ ZH_EXAMPLE_TOKENS) hoặc fallback tách từng chữ kèm pinyin
   */
  function buildRubyHtml(sentence, tokens = null, charPinyinMap = null) {
    if (!sentence || typeof sentence !== 'string') return '';

    // 1. Nếu có mảng tokens được cung cấp
    if (Array.isArray(tokens) && tokens.length > 0) {
      return tokens.map(t => {
        const text = t.w || t.text || t.zh || t.word || '';
        const py = t.py || t.pinyin || '';
        if (!py || /^[\s，。！？、；：“”‘’（）—…,.!?;:()]+$/.test(text)) {
          return text;
        }
        return `<ruby>${text}<rt>${py}</rt></ruby>`;
      }).join('');
    }

    // 2. Fallback: tách ký tự và tra cứu pinyin
    const map = charPinyinMap || (typeof window !== 'undefined' ? window.CHAR_PINYIN : null);
    const chars = Array.from(sentence);
    let html = '';
    for (const ch of chars) {
      if (/^[\s，。！？、；：“”‘’（）—…,.!?;:()]$/.test(ch)) {
        html += ch;
      } else {
        let py = map ? map[ch] : null;
        if (!py && typeof window !== 'undefined' && window.HSK1_WORDS && window.HSK1_WORDS[ch]) {
          py = window.HSK1_WORDS[ch].py;
        }
        if (!py && FALLBACK_WORDS[ch]) {
          py = FALLBACK_WORDS[ch].py;
        }
        if (py) {
          html += `<ruby>${ch}<rt>${py}</rt></ruby>`;
        } else {
          html += ch;
        }
      }
    }
    return html;
  }

  /**
   * Lưu tiến độ hoàn thành một nhóm từ:
   * Nhóm chỉ tính xong (done: true) khi đạt >= 60% câu đúng (bước 2–4).
   * Dưới 60%: done = false, không cộng learnedWords, không tính xong.
   */
  function saveGroupProgress(progress, lessonId, groupIndex, groupResult) {
    const prog = progress || { lessons: {}, checkpoints: {}, hardWords: {}, learnedWords: {} };
    prog.lessons = prog.lessons || {};
    prog.learnedWords = prog.learnedWords || {};
    prog.hardWords = prog.hardWords || {};

    const lsn = prog.lessons[lessonId] || { stars: 0, best: 0, doneAt: null };
    lsn.groups = lsn.groups || {};

    let pct = 0;
    if (groupResult && typeof groupResult.pct === 'number') {
      pct = groupResult.pct;
    } else if (groupResult && typeof groupResult.accuracy === 'number') {
      pct = groupResult.accuracy;
    } else if (groupResult && typeof groupResult.correctCount === 'number' && groupResult.totalCount > 0) {
      pct = Math.round((groupResult.correctCount / groupResult.totalCount) * 100);
    } else if (groupResult && Array.isArray(groupResult.correctWords) && groupResult.totalCount > 0) {
      pct = Math.round((groupResult.correctWords.length / groupResult.totalCount) * 100);
    }

    const isPassed = pct >= 60;
    const correctCount = (groupResult && typeof groupResult.correctCount === 'number')
      ? groupResult.correctCount
      : ((groupResult && groupResult.correctWords) ? groupResult.correctWords.length : 0);
    const totalCount = (groupResult && groupResult.totalCount) || 5;

    lsn.groups[groupIndex] = {
      done: isPassed,
      passed: isPassed,
      pct: pct,
      correctCount: correctCount,
      totalCount: totalCount,
      doneAt: isPassed ? Date.now() : null
    };
    prog.lessons[lessonId] = lsn;

    if (isPassed && groupResult && Array.isArray(groupResult.correctWords)) {
      groupResult.correctWords.forEach(w => {
        const key = typeof w === 'string' ? w : (w.word || w.hanzi);
        if (key) prog.learnedWords[key] = Date.now();
      });
    }

    if (groupResult && Array.isArray(groupResult.wrongWords)) {
      groupResult.wrongWords.forEach(w => {
        const key = typeof w === 'string' ? w : (w.word || w.hanzi);
        if (key) prog.hardWords[key] = (prog.hardWords[key] || 0) + 1;
      });
    }

    return prog;
  }

  function shuffleArray(arr, rng = Math.random) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /**
   * Tạo bài tập luyện tập đa dạng (8-12 câu) cho bài học / tương thích test cũ
   */
  function buildExercises(lesson, words, rng = Math.random) {
    if (!lesson) return [];
    const wordKeys = lesson.newWords || [];
    const resolvedList = wordKeys.map(k => resolveWord(k, words)).filter(w => w && w.pinyin);
    if (resolvedList.length === 0) return [];

    const exercises = [];
    const allMeanings = resolvedList.map(w => w.vi).filter(Boolean);
    const allHanzis = resolvedList.map(w => w.hanzi).filter(Boolean);

    function getMeaningOptions(correctVi) {
      const distractors = allMeanings.filter(m => m !== correctVi);
      const shuffled = shuffleArray(distractors, rng).slice(0, 3);
      while (shuffled.length < 3) {
        shuffled.push(`Nghĩa khác ${shuffled.length + 1}`);
      }
      return shuffleArray([correctVi, ...shuffled], rng);
    }

    function getHanziOptions(correctHanzi) {
      const distractors = allHanzis.filter(h => h !== correctHanzi);
      const shuffled = shuffleArray(distractors, rng).slice(0, 3);
      while (shuffled.length < 3) {
        shuffled.push(shuffled.length === 0 ? '好' : '学');
      }
      return shuffleArray([correctHanzi, ...shuffled], rng);
    }

    resolvedList.forEach(w => {
      // 1. Chọn nghĩa
      exercises.push({
        type: 'meaning',
        prompt: `Chọn nghĩa tiếng Việt của "${w.hanzi}":`,
        hanzi: w.hanzi,
        pinyin: w.pinyin,
        correct: w.vi,
        options: getMeaningOptions(w.vi)
      });

      // 2. Nghe chọn chữ
      exercises.push({
        type: 'listen',
        prompt: `Nghe phát âm và chọn chữ Hán đúng:`,
        hanzi: w.hanzi,
        pinyin: w.pinyin,
        correct: w.hanzi,
        options: getHanziOptions(w.hanzi)
      });

      // 3. Gõ chữ
      exercises.push({
        type: 'typing',
        prompt: `Nhìn chữ Hán và gõ Pinyin của "${w.hanzi}":`,
        hanzi: w.hanzi,
        correctPinyin: w.pinyin,
        meaning: w.vi
      });

      // 4. Sắp xếp câu nếu có ví dụ
      const exSentence = (w.ex && (w.ex.zh || w.ex.en)) || '';
      if (exSentence) {
        const tokens = splitSentence(exSentence, allHanzis);
        if (tokens.length >= 2) {
          exercises.push({
            type: 'order',
            prompt: `Sắp xếp các từ thành câu hoàn chỉnh: "${w.ex?.vi || ''}"`,
            hanzi: w.hanzi,
            tokens: shuffleArray(tokens, rng),
            correctTokens: tokens
          });
        }
      }
    });

    // Nếu chưa có câu order và bài học có bài khóa (lesson.text)
    if (lesson.text && !exercises.some(e => e.type === 'order')) {
      const textLines = lesson.text.split('\n').map(l => l.replace(/^[—\-\s]+/, '').trim()).filter(l => l.length > 0);
      for (const line of textLines) {
        const tokens = splitSentence(line, allHanzis);
        if (tokens.length >= 2) {
          exercises.push({
            type: 'order',
            prompt: `Sắp xếp các từ thành câu hoàn chỉnh:`,
            tokens: shuffleArray(tokens, rng),
            correctTokens: tokens
          });
          break;
        }
      }
    }

    return shuffleArray(exercises, rng).slice(0, 12);
  }

  /**
   * Tạo bài tập luyện tập 5–8 câu riêng cho 1 nhóm 5 từ (Bước 3)
   */
  function buildGroupPractice(groupWords, allLessonWords, rng = Math.random) {
    if (!Array.isArray(groupWords) || groupWords.length === 0) return [];
    const pool = (allLessonWords && allLessonWords.length >= 4) ? allLessonWords : groupWords;
    const allMeanings = pool.map(w => w.vi).filter(Boolean);
    const allHanzis = pool.map(w => w.hanzi || w.word).filter(Boolean);
    const allPinyins = pool.map(w => w.pinyin || w.ipa).filter(Boolean);

    const questions = [];

    groupWords.forEach(w => {
      const h = w.hanzi || w.word;
      const py = w.pinyin || w.ipa;

      // 1. Nghe chọn chữ
      const distH = shuffleArray(allHanzis.filter(x => x !== h), rng).slice(0, 3);
      while (distH.length < 3) distH.push(`Từ ${distH.length + 1}`);
      questions.push({
        type: 'listen',
        prompt: 'Nghe phát âm và chọn từ đúng:',
        word: w,
        audioText: h,
        correct: h,
        options: shuffleArray([h, ...distH], rng)
      });

      // 2. Nhìn chữ chọn Pinyin/IPA
      const distPy = shuffleArray(allPinyins.filter(x => x !== py), rng).slice(0, 3);
      while (distPy.length < 3) distPy.push('dụ ' + (distPy.length + 1));
      questions.push({
        type: 'pinyin',
        prompt: `Chọn phiên âm đúng của "${h}":`,
        word: w,
        correct: py,
        options: shuffleArray([py, ...distPy], rng)
      });

      // 3. Chọn nghĩa
      const distVi = shuffleArray(allMeanings.filter(x => x !== w.vi), rng).slice(0, 3);
      while (distVi.length < 3) distVi.push('Nghĩa khác ' + (distVi.length + 1));
      questions.push({
        type: 'meaning',
        prompt: `Chọn nghĩa tiếng Việt của "${h}":`,
        word: w,
        correct: w.vi,
        options: shuffleArray([w.vi, ...distVi], rng)
      });

      // 4. Điền từ vào câu nếu có ví dụ
      if (w.ex && (w.ex.zh || w.ex.en)) {
        const sentence = w.ex.zh || w.ex.en;
        if (sentence.includes(h)) {
          const blankSentence = sentence.replace(h, ' ______ ');
          questions.push({
            type: 'cloze',
            prompt: `Điền từ thích hợp vào chỗ trống:`,
            clozeSentence: blankSentence,
            vi: w.ex.vi || '',
            word: w,
            correct: h,
            options: shuffleArray([h, ...distH], rng)
          });
        }
      }
    });

    const targetCount = Math.min(8, Math.max(5, questions.length));
    return shuffleArray(questions, rng).slice(0, targetCount);
  }

  /**
   * Tạo câu hỏi Kiểm tra chặng (Checkpoint) cuối chương
   */
  function buildCheckpointExercises(unit, words, rng = Math.random) {
    if (!unit || !unit.lessons) return [];
    const allWords = [];
    unit.lessons.forEach(l => {
      (l.newWords || []).forEach(k => {
        const w = resolveWord(k, words);
        if (w) allWords.push(w);
      });
    });

    if (allWords.length === 0) return [];
    const exList = [];
    const allMeanings = allWords.map(w => w.vi).filter(Boolean);

    allWords.forEach(w => {
      const distractors = shuffleArray(allMeanings.filter(m => m !== w.vi), rng).slice(0, 3);
      while (distractors.length < 3) distractors.push(`Lựa chọn ${distractors.length + 1}`);
      exList.push({
        type: 'meaning',
        prompt: `Chọn nghĩa tiếng Việt của từ:`,
        hanzi: w.hanzi,
        pinyin: w.pinyin,
        correct: w.vi,
        options: shuffleArray([w.vi, ...distractors], rng)
      });
    });

    return shuffleArray(exList, rng).slice(0, 15);
  }

  /* ==========================================================================
     4. QUẢN LÝ TIẾN ĐỘ (LOCALSTORAGE & BACKWARD COMPATIBILITY)
     ========================================================================== */

  function loadProgress(key = null) {
    if (typeof localStorage === 'undefined') {
      return { lessons: {}, checkpoints: {}, hardWords: {}, learnedWords: {}, savedCards: [] };
    }
    try {
      const storageKey = key || (typeof LearnPath !== 'undefined' && LearnPath.getStorageKey ? LearnPath.getStorageKey() : STORAGE_KEY_ZH);
      const raw = localStorage.getItem(storageKey);
      if (!raw) return { lessons: {}, checkpoints: {}, hardWords: {}, learnedWords: {}, savedCards: [] };
      const parsed = JSON.parse(raw);
      return {
        lessons: parsed.lessons || {},
        checkpoints: parsed.checkpoints || {},
        hardWords: parsed.hardWords || {},
        learnedWords: parsed.learnedWords || {},
        savedCards: parsed.savedCards || []
      };
    } catch (_) {
      return { lessons: {}, checkpoints: {}, hardWords: {}, learnedWords: {}, savedCards: [] };
    }
  }

  function saveProgress(prog, key = null) {
    if (typeof localStorage === 'undefined') return;
    try {
      const storageKey = key || (typeof LearnPath !== 'undefined' && LearnPath.getStorageKey ? LearnPath.getStorageKey() : STORAGE_KEY_ZH);
      localStorage.setItem(storageKey, JSON.stringify(prog));
    } catch (_) {}
  }

  /* ==========================================================================
     5. CONTROLLER LEARNPATH VÀ GIAO DIỆN NGƯỜI DÙNG
     ========================================================================== */

  const LearnPath = {
    containerEl: null,
    curriculum: null,
    words: {},
    progress: null,
    lang: 'zh',
    activeLevelId: 'intro',
    currentLesson: null,
    currentGroupIndex: null, // null: Trang bài; 0, 1, 2...: Nhóm đang chạy
    currentStep: 1, // 1: Học từ, 2: Ghép nghĩa, 3: Luyện tập, 4: Gõ từ, 5: Tổng kết nhóm
    activeWordIndex: 0,
    filterType: 'all', // 'all' | 'unlearned' | 'hard' | 'learned'
    isMaskWord: false, // Chế độ che chữ Hán / từ
    isPlayingAll: false, // Chế độ phát tất cả
    playAllIndex: 0,
    playAllTimer: null,
    groupMistakes: [],
    groupCorrectCount: 0,
    groupPracticeQuestions: [],
    currentPracticeIdx: 0,
    matchingCards: [],
    selectedMatchCard: null,
    matchedPairsCount: 0,
    typingWordIndex: 0,
    isMounted: false,

    getStorageKey() {
      return this.lang === 'en' ? STORAGE_KEY_EN : STORAGE_KEY_ZH;
    },

    mount(containerEl, lang = null) {
      this.containerEl = containerEl;
      this.isMounted = true;
      if (lang) {
        this.lang = lang;
      } else if (typeof document !== 'undefined' && document.documentElement.dataset.lang) {
        this.lang = document.documentElement.dataset.lang;
      }
      this.onShow(null, this.lang);
    },

    onShow(params, lang = null) {
      if (!this.containerEl) return;
      if (lang) {
        this.lang = lang;
      } else if (params && typeof params.get === 'function' && params.get('lang')) {
        this.lang = params.get('lang');
      } else if (typeof document !== 'undefined' && document.documentElement.dataset.lang) {
        this.lang = document.documentElement.dataset.lang;
      }

      if (this.lang === 'en') {
        this.curriculum = (typeof window !== 'undefined' && (window.EN_CURRICULUM || window.CURRICULUM_EN)) || this.curriculum;
        if (!this.curriculum || !this.curriculum.levels) {
          this.curriculum = typeof window !== 'undefined' && window.CURRICULUM;
        }
        this.words = (typeof window !== 'undefined' && window.EN_WORDS) || {};
        const openLvls = getOpenLevels(this.curriculum);
        if (openLvls.length > 0 && (!this.activeLevelId || this.activeLevelId === 'intro' || this.activeLevelId === 'hsk1')) {
          this.activeLevelId = openLvls[0].id;
        }
      } else {
        this.curriculum = (typeof window !== 'undefined' && window.CURRICULUM) || this.curriculum;
        this.words = (typeof window !== 'undefined' && window.HSK1_WORDS) || {};
        if (!this.activeLevelId || this.activeLevelId === 'starter' || this.activeLevelId === 'a1') {
          this.activeLevelId = 'intro';
        }
      }

      this.progress = loadProgress(this.getStorageKey());

      let searchParams = params;
      if (typeof params === 'string') {
        searchParams = new URLSearchParams(params);
      } else if (!params && typeof window !== 'undefined') {
        const hashQuery = (window.location.hash || '').split('?')[1] || '';
        searchParams = new URLSearchParams(hashQuery || window.location.search);
      }

      const lessonId = searchParams ? searchParams.get('lesson') : null;
      const groupParam = searchParams ? searchParams.get('group') : null;
      const practiceParam = searchParams ? searchParams.get('practice') : null;
      if (lessonId) {
        this.startLesson(lessonId, groupParam !== null ? parseInt(groupParam, 10) : null, practiceParam);
      } else {
        this.currentLesson = null;
        this.currentGroupIndex = null;
        this.practiceMode = null;
        this.render();
      }
    },

    onHide() {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      this.stopPlayAll();
      if (typeof window !== 'undefined' && window.LessonPractice && typeof window.LessonPractice.onHide === 'function') {
        window.LessonPractice.onHide();
      }
    },

    rewardEconomy(key, payload) {
      if (typeof window !== 'undefined' && window.Economy && typeof window.Economy.reward === 'function') {
        try {
          return window.Economy.reward(key, payload);
        } catch (_) {}
      }
      return null;
    },

    render() {
      if (!this.containerEl) return;
      if (this.currentLesson) {
        if (this.practiceMode && typeof window !== 'undefined' && window.LessonPractice && typeof window.LessonPractice.render === 'function') {
          window.LessonPractice.render({
            containerEl: this.containerEl,
            lesson: this.currentLesson,
            unit: this.currentUnit,
            practiceType: this.practiceMode,
            lang: this.lang,
            learnPath: this
          });
          return;
        }
        if (this.currentGroupIndex !== null) {
          this.renderGroupRunner();
        } else {
          this.renderLessonHub();
        }
      } else {
        this.renderMap();
      }
    },

    /* --------------------------------------------------------------------------
       1. TRANG CẤP (BẢN ĐỒ LỘ TRÌNH)
       -------------------------------------------------------------------------- */

    renderMap() {
      if (!this.curriculum || !this.curriculum.levels) {
        this.containerEl.innerHTML = `
          <div class="learn-container">
            <div class="learn-loading">
              <span class="learn-spinner"></span>
              <p>${this.lang === 'en' ? 'Đang tải lộ trình tiếng Anh...' : 'Đang tải lộ trình HSK...'}</p>
            </div>
          </div>
        `;
        return;
      }

      const levels = this.curriculum.levels;
      const currentLevel = levels.find(l => l.id === this.activeLevelId) || levels[0];
      const nextLsn = nextLesson(this.curriculum, this.progress);
      const hardWordsCount = Object.keys(this.progress.hardWords || {}).length;

      let html = `
        <div class="learn-container">
          <!-- Header Lộ trình -->
          <header class="learn-header">
            <div class="learn-header-top">
              <div class="learn-badge-seal">
                <span class="learn-seal-char">${this.lang === 'en' ? 'A' : '学'}</span>
                <div>
                  <h1 class="learn-title">${this.lang === 'en' ? 'Lộ trình Học tiếng Anh' : 'Lộ trình Học tiếng Trung'}</h1>
                  <p class="learn-subtitle">${this.lang === 'en' ? 'Chuẩn CEFR A0–A2 • 4 bước nhớ sâu từng từ' : 'Chuẩn HSK 3.0 • Cấp → Bài → Nhóm 5 từ → 4 bước'}</p>
                </div>
              </div>
              <div class="learn-header-actions">
                <button class="learn-btn-secondary" id="btn-open-hardwords">
                  ${ICONS.book}
                  <span>Sổ từ hay nhầm</span>
                  ${hardWordsCount > 0 ? `<span class="hardwords-badge">${hardWordsCount}</span>` : ''}
                </button>
              </div>
            </div>

            <!-- 1) THẺ MỖI CẤP (Số bài, Thời gian, Tiến độ %, 3 từ tiêu biểu, Nút Bắt đầu/Học tiếp) -->
            <div class="level-cards-grid">
      `;

      levels.forEach(lvl => {
        const isOpen = !lvl.locked && (this.curriculum.standard && this.curriculum.standard.includes('HSK') ? (lvl.id === 'intro' || lvl.id === 'hsk1') : true);
        const isActive = lvl.id === this.activeLevelId;

        // Tính số bài và tiến độ của cấp
        let totalL = 0;
        let doneL = 0;
        const sampleWords = [];

        const isLsnDone = (rec) => rec === true || (rec && (rec.stars >= 1 || rec.done === true));

        (lvl.units || []).forEach(u => {
          (u.lessons || []).forEach(l => {
            totalL++;
            const lRec = this.progress.lessons && this.progress.lessons[l.id];
            if (isLsnDone(lRec)) doneL++;
            (l.newWords || []).forEach(wKey => {
              if (sampleWords.length < 3 && !sampleWords.some(sw => sw.word === wKey)) {
                const res = resolveWord(wKey, this.words);
                if (res) sampleWords.push(res);
              }
            });
          });
        });

        const pct = totalL > 0 ? Math.round((doneL / totalL) * 100) : 0;
        const hours = lvl.hours || (lvl.targets && lvl.targets.hours) || 20;

        html += `
          <div class="level-overview-card ${isActive ? 'active' : ''} ${!isOpen ? 'locked' : ''}" data-level-id="${lvl.id}">
            <div class="level-card-top">
              <span class="level-tag">${lvl.band || lvl.cefr || (lvl.id.toUpperCase())}</span>
              ${!isOpen ? `<span class="level-lock-pill">${ICONS.lock} Đang soạn</span>` : `<span class="level-progress-pct">${pct}%</span>`}
            </div>
            <h3 class="level-card-title">${lvl.name}</h3>
            
            <div class="level-card-metrics">
              <span><b>${totalL}</b> bài học</span>
              <span class="metrics-sep">•</span>
              <span class="metrics-time">${ICONS.clock} ~${hours} giờ</span>
            </div>

            <!-- Tiến độ -->
            <div class="level-progress-wrapper">
              <div class="level-progress-text">
                <span>Tiến độ: <b>${doneL}/${totalL}</b> bài</span>
                <span>${pct}%</span>
              </div>
              <div class="learn-progress-track">
                <div class="learn-progress-fill" style="width: ${pct}%"></div>
              </div>
            </div>

            <!-- 3 từ tiêu biểu -->
            <div class="level-sample-words">
              <span class="sample-label">Từ tiêu biểu:</span>
              <div class="sample-words-chips">
                ${sampleWords.map(sw => `
                  <span class="sample-word-chip" title="${sw.vi}">
                    <b>${sw.hanzi || sw.word}</b> <small>(${sw.vi.split(/[,;(]/)[0]})</small>
                  </span>
                `).join('')}
              </div>
            </div>

            <div class="level-card-actions">
              ${isOpen ? `
                <button class="learn-btn-primary btn-select-level" data-level-id="${lvl.id}">
                  ${doneL > 0 && doneL < totalL ? `Học tiếp (${doneL + 1})` : (doneL >= totalL ? 'Xem lại cấp này' : 'Bắt đầu học')}
                </button>
              ` : `
                <button class="learn-btn-secondary" disabled>Sắp ra mắt</button>
              `}
            </div>
          </div>
        `;
      });

      html += `
            </div>
          </header>

          <!-- 2) DANH SÁCH CHƯƠNG → BÀI HỌC CỦA CẤP ĐANG CHỌN -->
          <main class="learn-roadmap">
      `;

      if (currentLevel.units && currentLevel.units.length > 0) {
        currentLevel.units.forEach((unit, uIdx) => {
          const passThreshold = (unit.checkpoint && unit.checkpoint.passPercent) || 80;
          const cpScore = (this.progress.checkpoints && this.progress.checkpoints[unit.id]) || 0;
          const isCpPassed = cpScore >= passThreshold;

          const isLsnDone = (rec) => rec === true || (rec && (rec.stars >= 1 || rec.done === true));
          let unitLessonsDone = 0;
          (unit.lessons || []).forEach(l => {
            const lRec = this.progress.lessons && this.progress.lessons[l.id];
            if (isLsnDone(lRec)) unitLessonsDone++;
          });
          const allLessonsInUnitDone = unit.lessons && unitLessonsDone === unit.lessons.length;

          html += `
            <section class="learn-unit-block" data-unit-id="${unit.id}">
              <div class="unit-banner">
                <div class="unit-banner-decor">${this.lang === 'en' ? `Chương ${uIdx + 1}` : `第 ${uIdx + 1} 单元`}</div>
                <div class="unit-banner-content">
                  <h2 class="unit-title">${unit.title}</h2>
                  <p class="unit-theme">Chủ đề: <b>${unit.theme || 'Giao tiếp thực tế'}</b></p>
                </div>
                <div class="unit-badge-status">${unitLessonsDone}/${(unit.lessons || []).length} bài xong</div>
              </div>

              <!-- Lưới các bài học trong chương -->
              <div class="unit-lessons-grid">
          `;

          (unit.lessons || []).forEach((lesson, lIdx) => {
            const isUnlocked = isLessonUnlocked(this.curriculum, this.progress, lesson.id);
            const lsnRecord = this.progress.lessons && this.progress.lessons[lesson.id];
            const isCompleted = isLsnDone(lsnRecord);
            const stars = isCompleted ? (lsnRecord.stars || 0) : 0;
            const wordCount = (lesson.newWords || []).length;

            html += `
              <div class="lesson-card-item ${isCompleted ? 'completed' : (isUnlocked ? 'unlocked' : 'locked')}" 
                   data-lesson-id="${lesson.id}">
                <div class="lesson-card-header">
                  <span class="lesson-order">Bài ${lIdx + 1}</span>
                  <div class="lesson-stars">
                    ${[1, 2, 3].map(s => `
                      <span class="star-icon ${s <= stars ? 'earned' : ''}">
                        ${s <= stars ? ICONS.starFilled : ICONS.starOutline}
                      </span>
                    `).join('')}
                  </div>
                </div>

                <h3 class="lesson-card-title">${lesson.title}</h3>
                <p class="lesson-card-theme">${lesson.focus || lesson.goal || unit.theme || 'Từ vựng & Mẫu câu'}</p>

                <div class="lesson-card-footer">
                  <span class="lesson-word-count">${wordCount} từ mới</span>
                  ${isCompleted ? `
                    <button class="learn-btn-secondary btn-enter-lesson" data-lesson-id="${lesson.id}">
                      ${ICONS.check} <span>Ôn lại</span>
                    </button>
                  ` : (isUnlocked ? `
                    <button class="learn-btn-primary btn-enter-lesson" data-lesson-id="${lesson.id}">
                      ${ICONS.arrowRight} <span>Vào bài</span>
                    </button>
                  ` : `
                    <button class="learn-btn-secondary" disabled>
                      ${ICONS.lock} <span>Chưa mở</span>
                    </button>
                  `)}
                </div>
              </div>
            `;
          });

          html += `
              </div>

              <!-- Nút Kiểm tra chặng (Checkpoint) cuối chương -->
              <div class="unit-checkpoint-container">
                <button class="checkpoint-btn ${isCpPassed ? 'passed' : (allLessonsInUnitDone ? 'ready' : 'locked')}" 
                        data-unit-id="${unit.id}" ${!allLessonsInUnitDone ? 'disabled' : ''}>
                  <div class="checkpoint-icon">${isCpPassed ? ICONS.trophy : ICONS.sparkle}</div>
                  <div class="checkpoint-info">
                    <div class="checkpoint-title">Kiểm tra chặng Chương ${uIdx + 1}</div>
                    <div class="checkpoint-desc">
                      ${isCpPassed ? `Đã vượt qua xuất sắc (${cpScore}%)` : (allLessonsInUnitDone ? '15 câu hỏi tổng hợp • Yêu cầu đạt ≥ 80%' : 'Hoàn thành các bài trên để mở')}
                    </div>
                  </div>
                  <span class="checkpoint-status-badge">
                    ${isCpPassed ? 'Đạt' : (allLessonsInUnitDone ? 'Bắt đầu' : 'Khóa')}
                  </span>
                </button>
              </div>
            </section>
          `;
        });
      }

      html += `
          </main>

          <!-- Drawer/Modal Sổ từ hay nhầm -->
          <div class="learn-modal-overlay" id="hardwords-modal" style="display: none;">
            <div class="learn-modal-card">
              <div class="modal-card-header">
                <h3>${ICONS.book} Sổ tay từ hay nhầm</h3>
                <button class="modal-close-btn" id="btn-close-hardwords">${ICONS.close}</button>
              </div>
              <div class="modal-card-body">
                <div id="hardwords-list-container"></div>
              </div>
            </div>
          </div>
        </div>
      `;

      this.containerEl.innerHTML = html;
      this.attachMapEvents();
    },

    attachMapEvents() {
      // Chọn cấp độ
      this.containerEl.querySelectorAll('.btn-select-level, .level-overview-card:not(.locked)').forEach(el => {
        el.addEventListener('click', (e) => {
          const lvl = el.getAttribute('data-level-id') || el.closest('.level-overview-card')?.getAttribute('data-level-id');
          if (lvl) {
            this.activeLevelId = lvl;
            this.render();
          }
        });
      });

      // Bấm vào bài học
      this.containerEl.querySelectorAll('.btn-enter-lesson').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const lessonId = btn.getAttribute('data-lesson-id');
          this.startLesson(lessonId);
        });
      });

      // Bấm thẻ bài học
      this.containerEl.querySelectorAll('.lesson-card-item.unlocked, .lesson-card-item.completed').forEach(card => {
        card.addEventListener('click', () => {
          const lessonId = card.getAttribute('data-lesson-id');
          this.startLesson(lessonId);
        });
      });

      // Checkpoint
      this.containerEl.querySelectorAll('.checkpoint-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => {
          const unitId = btn.getAttribute('data-unit-id');
          this.startCheckpoint(unitId);
        });
      });

      // Sổ từ hay nhầm
      const openHwBtn = this.containerEl.querySelector('#btn-open-hardwords');
      if (openHwBtn) openHwBtn.addEventListener('click', () => this.showHardWordsModal());

      const closeHwBtn = this.containerEl.querySelector('#btn-close-hardwords');
      if (closeHwBtn) {
        closeHwBtn.addEventListener('click', () => {
          const modal = this.containerEl.querySelector('#hardwords-modal');
          if (modal) modal.style.display = 'none';
        });
      }
    },

    showHardWordsModal() {
      const modal = this.containerEl.querySelector('#hardwords-modal');
      const container = this.containerEl.querySelector('#hardwords-list-container');
      if (!modal || !container) return;

      const hardEntries = Object.entries(this.progress.hardWords || {}).filter(([_, count]) => count > 0);
      if (hardEntries.length === 0) {
        container.innerHTML = `
          <div class="hardwords-empty">
            <span class="empty-icon">${ICONS.check}</span>
            <p>Tuyệt vời! Hiện tại bạn không có từ nào hay nhầm cần ôn lại.</p>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="hardwords-grid">
            ${hardEntries.map(([key, count]) => {
              const w = resolveWord(key, this.words);
              return `
                <div class="hardword-item-card">
                  <div class="hw-char">${w.hanzi || w.word}</div>
                  <div class="hw-py">${w.pinyin || w.ipa}</div>
                  <div class="hw-vi">${w.vi}</div>
                  <div class="hw-footer">
                    <span class="hw-count">Nhầm ${count} lần</span>
                    <button class="hw-speak-btn" data-speak="${w.hanzi || w.word}" aria-label="Nghe từ">
                      ${ICONS.speaker}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;

        container.querySelectorAll('.hw-speak-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            speakText(btn.getAttribute('data-speak'));
          });
        });
      }
      modal.style.display = 'flex';
    },

    /* --------------------------------------------------------------------------
       2. TRANG BÀI (LESSON HUB VIEW)
       -------------------------------------------------------------------------- */

    startLesson(lessonId, targetGroupIndex = null, practiceMode = null) {
      if (!this.curriculum) return;
      let targetLesson = null;
      let targetUnit = null;

      for (const lvl of this.curriculum.levels) {
        for (const u of lvl.units || []) {
          const l = (u.lessons || []).find(x => x.id === lessonId);
          if (l) {
            targetLesson = l;
            targetUnit = u;
            break;
          }
        }
        if (targetLesson) break;
      }

      if (!targetLesson) {
        alert('Không tìm thấy bài học!');
        return;
      }

      this.currentLesson = targetLesson;
      this.currentUnit = targetUnit;
      this.currentGroupIndex = targetGroupIndex; // null: mở Hub; số: mở 4 bước
      this.practiceMode = practiceMode; // null: mở Hub thường; 'hub' hoặc dạng bài: mở LessonPractice
      this.currentStep = 1;
      this.activeWordIndex = 0;
      this.filterType = 'all';
      this.isMaskWord = false;
      this.stopPlayAll();

      this.render();
    },

    renderLessonHub() {
      if (!this.containerEl || !this.currentLesson) return;
      const lesson = this.currentLesson;
      const unit = this.currentUnit || { title: 'Chương trình chuẩn', theme: 'Giao tiếp' };
      const wordsList = (lesson.newWords || []).map(k => resolveWord(k, this.words)).filter(Boolean);

      // Chia thành các nhóm 5 từ
      const chunks = chunkWords(wordsList, 5);

      // Tính bộ lọc và số lượng
      const { items: filteredWords, counts } = filterWords(wordsList, this.filterType, this.progress, lesson.id);

      const learnedPct = wordsList.length > 0 ? Math.round((counts.learned / wordsList.length) * 100) : 0;

      let html = `
        <div class="learn-container lesson-hub-screen">
          <!-- Đầu trang bài học -->
          <header class="lesson-hub-header">
            <div class="hub-header-nav">
              <button class="learn-btn-secondary btn-back-roadmap" id="btn-hub-back">
                ${ICONS.arrowLeft} <span>Về lộ trình</span>
              </button>
              <span class="hub-unit-tag">${unit.title} • ${unit.theme}</span>
            </div>

            <div class="hub-title-row">
              <div>
                <h1 class="hub-lesson-title">${lesson.title}</h1>
                <p class="hub-lesson-goal">${lesson.focus || lesson.goal || 'Làm chủ các từ vựng và ngữ cảnh bài học'}</p>
              </div>
            </div>

            <!-- Thanh tiến độ từ vựng bài học -->
            <div class="hub-progress-card">
              <div class="hub-progress-label">
                <span>Tiến độ từ vựng: <b>${counts.learned}/${wordsList.length}</b> từ đã học</span>
                <span><b>${learnedPct}%</b></span>
              </div>
              <div class="learn-progress-track">
                <div class="learn-progress-fill" style="width: ${learnedPct}%"></div>
              </div>
            </div>

            <!-- Thanh công cụ: Bộ lọc, Phát tất cả, Che chữ -->
            <div class="hub-toolbar">
              <!-- Bộ lọc -->
              <div class="hub-filter-tabs" role="tablist">
                <button class="hub-filter-btn ${this.filterType === 'all' ? 'active' : ''}" data-filter="all">
                  Tất cả (${counts.all})
                </button>
                <button class="hub-filter-btn ${this.filterType === 'unlearned' ? 'active' : ''}" data-filter="unlearned">
                  Chưa học (${counts.unlearned})
                </button>
                <button class="hub-filter-btn ${this.filterType === 'hard' ? 'active' : ''}" data-filter="hard">
                  Hay nhầm (${counts.hard})
                </button>
                <button class="hub-filter-btn ${this.filterType === 'learned' ? 'active' : ''}" data-filter="learned">
                  Đã học (${counts.learned})
                </button>
              </div>

              <!-- Nút hành động học tập -->
              <div class="hub-action-buttons">
                <a href="#${this.lang}/learn?lesson=${lesson.id}&practice=hub" class="learn-btn-primary btn-gold" id="btn-hub-practice">
                  ${ICONS.sparkle} <span>Luyện tập bài này</span>
                </a>
                <button class="learn-btn-secondary ${this.isPlayingAll ? 'active' : ''}" id="btn-play-all">
                  ${this.isPlayingAll ? ICONS.pause : ICONS.play}
                  <span>${this.isPlayingAll ? 'Dừng đọc' : 'Phát tất cả'}</span>
                </button>
                <button class="learn-btn-secondary ${this.isMaskWord ? 'active' : ''}" id="btn-toggle-mask">
                  ${this.isMaskWord ? ICONS.eye : ICONS.eyeOff}
                  <span>${this.isMaskWord ? 'Hiện chữ' : 'Che chữ'}</span>
                </button>
              </div>
            </div>
          </header>

          <!-- Danh sách từ chia THEO NHÓM 5 TỪ -->
          <main class="hub-groups-container">
      `;

      if (chunks.length === 0) {
        html += `<p class="empty-text">Bài học chưa có từ vựng.</p>`;
      } else {
        chunks.forEach(chunk => {
          const lsnRecord = this.progress.lessons && this.progress.lessons[lesson.id];
          const isGroupDone = !!(lsnRecord && lsnRecord.groups && lsnRecord.groups[chunk.index] && lsnRecord.groups[chunk.index].done);

          // Lọc các từ thuộc nhóm này theo bộ lọc hiện tại
          const groupFilteredWords = chunk.words.filter(w => filteredWords.some(fw => (fw.hanzi || fw.word) === (w.hanzi || w.word)));

          html += `
            <section class="vocab-group-card">
              <div class="vocab-group-header">
                <div class="group-header-info">
                  <h2 class="group-title">${chunk.label}</h2>
                  <span class="group-status-pill ${isGroupDone ? 'done' : 'pending'}">
                    ${isGroupDone ? `${ICONS.check} Đã hoàn thành` : 'Chưa học'}
                  </span>
                </div>
                <button class="learn-btn-primary btn-start-group" data-group-index="${chunk.index}">
                  ${isGroupDone ? `${ICONS.repeat} Ôn luyện 4 bước` : `${ICONS.play} Học nhóm này`}
                </button>
              </div>

              <!-- Danh sách từ trong nhóm -->
              <div class="vocab-cards-grid ${this.isMaskWord ? 'mask-mode' : ''}">
                ${groupFilteredWords.length === 0 ? `
                  <div class="group-empty-filter">Không có từ nào theo bộ lọc đang chọn.</div>
                ` : groupFilteredWords.map(w => {
                  const key = w.hanzi || w.word;
                  const isHard = (this.progress.hardWords && this.progress.hardWords[key] > 0);
                  const isLearned = !!(this.progress.learnedWords && this.progress.learnedWords[key]) || (lsnRecord && lsnRecord.stars >= 1);

                  return `
                    <div class="vocab-mini-card" data-word-key="${key}">
                      <div class="mini-card-top">
                        <span class="mini-card-char ${this.isMaskWord ? 'masked' : ''}">
                          ${this.isMaskWord ? '···' : key}
                        </span>
                        <div class="mini-card-badges">
                          ${isHard ? `<span class="badge-mistake" title="Hay nhầm">Nhầm</span>` : ''}
                          ${isLearned ? `<span class="badge-learned" title="Đã học">${ICONS.check}</span>` : ''}
                        </div>
                      </div>
                      <div class="mini-card-pinyin">${w.pinyin || w.ipa}</div>
                      <div class="mini-card-vi">${w.vi}</div>
                      <div class="mini-card-footer">
                        <button class="mini-card-speak" data-speak="${key}" aria-label="Nghe từ">
                          ${ICONS.speaker}
                        </button>
                        <span class="mini-card-open-hint">Xem thẻ →</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </section>
          `;
        });
      }

      html += `
          </main>

          <!-- Drawer / Modal Thẻ từ chi tiết khi bấm vào một từ -->
          <div class="learn-modal-overlay" id="word-detail-modal" style="display: none;">
            <div class="learn-modal-card word-detail-card-container">
              <div class="modal-card-header">
                <h3>${ICONS.book} Thẻ từ chi tiết</h3>
                <button class="modal-close-btn" id="btn-close-word-modal">${ICONS.close}</button>
              </div>
              <div class="modal-card-body" id="word-detail-modal-body"></div>
            </div>
          </div>
        </div>
      `;

      this.containerEl.innerHTML = html;
      this.attachLessonHubEvents(wordsList, filteredWords);
    },

    attachLessonHubEvents(allWords, filteredWords) {
      // Nút quay về lộ trình
      const backBtn = this.containerEl.querySelector('#btn-hub-back');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          this.stopPlayAll();
          this.currentLesson = null;
          this.currentGroupIndex = null;
          this.render();
        });
      }

      // Luyện tập bài này (10 dạng)
      const hubPracticeBtn = this.containerEl.querySelector('#btn-hub-practice');
      if (hubPracticeBtn) {
        hubPracticeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (typeof window !== 'undefined') {
            window.location.hash = `#${this.lang}/learn?lesson=${lesson.id}&practice=hub`;
          }
        });
      }

      // Bộ lọc
      this.containerEl.querySelectorAll('.hub-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.filterType = btn.getAttribute('data-filter');
          this.renderLessonHub();
        });
      });

      // Phát tất cả
      const playAllBtn = this.containerEl.querySelector('#btn-play-all');
      if (playAllBtn) {
        playAllBtn.addEventListener('click', () => {
          this.togglePlayAll(filteredWords);
        });
      }

      // Che chữ
      const maskBtn = this.containerEl.querySelector('#btn-toggle-mask');
      if (maskBtn) {
        maskBtn.addEventListener('click', () => {
          this.isMaskWord = !this.isMaskWord;
          this.renderLessonHub();
        });
      }

      // Mở 4 bước học cho nhóm
      this.containerEl.querySelectorAll('.btn-start-group').forEach(btn => {
        btn.addEventListener('click', () => {
          const gIdx = parseInt(btn.getAttribute('data-group-index'), 10);
          this.startGroup(gIdx);
        });
      });

      // Nghe phát âm từ nhanh
      this.containerEl.querySelectorAll('.mini-card-speak').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          speakText(btn.getAttribute('data-speak'));
        });
      });

      // Mở modal Thẻ từ đầy đủ
      this.containerEl.querySelectorAll('.vocab-mini-card').forEach(card => {
        card.addEventListener('click', () => {
          const key = card.getAttribute('data-word-key');
          this.openWordCardModal(key);
        });
      });

      // Đóng modal thẻ từ
      const closeWordBtn = this.containerEl.querySelector('#btn-close-word-modal');
      if (closeWordBtn) {
        closeWordBtn.addEventListener('click', () => {
          const modal = this.containerEl.querySelector('#word-detail-modal');
          if (modal) modal.style.display = 'none';
        });
      }
    },

    togglePlayAll(wordsToPlay) {
      if (this.isPlayingAll) {
        this.stopPlayAll();
        this.renderLessonHub();
        return;
      }

      if (!wordsToPlay || wordsToPlay.length === 0) return;
      this.isPlayingAll = true;
      this.playAllIndex = 0;
      this.renderLessonHub();

      const playNext = () => {
        if (!this.isPlayingAll) return;
        if (this.playAllIndex >= wordsToPlay.length) {
          this.stopPlayAll();
          this.renderLessonHub();
          return;
        }

        const w = wordsToPlay[this.playAllIndex];
        const key = w.hanzi || w.word;

        // Đánh dấu thẻ từ đang đọc
        this.containerEl.querySelectorAll('.vocab-mini-card').forEach(c => c.classList.remove('playing'));
        const cardEl = this.containerEl.querySelector(`[data-word-key="${key}"]`);
        if (cardEl) {
          cardEl.classList.add('playing');
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Đọc từ
        speakText(key, null, 0.9);

        // Chờ đọc xong đọc tiếp nghĩa tiếng Việt
        this.playAllTimer = setTimeout(() => {
          if (!this.isPlayingAll) return;
          speakText(w.vi, 'vi-VN', 1.0);

          this.playAllTimer = setTimeout(() => {
            if (!this.isPlayingAll) return;
            this.playAllIndex++;
            playNext();
          }, 1400);
        }, 1200);
      };

      playNext();
    },

    stopPlayAll() {
      this.isPlayingAll = false;
      if (this.playAllTimer) {
        clearTimeout(this.playAllTimer);
        this.playAllTimer = null;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    },

    /* --------------------------------------------------------------------------
       3. 4 BƯỚC MỖI NHÓM (GROUP LEARNING RUNNER)
       -------------------------------------------------------------------------- */

    startGroup(groupIndex) {
      if (!this.currentLesson) return;
      const allWords = (this.currentLesson.newWords || []).map(k => resolveWord(k, this.words)).filter(Boolean);
      const chunks = chunkWords(allWords, 5);
      if (!chunks[groupIndex]) return;

      this.currentGroupIndex = groupIndex;
      this.currentGroupChunk = chunks[groupIndex];
      this.currentStep = 1; // 1: Học từ
      this.activeWordIndex = 0;
      this.groupMistakes = [];
      this.groupCorrectCount = 0;
      this.groupTotalCount = 0;
      this.matchingCards = null;
      this.selectedMatchCard = null;
      this.matchedPairsCount = 0;
      this.matchCardErrors = {};
      this.groupPracticeQuestions = null;
      this.currentPracticeIdx = 0;
      this.typingWordIndex = 0;

      this.render();
    },

    exitGroupConfirm() {
      if (confirm('Bạn có chắc muốn tạm dừng học nhóm từ này? Kết quả đang làm sẽ không được lưu.')) {
        this.currentGroupIndex = null;
        this.render();
      }
    },

    renderGroupRunner() {
      if (!this.containerEl || !this.currentLesson || this.currentGroupIndex === null) return;
      const chunk = this.currentGroupChunk;
      const stepNames = ['1 Học từ', '2 Ghép nghĩa', '3 Luyện tập', '4 Gõ từ'];

      let html = `
        <div class="learn-runner-screen">
          <!-- Thanh điều hướng và chỉ số 4 bước -->
          <div class="runner-nav-bar">
            <button class="runner-exit-btn" id="btn-group-exit" title="Thoát nhóm từ">
              ${ICONS.close}
            </button>
            
            <div class="runner-steps-indicator">
              <span class="step-summary-badge">${getStepSummaryLabel(this.currentStep, chunk.label, 4, this.progress.lessons?.[this.currentLesson.id]?.groups?.[chunk.index]?.passed !== false)}</span>
              <div class="step-dots-row">
                ${stepNames.map((name, idx) => {
                  const stepNum = idx + 1;
                  const isDone = this.currentStep > 4 ? true : stepNum < this.currentStep;
                  const isActive = this.currentStep > 4 ? false : stepNum === this.currentStep;
                  return `
                    <div class="step-badge-item ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}">
                      <span class="badge-dot">${isDone ? ICONS.check : stepNum}</span>
                      <span class="badge-name">${name}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="runner-nav-right"></div>
          </div>

          <!-- Thân bước hiện tại -->
          <div class="runner-content-container">
            <div id="runner-step-body" class="runner-step-body"></div>
          </div>
        </div>
      `;

      this.containerEl.innerHTML = html;

      const exitBtn = this.containerEl.querySelector('#btn-group-exit');
      if (exitBtn) exitBtn.addEventListener('click', () => this.exitGroupConfirm());

      const bodyEl = this.containerEl.querySelector('#runner-step-body');
      if (!bodyEl) return;

      if (this.currentStep === 1) this.renderStep1WordStudy(bodyEl);
      else if (this.currentStep === 2) this.renderStep2MatchMeanings(bodyEl);
      else if (this.currentStep === 3) this.renderStep3Practice(bodyEl);
      else if (this.currentStep === 4) this.renderStep4Typing(bodyEl);
      else if (this.currentStep === 5) this.renderGroupSummary(bodyEl);
    },

    /* BƯỚC 1: HỌC TỪ (Lần lượt 5 Thẻ từ đầy đủ, nút Trước/Sau, Đã thuộc) */
    renderStep1WordStudy(container) {
      const words = this.currentGroupChunk.words;
      if (this.activeWordIndex >= words.length) this.activeWordIndex = words.length - 1;
      const currentWord = words[this.activeWordIndex];

      const cardHtml = this.renderWordCardHtml(currentWord, {
        isStepRunner: true,
        currentIdx: this.activeWordIndex,
        totalCount: words.length
      });

      container.innerHTML = `
        <div class="step-card word-study-step-card">
          <div class="card-step-badge">Bước 1/4 • Học kỹ từng từ (${this.activeWordIndex + 1}/${words.length})</div>
          
          ${cardHtml}

          <div class="step-footer-actions">
            <button class="learn-btn-secondary" id="btn-prev-card" ${this.activeWordIndex === 0 ? 'disabled' : ''}>
              ${ICONS.arrowLeft} <span>Trước</span>
            </button>
            
            <button class="learn-btn-secondary btn-mastered" id="btn-word-mastered">
              ${ICONS.check} <span>Đã thuộc</span>
            </button>

            ${this.activeWordIndex < words.length - 1 ? `
              <button class="learn-btn-primary" id="btn-next-card">
                <span>Sau</span> ${ICONS.arrowRight}
              </button>
            ` : `
              <button class="learn-btn-primary btn-gold" id="btn-finish-step1">
                <span>Xong bước 1 → Sang Ghép nghĩa</span> ${ICONS.arrowRight}
              </button>
            `}
          </div>
        </div>
      `;

      this.attachWordCardEvents(container, currentWord);

      // Điều hướng trước / sau
      const prevBtn = container.querySelector('#btn-prev-card');
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          if (this.activeWordIndex > 0) {
            this.activeWordIndex--;
            this.renderStep1WordStudy(container);
          }
        });
      }

      const nextBtn = container.querySelector('#btn-next-card');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (this.activeWordIndex < words.length - 1) {
            this.activeWordIndex++;
            this.renderStep1WordStudy(container);
          }
        });
      }

      // Đã thuộc: đánh dấu từ đã thuộc và tự chuyển từ tiếp
      const masteredBtn = container.querySelector('#btn-word-mastered');
      if (masteredBtn) {
        masteredBtn.addEventListener('click', () => {
          const key = currentWord.hanzi || currentWord.word;
          this.progress.learnedWords = this.progress.learnedWords || {};
          this.progress.learnedWords[key] = Date.now();
          saveProgress(this.progress);
          playTone('correct');

          if (this.activeWordIndex < words.length - 1) {
            this.activeWordIndex++;
            this.renderStep1WordStudy(container);
          } else {
            const finishBtn = container.querySelector('#btn-finish-step1');
            if (finishBtn) finishBtn.click();
          }
        });
      }

      // Kết thúc bước 1
      const finishBtn = container.querySelector('#btn-finish-step1');
      if (finishBtn) {
        finishBtn.addEventListener('click', () => {
          this.rewardEconomy('lessonStep');
          this.currentStep = 2;
          this.renderGroupRunner();
        });
      }
    },

    /* BƯỚC 2: GHÉP NGHĨA (Nối 5 chữ với 5 nghĩa; đúng thì khóa cặp, sai rung nhẹ) */
    renderStep2MatchMeanings(container) {
      const words = this.currentGroupChunk.words;

      if (!this.matchingCards || this.matchingCards.length === 0) {
        const leftCols = words.map((w, idx) => ({
          id: `w_${idx}`,
          pairId: idx,
          type: 'word',
          text: w.hanzi || w.word,
          pinyin: w.pinyin || w.ipa,
          matched: false
        }));

        const rightCols = words.map((w, idx) => ({
          id: `m_${idx}`,
          pairId: idx,
          type: 'meaning',
          text: w.vi,
          matched: false
        }));

        this.matchingCards = {
          words: shuffleArray(leftCols),
          meanings: shuffleArray(rightCols)
        };
        this.selectedMatchCard = null;
        this.matchedPairsCount = 0;
      }

      const totalPairs = words.length;

      container.innerHTML = `
        <div class="step-card match-step-card">
          <div class="card-step-badge">Bước 2/4 • Ghép nghĩa (${this.matchedPairsCount}/${totalPairs} cặp)</div>
          <h2 class="card-step-title">Chạm vào cặp từ và nghĩa tương ứng</h2>
          <p class="card-step-desc">Ghép chính xác để củng cố phản xạ liên kết nghĩa.</p>

          <div class="matching-board-grid">
            <!-- Cột từ vựng -->
            <div class="matching-col matching-col-words">
              ${this.matchingCards.words.map(card => `
                <button class="match-item-btn match-word ${card.matched ? 'matched' : ''} ${this.selectedMatchCard && this.selectedMatchCard.id === card.id ? 'selected' : ''}" 
                        data-card-id="${card.id}" ${card.matched ? 'disabled' : ''}>
                  <span class="match-char">${card.text}</span>
                  ${card.pinyin ? `<span class="match-py">${card.pinyin}</span>` : ''}
                </button>
              `).join('')}
            </div>

            <!-- Cột nghĩa tiếng Việt -->
            <div class="matching-col matching-col-meanings">
              ${this.matchingCards.meanings.map(card => `
                <button class="match-item-btn match-meaning ${card.matched ? 'matched' : ''} ${this.selectedMatchCard && this.selectedMatchCard.id === card.id ? 'selected' : ''}" 
                        data-card-id="${card.id}" ${card.matched ? 'disabled' : ''}>
                  <span>${card.text}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div id="match-feedback-row" class="match-feedback-row"></div>
        </div>
      `;

      const allCardBtns = container.querySelectorAll('.match-item-btn:not([disabled])');
      allCardBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const cardId = btn.getAttribute('data-card-id');
          const allList = [...this.matchingCards.words, ...this.matchingCards.meanings];
          const clickedCard = allList.find(c => c.id === cardId);
          if (!clickedCard || clickedCard.matched) return;

          // Nếu chưa chọn thẻ đầu tiên
          if (!this.selectedMatchCard) {
            this.selectedMatchCard = clickedCard;
            if (clickedCard.type === 'word') speakText(clickedCard.text);
            this.renderStep2MatchMeanings(container);
            return;
          }

          // Nếu bấm lại cùng một thẻ
          if (this.selectedMatchCard.id === clickedCard.id) {
            this.selectedMatchCard = null;
            this.renderStep2MatchMeanings(container);
            return;
          }

          // Nếu bấm hai thẻ cùng loại (ví dụ hai từ chữ Hán) -> đổi chọn
          if (this.selectedMatchCard.type === clickedCard.type) {
            this.selectedMatchCard = clickedCard;
            if (clickedCard.type === 'word') speakText(clickedCard.text);
            this.renderStep2MatchMeanings(container);
            return;
          }

          // Chấm điểm cặp
          const isCorrect = gradeMatchPair(this.selectedMatchCard, clickedCard);
          const firstCard = this.selectedMatchCard;
          const secondCard = clickedCard;

          if (isCorrect) {
            firstCard.matched = true;
            secondCard.matched = true;
            this.matchedPairsCount++;
            this.selectedMatchCard = null;
            playTone('correct');

            if (!this.matchCardErrors || !this.matchCardErrors[firstCard.pairId]) {
              this.groupCorrectCount++;
            }
            this.groupTotalCount = (this.groupTotalCount || 0) + 1;

            if (this.matchedPairsCount >= totalPairs) {
              this.rewardEconomy('lessonStep');
              setTimeout(() => {
                this.currentStep = 3;
                this.groupPracticeQuestions = null;
                this.currentPracticeIdx = 0;
                this.renderGroupRunner();
              }, 600);
            } else {
              this.renderStep2MatchMeanings(container);
            }
          } else {
            // Sai: Rung nhẹ + đánh dấu hay nhầm
            this.matchCardErrors = this.matchCardErrors || {};
            this.matchCardErrors[firstCard.pairId] = true;
            this.matchCardErrors[secondCard.pairId] = true;

            const wrongWord = firstCard.type === 'word' ? firstCard.text : secondCard.text;
            if (!this.groupMistakes.includes(wrongWord)) {
              this.groupMistakes.push(wrongWord);
            }
            this.progress.hardWords = this.progress.hardWords || {};
            this.progress.hardWords[wrongWord] = (this.progress.hardWords[wrongWord] || 0) + 1;
            saveProgress(this.progress);

            playTone('wrong');

            // Rung thẻ
            const firstBtn = container.querySelector(`[data-card-id="${firstCard.id}"]`);
            const secondBtn = container.querySelector(`[data-card-id="${secondCard.id}"]`);
            if (firstBtn) firstBtn.classList.add('shake', 'wrong');
            if (secondBtn) secondBtn.classList.add('shake', 'wrong');

            setTimeout(() => {
              this.selectedMatchCard = null;
              this.renderStep2MatchMeanings(container);
            }, 600);
          }
        });
      });
    },

    /* BƯỚC 3: LUYỆN TẬP (5–8 câu trộn: nghe chọn chữ, nhìn chữ chọn pinyin, chọn nghĩa, điền câu) */
    renderStep3Practice(container) {
      if (!this.groupPracticeQuestions || this.groupPracticeQuestions.length === 0) {
        const allWords = (this.currentLesson.newWords || []).map(k => resolveWord(k, this.words)).filter(Boolean);
        this.groupPracticeQuestions = buildGroupPractice(this.currentGroupChunk.words, allWords);
        this.currentPracticeIdx = 0;
      }

      const questions = this.groupPracticeQuestions;
      if (this.currentPracticeIdx >= questions.length) {
        this.rewardEconomy('lessonStep');
        this.currentStep = 4;
        this.typingWordIndex = 0;
        this.renderGroupRunner();
        return;
      }

      const q = questions[this.currentPracticeIdx];

      container.innerHTML = `
        <div class="step-card practice-step-card">
          <div class="card-step-badge">Bước 3/4 • Luyện tập câu hỏi (${this.currentPracticeIdx + 1}/${questions.length})</div>
          
          <h2 class="practice-prompt-title">${q.prompt}</h2>

          <!-- Khung câu hỏi / phát âm -->
          <div class="practice-display-box">
            ${q.type === 'listen' ? `
              <button class="practice-audio-big-btn" id="btn-practice-speak" aria-label="Phát âm câu hỏi">
                ${ICONS.speaker} <span>Bấm để nghe</span>
              </button>
            ` : (q.type === 'cloze' ? `
              <div class="cloze-sentence">${q.clozeSentence}</div>
              <div class="cloze-meaning">${q.vi}</div>
            ` : `
              <div class="practice-target-char">${q.word.hanzi || q.word.word}</div>
            `)}
          </div>

          <!-- Lưới 4 lựa chọn -->
          <div class="practice-options-grid">
            ${q.options.map(opt => `
              <button class="learn-btn-option practice-opt-btn" data-ans="${opt}">
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>

          <div id="practice-feedback" class="practice-feedback" style="display: none;"></div>
        </div>
      `;

      // Tự phát âm nếu là dạng câu nghe
      if (q.type === 'listen') {
        speakText(q.audioText);
        const speakBtn = container.querySelector('#btn-practice-speak');
        if (speakBtn) speakBtn.addEventListener('click', () => speakText(q.audioText));
      }

      const feedbackEl = container.querySelector('#practice-feedback');
      const optBtns = container.querySelectorAll('.practice-opt-btn');

      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const chosen = btn.getAttribute('data-ans');
          const isCorrect = chosen === q.correct;
          optBtns.forEach(b => b.disabled = true);

          this.groupTotalCount = (this.groupTotalCount || 0) + 1;

          if (isCorrect) {
            btn.classList.add('correct');
            playTone('correct');
            this.groupCorrectCount++;
            feedbackEl.className = 'practice-feedback correct';
            feedbackEl.innerHTML = `${ICONS.check} Chính xác!`;
          } else {
            btn.classList.add('wrong');
            playTone('wrong');
            const targetWordKey = q.word ? (q.word.hanzi || q.word.word) : '';
            if (targetWordKey && !this.groupMistakes.includes(targetWordKey)) {
              this.groupMistakes.push(targetWordKey);
            }
            this.progress.hardWords = this.progress.hardWords || {};
            this.progress.hardWords[targetWordKey] = (this.progress.hardWords[targetWordKey] || 0) + 1;
            saveProgress(this.progress);

            feedbackEl.className = 'practice-feedback wrong';
            feedbackEl.innerHTML = `${ICONS.close} Chưa đúng. Đáp án chính xác là: <b>${q.correct}</b>`;
          }

          feedbackEl.style.display = 'block';

          setTimeout(() => {
            this.currentPracticeIdx++;
            this.renderStep3Practice(container);
          }, 1000);
        });
      });
    },

    /* BƯỚC 4: GÕ TỪ (Nghe + nhìn nghĩa → gõ pinyin / chính tả en) */
    renderStep4Typing(container) {
      const words = this.currentGroupChunk.words;
      if (this.typingWordIndex === undefined || this.typingWordIndex === null) {
        this.typingWordIndex = 0;
      }

      if (this.typingWordIndex >= words.length) {
        this.rewardEconomy('lessonStep');
        this.currentStep = 5; // Sang tổng kết nhóm
        this.renderGroupRunner();
        return;
      }

      const currentWord = words[this.typingWordIndex];
      const isZh = this.lang !== 'en';
      const targetAnswer = isZh ? currentWord.pinyin : (currentWord.word || currentWord.hanzi);

      container.innerHTML = `
        <div class="step-card typing-step-card">
          <div class="card-step-badge">Bước 4/4 • Phản xạ gõ từ (${this.typingWordIndex + 1}/${words.length})</div>
          
          <h2 class="typing-prompt-title">
            ${isZh ? 'Nghe và gõ Pinyin của từ:' : 'Nghe và gõ chính tả tiếng Anh:'}
          </h2>

          <div class="typing-target-box">
            <button class="typing-audio-btn" id="btn-typing-speak" aria-label="Nghe lại từ">
              ${ICONS.speaker} <span>Nghe phát âm</span>
            </button>
            <div class="typing-meaning-prompt">Nghĩa: <b>${currentWord.vi}</b></div>
          </div>

          <form id="typing-form" class="typing-input-form">
            <div class="typing-input-wrapper">
              <input type="text" id="typing-input" class="typing-text-field" 
                     placeholder="${isZh ? 'Ví dụ: ni hao hoặc nǐ hǎo' : 'Gõ từ tiếng Anh...'}" 
                     autocomplete="off" autofocus />
              <button type="submit" class="learn-btn-primary btn-submit-typing">
                <span>Kiểm tra</span> ${ICONS.arrowRight}
              </button>
            </div>
            ${isZh ? `<p class="typing-helper-text">Mẹo: Hệ thống chấp nhận cả Pinyin không dấu (ví dụ: ni hao).</p>` : ''}
          </form>

          <div id="typing-feedback" class="typing-feedback" style="display: none;"></div>
        </div>
      `;

      // Tự phát âm từ
      speakText(currentWord.hanzi || currentWord.word);

      const speakBtn = container.querySelector('#btn-typing-speak');
      if (speakBtn) {
        speakBtn.addEventListener('click', () => speakText(currentWord.hanzi || currentWord.word));
      }

      const form = container.querySelector('#typing-form');
      const inputEl = container.querySelector('#typing-input');
      const feedbackEl = container.querySelector('#typing-feedback');
      if (inputEl) inputEl.focus();

      if (form && inputEl) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const val = inputEl.value.trim();
          if (!val) return;

          let isCorrect = false;
          let isUnaccented = false;

          if (isZh) {
            isCorrect = comparePinyin(val, targetAnswer, currentWord.hanzi);
            // Kiểm tra xem người dùng có gõ không dấu không
            if (isCorrect && val.toLowerCase() !== targetAnswer.toLowerCase()) {
              isUnaccented = true;
            }
          } else {
            isCorrect = val.toLowerCase() === targetAnswer.toLowerCase();
          }

          inputEl.disabled = true;
          const submitBtn = form.querySelector('.btn-submit-typing');
          if (submitBtn) submitBtn.disabled = true;

          this.groupTotalCount = (this.groupTotalCount || 0) + 1;

          if (isCorrect) {
            playTone('correct');
            this.groupCorrectCount++;
            feedbackEl.className = 'typing-feedback correct';
            feedbackEl.innerHTML = `
              <div>${ICONS.check} Hoàn toàn chính xác!</div>
              ${isUnaccented ? `<small class="tone-reminder">Dấu thanh chuẩn: <b>${targetAnswer}</b></small>` : ''}
            `;
          } else {
            playTone('wrong');
            const wordKey = currentWord.hanzi || currentWord.word;
            if (!this.groupMistakes.includes(wordKey)) {
              this.groupMistakes.push(wordKey);
            }
            this.progress.hardWords = this.progress.hardWords || {};
            this.progress.hardWords[wordKey] = (this.progress.hardWords[wordKey] || 0) + 1;
            saveProgress(this.progress);

            feedbackEl.className = 'typing-feedback wrong';
            feedbackEl.innerHTML = `${ICONS.close} Chưa chính xác. Đáp án đúng là: <b>${targetAnswer}</b>`;
          }

          feedbackEl.style.display = 'block';

          setTimeout(() => {
            this.typingWordIndex++;
            this.renderStep4Typing(container);
          }, 1200);
        });
      }
    },

    /* BƯỚC 5: TỔNG KẾT NHÓM */
    renderGroupSummary(container) {
      const chunk = this.currentGroupChunk;
      const totalWords = chunk.words.length;
      const allWords = (this.currentLesson.newWords || []).map(k => resolveWord(k, this.words)).filter(Boolean);
      const allChunks = chunkWords(allWords, 5);
      const isLastGroup = chunk.index >= allChunks.length - 1;

      // Tính tổng số câu hỏi bước 2–4 và tỷ lệ đúng
      const fallbackTotal = totalWords + (this.groupPracticeQuestions ? this.groupPracticeQuestions.length : 0) + totalWords;
      const totalQuestions = this.groupTotalCount > 0 ? this.groupTotalCount : fallbackTotal;
      const pct = totalQuestions > 0 ? Math.round((this.groupCorrectCount / totalQuestions) * 100) : 0;
      const isPassed = pct >= 60;

      const correctWords = chunk.words
        .map(w => w.hanzi || w.word)
        .filter(k => !this.groupMistakes.includes(k));

      // Lưu kết quả nhóm vào tiến độ (chỉ pass khi pct >= 60)
      this.progress = saveGroupProgress(this.progress, this.currentLesson.id, chunk.index, {
        pct,
        correctCount: this.groupCorrectCount,
        totalCount: totalQuestions,
        correctWords: isPassed ? correctWords : [],
        wrongWords: this.groupMistakes
      });
      saveProgress(this.progress);

      if (!isPassed) {
        // DƯỚI 60%: MÀN "CẦN LUYỆN LẠI" (giọng khích lệ, liệt kê từ sai, nút "Luyện lại phần này" — làm lại bước 2–4 của nhóm)
        playTone('wrong');

        const mistakeWords = (this.groupMistakes && this.groupMistakes.length > 0)
          ? this.groupMistakes
          : chunk.words.map(w => w.hanzi || w.word);

        container.innerHTML = `
          <div class="step-card group-summary-card group-retry-card">
            <div class="summary-top-badge">
              <span class="summary-icon retry-icon">${ICONS.repeat}</span>
              <h2 class="summary-title">Cố lên bạn ơi, cùng luyện lại nhé!</h2>
              <p class="summary-desc">Bạn đạt <b>${pct}%</b> chính xác (bước 2–4). Cần đạt tối thiểu <b>60%</b> để hoàn thành nhóm này.</p>
            </div>

            <div class="summary-metrics-grid">
              <div class="metric-box">
                <span class="metric-num">${this.groupCorrectCount}/${totalQuestions}</span>
                <span class="metric-label">Câu trả lời đúng</span>
              </div>
              <div class="metric-box">
                <span class="metric-num">${pct}%</span>
                <span class="metric-label">Độ chính xác</span>
              </div>
            </div>

            <div class="summary-mistakes-box">
              <span class="mistakes-label">Các từ cần chú ý luyện lại:</span>
              <div class="mistakes-chips">
                ${mistakeWords.map(k => `<span class="mistake-chip">${k}</span>`).join('')}
              </div>
            </div>

            <div class="summary-actions-row">
              <button class="learn-btn-primary btn-gold" id="btn-retry-group">
                <span>${ICONS.repeat} Luyện lại phần này</span>
              </button>
              <button class="learn-btn-secondary" id="btn-back-hub">Về bài học</button>
            </div>
          </div>
        `;

        const retryBtn = container.querySelector('#btn-retry-group');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => {
            // Làm lại bước 2–4 của nhóm
            this.currentStep = 2;
            this.matchingCards = null;
            this.selectedMatchCard = null;
            this.matchedPairsCount = 0;
            this.matchCardErrors = {};
            this.groupPracticeQuestions = null;
            this.currentPracticeIdx = 0;
            this.typingWordIndex = 0;
            this.groupMistakes = [];
            this.groupCorrectCount = 0;
            this.groupTotalCount = 0;
            this.renderGroupRunner();
          });
        }

        const backHubBtn = container.querySelector('#btn-back-hub');
        if (backHubBtn) {
          backHubBtn.addEventListener('click', () => {
            this.currentGroupIndex = null;
            this.render();
          });
        }
        return;
      }

      // ĐẠT >= 60%: MÀN HOÀN THÀNH NHÓM
      playTone('complete');

      const allGroupsDone = allChunks.every(c => {
        const g = this.progress.lessons?.[this.currentLesson.id]?.groups?.[c.index];
        return g && g.done === true;
      });

      container.innerHTML = `
        <div class="step-card group-summary-card">
          <div class="summary-top-badge">
            <span class="summary-icon">${ICONS.check}</span>
            <h2 class="summary-title">Hoàn thành ${chunk.label}!</h2>
            <p class="summary-desc">Bạn đã xuất sắc vượt qua cả 4 bước của nhóm từ này với độ chính xác ${pct}%.</p>
          </div>

          <div class="summary-metrics-grid">
            <div class="metric-box">
              <span class="metric-num">${correctWords.length}/${totalWords}</span>
              <span class="metric-label">Từ thuộc ngay</span>
            </div>
            <div class="metric-box">
              <span class="metric-num">${pct}%</span>
              <span class="metric-label">Độ chính xác</span>
            </div>
          </div>

          ${this.groupMistakes.length > 0 ? `
            <div class="summary-mistakes-box">
              <span class="mistakes-label">Từ đã lưu vào Sổ từ hay nhầm:</span>
              <div class="mistakes-chips">
                ${this.groupMistakes.map(k => `<span class="mistake-chip">${k}</span>`).join('')}
              </div>
            </div>
          ` : `
            <div class="summary-perfect-note">
              ${ICONS.sparkle} Tuyệt vời! Bạn không mắc lỗi nào trong nhóm từ này.
            </div>
          `}

          <div class="summary-actions-row">
            ${!isLastGroup ? `
              <button class="learn-btn-primary btn-gold" id="btn-next-group">
                <span>Nhóm tiếp theo</span> ${ICONS.arrowRight}
              </button>
            ` : (allGroupsDone ? `
              <button class="learn-btn-primary btn-gold" id="btn-finish-all-groups">
                <span>Hoàn thành bài học</span> ${ICONS.check}
              </button>
            ` : `
              <button class="learn-btn-primary btn-gold" id="btn-finish-all-groups">
                <span>Luyện tiếp phần chưa xong</span> ${ICONS.arrowRight}
              </button>
            `)}
            <button class="learn-btn-secondary" id="btn-back-hub">Về bài học</button>
          </div>
        </div>
      `;

      const nextGroupBtn = container.querySelector('#btn-next-group');
      if (nextGroupBtn) {
        nextGroupBtn.addEventListener('click', () => {
          this.startGroup(chunk.index + 1);
        });
      }

      const finishLessonBtn = container.querySelector('#btn-finish-all-groups');
      if (finishLessonBtn) {
        finishLessonBtn.addEventListener('click', () => {
          if (allGroupsDone) {
            this.renderLessonCompleteScreen(container);
          } else {
            const firstUnfinished = allChunks.find(c => !this.progress.lessons?.[this.currentLesson.id]?.groups?.[c.index]?.done);
            if (firstUnfinished) {
              this.startGroup(firstUnfinished.index);
            } else {
              this.currentGroupIndex = null;
              this.render();
            }
          }
        });
      }

      const backHubBtn = container.querySelector('#btn-back-hub');
      if (backHubBtn) {
        backHubBtn.addEventListener('click', () => {
          this.currentGroupIndex = null;
          this.render();
        });
      }
    },

    /* TỔNG KẾT BÀI HỌC KHI XONG MỌI NHÓM (TRAO SAO & MỞ BÀI KẾ) */
    renderLessonCompleteScreen(container) {
      const lesson = this.currentLesson;
      const allWords = (lesson.newWords || []).map(k => resolveWord(k, this.words)).filter(Boolean);
      const allChunks = chunkWords(allWords, 5);
      const totalGroups = allChunks.length;

      const lsnRecord = (this.progress.lessons && this.progress.lessons[lesson.id]) || {};
      const groups = lsnRecord.groups || {};

      const result = calculateLessonResult(totalGroups, groups);

      if (!result.isComplete || result.stars < 1) {
        // Chưa hoàn thành mọi nhóm: không chúc mừng, không thưởng, không sao
        container.innerHTML = `
          <div class="step-card lesson-finish-card">
            <div class="summary-top-badge">
              <span class="summary-icon retry-icon">${ICONS.repeat}</span>
              <h2 class="summary-title">Chưa hoàn thành bài học</h2>
              <p class="summary-desc">Bạn cần hoàn thành tất cả ${totalGroups} phần của bài học (đạt ≥ 60% mỗi phần) để nhận sao và mở bài kế tiếp.</p>
            </div>
            <div class="finish-actions-row">
              <button class="learn-btn-primary" id="btn-return-roadmap">Về bài học</button>
            </div>
          </div>
        `;
        const backRoadmapBtn = container.querySelector('#btn-return-roadmap');
        if (backRoadmapBtn) {
          backRoadmapBtn.addEventListener('click', () => {
            this.currentGroupIndex = null;
            this.render();
          });
        }
        return;
      }

      const stars = result.stars;
      const pct = result.pct;

      this.progress.lessons = this.progress.lessons || {};
      const prevRecord = this.progress.lessons[lesson.id] || {};
      const isNew = !prevRecord.stars || stars > (prevRecord.stars || 0);

      this.progress.lessons[lesson.id] = {
        stars: Math.max(prevRecord.stars || 0, stars),
        best: Math.max(prevRecord.best || 0, pct),
        doneAt: Date.now(),
        groups: prevRecord.groups || {}
      };
      saveProgress(this.progress);

      this.rewardEconomy('lessonDone', { isNew, lessonId: lesson.id, stars });
      if (stars === 3) this.rewardEconomy('lessonPerfect');

      playTone('complete');

      container.innerHTML = `
        <div class="step-card lesson-finish-card">
          <div class="summary-top-badge">
            <div class="finish-stars-anim">
              ${[1, 2, 3].map(s => `
                <span class="finish-star ${s <= stars ? 'earned' : ''}">
                  ${s <= stars ? ICONS.starFilled : ICONS.starOutline}
                </span>
              `).join('')}
            </div>
            <h2 class="summary-title">Chúc mừng! Bạn đã hoàn thành bài học</h2>
            <p class="summary-lesson-title">${lesson.title}</p>
          </div>

          <div class="finish-stats-grid">
            <div class="metric-box">
              <span class="metric-num">${pct}%</span>
              <span class="metric-label">Độ chính xác trung bình</span>
            </div>
            <div class="metric-box">
              <span class="metric-num">${stars}/3</span>
              <span class="metric-label">Sao đạt được</span>
            </div>
          </div>

          <div class="finish-actions-row">
            <button class="learn-btn-primary btn-gold" id="btn-next-lesson-jump">
              <span>Bài tiếp theo</span> ${ICONS.arrowRight}
            </button>
            <a href="#${this.lang}/learn?lesson=${lesson.id}&practice=hub" class="learn-btn-secondary" id="btn-finish-practice">
              ${ICONS.sparkle} <span>Luyện tập bài này</span>
            </a>
            <button class="learn-btn-secondary" id="btn-return-roadmap">
              Về lộ trình
            </button>
            <a href="#farm" class="learn-btn-secondary">${ICONS.sparkle} Vườn Treo</a>
          </div>
        </div>
      `;

      const nextLsnBtn = container.querySelector('#btn-next-lesson-jump');
      if (nextLsnBtn) {
        nextLsnBtn.addEventListener('click', () => {
          const nextL = nextLesson(this.curriculum, this.progress);
          if (nextL) {
            this.startLesson(nextL.id);
          } else {
            alert('Chúc mừng! Bạn đã hoàn thành toàn bộ bài học mở trong cấp này.');
            this.currentLesson = null;
            this.currentGroupIndex = null;
            this.render();
          }
        });
      }

      const finishPracticeBtn = container.querySelector('#btn-finish-practice');
      if (finishPracticeBtn) {
        finishPracticeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (typeof window !== 'undefined') {
            window.location.hash = `#${this.lang}/learn?lesson=${lesson.id}&practice=hub`;
          }
        });
      }

      const backRoadmapBtn = container.querySelector('#btn-return-roadmap');
      if (backRoadmapBtn) {
        backRoadmapBtn.addEventListener('click', () => {
          this.currentLesson = null;
          this.currentGroupIndex = null;
          this.render();
        });
      }
    },

    /* --------------------------------------------------------------------------
       4. THẺ TỪ (WORD CARD COMPONENT) - ĐẦY ĐỦ CHI TIẾT
       -------------------------------------------------------------------------- */

    renderWordCardHtml(word, options = {}) {
      if (!word) return '';
      const isZh = this.lang !== 'en';
      const key = word.hanzi || word.word;
      const isSaved = Array.isArray(this.progress.savedCards) && this.progress.savedCards.includes(key);

      // Chiết tự cho tiếng Trung (nếu có CHAR_DECOMP)
      let decompHtml = '';
      if (isZh && typeof window !== 'undefined' && window.CHAR_DECOMP) {
        const chars = Array.from(key);
        const decompList = chars.map(ch => {
          const d = window.CHAR_DECOMP[ch];
          return d ? Object.assign({ char: ch }, d) : null;
        }).filter(Boolean);

        if (decompList.length > 0) {
          decompHtml = `
            <div class="word-card-decomp-block">
              <div class="decomp-header">${ICONS.book} <span>Chiết tự chữ Hán</span></div>
              <div class="decomp-items-list">
                ${decompList.map(d => {
                  const parts = d.parts || d.components || [];
                  const formula = d.decomposition || d.formula || (parts.length > 0 ? parts.map(p => p.c || p.part || '').filter(Boolean).join(' + ') : '');
                  return `
                    <div class="decomp-item">
                      <div class="decomp-item-title">
                        <span class="decomp-char-badge">${d.char || ''}</span>
                        ${formula ? `<span class="decomp-formula">${formula}</span>` : ''}
                        ${d.strokes ? `<span class="decomp-pill">${d.strokes} nét</span>` : ''}
                        ${d.structure ? `<span class="decomp-pill">${d.structure}</span>` : ''}
                      </div>
                      ${parts.length > 0 ? `
                        <ul class="decomp-parts-sublist">
                          ${parts.map(p => {
                            const pChar = p.c || p.part || p.char || '';
                            const pName = p.name || '';
                            const pMeaning = p.vi || p.meaning || '';
                            const pRole = p.role ? ` • Vai trò: <i>${p.role}</i>` : '';
                            return `<li><b>${pChar}</b>${pName ? ` (${pName})` : ''}${pMeaning ? `: ${pMeaning}` : ''}${pRole}</li>`;
                          }).join('')}
                        </ul>
                      ` : ''}
                      ${d.mnemonic || d.tip ? `
                        <div class="decomp-mnemonic">${ICONS.lightbulb} <b>Mẹo nhớ:</b> ${d.mnemonic || d.tip}</div>
                      ` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }
      }

      // Ví dụ câu mẫu kèm pinyin trên từng từ bằng ruby
      let exampleHtml = '';
      const ex = word.ex;
      let extraExamples = [];
      if (isZh && typeof window !== 'undefined' && window.ZH_EXAMPLES_EXTRA && window.ZH_EXAMPLES_EXTRA[key]) {
        extraExamples = window.ZH_EXAMPLES_EXTRA[key];
      }

      if (ex || extraExamples.length > 0) {
        const primaryZh = ex ? (ex.zh || ex.en) : extraExamples[0]?.zh;
        const primaryVi = ex ? ex.vi : extraExamples[0]?.vi;

        let tokens = null;
        if (typeof window !== 'undefined' && window.ZH_EXAMPLE_TOKENS) {
          tokens = window.ZH_EXAMPLE_TOKENS[key] || window.ZH_EXAMPLE_TOKENS[primaryZh] || null;
        }
        if (!tokens && ex && ex.tokens) {
          tokens = ex.tokens;
        }

        const rubySentence = isZh ? buildRubyHtml(primaryZh, tokens) : primaryZh;

        exampleHtml = `
          <div class="word-card-example-block">
            <div class="example-header">
              <span class="example-title">Ví dụ mẫu:</span>
              <button class="btn-speak-sentence" data-speak="${primaryZh}" aria-label="Nghe câu ví dụ">
                ${ICONS.speaker} <span>Nghe câu</span>
              </button>
            </div>
            <div class="example-ruby-text">${rubySentence}</div>
            <div class="example-vi">${primaryVi}</div>

            ${extraExamples.length > 1 ? `
              <div class="extra-examples-wrapper">
                <button class="btn-toggle-extra-examples" id="btn-toggle-extra">
                  Xem thêm ${extraExamples.length - 1} ví dụ
                </button>
                <div class="extra-examples-list" id="extra-examples-list" style="display: none;">
                  ${extraExamples.slice(1).map(extra => `
                    <div class="extra-ex-item">
                      <div class="extra-ex-zh">${buildRubyHtml(extra.zh, extra.tokens || null)}</div>
                      <div class="extra-ex-vi">${extra.vi}</div>
                      <button class="btn-speak-sentence btn-small" data-speak="${extra.zh}" aria-label="Nghe">${ICONS.speaker}</button>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        `;
      }

      return `
        <div class="full-word-card">
          <!-- Phần đầu từ to & phiên âm & nút nghe thường / chậm -->
          <div class="word-card-top-hero">
            <div class="word-card-main-char">${key}</div>
            <div class="word-card-pinyin-large">${isZh ? word.pinyin : (word.ipa || word.pinyin)}</div>
            
            <div class="word-card-audio-controls">
              <button class="btn-word-audio btn-normal" data-speak="${key}" data-rate="1.0" aria-label="Phát âm chuẩn 1.0x">
                ${ICONS.speaker} <span>Phát âm (1.0x)</span>
              </button>
              <button class="btn-word-audio btn-slow" data-speak="${key}" data-rate="0.7" aria-label="Phát âm chậm 0.7x">
                ${ICONS.speakerSlow} <span>Chậm (0.7x)</span>
              </button>
            </div>

            <div class="word-card-meta-tags">
              ${word.pos ? `<span class="badge-pos">${word.pos}</span>` : ''}
              ${word.hanViet ? `<span class="badge-hanviet">Hán-Việt: <b>${word.hanViet}</b></span>` : ''}
            </div>
            <div class="word-card-meaning-text">${word.vi}</div>
          </div>

          <!-- Khối chiết tự -->
          ${decompHtml}

          <!-- Khối ví dụ -->
          ${exampleHtml}

          <!-- Ghi chú nếu có -->
          ${word.note ? `
            <div class="word-card-note-block">
              <div class="note-label">${ICONS.lightbulb} <b>${isZh ? 'Mẹo nhớ & Ghi chú:' : 'Ghi chú phát âm:'}</b></div>
              <div class="note-body">${word.note}</div>
            </div>
          ` : ''}

          <!-- Nút lưu vào thẻ ôn -->
          <div class="word-card-bottom-bar">
            <button class="btn-bookmark-card ${isSaved ? 'saved' : ''}" data-word-key="${key}">
              ${isSaved ? ICONS.check : ICONS.bookmark}
              <span>${isSaved ? 'Đã lưu vào thẻ ôn' : 'Lưu vào thẻ ôn'}</span>
            </button>
          </div>
        </div>
      `;
    },

    attachWordCardEvents(container, word) {
      const key = word.hanzi || word.word;

      // Nút phát âm thường & chậm
      container.querySelectorAll('.btn-word-audio').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const rate = parseFloat(btn.getAttribute('data-rate') || '1.0');
          speakText(key, null, rate);
        });
      });

      // Nút phát âm câu ví dụ
      container.querySelectorAll('.btn-speak-sentence').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          speakText(btn.getAttribute('data-speak'));
        });
      });

      // Mở rộng thêm ví dụ
      const toggleExtraBtn = container.querySelector('#btn-toggle-extra');
      const extraListEl = container.querySelector('#extra-examples-list');
      if (toggleExtraBtn && extraListEl) {
        toggleExtraBtn.addEventListener('click', () => {
          const isHidden = extraListEl.style.display === 'none';
          extraListEl.style.display = isHidden ? 'block' : 'none';
          toggleExtraBtn.textContent = isHidden ? 'Thu gọn ví dụ' : 'Xem thêm ví dụ';
        });
      }

      // Lưu thẻ ôn
      const bookmarkBtn = container.querySelector('.btn-bookmark-card');
      if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', () => {
          this.progress.savedCards = this.progress.savedCards || [];
          const idx = this.progress.savedCards.indexOf(key);
          if (idx === -1) {
            this.progress.savedCards.push(key);
            bookmarkBtn.classList.add('saved');
            bookmarkBtn.innerHTML = `${ICONS.check} <span>Đã lưu vào thẻ ôn</span>`;
          } else {
            this.progress.savedCards.splice(idx, 1);
            bookmarkBtn.classList.remove('saved');
            bookmarkBtn.innerHTML = `${ICONS.bookmark} <span>Lưu vào thẻ ôn</span>`;
          }
          saveProgress(this.progress);
        });
      }
    },

    openWordCardModal(wordKey) {
      const modal = this.containerEl.querySelector('#word-detail-modal');
      const body = this.containerEl.querySelector('#word-detail-modal-body');
      if (!modal || !body) return;

      const word = resolveWord(wordKey, this.words);
      if (!word) return;

      body.innerHTML = this.renderWordCardHtml(word, { isStepRunner: false });
      this.attachWordCardEvents(body, word);
      modal.style.display = 'flex';
    },

    /* --------------------------------------------------------------------------
       5. KIỂM TRA CHẶNG (CHECKPOINT RUNNER)
       -------------------------------------------------------------------------- */

    startCheckpoint(unitId) {
      if (!this.curriculum) return;
      let targetUnit = null;
      for (const lvl of this.curriculum.levels) {
        targetUnit = (lvl.units || []).find(u => u.id === unitId);
        if (targetUnit) break;
      }
      if (!targetUnit) return;

      const questions = buildCheckpointExercises(targetUnit, this.words);
      let qIndex = 0;
      let score = 0;

      const renderCheckpointQuestion = () => {
        if (qIndex >= questions.length) {
          const pct = Math.round((score / questions.length) * 100);
          const passed = pct >= 80;

          if (passed) {
            playTone('complete');
            this.progress.checkpoints = this.progress.checkpoints || {};
            this.progress.checkpoints[unitId] = pct;
            saveProgress(this.progress);
            this.rewardEconomy('checkpointPass');
          } else {
            playTone('wrong');
          }

          this.containerEl.innerHTML = `
            <div class="learn-runner-screen">
              <div class="step-card summary-card">
                <div class="summary-top-badge">
                  <span class="summary-icon">${passed ? ICONS.trophy : ICONS.lock}</span>
                  <h2 class="summary-title">${passed ? 'Vượt qua Kiểm tra chặng!' : 'Chưa đạt yêu cầu (cần ≥ 80%)'}</h2>
                  <p class="summary-desc">${targetUnit.title}</p>
                </div>

                <div class="summary-metrics-grid">
                  <div class="metric-box">
                    <span class="metric-num">${pct}%</span>
                    <span class="metric-label">Điểm số đạt</span>
                  </div>
                  <div class="metric-box">
                    <span class="metric-num">${score}/${questions.length}</span>
                    <span class="metric-label">Số câu đúng</span>
                  </div>
                </div>

                <div class="summary-actions-row">
                  <button class="learn-btn-primary btn-gold" id="btn-cp-finish">Quay về lộ trình</button>
                </div>
              </div>
            </div>
          `;

          const finishBtn = this.containerEl.querySelector('#btn-cp-finish');
          if (finishBtn) finishBtn.addEventListener('click', () => {
            this.currentLesson = null;
            this.currentGroupIndex = null;
            this.render();
          });
          return;
        }

        const q = questions[qIndex];
        this.containerEl.innerHTML = `
          <div class="learn-runner-screen">
            <div class="runner-nav-bar">
              <button class="runner-exit-btn" id="btn-cp-exit">${ICONS.close}</button>
              <div class="runner-steps-indicator">
                <span class="step-summary-badge">${ICONS.trophy} Kiểm tra chặng • Câu ${qIndex + 1}/${questions.length}</span>
              </div>
              <div class="runner-nav-right">
                <span class="score-pill">Đúng: ${score}</span>
              </div>
            </div>

            <div class="runner-content-container">
              <div class="step-card practice-step-card">
                <h2 class="practice-prompt-title">${q.prompt}</h2>
                <div class="practice-display-box">
                  <div class="practice-target-char">${q.hanzi}</div>
                  <div class="practice-target-py">${q.pinyin || ''}</div>
                  <button class="mini-card-speak" id="btn-cp-speak" aria-label="Nghe">${ICONS.speaker}</button>
                </div>

                <div class="practice-options-grid">
                  ${q.options.map(opt => `
                    <button class="learn-btn-option cp-opt-btn" data-ans="${opt}">
                      <span>${opt}</span>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        `;

        const exitBtn = this.containerEl.querySelector('#btn-cp-exit');
        if (exitBtn) {
          exitBtn.addEventListener('click', () => {
            if (confirm('Thoát kiểm tra chặng? Kết quả sẽ không được ghi nhận.')) {
              this.currentLesson = null;
              this.currentGroupIndex = null;
              this.render();
            }
          });
        }

        const speakBtn = this.containerEl.querySelector('#btn-cp-speak');
        if (speakBtn) speakBtn.addEventListener('click', () => speakText(q.hanzi));

        this.containerEl.querySelectorAll('.cp-opt-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const ans = btn.getAttribute('data-ans');
            if (ans === q.correct) {
              score++;
              playTone('correct');
              btn.classList.add('correct');
            } else {
              playTone('wrong');
              btn.classList.add('wrong');
            }
            setTimeout(() => {
              qIndex++;
              renderCheckpointQuestion();
            }, 600);
          });
        });
      };

      renderCheckpointQuestion();
    }
  };

  /* ==========================================================================
     6. GẮN GLOBAL WINDOW & NODE.JS EXPORTS
     ========================================================================== */

  if (typeof window !== 'undefined') {
    window.LearnPath = LearnPath;
    window.starsFor = starsFor;
    window.getStepSummaryLabel = getStepSummaryLabel;
    window.calculateLessonResult = calculateLessonResult;
    window.getOpenLevels = getOpenLevels;
    window.isLessonUnlocked = isLessonUnlocked;
    window.nextLesson = nextLesson;
    window.splitSentence = splitSentence;
    window.chunkWords = chunkWords;
    window.filterWords = filterWords;
    window.gradeMatchPair = gradeMatchPair;
    window.comparePinyin = comparePinyin;
    window.buildRubyHtml = buildRubyHtml;
    window.saveGroupProgress = saveGroupProgress;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      starsFor,
      getStepSummaryLabel,
      calculateLessonResult,
      getOpenLevels,
      isLessonUnlocked,
      nextLesson,
      splitSentence,
      chunkWords,
      filterWords,
      gradeMatchPair,
      comparePinyin,
      buildRubyHtml,
      saveGroupProgress,
      buildExercises,
      buildCheckpointExercises,
      buildGroupPractice,
      loadProgress,
      saveProgress,
      FALLBACK_WORDS,
      ICONS,
      LearnPath
    };
  }
})();
