/**
 * data/en/reading.js — Bài "Đọc và dịch" tiếng Anh (Polylingo tự soạn, trình độ Starter đến A1).
 * Mỗi câu: en (câu gốc), vi (bản dịch mẫu), keys (ý chính để chấm; "a|b" là các cách nói tương đương).
 */
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;

  root.READING_EN = [
    {
      id: 'en-r01',
      title: 'My Family',
      titleVi: 'Gia đình tôi',
      level: 'A1',
      sentences: [
        { en: 'There are four people in my family.', vi: 'Gia đình tôi có bốn người.', keys: ['gia đình|nhà', 'bốn|4', 'người'] },
        { en: 'My father is a doctor and my mother is a teacher.', vi: 'Bố tôi là bác sĩ và mẹ tôi là giáo viên.', keys: ['bố|ba|cha', 'bác sĩ', 'mẹ|má', 'giáo viên|cô giáo|thầy giáo'] },
        { en: 'I have one older brother.', vi: 'Tôi có một người anh trai.', keys: ['một|1', 'anh'] },
        { en: 'He works in a big city.', vi: 'Anh ấy làm việc ở một thành phố lớn.', keys: ['làm việc|làm', 'thành phố', 'lớn|to'] },
        { en: 'We eat dinner together every Sunday.', vi: 'Chúng tôi ăn tối cùng nhau mỗi Chủ nhật.', keys: ['ăn tối|bữa tối|cơm tối', 'cùng nhau|với nhau|cùng', 'chủ nhật'] }
      ]
    },
    {
      id: 'en-r02',
      title: 'A Rainy Morning',
      titleVi: 'Một buổi sáng mưa',
      level: 'A1',
      sentences: [
        { en: 'It is raining this morning.', vi: 'Sáng nay trời đang mưa.', keys: ['sáng nay|sáng hôm nay', 'mưa'] },
        { en: 'I take my umbrella and walk to the bus stop.', vi: 'Tôi lấy ô và đi bộ ra trạm xe buýt.', keys: ['ô|dù', 'đi bộ|đi', 'trạm|bến|điểm dừng', 'xe buýt|buýt'] },
        { en: 'The bus is late, so I wait for ten minutes.', vi: 'Xe buýt đến muộn nên tôi đợi mười phút.', keys: ['muộn|trễ', 'đợi|chờ', 'mười phút|10 phút'] },
        { en: 'At work, I drink a cup of hot tea.', vi: 'Ở chỗ làm, tôi uống một cốc trà nóng.', keys: ['làm|công ty|cơ quan', 'uống', 'trà', 'nóng'] },
        { en: 'I like the sound of the rain.', vi: 'Tôi thích tiếng mưa.', keys: ['thích', 'tiếng|âm thanh', 'mưa'] }
      ]
    },
    {
      id: 'en-r03',
      title: 'At the Café',
      titleVi: 'Ở quán cà phê',
      level: 'A1',
      sentences: [
        { en: 'Lan goes to a small café near her house.', vi: 'Lan đến một quán cà phê nhỏ gần nhà cô ấy.', keys: ['lan', 'cà phê|cafe|cafe', 'nhỏ', 'gần', 'nhà'] },
        { en: 'She orders an iced coffee and a piece of cake.', vi: 'Cô ấy gọi một ly cà phê đá và một miếng bánh.', keys: ['gọi|đặt|mua', 'cà phê đá|cafe đá', 'miếng|cái|phần|lát', 'bánh'] },
        { en: 'The coffee costs two dollars.', vi: 'Ly cà phê giá hai đô la.', keys: ['giá|có giá|hết|tốn', 'hai|2', 'đô'] },
        { en: 'She reads a book by the window.', vi: 'Cô ấy đọc sách bên cửa sổ.', keys: ['đọc', 'sách', 'cửa sổ'] },
        { en: 'It is her favorite place on the weekend.', vi: 'Đó là nơi cô ấy thích nhất vào cuối tuần.', keys: ['nơi|chỗ|địa điểm', 'thích nhất|yêu thích|ưa thích', 'cuối tuần'] }
      ]
    },
    {
      id: 'en-r04',
      title: 'My New Friend',
      titleVi: 'Người bạn mới',
      level: 'A1',
      sentences: [
        { en: 'I have a new friend at school.', vi: 'Tôi có một người bạn mới ở trường.', keys: ['bạn', 'mới', 'trường'] },
        { en: 'His name is Tom and he is from Canada.', vi: 'Bạn ấy tên là Tom và đến từ Canada.', keys: ['tên', 'tom', 'đến từ|là người|từ', 'canada|ca na da'] },
        { en: 'Tom can speak a little Vietnamese.', vi: 'Tom có thể nói một chút tiếng Việt.', keys: ['có thể|biết', 'nói', 'một chút|một ít|chút ít|chút', 'tiếng việt'] },
        { en: 'We play football after class.', vi: 'Chúng tôi chơi bóng đá sau giờ học.', keys: ['chơi|đá', 'bóng đá|đá bóng|bóng', 'sau', 'học|lớp|tan học'] },
        { en: 'I help him with Vietnamese, and he helps me with English.', vi: 'Tôi giúp bạn ấy học tiếng Việt, còn bạn ấy giúp tôi học tiếng Anh.', keys: ['giúp|dạy', 'tiếng việt', 'tiếng anh'] }
      ]
    },
    {
      id: 'en-r05',
      title: 'Shopping Day',
      titleVi: 'Ngày đi mua sắm',
      level: 'A1',
      sentences: [
        { en: 'On Saturday, I go shopping with my sister.', vi: 'Thứ bảy, tôi đi mua sắm với chị gái.', keys: ['thứ bảy|thứ 7', 'mua sắm|mua đồ|shopping', 'chị|em gái|em'] },
        { en: 'I want to buy a new T-shirt.', vi: 'Tôi muốn mua một chiếc áo phông mới.', keys: ['muốn', 'mua', 'áo', 'mới'] },
        { en: 'The blue one is nice, but it is too big.', vi: 'Cái màu xanh đẹp nhưng nó quá rộng.', keys: ['xanh', 'đẹp', 'nhưng|mà', 'rộng|to|lớn'] },
        { en: 'I try a smaller one, and it fits well.', vi: 'Tôi thử cái nhỏ hơn và nó vừa vặn.', keys: ['thử|mặc thử', 'nhỏ hơn|nhỏ', 'vừa|vừa vặn|hợp'] },
        { en: 'It costs fifteen dollars.', vi: 'Nó giá mười lăm đô la.', keys: ['giá|hết|tốn', 'mười lăm|15', 'đô'] }
      ]
    },
    {
      id: 'en-r06',
      title: 'My Day',
      titleVi: 'Một ngày của tôi',
      level: 'A1',
      sentences: [
        { en: 'I get up at six thirty every day.', vi: 'Tôi thức dậy lúc sáu giờ rưỡi mỗi ngày.', keys: ['dậy|thức dậy', 'sáu|6', 'rưỡi|ba mươi|30', 'mỗi ngày|hằng ngày|hàng ngày'] },
        { en: 'I have bread and milk for breakfast.', vi: 'Tôi ăn bánh mì và uống sữa vào bữa sáng.', keys: ['bánh mì', 'sữa', 'bữa sáng|ăn sáng|điểm tâm'] },
        { en: "I start work at eight o'clock.", vi: 'Tôi bắt đầu làm việc lúc tám giờ.', keys: ['bắt đầu', 'làm|làm việc', 'tám giờ|8 giờ'] },
        { en: 'In the evening, I cook dinner and listen to music.', vi: 'Buổi tối, tôi nấu bữa tối và nghe nhạc.', keys: ['tối', 'nấu', 'nghe', 'nhạc'] },
        { en: 'I go to bed at eleven.', vi: 'Tôi đi ngủ lúc mười một giờ.', keys: ['ngủ', 'mười một|11'] }
      ]
    }
  ];

  if (typeof module !== 'undefined' && module.exports) module.exports = root.READING_EN;
})();
