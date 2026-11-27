/**
 * data/ja/kana.js
 * Cơ sở dữ liệu 2 bảng chữ cái tiếng Nhật (46 Hiragana + 46 Katakana),
 * Biến âm Dakuten, Bán đục Handakuten, Âm ghép Yōon,
 * Hệ thống Romaji Hepburn chuẩn, Mẹo ghi nhớ hình ảnh dành riêng cho người Việt,
 * Các cặp chữ dễ nhầm lẫn (シ/ツ, ソ/ン, ぬ/め, わ/ね/れ...),
 * Quy tắc phát âm: Âm ngắt っ, Trường âm, Biến âm chữ ん, Trợ từ は/へ/を,
 * và Các cặp âm tối thiểu dễ nhầm lẫn (Minimal Pairs) cho người Việt học tiếng Nhật.
 */

if (typeof window === 'undefined') {
  global.window = global;
}

(function () {
  'use strict';

  const KANA_DATA = {
  "hiragana": [
    {
      "kana": "あ",
      "romaji": "a",
      "ipa": "/a/",
      "name": "Hiragana あ (a)",
      "row": "a",
      "strokes": 3,
      "mnemonic": "Nét ngang và nét dọc giao nhau, nét thứ 3 uốn bụng tròn to như một quả táo đỏ chín mọng (Apple/An).",
      "mouth": "Mở miệng tự nhiên vừa phải, hạ hàm nhẹ, phát âm rõ ràng, không mở quá to như chữ A tiếng Việt.",
      "viCompare": "Gần giống âm 'a' trong tiếng Việt nhưng khẩu hình tròn và hơi thu gọn hơn một chút.",
      "examples": [
        {
          "word": "あさ",
          "romaji": "asa",
          "vi": "buổi sáng"
        },
        {
          "word": "あめ",
          "romaji": "ame",
          "vi": "mưa / kẹo"
        },
        {
          "word": "ありがとう",
          "romaji": "arigatou",
          "vi": "cảm ơn"
        }
      ],
      "commonErrors": "Người Việt hay mở khẩu hình quá rộng giống âm /a:/ dài hoặc gán dấu thanh tiếng Việt."
    },
    {
      "kana": "い",
      "romaji": "i",
      "ipa": "/i/",
      "name": "Hiragana い (i)",
      "row": "a",
      "strokes": 2,
      "mnemonic": "Hai nét song song hơi cong như hai nhánh tre hoặc hai que kem mát lạnh dựng đứng (Kem Ý).",
      "mouth": "Khóe miệng kéo sang hai bên nhẹ nhàng như đang mỉm cười, lưỡi nâng cao về vòm miệng cứng.",
      "viCompare": "Gần giống âm 'i' trong tiếng Việt nhưng dứt khoát và ngắn gọn.",
      "examples": [
        {
          "word": "いぬ",
          "romaji": "inu",
          "vi": "con chó"
        },
        {
          "word": "いえ",
          "romaji": "ie",
          "vi": "ngôi nhà"
        },
        {
          "word": "いま",
          "romaji": "ima",
          "vi": "bây giờ"
        }
      ],
      "commonErrors": "Không kéo căng khóe miệng khiến âm bị đục hoặc kéo dài thành trường âm ii."
    },
    {
      "kana": "う",
      "romaji": "u",
      "ipa": "/ɯ/",
      "name": "Hiragana う (u)",
      "row": "a",
      "strokes": 2,
      "mnemonic": "Nét phẩy trên đầu và thân chữ uốn cong bên dưới như lưng một ông lão còng lưng cúi xuống (Uốn cong).",
      "mouth": "Không chu môi tròn về phía trước như 'u' tiếng Việt! Môi thả lỏng hơi bẹt dẹt, phát âm ở khoảng giữa 'u' và 'ư'.",
      "viCompare": "Lai giữa âm 'u' và 'ư' trong tiếng Việt; môi không chu tròn mà thả lỏng dẹt tự nhiên.",
      "examples": [
        {
          "word": "うみ",
          "romaji": "umi",
          "vi": "biển cả"
        },
        {
          "word": "うた",
          "romaji": "uta",
          "vi": "bài hát"
        },
        {
          "word": "うち",
          "romaji": "uchi",
          "vi": "nhà mình / bên trong"
        }
      ],
      "commonErrors": "Lỗi kinh điển của người Việt là chu môi tròn vo thành âm /u/ tiếng Việt khiến giọng mất tự nhiên."
    },
    {
      "kana": "え",
      "romaji": "e",
      "ipa": "/e/",
      "name": "Hiragana え (e)",
      "row": "a",
      "strokes": 2,
      "mnemonic": "Nét gạch trên đầu và thân chữ zic-zac uốn lượn như cánh chim én đang lượn bay (Chim Én / Em bé).",
      "mouth": "Miệng mở rộng vừa phải, khóe miệng kéo nhẹ sang hai bên, mặt lưỡi hơi nâng cao.",
      "viCompare": "Gần giống âm 'ê' nhẹ trong tiếng Việt (giữa 'e' và 'ê', thiên về 'ê').",
      "examples": [
        {
          "word": "えき",
          "romaji": "eki",
          "vi": "nhà ga"
        },
        {
          "word": "えん",
          "romaji": "en",
          "vi": "đồng Yên Nhật"
        },
        {
          "word": "えんぴつ",
          "romaji": "enpitsu",
          "vi": "bút chì"
        }
      ],
      "commonErrors": "Phát âm thành âm 'e' bẹt tiếng Việt (như trong 'mẹ') thay vì âm 'ê' thanh thoát."
    },
    {
      "kana": "お",
      "romaji": "o",
      "ipa": "/o/",
      "name": "Hiragana お (o)",
      "row": "a",
      "strokes": 3,
      "mnemonic": "Nét ngang, nét dọc có bụng tròn và dấu phẩy bên phải như người đang ôm quả bóng to tròn (Ôm bóng).",
      "mouth": "Môi hơi tròn nhưng không chu dài ra trước, hạ hàm dưới nhẹ nhàng, cuống lưỡi hơi nâng.",
      "viCompare": "Gần giống âm 'ô' trong tiếng Việt (giữa 'o' và 'ô', thiên về 'ô' gọn gàng).",
      "examples": [
        {
          "word": "おかね",
          "romaji": "okane",
          "vi": "tiền bạc"
        },
        {
          "word": "おちゃ",
          "romaji": "ocha",
          "vi": "nước trà"
        },
        {
          "word": "おんがく",
          "romaji": "ongaku",
          "vi": "âm nhạc"
        }
      ],
      "commonErrors": "Đọc thành âm 'o' mở to miệng của tiếng Việt thay vì âm 'ô' gọn gàng."
    },
    {
      "kana": "か",
      "romaji": "ka",
      "ipa": "/ka/",
      "name": "Hiragana か (ka)",
      "row": "ka",
      "strokes": 3,
      "mnemonic": "Nét móc và nét chém bên trong kèm dấu phẩy như chiếc ca uống nước có quai cầm (Cái Ca).",
      "mouth": "Gốc lưỡi chạm vào ngạc mềm rồi bật nhẹ luồng hơi ra kết hợp với nguyên âm a, không bật hơi quá mạnh.",
      "viCompare": "Gần giống âm 'ca' tiếng Việt nhưng không nhấn giọng nặng.",
      "examples": [
        {
          "word": "かわ",
          "romaji": "kawa",
          "vi": "con sông"
        },
        {
          "word": "かさ",
          "romaji": "kasa",
          "vi": "chiếc ô / dù"
        },
        {
          "word": "かぞく",
          "romaji": "kazoku",
          "vi": "gia đình"
        }
      ],
      "commonErrors": "Bật hơi quá mạnh thành 'kha' hoặc đọc nặng thành 'cạ'."
    },
    {
      "kana": "き",
      "romaji": "ki",
      "ipa": "/ki/",
      "name": "Hiragana き (ki)",
      "row": "ka",
      "strokes": 4,
      "mnemonic": "Hai nét ngang song song, nét dọc chém xuyên và vòng cung đáy như chiếc chìa khóa cổ (Key - Ki).",
      "mouth": "Mặt lưỡi áp sát ngạc cứng, miệng mở bè sang hai bên như cười rồi phát âm ki gọn gàng.",
      "viCompare": "Gần giống âm 'ki' tiếng Việt.",
      "examples": [
        {
          "word": "き",
          "romaji": "ki",
          "vi": "cái cây"
        },
        {
          "word": "きっぷ",
          "romaji": "kippu",
          "vi": "vé xe/vé tàu"
        },
        {
          "word": "きょう",
          "romaji": "kyou",
          "vi": "hôm nay"
        }
      ],
      "commonErrors": "Đọc kéo dài hoặc quên tách rời nét cong phía dưới khi viết tay."
    },
    {
      "kana": "く",
      "romaji": "ku",
      "ipa": "/kɯ/",
      "name": "Hiragana く (ku)",
      "row": "ka",
      "strokes": 1,
      "mnemonic": "Chỉ một nét gập nhọn hoắt như chiếc mỏ chim bồ câu đang há ra kêu cúc cu (Cúc cu).",
      "mouth": "Phát âm âm /k/ kết hợp nguyên âm /ɯ/, môi dẹt thả lỏng không chu tròn.",
      "viCompare": "Giống âm 'kư'/'ku' nhẹ trong tiếng Việt nhưng dẹt môi.",
      "examples": [
        {
          "word": "くるま",
          "romaji": "kuruma",
          "vi": "xe ô tô"
        },
        {
          "word": "くち",
          "romaji": "kuchi",
          "vi": "cái miệng"
        },
        {
          "word": "くに",
          "romaji": "kuni",
          "vi": "đất nước"
        }
      ],
      "commonErrors": "Chu môi tròn tạo thành âm 'cu' tiếng Việt."
    },
    {
      "kana": "け",
      "romaji": "ke",
      "ipa": "/ke/",
      "name": "Hiragana け (ke)",
      "row": "ka",
      "strokes": 3,
      "mnemonic": "Nét sổ cong bên trái và chữ thập bên phải giống cây tre và chiếc kệ gỗ vững chãi (Kệ sách).",
      "mouth": "Bật nhẹ âm /k/ rồi chuyển nhanh sang nguyên âm /e/ (ê).",
      "viCompare": "Gần giống âm 'kê' trong tiếng Việt.",
      "examples": [
        {
          "word": "けさ",
          "romaji": "kesa",
          "vi": "sáng nay"
        },
        {
          "word": "けいさつ",
          "romaji": "keisatsu",
          "vi": "cảnh sát"
        },
        {
          "word": "けっこん",
          "romaji": "kekkon",
          "vi": "kết hôn"
        }
      ],
      "commonErrors": "Đọc thành 'ke' tiếng Việt thay vì 'kê'."
    },
    {
      "kana": "こ",
      "romaji": "ko",
      "ipa": "/ko/",
      "name": "Hiragana こ (ko)",
      "row": "ka",
      "strokes": 2,
      "mnemonic": "Hai nét ngang uốn cong nhẹ đối xứng trên dưới như hai khúc gỗ xếp chồng hoặc miệng cốc nhỏ (Cốc nhỏ).",
      "mouth": "Bật nhẹ âm /k/ kết hợp nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống âm 'cô' trong tiếng Việt.",
      "examples": [
        {
          "word": "こども",
          "romaji": "kodomo",
          "vi": "trẻ em"
        },
        {
          "word": "こえ",
          "romaji": "koe",
          "vi": "tiếng nói"
        },
        {
          "word": "ここ",
          "romaji": "koko",
          "vi": "ở đây"
        }
      ],
      "commonErrors": "Phát âm thành 'co' thay vì 'cô'."
    },
    {
      "kana": "さ",
      "romaji": "sa",
      "ipa": "/sa/",
      "name": "Hiragana さ (sa)",
      "row": "sa",
      "strokes": 3,
      "mnemonic": "Nét ngang chéo, nét cắt và nét uốn bụng quay sang phải như chén rượu Sake đang được rót tràn đầy.",
      "mouth": "Đầu lưỡi đặt gần chân răng trên, đẩy luồng hơi xì nhẹ qua kẽ răng rồi mở sang nguyên âm a.",
      "viCompare": "Gần giống âm 'x' nhẹ tiếng Việt (như trong 'xa xôi'), không uốn cong lưỡi như 's'.",
      "examples": [
        {
          "word": "さくら",
          "romaji": "sakura",
          "vi": "hoa anh đào"
        },
        {
          "word": "さかな",
          "romaji": "sakana",
          "vi": "con cá"
        },
        {
          "word": "さとう",
          "romaji": "satou",
          "vi": "đường ăn"
        }
      ],
      "commonErrors": "Uốn cong lưỡi phát âm nặng như chữ 's' miền Nam Việt Nam."
    },
    {
      "kana": "し",
      "romaji": "shi",
      "ipa": "/ɕi/",
      "name": "Hiragana し (shi)",
      "row": "sa",
      "strokes": 1,
      "mnemonic": "Một nét cong vút mềm mại như chiếc lưỡi câu cá hoặc suối tóc người thiếu nữ dài thướt tha.",
      "mouth": "Mặt lưỡi nâng sát ngạc cứng, thổi luồng hơi xì êm dịu, không chu môi tròn như 'sh' tiếng Anh.",
      "viCompare": "Gần giống âm 'x' tiếng Việt nhưng luồng hơi dày và êm hơn, lướt nhẹ sang 'i'.",
      "examples": [
        {
          "word": "しお",
          "romaji": "shio",
          "vi": "muối ăn"
        },
        {
          "word": "しんぶん",
          "romaji": "shinbun",
          "vi": "tờ báo"
        },
        {
          "word": "しゃしん",
          "romaji": "shashin",
          "vi": "bức ảnh"
        }
      ],
      "commonErrors": "Đọc thành 'si' đanh cứng hoặc chu môi quá mức thành 'sh' tiếng Anh."
    },
    {
      "kana": "す",
      "romaji": "su",
      "ipa": "/sɯ/",
      "name": "Hiragana す (su)",
      "row": "sa",
      "strokes": 2,
      "mnemonic": "Nét ngang và nét dọc có vòng xoắn thắt nút ở giữa như dây đu đu đưa trên cành cây (Xích đu).",
      "mouth": "Đầu lưỡi đặt sát chân răng, xì luồng hơi nhẹ với môi dẹt thả lỏng (không chu môi!).",
      "viCompare": "Gần giống 'xư'/'xu' tiếng Việt với môi dẹt hoàn toàn.",
      "examples": [
        {
          "word": "すし",
          "romaji": "sushi",
          "vi": "món sushi"
        },
        {
          "word": "すき",
          "romaji": "suki",
          "vi": "thích thú"
        },
        {
          "word": "すこし",
          "romaji": "sukoshi",
          "vi": "một chút"
        }
      ],
      "commonErrors": "Chu môi tròn thành 'xu' tiếng Việt."
    },
    {
      "kana": "せ",
      "romaji": "se",
      "ipa": "/se/",
      "name": "Hiragana せ (se)",
      "row": "sa",
      "strokes": 3,
      "mnemonic": "Nét ngang dài và 2 nét dọc đối xứng như 2 người bạn ngồi trên xe trò chuyện chia sẻ (Xe cộ / Sẻ chia).",
      "mouth": "Xì nhẹ âm /s/ rồi chuyển sang nguyên âm /e/ (ê).",
      "viCompare": "Gần giống âm 'xê' trong tiếng Việt.",
      "examples": [
        {
          "word": "せんせい",
          "romaji": "sensei",
          "vi": "thầy cô giáo"
        },
        {
          "word": "せかい",
          "romaji": "sekai",
          "vi": "thế giới"
        },
        {
          "word": "せんしゅう",
          "romaji": "senshuu",
          "vi": "tuần trước"
        }
      ],
      "commonErrors": "Đọc thành 'xe' bẹt tiếng Việt."
    },
    {
      "kana": "そ",
      "romaji": "so",
      "ipa": "/so/",
      "name": "Hiragana そ (so)",
      "row": "sa",
      "strokes": 1,
      "mnemonic": "Một nét zic-zac liên hoàn nối nhau uốn lượn như đường kim sợi chỉ đang khâu vá (So sợi chỉ).",
      "mouth": "Xì nhẹ âm /s/ kết hợp với nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống âm 'xô' trong tiếng Việt.",
      "examples": [
        {
          "word": "そら",
          "romaji": "sora",
          "vi": "bầu trời"
        },
        {
          "word": "そこ",
          "romaji": "soko",
          "vi": "chỗ đó"
        },
        {
          "word": "そして",
          "romaji": "soshite",
          "vi": "và rồi, sau đó"
        }
      ],
      "commonErrors": "Đọc thành 'xo' thay vì 'xô'."
    },
    {
      "kana": "た",
      "romaji": "ta",
      "ipa": "/ta/",
      "name": "Hiragana た (ta)",
      "row": "ta",
      "strokes": 4,
      "mnemonic": "Nét thập bên trái kết hợp 2 nét bên phải trông như hai chữ 'ta' lồng ghép vào nhau.",
      "mouth": "Đầu lưỡi chạm ngạc chân răng trên rồi hạ xuống bật âm /t/, không bật luồng hơi mạnh.",
      "viCompare": "Gần giống âm 'ta' trong tiếng Việt (như 'tà áo').",
      "examples": [
        {
          "word": "たまご",
          "romaji": "tamago",
          "vi": "quả trứng"
        },
        {
          "word": "たべる",
          "romaji": "taberu",
          "vi": "ăn uống"
        },
        {
          "word": "たかい",
          "romaji": "takai",
          "vi": "cao / đắt"
        }
      ],
      "commonErrors": "Bật hơi quá mạnh biến thành âm 'tha' tiếng Việt."
    },
    {
      "kana": "ち",
      "romaji": "chi",
      "ipa": "/t͡ɕi/",
      "name": "Hiragana ち (chi)",
      "row": "ta",
      "strokes": 2,
      "mnemonic": "Nét ngang và nét uốn bụng to quay sang trái giống số 5, như một chú chim nhỏ đang đậu (Chim sẻ).",
      "mouth": "Mặt lưỡi ép sát ngạc cứng rồi bật nhẹ luồng hơi xì thoát ra kết hợp nguyên âm i.",
      "viCompare": "Gần giống âm 'chi' tiếng Việt nhưng bật êm và mượt mà hơn.",
      "examples": [
        {
          "word": "ちず",
          "romaji": "chizu",
          "vi": "bản đồ"
        },
        {
          "word": "ちち",
          "romaji": "chichi",
          "vi": "bố (của mình)"
        },
        {
          "word": "ちかい",
          "romaji": "chikai",
          "vi": "gần gũi"
        }
      ],
      "commonErrors": "Người Việt dễ nhầm lẫn giữa ち (chi) và つ (tsu) hoặc phát âm thành 'ti'."
    },
    {
      "kana": "つ",
      "romaji": "tsu",
      "ipa": "/t͡sɯ/",
      "name": "Hiragana つ (tsu)",
      "row": "ta",
      "strokes": 1,
      "mnemonic": "Nét cong trăng khuyết như cơn sóng thần cuộn trào Tsunami đổ bộ vào bờ biển.",
      "mouth": "Đầu lưỡi chạm sát mặt sau răng cửa trên, bật nhẹ âm /t/ rồi thả lướt ngay sang luồng hơi xì /s/ với môi dẹt.",
      "viCompare": "Không có âm tương đương trong tiếng Việt. Ghép nhanh giữa 't' và 'xư' dẹt môi.",
      "examples": [
        {
          "word": "つくえ",
          "romaji": "tsukue",
          "vi": "cái bàn học"
        },
        {
          "word": "つき",
          "romaji": "tsuki",
          "vi": "mặt trăng"
        },
        {
          "word": "つぎ",
          "romaji": "tsugi",
          "vi": "tiếp theo"
        }
      ],
      "commonErrors": "Lỗi phổ biến hàng đầu của người Việt: đọc thành 'chu' (nhầm sang ちゅ) hoặc đọc thành 'tu'."
    },
    {
      "kana": "て",
      "romaji": "te",
      "ipa": "/te/",
      "name": "Hiragana て (te)",
      "row": "ta",
      "strokes": 1,
      "mnemonic": "Nét ngang rồi vòng uốn cong như cánh tay đưa ra đỡ lấy đồ vật (Bàn tay - Te).",
      "mouth": "Đầu lưỡi chạm chân răng trên bật âm /t/ rồi mở sang nguyên âm /e/ (ê).",
      "viCompare": "Gần giống âm 'tê' trong tiếng Việt.",
      "examples": [
        {
          "word": "て",
          "romaji": "te",
          "vi": "bàn tay"
        },
        {
          "word": "てがみ",
          "romaji": "tegami",
          "vi": "bức thư"
        },
        {
          "word": "てんき",
          "romaji": "tenki",
          "vi": "thời tiết"
        }
      ],
      "commonErrors": "Đọc thành 'te' bẹt thay vì 'tê'."
    },
    {
      "kana": "と",
      "romaji": "to",
      "ipa": "/to/",
      "name": "Hiragana と (to)",
      "row": "ta",
      "strokes": 2,
      "mnemonic": "Nét xiên ngắn và nét cong ôm lấy như ngón chân cái to tướng bị gai đâm sưng phồng (To tướng).",
      "mouth": "Bật nhẹ âm /t/ kết hợp nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống âm 'tô' trong tiếng Việt.",
      "examples": [
        {
          "word": "とけい",
          "romaji": "tokei",
          "vi": "đồng hồ"
        },
        {
          "word": "ともだち",
          "romaji": "tomodachi",
          "vi": "bạn bè"
        },
        {
          "word": "とうきょう",
          "romaji": "toukyou",
          "vi": "thủ đô Tokyo"
        }
      ],
      "commonErrors": "Đọc thành 'to' mở miệng rộng thay vì 'tô'."
    },
    {
      "kana": "な",
      "romaji": "na",
      "ipa": "/na/",
      "name": "Hiragana な (na)",
      "row": "na",
      "strokes": 4,
      "mnemonic": "Nét chữ thập bên trái kết hợp nét phẩy và vòng cuộn thắt nút bên phải như cô gái đang quỳ chắp tay cầu nguyện.",
      "mouth": "Đầu lưỡi chạm ngạc cứng thả luồng hơi qua mũi rồi mở sang nguyên âm a.",
      "viCompare": "Giống âm 'na' trong tiếng Việt.",
      "examples": [
        {
          "word": "なつ",
          "romaji": "natsu",
          "vi": "mùa hè"
        },
        {
          "word": "なまえ",
          "romaji": "namae",
          "vi": "tên gọi"
        },
        {
          "word": "なに",
          "romaji": "nani",
          "vi": "cái gì"
        }
      ],
      "commonErrors": "Viết dính liền nét phẩy và nét thắt đuôi thành một nét sai chuẩn."
    },
    {
      "kana": "に",
      "romaji": "ni",
      "ipa": "/ɲi/",
      "name": "Hiragana に (ni)",
      "row": "na",
      "strokes": 3,
      "mnemonic": "Nét sổ đứng bên trái và 2 nét ngang bên phải như số 2 (ni) trong tiếng Nhật hoặc chiếc kim và sợi chỉ.",
      "mouth": "Mặt lưỡi nâng áp ngạc cứng, đẩy âm mũi rồi chuyển sang nguyên âm i.",
      "viCompare": "Gần giống âm 'ni' trong tiếng Việt.",
      "examples": [
        {
          "word": "にほん",
          "romaji": "nihon",
          "vi": "Nhật Bản"
        },
        {
          "word": "にく",
          "romaji": "niku",
          "vi": "thịt"
        },
        {
          "word": "にちようび",
          "romaji": "nichiyoubi",
          "vi": "chủ nhật"
        }
      ],
      "commonErrors": "Dễ nhầm lẫn khi viết với こ (ko) hoặc た (ta)."
    },
    {
      "kana": "ぬ",
      "romaji": "nu",
      "ipa": "/nɯ/",
      "name": "Hiragana ぬ (nu)",
      "row": "na",
      "strokes": 2,
      "mnemonic": "Nét xiên và nét uốn lượn có vòng cuộn thắt nút ở đuôi như một sợi mì Ramen cuộn lại (Nui / Nút thắt).",
      "mouth": "Đầu lưỡi chạm vòm miệng trên rồi mở sang nguyên âm /ɯ/ môi dẹt.",
      "viCompare": "Giống âm 'nư'/'nu' nhẹ trong tiếng Việt với môi không chu tròn.",
      "examples": [
        {
          "word": "いぬ",
          "romaji": "inu",
          "vi": "con chó"
        },
        {
          "word": "ぬの",
          "romaji": "nuno",
          "vi": "vải vóc"
        },
        {
          "word": "ぬぐ",
          "romaji": "nugu",
          "vi": "cởi (áo, giày)"
        }
      ],
      "commonErrors": "Rất dễ nhầm lẫn với chữ め (me) - hãy nhớ: 'nu' có nút cuộn ở đuôi, 'me' không có nút."
    },
    {
      "kana": "ね",
      "romaji": "ne",
      "ipa": "/ne/",
      "name": "Hiragana ね (ne)",
      "row": "na",
      "strokes": 2,
      "mnemonic": "Nét sổ đứng và nét uốn lượn thắt nút ở đuôi như chú mèo con đang cuộn tròn đuôi ngủ (Neko - Mèo).",
      "mouth": "Đầu lưỡi chạm vòm miệng trên rồi chuyển sang nguyên âm /e/ (ê).",
      "viCompare": "Gần giống âm 'nê' trong tiếng Việt.",
      "examples": [
        {
          "word": "ねこ",
          "romaji": "neko",
          "vi": "con mèo"
        },
        {
          "word": "ねる",
          "romaji": "neru",
          "vi": "ngủ"
        },
        {
          "word": "ねつ",
          "romaji": "netsu",
          "vi": "sốt / nhiệt"
        }
      ],
      "commonErrors": "Rất dễ nhầm với わ (wa) và れ (re). Mẹo nhớ: ね có đuôi cuộn tròn thắt nút."
    },
    {
      "kana": "の",
      "romaji": "no",
      "ipa": "/no/",
      "name": "Hiragana の (no)",
      "row": "na",
      "strokes": 1,
      "mnemonic": "Một nét cong tròn xoắn ốc khép kín như biển báo cấm quay đầu xe hoặc chiếc nơ cài áo xinh xắn.",
      "mouth": "Phát âm âm /n/ kết hợp nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống âm 'nô' trong tiếng Việt.",
      "examples": [
        {
          "word": "のみもの",
          "romaji": "nomimono",
          "vi": "đồ uống"
        },
        {
          "word": "のり",
          "romaji": "nori",
          "vi": "rong biển"
        },
        {
          "word": "ノート",
          "romaji": "nooto",
          "vi": "vở ghi chép"
        }
      ],
      "commonErrors": "Đọc thành 'no' tiếng Việt thay vì 'nô'."
    },
    {
      "kana": "は",
      "romaji": "ha",
      "ipa": "/ha/",
      "name": "Hiragana は (ha)",
      "row": "ha",
      "strokes": 3,
      "mnemonic": "Nét sổ đứng bên trái kết hợp nét ngang và bụng thắt nút tròn bên phải như bông hoa nở rộ (Ha ha hoa nở).",
      "mouth": "Khí quản mở rộng, đẩy luồng hơi êm từ cổ họng thoát ra cùng nguyên âm a.",
      "viCompare": "Giống âm 'ha' trong tiếng Việt. Khi làm trợ từ đọc là 'wa'.",
      "examples": [
        {
          "word": "はな",
          "romaji": "hana",
          "vi": "hoa / chiếc mũi"
        },
        {
          "word": "はし",
          "romaji": "hashi",
          "vi": "đôi đũa / cây cầu"
        },
        {
          "word": "はい",
          "romaji": "hai",
          "vi": "vâng, dạ"
        }
      ],
      "commonErrors": "Quên quy tắc biến âm: Khi 'は' đóng vai trò là TRỢ TỪ chủ đề thì phải đọc là 'wa' chứ không đọc là 'ha'."
    },
    {
      "kana": "ひ",
      "romaji": "hi",
      "ipa": "/çi/",
      "name": "Hiragana ひ (hi)",
      "row": "ha",
      "strokes": 1,
      "mnemonic": "Nét uốn cong đáy bằng như khuôn miệng đang hé cười hí hí sảng khoái (Hí hí).",
      "mouth": "Thân lưỡi nâng cao sát ngạc cứng, thổi luồng hơi xì qua khe hẹp lưỡi và ngạc.",
      "viCompare": "Gần giống âm 'hi' trong tiếng Việt nhưng có luồng ma sát ngạc cứng êm ái.",
      "examples": [
        {
          "word": "ひ",
          "romaji": "hi",
          "vi": "mặt trời / lửa"
        },
        {
          "word": "ひと",
          "romaji": "hito",
          "vi": "con người"
        },
        {
          "word": "ひる",
          "romaji": "hiru",
          "vi": "buổi trưa"
        }
      ],
      "commonErrors": "Phát âm quá nhẹ như chữ 'h' tiếng Việt mà thiếu luồng ma sát ngạc cứng."
    },
    {
      "kana": "ふ",
      "romaji": "fu",
      "ipa": "/ɸɯ/",
      "name": "Hiragana ふ (fu)",
      "row": "ha",
      "strokes": 4,
      "mnemonic": "Nét phẩy đỉnh, nét cong giữa và hai dấu phẩy hai bên như ngọn núi Phú Sĩ tuyết phủ sừng sững.",
      "mouth": "TUYỆT ĐỐI KHÔNG CẮN RĂNG VÀO MÔI! Hai môi khép hờ tự nhiên rồi thổi luồng hơi nhẹ qua khe giữa hai môi như đang thổi nến.",
      "viCompare": "Không giống 'phu' tiếng Việt (vì tiếng Việt răng cắn môi). ふ là âm môi - môi, thổi hơi nhẹ nhàng.",
      "examples": [
        {
          "word": "ふね",
          "romaji": "fune",
          "vi": "con tàu, thuyền"
        },
        {
          "word": "ふゆ",
          "romaji": "fuyu",
          "vi": "mùa đông"
        },
        {
          "word": "ふじさん",
          "romaji": "fujisan",
          "vi": "núi Phú Sĩ"
        }
      ],
      "commonErrors": "Người Việt hay dùng răng trên cắn vào môi dưới thành âm 'ph' (phu), đây là lỗi phát âm rất phổ biến."
    },
    {
      "kana": "へ",
      "romaji": "he",
      "ipa": "/he/",
      "name": "Hiragana へ (he)",
      "row": "ha",
      "strokes": 1,
      "mnemonic": "Một nét gập nhọn hình mái nhà hoặc ngọn đồi thoai thoải (Hè về leo đồi).",
      "mouth": "Đẩy hơi nhẹ từ họng kết hợp nguyên âm /e/ (ê). Khi làm trợ từ đọc là 'e'.",
      "viCompare": "Gần giống âm 'hê' trong tiếng Việt.",
      "examples": [
        {
          "word": "へや",
          "romaji": "heya",
          "vi": "căn phòng"
        },
        {
          "word": "へた",
          "romaji": "heta",
          "vi": "vụng về, kém"
        },
        {
          "word": "へいわ",
          "romaji": "heiwa",
          "vi": "hòa bình"
        }
      ],
      "commonErrors": "Khi làm trợ từ chỉ phương hướng di chuyển (へ), đọc là 'e' chứ không đọc là 'he'."
    },
    {
      "kana": "ほ",
      "romaji": "ho",
      "ipa": "/ho/",
      "name": "Hiragana ほ (ho)",
      "row": "ha",
      "strokes": 4,
      "mnemonic": "Giống chữ は nhưng có thêm nét gạch ngang che kín đỉnh đầu như người đội mũ bảo hiểm (Hộ mũ).",
      "mouth": "Đẩy hơi nhẹ từ cổ họng kết hợp nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống âm 'hô' trong tiếng Việt.",
      "examples": [
        {
          "word": "ほん",
          "romaji": "hon",
          "vi": "quyển sách"
        },
        {
          "word": "ほし",
          "romaji": "hoshi",
          "vi": "ngôi sao"
        },
        {
          "word": "ホテル",
          "romaji": "hoteru",
          "vi": "khách sạn"
        }
      ],
      "commonErrors": "Hay viết nhầm nét dọc xuyên qua nét ngang trên cùng giống chữ ま."
    },
    {
      "kana": "ま",
      "romaji": "ma",
      "ipa": "/ma/",
      "name": "Hiragana ま (ma)",
      "row": "ma",
      "strokes": 3,
      "mnemonic": "Hai nét ngang song song, nét dọc thấu qua uốn bụng tròn như cột buồm căng gió lướt sóng.",
      "mouth": "Hai môi mím nhẹ rồi mở bung ra kết hợp nguyên âm a.",
      "viCompare": "Giống âm 'ma' trong tiếng Việt.",
      "examples": [
        {
          "word": "まち",
          "romaji": "machi",
          "vi": "thị trấn, phố xá"
        },
        {
          "word": "まえ",
          "romaji": "mae",
          "vi": "phía trước"
        },
        {
          "word": "まいにち",
          "romaji": "mainichi",
          "vi": "hàng ngày"
        }
      ],
      "commonErrors": "Dễ nhầm nét với ほ (ho) - nhớ rằng ま nét dọc không nhô lên khỏi nét ngang trên cùng."
    },
    {
      "kana": "み",
      "romaji": "mi",
      "ipa": "/mi/",
      "name": "Hiragana み (mi)",
      "row": "ma",
      "strokes": 2,
      "mnemonic": "Nét uốn như số 21 cách điệu hoa mỹ hoặc nốt nhạc Mi ngân vang vui vẻ.",
      "mouth": "Mím nhẹ hai môi rồi mở sang nguyên âm i với khóe miệng mở bè.",
      "viCompare": "Giống âm 'mi' trong tiếng Việt.",
      "examples": [
        {
          "word": "みず",
          "romaji": "mizu",
          "vi": "nước uống"
        },
        {
          "word": "みみ",
          "romaji": "mimi",
          "vi": "cái tai"
        },
        {
          "word": "みち",
          "romaji": "michi",
          "vi": "con đường"
        }
      ],
      "commonErrors": "Viết nét thứ hai quá ngắn hoặc không cắt ngang qua bụng nét thứ nhất."
    },
    {
      "kana": "む",
      "romaji": "mu",
      "ipa": "/mɯ/",
      "name": "Hiragana む (mu)",
      "row": "ma",
      "strokes": 3,
      "mnemonic": "Nét ngang, nét dọc thắt vòng tròn vắt sang phải và dấu phẩy như đầu chú bò sữa đang kêu u mu (Bò kêu Mu mu).",
      "mouth": "Mím hai môi rồi mở sang nguyên âm /ɯ/ môi dẹt thả lỏng (không chu môi).",
      "viCompare": "Giống 'mư'/'mu' trong tiếng Việt với môi dẹt hoàn toàn.",
      "examples": [
        {
          "word": "むし",
          "romaji": "mushi",
          "vi": "côn trùng"
        },
        {
          "word": "むね",
          "romaji": "mune",
          "vi": "lồng ngực"
        },
        {
          "word": "むずかしい",
          "romaji": "muzukashii",
          "vi": "khó khăn"
        }
      ],
      "commonErrors": "Chu môi tròn thành 'mu' tiếng Việt hoặc quên dấu phẩy ở nét thứ ba."
    },
    {
      "kana": "め",
      "romaji": "me",
      "ipa": "/me/",
      "name": "Hiragana め (me)",
      "row": "ma",
      "strokes": 2,
      "mnemonic": "Nét xiên và nét cong buông thả không thắt nút, giống như con mắt đang hé mở nhìn đời (Me me nhìn đời / Mắt).",
      "mouth": "Mím môi nhẹ rồi mở sang nguyên âm /e/ (ê).",
      "viCompare": "Gần giống âm 'mê' trong tiếng Việt.",
      "examples": [
        {
          "word": "め",
          "romaji": "me",
          "vi": "con mắt"
        },
        {
          "word": "めがね",
          "romaji": "megane",
          "vi": "kính đeo mắt"
        },
        {
          "word": "めいし",
          "romaji": "meishi",
          "vi": "danh thiếp"
        }
      ],
      "commonErrors": "Rất dễ nhầm lẫn với ぬ (nu). Hãy nhớ: め buông thả không thắt nút, ぬ thắt nút ở đuôi."
    },
    {
      "kana": "も",
      "romaji": "mo",
      "ipa": "/mo/",
      "name": "Hiragana も (mo)",
      "row": "ma",
      "strokes": 3,
      "mnemonic": "Nét móc câu cong vút cắt ngang bởi 2 nét vạch ngang như chiếc mỏ neo móc cá (Móc câu).",
      "mouth": "Mím môi nhẹ rồi mở sang nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống âm 'mô' trong tiếng Việt.",
      "examples": [
        {
          "word": "もの",
          "romaji": "mono",
          "vi": "đồ vật"
        },
        {
          "word": "もり",
          "romaji": "mori",
          "vi": "khu rừng"
        },
        {
          "word": "もんだい",
          "romaji": "mondai",
          "vi": "vấn đề / câu hỏi"
        }
      ],
      "commonErrors": "Đọc thành 'mo' bẹt thay vì 'mô'."
    },
    {
      "kana": "や",
      "romaji": "ya",
      "ipa": "/ja/",
      "name": "Hiragana や (ya)",
      "row": "ya",
      "strokes": 3,
      "mnemonic": "Nét cong móc, nét phẩy và nét sổ chéo trông như chiếc thuyền buồm du ngoạn (Yacht).",
      "mouth": "Nâng thân lưỡi sát ngạc cứng rồi lướt nhanh sang nguyên âm a.",
      "viCompare": "Gần giống âm 'da'/'gia' trong tiếng Việt miền Nam.",
      "examples": [
        {
          "word": "やま",
          "romaji": "yama",
          "vi": "ngọn núi"
        },
        {
          "word": "やすい",
          "romaji": "yasui",
          "vi": "rẻ tiền"
        },
        {
          "word": "やすみ",
          "romaji": "yasumi",
          "vi": "ngày nghỉ"
        }
      ],
      "commonErrors": "Phát âm thành âm 'd' đanh sắc của tiếng Việt miền Bắc."
    },
    {
      "kana": "ゆ",
      "romaji": "yu",
      "ipa": "/jɯ/",
      "name": "Hiragana ゆ (yu)",
      "row": "ya",
      "strokes": 2,
      "mnemonic": "Nét móc bụng to và nét cong dài xuyên qua như chú cá vàng đuôi bơi lượn trong bể nước (Uyển chuyển).",
      "mouth": "Nâng thân lưỡi rồi lướt sang nguyên âm /ɯ/ với môi dẹt thả lỏng.",
      "viCompare": "Gần giống 'du'/'dư' miền Nam với môi dẹt nhẹ.",
      "examples": [
        {
          "word": "ゆき",
          "romaji": "yuki",
          "vi": "tuyết trắng"
        },
        {
          "word": "ゆめ",
          "romaji": "yume",
          "vi": "giấc mơ"
        },
        {
          "word": "ゆうびんきょく",
          "romaji": "yuubinkyoku",
          "vi": "bưu điện"
        }
      ],
      "commonErrors": "Chu môi tròn tạo âm 'du' tiếng Việt."
    },
    {
      "kana": "よ",
      "romaji": "yo",
      "ipa": "/jo/",
      "name": "Hiragana よ (yo)",
      "row": "ya",
      "strokes": 2,
      "mnemonic": "Nét ngang ngắn và nét sổ có thắt nút tròn như chiếc đồ chơi yo-yo đang thả dây đung đưa (Yo-yo).",
      "mouth": "Nâng thân lưỡi lướt sang nguyên âm /o/ (ô).",
      "viCompare": "Gần giống âm 'dô' trong tiếng Việt miền Nam.",
      "examples": [
        {
          "word": "よる",
          "romaji": "yoru",
          "vi": "buổi tối"
        },
        {
          "word": "よむ",
          "romaji": "yomu",
          "vi": "đọc sách"
        },
        {
          "word": "よい",
          "romaji": "yoi",
          "vi": "tốt lành"
        }
      ],
      "commonErrors": "Đọc thành 'zo' hoặc 'dơ'."
    },
    {
      "kana": "ら",
      "romaji": "ra",
      "ipa": "/ɾa/",
      "name": "Hiragana ら (ra)",
      "row": "ra",
      "strokes": 2,
      "mnemonic": "Dấu phẩy trên đầu và nét cong bụng dưới như chú lạc đà đang nằm nghỉ ngơi (Lạc đà).",
      "mouth": "Đầu lưỡi vỗ nhẹ nhanh vào phần gờ chân răng trên (âm vỗ flap), không rung lưỡi!",
      "viCompare": "Nằm giữa âm 'l' và 'r' tiếng Việt; giống âm 'r' nhẹ hoặc 'l' phát âm lướt nhẹ một nhịp.",
      "examples": [
        {
          "word": "らいしゅう",
          "romaji": "raishuu",
          "vi": "tuần sau"
        },
        {
          "word": "らくだ",
          "romaji": "rakuda",
          "vi": "con lạc đà"
        },
        {
          "word": "ラジオ",
          "romaji": "rajio",
          "vi": "đài radio"
        }
      ],
      "commonErrors": "Rung lưỡi quá mạnh như âm 'r' tiếng Việt hoặc uốn lưỡi thành âm 'l' đè nặng."
    },
    {
      "kana": "り",
      "romaji": "ri",
      "ipa": "/ɾi/",
      "name": "Hiragana り (ri)",
      "row": "ra",
      "strokes": 2,
      "mnemonic": "Hai nét sổ song song, nét phải dài hơn uốn cong như hai dải ruy băng lụa buông rủ (Ruy băng).",
      "mouth": "Đầu lưỡi vỗ nhẹ chân răng trên rồi chuyển sang nguyên âm i bè miệng.",
      "viCompare": "Gần giống 'ri'/'li' nhẹ trong tiếng Việt.",
      "examples": [
        {
          "word": "りんご",
          "romaji": "ringo",
          "vi": "quả táo"
        },
        {
          "word": "りょうり",
          "romaji": "ryouri",
          "vi": "nấu ăn"
        },
        {
          "word": "りょこう",
          "romaji": "ryokou",
          "vi": "du lịch"
        }
      ],
      "commonErrors": "Đọc rung lưỡi 'r-r-i' hoặc viết hai nét dính liền nhau như Katakana リ."
    },
    {
      "kana": "る",
      "romaji": "ru",
      "ipa": "/ɾɯ/",
      "name": "Hiragana る (ru)",
      "row": "ra",
      "strokes": 1,
      "mnemonic": "Nét gập zic-zac có vòng tròn thắt nút ở đuôi như một bàn tay đang lượm viên ngọc ruby (Lượm ngọc / Ru bé ngủ).",
      "mouth": "Đầu lưỡi vỗ nhẹ chân răng trên kết hợp nguyên âm /ɯ/ môi dẹt.",
      "viCompare": "Giống 'rư'/'lư' nhẹ với môi không chu tròn.",
      "examples": [
        {
          "word": "くるま",
          "romaji": "kuruma",
          "vi": "xe ô tô"
        },
        {
          "word": "はる",
          "romaji": "haru",
          "vi": "mùa xuân"
        },
        {
          "word": "よる",
          "romaji": "yoru",
          "vi": "buổi tối"
        }
      ],
      "commonErrors": "Rất dễ nhầm với ろ (ro) - nhớ rằng: る có vòng tròn thắt nút ở đuôi, ろ thì không."
    },
    {
      "kana": "れ",
      "romaji": "re",
      "ipa": "/ɾe/",
      "name": "Hiragana れ (re)",
      "row": "ra",
      "strokes": 2,
      "mnemonic": "Nét sổ đứng và nét uốn lượn có đuôi hất ngược ra ngoài như lưỡi câu rê cá (Rê cá).",
      "mouth": "Đầu lưỡi vỗ nhẹ chân răng trên rồi mở sang nguyên âm /e/ (ê).",
      "viCompare": "Gần giống 'rê'/'lê' nhẹ trong tiếng Việt.",
      "examples": [
        {
          "word": "れきし",
          "romaji": "rekishi",
          "vi": "lịch sử"
        },
        {
          "word": "れいぞうこ",
          "romaji": "reizouko",
          "vi": "tủ lạnh"
        },
        {
          "word": "れんしゅう",
          "romaji": "renshuu",
          "vi": "luyện tập"
        }
      ],
      "commonErrors": "Dễ nhầm với わ (wa) và ね (ne). Nhớ rằng: れ có đuôi hất ngược ra ngoài."
    },
    {
      "kana": "ろ",
      "romaji": "ro",
      "ipa": "/ɾo/",
      "name": "Hiragana ろ (ro)",
      "row": "ra",
      "strokes": 1,
      "mnemonic": "Giống chữ る nhưng đuôi không thắt nút mà buông mở, như một con đường lộ mở rộng thênh thang (Đường lộ).",
      "mouth": "Đầu lưỡi vỗ nhẹ chân răng trên kết hợp nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống 'rô'/'lô' nhẹ trong tiếng Việt.",
      "examples": [
        {
          "word": "ろく",
          "romaji": "roku",
          "vi": "số sáu (6)"
        },
        {
          "word": "ろうそく",
          "romaji": "rousoku",
          "vi": "cây nến"
        },
        {
          "word": "ロシア",
          "romaji": "roshia",
          "vi": "nước Nga"
        }
      ],
      "commonErrors": "Viết thêm nút tròn ở đuôi biến thành chữ る (ru)."
    },
    {
      "kana": "わ",
      "romaji": "wa",
      "ipa": "/ɰa/",
      "name": "Hiragana わ (wa)",
      "row": "wa",
      "strokes": 2,
      "mnemonic": "Nét sổ đứng và nét uốn bụng tròn căng như vòng eo thon của vũ công múa ba lê (Vòng eo oa / Oa oa).",
      "mouth": "Môi khép hờ mở nhanh chuyển sang nguyên âm a, không chu môi quá sâu.",
      "viCompare": "Gần giống âm 'oa'/'qua' nhẹ trong tiếng Việt.",
      "examples": [
        {
          "word": "わたし",
          "romaji": "watashi",
          "vi": "tôi (đại từ nhân xưng)"
        },
        {
          "word": "わに",
          "romaji": "wani",
          "vi": "con cá sấu"
        },
        {
          "word": "わかる",
          "romaji": "wakaru",
          "vi": "hiểu biết"
        }
      ],
      "commonErrors": "Dễ nhầm với ね (ne) và れ (re). Nhớ rằng: わ lưng tròn trơn, không có nút hay móc đuôi."
    },
    {
      "kana": "を",
      "romaji": "o",
      "ipa": "/o/",
      "name": "Hiragana を (wo/o)",
      "row": "wa",
      "strokes": 3,
      "mnemonic": "Nét ngang, nét chéo gãy và nét móc cong như vận động viên đang nhảy qua chướng ngại vật (Trợ từ tân ngữ).",
      "mouth": "Phát âm giống hệt nguyên âm /o/ (ô). Trong tiếng Nhật hiện đại chỉ dùng làm TRỢ TỪ ngữ pháp chỉ tân ngữ.",
      "viCompare": "Phát âm giống âm 'ô' gọn gàng. Romaji ghi là 'wo' hoặc 'o'.",
      "examples": [
        {
          "word": "ほんをよむ",
          "romaji": "hon o yomu",
          "vi": "đọc sách"
        },
        {
          "word": "みずをのむ",
          "romaji": "mizu o nomu",
          "vi": "uống nước"
        },
        {
          "word": "ごはんをたべる",
          "romaji": "gohan o taberu",
          "vi": "ăn cơm"
        }
      ],
      "commonErrors": "Cố tình phát âm thành 'quô'/'wo' nặng nề; trong tiếng Nhật hiện đại を đọc hoàn toàn là 'o'."
    },
    {
      "kana": "ん",
      "romaji": "n",
      "ipa": "/ɴ/",
      "name": "Hiragana ん (n)",
      "row": "n",
      "strokes": 1,
      "mnemonic": "Nét uốn lượn như chữ 'n' viết nghiêng trong bảng chữ cái Latinh.",
      "mouth": "Âm mũi, luồng hơi đi hoàn toàn qua khoang mũi. Khẩu hình thay đổi linh hoạt tùy theo âm theo sau.",
      "viCompare": "Tương đương âm mũi [n], [m], [ng] tiếng Việt tùy thuộc âm đứng ngay sau nó.",
      "examples": [
        {
          "word": "にほん",
          "romaji": "nihon",
          "vi": "Nhật Bản"
        },
        {
          "word": "しんぶん",
          "romaji": "shinbun",
          "vi": "tờ báo (đọc là shim-bun)"
        },
        {
          "word": "てんき",
          "romaji": "tenki",
          "vi": "thời tiết (đọc là teng-ki)"
        }
      ],
      "commonErrors": "Đọc cứng nhắc thành một âm duy nhất mà không biết quy tắc biến âm mũi [m], [n], [ng]."
    }
  ],
  "katakana": [
    {
      "kana": "ア",
      "hiraganaEquivalent": "あ",
      "romaji": "a",
      "ipa": "/a/",
      "name": "Katakana ア (a)",
      "row": "a",
      "strokes": 2,
      "mnemonic": "Nét ngang móc và nét phẩy như chữ A in hoa bị mất nét chân bên phải.",
      "examples": [
        {
          "word": "アイス",
          "romaji": "aisu",
          "vi": "kem"
        },
        {
          "word": "アジア",
          "romaji": "ajia",
          "vi": "châu Á"
        }
      ]
    },
    {
      "kana": "イ",
      "hiraganaEquivalent": "い",
      "romaji": "i",
      "ipa": "/i/",
      "name": "Katakana イ (i)",
      "row": "a",
      "strokes": 2,
      "mnemonic": "Hai nét giống bộ Nhân đứng (亻), như người đang đứng thẳng (I đứng).",
      "examples": [
        {
          "word": "イチゴ",
          "romaji": "ichigo",
          "vi": "quả dâu tây"
        },
        {
          "word": "インド",
          "romaji": "indo",
          "vi": "Ấn Độ"
        }
      ]
    },
    {
      "kana": "ウ",
      "hiraganaEquivalent": "う",
      "romaji": "u",
      "ipa": "/ɯ/",
      "name": "Katakana ウ (u)",
      "row": "a",
      "strokes": 3,
      "mnemonic": "Giống bộ Miên (宀 - mái nhà) có nét nhọn trên đỉnh đầu, cách điệu từ chữ Hiragana う.",
      "examples": [
        {
          "word": "ウイスキー",
          "romaji": "uisukii",
          "vi": "rượu whisky"
        },
        {
          "word": "ウイルス",
          "romaji": "uirusu",
          "vi": "virus"
        }
      ]
    },
    {
      "kana": "エ",
      "hiraganaEquivalent": "え",
      "romaji": "e",
      "ipa": "/e/",
      "name": "Katakana エ (e)",
      "row": "a",
      "strokes": 3,
      "mnemonic": "Hình thanh dầm thép chữ I vững chãi trong công trình xây dựng (Ê kíp thợ xây).",
      "examples": [
        {
          "word": "エレベーター",
          "romaji": "erebeetaa",
          "vi": "thang máy"
        },
        {
          "word": "エアコン",
          "romaji": "eakon",
          "vi": "máy điều hòa"
        }
      ]
    },
    {
      "kana": "オ",
      "hiraganaEquivalent": "お",
      "romaji": "o",
      "ipa": "/o/",
      "name": "Katakana オ (o)",
      "row": "a",
      "strokes": 3,
      "mnemonic": "Nét ngang, nét dọc móc và nét phẩy như người đàn ông dang rộng tay oai vệ (Oai vệ).",
      "examples": [
        {
          "word": "オレンジ",
          "romaji": "orenji",
          "vi": "quả cam"
        },
        {
          "word": "オリーブ",
          "romaji": "oriibu",
          "vi": "quả ô liu"
        }
      ]
    },
    {
      "kana": "カ",
      "hiraganaEquivalent": "か",
      "romaji": "ka",
      "ipa": "/ka/",
      "name": "Katakana カ (ka)",
      "row": "ka",
      "strokes": 2,
      "mnemonic": "Giống chữ Hiragana か nhưng lược bỏ nét phẩy bên phải, góc cạnh mạnh mẽ hơn.",
      "examples": [
        {
          "word": "カメラ",
          "romaji": "kamera",
          "vi": "máy chụp ảnh"
        },
        {
          "word": "カフェ",
          "romaji": "kafe",
          "vi": "quán cà phê"
        }
      ]
    },
    {
      "kana": "キ",
      "hiraganaEquivalent": "き",
      "romaji": "ki",
      "ipa": "/ki/",
      "name": "Katakana キ (ki)",
      "row": "ka",
      "strokes": 3,
      "mnemonic": "Hình chiếc chìa khóa Key bằng kim loại cứng cáp, bỏ nét cong dưới của chữ き.",
      "examples": [
        {
          "word": "キッチン",
          "romaji": "kitchin",
          "vi": "nhà bếp"
        },
        {
          "word": "キャンプ",
          "romaji": "kyanpu",
          "vi": "cắm trại"
        }
      ]
    },
    {
      "kana": "ク",
      "hiraganaEquivalent": "く",
      "romaji": "ku",
      "ipa": "/kɯ/",
      "name": "Katakana ク (ku)",
      "row": "ka",
      "strokes": 2,
      "mnemonic": "Nét phẩy chéo và nét gập như góc chiếc bánh quy Cook giòn tan.",
      "examples": [
        {
          "word": "クラス",
          "romaji": "kurasu",
          "vi": "lớp học"
        },
        {
          "word": "クラブ",
          "romaji": "kurabu",
          "vi": "câu lạc bộ"
        }
      ]
    },
    {
      "kana": "ケ",
      "hiraganaEquivalent": "け",
      "romaji": "ke",
      "ipa": "/ke/",
      "name": "Katakana ケ (ke)",
      "row": "ka",
      "strokes": 3,
      "mnemonic": "Nét phẩy và nét chữ thập góc cạnh như chiếc kệ trưng bày bánh ngọt (Kệ bánh).",
      "examples": [
        {
          "word": "ケーキ",
          "romaji": "keeki",
          "vi": "bánh ngọt"
        },
        {
          "word": "ケース",
          "romaji": "keesu",
          "vi": "hộp đựng / bao da"
        }
      ]
    },
    {
      "kana": "コ",
      "hiraganaEquivalent": "こ",
      "romaji": "ko",
      "ipa": "/ko/",
      "name": "Katakana コ (ko)",
      "row": "ka",
      "strokes": 2,
      "mnemonic": "Hình góc vuông của chiếc hộp đựng cốc cà phê nhỏ (Cốc cà phê).",
      "examples": [
        {
          "word": "コーヒー",
          "romaji": "koohii",
          "vi": "cà phê"
        },
        {
          "word": "コート",
          "romaji": "kooto",
          "vi": "áo khoác"
        }
      ]
    },
    {
      "kana": "サ",
      "hiraganaEquivalent": "さ",
      "romaji": "sa",
      "ipa": "/sa/",
      "name": "Katakana サ (sa)",
      "row": "sa",
      "strokes": 3,
      "mnemonic": "Giống bộ Thảo (艹) trên đầu chữ Hán, như ba cọng cỏ non mọc trên mặt đất (Sa mạc cỏ).",
      "examples": [
        {
          "word": "サラダ",
          "romaji": "sarada",
          "vi": "món salad"
        },
        {
          "word": "サッカー",
          "romaji": "sakkaa",
          "vi": "bóng đá"
        }
      ]
    },
    {
      "kana": "シ",
      "hiraganaEquivalent": "し",
      "romaji": "shi",
      "ipa": "/ɕi/",
      "name": "Katakana シ (shi)",
      "row": "sa",
      "strokes": 3,
      "mnemonic": "Hai nét ngắn nằm ngang chéo nhẹ, nét thứ ba hất vuốt TỪ DƯỚI LÊN (như đôi mắt ngước lên nhìn cô nàng duyên dáng Shi).",
      "examples": [
        {
          "word": "シャツ",
          "romaji": "shatsu",
          "vi": "áo sơ mi"
        },
        {
          "word": "シャワー",
          "romaji": "shawaa",
          "vi": "vòi hoa sen"
        }
      ]
    },
    {
      "kana": "ス",
      "hiraganaEquivalent": "す",
      "romaji": "su",
      "ipa": "/sɯ/",
      "name": "Katakana ス (su)",
      "row": "sa",
      "strokes": 2,
      "mnemonic": "Nét gập ngang và nét chéo vát như người đang trượt ván tuyết siêu tốc (Super ski).",
      "examples": [
        {
          "word": "スポーツ",
          "romaji": "supootsu",
          "vi": "thể thao"
        },
        {
          "word": "スーパー",
          "romaji": "suupaa",
          "vi": "siêu thị"
        }
      ]
    },
    {
      "kana": "セ",
      "hiraganaEquivalent": "せ",
      "romaji": "se",
      "ipa": "/se/",
      "name": "Katakana セ (se)",
      "row": "sa",
      "strokes": 2,
      "mnemonic": "Rất giống chữ Hiragana せ nhưng nét vẽ vuông vắn, cứng cáp hơn.",
      "examples": [
        {
          "word": "セーター",
          "romaji": "seetaa",
          "vi": "áo len"
        },
        {
          "word": "セット",
          "romaji": "setto",
          "vi": "suất ăn combo / bộ"
        }
      ]
    },
    {
      "kana": "ソ",
      "hiraganaEquivalent": "そ",
      "romaji": "so",
      "ipa": "/so/",
      "name": "Katakana ソ (so)",
      "row": "sa",
      "strokes": 2,
      "mnemonic": "Nét thứ nhất thẳng đứng hơn, nét thứ hai phẩy CHÉM TỪ TRÊN XUỐNG DƯỚI (như dòng nước xối từ trên xuống).",
      "examples": [
        {
          "word": "ソフト",
          "romaji": "sofuto",
          "vi": "phần mềm"
        },
        {
          "word": "ソース",
          "romaji": "soosu",
          "vi": "nước sốt"
        }
      ]
    },
    {
      "kana": "タ",
      "hiraganaEquivalent": "た",
      "romaji": "ta",
      "ipa": "/ta/",
      "name": "Katakana タ (ta)",
      "row": "ta",
      "strokes": 3,
      "mnemonic": "Giống chữ ク (ku) có thêm một nét gạch ngang cắt qua, như chiếc diều bay (Tung tăng).",
      "examples": [
        {
          "word": "タクシー",
          "romaji": "takushii",
          "vi": "xe taxi"
        },
        {
          "word": "タオル",
          "romaji": "taoru",
          "vi": "khăn tắm"
        }
      ]
    },
    {
      "kana": "チ",
      "hiraganaEquivalent": "ち",
      "romaji": "chi",
      "ipa": "/t͡ɕi/",
      "name": "Katakana チ (chi)",
      "row": "ta",
      "strokes": 3,
      "mnemonic": "Giống hình một chú chim non đang đứng trên cành cây hoặc số 5 có mũ che.",
      "examples": [
        {
          "word": "チーズ",
          "romaji": "chiizu",
          "vi": "phô mai"
        },
        {
          "word": "チケット",
          "romaji": "chiketto",
          "vi": "vé vào cửa"
        }
      ]
    },
    {
      "kana": "ツ",
      "hiraganaEquivalent": "つ",
      "romaji": "tsu",
      "ipa": "/t͡sɯ/",
      "name": "Katakana ツ (tsu)",
      "row": "ta",
      "strokes": 3,
      "mnemonic": "Hai nét ngắn chúc thẳng đứng từ trên, nét thứ ba vuốt CHÉM TỪ TRÊN XUỐNG DƯỚI (như 2 giọt mồ hôi rơi trúng đỉnh đầu Tsu).",
      "examples": [
        {
          "word": "ツアー",
          "romaji": "tsuaa",
          "vi": "tour du lịch"
        },
        {
          "word": "ツナ",
          "romaji": "tsuna",
          "vi": "cá ngừ"
        }
      ]
    },
    {
      "kana": "テ",
      "hiraganaEquivalent": "て",
      "romaji": "te",
      "ipa": "/te/",
      "name": "Katakana テ (te)",
      "row": "ta",
      "strokes": 3,
      "mnemonic": "Hai nét ngang và nét chéo như chiếc cột ăng-ten phát sóng truyền hình (Ten-te).",
      "examples": [
        {
          "word": "テーブル",
          "romaji": "teeburu",
          "vi": "cái bàn"
        },
        {
          "word": "テスト",
          "romaji": "tesuto",
          "vi": "bài kiểm tra"
        }
      ]
    },
    {
      "kana": "ト",
      "hiraganaEquivalent": "と",
      "romaji": "to",
      "ipa": "/to/",
      "name": "Katakana ト (to)",
      "row": "ta",
      "strokes": 2,
      "mnemonic": "Nét sổ đứng và nét nhánh xiên sang phải như cành cây thẳng tắp (Thẳng tắp - To).",
      "examples": [
        {
          "word": "トマト",
          "romaji": "tomato",
          "vi": "quả cà chua"
        },
        {
          "word": "トイレ",
          "romaji": "toire",
          "vi": "nhà vệ sinh"
        }
      ]
    },
    {
      "kana": "ナ",
      "hiraganaEquivalent": "な",
      "romaji": "na",
      "ipa": "/na/",
      "name": "Katakana ナ (na)",
      "row": "na",
      "strokes": 2,
      "mnemonic": "Nét ngang và nét phẩy chéo giống chữ Thập nghiêng hoặc lưỡi gươm ninja (Nạ - Ninja).",
      "examples": [
        {
          "word": "ナイフ",
          "romaji": "naifu",
          "vi": "con dao"
        },
        {
          "word": "ナンバー",
          "romaji": "nanbaa",
          "vi": "con số"
        }
      ]
    },
    {
      "kana": "ニ",
      "hiraganaEquivalent": "に",
      "romaji": "ni",
      "ipa": "/ɲi/",
      "name": "Katakana ニ (ni)",
      "row": "na",
      "strokes": 2,
      "mnemonic": "Hai nét ngang song song chuẩn xác như chữ Nhị (二 - số 2) trong chữ Hán.",
      "examples": [
        {
          "word": "ニュース",
          "romaji": "nyuusu",
          "vi": "tin tức thời sự"
        },
        {
          "word": "ニュージーランド",
          "romaji": "nyuujiirando",
          "vi": "New Zealand"
        }
      ]
    },
    {
      "kana": "ヌ",
      "hiraganaEquivalent": "ぬ",
      "romaji": "nu",
      "ipa": "/nɯ/",
      "name": "Katakana ヌ (nu)",
      "row": "na",
      "strokes": 2,
      "mnemonic": "Nét gập và nét chéo cắt qua như chiếc đũa đang gắp sợi mì Nui dai giòn.",
      "examples": [
        {
          "word": "ヌードル",
          "romaji": "nuudoru",
          "vi": "mì sợi"
        },
        {
          "word": "カヌー",
          "romaji": "kanuu",
          "vi": "thuyền ca-nô"
        }
      ]
    },
    {
      "kana": "ネ",
      "hiraganaEquivalent": "ね",
      "romaji": "ne",
      "ipa": "/ne/",
      "name": "Katakana ネ (ne)",
      "row": "na",
      "strokes": 4,
      "mnemonic": "Giống bộ Thị (礻), như chiếc cà vạt cổ áo người thanh niên lịch lãm (Necktie - Cà vạt).",
      "examples": [
        {
          "word": "ネクタイ",
          "romaji": "nekutai",
          "vi": "cà vạt"
        },
        {
          "word": "ネット",
          "romaji": "netto",
          "vi": "mạng internet"
        }
      ]
    },
    {
      "kana": "ノ",
      "hiraganaEquivalent": "の",
      "romaji": "no",
      "ipa": "/no/",
      "name": "Katakana ノ (no)",
      "row": "na",
      "strokes": 1,
      "mnemonic": "Chỉ một nét phẩy chéo đơn giản vuốt nhẹ từ trên xuống dưới bên trái.",
      "examples": [
        {
          "word": "ノート",
          "romaji": "nooto",
          "vi": "vở ghi chép"
        },
        {
          "word": "ノック",
          "romaji": "nokku",
          "vi": "gõ cửa"
        }
      ]
    },
    {
      "kana": "ハ",
      "hiraganaEquivalent": "は",
      "romaji": "ha",
      "ipa": "/ha/",
      "name": "Katakana ハ (ha)",
      "row": "ha",
      "strokes": 2,
      "mnemonic": "Hai nét vát sang hai bên như chữ Bát (八 - số 8) hoặc hai bên ria mép của chú hề (Hề ha ha).",
      "examples": [
        {
          "word": "パン",
          "romaji": "pan",
          "vi": "bánh mì"
        },
        {
          "word": "ハンバーガー",
          "romaji": "hanbaagaa",
          "vi": "bánh hamburger"
        }
      ]
    },
    {
      "kana": "ヒ",
      "hiraganaEquivalent": "ひ",
      "romaji": "hi",
      "ipa": "/çi/",
      "name": "Katakana ヒ (hi)",
      "row": "ha",
      "strokes": 2,
      "mnemonic": "Nét ngang gập và nét sổ đứng như người đang ngồi ghế tựa nâng ly chúc mừng (Hí hửng).",
      "examples": [
        {
          "word": "ヒーロー",
          "romaji": "hiiroo",
          "vi": "người anh hùng"
        },
        {
          "word": "ヒント",
          "romaji": "hinto",
          "vi": "gợi ý"
        }
      ]
    },
    {
      "kana": "フ",
      "hiraganaEquivalent": "ふ",
      "romaji": "fu",
      "ipa": "/ɸɯ/",
      "name": "Katakana フ (fu)",
      "row": "ha",
      "strokes": 1,
      "mnemonic": "Một nét ngang gập chéo xuống như chiếc móc cờ hoặc mũi con thuyền buồm (Phù phù).",
      "examples": [
        {
          "word": "フォーク",
          "romaji": "fooku",
          "vi": "chiếc dĩa ăn"
        },
        {
          "word": "フランス",
          "romaji": "furansu",
          "vi": "nước Pháp"
        }
      ]
    },
    {
      "kana": "ヘ",
      "hiraganaEquivalent": "へ",
      "romaji": "he",
      "ipa": "/he/",
      "name": "Katakana ヘ (he)",
      "row": "ha",
      "strokes": 1,
      "mnemonic": "Hình dáng hoàn toàn tương đồng với chữ Hiragana へ (mái nhà hình chóp nhọn).",
      "examples": [
        {
          "word": "ヘルメット",
          "romaji": "herumetto",
          "vi": "mũ bảo hiểm"
        },
        {
          "word": "ヘリコプター",
          "romaji": "herikoputaa",
          "vi": "trực thăng"
        }
      ]
    },
    {
      "kana": "ホ",
      "hiraganaEquivalent": "ほ",
      "romaji": "ho",
      "ipa": "/ho/",
      "name": "Katakana ホ (ho)",
      "row": "ha",
      "strokes": 4,
      "mnemonic": "Giống chữ Mộc (木 - cái cây) góc cạnh có hai nét phẩy hai bên như cây thông Noel trang trí hoa (Hoa hoét).",
      "examples": [
        {
          "word": "ホテル",
          "romaji": "hoteru",
          "vi": "khách sạn"
        },
        {
          "word": "ホット",
          "romaji": "hotto",
          "vi": "nóng / hot"
        }
      ]
    },
    {
      "kana": "マ",
      "hiraganaEquivalent": "ま",
      "romaji": "ma",
      "ipa": "/ma/",
      "name": "Katakana マ (ma)",
      "row": "ma",
      "strokes": 2,
      "mnemonic": "Nét gập và nét phẩy như chiếc mặt nạ che nửa khuôn mặt (Mặt nạ).",
      "examples": [
        {
          "word": "マスク",
          "romaji": "masuku",
          "vi": "khẩu trang"
        },
        {
          "word": "マンゴー",
          "romaji": "mangoo",
          "vi": "quả xoài"
        }
      ]
    },
    {
      "kana": "ミ",
      "hiraganaEquivalent": "み",
      "romaji": "mi",
      "ipa": "/mi/",
      "name": "Katakana ミ (mi)",
      "row": "ma",
      "strokes": 3,
      "mnemonic": "Ba nét gạch chéo song song như ba sợi lông mi mắt cong vút (Lông Mi).",
      "examples": [
        {
          "word": "ミルク",
          "romaji": "miruku",
          "vi": "sữa tươi"
        },
        {
          "word": "ミント",
          "romaji": "minto",
          "vi": "bạc hà"
        }
      ]
    },
    {
      "kana": "ム",
      "hiraganaEquivalent": "む",
      "romaji": "mu",
      "ipa": "/mɯ/",
      "name": "Katakana ム (mu)",
      "row": "ma",
      "strokes": 2,
      "mnemonic": "Hình tam giác góc mở như chiếc mũi tên hoặc hình chiếc mũ nhọn (Mũ nhọn).",
      "examples": [
        {
          "word": "ムービー",
          "romaji": "muubii",
          "vi": "bộ phim"
        },
        {
          "word": "ムード",
          "romaji": "muudo",
          "vi": "tâm trạng / mood"
        }
      ]
    },
    {
      "kana": "メ",
      "hiraganaEquivalent": "め",
      "romaji": "me",
      "ipa": "/me/",
      "name": "Katakana メ (me)",
      "row": "ma",
      "strokes": 2,
      "mnemonic": "Hai nét chéo cắt nhau tạo thành dấu X như thanh kiếm bắt chéo (Kiếm mạ).",
      "examples": [
        {
          "word": "メニュー",
          "romaji": "menyuu",
          "vi": "thực đơn"
        },
        {
          "word": "メール",
          "romaji": "meeru",
          "vi": "thư điện tử / email"
        }
      ]
    },
    {
      "kana": "モ",
      "hiraganaEquivalent": "も",
      "romaji": "mo",
      "ipa": "/mo/",
      "name": "Katakana モ (mo)",
      "row": "ma",
      "strokes": 3,
      "mnemonic": "Rất giống chữ Hiragana も nhưng các đường nét được kéo thẳng thớm, góc vuông vắn.",
      "examples": [
        {
          "word": "モデル",
          "romaji": "moderu",
          "vi": "người mẫu / kiểu mẫu"
        },
        {
          "word": "モーター",
          "romaji": "mootaa",
          "vi": "động cơ mô tơ"
        }
      ]
    },
    {
      "kana": "ヤ",
      "hiraganaEquivalent": "や",
      "romaji": "ya",
      "ipa": "/ja/",
      "name": "Katakana ヤ (ya)",
      "row": "ya",
      "strokes": 2,
      "mnemonic": "Giống chữ Hiragana や bỏ đi nét phẩy phụ bên phải, dáng dấp chiếc mỏ neo.",
      "examples": [
        {
          "word": "ヤング",
          "romaji": "yangu",
          "vi": "giới trẻ"
        },
        {
          "word": "ダイヤ",
          "romaji": "daiya",
          "vi": "kim cương / lịch tàu"
        }
      ]
    },
    {
      "kana": "ユ",
      "hiraganaEquivalent": "ゆ",
      "romaji": "yu",
      "ipa": "/jɯ/",
      "name": "Katakana ユ (yu)",
      "row": "ya",
      "strokes": 2,
      "mnemonic": "Góc vuông và nét ngang như chiếc gàu múc nước hoặc hình chữ U cách điệu (Chữ U).",
      "examples": [
        {
          "word": "ユニフォーム",
          "romaji": "yunifoomu",
          "vi": "đồng phục"
        },
        {
          "word": "ユーモア",
          "romaji": "yuumoa",
          "vi": "hài hước"
        }
      ]
    },
    {
      "kana": "ヨ",
      "hiraganaEquivalent": "よ",
      "romaji": "yo",
      "ipa": "/jo/",
      "name": "Katakana ヨ (yo)",
      "row": "ya",
      "strokes": 3,
      "mnemonic": "Hình chữ E viết ngược hoặc hình chiếc giá sách 3 tầng (Yoga).",
      "examples": [
        {
          "word": "ヨーグルト",
          "romaji": "yooguruto",
          "vi": "sữa chua"
        },
        {
          "word": "ヨーロッパ",
          "romaji": "yooroppa",
          "vi": "châu Âu"
        }
      ]
    },
    {
      "kana": "ラ",
      "hiraganaEquivalent": "ら",
      "romaji": "ra",
      "ipa": "/ɾa/",
      "name": "Katakana ラ (ra)",
      "row": "ra",
      "strokes": 2,
      "mnemonic": "Nét ngang và nét gập như chiếc loa phát thanh gắn trên cột (Loa phóng thanh).",
      "examples": [
        {
          "word": "ラーメン",
          "romaji": "raamen",
          "vi": "mì ramen"
        },
        {
          "word": "ラジオ",
          "romaji": "rajio",
          "vi": "đài radio"
        }
      ]
    },
    {
      "kana": "リ",
      "hiraganaEquivalent": "り",
      "romaji": "ri",
      "ipa": "/ɾi/",
      "name": "Katakana リ (ri)",
      "row": "ra",
      "strokes": 2,
      "mnemonic": "Hai nét thẳng đứng song song giống chữ Hiragana り viết kiểu tách rời.",
      "examples": [
        {
          "word": "リーダー",
          "romaji": "riidaa",
          "vi": "người lãnh đạo"
        },
        {
          "word": "リンス",
          "romaji": "rinsu",
          "vi": "dầu xả tóc"
        }
      ]
    },
    {
      "kana": "ル",
      "hiraganaEquivalent": "る",
      "romaji": "ru",
      "ipa": "/ɾɯ/",
      "name": "Katakana ル (ru)",
      "row": "ra",
      "strokes": 2,
      "mnemonic": "Hai nét như hai chân một người đang chạy bộ rất nhanh (Running).",
      "examples": [
        {
          "word": "ルール",
          "romaji": "ruuru",
          "vi": "quy tắc, luật lệ"
        },
        {
          "word": "ルート",
          "romaji": "ruuto",
          "vi": "tuyến đường"
        }
      ]
    },
    {
      "kana": "レ",
      "hiraganaEquivalent": "れ",
      "romaji": "re",
      "ipa": "/ɾe/",
      "name": "Katakana レ (re)",
      "row": "ra",
      "strokes": 1,
      "mnemonic": "Chỉ một nét gập giống chữ V một nửa hoặc dấu tích chữ V (Check mark).",
      "examples": [
        {
          "word": "レストラン",
          "romaji": "resutoran",
          "vi": "nhà hàng"
        },
        {
          "word": "レシート",
          "romaji": "reshiito",
          "vi": "hóa đơn"
        }
      ]
    },
    {
      "kana": "ロ",
      "hiraganaEquivalent": "ろ",
      "romaji": "ro",
      "ipa": "/ɾo/",
      "name": "Katakana ロ (ro)",
      "row": "ra",
      "strokes": 3,
      "mnemonic": "Hình một chiếc hộp vuông khép kín như chữ Khẩu (口 - cái miệng) trong chữ Hán.",
      "examples": [
        {
          "word": "ロボット",
          "romaji": "robotto",
          "vi": "người máy robot"
        },
        {
          "word": "ロシア",
          "romaji": "roshia",
          "vi": "nước Nga"
        }
      ]
    },
    {
      "kana": "ワ",
      "hiraganaEquivalent": "わ",
      "romaji": "wa",
      "ipa": "/ɰa/",
      "name": "Katakana ワ (wa)",
      "row": "wa",
      "strokes": 2,
      "mnemonic": "Nét sổ đứng và nét gập như một chiếc ly rượu vang đang đặt trên bàn (Rượu vang Wine).",
      "examples": [
        {
          "word": "ワイン",
          "romaji": "wain",
          "vi": "rượu vang"
        },
        {
          "word": "ワイド",
          "romaji": "waido",
          "vi": "rộng rãi"
        }
      ]
    },
    {
      "kana": "ヲ",
      "hiraganaEquivalent": "を",
      "romaji": "o",
      "ipa": "/o/",
      "name": "Katakana ヲ (wo/o)",
      "row": "wa",
      "strokes": 3,
      "mnemonic": "Giống chữ フ (fu) có thêm nét gạch ngang xuyên qua, rất hiếm dùng trong văn bản hiện đại.",
      "examples": [
        {
          "word": "ヲタク",
          "romaji": "otaku",
          "vi": "người say mê văn hóa 2D (cách viết cổ)"
        }
      ]
    },
    {
      "kana": "ン",
      "hiraganaEquivalent": "ん",
      "romaji": "n",
      "ipa": "/ɴ/",
      "name": "Katakana ン (n)",
      "row": "n",
      "strokes": 2,
      "mnemonic": "Nét thứ nhất nằm ngang chéo nhẹ, nét thứ hai hất VUỐT TỪ DƯỚI LÊN (như chữ n vút lên).",
      "examples": [
        {
          "word": "パン",
          "romaji": "pan",
          "vi": "bánh mì"
        },
        {
          "word": "レモン",
          "romaji": "remon",
          "vi": "quả chanh"
        }
      ]
    }
  ],
  "dakuten": [
    {
      "kana": "が",
      "katakana": "ガ",
      "romaji": "ga",
      "ipa": "/ɡa/",
      "base": "か",
      "type": "dakuten",
      "vi": "ga",
      "example": "がくせい (học sinh)"
    },
    {
      "kana": "ぎ",
      "katakana": "ギ",
      "romaji": "gi",
      "ipa": "/ɡi/",
      "base": "き",
      "type": "dakuten",
      "vi": "gi",
      "example": "ぎんこう (ngân hàng)"
    },
    {
      "kana": "ぐ",
      "katakana": "グ",
      "romaji": "gu",
      "ipa": "/ɡɯ/",
      "base": "く",
      "type": "dakuten",
      "vi": "gu",
      "example": "ぐらい (khoảng chừng)"
    },
    {
      "kana": "げ",
      "katakana": "ゲ",
      "romaji": "ge",
      "ipa": "/ɡe/",
      "base": "け",
      "type": "dakuten",
      "vi": "ge",
      "example": "げんき (khỏe mạnh)"
    },
    {
      "kana": "ご",
      "katakana": "ゴ",
      "romaji": "go",
      "ipa": "/ɡo/",
      "base": "こ",
      "type": "dakuten",
      "vi": "go",
      "example": "ごはん (cơm)"
    },
    {
      "kana": "ざ",
      "katakana": "ザ",
      "romaji": "za",
      "ipa": "/za/",
      "base": "さ",
      "type": "dakuten",
      "vi": "za",
      "example": "ざっし (tạp chí)"
    },
    {
      "kana": "じ",
      "katakana": "ジ",
      "romaji": "ji",
      "ipa": "/d͡ʑi/",
      "base": "し",
      "type": "dakuten",
      "vi": "ji",
      "example": "じかん (thời gian)"
    },
    {
      "kana": "ず",
      "katakana": "ズ",
      "romaji": "zu",
      "ipa": "/zɯ/",
      "base": "す",
      "type": "dakuten",
      "vi": "zu",
      "example": "ちず (bản đồ)"
    },
    {
      "kana": "ぜ",
      "katakana": "ゼ",
      "romaji": "ze",
      "ipa": "/ze/",
      "base": "せ",
      "type": "dakuten",
      "vi": "ze",
      "example": "ぜんぶ (toàn bộ)"
    },
    {
      "kana": "ぞ",
      "katakana": "ゾ",
      "romaji": "zo",
      "ipa": "/zo/",
      "base": "そ",
      "type": "dakuten",
      "vi": "zo",
      "example": "ぞう (con voi)"
    },
    {
      "kana": "だ",
      "katakana": "ダ",
      "romaji": "da",
      "ipa": "/da/",
      "base": "た",
      "type": "dakuten",
      "vi": "da",
      "example": "だいがく (trường đại học)"
    },
    {
      "kana": "ぢ",
      "katakana": "ヂ",
      "romaji": "ji",
      "ipa": "/d͡ʑi/",
      "base": "ち",
      "type": "dakuten",
      "vi": "ji (đồng âm じ)",
      "example": "はなぢ (chảy máu cam)"
    },
    {
      "kana": "づ",
      "katakana": "ヅ",
      "romaji": "zu",
      "ipa": "/zɯ/",
      "base": "つ",
      "type": "dakuten",
      "vi": "zu (đồng âm ず)",
      "example": "つづく (tiếp tục)"
    },
    {
      "kana": "で",
      "katakana": "デ",
      "romaji": "de",
      "ipa": "/de/",
      "base": "て",
      "type": "dakuten",
      "vi": "de",
      "example": "でんしゃ (tàu điện)"
    },
    {
      "kana": "ど",
      "katakana": "ド",
      "romaji": "do",
      "ipa": "/do/",
      "base": "と",
      "type": "dakuten",
      "vi": "do",
      "example": "どこ (ở đâu)"
    },
    {
      "kana": "ば",
      "katakana": "バ",
      "romaji": "ba",
      "ipa": "/ba/",
      "base": "は",
      "type": "dakuten",
      "vi": "ba",
      "example": "ばんごう (số thứ tự)"
    },
    {
      "kana": "び",
      "katakana": "ビ",
      "romaji": "bi",
      "ipa": "/bi/",
      "base": "ひ",
      "type": "dakuten",
      "vi": "bi",
      "example": "びょういん (bệnh viện)"
    },
    {
      "kana": "ぶ",
      "katakana": "ブ",
      "romaji": "bu",
      "ipa": "/bɯ/",
      "base": "ふ",
      "type": "dakuten",
      "vi": "bu",
      "example": "ぶたにく (thịt lợn)"
    },
    {
      "kana": "べ",
      "katakana": "ベ",
      "romaji": "be",
      "ipa": "/be/",
      "base": "へ",
      "type": "dakuten",
      "vi": "be",
      "example": "べんきょう (học tập)"
    },
    {
      "kana": "ぼ",
      "katakana": "ボ",
      "romaji": "bo",
      "ipa": "/bo/",
      "base": "ほ",
      "type": "dakuten",
      "vi": "bo",
      "example": "ぼうし (chiếc mũ)"
    },
    {
      "kana": "ぱ",
      "katakana": "パ",
      "romaji": "pa",
      "ipa": "/pa/",
      "base": "は",
      "type": "handakuten",
      "vi": "pa",
      "example": "パン (bánh mì)"
    },
    {
      "kana": "ぴ",
      "katakana": "ピ",
      "romaji": "pi",
      "ipa": "/pi/",
      "base": "ひ",
      "type": "handakuten",
      "vi": "pi",
      "example": "ピアノ (đàn piano)"
    },
    {
      "kana": "ぷ",
      "katakana": "プ",
      "romaji": "pu",
      "ipa": "/pɯ/",
      "base": "ふ",
      "type": "handakuten",
      "vi": "pu",
      "example": "プール (hồ bơi)"
    },
    {
      "kana": "ぺ",
      "katakana": "ペ",
      "romaji": "pe",
      "ipa": "/pe/",
      "base": "へ",
      "type": "handakuten",
      "vi": "pe",
      "example": "ペン (cây bút)"
    },
    {
      "kana": "ぽ",
      "katakana": "ポ",
      "romaji": "po",
      "ipa": "/po/",
      "base": "ほ",
      "type": "handakuten",
      "vi": "po",
      "example": "ポスト (hòm thư)"
    }
  ],
  "yoon": [
    {
      "kana": "きゃ",
      "katakana": "キャ",
      "romaji": "kya",
      "ipa": "/kʲa/",
      "example": "きゃく (khách hàng)"
    },
    {
      "kana": "きゅ",
      "katakana": "キュ",
      "romaji": "kyu",
      "ipa": "/kʲɯ/",
      "example": "きゅう (số chín 9)"
    },
    {
      "kana": "きょ",
      "katakana": "キョ",
      "romaji": "kyo",
      "ipa": "/kʲo/",
      "example": "きょう (hôm nay)"
    },
    {
      "kana": "しゃ",
      "katakana": "シャ",
      "romaji": "sha",
      "ipa": "/ɕa/",
      "example": "しゃしん (bức ảnh)"
    },
    {
      "kana": "しゅ",
      "katakana": "シュ",
      "romaji": "shu",
      "ipa": "/ɕɯ/",
      "example": "しゅみ (sở thích)"
    },
    {
      "kana": "しょ",
      "katakana": "ショ",
      "romaji": "sho",
      "ipa": "/ɕo/",
      "example": "しょくどう (nhà ăn)"
    },
    {
      "kana": "ちゃ",
      "katakana": "チャ",
      "romaji": "cha",
      "ipa": "/t͡ɕa/",
      "example": "おちゃ (nước trà)"
    },
    {
      "kana": "ちゅ",
      "katakana": "チュ",
      "romaji": "chu",
      "ipa": "/t͡ɕɯ/",
      "example": "ちゅうごく (Trung Quốc)"
    },
    {
      "kana": "ちょ",
      "katakana": "チョ",
      "romaji": "cho",
      "ipa": "/t͡ɕo/",
      "example": "ちょっと (một chút)"
    },
    {
      "kana": "にゃ",
      "katakana": "ニャ",
      "romaji": "nya",
      "ipa": "/ɲa/",
      "example": "にゃんこ (mèo con)"
    },
    {
      "kana": "にゅ",
      "katakana": "ニュ",
      "romaji": "nyu",
      "ipa": "/ɲɯ/",
      "example": "ぎゅうにゅう (sữa bò)"
    },
    {
      "kana": "にょ",
      "katakana": "ニョ",
      "romaji": "nyo",
      "ipa": "/ɲo/",
      "example": "にょうぼう (vợ mình)"
    },
    {
      "kana": "ひゃ",
      "katakana": "ヒャ",
      "romaji": "hya",
      "ipa": "/ça/",
      "example": "ひゃく (một trăm 100)"
    },
    {
      "kana": "ひゅ",
      "katakana": "ヒュ",
      "romaji": "hyu",
      "ipa": "/çɯ/",
      "example": "ひゅうひゅう (gió rít)"
    },
    {
      "kana": "ひょ",
      "katakana": "ヒョ",
      "romaji": "hyo",
      "ipa": "/ço/",
      "example": "ひょう (bảng biểu)"
    },
    {
      "kana": "みゃ",
      "katakana": "ミャ",
      "romaji": "mya",
      "ipa": "/mʲa/",
      "example": "ミャンマー (Myanmar)"
    },
    {
      "kana": "みゅ",
      "katakana": "ミュ",
      "romaji": "myu",
      "ipa": "/mʲɯ/",
      "example": "ミュージアム (bảo tàng)"
    },
    {
      "kana": "みょ",
      "katakana": "ミョ",
      "romaji": "myo",
      "ipa": "/mʲo/",
      "example": "みょうじ (họ gia tộc)"
    },
    {
      "kana": "りゃ",
      "katakana": "リャ",
      "romaji": "rya",
      "ipa": "/ɾʲa/",
      "example": "りゃく (viết tắt)"
    },
    {
      "kana": "りゅ",
      "katakana": "リュ",
      "romaji": "ryu",
      "ipa": "/ɾʲɯ/",
      "example": "りゅうがくせい (du học sinh)"
    },
    {
      "kana": "りょ",
      "katakana": "リョ",
      "romaji": "ryo",
      "ipa": "/ɾʲo/",
      "example": "りょこう (du lịch)"
    },
    {
      "kana": "ぎゃ",
      "katakana": "ギャ",
      "romaji": "gya",
      "ipa": "/ɡʲa/",
      "example": "ギャグ (trò đùa)"
    },
    {
      "kana": "ぎゅ",
      "katakana": "ギュ",
      "romaji": "gyu",
      "ipa": "/ɡʲɯ/",
      "example": "ぎゅうにく (thịt bò)"
    },
    {
      "kana": "ぎょ",
      "katakana": "ギョ",
      "romaji": "gyo",
      "ipa": "/ɡʲo/",
      "example": "ぎょうざ (bánh há cảo gyoza)"
    },
    {
      "kana": "じゃ",
      "katakana": "ジャ",
      "romaji": "ja",
      "ipa": "/d͡ʑa/",
      "example": "じゃあ (vậy thì)"
    },
    {
      "kana": "じゅ",
      "katakana": "ジュ",
      "romaji": "ju",
      "ipa": "/d͡ʑɯ/",
      "example": "じゅぎょう (tiết học)"
    },
    {
      "kana": "じょ",
      "katakana": "ジョ",
      "romaji": "jo",
      "ipa": "/d͡ʑo/",
      "example": "じょせい (phụ nữ)"
    },
    {
      "kana": "びゃ",
      "katakana": "ビャ",
      "romaji": "bya",
      "ipa": "/bʲa/",
      "example": "さんびゃく (ba trăm 300)"
    },
    {
      "kana": "びゅ",
      "katakana": "ビュ",
      "romaji": "byu",
      "ipa": "/bʲɯ/",
      "example": "ビューティー (sắc đẹp)"
    },
    {
      "kana": "びょ",
      "katakana": "ビョ",
      "romaji": "byo",
      "ipa": "/bʲo/",
      "example": "びょういん (bệnh viện)"
    },
    {
      "kana": "ぴゃ",
      "katakana": "ピャ",
      "romaji": "pya",
      "ipa": "/pʲa/",
      "example": "ろっぴゃく (sáu trăm 600)"
    },
    {
      "kana": "ぴゅ",
      "katakana": "ピュ",
      "romaji": "pyu",
      "ipa": "/pʲɯ/",
      "example": "ピューマ (con báo)"
    },
    {
      "kana": "ぴょ",
      "katakana": "ピョ",
      "romaji": "pyo",
      "ipa": "/pʲo/",
      "example": "ぴょんぴょん (nhảy nhót)"
    }
  ],
  "confusingLetters": [
    {
      "group": "Katakana",
      "pair": "シ (shi) vs ツ (tsu)",
      "charA": {
        "char": "シ",
        "romaji": "shi",
        "strokes": "2 nét chấm nằm ngang chéo nhẹ, nét thứ 3 vuốt TỪ DƯỚI LÊN.",
        "tip": "Mẹo nhớ: 'Shi' như cô gái duyên dáng có ánh mắt ngước lên nhìn (từ dưới lên trên)."
      },
      "charB": {
        "char": "ツ",
        "romaji": "tsu",
        "strokes": "2 nét chấm chúc thẳng đứng, nét thứ 3 vuốt CHÉM TỪ TRÊN XUỐNG.",
        "tip": "Mẹo nhớ: 'Tsu' như 2 giọt nước bắn mạnh từ trên cao rơi xuống đỉnh đầu."
      }
    },
    {
      "group": "Katakana",
      "pair": "ソ (so) vs ン (n)",
      "charA": {
        "char": "ソ",
        "romaji": "so",
        "strokes": "Nét 1 chúc đứng, nét 2 phẩy vuốt CHÉM TỪ TRÊN XUỐNG.",
        "tip": "Mẹo nhớ: Dòng nước xối từ trên đỉnh đầu xuống."
      },
      "charB": {
        "char": "ン",
        "romaji": "n",
        "strokes": "Nét 1 nằm ngang hơn, nét 2 hất VUỐT TỪ DƯỚI LÊN.",
        "tip": "Mẹo nhớ: Chữ n có móc hất ngược lên phía trên."
      }
    },
    {
      "group": "Katakana",
      "pair": "ウ (u) vs ワ (wa)",
      "charA": {
        "char": "ウ",
        "romaji": "u",
        "strokes": "Có nét chấm nhọn trên đỉnh đầu.",
        "tip": "Có mũ đội trên đầu là ウ (u)."
      },
      "charB": {
        "char": "ワ",
        "romaji": "wa",
        "strokes": "Không có nét chấm nhọn trên đầu, đỉnh phẳng.",
        "tip": "Không có mũ đội trên đầu là ワ (wa)."
      }
    },
    {
      "group": "Hiragana",
      "pair": "ぬ (nu) vs め (me)",
      "charA": {
        "char": "ぬ",
        "romaji": "nu",
        "strokes": "Đuôi chữ có vòng tròn xoắn thắt nút.",
        "tip": "Mẹo nhớ: 'Nu' có Nút thắt cuộn tròn ở đuôi."
      },
      "charB": {
        "char": "め",
        "romaji": "me",
        "strokes": "Đuôi chữ buông thả tự nhiên, hoàn toàn không có nút.",
        "tip": "Mẹo nhớ: 'Me' không có nút, mắt hé mở nhìn đời."
      }
    },
    {
      "group": "Hiragana",
      "pair": "わ (wa) vs ね (ne) vs れ (re)",
      "charA": {
        "char": "わ",
        "romaji": "wa",
        "strokes": "Lưng uốn cong tròn đều, đuôi buông nhẹ vào trong.",
        "tip": "Lưng tròn xoe trơn tru như con thiên nga là 'wa'."
      },
      "charB": {
        "char": "ね",
        "romaji": "ne",
        "strokes": "Đuôi có vòng xoắn thắt nút tròn.",
        "tip": "Đuôi thắt nút cuộn tròn như chú mèo 'neko' là 'ne'."
      },
      "charC": {
        "char": "れ",
        "romaji": "re",
        "strokes": "Đuôi hất ngược uốn lượn hướng ra phía ngoài.",
        "tip": "Đuôi hất vểnh ra ngoài như lưỡi câu rê cá là 're'."
      }
    },
    {
      "group": "Hiragana",
      "pair": "さ (sa) vs ち (chi)",
      "charA": {
        "char": "さ",
        "romaji": "sa",
        "strokes": "Bụng cong quay sang phía BÊN PHẢI.",
        "tip": "Chén rượu Sake quay sang phải đón rượu."
      },
      "charB": {
        "char": "ち",
        "romaji": "chi",
        "strokes": "Bụng cong quay sang phía BÊN TRÁI (giống số 5).",
        "tip": "Số 5 bụng quay sang trái là 'chi'."
      }
    },
    {
      "group": "Hiragana",
      "pair": "る (ru) vs ろ (ro)",
      "charA": {
        "char": "る",
        "romaji": "ru",
        "strokes": "Đuôi cuộn tròn thắt nút kín.",
        "tip": "Lượm ngọc ruby có nút cuộn ở đuôi là 'ru'."
      },
      "charB": {
        "char": "ろ",
        "romaji": "ro",
        "strokes": "Đuôi mở trống rỗng, không có nút tròn.",
        "tip": "Đường lộ thênh thang mở rộng là 'ro'."
      }
    },
    {
      "group": "Hiragana",
      "pair": "は (ha) vs ほ (ho)",
      "charA": {
        "char": "は",
        "romaji": "ha",
        "strokes": "Nét dọc bên trái nhô cao, nét ngang bên phải không che đầu.",
        "tip": "Đầu trần không đội mũ là 'ha'."
      },
      "charB": {
        "char": "ほ",
        "romaji": "ho",
        "strokes": "Có nét gạch ngang trên cùng che kín đỉnh nét dọc.",
        "tip": "Đội mũ bảo hộ trên đầu là 'ho'."
      }
    }
  ],
  "rules": {
    "sokuon": {
      "title": "Âm ngắt (促音 - Sokuon: っ / ッ)",
      "desc": "Chữ 'tsu' nhỏ (っ trong Hiragana, ッ trong Katakana) biểu thị khoảng dừng ngắt hơi bằng đúng 1 phách (1 mora), làm gấp đôi phụ âm đứng ngay sau nó.",
      "rules": [
        {
          "before": "Trước hàng K (k)",
          "rule": "Gấp đôi phụ âm k (kk)",
          "example": "がっこう (gakkou - trường học), きって (kitte - tem)"
        },
        {
          "before": "Trước hàng S (s/sh)",
          "rule": "Gấp đôi phụ âm s (ss/ssh)",
          "example": "ざっし (zasshi - tạp chí), けっして (kesshite - tuyệt đối không)"
        },
        {
          "before": "Trước hàng T (t/ch)",
          "rule": "Gấp đôi phụ âm t (tt/tch)",
          "example": "まって (matte - hãy đợi), きっぷ (kippu - vé)"
        },
        {
          "before": "Trước hàng P (p)",
          "rule": "Gấp đôi phụ âm p (pp)",
          "example": "いっぱい (ippai - đầy / một ly), しっぽ (shippo - cái đuôi)"
        }
      ],
      "tip": "Hãy khựng hơi lại ở cổ họng đúng 1 nhịp (như khi bạn phát âm dấu nặng trong tiếng Việt nhưng giữ hơi lại) rồi bật mạnh âm tiết tiếp theo."
    },
    "choon": {
      "title": "Trường âm (長音 - Chōon: Nguyên âm kéo dài)",
      "desc": "Trường âm là nguyên âm được phát âm ngân dài gấp đôi bình thường (2 phách thay vì 1 phách). Nếu không kéo dài trường âm, nghĩa của từ sẽ thay đổi hoàn toàn!",
      "hiraganaRules": [
        {
          "row": "Cột A (a)",
          "add": "Thêm あ",
          "example": "おかあさん (okaasan - mẹ)",
          "wrong": "おばさん (obasan - cô/dì) vs おばあさん (obaasan - bà)"
        },
        {
          "row": "Cột I (i)",
          "add": "Thêm い",
          "example": "おにいさん (oniisan - anh trai), おじいさん (ojiisan - ông)"
        },
        {
          "row": "Cột U (u)",
          "add": "Thêm う",
          "example": "くうき (kuuki - không khí), ぎゅうにゅう (gyuunyuu - sữa bò)"
        },
        {
          "row": "Cột E (e)",
          "add": "Thêm い (hoặc え với từ thuần Nhật)",
          "example": "せんせい (sensei - giáo viên), おねえさん (oneesan - chị gái)"
        },
        {
          "row": "Cột O (o)",
          "add": "Thêm う (hoặc お với từ thuần Nhật)",
          "example": "とうきょう (toukyou - Tokyo), おおかみ (ookami - chó sói)"
        }
      ],
      "katakanaRules": "Trong Katakana, toàn bộ trường âm đều được quy ước bằng một dấu gạch ngang kéo dài 'ー'. Ví dụ: コーヒー (koohii - cà phê), ケーキ (keeki - bánh ngọt), ノート (nooto - vở).",
      "tip": "Người Việt thường có thói quen đọc dứt khoát nhanh nên hay nuốt trường âm. Hãy đếm nhịp bằng cách gõ ngón tay: nguyên âm thường 1 nhịp, trường âm ngân đúng 2 nhịp đều nhau."
    },
    "hatsuonN": {
      "title": "Cách đọc chữ ん / ン (撥音 - Hatsuon)",
      "desc": "Chữ ん không bao giờ đứng đầu một từ. Cách phát âm của nó thay đổi tự nhiên thành [m], [n], [ng] hoặc nguyên âm mũi tùy thuộc vào âm tiết đi ngay sau nó.",
      "cases": [
        {
          "sound": "Đọc là [m]",
          "condition": "Khi đứng trước các âm môi: m, b, p",
          "example": "さんぽ (sanpo -> đọc là sam-po: đi dạo), しんぶん (shinbun -> đọc là shim-bum: tờ báo), てんぷら (tempura: món tempura)"
        },
        {
          "sound": "Đọc là [n]",
          "condition": "Khi đứng trước các âm răng/lợi: t, d, n, r",
          "example": "べんとう (bentou -> đọc là ben-tou: cơm hộp), おんな (onna: phụ nữ), あんない (annai: hướng dẫn)"
        },
        {
          "sound": "Đọc là [ng]",
          "condition": "Khi đứng trước các âm ngạc mềm: k, g",
          "example": "てんき (tenki -> đọc là teng-ki: thời tiết), りんご (ringo -> đọc là ring-go: quả táo), げんき (genki -> geng-ki: khỏe mạnh)"
        },
        {
          "sound": "Đọc là nguyên âm mũi [ɴ]",
          "condition": "Khi đứng ở cuối câu hoặc đứng trước nguyên âm / bán nguyên âm (a, i, u, e, o, y, w)",
          "example": "にほん (nihon: Nhật Bản), ほん (hon: quyển sách), でんわ (denwa: điện thoại)"
        }
      ]
    },
    "particles": {
      "title": "Phát âm các trợ từ ngữ pháp đặc biệt (は, へ, を)",
      "desc": "Có ba chữ Kana thay đổi cách đọc khi đảm nhận vai trò TRỢ TỪ NGỮ PHÁP trong câu tiếng Nhật:",
      "rules": [
        {
          "char": "は",
          "normal": "ha",
          "asParticle": "wa",
          "meaning": "Trợ từ chỉ chủ đề của câu",
          "example": "わたしはナムです (Watashi wa Namu desu - Tôi là Nam)",
          "note": "Chỉ đọc là 'wa' khi là trợ từ. Khi nằm trong từ vựng vẫn đọc là 'ha' (ví dụ: はな hana - hoa)."
        },
        {
          "char": "へ",
          "normal": "he",
          "asParticle": "e",
          "meaning": "Trợ từ chỉ phương hướng di chuyển",
          "example": "日本へ行きます (Nihon e ikimasu - Tôi đi đến Nhật Bản)",
          "note": "Chỉ đọc là 'e' khi là trợ từ hướng đến. Khi nằm trong từ vẫn đọc là 'he' (ví dụ: へや heya - căn phòng)."
        },
        {
          "char": "を",
          "normal": "wo/o",
          "asParticle": "o",
          "meaning": "Trợ từ chỉ đối tượng tác động trực tiếp của hành động (tân ngữ)",
          "example": "水を飲みます (Mizu o nomimasu - Tôi uống nước)",
          "note": "Trong tiếng Nhật hiện đại を chỉ dùng duy nhất với vai trò trợ từ, đọc là 'o'."
        }
      ]
    }
  },
  "confusingPairs": [
    {
      "id": "mp01",
      "pair": "つ (tsu) vs ちゅ (chu)",
      "soundA": "つ (tsu)",
      "soundB": "ちゅ (chu)",
      "wordA": {
        "word": "つき",
        "romaji": "tsuki",
        "ipa": "/t͡sɯki/",
        "vi": "mặt trăng"
      },
      "wordB": {
        "word": "ちゅうき",
        "romaji": "chuuki",
        "ipa": "/t͡ɕɯːki/",
        "vi": "trung kỳ / thời kỳ giữa"
      },
      "tip": "Âm 'tsu' đầu lưỡi đặt sát chân răng trên rồi xì hơi dẹt môi; âm 'chu' mặt lưỡi nâng áp ngạc cứng và hơi chu môi nhẹ."
    },
    {
      "id": "mp02",
      "pair": "おばさん (obasan) vs おばあさん (obaasan)",
      "soundA": "ba (ngắn)",
      "soundB": "baa (trường âm)",
      "wordA": {
        "word": "おばさん",
        "romaji": "obasan",
        "ipa": "/obasaɴ/",
        "vi": "cô, dì, bác gái (người phụ nữ trung niên)"
      },
      "wordB": {
        "word": "おばあさん",
        "romaji": "obaasan",
        "ipa": "/obaːsaɴ/",
        "vi": "bà (người già)"
      },
      "tip": "Thiếu trường âm sẽ biến bà lão thành cô trung niên hoặc ngược lại! Hãy kéo dài âm 'baa' đúng 2 nhịp vỗ tay."
    },
    {
      "id": "mp03",
      "pair": "おじさん (ojisan) vs おじいさん (ojiisan)",
      "soundA": "ji (ngắn)",
      "soundB": "jii (trường âm)",
      "wordA": {
        "word": "おじさん",
        "romaji": "ojisan",
        "ipa": "/od͡ʑisaɴ/",
        "vi": "chú, bác trai"
      },
      "wordB": {
        "word": "おじいさん",
        "romaji": "ojiisan",
        "ipa": "/od͡ʑiːsaɴ/",
        "vi": "ông nội, ông ngoại"
      },
      "tip": "Kéo dài âm 'jii' đủ 2 nhịp để phân biệt chú/bác với cụ ông."
    },
    {
      "id": "mp04",
      "pair": "きて (kite) vs きって (kitte)",
      "soundA": "te (âm thường)",
      "soundB": "tte (âm ngắt sokuon)",
      "wordA": {
        "word": "きて",
        "romaji": "kite",
        "ipa": "/kite/",
        "vi": "hãy đến đây / hãy mặc áo"
      },
      "wordB": {
        "word": "きって",
        "romaji": "kitte",
        "ipa": "/kitte/",
        "vi": "con tem thư / cắt đi"
      },
      "tip": "Âm ngắt 'kitte' có một khoảng lặng ngắt hơi dứt khoát 1 nhịp ở cổ họng trước khi phát âm 'te'."
    },
    {
      "id": "mp05",
      "pair": "ざ (za) vs じゃ (ja)",
      "soundA": "ざ (za)",
      "soundB": "じゃ (ja)",
      "wordA": {
        "word": "ざっし",
        "romaji": "zasshi",
        "ipa": "/zaɕɕi/",
        "vi": "tạp chí"
      },
      "wordB": {
        "word": "じゃま",
        "romaji": "jama",
        "ipa": "/d͡ʑama/",
        "vi": "phiền hà, cản trở"
      },
      "tip": "Âm 'za' đầu lưỡi ma sát nhẹ ở chân răng trên; âm 'ja' mặt lưỡi nâng áp ngạc cứng giống âm 'gi'/'d' miền Nam."
    },
    {
      "id": "mp06",
      "pair": "ゆき (yuki) vs ゆうき (yuuki)",
      "soundA": "yu (ngắn)",
      "soundB": "yuu (trường âm)",
      "wordA": {
        "word": "ゆき",
        "romaji": "yuki",
        "ipa": "/jɯki/",
        "vi": "tuyết rơi"
      },
      "wordB": {
        "word": "ゆうき",
        "romaji": "yuuki",
        "ipa": "/jɯːki/",
        "vi": "lòng dũng cảm"
      },
      "tip": "Trường âm 'yuu' kéo dài ngân nga gấp đôi nhịp so với âm ngắn 'yu'."
    },
    {
      "id": "mp07",
      "pair": "え (e) vs ええ (ee)",
      "soundA": "e (ngắn)",
      "soundB": "ee (trường âm)",
      "wordA": {
        "word": "え",
        "romaji": "e",
        "ipa": "/e/",
        "vi": "bức tranh vẽ"
      },
      "wordB": {
        "word": "ええ",
        "romaji": "ee",
        "ipa": "/eː/",
        "vi": "vâng, dạ, đồng ý"
      },
      "tip": "Âm ngắn 'e' dứt khoát nghĩa là bức tranh; kéo dài 'ee' là câu đáp đồng tình lịch sự."
    },
    {
      "id": "mp08",
      "pair": "ここ (koko) vs こうこう (koukou)",
      "soundA": "ko-ko (ngắn)",
      "soundB": "kou-kou (2 trường âm)",
      "wordA": {
        "word": "ここ",
        "romaji": "koko",
        "ipa": "/koko/",
        "vi": "ở đây, vị trí này"
      },
      "wordB": {
        "word": "こうこう",
        "romaji": "koukou",
        "ipa": "/koːkoː/",
        "vi": "trường trung học phổ thông (cấp 3)"
      },
      "tip": "Mỗi âm tiết trong 'koukou' đều mang trường âm kéo dài 2 nhịp."
    }
  ],
  "kanjiVGNotice": {
    "source": "KanjiVG (Vector Graphics for Japanese Characters)",
    "author": "Ulrich Apel and the KanjiVG project",
    "license": "Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)",
    "website": "https://kanjivg.tagaini.net/",
    "description": "Bộ dữ liệu thứ tự nét chuẩn mực cho toàn bộ 46 Hiragana và 46 Katakana trên Polylingo tuân thủ triệt để cấu trúc vector KanjiVG và chuẩn giáo dục MEXT của Bộ Giáo dục Nhật Bản. Quy tắc viết nét cơ bản: từ trên xuống dưới, từ trái sang phải, nét ngang trước nét sổ sau."
  },
  "sounds": [
    {
      "ipa": "/a/",
      "kana": "あ",
      "romaji": "a",
      "name": "Hiragana あ (a)",
      "group": "hiragana",
      "subgroup": "hàng A",
      "mouth": "Mở miệng tự nhiên vừa phải, hạ hàm nhẹ, phát âm rõ ràng, không mở quá to như chữ A tiếng Việt.",
      "viCompare": "Gần giống âm 'a' trong tiếng Việt nhưng khẩu hình tròn và hơi thu gọn hơn một chút.",
      "mnemonic": "Nét ngang và nét dọc giao nhau, nét thứ 3 uốn bụng tròn to như một quả táo đỏ chín mọng (Apple/An).",
      "strokes": 3,
      "examples": [
        {
          "word": "あさ (asa)",
          "kana": "あさ",
          "romaji": "asa",
          "ipa": "/a/",
          "vi": "buổi sáng"
        },
        {
          "word": "あめ (ame)",
          "kana": "あめ",
          "romaji": "ame",
          "ipa": "/a/",
          "vi": "mưa / kẹo"
        },
        {
          "word": "ありがとう (arigatou)",
          "kana": "ありがとう",
          "romaji": "arigatou",
          "ipa": "/a/",
          "vi": "cảm ơn"
        }
      ],
      "commonErrors": "Người Việt hay mở khẩu hình quá rộng giống âm /a:/ dài hoặc gán dấu thanh tiếng Việt."
    },
    {
      "ipa": "/i/",
      "kana": "い",
      "romaji": "i",
      "name": "Hiragana い (i)",
      "group": "hiragana",
      "subgroup": "hàng A",
      "mouth": "Khóe miệng kéo sang hai bên nhẹ nhàng như đang mỉm cười, lưỡi nâng cao về vòm miệng cứng.",
      "viCompare": "Gần giống âm 'i' trong tiếng Việt nhưng dứt khoát và ngắn gọn.",
      "mnemonic": "Hai nét song song hơi cong như hai nhánh tre hoặc hai que kem mát lạnh dựng đứng (Kem Ý).",
      "strokes": 2,
      "examples": [
        {
          "word": "いぬ (inu)",
          "kana": "いぬ",
          "romaji": "inu",
          "ipa": "/i/",
          "vi": "con chó"
        },
        {
          "word": "いえ (ie)",
          "kana": "いえ",
          "romaji": "ie",
          "ipa": "/i/",
          "vi": "ngôi nhà"
        },
        {
          "word": "いま (ima)",
          "kana": "いま",
          "romaji": "ima",
          "ipa": "/i/",
          "vi": "bây giờ"
        }
      ],
      "commonErrors": "Không kéo căng khóe miệng khiến âm bị đục hoặc kéo dài thành trường âm ii."
    },
    {
      "ipa": "/ɯ/",
      "kana": "う",
      "romaji": "u",
      "name": "Hiragana う (u)",
      "group": "hiragana",
      "subgroup": "hàng A",
      "mouth": "Không chu môi tròn về phía trước như 'u' tiếng Việt! Môi thả lỏng hơi bẹt dẹt, phát âm ở khoảng giữa 'u' và 'ư'.",
      "viCompare": "Lai giữa âm 'u' và 'ư' trong tiếng Việt; môi không chu tròn mà thả lỏng dẹt tự nhiên.",
      "mnemonic": "Nét phẩy trên đầu và thân chữ uốn cong bên dưới như lưng một ông lão còng lưng cúi xuống (Uốn cong).",
      "strokes": 2,
      "examples": [
        {
          "word": "うみ (umi)",
          "kana": "うみ",
          "romaji": "umi",
          "ipa": "/ɯ/",
          "vi": "biển cả"
        },
        {
          "word": "うた (uta)",
          "kana": "うた",
          "romaji": "uta",
          "ipa": "/ɯ/",
          "vi": "bài hát"
        },
        {
          "word": "うち (uchi)",
          "kana": "うち",
          "romaji": "uchi",
          "ipa": "/ɯ/",
          "vi": "nhà mình / bên trong"
        }
      ],
      "commonErrors": "Lỗi kinh điển của người Việt là chu môi tròn vo thành âm /u/ tiếng Việt khiến giọng mất tự nhiên."
    },
    {
      "ipa": "/e/",
      "kana": "え",
      "romaji": "e",
      "name": "Hiragana え (e)",
      "group": "hiragana",
      "subgroup": "hàng A",
      "mouth": "Miệng mở rộng vừa phải, khóe miệng kéo nhẹ sang hai bên, mặt lưỡi hơi nâng cao.",
      "viCompare": "Gần giống âm 'ê' nhẹ trong tiếng Việt (giữa 'e' và 'ê', thiên về 'ê').",
      "mnemonic": "Nét gạch trên đầu và thân chữ zic-zac uốn lượn như cánh chim én đang lượn bay (Chim Én / Em bé).",
      "strokes": 2,
      "examples": [
        {
          "word": "えき (eki)",
          "kana": "えき",
          "romaji": "eki",
          "ipa": "/e/",
          "vi": "nhà ga"
        },
        {
          "word": "えん (en)",
          "kana": "えん",
          "romaji": "en",
          "ipa": "/e/",
          "vi": "đồng Yên Nhật"
        },
        {
          "word": "えんぴつ (enpitsu)",
          "kana": "えんぴつ",
          "romaji": "enpitsu",
          "ipa": "/e/",
          "vi": "bút chì"
        }
      ],
      "commonErrors": "Phát âm thành âm 'e' bẹt tiếng Việt (như trong 'mẹ') thay vì âm 'ê' thanh thoát."
    },
    {
      "ipa": "/o/",
      "kana": "お",
      "romaji": "o",
      "name": "Hiragana お (o)",
      "group": "hiragana",
      "subgroup": "hàng A",
      "mouth": "Môi hơi tròn nhưng không chu dài ra trước, hạ hàm dưới nhẹ nhàng, cuống lưỡi hơi nâng.",
      "viCompare": "Gần giống âm 'ô' trong tiếng Việt (giữa 'o' và 'ô', thiên về 'ô' gọn gàng).",
      "mnemonic": "Nét ngang, nét dọc có bụng tròn và dấu phẩy bên phải như người đang ôm quả bóng to tròn (Ôm bóng).",
      "strokes": 3,
      "examples": [
        {
          "word": "おかね (okane)",
          "kana": "おかね",
          "romaji": "okane",
          "ipa": "/o/",
          "vi": "tiền bạc"
        },
        {
          "word": "おちゃ (ocha)",
          "kana": "おちゃ",
          "romaji": "ocha",
          "ipa": "/o/",
          "vi": "nước trà"
        },
        {
          "word": "おんがく (ongaku)",
          "kana": "おんがく",
          "romaji": "ongaku",
          "ipa": "/o/",
          "vi": "âm nhạc"
        }
      ],
      "commonErrors": "Đọc thành âm 'o' mở to miệng của tiếng Việt thay vì âm 'ô' gọn gàng."
    },
    {
      "ipa": "/ka/",
      "kana": "か",
      "romaji": "ka",
      "name": "Hiragana か (ka)",
      "group": "hiragana",
      "subgroup": "hàng KA",
      "mouth": "Gốc lưỡi chạm vào ngạc mềm rồi bật nhẹ luồng hơi ra kết hợp với nguyên âm a, không bật hơi quá mạnh.",
      "viCompare": "Gần giống âm 'ca' tiếng Việt nhưng không nhấn giọng nặng.",
      "mnemonic": "Nét móc và nét chém bên trong kèm dấu phẩy như chiếc ca uống nước có quai cầm (Cái Ca).",
      "strokes": 3,
      "examples": [
        {
          "word": "かわ (kawa)",
          "kana": "かわ",
          "romaji": "kawa",
          "ipa": "/ka/",
          "vi": "con sông"
        },
        {
          "word": "かさ (kasa)",
          "kana": "かさ",
          "romaji": "kasa",
          "ipa": "/ka/",
          "vi": "chiếc ô / dù"
        },
        {
          "word": "かぞく (kazoku)",
          "kana": "かぞく",
          "romaji": "kazoku",
          "ipa": "/ka/",
          "vi": "gia đình"
        }
      ],
      "commonErrors": "Bật hơi quá mạnh thành 'kha' hoặc đọc nặng thành 'cạ'."
    },
    {
      "ipa": "/ki/",
      "kana": "き",
      "romaji": "ki",
      "name": "Hiragana き (ki)",
      "group": "hiragana",
      "subgroup": "hàng KA",
      "mouth": "Mặt lưỡi áp sát ngạc cứng, miệng mở bè sang hai bên như cười rồi phát âm ki gọn gàng.",
      "viCompare": "Gần giống âm 'ki' tiếng Việt.",
      "mnemonic": "Hai nét ngang song song, nét dọc chém xuyên và vòng cung đáy như chiếc chìa khóa cổ (Key - Ki).",
      "strokes": 4,
      "examples": [
        {
          "word": "き (ki)",
          "kana": "き",
          "romaji": "ki",
          "ipa": "/ki/",
          "vi": "cái cây"
        },
        {
          "word": "きっぷ (kippu)",
          "kana": "きっぷ",
          "romaji": "kippu",
          "ipa": "/ki/",
          "vi": "vé xe/vé tàu"
        },
        {
          "word": "きょう (kyou)",
          "kana": "きょう",
          "romaji": "kyou",
          "ipa": "/ki/",
          "vi": "hôm nay"
        }
      ],
      "commonErrors": "Đọc kéo dài hoặc quên tách rời nét cong phía dưới khi viết tay."
    },
    {
      "ipa": "/kɯ/",
      "kana": "く",
      "romaji": "ku",
      "name": "Hiragana く (ku)",
      "group": "hiragana",
      "subgroup": "hàng KA",
      "mouth": "Phát âm âm /k/ kết hợp nguyên âm /ɯ/, môi dẹt thả lỏng không chu tròn.",
      "viCompare": "Giống âm 'kư'/'ku' nhẹ trong tiếng Việt nhưng dẹt môi.",
      "mnemonic": "Chỉ một nét gập nhọn hoắt như chiếc mỏ chim bồ câu đang há ra kêu cúc cu (Cúc cu).",
      "strokes": 1,
      "examples": [
        {
          "word": "くるま (kuruma)",
          "kana": "くるま",
          "romaji": "kuruma",
          "ipa": "/kɯ/",
          "vi": "xe ô tô"
        },
        {
          "word": "くち (kuchi)",
          "kana": "くち",
          "romaji": "kuchi",
          "ipa": "/kɯ/",
          "vi": "cái miệng"
        },
        {
          "word": "くに (kuni)",
          "kana": "くに",
          "romaji": "kuni",
          "ipa": "/kɯ/",
          "vi": "đất nước"
        }
      ],
      "commonErrors": "Chu môi tròn tạo thành âm 'cu' tiếng Việt."
    },
    {
      "ipa": "/ke/",
      "kana": "け",
      "romaji": "ke",
      "name": "Hiragana け (ke)",
      "group": "hiragana",
      "subgroup": "hàng KA",
      "mouth": "Bật nhẹ âm /k/ rồi chuyển nhanh sang nguyên âm /e/ (ê).",
      "viCompare": "Gần giống âm 'kê' trong tiếng Việt.",
      "mnemonic": "Nét sổ cong bên trái và chữ thập bên phải giống cây tre và chiếc kệ gỗ vững chãi (Kệ sách).",
      "strokes": 3,
      "examples": [
        {
          "word": "けさ (kesa)",
          "kana": "けさ",
          "romaji": "kesa",
          "ipa": "/ke/",
          "vi": "sáng nay"
        },
        {
          "word": "けいさつ (keisatsu)",
          "kana": "けいさつ",
          "romaji": "keisatsu",
          "ipa": "/ke/",
          "vi": "cảnh sát"
        },
        {
          "word": "けっこん (kekkon)",
          "kana": "けっこん",
          "romaji": "kekkon",
          "ipa": "/ke/",
          "vi": "kết hôn"
        }
      ],
      "commonErrors": "Đọc thành 'ke' tiếng Việt thay vì 'kê'."
    },
    {
      "ipa": "/ko/",
      "kana": "こ",
      "romaji": "ko",
      "name": "Hiragana こ (ko)",
      "group": "hiragana",
      "subgroup": "hàng KA",
      "mouth": "Bật nhẹ âm /k/ kết hợp nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống âm 'cô' trong tiếng Việt.",
      "mnemonic": "Hai nét ngang uốn cong nhẹ đối xứng trên dưới như hai khúc gỗ xếp chồng hoặc miệng cốc nhỏ (Cốc nhỏ).",
      "strokes": 2,
      "examples": [
        {
          "word": "こども (kodomo)",
          "kana": "こども",
          "romaji": "kodomo",
          "ipa": "/ko/",
          "vi": "trẻ em"
        },
        {
          "word": "こえ (koe)",
          "kana": "こえ",
          "romaji": "koe",
          "ipa": "/ko/",
          "vi": "tiếng nói"
        },
        {
          "word": "ここ (koko)",
          "kana": "ここ",
          "romaji": "koko",
          "ipa": "/ko/",
          "vi": "ở đây"
        }
      ],
      "commonErrors": "Phát âm thành 'co' thay vì 'cô'."
    },
    {
      "ipa": "/sa/",
      "kana": "さ",
      "romaji": "sa",
      "name": "Hiragana さ (sa)",
      "group": "hiragana",
      "subgroup": "hàng SA",
      "mouth": "Đầu lưỡi đặt gần chân răng trên, đẩy luồng hơi xì nhẹ qua kẽ răng rồi mở sang nguyên âm a.",
      "viCompare": "Gần giống âm 'x' nhẹ tiếng Việt (như trong 'xa xôi'), không uốn cong lưỡi như 's'.",
      "mnemonic": "Nét ngang chéo, nét cắt và nét uốn bụng quay sang phải như chén rượu Sake đang được rót tràn đầy.",
      "strokes": 3,
      "examples": [
        {
          "word": "さくら (sakura)",
          "kana": "さくら",
          "romaji": "sakura",
          "ipa": "/sa/",
          "vi": "hoa anh đào"
        },
        {
          "word": "さかな (sakana)",
          "kana": "さかな",
          "romaji": "sakana",
          "ipa": "/sa/",
          "vi": "con cá"
        },
        {
          "word": "さとう (satou)",
          "kana": "さとう",
          "romaji": "satou",
          "ipa": "/sa/",
          "vi": "đường ăn"
        }
      ],
      "commonErrors": "Uốn cong lưỡi phát âm nặng như chữ 's' miền Nam Việt Nam."
    },
    {
      "ipa": "/ɕi/",
      "kana": "し",
      "romaji": "shi",
      "name": "Hiragana し (shi)",
      "group": "hiragana",
      "subgroup": "hàng SA",
      "mouth": "Mặt lưỡi nâng sát ngạc cứng, thổi luồng hơi xì êm dịu, không chu môi tròn như 'sh' tiếng Anh.",
      "viCompare": "Gần giống âm 'x' tiếng Việt nhưng luồng hơi dày và êm hơn, lướt nhẹ sang 'i'.",
      "mnemonic": "Một nét cong vút mềm mại như chiếc lưỡi câu cá hoặc suối tóc người thiếu nữ dài thướt tha.",
      "strokes": 1,
      "examples": [
        {
          "word": "しお (shio)",
          "kana": "しお",
          "romaji": "shio",
          "ipa": "/ɕi/",
          "vi": "muối ăn"
        },
        {
          "word": "しんぶん (shinbun)",
          "kana": "しんぶん",
          "romaji": "shinbun",
          "ipa": "/ɕi/",
          "vi": "tờ báo"
        },
        {
          "word": "しゃしん (shashin)",
          "kana": "しゃしん",
          "romaji": "shashin",
          "ipa": "/ɕi/",
          "vi": "bức ảnh"
        }
      ],
      "commonErrors": "Đọc thành 'si' đanh cứng hoặc chu môi quá mức thành 'sh' tiếng Anh."
    },
    {
      "ipa": "/sɯ/",
      "kana": "す",
      "romaji": "su",
      "name": "Hiragana す (su)",
      "group": "hiragana",
      "subgroup": "hàng SA",
      "mouth": "Đầu lưỡi đặt sát chân răng, xì luồng hơi nhẹ với môi dẹt thả lỏng (không chu môi!).",
      "viCompare": "Gần giống 'xư'/'xu' tiếng Việt với môi dẹt hoàn toàn.",
      "mnemonic": "Nét ngang và nét dọc có vòng xoắn thắt nút ở giữa như dây đu đu đưa trên cành cây (Xích đu).",
      "strokes": 2,
      "examples": [
        {
          "word": "すし (sushi)",
          "kana": "すし",
          "romaji": "sushi",
          "ipa": "/sɯ/",
          "vi": "món sushi"
        },
        {
          "word": "すき (suki)",
          "kana": "すき",
          "romaji": "suki",
          "ipa": "/sɯ/",
          "vi": "thích thú"
        },
        {
          "word": "すこし (sukoshi)",
          "kana": "すこし",
          "romaji": "sukoshi",
          "ipa": "/sɯ/",
          "vi": "một chút"
        }
      ],
      "commonErrors": "Chu môi tròn thành 'xu' tiếng Việt."
    },
    {
      "ipa": "/se/",
      "kana": "せ",
      "romaji": "se",
      "name": "Hiragana せ (se)",
      "group": "hiragana",
      "subgroup": "hàng SA",
      "mouth": "Xì nhẹ âm /s/ rồi chuyển sang nguyên âm /e/ (ê).",
      "viCompare": "Gần giống âm 'xê' trong tiếng Việt.",
      "mnemonic": "Nét ngang dài và 2 nét dọc đối xứng như 2 người bạn ngồi trên xe trò chuyện chia sẻ (Xe cộ / Sẻ chia).",
      "strokes": 3,
      "examples": [
        {
          "word": "せんせい (sensei)",
          "kana": "せんせい",
          "romaji": "sensei",
          "ipa": "/se/",
          "vi": "thầy cô giáo"
        },
        {
          "word": "せかい (sekai)",
          "kana": "せかい",
          "romaji": "sekai",
          "ipa": "/se/",
          "vi": "thế giới"
        },
        {
          "word": "せんしゅう (senshuu)",
          "kana": "せんしゅう",
          "romaji": "senshuu",
          "ipa": "/se/",
          "vi": "tuần trước"
        }
      ],
      "commonErrors": "Đọc thành 'xe' bẹt tiếng Việt."
    },
    {
      "ipa": "/so/",
      "kana": "そ",
      "romaji": "so",
      "name": "Hiragana そ (so)",
      "group": "hiragana",
      "subgroup": "hàng SA",
      "mouth": "Xì nhẹ âm /s/ kết hợp với nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống âm 'xô' trong tiếng Việt.",
      "mnemonic": "Một nét zic-zac liên hoàn nối nhau uốn lượn như đường kim sợi chỉ đang khâu vá (So sợi chỉ).",
      "strokes": 1,
      "examples": [
        {
          "word": "そら (sora)",
          "kana": "そら",
          "romaji": "sora",
          "ipa": "/so/",
          "vi": "bầu trời"
        },
        {
          "word": "そこ (soko)",
          "kana": "そこ",
          "romaji": "soko",
          "ipa": "/so/",
          "vi": "chỗ đó"
        },
        {
          "word": "そして (soshite)",
          "kana": "そして",
          "romaji": "soshite",
          "ipa": "/so/",
          "vi": "và rồi, sau đó"
        }
      ],
      "commonErrors": "Đọc thành 'xo' thay vì 'xô'."
    },
    {
      "ipa": "/ta/",
      "kana": "た",
      "romaji": "ta",
      "name": "Hiragana た (ta)",
      "group": "hiragana",
      "subgroup": "hàng TA",
      "mouth": "Đầu lưỡi chạm ngạc chân răng trên rồi hạ xuống bật âm /t/, không bật luồng hơi mạnh.",
      "viCompare": "Gần giống âm 'ta' trong tiếng Việt (như 'tà áo').",
      "mnemonic": "Nét thập bên trái kết hợp 2 nét bên phải trông như hai chữ 'ta' lồng ghép vào nhau.",
      "strokes": 4,
      "examples": [
        {
          "word": "たまご (tamago)",
          "kana": "たまご",
          "romaji": "tamago",
          "ipa": "/ta/",
          "vi": "quả trứng"
        },
        {
          "word": "たべる (taberu)",
          "kana": "たべる",
          "romaji": "taberu",
          "ipa": "/ta/",
          "vi": "ăn uống"
        },
        {
          "word": "たかい (takai)",
          "kana": "たかい",
          "romaji": "takai",
          "ipa": "/ta/",
          "vi": "cao / đắt"
        }
      ],
      "commonErrors": "Bật hơi quá mạnh biến thành âm 'tha' tiếng Việt."
    },
    {
      "ipa": "/t͡ɕi/",
      "kana": "ち",
      "romaji": "chi",
      "name": "Hiragana ち (chi)",
      "group": "hiragana",
      "subgroup": "hàng TA",
      "mouth": "Mặt lưỡi ép sát ngạc cứng rồi bật nhẹ luồng hơi xì thoát ra kết hợp nguyên âm i.",
      "viCompare": "Gần giống âm 'chi' tiếng Việt nhưng bật êm và mượt mà hơn.",
      "mnemonic": "Nét ngang và nét uốn bụng to quay sang trái giống số 5, như một chú chim nhỏ đang đậu (Chim sẻ).",
      "strokes": 2,
      "examples": [
        {
          "word": "ちず (chizu)",
          "kana": "ちず",
          "romaji": "chizu",
          "ipa": "/t͡ɕi/",
          "vi": "bản đồ"
        },
        {
          "word": "ちち (chichi)",
          "kana": "ちち",
          "romaji": "chichi",
          "ipa": "/t͡ɕi/",
          "vi": "bố (của mình)"
        },
        {
          "word": "ちかい (chikai)",
          "kana": "ちかい",
          "romaji": "chikai",
          "ipa": "/t͡ɕi/",
          "vi": "gần gũi"
        }
      ],
      "commonErrors": "Người Việt dễ nhầm lẫn giữa ち (chi) và つ (tsu) hoặc phát âm thành 'ti'."
    },
    {
      "ipa": "/t͡sɯ/",
      "kana": "つ",
      "romaji": "tsu",
      "name": "Hiragana つ (tsu)",
      "group": "hiragana",
      "subgroup": "hàng TA",
      "mouth": "Đầu lưỡi chạm sát mặt sau răng cửa trên, bật nhẹ âm /t/ rồi thả lướt ngay sang luồng hơi xì /s/ với môi dẹt.",
      "viCompare": "Không có âm tương đương trong tiếng Việt. Ghép nhanh giữa 't' và 'xư' dẹt môi.",
      "mnemonic": "Nét cong trăng khuyết như cơn sóng thần cuộn trào Tsunami đổ bộ vào bờ biển.",
      "strokes": 1,
      "examples": [
        {
          "word": "つくえ (tsukue)",
          "kana": "つくえ",
          "romaji": "tsukue",
          "ipa": "/t͡sɯ/",
          "vi": "cái bàn học"
        },
        {
          "word": "つき (tsuki)",
          "kana": "つき",
          "romaji": "tsuki",
          "ipa": "/t͡sɯ/",
          "vi": "mặt trăng"
        },
        {
          "word": "つぎ (tsugi)",
          "kana": "つぎ",
          "romaji": "tsugi",
          "ipa": "/t͡sɯ/",
          "vi": "tiếp theo"
        }
      ],
      "commonErrors": "Lỗi phổ biến hàng đầu của người Việt: đọc thành 'chu' (nhầm sang ちゅ) hoặc đọc thành 'tu'."
    },
    {
      "ipa": "/te/",
      "kana": "て",
      "romaji": "te",
      "name": "Hiragana て (te)",
      "group": "hiragana",
      "subgroup": "hàng TA",
      "mouth": "Đầu lưỡi chạm chân răng trên bật âm /t/ rồi mở sang nguyên âm /e/ (ê).",
      "viCompare": "Gần giống âm 'tê' trong tiếng Việt.",
      "mnemonic": "Nét ngang rồi vòng uốn cong như cánh tay đưa ra đỡ lấy đồ vật (Bàn tay - Te).",
      "strokes": 1,
      "examples": [
        {
          "word": "て (te)",
          "kana": "て",
          "romaji": "te",
          "ipa": "/te/",
          "vi": "bàn tay"
        },
        {
          "word": "てがみ (tegami)",
          "kana": "てがみ",
          "romaji": "tegami",
          "ipa": "/te/",
          "vi": "bức thư"
        },
        {
          "word": "てんき (tenki)",
          "kana": "てんき",
          "romaji": "tenki",
          "ipa": "/te/",
          "vi": "thời tiết"
        }
      ],
      "commonErrors": "Đọc thành 'te' bẹt thay vì 'tê'."
    },
    {
      "ipa": "/to/",
      "kana": "と",
      "romaji": "to",
      "name": "Hiragana と (to)",
      "group": "hiragana",
      "subgroup": "hàng TA",
      "mouth": "Bật nhẹ âm /t/ kết hợp nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống âm 'tô' trong tiếng Việt.",
      "mnemonic": "Nét xiên ngắn và nét cong ôm lấy như ngón chân cái to tướng bị gai đâm sưng phồng (To tướng).",
      "strokes": 2,
      "examples": [
        {
          "word": "とけい (tokei)",
          "kana": "とけい",
          "romaji": "tokei",
          "ipa": "/to/",
          "vi": "đồng hồ"
        },
        {
          "word": "ともだち (tomodachi)",
          "kana": "ともだち",
          "romaji": "tomodachi",
          "ipa": "/to/",
          "vi": "bạn bè"
        },
        {
          "word": "とうきょう (toukyou)",
          "kana": "とうきょう",
          "romaji": "toukyou",
          "ipa": "/to/",
          "vi": "thủ đô Tokyo"
        }
      ],
      "commonErrors": "Đọc thành 'to' mở miệng rộng thay vì 'tô'."
    },
    {
      "ipa": "/na/",
      "kana": "な",
      "romaji": "na",
      "name": "Hiragana な (na)",
      "group": "hiragana",
      "subgroup": "hàng NA",
      "mouth": "Đầu lưỡi chạm ngạc cứng thả luồng hơi qua mũi rồi mở sang nguyên âm a.",
      "viCompare": "Giống âm 'na' trong tiếng Việt.",
      "mnemonic": "Nét chữ thập bên trái kết hợp nét phẩy và vòng cuộn thắt nút bên phải như cô gái đang quỳ chắp tay cầu nguyện.",
      "strokes": 4,
      "examples": [
        {
          "word": "なつ (natsu)",
          "kana": "なつ",
          "romaji": "natsu",
          "ipa": "/na/",
          "vi": "mùa hè"
        },
        {
          "word": "なまえ (namae)",
          "kana": "なまえ",
          "romaji": "namae",
          "ipa": "/na/",
          "vi": "tên gọi"
        },
        {
          "word": "なに (nani)",
          "kana": "なに",
          "romaji": "nani",
          "ipa": "/na/",
          "vi": "cái gì"
        }
      ],
      "commonErrors": "Viết dính liền nét phẩy và nét thắt đuôi thành một nét sai chuẩn."
    },
    {
      "ipa": "/ɲi/",
      "kana": "に",
      "romaji": "ni",
      "name": "Hiragana に (ni)",
      "group": "hiragana",
      "subgroup": "hàng NA",
      "mouth": "Mặt lưỡi nâng áp ngạc cứng, đẩy âm mũi rồi chuyển sang nguyên âm i.",
      "viCompare": "Gần giống âm 'ni' trong tiếng Việt.",
      "mnemonic": "Nét sổ đứng bên trái và 2 nét ngang bên phải như số 2 (ni) trong tiếng Nhật hoặc chiếc kim và sợi chỉ.",
      "strokes": 3,
      "examples": [
        {
          "word": "にほん (nihon)",
          "kana": "にほん",
          "romaji": "nihon",
          "ipa": "/ɲi/",
          "vi": "Nhật Bản"
        },
        {
          "word": "にく (niku)",
          "kana": "にく",
          "romaji": "niku",
          "ipa": "/ɲi/",
          "vi": "thịt"
        },
        {
          "word": "にちようび (nichiyoubi)",
          "kana": "にちようび",
          "romaji": "nichiyoubi",
          "ipa": "/ɲi/",
          "vi": "chủ nhật"
        }
      ],
      "commonErrors": "Dễ nhầm lẫn khi viết với こ (ko) hoặc た (ta)."
    },
    {
      "ipa": "/nɯ/",
      "kana": "ぬ",
      "romaji": "nu",
      "name": "Hiragana ぬ (nu)",
      "group": "hiragana",
      "subgroup": "hàng NA",
      "mouth": "Đầu lưỡi chạm vòm miệng trên rồi mở sang nguyên âm /ɯ/ môi dẹt.",
      "viCompare": "Giống âm 'nư'/'nu' nhẹ trong tiếng Việt với môi không chu tròn.",
      "mnemonic": "Nét xiên và nét uốn lượn có vòng cuộn thắt nút ở đuôi như một sợi mì Ramen cuộn lại (Nui / Nút thắt).",
      "strokes": 2,
      "examples": [
        {
          "word": "いぬ (inu)",
          "kana": "いぬ",
          "romaji": "inu",
          "ipa": "/nɯ/",
          "vi": "con chó"
        },
        {
          "word": "ぬの (nuno)",
          "kana": "ぬの",
          "romaji": "nuno",
          "ipa": "/nɯ/",
          "vi": "vải vóc"
        },
        {
          "word": "ぬぐ (nugu)",
          "kana": "ぬぐ",
          "romaji": "nugu",
          "ipa": "/nɯ/",
          "vi": "cởi (áo, giày)"
        }
      ],
      "commonErrors": "Rất dễ nhầm lẫn với chữ め (me) - hãy nhớ: 'nu' có nút cuộn ở đuôi, 'me' không có nút."
    },
    {
      "ipa": "/ne/",
      "kana": "ね",
      "romaji": "ne",
      "name": "Hiragana ね (ne)",
      "group": "hiragana",
      "subgroup": "hàng NA",
      "mouth": "Đầu lưỡi chạm vòm miệng trên rồi chuyển sang nguyên âm /e/ (ê).",
      "viCompare": "Gần giống âm 'nê' trong tiếng Việt.",
      "mnemonic": "Nét sổ đứng và nét uốn lượn thắt nút ở đuôi như chú mèo con đang cuộn tròn đuôi ngủ (Neko - Mèo).",
      "strokes": 2,
      "examples": [
        {
          "word": "ねこ (neko)",
          "kana": "ねこ",
          "romaji": "neko",
          "ipa": "/ne/",
          "vi": "con mèo"
        },
        {
          "word": "ねる (neru)",
          "kana": "ねる",
          "romaji": "neru",
          "ipa": "/ne/",
          "vi": "ngủ"
        },
        {
          "word": "ねつ (netsu)",
          "kana": "ねつ",
          "romaji": "netsu",
          "ipa": "/ne/",
          "vi": "sốt / nhiệt"
        }
      ],
      "commonErrors": "Rất dễ nhầm với わ (wa) và れ (re). Mẹo nhớ: ね có đuôi cuộn tròn thắt nút."
    },
    {
      "ipa": "/no/",
      "kana": "の",
      "romaji": "no",
      "name": "Hiragana の (no)",
      "group": "hiragana",
      "subgroup": "hàng NA",
      "mouth": "Phát âm âm /n/ kết hợp nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống âm 'nô' trong tiếng Việt.",
      "mnemonic": "Một nét cong tròn xoắn ốc khép kín như biển báo cấm quay đầu xe hoặc chiếc nơ cài áo xinh xắn.",
      "strokes": 1,
      "examples": [
        {
          "word": "のみもの (nomimono)",
          "kana": "のみもの",
          "romaji": "nomimono",
          "ipa": "/no/",
          "vi": "đồ uống"
        },
        {
          "word": "のり (nori)",
          "kana": "のり",
          "romaji": "nori",
          "ipa": "/no/",
          "vi": "rong biển"
        },
        {
          "word": "ノート (nooto)",
          "kana": "ノート",
          "romaji": "nooto",
          "ipa": "/no/",
          "vi": "vở ghi chép"
        }
      ],
      "commonErrors": "Đọc thành 'no' tiếng Việt thay vì 'nô'."
    },
    {
      "ipa": "/ha/",
      "kana": "は",
      "romaji": "ha",
      "name": "Hiragana は (ha)",
      "group": "hiragana",
      "subgroup": "hàng HA",
      "mouth": "Khí quản mở rộng, đẩy luồng hơi êm từ cổ họng thoát ra cùng nguyên âm a.",
      "viCompare": "Giống âm 'ha' trong tiếng Việt. Khi làm trợ từ đọc là 'wa'.",
      "mnemonic": "Nét sổ đứng bên trái kết hợp nét ngang và bụng thắt nút tròn bên phải như bông hoa nở rộ (Ha ha hoa nở).",
      "strokes": 3,
      "examples": [
        {
          "word": "はな (hana)",
          "kana": "はな",
          "romaji": "hana",
          "ipa": "/ha/",
          "vi": "hoa / chiếc mũi"
        },
        {
          "word": "はし (hashi)",
          "kana": "はし",
          "romaji": "hashi",
          "ipa": "/ha/",
          "vi": "đôi đũa / cây cầu"
        },
        {
          "word": "はい (hai)",
          "kana": "はい",
          "romaji": "hai",
          "ipa": "/ha/",
          "vi": "vâng, dạ"
        }
      ],
      "commonErrors": "Quên quy tắc biến âm: Khi 'は' đóng vai trò là TRỢ TỪ chủ đề thì phải đọc là 'wa' chứ không đọc là 'ha'."
    },
    {
      "ipa": "/çi/",
      "kana": "ひ",
      "romaji": "hi",
      "name": "Hiragana ひ (hi)",
      "group": "hiragana",
      "subgroup": "hàng HA",
      "mouth": "Thân lưỡi nâng cao sát ngạc cứng, thổi luồng hơi xì qua khe hẹp lưỡi và ngạc.",
      "viCompare": "Gần giống âm 'hi' trong tiếng Việt nhưng có luồng ma sát ngạc cứng êm ái.",
      "mnemonic": "Nét uốn cong đáy bằng như khuôn miệng đang hé cười hí hí sảng khoái (Hí hí).",
      "strokes": 1,
      "examples": [
        {
          "word": "ひ (hi)",
          "kana": "ひ",
          "romaji": "hi",
          "ipa": "/çi/",
          "vi": "mặt trời / lửa"
        },
        {
          "word": "ひと (hito)",
          "kana": "ひと",
          "romaji": "hito",
          "ipa": "/çi/",
          "vi": "con người"
        },
        {
          "word": "ひる (hiru)",
          "kana": "ひる",
          "romaji": "hiru",
          "ipa": "/çi/",
          "vi": "buổi trưa"
        }
      ],
      "commonErrors": "Phát âm quá nhẹ như chữ 'h' tiếng Việt mà thiếu luồng ma sát ngạc cứng."
    },
    {
      "ipa": "/ɸɯ/",
      "kana": "ふ",
      "romaji": "fu",
      "name": "Hiragana ふ (fu)",
      "group": "hiragana",
      "subgroup": "hàng HA",
      "mouth": "TUYỆT ĐỐI KHÔNG CẮN RĂNG VÀO MÔI! Hai môi khép hờ tự nhiên rồi thổi luồng hơi nhẹ qua khe giữa hai môi như đang thổi nến.",
      "viCompare": "Không giống 'phu' tiếng Việt (vì tiếng Việt răng cắn môi). ふ là âm môi - môi, thổi hơi nhẹ nhàng.",
      "mnemonic": "Nét phẩy đỉnh, nét cong giữa và hai dấu phẩy hai bên như ngọn núi Phú Sĩ tuyết phủ sừng sững.",
      "strokes": 4,
      "examples": [
        {
          "word": "ふね (fune)",
          "kana": "ふね",
          "romaji": "fune",
          "ipa": "/ɸɯ/",
          "vi": "con tàu, thuyền"
        },
        {
          "word": "ふゆ (fuyu)",
          "kana": "ふゆ",
          "romaji": "fuyu",
          "ipa": "/ɸɯ/",
          "vi": "mùa đông"
        },
        {
          "word": "ふじさん (fujisan)",
          "kana": "ふじさん",
          "romaji": "fujisan",
          "ipa": "/ɸɯ/",
          "vi": "núi Phú Sĩ"
        }
      ],
      "commonErrors": "Người Việt hay dùng răng trên cắn vào môi dưới thành âm 'ph' (phu), đây là lỗi phát âm rất phổ biến."
    },
    {
      "ipa": "/he/",
      "kana": "へ",
      "romaji": "he",
      "name": "Hiragana へ (he)",
      "group": "hiragana",
      "subgroup": "hàng HA",
      "mouth": "Đẩy hơi nhẹ từ họng kết hợp nguyên âm /e/ (ê). Khi làm trợ từ đọc là 'e'.",
      "viCompare": "Gần giống âm 'hê' trong tiếng Việt.",
      "mnemonic": "Một nét gập nhọn hình mái nhà hoặc ngọn đồi thoai thoải (Hè về leo đồi).",
      "strokes": 1,
      "examples": [
        {
          "word": "へや (heya)",
          "kana": "へや",
          "romaji": "heya",
          "ipa": "/he/",
          "vi": "căn phòng"
        },
        {
          "word": "へた (heta)",
          "kana": "へた",
          "romaji": "heta",
          "ipa": "/he/",
          "vi": "vụng về, kém"
        },
        {
          "word": "へいわ (heiwa)",
          "kana": "へいわ",
          "romaji": "heiwa",
          "ipa": "/he/",
          "vi": "hòa bình"
        }
      ],
      "commonErrors": "Khi làm trợ từ chỉ phương hướng di chuyển (へ), đọc là 'e' chứ không đọc là 'he'."
    },
    {
      "ipa": "/ho/",
      "kana": "ほ",
      "romaji": "ho",
      "name": "Hiragana ほ (ho)",
      "group": "hiragana",
      "subgroup": "hàng HA",
      "mouth": "Đẩy hơi nhẹ từ cổ họng kết hợp nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống âm 'hô' trong tiếng Việt.",
      "mnemonic": "Giống chữ は nhưng có thêm nét gạch ngang che kín đỉnh đầu như người đội mũ bảo hiểm (Hộ mũ).",
      "strokes": 4,
      "examples": [
        {
          "word": "ほん (hon)",
          "kana": "ほん",
          "romaji": "hon",
          "ipa": "/ho/",
          "vi": "quyển sách"
        },
        {
          "word": "ほし (hoshi)",
          "kana": "ほし",
          "romaji": "hoshi",
          "ipa": "/ho/",
          "vi": "ngôi sao"
        },
        {
          "word": "ホテル (hoteru)",
          "kana": "ホテル",
          "romaji": "hoteru",
          "ipa": "/ho/",
          "vi": "khách sạn"
        }
      ],
      "commonErrors": "Hay viết nhầm nét dọc xuyên qua nét ngang trên cùng giống chữ ま."
    },
    {
      "ipa": "/ma/",
      "kana": "ま",
      "romaji": "ma",
      "name": "Hiragana ま (ma)",
      "group": "hiragana",
      "subgroup": "hàng MA",
      "mouth": "Hai môi mím nhẹ rồi mở bung ra kết hợp nguyên âm a.",
      "viCompare": "Giống âm 'ma' trong tiếng Việt.",
      "mnemonic": "Hai nét ngang song song, nét dọc thấu qua uốn bụng tròn như cột buồm căng gió lướt sóng.",
      "strokes": 3,
      "examples": [
        {
          "word": "まち (machi)",
          "kana": "まち",
          "romaji": "machi",
          "ipa": "/ma/",
          "vi": "thị trấn, phố xá"
        },
        {
          "word": "まえ (mae)",
          "kana": "まえ",
          "romaji": "mae",
          "ipa": "/ma/",
          "vi": "phía trước"
        },
        {
          "word": "まいにち (mainichi)",
          "kana": "まいにち",
          "romaji": "mainichi",
          "ipa": "/ma/",
          "vi": "hàng ngày"
        }
      ],
      "commonErrors": "Dễ nhầm nét với ほ (ho) - nhớ rằng ま nét dọc không nhô lên khỏi nét ngang trên cùng."
    },
    {
      "ipa": "/mi/",
      "kana": "み",
      "romaji": "mi",
      "name": "Hiragana み (mi)",
      "group": "hiragana",
      "subgroup": "hàng MA",
      "mouth": "Mím nhẹ hai môi rồi mở sang nguyên âm i với khóe miệng mở bè.",
      "viCompare": "Giống âm 'mi' trong tiếng Việt.",
      "mnemonic": "Nét uốn như số 21 cách điệu hoa mỹ hoặc nốt nhạc Mi ngân vang vui vẻ.",
      "strokes": 2,
      "examples": [
        {
          "word": "みず (mizu)",
          "kana": "みず",
          "romaji": "mizu",
          "ipa": "/mi/",
          "vi": "nước uống"
        },
        {
          "word": "みみ (mimi)",
          "kana": "みみ",
          "romaji": "mimi",
          "ipa": "/mi/",
          "vi": "cái tai"
        },
        {
          "word": "みち (michi)",
          "kana": "みち",
          "romaji": "michi",
          "ipa": "/mi/",
          "vi": "con đường"
        }
      ],
      "commonErrors": "Viết nét thứ hai quá ngắn hoặc không cắt ngang qua bụng nét thứ nhất."
    },
    {
      "ipa": "/mɯ/",
      "kana": "む",
      "romaji": "mu",
      "name": "Hiragana む (mu)",
      "group": "hiragana",
      "subgroup": "hàng MA",
      "mouth": "Mím hai môi rồi mở sang nguyên âm /ɯ/ môi dẹt thả lỏng (không chu môi).",
      "viCompare": "Giống 'mư'/'mu' trong tiếng Việt với môi dẹt hoàn toàn.",
      "mnemonic": "Nét ngang, nét dọc thắt vòng tròn vắt sang phải và dấu phẩy như đầu chú bò sữa đang kêu u mu (Bò kêu Mu mu).",
      "strokes": 3,
      "examples": [
        {
          "word": "むし (mushi)",
          "kana": "むし",
          "romaji": "mushi",
          "ipa": "/mɯ/",
          "vi": "côn trùng"
        },
        {
          "word": "むね (mune)",
          "kana": "むね",
          "romaji": "mune",
          "ipa": "/mɯ/",
          "vi": "lồng ngực"
        },
        {
          "word": "むずかしい (muzukashii)",
          "kana": "むずかしい",
          "romaji": "muzukashii",
          "ipa": "/mɯ/",
          "vi": "khó khăn"
        }
      ],
      "commonErrors": "Chu môi tròn thành 'mu' tiếng Việt hoặc quên dấu phẩy ở nét thứ ba."
    },
    {
      "ipa": "/me/",
      "kana": "め",
      "romaji": "me",
      "name": "Hiragana め (me)",
      "group": "hiragana",
      "subgroup": "hàng MA",
      "mouth": "Mím môi nhẹ rồi mở sang nguyên âm /e/ (ê).",
      "viCompare": "Gần giống âm 'mê' trong tiếng Việt.",
      "mnemonic": "Nét xiên và nét cong buông thả không thắt nút, giống như con mắt đang hé mở nhìn đời (Me me nhìn đời / Mắt).",
      "strokes": 2,
      "examples": [
        {
          "word": "め (me)",
          "kana": "め",
          "romaji": "me",
          "ipa": "/me/",
          "vi": "con mắt"
        },
        {
          "word": "めがね (megane)",
          "kana": "めがね",
          "romaji": "megane",
          "ipa": "/me/",
          "vi": "kính đeo mắt"
        },
        {
          "word": "めいし (meishi)",
          "kana": "めいし",
          "romaji": "meishi",
          "ipa": "/me/",
          "vi": "danh thiếp"
        }
      ],
      "commonErrors": "Rất dễ nhầm lẫn với ぬ (nu). Hãy nhớ: め buông thả không thắt nút, ぬ thắt nút ở đuôi."
    },
    {
      "ipa": "/mo/",
      "kana": "も",
      "romaji": "mo",
      "name": "Hiragana も (mo)",
      "group": "hiragana",
      "subgroup": "hàng MA",
      "mouth": "Mím môi nhẹ rồi mở sang nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống âm 'mô' trong tiếng Việt.",
      "mnemonic": "Nét móc câu cong vút cắt ngang bởi 2 nét vạch ngang như chiếc mỏ neo móc cá (Móc câu).",
      "strokes": 3,
      "examples": [
        {
          "word": "もの (mono)",
          "kana": "もの",
          "romaji": "mono",
          "ipa": "/mo/",
          "vi": "đồ vật"
        },
        {
          "word": "もり (mori)",
          "kana": "もり",
          "romaji": "mori",
          "ipa": "/mo/",
          "vi": "khu rừng"
        },
        {
          "word": "もんだい (mondai)",
          "kana": "もんだい",
          "romaji": "mondai",
          "ipa": "/mo/",
          "vi": "vấn đề / câu hỏi"
        }
      ],
      "commonErrors": "Đọc thành 'mo' bẹt thay vì 'mô'."
    },
    {
      "ipa": "/ja/",
      "kana": "や",
      "romaji": "ya",
      "name": "Hiragana や (ya)",
      "group": "hiragana",
      "subgroup": "hàng YA",
      "mouth": "Nâng thân lưỡi sát ngạc cứng rồi lướt nhanh sang nguyên âm a.",
      "viCompare": "Gần giống âm 'da'/'gia' trong tiếng Việt miền Nam.",
      "mnemonic": "Nét cong móc, nét phẩy và nét sổ chéo trông như chiếc thuyền buồm du ngoạn (Yacht).",
      "strokes": 3,
      "examples": [
        {
          "word": "やま (yama)",
          "kana": "やま",
          "romaji": "yama",
          "ipa": "/ja/",
          "vi": "ngọn núi"
        },
        {
          "word": "やすい (yasui)",
          "kana": "やすい",
          "romaji": "yasui",
          "ipa": "/ja/",
          "vi": "rẻ tiền"
        },
        {
          "word": "やすみ (yasumi)",
          "kana": "やすみ",
          "romaji": "yasumi",
          "ipa": "/ja/",
          "vi": "ngày nghỉ"
        }
      ],
      "commonErrors": "Phát âm thành âm 'd' đanh sắc của tiếng Việt miền Bắc."
    },
    {
      "ipa": "/jɯ/",
      "kana": "ゆ",
      "romaji": "yu",
      "name": "Hiragana ゆ (yu)",
      "group": "hiragana",
      "subgroup": "hàng YA",
      "mouth": "Nâng thân lưỡi rồi lướt sang nguyên âm /ɯ/ với môi dẹt thả lỏng.",
      "viCompare": "Gần giống 'du'/'dư' miền Nam với môi dẹt nhẹ.",
      "mnemonic": "Nét móc bụng to và nét cong dài xuyên qua như chú cá vàng đuôi bơi lượn trong bể nước (Uyển chuyển).",
      "strokes": 2,
      "examples": [
        {
          "word": "ゆき (yuki)",
          "kana": "ゆき",
          "romaji": "yuki",
          "ipa": "/jɯ/",
          "vi": "tuyết trắng"
        },
        {
          "word": "ゆめ (yume)",
          "kana": "ゆめ",
          "romaji": "yume",
          "ipa": "/jɯ/",
          "vi": "giấc mơ"
        },
        {
          "word": "ゆうびんきょく (yuubinkyoku)",
          "kana": "ゆうびんきょく",
          "romaji": "yuubinkyoku",
          "ipa": "/jɯ/",
          "vi": "bưu điện"
        }
      ],
      "commonErrors": "Chu môi tròn tạo âm 'du' tiếng Việt."
    },
    {
      "ipa": "/jo/",
      "kana": "よ",
      "romaji": "yo",
      "name": "Hiragana よ (yo)",
      "group": "hiragana",
      "subgroup": "hàng YA",
      "mouth": "Nâng thân lưỡi lướt sang nguyên âm /o/ (ô).",
      "viCompare": "Gần giống âm 'dô' trong tiếng Việt miền Nam.",
      "mnemonic": "Nét ngang ngắn và nét sổ có thắt nút tròn như chiếc đồ chơi yo-yo đang thả dây đung đưa (Yo-yo).",
      "strokes": 2,
      "examples": [
        {
          "word": "よる (yoru)",
          "kana": "よる",
          "romaji": "yoru",
          "ipa": "/jo/",
          "vi": "buổi tối"
        },
        {
          "word": "よむ (yomu)",
          "kana": "よむ",
          "romaji": "yomu",
          "ipa": "/jo/",
          "vi": "đọc sách"
        },
        {
          "word": "よい (yoi)",
          "kana": "よい",
          "romaji": "yoi",
          "ipa": "/jo/",
          "vi": "tốt lành"
        }
      ],
      "commonErrors": "Đọc thành 'zo' hoặc 'dơ'."
    },
    {
      "ipa": "/ɾa/",
      "kana": "ら",
      "romaji": "ra",
      "name": "Hiragana ら (ra)",
      "group": "hiragana",
      "subgroup": "hàng RA",
      "mouth": "Đầu lưỡi vỗ nhẹ nhanh vào phần gờ chân răng trên (âm vỗ flap), không rung lưỡi!",
      "viCompare": "Nằm giữa âm 'l' và 'r' tiếng Việt; giống âm 'r' nhẹ hoặc 'l' phát âm lướt nhẹ một nhịp.",
      "mnemonic": "Dấu phẩy trên đầu và nét cong bụng dưới như chú lạc đà đang nằm nghỉ ngơi (Lạc đà).",
      "strokes": 2,
      "examples": [
        {
          "word": "らいしゅう (raishuu)",
          "kana": "らいしゅう",
          "romaji": "raishuu",
          "ipa": "/ɾa/",
          "vi": "tuần sau"
        },
        {
          "word": "らくだ (rakuda)",
          "kana": "らくだ",
          "romaji": "rakuda",
          "ipa": "/ɾa/",
          "vi": "con lạc đà"
        },
        {
          "word": "ラジオ (rajio)",
          "kana": "ラジオ",
          "romaji": "rajio",
          "ipa": "/ɾa/",
          "vi": "đài radio"
        }
      ],
      "commonErrors": "Rung lưỡi quá mạnh như âm 'r' tiếng Việt hoặc uốn lưỡi thành âm 'l' đè nặng."
    },
    {
      "ipa": "/ɾi/",
      "kana": "り",
      "romaji": "ri",
      "name": "Hiragana り (ri)",
      "group": "hiragana",
      "subgroup": "hàng RA",
      "mouth": "Đầu lưỡi vỗ nhẹ chân răng trên rồi chuyển sang nguyên âm i bè miệng.",
      "viCompare": "Gần giống 'ri'/'li' nhẹ trong tiếng Việt.",
      "mnemonic": "Hai nét sổ song song, nét phải dài hơn uốn cong như hai dải ruy băng lụa buông rủ (Ruy băng).",
      "strokes": 2,
      "examples": [
        {
          "word": "りんご (ringo)",
          "kana": "りんご",
          "romaji": "ringo",
          "ipa": "/ɾi/",
          "vi": "quả táo"
        },
        {
          "word": "りょうり (ryouri)",
          "kana": "りょうり",
          "romaji": "ryouri",
          "ipa": "/ɾi/",
          "vi": "nấu ăn"
        },
        {
          "word": "りょこう (ryokou)",
          "kana": "りょこう",
          "romaji": "ryokou",
          "ipa": "/ɾi/",
          "vi": "du lịch"
        }
      ],
      "commonErrors": "Đọc rung lưỡi 'r-r-i' hoặc viết hai nét dính liền nhau như Katakana リ."
    },
    {
      "ipa": "/ɾɯ/",
      "kana": "る",
      "romaji": "ru",
      "name": "Hiragana る (ru)",
      "group": "hiragana",
      "subgroup": "hàng RA",
      "mouth": "Đầu lưỡi vỗ nhẹ chân răng trên kết hợp nguyên âm /ɯ/ môi dẹt.",
      "viCompare": "Giống 'rư'/'lư' nhẹ với môi không chu tròn.",
      "mnemonic": "Nét gập zic-zac có vòng tròn thắt nút ở đuôi như một bàn tay đang lượm viên ngọc ruby (Lượm ngọc / Ru bé ngủ).",
      "strokes": 1,
      "examples": [
        {
          "word": "くるま (kuruma)",
          "kana": "くるま",
          "romaji": "kuruma",
          "ipa": "/ɾɯ/",
          "vi": "xe ô tô"
        },
        {
          "word": "はる (haru)",
          "kana": "はる",
          "romaji": "haru",
          "ipa": "/ɾɯ/",
          "vi": "mùa xuân"
        },
        {
          "word": "よる (yoru)",
          "kana": "よる",
          "romaji": "yoru",
          "ipa": "/ɾɯ/",
          "vi": "buổi tối"
        }
      ],
      "commonErrors": "Rất dễ nhầm với ろ (ro) - nhớ rằng: る có vòng tròn thắt nút ở đuôi, ろ thì không."
    },
    {
      "ipa": "/ɾe/",
      "kana": "れ",
      "romaji": "re",
      "name": "Hiragana れ (re)",
      "group": "hiragana",
      "subgroup": "hàng RA",
      "mouth": "Đầu lưỡi vỗ nhẹ chân răng trên rồi mở sang nguyên âm /e/ (ê).",
      "viCompare": "Gần giống 'rê'/'lê' nhẹ trong tiếng Việt.",
      "mnemonic": "Nét sổ đứng và nét uốn lượn có đuôi hất ngược ra ngoài như lưỡi câu rê cá (Rê cá).",
      "strokes": 2,
      "examples": [
        {
          "word": "れきし (rekishi)",
          "kana": "れきし",
          "romaji": "rekishi",
          "ipa": "/ɾe/",
          "vi": "lịch sử"
        },
        {
          "word": "れいぞうこ (reizouko)",
          "kana": "れいぞうこ",
          "romaji": "reizouko",
          "ipa": "/ɾe/",
          "vi": "tủ lạnh"
        },
        {
          "word": "れんしゅう (renshuu)",
          "kana": "れんしゅう",
          "romaji": "renshuu",
          "ipa": "/ɾe/",
          "vi": "luyện tập"
        }
      ],
      "commonErrors": "Dễ nhầm với わ (wa) và ね (ne). Nhớ rằng: れ có đuôi hất ngược ra ngoài."
    },
    {
      "ipa": "/ɾo/",
      "kana": "ろ",
      "romaji": "ro",
      "name": "Hiragana ろ (ro)",
      "group": "hiragana",
      "subgroup": "hàng RA",
      "mouth": "Đầu lưỡi vỗ nhẹ chân răng trên kết hợp nguyên âm tròn môi nhẹ /o/ (ô).",
      "viCompare": "Gần giống 'rô'/'lô' nhẹ trong tiếng Việt.",
      "mnemonic": "Giống chữ る nhưng đuôi không thắt nút mà buông mở, như một con đường lộ mở rộng thênh thang (Đường lộ).",
      "strokes": 1,
      "examples": [
        {
          "word": "ろく (roku)",
          "kana": "ろく",
          "romaji": "roku",
          "ipa": "/ɾo/",
          "vi": "số sáu (6)"
        },
        {
          "word": "ろうそく (rousoku)",
          "kana": "ろうそく",
          "romaji": "rousoku",
          "ipa": "/ɾo/",
          "vi": "cây nến"
        },
        {
          "word": "ロシア (roshia)",
          "kana": "ロシア",
          "romaji": "roshia",
          "ipa": "/ɾo/",
          "vi": "nước Nga"
        }
      ],
      "commonErrors": "Viết thêm nút tròn ở đuôi biến thành chữ る (ru)."
    },
    {
      "ipa": "/ɰa/",
      "kana": "わ",
      "romaji": "wa",
      "name": "Hiragana わ (wa)",
      "group": "hiragana",
      "subgroup": "hàng WA",
      "mouth": "Môi khép hờ mở nhanh chuyển sang nguyên âm a, không chu môi quá sâu.",
      "viCompare": "Gần giống âm 'oa'/'qua' nhẹ trong tiếng Việt.",
      "mnemonic": "Nét sổ đứng và nét uốn bụng tròn căng như vòng eo thon của vũ công múa ba lê (Vòng eo oa / Oa oa).",
      "strokes": 2,
      "examples": [
        {
          "word": "わたし (watashi)",
          "kana": "わたし",
          "romaji": "watashi",
          "ipa": "/ɰa/",
          "vi": "tôi (đại từ nhân xưng)"
        },
        {
          "word": "わに (wani)",
          "kana": "わに",
          "romaji": "wani",
          "ipa": "/ɰa/",
          "vi": "con cá sấu"
        },
        {
          "word": "わかる (wakaru)",
          "kana": "わかる",
          "romaji": "wakaru",
          "ipa": "/ɰa/",
          "vi": "hiểu biết"
        }
      ],
      "commonErrors": "Dễ nhầm với ね (ne) và れ (re). Nhớ rằng: わ lưng tròn trơn, không có nút hay móc đuôi."
    },
    {
      "ipa": "/o/",
      "kana": "を",
      "romaji": "o",
      "name": "Hiragana を (wo/o)",
      "group": "hiragana",
      "subgroup": "hàng WA",
      "mouth": "Phát âm giống hệt nguyên âm /o/ (ô). Trong tiếng Nhật hiện đại chỉ dùng làm TRỢ TỪ ngữ pháp chỉ tân ngữ.",
      "viCompare": "Phát âm giống âm 'ô' gọn gàng. Romaji ghi là 'wo' hoặc 'o'.",
      "mnemonic": "Nét ngang, nét chéo gãy và nét móc cong như vận động viên đang nhảy qua chướng ngại vật (Trợ từ tân ngữ).",
      "strokes": 3,
      "examples": [
        {
          "word": "ほんをよむ (hon o yomu)",
          "kana": "ほんをよむ",
          "romaji": "hon o yomu",
          "ipa": "/o/",
          "vi": "đọc sách"
        },
        {
          "word": "みずをのむ (mizu o nomu)",
          "kana": "みずをのむ",
          "romaji": "mizu o nomu",
          "ipa": "/o/",
          "vi": "uống nước"
        },
        {
          "word": "ごはんをたべる (gohan o taberu)",
          "kana": "ごはんをたべる",
          "romaji": "gohan o taberu",
          "ipa": "/o/",
          "vi": "ăn cơm"
        }
      ],
      "commonErrors": "Cố tình phát âm thành 'quô'/'wo' nặng nề; trong tiếng Nhật hiện đại を đọc hoàn toàn là 'o'."
    },
    {
      "ipa": "/ɴ/",
      "kana": "ん",
      "romaji": "n",
      "name": "Hiragana ん (n)",
      "group": "hiragana",
      "subgroup": "hàng N",
      "mouth": "Âm mũi, luồng hơi đi hoàn toàn qua khoang mũi. Khẩu hình thay đổi linh hoạt tùy theo âm theo sau.",
      "viCompare": "Tương đương âm mũi [n], [m], [ng] tiếng Việt tùy thuộc âm đứng ngay sau nó.",
      "mnemonic": "Nét uốn lượn như chữ 'n' viết nghiêng trong bảng chữ cái Latinh.",
      "strokes": 1,
      "examples": [
        {
          "word": "にほん (nihon)",
          "kana": "にほん",
          "romaji": "nihon",
          "ipa": "/ɴ/",
          "vi": "Nhật Bản"
        },
        {
          "word": "しんぶん (shinbun)",
          "kana": "しんぶん",
          "romaji": "shinbun",
          "ipa": "/ɴ/",
          "vi": "tờ báo (đọc là shim-bun)"
        },
        {
          "word": "てんき (tenki)",
          "kana": "てんき",
          "romaji": "tenki",
          "ipa": "/ɴ/",
          "vi": "thời tiết (đọc là teng-ki)"
        }
      ],
      "commonErrors": "Đọc cứng nhắc thành một âm duy nhất mà không biết quy tắc biến âm mũi [m], [n], [ng]."
    },
    {
      "ipa": "/a/",
      "kana": "ア",
      "romaji": "a",
      "name": "Katakana ア (a)",
      "group": "katakana",
      "subgroup": "hàng A",
      "mouth": "Phát âm âm tiết a giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét ngang móc và nét phẩy như chữ A in hoa bị mất nét chân bên phải.",
      "strokes": 2,
      "examples": [
        {
          "word": "アイス (aisu)",
          "kana": "アイス",
          "romaji": "aisu",
          "ipa": "/a/",
          "vi": "kem"
        },
        {
          "word": "アジア (ajia)",
          "kana": "アジア",
          "romaji": "ajia",
          "ipa": "/a/",
          "vi": "châu Á"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/i/",
      "kana": "イ",
      "romaji": "i",
      "name": "Katakana イ (i)",
      "group": "katakana",
      "subgroup": "hàng A",
      "mouth": "Phát âm âm tiết i giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hai nét giống bộ Nhân đứng (亻), như người đang đứng thẳng (I đứng).",
      "strokes": 2,
      "examples": [
        {
          "word": "イチゴ (ichigo)",
          "kana": "イチゴ",
          "romaji": "ichigo",
          "ipa": "/i/",
          "vi": "quả dâu tây"
        },
        {
          "word": "インド (indo)",
          "kana": "インド",
          "romaji": "indo",
          "ipa": "/i/",
          "vi": "Ấn Độ"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ɯ/",
      "kana": "ウ",
      "romaji": "u",
      "name": "Katakana ウ (u)",
      "group": "katakana",
      "subgroup": "hàng A",
      "mouth": "Phát âm âm tiết u giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Giống bộ Miên (宀 - mái nhà) có nét nhọn trên đỉnh đầu, cách điệu từ chữ Hiragana う.",
      "strokes": 3,
      "examples": [
        {
          "word": "ウイスキー (uisukii)",
          "kana": "ウイスキー",
          "romaji": "uisukii",
          "ipa": "/ɯ/",
          "vi": "rượu whisky"
        },
        {
          "word": "ウイルス (uirusu)",
          "kana": "ウイルス",
          "romaji": "uirusu",
          "ipa": "/ɯ/",
          "vi": "virus"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/e/",
      "kana": "エ",
      "romaji": "e",
      "name": "Katakana エ (e)",
      "group": "katakana",
      "subgroup": "hàng A",
      "mouth": "Phát âm âm tiết e giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hình thanh dầm thép chữ I vững chãi trong công trình xây dựng (Ê kíp thợ xây).",
      "strokes": 3,
      "examples": [
        {
          "word": "エレベーター (erebeetaa)",
          "kana": "エレベーター",
          "romaji": "erebeetaa",
          "ipa": "/e/",
          "vi": "thang máy"
        },
        {
          "word": "エアコン (eakon)",
          "kana": "エアコン",
          "romaji": "eakon",
          "ipa": "/e/",
          "vi": "máy điều hòa"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/o/",
      "kana": "オ",
      "romaji": "o",
      "name": "Katakana オ (o)",
      "group": "katakana",
      "subgroup": "hàng A",
      "mouth": "Phát âm âm tiết o giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét ngang, nét dọc móc và nét phẩy như người đàn ông dang rộng tay oai vệ (Oai vệ).",
      "strokes": 3,
      "examples": [
        {
          "word": "オレンジ (orenji)",
          "kana": "オレンジ",
          "romaji": "orenji",
          "ipa": "/o/",
          "vi": "quả cam"
        },
        {
          "word": "オリーブ (oriibu)",
          "kana": "オリーブ",
          "romaji": "oriibu",
          "ipa": "/o/",
          "vi": "quả ô liu"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ka/",
      "kana": "カ",
      "romaji": "ka",
      "name": "Katakana カ (ka)",
      "group": "katakana",
      "subgroup": "hàng KA",
      "mouth": "Phát âm âm tiết ka giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Giống chữ Hiragana か nhưng lược bỏ nét phẩy bên phải, góc cạnh mạnh mẽ hơn.",
      "strokes": 2,
      "examples": [
        {
          "word": "カメラ (kamera)",
          "kana": "カメラ",
          "romaji": "kamera",
          "ipa": "/ka/",
          "vi": "máy chụp ảnh"
        },
        {
          "word": "カフェ (kafe)",
          "kana": "カフェ",
          "romaji": "kafe",
          "ipa": "/ka/",
          "vi": "quán cà phê"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ki/",
      "kana": "キ",
      "romaji": "ki",
      "name": "Katakana キ (ki)",
      "group": "katakana",
      "subgroup": "hàng KA",
      "mouth": "Phát âm âm tiết ki giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hình chiếc chìa khóa Key bằng kim loại cứng cáp, bỏ nét cong dưới của chữ き.",
      "strokes": 3,
      "examples": [
        {
          "word": "キッチン (kitchin)",
          "kana": "キッチン",
          "romaji": "kitchin",
          "ipa": "/ki/",
          "vi": "nhà bếp"
        },
        {
          "word": "キャンプ (kyanpu)",
          "kana": "キャンプ",
          "romaji": "kyanpu",
          "ipa": "/ki/",
          "vi": "cắm trại"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/kɯ/",
      "kana": "ク",
      "romaji": "ku",
      "name": "Katakana ク (ku)",
      "group": "katakana",
      "subgroup": "hàng KA",
      "mouth": "Phát âm âm tiết ku giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét phẩy chéo và nét gập như góc chiếc bánh quy Cook giòn tan.",
      "strokes": 2,
      "examples": [
        {
          "word": "クラス (kurasu)",
          "kana": "クラス",
          "romaji": "kurasu",
          "ipa": "/kɯ/",
          "vi": "lớp học"
        },
        {
          "word": "クラブ (kurabu)",
          "kana": "クラブ",
          "romaji": "kurabu",
          "ipa": "/kɯ/",
          "vi": "câu lạc bộ"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ke/",
      "kana": "ケ",
      "romaji": "ke",
      "name": "Katakana ケ (ke)",
      "group": "katakana",
      "subgroup": "hàng KA",
      "mouth": "Phát âm âm tiết ke giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét phẩy và nét chữ thập góc cạnh như chiếc kệ trưng bày bánh ngọt (Kệ bánh).",
      "strokes": 3,
      "examples": [
        {
          "word": "ケーキ (keeki)",
          "kana": "ケーキ",
          "romaji": "keeki",
          "ipa": "/ke/",
          "vi": "bánh ngọt"
        },
        {
          "word": "ケース (keesu)",
          "kana": "ケース",
          "romaji": "keesu",
          "ipa": "/ke/",
          "vi": "hộp đựng / bao da"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ko/",
      "kana": "コ",
      "romaji": "ko",
      "name": "Katakana コ (ko)",
      "group": "katakana",
      "subgroup": "hàng KA",
      "mouth": "Phát âm âm tiết ko giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hình góc vuông của chiếc hộp đựng cốc cà phê nhỏ (Cốc cà phê).",
      "strokes": 2,
      "examples": [
        {
          "word": "コーヒー (koohii)",
          "kana": "コーヒー",
          "romaji": "koohii",
          "ipa": "/ko/",
          "vi": "cà phê"
        },
        {
          "word": "コート (kooto)",
          "kana": "コート",
          "romaji": "kooto",
          "ipa": "/ko/",
          "vi": "áo khoác"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/sa/",
      "kana": "サ",
      "romaji": "sa",
      "name": "Katakana サ (sa)",
      "group": "katakana",
      "subgroup": "hàng SA",
      "mouth": "Phát âm âm tiết sa giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Giống bộ Thảo (艹) trên đầu chữ Hán, như ba cọng cỏ non mọc trên mặt đất (Sa mạc cỏ).",
      "strokes": 3,
      "examples": [
        {
          "word": "サラダ (sarada)",
          "kana": "サラダ",
          "romaji": "sarada",
          "ipa": "/sa/",
          "vi": "món salad"
        },
        {
          "word": "サッカー (sakkaa)",
          "kana": "サッカー",
          "romaji": "sakkaa",
          "ipa": "/sa/",
          "vi": "bóng đá"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ɕi/",
      "kana": "シ",
      "romaji": "shi",
      "name": "Katakana シ (shi)",
      "group": "katakana",
      "subgroup": "hàng SA",
      "mouth": "Phát âm âm tiết shi giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hai nét ngắn nằm ngang chéo nhẹ, nét thứ ba hất vuốt TỪ DƯỚI LÊN (như đôi mắt ngước lên nhìn cô nàng duyên dáng Shi).",
      "strokes": 3,
      "examples": [
        {
          "word": "シャツ (shatsu)",
          "kana": "シャツ",
          "romaji": "shatsu",
          "ipa": "/ɕi/",
          "vi": "áo sơ mi"
        },
        {
          "word": "シャワー (shawaa)",
          "kana": "シャワー",
          "romaji": "shawaa",
          "ipa": "/ɕi/",
          "vi": "vòi hoa sen"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/sɯ/",
      "kana": "ス",
      "romaji": "su",
      "name": "Katakana ス (su)",
      "group": "katakana",
      "subgroup": "hàng SA",
      "mouth": "Phát âm âm tiết su giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét gập ngang và nét chéo vát như người đang trượt ván tuyết siêu tốc (Super ski).",
      "strokes": 2,
      "examples": [
        {
          "word": "スポーツ (supootsu)",
          "kana": "スポーツ",
          "romaji": "supootsu",
          "ipa": "/sɯ/",
          "vi": "thể thao"
        },
        {
          "word": "スーパー (suupaa)",
          "kana": "スーパー",
          "romaji": "suupaa",
          "ipa": "/sɯ/",
          "vi": "siêu thị"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/se/",
      "kana": "セ",
      "romaji": "se",
      "name": "Katakana セ (se)",
      "group": "katakana",
      "subgroup": "hàng SA",
      "mouth": "Phát âm âm tiết se giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Rất giống chữ Hiragana せ nhưng nét vẽ vuông vắn, cứng cáp hơn.",
      "strokes": 2,
      "examples": [
        {
          "word": "セーター (seetaa)",
          "kana": "セーター",
          "romaji": "seetaa",
          "ipa": "/se/",
          "vi": "áo len"
        },
        {
          "word": "セット (setto)",
          "kana": "セット",
          "romaji": "setto",
          "ipa": "/se/",
          "vi": "suất ăn combo / bộ"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/so/",
      "kana": "ソ",
      "romaji": "so",
      "name": "Katakana ソ (so)",
      "group": "katakana",
      "subgroup": "hàng SA",
      "mouth": "Phát âm âm tiết so giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét thứ nhất thẳng đứng hơn, nét thứ hai phẩy CHÉM TỪ TRÊN XUỐNG DƯỚI (như dòng nước xối từ trên xuống).",
      "strokes": 2,
      "examples": [
        {
          "word": "ソフト (sofuto)",
          "kana": "ソフト",
          "romaji": "sofuto",
          "ipa": "/so/",
          "vi": "phần mềm"
        },
        {
          "word": "ソース (soosu)",
          "kana": "ソース",
          "romaji": "soosu",
          "ipa": "/so/",
          "vi": "nước sốt"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ta/",
      "kana": "タ",
      "romaji": "ta",
      "name": "Katakana タ (ta)",
      "group": "katakana",
      "subgroup": "hàng TA",
      "mouth": "Phát âm âm tiết ta giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Giống chữ ク (ku) có thêm một nét gạch ngang cắt qua, như chiếc diều bay (Tung tăng).",
      "strokes": 3,
      "examples": [
        {
          "word": "タクシー (takushii)",
          "kana": "タクシー",
          "romaji": "takushii",
          "ipa": "/ta/",
          "vi": "xe taxi"
        },
        {
          "word": "タオル (taoru)",
          "kana": "タオル",
          "romaji": "taoru",
          "ipa": "/ta/",
          "vi": "khăn tắm"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/t͡ɕi/",
      "kana": "チ",
      "romaji": "chi",
      "name": "Katakana チ (chi)",
      "group": "katakana",
      "subgroup": "hàng TA",
      "mouth": "Phát âm âm tiết chi giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Giống hình một chú chim non đang đứng trên cành cây hoặc số 5 có mũ che.",
      "strokes": 3,
      "examples": [
        {
          "word": "チーズ (chiizu)",
          "kana": "チーズ",
          "romaji": "chiizu",
          "ipa": "/t͡ɕi/",
          "vi": "phô mai"
        },
        {
          "word": "チケット (chiketto)",
          "kana": "チケット",
          "romaji": "chiketto",
          "ipa": "/t͡ɕi/",
          "vi": "vé vào cửa"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/t͡sɯ/",
      "kana": "ツ",
      "romaji": "tsu",
      "name": "Katakana ツ (tsu)",
      "group": "katakana",
      "subgroup": "hàng TA",
      "mouth": "Phát âm âm tiết tsu giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hai nét ngắn chúc thẳng đứng từ trên, nét thứ ba vuốt CHÉM TỪ TRÊN XUỐNG DƯỚI (như 2 giọt mồ hôi rơi trúng đỉnh đầu Tsu).",
      "strokes": 3,
      "examples": [
        {
          "word": "ツアー (tsuaa)",
          "kana": "ツアー",
          "romaji": "tsuaa",
          "ipa": "/t͡sɯ/",
          "vi": "tour du lịch"
        },
        {
          "word": "ツナ (tsuna)",
          "kana": "ツナ",
          "romaji": "tsuna",
          "ipa": "/t͡sɯ/",
          "vi": "cá ngừ"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/te/",
      "kana": "テ",
      "romaji": "te",
      "name": "Katakana テ (te)",
      "group": "katakana",
      "subgroup": "hàng TA",
      "mouth": "Phát âm âm tiết te giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hai nét ngang và nét chéo như chiếc cột ăng-ten phát sóng truyền hình (Ten-te).",
      "strokes": 3,
      "examples": [
        {
          "word": "テーブル (teeburu)",
          "kana": "テーブル",
          "romaji": "teeburu",
          "ipa": "/te/",
          "vi": "cái bàn"
        },
        {
          "word": "テスト (tesuto)",
          "kana": "テスト",
          "romaji": "tesuto",
          "ipa": "/te/",
          "vi": "bài kiểm tra"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/to/",
      "kana": "ト",
      "romaji": "to",
      "name": "Katakana ト (to)",
      "group": "katakana",
      "subgroup": "hàng TA",
      "mouth": "Phát âm âm tiết to giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét sổ đứng và nét nhánh xiên sang phải như cành cây thẳng tắp (Thẳng tắp - To).",
      "strokes": 2,
      "examples": [
        {
          "word": "トマト (tomato)",
          "kana": "トマト",
          "romaji": "tomato",
          "ipa": "/to/",
          "vi": "quả cà chua"
        },
        {
          "word": "トイレ (toire)",
          "kana": "トイレ",
          "romaji": "toire",
          "ipa": "/to/",
          "vi": "nhà vệ sinh"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/na/",
      "kana": "ナ",
      "romaji": "na",
      "name": "Katakana ナ (na)",
      "group": "katakana",
      "subgroup": "hàng NA",
      "mouth": "Phát âm âm tiết na giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét ngang và nét phẩy chéo giống chữ Thập nghiêng hoặc lưỡi gươm ninja (Nạ - Ninja).",
      "strokes": 2,
      "examples": [
        {
          "word": "ナイフ (naifu)",
          "kana": "ナイフ",
          "romaji": "naifu",
          "ipa": "/na/",
          "vi": "con dao"
        },
        {
          "word": "ナンバー (nanbaa)",
          "kana": "ナンバー",
          "romaji": "nanbaa",
          "ipa": "/na/",
          "vi": "con số"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ɲi/",
      "kana": "ニ",
      "romaji": "ni",
      "name": "Katakana ニ (ni)",
      "group": "katakana",
      "subgroup": "hàng NA",
      "mouth": "Phát âm âm tiết ni giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hai nét ngang song song chuẩn xác như chữ Nhị (二 - số 2) trong chữ Hán.",
      "strokes": 2,
      "examples": [
        {
          "word": "ニュース (nyuusu)",
          "kana": "ニュース",
          "romaji": "nyuusu",
          "ipa": "/ɲi/",
          "vi": "tin tức thời sự"
        },
        {
          "word": "ニュージーランド (nyuujiirando)",
          "kana": "ニュージーランド",
          "romaji": "nyuujiirando",
          "ipa": "/ɲi/",
          "vi": "New Zealand"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/nɯ/",
      "kana": "ヌ",
      "romaji": "nu",
      "name": "Katakana ヌ (nu)",
      "group": "katakana",
      "subgroup": "hàng NA",
      "mouth": "Phát âm âm tiết nu giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét gập và nét chéo cắt qua như chiếc đũa đang gắp sợi mì Nui dai giòn.",
      "strokes": 2,
      "examples": [
        {
          "word": "ヌードル (nuudoru)",
          "kana": "ヌードル",
          "romaji": "nuudoru",
          "ipa": "/nɯ/",
          "vi": "mì sợi"
        },
        {
          "word": "カヌー (kanuu)",
          "kana": "カヌー",
          "romaji": "kanuu",
          "ipa": "/nɯ/",
          "vi": "thuyền ca-nô"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ne/",
      "kana": "ネ",
      "romaji": "ne",
      "name": "Katakana ネ (ne)",
      "group": "katakana",
      "subgroup": "hàng NA",
      "mouth": "Phát âm âm tiết ne giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Giống bộ Thị (礻), như chiếc cà vạt cổ áo người thanh niên lịch lãm (Necktie - Cà vạt).",
      "strokes": 4,
      "examples": [
        {
          "word": "ネクタイ (nekutai)",
          "kana": "ネクタイ",
          "romaji": "nekutai",
          "ipa": "/ne/",
          "vi": "cà vạt"
        },
        {
          "word": "ネット (netto)",
          "kana": "ネット",
          "romaji": "netto",
          "ipa": "/ne/",
          "vi": "mạng internet"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/no/",
      "kana": "ノ",
      "romaji": "no",
      "name": "Katakana ノ (no)",
      "group": "katakana",
      "subgroup": "hàng NA",
      "mouth": "Phát âm âm tiết no giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Chỉ một nét phẩy chéo đơn giản vuốt nhẹ từ trên xuống dưới bên trái.",
      "strokes": 1,
      "examples": [
        {
          "word": "ノート (nooto)",
          "kana": "ノート",
          "romaji": "nooto",
          "ipa": "/no/",
          "vi": "vở ghi chép"
        },
        {
          "word": "ノック (nokku)",
          "kana": "ノック",
          "romaji": "nokku",
          "ipa": "/no/",
          "vi": "gõ cửa"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ha/",
      "kana": "ハ",
      "romaji": "ha",
      "name": "Katakana ハ (ha)",
      "group": "katakana",
      "subgroup": "hàng HA",
      "mouth": "Phát âm âm tiết ha giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hai nét vát sang hai bên như chữ Bát (八 - số 8) hoặc hai bên ria mép của chú hề (Hề ha ha).",
      "strokes": 2,
      "examples": [
        {
          "word": "パン (pan)",
          "kana": "パン",
          "romaji": "pan",
          "ipa": "/ha/",
          "vi": "bánh mì"
        },
        {
          "word": "ハンバーガー (hanbaagaa)",
          "kana": "ハンバーガー",
          "romaji": "hanbaagaa",
          "ipa": "/ha/",
          "vi": "bánh hamburger"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/çi/",
      "kana": "ヒ",
      "romaji": "hi",
      "name": "Katakana ヒ (hi)",
      "group": "katakana",
      "subgroup": "hàng HA",
      "mouth": "Phát âm âm tiết hi giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét ngang gập và nét sổ đứng như người đang ngồi ghế tựa nâng ly chúc mừng (Hí hửng).",
      "strokes": 2,
      "examples": [
        {
          "word": "ヒーロー (hiiroo)",
          "kana": "ヒーロー",
          "romaji": "hiiroo",
          "ipa": "/çi/",
          "vi": "người anh hùng"
        },
        {
          "word": "ヒント (hinto)",
          "kana": "ヒント",
          "romaji": "hinto",
          "ipa": "/çi/",
          "vi": "gợi ý"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ɸɯ/",
      "kana": "フ",
      "romaji": "fu",
      "name": "Katakana フ (fu)",
      "group": "katakana",
      "subgroup": "hàng HA",
      "mouth": "Phát âm âm tiết fu giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Một nét ngang gập chéo xuống như chiếc móc cờ hoặc mũi con thuyền buồm (Phù phù).",
      "strokes": 1,
      "examples": [
        {
          "word": "フォーク (fooku)",
          "kana": "フォーク",
          "romaji": "fooku",
          "ipa": "/ɸɯ/",
          "vi": "chiếc dĩa ăn"
        },
        {
          "word": "フランス (furansu)",
          "kana": "フランス",
          "romaji": "furansu",
          "ipa": "/ɸɯ/",
          "vi": "nước Pháp"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/he/",
      "kana": "ヘ",
      "romaji": "he",
      "name": "Katakana ヘ (he)",
      "group": "katakana",
      "subgroup": "hàng HA",
      "mouth": "Phát âm âm tiết he giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hình dáng hoàn toàn tương đồng với chữ Hiragana へ (mái nhà hình chóp nhọn).",
      "strokes": 1,
      "examples": [
        {
          "word": "ヘルメット (herumetto)",
          "kana": "ヘルメット",
          "romaji": "herumetto",
          "ipa": "/he/",
          "vi": "mũ bảo hiểm"
        },
        {
          "word": "ヘリコプター (herikoputaa)",
          "kana": "ヘリコプター",
          "romaji": "herikoputaa",
          "ipa": "/he/",
          "vi": "trực thăng"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ho/",
      "kana": "ホ",
      "romaji": "ho",
      "name": "Katakana ホ (ho)",
      "group": "katakana",
      "subgroup": "hàng HA",
      "mouth": "Phát âm âm tiết ho giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Giống chữ Mộc (木 - cái cây) góc cạnh có hai nét phẩy hai bên như cây thông Noel trang trí hoa (Hoa hoét).",
      "strokes": 4,
      "examples": [
        {
          "word": "ホテル (hoteru)",
          "kana": "ホテル",
          "romaji": "hoteru",
          "ipa": "/ho/",
          "vi": "khách sạn"
        },
        {
          "word": "ホット (hotto)",
          "kana": "ホット",
          "romaji": "hotto",
          "ipa": "/ho/",
          "vi": "nóng / hot"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ma/",
      "kana": "マ",
      "romaji": "ma",
      "name": "Katakana マ (ma)",
      "group": "katakana",
      "subgroup": "hàng MA",
      "mouth": "Phát âm âm tiết ma giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét gập và nét phẩy như chiếc mặt nạ che nửa khuôn mặt (Mặt nạ).",
      "strokes": 2,
      "examples": [
        {
          "word": "マスク (masuku)",
          "kana": "マスク",
          "romaji": "masuku",
          "ipa": "/ma/",
          "vi": "khẩu trang"
        },
        {
          "word": "マンゴー (mangoo)",
          "kana": "マンゴー",
          "romaji": "mangoo",
          "ipa": "/ma/",
          "vi": "quả xoài"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/mi/",
      "kana": "ミ",
      "romaji": "mi",
      "name": "Katakana ミ (mi)",
      "group": "katakana",
      "subgroup": "hàng MA",
      "mouth": "Phát âm âm tiết mi giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Ba nét gạch chéo song song như ba sợi lông mi mắt cong vút (Lông Mi).",
      "strokes": 3,
      "examples": [
        {
          "word": "ミルク (miruku)",
          "kana": "ミルク",
          "romaji": "miruku",
          "ipa": "/mi/",
          "vi": "sữa tươi"
        },
        {
          "word": "ミント (minto)",
          "kana": "ミント",
          "romaji": "minto",
          "ipa": "/mi/",
          "vi": "bạc hà"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/mɯ/",
      "kana": "ム",
      "romaji": "mu",
      "name": "Katakana ム (mu)",
      "group": "katakana",
      "subgroup": "hàng MA",
      "mouth": "Phát âm âm tiết mu giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hình tam giác góc mở như chiếc mũi tên hoặc hình chiếc mũ nhọn (Mũ nhọn).",
      "strokes": 2,
      "examples": [
        {
          "word": "ムービー (muubii)",
          "kana": "ムービー",
          "romaji": "muubii",
          "ipa": "/mɯ/",
          "vi": "bộ phim"
        },
        {
          "word": "ムード (muudo)",
          "kana": "ムード",
          "romaji": "muudo",
          "ipa": "/mɯ/",
          "vi": "tâm trạng / mood"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/me/",
      "kana": "メ",
      "romaji": "me",
      "name": "Katakana メ (me)",
      "group": "katakana",
      "subgroup": "hàng MA",
      "mouth": "Phát âm âm tiết me giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hai nét chéo cắt nhau tạo thành dấu X như thanh kiếm bắt chéo (Kiếm mạ).",
      "strokes": 2,
      "examples": [
        {
          "word": "メニュー (menyuu)",
          "kana": "メニュー",
          "romaji": "menyuu",
          "ipa": "/me/",
          "vi": "thực đơn"
        },
        {
          "word": "メール (meeru)",
          "kana": "メール",
          "romaji": "meeru",
          "ipa": "/me/",
          "vi": "thư điện tử / email"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/mo/",
      "kana": "モ",
      "romaji": "mo",
      "name": "Katakana モ (mo)",
      "group": "katakana",
      "subgroup": "hàng MA",
      "mouth": "Phát âm âm tiết mo giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Rất giống chữ Hiragana も nhưng các đường nét được kéo thẳng thớm, góc vuông vắn.",
      "strokes": 3,
      "examples": [
        {
          "word": "モデル (moderu)",
          "kana": "モデル",
          "romaji": "moderu",
          "ipa": "/mo/",
          "vi": "người mẫu / kiểu mẫu"
        },
        {
          "word": "モーター (mootaa)",
          "kana": "モーター",
          "romaji": "mootaa",
          "ipa": "/mo/",
          "vi": "động cơ mô tơ"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ja/",
      "kana": "ヤ",
      "romaji": "ya",
      "name": "Katakana ヤ (ya)",
      "group": "katakana",
      "subgroup": "hàng YA",
      "mouth": "Phát âm âm tiết ya giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Giống chữ Hiragana や bỏ đi nét phẩy phụ bên phải, dáng dấp chiếc mỏ neo.",
      "strokes": 2,
      "examples": [
        {
          "word": "ヤング (yangu)",
          "kana": "ヤング",
          "romaji": "yangu",
          "ipa": "/ja/",
          "vi": "giới trẻ"
        },
        {
          "word": "ダイヤ (daiya)",
          "kana": "ダイヤ",
          "romaji": "daiya",
          "ipa": "/ja/",
          "vi": "kim cương / lịch tàu"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/jɯ/",
      "kana": "ユ",
      "romaji": "yu",
      "name": "Katakana ユ (yu)",
      "group": "katakana",
      "subgroup": "hàng YA",
      "mouth": "Phát âm âm tiết yu giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Góc vuông và nét ngang như chiếc gàu múc nước hoặc hình chữ U cách điệu (Chữ U).",
      "strokes": 2,
      "examples": [
        {
          "word": "ユニフォーム (yunifoomu)",
          "kana": "ユニフォーム",
          "romaji": "yunifoomu",
          "ipa": "/jɯ/",
          "vi": "đồng phục"
        },
        {
          "word": "ユーモア (yuumoa)",
          "kana": "ユーモア",
          "romaji": "yuumoa",
          "ipa": "/jɯ/",
          "vi": "hài hước"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/jo/",
      "kana": "ヨ",
      "romaji": "yo",
      "name": "Katakana ヨ (yo)",
      "group": "katakana",
      "subgroup": "hàng YA",
      "mouth": "Phát âm âm tiết yo giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hình chữ E viết ngược hoặc hình chiếc giá sách 3 tầng (Yoga).",
      "strokes": 3,
      "examples": [
        {
          "word": "ヨーグルト (yooguruto)",
          "kana": "ヨーグルト",
          "romaji": "yooguruto",
          "ipa": "/jo/",
          "vi": "sữa chua"
        },
        {
          "word": "ヨーロッパ (yooroppa)",
          "kana": "ヨーロッパ",
          "romaji": "yooroppa",
          "ipa": "/jo/",
          "vi": "châu Âu"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ɾa/",
      "kana": "ラ",
      "romaji": "ra",
      "name": "Katakana ラ (ra)",
      "group": "katakana",
      "subgroup": "hàng RA",
      "mouth": "Phát âm âm tiết ra giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét ngang và nét gập như chiếc loa phát thanh gắn trên cột (Loa phóng thanh).",
      "strokes": 2,
      "examples": [
        {
          "word": "ラーメン (raamen)",
          "kana": "ラーメン",
          "romaji": "raamen",
          "ipa": "/ɾa/",
          "vi": "mì ramen"
        },
        {
          "word": "ラジオ (rajio)",
          "kana": "ラジオ",
          "romaji": "rajio",
          "ipa": "/ɾa/",
          "vi": "đài radio"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ɾi/",
      "kana": "リ",
      "romaji": "ri",
      "name": "Katakana リ (ri)",
      "group": "katakana",
      "subgroup": "hàng RA",
      "mouth": "Phát âm âm tiết ri giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hai nét thẳng đứng song song giống chữ Hiragana り viết kiểu tách rời.",
      "strokes": 2,
      "examples": [
        {
          "word": "リーダー (riidaa)",
          "kana": "リーダー",
          "romaji": "riidaa",
          "ipa": "/ɾi/",
          "vi": "người lãnh đạo"
        },
        {
          "word": "リンス (rinsu)",
          "kana": "リンス",
          "romaji": "rinsu",
          "ipa": "/ɾi/",
          "vi": "dầu xả tóc"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ɾɯ/",
      "kana": "ル",
      "romaji": "ru",
      "name": "Katakana ル (ru)",
      "group": "katakana",
      "subgroup": "hàng RA",
      "mouth": "Phát âm âm tiết ru giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hai nét như hai chân một người đang chạy bộ rất nhanh (Running).",
      "strokes": 2,
      "examples": [
        {
          "word": "ルール (ruuru)",
          "kana": "ルール",
          "romaji": "ruuru",
          "ipa": "/ɾɯ/",
          "vi": "quy tắc, luật lệ"
        },
        {
          "word": "ルート (ruuto)",
          "kana": "ルート",
          "romaji": "ruuto",
          "ipa": "/ɾɯ/",
          "vi": "tuyến đường"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ɾe/",
      "kana": "レ",
      "romaji": "re",
      "name": "Katakana レ (re)",
      "group": "katakana",
      "subgroup": "hàng RA",
      "mouth": "Phát âm âm tiết re giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Chỉ một nét gập giống chữ V một nửa hoặc dấu tích chữ V (Check mark).",
      "strokes": 1,
      "examples": [
        {
          "word": "レストラン (resutoran)",
          "kana": "レストラン",
          "romaji": "resutoran",
          "ipa": "/ɾe/",
          "vi": "nhà hàng"
        },
        {
          "word": "レシート (reshiito)",
          "kana": "レシート",
          "romaji": "reshiito",
          "ipa": "/ɾe/",
          "vi": "hóa đơn"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ɾo/",
      "kana": "ロ",
      "romaji": "ro",
      "name": "Katakana ロ (ro)",
      "group": "katakana",
      "subgroup": "hàng RA",
      "mouth": "Phát âm âm tiết ro giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Hình một chiếc hộp vuông khép kín như chữ Khẩu (口 - cái miệng) trong chữ Hán.",
      "strokes": 3,
      "examples": [
        {
          "word": "ロボット (robotto)",
          "kana": "ロボット",
          "romaji": "robotto",
          "ipa": "/ɾo/",
          "vi": "người máy robot"
        },
        {
          "word": "ロシア (roshia)",
          "kana": "ロシア",
          "romaji": "roshia",
          "ipa": "/ɾo/",
          "vi": "nước Nga"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ɰa/",
      "kana": "ワ",
      "romaji": "wa",
      "name": "Katakana ワ (wa)",
      "group": "katakana",
      "subgroup": "hàng WA",
      "mouth": "Phát âm âm tiết wa giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét sổ đứng và nét gập như một chiếc ly rượu vang đang đặt trên bàn (Rượu vang Wine).",
      "strokes": 2,
      "examples": [
        {
          "word": "ワイン (wain)",
          "kana": "ワイン",
          "romaji": "wain",
          "ipa": "/ɰa/",
          "vi": "rượu vang"
        },
        {
          "word": "ワイド (waido)",
          "kana": "ワイド",
          "romaji": "waido",
          "ipa": "/ɰa/",
          "vi": "rộng rãi"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/o/",
      "kana": "ヲ",
      "romaji": "o",
      "name": "Katakana ヲ (wo/o)",
      "group": "katakana",
      "subgroup": "hàng WA",
      "mouth": "Phát âm âm tiết o giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Giống chữ フ (fu) có thêm nét gạch ngang xuyên qua, rất hiếm dùng trong văn bản hiện đại.",
      "strokes": 3,
      "examples": [
        {
          "word": "ヲタク (otaku)",
          "kana": "ヲタク",
          "romaji": "otaku",
          "ipa": "/o/",
          "vi": "người say mê văn hóa 2D (cách viết cổ)"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    },
    {
      "ipa": "/ɴ/",
      "kana": "ン",
      "romaji": "n",
      "name": "Katakana ン (n)",
      "group": "katakana",
      "subgroup": "hàng N",
      "mouth": "Phát âm âm tiết n giống bản Hiragana tương ứng.",
      "viCompare": "Ký tự Katakana dùng ghi từ mượn tiếng nước ngoài, tên người nước ngoài và từ tượng thanh.",
      "mnemonic": "Nét thứ nhất nằm ngang chéo nhẹ, nét thứ hai hất VUỐT TỪ DƯỚI LÊN (như chữ n vút lên).",
      "strokes": 2,
      "examples": [
        {
          "word": "パン (pan)",
          "kana": "パン",
          "romaji": "pan",
          "ipa": "/ɴ/",
          "vi": "bánh mì"
        },
        {
          "word": "レモン (remon)",
          "kana": "レモン",
          "romaji": "remon",
          "ipa": "/ɴ/",
          "vi": "quả chanh"
        }
      ],
      "commonErrors": "Cần chú ý góc độ nét bút và hướng hất bút để tránh nhầm lẫn các cặp chữ Katakana tương đồng."
    }
  ],
  "minimalPairs": [
    {
      "id": "mp01",
      "soundA": "つ (tsu)",
      "soundB": "ちゅ (chu)",
      "wordA": {
        "word": "つき",
        "kana": "つき",
        "romaji": "tsuki",
        "ipa": "/t͡sɯki/",
        "vi": "mặt trăng"
      },
      "wordB": {
        "word": "ちゅうき",
        "kana": "ちゅうき",
        "romaji": "chuuki",
        "ipa": "/t͡ɕɯːki/",
        "vi": "trung kỳ / thời kỳ giữa"
      },
      "tip": "Âm 'tsu' đầu lưỡi đặt sát chân răng trên rồi xì hơi dẹt môi; âm 'chu' mặt lưỡi nâng áp ngạc cứng và hơi chu môi nhẹ."
    },
    {
      "id": "mp02",
      "soundA": "ba (ngắn)",
      "soundB": "baa (trường âm)",
      "wordA": {
        "word": "おばさん",
        "kana": "おばさん",
        "romaji": "obasan",
        "ipa": "/obasaɴ/",
        "vi": "cô, dì, bác gái (người phụ nữ trung niên)"
      },
      "wordB": {
        "word": "おばあさん",
        "kana": "おばあさん",
        "romaji": "obaasan",
        "ipa": "/obaːsaɴ/",
        "vi": "bà (người già)"
      },
      "tip": "Thiếu trường âm sẽ biến bà lão thành cô trung niên hoặc ngược lại! Hãy kéo dài âm 'baa' đúng 2 nhịp vỗ tay."
    },
    {
      "id": "mp03",
      "soundA": "ji (ngắn)",
      "soundB": "jii (trường âm)",
      "wordA": {
        "word": "おじさん",
        "kana": "おじさん",
        "romaji": "ojisan",
        "ipa": "/od͡ʑisaɴ/",
        "vi": "chú, bác trai"
      },
      "wordB": {
        "word": "おじいさん",
        "kana": "おじいさん",
        "romaji": "ojiisan",
        "ipa": "/od͡ʑiːsaɴ/",
        "vi": "ông nội, ông ngoại"
      },
      "tip": "Kéo dài âm 'jii' đủ 2 nhịp để phân biệt chú/bác với cụ ông."
    },
    {
      "id": "mp04",
      "soundA": "te (âm thường)",
      "soundB": "tte (âm ngắt sokuon)",
      "wordA": {
        "word": "きて",
        "kana": "きて",
        "romaji": "kite",
        "ipa": "/kite/",
        "vi": "hãy đến đây / hãy mặc áo"
      },
      "wordB": {
        "word": "きって",
        "kana": "きって",
        "romaji": "kitte",
        "ipa": "/kitte/",
        "vi": "con tem thư / cắt đi"
      },
      "tip": "Âm ngắt 'kitte' có một khoảng lặng ngắt hơi dứt khoát 1 nhịp ở cổ họng trước khi phát âm 'te'."
    },
    {
      "id": "mp05",
      "soundA": "ざ (za)",
      "soundB": "じゃ (ja)",
      "wordA": {
        "word": "ざっし",
        "kana": "ざっし",
        "romaji": "zasshi",
        "ipa": "/zaɕɕi/",
        "vi": "tạp chí"
      },
      "wordB": {
        "word": "じゃま",
        "kana": "じゃま",
        "romaji": "jama",
        "ipa": "/d͡ʑama/",
        "vi": "phiền hà, cản trở"
      },
      "tip": "Âm 'za' đầu lưỡi ma sát nhẹ ở chân răng trên; âm 'ja' mặt lưỡi nâng áp ngạc cứng giống âm 'gi'/'d' miền Nam."
    },
    {
      "id": "mp06",
      "soundA": "yu (ngắn)",
      "soundB": "yuu (trường âm)",
      "wordA": {
        "word": "ゆき",
        "kana": "ゆき",
        "romaji": "yuki",
        "ipa": "/jɯki/",
        "vi": "tuyết rơi"
      },
      "wordB": {
        "word": "ゆうき",
        "kana": "ゆうき",
        "romaji": "yuuki",
        "ipa": "/jɯːki/",
        "vi": "lòng dũng cảm"
      },
      "tip": "Trường âm 'yuu' kéo dài ngân nga gấp đôi nhịp so với âm ngắn 'yu'."
    },
    {
      "id": "mp07",
      "soundA": "e (ngắn)",
      "soundB": "ee (trường âm)",
      "wordA": {
        "word": "え",
        "kana": "え",
        "romaji": "e",
        "ipa": "/e/",
        "vi": "bức tranh vẽ"
      },
      "wordB": {
        "word": "ええ",
        "kana": "ええ",
        "romaji": "ee",
        "ipa": "/eː/",
        "vi": "vâng, dạ, đồng ý"
      },
      "tip": "Âm ngắn 'e' dứt khoát nghĩa là bức tranh; kéo dài 'ee' là câu đáp đồng tình lịch sự."
    },
    {
      "id": "mp08",
      "soundA": "ko-ko (ngắn)",
      "soundB": "kou-kou (2 trường âm)",
      "wordA": {
        "word": "ここ",
        "kana": "ここ",
        "romaji": "koko",
        "ipa": "/koko/",
        "vi": "ở đây, vị trí này"
      },
      "wordB": {
        "word": "こうこう",
        "kana": "こうこう",
        "romaji": "koukou",
        "ipa": "/koːkoː/",
        "vi": "trường trung học phổ thông (cấp 3)"
      },
      "tip": "Mỗi âm tiết trong 'koukou' đều mang trường âm kéo dài 2 nhịp."
    }
  ],
  "finalSounds": {
    "sokuon": {
      "title": "Âm ngắt (促音 - Sokuon: っ / ッ)",
      "desc": "Chữ 'tsu' nhỏ (っ trong Hiragana, ッ trong Katakana) biểu thị khoảng dừng ngắt hơi bằng đúng 1 phách (1 mora), làm gấp đôi phụ âm đứng ngay sau nó.",
      "rules": [
        {
          "before": "Trước hàng K (k)",
          "rule": "Gấp đôi phụ âm k (kk)",
          "example": "がっこう (gakkou - trường học), きって (kitte - tem)"
        },
        {
          "before": "Trước hàng S (s/sh)",
          "rule": "Gấp đôi phụ âm s (ss/ssh)",
          "example": "ざっし (zasshi - tạp chí), けっして (kesshite - tuyệt đối không)"
        },
        {
          "before": "Trước hàng T (t/ch)",
          "rule": "Gấp đôi phụ âm t (tt/tch)",
          "example": "まって (matte - hãy đợi), きっぷ (kippu - vé)"
        },
        {
          "before": "Trước hàng P (p)",
          "rule": "Gấp đôi phụ âm p (pp)",
          "example": "いっぱい (ippai - đầy / một ly), しっぽ (shippo - cái đuôi)"
        }
      ],
      "tip": "Hãy khựng hơi lại ở cổ họng đúng 1 nhịp (như khi bạn phát âm dấu nặng trong tiếng Việt nhưng giữ hơi lại) rồi bật mạnh âm tiết tiếp theo."
    },
    "hatsuonN": {
      "title": "Cách đọc chữ ん / ン (撥音 - Hatsuon)",
      "desc": "Chữ ん không bao giờ đứng đầu một từ. Cách phát âm của nó thay đổi tự nhiên thành [m], [n], [ng] hoặc nguyên âm mũi tùy thuộc vào âm tiết đi ngay sau nó.",
      "cases": [
        {
          "sound": "Đọc là [m]",
          "condition": "Khi đứng trước các âm môi: m, b, p",
          "example": "さんぽ (sanpo -> đọc là sam-po: đi dạo), しんぶん (shinbun -> đọc là shim-bum: tờ báo), てんぷら (tempura: món tempura)"
        },
        {
          "sound": "Đọc là [n]",
          "condition": "Khi đứng trước các âm răng/lợi: t, d, n, r",
          "example": "べんとう (bentou -> đọc là ben-tou: cơm hộp), おんな (onna: phụ nữ), あんない (annai: hướng dẫn)"
        },
        {
          "sound": "Đọc là [ng]",
          "condition": "Khi đứng trước các âm ngạc mềm: k, g",
          "example": "てんき (tenki -> đọc là teng-ki: thời tiết), りんご (ringo -> đọc là ring-go: quả táo), げんき (genki -> geng-ki: khỏe mạnh)"
        },
        {
          "sound": "Đọc là nguyên âm mũi [ɴ]",
          "condition": "Khi đứng ở cuối câu hoặc đứng trước nguyên âm / bán nguyên âm (a, i, u, e, o, y, w)",
          "example": "にほん (nihon: Nhật Bản), ほん (hon: quyển sách), でんわ (denwa: điện thoại)"
        }
      ]
    }
  },
  "stress": {
    "choon": {
      "title": "Trường âm (長音 - Chōon: Nguyên âm kéo dài)",
      "desc": "Trường âm là nguyên âm được phát âm ngân dài gấp đôi bình thường (2 phách thay vì 1 phách). Nếu không kéo dài trường âm, nghĩa của từ sẽ thay đổi hoàn toàn!",
      "hiraganaRules": [
        {
          "row": "Cột A (a)",
          "add": "Thêm あ",
          "example": "おかあさん (okaasan - mẹ)",
          "wrong": "おばさん (obasan - cô/dì) vs おばあさん (obaasan - bà)"
        },
        {
          "row": "Cột I (i)",
          "add": "Thêm い",
          "example": "おにいさん (oniisan - anh trai), おじいさん (ojiisan - ông)"
        },
        {
          "row": "Cột U (u)",
          "add": "Thêm う",
          "example": "くうき (kuuki - không khí), ぎゅうにゅう (gyuunyuu - sữa bò)"
        },
        {
          "row": "Cột E (e)",
          "add": "Thêm い (hoặc え với từ thuần Nhật)",
          "example": "せんせい (sensei - giáo viên), おねえさん (oneesan - chị gái)"
        },
        {
          "row": "Cột O (o)",
          "add": "Thêm う (hoặc お với từ thuần Nhật)",
          "example": "とうきょう (toukyou - Tokyo), おおかみ (ookami - chó sói)"
        }
      ],
      "katakanaRules": "Trong Katakana, toàn bộ trường âm đều được quy ước bằng một dấu gạch ngang kéo dài 'ー'. Ví dụ: コーヒー (koohii - cà phê), ケーキ (keeki - bánh ngọt), ノート (nooto - vở).",
      "tip": "Người Việt thường có thói quen đọc dứt khoát nhanh nên hay nuốt trường âm. Hãy đếm nhịp bằng cách gõ ngón tay: nguyên âm thường 1 nhịp, trường âm ngân đúng 2 nhịp đều nhau."
    },
    "pitchAccent": {
      "title": "Trọng âm cao độ tiếng Nhật (Pitch Accent)",
      "desc": "Tiếng Nhật không có thanh điệu như tiếng Việt nhưng có sự chênh lệch cao độ giữa các âm tiết (cao - Atamadaka, Nakadaka, Odaka, Heiban). Ví dụ: 雨 (ame - hạ giọng) nghĩa là mưa, còn 飴 (ame - nâng giọng) nghĩa là kẹo."
    }
  },
  "linking": {
    "particles": {
      "title": "Phát âm các trợ từ ngữ pháp đặc biệt (は, へ, を)",
      "desc": "Có ba chữ Kana thay đổi cách đọc khi đảm nhận vai trò TRỢ TỪ NGỮ PHÁP trong câu tiếng Nhật:",
      "rules": [
        {
          "char": "は",
          "normal": "ha",
          "asParticle": "wa",
          "meaning": "Trợ từ chỉ chủ đề của câu",
          "example": "わたしはナムです (Watashi wa Namu desu - Tôi là Nam)",
          "note": "Chỉ đọc là 'wa' khi là trợ từ. Khi nằm trong từ vựng vẫn đọc là 'ha' (ví dụ: はな hana - hoa)."
        },
        {
          "char": "へ",
          "normal": "he",
          "asParticle": "e",
          "meaning": "Trợ từ chỉ phương hướng di chuyển",
          "example": "日本へ行きます (Nihon e ikimasu - Tôi đi đến Nhật Bản)",
          "note": "Chỉ đọc là 'e' khi là trợ từ hướng đến. Khi nằm trong từ vẫn đọc là 'he' (ví dụ: へや heya - căn phòng)."
        },
        {
          "char": "を",
          "normal": "wo/o",
          "asParticle": "o",
          "meaning": "Trợ từ chỉ đối tượng tác động trực tiếp của hành động (tân ngữ)",
          "example": "水を飲みます (Mizu o nomimasu - Tôi uống nước)",
          "note": "Trong tiếng Nhật hiện đại を chỉ dùng duy nhất với vai trò trợ từ, đọc là 'o'."
        }
      ]
    }
  }
};

  if (typeof window !== 'undefined') {
    window.JA_KANA = KANA_DATA;
    window.JA_PHONICS = KANA_DATA;
    window.KANA = KANA_DATA;
    window.PHONICS_JA = KANA_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = KANA_DATA;
  }
})();
