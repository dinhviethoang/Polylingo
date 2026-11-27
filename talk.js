/**
 * talk.js - Luyện nói tiếng Trung (Speech & Roleplay Practice)
 * Nền tảng học đa ngôn ngữ Polylingo cho người Việt.
 * Hỗ trợ 2 chế độ:
 *  1. Nói từng từ (Word Drill): chọn theo bài học đã học / toàn bộ HSK1, nhận xét chi tiết âm đầu/vần/thanh.
 *  2. Trò chuyện nhập vai (Roleplay): 8 kịch bản đàm thoại tương tác với NPC, phân tích phản xạ & phát âm.
 */

(function () {
  'use strict';

  const LOCAL_ICONS = {
    'bot': '<rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16.01"></line><line x1="16" y1="16" x2="16.01" y2="16"></line>',
    'drama': '<path d="M10 11h.01"></path><path d="M14 11h.01"></path><path d="M10 15a4 4 0 0 0 4 0"></path><path d="m2 5 2-2h16l2 2v8a10 10 0 0 1-20 0V5z"></path>',
    'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
    'bar-chart': '<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>'
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
     1. PURE PHONETIC & LINGUISTIC HELPER FUNCTIONS
     ========================================================================== */

  const TONE_CHAR_MAP = {
    'ā': ['a', 1], 'á': ['a', 2], 'ǎ': ['a', 3], 'à': ['a', 4],
    'ē': ['e', 1], 'é': ['e', 2], 'ě': ['e', 3], 'è': ['e', 4],
    'ī': ['i', 1], 'í': ['i', 2], 'ǐ': ['i', 3], 'ì': ['i', 4],
    'ō': ['o', 1], 'ó': ['o', 2], 'ǒ': ['o', 3], 'ò': ['o', 4],
    'ū': ['u', 1], 'ú': ['u', 2], 'ǔ': ['u', 3], 'ù': ['u', 4],
    'ǖ': ['ü', 1], 'ǘ': ['ü', 2], 'ǚ': ['ü', 3], 'ǜ': ['ü', 4],
    'Ā': ['a', 1], 'Á': ['a', 2], 'Ǎ': ['a', 3], 'À': ['a', 4],
    'Ē': ['e', 1], 'É': ['e', 2], 'Ě': ['e', 3], 'È': ['e', 4],
    'Ī': ['i', 1], 'Í': ['i', 2], 'Ǐ': ['i', 3], 'Ì': ['i', 4],
    'Ō': ['o', 1], 'Ó': ['o', 2], 'Ǒ': ['o', 3], 'Ò': ['o', 4],
    'Ū': ['u', 1], 'Ú': ['u', 2], 'Ǔ': ['u', 3], 'Ù': ['u', 4],
    'Ǖ': ['ü', 1], 'Ǘ': ['ü', 2], 'Ǚ': ['ü', 3], 'Ǜ': ['ü', 4]
  };

  const INITIALS = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's', 'y', 'w'];

  // Bảng bổ sung pinyin cho các chữ đơn lẻ thường dùng trong hội thoại
  const SUPPLEMENTARY_CHARS = {
    '是': 'shì', '四': 'sì', '十': 'shí', '买': 'mǎi', '卖': 'mài',
    '你': 'nǐ', '好': 'hǎo', '我': 'wǒ', '他': 'tā', '她': 'tā',
    '大': 'dà', '卫': 'wèi', '李': 'lǐ', '明': 'míng', '王': 'wáng',
    '茶': 'chá', '咖': 'kā', '啡': 'fēi', '吃': 'chī', '喝': 'hē',
    '苹': 'píng', '果': 'guǒ', '西': 'xī', '瓜': 'guā', '学': 'xué',
    '生': 'shēng', '老': 'lǎo', '师': 'shī', '钱': 'qián', '块': 'kuài',
    '斤': 'jīn', '贵': 'guì', '便': 'pián', '宜': 'yi', '医': 'yī',
    '院': 'yuàn', '车': 'chē', '站': 'zhàn', '走': 'zǒu', '去': 'qù',
    '越': 'yuè', '南': 'nán', '中': 'zhōng', '国': 'guó', '见': 'jiàn',
    '明': 'míng', '天': 'tiān', '再': 'zài', '谢': 'xiè', '谁': 'shéi',
    '哪': 'nǎ', '儿': 'ér', '几': 'jǐ', '岁': 'suì', '作': 'zuò', '业': 'yè'
  };

  /**
   * Chuẩn hóa chữ Hán: loại bỏ toàn bộ dấu câu (tiếng Trung & quốc tế) và khoảng trắng.
   */
  function normalizeHanzi(s) {
    if (!s || typeof s !== 'string') return '';
    return s.replace(/[\s\p{P}\p{S}]/gu, '');
  }

  /**
   * Bỏ dấu tiếng Việt và pinyin để so khớp văn bản gõ tự do
   */
  function stripAccents(str) {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D')
      .replace(/ü/g, 'u').replace(/Ü/g, 'U')
      .toLowerCase()
      .trim();
  }

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
   * Phân đoạn từ pinyin liền (như xièxie, duìbuqǐ) thành các âm tiết
   */
  function segmentPinyinWord(word) {
    if (!word) return [];
    if (word.includes("'")) {
      return word.split("'").flatMap(segmentPinyinWord);
    }
    const chars = word.split('');
    const plainChars = chars.map(c => {
      if (TONE_CHAR_MAP[c]) return TONE_CHAR_MAP[c][0].toLowerCase();
      return c.toLowerCase();
    });

    function solve(start) {
      if (start === chars.length) return [];
      for (let len = Math.min(6, chars.length - start); len >= 1; len--) {
        const subPlain = plainChars.slice(start, start + len).join('').replace(/u:/g, 'ü').replace(/v/g, 'ü');
        if (VALID_PINYIN.has(subPlain)) {
          if (start + len < chars.length) {
            const nextFirst = plainChars[start + len];
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
   * Tách chuỗi pinyin thành danh sách âm tiết.
   * Xử lý cả chuỗi có dấu cách hoặc viết liền (xièxie, fànguǎn).
   */
  function splitPinyin(py) {
    if (!py || typeof py !== 'string') return [];
    const clean = py.replace(/[.,!?:;\"'“”‘’–—…·]/g, ' ').trim();
    if (!clean) return [];

    const tokens = clean.split(/\s+/).filter(Boolean);
    return tokens.flatMap(segmentPinyinWord);
  }

  /**
   * Tách âm tiết Pinyin thành { initial, final, tone }
   * Ví dụ:
   *  shì -> { initial: 'sh', final: 'i', tone: 4 }
   *  lǜ  -> { initial: 'l',  final: 'ü', tone: 4 }
   *  ér  -> { initial: '',   final: 'er', tone: 2 }
   *  zhuàng -> { initial: 'zh', final: 'uang', tone: 4 }
   */
  function parseSyllable(syl) {
    if (!syl) return { initial: '', final: '', tone: 5 };
    let s = String(syl).trim().toLowerCase();
    let tone = 5;

    // Kiểm tra số thanh ở cuối (vd: shi4, lv4, er2)
    const numMatch = s.match(/[1-5]$/);
    if (numMatch) {
      tone = parseInt(numMatch[0], 10);
      s = s.slice(0, -1);
    }

    // Chuyển ký tự nguyên âm có dấu thanh sang dạng gốc
    let clean = '';
    for (const ch of s) {
      if (TONE_CHAR_MAP[ch]) {
        clean += TONE_CHAR_MAP[ch][0];
        tone = TONE_CHAR_MAP[ch][1];
      } else {
        clean += ch;
      }
    }

    // Chuẩn hóa u: và v thành ü
    clean = clean.replace(/u:/g, 'ü').replace(/v/g, 'ü');

    let initial = '';
    let final = clean;

    for (const init of INITIALS) {
      if (clean.startsWith(init)) {
        initial = init;
        final = clean.slice(init.length);
        break;
      }
    }

    return { initial, final, tone };
  }

  /**
   * Xây dựng từ điển tra cứu nhanh { [chữ Hán đơn]: pinyin } từ kho CHAR_PINYIN và HSK1_WORDS
   */
  function buildCharPinyinMap(words, baseMap) {
    const globalCharPy = (typeof window !== 'undefined' && window.CHAR_PINYIN) || {};
    const map = Object.assign({}, SUPPLEMENTARY_CHARS, globalCharPy);
    if (baseMap) {
      Object.assign(map, baseMap);
    }
    if (!words) return map;

    const entries = Array.isArray(words)
      ? words.map(w => [w.hanzi || w.zh, w])
      : Object.entries(words);

    // Lượt 1: Các từ đơn 1 chữ Hán
    for (const [key, val] of entries) {
      if (!key || !val) continue;
      const py = typeof val === 'string' ? val : (val.py || val.pinyin || '');
      if (!py) continue;
      if (key.length === 1) {
        if (!map[key]) {
          map[key] = py.trim().split(/\s+/)[0];
        }
      }
    }

    // Lượt 2: Tách âm tiết từ các từ ghép nhiều chữ
    for (const [key, val] of entries) {
      if (!key || !val || key.length <= 1) continue;
      const py = typeof val === 'string' ? val : (val.py || val.pinyin || '');
      if (!py) continue;
      const parts = py.trim().split(/\s+/);
      if (parts.length === key.length) {
        for (let i = 0; i < key.length; i++) {
          if (!map[key[i]]) {
            map[key[i]] = parts[i];
          }
        }
      }
    }

    return map;
  }

  /**
   * So sánh chữ Hán mong đợi và chữ Hán nhận diện được, đưa ra chẩn đoán ngữ âm chi tiết cho người Việt.
   * @param {string} expectedChar Chữ đích (vd: '是')
   * @param {string} heardChar Chữ máy nghe được (vd: '四')
   * @param {Object} map Bảng tra pinyin
   * @returns {{ type: 'ok'|'initial'|'final'|'tone'|'unknown', advice: string, expectedPy?: string, heardPy?: string, diff?: Object }}
   */
  function diagnose(expectedChar, heardChar, map) {
    if (!expectedChar) {
      return { type: 'unknown', advice: 'Không có dữ liệu đối chiếu.' };
    }

    if (expectedChar === heardChar) {
      return { type: 'ok', advice: 'Phát âm chuẩn xác!' };
    }

    const charMap = map || (typeof window !== 'undefined' && window.CHAR_PINYIN) || SUPPLEMENTARY_CHARS;
    const expPy = charMap[expectedChar];
    const hrdPy = charMap[heardChar];

    if (!expPy || !hrdPy) {
      return {
        type: 'unknown',
        advice: `Máy nhận diện được "${heardChar}". Bạn hãy nghe lại mẫu và đọc rõ ràng từng âm tiết nhé.`,
        expectedPy: expPy || '',
        heardPy: hrdPy || ''
      };
    }

    const exp = parseSyllable(expPy);
    const hrd = parseSyllable(hrdPy);

    // 1. Phân loại lỗi Âm đầu (Initial)
    if (exp.initial !== hrd.initial) {
      let advice = `Bạn đọc ${heardChar} (${hrdPy}) thay vì ${expectedChar} (${expPy}): `;

      // Xử lý tự nhiên khi âm tiết không có phụ âm đầu (zero-initial)
      if (!exp.initial && hrd.initial) {
        advice += `từ đích không có phụ âm đầu, bạn lại thêm âm ${hrd.initial}. Hãy mở khẩu hình trực tiếp vào nguyên âm nhé.`;
      } else if (exp.initial && !hrd.initial) {
        advice += `từ đích bắt đầu bằng phụ âm "${exp.initial}", bạn lại không phát âm âm đầu. Hãy bật rõ âm "${exp.initial}" trước khi vào vần.`;
      } else {
        const pairKey = [exp.initial, hrd.initial].sort().join('-');
        if ((exp.initial === 'sh' && hrd.initial === 's') || (exp.initial === 's' && hrd.initial === 'sh')) {
          advice += 'đầu lưỡi cong lên chạm sau lợi trên khi phát âm sh (uốn lưỡi), còn s là âm đầu lưỡi phẳng.';
        } else if (pairKey === 'j-zh' || pairKey === 'z-zh') {
          advice += 'zh là âm uốn lưỡi (đầu lưỡi cong lên vòm họng), khác với z đầu lưỡi thẳng hoặc j mặt lưỡi áp sát ngạc.';
        } else if (pairKey === 'c-ch' || pairKey === 'ch-q') {
          advice += 'cả ch và c/q đều bật hơi mạnh, nhưng ch phải uốn cong đầu lưỡi lên vòm họng.';
        } else if (pairKey === 'sh-x' || pairKey === 's-x') {
          advice += 'x là âm mặt lưỡi dẹt nhẹ nhàng, còn sh uốn cong lưỡi sâu vào trong.';
        } else if (pairKey === 'l-r' || pairKey === 'd-r') {
          advice += 'r tiếng Trung đầu lưỡi uốn lên vòm họng rung nhẹ, không thả lỏng như l và không đánh lưỡi mạnh.';
        } else if (pairKey === 'b-p') {
          advice += 'p là âm bật hơi mạnh (mím môi thổi luồng hơi dứt khoát làm bay tờ giấy), còn b không bật hơi.';
        } else if (pairKey === 'd-t') {
          advice += 't là âm bật hơi dứt khoát (đầu lưỡi giật nhanh thổi hơi mạnh), còn d phát âm như "t" tiếng Việt không bật hơi.';
        } else if (pairKey === 'g-k') {
          advice += 'k là âm cuống lưỡi bật hơi mạnh, còn g không bật hơi (nghe như "c/k" tiếng Việt).';
        } else if (pairKey === 'c-z') {
          advice += 'c là âm đầu lưỡi bật hơi mạnh qua kẽ răng, còn z không bật hơi.';
        } else if (pairKey === 'ch-zh') {
          advice += 'ch là âm uốn lưỡi bật hơi mạnh, còn zh uốn lưỡi nhưng không bật hơi.';
        } else if (pairKey === 'j-q') {
          advice += 'q là âm mặt lưỡi bật hơi mạnh, còn j là âm mặt lưỡi không bật hơi.';
        } else if (pairKey === 'f-h') {
          advice += 'f là âm răng môi (răng trên chạm nhẹ môi dưới), còn h là âm cuống lưỡi đẩy luồng hơi từ cổ họng.';
        } else if (pairKey === 'l-n') {
          advice += 'n là âm mũi (luồng hơi qua khoang mũi), còn l là âm bên (đầu lưỡi chạm nướu trên luồng hơi thoát hai bên).';
        } else {
          // Lời khuyên cụ thể theo nhóm phụ âm cấu âm
          if (['zh', 'ch', 'sh', 'r'].includes(exp.initial)) {
            advice += `âm đầu "${exp.initial}" cần uốn cong đầu lưỡi lên vòm họng ngạc cứng, khác với âm "${hrd.initial}".`;
          } else if (['p', 't', 'k', 'q', 'ch', 'c'].includes(exp.initial)) {
            advice += `âm đầu "${exp.initial}" là âm bật hơi dứt khoát, cần thổi luồng hơi mạnh khác với âm "${hrd.initial}".`;
          } else if (['j', 'q', 'x'].includes(exp.initial)) {
            advice += `âm đầu "${exp.initial}" là âm mặt lưỡi áp sát ngạc cứng, khác với âm "${hrd.initial}".`;
          } else if (['z', 'c', 's'].includes(exp.initial)) {
            advice += `âm đầu "${exp.initial}" là âm đầu lưỡi phẳng áp sát mặt sau răng trên, khác với "${hrd.initial}".`;
          } else {
            advice += `chú ý phân biệt âm đầu "${exp.initial}" và âm "${hrd.initial}".`;
          }
        }
      }

      return {
        type: 'initial',
        advice,
        expectedPy: expPy,
        heardPy: hrdPy,
        diff: { exp: exp.initial, hrd: hrd.initial }
      };
    }

    // 2. Phân loại lỗi Vận mẫu (Final)
    if (exp.final !== hrd.final) {
      let advice = `Bạn đọc ${heardChar} (${hrdPy}) thay vì ${expectedChar} (${expPy}): `;
      const f1 = exp.final;
      const f2 = hrd.final;

      if ((f1 === 'ü' && f2 === 'u') || (f1 === 'u' && f2 === 'ü')) {
        advice += 'khi phát âm ü, đặt khẩu hình miệng như âm "i" nhưng môi chúm tròn xoe như thổi sáo và giữ yên, không mở to như u.';
      } else if ((f1 === 'an' && f2 === 'ang') || (f1 === 'ang' && f2 === 'an')) {
        advice += '-n là âm mũi trước (đầu lưỡi chạm lợi trên chặn hơi), còn -ang là âm mũi sau (cuống lưỡi chạm ngạc mềm, ngân vang sâu).';
      } else if ((f1 === 'en' && f2 === 'eng') || (f1 === 'eng' && f2 === 'en')) {
        advice += 'chú ý phân biệt vần en (mũi trước ngắn) và eng (mũi sau mở rộng vòm miệng ngân sâu).';
      } else if ((f1 === 'in' && f2 === 'ing') || (f1 === 'ing' && f2 === 'in')) {
        advice += 'in là âm mũi trước dẹt miệng, còn ing là âm mũi sau ngân sâu ở cổ họng.';
      } else if ((f1 === 'ian' && f2 === 'iang') || (f1 === 'iang' && f2 === 'ian')) {
        advice += 'ian là âm mũi trước đọc dẹt như "i-en", còn iang là âm mũi sau mở rộng vòm họng.';
      } else if ((f1 === 'uan' && f2 === 'uang') || (f1 === 'uang' && f2 === 'uan')) {
        advice += 'uan là âm mũi trước kết thúc ở răng, còn uang là âm mũi sau ngân sâu ở vòm họng.';
      } else if (f1.endsWith('ng') && !f2.endsWith('ng')) {
        advice += `vần "${f1}" là âm mũi sau, cần hạ cuống lưỡi để luồng hơi ngân vang trong vòm họng thay vì "${f2}".`;
      } else if (f1.endsWith('n') && f2.endsWith('ng')) {
        advice += `vần "${f1}" là âm mũi trước, đầu lưỡi chạm lợi trên để chặn hơi thay vì ngân sau "${f2}".`;
      } else if (f1.includes('ü')) {
        advice += `vần "${f1}" chứa nguyên âm tròn môi ü, cần giữ khẩu hình miệng chúm tròn cố định khi phát âm.`;
      } else {
        advice += `chú ý mở đúng khẩu hình cho vần "${f1}", khác với vần "${f2}".`;
      }

      return {
        type: 'final',
        advice,
        expectedPy: expPy,
        heardPy: hrdPy,
        diff: { exp: exp.final, hrd: hrd.final }
      };
    }

    // 3. Phân loại lỗi Thanh điệu (Tone)
    if (exp.tone !== hrd.tone) {
      let advice = `Bạn đọc ${heardChar} (${hrdPy} - Thanh ${hrd.tone}) thay vì ${expectedChar} (${expPy} - Thanh ${exp.tone}): `;

      if (exp.tone === 3 && hrd.tone === 4) {
        advice += 'Thanh 3 xuống thấp rồi hơi nâng nhẹ (214), còn Thanh 4 dứt khoát từ cao rơi xuống nhanh (51).';
      } else if (exp.tone === 4) {
        advice += 'Thanh 4 (51) cần phát âm dứt khoát, rơi nhanh từ cao xuống thấp như dậm chân, không đọc nhẹ giống dấu huyền tiếng Việt.';
      } else if (exp.tone === 1) {
        advice += 'Thanh 1 (55) giữ cao độ ngân đều, không ngắt quãng hay hạ giọng.';
      } else if (exp.tone === 2) {
        advice += 'Thanh 2 (35) vuốt từ tầm trung lên cao, giống dấu sắc nhưng ngân dài hơn.';
      } else if (exp.tone === 3) {
        advice += 'Thanh 3 (214) hạ giọng xuống sâu nhất cổ họng rồi hơi vểnh nhẹ, không đọc thành dấu hỏi.';
      } else if (exp.tone === 5) {
        advice += 'Thanh nhẹ (Thanh 5) phát âm thật ngắn, nhẹ và lướt qua, không nhấn giọng.';
      } else {
        advice += `chú ý kiểm soát cao độ của Thanh ${exp.tone} thay vì Thanh ${hrd.tone}.`;
      }

      return {
        type: 'tone',
        advice,
        expectedPy: expPy,
        heardPy: hrdPy,
        diff: { exp: exp.tone, hrd: hrd.tone }
      };
    }

    return {
      type: 'unknown',
      advice: `Bạn đọc ${heardChar} (${hrdPy}) thay vì ${expectedChar} (${expPy}). Hãy nghe lại mẫu và thử lại nhé!`,
      expectedPy: expPy,
      heardPy: hrdPy
    };
  }

  /**
   * So khớp ý định (Intent Matching) câu trả lời của người học theo kịch bản.
   */
  function matchIntent(transcript, accept) {
    if (!transcript || !accept) return { ok: false, slots: {} };
    const text = String(transcript).trim();
    const norm = normalizeHanzi(text);

    // 1. Kiểm tra required keywords trước
    if (accept.required && Array.isArray(accept.required)) {
      const hasAll = accept.required.every(kw => {
        const cleanKw = normalizeHanzi(kw);
        return norm.includes(cleanKw) || text.toLowerCase().includes(kw.toLowerCase());
      });
      if (!hasAll) return { ok: false, slots: {} };
    }

    // 2. Kiểm tra anyOf keywords nếu có
    if (accept.anyOf && Array.isArray(accept.anyOf) && accept.anyOf.length > 0) {
      const hasAny = accept.anyOf.some(kw => {
        const cleanKw = normalizeHanzi(kw);
        return norm.includes(cleanKw) || text.toLowerCase().includes(kw.toLowerCase());
      });
      if (!hasAny) return { ok: false, slots: {} };
    }

    // 3. Nếu accept là RegExp
    if (accept instanceof RegExp) {
      const match = text.match(accept) || norm.match(accept);
      if (match) {
        const slots = match.groups ? { ...match.groups } : (match[1] ? { name: match[1], value: match[1] } : {});
        return { ok: true, slots };
      }
      return { ok: false, slots: {} };
    }

    // 4. Nếu accept có thuộc tính pattern
    if (accept.pattern) {
      const regex = typeof accept.pattern === 'string' ? new RegExp(accept.pattern, 'i') : accept.pattern;
      const match = text.match(regex) || norm.match(regex);
      if (match) {
        const slots = match.groups ? { ...match.groups } : (match[1] ? { name: match[1], value: match[1] } : {});
        return { ok: true, slots };
      }
      return { ok: false, slots: {} };
    }

    // 5. Nếu accept là mảng chuỗi
    if (Array.isArray(accept)) {
      const hasAny = accept.some(kw => norm.includes(normalizeHanzi(kw)));
      return { ok: hasAny, slots: {} };
    }

    return { ok: true, slots: {} };
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

  function getEnglishPronunciationAdvice(target, missedWords = []) {
    const advice = [];
    const lowerTarget = (target || '').toLowerCase();
    if (/\b\w+(s|es|ed|t|d|k|p)\b/i.test(lowerTarget)) {
      advice.push("Chú ý phát âm rõ âm cuối (/s/, /t/, /d/), tránh nuốt âm như thói quen tiếng Việt.");
    }
    if (/th/i.test(lowerTarget)) {
      advice.push("Âm 'th' (/θ/ hoặc /ð/): Đặt đầu lưỡi giữa hai hàm răng và thổi luồng hơi nhẹ, tránh thay bằng /t/ hoặc /d/.");
    }
    if (/(sh|ch)/i.test(lowerTarget)) {
      advice.push("Âm 'sh' (/ʃ/) và 'ch' (/tʃ/): Chu tròn môi và bật hơi dứt khoát, phân biệt với /s/ nhẹ.");
    }
    if (missedWords.length > 0) {
      advice.unshift(`Cần chú ý phát âm rõ các từ: "${missedWords.slice(0, 3).join(', ')}".`);
    }
    return advice.length > 0 ? advice.join(' ') : "Phát âm tự nhiên, giữ nhịp điệu và ngữ điệu câu.";
  }

  function scoreEnglishRecognition(target, transcripts) {
    if (!target || typeof target !== 'string') {
      return { score: 0, perWord: [], perChar: [], best: '', advice: '' };
    }
    const rawTargetTokens = target.trim().split(/\s+/).filter(Boolean);
    const normTargetTokens = rawTargetTokens.map(tok => tok.replace(/[^\w]/g, '').toLowerCase()).filter(Boolean);
    const expandedTargetWords = tokenizeEnglish(target);

    const defaultPerWord = rawTargetTokens.map(tok => ({ word: tok, ok: false }));
    const candidateList = Array.isArray(transcripts) ? transcripts : [transcripts];

    if (candidateList.length === 0 || !candidateList[0]) {
      return {
        score: 0,
        perWord: defaultPerWord,
        perChar: defaultPerWord.map(w => ({ ch: w.word, ok: false })),
        best: '',
        advice: getEnglishPronunciationAdvice(target, normTargetTokens)
      };
    }

    let bestResult = { score: -1, bestCandidateText: '', matchedRawIndices: new Set() };

    for (const item of candidateList) {
      const rawText = typeof item === 'string' ? item : ((item && item.transcript) || '');
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
        bestResult = { score, bestCandidateText: rawText, matchedRawIndices };
      }
    }

    if (bestResult.score < 0) bestResult.score = 0;

    const perWord = rawTargetTokens.map((tok, idx) => ({
      word: tok,
      ok: bestResult.matchedRawIndices.has(idx)
    }));
    const perChar = perWord.map(w => ({ ch: w.word, ok: w.ok }));
    const missed = perWord.filter(w => !w.ok).map(w => w.word.replace(/[^\w]/g, ''));
    const advice = getEnglishPronunciationAdvice(target, missed);

    return {
      score: bestResult.score,
      perWord,
      perChar,
      best: bestResult.bestCandidateText,
      advice
    };
  }

  /**
   * Tính điểm phát âm câu người học so với danh sách câu mẫu answers
   * Tìm câu mẫu có điểm cao nhất bằng LCS character alignment.
   */
  function scoreTurn(transcript, answers) {
    if (!transcript) {
      return { score: 0, bestAnswer: null, perChar: [], transcript: '', matched: false };
    }

    const candidateList = Array.isArray(answers) ? answers : [answers];
    const isEn = candidateList.some(item => {
      const s = typeof item === 'string' ? item : (item.en || item.zh || item.hanzi || '');
      return /[a-zA-Z]/.test(s) && !/[\u4e00-\u9fa5]/.test(s);
    });

    if (isEn) {
      let bestScore = -1;
      let bestCandidate = null;
      let bestPerChar = [];
      let bestPerWord = [];
      let bestAdvice = '';

      for (const item of candidateList) {
        const targetStr = typeof item === 'string' ? item : (item.en || item.zh || item.hanzi || '');
        const res = scoreEnglishRecognition(targetStr, [transcript]);
        if (res.score > bestScore) {
          bestScore = res.score;
          bestCandidate = item;
          bestPerChar = res.perChar;
          bestPerWord = res.perWord;
          bestAdvice = res.advice;
        }
      }

      if (!bestCandidate && candidateList.length > 0) {
        bestCandidate = candidateList[0];
        bestScore = 0;
      }

      return {
        score: Math.max(0, bestScore),
        bestAnswer: bestCandidate,
        perChar: bestPerChar,
        perWord: bestPerWord,
        advice: bestAdvice,
        transcript: transcript,
        matched: bestScore >= 60
      };
    }

    let bestScore = -1;
    let bestCandidate = null;
    let bestPerChar = [];

    for (const item of candidateList) {
      const targetZh = typeof item === 'string' ? item : (item.zh || item.hanzi || '');
      const normTarget = normalizeHanzi(targetZh);
      const candNorm = normalizeHanzi(transcript);

      const targetChars = Array.from(normTarget);
      const candChars = Array.from(candNorm);

      if (targetChars.length === 0) continue;

      // LCS DP
      const n = targetChars.length;
      const m = candChars.length;
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

      const matchedT = new Array(n).fill(false);
      let i = n, j = m;
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

      if (score > bestScore) {
        bestScore = score;
        bestCandidate = item;
        bestPerChar = perChar;
      }
    }

    if (!bestCandidate && candidateList.length > 0) {
      bestCandidate = candidateList[0];
      bestScore = 0;
      bestPerChar = Array.from(normalizeHanzi(bestCandidate.zh || '')).map(ch => ({ ch, ok: false }));
    }

    return {
      score: Math.max(0, bestScore),
      bestAnswer: bestCandidate,
      perChar: bestPerChar,
      transcript: transcript,
      matched: bestScore >= 60
    };
  }

  /* ==========================================================================
     2. TALK PRACTICE CONTROLLER (UI & LIFECYCLE)
     ========================================================================== */

  const TalkPractice = {
    container: null,
    lang: 'zh',
    activeSubTab: 'words', // 'words' | 'roleplay'
    charPinyinMap: {},
    speechAvailable: false,
    recognition: null,
    isListening: false,
    interimText: '',

    // State cho Chế độ 1: Nói từng từ
    wordState: {
      scope: 'learned', // 'learned' | 'all' | 'topic'
      topic: '',
      wordList: [],
      currentIndex: 0,
      attempts: 0,
      maxAttempts: 3,
      history: [], // { word, score, bestTranscript, passed, advice }
      passedCount: 0,
      isFinished: false
    },

    // State cho Chế độ 2: Trò chuyện nhập vai
    roleplayState: {
      activeScenario: null, // object kịch bản đang chơi, null nếu ở lobby
      currentTurnId: null,
      messages: [], // { sender: 'npc'|'user'|'hint', zh, py, vi, score, advice, time }
      failCount: 0,
      turnStartTime: 0,
      totalResponseTime: 0,
      responseCount: 0,
      hintCount: 0,
      turnScores: [], // danh sách điểm từng turn
      commonErrors: [], // { expectedChar, heardChar, advice, count }
      isFinished: false
    },

    // State cho Chế độ 3: Đóng vai A-B (Roleplay A-B)
    roleabState: {
      activeDialogue: null,
      step: 'lobby', // 'lobby' | 'listen' | 'roleA' | 'interimA' | 'roleB' | 'summary'
      listenIdx: 0,
      isPlayingSample: false,
      sampleRate: 1.0,
      sampleTimer: null,
      currentRole: 'A', // 'A' | 'B'
      currentSentenceIdx: 0,
      supportLevel: 'full', // 'full' | 'pinyin' | 'meaning'
      turnResultsA: [],
      turnResultsB: [],
      currentAttempt: 0,
      waitingUserVoice: false,
      commonErrors: [],
      previousHistory: null,
      lastEvaluatedResult: null
    },

    /**
     * Gắn module vào container DOM
     */
    mount(el) {
      this.container = el;
      this.initSpeechRecognition();
      this.buildKnowledgeMap();
      this.render();
      this.bindGlobalEvents();
    },

    /**
     * Xây dựng từ điển pinyin từ CHAR_PINYIN và HSK1_WORDS
     */
    buildKnowledgeMap() {
      const words = (typeof window !== 'undefined' && window.HSK1_WORDS) || {};
      const charPy = (typeof window !== 'undefined' && window.CHAR_PINYIN) || {};
      this.charPinyinMap = buildCharPinyinMap(words, charPy);
    },

    /**
     * Vòng đời onShow: kích hoạt khi mở tab #zh/talk hoặc #en/talk
     */
    onShow(params = new URLSearchParams(), lang = 'zh') {
      const prevLang = this.lang;
      this.lang = lang || (window.app && window.app.currentLang) || 'zh';
      if (prevLang !== this.lang) {
        this.wordState.wordList = [];
        this.wordState.currentIndex = 0;
        this.roleplayState.activeScenario = null;
        this.roleabState.activeDialogue = null;
        this.roleabState.step = 'lobby';
      }
      this.buildKnowledgeMap();

      const sub = params.get('mode');
      if (sub === 'roleplay' || sub === 'scenario') {
        this.activeSubTab = 'roleplay';
        const scId = params.get('id');
        if (scId) {
          this.startScenario(scId);
          return;
        }
      } else if (sub === 'roleab' || sub === 'dialogue') {
        this.activeSubTab = 'roleab';
        const dId = params.get('id');
        if (dId) {
          this.startRoleAb(dId);
          return;
        }
      } else if (sub === 'words') {
        this.activeSubTab = 'words';
      }

      this.render();
    },

    /**
     * Vòng đời onHide: dừng mic, dừng TTS
     */
    onHide() {
      this.stopListening();
      if (this.roleabState && this.roleabState.sampleTimer) {
        clearTimeout(this.roleabState.sampleTimer);
        this.roleabState.sampleTimer = null;
      }
      if (this.roleabState) {
        this.roleabState.isPlayingSample = false;
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    },

    /**
     * Khởi tạo Web Speech API
     */
    initSpeechRecognition() {
      if (typeof window === 'undefined') return;

      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRec) {
        this.speechAvailable = false;
        return;
      }

      try {
        const rec = new SpeechRec();
        rec.lang = this.lang === 'en' ? 'en-US' : 'zh-CN';
        rec.continuous = false;
        rec.interimResults = true;
        rec.maxAlternatives = 5;

        rec.onstart = () => {
          this.isListening = true;
          this.interimText = '';
          this.updateMicUi();
        };

        rec.onresult = (e) => {
          let interim = '';
          const results = [];
          for (let i = e.resultIndex; i < e.results.length; ++i) {
            const res = e.results[i];
            if (res.isFinal) {
              for (let j = 0; j < res.length; j++) {
                results.push(res[j].transcript);
              }
            } else {
              interim += res[0].transcript;
            }
          }

          if (interim) {
            this.interimText = interim;
            this.updateInterimDisplay(interim);
          }

          if (results.length > 0) {
            this.handleRecognitionComplete(results);
          }
        };

        rec.onerror = (e) => {
          this.isListening = false;
          this.updateMicUi();
          if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
            this.showMicPermissionNotice();
          }
        };

        rec.onend = () => {
          this.isListening = false;
          this.updateMicUi();
        };

        this.recognition = rec;
        this.speechAvailable = true;
      } catch (err) {
        this.speechAvailable = false;
      }
    },

    /**
     * Bật / tắt nhận diện giọng nói
     */
    toggleListening() {
      if (!this.speechAvailable || !this.recognition) {
        this.promptTypingModal(`Trình duyệt chưa hỗ trợ nhận diện giọng nói ${this.lang === 'en' ? 'tiếng Anh' : 'tiếng Trung'}.`);
        return;
      }

      if (this.recognition) {
        this.recognition.lang = this.lang === 'en' ? 'en-US' : 'zh-CN';
      }

      if (this.isListening) {
        this.stopListening();
      } else {
        try {
          this.recognition.start();
        } catch (err) {
          try {
            this.recognition.abort();
            setTimeout(() => this.recognition.start(), 150);
          } catch (e) {
            this.promptTypingModal('Không thể khởi động micro.');
          }
        }
      }
    },

    stopListening() {
      if (this.recognition && this.isListening) {
        try {
          this.recognition.stop();
        } catch (e) {}
        this.isListening = false;
        this.updateMicUi();
      }
    },

    /**
     * Phát âm thanh mẫu bằng Web Speech Synthesis
     */
    speakText(text, rate = 1.0) {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      const ttsLang = this.lang === 'en' ? 'en-US' : 'zh-CN';
      utter.lang = ttsLang;
      utter.rate = rate;
      if (window.app && window.app.audio && typeof window.app.audio.getVoiceForLang === 'function') {
        const v = window.app.audio.getVoiceForLang(ttsLang);
        if (v) utter.voice = v;
      }
      window.speechSynthesis.speak(utter);
    },

    /* ==========================================================================
       3. MODE 1: NÓI TỪNG TỪ (WORD DRILL)
       ========================================================================== */

    /**
     * Tải danh sách từ vựng theo phạm vi được chọn
     */
    loadWordsForDrill() {
      const s = this.wordState;
      let words = [];

      if (this.lang === 'en') {
        const rawEn = typeof window !== 'undefined' ? window.EN_WORDS : null;
        const enWords = rawEn ? (Array.isArray(rawEn) ? rawEn : Object.values(rawEn)) : [];
        if (s.scope === 'learned') {
          try {
            const rawProgress = typeof localStorage !== 'undefined' ? localStorage.getItem('en_learn_progress_v1') : null;
            const learnedWords = new Set();
            if (rawProgress) {
              const progress = JSON.parse(rawProgress);
              const finishedLessons = new Set();
              if (progress && progress.lessons) {
                Object.entries(progress.lessons).forEach(([lesId, lData]) => {
                  if (lData && (lData.stars > 0 || lData.completed)) {
                    finishedLessons.add(lesId);
                  }
                });
              }
              const curr = window.EN_CURRICULUM || window.CURRICULUM_EN;
              if (curr && Array.isArray(curr.levels)) {
                curr.levels.forEach(lvl => {
                  (lvl.units || []).forEach(unit => {
                    (unit.lessons || []).forEach(les => {
                      if (finishedLessons.has(les.id) && Array.isArray(les.newWords)) {
                        les.newWords.forEach(w => {
                          const wt = typeof w === 'string' ? w : (w && (w.word || w.en || w.hanzi));
                          if (wt) learnedWords.add(wt.toLowerCase());
                        });
                      }
                    });
                  });
                });
              }
            }
            if (learnedWords.size > 0) {
              words = enWords.filter(w => learnedWords.has((w.word || '').toLowerCase()));
            }
          } catch (e) {}
          if (words.length === 0) {
            words = enWords.slice(0, 20);
          }
        } else if (s.scope === 'all') {
          words = enWords.slice(0, 30);
        } else {
          words = s.topic ? enWords.filter(w => w.topic === s.topic) : enWords.slice(0, 15);
        }
        words = words.map(w => ({
          hanzi: w.word,
          word: w.word,
          en: w.word,
          py: w.ipa || '',
          ipa: w.ipa || '',
          vi: w.vi || '',
          topic: w.topic || ''
        }));
        s.wordList = words;
        s.currentIndex = 0;
        s.attempts = 0;
        s.history = [];
        s.passedCount = 0;
        s.isFinished = false;
        return;
      }

      if (s.scope === 'learned') {
        // Lấy từ các bài đã hoàn thành trong Lộ trình
        try {
          const rawProgress = typeof localStorage !== 'undefined' ? localStorage.getItem('zh_learn_progress_v1') : null;
          const learnedHanzi = new Set();
          if (rawProgress) {
            const progress = JSON.parse(rawProgress);
            const finishedLessons = new Set();
            if (progress && progress.lessons) {
              Object.entries(progress.lessons).forEach(([lesId, lData]) => {
                if (lData && (lData.stars > 0 || lData.completed)) {
                  finishedLessons.add(lesId);
                }
              });
            }

            if (window.CURRICULUM && Array.isArray(window.CURRICULUM.levels)) {
              window.CURRICULUM.levels.forEach(lvl => {
                (lvl.units || []).forEach(unit => {
                  (unit.lessons || []).forEach(les => {
                    if (finishedLessons.has(les.id) && Array.isArray(les.newWords)) {
                      les.newWords.forEach(w => {
                        const hz = typeof w === 'string' ? w : (w && w.hanzi);
                        if (hz) learnedHanzi.add(hz);
                      });
                    }
                  });
                });
              });
            }
          }

          if (learnedHanzi.size > 0 && window.HSK1_WORDS) {
            for (const hz of learnedHanzi) {
              if (window.HSK1_WORDS[hz]) {
                words.push({ hanzi: hz, ...window.HSK1_WORDS[hz] });
              }
            }
          }
        } catch (e) {}

        // Nếu chưa học bài nào, fallback sang các từ thông dụng cơ bản
        if (words.length === 0 && window.HSK1_WORDS) {
          const defaults = ['你好', '谢谢', '再见', '我是', '水', '茶', '吃', '喝', '好', '四', '是', '买', '苹果'];
          for (const hz of defaults) {
            if (window.HSK1_WORDS[hz]) words.push({ hanzi: hz, ...window.HSK1_WORDS[hz] });
          }
        }
      } else if (s.scope === 'all') {
        if (window.HSK1_WORDS) {
          words = Object.entries(window.HSK1_WORDS).slice(0, 30).map(([hz, info]) => ({ hanzi: hz, ...info }));
        }
      } else {
        // Theo chủ đề
        if (window.HSK1_WORDS) {
          words = Object.entries(window.HSK1_WORDS).slice(0, 15).map(([hz, info]) => ({ hanzi: hz, ...info }));
        }
      }

      s.wordList = words;
      s.currentIndex = 0;
      s.attempts = 0;
      s.history = [];
      s.passedCount = 0;
      s.isFinished = false;
    },

    /**
     * Xử lý kết quả nhận diện giọng nói ở Chế độ 1
     */
    evaluateWord(recognizedTranscripts) {
      const s = this.wordState;
      const current = s.wordList[s.currentIndex];
      if (!current) return;

      const target = current.hanzi || current.zh || '';
      const turnScore = scoreTurn(recognizedTranscripts[0] || '', [{ zh: target }]);
      const score = turnScore.score;
      const heard = turnScore.transcript || '';

      // Chẩn đoán lỗi từng chữ Hán
      const charAdvices = [];
      const targetChars = Array.from(normalizeHanzi(target));
      const heardChars = Array.from(normalizeHanzi(heard));

      for (let i = 0; i < targetChars.length; i++) {
        const expCh = targetChars[i];
        const hrdCh = heardChars[i] || '';
        if (hrdCh && expCh !== hrdCh) {
          const diag = diagnose(expCh, hrdCh, this.charPinyinMap);
          if (diag.type !== 'ok') {
            charAdvices.push(diag.advice);
          }
        }
      }

      s.attempts++;
      const isPass = score >= 70;

      if (isPass) {
        s.passedCount++;
        if (typeof window !== 'undefined' && window.Economy && typeof window.Economy.reward === 'function') {
          window.Economy.reward('speakPass');
        }
      }

      s.lastResult = {
        score,
        isPass,
        heard,
        perChar: turnScore.perChar,
        advices: charAdvices
      };

      this.renderWordCard();
    },

    nextWord() {
      const s = this.wordState;
      s.currentIndex++;
      s.attempts = 0;
      s.lastResult = null;

      if (s.currentIndex >= s.wordList.length) {
        s.isFinished = true;
      }
      this.render();
    },

    retryWord() {
      const s = this.wordState;
      s.lastResult = null;
      this.renderWordCard();
    },

    /* ==========================================================================
       4. MODE 2: TRÒ CHUYỆN NHẬP VAI (ROLEPLAY)
       ========================================================================== */

    startScenario(scenarioId) {
      const scenarios = this.lang === 'en'
        ? ((typeof window !== 'undefined' && (window.TALK_SCENARIOS_EN || window.EN_TALK_SCENARIOS)) || [])
        : ((typeof window !== 'undefined' && window.TALK_SCENARIOS) || []);
      const sc = scenarios.find(item => item.id === scenarioId) || scenarios[0];
      if (!sc) return;

      this.activeSubTab = 'roleplay';
      const r = this.roleplayState;
      r.activeScenario = sc;
      r.currentTurnId = sc.initialTurn || 't1';
      r.messages = [];
      r.failCount = 0;
      r.turnStartTime = Date.now();
      r.totalResponseTime = 0;
      r.responseCount = 0;
      r.hintCount = 0;
      r.turnScores = [];
      r.commonErrors = [];
      r.isFinished = false;

      // Đẩy tin nhắn mở đầu của NPC
      const firstTurn = sc.turns[r.currentTurnId];
      if (firstTurn && firstTurn.npc) {
        const npcText = firstTurn.npc.en || firstTurn.npc.zh;
        const npcPhonetic = firstTurn.npc.ipa || firstTurn.npc.py || '';
        r.messages.push({
          sender: 'npc',
          zh: npcText,
          py: npcPhonetic,
          vi: firstTurn.npc.vi,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        // Tự động phát âm thanh lời chào của NPC
        setTimeout(() => this.speakText(npcText, 1.0), 300);
      }

      this.render();
    },

    /**
     * Xử lý lượt nói của người học trong kịch bản
     */
    evaluateRoleplayTurn(transcript) {
      const r = this.roleplayState;
      const sc = r.activeScenario;
      if (!sc || !r.currentTurnId) return;

      const turn = sc.turns[r.currentTurnId];
      if (!turn || !turn.user) return;

      // Đo thời gian phản hồi
      const elapsed = Math.max(1, Math.round((Date.now() - r.turnStartTime) / 1000));
      r.totalResponseTime += elapsed;
      r.responseCount++;

      // 1. Kiểm tra khớp ý định
      const intentResult = matchIntent(transcript, turn.user.accept);

      // 2. Chấm điểm phát âm so với câu mẫu
      const turnScore = scoreTurn(transcript, turn.user.answers);

      // 3. Phân tích lỗi phát âm trên các chữ sai
      // SỬA LỖI A1: Chỉ chẩn đoán phát âm khi câu khớp ý HOẶC độ giống câu mẫu >= 50%
      const isIntentOrSimilar = intentResult.ok || turnScore.score >= 50;
      const detectedAdvices = [];

      if (isIntentOrSimilar) {
        const bestAnsZh = (turnScore.bestAnswer && turnScore.bestAnswer.zh) || '';
        const expChars = Array.from(normalizeHanzi(bestAnsZh));
        const hrdChars = Array.from(normalizeHanzi(transcript));

        for (let i = 0; i < Math.min(expChars.length, hrdChars.length); i++) {
          if (expChars[i] !== hrdChars[i]) {
            const diag = diagnose(expChars[i], hrdChars[i], this.charPinyinMap);
            if (diag.type !== 'ok' && diag.advice) {
              detectedAdvices.push(diag.advice);
              // Lưu vào danh sách lỗi lặp
              const errKey = `${expChars[i]}->${hrdChars[i]}`;
              const existing = r.commonErrors.find(e => e.key === errKey);
              if (existing) {
                existing.count++;
              } else {
                r.commonErrors.push({
                  key: errKey,
                  expectedChar: expChars[i],
                  heardChar: hrdChars[i],
                  advice: diag.advice,
                  count: 1
                });
              }
            }
          }
        }
      }

      // Đẩy tin nhắn của người học vào dòng chat
      r.messages.push({
        sender: 'user',
        zh: transcript,
        score: turnScore.score,
        isIntentOk: intentResult.ok,
        offTopic: !isIntentOrSimilar,
        advices: detectedAdvices,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      r.turnScores.push(turnScore.score);

      // Xử lý chuyển lượt hoặc Fallback
      if (isIntentOrSimilar) {
        // Khớp ý hoặc đọc tốt -> Chuyển sang lượt kế tiếp
        r.failCount = 0;
        let nextTurnId = turn.user.next;

        // Xử lý rẽ nhánh đơn giản nếu có branch
        if (turn.user.branch && turn.user.branch.choices) {
          for (const choice of turn.user.branch.choices) {
            if (choice.match && choice.match.test(transcript)) {
              nextTurnId = choice.next;
              break;
            }
          }
        }

        if (nextTurnId && sc.turns[nextTurnId]) {
          r.currentTurnId = nextTurnId;
          const nextTurn = sc.turns[nextTurnId];
          setTimeout(() => {
            r.messages.push({
              sender: 'npc',
              zh: nextTurn.npc.zh,
              py: nextTurn.npc.py,
              vi: nextTurn.npc.vi,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            r.turnStartTime = Date.now();
            this.speakText(nextTurn.npc.zh, 1.0);
            this.render();
            this.scrollToChatBottom();
          }, 600);
        } else {
          // Kết thúc kịch bản hội thoại
          setTimeout(() => this.finishRoleplay(), 800);
        }
      } else {
        // Không khớp ý -> NPC hỏi lại
        r.failCount++;
        const fallbackText = turn.user.fallback || '不好意思，请再说一遍。';
        setTimeout(() => {
          r.messages.push({
            sender: 'npc',
            zh: fallbackText,
            py: 'Bù hǎoyìsi, qǐng zài shuō yí biàn.',
            vi: 'Xin lỗi, bạn có thể nói lại một lần nữa không?',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });

          // Sau 2 lần không khớp -> Tự động hiện gợi ý
          if (r.failCount >= 2) {
            r.hintCount++;
            r.messages.push({
              sender: 'hint',
              goal: turn.user.goal,
              answers: turn.user.answers
            });
          }

          r.turnStartTime = Date.now();
          this.speakText(fallbackText, 1.0);
          this.render();
          this.scrollToChatBottom();
        }, 500);
      }

      this.render();
      this.scrollToChatBottom();
    },

    /**
     * Kết thúc kịch bản và hiển thị màn hình tổng kết
     */
    finishRoleplay() {
      const r = this.roleplayState;
      r.isFinished = true;

      // Tính điểm trung bình phát âm
      const totalScore = r.turnScores.reduce((a, b) => a + b, 0);
      const avgScore = r.turnScores.length > 0 ? Math.round(totalScore / r.turnScores.length) : 80;

      // Điểm hoàn thành nhiệm vụ
      const completionRate = Math.min(100, Math.round((r.turnScores.length / 5) * 100));

      // Thưởng kinh tế: 15 xu, 20 XP, 1 nước
      if (typeof window !== 'undefined' && window.Economy && typeof window.Economy.earn === 'function') {
        window.Economy.earn('talk', { coins: 15, xp: 20, water: 1 });
      }

      // Lưu lịch sử vào localStorage
      try {
        const historyKey = `${this.lang || 'zh'}_talk_history`;
        const raw = localStorage.getItem(historyKey);
        const history = raw ? JSON.parse(raw) : {};
        const scId = r.activeScenario ? r.activeScenario.id : 'unknown';
        const prevBest = (history[scId] && history[scId].bestScore) || 0;

        history[scId] = {
          completedCount: ((history[scId] && history[scId].completedCount) || 0) + 1,
          bestScore: Math.max(prevBest, avgScore),
          lastScore: avgScore,
          lastPlayed: new Date().toISOString()
        };
        localStorage.setItem(historyKey, JSON.stringify(history));
      } catch (e) {}

      this.render();
    },

    exitScenario() {
      this.roleplayState.activeScenario = null;
      this.roleplayState.isFinished = false;
      this.render();
    },

    scrollToChatBottom() {
      setTimeout(() => {
        if (!this.container) return;
        const chatBox = this.container.querySelector('#talk-chat-stream') || this.container.querySelector('#roleab-chat-stream');
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
      }, 50);
    },

    showHint() {
      const r = this.roleplayState;
      const sc = r.activeScenario;
      if (!sc || !r.currentTurnId) return;

      const turn = sc.turns[r.currentTurnId];
      if (!turn || !turn.user) return;

      r.hintCount++;
      r.messages.push({
        sender: 'hint',
        goal: turn.user.goal,
        answers: turn.user.answers
      });
      this.render();
      this.scrollToChatBottom();
    },

    promptTypingModal(reason) {
      const val = window.prompt(`${reason || 'Nhập câu trả lời bằng chữ Hán hoặc Pinyin'}:`);
      if (val && val.trim()) {
        this.handleRecognitionComplete([val.trim()]);
      }
    },

    handleRecognitionComplete(transcripts) {
      if (this.activeSubTab === 'words') {
        this.evaluateWord(transcripts);
      } else if (this.activeSubTab === 'roleplay') {
        this.evaluateRoleplayTurn(transcripts[0] || '');
      } else if (this.activeSubTab === 'roleab') {
        this.handleRoleInput(transcripts[0] || '');
      }
    },

    /* ==========================================================================
       5. RENDERING & DOM BUILDERS
       ========================================================================== */

    render() {
      if (!this.container) return;

      this.container.innerHTML = `
        <div class="talk-page-wrap">
          <!-- Top Sub-Navigation Tabs -->
          <div class="talk-nav-header">
            <div class="talk-tabs-pill">
              <button class="talk-tab-btn ${this.activeSubTab === 'words' ? 'active' : ''}" data-sub="words">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                <span>Nói từng từ</span>
              </button>
              <button class="talk-tab-btn ${this.activeSubTab === 'roleplay' ? 'active' : ''}" data-sub="roleplay">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
                <span>Trò chuyện nhập vai</span>
              </button>
              <button class="talk-tab-btn ${this.activeSubTab === 'roleab' ? 'active' : ''}" data-sub="roleab">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>Đóng vai A–B</span>
              </button>
            </div>
          </div>

          <!-- Main Sub-Pane -->
          <div class="talk-main-pane">
            ${this.activeSubTab === 'words' ? this.renderWordsPane() : (this.activeSubTab === 'roleplay' ? this.renderRoleplayPane() : this.renderRoleAbPane())}
          </div>
        </div>
      `;

      this.bindPaneEvents();
    },

    renderWordsPane() {
      const s = this.wordState;
      if (s.wordList.length === 0) {
        this.loadWordsForDrill();
      }

      if (s.isFinished) {
        return this.renderWordsSummary();
      }

      const cur = s.wordList[s.currentIndex];
      if (!cur) return '<div class="talk-empty-box">Không có từ vựng nào để luyện tập.</div>';

      const pySyllables = splitPinyin(cur.py || '');

      return `
        <div class="talk-words-container">
          <!-- Filter Toolbar -->
          <div class="talk-words-toolbar">
            <div class="talk-scope-selector">
              <label>Phạm vi luyện tập:</label>
              <select id="talk-scope-select" class="form-select">
                <option value="learned" ${s.scope === 'learned' ? 'selected' : ''}>Từ đã học trong Lộ trình</option>
                <option value="all" ${s.scope === 'all' ? 'selected' : ''}>Toàn bộ từ vựng HSK1</option>
              </select>
            </div>
            <div class="talk-progress-badge">
              Từ <strong>${s.currentIndex + 1}</strong> / ${s.wordList.length}
            </div>
          </div>

          <!-- Word Card -->
          <div class="talk-word-card" id="talk-active-word-card">
            ${this.renderWordCardInner(cur, pySyllables)}
          </div>
        </div>
      `;
    },

    renderWordCardInner(cur, pySyllables) {
      const s = this.wordState;
      const res = s.lastResult;

      return `
        <div class="talk-card-header">
          <div class="talk-hanzi-display">${cur.hanzi || cur.zh}</div>
          <div class="talk-pinyin-display">${cur.py || ''}</div>
          <div class="talk-meaning-display">${cur.vi || ''} ${cur.hv ? `(${cur.hv})` : ''}</div>
        </div>

        <!-- Audio Sample Buttons -->
        <div class="talk-audio-actions">
          <button class="btn btn-outline btn-sm talk-btn-audio" data-rate="1.0" title="Nghe tốc độ chuẩn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            Nghe mẫu (1.0x)
          </button>
          <button class="btn btn-outline btn-sm talk-btn-audio" data-rate="0.7" title="Nghe chậm rõ âm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
            Nghe chậm (0.7x)
          </button>
        </div>

        <!-- Syllable Evaluation Display -->
        <div class="talk-syllables-row">
          ${pySyllables.map((syl, i) => {
            let statusClass = 'syllable-pending';
            if (res) {
              const charOk = res.perChar && res.perChar[i] && res.perChar[i].ok;
              statusClass = charOk ? 'syllable-correct' : 'syllable-wrong';
            }
            return `<span class="talk-syl-chip ${statusClass}">${syl}</span>`;
          }).join('')}
        </div>

        <!-- Interactive Voice Mic Area -->
        <div class="talk-mic-zone">
          <button class="talk-big-mic-btn ${this.isListening ? 'listening' : ''}" id="talk-mic-trigger" title="Nhấn để nói">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          </button>
          <div class="talk-mic-hint">
            ${this.isListening ? '<span class="talk-wave-anim"></span> Đang nghe... hãy phát âm to rõ' : 'Nhấn nút Micro và đọc từ trên'}
          </div>
          <div class="talk-interim-text" id="talk-interim-display">${this.interimText || ''}</div>
        </div>

        <!-- Result Feedback Box -->
        ${res ? `
          <div class="talk-feedback-panel ${res.isPass ? 'pass' : 'fail'}">
            <div class="talk-feedback-head">
              <span class="talk-score-tag ${res.isPass ? 'score-green' : 'score-orange'}">${res.score}%</span>
              <strong>${res.isPass ? 'Xuất sắc! Đạt chuẩn phát âm.' : 'Cần điều chỉnh thêm.'}</strong>
              <span class="talk-heard-text">Máy nghe được: "${res.heard}"</span>
            </div>
            ${res.advices && res.advices.length > 0 ? `
              <div class="talk-advice-list">
                ${res.advices.map(ad => `<div class="talk-advice-item">${ic('lightbulb')} ${ad}</div>`).join('')}
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- Bottom Controls -->
        <div class="talk-card-footer">
          <button class="btn btn-ghost btn-sm" id="talk-btn-type-instead">${ic('keyboard')} Gõ thay vì nói</button>
          <div class="talk-footer-actions">
            ${res && !res.isPass && s.attempts < s.maxAttempts ? `
              <button class="btn btn-outline" id="talk-btn-retry">Thử lại (${s.maxAttempts - s.attempts} lượt)</button>
            ` : ''}
            <button class="btn btn-primary" id="talk-btn-next">
              ${s.currentIndex + 1 >= s.wordList.length ? 'Xem kết quả' : 'Từ tiếp theo →'}
            </button>
          </div>
        </div>
      `;
    },

    renderWordsSummary() {
      const s = this.wordState;
      const total = s.wordList.length;
      const passPct = total > 0 ? Math.round((s.passedCount / total) * 100) : 0;

      return `
        <div class="talk-summary-card">
          <div class="talk-summary-icon">${ic('trophy')}</div>
          <h2>Hoàn thành lượt luyện nói!</h2>
          <p>Bạn đã hoàn thành ${s.passedCount}/${total} từ đạt chuẩn (${passPct}%).</p>

          <div class="talk-summary-stats-row">
            <div class="talk-stat-box">
              <span class="talk-stat-val">${s.passedCount}</span>
              <span class="talk-stat-label">Từ đạt</span>
            </div>
            <div class="talk-stat-box">
              <span class="talk-stat-val">${total - s.passedCount}</span>
              <span class="talk-stat-label">Cần luyện lại</span>
            </div>
            <div class="talk-stat-box">
              <span class="talk-stat-val">${passPct}%</span>
              <span class="talk-stat-label">Tỷ lệ đạt</span>
            </div>
          </div>

          <div class="talk-summary-actions">
            <button class="btn btn-primary" id="talk-btn-restart-words">Luyện lại lượt mới</button>
            <a href="#zh/speak" class="btn btn-outline">Luyện âm dễ nhầm</a>
          </div>
        </div>
      `;
    },

    renderRoleplayPane() {
      const r = this.roleplayState;
      if (r.activeScenario) {
        return r.isFinished ? this.renderRoleplaySummary() : this.renderRoleplayChat();
      }
      return this.renderRoleplayLobby();
    },

    renderRoleplayLobby() {
      const scenarios = this.lang === 'en'
        ? ((typeof window !== 'undefined' && (window.TALK_SCENARIOS_EN || window.EN_TALK_SCENARIOS)) || [])
        : ((typeof window !== 'undefined' && window.TALK_SCENARIOS) || []);
      const historyKey = `${this.lang || 'zh'}_talk_history`;
      const rawHistory = typeof localStorage !== 'undefined' ? localStorage.getItem(historyKey) : null;
      const history = rawHistory ? JSON.parse(rawHistory) : {};

      return `
        <div class="talk-lobby-container">
          <div class="talk-lobby-intro">
            <h2>8 Tình huống Đàm thoại Thực tế</h2>
            <p>Nhập vai vào các ngữ cảnh hàng ngày với NPC người bản xứ, rèn phản xạ giao tiếp và tự tin cất tiếng nói.</p>
          </div>

          <div class="talk-scenarios-grid">
            ${scenarios.map(sc => {
              const hData = history[sc.id] || null;
              const bestScore = hData ? hData.bestScore : null;

              return `
                <div class="talk-scenario-card" data-scenario-id="${sc.id}">
                  <div class="talk-sc-top">
                    <div class="talk-sc-avatar-wrap">${sc.npc.avatarSvg || `<span class="talk-avatar-circle" style="background:${sc.npc.avatarColor}">${sc.npc.initials}</span>`}</div>
                    <div class="talk-sc-meta">
                      <span class="talk-badge-topic">${sc.topic}</span>
                      <h3 class="talk-sc-title">${sc.title}</h3>
                      <span class="talk-sc-npc-name">Đối thoại: <strong>${sc.npc.name}</strong> (${sc.npc.role})</span>
                    </div>
                  </div>
                  <p class="talk-sc-desc">${sc.description}</p>
                  <div class="talk-sc-footer">
                    <span class="talk-sc-history">
                      ${bestScore !== null ? `${ic('star')} Điểm cao nhất: <strong>${bestScore}%</strong>` : 'Chưa luyện tập'}
                    </span>
                    <button class="btn btn-primary btn-sm talk-btn-start-sc" data-scenario-id="${sc.id}">
                      Vào trò chuyện →
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    },

    renderRoleplayChat() {
      const r = this.roleplayState;
      const sc = r.activeScenario;
      if (!sc) return '';

      const currentTurn = sc.turns[r.currentTurnId];
      const goalText = currentTurn && currentTurn.user ? currentTurn.user.goal : '';

      return `
        <div class="talk-chat-wrapper">
          <!-- Chat Header -->
          <div class="talk-chat-header">
            <button class="btn btn-ghost btn-sm" id="talk-btn-exit-sc">← Đổi tình huống</button>
            <div class="talk-chat-header-info">
              <h4>${sc.title}</h4>
              <span class="talk-chat-npc-subtitle">Đang trò chuyện cùng ${sc.npc.name} (${sc.npc.role})</span>
            </div>
            <button class="btn btn-outline btn-sm" id="talk-btn-hint">${ic('lightbulb')} Gợi ý</button>
          </div>

          <!-- Chat Messages Scroll Area -->
          <div class="talk-chat-stream" id="talk-chat-stream">
            ${r.messages.map(msg => this.renderChatMessage(msg)).join('')}
          </div>

          <!-- Chat Bottom Bar -->
          <div class="talk-chat-bottom-bar">
            ${goalText ? `
              <div class="talk-goal-prompt">
                <span class="talk-goal-icon">${ic('target')}</span>
                <span>Nhiệm vụ: <strong>${goalText}</strong></span>
              </div>
            ` : ''}

            <div class="talk-chat-controls">
              <button class="btn btn-ghost btn-sm" id="talk-chat-type-btn">${ic('keyboard')} Gõ câu</button>

              <button class="talk-big-mic-btn ${this.isListening ? 'listening' : ''}" id="talk-chat-mic-btn" title="Nhấn để nói">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              </button>

              <div class="talk-chat-status">
                ${this.isListening ? '<span class="talk-wave-anim"></span> Đang nghe bạn...' : 'Bấm micro để trả lời'}
              </div>
            </div>
          </div>
        </div>
      `;
    },

    renderChatMessage(msg) {
      if (msg.sender === 'hint') {
        return `
          <div class="talk-msg-hint-box">
            <div class="talk-hint-title">${ic('lightbulb')} Gợi ý cách nói cho bạn:</div>
            <div class="talk-hint-goal">${msg.goal}</div>
            <div class="talk-hint-options">
              ${(msg.answers || []).map(ans => `
                <div class="talk-hint-ans-item" onclick="window.TalkPractice.speakText('${ans.zh}', 1.0)">
                  <span class="talk-hint-zh">${ans.zh}</span>
                  <span class="talk-hint-py">${ans.py}</span>
                  <span class="talk-hint-vi">${ans.vi}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      const isNpc = msg.sender === 'npc';
      return `
        <div class="talk-chat-bubble-wrap ${isNpc ? 'npc-wrap' : 'user-wrap'}">
          <div class="talk-chat-bubble ${isNpc ? 'bubble-npc' : 'bubble-user'}">
            <div class="talk-bubble-text">${msg.zh}</div>
            ${msg.py ? `<div class="talk-bubble-py">${msg.py}</div>` : ''}
            ${msg.vi ? `<div class="talk-bubble-vi">${msg.vi}</div>` : ''}

            ${isNpc ? `
              <button class="talk-bubble-audio-btn" onclick="window.TalkPractice.speakText('${msg.zh.replace(/'/g, "\\'")}', 1.0)" title="Nghe lại câu này">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                <span>Nghe lại</span>
              </button>
            ` : ''}

            ${!isNpc && msg.score !== undefined ? `
              <div class="talk-user-eval">
                ${msg.offTopic ? `
                  <span class="talk-eval-pill pill-yellow">${ic('alert')} Chưa đúng ý</span>
                  <div class="talk-msg-advice">Câu trả lời chưa đúng ý kịch bản, hãy nói đúng nội dung câu hỏi nhé.</div>
                ` : `
                  <span class="talk-eval-pill ${msg.score >= 70 ? 'pill-green' : 'pill-yellow'}">
                    ${msg.score}% ${msg.isIntentOk ? '• Đúng ý' : ''}
                  </span>
                  ${msg.advices && msg.advices.length > 0 ? `
                    <div class="talk-msg-advice">${msg.advices[0]}</div>
                  ` : ''}
                `}
              </div>
            ` : ''}
          </div>
          <span class="talk-msg-time">${msg.time || ''}</span>
        </div>
      `;
    },

    renderRoleplaySummary() {
      const r = this.roleplayState;
      const sc = r.activeScenario;
      const totalScore = r.turnScores.reduce((a, b) => a + b, 0);
      const avgScore = r.turnScores.length > 0 ? Math.round(totalScore / r.turnScores.length) : 85;
      const avgResponseTime = r.responseCount > 0 ? (r.totalResponseTime / r.responseCount).toFixed(1) : 3.5;

      // Sắp xếp top 3 lỗi lặp nhiều nhất
      const topErrors = r.commonErrors.sort((a, b) => b.count - a.count).slice(0, 3);

      return `
        <div class="talk-summary-card">
          <div class="talk-summary-icon">${ic('trophy')}</div>
          <h2>Tổng kết Hội thoại: ${sc ? sc.title : ''}</h2>
          <p>Chúc mừng bạn đã hoàn thành trọn vẹn kịch bản đàm thoại!</p>

          <div class="talk-reward-banner">
            ${ic('gift')} Phần thưởng hoàn thành: <strong>+15 Xu</strong> • <strong>+20 KN</strong> • <strong>+1 Giọt nước</strong>
          </div>

          <div class="talk-summary-stats-row">
            <div class="talk-stat-box">
              <span class="talk-stat-val">${avgScore}%</span>
              <span class="talk-stat-label">Phát âm</span>
            </div>
            <div class="talk-stat-box">
              <span class="talk-stat-val">100%</span>
              <span class="talk-stat-label">Nhiệm vụ</span>
            </div>
            <div class="talk-stat-box">
              <span class="talk-stat-val">${avgResponseTime}s</span>
              <span class="talk-stat-label">Phản xạ TB</span>
            </div>
          </div>

          ${topErrors.length > 0 ? `
            <div class="talk-top-errors-box">
              <h3>${ic('search')} 3 Lỗi phát âm cần lưu ý:</h3>
              <div class="talk-error-list">
                ${topErrors.map(err => `
                  <div class="talk-error-item">
                    <span class="talk-err-badge">${err.expectedChar} &rarr; ${err.heardChar}</span>
                    <span class="talk-err-advice">${err.advice}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : `
            <div class="talk-perfect-box">${ic('sparkle')} Phát âm của bạn rất chuẩn mực và lưu loát!</div>
          `}

          <div class="talk-summary-actions">
            <button class="btn btn-primary" id="talk-btn-replay-sc">Luyện lại tình huống này</button>
            <button class="btn btn-outline" id="talk-btn-back-lobby">Về sảnh chọn tình huống</button>
            <a href="#zh/speak" class="btn btn-ghost">Luyện âm dễ nhầm (#zh/speak)</a>
          </div>
        </div>
      `;
    },

    renderWordCard() {
      const card = this.container.querySelector('#talk-active-word-card');
      const cur = this.wordState.wordList[this.wordState.currentIndex];
      if (card && cur) {
        const pySyllables = splitPinyin(cur.py || '');
        card.innerHTML = this.renderWordCardInner(cur, pySyllables);
        this.bindWordCardEvents();
      }
    },

    updateMicUi() {
      if (!this.container) return;
      const micBtns = this.container.querySelectorAll('.talk-big-mic-btn');
      micBtns.forEach(btn => {
        if (this.isListening) btn.classList.add('listening');
        else btn.classList.remove('listening');
      });
    },

    updateInterimDisplay(text) {
      if (!this.container) return;
      const el = this.container.querySelector('#talk-interim-display');
      if (el) el.textContent = text ? `Đang nghe: ${text}` : '';
    },

    showMicPermissionNotice() {
      window.alert('Micro bị chặn hoặc không được cấp quyền. Bạn có thể sử dụng nút "Gõ thay vì nói" để tiếp tục.');
    },

    /* ==========================================================================
       4B. MODE 3: ĐÓNG VAI A–B (ROLEPLAY A-B)
       ========================================================================== */

    getRoleAbDialogues() {
      if (this.lang === 'en') {
        const talkDiaEn = (typeof window !== 'undefined' && (window.TALK_DIALOGUES_EN || window.EN_TALK_DIALOGUES)) || [];
        const baseDiaEn = (typeof window !== 'undefined' && (window.EN_DIALOGUES || window.DIALOGUES_EN)) || [];
        const normalizedBase = baseDiaEn.map(d => ({
          id: d.id,
          title: d.title,
          scene: d.scene || `Tình huống giao tiếp cơ bản theo chủ đề "${d.title}".`,
          roleA: d.roleA || { name: 'Người A', char: 'A', avatar: '' },
          roleB: d.roleB || { name: 'Người B', char: 'B', avatar: '' },
          sentences: (d.sentences || d.lines || []).map(line => ({
            who: line.who || 'A',
            zh: line.en || line.zh || '',
            en: line.en || line.zh || '',
            py: line.ipa || line.py || '',
            ipa: line.ipa || line.py || '',
            vi: line.vi || ''
          }))
        }));
        return talkDiaEn.length > 0 ? talkDiaEn : normalizedBase;
      }

      const talkDialogues = (typeof window !== 'undefined' && window.TALK_DIALOGUES) || [];
      const baseDialogues = (typeof window !== 'undefined' && window.DIALOGUES) || [];

      // Chuẩn hóa danh sách hội thoại từ DIALOGUES (data/zh/dialogues.js)
      const normalizedBase = baseDialogues.map(d => ({
        id: d.id,
        title: d.title,
        scene: d.scene || `Tình huống giao tiếp cơ bản theo chủ đề "${d.title}".`,
        roleA: d.roleA || { name: 'Người A', char: 'A', avatar: '' },
        roleB: d.roleB || { name: 'Người B', char: 'B', avatar: '' },
        sentences: (d.sentences || d.lines || []).map(line => ({
          who: line.who || 'A',
          zh: line.zh || '',
          py: line.py || '',
          vi: line.vi || ''
        }))
      }));

      return [...talkDialogues, ...normalizedBase];
    },

    getRoleAbHistory() {
      try {
        const historyKey = `${this.lang || 'zh'}_roleab_history`;
        const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(historyKey) : null;
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        return {};
      }
    },

    startRoleAb(dialogueId) {
      const list = this.getRoleAbDialogues();
      const d = list.find(item => item.id === dialogueId) || list[0];
      if (!d) return;

      this.activeSubTab = 'roleab';
      const ra = this.roleabState;
      ra.activeDialogue = d;
      ra.step = 'listen';
      ra.listenIdx = 0;
      ra.isPlayingSample = false;
      ra.sampleRate = 1.0;
      if (ra.sampleTimer) clearTimeout(ra.sampleTimer);
      ra.sampleTimer = null;
      ra.currentRole = 'A';
      ra.currentSentenceIdx = 0;
      ra.supportLevel = 'full';
      ra.turnResultsA = [];
      ra.turnResultsB = [];
      ra.currentAttempt = 0;
      ra.waitingUserVoice = false;
      ra.commonErrors = [];
      ra.lastEvaluatedResult = null;

      this.render();
    },

    exitRoleAb() {
      const ra = this.roleabState;
      if (ra.sampleTimer) clearTimeout(ra.sampleTimer);
      ra.sampleTimer = null;
      ra.isPlayingSample = false;
      this.stopListening();
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      ra.activeDialogue = null;
      ra.step = 'lobby';
      this.render();
    },

    speakTwoVoices(text, who, rate = 1.0, onEndCallback) {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        if (onEndCallback) setTimeout(onEndCallback, 1200);
        return;
      }
      window.speechSynthesis.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'zh-CN';
      utter.rate = rate;

      // Hai giọng khác nhau rõ rệt cho A và B:
      // Vai A: pitch 1.15, rate 0.95 (âm sắc cao/sáng)
      // Vai B: pitch 0.85, rate 1.0 (âm sắc trầm/ấm)
      const isRoleA = who === 'A';
      utter.pitch = isRoleA ? 1.15 : 0.85;

      try {
        const voices = window.speechSynthesis.getVoices().filter(v => v.lang && v.lang.startsWith('zh'));
        if (voices.length >= 2) {
          utter.voice = isRoleA ? voices[0] : voices[1];
        } else if (voices.length === 1) {
          utter.voice = voices[0];
        }
      } catch (e) {}

      let called = false;
      function done() {
        if (!called) {
          called = true;
          if (onEndCallback) onEndCallback();
        }
      }

      utter.onend = done;
      utter.onerror = done;

      window.speechSynthesis.speak(utter);
    },

    togglePlaySampleDialogue() {
      const ra = this.roleabState;
      if (ra.isPlayingSample) {
        ra.isPlayingSample = false;
        if (ra.sampleTimer) clearTimeout(ra.sampleTimer);
        ra.sampleTimer = null;
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        this.render();
      } else {
        ra.isPlayingSample = true;
        this.render();
        this.playCurrentSampleSentence();
      }
    },

    playCurrentSampleSentence() {
      const ra = this.roleabState;
      const d = ra.activeDialogue;
      if (!d || !ra.isPlayingSample) return;

      if (ra.listenIdx >= d.sentences.length) {
        ra.isPlayingSample = false;
        ra.listenIdx = 0;
        this.render();
        return;
      }

      const s = d.sentences[ra.listenIdx];
      this.updateListenHighlight(ra.listenIdx);

      this.speakTwoVoices(s.zh, s.who, ra.sampleRate, () => {
        if (!ra.isPlayingSample) return;
        ra.sampleTimer = setTimeout(() => {
          ra.listenIdx++;
          if (ra.listenIdx < d.sentences.length) {
            this.playCurrentSampleSentence();
          } else {
            ra.isPlayingSample = false;
            this.render();
          }
        }, 500);
      });
    },

    updateListenHighlight(idx) {
      if (!this.container) return;
      const allBubbles = this.container.querySelectorAll('.roleab-listen-item');
      allBubbles.forEach((el, i) => {
        if (i === idx) {
          el.classList.add('sentence-active');
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          el.classList.remove('sentence-active');
        }
      });
    },

    startRole(role) {
      const ra = this.roleabState;
      ra.step = role === 'A' ? 'roleA' : 'roleB';
      ra.currentRole = role;
      ra.currentSentenceIdx = 0;
      ra.currentAttempt = 0;
      ra.lastEvaluatedResult = null;
      if (role === 'A') ra.turnResultsA = [];
      else ra.turnResultsB = [];

      this.render();
      this.advanceRoleSequence();
    },

    advanceRoleSequence() {
      const ra = this.roleabState;
      const d = ra.activeDialogue;
      if (!d) return;

      if (ra.currentSentenceIdx >= d.sentences.length) {
        this.finishCurrentRole();
        return;
      }

      const curSent = d.sentences[ra.currentSentenceIdx];
      ra.lastEvaluatedResult = null;
      ra.currentAttempt = 0;

      if (curSent.who !== ra.currentRole) {
        // Lượt của máy (Partner)! Máy đọc tự động
        ra.waitingUserVoice = false;
        this.render();
        this.speakTwoVoices(curSent.zh, curSent.who, 1.0, () => {
          setTimeout(() => {
            ra.currentSentenceIdx++;
            this.advanceRoleSequence();
          }, 700);
        });
      } else {
        // Lượt của bạn! Dừng chờ micro hoặc gõ
        ra.waitingUserVoice = true;
        this.render();
      }
    },

    handleRoleInput(transcript) {
      const ra = this.roleabState;
      const d = ra.activeDialogue;
      if (!d || !ra.waitingUserVoice) return;

      const curSent = d.sentences[ra.currentSentenceIdx];
      if (!curSent) return;

      // 1. Chấm điểm phát âm bằng character alignment
      const turnScore = scoreTurn(transcript, [curSent]);
      const targetZh = normalizeHanzi(curSent.zh);
      const heardZh = normalizeHanzi(transcript);
      const targetChars = Array.from(targetZh);
      const heardChars = Array.from(heardZh);

      // Phân tích lỗi ngữ âm
      const charAdvices = [];
      for (let i = 0; i < Math.min(targetChars.length, heardChars.length); i++) {
        if (targetChars[i] !== heardChars[i]) {
          const diag = diagnose(targetChars[i], heardChars[i], this.charPinyinMap);
          if (diag.type !== 'ok' && diag.advice) {
            charAdvices.push(diag.advice);
            const errKey = `${targetChars[i]}->${heardChars[i]}`;
            const existing = ra.commonErrors.find(e => e.key === errKey);
            if (existing) {
              existing.count++;
            } else {
              ra.commonErrors.push({
                key: errKey,
                expectedChar: targetChars[i],
                heardChar: heardChars[i],
                advice: diag.advice,
                count: 1
              });
            }
          }
        }
      }

      const isPass = turnScore.score >= 60;
      const turnResult = {
        sentenceIdx: ra.currentSentenceIdx,
        zh: curSent.zh,
        transcript,
        score: turnScore.score,
        perChar: turnScore.perChar,
        advices: charAdvices,
        passed: isPass,
        attempt: ra.currentAttempt
      };

      ra.lastEvaluatedResult = turnResult;

      if (ra.currentRole === 'A') {
        ra.turnResultsA.push(turnResult);
      } else {
        ra.turnResultsB.push(turnResult);
      }

      if (isPass || ra.currentAttempt >= 1) {
        // Đạt hoặc đã thử lại 1 lần -> Chuyển câu kế tiếp
        ra.waitingUserVoice = false;
        this.render();
        setTimeout(() => {
          ra.currentSentenceIdx++;
          ra.currentAttempt = 0;
          this.advanceRoleSequence();
        }, 1200);
      } else {
        // Chưa đạt và còn lượt thử lại 1 lần
        ra.currentAttempt = 1;
        this.render();
      }
    },

    finishCurrentRole() {
      const ra = this.roleabState;
      ra.waitingUserVoice = false;

      // Thưởng kinh tế: mỗi vai xong Economy.earn('roleab', {coins:10, xp:15, water:1})
      if (typeof window !== 'undefined' && window.Economy && typeof window.Economy.earn === 'function') {
        window.Economy.earn('roleab', { coins: 10, xp: 15, water: 1 });
      }

      if (ra.currentRole === 'A') {
        ra.step = 'interimA';
        this.render();
      } else {
        this.finishBothRoles();
      }
    },

    finishBothRoles() {
      const ra = this.roleabState;
      ra.step = 'summary';

      // Tính điểm trung bình vai A và B
      const scoresA = ra.turnResultsA.map(r => r.score);
      const scoresB = ra.turnResultsB.map(r => r.score);
      const avgA = scoresA.length > 0 ? Math.round(scoresA.reduce((a, b) => a + b, 0) / scoresA.length) : 80;
      const avgB = scoresB.length > 0 ? Math.round(scoresB.reduce((a, b) => a + b, 0) / scoresB.length) : 80;

      // Lưu lịch sử vào localStorage
      try {
        const historyKey = `${this.lang || 'zh'}_roleab_history`;
        const raw = localStorage.getItem(historyKey);
        const history = raw ? JSON.parse(raw) : {};
        const dId = ra.activeDialogue ? ra.activeDialogue.id : 'unknown';
        const prev = history[dId] || null;

        ra.previousHistory = prev;

        history[dId] = {
          playCount: ((prev && prev.playCount) || 0) + 1,
          bestA: Math.max((prev && prev.bestA) || 0, avgA),
          bestB: Math.max((prev && prev.bestB) || 0, avgB),
          lastA: avgA,
          lastB: avgB,
          lastPlayed: new Date().toISOString()
        };
        localStorage.setItem(historyKey, JSON.stringify(history));
      } catch (e) {}

      this.render();
    },

    replayRoleAbWeakSentences() {
      const ra = this.roleabState;
      const d = ra.activeDialogue;
      if (!d) return;

      const weakA = ra.turnResultsA.filter(r => r.score < 70 || !r.passed).map(r => r.sentenceIdx);
      const weakB = ra.turnResultsB.filter(r => r.score < 70 || !r.passed).map(r => r.sentenceIdx);

      if (weakA.length === 0 && weakB.length === 0) {
        alert('Tất cả các câu trong bài đều đạt điểm xuất sắc!');
        return;
      }

      if (weakA.length >= weakB.length) {
        this.startRole('A');
      } else {
        this.startRole('B');
      }
    },

    drillWeakWordsInWordMode() {
      const ra = this.roleabState;
      const chars = ra.commonErrors.map(e => e.expectedChar).filter(Boolean);
      if (chars.length === 0) {
        this.activeSubTab = 'words';
        this.render();
        return;
      }

      const wordList = [];
      const globalWords = (typeof window !== 'undefined' && window.HSK1_WORDS) || {};
      for (const ch of chars) {
        if (globalWords[ch]) {
          wordList.push({ hanzi: ch, ...globalWords[ch] });
        } else {
          wordList.push({
            hanzi: ch,
            py: (this.charPinyinMap && this.charPinyinMap[ch]) || '',
            vi: 'Chữ Hán cần luyện tập phát âm'
          });
        }
      }

      this.wordState.wordList = wordList;
      this.wordState.currentIndex = 0;
      this.wordState.attempts = 0;
      this.wordState.passedCount = 0;
      this.wordState.isFinished = false;
      this.wordState.lastResult = null;

      this.activeSubTab = 'words';
      this.render();
    },

    /* ==========================================================================
       4C. MODE 3 DOM BUILDERS (LOBBY, LISTEN, ROLEPLAY, SUMMARY)
       ========================================================================== */

    renderRoleAbPane() {
      const ra = this.roleabState;
      if (!ra.activeDialogue || ra.step === 'lobby') {
        return this.renderRoleAbLobby();
      }
      if (ra.step === 'listen') {
        return this.renderRoleAbListen();
      }
      if (ra.step === 'roleA' || ra.step === 'roleB') {
        return this.renderRoleAbRolePlay();
      }
      if (ra.step === 'interimA') {
        return this.renderRoleAbInterimA();
      }
      if (ra.step === 'summary') {
        return this.renderRoleAbSummary();
      }
      return this.renderRoleAbLobby();
    },

    renderRoleAbProgressBar(currentStep) {
      const steps = [
        { id: 'listen', num: 1, label: 'Nghe mẫu cả bài' },
        { id: 'roleA', num: 2, label: 'Bạn đóng vai A' },
        { id: 'roleB', num: 3, label: 'Đổi vai: Bạn đóng vai B' }
      ];

      return `
        <div class="roleab-progress-wrap">
          <div class="roleab-progress-bar">
            ${steps.map((st, i) => {
              let status = 'pending';
              if (currentStep === 'summary') {
                status = 'done';
              } else if (currentStep === st.id || (currentStep === 'interimA' && st.id === 'roleA')) {
                status = 'active';
              } else if ((currentStep === 'roleA' && i === 0) ||
                         (currentStep === 'interimA' && i <= 1) ||
                         (currentStep === 'roleB' && i <= 1)) {
                status = 'done';
              }
              return `
                <div class="roleab-step-item ${status}">
                  <div class="roleab-step-circle">
                    ${status === 'done' ? ic('check') : st.num}
                  </div>
                  <span class="roleab-step-text">${st.label}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    },

    renderRoleAbLobby() {
      const dialogues = this.getRoleAbDialogues();
      const history = this.getRoleAbHistory();

      return `
        <div class="talk-lobby-container">
          <div class="talk-lobby-intro">
            <h2>${ic('drama')} Đóng vai A–B (Roleplay A-B)</h2>
            <p>Luyện tập đối thoại 2 chiều thực chiến: Nghe máy đọc 2 giọng mẫu, đóng vai A rồi đổi vai B. Nhận xét chuẩn xác theo ký tự & tích lũy kinh nghiệm.</p>
          </div>

          <div class="talk-roleab-grid">
            ${dialogues.map(item => {
              const h = history[item.id] || {};
              const hasCompletedBoth = h.bestA !== undefined && h.bestB !== undefined;

              return `
                <div class="talk-roleab-card">
                  <div class="roleab-card-head">
                    <div class="roleab-card-title-row">
                      <span class="roleab-topic-badge">${item.sentences.length} câu</span>
                      ${hasCompletedBoth ? `<span class="roleab-badge-completed">${ic('award')} Đã hoàn thành 2 vai</span>` : ''}
                    </div>
                    <h3 class="roleab-card-title">${item.title}</h3>
                  </div>

                  <p class="roleab-card-scene">${item.scene}</p>

                  <div class="roleab-roles-preview">
                    <div class="roleab-role-chip role-a">
                      <span class="role-avatar">${item.roleA.avatar || ic('user')}</span>
                      <span class="role-name">A: ${item.roleA.name}</span>
                    </div>
                    <div class="roleab-swap-arrow">⇄</div>
                    <div class="roleab-role-chip role-b">
                      <span class="role-avatar">${item.roleB.avatar || ic('user')}</span>
                      <span class="role-name">B: ${item.roleB.name}</span>
                    </div>
                  </div>

                  <div class="roleab-scores-row">
                    <div class="roleab-score-box">
                      <span class="score-label">Điểm vai A:</span>
                      <strong class="score-num ${h.bestA >= 70 ? 'text-green' : ''}">${h.bestA !== undefined ? h.bestA + '%' : '--'}</strong>
                    </div>
                    <div class="roleab-score-box">
                      <span class="score-label">Điểm vai B:</span>
                      <strong class="score-num ${h.bestB >= 70 ? 'text-green' : ''}">${h.bestB !== undefined ? h.bestB + '%' : '--'}</strong>
                    </div>
                  </div>

                  <button class="btn btn-primary roleab-start-btn talk-btn-start-roleab" data-dialogue-id="${item.id}">
                    Vào luyện tập →
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    },

    renderRoleAbListen() {
      const ra = this.roleabState;
      const d = ra.activeDialogue;
      if (!d) return '';

      return `
        <div class="roleab-session-wrap">
          ${this.renderRoleAbProgressBar('listen')}

          <!-- Session Header Bar -->
          <div class="roleab-session-header">
            <button class="btn btn-ghost btn-sm" id="roleab-btn-exit">← Danh sách bài</button>
            <div class="roleab-header-info">
              <h2>${d.title}</h2>
              <span class="roleab-scene-tag">Bối cảnh: ${d.scene}</span>
            </div>
          </div>

          <!-- Listen Controls Toolbar -->
          <div class="roleab-listen-toolbar">
            <div class="roleab-listen-controls">
              <button class="btn btn-primary" id="roleab-btn-play-sample">
                ${ra.isPlayingSample ? `${ic('pause')} Tạm dừng` : `${ic('play')} Nghe mẫu cả bài (2 giọng)`}
              </button>
              <button class="btn btn-outline btn-sm" id="roleab-btn-sample-rate">
                Tốc độ: ${ra.sampleRate}x
              </button>
            </div>
            <button class="btn btn-success" id="roleab-btn-to-role-a">
              Bắt đầu đóng vai A →
            </button>
          </div>

          <!-- Dialogue Flow Display (Left A / Right B) -->
          <div class="roleab-chat-stream">
            ${d.sentences.map((sent, idx) => {
              const isA = sent.who === 'A';
              const roleObj = isA ? d.roleA : d.roleB;
              const isHighlight = ra.isPlayingSample && ra.listenIdx === idx;

              return `
                <div class="roleab-listen-item ${isA ? 'side-left' : 'side-right'} ${isHighlight ? 'sentence-active' : ''}">
                  <div class="roleab-bubble ${isA ? 'bubble-a' : 'bubble-b'}">
                    <div class="roleab-bubble-meta">
                      <span class="roleab-avatar">${roleObj.avatar || ic('user')}</span>
                      <strong>${isA ? 'Vai A' : 'Vai B'}: ${roleObj.name}</strong>
                    </div>
                    <div class="roleab-bubble-zh">${sent.zh}</div>
                    <div class="roleab-bubble-py">${sent.py}</div>
                    <div class="roleab-bubble-vi">${sent.vi}</div>
                    <button class="roleab-btn-speak-one" onclick="window.TalkPractice.speakTwoVoices('${sent.zh.replace(/'/g, "\\'")}', '${sent.who}', 1.0)">
                      ${ic('volume')} Nghe câu này
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    },

    renderRoleAbRolePlay() {
      const ra = this.roleabState;
      const d = ra.activeDialogue;
      if (!d) return '';

      const isRoleA = ra.currentRole === 'A';
      const myRole = isRoleA ? d.roleA : d.roleB;
      const partnerRole = isRoleA ? d.roleB : d.roleA;
      const curSent = d.sentences[ra.currentSentenceIdx];
      const isMyTurn = curSent && curSent.who === ra.currentRole;
      const evalRes = ra.lastEvaluatedResult;

      return `
        <div class="roleab-session-wrap">
          ${this.renderRoleAbProgressBar(isRoleA ? 'roleA' : 'roleB')}

          <!-- Role Banner & Support Level Toggles -->
          <div class="roleab-role-banner">
            <div class="roleab-cur-role-badge">
              <span class="badge-role-avatar">${myRole.avatar || ic('target')}</span>
              <span>Bạn đang đóng: <strong>Vai ${ra.currentRole} - ${myRole.name}</strong></span>
            </div>
            <div class="roleab-support-toggles">
              <button class="roleab-support-btn ${ra.supportLevel === 'full' ? 'active' : ''}" data-level="full">Hiện đủ</button>
              <button class="roleab-support-btn ${ra.supportLevel === 'pinyin' ? 'active' : ''}" data-level="pinyin">Ẩn chữ Hán chỉ hiện pinyin</button>
              <button class="roleab-support-btn ${ra.supportLevel === 'meaning' ? 'active' : ''}" data-level="meaning">Chỉ hiện nghĩa tiếng Việt</button>
            </div>
          </div>

          <!-- Chronological Chat Flow so far -->
          <div class="roleab-chat-stream roleab-play-stream" id="roleab-chat-stream">
            ${d.sentences.slice(0, ra.currentSentenceIdx).map((sent) => {
              const isSentA = sent.who === 'A';
              const isUserSentence = sent.who === ra.currentRole;
              const roleObj = isSentA ? d.roleA : d.roleB;

              return `
                <div class="roleab-listen-item ${isSentA ? 'side-left' : 'side-right'} ${isUserSentence ? 'is-user-role' : ''}">
                  <div class="roleab-bubble ${isSentA ? 'bubble-a' : 'bubble-b'}">
                    <div class="roleab-bubble-meta">
                      <span class="roleab-avatar">${roleObj.avatar || ic('user')}</span>
                      <strong>${sent.who === 'A' ? 'Vai A' : 'Vai B'}: ${roleObj.name}</strong>
                      ${isUserSentence ? '<span class="roleab-pill-you">Bạn</span>' : ''}
                    </div>
                    <div class="roleab-bubble-zh">${sent.zh}</div>
                    <div class="roleab-bubble-py">${sent.py}</div>
                    <div class="roleab-bubble-vi">${sent.vi}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Active Sentence Action Card -->
          ${curSent ? `
            <div class="roleab-current-card ${isMyTurn ? 'my-turn-card' : 'partner-turn-card'}">
              <div class="roleab-card-status-head">
                <span class="roleab-step-counter">Câu ${ra.currentSentenceIdx + 1}/${d.sentences.length}</span>
                <span class="roleab-turn-title">
                  ${isMyTurn ? `${ic('target')} Đến lượt bạn phát âm (${myRole.name})` : `${ic('bot')} Máy đang đọc vai đối tác (${partnerRole.name})...`}
                </span>
              </div>

              <!-- Display based on supportLevel -->
              <div class="roleab-prompt-body">
                ${ra.supportLevel === 'full' ? `
                  <div class="roleab-prompt-zh">${curSent.zh}</div>
                  <div class="roleab-prompt-py">${curSent.py}</div>
                  <div class="roleab-prompt-vi">${curSent.vi}</div>
                ` : (ra.supportLevel === 'pinyin' ? `
                  <div class="roleab-prompt-zh roleab-masked">••••••••••</div>
                  <div class="roleab-prompt-py text-large">${curSent.py}</div>
                  <div class="roleab-prompt-vi">${curSent.vi}</div>
                ` : `
                  <div class="roleab-prompt-zh roleab-masked">••••••••••</div>
                  <div class="roleab-prompt-py roleab-masked">••••••••••</div>
                  <div class="roleab-prompt-vi text-large"><strong>${curSent.vi}</strong></div>
                  <div class="roleab-memory-hint">${ic('lightbulb')} Hãy phát âm câu tiếng Trung tương ứng theo trí nhớ!</div>
                `)}
              </div>

              ${isMyTurn ? `
                <!-- Character-by-character Scoring Display -->
                ${evalRes ? `
                  <div class="roleab-eval-panel ${evalRes.passed ? 'eval-pass' : 'eval-retry'}">
                    <div class="roleab-eval-score-row">
                      <span class="talk-score-tag ${evalRes.passed ? 'score-green' : 'score-orange'}">${evalRes.score}%</span>
                      <strong>${evalRes.passed ? `${ic('check')} Phát âm đạt chuẩn!` : 'Cần điều chỉnh thêm'}</strong>
                      <span class="talk-heard-text">Máy nghe được: "${evalRes.transcript}"</span>
                    </div>

                    <!-- Per-character chips -->
                    <div class="roleab-chars-eval">
                      ${(evalRes.perChar || []).map(c => `
                        <span class="roleab-char-chip ${c.ok ? 'char-ok' : 'char-wrong'}">
                          ${c.ch}
                        </span>
                      `).join('')}
                    </div>

                    ${evalRes.advices && evalRes.advices.length > 0 ? `
                      <div class="talk-advice-list">
                        ${evalRes.advices.map(ad => `<div class="talk-advice-item">${ic('lightbulb')} ${ad}</div>`).join('')}
                      </div>
                    ` : ''}

                    ${!evalRes.passed && ra.currentAttempt === 1 ? `
                      <div class="roleab-retry-notice">
                        <span>Lần 1 chưa đạt. Bạn có 1 lần thử lại!</span>
                        <div class="roleab-retry-actions">
                          <button class="btn btn-outline btn-sm" id="roleab-btn-retry-sentence">Thử lại lần nữa</button>
                          <button class="btn btn-primary btn-sm" id="roleab-btn-skip-sentence">Bỏ qua & Tiếp tục →</button>
                        </div>
                      </div>
                    ` : ''}
                  </div>
                ` : ''}

                <!-- Interactive Mic & Controls -->
                <div class="roleab-mic-zone">
                  <button class="talk-big-mic-btn ${this.isListening ? 'listening' : ''}" id="roleab-mic-btn" title="Nhấn để nói">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      <line x1="12" x2="12" y1="19" y2="22"/>
                    </svg>
                  </button>
                  <div class="talk-mic-hint">
                    ${this.isListening ? '<span class="talk-wave-anim"></span> Đang nghe bạn nói...' : 'Nhấn Micro và đọc câu trên'}
                  </div>
                  <div class="talk-interim-text" id="talk-interim-display">${this.interimText || ''}</div>
                  <button class="btn btn-ghost btn-sm" id="roleab-type-btn">${ic('keyboard')} Gõ thay vì nói</button>
                </div>
              ` : `
                <div class="roleab-partner-speaking-indicator">
                  <span class="talk-wave-anim"></span> Đối tác đang phát âm...
                </div>
              `}
            </div>
          ` : ''}
        </div>
      `;
    },

    renderRoleAbInterimA() {
      const ra = this.roleabState;
      const d = ra.activeDialogue;
      const scoresA = ra.turnResultsA.map(r => r.score);
      const avgA = scoresA.length > 0 ? Math.round(scoresA.reduce((a, b) => a + b, 0) / scoresA.length) : 80;
      const passedCount = ra.turnResultsA.filter(r => r.passed).length;
      const totalCount = ra.turnResultsA.length;

      return `
        <div class="talk-summary-card">
          <div class="talk-summary-icon">${ic('trophy')}</div>
          <h2>Hoàn thành vai A: ${d.roleA.name}!</h2>
          <p>Bạn đã hoàn thành xuất sắc nửa đầu bài đối thoại <strong>${d.title}</strong>.</p>

          <div class="talk-reward-banner">
            ${ic('gift')} Phần thưởng vai A: <strong>+10 Xu</strong> • <strong>+15 KN</strong> • <strong>+1 Giọt nước</strong>
          </div>

          <div class="talk-summary-stats-row">
            <div class="talk-stat-box">
              <span class="talk-stat-val">${avgA}%</span>
              <span class="talk-stat-label">Điểm vai A</span>
            </div>
            <div class="talk-stat-box">
              <span class="talk-stat-val">${passedCount}/${totalCount}</span>
              <span class="talk-stat-label">Số câu đạt</span>
            </div>
          </div>

          <div class="talk-summary-actions">
            <button class="btn btn-primary btn-lg" id="roleab-btn-to-role-b">
              Đổi vai: Bạn đóng vai B (${d.roleB.name}) →
            </button>
          </div>
        </div>
      `;
    },

    renderRoleAbSummary() {
      const ra = this.roleabState;
      const d = ra.activeDialogue;
      const scoresA = ra.turnResultsA.map(r => r.score);
      const scoresB = ra.turnResultsB.map(r => r.score);
      const avgA = scoresA.length > 0 ? Math.round(scoresA.reduce((a, b) => a + b, 0) / scoresA.length) : 80;
      const avgB = scoresB.length > 0 ? Math.round(scoresB.reduce((a, b) => a + b, 0) / scoresB.length) : 80;
      const totalAvg = Math.round((avgA + avgB) / 2);

      // Sắp xếp top 3 lỗi lặp nhiều nhất
      const topErrors = (ra.commonErrors || []).sort((a, b) => b.count - a.count).slice(0, 3);

      // Danh sách câu yếu/sai
      const weakSentences = [
        ...ra.turnResultsA.filter(r => r.score < 70).map(r => ({ ...r, role: 'Vai A' })),
        ...ra.turnResultsB.filter(r => r.score < 70).map(r => ({ ...r, role: 'Vai B' }))
      ];

      // So sánh với lần trước
      const prev = ra.previousHistory;
      let historyText = 'Lần đầu luyện tập trọn vẹn cả 2 vai! Kỷ lục mới đã được lưu.';
      if (prev && prev.lastA !== undefined && prev.lastB !== undefined) {
        const prevAvg = Math.round((prev.lastA + prev.lastB) / 2);
        const diff = totalAvg - prevAvg;
        if (diff > 0) {
          historyText = `${ic('trending-up')} Tiến bộ vượt bậc: Điểm trung bình tăng <strong>+${diff}%</strong> so với lần luyện trước (${prevAvg}% &rarr; ${totalAvg}%)!`;
        } else if (diff === 0) {
          historyText = `Giữ vững phong độ ổn định: Đạt <strong>${totalAvg}%</strong> giống như lần luyện trước.`;
        } else {
          historyText = `Lần này bạn đạt <strong>${totalAvg}%</strong> (lần trước ${prevAvg}%). Hãy luyện lại các câu chưa đạt nhé!`;
        }
      }

      return `
        <div class="talk-summary-card">
          <div class="talk-summary-icon">${ic('trophy')}</div>
          <h2>Tổng kết Đóng vai A–B: ${d ? d.title : ''}</h2>
          <p>Chúc mừng bạn đã hoàn thành trọn vẹn cả hai vai A & B trong hội thoại!</p>

          <div class="talk-reward-banner">
            ${ic('gift')} Phần thưởng hoàn thành 2 vai: <strong>+20 Xu</strong> • <strong>+30 KN</strong> • <strong>+2 Giọt nước</strong> (đã cộng sau 2 vai)
          </div>

          <!-- SVG Bar Chart comparing Role A vs Role B -->
          <div class="roleab-chart-card">
            <h3>${ic('bar-chart')} Biểu đồ điểm phát âm hai vai</h3>
            <div class="roleab-chart-wrap">
              <svg width="100%" height="150" viewBox="0 0 280 150">
                <line x1="30" y1="120" x2="250" y2="120" stroke="currentColor" stroke-opacity="0.2" stroke-width="2"/>
                <!-- Bar A -->
                <rect x="65" y="${120 - Math.max(10, avgA)}" width="45" height="${Math.max(10, avgA)}" rx="6" fill="#3b82f6"/>
                <text x="87" y="${110 - Math.max(10, avgA)}" text-anchor="middle" font-size="13" font-weight="bold" fill="#3b82f6">${avgA}%</text>
                <text x="87" y="138" text-anchor="middle" font-size="12" fill="currentColor">Vai A (${d.roleA.name.slice(0, 6)})</text>
                <!-- Bar B -->
                <rect x="170" y="${120 - Math.max(10, avgB)}" width="45" height="${Math.max(10, avgB)}" rx="6" fill="#10b981"/>
                <text x="192" y="${110 - Math.max(10, avgB)}" text-anchor="middle" font-size="13" font-weight="bold" fill="#10b981">${avgB}%</text>
                <text x="192" y="138" text-anchor="middle" font-size="12" fill="currentColor">Vai B (${d.roleB.name.slice(0, 6)})</text>
              </svg>
            </div>
            <div class="roleab-chart-avg">Điểm phát âm trung bình cả bài: <strong>${totalAvg}%</strong></div>
          </div>

          <!-- History Comparison -->
          <div class="roleab-history-compare-box">
            ${historyText}
          </div>

          <!-- Weak / Missed sentences review -->
          ${weakSentences.length > 0 ? `
            <div class="roleab-weak-sentences-box">
              <h3>${ic('alert')} Các câu cần cải thiện:</h3>
              <div class="roleab-weak-list">
                ${weakSentences.map(s => `
                  <div class="roleab-weak-item">
                    <span class="roleab-weak-tag">${s.role}</span>
                    <span class="roleab-weak-zh">${s.zh}</span>
                    <span class="roleab-weak-score">${s.score}%</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : `
            <div class="talk-perfect-box">${ic('sparkle')} Tuyệt vời! Bạn không để sót chữ nào trong suốt bài hội thoại!</div>
          `}

          <!-- Top 3 Repeated Errors with Advice -->
          ${topErrors.length > 0 ? `
            <div class="talk-top-errors-box">
              <h3>${ic('search')} 3 Lỗi phát âm lặp nhiều nhất & lời khuyên:</h3>
              <div class="talk-error-list">
                ${topErrors.map(err => `
                  <div class="talk-error-item">
                    <span class="talk-err-badge">${err.expectedChar} &rarr; ${err.heardChar} (${err.count} lần)</span>
                    <span class="talk-err-advice">${err.advice}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Action Buttons -->
          <div class="talk-summary-actions">
            ${weakSentences.length > 0 ? `
              <button class="btn btn-primary" id="roleab-btn-replay-wrong">${ic('refresh')} Luyện lại các câu sai</button>
            ` : ''}
            ${topErrors.length > 0 ? `
              <button class="btn btn-outline" id="roleab-btn-words-drill">${ic('book')} Luyện từ sai ở chế độ Nói từng từ</button>
            ` : ''}
            <button class="btn btn-ghost" id="roleab-btn-summary-lobby">${ic('home')} Chọn hội thoại khác</button>
          </div>
        </div>
      `;
    },

    /* ==========================================================================
       6. DOM EVENT BINDING
       ========================================================================== */

    bindGlobalEvents() {
      if (!this.container) return;

      this.container.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.talk-tab-btn');
        if (tabBtn) {
          const sub = tabBtn.getAttribute('data-sub');
          if (sub && sub !== this.activeSubTab) {
            this.activeSubTab = sub;
            this.render();
          }
          return;
        }

        const startScBtn = e.target.closest('.talk-btn-start-sc');
        if (startScBtn) {
          const scId = startScBtn.getAttribute('data-scenario-id');
          if (scId) this.startScenario(scId);
          return;
        }

        const startRoleAbBtn = e.target.closest('.talk-btn-start-roleab');
        if (startRoleAbBtn) {
          const dId = startRoleAbBtn.getAttribute('data-dialogue-id');
          if (dId) this.startRoleAb(dId);
          return;
        }
      });
    },

    bindPaneEvents() {
      if (!this.container) return;

      // Event cho thanh chọn scope ở Mode 1
      const scopeSel = this.container.querySelector('#talk-scope-select');
      if (scopeSel) {
        scopeSel.addEventListener('change', (e) => {
          this.wordState.scope = e.target.value;
          this.loadWordsForDrill();
          this.render();
        });
      }

      this.bindWordCardEvents();

      // Chat controls Mode 2
      const exitBtn = this.container.querySelector('#talk-btn-exit-sc');
      if (exitBtn) exitBtn.addEventListener('click', () => this.exitScenario());

      const hintBtn = this.container.querySelector('#talk-btn-hint');
      if (hintBtn) hintBtn.addEventListener('click', () => this.showHint());

      const chatMicBtn = this.container.querySelector('#talk-chat-mic-btn');
      if (chatMicBtn) chatMicBtn.addEventListener('click', () => this.toggleListening());

      const chatTypeBtn = this.container.querySelector('#talk-chat-type-btn');
      if (chatTypeBtn) chatTypeBtn.addEventListener('click', () => this.promptTypingModal());

      // Summary buttons
      const restartWords = this.container.querySelector('#talk-btn-restart-words');
      if (restartWords) {
        restartWords.addEventListener('click', () => {
          this.loadWordsForDrill();
          this.render();
        });
      }

      const replaySc = this.container.querySelector('#talk-btn-replay-sc');
      if (replaySc && this.roleplayState.activeScenario) {
        replaySc.addEventListener('click', () => this.startScenario(this.roleplayState.activeScenario.id));
      }

      const backLobby = this.container.querySelector('#talk-btn-back-lobby');
      if (backLobby) backLobby.addEventListener('click', () => this.exitScenario());

      // Event binding cho Mode 3: Đóng vai A-B
      this.bindRoleAbEvents();
    },

    bindRoleAbEvents() {
      if (!this.container) return;

      const exitBtn = this.container.querySelector('#roleab-btn-exit');
      if (exitBtn) exitBtn.addEventListener('click', () => this.exitRoleAb());

      const playSampleBtn = this.container.querySelector('#roleab-btn-play-sample');
      if (playSampleBtn) playSampleBtn.addEventListener('click', () => this.togglePlaySampleDialogue());

      const sampleRateBtn = this.container.querySelector('#roleab-btn-sample-rate');
      if (sampleRateBtn) {
        sampleRateBtn.addEventListener('click', () => {
          this.roleabState.sampleRate = this.roleabState.sampleRate === 1.0 ? 0.8 : 1.0;
          this.render();
        });
      }

      const toRoleABtn = this.container.querySelector('#roleab-btn-to-role-a');
      if (toRoleABtn) toRoleABtn.addEventListener('click', () => this.startRole('A'));

      const toRoleBBtn = this.container.querySelector('#roleab-btn-to-role-b');
      if (toRoleBBtn) toRoleBBtn.addEventListener('click', () => this.startRole('B'));

      const micBtn = this.container.querySelector('#roleab-mic-btn');
      if (micBtn) micBtn.addEventListener('click', () => this.toggleListening());

      const typeBtn = this.container.querySelector('#roleab-type-btn');
      if (typeBtn) typeBtn.addEventListener('click', () => this.promptTypingModal('Nhập câu nói của bạn bằng chữ Hán hoặc Pinyin'));

      const retrySentBtn = this.container.querySelector('#roleab-btn-retry-sentence');
      if (retrySentBtn) {
        retrySentBtn.addEventListener('click', () => {
          this.roleabState.lastEvaluatedResult = null;
          this.render();
        });
      }

      const skipSentBtn = this.container.querySelector('#roleab-btn-skip-sentence');
      if (skipSentBtn) {
        skipSentBtn.addEventListener('click', () => {
          this.roleabState.currentSentenceIdx++;
          this.roleabState.currentAttempt = 0;
          this.advanceRoleSequence();
        });
      }

      const supportBtns = this.container.querySelectorAll('.roleab-support-btn');
      supportBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const level = btn.getAttribute('data-level');
          if (level) {
            this.roleabState.supportLevel = level;
            this.render();
          }
        });
      });

      const replayWrongBtn = this.container.querySelector('#roleab-btn-replay-wrong');
      if (replayWrongBtn) replayWrongBtn.addEventListener('click', () => this.replayRoleAbWeakSentences());

      const wordsDrillBtn = this.container.querySelector('#roleab-btn-words-drill');
      if (wordsDrillBtn) wordsDrillBtn.addEventListener('click', () => this.drillWeakWordsInWordMode());

      const summaryLobbyBtn = this.container.querySelector('#roleab-btn-summary-lobby');
      if (summaryLobbyBtn) summaryLobbyBtn.addEventListener('click', () => this.exitRoleAb());
    },

    bindWordCardEvents() {
      if (!this.container) return;

      const audioBtns = this.container.querySelectorAll('.talk-btn-audio');
      audioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const cur = this.wordState.wordList[this.wordState.currentIndex];
          if (cur) {
            const rate = parseFloat(btn.getAttribute('data-rate') || '1.0');
            this.speakText(cur.hanzi || cur.zh, rate);
          }
        });
      });

      const micBtn = this.container.querySelector('#talk-mic-trigger');
      if (micBtn) micBtn.addEventListener('click', () => this.toggleListening());

      const typeBtn = this.container.querySelector('#talk-btn-type-instead');
      if (typeBtn) typeBtn.addEventListener('click', () => this.promptTypingModal());

      const nextBtn = this.container.querySelector('#talk-btn-next');
      if (nextBtn) nextBtn.addEventListener('click', () => this.nextWord());

      const retryBtn = this.container.querySelector('#talk-btn-retry');
      if (retryBtn) retryBtn.addEventListener('click', () => this.retryWord());
    }
  };

  /* ==========================================================================
     7. EXPORTS & GLOBAL REGISTRATION
     ========================================================================== */

  if (typeof window !== 'undefined') {
    window.TalkPractice = TalkPractice;
    window.buildCharPinyinMap = buildCharPinyinMap;
    window.splitPinyin = splitPinyin;
    window.parseSyllable = parseSyllable;
    window.diagnose = diagnose;
    window.matchIntent = matchIntent;
    window.scoreTurn = scoreTurn;
    window.scoreEnglishRecognition = scoreEnglishRecognition;
    window.expandEnglishContractions = expandEnglishContractions;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      buildCharPinyinMap,
      splitPinyin,
      parseSyllable,
      diagnose,
      matchIntent,
      scoreTurn,
      scoreEnglishRecognition,
      expandEnglishContractions,
      TalkPractice
    };
  }
})();
