/**
 * data/en/talk-scenarios.js
 * 8 kịch bản đàm thoại nhập vai Luyện nói (Talk Practice) tiếng Anh:
 *  1. Gọi món (Ordering Food)
 *  2. Hỏi đường (Asking Directions)
 *  3. Mua sắm (Shopping)
 *  4. Khách sạn (Hotel Check-in)
 *  5. Làm quen (Making Friends)
 *  6. Sân bay (Airport)
 *  7. Đi khám (Seeing a Doctor)
 *  8. Phỏng vấn ngắn (Short Job Interview)
 * Cùng cấu trúc turns t1.. như bản zh.
 */

(function () {
  'use strict';

  const TALK_SCENARIOS = [
  {
    "id": "ordering-food",
    "title": "Gọi món tại nhà hàng",
    "description": "Thực hành gọi món ăn, đồ uống và yêu cầu thanh toán tại quán ăn.",
    "topic": "Ẩm thực",
    "difficulty": "A1",
    "npc": {
      "name": "Oliver",
      "role": "Nhân viên phục vụ bàn",
      "avatarColor": "#EA580C",
      "initials": "OL",
      "avatarSvg": "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#FFEDD5\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#EA580C\"/></svg>"
    },
    "initialTurn": "t1",
    "turns": {
      "t1": {
        "id": "t1",
        "npc": {
          "en": "Good afternoon, welcome to Sunny Bistro! Are you ready to order?",
          "ipa": "/ɡʊd ˌæftərˈnuːn ˈwelkəm tuː ˈsʌni ˈbiːstroʊ ɑːr juː ˈredi tuː ˈɔːrdər/",
          "vi": "Chào buổi chiều, chào mừng quý khách đến với Sunny Bistro! Bạn đã sẵn sàng gọi món chưa?",
          "zh": "Good afternoon, welcome to Sunny Bistro! Are you ready to order?",
          "py": "/ɡʊd ˌæftərˈnuːn ˈwelkəm tuː ˈsʌni ˈbiːstroʊ ɑːr juː ˈredi tuː ˈɔːrdər/"
        },
        "user": {
          "goal": "Nói bạn đã sẵn sàng và muốn gọi một phần gà nướng hoặc phở bò",
          "answers": [
            {
              "en": "Yes, I would like the grilled chicken with rice please.",
              "ipa": "/jes aɪ wʊd laɪk ðə ɡrɪld ˈtʃɪkɪn wɪð raɪs pliːz/",
              "vi": "Vâng, cho tôi một phần gà nướng ăn kèm cơm nhé.",
              "zh": "Yes, I would like the grilled chicken with rice please.",
              "py": "/jes aɪ wʊd laɪk ðə ɡrɪld ˈtʃɪkɪn wɪð raɪs pliːz/"
            },
            {
              "en": "Yes, can I have a bowl of beef noodle soup?",
              "ipa": "/jes kæn aɪ hæv ə boʊl əv biːf ˈnuːdl suːp/",
              "vi": "Vâng, cho tôi một tô phở bò được không?",
              "zh": "Yes, can I have a bowl of beef noodle soup?",
              "py": "/jes kæn aɪ hæv ə boʊl əv biːf ˈnuːdl suːp/"
            }
          ],
          "accept": {
            "anyOf": [
              "yes",
              "like",
              "chicken",
              "rice",
              "noodle",
              "soup",
              "have"
            ],
            "pattern": {}
          },
          "next": "t2",
          "fallback": "Sorry, could you please repeat which dish you would like?"
        }
      },
      "t2": {
        "id": "t2",
        "npc": {
          "en": "Excellent choice! What would you like to drink with your meal?",
          "ipa": "/ˈeksələnt tʃɔɪs wɑːt wʊd juː laɪk tuː drɪŋk wɪð jɔːr miːl/",
          "vi": "Lựa chọn tuyệt vời! Bạn muốn dùng đồ uống gì cùng bữa ăn?",
          "zh": "Excellent choice! What would you like to drink with your meal?",
          "py": "/ˈeksələnt tʃɔɪs wɑːt wʊd juː laɪk tuː drɪŋk wɪð jɔːr miːl/"
        },
        "user": {
          "goal": "Gọi một ly nước chanh hoặc một ly nước lọc có đá",
          "answers": [
            {
              "en": "I will have a glass of iced lemon water, please.",
              "ipa": "/aɪ wɪl hæv ə ɡlæs əv aɪst ˈlemən ˈwɔːtər pliːz/",
              "vi": "Cho tôi một ly nước chanh đá nhé.",
              "zh": "I will have a glass of iced lemon water, please.",
              "py": "/aɪ wɪl hæv ə ɡlæs əv aɪst ˈlemən ˈwɔːtər pliːz/"
            },
            {
              "en": "Just cold drinking water for me, thank you.",
              "ipa": "/dʒʌst koʊld ˈdrɪŋkɪŋ ˈwɔːtər fɔːr miː θæŋk juː/",
              "vi": "Cho tôi nước lọc lạnh là được rồi, cảm ơn bạn.",
              "zh": "Just cold drinking water for me, thank you.",
              "py": "/dʒʌst koʊld ˈdrɪŋkɪŋ ˈwɔːtər fɔːr miː θæŋk juː/"
            }
          ],
          "accept": {
            "anyOf": [
              "water",
              "lemon",
              "tea",
              "coffee",
              "juice",
              "drink"
            ],
            "pattern": {}
          },
          "next": "t3",
          "fallback": "Pardon me, would you prefer water, tea, or fruit juice?"
        }
      },
      "t3": {
        "id": "t3",
        "npc": {
          "en": "Here is your delicious meal! Is there anything else I can get for you right now?",
          "ipa": "/hɪr ɪz jɔːr dɪˈlɪʃəs miːl ɪz ðer ˈeniθɪŋ els aɪ kæn ɡet fɔːr juː raɪt naʊ/",
          "vi": "Món ăn thơm ngon của bạn đây! Bạn có cần thêm gì nữa lúc này không?",
          "zh": "Here is your delicious meal! Is there anything else I can get for you right now?",
          "py": "/hɪr ɪz jɔːr dɪˈlɪʃəs miːl ɪz ðer ˈeniθɪŋ els aɪ kæn ɡet fɔːr juː raɪt naʊ/"
        },
        "user": {
          "goal": "Cảm ơn và nói mọi thứ đã đủ, xin hóa đơn tính tiền",
          "answers": [
            {
              "en": "Everything is great, thank you. Could I have the bill please?",
              "ipa": "/ˈevriθɪŋ ɪz ɡreɪt θæŋk juː kʊd aɪ hæv ðə bɪl pliːz/",
              "vi": "Mọi thứ rất tốt, cảm ơn bạn. Làm ơn cho tôi xin hóa đơn nhé.",
              "zh": "Everything is great, thank you. Could I have the bill please?",
              "py": "/ˈevriθɪŋ ɪz ɡreɪt θæŋk juː kʊd aɪ hæv ðə bɪl pliːz/"
            },
            {
              "en": "No thank you, that is all. Can we pay now?",
              "ipa": "/noʊ θæŋk juː ðæt ɪz ɔːl kæn wiː peɪ naʊ/",
              "vi": "Không cảm ơn, thế là đủ rồi. Chúng tôi thanh toán luôn được chứ?",
              "zh": "No thank you, that is all. Can we pay now?",
              "py": "/noʊ θæŋk juː ðæt ɪz ɔːl kæn wiː peɪ naʊ/"
            }
          ],
          "accept": {
            "anyOf": [
              "bill",
              "pay",
              "check",
              "all",
              "thank",
              "great"
            ],
            "pattern": {}
          },
          "next": null,
          "fallback": "Certainly! I will bring the bill right away. Enjoy your meal!"
        }
      }
    }
  },
  {
    "id": "asking-directions",
    "title": "Hỏi đường đi trong thành phố",
    "description": "Hỏi thăm người dân địa phương cách đi đến trạm tàu hỏa hoặc bảo tàng.",
    "topic": "Di chuyển",
    "difficulty": "A1",
    "npc": {
      "name": "Emma",
      "role": "Người dân địa phương",
      "avatarColor": "#059669",
      "initials": "EM",
      "avatarSvg": "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#D1FAE5\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#059669\"/></svg>"
    },
    "initialTurn": "t1",
    "turns": {
      "t1": {
        "id": "t1",
        "npc": {
          "en": "Hello! You look like you need some help. Are you looking for a place?",
          "ipa": "/həˈloʊ juː lʊk laɪk juː niːd sʌm help ɑːr juː ˈlʊkɪŋ fɔːr ə pleɪs/",
          "vi": "Xin chào! Trông bạn như đang cần giúp đỡ. Bạn đang tìm địa điểm nào à?",
          "zh": "Hello! You look like you need some help. Are you looking for a place?",
          "py": "/həˈloʊ juː lʊk laɪk juː niːd sʌm help ɑːr juː ˈlʊkɪŋ fɔːr ə pleɪs/"
        },
        "user": {
          "goal": "Lịch sự hỏi đường đi đến ga tàu hỏa hoặc bảo tàng",
          "answers": [
            {
              "en": "Excuse me, could you tell me where the train station is?",
              "ipa": "/ɪkˈskjuːz miː kʊd juː tel miː wer ðə treɪn ˈsteɪʃn ɪz/",
              "vi": "Xin lỗi, bạn có thể chỉ cho tôi ga xe lửa ở đâu được không?",
              "zh": "Excuse me, could you tell me where the train station is?",
              "py": "/ɪkˈskjuːz miː kʊd juː tel miː wer ðə treɪn ˈsteɪʃn ɪz/"
            },
            {
              "en": "Hi, I am looking for the city history museum.",
              "ipa": "/haɪ aɪ æm ˈlʊkɪŋ fɔːr ðə ˈsɪti ˈhɪstri mjuˈziːəm/",
              "vi": "Chào bạn, tôi đang tìm bảo tàng lịch sử thành phố.",
              "zh": "Hi, I am looking for the city history museum.",
              "py": "/haɪ aɪ æm ˈlʊkɪŋ fɔːr ðə ˈsɪti ˈhɪstri mjuˈziːəm/"
            }
          ],
          "accept": {
            "anyOf": [
              "station",
              "train",
              "museum",
              "where",
              "looking",
              "excuse"
            ],
            "pattern": {}
          },
          "next": "t2",
          "fallback": "Sorry, which landmark or street are you trying to find?"
        }
      },
      "t2": {
        "id": "t2",
        "npc": {
          "en": "Go straight ahead for two hundred meters, then turn right at the traffic lights. You cannot miss it.",
          "ipa": "/ɡoʊ streɪt əˈhed fɔːr tuː ˈhʌndrəd ˈmiːtərz ðen tɜːrn raɪt æt ðə ˈtræfɪk laɪts juː ˈkænɑːt mɪs ɪt/",
          "vi": "Đi thẳng về phía trước hai trăm mét, sau đó rẽ phải ở chỗ đèn giao thông. Bạn sẽ thấy ngay thôi.",
          "zh": "Go straight ahead for two hundred meters, then turn right at the traffic lights. You cannot miss it.",
          "py": "/ɡoʊ streɪt əˈhed fɔːr tuː ˈhʌndrəd ˈmiːtərz ðen tɜːrn raɪt æt ðə ˈtræfɪk laɪts juː ˈkænɑːt mɪs ɪt/"
        },
        "user": {
          "goal": "Hỏi xem đi bộ đến đó mất bao lâu hoặc có xa không",
          "answers": [
            {
              "en": "How long does it take to walk there?",
              "ipa": "/haʊ lɔːŋ dʌz ɪt teɪk tuː wɔːk ðer/",
              "vi": "Đi bộ tới đó mất khoảng bao lâu vậy bạn?",
              "zh": "How long does it take to walk there?",
              "py": "/haʊ lɔːŋ dʌz ɪt teɪk tuː wɔːk ðer/"
            },
            {
              "en": "Is it far from here on foot?",
              "ipa": "/ɪz ɪt fɑːr frɑːm hɪr ɑːn fʊt/",
              "vi": "Đi bộ từ đây tới đó có xa không?",
              "zh": "Is it far from here on foot?",
              "py": "/ɪz ɪt fɑːr frɑːm hɪr ɑːn fʊt/"
            }
          ],
          "accept": {
            "anyOf": [
              "how",
              "long",
              "walk",
              "far",
              "take",
              "minutes"
            ],
            "pattern": {}
          },
          "next": "t3",
          "fallback": "It is very close! Are you asking about the walking time?"
        }
      },
      "t3": {
        "id": "t3",
        "npc": {
          "en": "It takes just about five minutes to walk there. Very close!",
          "ipa": "/ɪt teɪks dʒʌst əˈbaʊt faɪv ˈmɪnɪts tuː wɔːk ðer ˈveri kloʊs/",
          "vi": "Chỉ mất khoảng năm phút đi bộ thôi. Rất gần!",
          "zh": "It takes just about five minutes to walk there. Very close!",
          "py": "/ɪt teɪks dʒʌst əˈbaʊt faɪv ˈmɪnɪts tuː wɔːk ðer ˈveri kloʊs/"
        },
        "user": {
          "goal": "Cảm ơn người giúp đỡ và chúc họ một ngày tốt lành",
          "answers": [
            {
              "en": "Thank you so much for your kind help! Have a great day!",
              "ipa": "/θæŋk juː soʊ mʌtʃ fɔːr jɔːr kaɪnd help hæv ə ɡreɪt deɪ/",
              "vi": "Cảm ơn bạn rất nhiều vì sự giúp đỡ tốt bụng! Chúc bạn một ngày tuyệt vời!",
              "zh": "Thank you so much for your kind help! Have a great day!",
              "py": "/θæŋk juː soʊ mʌtʃ fɔːr jɔːr kaɪnd help hæv ə ɡreɪt deɪ/"
            },
            {
              "en": "Many thanks! Take care and goodbye!",
              "ipa": "/ˈmeni θæŋks teɪk ker ænd ˌɡʊdˈbaɪ/",
              "vi": "Cảm ơn nhiều nhé! Bảo trọng và tạm biệt!",
              "zh": "Many thanks! Take care and goodbye!",
              "py": "/ˈmeni θæŋks teɪk ker ænd ˌɡʊdˈbaɪ/"
            }
          ],
          "accept": {
            "anyOf": [
              "thank",
              "thanks",
              "day",
              "goodbye",
              "help"
            ],
            "pattern": {}
          },
          "next": null,
          "fallback": "You are very welcome! Have a safe and pleasant journey!"
        }
      }
    }
  },
  {
    "id": "shopping",
    "title": "Mua sắm tại cửa hàng",
    "description": "Hỏi kích cỡ quần áo, thử đồ và thanh toán tại cửa hàng thời trang.",
    "topic": "Mua sắm",
    "difficulty": "A1",
    "npc": {
      "name": "Jessica",
      "role": "Nhân viên bán hàng",
      "avatarColor": "#7C3AED",
      "initials": "JE",
      "avatarSvg": "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#EDE9FE\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#7C3AED\"/></svg>"
    },
    "initialTurn": "t1",
    "turns": {
      "t1": {
        "id": "t1",
        "npc": {
          "en": "Hi there! Welcome to our store. Are you looking for anything in particular?",
          "ipa": "/haɪ ðer ˈwelkəm tuː ˈaʊər stɔːr ɑːr juː ˈlʊkɪŋ fɔːr ˈeniθɪŋ ɪn pərˈtɪkjələr/",
          "vi": "Xin chào! Chào mừng bạn đến cửa hàng. Bạn đang tìm món đồ cụ thể nào không?",
          "zh": "Hi there! Welcome to our store. Are you looking for anything in particular?",
          "py": "/haɪ ðer ˈwelkəm tuː ˈaʊər stɔːr ɑːr juː ˈlʊkɪŋ fɔːr ˈeniθɪŋ ɪn pərˈtɪkjələr/"
        },
        "user": {
          "goal": "Nói bạn muốn tìm một chiếc áo sơ mi hoặc áo khoác",
          "answers": [
            {
              "en": "Yes, I am looking for a white cotton shirt.",
              "ipa": "/jes aɪ æm ˈlʊkɪŋ fɔːr ə waɪt ˈkɑːtn ʃɜːrt/",
              "vi": "Vâng, tôi đang tìm một chiếc áo sơ mi trắng chất cotton.",
              "zh": "Yes, I am looking for a white cotton shirt.",
              "py": "/jes aɪ æm ˈlʊkɪŋ fɔːr ə waɪt ˈkɑːtn ʃɜːrt/"
            },
            {
              "en": "I would like to find a nice winter coat.",
              "ipa": "/aɪ wʊd laɪk tuː faɪnd ə naɪs ˈwɪntər koʊt/",
              "vi": "Tôi muốn tìm một chiếc áo khoác mùa đông đẹp.",
              "zh": "I would like to find a nice winter coat.",
              "py": "/aɪ wʊd laɪk tuː faɪnd ə naɪs ˈwɪntər koʊt/"
            }
          ],
          "accept": {
            "anyOf": [
              "shirt",
              "coat",
              "jacket",
              "looking",
              "like",
              "pants"
            ],
            "pattern": {}
          },
          "next": "t2",
          "fallback": "We have shirts, coats, and jackets. What would you like to see?"
        }
      },
      "t2": {
        "id": "t2",
        "npc": {
          "en": "We have this lovely shirt right here! What size do you need?",
          "ipa": "/wiː hæv ðɪs ˈlʌvli ʃɜːrt raɪt hɪr wɑːt saɪz duː juː niːd/",
          "vi": "Chúng tôi có chiếc áo rất đẹp này ngay đây! Bạn cần kích cỡ nào?",
          "zh": "We have this lovely shirt right here! What size do you need?",
          "py": "/wiː hæv ðɪs ˈlʌvli ʃɜːrt raɪt hɪr wɑːt saɪz duː juː niːd/"
        },
        "user": {
          "goal": "Nói cỡ của bạn (M hoặc L) và xin phép mặc thử",
          "answers": [
            {
              "en": "I wear medium. Can I try it on?",
              "ipa": "/aɪ wer ˈmiːdiəm kæn aɪ traɪ ɪt ɑːn/",
              "vi": "Tôi mặc cỡ M. Tôi có thể thử nó được không?",
              "zh": "I wear medium. Can I try it on?",
              "py": "/aɪ wer ˈmiːdiəm kæn aɪ traɪ ɪt ɑːn/"
            },
            {
              "en": "Size large please. Where is the fitting room?",
              "ipa": "/saɪz lɑːrdʒ pliːz wer ɪz ðə ˈfɪtɪŋ ruːm/",
              "vi": "Cỡ L nhé. Phòng thử đồ ở đâu vậy?",
              "zh": "Size large please. Where is the fitting room?",
              "py": "/saɪz lɑːrdʒ pliːz wer ɪz ðə ˈfɪtɪŋ ruːm/"
            }
          ],
          "accept": {
            "anyOf": [
              "size",
              "medium",
              "large",
              "small",
              "try",
              "fitting"
            ],
            "pattern": {}
          },
          "next": "t3",
          "fallback": "Do you take small, medium, or large? You can try it in our fitting room."
        }
      },
      "t3": {
        "id": "t3",
        "npc": {
          "en": "It fits you perfectly! It is currently on sale for thirty dollars.",
          "ipa": "/ɪt fɪts juː ˈpɜːrfɪktli ɪt ɪz ˈkɜːrəntli ɑːn seɪl fɔːr ˈθɜːrti ˈdɑːlərz/",
          "vi": "Nó rất vừa với bạn! Hiện đang được giảm giá còn ba mươi đô la.",
          "zh": "It fits you perfectly! It is currently on sale for thirty dollars.",
          "py": "/ɪt fɪts juː ˈpɜːrfɪktli ɪt ɪz ˈkɜːrəntli ɑːn seɪl fɔːr ˈθɜːrti ˈdɑːlərz/"
        },
        "user": {
          "goal": "Nói giá rất tốt, đồng ý mua và hỏi cách thanh toán bằng thẻ",
          "answers": [
            {
              "en": "That is a great price. I will take it. Can I pay with credit card?",
              "ipa": "/ðæt ɪz ə ɡreɪt praɪs aɪ wɪl teɪk ɪt kæn aɪ peɪ wɪð ˈkredɪt kɑːrd/",
              "vi": "Giá tốt quá. Tôi sẽ lấy nó. Tôi có thể thanh toán bằng thẻ tín dụng không?",
              "zh": "That is a great price. I will take it. Can I pay with credit card?",
              "py": "/ðæt ɪz ə ɡreɪt praɪs aɪ wɪl teɪk ɪt kæn aɪ peɪ wɪð ˈkredɪt kɑːrd/"
            },
            {
              "en": "I love it, I will buy it! Do you take cards?",
              "ipa": "/aɪ lʌv ɪt aɪ wɪl baɪ ɪt duː juː teɪk kɑːrdz/",
              "vi": "Tôi rất thích, tôi sẽ mua nó! Cửa hàng có nhận thẻ không?",
              "zh": "I love it, I will buy it! Do you take cards?",
              "py": "/aɪ lʌv ɪt aɪ wɪl baɪ ɪt duː juː teɪk kɑːrdz/"
            }
          ],
          "accept": {
            "anyOf": [
              "take",
              "buy",
              "pay",
              "card",
              "price"
            ],
            "pattern": {}
          },
          "next": null,
          "fallback": "Yes, we accept all cards! Thank you and have a wonderful day!"
        }
      }
    }
  },
  {
    "id": "hotel",
    "title": "Nhận phòng tại khách sạn",
    "description": "Thực hiện thủ tục nhận phòng, hỏi về giờ ăn sáng và mật khẩu Wi-Fi.",
    "topic": "Du lịch",
    "difficulty": "A1",
    "npc": {
      "name": "Daniel",
      "role": "Lễ tân khách sạn",
      "avatarColor": "#2563EB",
      "initials": "DA",
      "avatarSvg": "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#DBEAFE\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#2563EB\"/></svg>"
    },
    "initialTurn": "t1",
    "turns": {
      "t1": {
        "id": "t1",
        "npc": {
          "en": "Good afternoon, welcome to Grand Hotel! How can I assist you today?",
          "ipa": "/ɡʊd ˌæftərˈnuːn ˈwelkəm tuː ɡrænd hoʊˈtel haʊ kæn aɪ əˈsɪst juː təˈdeɪ/",
          "vi": "Chào buổi chiều, chào mừng quý khách đến khách sạn Grand! Tôi có thể hỗ trợ gì cho bạn hôm nay?",
          "zh": "Good afternoon, welcome to Grand Hotel! How can I assist you today?",
          "py": "/ɡʊd ˌæftərˈnuːn ˈwelkəm tuː ɡrænd hoʊˈtel haʊ kæn aɪ əˈsɪst juː təˈdeɪ/"
        },
        "user": {
          "goal": "Nói bạn muốn nhận phòng và đã đặt trước theo tên của bạn",
          "answers": [
            {
              "en": "Hello, I would like to check in. I have a reservation under Nam.",
              "ipa": "/həˈloʊ aɪ wʊd laɪk tuː tʃek ɪn aɪ hæv ə ˌrezərˈveɪʃn ˈʌndər Nam/",
              "vi": "Xin chào, tôi muốn nhận phòng. Tôi có đặt trước dưới tên Nam.",
              "zh": "Hello, I would like to check in. I have a reservation under Nam.",
              "py": "/həˈloʊ aɪ wʊd laɪk tuː tʃek ɪn aɪ hæv ə ˌrezərˈveɪʃn ˈʌndər Nam/"
            },
            {
              "en": "Hi, checking in please. The booking name is Nam.",
              "ipa": "/haɪ ˈtʃekɪŋ ɪn pliːz ðə ˈbʊkɪŋ neɪm ɪz Nam/",
              "vi": "Chào bạn, cho tôi nhận phòng. Tên đặt phòng là Nam.",
              "zh": "Hi, checking in please. The booking name is Nam.",
              "py": "/haɪ ˈtʃekɪŋ ɪn pliːz ðə ˈbʊkɪŋ neɪm ɪz Nam/"
            }
          ],
          "accept": {
            "anyOf": [
              "check",
              "reservation",
              "booking",
              "name"
            ],
            "pattern": {}
          },
          "next": "t2",
          "fallback": "May I have your booking name or reservation number, please?"
        }
      },
      "t2": {
        "id": "t2",
        "npc": {
          "en": "I found your booking Mr. Nam: a double room for three nights. May I see your passport please?",
          "ipa": "/aɪ faʊnd jɔːr ˈbʊkɪŋ ˈmɪstər Nam ə ˈdʌbl ruːm fɔːr θriː naɪts meɪ aɪ siː jɔːr ˈpæspɔːrt pliːz/",
          "vi": "Tôi đã thấy thông tin đặt phòng của ông Nam: một phòng đôi ba đêm. Tôi có thể xem hộ chiếu được không ạ?",
          "zh": "I found your booking Mr. Nam: a double room for three nights. May I see your passport please?",
          "py": "/aɪ faʊnd jɔːr ˈbʊkɪŋ ˈmɪstər Nam ə ˈdʌbl ruːm fɔːr θriː naɪts meɪ aɪ siː jɔːr ˈpæspɔːrt pliːz/"
        },
        "user": {
          "goal": "Đưa hộ chiếu và hỏi về giờ ăn sáng vào ngày mai",
          "answers": [
            {
              "en": "Here is my passport. What time is breakfast in the morning?",
              "ipa": "/hɪr ɪz maɪ ˈpæspɔːrt wɑːt taɪm ɪz ˈbrekfəst ɪn ðə ˈmɔːrnɪŋ/",
              "vi": "Hộ chiếu của tôi đây ạ. Sáng mai ăn sáng lúc mấy giờ vậy?",
              "zh": "Here is my passport. What time is breakfast in the morning?",
              "py": "/hɪr ɪz maɪ ˈpæspɔːrt wɑːt taɪm ɪz ˈbrekfəst ɪn ðə ˈmɔːrnɪŋ/"
            },
            {
              "en": "Here you are. Is breakfast included in the room?",
              "ipa": "/hɪr juː ɑːr ɪz ˈbrekfəst ɪnˈkluːdɪd ɪn ðə ruːm/",
              "vi": "Dạ đây ạ. Bữa sáng đã bao gồm trong giá phòng chưa?",
              "zh": "Here you are. Is breakfast included in the room?",
              "py": "/hɪr juː ɑːr ɪz ˈbrekfəst ɪnˈkluːdɪd ɪn ðə ruːm/"
            }
          ],
          "accept": {
            "anyOf": [
              "here",
              "passport",
              "breakfast",
              "time"
            ],
            "pattern": {}
          },
          "next": "t3",
          "fallback": "Thank you! Breakfast is served daily from 6:30 to 9:30 AM."
        }
      },
      "t3": {
        "id": "t3",
        "npc": {
          "en": "Breakfast is included from 6:30 to 9:30 AM. Here is your keycard for Room 405 on the fourth floor!",
          "ipa": "/ˈbrekfəst ɪz ɪnˈkluːdɪd frɑːm sɪks ˈθɜːrti tuː naɪn ˈθɜːrti hɪr ɪz jɔːr ˈkiːkɑːrd fɔːr ruːm fɔːr oʊ faɪv/",
          "vi": "Bữa sáng đã bao gồm từ 6:30 đến 9:30 sáng. Đây là thẻ phòng 405 ở tầng bốn của bạn!",
          "zh": "Breakfast is included from 6:30 to 9:30 AM. Here is your keycard for Room 405 on the fourth floor!",
          "py": "/ˈbrekfəst ɪz ɪnˈkluːdɪd frɑːm sɪks ˈθɜːrti tuː naɪn ˈθɜːrti hɪr ɪz jɔːr ˈkiːkɑːrd fɔːr ruːm fɔːr oʊ faɪv/"
        },
        "user": {
          "goal": "Cảm ơn và hỏi mật khẩu Wi-Fi",
          "answers": [
            {
              "en": "Thank you very much! What is the Wi-Fi password?",
              "ipa": "/θæŋk juː ˈveri mʌtʃ wɑːt ɪz ðə ˈwaɪ faɪ ˈpæswɜːrd/",
              "vi": "Cảm ơn bạn rất nhiều! Mật khẩu Wi-Fi là gì thế?",
              "zh": "Thank you very much! What is the Wi-Fi password?",
              "py": "/θæŋk juː ˈveri mʌtʃ wɑːt ɪz ðə ˈwaɪ faɪ ˈpæswɜːrd/"
            },
            {
              "en": "Thanks a lot! Could you give me the Wi-Fi code?",
              "ipa": "/θæŋks ə lɑːt kʊd juː ɡɪv miː ðə ˈwaɪ faɪ koʊd/",
              "vi": "Cảm ơn nhiều nhé! Cho tôi xin mã Wi-Fi được không?",
              "zh": "Thanks a lot! Could you give me the Wi-Fi code?",
              "py": "/θæŋks ə lɑːt kʊd juː ɡɪv miː ðə ˈwaɪ faɪ koʊd/"
            }
          ],
          "accept": {
            "anyOf": [
              "thank",
              "thanks",
              "wifi",
              "wi-fi",
              "password",
              "code"
            ],
            "pattern": {}
          },
          "next": null,
          "fallback": "The Wi-Fi password is on your keycard sleeve: grand2026. Have a wonderful stay!"
        }
      }
    }
  },
  {
    "id": "making-friends",
    "title": "Chào hỏi & Làm quen bạn mới",
    "description": "Trò chuyện với một người bạn mới gặp lần đầu tại câu lạc bộ tiếng Anh.",
    "topic": "Chào hỏi",
    "difficulty": "A1",
    "npc": {
      "name": "Sarah",
      "role": "Thành viên câu lạc bộ",
      "avatarColor": "#DB2777",
      "initials": "SA",
      "avatarSvg": "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#FCE7F3\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#DB2777\"/></svg>"
    },
    "initialTurn": "t1",
    "turns": {
      "t1": {
        "id": "t1",
        "npc": {
          "en": "Hi! Is anyone sitting here? May I join this table?",
          "ipa": "/haɪ ɪz ˈeniwʌn ˈsɪtɪŋ hɪr meɪ aɪ dʒɔɪn ðɪs ˈteɪbl/",
          "vi": "Chào bạn! Chỗ này đã có ai ngồi chưa? Tôi có thể ngồi cùng bàn được không?",
          "zh": "Hi! Is anyone sitting here? May I join this table?",
          "py": "/haɪ ɪz ˈeniwʌn ˈsɪtɪŋ hɪr meɪ aɪ dʒɔɪn ðɪs ˈteɪbl/"
        },
        "user": {
          "goal": "Mời bạn ấy ngồi và chào hỏi làm quen",
          "answers": [
            {
              "en": "Sure, please sit down! It is free. My name is Nam.",
              "ipa": "/ʃʊr pliːz sɪt daʊn ɪt ɪz friː maɪ neɪm ɪz Nam/",
              "vi": "Chắc chắn rồi, mời bạn ngồi! Chỗ này trống. Tên tôi là Nam.",
              "zh": "Sure, please sit down! It is free. My name is Nam.",
              "py": "/ʃʊr pliːz sɪt daʊn ɪt ɪz friː maɪ neɪm ɪz Nam/"
            },
            {
              "en": "Yes of course, please have a seat! I am Nam.",
              "ipa": "/jes əv kɔːrs pliːz hæv ə siːt aɪ æm Nam/",
              "vi": "Vâng dĩ nhiên rồi, mời bạn ngồi! Tôi là Nam.",
              "zh": "Yes of course, please have a seat! I am Nam.",
              "py": "/jes əv kɔːrs pliːz hæv ə siːt aɪ æm Nam/"
            }
          ],
          "accept": {
            "anyOf": [
              "sit",
              "please",
              "free",
              "sure",
              "name",
              "am"
            ],
            "pattern": {}
          },
          "next": "t2",
          "fallback": "Thank you! What is your name?"
        }
      },
      "t2": {
        "id": "t2",
        "npc": {
          "en": "Nice to meet you Nam, I am Sarah! Are you a student at this university?",
          "ipa": "/naɪs tuː miːt juː Nam aɪ æm ˈserə ɑːr juː ə ˈstuːdnt æt ðɪs ˌjuːnɪˈvɜːrsəti/",
          "vi": "Rất vui được gặp Nam, mình là Sarah! Bạn có phải là sinh viên trường này không?",
          "zh": "Nice to meet you Nam, I am Sarah! Are you a student at this university?",
          "py": "/naɪs tuː miːt juː Nam aɪ æm ˈserə ɑːr juː ə ˈstuːdnt æt ðɪs ˌjuːnɪˈvɜːrsəti/"
        },
        "user": {
          "goal": "Nói bạn là sinh viên năm nhất và hỏi Sarah học ngành gì",
          "answers": [
            {
              "en": "Yes, I am a first-year student. What do you study?",
              "ipa": "/jes aɪ æm ə fɜːrst jɪr ˈstuːdnt wɑːt duː juː ˈstʌdi/",
              "vi": "Đúng vậy, mình là sinh viên năm nhất. Bạn học ngành gì?",
              "zh": "Yes, I am a first-year student. What do you study?",
              "py": "/jes aɪ æm ə fɜːrst jɪr ˈstuːdnt wɑːt duː juː ˈstʌdi/"
            },
            {
              "en": "Yes, I study English here. How about you Sarah?",
              "ipa": "/jes aɪ ˈstʌdi ˈɪŋɡlɪʃ hɪr haʊ əˈbaʊt juː ˈserə/",
              "vi": "Đúng rồi, mình học tiếng Anh ở đây. Còn bạn thì sao Sarah?",
              "zh": "Yes, I study English here. How about you Sarah?",
              "py": "/jes aɪ ˈstʌdi ˈɪŋɡlɪʃ hɪr haʊ əˈbaʊt juː ˈserə/"
            }
          ],
          "accept": {
            "anyOf": [
              "yes",
              "student",
              "study",
              "you",
              "what"
            ],
            "pattern": {}
          },
          "next": "t3",
          "fallback": "That is wonderful! I study business administration here."
        }
      },
      "t3": {
        "id": "t3",
        "npc": {
          "en": "I study business here. Would you like to practice speaking English together often?",
          "ipa": "/aɪ ˈstʌdi ˈbɪznəs hɪr wʊd juː laɪk tuː ˈpræktɪs ˈspiːkɪŋ ˈɪŋɡlɪʃ təˈɡeðər ˈɔːfn/",
          "vi": "Mình học kinh doanh ở đây. Bạn có muốn chúng mình thường xuyên cùng nhau luyện nói tiếng Anh không?",
          "zh": "I study business here. Would you like to practice speaking English together often?",
          "py": "/aɪ ˈstʌdi ˈbɪznəs hɪr wʊd juː laɪk tuː ˈpræktɪs ˈspiːkɪŋ ˈɪŋɡlɪʃ təˈɡeðər ˈɔːfn/"
        },
        "user": {
          "goal": "Đồng ý hào hứng và đề nghị trao đổi số điện thoại",
          "answers": [
            {
              "en": "That sounds great! Can I have your phone number?",
              "ipa": "/ðæt saʊndz ɡreɪt kæn aɪ hæv jɔːr foʊn ˈnʌmbər/",
              "vi": "Nghe tuyệt quá! Cho mình xin số điện thoại của bạn được không?",
              "zh": "That sounds great! Can I have your phone number?",
              "py": "/ðæt saʊndz ɡreɪt kæn aɪ hæv jɔːr foʊn ˈnʌmbər/"
            },
            {
              "en": "I would love to! Let us exchange contact numbers.",
              "ipa": "/aɪ wʊd lʌv tuː let ʌs ɪksˈtʃeɪndʒ ˈkɑːntækt ˈnʌmbərz/",
              "vi": "Mình rất thích! Chúng mình hãy trao đổi số liên lạc nhé.",
              "zh": "I would love to! Let us exchange contact numbers.",
              "py": "/aɪ wʊd lʌv tuː let ʌs ɪksˈtʃeɪndʒ ˈkɑːntækt ˈnʌmbərz/"
            }
          ],
          "accept": {
            "anyOf": [
              "great",
              "love",
              "phone",
              "number",
              "contact",
              "yes"
            ],
            "pattern": {}
          },
          "next": null,
          "fallback": "Sure! My number is 0912-345-678. Let us talk again soon!"
        }
      }
    }
  },
  {
    "id": "airport",
    "title": "Thủ tục tại sân bay",
    "description": "Thực hiện thủ tục cân hành lý, chọn chỗ ngồi và nhận thẻ lên tàu bay.",
    "topic": "Du lịch",
    "difficulty": "A1",
    "npc": {
      "name": "Michael",
      "role": "Nhân viên quầy làm thủ tục bay",
      "avatarColor": "#0284C7",
      "initials": "MI",
      "avatarSvg": "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#E0F2FE\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#0284C7\"/></svg>"
    },
    "initialTurn": "t1",
    "turns": {
      "t1": {
        "id": "t1",
        "npc": {
          "en": "Good morning! Where are you flying to today?",
          "ipa": "/ɡʊd ˈmɔːrnɪŋ wer ɑːr juː ˈflaɪɪŋ tuː təˈdeɪ/",
          "vi": "Chào buổi sáng! Hôm nay bạn bay đi đâu thế?",
          "zh": "Good morning! Where are you flying to today?",
          "py": "/ɡʊd ˈmɔːrnɪŋ wer ɑːr juː ˈflaɪɪŋ tuː təˈdeɪ/"
        },
        "user": {
          "goal": "Nói bạn bay đến Đà Nẵng hoặc Hà Nội và xuất trình vé",
          "answers": [
            {
              "en": "Good morning! I am flying to Da Nang on flight VN120.",
              "ipa": "/ɡʊd ˈmɔːrnɪŋ aɪ æm ˈflaɪɪŋ tuː Da Nang ɑːn flaɪt viː en wʌn ˈtwenti/",
              "vi": "Chào buổi sáng! Tôi bay đi Đà Nẵng trên chuyến bay VN120.",
              "zh": "Good morning! I am flying to Da Nang on flight VN120.",
              "py": "/ɡʊd ˈmɔːrnɪŋ aɪ æm ˈflaɪɪŋ tuː Da Nang ɑːn flaɪt viː en wʌn ˈtwenti/"
            },
            {
              "en": "I am going to Hanoi today. Here is my booking ticket.",
              "ipa": "/aɪ æm ˈɡoʊɪŋ tuː Hanoi təˈdeɪ hɪr ɪz maɪ ˈbʊkɪŋ ˈtɪkɪt/",
              "vi": "Hôm nay tôi đi Hà Nội. Vé đặt chỗ của tôi đây ạ.",
              "zh": "I am going to Hanoi today. Here is my booking ticket.",
              "py": "/aɪ æm ˈɡoʊɪŋ tuː Hanoi təˈdeɪ hɪr ɪz maɪ ˈbʊkɪŋ ˈtɪkɪt/"
            }
          ],
          "accept": {
            "anyOf": [
              "flying",
              "flight",
              "ticket",
              "going",
              "da nang",
              "hanoi"
            ],
            "pattern": {}
          },
          "next": "t2",
          "fallback": "Please show your passport and ticket, thank you!"
        }
      },
      "t2": {
        "id": "t2",
        "npc": {
          "en": "May I see your passport? And how many pieces of luggage do you want to check in?",
          "ipa": "/meɪ aɪ siː jɔːr ˈpæspɔːrt ænd haʊ ˈmeni ˈpiːsɪz əv ˈlʌɡɪdʒ duː juː wɑːnt tuː tʃek ɪn/",
          "vi": "Tôi có thể xem hộ chiếu của bạn không? Và bạn muốn ký gửi bao nhiêu kiện hành lý?",
          "zh": "May I see your passport? And how many pieces of luggage do you want to check in?",
          "py": "/meɪ aɪ siː jɔːr ˈpæspɔːrt ænd haʊ ˈmeni ˈpiːsɪz əv ˈlʌɡɪdʒ duː juː wɑːnt tuː tʃek ɪn/"
        },
        "user": {
          "goal": "Đưa hộ chiếu và nói bạn có một kiện hành lý ký gửi",
          "answers": [
            {
              "en": "Here is my passport. I have just one suitcase to check in.",
              "ipa": "/hɪr ɪz maɪ ˈpæspɔːrt aɪ hæv dʒʌst wʌn ˈsuːtkeɪs tuː tʃek ɪn/",
              "vi": "Hộ chiếu của tôi đây. Tôi chỉ có một chiếc va ly ký gửi thôi.",
              "zh": "Here is my passport. I have just one suitcase to check in.",
              "py": "/hɪr ɪz maɪ ˈpæspɔːrt aɪ hæv dʒʌst wʌn ˈsuːtkeɪs tuː tʃek ɪn/"
            },
            {
              "en": "Here you go. Only one bag, and one small backpack.",
              "ipa": "/hɪr juː ɡoʊ ˈoʊnli wʌn bæɡ ænd wʌn smɔːl ˈbækpæk/",
              "vi": "Dạ đây ạ. Chỉ có một kiện, và một ba lô nhỏ xách tay.",
              "zh": "Here you go. Only one bag, and one small backpack.",
              "py": "/hɪr juː ɡoʊ ˈoʊnli wʌn bæɡ ænd wʌn smɔːl ˈbækpæk/"
            }
          ],
          "accept": {
            "anyOf": [
              "passport",
              "one",
              "suitcase",
              "bag",
              "luggage"
            ],
            "pattern": {}
          },
          "next": "t3",
          "fallback": "Please put your luggage on the scale right here."
        }
      },
      "t3": {
        "id": "t3",
        "npc": {
          "en": "Your bag weighs 15 kilograms, which is within the limit. Would you prefer a window or an aisle seat?",
          "ipa": "/jɔːr bæɡ weɪz ˈfɪftiːn ˈkɪləɡræmz wɪtʃ ɪz wɪˈðɪn ðə ˈlɪmɪt wʊd juː prɪˈfɜːr ə ˈwɪndoʊ ɔːr ən aɪl siːt/",
          "vi": "Hành lý nặng 15 cân, nằm trong mức cho phép. Bạn thích ghế cạnh cửa sổ hay ghế cạnh lối đi?",
          "zh": "Your bag weighs 15 kilograms, which is within the limit. Would you prefer a window or an aisle seat?",
          "py": "/jɔːr bæɡ weɪz ˈfɪftiːn ˈkɪləɡræmz wɪtʃ ɪz wɪˈðɪn ðə ˈlɪmɪt wʊd juː prɪˈfɜːr ə ˈwɪndoʊ ɔːr ən aɪl siːt/"
        },
        "user": {
          "goal": "Chọn ghế cạnh cửa sổ và cảm ơn",
          "answers": [
            {
              "en": "A window seat please, I love watching the clouds. Thank you!",
              "ipa": "/ə ˈwɪndoʊ siːt pliːz aɪ lʌv ˈwɑːtʃɪŋ ðə klaʊdz θæŋk juː/",
              "vi": "Cho tôi ghế cửa sổ nhé, tôi rất thích ngắm mây. Cảm ơn bạn!",
              "zh": "A window seat please, I love watching the clouds. Thank you!",
              "py": "/ə ˈwɪndoʊ siːt pliːz aɪ lʌv ˈwɑːtʃɪŋ ðə klaʊdz θæŋk juː/"
            },
            {
              "en": "I prefer a window seat please, thank you very much.",
              "ipa": "/aɪ prɪˈfɜːr ə ˈwɪndoʊ siːt pliːz θæŋk juː ˈveri mʌtʃ/",
              "vi": "Tôi thích ghế cạnh cửa sổ hơn, cảm ơn bạn rất nhiều.",
              "zh": "I prefer a window seat please, thank you very much.",
              "py": "/aɪ prɪˈfɜːr ə ˈwɪndoʊ siːt pliːz θæŋk juː ˈveri mʌtʃ/"
            }
          ],
          "accept": {
            "anyOf": [
              "window",
              "aisle",
              "seat",
              "thank"
            ],
            "pattern": {}
          },
          "next": null,
          "fallback": "Here is your boarding pass for seat 12A. Gate 4 begins boarding at 8:15. Have a great flight!"
        }
      }
    }
  },
  {
    "id": "doctor-visit",
    "title": "Đi khám bệnh tại phòng khám",
    "description": "Trình bày các triệu chứng sức khỏe, lắng nghe lời khuyên và đơn thuốc từ bác sĩ.",
    "topic": "Sức khỏe",
    "difficulty": "A1",
    "npc": {
      "name": "Dr. John",
      "role": "Bác sĩ đa khoa",
      "avatarColor": "#16A34A",
      "initials": "DR",
      "avatarSvg": "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#DCFCE7\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#16A34A\"/></svg>"
    },
    "initialTurn": "t1",
    "turns": {
      "t1": {
        "id": "t1",
        "npc": {
          "en": "Good morning! Please have a seat. What seems to be the problem today?",
          "ipa": "/ɡʊd ˈmɔːrnɪŋ pliːz hæv ə siːt wɑːt siːmz tuː biː ðə ˈprɑːbləm təˈdeɪ/",
          "vi": "Chào buổi sáng! Mời bạn ngồi. Hôm nay bạn thấy trong người có vấn đề gì thế?",
          "zh": "Good morning! Please have a seat. What seems to be the problem today?",
          "py": "/ɡʊd ˈmɔːrnɪŋ pliːz hæv ə siːt wɑːt siːmz tuː biː ðə ˈprɑːbləm təˈdeɪ/"
        },
        "user": {
          "goal": "Kể rằng bạn bị sốt, đau đầu và đau họng từ hôm qua",
          "answers": [
            {
              "en": "I have a fever, a headache and a sore throat since yesterday.",
              "ipa": "/aɪ hæv ə ˈfiːvər ə ˈhedeɪk ænd ə sɔːr θroʊt sɪns ˈjestərdeɪ/",
              "vi": "Tôi bị sốt, đau đầu và đau họng từ hôm qua.",
              "zh": "I have a fever, a headache and a sore throat since yesterday.",
              "py": "/aɪ hæv ə ˈfiːvər ə ˈhedeɪk ænd ə sɔːr θroʊt sɪns ˈjestərdeɪ/"
            },
            {
              "en": "Doctor, I feel very sick and tired with high fever.",
              "ipa": "/ˈdɑːktər aɪ fiːl ˈveri sɪk ænd ˈtaɪərd wɪð haɪ ˈfiːvər/",
              "vi": "Thưa bác sĩ, tôi thấy rất mệt và ốm kèm sốt cao.",
              "zh": "Doctor, I feel very sick and tired with high fever.",
              "py": "/ˈdɑːktər aɪ fiːl ˈveri sɪk ænd ˈtaɪərd wɪð haɪ ˈfiːvər/"
            }
          ],
          "accept": {
            "anyOf": [
              "fever",
              "headache",
              "throat",
              "sick",
              "tired",
              "cough"
            ],
            "pattern": {}
          },
          "next": "t2",
          "fallback": "I see. Do you also have a cough or stomach pain?"
        }
      },
      "t2": {
        "id": "t2",
        "npc": {
          "en": "Let me check your throat and temperature. Yes, your temperature is 38.5 degrees. Do you have any allergies to medicine?",
          "ipa": "/let miː tʃek jɔːr θroʊt ænd ˈtemprətʃər jes jɔːr ˈtemprətʃər ɪz ˈθɜːrti eɪt pɔɪnt faɪv dɪˈɡriːz duː juː hæv ˈeni ˈælərdʒiz/",
          "vi": "Để tôi kiểm tra họng và nhiệt độ. Đúng rồi, nhiệt độ của bạn là 38,5 độ. Bạn có bị dị ứng với loại thuốc nào không?",
          "zh": "Let me check your throat and temperature. Yes, your temperature is 38.5 degrees. Do you have any allergies to medicine?",
          "py": "/let miː tʃek jɔːr θroʊt ænd ˈtemprətʃər jes jɔːr ˈtemprətʃər ɪz ˈθɜːrti eɪt pɔɪnt faɪv dɪˈɡriːz duː juː hæv ˈeni ˈælərdʒiz/"
        },
        "user": {
          "goal": "Nói bạn không bị dị ứng và hỏi bạn nên làm gì",
          "answers": [
            {
              "en": "No, I have no allergies to medicine. What should I do, doctor?",
              "ipa": "/noʊ aɪ hæv noʊ ˈælərdʒiz tuː ˈmedɪsn wɑːt ʃʊd aɪ duː ˈdɑːktər/",
              "vi": "Không, tôi không dị ứng thuốc nào cả. Tôi nên làm gì thưa bác sĩ?",
              "zh": "No, I have no allergies to medicine. What should I do, doctor?",
              "py": "/noʊ aɪ hæv noʊ ˈælərdʒiz tuː ˈmedɪsn wɑːt ʃʊd aɪ duː ˈdɑːktər/"
            },
            {
              "en": "No allergies at all. Is it serious?",
              "ipa": "/noʊ ˈælərdʒiz æt ɔːl ɪz ɪt ˈsɪriəs/",
              "vi": "Hoàn toàn không có dị ứng. Bệnh có nghiêm trọng không ạ?",
              "zh": "No allergies at all. Is it serious?",
              "py": "/noʊ ˈælərdʒiz æt ɔːl ɪz ɪt ˈsɪriəs/"
            }
          ],
          "accept": {
            "anyOf": [
              "no",
              "allergies",
              "none",
              "serious",
              "what"
            ],
            "pattern": {}
          },
          "next": "t3",
          "fallback": "Good. It is just seasonal viral flu, do not worry."
        }
      },
      "t3": {
        "id": "t3",
        "npc": {
          "en": "It is a common viral flu. Take this medicine twice daily after meals, rest in bed, and drink warm water.",
          "ipa": "/ɪt ɪz ə ˈkɑːmən ˈvaɪrəl fluː teɪk ðɪs ˈmedɪsn twaɪs ˈdeɪli æftər miːlz rest ɪn bed ænd drɪŋk wɔːrm ˈwɔːtər/",
          "vi": "Chỉ là cảm cúm thông thường thôi. Bạn uống thuốc này ngày hai lần sau bữa ăn, nghỉ ngơi trên giường và uống nước ấm nhé.",
          "zh": "It is a common viral flu. Take this medicine twice daily after meals, rest in bed, and drink warm water.",
          "py": "/ɪt ɪz ə ˈkɑːmən ˈvaɪrəl fluː teɪk ðɪs ˈmedɪsn twaɪs ˈdeɪli æftər miːlz rest ɪn bed ænd drɪŋk wɔːrm ˈwɔːtər/"
        },
        "user": {
          "goal": "Cảm ơn bác sĩ và nói bạn sẽ uống thuốc đúng giờ",
          "answers": [
            {
              "en": "Thank you doctor! I will take the medicine and rest well.",
              "ipa": "/θæŋk juː ˈdɑːktər aɪ wɪl teɪk ðə ˈmedɪsn ænd rest wel/",
              "vi": "Cảm ơn bác sĩ! Tôi sẽ uống thuốc và nghỉ ngơi đầy đủ.",
              "zh": "Thank you doctor! I will take the medicine and rest well.",
              "py": "/θæŋk juː ˈdɑːktər aɪ wɪl teɪk ðə ˈmedɪsn ænd rest wel/"
            },
            {
              "en": "Thank you very much, doctor. Goodbye!",
              "ipa": "/θæŋk juː ˈveri mʌtʃ ˈdɑːktər ˌɡʊdˈbaɪ/",
              "vi": "Cảm ơn bác sĩ rất nhiều. Chào bác sĩ!",
              "zh": "Thank you very much, doctor. Goodbye!",
              "py": "/θæŋk juː ˈveri mʌtʃ ˈdɑːktər ˌɡʊdˈbaɪ/"
            }
          ],
          "accept": {
            "anyOf": [
              "thank",
              "thanks",
              "doctor",
              "medicine",
              "rest"
            ],
            "pattern": {}
          },
          "next": null,
          "fallback": "You are welcome! Get well soon and come back if fever persists."
        }
      }
    }
  },
  {
    "id": "job-interview",
    "title": "Phỏng vấn xin việc ngắn",
    "description": "Thực hành trả lời các câu hỏi phỏng vấn cơ bản về kinh nghiệm và điểm mạnh bản thân.",
    "topic": "Công việc",
    "difficulty": "A2",
    "npc": {
      "name": "Mr. Robert",
      "role": "Trưởng phòng tuyển dụng nhân sự",
      "avatarColor": "#4F46E5",
      "initials": "RO",
      "avatarSvg": "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#EEF2FF\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#4F46E5\"/></svg>"
    },
    "initialTurn": "t1",
    "turns": {
      "t1": {
        "id": "t1",
        "npc": {
          "en": "Good morning! Thank you for coming. Could you tell me a little bit about yourself?",
          "ipa": "/ɡʊd ˈmɔːrnɪŋ θæŋk juː fɔːr ˈkʌmɪŋ kʊd juː tel miː ə ˈlɪtl bɪt əˈbaʊt jɔːrˈself/",
          "vi": "Chào buổi sáng! Cảm ơn bạn đã đến. Bạn có thể chia sẻ một chút về bản thân mình không?",
          "zh": "Good morning! Thank you for coming. Could you tell me a little bit about yourself?",
          "py": "/ɡʊd ˈmɔːrnɪŋ θæŋk juː fɔːr ˈkʌmɪŋ kʊd juː tel miː ə ˈlɪtl bɪt əˈbaʊt jɔːrˈself/"
        },
        "user": {
          "goal": "Giới thiệu tên, chuyên ngành tốt nghiệp và niềm đam mê với công việc",
          "answers": [
            {
              "en": "My name is Nam. I graduated in computer science and I love building helpful software.",
              "ipa": "/maɪ neɪm ɪz Nam aɪ ˈɡrædʒueɪtɪd ɪn kəmˈpjuːtər ˈsaɪəns ænd aɪ lʌv ˈbɪldɪŋ ˈhelpfl ˈsɔːftwer/",
              "vi": "Tên tôi là Nam. Tôi tốt nghiệp ngành khoa học máy tính và rất đam mê phát triển các phần mềm hữu ích.",
              "zh": "My name is Nam. I graduated in computer science and I love building helpful software.",
              "py": "/maɪ neɪm ɪz Nam aɪ ˈɡrædʒueɪtɪd ɪn kəmˈpjuːtər ˈsaɪəns ænd aɪ lʌv ˈbɪldɪŋ ˈhelpfl ˈsɔːftwer/"
            },
            {
              "en": "I am Nam, a business graduate with two years of customer service experience.",
              "ipa": "/aɪ æm Nam ə ˈbɪznəs ˈɡrædʒuət wɪð tuː jɪrz əv ˈkʌstəmər ˈsɜːrvɪs ɪkˈspɪriəns/",
              "vi": "Tôi là Nam, cử nhân kinh doanh với hai năm kinh nghiệm chăm sóc khách hàng.",
              "zh": "I am Nam, a business graduate with two years of customer service experience.",
              "py": "/aɪ æm Nam ə ˈbɪznəs ˈɡrædʒuət wɪð tuː jɪrz əv ˈkʌstəmər ˈsɜːrvɪs ɪkˈspɪriəns/"
            }
          ],
          "accept": {
            "anyOf": [
              "my name",
              "i am",
              "graduated",
              "experience",
              "science",
              "business"
            ],
            "pattern": {}
          },
          "next": "t2",
          "fallback": "Could you tell me your educational background or past work experience?"
        }
      },
      "t2": {
        "id": "t2",
        "npc": {
          "en": "Impressive! What would you say is your greatest professional strength?",
          "ipa": "/ɪmˈpresɪv wɑːt wʊd juː seɪ ɪz jɔːr ˈɡreɪtɪst prəˈfeʃənl streŋθ/",
          "vi": "Thật ấn tượng! Bạn tự đánh giá thế mạnh chuyên môn lớn nhất của mình là gì?",
          "zh": "Impressive! What would you say is your greatest professional strength?",
          "py": "/ɪmˈpresɪv wɑːt wʊd juː seɪ ɪz jɔːr ˈɡreɪtɪst prəˈfeʃənl streŋθ/"
        },
        "user": {
          "goal": "Nói thế mạnh là học nhanh, giao tiếp rõ ràng và làm việc nhóm tốt",
          "answers": [
            {
              "en": "My greatest strength is that I learn new tools quickly and work well in teams.",
              "ipa": "/maɪ ˈɡreɪtɪst streŋθ ɪz ðæt aɪ lɜːrn nuː tuːlz ˈkwɪkli ænd wɜːrk wel ɪn tiːmz/",
              "vi": "Thế mạnh lớn nhất của tôi là tiếp thu công cụ mới nhanh và làm việc nhóm rất tốt.",
              "zh": "My greatest strength is that I learn new tools quickly and work well in teams.",
              "py": "/maɪ ˈɡreɪtɪst streŋθ ɪz ðæt aɪ lɜːrn nuː tuːlz ˈkwɪkli ænd wɜːrk wel ɪn tiːmz/"
            },
            {
              "en": "I communicate clearly, stay patient, and solve problems with focus.",
              "ipa": "/aɪ kəˈmjuːnɪkeɪt ˈklɪrli steɪ ˈpeɪʃnt ænd sɑːlv ˈprɑːbləmz wɪð ˈfoʊkəs/",
              "vi": "Tôi giao tiếp rõ ràng, luôn kiên nhẫn và giải quyết vấn đề với sự tập trung cao.",
              "zh": "I communicate clearly, stay patient, and solve problems with focus.",
              "py": "/aɪ kəˈmjuːnɪkeɪt ˈklɪrli steɪ ˈpeɪʃnt ænd sɑːlv ˈprɑːbləmz wɪð ˈfoʊkəs/"
            }
          ],
          "accept": {
            "anyOf": [
              "strength",
              "learn",
              "team",
              "communicate",
              "work",
              "quickly"
            ],
            "pattern": {}
          },
          "next": "t3",
          "fallback": "Are you good at teamwork, communication, or fast learning?"
        }
      },
      "t3": {
        "id": "t3",
        "npc": {
          "en": "Teamwork and fast learning are exactly what we look for. Do you have any questions for us?",
          "ipa": "/ˈtiːmwɜːrk ænd fæst ˈlɜːrnɪŋ ɑːr ɪɡˈzæktli wɑːt wiː lʊk fɔːr duː juː hæv ˈeni ˈkwestʃənz fɔːr ʌs/",
          "vi": "Tinh thần làm việc nhóm và học hỏi nhanh chính là điều công ty tìm kiếm. Bạn có câu hỏi nào cho chúng tôi không?",
          "zh": "Teamwork and fast learning are exactly what we look for. Do you have any questions for us?",
          "py": "/ˈtiːmwɜːrk ænd fæst ˈlɜːrnɪŋ ɑːr ɪɡˈzæktli wɑːt wiː lʊk fɔːr duː juː hæv ˈeni ˈkwestʃənz fɔːr ʌs/"
        },
        "user": {
          "goal": "Hỏi về cơ hội học tập phát triển và cảm ơn vì buổi phỏng vấn",
          "answers": [
            {
              "en": "What training opportunities does the company provide? Thank you for your time!",
              "ipa": "/wɑːt ˈtreɪnɪŋ ˌɑːpərˈtuːnətiz dʌz ðə ˈkʌmpəni prəˈvaɪd θæŋk juː fɔːr jɔːr taɪm/",
              "vi": "Công ty có những cơ hội đào tạo nào dành cho nhân viên ạ? Cảm ơn vì thời gian quý báu của anh!",
              "zh": "What training opportunities does the company provide? Thank you for your time!",
              "py": "/wɑːt ˈtreɪnɪŋ ˌɑːpərˈtuːnətiz dʌz ðə ˈkʌmpəni prəˈvaɪd θæŋk juː fɔːr jɔːr taɪm/"
            },
            {
              "en": "When can I hear about the interview results? Thank you very much!",
              "ipa": "/wen kæn aɪ hɪr əˈbaʊt ðə ˈɪntərvjuː rɪˈzʌlts θæŋk juː ˈveri mʌtʃ/",
              "vi": "Khi nào tôi có thể nhận được kết quả phỏng vấn ạ? Tôi xin cảm ơn rất nhiều!",
              "zh": "When can I hear about the interview results? Thank you very much!",
              "py": "/wen kæn aɪ hɪr əˈbaʊt ðə ˈɪntərvjuː rɪˈzʌlts θæŋk juː ˈveri mʌtʃ/"
            }
          ],
          "accept": {
            "anyOf": [
              "training",
              "results",
              "when",
              "thank",
              "company",
              "opportunities"
            ],
            "pattern": {}
          },
          "next": null,
          "fallback": "We provide monthly training and will email our results by Friday. Have a great day!"
        }
      }
    }
  }
];

  if (typeof window !== 'undefined') {
    window.EN_TALK_SCENARIOS = TALK_SCENARIOS;
    window.TALK_SCENARIOS_EN = TALK_SCENARIOS;
    if (!window.TALK_SCENARIOS) {
      window.TALK_SCENARIOS = TALK_SCENARIOS;
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TALK_SCENARIOS };
  }
})();
