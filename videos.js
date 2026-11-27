/**
 * videos.js - Module Video giải trí & Học ngoại ngữ PolyLingo
 * Tích hợp YouTube IFrame API, phụ đề tương tác tra từ, shadowing luyện nói,
 * bảng lời thoại cuộn tự động và câu hỏi trắc nghiệm tự sinh.
 * Hỗ trợ chạy trên cả trình duyệt và Node.js test runner.
 */

(function () {
  'use strict';

  const ic = (n, opts) => (typeof window !== 'undefined' && window.PolyIcons ? window.PolyIcons.svg(n, opts) : (typeof PolyIcons !== 'undefined' ? PolyIcons.svg(n, opts) : ''));

  /* ==========================================================================
     1. PURE LOGICAL HELPER FUNCTIONS (Có thể test độc lập trên Node.js)
     ========================================================================== */

  /**
   * Phân tích và trích xuất YouTube Video ID từ mọi dạng link hoặc id thô.
   * Hỗ trợ: watch?v=, youtu.be/, shorts/, embed/, v/, kèm &t=, &list=...
   * @param {string} url Link hoặc ID YouTube
   * @returns {string} ID 11 ký tự của video hoặc '' nếu không hợp lệ
   */
  function parseYouTubeId(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (!trimmed) return '';

    // Trường hợp đã là ID 11 ký tự thô
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }

    // Regex bao quát mọi dạng link YouTube
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = trimmed.match(regExp);
    return (match && match[1]) ? match[1] : '';
  }

  /**
   * Chuyển đổi chuỗi mốc thời gian SRT/VTT (00:01:23,456 hoặc 01:23.456) sang giây
   * @param {string} ts Mốc thời gian
   * @returns {number} Số giây (float)
   */
  function parseTimestampToSeconds(ts) {
    if (!ts || typeof ts !== 'string') return 0;
    const clean = ts.trim().replace(',', '.');
    const parts = clean.split(':');
    if (parts.length === 3) {
      const h = parseFloat(parts[0]) || 0;
      const m = parseFloat(parts[1]) || 0;
      const s = parseFloat(parts[2]) || 0;
      return h * 3600 + m * 60 + s;
    } else if (parts.length === 2) {
      const m = parseFloat(parts[0]) || 0;
      const s = parseFloat(parts[1]) || 0;
      return m * 60 + s;
    } else if (parts.length === 1) {
      return parseFloat(parts[0]) || 0;
    }
    return 0;
  }

  /**
   * Đọc và phân tích nội dung phụ đề định dạng SRT hoặc WebVTT.
   * Xử lý cả file 1 dòng Hanzi hoặc file song ngữ (dòng 1: Hanzi, dòng 2: Tiếng Việt, hoặc tách bởi '//')
   * @param {string} text Nội dung file SRT/VTT
   * @returns {Array<{start: number, end: number, zh: string, py: string, vi: string}>}
   */
  function parseSrtOrVtt(text) {
    if (!text || typeof text !== 'string') return [];
    const cues = [];
    const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const blocks = normalized.split(/\n\s*\n/);

    const timeRegex = /((?:\d{1,2}:)?\d{1,2}:\d{2}[,\.]\d{1,3})\s*-->\s*((?:\d{1,2}:)?\d{1,2}:\d{2}[,\.]\d{1,3})/;

    for (const block of blocks) {
      const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length === 0) continue;

      let timeLineIdx = -1;
      let match = null;

      for (let i = 0; i < lines.length; i++) {
        match = lines[i].match(timeRegex);
        if (match) {
          timeLineIdx = i;
          break;
        }
      }

      if (!match || timeLineIdx === -1) continue;

      const start = parseTimestampToSeconds(match[1]);
      const end = parseTimestampToSeconds(match[2]);
      const textLines = lines.slice(timeLineIdx + 1);

      if (textLines.length === 0) continue;

      let zh = '';
      let py = '';
      let vi = '';

      if (textLines.length === 1) {
        const line = textLines[0];
        if (line.includes('//')) {
          const parts = line.split('//').map(p => p.trim());
          zh = parts[0] || '';
          vi = parts[1] || '';
        } else {
          zh = line;
        }
      } else if (textLines.length === 2) {
        zh = textLines[0];
        vi = textLines[1];
      } else if (textLines.length >= 3) {
        zh = textLines[0];
        py = textLines[1];
        vi = textLines.slice(2).join(' ');
      }

      // Xóa các thẻ HTML đơn giản nếu có (ví dụ <i>, <b>, <font>)
      zh = zh.replace(/<[^>]+>/g, '').trim();
      py = py.replace(/<[^>]+>/g, '').trim();
      vi = vi.replace(/<[^>]+>/g, '').trim();

      if (zh || vi) {
        cues.push({
          start: Math.round(start * 100) / 100,
          end: Math.round(end * 100) / 100,
          zh,
          py,
          vi
        });
      }
    }

    return cues;
  }

  /**
   * Ghép 2 file phụ đề riêng biệt (file tiếng Trung và file tiếng Việt) dựa trên mốc thời gian
   * @param {string} zhText Nội dung phụ đề tiếng Trung
   * @param {string} viText Nội dung phụ đề tiếng Việt
   * @returns {Array<{start: number, end: number, zh: string, py: string, vi: string}>}
   */
  function parseBilingualSubs(zhText, viText) {
    const zhCues = parseSrtOrVtt(zhText);
    const viCues = parseSrtOrVtt(viText);

    if (viCues.length === 0) return zhCues;
    if (zhCues.length === 0) return viCues;

    // Khớp từng câu tiếng Trung với câu tiếng Việt có khoảng thời gian trùng nhau nhất
    return zhCues.map((zhCue, idx) => {
      let matchedVi = '';
      // Ưu tiên khớp theo cùng thứ tự nếu số lượng bằng nhau
      if (zhCues.length === viCues.length && Math.abs(zhCue.start - viCues[idx].start) < 2.0) {
        matchedVi = viCues[idx].vi || viCues[idx].zh;
      } else {
        // Tìm câu vi có độ giao thời gian lớn nhất
        let bestOverlap = 0;
        let bestIdx = -1;
        for (let i = 0; i < viCues.length; i++) {
          const v = viCues[i];
          const overlapStart = Math.max(zhCue.start, v.start);
          const overlapEnd = Math.min(zhCue.end, v.end);
          const overlap = overlapEnd - overlapStart;
          if (overlap > bestOverlap) {
            bestOverlap = overlap;
            bestIdx = i;
          }
        }
        if (bestIdx !== -1) {
          matchedVi = viCues[bestIdx].vi || viCues[bestIdx].zh;
        } else if (viCues[idx]) {
          matchedVi = viCues[idx].vi || viCues[idx].zh;
        }
      }

      return {
        start: zhCue.start,
        end: zhCue.end,
        zh: zhCue.zh,
        py: zhCue.py || '',
        vi: matchedVi || zhCue.vi || ''
      };
    });
  }

  /**
   * Tìm câu phụ đề đang phát tại thời điểm currentTime (giây)
   * @param {Array} subs Danh sách câu phụ đề
   * @param {number} currentTime Thời gian hiện tại tính bằng giây
   * @returns {object|null}
   */
  function findCueByTime(subs, currentTime) {
    if (!Array.isArray(subs) || subs.length === 0) return null;
    const t = Number(currentTime) || 0;
    for (let i = 0; i < subs.length; i++) {
      const cue = subs[i];
      if (t >= cue.start && t <= cue.end + 0.25) {
        return cue;
      }
    }
    return null;
  }

  /**
   * Tách câu chữ Hán thành các từ dài nhất có trong từ điển HSK,
   * nếu không có thì tách từng chữ đơn kèm pinyin tra từ bảng ký tự.
   * @param {string} text Chuỗi chữ Hán
   * @param {object} dict Từ điển từ vựng (ví dụ window.HSK1_WORDS)
   * @param {object} charPinyinMap Bảng tra chữ -> pinyin (ví dụ window.CHAR_PINYIN)
   * @returns {Array<{text: string, word: string, py: string, vi: string, isWord: boolean, isChar: boolean, isPunct: boolean}>}
   */
  function escapeVideoText(v) {
    return String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /** Thoát HTML mọi chuỗi trong video tự thêm (trừ link YouTube cần giữ nguyên để tách ID). */
  function sanitizeLocalVideo(video) {
    const walk = (val, key) => {
      if (typeof val === 'string') return key === 'youtube' ? val : escapeVideoText(val);
      if (Array.isArray(val)) return val.map(x => walk(x, ''));
      if (val && typeof val === 'object') {
        const out = {};
        Object.keys(val).forEach(k => { out[k] = walk(val[k], k); });
        return out;
      }
      return val;
    };
    return walk(video, '');
  }

  function tokenizeLongestWords(text, dict, charPinyinMap) {
    if (!text || typeof text !== 'string') return [];
    const dictionary = dict || (typeof window !== 'undefined' ? window.HSK1_WORDS : {}) || {};
    const charMap = charPinyinMap || (typeof window !== 'undefined' ? window.CHAR_PINYIN : {}) || {};

    const tokens = [];
    let i = 0;
    const chars = Array.from(text);

    while (i < chars.length) {
      const ch = chars[i];

      // Nếu là ký tự trắng hoặc dấu câu
      if (/[\s\p{P}\p{S}]/u.test(ch)) {
        tokens.push({
          text: ch,
          word: ch,
          py: '',
          vi: '',
          isWord: false,
          isChar: false,
          isPunct: true
        });
        i++;
        continue;
      }

      // Thử tìm từ ghép dài nhất (từ 5 chữ xuống 1 chữ) trong từ điển
      let matched = false;
      const maxLen = Math.min(5, chars.length - i);

      for (let len = maxLen; len >= 2; len--) {
        const candidate = chars.slice(i, i + len).join('');
        if (dictionary[candidate]) {
          const entry = dictionary[candidate];
          tokens.push({
            text: candidate,
            word: candidate,
            py: entry.py || '',
            vi: entry.vi || '',
            isWord: true,
            isChar: false,
            isPunct: false
          });
          i += len;
          matched = true;
          break;
        }
      }

      if (matched) continue;

      // Nếu không khớp từ ghép: xét 1 chữ đơn
      const singleChar = chars[i];
      if (dictionary[singleChar]) {
        const entry = dictionary[singleChar];
        tokens.push({
          text: singleChar,
          word: singleChar,
          py: entry.py || charMap[singleChar] || '',
          vi: entry.vi || '',
          isWord: true,
          isChar: true,
          isPunct: false
        });
      } else {
        const py = charMap[singleChar] || '';
        tokens.push({
          text: singleChar,
          word: singleChar,
          py: py,
          vi: '',
          isWord: false,
          isChar: true,
          isPunct: false
        });
      }
      i++;
    }

    return tokens;
  }

  /**
   * Tra cứu thông tin chi tiết một từ hoặc một chữ
   * @param {string} word Từ hoặc chữ cần tra
   * @param {object} dict Từ điển từ vựng
   * @param {object} charPinyinMap Bảng chữ pinyin
   */
  function lookupWord(word, dict, charPinyinMap) {
    if (!word) return null;
    const cleanWord = String(word).trim();
    const isEn = (typeof VideoLearn !== 'undefined' && VideoLearn.lang === 'en') ||
                 (typeof window !== 'undefined' && window.app && window.app.currentLang === 'en') ||
                 /^[a-zA-Z0-9'’-]+$/.test(cleanWord);

    if (isEn) {
      const rawEn = typeof window !== 'undefined' ? window.EN_WORDS : null;
      const enDict = Array.isArray(dict) ? dict : (rawEn ? (Array.isArray(rawEn) ? rawEn : Object.values(rawEn)) : []);
      const lower = cleanWord.toLowerCase();
      const found = (rawEn && rawEn[lower]) || enDict.find(w => (w.word || '').toLowerCase() === lower);
      if (found) {
        return {
          word: found.word || cleanWord,
          py: found.ipa || '',
          vi: found.vi || '',
          hv: '',
          pos: found.pos || '',
          note: found.note || '',
          ex: found.ex ? { zh: found.ex.en || '', py: '', vi: found.ex.vi || '' } : null,
          isWord: true
        };
      }
      return {
        word: cleanWord,
        py: '',
        vi: 'Từ vựng tiếng Anh',
        hv: '',
        pos: '',
        note: '',
        ex: null,
        isWord: false
      };
    }

    const dictionary = dict || (typeof window !== 'undefined' ? window.HSK1_WORDS : {}) || {};
    const charMap = charPinyinMap || (typeof window !== 'undefined' ? window.CHAR_PINYIN : {}) || {};

    if (dictionary[cleanWord]) {
      const item = dictionary[cleanWord];
      return {
        word: cleanWord,
        py: item.py || '',
        vi: item.vi || '',
        hv: item.hv || '',
        pos: item.pos || '',
        note: item.note || '',
        ex: item.ex || null,
        isWord: true
      };
    }

    // Nếu là chữ đơn tra trong bảng char-pinyin
    if (cleanWord.length === 1 && charMap[cleanWord]) {
      return {
        word: cleanWord,
        py: charMap[cleanWord],
        vi: 'Chữ Hán căn bản',
        hv: '',
        pos: 'chữ Hán',
        note: '',
        ex: null,
        isWord: false
      };
    }

    return {
      word: cleanWord,
      py: '',
      vi: 'Chưa có trong từ điển vỡ lòng',
      hv: '',
      pos: '',
      note: '',
      ex: null,
      isWord: false
    };
  }

  /**
   * Tự động sinh 3 đến 5 câu hỏi trắc nghiệm ôn tập từ phụ đề video
   * Gồm: Điền từ còn thiếu vào câu (cloze) và Chọn nghĩa của câu
   * @param {Array} subs Danh sách phụ đề
   * @returns {Array<object>}
   */
  function generateQuizFromSubs(subs) {
    if (!Array.isArray(subs) || subs.length === 0) return [];

    const isEn = (typeof VideoLearn !== 'undefined' && VideoLearn.lang === 'en') ||
                 subs.some(s => s && (s.en || (!s.zh && s.vi)));
    const validCues = subs.filter(s => s && (s.zh || s.en) && s.vi && ((s.en || s.zh).length >= 2));
    if (validCues.length === 0) return [];

    const questions = [];
    const count = Math.min(5, Math.max(3, validCues.length >= 3 ? 3 : validCues.length));

    // Kho từ gây nhiễu mẫu
    const distractorWordsZh = ['好', '你', '我', '他', '叫', '是', '学', '看', '听', '说', '多', '难', '见', '大', '不'];
    const distractorWordsEn = ['is', 'are', 'you', 'they', 'good', 'learn', 'speak', 'see', 'with', 'from', 'have', 'make', 'take', 'help'];
    const distractorWords = isEn ? distractorWordsEn : distractorWordsZh;

    const distractorMeanings = isEn ? [
      'Xin chào bạn',
      'Cảm ơn bạn rất nhiều',
      'Hẹn gặp lại ngày mai',
      'Tiếng Anh rất thú vị',
      'Bạn tên là gì?',
      'Tôi là học sinh',
      'Hôm nay thời tiết rất đẹp'
    ] : [
      'Xin chào bạn',
      'Cảm ơn bạn rất nhiều',
      'Hẹn gặp lại ngày mai',
      'Tiếng Trung rất thú vị',
      'Bạn tên là gì?',
      'Tôi là học sinh',
      'Hôm nay thời tiết rất đẹp'
    ];

    for (let qIdx = 0; qIdx < count; qIdx++) {
      const cue = validCues[qIdx % validCues.length];
      const sentenceText = isEn ? (cue.en || cue.zh) : cue.zh;

      if (qIdx % 2 === 0) {
        // Dạng 1: Điền từ vào câu
        if (isEn) {
          const words = sentenceText.split(/\s+/).map(w => w.replace(/[^\w'-]/g, '')).filter(w => w.length >= 2);
          const targetWord = words.length > 0 ? words[Math.floor(words.length / 2)] : 'learn';
          const maskedSentence = sentenceText.replace(new RegExp('\\b' + targetWord + '\\b', 'i'), ' [ ___ ] ');

          const options = [targetWord];
          for (const dw of distractorWords) {
            if (dw.toLowerCase() !== targetWord.toLowerCase() && !options.includes(dw)) {
              options.push(dw);
            }
            if (options.length >= 4) break;
          }
          shuffleArray(options);
          const correctIndex = options.indexOf(targetWord);

          questions.push({
            id: `quiz_${qIdx + 1}`,
            type: 'fill_blank',
            question: `Chọn từ tiếng Anh thích hợp điền vào chỗ trống:`,
            sentence: maskedSentence,
            translation: cue.vi,
            options,
            answerIndex: correctIndex,
            explanation: `Câu hoàn chỉnh: "${sentenceText}" — ${cue.vi}`
          });
        } else {
          // Tách 1 chữ Hán trong câu làm chỗ trống
          const cleanZh = cue.zh.replace(/[\s\p{P}\p{S}]/gu, '');
          const targetChar = cleanZh.length > 0 ? cleanZh[Math.floor(cleanZh.length / 2)] : '你';
          const maskedSentence = cue.zh.replace(targetChar, ' [ ___ ] ');

          const options = [targetChar];
          for (const dw of distractorWords) {
            if (dw !== targetChar && !options.includes(dw)) {
              options.push(dw);
            }
            if (options.length >= 4) break;
          }
          // Xáo trộn đáp án
          shuffleArray(options);
          const correctIndex = options.indexOf(targetChar);

          questions.push({
            id: `quiz_${qIdx + 1}`,
            type: 'fill_blank',
            question: `Chọn chữ Hán thích hợp điền vào chỗ trống:`,
            sentence: maskedSentence,
            translation: cue.vi,
            options,
            answerIndex: correctIndex,
            explanation: `Câu hoàn chỉnh: "${cue.zh}" — ${cue.vi}`
          });
        }
      } else {
        // Dạng 2: Chọn nghĩa câu
        const correctVi = cue.vi;
        const options = [correctVi];

        for (const otherCue of validCues) {
          if (otherCue.vi && otherCue.vi !== correctVi && !options.includes(otherCue.vi)) {
            options.push(otherCue.vi);
          }
          if (options.length >= 4) break;
        }

        for (const dm of distractorMeanings) {
          if (options.length >= 4) break;
          if (dm !== correctVi && !options.includes(dm)) {
            options.push(dm);
          }
        }

        shuffleArray(options);
        const correctIndex = options.indexOf(correctVi);

        questions.push({
          id: `quiz_${qIdx + 1}`,
          type: 'sentence_meaning',
          question: isEn ? `Câu tiếng Anh sau có nghĩa là gì?` : `Câu tiếng Trung sau có nghĩa là gì?`,
          sentence: sentenceText,
          pinyin: isEn ? (cue.ipa || cue.py || '') : (cue.py || ''),
          options,
          answerIndex: correctIndex,
          explanation: `"${sentenceText}" ${cue.ipa || cue.py ? `(${cue.ipa || cue.py}) ` : ''}nghĩa là: ${cue.vi}`
        });
      }
    }

    return questions;
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  /**
   * Xác định ngôn ngữ phù hợp cho video
   */
  function getVideoLang(videoId, langOverride) {
    if (langOverride === 'en' || langOverride === 'zh') return langOverride;
    if (videoId && typeof videoId === 'string') {
      if (videoId.startsWith('en-') || videoId.startsWith('en_')) return 'en';
      if (videoId.startsWith('zh-') || videoId.startsWith('zh_')) return 'zh';
    }
    if (typeof VideoLearn !== 'undefined' && VideoLearn.lang) return VideoLearn.lang;
    if (typeof window !== 'undefined' && window.app && window.app.currentLang) return window.app.currentLang;
    return 'zh';
  }

  /**
   * Lưu tiến độ xem và hoàn thành video vào localStorage ('zh_video_progress_v1' hoặc 'en_video_progress_v1')
   */
  function saveVideoProgress(videoId, progData, langOverride) {
    if (!videoId) return null;
    const lang = getVideoLang(videoId, langOverride);
    const storageKey = `${lang}_video_progress_v1`;
    let store = {};
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) store = JSON.parse(raw);
      }
    } catch (_) {}

    const prev = store[videoId] || {};
    const percent = Math.min(100, Math.max(prev.percent || 0, Math.round(progData.percent || 0)));
    const seconds = Math.max(prev.seconds || 0, Math.round(progData.seconds || 0));
    const quizDone = Boolean(progData.quizDone !== undefined ? progData.quizDone : prev.quizDone);
    const completed = percent >= 80 || prev.completed || false;

    const updated = {
      seconds,
      percent,
      completed,
      quizDone,
      lastUpdated: new Date().toISOString()
    };

    store[videoId] = updated;

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(storageKey, JSON.stringify(store));
      }
    } catch (_) {}

    // Kích hoạt thưởng Economy nếu vừa đạt >= 80% lần đầu
    if (completed && !prev.completed && typeof window !== 'undefined' && window.Economy && typeof window.Economy.reward === 'function') {
      window.Economy.reward('videoWatched', { videoId });
    }

    return updated;
  }

  /**
   * Đọc tiến độ xem một video
   */
  function getVideoProgress(videoId, langOverride) {
    if (!videoId) return { seconds: 0, percent: 0, completed: false, quizDone: false };
    const lang = getVideoLang(videoId, langOverride);
    const storageKey = `${lang}_video_progress_v1`;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const store = JSON.parse(raw);
          if (store[videoId]) return store[videoId];
        }
      }
    } catch (_) {}
    return { seconds: 0, percent: 0, completed: false, quizDone: false };
  }

  /* ==========================================================================
     2. GIAO DIỆN & BỘ ĐIỀU KHIỂN VIDEO (VideoLearn Component)
     ========================================================================== */

  const VideoLearn = {
    containerEl: null,
    currentVideoId: null,
    currentVideo: null,
    player: null,
    playerReady: false,
    virtualTimer: null,
    virtualCurrentTime: 0,
    isPlaying: false,
    activeCue: null,
    lang: 'zh',
    subMode: 'all', // 'zh', 'zh_py', 'all', 'vi', 'hidden' (en: 'en', 'en_ipa', 'en_vi', 'vi', 'hidden')
    playbackRate: 1.0,
    isLoopingCue: false,
    isShadowingMode: false,
    speechRecognition: null,
    isListening: false,
    lastShadowAwardedCue: null,
    activeQuiz: null,
    quizAnswers: {},
    keyHandlerBound: false,

    mount(container) {
      this.containerEl = container;
      this.loadSavedSubMode();
      this.bindGlobalKeyboard();
      this.render();
    },

    onShow(params, langId) {
      this.lang = langId || (typeof window !== 'undefined' && window.app && window.app.currentLang) || 'zh';
      this.loadSavedSubMode();
      const videoId = params ? params.get('v') : null;
      if (videoId) {
        this.openVideo(videoId);
      } else {
        this.currentVideoId = null;
        this.currentVideo = null;
        this.render();
      }
    },

    onHide() {
      this.pause();
      this.stopListening();
    },

    loadSavedSubMode() {
      const key = `${this.lang || 'zh'}_video_sub_mode`;
      const validModes = this.lang === 'en'
        ? ['en', 'en_ipa', 'en_vi', 'vi', 'hidden']
        : ['all', 'zh_py', 'zh', 'vi', 'hidden'];
      const defaultMode = this.lang === 'en' ? 'en_vi' : 'all';
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const m = window.localStorage.getItem(key);
          if (m && validModes.includes(m)) {
            this.subMode = m;
          } else {
            this.subMode = defaultMode;
          }
        } else {
          this.subMode = defaultMode;
        }
      } catch (_) {
        this.subMode = defaultMode;
      }
    },

    setSubMode(mode) {
      this.subMode = mode;
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(`${this.lang || 'zh'}_video_sub_mode`, mode);
        }
      } catch (_) {}
      this.updateSubtitleDisplay();
    },

    getAllVideos() {
      const list = [];
      const isEn = this.lang === 'en';
      const globalList = isEn
        ? (typeof window !== 'undefined' ? window.VIDEOS_EN : null)
        : (typeof window !== 'undefined' ? window.VIDEOS_ZH : null);
      if (Array.isArray(globalList)) {
        list.push(...globalList);
      }
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const key = isEn ? 'en_videos_local' : 'zh_videos_local';
          const local = JSON.parse(window.localStorage.getItem(key) || '[]');
          if (Array.isArray(local)) {
            // Video tự thêm do người dùng nhập: thoát ký tự HTML vì giao diện ghép chuỗi vào innerHTML.
            list.push(...local.map(sanitizeLocalVideo));
          }
        }
      } catch (_) {}
      return list;
    },

    render() {
      if (!this.containerEl) return;
      if (this.currentVideoId && this.currentVideo) {
        this.renderWatchPage();
      } else {
        this.renderListPage();
      }
    },

    /* --- TRANG DANH SÁCH VIDEO --- */
    renderListPage() {
      const isEn = this.lang === 'en';
      const videos = this.getAllVideos();
      const topics = Array.from(new Set(videos.map(v => v.topic).filter(Boolean)));
      const levels = isEn ? ['Starter', 'A1', 'A2', 'B1', 'B2', 'C1'] : ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6'];
      const descText = isEn
        ? 'Xem video YouTube vừa học tiếng Anh với phụ đề đa chế độ, tra cứu từ vựng tức thì và luyện nói shadowing phản xạ.'
        : 'Xem video YouTube vừa học tiếng Trung với phụ đề song ngữ, tra cứu từ vựng tức thì và luyện nói shadowing phản xạ.';

      this.containerEl.innerHTML = `
        <div class="video-module-root">
          <div class="video-top-bar">
            <div class="video-heading-wrap">
              <h1>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="4.5" rx="2.5"/><polygon points="10 9 15 12 10 15 10 9"/></svg>
                Video giải trí
                <span class="video-heading-badge">${videos.length} video</span>
              </h1>
              <p class="video-sub-desc">${descText}</p>
            </div>
            <div class="video-top-actions">
              <button class="video-btn video-btn-outline" id="btn-video-guide">
                ${ic('book-open', { size: 16 })} Hướng dẫn
              </button>
              <button class="video-btn video-btn-primary" id="btn-video-add-modal">
                ${ic('plus', { size: 16 })} Thêm video
              </button>
            </div>
          </div>

          <div class="video-filter-bar">
            <div class="video-search-box">
              <span class="video-search-icon">${ic('search', { size: 16 })}</span>
              <input type="text" id="video-search-input" class="video-search-input" placeholder="Tìm theo tiêu đề, chủ đề, cấp độ...">
            </div>

            <select id="video-level-filter" class="video-select-filter">
              <option value="">Tất cả cấp độ</option>
              ${levels.map(lvl => `<option value="${lvl}">${lvl}</option>`).join('')}
            </select>

            <select id="video-topic-filter" class="video-select-filter">
              <option value="">Tất cả chủ đề</option>
              ${topics.map(top => `<option value="${top}">${top}</option>`).join('')}
            </select>
          </div>

          <div id="video-grid-container" class="video-grid">
            <!-- Dynamic Cards Rendered Here -->
          </div>
        </div>
      `;

      this.bindListEvents();
      this.filterAndRenderGrid();
    },

    bindListEvents() {
      const addBtn = this.containerEl.querySelector('#btn-video-add-modal');
      if (addBtn) addBtn.addEventListener('click', () => this.showAddVideoModal());

      const guideBtn = this.containerEl.querySelector('#btn-video-guide');
      if (guideBtn) guideBtn.addEventListener('click', () => this.showGuideModal());

      const searchInput = this.containerEl.querySelector('#video-search-input');
      if (searchInput) searchInput.addEventListener('input', () => this.filterAndRenderGrid());

      const lvlFilter = this.containerEl.querySelector('#video-level-filter');
      if (lvlFilter) lvlFilter.addEventListener('change', () => this.filterAndRenderGrid());

      const topFilter = this.containerEl.querySelector('#video-topic-filter');
      if (topFilter) topFilter.addEventListener('change', () => this.filterAndRenderGrid());
    },

    filterAndRenderGrid() {
      const grid = this.containerEl.querySelector('#video-grid-container');
      if (!grid) return;

      const searchInput = this.containerEl.querySelector('#video-search-input');
      const lvlFilter = this.containerEl.querySelector('#video-level-filter');
      const topFilter = this.containerEl.querySelector('#video-topic-filter');

      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const level = lvlFilter ? lvlFilter.value : '';
      const topic = topFilter ? topFilter.value : '';

      const allVideos = this.getAllVideos();
      const filtered = allVideos.filter(v => {
        if (level && v.level !== level) return false;
        if (topic && v.topic !== topic) return false;
        if (query) {
          const matchTitle = (v.title || '').toLowerCase().includes(query);
          const matchDesc = (v.desc || '').toLowerCase().includes(query);
          const matchTopic = (v.topic || '').toLowerCase().includes(query);
          if (!matchTitle && !matchDesc && !matchTopic) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="video-empty-state" style="grid-column: 1 / -1;">
            <div class="video-empty-icon">${ic('film', { size: 48 })}</div>
            <div class="video-empty-title">Chưa có video nào</div>
            <div class="video-empty-desc">Không tìm thấy video phù hợp hoặc kho video đang trống. Bạn có thể thêm video YouTube cùng file phụ đề để bắt đầu học ngay!</div>
            <div class="video-empty-actions">
              <button class="video-btn video-btn-outline" id="btn-empty-guide">${ic('book-open', { size: 16 })} Xem hướng dẫn thêm video</button>
              <button class="video-btn video-btn-primary" id="btn-empty-add">${ic('plus', { size: 16 })} Thêm video mới</button>
            </div>
          </div>
        `;
        const eg = grid.querySelector('#btn-empty-guide');
        if (eg) eg.addEventListener('click', () => this.showGuideModal());
        const ea = grid.querySelector('#btn-empty-add');
        if (ea) ea.addEventListener('click', () => this.showAddVideoModal());
        return;
      }

      grid.innerHTML = filtered.map(v => {
        const prog = getVideoProgress(v.id);
        const ytid = parseYouTubeId(v.youtube);
        const thumbUrl = v.thumb || (ytid ? `https://i.ytimg.com/vi/${ytid}/hqdefault.jpg` : '');
        const durationFormatted = this.formatDuration(v.duration || (v.subs && v.subs.length > 0 ? v.subs[v.subs.length - 1].end : 0));

        return `
          <div class="video-card" data-id="${v.id}">
            <div class="video-thumb-wrap">
              ${thumbUrl ? `
                <img class="video-thumb-img" src="${thumbUrl}" alt="${v.title}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="video-thumb-placeholder" style="display:none;">
                  <span style="font-size:2rem;display:inline-flex;align-items:center;justify-content:center;">${ic('film', { size: 32 })}</span>
                  <span style="font-size:0.8rem">${v.isSample ? 'Video mẫu' : 'PolyLingo Video'}</span>
                </div>
              ` : `
                <div class="video-thumb-placeholder">
                  <span style="font-size:2rem;display:inline-flex;align-items:center;justify-content:center;">${ic('film', { size: 32 })}</span>
                  <span style="font-size:0.8rem">${v.isSample ? 'Video mẫu' : 'PolyLingo Video'}</span>
                </div>
              `}
              <div class="video-thumb-play-overlay">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>

              ${prog.completed ? `
                <span class="video-badge-status video-badge-watched">${ic('check', { size: 14 })} Đã xem</span>
              ` : (prog.percent > 0 ? `
                <span class="video-badge-status video-badge-progress">${prog.percent}%</span>
              ` : '')}

              ${v.isLocal ? `<span class="video-badge-local">Video cục bộ</span>` : ''}
              ${v.isSample ? `<span class="video-badge-local" style="background:#B45309">Mẫu</span>` : ''}

              ${durationFormatted ? `<span class="video-badge-duration">${durationFormatted}</span>` : ''}
            </div>

            <div class="video-card-body">
              <div class="video-card-tags">
                <span class="video-tag">${v.level || 'HSK1'}</span>
                ${v.topic ? `<span class="video-tag video-tag-topic">${v.topic}</span>` : ''}
              </div>
              <h3 class="video-card-title">${v.title}</h3>
              <p class="video-card-desc">${v.desc || 'Xem video với phụ đề song ngữ và luyện phản xạ nói.'}</p>

              ${prog.percent > 0 ? `
                <div class="video-card-progress-bar">
                  <div class="video-card-progress-fill" style="width: ${prog.percent}%"></div>
                </div>
              ` : ''}

              <div class="video-card-footer">
                <span style="color:var(--video-text-muted)">${v.subs ? v.subs.length : 0} câu phụ đề</span>
                <span style="color:var(--video-accent);font-weight:700">▶ Xem & Học</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      grid.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
          const vidId = card.getAttribute('data-id');
          this.openVideo(vidId);
        });
      });
    },

    openVideo(videoId) {
      const allVideos = this.getAllVideos();
      const video = allVideos.find(v => v.id === videoId);
      if (!video) return;

      this.currentVideoId = videoId;
      this.currentVideo = video;
      this.virtualCurrentTime = 0;
      this.isPlaying = false;
      this.activeCue = null;
      this.activeQuiz = null;

      // Cập nhật hash url #{lang}/videos?v=...
      if (typeof window !== 'undefined') {
        const targetHash = `#${this.lang || 'zh'}/videos?v=${encodeURIComponent(videoId)}`;
        if (window.location.hash !== targetHash) {
          window.location.hash = targetHash;
        }
      }

      this.render();
    },

    backToList() {
      this.pause();
      this.currentVideoId = null;
      this.currentVideo = null;
      if (typeof window !== 'undefined') {
        window.location.hash = `#${this.lang || 'zh'}/videos`;
      }
      this.render();
    },

    /* --- TRANG XEM VIDEO CHI TIẾT --- */
    renderWatchPage() {
      const v = this.currentVideo;
      if (!v) return;

      const ytid = parseYouTubeId(v.youtube);
      const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:';
      const hasSubs = Array.isArray(v.subs) && v.subs.length > 0;

      this.containerEl.innerHTML = `
        <div class="video-module-root">
          <div class="video-watch-container">
            <div class="video-watch-nav">
              <button class="video-back-btn" id="btn-video-back">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Quay lại danh sách
              </button>
              <div class="video-watch-title-area">
                <span class="video-tag">${v.level || 'HSK1'}</span>
                ${v.topic ? `<span class="video-tag video-tag-topic">${v.topic}</span>` : ''}
                <h2 class="video-watch-main-title">${v.title}</h2>
              </div>
              <div class="video-shortcuts-guide">
                <span class="video-kbd">Space</span> Tạm dừng
                <span class="video-kbd">← / →</span> Tua câu
                <span class="video-kbd">R</span> Lặp câu
              </div>
            </div>

            ${(isFileProtocol && ytid) ? `
              <div class="video-fallback-banner">
                <span>${ic('alert', { size: 16 })} Bạn đang mở web qua giao thức <code>file://</code> nên YouTube có thể chặn phát nhúng. Hãy mở qua <strong>http://localhost:5180</strong> để xem video chuẩn xác. (Bạn vẫn có thể đọc phụ đề và dùng bộ đếm ảo bình thường).</span>
              </div>
            ` : ''}

            <div class="video-watch-grid">
              <!-- Cột trái: Trình phát, Phụ đề, Nút điều khiển, Shadowing, Quiz -->
              <div class="video-player-column">
                <div class="video-player-frame-wrap" id="video-frame-container">
                  ${(ytid && !isFileProtocol) ? `
                    <div id="yt-player-target" class="video-iframe-el"></div>
                  ` : `
                    <div class="video-sample-player-el" id="virtual-player-overlay">
                      <span class="video-sample-badge">${v.isSample ? 'Video mẫu giả lập' : 'Trình phát nội bộ'}</span>
                      <div class="video-sample-time-display" id="virtual-time-text">00:00</div>
                      <p class="video-sample-tip">${v.isSample ? 'Video này dùng đồng hồ giả lập để thử nghiệm toàn bộ hệ thống phụ đề, tra từ, luyện nói và kiểm tra.' : 'Video chưa có link YouTube nhúng hoặc đang chạy ngoại tuyến.'}</p>
                    </div>
                  `}
                </div>

                <!-- Khung Phụ Đề Lớn -->
                <div class="video-sub-box">
                  <div class="video-sub-mode-bar">
                    <span><strong>Phụ đề tương tác</strong> (Bấm vào chữ/từ để tra nghĩa)</span>
                    <div style="display:flex;align-items:center;gap:0.4rem;">
                      <label for="video-sub-mode-select">Chế độ hiển thị:</label>
                      <select id="video-sub-mode-select" class="video-sub-mode-select">
                        ${this.lang === 'en' ? `
                          <option value="en" ${this.subMode === 'en' ? 'selected' : ''}>English</option>
                          <option value="en_ipa" ${this.subMode === 'en_ipa' ? 'selected' : ''}>English + IPA</option>
                          <option value="en_vi" ${this.subMode === 'en_vi' ? 'selected' : ''}>English + Việt</option>
                          <option value="vi" ${this.subMode === 'vi' ? 'selected' : ''}>Chỉ Việt</option>
                          <option value="hidden" ${this.subMode === 'hidden' ? 'selected' : ''}>Ẩn (Luyện nghe)</option>
                        ` : `
                          <option value="all" ${this.subMode === 'all' ? 'selected' : ''}>Hán + Pinyin + Việt</option>
                          <option value="zh_py" ${this.subMode === 'zh_py' ? 'selected' : ''}>Hán + Pinyin</option>
                          <option value="zh" ${this.subMode === 'zh' ? 'selected' : ''}>Chữ Hán</option>
                          <option value="vi" ${this.subMode === 'vi' ? 'selected' : ''}>Chỉ Việt</option>
                          <option value="hidden" ${this.subMode === 'hidden' ? 'selected' : ''}>Ẩn (Luyện nghe)</option>
                        `}
                      </select>
                    </div>
                  </div>

                  <div class="video-sub-content" id="video-sub-content-area">
                    <div class="video-sub-zh">Sẵn sàng phát video...</div>
                  </div>
                </div>

                <!-- Thanh Điều Khiển Học Tập -->
                <div class="video-controls-bar">
                  <div class="video-ctrl-group">
                    <button class="video-ctrl-btn video-ctrl-play-btn" id="btn-ctrl-play">
                      ▶ Phát
                    </button>
                    <span class="video-time-indicator" id="ctrl-time-text">00:00 / 00:00</span>
                  </div>

                  <div class="video-ctrl-group">
                    <button class="video-ctrl-btn" id="btn-ctrl-prev" title="Câu trước (Phím ←)">
                      ⏮ Câu trước
                    </button>
                    <button class="video-ctrl-btn" id="btn-ctrl-loop" title="Lặp câu này (Phím R)">
                      ${ic('repeat', { size: 16 })} Lặp câu
                    </button>
                    <button class="video-ctrl-btn" id="btn-ctrl-next" title="Câu sau (Phím →)">
                      Câu sau ⏭
                    </button>
                  </div>

                  <div class="video-ctrl-group">
                    <span style="font-size:0.8rem;color:var(--video-text-sub)">Tốc độ:</span>
                    <div class="video-speed-selector">
                      <button class="video-speed-btn ${this.playbackRate === 0.5 ? 'active' : ''}" data-rate="0.5">0.5x</button>
                      <button class="video-speed-btn ${this.playbackRate === 0.75 ? 'active' : ''}" data-rate="0.75">0.75x</button>
                      <button class="video-speed-btn ${this.playbackRate === 1.0 ? 'active' : ''}" data-rate="1">1.0x</button>
                    </div>

                    ${this.checkMicSupported() ? `
                      <button class="video-ctrl-btn ${this.isShadowingMode ? 'active' : ''}" id="btn-ctrl-shadow" style="border-color:var(--video-gold)">
                        ${ic('mic', { size: 16 })} Nói theo
                      </button>
                    ` : ''}
                  </div>
                </div>

                <!-- Panel Nói theo (Shadowing Mode) -->
                <div id="video-shadowing-wrapper" style="display: ${this.isShadowingMode ? 'block' : 'none'};"></div>

                <!-- Khung Trắc Nghiệm Cuối Video -->
                <div id="video-quiz-wrapper"></div>
              </div>

              <!-- Cột phải: Bảng lời thoại (Transcript) -->
              <div class="video-transcript-column">
                <div class="video-transcript-header">
                  <h3 class="video-transcript-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Lời thoại (Transcript)
                  </h3>
                  <span style="font-size:0.8rem;color:var(--video-text-muted)">${v.subs ? v.subs.length : 0} câu</span>
                </div>

                <div class="video-transcript-list" id="video-transcript-container">
                  ${hasSubs ? v.subs.map((cue, idx) => `
                    <div class="video-transcript-item" data-index="${idx}" data-start="${cue.start}">
                      <div class="video-transcript-item-meta">
                        <span class="video-transcript-time">${this.formatDuration(cue.start)}</span>
                        <span style="font-size:0.75rem">Câu ${idx + 1}</span>
                      </div>
                      <div class="video-transcript-zh">${this.lang === 'en' ? (cue.en || cue.zh) : cue.zh}</div>
                      ${(cue.ipa || cue.py) ? `<div class="video-transcript-py">${this.lang === 'en' ? (cue.ipa || cue.py) : cue.py}</div>` : ''}
                      ${cue.vi ? `<div class="video-transcript-vi">${cue.vi}</div>` : ''}
                    </div>
                  `).join('') : `
                    <div style="padding:2rem;text-align:center;color:var(--video-text-muted)">Chưa có dữ liệu lời thoại cho video này.</div>
                  `}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      this.bindWatchEvents();
      this.initPlayer();
      this.updateSubtitleDisplay();
    },

    bindWatchEvents() {
      const backBtn = this.containerEl.querySelector('#btn-video-back');
      if (backBtn) backBtn.addEventListener('click', () => this.backToList());

      const modeSelect = this.containerEl.querySelector('#video-sub-mode-select');
      if (modeSelect) {
        modeSelect.addEventListener('change', (e) => this.setSubMode(e.target.value));
      }

      const playBtn = this.containerEl.querySelector('#btn-ctrl-play');
      if (playBtn) playBtn.addEventListener('click', () => this.togglePlay());

      const prevBtn = this.containerEl.querySelector('#btn-ctrl-prev');
      if (prevBtn) prevBtn.addEventListener('click', () => this.seekPrevCue());

      const nextBtn = this.containerEl.querySelector('#btn-ctrl-next');
      if (nextBtn) nextBtn.addEventListener('click', () => this.seekNextCue());

      const loopBtn = this.containerEl.querySelector('#btn-ctrl-loop');
      if (loopBtn) {
        loopBtn.addEventListener('click', () => {
          this.isLoopingCue = !this.isLoopingCue;
          loopBtn.classList.toggle('active', this.isLoopingCue);
        });
      }

      const shadowBtn = this.containerEl.querySelector('#btn-ctrl-shadow');
      if (shadowBtn) {
        shadowBtn.addEventListener('click', () => {
          this.isShadowingMode = !this.isShadowingMode;
          shadowBtn.classList.toggle('active', this.isShadowingMode);
          const wrap = this.containerEl.querySelector('#video-shadowing-wrapper');
          if (wrap) wrap.style.display = this.isShadowingMode ? 'block' : 'none';
          if (this.isShadowingMode) {
            this.renderShadowingPanel();
          }
        });
      }

      this.containerEl.querySelectorAll('.video-speed-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const rate = parseFloat(btn.getAttribute('data-rate')) || 1.0;
          this.setPlaybackRate(rate);
          this.containerEl.querySelectorAll('.video-speed-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });

      // Bấm vào câu trong Transcript để tua
      const transcriptList = this.containerEl.querySelector('#video-transcript-container');
      if (transcriptList) {
        transcriptList.querySelectorAll('.video-transcript-item').forEach(item => {
          item.addEventListener('click', () => {
            const start = parseFloat(item.getAttribute('data-start')) || 0;
            this.seekTo(start);
          });
        });
      }
    },

    bindGlobalKeyboard() {
      if (this.keyHandlerBound) return;
      this.keyHandlerBound = true;

      window.addEventListener('keydown', (e) => {
        // Tránh bắt phím khi đang nhập form hoặc modal mở
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
        if (!this.currentVideo) return;

        if (e.code === 'Space') {
          e.preventDefault();
          this.togglePlay();
        } else if (e.code === 'ArrowLeft') {
          e.preventDefault();
          this.seekPrevCue();
        } else if (e.code === 'ArrowRight') {
          e.preventDefault();
          this.seekNextCue();
        } else if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          this.isLoopingCue = !this.isLoopingCue;
          const loopBtn = this.containerEl ? this.containerEl.querySelector('#btn-ctrl-loop') : null;
          if (loopBtn) loopBtn.classList.toggle('active', this.isLoopingCue);
        }
      });
    },

    /* --- KHỞI TẠO TRÌNH PHÁT (YOUTUBE API HOẶC ĐỒNG HỒ ẢO) --- */
    initPlayer() {
      const v = this.currentVideo;
      if (!v) return;

      const ytid = parseYouTubeId(v.youtube);
      const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:';

      if (ytid && !isFileProtocol) {
        this.loadYouTubeIframeAPI(ytid);
      } else {
        // Chế độ đồng hồ giả lập
        this.player = null;
        this.playerReady = true;
        this.startTickLoop();
      }
    },

    loadYouTubeIframeAPI(ytid) {
      if (typeof window === 'undefined') return;

      const onApiReady = () => {
        try {
          this.player = new window.YT.Player('yt-player-target', {
            videoId: ytid,
            playerVars: {
              playsinline: 1,
              modestbranding: 1,
              rel: 0,
              enablejsapi: 1
            },
            events: {
              onReady: (event) => {
                this.playerReady = true;
                this.setPlaybackRate(this.playbackRate);
                this.startTickLoop();
              },
              onStateChange: (event) => {
                // YT.PlayerState.PLAYING === 1, PAUSED === 2, ENDED === 0
                if (event.data === 1) {
                  this.isPlaying = true;
                  this.updatePlayBtnUi(true);
                } else if (event.data === 2 || event.data === 0) {
                  this.isPlaying = false;
                  this.updatePlayBtnUi(false);
                  if (event.data === 0) {
                    this.onVideoEnded();
                  }
                }
              }
            }
          });
        } catch (e) {
          console.warn('[VideoLearn] Lỗi khởi tạo YouTube player, chuyển sang giả lập:', e);
          this.player = null;
          this.playerReady = true;
          this.startTickLoop();
        }
      };

      if (window.YT && window.YT.Player) {
        onApiReady();
      } else {
        const prevOnReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (typeof prevOnReady === 'function') prevOnReady();
          onApiReady();
        };

        if (!document.getElementById('yt-iframe-script')) {
          const tag = document.createElement('script');
          tag.id = 'yt-iframe-script';
          tag.src = 'https://www.youtube.com/iframe_api';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
      }
    },

    startTickLoop() {
      if (this.virtualTimer) clearInterval(this.virtualTimer);

      this.virtualTimer = setInterval(() => {
        if (!this.currentVideo) return;

        let currentTime = 0;
        let duration = this.currentVideo.duration || 35;

        if (this.player && this.playerReady && typeof this.player.getCurrentTime === 'function') {
          try {
            currentTime = this.player.getCurrentTime() || 0;
            duration = this.player.getDuration() || duration;
          } catch (_) {
            currentTime = this.virtualCurrentTime;
          }
        } else {
          // Trình phát ảo
          if (this.isPlaying) {
            this.virtualCurrentTime += 0.25 * this.playbackRate;
            if (this.virtualCurrentTime >= duration) {
              this.virtualCurrentTime = duration;
              this.pause();
              this.onVideoEnded();
            }
          }
          currentTime = this.virtualCurrentTime;
          const vTimeEl = this.containerEl ? this.containerEl.querySelector('#virtual-time-text') : null;
          if (vTimeEl) vTimeEl.textContent = this.formatDuration(currentTime);
        }

        this.onTimeUpdate(currentTime, duration);
      }, 250);
    },

    onTimeUpdate(currentTime, duration) {
      // 1. Cập nhật nhãn thời gian
      const timeText = this.containerEl ? this.containerEl.querySelector('#ctrl-time-text') : null;
      if (timeText) {
        timeText.textContent = `${this.formatDuration(currentTime)} / ${this.formatDuration(duration)}`;
      }

      // 2. Tìm câu phụ đề đang phát
      const subs = this.currentVideo ? this.currentVideo.subs : [];
      const currentCue = findCueByTime(subs, currentTime);

      // Xử lý chế độ Lặp câu (A-B Loop)
      if (this.isLoopingCue && this.activeCue) {
        if (currentTime >= this.activeCue.end) {
          this.seekTo(this.activeCue.start);
          return;
        }
      }

      // Xử lý chế độ Nói theo (Shadowing Mode): tự dừng ở cuối mỗi câu
      if (this.isShadowingMode && this.activeCue && this.isPlaying) {
        if (currentTime >= this.activeCue.end && this.lastShadowAwardedCue !== this.activeCue) {
          this.pause();
          this.renderShadowingPanel();
          this.startListening();
          return;
        }
      }

      if (currentCue !== this.activeCue) {
        this.activeCue = currentCue;
        this.updateSubtitleDisplay();
        this.highlightTranscriptItem(currentCue);
      }

      // 3. Lưu tiến độ xem
      const pct = duration > 0 ? (currentTime / duration) * 100 : 0;
      if (pct > 5) {
        saveVideoProgress(this.currentVideo.id, {
          seconds: currentTime,
          percent: pct
        });
      }
    },

    onVideoEnded() {
      if (!this.currentVideo) return;
      saveVideoProgress(this.currentVideo.id, {
        seconds: this.currentVideo.duration || 35,
        percent: 100
      });
      // Tự động mở bài quiz nếu chưa hoàn thành
      this.showEndQuiz();
    },

    /* --- ĐIỀU KHIỂN PHÁT / TẠM DỪNG / TUA --- */
    togglePlay() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },

    play() {
      this.isPlaying = true;
      this.updatePlayBtnUi(true);

      if (this.player && this.playerReady && typeof this.player.playVideo === 'function') {
        try {
          this.player.playVideo();
        } catch (_) {}
      }
    },

    pause() {
      this.isPlaying = false;
      this.updatePlayBtnUi(false);

      if (this.player && this.playerReady && typeof this.player.pauseVideo === 'function') {
        try {
          this.player.pauseVideo();
        } catch (_) {}
      }
    },

    updatePlayBtnUi(playing) {
      const btn = this.containerEl ? this.containerEl.querySelector('#btn-ctrl-play') : null;
      if (btn) {
        btn.innerHTML = playing ? '⏸ Tạm dừng' : '▶ Phát';
      }
    },

    seekTo(seconds) {
      const s = Math.max(0, seconds);
      this.virtualCurrentTime = s;
      if (this.player && this.playerReady && typeof this.player.seekTo === 'function') {
        try {
          this.player.seekTo(s, true);
        } catch (_) {}
      }
      this.onTimeUpdate(s, (this.currentVideo ? this.currentVideo.duration : 35));
    },

    seekPrevCue() {
      if (!this.currentVideo || !Array.isArray(this.currentVideo.subs)) return;
      const subs = this.currentVideo.subs;
      let curTime = this.virtualCurrentTime;
      if (this.player && this.playerReady && typeof this.player.getCurrentTime === 'function') {
        try { curTime = this.player.getCurrentTime(); } catch (_) {}
      }

      for (let i = subs.length - 1; i >= 0; i--) {
        if (subs[i].start < curTime - 0.5) {
          this.seekTo(subs[i].start);
          return;
        }
      }
      this.seekTo(0);
    },

    seekNextCue() {
      if (!this.currentVideo || !Array.isArray(this.currentVideo.subs)) return;
      const subs = this.currentVideo.subs;
      let curTime = this.virtualCurrentTime;
      if (this.player && this.playerReady && typeof this.player.getCurrentTime === 'function') {
        try { curTime = this.player.getCurrentTime(); } catch (_) {}
      }

      for (let i = 0; i < subs.length; i++) {
        if (subs[i].start > curTime + 0.3) {
          this.seekTo(subs[i].start);
          return;
        }
      }
    },

    setPlaybackRate(rate) {
      this.playbackRate = rate;
      if (this.player && this.playerReady && typeof this.player.setPlaybackRate === 'function') {
        try {
          this.player.setPlaybackRate(rate);
        } catch (_) {}
      }
    },

    /* --- CẬP NHẬT PHỤ ĐỀ TRÊN GIAO DIỆN --- */
    updateSubtitleDisplay() {
      const area = this.containerEl ? this.containerEl.querySelector('#video-sub-content-area') : null;
      if (!area) return;

      const cue = this.activeCue;
      if (!cue) {
        area.innerHTML = `<div class="video-sub-zh" style="color:var(--video-text-muted)">...</div>`;
        return;
      }

      if (this.subMode === 'hidden') {
        area.innerHTML = `
          <div class="video-sub-hidden-notice">
            ${ic('headphones', { size: 16 })} Đang ẩn phụ đề để luyện nghe phản xạ. (Nhấn vào chế độ hiển thị bên trên để bật lại)
          </div>
        `;
        return;
      }

      if (this.subMode === 'vi') {
        area.innerHTML = `
          <div class="video-sub-vi" style="font-size:1.25rem;font-weight:700">${cue.vi || ''}</div>
        `;
        return;
      }

      if (this.lang === 'en') {
        const enText = cue.en || cue.zh || '';
        const ipaText = cue.ipa || cue.py || '';
        const viText = cue.vi || '';

        // Tách từ tiếng Anh giữ nguyên dấu cách & ký tự phân cách
        const tokens = enText.split(/([a-zA-Z0-9'’-]+)/g).filter(Boolean);
        const interactiveEn = tokens.map(tok => {
          if (/^[a-zA-Z0-9'’-]+$/.test(tok)) {
            return `<span class="video-sub-word" data-word="${tok}">${tok}</span>`;
          }
          return `<span>${tok}</span>`;
        }).join('');

        let html = '';
        if (this.subMode === 'en') {
          html = `<div class="video-sub-zh" style="font-family:inherit;">${interactiveEn}</div>`;
        } else if (this.subMode === 'en_ipa') {
          html = `
            <div class="video-sub-zh" style="font-family:inherit;">${interactiveEn}</div>
            ${ipaText ? `<div class="video-sub-py">${ipaText}</div>` : ''}
          `;
        } else {
          // 'en_vi' hoặc 'all' mặc định
          html = `
            <div class="video-sub-zh" style="font-family:inherit;">${interactiveEn}</div>
            ${(this.subMode === 'all' && ipaText) ? `<div class="video-sub-py">${ipaText}</div>` : ''}
            ${viText ? `<div class="video-sub-vi">${viText}</div>` : ''}
          `;
        }

        area.innerHTML = html;

        area.querySelectorAll('.video-sub-word').forEach(el => {
          el.addEventListener('click', (e) => {
            e.stopPropagation();
            const word = el.getAttribute('data-word');
            this.showWordLookup(word);
          });
        });
        return;
      }

      // Tách từ dài nhất cho chữ Hán
      const tokens = tokenizeLongestWords(cue.zh);
      const interactiveZh = tokens.map(t => {
        if (t.isPunct || t.text.trim() === '') {
          return `<span>${t.text}</span>`;
        }
        return `<span class="video-sub-word" data-word="${t.word}">${t.text}</span>`;
      }).join('');

      let html = '';
      if (this.subMode === 'zh') {
        html = `<div class="video-sub-zh">${interactiveZh}</div>`;
      } else if (this.subMode === 'zh_py') {
        html = `
          <div class="video-sub-zh">${interactiveZh}</div>
          ${cue.py ? `<div class="video-sub-py">${cue.py}</div>` : ''}
        `;
      } else {
        // Chế độ 'all' mặc định
        html = `
          <div class="video-sub-zh">${interactiveZh}</div>
          ${cue.py ? `<div class="video-sub-py">${cue.py}</div>` : ''}
          ${cue.vi ? `<div class="video-sub-vi">${cue.vi}</div>` : ''}
        `;
      }

      area.innerHTML = html;

      // Bắt sự kiện click vào từ để mở Popup Tra Từ
      area.querySelectorAll('.video-sub-word').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const word = el.getAttribute('data-word');
          this.showWordLookup(word);
        });
      });
    },

    highlightTranscriptItem(currentCue) {
      const container = this.containerEl ? this.containerEl.querySelector('#video-transcript-container') : null;
      if (!container) return;

      const items = container.querySelectorAll('.video-transcript-item');
      items.forEach(item => item.classList.remove('active'));

      if (!currentCue) return;

      const subs = this.currentVideo ? this.currentVideo.subs : [];
      const idx = subs.indexOf(currentCue);
      if (idx !== -1 && items[idx]) {
        items[idx].classList.add('active');
        items[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    },

    /* --- POPUP TRA TỪ TỨC THÌ --- */
    showWordLookup(word) {
      if (!word) return;
      const info = lookupWord(word);
      if (!info) return;

      // Xóa popup cũ nếu đang có
      const old = document.getElementById('video-word-lookup-modal');
      if (old) old.remove();

      const modal = document.createElement('div');
      modal.id = 'video-word-lookup-modal';
      modal.className = 'video-lookup-overlay';
      modal.innerHTML = `
        <div class="video-lookup-card">
          <button class="video-lookup-close" id="btn-close-word-lookup">${ic('x', { size: 18 })}</button>
          <div class="video-lookup-head">
            <span class="video-lookup-hanzi">${info.word}</span>
            <span class="video-lookup-py">${info.py || ''}</span>
            <button class="video-lookup-audio-btn" id="btn-lookup-audio" title="Nghe phát âm">
              ${ic('volume', { size: 18 })}
            </button>
          </div>

          <div class="video-lookup-mean-box">
            <div class="video-lookup-mean-label">Nghĩa tiếng Việt</div>
            <div>${info.vi || 'Từ vựng tiếng Trung'}</div>
            ${info.hv ? `<div style="font-size:0.8rem;color:var(--video-text-muted);margin-top:0.3rem">Hán-Việt: <em>${info.hv}</em></div>` : ''}
            ${info.pos ? `<div style="font-size:0.8rem;color:var(--video-accent)">Từ loại: ${info.pos}</div>` : ''}
          </div>

          ${info.ex ? `
            <div style="background:#FFF9E6;border-radius:8px;padding:0.75rem;margin-bottom:1rem;font-size:0.85rem">
              <strong>Ví dụ:</strong> ${info.ex.zh} (${info.ex.py})<br>
              <em>${info.ex.vi}</em>
            </div>
          ` : ''}

          <div class="video-lookup-actions">
            <button class="video-btn video-btn-primary" style="flex:1" id="btn-add-hardword">
              ${ic('plus', { size: 16 })} Thêm vào thẻ ôn
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      modal.querySelector('#btn-close-word-lookup').addEventListener('click', () => modal.remove());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });

      const audioBtn = modal.querySelector('#btn-lookup-audio');
      if (audioBtn) {
        audioBtn.addEventListener('click', () => this.speakText(info.word));
      }

      const addBtn = modal.querySelector('#btn-add-hardword');
      if (addBtn) {
        addBtn.addEventListener('click', () => {
          this.addToHardWords(info.word);
          addBtn.innerHTML = `${ic('check', { size: 16 })} Đã thêm vào sổ từ ôn tập`;
          addBtn.disabled = true;
          addBtn.style.background = '#10B981';
        });
      }

      // Tự phát âm ngay khi mở popup tra từ
      this.speakText(info.word);
    },

    addToHardWords(word) {
      if (!word) return;
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const lang = this.lang || 'zh';
          const progKey = `${lang}_learn_progress_v1`;
          const raw = window.localStorage.getItem(progKey);
          const prog = raw ? JSON.parse(raw) : { lessons: {}, checkpoints: {}, hardWords: {} };
          prog.hardWords = prog.hardWords || {};
          const cur = typeof prog.hardWords[word] === 'number' ? prog.hardWords[word] : (prog.hardWords[word]?.reviewsCount || 0);
          prog.hardWords[word] = cur + 1;
          window.localStorage.setItem(progKey, JSON.stringify(prog));

          const videoWordsKey = `${lang}_video_words`;
          const videoWordsRaw = window.localStorage.getItem(videoWordsKey);
          const wordsList = videoWordsRaw ? JSON.parse(videoWordsRaw) : [];
          if (!wordsList.includes(word)) {
            wordsList.push(word);
            window.localStorage.setItem(videoWordsKey, JSON.stringify(wordsList));
          }
        }
      } catch (_) {}
    },

    speakText(text) {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = this.lang === 'en' ? 'en-US' : 'zh-CN';
        utter.rate = 0.9;
        window.speechSynthesis.speak(utter);
      } catch (_) {}
    },

    /* --- CHẾ ĐỘ NÓI THEO (SHADOWING) & SPEECH RECOGNITION --- */
    checkMicSupported() {
      if (typeof window === 'undefined') return false;
      return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    },

    renderShadowingPanel() {
      const wrap = this.containerEl ? this.containerEl.querySelector('#video-shadowing-wrapper') : null;
      if (!wrap) return;

      const cue = this.activeCue || (this.currentVideo && this.currentVideo.subs ? this.currentVideo.subs[0] : null);
      if (!cue) {
        wrap.innerHTML = `<div class="video-shadow-panel">Đang chờ câu nói...</div>`;
        return;
      }

      const isEn = this.lang === 'en';
      const targetText = isEn ? (cue.en || cue.zh) : cue.zh;
      const phoneticText = isEn ? (cue.ipa || cue.py || '') : (cue.py || '');

      wrap.innerHTML = `
        <div class="video-shadow-panel">
          <div class="video-shadow-header">
            <h4 class="video-shadow-title">
              <span>${ic('mic', { size: 18 })} Chế độ Nói theo (Shadowing)</span>
            </h4>
            <span style="font-size:0.8rem;color:var(--video-text-sub)">Tự dừng sau câu để bạn đọc lại</span>
          </div>

          <div class="video-shadow-body">
            <div class="video-shadow-target-zh">${targetText}</div>
            <div style="font-size:0.9rem;color:var(--video-accent);font-weight:600">${phoneticText}</div>

            <button class="video-shadow-mic-btn ${this.isListening ? 'listening' : ''}" id="btn-shadow-mic" title="Bấm để đọc lại">
              ${ic('mic', { size: 28 })}
            </button>
            <div style="font-size:0.825rem;color:var(--video-text-sub)" id="shadow-mic-status">
              ${this.isListening ? 'Đang lắng nghe bạn đọc...' : `Bấm mic và đọc câu ${isEn ? 'tiếng Anh' : 'tiếng Trung'} ở trên`}
            </div>

            <div id="shadow-result-box" style="display:none;width:100%"></div>

            <div style="display:flex;gap:0.6rem;margin-top:0.4rem;">
              <button class="video-btn video-btn-outline" id="btn-shadow-listen-model">
                ${ic('volume', { size: 16 })} Nghe lại mẫu
              </button>
              <button class="video-btn video-btn-primary" id="btn-shadow-continue">
                Tiếp tục phát ▶
              </button>
            </div>
          </div>
        </div>
      `;

      const micBtn = wrap.querySelector('#btn-shadow-mic');
      if (micBtn) {
        micBtn.addEventListener('click', () => {
          if (this.isListening) {
            this.stopListening();
          } else {
            this.startListening();
          }
        });
      }

      const listenModelBtn = wrap.querySelector('#btn-shadow-listen-model');
      if (listenModelBtn) {
        listenModelBtn.addEventListener('click', () => this.speakText(targetText));
      }

      const contBtn = wrap.querySelector('#btn-shadow-continue');
      if (contBtn) {
        contBtn.addEventListener('click', () => {
          this.stopListening();
          this.lastShadowAwardedCue = cue;
          this.play();
        });
      }
    },

    startListening() {
      if (!this.checkMicSupported()) return;
      this.stopListening();

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = this.lang === 'en' ? 'en-US' : 'zh-CN';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      this.speechRecognition = recognition;
      this.isListening = true;

      const micBtn = this.containerEl ? this.containerEl.querySelector('#btn-shadow-mic') : null;
      if (micBtn) micBtn.classList.add('listening');
      const st = this.containerEl ? this.containerEl.querySelector('#shadow-mic-status') : null;
      if (st) st.textContent = 'Đang lắng nghe... Hãy nói to và rõ ràng';

      recognition.onresult = (event) => {
        const transcripts = [];
        for (let i = 0; i < event.results[0].length; i++) {
          transcripts.push(event.results[0][i].transcript);
        }
        this.evaluateShadowing(transcripts);
      };

      recognition.onerror = () => {
        this.stopListening();
        const statusEl = this.containerEl ? this.containerEl.querySelector('#shadow-mic-status') : null;
        if (statusEl) statusEl.textContent = 'Chưa nghe rõ, vui lòng bấm mic thử lại!';
      };

      recognition.onend = () => {
        this.stopListening();
      };

      try {
        recognition.start();
      } catch (_) {}
    },

    stopListening() {
      this.isListening = false;
      if (this.speechRecognition) {
        try { this.speechRecognition.stop(); } catch (_) {}
        this.speechRecognition = null;
      }
      const micBtn = this.containerEl ? this.containerEl.querySelector('#btn-shadow-mic') : null;
      if (micBtn) micBtn.classList.remove('listening');
    },

    evaluateShadowing(transcripts) {
      const cue = this.activeCue;
      if (!cue) return;
      const isEn = this.lang === 'en';
      const targetText = isEn ? (cue.en || cue.zh) : cue.zh;

      let scoreResult = null;
      if (isEn) {
        if (typeof window !== 'undefined' && typeof window.scoreEnglishRecognition === 'function') {
          scoreResult = window.scoreEnglishRecognition(targetText, transcripts);
        } else {
          const heard = transcripts[0] || '';
          const cleanTarget = targetText.toLowerCase().replace(/[^\w\s]/g, '').trim();
          const cleanHeard = heard.toLowerCase().replace(/[^\w\s]/g, '').trim();
          const words = cleanTarget.split(/\s+/).filter(Boolean);
          const perChar = words.map(w => ({ ch: w, ok: cleanHeard.includes(w) }));
          const matchCount = perChar.filter(p => p.ok).length;
          const score = words.length > 0 ? Math.round((matchCount / words.length) * 100) : 0;
          scoreResult = { score, perChar, best: heard };
        }
      } else {
        if (typeof window !== 'undefined' && typeof window.scoreRecognition === 'function') {
          scoreResult = window.scoreRecognition(cue.zh, transcripts);
        } else {
          const heard = transcripts[0] || '';
          const targetClean = cue.zh.replace(/[\s\p{P}\p{S}]/gu, '');
          const heardClean = heard.replace(/[\s\p{P}\p{S}]/gu, '');
          const targetChars = Array.from(targetClean);
          const perChar = targetChars.map(ch => ({ ch, ok: heardClean.includes(ch) }));
          const matchCount = perChar.filter(p => p.ok).length;
          const score = targetChars.length > 0 ? Math.round((matchCount / targetChars.length) * 100) : 0;
          scoreResult = { score, perChar, best: heard };
        }
      }

      this.renderShadowResult(scoreResult, cue);
    },

    renderShadowResult(res, cue) {
      const box = this.containerEl ? this.containerEl.querySelector('#shadow-result-box') : null;
      if (!box) return;
      box.style.display = 'block';

      const isPass = res.score >= 60;
      const items = res.perWord || res.perChar || [];
      const charsHtml = items.map(p => `
        <span class="${p.ok ? 'video-char-ok' : 'video-char-bad'}">${p.word || p.ch}</span>
      `).join(' ');

      box.innerHTML = `
        <div class="video-shadow-result-wrap">
          <div style="font-size:0.85rem;color:var(--video-text-sub)">Kết quả nhận diện: <em>"${res.best || ''}"</em></div>
          <div class="video-shadow-chars-row">${charsHtml}</div>
          ${res.advice ? `<div style="font-size:0.825rem;color:var(--video-accent);margin:0.35rem 0;">${ic('lightbulb', { size: 14 })} ${res.advice}</div>` : ''}
          <div class="video-shadow-score-badge ${isPass ? 'video-shadow-pass' : 'video-shadow-fail'}">
            ${isPass ? `${ic('check', { size: 14 })} Đạt chuẩn ${res.score}%` : `Cần cố gắng: ${res.score}%`}
          </div>
        </div>
      `;

      if (isPass && this.lastShadowAwardedCue !== cue) {
        this.lastShadowAwardedCue = cue;
        if (typeof window !== 'undefined' && window.Economy && typeof window.Economy.reward === 'function') {
          window.Economy.reward('videoShadow');
        }
      }
    },

    /* --- BÀI KIỂM TRA CUỐI VIDEO --- */
    showEndQuiz() {
      const wrap = this.containerEl ? this.containerEl.querySelector('#video-quiz-wrapper') : null;
      if (!wrap || !this.currentVideo) return;

      if (!this.activeQuiz) {
        this.activeQuiz = generateQuizFromSubs(this.currentVideo.subs);
        this.quizAnswers = {};
      }

      const questions = this.activeQuiz;
      if (questions.length === 0) return;

      wrap.innerHTML = `
        <div class="video-quiz-panel">
          <div class="video-quiz-header">
            <h3>${ic('party-popper', { size: 20 })} Ôn tập nhanh cuối video</h3>
            <p style="margin:0;font-size:0.9rem;color:var(--video-text-sub)">Trả lời đúng để nhận thêm Xu và XP thưởng!</p>
          </div>

          <div id="video-quiz-questions-list">
            ${questions.map((q, idx) => `
              <div class="video-quiz-card" id="quiz-card-${idx}">
                <div class="video-quiz-q-num">Câu hỏi ${idx + 1} / ${questions.length}</div>
                <div class="video-quiz-question">
                  ${q.question}<br>
                  <strong style="color:var(--video-accent);font-size:1.15rem">${q.sentence}</strong>
                  ${q.translation ? `<div style="font-size:0.85rem;color:var(--video-text-sub)">(${q.translation})</div>` : ''}
                </div>
                <div class="video-quiz-options">
                  ${q.options.map((opt, optIdx) => `
                    <button class="video-quiz-opt-btn" data-q="${idx}" data-opt="${optIdx}">
                      ${opt}
                    </button>
                  `).join('')}
                </div>
                <div class="video-quiz-feedback" id="quiz-fb-${idx}" style="display:none;margin-top:0.6rem;font-size:0.85rem"></div>
              </div>
            `).join('')}
          </div>

          <div class="video-quiz-summary" id="video-quiz-summary-box" style="display:none;"></div>
        </div>
      `;

      wrap.querySelectorAll('.video-quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const qIdx = parseInt(btn.getAttribute('data-q'), 10);
          const optIdx = parseInt(btn.getAttribute('data-opt'), 10);
          this.handleQuizAnswer(qIdx, optIdx);
        });
      });
    },

    handleQuizAnswer(qIdx, selectedOptIdx) {
      if (this.quizAnswers[qIdx] !== undefined) return;
      this.quizAnswers[qIdx] = selectedOptIdx;

      const q = this.activeQuiz[qIdx];
      const card = this.containerEl.querySelector(`#quiz-card-${qIdx}`);
      const fb = this.containerEl.querySelector(`#quiz-fb-${qIdx}`);
      if (!card || !q) return;

      const isCorrect = selectedOptIdx === q.answerIndex;
      const btns = card.querySelectorAll('.video-quiz-opt-btn');

      btns.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.answerIndex) {
          btn.classList.add('correct');
        } else if (idx === selectedOptIdx && !isCorrect) {
          btn.classList.add('wrong');
        }
      });

      if (fb) {
        fb.style.display = 'block';
        fb.innerHTML = isCorrect ? `
          <span style="color:#059669;font-weight:700">${ic('check', { size: 16 })} Chính xác!</span> ${q.explanation}
        ` : `
          <span style="color:#DC2626;font-weight:700">${ic('x', { size: 16 })} Chưa đúng!</span> ${q.explanation}
        `;
      }

      if (isCorrect && typeof window !== 'undefined' && window.Economy && typeof window.Economy.reward === 'function') {
        window.Economy.reward('quizCorrect');
      }

      // Kiểm tra xem đã trả lời hết các câu hỏi chưa
      if (Object.keys(this.quizAnswers).length === this.activeQuiz.length) {
        this.finishQuizSummary();
      }
    },

    finishQuizSummary() {
      const summaryBox = this.containerEl.querySelector('#video-quiz-summary-box');
      if (!summaryBox) return;

      const total = this.activeQuiz.length;
      let correct = 0;
      this.activeQuiz.forEach((q, idx) => {
        if (this.quizAnswers[idx] === q.answerIndex) correct++;
      });

      saveVideoProgress(this.currentVideo.id, {
        quizDone: true
      });

      summaryBox.style.display = 'block';
      summaryBox.innerHTML = `
        <h4 style="margin:0 0 0.35rem 0;color:var(--video-accent-dark);font-size:1.15rem">
          ${ic('party-popper', { size: 20 })} Hoàn thành bài ôn tập: Đúng ${correct} / ${total} câu!
        </h4>
        <p style="margin:0;font-size:0.9rem;color:var(--video-text-sub)">
          Bạn đã ôn tập chắc chắn các câu thoại và từ vựng của video này.
        </p>
      `;
    },

    /* --- MODAL 1: THÊM VIDEO MỚI (Requirement 4b) --- */
    showAddVideoModal() {
      const isEn = this.lang === 'en';
      const modal = document.createElement('div');
      modal.id = 'video-add-modal';
      modal.className = 'video-modal-overlay';
      modal.innerHTML = `
        <div class="video-modal-box">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
            <h3 class="video-modal-title" style="margin:0">${ic('plus', { size: 18 })} Thêm video mới ${isEn ? '(Tiếng Anh)' : '(Tiếng Trung)'}</h3>
            <button class="video-lookup-close" id="btn-close-add-modal">${ic('x', { size: 18 })}</button>
          </div>

          <div class="video-form-group">
            <label class="video-form-label">Link YouTube hoặc ID video:</label>
            <input type="text" id="add-video-link" class="video-form-input" placeholder="https://www.youtube.com/watch?v=... hoặc dQw4w9WgXcQ">
          </div>

          <div class="video-form-group">
            <label class="video-form-label">Tiêu đề video:</label>
            <input type="text" id="add-video-title" class="video-form-input" placeholder="${isEn ? 'Ví dụ: Daily English Conversation' : 'Ví dụ: Đàm thoại đặt món ăn nhà hàng'}">
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
            <div class="video-form-group">
              <label class="video-form-label">Cấp độ:</label>
              <select id="add-video-level" class="video-form-select">
                ${isEn ? `
                  <option value="Starter">Starter</option>
                  <option value="A1" selected>A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                ` : `
                  <option value="HSK1">HSK1</option>
                  <option value="HSK2">HSK2</option>
                  <option value="HSK3">HSK3</option>
                  <option value="HSK4">HSK4</option>
                  <option value="HSK5">HSK5</option>
                `}
              </select>
            </div>
            <div class="video-form-group">
              <label class="video-form-label">Chủ đề:</label>
              <input type="text" id="add-video-topic" class="video-form-input" placeholder="Ví dụ: Mua sắm, Du lịch...">
            </div>
          </div>

          <div class="video-form-group">
            <label class="video-form-label">${isEn ? 'File phụ đề tiếng Anh hoặc song ngữ (.srt, .vtt):' : 'File phụ đề tiếng Trung hoặc song ngữ (.srt, .vtt):'}</label>
            <input type="file" id="add-video-sub-file" accept=".srt,.vtt" class="video-form-input">
          </div>

          <div class="video-form-group">
            <label class="video-form-label">File phụ đề tiếng Việt riêng (tuỳ chọn):</label>
            <input type="file" id="add-video-sub-vi-file" accept=".srt,.vtt" class="video-form-input">
          </div>

          <div class="video-form-group">
            <label class="video-form-label">Hoặc dán trực tiếp nội dung SRT/VTT:</label>
            <textarea id="add-video-sub-text" class="video-form-textarea" rows="4" placeholder="${isEn ? '1\\n00:00:01,000 --> 00:00:04,000\\nHello, nice to meet you!\\nXin chào, rất vui được gặp bạn!' : '1\\n00:00:01,000 --> 00:00:04,000\\n你好！\\nXin chào!'}"></textarea>
          </div>

          <div style="display:flex;gap:0.75rem;margin-top:1.25rem;flex-wrap:wrap">
            <button class="video-btn video-btn-primary" style="flex:1" id="btn-save-local-video">
              ${ic('save', { size: 16 })} Lưu & Xem trước ngay
            </button>
            <button class="video-btn video-btn-outline" id="btn-export-code-video">
              ${ic('clipboard', { size: 16 })} Xuất mã JS
            </button>
          </div>

          <div id="video-export-code-area" style="display:none;margin-top:1rem">
            <div style="font-size:0.85rem;font-weight:600;margin-bottom:0.4rem;color:var(--video-text-main)">
              Đoạn mã JS (Dán vào mảng <code>window.${isEn ? 'VIDEOS_EN' : 'VIDEOS_ZH'}</code> trong file <code>data/${isEn ? 'en' : 'zh'}/videos.js</code>):
            </div>
            <div class="video-code-export-box" id="video-code-export-text"></div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      modal.querySelector('#btn-close-add-modal').addEventListener('click', () => modal.remove());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
      });

      const saveBtn = modal.querySelector('#btn-save-local-video');
      const exportBtn = modal.querySelector('#btn-export-code-video');

      const buildVideoObject = async () => {
        const link = modal.querySelector('#add-video-link').value.trim();
        const title = modal.querySelector('#add-video-title').value.trim() || (isEn ? 'Video học tiếng Anh mới' : 'Video học tiếng Trung mới');
        const level = modal.querySelector('#add-video-level').value;
        const topic = modal.querySelector('#add-video-topic').value.trim() || 'Tổng hợp';
        const desc = modal.querySelector('#add-video-desc') ? modal.querySelector('#add-video-desc').value.trim() : '';

        const fileEl = modal.querySelector('#add-video-sub-file');
        const fileViEl = modal.querySelector('#add-video-sub-vi-file');
        const textEl = modal.querySelector('#add-video-sub-text');

        let subContent = textEl.value.trim();
        let subViContent = '';

        if (fileEl && fileEl.files && fileEl.files[0]) {
          subContent = await fileEl.files[0].text();
        }
        if (fileViEl && fileViEl.files && fileViEl.files[0]) {
          subViContent = await fileViEl.files[0].text();
        }

        let parsedSubs = [];
        if (subViContent) {
          parsedSubs = parseBilingualSubs(subContent, subViContent);
        } else {
          parsedSubs = parseSrtOrVtt(subContent);
        }

        if (isEn) {
          parsedSubs.forEach(c => {
            if (!c.en && c.zh) c.en = c.zh;
            if (!c.ipa && c.py) c.ipa = c.py;
          });
        }

        const ytid = parseYouTubeId(link);
        const duration = parsedSubs.length > 0 ? Math.ceil(parsedSubs[parsedSubs.length - 1].end) : 60;
        const vidId = `${isEn ? 'en' : 'zh'}-local-${Date.now()}`;

        return {
          id: vidId,
          isLocal: true,
          youtube: link,
          title,
          desc: desc || `Bài học video cấp độ ${level} chủ đề ${topic}.`,
          level,
          topic,
          thumb: ytid ? `https://i.ytimg.com/vi/${ytid}/hqdefault.jpg` : '',
          duration,
          subs: parsedSubs
        };
      };

      saveBtn.addEventListener('click', async () => {
        const vid = await buildVideoObject();
        const storageKey = isEn ? 'en_videos_local' : 'zh_videos_local';
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            const raw = window.localStorage.getItem(storageKey);
            const list = raw ? JSON.parse(raw) : [];
            list.push(vid);
            window.localStorage.setItem(storageKey, JSON.stringify(list));
          }
        } catch (err) {
          const full = err && (err.name === 'QuotaExceededError' || err.code === 22);
          const msg = full
            ? 'Bộ nhớ trình duyệt đã đầy nên chưa lưu được video. Hãy xóa bớt video tự thêm hoặc dùng phụ đề ngắn hơn.'
            : 'Chưa lưu được video vào trình duyệt.';
          if (window.app && window.app.showToast) window.app.showToast(msg, 'warning');
          return;
        }

        modal.remove();
        this.openVideo(vid.id);
      });

      exportBtn.addEventListener('click', async () => {
        const vid = await buildVideoObject();
        const cleanVid = { ...vid };
        delete cleanVid.isLocal;
        const code = JSON.stringify(cleanVid, null, 2) + ',';

        const area = modal.querySelector('#video-export-code-area');
        const codeText = modal.querySelector('#video-code-export-text');
        if (area && codeText) {
          area.style.display = 'block';
          codeText.textContent = code;
        }
      });
    },

    /* --- MODAL 2: HƯỚNG DẪN THÊM VIDEO --- */
    showGuideModal() {
      const modal = document.createElement('div');
      modal.id = 'video-guide-modal';
      modal.className = 'video-modal-overlay';
      modal.innerHTML = `
        <div class="video-modal-box">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
            <h3 class="video-modal-title" style="margin:0">${ic('book-open', { size: 20 })} Hướng dẫn thêm video vào PolyLingo</h3>
            <button class="video-lookup-close" id="btn-close-guide-modal">${ic('x', { size: 18 })}</button>
          </div>

          <div style="font-size:0.925rem;line-height:1.6;color:var(--video-text-main)">
            <p><strong>Quy trình gồm 3 bước đơn giản:</strong></p>
            <ol style="padding-left:1.25rem;margin-bottom:1rem">
              <li style="margin-bottom:0.5rem">
                <strong>Chuẩn bị video & phụ đề:</strong> Tạo file phụ đề song ngữ <code>.srt</code> hoặc <code>.vtt</code>. Mỗi câu có 2 dòng (dòng 1 chữ Hán, dòng 2 tiếng Việt) hoặc dùng 2 file riêng khớp thời gian.
              </li>
              <li style="margin-bottom:0.5rem">
                <strong>Tải lên YouTube:</strong> Đặt chế độ <em>Công khai (Public)</em> hoặc <em>Không công khai (Unlisted)</em>. <strong>Lưu ý quan trọng:</strong> Phải <u>BẬT cho phép nhúng (Allow embedding)</u> trong cài đặt chi tiết của video trên YouTube Studio.
              </li>
              <li style="margin-bottom:0.5rem">
                <strong>Thêm vào hệ thống:</strong>
                <ul style="padding-left:1rem;margin-top:0.3rem">
                  <li><strong>Cách 1 (Nhanh trên Web):</strong> Bấm nút <code>＋ Thêm video</code> ở trang danh sách, dán link YouTube và nạp file phụ đề để xem thử ngay.</li>
                  <li><strong>Cách 2 (Dòng lệnh CLI):</strong> Chạy lệnh terminal:
                    <pre style="background:#F3F4F6;padding:0.6rem;border-radius:6px;overflow-x:auto;font-size:0.8rem">python tools/them_video.py --link "https://youtu.be/..." --tieu-de "..." --cap HSK1 --chu-de "Chào hỏi" --sub "phu-de.srt"</pre>
                  </li>
                </ul>
              </li>
            </ol>
            <p style="font-size:0.85rem;color:var(--video-text-sub);margin:0">
              Chi tiết các tham số nâng cao xem thêm tại tài liệu <code>HUONG-DAN-THEM-VIDEO.md</code> trong thư mục dự án.
            </p>
          </div>

          <div style="margin-top:1.25rem;text-align:right">
            <button class="video-btn video-btn-primary" id="btn-close-guide-bottom">Đã hiểu</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      const close = () => modal.remove();
      modal.querySelector('#btn-close-guide-modal').addEventListener('click', close);
      modal.querySelector('#btn-close-guide-bottom').addEventListener('click', close);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
      });
    },

    formatDuration(seconds) {
      const s = Math.round(Number(seconds) || 0);
      const m = Math.floor(s / 60);
      const remSec = s % 60;
      return `${m}:${remSec < 10 ? '0' : ''}${remSec}`;
    }
  };

  /* ==========================================================================
     3. GLOBAL REGISTRATION & NODE.JS EXPORTS
     ========================================================================== */

  if (typeof window !== 'undefined') {
    window.VideoLearn = VideoLearn;
    window.parseYouTubeId = parseYouTubeId;
    window.parseTimestampToSeconds = parseTimestampToSeconds;
    window.parseSrtOrVtt = parseSrtOrVtt;
    window.parseBilingualSubs = parseBilingualSubs;
    window.findCueByTime = findCueByTime;
    window.tokenizeLongestWords = tokenizeLongestWords;
    window.lookupWord = lookupWord;
    window.generateQuizFromSubs = generateQuizFromSubs;
    window.saveVideoProgress = saveVideoProgress;
    window.getVideoProgress = getVideoProgress;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      parseYouTubeId,
      parseTimestampToSeconds,
      parseSrtOrVtt,
      parseBilingualSubs,
      findCueByTime,
      tokenizeLongestWords,
      lookupWord,
      generateQuizFromSubs,
      saveVideoProgress,
      getVideoProgress,
      VideoLearn
    };
  }
})();
