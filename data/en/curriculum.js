/**
 * data/en/curriculum.js
 * Lộ trình học tiếng Anh bài bản chuẩn CEFR (Starter Pre-A1 & Elementary A1).
 * Cấu trúc tương thích hoàn toàn với nền tảng Polylingo:
 *  - Cấp 'starter' (A0) và 'a1' mở khóa, cấp 'a2' khóa.
 *  - 30 bài học (mỗi bài có mục tiêu, từ mới trỏ vào EN_WORDS, trọng tâm ngữ pháp, bài khóa ngắn).
 *  - Kiểm tra chặng (Checkpoint) định kỳ sau mỗi 5 bài.
 */

(function () {
  'use strict';

  const CURRICULUM = {
  "standard": "Theo khung CEFR",
  "levels": [
    {
      "id": "starter",
      "name": "Cấp 0: Starter (A0 / Pre-A1)",
      "band": "Khởi đầu",
      "cefr": "Pre-A1",
      "targets": {
        "hours": 25,
        "words": 80,
        "grammar": 5
      },
      "mockTest": {
        "title": "Đánh giá năng lực Khởi đầu (Starter Pre-A1)",
        "totalQuestions": 25,
        "timeMinutes": 20,
        "passPercent": 80
      },
      "units": [
        {
          "id": "starter-u1",
          "title": "Khởi động Chào hỏi & Làm quen căn bản",
          "theme": "Giao tiếp vỡ lòng",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "starter-u1-l1",
              "title": "Chào hỏi & Giới thiệu tên",
              "goal": "Biết cách chào hỏi lịch sự và giới thiệu tên bằng động từ to be.",
              "newWords": [
                "hello",
                "hi",
                "name",
                "meet",
                "nice",
                "friend",
                "I",
                "you"
              ],
              "grammar": [
                "EG-001"
              ],
              "focus": "Âm đôi /eɪ/ trong name, xì âm cuối /s/ trong nice, nối âm: Nice to meet you.",
              "text": "— Hello, my name is Nam. What is your name?\n— Hi Nam, I am Anna. Nice to meet you!\n— Nice to meet you too.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "starter-u1-l2",
              "title": "Chào theo buổi & Hỏi thăm sức khỏe",
              "goal": "Chào theo các buổi trong ngày và hỏi thăm sức khỏe cơ bản.",
              "newWords": [
                "good",
                "morning",
                "afternoon",
                "evening",
                "fine",
                "thank",
                "thanks",
                "please"
              ],
              "grammar": [
                "EG-001",
                "EG-002"
              ],
              "focus": "Thổi hơi âm /θ/ trong thank/thanks, âm /z/ rung cuối trong please.",
              "text": "— Good morning, how are you today?\n— I am fine, thank you. And you?\n— I am very good, thanks!",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "starter-u1-l3",
              "title": "Số đếm từ 1 đến 5 & Hỏi tuổi",
              "goal": "Làm chủ số đếm 1-5 và cấu trúc hỏi tuổi \"How old are you?\".",
              "newWords": [
                "one",
                "two",
                "three",
                "four",
                "five",
                "age",
                "old",
                "number"
              ],
              "grammar": [
                "EG-001"
              ],
              "focus": "Thè lưỡi thổi hơi /θ/ ở số three, bật âm rung /v/ cuối ở five.",
              "text": "— How old is your son?\n— He is four years old.\n— He has three cute toy cars!",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "starter-u1-l4",
              "title": "Đồ dùng học tập & Cấu trúc This / That",
              "goal": "Chỉ và gọi tên các đồ vật xung quanh bằng \"This is\" và \"That is\".",
              "newWords": [
                "book",
                "pen",
                "pencil",
                "desk",
                "this",
                "that",
                "room"
              ],
              "grammar": [
                "EG-003",
                "EG-005"
              ],
              "focus": "Rung lưỡi âm /ð/ trong this/that, phân biệt âm /ʊ/ ngắn trong book.",
              "text": "— What is this on the desk?\n— This is an English book, and that is a pen.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "starter-u1-l5",
              "title": "Lời cảm ơn, Xin lỗi & Phép lịch sự",
              "goal": "Nói lời xin lỗi, cảm ơn và đáp lễ tự nhiên trong giao tiếp.",
              "newWords": [
                "sorry",
                "excuse",
                "welcome",
                "ok",
                "yes",
                "no",
                "great"
              ],
              "grammar": [
                "EG-001"
              ],
              "focus": "Âm cuối /z/ trong excuse, trọng âm âm đầu của welcome /ˈwelkəm/.",
              "text": "— Excuse me, is this seat free?\n— Yes, it is. Please sit down.\n— Thank you very much!\n— You are welcome.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            }
          ]
        },
        {
          "id": "starter-u2",
          "title": "Gia đình & Đồ vật quanh ta",
          "theme": "Con người & Môi trường sống",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "starter-u2-l6",
              "title": "Thành viên trong Gia đình",
              "goal": "Giới thiệu các thành viên trong gia đình bằng tính từ sở hữu.",
              "newWords": [
                "father",
                "mother",
                "brother",
                "sister",
                "family",
                "dad",
                "mom"
              ],
              "grammar": [
                "EG-002"
              ],
              "focus": "Âm /ð/ rung giữa từ trong father, mother, brother; xì âm /s/ giữa từ trong sister.",
              "text": "— This is a photo of my family.\n— Who is this tall man?\n— This is my father, and here is my mother and sister.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "starter-u2-l7",
              "title": "Số đếm 6-20 & Danh từ số nhiều",
              "goal": "Đếm đồ vật từ 6 đến 20 và quy tắc thêm đuôi -s/-es.",
              "newWords": [
                "six",
                "seven",
                "eight",
                "nine",
                "ten",
                "eleven",
                "twelve",
                "twenty"
              ],
              "grammar": [
                "EG-004"
              ],
              "focus": "Cụm /ks/ trong six, âm câm \"gh\" trong eight, quy tắc đọc đuôi -s.",
              "text": "— How many students are there in class?\n— There are twenty students today: twelve boys and eight girls.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "starter-u2-l8",
              "title": "Mô tả Con người",
              "goal": "Mô tả độ tuổi và vai vế của mọi người xung quanh.",
              "newWords": [
                "man",
                "woman",
                "boy",
                "girl",
                "child",
                "baby",
                "person"
              ],
              "grammar": [
                "EG-001",
                "EG-003"
              ],
              "focus": "Âm /æ/ trong man, âm uốn lưỡi /ɜːrl/ trong girl, bất quy tắc child/children.",
              "text": "— That woman is holding a cute baby.\n— Yes, she is a kind person in our neighborhood.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "starter-u2-l9",
              "title": "Món ăn & Đồ uống hàng ngày",
              "goal": "Gọi tên các món ăn cơ bản và diễn đạt món mình thích.",
              "newWords": [
                "food",
                "water",
                "tea",
                "bread",
                "milk",
                "rice",
                "delicious"
              ],
              "grammar": [
                "EG-001"
              ],
              "focus": "Âm /uː/ dài trong food, flap-T trong water, xì âm /s/ cuối trong rice.",
              "text": "— Do you want some bread and milk for breakfast?\n— Yes, please. And a cup of hot tea too.\n— The bread is very fresh and delicious!",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "starter-u2-l10",
              "title": "Đại từ nhân xưng & Trường lớp",
              "goal": "Làm chủ các đại từ nhân xưng he, she, it, we, they với to be.",
              "newWords": [
                "he",
                "she",
                "it",
                "we",
                "they",
                "student",
                "teacher"
              ],
              "grammar": [
                "EG-001"
              ],
              "focus": "Phân biệt he /hiː/ và she /ʃiː/ (chu tròn môi).",
              "text": "— Is he a new student?\n— Yes, he is. We are in the same class.\n— Our teacher is very patient and kind.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "a1",
      "name": "Cấp 1: Elementary (A1)",
      "band": "Sơ cấp",
      "cefr": "A1",
      "targets": {
        "hours": 50,
        "words": 160,
        "grammar": 10
      },
      "mockTest": {
        "title": "Đánh giá năng lực Sơ cấp (Elementary A1)",
        "totalQuestions": 30,
        "timeMinutes": 25,
        "passPercent": 80
      },
      "units": [
        {
          "id": "a1-u3",
          "title": "Sinh hoạt hàng ngày & Thì Hiện tại đơn",
          "theme": "Nhịp sống & Lịch trình",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "a1-u3-l11",
              "title": "Các hoạt động trong ngày",
              "goal": "Kể về các hoạt động diễn ra từ sáng đến tối bằng thì hiện tại đơn.",
              "newWords": [
                "day",
                "today",
                "wake",
                "eat",
                "drink",
                "walk",
                "night",
                "now"
              ],
              "grammar": [
                "EG-006"
              ],
              "focus": "Cụm wake up, chữ l câm trong walk /wɔːk/, bật âm cuối /t/ trong night.",
              "text": "— What time do you wake up every day?\n— I wake up at six and walk in the park.\n— Then I eat breakfast and drink tea.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u3-l12",
              "title": "Động từ thông dụng hàng ngày",
              "goal": "Sử dụng các động từ go, come, have, do, see trong câu khẳng định.",
              "newWords": [
                "have",
                "do",
                "go",
                "come",
                "see",
                "watch",
                "sleep"
              ],
              "grammar": [
                "EG-006"
              ],
              "focus": "Âm cuối /v/ trong have, âm cuối /tʃ/ trong watch, phân biệt see vs watch.",
              "text": "— We go to school by bus every day.\n— In the evening, we watch television and sleep early.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u3-l13",
              "title": "Hỏi & Nói giờ giấc",
              "goal": "Hỏi \"What time is it?\" và trả lời thời gian chính xác.",
              "newWords": [
                "time",
                "hour",
                "minute",
                "early",
                "late",
                "then",
                "o'clock",
                "start"
              ],
              "grammar": [
                "EG-011"
              ],
              "focus": "Chữ h câm trong hour, phát âm o'clock /əˈklɑːk/, trọng âm early /ˈɜːrli/.",
              "text": "— What time is it right now?\n— It is eight o'clock sharp.\n— Hurry up, the lesson starts in ten minutes!",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u3-l14",
              "title": "Các ngày trong tuần & Cuối tuần",
              "goal": "Nói về lịch trình theo các ngày trong tuần (on Monday, at weekend).",
              "newWords": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
                "weekend"
              ],
              "grammar": [
                "EG-006"
              ],
              "focus": "Chữ d câm trong Wednesday /ˈwenzdeɪ/, âm /θ/ trong Thursday.",
              "text": "— Do you work on Saturday?\n— No, I only work from Monday to Friday.\n— The weekend is time for family and friends.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u3-l15",
              "title": "Trường học, Công việc & Câu phủ định",
              "goal": "Diễn đạt những việc mình làm và không làm (don't / doesn't).",
              "newWords": [
                "work",
                "study",
                "learn",
                "school",
                "class",
                "homework",
                "office"
              ],
              "grammar": [
                "EG-006",
                "EG-007"
              ],
              "focus": "Trợ động từ don't / doesn't, phát âm /ɜːrk/ trong work.",
              "text": "— Do you study in the evening?\n— Yes, I finish my homework after dinner.\n— My father works at an office in town.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            }
          ]
        },
        {
          "id": "a1-u4",
          "title": "Nhà cửa & Định hướng không gian",
          "theme": "Nơi chốn & Chỉ đường",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "a1-u4-l16",
              "title": "Căn nhà & Cấu trúc There is / There are",
              "goal": "Miêu tả các phòng trong nhà bằng cấu trúc \"There is\" và \"There are\".",
              "newWords": [
                "house",
                "home",
                "table",
                "chair",
                "bed",
                "window",
                "door",
                "kitchen"
              ],
              "grammar": [
                "EG-008"
              ],
              "focus": "Phân biệt There is (số ít) vs There are (số nhiều), âm cuối /s/ trong house.",
              "text": "— There are four rooms in our house.\n— The kitchen has a big wooden table and four chairs.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u4-l17",
              "title": "Đồ dùng trong nhà & Giới từ nơi chốn",
              "goal": "Chỉ vị trí của đồ vật bằng các giới từ in, on, under, next to.",
              "newWords": [
                "sofa",
                "lamp",
                "clock",
                "phone",
                "computer",
                "bathroom",
                "bedroom"
              ],
              "grammar": [
                "EG-009"
              ],
              "focus": "Âm /θ/ trong bathroom, trọng âm computer /kəmˈpjuːtər/.",
              "text": "— Where is my phone?\n— It is on the desk, next to your computer lamp.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u4-l18",
              "title": "Các địa điểm trong Thành phố",
              "goal": "Hỏi vị trí của ngân hàng, bệnh viện, khách sạn, công viên.",
              "newWords": [
                "city",
                "town",
                "street",
                "park",
                "bank",
                "hospital",
                "hotel"
              ],
              "grammar": [
                "EG-008",
                "EG-011"
              ],
              "focus": "Trọng âm hotel /hoʊˈtel/ ở âm hai, âm /æŋk/ trong bank.",
              "text": "— Excuse me, is there a bank near here?\n— Yes, there is a big bank across from the city park.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u4-l19",
              "title": "Hỏi & Chỉ đường đi",
              "goal": "Sử dụng các từ rẽ trái, rẽ phải, đi thẳng để chỉ đường.",
              "newWords": [
                "turn",
                "left",
                "right",
                "straight",
                "near",
                "far",
                "road",
                "place"
              ],
              "grammar": [
                "EG-011"
              ],
              "focus": "Cụm phụ âm /str/ trong straight, âm cuối /ft/ trong left.",
              "text": "— How do I get to the museum from here?\n— Go straight along this road, then turn left at the lights.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u4-l20",
              "title": "Phương tiện Giao thông & Di chuyển",
              "goal": "Nói về các phương tiện đi lại (by bus, by car, by train).",
              "newWords": [
                "car",
                "bus",
                "train",
                "plane",
                "taxi",
                "ticket",
                "trip",
                "travel"
              ],
              "grammar": [
                "EG-006"
              ],
              "focus": "Cụm /tr/ trong train/trip, âm đôi /eɪ/ trong plane.",
              "text": "— How do you travel to Da Nang?\n— We travel by plane, it takes only one hour!\n— Don't forget to book your tickets early.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            }
          ]
        },
        {
          "id": "a1-u5",
          "title": "Khả năng, Ẩm thực & Mua sắm",
          "theme": "Kỹ năng & Mua bán",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "a1-u5-l21",
              "title": "Nói về Khả năng với Modal \"Can\"",
              "goal": "Diễn tả những việc mình có thể và không thể làm bằng \"can / cannot\".",
              "newWords": [
                "play",
                "speak",
                "read",
                "write",
                "sing",
                "dance",
                "run",
                "help"
              ],
              "grammar": [
                "EG-010"
              ],
              "focus": "Phát âm can /kæn/ và can't /kænt/, động từ sau can luôn nguyên mẫu.",
              "text": "— Can you speak English?\n— Yes, I can speak a little, and I can read short stories.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u5-l22",
              "title": "Tại Quán ăn & Gọi món",
              "goal": "Biết cách gọi món ăn, đồ uống lịch sự tại quán ăn.",
              "newWords": [
                "restaurant",
                "cafe",
                "breakfast",
                "lunch",
                "dinner",
                "noodle",
                "soup",
                "coffee"
              ],
              "grammar": [
                "EG-001",
                "EG-006"
              ],
              "focus": "Trọng âm restaurant /ˈrestrɑːnt/, âm /tʃ/ trong lunch.",
              "text": "— Welcome to our cafe! What would you like?\n— I would like a bowl of chicken noodle soup and an iced coffee.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u5-l23",
              "title": "Trái cây & Cảm nhận Vị giác",
              "goal": "Gọi tên trái cây và các tính từ mô tả mùi vị (ngọt, chua, đói, nóng).",
              "newWords": [
                "fruit",
                "apple",
                "banana",
                "orange",
                "sweet",
                "hungry",
                "hot"
              ],
              "grammar": [
                "EG-001",
                "EG-003"
              ],
              "focus": "Dùng an apple, an orange; âm /ui/ trong fruit đọc là /uː/.",
              "text": "— Are you hungry after practice?\n— Yes, I want some fresh fruit.\n— These ripe mangoes are sweet and delicious.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u5-l24",
              "title": "Mua sắm & Hỏi giá tiền",
              "goal": "Hỏi giá \"How much is this?\" và trả tiền bằng tiền mặt hoặc thẻ.",
              "newWords": [
                "buy",
                "sell",
                "pay",
                "money",
                "shop",
                "store",
                "cheap",
                "expensive"
              ],
              "grammar": [
                "EG-006",
                "EG-011"
              ],
              "focus": "Trọng âm expensive /ɪkˈspensɪv/, âm /tʃ/ trong cheap.",
              "text": "— How much is this blue shirt?\n— It is twenty dollars.\n— That is very cheap! I want to buy it.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u5-l25",
              "title": "Trang phục & Thời tiết",
              "goal": "Chọn trang phục phù hợp với từng kiểu thời tiết (nắng, mưa, lạnh).",
              "newWords": [
                "wear",
                "clothes",
                "shirt",
                "pants",
                "coat",
                "weather",
                "rain",
                "sun"
              ],
              "grammar": [
                "EG-001",
                "EG-006"
              ],
              "focus": "Danh từ số nhiều clothes /kloʊðz/, âm /ð/ trong weather.",
              "text": "— The weather is cold and rainy today.\n— Put on your warm coat and long pants before going out.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            }
          ]
        },
        {
          "id": "a1-u6",
          "title": "Hiện tại tiếp diễn & Bước đầu Quá khứ đơn",
          "theme": "Thời điểm & Trải nghiệm",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "a1-u6-l26",
              "title": "Hành động đang diễn ra (Hiện tại tiếp diễn)",
              "goal": "Miêu tả những việc đang diễn ra ngay lúc nói với am/is/are + V-ing.",
              "newWords": [
                "listen",
                "talk",
                "cook",
                "clean",
                "wait",
                "call",
                "send"
              ],
              "grammar": [
                "EG-012"
              ],
              "focus": "Cách thêm -ing vào động từ (cooking, cleaning, listening), chữ t câm trong listen.",
              "text": "— What are you doing right now?\n— I am cooking dinner while my brother is listening to music.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u6-l27",
              "title": "Cảm xúc & Tâm trạng",
              "goal": "Bày tỏ cảm xúc vui, buồn, mệt, ốm, bận rộn bằng to be + adjective.",
              "newWords": [
                "happy",
                "sad",
                "tired",
                "sick",
                "healthy",
                "friendly",
                "busy"
              ],
              "grammar": [
                "EG-001"
              ],
              "focus": "Âm /z/ trong busy /ˈbɪzi/, âm /θ/ trong healthy /ˈhelθi/.",
              "text": "— You look a little tired today. Are you sick?\n— No, I was just busy with school projects. I feel fine now!",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u6-l28",
              "title": "Quá khứ của To Be: Was / Were",
              "goal": "Nói về sự việc hoặc trạng thái trong quá khứ với was và were.",
              "newWords": [
                "yesterday",
                "born",
                "year",
                "month",
                "true",
                "wrong",
                "because"
              ],
              "grammar": [
                "EG-013"
              ],
              "focus": "Phân biệt I was vs We were, trọng âm yesterday /ˈjestərdeɪ/.",
              "text": "— Where were you yesterday afternoon?\n— I was at the library because I had an exam.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u6-l29",
              "title": "Động từ Quá khứ có quy tắc (-ed)",
              "goal": "Sử dụng các động từ thêm đuôi -ed và phát âm đúng chuẩn.",
              "newWords": [
                "live",
                "finish",
                "start",
                "open",
                "close",
                "follow",
                "change"
              ],
              "grammar": [
                "EG-014"
              ],
              "focus": "Quy tắc phát âm đuôi -ed: started /ɪd/, finished /t/, lived /d/.",
              "text": "— Did you finish your project last night?\n— Yes, I finished it at nine o'clock and closed my computer.",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "a1-u6-l30",
              "title": "Kể về Trải nghiệm & Tổng kết",
              "goal": "Kể lại một trải nghiệm vừa qua bằng các động từ quá khứ thông dụng.",
              "newWords": [
                "find",
                "lose",
                "leave",
                "arrive",
                "bring",
                "understand",
                "goodbye",
                "again"
              ],
              "grammar": [
                "EG-014",
                "EG-015"
              ],
              "focus": "Động từ bất quy tắc cơ bản: find -> found, leave -> left, bring -> brought.",
              "text": "— Did you arrive at the airport on time?\n— Yes, we arrived safely and found our luggage quickly.\n— Great! Goodbye for now, see you again tomorrow!",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "a2",
      "name": "Cấp 2: Pre-Intermediate (A2)",
      "band": "Sơ cấp nâng cao",
      "cefr": "A2",
      "locked": true,
      "targets": {
        "hours": 80,
        "words": 260,
        "grammar": 15
      },
      "units": []
    }
  ],
  "grammar": [
    {
      "id": "EG-001",
      "level": "starter",
      "name": "Động từ \"To Be\" ở hiện tại đơn (Am / Is / Are)",
      "pattern": "S + am / is / are + Noun / Adjective",
      "viNote": "Dùng \"am\" với đại từ I; \"is\" với he, she, it và danh từ số ít; \"are\" với you, we, they và danh từ số nhiều.",
      "examples": [
        {
          "en": "I am a student.",
          "ipa": "/aɪ æm ə ˈstuːdnt/",
          "vi": "Tôi là một học sinh.",
          "zh": "I am a student.",
          "py": "/aɪ æm ə ˈstuːdnt/"
        },
        {
          "en": "She is very friendly.",
          "ipa": "/ʃiː ɪz ˈveri ˈfrendli/",
          "vi": "Cô ấy rất thân thiện.",
          "zh": "She is very friendly.",
          "py": "/ʃiː ɪz ˈveri ˈfrendli/"
        },
        {
          "en": "We are in the classroom.",
          "ipa": "/wiː ɑːr ɪn ðə ˈklæsruːm/",
          "vi": "Chúng tôi đang ở trong lớp học.",
          "zh": "We are in the classroom.",
          "py": "/wiː ɑːr ɪn ðə ˈklæsruːm/"
        }
      ]
    },
    {
      "id": "EG-002",
      "level": "starter",
      "name": "Đại từ nhân xưng và Tính từ sở hữu",
      "pattern": "Subject Pronoun (I, you, he...) vs Possessive Adjective (my, your, his...) + Noun",
      "viNote": "Tính từ sở hữu luôn đứng trước một danh từ để chỉ sự sở hữu (my friend, your name, his car).",
      "examples": [
        {
          "en": "My name is Nam.",
          "ipa": "/maɪ neɪm ɪz Nam/",
          "vi": "Tên của tôi là Nam.",
          "zh": "My name is Nam.",
          "py": "/maɪ neɪm ɪz Nam/"
        },
        {
          "en": "What is your phone number?",
          "ipa": "/wɑːt ɪz jɔːr foʊn ˈnʌmbər/",
          "vi": "Số điện thoại của bạn là gì?",
          "zh": "What is your phone number?",
          "py": "/wɑːt ɪz jɔːr foʊn ˈnʌmbər/"
        }
      ]
    },
    {
      "id": "EG-003",
      "level": "starter",
      "name": "Mạo từ bất định: A và An",
      "pattern": "a + phụ âm (sound) | an + nguyên âm (sound: u, e, o, a, i)",
      "viNote": "Dùng \"a\" trước từ bắt đầu bằng một phụ âm (a book, a cat); dùng \"an\" trước từ bắt đầu bằng một nguyên âm (an apple, an hour).",
      "examples": [
        {
          "en": "I have an apple and a book.",
          "ipa": "/aɪ hæv ən ˈæpl ænd ə bʊk/",
          "vi": "Tôi có một quả táo và một quyển sách.",
          "zh": "I have an apple and a book.",
          "py": "/aɪ hæv ən ˈæpl ænd ə bʊk/"
        },
        {
          "en": "He is an honest man.",
          "ipa": "/hiː ɪz ən ˈɑːnɪst mæn/",
          "vi": "Anh ấy là một người đàn ông lương thiện.",
          "zh": "He is an honest man.",
          "py": "/hiː ɪz ən ˈɑːnɪst mæn/"
        }
      ]
    },
    {
      "id": "EG-004",
      "level": "starter",
      "name": "Danh từ số nhiều (Plural Nouns: thêm -s / -es)",
      "pattern": "Noun + s / es (buses, boxes, watches)",
      "viNote": "Hầu hết danh từ thêm -s; danh từ tận cùng bằng s, ss, sh, ch, x, z thêm -es; chú ý phát âm /s/, /z/, /ɪz/.",
      "examples": [
        {
          "en": "There are two chairs and three boxes.",
          "ipa": "/ðer ɑːr tuː tʃerz ænd θriː ˈbɑːksɪz/",
          "vi": "Có hai chiếc ghế và ba chiếc hộp.",
          "zh": "There are two chairs and three boxes.",
          "py": "/ðer ɑːr tuː tʃerz ænd θriː ˈbɑːksɪz/"
        }
      ]
    },
    {
      "id": "EG-005",
      "level": "starter",
      "name": "Đại từ chỉ định: This và That",
      "pattern": "This is + Noun (số ít, ở gần) | That is + Noun (số ít, ở xa)",
      "viNote": "This dùng cho người hoặc vật ở gần người nói; That dùng cho người hoặc vật ở xa người nói.",
      "examples": [
        {
          "en": "This is my desk, and that is your chair.",
          "ipa": "/ðɪs ɪz maɪ desk ænd ðæt ɪz jɔːr tʃer/",
          "vi": "Đây là bàn của tôi, và kia là ghế của bạn.",
          "zh": "This is my desk, and that is your chair.",
          "py": "/ðɪs ɪz maɪ desk ænd ðæt ɪz jɔːr tʃer/"
        }
      ]
    },
    {
      "id": "EG-006",
      "level": "a1",
      "name": "Thì Hiện tại đơn với động từ thường (Present Simple)",
      "pattern": "(+) S + V(s/es) | (-) S + do/does not + V-inf | (?) Do/Does + S + V-inf?",
      "viNote": "Diễn tả thói quen, hành động lặp đi lặp lại hoặc chân lý. Với he/she/it động từ thêm -s hoặc -es.",
      "examples": [
        {
          "en": "I walk to school every morning.",
          "ipa": "/aɪ wɔːk tuː skuːl ˈevri ˈmɔːrnɪŋ/",
          "vi": "Tôi đi bộ đến trường mỗi buổi sáng.",
          "zh": "I walk to school every morning.",
          "py": "/aɪ wɔːk tuː skuːl ˈevri ˈmɔːrnɪŋ/"
        },
        {
          "en": "She studies English on Saturday.",
          "ipa": "/ʃiː ˈstʌdiz ˈɪŋɡlɪʃ ɑːn ˈsætərdeɪ/",
          "vi": "Cô ấy học tiếng Anh vào Thứ Bảy.",
          "zh": "She studies English on Saturday.",
          "py": "/ʃiː ˈstʌdiz ˈɪŋɡlɪʃ ɑːn ˈsætərdeɪ/"
        }
      ]
    },
    {
      "id": "EG-007",
      "level": "a1",
      "name": "Thì Hiện tại đơn thể Phủ định và Nghi vấn",
      "pattern": "S + do not (don't) / does not (doesn't) + V-inf | Do/Does + S + V-inf?",
      "viNote": "Dùng trợ động từ do/don't với I, you, we, they; does/doesn't với he, she, it. Khi đã có trợ động từ, động từ chính trở về nguyên thể.",
      "examples": [
        {
          "en": "I do not drink coffee at night.",
          "ipa": "/aɪ duː nɑːt drɪŋk ˈkɔːfi æt naɪt/",
          "vi": "Tôi không uống cà phê vào ban đêm.",
          "zh": "I do not drink coffee at night.",
          "py": "/aɪ duː nɑːt drɪŋk ˈkɔːfi æt naɪt/"
        },
        {
          "en": "Do you live in this city?",
          "ipa": "/duː juː lɪv ɪn ðɪs ˈsɪti/",
          "vi": "Bạn có sống ở thành phố này không?",
          "zh": "Do you live in this city?",
          "py": "/duː juː lɪv ɪn ðɪs ˈsɪti/"
        }
      ]
    },
    {
      "id": "EG-008",
      "level": "a1",
      "name": "Cấu trúc \"There is\" và \"There are\"",
      "pattern": "There is + Singular Noun | There are + Plural Noun",
      "viNote": "Dùng để diễn tả sự tồn tại hay có mặt của người hoặc vật. Phủ định là \"there is not / there are not\".",
      "examples": [
        {
          "en": "There is a book on the table.",
          "ipa": "/ðer ɪz ə bʊk ɑːn ðə ˈteɪbl/",
          "vi": "Có một cuốn sách ở trên bàn.",
          "zh": "There is a book on the table.",
          "py": "/ðer ɪz ə bʊk ɑːn ðə ˈteɪbl/"
        },
        {
          "en": "There are four rooms in my house.",
          "ipa": "/ðer ɑːr fɔːr ruːmz ɪn maɪ haʊs/",
          "vi": "Có bốn căn phòng trong nhà tôi.",
          "zh": "There are four rooms in my house.",
          "py": "/ðer ɑːr fɔːr ruːmz ɪn maɪ haʊs/"
        }
      ]
    },
    {
      "id": "EG-009",
      "level": "a1",
      "name": "Giới từ chỉ nơi chốn (In, On, At, Under, Next to)",
      "pattern": "Preposition + Noun phrase",
      "viNote": "In (bên trong), On (trên bề mặt), At (ở một địa điểm cụ thể), Under (ở dưới), Next to (bên cạnh).",
      "examples": [
        {
          "en": "The pen is in the box.",
          "ipa": "/ðə pen ɪz ɪn ðə bɑːks/",
          "vi": "Chiếc bút ở trong chiếc hộp.",
          "zh": "The pen is in the box.",
          "py": "/ðə pen ɪz ɪn ðə bɑːks/"
        },
        {
          "en": "The cat sleeps under the bed.",
          "ipa": "/ðə kæt sliːps ˈʌndər ðə bed/",
          "vi": "Con mèo ngủ ở dưới gầm giường.",
          "zh": "The cat sleeps under the bed.",
          "py": "/ðə kæt sliːps ˈʌndər ðə bed/"
        }
      ]
    },
    {
      "id": "EG-010",
      "level": "a1",
      "name": "Trợ động từ khuyết thiếu: Can và Cannot (Can't)",
      "pattern": "S + can / cannot + V-inf",
      "viNote": "Diễn tả khả năng làm việc gì. Động từ đi sau luôn ở dạng nguyên thể không chia.",
      "examples": [
        {
          "en": "She can speak English very well.",
          "ipa": "/ʃiː kæn spiːk ˈɪŋɡlɪʃ ˈveri wel/",
          "vi": "Cô ấy có thể nói tiếng Anh rất tốt.",
          "zh": "She can speak English very well.",
          "py": "/ʃiː kæn spiːk ˈɪŋɡlɪʃ ˈveri wel/"
        },
        {
          "en": "I cannot run very fast today.",
          "ipa": "/aɪ ˈkænɑːt rʌn ˈveri fæst təˈdeɪ/",
          "vi": "Hôm nay tôi không thể chạy nhanh được.",
          "zh": "I cannot run very fast today.",
          "py": "/aɪ ˈkænɑːt rʌn ˈveri fæst təˈdeɪ/"
        }
      ]
    },
    {
      "id": "EG-011",
      "level": "a1",
      "name": "Câu hỏi nghi vấn với từ để hỏi Wh- (What, Where, When, Who, Why, How)",
      "pattern": "Wh-word + do/does/is/are + S + ...?",
      "viNote": "What (cái gì), Where (ở đâu), When (khi nào), Who (ai), Why (tại sao), How (như thế nào, bằng cách nào).",
      "examples": [
        {
          "en": "Where do you work?",
          "ipa": "/wer duː juː wɜːrk/",
          "vi": "Bạn làm việc ở đâu?",
          "zh": "Where do you work?",
          "py": "/wer duː juː wɜːrk/"
        },
        {
          "en": "What time is it now?",
          "ipa": "/wɑːt taɪm ɪz ɪt naʊ/",
          "vi": "Bây giờ là mấy giờ?",
          "zh": "What time is it now?",
          "py": "/wɑːt taɪm ɪz ɪt naʊ/"
        }
      ]
    },
    {
      "id": "EG-012",
      "level": "a1",
      "name": "Thì Hiện tại tiếp diễn (Present Continuous)",
      "pattern": "S + am / is / are + V-ing",
      "viNote": "Diễn tả hành động đang xảy ra ngay lúc nói (now, right now, at the moment).",
      "examples": [
        {
          "en": "I am reading an English story now.",
          "ipa": "/aɪ æm ˈriːdɪŋ ən ˈɪŋɡlɪʃ ˈstɔːri naʊ/",
          "vi": "Bây giờ tôi đang đọc một câu chuyện tiếng Anh.",
          "zh": "I am reading an English story now.",
          "py": "/aɪ æm ˈriːdɪŋ ən ˈɪŋɡlɪʃ ˈstɔːri naʊ/"
        },
        {
          "en": "They are cooking dinner in the kitchen.",
          "ipa": "/ðeɪ ɑːr ˈkʊkɪŋ ˈdɪnər ɪn ðə ˈkɪtʃɪn/",
          "vi": "Họ đang nấu bữa tối trong bếp.",
          "zh": "They are cooking dinner in the kitchen.",
          "py": "/ðeɪ ɑːr ˈkʊkɪŋ ˈdɪnər ɪn ðə ˈkɪtʃɪn/"
        }
      ]
    },
    {
      "id": "EG-013",
      "level": "a1",
      "name": "Thì Quá khứ đơn của To Be: Was và Were",
      "pattern": "I/He/She/It + was | You/We/They + were",
      "viNote": "Diễn tả trạng thái hoặc sự tồn tại trong quá khứ (yesterday, last week, two days ago).",
      "examples": [
        {
          "en": "I was tired yesterday evening.",
          "ipa": "/aɪ wɑːz ˈtaɪərd ˈjestərdeɪ ˈiːvnɪŋ/",
          "vi": "Tối hôm qua tôi đã rất mệt mỏi.",
          "zh": "I was tired yesterday evening.",
          "py": "/aɪ wɑːz ˈtaɪərd ˈjestərdeɪ ˈiːvnɪŋ/"
        },
        {
          "en": "They were happy with the results.",
          "ipa": "/ðeɪ wɜːr ˈhæpi wɪð ðə rɪˈzʌlts/",
          "vi": "Họ đã rất vui với kết quả.",
          "zh": "They were happy with the results.",
          "py": "/ðeɪ wɜːr ˈhæpi wɪð ðə rɪˈzʌlts/"
        }
      ]
    },
    {
      "id": "EG-014",
      "level": "a1",
      "name": "Thì Quá khứ đơn với động từ có quy tắc (Regular Verbs: V-ed)",
      "pattern": "(+) S + V-ed | (-) S + did not + V-inf | (?) Did + S + V-inf?",
      "viNote": "Động từ thêm -ed (lived, started, cleaned). Dùng trợ động từ \"did\" trong câu phủ định và nghi vấn.",
      "examples": [
        {
          "en": "We lived in a quiet town last year.",
          "ipa": "/wiː lɪvd ɪn ə ˈkwaɪət taʊn læst jɪr/",
          "vi": "Năm ngoái chúng tôi đã sống ở một thị trấn yên bình.",
          "zh": "We lived in a quiet town last year.",
          "py": "/wiː lɪvd ɪn ə ˈkwaɪət taʊn læst jɪr/"
        },
        {
          "en": "Did you finish your homework?",
          "ipa": "/dɪd juː ˈfɪnɪʃ jɔːr ˈhoʊmwɜːrk/",
          "vi": "Bạn đã hoàn thành bài tập về nhà chưa?",
          "zh": "Did you finish your homework?",
          "py": "/dɪd juː ˈfɪnɪʃ jɔːr ˈhoʊmwɜːrk/"
        }
      ]
    },
    {
      "id": "EG-015",
      "level": "a1",
      "name": "Thì Quá khứ đơn với động từ bất quy tắc cơ bản",
      "pattern": "S + V2 (went, had, ate, came, saw, made)",
      "viNote": "Một số động từ thông dụng không thêm -ed mà biến đổi dạng đặc biệt: go -> went, have -> had, eat -> ate, see -> saw.",
      "examples": [
        {
          "en": "I had bread and milk for breakfast yesterday.",
          "ipa": "/aɪ hæd bred ænd mɪlk fɔːr ˈbrekfəst ˈjestərdeɪ/",
          "vi": "Hôm qua tôi đã ăn bánh mì và sữa cho bữa sáng.",
          "zh": "I had bread and milk for breakfast yesterday.",
          "py": "/aɪ hæd bred ænd mɪlk fɔːr ˈbrekfəst ˈjestərdeɪ/"
        }
      ]
    }
  ],
  "falseFriends": [
    {
      "word": "delicious",
      "trueMeaning": "Rất thơm ngon (dùng cho đồ ăn thức uống có vị giác thực sự xuất sắc)",
      "trap": "Người Việt hay dùng \"delicious\" cho mọi thứ ngon hoặc dùng nhầm cho người/cảnh đẹp thay vì tasty/good.",
      "example": {
        "en": "This chicken noodle soup is delicious.",
        "vi": "Món phở gà này thơm ngon tuyệt vời."
      }
    },
    {
      "word": "borrow vs lend",
      "trueMeaning": "Borrow = mượn (nhận vào); Lend = cho mượn (đưa ra)",
      "trap": "Tiếng Việt đều dùng chữ \"mượn\", dễ nói nhầm \"Can you borrow me your pen?\" thay vì \"Can you lend me...?\" hay \"Can I borrow...?\"",
      "example": {
        "en": "Can I borrow your pen? Sure, I can lend it to you.",
        "vi": "Tôi có thể mượn bút của bạn không? Chắc chắn rồi, tôi có thể cho bạn mượn."
      }
    },
    {
      "word": "hear vs listen",
      "trueMeaning": "Hear = nghe thấy (thụ động); Listen = lắng nghe (chủ động chú ý)",
      "trap": "Nói nhầm \"I am hearing music\" thay vì \"I am listening to music\".",
      "example": {
        "en": "I listen to English podcasts every day and hear my pronunciation improve.",
        "vi": "Tôi chủ động nghe podcast tiếng Anh mỗi ngày và nhận thấy phát âm tiến bộ."
      }
    },
    {
      "word": "see vs look vs watch",
      "trueMeaning": "See = nhìn thấy tự nhiên; Look = nhìn tập trung vào điểm cố định; Watch = theo dõi chuyển động (phim, trận đấu)",
      "trap": "Nói nhầm \"look TV\" thay vì \"watch TV\".",
      "example": {
        "en": "Look at the screen; we are watching a football match.",
        "vi": "Hãy nhìn vào màn hình kìa; chúng tôi đang theo dõi một trận bóng đá."
      }
    },
    {
      "word": "fun vs funny",
      "trueMeaning": "Fun = vui vẻ, thú vị; Funny = buồn cười, hài hước",
      "trap": "Nói \"The party was so funny\" (bữa tiệc tức cười quái dị) thay vì \"The party was fun\" (bữa tiệc vui vẻ).",
      "example": {
        "en": "The trip was great fun, and his jokes were very funny.",
        "vi": "Chuyến đi rất vui vẻ, và những câu chuyện cười của anh ấy thật hài hước."
      }
    }
  ]
};

  if (typeof window !== 'undefined') {
    window.EN_CURRICULUM = CURRICULUM;
    window.CURRICULUM_EN = CURRICULUM;
    // Gán vào CURRICULUM nếu đang ở chế độ học tiếng Anh
    if (!window.CURRICULUM) {
      window.CURRICULUM = CURRICULUM;
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CURRICULUM;
  }
})();
