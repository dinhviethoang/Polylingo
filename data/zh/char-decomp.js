/**
 * data/zh/char-decomp.js
 * Bảng tra cứu chiết tự, cấu tạo và mẹo nhớ chữ Hán HSK1 cho Polylingo.
 * Bao gồm 100% chữ Hán xuất hiện trong window.HSK1_WORDS.
 */

if (typeof window === 'undefined') {
  global.window = typeof globalThis !== 'undefined' ? globalThis : {};
}

window.CHAR_DECOMP = Object.assign(window.CHAR_DECOMP || {}, {
  "一": {
    "py": "yī",
    "hv": "nhất",
    "meaning": "một (1)",
    "strokes": 1,
    "structure": "độc thể",
    "parts": [],
    "radical": "一",
    "mnemonic": "Một vệt cọ ngang duy nhất vạch ra đường chân trời phân định đất trời buổi sơ khai."
  },
  "七": {
    "py": "qī",
    "hv": "thất",
    "meaning": "bảy (7)",
    "strokes": 2,
    "structure": "độc thể",
    "parts": [],
    "radical": "一",
    "mnemonic": "Nét ngang cắt ngang nét cong móc như lưỡi gươm gập lại đếm tới bảy lần."
  },
  "三": {
    "py": "sān",
    "hv": "tam",
    "meaning": "ba (3)",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "一",
    "mnemonic": "Ba nét gạch ngang xếp chồng lên nhau tượng trưng trời, đất và con người hòa quyện."
  },
  "上": {
    "py": "shàng",
    "hv": "thượng",
    "meaning": "trên, phía trên, lên",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "一",
    "mnemonic": "Nét gạch ngắn nằm vắt vẻo bên trên đường chân trời ngang chỉ rõ vị trí phía trên."
  },
  "下": {
    "py": "xià",
    "hv": "hạ",
    "meaning": "dưới, phía dưới, xuống",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "一",
    "mnemonic": "Nét chấm nhỏ buông thõng xuống dưới đường ngang dài nhằm chỉ rõ vị trí phía dưới."
  },
  "不": {
    "py": "bù",
    "hv": "bất",
    "meaning": "không (phủ định)",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "一",
    "mnemonic": "Mầm cây nhỏ bị tảng đá chặn ngang trên đầu nên không thể nào trồi lên được."
  },
  "业": {
    "py": "yè",
    "hv": "nghiệp",
    "meaning": "nghề nghiệp, sự nghiệp",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "一",
    "mnemonic": "Dãy cọc gỗ cắm dựng đứng thẳng hàng tạo nền móng vững chắc cho sự nghiệp lớn."
  },
  "东": {
    "py": "dōng",
    "hv": "đông",
    "meaning": "phía đông, hướng đông",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "一",
    "mnemonic": "Vầng mặt trời vừa ló rạng xuyên qua cành cây rậm rạp phía phương đông xa xôi."
  },
  "两": {
    "py": "liǎng",
    "hv": "lưỡng",
    "meaning": "hai (số lượng 2)",
    "strokes": 7,
    "structure": "độc thể",
    "parts": [],
    "radical": "一",
    "mnemonic": "Chiếc đòn gánh uốn cong gánh hai quả cân cân bằng đều ở hai bên vai trĩu."
  },
  "个": {
    "py": "gè",
    "hv": "cá",
    "meaning": "cái, con, người (lượng từ)",
    "strokes": 3,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "人",
        "name": "Bộ Nhân",
        "vi": "người, nhân loại",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "丨",
        "name": "Bộ Cổn",
        "vi": "nét sổ thẳng đứng",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "丨",
    "mnemonic": "Bóng người 人 đứng thẳng che trên chiếc gậy chống 丨 dài đếm từng cái một."
  },
  "中": {
    "py": "zhōng",
    "hv": "trung",
    "meaning": "ở giữa, trung tâm, trong",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "丨",
    "mnemonic": "Mũi tên thẳng vút bắn xuyên thẳng qua tâm bia tiêu điểm ở chính giữa hồng tâm."
  },
  "么": {
    "py": "me",
    "hv": "ma",
    "meaning": "trợ từ nghi vấn (gì, sao)",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "丿",
    "mnemonic": "Nét phẩy gập rồi chấm xuống như dấu chấm hỏi lơ lửng thắc mắc cái gì thế."
  },
  "乌": {
    "py": "wū",
    "hv": "ô",
    "meaning": "đen; con quạ",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "丿",
    "mnemonic": "Con quạ đen tuyền có bộ lông sẫm màu che khuất cả đôi mắt tròn xoe."
  },
  "乐": {
    "py": "lè",
    "hv": "nhạc",
    "meaning": "vui vẻ; âm nhạc",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "丿",
    "mnemonic": "Chiếc đàn gảy phát ra từng nốt âm vang khiến lòng người rộn ràng vui vẻ."
  },
  "九": {
    "py": "jiǔ",
    "hv": "cửu",
    "meaning": "chín (9)",
    "strokes": 2,
    "structure": "độc thể",
    "parts": [],
    "radical": "乙",
    "mnemonic": "Cánh tay co lại rồi duỗi cong móc mạnh mẽ đếm đến số chín trọn vẹn."
  },
  "也": {
    "py": "yě",
    "hv": "dã",
    "meaning": "cũng, cũng vậy",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "乚",
    "mnemonic": "Chiếc bình cổ có chiếc vòi cong uốn lượn cũng đựng đầy dòng nước mát lành."
  },
  "习": {
    "py": "xí",
    "hv": "tập",
    "meaning": "học tập, quen thuộc",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "冫",
    "mnemonic": "Đôi cánh chim non dập dờn tập bay theo làn gió cho quen thuộc bầu trời."
  },
  "书": {
    "py": "shū",
    "hv": "thư",
    "meaning": "sách vở, viết",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "丨",
    "mnemonic": "Cây bút nắn nót viết từng dòng chữ ngay ngắn lưu giữ vào trang sách vở."
  },
  "买": {
    "py": "mǎi",
    "hv": "mãi",
    "meaning": "mua",
    "strokes": 6,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "乛",
        "name": "Nét ngang gập móc",
        "vi": "nét gập góc",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "头",
        "name": "Chữ Đầu",
        "vi": "cái đầu (âm tóu)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "大",
    "mnemonic": "Đội chiếc nón che 乛 vác bao hàng lên đầu 头 đem ra phố mua sắm đồ."
  },
  "了": {
    "py": "le",
    "hv": "liễu",
    "meaning": "rồi (trợ từ ngữ khí)",
    "strokes": 2,
    "structure": "độc thể",
    "parts": [],
    "radical": "亅",
    "mnemonic": "Đứa bé bọc tã vừa mới lọt lòng đã hoàn thành việc chào đời rồi đấy."
  },
  "二": {
    "py": "èr",
    "hv": "nhị",
    "meaning": "hai (2)",
    "strokes": 2,
    "structure": "độc thể",
    "parts": [],
    "radical": "二",
    "mnemonic": "Hai vạch ngang song song tượng trưng cho hai vầng nhật nguyệt cùng tỏa sáng."
  },
  "互": {
    "py": "hù",
    "hv": "hỗ",
    "meaning": "lẫn nhau, tương hỗ",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "二",
    "mnemonic": "Hai chiếc móc đan cài ngoặc khít vào nhau biểu thị sự gắn bó lẫn nhau."
  },
  "五": {
    "py": "wǔ",
    "hv": "ngũ",
    "meaning": "năm (5)",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "二",
    "mnemonic": "Bốn đường đan chéo giao thoa giữa đất trời hội tụ đủ năm yếu tố ngũ hành."
  },
  "些": {
    "py": "xiē",
    "hv": "ta",
    "meaning": "một số, vài",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "此",
        "name": "Chữ Thử",
        "vi": "người đứng dừng chân ở chỗ này (âm cǐ)",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "二",
        "name": "Chữ Nhị",
        "vi": "hai (2)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "二",
    "mnemonic": "Mang chút ít đồ vật này 此 đặt lên hai 二 bàn tay đếm xem có vài chiếc."
  },
  "交": {
    "py": "jiāo",
    "hv": "giao",
    "meaning": "giao tiếp, kết giao",
    "strokes": 6,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "六",
        "name": "Chữ Lục",
        "vi": "sáu (6)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "乂",
        "name": "Nét chéo",
        "vi": "hai nét đan chéo nhau",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "亠",
    "mnemonic": "Bốn phương người tụ họp dưới mái nhà 六 bắt chéo chân 乂 kết giao thân tình."
  },
  "京": {
    "py": "jīng",
    "hv": "kinh",
    "meaning": "kinh đô, thủ đô",
    "strokes": 8,
    "structure": "trên-giữa-dưới",
    "parts": [
      {
        "c": "亠",
        "name": "Bộ Đầu",
        "vi": "phần trên cùng, nắp che",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "giữa",
        "role": "nghĩa"
      },
      {
        "c": "小",
        "name": "Bộ Tiểu",
        "vi": "nhỏ bé, ít ỏi",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "亠",
    "mnemonic": "Tòa lâu đài cao có mái hiên 亠 cửa 口 đón gió và nền móng trụ 小 vững giữa kinh đô."
  },
  "亮": {
    "py": "liàng",
    "hv": "lượng",
    "meaning": "sáng, sáng sủa",
    "strokes": 9,
    "structure": "độc thể",
    "parts": [],
    "radical": "亠",
    "mnemonic": "Ngọn đèn trên đài cao tỏa ánh sáng rực rỡ soi tỏ khắp gian phòng tối tăm."
  },
  "人": {
    "py": "rén",
    "hv": "nhân",
    "meaning": "người, con người",
    "strokes": 2,
    "structure": "độc thể",
    "parts": [],
    "radical": "人",
    "mnemonic": "Dáng người đứng choãi đôi chân vững chãi bước từng bước dài hướng về phía trước."
  },
  "什": {
    "py": "shén",
    "hv": "thập",
    "meaning": "gì, cái gì",
    "strokes": 4,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "十",
        "name": "Bộ Thập",
        "vi": "số mười, trọn vẹn mười phương",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người đàn ông 亻 ngơ ngác đếm đi đếm lại mười 十 lần xem là cái gì."
  },
  "今": {
    "py": "jīn",
    "hv": "kim",
    "meaning": "hiện nay, hôm nay",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "人",
    "mnemonic": "Mái hiên khép lại che chở trọn vẹn khoảnh khắc hiện tại của ngày hôm nay."
  },
  "介": {
    "py": "jiè",
    "hv": "giới",
    "meaning": "giới thiệu, ở giữa",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "人",
    "mnemonic": "Người đứng dang rộng hai tay phân chia ranh giới ở giữa làm mai mối giới thiệu."
  },
  "从": {
    "py": "cóng",
    "hv": "tòng",
    "meaning": "từ (nơi chốn), theo sau",
    "strokes": 4,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "人",
        "name": "Bộ Nhân",
        "vi": "người, nhân loại",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "人",
        "name": "Bộ Nhân",
        "vi": "người, nhân loại",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "人",
    "mnemonic": "Một người 人 bước đi trước dẫn đường và một người 人 lẽo đẽo theo sau."
  },
  "仔": {
    "py": "zī",
    "hv": "tử",
    "meaning": "cẩn thận, kỹ lưỡng (trong 仔细)",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "子",
        "name": "Bộ Tử",
        "vi": "đứa trẻ, con cái",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người cha 亻 ân cần chăm chút từng li từng tí cho đứa con nhỏ 子 rất cẩn thận."
  },
  "他": {
    "py": "tā",
    "hv": "tha",
    "meaning": "anh ấy, ông ấy (ngôi 3 nam)",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "也",
        "name": "Chữ Dã",
        "vi": "cũng là (mượn âm yě -> tā)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người đàn ông 亻 lạ mặt kia cũng là 也 (yě đọc gần tā) một người quen cũ."
  },
  "付": {
    "py": "fù",
    "hv": "phó",
    "meaning": "chi trả, thanh toán",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "寸",
        "name": "Bộ Thốn",
        "vi": "tấc, đo lường khoảng cách ngắn",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người khách 亻 chìa tay đo từng tấc 寸 bạc vụn để chi trả tiền món hàng."
  },
  "以": {
    "py": "yǐ",
    "hv": "dĩ",
    "meaning": "lấy, dùng; để mà",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "人",
    "mnemonic": "Dùng chiếc cày xới sâu luống đất làm mốc giới hạn để mà bắt đầu canh tác."
  },
  "们": {
    "py": "men",
    "hv": "môn",
    "meaning": "các, chúng (hậu tố số nhiều)",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "门",
        "name": "Bộ Môn",
        "vi": "cánh cửa, cổng ra vào",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "亻",
    "mnemonic": "Nhiều người 亻 cùng đứng chen chúc trước cánh cổng 门 lớn tụ họp thành chúng tôi."
  },
  "件": {
    "py": "jiàn",
    "hv": "kiện",
    "meaning": "chiếc, kiện (lượng từ quần áo, sự việc)",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "牛",
        "name": "Bộ Ngưu",
        "vi": "con trâu, con bò",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người lái buôn 亻 dắt từng con trâu 牛 buộc dây đếm từng món hàng kiện kiện một."
  },
  "休": {
    "py": "xiū",
    "hv": "hưu",
    "meaning": "nghỉ ngơi",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người tiều phu 亻 mỏi gối tựa lưng vào thân cây gỗ 木 để nghỉ ngơi hồi sức."
  },
  "优": {
    "py": "yōu",
    "hv": "ưu",
    "meaning": "ưu tú, tốt đẹp",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "尤",
        "name": "Chữ Vưu",
        "vi": "khuyết tật đặc biệt, họ Vưu (âm yóu)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người tài tử 亻 sở hữu tài năng đặc biệt 尤 xuất chúng hơn người thật là ưu tú."
  },
  "会": {
    "py": "huì",
    "hv": "hội",
    "meaning": "biết, có thể; cuộc họp",
    "strokes": 6,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "人",
        "name": "Bộ Nhân",
        "vi": "người, nhân loại",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "云",
        "name": "Chữ Vân",
        "vi": "mây trời bồng bềnh (âm yún)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "人",
    "mnemonic": "Mọi người 人 tụ họp dưới đám mây 云 cùng nhau bàn bạc trong một cuộc họp lớn."
  },
  "伞": {
    "py": "sǎn",
    "hv": "tản",
    "meaning": "cái ô, cái dù",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "人",
    "mnemonic": "Khung dù bốn nan xòe rộng che mưa nắng tựa chiếc nấm lớn bảo vệ người đi."
  },
  "位": {
    "py": "wèi",
    "hv": "vị",
    "meaning": "vị, người (lượng từ lịch sự)",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "立",
        "name": "Bộ Lập",
        "vi": "người đứng vững trên mặt đất",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "亻",
    "mnemonic": "Vị khách quý 亻 đứng thẳng 立 nghiêm trang ở hàng đầu chờ được gọi tên mình."
  },
  "体": {
    "py": "tǐ",
    "hv": "thể",
    "meaning": "cơ thể, thể xác",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "本",
        "name": "Chữ Bản",
        "vi": "cuốn, quyển (sách); vốn dĩ",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "亻",
    "mnemonic": "Cơ thể con người 亻 cần được bồi dưỡng từ gốc rễ 本 cốt tủy mới khỏe mạnh."
  },
  "作": {
    "py": "zuō",
    "hv": "tác",
    "meaning": "làm việc, sáng tác",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "乍",
        "name": "Chữ Sạ",
        "vi": "chợt, vừa mới",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người thợ 亻 vừa mới bắt đầu 乍 tay làm việc đã tạo nên một tác phẩm đẹp."
  },
  "你": {
    "py": "nǐ",
    "hv": "nhĩ",
    "meaning": "bạn, anh, chị (ngôi 2)",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "尔",
        "name": "Chữ Nhĩ",
        "vi": "ngươi, bạn (đại từ nhân xưng)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người bạn thân thiết 亻 cùng san sẻ chiếc khăn quàng 尔 (ěr gần nǐ) khi mùa đông về."
  },
  "便": {
    "py": "pián",
    "hv": "tiện",
    "meaning": "tiện lợi, thuận tiện",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "更",
        "name": "Chữ Canh",
        "vi": "đánh trống đổi canh, càng thêm (âm gèng)",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người hành khách 亻 đổi lấy bộ đồ mới 更 (gèng gần biàn) cho thuận tiện lên đường."
  },
  "信": {
    "py": "xìn",
    "hv": "tín",
    "meaning": "thư từ, tin tưởng",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "言",
        "name": "Bộ Ngôn",
        "vi": "lời nói, ngôn ngữ",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "亻",
    "mnemonic": "Lời nói 言 của con người 亻 trung thực chân thành luôn đem lại niềm tin vững chắc."
  },
  "倒": {
    "py": "dào",
    "hv": "đảo",
    "meaning": "ngã, đổ; rót (nước)",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "到",
        "name": "Chữ Đáo",
        "vi": "đến, tới nơi",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người đi đường 亻 trượt chân ngã nhào khi vừa bước chân tới 到 ngưỡng cửa nhà."
  },
  "候": {
    "py": "hou",
    "hv": "hậu",
    "meaning": "thời điểm, chờ đợi",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "矦",
        "name": "Chữ Hầu",
        "vi": "tấm bia ngắm bắn tên",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người lính 亻 giương cung ngắm bắn mục tiêu 矦 kiên nhẫn chờ đợi đúng thời điểm."
  },
  "假": {
    "py": "jiǎ",
    "hv": "giả",
    "meaning": "kỳ nghỉ; giả dối",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "叚",
        "name": "Chữ Giả",
        "vi": "mượn tạm (âm jiǎ)",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người kia 亻 mượn tạm tấm da đỏ 叚 (jiǎ) để đeo mặt nạ giả vờ vào kỳ nghỉ dài."
  },
  "偏": {
    "py": "piān",
    "hv": "thiên",
    "meaning": "lệch, nghiêng một bên",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "扁",
        "name": "Chữ Biển",
        "vi": "tấm biển treo trên cửa (âm biǎn)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "亻",
    "mnemonic": "Dáng người 亻 ngả nghiêng sang một bên mép tấm biển 扁 (biǎn lái piān) tạo góc lệch hẳn."
  },
  "做": {
    "py": "zuò",
    "hv": "tác",
    "meaning": "làm, chế tạo, nấu ăn",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亻",
        "name": "Bộ Nhân đứng",
        "vi": "người, con người",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "故",
        "name": "Chữ Cố",
        "vi": "nguyên cớ, câu chuyện cũ (âm gù)",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "亻",
    "mnemonic": "Người thợ 亻 cần cù tìm mọi cớ 故 (gù trợ âm) để bắt tay vào chế tạo đồ dùng."
  },
  "儿": {
    "py": "ér",
    "hv": "nhi",
    "meaning": "con nhỏ, trẻ con; âm cuốn lưỡi",
    "strokes": 2,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "丿",
        "name": "Bộ Phiệt",
        "vi": "nét phẩy nghiêng trái",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "乚",
        "name": "Nét sổ cong móc",
        "vi": "nét uốn cong móc lên",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "儿",
    "mnemonic": "Đứa bé nhỏ chập chững bước đi bằng hai chân dài ngoẵng 丿 và 乚 trên thảm cỏ xanh."
  },
  "元": {
    "py": "yuán",
    "hv": "nguyên",
    "meaning": "đồng nhân dân tệ, nguồn gốc",
    "strokes": 4,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "二",
        "name": "Chữ Nhị",
        "vi": "hai (2)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "儿",
        "name": "Chữ Nhi",
        "vi": "con nhỏ, trẻ con; âm cuốn lưỡi",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "儿",
    "mnemonic": "Hai vạch trời 二 che trên đầu chú bé 儿 gợi nguồn cội lớn lao và đơn vị đồng bạc."
  },
  "先": {
    "py": "xiān",
    "hv": "tiên",
    "meaning": "trước, đi trước",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "儿",
    "mnemonic": "Đôi chân nhanh nhẹn sải bước vượt lên trước những người khác trên con đường dài tít tắp."
  },
  "光": {
    "py": "guāng",
    "hv": "quang",
    "meaning": "ánh sáng; hết nhẵn",
    "strokes": 6,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "⺌",
        "name": "Bộ Tiểu biến thể",
        "vi": "nhỏ bé bên trên",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "兀",
        "name": "Chữ Ngột",
        "vi": "chơ vơ, cao vút bên trên",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "儿",
    "mnemonic": "Ngọn lửa nhỏ ⺌ bùng cháy rực rỡ trên chiếc đế chân 兀 cao tỏa ánh sáng khắp căn phòng."
  },
  "八": {
    "py": "bā",
    "hv": "bát",
    "meaning": "tám (8)",
    "strokes": 2,
    "structure": "độc thể",
    "parts": [],
    "radical": "八",
    "mnemonic": "Hai nét phẩy và mác rẽ sang hai hướng ngược nhau gợi hình ảnh số tám rộng mở."
  },
  "公": {
    "py": "gōng",
    "hv": "công",
    "meaning": "công cộng, ông nội/ngoại",
    "strokes": 4,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "八",
        "name": "Chữ Bát",
        "vi": "tám (8)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "厶",
        "name": "Bộ Tư",
        "vi": "riêng tư, bản thân",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "八",
    "mnemonic": "Chia đều của cải tám 八 phần cho mọi người chứ không giữ riêng tư 厶 cho cá nhân."
  },
  "六": {
    "py": "liù",
    "hv": "lục",
    "meaning": "sáu (6)",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "八",
    "mnemonic": "Mái nhà nhỏ che chở đôi chân đang bước vững vàng hoàn thành sáu ngày công vất vả."
  },
  "共": {
    "py": "gòng",
    "hv": "cộng",
    "meaning": "cùng nhau, tổng cộng",
    "strokes": 6,
    "structure": "trên-giữa-dưới",
    "parts": [
      {
        "c": "廾",
        "name": "Bộ Củng",
        "vi": "hai tay cùng nâng lên",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "一",
        "name": "Chữ Nhất",
        "vi": "một (1)",
        "pos": "giữa",
        "role": "nghĩa"
      },
      {
        "c": "八",
        "name": "Chữ Bát",
        "vi": "tám (8)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "八",
    "mnemonic": "Hai bàn tay 廾 nâng dải lụa 一 cùng tám 八 món quà quý đem tặng mọi người."
  },
  "关": {
    "py": "guān",
    "hv": "quan",
    "meaning": "đóng lại, liên quan",
    "strokes": 6,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "丷",
        "name": "Nét hai chấm xòe",
        "vi": "hai nét chấm tỏa ra",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "天",
        "name": "Chữ Thiên",
        "vi": "ngày; bầu trời",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "丷",
    "mnemonic": "Cắm hai chiếc then cài 丷 ngang qua cánh cổng cao ngất trời 天 để đóng chặt lối đi."
  },
  "兴": {
    "py": "xīng",
    "hv": "hứng",
    "meaning": "hứng thú, vui mừng (trong 高兴)",
    "strokes": 6,
    "structure": "trên-giữa-dưới",
    "parts": [
      {
        "c": "⺍",
        "name": "Bộ Hào biến thể",
        "vi": "học hỏi, rèn luyện trí tuệ",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "一",
        "name": "Chữ Nhất",
        "vi": "một (1)",
        "pos": "giữa",
        "role": "nghĩa"
      },
      {
        "c": "八",
        "name": "Chữ Bát",
        "vi": "tám (8)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "八",
    "mnemonic": "Nhiều cánh tay ⺍ cùng nâng đỡ đòn gánh 一 bước đi tám 八 hướng đầy vẻ hào hứng vui mừng."
  },
  "具": {
    "py": "jù",
    "hv": "cụ",
    "meaning": "dụng cụ, đồ dùng",
    "strokes": 8,
    "structure": "độc thể",
    "parts": [],
    "radical": "八",
    "mnemonic": "Chiếc hòm gỗ có nhiều ngăn đựng xếp ngay ngắn các loại dụng cụ đồ nghề thợ mộc."
  },
  "内": {
    "py": "nèi",
    "hv": "nội",
    "meaning": "bên trong, nội bộ",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "入",
    "mnemonic": "Bước chân luồn sâu qua khung cửa hẹp để tiến vào nơi thâm sâu bên trong phòng kín."
  },
  "再": {
    "py": "zài",
    "hv": "tái",
    "meaning": "lại, thêm lần nữa",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "冂",
    "mnemonic": "Chiếc khung gỗ vừa dựng xong lại được đóng thêm một thanh ngang gia cố lần nữa."
  },
  "冒": {
    "py": "mào",
    "hv": "mạo",
    "meaning": "mạo hiểm; bốc lên (trong 感冒)",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "目",
        "name": "Bộ Mục",
        "vi": "con mắt, nhìn ngắm",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "冂",
    "mnemonic": "Đội chiếc mũ che kín vầng trán 日 và đôi mắt 目 liều lĩnh mạo hiểm xông pha ra ngoài gió rét."
  },
  "写": {
    "py": "xiě",
    "hv": "tả",
    "meaning": "viết",
    "strokes": 5,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "冖",
        "name": "Bộ Mịch",
        "vi": "mái che, trùm kín",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "与",
        "name": "Chữ Dữ",
        "vi": "và, cùng với (âm yǔ)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "冖",
    "mnemonic": "Ngồi dưới mái hiên 冖 nắn nót viết từng dòng chữ ngay ngắn cùng với 与 nghiên mực thơm."
  },
  "冬": {
    "py": "dōng",
    "hv": "đông",
    "meaning": "mùa đông",
    "strokes": 5,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "夂",
        "name": "Bộ Trĩ",
        "vi": "bước đi chậm phía sau",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "⺀",
        "name": "Bộ Băng biến thể",
        "vi": "nước đá, băng lạnh",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "⺀",
    "mnemonic": "Cuối năm bước chân 夂 chậm lại khi từng bông tuyết ⺀ bắt đầu rơi báo hiệu mùa đông buốt giá."
  },
  "冷": {
    "py": "lěng",
    "hv": "lãnh",
    "meaning": "lạnh, giá buốt",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "冫",
        "name": "Bộ Băng",
        "vi": "băng giá, lạnh lẽo",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "令",
        "name": "Chữ Lệnh",
        "vi": "mệnh lệnh, chỉ thị (âm lìng)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "冫",
    "mnemonic": "Giọt sương giá 冫 rơi trúng lệnh 令 (lìng đọc gần lěng) bài sứ giả khiến bàn tay lạnh ngắt."
  },
  "净": {
    "py": "jìng",
    "hv": "tịnh",
    "meaning": "sạch sẽ, thanh tịnh",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "冫",
        "name": "Bộ Băng",
        "vi": "băng giá, lạnh lẽo",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "争",
        "name": "Chữ Tranh",
        "vi": "tranh giành, cố gắng (âm zhēng)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "冫",
    "mnemonic": "Dòng nước băng tuyết 冫 chảy qua quét sạch mọi tranh chấp 争 giành để lại sự sạch sẽ thanh tịnh."
  },
  "准": {
    "py": "zhǔn",
    "hv": "chuẩn",
    "meaning": "chuẩn xác, cho phép",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "冫",
        "name": "Bộ Băng",
        "vi": "băng giá, lạnh lẽo",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "隹",
        "name": "Bộ Chuy",
        "vi": "chim đuôi ngắn",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "冫",
    "mnemonic": "Đôi giọt nước 冫 đọng trên cánh con chim nhỏ 隹 đậu ngay ngắn chuẩn xác trên cành cây khô."
  },
  "凉": {
    "py": "liáng",
    "hv": "lương",
    "meaning": "mát mẻ, nguội lạnh",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "冫",
        "name": "Bộ Băng",
        "vi": "băng giá, lạnh lẽo",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "京",
        "name": "Chữ Kinh",
        "vi": "kinh đô, thủ đô",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "冫",
    "mnemonic": "Cơn gió lạnh 冫 thổi qua kinh thành 京 (jīng lái liáng) mang lại cảm giác mát mẻ dễ chịu buổi sớm."
  },
  "几": {
    "py": "jǐ",
    "hv": "kỉ",
    "meaning": "mấy, vài; cái bàn nhỏ",
    "strokes": 2,
    "structure": "độc thể",
    "parts": [],
    "radical": "几",
    "mnemonic": "Chiếc bàn trà nhỏ bằng gỗ uốn cong chân đặt ở góc phòng để mấy chén trà thơm."
  },
  "出": {
    "py": "chū",
    "hv": "xuất",
    "meaning": "ra, xuất hiện",
    "strokes": 5,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "屮",
        "name": "Bộ Triệt",
        "vi": "mầm cây mới nhú",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "凵",
        "name": "Bộ Khảm",
        "vi": "hố trũng, đồ chứa đựng",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "凵",
    "mnemonic": "Mầm cỏ non 屮 vượt thoát khỏi lòng hố sâu 凵 vươn mình trồi ra đón ánh mặt trời rực rỡ."
  },
  "分": {
    "py": "fēn",
    "hv": "phân",
    "meaning": "phút; điểm; phân chia",
    "strokes": 4,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "八",
        "name": "Chữ Bát",
        "vi": "tám (8)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "刀",
        "name": "Bộ Đao",
        "vi": "con dao, vũ khí chém",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "刀",
    "mnemonic": "Chiếc dao bén 刀 lia qua chia đôi đồ vật thành tám 八 phần bằng nhau trong tích tắc."
  },
  "刚": {
    "py": "gāng",
    "hv": "phương",
    "meaning": "vừa mới, cứng cỏi",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "冈",
        "name": "Chữ Cương",
        "vi": "gò đồi, sườn núi cao",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "刂",
        "name": "Bộ Đao đứng",
        "vi": "con dao, nhát cắt",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "刂",
    "mnemonic": "Lưỡi dao sắc 刂 chém đứt ngọn núi thép 冈 (gāng) chứng tỏ lòng kiên cường và vừa mới xảy ra."
  },
  "利": {
    "py": "lì",
    "hv": "lợi",
    "meaning": "tiện lợi, sắc bén; lợi ích",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "禾",
        "name": "Bộ Hòa",
        "vi": "cây lúa trĩu hạt",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "刂",
        "name": "Bộ Đao đứng",
        "vi": "con dao, nhát cắt",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "刂",
    "mnemonic": "Lưỡi liềm 刂 gặt bó lúa 禾 chín vàng trĩu hạt đem lại nguồn lợi ích ấm no cho nông dân."
  },
  "别": {
    "py": "bié",
    "hv": "biệt",
    "meaning": "đừng; biệt ly; khác",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "另",
        "name": "Chữ Lánh",
        "vi": "tách rời, riêng biệt khác (âm lìng)",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "刂",
        "name": "Bộ Đao đứng",
        "vi": "con dao, nhát cắt",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "刂",
    "mnemonic": "Miệng nói lời chia lìa 另 trong khi tay vung dao 刂 dứt khoát dặn đừng bao giờ quay lại."
  },
  "刮": {
    "py": "guā",
    "hv": "quát",
    "meaning": "thổi (gió); cạo, gọt",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "舌",
        "name": "Bộ Thiệt",
        "vi": "cái lưỡi thè ra khỏi miệng",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "刂",
        "name": "Bộ Đao đứng",
        "vi": "con dao, nhát cắt",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "刂",
    "mnemonic": "Đưa lưỡi dao 刂 cạo nhẹ chiếc lưỡi 舌 để làm sạch và đón cơn gió rít thổi mạnh qua khe."
  },
  "到": {
    "py": "dào",
    "hv": "đáo",
    "meaning": "đến, tới nơi",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "至",
        "name": "Bộ Chí",
        "vi": "mũi tên rơi xuống đất, đến nơi",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "刂",
        "name": "Bộ Đao đứng",
        "vi": "con dao, nhát cắt",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "刂",
    "mnemonic": "Bước chân đi đến 至 nơi thì vung lưỡi dao 刂 phát quang lối mòn đánh dấu đã tới đích."
  },
  "刷": {
    "py": "shuā",
    "hv": "xoát",
    "meaning": "chải, quét; bàn chải",
    "strokes": 8,
    "structure": "độc thể",
    "parts": [],
    "radical": "刂",
    "mnemonic": "Chiếc bàn chải có cán cầm dài với hàng lông cứng dùng để chải sạch bụi bẩn bám trên áo."
  },
  "刻": {
    "py": "kè",
    "hv": "khắc",
    "meaning": "khắc; 15 phút (khắc)",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亥",
        "name": "Chữ Hợi",
        "vi": "chi Hợi, con lợn (âm hài)",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "刂",
        "name": "Bộ Đao đứng",
        "vi": "con dao, nhát cắt",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "刂",
    "mnemonic": "Cầm lưỡi dao 刂 nhọn tỉ mỉ khắc từng nét chữ lên mai rùa 亥 (hài đọc gần kè) theo từng khắc giờ."
  },
  "前": {
    "py": "qián",
    "hv": "tiền",
    "meaning": "trước, phía trước",
    "strokes": 9,
    "structure": "độc thể",
    "parts": [],
    "radical": "刂",
    "mnemonic": "Thuyền lướt trên sông đưa người tiến thẳng về phía trước để kịp cập bến chợ sáng sớm."
  },
  "力": {
    "py": "lì",
    "hv": "lực",
    "meaning": "sức lực, sức mạnh",
    "strokes": 2,
    "structure": "độc thể",
    "parts": [],
    "radical": "力",
    "mnemonic": "Bắp tay cuồn cuộn gân guốc dồn hết sức lực nâng bổng tảng đá nặng ngàn cân lên khỏi đất."
  },
  "办": {
    "py": "bàn",
    "hv": "biện",
    "meaning": "làm, giải quyết việc",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "力",
    "mnemonic": "Dốc hết sức lực ở giữa cùng hai giọt mồ hôi rơi hai bên để lo toan giải quyết công việc."
  },
  "动": {
    "py": "dòng",
    "hv": "động",
    "meaning": "chuyển động, hành động",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "云",
        "name": "Chữ Vân",
        "vi": "mây trời bồng bềnh (âm yún)",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "力",
        "name": "Bộ Lực",
        "vi": "sức lực, sức mạnh",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "力",
    "mnemonic": "Đám mây trắng 云 cuộn tròn chuyển động nhờ sức gió mạnh mẽ 力 thổi qua đỉnh núi cao."
  },
  "努": {
    "py": "nǔ",
    "hv": "nỗ",
    "meaning": "nỗ lực, cố gắng",
    "strokes": 7,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "奴",
        "name": "Chữ Nô",
        "vi": "tay nắm phụ nữ làm nô lệ (âm nú)",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "力",
        "name": "Bộ Lực",
        "vi": "sức lực, sức mạnh",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "力",
    "mnemonic": "Kẻ tôi tớ 奴 phải dồn hết sức lực 力 làm lụng vất vả nỗ lực vươn lên thoát khỏi cảnh nghèo hèn."
  },
  "包": {
    "py": "bāo",
    "hv": "bao",
    "meaning": "gói, túi xách; bao bọc",
    "strokes": 5,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "勹",
        "name": "Bộ Bao",
        "vi": "bao bọc, ôm lấy",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "巳",
        "name": "Bộ Tị",
        "vi": "con rắn; thai nhi",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "勹",
    "mnemonic": "Chiếc bao vải 勹 buộc chặt che chở lấy bọc bào thai 巳 ấm áp bên trong lưng mẹ hiền."
  },
  "北": {
    "py": "běi",
    "hv": "bắc",
    "meaning": "phía bắc, hướng bắc",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "匕",
    "mnemonic": "Hai người ngồi quay lưng lại với nhau tránh cơn gió lạnh căm căm từ phương bắc thổi tràn về."
  },
  "医": {
    "py": "yī",
    "hv": "y",
    "meaning": "y học, bác sĩ",
    "strokes": 7,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "匸",
        "name": "Bộ Hệ",
        "vi": "thùng chứa đồ giấu kín",
        "pos": "ngoài",
        "role": "âm"
      },
      {
        "c": "矢",
        "name": "Bộ Thỉ",
        "vi": "mũi tên bắn thẳng",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "匸",
    "mnemonic": "Mở hòm thuốc 匸 lấy mũi tên nhọn 矢 gắp độc cứu chữa cho người bệnh qua cơn hiểm nghèo."
  },
  "十": {
    "py": "shí",
    "hv": "thập",
    "meaning": "mười (10)",
    "strokes": 2,
    "structure": "độc thể",
    "parts": [],
    "radical": "十",
    "mnemonic": "Một vạch ngang và một vạch dọc giao nhau vuông góc tạo thành con số mười tròn trĩnh."
  },
  "千": {
    "py": "qiān",
    "hv": "thiên",
    "meaning": "nghìn, ngàn (1.000)",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "十",
    "mnemonic": "Thêm nét phẩy nghiêng trên đầu con số mười biến thành con số ngàn lớn gấp trăm lần."
  },
  "午": {
    "py": "wǔ",
    "hv": "ngọ",
    "meaning": "buổi trưa, giờ Ngọ",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "十",
    "mnemonic": "Chiếc chày giã gạo nhô đầu lên khỏi cối đá vào đúng giờ ngọ giữa trưa nắng gắt."
  },
  "半": {
    "py": "bàn",
    "hv": "bán",
    "meaning": "nửa, một nửa",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "十",
    "mnemonic": "Nhát cắt xẻ đôi nhánh cây có hai chiếc lá tách làm hai nửa cân bằng tuyệt đối."
  },
  "单": {
    "py": "dān",
    "hv": "đơn",
    "meaning": "đơn độc, danh sách",
    "strokes": 8,
    "structure": "độc thể",
    "parts": [],
    "radical": "丷",
    "mnemonic": "Chiếc nạng gỗ đơn sơ dùng làm vũ khí săn bắt chỉ có một mình đơn độc giữa rừng sâu."
  },
  "卖": {
    "py": "mài",
    "hv": "mại",
    "meaning": "bán",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "十",
        "name": "Bộ Thập",
        "vi": "số mười, trọn vẹn mười phương",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "买",
        "name": "Chữ Mãi",
        "vi": "mua",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "十",
    "mnemonic": "Thêm mười 十 đồng tiền vốn lên hàng mua 买 vào để đem ra chợ bán lấy lời sinh sống."
  },
  "南": {
    "py": "nán",
    "hv": "nam",
    "meaning": "phía nam, hướng nam",
    "strokes": 9,
    "structure": "độc thể",
    "parts": [],
    "radical": "十",
    "mnemonic": "Ngôi nhà đón nắng ấm có chiếc chuông treo ngân nga chỉ về hướng nam trù phú và màu mỡ."
  },
  "卡": {
    "py": "qiǎ",
    "hv": "tạp",
    "meaning": "thẻ, thiệp (card)",
    "strokes": 5,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "上",
        "name": "Chữ Thượng",
        "vi": "trên, phía trên, lên",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "卜",
        "name": "Bộ Bốc",
        "vi": "xem bói, vết nứt mu rùa",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "卜",
    "mnemonic": "Đặt tấm thẻ lên 上 rồi dùng ngón tay búng một tiếng tách 卜 nghe rất gọn gàng."
  },
  "去": {
    "py": "qù",
    "hv": "khứ",
    "meaning": "đi, rời đi",
    "strokes": 5,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "土",
        "name": "Bộ Thổ",
        "vi": "đất đai, thổ nhưỡng",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "厶",
        "name": "Bộ Tư",
        "vi": "riêng tư, bản thân",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "厶",
    "mnemonic": "Bước chân đạp lên lớp đất cát 土 bước vào hang tối 厶 rồi rời đi xa hút tầm mắt."
  },
  "友": {
    "py": "yǒu",
    "hv": "hữu",
    "meaning": "bạn bè, bằng hữu",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "又",
    "mnemonic": "Hai cánh tay đan chéo nắm chặt lấy nhau thề nguyền cùng nhau làm bạn bè tri kỷ suốt đời."
  },
  "双": {
    "py": "shuāng",
    "hv": "song",
    "meaning": "đôi, cặp (lượng từ)",
    "strokes": 4,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "又",
        "name": "Bộ Hựu",
        "vi": "bàn tay phải, lặp lại",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "又",
        "name": "Bộ Hựu",
        "vi": "bàn tay phải, lặp lại",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "又",
    "mnemonic": "Hai bàn tay 又 và 又 đặt song song kề cạnh nhau tạo thành một đôi hoàn hảo."
  },
  "发": {
    "py": "fā",
    "hv": "phát",
    "meaning": "phát ra, gửi; tóc",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "又",
    "mnemonic": "Cung tên giương căng chuẩn bị bắn phát ra mũi tên bay vút đi trong chớp mắt."
  },
  "受": {
    "py": "shòu",
    "hv": "thụ",
    "meaning": "nhận lấy, chịu đựng",
    "strokes": 8,
    "structure": "trên-giữa-dưới",
    "parts": [
      {
        "c": "爫",
        "name": "Bộ Trảo đầu",
        "vi": "bàn tay chộp lấy từ trên",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "冖",
        "name": "Bộ Mịch",
        "vi": "mái che, trùm kín",
        "pos": "giữa",
        "role": "nghĩa"
      },
      {
        "c": "又",
        "name": "Bộ Hựu",
        "vi": "bàn tay phải, lặp lại",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "又",
    "mnemonic": "Bàn tay 爫 từ trên chìa xuống cùng tay 又 bên dưới đón nhận chiếc khăn 冖 một cách cung kính."
  },
  "变": {
    "py": "biàn",
    "hv": "biến",
    "meaning": "biến đổi, thay đổi",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "亦",
        "name": "Chữ Diệc",
        "vi": "cũng là, dưới nách (âm yì)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "又",
        "name": "Bộ Hựu",
        "vi": "bàn tay phải, lặp lại",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "又",
    "mnemonic": "Lời khấn 亦 vừa dứt thì đôi bàn tay 又 đã thoăn thoắt biến đổi mọi thứ khác xưa."
  },
  "口": {
    "py": "kǒu",
    "hv": "khẩu",
    "meaning": "miệng; lượng từ người trong nhà",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "口",
    "mnemonic": "Khung hình vuông vức mở toang gợi hình chiếc miệng đang hé mở để ăn uống và trò chuyện."
  },
  "句": {
    "py": "jù",
    "hv": "cú",
    "meaning": "câu (ngữ pháp)",
    "strokes": 5,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "勹",
        "name": "Bộ Bao",
        "vi": "bao bọc, ôm lấy",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "口",
    "mnemonic": "Miệng 口 cất lên lời nói được gói ghém 勹 cẩn thận trọn vẹn thành một câu văn hay."
  },
  "只": {
    "py": "zhǐ",
    "hv": "chích",
    "meaning": "chỉ (duy nhất); con (lượng từ con vật)",
    "strokes": 5,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "八",
        "name": "Chữ Bát",
        "vi": "tám (8)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "口",
    "mnemonic": "Mở chiếc miệng 口 ra phát ra âm thanh tách đôi tám 八 hướng chỉ còn lại duy nhất một con."
  },
  "叫": {
    "py": "jiào",
    "hv": "khiếu",
    "meaning": "gọi, tên là, kêu",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng cất tiếng gọi",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "丩",
        "name": "Chữ Cưu",
        "vi": "quấn thắt lại (âm jiū -> jiào)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Mở rộng miệng 口 cất tiếng hét 丩 (jiū đọc gần jiào) gọi thật to người bạn phía trước."
  },
  "台": {
    "py": "tái",
    "hv": "đài",
    "meaning": "bục, đài; chiếc (lượng từ máy móc)",
    "strokes": 5,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "厶",
        "name": "Bộ Tư",
        "vi": "riêng tư, bản thân",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "口",
    "mnemonic": "Đứng trên bục đất riêng 厶 mở miệng 口 dõng dạc nói trước khán đài đông nghẹt người."
  },
  "右": {
    "py": "yòu",
    "hv": "hữu",
    "meaning": "bên phải, phía hữu",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "口",
    "mnemonic": "Bàn tay phải vươn ra đưa thức ăn vào chiếc miệng đang há to chờ đợi."
  },
  "号": {
    "py": "hào",
    "hv": "hiệu",
    "meaning": "số hiệu, ngày (trong tháng)",
    "strokes": 5,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "丂",
        "name": "Chữ Khảo",
        "vi": "hơi thở bị cản trở",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Cất miệng 口 hô to tiếng hiệu lệnh theo chiếc còi cong 丂 phát ra mã số tàu."
  },
  "吃": {
    "py": "chī",
    "hv": "ngật",
    "meaning": "ăn",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "cái miệng ăn uống",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "乞",
        "name": "Chữ Khất",
        "vi": "cầu xin (mượn âm qǐ -> chī)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Há to miệng 口 xin 乞 (qǐ đọc gần chī) một mẩu bánh mì nướng để ăn cho đỡ đói lòng."
  },
  "合": {
    "py": "hé",
    "hv": "hợp",
    "meaning": "phù hợp, hợp lại",
    "strokes": 6,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "亼",
        "name": "Bộ Tập",
        "vi": "tập hợp lại ba phía",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "口",
    "mnemonic": "Mọi người 亼 tụ lại một nhà mở miệng 口 bàn bạc thấy rất hòa hợp ý nhau."
  },
  "同": {
    "py": "tóng",
    "hv": "đồng",
    "meaning": "cùng, giống nhau",
    "strokes": 6,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "凡",
        "name": "Chữ Phàm",
        "vi": "cánh buồm, bình thường (âm fán)",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "口",
    "mnemonic": "Mọi người cùng chung sống dưới một mái nhà 凡 mở miệng 口 nói cùng một thứ tiếng."
  },
  "名": {
    "py": "míng",
    "hv": "danh",
    "meaning": "tên, danh tiếng",
    "strokes": 6,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "夕",
        "name": "Bộ Tịch",
        "vi": "trăng chiều tà, hoàng hôn",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "口",
    "mnemonic": "Khi bóng chiều tà 夕 buông xuống phải mở miệng 口 gọi to tên nhau để khỏi lạc."
  },
  "后": {
    "py": "hòu",
    "hv": "hậu",
    "meaning": "sau, phía sau",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "口",
    "mnemonic": "Vị hoàng hậu đứng quay lưng lại phía sau chiếc rèm lụa nhìn đoàn tùy tùng đi qua."
  },
  "向": {
    "py": "xiàng",
    "hv": "hướng",
    "meaning": "hướng về, phía",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "口",
    "mnemonic": "Cửa sổ mở toang trên vách nhà hướng ánh mắt ngắm nhìn về phía chân trời xa xăm."
  },
  "吧": {
    "py": "ba",
    "hv": "ba",
    "meaning": "nhé, đi (trợ từ ngữ khí)",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "巴",
        "name": "Chữ Ba",
        "vi": "con trăn bám chặt, mong mỏi (âm bā)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Mở miệng 口 dỗ dành đứa trẻ bám chặt 巴 lấy mẹ bảo thôi chúng mình đi nhé."
  },
  "听": {
    "py": "tīng",
    "hv": "thính",
    "meaning": "nghe",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "斤",
        "name": "Bộ Cân",
        "vi": "cái rìu đốn cây, đơn vị cân",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "口",
    "mnemonic": "Ghé tai kề miệng 口 nghe tiếng chiếc rìu 斤 bổ củi vang rền trong khu rừng vắng."
  },
  "告": {
    "py": "gào",
    "hv": "cáo",
    "meaning": "bảo, mách",
    "strokes": 7,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "牛",
        "name": "Bộ Ngưu",
        "vi": "con trâu, con bò",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "口",
    "mnemonic": "Miệng 口 cất lời mách bảo chuyện con trâu đực 牛 vừa húc đổ bờ rào quanh vườn rau."
  },
  "吗": {
    "py": "ma",
    "hv": "ma",
    "meaning": "không? (trợ từ nghi vấn)",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "马",
        "name": "Chữ Mã",
        "vi": "con ngựa (âm mǎ)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Mở miệng 口 hỏi con ngựa 马 \"mǎ\": đi không? Thêm 吗 cuối câu là thành câu hỏi có/không."
  },
  "呢": {
    "py": "ne",
    "hv": "ni",
    "meaning": "thì sao, đang (trợ từ)",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "尼",
        "name": "Chữ Ni",
        "vi": "người thân cận, ni cô (âm ní)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Mở miệng 口 hỏi dồn dập cô ni 尼 (ní đọc gần ne) xem mọi người đang làm gì thế."
  },
  "周": {
    "py": "zhōu",
    "hv": "chu",
    "meaning": "tuần; chu vi",
    "strokes": 8,
    "structure": "độc thể",
    "parts": [],
    "radical": "口",
    "mnemonic": "Mảnh ruộng màu mỡ có bốn góc bao bọc xung quanh chu vi suốt một tuần qua."
  },
  "和": {
    "py": "hé",
    "hv": "hòa",
    "meaning": "và, cùng; hòa bình",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "禾",
        "name": "Bộ Hòa",
        "vi": "cây lúa trĩu hạt",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "口",
    "mnemonic": "Miệng 口 được ăn bát cơm thơm dẻo từ bông lúa 禾 chín khiến lòng người hòa nhã bình yên."
  },
  "咖": {
    "py": "kā",
    "hv": "cà",
    "meaning": "cà (trong 咖啡 cà phê)",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "加",
        "name": "Chữ Gia",
        "vi": "thêm vào, gia tăng sức lực (âm jiā)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Mở miệng 口 nếm thử thứ hạt thơm được gia thêm 加 (jiā lái kā) chút đường cho thành tách cà phê."
  },
  "哥": {
    "py": "gē",
    "hv": "ca",
    "meaning": "anh trai",
    "strokes": 10,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "可",
        "name": "Chữ Khả",
        "vi": "cất tiếng ưng thuận, có thể (âm kě)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "可",
        "name": "Chữ Khả",
        "vi": "cất tiếng ưng thuận, có thể (âm kě)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "口",
    "mnemonic": "Người anh trai cất lời hát 可 xong lại tiếp tục cất tiếng 可 thứ hai vang cả xóm."
  },
  "哪": {
    "py": "nǎ",
    "hv": "na",
    "meaning": "nào, đâu",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "那",
        "name": "Chữ Ná",
        "vi": "kia, đó",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Há miệng 口 hỏi dồn dập xem nơi đó 那 (nà lái nǎ) rốt cuộc là chỗ nào."
  },
  "哭": {
    "py": "kū",
    "hv": "khốc",
    "meaning": "khóc",
    "strokes": 10,
    "structure": "độc thể",
    "parts": [],
    "radical": "口",
    "mnemonic": "Hai con mắt đẫm lệ trên khuôn mặt như con chó nhỏ đang tru trét khóc lóc thảm thiết."
  },
  "唱": {
    "py": "chàng",
    "hv": "xướng",
    "meaning": "hát",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "昌",
        "name": "Chữ Xương",
        "vi": "hai mặt trời rực rỡ hưng thịnh (âm chāng)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Mở rộng miệng 口 cất giọng hát vang khúc ca đón ánh nắng ban mai rực rỡ 昌 sáng bừng."
  },
  "商": {
    "py": "shāng",
    "hv": "thương",
    "meaning": "thương mại, buôn bán",
    "strokes": 11,
    "structure": "độc thể",
    "parts": [],
    "radical": "口",
    "mnemonic": "Người lái buôn ngồi dưới mái đình mở túi đếm tiền trong buổi chợ phiên buôn bán sầm uất."
  },
  "啊": {
    "py": "ā",
    "hv": "a",
    "meaning": "a, a ha (thán từ)",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "阿",
        "name": "Chữ A",
        "vi": "khúc đồi cong, tiền tố xưng hô (âm ā)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Há hốc miệng 口 ngạc nhiên nhìn sườn núi cao 阿 (ā) thốt lên một tiếng ngỡ ngàng."
  },
  "啡": {
    "py": "fēi",
    "hv": "phê",
    "meaning": "phê (trong 咖啡 cà phê)",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "非",
        "name": "Bộ Phi",
        "vi": "đôi cánh chim ngược chiều, trái ngược",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Mở miệng 口 nhấp ngụm cà phê thơm lừng xua tan đi cảm giác phi lý 非 (fēi) mệt mỏi."
  },
  "喔": {
    "py": "ō",
    "hv": "ác",
    "meaning": "ồ, ô (thán từ chợt hiểu)",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "屋",
        "name": "Chữ Ốc",
        "vi": "gian nhà, căn phòng",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Tròn miệng 口 kêu thốt lên một tiếng khi vừa bước chân vào gian nhà 屋 (wū gần ō) ấm cúng."
  },
  "喜": {
    "py": "xǐ",
    "hv": "hỉ",
    "meaning": "vui mừng, thích thú",
    "strokes": 12,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "壴",
        "name": "Chữ Chú",
        "vi": "cái trống gỗ trên bệ",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "口",
    "mnemonic": "Tiếng trống họ 壴 gióng lên rộn rã cùng bao miệng 口 cười tươi vui mừng ngày hội làng."
  },
  "喝": {
    "py": "hē",
    "hv": "hát",
    "meaning": "uống",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "cái miệng uống nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "曷",
        "name": "Chữ Hạt",
        "vi": "kêu gào, khát khô (âm hé -> hē)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "口",
    "mnemonic": "Há miệng 口 khao khát 曷 (hé lái hē) dòng nước mát để uống cạn một hơi cho đã khát."
  },
  "四": {
    "py": "sì",
    "hv": "tứ",
    "meaning": "bốn (4)",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "囗",
    "mnemonic": "Khung rèm sổ hé mở để lộ ra hai luồng gió thổi lùa qua bốn phương trời bát ngát."
  },
  "回": {
    "py": "huí",
    "hv": "hồi",
    "meaning": "quay về, trở lại; lần",
    "strokes": 6,
    "structure": "bao quanh",
    "parts": [
      {
        "c": "囗",
        "name": "Bộ Vi",
        "vi": "vây quanh, biên giới vây kín",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "囗",
    "mnemonic": "Khung thành lớn 囗 bao quanh cái miệng nhỏ 口 chỉ lối quay trở về điểm xuất phát ban đầu."
  },
  "园": {
    "py": "yuán",
    "hv": "viên",
    "meaning": "hoa viên, vườn cây",
    "strokes": 7,
    "structure": "bao quanh",
    "parts": [
      {
        "c": "囗",
        "name": "Bộ Vi",
        "vi": "vây quanh, biên giới vây kín",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "元",
        "name": "Chữ Nguyên",
        "vi": "đồng nhân dân tệ, nguồn gốc",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "囗",
    "mnemonic": "Bức tường ranh giới 囗 bao quanh mảnh đất tươi tốt 元 (yuán) trồng đầy hoa trái trong khu vườn."
  },
  "困": {
    "py": "kùn",
    "hv": "khốn",
    "meaning": "mệt mỏi, buồn ngủ",
    "strokes": 7,
    "structure": "bao quanh",
    "parts": [
      {
        "c": "囗",
        "name": "Bộ Vi",
        "vi": "vây quanh, biên giới vây kín",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "囗",
    "mnemonic": "Cây xanh 木 bị nhốt chặt trong bốn bức tường 囗 tù túng khiến người mệt mỏi buồn ngủ."
  },
  "国": {
    "py": "guó",
    "hv": "quốc",
    "meaning": "quốc gia, đất nước",
    "strokes": 8,
    "structure": "bao quanh",
    "parts": [
      {
        "c": "囗",
        "name": "Bộ Vi",
        "vi": "tường thành vây quanh biên giới",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "玉",
        "name": "Bộ Ngọc",
        "vi": "viên ngọc quý, báu vật",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "囗",
    "mnemonic": "Bốn bức tường thành 囗 kiên cố che chở cho viên ngọc quý 玉 của cả quốc gia non sông."
  },
  "图": {
    "py": "tú",
    "hv": "đồ",
    "meaning": "bản đồ, hình vẽ, bức tranh",
    "strokes": 8,
    "structure": "bao quanh",
    "parts": [
      {
        "c": "囗",
        "name": "Bộ Vi",
        "vi": "vây quanh, biên giới vây kín",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "冬",
        "name": "Chữ Đông",
        "vi": "mùa đông",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "囗",
    "mnemonic": "Khung tranh 囗 đóng khung cảnh tuyết rơi mùa đông 冬 tạo nên một bức tranh phong cảnh tuyệt đẹp."
  },
  "土": {
    "py": "tǔ",
    "hv": "thổ",
    "meaning": "đất đai, thổ nhưỡng",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "土",
    "mnemonic": "Cây mầm nhỏ nhú lên từ lòng đất mẹ màu mỡ nuôi dưỡng muôn loài sinh sôi nảy nở."
  },
  "在": {
    "py": "zài",
    "hv": "tại",
    "meaning": "ở, tại, đang",
    "strokes": 6,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "才",
        "name": "Chữ Tài",
        "vi": "mới; tài năng",
        "pos": "ngoài",
        "role": "âm"
      },
      {
        "c": "土",
        "name": "Bộ Thổ",
        "vi": "đất đai, thổ nhưỡng",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "土",
    "mnemonic": "Người thợ vừa có tài 才 đứng chân vững trên mảnh đất 土 xác nhận mình đang ở đây."
  },
  "地": {
    "py": "dì",
    "hv": "địa",
    "meaning": "đất đai; trợ từ chỉ trạng thái",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "土",
        "name": "Bộ Thổ",
        "vi": "đất đai, thổ nhưỡng",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "也",
        "name": "Chữ Dã",
        "vi": "cũng, cũng vậy",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "土",
    "mnemonic": "Mảnh đất cát 土 màu mỡ ấy cũng là 也 (yě gần dì) nơi sản sinh ra muôn vàn hoa trái."
  },
  "场": {
    "py": "cháng",
    "hv": "trường",
    "meaning": "sân bãi, quảng trường",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "土",
        "name": "Bộ Thổ",
        "vi": "đất đai, thổ nhưỡng",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "勿",
        "name": "Chữ Vật",
        "vi": "lá cờ bay phất phới; chớ, đừng (âm wù)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "土",
    "mnemonic": "Khoảng đất bằng phẳng 土 quét sạch không sót chút rác 勿 biến thành một sân bóng rộng rãi."
  },
  "坐": {
    "py": "zuò",
    "hv": "tọa",
    "meaning": "ngồi; đi (xe buýt, tàu)",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "从",
        "name": "Chữ Tòng",
        "vi": "từ (nơi chốn), theo sau",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "土",
        "name": "Bộ Thổ",
        "vi": "đất đai, thổ nhưỡng",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "土",
    "mnemonic": "Hai người 从 cùng ngồi bệt xuống nền đất 土 mát rượi nghỉ chân sau chặng đường dài mệt nhoài."
  },
  "块": {
    "py": "kuài",
    "hv": "khối",
    "meaning": "đồng (tiền tệ); cục, miếng",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "土",
        "name": "Bộ Thổ",
        "vi": "đất đai, thổ nhưỡng",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "夬",
        "name": "Chữ Quái",
        "vi": "dứt khoát, quyết định",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "土",
    "mnemonic": "Đắp đất 土 đắp đê ngăn dòng nước vỡ bờ 夬 thành từng cục từng khối đất vững chãi."
  },
  "堂": {
    "py": "táng",
    "hv": "đường",
    "meaning": "hội trường, gian phòng lớn",
    "strokes": 11,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "尚",
        "name": "Chữ Thượng",
        "vi": "coi trọng, hướng lên trên (âm shàng)",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "土",
        "name": "Bộ Thổ",
        "vi": "đất đai, thổ nhưỡng",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "土",
    "mnemonic": "Ngôi nhà tôn quý 尚 xây vững trên nền đất cao 土 tạo thành một đại sảnh hội trường uy nghiêm."
  },
  "士": {
    "py": "shì",
    "hv": "sĩ",
    "meaning": "kẻ sĩ, người tài",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "士",
    "mnemonic": "Người trượng phu có đôi vai ngang rộng hơn hông đứng thẳng hiên ngang làm kẻ sĩ trung kiên."
  },
  "处": {
    "py": "chù",
    "hv": "xứ",
    "meaning": "nơi chốn, địa điểm",
    "strokes": 5,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "夂",
        "name": "Bộ Trĩ",
        "vi": "bước đi chậm phía sau",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "卜",
        "name": "Bộ Bốc",
        "vi": "xem bói, vết nứt mu rùa",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "夂",
    "mnemonic": "Dừng chân 夂 xem quẻ bói 卜 chỉ đường để tìm ra một nơi chốn dừng chân bình yên thích hợp."
  },
  "备": {
    "py": "bèi",
    "hv": "bị",
    "meaning": "chuẩn bị, trang bị",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "夂",
        "name": "Bộ Trĩ",
        "vi": "bước đi chậm phía sau",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "田",
        "name": "Bộ Điền",
        "vi": "ruộng đồng, đất canh tác",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "夂",
    "mnemonic": "Bước chân 夂 ra đồng ruộng 田 từ sớm tinh sương để chuẩn bị chu đáo cho vụ mùa mới."
  },
  "夏": {
    "py": "xià",
    "hv": "hạ",
    "meaning": "mùa hè",
    "strokes": 10,
    "structure": "trên-giữa-dưới",
    "parts": [
      {
        "c": "一",
        "name": "Chữ Nhất",
        "vi": "một (1)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "自",
        "name": "Chữ Tự",
        "vi": "tự mình, từ đâu đến",
        "pos": "giữa",
        "role": "nghĩa"
      },
      {
        "c": "夂",
        "name": "Bộ Trĩ",
        "vi": "bước đi chậm phía sau",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "夊",
    "mnemonic": "Đội nón 一 lau mồ hôi trên mũi 自 rồi rảo bước chân 夂 dạo chơi đón mùa hè rực nắng."
  },
  "外": {
    "py": "wài",
    "hv": "ngoại",
    "meaning": "bên ngoài, ngoài ra",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "夕",
        "name": "Bộ Tịch",
        "vi": "trăng chiều tà, hoàng hôn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "卜",
        "name": "Bộ Bốc",
        "vi": "xem bói, vết nứt mu rùa",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "夕",
    "mnemonic": "Đợi lúc hoàng hôn 夕 tắt nắng mới mang quẻ bói 卜 ra bên ngoài trời để gieo quẻ."
  },
  "多": {
    "py": "duō",
    "hv": "đa",
    "meaning": "nhiều, bao nhiêu",
    "strokes": 6,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "夕",
        "name": "Bộ Tịch",
        "vi": "trăng chiều tà, hoàng hôn",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "夕",
        "name": "Bộ Tịch",
        "vi": "trăng chiều tà, hoàng hôn",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "夕",
    "mnemonic": "Từng mảnh thịt khô 夕 xếp chồng lên mảnh thịt 夕 khác tạo thành số lượng thật là nhiều."
  },
  "夜": {
    "py": "yè",
    "hv": "dạ",
    "meaning": "đêm, ban đêm",
    "strokes": 8,
    "structure": "độc thể",
    "parts": [],
    "radical": "夕",
    "mnemonic": "Màn đêm buông xuống trùm bóng tối lên vạn vật trong khi mọi người chìm sâu vào giấc ngủ."
  },
  "大": {
    "py": "dà",
    "hv": "đại",
    "meaning": "to, lớn",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "大",
    "mnemonic": "Người dang rộng đôi tay và sải hai chân ra hết cỡ trông vô cùng to lớn vĩ đại."
  },
  "天": {
    "py": "tiān",
    "hv": "thiên",
    "meaning": "ngày; bầu trời",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "大",
    "mnemonic": "Đỉnh đầu con người dang tay vươn tới tận khoảng không bao la vô tận của bầu trời xanh."
  },
  "太": {
    "py": "tài",
    "hv": "thái",
    "meaning": "quá, rất",
    "strokes": 4,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "大",
        "name": "Bộ Đại",
        "vi": "người giang tay to lớn",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "丶",
        "name": "Bộ Chủ",
        "vi": "nét chấm",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "大",
    "mnemonic": "Người to lớn 大 kẹp thêm một viên đá quý 丶 dưới chân vì quá nặng nề không nhấc nổi."
  },
  "女": {
    "py": "nǚ",
    "hv": "nữ",
    "meaning": "phụ nữ, con gái",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "女",
    "mnemonic": "Người phụ nữ ngồi quỳ gối duyên dáng chắp tay khép nép giữ trọn vẻ dịu dàng nết na."
  },
  "奶": {
    "py": "nǎi",
    "hv": "nãi",
    "meaning": "sữa; bà nội",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "女",
        "name": "Bộ Nữ",
        "vi": "phụ nữ, con gái",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "乃",
        "name": "Chữ Nãi",
        "vi": "bèn là, mới là",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "女",
    "mnemonic": "Người phụ nữ 女 ôm đứa cháu nhỏ vào lòng cho bú dòng sữa ngọt ngào của bà nội 乃 (nǎi)."
  },
  "她": {
    "py": "tā",
    "hv": "tha",
    "meaning": "cô ấy, bà ấy (ngôi 3 nữ)",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "女",
        "name": "Bộ Nữ",
        "vi": "người phụ nữ, phái nữ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "也",
        "name": "Chữ Dã",
        "vi": "cũng là (mượn âm yě -> tā)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "女",
    "mnemonic": "Người con gái 女 ấy cũng là 也 (yě gần tā) một cô bạn học chung lớp thuở ấu thơ."
  },
  "好": {
    "py": "hǎo",
    "hv": "hảo",
    "meaning": "tốt, đẹp, khỏe",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "女",
        "name": "Bộ Nữ",
        "vi": "phụ nữ, con gái",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "子",
        "name": "Bộ Tử",
        "vi": "đứa trẻ, con cái",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "女",
    "mnemonic": "Cô bé gái 女 nâng niu bế đứa em nhỏ 子 nở nụ cười thật tươi tắn và tốt đẹp."
  },
  "妈": {
    "py": "mā",
    "hv": "ma",
    "meaning": "mẹ, má",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "女",
        "name": "Bộ Nữ",
        "vi": "người phụ nữ, người mẹ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "马",
        "name": "Chữ Mã",
        "vi": "con ngựa (đọc mǎ mang âm cho mā)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "女",
    "mnemonic": "Người phụ nữ 女 tần tảo làm việc quần quật như chú ngựa 马 (mǎ lái mā) chính là mẹ."
  },
  "妹": {
    "py": "mèi",
    "hv": "muội",
    "meaning": "em gái",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "女",
        "name": "Bộ Nữ",
        "vi": "phụ nữ, con gái",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "未",
        "name": "Chữ Vị",
        "vi": "cây cối sum sê cành ngọn, vị lai (âm wèi)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "女",
    "mnemonic": "Người con gái 女 sinh ra khi cành cây còn non chưa 未 lớn hết chính là em gái nhỏ."
  },
  "始": {
    "py": "shǐ",
    "hv": "thủy",
    "meaning": "bắt đầu, khởi đầu",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "女",
        "name": "Bộ Nữ",
        "vi": "phụ nữ, con gái",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "台",
        "name": "Chữ Đài",
        "vi": "bục, đài; chiếc (lượng từ máy móc)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "女",
    "mnemonic": "Người phụ nữ 女 vừa bước lên bục đài 台 (tái gần shǐ) cất tiếng chào bắt đầu buổi lễ."
  },
  "姐": {
    "py": "jiě",
    "hv": "thư",
    "meaning": "chị gái",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "女",
        "name": "Bộ Nữ",
        "vi": "phụ nữ, con gái",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "且",
        "name": "Chữ Thả",
        "vi": "hơn nữa, còn (âm qiě)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "女",
    "mnemonic": "Người phụ nữ 女 đứng bên giá đựng đồ 且 (qiě lái jiě) chuẩn bị cơm nước chính là chị gái."
  },
  "姓": {
    "py": "xìng",
    "hv": "tính",
    "meaning": "họ (trong họ tên)",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "女",
        "name": "Bộ Nữ",
        "vi": "phụ nữ, con gái",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "生",
        "name": "Bộ Sinh",
        "vi": "chồi non mọc lên từ đất, sinh sôi",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "女",
    "mnemonic": "Người phụ nữ 女 sinh đẻ 生 ra đứa trẻ mang theo dòng họ truyền đời từ tổ tiên xa xưa."
  },
  "婆": {
    "py": "pó",
    "hv": "bà",
    "meaning": "bà ngoại, bà lão",
    "strokes": 11,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "波",
        "name": "Chữ Ba",
        "vi": "sóng nước nhấp nhô (âm bō)",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "女",
        "name": "Bộ Nữ",
        "vi": "phụ nữ, con gái",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "女",
    "mnemonic": "Người phụ nữ 女 tóc bạc phơ đón từng đợt sóng biển 波 dạt dào chính là người bà ngoại hiền từ."
  },
  "子": {
    "py": "zi",
    "hv": "tử",
    "meaning": "con, đứa trẻ; hậu tố danh từ",
    "strokes": 3,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "了",
        "name": "Chữ Liễu",
        "vi": "rồi (trợ từ ngữ khí)",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "一",
        "name": "Chữ Nhất",
        "vi": "một (1)",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "子",
    "mnemonic": "Em bé quấn tã 了 vươn hai cánh tay ngang 一 cất tiếng cười bi bô gọi mẹ ơi."
  },
  "字": {
    "py": "zì",
    "hv": "tự",
    "meaning": "chữ viết, chữ Hán",
    "strokes": 6,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "宀",
        "name": "Bộ Miên",
        "vi": "mái nhà, che chở",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "子",
        "name": "Bộ Tử",
        "vi": "đứa trẻ, con cái",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "子",
    "mnemonic": "Dưới mái nhà 宀 ấm cúng cậu bé con 子 đang nắn nót viết từng chữ Hán thẳng hàng."
  },
  "学": {
    "py": "xué",
    "hv": "học",
    "meaning": "học tập, nghiên cứu",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "⺍",
        "name": "Bộ Hào biến thể",
        "vi": "tri thức, học hỏi rèn luyện",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "冖",
        "name": "Bộ Mịch",
        "vi": "mái nhà, trường học",
        "pos": "giữa",
        "role": "hình"
      },
      {
        "c": "子",
        "name": "Bộ Tử",
        "vi": "con trẻ, học trò",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "子",
    "mnemonic": "Đứa trẻ 子 ngồi dưới mái hiên 冖 chăm chỉ tiếp thu tri thức ⺍ từ thầy giáo để học tập."
  },
  "孩": {
    "py": "hái",
    "hv": "hài",
    "meaning": "đứa trẻ, con cái",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "子",
        "name": "Bộ Tử",
        "vi": "đứa trẻ, con cái",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "亥",
        "name": "Chữ Hợi",
        "vi": "chi Hợi, con lợn (âm hài)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "子",
    "mnemonic": "Đứa con nít 子 nghịch ngợm chạy nhảy bên chuồng lợn 亥 (hài) cười đùa rộn rã cả xóm."
  },
  "宜": {
    "py": "yi",
    "hv": "nghi",
    "meaning": "thích hợp, thuận nghi",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "宀",
        "name": "Bộ Miên",
        "vi": "mái nhà, che chở",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "且",
        "name": "Chữ Thả",
        "vi": "hơn nữa, còn (âm qiě)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "宀",
    "mnemonic": "Dưới mái nhà 宀 gia đình đặt mâm cỗ cúng 且 tươm tất vô cùng thích hợp và trang nghiêm."
  },
  "宝": {
    "py": "bǎo",
    "hv": "bảo",
    "meaning": "bảo bối, bảo vật",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "宀",
        "name": "Bộ Miên",
        "vi": "mái nhà, che chở",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "玉",
        "name": "Bộ Ngọc",
        "vi": "ngọc ngà quý giá",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "宀",
    "mnemonic": "Dưới mái nhà 宀 kín cổng cao tường cất giấu khối ngọc bích 玉 quý giá làm bảo vật gia truyền."
  },
  "客": {
    "py": "kè",
    "hv": "khách",
    "meaning": "khách, khách sáo",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "宀",
        "name": "Bộ Miên",
        "vi": "mái nhà, che chở",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "各",
        "name": "Chữ Các",
        "vi": "chân bước đến miệng nói, mỗi người (âm gè)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "宀",
    "mnemonic": "Dưới mái nhà 宀 đón từng người Các 各 (gè gần kè) phương xa ghé thăm làm vị khách quý."
  },
  "室": {
    "py": "shì",
    "hv": "thất",
    "meaning": "căn phòng, buồng",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "宀",
        "name": "Bộ Miên",
        "vi": "mái nhà, che chở",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "至",
        "name": "Bộ Chí",
        "vi": "mũi tên rơi xuống đất, đến nơi",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "宀",
    "mnemonic": "Bước chân vừa tới 至 dưới mái nhà 宀 ấm cúng đã bước thẳng vào căn phòng nghỉ ngơi."
  },
  "家": {
    "py": "jiā",
    "hv": "gia",
    "meaning": "nhà, gia đình; chuyên gia",
    "strokes": 10,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "宀",
        "name": "Bộ Miên",
        "vi": "mái nhà che chở mưa nắng",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "豕",
        "name": "Bộ Thỉ",
        "vi": "con lợn nuôi giữ trong chuồng",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "宀",
    "mnemonic": "Dưới mái nhà 宀 có nuôi một chú lợn béo 豕 tạo nên khung cảnh gia đình no ấm sung túc."
  },
  "宿": {
    "py": "sù",
    "hv": "túc",
    "meaning": "ngủ trọ, ký túc xá",
    "strokes": 11,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "宀",
        "name": "Bộ Miên",
        "vi": "mái nhà, che chở",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "佰",
        "name": "Chữ Bách",
        "vi": "trưởng trăm người, trăm",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "宀",
    "mnemonic": "Dưới mái nhà 宀 có hàng trăm 佰 người cùng quây quần ngủ trọ qua đêm trong ký túc xá."
  },
  "对": {
    "py": "duì",
    "hv": "đối",
    "meaning": "đúng; đối với; đôi/cặp",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "又",
        "name": "Bộ Hựu",
        "vi": "bàn tay phải, lặp lại",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "寸",
        "name": "Bộ Thốn",
        "vi": "tấc, đo lường khoảng cách ngắn",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "寸",
    "mnemonic": "Đôi bàn tay 又 đo chính xác từng tấc 寸 thước vải để đối chiếu xem có đúng khớp nhau."
  },
  "小": {
    "py": "xiǎo",
    "hv": "tiểu",
    "meaning": "nhỏ, bé",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "小",
    "mnemonic": "Một nét sổ cắt đôi hai nét phẩy hai bên chia thành những mẩu vụn li ti nhỏ bé."
  },
  "少": {
    "py": "shǎo",
    "hv": "thiểu",
    "meaning": "ít, thiếu; thiếu niên",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "小",
    "mnemonic": "Nét phẩy gạt đi một chút làm số lượng vốn đã nhỏ nay còn ít ỏi thiếu thốn hơn."
  },
  "尝": {
    "py": "cháng",
    "hv": "thường",
    "meaning": "nếm thử, từng trải",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "尚",
        "name": "Chữ Thượng",
        "vi": "coi trọng, hướng lên trên (âm shàng)",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "云",
        "name": "Chữ Vân",
        "vi": "mây trời bồng bềnh (âm yún)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "⺌",
    "mnemonic": "Dưới đài cao 尚 làn khói mây 云 bốc lên nghi ngút đưa thức ăn lên miệng nếm thử một miếng."
  },
  "就": {
    "py": "jiù",
    "hv": "tựu",
    "meaning": "thì, liền, ngay",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "京",
        "name": "Chữ Kinh",
        "vi": "kinh đô, thủ đô",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "尤",
        "name": "Chữ Vưu",
        "vi": "khuyết tật đặc biệt, họ Vưu (âm yóu)",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "尢",
    "mnemonic": "Đến tận kinh đô 京 gặp người tài đặc biệt 尤 (yóu gần jiù) là việc liền được giải quyết xong ngay."
  },
  "层": {
    "py": "céng",
    "hv": "tằng",
    "meaning": "tầng (nhà), lớp",
    "strokes": 7,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "尸",
        "name": "Bộ Thi",
        "vi": "thi thể; người ngồi cong lưng",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "云",
        "name": "Chữ Vân",
        "vi": "mây trời bồng bềnh (âm yún)",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "尸",
    "mnemonic": "Thân người 尸 leo lên từng bậc thang cao chạm tới tận tầng mây 云 bồng bềnh giữa trời."
  },
  "屋": {
    "py": "wū",
    "hv": "ốc",
    "meaning": "gian nhà, căn phòng",
    "strokes": 9,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "尸",
        "name": "Bộ Thi",
        "vi": "thi thể; người ngồi cong lưng",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "至",
        "name": "Bộ Chí",
        "vi": "mũi tên rơi xuống đất, đến nơi",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "尸",
    "mnemonic": "Đặt chân bước tới 至 che dưới mái rơm 尸 để dựng nên một gian nhà che nắng che mưa."
  },
  "山": {
    "py": "shān",
    "hv": "sơn",
    "meaning": "núi, ngọn núi",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "山",
    "mnemonic": "Ba ngọn núi nhọn hoắt sừng sững vươn cao trùng điệp giữa đất trời bao la hùng vĩ."
  },
  "岁": {
    "py": "suì",
    "hv": "tuế",
    "meaning": "tuổi (tuổi tác)",
    "strokes": 6,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "山",
        "name": "Bộ Sơn",
        "vi": "núi non, đồi núi",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "夕",
        "name": "Bộ Tịch",
        "vi": "trăng chiều tà, hoàng hôn",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "山",
    "mnemonic": "Đứng trên đỉnh núi 山 ngắm nhìn ánh chiều tà 夕 trôi qua ghi dấu thêm một tuổi đời từng trải."
  },
  "工": {
    "py": "gōng",
    "hv": "công",
    "meaning": "công việc, công nhân",
    "strokes": 3,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "一",
        "name": "Chữ Nhất",
        "vi": "một (1)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "丄",
        "name": "Chữ Thượng cổ",
        "vi": "ở trên, phía trên",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "工",
    "mnemonic": "Hai vạch ngang 一 trên dưới nối nhau bằng thanh đứng 丄 tạo nên thước đo của người công nhân."
  },
  "左": {
    "py": "zuǒ",
    "hv": "tả",
    "meaning": "bên trái, phía tả",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "工",
    "mnemonic": "Bàn tay trái vươn ra cầm chiếc thước thợ hỗ trợ đắc lực cho công việc mộc tỉ mỉ."
  },
  "差": {
    "py": "chà",
    "hv": "sai",
    "meaning": "kém, sai biệt; công tác",
    "strokes": 9,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "羊",
        "name": "Bộ Dương",
        "vi": "con cừu, con dê có sừng",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "工",
        "name": "Bộ Công",
        "vi": "công cụ, việc làm thợ",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "工",
    "mnemonic": "Đàn cừu 羊 lông xù làm công việc 工 lóng ngóng tạo nên khoảng cách sai lệch kém cỏi quá xa."
  },
  "己": {
    "py": "jǐ",
    "hv": "kỷ",
    "meaning": "bản thân mình",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "己",
    "mnemonic": "Dải lụa mềm uốn lượn uốn khúc tự buộc quanh người để tự bảo vệ chính bản thân mình."
  },
  "已": {
    "py": "yǐ",
    "hv": "dĩ",
    "meaning": "đã, kết thúc",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "己",
    "mnemonic": "Chiếc móc đã khép miệng lại phân nửa đánh dấu mọi chuyện cũ đã trôi qua kết thúc rồi."
  },
  "市": {
    "py": "shì",
    "hv": "thị",
    "meaning": "thành phố, chợ",
    "strokes": 5,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "亠",
        "name": "Bộ Đầu",
        "vi": "phần trên cùng, nắp che",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "巾",
        "name": "Bộ Cân",
        "vi": "khăn vải, đồ dệt",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "巾",
    "mnemonic": "Đầu phố 亠 tấp nập người qua lại căng tấm vải 巾 bạt dựng sạp chợ mua bán thành phố."
  },
  "师": {
    "py": "shī",
    "hv": "sư",
    "meaning": "thầy giáo, sư phụ",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "刂",
        "name": "Bộ Đao đứng",
        "vi": "con dao, nhát cắt",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "帀",
        "name": "Chữ Táp",
        "vi": "vòng quanh trọn vẹn",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "巾",
    "mnemonic": "Cầm dao sắc 刂 cắt xấp vải cuộn 帀 may trang phục chỉnh tề cho người thầy giáo kính yêu."
  },
  "希": {
    "py": "xī",
    "hv": "hy",
    "meaning": "hy vọng, mong mỏi",
    "strokes": 7,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "乂",
        "name": "Nét chéo",
        "vi": "hai nét đan chéo nhau",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "布",
        "name": "Chữ Bố",
        "vi": "tay cầm vải dệt trải ra (âm bù)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "巾",
    "mnemonic": "Đan chéo 乂 từng sợi chỉ dệt nên tấm vải 布 thêu bao niềm ước mơ hy vọng tốt lành."
  },
  "带": {
    "py": "dài",
    "hv": "đới",
    "meaning": "mang theo; dây thắt lưng",
    "strokes": 9,
    "structure": "độc thể",
    "parts": [],
    "radical": "巾",
    "mnemonic": "Chiếc thắt lưng dài thêu hoa văn tinh xảo quấn quanh eo để mang theo bên mình túi ngọc quý."
  },
  "常": {
    "py": "cháng",
    "hv": "thường",
    "meaning": "thường xuyên, bình thường",
    "strokes": 11,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "尚",
        "name": "Chữ Thượng",
        "vi": "coi trọng, hướng lên trên (âm shàng)",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "巾",
        "name": "Bộ Cân",
        "vi": "khăn vải, đồ dệt",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "巾",
    "mnemonic": "Treo tấm khăn vải 巾 lên đài cao 尚 mỗi buổi sáng như một thói quen thường xuyên lặp lại."
  },
  "干": {
    "py": "gān",
    "hv": "can",
    "meaning": "làm (việc); khô ráo",
    "strokes": 3,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "一",
        "name": "Chữ Nhất",
        "vi": "một (1)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "十",
        "name": "Bộ Thập",
        "vi": "số mười, trọn vẹn mười phương",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "十",
    "mnemonic": "Chiếc cào cán thẳng 一 cắm xuống đất mười 十 lần cày xới cho đất đai ráo khô phơi nắng."
  },
  "平": {
    "py": "píng",
    "hv": "bình",
    "meaning": "bằng phẳng, bình yên",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "广",
    "mnemonic": "Mặt nước phẳng lặng có hai chiếc lá nổi cân bằng tuyệt đối hai bên tạo cảnh bình yên."
  },
  "年": {
    "py": "nián",
    "hv": "niên",
    "meaning": "năm (thời gian)",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "干",
    "mnemonic": "Bó lúa gặt xong buộc thành gánh đem về nhà ăn mừng mùa màng trọn vẹn suốt một năm qua."
  },
  "床": {
    "py": "chuáng",
    "hv": "sàng",
    "meaning": "cái giường",
    "strokes": 7,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "广",
        "name": "Bộ Quảng",
        "vi": "mái hiên, rộng lớn",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "广",
    "mnemonic": "Dưới mái hiên rộng 广 kê chiếc phản bằng gỗ 木 chắc chắn làm chiếc giường êm ái ngả lưng."
  },
  "店": {
    "py": "diàn",
    "hv": "điếm",
    "meaning": "cửa hàng, tiệm",
    "strokes": 8,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "广",
        "name": "Bộ Quảng",
        "vi": "mái hiên, rộng lớn",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "占",
        "name": "Chữ Chiêm",
        "vi": "bói toán mu rùa; chiếm giữ (âm zhān)",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "广",
    "mnemonic": "Dưới mái nhà 广 thầy bói chiếm 占 (zhān đọc gần diàn) một góc mở cửa hàng bốc quẻ xem vận."
  },
  "度": {
    "py": "dù",
    "hv": "độ",
    "meaning": "nhiệt độ, mức độ",
    "strokes": 9,
    "structure": "độc thể",
    "parts": [],
    "radical": "广",
    "mnemonic": "Thước đo cầm trên tay vạch từng vạch rõ ràng xác định mức độ nhiệt nóng lạnh của thời tiết."
  },
  "开": {
    "py": "kāi",
    "hv": "khai",
    "meaning": "mở, bắt đầu, lái (xe)",
    "strokes": 4,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "一",
        "name": "Chữ Nhất",
        "vi": "một (1)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "廾",
        "name": "Bộ Củng",
        "vi": "hai tay cùng nâng lên",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "廾",
    "mnemonic": "Dùng hai tay 廾 gạt bỏ thanh then cài 一 ngang cửa để mở toang lối đi thênh thang."
  },
  "弟": {
    "py": "dì",
    "hv": "đệ",
    "meaning": "em trai",
    "strokes": 7,
    "structure": "độc thể",
    "parts": [],
    "radical": "弓",
    "mnemonic": "Sợi dây da mềm quấn quanh cây gậy tre của cậu em trai nhỏ đang mải mê nô đùa."
  },
  "张": {
    "py": "zhāng",
    "hv": "trương",
    "meaning": "tờ, bức (lượng từ); họ Trương",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "弓",
        "name": "Bộ Cung",
        "vi": "cây cung bắn tên",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "长",
        "name": "Chữ Trường",
        "vi": "dài; lớn lên, trưởng thành",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "弓",
    "mnemonic": "Giương cây cung 弓 căng hết cỡ rồi kéo dài 长 dải lụa ra đếm từng tờ tranh giấy."
  },
  "影": {
    "py": "yǐng",
    "hv": "ảnh",
    "meaning": "bóng, hình ảnh, điện ảnh",
    "strokes": 15,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "景",
        "name": "Chữ Cảnh",
        "vi": "mặt trời soi sáng kinh đô phong cảnh (âm jǐng)",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "彡",
        "name": "Bộ Sam",
        "vi": "lông tóc mượt, hoa văn đẹp",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "彡",
    "mnemonic": "Cảnh sắc 景 đẹp đẽ dưới ánh nắng in ba vệt sáng 彡 huyền ảo tạo nên bóng hình nghệ thuật."
  },
  "往": {
    "py": "wǎng",
    "hv": "vãng",
    "meaning": "đi tới, hướng về phía",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "彳",
        "name": "Bộ Xích",
        "vi": "bước đi, di chuyển",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "主",
        "name": "Chữ Chủ",
        "vi": "chủ nhân (mượn âm zhǔ -> wǎng)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "彳",
    "mnemonic": "Bước chân 彳 rảo bước hướng về phía dinh thự của gia chủ 主 (zhǔ gần wǎng) để dự tiệc."
  },
  "很": {
    "py": "hěn",
    "hv": "hẩn",
    "meaning": "rất, vô cùng",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "彳",
        "name": "Bộ Xích",
        "vi": "bước chân ngắn, đi lại",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "艮",
        "name": "Bộ Cấn",
        "vi": "ngoảnh lại nhìn trừng trừng",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "彳",
    "mnemonic": "Rảo bước chân 彳 thật nhanh nhưng mắt vẫn ngoái nhìn 艮 (gèn lái sang hěn) vẻ rất vội vã."
  },
  "得": {
    "py": "de",
    "hv": "đắc",
    "meaning": "được, đạt được; trợ từ",
    "strokes": 11,
    "structure": "độc thể",
    "parts": [],
    "radical": "彳",
    "mnemonic": "Bước chân đi trên đường nhặt được vỏ ốc quý báu mừng rỡ vì đạt được món quà bất ngờ."
  },
  "微": {
    "py": "wēi",
    "hv": "Vi",
    "meaning": "nhỏ bé, vi mô",
    "strokes": 13,
    "structure": "độc thể",
    "parts": [],
    "radical": "彳",
    "mnemonic": "Người tỉ mỉ cầm kính soi từng chi tiết nhỏ bé li ti không thể nhìn rõ bằng mắt thường."
  },
  "心": {
    "py": "xīn",
    "hv": "tâm",
    "meaning": "trái tim, tấm lòng",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "心",
    "mnemonic": "Trái tim đỏ thắm có ba cuống mạch máu đập rộn ràng chan chứa tình yêu thương ấm áp sâu lắng."
  },
  "快": {
    "py": "kuài",
    "hv": "khoái",
    "meaning": "nhanh, mau chóng",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "忄",
        "name": "Bộ Tâm đứng",
        "vi": "tâm tư, cảm xúc trong lòng",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "夬",
        "name": "Chữ Quái",
        "vi": "dứt khoát, quyết định",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "忄",
    "mnemonic": "Con tim 忄 đập dồn dập khi quyết định dứt khoát 夬 (guài gần kuài) hành động thật mau chóng."
  },
  "怎": {
    "py": "zěn",
    "hv": "chẩm",
    "meaning": "thế nào, sao",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "乍",
        "name": "Chữ Sạ",
        "vi": "chợt, vừa mới",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "心",
        "name": "Bộ Tâm",
        "vi": "trái tim, tấm lòng, suy nghĩ",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "心",
    "mnemonic": "Vừa mới 乍 bắt đầu thì trong lòng 心 đã nảy sinh thắc mắc tại sao lại thế nào vậy."
  },
  "怕": {
    "py": "pà",
    "hv": "phạ",
    "meaning": "sợ hãi, lo lắng",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "忄",
        "name": "Bộ Tâm đứng",
        "vi": "tâm tư, cảm xúc trong lòng",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "白",
        "name": "Bộ Bạch",
        "vi": "màu trắng, sáng rõ",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "忄",
    "mnemonic": "Trong lòng 忄 lo âu bồn chồn khiến khuôn mặt biến sắc trắng bệch 白 vì sợ hãi tột cùng."
  },
  "息": {
    "py": "xī",
    "hv": "tức",
    "meaning": "nghỉ ngơi, tin tức",
    "strokes": 10,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "自",
        "name": "Chữ Tự",
        "vi": "tự mình, từ đâu đến",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "心",
        "name": "Bộ Tâm",
        "vi": "trái tim, tấm lòng, suy nghĩ",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "心",
    "mnemonic": "Hít thở luồng không khí qua mũi 自 sâu vào tận đáy lòng 心 để nghỉ ngơi tĩnh dưỡng tâm hồn."
  },
  "您": {
    "py": "ní",
    "hv": "nẫm",
    "meaning": "ngài, ông (ngôi 2 tôn kính)",
    "strokes": 11,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "你",
        "name": "Chữ Nhĩ",
        "vi": "bạn, anh, chị (ngôi 2)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "心",
        "name": "Bộ Tâm",
        "vi": "trái tim, tấm lòng, suy nghĩ",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "心",
    "mnemonic": "Đặt người bạn 你 tôn kính lên trên hết trong tận đáy lòng 心 mình xưng hô là ngài."
  },
  "情": {
    "py": "qíng",
    "hv": "tình",
    "meaning": "tình cảm, tình hình",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "忄",
        "name": "Bộ Tâm đứng",
        "vi": "tâm tư, cảm xúc trong lòng",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "青",
        "name": "Bộ Thanh",
        "vi": "màu xanh non của chồi cây",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "忄",
    "mnemonic": "Tấm lòng 忄 trong sáng xanh biếc như mầm non 青 tạo nên sợi dây tình cảm gắn bó thiết tha."
  },
  "惠": {
    "py": "huì",
    "hv": "huệ",
    "meaning": "ân huệ, ưu đãi",
    "strokes": 12,
    "structure": "độc thể",
    "parts": [],
    "radical": "心",
    "mnemonic": "Tấm lòng rộng lượng ban phát thóc gạo cứu đói cho dân nghèo nhận được ân huệ to lớn."
  },
  "想": {
    "py": "xiǎng",
    "hv": "tưởng",
    "meaning": "nghĩ, nhớ, muốn",
    "strokes": 13,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "相",
        "name": "Chữ Tương",
        "vi": "quan sát, tương hỗ (âm xiāng -> xiǎng)",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "心",
        "name": "Bộ Tâm",
        "vi": "trái tim, tâm tư suy nghĩ",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "心",
    "mnemonic": "Hướng ánh mắt nhìn ngắm 相 người thương rồi khắc sâu vào đáy lòng 心 để ngày đêm tưởng nhớ."
  },
  "意": {
    "py": "yì",
    "hv": "ý",
    "meaning": "ý nghĩa, ý nghĩ",
    "strokes": 13,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "音",
        "name": "Bộ Âm",
        "vi": "âm thanh vang lên từ miệng",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "心",
        "name": "Bộ Tâm",
        "vi": "trái tim, tấm lòng, suy nghĩ",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "心",
    "mnemonic": "Tiếng lòng 音 cất lên hòa cùng cảm xúc tận đáy tim 心 tạo nên ý nghĩ sâu xa chân thật."
  },
  "感": {
    "py": "gǎn",
    "hv": "cảm",
    "meaning": "cảm giác, cảm động",
    "strokes": 13,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "咸",
        "name": "Chữ Hàm",
        "vi": "miệng đồng thanh, tất cả (âm xián)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "心",
        "name": "Bộ Tâm",
        "vi": "trái tim, tấm lòng, suy nghĩ",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "心",
    "mnemonic": "Nỗi niềm rung động tràn ngập 咸 khắp cả cõi lòng 心 dâng trào cảm giác xúc động nghẹn ngào."
  },
  "慢": {
    "py": "màn",
    "hv": "mạn",
    "meaning": "chậm chạp, từ tốn",
    "strokes": 14,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "忄",
        "name": "Bộ Tâm đứng",
        "vi": "tâm tư, cảm xúc trong lòng",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "曼",
        "name": "Chữ Mạn",
        "vi": "kéo dài, uyển chuyển dịu dàng",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "忄",
    "mnemonic": "Trong lòng 忄 thanh thản buông lỏng tựa dải lụa dài 曼 (màn) cất bước chậm chạp ung dung."
  },
  "懂": {
    "py": "dǒng",
    "hv": "đổng",
    "meaning": "hiểu, hiểu biết",
    "strokes": 15,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "忄",
        "name": "Bộ Tâm đứng",
        "vi": "tâm tư, cảm xúc trong lòng",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "董",
        "name": "Chữ Đổng",
        "vi": "giám sát, chấn chỉnh",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "忄",
    "mnemonic": "Tấm lòng 忄 sáng tỏ mọi điều thấu đáo như người quản lý coi sóc 董 (dǒng) đã hiểu rõ chân tướng."
  },
  "我": {
    "py": "wǒ",
    "hv": "ngã",
    "meaning": "tôi, mình (ngôi 1)",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "扌",
        "name": "Bộ Thủ",
        "vi": "bàn tay cầm nắm",
        "pos": "trái",
        "role": "hình"
      },
      {
        "c": "戈",
        "name": "Bộ Qua",
        "vi": "ngọn giáo, vũ khí chiến đấu",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "戈",
    "mnemonic": "Đôi bàn tay 扌 vung ngọn kích 戈 chém tan tảng đá lớn để khẳng định sức mạnh của tôi."
  },
  "户": {
    "py": "hù",
    "hv": "hộ",
    "meaning": "hộ gia đình, cánh cửa",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "户",
    "mnemonic": "Một cánh cửa gỗ đơn sơ khép hờ mở ra không gian ấm cúng của một hộ gia đình nhỏ."
  },
  "房": {
    "py": "fáng",
    "hv": "phòng",
    "meaning": "ngôi nhà, căn phòng",
    "strokes": 8,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "户",
        "name": "Bộ Hộ",
        "vi": "cánh cửa một cánh, hộ gia đình",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "方",
        "name": "Bộ Phương",
        "vi": "phương hướng, vuông vức, thuyền đôi",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "户",
    "mnemonic": "Bước qua cánh cửa 户 trông thấy gian nhà xây vuông vức bốn phương 方 thoáng đãng sạch sẽ."
  },
  "手": {
    "py": "shǒu",
    "hv": "thủ",
    "meaning": "bàn tay, tay",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "手",
    "mnemonic": "Bàn tay năm ngón xòe rộng với các đường chỉ tay rõ ràng khéo léo cầm nắm mọi vật."
  },
  "才": {
    "py": "cái",
    "hv": "tài",
    "meaning": "mới; tài năng",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "扌",
    "mnemonic": "Cây mầm vừa mới đâm chồi nhú cành khỏe khoắn bộc lộ tài năng thiên bẩm từ khi còn bé."
  },
  "打": {
    "py": "dǎ",
    "hv": "đả",
    "meaning": "đánh, gõ, gọi (điện thoại)",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "扌",
        "name": "Bộ Thủ (tài gẩy)",
        "vi": "bàn tay tác động, cầm nắm",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "丁",
        "name": "Chữ Đinh",
        "vi": "đinh, tráng đinh khỏe mạnh (âm dīng)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "扌",
    "mnemonic": "Vung bàn tay 扌 giáng một đòn mạnh như chiếc đinh 丁 gõ xuống bàn để đánh thức mọi người."
  },
  "扫": {
    "py": "sǎo",
    "hv": "tảo",
    "meaning": "quét dọn, làm sạch",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "扌",
        "name": "Bộ Thủ (tài gẩy)",
        "vi": "bàn tay tác động, cầm nắm",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "彐",
        "name": "Bộ Kệ",
        "vi": "đầu con nhím; bàn tay nắm",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "扌",
    "mnemonic": "Cầm bàn tay 扌 nắm chặt chiếc chổi rơm 彐 lia qua lia lại để quét dọn sạch sẽ góc sân."
  },
  "找": {
    "py": "zhǎo",
    "hv": "trảo",
    "meaning": "tìm kiếm, trả lại tiền thừa",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "扌",
        "name": "Bộ Thủ (tài gẩy)",
        "vi": "bàn tay tác động, cầm nắm",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "戈",
        "name": "Bộ Qua",
        "vi": "ngọn giáo, vũ khí chiến đấu",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "扌",
    "mnemonic": "Đưa bàn tay 扌 lần tìm khắp ngọn mác 戈 xem chiếc chuông nhỏ rơi đâu để tìm lại cho bạn."
  },
  "把": {
    "py": "bǎ",
    "hv": "bả",
    "meaning": "cầm, nắm; cái (lượng từ ghế)",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "扌",
        "name": "Bộ Thủ (tài gẩy)",
        "vi": "bàn tay tác động, cầm nắm",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "巴",
        "name": "Chữ Ba",
        "vi": "con trăn bám chặt, mong mỏi (âm bā)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "扌",
    "mnemonic": "Bàn tay 扌 nắm chặt lấy đuôi con rắn 巴 kéo mạnh cầm chắc chiếc chuôi dao trong tay."
  },
  "护": {
    "py": "hù",
    "hv": "hộ",
    "meaning": "bảo hộ, che chở",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "扌",
        "name": "Bộ Thủ (tài gẩy)",
        "vi": "bàn tay tác động, cầm nắm",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "户",
        "name": "Bộ Hộ",
        "vi": "cánh cửa một cánh, hộ gia đình",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "扌",
    "mnemonic": "Đưa bàn tay 扌 chắn trước cánh cửa 户 để che chở bảo vệ cho người thân bên trong an toàn."
  },
  "抱": {
    "py": "bào",
    "hv": "bão",
    "meaning": "ôm, ẵm vào lòng",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "扌",
        "name": "Bộ Thủ (tài gẩy)",
        "vi": "bàn tay tác động, cầm nắm",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "包",
        "name": "Chữ Bao",
        "vi": "gói, túi xách; bao bọc",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "扌",
    "mnemonic": "Vươn đôi bàn tay 扌 ôm trọn chiếc túi bọc 包 quà ấm áp vào lòng đầy vẻ yêu thương nâng niu."
  },
  "拐": {
    "py": "guǎi",
    "hv": "quải",
    "meaning": "rẽ, quẹo hướng",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "扌",
        "name": "Bộ Thủ (tài gẩy)",
        "vi": "bàn tay tác động, cầm nắm",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "另",
        "name": "Chữ Lánh",
        "vi": "tách rời, riêng biệt khác (âm lìng)",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "扌",
    "mnemonic": "Dùng bàn tay 扌 níu lấy bờ tường rồi rẽ sang một lối khác 另 để quẹo vào ngõ vắng."
  },
  "拼": {
    "py": "pīn",
    "hv": "bính",
    "meaning": "ghép lại, liều mạng",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "扌",
        "name": "Bộ Thủ (tài gẩy)",
        "vi": "bàn tay tác động, cầm nắm",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "并",
        "name": "Chữ Tịnh",
        "vi": "hai người đứng cùng nhau (âm bìng)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "扌",
    "mnemonic": "Đưa bàn tay 扌 xếp đặt các mảnh ghép song song 并 lại với nhau tạo nên bức tranh hoàn chỉnh."
  },
  "推": {
    "py": "tuī",
    "hv": "thôi",
    "meaning": "đẩy, xúc tiến",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "扌",
        "name": "Bộ Thủ (tài gẩy)",
        "vi": "bàn tay tác động, cầm nắm",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "隹",
        "name": "Bộ Chuy",
        "vi": "chim đuôi ngắn",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "扌",
    "mnemonic": "Vươn bàn tay 扌 ra phía trước đẩy xua chú chim nhỏ 隹 bay vút lên bầu trời cao xanh."
  },
  "操": {
    "py": "cāo",
    "hv": "thao",
    "meaning": "tập luyện, thao tác",
    "strokes": 16,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "扌",
        "name": "Bộ Thủ (tài gẩy)",
        "vi": "bàn tay tác động, cầm nắm",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "喿",
        "name": "Chữ Táo",
        "vi": "chim hót líu lo trên cây",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "扌",
    "mnemonic": "Đưa bàn tay 扌 theo nhịp rộn ràng của tiếng chim hót 喿 trên cành tập luyện bài thể dục buổi sáng."
  },
  "支": {
    "py": "zhī",
    "hv": "chi",
    "meaning": "cành cây; cây (lượng từ bút)",
    "strokes": 4,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "十",
        "name": "Bộ Thập",
        "vi": "số mười, trọn vẹn mười phương",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "又",
        "name": "Bộ Hựu",
        "vi": "bàn tay phải, lặp lại",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "支",
    "mnemonic": "Bàn tay 又 cầm mười 十 nhánh cây nhỏ chia thành từng cành bút viết chữ rất ngay ngắn."
  },
  "收": {
    "py": "shōu",
    "hv": "thu",
    "meaning": "thu nhận, nhận về",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "丩",
        "name": "Chữ Cưu",
        "vi": "quấn lấy, thắt lại (âm jiū)",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "攵",
        "name": "Bộ Phác",
        "vi": "đánh khẽ, gõ nhẹ, hành động",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "攵",
    "mnemonic": "Bắt trói dây 丩 rồi giơ roi gõ nhẹ 攵 thu nhận toàn bộ thóc lúa vào kho dự trữ gia đình."
  },
  "放": {
    "py": "fàng",
    "hv": "phóng",
    "meaning": "thả, đặt, để, buông",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "方",
        "name": "Bộ Phương",
        "vi": "phương hướng, vuông vức, thuyền đôi",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "攵",
        "name": "Bộ Phác",
        "vi": "đánh khẽ, gõ nhẹ, hành động",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "攵",
    "mnemonic": "Đứng ở bốn phương 方 vung roi nhẹ 攵 thả đàn chim bồ câu tung cánh bay lượn tự do."
  },
  "教": {
    "py": "jiào",
    "hv": "giáo",
    "meaning": "dạy dỗ, giáo dục",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "孝",
        "name": "Chữ Hiếu",
        "vi": "con trẻ nâng đỡ người già hiếu thuận (âm xiào)",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "攵",
        "name": "Bộ Phác",
        "vi": "đánh khẽ, gõ nhẹ, hành động",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "攵",
    "mnemonic": "Thầy cầm roi gõ 攵 nhắc nhở học trò giữ trọn lòng hiếu thảo 孝 để dạy dỗ thành người có ích."
  },
  "散": {
    "py": "sàn",
    "hv": "tản",
    "meaning": "tan ra, tản bộ",
    "strokes": 12,
    "structure": "độc thể",
    "parts": [],
    "radical": "攵",
    "mnemonic": "Từng sợi gai tơi tả bay tản mác khắp bốn phương trời khi cơn gió mạnh ùa qua góc vườn."
  },
  "文": {
    "py": "wén",
    "hv": "văn",
    "meaning": "văn học, văn hóa",
    "strokes": 4,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "亠",
        "name": "Bộ Đầu",
        "vi": "phần trên cùng, nắp che",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "乂",
        "name": "Nét chéo",
        "vi": "hai nét đan chéo nhau",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "文",
    "mnemonic": "Đầu đội mũ 亠 khoác áo hoa văn đan chéo 乂 đẹp đẽ tượng trưng cho nét đẹp văn chương."
  },
  "斤": {
    "py": "jīn",
    "hv": "cân",
    "meaning": "cân (nửa ký Trung Quốc)",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "斤",
    "mnemonic": "Lưỡi rìu đốn cây bằng sắt nặng đúng một cân dùng để chặt củi đun bếp suốt mùa đông."
  },
  "新": {
    "py": "xīn",
    "hv": "tân",
    "meaning": "mới, mới mẻ",
    "strokes": 13,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "亲",
        "name": "Chữ Thân",
        "vi": "thân cận, gần gũi (âm qīn)",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "斤",
        "name": "Bộ Cân",
        "vi": "cái rìu đốn cây, đơn vị cân",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "斤",
    "mnemonic": "Người thân 亲 cầm chiếc rìu 斤 vừa đốn cành cây tươi về sửa sang căn nhà mới tinh tươm."
  },
  "方": {
    "py": "fāng",
    "hv": "phương",
    "meaning": "phương hướng, hình vuông",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "方",
    "mnemonic": "Lưỡi cày sắc cắm xuống đất rẽ luống vuông vức phân định rõ từng phương hướng đông tây nam bắc."
  },
  "旁": {
    "py": "páng",
    "hv": "bàng",
    "meaning": "bên cạnh, xung quanh",
    "strokes": 10,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "立",
        "name": "Bộ Lập",
        "vi": "người đứng vững trên mặt đất",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "方",
        "name": "Bộ Phương",
        "vi": "phương hướng, vuông vức, thuyền đôi",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "方",
    "mnemonic": "Đứng 立 ngay bên cạnh chiếc cày vuông 方 trông coi thửa ruộng đang mùa gieo cấy lúa non."
  },
  "旅": {
    "py": "lǚ",
    "hv": "lữ",
    "meaning": "du lịch, lữ khách",
    "strokes": 10,
    "structure": "độc thể",
    "parts": [],
    "radical": "方",
    "mnemonic": "Đoàn người giương ngọn cờ dẫn đường rảo bước chu du khắp chốn trong chuyến đi du lịch xa."
  },
  "日": {
    "py": "rì",
    "hv": "nhật",
    "meaning": "ngày; mặt trời",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "日",
    "mnemonic": "Vầng thái dương tròn trịa có đốm đen ở giữa tỏa ánh hào quang rực rỡ suốt ngày dài."
  },
  "旧": {
    "py": "jiù",
    "hv": "cựu",
    "meaning": "cũ, xưa",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "丨",
        "name": "Bộ Cổn",
        "vi": "nét sổ thẳng đứng",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "日",
    "mnemonic": "Nét sổ đứng 丨 che khuất vầng mặt trời 日 gợi lại dấu vết đồ vật cũ kỹ đã qua."
  },
  "早": {
    "py": "zǎo",
    "hv": "tảo",
    "meaning": "buổi sáng, sớm",
    "strokes": 6,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "十",
        "name": "Bộ Thập",
        "vi": "số mười, trọn vẹn mười phương",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "日",
    "mnemonic": "Vầng mặt trời 日 vừa nhô lên khỏi ngọn cỏ mười 十 lá báo hiệu buổi sáng sớm tinh mơ."
  },
  "时": {
    "py": "shí",
    "hv": "thời",
    "meaning": "thời gian, khi, lúc",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "寸",
        "name": "Bộ Thốn",
        "vi": "tấc, đo lường khoảng cách ngắn",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "日",
    "mnemonic": "Vầng mặt trời 日 nhích từng tấc 寸 một trên bầu trời nhắc nhở thời gian trôi qua không chờ đợi."
  },
  "明": {
    "py": "míng",
    "hv": "minh",
    "meaning": "sáng sủa; ngày mai",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "月",
        "name": "Bộ Nguyệt",
        "vi": "mặt trăng, tháng, thịt",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "日",
    "mnemonic": "Mặt trời 日 cùng vầng trăng 月 cùng nhau chiếu tỏa khiến vạn vật bừng sáng rõ ràng và tươi mới."
  },
  "星": {
    "py": "xīng",
    "hv": "tinh",
    "meaning": "ngôi sao",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "生",
        "name": "Bộ Sinh",
        "vi": "chồi non mọc lên từ đất, sinh sôi",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "日",
    "mnemonic": "Vầng mặt trời 日 sinh đẻ 生 ra muôn ngàn đốm sáng lấp lánh như ngàn ngôi sao đêm."
  },
  "昨": {
    "py": "zuó",
    "hv": "tạc",
    "meaning": "hôm qua",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "乍",
        "name": "Chữ Sạ",
        "vi": "chợt, vừa mới",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "日",
    "mnemonic": "Vầng mặt trời 日 của ngày vừa mới 乍 qua đi đã trở thành ngày hôm qua không trở lại."
  },
  "是": {
    "py": "shì",
    "hv": "thị",
    "meaning": "là, đúng",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời soi sáng",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "疋",
        "name": "Chữ Thất/Sơ",
        "vi": "ngay thẳng, chuẩn xác",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "日",
    "mnemonic": "Dưới ánh mặt trời 日 chân bước đi thẳng thắn 疋 để khẳng định lẽ phải đúng đắn phân minh."
  },
  "晚": {
    "py": "wǎn",
    "hv": "vãn",
    "meaning": "buổi tối, muộn",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "免",
        "name": "Chữ Miễn",
        "vi": "tránh khỏi, miễn trừ (âm miǎn)",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "日",
    "mnemonic": "Mặt trời 日 đã lặn hẳn người nông dân được miễn 免 việc đồng áng nghỉ ngơi buổi tối muộn."
  },
  "普": {
    "py": "pǔ",
    "hv": "Phổ",
    "meaning": "phổ thông, rộng khắp",
    "strokes": 12,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "並",
        "name": "Chữ Tịnh",
        "vi": "cùng nhau đứng cạnh (âm bìng)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "日",
    "mnemonic": "Ánh mặt trời 日 rọi khắp các hàng cột 並 (bìng gần pǔ) tỏa sáng phổ biến khắp cõi nhân gian."
  },
  "晴": {
    "py": "qíng",
    "hv": "tình",
    "meaning": "trời nắng, quang đãng",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "青",
        "name": "Bộ Thanh",
        "vi": "màu xanh non của chồi cây",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "日",
    "mnemonic": "Mặt trời 日 chiếu rọi lên vòm trời xanh biếc 青 báo hiệu một ngày nắng ráo quang đãng tuyệt đẹp."
  },
  "暖": {
    "py": "nuǎn",
    "hv": "noãn",
    "meaning": "ấm áp, sưởi ấm",
    "strokes": 13,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "爰",
        "name": "Chữ Viên",
        "vi": "dẫn dắt, trao tay giúp đỡ",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "日",
    "mnemonic": "Mặt trời 日 sưởi ấm bàn tay người đang trao nhau 爰 (yuán gần nuǎn) hơi ấm xua tan giá rét."
  },
  "最": {
    "py": "zuì",
    "hv": "tối",
    "meaning": "nhất, trên hết",
    "strokes": 12,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "取",
        "name": "Chữ Thủ",
        "vi": "tay túm lấy tai, chiếm lấy (âm qǔ)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "曰",
    "mnemonic": "Dưới ánh mặt trời 日 người lính bắt 取 được nhiều chiến lợi phẩm nhất để giành phần thưởng cao quý."
  },
  "月": {
    "py": "yuè",
    "hv": "nguyệt",
    "meaning": "mặt trăng; tháng",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "月",
    "mnemonic": "Mảnh trăng khuyết lơ lửng soi bóng trên mặt hồ gợn sóng đánh dấu chu kỳ từng tháng trôi qua."
  },
  "有": {
    "py": "yǒu",
    "hv": "hữu",
    "meaning": "có, sở hữu",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "月",
    "mnemonic": "Bàn tay chìa ra che đỡ vầng trăng khuyết lấp lánh như đang có trong tay một kho báu."
  },
  "朋": {
    "py": "péng",
    "hv": "bằng",
    "meaning": "bạn bè, bằng hữu",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "月",
        "name": "Bộ Nguyệt",
        "vi": "mặt trăng, tháng, thịt",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "月",
        "name": "Bộ Nguyệt",
        "vi": "mặt trăng, tháng, thịt",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "月",
    "mnemonic": "Hai chuỗi sò ốc ngọc 月 xâu cạnh nhau 月 trao tặng người bạn tri kỷ làm quà kỷ niệm."
  },
  "服": {
    "py": "fú",
    "hv": "phục",
    "meaning": "quần áo; phục vụ, uống thuốc",
    "strokes": 8,
    "structure": "độc thể",
    "parts": [],
    "radical": "月",
    "mnemonic": "Người chèo thuyền cầm mái chèo gấp nếp tấm áo vải mặc vào người để phục vụ hành khách."
  },
  "望": {
    "py": "wàng",
    "hv": "vọng",
    "meaning": "nhìn xa, mong ngóng",
    "strokes": 11,
    "structure": "độc thể",
    "parts": [],
    "radical": "月",
    "mnemonic": "Đứng trên đống đất cao ngước mắt trông về phía vầng trăng xa xôi ngóng đợi người thân về."
  },
  "期": {
    "py": "qī",
    "hv": "kỳ",
    "meaning": "kỳ hạn, khoảng thời gian",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "其",
        "name": "Chữ Kỳ",
        "vi": "cái sọt lúa; của nó (âm qí)",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "月",
        "name": "Bộ Nguyệt",
        "vi": "mặt trăng, tháng, thịt",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "月",
    "mnemonic": "Chiếc sọt 其 đong đầy theo từng tuần trăng tròn khuyết 月 đánh dấu đúng kỳ hạn giao hàng ước hẹn."
  },
  "木": {
    "py": "mù",
    "hv": "mộc",
    "meaning": "cây cối, gỗ",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "木",
    "mnemonic": "Thân cây vươn thẳng đứng xòe cành lá hai bên và cắm rễ sâu xuống lòng đất chắc chắn."
  },
  "末": {
    "py": "mò",
    "hv": "mạt",
    "meaning": "cuối cùng, ngọn",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "一",
        "name": "Chữ Nhất",
        "vi": "một (1)",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "木",
    "mnemonic": "Cành cây 木 có thêm nét gạch ngang dài 一 ở đỉnh ngọn chỉ phần mút cùng kết thúc."
  },
  "本": {
    "py": "běn",
    "hv": "bản",
    "meaning": "cuốn, quyển (sách); vốn dĩ",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "一",
        "name": "Chữ Nhất",
        "vi": "một (1)",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "木",
    "mnemonic": "Dưới gốc cây gỗ 木 rạch một vạch ngang 一 đánh dấu cội nguồn gốc rễ của cuốn sách quý."
  },
  "机": {
    "py": "jī",
    "hv": "cơ",
    "meaning": "máy móc; cơ hội",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "几",
        "name": "Bộ Kỷ",
        "vi": "cái bàn nhỏ, ghế thấp",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "木",
    "mnemonic": "Chiếc bàn trà nhỏ bằng gỗ 木 bên cạnh chiếc ghế 几 tựa thành cỗ máy vận hành êm ru."
  },
  "条": {
    "py": "tiáo",
    "hv": "điều",
    "meaning": "sợi, dải, con (lượng từ đường, cá, quần)",
    "strokes": 7,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "夂",
        "name": "Bộ Trĩ",
        "vi": "bước đi chậm phía sau",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "木",
    "mnemonic": "Bước chân 夂 rảo bước bên hàng cây 木 men theo từng con đường dài uốn lượn quanh co."
  },
  "来": {
    "py": "lái",
    "hv": "lai",
    "meaning": "đến, tới",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "未",
        "name": "Chữ Vị",
        "vi": "cây cối sum sê cành ngọn, vị lai (âm wèi)",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "丷",
        "name": "Nét hai chấm xòe",
        "vi": "hai nét chấm tỏa ra",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "木",
    "mnemonic": "Cây lúa mì 未 trĩu hạt đón hai giọt sương 丷 rơi xuống từ phương xa trôi đến mùa gặt."
  },
  "林": {
    "py": "lín",
    "hv": "lâm",
    "meaning": "rừng cây",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "木",
    "mnemonic": "Hai cây gỗ 木 và 木 mọc liền kề sát cạnh nhau tạo nên một cánh rừng cây xanh tốt."
  },
  "果": {
    "py": "guǒ",
    "hv": "quả",
    "meaning": "hoa quả, kết quả",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "田",
        "name": "Bộ Điền",
        "vi": "ruộng đồng, đất canh tác",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "木",
    "mnemonic": "Cây gỗ 木 sai trĩu quả tròn xoe như những ô ruộng 田 nhỏ đem lại kết quả ngọt ngào."
  },
  "查": {
    "py": "chá",
    "hv": "tra",
    "meaning": "tra cứu, kiểm tra",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "旦",
        "name": "Chữ Đán",
        "vi": "mặt trời mọc lên khỏi mặt đất sớm mai (âm dàn)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "木",
    "mnemonic": "Lên cây gỗ 木 từ lúc mặt trời vừa mọc 旦 để kiểm tra xem tổ chim non có bình an."
  },
  "校": {
    "py": "xiào",
    "hv": "hiệu",
    "meaning": "trường học",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "交",
        "name": "Chữ Giao",
        "vi": "giao tiếp, kết giao",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "木",
    "mnemonic": "Trồng hàng cây xanh 木 nơi các em học sinh gặp gỡ kết giao 交 dưới mái trường học thân yêu."
  },
  "样": {
    "py": "yàng",
    "hv": "dạng",
    "meaning": "dáng vẻ, kiểu dáng",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "羊",
        "name": "Bộ Dương",
        "vi": "con cừu, con dê có sừng",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "木",
    "mnemonic": "Khắc hình con cừu 羊 lên thớ gỗ 木 mịn màng để tạo ra kiểu dáng đồ chơi mẫu mã đẹp."
  },
  "桌": {
    "py": "zhuō",
    "hv": "trác",
    "meaning": "cái bàn",
    "strokes": 10,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "卓",
        "name": "Chữ Trác",
        "vi": "cao vượt trội, trác tuyệt (âm zhuó)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "木",
    "mnemonic": "Đặt chiếc đĩa cao 卓 vững vàng trên bốn chân bàn bằng gỗ 木 thành một cái bàn ăn đẹp."
  },
  "森": {
    "py": "sēn",
    "hv": "sâm",
    "meaning": "rừng rậm, nhiều cây",
    "strokes": 12,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "木",
    "mnemonic": "Ba cây gỗ 木, 木 và 木 mọc rậm rạp um tùm che kín cả cánh rừng rậm hoang vu."
  },
  "椅": {
    "py": "yǐ",
    "hv": "y",
    "meaning": "cái ghế",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "奇",
        "name": "Chữ Kỳ",
        "vi": "cưỡi ngựa lạ, kỳ lạ (âm qí)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "木",
    "mnemonic": "Dùng gỗ tốt 木 đóng chiếc ghế có hình dáng kỳ lạ 奇 (qí lái yǐ) ngồi rất thoải mái êm ái."
  },
  "楼": {
    "py": "lóu",
    "hv": "lâu",
    "meaning": "tầng lầu, tòa nhà",
    "strokes": 13,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "娄",
        "name": "Chữ Lâu",
        "vi": "xâu chuỗi lại, tích lũy",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "木",
    "mnemonic": "Cất ngôi nhà gỗ 木 nhiều tầng cho nàng dâu 娄 (lóu) sinh sống trong tòa lầu cao sang trọng."
  },
  "橘": {
    "py": "jú",
    "hv": "quất",
    "meaning": "quả quýt",
    "strokes": 16,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "矞",
        "name": "Chữ Duật",
        "vi": "mũi dùi sắc đâm xuyên",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "木",
    "mnemonic": "Trồng cây gỗ 木 sai trĩu quả có múi mọng nước ngọt ngào như phép màu 矞 (yù gần jú) của trái quýt."
  },
  "欢": {
    "py": "huān",
    "hv": "hoan",
    "meaning": "hoan hỉ, vui vẻ",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "又",
        "name": "Bộ Hựu",
        "vi": "bàn tay phải, lặp lại",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "欠",
        "name": "Bộ Khiếm",
        "vi": "há miệng ngáp, thiếu thốn",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "欠",
    "mnemonic": "Đôi bàn tay 又 vỗ nhịp trong khi miệng há to 欠 cất tiếng reo vui mừng hoan hỉ chào đón."
  },
  "款": {
    "py": "kuǎn",
    "hv": "khoản",
    "meaning": "khoản tiền, mẫu mã",
    "strokes": 12,
    "structure": "độc thể",
    "parts": [],
    "radical": "欠",
    "mnemonic": "Mở hòm ngân khố đếm từng thỏi bạc vụn gom thành một khoản tiền lớn chi trả hàng hóa."
  },
  "歉": {
    "py": "qiàn",
    "hv": "khiểm",
    "meaning": "có lỗi, nhận lỗi (trong 抱歉)",
    "strokes": 14,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "兼",
        "name": "Chữ Kiêm",
        "vi": "tay nắm hai bó lúa, kiêm nhiệm (âm jiān)",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "欠",
        "name": "Bộ Khiếm",
        "vi": "há miệng ngáp, thiếu thốn",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "欠",
    "mnemonic": "Miệng há 欠 lời tạ lỗi vì không chu toàn kiêm 兼 nhiệm tốt công việc nên chân thành nhận lỗi."
  },
  "歌": {
    "py": "gē",
    "hv": "ca",
    "meaning": "bài hát, ca khúc",
    "strokes": 14,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "哥",
        "name": "Chữ Ca",
        "vi": "anh trai",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "欠",
        "name": "Bộ Khiếm",
        "vi": "há miệng ngáp, thiếu thốn",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "欠",
    "mnemonic": "Cậu anh trai 哥 há miệng to 欠 cất giọng ngân nga từng giai điệu ngọt ngào của bài hát."
  },
  "正": {
    "py": "zhèng",
    "hv": "chính",
    "meaning": "chính xác, đang (làm gì)",
    "strokes": 5,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "一",
        "name": "Chữ Nhất",
        "vi": "một (1)",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "止",
        "name": "Bộ Chỉ",
        "vi": "bàn chân dừng lại, đình chỉ",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "止",
    "mnemonic": "Đặt một vạch ranh giới 一 rồi dừng bước chân 止 lại thật ngay thẳng đúng đắn không thiên lệch."
  },
  "步": {
    "py": "bù",
    "hv": "bộ",
    "meaning": "bước chân, đi bộ",
    "strokes": 7,
    "structure": "độc thể",
    "parts": [],
    "radical": "止",
    "mnemonic": "Hai bàn chân trước và sau nối tiếp nhau bước đi từng bước nhịp nhàng trên đường làng quê."
  },
  "段": {
    "py": "duàn",
    "hv": "đoạn",
    "meaning": "đoạn, khúc (thời gian/văn)",
    "strokes": 9,
    "structure": "độc thể",
    "parts": [],
    "radical": "殳",
    "mnemonic": "Chiếc búa gõ đập vỡ tảng đá thành từng khúc từng đoạn ngắn để lát đường đi lại phẳng phiu."
  },
  "母": {
    "py": "mǔ",
    "hv": "mẫu",
    "meaning": "mẹ, giống cái",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "母",
    "mnemonic": "Người mẹ hiền mở rộng vòng ngực cho hai bầu sữa ngọt lành nuôi nấng đứa con thơ khôn lớn."
  },
  "每": {
    "py": "měi",
    "hv": "mỗi",
    "meaning": "mỗi, từng",
    "strokes": 7,
    "structure": "độc thể",
    "parts": [],
    "radical": "母",
    "mnemonic": "Người mẹ đội chiếc khăn trùm đầu tảo tần chăm lo chu đáo cho mỗi đứa con từng bữa ăn."
  },
  "毛": {
    "py": "máo",
    "hv": "mao",
    "meaning": "lông, sợi tóc; hào (tiền)",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "毛",
    "mnemonic": "Sợi lông tơ mềm mại uốn lượn bay lơ lửng trong gió gợi đơn vị hào bạc nhỏ lẻ ngày xưa."
  },
  "气": {
    "py": "qì",
    "hv": "khí",
    "meaning": "không khí, khí hậu, tức giận",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "气",
    "mnemonic": "Làn hơi nước bốc lên cuồn cuộn lượn sóng tạo thành luồng không khí mát lành khắp bốn phương trời."
  },
  "水": {
    "py": "shuǐ",
    "hv": "thủy",
    "meaning": "nước",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "水",
    "mnemonic": "Dòng suối uốn lượn ở giữa với những gợn sóng nước nhấp nhô bắn tung tóe sang hai bên bờ."
  },
  "汁": {
    "py": "zhī",
    "hv": "trấp",
    "meaning": "nước ép, nước sốt",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "十",
        "name": "Bộ Thập",
        "vi": "số mười, trọn vẹn mười phương",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "氵",
    "mnemonic": "Dòng nước 氵 ép ra từ mười 十 loại quả tươi mọng tạo thành một ly nước ép đậm đà."
  },
  "汉": {
    "py": "hàn",
    "hv": "Hán",
    "meaning": "tiếng Hán, người Hán",
    "strokes": 5,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "又",
        "name": "Bộ Hựu",
        "vi": "bàn tay phải, lặp lại",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "氵",
    "mnemonic": "Dòng nước 氵 cuộn sóng chảy kề đôi bàn tay 又 cần cù của người dân lưu vực sông Hán."
  },
  "汽": {
    "py": "qì",
    "hv": "khí",
    "meaning": "hơi nước (trong 汽车 xe hơi)",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "气",
        "name": "Bộ Khí",
        "vi": "hơi thở, mây trời vần vũ",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "氵",
    "mnemonic": "Giọt nước 氵 đun sôi bốc thành luồng khí 气 ngút ngàn đẩy pit-tông xe chạy bằng hơi nước băng băng."
  },
  "没": {
    "py": "méi",
    "hv": "một",
    "meaning": "không có, chưa làm",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "殳",
        "name": "Bộ Thù",
        "vi": "cây gậy gỗ đánh giặc",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "氵",
    "mnemonic": "Ném chiếc gậy 殳 gỗ chìm lỉm vào dòng nước 氵 sâu cuồn cuộn là chẳng còn gì cả."
  },
  "河": {
    "py": "hé",
    "hv": "hà",
    "meaning": "con sông",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "可",
        "name": "Chữ Khả",
        "vi": "cất tiếng ưng thuận, có thể (âm kě)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "氵",
    "mnemonic": "Dòng nước 氵 uốn khúc thuận theo tiếng hát 可 (kě đọc gần hé) tạo thành dòng sông thơ mộng."
  },
  "泳": {
    "py": "yǒng",
    "hv": "vịnh",
    "meaning": "bơi lội (trong 游泳)",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "永",
        "name": "Chữ Vĩnh",
        "vi": "dòng nước dài lâu, vĩnh cửu (âm yǒng)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "氵",
    "mnemonic": "Lao mình xuống dòng nước 氵 vĩnh cửu 永 (yǒng) vẫy vùng bơi lội rèn luyện sức khỏe dẻo dai."
  },
  "洗": {
    "py": "xǐ",
    "hv": "tẩy",
    "meaning": "rửa, giặt",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "先",
        "name": "Chữ Tiên",
        "vi": "trước, đi trước",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "氵",
    "mnemonic": "Đổ dòng nước 氵 sạch lên trước 先 (xiān gần xǐ) để kỳ cọ tẩy rửa mọi vết bẩn bám dính."
  },
  "流": {
    "py": "liú",
    "hv": "lưu",
    "meaning": "chảy, lưu chuyển",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "㐬",
        "name": "Chữ Lưu",
        "vi": "dải cờ rủ xuống, trôi chảy",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "氵",
    "mnemonic": "Nước 氵 từ trên cao tuôn đổ xuống rãnh 㐬 (liú) uốn lượn chảy xiết ra biển cả mênh mông."
  },
  "清": {
    "py": "qīng",
    "hv": "thanh",
    "meaning": "trong trẻo, rõ ràng",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "青",
        "name": "Bộ Thanh",
        "vi": "màu xanh non của chồi cây",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "氵",
    "mnemonic": "Dòng nước 氵 soi bóng ngọn núi xanh 青 trong vắt nhìn thấy rõ từng đàn cá tung tăng bơi lội."
  },
  "温": {
    "py": "wēn",
    "hv": "ôn",
    "meaning": "ấm áp, ôn hòa; nhiệt độ",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "昷",
        "name": "Chữ Ôn",
        "vi": "ấm áp, nuôi dưỡng",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "氵",
    "mnemonic": "Đổ nước 氵 ấm vào chiếc bát đĩa 昷 (wēn) đựng thức ăn giữ cho bữa cơm luôn ôn hòa ấm áp."
  },
  "渴": {
    "py": "kě",
    "hv": "khát",
    "meaning": "khát nước",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "曷",
        "name": "Chữ Hạt",
        "vi": "kêu gào, khát khô cổ (âm hé)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "氵",
    "mnemonic": "Cổ họng cồn cào khao khát 曷 (hé gần kě) tìm thấy giọt nước 氵 ngọt lành uống cho đỡ khát."
  },
  "游": {
    "py": "yóu",
    "hv": "du",
    "meaning": "bơi, du lịch",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "斿",
        "name": "Chữ Du",
        "vi": "dải cờ bay phấp phới",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "氵",
    "mnemonic": "Nhảy xuống dòng nước 氵 bơi theo lá cờ 斿 (yóu) phấp phới thỏa thích du ngoạn khắp nơi xa."
  },
  "满": {
    "py": "mǎn",
    "hv": "mãn",
    "meaning": "đầy, tràn đầy, hài lòng",
    "strokes": 13,
    "structure": "độc thể",
    "parts": [],
    "radical": "氵",
    "mnemonic": "Dòng nước tràn trề dâng ngập bờ đê đong đầy thùng gỗ khiến người nông dân vô cùng hài lòng."
  },
  "漂": {
    "py": "piāo",
    "hv": "phiêu",
    "meaning": "xinh đẹp (trong 漂亮); trôi",
    "strokes": 14,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "氵",
        "name": "Bộ Ba chấm thủy",
        "vi": "nước, dòng nước",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "票",
        "name": "Chữ Phiếu",
        "vi": "vé, phiếu",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "氵",
    "mnemonic": "Thả tấm vé 票 nổi bồng bềnh trôi dạt theo dòng nước 氵 trong xanh trông thật xinh xắn và đẹp đẽ."
  },
  "火": {
    "py": "huǒ",
    "hv": "hỏa",
    "meaning": "ngọn lửa",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "火",
    "mnemonic": "Đống củi bốc cháy với ngọn lửa lớn bùng lên kèm theo hai tia tàn than đỏ bắn ra."
  },
  "灯": {
    "py": "dēng",
    "hv": "đăng",
    "meaning": "cái đèn, ánh đèn",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "火",
        "name": "Bộ Hỏa",
        "vi": "ngọn lửa, nhiệt độ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "丁",
        "name": "Chữ Đinh",
        "vi": "đinh, tráng đinh khỏe mạnh (âm dīng)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "火",
    "mnemonic": "Ngọn lửa 火 thắp sáng trên chiếc giá đinh sắt 丁 soi tỏ ánh đèn ấm áp cho cả căn phòng."
  },
  "点": {
    "py": "diǎn",
    "hv": "điểm",
    "meaning": "giờ; chấm; chút xíu",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "占",
        "name": "Chữ Chiêm",
        "vi": "bói toán, chiếm giữ (âm zhān -> diǎn)",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "灬",
        "name": "Bộ Bốn chấm hỏa",
        "vi": "ngọn lửa nhỏ, đốm lửa chấm",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "灬",
    "mnemonic": "Châm bốn đốm lửa nhỏ 灬 hơ nóng mai rùa bói toán 占 tạo ra những chấm đốm nứt rõ nét."
  },
  "烧": {
    "py": "shāo",
    "hv": "thiêu",
    "meaning": "đốt, nấu, nướng xào",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "火",
        "name": "Bộ Hỏa",
        "vi": "ngọn lửa, nhiệt độ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "尧",
        "name": "Chữ Nghiêu",
        "vi": "vua Nghiêu, mô đất cao",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "火",
    "mnemonic": "Dùng ngọn lửa 火 rực cháy nướng chín miếng thịt thơm lừng dâng lên vua Nghiêu 尧 (yáo gần shāo)."
  },
  "热": {
    "py": "rè",
    "hv": "nhiệt",
    "meaning": "nóng, nhiệt tình",
    "strokes": 10,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "执",
        "name": "Chữ Chấp",
        "vi": "tay cầm còng giữ chặt (âm zhí)",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "灬",
        "name": "Bộ Bốn chấm hỏa",
        "vi": "ngọn lửa nấu nướng bên dưới",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "灬",
    "mnemonic": "Cầm tay 执 vật nóng bỏng giơ lên trên bếp than hồng rực lửa 灬 cảm thấy vô cùng nóng bức."
  },
  "照": {
    "py": "zhào",
    "hv": "chiếu",
    "meaning": "chiếu sáng, chụp (ảnh)",
    "strokes": 13,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "昭",
        "name": "Chữ Chiêu",
        "vi": "sáng sủa, rực rỡ",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "灬",
        "name": "Bộ Bốn chấm hỏa",
        "vi": "ngọn lửa nấu nướng bên dưới",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "灬",
    "mnemonic": "Ánh lửa hồng 灬 bập bùng soi rạng ngời 昭 (zhāo) dung nhan chiếu sáng bức ảnh kỷ niệm gia đình."
  },
  "爬": {
    "py": "pá",
    "hv": "bà",
    "meaning": "leo, trèo, bò",
    "strokes": 8,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "爪",
        "name": "Bộ Trảo",
        "vi": "móng vuốt chim thú",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "巴",
        "name": "Chữ Ba",
        "vi": "con trăn bám chặt, mong mỏi (âm bā)",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "爪",
    "mnemonic": "Dùng móng vuốt nhọn 爪 bám chặt lấy chiếc đuôi rắn 巴 để leo trèo thoăn thoắt lên vách đá cheo leo."
  },
  "爱": {
    "py": "ài",
    "hv": "ái",
    "meaning": "yêu thương, thích thú",
    "strokes": 10,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "爫",
        "name": "Bộ Trảo",
        "vi": "bàn tay đón nhận từ trên",
        "pos": "trên",
        "role": "hình"
      },
      {
        "c": "冖",
        "name": "Bộ Mịch",
        "vi": "mái che chở bao bọc",
        "pos": "giữa",
        "role": "hình"
      },
      {
        "c": "友",
        "name": "Chữ Hữu",
        "vi": "bạn bè, tình bằng hữu",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "爫",
    "mnemonic": "Đưa bàn tay 爫 che chở dưới mái hiên 冖 trao trọn tình yêu thương chân thành cho người bạn 友."
  },
  "父": {
    "py": "fù",
    "hv": "phụ",
    "meaning": "người cha, phụ thân",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "父",
    "mnemonic": "Bàn tay cầm cây roi nghiêm nghị chỉ dạy con cái giữ tròn đạo nghĩa làm người cha mẫu mực."
  },
  "爸": {
    "py": "bà",
    "hv": "ba",
    "meaning": "bố, cha",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "父",
        "name": "Bộ Phụ",
        "vi": "người cha cầm roi dạy con",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "巴",
        "name": "Chữ Ba",
        "vi": "con trăn bám chặt, mong mỏi (âm bā)",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "父",
    "mnemonic": "Người cha kính yêu 父 dắt đứa con nhỏ ôm đuôi rắn 巴 (bā) chơi đùa gọi tiếng bố thân thương."
  },
  "片": {
    "py": "piàn",
    "hv": "phiến",
    "meaning": "mảnh, tấm, lát mỏng",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "片",
    "mnemonic": "Nhát rìu chẻ dọc thân cây gỗ ra làm đôi tách thành từng mảnh ván lát mỏng dính phẳng phiu."
  },
  "牙": {
    "py": "yá",
    "hv": "nha",
    "meaning": "răng",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "牙",
    "mnemonic": "Răng nanh của loài thú đan chéo khít vào nhau gặm nhấm thức ăn vô cùng cứng cáp và sắc nhọn."
  },
  "牛": {
    "py": "niú",
    "hv": "ngưu",
    "meaning": "con bò, con trâu",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "牛",
    "mnemonic": "Con trâu rừng có hai chiếc sừng cong vút và chiếc đuôi dài ngoe nguẩy gặm cỏ trên sườn đồi."
  },
  "玩": {
    "py": "wán",
    "hv": "ngoạn",
    "meaning": "chơi, vui đùa",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "王",
        "name": "Bộ Vương",
        "vi": "vua chúa, người đứng đầu",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "元",
        "name": "Chữ Nguyên",
        "vi": "đồng nhân dân tệ, nguồn gốc",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "王",
    "mnemonic": "Vị vua cầm viên ngọc quý 王 nghịch ngợm cùng đứa trẻ con Nguyên 元 nô đùa chơi đùa rất vui."
  },
  "现": {
    "py": "xiàn",
    "hv": "hiện",
    "meaning": "hiện tại, xuất hiện",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "王",
        "name": "Bộ Vương",
        "vi": "vua chúa, người đứng đầu",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "见",
        "name": "Chữ Kiến",
        "vi": "gặp gỡ, nhìn thấy",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "王",
    "mnemonic": "Viên ngọc quý Vương 王 bỗng nhiên xuất hiện hiển hiện trước mắt nhìn thấy 见 rõ mồn một từng góc."
  },
  "班": {
    "py": "bān",
    "hv": "ban",
    "meaning": "lớp học, ca làm việc",
    "strokes": 10,
    "structure": "trái-giữa-phải",
    "parts": [
      {
        "c": "王",
        "name": "Bộ Vương",
        "vi": "vua chúa, người đứng đầu",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "刂",
        "name": "Bộ Đao đứng",
        "vi": "con dao, nhát cắt",
        "pos": "giữa",
        "role": "nghĩa"
      },
      {
        "c": "王",
        "name": "Bộ Vương",
        "vi": "vua chúa, người đứng đầu",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "王",
    "mnemonic": "Dùng lưỡi dao 刂 xẻ đôi hai khối ngọc Vương 王 chia đều thành hai lớp làm việc theo ca kíp."
  },
  "球": {
    "py": "qiú",
    "hv": "cầu",
    "meaning": "quả bóng, hình cầu",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "王",
        "name": "Bộ Vương",
        "vi": "vua chúa, người đứng đầu",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "求",
        "name": "Chữ Cầu",
        "vi": "áo da lông chắp vá, thỉnh cầu (âm qiú)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "王",
    "mnemonic": "Khối ngọc quý 王 mài tròn xoe theo lời thỉnh cầu 求 (qiú) tạo thành quả bóng tròn lăn tròn xoe."
  },
  "瓜": {
    "py": "guā",
    "hv": "qua",
    "meaning": "quả dưa",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "瓜",
    "mnemonic": "Dây leo bám cọc buông thõng xuống một quả dưa căng mọng nước đung đưa theo làn gió thoảng qua."
  },
  "生": {
    "py": "shēng",
    "hv": "sinh",
    "meaning": "sinh ra; học sinh; còn sống",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "生",
    "mnemonic": "Cây mầm non vừa mới đâm chồi nhú lên khỏi mặt đất tượng trưng cho sự sống sinh sôi nảy nở."
  },
  "田": {
    "py": "tián",
    "hv": "điền",
    "meaning": "ruộng đồng",
    "strokes": 5,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "冂",
        "name": "Bộ Quynh",
        "vi": "vùng biên giới xa ngoài thành",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "土",
        "name": "Bộ Thổ",
        "vi": "đất đai, thổ nhưỡng",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "田",
    "mnemonic": "Bốn ô đất bằng phẳng được đắp bờ vuông vức 冂 chia thành thửa ruộng đồng 土 màu mỡ thẳng cánh cò."
  },
  "电": {
    "py": "diàn",
    "hv": "điện",
    "meaning": "điện, tia chớp",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "曰",
    "mnemonic": "Luồng mây giông tích tụ bất ngờ phóng ra tia chớp ngoằn ngoèo xé toạc bầu trời phát ra nguồn điện."
  },
  "画": {
    "py": "huà",
    "hv": "họa",
    "meaning": "vẽ; bức tranh",
    "strokes": 8,
    "structure": "độc thể",
    "parts": [],
    "radical": "田",
    "mnemonic": "Bàn tay cầm bút lông viền ranh giới quanh thửa ruộng vuông vắn tạo thành một bức tranh phong cảnh."
  },
  "病": {
    "py": "bìng",
    "hv": "bệnh",
    "meaning": "bệnh, ốm đau",
    "strokes": 10,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "疒",
        "name": "Bộ Nạch",
        "vi": "người bệnh nằm trên giường",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "丙",
        "name": "Chữ Bính",
        "vi": "can Bính, sáng rõ (âm bǐng)",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "疒",
    "mnemonic": "Người nằm trên giường bệnh 疒 thân nhiệt nóng bừng 丙 (bǐng lái bìng) khiến cơ thể ốm đau mệt lử."
  },
  "白": {
    "py": "bái",
    "hv": "bạch",
    "meaning": "màu trắng; rõ ràng",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "白",
    "mnemonic": "Hạt gạo xát sạch lớp vỏ trấu để lộ ra màu trắng tinh khôi không tì vết chút bụi bẩn nào."
  },
  "百": {
    "py": "bǎi",
    "hv": "bách",
    "meaning": "trăm (100)",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "白",
    "mnemonic": "Thêm một nét gạch ngang trên chữ trắng tạo thành con số một trăm lớn lao tròn trịa đầy đủ."
  },
  "的": {
    "py": "de",
    "hv": "đích",
    "meaning": "của (trợ từ kết cấu)",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "白",
        "name": "Bộ Bạch",
        "vi": "màu trắng, hồng tâm bia",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "勺",
        "name": "Chữ Chước",
        "vi": "cái thìa, cái gáo (mượn âm sháo -> dí)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "白",
    "mnemonic": "Mũi tên nhắm trúng điểm màu trắng 白 trên chiếc thìa gáo 勺 đánh dấu đích đến của mục tiêu."
  },
  "目": {
    "py": "mù",
    "hv": "mục",
    "meaning": "mắt; mục lục",
    "strokes": 5,
    "structure": "độc thể",
    "parts": [],
    "radical": "目",
    "mnemonic": "Đôi mắt mở to tròn có hai tròng con ngươi rõ nét dùng để nhìn ngắm khắp bốn phương cảnh vật."
  },
  "直": {
    "py": "zhí",
    "hv": "trực",
    "meaning": "thẳng, trực tiếp",
    "strokes": 8,
    "structure": "trên-giữa-dưới",
    "parts": [
      {
        "c": "十",
        "name": "Bộ Thập",
        "vi": "số mười, trọn vẹn mười phương",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "目",
        "name": "Bộ Mục",
        "vi": "con mắt, nhìn ngắm",
        "pos": "giữa",
        "role": "nghĩa"
      },
      {
        "c": "一",
        "name": "Chữ Nhất",
        "vi": "một (1)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "目",
    "mnemonic": "Mười 十 con mắt 目 cùng nhìn thẳng hàng xuống một 一 đường thẳng tắp không hề xiêu vẹo lệch lạc."
  },
  "相": {
    "py": "xiāng",
    "hv": "tương",
    "meaning": "lẫn nhau, tướng mạo",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "cây cối, gỗ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "目",
        "name": "Bộ Mục",
        "vi": "con mắt, nhìn ngắm",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "目",
    "mnemonic": "Ghé sát đôi mắt 目 nhìn ngắm thân cây gỗ 木 để soi xét quan sát lẫn nhau từng góc cạnh."
  },
  "看": {
    "py": "kàn",
    "hv": "khán",
    "meaning": "nhìn, xem, đọc",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "手",
        "name": "Bộ Thủ (dạng ⺪)",
        "vi": "bàn tay che trán",
        "pos": "trên",
        "role": "hình"
      },
      {
        "c": "目",
        "name": "Bộ Mục",
        "vi": "con mắt nhìn ngắm",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "目",
    "mnemonic": "Đưa bàn tay 手 lên trán che bớt ánh nắng phía trên mắt 目 để phóng tầm nhìn quan sát ra xa."
  },
  "真": {
    "py": "zhēn",
    "hv": "chân",
    "meaning": "thật, chân thật",
    "strokes": 10,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "直",
        "name": "Chữ Trực",
        "vi": "thẳng, trực tiếp",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "几",
        "name": "Bộ Kỷ",
        "vi": "cái bàn nhỏ, ghế thấp",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "目",
    "mnemonic": "Đôi mắt nhìn thẳng 直 vào chân giá đỡ 几 phát hiện ra sự thật chân thành không hề giả dối."
  },
  "睡": {
    "py": "shuì",
    "hv": "thụy",
    "meaning": "ngủ, an giấc",
    "strokes": 13,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "目",
        "name": "Bộ Mục",
        "vi": "con mắt, nhìn ngắm",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "垂",
        "name": "Chữ Thùy",
        "vi": "trĩu xuống, rủ cành xuống",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "目",
    "mnemonic": "Đôi mắt 目 mỏi mệt mí mắt trĩu rũ xuống 垂 (chuí lái shuì) chìm sâu vào giấc ngủ êm ái ngon lành."
  },
  "短": {
    "py": "duǎn",
    "hv": "đoản",
    "meaning": "ngắn (chiều dài)",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "矢",
        "name": "Bộ Thỉ",
        "vi": "mũi tên bắn thẳng",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "豆",
        "name": "Bộ Đậu",
        "vi": "cái bát đựng hạt đậu dâng lễ (âm dòu)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "矢",
    "mnemonic": "Mũi tên nhọn 矢 ngắn hơn chiếc bình đựng hạt đậu 豆 đo chiều dài thấy rõ sự ngắn ngủi."
  },
  "码": {
    "py": "mǎ",
    "hv": "mã",
    "meaning": "mã số; bến tàu",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "石",
        "name": "Bộ Thạch",
        "vi": "hòn đá, khoáng vật",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "马",
        "name": "Bộ Mã",
        "vi": "con ngựa",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "石",
    "mnemonic": "Dùng tảng đá lớn 石 đánh dấu số hiệu buộc ngựa 马 (mǎ) ở bến bãi đếm từng mã số hàng."
  },
  "票": {
    "py": "piào",
    "hv": "phiếu",
    "meaning": "vé, phiếu",
    "strokes": 11,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "覀",
        "name": "Bộ Á",
        "vi": "phía tây, cái sàng che đậy",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "示",
        "name": "Bộ Thị",
        "vi": "thần linh, cúng lễ, hiển thị",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "示",
    "mnemonic": "Đặt đồ tế tự 示 dâng lên phương tây 覀 để nhận lấy chiếc vé chứng nhận thông hành qua cửa."
  },
  "离": {
    "py": "lí",
    "hv": "ly",
    "meaning": "cách (khoảng cách); rời xa",
    "strokes": 10,
    "structure": "độc thể",
    "parts": [],
    "radical": "禸",
    "mnemonic": "Con thú hoang chạy trốn khỏi lưới săn nhảy tót vào rừng sâu rời xa bẫy rập của thợ săn."
  },
  "租": {
    "py": "zū",
    "hv": "tô",
    "meaning": "thuê, cho thuê",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "禾",
        "name": "Bộ Hòa",
        "vi": "cây lúa trĩu hạt",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "且",
        "name": "Chữ Thả",
        "vi": "hơn nữa, còn (âm qiě)",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "禾",
    "mnemonic": "Mang bó lúa giống 禾 đặt lên giá cúng 且 để trả tiền thuê mảnh đất canh tác cho chủ điền."
  },
  "空": {
    "py": "kōng",
    "hv": "không",
    "meaning": "trống rỗng; bầu trời",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "穴",
        "name": "Bộ Huyệt",
        "vi": "hang động, hố sâu",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "工",
        "name": "Bộ Công",
        "vi": "công cụ, việc làm thợ",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "穴",
    "mnemonic": "Hang đá sâu 穴 nơi người thợ xây xưởng 工 trống rỗng ngước nhìn lên chỉ thấy khoảng trời bao la."
  },
  "穿": {
    "py": "chuān",
    "hv": "xuyên",
    "meaning": "mặc (áo), xỏ (giày); xuyên qua",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "穴",
        "name": "Bộ Huyệt",
        "vi": "hang động, hố sâu",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "牙",
        "name": "Bộ Nha",
        "vi": "răng hàm đan cài",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "穴",
    "mnemonic": "Răng nanh thú 牙 cắn thủng hang đất 穴 xuyên qua vách đá chui ra ngoài mặc áo ấm lên người."
  },
  "窗": {
    "py": "chuāng",
    "hv": "song",
    "meaning": "cửa sổ",
    "strokes": 12,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "穴",
        "name": "Bộ Huyệt",
        "vi": "hang động, hố sâu",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "囱",
        "name": "Chữ Song",
        "vi": "ống khói, cửa sổ thông gió",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "穴",
    "mnemonic": "Khoét một lỗ hổng hang đá 穴 phía trên ống khói 囱 để mở ra ô cửa sổ đón gió mát."
  },
  "站": {
    "py": "zhàn",
    "hv": "trạm",
    "meaning": "đứng; bến xe, nhà ga",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "立",
        "name": "Bộ Lập",
        "vi": "người đứng vững trên mặt đất",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "占",
        "name": "Chữ Chiêm",
        "vi": "bói toán mu rùa; chiếm giữ (âm zhān)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "立",
    "mnemonic": "Đứng 立 thẳng người chiếm 占 (zhān gần zhàn) một chỗ ngay ngắn tại nhà ga chờ đón xe khách tới."
  },
  "笑": {
    "py": "xiào",
    "hv": "tiếu",
    "meaning": "cười, mỉm cười",
    "strokes": 10,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "⺮",
        "name": "Bộ Trúc đầu",
        "vi": "tre trúc, dụng cụ đan lát",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "夭",
        "name": "Chữ Yểu",
        "vi": "uốn éo, tươi non",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "⺮",
    "mnemonic": "Rặng tre trúc ⺮ đung đưa uốn lượn 夭 theo ngọn gió như đang cất tiếng cười khúc khích vui tươi."
  },
  "笔": {
    "py": "bǐ",
    "hv": "bút",
    "meaning": "cây bút",
    "strokes": 10,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "⺮",
        "name": "Bộ Trúc đầu",
        "vi": "tre trúc, dụng cụ đan lát",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "毛",
        "name": "Bộ Mao",
        "vi": "lông vũ, sợi tóc",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "⺮",
    "mnemonic": "Thân làm từ ống tre ⺮ rỗng gắn thêm chùm lông thú 毛 mềm mại vuốt nhọn thành cây bút viết."
  },
  "等": {
    "py": "děng",
    "hv": "đẳng",
    "meaning": "chờ đợi; đẳng cấp, vân vân",
    "strokes": 12,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "⺮",
        "name": "Bộ Trúc đầu",
        "vi": "tre trúc, dụng cụ đan lát",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "寺",
        "name": "Chữ Tự",
        "vi": "chốn chùa chiền, quy củ (âm sì)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "⺮",
    "mnemonic": "Cầm thẻ tre ⺮ đứng trước cổng ngôi chùa cổ 寺 kiên nhẫn chờ đợi vị sư thầy ra mở cửa."
  },
  "简": {
    "py": "jiǎn",
    "hv": "giản",
    "meaning": "đơn giản, lá tre viết chữ",
    "strokes": 13,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "⺮",
        "name": "Bộ Trúc đầu",
        "vi": "tre trúc, dụng cụ đan lát",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "间",
        "name": "Chữ Gian",
        "vi": "gian phòng, khoảng giữa",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "⺮",
    "mnemonic": "Từng thanh thẻ tre ⺮ xếp cách đều khoảng trống 间 viết chữ đơn giản giúp người đọc dễ hiểu."
  },
  "算": {
    "py": "suàn",
    "hv": "toán",
    "meaning": "tính toán, coi như",
    "strokes": 14,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "⺮",
        "name": "Bộ Trúc đầu",
        "vi": "tre trúc, dụng cụ đan lát",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "具",
        "name": "Chữ Cụ",
        "vi": "dụng cụ, đồ dùng",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "⺮",
    "mnemonic": "Dùng bàn tính bằng tre ⺮ cùng bộ công cụ 具 đầy đủ để gảy hạt tính toán sổ sách thu chi."
  },
  "篮": {
    "py": "lán",
    "hv": "lam",
    "meaning": "cái rổ, bóng rổ",
    "strokes": 16,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "⺮",
        "name": "Bộ Trúc đầu",
        "vi": "tre trúc, dụng cụ đan lát",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "监",
        "name": "Chữ Giám",
        "vi": "soi gương chậu nước, giám sát",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "⺮",
    "mnemonic": "Đan những thanh tre ⺮ chắc chắn dưới sự giám sát 监 (jiān gần lán) kỹ lưỡng tạo thành chiếc rổ bền."
  },
  "米": {
    "py": "mǐ",
    "hv": "mễ",
    "meaning": "gạo; mét (đơn vị đo)",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "米",
    "mnemonic": "Bốn hạt thóc vàng rơi vãi bốn góc quanh cọng rơm khô tạo thành những hạt gạo thơm dẻo."
  },
  "系": {
    "py": "xì",
    "hv": "hệ",
    "meaning": "hệ thống, quan hệ",
    "strokes": 7,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "丿",
        "name": "Bộ Phiệt",
        "vi": "nét phẩy nghiêng trái",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "糸",
        "name": "Bộ Mịch",
        "vi": "sợi tơ tằm, dây lụa",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "糸",
    "mnemonic": "Cầm dao phẩy 丿 cắt đứt cuộn tơ lụa 糸 để sắp xếp lại hệ thống các mối quan hệ chặt chẽ."
  },
  "红": {
    "py": "hóng",
    "hv": "hồng",
    "meaning": "màu đỏ",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "纟",
        "name": "Bộ Mịch (tơ)",
        "vi": "sợi tơ, dây sợi nối liền",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "工",
        "name": "Bộ Công",
        "vi": "công cụ, việc làm thợ",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "纟",
    "mnemonic": "Dùng sợi tơ tằm 纟 mịn màng nhuộm qua bàn tay người thợ Công 工 tạo nên màu đỏ tươi thắm."
  },
  "纸": {
    "py": "zhǐ",
    "hv": "chỉ",
    "meaning": "tờ giấy",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "纟",
        "name": "Bộ Mịch (tơ)",
        "vi": "sợi tơ, dây sợi nối liền",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "氏",
        "name": "Bộ Thị",
        "vi": "dòng họ, thị tộc",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "纟",
    "mnemonic": "Từng sợi tơ 纟 ép phẳng trên khuôn dập của dòng họ Thị 氏 làm ra tờ giấy trắng tinh khôi."
  },
  "细": {
    "py": "xì",
    "hv": "tế",
    "meaning": "nhỏ bé, tỉ mỉ",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "纟",
        "name": "Bộ Mịch (tơ)",
        "vi": "sợi tơ, dây sợi nối liền",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "田",
        "name": "Bộ Điền",
        "vi": "ruộng đồng, đất canh tác",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "纟",
    "mnemonic": "Sợi chỉ tơ 纟 mỏng manh như ranh giới chia từng ô ruộng 田 nhỏ li ti vô cùng tỉ mỉ."
  },
  "绍": {
    "py": "shào",
    "hv": "thiệu",
    "meaning": "tiếp nối, giới thiệu",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "纟",
        "name": "Bộ Mịch (tơ)",
        "vi": "sợi tơ, dây sợi nối liền",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "召",
        "name": "Chữ Triệu",
        "vi": "mở miệng kêu gọi, triệu tập (âm zhào)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "纟",
    "mnemonic": "Nối sợi tơ lụa 纟 bền chặt theo lời kêu gọi triệu tập 召 (zhào gần shào) để giới thiệu người tài."
  },
  "经": {
    "py": "jīng",
    "hv": "kinh",
    "meaning": "kinh qua, trải qua (trong 经常)",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "纟",
        "name": "Bộ Mịch",
        "vi": "sợi tơ, sợi dây liên kết",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "圣",
        "name": "Chữ Thánh",
        "vi": "khéo léo, bền bỉ (mượn âm)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "纟",
    "mnemonic": "Dệt sợi tơ 纟 qua khuôn dệt của bậc thánh nhân 圣 ghi lại những trải nghiệm kinh qua trong đời."
  },
  "给": {
    "py": "gěi",
    "hv": "cấp",
    "meaning": "cho, đưa cho, tặng",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "纟",
        "name": "Bộ Mịch (tơ)",
        "vi": "sợi tơ, dây sợi nối liền",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "合",
        "name": "Chữ Hợp",
        "vi": "phù hợp, hợp lại",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "纟",
    "mnemonic": "Buộc cuộn chỉ tơ 纟 vào chiếc hộp đóng kín hợp 合 lại mang đi trao tặng cho bạn bè thân thiết."
  },
  "绿": {
    "py": "lǜ",
    "hv": "lục",
    "meaning": "màu xanh lá cây",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "纟",
        "name": "Bộ Mịch (tơ)",
        "vi": "sợi tơ, dây sợi nối liền",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "录",
        "name": "Chữ Lục",
        "vi": "khắc ghi, múc nước lọc (âm lù)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "纟",
    "mnemonic": "Nhuộm sợi tơ 纟 bằng nước lá cây khắc ghi vào cuốn sổ lục 录 (lù gần lǜ) ra màu xanh lá."
  },
  "美": {
    "py": "měi",
    "hv": "mỹ",
    "meaning": "xinh đẹp, hoàn mỹ",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "羊",
        "name": "Bộ Dương",
        "vi": "con cừu, con dê có sừng",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "大",
        "name": "Bộ Đại",
        "vi": "người giang tay to lớn",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "羊",
    "mnemonic": "Con cừu 羊 béo mập to lớn 大 bước đi trên đồng cỏ xanh rờn toát lên vẻ đẹp xinh mỹ miều."
  },
  "老": {
    "py": "lǎo",
    "hv": "lão",
    "meaning": "già, người già; họ Lão",
    "strokes": 6,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "耂",
        "name": "Bộ Lão",
        "vi": "người già chống gậy",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "匕",
        "name": "Bộ Chủy",
        "vi": "cái thìa; người ngồi",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "老",
    "mnemonic": "Cụ già tóc bạc 耂 chống gậy lê từng bước chân chậm chạp tựa chiếc thìa 匕 cong queo bên thềm nhà."
  },
  "聊": {
    "py": "liáo",
    "hv": "liêu",
    "meaning": "trò chuyện, tán gẫu",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "耳",
        "name": "Bộ Nhĩ",
        "vi": "tai nghe ngóng",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "卯",
        "name": "Chữ Mão",
        "vi": "chi Mão; cửa mở đôi (âm mǎo)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "耳",
    "mnemonic": "Ghé sát vành tai 耳 lắng nghe tiếng chuông báo giờ Mão 卯 rộn ràng cùng nhau ngồi tán gẫu chuyện trò."
  },
  "脑": {
    "py": "nǎo",
    "hv": "não",
    "meaning": "bộ não, trí não",
    "strokes": 10,
    "structure": "độc thể",
    "parts": [],
    "radical": "⺼",
    "mnemonic": "Vỏ sọ bảo vệ khối óc thông minh giúp con người suy nghĩ và ghi nhớ bao điều hiểu biết sâu rộng."
  },
  "脸": {
    "py": "liǎn",
    "hv": "kiểm",
    "meaning": "khuôn mặt",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "⺼",
        "name": "Bộ Nhục (thịt)",
        "vi": "thịt, bộ phận cơ thể",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "佥",
        "name": "Chữ Thiêm",
        "vi": "tất cả mọi người, cùng nhau",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "⺼",
    "mnemonic": "Lớp da thịt ⺼ trên khuôn mặt biến đổi sắc thái khi tất cả mọi người 佥 (qiān gần liǎn) cùng nhìn."
  },
  "自": {
    "py": "zì",
    "hv": "tự",
    "meaning": "tự mình, từ đâu đến",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "自",
    "mnemonic": "Ngón tay trỏ chỉ thẳng vào giữa sống mũi của mình để khẳng định tự bản thân mình làm ra."
  },
  "舍": {
    "py": "shě",
    "hv": "xá",
    "meaning": "nhà ở, ký túc xá",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "人",
        "name": "Bộ Nhân",
        "vi": "người, nhân loại",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "舌",
        "name": "Bộ Thiệt",
        "vi": "cái lưỡi thè ra khỏi miệng",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "舌",
    "mnemonic": "Mọi người 人 cùng tụ họp cất tiếng nói bằng lưỡi 舌 sinh sống chan hòa trong một khu nhà ở."
  },
  "舒": {
    "py": "shū",
    "hv": "thư",
    "meaning": "thư thái, dễ chịu",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "舍",
        "name": "Chữ Xá",
        "vi": "nhà ở, ký túc xá",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "予",
        "name": "Chữ Dư",
        "vi": "cho đi, ban tặng (âm yǔ)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "舌",
    "mnemonic": "Bước vào gian nhà 舍 ấm cúng nhận món quà trao tặng 予 (yǔ gần shū) lòng thấy khoan khoái thư thái."
  },
  "舞": {
    "py": "wǔ",
    "hv": "vũ",
    "meaning": "khiêu vũ, nhảy múa",
    "strokes": 14,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "無",
        "name": "Chữ Vô",
        "vi": "không có, trống không",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "舛",
        "name": "Bộ Suyễn",
        "vi": "hai bàn chân quay ngược nhau",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "舛",
    "mnemonic": "Vũ công vung tay áo múa lượn duyên dáng 无 bước chân đan chéo 舛 nhịp nhàng trong điệu khiêu vũ say đắm."
  },
  "色": {
    "py": "sè",
    "hv": "sắc",
    "meaning": "màu sắc, dung mạo",
    "strokes": 6,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "⺈",
        "name": "Bộ Đao nằm",
        "vi": "con dao nhỏ bên trên",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "巴",
        "name": "Chữ Ba",
        "vi": "con trăn bám chặt, mong mỏi (âm bā)",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "色",
    "mnemonic": "Lưỡi dao ⺈ cạo nhẹ chiếc đuôi rắn 巴 đổi màu lấp lánh phản chiếu đủ sắc màu rực rỡ dưới nắng."
  },
  "苹": {
    "py": "píng",
    "hv": "bình",
    "meaning": "quả táo (trong 苹果)",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "艹",
        "name": "Bộ Thảo đầu",
        "vi": "cỏ cây, hoa lá",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "平",
        "name": "Chữ Bình",
        "vi": "bằng phẳng, bình yên",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "艹",
    "mnemonic": "Cành lá cỏ xanh 艹 che chở quả chín tròn trên mặt đất bằng phẳng 平 (píng) tạo nên quả táo ngọt."
  },
  "茶": {
    "py": "chá",
    "hv": "trà",
    "meaning": "lá chè, trà",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "艹",
        "name": "Bộ Thảo",
        "vi": "lá chè non, cây cỏ",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "人",
        "name": "Bộ Nhân",
        "vi": "con người hái chè",
        "pos": "giữa",
        "role": "nghĩa"
      },
      {
        "c": "木",
        "name": "Bộ Mộc",
        "vi": "thân cây chè",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "艹",
    "mnemonic": "Dưới vòm cây gỗ 木 người 人 đưa tay hái những búp non cỏ 艹 pha ấm trà xanh ngát hương thơm."
  },
  "草": {
    "py": "cǎo",
    "hv": "thảo",
    "meaning": "cỏ cây",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "艹",
        "name": "Bộ Thảo đầu",
        "vi": "cỏ cây, hoa lá",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "早",
        "name": "Chữ Tảo",
        "vi": "buổi sáng, sớm",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "艹",
    "mnemonic": "Dưới ánh nắng sớm 早 tinh sương những ngọn cỏ non 艹 đâm chồi vươn lên xanh mướt khắp sườn đồi."
  },
  "药": {
    "py": "yào",
    "hv": "dược",
    "meaning": "thuốc uống",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "艹",
        "name": "Bộ Thảo đầu",
        "vi": "cỏ cây, hoa lá",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "约",
        "name": "Chữ Ước",
        "vi": "sợi dây buộc ước hẹn (âm yuē)",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "艹",
    "mnemonic": "Dùng cây cỏ thuốc 艹 sắc thành thang nước hẹn ước 约 (yuē gần yào) uống đúng giờ chữa lành bệnh tật."
  },
  "菜": {
    "py": "cài",
    "hv": "thái",
    "meaning": "món ăn; rau củ",
    "strokes": 11,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "艹",
        "name": "Bộ Thảo đầu",
        "vi": "cỏ cây, hoa lá",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "采",
        "name": "Chữ Thải",
        "vi": "bàn tay hái quả trên cây (âm cǎi)",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "艹",
    "mnemonic": "Đôi bàn tay hái 采 những ngọn rau cỏ 艹 tươi non mang về nấu thành món ăn thơm ngon bổ dưỡng."
  },
  "蓝": {
    "py": "lán",
    "hv": "lam",
    "meaning": "màu xanh da trời",
    "strokes": 13,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "艹",
        "name": "Bộ Thảo đầu",
        "vi": "cỏ cây, hoa lá",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "监",
        "name": "Chữ Giám",
        "vi": "soi gương chậu nước, giám sát",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "艹",
    "mnemonic": "Dùng lá cỏ chàm 艹 nấu trong vạc dưới sự giám sát 监 (jiān gần lán) chiết ra màu xanh da trời."
  },
  "蕉": {
    "py": "jiāo",
    "hv": "tiêu",
    "meaning": "quả chuối (trong 香蕉)",
    "strokes": 15,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "艹",
        "name": "Bộ Thảo đầu",
        "vi": "cỏ cây, hoa lá",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "焦",
        "name": "Chữ Tiêu",
        "vi": "chim bị lửa nướng cháy sém (âm jiāo)",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "艹",
    "mnemonic": "Bụi cây cỏ 艹 mọc bên đống lửa nung cháy sém 焦 (jiāo) trĩu xuống những nải chuối vàng ươm ngọt lịm."
  },
  "街": {
    "py": "jiē",
    "hv": "nhai",
    "meaning": "đường phố",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "行",
        "name": "Bộ Hành",
        "vi": "ngã tư đường đi lại bốn phương (âm xíng)",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "圭",
        "name": "Chữ Khuê",
        "vi": "ngọc khuê của vua ban (âm guī)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "行",
    "mnemonic": "Dòng người qua lại 行 nhộn nhịp hai bên bờ đất đắp cao 圭 tạo nên một con đường phố sầm uất."
  },
  "衣": {
    "py": "yī",
    "hv": "y",
    "meaning": "quần áo, trang phục",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "衣",
    "mnemonic": "Cổ áo xẻ tà với hai tay áo dài thướt tha buông rủ xuống che kín toàn thân người mặc ấm áp."
  },
  "表": {
    "py": "biǎo",
    "hv": "biểu",
    "meaning": "đồng hồ; biểu thị, bề ngoài",
    "strokes": 8,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "毛",
        "name": "Bộ Mao",
        "vi": "lông vũ, sợi tóc",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "衣",
        "name": "Bộ Y",
        "vi": "quần áo, trang phục che thân",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "衣",
    "mnemonic": "Bộ lông thú 毛 may liền với vạt áo dài 衣 để lộ ra vẻ bề ngoài sang trọng chiếc đồng hồ."
  },
  "衫": {
    "py": "shān",
    "hv": "sam",
    "meaning": "áo sơ mi, áo cánh",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "衤",
        "name": "Bộ Y đứng",
        "vi": "quần áo, vải vóc",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "彡",
        "name": "Bộ Sam",
        "vi": "lông tóc mượt, hoa văn đẹp",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "衤",
    "mnemonic": "Vạt áo vải 衤 may thêm ba dải tua rua lụa 彡 thướt tha biến thành chiếc áo sơ mi thanh lịch."
  },
  "衬": {
    "py": "chèn",
    "hv": "sấn",
    "meaning": "lót trong, áo lót (trong 衬衫)",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "衤",
        "name": "Bộ Y đứng",
        "vi": "quần áo, vải vóc",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "寸",
        "name": "Bộ Thốn",
        "vi": "tấc, đo lường khoảng cách ngắn",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "衤",
    "mnemonic": "Đo từng tấc 寸 thước vải may lớp áo 衤 lót bên trong ôm sát ngực giữ ấm cho cơ thể người."
  },
  "袋": {
    "py": "dài",
    "hv": "đại",
    "meaning": "túi, bao bì",
    "strokes": 11,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "代",
        "name": "Chữ Đại",
        "vi": "thay thế, thời đại (âm dài)",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "衣",
        "name": "Bộ Y",
        "vi": "quần áo, trang phục che thân",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "衣",
    "mnemonic": "Lớp vải áo 衣 của người thay thế 代 (dài) may túm đáy lại thành chiếc túi xách đựng đồ đạc."
  },
  "裤": {
    "py": "kù",
    "hv": "khố",
    "meaning": "cái quần",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "衤",
        "name": "Bộ Y đứng",
        "vi": "quần áo, vải vóc",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "库",
        "name": "Chữ Khố",
        "vi": "nhà kho chứa xe cộ (âm kù)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "衤",
    "mnemonic": "Vải vóc áo quần 衤 cất trong kho chứa 库 (kù) may thành chiếc quần dài mặc vừa vặn đôi chân bước."
  },
  "西": {
    "py": "xī",
    "hv": "tây",
    "meaning": "phía tây, hướng tây",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "西",
    "mnemonic": "Con chim non bay về tổ ấm đậu trên cành khi mặt trời lặn dần về phía phương tây xa thẳm."
  },
  "要": {
    "py": "yào",
    "hv": "yếu",
    "meaning": "muốn, cần phải, sẽ",
    "strokes": 9,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "覀",
        "name": "Bộ Á",
        "vi": "phía tây, cái sàng che đậy",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "女",
        "name": "Bộ Nữ",
        "vi": "phụ nữ, con gái",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "覀",
    "mnemonic": "Người phụ nữ 女 che chiếc nón hướng tây 覀 đứng trước ngã ba đường suy nghĩ muốn chọn hướng đi nào."
  },
  "见": {
    "py": "jiàn",
    "hv": "kiến",
    "meaning": "gặp gỡ, nhìn thấy",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "见",
    "mnemonic": "Đôi mắt mở to tròn nhìn ngắm phía trên đôi chân dài bước tới gặp gỡ bạn bè thân thiết ngoài phố."
  },
  "视": {
    "py": "shì",
    "hv": "thị",
    "meaning": "nhìn ngắm, thị giác",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "礻",
        "name": "Bộ Thị",
        "vi": "thần linh, chúc phúc",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "见",
        "name": "Chữ Kiến",
        "vi": "gặp gỡ, nhìn thấy",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "见",
    "mnemonic": "Đôi mắt nhìn thấy 见 rõ mâm cúng bàn thờ thần linh 礻 để quan sát và theo dõi mọi sự việc."
  },
  "觉": {
    "py": "jué",
    "hv": "giác",
    "meaning": "cảm giác; ngủ (trong 觉得, 睡觉)",
    "strokes": 9,
    "structure": "trên-giữa-dưới",
    "parts": [
      {
        "c": "⺍",
        "name": "Bộ Hào biến thể",
        "vi": "học hỏi, rèn luyện trí tuệ",
        "pos": "trên",
        "role": "âm"
      },
      {
        "c": "冖",
        "name": "Bộ Mịch",
        "vi": "mái che, trùm kín",
        "pos": "giữa",
        "role": "âm"
      },
      {
        "c": "见",
        "name": "Chữ Kiến",
        "vi": "gặp gỡ, nhìn thấy",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "见",
    "mnemonic": "Mở mắt nhìn thấy 见 ánh sáng lọt qua mái hiên 冖 của ngôi nhà ⺍ bừng tỉnh cảm nhận được ngày mới."
  },
  "角": {
    "py": "jiǎo",
    "hv": "giác",
    "meaning": "góc; sừng; hào (tiền)",
    "strokes": 7,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "⺈",
        "name": "Bộ Đao nằm",
        "vi": "con dao nhỏ bên trên",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "用",
        "name": "Bộ Dụng",
        "vi": "dùng, sử dụng cái chuông",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "角",
    "mnemonic": "Lưỡi dao ⺈ khía vào góc chiếc sừng trâu dùng 用 làm tù và thổi cất vang góc hào tiền lẻ."
  },
  "认": {
    "py": "rèn",
    "hv": "nhận",
    "meaning": "nhận biết, nhận ra",
    "strokes": 4,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, giao tiếp phát ngôn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "人",
        "name": "Bộ Nhân",
        "vi": "người, nhân loại",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "讠",
    "mnemonic": "Dùng lời nói 讠 ân cần hỏi han để nhận biết diện mạo của từng người quen 人 sau bao năm xa cách."
  },
  "识": {
    "py": "shí",
    "hv": "thức",
    "meaning": "nhận biết, kiến thức",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, giao tiếp phát ngôn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "只",
        "name": "Chữ Chích",
        "vi": "chỉ (duy nhất); con (lượng từ con vật)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "讠",
    "mnemonic": "Lời nói 讠 phân minh rành mạch chỉ rõ duy nhất 只 một điều chứng tỏ có tri thức kiến thức sâu rộng."
  },
  "诉": {
    "py": "sù",
    "hv": "tố",
    "meaning": "kể, báo cho biết (trong 告诉)",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, giao tiếp phát ngôn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "斥",
        "name": "Chữ Xích",
        "vi": "rìu đẽo cây văng dăm, xua đuổi (âm chì)",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "讠",
    "mnemonic": "Cất lời nói 讠 kể lại cặn kẽ chuyện bị quan quân xua đuổi khiển trách 斥 (chì gần sù) cho bạn nghe."
  },
  "词": {
    "py": "cí",
    "hv": "từ",
    "meaning": "từ vựng, lời ca",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, giao tiếp phát ngôn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "司",
        "name": "Chữ Ty",
        "vi": "phụ trách chỉ huy, cơ quan (âm sī)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "讠",
    "mnemonic": "Dùng lời nói 讠 của viên quan phụ trách ti 司 (sī gần cí) trau chuốt thành từng từ ngữ chuẩn xác."
  },
  "试": {
    "py": "shì",
    "hv": "thí",
    "meaning": "thi cử, thử nghiệm",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, giao tiếp phát ngôn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "式",
        "name": "Chữ Thức",
        "vi": "khuôn mẫu theo thước đo (âm shì)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "讠",
    "mnemonic": "Dùng lời nói 讠 hướng dẫn theo đúng khuôn mẫu thức 式 (shì) để bước vào phòng thi thử sức mình."
  },
  "话": {
    "py": "huà",
    "hv": "thoại",
    "meaning": "lời nói, câu chuyện",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, ngôn ngữ",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "舌",
        "name": "Bộ Thiệt",
        "vi": "cái lưỡi uốn lượn phát âm",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "讠",
    "mnemonic": "Lời nói 讠 tuôn trào thành câu chuyện nhờ chiếc lưỡi 舌 uốn lượn nhịp nhàng truyền cảm hứng cho người nghe."
  },
  "语": {
    "py": "yǔ",
    "hv": "ngữ",
    "meaning": "ngôn ngữ, lời nói",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, giao tiếp phát ngôn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "吾",
        "name": "Chữ Ngô",
        "vi": "bản thân ta, miệng ta nói (âm wú)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "讠",
    "mnemonic": "Dùng lời nói 讠 của chính bản thân mình 吾 (wú gần yǔ) diễn đạt suy nghĩ thành ngôn ngữ rõ ràng."
  },
  "说": {
    "py": "shuō",
    "hv": "thuyết",
    "meaning": "nói, trò chuyện",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, trình bày",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "兑",
        "name": "Chữ Đoái",
        "vi": "vui vẻ, cởi mở (âm duì -> shuō)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "讠",
    "mnemonic": "Dùng lời nói 讠 vui vẻ cởi mở như quẻ Đoái 兑 (duì gần shuō) để trò chuyện tâm sự cùng bạn bè."
  },
  "请": {
    "py": "qǐng",
    "hv": "thỉnh",
    "meaning": "xin mời, nhờ vả",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói lịch sự, nhã nhặn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "青",
        "name": "Chữ Thanh",
        "vi": "màu xanh trong sáng (âm qīng -> qǐng)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "讠",
    "mnemonic": "Cất lời nói 讠 nhẹ nhàng trong sáng như màu trời thanh 青 (qīng gần qǐng) xin mời quý khách bước vào."
  },
  "读": {
    "py": "dú",
    "hv": "độc",
    "meaning": "đọc sách, xem",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, giao tiếp phát ngôn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "卖",
        "name": "Chữ Mại",
        "vi": "bán",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "讠",
    "mnemonic": "Dùng lời nói 讠 cất giọng đọc to từng tấm biển bán 卖 hàng giữa khu chợ đông đúc."
  },
  "课": {
    "py": "kè",
    "hv": "khóa",
    "meaning": "bài học, tiết học",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, giao tiếp phát ngôn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "果",
        "name": "Chữ Quả",
        "vi": "hoa quả, kết quả",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "讠",
    "mnemonic": "Dùng lời nói 讠 giảng giải về các loại hoa quả 果 thu hoạch được trong tiết học sinh học sáng nay."
  },
  "谁": {
    "py": "shuí",
    "hv": "thùy",
    "meaning": "ai (đại từ nghi vấn)",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, giao tiếp phát ngôn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "隹",
        "name": "Bộ Chuy",
        "vi": "chim đuôi ngắn",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "讠",
    "mnemonic": "Cất lời nói 讠 hỏi xem con chim nhỏ 隹 (zhuī gần shuí) đậu bên rèm cửa kia là của ai."
  },
  "调": {
    "py": "diào",
    "hv": "điều",
    "meaning": "điều hòa, chỉnh; âm điệu (trong 空调)",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, giao tiếp phát ngôn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "周",
        "name": "Chữ Chu",
        "vi": "tuần; chu vi",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "讠",
    "mnemonic": "Dùng lời nói 讠 thảo luận kỹ lưỡng khắp chu vi 周 (zhōu gần diào) để điều chỉnh mức nhiệt độ máy lạnh."
  },
  "谢": {
    "py": "xiè",
    "hv": "tạ",
    "meaning": "cảm ơn, tạ ơn",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "讠",
        "name": "Bộ Ngôn",
        "vi": "lời nói, ngôn ngữ chân thành",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "射",
        "name": "Chữ Xạ",
        "vi": "bắn tên, giãi bày (âm shè -> xiè)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "讠",
    "mnemonic": "Dùng lời nói 讠 chân thành tạ ơn người bắn cung tên 射 (shè gần xiè) đã giúp đỡ săn bắn thành công."
  },
  "贵": {
    "py": "guì",
    "hv": "quý",
    "meaning": "đắt, quý giá; quý báu",
    "strokes": 9,
    "structure": "độc thể",
    "parts": [],
    "radical": "贝",
    "mnemonic": "Chiếc hòm đựng đầy vỏ sò ốc quý giá mang ra chợ trao đổi hàng hóa đắt tiền sang trọng."
  },
  "走": {
    "py": "zǒu",
    "hv": "tẩu",
    "meaning": "đi bộ, rời bước",
    "strokes": 7,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "土",
        "name": "Bộ Thổ",
        "vi": "đất đai, thổ nhưỡng",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "止",
        "name": "Bộ Chỉ",
        "vi": "bàn chân dừng lại, đình chỉ",
        "pos": "dưới",
        "role": "nghĩa"
      }
    ],
    "radical": "走",
    "mnemonic": "Đôi chân dừng chân 止 trên nền đất cát 土 rồi chuẩn bị cất bước đi bộ tiếp tục hành trình dài."
  },
  "起": {
    "py": "qǐ",
    "hv": "khởi",
    "meaning": "thức dậy; bắt đầu; khởi hành",
    "strokes": 10,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "走",
        "name": "Bộ Tẩu",
        "vi": "chạy bộ, đi xa",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "己",
        "name": "Bộ Kỷ",
        "vi": "bản thân mình",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "走",
    "mnemonic": "Nhấc chân bước đi 走 tự bản thân 己 vùng vẫy thức dậy khỏi giường bắt đầu ngày làm việc mới."
  },
  "超": {
    "py": "chāo",
    "hv": "siêu",
    "meaning": "vượt qua, siêu việt",
    "strokes": 12,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "走",
        "name": "Bộ Tẩu",
        "vi": "chạy bộ, đi xa",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "召",
        "name": "Chữ Triệu",
        "vi": "mở miệng kêu gọi, triệu tập (âm zhào)",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "走",
    "mnemonic": "Cất bước chân đi 走 thật nhanh theo tiếng gọi triệu tập 召 (zhào gần chāo) để vượt qua đối thủ."
  },
  "越": {
    "py": "yuè",
    "hv": "việt",
    "meaning": "vượt qua; nước Việt Nam",
    "strokes": 12,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "走",
        "name": "Bộ Tẩu",
        "vi": "chạy bộ, đi xa",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "戉",
        "name": "Chữ Việt",
        "vi": "cái rìu lớn uy nghiêm",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "走",
    "mnemonic": "Vung chiếc rìu chiến 戉 sải bước chân dài 走 tiến lên phía trước vượt qua biên giới nước Việt."
  },
  "足": {
    "py": "zú",
    "hv": "túc",
    "meaning": "bàn chân; đầy đủ",
    "strokes": 7,
    "structure": "độc thể",
    "parts": [],
    "radical": "足",
    "mnemonic": "Đôi chân vững chãi với khớp gối và bàn chân bước đi dẻo dai đáp ứng đầy đủ sức lực."
  },
  "跑": {
    "py": "pǎo",
    "hv": "bào",
    "meaning": "chạy bộ",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "足",
        "name": "Bộ Túc",
        "vi": "bàn chân, bước chân",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "包",
        "name": "Chữ Bao",
        "vi": "gói, túi xách; bao bọc",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "足",
    "mnemonic": "Đôi chân 足 guồng nhanh như gió ôm trọn chiếc bao bọc 包 (bāo gần pǎo) hàng chạy bộ về đích."
  },
  "跟": {
    "py": "gēn",
    "hv": "cân",
    "meaning": "cùng với; gót chân",
    "strokes": 13,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "足",
        "name": "Bộ Túc",
        "vi": "bàn chân, bước chân",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "艮",
        "name": "Bộ Cấn",
        "vi": "ngoảnh lại nhìn trừng trừng",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "足",
    "mnemonic": "Đôi chân 足 bước theo sau gót chân ngoảnh nhìn lại 艮 (gèn lái gēn) của người bạn đồng hành."
  },
  "路": {
    "py": "lù",
    "hv": "lộ",
    "meaning": "con đường",
    "strokes": 13,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "足",
        "name": "Bộ Túc",
        "vi": "bàn chân, bước chân",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "各",
        "name": "Chữ Các",
        "vi": "chân bước đến miệng nói, mỗi người (âm gè)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "足",
    "mnemonic": "Đôi bàn chân 足 của mỗi Các 各 (gè gần lù) người qua lại dẫm mòn đất tạo nên con đường lớn."
  },
  "跳": {
    "py": "tiào",
    "hv": "khiêu",
    "meaning": "nhảy lên, bật nhảy",
    "strokes": 13,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "足",
        "name": "Bộ Túc",
        "vi": "bàn chân, bước chân",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "兆",
        "name": "Chữ Triệu",
        "vi": "vết nứt điềm báo; triệu (âm zhào)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "足",
    "mnemonic": "Dồn sức vào đôi chân 足 bật nhảy lên cao khi nhìn thấy triệu 兆 (zhào gần tiào) chứng nguy hiểm."
  },
  "踢": {
    "py": "tī",
    "hv": "thích",
    "meaning": "đá (bóng)",
    "strokes": 15,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "足",
        "name": "Bộ Túc",
        "vi": "bàn chân, bước chân",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "易",
        "name": "Chữ Dịch",
        "vi": "thằn lằn đổi màu, dễ dàng biến đổi (âm yì)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "足",
    "mnemonic": "Đưa bàn chân 足 vung một cú thật dễ dàng 易 (yì gần tī) đá bay quả bóng tròn vào lưới."
  },
  "身": {
    "py": "shēn",
    "hv": "thân",
    "meaning": "thân thể, cơ thể",
    "strokes": 7,
    "structure": "độc thể",
    "parts": [],
    "radical": "身",
    "mnemonic": "Thân hình người phụ nữ mang bầu nở nang với phần bụng nhô to che chở mầm sống thai nhi."
  },
  "车": {
    "py": "chē",
    "hv": "xa",
    "meaning": "xe cộ",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "车",
    "mnemonic": "Thùng xe vuông vức với trục bánh xe hai bên quay tít đưa người và hàng hóa bon bon chạy."
  },
  "边": {
    "py": "biān",
    "hv": "biên",
    "meaning": "bên cạnh, phía biên giới",
    "strokes": 5,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "力",
        "name": "Bộ Lực",
        "vi": "sức lực, sức mạnh",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "辶",
    "mnemonic": "Dồn hết sức lực 力 bước đi 辶 men theo triền đồi giáp ranh giới bên cạnh bờ suối vắng."
  },
  "过": {
    "py": "guò",
    "hv": "quá",
    "meaning": "qua, trải qua; từng (làm gì)",
    "strokes": 6,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "寸",
        "name": "Bộ Thốn",
        "vi": "tấc, đo lường khoảng cách ngắn",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "辶",
    "mnemonic": "Cất bước chân đi 辶 qua từng tấc đất 寸 để trải nghiệm và vượt qua thử thách gian nan."
  },
  "迎": {
    "py": "yíng",
    "hv": "nghênh",
    "meaning": "nghênh đón, chào đón",
    "strokes": 7,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "卬",
        "name": "Chữ Ngang",
        "vi": "ngẩng cao đầu hướng lên",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "辶",
    "mnemonic": "Rảo bước chân đi 辶 ngẩng đầu trông ngóng 卬 (áng gần yíng) để nghênh đón người thân đi xa trở về."
  },
  "运": {
    "py": "yùn",
    "hv": "vận",
    "meaning": "vận chuyển; vận may",
    "strokes": 7,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "云",
        "name": "Chữ Vân",
        "vi": "mây trời bồng bềnh (âm yún)",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "辶",
    "mnemonic": "Bước chân đi 辶 nhanh nhẹn tựa đám mây 云 trôi vận chuyển hàng hóa mang theo vận may tài lộc."
  },
  "近": {
    "py": "jìn",
    "hv": "cận",
    "meaning": "gần gũi, vừa mới",
    "strokes": 7,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "斤",
        "name": "Bộ Cân",
        "vi": "cái rìu đốn cây, đơn vị cân",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "辶",
    "mnemonic": "Cầm chiếc rìu đốn củi 斤 rảo bước đi 辶 một đoạn ngắn là đến rất gần bìa rừng xanh."
  },
  "还": {
    "py": "hái",
    "hv": "hoàn",
    "meaning": "vẫn, còn; trả lại",
    "strokes": 7,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "不",
        "name": "Chữ Bất",
        "vi": "không (phủ định)",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "辶",
    "mnemonic": "Cất bước chân đi 辶 dù việc chẳng 不 thành vẫn còn quay trở lại đem trả lại món đồ mượn."
  },
  "这": {
    "py": "zhè",
    "hv": "giá",
    "meaning": "đây, này",
    "strokes": 7,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "文",
        "name": "Bộ Văn",
        "vi": "văn tự, hoa văn trang nhã",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "辶",
    "mnemonic": "Mang tập tài liệu văn bản 文 trên đường đi 辶 trao tận tay người nhận ngay tại chỗ này."
  },
  "进": {
    "py": "jìn",
    "hv": "tiến",
    "meaning": "vào, tiến vào",
    "strokes": 7,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "井",
        "name": "Chữ Tỉnh",
        "vi": "giếng nước vuông vắn (âm jǐng)",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "辶",
    "mnemonic": "Băng qua bờ giếng 井 sâu bước chân 辶 tiến thẳng vào bên trong khoảng sân gạch râm mát."
  },
  "远": {
    "py": "yuǎn",
    "hv": "viễn",
    "meaning": "xa xôi",
    "strokes": 7,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "元",
        "name": "Chữ Nguyên",
        "vi": "đồng nhân dân tệ, nguồn gốc",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "辶",
    "mnemonic": "Lên đường cất bước đi 辶 biền biệt từ thuở đầu tiên 元 (yuán gần yuǎn) tới tận thảo nguyên xa xôi."
  },
  "迟": {
    "py": "chí",
    "hv": "trì",
    "meaning": "chậm trễ, muộn (trong 迟到)",
    "strokes": 7,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "尺",
        "name": "Chữ Xích",
        "vi": "cây thước đo gang tay (âm chǐ)",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "辶",
    "mnemonic": "Bước chân đi 辶 ngập ngừng chậm chạp đo từng thước 尺 (chǐ gần chí) đất nên bị chậm trễ giờ hẹn."
  },
  "适": {
    "py": "shì",
    "hv": "thích",
    "meaning": "thích hợp, vừa vặn",
    "strokes": 9,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "舌",
        "name": "Bộ Thiệt",
        "vi": "cái lưỡi thè ra khỏi miệng",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "辶",
    "mnemonic": "Rảo bước chân đi 辶 nếm vị ngọt ngào nơi đầu lưỡi 舌 thấy món canh này rất thích hợp khẩu vị."
  },
  "通": {
    "py": "tōng",
    "hv": "thông",
    "meaning": "thông suốt, liên lạc",
    "strokes": 10,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "甬",
        "name": "Chữ Dũng",
        "vi": "lối đi có mái che, chuông đồng",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "辶",
    "mnemonic": "Bước chân đi 辶 qua chiếc chuông lệnh dũng cảm 甬 (yǒng gần tōng) giúp con đường thông suốt không tắc nghẽn."
  },
  "逛": {
    "py": "guàng",
    "hv": "cuống",
    "meaning": "dạo chơi, đi dạo",
    "strokes": 10,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "辶",
        "name": "Bộ Quai xước",
        "vi": "bước đi trên đường dài",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "狂",
        "name": "Chữ Cuồng",
        "vi": "chó chạy điên cuồng (âm kuáng)",
        "pos": "trong",
        "role": "âm"
      }
    ],
    "radical": "辶",
    "mnemonic": "Thong dong dạo gót 辶 rong chơi tự do như chú chó cuồng 狂 (kuáng gần guàng) dạo phố phường vui vẻ."
  },
  "那": {
    "py": "nà",
    "hv": "ná",
    "meaning": "kia, đó",
    "strokes": 6,
    "structure": "độc thể",
    "parts": [],
    "radical": "阝",
    "mnemonic": "Ngón tay trỏ chỉ về phía cổng thành bên kia sông ngắm nhìn bóng dáng nơi phương trời xa đó."
  },
  "部": {
    "py": "bù",
    "hv": "bộ",
    "meaning": "bộ phận, bộ thủ",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "咅",
        "name": "Chữ Thấu",
        "vi": "khạc nhổ, không thuận miệng",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "阝",
        "name": "Bộ Phụ/Ấp",
        "vi": "gò đất bên trái hoặc xóm làng bên phải",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "阝",
    "mnemonic": "Cất lời khen ngợi 咅 bên khu gò đất 阝 phân chia ranh giới từng bộ phận của khu hành chính."
  },
  "都": {
    "py": "dōu",
    "hv": "đô",
    "meaning": "đều, tất cả",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "者",
        "name": "Chữ Giả",
        "vi": "người, người làm việc gì đó (âm zhě)",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "阝",
        "name": "Bộ Phụ/Ấp",
        "vi": "gò đất bên trái hoặc xóm làng bên phải",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "阝",
    "mnemonic": "Mọi người già trẻ 者 cùng kéo nhau về khu đô thành 阝 đông đúc đều háo hức xem lễ hội."
  },
  "酸": {
    "py": "suān",
    "hv": "toan",
    "meaning": "chua; nhức mỏi",
    "strokes": 14,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "酉",
        "name": "Bộ Dậu",
        "vi": "bình ủ rượu",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "夋",
        "name": "Chữ Thuân",
        "vi": "bước đi khoan thai chậm rãi",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "酉",
    "mnemonic": "Hũ rượu lên men 酉 lâu ngày của chàng thư sinh 夋 (jùn gần suān) chuyển sang vị chua ngắt tê đầu lưỡi."
  },
  "里": {
    "py": "lǐ",
    "hv": "lý",
    "meaning": "bên trong; dặm (đơn vị đo)",
    "strokes": 7,
    "structure": "độc thể",
    "parts": [],
    "radical": "里",
    "mnemonic": "Trên là thửa ruộng dưới là lớp đất màu mỡ nơi dân làng sinh sống bên trong từng dặm đường quê."
  },
  "金": {
    "py": "jīn",
    "hv": "kim",
    "meaning": "vàng, kim loại",
    "strokes": 8,
    "structure": "độc thể",
    "parts": [],
    "radical": "金",
    "mnemonic": "Mảnh đất màu mỡ vùi sâu hai thỏi quặng kim loại lấp lánh màu vàng óng ánh quý giá ngàn năm."
  },
  "钱": {
    "py": "qián",
    "hv": "tiền",
    "meaning": "tiền bạc",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "钅",
        "name": "Bộ Kim",
        "vi": "kim loại, đồ kim khí",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "戋",
        "name": "Chữ Tiàn",
        "vi": "nhỏ mọn, ít ỏi",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "钅",
    "mnemonic": "Dùng kim loại sắt 钅 rèn thành hai ngọn giáo nhỏ 戋 đúc thành những đồng tiền bạc trao đổi buôn bán."
  },
  "铁": {
    "py": "tiě",
    "hv": "thiết",
    "meaning": "sắt, kim loại sắt; tàu điện ngầm",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "钅",
        "name": "Bộ Kim",
        "vi": "kim loại, đồ kim khí",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "失",
        "name": "Chữ Thất",
        "vi": "đánh rơi khỏi tay, mất mát (âm shī)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "钅",
    "mnemonic": "Thanh kim loại 钅 quý giá vô tình đánh mất 失 (shī gần tiě) hóa ra là thỏi sắt cứng cáp bền chắc."
  },
  "银": {
    "py": "yín",
    "hv": "ngân",
    "meaning": "bạc (kim loại); ngân hàng",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "钅",
        "name": "Bộ Kim",
        "vi": "kim loại, đồ kim khí",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "艮",
        "name": "Bộ Cấn",
        "vi": "ngoảnh lại nhìn trừng trừng",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "钅",
    "mnemonic": "Khối kim loại 钅 sáng bóng lóa mắt khiến người ta phải ngoái nhìn 艮 (gèn lái yín) chính là bạc quý."
  },
  "长": {
    "py": "cháng",
    "hv": "trường",
    "meaning": "dài; lớn lên, trưởng thành",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "长",
    "mnemonic": "Mái tóc dài của cụ già buông rủ xuống chấm đất đánh dấu quãng đời lớn lên và trưởng thành."
  },
  "门": {
    "py": "mén",
    "hv": "môn",
    "meaning": "cánh cửa, cổng",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "门",
    "mnemonic": "Hai cánh cổng gỗ đối xứng khép mở bảo vệ lối ra vào cho cả khuôn viên ngôi nhà tranh."
  },
  "问": {
    "py": "wèn",
    "hv": "vấn",
    "meaning": "hỏi, tra vấn",
    "strokes": 6,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "门",
        "name": "Bộ Môn",
        "vi": "cánh cửa, cổng ra vào",
        "pos": "ngoài",
        "role": "âm"
      },
      {
        "c": "口",
        "name": "Bộ Khẩu",
        "vi": "miệng, lời nói",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "门",
    "mnemonic": "Đứng thập thò trước cổng 门 hé mở miệng 口 cất tiếng hỏi thăm đường về làng bên xa xôi."
  },
  "间": {
    "py": "jiān",
    "hv": "gian",
    "meaning": "gian phòng, khoảng giữa",
    "strokes": 7,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "门",
        "name": "Bộ Môn",
        "vi": "cánh cửa, cổng ra vào",
        "pos": "ngoài",
        "role": "nghĩa"
      },
      {
        "c": "日",
        "name": "Bộ Nhật",
        "vi": "mặt trời, ban ngày, thời gian",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "门",
    "mnemonic": "Vầng mặt trời 日 rọi tia nắng ban mai lọt qua khe cánh cổng 门 chiếu sáng gian phòng khách nhỏ."
  },
  "闻": {
    "py": "wén",
    "hv": "văn",
    "meaning": "nghe thấy; ngửi thấy; tin tức",
    "strokes": 9,
    "structure": "nửa bao",
    "parts": [
      {
        "c": "门",
        "name": "Bộ Môn",
        "vi": "cánh cửa, cổng ra vào",
        "pos": "ngoài",
        "role": "âm"
      },
      {
        "c": "耳",
        "name": "Bộ Nhĩ",
        "vi": "tai nghe ngóng",
        "pos": "trong",
        "role": "nghĩa"
      }
    ],
    "radical": "门",
    "mnemonic": "Ghé sát vành tai 耳 vào khe cánh cửa cổng 门 để lắng nghe ngóng tin tức mới lạ ngoài phố."
  },
  "阴": {
    "py": "yīn",
    "hv": "âm",
    "meaning": "u ám, trời râm; âm lịch",
    "strokes": 6,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "阝",
        "name": "Bộ Phụ/Ấp",
        "vi": "gò đất bên trái hoặc xóm làng bên phải",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "月",
        "name": "Bộ Nguyệt",
        "vi": "mặt trăng, tháng, thịt",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "阝",
    "mnemonic": "Vùng bóng râm sau gò đất 阝 che khuất vầng trăng khuyết 月 khiến bầu trời trở nên âm u lạnh lẽo."
  },
  "院": {
    "py": "yuàn",
    "hv": "viện",
    "meaning": "viện, bệnh viện, khoảng sân",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "阝",
        "name": "Bộ Phụ/Ấp",
        "vi": "gò đất bên trái hoặc xóm làng bên phải",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "完",
        "name": "Chữ Hoàn",
        "vi": "người đội mũ trọn vẹn dưới mái (âm wán)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "阝",
    "mnemonic": "Khu đất đắp cao 阝 bao quanh ngôi nhà đã hoàn thiện 完 (wán gần yuàn) tạo thành khoảng sân viện rộng rãi."
  },
  "难": {
    "py": "nán",
    "hv": "nan",
    "meaning": "khó khăn, nan giải",
    "strokes": 10,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "又",
        "name": "Bộ Hựu",
        "vi": "bàn tay phải, lặp lại",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "隹",
        "name": "Bộ Chuy",
        "vi": "chim đuôi ngắn",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "又",
    "mnemonic": "Đôi bàn tay 又 cố sức bắt chú chim nhỏ 隹 vụt bay lên cao quả thật là nan giải khó khăn."
  },
  "雨": {
    "py": "yǔ",
    "hv": "vũ",
    "meaning": "cơn mưa",
    "strokes": 8,
    "structure": "độc thể",
    "parts": [],
    "radical": "雨",
    "mnemonic": "Những giọt nước từ đám mây trên trời rơi tí tách xuống mặt đất tưới mát cho vạn vật cỏ cây."
  },
  "雪": {
    "py": "xuě",
    "hv": "tuyết",
    "meaning": "tuyết rơi",
    "strokes": 11,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "雨",
        "name": "Bộ Vũ",
        "vi": "mưa gió, hiện tượng khí tượng",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "彐",
        "name": "Bộ Kệ",
        "vi": "đầu con nhím; bàn tay nắm",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "雨",
    "mnemonic": "Cơn mưa rơi 雨 trắng xóa mặt đất được người dùng chiếc chổi 彐 gom thành từng đụn tuyết trắng tinh."
  },
  "零": {
    "py": "líng",
    "hv": "linh",
    "meaning": "số không (0)",
    "strokes": 13,
    "structure": "trên-dưới",
    "parts": [
      {
        "c": "雨",
        "name": "Bộ Vũ",
        "vi": "mưa gió, hiện tượng khí tượng",
        "pos": "trên",
        "role": "nghĩa"
      },
      {
        "c": "令",
        "name": "Chữ Lệnh",
        "vi": "mệnh lệnh, chỉ thị (âm lìng)",
        "pos": "dưới",
        "role": "âm"
      }
    ],
    "radical": "雨",
    "mnemonic": "Cơn mưa rào 雨 vừa dứt theo hiệu lệnh 令 (lìng gần líng) chỉ còn sót lại con số không giọt nước."
  },
  "非": {
    "py": "fēi",
    "hv": "phi",
    "meaning": "không phải, phi pháp",
    "strokes": 8,
    "structure": "độc thể",
    "parts": [],
    "radical": "非",
    "mnemonic": "Hai hàng cọc gỗ dựng đối xứng quay lưng ngoảnh mặt lại với nhau thể hiện việc sai trái phi lý."
  },
  "面": {
    "py": "miàn",
    "hv": "diện",
    "meaning": "mì sợi; khuôn mặt; bề mặt",
    "strokes": 9,
    "structure": "độc thể",
    "parts": [],
    "radical": "面",
    "mnemonic": "Khung khuôn mặt với đôi mắt và chiếc cằm vuông vức nhìn thẳng gợi vẻ bề mặt chiếc bát mì sợi."
  },
  "鞋": {
    "py": "xié",
    "hv": "hài",
    "meaning": "đôi giày",
    "strokes": 15,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "革",
        "name": "Bộ Cách",
        "vi": "da thú đã thuộc căng ra",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "圭",
        "name": "Chữ Khuê",
        "vi": "ngọc khuê của vua ban (âm guī)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "革",
    "mnemonic": "Miếng da thuộc 革 bền chắc may trên nền đế cao 圭 tạo thành đôi giày êm ái bước đi dạo phố."
  },
  "音": {
    "py": "yīn",
    "hv": "âm",
    "meaning": "âm thanh, tiếng nhạc",
    "strokes": 9,
    "structure": "độc thể",
    "parts": [],
    "radical": "音",
    "mnemonic": "Mở miệng hát lên từ phía trên vành môi phát ra những âm thanh giai điệu trầm bổng vang xa."
  },
  "颜": {
    "py": "yán",
    "hv": "nhan",
    "meaning": "màu sắc; vẻ mặt (trong 颜色)",
    "strokes": 15,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "彦",
        "name": "Chữ Ngạn",
        "vi": "người có tài năng đức độ",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "页",
        "name": "Bộ Hiệt",
        "vi": "cái đầu người, trang sách",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "页",
    "mnemonic": "Chàng thư sinh tuấn tú 彦 phơi khuôn mặt 页 (yè) khôi ngô rạng rỡ dưới nắng lộ vẻ nhan sắc tươi sáng."
  },
  "风": {
    "py": "fēng",
    "hv": "phong",
    "meaning": "cơn gió",
    "strokes": 4,
    "structure": "độc thể",
    "parts": [],
    "radical": "风",
    "mnemonic": "Côn trùng sinh sôi bay lượn rộn ràng khi ngọn gió mát lành lùa qua khe cửa sổ mở toang."
  },
  "飞": {
    "py": "fēi",
    "hv": "phi",
    "meaning": "bay lượn",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "飞",
    "mnemonic": "Đôi cánh chim dang rộng chao liệng bay vút lên bầu trời xanh biếc tự do ngắm nhìn mây ngàn."
  },
  "食": {
    "py": "shí",
    "hv": "thực",
    "meaning": "thực phẩm, ăn uống",
    "strokes": 9,
    "structure": "độc thể",
    "parts": [],
    "radical": "食",
    "mnemonic": "Mái nhà nhỏ che chở bát cơm thơm dẻo đầy ắp nuôi dưỡng con người qua bữa ăn hằng ngày."
  },
  "饭": {
    "py": "fàn",
    "hv": "phán",
    "meaning": "cơm, bữa ăn",
    "strokes": 7,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "饣",
        "name": "Bộ Thực",
        "vi": "thức ăn, món ăn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "反",
        "name": "Chữ Phản",
        "vi": "bàn tay lật ngược lại (âm fǎn)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "饣",
    "mnemonic": "Thức ăn ngon 饣 lật qua lật lại 反 (fǎn lái fàn) trên chảo nóng xới ra bát cơm dẻo thơm phức."
  },
  "饱": {
    "py": "bǎo",
    "hv": "bão",
    "meaning": "no bụng",
    "strokes": 8,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "饣",
        "name": "Bộ Thực",
        "vi": "thức ăn, món ăn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "包",
        "name": "Chữ Bao",
        "vi": "gói, túi xách; bao bọc",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "饣",
    "mnemonic": "Bát thức ăn đầy 饣 gói ghém trong túi bao 包 (bāo gần bǎo) ăn hết sạch khiến bụng no nê căng tròn."
  },
  "饺": {
    "py": "jiǎo",
    "hv": "giảo",
    "meaning": "bánh sủi cảo",
    "strokes": 9,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "饣",
        "name": "Bộ Thực",
        "vi": "thức ăn, món ăn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "交",
        "name": "Chữ Giao",
        "vi": "giao tiếp, kết giao",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "饣",
    "mnemonic": "Món ăn ngon 饣 kết giao 交 (jiāo gần jiǎo) nhân thịt gói trong lớp vỏ bột nặn thành chiếc bánh sủi cảo."
  },
  "馆": {
    "py": "guǎn",
    "hv": "quán",
    "meaning": "quán ăn, bảo tàng, tòa nhà",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "饣",
        "name": "Bộ Thực",
        "vi": "thức ăn, món ăn",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "官",
        "name": "Chữ Quan",
        "vi": "quan chức cai quản dinh thự (âm guān)",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "饣",
    "mnemonic": "Thưởng thức món ăn 饣 thịnh soạn do vị quan lớn 官 (guān gần guǎn) thết đãi tại tòa quán trà sang trọng."
  },
  "首": {
    "py": "shǒu",
    "hv": "thủ",
    "meaning": "đầu; bài (lượng từ thơ/bài hát)",
    "strokes": 9,
    "structure": "độc thể",
    "parts": [],
    "radical": "首",
    "mnemonic": "Chiếc đầu người có sợi tóc xõa và đôi mắt sáng đứng ở vị trí đứng đầu một bài thơ hay."
  },
  "香": {
    "py": "xiāng",
    "hv": "hương",
    "meaning": "thơm tho, ngon miệng",
    "strokes": 9,
    "structure": "độc thể",
    "parts": [],
    "radical": "香",
    "mnemonic": "Cây lúa nếp chín vàng tỏa hương thơm ngát bay thoang thoảng vào chiếc miệng hé mở nếm thử cơm mới."
  },
  "马": {
    "py": "mǎ",
    "hv": "mã",
    "meaning": "con ngựa",
    "strokes": 3,
    "structure": "độc thể",
    "parts": [],
    "radical": "马",
    "mnemonic": "Chú ngựa dũng mãnh có bờm dài tung bay bốn vó phi nhanh vun vút trên thảo nguyên xanh bát ngát."
  },
  "骑": {
    "py": "qí",
    "hv": "kỵ",
    "meaning": "cưỡi (ngựa/xe)",
    "strokes": 11,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "马",
        "name": "Bộ Mã",
        "vi": "con ngựa",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "奇",
        "name": "Chữ Kỳ",
        "vi": "cưỡi ngựa lạ, kỳ lạ (âm qí)",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "马",
    "mnemonic": "Nhảy phắt lên lưng chú ngựa 马 dũng mãnh phi nước đại một cách kỳ lạ 奇 (qí) để cưỡi về kinh thành."
  },
  "高": {
    "py": "gāo",
    "hv": "cao",
    "meaning": "cao ráo, chiều cao",
    "strokes": 10,
    "structure": "độc thể",
    "parts": [],
    "radical": "高",
    "mnemonic": "Ngôi lầu cao chót vót có mái hiên che khung cửa sổ nhìn ngắm toàn cảnh thị trấn từ trên cao ráo."
  },
  "鲜": {
    "py": "xiān",
    "hv": "tiên",
    "meaning": "tươi sống, thơm ngon",
    "strokes": 14,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "鱼",
        "name": "Bộ Ngư",
        "vi": "con cá, thủy sản",
        "pos": "trái",
        "role": "nghĩa"
      },
      {
        "c": "羊",
        "name": "Bộ Dương",
        "vi": "con cừu, con dê có sừng",
        "pos": "phải",
        "role": "âm"
      }
    ],
    "radical": "鱼",
    "mnemonic": "Con cá tươi 鱼 vừa đánh bắt dưới sông đem nấu cùng thịt cừu 羊 tạo nên món ăn tươi ngon tuyệt vời."
  },
  "鹅": {
    "py": "é",
    "hv": "nga",
    "meaning": "con ngỗng",
    "strokes": 12,
    "structure": "trái-phải",
    "parts": [
      {
        "c": "我",
        "name": "Chữ Ngã",
        "vi": "tôi, mình (ngôi 1)",
        "pos": "trái",
        "role": "âm"
      },
      {
        "c": "鸟",
        "name": "Bộ Điểu",
        "vi": "con chim",
        "pos": "phải",
        "role": "nghĩa"
      }
    ],
    "radical": "鸟",
    "mnemonic": "Chú chim 鸟 bơi lội dưới hồ kêu quang quác nhìn theo bóng tôi 我 (wǒ gần é) chính là con ngỗng béo."
  },
  "黄": {
    "py": "huáng",
    "hv": "hoàng",
    "meaning": "màu vàng",
    "strokes": 11,
    "structure": "độc thể",
    "parts": [],
    "radical": "黄",
    "mnemonic": "Bó lúa chín vàng ươm buộc dải nơ ngang phơi dưới nắng gợi màu vàng rực rỡ của mùa màng bội thu."
  },
  "黑": {
    "py": "hēi",
    "hv": "hắc",
    "meaning": "màu đen",
    "strokes": 12,
    "structure": "độc thể",
    "parts": [],
    "radical": "黑",
    "mnemonic": "Lửa bập bùng hun khói đen kịt bám đầy ô cửa sổ tạo nên màu đen tuyền của muội than bồ hóng."
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.CHAR_DECOMP;
}
