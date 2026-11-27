/**
 * data/ja/kanji.js
 * 103 chữ Kanji sơ cấp N5, PolyLingo tự soạn (âm đọc đối chiếu KANJIDIC2, CC BY-SA 4.0; mẹo nhớ tự viết).
 * Mỗi dòng: chữ | âm Hán Việt | âm On (katakana) | âm Kun (hiragana, dấu . tách phần okurigana) | nghĩa | số nét | mẹo nhớ
 * Bài học của mỗi chữ và từ ví dụ được tính tự động từ từ vựng (bài đầu tiên có từ chứa chữ đó).
 * JA_HANVIET_EXTRA: âm Hán Việt của các chữ khác xuất hiện trong từ vựng (để hiện Hán Việt cho mọi từ).
 */
if (typeof window === 'undefined') { global.window = global; }

window.JA_KANJI_RAW = `
一|NHẤT|イチ・イツ|ひと・ひと.つ|một|1|Một nét ngang duy nhất, như một que tính đặt nằm.
二|NHỊ|ニ|ふた・ふた.つ|hai|2|Hai que tính, que dưới dài hơn làm nền.
三|TAM|サン|み・みっ.つ|ba|3|Ba que tính xếp chồng, que giữa ngắn nhất.
四|TỨ|シ|よ・よん・よっ.つ|bốn|5|Cái khung có bốn góc, bên trong là hai chân bàn.
五|NGŨ|ゴ|いつ・いつ.つ|năm|4|Giống số 5 viết kiểu cổ: nét ngang, nét gập và chân đế.
六|LỤC|ロク|む・むっ.つ|sáu|4|Người đội nón lá, hai chân dang ra.
七|THẤT|シチ|なな・なな.つ|bảy|2|Như số 7 lộn ngược, có nét ngang cắt qua.
八|BÁT|ハチ|や・やっ.つ|tám|2|Hai nét tách ra như mái nhà chữ bát.
九|CỬU|キュウ・ク|ここの・ここの.つ|chín|2|Cánh tay vươn dài móc lại, gần đủ mười.
十|THẬP|ジュウ|とお|mười|2|Dấu cộng: đủ mười ngón tay đan chéo.
百|BÁCH|ヒャク||một trăm|6|Một (一) nét trên chữ trắng (白): một trăm tờ giấy trắng.
千|THIÊN|セン|ち|một nghìn|3|Chữ mười (十) có thêm nét phẩy trên đầu.
万|VẠN|マン・バン||mười nghìn|3|Nét ngang có chiếc móc treo vạn thứ.
円|VIÊN|エン|まる.い|tròn; đồng yên|4|Cái cửa sổ ngân hàng nơi đổi đồng yên.
日|NHẬT|ニチ・ジツ|ひ・か|mặt trời; ngày|4|Ô cửa vuông có mặt trời ở giữa.
月|NGUYỆT|ゲツ・ガツ|つき|mặt trăng; tháng|4|Vầng trăng khuyết có hai vệt mây ngang.
火|HỎA|カ|ひ|lửa|4|Ngọn lửa bốc lên với hai tia lửa hai bên.
水|THỦY|スイ|みず|nước|4|Dòng nước chảy giữa, bọt nước bắn hai bên.
木|MỘC|モク・ボク|き|cây|4|Thân cây thẳng, cành ngang, rễ tỏa xuống.
金|KIM|キン・コン|かね|vàng; tiền|8|Mái nhà che hai thỏi vàng chôn dưới đất (土).
土|THỔ|ド・ト|つち|đất|3|Mầm cây nhú lên khỏi mặt đất.
年|NIÊN|ネン|とし|năm|6|Người gánh lúa về sau một năm làm ruộng.
時|THỜI|ジ|とき|thời gian; giờ|10|Mặt trời (日) cạnh ngôi chùa (寺) đánh chuông báo giờ.
分|PHÂN|ブン・フン|わ.かる・わ.ける|phút; phân chia; hiểu|4|Con dao (刀) chia đôi một vật (八).
半|BÁN|ハン|なか.ば|một nửa|5|Nét dọc chia đôi vật thành hai nửa bằng nhau.
今|KIM|コン・キン|いま|bây giờ|4|Mái nhà che khoảnh khắc hiện tại.
午|NGỌ|ゴ||giữa trưa|4|Giống chữ ngưu thiếu sừng; giờ Ngọ là giữa trưa.
前|TIỀN|ゼン|まえ|trước|9|Con thuyền (月) và con dao (刂) đi phía trước.
後|HẬU|ゴ・コウ|うし.ろ・あと・のち|sau|9|Bước chân (彳) chậm chạp đi phía sau.
週|CHU|シュウ||tuần|11|Đi vòng quanh (辶) một chu kỳ bảy ngày.
毎|MỖI|マイ||mỗi|6|Người mẹ (母) đội nón, ngày nào cũng làm việc.
何|HÀ|カ|なに・なん|cái gì|7|Người (亻) đứng hỏi: "cái gì đây?" (可).
曜|DIỆU|ヨウ||ngày trong tuần|18|Mặt trời (日) và đôi cánh chim: các ngày trong tuần.
人|NHÂN|ジン・ニン|ひと|người|2|Hình người đang bước đi, hai chân dang ra.
男|NAM|ダン・ナン|おとこ|đàn ông|7|Người có sức (力) làm ruộng (田) là đàn ông.
女|NỮ|ジョ・ニョ|おんな|phụ nữ|3|Người phụ nữ ngồi khép chân duyên dáng.
子|TỬ|シ・ス|こ|con, trẻ em|3|Em bé quấn tã dang hai tay.
父|PHỤ|フ|ちち|bố|4|Hai tay cầm rìu: người bố lao động.
母|MẪU|ボ|はは|mẹ|5|Người mẹ với hai chấm là bầu sữa nuôi con.
友|HỮU|ユウ|とも|bạn|4|Hai bàn tay nắm lấy nhau là bạn bè.
先|TIÊN|セン|さき|trước, trước tiên|6|Người (儿) đi trước dẫn đường.
生|SINH|セイ・ショウ|い.きる・う.まれる・なま|sống; sinh ra|5|Mầm cây mọc lên từ đất.
学|HỌC|ガク|まな.ぶ|học|8|Đứa trẻ (子) dưới mái trường đang học.
校|HIỆU|コウ||trường học|10|Cây (木) trong sân trường nơi thầy trò giao lưu (交).
名|DANH|メイ・ミョウ|な|tên|6|Buổi tối (夕) không thấy mặt, phải gọi tên bằng miệng (口).
大|ĐẠI|ダイ・タイ|おお.きい|to, lớn|3|Người dang rộng hai tay khoe "to thế này".
小|TIỂU|ショウ|ちい.さい・こ|nhỏ|3|Nét dọc nhỏ với hai hạt cát hai bên.
高|CAO|コウ|たか.い|cao; đắt|10|Ngôi tháp nhiều tầng cao vút.
安|AN|アン|やす.い|rẻ; yên ổn|6|Người phụ nữ (女) trong nhà (宀) thì yên ổn.
新|TÂN|シン|あたら.しい|mới|13|Đứng (立) chặt cây (木) bằng rìu (斤) để làm đồ mới.
古|CỔ|コ|ふる.い|cũ|5|Câu chuyện truyền qua mười (十) miệng (口) đã thành cũ.
長|TRƯỜNG|チョウ|なが.い|dài; trưởng|8|Ông lão tóc dài bay trong gió.
多|ĐA|タ|おお.い|nhiều|6|Hai buổi tối (夕) chồng lên nhau: nhiều.
少|THIỂU|ショウ|すく.ない・すこ.し|ít|4|Chữ nhỏ (小) bị bớt đi một nét phẩy: còn ít.
白|BẠCH|ハク|しろ.い|trắng|5|Mặt trời (日) với tia sáng trắng trên đầu.
上|THƯỢNG|ジョウ|うえ・あ.がる|trên|3|Nét dọc chỉ lên phía trên mặt đất.
下|HẠ|カ・ゲ|した・さ.がる・くだ.さる|dưới|3|Nét dọc chỉ xuống dưới mặt đất.
中|TRUNG|チュウ|なか|giữa, trong|4|Mũi tên xuyên qua chính giữa tấm bia.
外|NGOẠI|ガイ・ゲ|そと・ほか|ngoài|5|Buổi tối (夕) bói quẻ (卜) ở bên ngoài.
右|HỮU|ウ・ユウ|みぎ|bên phải|5|Tay phải đưa cơm vào miệng (口).
左|TẢ|サ|ひだり|bên trái|5|Tay trái cầm thước thợ (工).
東|ĐÔNG|トウ|ひがし|phía đông|8|Mặt trời (日) mọc sau rặng cây (木) ở phía đông.
西|TÂY|セイ・サイ|にし|phía tây|6|Chim về tổ khi mặt trời lặn phía tây.
南|NAM|ナン|みなみ|phía nam|9|Căn nhà ấm áp quay mặt về hướng nam.
北|BẮC|ホク|きた|phía bắc|5|Hai người quay lưng vào nhau tránh gió bắc.
山|SƠN|サン|やま|núi|3|Ba đỉnh núi, đỉnh giữa cao nhất.
川|XUYÊN|セン|かわ|sông|3|Ba dòng nước chảy song song.
田|ĐIỀN|デン|た|ruộng|5|Thửa ruộng chia bốn ô vuông.
天|THIÊN|テン|あめ|trời|4|Trên đầu người lớn (大) là bầu trời (一).
気|KHÍ|キ・ケ||khí; tinh thần|6|Hơi nước bốc lên thành mây.
雨|VŨ|ウ|あめ|mưa|8|Giọt mưa rơi dưới bầu trời có mây che.
花|HOA|カ|はな|hoa|7|Cỏ (艹) biến hóa (化) thành bông hoa.
空|KHÔNG|クウ|そら・から|bầu trời; trống rỗng|8|Cái hang (穴) rỗng để nhìn lên bầu trời.
口|KHẨU|コウ・ク|くち|miệng|3|Cái miệng há hình vuông.
目|MỤC|モク|め|mắt|5|Con mắt dựng đứng có con ngươi ở giữa.
耳|NHĨ|ジ|みみ|tai|6|Vành tai với các nếp gấp.
手|THỦ|シュ|て|tay|4|Bàn tay xòe năm ngón.
足|TÚC|ソク|あし・た.りる|chân; đủ|7|Đầu gối (口) trên bàn chân bước đi.
見|KIẾN|ケン|み.る|nhìn, xem|7|Con mắt (目) đặt trên đôi chân: đi xem.
行|HÀNH|コウ・ギョウ|い.く・おこな.う|đi|6|Ngã tư đường để đi lại.
来|LAI|ライ|く.る|đến|7|Cây lúa (木) chín, mùa gặt đã đến.
出|XUẤT|シュツ|で.る・だ.す|ra|5|Hai ngọn núi nhô ra ngoài.
入|NHẬP|ニュウ|はい.る・い.れる|vào|2|Mũi tên chui vào trong.
休|HƯU|キュウ|やす.む|nghỉ ngơi|6|Người (亻) dựa vào cây (木) nghỉ ngơi.
食|THỰC|ショク|た.べる|ăn|9|Mái nhà che nồi cơm ngon: ăn.
飲|ẨM|イン|の.む|uống|12|Ăn (食) xong há miệng (欠) uống nước.
言|NGÔN|ゲン・ゴン|い.う|nói|7|Lời nói thoát ra từ miệng (口) thành nhiều dòng.
話|THOẠI|ワ|はな.す・はなし|nói chuyện|13|Lời nói (言) qua đầu lưỡi (舌) thành câu chuyện.
語|NGỮ|ゴ|かた.る|ngôn ngữ|14|Năm (五) cái miệng (口) cùng nói (言): ngôn ngữ.
読|ĐỘC|ドク|よ.む|đọc|14|Lời nói (言) được bán (売) trong sách để đọc.
書|THƯ|ショ|か.く|viết|10|Bàn tay cầm bút viết lên trang giấy (日).
聞|VĂN|ブン|き.く|nghe; hỏi|14|Ghé tai (耳) vào cánh cổng (門) để nghe.
買|MÃI|バイ|か.う|mua|12|Lưới (罒) và vỏ sò (貝) là tiền: mua.
立|LẬP|リツ|た.つ|đứng|5|Người đứng thẳng trên mặt đất.
本|BẢN|ホン|もと|sách; gốc|5|Cây (木) có vạch đánh dấu gốc rễ.
国|QUỐC|コク|くに|đất nước|8|Viên ngọc (玉) quý được bao bọc bởi biên giới (囗).
会|HỘI|カイ|あ.う|gặp; hội|6|Mọi người tụ dưới một mái nhà để gặp nhau.
社|XÃ|シャ|やしろ|công ty; đền|7|Bàn thờ (ネ) trên đất (土): đền làng, nơi tụ họp.
電|ĐIỆN|デン||điện|13|Mưa (雨) kèm tia sét lóe sáng là điện.
車|XA|シャ|くるま|xe|7|Chiếc xe nhìn từ trên xuống có bánh và trục.
駅|DỊCH|エキ||nhà ga|14|Ngựa (馬) dừng nghỉ ở trạm: nhà ga.
道|ĐẠO|ドウ|みち|con đường|12|Cái đầu (首) đi trên đường (辶).
店|ĐIẾM|テン|みせ|cửa hàng|8|Mái hiên (广) nơi xem bói (占) bán hàng.
`;

