/**
 * data/zh/videos.js
 * Danh sách video học tiếng Trung trên nền tảng Polylingo.
 * Mỗi video chứa:
 *  - id: Định danh duy nhất
 *  - isSample: Đánh dấu video mẫu (tự chạy bằng đồng hồ ảo khi chưa có YouTube ID)
 *  - youtube: Link hoặc ID video YouTube (để trống với video mẫu)
 *  - title: Tiêu đề video
 *  - desc: Mô tả nội dung
 *  - level: Cấp độ HSK (HSK1, HSK2, ...)
 *  - topic: Chủ đề
 *  - thumb: Link ảnh thu nhỏ (nếu để trống sẽ tự lấy từ YouTube ID)
 *  - duration: Thời lượng tính bằng giây
 *  - subs: Danh sách câu phụ đề [{ start, end, zh, py, vi }]
 */

(function () {
  'use strict';

  const VIDEOS_ZH = [
    {
      id: 'sample-chao-hoi-hsk1',
      isSample: true,
      youtube: '',
      title: 'Chào hỏi cơ bản hàng ngày (Video mẫu)',
      desc: 'Mẫu video đàm thoại chào hỏi HSK1 dành cho người mới bắt đầu. Video mẫu dùng đồng hồ giả lập để thử nghiệm toàn bộ tính năng phụ đề, tra từ, phát âm và bài kiểm tra.',
      level: 'HSK1',
      topic: 'Chào hỏi',
      thumb: '',
      duration: 35,
      subs: [
        {
          start: 0.5,
          end: 4.2,
          zh: '你好！很高兴认识你。',
          py: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ.',
          vi: 'Xin chào! Rất vui được làm quen với bạn.'
        },
        {
          start: 4.8,
          end: 8.5,
          zh: '你叫什么名字？',
          py: 'Nǐ jiào shénme míngzi?',
          vi: 'Bạn tên là gì?'
        },
        {
          start: 9.0,
          end: 12.8,
          zh: '我叫李明，我是中国人。',
          py: 'Wǒ jiào Lǐ Míng, wǒ shì Zhōngguó rén.',
          vi: 'Tôi tên Lý Minh, tôi là người Trung Quốc.'
        },
        {
          start: 13.5,
          end: 17.2,
          zh: '你呢？你是哪国人？',
          py: 'Nǐ ne? Nǐ shì nǎ guó rén?',
          vi: 'Còn bạn? Bạn là người nước nào?'
        },
        {
          start: 17.8,
          end: 21.5,
          zh: '我是越南人，我在学汉语。',
          py: 'Wǒ shì Yuènán rén, wǒ zài xué Hànyǔ.',
          vi: 'Tôi là người Việt Nam, tôi đang học tiếng Hán.'
        },
        {
          start: 22.0,
          end: 25.8,
          zh: '汉语难不难？我觉得很有意思。',
          py: 'Hànyǔ nán bù nán? Wǒ juéde hěn yǒu yìsi.',
          vi: 'Tiếng Hán có khó không? Tôi thấy rất thú vị.'
        },
        {
          start: 26.5,
          end: 30.2,
          zh: '不难，只要每天多听多说。',
          py: 'Bù nán, zhǐyào měitiān duō tīng duō shuō.',
          vi: 'Không khó, chỉ cần mỗi ngày nghe nhiều nói nhiều.'
        },
        {
          start: 30.8,
          end: 34.5,
          zh: '谢谢你！明天见！',
          py: 'Xièxie nǐ! Míngtiān jiàn!',
          vi: 'Cảm ơn bạn! Hẹn gặp lại ngày mai!'
        }
      ]
    }
  ];

  if (typeof window !== 'undefined') {
    window.VIDEOS_ZH = VIDEOS_ZH;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = VIDEOS_ZH;
  }
})();
