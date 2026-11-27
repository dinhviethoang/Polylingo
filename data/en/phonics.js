/**
 * data/en/phonics.js
 * 44 âm IPA chuẩn quốc tế (Nguyên âm đơn, Nguyên âm đôi, Phụ âm),
 * 20 cặp âm tối thiểu (Minimal Pairs), quy tắc Âm cuối (-s/-es, -ed, âm nuốt),
 * và quy tắc Nhấn âm & Nối âm cơ bản cho người Việt học tiếng Anh.
 */

if (typeof window === 'undefined') {
  global.window = global;
}

window.EN_PHONICS = {
  "sounds": [
    {
      "ipa": "/iː/",
      "name": "Âm i dài",
      "group": "monophthong",
      "subgroup": "nguyên âm dài",
      "mouth": "Khóe miệng kéo dài sang hai bên như đang mỉm cười, lưỡi nâng cao hướng về vòm miệng, phát âm ngân dài và rõ.",
      "viCompare": "Gần giống âm \"i\" tiếng Việt nhưng kéo dài hơn và khóe miệng bè rộng, cơ miệng căng hơn.",
      "examples": [
        {
          "word": "see",
          "ipa": "/siː/",
          "vi": "nhìn thấy"
        },
        {
          "word": "eat",
          "ipa": "/iːt/",
          "vi": "ăn"
        },
        {
          "word": "tea",
          "ipa": "/tiː/",
          "vi": "trà"
        }
      ],
      "commonErrors": "Người Việt hay phát âm quá ngắn giống âm /ɪ/ khiến người nghe nhầm lẫn giữa cặp từ (seat/sit, sheep/ship)."
    },
    {
      "ipa": "/uː/",
      "name": "Âm u dài",
      "group": "monophthong",
      "subgroup": "nguyên âm dài",
      "mouth": "Môi chu tròn nhỏ về phía trước, cuống lưỡi nâng cao về phía ngạc mềm, phát âm ngân dài và sâu từ cổ họng.",
      "viCompare": "Gần giống âm \"u\" tiếng Việt nhưng chu môi tròn hơn và phát âm ngân dài hơn.",
      "examples": [
        {
          "word": "food",
          "ipa": "/fuːd/",
          "vi": "thức ăn"
        },
        {
          "word": "blue",
          "ipa": "/bluː/",
          "vi": "màu xanh da trời"
        },
        {
          "word": "two",
          "ipa": "/tuː/",
          "vi": "số hai"
        }
      ],
      "commonErrors": "Không chu tròn môi hoặc phát âm quá ngắn khiến nhầm lẫn với âm ngắn /ʊ/ (fool/full)."
    },
    {
      "ipa": "/ɑː/",
      "name": "Âm a dài (a trầm)",
      "group": "monophthong",
      "subgroup": "nguyên âm dài",
      "mouth": "Mở rộng miệng tự nhiên theo chiều dọc, hạ thấp lưỡi xuống đáy khoang miệng, phát âm ngân dài từ sâu trong họng.",
      "viCompare": "Gần giống âm \"a\" tiếng Việt nhưng miệng mở rộng hơn, âm trầm và sâu hơn.",
      "examples": [
        {
          "word": "father",
          "ipa": "/ˈfɑːðər/",
          "vi": "người cha"
        },
        {
          "word": "car",
          "ipa": "/kɑːr/",
          "vi": "xe ô tô"
        },
        {
          "word": "hot",
          "ipa": "/hɑːt/",
          "vi": "nóng (giọng Mỹ)"
        }
      ],
      "commonErrors": "Khép miệng quá nhỏ hoặc bè ngang môi khiến âm bị bẹt thành /æ/ hoặc /ʌ/."
    },
    {
      "ipa": "/ɔː/",
      "name": "Âm o dài",
      "group": "monophthong",
      "subgroup": "nguyên âm dài",
      "mouth": "Môi hơi chu tròn hình bầu dục mở vừa phải, cuống lưỡi nâng nhẹ, phát âm ngân dài tròn trịa.",
      "viCompare": "Gần giống âm \"o\" sâu trong tiếng Việt nhưng môi chu tròn hơn và âm ngân dài.",
      "examples": [
        {
          "word": "door",
          "ipa": "/dɔːr/",
          "vi": "cửa ra vào"
        },
        {
          "word": "four",
          "ipa": "/fɔːr/",
          "vi": "số bốn"
        },
        {
          "word": "water",
          "ipa": "/ˈwɔːtər/",
          "vi": "nước"
        }
      ],
      "commonErrors": "Người Việt hay mở khẩu hình quá to thành âm \"o\" ngắn hoặc đọc nhầm sang âm /oʊ/."
    },
    {
      "ipa": "/ɜːr/",
      "name": "Âm ơ dài uốn lưỡi (giọng Mỹ /ɝ/)",
      "group": "monophthong",
      "subgroup": "nguyên âm dài",
      "mouth": "Môi mở hờ tự nhiên, thân lưỡi nâng ở giữa khoang miệng, đầu lưỡi hơi cuộn ngược về sau, phát âm ngân dài và rung nhẹ.",
      "viCompare": "Gần giống âm \"ơ\" tiếng Việt kết hợp uốn cong đầu lưỡi tạo độ trầm đặc trưng của giọng Mỹ.",
      "examples": [
        {
          "word": "bird",
          "ipa": "/bɜːrd/",
          "vi": "con chim"
        },
        {
          "word": "work",
          "ipa": "/wɜːrk/",
          "vi": "làm việc"
        },
        {
          "word": "learn",
          "ipa": "/lɜːrn/",
          "vi": "học tập"
        }
      ],
      "commonErrors": "Không cuộn đầu lưỡi khiến âm bị phẳng như âm \"ơ\" tiếng Việt không có sắc thái bản xứ."
    },
    {
      "ipa": "/ɪ/",
      "name": "Âm i ngắn",
      "group": "monophthong",
      "subgroup": "nguyên âm ngắn",
      "mouth": "Môi hơi mở hờ thả lỏng, không căng khóe miệng như /iː/, lưỡi hạ thấp hơn, phát âm rất nhanh và dứt khoát.",
      "viCompare": "Nằm giữa âm \"i\" và âm \"ê\" tiếng Việt, phát âm ngắn hơn nhiều so với \"i\" tiếng Việt.",
      "examples": [
        {
          "word": "sit",
          "ipa": "/sɪt/",
          "vi": "ngồi"
        },
        {
          "word": "big",
          "ipa": "/bɪɡ/",
          "vi": "to lớn"
        },
        {
          "word": "fish",
          "ipa": "/fɪʃ/",
          "vi": "con cá"
        }
      ],
      "commonErrors": "Căng cơ miệng kéo dài thành /iː/, làm người nghe nhầm sit thành seat, ship thành sheep."
    },
    {
      "ipa": "/e/",
      "name": "Âm e ngắn",
      "group": "monophthong",
      "subgroup": "nguyên âm ngắn",
      "mouth": "Mở miệng vừa phải (rộng hơn /ɪ/ nhưng hẹp hơn /æ/), thả lỏng môi và lưỡi, phát âm dứt khoát.",
      "viCompare": "Gần giống âm \"e\" trong tiếng Việt (như trong \"mẹ\"), phát âm ngắn và gọn gàng.",
      "examples": [
        {
          "word": "bed",
          "ipa": "/bed/",
          "vi": "chiếc giường"
        },
        {
          "word": "pen",
          "ipa": "/pen/",
          "vi": "cây bút"
        },
        {
          "word": "red",
          "ipa": "/red/",
          "vi": "màu đỏ"
        }
      ],
      "commonErrors": "Mở khẩu hình quá to chuyển thành âm /æ/ (nhầm bed thành bad, men thành man)."
    },
    {
      "ipa": "/æ/",
      "name": "Âm a bẹt (a ngắn)",
      "group": "monophthong",
      "subgroup": "nguyên âm ngắn",
      "mouth": "Mở miệng rộng hết cỡ theo cả chiều dọc và ngang, hạ thấp hàm dưới và lưỡi ép phẳng dưới đáy miệng, phát âm dứt khoát.",
      "viCompare": "Nằm giữa âm \"a\" và \"e\" trong tiếng Việt; khẩu hình mở to hơn nhiều so với âm \"a\" tiếng Việt.",
      "examples": [
        {
          "word": "cat",
          "ipa": "/kæt/",
          "vi": "con mèo"
        },
        {
          "word": "bad",
          "ipa": "/bæd/",
          "vi": "xấu, tồi"
        },
        {
          "word": "apple",
          "ipa": "/ˈæpl/",
          "vi": "quả táo"
        }
      ],
      "commonErrors": "Không mở đủ rộng cơ miệng khiến âm bị bẹt thành /e/ (nhầm cat thành kẹt, bad thành bed)."
    },
    {
      "ipa": "/ʌ/",
      "name": "Âm á ngắn",
      "group": "monophthong",
      "subgroup": "nguyên âm ngắn",
      "mouth": "Mở miệng vừa phải, thả lỏng môi hoàn toàn không chu tròn, nâng phần sau của lưỡi lên nhẹ, phát âm dứt khoát.",
      "viCompare": "Gần giống âm \"ă\" hoặc \"ớ\" tiếng Việt nhưng phát âm nhanh và thanh thoát hơn.",
      "examples": [
        {
          "word": "cup",
          "ipa": "/kʌp/",
          "vi": "cái tách"
        },
        {
          "word": "sun",
          "ipa": "/sʌn/",
          "vi": "mặt trời"
        },
        {
          "word": "bus",
          "ipa": "/bʌs/",
          "vi": "xe buýt"
        }
      ],
      "commonErrors": "Người Việt hay đọc thành âm \"u\" do chữ viết (như bus đọc là \"bút\", cup đọc là \"cúp\")."
    },
    {
      "ipa": "/ʊ/",
      "name": "Âm u ngắn",
      "group": "monophthong",
      "subgroup": "nguyên âm ngắn",
      "mouth": "Môi hơi chu tròn nhưng thả lỏng tự nhiên, không căng môi như /uː/, nâng cuống lưỡi lên nhẹ, phát âm dứt khoát.",
      "viCompare": "Nằm giữa âm \"u\" và \"ô\" tiếng Việt, phát âm ngắn hơn nhiều so với \"u\" tiếng Việt.",
      "examples": [
        {
          "word": "book",
          "ipa": "/bʊk/",
          "vi": "quyển sách"
        },
        {
          "word": "good",
          "ipa": "/ɡʊd/",
          "vi": "tốt"
        },
        {
          "word": "foot",
          "ipa": "/fʊt/",
          "vi": "bàn chân"
        }
      ],
      "commonErrors": "Chu môi quá chặt và kéo dài thành /uː/ khiến nhầm pull thành pool, full thành fool."
    },
    {
      "ipa": "/ɒ/",
      "name": "Âm o ngắn",
      "group": "monophthong",
      "subgroup": "nguyên âm ngắn",
      "mouth": "Mở miệng tròn vừa phải, hạ thấp hàm dưới, môi hơi tròn thả lỏng, phát âm nhanh và dứt khoát.",
      "viCompare": "Gần giống âm \"o\" ngắn tiếng Việt (trong giọng Mỹ âm này thường chuyển thành /ɑː/ mở rộng).",
      "examples": [
        {
          "word": "clock",
          "ipa": "/klɑːk/",
          "vi": "đồng hồ"
        },
        {
          "word": "box",
          "ipa": "/bɑːks/",
          "vi": "cái hộp"
        },
        {
          "word": "stop",
          "ipa": "/stɑːp/",
          "vi": "dừng lại"
        }
      ],
      "commonErrors": "Đọc thành âm \"ô\" khép kín thay vì mở rộng tròn miệng tự nhiên."
    },
    {
      "ipa": "/ə/",
      "name": "Âm Schwa (ơ nhẹ lướt)",
      "group": "monophthong",
      "subgroup": "nguyên âm ngắn",
      "mouth": "Thả lỏng toàn bộ cơ hàm, môi và lưỡi ở vị trí nghỉ trung tâm, phát âm cực kỳ nhẹ, ngắn và không bao giờ mang trọng âm.",
      "viCompare": "Gần giống âm \"ơ\" trong tiếng Việt nhưng nhẹ hơn rất nhiều, chỉ lướt qua như tiếng thở nhẹ.",
      "examples": [
        {
          "word": "banana",
          "ipa": "/bəˈnænə/",
          "vi": "quả chuối"
        },
        {
          "word": "computer",
          "ipa": "/kəmˈpjuːtər/",
          "vi": "máy vi tính"
        },
        {
          "word": "family",
          "ipa": "/ˈfæməli/",
          "vi": "gia đình"
        }
      ],
      "commonErrors": "Nhấn quá mạnh âm này theo chữ cái viết (như đọc \"com\" trong computer thay vì /kəm/)."
    },
    {
      "ipa": "/eɪ/",
      "name": "Nguyên âm đôi e-i",
      "group": "diphthong",
      "subgroup": "nguyên âm đôi",
      "mouth": "Bắt đầu từ âm /e/, lướt nhẹ và khép dần miệng về phía âm /ɪ/, khóe miệng hơi bè ra.",
      "viCompare": "Gần giống vần \"ây\" trong tiếng Việt nhưng mở rộng âm đầu /e/ hơn.",
      "examples": [
        {
          "word": "day",
          "ipa": "/deɪ/",
          "vi": "ngày"
        },
        {
          "word": "cake",
          "ipa": "/keɪk/",
          "vi": "bánh ngọt"
        },
        {
          "word": "rain",
          "ipa": "/reɪn/",
          "vi": "mưa"
        }
      ],
      "commonErrors": "Đọc phẳng thành âm \"ê\" tiếng Việt mà không có động tác lướt khóe miệng từ /e/ sang /ɪ/."
    },
    {
      "ipa": "/aɪ/",
      "name": "Nguyên âm đôi a-i",
      "group": "diphthong",
      "subgroup": "nguyên âm đôi",
      "mouth": "Mở rộng miệng phát âm /a/, sau đó khép dần hàm dưới và lướt nhẹ về phía âm /ɪ/.",
      "viCompare": "Gần giống vần \"ai\" tiếng Việt nhưng phát âm âm /a/ ban đầu sâu và rõ hơn.",
      "examples": [
        {
          "word": "time",
          "ipa": "/taɪm/",
          "vi": "thời gian"
        },
        {
          "word": "my",
          "ipa": "/maɪ/",
          "vi": "của tôi"
        },
        {
          "word": "nice",
          "ipa": "/naɪs/",
          "vi": "đẹp, tốt"
        }
      ],
      "commonErrors": "Khép miệng quá sớm làm âm bị hẹp và không vang tròn."
    },
    {
      "ipa": "/ɔɪ/",
      "name": "Nguyên âm đôi o-i",
      "group": "diphthong",
      "subgroup": "nguyên âm đôi",
      "mouth": "Bắt đầu với môi chu tròn phát âm /ɔː/, sau đó mở dần khóe miệng lướt về phía âm /ɪ/.",
      "viCompare": "Gần giống vần \"oi\" tiếng Việt nhưng tròn môi ở âm đầu rõ rệt hơn.",
      "examples": [
        {
          "word": "boy",
          "ipa": "/bɔɪ/",
          "vi": "cậu bé"
        },
        {
          "word": "oil",
          "ipa": "/ɔɪl/",
          "vi": "dầu ăn"
        },
        {
          "word": "choice",
          "ipa": "/tʃɔɪs/",
          "vi": "sự lựa chọn"
        }
      ],
      "commonErrors": "Không chu môi tròn ở đầu âm khiến âm /ɔ/ bị bẹt."
    },
    {
      "ipa": "/aʊ/",
      "name": "Nguyên âm đôi a-u",
      "group": "diphthong",
      "subgroup": "nguyên âm đôi",
      "mouth": "Mở rộng miệng phát âm /a/, sau đó thu tròn môi lại và nâng dần hàm dưới về phía âm /ʊ/.",
      "viCompare": "Gần giống vần \"ao\" tiếng Việt nhưng âm kết thúc môi tròn và chúm lại hơn.",
      "examples": [
        {
          "word": "house",
          "ipa": "/haʊs/",
          "vi": "ngôi nhà"
        },
        {
          "word": "now",
          "ipa": "/naʊ/",
          "vi": "bây giờ"
        },
        {
          "word": "cloud",
          "ipa": "/klaʊd/",
          "vi": "đám mây"
        }
      ],
      "commonErrors": "Đọc thành \"au\" tiếng Việt mà không mở rộng miệng lúc đầu và không chu môi lúc sau."
    },
    {
      "ipa": "/oʊ/",
      "name": "Nguyên âm đôi o-u (giọng Mỹ)",
      "group": "diphthong",
      "subgroup": "nguyên âm đôi",
      "mouth": "Bắt đầu mở môi hơi tròn ở âm /o/, sau đó thu hẹp môi lại thành vòng tròn nhỏ về phía /ʊ/.",
      "viCompare": "Gần giống vần \"âu\" hoặc \"ô\" tiếng Việt nhưng có sự chuyển động môi rõ rệt từ mở sang tròn hẹp.",
      "examples": [
        {
          "word": "go",
          "ipa": "/ɡoʊ/",
          "vi": "đi"
        },
        {
          "word": "home",
          "ipa": "/hoʊm/",
          "vi": "nhà"
        },
        {
          "word": "no",
          "ipa": "/noʊ/",
          "vi": "không"
        }
      ],
      "commonErrors": "Đọc phẳng thành âm \"ô\" tiếng Việt khiến giọng bị cụt và không tự nhiên."
    },
    {
      "ipa": "/ɪr/",
      "name": "Nguyên âm đôi i-ơ uốn lưỡi (giọng Anh /ɪə/)",
      "group": "diphthong",
      "subgroup": "nguyên âm đôi",
      "mouth": "Bắt đầu từ âm /ɪ/, lướt nhẹ sang âm schwa /ə/ đồng thời uốn nhẹ đầu lưỡi về sau tạo âm /r/.",
      "viCompare": "Gần giống vần \"ia\" tiếng Việt nhưng kết thúc bằng động tác uốn lưỡi âm \"r\".",
      "examples": [
        {
          "word": "near",
          "ipa": "/nɪr/",
          "vi": "ở gần"
        },
        {
          "word": "ear",
          "ipa": "/ɪr/",
          "vi": "cái tai"
        },
        {
          "word": "beer",
          "ipa": "/bɪr/",
          "vi": "bia"
        }
      ],
      "commonErrors": "Bỏ quên uốn lưỡi âm /r/ ở cuối hoặc đọc thành \"ia\" phẳng."
    },
    {
      "ipa": "/er/",
      "name": "Nguyên âm đôi e-ơ uốn lưỡi (giọng Anh /eə/)",
      "group": "diphthong",
      "subgroup": "nguyên âm đôi",
      "mouth": "Bắt đầu từ âm /e/, lướt nhẹ sang schwa /ə/ và cuộn đầu lưỡi về sau tạo âm /r/.",
      "viCompare": "Gần giống vần \"e\" kéo dài kết hợp uốn lưỡi.",
      "examples": [
        {
          "word": "chair",
          "ipa": "/tʃer/",
          "vi": "cái ghế"
        },
        {
          "word": "hair",
          "ipa": "/her/",
          "vi": "mái tóc"
        },
        {
          "word": "airport",
          "ipa": "/ˈerpɔːrt/",
          "vi": "sân bay"
        }
      ],
      "commonErrors": "Đọc thành \"e\" cụt hoặc không cuộn lưỡi làm mất đi đặc trưng phát âm."
    },
    {
      "ipa": "/ʊr/",
      "name": "Nguyên âm đôi u-ơ uốn lưỡi (giọng Anh /ʊə/)",
      "group": "diphthong",
      "subgroup": "nguyên âm đôi",
      "mouth": "Bắt đầu từ âm /ʊ/ thả lỏng, lướt về schwa /ə/ và uốn nhẹ đầu lưỡi.",
      "viCompare": "Gần giống vần \"ua\" trong tiếng Việt kết hợp uốn lưỡi.",
      "examples": [
        {
          "word": "tourist",
          "ipa": "/ˈtʊrɪst/",
          "vi": "khách du lịch"
        },
        {
          "word": "poor",
          "ipa": "/pʊr/",
          "vi": "nghèo khó"
        },
        {
          "word": "sure",
          "ipa": "/ʃʊr/",
          "vi": "chắc chắn"
        }
      ],
      "commonErrors": "Người Việt hay đọc thành âm \"ua\" bẹt hoặc chuyển sang âm /ɔːr/."
    },
    {
      "ipa": "/p/",
      "name": "Phụ âm bật hơi vô thanh p",
      "group": "consonant",
      "subgroup": "phụ âm vô thanh",
      "mouth": "Mím chặt hai môi ngăn luồng hơi, sau đó mở môi đột ngột để bật luồng hơi mạnh ra ngoài, dây thanh quản không rung.",
      "viCompare": "Bật hơi mạnh hơn nhiều so với âm \"p\" trong tiếng Việt (có thể thử bằng tờ giấy trước miệng bay nhẹ).",
      "examples": [
        {
          "word": "pen",
          "ipa": "/pen/",
          "vi": "cây bút"
        },
        {
          "word": "stop",
          "ipa": "/stɑːp/",
          "vi": "dừng lại"
        },
        {
          "word": "apple",
          "ipa": "/ˈæpl/",
          "vi": "quả táo"
        }
      ],
      "commonErrors": "Không bật hơi ở đầu từ (nghe như b) hoặc quên bật âm /p/ ở cuối từ."
    },
    {
      "ipa": "/b/",
      "name": "Phụ âm bật môi hữu thanh b",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Mím nhẹ hai môi, luồng hơi bật nhẹ đồng thời làm rung thanh quản, luồng hơi thoát ra nhẹ hơn âm /p/.",
      "viCompare": "Rất giống âm \"b\" trong tiếng Việt.",
      "examples": [
        {
          "word": "book",
          "ipa": "/bʊk/",
          "vi": "quyển sách"
        },
        {
          "word": "big",
          "ipa": "/bɪɡ/",
          "vi": "to lớn"
        },
        {
          "word": "baby",
          "ipa": "/ˈbeɪbi/",
          "vi": "em bé"
        }
      ],
      "commonErrors": "Nuốt mất âm /b/ khi đứng ở vị trí cuối từ."
    },
    {
      "ipa": "/t/",
      "name": "Phụ âm bật hơi vô thanh t",
      "group": "consonant",
      "subgroup": "phụ âm vô thanh",
      "mouth": "Đặt đầu lưỡi chạm vào nướu răng trên ngăn luồng hơi, hạ nhanh đầu lưỡi để bật luồng hơi mạnh dứt khoát, thanh quản không rung.",
      "viCompare": "Bật hơi mạnh hơn âm \"t\" tiếng Việt nhiều (gần như \"th\" nhưng sắc bén và dứt khoát hơn).",
      "examples": [
        {
          "word": "tea",
          "ipa": "/tiː/",
          "vi": "trà"
        },
        {
          "word": "cat",
          "ipa": "/kæt/",
          "vi": "con mèo"
        },
        {
          "word": "two",
          "ipa": "/tuː/",
          "vi": "số hai"
        }
      ],
      "commonErrors": "Bỏ âm cuối /t/ (đây là lỗi phổ biến nhất của người Việt, khiến cat nghe thành ca, eight thành ay)."
    },
    {
      "ipa": "/d/",
      "name": "Phụ âm chặn nướu hữu thanh d",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Đặt đầu lưỡi vào nướu răng trên, hạ lưỡi bật luồng hơi nhẹ đồng thời làm rung dây thanh quản.",
      "viCompare": "Gần giống âm \"đ\" tiếng Việt nhưng lưỡi áp sát chân răng trên hơn.",
      "examples": [
        {
          "word": "day",
          "ipa": "/deɪ/",
          "vi": "ngày"
        },
        {
          "word": "bed",
          "ipa": "/bed/",
          "vi": "cái giường"
        },
        {
          "word": "dog",
          "ipa": "/dɔːɡ/",
          "vi": "con chó"
        }
      ],
      "commonErrors": "Quên chặn bật âm /d/ ở cuối từ, hoặc biến thành /t/ không rung."
    },
    {
      "ipa": "/k/",
      "name": "Phụ âm bật cuống họng vô thanh k",
      "group": "consonant",
      "subgroup": "phụ âm vô thanh",
      "mouth": "Nâng cuống lưỡi chạm ngạc mềm chặn luồng hơi, hạ nhanh cuống lưỡi để bật luồng hơi mạnh qua khe họng, thanh quản không rung.",
      "viCompare": "Bật hơi mạnh hơn âm \"c/k\" tiếng Việt nhiều.",
      "examples": [
        {
          "word": "key",
          "ipa": "/kiː/",
          "vi": "chìa khóa"
        },
        {
          "word": "book",
          "ipa": "/bʊk/",
          "vi": "quyển sách"
        },
        {
          "word": "cake",
          "ipa": "/keɪk/",
          "vi": "bánh ngọt"
        }
      ],
      "commonErrors": "Quên bật âm /k/ ở đuôi từ (như đọc boo thay vì book, li thay vì like)."
    },
    {
      "ipa": "/ɡ/",
      "name": "Phụ âm cuống họng hữu thanh g",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Nâng cuống lưỡi chạm ngạc mềm, luồng hơi bật nhẹ đồng thời làm rung mạnh thanh quản.",
      "viCompare": "Gần giống âm \"g\" tiếng Việt nhưng có độ nổ chặn nhẹ trong cổ họng.",
      "examples": [
        {
          "word": "go",
          "ipa": "/ɡoʊ/",
          "vi": "đi"
        },
        {
          "word": "big",
          "ipa": "/bɪɡ/",
          "vi": "to lớn"
        },
        {
          "word": "good",
          "ipa": "/ɡʊd/",
          "vi": "tốt"
        }
      ],
      "commonErrors": "Nuốt mất âm /ɡ/ ở đuôi từ (như đọc bi thay vì big)."
    },
    {
      "ipa": "/f/",
      "name": "Phụ âm môi răng vô thanh f",
      "group": "consonant",
      "subgroup": "phụ âm vô thanh",
      "mouth": "Răng cửa trên chạm nhẹ vào bờ trong của môi dưới, đẩy luồng hơi ma sát qua kẽ răng và môi, thanh quản không rung.",
      "viCompare": "Gần giống âm \"ph\" tiếng Việt nhưng răng chạm môi rõ hơn và có luồng gió xì ma sát.",
      "examples": [
        {
          "word": "food",
          "ipa": "/fuːd/",
          "vi": "thức ăn"
        },
        {
          "word": "wife",
          "ipa": "/waɪf/",
          "vi": "người vợ"
        },
        {
          "word": "coffee",
          "ipa": "/ˈkɔːfi/",
          "vi": "cà phê"
        }
      ],
      "commonErrors": "Bỏ âm cuối /f/ khiến wife đọc thành wai, life đọc thành lai."
    },
    {
      "ipa": "/v/",
      "name": "Phụ âm môi răng hữu thanh v",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Khẩu hình giống hệt âm /f/ (răng trên chạm bờ môi dưới), nhưng đẩy hơi kèm theo làm rung mạnh thanh quản.",
      "viCompare": "Gần giống âm \"v\" tiếng Việt.",
      "examples": [
        {
          "word": "voice",
          "ipa": "/vɔɪs/",
          "vi": "giọng nói"
        },
        {
          "word": "five",
          "ipa": "/faɪv/",
          "vi": "số năm"
        },
        {
          "word": "love",
          "ipa": "/lʌv/",
          "vi": "yêu thích"
        }
      ],
      "commonErrors": "Bỏ quên âm rung /v/ ở cuối từ (đọc five thành fai, love thành lơ)."
    },
    {
      "ipa": "/θ/",
      "name": "Phụ âm răng vô thanh th (th thổi)",
      "group": "consonant",
      "subgroup": "phụ âm vô thanh",
      "mouth": "Đặt nhẹ đầu lưỡi vào giữa hai hàm răng trên và dưới, đẩy luồng hơi nhẹ thoát ra qua kẽ răng và lưỡi, thanh quản tuyệt đối không rung.",
      "viCompare": "Tiếng Việt hoàn toàn KHÔNG có âm này; đây là âm đặc thù nhất của tiếng Anh.",
      "examples": [
        {
          "word": "thank",
          "ipa": "/θæŋk/",
          "vi": "cảm ơn"
        },
        {
          "word": "think",
          "ipa": "/θɪŋk/",
          "vi": "suy nghĩ"
        },
        {
          "word": "mouth",
          "ipa": "/maʊθ/",
          "vi": "cái miệng"
        }
      ],
      "commonErrors": "Người Việt hay rụt lưỡi vào và đọc thành \"th\" tiếng Việt (thanh) hoặc thành \"t\" (tank) hay \"s\" (sink)."
    },
    {
      "ipa": "/ð/",
      "name": "Phụ âm răng hữu thanh th (th rung)",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Khẩu hình giống âm /θ/ (đặt đầu lưỡi giữa hai hàm răng), nhưng thổi hơi kết hợp làm rung mạnh dây thanh quản.",
      "viCompare": "Tiếng Việt không có âm này.",
      "examples": [
        {
          "word": "this",
          "ipa": "/ðɪs/",
          "vi": "đây, này"
        },
        {
          "word": "mother",
          "ipa": "/ˈmʌðər/",
          "vi": "người mẹ"
        },
        {
          "word": "they",
          "ipa": "/ðeɪ/",
          "vi": "họ"
        }
      ],
      "commonErrors": "Đọc thành âm \"d\" hoặc \"đ\" tiếng Việt (như đọc \"đít\" thay vì /ðɪs/, \"đây\" thay vì /ðeɪ/)."
    },
    {
      "ipa": "/s/",
      "name": "Phụ âm xì vô thanh s",
      "group": "consonant",
      "subgroup": "phụ âm vô thanh",
      "mouth": "Hai hàm răng khép hờ gần nhau, đầu lưỡi đặt sát nướu răng trên, đẩy luồng hơi ma sát xì mạnh qua rãnh lưỡi, thanh quản không rung.",
      "viCompare": "Gần giống âm \"x\" nhẹ tiếng Việt nhưng luồng hơi xì sắc và rõ hơn nhiều.",
      "examples": [
        {
          "word": "sun",
          "ipa": "/sʌn/",
          "vi": "mặt trời"
        },
        {
          "word": "nice",
          "ipa": "/naɪs/",
          "vi": "đẹp, tốt"
        },
        {
          "word": "bus",
          "ipa": "/bʌs/",
          "vi": "xe buýt"
        }
      ],
      "commonErrors": "Hay bỏ âm xì /s/ ở cuối từ (nice thành nai, bus thành bớt) hoặc ngược lại xì vô tội vạ ở những chỗ không có s."
    },
    {
      "ipa": "/z/",
      "name": "Phụ âm xì rung hữu thanh z",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Khẩu hình giống hệt âm /s/, nhưng đẩy hơi kết hợp làm rung mạnh dây thanh quản như tiếng ong vo ve.",
      "viCompare": "Gần giống âm \"d/gi\" trong tiếng Việt miền Bắc nhưng ma sát mạnh và rung thanh quản rõ rệt.",
      "examples": [
        {
          "word": "zoo",
          "ipa": "/zuː/",
          "vi": "sở thú"
        },
        {
          "word": "easy",
          "ipa": "/ˈiːzi/",
          "vi": "dễ dàng"
        },
        {
          "word": "nose",
          "ipa": "/noʊz/",
          "vi": "cái mũi"
        }
      ],
      "commonErrors": "Phát âm nhầm thành /s/ vô thanh ở cuối từ (như đọc nose thành nốt, please thành plít)."
    },
    {
      "ipa": "/ʃ/",
      "name": "Phụ âm xì nặng vô thanh sh",
      "group": "consonant",
      "subgroup": "phụ âm vô thanh",
      "mouth": "Môi hơi chu tròn nhô về phía trước, thân lưỡi nâng lên gần vòm miệng, đẩy luồng hơi mạnh qua khe lưỡi phát ra âm xì dày.",
      "viCompare": "Gần giống âm \"s\" nặng (uốn lưỡi) trong tiếng Việt miền Nam nhưng môi chu tròn hơn nhiều.",
      "examples": [
        {
          "word": "she",
          "ipa": "/ʃiː/",
          "vi": "cô ấy"
        },
        {
          "word": "fish",
          "ipa": "/fɪʃ/",
          "vi": "con cá"
        },
        {
          "word": "shirt",
          "ipa": "/ʃɜːrt/",
          "vi": "áo sơ mi"
        }
      ],
      "commonErrors": "Không chu tròn môi khiến âm bị dẹt thành /s/ (nhầm she thành see, shoe thành su)."
    },
    {
      "ipa": "/ʒ/",
      "name": "Phụ âm xì nặng hữu thanh zh",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Khẩu hình giống hệt âm /ʃ/ (chu tròn môi nhô phía trước), nhưng đồng thời làm rung mạnh dây thanh quản.",
      "viCompare": "Gần giống âm \"gi\" kết hợp chu tròn môi rung họng, hiếm gặp ở đầu từ trong tiếng Anh.",
      "examples": [
        {
          "word": "vision",
          "ipa": "/ˈvɪʒn/",
          "vi": "tầm nhìn"
        },
        {
          "word": "television",
          "ipa": "/ˈtelɪvɪʒn/",
          "vi": "vô tuyến"
        },
        {
          "word": "measure",
          "ipa": "/ˈmeʒər/",
          "vi": "đo lường"
        }
      ],
      "commonErrors": "Người Việt hay phát âm thành /z/ dẹt môi hoặc thành /ʃ/ mất độ rung."
    },
    {
      "ipa": "/h/",
      "name": "Phụ âm thở vô thanh h",
      "group": "consonant",
      "subgroup": "phụ âm vô thanh",
      "mouth": "Mở miệng tự nhiên, thở nhẹ một luồng hơi từ thanh môn qua vòm họng ra ngoài, thanh quản không rung.",
      "viCompare": "Rất giống âm \"h\" trong tiếng Việt.",
      "examples": [
        {
          "word": "hat",
          "ipa": "/hæt/",
          "vi": "chiếc mũ"
        },
        {
          "word": "home",
          "ipa": "/hoʊm/",
          "vi": "nhà"
        },
        {
          "word": "happy",
          "ipa": "/ˈhæpi/",
          "vi": "vui vẻ"
        }
      ],
      "commonErrors": "Phát âm âm /h/ ở những từ có chữ h câm (như hour, honest)."
    },
    {
      "ipa": "/tʃ/",
      "name": "Phụ âm bật xì vô thanh ch",
      "group": "consonant",
      "subgroup": "phụ âm vô thanh",
      "mouth": "Môi hơi chu tròn, đầu lưỡi chạm nướu răng trên chặn luồng hơi (như /t/), sau đó hạ lưỡi bật luồng hơi xì mạnh (như /ʃ/), thanh quản không rung.",
      "viCompare": "Gần giống âm \"ch\" tiếng Việt nhưng môi chu tròn hơn và bật luồng hơi xì sắc nét hơn nhiều.",
      "examples": [
        {
          "word": "chair",
          "ipa": "/tʃer/",
          "vi": "cái ghế"
        },
        {
          "word": "chicken",
          "ipa": "/ˈtʃɪkɪn/",
          "vi": "thịt gà"
        },
        {
          "word": "beach",
          "ipa": "/biːtʃ/",
          "vi": "bãi biển"
        }
      ],
      "commonErrors": "Không bật dứt khoát âm cuối khiến beach đọc thành bi, watch đọc thành oát."
    },
    {
      "ipa": "/dʒ/",
      "name": "Phụ âm bật xì hữu thanh j",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Khẩu hình giống /tʃ/ (chu tròn môi bật nổ), nhưng luồng hơi thoát ra kết hợp làm rung mạnh dây thanh quản.",
      "viCompare": "Gần giống âm \"ch\" kết hợp rung thanh quản và chu môi tròn.",
      "examples": [
        {
          "word": "job",
          "ipa": "/dʒɑːb/",
          "vi": "công việc"
        },
        {
          "word": "juice",
          "ipa": "/dʒuːs/",
          "vi": "nước ép"
        },
        {
          "word": "page",
          "ipa": "/peɪdʒ/",
          "vi": "trang sách"
        }
      ],
      "commonErrors": "Đọc thành \"d\" hoặc \"gi\" phẳng không chu môi, hoặc quên bật âm cuối /dʒ/."
    },
    {
      "ipa": "/m/",
      "name": "Phụ âm mũi ngậm môi m",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Khép kín hai môi, hạ ngạc mềm để luồng hơi thoát hoàn toàn qua đường mũi, rung dây thanh quản.",
      "viCompare": "Rất giống âm \"m\" trong tiếng Việt.",
      "examples": [
        {
          "word": "man",
          "ipa": "/mæn/",
          "vi": "người đàn ông"
        },
        {
          "word": "room",
          "ipa": "/ruːm/",
          "vi": "căn phòng"
        },
        {
          "word": "time",
          "ipa": "/taɪm/",
          "vi": "thời gian"
        }
      ],
      "commonErrors": "Quên khép chặt hai môi ở âm cuối khiến âm bị hở thành âm mũi không chuẩn."
    },
    {
      "ipa": "/n/",
      "name": "Phụ âm mũi đầu lưỡi n",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Áp đầu lưỡi sát nướu răng trên chặn miệng, luồng hơi đi hoàn toàn qua khoang mũi, rung dây thanh quản.",
      "viCompare": "Rất giống âm \"n\" trong tiếng Việt.",
      "examples": [
        {
          "word": "no",
          "ipa": "/noʊ/",
          "vi": "không"
        },
        {
          "word": "pen",
          "ipa": "/pen/",
          "vi": "cây bút"
        },
        {
          "word": "name",
          "ipa": "/neɪm/",
          "vi": "tên"
        }
      ],
      "commonErrors": "Quên áp đầu lưỡi lên chân răng trên ở âm cuối từ."
    },
    {
      "ipa": "/ŋ/",
      "name": "Phụ âm mũi ngạc mềm ng",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Nâng cuống lưỡi chạm ngạc mềm chặn khoang miệng, luồng hơi thoát hoàn toàn qua mũi, rung thanh quản.",
      "viCompare": "Rất giống âm \"ng\" trong tiếng Việt.",
      "examples": [
        {
          "word": "morning",
          "ipa": "/ˈmɔːrnɪŋ/",
          "vi": "buổi sáng"
        },
        {
          "word": "sing",
          "ipa": "/sɪŋ/",
          "vi": "ca hát"
        },
        {
          "word": "long",
          "ipa": "/lɔːŋ/",
          "vi": "dài"
        }
      ],
      "commonErrors": "Người Việt hay tự động thêm âm /k/ vào đuôi /ŋ/ (như đọc sing thành \"sing-k\")."
    },
    {
      "ipa": "/l/",
      "name": "Phụ âm bên l (Clear-L & Dark-L)",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Đầu lưỡi chạm nướu răng trên, luồng hơi thoát ra hai bên cạnh lưỡi. Ở cuối từ (Dark-L), cuống lưỡi nâng nhẹ tạo âm trầm uốn.",
      "viCompare": "Clear-L đầu từ giống \"l\" tiếng Việt; Dark-L cuối từ đòi hỏi cuộn cuống lưỡi không có trong tiếng Việt.",
      "examples": [
        {
          "word": "like",
          "ipa": "/laɪk/",
          "vi": "thích"
        },
        {
          "word": "school",
          "ipa": "/skuːl/",
          "vi": "trường học"
        },
        {
          "word": "apple",
          "ipa": "/ˈæpl/",
          "vi": "quả táo"
        }
      ],
      "commonErrors": "Đọc Dark-L cuối từ thành \"u\" hoặc \"ồ\" (như school đọc thành \"s-ku\", apple thành \"ép-pồ\")."
    },
    {
      "ipa": "/r/",
      "name": "Phụ âm cuộn lưỡi r",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Môi hơi chu nhẹ, đầu lưỡi uốn cong ngược về phía sau vòm họng nhưng KHÔNG chạm vào vòm miệng, luồng hơi lướt qua.",
      "viCompare": "Không rung bật như \"r\" tiếng Việt; đầu lưỡi treo lơ lửng không tiếp xúc với ngạc miệng.",
      "examples": [
        {
          "word": "read",
          "ipa": "/riːd/",
          "vi": "đọc"
        },
        {
          "word": "red",
          "ipa": "/red/",
          "vi": "màu đỏ"
        },
        {
          "word": "room",
          "ipa": "/ruːm/",
          "vi": "căn phòng"
        }
      ],
      "commonErrors": "Rung lưỡi quá đà như \"r\" tiếng Việt hoặc để lưỡi chạm vào ngạc biến thành âm /l/ (nhầm red thành led)."
    },
    {
      "ipa": "/w/",
      "name": "Bán nguyên âm môi tròn w",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Môi chu tròn nhỏ về phía trước như chuẩn bị thổi sáo, sau đó mở nhanh miệng phát âm chuyển sang nguyên âm theo sau.",
      "viCompare": "Gần giống âm \"qu\" hoặc \"o\" đệm trong tiếng Việt (như trong \"hoa\").",
      "examples": [
        {
          "word": "water",
          "ipa": "/ˈwɔːtər/",
          "vi": "nước"
        },
        {
          "word": "we",
          "ipa": "/wiː/",
          "vi": "chúng tôi"
        },
        {
          "word": "walk",
          "ipa": "/wɔːk/",
          "vi": "đi bộ"
        }
      ],
      "commonErrors": "Răng trên cắn môi dưới phát âm thành /v/ (nhầm wet thành vet, wine thành vine)."
    },
    {
      "ipa": "/j/",
      "name": "Bán nguyên âm vòm miệng y",
      "group": "consonant",
      "subgroup": "phụ âm hữu thanh",
      "mouth": "Nâng thân lưỡi lên sát vòm miệng cứng như tư thế âm /iː/, sau đó hạ nhanh lưỡi lướt sang nguyên âm tiếp theo.",
      "viCompare": "Gần giống âm \"d/gi\" trong tiếng Việt miền Nam (như \"da\", \"dù\").",
      "examples": [
        {
          "word": "yes",
          "ipa": "/jes/",
          "vi": "vâng, có"
        },
        {
          "word": "you",
          "ipa": "/juː/",
          "vi": "bạn"
        },
        {
          "word": "young",
          "ipa": "/jʌŋ/",
          "vi": "trẻ"
        }
      ],
      "commonErrors": "Đọc thành âm \"d\" đanh cứng của miền Bắc hoặc âm \"z\"."
    }
  ],
  "minimalPairs": [
    {
      "id": "mp01",
      "soundA": "/ɪ/",
      "soundB": "/iː/",
      "wordA": {
        "word": "ship",
        "ipa": "/ʃɪp/",
        "vi": "tàu thủy"
      },
      "wordB": {
        "word": "sheep",
        "ipa": "/ʃiːp/",
        "vi": "con cừu"
      },
      "tip": "Âm /ɪ/ thả lỏng miệng phát âm dứt khoát; âm /iː/ kéo căng khóe miệng như mỉm cười và ngân dài."
    },
    {
      "id": "mp02",
      "soundA": "/ɪ/",
      "soundB": "/iː/",
      "wordA": {
        "word": "sit",
        "ipa": "/sɪt/",
        "vi": "ngồi"
      },
      "wordB": {
        "word": "seat",
        "ipa": "/siːt/",
        "vi": "chỗ ngồi"
      },
      "tip": "Sit dùng âm ngắn thả lỏng; seat dùng âm dài căng khóe miệng."
    },
    {
      "id": "mp03",
      "soundA": "/e/",
      "soundB": "/æ/",
      "wordA": {
        "word": "bed",
        "ipa": "/bed/",
        "vi": "chiếc giường"
      },
      "wordB": {
        "word": "bad",
        "ipa": "/bæd/",
        "vi": "xấu, tồi"
      },
      "tip": "Bed mở miệng vừa phải; bad mở to hết cỡ cả chiều dọc lẫn chiều ngang."
    },
    {
      "id": "mp04",
      "soundA": "/e/",
      "soundB": "/æ/",
      "wordA": {
        "word": "men",
        "ipa": "/men/",
        "vi": "những người đàn ông"
      },
      "wordB": {
        "word": "man",
        "ipa": "/mæn/",
        "vi": "người đàn ông (số ít)"
      },
      "tip": "Men dùng âm /e/ mở vừa; man dùng âm /æ/ hạ sâu quai hàm."
    },
    {
      "id": "mp05",
      "soundA": "/e/",
      "soundB": "/æ/",
      "wordA": {
        "word": "pen",
        "ipa": "/pen/",
        "vi": "cây bút"
      },
      "wordB": {
        "word": "pan",
        "ipa": "/pæn/",
        "vi": "cái chảo"
      },
      "tip": "Phân biệt khẩu hình mở hẹp ở pen và mở rộng ở pan."
    },
    {
      "id": "mp06",
      "soundA": "/ʌ/",
      "soundB": "/ɑː/",
      "wordA": {
        "word": "cup",
        "ipa": "/kʌp/",
        "vi": "cái tách"
      },
      "wordB": {
        "word": "carp",
        "ipa": "/kɑːrp/",
        "vi": "cá chép"
      },
      "tip": "Cup phát âm ngắn nhanh; carp mở sâu cổ họng và uốn lưỡi âm r."
    },
    {
      "id": "mp07",
      "soundA": "/ʊ/",
      "soundB": "/uː/",
      "wordA": {
        "word": "pull",
        "ipa": "/pʊl/",
        "vi": "kéo"
      },
      "wordB": {
        "word": "pool",
        "ipa": "/puːl/",
        "vi": "hồ bơi"
      },
      "tip": "Pull thả lỏng môi không chu chặt; pool chu tròn môi nhỏ và ngân dài."
    },
    {
      "id": "mp08",
      "soundA": "/ʊ/",
      "soundB": "/uː/",
      "wordA": {
        "word": "full",
        "ipa": "/fʊl/",
        "vi": "đầy, no"
      },
      "wordB": {
        "word": "fool",
        "ipa": "/fuːl/",
        "vi": "kẻ ngốc"
      },
      "tip": "Full phát âm ngắn; fool kéo dài âm u môi chu tròn."
    },
    {
      "id": "mp09",
      "soundA": "/θ/",
      "soundB": "/s/",
      "wordA": {
        "word": "think",
        "ipa": "/θɪŋk/",
        "vi": "suy nghĩ"
      },
      "wordB": {
        "word": "sink",
        "ipa": "/sɪŋk/",
        "vi": "bồn rửa, chìm"
      },
      "tip": "Think bắt buộc phải thè đầu lưỡi ra giữa 2 răng thổi hơi; sink giữ lưỡi bên trong xì hơi."
    },
    {
      "id": "mp10",
      "soundA": "/θ/",
      "soundB": "/s/",
      "wordA": {
        "word": "thank",
        "ipa": "/θæŋk/",
        "vi": "cảm ơn"
      },
      "wordB": {
        "word": "sank",
        "ipa": "/sæŋk/",
        "vi": "đã chìm"
      },
      "tip": "Thè lưỡi thổi hơi nhẹ cho thank, không thụt lưỡi vào phát âm thành sank."
    },
    {
      "id": "mp11",
      "soundA": "/θ/",
      "soundB": "/t/",
      "wordA": {
        "word": "three",
        "ipa": "/θriː/",
        "vi": "số ba"
      },
      "wordB": {
        "word": "tree",
        "ipa": "/triː/",
        "vi": "cái cây"
      },
      "tip": "Three đặt lưỡi kẹp giữa răng; tree đầu lưỡi chạm chân răng trên uốn âm tr."
    },
    {
      "id": "mp12",
      "soundA": "/ð/",
      "soundB": "/d/",
      "wordA": {
        "word": "they",
        "ipa": "/ðeɪ/",
        "vi": "họ"
      },
      "wordB": {
        "word": "day",
        "ipa": "/deɪ/",
        "vi": "ngày"
      },
      "tip": "They kẹp đầu lưỡi giữa hai hàm răng và làm rung; day đặt đầu lưỡi sau chân răng trên."
    },
    {
      "id": "mp13",
      "soundA": "/l/",
      "soundB": "/r/",
      "wordA": {
        "word": "light",
        "ipa": "/laɪt/",
        "vi": "ánh sáng, nhẹ"
      },
      "wordB": {
        "word": "right",
        "ipa": "/raɪt/",
        "vi": "bên phải, đúng"
      },
      "tip": "Light đầu lưỡi chạm nướu răng trên; right cuộn đầu lưỡi lơ lửng không chạm vòm họng."
    },
    {
      "id": "mp14",
      "soundA": "/w/",
      "soundB": "/v/",
      "wordA": {
        "word": "wet",
        "ipa": "/wet/",
        "vi": "ẩm ướt"
      },
      "wordB": {
        "word": "vet",
        "ipa": "/vet/",
        "vi": "bác sĩ thú y"
      },
      "tip": "Wet chu hai môi tròn không để răng chạm; vet răng cửa trên cắn nhẹ môi dưới rung hơi."
    },
    {
      "id": "mp15",
      "soundA": "/w/",
      "soundB": "/v/",
      "wordA": {
        "word": "wine",
        "ipa": "/waɪn/",
        "vi": "rượu vang"
      },
      "wordB": {
        "word": "vine",
        "ipa": "/vaɪn/",
        "vi": "cây dây leo"
      },
      "tip": "Wine mở môi tròn; vine răng trên cắn môi dưới."
    },
    {
      "id": "mp16",
      "soundA": "/s/",
      "soundB": "/ʃ/",
      "wordA": {
        "word": "see",
        "ipa": "/siː/",
        "vi": "nhìn thấy"
      },
      "wordB": {
        "word": "she",
        "ipa": "/ʃiː/",
        "vi": "cô ấy"
      },
      "tip": "See dẹt môi xì nhẹ; she chu tròn môi về phía trước thổi luồng gió dày."
    },
    {
      "id": "mp17",
      "soundA": "/s/",
      "soundB": "/z/",
      "wordA": {
        "word": "bus",
        "ipa": "/bʌs/",
        "vi": "xe buýt"
      },
      "wordB": {
        "word": "buzz",
        "ipa": "/bʌz/",
        "vi": "tiếng vo ve"
      },
      "tip": "Bus đuôi xì hơi không rung dây thanh quản; buzz đuôi rung mạnh thanh quản như tiếng ong kêu."
    },
    {
      "id": "mp18",
      "soundA": "/tʃ/",
      "soundB": "/dʒ/",
      "wordA": {
        "word": "cheap",
        "ipa": "/tʃiːp/",
        "vi": "rẻ tiền"
      },
      "wordB": {
        "word": "jeep",
        "ipa": "/dʒiːp/",
        "vi": "xe giáp"
      },
      "tip": "Cheap chu môi bật luồng hơi vô thanh; jeep chu môi bật luồng hơi hữu thanh rung cổ họng."
    },
    {
      "id": "mp19",
      "soundA": "/p/",
      "soundB": "/b/",
      "wordA": {
        "word": "pig",
        "ipa": "/pɪɡ/",
        "vi": "con lợn"
      },
      "wordB": {
        "word": "big",
        "ipa": "/bɪɡ/",
        "vi": "to lớn"
      },
      "tip": "Pig bật hơi mạnh làm bay tờ giấy; big bật nhẹ rung thanh quản không tạo luồng gió mạnh."
    },
    {
      "id": "mp20",
      "soundA": "/eɪ/",
      "soundB": "/e/",
      "wordA": {
        "word": "taste",
        "ipa": "/teɪst/",
        "vi": "nếm, vị giác"
      },
      "wordB": {
        "word": "test",
        "ipa": "/test/",
        "vi": "bài kiểm tra"
      },
      "tip": "Taste dùng nguyên âm đôi /eɪ/ lướt mỉm cười; test dùng nguyên âm ngắn /e/ dứt khoát."
    }
  ],
  "finalSounds": {
    "s_z_iz": {
      "title": "Quy tắc phát âm đuôi -s và -es (Số nhiều & Động từ ngôi thứ ba số ít)",
      "rules": [
        {
          "sound": "/s/",
          "condition": "Đứng sau các phụ âm vô thanh: /p/, /t/, /k/, /f/, /θ/",
          "mnemonic": "Mẹo nhớ: \"Thời phong kiến phương tây\" (th, p, k, f, t)",
          "examples": [
            {
              "word": "cats",
              "ipa": "/kæts/",
              "vi": "những con mèo"
            },
            {
              "word": "books",
              "ipa": "/bʊks/",
              "vi": "những cuốn sách"
            },
            {
              "word": "stops",
              "ipa": "/stɑːps/",
              "vi": "dừng lại"
            },
            {
              "word": "laughs",
              "ipa": "/læfs/",
              "vi": "cười"
            }
          ]
        },
        {
          "sound": "/ɪz/",
          "condition": "Đứng sau các âm gió / xuýt: /s/, /z/, /ʃ/, /ʒ/, /tʃ/, /dʒ/",
          "mnemonic": "Mẹo nhớ: \"Sóng gió chẳng sợ zó giông\"",
          "examples": [
            {
              "word": "buses",
              "ipa": "/ˈbʌsɪz/",
              "vi": "những chiếc xe buýt"
            },
            {
              "word": "watches",
              "ipa": "/ˈwɑːtʃɪz/",
              "vi": "những chiếc đồng hồ"
            },
            {
              "word": "boxes",
              "ipa": "/ˈbɑːksɪz/",
              "vi": "những chiếc hộp"
            },
            {
              "word": "changes",
              "ipa": "/ˈtʃeɪndʒɪz/",
              "vi": "những thay đổi"
            }
          ]
        },
        {
          "sound": "/z/",
          "condition": "Đứng sau các nguyên âm và phụ âm hữu thanh còn lại: /b/, /d/, /ɡ/, /v/, /ð/, /m/, /n/, /ŋ/, /l/, /r/, v.v.",
          "mnemonic": "Tất cả các trường hợp còn lại",
          "examples": [
            {
              "word": "dogs",
              "ipa": "/dɔːɡz/",
              "vi": "những con chó"
            },
            {
              "word": "days",
              "ipa": "/deɪz/",
              "vi": "những ngày"
            },
            {
              "word": "rooms",
              "ipa": "/ruːmz/",
              "vi": "những căn phòng"
            },
            {
              "word": "lives",
              "ipa": "/lɪvz/",
              "vi": "sinh sống"
            }
          ]
        }
      ],
      "viNote": "Lỗi rất lớn của người Việt: thường bỏ quên hoàn toàn đuôi -s/-es, hoặc luôn phát âm thành /s/ cho mọi từ mà không biến âm thành /z/ hay /ɪz/."
    },
    "t_d_id": {
      "title": "Quy tắc phát âm đuôi -ed (Quá khứ đơn & Phân từ hai)",
      "rules": [
        {
          "sound": "/ɪd/",
          "condition": "Đứng sau tận cùng là âm /t/ hoặc /d/",
          "mnemonic": "Mẹo nhớ: \"Tiền đô\" (/t/ và /d/)",
          "examples": [
            {
              "word": "wanted",
              "ipa": "/ˈwɑːntɪd/",
              "vi": "đã muốn"
            },
            {
              "word": "needed",
              "ipa": "/ˈniːdɪd/",
              "vi": "đã cần"
            },
            {
              "word": "started",
              "ipa": "/ˈstɑːrtɪd/",
              "vi": "đã bắt đầu"
            },
            {
              "word": "visited",
              "ipa": "/ˈvɪzɪtɪd/",
              "vi": "đã ghé thăm"
            }
          ]
        },
        {
          "sound": "/t/",
          "condition": "Đứng sau các phụ âm vô thanh: /p/, /k/, /f/, /s/, /ʃ/, /tʃ/",
          "mnemonic": "Mẹo nhớ: \"Chính phủ phát sách không thiếu\"",
          "examples": [
            {
              "word": "stopped",
              "ipa": "/stɑːpt/",
              "vi": "đã dừng lại"
            },
            {
              "word": "looked",
              "ipa": "/lʊkt/",
              "vi": "đã nhìn"
            },
            {
              "word": "washed",
              "ipa": "/wɑːʃt/",
              "vi": "đã rửa / giặt"
            },
            {
              "word": "watched",
              "ipa": "/wɑːtʃt/",
              "vi": "đã xem"
            }
          ]
        },
        {
          "sound": "/d/",
          "condition": "Đứng sau các nguyên âm và phụ âm hữu thanh còn lại: /b/, /ɡ/, /v/, /z/, /ʒ/, /dʒ/, /m/, /n/, /ŋ/, /l/, /r/, v.v.",
          "mnemonic": "Tất cả các trường hợp còn lại",
          "examples": [
            {
              "word": "played",
              "ipa": "/pleɪd/",
              "vi": "đã chơi"
            },
            {
              "word": "lived",
              "ipa": "/lɪvd/",
              "vi": "đã sống"
            },
            {
              "word": "cleaned",
              "ipa": "/kliːnd/",
              "vi": "đã lau chùi"
            },
            {
              "word": "called",
              "ipa": "/kɔːld/",
              "vi": "đã gọi điện"
            }
          ]
        }
      ],
      "viNote": "Lỗi thường gặp: người Việt hay phát âm đuôi -ed thành âm \"đờ\" hoặc \"ịt\" rời rạc cho tất cả các từ thay vì chỉ bật một âm chặn nhẹ /t/ hoặc /d/."
    },
    "unreleasedStop": {
      "title": "Âm cuối bị nuốt / chặn hơi (Unreleased Stop Consonants: /p/, /t/, /k/, /b/, /d/, /ɡ/)",
      "description": "Trong giao tiếp đời thường (đặc biệt là tiếng Anh-Mỹ), khi một phụ âm chặn đứng ở cuối từ hoặc đứng trước một phụ âm khác, người bản xứ thường chỉ đưa khẩu hình vào vị trí chặn luồng hơi (glottal stop / unreleased stop) mà không mở ra bật nổ. Điều này giúp câu nói liền mạch và tự nhiên.",
      "examples": [
        {
          "phrase": "stop that",
          "phonetic": "/stɑːp̚ ðæt̚/",
          "explanation": "Môi khép lại ở âm /p/ để chặn luồng hơi, không bật \"pờ\", rồi chuyển ngay sang âm /ð/."
        },
        {
          "phrase": "hot dog",
          "phonetic": "/hɑːt̚ dɔːɡ/",
          "explanation": "Đầu lưỡi chạm nướu răng chặn hơi ở âm /t/ của \"hot\", không bật hơi, rồi mở ra ở âm /d/ của \"dog\"."
        },
        {
          "phrase": "black coffee",
          "phonetic": "/blæk̚ ˈkɔːfi/",
          "explanation": "Cuống lưỡi nâng chặn hơi ở /k/ của \"black\", giữ hơi và bật một lần ở /k/ của \"coffee\"."
        }
      ],
      "viNote": "Người Việt cần tránh 2 thái cực: bỏ hẳn âm cuối làm mất từ, hoặc bật nổ quá mạnh làm ngắt quãng câu."
    }
  },
  "stress": {
    "title": "Quy tắc Nhấn Trọng âm (Word Stress & Sentence Stress)",
    "wordStressRules": [
      {
        "rule": "Danh từ và Tính từ có 2 âm tiết thường nhấn âm tiết THỨ NHẤT",
        "examples": [
          {
            "word": "table",
            "ipa": "/ˈteɪbl/",
            "note": "Danh từ"
          },
          {
            "word": "morning",
            "ipa": "/ˈmɔːrnɪŋ/",
            "note": "Danh từ"
          },
          {
            "word": "happy",
            "ipa": "/ˈhæpi/",
            "note": "Tính từ"
          },
          {
            "word": "clever",
            "ipa": "/ˈklevər/",
            "note": "Tính từ"
          }
        ]
      },
      {
        "rule": "Động từ có 2 âm tiết thường nhấn âm tiết THỨ HAI",
        "examples": [
          {
            "word": "relax",
            "ipa": "/rɪˈlæks/",
            "note": "Động từ"
          },
          {
            "word": "arrive",
            "ipa": "/əˈraɪv/",
            "note": "Động từ"
          },
          {
            "word": "forget",
            "ipa": "/fərˈɡet/",
            "note": "Động từ"
          },
          {
            "word": "begin",
            "ipa": "/bɪˈɡɪn/",
            "note": "Động từ"
          }
        ]
      },
      {
        "rule": "Từ có đuôi -tion, -sion, -ic nhấn vào âm tiết NGAY TRƯỚC NÓ",
        "examples": [
          {
            "word": "station",
            "ipa": "/ˈsteɪʃn/",
            "note": "Nhấn trước -tion"
          },
          {
            "word": "decision",
            "ipa": "/dɪˈsɪʒn/",
            "note": "Nhấn trước -sion"
          },
          {
            "word": "music",
            "ipa": "/ˈmjuːzɪk/",
            "note": "Nhấn trước -ic"
          }
        ]
      },
      {
        "rule": "Danh từ ghép (Noun + Noun) thường nhấn vào TỪ THỨ NHẤT",
        "examples": [
          {
            "word": "notebook",
            "ipa": "/ˈnoʊtbʊk/",
            "note": "note + book"
          },
          {
            "word": "airport",
            "ipa": "/ˈerpɔːrt/",
            "note": "air + port"
          },
          {
            "word": "bedroom",
            "ipa": "/ˈbedruːm/",
            "note": "bed + room"
          }
        ]
      }
    ],
    "sentenceStress": {
      "explanation": "Trong câu tiếng Anh, từ mang nội dung (danh từ, động từ chính, tính từ, trạng từ) được nhấn mạnh, đọc to và rõ; từ ngữ pháp (mạo từ, giới từ, đại từ, trợ động từ) đọc lướt nhanh và chuyển thành âm yếu (schwa /ə/).",
      "example": {
        "sentence": "I WANT to BUY a NEW CAR.",
        "stressedWords": [
          "WANT",
          "BUY",
          "NEW",
          "CAR"
        ],
        "unstressedWords": [
          "I",
          "to",
          "a"
        ]
      }
    }
  },
  "linking": {
    "title": "Quy tắc Nối âm (Connected Speech & Linking)",
    "rules": [
      {
        "type": "Consonant to Vowel (Phụ âm nối Nguyên âm)",
        "description": "Khi từ đi trước kết thúc bằng phụ âm và từ đi sau bắt đầu bằng nguyên âm, phụ âm cuối nối trực tiếp sang nguyên âm.",
        "examples": [
          {
            "phrase": "turn on",
            "phonetic": "/tɜːr.nɑːn/",
            "vi": "bật lên"
          },
          {
            "phrase": "hold on",
            "phonetic": "/hoʊl.dɑːn/",
            "vi": "chờ một chút"
          },
          {
            "phrase": "read a book",
            "phonetic": "/riː.də.bʊk/",
            "vi": "đọc sách"
          }
        ]
      },
      {
        "type": "Vowel to Vowel (Nguyên âm nối Nguyên âm qua /w/ hoặc /j/)",
        "description": "Khi từ trước kết thúc bằng nguyên âm tròn môi (/uː/, /oʊ/), thêm bán âm /w/ lướt nhẹ; khi kết thúc bằng nguyên âm dẹt môi (/iː/, /eɪ/, /aɪ/), thêm bán âm /j/.",
        "examples": [
          {
            "phrase": "go out",
            "phonetic": "/ɡoʊ-w-aʊt/",
            "vi": "đi ra ngoài"
          },
          {
            "phrase": "do it",
            "phonetic": "/duː-w-ɪt/",
            "vi": "làm việc đó"
          },
          {
            "phrase": "see it",
            "phonetic": "/siː-j-ɪt/",
            "vi": "nhìn thấy nó"
          }
        ]
      },
      {
        "type": "Flap-T (Âm vỗ T trong tiếng Anh-Mỹ)",
        "description": "Trong tiếng Anh-Mỹ, khi âm /t/ hoặc /d/ đứng giữa 2 nguyên âm và không mang trọng âm, nó được phát âm vỗ nhẹ như âm \"d\" mềm.",
        "examples": [
          {
            "phrase": "water",
            "phonetic": "/ˈwɔːɾər/",
            "vi": "nước"
          },
          {
            "phrase": "city",
            "phonetic": "/ˈsɪɾi/",
            "vi": "thành phố"
          },
          {
            "phrase": "get out",
            "phonetic": "/ɡeɾ-aʊt/",
            "vi": "đi ra"
          }
        ]
      }
    ]
  }
};
window.PHONICS_EN = window.EN_PHONICS;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.EN_PHONICS;
}
