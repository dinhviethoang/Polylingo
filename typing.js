/**
 * typing.js - Luyện gõ Pinyin tiếng Trung
 * Cung cấp đầy đủ logic luyện gõ theo chế độ, kiểm tra âm tiết, thống kê, lưu trữ và export cho test.
 */

const typingIc = (n, opts) => (typeof window !== 'undefined' && window.PolyIcons ? window.PolyIcons.svg(n, opts) : (typeof PolyIcons !== 'undefined' ? PolyIcons.svg(n, opts) : ''));

/* ==========================================================================
   1. Pinyin Tone Constants & Conversion Utilities
   ========================================================================== */

const TONE_MAP = {
  'a': ['a', 'ā', 'á', 'ǎ', 'à', 'a'],
  'e': ['e', 'ē', 'é', 'ě', 'è', 'e'],
  'o': ['o', 'ō', 'ó', 'ǒ', 'ò', 'o'],
  'i': ['i', 'ī', 'í', 'ǐ', 'ì', 'i'],
  'u': ['u', 'ū', 'ú', 'ǔ', 'ù', 'u'],
  'ü': ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü'],
  'A': ['A', 'Ā', 'Á', 'Ǎ', 'À', 'A'],
  'E': ['E', 'Ē', 'É', 'Ě', 'È', 'E'],
  'O': ['O', 'Ō', 'Ó', 'Ǒ', 'Ò', 'O'],
  'I': ['I', 'Ī', 'Í', 'Ǐ', 'Ì', 'I'],
  'U': ['U', 'Ū', 'Ú', 'Ǔ', 'Ù', 'U'],
  'Ü': ['Ü', 'Ǖ', 'Ǘ', 'Ǚ', 'Ǜ', 'Ü'],
};

const CHAR_TO_TONE = {
  'ā': ['a', 1], 'á': ['a', 2], 'ǎ': ['a', 3], 'à': ['a', 4],
  'ē': ['e', 1], 'é': ['e', 2], 'ě': ['e', 3], 'è': ['e', 4],
  'ī': ['i', 1], 'í': ['i', 2], 'ǐ': ['i', 3], 'ì': ['i', 4],
  'ō': ['o', 1], 'ó': ['o', 2], 'ǒ': ['o', 3], 'ò': ['o', 4],
  'ū': ['u', 1], 'ú': ['u', 2], 'ǔ': ['u', 3], 'ù': ['u', 4],
  'ǖ': ['ü', 1], 'ǘ': ['ü', 2], 'ǚ': ['ü', 3], 'ǜ': ['ü', 4],
  'Ā': ['A', 1], 'Á': ['A', 2], 'Ǎ': ['A', 3], 'À': ['A', 4],
  'Ē': ['E', 1], 'É': ['E', 2], 'Ě': ['E', 3], 'È': ['E', 4],
  'Ī': ['I', 1], 'Í': ['I', 2], 'Ǐ': ['I', 3], 'Ì': ['I', 4],
  'Ō': ['O', 1], 'Ó': ['O', 2], 'Ǒ': ['O', 3], 'Ò': ['O', 4],
  'Ū': ['U', 1], 'Ú': ['U', 2], 'Ǔ': ['U', 3], 'Ù': ['U', 4],
  'Ǖ': ['Ü', 1], 'Ǘ': ['Ü', 2], 'Ǚ': ['Ü', 3], 'Ǜ': ['Ü', 4]
};

const VALID_PINYIN = new Set([
  'a','ai','an','ang','ao',
  'ba','bai','ban','bang','bao','bei','ben','beng','bi','bian','biao','bie','bin','bing','bo','bu',
  'ca','cai','can','cang','cao','ce','cen','ceng','cha','chai','chan','chang','chao','che','chen','cheng','chi','chong','chou','chu','chua','chuai','chuan','chuang','chui','chun','chuo','ci','cong','cou','cu','cuan','cui','cun','cuo',
  'da','dai','dan','dang','dao','de','dei','den','deng','di','dian','diao','die','ding','diu','dong','dou','du','duan','dui','dun','duo',
  'e','ei','en','eng','er',
  'fa','fan','fang','fei','fen','feng','fo','fou','fu',
  'ga','gai','gan','gang','gao','ge','gei','gen','geng','gong','gou','gu','gua','guai','guan','guang','gui','gun','guo',
  'ha','hai','han','hang','hao','he','hei','hen','heng','hong','hou','hu','hua','huai','huan','huang','hui','hun','huo',
  'ji','jia','jian','jiang','jiao','jie','jin','jing','jiong','jiu','ju','juan','jue','jun',
  'ka','kai','kan','kang','kao','ke','kei','ken','keng','kong','kou','ku','kua','kuai','kuan','kuang','kui','kun','kuo',
  'la','lai','lan','lang','lao','le','lei','leng','li','lia','lian','liang','liao','lie','lin','ling','liu','lo','long','lou','lu','luan','lun','luo','lü','lüe',
  'ma','mai','man','mang','mao','me','mei','men','meng','mi','mian','miao','mie','min','ming','miu','mo','mou','mu',
  'na','nai','nan','nang','nao','ne','nei','nen','neng','ni','nian','niang','niao','nie','nin','ning','niu','nong','nou','nu','nuan','nun','nuo','nü','nüe',
  'o','ou',
  'pa','pai','pan','pang','pao','pei','pen','peng','pi','pian','piao','pie','pin','ping','po','pou','pu',
  'qi','qia','qian','qiang','qiao','qie','qin','qing','qiong','qiu','qu','quan','que','qun',
  'ran','rang','rao','re','ren','reng','ri','rong','rou','ru','rua','ruan','rui','run','ruo',
  'sa','sai','san','sang','sao','se','sen','seng','sha','shai','shan','shang','shao','she','shei','shen','sheng','shi','shou','shu','shua','shuai','shuan','shuang','shui','shun','shuo','si','song','sou','su','suan','sui','sun','suo',
  'ta','tai','tan','tang','tao','te','teng','ti','tian','tiao','tie','ting','tong','tou','tu','tuan','tui','tun','tuo',
  'wa','wai','wan','wang','wei','wen','weng','wo','wu',
  'xi','xia','xian','xiang','xiao','xie','xin','xing','xiong','xiu','xu','xuan','xue','xun',
  'ya','yan','yang','yao','ye','yi','yin','ying','yo','yong','you','yu','yuan','yue','yun',
  'za','zai','zan','zang','zao','ze','zei','zen','zeng','zha','zhai','zhan','zhang','zhao','zhe','zhei','zhen','zheng','zhi','zhong','zhou','zhu','zhua','zhuai','zhuan','zhuang','zhui','zhun','zhuo','zi','zong','zou','zu','zuan','zui','zun','zuo'
]);

