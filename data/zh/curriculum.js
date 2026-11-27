/**
 * CHƯƠNG TRÌNH HỌC TIẾNG TRUNG CHUẨN HSK 3.0 (GF0025-2021)
 * Dành cho người Việt tự học trên nền tảng Web tương tác
 */

(function () {
  const CURRICULUM = {
  "standard": "HSK 3.0",
  "levels": [
    {
      "id": "intro",
      "name": "Cấp 0: Nhập môn",
      "band": "Nhập môn",
      "cefr": "Pre-A1",
      "targets": {
        "syllables": 269,
        "chars": 100,
        "words": 80,
        "grammar": 10,
        "handwriting": 50
      },
      "hours": 20,
      "mockTest": {
        "title": "Đánh giá năng lực Nhập môn (Pinyin & Chữ Hán căn bản)",
        "totalQuestions": 30,
        "timeMinutes": 25,
        "passPercent": 80
      },
      "units": [
        {
          "id": "intro-u1",
          "title": "Khởi động phát âm Pinyin & Thanh điệu",
          "theme": "Ngữ âm cơ bản",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "intro-u1-l1",
              "title": "6 Vận mẫu đơn & 4 Thanh điệu căn bản",
              "goal": "Phát âm chuẩn xác a, o, e, i, u, ü; làm chủ Thanh 4 (51) dứt khoát và Thanh 3 (214) võng sâu.",
              "newWords": [
                "啊",
                "喔",
                "鹅",
                "衣",
                "乌"
              ],
              "grammar": [],
              "focus": "Biểu đồ cao độ thanh 4 rơi từ 5 xuống 1; thanh 1 giữ đều 5-5; vận mẫu tròn môi ü.",
              "text": "妈妈骑马，马慢，妈妈骂马。",
              "exercises": [
                "tone",
                "listen",
                "meaning"
              ]
            },
            {
              "id": "intro-u1-l2",
              "title": "Thanh mẫu môi - răng & Phân biệt âm bật hơi",
              "goal": "Làm chủ b, p, m, f và d, t, n, l; triệt tiêu thói quen quên bật hơi ở cặp b/p và d/t.",
              "newWords": [
                "怕",
                "发",
                "爬",
                "飞",
                "白"
              ],
              "grammar": [],
              "focus": "Cặp đối kháng bật hơi: p vs b (dùng tờ giấy thử luồng hơi), t vs d.",
              "text": "爸爸怕白兔，大他不怕。",
              "exercises": [
                "tone",
                "listen",
                "typing"
              ]
            },
            {
              "id": "intro-u1-l3",
              "title": "Thanh mẫu cuống lưỡi, mặt lưỡi & Quy tắc ü",
              "goal": "Phát âm g, k, h và j, q, x; nắm vững quy tắc bỏ hai chấm của ü khi ghép với j, q, x.",
              "newWords": [
                "歌",
                "哭",
                "渴",
                "句",
                "绿"
              ],
              "grammar": [],
              "focus": "Âm bật hơi q, k; quy tắc viết j, q, x + ü -> ju, qu, xu (giữ nguyên âm tròn môi ü).",
              "text": "哥哥渴了要喝水，去七家商店。",
              "exercises": [
                "listen",
                "typing",
                "meaning"
              ]
            },
            {
              "id": "intro-u1-l4",
              "title": "Phân biệt âm đầu lưỡi phẳng z, c, s vs uốn lưỡi zh, ch, sh, r",
              "goal": "Làm chủ tử huyệt phát âm khó nhất của người Việt: răng trước phẳng (z, c, s) vs uốn lưỡi vòm họng (zh, ch, sh, r).",
              "newWords": [
                "字",
                "词",
                "四",
                "纸",
                "草"
              ],
              "grammar": [],
              "focus": "Đối kháng sì (bốn) và shí (mười); âm bật hơi c vs ch; chữ 是 (shì) phát âm dứt khoát.",
              "text": "四是四，十是十，十四是十四，四十是四十。",
              "exercises": [
                "listen",
                "tone",
                "typing",
                "meaning"
              ]
            },
            {
              "id": "intro-u1-l5",
              "title": "Vận mẫu phức, vận mẫu mũi & Quy tắc biến điệu",
              "goal": "Đọc trơn vận mẫu kép và mũi; biến điệu hai thanh 3 (3+3 -> 2+3), biến điệu 一 và 不.",
              "newWords": [
                "红",
                "蓝",
                "黄",
                "黑",
                "光"
              ],
              "grammar": [
                "G1-001"
              ],
              "focus": "Nǐ hǎo đọc thành Ní hǎo; Bù yào đọc thành Bú yào; thanh nhẹ trong 谢谢, 对不起.",
              "text": "你好！我不去，我们一起去，好吗？",
              "exercises": [
                "listen",
                "tone",
                "order",
                "meaning"
              ]
            }
          ]
        },
        {
          "id": "intro-u2",
          "title": "Nét bút, Bộ thủ & Cấu tạo chữ Hán",
          "theme": "Chữ viết & Chiết tự",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "intro-u2-l1",
              "title": "8 Nét cơ bản & 7 Quy tắc bút thuận viết chữ Hán",
              "goal": "Nhận diện và viết đúng 8 nét cơ bản; tuân thủ quy tắc trên trước dưới sau, trái trước phải sau.",
              "newWords": [
                "口",
                "日",
                "月",
                "山",
                "田"
              ],
              "grammar": [],
              "focus": "Nét phẩy (丿) và mác (乀); thứ tự bút thuận ngoài trước trong sau, vào trước đóng sau.",
              "text": "一二三四五，天上有日月。",
              "exercises": [
                "writing",
                "meaning",
                "order"
              ]
            },
            {
              "id": "intro-u2-l2",
              "title": "10 Bộ thủ biểu ý thông dụng đời sống",
              "goal": "Nắm chắc hình dạng và ý nghĩa của 10 bộ thủ gốc: Nhân, Khẩu, Nữ, Thủy, Mộc, Hỏa, Thổ, Nhật, Nguyệt, Tâm.",
              "newWords": [
                "木",
                "火",
                "土",
                "金",
                "水"
              ],
              "grammar": [],
              "focus": "Biến thể bộ thủ: 人->亻, 水->氵, 火->灬, 心->忄.",
              "text": "他喝水，她吃米，大家心里都高兴。",
              "exercises": [
                "writing",
                "meaning",
                "typing"
              ]
            },
            {
              "id": "intro-u2-l3",
              "title": "Cấu tạo chữ Hán: Tượng hình & Hội ý",
              "goal": "Hiểu tư duy tạo chữ qua tranh vẽ tượng hình và phép hội ý kết hợp hai ý nghĩa.",
              "newWords": [
                "休",
                "林",
                "森",
                "目",
                "门"
              ],
              "grammar": [],
              "focus": "Nhật + Nguyệt = Minh (明); Nữ + Tử = Hảo (好); Nhân + Mộc = Hưu (休 nghỉ ngơi).",
              "text": "明天好朋友去山林休息。",
              "exercises": [
                "writing",
                "meaning",
                "typing"
              ]
            },
            {
              "id": "intro-u2-l4",
              "title": "Chữ Hình thanh & Cây phả hệ họ từ Hán-Việt",
              "goal": "Làm chủ quy luật chữ hình thanh (thanh bàng chỉ âm + hình bàng chỉ nghĩa) để học nhanh 80% chữ Hán.",
              "newWords": [
                "抱",
                "饱",
                "清",
                "晴",
                "情"
              ],
              "grammar": [
                "G1-003"
              ],
              "focus": "Gốc chữ mượn âm 马 (mǎ) -> 妈 (mā), 吗 (ma); gốc 青 (qīng) -> 清, 晴, 请, 情.",
              "text": "今天天气晴，妈妈请大家吃饱。",
              "exercises": [
                "meaning",
                "typing",
                "listen"
              ]
            },
            {
              "id": "intro-u2-l5",
              "title": "Kỹ năng gõ Pinyin & Tra từ điển Hán ngữ",
              "goal": "Cài đặt và gõ thành thạo tiếng Trung trên bàn phím QWERTY (dùng v cho ü); tra từ điển theo bộ thủ và Pinyin.",
              "newWords": [
                "拼音",
                "笔画",
                "部首",
                "偏旁",
                "查"
              ],
              "grammar": [
                "G1-027"
              ],
              "focus": "Gõ nv ra 女, lv ra 绿; kỹ năng gõ cả cụm từ thay vì gõ từng chữ rời rạc.",
              "text": "我在电脑上用拼音打汉字，查词典学习。",
              "exercises": [
                "typing",
                "meaning",
                "order"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "hsk1",
      "name": "HSK 1 (Sơ cấp 1)",
      "band": "Sơ cấp",
      "cefr": "Pre-A1 / Entry A1",
      "targets": {
        "syllables": 269,
        "chars": 300,
        "words": 500,
        "grammar": 48,
        "handwriting": 100
      },
      "hours": 100,
      "mockTest": {
        "title": "Đề thi thử HSK 1 mô phỏng chuẩn 3.0 CTI",
        "totalQuestions": 40,
        "timeMinutes": 35,
        "sections": [
          {
            "name": "Nghe hiểu",
            "questions": 20,
            "timeMinutes": 15
          },
          {
            "name": "Đọc hiểu",
            "questions": 20,
            "timeMinutes": 17
          }
        ],
        "passPercent": 60
      },
      "units": [
        {
          "id": "hsk1-u1",
          "title": "Chào hỏi, Giới thiệu & Quốc tịch",
          "theme": "Giao tiếp ban đầu",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "hsk1-u1-l1",
              "title": "Chào hỏi lịch thiệp & Cảm ơn, xin lỗi",
              "goal": "Chào hỏi người bằng vai và người lớn tuổi; nói lời cảm ơn, xin lỗi và đáp lễ lịch sự.",
              "newWords": [
                "你好",
                "您",
                "好",
                "早",
                "再见",
                "谢谢",
                "不",
                "客气",
                "对不起",
                "没关系",
                "请",
                "问",
                "请问",
                "贵姓",
                "欢迎"
              ],
              "grammar": [
                "G1-001",
                "G1-003"
              ],
              "focus": "Phân biệt xưng hô 你 vs kính ngữ 您; trợ từ nghi vấn 吗 ở cuối câu.",
              "text": "— 您好！早上好！ — 您好，很高兴见到您！",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "order"
              ]
            },
            {
              "id": "hsk1-u1-l2",
              "title": "Bạn tên là gì? (Họ tên & Xưng hô)",
              "goal": "Hỏi và trả lời tên họ; tự giới thiệu bản thân một cách tự nhiên.",
              "newWords": [
                "我",
                "你",
                "叫",
                "什么",
                "名字",
                "姓",
                "谁",
                "先生",
                "女士",
                "小姐",
                "朋友",
                "同屋",
                "大家",
                "认识",
                "高兴"
              ],
              "grammar": [
                "G1-005",
                "G1-037"
              ],
              "focus": "Đại từ nghi vấn 什么 đặt sau động từ 叫; cấu trúc hỏi họ lịch sự 您贵姓.",
              "text": "请问，您贵姓？你叫什么名字？",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u1-l3",
              "title": "Bạn là người nước nào? (Quốc tịch & Quê quán)",
              "goal": "Nói được quốc tịch bản thân, hỏi quê quán người khác.",
              "newWords": [
                "是",
                "哪",
                "国",
                "人",
                "哪儿",
                "哪里",
                "中国",
                "北京",
                "越南",
                "河内",
                "美国",
                "老家",
                "地方",
                "南方",
                "北方"
              ],
              "grammar": [
                "G1-002",
                "G1-006"
              ],
              "focus": "Câu chữ 是: A 是 B; đại từ nghi vấn 哪 + Danh từ.",
              "text": "我是越南人，你也是越南人吗？",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "writing"
              ]
            },
            {
              "id": "hsk1-u1-l4",
              "title": "Tôi là học sinh, không phải giáo viên (Nghề nghiệp & Phủ định 不)",
              "goal": "Giới thiệu nghề nghiệp cơ bản; dùng phó từ phủ định 不 và phó từ 也, 都.",
              "newWords": [
                "他",
                "她",
                "我们",
                "你们",
                "他们",
                "她们",
                "也",
                "都",
                "老师",
                "学生",
                "同班",
                "学校",
                "大学",
                "医生",
                "护士"
              ],
              "grammar": [
                "G1-004",
                "G1-007"
              ],
              "focus": "Vị trí phó từ 也, 都 đứng trước động từ; biến điệu chữ 不 (bú + thanh 4).",
              "text": "我们都是学生，他不是老师。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u1-l5",
              "title": "Rất vui được làm quen với bạn (Hội thoại xã giao tổng hợp)",
              "goal": "Tổng hợp hội thoại chào hỏi, hỏi tên họ, nghề nghiệp để giao tiếp mượt mà.",
              "newWords": [
                "很",
                "太",
                "真",
                "非常",
                "常常",
                "见面",
                "介绍",
                "自己",
                "互相",
                "聊",
                "聊天",
                "请坐",
                "请进",
                "别",
                "慢走"
              ],
              "grammar": [
                "G1-008",
                "G1-016",
                "G1-019"
              ],
              "focus": "Vị ngữ tính từ với 很 (không dùng 是); câu cầu khiến lịch sự với 请.",
              "text": "认识你我也很高兴，请进，请坐！",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            }
          ]
        },
        {
          "id": "hsk1-u2",
          "title": "Con số, Thời gian & Lịch trình sinh hoạt",
          "theme": "Thời gian & Lịch trình",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "hsk1-u2-l1",
              "title": "Số đếm 0 – 100 & Hỏi tuổi tác",
              "goal": "Đếm từ 0 đến 100; hỏi và trả lời tuổi tác theo từng độ tuổi phù hợp.",
              "newWords": [
                "零",
                "一",
                "二",
                "两",
                "三",
                "五",
                "六",
                "七",
                "八",
                "九",
                "十",
                "百",
                "千",
                "岁",
                "多大"
              ],
              "grammar": [
                "G1-009",
                "G1-010"
              ],
              "focus": "Phân biệt số đếm 二 vs số lượng 两; hỏi tuổi với 几岁 (<10) vs 多大.",
              "text": "你儿子今年几岁？他今年两岁了。",
              "exercises": [
                "meaning",
                "listen",
                "typing",
                "tone"
              ]
            },
            {
              "id": "hsk1-u2-l2",
              "title": "Hôm nay ngày mấy, tháng mấy, thứ mấy?",
              "goal": "Diễn đạt chính xác ngày tháng năm, thứ trong tuần và ngày sinh nhật.",
              "newWords": [
                "年",
                "号",
                "星期",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六",
                "星期天",
                "今天",
                "明天",
                "昨天",
                "今年",
                "生日"
              ],
              "grammar": [
                "G1-011"
              ],
              "focus": "Trật tự thời gian từ lớn đến nhỏ: Năm + Tháng + Ngày + Thứ (ngược tiếng Việt).",
              "text": "今天是二〇二六年十月三十日，星期五。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u2-l3",
              "title": "Bây giờ là mấy giờ? (Giờ, Phút & Buổi trong ngày)",
              "goal": "Hỏi và trả lời giờ chính xác, nói giờ rưỡi, giờ kém; kết hợp buổi sáng trưa tối.",
              "newWords": [
                "现在",
                "点",
                "分",
                "刻",
                "半",
                "早上",
                "上午",
                "中午",
                "下午",
                "晚上",
                "夜里",
                "时间",
                "几点",
                "差",
                "手表"
              ],
              "grammar": [
                "G1-012"
              ],
              "focus": "Cấu trúc giờ: Buổi + Giờ + Phút; 2 giờ dùng 两点 chứ không dùng 二点.",
              "text": "现在是下午两点半，我们上课吧。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u2-l4",
              "title": "Lịch trình một ngày của tôi (Hành động & Thời gian)",
              "goal": "Kể lại các hoạt động thường nhật theo trình tự thời gian từ sáng đến tối.",
              "newWords": [
                "起床",
                "刷牙",
                "洗脸",
                "吃早饭",
                "上学",
                "放学",
                "上班",
                "下班",
                "睡觉",
                "开始",
                "回",
                "回家",
                "每天",
                "平时",
                "以前"
              ],
              "grammar": [
                "G1-013"
              ],
              "focus": "Trạng ngữ thời gian BẮT BUỘC trước động từ: S + Time + V (tử huyệt người Việt).",
              "text": "我早上七点起床，八点去上班，下午五点回家。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u2-l5",
              "title": "Khi nào bạn rảnh? (Hẹn gặp & Phó từ thời gian)",
              "goal": "Hẹn gặp bạn bè, hỏi thời điểm rảnh rỗi và diễn đạt kế hoạch gặp gỡ.",
              "newWords": [
                "什么时候",
                "时候",
                "有空",
                "没空",
                "刚才",
                "马上",
                "正在",
                "已经",
                "后来",
                "等",
                "等一下",
                "从",
                "到",
                "迟到",
                "准时"
              ],
              "grammar": [
                "G1-014",
                "G1-040"
              ],
              "focus": "Hỏi thời điểm 什么时候; bẫy Hán-Việt chữ 走 nghĩa là đi bộ/rời đi, không phải chạy.",
              "text": "你什么时候有空？我们明天上午见！",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            }
          ]
        },
        {
          "id": "hsk1-u3",
          "title": "Gia đình, Nhà cửa & Sở hữu",
          "theme": "Gia đình & Đồ vật",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "hsk1-u3-l1",
              "title": "Nhà tôi có 4 người (Thành viên gia đình & Câu chữ 有)",
              "goal": "Giới thiệu các thành viên trong gia đình; dùng câu chữ 有 biểu thị tồn tại, sở hữu.",
              "newWords": [
                "家",
                "有",
                "没有",
                "爸爸",
                "妈妈",
                "父母",
                "哥哥",
                "弟弟",
                "姐姐",
                "妹妹",
                "儿子",
                "女儿",
                "孩子",
                "家人",
                "口人"
              ],
              "grammar": [
                "G1-015"
              ],
              "focus": "Phủ định của 有 bắt buộc là 没有; tuyệt đối không dùng 不有.",
              "text": "我家有四口人：爸爸、妈妈、一个妹妹和我。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u3-l2",
              "title": "Đây là sách của tôi (Trợ từ kết cấu 的 sở hữu)",
              "goal": "Thể hiện quyền sở hữu đồ vật; mối quan hệ thân thuộc với trợ từ 的.",
              "newWords": [
                "的",
                "这",
                "那",
                "这儿",
                "那儿",
                "这里",
                "那里",
                "书",
                "本子",
                "笔",
                "书包",
                "雨伞",
                "钱包",
                "照片",
                "谁的"
              ],
              "grammar": [
                "G1-016"
              ],
              "focus": "Cấu trúc sở hữu: Chủ sở hữu + 的 + Vật sở hữu (sách của tôi -> 我的书).",
              "text": "这是谁的手机？这是我丈夫的手机。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u3-l3",
              "title": "Lượng từ thông dụng & Đại từ 几 vs 多少",
              "goal": "Sử dụng đúng lượng từ 个, 口, 本, 张; phân biệt 几 (<10) và 多少 (>10).",
              "newWords": [
                "几",
                "多少",
                "个",
                "本",
                "张",
                "支",
                "把",
                "只",
                "些",
                "这些",
                "那些",
                "多少人",
                "一共",
                "少",
                "多"
              ],
              "grammar": [
                "G1-017",
                "G1-038"
              ],
              "focus": "Công thức bắt buộc: Số từ + Lượng từ + Danh từ (hai cuốn sách -> 两本书).",
              "text": "你有几张你家的照片？我有一张。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u3-l4",
              "title": "Đồ đạc trong phòng (Định ngữ + 的 + Danh từ)",
              "goal": "Miêu tả đồ đạc trong phòng; hiểu rõ trật tự định ngữ bổ nghĩa đứng trước 的.",
              "newWords": [
                "房间",
                "桌子",
                "椅子",
                "床",
                "窗户",
                "灯",
                "电脑",
                "手机",
                "电视",
                "空调",
                "大",
                "小",
                "新",
                "旧",
                "干净"
              ],
              "grammar": [
                "G1-018"
              ],
              "focus": "Tử huyệt ngữ pháp: Tính từ + 的 + Danh từ (phòng đẹp -> 漂亮的房间).",
              "text": "这是一个很大的房间，里面有一张新桌子。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "writing"
              ]
            },
            {
              "id": "hsk1-u3-l5",
              "title": "Đến nhà bạn chơi (Đón khách & Trợ từ ngữ khí 呢)",
              "goal": "Đón tiếp khách đến nhà niềm nở; hỏi đáp tỉnh lược với trợ từ 呢; mời trà.",
              "newWords": [
                "呢",
                "来",
                "去",
                "进",
                "坐",
                "喝",
                "玩",
                "客",
                "客人",
                "倒茶",
                "准备",
                "爱人",
                "老婆",
                "开心",
                "笑"
              ],
              "grammar": [
                "G1-019",
                "G1-036"
              ],
              "focus": "Câu hỏi tỉnh lược với 呢: 你呢？; trợ từ ngữ khí 吧 đề nghị nhẹ nhàng.",
              "text": "请进！请喝茶！我喝茶，你呢？",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            }
          ]
        },
        {
          "id": "hsk1-u4",
          "title": "Ẩm thực, Mua sắm & Giá cả",
          "theme": "Mua sắm & Tiền tệ",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "hsk1-u4-l1",
              "title": "Bạn muốn ăn gì, uống gì? (Ẩm thực & Thức uống)",
              "goal": "Gọi món ăn và thức uống thông dụng; sử dụng động từ năng nguyện 想.",
              "newWords": [
                "吃",
                "想",
                "要",
                "米饭",
                "面条",
                "包子",
                "饺子",
                "菜",
                "茶",
                "咖啡",
                "牛奶",
                "好吃",
                "好喝",
                "果汁",
                "面包"
              ],
              "grammar": [
                "G1-020",
                "G1-043"
              ],
              "focus": "Cấu trúc câu S + V + O; phân biệt muốn nhẹ nhàng (想) vs cần/đòi hỏi (要).",
              "text": "你想吃什么？我想吃中国面条，喝茶。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u4-l2",
              "title": "Cái này bao nhiêu tiền? (Tiền tệ & Hỏi giá)",
              "goal": "Hỏi giá các món hàng; nắm rõ các đơn vị tiền tệ Trung Quốc.",
              "newWords": [
                "钱",
                "多少钱",
                "块",
                "元",
                "角",
                "毛",
                "贵",
                "便宜",
                "买",
                "卖",
                "太...了",
                "给",
                "找",
                "现金",
                "算"
              ],
              "grammar": [
                "G1-021",
                "G1-038"
              ],
              "focus": "Phó từ thái quá 太...了; phân biệt 块/毛 (khẩu ngữ) vs 元/角 (văn viết).",
              "text": "这个苹果多少钱一斤？太贵了，便宜一点儿吧！",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u4-l3",
              "title": "Mua hoa quả & Đơn vị đo lường Trung Quốc",
              "goal": "Mua hoa quả; hiểu quy đổi đơn vị 1 斤 của TQ = 500g; diễn đạt việc mua thêm.",
              "newWords": [
                "水果",
                "苹果",
                "西瓜",
                "香蕉",
                "斤",
                "公斤",
                "还",
                "还要",
                "别的",
                "点心",
                "酸",
                "新鲜",
                "尝",
                "尝尝",
                "橘子"
              ],
              "grammar": [
                "G1-022",
                "G1-035"
              ],
              "focus": "1 cân TQ = 0.5 kg; phó từ 还 biểu thị sự bổ sung hành động.",
              "text": "我买两斤苹果，还要一个大西瓜，一共多少钱？",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u4-l4",
              "title": "Mua sắm quần áo & Lượng từ chuyên biệt",
              "goal": "Mua sắm quần áo giày dép; sử dụng đúng các lượng từ chuyên biệt 件, 条, 双.",
              "newWords": [
                "衣服",
                "件",
                "裤子",
                "条",
                "鞋",
                "双",
                "穿",
                "试",
                "漂亮",
                "长",
                "短",
                "颜色",
                "合适",
                "好看",
                "衬衫"
              ],
              "grammar": [
                "G1-023",
                "G1-042"
              ],
              "focus": "Lượng từ 件 (áo), 条 (quần/váy/sông), 双 (đôi giày).",
              "text": "这件白衣服很漂亮，我想买一件。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u4-l5",
              "title": "Tại siêu thị & Thanh toán điện tử",
              "goal": "Mua hàng ở siêu thị; trải nghiệm thanh toán mã QR qua WeChat và Alipay.",
              "newWords": [
                "超市",
                "商店",
                "推车",
                "袋子",
                "扫码",
                "微信",
                "支付宝",
                "付款",
                "刷卡",
                "收银台",
                "发票",
                "满",
                "优惠",
                "便利",
                "东西"
              ],
              "grammar": [
                "G1-024",
                "G1-045"
              ],
              "focus": "Bẫy Hán-Việt số 1: 东西 nghĩa là đồ vật; câu liên động 去超市买东西.",
              "text": "我去超市买东西，可以用微信扫码吗？",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            }
          ]
        },
        {
          "id": "hsk1-u5",
          "title": "Địa điểm, Phương hướng & Di chuyển",
          "theme": "Nơi chốn & Giao thông",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "hsk1-u5-l1",
              "title": "Ở trường học & Giới từ nơi chốn 在",
              "goal": "Nêu tên các địa điểm trong trường học; diễn đạt hành động đang làm ở đâu.",
              "newWords": [
                "在",
                "教室",
                "图书馆",
                "食堂",
                "操场",
                "洗手间",
                "宿舍",
                "楼",
                "层",
                "办公室",
                "就",
                "学习",
                "上课",
                "做作业",
                "看书"
              ],
              "grammar": [
                "G1-025",
                "G1-044"
              ],
              "focus": "Tử huyệt ngữ pháp: Giới từ nơi chốn trước động từ: S + 在 + Địa điểm + V.",
              "text": "你在哪儿？我在学校的图书馆看书。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u5-l2",
              "title": "Phương vị từ (Trên, Dưới, Trước, Sau, Trong, Ngoài)",
              "goal": "Xác định vị trí không gian của người và đồ vật bằng phương vị từ.",
              "newWords": [
                "上",
                "下",
                "前",
                "后",
                "里",
                "外",
                "左",
                "右",
                "旁边",
                "中间",
                "对门",
                "对面",
                "上面",
                "下面",
                "里边"
              ],
              "grammar": [
                "G1-026"
              ],
              "focus": "Phương vị từ đứng sau danh từ: Danh từ + 上/下/里/外 (trên bàn -> 桌子上).",
              "text": "你的手机在桌子上，电脑旁边。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u5-l3",
              "title": "Hỏi đường & Đi như thế nào?",
              "goal": "Hỏi đường đến một nơi; hiểu các chỉ dẫn rẽ trái, rẽ phải, đi thẳng.",
              "newWords": [
                "怎么",
                "走",
                "路",
                "往",
                "向",
                "拐",
                "直走",
                "远",
                "近",
                "离",
                "怎么走",
                "过马路",
                "红绿灯",
                "路口",
                "近处"
              ],
              "grammar": [
                "G1-027",
                "G1-041"
              ],
              "focus": "Cấu trúc chỉ đường: 往 + Hướng + 拐; giới từ khoảng cách 离 (A 离 B 很远).",
              "text": "请问，去银行怎么走？一直往前走，往右拐。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u5-l4",
              "title": "Đi lại bằng phương tiện gì? (Xe buýt, Taxi, Tàu điện ngầm)",
              "goal": "Nói về các phương tiện giao thông thông dụng; diễn đạt việc đi lại hàng ngày.",
              "newWords": [
                "开",
                "开车",
                "骑",
                "骑车",
                "出租车",
                "公共汽车",
                "地铁",
                "火车",
                "飞机",
                "站",
                "地铁站",
                "车站",
                "票",
                "方便",
                "交通工具"
              ],
              "grammar": [
                "G1-028",
                "G1-039"
              ],
              "focus": "Cấu trúc: S + 坐/开 + Phương tiện + 去 + Nơi chốn.",
              "text": "我每天坐地铁去上班，不坐出租车。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u5-l5",
              "title": "Đi chơi cuối tuần & Hoạt động giải trí",
              "goal": "Rủ bạn bè đi chơi, xem phim, tham gia các hoạt động ngoài trời cuối tuần.",
              "newWords": [
                "和",
                "跟",
                "一起",
                "吧",
                "周末",
                "公园",
                "电影",
                "看电影",
                "电影院",
                "散步",
                "买东西",
                "逛街",
                "打算",
                "好玩",
                "放假"
              ],
              "grammar": [
                "G1-029",
                "G1-047"
              ],
              "focus": "Âm cuốn lưỡi nhi hóa wánr (玩儿); cấu trúc rủ rê 和...一起...吧.",
              "text": "星期六我和朋友一起去公园玩儿，你看电影吗？",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            }
          ]
        },
        {
          "id": "hsk1-u6",
          "title": "Thời tiết, Sở thích & Năng lực",
          "theme": "Thời tiết, Khả năng & Tổng kết",
          "review": true,
          "checkpoint": {
            "passPercent": 80,
            "questionsCount": 20
          },
          "lessons": [
            {
              "id": "hsk1-u6-l1",
              "title": "Thời tiết hôm nay thế nào? (Bốn mùa & Nhiệt độ)",
              "goal": "Hỏi và miêu tả tình hình thời tiết nóng, lạnh, mưa, tuyết.",
              "newWords": [
                "天气",
                "怎么样",
                "热",
                "冷",
                "暖和",
                "凉快",
                "下雨",
                "下雪",
                "刮风",
                "晴天",
                "阴天",
                "温度",
                "度",
                "冬天",
                "夏天"
              ],
              "grammar": [
                "G1-030",
                "G1-048"
              ],
              "focus": "Mẫu câu hỏi tình hình 怎么样; phân biệt 怎么样 vs 怎么.",
              "text": "今天北京的天气怎么样？今天下雨，很冷。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u6-l2",
              "title": "Tôi biết nói một chút tiếng Trung (Động từ năng nguyện 会)",
              "goal": "Diễn đạt kỹ năng học tập được thông qua rèn luyện bằng động từ năng nguyện 会.",
              "newWords": [
                "会",
                "说",
                "听",
                "读",
                "写",
                "汉语",
                "中文",
                "普通话",
                "一点儿",
                "懂",
                "慢",
                "快",
                "得",
                "流利",
                "发音"
              ],
              "grammar": [
                "G1-031",
                "G1-046"
              ],
              "focus": "Phân biệt 会 (kỹ năng qua học tập) vs 能 (khả năng điều kiện cho phép).",
              "text": "你会说汉语吗？我会说一点儿汉语，还会写汉字。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u6-l3",
              "title": "Sở thích của bạn là gì? (Động từ năng nguyện 想, 喜欢)",
              "goal": "Chia sẻ sở thích âm nhạc, thể thao; dùng phó từ chỉ cấp độ bậc nhất 最.",
              "newWords": [
                "喜欢",
                "最",
                "最喜欢",
                "爱",
                "爱好",
                "运动",
                "跑步",
                "游泳",
                "打球",
                "打篮球",
                "踢足球",
                "唱歌",
                "跳舞",
                "听音乐",
                "旅游"
              ],
              "grammar": [
                "G1-032"
              ],
              "focus": "Phó từ cấp độ bậc nhất: 最 + Adj/V (thích nhất -> 最喜欢).",
              "text": "你的爱好是什么？我最喜欢听音乐和去旅游。",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u6-l4",
              "title": "Trời mưa rồi! (Trợ từ ngữ khí biến hóa 了)",
              "goal": "Sử dụng trợ từ ngữ khí 了 đặt cuối câu biểu thị sự thay đổi trạng thái mới.",
              "newWords": [
                "了",
                "变",
                "快要",
                "伞",
                "带",
                "感冒",
                "发烧",
                "生病",
                "看病",
                "吃药",
                "身体",
                "舒服",
                "难受",
                "休息",
                "小心"
              ],
              "grammar": [
                "G1-033"
              ],
              "focus": "Trợ từ 了 ngữ khí cuối câu: biểu thị trạng thái mới phát sinh (trời mưa rồi).",
              "text": "我饿了，我们下课去吃饭吧！",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing"
              ]
            },
            {
              "id": "hsk1-u6-l5",
              "title": "Ôn tập tổng kết HSK 1 & Sẵn sàng vươn tới HSK 2",
              "goal": "Hệ thống hóa toàn bộ kiến thức HSK 1; làm bài kiểm tra hoàn thành cấp độ.",
              "newWords": [
                "一下",
                "工作",
                "单位",
                "认真",
                "生气",
                "告诉",
                "手段",
                "新闻",
                "困难",
                "仔细",
                "抱歉",
                "大意",
                "简单",
                "希望",
                "努力"
              ],
              "grammar": [
                "G1-034",
                "G1-035"
              ],
              "focus": "Động lượng từ 一下 làm giảm nhẹ ngữ khí; tổng kết sẵn sàng thi thử.",
              "text": "你都懂了吗？准备好 HSK 1 考试了吗？",
              "exercises": [
                "meaning",
                "listen",
                "order",
                "typing",
                "writing"
              ]
            }
          ]
        }
      ],
      "wordListNote": "Cần đối chiếu danh sách chính thức HSK 3.0 cấp 1 trước khi phát hành"
    },
    {
      "id": "hsk2",
      "name": "HSK 2 (Sơ cấp 2)",
      "band": "Sơ cấp",
      "cefr": "A1",
      "targets": {
        "syllables": 468,
        "chars": 600,
        "words": 1272,
        "grammar": 129,
        "handwriting": 200
      },
      "hours": 120,
      "mockTest": {
        "title": "Đề thi thử HSK 2 mô phỏng chuẩn 3.0 CTI",
        "totalQuestions": 60,
        "timeMinutes": 50,
        "sections": [
          {
            "name": "Nghe hiểu",
            "questions": 35,
            "timeMinutes": 25
          },
          {
            "name": "Đọc hiểu",
            "questions": 25,
            "timeMinutes": 22
          }
        ],
        "passPercent": 60
      },
      "units": [
        {
          "id": "hsk2-u1",
          "title": "Sức khỏe, Khám bệnh & Thói quen",
          "theme": "Y tế & Thể chất",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk2-u2",
          "title": "Du lịch, Giao thông & Vé tàu xe",
          "theme": "Du lịch & Lộ trình",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk2-u3",
          "title": "Nhà cửa, Môi trường & Thuê phòng",
          "theme": "Nhà ở & Tiện ích",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk2-u4",
          "title": "Mua sắm online, Màu sắc & Đổi trả",
          "theme": "Thương mại & Quần áo",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk2-u5",
          "title": "Học tập, Công sở & Kỹ năng",
          "theme": "Văn phòng & Công việc",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk2-u6",
          "title": "Thể thao, Giải trí & Cuối tuần",
          "theme": "Thể thao & Thư giãn",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk2-u7",
          "title": "Cảm xúc, Tính cách & Xã hội",
          "theme": "Tâm lý & Giao tiếp",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk2-u8",
          "title": "Lễ hội, Ẩm thực & Phong tục",
          "theme": "Văn hóa truyền thống",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        }
      ]
    },
    {
      "id": "hsk3",
      "name": "HSK 3 (Sơ cấp 3)",
      "band": "Sơ cấp",
      "cefr": "A2",
      "targets": {
        "syllables": 608,
        "chars": 900,
        "words": 2245,
        "grammar": 210,
        "handwriting": 300
      },
      "hours": 180,
      "mockTest": {
        "title": "Đề thi thử HSK 3 mô phỏng chuẩn 3.0 CTI",
        "totalQuestions": 80,
        "timeMinutes": 85,
        "sections": [
          {
            "name": "Nghe hiểu",
            "questions": 40,
            "timeMinutes": 35
          },
          {
            "name": "Đọc hiểu",
            "questions": 30,
            "timeMinutes": 30
          },
          {
            "name": "Viết câu",
            "questions": 10,
            "timeMinutes": 15
          }
        ],
        "passPercent": 60
      },
      "units": [
        {
          "id": "hsk3-u1",
          "title": "Nghề nghiệp & Phỏng vấn xin việc",
          "theme": "Sự nghiệp & Ứng tuyển",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk3-u2",
          "title": "Đời sống đô thị & Dịch vụ công cộng",
          "theme": "Ngân hàng & Thủ tục",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk3-u3",
          "title": "Du lịch tự túc & Khám phá địa phương",
          "theme": "Lộ trình & Thám hiểm",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk3-u4",
          "title": "Ẩm thực vùng miền & Dinh dưỡng",
          "theme": "Trường phái ẩm thực",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk3-u5",
          "title": "Quan hệ gia đình & Tình bạn",
          "theme": "Tình cảm xã hội",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk3-u6",
          "title": "Nghệ thuật, Phim ảnh & Truyền thông",
          "theme": "Giải trí & Phê bình",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk3-u7",
          "title": "Môi trường & Biến đổi khí hậu",
          "theme": "Bảo vệ sinh thái",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk3-u8",
          "title": "Công nghệ thông minh & Mạng xã hội",
          "theme": "Kỷ nguyên số & AI",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk3-u9",
          "title": "Học tập nâng cao & Luyện thi HSK",
          "theme": "Kỹ năng làm bài",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        },
        {
          "id": "hsk3-u10",
          "title": "Tự sự & Kế hoạch tương lai",
          "theme": "Trải nghiệm cuộc đời",
          "lessons": [],
          "review": true,
          "checkpoint": {
            "passPercent": 80
          }
        }
      ]
    },
    {
      "id": "hsk4",
      "name": "HSK 4 (Trung cấp 1)",
      "band": "Trung cấp",
      "cefr": "B1",
      "targets": {
        "syllables": 724,
        "chars": 1200,
        "words": 3245,
        "grammar": 286,
        "handwriting": 400
      },
      "hours": 250,
      "mockTest": {
        "title": "Đề thi thử HSK 4 chuẩn CTI",
        "totalQuestions": 100,
        "timeMinutes": 105,
        "passPercent": 60
      },
      "units": []
    },
    {
      "id": "hsk5",
      "name": "HSK 5 (Trung cấp 2)",
      "band": "Trung cấp",
      "cefr": "B2",
      "targets": {
        "syllables": 822,
        "chars": 1500,
        "words": 4316,
        "grammar": 357,
        "handwriting": 600
      },
      "hours": 300,
      "mockTest": {
        "title": "Đề thi thử HSK 5 chuẩn CTI",
        "totalQuestions": 100,
        "timeMinutes": 125,
        "passPercent": 60
      },
      "units": []
    },
    {
      "id": "hsk6",
      "name": "HSK 6 (Trung cấp 3)",
      "band": "Trung cấp",
      "cefr": "C1",
      "targets": {
        "syllables": 908,
        "chars": 1800,
        "words": 5456,
        "grammar": 424,
        "handwriting": 800
      },
      "hours": 400,
      "mockTest": {
        "title": "Đề thi thử HSK 6 chuẩn CTI",
        "totalQuestions": 101,
        "timeMinutes": 140,
        "passPercent": 60
      },
      "units": []
    },
    {
      "id": "hsk7_9",
      "name": "HSK 7–9 (Cao cấp)",
      "band": "Cao cấp",
      "cefr": "C1+ đến C2",
      "targets": {
        "syllables": 1110,
        "chars": 3000,
        "words": 11092,
        "grammar": 572,
        "handwriting": 1200
      },
      "hours": 1000,
      "mockTest": {
        "title": "Đề thi HSK 7-9 iBT (Nghe, Đọc, Viết, Dịch thuật 2 chiều)",
        "totalQuestions": 98,
        "timeMinutes": 210,
        "passPercent": 60
      },
      "units": []
    }
  ],
  "grammar": [
    {
      "id": "G1-001",
      "level": "hsk1",
      "name": "Đại từ nhân xưng",
      "pattern": "我 / 你 / 您 / 他 / 她 / 我们 / 你们 / 他们",
      "examples": [
        {
          "zh": "他是我的好朋友。",
          "py": "Tā shì wǒ de hǎo péngyou.",
          "vi": "Anh ấy là bạn tốt của tôi."
        },
        {
          "zh": "您好，老师！",
          "py": "Nín hǎo, lǎoshī!",
          "vi": "Chào thầy ạ!"
        },
        {
          "zh": "我们都是越南留学生。",
          "py": "Wǒmen dōu shì Yuènán liúxuéshēng.",
          "vi": "Chúng tôi đều là du học sinh Việt Nam."
        }
      ],
      "viNote": "Kính ngữ 您 dùng cho người lớn tuổi, thầy cô; 她 (nữ) và 他 (nam) đọc giống hệt nhau tā."
    },
    {
      "id": "G1-002",
      "level": "hsk1",
      "name": "Câu phán đoán chữ 是",
      "pattern": "A + 是 + B",
      "examples": [
        {
          "zh": "我是越南人。",
          "py": "Wǒ shì Yuènán rén.",
          "vi": "Tôi là người Việt Nam."
        },
        {
          "zh": "这是汉语词典。",
          "py": "Zhè shì Hànyǔ cídiǎn.",
          "vi": "Đây là từ điển tiếng Hán."
        },
        {
          "zh": "他不是我们的老师。",
          "py": "Tā bú shì wǒmen de lǎoshī.",
          "vi": "Thầy ấy không phải là giáo viên của chúng tôi."
        }
      ],
      "viNote": "Tuyệt đối không dùng chữ 是 trước tính từ (nói 我很高兴, KHÔNG NÓI 我是很高兴)."
    },
    {
      "id": "G1-003",
      "level": "hsk1",
      "name": "Trợ từ nghi vấn 吗",
      "pattern": "Mệnh đề trần thuật + 吗？",
      "examples": [
        {
          "zh": "你是中国人吗？",
          "py": "Nǐ shì Zhōngguó rén ma?",
          "vi": "Bạn là người Trung Quốc phải không?"
        },
        {
          "zh": "你想喝咖啡吗？",
          "py": "Nǐ xiǎng hē kāfēi ma?",
          "vi": "Bạn muốn uống cà phê không?"
        },
        {
          "zh": "今天冷吗？",
          "py": "Jīntiān lěng ma?",
          "vi": "Hôm nay trời có lạnh không?"
        }
      ],
      "viNote": "Đặt ở cuối câu trần thuật để biến câu thành câu hỏi Yes/No; tương đương \"à / ư / hả / phải không\"."
    },
    {
      "id": "G1-004",
      "level": "hsk1",
      "name": "Phó từ phủ định 不",
      "pattern": "不 + Động từ / Tính từ",
      "examples": [
        {
          "zh": "我不喝茶。",
          "py": "Wǒ bù hē chá.",
          "vi": "Tôi không uống trà."
        },
        {
          "zh": "今天天气不热。",
          "py": "Jīntiān tiānqì bú rè.",
          "vi": "Hôm nay thời tiết không nóng."
        },
        {
          "zh": "他不去学校。",
          "py": "Tā bú qù xuéxiào.",
          "vi": "Anh ấy không đi đến trường."
        }
      ],
      "viNote": "Phủ định thói quen hoặc hành động hiện tại/tương lai; biến điệu thành bú khi đứng trước âm tiết thanh 4."
    },
    {
      "id": "G1-005",
      "level": "hsk1",
      "name": "Đại từ nghi vấn 什么",
      "pattern": "Động từ + 什么 / 什么 + Danh từ",
      "examples": [
        {
          "zh": "你叫什么名字？",
          "py": "Nǐ jiào shénme míngzi?",
          "vi": "Bạn tên là gì?"
        },
        {
          "zh": "你想吃什么？",
          "py": "Nǐ xiǎng chī shénme?",
          "vi": "Bạn muốn ăn cái gì?"
        },
        {
          "zh": "这是什么书？",
          "py": "Zhè shì shénme shū?",
          "vi": "Đây là sách gì?"
        }
      ],
      "viNote": "Nghĩa là \"cái gì / gì\"; vị trí trong câu giữ nguyên tại thành phần muốn hỏi, không đảo lên đầu câu."
    },
    {
      "id": "G1-006",
      "level": "hsk1",
      "name": "Đại từ nghi vấn 哪 và 哪儿",
      "pattern": "哪 + Lượng từ + Danh từ / 在 + 哪儿",
      "examples": [
        {
          "zh": "你是哪国人？",
          "py": "Nǐ shì nǎ guó rén?",
          "vi": "Bạn là người nước nào?"
        },
        {
          "zh": "你在哪儿工作？",
          "py": "Nǐ zài nǎr gōngzuò?",
          "vi": "Bạn làm việc ở đâu?"
        },
        {
          "zh": "哪本书是你的？",
          "py": "Nǎ běn shū shì nǐ de?",
          "vi": "Cuốn sách nào là của bạn?"
        }
      ],
      "viNote": "哪 nghĩa là \"nào\" (lựa chọn trong một tập hợp); 哪儿 nghĩa là \"ở đâu\" (nơi chốn)."
    },
    {
      "id": "G1-007",
      "level": "hsk1",
      "name": "Phó từ 也 và 都",
      "pattern": "Chủ ngữ + 也 / 都 + Động từ / Tính từ",
      "examples": [
        {
          "zh": "我也是越南人。",
          "py": "Wǒ yě shì Yuènán rén.",
          "vi": "Tôi cũng là người Việt Nam."
        },
        {
          "zh": "他们都是医生。",
          "py": "Tāmen dōu shì yīshēng.",
          "vi": "Họ đều là bác sĩ."
        },
        {
          "zh": "我们也都去。",
          "py": "Wǒmen yě dōu qù.",
          "vi": "Chúng tôi cũng đều đi."
        }
      ],
      "viNote": "Đều đứng trước vị ngữ động từ/tính từ; nếu đi cùng nhau thì trật tự luôn là 也 đứng trước 都."
    },
    {
      "id": "G1-008",
      "level": "hsk1",
      "name": "Vị ngữ tính từ với 很",
      "pattern": "Chủ ngữ + 很 + Tính từ",
      "examples": [
        {
          "zh": "我很高兴。",
          "py": "Wǒ hěn gāoxìng.",
          "vi": "Tôi rất vui."
        },
        {
          "zh": "汉语不太难。",
          "py": "Hànyǔ bú tài nán.",
          "vi": "Tiếng Hán không khó lắm."
        },
        {
          "zh": "这件衣服很漂亮。",
          "py": "Zhè jiàn yīfu hěn piàoliang.",
          "vi": "Chiếc áo này rất đẹp."
        }
      ],
      "viNote": "Chữ 很 ở đây mang tính liên kết ngữ pháp tạo câu hoàn chỉnh, sắc thái không nhất thiết quá mạnh."
    },
    {
      "id": "G1-009",
      "level": "hsk1",
      "name": "Đại từ chỉ thị 这 và 那",
      "pattern": "这 / 那 + (Lượng từ) + Danh từ",
      "examples": [
        {
          "zh": "这是我的书。",
          "py": "Zhè shì wǒ de shū.",
          "vi": "Đây là sách của tôi."
        },
        {
          "zh": "那个苹果很大。",
          "py": "Nà ge píngguǒ hěn dà.",
          "vi": "Quả táo kia rất to."
        },
        {
          "zh": "这些汉字很容易。",
          "py": "Zhèxiē Hànzì hěn róngyì.",
          "vi": "Những chữ Hán này rất dễ."
        }
      ],
      "viNote": "这 chỉ sự vật ở gần người nói; 那 chỉ sự vật ở xa người nói; khi đứng trước danh từ phải có lượng từ."
    },
    {
      "id": "G1-010",
      "level": "hsk1",
      "name": "Hỏi tuổi tác với 几岁 vs 多大",
      "pattern": "Chủ ngữ + 今年 + 几岁 / 多大？",
      "examples": [
        {
          "zh": "你女儿今年几岁？",
          "py": "Nǐ nǚ'ér jīnnián jǐ suì?",
          "vi": "Con gái bạn năm nay mấy tuổi?"
        },
        {
          "zh": "你今年多大？",
          "py": "Nǐ jīnnián duō dà?",
          "vi": "Năm nay bạn bao nhiêu tuổi?"
        },
        {
          "zh": "他今年二十岁。",
          "py": "Tā jīnnián èrshí suì.",
          "vi": "Anh ấy năm nay hai mươi tuổi."
        }
      ],
      "viNote": "Trẻ em dưới 10 tuổi dùng 几岁; người cùng trang lứa dùng 多大; người già dùng 多大年纪."
    },
    {
      "id": "G1-011",
      "level": "hsk1",
      "name": "Trật tự thời gian từ Lớn đến Nhỏ",
      "pattern": "Năm + Tháng + Ngày + Thứ",
      "examples": [
        {
          "zh": "二〇二六年十月三十日星期五。",
          "py": "Èr líng èr liù nián shí yuè sānshí rì xīngqīwǔ.",
          "vi": "Thứ Sáu ngày 30 tháng 10 năm 2026."
        },
        {
          "zh": "我的生日是九月八号。",
          "py": "Wǒ de shēngrì shì jiǔ yuè bā hào.",
          "vi": "Sinh nhật của tôi là ngày 8 tháng 9."
        },
        {
          "zh": "明天是星期天。",
          "py": "Míngtiān shì xīngqītiān.",
          "vi": "Ngày mai là Chủ Nhật."
        }
      ],
      "viNote": "Ngược hoàn toàn với tiếng Việt (Việt: Ngày/Tháng/Năm; Trung: Năm/Tháng/Ngày)."
    },
    {
      "id": "G1-012",
      "level": "hsk1",
      "name": "Diễn đạt giờ giấc trong ngày",
      "pattern": "Buổi + Giờ + 点 + Phút + 分",
      "examples": [
        {
          "zh": "现在是下午两点半。",
          "py": "Xiànzài shì xiàwǔ liǎng diǎn bàn.",
          "vi": "Bây giờ là 2 giờ rưỡi chiều."
        },
        {
          "zh": "我们早上八点上课。",
          "py": "Wǒmen zǎoshang bā diǎn shàngkè.",
          "vi": "Chúng tôi vào học lúc 8 giờ sáng."
        },
        {
          "zh": "差一刻七点。",
          "py": "Chà yí kè qī diǎn.",
          "vi": "7 giờ kém 15 phút."
        }
      ],
      "viNote": "2 giờ dùng 两点 (liǎng diǎn), không dùng 二点; các buổi trong ngày (sáng/chiều) đặt trước số giờ."
    },
    {
      "id": "G1-013",
      "level": "hsk1",
      "name": "Vị trí trạng ngữ chỉ thời gian",
      "pattern": "Chủ ngữ + [Thời gian] + Động từ (hoặc [Thời gian] + S + V)",
      "examples": [
        {
          "zh": "我早上七点去上班。",
          "py": "Wǒ zǎoshang qī diǎn qù shàngbān.",
          "vi": "Tôi đi làm lúc 7 giờ sáng."
        },
        {
          "zh": "他明天回家。",
          "py": "Tā míngtiān huíjiā.",
          "vi": "Ngày mai anh ấy về nhà."
        },
        {
          "zh": "昨天晚上我看了电影。",
          "py": "Zuótiān wǎnshang wǒ kàn le diànyǐng.",
          "vi": "Tối hôm qua tôi đã xem phim."
        }
      ],
      "viNote": "Tử huyệt ngữ pháp: Thời gian BẮT BUỘC trước động từ, tuyệt đối không được đặt ở cuối câu."
    },
    {
      "id": "G1-014",
      "level": "hsk1",
      "name": "Hỏi thời điểm 什么时候",
      "pattern": "Chủ ngữ + 什么时候 + Động từ？",
      "examples": [
        {
          "zh": "你什么时候去中国？",
          "py": "Nǐ shénme shíhou qù Zhōngguó?",
          "vi": "Khi nào bạn đi Trung Quốc?"
        },
        {
          "zh": "电影什么时候开始？",
          "py": "Diànyǐng shénme shíhou kāishǐ?",
          "vi": "Khi nào phim bắt đầu?"
        },
        {
          "zh": "他什么时候来北京？",
          "py": "Tā shénme shíhou lái Běijīng?",
          "vi": "Anh ấy đến Bắc Kinh lúc nào?"
        }
      ],
      "viNote": "Hỏi thời điểm chung chung; đứng trước động từ vị ngữ, khác với 几点 (hỏi giờ cụ thể)."
    },
    {
      "id": "G1-015",
      "level": "hsk1",
      "name": "Câu chữ 有 và Phủ định 没有",
      "pattern": "Chủ ngữ + 有 / 没有 + Danh từ",
      "examples": [
        {
          "zh": "我有一台新电脑。",
          "py": "Wǒ yǒu yì tái xīn diànnǎo.",
          "vi": "Tôi có một chiếc máy tính mới."
        },
        {
          "zh": "我家没有汽车。",
          "py": "Wǒ jiā méiyǒu qìchē.",
          "vi": "Nhà tôi không có ô tô."
        },
        {
          "zh": "桌子上有三本书。",
          "py": "Zhuōzi shang yǒu sān běn shū.",
          "vi": "Trên bàn có ba cuốn sách."
        }
      ],
      "viNote": "Phủ định của 有 BẮT BUỘC là 没有; tuyệt đối cấm kỵ dùng 不有 trong mọi trường hợp."
    },
    {
      "id": "G1-016",
      "level": "hsk1",
      "name": "Trợ từ kết cấu 的 biểu thị quan hệ sở hữu",
      "pattern": "Chủ sở hữu + 的 + Vật sở hữu",
      "examples": [
        {
          "zh": "这是我的汉语老师。",
          "py": "Zhè shì wǒ de Hànyǔ lǎoshī.",
          "vi": "Đây là giáo viên tiếng Hán của tôi."
        },
        {
          "zh": "谁的手机在桌子上？",
          "py": "Shéi de shǒujī zài zhuōzi shang?",
          "vi": "Điện thoại của ai ở trên bàn?"
        },
        {
          "zh": "这是我哥哥的房间。",
          "py": "Zhè shì wǒ gēge de fángjiān.",
          "vi": "Đây là phòng của anh trai tôi."
        }
      ],
      "viNote": "Ngược với tiếng Việt: \"sách của tôi\" thành 我的书; có thể lược bỏ 的 khi chỉ quan hệ thân tộc (我爸爸)."
    },
    {
      "id": "G1-017",
      "level": "hsk1",
      "name": "Cụm số từ + Lượng từ + Danh từ",
      "pattern": "Số từ + Lượng từ + Danh từ",
      "examples": [
        {
          "zh": "我买了三本书。",
          "py": "Wǒ mǎi le sān běn shū.",
          "vi": "Tôi đã mua ba cuốn sách."
        },
        {
          "zh": "房间里有两个人。",
          "py": "Fángjiān li yǒu liǎng gè rén.",
          "vi": "Trong phòng có hai người."
        },
        {
          "zh": "请给我一张纸。",
          "py": "Qǐng gěi wǒ yì zhāng zhǐ.",
          "vi": "Xin cho tôi một tờ giấy."
        }
      ],
      "viNote": "Bắt buộc phải có lượng từ ở giữa số từ và danh từ; không bao giờ được nói 三书 hay 两人."
    },
    {
      "id": "G1-018",
      "level": "hsk1",
      "name": "Định ngữ miêu tả + 的 + Trung tâm ngữ",
      "pattern": "Tính từ / Cụm từ + 的 + Danh từ chính",
      "examples": [
        {
          "zh": "她是一个很漂亮的姑娘。",
          "py": "Tā shì yí gè hěn piàoliang de gūniang.",
          "vi": "Cô ấy là một cô gái rất xinh đẹp."
        },
        {
          "zh": "新买的衣服在床上。",
          "py": "Xīn mǎi de yīfu zài chuáng shang.",
          "vi": "Quần áo mới mua ở trên giường."
        },
        {
          "zh": "红色的苹果很甜。",
          "py": "Hóngsè de píngguǒ hěn tián.",
          "vi": "Quả táo màu đỏ rất ngọt."
        }
      ],
      "viNote": "Ngược với tiếng Việt: Từ bổ nghĩa đặt trước 的, danh từ trung tâm chính đặt sau cùng."
    },
    {
      "id": "G1-019",
      "level": "hsk1",
      "name": "Câu cầu khiến lịch sự với 请",
      "pattern": "请 + Động từ (+ Tân ngữ)",
      "examples": [
        {
          "zh": "请进，请坐！",
          "py": "Qǐng jìn, qǐng zuò!",
          "vi": "Mời vào, mời ngồi!"
        },
        {
          "zh": "请喝茶。",
          "py": "Qǐng hē chá.",
          "vi": "Mời uống trà."
        },
        {
          "zh": "请问，洗手间在哪儿？",
          "py": "Qǐngwèn, xǐshǒujiān zài nǎr?",
          "vi": "Xin hỏi, nhà vệ sinh ở đâu?"
        }
      ],
      "viNote": "Biểu thị sự lịch thiệp, tôn trọng; tương đương \"xin mời / làm ơn\" trong tiếng Việt."
    },
    {
      "id": "G1-020",
      "level": "hsk1",
      "name": "Câu trần thuật SVO cơ bản",
      "pattern": "Chủ ngữ + Động từ + Tân ngữ",
      "examples": [
        {
          "zh": "我学汉语。",
          "py": "Wǒ xué Hànyǔ.",
          "vi": "Tôi học tiếng Hán."
        },
        {
          "zh": "他吃米饭。",
          "py": "Tā chī mǐfàn.",
          "vi": "Anh ấy ăn cơm."
        },
        {
          "zh": "妈妈做中国菜。",
          "py": "Māma zuò Zhōngguó cài.",
          "vi": "Mẹ nấu món ăn Trung Quốc."
        }
      ],
      "viNote": "Khung câu cơ bản giống tiếng Việt, tuy nhiên các bổ ngữ/trạng ngữ phụ sẽ có trật tự khắt khe hơn."
    },
    {
      "id": "G1-021",
      "level": "hsk1",
      "name": "Phó từ thái quá 太...了",
      "pattern": "太 + Tính từ + 了",
      "examples": [
        {
          "zh": "这个手机太贵了！",
          "py": "Zhè ge shǒujī tài guì le!",
          "vi": "Chiếc điện thoại này đắt quá!"
        },
        {
          "zh": "今天太热了！",
          "py": "Jīntiān tài rè le!",
          "vi": "Hôm nay trời nóng quá!"
        },
        {
          "zh": "太好了，我们一起去！",
          "py": "Tài hǎo le, wǒmen yìqǐ qù!",
          "vi": "Tốt quá rồi, chúng ta cùng đi!"
        }
      ],
      "viNote": "Dùng để cảm thán mức độ vượt ngưỡng thông thường; có thể khen ngợi hoặc phàn nàn."
    },
    {
      "id": "G1-022",
      "level": "hsk1",
      "name": "Phó từ 还 biểu thị bổ sung",
      "pattern": "Chủ ngữ + 还 + 要 / 想 + Động từ",
      "examples": [
        {
          "zh": "我买了两斤苹果，还要一些香蕉。",
          "py": "Wǒ mǎi le liǎng jīn píngguǒ, hái yào yìxiē xiāngjiāo.",
          "vi": "Tôi mua 2 cân táo, còn muốn thêm một ít chuối."
        },
        {
          "zh": "他会说汉语，还会说英语。",
          "py": "Tā huì shuō Hànyǔ, hái huì shuō Yīngyǔ.",
          "vi": "Anh ấy biết nói tiếng Hán, còn biết nói tiếng Anh."
        },
        {
          "zh": "你还要别的吗？",
          "py": "Nǐ hái yào bié de ma?",
          "vi": "Bạn còn cần thứ khác không?"
        }
      ],
      "viNote": "Nghĩa là \"còn / thêm / vẫn\"; biểu thị hành động hoặc số lượng bổ sung vào cái đã có."
    },
    {
      "id": "G1-023",
      "level": "hsk1",
      "name": "Hệ thống lượng từ chuyên biệt (件, 条, 双)",
      "pattern": "Số từ + 件/条/双 + Danh từ tương ứng",
      "examples": [
        {
          "zh": "我想买两件衣服。",
          "py": "Wǒ xiǎng mǎi liǎng jiàn yīfu.",
          "vi": "Tôi muốn mua hai chiếc áo."
        },
        {
          "zh": "这条黑色裤子很长。",
          "py": "Zhè tiáo hēisè kùzi hěn cháng.",
          "vi": "Chiếc quần màu đen này rất dài."
        },
        {
          "zh": "他有一双新鞋。",
          "py": "Tā yǒu yì shuāng xīn xié.",
          "vi": "Anh ấy có một đôi giày mới."
        }
      ],
      "viNote": "件 dùng cho áo; 条 dùng cho quần/váy/sông (vật dài mỏng); 双 dùng cho đồ vật thành đôi (giày/đũa)."
    },
    {
      "id": "G1-024",
      "level": "hsk1",
      "name": "Cấu trúc câu liên động",
      "pattern": "Chủ ngữ + 去 / 来 + Nơi chốn + Động từ + Tân ngữ",
      "examples": [
        {
          "zh": "我去超市买东西。",
          "py": "Wǒ qù chāoshì mǎi dōngxi.",
          "vi": "Tôi đi siêu thị mua đồ."
        },
        {
          "zh": "他来我家看电影。",
          "py": "Tā lái wǒ jiā kàn diànyǐng.",
          "vi": "Anh ấy đến nhà tôi xem phim."
        },
        {
          "zh": "我们去饭馆吃饭吧。",
          "py": "Wǒmen qù fànguǎn chīfàn ba.",
          "vi": "Chúng mình đến nhà hàng ăn cơm đi."
        }
      ],
      "viNote": "Hai động từ diễn ra liên tiếp theo thời gian: đi đến địa điểm nào trước, rồi thực hiện hành động sau."
    },
    {
      "id": "G1-025",
      "level": "hsk1",
      "name": "Giới từ nơi chốn 在",
      "pattern": "Chủ ngữ + 在 + Địa điểm + Động từ",
      "examples": [
        {
          "zh": "我在图书馆看书。",
          "py": "Wǒ zài túshūguǎn kànshū.",
          "vi": "Tôi đọc sách ở thư viện."
        },
        {
          "zh": "他在北京大学学习。",
          "py": "Tā zài Běijīng Dàxué xuéxí.",
          "vi": "Anh ấy học tại Đại học Bắc Kinh."
        },
        {
          "zh": "妈妈在家做饭。",
          "py": "Māma zài jiā zuòfàn.",
          "vi": "Mẹ nấu cơm ở nhà."
        }
      ],
      "viNote": "Tử huyệt ngữ pháp: Địa điểm BẮT BUỘC trước động từ (Việt: Học ở trường; Trung: Ở trường học)."
    },
    {
      "id": "G1-026",
      "level": "hsk1",
      "name": "Phương vị từ chỉ vị trí",
      "pattern": "Danh từ + 上 / 下 / 前 / 后 / 里 / 外 / 旁边",
      "examples": [
        {
          "zh": "手机在桌子上。",
          "py": "Shǒujī zài zhuōzi shang.",
          "vi": "Điện thoại ở trên bàn."
        },
        {
          "zh": "学校旁边有一个大公园。",
          "py": "Xuéxiào pángbiān yǒu yí gè dà gōngyuán.",
          "vi": "Bên cạnh trường học có một công viên lớn."
        },
        {
          "zh": "教室里有很多学生。",
          "py": "Jiàoshì li yǒu hěn duō xuésheng.",
          "vi": "Trong phòng học có rất nhiều học sinh."
        }
      ],
      "viNote": "Phương vị từ đứng SAU danh từ (bàn + trên = 桌子上; phòng + trong = 房间里)."
    },
    {
      "id": "G1-027",
      "level": "hsk1",
      "name": "Đại từ 怎么 hỏi phương thức",
      "pattern": "怎么 + Động từ？",
      "examples": [
        {
          "zh": "这个汉字怎么读？",
          "py": "Zhè ge Hànzì zěnme dú?",
          "vi": "Chữ Hán này đọc như thế nào?"
        },
        {
          "zh": "去银行怎么走？",
          "py": "Qù yínháng zěnme zǒu?",
          "vi": "Đi đến ngân hàng đi như thế nào?"
        },
        {
          "zh": "这个词怎么用？",
          "py": "Zhè ge cí zěnme yòng?",
          "vi": "Từ này dùng như thế nào?"
        }
      ],
      "viNote": "Hỏi phương thức thực hiện hành động; khác với 为什么 (hỏi nguyên nhân tại sao)."
    },
    {
      "id": "G1-028",
      "level": "hsk1",
      "name": "Cấu trúc phương tiện giao thông",
      "pattern": "Chủ ngữ + 坐 / 开 + Xe + 去 + Địa điểm",
      "examples": [
        {
          "zh": "我每天坐地铁去上班。",
          "py": "Wǒ měi tiān zuò dìtiě qù shàngbān.",
          "vi": "Mỗi ngày tôi đi tàu điện ngầm đi làm."
        },
        {
          "zh": "他开汽车去机场。",
          "py": "Tā kāi qìchē qù jīchǎng.",
          "vi": "Anh ấy lái ô tô ra sân bay."
        },
        {
          "zh": "我们坐飞机去北京旅游。",
          "py": "Wǒmen zuò fēijī qù Běijīng lǚyóu.",
          "vi": "Chúng tôi đi máy bay đến Bắc Kinh du lịch."
        }
      ],
      "viNote": "坐 dùng cho phương tiện công cộng (ngồi xe); 开 dùng khi tự lái ô tô; 骑 dùng cho xe đạp, xe máy."
    },
    {
      "id": "G1-029",
      "level": "hsk1",
      "name": "Liên từ 和 & Trợ từ đề nghị 吧",
      "pattern": "A + 和 + B / Mệnh đề + 吧",
      "examples": [
        {
          "zh": "我和你一起去吧。",
          "py": "Wǒ hé nǐ yìqǐ qù ba.",
          "vi": "Tôi và bạn cùng đi nhé."
        },
        {
          "zh": "喝茶还是咖啡？喝茶吧。",
          "py": "Hē chá háishì kāfēi? Hē chá ba.",
          "vi": "Uống trà hay cà phê? Uống trà đi."
        },
        {
          "zh": "我们现在走吧。",
          "py": "Wǒmen xiànzài zǒu ba.",
          "vi": "Bây giờ chúng mình đi thôi."
        }
      ],
      "viNote": "和 chỉ dùng nối hai từ/cụm từ đồng đẳng (không nối mệnh đề câu); 吧 gợi ý, rủ rê nhẹ nhàng."
    },
    {
      "id": "G1-030",
      "level": "hsk1",
      "name": "Câu hỏi tình hình 怎么样",
      "pattern": "Chủ ngữ + 怎么样？",
      "examples": [
        {
          "zh": "今天北京的天气怎么样？",
          "py": "Jīntiān Běijīng de tiānqì zěnmeyàng?",
          "vi": "Hôm nay thời tiết Bắc Kinh thế nào?"
        },
        {
          "zh": "你的身体怎么样？",
          "py": "Nǐ de shēntǐ zěnmeyàng?",
          "vi": "Sức khỏe của bạn thế nào?"
        },
        {
          "zh": "这道菜的味道怎么样？",
          "py": "Zhè dào cài de wèidao zěnmeyàng?",
          "vi": "Mùi vị món ăn này ra sao?"
        }
      ],
      "viNote": "Hỏi thăm tình trạng, tính chất hoặc xin ý kiến đánh giá của người đối diện."
    },
    {
      "id": "G1-031",
      "level": "hsk1",
      "name": "Động từ năng nguyện 会",
      "pattern": "Chủ ngữ + 会 / 不会 + Động từ",
      "examples": [
        {
          "zh": "我会说一点儿汉语。",
          "py": "Wǒ huì shuō yìdiǎnr Hànyǔ.",
          "vi": "Tôi biết nói một chút tiếng Hán."
        },
        {
          "zh": "你会做中国菜吗？",
          "py": "Nǐ huì zuò Zhōngguó cài ma?",
          "vi": "Bạn biết nấu món Trung Quốc không?"
        },
        {
          "zh": "我弟弟不会游泳。",
          "py": "Wǒ dìdi bú huì yóuyǒng.",
          "vi": "Em trai tôi không biết bơi."
        }
      ],
      "viNote": "Nhấn mạnh kỹ năng đạt được qua quá trình học tập, rèn luyện; phủ định là 不会."
    },
    {
      "id": "G1-032",
      "level": "hsk1",
      "name": "Động từ năng nguyện 想, 喜欢 & Phó từ 最",
      "pattern": "Chủ ngữ + 想 / 喜欢 / 最喜欢 + Động từ",
      "examples": [
        {
          "zh": "我想去中国旅游。",
          "py": "Wǒ xiǎng qù Zhōngguó lǚyóu.",
          "vi": "Tôi muốn đi Trung Quốc du lịch."
        },
        {
          "zh": "她很喜欢听中国音乐。",
          "py": "Tā hěn xǐhuan tīng Zhōngguó yīnyuè.",
          "vi": "Cô ấy rất thích nghe nhạc Trung Quốc."
        },
        {
          "zh": "我最喜欢踢足球。",
          "py": "Wǒ zuì xǐhuan tī zúqiú.",
          "vi": "Tôi thích đá bóng nhất."
        }
      ],
      "viNote": "想 biểu thị nguyện vọng, dự định; 喜欢 biểu thị sở thích; 最 đứng trước cảm xúc chỉ mức độ bậc nhất."
    },
    {
      "id": "G1-033",
      "level": "hsk1",
      "name": "Trợ từ ngữ khí 了 biểu thị sự biến hóa",
      "pattern": "Mệnh đề + 了",
      "examples": [
        {
          "zh": "天天下雨，天气冷了。",
          "py": "Tiāntiān xiàyǔ, tiānqì lěng le.",
          "vi": "Ngày nào cũng mưa, thời tiết lạnh rồi."
        },
        {
          "zh": "我已经饱了，不吃了。",
          "py": "Wǒ yǐjīng bǎo le, bù chī le.",
          "vi": "Tôi đã no rồi, không ăn nữa."
        },
        {
          "zh": "下课了，我们走吧。",
          "py": "Xiàkè le, wǒmen zǒu ba.",
          "vi": "Tan học rồi, chúng mình đi thôi."
        }
      ],
      "viNote": "Đặt ở cuối câu biểu thị tình huống mới xuất hiện hoặc trạng thái có sự thay đổi so với trước."
    },
    {
      "id": "G1-034",
      "level": "hsk1",
      "name": "Động lượng từ 一下",
      "pattern": "Động từ + 一下",
      "examples": [
        {
          "zh": "请你等一下。",
          "py": "Qǐng nǐ děng yíxià.",
          "vi": "Xin bạn đợi một lát."
        },
        {
          "zh": "你看一下这本新书。",
          "py": "Nǐ kàn yíxià zhè běn xīn shū.",
          "vi": "Bạn xem qua cuốn sách mới này đi."
        },
        {
          "zh": "我来介绍一下。",
          "py": "Wǒ lái jièshào yíxià.",
          "vi": "Tôi xin tự giới thiệu một chút."
        }
      ],
      "viNote": "Đặt sau động từ làm giảm nhẹ khẩu khí, khiến câu nói lịch sự, nhẹ nhàng và tự nhiên hơn."
    },
    {
      "id": "G1-035",
      "level": "hsk1",
      "name": "Câu hỏi chính phản (V-不-V / Adj-不-Adj)",
      "pattern": "Chủ ngữ + Động từ + 不 + Động từ (+ Tân ngữ)？",
      "examples": [
        {
          "zh": "你去不去学校？",
          "py": "Nǐ qù bu qù xuéxiào?",
          "vi": "Bạn có đi trường học không?"
        },
        {
          "zh": "这个苹果甜不甜？",
          "py": "Zhège píngguǒ tián bu tián?",
          "vi": "Quả táo này ngọt hay không ngọt?"
        },
        {
          "zh": "你是不是越南人？",
          "py": "Nǐ shì bu shì Yuènán rén?",
          "vi": "Bạn có phải là người Việt Nam không?"
        }
      ],
      "viNote": "Tiếng Việt dùng \"có... không\", tiếng Trung ghép dạng khẳng định và phủ định liền nhau; tuyệt đối không thêm 吗 ở cuối câu."
    },
    {
      "id": "G1-036",
      "level": "hsk1",
      "name": "Trợ từ ngữ khí 呢 (Hỏi tỉnh lược & Nơi chốn)",
      "pattern": "Danh từ / Đại từ + 呢？",
      "examples": [
        {
          "zh": "我很好，你呢？",
          "py": "Wǒ hěn hǎo, nǐ ne?",
          "vi": "Tôi rất khỏe, còn bạn thì sao?"
        },
        {
          "zh": "我的手机呢？",
          "py": "Wǒ de shǒujī ne?",
          "vi": "Điện thoại của tôi đâu rồi?"
        },
        {
          "zh": "爸爸在喝茶，妈妈呢？",
          "py": "Bàba zài hē chá, māma ne?",
          "vi": "Bố đang uống trà, còn mẹ thì sao?"
        }
      ],
      "viNote": "Tương đương \"còn... thì sao?\" hoặc hỏi tung tích \"ở đâu rồi?\"; câu hỏi cực kỳ ngắn gọn, khẩu ngữ tự nhiên."
    },
    {
      "id": "G1-037",
      "level": "hsk1",
      "name": "Đại từ nghi vấn 谁",
      "pattern": "谁 + Động từ？ / Chủ ngữ + 是 + 谁？",
      "examples": [
        {
          "zh": "他是谁？",
          "py": "Tā shì shéi?",
          "vi": "Anh ấy là ai?"
        },
        {
          "zh": "谁想喝咖啡？",
          "py": "Shéi xiǎng hē kāfēi?",
          "vi": "Ai muốn uống cà phê?"
        },
        {
          "zh": "谁是你们的汉语老师？",
          "py": "Shéi shì nǐmen de Hànyǔ lǎoshī?",
          "vi": "Ai là giáo viên tiếng Hán của các bạn?"
        }
      ],
      "viNote": "Đại từ 谁 (đọc shéi hoặc shuí) đứng nguyên vị trí ngữ pháp của đối tượng được hỏi, không đảo trật tự câu."
    },
    {
      "id": "G1-038",
      "level": "hsk1",
      "name": "Đại từ nghi vấn 多少",
      "pattern": "多少 + (Lượng từ) + Danh từ？ / 多少钱？",
      "examples": [
        {
          "zh": "你们学校有多少学生？",
          "py": "Nǐmen xuéxiào yǒu duōshao xuésheng?",
          "vi": "Trường các bạn có bao nhiêu học sinh?"
        },
        {
          "zh": "这个书包多少钱？",
          "py": "Zhège shūbāo duōshao qián?",
          "vi": "Chiếc cặp sách này bao nhiêu tiền?"
        },
        {
          "zh": "你买多少斤苹果？",
          "py": "Nǐ mǎi duōshao jīn píngguǒ?",
          "vi": "Bạn mua bao nhiêu cân táo?"
        }
      ],
      "viNote": "几 dùng hỏi số lượng ít (<10) và bắt buộc có lượng từ; 多少 hỏi số lượng lớn hoặc không giới hạn, lượng từ có thể lược bỏ."
    },
    {
      "id": "G1-039",
      "level": "hsk1",
      "name": "Động từ năng nguyện 能 và 可以",
      "pattern": "Chủ ngữ + 能 / 可以 + Động từ",
      "examples": [
        {
          "zh": "我能坐在这里吗？",
          "py": "Wǒ néng zuò zài zhèlǐ ma?",
          "vi": "Tôi có thể ngồi ở đây không?"
        },
        {
          "zh": "你可以在这里看书。",
          "py": "Nǐ kěyǐ zài zhèlǐ kànshū.",
          "vi": "Bạn có thể đọc sách ở đây."
        },
        {
          "zh": "他今天生病了，不能来上课。",
          "py": "Tā jīntiān shēngbìng le, bù néng lái shàngkè.",
          "vi": "Hôm nay anh ấy bị ốm, không thể đến lớp."
        }
      ],
      "viNote": "能 nhấn mạnh năng lực tự thân hoặc điều kiện khách quan cho phép; 可以 nhấn mạnh sự cho phép, đồng thuận."
    },
    {
      "id": "G1-040",
      "level": "hsk1",
      "name": "Giới từ xuất phát điểm 从",
      "pattern": "从 + Nơi chốn / Thời gian + Động từ",
      "examples": [
        {
          "zh": "我从越南来。",
          "py": "Wǒ cóng Yuènán lái.",
          "vi": "Tôi đến từ Việt Nam."
        },
        {
          "zh": "我们从早上八点开始上课。",
          "py": "Wǒmen cóng zǎoshang bā diǎn kāishǐ shàngkè.",
          "vi": "Chúng tôi bắt đầu học từ 8 giờ sáng."
        },
        {
          "zh": "他从学校走路回家。",
          "py": "Tā cóng xuéxiào zǒulù huíjiā.",
          "vi": "Anh ấy đi bộ từ trường về nhà."
        }
      ],
      "viNote": "Cụm giới từ 从... phải đặt trước động từ (người Việt hay nói \"đến từ...\", tiếng Trung phải là \"từ... đến\": 从越南来)."
    },
    {
      "id": "G1-041",
      "level": "hsk1",
      "name": "Giới từ hướng đối tượng 对",
      "pattern": "对 + Đối tượng + Động từ / Tính từ",
      "examples": [
        {
          "zh": "老师对大家说：\"同学们好！\"",
          "py": "Lǎoshī duì dàjiā shuō: \"Tóngxuémen hǎo!\"",
          "vi": "Thầy giáo nói với mọi người: \"Chào các em học sinh!\""
        },
        {
          "zh": "多喝水对身体很好。",
          "py": "Duō hē shuǐ duì shēntǐ hěn hǎo.",
          "vi": "Uống nhiều nước rất tốt cho cơ thể."
        },
        {
          "zh": "他微笑着对我打招呼。",
          "py": "Tā wēixiào zhe duì wǒ dǎ zhāohu.",
          "vi": "Anh ấy mỉm cười chào tôi."
        }
      ],
      "viNote": "Biểu thị hướng về đối tượng hoặc tác động đối với ai/cái gì; cụm 对... luôn đứng trước vị ngữ."
    },
    {
      "id": "G1-042",
      "level": "hsk1",
      "name": "Phó từ cảm thán 真",
      "pattern": "真 + Tính từ (+ 了)！",
      "examples": [
        {
          "zh": "今天天气真好！",
          "py": "Jīntiān tiānqì zhēn hǎo!",
          "vi": "Hôm nay thời tiết thật là đẹp!"
        },
        {
          "zh": "你穿这件衣服真漂亮！",
          "py": "Nǐ chuān zhè jiàn yīfu zhēn piàoliang!",
          "vi": "Bạn mặc chiếc áo này thật đẹp!"
        },
        {
          "zh": "这道中国菜真好吃！",
          "py": "Zhè dào Zhōngguó cài zhēn hǎochī!",
          "vi": "Món ăn Trung Quốc này thật ngon!"
        }
      ],
      "viNote": "真 dùng bộc lộ cảm xúc khen ngợi trực tiếp của người nói; khác 很 (mang tính miêu tả khách quan)."
    },
    {
      "id": "G1-043",
      "level": "hsk1",
      "name": "Phó từ 再 (Lặp lại trong tương lai)",
      "pattern": "再 + Động từ (+ Tân ngữ)",
      "examples": [
        {
          "zh": "请您再说一遍。",
          "py": "Qǐng nín zài shuō yí biàn.",
          "vi": "Xin thầy nói lại một lần nữa ạ."
        },
        {
          "zh": "明天我们再见！",
          "py": "Míngtiān wǒmen zàijiàn!",
          "vi": "Ngày mai chúng ta gặp lại nhé!"
        },
        {
          "zh": "我想再吃一个包子。",
          "py": "Wǒ xiǎng zài chī yí gè bāozi.",
          "vi": "Tôi muốn ăn thêm một chiếc bánh bao nữa."
        }
      ],
      "viNote": "再 biểu thị hành động chưa xảy ra sẽ lặp lại hoặc làm tiếp; khác 又 (hành động đã lặp lại trong quá khứ)."
    },
    {
      "id": "G1-044",
      "level": "hsk1",
      "name": "Phó từ khẳng định / nối tiếp 就",
      "pattern": "Chủ ngữ + 就 + 是 / Động từ",
      "examples": [
        {
          "zh": "他就是我们的汉语老师。",
          "py": "Tā jiù shì wǒmen de Hànyǔ lǎoshī.",
          "vi": "Thầy ấy chính là giáo viên tiếng Hán của chúng tôi."
        },
        {
          "zh": "图书馆就在宿舍旁边。",
          "py": "Túshūguǎn jiù zài sùshè pángbiān.",
          "vi": "Thư viện ở ngay bên cạnh ký túc xá."
        },
        {
          "zh": "下了课我就去超市买东西。",
          "py": "Xià le kè wǒ jiù qù chāoshì mǎi dōngxi.",
          "vi": "Tan học là tôi đến siêu thị mua đồ ngay."
        }
      ],
      "viNote": "就 biểu thị sự khẳng định dứt khoát (\"chính là\") hoặc hành động xảy ra nhanh chóng, liền kề (\"liền, ngay\")."
    },
    {
      "id": "G1-045",
      "level": "hsk1",
      "name": "Câu mang hai tân ngữ (Song tân ngữ)",
      "pattern": "Chủ ngữ + 给 / 送 / 教 / 问 + Tân ngữ 1 (Người) + Tân ngữ 2 (Vật)",
      "examples": [
        {
          "zh": "妈妈给我十块钱。",
          "py": "Māma gěi wǒ shí kuài qián.",
          "vi": "Mẹ cho tôi mười đồng."
        },
        {
          "zh": "李老师教我们汉语。",
          "py": "Lǐ lǎoshī jiào wǒmen Hànyǔ.",
          "vi": "Thầy Lý dạy chúng tôi tiếng Hán."
        },
        {
          "zh": "朋友送我一本好书。",
          "py": "Péngyou sòng wǒ yì běn hǎo shū.",
          "vi": "Bạn tặng tôi một cuốn sách hay."
        }
      ],
      "viNote": "Tân ngữ gián tiếp chỉ người đứng trước, tân ngữ trực tiếp chỉ vật đứng sau; trật tự hoàn toàn tương đồng tiếng Việt."
    },
    {
      "id": "G1-046",
      "level": "hsk1",
      "name": "Bổ ngữ trạng thái sơ cấp với 得",
      "pattern": "Động từ + 得 + (Phó từ) + Tính từ",
      "examples": [
        {
          "zh": "他说汉语说得很好。",
          "py": "Tā shuō Hànyǔ shuō de hěn hǎo.",
          "vi": "Anh ấy nói tiếng Hán rất tốt."
        },
        {
          "zh": "弟弟跑得很快。",
          "py": "Dìdi pǎo de hěn kuài.",
          "vi": "Em trai chạy rất nhanh."
        },
        {
          "zh": "你今天起得真早！",
          "py": "Nǐ jīntiān qǐ de zhēn zǎo!",
          "vi": "Hôm nay bạn dậy thật sớm!"
        }
      ],
      "viNote": "Trợ từ kết cấu 得 đứng sau động từ để dẫn ra thành phần đánh giá trình độ/kết quả; nếu có tân ngữ thì lặp lại động từ."
    },
    {
      "id": "G1-047",
      "level": "hsk1",
      "name": "Phó từ 一起 (Cùng nhau)",
      "pattern": "(和 + Ai đó) + 一起 + Động từ",
      "examples": [
        {
          "zh": "我们一起去食堂吃饭吧。",
          "py": "Wǒmen yìqǐ qù shítáng chīfàn ba.",
          "vi": "Chúng mình cùng nhau đi nhà ăn dùng bữa đi."
        },
        {
          "zh": "我想和你一起学汉语。",
          "py": "Wǒ xiǎng hé nǐ yìqǐ xué Hànyǔ.",
          "vi": "Tôi muốn cùng bạn học tiếng Hán."
        },
        {
          "zh": "他们每天一起做作业。",
          "py": "Tāmen měitiān yìqǐ zuò zuòyè.",
          "vi": "Hàng ngày họ cùng nhau làm bài tập."
        }
      ],
      "viNote": "Phó từ 一起 đứng trước động từ để biểu thị hành động làm chung; thường kết hợp thành cặp 和...一起."
    },
    {
      "id": "G1-048",
      "level": "hsk1",
      "name": "Câu hỏi nguyên nhân 为什么",
      "pattern": "(Chủ ngữ) + 为什么 + Vị ngữ？",
      "examples": [
        {
          "zh": "你为什么想学中文？",
          "py": "Nǐ wèishénme xiǎng xué Zhōngwén?",
          "vi": "Tại sao bạn muốn học tiếng Trung?"
        },
        {
          "zh": "他今天为什么没来上课？",
          "py": "Tā jīntiān wèishénme méi lái shàngkè?",
          "vi": "Hôm nay tại sao anh ấy không đến lớp?"
        },
        {
          "zh": "为什么这里这么冷？",
          "py": "Wèishénme zhèlǐ zhème lěng?",
          "vi": "Tại sao ở đây lại lạnh như thế?"
        }
      ],
      "viNote": "Có thể đứng đầu câu hoặc ngay sau chủ ngữ để hỏi lý do (\"tại sao, vì sao\"); vế trả lời thường bắt đầu bằng 因为."
    },
    {
      "id": "G2-001",
      "level": "hsk2",
      "name": "Giới từ 给 và 帮",
      "pattern": "S + 给 / 帮 + Ai + V",
      "examples": [
        {
          "zh": "妈妈给我做饭。",
          "py": "Māma gěi wǒ zuòfàn.",
          "vi": "Mẹ nấu cơm cho tôi."
        },
        {
          "zh": "请帮我买一张票。",
          "py": "Qǐng bāng wǒ mǎi yì zhāng piào.",
          "vi": "Xin hãy giúp tôi mua một vé."
        },
        {
          "zh": "我给朋友打电话。",
          "py": "Wǒ gěi péngyou dǎ diànhuà.",
          "vi": "Tôi gọi điện thoại cho bạn."
        }
      ],
      "viNote": "Cụm giới từ đứng trước động từ; không nói 做饭给我."
    },
    {
      "id": "G2-002",
      "level": "hsk2",
      "name": "Động từ lặp lại",
      "pattern": "AA / A 一 A / ABAB",
      "examples": [
        {
          "zh": "你看一看这件衣服。",
          "py": "Nǐ kàn yí kàn zhè jiàn yīfu.",
          "vi": "Bạn xem qua chiếc áo này đi."
        },
        {
          "zh": "周末我想在宿舍休息休息。",
          "py": "Zhōumò wǒ xiǎng zài sùshè xiūxi xiūxi.",
          "vi": "Cuối tuần tôi muốn ở ký túc xá nghỉ ngơi một chút."
        },
        {
          "zh": "请大家听听这段录音。",
          "py": "Qǐng dàjiā tīngting zhè duàn lùyīn.",
          "vi": "Xin mời mọi người nghe đoạn ghi âm này."
        }
      ],
      "viNote": "Biểu thị động tác diễn ra trong thời gian ngắn, thử làm gì đó, giọng điệu nhẹ nhàng."
    },
    {
      "id": "G2-003",
      "level": "hsk2",
      "name": "Cấu trúc 对...感兴趣",
      "pattern": "对 + N + 感兴趣 / 有帮助",
      "examples": [
        {
          "zh": "我对学汉语很感兴趣。",
          "py": "Wǒ duì xué Hànyǔ hěn gǎn xìngqù.",
          "vi": "Tôi rất có hứng thú với việc học tiếng Trung."
        },
        {
          "zh": "看电影对学外语很有帮助。",
          "py": "Kàn diànyǐng duì xué wàiyǔ hěn yǒu bāngzhù.",
          "vi": "Xem phim rất có ích cho việc học ngoại ngữ."
        }
      ],
      "viNote": "对 đóng vai trò giới từ hướng đối tượng: \"đối với cái gì đó\"."
    },
    {
      "id": "G2-004",
      "level": "hsk2",
      "name": "Trợ từ kinh nghiệm 过",
      "pattern": "S + V + 过 + N",
      "examples": [
        {
          "zh": "我去过两次北京。",
          "py": "Wǒ qù guo liǎng cì Běijīng.",
          "vi": "Tôi từng đi Bắc Kinh hai lần."
        },
        {
          "zh": "你吃过北京烤鸭吗？",
          "py": "Nǐ chī guo Běijīng kǎoyā ma?",
          "vi": "Bạn từng ăn vịt quay Bắc Kinh chưa?"
        },
        {
          "zh": "我没看过这部电影。",
          "py": "Wǒ méi kàn guo zhè bù diànyǐng.",
          "vi": "Tôi chưa từng xem bộ phim này."
        }
      ],
      "viNote": "Nhấn mạnh trải nghiệm trong quá khứ từng xảy ra; phủ định dùng 没...过."
    },
    {
      "id": "G2-005",
      "level": "hsk2",
      "name": "Bổ ngữ xu hướng đơn",
      "pattern": "V + 来 / 去",
      "examples": [
        {
          "zh": "他从教室走出来了。",
          "py": "Tā cóng jiàoshì zǒu chūlái le.",
          "vi": "Anh ấy từ phòng học bước ra ngoài này."
        },
        {
          "zh": "你快上来吧。",
          "py": "Nǐ kuài shànglái ba.",
          "vi": "Bạn mau lên đây đi."
        },
        {
          "zh": "老师进去了。",
          "py": "Lǎoshī jìnqù le.",
          "vi": "Thầy giáo đi vào trong đó rồi."
        }
      ],
      "viNote": "来 (hướng về phía người nói), 去 (rời xa vị trí người nói)."
    },
    {
      "id": "G2-006",
      "level": "hsk2",
      "name": "Cấu trúc sắp diễn ra 快...了",
      "pattern": "快(要) / 就要 + V + 了",
      "examples": [
        {
          "zh": "火车快要开了。",
          "py": "Huǒchē kuàiyào kāi le.",
          "vi": "Tàu hỏa sắp chạy rồi."
        },
        {
          "zh": "下个月我们就要放假了。",
          "py": "Xià gè yuè wǒmen jiù yào fàngjià le.",
          "vi": "Tháng sau chúng tôi sắp được nghỉ rồi."
        },
        {
          "zh": "天快黑了。",
          "py": "Tiān kuài hēi le.",
          "vi": "Trời sắp tối rồi."
        }
      ],
      "viNote": "Biểu thị sự việc sắp sửa xảy ra trong tương lai rất gần; nếu có thời gian cụ thể dùng 就要...了, không dùng 快要...了."
    },
    {
      "id": "G2-007",
      "level": "hsk2",
      "name": "Trợ từ trạng thái 着",
      "pattern": "V + 着",
      "examples": [
        {
          "zh": "门开着，老师坐着看书。",
          "py": "Mén kāi zhe, lǎoshī zuò zhe kànshū.",
          "vi": "Cửa đang mở, thầy đang ngồi đọc sách."
        },
        {
          "zh": "他手里拿着一本词典。",
          "py": "Tā shǒulǐ ná zhe yì běn cídiǎn.",
          "vi": "Trong tay anh ấy đang cầm một cuốn từ điển."
        }
      ],
      "viNote": "Duy trì trạng thái của động tác; khác với 正在 (đang thực hiện hành động)."
    },
    {
      "id": "G2-008",
      "level": "hsk2",
      "name": "So sánh hơn với 比",
      "pattern": "A + 比 + B + Adj",
      "examples": [
        {
          "zh": "哥哥比我高。",
          "py": "Gēge bǐ wǒ gāo.",
          "vi": "Anh trai cao hơn tôi."
        },
        {
          "zh": "今天的气温比昨天低一点儿。",
          "py": "Jīntiān de qìwēn bǐ zuótiān dī yìdiǎnr.",
          "vi": "Nhiệt độ hôm nay thấp hơn hôm qua một chút."
        }
      ],
      "viNote": "Không dùng 很, 非常 sau tính từ so sánh (比我很高 là sai)."
    },
    {
      "id": "G2-009",
      "level": "hsk2",
      "name": "Đại từ chỉ số lượng 每...都",
      "pattern": "每 + Lượng_từ + N + 都 + V",
      "examples": [
        {
          "zh": "他每天都去跑步。",
          "py": "Tā měi tiān dōu qù pǎobù.",
          "vi": "Ngày nào anh ấy cũng đi chạy bộ."
        },
        {
          "zh": "我们每个星期都有测试。",
          "py": "Wǒmen měi gè xīngqī dōu yǒu cèshì.",
          "vi": "Mỗi tuần chúng tôi đều có bài kiểm tra."
        }
      ],
      "viNote": "Sau 每 thường có 都 đi kèm để nhấn mạnh tính toàn thể."
    },
    {
      "id": "G2-010",
      "level": "hsk2",
      "name": "Bổ ngữ kết quả sơ cấp",
      "pattern": "V + 完 / 懂 / 见 / 到",
      "examples": [
        {
          "zh": "我做完作业了。",
          "py": "Wǒ zuò wán zuòyè le.",
          "vi": "Tôi làm xong bài tập rồi."
        },
        {
          "zh": "你听懂老师的话了吗？",
          "py": "Nǐ tīngdǒng lǎoshī de huà le ma?",
          "vi": "Bạn nghe hiểu lời thầy nói chưa?"
        },
        {
          "zh": "我看见他进图书馆了。",
          "py": "Wǒ kànjiàn tā jìn túshūguǎn le.",
          "vi": "Tôi nhìn thấy anh ấy vào thư viện rồi."
        }
      ],
      "viNote": "Động từ kết quả gắn liền ngay sau động từ chính không tách rời."
    },
    {
      "id": "G2-011",
      "level": "hsk2",
      "name": "Câu hỏi lựa chọn 还是",
      "pattern": "A + 还是 + B？",
      "examples": [
        {
          "zh": "你喝茶还是咖啡？",
          "py": "Nǐ hē chá háishì kāfēi?",
          "vi": "Bạn uống trà hay là cà phê?"
        },
        {
          "zh": "我们坐地铁去还是打车去？",
          "py": "Wǒmen zuò dìtiě qù háishì dǎchē qù?",
          "vi": "Chúng ta đi tàu điện ngầm hay đi taxi?"
        }
      ],
      "viNote": "还是 dùng trong câu hỏi; câu trần thuật dùng 或者 (hoặc là)."
    },
    {
      "id": "G2-012",
      "level": "hsk2",
      "name": "Cấu trúc phủ định tuyệt đối",
      "pattern": "一点儿 + 也 / 都 + 不 + Adj / V",
      "examples": [
        {
          "zh": "这个汉字一点儿也不难。",
          "py": "Zhège Hànzì yìdiǎnr yě bù nán.",
          "vi": "Chữ Hán này một chút cũng không khó."
        },
        {
          "zh": "我一点儿都不累。",
          "py": "Wǒ yìdiǎnr dōu bú lèi.",
          "vi": "Tôi chẳng thấy mệt chút nào."
        }
      ],
      "viNote": "Nhấn mạnh sự phủ định hoàn toàn: \"không một chút nào\"."
    },
    {
      "id": "G2-013",
      "level": "hsk2",
      "name": "Cấu trúc nhấn mạnh 是...的",
      "pattern": "S + 是 + [Thời gian/Địa điểm/Cách thức] + V + 的",
      "examples": [
        {
          "zh": "我是昨天坐飞机来的。",
          "py": "Wǒ shì zuótiān zuò fēijī lái de.",
          "vi": "Tôi đến hôm qua bằng máy bay."
        },
        {
          "zh": "这本书是在新华书店买的。",
          "py": "Zhè běn shū shì zài Xīnhuá shūdiàn mǎi de.",
          "vi": "Cuốn sách này được mua ở nhà sách Tân Hoa."
        }
      ],
      "viNote": "Dùng khi hành động đã xảy ra, muốn nhấn mạnh cách thức, nơi chốn, thời gian thực hiện."
    },
    {
      "id": "G2-014",
      "level": "hsk2",
      "name": "Động từ ly hợp cơ bản",
      "pattern": "V - O (睡觉, 唱歌, 跑步, 游泳)",
      "examples": [
        {
          "zh": "他睡了八个小时觉。",
          "py": "Tā shuì le bā gè xiǎoshí jiào.",
          "vi": "Anh ấy đã ngủ 8 tiếng đồng hồ."
        },
        {
          "zh": "我们唱了一下午歌。",
          "py": "Wǒmen chàng le yí xiàwǔ gē.",
          "vi": "Chúng tôi đã hát cả một buổi chiều."
        }
      ],
      "viNote": "Thành phần bổ ngữ thời lượng phải chèn vào GIỮA hai từ: 睡 + Thời lượng + 觉."
    },
    {
      "id": "G2-015",
      "level": "hsk2",
      "name": "Giới từ khoảng cách 从...到...",
      "pattern": "从 + Điểm_A + 到 + Điểm_B",
      "examples": [
        {
          "zh": "从我家到学校不远。",
          "py": "Cóng wǒ jiā dào xuéxiào bù yuǎn.",
          "vi": "Từ nhà tôi đến trường không xa."
        },
        {
          "zh": "从星期一到星期五我们都要上课。",
          "py": "Cóng xīngqīyī dào xīngqīwǔ wǒmen dōu yào shàngkè.",
          "vi": "Từ thứ Hai đến thứ Sáu chúng tôi đều phải đi học."
        }
      ],
      "viNote": "Dùng được cho cả không gian (từ đâu đến đâu) lẫn thời gian."
    },
    {
      "id": "G2-016",
      "level": "hsk2",
      "name": "Phó từ tiếp diễn 正在...呢",
      "pattern": "S + 正在 + V + (呢)",
      "examples": [
        {
          "zh": "他正在打手机呢。",
          "py": "Tā zhèngzài dǎ shǒujī ne.",
          "vi": "Anh ấy đang gọi điện thoại đấy."
        },
        {
          "zh": "我们正在上汉语课呢。",
          "py": "Wǒmen zhèngzài shàng Hànyǔ kè ne.",
          "vi": "Chúng tôi đang trong giờ học tiếng Hán đây."
        }
      ],
      "viNote": "Biểu thị hành vi đang trong quá trình tiến hành; tương đương \"đang... đấy\"."
    },
    {
      "id": "G2-017",
      "level": "hsk2",
      "name": "So sánh kém với 没有",
      "pattern": "A + 没有 + B + Adj",
      "examples": [
        {
          "zh": "昨天没有今天热。",
          "py": "Zuótiān méiyǒu jīntiān rè.",
          "vi": "Hôm qua không nóng bằng hôm nay."
        },
        {
          "zh": "他没有我高。",
          "py": "Tā méiyǒu wǒ gāo.",
          "vi": "Anh ấy không cao bằng tôi."
        }
      ],
      "viNote": "Hình thức so sánh kém: A không bằng B về mặt tính chất nào đó."
    },
    {
      "id": "G2-018",
      "level": "hsk2",
      "name": "Liên từ chuyển ý 虽然...但是...",
      "pattern": "虽然...，但是...",
      "examples": [
        {
          "zh": "虽然很累，但是很高兴。",
          "py": "Suīrán hěn lèi, dànshì hěn gāoxìng.",
          "vi": "Tuy rất mệt, nhưng rất vui."
        },
        {
          "zh": "汉语虽然难学，但是很有意思。",
          "py": "Hànyǔ suīrán nán xué, dànshì hěn yǒu yìsi.",
          "vi": "Tiếng Hán tuy khó học, nhưng rất thú vị."
        }
      ],
      "viNote": "Biểu thị mối quan hệ nhượng bộ và chuyển hướng ngữ nghĩa; tương đương \"tuy... nhưng\"."
    },
    {
      "id": "G2-019",
      "level": "hsk2",
      "name": "Cấu trúc biến đổi 越...越...",
      "pattern": "S + 越 + Adj_1 + 越 + Adj_2 / 越来越 + Adj",
      "examples": [
        {
          "zh": "雨越来越大了。",
          "py": "Yǔ yuè lái yuè dà le.",
          "vi": "Mưa càng lúc càng to rồi."
        },
        {
          "zh": "风越刮越大。",
          "py": "Fēng yuè guā yuè dà.",
          "vi": "Gió càng thổi càng mạnh."
        }
      ],
      "viNote": "Biểu thị mức độ phát triển theo thời gian hoặc điều kiện tăng tiến."
    },
    {
      "id": "G2-020",
      "level": "hsk2",
      "name": "Liên từ nguyên nhân 因为...所以...",
      "pattern": "因为...，所以...",
      "examples": [
        {
          "zh": "因为下雨，所以没去。",
          "py": "Yīnwèi xiàyǔ, suǒyǐ méi qù.",
          "vi": "Vì trời mưa, cho nên không đi."
        },
        {
          "zh": "因为他生病了，所以今天请假。",
          "py": "Yīnwèi tā shēngbìng le, suǒyǐ jīntiān qǐngjià.",
          "vi": "Vì anh ấy bị ốm, cho nên hôm nay xin nghỉ."
        }
      ],
      "viNote": "Nêu rõ mối quan hệ nhân quả; có thể lược bớt một trong hai vế trong khẩu ngữ."
    },
    {
      "id": "G2-021",
      "level": "hsk2",
      "name": "So sánh bằng 跟...一样",
      "pattern": "A + 跟 + B + 一样 + (Adj)",
      "examples": [
        {
          "zh": "这本书跟我的一样。",
          "py": "Zhè běn shū gēn wǒ de yíyàng.",
          "vi": "Cuốn sách này giống hệt cuốn của tôi."
        },
        {
          "zh": "弟弟跑得跟我一样快。",
          "py": "Dìdi pǎo de gēn wǒ yíyàng kuài.",
          "vi": "Em trai chạy nhanh bằng tôi."
        }
      ],
      "viNote": "Phủ định dùng 跟...不一样 (không giống nhau)."
    },
    {
      "id": "G2-022",
      "level": "hsk2",
      "name": "Bổ ngữ khả năng sơ cấp",
      "pattern": "V + 得 / 不 + 了",
      "examples": [
        {
          "zh": "我吃不了这么多。",
          "py": "Wǒ chī bù liǎo zhème duō.",
          "vi": "Tôi không ăn hết được nhiều thế này."
        },
        {
          "zh": "明天的事，我忘不了。",
          "py": "Míngtiān de shì, wǒ wàng bù liǎo.",
          "vi": "Chuyện ngày mai, tôi không quên được đâu."
        }
      ],
      "viNote": "Biểu thị khả năng chủ quan hoặc khách quan có thể thực hiện được hành động hay không."
    },
    {
      "id": "G2-023",
      "level": "hsk2",
      "name": "Cấu trúc loại trừ 除...以外",
      "pattern": "除了 + A + 以外，都 / 还...",
      "examples": [
        {
          "zh": "除了他，我们都去。",
          "py": "Chúle tā yǐwài, wǒmen dōu qù.",
          "vi": "Ngoại trừ anh ấy, chúng tôi đều đi."
        },
        {
          "zh": "除了英语以外，他还会说中文。",
          "py": "Chúle Yīngyǔ yǐwài, tā hái huì shuō Zhōngwén.",
          "vi": "Ngoài tiếng Anh ra, anh ấy còn biết nói tiếng Trung."
        }
      ],
      "viNote": "Đi với 都 mang nghĩa \"loại trừ\"; đi với 还 mang nghĩa \"ngoài ra... còn\"."
    },
    {
      "id": "G2-024",
      "level": "hsk2",
      "name": "Trợ từ động thái 了 (Hoàn thành)",
      "pattern": "V + 了 + Tân_ngữ_xác_định",
      "examples": [
        {
          "zh": "我买了一本书。",
          "py": "Wǒ mǎi le yì běn shū.",
          "vi": "Tôi đã mua một cuốn sách."
        },
        {
          "zh": "今天早上我喝了两杯咖啡。",
          "py": "Jīntiān zǎoshang wǒ hē le liǎng bēi kāfēi.",
          "vi": "Sáng nay tôi đã uống hai cốc cà phê."
        }
      ],
      "viNote": "Khác với 了 cuối câu: 了 này đứng ngay sau động từ nhấn mạnh sự hoàn tất của hành động."
    }
  ],
  "falseFriends": [
    {
      "hanzi": "东西",
      "py": "dōngxi",
      "hanViet": "Đông Tây",
      "trueMeaning": "Đồ vật, đồ đạc, thứ",
      "trap": "Dễ hiểu nhầm là hướng Đông - Tây (phương hướng trong tiếng Trung là 东方和西方).",
      "example": {
        "zh": "我去超市买点儿东西。",
        "py": "Wǒ qù chāoshì mǎi diǎnr dōngxi.",
        "vi": "Tôi đi siêu thị mua ít đồ."
      }
    },
    {
      "hanzi": "爱人",
      "py": "àiren",
      "hanViet": "Ái nhân",
      "trueMeaning": "Chồng hoặc vợ (bạn đời chính thức)",
      "trap": "Dễ hiểu nhầm là người tình, bồ nhí (người yêu trong tiếng Trung là 恋人 / 男朋友 / 女朋友).",
      "example": {
        "zh": "他向大家介绍他的爱人。",
        "py": "Tā xiàng dàjiā jièshào tā de àiren.",
        "vi": "Anh ấy giới thiệu vợ của mình với mọi người."
      }
    },
    {
      "hanzi": "新闻",
      "py": "xīnwén",
      "hanViet": "Tân văn",
      "trueMeaning": "Tin tức, thời sự",
      "trap": "Dễ hiểu nhầm là bài văn mới hoặc nghe chuyện mới lạ.",
      "example": {
        "zh": "爸爸每天晚上看新闻。",
        "py": "Bàba měitiān wǎnshang kàn xīnwén.",
        "vi": "Bố mỗi tối đều xem tin tức thời sự."
      }
    },
    {
      "hanzi": "困难",
      "py": "kùnnan",
      "hanViet": "Khốn nan",
      "trueMeaning": "Khó khăn, gian nan, trở ngại",
      "trap": "Dễ sợ từ \"khốn nạn\" mang sắc thái chửi bới vô đạo đức trong tiếng Việt.",
      "example": {
        "zh": "遇到困难时不要轻易放弃。",
        "py": "Yùdào kùnnan shí bú yào qīngyì fàngqì.",
        "vi": "Khi gặp khó khăn đừng dễ dàng từ bỏ."
      }
    },
    {
      "hanzi": "手段",
      "py": "shǒuduàn",
      "hanViet": "Thủ đoạn",
      "trueMeaning": "Phương pháp, biện pháp, cách thức tiến hành",
      "trap": "Dễ nghĩ là mưu mô xảo quyệt tiêu cực (trong tiếng Trung mang nghĩa trung tính).",
      "example": {
        "zh": "练习听力也是学外语的有效手段。",
        "py": "Liànxí tīnglì yě shì xué wàiyǔ de yǒuxiào shǒuduàn.",
        "vi": "Luyện nghe cũng là một biện pháp học ngoại ngữ hiệu quả."
      }
    },
    {
      "hanzi": "方便",
      "py": "fāngbiàn",
      "hanViet": "Phương tiện",
      "trueMeaning": "Thuận tiện, tiện lợi (hoặc đi vệ sinh)",
      "trap": "Dễ nghĩ là xe cộ/phương tiện đi lại (tiếng Trung là 交通工具).",
      "example": {
        "zh": "坐地铁又快又方便。",
        "py": "Zuò dìtiě yòu kuài yòu fāngbiàn.",
        "vi": "Đi tàu điện ngầm vừa nhanh vừa thuận tiện."
      }
    },
    {
      "hanzi": "大意",
      "py": "dàyì",
      "hanViet": "Đại ý",
      "trueMeaning": "1) Sơ suất, bất cẩn, lơ là; 2) Ý chính",
      "trap": "Dễ bỏ quên nghĩa dùng phổ biến nhất hàng ngày: \"bất cẩn, sơ suất, lơ là\".",
      "example": {
        "zh": "考试时千万不能大意。",
        "py": "Kǎoshì shí qiānwàn bù néng dàyì.",
        "vi": "Lúc làm bài thi tuyệt đối không được sơ suất bất cẩn."
      }
    },
    {
      "hanzi": "仔细",
      "py": "zǐxì",
      "hanViet": "Tử tế",
      "trueMeaning": "Tỉ mỉ, cẩn thận, kỹ càng",
      "trap": "Dễ nghĩ là người tốt bụng, ăn ở đàng hoàng tử tế (tốt bụng tiếng Trung là 善良, 热情).",
      "example": {
        "zh": "请你仔细看这道题。",
        "py": "Qǐng nǐ zǐxì kàn zhè dào tí.",
        "vi": "Xin bạn hãy xem thật kỹ lưỡng câu hỏi này."
      }
    },
    {
      "hanzi": "告诉",
      "py": "gàosu",
      "hanViet": "Cáo tố",
      "trueMeaning": "Nói cho biết, bảo cho biết, thông báo",
      "trap": "Dễ nghĩ là tố cáo, khởi kiện ra tòa (khởi kiện tiếng Trung là 起诉 hoặc 告状).",
      "example": {
        "zh": "请告诉我你的决定。",
        "py": "Qǐng gàosu wǒ nǐ de juédìng.",
        "vi": "Xin hãy nói cho tôi biết quyết định của bạn."
      }
    },
    {
      "hanzi": "走",
      "py": "zǒu",
      "hanViet": "Tẩu",
      "trueMeaning": "Đi bộ, rời đi",
      "trap": "Dễ nghĩ là chạy trốn, tẩu thoát (trong tiếng Trung \"chạy\" là 跑 pǎo, 走 chỉ là đi bộ thông thường).",
      "example": {
        "zh": "我们一起走路去学校吧。",
        "py": "Wǒmen yìqǐ zǒulù qù xuéxiào ba.",
        "vi": "Chúng mình cùng đi bộ đến trường đi."
      }
    },
    {
      "hanzi": "别",
      "py": "bié",
      "hanViet": "Biệt",
      "trueMeaning": "Đừng, chớ (cấm đoán); khác",
      "trap": "Dễ nghĩ là từ biệt hoặc phân biệt, quên mất nghĩa phủ định cấm đoán hàng ngày.",
      "example": {
        "zh": "你别走，听我解释。",
        "py": "Nǐ bié zǒu, tīng wǒ jiěshì.",
        "vi": "Bạn đừng đi, hãy nghe tôi giải thích."
      }
    },
    {
      "hanzi": "单位",
      "py": "dānwèi",
      "hanViet": "Đơn vị",
      "trueMeaning": "Cơ quan, nơi làm việc, công ty",
      "trap": "Dễ hiểu nhầm chỉ là đơn vị đo lường (mét, kg...), không biết nghĩa cơ quan nơi công tác.",
      "example": {
        "zh": "你在哪个单位工作？",
        "py": "Nǐ zài nǎge dānwèi gōngzuò?",
        "vi": "Bạn làm việc ở cơ quan nào?"
      }
    },
    {
      "hanzi": "地方",
      "py": "dìfang",
      "hanViet": "Địa phương",
      "trueMeaning": "Chỗ, nơi, địa điểm",
      "trap": "Dễ hiểu nhầm chỉ là cấp chính quyền địa phương đối lập với trung ương.",
      "example": {
        "zh": "这个地方真漂亮！",
        "py": "Zhège dìfang zhēn piàoliang!",
        "vi": "Nơi này thật là đẹp!"
      }
    },
    {
      "hanzi": "工作",
      "py": "gōngzuò",
      "hanViet": "Công tác",
      "trueMeaning": "Công việc, làm việc, đi làm",
      "trap": "Dễ hiểu nhầm chỉ là đi công tác xa ngắn hạn (tiếng Trung đi công tác là 出差 chūchāi).",
      "example": {
        "zh": "爸爸在医院工作。",
        "py": "Bàba zài yīyuàn gōngzuò.",
        "vi": "Bố làm việc ở bệnh viện."
      }
    },
    {
      "hanzi": "生气",
      "py": "shēngqì",
      "hanViet": "Sinh khí",
      "trueMeaning": "Tức giận, giận dỗi, cáu gắt",
      "trap": "Dễ hiểu nhầm là tràn đầy sức sống, sinh khí dồi dào mãnh liệt.",
      "example": {
        "zh": "他今天很生气，不要打扰他。",
        "py": "Tā jīntiān hěn shēngqì, bú yào dǎrǎo tā.",
        "vi": "Hôm nay anh ấy rất tức giận, đừng làm phiền anh ấy."
      }
    },
    {
      "hanzi": "小心",
      "py": "xiǎoxīn",
      "hanViet": "Tiểu tâm",
      "trueMeaning": "Cẩn thận, coi chừng, chú ý",
      "trap": "Dễ hiểu nhầm là người nhỏ nhen, hẹp hòi, tiểu nhân.",
      "example": {
        "zh": "路上车多，你开车要小心。",
        "py": "Lùshang chē duō, nǐ kāichē yào xiǎoxīn.",
        "vi": "Trên đường nhiều xe, bạn lái xe phải cẩn thận nhé."
      }
    },
    {
      "hanzi": "认真",
      "py": "rènzhēn",
      "hanViet": "Nhận chân",
      "trueMeaning": "Nghiêm túc, chăm chỉ, cẩn thận",
      "trap": "Dễ hiểu nhầm là nhận ra chân tướng sự thật.",
      "example": {
        "zh": "学生们都在认真听课。",
        "py": "Xuéshengmen dōu zài rènzhēn tīngkè.",
        "vi": "Các em học sinh đều đang chăm chú nghe giảng."
      }
    },
    {
      "hanzi": "漂亮",
      "py": "piàoliang",
      "hanViet": "Phiêu lượng",
      "trueMeaning": "Xinh đẹp, đẹp đẽ, xuất sắc",
      "trap": "Dễ hiểu nhầm là nổi trôi bồng bềnh, phiêu dạt lướt qua.",
      "example": {
        "zh": "你穿这件衣服真漂亮！",
        "py": "Nǐ chuān zhè jiàn yīfu zhēn piàoliang!",
        "vi": "Bạn mặc chiếc áo này thật là đẹp!"
      }
    },
    {
      "hanzi": "点心",
      "py": "diǎnxin",
      "hanViet": "Điểm tâm",
      "trueMeaning": "Bánh ngọt, món ăn nhẹ, đồ tráng miệng, dimsum",
      "trap": "Dễ hiểu nhầm chỉ là bữa ăn sáng (điểm tâm sáng).",
      "example": {
        "zh": "下午我们吃点儿中国点心吧。",
        "py": "Xiàwǔ wǒmen chī diǎnr Zhōngguó diǎnxin ba.",
        "vi": "Chiều nay chúng ta ăn ít bánh ngọt Trung Quốc nhé."
      }
    },
    {
      "hanzi": "老婆",
      "py": "lǎopo",
      "hanViet": "Lão bà",
      "trueMeaning": "Vợ, bà xã (xưng hô thân mật, dùng cho cả vợ trẻ)",
      "trap": "Dễ hiểu nhầm là bà già, bà lão (tiếng Trung bà lão là 老太太).",
      "example": {
        "zh": "这是我老婆，我们去年结婚的。",
        "py": "Zhè shì wǒ lǎopo, wǒmen qùnián jiéhūn de.",
        "vi": "Đây là vợ tôi, chúng tôi kết hôn năm ngoái."
      }
    }
  ]
};

  if (typeof window !== 'undefined') {
    window.CURRICULUM = CURRICULUM;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CURRICULUM;
  }
})();
