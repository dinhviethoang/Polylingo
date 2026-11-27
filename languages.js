/**
 * Danh sách 5 ngôn ngữ hỗ trợ trên nền tảng Polylingo
 * Thứ tự chuẩn: Anh (en), Trung (zh), Nhật (ja), Đức (de), Nga (ru)
 * zh, en, ja, de: Sẵn sàng học (ready: true)
 * ru: Đang biên soạn (ready: false) có chủ đề văn hóa riêng đầy đủ
 */
const LANGUAGES = [
  {
    id: 'en',
    name: 'Tiếng Anh',
    shortName: 'Anh',
    native: 'English',
    flag: '🇬🇧',
    greeting: 'Hello',
    greetingPhonetic: '/həˈloʊ/ • Xin chào',
    firstWord: {
      word: 'Hello',
      phonetic: '/həˈloʊ/',
      meaning: 'Xin chào (lời chào phổ biến nhất thế giới)'
    },
    watermark: 'Learn',
    ready: true,
    font: 'Playfair Display',
    tts: 'en-US',
    accentColor: '#14213D',
    accentColor2: '#B08D57',
    description: 'Ngữ âm IPA chuẩn xác, 500 từ vựng thông dụng và phản xạ giao tiếp tự nhiên.',
    totalWords: 500,
    sections: [
      { id: 'home', iconName: 'home', label: 'Tổng quan', desc: 'Khái quát lộ trình và theo dõi chuỗi ngày học' },
      { id: 'learn', iconName: 'learn', label: 'Lộ trình', desc: 'Lộ trình 30 bài Starter & A1 bài bản' },
      { id: 'phonics', iconName: 'phonics', label: 'Ngữ âm IPA', desc: '44 âm IPA chuẩn quốc tế với khẩu hình trực quan' },
      { id: 'vocab', iconName: 'vocab', label: 'Từ vựng', desc: '500 từ vựng thông dụng theo chủ đề đời sống' },
      { id: 'flashcards', iconName: 'flashcards', label: 'Thẻ ghi nhớ', desc: 'Lặp lại ngắt quãng SM-2 giúp ghi nhớ bền bỉ' },
      { id: 'quiz', iconName: 'quiz', label: 'Kiểm tra', desc: 'Bài test trắc nghiệm 4 kỹ năng phản xạ tức thì' },
      { id: 'speak', iconName: 'speak', label: 'Phát âm', desc: 'Luyện phát âm câu từ tiếng Anh chuẩn xác' },
      { id: 'talk', iconName: 'talk', label: 'Luyện nói', desc: 'Luyện nói phản xạ và đàm thoại nhập vai tình huống' },
      { id: 'dialogues', iconName: 'dialogues', label: 'Hội thoại', desc: 'Mẫu câu giao tiếp thực tế nơi công sở và đời sống' },
      { id: 'reading', iconName: 'reading', label: 'Đọc và dịch', desc: 'Bài đọc ngắn, tự dịch từng câu có chấm theo ý chính' },
      { id: 'dictation', iconName: 'dictation', label: 'Nghe gõ câu', desc: 'Nghe một câu rồi gõ lại cả câu, sửa chỗ sai tới khi đúng' },
      { id: 'videos', iconName: 'videos', label: 'Video giải trí', desc: 'Xem video phụ đề song ngữ, tra từ và nhại giọng' }
    ]
  },
  {
    id: 'zh',
    name: 'Tiếng Trung',
    shortName: 'Trung',
    native: '中文',
    flag: '🇨🇳',
    greeting: '你好',
    greetingPhonetic: 'nǐ hǎo • Xin chào',
    firstWord: {
      word: '你好',
      phonetic: 'nǐ hǎo',
      meaning: 'Xin chào (lời chào phổ thông chuẩn mực)'
    },
    watermark: '学',
    ready: true,
    font: 'Noto Serif SC',
    tts: 'zh-CN',
    accentColor: '#B3261E',
    accentColor2: '#C9A227',
    description: 'Phát âm Pinyin, hơn 500 từ vựng HSK1, tập viết chữ Hán và đàm thoại thực tế.',
    totalWords: 521, // cập nhật tự động trong data/zh/vocab-merge.js
    sections: [
      { id: 'home', iconName: 'home', label: 'Tổng quan', desc: 'Bảng theo dõi tiến độ và lộ trình bài bản' },
      { id: 'learn', iconName: 'learn', label: 'Lộ trình', desc: 'Lộ trình bài học HSK 3.0 chuẩn hóa theo từng chặng' },
      { id: 'pinyin', iconName: 'phonics', label: 'Phát âm (Pinyin)', desc: '21 thanh mẫu, 36 vận mẫu và quy tắc biến điệu' },
      { id: 'typing', iconName: 'typing', label: 'Luyện gõ Pinyin', desc: 'Rèn phản xạ gõ pinyin kèm thanh điệu trên bàn phím' },
      { id: 'dictation', iconName: 'dictation', label: 'Nghe gõ câu', desc: 'Nghe một câu rồi gõ lại cả câu bằng pinyin hoặc chữ Hán' },
      { id: 'speak', iconName: 'speak', label: 'Luyện phát âm', desc: 'Luyện đọc thanh điệu, cặp âm dễ nhầm và câu giao tiếp' },
      { id: 'talk', iconName: 'talk', label: 'Luyện nói', desc: 'Luyện nói từng từ và đàm thoại nhập vai tình huống thực tế' },
      { id: 'videos', iconName: 'videos', label: 'Video giải trí', desc: 'Xem video vừa học phụ đề song ngữ, tra từ và nói theo' },
      { id: 'vocab', iconName: 'vocab', label: 'Từ vựng HSK1', desc: 'Hơn 500 từ HSK1 (chung với Lộ trình) phân loại theo chủ đề' },
      { id: 'flashcards', iconName: 'flashcards', label: 'Thẻ ghi nhớ', desc: 'Thuật toán ngắt quãng SM-2 chống quên từ vựng' },
      { id: 'writing', iconName: 'writing', label: 'Chữ viết (Hán tự)', desc: 'Tập viết từng nét thuận bút chữ Hán chuẩn mực' },
      { id: 'quiz', iconName: 'quiz', label: 'Kiểm tra', desc: '10 câu trắc nghiệm ngẫu nhiên đánh giá phản xạ' },
      { id: 'games', iconName: 'games', label: 'Trò chơi', desc: 'Mini games ghép từ, lật thẻ rèn phản xạ ngôn ngữ' },
      { id: 'dialogues', iconName: 'dialogues', label: 'Hội thoại', desc: 'Mẫu câu đàm thoại đời sống, nghe đọc mẫu và luyện theo' },
      { id: 'reading', iconName: 'reading', label: 'Đọc và dịch', desc: 'Bài đọc ngắn HSK1, tự dịch từng câu có chấm theo ý chính' }
    ]
  },
  {
    id: 'ja',
    name: 'Tiếng Nhật',
    shortName: 'Nhật',
    native: '日本語',
    flag: '🇯🇵',
    greeting: 'こんにちは',
    greetingPhonetic: 'Konnichiwa • Xin chào',
    firstWord: {
      word: 'こんにちは',
      phonetic: 'Konnichiwa',
      meaning: 'Xin chào (lời chào lịch sự ban ngày)'
    },
    watermark: '学ぶ',
    ready: true,
    font: 'Shippori Mincho',
    tts: 'ja-JP',
    accentColor: '#1E3A5F',
    accentColor2: '#E59BB0',
    description: 'Hiragana & Katakana, 703 từ vựng JLPT N5, 103 Kanji có âm Hán Việt và lộ trình 35 bài.',
    totalWords: 703,
    sections: [
      { id: 'home', iconName: 'home', label: 'Tổng quan', desc: 'Lộ trình chinh phục tiếng Nhật sơ cấp từ con số 0' },
      { id: 'learn', iconName: 'learn', label: 'Lộ trình', desc: '35 bài: 6 bài Kana và 29 bài JLPT N5' },
      { id: 'kana', iconName: 'kana', label: 'Bảng chữ Kana', desc: 'Hiragana, Katakana, âm đục, âm ghép và luyện nhận chữ' },
      { id: 'vocab', iconName: 'vocab', label: 'Từ vựng N5', desc: '703 từ N5 có romaji, Hán Việt và câu ví dụ' },
      { id: 'kanji', iconName: 'writing', label: 'Kanji', desc: '103 chữ Kanji N5 có âm Hán Việt, On, Kun' },
      { id: 'writing', iconName: 'writing', label: 'Tập viết', desc: 'Thứ tự nét Kanji và Kana theo dữ liệu KanjiVG' },
      { id: 'dialogues', iconName: 'dialogues', label: 'Hội thoại', desc: '10 hội thoại đời thường N5' },
      { id: 'flashcards', iconName: 'flashcards', label: 'Thẻ ghi nhớ', desc: 'Ôn tập ngắt quãng thông minh không lo quên chữ' },
      { id: 'quiz', iconName: 'quiz', label: 'Kiểm tra', desc: 'Trắc nghiệm nghĩa, cách đọc, nghe và Kanji' },
      { id: 'typing', iconName: 'typing', label: 'Luyện gõ', desc: 'Gõ romaji ra kana, chia động từ' },
      { id: 'talk', iconName: 'talk', label: 'Luyện nói', desc: 'Nói từng từ, nhập vai 8 tình huống, đóng vai A–B' }
    ]
  },
  {
    id: 'de',
    name: 'Tiếng Đức',
    shortName: 'Đức',
    native: 'Deutsch',
    flag: '🇩🇪',
    greeting: 'Hallo',
    greetingPhonetic: 'Hallo • Xin chào',
    firstWord: {
      word: 'Guten Tag',
      phonetic: 'gu-tơn ták',
      meaning: 'Xin chào (lời chào lịch sự ban ngày)'
    },
    watermark: 'Lernen',
    ready: true,
    font: 'PT Serif',
    tts: 'de-DE',
    accentColor: '#9B1C1C',
    accentColor2: '#D4A017',
    description: 'Phát âm cho người Việt, 704 từ A1 có mạo từ và câu ví dụ, ngữ pháp tra nhanh và lộ trình 30 bài.',
    totalWords: 704,
    sections: [
      { id: 'home', iconName: 'home', label: 'Tổng quan', desc: 'Lộ trình tiếng Đức A1 từ con số 0' },
      { id: 'learn', iconName: 'learn', label: 'Lộ trình', desc: '30 bài: 3 bài phát âm và 27 bài A1' },
      { id: 'alphabet', iconName: 'phonics', label: 'Phát âm', desc: 'Bảng chữ cái, Ä Ö Ü, ch, sch và luyện nghe' },
      { id: 'vocab', iconName: 'vocab', label: 'Từ vựng A1', desc: '704 từ có mạo từ, số nhiều, bảng chia động từ, câu ví dụ' },
      { id: 'grammar', iconName: 'reading', label: 'Ngữ pháp', desc: 'Mạo từ, cách, chia động từ, trật tự từ, Perfekt' },
      { id: 'dialogues', iconName: 'dialogues', label: 'Hội thoại', desc: '10 hội thoại đời sống ở Đức' },
      { id: 'flashcards', iconName: 'flashcards', label: 'Thẻ ghi nhớ', desc: 'Ôn ngắt quãng SM-2, danh từ luôn kèm mạo từ' },
      { id: 'quiz', iconName: 'quiz', label: 'Kiểm tra', desc: 'Trắc nghiệm nghĩa, nghe, der/die/das' },
      { id: 'typing', iconName: 'typing', label: 'Luyện gõ', desc: 'Gõ từ, số nhiều, chia động từ, nghe chép câu' },
      { id: 'talk', iconName: 'talk', label: 'Luyện nói', desc: 'Nói từng từ, nhập vai 6 tình huống, đóng vai A–B' }
    ]
  },
  {
    id: 'ru',
    name: 'Tiếng Nga',
    shortName: 'Nga',
    native: 'Русский',
    flag: '🇷🇺',
    greeting: 'Привет',
    greetingPhonetic: 'Privet • Xin chào',
    firstWord: {
      word: 'Привет',
      phonetic: 'Privet /prʲɪˈvʲet/',
      meaning: 'Xin chào (lời chào thân mật phổ biến nhất)'
    },
    watermark: 'Учить',
    ready: false,
    font: 'PT Serif',
    tts: 'ru-RU',
    accentColor: '#1D4E9E',
    accentColor2: '#C1272D',
    description: 'Bảng chữ cái Kirin (Cyrillic), ngữ âm & trọng âm tiếng Nga, từ vựng cơ bản và mẫu câu hàng ngày.',
    totalWords: 200,
    sections: [
      { id: 'home', iconName: 'home', label: 'Tổng quan', desc: 'Lộ trình làm quen tiếng Nga toàn diện từ vỡ lòng' },
      { id: 'cyrillic', iconName: 'phonics', label: 'Bảng chữ cái Cyrillic', desc: '33 ký tự chữ cái Kirin và quy tắc trọng âm đặc trưng' },
      { id: 'vocab', iconName: 'vocab', label: 'Từ vựng căn bản', desc: '200 từ vựng cốt lõi thường nhật trong giao tiếp' },
      { id: 'flashcards', iconName: 'flashcards', label: 'Thẻ ghi nhớ', desc: 'Thuật toán SM-2 hỗ trợ ghi nhớ từ vựng dài hạn' },
      { id: 'quiz', iconName: 'quiz', label: 'Kiểm tra', desc: 'Luyện tập phản xạ nhận diện chữ cái và ngữ nghĩa' },
      { id: 'dialogues', iconName: 'dialogues', label: 'Hội thoại', desc: 'Mẫu câu giao tiếp thường nhật với người bản xứ' }
    ]
  }
];

