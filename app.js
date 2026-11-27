/**
 * Web Tĩnh Học Tiếng Trung Cơ Bản Cho Người Việt Mới Bắt Đầu
 * Logic & Controller: SPA Router, Speech Synthesis, SM-2 Flashcards,
 * HanziWriter, Tone Curves SVG, Quizzes & Dialogue Player.
 */

const ic = (n, opts) => (typeof window !== 'undefined' && window.PolyIcons ? window.PolyIcons.svg(n, opts) : (typeof PolyIcons !== 'undefined' ? PolyIcons.svg(n, opts) : ''));

/* ==========================================================================
   0. FALLBACK DATA (Đảm bảo chạy trơn tru nếu chưa có file data/*.js)
   ========================================================================== */
const DEFAULT_PINYIN = {
  initials: [
    { p: 'b', vi: 'Giống b/p tiếng Việt, không bật hơi', ex: 'bā (八 - tám)' },
    { p: 'p', vi: 'Bật hơi mạnh, môi mím rồi bật luồng hơi', ex: 'pà (怕 - sợ)' },
    { p: 'm', vi: 'Giống chữ m tiếng Việt', ex: 'mā (妈 - mẹ)' },
    { p: 'f', vi: 'Giống chữ ph tiếng Việt (răng trên chạm môi dưới)', ex: 'fēi (飞 - bay)' },
    { p: 'd', vi: 'Giống âm đ/t tiếng Việt, không bật hơi', ex: 'dà (大 - to/lớn)' },
    { p: 't', vi: 'Giống chữ th tiếng Việt, bật hơi mạnh', ex: 'tā (他 - anh ấy)' },
    { p: 'n', vi: 'Giống chữ n tiếng Việt', ex: 'nǐ (你 - bạn)' },
    { p: 'l', vi: 'Giống chữ l tiếng Việt', ex: 'lái (来 - đến)' },
    { p: 'g', vi: 'Giống chữ c/k tiếng Việt, không bật hơi', ex: 'gē (哥 - anh trai)' },
    { p: 'k', vi: 'Giống chữ kh tiếng Việt, bật hơi mạnh từ cuống họng', ex: 'kàn (看 - nhìn)' },
    { p: 'h', vi: 'Nằm giữa h và kh tiếng Việt, nhẹ nhàng', ex: 'hǎo (好 - tốt)' },
    { p: 'j', vi: 'Mặt lưỡi chạm ngạc cứng, không bật hơi', ex: 'jiā (家 - nhà)' },
    { p: 'q', vi: 'Vị trí như j nhưng bật luồng hơi mạnh ra', ex: 'qī (七 - bảy)' },
    { p: 'x', vi: 'Giống chữ x nhẹ tiếng Việt', ex: 'xiè (谢 - cảm ơn)' },
    { p: 'zh', vi: 'Uốn đầu lưỡi lên ngạc cứng, không bật hơi (như tr)', ex: 'zhè (这 - đây)' },
    { p: 'ch', vi: 'Uốn lưỡi như zh nhưng bật hơi mạnh', ex: 'chī (吃 - ăn)' },
    { p: 'sh', vi: 'Uốn lưỡi, phát âm như s nặng miền Nam', ex: 'shū (书 - sách)' },
    { p: 'r', vi: 'Uốn lưỡi, rung nhẹ như r tiếng Việt', ex: 'rén (人 - người)' },
    { p: 'z', vi: 'Đầu lưỡi thẳng chạm răng trên, không bật hơi', ex: 'zài (在 - ở)' },
    { p: 'c', vi: 'Như z nhưng bật luồng hơi mạnh qua khe răng', ex: 'cài (菜 - món ăn)' },
    { p: 's', vi: 'Đầu lưỡi thẳng, phát âm như x nhẹ tiếng Việt', ex: 'sān (三 - ba)' }
  ],
  finals: [
    { p: 'a', vi: 'Đọc như a tiếng Việt', ex: 'mā' },
    { p: 'o', vi: 'Đọc hơi lai giữa ô và uô', ex: 'bō' },
    { p: 'e', vi: 'Đọc như ưa / ơ tiếng Việt', ex: 'gē' },
    { p: 'i', vi: 'Đọc như i (sau z,c,s,zh,ch,sh,r đọc như ư)', ex: 'nǐ' },
    { p: 'u', vi: 'Đọc như u tiếng Việt', ex: 'bù' },
    { p: 'ü', vi: 'Tròn môi phát âm như uy tiếng Pháp / i tròn môi', ex: 'nǚ' },
    { p: 'ai', vi: 'Đọc như ai tiếng Việt', ex: 'bái' },
    { p: 'ei', vi: 'Đọc như êi / ây', ex: 'mèi' },
    { p: 'ao', vi: 'Đọc như ao', ex: 'hǎo' },
    { p: 'ou', vi: 'Đọc như âu', ex: 'dōu' },
    { p: 'an', vi: 'Đọc như an', ex: 'sān' },
    { p: 'en', vi: 'Đọc như ơn / ân', ex: 'hěn' },
    { p: 'ang', vi: 'Đọc như ang', ex: 'máng' },
    { p: 'eng', vi: 'Đọc như âng', ex: 'péng' },
    { p: 'ong', vi: 'Đọc như ung / oong', ex: 'zhōng' },
    { p: 'ia', vi: 'Đọc như ia', ex: 'jiā' },
    { p: 'ie', vi: 'Đọc như iê', ex: 'xiè' },
    { p: 'iao', vi: 'Đọc như i-ao', ex: 'jiào' },
    { p: 'iu', vi: 'Đọc như i-êu', ex: 'liù' },
    { p: 'ian', vi: 'Đọc như i-en', ex: 'tiān' },
    { p: 'in', vi: 'Đọc như in', ex: 'xīn' },
    { p: 'iang', vi: 'Đọc như i-ang', ex: 'liǎng' },
    { p: 'ing', vi: 'Đọc như inh', ex: 'míng' },
    { p: 'iong', vi: 'Đọc như i-ung', ex: 'xiōng' },
    { p: 'ua', vi: 'Đọc như oa', ex: 'huà' },
    { p: 'uo', vi: 'Đọc như uô', ex: 'duō' },
    { p: 'uai', vi: 'Đọc như oai', ex: 'kuài' },
    { p: 'ui', vi: 'Đọc như uôi', ex: 'shuǐ' },
    { p: 'uan', vi: 'Đọc như oan', ex: 'wán' },
    { p: 'un', vi: 'Đọc như uân', ex: 'wēn' },
    { p: 'uang', vi: 'Đọc như oang', ex: 'huáng' },
    { p: 'üe', vi: 'Đọc như uy-ê', ex: 'yuè' },
    { p: 'üan', vi: 'Đọc như uy-en', ex: 'yuán' },
    { p: 'ün', vi: 'Đọc như uy-n', ex: 'yún' },
    { p: 'er', vi: 'Uốn cong lưỡi đọc như ơ-r', ex: 'èr' }
  ],
  tones: [
    { n: 1, mark: 'ā', name: 'Thanh 1 (Cao, bằng)', vi: 'Giống thanh ngang tiếng Việt nhưng cao và ngân đều (5-5)', curve: [5, 5] },
    { n: 2, mark: 'á', name: 'Thanh 2 (Đi lên)', vi: 'Giống dấu sắc tiếng Việt, từ trung bình vút lên cao (3-5)', curve: [3, 5] },
    { n: 3, mark: 'ǎ', name: 'Thanh 3 (Uốn lượn)', vi: 'Xuống trầm rồi lượn nhẹ lên (2-1-4)', curve: [2, 1, 4] },
    { n: 4, mark: 'à', name: 'Thanh 4 (Dứt khoát)', vi: 'Từ cao nhất rơi thẳng xuống thấp nhất, dứt khoát (5-1)', curve: [5, 1] },
    { n: 5, mark: 'a', name: 'Thanh nhẹ', vi: 'Đọc ngắn, nhẹ, không có dấu phụ (thang độ ~3)', curve: [3] }
  ],
  toneDrill: [
    { syl: 'mā', base: 'ma', tone: 1, hanzi: '妈' },
    { syl: 'má', base: 'ma', tone: 2, hanzi: '麻' },
    { syl: 'mǎ', base: 'ma', tone: 3, hanzi: '马' },
    { syl: 'mà', base: 'ma', tone: 4, hanzi: '骂' },
    { syl: 'bā', base: 'ba', tone: 1, hanzi: '八' },
    { syl: 'bá', base: 'ba', tone: 2, hanzi: '拔' },
    { syl: 'bǎ', base: 'ba', tone: 3, hanzi: '把' },
    { syl: 'bà', base: 'ba', tone: 4, hanzi: '爸' },
    { syl: 'tā', base: 'ta', tone: 1, hanzi: '他' },
    { syl: 'tǎ', base: 'ta', tone: 3, hanzi: '塔' },
    { syl: 'tà', base: 'ta', tone: 4, hanzi: '踏' },
    { syl: 'dà', base: 'da', tone: 4, hanzi: '大' },
    { syl: 'hǎo', base: 'hao', tone: 3, hanzi: '好' },
    { syl: 'hào', base: 'hao', tone: 4, hanzi: '号' },
    { syl: 'shū', base: 'shu', tone: 1, hanzi: '书' },
    { syl: 'shú', base: 'shu', tone: 2, hanzi: '熟' },
    { syl: 'shǔ', base: 'shu', tone: 3, hanzi: '数' },
    { syl: 'shù', base: 'shu', tone: 4, hanzi: '树' },
    { syl: 'yī', base: 'yi', tone: 1, hanzi: '一' },
    { syl: 'yí', base: 'yi', tone: 2, hanzi: '姨' },
    { syl: 'yǐ', base: 'yi', tone: 3, hanzi: '椅' },
    { syl: 'yì', base: 'yi', tone: 4, hanzi: '意' },
    { syl: 'kàn', base: 'kan', tone: 4, hanzi: '看' },
    { syl: 'chī', base: 'chi', tone: 1, hanzi: '吃' }
  ]
};

const DEFAULT_TOPICS = [
  { id: 'chao-hoi', name: 'Chào hỏi', icon: '' },
  { id: 'so-dem', name: 'Số đếm', icon: '' },
  { id: 'gia-dinh', name: 'Gia đình', icon: '' },
  { id: 'an-uong', name: 'Ăn uống', icon: '' },
  { id: 'thoi-gian', name: 'Thời gian', icon: '' }
];

const DEFAULT_VOCAB = [
  { id: 'v001', hanzi: '你好', pinyin: 'nǐ hǎo', vi: 'xin chào', pos: 'cụm từ', topic: 'chao-hoi', ex: { zh: '你好，我叫小明。', py: 'Nǐ hǎo, wǒ jiào Xiǎo Míng.', vi: 'Xin chào, tôi tên là Tiểu Minh.' } },
  { id: 'v002', hanzi: '谢谢', pinyin: 'xiè xie', vi: 'cảm ơn', pos: 'động từ', topic: 'chao-hoi', ex: { zh: '非常谢谢你！', py: 'Fēicháng xièxie nǐ!', vi: 'Vô cùng cảm ơn bạn!' } },
  { id: 'v003', hanzi: '再见', pinyin: 'zài jiàn', vi: 'tạm biệt', pos: 'cụm từ', topic: 'chao-hoi', ex: { zh: '明天见，再见！', py: 'Míngtiān jiàn, zàijiàn!', vi: 'Ngày mai gặp, tạm biệt!' } },
  { id: 'v004', hanzi: '对不起', pinyin: 'duì bu qǐ', vi: 'xin lỗi', pos: 'cụm từ', topic: 'chao-hoi', ex: { zh: '对不起，我来晚了。', py: 'Duìbuqǐ, wǒ lái wǎn le.', vi: 'Xin lỗi, tôi đến muộn.' } },
  { id: 'v005', hanzi: '一', pinyin: 'yī', vi: 'số một', pos: 'số từ', topic: 'so-dem', ex: { zh: '我有一个苹果。', py: 'Wǒ yǒu yí gè píngguǒ.', vi: 'Tôi có một quả táo.' } },
  { id: 'v006', hanzi: '二', pinyin: 'èr', vi: 'số hai', pos: 'số từ', topic: 'so-dem', ex: { zh: '这是二号线。', py: 'Zhè shì èr hào xiàn.', vi: 'Đây là tuyến số 2.' } },
  { id: 'v007', hanzi: '三', pinyin: 'sān', vi: 'số ba', pos: 'số từ', topic: 'so-dem', ex: { zh: '他有三个朋友。', py: 'Tā yǒu sān gè péngyou.', vi: 'Anh ấy có 3 người bạn.' } },
  { id: 'v008', hanzi: '爸爸', pinyin: 'bà ba', vi: 'bố / cha', pos: 'danh từ', topic: 'gia-dinh', ex: { zh: '我爸爸是医生。', py: 'Wǒ bàba shì yīshēng.', vi: 'Bố tôi là bác sĩ.' } },
  { id: 'v009', hanzi: '妈妈', pinyin: 'mā ma', vi: 'mẹ', pos: 'danh từ', topic: 'gia-dinh', ex: { zh: '妈妈做的菜很好吃。', py: 'Māma zuò de cài hěn hǎochī.', vi: 'Món mẹ nấu rất ngon.' } },
  { id: 'v010', hanzi: '吃', pinyin: 'chī', vi: 'ăn', pos: 'động từ', topic: 'an-uong', ex: { zh: '你想吃什么？', py: 'Nǐ xiǎng chī shénme?', vi: 'Bạn muốn ăn gì?' } },
  { id: 'v011', hanzi: '喝', pinyin: 'hē', vi: 'uống', pos: 'động từ', topic: 'an-uong', ex: { zh: '我喜欢喝茶。', py: 'Wǒ xǐhuan hē chá.', vi: 'Tôi thích uống trà.' } },
  { id: 'v012', hanzi: '水', pinyin: 'shuǐ', vi: 'nước', pos: 'danh từ', topic: 'an-uong', ex: { zh: '请给我一杯水。', py: 'Qǐng gěi wǒ yì bēi shuǐ.', vi: 'Xin cho tôi một cốc nước.' } },
  { id: 'v013', hanzi: '今天', pinyin: 'jīn tiān', vi: 'hôm nay', pos: 'danh từ', topic: 'thoi-gian', ex: { zh: '今天天气很好。', py: 'Jīntiān tiānqì hěn hǎo.', vi: 'Hôm nay thời tiết rất đẹp.' } },
  { id: 'v014', hanzi: '明天', pinyin: 'míng tiān', vi: 'ngày mai', pos: 'danh từ', topic: 'thoi-gian', ex: { zh: '明天见！', py: 'Míngtiān jiàn!', vi: 'Ngày mai gặp nhé!' } }
];

