/**
 * data/ja/videos.js
 * Danh sách video học tiếng Nhật trên nền tảng Polylingo.
 * Mỗi video chứa:
 *  - id: định danh duy nhất
 *  - isSample: đánh dấu video mẫu (tự chạy bằng đồng hồ ảo khi chưa có YouTube ID)
 *  - youtube: Link hoặc ID video YouTube (để trống với video mẫu)
 *  - title: Tiêu đề video
 *  - desc: Mô tả nội dung
 *  - level: Cấp độ N5
 *  - topic: Chủ đề
 *  - thumb: Link ảnh thu nhỏ (nếu để trống sẽ tự lấy từ YouTube ID)
 *  - duration: Thời lượng tính bằng giây
 *  - subs: Danh sách câu phụ đề [{ start, end, ja, kana, romaji, vi, zh, py }]
 */

(function () {
  'use strict';

  const VIDEOS_JA = [
    {
      id: 'sample-chao-hoi-n5',
      isSample: true,
      youtube: '',
      title: 'Chào hỏi và giới thiệu bản thân N5 (Video mẫu)',
      desc: 'Mẫu video đàm thoại chào hỏi sơ cấp N5 dành cho người mới bắt đầu. Video mẫu dùng đồng hồ giả lập để thử nghiệm toàn bộ tính năng phụ đề, tra từ, phát âm và bài kiểm tra.',
      level: 'N5',
      topic: 'Chào hỏi',
      thumb: '',
      duration: 35,
      subs: [
        {
          start: 0.5,
          end: 4.2,
          ja: 'こんにちは！初めまして。',
          kana: 'こんにちは！はじめまして。',
          romaji: 'Konnichiwa! Hajimemashite.',
          vi: 'Xin chào! Rất vui được gặp bạn lần đầu.',
          zh: 'こんにちは！初めまして。',
          py: 'Konnichiwa! Hajimemashite.'
        },
        {
          start: 4.8,
          end: 9.5,
          ja: '私はナムです。ベトナムから来ました。',
          kana: 'わたしはナムです。ベトナムからきました。',
          romaji: 'Watashi wa Namu desu. Betonamu kara kimashita.',
          vi: 'Tôi tên là Nam. Tôi đến từ Việt Nam.',
          zh: '私はナムです。ベトナムから来ました。',
          py: 'Watashi wa Namu desu. Betonamu kara kimashita.'
        },
        {
          start: 10.2,
          end: 14.8,
          ja: 'どうぞよろしくお願いします。',
          kana: 'どうぞよろしくおねがいします。',
          romaji: 'Douzo yoroshiku onegaishimasu.',
          vi: 'Rất mong nhận được sự giúp đỡ của bạn.',
          zh: 'どうぞよろしくお願いします。',
          py: 'Douzo yoroshiku onegaishimasu.'
        },
        {
          start: 15.5,
          end: 20.0,
          ja: '田中です。こちらこそよろしくお願いします。',
          kana: 'たなかです。こちらこそよろしくおねがいします。',
          romaji: 'Tanaka desu. Kochirakoso yoroshiku onegaishimasu.',
          vi: 'Tôi là Tanaka. Chính tôi mới là người mong được bạn giúp đỡ.',
          zh: '田中です。こちらこそよろしくお願いします。',
          py: 'Tanaka desu. Kochirakoso yoroshiku onegaishimasu.'
        },
        {
          start: 20.8,
          end: 25.0,
          ja: 'ナムさんは日本語の学生ですか。',
          kana: 'ナムさんはにほんごのがくせいですか。',
          romaji: 'Namu-san wa nihongo no gakusei desu ka.',
          vi: 'Bạn Nam là sinh viên học tiếng Nhật phải không?',
          zh: 'ナムさんは日本語の学生ですか。',
          py: 'Namu-san wa nihongo no gakusei desu ka.'
        },
        {
          start: 25.8,
          end: 30.0,
          ja: 'はい、そうです。毎日日本語を勉強します。',
          kana: 'はい、そうです。まいにちにほんごをべんきょうします。',
          romaji: 'Hai, sou desu. Mainichi nihongo o benkyou shimasu.',
          vi: 'Vâng, đúng vậy. Tôi học tiếng Nhật mỗi ngày.',
          zh: 'はい、そうです。毎日日本語を勉強します。',
          py: 'Hai, sou desu. Mainichi nihongo o benkyou shimasu.'
        },
        {
          start: 30.8,
          end: 34.5,
          ja: 'ありがとうございます！また明日！',
          kana: 'ありがとうございます！またあした！',
          romaji: 'Arigatou gozaimasu! Mata ashita!',
          vi: 'Cảm ơn bạn! Hẹn gặp lại ngày mai nhé!',
          zh: 'ありがとうございます！また明日！',
          py: 'Arigatou gozaimasu! Mata ashita.'
        }
      ]
    }
  ];

  if (typeof window !== 'undefined') {
    window.VIDEOS_JA = VIDEOS_JA;
    window.JA_VIDEOS = VIDEOS_JA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = VIDEOS_JA;
  }
})();