window.JA_HANVIET_EXTRA = {
  '私': 'TƯ', '島': 'ĐẢO', '医': 'Y', '者': 'GIẢ', '員': 'VIÊN', '辞': 'TỪ', '雑': 'TẠP', '誌': 'CHÍ', '鉛': 'DUYÊN',
  '筆': 'BÚT', '傘': 'TẢN', '計': 'KẾ', '鍵': 'KIỆN', '机': 'KỶ', '椅': 'Ỷ', '携': 'HUỀ', '帯': 'ĐỚI', '番': 'PHIÊN', '号': 'HIỆU',
  '教': 'GIÁO', '室': 'THẤT', '堂': 'ĐƯỜNG', '受': 'THỤ', '付': 'PHÓ', '家': 'GIA', '部': 'BỘ', '屋': 'ỐC', '階': 'GIAI',
  '朝': 'TRIÊU', '昼': 'TRÚ', '夜': 'DẠ', '明': 'MINH', '昨': 'TẠC', '起': 'KHỞI', '寝': 'TẨM', '働': 'ĐỘNG', '銀': 'NGÂN',
  '勉': 'MIỄN', '強': 'CƯỜNG', '終': 'CHUNG', '始': 'THỦY', '授': 'THỤ', '業': 'NGHIỆP', '帰': 'QUY', '地': 'ĐỊA', '鉄': 'THIẾT',
  '自': 'TỰ', '転': 'CHUYỂN', '飛': 'PHI', '機': 'CƠ', '歩': 'BỘ', '族': 'TỘC', '去': 'KHỨ', '誕': 'ĐẢN', '京': 'KINH',
  '阪': 'PHẢN', '撮': 'TOÁT', '写': 'TẢ', '真': 'CHÂN', '飯': 'PHẠN', '卵': 'NOÃN', '肉': 'NHỤC', '魚': 'NGƯ', '野': 'DÃ',
  '菜': 'THÁI', '果': 'QUẢ', '物': 'VẬT', '茶': 'TRÀ', '牛': 'NGƯU', '乳': 'NHŨ', '映': 'ÁNH', '画': 'HỌA', '音': 'ÂM',
  '楽': 'LẠC', '紙': 'CHỈ', '宿': 'TÚC', '題': 'ĐỀ', '緒': 'TỰ', '洗': 'TẨY', '箸': 'TRỨ', '切': 'THIẾT', '送': 'TỐNG',
  '貸': 'THẢI', '借': 'TÁ', '習': 'TẬP', '悪': 'ÁC', '暑': 'THỬ', '寒': 'HÀN', '難': 'NAN', '面': 'DIỆN', '忙': 'MANG',
  '赤': 'XÍCH', '静': 'TĨNH', '有': 'HỮU', '富': 'PHÚ', '士': 'SĨ', '親': 'THÂN', '元': 'NGUYÊN', '暇': 'HẠ', '便': 'TIỆN',
  '利': 'LỢI', '町': 'ĐINH', '分': 'PHÂN', '好': 'HẢO', '嫌': 'HIỀM', '手': 'THỦ', '料': 'LIỆU', '理': 'LÝ', '旅': 'LỮ',
  '歌': 'CA', '絵': 'HỘI', '英': 'ANH', '漢': 'HÁN', '字': 'TỰ', '間': 'GIAN', '約': 'ƯỚC', '束': 'THÚC', '供': 'CUNG',
  '全': 'TOÀN', '然': 'NHIÊN', '犬': 'KHUYỂN', '猫': 'MIÊU', '庭': 'ĐÌNH', '箱': 'TƯƠNG', '財': 'TÀI', '布': 'BỐ', '冷': 'LÃNH',
  '蔵': 'TÀNG', '庫': 'KHỐ', '窓': 'SONG', '公': 'CÔNG', '園': 'VIÊN', '散': 'TÁN', '曲': 'KHÚC', '隣': 'LÂN', '近': 'CẬN',
  '郵': 'BƯU', '局': 'CỤC', '枚': 'MAI', '台': 'ĐÀI', '回': 'HỒI', '泳': 'VỊNH', '両': 'LƯỠNG', '兄': 'HUYNH', '弟': 'ĐỆ',
  '姉': 'TỶ', '妹': 'MUỘI', '住': 'TRÚ', '留': 'LƯU', '雪': 'TUYẾT', '青': 'THANH', '春': 'XUÂN', '夏': 'HẠ', '秋': 'THU',
  '冬': 'ĐÔNG', '季': 'QUÝ', '節': 'TIẾT', '海': 'HẢI', '番': 'PHIÊN', '背': 'BỐI', '幹': 'CÁN', '線': 'TUYẾN', '速': 'TỐC',
  '暖': 'NOÃN', '涼': 'LƯƠNG', '甘': 'CAM', '重': 'TRỌNG', '軽': 'KHINH', '遠': 'VIỄN', '簡': 'GIẢN', '単': 'ĐƠN', '題': 'ĐỀ',
  '欲': 'DỤC', '遊': 'DU', '疲': 'BÌ', '事': 'SỰ', '末': 'MẠT', '広': 'QUẢNG', '狭': 'HIỆP', '変': 'BIẾN', '美': 'MỸ',
  '術': 'THUẬT', '館': 'QUÁN', '消': 'TIÊU', '開': 'KHAI', '閉': 'BẾ', '急': 'CẤP', '待': 'ĐÃI', '持': 'TRÌ', '伝': 'TRUYỀN',
  '呼': 'HÔ', '使': 'SỬ', '乗': 'THỪA', '降': 'GIÁNG', '荷': 'HÀ', '所': 'SỞ', '図': 'ĐỒ', '座': 'TỌA', '作': 'TÁC',
  '売': 'MẠI', '知': 'TRI', '結': 'KẾT', '婚': 'HÔN', '仕': 'SĨ', '長': 'TRƯỜNG', '警': 'CẢNH', '官': 'QUAN', '病': 'BỆNH',
  '院': 'VIỆN', '経': 'KINH', '済': 'TẾ', '服': 'PHỤC', '眼': 'NHÃN', '鏡': 'KÍNH', '着': 'TRƯỚC', '靴': 'NGOA', '帽': 'MẠO',
  '独': 'ĐỘC', '身': 'THÂN', '吸': 'HẤP', '置': 'TRÍ', '止': 'CHỈ', '博': 'BÁC', '段': 'ĐOẠN', '丈': 'TRƯỢNG', '夫': 'PHU',
  '危': 'NGUY', '池': 'TRÌ', '路': 'LỘ', '渡': 'ĐỘ', '浴': 'DỤC', '磨': 'MA', '押': 'ÁP', '引': 'DẪN', '体': 'THỂ',
  '頭': 'ĐẦU', '顔': 'NHAN', '歯': 'XỈ', '短': 'ĐOẢN', '暗': 'ÁM', '若': 'NHƯỢC', '痛': 'THỐNG', '覚': 'GIÁC', '忘': 'VONG',
  '払': 'PHẤT', '返': 'PHẢN', '心': 'TÂM', '配': 'PHỐI', '薬': 'DƯỢC', '熱': 'NHIỆT', '風': 'PHONG', '邪': 'TÀ', '切': 'THIẾT',
  '健': 'KIỆN', '康': 'KHANG', '問': 'VẤN', '答': 'ĐÁP', '呂': 'LỮ', '無': 'VÔ', '晩': 'VÃN', '早': 'TẢO', '議': 'NGHỊ',
  '残': 'TÀN', '張': 'TRƯƠNG', '符': 'PHÙ', '予': 'DỰ', '試': 'THÍ', '験': 'NGHIỆM', '練': 'LUYỆN', '掃': 'TẢO', '除': 'TRỪ',
  '濯': 'TRẠC', '脱': 'THOÁT', '要': 'YẾU', '合': 'HỢP', '遅': 'TRÌ', '運': 'VẬN', '弾': 'ĐÀN', '方': 'PHƯƠNG', '趣': 'THÚ',
  '味': 'VỊ', '現': 'HIỆN', '平': 'BÌNH', '仮': 'GIẢ', '片': 'PHIẾN', '文': 'VĂN', '葉': 'DIỆP', '意': 'Ý', '動': 'ĐỘNG',
  '鳥': 'ĐIỂU', '馬': 'MÃ', '集': 'TẬP', '走': 'TẨU', '登': 'ĐĂNG', '釣': 'ĐIẾU', '度': 'ĐỘ', '寺': 'TỰ', '神': 'THẦN',
  '験': 'NGHIỆM', '初': 'SƠ', '都': 'ĐÔ', '温': 'ÔN', '泉': 'TUYỀN', '洗': 'TẨY', '踊': 'DŨNG', '憩': 'KHẾ', '夕': 'TỊCH',
  '天': 'THIÊN', '将': 'TƯƠNG', '人': 'NHÂN', '手': 'THỦ', '色': 'SẮC', '黒': 'HẮC', '黄': 'HOÀNG', '声': 'THANH',
  '彼': 'BỈ', '僕': 'BỘC', '君': 'QUÂN', '思': 'TƯ', '考': 'KHẢO', '見': 'KIẾN', '報': 'BÁO', '当': 'ĐƯƠNG', '質': 'CHẤT',
  '説': 'THUYẾT', '政': 'CHÍNH', '治': 'TRỊ', '首': 'THỦ', '相': 'TƯỚNG', '価': 'GIÁ', '同': 'ĐỒNG', '赤': 'XÍCH', '髪': 'PHÁT',
  '弁': 'BIỆN', '用': 'DỤNG', '信': 'TÍN', '角': 'GIÁC', '橋': 'KIỀU', '駐': 'TRÚ', '場': 'TRƯỜNG', '着': 'TRƯỚC', '寂': 'TỊCH',
  '舎': 'XÁ', '連': 'LIÊN', '案': 'ÁN', '内': 'NỘI', '直': 'TRỰC', '紹': 'THIỆU', '介': 'GIỚI', '祖': 'TỔ', '礼': 'LỄ',
  '達': 'ĐẠT', '冊': 'SÁCH', '匹': 'THẤT', '歳': 'TUẾ', '個': 'CÁ', '紅': 'HỒNG', '低': 'ĐÊ', '優': 'ƯU', '雲': 'VÂN',
  '晴': 'TÌNH', '曇': 'ĐÀM', '師': 'SƯ', '韓': 'HÀN', '勝': 'THẮNG', '負': 'PHỤ', '格': 'CÁCH', '物': 'VẬT', '酒': 'TỬU', '茶': 'TRÀ', '回': 'HỒI', '生': 'SINH', '田': 'ĐIỀN', '方': 'PHƯƠNG'
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JA_KANJI_RAW: window.JA_KANJI_RAW, JA_HANVIET_EXTRA: window.JA_HANVIET_EXTRA };
}