const DEFAULT_DIALOGUES = [
  {
    id: 'd01',
    title: 'Bài 1: Chào hỏi lần đầu gặp gỡ',
    lines: [
      { who: 'A', zh: '你好！', py: 'Nǐ hǎo!', vi: 'Xin chào!' },
      { who: 'B', zh: '你好！认识你很高兴。', py: 'Nǐ hǎo! Rènshi nǐ hěn gāoxìng.', vi: 'Xin chào! Rất vui được quen biết bạn.' },
      { who: 'A', zh: '你叫什么名字？', py: 'Nǐ jiào shénme míngzi?', vi: 'Bạn tên là gì?' },
      { who: 'B', zh: '我叫李明。你呢？', py: 'Wǒ jiào Lǐ Míng. Nǐ ne?', vi: 'Tôi tên là Lý Minh. Còn bạn?' },
      { who: 'A', zh: '我叫王兰。', py: 'Wǒ jiào Wáng Lán.', vi: 'Tôi tên là Vương Lan.' },
      { who: 'B', zh: '再见！', py: 'Zàijiàn!', vi: 'Tạm biệt nhé!' }
    ]
  },
  {
    id: 'd02',
    title: 'Bài 2: Tại quán ăn / Gọi đồ uống',
    lines: [
      { who: 'A', zh: '服务员，请问你想吃什么？', py: 'Fúwùyuán, qǐngwèn nǐ xiǎng chī shénme?', vi: 'Phục vụ ơi, xin hỏi bạn muốn ăn gì?' },
      { who: 'B', zh: '我想吃米饭和牛肉。', py: 'Wǒ xiǎng chī mǐfàn hé niúròu.', vi: 'Tôi muốn ăn cơm và thịt bò.' },
      { who: 'A', zh: '你想喝什么？', py: 'Nǐ xiǎng hē shénme?', vi: 'Bạn muốn uống gì?' },
      { who: 'B', zh: '给我一杯绿茶，谢谢。', py: 'Gěi wǒ yì bēi lǜchá, xièxie.', vi: 'Cho tôi một ly trà xanh, cảm ơn.' }
    ]
  }
];

const DEFAULT_RADICALS = [
  { r: '人', alt: '亻', py: 'rén', vi: 'người (nhân)', ex: '你, 他, 们' },
  { r: '口', alt: '口', py: 'kǒu', vi: 'miệng (khẩu)', ex: '叫, 喝, 吃, 吗' },
  { r: '女', alt: '女', py: 'nǚ', vi: 'phụ nữ (nữ)', ex: '好, 妈, 她, 妹' },
  { r: '水', alt: '氵', py: 'shuǐ', vi: 'nước (thủy / ba chấm thủy)', ex: '汉, 没, 洗, 江' },
  { r: '手', alt: '扌', py: 'shǒu', vi: 'tay (thủ / tài gảy)', ex: '打, 找, 提' },
  { r: '心', alt: '忄', py: 'xīn', vi: 'tim, tấm lòng (tâm)', ex: '想, 快, 忙' },
  { r: '日', alt: '日', py: 'rì', vi: 'mặt trời, ngày (nhật)', ex: '明, 早, 时' },
  { r: '月', alt: '月', py: 'yuè', vi: 'mặt trăng, xác thịt (nguyệt)', ex: '朋, 期, 脸' },
  { r: '言', alt: '讠', py: 'yán', vi: 'lời nói, ngôn ngữ (ngôn)', ex: '谢, 话, 说, 请' },
  { r: '木', alt: '木', py: 'mù', vi: 'cây cối (mộc)', ex: '杯, 本, 桌' }
];

/* ==========================================================================
   1. STORAGE HELPER (An toàn với try/catch)
   ========================================================================== */
const Storage = {
  get(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch (e) {
      console.warn('Lỗi đọc localStorage:', e);
      return fallback;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('Lỗi ghi localStorage:', e);
    }
  }
};

/* ==========================================================================
   2. SPEECH SYNTHESIS HELPER (Đa ngôn ngữ & Tốc độ phát âm)
   ========================================================================== */
class AudioController {
  constructor() {
    this.speechRate = Storage.get('hsk_speech_rate', 0.9);
    this.hasWarnedNoVoice = false;
    this.currentDialogueTimer = null;
    this.isDialoguePlaying = false;

    // Tự động preload giọng khi trình duyệt sẵn sàng
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.getVoiceForLang('zh-CN');
      };
    }
  }

  getVoiceForLang(ttsLang = 'zh-CN') {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    const cleanLang = (ttsLang || 'zh-CN').toLowerCase().replace('_', '-');
    const prefix = cleanLang.split('-')[0];

    const exact = voices.find(v => (v.lang || '').toLowerCase().replace('_', '-') === cleanLang);
    if (exact) return exact;

    return voices.find(v => (v.lang || '').toLowerCase().startsWith(prefix)) || null;
  }

  speak(text, customRate = null, onEndCallback = null, ttsLang = 'zh-CN') {
    if (!('speechSynthesis' in window)) {
      if (window.app && window.app.showToast) {
        window.app.showToast('Trình duyệt của bạn không hỗ trợ SpeechSynthesis.', 'warning');
      }
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = ttsLang || 'zh-CN';
      utterance.rate = customRate !== null ? customRate : this.speechRate;

      const voice = this.getVoiceForLang(utterance.lang);
      if (voice) {
        utterance.voice = voice;
      }

      if (onEndCallback) {
        utterance.onend = onEndCallback;
        utterance.onerror = () => onEndCallback();
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Lỗi phát âm:', e);
    }
  }

  toggleRate() {
    this.speechRate = this.speechRate === 0.9 ? 0.6 : 0.9;
    Storage.set('hsk_speech_rate', this.speechRate);
    return this.speechRate;
  }

  stopAll() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isDialoguePlaying = false;
    if (this.currentDialogueTimer) {
      clearTimeout(this.currentDialogueTimer);
      this.currentDialogueTimer = null;
    }
  }
}

/* ==========================================================================
   3. MAIN APPLICATION CONTROLLER
   ========================================================================== */
class ChineseApp {
  constructor() {
    this.audio = new AudioController();
    this.currentLang = 'zh';
    this.currentTab = 'home';
    this.writer = null;

    // Load data with graceful fallback
    this.dataPinyin = (window.PINYIN && window.PINYIN.initials) ? window.PINYIN : DEFAULT_PINYIN;
    this.dataVocab = (window.VOCAB && window.VOCAB.length > 0) ? window.VOCAB : DEFAULT_VOCAB;
    this.dataTopics = (window.TOPICS && window.TOPICS.length > 0) ? window.TOPICS : DEFAULT_TOPICS;
    this.dataDialogues = (window.DIALOGUES && window.DIALOGUES.length > 0) ? window.DIALOGUES : DEFAULT_DIALOGUES;
    this.dataRadicals = (window.RADICALS && window.RADICALS.length > 0) ? window.RADICALS : DEFAULT_RADICALS;

    // Flashcard State
    this.fcQueue = [];
    this.fcCurrentIdx = 0;
    this.isFcFlipped = false;

    // Quiz State
    this.quizQuestions = [];
    this.quizCurrentIdx = 0;
    this.quizScore = 0;
    this.quizWrongList = [];

    // Tone drill state
    this.drillCurrent = null;
    this.drillScore = 0;
    this.drillTotal = 0;

    // Dialogue active state
    this.currentDialogueIndex = 0;

    // Module mount tracking
    this.mountedModules = {
      learn: false,
      phonics: false,
      speak: false,
      talk: false,
      videos: false,
      games: false,
      farm: false
    };
  }

  /* --- Multi-language Helpers & Storage Keys --- */
  getSm2Key(lang = this.currentLang) {
    return lang === 'en' ? 'en_sm2_data' : 'hsk_sm2_data';
  }

  getStreakKey(lang = this.currentLang) {
    return lang === 'en' ? 'en_streak' : 'hsk_streak';
  }

  getDailyTargetKey(lang = this.currentLang) {
    return lang === 'en' ? 'en_daily_target' : 'hsk_daily_target';
  }

  getQuizWrongsKey(lang = this.currentLang) {
    return lang === 'en' ? 'en_quiz_wrongs' : 'hsk_quiz_wrongs';
  }

  getCurrentVocab() {
    if (this.currentLang === 'en') {
      const raw = typeof window !== 'undefined' ? window.EN_WORDS : null;
      if (!raw) return [];
      return Array.isArray(raw) ? raw : Object.values(raw);
    }
    return (this.dataVocab && this.dataVocab.length > 0) ? this.dataVocab : DEFAULT_VOCAB;
  }

  getCurrentTopics() {
    if (this.currentLang === 'en') {
      const words = this.getCurrentVocab();
      const topicSet = new Set();
      words.forEach(w => { if (w.topic) topicSet.add(w.topic); });
      const topics = Array.from(topicSet).map(t => ({
        id: t,
        name: t.charAt(0).toUpperCase() + t.slice(1),
        icon: ''
      }));
      return topics;
    }
    return (this.dataTopics && this.dataTopics.length > 0) ? this.dataTopics : DEFAULT_TOPICS;
  }

  getCurrentDialogues() {
    if (this.currentLang === 'en') {
      return (typeof window !== 'undefined' && (window.EN_DIALOGUES || window.DIALOGUES_EN || [])) || [];
    }
    return (this.dataDialogues && this.dataDialogues.length > 0) ? this.dataDialogues : DEFAULT_DIALOGUES;
  }

  init() {
    this.initTheme();
    this.initSidebarDrawer();
    this.initAudioToggle();
    this.initMobileLangPicker();

    // Mount Economy widget chip ở header
    if (window.Economy && typeof window.Economy.mountWidget === 'function') {
      window.Economy.mountWidget('#header-wallet-chip');
    }

    this.initRouting();
    this.initDailyTarget();
    this.updateStreak();
    this.renderStats();

    // Init components
    this.initPinyinTab();
    this.initVocabTab();
    this.initFlashcardsTab();
    this.initWritingTab();
    this.initQuizTab();
    this.initDialogueTab();
  }