/**
 * Đặt dấu thanh vào đúng nguyên âm theo quy tắc ngữ âm Pinyin:
 * 1. a/e
 * 2. ou -> o
 * 3. iu -> u (nguyên âm sau)
 * 4. ui -> i (nguyên âm sau)
 * 5. o
 * 6. i
 * 7. u
 * 8. ü
 */
function markSyllable(syl, tone) {
  if (!syl) return '';
  let s = syl.replace(/u:/gi, m => m[0] === 'U' ? 'Ü' : 'ü')
             .replace(/v/gi, m => m === 'V' ? 'Ü' : 'ü');

  if (!tone || tone === 5 || tone < 1 || tone > 4) {
    return s;
  }

  let idx = -1;
  const lower = s.toLowerCase();
  if (lower.includes('a')) {
    idx = lower.indexOf('a');
  } else if (lower.includes('e')) {
    idx = lower.indexOf('e');
  } else if (lower.includes('iu')) {
    idx = lower.indexOf('iu') + 1;
  } else if (lower.includes('ui')) {
    idx = lower.indexOf('ui') + 1;
  } else if (lower.includes('o')) {
    idx = lower.indexOf('o');
  } else if (lower.includes('i')) {
    idx = lower.indexOf('i');
  } else if (lower.includes('u')) {
    idx = lower.indexOf('u');
  } else if (lower.includes('ü')) {
    idx = lower.indexOf('ü');
  }

  if (idx !== -1) {
    const ch = s[idx];
    const mapped = TONE_MAP[ch] ? TONE_MAP[ch][tone] : ch;
    return s.slice(0, idx) + mapped + s.slice(idx + 1);
  }
  return s;
}

/**
 * Chuyển đổi pinyin chứa số thanh sang pinyin có dấu thanh.
 * Hỗ trợ ni3 -> nǐ, hao3 -> hǎo, lv4 -> lǜ, xie4xie5 -> xièxie,
 * gui4 -> guì, liu2 -> liú, zhong1guo2 -> zhōngguó
 */
function convertPinyinNumbersToMarks(text) {
  if (!text) return '';
  return text.replace(/([a-zA-ZüÜ:]+)([1-5])/g, (m, syl, tone) => {
    return markSyllable(syl, parseInt(tone, 10));
  });
}

/**
 * Tách âm gốc (base letters) và số thanh (tone 1-5) từ một âm tiết.
 * Chuẩn hóa: chữ thường, ü=v=u:, loại bỏ ký tự không hợp lệ.
 */
function extractBaseAndTone(syl) {
  if (!syl) return { base: '', tone: 5, hasToneNumber: false };
  let base = '';
  let tone = 5;
  let hasToneNumber = false;

  const numMatch = syl.match(/^([a-zA-ZüÜ:]+)([1-5])$/);
  let rawSyl = syl;
  if (numMatch) {
    rawSyl = numMatch[1];
    tone = parseInt(numMatch[2], 10);
    hasToneNumber = true;
  }

  for (let ch of rawSyl) {
    if (CHAR_TO_TONE[ch]) {
      base += CHAR_TO_TONE[ch][0];
      if (!hasToneNumber) tone = CHAR_TO_TONE[ch][1];
    } else {
      base += ch;
    }
  }

  base = base.toLowerCase()
    .replace(/u:/g, 'ü')
    .replace(/v/g, 'ü')
    .replace(/[^a-züz̈]/g, '');

  return { base, tone, hasToneNumber };
}

/**
 * Phân đoạn một từ pinyin liền (như 'xièxie', 'duìbuqǐ', 'fànguǎn') thành các âm tiết.
 */
