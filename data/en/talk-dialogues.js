/**
 * data/en/talk-dialogues.js
 * 10 hội thoại đời thường phục vụ chế độ "Đóng vai A-B" (Roleplay A-B).
 * Cấu trúc:
 *  - id: mã định danh hội thoại
 *  - title: tiêu đề tiếng Việt
 *  - scene: bối cảnh tình huống thực tế
 *  - roleA: { name, char, avatar }
 *  - roleB: { name, char, avatar }
 *  - sentences: [ { who: 'A'|'B', en, ipa, vi, zh, py }, ... ]
 */

(function () {
  'use strict';

  const TALK_DIALOGUES = [
  {
    "id": "etd01",
    "title": "Đi chợ mua hoa quả tươi",
    "scene": "Tại sạp trái cây tươi ở chợ địa phương, bạn hỏi mua táo và chuối chín, hỏi giá và thanh toán tiền.",
    "roleA": {
      "name": "Người mua (Bạn)",
      "char": "Shopper",
      "avatar": "🛒"
    },
    "roleB": {
      "name": "Người bán hoa quả",
      "char": "Fruit Seller",
      "avatar": "🍎"
    },
    "sentences": [
      {
        "who": "A",
        "en": "Hello, how much are these red apples?",
        "ipa": "/həˈloʊ haʊ mʌtʃ ɑːr ðiːz red ˈæplz/",
        "vi": "Xin chào, những quả táo đỏ này bao nhiêu tiền vậy ạ?",
        "zh": "Hello, how much are these red apples?",
        "py": "/həˈloʊ haʊ mʌtʃ ɑːr ðiːz red ˈæplz/"
      },
      {
        "who": "B",
        "en": "They are two dollars per kilogram, very sweet and fresh.",
        "ipa": "/ðeɪ ɑːr tuː ˈdɑːlərz pɜːr ˈkɪləɡræm ˈveri swiːt ænd freʃ/",
        "vi": "Hai đô la một ký nhé, ngọt lịm và rất tươi đấy.",
        "zh": "They are two dollars per kilogram, very sweet and fresh.",
        "py": "/ðeɪ ɑːr tuː ˈdɑːlərz pɜːr ˈkɪləɡræm ˈveri swiːt ænd freʃ/"
      },
      {
        "who": "A",
        "en": "Great! How about those ripe yellow bananas over there?",
        "ipa": "/ɡreɪt haʊ əˈbaʊt ðoʊz raɪp ˈjeloʊ bəˈnænəz ˈoʊvər ðer/",
        "vi": "Tuyệt quá! Thế còn nải chuối vàng chín đằng kia thì sao ạ?",
        "zh": "Great! How about those ripe yellow bananas over there?",
        "py": "/ɡreɪt haʊ əˈbaʊt ðoʊz raɪp ˈjeloʊ bəˈnænəz ˈoʊvər ðer/"
      },
      {
        "who": "B",
        "en": "Bananas are one dollar per bunch today.",
        "ipa": "/bəˈnænəz ɑːr wʌn ˈdɑːlər pɜːr bʌntʃ təˈdeɪ/",
        "vi": "Chuối hôm nay một đô la một nải nhé cháu.",
        "zh": "Bananas are one dollar per bunch today.",
        "py": "/bəˈnænəz ɑːr wʌn ˈdɑːlər pɜːr bʌntʃ təˈdeɪ/"
      },
      {
        "who": "A",
        "en": "Please give me two kilograms of apples and one bunch of bananas.",
        "ipa": "/pliːz ɡɪv miː tuː ˈkɪləɡræmz əv ˈæplz ænd wʌn bʌntʃ əv bəˈnænəz/",
        "vi": "Làm ơn cho cháu hai ký táo và một nải chuối ạ.",
        "zh": "Please give me two kilograms of apples and one bunch of bananas.",
        "py": "/pliːz ɡɪv miː tuː ˈkɪləɡræmz əv ˈæplz ænd wʌn bʌntʃ əv bəˈnænəz/"
      },
      {
        "who": "B",
        "en": "All packed in a paper bag for you. That is five dollars total.",
        "ipa": "/ɔːl pækt ɪn ə ˈpeɪpər bæɡ fɔːr juː ðæt ɪz faɪv ˈdɑːlərz ˈtoʊtl/",
        "vi": "Đã đóng túi giấy cho cháu rồi đây. Tổng cộng là năm đô la nhé.",
        "zh": "All packed in a paper bag for you. That is five dollars total.",
        "py": "/ɔːl pækt ɪn ə ˈpeɪpər bæɡ fɔːr juː ðæt ɪz faɪv ˈdɑːlərz ˈtoʊtl/"
      },
      {
        "who": "A",
        "en": "Here is ten dollars. Keep the change please!",
        "ipa": "/hɪr ɪz ten ˈdɑːlərz kiːp ðə tʃeɪndʒ pliːz/",
        "vi": "Gửi bác mười đô la ạ. Bác không cần thối lại đâu!",
        "zh": "Here is ten dollars. Keep the change please!",
        "py": "/hɪr ɪz ten ˈdɑːlərz kiːp ðə tʃeɪndʒ pliːz/"
      },
      {
        "who": "B",
        "en": "Thank you so much! Enjoy your fruit and visit us again!",
        "ipa": "/θæŋk juː soʊ mʌtʃ ɪnˈdʒɔɪ jɔːr fruːt ænd ˈvɪzɪt ʌs əˈɡen/",
        "vi": "Cảm ơn cháu nhiều nhé! Ăn ngon miệng và lần sau lại ghé bác nha!",
        "zh": "Thank you so much! Enjoy your fruit and visit us again!",
        "py": "/θæŋk juː soʊ mʌtʃ ɪnˈdʒɔɪ jɔːr fruːt ænd ˈvɪzɪt ʌs əˈɡen/"
      }
    ]
  },
  {
    "id": "etd02",
    "title": "Gọi cà phê tại quán sáng sớm",
    "scene": "Tại một quầy cà phê góc phố, bạn gọi cà phê sữa đá, chọn lượng đường và đồ ăn nhẹ.",
    "roleA": {
      "name": "Khách hàng (Bạn)",
      "char": "Customer",
      "avatar": "☕"
    },
    "roleB": {
      "name": "Thợ pha chế (Barista)",
      "char": "Barista",
      "avatar": "🧑‍🍳"
    },
    "sentences": [
      {
        "who": "A",
        "en": "Good morning! Can I get an iced milk coffee please?",
        "ipa": "/ɡʊd ˈmɔːrnɪŋ kæn aɪ ɡet ən aɪst mɪlk ˈkɔːfi pliːz/",
        "vi": "Chào buổi sáng! Cho tôi một ly cà phê sữa đá được không ạ?",
        "zh": "Good morning! Can I get an iced milk coffee please?",
        "py": "/ɡʊd ˈmɔːrnɪŋ kæn aɪ ɡet ən aɪst mɪlk ˈkɔːfi pliːz/"
      },
      {
        "who": "B",
        "en": "Sure! What size would you like, medium or large?",
        "ipa": "/ʃʊr wɑːt saɪz wʊd juː laɪk ˈmiːdiəm ɔːr lɑːrdʒ/",
        "vi": "Dạ được chứ! Bạn muốn cỡ nào, vừa hay lớn ạ?",
        "zh": "Sure! What size would you like, medium or large?",
        "py": "/ʃʊr wɑːt saɪz wʊd juː laɪk ˈmiːdiəm ɔːr lɑːrdʒ/"
      },
      {
        "who": "A",
        "en": "A medium size please, with less sugar.",
        "ipa": "/ə ˈmiːdiəm saɪz pliːz wɪð les ˈʃʊɡər/",
        "vi": "Cho tôi cỡ vừa nhé, và ít đường thôi.",
        "zh": "A medium size please, with less sugar.",
        "py": "/ə ˈmiːdiəm saɪz pliːz wɪð les ˈʃʊɡər/"
      },
      {
        "who": "B",
        "en": "Got it: medium iced milk coffee with less sugar. Would you like a croissant pastry?",
        "ipa": "/ɡɑːt ɪt ˈmiːdiəm aɪst mɪlk ˈkɔːfi wɪð les ˈʃʊɡər wʊd juː laɪk ə krwɑːˈsɑːnt ˈpeɪstri/",
        "vi": "Dạ ghi nhận: cà phê sữa đá cỡ vừa ít đường. Bạn có muốn dùng thêm bánh sừng bò không?",
        "zh": "Got it: medium iced milk coffee with less sugar. Would you like a croissant pastry?",
        "py": "/ɡɑːt ɪt ˈmiːdiəm aɪst mɪlk ˈkɔːfi wɪð les ˈʃʊɡər wʊd juː laɪk ə krwɑːˈsɑːnt ˈpeɪstri/"
      },
      {
        "who": "A",
        "en": "Yes, please warm up one butter croissant for me.",
        "ipa": "/jes pliːz wɔːrm ʌp wʌn ˈbʌtər krwɑːˈsɑːnt fɔːr miː/",
        "vi": "Có, hãy làm nóng cho tôi một chiếc bánh sừng bò bơ nhé.",
        "zh": "Yes, please warm up one butter croissant for me.",
        "py": "/jes pliːz wɔːrm ʌp wʌn ˈbʌtər krwɑːˈsɑːnt fɔːr miː/"
      },
      {
        "who": "B",
        "en": "Is this for here or to go?",
        "ipa": "/ɪz ðɪs fɔːr hɪr ɔːr tuː ɡoʊ/",
        "vi": "Bạn dùng tại đây hay mang đi ạ?",
        "zh": "Is this for here or to go?",
        "py": "/ɪz ðɪs fɔːr hɪr ɔːr tuː ɡoʊ/"
      },
      {
        "who": "A",
        "en": "I will drink it here by the window desk.",
        "ipa": "/aɪ wɪl drɪŋk ɪt hɪr baɪ ðə ˈwɪndoʊ desk/",
        "vi": "Tôi sẽ uống tại quán ở chỗ bàn cạnh cửa sổ.",
        "zh": "I will drink it here by the window desk.",
        "py": "/aɪ wɪl drɪŋk ɪt hɪr baɪ ðə ˈwɪndoʊ desk/"
      },
      {
        "who": "B",
        "en": "That comes to four dollars. Here is your number, take a seat please!",
        "ipa": "/ðæt kʌmz tuː fɔːr ˈdɑːlərz hɪr ɪz jɔːr ˈnʌmbər teɪk ə siːt pliːz/",
        "vi": "Tổng là bốn đô la ạ. Số thứ tự của bạn đây, xin mời bạn ngồi đợi!",
        "zh": "That comes to four dollars. Here is your number, take a seat please!",
        "py": "/ðæt kʌmz tuː fɔːr ˈdɑːlərz hɪr ɪz jɔːr ˈnʌmbər teɪk ə siːt pliːz/"
      }
    ]
  },
  {
    "id": "etd03",
    "title": "Hỏi thăm ngày nghỉ cuối tuần",
    "scene": "Hai người bạn gặp lại nhau vào sáng Thứ Hai và hào hứng kể về các hoạt động cuối tuần vừa qua.",
    "roleA": {
      "name": "Lan (Bạn)",
      "char": "Lan",
      "avatar": "😊"
    },
    "roleB": {
      "name": "John (Đồng nghiệp)",
      "char": "John",
      "avatar": "🙋"
    },
    "sentences": [
      {
        "who": "A",
        "en": "Hi John! How was your weekend?",
        "ipa": "/haɪ dʒɑːn haʊ wɑːz jɔːr ˈwiːkend/",
        "vi": "Chào John! Cuối tuần của bạn thế nào rồi?",
        "zh": "Hi John! How was your weekend?",
        "py": "/haɪ dʒɑːn haʊ wɑːz jɔːr ˈwiːkend/"
      },
      {
        "who": "B",
        "en": "It was wonderful! I went camping in the mountains with my family.",
        "ipa": "/ɪt wɑːz ˈwʌndərfl aɪ went ˈkæmpɪŋ ɪn ðə ˈmaʊntnz wɪð maɪ ˈfæməli/",
        "vi": "Tuyệt vời lắm! Mình đã đi cắm trại trên núi cùng gia đình.",
        "zh": "It was wonderful! I went camping in the mountains with my family.",
        "py": "/ɪt wɑːz ˈwʌndərfl aɪ went ˈkæmpɪŋ ɪn ðə ˈmaʊntnz wɪð maɪ ˈfæməli/"
      },
      {
        "who": "A",
        "en": "That sounds exciting! How was the weather up there?",
        "ipa": "/ðæt saʊndz ɪkˈsaɪtɪŋ haʊ wɑːz ðə ˈweðər ʌp ðer/",
        "vi": "Nghe hào hứng quá! Thời tiết trên đó thế nào?",
        "zh": "That sounds exciting! How was the weather up there?",
        "py": "/ðæt saʊndz ɪkˈsaɪtɪŋ haʊ wɑːz ðə ˈweðər ʌp ðer/"
      },
      {
        "who": "B",
        "en": "It was cool and sunny during the day, but chilly at night.",
        "ipa": "/ɪt wɑːz kuːl ænd ˈsʌni ˈdʊrɪŋ ðə deɪ bʌt ˈtʃɪli æt naɪt/",
        "vi": "Ban ngày thì mát mẻ và có nắng, nhưng ban đêm trời khá lạnh.",
        "zh": "It was cool and sunny during the day, but chilly at night.",
        "py": "/ɪt wɑːz kuːl ænd ˈsʌni ˈdʊrɪŋ ðə deɪ bʌt ˈtʃɪli æt naɪt/"
      },
      {
        "who": "A",
        "en": "Did you make a campfire under the stars?",
        "ipa": "/dɪd juː meɪk ə ˈkæmpfaɪər ˈʌndər ðə stɑːrz/",
        "vi": "Các bạn có đốt lửa trại dưới trời đầy sao không?",
        "zh": "Did you make a campfire under the stars?",
        "py": "/dɪd juː meɪk ə ˈkæmpfaɪər ˈʌndər ðə stɑːrz/"
      },
      {
        "who": "B",
        "en": "Yes, we grilled corn and sang acoustic songs. What did you do, Lan?",
        "ipa": "/jes wiː ɡrɪld kɔːrn ænd sæŋ əˈkuːstɪk sɔːŋz wɑːt dɪd juː duː Lan/",
        "vi": "Có chứ, chúng mình nướng bắp và hát nhạc mộc. Còn Lan đã làm gì thế?",
        "zh": "Yes, we grilled corn and sang acoustic songs. What did you do, Lan?",
        "py": "/jes wiː ɡrɪld kɔːrn ænd sæŋ əˈkuːstɪk sɔːŋz wɑːt dɪd juː duː Lan/"
      },
      {
        "who": "A",
        "en": "I stayed home, read a great novel, and cooked dinner for my parents.",
        "ipa": "/aɪ steɪd hoʊm red ə ɡreɪt ˈnɑːvl ænd kʊkt ˈdɪnər fɔːr maɪ ˈperənts/",
        "vi": "Mình ở nhà, đọc một cuốn tiểu thuyết hay và nấu bữa tối cho bố mẹ.",
        "zh": "I stayed home, read a great novel, and cooked dinner for my parents.",
        "py": "/aɪ steɪd hoʊm red ə ɡreɪt ˈnɑːvl ænd kʊkt ˈdɪnər fɔːr maɪ ˈperənts/"
      },
      {
        "who": "B",
        "en": "That sounds like a very peaceful and relaxing weekend too!",
        "ipa": "/ðæt saʊndz laɪk ə ˈveri ˈpiːsfl ænd rɪˈlæksɪŋ ˈwiːkend tuː/",
        "vi": "Như vậy nghe cũng thật bình yên và thư giãn đấy!",
        "zh": "That sounds like a very peaceful and relaxing weekend too!",
        "py": "/ðæt saʊndz laɪk ə ˈveri ˈpiːsfl ænd rɪˈlæksɪŋ ˈwiːkend tuː/"
      }
    ]
  },
  {
    "id": "etd04",
    "title": "Mua vé xem phim tại rạp",
    "scene": "Tại quầy vé của rạp chiếu phim, bạn chọn phim, chọn suất chiếu, ghế ngồi và thanh toán bắp nước.",
    "roleA": {
      "name": "Người xem phim (Bạn)",
      "char": "Moviegoer",
      "avatar": "🍿"
    },
    "roleB": {
      "name": "Nhân viên bán vé",
      "char": "Ticket Clerk",
      "avatar": "🎫"
    },
    "sentences": [
      {
        "who": "A",
        "en": "Hello, two tickets for the animation movie at seven PM please.",
        "ipa": "/həˈloʊ tuː ˈtɪkɪts fɔːr ðə ˌænɪˈmeɪʃn ˈmuːvi æt ˈsevn piː em pliːz/",
        "vi": "Xin chào, làm ơn cho hai vé xem phim hoạt hình lúc bảy giờ tối.",
        "zh": "Hello, two tickets for the animation movie at seven PM please.",
        "py": "/həˈloʊ tuː ˈtɪkɪts fɔːr ðə ˌænɪˈmeɪʃn ˈmuːvi æt ˈsevn piː em pliːz/"
      },
      {
        "who": "B",
        "en": "Certainly! Would you prefer seats in the middle or near the back?",
        "ipa": "/ˈsɜːrtnli wʊd juː prɪˈfɜːr siːts ɪn ðə ˈmɪdl ɔːr nɪr ðə bæk/",
        "vi": "Dạ được! Quý khách thích ngồi hàng ghế ở giữa hay gần phía sau ạ?",
        "zh": "Certainly! Would you prefer seats in the middle or near the back?",
        "py": "/ˈsɜːrtnli wʊd juː prɪˈfɜːr siːts ɪn ðə ˈmɪdl ɔːr nɪr ðə bæk/"
      },
      {
        "who": "A",
        "en": "Row F in the middle would be great for viewing.",
        "ipa": "/roʊ ef ɪn ðə ˈmɪdl wʊd biː ɡreɪt fɔːr ˈvjuːɪŋ/",
        "vi": "Hàng F ở giữa là góc nhìn tuyệt vời nhất đấy.",
        "zh": "Row F in the middle would be great for viewing.",
        "py": "/roʊ ef ɪn ðə ˈmɪdl wʊd biː ɡreɪt fɔːr ˈvjuːɪŋ/"
      },
      {
        "who": "B",
        "en": "Seats F7 and F8 are free. Would you like sweet or salty popcorn?",
        "ipa": "/siːts ef ˈsevn ænd ef eɪt ɑːr friː wʊd juː laɪk swiːt ɔːr ˈsɔːlti ˈpɑːpkɔːrn/",
        "vi": "Ghế F7 và F8 còn trống ạ. Quý khách muốn bắp rang bơ vị ngọt hay vị mặn?",
        "zh": "Seats F7 and F8 are free. Would you like sweet or salty popcorn?",
        "py": "/siːts ef ˈsevn ænd ef eɪt ɑːr friː wʊd juː laɪk swiːt ɔːr ˈsɔːlti ˈpɑːpkɔːrn/"
      },
      {
        "who": "A",
        "en": "One large sweet popcorn and two bottles of fresh water.",
        "ipa": "/wʌn lɑːrdʒ swiːt ˈpɑːpkɔːrn ænd tuː ˈbɑːtlz əv freʃ ˈwɔːtər/",
        "vi": "Một phần bắp ngọt lớn và hai chai nước suối nhé.",
        "zh": "One large sweet popcorn and two bottles of fresh water.",
        "py": "/wʌn lɑːrdʒ swiːt ˈpɑːpkɔːrn ænd tuː ˈbɑːtlz əv freʃ ˈwɔːtər/"
      },
      {
        "who": "B",
        "en": "That comes to eighteen dollars in total.",
        "ipa": "/ðæt kʌmz tuː ˌeɪˈtiːn ˈdɑːlərz ɪn ˈtoʊtl/",
        "vi": "Tổng cộng tất cả là mười tám đô la ạ.",
        "zh": "That comes to eighteen dollars in total.",
        "py": "/ðæt kʌmz tuː ˌeɪˈtiːn ˈdɑːlərz ɪn ˈtoʊtl/"
      },
      {
        "who": "A",
        "en": "Here is twenty dollars. Thank you!",
        "ipa": "/hɪr ɪz ˈtwenti ˈdɑːlərz θæŋk juː/",
        "vi": "Gửi bạn hai mươi đô la này. Cảm ơn nhé!",
        "zh": "Here is twenty dollars. Thank you!",
        "py": "/hɪr ɪz ˈtwenti ˈdɑːlərz θæŋk juː/"
      },
      {
        "who": "B",
        "en": "Here is your change and tickets. Cinema Hall 3 is on your left. Enjoy the show!",
        "ipa": "/hɪr ɪz jɔːr tʃeɪndʒ ænd ˈtɪkɪts ˈsɪnəmə hɔːl θriː ɪz ɑːn jɔːr left ɪnˈdʒɔɪ ðə ʃoʊ/",
        "vi": "Tiền thừa và vé của bạn đây. Phòng chiếu 3 ở bên tay trái nhé. Chúc bạn xem phim vui vẻ!",
        "zh": "Here is your change and tickets. Cinema Hall 3 is on your left. Enjoy the show!",
        "py": "/hɪr ɪz jɔːr tʃeɪndʒ ænd ˈtɪkɪts ˈsɪnəmə hɔːl θriː ɪz ɑːn jɔːr left ɪnˈdʒɔɪ ðə ʃoʊ/"
      }
    ]
  },
  {
    "id": "etd05",
    "title": "Lên kế hoạch cho kỳ nghỉ hè",
    "scene": "Hai người bạn cùng bàn luận địa điểm du lịch, khách sạn và các hoạt động tắm biển mùa hè.",
    "roleA": {
      "name": "Mai (Bạn)",
      "char": "Mai",
      "avatar": "🏖️"
    },
    "roleB": {
      "name": "Tom (Bạn cùng lớp)",
      "char": "Tom",
      "avatar": "🎒"
    },
    "sentences": [
      {
        "who": "A",
        "en": "Where should we go for our summer holiday this year?",
        "ipa": "/wer ʃʊd wiː ɡoʊ fɔːr ˈaʊər ˈsʌmər ˈhɑːlədeɪ ðɪs jɪr/",
        "vi": "Kỳ nghỉ hè năm nay tụi mình nên đi đâu chơi đây?",
        "zh": "Where should we go for our summer holiday this year?",
        "py": "/wer ʃʊd wiː ɡoʊ fɔːr ˈaʊər ˈsʌmər ˈhɑːlədeɪ ðɪs jɪr/"
      },
      {
        "who": "B",
        "en": "How about Da Nang? The beaches there are clean and sunny.",
        "ipa": "/haʊ əˈbaʊt Da Nang ðə ˈbiːtʃɪz ðer ɑːr kliːn ænd ˈsʌni/",
        "vi": "Đà Nẵng thì sao? Bãi biển ở đó vừa sạch vừa đầy nắng ấm.",
        "zh": "How about Da Nang? The beaches there are clean and sunny.",
        "py": "/haʊ əˈbaʊt Da Nang ðə ˈbiːtʃɪz ðer ɑːr kliːn ænd ˈsʌni/"
      },
      {
        "who": "A",
        "en": "I love Da Nang! Should we travel by train or take a flight?",
        "ipa": "/aɪ lʌv Da Nang ʃʊd wiː ˈtrævl baɪ treɪn ɔːr teɪk ə flaɪt/",
        "vi": "Mình mê Đà Nẵng lắm! Chúng mình nên đi tàu hỏa hay bay máy bay nhỉ?",
        "zh": "I love Da Nang! Should we travel by train or take a flight?",
        "py": "/aɪ lʌv Da Nang ʃʊd wiː ˈtrævl baɪ treɪn ɔːr teɪk ə flaɪt/"
      },
      {
        "who": "B",
        "en": "Flying is much faster, only one hour from Hanoi.",
        "ipa": "/ˈflaɪɪŋ ɪz mʌtʃ ˈfæstər ˈoʊnli wʌn ˈaʊər frɑːm Hanoi/",
        "vi": "Đi máy bay nhanh hơn nhiều, chỉ một tiếng từ Hà Nội thôi.",
        "zh": "Flying is much faster, only one hour from Hanoi.",
        "py": "/ˈflaɪɪŋ ɪz mʌtʃ ˈfæstər ˈoʊnli wʌn ˈaʊər frɑːm Hanoi/"
      },
      {
        "who": "A",
        "en": "Great idea. Let us look for a cozy hotel near My Khe beach.",
        "ipa": "/ɡreɪt aɪˈdiːə let ʌs lʊk fɔːr ə ˈkoʊzi hoʊˈtel nɪr My Khe biːtʃ/",
        "vi": "Ý hay đấy. Chúng mình hãy tìm một khách sạn ấm cúng gần bãi biển Mỹ Khê nhé.",
        "zh": "Great idea. Let us look for a cozy hotel near My Khe beach.",
        "py": "/ɡreɪt aɪˈdiːə let ʌs lʊk fɔːr ə ˈkoʊzi hoʊˈtel nɪr My Khe biːtʃ/"
      },
      {
        "who": "B",
        "en": "We can swim in the morning and eat fresh seafood for dinner.",
        "ipa": "/wiː kæn swɪm ɪn ðə ˈmɔːrnɪŋ ænd iːt freʃ ˈsiːfuːd fɔːr ˈdɪnər/",
        "vi": "Chúng mình có thể tắm biển vào buổi sáng và ăn hải sản tươi vào bữa tối.",
        "zh": "We can swim in the morning and eat fresh seafood for dinner.",
        "py": "/wiː kæn swɪm ɪn ðə ˈmɔːrnɪŋ ænd iːt freʃ ˈsiːfuːd fɔːr ˈdɪnər/"
      },
      {
        "who": "A",
        "en": "I can take many wonderful pictures with my new camera.",
        "ipa": "/aɪ kæn teɪk ˈmeni ˈwʌndərfl ˈpɪktʃərz wɪð maɪ nuː ˈkæmrə/",
        "vi": "Mình có thể chụp thật nhiều ảnh đẹp bằng chiếc máy ảnh mới.",
        "zh": "I can take many wonderful pictures with my new camera.",
        "py": "/aɪ kæn teɪk ˈmeni ˈwʌndərfl ˈpɪktʃərz wɪð maɪ nuː ˈkæmrə/"
      },
      {
        "who": "B",
        "en": "Awesome! I will book our flight tickets online tonight.",
        "ipa": "/ˈɔːsəm aɪ wɪl bʊk ˈaʊər flaɪt ˈtɪkɪts ˈɔːnlaɪn təˈnaɪt/",
        "vi": "Tuyệt vời! Tối nay mình sẽ đặt vé máy bay trực tuyến luôn.",
        "zh": "Awesome! I will book our flight tickets online tonight.",
        "py": "/ˈɔːsəm aɪ wɪl bʊk ˈaʊər flaɪt ˈtɪkɪts ˈɔːnlaɪn təˈnaɪt/"
      }
    ]
  },
  {
    "id": "etd06",
    "title": "Mượn sách tại thư viện trường",
    "scene": "Bạn đến thư viện tra cứu sách học tiếng Anh, hỏi thủ thư về hạn mượn và khu vực tự học.",
    "roleA": {
      "name": "Bạn sinh viên (Bạn)",
      "char": "Student",
      "avatar": "📚"
    },
    "roleB": {
      "name": "Thủ thư thư viện",
      "char": "Librarian",
      "avatar": "👓"
    },
    "sentences": [
      {
        "who": "A",
        "en": "Good morning, where can I find beginner English grammar books?",
        "ipa": "/ɡʊd ˈmɔːrnɪŋ wer kæn aɪ faɪnd bɪˈɡɪnər ˈɪŋɡlɪʃ ˈɡræmər bʊks/",
        "vi": "Chào buổi sáng, tôi có thể tìm sách ngữ pháp tiếng Anh sơ cấp ở đâu ạ?",
        "zh": "Good morning, where can I find beginner English grammar books?",
        "py": "/ɡʊd ˈmɔːrnɪŋ wer kæn aɪ faɪnd bɪˈɡɪnər ˈɪŋɡlɪʃ ˈɡræmər bʊks/"
      },
      {
        "who": "B",
        "en": "They are on the second floor, Section B near the sunny window.",
        "ipa": "/ðeɪ ɑːr ɑːn ðə ˈsekənd flɔːr ˈsekʃn biː nɪr ðə ˈsʌni ˈwɪndoʊ/",
        "vi": "Sách ở trên tầng hai, khu B gần cửa sổ có nắng nhé.",
        "zh": "They are on the second floor, Section B near the sunny window.",
        "py": "/ðeɪ ɑːr ɑːn ðə ˈsekənd flɔːr ˈsekʃn biː nɪr ðə ˈsʌni ˈwɪndoʊ/"
      },
      {
        "who": "A",
        "en": "Thank you! How many books am I allowed to borrow at once?",
        "ipa": "/θæŋk juː haʊ ˈmeni bʊks æm aɪ əˈlaʊd tuː ˈbɑːroʊ æt wʌns/",
        "vi": "Cảm ơn cô! Cháu được phép mượn bao nhiêu cuốn sách một lần ạ?",
        "zh": "Thank you! How many books am I allowed to borrow at once?",
        "py": "/θæŋk juː haʊ ˈmeni bʊks æm aɪ əˈlaʊd tuː ˈbɑːroʊ æt wʌns/"
      },
      {
        "who": "B",
        "en": "You can borrow up to three books with your valid student card.",
        "ipa": "/juː kæn ˈbɑːroʊ ʌp tuː θriː bʊks wɪð jɔːr ˈvælɪd ˈstuːdnt kɑːrd/",
        "vi": "Cháu có thể mượn tối đa ba cuốn bằng thẻ học sinh hợp lệ của mình.",
        "zh": "You can borrow up to three books with your valid student card.",
        "py": "/juː kæn ˈbɑːroʊ ʌp tuː θriː bʊks wɪð jɔːr ˈvælɪd ˈstuːdnt kɑːrd/"
      },
      {
        "who": "A",
        "en": "How long can I keep the books before returning them?",
        "ipa": "/haʊ lɔːŋ kæn aɪ kiːp ðə bʊks bɪˈfɔːr rɪˈtɜːrnɪŋ ðem/",
        "vi": "Cháu được giữ sách trong bao lâu trước khi phải trả lại ạ?",
        "zh": "How long can I keep the books before returning them?",
        "py": "/haʊ lɔːŋ kæn aɪ kiːp ðə bʊks bɪˈfɔːr rɪˈtɜːrnɪŋ ðem/"
      },
      {
        "who": "B",
        "en": "You can keep them for two weeks, and renew online if needed.",
        "ipa": "/juː kæn kiːp ðem fɔːr tuː wiːks ænd rɪˈnuː ˈɔːnlaɪn ɪf ˈniːdɪd/",
        "vi": "Cháu được giữ trong hai tuần, và có thể gia hạn trực tuyến nếu cần.",
        "zh": "You can keep them for two weeks, and renew online if needed.",
        "py": "/juː kæn kiːp ðem fɔːr tuː wiːks ænd rɪˈnuː ˈɔːnlaɪn ɪf ˈniːdɪd/"
      },
      {
        "who": "A",
        "en": "Is there a quiet room where I can practice listening with headphones?",
        "ipa": "/ɪz ðer ə ˈkwaɪət ruːm wer aɪ kæn ˈpræktɪs ˈlɪsnɪŋ wɪð ˈhedfoʊnz/",
        "vi": "Có phòng yên tĩnh nào để cháu luyện nghe bằng tai nghe không ạ?",
        "zh": "Is there a quiet room where I can practice listening with headphones?",
        "py": "/ɪz ðer ə ˈkwaɪət ruːm wer aɪ kæn ˈpræktɪs ˈlɪsnɪŋ wɪð ˈhedfoʊnz/"
      },
      {
        "who": "B",
        "en": "Yes, Room 204 on the third floor is dedicated for audio study.",
        "ipa": "/jes ruːm tuː oʊ fɔːr ɑːn ðə θɜːrd flɔːr ɪz ˈdedɪkeɪtɪd fɔːr ˈɔːdioʊ ˈstʌdi/",
        "vi": "Có chứ, phòng 204 ở tầng ba chuyên dành cho việc học nghe đấy.",
        "zh": "Yes, Room 204 on the third floor is dedicated for audio study.",
        "py": "/jes ruːm tuː oʊ fɔːr ɑːn ðə θɜːrd flɔːr ɪz ˈdedɪkeɪtɪd fɔːr ˈɔːdioʊ ˈstʌdi/"
      }
    ]
  },
  {
    "id": "etd07",
    "title": "Chạy bộ và tập thể dục ở công viên",
    "scene": "Hai người bạn tình cờ gặp nhau khi chạy bộ buổi sáng sớm trong công viên cây xanh.",
    "roleA": {
      "name": "Bảo (Bạn)",
      "char": "Bao",
      "avatar": "🏃"
    },
    "roleB": {
      "name": "Alex (Bạn chạy)",
      "char": "Alex",
      "avatar": "👟"
    },
    "sentences": [
      {
        "who": "A",
        "en": "Good morning Alex! You are up very early today.",
        "ipa": "/ɡʊd ˈmɔːrnɪŋ ˈæleks juː ɑːr ʌp ˈveri ˈɜːrli təˈdeɪ/",
        "vi": "Chào buổi sáng Alex! Hôm nay bạn dậy sớm thế.",
        "zh": "Good morning Alex! You are up very early today.",
        "py": "/ɡʊd ˈmɔːrnɪŋ ˈæleks juː ɑːr ʌp ˈveri ˈɜːrli təˈdeɪ/"
      },
      {
        "who": "B",
        "en": "Morning Bao! The fresh air in this park gives me so much energy.",
        "ipa": "/ˈmɔːrnɪŋ Bao ðə freʃ er ɪn ðɪs pɑːrk ɡɪvz miː soʊ mʌtʃ ˈenərdʒi/",
        "vi": "Chào Bảo! Không khí trong lành ở công viên này tiếp thêm cho mình bao năng lượng.",
        "zh": "Morning Bao! The fresh air in this park gives me so much energy.",
        "py": "/ˈmɔːrnɪŋ Bao ðə freʃ er ɪn ðɪs pɑːrk ɡɪvz miː soʊ mʌtʃ ˈenərdʒi/"
      },
      {
        "who": "A",
        "en": "How many laps do you usually run around the lake?",
        "ipa": "/haʊ ˈmeni læps duː juː ˈjuːʒuəli rʌn əˈraʊnd ðə leɪk/",
        "vi": "Bạn thường chạy mấy vòng quanh bờ hồ vậy?",
        "zh": "How many laps do you usually run around the lake?",
        "py": "/haʊ ˈmeni læps duː juː ˈjuːʒuəli rʌn əˈraʊnd ðə leɪk/"
      },
      {
        "who": "B",
        "en": "Usually three laps, which is about five kilometers.",
        "ipa": "/ˈjuːʒuəli θriː læps wɪtʃ ɪz əˈbaʊt faɪv ˈkɪləmiːtərz/",
        "vi": "Thường là ba vòng, khoảng chừng năm cây số.",
        "zh": "Usually three laps, which is about five kilometers.",
        "py": "/ˈjuːʒuəli θriː læps wɪtʃ ɪz əˈbaʊt faɪv ˈkɪləmiːtərz/"
      },
      {
        "who": "A",
        "en": "May I join you for this morning run?",
        "ipa": "/meɪ aɪ dʒɔɪn juː fɔːr ðɪs ˈmɔːrnɪŋ rʌn/",
        "vi": "Mình chạy cùng bạn buổi sáng nay được không?",
        "zh": "May I join you for this morning run?",
        "py": "/meɪ aɪ dʒɔɪn juː fɔːr ðɪs ˈmɔːrnɪŋ rʌn/"
      },
      {
        "who": "B",
        "en": "Sure, let us warm up first so our muscles stay safe.",
        "ipa": "/ʃʊr let ʌs wɔːrm ʌp fɜːrst soʊ ˈaʊər ˈmʌslz steɪ seɪf/",
        "vi": "Chắc chắn rồi, khởi động trước đã để cơ bắp an toàn nhé.",
        "zh": "Sure, let us warm up first so our muscles stay safe.",
        "py": "/ʃʊr let ʌs wɔːrm ʌp fɜːrst soʊ ˈaʊər ˈmʌslz steɪ seɪf/"
      },
      {
        "who": "A",
        "en": "Running together is much more motivating than running alone.",
        "ipa": "/ˈrʌnɪŋ təˈɡeðər ɪz mʌtʃ mɔːr ˈmoʊtɪveɪtɪŋ ðæn ˈrʌnɪŋ əˈloʊn/",
        "vi": "Chạy cùng nhau có động lực hơn nhiều so với chạy một mình.",
        "zh": "Running together is much more motivating than running alone.",
        "py": "/ˈrʌnɪŋ təˈɡeðər ɪz mʌtʃ mɔːr ˈmoʊtɪveɪtɪŋ ðæn ˈrʌnɪŋ əˈloʊn/"
      },
      {
        "who": "B",
        "en": "Definitely! Ready, steady, let us run!",
        "ipa": "/ˈdefɪnətli ˈredi ˈstedi let ʌs rʌn/",
        "vi": "Chắc chắn rồi! Chuẩn bị, xuất phát nào!",
        "zh": "Definitely! Ready, steady, let us run!",
        "py": "/ˈdefɪnətli ˈredi ˈstedi let ʌs rʌn/"
      }
    ]
  },
  {
    "id": "etd08",
    "title": "Cùng nấu bữa tối gia đình",
    "scene": "Hai chị em cùng chuẩn bị nguyên liệu, xào rau, nấu súp gà và dọn bàn ăn tối.",
    "roleA": {
      "name": "Chị gái (Bạn)",
      "char": "Older Sister",
      "avatar": "👩‍🍳"
    },
    "roleB": {
      "name": "Em trai",
      "char": "Younger Brother",
      "avatar": "👦"
    },
    "sentences": [
      {
        "who": "A",
        "en": "Can you help me prepare dinner tonight?",
        "ipa": "/kæn juː help miː prɪˈper ˈdɪnər təˈnaɪt/",
        "vi": "Em có thể giúp chị chuẩn bị bữa tối nay không?",
        "zh": "Can you help me prepare dinner tonight?",
        "py": "/kæn juː help miː prɪˈper ˈdɪnər təˈnaɪt/"
      },
      {
        "who": "B",
        "en": "Yes sister! What are we cooking for dinner?",
        "ipa": "/jes ˈsɪstər wɑːt ɑːr wiː ˈkʊkɪŋ fɔːr ˈdɪnər/",
        "vi": "Dạ được chứ chị! Tối nay nhà mình nấu món gì vậy chị?",
        "zh": "Yes sister! What are we cooking for dinner?",
        "py": "/jes ˈsɪstər wɑːt ɑːr wiː ˈkʊkɪŋ fɔːr ˈdɪnər/"
      },
      {
        "who": "A",
        "en": "We are making chicken vegetable soup and fried fish.",
        "ipa": "/wiː ɑːr ˈmeɪkɪŋ ˈtʃɪkɪn ˈvedʒtəbl suːp ænd fraɪd fɪʃ/",
        "vi": "Nhà mình nấu món súp gà rau củ và cá rán.",
        "zh": "We are making chicken vegetable soup and fried fish.",
        "py": "/wiː ɑːr ˈmeɪkɪŋ ˈtʃɪkɪn ˈvedʒtəbl suːp ænd fraɪd fɪʃ/"
      },
      {
        "who": "B",
        "en": "Sounds delicious! Should I wash the vegetables first?",
        "ipa": "/saʊndz dɪˈlɪʃəs ʃʊd aɪ wɑːʃ ðə ˈvedʒtəblz fɜːrst/",
        "vi": "Nghe ngon quá! Em rửa rau trước nhé chị?",
        "zh": "Sounds delicious! Should I wash the vegetables first?",
        "py": "/saʊndz dɪˈlɪʃəs ʃʊd aɪ wɑːʃ ðə ˈvedʒtəblz fɜːrst/"
      },
      {
        "who": "A",
        "en": "Yes please, wash the carrots and chop them with a butter knife.",
        "ipa": "/jes pliːz wɑːʃ ðə ˈkærəts ænd tʃɑːp ðem wɪð ə ˈbʌtər naɪf/",
        "vi": "Ừ em, rửa cà rốt rồi thái nhỏ bằng dao gọt nhé.",
        "zh": "Yes please, wash the carrots and chop them with a butter knife.",
        "py": "/jes pliːz wɑːʃ ðə ˈkærəts ænd tʃɑːp ðem wɪð ə ˈbʌtər naɪf/"
      },
      {
        "who": "B",
        "en": "I washed the carrots and set the table with four plates and spoons.",
        "ipa": "/aɪ wɑːʃt ðə ˈkærəts ænd set ðə ˈteɪbl wɪð fɔːr pleɪts ænd spuːnz/",
        "vi": "Em đã rửa sạch cà rốt và dọn bàn với bốn chiếc đĩa cùng thìa rồi ạ.",
        "zh": "I washed the carrots and set the table with four plates and spoons.",
        "py": "/aɪ wɑːʃt ðə ˈkærəts ænd set ðə ˈteɪbl wɪð fɔːr pleɪts ænd spuːnz/"
      },
      {
        "who": "A",
        "en": "You did a great job! The soup smells wonderful now.",
        "ipa": "/juː dɪd ə ɡreɪt dʒɑːb ðə suːp smelz ˈwʌndərfl naʊ/",
        "vi": "Em làm giỏi lắm! Nồi súp giờ thơm nức mũi rồi.",
        "zh": "You did a great job! The soup smells wonderful now.",
        "py": "/juː dɪd ə ɡreɪt dʒɑːb ðə suːp smelz ˈwʌndərfl naʊ/"
      },
      {
        "who": "B",
        "en": "Mom and dad are back home, let us all sit down together!",
        "ipa": "/mɑːm ænd dæd ɑːr bæk hoʊm let ʌs ɔːl sɪt daʊn təˈɡeðər/",
        "vi": "Bố mẹ đã về rồi, cả nhà mình cùng ngồi vào bàn thôi!",
        "zh": "Mom and dad are back home, let us all sit down together!",
        "py": "/mɑːm ænd dæd ɑːr bæk hoʊm let ʌs ɔːl sɪt daʊn təˈɡeðər/"
      }
    ]
  },
  {
    "id": "etd09",
    "title": "Mua quà sinh nhật cho bạn thân",
    "scene": "Hai người bạn dạo quanh nhà sách và cửa hàng lưu niệm để chọn quà tặng sinh nhật.",
    "roleA": {
      "name": "Linh (Bạn)",
      "char": "Linh",
      "avatar": "🎁"
    },
    "roleB": {
      "name": "Huy (Bạn)",
      "char": "Huy",
      "avatar": "🛍️"
    },
    "sentences": [
      {
        "who": "A",
        "en": "Tomorrow is Mai birthday. What should we buy for her?",
        "ipa": "/təˈmɑːroʊ ɪz Mai ˈbɜːrθdeɪ wɑːt ʃʊd wiː baɪ fɔːr hɜːr/",
        "vi": "Ngày mai là sinh nhật của Mai rồi. Tụi mình nên mua gì tặng bạn ấy nhỉ?",
        "zh": "Tomorrow is Mai birthday. What should we buy for her?",
        "py": "/təˈmɑːroʊ ɪz Mai ˈbɜːrθdeɪ wɑːt ʃʊd wiː baɪ fɔːr hɜːr/"
      },
      {
        "who": "B",
        "en": "She loves drawing and writing stories. How about a nice notebook and pens?",
        "ipa": "/ʃiː lʌvz ˈdrɔːɪŋ ænd ˈraɪtɪŋ ˈstɔːriz haʊ əˈbaʊt ə naɪs ˈnoʊtbʊk ænd penz/",
        "vi": "Mai rất thích vẽ và viết truyện. Một cuốn sổ tay xinh xắn và bộ bút thì sao?",
        "zh": "She loves drawing and writing stories. How about a nice notebook and pens?",
        "py": "/ʃiː lʌvz ˈdrɔːɪŋ ænd ˈraɪtɪŋ ˈstɔːriz haʊ əˈbaʊt ə naɪs ˈnoʊtbʊk ænd penz/"
      },
      {
        "who": "A",
        "en": "Look at this handcrafted notebook with flower illustrations on the cover!",
        "ipa": "/lʊk æt ðɪs ˈhændkræftɪd ˈnoʊtbʊk wɪð ˈflaʊər ˌɪləˈstreɪʃnz ɑːn ðə ˈkʌvər/",
        "vi": "Nhìn cuốn sổ tay làm thủ công có hình hoa trên bìa này xem!",
        "zh": "Look at this handcrafted notebook with flower illustrations on the cover!",
        "py": "/lʊk æt ðɪs ˈhændkræftɪd ˈnoʊtbʊk wɪð ˈflaʊər ˌɪləˈstreɪʃnz ɑːn ðə ˈkʌvər/"
      },
      {
        "who": "B",
        "en": "It looks beautiful! And we can add a box of colored pencils.",
        "ipa": "/ɪt lʊks ˈbjuːtɪfl ænd wiː kæn æd ə bɑːks əv ˈkʌlərd ˈpenslz/",
        "vi": "Trông đẹp thật đấy! Và chúng mình có thể mua thêm một hộp bút chì màu.",
        "zh": "It looks beautiful! And we can add a box of colored pencils.",
        "py": "/ɪt lʊks ˈbjuːtɪfl ænd wiː kæn æd ə bɑːks əv ˈkʌlərd ˈpenslz/"
      },
      {
        "who": "A",
        "en": "How much are the notebook and the color pencils combined?",
        "ipa": "/haʊ mʌtʃ ɑːr ðə ˈnoʊtbʊk ænd ðə ˈkʌlər ˈpenslz kəmˈbaɪnd/",
        "vi": "Cả cuốn sổ lẫn hộp bút chì màu tổng cộng là bao nhiêu?",
        "zh": "How much are the notebook and the color pencils combined?",
        "py": "/haʊ mʌtʃ ɑːr ðə ˈnoʊtbʊk ænd ðə ˈkʌlər ˈpenslz kəmˈbaɪnd/"
      },
      {
        "who": "B",
        "en": "The tag says twelve dollars for both. That fits our budget nicely.",
        "ipa": "/ðə tæɡ sez twelv ˈdɑːlərz fɔːr boʊθ ðæt fɪts ˈaʊər ˈbʌdʒɪt ˈnaɪsli/",
        "vi": "Nhãn ghi mười hai đô la cho cả hai. Vừa vặn với ngân sách của tụi mình.",
        "zh": "The tag says twelve dollars for both. That fits our budget nicely.",
        "py": "/ðə tæɡ sez twelv ˈdɑːlərz fɔːr boʊθ ðæt fɪts ˈaʊər ˈbʌdʒɪt ˈnaɪsli/"
      },
      {
        "who": "A",
        "en": "Let us ask the shopkeeper to wrap it with festive gift paper.",
        "ipa": "/let ʌs æsk ðə ˈʃɑːpkiːpər tuː ræp ɪt wɪð ˈfestɪv ɡɪft ˈpeɪpər/",
        "vi": "Tụi mình nhờ cô chủ quán gói lại bằng giấy gói quà rực rỡ nhé.",
        "zh": "Let us ask the shopkeeper to wrap it with festive gift paper.",
        "py": "/let ʌs æsk ðə ˈʃɑːpkiːpər tuː ræp ɪt wɪð ˈfestɪv ɡɪft ˈpeɪpər/"
      },
      {
        "who": "B",
        "en": "And do not forget to write a sweet birthday card for her!",
        "ipa": "/ænd duː nɑːt fərˈɡet tuː raɪt ə swiːt ˈbɜːrθdeɪ kɑːrd fɔːr hɜːr/",
        "vi": "Và đừng quên viết một tấm thiệp chúc mừng sinh nhật thật ngọt ngào cho bạn ấy!",
        "zh": "And do not forget to write a sweet birthday card for her!",
        "py": "/ænd duː nɑːt fərˈɡet tuː raɪt ə swiːt ˈbɜːrθdeɪ kɑːrd fɔːr hɜːr/"
      }
    ]
  },
  {
    "id": "etd10",
    "title": "Luyện nói và chỉnh phát âm tiếng Anh",
    "scene": "Hai người bạn ngồi trong thư viện cùng luyện đọc các cặp âm dễ nhầm và chỉnh lỗi âm cuối.",
    "roleA": {
      "name": "Phong (Bạn)",
      "char": "Phong",
      "avatar": "🗣️"
    },
    "roleB": {
      "name": "Hoa (Bạn học)",
      "char": "Hoa",
      "avatar": "🎧"
    },
    "sentences": [
      {
        "who": "A",
        "en": "Hoa, could you listen and check my pronunciation of the word think?",
        "ipa": "/Hoa kʊd juː ˈlɪsn ænd tʃek maɪ prəˌnʌnsiˈeɪʃn əv ðə wɜːrd θɪŋk/",
        "vi": "Hoa ơi, bạn lắng nghe và kiểm tra giúp mình phát âm của từ think được không?",
        "zh": "Hoa, could you listen and check my pronunciation of the word think?",
        "py": "/Hoa kʊd juː ˈlɪsn ænd tʃek maɪ prəˌnʌnsiˈeɪʃn əv ðə wɜːrd θɪŋk/"
      },
      {
        "who": "B",
        "en": "Sure! Try to place your tongue tip between your teeth when blowing air.",
        "ipa": "/ʃʊr traɪ tuː pleɪs jɔːr tʌŋ tɪp bɪˈtwiːn jɔːr tiːθ wen ˈbloʊɪŋ er/",
        "vi": "Chắc chắn rồi! Hãy thử đặt đầu lưỡi giữa hai hàm răng khi thổi hơi xem sao nhé.",
        "zh": "Sure! Try to place your tongue tip between your teeth when blowing air.",
        "py": "/ʃʊr traɪ tuː pleɪs jɔːr tʌŋ tɪp bɪˈtwiːn jɔːr tiːθ wen ˈbloʊɪŋ er/"
      },
      {
        "who": "A",
        "en": "Think, thank you, three. Did I do it right this time?",
        "ipa": "/θɪŋk θæŋk juː θriː dɪd aɪ duː ɪt raɪt ðɪs taɪm/",
        "vi": "Think, thank you, three. Lần này mình phát âm đúng chưa?",
        "zh": "Think, thank you, three. Did I do it right this time?",
        "py": "/θɪŋk θæŋk juː θriː dɪd aɪ duː ɪt raɪt ðɪs taɪm/"
      },
      {
        "who": "B",
        "en": "Much better! Now remember to pronounce the final sounds in nice and cat.",
        "ipa": "/mʌtʃ ˈbetər naʊ rɪˈmembər tuː prəˈnaʊns ðə ˈfaɪnl saʊndz ɪn naɪs ænd kæt/",
        "vi": "Tốt hơn nhiều rồi! Giờ bạn nhớ phát âm cả âm cuối trong nice và cat nữa nhé.",
        "zh": "Much better! Now remember to pronounce the final sounds in nice and cat.",
        "py": "/mʌtʃ ˈbetər naʊ rɪˈmembər tuː prəˈnaʊns ðə ˈfaɪnl saʊndz ɪn naɪs ænd kæt/"
      },
      {
        "who": "A",
        "en": "Have a nice day, and feed the hungry cat. Like that?",
        "ipa": "/hæv ə naɪs deɪ ænd fiːd ðə ˈhʌŋɡri kæt laɪk ðæt/",
        "vi": "Have a nice day, và feed the hungry cat. Như vậy đúng không?",
        "zh": "Have a nice day, and feed the hungry cat. Like that?",
        "py": "/hæv ə naɪs deɪ ænd fiːd ðə ˈhʌŋɡri kæt laɪk ðæt/"
      },
      {
        "who": "B",
        "en": "Perfect! The s and t sounds came out very clear and natural.",
        "ipa": "/ˈpɜːrfɪkt ðə es ænd tiː saʊndz keɪm aʊt ˈveri klɪr ænd ˈnætʃrəl/",
        "vi": "Hoàn hảo luôn! Âm s và âm t phát ra nghe rất rõ ràng và tự nhiên.",
        "zh": "Perfect! The s and t sounds came out very clear and natural.",
        "py": "/ˈpɜːrfɪkt ðə es ænd tiː saʊndz keɪm aʊt ˈveri klɪr ænd ˈnætʃrəl/"
      },
      {
        "who": "A",
        "en": "Thank you! Practicing aloud together every day makes learning fun.",
        "ipa": "/θæŋk juː ˈpræktɪsɪŋ əˈlaʊd təˈɡeðər ˈevri deɪ meɪks ˈlɜːrnɪŋ fʌn/",
        "vi": "Cảm ơn bạn! Cùng nhau đọc to mỗi ngày làm việc học vui hơn bao nhiêu.",
        "zh": "Thank you! Practicing aloud together every day makes learning fun.",
        "py": "/θæŋk juː ˈpræktɪsɪŋ əˈlaʊd təˈɡeðər ˈevri deɪ meɪks ˈlɜːrnɪŋ fʌn/"
      },
      {
        "who": "B",
        "en": "I agree completely! Let us do ten more minutes before class.",
        "ipa": "/aɪ əˈɡriː kəmˈpliːtli let ʌs duː ten mɔːr ˈmɪnɪts bɪˈfɔːr klæs/",
        "vi": "Mình hoàn toàn đồng ý! Tụi mình luyện thêm mười phút nữa trước giờ vào lớp nhé.",
        "zh": "I agree completely! Let us do ten more minutes before class.",
        "py": "/aɪ əˈɡriː kəmˈpliːtli let ʌs duː ten mɔːr ˈmɪnɪts bɪˈfɔːr klæs/"
      }
    ]
  }
];

  if (typeof window !== 'undefined') {
    window.EN_TALK_DIALOGUES = TALK_DIALOGUES;
    window.TALK_DIALOGUES_EN = TALK_DIALOGUES;
    if (!window.TALK_DIALOGUES) {
      window.TALK_DIALOGUES = TALK_DIALOGUES;
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TALK_DIALOGUES };
  }
})();
