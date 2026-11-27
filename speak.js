/**
 * speak.js - Luyện phát âm tiếng Trung (Pronunciation Practice)
 * Nền tảng học đa ngôn ngữ Polylingo cho người Việt.
 * Hỗ trợ 3 chế độ: Luyện thanh (đơn & cặp thanh), Đọc theo (SpeechRecognition/MediaRecorder), Âm dễ nhầm.
 */

(function () {
  'use strict';

  const LOCAL_ICONS = {
    'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
    'pin': '<line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>'
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
     1. Pure Helper Functions (Exported for Testing)
     ========================================================================== */

  /**
   * Chuẩn hóa chữ Hán: loại bỏ toàn bộ dấu câu (tiếng Trung & quốc tế) và khoảng trắng.
   * @param {string} s Chuỗi đầu vào
   * @returns {string} Chuỗi chỉ còn chữ
   */
  function normalizeHanzi(s) {
    if (!s || typeof s !== 'string') return '';
    return s.replace(/[\s\p{P}\p{S}]/gu, '');
  }

  const EN_CONTRACTIONS = {
    "i'm": "i am",
    "you're": "you are",
    "he's": "he is",
    "she's": "she is",
    "it's": "it is",
    "we're": "we are",
    "they're": "they are",
    "i've": "i have",
    "you've": "you have",
    "we've": "we have",
    "they've": "they have",
    "i'll": "i will",
    "you'll": "you will",
    "he'll": "he will",
    "she'll": "she will",
    "we'll": "we will",
    "they'll": "they will",
    "i'd": "i would",
    "you'd": "you would",
    "he'd": "he would",
    "she'd": "she would",
    "we'd": "we would",
    "they'd": "they would",
    "don't": "do not",
    "doesn't": "does not",
    "didn't": "did not",
    "can't": "cannot",
    "couldn't": "could not",
    "won't": "will not",
    "wouldn't": "would not",
    "shouldn't": "should not",
    "isn't": "is not",
    "aren't": "are not",
    "wasn't": "was not",
    "weren't": "were not",
    "hasn't": "has not",
    "haven't": "have not",
    "hadn't": "had not",
    "let's": "let us",
    "that's": "that is",
    "what's": "what is",
    "where's": "where is",
    "who's": "who is",
    "there's": "there is",
    "here's": "here is"
  };

  function expandEnglishContractions(text) {
    if (!text || typeof text !== 'string') return '';
    let s = text.toLowerCase().replace(/[\u2018\u2019`]/g, "'");
    Object.keys(EN_CONTRACTIONS).forEach(k => {
      const reg = new RegExp('\\b' + k.replace("'", "['`’]?") + '\\b', 'gi');
      s = s.replace(reg, EN_CONTRACTIONS[k]);
    });
    return s;
  }

  function tokenizeEnglish(text) {
    if (!text || typeof text !== 'string') return [];
    const expanded = expandEnglishContractions(text);
    const clean = expanded.replace(/[^\w\s]/g, ' ');
    return clean.split(/\s+/).filter(Boolean);
  }

  // Biểu thức chính quy cho tất cả các nguyên âm và nguyên âm đôi trong IPA tiếng Anh
  const IPA_VOWEL_REGEX = /iː|uː|ɑː|ɔː|ɜː|eɪ|aɪ|ɔɪ|aʊ|oʊ|əʊ|ɪə|eə|ʊə|ɪ|i|e|æ|ɒ|ʊ|u|ʌ|ə|ɑ|ɔ/g;

  /**
   * Xác định số thứ tự âm tiết nhận trọng âm chính (1-indexed) từ chuỗi phiên âm IPA.
   * Dựa vào vị trí ký tự trọng âm chính 'ˈ' trong IPA của EN_WORDS.
   * @param {string} ipa Phiên âm IPA, ví dụ: "/ˈmɔːrnɪŋ/", "/həˈloʊ/", "/ˌæftərˈnuːn/"
   * @returns {number} Chỉ số âm tiết (1, 2, 3...)
   */
  function getStressSyllableFromIpa(ipa) {
    if (!ipa || typeof ipa !== 'string') return 1;
    const clean = ipa.replace(/^\/|\/$/g, '').trim();
    if (!clean.includes('ˈ')) return 1;
    const before = clean.split('ˈ')[0];
    const matches = before.match(IPA_VOWEL_REGEX);
    return (matches ? matches.length : 0) + 1;
  }

  // Từ điển chia âm tiết chuẩn hóa cho các từ có trọng âm trong kho từ vựng EN_WORDS
  const EN_WORD_SYLLABLES = {
    hello: ['hel', 'lo'],
    morning: ['morn', 'ing'],
    afternoon: ['af', 'ter', 'noon'],
    evening: ['eve', 'ning'],
    goodbye: ['good', 'bye'],
    welcome: ['wel', 'come'],
    sorry: ['sor', 'ry'],
    excuse: ['ex', 'cuse'],
    ok: ['o', 'k'],
    pardon: ['par', 'don'],
    later: ['la', 'ter'],
    tomorrow: ['to', 'mor', 'row'],
    again: ['a', 'gain'],
    zero: ['ze', 'ro'],
    seven: ['se', 'ven'],
    eleven: ['e', 'le', 'ven'],
    thirteen: ['thir', 'teen'],
    fourteen: ['four', 'teen'],
    fifteen: ['fif', 'teen'],
    sixteen: ['six', 'teen'],
    seventeen: ['se', 'ven', 'teen'],
    eighteen: ['eigh', 'teen'],
    nineteen: ['nine', 'teen'],
    twenty: ['twen', 'ty'],
    thirty: ['thir', 'ty'],
    forty: ['for', 'ty'],
    fifty: ['fif', 'ty'],
    sixty: ['six', 'ty'],
    seventy: ['se', 'ven', 'ty'],
    eighty: ['eigh', 'ty'],
    ninety: ['nine', 'ty'],
    hundred: ['hun', 'dred'],
    thousand: ['thou', 'sand'],
    second: ['sec', 'ond'],
    number: ['num', 'ber'],
    family: ['fam', 'i', 'ly'],
    father: ['fa', 'ther'],
    mother: ['moth', 'er'],
    parent: ['par', 'ent'],
    daughter: ['daugh', 'ter'],
    brother: ['broth', 'er'],
    sister: ['sis', 'ter'],
    baby: ['ba', 'by'],
    grandfather: ['grand', 'fa', 'ther'],
    grandmother: ['grand', 'moth', 'er'],
    uncle: ['un', 'cle'],
    cousin: ['cou', 'sin'],
    husband: ['hus', 'band'],
    woman: ['wo', 'man'],
    person: ['per', 'son'],
    people: ['peo', 'ple'],
    partner: ['part', 'ner'],
    marriage: ['mar', 'riage'],
    relative: ['rel', 'a', 'tive'],
    adult: ['a', 'dult'],
    water: ['wa', 'ter'],
    coffee: ['cof', 'fee'],
    noodle: ['noo', 'dle'],
    chicken: ['chick', 'en'],
    salad: ['sal', 'ad'],
    vegetable: ['veg', 'e', 'ta', 'ble'],
    apple: ['ap', 'ple'],
    banana: ['ba', 'nan', 'a'],
    orange: ['or', 'ange'],
    lemon: ['lem', 'on'],
    sugar: ['sug', 'ar'],
    pepper: ['pep', 'per'],
    butter: ['but', 'ter'],
    sandwich: ['sand', 'wich'],
    pizza: ['piz', 'za'],
    breakfast: ['break', 'fast'],
    dinner: ['din', 'ner'],
    delicious: ['de', 'li', 'cious'],
    sour: ['sour'],
    spicy: ['spi', 'cy'],
    hungry: ['hun', 'gry'],
    today: ['to', 'day'],
    yesterday: ['yes', 'ter', 'day'],
    weekend: ['week', 'end'],
    hour: ['hour'],
    minute: ['min', 'ute'],
    "o'clock": ['o', 'clock'],
    early: ['ear', 'ly'],
    monday: ['mon', 'day'],
    tuesday: ['tues', 'day'],
    wednesday: ['wednes', 'day'],
    thursday: ['thurs', 'day'],
    friday: ['fri', 'day'],
    saturday: ['sat', 'ur', 'day'],
    sunday: ['sun', 'day'],
    january: ['jan', 'u', 'ar', 'y'],
    february: ['feb', 'ru', 'ar', 'y'],
    april: ['a', 'pril'],
    july: ['ju', 'ly'],
    august: ['au', 'gust'],
    september: ['sep', 'tem', 'ber'],
    october: ['oc', 'to', 'ber'],
    november: ['no', 'vem', 'ber'],
    december: ['de', 'cem', 'ber'],
    calendar: ['cal', 'en', 'dar'],
    season: ['sea', 'son'],
    future: ['fu', 'ture'],
    city: ['cit', 'y'],
    country: ['coun', 'try'],
    university: ['u', 'ni', 'ver', 'si', 'ty'],
    hospital: ['hos', 'pi', 'tal'],
    hotel: ['ho', 'tel'],
    restaurant: ['res', 'tau', 'rant'],
    cafe: ['ca', 'fe'],
    market: ['mar', 'ket'],
    supermarket: ['su', 'per', 'mar', 'ket'],
    airport: ['air', 'port'],
    station: ['sta', 'tion'],
    library: ['li', 'brar', 'y'],
    cinema: ['cin', 'e', 'ma'],
    museum: ['mu', 'se', 'um'],
    taxi: ['tax', 'i'],
    bicycle: ['bi', 'cy', 'cle'],
    ticket: ['tick', 'et'],
    passport: ['pass', 'port'],
    travel: ['trav', 'el'],
    window: ['win', 'dow'],
    table: ['ta', 'ble'],
    sofa: ['so', 'fa'],
    kitchen: ['kitch', 'en'],
    bathroom: ['bath', 'room'],
    bedroom: ['bed', 'room'],
    computer: ['com', 'pu', 'ter'],
    television: ['tel', 'e', 'vi', 'sion'],
    pencil: ['pen', 'cil'],
    notebook: ['note', 'book'],
    paper: ['pa', 'per'],
    bottle: ['bot', 'tle'],
    picture: ['pic', 'ture'],
    mirror: ['mir', 'ror'],
    garden: ['gar', 'den'],
    umbrella: ['um', 'brel', 'la'],
    money: ['mon', 'ey'],
    wallet: ['wal', 'let'],
    student: ['stu', 'dent'],
    teacher: ['teach', 'er'],
    lesson: ['les', 'son'],
    exam: ['ex', 'am'],
    homework: ['home', 'work'],
    study: ['stud', 'y'],
    listen: ['lis', 'ten'],
    question: ['ques', 'tion'],
    answer: ['an', 'swer'],
    mistake: ['mis', 'take'],
    sentence: ['sen', 'tence'],
    story: ['sto', 'ry'],
    office: ['of', 'fice'],
    worker: ['work', 'er'],
    manager: ['man', 'a', 'ger'],
    doctor: ['doc', 'tor'],
    engineer: ['en', 'gi', 'neer'],
    police: ['po', 'lice'],
    driver: ['driv', 'er'],
    company: ['com', 'pa', 'ny'],
    business: ['busi', 'ness'],
    meeting: ['meet', 'ing'],
    salary: ['sal', 'a', 'ry'],
    uniform: ['u', 'ni', 'form'],
    body: ['bod', 'y'],
    jacket: ['jack', 'et'],
    pocket: ['pock', 'et'],
    glasses: ['glass', 'es'],
    nature: ['na', 'ture'],
    weather: ['weath', 'er'],
    flower: ['flow', 'er'],
    forest: ['for', 'est'],
    mountain: ['moun', 'tain'],
    river: ['riv', 'er'],
    ocean: ['o', 'cean'],
    animal: ['an', 'i', 'mal'],
    open: ['o', 'pen'],
    finish: ['fin', 'ish'],
    remember: ['re', 'mem', 'ber'],
    forget: ['for', 'get'],
    understand: ['un', 'der', 'stand'],
    arrive: ['ar', 'rive'],
    follow: ['fol', 'low'],
    carry: ['car', 'ry'],
    little: ['lit', 'tle'],
    easy: ['eas', 'y'],
    difficult: ['dif', 'fi', 'cult'],
    happy: ['hap', 'py'],
    angry: ['an', 'gry'],
    tired: ['tired'],
    healthy: ['health', 'y'],
    beautiful: ['beau', 'ti', 'ful'],
    handsome: ['hand', 'some'],
    ugly: ['ug', 'ly'],
    dirty: ['dir', 'ty'],
    dangerous: ['dan', 'ger', 'ous'],
    important: ['im', 'por', 'tant'],
    famous: ['fa', 'mous'],
    busy: ['bus', 'y'],
    expensive: ['ex', 'pen', 'sive'],
    friendly: ['friend', 'ly'],
    quiet: ['qui', 'et'],
    our: ['our'],
    because: ['be', 'cause']
  };

  /**
   * Tách một từ tiếng Anh thành các âm tiết
   * @param {string} word Từ tiếng Anh
   * @returns {string[]} Mảng các âm tiết
   */
  function splitEnglishWordSyllables(word) {
    if (!word || typeof word !== 'string') return [];
    const clean = word.toLowerCase().trim();
    if (EN_WORD_SYLLABLES[clean]) return EN_WORD_SYLLABLES[clean].slice();

    if (clean.includes('-')) return clean.split('-').filter(Boolean);
    if (clean.includes("'")) return clean.split("'").filter(Boolean);

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
      let cut;
      if (consLen <= 1) {
        cut = v1End;
      } else {
        cut = v1End + Math.floor(consLen / 2);
      }
      syls.push(clean.slice(prevCut, cut));
      prevCut = cut;
    }
    syls.push(clean.slice(prevCut));
    return syls;
  }

  /**
   * Định dạng từ theo các âm tiết với âm tiết nhấn được viết hoa, ví dụ: "be·AU·ti·ful"
   * @param {string[]} syllables Mảng âm tiết
   * @param {number} stressIndex Chỉ số âm tiết nhấn (1-based)
   * @returns {string} Chuỗi hiển thị phân tách bằng dấu '·'
   */
  function formatWordWithStress(syllables, stressIndex) {
    if (!syllables || !Array.isArray(syllables) || syllables.length === 0) return '';
    return syllables.map((s, i) => (i + 1 === stressIndex ? s.toUpperCase() : s.toLowerCase())).join('·');
  }

  /**
   * Đưa ra nhận xét cụ thể về lỗi phát âm của người học Việt Nam
   * (thiếu âm cuối, /θ/ /ð/ thành t/d/s/z, /ʃ/ vs /s/, /r/ vs /l/, và note của từ).
   */
  function getEnglishPronunciationAdvice(target, missedWords = [], candText = '', item = null) {
    const advice = [];
    const lowerTarget = (target || '').toLowerCase();
    const candWords = tokenizeEnglish(candText);

    // 1. Đối chiếu chữ cuối: Phát hiện thiếu âm cuối (final sounds /s/, /z/, /t/, /d/, -ed)
    let missingFinalDetected = false;
    let finalSample = '';
    const targetWords = tokenizeEnglish(target);

    for (const tw of targetWords) {
      if (/(s|es|ed|t|d|k|p)$/i.test(tw)) {
        const stem = tw.replace(/(s|es|ed|t|d|k|p)+$/i, '');
        if (stem && candWords.includes(stem) && !candWords.includes(tw)) {
          missingFinalDetected = true;
          finalSample = tw;
          break;
        }
      }
    }

    if (missingFinalDetected || (missedWords.length > 0 && /(s|es|ed|t|d|k|p)\b/i.test(missedWords.join(' ')))) {
      advice.push(`Chú ý phát âm rõ âm cuối (ending sounds như /s/, /t/, /d/, -ed)${finalSample ? ` ở từ "${finalSample}"` : ''}, tránh nuốt âm như thói quen tiếng Việt.`);
    } else if (/\b\w+(s|es|ed|t|d|k|p)\b/i.test(lowerTarget)) {
      advice.push("Chú ý phát âm rõ âm cuối (ending sounds như /s/, /t/, /d/), tránh nuốt âm như thói quen tiếng Việt.");
    }

    // 2. Lỗi âm 'th' (/θ/ hoặc /ð/) nhận thành t/d/s/z
    let thMispronounced = false;
    if (/th/i.test(lowerTarget)) {
      for (const tw of targetWords) {
        if (/th/i.test(tw)) {
          const withT = tw.replace(/th/g, 't');
          const withD = tw.replace(/th/g, 'd');
          const withS = tw.replace(/th/g, 's');
          const withZ = tw.replace(/th/g, 'z');
          if (candWords.includes(withT) || candWords.includes(withD) || candWords.includes(withS) || candWords.includes(withZ)) {
            thMispronounced = true;
            break;
          }
        }
      }
      if (thMispronounced || missedWords.some(w => /th/i.test(w))) {
        advice.push("Âm 'th' (/θ/ hoặc /ð/): Đang bị nhận thành t/d/s/z. Hãy kẹp nhẹ đầu lưỡi giữa hai hàm răng và thổi nhẹ luồng hơi, không thay bằng âm /t/ hoặc /d/.");
      } else {
        advice.push("Âm 'th' (/θ/ hoặc /ð/): Đặt đầu lưỡi giữa hai hàm răng và thổi nhẹ luồng hơi, không thay bằng âm /t/ hoặc /d/.");
      }
    }

    // 3. Lỗi âm /ʃ/ ("sh") nhận thành /s/
    let shMispronounced = false;
    if (/(sh|ch)/i.test(lowerTarget)) {
      for (const tw of targetWords) {
        if (/sh/i.test(tw)) {
          const withS = tw.replace(/sh/g, 's');
          if (candWords.includes(withS)) {
            shMispronounced = true;
            break;
          }
        }
      }
      if (shMispronounced || missedWords.some(w => /sh/i.test(w))) {
        advice.push("Âm 'sh' (/ʃ/): Chu tròn môi và bật hơi dứt khoát, phân biệt với âm /s/ nhẹ tiếng Việt.");
      } else {
        advice.push("Âm 'sh' (/ʃ/) và 'ch' (/tʃ/): Chu tròn môi và bật hơi dứt khoát, phân biệt với âm /s/ nhẹ.");
      }
    }

    // 4. Lỗi phân biệt /r/ và /l/
    let rlMispronounced = false;
    if (/\b[rl]\w*/i.test(lowerTarget)) {
      for (const tw of targetWords) {
        if (/^r/i.test(tw)) {
          const withL = tw.replace(/^r/i, 'l');
          if (candWords.includes(withL)) {
            rlMispronounced = true;
            break;
          }
        } else if (/^l/i.test(tw)) {
          const withR = tw.replace(/^l/i, 'r');
          if (candWords.includes(withR)) {
            rlMispronounced = true;
            break;
          }
        }
      }
      if (rlMispronounced || missedWords.some(w => /\b[rl]\w*/i.test(w))) {
        advice.push("Phân biệt âm /r/ và /l/: /r/ cong lưỡi không chạm vòm họng; /l/ chạm đầu lưỡi chắc chắn vào chân răng trên.");
      }
    }

    // 5. Note lỗi của từ trong EN_WORDS
    if (item && item.note) {
      advice.push(`Mẹo từ vựng: ${item.note}`);
    }

    if (missedWords.length > 0) {
      const wordListStr = missedWords.slice(0, 3).join(', ');
      advice.unshift(`Cần chú ý phát âm rõ các từ: "${wordListStr}".`);
    }

    return advice.length > 0 ? advice.join(' ') : "Phát âm tự nhiên, giữ nhịp điệu và nhấn đúng trọng âm câu.";
  }

  /**
   * So khớp tiếng Anh theo từng từ (word-level matching với LCS alignment & contraction expansion).
   */
  function scoreEnglishRecognition(target, transcripts, item = null) {
    if (!target || typeof target !== 'string') {
      return { score: 0, perWord: [], perChar: [], best: '', advice: '' };
    }

    const rawTargetTokens = target.trim().split(/\s+/).filter(Boolean);
    const normTargetTokens = rawTargetTokens.map(tok => tok.replace(/[^\w]/g, '').toLowerCase()).filter(Boolean);
    const expandedTargetWords = tokenizeEnglish(target);

    const defaultPerWord = rawTargetTokens.map(tok => ({
      word: tok,
      ok: false
    }));

    if (!transcripts || !Array.isArray(transcripts) || transcripts.length === 0) {
      return {
        score: 0,
        perWord: defaultPerWord,
        perChar: defaultPerWord.map(w => ({ ch: w.word, ok: false })),
        best: '',
        advice: getEnglishPronunciationAdvice(target, normTargetTokens, '', item)
      };
    }

    let bestResult = {
      score: -1,
      bestCandidateText: '',
      matchedRawIndices: new Set()
    };

    for (const candidate of transcripts) {
      const rawText = typeof candidate === 'string' ? candidate : ((candidate && candidate.transcript) || '');
      const candWords = tokenizeEnglish(rawText);

      const n = expandedTargetWords.length;
      const m = candWords.length;
      if (n === 0) continue;

      const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
          if (expandedTargetWords[i - 1] === candWords[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
          } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
      }

      const matchedT = new Array(n).fill(false);
      let i = n, j = m;
      while (i > 0 && j > 0) {
        if (expandedTargetWords[i - 1] === candWords[j - 1] && dp[i][j] === dp[i - 1][j - 1] + 1) {
          matchedT[i - 1] = true;
          i--;
          j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
          i--;
        } else {
          j--;
        }
      }

      const matchedCount = matchedT.filter(Boolean).length;
      const score = Math.round((matchedCount / n) * 100);

      const matchedRawIndices = new Set();
      if (score === 100) {
        rawTargetTokens.forEach((_, idx) => matchedRawIndices.add(idx));
      } else {
        rawTargetTokens.forEach((rawTok, idx) => {
          const cleanTok = rawTok.replace(/[^\w]/g, '').toLowerCase();
          const expandedTokWords = tokenizeEnglish(cleanTok);
          const allOk = expandedTokWords.every(tw => candWords.includes(tw));
          if (allOk && expandedTokWords.length > 0) {
            matchedRawIndices.add(idx);
          }
        });
      }

      if (score > bestResult.score) {
        bestResult = {
          score,
          bestCandidateText: rawText,
          matchedRawIndices
        };
      }
    }

    if (bestResult.score < 0) {
      bestResult.score = 0;
    }

    const perWord = rawTargetTokens.map((tok, idx) => ({
      word: tok,
      ok: bestResult.matchedRawIndices.has(idx)
    }));

    const perChar = perWord.map(w => ({ ch: w.word, ok: w.ok }));
    const missed = perWord.filter(w => !w.ok).map(w => w.word.replace(/[^\w]/g, ''));
    const advice = getEnglishPronunciationAdvice(target, missed, bestResult.bestCandidateText, item);

    return {
      score: bestResult.score,
      perWord,
      perChar,
      best: bestResult.bestCandidateText,
      advice
    };
  }

  /**
   * So khớp chữ nhận diện giọng nói với chữ đích theo từng chữ (dùng thuật toán LCS alignment).
   * Xét qua toàn bộ các ứng viên alternatives để chọn phương án đạt điểm cao nhất.
   * @param {string} target Chuỗi chữ đích (có thể có dấu câu)
   * @param {Array<string|object>} transcripts Danh sách câu nhận diện từ SpeechRecognition
   * @returns {{ score: number, perChar: Array<{ch: string, ok: boolean}>, best: string }}
   */
  function scoreRecognition(target, transcripts, item = null) {
    if (!target) return { score: 0, perChar: [], best: '' };
    // Nếu target chứa chữ Latinh và không có chữ Hán -> chuyển hướng sang bộ so khớp tiếng Anh
    if (/[a-zA-Z]/.test(target) && !/[\u4e00-\u9fa5]/.test(target)) {
      return scoreEnglishRecognition(target, transcripts, item);
    }
    const normTarget = normalizeHanzi(target);
    if (!normTarget) {
      return { score: 0, perChar: [], best: '' };
    }

    const targetChars = Array.from(normTarget);
    const defaultPerChar = targetChars.map(ch => ({ ch, ok: false }));

    if (!transcripts || !Array.isArray(transcripts) || transcripts.length === 0) {
      return { score: 0, perChar: defaultPerChar, best: '' };
    }

    let bestResult = {
      score: -1,
      perChar: defaultPerChar,
      best: ''
    };

    for (const item of transcripts) {
      const rawText = typeof item === 'string' ? item : ((item && item.transcript) || '');
      const candNorm = normalizeHanzi(rawText);
      const candChars = Array.from(candNorm);

      const n = targetChars.length;
      const m = candChars.length;

      // Tính LCS giữa targetChars và candChars
      const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
          if (targetChars[i - 1] === candChars[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
          } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
      }

      // Truy vết các ký tự của target được so khớp
      const matchedT = new Array(n).fill(false);
      let i = n;
      let j = m;
      while (i > 0 && j > 0) {
        if (targetChars[i - 1] === candChars[j - 1] && dp[i][j] === dp[i - 1][j - 1] + 1) {
          matchedT[i - 1] = true;
          i--;
          j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
          i--;
        } else {
          j--;
        }
      }

      const matchedCount = matchedT.filter(Boolean).length;
      const score = Math.round((matchedCount / n) * 100);
      const perChar = targetChars.map((ch, idx) => ({ ch, ok: matchedT[idx] }));

      // Tiêu chí chọn best: Điểm cao hơn, hoặc bằng điểm nhưng chiều dài gần target hơn
      if (score > bestResult.score) {
        bestResult = { score, perChar, best: rawText };
      } else if (score === bestResult.score && bestResult.best) {
        const prevDiff = Math.abs(normalizeHanzi(bestResult.best).length - n);
        const currDiff = Math.abs(candChars.length - n);
        if (currDiff < prevDiff) {
          bestResult = { score, perChar, best: rawText };
        }
      }
    }

    if (bestResult.score < 0) {
      return { score: 0, perChar: defaultPerChar, best: '' };
    }

    return bestResult;
  }

  /* ==========================================================================
     2. Datasets: Tones, Pairs, Confusing Sounds & Shadowing
     ========================================================================== */

  // Thông tin 4 thanh điệu tiếng Trung kèm mẹo so với dấu tiếng Việt
  const TONE_INFO = [
    {
      tone: 1,
      name: 'Thanh 1 (阴平)',
      pitch: '55',
      symbol: 'ˉ',
      color: 'var(--tone-1, #3b82f6)',
      desc: 'Ngang cao kéo dài',
      tip: 'Âm vực cao nhất (mức 5), giữ đều và phẳng từ đầu tới cuối. Cao hơn thanh ngang tiếng Việt một tông, không hạ giọng ở đuôi.',
      example: 'mā (妈 - mẹ)'
    },
    {
      tone: 2,
      name: 'Thanh 2 (阳平)',
      pitch: '35',
      symbol: 'ˊ',
      color: 'var(--tone-2, #10b981)',
      desc: 'Lên cao (gần dấu sắc)',
      tip: 'Bắt đầu từ mức trung bình (3) vút thẳng lên cao nhất (5). Gần giống dấu sắc tiếng Việt nhưng âm vút mượt mà và dài hơi hơn.',
      example: 'má (麻 - cây gai)'
    },
    {
      tone: 3,
      name: 'Thanh 3 (上声)',
      pitch: '214',
      symbol: 'ˇ',
      color: 'var(--tone-3, #f59e0b)',
      desc: 'Trầm xuống đáy rồi uốn nhẹ lên',
      tip: 'Hạ giọng xuống mức thấp nhất (1) như dấu nặng/hỏi rồi lượn nhẹ lên mức 4. Khi đứng trước thanh khác, chỉ cần đọc nửa đầu (21).',
      example: 'mǎ (马 - con ngựa)'
    },
    {
      tone: 4,
      name: 'Thanh 4 (去声)',
      pitch: '51',
      symbol: 'ˋ',
      color: 'var(--tone-4, #ef4444)',
      desc: 'Rơi mạnh dứt khoát',
      tip: 'Từ đỉnh cao nhất (5) rơi thẳng dứt khoát xuống đáy (1). Phát âm như khi ra lệnh hoặc dứt khoát, KHÔNG đọc kéo dài như dấu huyền.',
      example: 'mà (骂 - mắng mỏ)'
    }
  ];

  // Danh sách các âm tiết luyện thanh đơn (Mức 1)
  const SINGLE_TONE_DRILL = [
    { base: 'ma', hanzi: ['妈', '麻', '马', '骂'], pinyin: ['mā', 'má', 'mǎ', 'mà'], meaning: ['mẹ', 'gai', 'ngựa', 'mắng'] },
    { base: 'ba', hanzi: ['八', '拔', '把', '爸'], pinyin: ['bā', 'bá', 'bǎ', 'bà'], meaning: ['tám', 'nhổ', 'cầm/nắm', 'bố'] },
    { base: 'ta', hanzi: ['他', '塔', '踏', '塌'], pinyin: ['tā', 'tá', 'tǎ', 'tà'], meaning: ['anh ấy', 'tháp (vút)', 'cái tháp', 'giẫm'] },
    { base: 'he', hanzi: ['喝', '河', '何', '贺'], pinyin: ['hē', 'hé', 'hě', 'hè'], meaning: ['uống', 'sông', 'sao/gì', 'chúc mừng'] },
    { base: 'shi', hanzi: ['师', '十', '始', '是'], pinyin: ['shī', 'shí', 'shǐ', 'shì'], meaning: ['thầy', 'mười', 'bắt đầu', 'là/đúng'] },
    { base: 'yi', hanzi: ['一', '姨', '椅', '意'], pinyin: ['yī', 'yí', 'yǐ', 'yì'], meaning: ['một', 'dì/cô', 'cái ghế', 'ý nghĩa'] },
    { base: 'wu', hanzi: ['屋', '无', '五', '物'], pinyin: ['wū', 'wú', 'wǔ', 'wù'], meaning: ['căn nhà', 'không có', 'năm', 'đồ vật'] },
    { base: 'shu', hanzi: ['书', '熟', '数', '树'], pinyin: ['shū', 'shú', 'shǔ', 'shù'], meaning: ['sách', 'chín/quen', 'đếm', 'cái cây'] },
    { base: 'fang', hanzi: ['方', '房', '仿', '放'], pinyin: ['fāng', 'fáng', 'fǎng', 'fàng'], meaning: ['phương hướng', 'căn phòng', 'mô phỏng', 'thả/buông'] },
    { base: 'tong', hanzi: ['通', '同', '统', '痛'], pinyin: ['tōng', 'tóng', 'tǒng', 'tòng'], meaning: ['thông qua', 'cùng nhau', 'thống nhất', 'đau đớn'] }
  ];

  // 16 tổ hợp cặp thanh 2 âm tiết (Mức 2)
  const TONE_PAIRS = [
    { combo: '1-1', t1: 1, t2: 1, words: [
      { zh: '今天', py: 'jīntiān', vi: 'hôm nay' },
      { zh: '飞机', py: 'fēijī', vi: 'máy bay' },
      { zh: '咖啡', py: 'kāfēi', vi: 'cà phê' }
    ]},
    { combo: '1-2', t1: 1, t2: 2, words: [
      { zh: '中国', py: 'zhōngguó', vi: 'Trung Quốc' },
      { zh: '新年', py: 'xīnnián', vi: 'năm mới' },
      { zh: '欢迎', py: 'huānyíng', vi: 'hoan nghênh' }
    ]},
    { combo: '1-3', t1: 1, t2: 3, words: [
      { zh: '机场', py: 'jīchǎng', vi: 'sân bay' },
      { zh: '身体', py: 'shēntǐ', vi: 'sức khỏe / thân thể' },
      { zh: '开始', py: 'kāishǐ', vi: 'bắt đầu' }
    ]},
    { combo: '1-4', t1: 1, t2: 4, words: [
      { zh: '音乐', py: 'yīnyuè', vi: 'âm nhạc' },
      { zh: '生日', py: 'shēngrì', vi: 'sinh nhật' },
      { zh: '希望', py: 'xīwàng', vi: 'hy vọng' }
    ]},
    { combo: '2-1', t1: 2, t2: 1, words: [
      { zh: '明天', py: 'míngtiān', vi: 'ngày mai' },
      { zh: '银行', py: 'yínháng', vi: 'ngân hàng' },
      { zh: '时间', py: 'shíjiān', vi: 'thời gian' }
    ]},
    { combo: '2-2', t1: 2, t2: 2, words: [
      { zh: '学习', py: 'xuéxí', vi: 'học tập' },
      { zh: '民族', py: 'mínzú', vi: 'dân tộc' },
      { zh: '厨房', py: 'chúfáng', vi: 'nhà bếp' }
    ]},
    { combo: '2-3', t1: 2, t2: 3, words: [
      { zh: '苹果', py: 'píngguǒ', vi: 'quả táo' },
      { zh: '游泳', py: 'yóuyǒng', vi: 'bơi lội' },
      { zh: '啤酒', py: 'píjiǔ', vi: 'bia' }
    ]},
    { combo: '2-4', t1: 2, t2: 4, words: [
      { zh: '同学', py: 'tóngxué', vi: 'bạn cùng học' },
      { zh: '决定', py: 'juédìng', vi: 'quyết định' },
      { zh: '容易', py: 'róngyì', vi: 'dễ dàng' }
    ]},
    { combo: '3-1', t1: 3, t2: 1, words: [
      { zh: '首都', py: 'shǒudū', vi: 'thủ đô' },
      { zh: '老师', py: 'lǎoshī', vi: 'thầy cô giáo' },
      { zh: '北京', py: 'běijīng', vi: 'Bắc Kinh' }
    ]},
    { combo: '3-2', t1: 3, t2: 2, words: [
      { zh: '语言', py: 'yǔyán', vi: 'ngôn ngữ' },
      { zh: '旅行', py: 'lǚxíng', vi: 'du lịch' },
      { zh: '简单', py: 'jiǎndān', vi: 'đơn giản' }
    ]},
    { combo: '3-3', t1: 3, t2: 3, words: [
      { zh: '你好', py: 'nǐhǎo', vi: 'xin chào (đọc ní-hǎo)' },
      { zh: '手表', py: 'shǒubiǎo', vi: 'đồng hồ đeo tay' },
      { zh: '雨伞', py: 'yǔsǎn', vi: 'cây dù / ô' }
    ]},
    { combo: '3-4', t1: 3, t2: 4, words: [
      { zh: '以后', py: 'yǐhòu', vi: 'sau này' },
      { zh: '比赛', py: 'bǐsài', vi: 'trận đấu' },
      { zh: '感谢', py: 'gǎnxiè', vi: 'cảm tạ, biết ơn' }
    ]},
    { combo: '4-1', t1: 4, t2: 1, words: [
      { zh: '互相', py: 'hùxiāng', vi: 'lẫn nhau' },
      { zh: '面包', py: 'miànbāo', vi: 'bánh mì' },
      { zh: '电车', py: 'diànchē', vi: 'xe điện' }
    ]},
    { combo: '4-2', t1: 4, t2: 2, words: [
      { zh: '问题', py: 'wèntí', vi: 'câu hỏi / vấn đề' },
      { zh: '毕业', py: 'bìyè', vi: 'tốt nghiệp' },
      { zh: '去年', py: 'qùnián', vi: 'năm ngoái' }
    ]},
    { combo: '4-3', t1: 4, t2: 3, words: [
      { zh: '电脑', py: 'diànnǎo', vi: 'máy tính' },
      { zh: '汉语', py: 'hànyǔ', vi: 'tiếng Hán' },
      { zh: '电影', py: 'diànyǐng', vi: 'bộ phim' }
    ]},
    { combo: '4-4', t1: 4, t2: 4, words: [
      { zh: '再见', py: 'zàijiàn', vi: 'tạm biệt' },
      { zh: '练习', py: 'liànxí', vi: 'luyện tập' },
      { zh: '电话', py: 'diànhuà', vi: 'điện thoại' }
    ]}
  ];

  // 9 nhóm âm dễ nhầm với người Việt kèm hướng dẫn khẩu hình & câu hỏi đối chiếu
  const CONFUSING_GROUPS = [
    {
      id: 'zh-z-j',
      title: 'zh / z / j (Âm tắc sát không bật hơi)',
      tip: '• zh: Uốn đầu lưỡi chạm ngạc cứng rồi bật nhẹ khe hở.\n• z: Đầu lưỡi thẳng ép nhẹ mặt sau răng cửa trên.\n• j: Mặt lưỡi áp sát ngạc cứng (môi hơi bè ngang).',
      items: [
        { target: 'zhī', hanzi: '知 (biết)', options: ['zhī', 'zī', 'jī'], expl: 'zhī: âm uốn cong lưỡi sâu.' },
        { target: 'zī', hanzi: '资 (tư chất)', options: ['zhī', 'zī', 'jī'], expl: 'zī: đầu lưỡi thẳng sát răng trên.' },
        { target: 'jī', hanzi: '鸡 (con gà)', options: ['zhī', 'zī', 'jī'], expl: 'jī: mặt lưỡi áp sát ngạc trên.' },
        { target: 'zhāng', hanzi: '张 (họ Trương)', options: ['zhāng', 'zāng', 'jiāng'], expl: 'zhāng: âm uốn lưỡi quặt sau.' },
        { target: 'zāng', hanzi: '脏 (bẩn)', options: ['zhāng', 'zāng', 'jiāng'], expl: 'zāng: răng khép, đầu lưỡi sát răng.' }
      ]
    },
    {
      id: 'ch-c-q',
      title: 'ch / c / q (Âm tắc sát BẬT HƠI mạnh)',
      tip: '• ch: Uốn đầu lưỡi lên ngạc cứng rồi BẬT MẠNH luồng hơi.\n• c: Đầu lưỡi thẳng sát răng trước rồi BẬT MẠNH hơi ra.\n• q: Mặt lưỡi ép ngạc cứng rồi BẬT MẠNH hơi sắc bén.',
      items: [
        { target: 'chī', hanzi: '吃 (ăn)', options: ['chī', 'cī', 'qī'], expl: 'chī: uốn lưỡi và tống hơi thật mạnh.' },
        { target: 'cī', hanzi: '疵 (tì vết)', options: ['chī', 'cī', 'qī'], expl: 'cī: đầu lưỡi thẳng sát răng cửa, xì bật hơi.' },
        { target: 'qī', hanzi: '七 (số bảy)', options: ['chī', 'cī', 'qī'], expl: 'qī: mặt lưỡi áp ngạc cứng, xì bật hơi cao.' },
        { target: 'chūn', hanzi: '春 (mùa xuân)', options: ['chūn', 'cūn', 'qūn'], expl: 'chūn: uốn lưỡi tròn môi bật hơi.' },
        { target: 'cài', hanzi: '菜 (món ăn/rau)', options: ['chài', 'cài', 'qì'], expl: 'cài: đầu lưỡi thẳng sát răng bật hơi dứt khoát.' }
      ]
    },
    {
      id: 'sh-s-x',
      title: 'sh / s / x (Âm xát)',
      tip: '• sh: Uốn lưỡi chạm nhẹ ngạc cứng, luồng hơi xát qua khe uốn lưỡi.\n• s: Đầu lưỡi thẳng hướng về kẽ răng trước, xì nhẹ như "x" tiếng Việt.\n• x: Mặt lưỡi nâng cao sát ngạc cứng, luồng hơi xát sắc nét.',
      items: [
        { target: 'shī', hanzi: '师 (thầy)', options: ['shī', 'sī', 'xī'], expl: 'shī: âm uốn cong đầu lưỡi.' },
        { target: 'sī', hanzi: '思 (suy nghĩ)', options: ['shī', 'sī', 'xī'], expl: 'sī: răng cắn hờ, hơi xì qua đầu lưỡi.' },
        { target: 'xī', hanzi: '西 (hướng tây)', options: ['shī', 'sī', 'xī'], expl: 'xī: mặt lưỡi bè sát ngạc cứng.' },
        { target: 'shān', hanzi: '山 (ngọn núi)', options: ['shān', 'sān', 'xiān'], expl: 'shān: quặt đầu lưỡi lên cao.' },
        { target: 'sān', hanzi: '三 (số ba)', options: ['shān', 'sān', 'xiān'], expl: 'sān: đầu lưỡi thẳng sát răng trước.' }
      ]
    },
    {
      id: 'r-l',
      title: 'r / l (Âm cuốn lưỡi rung vs Âm bên)',
      tip: '• r: Uốn cong lưỡi lên vòm họng nhưng không chạm hẳn, dây thanh rung nhẹ trong cổ.\n• l: Đầu lưỡi chạm chặt lợi trên, luồng hơi thoát đều qua 2 bên cạnh lưỡi.',
      items: [
        { target: 'rè', hanzi: '热 (nóng)', options: ['rè', 'lè'], expl: 'rè: cuốn lưỡi sâu, rung nhẹ họng.' },
        { target: 'lè', hanzi: '乐 (vui vẻ)', options: ['rè', 'lè'], expl: 'lè: đầu lưỡi gõ nhẹ vào chân răng trên.' },
        { target: 'rén', hanzi: '人 (con người)', options: ['rén', 'lén'], expl: 'rén: âm cuốn họng, không lẫn với l.' },
        { target: 'ròu', hanzi: '肉 (thịt)', options: ['ròu', 'lòu'], expl: 'ròu: cuốn lưỡi phát âm tròn ấm.' }
      ]
    },
    {
      id: 'u-u_dots',
      title: 'ü / u (Nguyên âm tròn môi trước vs sau)',
      tip: '• ü: Tròn môi nhọn miệng chu ra phía trước, đầu lưỡi giữ chạm răng dưới, giữ nguyên hình môi suốt âm.\n• u: Tròn môi mở rộng hơn về phía sau cổ họng (như "u" tiếng Việt).',
      items: [
        { target: 'lǜ', hanzi: '绿 (màu xanh lá)', options: ['lǜ', 'lù'], expl: 'lǜ: môi chu nhỏ nhọn, giữ chặt hình môi.' },
        { target: 'lù', hanzi: '路 (con đường)', options: ['lǜ', 'lù'], expl: 'lù: âm u tự nhiên trong khoang miệng.' },
        { target: 'nǚ', hanzi: '女 (phụ nữ)', options: ['nǚ', 'nǔ'], expl: 'nǚ: môi nhọn, âm cao thanh thoát.' },
        { target: 'yǔ', hanzi: '雨 (cơn mưa)', options: ['yǔ', 'wǔ'], expl: 'yǔ: bản chất là âm ü mang thanh 3.' }
      ]
    },
    {
      id: 'an-ang',
      title: 'an / ang (Vần mũi trước vs sau)',
      tip: '• an: Vần mũi trước, kết thúc bằng đầu lưỡi chạm vào lợi răng trên (n).\n• ang: Vần mũi sau, mở rộng miệng, gốc lưỡi nâng lên chạm ngạc mềm (ng).',
      items: [
        { target: 'bān', hanzi: '班 (lớp học)', options: ['bān', 'bāng'], expl: 'bān: kết thúc bằng đầu lưỡi khép vào răng trên.' },
        { target: 'bāng', hanzi: '帮 (giúp đỡ)', options: ['bān', 'bāng'], expl: 'bāng: mở họng ngân vang ra mũi.' },
        { target: 'fàn', hanzi: '饭 (cơm)', options: ['fàn', 'fàng'], expl: 'fàn: âm mũi trước gọn ghẽ.' },
        { target: 'fàng', hanzi: '放 (buông thả)', options: ['fàn', 'fàng'], expl: 'fàng: âm mũi sau ngân sâu.' }
      ]
    },
    {
      id: 'en-eng',
      title: 'en / eng (Vần mũi trước vs sau)',
      tip: '• en: Kết thúc tại răng trên (n), âm gọn và nhẹ.\n• eng: Cuống lưỡi co lại nâng lên ngạc mềm, âm trầm vang ngân sâu ở cuống họng.',
      items: [
        { target: 'bēn', hanzi: '奔 (chạy nhanh)', options: ['bēn', 'bēng'], expl: 'bēn: đầu lưỡi chặn ở lợi răng trên.' },
        { target: 'bēng', hanzi: '崩 (sụp đổ)', options: ['bēn', 'bēng'], expl: 'bēng: âm ng cuống họng ngân sâu.' },
        { target: 'fēn', hanzi: '分 (chia/phút)', options: ['fēn', 'fēng'], expl: 'fēn: kết thúc nhẹ ở n.' },
        { target: 'fēng', hanzi: '风 (ngọn gió)', options: ['fēn', 'fēng'], expl: 'fēng: mở rộng vòm sau ngân vang.' }
      ]
    },
    {
      id: 'in-ing',
      title: 'in / ing (Vần mũi trước vs sau)',
      tip: '• in: Đầu lưỡi khép lên lợi trên (giống "in" tiếng Việt).\n• ing: Vòm họng mở, gốc lưỡi nâng lên ngạc mềm, vang ngân dài ra khoang mũi.',
      items: [
        { target: 'xīn', hanzi: '心 (trái tim)', options: ['xīn', 'xīng'], expl: 'xīn: khép nhẹ đầu lưỡi ở hàm trên.' },
        { target: 'xīng', hanzi: '星 (ngôi sao)', options: ['xīn', 'xīng'], expl: 'xīng: âm ng ngân dài thanh thoát.' },
        { target: 'jìn', hanzi: '进 (tiến vào)', options: ['jìn', 'jìng'], expl: 'jìn: kết thúc gọn ở vòm trước.' },
        { target: 'jìng', hanzi: '静 (yên tĩnh)', options: ['jìn', 'jìng'], expl: 'jìng: âm ngân vang cuống họng.' }
      ]
    },
    {
      id: 'aspiration',
      title: 'Bật hơi vs Không bật hơi (b-p, d-t, g-k)',
      tip: '• b / d / g: Không bật hơi (nghe gần giống p nhẹ, t nhẹ, c/k Việt).\n• p / t / k: BẬT HƠI MẠNH MẼ (thổi tắt ngọn nến phía trước miệng).',
      items: [
        { target: 'bā', hanzi: '八 (số tám)', options: ['bā', 'pā'], expl: 'bā: mím môi mở nhẹ, không tống hơi.' },
        { target: 'pā', hanzi: '趴 (nằm sấp)', options: ['bā', 'pā'], expl: 'pā: nén khí mím môi rồi bật mạnh luồng gió.' },
        { target: 'dà', hanzi: '大 (to lớn)', options: ['dà', 'tà'], expl: 'dà: đầu lưỡi đập nhẹ, không có luồng hơi.' },
        { target: 'tà', hanzi: '踏 (giẫm đạp)', options: ['dà', 'tà'], expl: 'tà: đầu lưỡi bật mạnh luồng khí ra ngoài.' },
        { target: 'gē', hanzi: '哥 (anh trai)', options: ['gē', 'kē'], expl: 'gē: cuống lưỡi chạm ngạc mềm, không bật hơi.' },
        { target: 'kē', hanzi: '棵 (cây)', options: ['gē', 'kē'], expl: 'kē: cuống họng tống luồng khí mạnh mẽ.' }
      ]
    }
  ];

  // Dữ liệu câu luyện đọc theo mẫu dự phòng khi chưa tải được vocab
  const DEFAULT_SHADOWING_WORDS = [
    { zh: '你好', py: 'nǐ hǎo', vi: 'Xin chào' },
    { zh: '谢谢你', py: 'xièxie nǐ', vi: 'Cảm ơn bạn' },
    { zh: '再见', py: 'zàijiàn', vi: 'Tạm biệt' },
    { zh: '对不起', py: 'duìbuqǐ', vi: 'Xin lỗi' },
    { zh: '没关系', py: 'méi guānxi', vi: 'Không có sao' },
    { zh: '我是学生', py: 'wǒ shì xuésheng', vi: 'Tôi là học sinh' },
    { zh: '很高兴认识你', py: 'hěn gāoxìng rènshi nǐ', vi: 'Rất vui được quen biết bạn' },
    { zh: '你叫什么名字', py: 'nǐ jiào shénme míngzi', vi: 'Bạn tên là gì?' },
    { zh: '我想喝茶', py: 'wǒ xiǎng hē chá', vi: 'Tôi muốn uống trà' },
    { zh: '今天天气很好', py: 'jīntiān tiānqì hěn hǎo', vi: 'Hôm nay thời tiết rất đẹp' },
    { zh: '你在做什么', py: 'nǐ zài zuò shénme', vi: 'Bạn đang làm gì thế?' },
    { zh: '这个多少钱', py: 'zhège duōshao qián', vi: 'Cái này bao nhiêu tiền?' }
  ];

  const DEFAULT_EN_SHADOWING_WORDS = [
    { en: 'hello', ipa: '/həˈloʊ/', vi: 'xin chào', ex: { en: 'Hello, how are you today?', vi: 'Xin chào, hôm nay bạn thế nào?' }, note: 'Nhấn trọng âm vào âm tiết thứ hai /loʊ/.' },
    { en: 'morning', ipa: '/ˈmɔːrnɪŋ/', vi: 'buổi sáng', ex: { en: 'Good morning, have a nice day!', vi: 'Chào buổi sáng, chúc bạn ngày mới tốt lành!' }, note: 'Nhấn trọng âm vào âm tiết thứ nhất /mɔːr/.' },
    { en: 'thank you', ipa: '/ˈθæŋk juː/', vi: 'cảm ơn bạn', ex: { en: 'Thank you very much for your help.', vi: 'Cảm ơn bạn rất nhiều vì đã giúp đỡ.' }, note: 'Âm "th" kẹp lưỡi giữa hai hàm răng và thổi hơi nhẹ.' },
    { en: 'beautiful', ipa: '/ˈbjuːtɪfl/', vi: 'xinh đẹp', ex: { en: 'She is a beautiful girl.', vi: 'Cô ấy là một cô gái xinh đẹp.' }, note: 'Nhấn trọng âm vào âm tiết thứ nhất /bjuː/.' },
    { en: 'tomorrow', ipa: '/təˈmɑːroʊ/', vi: 'ngày mai', ex: { en: 'See you again tomorrow.', vi: 'Hẹn gặp lại bạn vào ngày mai.' }, note: 'Nhấn trọng âm vào âm tiết thứ hai /mɑː/.' }
  ];

  function getEnPhonics() {
    if (typeof window !== 'undefined' && window.EN_PHONICS) return window.EN_PHONICS;
    if (typeof global !== 'undefined' && global.window && global.window.EN_PHONICS) return global.window.EN_PHONICS;
    try {
      require('./data/en/phonics.js');
      return (typeof window !== 'undefined' ? window.EN_PHONICS : global.window.EN_PHONICS) || null;
    } catch (e) {
      return null;
    }
  }

  function getEnWords() {
    if (typeof window !== 'undefined' && window.EN_WORDS) return window.EN_WORDS;
    if (typeof global !== 'undefined' && global.window && global.window.EN_WORDS) return global.window.EN_WORDS;
    try {
      require('./data/en/words-a.js');
      require('./data/en/words-b.js');
      return (typeof window !== 'undefined' ? window.EN_WORDS : global.window.EN_WORDS) || {};
    } catch (e) {
      return {};
    }
  }

  /* ==========================================================================
     3. Audio & Speech Utilities (TTS + Recognition + MediaRecorder)
     ========================================================================== */

  const AudioService = {
    speechRate: 0.8,
    cachedVoices: null,

    getVoice(langCode = 'zh-CN') {
      if (!('speechSynthesis' in window)) return null;
      const voices = window.speechSynthesis.getVoices() || [];
      const clean = langCode.toLowerCase().replace('_', '-');
      const prefix = clean.split('-')[0];
      return voices.find(v => (v.lang || '').toLowerCase().replace('_', '-') === clean) ||
             voices.find(v => (v.lang || '').toLowerCase().startsWith(prefix)) ||
             null;
    },

    getChineseVoice() {
      return this.getVoice('zh-CN');
    },

    speak(text, rate = null, onEnd = null, langCode = null) {
      if (!('speechSynthesis' in window)) {
        console.warn('speechSynthesis không được hỗ trợ trên trình duyệt này.');
        if (onEnd) onEnd();
        return;
      }

      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const code = langCode || (SpeakPractice.lang === 'en' ? 'en-US' : 'zh-CN');
        utterance.lang = code;
        utterance.rate = rate !== null ? rate : this.speechRate;

        const voice = this.getVoice(code);
        if (voice) {
          utterance.voice = voice;
        }

        if (onEnd) {
          utterance.onend = onEnd;
          utterance.onerror = onEnd;
        }

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('Lỗi phát âm TTS:', err);
        if (onEnd) onEnd();
      }
    }
  };

  // Nạp danh sách voices nếu trình duyệt tải trễ
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      AudioService.cachedVoices = window.speechSynthesis.getVoices();
    };
  }

  /* ==========================================================================
     4. SpeakPractice Main Module (State, Mounting, Views)
     ========================================================================== */

  const SpeakPractice = {
    container: null,
    lang: 'zh',
    currentTab: 'tone', // 'tone' | 'shadow' | 'confusing'

    // Trạng thái Chế độ 1: Luyện thanh (tiếng Trung)
    toneState: {
      level: 1, // 1: âm đơn, 2: cặp thanh 16 tổ hợp
      singleIndex: 0,
      targetTone: 1,
      targetSyllable: null,
      pairIndex: 0,
      targetPair: null,
      targetPairWord: null,
      selectedTone1: null,
      selectedTone2: null,
      answered: false,
      isCorrect: false,
      stats: { correct: 0, total: 0 }
    },

    // Trạng thái Chế độ 1 cho tiếng Anh: Nhấn trọng âm
    enStressState: {
      questions: [],
      currentIndex: 0,
      answered: false,
      selectedSyl: null,
      isCorrect: false,
      stats: { correct: 0, total: 0 }
    },

    // Trạng thái Chế độ 2: Đọc theo (Shadowing)
    shadowState: {
      items: [],
      currentIndex: 0,
      roundSize: 10,
      history: [],
      isRecording: false,
      recognitionSupported: true,
      useMediaRecorderFallback: false,
      recordedBlobUrl: null,
      mediaRecorder: null,
      audioChunks: [],
      recognition: null,
      lastResult: null, // { score, perChar, best }
      speechRate: 0.8,
      targetType: 'word', // 'word' | 'sentence'
      dictationMode: false,
      dictationInput: ''
    },

    // Trạng thái Chế độ 3: Âm dễ nhầm (tiếng Trung)
    confusingState: {
      groupFilter: 'all', // hoặc id nhóm
      currentIndex: 0,
      questions: [],
      answered: false,
      selectedOption: null,
      isCorrect: false,
      stats: { correct: 0, total: 0 }
    },

    // Trạng thái Chế độ 3 cho tiếng Anh: Cặp âm tối thiểu & đuôi -s/-es, -ed
    enConfusingState: {
      category: 'all', // 'all' | 'minimal' | 'final_s' | 'final_ed'
      questions: [],
      currentIndex: 0,
      answered: false,
      selectedOption: null,
      isCorrect: false,
      stats: { correct: 0, total: 0 }
    },

    /**
     * Khởi tạo và gắn giao diện vào một phần tử DOM container bất kỳ
     */
    mount(containerEl, lang = null) {
      if (!containerEl) {
        console.error('SpeakPractice.mount: containerEl không hợp lệ.');
        return;
      }
      this.container = containerEl;
      this.lang = lang || (window.app && window.app.currentLang) || 'zh';
      this.initDatasets();
      this.render();
      this.bindGlobalEvents();
      this.checkSpeechRecognitionSupport();
    },

    /**
     * Được gọi khi tab Luyện phát âm được hiển thị
     */
    onShow(params, lang) {
      if (!this.container) return;
      const prevLang = this.lang;
      this.lang = lang || (window.app && window.app.currentLang) || 'zh';
      if (prevLang !== this.lang || !this.shadowState.items || this.shadowState.items.length === 0) {
        this.initDatasets();
        this.render();
      }
      if (this.lang === 'en') {
        if (this.currentTab === 'tone' && (!this.enStressState.questions || this.enStressState.questions.length === 0)) {
          this.initEnStressQuestions();
        } else if (this.currentTab === 'confusing' && (!this.enConfusingState.questions || this.enConfusingState.questions.length === 0)) {
          this.initEnConfusingQuestions();
        }
      } else {
        if (this.currentTab === 'tone' && !this.toneState.targetSyllable) {
          this.newToneQuestion();
        } else if (this.currentTab === 'confusing' && this.confusingState.questions.length === 0) {
          this.initConfusingQuestions();
        }
      }
    },

    /**
     * Được gọi khi rời tab Luyện phát âm (dừng đọc, dừng ghi âm)
     */
    onHide() {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (this.shadowState && this.shadowState.recognition && this.shadowState.isRecording) {
        try { this.shadowState.recognition.stop(); } catch (e) {}
        this.shadowState.isRecording = false;
      }
      if (this.shadowState && this.shadowState.mediaRecorder && this.shadowState.isRecording) {
        try { this.shadowState.mediaRecorder.stop(); } catch (e) {}
        this.shadowState.isRecording = false;
      }
    },

    initDatasets() {
      let wordList = [];
      if (this.lang === 'en') {
        const enWordsMap = getEnWords();
        const enWords = Object.values(enWordsMap);
        if (enWords.length > 0) {
          wordList = enWords.map(w => ({
            zh: w.word,
            py: w.ipa || '',
            vi: w.vi || '',
            en: w.word,
            ipa: w.ipa || '',
            ex: w.ex,
            note: w.note
          }));
        } else {
          wordList = DEFAULT_EN_SHADOWING_WORDS.map(w => ({
            zh: w.en,
            py: w.ipa,
            vi: w.vi,
            en: w.en,
            ipa: w.ipa,
            ex: w.ex,
            note: w.note
          }));
        }
        this.shadowState.items = wordList;
        this.initEnStressQuestions();
        this.initEnConfusingQuestions();
      } else {
        if (window.HSK1_WORDS && typeof window.HSK1_WORDS === 'object') {
          wordList = Object.keys(window.HSK1_WORDS).map(k => {
            const item = window.HSK1_WORDS[k];
            return {
              zh: k,
              py: item.py || '',
              vi: item.vi || '',
              ex: item.ex
            };
          });
        } else if (window.VOCAB && Array.isArray(window.VOCAB)) {
          wordList = window.VOCAB.map(v => ({
            zh: v.hanzi,
            py: v.pinyin,
            vi: v.vi,
            ex: v.ex
          }));
        }

        if (wordList.length === 0) {
          wordList = DEFAULT_SHADOWING_WORDS.slice();
        }

        this.shadowState.items = wordList;
        this.newToneQuestion();
        this.initConfusingQuestions();
      }
    },

    checkSpeechRecognitionSupport() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        this.shadowState.recognitionSupported = false;
        this.shadowState.useMediaRecorderFallback = true;
      }
    },

    // ------------------------------------------------------------------------
    // RENDER MAIN SKELETON
    // ------------------------------------------------------------------------
    render() {
      const isEn = this.lang === 'en';
      const mainTitle = (ic('mic') ? ic('mic') + ' ' : '') + (isEn ? 'Luyện Phát Âm Tiếng Anh' : 'Luyện Phát Âm Tiếng Trung');
      const subTitle = isEn
        ? 'Luyện trọng âm từ chuẩn xác, đọc theo nhận diện giọng nói AI và phân biệt các cặp âm dễ nhầm'
        : 'Luyện thanh điệu chuẩn xác, đọc theo nhận diện giọng nói AI và phân biệt các cặp âm dễ nhầm';
      const badgeText = isEn ? 'Chuẩn en-US' : 'Chuẩn zh-CN';
      const tab1Title = isEn ? '1. Nhấn Trọng Âm' : '1. Luyện Thanh Điệu';
      const tab2Title = isEn ? '2. Đọc Theo (AI Nhận Diện)' : '2. Đọc Theo (AI Nhận Diện)';
      const tab3Title = isEn ? '3. Âm Dễ Nhầm & Đuôi' : '3. Âm Dễ Nhầm (Việt - Trung)';

      this.container.innerHTML = `
        <div class="speak-app-wrapper ${isEn ? 'speak-english-theme' : ''}">
          <!-- Header Bar -->
          <header class="speak-header">
            <div class="speak-header-title">
              <h2 class="speak-main-title">${mainTitle}</h2>
              <p class="speak-sub-title">${subTitle}</p>
            </div>
            <div class="speak-header-badge">
              <span class="badge-accent">${badgeText}</span>
            </div>
          </header>

          <!-- Navigation Sub-tabs -->
          <nav class="speak-nav-tabs" role="tablist">
            <button class="speak-tab-btn ${this.currentTab === 'tone' ? 'active' : ''}" data-tab="tone" role="tab">
              <span class="tab-icon">${ic('target')}</span>
              <span class="tab-text">${tab1Title}</span>
            </button>
            <button class="speak-tab-btn ${this.currentTab === 'shadow' ? 'active' : ''}" data-tab="shadow" role="tab">
              <span class="tab-icon">${ic('mic')}</span>
              <span class="tab-text">${tab2Title}</span>
            </button>
            <button class="speak-tab-btn ${this.currentTab === 'confusing' ? 'active' : ''}" data-tab="confusing" role="tab">
              <span class="tab-icon">${ic('headphones')}</span>
              <span class="tab-text">${tab3Title}</span>
            </button>
          </nav>

          <!-- Main View Pane -->
          <main class="speak-pane-content" id="speak-pane-container">
            ${this.renderActiveTabContent()}
          </main>
        </div>
      `;

      this.bindTabEvents();
    },

    renderActiveTabContent() {
      if (this.currentTab === 'tone') {
        return this.lang === 'en' ? this.renderStressTab() : this.renderToneTab();
      }
      if (this.currentTab === 'shadow') return this.renderShadowTab();
      if (this.currentTab === 'confusing') {
        return this.lang === 'en' ? this.renderEnConfusingTab() : this.renderConfusingTab();
      }
      return '';
    },

    bindTabEvents() {
      const tabs = this.container.querySelectorAll('.speak-tab-btn');
      tabs.forEach(btn => {
        btn.addEventListener('click', () => {
          const tabKey = btn.getAttribute('data-tab');
          if (tabKey !== this.currentTab) {
            this.currentTab = tabKey;
            tabs.forEach(b => b.classList.toggle('active', b === btn));
            const pane = this.container.querySelector('#speak-pane-container');
            if (pane) {
              pane.innerHTML = this.renderActiveTabContent();
              this.bindPaneEvents();
            }
          }
        });
      });
      this.bindPaneEvents();
    },

    bindPaneEvents() {
      if (this.currentTab === 'tone') {
        if (this.lang === 'en') this.bindStressEvents();
        else this.bindToneEvents();
      } else if (this.currentTab === 'shadow') {
        this.bindShadowEvents();
      } else if (this.currentTab === 'confusing') {
        if (this.lang === 'en') this.bindEnConfusingEvents();
        else this.bindConfusingEvents();
      }
    },

    bindGlobalEvents() {
      // Phím tắt bàn phím tiện ích
      window.addEventListener('keydown', (e) => {
        // Nếu người dùng không nhập văn bản trong ô input khác
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
        if (e.key === ' ' && this.currentTab === 'tone') {
          // Phím Space để phát âm mẫu
          e.preventDefault();
          if (this.lang === 'en') {
            this.playCurrentStressAudio();
          } else {
            this.playCurrentToneAudio();
          }
        }
      });
    },

    // ------------------------------------------------------------------------
    // TAB 1 (TIẾNG ANH): NHẤN TRỌNG ÂM (WORD STRESS DRILL)
    // ------------------------------------------------------------------------
    initEnStressQuestions() {
      const s = this.enStressState;
      const enWordsMap = getEnWords();
      const allWords = Object.values(enWordsMap);
      const candidates = allWords.filter(w => w.ipa && w.ipa.includes('ˈ'));
      const pool = candidates.length > 0 ? candidates : DEFAULT_EN_SHADOWING_WORDS;

      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);

      s.questions = selected.map(w => {
        const syls = splitEnglishWordSyllables(w.word || w.en);
        const correctStress = getStressSyllableFromIpa(w.ipa);
        return {
          word: w.word || w.en,
          ipa: w.ipa || '',
          vi: w.vi || '',
          note: w.note || '',
          syllables: syls,
          correctStress: correctStress > syls.length ? syls.length : correctStress
        };
      });

      s.currentIndex = 0;
      s.answered = false;
      s.selectedSyl = null;
      s.isCorrect = false;
      s.stats = { correct: 0, total: 0 };
    },

    playCurrentStressAudio(rate = 0.8) {
      const s = this.enStressState;
      const cur = s.questions[s.currentIndex];
      if (cur) AudioService.speak(cur.word, rate, null, 'en-US');
    },

    renderStressTab() {
      const s = this.enStressState;
      if (!s.questions || s.questions.length === 0) {
        this.initEnStressQuestions();
      }
      if (s.currentIndex >= s.questions.length) {
        return this.renderEnStressSummary();
      }

      const cur = s.questions[s.currentIndex];
      const phonics = getEnPhonics();
      const rules = (phonics && phonics.stress && phonics.stress.wordStressRules) || [];

      return `
        <div class="speak-tone-section speak-english-theme">
          <div class="speak-pitch-card">
            <div class="card-header-row">
              <div class="card-header-title">
                <span class="icon">${ic('trending-up')}</span>
                <strong>4 Quy Tắc Nhấn Trọng Âm Cốt Lõi (Word Stress) Cho Người Việt</strong>
              </div>
            </div>
            <div class="stress-rules-grid">
              ${rules.slice(0, 4).map((r, idx) => `
                <div class="stress-rule-card">
                  <div class="rule-badge">Quy tắc ${idx + 1}</div>
                  <div class="rule-text"><strong>${r.rule}</strong></div>
                  <div class="rule-examples">
                    ${(r.examples || []).slice(0, 3).map(ex => `<span class="rule-ex-tag">${ex.word} <small>${ex.ipa}</small></span>`).join(' ')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="speak-practice-card">
            <div class="level-switcher-bar">
              <span class="switcher-label">Luyện Nhấn Trọng Âm (10 câu / lượt):</span>
              <span class="question-tracker">Câu ${s.currentIndex + 1} / ${s.questions.length}</span>
              <div class="score-badge">Đúng: <strong>${s.stats.correct}</strong> / ${s.questions.length}</div>
            </div>

            <div class="tone-quiz-box">
              <div class="quiz-prompt-center">
                <span class="quiz-sub-hint">Nghe từ và bấm chọn âm tiết được nhấn trọng âm chính:</span>
                <div class="audio-action-center">
                  <button type="button" class="btn-play-audio-large" id="btn-play-stress" title="Nghe phát âm chuẩn (Phím Space)">
                    <span class="audio-wave-anim">${ic('volume')}</span>
                    <span>Nghe Phát Âm</span>
                  </button>
                  <button type="button" class="btn-secondary" id="btn-play-stress-slow" title="Nghe với tốc độ chậm">
                    <span>${ic('speaker-slow')} Chậm</span>
                  </button>
                </div>
              </div>

              <div class="stress-display-target">
                <h3 class="stress-target-word">${cur.word}</h3>
                <p class="stress-target-meaning">"${cur.vi}"</p>
              </div>

              <div class="stress-syllable-buttons-grid">
                ${cur.syllables.map((syl, i) => {
                  const sylNum = i + 1;
                  const isStressedChoice = sylNum === cur.correctStress;
                  let btnClass = 'stress-syllable-btn';
                  if (s.answered) {
                    if (isStressedChoice) btnClass += ' correct';
                    else if (sylNum === s.selectedSyl) btnClass += ' wrong';
                    else btnClass += ' disabled';
                  }
                  const formattedPreview = formatWordWithStress(cur.syllables, sylNum);
                  return `
                    <button type="button" class="${btnClass}" data-syl="${sylNum}" ${s.answered ? 'disabled' : ''}>
                      <span class="syl-pill-index">Âm tiết ${sylNum}</span>
                      <strong class="syl-pill-text">${formattedPreview}</strong>
                    </button>
                  `;
                }).join('')}
              </div>

              ${s.answered ? `
                <div class="quiz-feedback-card ${s.isCorrect ? 'correct' : 'wrong'}">
                  <div class="feedback-msg">
                    ${s.isCorrect
                      ? `${ic('check-circle')} <strong>Chính xác!</strong> Trọng âm nhấn vào âm tiết ${cur.correctStress}: <strong>${formatWordWithStress(cur.syllables, cur.correctStress)}</strong>`
                      : `${ic('x')} <strong>Chưa chính xác!</strong> Đáp án đúng là âm tiết ${cur.correctStress}: <strong>${formatWordWithStress(cur.syllables, cur.correctStress)}</strong> (bạn chọn âm tiết ${s.selectedSyl}: ${formatWordWithStress(cur.syllables, s.selectedSyl)})`}
                  </div>
                  <div class="feedback-detail">
                    Phiên âm chuẩn: <strong class="target-ipa">${cur.ipa}</strong> &mdash; Nghĩa: <em>${cur.vi}</em>
                  </div>
                  ${cur.note ? `
                    <div class="stress-feedback-note">
                      ${ic('lightbulb')} <strong>Mẹo phát âm:</strong> ${cur.note}
                    </div>
                  ` : ''}
                  <div class="feedback-actions">
                    <button type="button" class="btn-secondary" id="btn-replay-feedback-stress">${ic('volume')} Nghe lại từ này</button>
                    <button type="button" class="btn-primary" id="btn-next-stress">
                      ${s.currentIndex + 1 >= s.questions.length ? 'Xem kết quả lượt &rarr;' : 'Câu tiếp theo &rarr;'}
                    </button>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    },

    renderEnStressSummary() {
      const s = this.enStressState;
      const total = s.questions.length;
      const correct = s.stats.correct;
      const percent = Math.round((correct / (total || 1)) * 100);
      const isPassed = percent >= 70;

      return `
        <div class="shadow-summary-card speak-english-theme">
          <div class="summary-header">
            <div class="summary-icon">${isPassed ? ic('trophy') : ic('target')}</div>
            <h3 class="summary-title">${isPassed ? 'Xuất Sắc! Hoàn Thành Lượt Nhấn Trọng Âm' : 'Hoàn Thành Lượt Luyện Tập!'}</h3>
            <p class="summary-sub">${isPassed ? 'Bạn có khả năng nhận biết trọng âm chuẩn quốc tế rất tốt.' : 'Hãy nghe kĩ cao độ và độ dài âm để nhận biết trọng âm tốt hơn.'}</p>
          </div>

          <div class="summary-stats-grid">
            <div class="stat-box">
              <span class="stat-value">${correct} / ${total}</span>
              <span class="stat-name">Số câu đúng</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">${percent}%</span>
              <span class="stat-name">Tỷ lệ chính xác</span>
            </div>
          </div>

          <div class="summary-actions">
            <button type="button" class="btn-primary" id="btn-restart-stress">
              ${ic('refresh')} Luyện lượt mới (10 từ khác)
            </button>
          </div>
        </div>
      `;
    },

    bindStressEvents() {
      const s = this.enStressState;

      const btnPlay = this.container.querySelector('#btn-play-stress');
      if (btnPlay) {
        btnPlay.onclick = () => this.playCurrentStressAudio(0.8);
      }

      const btnPlaySlow = this.container.querySelector('#btn-play-stress-slow');
      if (btnPlaySlow) {
        btnPlaySlow.onclick = () => this.playCurrentStressAudio(0.5);
      }

      const btnReplay = this.container.querySelector('#btn-replay-feedback-stress');
      if (btnReplay) {
        btnReplay.onclick = () => this.playCurrentStressAudio(0.8);
      }

      const sylBtns = this.container.querySelectorAll('.stress-syllable-btn');
      sylBtns.forEach(btn => {
        btn.onclick = () => {
          if (s.answered) return;
          const sylNum = parseInt(btn.getAttribute('data-syl'), 10);
          const cur = s.questions[s.currentIndex];
          if (!cur) return;

          s.answered = true;
          s.selectedSyl = sylNum;
          s.isCorrect = sylNum === cur.correctStress;
          s.stats.total++;
          if (s.isCorrect) {
            s.stats.correct++;
            if (window.Economy && typeof window.Economy.reward === 'function') {
              window.Economy.reward('speakPass');
            }
          }
          this.refreshPane();
        };
      });

      const btnNext = this.container.querySelector('#btn-next-stress');
      if (btnNext) {
        btnNext.onclick = () => {
          s.currentIndex++;
          s.answered = false;
          s.selectedSyl = null;
          s.isCorrect = false;
          this.refreshPane();
        };
      }

      const btnRestart = this.container.querySelector('#btn-restart-stress');
      if (btnRestart) {
        btnRestart.onclick = () => {
          this.initEnStressQuestions();
          this.refreshPane();
        };
      }
    },

    // ------------------------------------------------------------------------
    // TAB 1: LUYỆN THANH ĐIỆU (TONE DRILL & PITCH SVG)
    // ------------------------------------------------------------------------
    renderToneTab() {
      const s = this.toneState;
      const isLevel1 = s.level === 1;

      return `
        <div class="speak-tone-section">
          <!-- Sơ đồ đường cao độ 5 mức SVG -->
          <div class="speak-pitch-card">
            <div class="card-header-row">
              <div class="card-header-title">
                <span class="icon">${ic('trending-up')}</span>
                <strong>Sơ Đồ Cao Độ 5 Mức (五度标记法) & Mẹo So Với Tiếng Việt</strong>
              </div>
            </div>
            <div class="pitch-svg-wrapper">
              ${this.generatePitchSvg(isLevel1 ? s.targetTone : null)}
            </div>
            <div class="pitch-tips-grid">
              ${TONE_INFO.map(t => `
                <div class="pitch-tip-item ${isLevel1 && s.targetTone === t.tone ? 'highlight' : ''}" style="--tip-tone-color: ${t.color};">
                  <div class="tip-top">
                    <span class="tip-badge">${t.name.replace(/\(([^)]+)\)/, '(<span class="tip-hanzi" style="white-space:nowrap;">$1</span>)')}</span>
                    <span class="tip-pitch">Cao độ: <strong>${t.pitch}</strong></span>
                  </div>
                  <div class="tip-desc"><strong>${t.desc}</strong></div>
                  <div class="tip-body">${t.tip}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Khu vực thực hành Luyện thanh -->
          <div class="speak-practice-card">
            <!-- Mode Switcher: Âm đơn vs Cặp thanh -->
            <div class="level-switcher-bar">
              <span class="switcher-label">Cấp độ luyện:</span>
              <div class="pill-group">
                <button type="button" class="pill-btn ${isLevel1 ? 'active' : ''}" id="btn-tone-level-1">Mức 1: Âm Tiết Đơn (Thanh 1 - 4)</button>
                <button type="button" class="pill-btn ${!isLevel1 ? 'active' : ''}" id="btn-tone-level-2">Mức 2: Cặp Thanh 2 Âm Tiết (16 Tổ Hợp)</button>
              </div>
              <div class="score-badge">Đúng: <strong>${s.stats.correct}</strong> / ${s.stats.total}</div>
            </div>

            ${isLevel1 ? this.renderToneLevel1() : this.renderToneLevel2()}
          </div>
        </div>
      `;
    },

    renderToneLevel1() {
      const s = this.toneState;
      const targetSyl = s.targetSyllable;
      const tone = s.targetTone;

      return `
        <div class="tone-quiz-box">
          <div class="quiz-prompt-center">
            <span class="quiz-sub-hint">Bấm nghe âm tiết rồi chọn thanh điệu đúng (1 - 4):</span>
            <div class="audio-action-center">
              <button type="button" class="btn-play-audio-large" id="btn-play-tone" title="Nghe âm mẫu (Phím Space)">
                <span class="audio-wave-anim">${ic('volume')}</span>
                <span>Nghe Phát Âm</span>
              </button>
            </div>
          </div>

          <!-- 4 Nút chọn Thanh 1-4 -->
          <div class="tone-buttons-grid">
            ${[1, 2, 3, 4].map(tNum => {
              const info = TONE_INFO[tNum - 1];
              let btnClass = 'tone-choice-btn';
              if (s.answered) {
                if (tNum === tone) btnClass += ' correct';
                else if (tNum === s.selectedTone1) btnClass += ' wrong';
                else btnClass += ' disabled';
              }
              return `
                <button type="button" class="${btnClass}" data-tone="${tNum}" ${s.answered ? 'disabled' : ''}>
                  <div class="tone-choice-num">Thanh ${tNum}</div>
                  <div class="tone-choice-symbol">${info.symbol}</div>
                  <div class="tone-choice-name">${info.desc}</div>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Phản hồi sau khi trả lời -->
          ${s.answered ? `
            <div class="quiz-feedback-card ${s.isCorrect ? 'correct' : 'wrong'}">
              <div class="feedback-msg">
                ${s.isCorrect ? `${ic('check-circle')} <strong>Chính xác!</strong> Bạn nghe thanh điệu rất chuẩn.` : `${ic('x')} <strong>Chưa chính xác!</strong> Hãy nghe lại để cảm nhận cao độ.`}
              </div>
              <div class="feedback-detail">
                Âm vừa nghe là: <strong class="target-pinyin">${targetSyl.pinyin[tone - 1]}</strong> (${targetSyl.hanzi[tone - 1]}: ${targetSyl.meaning[tone - 1]}) &mdash; <em>${TONE_INFO[tone - 1].name}</em>
              </div>
              <div class="feedback-actions">
                <button type="button" class="btn-secondary" id="btn-replay-feedback-tone">${ic('volume')} Nghe lại âm này</button>
                <button type="button" class="btn-primary" id="btn-next-tone">Câu tiếp theo &rarr;</button>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    },

    renderToneLevel2() {
      const s = this.toneState;
      const pair = s.targetPair;
      const word = s.targetPairWord;

      return `
        <div class="tone-quiz-box">
          <div class="quiz-prompt-center">
            <span class="quiz-sub-hint">Nghe từ ghép 2 âm tiết và chọn tổ hợp thanh điệu tương ứng:</span>
            <div class="audio-action-center">
              <button type="button" class="btn-play-audio-large" id="btn-play-tone" title="Nghe từ mẫu">
                <span class="audio-wave-anim">${ic('volume')}</span>
                <span>Nghe Từ Mẫu</span>
              </button>
            </div>
          </div>

          <!-- Lựa chọn thanh cho âm 1 và âm 2 -->
          <div class="tone-pair-picker">
            <div class="picker-column">
              <div class="picker-col-title">Âm tiết thứ 1:</div>
              <div class="pill-tone-row">
                ${[1, 2, 3, 4].map(t => `
                  <button type="button" class="pill-tone-btn ${s.selectedTone1 === t ? 'selected' : ''}" data-slot="1" data-tone="${t}" ${s.answered ? 'disabled' : ''}>
                    Thanh ${t}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="picker-divider">&plus;</div>

            <div class="picker-column">
              <div class="picker-col-title">Âm tiết thứ 2:</div>
              <div class="pill-tone-row">
                ${[1, 2, 3, 4].map(t => `
                  <button type="button" class="pill-tone-btn ${s.selectedTone2 === t ? 'selected' : ''}" data-slot="2" data-tone="${t}" ${s.answered ? 'disabled' : ''}>
                    Thanh ${t}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          ${!s.answered ? `
            <div class="pair-submit-row">
              <button type="button" class="btn-primary" id="btn-check-pair" ${!(s.selectedTone1 && s.selectedTone2) ? 'disabled' : ''}>
                Kiểm tra kết quả
              </button>
            </div>
          ` : ''}

          <!-- Phản hồi cặp thanh -->
          ${s.answered ? `
            <div class="quiz-feedback-card ${s.isCorrect ? 'correct' : 'wrong'}">
              <div class="feedback-msg">
                ${s.isCorrect ? `${ic('check-circle')} <strong>Xuất sắc!</strong> Bạn đã nhận diện chính xác cả 2 thanh.` : `${ic('x')} <strong>Chưa đúng!</strong> Đáp án đúng là: Thanh ${pair.t1} - Thanh ${pair.t2}.`}
              </div>
              <div class="feedback-detail">
                Từ vừa nghe: <strong class="target-hanzi">${word.zh}</strong> &bull; <strong class="target-pinyin">${word.py}</strong> (${word.vi})
              </div>
              <div class="feedback-actions">
                <button type="button" class="btn-secondary" id="btn-replay-feedback-tone">${ic('volume')} Nghe lại từ này</button>
                <button type="button" class="btn-primary" id="btn-next-tone">Cặp tiếp theo &rarr;</button>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    },

    generatePitchSvg(highlightTone = null) {
      // Sơ đồ đường cao độ chuẩn 5 mức (Chao 5-level pitch diagram)
      // Tọa độ y: mức 5 = 25px, mức 4 = 65px, mức 3 = 105px, mức 2 = 145px, mức 1 = 185px
      const yCoords = { 5: 25, 4: 65, 3: 105, 2: 145, 1: 185 };

      return `
        <svg viewBox="0 0 460 215" class="pitch-svg-canvas" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="dot-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" markerUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="4.5" fill="#3b82f6"/>
            </marker>
            <marker id="dot-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" markerUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="4.5" fill="#10b981"/>
            </marker>
            <marker id="dot-amber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" markerUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="4.5" fill="#f59e0b"/>
            </marker>
            <marker id="dot-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" markerUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="4.5" fill="#ef4444"/>
            </marker>
          </defs>

          <!-- Trục tọa độ và đường tham chiếu 5 mức -->
          ${[5, 4, 3, 2, 1].map(lvl => `
            <g class="pitch-grid-row">
              <text x="35" y="${yCoords[lvl] + 4}" class="pitch-axis-text">${lvl}</text>
              <line x1="50" y1="${yCoords[lvl]}" x2="420" y2="${yCoords[lvl]}" class="pitch-grid-line" stroke-dasharray="${lvl === 5 || lvl === 1 ? 'none' : '3,3'}"/>
            </g>
          `).join('')}

          <!-- Trục dọc mốc thời gian -->
          <line x1="50" y1="20" x2="50" y2="190" class="pitch-axis-line"/>
          <line x1="420" y1="20" x2="420" y2="190" class="pitch-axis-line"/>

          <!-- Đường Thanh 1 (55: Ngang cao) -->
          <g class="tone-path-group ${highlightTone && highlightTone !== 1 ? 'dimmed' : ''} ${highlightTone === 1 ? 'active' : ''}">
            <path d="M 65 ${yCoords[5]} L 145 ${yCoords[5]}" class="pitch-curve tone-1" marker-start="url(#dot-blue)" marker-end="url(#dot-blue)"/>
            <text x="105" y="${yCoords[5] - 11}" class="pitch-curve-label" fill="#3b82f6">Thanh 1 (55)</text>
          </g>

          <!-- Đường Thanh 2 (35: Vút lên) -->
          <g class="tone-path-group ${highlightTone && highlightTone !== 2 ? 'dimmed' : ''} ${highlightTone === 2 ? 'active' : ''}">
            <path d="M 160 ${yCoords[3]} L 230 ${yCoords[5]}" class="pitch-curve tone-2" marker-start="url(#dot-green)" marker-end="url(#dot-green)"/>
            <text x="195" y="${yCoords[4] - 8}" class="pitch-curve-label" fill="#10b981">Thanh 2 (35)</text>
          </g>

          <!-- Đường Thanh 3 (214: Xuống đáy rồi uốn lên) -->
          <g class="tone-path-group ${highlightTone && highlightTone !== 3 ? 'dimmed' : ''} ${highlightTone === 3 ? 'active' : ''}">
            <path d="M 250 ${yCoords[2]} Q 285 ${yCoords[1] + 8} 310 ${yCoords[1]} Q 325 ${yCoords[1]} 335 ${yCoords[4]}" class="pitch-curve tone-3" marker-start="url(#dot-amber)" marker-end="url(#dot-amber)"/>
            <text x="295" y="${yCoords[1] + 18}" class="pitch-curve-label" fill="#f59e0b">Thanh 3 (214)</text>
          </g>

          <!-- Đường Thanh 4 (51: Rơi mạnh dứt khoát) -->
          <g class="tone-path-group ${highlightTone && highlightTone !== 4 ? 'dimmed' : ''} ${highlightTone === 4 ? 'active' : ''}">
            <path d="M 355 ${yCoords[5]} L 415 ${yCoords[1]}" class="pitch-curve tone-4" marker-start="url(#dot-red)" marker-end="url(#dot-red)"/>
            <text x="390" y="${yCoords[3] - 6}" class="pitch-curve-label" fill="#ef4444">Thanh 4 (51)</text>
          </g>
        </svg>
      `;
    },

    bindToneEvents() {
      const s = this.toneState;

      // Đổi cấp độ (Level 1 / Level 2)
      const btnLvl1 = this.container.querySelector('#btn-tone-level-1');
      const btnLvl2 = this.container.querySelector('#btn-tone-level-2');
      if (btnLvl1) {
        btnLvl1.onclick = () => {
          s.level = 1;
          this.newToneQuestion();
          this.refreshPane();
        };
      }
      if (btnLvl2) {
        btnLvl2.onclick = () => {
          s.level = 2;
          this.newToneQuestion();
          this.refreshPane();
        };
      }

      // Phát âm thanh
      const btnPlay = this.container.querySelector('#btn-play-tone');
      if (btnPlay) {
        btnPlay.onclick = () => this.playCurrentToneAudio();
      }

      // Nghe lại sau phản hồi
      const btnReplay = this.container.querySelector('#btn-replay-feedback-tone');
      if (btnReplay) {
        btnReplay.onclick = () => this.playCurrentToneAudio();
      }

      // Nút chọn thanh ở Level 1
      const toneBtns = this.container.querySelectorAll('.tone-choice-btn');
      toneBtns.forEach(btn => {
        btn.onclick = () => {
          if (s.answered) return;
          const chosenTone = parseInt(btn.getAttribute('data-tone'), 10);
          this.submitToneAnswer(chosenTone);
        };
      });

      // Nút chọn thanh ở Level 2
      const slotBtns = this.container.querySelectorAll('.pill-tone-btn');
      slotBtns.forEach(btn => {
        btn.onclick = () => {
          if (s.answered) return;
          const slot = btn.getAttribute('data-slot');
          const toneVal = parseInt(btn.getAttribute('data-tone'), 10);
          if (slot === '1') s.selectedTone1 = toneVal;
          if (slot === '2') s.selectedTone2 = toneVal;
          this.refreshPane();
        };
      });

      // Kiểm tra đáp án Level 2
      const btnCheckPair = this.container.querySelector('#btn-check-pair');
      if (btnCheckPair) {
        btnCheckPair.onclick = () => this.submitPairAnswer();
      }

      // Nút câu tiếp theo
      const btnNext = this.container.querySelector('#btn-next-tone');
      if (btnNext) {
        btnNext.onclick = () => {
          this.newToneQuestion();
          this.refreshPane();
        };
      }
    },

    newToneQuestion() {
      const s = this.toneState;
      s.answered = false;
      s.isCorrect = false;
      s.selectedTone1 = null;
      s.selectedTone2 = null;

      if (s.level === 1) {
        // Chọn ngẫu nhiên âm tiết đơn và thanh điệu
        s.singleIndex = Math.floor(Math.random() * SINGLE_TONE_DRILL.length);
        s.targetTone = Math.floor(Math.random() * 4) + 1; // 1 -> 4
        s.targetSyllable = SINGLE_TONE_DRILL[s.singleIndex];
      } else {
        // Chọn ngẫu nhiên 1 trong 16 tổ hợp cặp thanh
        s.pairIndex = Math.floor(Math.random() * TONE_PAIRS.length);
        s.targetPair = TONE_PAIRS[s.pairIndex];
        const words = s.targetPair.words;
        s.targetPairWord = words[Math.floor(Math.random() * words.length)];
      }
    },

    playCurrentToneAudio() {
      const s = this.toneState;
      if (s.level === 1) {
        if (!s.targetSyllable) return;
        const syl = s.targetSyllable.pinyin[s.targetTone - 1];
        AudioService.speak(s.targetSyllable.hanzi[s.targetTone - 1] || syl, 0.7);
      } else {
        if (!s.targetPairWord) return;
        AudioService.speak(s.targetPairWord.zh, 0.7);
      }
    },

    submitToneAnswer(chosenTone) {
      const s = this.toneState;
      s.answered = true;
      s.selectedTone1 = chosenTone;
      s.stats.total++;
      if (chosenTone === s.targetTone) {
        s.isCorrect = true;
        s.stats.correct++;
        // Thưởng kinh tế nếu có
        if (window.Economy && typeof window.Economy.reward === 'function') {
          window.Economy.reward('toneCorrect');
        }
      } else {
        s.isCorrect = false;
      }
      this.refreshPane();
    },

    submitPairAnswer() {
      const s = this.toneState;
      if (!s.selectedTone1 || !s.selectedTone2) return;
      s.answered = true;
      s.stats.total++;

      const isMatch = s.selectedTone1 === s.targetPair.t1 && s.selectedTone2 === s.targetPair.t2;
      s.isCorrect = isMatch;
      if (isMatch) {
        s.stats.correct++;
        if (window.Economy && typeof window.Economy.reward === 'function') {
          window.Economy.reward('toneCorrect');
        }
      }
      this.refreshPane();
    },

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // TAB 2: ĐỌC THEO (SHADOWING & SPEECH RECOGNITION / MEDIA RECORDER)
    // ------------------------------------------------------------------------
    renderShadowTab() {
      const s = this.shadowState;
      const isFinishedRound = s.history.length >= s.roundSize;

      if (isFinishedRound) {
        return this.renderShadowSummary();
      }

      const isEn = this.lang === 'en';
      const item = s.items[s.currentIndex] || (isEn ? DEFAULT_EN_SHADOWING_WORDS[0] : DEFAULT_SHADOWING_WORDS[0]);
      let targetDisplay = item.zh;
      let phoneticDisplay = item.py;
      let meaningDisplay = item.vi;

      if (isEn) {
        if (s.targetType === 'sentence' && item.ex && item.ex.en) {
          targetDisplay = item.ex.en;
          phoneticDisplay = '';
          meaningDisplay = item.ex.vi;
        } else {
          targetDisplay = item.en || item.zh;
          phoneticDisplay = item.ipa || item.py;
          meaningDisplay = item.vi;
        }
      }

      const progressNum = s.history.length + 1;

      return `
        <div class="speak-shadow-section ${isEn ? 'speak-english-theme' : ''}">
          <!-- Top Info Bar -->
          <div class="shadow-top-bar">
            <div class="progress-col">
              <span class="progress-label">Lượt luyện: <strong>Câu ${progressNum} / ${s.roundSize}</strong></span>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${(progressNum / s.roundSize) * 100}%;"></div>
              </div>
            </div>

            <!-- Tốc độ đọc mẫu -->
            <div class="speed-controls-group">
              <span class="speed-label">Tốc độ mẫu:</span>
              <div class="pill-group">
                ${[0.6, 0.8, 1.0].map(r => `
                  <button type="button" class="pill-btn ${s.speechRate === r ? 'active' : ''}" data-rate="${r}">
                    ${r}x
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Card câu luyện đọc chính -->
          <div class="shadow-card">
            ${isEn ? `
              <div class="shadow-mode-pills-row" style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;">
                <div class="pill-group">
                  <button type="button" class="pill-btn ${s.targetType !== 'sentence' ? 'active' : ''}" data-target-type="word">${ic('book')} Từ vựng đơn</button>
                  <button type="button" class="pill-btn ${s.targetType === 'sentence' ? 'active' : ''}" data-target-type="sentence">${ic('chat')} Câu ví dụ</button>
                </div>
                <div class="pill-group">
                  <button type="button" class="pill-btn ${!s.dictationMode ? 'active' : ''}" data-input-mode="mic">${ic('mic')} Luyện nói (Micro)</button>
                  <button type="button" class="pill-btn ${s.dictationMode ? 'active' : ''}" data-input-mode="dictation">${ic('keyboard')} Gõ chính tả (Không mic)</button>
                </div>
              </div>
            ` : ''}

            <div class="shadow-prompt-wrapper">
              <div class="shadow-pinyin">${phoneticDisplay}</div>
              <div class="shadow-hanzi" id="shadow-hanzi-display">
                ${this.renderTargetHanziFormatted(targetDisplay, s.lastResult)}
              </div>
              <div class="shadow-vi">"${meaningDisplay}"</div>
            </div>

            <!-- Nút phát mẫu -->
            <div class="shadow-audio-bar">
              <button type="button" class="btn-listen-sample" id="btn-shadow-listen">
                <span class="icon">${ic('volume')}</span>
                <span>Nghe Mẫu Chuẩn</span>
              </button>
            </div>

            <!-- Khu vực Micro thu âm / Gõ chính tả -->
            <div class="shadow-mic-area">
              ${s.dictationMode
                ? this.renderDictationBox()
                : (!s.useMediaRecorderFallback ? this.renderSpeechRecognitionBox() : this.renderMediaRecorderBox())
              }
            </div>

            <!-- Kết quả so khớp -->
            ${s.lastResult ? this.renderRecognitionFeedback(s.lastResult) : ''}

            <!-- Hàng nút hành động -->
            <div class="shadow-actions-bottom">
              <button type="button" class="btn-secondary" id="btn-shadow-skip">Bỏ qua câu này</button>
              ${s.lastResult ? `
                <button type="button" class="btn-primary" id="btn-shadow-next">
                  ${progressNum >= s.roundSize ? 'Xem tổng kết lượt &rarr;' : 'Câu tiếp theo &rarr;'}
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Thông báo chế độ nhận diện -->
          <div class="shadow-footer-hint">
            ${s.dictationMode
              ? `<span class="status-ok">${ic('keyboard')} Chế độ Gõ chính tả: Luyện phản xạ tai nghe và viết đúng chính tả tiếng Anh. Đạt từ <strong>70%</strong> trở lên nhận thưởng <strong>speakPass</strong>!</span>`
              : (s.useMediaRecorderFallback
                  ? `<span class="status-warning">${ic('alert')} Đang sử dụng chế độ Thu âm & Tự đánh giá (MediaRecorder). Bạn có thể tự nghe lại để so sánh.</span>`
                  : (isEn
                      ? `<span class="status-ok">${ic('mic')} Trình duyệt hỗ trợ SpeechRecognition en-US trực tiếp. Đạt từ <strong>70%</strong> trở lên để nhận thưởng <strong>speakPass</strong>!</span>`
                      : `<span class="status-ok">${ic('mic')} Trình duyệt hỗ trợ SpeechRecognition zh-CN trực tiếp. Đạt từ <strong>70%</strong> trở lên để nhận thưởng <strong>speakPass</strong>!</span>`
                    )
                )
            }
          </div>
        </div>
      `;
    },

    renderDictationBox() {
      const s = this.shadowState;
      return `
        <div class="dictation-box">
          <div class="dictation-prompt-text">${ic('headphones')} Nghe mẫu chuẩn rồi gõ lại chính xác (luyện nghe chép chính tả):</div>
          <div class="dictation-input-row">
            <input type="text" id="input-dictation-text" class="dictation-input" placeholder="Gõ lại những gì bạn nghe được..." value="${s.dictationInput || ''}" autocomplete="off" />
            <button type="button" id="btn-submit-dictation" class="btn-primary">Kiểm tra kết quả</button>
          </div>
        </div>
      `;
    },

    renderSpeechRecognitionBox() {
      const s = this.shadowState;
      const isEn = this.lang === 'en';
      return `
        <div class="recognition-box">
          <button type="button" class="btn-mic-record ${s.isRecording ? 'recording' : ''}" id="btn-toggle-recognition">
            <span class="mic-icon">${s.isRecording ? ic('pause') : ic('mic')}</span>
            <span class="mic-text">${s.isRecording ? 'Đang lắng nghe... (Bấm dừng)' : 'Bấm để đọc (Micro)'}</span>
          </button>
          <div class="mic-status-msg" id="mic-status-text">
            ${s.isRecording
              ? (isEn ? 'Hãy đọc to rõ ràng câu trên bằng tiếng Anh...' : 'Hãy đọc to rõ ràng câu trên bằng tiếng Trung...')
              : (isEn ? 'Nhấn nút micro và đọc theo mẫu chuẩn en-US' : 'Nhấn nút micro và nói theo mẫu')
            }
          </div>
        </div>
      `;
    },

    renderMediaRecorderBox() {
      const s = this.shadowState;
      return `
        <div class="media-recorder-box">
          <div class="rec-controls-row">
            <button type="button" class="btn-rec ${s.isRecording ? 'recording' : ''}" id="btn-toggle-media-rec">
              ${s.isRecording ? `${ic('pause')} Dừng thu âm` : `${ic('mic')} Bắt đầu thu âm`}
            </button>
            ${s.recordedBlobUrl ? `
              <button type="button" class="btn-play-rec" id="btn-play-my-voice">
                ${ic('play')} Nghe giọng mình
              </button>
              <button type="button" class="btn-play-sample-again" id="btn-play-sample-compare">
                ${ic('volume')} Nghe lại mẫu
              </button>
            ` : ''}
          </div>

          ${s.recordedBlobUrl ? `
            <div class="self-eval-box">
              <span class="eval-title">Tự đánh giá phát âm của bạn:</span>
              <div class="eval-buttons">
                <button type="button" class="btn-eval pass" id="btn-eval-pass">${ic('check')} Giống mẫu (Đạt &ge;70%)</button>
                <button type="button" class="btn-eval retry" id="btn-eval-retry">${ic('refresh')} Chưa giống (Thử lại)</button>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    },

    renderTargetHanziFormatted(targetHanzi, result) {
      if (!result) return targetHanzi;
      if (result.perWord && result.perWord.length > 0) {
        return result.perWord.map(w => {
          return `<span class="char-item ${w.ok ? 'char-ok' : 'char-fail'}" style="margin: 0 4px; display: inline-block;">${w.word}</span>`;
        }).join(' ');
      }
      if (!result.perChar || result.perChar.length === 0) {
        return targetHanzi;
      }
      // Tô xanh/đỏ từng chữ
      let charIdx = 0;
      return Array.from(targetHanzi).map(ch => {
        // Bỏ qua dấu câu khi đánh dấu
        if (/[\s\p{P}\p{S}]/u.test(ch)) {
          return `<span class="char-punct">${ch}</span>`;
        }
        const matchInfo = result.perChar[charIdx];
        charIdx++;
        if (!matchInfo) return ch;
        return `<span class="char-item ${matchInfo.ok ? 'char-ok' : 'char-fail'}">${ch}</span>`;
      }).join('');
    },

    renderRecognitionFeedback(res) {
      const isPass = res.score >= 70;
      return `
        <div class="recognition-feedback-box ${isPass ? 'pass' : 'retry'}">
          <div class="feedback-score-row">
            <div class="score-pill ${isPass ? 'pass' : 'retry'}">
              Điểm khớp: <strong>${res.score}%</strong>
            </div>
            <div class="status-badge-text">
              ${isPass ? `${ic('check-circle')} Đạt chuẩn phát âm!` : `${ic('target')} Chưa đạt (Cần &ge; 70%)`}
            </div>
          </div>
          ${res.best ? `
            <div class="heard-text-row">
              <span class="label">Máy nghe được:</span>
              <span class="heard-content">"${res.best}"</span>
            </div>
          ` : ''}
          ${res.advice ? `
            <div class="speech-advice-box" style="margin-top:0.5rem;font-size:0.9rem;line-height:1.4;color:var(--text);background:rgba(0,0,0,0.03);padding:0.5rem 0.75rem;border-radius:6px;border-left:3px solid var(--primary);">
              ${ic('lightbulb')} <strong>Nhận xét:</strong> ${res.advice}
            </div>
          ` : ''}
        </div>
      `;
    },

    renderShadowSummary() {
      const s = this.shadowState;
      const passedCount = s.history.filter(h => h.passed).length;
      const total = s.history.length;
      const avgScore = Math.round(s.history.reduce((sum, h) => sum + (h.score || 0), 0) / (total || 1));

      return `
        <div class="shadow-summary-card">
          <div class="summary-header">
            <div class="summary-icon">${ic('trophy')}</div>
            <h3 class="summary-title">Hoàn Thành Lượt Luyện Đọc!</h3>
            <p class="summary-sub">Bạn đã hoàn thành 10 câu trong lượt luyện phát âm.</p>
          </div>

          <div class="summary-stats-grid">
            <div class="stat-box">
              <span class="stat-value">${passedCount} / ${total}</span>
              <span class="stat-name">Số câu đạt (&ge;70%)</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">${avgScore}%</span>
              <span class="stat-name">Điểm trung bình</span>
            </div>
          </div>

          <!-- Danh sách câu trong lượt -->
          <div class="summary-history-list">
            <h4>Chi tiết các câu đã luyện:</h4>
            ${s.history.map((h, i) => `
              <div class="history-item-row ${h.passed ? 'pass' : 'fail'}">
                <div class="history-left">
                  <span class="item-num">#${i + 1}</span>
                  <strong class="item-hanzi">${h.zh}</strong>
                  <span class="item-py">${h.py}</span>
                  <span class="item-vi">(${h.vi})</span>
                </div>
                <div class="history-right">
                  <span class="item-score">${h.score}%</span>
                  <span class="item-badge ${h.passed ? 'pass' : 'fail'}">${h.passed ? 'Đạt' : 'Cần luyện thêm'}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="summary-actions">
            <button type="button" class="btn-primary" id="btn-restart-shadow">
              ${ic('refresh')} Luyện lượt mới (10 câu)
            </button>
          </div>
        </div>
      `;
    },

    bindShadowEvents() {
      const s = this.shadowState;

      // Chuyển đổi giữa từ vựng và câu ví dụ
      const typeBtns = this.container.querySelectorAll('[data-target-type]');
      typeBtns.forEach(btn => {
        btn.onclick = () => {
          s.targetType = btn.getAttribute('data-target-type');
          s.lastResult = null;
          this.refreshPane();
        };
      });

      // Chuyển đổi giữa micro và gõ chính tả
      const modeBtns = this.container.querySelectorAll('[data-input-mode]');
      modeBtns.forEach(btn => {
        btn.onclick = () => {
          s.dictationMode = btn.getAttribute('data-input-mode') === 'dictation';
          s.lastResult = null;
          this.refreshPane();
        };
      });

      // Gõ chính tả
      const btnDictation = this.container.querySelector('#btn-submit-dictation');
      const inputDictation = this.container.querySelector('#input-dictation-text');
      if (btnDictation && inputDictation) {
        const doDictationCheck = () => {
          const val = (inputDictation.value || '').trim();
          if (!val) return;
          s.dictationInput = val;
          this.handleShadowRecognitionResult([val]);
        };
        btnDictation.onclick = doDictationCheck;
        inputDictation.onkeydown = (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            doDictationCheck();
          }
        };
      }

      // Nút tốc độ mẫu
      const rateBtns = this.container.querySelectorAll('.speed-controls-group .pill-btn');
      rateBtns.forEach(btn => {
        btn.onclick = () => {
          s.speechRate = parseFloat(btn.getAttribute('data-rate'));
          AudioService.speechRate = s.speechRate;
          this.refreshPane();
        };
      });

      // Nghe mẫu
      const btnListen = this.container.querySelector('#btn-shadow-listen');
      if (btnListen) {
        btnListen.onclick = () => {
          const item = s.items[s.currentIndex];
          if (!item) return;
          const isEn = this.lang === 'en';
          let speakText = item.zh;
          if (isEn) {
            speakText = (s.targetType === 'sentence' && item.ex && item.ex.en)
              ? item.ex.en
              : (item.en || item.zh);
          }
          AudioService.speak(speakText, s.speechRate, null, isEn ? 'en-US' : 'zh-CN');
        };
      }

      // Micro nhận diện Web Speech
      const btnToggleRec = this.container.querySelector('#btn-toggle-recognition');
      if (btnToggleRec) {
        btnToggleRec.onclick = () => this.toggleSpeechRecognition();
      }

      // Micro MediaRecorder fallback
      const btnMediaRec = this.container.querySelector('#btn-toggle-media-rec');
      if (btnMediaRec) {
        btnMediaRec.onclick = () => this.toggleMediaRecording();
      }

      const btnPlayMyVoice = this.container.querySelector('#btn-play-my-voice');
      if (btnPlayMyVoice) {
        btnPlayMyVoice.onclick = () => {
          if (s.recordedBlobUrl) {
            const audio = new Audio(s.recordedBlobUrl);
            audio.play();
          }
        };
      }

      const btnPlayCompare = this.container.querySelector('#btn-play-sample-compare');
      if (btnPlayCompare) {
        btnPlayCompare.onclick = () => {
          const item = s.items[s.currentIndex];
          if (!item) return;
          const isEn = this.lang === 'en';
          let speakText = item.zh;
          if (isEn) {
            speakText = (s.targetType === 'sentence' && item.ex && item.ex.en)
              ? item.ex.en
              : (item.en || item.zh);
          }
          AudioService.speak(speakText, s.speechRate, null, isEn ? 'en-US' : 'zh-CN');
        };
      }

      // Đánh giá thủ công trong fallback
      const btnEvalPass = this.container.querySelector('#btn-eval-pass');
      if (btnEvalPass) {
        btnEvalPass.onclick = () => {
          this.handleShadowRecognitionResult([' ' + s.items[s.currentIndex].zh], 85);
        };
      }

      const btnEvalRetry = this.container.querySelector('#btn-eval-retry');
      if (btnEvalRetry) {
        btnEvalRetry.onclick = () => {
          this.handleShadowRecognitionResult([], 40);
        };
      }

      // Bỏ qua câu
      const btnSkip = this.container.querySelector('#btn-shadow-skip');
      if (btnSkip) {
        btnSkip.onclick = () => {
          this.advanceShadowQuestion(false, 0);
        };
      }

      // Câu tiếp theo
      const btnNext = this.container.querySelector('#btn-shadow-next');
      if (btnNext) {
        btnNext.onclick = () => {
          const isPass = s.lastResult ? s.lastResult.score >= 70 : false;
          this.advanceShadowQuestion(isPass, s.lastResult ? s.lastResult.score : 0);
        };
      }

      // Luyện lại lượt mới
      const btnRestart = this.container.querySelector('#btn-restart-shadow');
      if (btnRestart) {
        btnRestart.onclick = () => {
          s.history = [];
          s.lastResult = null;
          s.currentIndex = Math.floor(Math.random() * s.items.length);
          this.refreshPane();
        };
      }
    },

    toggleSpeechRecognition() {
      const s = this.shadowState;
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        s.useMediaRecorderFallback = true;
        this.refreshPane();
        return;
      }

      if (s.isRecording) {
        if (s.recognition) {
          try { s.recognition.stop(); } catch (e) {}
        }
        s.isRecording = false;
        this.refreshPane();
        return;
      }

      try {
        const recognition = new SpeechRecognition();
        recognition.lang = this.lang === 'en' ? 'en-US' : 'zh-CN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 5;

        recognition.onstart = () => {
          s.isRecording = true;
          this.refreshPane();
        };

        recognition.onresult = (event) => {
          s.isRecording = false;
          const transcripts = [];
          if (event.results && event.results[0]) {
            for (let i = 0; i < event.results[0].length; i++) {
              transcripts.push(event.results[0][i].transcript);
            }
          }
          this.handleShadowRecognitionResult(transcripts);
        };

        recognition.onerror = (event) => {
          s.isRecording = false;
          console.warn('SpeechRecognition error:', event.error);
          if (['not-allowed', 'network', 'service-not-allowed'].includes(event.error)) {
            // Chuyển sang fallback MediaRecorder
            s.useMediaRecorderFallback = true;
          }
          this.refreshPane();
        };

        recognition.onend = () => {
          s.isRecording = false;
          this.refreshPane();
        };

        s.recognition = recognition;
        recognition.start();
      } catch (err) {
        console.error('Không thể khởi động SpeechRecognition:', err);
        s.useMediaRecorderFallback = true;
        s.isRecording = false;
        this.refreshPane();
      }
    },

    toggleMediaRecording() {
      const s = this.shadowState;
      if (s.isRecording) {
        if (s.mediaRecorder && s.mediaRecorder.state !== 'inactive') {
          s.mediaRecorder.stop();
        }
        s.isRecording = false;
        this.refreshPane();
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Trình duyệt không hỗ trợ ghi âm trực tiếp qua getUserMedia.');
        return;
      }

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          s.audioChunks = [];
          const mediaRecorder = new MediaRecorder(stream);
          s.mediaRecorder = mediaRecorder;

          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) s.audioChunks.push(e.data);
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(s.audioChunks, { type: 'audio/webm' });
            if (s.recordedBlobUrl) URL.revokeObjectURL(s.recordedBlobUrl);
            s.recordedBlobUrl = URL.createObjectURL(blob);
            s.isRecording = false;
            this.refreshPane();
          };

          mediaRecorder.start();
          s.isRecording = true;
          this.refreshPane();
        })
        .catch(err => {
          console.error('Lỗi truy cập micro:', err);
          alert('Không thể truy cập micro. Hãy kiểm tra quyền cấp phép của trình duyệt.');
        });
    },

    handleShadowRecognitionResult(transcripts, overrideScore = null) {
      const s = this.shadowState;
      const currentItem = s.items[s.currentIndex];
      if (!currentItem) return;

      const isEn = this.lang === 'en';
      let targetText = currentItem.zh;
      if (isEn) {
        targetText = (s.targetType === 'sentence' && currentItem.ex && currentItem.ex.en)
          ? currentItem.ex.en
          : (currentItem.en || currentItem.zh);
      }

      let result;
      if (overrideScore !== null) {
        const norm = normalizeHanzi(targetText);
        result = {
          score: overrideScore,
          perChar: Array.from(norm).map(ch => ({ ch, ok: overrideScore >= 70 })),
          best: targetText
        };
      } else {
        result = scoreRecognition(targetText, transcripts, currentItem);
      }

      s.lastResult = result;

      // Nếu đạt >= 70% thì thưởng kinh tế speakPass
      if (result.score >= 70) {
        if (window.Economy && typeof window.Economy.reward === 'function') {
          window.Economy.reward('speakPass');
        }
      }

      this.refreshPane();
    },

    advanceShadowQuestion(passed, score) {
      const s = this.shadowState;
      const currentItem = s.items[s.currentIndex];
      if (!currentItem) return;

      const isEn = this.lang === 'en';
      let targetText = currentItem.zh;
      let pyText = currentItem.py;
      let viText = currentItem.vi;
      if (isEn) {
        if (s.targetType === 'sentence' && currentItem.ex && currentItem.ex.en) {
          targetText = currentItem.ex.en;
          pyText = '';
          viText = currentItem.ex.vi;
        } else {
          targetText = currentItem.en || currentItem.zh;
          pyText = currentItem.ipa || currentItem.py;
          viText = currentItem.vi;
        }
      }

      s.history.push({
        zh: targetText,
        py: pyText,
        vi: viText,
        passed,
        score
      });

      s.lastResult = null;
      s.recordedBlobUrl = null;
      s.dictationInput = '';

      if (s.history.length < s.roundSize) {
        s.currentIndex = (s.currentIndex + 1) % s.items.length;
      }

      this.refreshPane();
    },

    // ------------------------------------------------------------------------
    // TAB 3: ÂM DỄ NHẦM VỚI NGƯỜI VIỆT (CONFUSING SOUNDS)
    // ------------------------------------------------------------------------
    renderConfusingTab() {
      const s = this.confusingState;
      const activeGroup = this.getActiveConfusingGroup();
      const question = s.questions[s.currentIndex];

      return `
        <div class="speak-confusing-section">
          <!-- Thanh chọn nhóm âm -->
          <div class="confusing-header-card">
            <div class="filter-row">
              <label for="confusing-group-select" class="filter-label">Chọn nhóm âm:</label>
              <select id="confusing-group-select" class="confusing-select">
                <option value="all" ${s.groupFilter === 'all' ? 'selected' : ''}>Tất cả các nhóm (${CONFUSING_GROUPS.length} nhóm)</option>
                ${CONFUSING_GROUPS.map(g => `
                  <option value="${g.id}" ${s.groupFilter === g.id ? 'selected' : ''}>${g.title}</option>
                `).join('')}
              </select>
            </div>

            <!-- Mẹo đặt lưỡi & phát âm của nhóm đang xem -->
            <div class="confusing-tip-box">
              <div class="tip-title">${ic('pin')} Cách đặt lưỡi & Luồng hơi (${activeGroup ? activeGroup.title : 'Tổng hợp các nhóm'}):</div>
              <div class="tip-content">${(activeGroup ? activeGroup.tip : 'Luyện nghe và chọn đúng âm tiết để rèn luyện phân biệt các âm tương đồng.').replace(/\n/g, '<br>')}</div>
            </div>
          </div>

          <!-- Card câu hỏi nghe chọn -->
          ${question ? `
            <div class="confusing-quiz-card">
              <div class="quiz-top-info">
                <span>Câu ${s.currentIndex + 1} / ${s.questions.length}</span>
                <span class="score-badge">Đúng: <strong>${s.stats.correct}</strong> / ${s.stats.total}</span>
              </div>

              <div class="quiz-audio-center">
                <span class="sub-instruction">Nghe âm thanh và chọn phiên âm đúng nhất:</span>
                <button type="button" class="btn-play-audio-large" id="btn-play-confusing">
                  <span class="audio-wave-anim">${ic('volume')}</span>
                  <span>Nghe Âm Tiết</span>
                </button>
              </div>

              <!-- Danh sách lựa chọn -->
              <div class="confusing-options-grid">
                ${question.options.map(opt => {
                  let btnCls = 'confusing-opt-btn';
                  if (s.answered) {
                    if (opt === question.target) btnCls += ' correct';
                    else if (opt === s.selectedOption) btnCls += ' wrong';
                    else btnCls += ' disabled';
                  }
                  return `
                    <button type="button" class="${btnCls}" data-opt="${opt}" ${s.answered ? 'disabled' : ''}>
                      <span class="opt-pinyin">${opt}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Phản hồi sau khi trả lời -->
              ${s.answered ? `
                <div class="quiz-feedback-card ${s.isCorrect ? 'correct' : 'wrong'}">
                  <div class="feedback-msg">
                    ${s.isCorrect ? `${ic('check-circle')} <strong>Rất tốt!</strong> Bạn đã phân biệt chính xác âm này.` : `${ic('x')} <strong>Chưa chính xác!</strong> Âm đúng là: <strong>${question.target}</strong>`}
                  </div>
                  <div class="feedback-detail">
                    Chữ Hán minh họa: <strong>${question.hanzi}</strong> &mdash; <em>${question.expl || ''}</em>
                  </div>

                  <!-- So sánh nghe lại từng lựa chọn cạnh nhau -->
                  <div class="side-by-side-audio-compare">
                    <span class="compare-title">Nghe đối chiếu từng âm:</span>
                    <div class="compare-buttons-row">
                      ${question.options.map(opt => `
                        <button type="button" class="btn-compare-audio" data-sound="${opt}">
                          ${ic('volume')} ${opt}
                        </button>
                      `).join('')}
                    </div>
                  </div>

                  <div class="feedback-actions">
                    <button type="button" class="btn-primary" id="btn-next-confusing">Câu tiếp theo &rarr;</button>
                  </div>
                </div>
              ` : ''}
            </div>
          ` : `
            <div class="confusing-empty-box">Chưa có câu hỏi nào trong nhóm này.</div>
          `}
        </div>
      `;
    },

    getActiveConfusingGroup() {
      const filter = this.confusingState.groupFilter;
      if (filter === 'all') return CONFUSING_GROUPS[0];
      return CONFUSING_GROUPS.find(g => g.id === filter) || CONFUSING_GROUPS[0];
    },

    initConfusingQuestions() {
      const s = this.confusingState;
      const filter = s.groupFilter;
      let pool = [];

      if (filter === 'all') {
        CONFUSING_GROUPS.forEach(g => {
          g.items.forEach(it => {
            pool.push({ ...it, groupId: g.id, groupTitle: g.title });
          });
        });
      } else {
        const g = CONFUSING_GROUPS.find(group => group.id === filter);
        if (g) {
          pool = g.items.map(it => ({ ...it, groupId: g.id, groupTitle: g.title }));
        }
      }

      // Xáo trộn câu hỏi
      s.questions = pool.sort(() => 0.5 - Math.random());
      s.currentIndex = 0;
      s.answered = false;
      s.selectedOption = null;
    },

    bindConfusingEvents() {
      const s = this.confusingState;

      // Đổi nhóm lọc
      const sel = this.container.querySelector('#confusing-group-select');
      if (sel) {
        sel.onchange = () => {
          s.groupFilter = sel.value;
          this.initConfusingQuestions();
          this.refreshPane();
        };
      }

      // Phát âm câu hỏi
      const btnPlay = this.container.querySelector('#btn-play-confusing');
      if (btnPlay) {
        btnPlay.onclick = () => {
          const q = s.questions[s.currentIndex];
          if (q) AudioService.speak(q.target, 0.7);
        };
      }

      // Chọn đáp án
      const optBtns = this.container.querySelectorAll('.confusing-opt-btn');
      optBtns.forEach(btn => {
        btn.onclick = () => {
          if (s.answered) return;
          const chosen = btn.getAttribute('data-opt');
          this.submitConfusingAnswer(chosen);
        };
      });

      // Nghe đối chiếu từng âm
      const compareBtns = this.container.querySelectorAll('.btn-compare-audio');
      compareBtns.forEach(btn => {
        btn.onclick = () => {
          const sound = btn.getAttribute('data-sound');
          if (sound) AudioService.speak(sound, 0.7);
        };
      });

      // Câu tiếp theo
      const btnNext = this.container.querySelector('#btn-next-confusing');
      if (btnNext) {
        btnNext.onclick = () => {
          s.answered = false;
          s.selectedOption = null;
          s.currentIndex = (s.currentIndex + 1) % s.questions.length;
          this.refreshPane();
        };
      }
    },

    submitConfusingAnswer(chosen) {
      const s = this.confusingState;
      const q = s.questions[s.currentIndex];
      if (!q) return;

      s.answered = true;
      s.selectedOption = chosen;
      s.stats.total++;

      const isMatch = chosen === q.target;
      s.isCorrect = isMatch;
      if (isMatch) {
        s.stats.correct++;
        if (window.Economy && typeof window.Economy.reward === 'function') {
          window.Economy.reward('toneCorrect');
        }
      }
      this.refreshPane();
    },

    // ------------------------------------------------------------------------
    // TAB 3 (TIẾNG ANH): ÂM DỄ NHẦM & ĐUÔI (MINIMAL PAIRS & FINAL SOUNDS)
    // ------------------------------------------------------------------------
    initEnConfusingQuestions(cat = null) {
      const s = this.enConfusingState;
      if (cat) s.category = cat;
      const phonics = getEnPhonics();
      if (!phonics) {
        s.questions = [];
        return;
      }

      let pool = [];

      // 1. Cặp âm tối thiểu (Minimal Pairs)
      if (s.category === 'all' || s.category === 'minimal') {
        const mps = phonics.minimalPairs || [];
        mps.forEach(mp => {
          const isA = Math.random() < 0.5;
          const target = isA ? mp.wordA : mp.wordB;
          pool.push({
            type: 'minimal_pair',
            audioText: target.word,
            prompt: `Nghe phát âm và chọn từ đúng trong cặp âm (${mp.soundA} vs ${mp.soundB}):`,
            soundA: mp.soundA,
            soundB: mp.soundB,
            targetWord: target.word,
            tip: mp.tip,
            options: [
              { word: mp.wordA.word, ipa: mp.wordA.ipa, vi: mp.wordA.vi, isCorrect: isA },
              { word: mp.wordB.word, ipa: mp.wordB.ipa, vi: mp.wordB.vi, isCorrect: !isA }
            ]
          });
        });
      }

      // 2. Đuôi -s/-es
      if (s.category === 'all' || s.category === 'final_s') {
        const sRules = (phonics.finalSounds && phonics.finalSounds.s_z_iz && phonics.finalSounds.s_z_iz.rules) || [];
        const viNote = (phonics.finalSounds && phonics.finalSounds.s_z_iz && phonics.finalSounds.s_z_iz.viNote) || '';
        sRules.forEach(rule => {
          (rule.examples || []).forEach(ex => {
            pool.push({
              type: 'final_s',
              audioText: ex.word,
              word: ex.word,
              ipa: ex.ipa,
              vi: ex.vi,
              prompt: `Nghe từ "${ex.word}" (${ex.vi}) và chọn cách phát âm đuôi -s / -es đúng:`,
              targetSound: rule.sound,
              ruleCondition: rule.condition,
              ruleMnemonic: rule.mnemonic,
              viNote,
              options: [
                { sound: '/s/', isCorrect: rule.sound === '/s/' },
                { sound: '/z/', isCorrect: rule.sound === '/z/' },
                { sound: '/ɪz/', isCorrect: rule.sound === '/ɪz/' }
              ]
            });
          });
        });
      }

      // 3. Đuôi -ed
      if (s.category === 'all' || s.category === 'final_ed') {
        const edRules = (phonics.finalSounds && phonics.finalSounds.t_d_id && phonics.finalSounds.t_d_id.rules) || [];
        const viNote = (phonics.finalSounds && phonics.finalSounds.t_d_id && phonics.finalSounds.t_d_id.viNote) || '';
        edRules.forEach(rule => {
          (rule.examples || []).forEach(ex => {
            pool.push({
              type: 'final_ed',
              audioText: ex.word,
              word: ex.word,
              ipa: ex.ipa,
              vi: ex.vi,
              prompt: `Nghe từ "${ex.word}" (${ex.vi}) và chọn cách phát âm đuôi -ed đúng:`,
              targetSound: rule.sound,
              ruleCondition: rule.condition,
              ruleMnemonic: rule.mnemonic,
              viNote,
              options: [
                { sound: '/t/', isCorrect: rule.sound === '/t/' },
                { sound: '/d/', isCorrect: rule.sound === '/d/' },
                { sound: '/ɪd/', isCorrect: rule.sound === '/ɪd/' }
              ]
            });
          });
        });
      }

      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      s.questions = shuffled.slice(0, 10);
      s.currentIndex = 0;
      s.answered = false;
      s.selectedOption = null;
      s.isCorrect = false;
      s.stats = { correct: 0, total: 0 };
    },

    renderEnConfusingTab() {
      const s = this.enConfusingState;
      if (!s.questions || s.questions.length === 0) {
        this.initEnConfusingQuestions();
      }
      if (s.currentIndex >= s.questions.length) {
        return this.renderEnConfusingSummary();
      }

      const q = s.questions[s.currentIndex];

      return `
        <div class="speak-confusing-section speak-english-theme">
          <div class="confusing-header-card">
            <div class="level-switcher-bar">
              <span class="switcher-label">Chuyên đề âm:</span>
              <div class="pill-group">
                <button type="button" class="pill-btn ${s.category === 'all' ? 'active' : ''}" data-cat="all">Tất cả (10 câu)</button>
                <button type="button" class="pill-btn ${s.category === 'minimal' ? 'active' : ''}" data-cat="minimal">Cặp âm tối thiểu</button>
                <button type="button" class="pill-btn ${s.category === 'final_s' ? 'active' : ''}" data-cat="final_s">Đuôi -s / -es</button>
                <button type="button" class="pill-btn ${s.category === 'final_ed' ? 'active' : ''}" data-cat="final_ed">Đuôi -ed</button>
              </div>
              <div class="score-badge">Đúng: <strong>${s.stats.correct}</strong> / ${s.questions.length}</div>
            </div>
          </div>

          <div class="confusing-quiz-card">
            <div class="quiz-top-info">
              <span>Câu ${s.currentIndex + 1} / ${s.questions.length}</span>
              <span class="score-badge">Đúng: <strong>${s.stats.correct}</strong> / ${s.questions.length}</span>
            </div>

            <div class="quiz-audio-center">
              <span class="sub-instruction">${q.prompt}</span>
              <div class="audio-action-center" style="margin-top:0.75rem;">
                <button type="button" class="btn-play-audio-large" id="btn-play-en-confusing">
                  <span class="audio-wave-anim">${ic('volume')}</span>
                  <span>Nghe Phát Âm (en-US)</span>
                </button>
              </div>
            </div>

            <div class="confusing-options-grid ${q.type === 'minimal_pair' ? 'two-cols' : 'three-cols'}">
              ${q.options.map((opt, idx) => {
                let btnCls = 'confusing-opt-btn';
                if (s.answered) {
                  if (opt.isCorrect) btnCls += ' correct';
                  else if (s.selectedOption === idx) btnCls += ' wrong';
                  else btnCls += ' disabled';
                }
                const label = q.type === 'minimal_pair'
                  ? `<strong>${opt.word}</strong> <span class="opt-ipa">${opt.ipa}</span> <small>(${opt.vi})</small>`
                  : `<strong class="opt-sound">${opt.sound}</strong>`;
                return `
                  <button type="button" class="${btnCls}" data-opt-idx="${idx}" ${s.answered ? 'disabled' : ''}>
                    ${label}
                  </button>
                `;
              }).join('')}
            </div>

            ${s.answered ? `
              <div class="quiz-feedback-card ${s.isCorrect ? 'correct' : 'wrong'}">
                <div class="feedback-msg">
                  ${s.isCorrect
                    ? `${ic('check-circle')} <strong>Chính xác!</strong> Bạn phân biệt âm rất chuẩn.`
                    : `${ic('x')} <strong>Chưa chính xác!</strong> Hãy nghe lại và lưu ý quy tắc bên dưới.`}
                </div>
                ${q.type === 'minimal_pair' ? `
                  <div class="feedback-detail">
                    Từ vừa phát âm là: <strong class="target-pinyin">${q.targetWord}</strong>
                  </div>
                  ${q.tip ? `<div class="stress-feedback-note">${ic('lightbulb')} <strong>Phân biệt:</strong> ${q.tip}</div>` : ''}
                ` : `
                  <div class="feedback-detail">
                    Từ: <strong>${q.word}</strong> (${q.ipa}) &rarr; Đuôi phát âm là: <strong>${q.targetSound}</strong>
                  </div>
                  <div class="stress-feedback-note">
                    ${ic('book')} <strong>Quy tắc:</strong> ${q.ruleCondition}. ${q.ruleMnemonic}
                  </div>
                  ${q.viNote ? `<div class="stress-feedback-note" style="margin-top:0.35rem;border-left-color:#eab308;">${ic('alert')} ${q.viNote}</div>` : ''}
                `}

                <div class="feedback-actions">
                  <button type="button" class="btn-secondary" id="btn-replay-feedback-en-confusing">${ic('volume')} Nghe lại từ này</button>
                  <button type="button" class="btn-primary" id="btn-next-en-confusing">
                    ${s.currentIndex + 1 >= s.questions.length ? 'Xem kết quả lượt &rarr;' : 'Câu tiếp theo &rarr;'}
                  </button>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    },

    renderEnConfusingSummary() {
      const s = this.enConfusingState;
      const total = s.questions.length;
      const correct = s.stats.correct;
      const percent = Math.round((correct / (total || 1)) * 100);
      const isPassed = percent >= 70;

      return `
        <div class="shadow-summary-card speak-english-theme">
          <div class="summary-header">
            <div class="summary-icon">${isPassed ? ic('trophy') : ic('target')}</div>
            <h3 class="summary-title">${isPassed ? 'Xuất Sắc! Hoàn Thành Bài Âm Dễ Nhầm' : 'Hoàn Thành Lượt Luyện Âm!'}</h3>
            <p class="summary-sub">${isPassed ? 'Khả năng phân biệt các cặp âm tối thiểu và đuôi -s/-ed của bạn rất vững.' : 'Hãy tiếp tục luyện tập thêm để làm quen với các âm dễ nhầm của người Việt.'}</p>
          </div>

          <div class="summary-stats-grid">
            <div class="stat-box">
              <span class="stat-value">${correct} / ${total}</span>
              <span class="stat-name">Số câu đúng</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">${percent}%</span>
              <span class="stat-name">Tỷ lệ chính xác</span>
            </div>
          </div>

          <div class="summary-actions">
            <button type="button" class="btn-primary" id="btn-restart-en-confusing">
              ${ic('refresh')} Luyện lượt mới (10 câu)
            </button>
          </div>
        </div>
      `;
    },

    bindEnConfusingEvents() {
      const s = this.enConfusingState;

      const catBtns = this.container.querySelectorAll('.confusing-header-card .pill-btn');
      catBtns.forEach(btn => {
        btn.onclick = () => {
          const cat = btn.getAttribute('data-cat');
          this.initEnConfusingQuestions(cat);
          this.refreshPane();
        };
      });

      const btnPlay = this.container.querySelector('#btn-play-en-confusing');
      if (btnPlay) {
        btnPlay.onclick = () => {
          const q = s.questions[s.currentIndex];
          if (q) AudioService.speak(q.audioText, 0.75, null, 'en-US');
        };
      }

      const btnReplay = this.container.querySelector('#btn-replay-feedback-en-confusing');
      if (btnReplay) {
        btnReplay.onclick = () => {
          const q = s.questions[s.currentIndex];
          if (q) AudioService.speak(q.audioText, 0.75, null, 'en-US');
        };
      }

      const optBtns = this.container.querySelectorAll('.confusing-opt-btn');
      optBtns.forEach(btn => {
        btn.onclick = () => {
          if (s.answered) return;
          const idx = parseInt(btn.getAttribute('data-opt-idx'), 10);
          const q = s.questions[s.currentIndex];
          if (!q) return;

          s.answered = true;
          s.selectedOption = idx;
          s.stats.total++;
          s.isCorrect = q.options[idx] && q.options[idx].isCorrect;
          if (s.isCorrect) {
            s.stats.correct++;
            if (window.Economy && typeof window.Economy.reward === 'function') {
              window.Economy.reward('speakPass');
            }
          }
          this.refreshPane();
        };
      });

      const btnNext = this.container.querySelector('#btn-next-en-confusing');
      if (btnNext) {
        btnNext.onclick = () => {
          s.currentIndex++;
          s.answered = false;
          s.selectedOption = null;
          s.isCorrect = false;
          this.refreshPane();
        };
      }

      const btnRestart = this.container.querySelector('#btn-restart-en-confusing');
      if (btnRestart) {
        btnRestart.onclick = () => {
          this.initEnConfusingQuestions(s.category);
          this.refreshPane();
        };
      }
    },

    // ------------------------------------------------------------------------
    // UI REFRESH HELPER
    // ------------------------------------------------------------------------
    refreshPane() {
      const pane = this.container.querySelector('#speak-pane-container');
      if (pane) {
        pane.innerHTML = this.renderActiveTabContent();
        this.bindPaneEvents();
      }
    }
  };

  /* ==========================================================================
     5. Global Attachment & Node.js Exports
     ========================================================================== */

  if (typeof window !== 'undefined') {
    window.SpeakPractice = SpeakPractice;
    window.normalizeHanzi = normalizeHanzi;
    window.scoreRecognition = scoreRecognition;
    window.scoreEnglishRecognition = scoreEnglishRecognition;
    window.expandEnglishContractions = expandEnglishContractions;
    window.getStressSyllableFromIpa = getStressSyllableFromIpa;
    window.splitEnglishWordSyllables = splitEnglishWordSyllables;
    window.formatWordWithStress = formatWordWithStress;
    window.getEnglishPronunciationAdvice = getEnglishPronunciationAdvice;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      normalizeHanzi,
      scoreRecognition,
      scoreEnglishRecognition,
      expandEnglishContractions,
      getStressSyllableFromIpa,
      splitEnglishWordSyllables,
      formatWordWithStress,
      getEnglishPronunciationAdvice,
      TONE_INFO,
      TONE_PAIRS,
      SINGLE_TONE_DRILL,
      CONFUSING_GROUPS,
      SpeakPractice
    };
  }
})();
