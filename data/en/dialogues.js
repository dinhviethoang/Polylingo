/**
 * data/en/dialogues.js
 * 10 bài hội thoại tiếng Anh đời thường thực tế cho người mới bắt đầu.
 * Định dạng lines: [{ who: 'A'|'B', en, ipa, vi, zh, py }]
 */

(function () {
  'use strict';

  const DIALOGUES = [
  {
    "id": "d01",
    "title": "Chào hỏi & Làm quen",
    "lines": [
      {
        "who": "A",
        "en": "Hello! How are you today?",
        "ipa": "/həˈloʊ haʊ ɑːr juː təˈdeɪ/",
        "vi": "Xin chào! Hôm nay bạn thế nào?",
        "zh": "Hello! How are you today?",
        "py": "/həˈloʊ haʊ ɑːr juː təˈdeɪ/"
      },
      {
        "who": "B",
        "en": "I am doing great, thank you! And you?",
        "ipa": "/aɪ æm ˈduːɪŋ ɡreɪt θæŋk juː ænd juː/",
        "vi": "Tôi rất khỏe, cảm ơn bạn! Còn bạn thì sao?",
        "zh": "I am doing great, thank you! And you?",
        "py": "/aɪ æm ˈduːɪŋ ɡreɪt θæŋk juː ænd juː/"
      },
      {
        "who": "A",
        "en": "I am fine too. My name is Nam. What is your name?",
        "ipa": "/aɪ æm faɪn tuː maɪ neɪm ɪz Nam wɑːt ɪz jɔːr neɪm/",
        "vi": "Tôi cũng khỏe. Tên tôi là Nam. Tên bạn là gì?",
        "zh": "I am fine too. My name is Nam. What is your name?",
        "py": "/aɪ æm faɪn tuː maɪ neɪm ɪz Nam wɑːt ɪz jɔːr neɪm/"
      },
      {
        "who": "B",
        "en": "Nice to meet you, Nam! My name is Sarah.",
        "ipa": "/naɪs tuː miːt juː Nam maɪ neɪm ɪz ˈserə/",
        "vi": "Rất vui được gặp bạn, Nam! Tên tôi là Sarah.",
        "zh": "Nice to meet you, Nam! My name is Sarah.",
        "py": "/naɪs tuː miːt juː Nam maɪ neɪm ɪz ˈserə/"
      },
      {
        "who": "A",
        "en": "Nice to meet you too, Sarah. Where are you from?",
        "ipa": "/naɪs tuː miːt juː tuː ˈserə wer ɑːr juː frɑːm/",
        "vi": "Tôi cũng rất vui được gặp bạn, Sarah. Bạn đến từ đâu vậy?",
        "zh": "Nice to meet you too, Sarah. Where are you from?",
        "py": "/naɪs tuː miːt juː tuː ˈserə wer ɑːr juː frɑːm/"
      },
      {
        "who": "B",
        "en": "I am from Canada, and I am visiting Vietnam.",
        "ipa": "/aɪ æm frɑːm ˈkænədə ænd aɪ æm ˈvɪzɪtɪŋ ˌvjetˈnɑːm/",
        "vi": "Tôi đến từ Canada, và tôi đang đi du lịch Việt Nam.",
        "zh": "I am from Canada, and I am visiting Vietnam.",
        "py": "/aɪ æm frɑːm ˈkænədə ænd aɪ æm ˈvɪzɪtɪŋ ˌvjetˈnɑːm/"
      }
    ]
  },
  {
    "id": "d02",
    "title": "Giới thiệu bản thân",
    "lines": [
      {
        "who": "A",
        "en": "Could you please introduce yourself?",
        "ipa": "/kʊd juː pliːz ˌɪntrəˈduːs jɔːrˈself/",
        "vi": "Bạn có thể vui lòng tự giới thiệu về mình được không?",
        "zh": "Could you please introduce yourself?",
        "py": "/kʊd juː pliːz ˌɪntrəˈduːs jɔːrˈself/"
      },
      {
        "who": "B",
        "en": "Certainly! My name is David, and I am twenty-two.",
        "ipa": "/ˈsɜːrtnli maɪ neɪm ɪz ˈdeɪvɪd ænd aɪ æm ˈtwenti tuː/",
        "vi": "Chắc chắn rồi! Tên tôi là David, và tôi hai mươi hai tuổi.",
        "zh": "Certainly! My name is David, and I am twenty-two.",
        "py": "/ˈsɜːrtnli maɪ neɪm ɪz ˈdeɪvɪd ænd aɪ æm ˈtwenti tuː/"
      },
      {
        "who": "A",
        "en": "What do you do for work?",
        "ipa": "/wɑːt duː juː duː fɔːr wɜːrk/",
        "vi": "Bạn làm nghề gì thế?",
        "zh": "What do you do for work?",
        "py": "/wɑːt duː juː duː fɔːr wɜːrk/"
      },
      {
        "who": "B",
        "en": "I am a software engineer at a technology company.",
        "ipa": "/aɪ æm ə ˈsɔːftwer ˌendʒɪˈnɪr æt ə tekˈnɑːlədʒi ˈkʌmpəni/",
        "vi": "Tôi là một kỹ sư phần mềm tại một công ty công nghệ.",
        "zh": "I am a software engineer at a technology company.",
        "py": "/aɪ æm ə ˈsɔːftwer ˌendʒɪˈnɪr æt ə tekˈnɑːlədʒi ˈkʌmpəni/"
      },
      {
        "who": "A",
        "en": "What hobbies do you enjoy in your free time?",
        "ipa": "/wɑːt ˈhɑːbiz duː juː ɪnˈdʒɔɪ ɪn jɔːr friː taɪm/",
        "vi": "Bạn thích những sở thích gì vào thời gian rảnh rỗi?",
        "zh": "What hobbies do you enjoy in your free time?",
        "py": "/wɑːt ˈhɑːbiz duː juː ɪnˈdʒɔɪ ɪn jɔːr friː taɪm/"
      },
      {
        "who": "B",
        "en": "I enjoy reading books and playing football with friends.",
        "ipa": "/aɪ ɪnˈdʒɔɪ ˈriːdɪŋ bʊks ænd ˈpleɪɪŋ ˈfʊtbɔːl wɪð frendz/",
        "vi": "Tôi thích đọc sách và đá bóng cùng bạn bè.",
        "zh": "I enjoy reading books and playing football with friends.",
        "py": "/aɪ ɪnˈdʒɔɪ ˈriːdɪŋ bʊks ænd ˈpleɪɪŋ ˈfʊtbɔːl wɪð frendz/"
      }
    ]
  },
  {
    "id": "d03",
    "title": "Hỏi thăm sức khỏe & Công việc",
    "lines": [
      {
        "who": "A",
        "en": "Hi Mai, you look a little tired today.",
        "ipa": "/haɪ Mai juː lʊk ə ˈlɪtl ˈtaɪərd təˈdeɪ/",
        "vi": "Chào Mai, hôm nay trông bạn có vẻ hơi mệt mỏi.",
        "zh": "Hi Mai, you look a little tired today.",
        "py": "/haɪ Mai juː lʊk ə ˈlɪtl ˈtaɪərd təˈdeɪ/"
      },
      {
        "who": "B",
        "en": "Yes, I had a very busy week at the office.",
        "ipa": "/jes aɪ hæd ə ˈveri ˈbɪzi wiːk æt ðə ˈɔːfɪs/",
        "vi": "Đúng vậy, tôi đã có một tuần rất bận rộn ở cơ quan.",
        "zh": "Yes, I had a very busy week at the office.",
        "py": "/jes aɪ hæd ə ˈveri ˈbɪzi wiːk æt ðə ˈɔːfɪs/"
      },
      {
        "who": "A",
        "en": "Are you working on a new project?",
        "ipa": "/ɑːr juː ˈwɜːrkɪŋ ɑːn ə nuː ˈprɑːdʒekt/",
        "vi": "Bạn đang làm một dự án mới à?",
        "zh": "Are you working on a new project?",
        "py": "/ɑːr juː ˈwɜːrkɪŋ ɑːn ə nuː ˈprɑːdʒekt/"
      },
      {
        "who": "B",
        "en": "Yes, we are preparing for a major product launch.",
        "ipa": "/jes wiː ɑːr prɪˈperɪŋ fɔːr ə ˈmeɪdʒər ˈprɑːdʌkt lɔːntʃ/",
        "vi": "Đúng rồi, chúng tôi đang chuẩn bị ra mắt sản phẩm lớn.",
        "zh": "Yes, we are preparing for a major product launch.",
        "py": "/jes wiː ɑːr prɪˈperɪŋ fɔːr ə ˈmeɪdʒər ˈprɑːdʌkt lɔːntʃ/"
      },
      {
        "who": "A",
        "en": "Make sure to take rest and drink enough water.",
        "ipa": "/meɪk ʃʊr tuː teɪk rest ænd drɪŋk ɪˈnʌf ˈwɔːtər/",
        "vi": "Nhớ nghỉ ngơi và uống đủ nước nhé.",
        "zh": "Make sure to take rest and drink enough water.",
        "py": "/meɪk ʃʊr tuː teɪk rest ænd drɪŋk ɪˈnʌf ˈwɔːtər/"
      },
      {
        "who": "B",
        "en": "Thank you for your thoughtful concern!",
        "ipa": "/θæŋk juː fɔːr jɔːr ˈθɔːtfl kənˈsɜːrn/",
        "vi": "Cảm ơn sự quan tâm chu đáo của bạn nhé!",
        "zh": "Thank you for your thoughtful concern!",
        "py": "/θæŋk juː fɔːr jɔːr ˈθɔːtfl kənˈsɜːrn/"
      }
    ]
  },
  {
    "id": "d04",
    "title": "Mua sắm tại cửa hàng",
    "lines": [
      {
        "who": "A",
        "en": "Hello, may I help you find something?",
        "ipa": "/həˈloʊ meɪ aɪ help juː faɪnd ˈsʌmθɪŋ/",
        "vi": "Xin chào, tôi có thể giúp quý khách tìm món đồ gì không ạ?",
        "zh": "Hello, may I help you find something?",
        "py": "/həˈloʊ meɪ aɪ help juː faɪnd ˈsʌmθɪŋ/"
      },
      {
        "who": "B",
        "en": "Yes, I am looking for a warm blue jacket.",
        "ipa": "/jes aɪ æm ˈlʊkɪŋ fɔːr ə wɔːrm bluː ˈdʒækɪt/",
        "vi": "Vâng, tôi đang tìm một chiếc áo khoác ấm màu xanh.",
        "zh": "Yes, I am looking for a warm blue jacket.",
        "py": "/jes aɪ æm ˈlʊkɪŋ fɔːr ə wɔːrm bluː ˈdʒækɪt/"
      },
      {
        "who": "A",
        "en": "What size do you normally wear?",
        "ipa": "/wɑːt saɪz duː juː ˈnɔːrməli wer/",
        "vi": "Quý khách thường mặc kích cỡ nào ạ?",
        "zh": "What size do you normally wear?",
        "py": "/wɑːt saɪz duː juː ˈnɔːrməli wer/"
      },
      {
        "who": "B",
        "en": "I usually wear medium. Can I try this one on?",
        "ipa": "/aɪ ˈjuːʒuəli wer ˈmiːdiəm kæn aɪ traɪ ðɪs wʌn ɑːn/",
        "vi": "Tôi thường mặc cỡ M. Tôi có thể mặc thử chiếc này không?",
        "zh": "I usually wear medium. Can I try this one on?",
        "py": "/aɪ ˈjuːʒuəli wer ˈmiːdiəm kæn aɪ traɪ ðɪs wʌn ɑːn/"
      },
      {
        "who": "A",
        "en": "Of course! The fitting rooms are right over there.",
        "ipa": "/əv kɔːrs ðə ˈfɪtɪŋ ruːmz ɑːr raɪt ˈoʊvər ðer/",
        "vi": "Tất nhiên rồi ạ! Phòng thử đồ ở ngay đằng kia.",
        "zh": "Of course! The fitting rooms are right over there.",
        "py": "/əv kɔːrs ðə ˈfɪtɪŋ ruːmz ɑːr raɪt ˈoʊvər ðer/"
      },
      {
        "who": "B",
        "en": "It fits me very well. How much is it?",
        "ipa": "/ɪt fɪts miː ˈveri wel haʊ mʌtʃ ɪz ɪt/",
        "vi": "Nó rất vừa vặn với tôi. Chiếc này giá bao nhiêu vậy?",
        "zh": "It fits me very well. How much is it?",
        "py": "/ɪt fɪts miː ˈveri wel haʊ mʌtʃ ɪz ɪt/"
      },
      {
        "who": "A",
        "en": "It is forty-five dollars today.",
        "ipa": "/ɪt ɪz ˈfɔːrti faɪv ˈdɑːlərz təˈdeɪ/",
        "vi": "Hôm nay nó có giá bốn mươi lăm đô la ạ.",
        "zh": "It is forty-five dollars today.",
        "py": "/ɪt ɪz ˈfɔːrti faɪv ˈdɑːlərz təˈdeɪ/"
      },
      {
        "who": "B",
        "en": "Great, I will take it. Can I pay with card?",
        "ipa": "/ɡreɪt aɪ wɪl teɪk ɪt kæn aɪ peɪ wɪð kɑːrd/",
        "vi": "Tuyệt, tôi sẽ lấy chiếc này. Tôi quẹt thẻ được chứ?",
        "zh": "Great, I will take it. Can I pay with card?",
        "py": "/ɡreɪt aɪ wɪl teɪk ɪt kæn aɪ peɪ wɪð kɑːrd/"
      }
    ]
  },
  {
    "id": "d05",
    "title": "Gọi món tại nhà hàng",
    "lines": [
      {
        "who": "A",
        "en": "Good evening, a table for two please.",
        "ipa": "/ɡʊd ˈiːvnɪŋ ə ˈteɪbl fɔːr tuː pliːz/",
        "vi": "Chào buổi tối, làm ơn cho chúng tôi bàn hai người.",
        "zh": "Good evening, a table for two please.",
        "py": "/ɡʊd ˈiːvnɪŋ ə ˈteɪbl fɔːr tuː pliːz/"
      },
      {
        "who": "B",
        "en": "Certainly! Please follow me to this window table.",
        "ipa": "/ˈsɜːrtnli pliːz ˈfɑːloʊ miː tuː ðɪs ˈwɪndoʊ ˈteɪbl/",
        "vi": "Dạ được chứ ạ! Mời quý khách theo tôi đến bàn cạnh cửa sổ này.",
        "zh": "Certainly! Please follow me to this window table.",
        "py": "/ˈsɜːrtnli pliːz ˈfɑːloʊ miː tuː ðɪs ˈwɪndoʊ ˈteɪbl/"
      },
      {
        "who": "A",
        "en": "Could we see the food and drink menu?",
        "ipa": "/kʊd wiː siː ðə fuːd ænd drɪŋk ˈmenjuː/",
        "vi": "Chúng tôi có thể xem thực đơn đồ ăn và thức uống được không?",
        "zh": "Could we see the food and drink menu?",
        "py": "/kʊd wiː siː ðə fuːd ænd drɪŋk ˈmenjuː/"
      },
      {
        "who": "B",
        "en": "Here you are. Today special is grilled chicken with rice.",
        "ipa": "/hɪr juː ɑːr təˈdeɪ ˈspeʃl ɪz ɡrɪld ˈtʃɪkɪn wɪð raɪs/",
        "vi": "Dạ thực đơn đây ạ. Món đặc biệt hôm nay là cơm gà nướng.",
        "zh": "Here you are. Today special is grilled chicken with rice.",
        "py": "/hɪr juː ɑːr təˈdeɪ ˈspeʃl ɪz ɡrɪld ˈtʃɪkɪn wɪð raɪs/"
      },
      {
        "who": "A",
        "en": "Sounds delicious! We will have two chicken dishes and water.",
        "ipa": "/saʊndz dɪˈlɪʃəs wiː wɪl hæv tuː ˈtʃɪkɪn ˈdɪʃɪz ænd ˈwɔːtər/",
        "vi": "Nghe ngon quá! Chúng tôi lấy hai phần gà và nước lọc nhé.",
        "zh": "Sounds delicious! We will have two chicken dishes and water.",
        "py": "/saʊndz dɪˈlɪʃəs wiː wɪl hæv tuː ˈtʃɪkɪn ˈdɪʃɪz ænd ˈwɔːtər/"
      },
      {
        "who": "B",
        "en": "Would you like hot tea or cold iced water?",
        "ipa": "/wʊd juː laɪk hɑːt tiː ɔːr koʊld aɪst ˈwɔːtər/",
        "vi": "Quý khách muốn dùng trà nóng hay nước đá lạnh ạ?",
        "zh": "Would you like hot tea or cold iced water?",
        "py": "/wʊd juː laɪk hɑːt tiː ɔːr koʊld aɪst ˈwɔːtər/"
      },
      {
        "who": "A",
        "en": "Cold water with lemon, please.",
        "ipa": "/koʊld ˈwɔːtər wɪð ˈlemən pliːz/",
        "vi": "Cho chúng tôi nước đá thêm lát chanh nhé.",
        "zh": "Cold water with lemon, please.",
        "py": "/koʊld ˈwɔːtər wɪð ˈlemən pliːz/"
      },
      {
        "who": "B",
        "en": "Understood. Your meal will be ready in ten minutes.",
        "ipa": "/ˌʌndərˈstʊd jɔːr miːl wɪl biː ˈredi ɪn ten ˈmɪnɪts/",
        "vi": "Dạ tôi đã ghi nhận. Món ăn của quý khách sẽ có sau mười phút.",
        "zh": "Understood. Your meal will be ready in ten minutes.",
        "py": "/ˌʌndərˈstʊd jɔːr miːl wɪl biː ˈredi ɪn ten ˈmɪnɪts/"
      }
    ]
  },
  {
    "id": "d06",
    "title": "Hỏi đường đi",
    "lines": [
      {
        "who": "A",
        "en": "Excuse me, could you tell me the way to the post office?",
        "ipa": "/ɪkˈskjuːz miː kʊd juː tel miː ðə weɪ tuː ðə poʊst ˈɔːfɪs/",
        "vi": "Xin lỗi, bạn có thể chỉ đường cho tôi đến bưu điện được không?",
        "zh": "Excuse me, could you tell me the way to the post office?",
        "py": "/ɪkˈskjuːz miː kʊd juː tel miː ðə weɪ tuː ðə poʊst ˈɔːfɪs/"
      },
      {
        "who": "B",
        "en": "Sure! Walk straight along this street for two blocks.",
        "ipa": "/ʃʊr wɔːk streɪt əˈlɔːŋ ðɪs striːt fɔːr tuː blɑːks/",
        "vi": "Chắc chắn rồi! Hãy đi thẳng dọc con phố này khoảng hai dãy nhà.",
        "zh": "Sure! Walk straight along this street for two blocks.",
        "py": "/ʃʊr wɔːk streɪt əˈlɔːŋ ðɪs striːt fɔːr tuː blɑːks/"
      },
      {
        "who": "A",
        "en": "Do I need to turn at the traffic lights?",
        "ipa": "/duː aɪ niːd tuː tɜːrn æt ðə ˈtræfɪk laɪts/",
        "vi": "Tôi có cần rẽ ở chỗ đèn giao thông không?",
        "zh": "Do I need to turn at the traffic lights?",
        "py": "/duː aɪ niːd tuː tɜːrn æt ðə ˈtræfɪk laɪts/"
      },
      {
        "who": "B",
        "en": "Yes, turn left at the lights. It is next to a bank.",
        "ipa": "/jes tɜːrn left æt ðə laɪts ɪt ɪz nekst tuː ə bæŋk/",
        "vi": "Có, hãy rẽ trái ở cột đèn. Bưu điện nằm ngay bên cạnh ngân hàng.",
        "zh": "Yes, turn left at the lights. It is next to a bank.",
        "py": "/jes tɜːrn left æt ðə laɪts ɪt ɪz nekst tuː ə bæŋk/"
      },
      {
        "who": "A",
        "en": "Is it far to walk from here?",
        "ipa": "/ɪz ɪt fɑːr tuː wɔːk frɑːm hɪr/",
        "vi": "Đi bộ từ đây tới đó có xa không bạn?",
        "zh": "Is it far to walk from here?",
        "py": "/ɪz ɪt fɑːr tuː wɔːk frɑːm hɪr/"
      },
      {
        "who": "B",
        "en": "No, it takes only five minutes on foot.",
        "ipa": "/noʊ ɪt teɪks ˈoʊnli faɪv ˈmɪnɪts ɑːn fʊt/",
        "vi": "Không xa đâu, chỉ mất năm phút đi bộ thôi.",
        "zh": "No, it takes only five minutes on foot.",
        "py": "/noʊ ɪt teɪks ˈoʊnli faɪv ˈmɪnɪts ɑːn fʊt/"
      }
    ]
  },
  {
    "id": "d07",
    "title": "Đặt & Nhận phòng khách sạn",
    "lines": [
      {
        "who": "A",
        "en": "Good afternoon, I have a reservation under the name Wilson.",
        "ipa": "/ɡʊd ˌæftərˈnuːn aɪ hæv ə ˌrezərˈveɪʃn ˈʌndər ðə neɪm ˈwɪlsn/",
        "vi": "Chào buổi chiều, tôi có đặt phòng trước dưới tên Wilson.",
        "zh": "Good afternoon, I have a reservation under the name Wilson.",
        "py": "/ɡʊd ˌæftərˈnuːn aɪ hæv ə ˌrezərˈveɪʃn ˈʌndər ðə neɪm ˈwɪlsn/"
      },
      {
        "who": "B",
        "en": "Welcome Mr. Wilson! Let me check the system. Yes, a double room for three nights.",
        "ipa": "/ˈwelkəm ˈmɪstər ˈwɪlsn let miː tʃek ðə ˈsɪstəm jes ə ˈdʌbl ruːm fɔːr θriː naɪts/",
        "vi": "Chào mừng ông Wilson! Để tôi kiểm tra hệ thống. Vâng, một phòng đôi trong ba đêm.",
        "zh": "Welcome Mr. Wilson! Let me check the system. Yes, a double room for three nights.",
        "py": "/ˈwelkəm ˈmɪstər ˈwɪlsn let miː tʃek ðə ˈsɪstəm jes ə ˈdʌbl ruːm fɔːr θriː naɪts/"
      },
      {
        "who": "A",
        "en": "That is correct. Does the room have ocean view?",
        "ipa": "/ðæt ɪz kəˈrekt dʌz ðə ruːm hæv ˈoʊʃn vjuː/",
        "vi": "Đúng rồi. Phòng có hướng nhìn ra biển không cô?",
        "zh": "That is correct. Does the room have ocean view?",
        "py": "/ðæt ɪz kəˈrekt dʌz ðə ruːm hæv ˈoʊʃn vjuː/"
      },
      {
        "who": "B",
        "en": "Yes, it is on the fourth floor with a lovely balcony.",
        "ipa": "/jes ɪt ɪz ɑːn ðə fɔːrθ flɔːr wɪð ə ˈlʌvli ˈbælkəni/",
        "vi": "Có ạ, phòng ở tầng bốn với ban công rất đẹp.",
        "zh": "Yes, it is on the fourth floor with a lovely balcony.",
        "py": "/jes ɪt ɪz ɑːn ðə fɔːrθ flɔːr wɪð ə ˈlʌvli ˈbælkəni/"
      },
      {
        "who": "A",
        "en": "What time is breakfast served in the morning?",
        "ipa": "/wɑːt taɪm ɪz ˈbrekfəst sɜːrvd ɪn ðə ˈmɔːrnɪŋ/",
        "vi": "Bữa sáng phục vụ lúc mấy giờ vào buổi sáng vậy?",
        "zh": "What time is breakfast served in the morning?",
        "py": "/wɑːt taɪm ɪz ˈbrekfəst sɜːrvd ɪn ðə ˈmɔːrnɪŋ/"
      },
      {
        "who": "B",
        "en": "Breakfast is from six thirty to nine thirty on the ground floor. Here is your room key!",
        "ipa": "/ˈbrekfəst ɪz frɑːm sɪks ˈθɜːrti tuː naɪn ˈθɜːrti ɑːn ðə ɡraʊnd flɔːr hɪr ɪz jɔːr ruːm kiː/",
        "vi": "Bữa sáng từ sáu rưỡi đến chín rưỡi ở tầng một ạ. Chìa khóa phòng của ông đây!",
        "zh": "Breakfast is from six thirty to nine thirty on the ground floor. Here is your room key!",
        "py": "/ˈbrekfəst ɪz frɑːm sɪks ˈθɜːrti tuː naɪn ˈθɜːrti ɑːn ðə ɡraʊnd flɔːr hɪr ɪz jɔːr ruːm kiː/"
      }
    ]
  },
  {
    "id": "d08",
    "title": "Tại sân bay & Thủ tục bay",
    "lines": [
      {
        "who": "A",
        "en": "Hello, I would like to check in for flight VN302.",
        "ipa": "/həˈloʊ aɪ wʊd laɪk tuː tʃek ɪn fɔːr flaɪt viː en θriː oʊ tuː/",
        "vi": "Xin chào, tôi muốn làm thủ tục cho chuyến bay VN302.",
        "zh": "Hello, I would like to check in for flight VN302.",
        "py": "/həˈloʊ aɪ wʊd laɪk tuː tʃek ɪn fɔːr flaɪt viː en θriː oʊ tuː/"
      },
      {
        "who": "B",
        "en": "May I see your passport and ticket, please?",
        "ipa": "/meɪ aɪ siː jɔːr ˈpæspɔːrt ænd ˈtɪkɪt pliːz/",
        "vi": "Tôi có thể xem hộ chiếu và vé máy bay của bạn được không?",
        "zh": "May I see your passport and ticket, please?",
        "py": "/meɪ aɪ siː jɔːr ˈpæspɔːrt ænd ˈtɪkɪt pliːz/"
      },
      {
        "who": "A",
        "en": "Here they are. Can I get a window seat?",
        "ipa": "/hɪr ðeɪ ɑːr kæn aɪ ɡet ə ˈwɪndoʊ siːt/",
        "vi": "Dạ đây ạ. Tôi có thể chọn chỗ ngồi cạnh cửa sổ không?",
        "zh": "Here they are. Can I get a window seat?",
        "py": "/hɪr ðeɪ ɑːr kæn aɪ ɡet ə ˈwɪndoʊ siːt/"
      },
      {
        "who": "B",
        "en": "Yes, seat 14A is available. Do you have any check-in bags?",
        "ipa": "/jes siːt ˈfɔːrtiːn eɪ ɪz əˈveɪləbl duː juː hæv ˈeni tʃek ɪn bæɡz/",
        "vi": "Dạ được, ghế 14A còn trống. Bạn có hành lý ký gửi nào không?",
        "zh": "Yes, seat 14A is available. Do you have any check-in bags?",
        "py": "/jes siːt ˈfɔːrtiːn eɪ ɪz əˈveɪləbl duː juː hæv ˈeni tʃek ɪn bæɡz/"
      },
      {
        "who": "A",
        "en": "Just this one suitcase, and one carry-on backpack.",
        "ipa": "/dʒʌst ðɪs wʌn ˈsuːtkeɪs ænd wʌn ˈkæri ɑːn ˈbækpæk/",
        "vi": "Chỉ có một chiếc va ly này, và một ba lô xách tay thôi.",
        "zh": "Just this one suitcase, and one carry-on backpack.",
        "py": "/dʒʌst ðɪs wʌn ˈsuːtkeɪs ænd wʌn ˈkæri ɑːn ˈbækpæk/"
      },
      {
        "who": "B",
        "en": "Please place your bag on the scale. Everything looks good. Here is your boarding pass!",
        "ipa": "/pliːz pleɪs jɔːr bæɡ ɑːn ðə skeɪl ˈevriθɪŋ lʊks ɡʊd hɪr ɪz jɔːr ˈbɔːrdɪŋ pæs/",
        "vi": "Mời bạn đặt hành lý lên cân. Mọi thứ đều ổn rồi. Thẻ lên máy bay của bạn đây!",
        "zh": "Please place your bag on the scale. Everything looks good. Here is your boarding pass!",
        "py": "/pliːz pleɪs jɔːr bæɡ ɑːn ðə skeɪl ˈevriθɪŋ lʊks ɡʊd hɪr ɪz jɔːr ˈbɔːrdɪŋ pæs/"
      }
    ]
  },
  {
    "id": "d09",
    "title": "Đi khám bệnh",
    "lines": [
      {
        "who": "A",
        "en": "Good morning doctor, I have not been feeling well.",
        "ipa": "/ɡʊd ˈmɔːrnɪŋ ˈdɑːktər aɪ hæv nɑːt biːn ˈfiːlɪŋ wel/",
        "vi": "Chào bác sĩ, mấy hôm nay tôi cảm thấy không được khỏe.",
        "zh": "Good morning doctor, I have not been feeling well.",
        "py": "/ɡʊd ˈmɔːrnɪŋ ˈdɑːktər aɪ hæv nɑːt biːn ˈfiːlɪŋ wel/"
      },
      {
        "who": "B",
        "en": "What symptoms do you have? When did it start?",
        "ipa": "/wɑːt ˈsɪmptəmz duː juː hæv wen dɪd ɪt stɑːrt/",
        "vi": "Bạn có những triệu chứng gì? Bắt đầu từ khi nào?",
        "zh": "What symptoms do you have? When did it start?",
        "py": "/wɑːt ˈsɪmptəmz duː juː hæv wen dɪd ɪt stɑːrt/"
      },
      {
        "who": "A",
        "en": "I have a sore throat, headache and a mild fever since yesterday.",
        "ipa": "/aɪ hæv ə sɔːr θroʊt ˈhedeɪk ænd ə maɪld ˈfiːvər sɪns ˈjestərdeɪ/",
        "vi": "Tôi bị đau họng, nhức đầu và sốt nhẹ từ hôm qua.",
        "zh": "I have a sore throat, headache and a mild fever since yesterday.",
        "py": "/aɪ hæv ə sɔːr θroʊt ˈhedeɪk ænd ə maɪld ˈfiːvər sɪns ˈjestərdeɪ/"
      },
      {
        "who": "B",
        "en": "Let me check your temperature and listen to your chest.",
        "ipa": "/let miː tʃek jɔːr ˈtemprətʃər ænd ˈlɪsn tuː jɔːr tʃest/",
        "vi": "Để tôi đo nhiệt độ và nghe phổi của bạn xem sao nhé.",
        "zh": "Let me check your temperature and listen to your chest.",
        "py": "/let miː tʃek jɔːr ˈtemprətʃər ænd ˈlɪsn tuː jɔːr tʃest/"
      },
      {
        "who": "A",
        "en": "Is it something serious, doctor?",
        "ipa": "/ɪz ɪt ˈsʌmθɪŋ ˈsɪriəs ˈdɑːktər/",
        "vi": "Có điều gì nghiêm trọng không bác sĩ?",
        "zh": "Is it something serious, doctor?",
        "py": "/ɪz ɪt ˈsʌmθɪŋ ˈsɪriəs ˈdɑːktər/"
      },
      {
        "who": "B",
        "en": "It is a common seasonal cold. Take this medicine after meals and drink plenty of warm water.",
        "ipa": "/ɪt ɪz ə ˈkɑːmən ˈsiːznl koʊld teɪk ðɪs ˈmedɪsn ˈæftər miːlz ænd drɪŋk ˈplenti əv wɔːrm ˈwɔːtər/",
        "vi": "Chỉ là cảm lạnh thông thường thôi. Bạn uống thuốc này sau bữa ăn và uống nhiều nước ấm nhé.",
        "zh": "It is a common seasonal cold. Take this medicine after meals and drink plenty of warm water.",
        "py": "/ɪt ɪz ə ˈkɑːmən ˈsiːznl koʊld teɪk ðɪs ˈmedɪsn ˈæftər miːlz ænd drɪŋk ˈplenti əv wɔːrm ˈwɔːtər/"
      }
    ]
  },
  {
    "id": "d10",
    "title": "Phỏng vấn xin việc ngắn",
    "lines": [
      {
        "who": "A",
        "en": "Welcome to our company interview! Please take a seat.",
        "ipa": "/ˈwelkəm tuː ˈaʊər ˈkʌmpəni ˈɪntərvjuː pliːz teɪk ə siːt/",
        "vi": "Chào mừng bạn đến buổi phỏng vấn của công ty! Mời bạn ngồi.",
        "zh": "Welcome to our company interview! Please take a seat.",
        "py": "/ˈwelkəm tuː ˈaʊər ˈkʌmpəni ˈɪntərvjuː pliːz teɪk ə siːt/"
      },
      {
        "who": "B",
        "en": "Thank you very much for inviting me today.",
        "ipa": "/θæŋk juː ˈveri mʌtʃ fɔːr ɪnˈvaɪtɪŋ miː təˈdeɪ/",
        "vi": "Cảm ơn quý công ty rất nhiều vì đã mời tôi hôm nay.",
        "zh": "Thank you very much for inviting me today.",
        "py": "/θæŋk juː ˈveri mʌtʃ fɔːr ɪnˈvaɪtɪŋ miː təˈdeɪ/"
      },
      {
        "who": "A",
        "en": "Can you tell me about your previous work experience?",
        "ipa": "/kæn juː tel miː əˈbaʊt jɔːr ˈpriːviəs wɜːrk ɪkˈspɪriəns/",
        "vi": "Bạn có thể chia sẻ về kinh nghiệm làm việc trước đây không?",
        "zh": "Can you tell me about your previous work experience?",
        "py": "/kæn juː tel miː əˈbaʊt jɔːr ˈpriːviəs wɜːrk ɪkˈspɪriəns/"
      },
      {
        "who": "B",
        "en": "I worked as a customer service staff for two years, assisting international clients.",
        "ipa": "/aɪ wɜːrkt æz ə ˈkʌstəmər ˈsɜːrvɪs stæf fɔːr tuː jɪrz əˈsɪstɪŋ ˌɪntərˈnæʃnəl ˈklaɪənts/",
        "vi": "Tôi từng làm nhân viên chăm sóc khách hàng hai năm, hỗ trợ khách hàng quốc tế.",
        "zh": "I worked as a customer service staff for two years, assisting international clients.",
        "py": "/aɪ wɜːrkt æz ə ˈkʌstəmər ˈsɜːrvɪs stæf fɔːr tuː jɪrz əˈsɪstɪŋ ˌɪntərˈnæʃnəl ˈklaɪənts/"
      },
      {
        "who": "A",
        "en": "What is your greatest strength in a team?",
        "ipa": "/wɑːt ɪz jɔːr ˈɡreɪtɪst streŋθ ɪn ə tiːm/",
        "vi": "Thế mạnh lớn nhất của bạn trong một đội nhóm là gì?",
        "zh": "What is your greatest strength in a team?",
        "py": "/wɑːt ɪz jɔːr ˈɡreɪtɪst streŋθ ɪn ə tiːm/"
      },
      {
        "who": "B",
        "en": "I am patient, communicate clearly and learn new systems very quickly.",
        "ipa": "/aɪ æm ˈpeɪʃnt kəˈmjuːnɪkeɪt ˈklɪrli ænd lɜːrn nuː ˈsɪstəmz ˈveri ˈkwɪkli/",
        "vi": "Tôi kiên nhẫn, giao tiếp rõ ràng và tiếp thu các hệ thống mới rất nhanh.",
        "zh": "I am patient, communicate clearly and learn new systems very quickly.",
        "py": "/aɪ æm ˈpeɪʃnt kəˈmjuːnɪkeɪt ˈklɪrli ænd lɜːrn nuː ˈsɪstəmz ˈveri ˈkwɪkli/"
      }
    ]
  }
];

  if (typeof window !== 'undefined') {
    window.EN_DIALOGUES = DIALOGUES;
    window.DIALOGUES_EN = DIALOGUES;
    if (!window.DIALOGUES) {
      window.DIALOGUES = DIALOGUES;
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DIALOGUES;
  }
})();