function segmentPinyinWord(word) {
  if (!word) return [];
  if (word.includes("'")) {
    return word.split("'").flatMap(w => segmentPinyinWord(w));
  }
  const chars = word.split('');
  const plainChars = chars.map(c => {
    if (CHAR_TO_TONE[c]) return CHAR_TO_TONE[c][0].toLowerCase();
    return c.toLowerCase();
  });

  function solve(start) {
    if (start === chars.length) return [];
    for (let len = Math.min(6, chars.length - start); len >= 1; len--) {
      const subPlain = plainChars.slice(start, start + len).join('').replace(/u:/g, 'ü').replace(/v/g, 'ü');
      if (VALID_PINYIN.has(subPlain)) {
        if (start + len < chars.length) {
          const nextFirst = plainChars[start + len];
          // Âm tiết không có phụ âm đầu chỉ có thể bắt đầu bằng a, o, e
          if (nextFirst === 'i' || nextFirst === 'u' || nextFirst === 'ü' || nextFirst === 'v') {
            continue;
          }
        }
        const rest = solve(start + len);
        if (rest !== null) {
          return [chars.slice(start, start + len).join(''), ...rest];
        }
      }
    }
    return null;
  }

  const result = solve(0);
  return result || [word];
}

/**
 * Tách chuỗi pinyin mục tiêu thành danh sách các âm tiết (bỏ dấu câu).
 */
function splitTargetPinyin(pyStr, hanziStr) {
  if (!pyStr) return [];
  const cleanPy = pyStr.replace(/[.,!?:;\"'“”‘’–—…·]/g, ' ').trim();
  const words = cleanPy.split(/\s+/).filter(Boolean);
  return words.flatMap(w => segmentPinyinWord(w));
}

/**
 * Tách nội dung người dùng nhập thành danh sách âm tiết.
 * Hỗ trợ có dấu cách hoặc viết liền theo số lượng âm tiết mục tiêu.
 */
function tokenizeInput(inputText, targetSyllables, toneMode) {
  if (!inputText) return [];
  let raw = inputText.trim().replace(/[.,!?:;\"'“”‘’–—…·]/g, ' ').trim();
  let parts = raw.split(/\s+/).filter(Boolean);

  let tokens = parts.flatMap(p => {
    if (toneMode === 'tone_num') {
      const m = p.match(/[a-zA-ZüÜ:]+[1-5]?/g);
      if (m && m.length > 1) return m;
    }
    const segs = segmentPinyinWord(p);
    return (segs && segs.length > 0) ? segs : [p];
  });

  if (targetSyllables && targetSyllables.length > 1 && tokens.length !== targetSyllables.length) {
    if (parts.length === 1) {
      const single = parts[0];
      let cur = single;
      let segs = [];
      for (let i = 0; i < targetSyllables.length; i++) {
        const tInfo = extractBaseAndTone(targetSyllables[i]);
        let len = tInfo.base.length;
        if (i === targetSyllables.length - 1) {
          segs.push(cur);
        } else {
          if (cur.length > len && /[1-5]/.test(cur[len])) len++;
          segs.push(cur.slice(0, len));
          cur = cur.slice(len);
        }
      }
      if (segs.length === targetSyllables.length && segs.every(Boolean)) {
        return segs;
      }
    }
  }

  return tokens;
}

/**
 * So sánh một âm tiết người dùng gõ với âm tiết mục tiêu.
 * Trả về status: 'correct' | 'wrong_tone' | 'wrong' | 'empty'
 */
function compareSyllable(userSyl, targetSyl, toneMode) {
  if (!userSyl) return { status: 'empty', label: 'Chưa nhập', reason: 'chưa nhập' };
  const u = extractBaseAndTone(userSyl);
  const t = extractBaseAndTone(targetSyl);

  if (toneMode === 'no_tone') {
    if (u.base === t.base) {
      return { status: 'correct', user: userSyl, target: targetSyl, base: t.base, tone: t.tone };
    }
    return { status: 'wrong', user: userSyl, target: targetSyl, base: t.base, tone: t.tone, reason: 'sai chữ' };
  }

  // Chế độ tone_mark hoặc tone_num: kiểm tra chữ cái trước
  if (u.base !== t.base) {
    return { status: 'wrong', user: userSyl, target: targetSyl, base: t.base, tone: t.tone, reason: 'sai chữ' };
  }

  // Chữ cái đúng! Kiểm tra thanh điệu
  let toneMatches = false;
  if (toneMode === 'tone_num') {
    if (t.tone === 5) {
      toneMatches = (u.tone === 5); // 5 hoặc không số đều hợp lệ
    } else {
      toneMatches = (u.tone === t.tone && u.hasToneNumber);
    }
  } else {
    // tone_mark
    toneMatches = (u.tone === t.tone);
  }

  if (toneMatches) {
    return { status: 'correct', user: userSyl, target: targetSyl, base: t.base, tone: t.tone };
  } else {
    return {
      status: 'wrong_tone',
      user: userSyl,
      target: targetSyl,
      base: t.base,
      targetTone: t.tone,
      userTone: u.tone,
      reason: 'sai thanh'
    };
  }
}

/**
 * So sánh toàn bộ chuỗi người dùng nhập với chuỗi mục tiêu.
 */
function compareInputToTarget(inputText, targetPinyin, toneMode, targetHanzi) {
  const targetSyllables = splitTargetPinyin(targetPinyin, targetHanzi);
  const userSyllables = tokenizeInput(inputText, targetSyllables, toneMode);

  const results = [];
  let isAllCorrect = true;

  for (let i = 0; i < targetSyllables.length; i++) {
    const tSyl = targetSyllables[i];
    const uSyl = userSyllables[i] || '';
    const res = compareSyllable(uSyl, tSyl, toneMode);
    results.push(res);
    if (res.status !== 'correct') {
      isAllCorrect = false;
    }
  }

  if (userSyllables.length > targetSyllables.length) {
    isAllCorrect = false;
    for (let i = targetSyllables.length; i < userSyllables.length; i++) {
      results.push({
        status: 'wrong',
        user: userSyllables[i],
        target: '',
        reason: 'thừa âm tiết'
      });
    }
  }

  return {
    isAllCorrect,
    targetSyllables,
    userSyllables,
    results
  };
}

/* ==========================================================================
   2. Audio Speech Helper
   ========================================================================== */

function speakText(text) {
  if (!text) return;
  if (typeof window !== 'undefined' && window.app && typeof window.app.speakText === 'function') {
    window.app.speakText(text, null, 'zh-CN');
    return;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
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

/* ==========================================================================
   3. LocalStorage Statistics Helper
   ========================================================================== */

const STATS_KEY = 'zh_typing_stats';

function getStoredStats() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { bestAccuracy: 0, bestSpeed: 0, history: [], wrongWordIds: [] };
  }
  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        bestAccuracy: parsed.bestAccuracy || 0,
        bestSpeed: parsed.bestSpeed || 0,
        history: Array.isArray(parsed.history) ? parsed.history : [],
        wrongWordIds: Array.isArray(parsed.wrongWordIds) ? parsed.wrongWordIds : []
      };
    }
  } catch (e) {
    console.warn('Error reading zh_typing_stats:', e);
  }
  return { bestAccuracy: 0, bestSpeed: 0, history: [], wrongWordIds: [] };
}

function saveStoredStats(stats) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.warn('Error writing zh_typing_stats:', e);
  }
}

