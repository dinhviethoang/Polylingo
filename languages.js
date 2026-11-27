/**
 * Danh sách 4 ngôn ngữ hỗ trợ trên nền tảng Polylingo
 * Thứ tự chuẩn: Anh (en), Trung (zh), Nhật (ja), Nga (ru)
 * zh: Sẵn sàng học (ready: true)
 * en, ja, ru: Đang biên soạn (ready: false) có chủ đề văn hóa riêng đầy đủ
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
    description: 'Phát âm Pinyin, 150 từ vựng HSK1 cốt lõi, tập viết chữ Hán và đàm thoại thực tế.',
    totalWords: 150,
    sections: [
      { id: 'home', iconName: 'home', label: 'Tổng quan', desc: 'Bảng theo dõi tiến độ và lộ trình bài bản' },
      { id: 'learn', iconName: 'learn', label: 'Lộ trình', desc: 'Lộ trình bài học HSK 3.0 chuẩn hóa theo từng chặng' },
      { id: 'pinyin', iconName: 'phonics', label: 'Phát âm (Pinyin)', desc: '21 thanh mẫu, 36 vận mẫu và quy tắc biến điệu' },
      { id: 'typing', iconName: 'typing', label: 'Luyện gõ Pinyin', desc: 'Rèn phản xạ gõ pinyin kèm thanh điệu trên bàn phím' },
      { id: 'speak', iconName: 'speak', label: 'Luyện phát âm', desc: 'Luyện đọc thanh điệu, cặp âm dễ nhầm và câu giao tiếp' },
      { id: 'talk', iconName: 'talk', label: 'Luyện nói', desc: 'Luyện nói từng từ và đàm thoại nhập vai tình huống thực tế' },
      { id: 'videos', iconName: 'videos', label: 'Video giải trí', desc: 'Xem video vừa học phụ đề song ngữ, tra từ và nói theo' },
      { id: 'vocab', iconName: 'vocab', label: 'Từ vựng HSK1', desc: '150 từ vựng cốt lõi phân loại theo chủ đề đời sống' },
      { id: 'flashcards', iconName: 'flashcards', label: 'Thẻ ghi nhớ', desc: 'Thuật toán ngắt quãng SM-2 chống quên từ vựng' },
      { id: 'writing', iconName: 'writing', label: 'Chữ viết (Hán tự)', desc: 'Tập viết từng nét thuận bút chữ Hán chuẩn mực' },
      { id: 'quiz', iconName: 'quiz', label: 'Kiểm tra', desc: '10 câu trắc nghiệm ngẫu nhiên đánh giá phản xạ' },
      { id: 'games', iconName: 'games', label: 'Trò chơi', desc: 'Mini games ghép từ, lật thẻ rèn phản xạ ngôn ngữ' },
      { id: 'dialogues', iconName: 'dialogues', label: 'Hội thoại', desc: 'Mẫu câu đàm thoại đời sống có âm thanh người thật' }
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
    ready: false,
    font: 'Shippori Mincho',
    tts: 'ja-JP',
    accentColor: '#1E3A5F',
    accentColor2: '#E59BB0',
    description: 'Bảng chữ Hiragana & Katakana, chữ Kanji vỡ lòng và từ vựng sơ cấp JLPT N5.',
    totalWords: 200,
    sections: [
      { id: 'home', iconName: 'home', label: 'Tổng quan', desc: 'Lộ trình chinh phục tiếng Nhật sơ cấp từ con số 0' },
      { id: 'kana', iconName: 'phonics', label: 'Bảng chữ Kana', desc: 'Nắm trọn bảng chữ mềm Hiragana và chữ cứng Katakana' },
      { id: 'vocab', iconName: 'vocab', label: 'Từ vựng N5', desc: '200 từ vựng sơ cấp JLPT N5 thiết yếu nhất' },
      { id: 'flashcards', iconName: 'flashcards', label: 'Thẻ ghi nhớ', desc: 'Ôn tập ngắt quãng thông minh không lo quên chữ' },
      { id: 'writing', iconName: 'writing', label: 'Tập viết Kanji', desc: 'Luyện từng nét thuận bút chữ Hán theo chuẩn Nhật' },
      { id: 'quiz', iconName: 'quiz', label: 'Kiểm tra', desc: 'Trắc nghiệm nhận diện mặt chữ, Romaji và ý nghĩa' }
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

if (typeof window !== 'undefined') {
  window.LANGUAGES = LANGUAGES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LANGUAGES;
}