  /* --- Mobile Drawer Controller --- */
  initSidebarDrawer() {
    const toggleBtn = document.getElementById('btn-sidebar-toggle');
    const overlay = document.getElementById('sidebar-overlay');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-open');
      });
    }
    if (overlay) {
      overlay.addEventListener('click', () => {
        document.body.classList.remove('sidebar-open');
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.body.classList.remove('sidebar-open');
      }
    });
  }

  /* --- Notifications Toast --- */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  /* --- Theme Controller --- */
  initTheme() {
    const savedTheme = Storage.get('hsk_theme', null);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    this.setTheme(theme);

    const btn = document.getElementById('btn-theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        this.setTheme(next);
      });
    }
  }

  setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      const icon = document.getElementById('theme-icon');
      if (icon) icon.innerHTML = ic('sun', { size: 18 });
    } else {
      document.documentElement.removeAttribute('data-theme');
      const icon = document.getElementById('theme-icon');
      if (icon) icon.innerHTML = ic('moon', { size: 18 });
    }
    Storage.set('hsk_theme', theme);
  }

  /* --- Audio Speed Toggle (Sidebar) --- */
  initAudioToggle() {
    const btn = document.getElementById('btn-speed-toggle');
    const indicator = document.getElementById('speed-indicator');
    const updateUI = (rate) => {
      if (indicator) {
        const svgIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-2px;margin-right:3px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
        indicator.innerHTML = `${svgIcon} ${rate === 0.6 ? '0.6x' : '0.9x'}`;
      }
    };
    updateUI(this.audio.speechRate);

    if (btn) {
      btn.addEventListener('click', () => {
        const newRate = this.audio.toggleRate();
        updateUI(newRate);
        this.showToast(`Tốc độ phát âm: ${newRate === 0.6 ? 'Chậm (0.6x)' : 'Thường (0.9x)'}`, 'info');
      });
    }
  }

  /* --- Mobile Compact Language Dropdown Picker (<860px) --- */
  initMobileLangPicker() {
    const btn = document.getElementById('btn-lang-picker');
    const dropdown = document.getElementById('lang-picker-dropdown');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  speakText(text, rate = null, ttsLang = null) {
    const langObj = (window.LANGUAGES || []).find(l => l.id === this.currentLang) || {};
    const code = ttsLang || langObj.tts || 'zh-CN';
    this.audio.speak(text, rate, null, code);
  }

  /* --- Navigation Icons (Lucide-style Inline SVG) --- */
  static getSidebarSvg(key) {
    const icons = {
      home: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      learn: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>`,
      phonics: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>`,
      pinyin: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>`,
      kana: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>`,
      cyrillic: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>`,
      typing: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M7 16h10"/></svg>`,
      speak: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`,
      talk: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>`,
      videos: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="4.5" rx="2.5"/><polygon points="10 9 15 12 10 15 10 9"/></svg>`,
      vocab: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M9 6h7"/><path d="M9 10h7"/></svg>`,
      flashcards: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="14" x="3" y="7" rx="2"/><path d="M7 3h10a2 2 0 0 1 2 2v2H5V5a2 2 0 0 1 2-2z"/></svg>`,
      writing: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,
      quiz: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
      games: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="6"/></svg>`,
      farm: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>`,
      dialogues: `<svg class="sidebar-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
    };
    return icons[key] || icons.home;
  }

  /* --- Language Header Nav (Menu ngang & Menu thả xuống Mobile) --- */
  renderHeaderLanguages() {
    const nav = document.getElementById('header-lang-nav');
    const langs = window.LANGUAGES || [];
    if (nav) {
      nav.innerHTML = langs.map(lang => {
        const isActive = this.currentLang === lang.id;
        const isComing = !lang.ready;
        const tooltip = isComing ? 'Sắp ra mắt' : `${lang.name} (${lang.native})`;
        return `
          <a href="#${lang.id}/home" class="lang-nav-tab ${isActive ? 'active' : ''} ${isComing ? 'coming-tab' : ''}" data-lang="${lang.id}" title="${tooltip}">
            <span class="lang-tab-flag">${lang.flag}</span>
            <span class="lang-tab-name">${lang.name}</span>
          </a>
        `;
      }).join('');
    }

    // Mobile Language Picker Dropdown
    const curLangObj = langs.find(l => l.id === this.currentLang);
    const pickerFlag = document.getElementById('picker-cur-flag');
    const pickerName = document.getElementById('picker-cur-name');
    const dropdownMenu = document.getElementById('lang-picker-dropdown');

    if (pickerFlag && pickerName) {
      if (curLangObj) {
        pickerFlag.textContent = curLangObj.flag;
        pickerName.textContent = curLangObj.shortName || curLangObj.name;
      } else {
        pickerFlag.innerHTML = ic('globe', { size: 18 });
        pickerName.textContent = 'Ngôn ngữ';
      }
    }

    if (dropdownMenu) {
      dropdownMenu.innerHTML = langs.map(lang => {
        const isActive = this.currentLang === lang.id;
        return `
          <a href="#${lang.id}/home" class="lang-dropdown-item ${isActive ? 'active' : ''}" data-lang="${lang.id}">
            <span class="dropdown-item-flag">${lang.flag}</span>
            <span class="dropdown-item-name">${lang.name}</span>
            ${!lang.ready ? '<span class="dropdown-item-badge">Sắp có</span>' : '<span class="dropdown-item-badge badge-ready">Đang mở</span>'}
          </a>
        `;
      }).join('');

      dropdownMenu.querySelectorAll('.lang-dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
          dropdownMenu.classList.remove('open');
          const btn = document.getElementById('btn-lang-picker');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* --- Sidebar Navigation (Menu dọc) --- */
  renderSidebar(langId, activeSection) {
    const headerEl = document.getElementById('sidebar-header');
    const navEl = document.getElementById('sidebar-nav');
    const lang = (window.LANGUAGES || []).find(l => l.id === langId) || (window.LANGUAGES || [])[0];
    if (!lang) return;

    if (headerEl) {
      headerEl.innerHTML = `
        <div class="sidebar-lang-card">
          <span class="sidebar-lang-flag">${lang.flag}</span>
          <div class="sidebar-lang-text">
            <span class="sidebar-lang-name">${lang.name}</span>
            <span class="sidebar-lang-native">${lang.greeting ? lang.greeting + ' • ' : ''}${lang.native}</span>
          </div>
        </div>
      `;
    }

    if (navEl) {
      navEl.innerHTML = (lang.sections || []).map(sec => {
        const isActive = activeSection === sec.id;
        const isDimmed = !lang.ready;
        const isFeatured = sec.id === 'learn';
        const iconSvg = ChineseApp.getSidebarSvg(sec.iconName || sec.id);
        return `
          <a href="#${lang.id}/${sec.id}" class="sidebar-nav-item ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''} ${isFeatured ? 'featured-nav-item' : ''}" data-section="${sec.id}">
            <span class="sidebar-icon-wrap">${iconSvg}</span>
            <span class="sidebar-label">${sec.label}</span>
            ${isFeatured ? '<span class="sidebar-badge badge-featured">Mục chính</span>' : ''}
            ${isDimmed ? '<span class="sidebar-badge">Sắp có</span>' : ''}
          </a>
        `;
      }).join('');

      navEl.querySelectorAll('.sidebar-nav-item').forEach(el => {
        el.addEventListener('click', () => {
          document.body.classList.remove('sidebar-open');
        });
      });
    }

    this.updateSidebarProgress(lang);
  }

  updateSidebarProgress(lang) {
    const progText = document.getElementById('side-prog-text');
    const progBar = document.getElementById('side-prog-bar');
    const streakText = document.getElementById('side-streak-text');

    if (!lang.ready) {
      if (progText) progText.textContent = `0/${lang.totalWords || 200}`;
      if (progBar && progBar.style) progBar.style.width = '0%';
      if (streakText) streakText.textContent = 'Đang biên soạn';
      return;
    }

    const sm2Key = this.getSm2Key(lang.id);
    const streakKey = this.getStreakKey(lang.id);
    const sm2Data = Storage.get(sm2Key, {});
    const streakData = Storage.get(streakKey, { count: 0 });
    let learnedCount = 0;
    Object.keys(sm2Data).forEach(id => {
      const item = sm2Data[id];
      if (item && (item.repetition >= 2 || item.interval >= 3)) learnedCount++;
    });

    const total = lang.totalWords || (lang.id === 'en' ? 500 : 150);
    const pct = Math.min(100, Math.round((learnedCount / total) * 100));

    if (progText) progText.textContent = `${learnedCount}/${total}`;
    if (progBar && progBar.style) progBar.style.width = `${pct}%`;
    if (streakText) {
      const flameSvg = ic('fire', { size: 13, className: 'inline-svg-icon' }) || `<svg class="inline-svg-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-2px;margin-right:2px;"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/></svg>`;
      streakText.innerHTML = `${flameSvg} ${streakData.count || 0} ngày`;
    }
  }

  /* --- Trang chủ chung (Portal) --- */
  renderPortal() {
    const root = document.getElementById('hp-root');
    if (root && window.Portal && typeof window.Portal.render === 'function') {
      window.Portal.render(root);
    }
  }

  handleTabLeave(prevTab) {
    if (!prevTab) return;
    if (prevTab === 'farm' && window.Farm && typeof window.Farm.onHide === 'function') {
      window.Farm.onHide();
    } else if (prevTab === 'phonics' && window.PhonicsEn && typeof window.PhonicsEn.onHide === 'function') {
      window.PhonicsEn.onHide();
    } else if (prevTab === 'learn' && window.LearnPath && typeof window.LearnPath.onHide === 'function') {
      window.LearnPath.onHide();
    } else if (prevTab === 'speak' && window.SpeakPractice && typeof window.SpeakPractice.onHide === 'function') {
      window.SpeakPractice.onHide();
    } else if (prevTab === 'talk' && window.TalkPractice && typeof window.TalkPractice.onHide === 'function') {
      window.TalkPractice.onHide();
    } else if (prevTab === 'videos' && window.VideoLearn && typeof window.VideoLearn.onHide === 'function') {
      window.VideoLearn.onHide();
    } else if (prevTab === 'games' && window.MiniGames && typeof window.MiniGames.onHide === 'function') {
      window.MiniGames.onHide();
    }
  }

  activatePortal() {
    if (this.currentTab) {
      this.handleTabLeave(this.currentTab);
    }
    this.currentLang = null;
    this.currentTab = null;

    const farmBtn = document.getElementById('btn-header-farm');
    if (farmBtn) farmBtn.classList.remove('active');

    document.body.classList.add('portal-mode');
    document.body.classList.remove('sidebar-open');
    document.documentElement.dataset.lang = 'home';
    document.documentElement.removeAttribute('data-target-lang');

    this.renderHeaderLanguages();
    this.renderPortal();

    document.querySelectorAll('.tab-pane').forEach(el => {
      el.classList.toggle('active', el.id === 'tab-portal');
    });

    this.audio.stopAll();
  }

  /* --- Ngôn ngữ chưa có (Coming Soon) --- */
  activateComingSoon(langId, sectionId = 'home', params = new URLSearchParams()) {
    if (this.currentTab) {
      this.handleTabLeave(this.currentTab);
    }
    const farmBtn = document.getElementById('btn-header-farm');
    if (farmBtn) farmBtn.classList.remove('active');

    const lang = (window.LANGUAGES || []).find(l => l.id === langId);
    if (!lang) {
      window.location.hash = '#/';
      return;
    }

    this.currentLang = langId;
    this.currentTab = sectionId;
    Storage.set('app_last_lang', langId);

    document.body.classList.remove('portal-mode');
    document.body.classList.remove('sidebar-open');

    document.documentElement.dataset.lang = langId;
    document.documentElement.style.setProperty('--current-accent', lang.accentColor || '#111827');
    document.documentElement.setAttribute('data-target-lang', langId);

    this.renderHeaderLanguages();
    this.renderSidebar(langId, sectionId);

    document.querySelectorAll('.tab-pane').forEach(el => {
      el.classList.toggle('active', el.id === 'tab-coming-soon');
    });

    const elFlag = document.getElementById('cs-flag');
    const elBigGreeting = document.getElementById('cs-big-greeting');
    const elGreetingPhonetic = document.getElementById('cs-greeting-phonetic');
    const elTitle = document.getElementById('cs-title');
    const elDesc = document.getElementById('cs-desc');
    const elFwWord = document.getElementById('cs-fw-word');
    const elFwPhonetic = document.getElementById('cs-fw-phonetic');
    const elFwVi = document.getElementById('cs-fw-vi');
    const btnCsSpeak = document.getElementById('btn-cs-speak');
    const elGrid = document.getElementById('cs-features-grid');

    if (elFlag) elFlag.textContent = lang.flag;
    if (elBigGreeting) elBigGreeting.textContent = `${lang.greeting || 'Hello'}!`;
    if (elGreetingPhonetic) elGreetingPhonetic.textContent = lang.greetingPhonetic || `${lang.greeting} • Xin chào`;
    if (elTitle) elTitle.textContent = `Khóa học ${lang.name} đang được biên soạn`;
    if (elDesc) elDesc.textContent = lang.description;

    const fw = lang.firstWord || { word: lang.greeting, phonetic: '', meaning: 'Xin chào' };
    if (elFwWord) elFwWord.textContent = fw.word;
    if (elFwPhonetic) elFwPhonetic.textContent = fw.phonetic || '';
    if (elFwVi) elFwVi.textContent = fw.meaning || '';

    if (btnCsSpeak) {
      btnCsSpeak.onclick = () => {
        this.speakText(fw.word, null, lang.tts);
      };
    }

    if (elGrid) {
      elGrid.innerHTML = (lang.sections || []).map(s => {
        const iconSvg = ChineseApp.getSidebarSvg(s.iconName || s.id);
        return `
          <div class="cs-feature-card">
            <div class="cs-feat-icon-box">${iconSvg}</div>
            <div class="cs-feat-content">
              <h4 class="cs-feat-name">${s.label}</h4>
              <p class="cs-feat-desc">${s.desc || 'Nội dung bài học chuẩn hóa đang được biên soạn'}</p>
            </div>
            <span class="cs-feat-badge">Dự kiến</span>
          </div>
        `;
      }).join('');
    }

    this.audio.stopAll();
  }

  /* --- Route Nông Trại Tri Thức toàn cục (#farm) --- */
  activateFarm(params = new URLSearchParams()) {
    if (this.currentTab && this.currentTab !== 'farm') {
      this.handleTabLeave(this.currentTab);
    }

    this.currentLang = 'farm';
    this.currentTab = 'farm';

    document.body.classList.add('portal-mode');
    document.body.classList.remove('sidebar-open');
    document.documentElement.dataset.lang = 'farm';
    document.documentElement.removeAttribute('data-target-lang');

    // Đánh dấu nút Nông trại đang chọn
    const farmBtn = document.getElementById('btn-header-farm');
    if (farmBtn) farmBtn.classList.add('active');

    // Bỏ chọn ở các tab ngôn ngữ header
    document.querySelectorAll('.lang-nav-tab').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.lang-dropdown-item').forEach(el => el.classList.remove('active'));

    // Toggle view sections
    document.querySelectorAll('.tab-pane').forEach(el => {
      el.classList.toggle('active', el.id === 'tab-farm');
    });

    this.audio.stopAll();

    // Vòng đời Farm: mount 1 lần, onShow mỗi lần
    const container = document.getElementById('tab-farm');
    if (window.Farm && container) {
      if (!this.mountedModules.farm) {
        window.Farm.mount(container);
        this.mountedModules.farm = true;
      } else {
        window.Farm.onShow();
      }
    }
  }

  /* --- SPA Hash Routing --- */
  initRouting() {
    const handleRoute = () => {
      const rawHash = window.location.hash.slice(1).trim();

      // Route #farm toàn cục (xử lý trước phần ngôn ngữ)
      if (rawHash === 'farm' || rawHash.startsWith('farm?') || rawHash.startsWith('farm/')) {
        const queryPart = rawHash.includes('?') ? rawHash.split('?')[1] : '';
        const params = new URLSearchParams(queryPart);
        this.activateFarm(params);
        return;
      }

      // Trang chủ chung: trống hoặc #/
      if (!rawHash || rawHash === '/' || rawHash === '') {
        this.activatePortal();
        return;
      }

      // Tự động chuyển đổi các hash cũ dạng #vocab, #writing?char=... sang #zh/...
      const zhSections = ['home', 'learn', 'pinyin', 'typing', 'speak', 'talk', 'videos', 'vocab', 'flashcards', 'writing', 'quiz', 'games', 'dialogues'];
      const [firstPart, queryPart] = rawHash.split('?');
      const queryStr = queryPart ? `?${queryPart}` : '';

      if (zhSections.includes(firstPart)) {
        window.location.replace(`#zh/${firstPart}${queryStr}`);
        return;
      }

      // Phân tích định tuyến mới #{langId}/{sectionId}?{params}
      const parts = firstPart.split('/');
      const langId = parts[0];
      const sectionId = parts[1] || 'home';
      const params = new URLSearchParams(queryPart || '');

      const langObj = (window.LANGUAGES || []).find(l => l.id === langId);
      if (!langObj) {
        window.location.hash = '#/';
        return;
      }

      if (!langObj.ready) {
        this.activateComingSoon(langId, sectionId, params);
      } else {
        this.activateTab(sectionId, params, langId);
      }
    };

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  activateTab(tabId, params = new URLSearchParams(), langId = 'zh') {
    const validTabs = ['home', 'learn', 'phonics', 'pinyin', 'typing', 'speak', 'talk', 'videos', 'vocab', 'flashcards', 'writing', 'quiz', 'games', 'dialogues'];
    if (!validTabs.includes(tabId)) tabId = 'home';

    if (this.currentTab && this.currentTab !== tabId) {
      this.handleTabLeave(this.currentTab);
    }

    this.currentLang = langId;
    this.currentTab = tabId;

    Storage.set('app_last_lang', langId);
    Storage.set('app_last_section', tabId);

    document.body.classList.remove('portal-mode');
    document.body.classList.remove('sidebar-open');

    const farmBtn = document.getElementById('btn-header-farm');
    if (farmBtn) farmBtn.classList.remove('active');

    const langObj = (window.LANGUAGES || []).find(l => l.id === langId) || { accentColor: '#111827' };
    document.documentElement.dataset.lang = langId;
    document.documentElement.style.setProperty('--current-accent', langObj.accentColor || '#111827');
    document.documentElement.setAttribute('data-target-lang', langId);

    this.renderHeaderLanguages();
    this.renderSidebar(langId, tabId);

    // Toggle view sections
    document.querySelectorAll('.tab-pane').forEach(el => {
      el.classList.toggle('active', el.id === `tab-${tabId}`);
    });

    // Stop continuous audio when leaving dialogues
    if (tabId !== 'dialogues') {
      this.audio.stopAll();
    }

    // Specific triggers
    this.updateQuizIntroDesc(langId);
    if (tabId === 'home') {
      this.renderHomeTab(langId);
      this.renderStats();
    } else if (tabId === 'phonics') {
      const el = document.getElementById('tab-phonics');
      if (window.PhonicsEn && el) {
        if (!this.mountedModules.phonics) {
          window.PhonicsEn.mount(el);
          this.mountedModules.phonics = true;
        }
        if (typeof window.PhonicsEn.onShow === 'function') {
          window.PhonicsEn.onShow(params, langId);
        }
      }
    } else if (tabId === 'learn') {
      const el = document.getElementById('tab-learn');
      if (window.LearnPath && el) {
        if (!this.mountedModules.learn) {
          window.LearnPath.mount(el);
          this.mountedModules.learn = true;
        }
        if (typeof window.LearnPath.onShow === 'function') {
          window.LearnPath.onShow(params, langId);
        }
      }
    } else if (tabId === 'speak') {
      const el = document.getElementById('tab-speak');
      if (window.SpeakPractice && el) {
        if (!this.mountedModules.speak) {
          window.SpeakPractice.mount(el, langId);
          this.mountedModules.speak = true;
        }
        if (typeof window.SpeakPractice.onShow === 'function') {
          window.SpeakPractice.onShow(params, langId);
        }
      }
    } else if (tabId === 'talk') {
      const el = document.getElementById('tab-talk');
      if (window.TalkPractice && el) {
        if (!this.mountedModules.talk) {
          window.TalkPractice.mount(el);
          this.mountedModules.talk = true;
        }
        if (typeof window.TalkPractice.onShow === 'function') {
          window.TalkPractice.onShow(params, langId);
        }
      }
    } else if (tabId === 'videos') {
      const el = document.getElementById('tab-videos');
      if (window.VideoLearn && el) {
        if (!this.mountedModules.videos) {
          window.VideoLearn.mount(el);
          this.mountedModules.videos = true;
        }
        if (typeof window.VideoLearn.onShow === 'function') {
          window.VideoLearn.onShow(params, langId);
        }
      }
    } else if (tabId === 'games') {
      const el = document.getElementById('tab-games');
      if (window.MiniGames && el) {
        if (!this.mountedModules.games) {
          window.MiniGames.mount(el);
          this.mountedModules.games = true;
        }
        if (typeof window.MiniGames.onShow === 'function') {
          window.MiniGames.onShow();
        }
      }
    } else if (tabId === 'writing') {
      const charParam = params.get('char');
      if (charParam) {
        this.selectWritingChar(charParam);
      } else if (!this.writer) {
        this.initHanziWriter();
      }
    } else if (tabId === 'typing') {
      if (window.TypingPractice && typeof window.TypingPractice.onShow === 'function') {
        window.TypingPractice.onShow();
      }
    } else if (tabId === 'vocab') {
      this.initVocabTab();
    } else if (tabId === 'flashcards') {
      const modeParam = params.get('mode');
      const topicSelect = document.getElementById('fc-topic-select');
      if (topicSelect) {
        topicSelect.innerHTML = '<option value="">Tất cả chủ đề</option>' +
          this.getCurrentTopics().map(t => `<option value="${t.id}">${t.icon || ''} ${t.name}</option>`).join('');
      }
      if (modeParam) {
        const modeSelect = document.getElementById('fc-mode-select');
        if (modeSelect) modeSelect.value = modeParam;
      }
      this.startFlashcardSession();
    } else if (tabId === 'dialogues') {
      this.initDialogueTab();
    }
  }

  /* --- Streak & Stats System --- */
  initDailyTarget() {
    const input = document.getElementById('input-daily-target');
    if (!input) return;
    const targetKey = this.getDailyTargetKey();
    const target = Storage.get(targetKey, 10);
    input.value = target;

    input.addEventListener('change', (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 100) val = 100;
      input.value = val;
      Storage.set(this.getDailyTargetKey(), val);
      this.showToast(`Đã lưu mục tiêu: ${val} từ mới/ngày`, 'success');
      this.renderStats();
    });
  }

  updateStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const streakKey = this.getStreakKey();
    let streakData = Storage.get(streakKey, { count: 0, lastDate: '' });

    if (streakData.lastDate === today) {
      // Đã học hôm nay
      return streakData.count;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (streakData.lastDate === yesterday) {
      streakData.count += 1;
    } else if (streakData.lastDate === '') {
      streakData.count = 1;
    } else {
      streakData.count = 1; // đứt chuỗi
    }
    streakData.lastDate = today;
    Storage.set(streakKey, streakData);
    return streakData.count;
  }

  renderHomeTab(langId = this.currentLang || 'zh') {
    const isEn = langId === 'en';
    const ctaBadge = document.querySelector('.home-learn-cta-badge');
    const ctaTitle = document.querySelector('.home-learn-cta-title');
    const ctaDesc = document.querySelector('.home-learn-cta-desc');
    const ctaBtn = document.getElementById('btn-home-learn-cta');
    const heroContent = document.querySelector('.hero-content');
    const roadmapGrid = document.querySelector('.roadmap-grid');
    const quickBar = document.querySelector('.quick-actions-bar');

    if (ctaBadge) ctaBadge.innerHTML = isEn ? `${ic('star', { size: 16 })} Lộ Trình CEFR Chuẩn Hóa` : `${ic('star', { size: 16 })} Lộ Trình HSK 3.0 Chuẩn Hóa`;
    if (ctaTitle) ctaTitle.textContent = isEn ? 'Học tiếng Anh bài bản từng bước' : 'Học tiếng Trung bài bản từng bước';
    if (ctaDesc) ctaDesc.textContent = isEn
      ? 'Chặng đường tương tác: Ngữ âm IPA 44 âm, 500 từ vựng thông dụng, luyện gõ phản xạ, phát âm AI và bài kiểm tra chặng.'
      : 'Chặng đường tương tác: Pinyin, từ vựng theo chủ đề, luyện gõ phản xạ, phát âm AI và bài kiểm tra chặng.';
    if (ctaBtn) {
      ctaBtn.href = isEn ? '#en/learn' : '#zh/learn';
    }

    if (heroContent) {
      if (isEn) {
        heroContent.innerHTML = `
          <div class="hero-badge-lang" style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <span class="seal-badge" style="background:#14213D;color:#FCA311;border:1px solid #B08D57;">Starter • A1</span>
            <span style="font-size: 0.88rem; color: var(--muted); font-weight: 500;">🇬🇧 Tiếng Anh Căn Bản • English</span>
          </div>
          <h2>Welcome! Hello there!</h2>
          <p>Học phát âm chuẩn 44 âm IPA, tích lũy 500 từ vựng cốt lõi theo phương pháp SM-2, nghe nói phản xạ và làm chủ giao tiếp thực tế.</p>
        `;
      } else {
        heroContent.innerHTML = `
          <div class="hero-badge-lang" style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <span class="seal-badge">HSK 1</span>
            <span style="font-size: 0.88rem; color: var(--muted); font-weight: 500;">🇨🇳 Tiếng Trung Cơ Bản • 中文</span>
          </div>
          <h2>Xin chào bạn! 你好！</h2>
          <p>Học phát âm chuẩn Pinyin, tích lũy 150 từ vựng cốt lõi theo phương pháp SM-2, tập viết chữ Hán thuận bút và phản xạ giao tiếp tự tin.</p>
        `;
      }
    }

    if (roadmapGrid) {
      if (isEn) {
        roadmapGrid.innerHTML = `
          <a href="#en/phonics" class="roadmap-card">
            <div class="step-badge">Bước 1</div>
            <h4>Nắm vững 44 âm IPA & Trọng âm</h4>
            <p>Học 44 âm IPA (nguyên âm đơn, đôi, phụ âm), cặp âm tối thiểu và kỹ năng nhấn/nối âm chuẩn bản xứ.</p>
            <span class="card-link">Học Ngữ âm IPA &rarr;</span>
          </a>

          <a href="#en/learn" class="roadmap-card">
            <div class="step-badge">Bước 2</div>
            <h4>Lộ trình học bài bản (Starter & A1)</h4>
            <p>Lộ trình 30 bài học với mục tiêu rõ ràng, từ vựng theo ngữ cảnh và bài tập đa dạng.</p>
            <span class="card-link">Vào Lộ trình &rarr;</span>
          </a>

          <a href="#en/flashcards" class="roadmap-card">
            <div class="step-badge">Bước 3</div>
            <h4>Ghi nhớ 500 từ vựng (SM-2)</h4>
            <p>Phương pháp lặp lại ngắt quãng khoa học giúp lưu trữ từ vựng vào trí nhớ dài hạn không bị quên.</p>
            <span class="card-link">Học Thẻ ghi nhớ &rarr;</span>
          </a>

          <a href="#en/talk" class="roadmap-card">
            <div class="step-badge">Bước 4</div>
            <h4>Luyện nói & Phản xạ thực tế</h4>
            <p>Rèn luyện khẩu ngữ qua 8 tình huống nhập vai và 10 đoạn hội thoại A-B có AI chấm điểm.</p>
            <span class="card-link">Luyện Nói & Phản xạ &rarr;</span>
          </a>
        `;
      } else {
        roadmapGrid.innerHTML = `
          <a href="#zh/pinyin" class="roadmap-card">
            <div class="step-badge">Bước 1</div>
            <h4>Nắm vững Pinyin & Thanh điệu</h4>
            <p>Học 21 thanh mẫu, 36 vận mẫu, 4 thanh điệu chuẩn ngữ âm và các quy tắc biến điệu cốt lõi.</p>
            <span class="card-link">Học Pinyin &rarr;</span>
          </a>

          <a href="#zh/writing" class="roadmap-card">
            <div class="step-badge">Bước 2</div>
            <h4>Nhận diện Bộ thủ & Tập viết</h4>
            <p>Làm quen với các bộ thủ thông dụng, thứ tự viết thuận bút và luyện từng nét chữ Hán vuông vức.</p>
            <span class="card-link">Luyện viết &rarr;</span>
          </a>

          <a href="#zh/flashcards" class="roadmap-card">
            <div class="step-badge">Bước 3</div>
            <h4>Ghi nhớ từ vựng (SM-2)</h4>
            <p>Phương pháp lặp lại ngắt quãng khoa học giúp lưu trữ từ vựng vào trí nhớ dài hạn không bị quên.</p>
            <span class="card-link">Học Thẻ ghi nhớ &rarr;</span>
          </a>

          <a href="#zh/dialogues" class="roadmap-card">
            <div class="step-badge">Bước 4</div>
            <h4>Hội thoại & Phản xạ thực tế</h4>
            <p>Rèn luyện tai nghe qua các bài đàm thoại thực tế theo ngữ cảnh đời sống thường nhật.</p>
            <span class="card-link">Luyện Hội thoại &rarr;</span>
          </a>
        `;
      }
    }

    if (quickBar) {
      if (isEn) {
        quickBar.innerHTML = `
          <a href="#en/flashcards" class="btn btn-primary btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="14" x="3" y="7" rx="2"/><path d="M7 3h10a2 2 0 0 1 2 2v2H5V5a2 2 0 0 1 2-2z"/></svg>
            <span>Ôn thẻ đến hạn ngay</span>
          </a>
          <a href="#en/quiz" class="btn btn-outline btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            <span>Làm bài kiểm tra nhanh</span>
          </a>
        `;
      } else {
        quickBar.innerHTML = `
          <a href="#zh/flashcards" class="btn btn-primary btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="14" x="3" y="7" rx="2"/><path d="M7 3h10a2 2 0 0 1 2 2v2H5V5a2 2 0 0 1 2-2z"/></svg>
            <span>Ôn thẻ đến hạn ngay</span>
          </a>
          <a href="#zh/quiz" class="btn btn-outline btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            <span>Làm bài kiểm tra nhanh</span>
          </a>
        `;
      }
    }
  }

  renderStats() {
    const sm2Key = this.getSm2Key();
    const streakKey = this.getStreakKey();
    const sm2Data = Storage.get(sm2Key, {});
    const streakData = Storage.get(streakKey, { count: 0 });
    const today = new Date().toISOString().slice(0, 10);

    // Đếm số từ đã thuộc (repetition >= 2 hoặc interval >= 3)
    let learnedCount = 0;
    let dueCount = 0;

    Object.keys(sm2Data).forEach(id => {
      const item = sm2Data[id];
      if (item && (item.repetition >= 2 || item.interval >= 3)) {
        learnedCount++;
      }
      if (item && item.dueDate && item.dueDate <= today) {
        dueCount++;
      }
    });

    const elLearned = document.getElementById('stat-learned-count');
    const elStreak = document.getElementById('stat-streak-count');
    const elDue = document.getElementById('stat-due-count');

    if (elLearned) elLearned.textContent = learnedCount;
    if (elStreak) elStreak.textContent = streakData.count || 0;
    if (elDue) elDue.textContent = dueCount;

    const lang = (window.LANGUAGES || []).find(l => l.id === (this.currentLang || 'zh')) || (window.LANGUAGES || [])[0];
    if (lang) {
      this.updateSidebarProgress(lang);
    }
  }

  /* ==========================================================================
     TAB 2: PINYIN & TONE CURVES
     ========================================================================== */
  initPinyinTab() {
    // Subnav switching
    const subButtons = document.querySelectorAll('#tab-pinyin .subnav-btn');
    subButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        subButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetId = `sub-${btn.getAttribute('data-sub')}`;
        document.querySelectorAll('#tab-pinyin .subtab-content').forEach(pane => {
          pane.classList.toggle('active', pane.id === targetId);
        });
      });
    });

    this.renderTones();
    this.renderInitials();
    this.renderFinals();
    this.initToneDrill();
  }

  // Vẽ biểu đồ cao độ Ngũ độ chế bằng SVG từ curve (thang 1 đến 5)
  renderToneCurveSVG(curve) {
    const w = 140;
    const h = 75;
    const pad = 12;

    // Cao độ: 5 ở trên cùng, 1 ở dưới cùng
    const getY = (level) => {
      return pad + (5 - level) * ((h - 2 * pad) / 4);
    };

    // Vẽ lưới tọa độ mờ (5 mức độ 1-5)
    let gridLines = '';
    for (let i = 1; i <= 5; i++) {
      const y = getY(i);
      gridLines += `<line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="currentColor" stroke-opacity="0.15" stroke-dasharray="2,2" />`;
      gridLines += `<text x="${pad - 4}" y="${y + 3}" font-size="8" fill="currentColor" opacity="0.4" text-anchor="end">${i}</text>`;
    }

    let curvePath = '';
    if (!curve || curve.length === 0) {
      curvePath = '';
    } else if (curve.length === 1) {
      // Thanh nhẹ: chấm tròn ở giữa mức 3
      const cx = w / 2;
      const cy = getY(curve[0]);
      curvePath = `<circle cx="${cx}" cy="${cy}" r="4" fill="var(--primary)" />`;
    } else {
      const stepX = (w - 2 * pad) / (curve.length - 1);
      const points = curve.map((val, idx) => {
        const x = pad + idx * stepX;
        const y = getY(val);
        return `${x},${y}`;
      }).join(' ');

      curvePath = `
        <polyline points="${points}" fill="none" stroke="var(--primary)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        ${curve.map((val, idx) => {
          const x = pad + idx * stepX;
          const y = getY(val);
          return `<circle cx="${x}" cy="${y}" r="3" fill="var(--primary)" />`;
        }).join('')}
      `;
    }

    return `
      <svg class="tone-svg" viewBox="0 0 ${w} ${h}">
        ${gridLines}
        ${curvePath}
      </svg>
    `;
  }

  renderTones() {
    const container = document.getElementById('tones-container');
    if (!container) return;
    const tones = this.dataPinyin.tones || [];

    container.innerHTML = tones.map(t => {
      const sampleWord = t.n === 1 ? 'mā' : t.n === 2 ? 'má' : t.n === 3 ? 'mǎ' : t.n === 4 ? 'mà' : 'ma';
      return `
        <div class="tone-card" onclick="app.speakText('${sampleWord}')">
          <div class="tone-card-header">
            <span class="tone-mark">${t.mark || t.n}</span>
            <span class="tone-title">${t.name}</span>
          </div>
          <div class="tone-svg-wrap">
            ${this.renderToneCurveSVG(t.curve)}
          </div>
          <div class="tone-desc">${t.vi}</div>
          <div class="tone-play-btn">${ic('volume')} Nghe mẫu (${sampleWord})</div>
        </div>
      `;
    }).join('');
  }

  renderInitials() {
    const container = document.getElementById('initials-container');
    if (!container) return;
    const initials = this.dataPinyin.initials || [];

    container.innerHTML = initials.map(item => {
      const cleanEx = (item.ex || '').split(' ')[0] || item.p;
      return `
        <div class="pinyin-cell-card" onclick="app.speakText('${cleanEx}')">
          <div class="pinyin-cell-symbol">${item.p}</div>
          <div class="pinyin-cell-ex">${item.ex || ''}</div>
          <div class="pinyin-cell-vi">${item.vi || ''}</div>
        </div>
      `;
    }).join('');
  }

  renderFinals() {
    const container = document.getElementById('finals-container');
    if (!container) return;
    const finals = this.dataPinyin.finals || [];

    container.innerHTML = finals.map(item => {
      const cleanEx = (item.ex || '').split(' ')[0] || item.p;
      return `
        <div class="pinyin-cell-card" onclick="app.speakText('${cleanEx}')">
          <div class="pinyin-cell-symbol">${item.p}</div>
          <div class="pinyin-cell-ex">${item.ex || ''}</div>
          <div class="pinyin-cell-vi">${item.vi || ''}</div>
        </div>
      `;
    }).join('');
  }

  /* Tone drill logic */
  initToneDrill() {
    const btnPlay = document.getElementById('btn-drill-play');
    const btnNext = document.getElementById('btn-drill-next');
    const optButtons = document.querySelectorAll('.drill-opt');

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (this.drillCurrent) {
          this.speakText(this.drillCurrent.hanzi || this.drillCurrent.syl);
        }
      });
    }

    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosenTone = parseInt(btn.getAttribute('data-tone'), 10);
        this.submitToneDrill(chosenTone);
      });
    });

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        this.loadNextToneDrill();
      });
    }

    this.loadNextToneDrill();
  }

  loadNextToneDrill() {
    const drills = this.dataPinyin.toneDrill || [];
    if (drills.length === 0) return;

    this.drillCurrent = drills[Math.floor(Math.random() * drills.length)];

    const hanziDisplay = document.getElementById('drill-hanzi-display');
    const feedback = document.getElementById('drill-feedback');
    const btnNext = document.getElementById('btn-drill-next');

    if (hanziDisplay) hanziDisplay.textContent = '?';
    if (feedback) {
      feedback.className = 'drill-feedback hidden';
      feedback.textContent = '';
    }
    if (btnNext) btnNext.classList.add('hidden');

    document.querySelectorAll('.drill-opt').forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('correct', 'wrong');
    });

    // Tự động phát âm câu mới
    setTimeout(() => {
      if (this.drillCurrent) {
        this.speakText(this.drillCurrent.hanzi || this.drillCurrent.syl);
      }
    }, 200);
  }

  submitToneDrill(chosenTone) {
    if (!this.drillCurrent) return;

    const isCorrect = chosenTone === this.drillCurrent.tone;
    this.drillTotal++;
    if (isCorrect) this.drillScore++;

    const scoreVal = document.getElementById('drill-score-val');
    const totalVal = document.getElementById('drill-total-val');
    const hanziDisplay = document.getElementById('drill-hanzi-display');
    const feedback = document.getElementById('drill-feedback');
    const btnNext = document.getElementById('btn-drill-next');

    if (scoreVal) scoreVal.textContent = this.drillScore;
    if (totalVal) totalVal.textContent = this.drillTotal;

    // Tiết lộ chữ Hán và Pinyin
    if (hanziDisplay) {
      hanziDisplay.textContent = `${this.drillCurrent.hanzi} (${this.drillCurrent.syl})`;
    }

    document.querySelectorAll('.drill-opt').forEach(btn => {
      btn.disabled = true;
      const t = parseInt(btn.getAttribute('data-tone'), 10);
      if (t === this.drillCurrent.tone) {
        btn.classList.add('correct');
      } else if (t === chosenTone && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    if (feedback) {
      feedback.classList.remove('hidden');
      if (isCorrect) {
        feedback.className = 'drill-feedback is-correct';
        feedback.textContent = `Chính xác! Âm "${this.drillCurrent.syl}" mang Thanh ${this.drillCurrent.tone}.`;
      } else {
        feedback.className = 'drill-feedback is-wrong';
        feedback.textContent = `Chưa đúng! Đáp án chính xác là Thanh ${this.drillCurrent.tone} (${this.drillCurrent.syl}).`;
      }
    }

    if (btnNext) btnNext.classList.remove('hidden');
  }

  /* ==========================================================================
     TAB 3: VOCABULARY
     ========================================================================== */
  normalizePinyin(str) {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ü/g, 'v')
      .replace(/\s+/g, '')
      .toLowerCase();
  }

  initVocabTab() {
    const filterSelect = document.getElementById('vocab-topic-filter');
    const searchInput = document.getElementById('vocab-search');
    const topics = this.getCurrentTopics();

    if (filterSelect) {
      filterSelect.innerHTML = '<option value="">Tất cả chủ đề</option>' +
        topics.map(t => `<option value="${t.id}">${t.icon || ''} ${t.name}</option>`).join('');

      filterSelect.addEventListener('change', () => this.renderVocabList());
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => this.renderVocabList());
    }

    this.renderVocabList();
  }

  renderVocabList() {
    const grid = document.getElementById('vocab-grid');
    const countIndicator = document.getElementById('vocab-visible-count');
    const filterSelect = document.getElementById('vocab-topic-filter');
    const searchInput = document.getElementById('vocab-search');
    const vocab = this.getCurrentVocab();
    const topics = this.getCurrentTopics();

    if (!grid) return;

    const selectedTopic = filterSelect ? filterSelect.value : '';
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const normQuery = this.normalizePinyin(query);

    const filtered = vocab.filter(item => {
      if (selectedTopic && item.topic !== selectedTopic) return false;
      if (!query) return true;

      const mainWord = (item.word || item.hanzi || '').toLowerCase();
      const matchWord = mainWord.includes(query);
      const matchVi = (item.vi || '').toLowerCase().includes(query);
      const phonetic = item.ipa || item.pinyin || '';
      const normPy = this.normalizePinyin(phonetic);
      const matchPhonetic = phonetic.toLowerCase().includes(query) || normPy.includes(normQuery);

      return matchWord || matchVi || matchPhonetic;
    });

    if (countIndicator) countIndicator.textContent = filtered.length;

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">Không tìm thấy từ vựng phù hợp.</div>';
      return;
    }

    const isZh = (this.currentLang || 'zh') === 'zh';

    grid.innerHTML = filtered.map(item => {
      const topicObj = topics.find(t => t.id === item.topic);
      const topicName = topicObj ? topicObj.name : item.topic;
      const wordText = item.word || item.hanzi;
      const phoneticText = item.ipa || item.pinyin || '';
      const safeWord = wordText.replace(/'/g, "\\'");
      const firstChar = (item.hanzi || '')[0] || '你';

      let exHtml = '';
      if (item.ex) {
        const exText = item.ex.en || item.ex.zh || '';
        const safeEx = exText.replace(/'/g, "\\'");
        const exPhonetic = item.ex.ipa || item.ex.py || '';
        exHtml = `
          <div class="vocab-ex-box">
            <div class="vocab-ex-zh">
              <span>${exText}</span>
              <button class="btn-icon btn-sm vocab-ex-audio" onclick="app.speakText('${safeEx}')" title="Nghe câu ví dụ">
                <svg class="vocab-speaker-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              </button>
            </div>
            ${exPhonetic ? `<div class="vocab-ex-py">${exPhonetic}</div>` : ''}
            <div class="vocab-ex-vi">${item.ex.vi || ''}</div>
          </div>
        `;
      }

      return `
        <div class="vocab-card">
          <div class="vocab-card-header">
            <span class="vocab-hanzi" onclick="app.speakText('${safeWord}')" title="Bấm để nghe">${wordText}</span>
            <div class="vocab-meta">
              <span class="badge">${item.pos || 'từ'}</span>
              ${item.level ? `<span class="badge badge-subtle">${item.level.toUpperCase()}</span>` : ''}
              <span class="badge">${topicName}</span>
            </div>
          </div>
          <div class="vocab-pinyin">${phoneticText}</div>
          <div class="vocab-vi">${item.vi}</div>
          ${item.note ? `<div class="vocab-note" style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">${ic('lightbulb', { size: 14 })} ${item.note}</div>` : ''}

          ${exHtml}

          <div class="vocab-footer">
            <button class="btn btn-outline btn-sm btn-vocab-speak" onclick="app.speakText('${safeWord}')" title="Nghe phát âm">
              <svg class="vocab-speaker-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
              <span>Phát âm</span>
            </button>
            ${isZh ? `
            <a href="#zh/writing?char=${encodeURIComponent(firstChar)}" class="btn btn-outline btn-sm btn-vocab-write" title="Tập viết chữ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              <span>Tập viết</span>
            </a>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  /* ==========================================================================
     TAB 4: FLASHCARDS (SM-2 Spaced Repetition)
     ========================================================================== */
  initFlashcardsTab() {
    const topicSelect = document.getElementById('fc-topic-select');
    const modeSelect = document.getElementById('fc-mode-select');
    const cardEl = document.getElementById('flashcard-element');
    const btnRestart = document.getElementById('btn-fc-restart');

    if (topicSelect) {
      topicSelect.innerHTML = '<option value="">Tất cả chủ đề</option>' +
        this.getCurrentTopics().map(t => `<option value="${t.id}">${t.icon || ''} ${t.name}</option>`).join('');

      topicSelect.addEventListener('change', () => this.startFlashcardSession());
    }

    if (modeSelect) {
      modeSelect.addEventListener('change', () => this.startFlashcardSession());
    }

    if (cardEl) {
      cardEl.addEventListener('click', () => this.toggleFlashcardFlip());
    }

    // Rating buttons
    document.querySelectorAll('.fc-rating-actions .btn-rate').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const grade = parseInt(btn.getAttribute('data-grade'), 10);
        this.rateFlashcard(grade);
      });
    });

    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        if (modeSelect) modeSelect.value = 'all';
        this.startFlashcardSession();
      });
    }

    // Keyboard Shortcuts: Space to flip, 1-4 to rate
    window.addEventListener('keydown', (e) => {
      if (this.currentTab !== 'flashcards') return;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        this.toggleFlashcardFlip();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        this.rateFlashcard(parseInt(e.key, 10));
      }
    });

    // Pronunciation on back of card
    const btnSpeak = document.getElementById('btn-fc-speak');
    if (btnSpeak) {
      btnSpeak.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = this.fcQueue[this.fcCurrentIdx];
        if (card) this.speakText(card.word || card.hanzi);
      });
    }

    const btnSpeakEx = document.getElementById('btn-fc-speak-ex');
    if (btnSpeakEx) {
      btnSpeakEx.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = this.fcQueue[this.fcCurrentIdx];
        if (card && card.ex) this.speakText(card.ex.en || card.ex.zh);
      });
    }
  }

  startFlashcardSession() {
    const topicSelect = document.getElementById('fc-topic-select');
    const modeSelect = document.getElementById('fc-mode-select');
    const selectedTopic = topicSelect ? topicSelect.value : '';
    const selectedMode = modeSelect ? modeSelect.value : 'due';

    const sm2Key = this.getSm2Key();
    const sm2Data = Storage.get(sm2Key, {});
    const today = new Date().toISOString().slice(0, 10);
    const dailyTarget = Storage.get(this.getDailyTargetKey(), 10);
    const quizWrongs = Storage.get(this.getQuizWrongsKey(), []);

    const vocab = this.getCurrentVocab();
    let candidates = vocab.filter(item => {
      if (selectedTopic && item.topic !== selectedTopic) return false;
      return true;
    });

    if (selectedMode === 'due') {
      // Chỉ lấy thẻ đến hạn hôm nay
      this.fcQueue = candidates.filter(item => {
        const record = sm2Data[item.id];
        return record && record.dueDate && record.dueDate <= today;
      });
      // Nếu không có thẻ đến hạn, tự động đề xuất từ mới
      if (this.fcQueue.length === 0) {
        const unlearned = candidates.filter(item => !sm2Data[item.id]);
        this.fcQueue = unlearned.slice(0, dailyTarget);
      }
    } else if (selectedMode === 'new') {
      // Lấy từ mới chưa học (giới hạn theo mục tiêu hàng ngày)
      const unlearned = candidates.filter(item => !sm2Data[item.id]);
      this.fcQueue = unlearned.slice(0, dailyTarget);
    } else if (selectedMode === 'wrong') {
      // Các từ sai trong quiz
      this.fcQueue = candidates.filter(item => quizWrongs.includes(item.id));
    } else {
      // Tất cả
      this.fcQueue = [...candidates];
    }

    this.fcCurrentIdx = 0;
    this.isFcFlipped = false;
    this.renderCurrentFlashcard();
  }

  toggleFlashcardFlip() {
    const cardEl = document.getElementById('flashcard-element');
    if (!cardEl) return;
    this.isFcFlipped = !this.isFcFlipped;
    cardEl.classList.toggle('flipped', this.isFcFlipped);

    // Khi lật sang mặt sau, tự động phát âm nếu chưa phát
    if (this.isFcFlipped) {
      const card = this.fcQueue[this.fcCurrentIdx];
      if (card) {
        this.speakText(card.word || card.hanzi);
      }
    }
  }

  renderCurrentFlashcard() {
    const scene = document.getElementById('fc-scene');
    const ratingBar = document.getElementById('fc-rating-bar');
    const completedState = document.getElementById('fc-completed-state');
    const cardEl = document.getElementById('flashcard-element');
    const curIdxEl = document.getElementById('fc-current-idx');
    const totalCountEl = document.getElementById('fc-total-count');

    this.isFcFlipped = false;
    if (cardEl) cardEl.classList.remove('flipped');

    if (this.fcQueue.length === 0 || this.fcCurrentIdx >= this.fcQueue.length) {
      if (scene) scene.classList.add('hidden');
      if (ratingBar) ratingBar.classList.add('hidden');
      if (completedState) completedState.classList.remove('hidden');
      if (curIdxEl) curIdxEl.textContent = '0';
      if (totalCountEl) totalCountEl.textContent = '0';
      return;
    }

    if (scene) scene.classList.remove('hidden');
    if (ratingBar) ratingBar.classList.remove('hidden');
    if (completedState) completedState.classList.add('hidden');

    const card = this.fcQueue[this.fcCurrentIdx];
    if (curIdxEl) curIdxEl.textContent = this.fcCurrentIdx + 1;
    if (totalCountEl) totalCountEl.textContent = this.fcQueue.length;

    const wordText = card.word || card.hanzi;
    const phoneticText = card.ipa || card.pinyin || '';
    const topics = this.getCurrentTopics();
    const topicObj = topics.find(t => t.id === card.topic);

    // Mặt trước
    const frontTopic = document.getElementById('fc-front-topic');
    const frontHanzi = document.getElementById('fc-front-hanzi');
    if (frontTopic) frontTopic.textContent = topicObj ? topicObj.name : (card.topic || 'Từ vựng');
    if (frontHanzi) frontHanzi.textContent = wordText;

    // Mặt sau
    const backPos = document.getElementById('fc-back-pos');
    const backHanzi = document.getElementById('fc-back-hanzi');
    const backPinyin = document.getElementById('fc-back-pinyin');
    const backVi = document.getElementById('fc-back-vi');
    const exBox = document.getElementById('fc-back-ex-box');
    const exZh = document.getElementById('fc-back-ex-zh');
    const exPy = document.getElementById('fc-back-ex-py');
    const exVi = document.getElementById('fc-back-ex-vi');

    if (backPos) backPos.textContent = card.pos || 'từ';
    if (backHanzi) backHanzi.textContent = wordText;
    if (backPinyin) backPinyin.textContent = phoneticText;
    if (backVi) backVi.textContent = card.vi;

    if (card.ex) {
      if (exBox) exBox.classList.remove('hidden');
      if (exZh) exZh.textContent = card.ex.en || card.ex.zh || '';
      if (exPy) exPy.textContent = card.ex.ipa || card.ex.py || '';
      if (exVi) exVi.textContent = card.ex.vi || '';
    } else if (exBox) {
      exBox.classList.add('hidden');
    }
  }

  // Thuật toán Lặp lại ngắt quãng SM-2 đơn giản
  rateFlashcard(grade) {
    if (this.fcQueue.length === 0 || this.fcCurrentIdx >= this.fcQueue.length) return;
    const card = this.fcQueue[this.fcCurrentIdx];
    const sm2Key = this.getSm2Key();
    const sm2Data = Storage.get(sm2Key, {});
    const existing = sm2Data[card.id] || { interval: 0, repetition: 0, efactor: 2.5 };

    let interval = existing.interval;
    let repetition = existing.repetition;
    let efactor = existing.efactor;

    if (grade === 1) { // Quên
      repetition = 0;
      interval = 1;
      efactor = Math.max(1.3, efactor - 0.2);
    } else if (grade === 2) { // Khó
      repetition = Math.max(1, repetition);
      interval = Math.max(1, Math.round(interval * 1.2));
      efactor = Math.max(1.3, efactor - 0.15);
    } else if (grade === 3) { // Nhớ
      if (repetition === 0) interval = 1;
      else if (repetition === 1) interval = 6;
      else interval = Math.round(interval * efactor);
      repetition += 1;
    } else if (grade === 4) { // Dễ
      if (repetition === 0) interval = 2;
      else if (repetition === 1) interval = 7;
      else interval = Math.round(interval * efactor * 1.3);
      repetition += 1;
      efactor = efactor + 0.15;
    }

    const d = new Date();
    d.setDate(d.getDate() + interval);
    const dueDate = d.toISOString().slice(0, 10);

    sm2Data[card.id] = { interval, repetition, efactor, dueDate };
    Storage.set(sm2Key, sm2Data);

    // Cập nhật streak
    this.updateStreak();
    this.renderStats();

    // Thưởng kinh tế an toàn
    if (typeof window !== 'undefined' && window.Economy && typeof window.Economy.reward === 'function') {
      window.Economy.reward('flashcard');
    }

    // Chuyển thẻ tiếp theo
    this.fcCurrentIdx++;
    this.renderCurrentFlashcard();
  }

  /* ==========================================================================
     TAB 5: WRITING (HanziWriter) & RADICALS
     ========================================================================== */
  initWritingTab() {
    this.populateCharPicker();
    this.renderRadicalsTable();

    const charSelect = document.getElementById('select-char');
    const inputCustom = document.getElementById('input-custom-char');
    const btnLoadCustom = document.getElementById('btn-load-custom-char');
    const btnAnimate = document.getElementById('btn-writer-animate');
    const btnQuiz = document.getElementById('btn-writer-quiz');
    const btnHint = document.getElementById('btn-writer-hint');
    const btnReset = document.getElementById('btn-writer-reset');
    const btnSpeak = document.getElementById('btn-writer-speak');
    const radicalSearch = document.getElementById('radical-search');

    if (charSelect) {
      charSelect.addEventListener('change', () => {
        this.loadCharacterToWrite(charSelect.value);
      });
    }

    if (btnLoadCustom && inputCustom) {
      btnLoadCustom.addEventListener('click', () => {
        const val = inputCustom.value.trim();
        if (val) {
          const char = val[0];
          this.loadCharacterToWrite(char);
        }
      });
    }

    if (btnAnimate) {
      btnAnimate.addEventListener('click', () => {
        if (this.writer) {
          this.setWriterStatus('Đang hiển thị thứ tự nét...');
          this.writer.animateCharacter({
            onComplete: () => this.setWriterStatus('Đã xem xong thứ tự nét.')
          });
        }
      });
    }

    if (btnQuiz) {
      btnQuiz.addEventListener('click', () => {
        if (this.writer) {
          this.setWriterStatus('Hãy dùng chuột hoặc ngón tay để vẽ các nét theo thứ tự!');
          this.writer.quiz({
            onMistake: (strokeData) => {
              this.setWriterStatus(`Nét chưa đúng (Sai nét thứ ${strokeData.strokeNum + 1}). Thử lại nhé!`);
            },
            onCorrectStroke: (strokeData) => {
              this.setWriterStatus(`Tuyệt vời! Đúng nét thứ ${strokeData.strokeNum + 1}.`);
            },
            onComplete: (summary) => {
              this.setWriterStatus(`Hoàn thành xuất sắc! (Tổng lỗi sai: ${summary.totalMistakes})`);
              this.showToast('Chúc mừng bạn đã viết xong chữ!', 'success');
            }
          });
        }
      });
    }

    if (btnHint) {
      btnHint.addEventListener('click', () => {
        if (this.writer) {
          this.writer.showOutline();
          this.setWriterStatus('Đã hiện đường nét gợi ý.');
        }
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (this.writer) {
          this.writer.hideCharacter();
          this.writer.showOutline();
          this.setWriterStatus('Đã làm lại. Sẵn sàng tập viết!');
        }
      });
    }

    if (btnSpeak) {
      btnSpeak.addEventListener('click', () => {
        const char = this.currentChar || '你';
        this.speakText(char);
      });
    }

    if (radicalSearch) {
      radicalSearch.addEventListener('input', () => {
        this.renderRadicalsTable(radicalSearch.value);
      });
    }
  }

  setWriterStatus(msg) {
    const el = document.getElementById('writer-status-msg');
    if (el) el.textContent = msg;
  }

  populateCharPicker() {
    const charSelect = document.getElementById('select-char');
    if (!charSelect) return;

    // Tách các chữ Hán đơn từ danh sách VOCAB
    const charSet = new Set();
    this.dataVocab.forEach(item => {
      for (const ch of (item.hanzi || '')) {
        if (/[\u4e00-\u9fa5]/.test(ch)) {
          charSet.add(ch);
        }
      }
    });

    const uniqueChars = Array.from(charSet);
    charSelect.innerHTML = uniqueChars.map(ch => `<option value="${ch}">${ch}</option>`).join('');
  }

  selectWritingChar(char) {
    const charSelect = document.getElementById('select-char');
    if (charSelect) {
      let optionExists = Array.from(charSelect.options).some(opt => opt.value === char);
      if (!optionExists) {
        const newOpt = document.createElement('option');
        newOpt.value = char;
        newOpt.textContent = char;
        charSelect.appendChild(newOpt);
      }
      charSelect.value = char;
    }
    this.loadCharacterToWrite(char);
  }

  initHanziWriter() {
    const charSelect = document.getElementById('select-char');
    const startChar = (charSelect && charSelect.value) ? charSelect.value : '你';
    this.loadCharacterToWrite(startChar);
  }

  loadCharacterToWrite(char) {
    this.currentChar = char;
    const target = document.getElementById('writer-target');
    if (!target) return;
    target.innerHTML = '';

    if (typeof window.HanziWriter === 'undefined') {
      target.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-muted);">Không tải được thư viện HanziWriter (cần kết nối mạng lần đầu).</div>';
      return;
    }

    try {
      const computedStyles = getComputedStyle(document.documentElement);
      const strokeColor = computedStyles.getPropertyValue('--accent').trim() || '#b3261e';
      const drawColor = computedStyles.getPropertyValue('--accent-hover').trim() || '#981f18';

      this.writer = window.HanziWriter.create('writer-target', char, {
        width: 250,
        height: 250,
        padding: 15,
        showOutline: true,
        strokeAnimationSpeed: 1.2,
        delayBetweenStrokes: 180,
        strokeColor: strokeColor,
        radicalColor: '#10b981',
        highlightColor: '#f59e0b',
        drawingColor: drawColor
      });
      this.setWriterStatus(`Chữ: ${char} - Sẵn sàng tập viết`);
    } catch (e) {
      console.error('Lỗi khởi tạo HanziWriter:', e);
      this.setWriterStatus('Lỗi khi vẽ chữ Hán này.');
    }
  }

  renderRadicalsTable(searchQuery = '') {
    const tbody = document.getElementById('radicals-tbody');
    if (!tbody) return;
    const query = (searchQuery || '').trim().toLowerCase();

    const filtered = this.dataRadicals.filter(rad => {
      if (!query) return true;
      return (rad.r || '').includes(query) ||
             (rad.alt || '').includes(query) ||
             (rad.py || '').toLowerCase().includes(query) ||
             (rad.vi || '').toLowerCase().includes(query) ||
             (rad.ex || '').includes(query);
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Không tìm thấy bộ thủ phù hợp.</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map(rad => {
      return `
        <tr>
          <td class="rad-char">${rad.r}</td>
          <td class="rad-alt">${rad.alt || '-'}</td>
          <td>${rad.py || ''}</td>
          <td>${rad.vi || ''}</td>
          <td class="rad-ex">${rad.ex || ''}</td>
          <td>
            <button class="btn-practice-rad" onclick="app.selectWritingChar('${rad.r}')">Tập</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  /* ==========================================================================
     TAB 6: QUIZ
     ========================================================================== */
  updateQuizIntroDesc(langId = this.currentLang || 'zh') {
    const isEn = langId === 'en';
    const descEl = document.getElementById('quiz-intro-desc') || document.querySelector('#quiz-intro-box p');
    if (descEl) {
      descEl.innerHTML = isEn
        ? '10 câu hỏi ngẫu nhiên bao gồm 4 dạng: Từ vựng &rarr; Nghĩa, Nghĩa &rarr; Từ vựng, Nghe âm &rarr; Từ vựng, Từ vựng &rarr; Phiên âm IPA.'
        : '10 câu hỏi ngẫu nhiên bao gồm 4 dạng: Chữ Hán &rarr; Nghĩa, Nghĩa &rarr; Chữ Hán, Nghe âm &rarr; Chữ Hán, Chữ Hán &rarr; Pinyin.';
    }
  }

  initQuizTab() {
    this.updateQuizIntroDesc(this.currentLang);
    const btnStart = document.getElementById('btn-start-quiz');
    const btnNext = document.getElementById('btn-quiz-next');
    const btnRestart = document.getElementById('btn-quiz-restart');
    const btnReviewWrong = document.getElementById('btn-quiz-review-wrong');
    const btnAudio = document.getElementById('btn-quiz-audio');

    if (btnStart) btnStart.addEventListener('click', () => this.startQuiz());
    if (btnNext) btnNext.addEventListener('click', () => this.nextQuizQuestion());
    if (btnRestart) btnRestart.addEventListener('click', () => this.startQuiz());

    if (btnReviewWrong) {
      btnReviewWrong.addEventListener('click', () => {
        const wrongIds = this.quizWrongList.map(item => item.id);
        Storage.set(this.getQuizWrongsKey(), wrongIds);
        this.showToast(`Đã đưa ${wrongIds.length} từ vào Thẻ ghi nhớ!`, 'success');
        window.location.hash = `#${this.currentLang || 'zh'}/flashcards?mode=wrong`;
      });
    }

    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        const q = this.quizQuestions[this.quizCurrentIdx];
        if (q && q.audioText) this.speakText(q.audioText);
      });
    }
  }

  startQuiz() {
    const vocab = this.getCurrentVocab();
    if (vocab.length < 4) {
      this.showToast('Cần ít nhất 4 từ vựng để tạo bài kiểm tra.', 'warning');
      return;
    }

    // Chọn 10 câu ngẫu nhiên
    const shuffled = [...vocab].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    const isEn = this.currentLang === 'en';
    const types = isEn
      ? ['word_to_vi', 'vi_to_word', 'audio_to_word', 'word_to_ipa']
      : ['hanzi_to_vi', 'vi_to_hanzi', 'audio_to_hanzi', 'hanzi_to_pinyin'];

    this.quizQuestions = selected.map(item => {
      const qType = types[Math.floor(Math.random() * types.length)];
      // Tạo 3 phương án sai
      const distractors = vocab.filter(v => v.id !== item.id)
                               .sort(() => 0.5 - Math.random())
                               .slice(0, 3);
      const allChoices = [item, ...distractors].sort(() => 0.5 - Math.random());

      const mainWord = item.word || item.hanzi;
      const phonetic = item.ipa || item.pinyin || '';
      let prompt = '';
      let typeLabel = '';
      let isAudio = false;
      let audioText = '';

      if (qType === 'word_to_vi' || qType === 'hanzi_to_vi') {
        typeLabel = isEn ? 'Từ vựng → Nghĩa' : 'Chữ Hán → Nghĩa';
        prompt = mainWord;
      } else if (qType === 'vi_to_word' || qType === 'vi_to_hanzi') {
        typeLabel = isEn ? 'Nghĩa → Từ vựng' : 'Nghĩa → Chữ Hán';
        prompt = item.vi;
      } else if (qType === 'audio_to_word' || qType === 'audio_to_hanzi') {
        typeLabel = isEn ? 'Nghe âm → Từ vựng' : 'Nghe âm → Chữ Hán';
        prompt = `${ic('headphones')} Nghe và chọn từ đúng`;
        isAudio = true;
        audioText = mainWord;
      } else {
        typeLabel = isEn ? 'Từ vựng → Phiên âm IPA' : 'Chữ Hán → Pinyin';
        prompt = mainWord;
      }

      const options = allChoices.map(c => {
        let label = '';
        if (qType === 'word_to_vi' || qType === 'hanzi_to_vi') label = c.vi;
        else if (qType === 'vi_to_word' || qType === 'vi_to_hanzi' || qType === 'audio_to_word' || qType === 'audio_to_hanzi') label = c.word || c.hanzi;
        else label = c.ipa || c.pinyin;
        return { id: c.id, label, isCorrect: c.id === item.id };
      });

      return {
        item,
        type: qType,
        typeLabel,
        prompt,
        isAudio,
        audioText,
        options
      };
    });

    this.quizCurrentIdx = 0;
    this.quizScore = 0;
    this.quizWrongList = [];

    document.getElementById('quiz-intro-box').classList.add('hidden');
    document.getElementById('quiz-result-box').classList.add('hidden');
    document.getElementById('quiz-active-box').classList.remove('hidden');

    this.renderQuizQuestion();
  }

  renderQuizQuestion() {
    const q = this.quizQuestions[this.quizCurrentIdx];
    if (!q) return;

    const progressFill = document.getElementById('quiz-progress-fill');
    const qNum = document.getElementById('quiz-q-num');
    const qTypeLabel = document.getElementById('quiz-q-type-label');
    const promptText = document.getElementById('quiz-prompt-text');
    const btnAudio = document.getElementById('btn-quiz-audio');
    const optionsContainer = document.getElementById('quiz-options-container');
    const feedback = document.getElementById('quiz-feedback');
    const btnNext = document.getElementById('btn-quiz-next');

    const percent = ((this.quizCurrentIdx + 1) / this.quizQuestions.length) * 100;
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (qNum) qNum.textContent = `Câu ${this.quizCurrentIdx + 1} / ${this.quizQuestions.length}`;
    if (qTypeLabel) qTypeLabel.textContent = q.typeLabel;

    if (promptText) {
      promptText.innerHTML = q.prompt;
      promptText.classList.toggle('vi-text', q.type === 'vi_to_hanzi' || q.type === 'vi_to_word');
    }

    if (btnAudio) {
      if (q.isAudio) {
        btnAudio.classList.remove('hidden');
        this.speakText(q.audioText);
      } else {
        btnAudio.classList.add('hidden');
      }
    }

    if (feedback) {
      feedback.className = 'quiz-feedback hidden';
      feedback.textContent = '';
    }
    if (btnNext) btnNext.classList.add('hidden');

    if (optionsContainer) {
      optionsContainer.innerHTML = q.options.map((opt, idx) => `
        <button class="quiz-opt-btn" data-idx="${idx}">${opt.label}</button>
      `).join('');

      optionsContainer.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-idx'), 10);
          this.submitQuizAnswer(idx);
        });
      });
    }
  }

  submitQuizAnswer(chosenIdx) {
    const q = this.quizQuestions[this.quizCurrentIdx];
    if (!q) return;

    const chosenOpt = q.options[chosenIdx];
    const isCorrect = chosenOpt && chosenOpt.isCorrect;

    const feedback = document.getElementById('quiz-feedback');
    const btnNext = document.getElementById('btn-quiz-next');

    // Disable all options and show colors
    document.querySelectorAll('.quiz-opt-btn').forEach((btn, idx) => {
      btn.disabled = true;
      if (q.options[idx].isCorrect) {
        btn.classList.add('correct');
      } else if (idx === chosenIdx && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    const mainWord = q.item.word || q.item.hanzi;
    const phonetic = q.item.ipa || q.item.pinyin || '';

    if (isCorrect) {
      this.quizScore++;
      if (typeof window !== 'undefined' && window.Economy && typeof window.Economy.reward === 'function') {
        window.Economy.reward('quizCorrect');
      }
      if (feedback) {
        feedback.className = 'quiz-feedback correct';
        feedback.textContent = `Chính xác! (${mainWord} - ${phonetic}: ${q.item.vi})`;
      }
    } else {
      this.quizWrongList.push(q.item);
      if (feedback) {
        feedback.className = 'quiz-feedback wrong';
        feedback.textContent = `Chưa đúng! Đáp án đúng: ${mainWord} [${phonetic}] = ${q.item.vi}`;
      }
    }

    if (feedback) feedback.classList.remove('hidden');
    if (btnNext) btnNext.classList.remove('hidden');
  }

  nextQuizQuestion() {
    this.quizCurrentIdx++;
    if (this.quizCurrentIdx < this.quizQuestions.length) {
      this.renderQuizQuestion();
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    this.updateStreak();
    this.renderStats();

    document.getElementById('quiz-active-box').classList.add('hidden');
    const resultBox = document.getElementById('quiz-result-box');
    resultBox.classList.remove('hidden');

    const total = this.quizQuestions.length;
    const finalScore = document.getElementById('quiz-final-score');
    const finalPercent = document.getElementById('quiz-final-percent');
    const resultDesc = document.getElementById('quiz-result-desc');
    const wrongSection = document.getElementById('quiz-wrong-section');
    const wrongListContainer = document.getElementById('quiz-wrong-list');

    if (finalScore) finalScore.textContent = this.quizScore;
    const pct = Math.round((this.quizScore / total) * 100);
    if (finalPercent) finalPercent.textContent = `${pct}%`;

    if (resultDesc) {
      if (pct >= 90) resultDesc.textContent = 'Tuyệt vời! Bạn nắm rất vững kiến thức!';
      else if (pct >= 70) resultDesc.textContent = 'Khá lắm! Cố gắng luyện tập thêm để hoàn hảo nhé!';
      else resultDesc.textContent = 'Đừng nản lòng, hãy xem lại các từ chưa đúng và ôn luyện thường xuyên nhé!';
    }

    if (this.quizWrongList.length > 0) {
      if (wrongSection) wrongSection.classList.remove('hidden');
      if (wrongListContainer) {
        wrongListContainer.innerHTML = this.quizWrongList.map(item => {
          const wordText = item.word || item.hanzi;
          const phonetic = item.ipa || item.pinyin || '';
          const safeWord = wordText.replace(/'/g, "\\'");
          return `
          <div class="wrong-item">
            <div>
              <span class="item-zh">${wordText}</span>
              <span style="color: var(--primary); margin: 0 0.5rem;">[${phonetic}]</span>
              <span>${item.vi}</span>
            </div>
            <button class="btn-icon btn-sm" onclick="app.speakText('${safeWord}')">${ic('volume')}</button>
          </div>
        `;
        }).join('');
      }
    } else if (wrongSection) {
      wrongSection.classList.add('hidden');
    }
  }

  /* ==========================================================================
     TAB 7: DIALOGUES
     ========================================================================== */
  initDialogueTab() {
    this.renderDialogueNavList();

    const btnPlayAll = document.getElementById('btn-dialogue-play-all');
    const btnStop = document.getElementById('btn-dialogue-stop');
    const togglePy = document.getElementById('toggle-py');
    const toggleVi = document.getElementById('toggle-vi');

    if (btnPlayAll) {
      btnPlayAll.addEventListener('click', () => this.playFullDialogue());
    }

    if (btnStop) {
      btnStop.addEventListener('click', () => {
        this.audio.stopAll();
        btnStop.classList.add('hidden');
        if (btnPlayAll) btnPlayAll.classList.remove('hidden');
        document.querySelectorAll('.dia-line-row').forEach(row => row.classList.remove('playing'));
      });
    }

    if (togglePy) {
      togglePy.addEventListener('change', () => {
        document.querySelectorAll('.dia-py').forEach(el => {
          el.classList.toggle('hidden', !togglePy.checked);
        });
      });
    }

    if (toggleVi) {
      toggleVi.addEventListener('change', () => {
        document.querySelectorAll('.dia-vi').forEach(el => {
          el.classList.toggle('hidden', !toggleVi.checked);
        });
      });
    }

    this.selectDialogue(0);
  }

  renderDialogueNavList() {
    const listContainer = document.getElementById('dialogue-list');
    if (!listContainer) return;
    const dialogues = this.getCurrentDialogues();

    listContainer.innerHTML = dialogues.map((d, idx) => `
      <button class="dia-nav-item ${idx === this.currentDialogueIndex ? 'active' : ''}" onclick="app.selectDialogue(${idx})">
        ${d.title || `Bài ${idx + 1}`}
      </button>
    `).join('');
  }

  selectDialogue(index) {
    this.audio.stopAll();
    const dialogues = this.getCurrentDialogues();
    this.currentDialogueIndex = (index >= 0 && index < dialogues.length) ? index : 0;
    this.renderDialogueNavList();

    const dia = dialogues[this.currentDialogueIndex];
    if (!dia) return;

    const titleEl = document.getElementById('dialogue-active-title');
    const linesContainer = document.getElementById('dialogue-lines-container');
    const togglePy = document.getElementById('toggle-py');
    const toggleVi = document.getElementById('toggle-vi');

    if (togglePy && togglePy.nextElementSibling) {
      togglePy.nextElementSibling.textContent = this.currentLang === 'en' ? 'Hiện IPA' : 'Hiện Pinyin';
    }

    if (titleEl) titleEl.textContent = dia.title || 'Hội thoại';

    const showPy = togglePy ? togglePy.checked : true;
    const showVi = toggleVi ? toggleVi.checked : true;

    if (linesContainer) {
      linesContainer.innerHTML = (dia.lines || []).map((line, idx) => {
        const text = line.en || line.zh;
        const safeText = text.replace(/'/g, "\\'");
        const phonetic = line.ipa || line.py || '';
        return `
        <div class="dia-line-row" id="dia-line-${idx}">
          <div class="dia-speaker-tag speaker-${line.who || 'A'}">${line.who || 'A'}</div>
          <div class="dia-line-body">
            <div class="dia-zh">${text}</div>
            <div class="dia-py ${showPy ? '' : 'hidden'}">${phonetic}</div>
            <div class="dia-vi ${showVi ? '' : 'hidden'}">${line.vi}</div>
          </div>
          <button class="dia-audio-btn" onclick="app.speakText('${safeText}')" title="Nghe câu này">${ic('volume')}</button>
        </div>
      `;
      }).join('');
    }
  }

  playFullDialogue() {
    const dialogues = this.getCurrentDialogues();
    const dia = dialogues[this.currentDialogueIndex];
    if (!dia || !dia.lines || dia.lines.length === 0) return;

    const btnPlayAll = document.getElementById('btn-dialogue-play-all');
    const btnStop = document.getElementById('btn-dialogue-stop');

    if (btnPlayAll) btnPlayAll.classList.add('hidden');
    if (btnStop) btnStop.classList.remove('hidden');

    this.audio.isDialoguePlaying = true;
    let lineIdx = 0;
    const ttsLang = this.currentLang === 'en' ? 'en-US' : 'zh-CN';

    const playNext = () => {
      if (!this.audio.isDialoguePlaying || lineIdx >= dia.lines.length) {
        if (btnPlayAll) btnPlayAll.classList.remove('hidden');
        if (btnStop) btnStop.classList.add('hidden');
        document.querySelectorAll('.dia-line-row').forEach(r => r.classList.remove('playing'));
        return;
      }

      document.querySelectorAll('.dia-line-row').forEach((r, idx) => {
        r.classList.toggle('playing', idx === lineIdx);
      });

      const line = dia.lines[lineIdx];
      const lineText = line.en || line.zh;
      this.audio.speak(lineText, null, () => {
        lineIdx++;
        this.audio.currentDialogueTimer = setTimeout(playNext, 600);
      }, ttsLang);
    };

    playNext();
  }
}

// Global instance & Startup
const app = new ChineseApp();
window.app = app;

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