function addWrongWordId(id) {
  if (!id) return;
  const stats = getStoredStats();
  if (!stats.wrongWordIds.includes(id)) {
    stats.wrongWordIds.push(id);
    saveStoredStats(stats);
  }
}

/* ==========================================================================
   4. UI Controller: TypingPractice
   ========================================================================== */

const TypingPractice = {
  initialized: false,
  session: {
    items: [],
    currentIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    wrongList: [],
    totalSyllablesCorrect: 0,
    startTime: 0,
    timerInterval: null,
    checked: false,
    hintCount: 0
  },

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.populateTopicOptions();
    this.bindEvents();
    this.updateWrongWordsBadge();
    this.renderHistory();
  },

  onShow() {
    this.init();
    this.updateWrongWordsBadge();
    const input = document.getElementById('typing-input');
    if (!this.session.items || this.session.items.length === 0) {
      this.startSession();
    } else {
      if (input) input.focus();
    }
  },

  populateTopicOptions() {
    const select = document.getElementById('typing-topic-select');
    if (!select || typeof window === 'undefined') return;

    const topics = window.TOPICS || [];
    select.innerHTML = '<option value="all">Tất cả chủ đề</option>' +
      topics.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
  },

  updateWrongWordsBadge() {
    const el = document.getElementById('wrong-words-count');
    if (!el) return;
    const stats = getStoredStats();
    el.textContent = stats.wrongWordIds.length;
  },

  bindEvents() {
    const btnStart = document.getElementById('btn-typing-start');
    if (btnStart) {
      btnStart.addEventListener('click', () => this.startSession(false));
    }

    const btnSubmit = document.getElementById('btn-typing-submit');
    if (btnSubmit) {
      btnSubmit.addEventListener('click', () => this.checkAnswer());
    }

    const btnNext = document.getElementById('btn-typing-next');
    if (btnNext) {
      btnNext.addEventListener('click', () => this.nextQuestion());
    }

    const btnHint = document.getElementById('btn-typing-hint');
    if (btnHint) {
      btnHint.addEventListener('click', () => this.giveHint());
    }

    const btnSkip = document.getElementById('btn-typing-skip');
    if (btnSkip) {
      btnSkip.addEventListener('click', () => this.skipQuestion());
    }

    const btnAudio = document.getElementById('btn-prompt-audio');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        const item = this.session.items[this.session.currentIndex];
        if (item) speakText(item.hanzi);
      });
    }

    const btnRestart = document.getElementById('btn-typing-restart');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => this.startSession(false));
    }

    const btnRetryWrong = document.getElementById('btn-retry-wrong');
    if (btnRetryWrong) {
      btnRetryWrong.addEventListener('click', () => this.startSession(true));
    }

    const btnClear = document.getElementById('btn-typing-clear');
    const input = document.getElementById('typing-input');
    if (btnClear && input) {
      btnClear.addEventListener('click', () => {
        input.value = '';
        input.focus();
        btnClear.style.display = 'none';
      });
    }

    if (input) {
      input.addEventListener('input', (e) => this.handleInputLive(e));
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (this.session.checked) {
            this.nextQuestion();
          } else {
            this.checkAnswer();
          }
        } else if (e.key === 'Tab') {
          e.preventDefault();
          this.giveHint();
        }
      });
    }

    const modeSelect = document.getElementById('typing-mode-select');
    if (modeSelect) {
      modeSelect.addEventListener('change', () => {
        const isSentence = modeSelect.value === 'sentence';
        const topicGroup = document.getElementById('group-topic-filter');
        if (topicGroup) {
          topicGroup.style.display = isSentence ? 'none' : 'flex';
        }
      });
    }
  },

  handleInputLive(e) {
    const input = e.target;
    const toneMode = document.getElementById('typing-tone-select')?.value || 'tone_mark';
    const btnClear = document.getElementById('btn-typing-clear');

    if (btnClear) {
      btnClear.style.display = input.value ? 'flex' : 'none';
    }

    // Ở chế độ Dấu thanh: tự chuyển số sau âm tiết thành dấu ngay khi gõ
    if (toneMode === 'tone_mark') {
      const oldVal = input.value;
      const start = input.selectionStart;
      const newVal = convertPinyinNumbersToMarks(oldVal);
      if (oldVal !== newVal) {
        const diff = newVal.length - oldVal.length;
        input.value = newVal;
        const newPos = Math.max(0, start + diff);
        input.setSelectionRange(newPos, newPos);
      }
    }
  },

  startSession(isRetryWrong = false) {
    if (this.session.timerInterval) {
      clearInterval(this.session.timerInterval);
    }

    const mode = document.getElementById('typing-mode-select')?.value || 'hanzi_py';
    const toneMode = document.getElementById('typing-tone-select')?.value || 'tone_mark';
    const topic = document.getElementById('typing-topic-select')?.value || 'all';
    const count = parseInt(document.getElementById('typing-count-select')?.value || '10', 10);
    const prioritizeWrong = document.getElementById('chk-prioritize-wrong')?.checked || false;

    let pool = [];

    if (isRetryWrong && this.session.wrongList && this.session.wrongList.length > 0) {
      pool = [...this.session.wrongList];
    } else {
      if (mode === 'sentence') {
        const vocabEx = (window.VOCAB || [])
          .filter(v => v.ex && v.ex.zh && v.ex.py)
          .map(v => ({
            id: v.id + '_ex',
            hanzi: v.ex.zh,
            pinyin: v.ex.py,
            vi: v.ex.vi,
            topic: 'Câu ví dụ HSK1'
          }));

        const diaLines = [];
        (window.DIALOGUES || []).forEach(d => {
          (d.lines || []).forEach((line, idx) => {
            diaLines.push({
              id: d.id + '_' + idx,
              hanzi: line.zh,
              pinyin: line.py,
              vi: line.vi,
              topic: d.title || 'Hội thoại'
            });
          });
        });

        pool = [...vocabEx, ...diaLines];
      } else {
        const allVocab = window.VOCAB || [];
        if (topic === 'all') {
          pool = allVocab.map(v => ({ ...v }));
        } else {
          pool = allVocab.filter(v => v.topic === topic).map(v => ({ ...v }));
        }

        // Ưu tiên các từ từng gõ sai nếu được chọn
        if (prioritizeWrong) {
          const stats = getStoredStats();
          const wrongIds = new Set(stats.wrongWordIds);
          const wrongPool = pool.filter(v => wrongIds.has(v.id));
          const restPool = pool.filter(v => !wrongIds.has(v.id));
          this.shuffle(wrongPool);
          this.shuffle(restPool);
          pool = [...wrongPool, ...restPool];
        }
      }

      this.shuffle(pool);
      pool = pool.slice(0, count);
    }

    if (pool.length === 0) {
      alert('Không tìm thấy dữ liệu từ vựng phù hợp.');
      return;
    }

    this.session = {
      items: pool,
      currentIndex: 0,
      correctCount: 0,
      wrongCount: 0,
      wrongList: [],
      totalSyllablesCorrect: 0,
      startTime: Date.now(),
      timerInterval: null,
      checked: false,
      hintCount: 0
    };

    // Bật bộ đếm thời gian
    this.session.timerInterval = setInterval(() => this.updateTimer(), 1000);

    const practiceBox = document.getElementById('typing-practice-box');
    const resultBox = document.getElementById('typing-result-box');
    if (practiceBox) practiceBox.classList.remove('hidden');
    if (resultBox) resultBox.classList.add('hidden');

    this.renderQuestion();
  },

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  updateTimer() {
    const timerEl = document.getElementById('stat-timer');
    const speedEl = document.getElementById('stat-speed');
    if (!timerEl) return;

    const elapsedSec = Math.max(1, Math.floor((Date.now() - this.session.startTime) / 1000));
    const mm = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
    const ss = String(elapsedSec % 60).padStart(2, '0');
    timerEl.textContent = `${mm}:${ss}`;

    if (speedEl) {
      const spm = Math.round((this.session.totalSyllablesCorrect / (elapsedSec / 60)));
      speedEl.textContent = `${spm} âm/phút`;
    }
  },

  renderQuestion() {
    const item = this.session.items[this.session.currentIndex];
    if (!item) return;

    this.session.checked = false;
    this.session.hintCount = 0;

    const mode = document.getElementById('typing-mode-select')?.value || 'hanzi_py';
    const total = this.session.items.length;
    const current = this.session.currentIndex + 1;

    // Cập nhật thanh tiến độ và thống kê trên màn hình
    const progText = document.getElementById('stat-progress');
    const progFill = document.getElementById('typing-progress-fill');
    const accText = document.getElementById('stat-accuracy');
    const corrText = document.getElementById('stat-correct');
    const wrongText = document.getElementById('stat-wrong');

    if (progText) progText.textContent = `${current} / ${total}`;
    if (progFill) progFill.style.width = `${Math.round(((current - 1) / total) * 100)}%`;

    const answered = this.session.correctCount + this.session.wrongCount;
    const acc = answered > 0 ? Math.round((this.session.correctCount / answered) * 100) : 100;
    if (accText) accText.textContent = `${acc}%`;
    if (corrText) corrText.textContent = this.session.correctCount;
    if (wrongText) wrongText.textContent = this.session.wrongCount;

    // Huy hiệu chủ đề
    const badgeEl = document.getElementById('typing-prompt-badge');
    if (badgeEl) {
      const topicObj = (window.TOPICS || []).find(t => t.id === item.topic);
      const fIcon = typingIc('folder', { size: 14 });
      badgeEl.innerHTML = topicObj ? `${(fIcon ? fIcon + ' ' : '')}${topicObj.name}` : (item.topic || 'Từ vựng');
    }

    // Nội dung câu hỏi theo chế độ (a, b, c, d)
    const hanziEl = document.getElementById('typing-prompt-hanzi');
    const subEl = document.getElementById('typing-prompt-sub');
    const isSentence = mode === 'sentence' || (item.hanzi && item.hanzi.length > 5);

    if (hanziEl) {
      hanziEl.classList.toggle('sentence-mode', isSentence);
      if (mode === 'listen_py') {
        hanziEl.innerHTML = `${typingIc('headphones')} [Nghe âm thanh]`;
      } else if (mode === 'vi_py') {
        hanziEl.textContent = item.vi || '???';
      } else {
        hanziEl.textContent = item.hanzi;
      }
    }

    if (subEl) {
      if (mode === 'listen_py') {
        subEl.textContent = 'Nghe phát âm và gõ pinyin';
      } else if (mode === 'vi_py') {
        subEl.textContent = 'Gõ pinyin cho nghĩa trên';
      } else {
        subEl.textContent = item.vi || '';
      }
    }

    // Nếu ở chế độ Nghe: tự động phát âm ngay khi mở câu hỏi
    if (mode === 'listen_py') {
      speakText(item.hanzi);
    }

    // Tạo các ô âm tiết giữ chỗ (placeholders)
    const targetSyllables = splitTargetPinyin(item.pinyin, item.hanzi);
    const feedbackContainer = document.getElementById('typing-syllables-feedback');
    if (feedbackContainer) {
      const cleanHz = (item.hanzi || '').replace(/[^\u4e00-\u9fa5]/g, '');
      feedbackContainer.innerHTML = targetSyllables.map((syl, i) => {
        const charHz = cleanHz[i] || '';
        const displayChar = (mode === 'listen_py' || mode === 'vi_py') ? '?' : (charHz || '•');
        return `
          <div class="syl-box placeholder" id="syl-box-${i}">
            <span class="syl-hanzi">${displayChar}</span>
            <span class="syl-target">_ _</span>
          </div>
        `;
      }).join('');
    }

    // Reset ô nhập và các nút bấm
    const input = document.getElementById('typing-input');
    const btnSubmit = document.getElementById('btn-typing-submit');
    const btnNext = document.getElementById('btn-typing-next');
    const btnClear = document.getElementById('btn-typing-clear');

    if (input) {
      input.value = '';
      input.className = 'typing-input';
      input.disabled = false;
      input.focus();
    }
    if (btnClear) btnClear.style.display = 'none';
    if (btnSubmit) btnSubmit.classList.remove('hidden');
    if (btnNext) btnNext.classList.add('hidden');
  },

  checkAnswer() {
    if (this.session.checked) return;

    const input = document.getElementById('typing-input');
    const val = input ? input.value.trim() : '';
    if (!val) {
      if (input) input.focus();
      return;
    }

    const item = this.session.items[this.session.currentIndex];
    if (!item) return;

    const toneMode = document.getElementById('typing-tone-select')?.value || 'tone_mark';
    const autoSpeak = document.getElementById('chk-auto-speak')?.checked ?? true;

    const compareRes = compareInputToTarget(val, item.pinyin, toneMode, item.hanzi);
    this.session.checked = true;

    // Hiển thị phản hồi từng âm tiết
    const feedbackContainer = document.getElementById('typing-syllables-feedback');
    const cleanHz = (item.hanzi || '').replace(/[^\u4e00-\u9fa5]/g, '');

    if (feedbackContainer) {
      feedbackContainer.innerHTML = compareRes.results.map((res, i) => {
        const charHz = cleanHz[i] || (res.target ? '' : '•');
        let statusClass = 'correct';
        let badgeText = '';

        if (res.status === 'wrong_tone') {
          statusClass = 'wrong-tone';
          badgeText = '<span class="syl-badge">sai thanh</span>';
        } else if (res.status === 'wrong') {
          statusClass = 'wrong';
          badgeText = `<span class="syl-badge">${res.reason || 'sai'}</span>`;
        } else if (res.status === 'empty') {
          statusClass = 'wrong';
          badgeText = '<span class="syl-badge">thiếu</span>';
        }

        const userDisplay = (res.status !== 'correct' && res.user)
          ? `<span class="syl-user">${res.user}</span>`
          : '';

        return `
          <div class="syl-box ${statusClass}">
            <span class="syl-hanzi">${charHz || (res.target || '')}</span>
            <span class="syl-target">${res.target || ''}</span>
            ${userDisplay}
            ${badgeText}
          </div>
        `;
      }).join('');
    }

    // Tiết lộ Hán tự và Nghĩa đầy đủ nếu trước đó bị ẩn ở chế độ Nghe/Nghĩa
    const hanziEl = document.getElementById('typing-prompt-hanzi');
    const subEl = document.getElementById('typing-prompt-sub');
    if (hanziEl) hanziEl.textContent = item.hanzi;
    if (subEl) subEl.textContent = item.vi;

    // Đánh giá đúng / sai
    if (compareRes.isAllCorrect) {
      this.session.correctCount++;
      this.session.totalSyllablesCorrect += compareRes.targetSyllables.length;
      if (typeof window !== 'undefined' && window.Economy && typeof window.Economy.reward === 'function') {
        window.Economy.reward('typingWord');
      }
      if (input) input.classList.add('input-correct');
      if (autoSpeak) {
        speakText(item.hanzi);
      }
    } else {
      this.session.wrongCount++;
      this.session.wrongList.push(item);
      addWrongWordId(item.id);
      this.updateWrongWordsBadge();

      const hasWrongToneOnly = compareRes.results.every(r => r.status === 'correct' || r.status === 'wrong_tone');
      if (input) {
        input.classList.add(hasWrongToneOnly ? 'input-wrong-tone' : 'input-wrong');
      }
    }

    // Đổi nút Kiểm tra -> Câu tiếp theo
    const btnSubmit = document.getElementById('btn-typing-submit');
    const btnNext = document.getElementById('btn-typing-next');
    if (btnSubmit) btnSubmit.classList.add('hidden');
    if (btnNext) btnNext.classList.remove('hidden');

    if (input) input.focus();
  },

  nextQuestion() {
    this.session.currentIndex++;
    if (this.session.currentIndex < this.session.items.length) {
      this.renderQuestion();
    } else {
      this.finishSession();
    }
  },

  giveHint() {
    if (this.session.checked) return;

    const item = this.session.items[this.session.currentIndex];
    if (!item) return;

    const targetSyllables = splitTargetPinyin(item.pinyin, item.hanzi);
    if (!targetSyllables || targetSyllables.length === 0) return;

    const toneMode = document.getElementById('typing-tone-select')?.value || 'tone_mark';
    const input = document.getElementById('typing-input');
    if (!input) return;

    const hintIdx = Math.min(targetSyllables.length - 1, this.session.hintCount);
    let syl = targetSyllables[hintIdx];

    if (toneMode === 'tone_num') {
      const info = extractBaseAndTone(syl);
      syl = (info.tone === 5) ? info.base : (info.base + info.tone);
    } else if (toneMode === 'no_tone') {
      const info = extractBaseAndTone(syl);
      syl = info.base;
    }

    this.session.hintCount++;

    const currentVal = input.value.trim();
    input.value = currentVal ? `${currentVal} ${syl}` : syl;
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);

    // Cập nhật thẻ hiển thị gợi ý
    const boxEl = document.getElementById(`syl-box-${hintIdx}`);
    if (boxEl) {
      const targetSpan = boxEl.querySelector('.syl-target');
      if (targetSpan) targetSpan.textContent = syl;
    }
  },

  skipQuestion() {
    if (this.session.checked) {
      this.nextQuestion();
      return;
    }

    const item = this.session.items[this.session.currentIndex];
    if (!item) return;

    this.session.checked = true;
    this.session.wrongCount++;
    this.session.wrongList.push(item);
    addWrongWordId(item.id);
    this.updateWrongWordsBadge();

    // Tiết lộ toàn bộ âm tiết
    const targetSyllables = splitTargetPinyin(item.pinyin, item.hanzi);
    const cleanHz = (item.hanzi || '').replace(/[^\u4e00-\u9fa5]/g, '');
    const feedbackContainer = document.getElementById('typing-syllables-feedback');

    if (feedbackContainer) {
      feedbackContainer.innerHTML = targetSyllables.map((syl, i) => `
        <div class="syl-box wrong">
          <span class="syl-hanzi">${cleanHz[i] || '•'}</span>
          <span class="syl-target">${syl}</span>
          <span class="syl-badge">bỏ qua</span>
        </div>
      `).join('');
    }

    const hanziEl = document.getElementById('typing-prompt-hanzi');
    const subEl = document.getElementById('typing-prompt-sub');
    if (hanziEl) hanziEl.textContent = item.hanzi;
    if (subEl) subEl.textContent = item.vi;

    const input = document.getElementById('typing-input');
    if (input) {
      input.classList.add('input-wrong');
      input.focus();
    }

    const btnSubmit = document.getElementById('btn-typing-submit');
    const btnNext = document.getElementById('btn-typing-next');
    if (btnSubmit) btnSubmit.classList.add('hidden');
    if (btnNext) btnNext.classList.remove('hidden');
  },

  finishSession() {
    if (this.session.timerInterval) {
      clearInterval(this.session.timerInterval);
      this.session.timerInterval = null;
    }

    const total = this.session.items.length;
    const correct = this.session.correctCount;
    const wrong = this.session.wrongCount;
    const acc = total > 0 ? Math.round((correct / total) * 100) : 0;

    const elapsedSec = Math.max(1, Math.floor((Date.now() - this.session.startTime) / 1000));
    const mm = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
    const ss = String(elapsedSec % 60).padStart(2, '0');
    const timeFormatted = `${mm}:${ss}`;
    const spm = Math.round((this.session.totalSyllablesCorrect / (elapsedSec / 60)));

    const mode = document.getElementById('typing-mode-select')?.value || 'hanzi_py';
    const toneMode = document.getElementById('typing-tone-select')?.value || 'tone_mark';

    // Lưu thống kê vào localStorage
    const stats = getStoredStats();
    let isNewRecord = false;

    if (acc > stats.bestAccuracy || (acc === stats.bestAccuracy && spm > stats.bestSpeed)) {
      stats.bestAccuracy = Math.max(stats.bestAccuracy, acc);
      stats.bestSpeed = Math.max(stats.bestSpeed, spm);
      isNewRecord = true;
    }

    const now = new Date();
    const dateStr = `${now.getDate()}/${now.getMonth() + 1} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const sessionRecord = {
      date: dateStr,
      mode,
      toneMode,
      total,
      correct,
      wrong,
      accuracy: acc,
      spm,
      time: timeFormatted
    };

    stats.history = [sessionRecord, ...stats.history].slice(0, 10);
    saveStoredStats(stats);

    // Hiển thị giao diện kết quả
    const practiceBox = document.getElementById('typing-practice-box');
    const resultBox = document.getElementById('typing-result-box');
    if (practiceBox) practiceBox.classList.add('hidden');
    if (resultBox) resultBox.classList.remove('hidden');

    const resAcc = document.getElementById('res-accuracy');
    const resCorr = document.getElementById('res-correct');
    const resWrong = document.getElementById('res-wrong');
    const resSpeed = document.getElementById('res-speed');
    const resTime = document.getElementById('res-time');
    const resTitle = document.getElementById('result-title');
    const resSubtitle = document.getElementById('result-subtitle');

    if (resAcc) resAcc.textContent = `${acc}%`;
    if (resCorr) resCorr.textContent = correct;
    if (resWrong) resWrong.textContent = wrong;
    if (resSpeed) resSpeed.textContent = spm;
    if (resTime) resTime.textContent = timeFormatted;

    if (resTitle) {
      resTitle.innerHTML = isNewRecord ? `${typingIc('party-popper')} Kỷ Lục Mới!` : (acc >= 80 ? 'Hoàn Thành Xuất Sắc!' : 'Lượt Luyện Đã Hoàn Thành');
    }
    if (resSubtitle) {
      resSubtitle.textContent = acc === 100
        ? 'Chính xác 100%! Phản xạ gõ Pinyin của bạn rất chuẩn xác.'
        : `Bạn đã đạt ${acc}% độ chính xác với tốc độ ${spm} âm/phút.`;
    }

    // Hiển thị danh sách từ sai nếu có
    const wrongSection = document.getElementById('typing-wrong-section');
    const wrongListEl = document.getElementById('typing-wrong-list');
    if (wrongSection && wrongListEl) {
      if (this.session.wrongList.length > 0) {
        wrongSection.classList.remove('hidden');
        wrongListEl.innerHTML = this.session.wrongList.map(item => `
          <div class="wrong-item-row">
            <div class="wrong-item-left">
              <span class="wrong-item-hanzi">${item.hanzi}</span>
              <span class="wrong-item-py">${item.pinyin}</span>
              <span class="wrong-item-vi">${item.vi || ''}</span>
            </div>
            <button class="btn-icon btn-sm" onclick="TypingPractice.speak('${item.hanzi}')" title="Nghe phát âm">${typingIc('volume')}</button>
          </div>
        `).join('');
      } else {
        wrongSection.classList.add('hidden');
      }
    }

    this.renderHistory();
  },

  renderHistory() {
    const listEl = document.getElementById('typing-history-list');
    if (!listEl) return;

    const stats = getStoredStats();
    if (!stats.history || stats.history.length === 0) {
      listEl.innerHTML = '<p class="text-muted" style="font-size: 0.85rem;">Chưa có lịch sử lượt luyện tập nào.</p>';
      return;
    }

    const modeLabels = {
      hanzi_py: 'Hán &rarr; Pinyin',
      listen_py: 'Nghe &rarr; Pinyin',
      vi_py: 'Nghĩa &rarr; Pinyin',
      sentence: 'Gõ câu'
    };

    listEl.innerHTML = stats.history.map(h => `
      <div class="history-item-row">
        <div>
          <span class="history-item-date">${h.date}</span> &bull;
          <strong>${modeLabels[h.mode] || h.mode}</strong>
        </div>
        <div class="history-item-stats">
          <span>${h.correct}/${h.total} (${h.accuracy}%)</span>
          <span>${typingIc('zap', { size: 14 })} ${h.spm} âm/p</span>
          <span>${typingIc('clock', { size: 14 })} ${h.time}</span>
        </div>
      </div>
    `).join('');
  },

  speak(text) {
    speakText(text);
  }
};

/* ==========================================================================
   5. Global Attachment & Node.js Exports
   ========================================================================== */

if (typeof window !== 'undefined') {
  window.TypingPractice = TypingPractice;
  // Khởi tạo khi trang tải xong
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => TypingPractice.init());
  } else {
    TypingPractice.init();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TONE_MAP,
    CHAR_TO_TONE,
    VALID_PINYIN,
    markSyllable,
    convertPinyinNumbersToMarks,
    extractBaseAndTone,
    segmentPinyinWord,
    splitTargetPinyin,
    tokenizeInput,
    compareSyllable,
    compareInputToTarget,
    TypingPractice
  };
}