/**
 * Cờ dạng SVG (Windows không vẽ được emoji cờ, chỉ hiện "GB", "CN"...).
 * langFlag('zh') hoặc langFlag(langObj, 20) → chuỗi <svg>.
 */
const LANG_FLAG_SVG = {
  en: '<rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" stroke-width="1.6"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#C8102E" stroke-width="3.4"/>',
  zh: '<rect width="30" height="20" fill="#DE2910"/><path fill="#FFDE00" d="M5 2.4l1.06 3.26h3.43l-2.77 2.02 1.06 3.26L5 8.92l-2.78 2.02 1.06-3.26L.5 5.66h3.43z"/><circle cx="10.5" cy="2.5" r=".9" fill="#FFDE00"/><circle cx="12.5" cy="4.6" r=".9" fill="#FFDE00"/><circle cx="12.5" cy="7.4" r=".9" fill="#FFDE00"/><circle cx="10.5" cy="9.5" r=".9" fill="#FFDE00"/>',
  ja: '<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#BC002D"/>',
  de: '<rect width="30" height="6.67" fill="#000"/><rect y="6.67" width="30" height="6.67" fill="#DD0000"/><rect y="13.33" width="30" height="6.67" fill="#FFCE00"/>',
  ru: '<rect width="30" height="20" fill="#fff"/><rect y="6.67" width="30" height="6.67" fill="#0039A6"/><rect y="13.33" width="30" height="6.67" fill="#D52B1E"/>'
};
function langFlag(langOrId, size) {
  const id = typeof langOrId === 'string' ? langOrId : (langOrId && langOrId.id);
  const body = LANG_FLAG_SVG[id];
  if (!body) return (langOrId && langOrId.flag) || '';
  const h = size || 16;
  const w = Math.round(h * 1.5);
  return '<svg class="lang-flag-svg" viewBox="0 0 30 20" width="' + w + '" height="' + h + '" role="img" aria-hidden="true" focusable="false" style="border-radius:3px;box-shadow:0 0 0 1px rgba(0,0,0,.12);vertical-align:middle;flex-shrink:0">' + body + '</svg>';
}

if (typeof window !== 'undefined') {
  window.LANGUAGES = LANGUAGES;
  window.langFlag = langFlag;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LANGUAGES;
}
