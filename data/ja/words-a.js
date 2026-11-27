/**
 * data/ja/words-a.js
 * Từ vựng sơ cấp JLPT N5 (phần A: bài 7–20), PolyLingo tự soạn.
 * Mỗi dòng: chữ (Kanji, để trống nếu chỉ viết kana) | cách đọc kana | nghĩa | từ loại | câu ví dụ | nghĩa câu
 * Từ loại: n danh từ, pron đại từ, q từ để hỏi, num số, ctr lượng từ, v1 động từ nhóm I, v2 nhóm II, v3 nhóm III,
 *          ai tính từ đuôi い, an tính từ đuôi な, adv phó từ, exp câu/cụm cố định, conj liên từ.
 * Động từ ghi ở thể từ điển; thể ます/て/ない/た do data/ja/ja-core.js tự chia.
 * "#L7 ..." mở đầu nhóm từ của bài 7. Romaji và âm Hán Việt được tính tự động.
 */
if (typeof window === 'undefined') { global.window = global; }

window.JA_WORDS_RAW = (window.JA_WORDS_RAW || []).concat([`
#L7 Chào hỏi và giới thiệu
私|わたし|tôi|pron|私はナムです。|Tôi là Nam.
|あなた|bạn, anh, chị (ngôi thứ hai)|pron|あなたは学生ですか。|Bạn là sinh viên à?
人|ひと|người|n|あの人は先生です。|Người kia là giáo viên.
日本|にほん|Nhật Bản|n|日本は島の国です。|Nhật Bản là đảo quốc.
日本人|にほんじん|người Nhật|n|田中さんは日本人です。|Anh Tanaka là người Nhật.
|ベトナム|Việt Nam|n|ベトナムから来ました。|Tôi đến từ Việt Nam.
|ベトナムじん|người Việt Nam|n|私はベトナムじんです。|Tôi là người Việt Nam.
名前|なまえ|tên|n|お名前は何ですか。|Tên bạn là gì?
先生|せんせい|thầy giáo, cô giáo|n|山田先生はやさしいです。|Thầy Yamada hiền.
学生|がくせい|học sinh, sinh viên|n|私は学生です。|Tôi là sinh viên.
会社員|かいしゃいん|nhân viên công ty|n|兄は会社員です。|Anh trai tôi là nhân viên công ty.
医者|いしゃ|bác sĩ|n|母は医者です。|Mẹ tôi là bác sĩ.
国|くに|đất nước|n|お国はどちらですか。|Bạn đến từ nước nào?
|はい|vâng, dạ|exp|はい、そうです。|Vâng, đúng vậy.
|いいえ|không|exp|いいえ、学生ではありません。|Không, tôi không phải sinh viên.
|おはようございます|chào buổi sáng|exp||
|こんにちは|xin chào (ban ngày)|exp||
|こんばんは|chào buổi tối|exp||
|さようなら|tạm biệt|exp||
|ありがとうございます|cảm ơn|exp||
|すみません|xin lỗi, làm phiền|exp|すみません、駅はどこですか。|Xin lỗi, ga ở đâu ạ?
|はじめまして|rất vui được gặp (lần đầu)|exp|はじめまして、リンです。|Rất vui được gặp, tôi là Linh.
|どうぞよろしく|rất mong được giúp đỡ|exp||
|おやすみなさい|chúc ngủ ngon|exp||
|そうです|đúng vậy|exp|はい、そうです。|Vâng, đúng thế.
#L8 Đồ vật quanh ta
|これ|cái này|pron|これは本です。|Đây là quyển sách.
|それ|cái đó|pron|それは何ですか。|Đó là cái gì?
|あれ|cái kia|pron|あれは私の車です。|Kia là xe của tôi.
|この|… này|pron|このかばんは私のです。|Cái cặp này là của tôi.
|その|… đó|pron|その傘はだれのですか。|Cái ô đó của ai?
|あの|… kia|pron|あの人はだれですか。|Người kia là ai?
何|なに|cái gì|q|これは何ですか。|Cái này là gì?
本|ほん|sách|n|これは日本語の本です。|Đây là sách tiếng Nhật.
辞書|じしょ|từ điển|n|辞書を使います。|Tôi dùng từ điển.
新聞|しんぶん|báo|n|父は毎朝新聞を読みます。|Bố đọc báo mỗi sáng.
雑誌|ざっし|tạp chí|n|それは車の雑誌です。|Đó là tạp chí xe hơi.
|ノート|vở|n|ノートに書きます。|Tôi viết vào vở.
|ペン|bút|n|このペンはいくらですか。|Cái bút này bao nhiêu tiền?
鉛筆|えんぴつ|bút chì|n|鉛筆を貸してください。|Cho tôi mượn bút chì.
|かばん|cặp, túi xách|n|新しいかばんです。|Đây là cặp mới.
傘|かさ|cái ô|n|傘を持っていますか。|Bạn có mang ô không?
時計|とけい|đồng hồ|n|この時計は日本のです。|Đồng hồ này là của Nhật.
鍵|かぎ|chìa khóa|n|これは部屋の鍵です。|Đây là chìa khóa phòng.
机|つくえ|bàn học|n|机の上に本があります。|Trên bàn có sách.
椅子|いす|ghế|n|椅子に座ってください。|Mời ngồi xuống ghế.
車|くるま|ô tô|n|あれは私の車です。|Kia là ô tô của tôi.
|テレビ|ti vi|n|テレビを見ます。|Tôi xem ti vi.
|カメラ|máy ảnh|n|このカメラは高いです。|Máy ảnh này đắt.
|パソコン|máy tính cá nhân|n|パソコンで仕事をします。|Tôi làm việc bằng máy tính.
携帯電話|けいたいでんわ|điện thoại di động|n|携帯電話の番号は何番ですか。|Số điện thoại di động là bao nhiêu?
|だれ|ai|q|あの人はだれですか。|Người kia là ai?
#L9 Nơi chốn, số đếm và giá tiền
|ここ|chỗ này, ở đây|pron|ここは教室です。|Đây là lớp học.
|そこ|chỗ đó|pron|トイレはそこです。|Nhà vệ sinh ở chỗ đó.
|あそこ|chỗ kia|pron|駅はあそこです。|Ga ở đằng kia.
|どこ|ở đâu|q|トイレはどこですか。|Nhà vệ sinh ở đâu?
|こちら|phía này (lịch sự)|pron|受付はこちらです。|Quầy lễ tân ở phía này.
教室|きょうしつ|lớp học|n|教室は三階です。|Lớp học ở tầng ba.
食堂|しょくどう|nhà ăn|n|食堂で昼ご飯を食べます。|Tôi ăn trưa ở nhà ăn.
受付|うけつけ|quầy lễ tân|n||
|トイレ|nhà vệ sinh|n|すみません、トイレはどこですか。|Xin lỗi, nhà vệ sinh ở đâu?
会社|かいしゃ|công ty|n|会社は東京にあります。|Công ty ở Tokyo.
家|いえ|nhà|n|私の家は駅の近くです。|Nhà tôi gần ga.
部屋|へや|căn phòng|n|部屋はきれいです。|Căn phòng sạch đẹp.
店|みせ|cửa hàng|n|あの店は安いです。|Cửa hàng kia rẻ.
|デパート|cửa hàng bách hóa|n||
|いくら|bao nhiêu tiền|q|これはいくらですか。|Cái này bao nhiêu tiền?
円|えん|yên (tiền Nhật)|ctr|このパンは百円です。|Bánh mì này 100 yên.
一|いち|một|num||
二|に|hai|num||
三|さん|ba|num||
四|よん|bốn|num||
五|ご|năm|num||
百|ひゃく|một trăm|num|りんごは百円です。|Táo giá 100 yên.
階|かい|tầng|ctr|トイレは二階です。|Nhà vệ sinh ở tầng hai.
#L10 Thời gian và sinh hoạt
今|いま|bây giờ|n|今、何時ですか。|Bây giờ là mấy giờ?
時|じ|giờ|ctr|今、七時です。|Bây giờ là 7 giờ.
分|ふん|phút|ctr|十分休みます。|Nghỉ 10 phút.
半|はん|rưỡi|n|九時半に寝ます。|Tôi ngủ lúc 9 giờ rưỡi.
六|ろく|sáu|num||
七|なな|bảy|num||
八|はち|tám|num||
九|きゅう|chín|num||
十|じゅう|mười|num||
午前|ごぜん|buổi sáng (AM)|n|午前九時に始まります。|Bắt đầu lúc 9 giờ sáng.
午後|ごご|buổi chiều (PM)|n|午後は暇です。|Buổi chiều tôi rảnh.
朝|あさ|buổi sáng|n|朝、コーヒーを飲みます。|Buổi sáng tôi uống cà phê.
昼|ひる|buổi trưa|n||
夜|よる|buổi tối, đêm|n|夜、勉強します。|Buổi tối tôi học bài.
毎日|まいにち|mỗi ngày|n|毎日日本語を勉強します。|Ngày nào tôi cũng học tiếng Nhật.
今日|きょう|hôm nay|n|今日は暑いです。|Hôm nay nóng.
明日|あした|ngày mai|n|明日は休みです。|Ngày mai được nghỉ.
昨日|きのう|hôm qua|n|昨日、映画を見ました。|Hôm qua tôi đã xem phim.
起きる|おきる|thức dậy|v2|毎朝六時に起きます。|Sáng nào tôi cũng dậy lúc 6 giờ.
寝る|ねる|ngủ|v2|十一時に寝ます。|Tôi ngủ lúc 11 giờ.
働く|はたらく|làm việc|v1|父は銀行で働きます。|Bố làm việc ở ngân hàng.
休む|やすむ|nghỉ ngơi|v1|日曜日は休みます。|Chủ nhật tôi nghỉ.
勉強する|べんきょうする|học tập|v3|図書館で勉強します。|Tôi học ở thư viện.
終わる|おわる|kết thúc|v1|仕事は五時に終わります。|Công việc kết thúc lúc 5 giờ.
始まる|はじまる|bắt đầu|v1|授業は九時に始まります。|Giờ học bắt đầu lúc 9 giờ.
月曜日|げつようび|thứ Hai|n|月曜日から働きます。|Làm việc từ thứ Hai.
日曜日|にちようび|Chủ nhật|n|日曜日は休みです。|Chủ nhật được nghỉ.
火曜日|かようび|thứ Ba|n||
水曜日|すいようび|thứ Tư|n|水曜日にテストがあります。|Thứ Tư có bài kiểm tra.
木曜日|もくようび|thứ Năm|n||
金曜日|きんようび|thứ Sáu|n|金曜日の夜は暇です。|Tối thứ Sáu tôi rảnh.
土曜日|どようび|thứ Bảy|n|土曜日に友達と会います。|Thứ Bảy tôi gặp bạn.
何時|なんじ|mấy giờ|q|今、何時ですか。|Bây giờ là mấy giờ?
#L11 Đi lại và phương tiện
行く|いく|đi|v1|明日、東京へ行きます。|Ngày mai tôi đi Tokyo.
来る|くる|đến|v3|友達が家へ来ます。|Bạn sẽ đến nhà tôi.
帰る|かえる|về|v1|七時に家へ帰ります。|7 giờ tôi về nhà.
学校|がっこう|trường học|n|学校へ行きます。|Tôi đi đến trường.
駅|えき|nhà ga|n|駅まで歩きます。|Tôi đi bộ đến ga.
電車|でんしゃ|tàu điện|n|電車で会社へ行きます。|Tôi đi làm bằng tàu điện.
地下鉄|ちかてつ|tàu điện ngầm|n||
|バス|xe buýt|n|バスで学校へ来ます。|Tôi đến trường bằng xe buýt.
|タクシー|taxi|n||
自転車|じてんしゃ|xe đạp|n|自転車で行きます。|Tôi đi bằng xe đạp.
飛行機|ひこうき|máy bay|n|飛行機で日本へ行きます。|Tôi đi Nhật bằng máy bay.
歩く|あるく|đi bộ|v1|駅まで歩きます。|Tôi đi bộ ra ga.
友達|ともだち|bạn bè|n|友達と映画を見ます。|Tôi xem phim với bạn.
家族|かぞく|gia đình|n|家族と旅行します。|Tôi đi du lịch với gia đình.
一人で|ひとりで|một mình|adv|一人で行きます。|Tôi đi một mình.
先週|せんしゅう|tuần trước|n||
今週|こんしゅう|tuần này|n||
来週|らいしゅう|tuần sau|n|来週、大阪へ行きます。|Tuần sau tôi đi Osaka.
去年|きょねん|năm ngoái|n|去年、日本へ来ました。|Năm ngoái tôi đã đến Nhật.
今年|ことし|năm nay|n||
来年|らいねん|năm sau|n||
誕生日|たんじょうび|sinh nhật|n|誕生日はいつですか。|Sinh nhật bạn khi nào?
|いつ|khi nào|q|いつ日本へ来ましたか。|Bạn đến Nhật khi nào?
何月|なんがつ|tháng mấy|q||
何日|なんにち|ngày mấy|q|今日は何日ですか。|Hôm nay là ngày mấy?
道|みち|con đường|n|この道をまっすぐ行きます。|Đi thẳng con đường này.
#L12 Ăn uống và hằng ngày
食べる|たべる|ăn|v2|朝ご飯を食べます。|Tôi ăn sáng.
飲む|のむ|uống|v1|お茶を飲みます。|Tôi uống trà.
見る|みる|xem, nhìn|v2|テレビを見ます。|Tôi xem ti vi.
聞く|きく|nghe; hỏi|v1|音楽を聞きます。|Tôi nghe nhạc.
読む|よむ|đọc|v1|本を読みます。|Tôi đọc sách.
書く|かく|viết|v1|手紙を書きます。|Tôi viết thư.
買う|かう|mua|v1|パンを買います。|Tôi mua bánh mì.
撮る|とる|chụp (ảnh)|v1|写真を撮ります。|Tôi chụp ảnh.
会う|あう|gặp|v1|駅で友達に会います。|Tôi gặp bạn ở ga.
|する|làm|v3|宿題をします。|Tôi làm bài tập.
ご飯|ごはん|cơm, bữa ăn|n|ご飯を食べましたか。|Bạn ăn cơm chưa?
朝ご飯|あさごはん|bữa sáng|n||
|パン|bánh mì|n||
卵|たまご|trứng|n||
肉|にく|thịt|n|肉はあまり食べません。|Tôi không ăn thịt mấy.
魚|さかな|cá|n|魚が好きです。|Tôi thích cá.
野菜|やさい|rau|n|野菜を食べてください。|Hãy ăn rau đi.
果物|くだもの|hoa quả|n||
水|みず|nước|n|水をください。|Cho tôi nước.
お茶|おちゃ|trà|n|お茶をどうぞ。|Mời bạn dùng trà.
牛乳|ぎゅうにゅう|sữa bò|n||
|コーヒー|cà phê|n|コーヒーを飲みませんか。|Bạn uống cà phê không?
お酒|おさけ|rượu|n||
|ビール|bia|n|ビールを一本ください。|Cho tôi một chai bia.
|ジュース|nước ép|n||
紅茶|こうちゃ|trà đen|n||
映画|えいが|phim|n|映画を見ます。|Tôi xem phim.
音楽|おんがく|âm nhạc|n||
写真|しゃしん|ảnh|n||
手紙|てがみ|thư|n||
宿題|しゅくだい|bài tập về nhà|n||
一緒に|いっしょに|cùng nhau|adv|一緒に食べませんか。|Cùng ăn nhé?
|いつも|luôn luôn|adv|いつも七時に起きます。|Tôi luôn dậy lúc 7 giờ.
時々|ときどき|thỉnh thoảng|adv|時々映画を見ます。|Thỉnh thoảng tôi xem phim.
#L13 Công cụ và trao nhận
手|て|tay|n|手を洗います。|Tôi rửa tay.
箸|はし|đũa|n|箸でご飯を食べます。|Tôi ăn cơm bằng đũa.
|スプーン|cái thìa|n||
|はさみ|cái kéo|n|はさみで紙を切ります。|Tôi cắt giấy bằng kéo.
紙|かみ|giấy|n||
切る|きる|cắt|v1|はさみで切ります。|Cắt bằng kéo.
送る|おくる|gửi|v1|母に手紙を送ります。|Tôi gửi thư cho mẹ.
|あげる|cho, tặng|v2|友達に花をあげます。|Tôi tặng hoa cho bạn.
|もらう|nhận|v1|父に時計をもらいました。|Tôi nhận đồng hồ từ bố.
貸す|かす|cho mượn|v1|ペンを貸してください。|Cho tôi mượn bút.
借りる|かりる|mượn|v2|図書館で本を借ります。|Tôi mượn sách ở thư viện.
教える|おしえる|dạy; chỉ cho|v2|日本語を教えます。|Tôi dạy tiếng Nhật.
習う|ならう|học (từ ai đó)|v1|先生にピアノを習います。|Tôi học đàn piano với thầy.
電話|でんわ|điện thoại|n|母に電話をかけます。|Tôi gọi điện cho mẹ.
花|はな|hoa|n|花をもらいました。|Tôi được tặng hoa.
|プレゼント|quà tặng|n|誕生日のプレゼントです。|Quà sinh nhật đây.
お金|おかね|tiền|n|お金がありません。|Tôi không có tiền.
父|ちち|bố (của mình)|n|父は会社員です。|Bố tôi là nhân viên công ty.
母|はは|mẹ (của mình)|n|母に電話します。|Tôi gọi cho mẹ.
千|せん|một nghìn|num|千円です。|1000 yên.
万|まん|mười nghìn|num|一万円です。|10.000 yên.
|もう|đã, rồi|adv|もう昼ご飯を食べました。|Tôi đã ăn trưa rồi.
|まだ|vẫn chưa|adv|まだです。|Vẫn chưa.
#L14 Tính từ miêu tả
大きい|おおきい|to, lớn|ai|大きい家です。|Ngôi nhà to.
小さい|ちいさい|nhỏ|ai|小さい犬がいます。|Có con chó nhỏ.
新しい|あたらしい|mới|ai|新しい車を買いました。|Tôi đã mua xe mới.
古い|ふるい|cũ|ai|このパソコンは古いです。|Máy tính này cũ.
|いい|tốt|ai|いい天気ですね。|Trời đẹp nhỉ.
悪い|わるい|xấu, tồi|ai||
暑い|あつい|nóng (thời tiết)|ai|ハノイの夏は暑いです。|Mùa hè Hà Nội nóng.
寒い|さむい|lạnh (thời tiết)|ai|冬は寒いです。|Mùa đông lạnh.
高い|たかい|cao; đắt|ai|この時計は高いです。|Đồng hồ này đắt.
安い|やすい|rẻ|ai|あの店は安いです。|Cửa hàng kia rẻ.
難しい|むずかしい|khó|ai|漢字は難しいです。|Chữ Hán khó.
面白い|おもしろい|thú vị|ai|この本は面白いです。|Quyển sách này thú vị.
|おいしい|ngon|ai|このラーメンはおいしいです。|Mì ramen này ngon.
忙しい|いそがしい|bận rộn|ai|今週は忙しいです。|Tuần này tôi bận.
楽しい|たのしい|vui|ai|旅行は楽しかったです。|Chuyến du lịch đã rất vui.
白い|しろい|trắng|ai|白い花です。|Bông hoa trắng.
赤い|あかい|đỏ|ai|赤いかばんを買いました。|Tôi mua cặp màu đỏ.
低い|ひくい|thấp|ai||
|つまらない|chán, nhạt nhẽo|ai|この映画はつまらないです。|Bộ phim này chán.
優しい|やさしい|hiền, dịu dàng|ai|先生は優しいです。|Thầy giáo hiền.
|きれい|đẹp; sạch|an|この部屋はきれいです。|Căn phòng này sạch đẹp.
静か|しずか|yên tĩnh|an|図書館は静かです。|Thư viện yên tĩnh.
有名|ゆうめい|nổi tiếng|an|富士山は有名です。|Núi Phú Sĩ nổi tiếng.
親切|しんせつ|tốt bụng|an|山田さんは親切です。|Chị Yamada tốt bụng.
元気|げんき|khỏe mạnh|an|お元気ですか。|Bạn có khỏe không?
暇|ひま|rảnh rỗi|an|明日は暇です。|Ngày mai tôi rảnh.
便利|べんり|tiện lợi|an|電車は便利です。|Tàu điện tiện lợi.
山|やま|núi|n|山は高いです。|Núi cao.
町|まち|thị trấn, phố|n|静かな町です。|Thị trấn yên tĩnh.
|とても|rất|adv|とてもおいしいです。|Rất ngon.
|あまり|không… lắm (đi với phủ định)|adv|あまり高くないです。|Không đắt lắm.
#L15 Sở thích và lý do
分かる|わかる|hiểu|v1|日本語が少し分かります。|Tôi hiểu một chút tiếng Nhật.
|ある|có (đồ vật)|v1|時間がありますか。|Bạn có thời gian không?
好き|すき|thích|an|音楽が好きです。|Tôi thích âm nhạc.
嫌い|きらい|ghét|an|肉が嫌いです。|Tôi ghét thịt.
上手|じょうず|giỏi|an|リンさんは料理が上手です。|Linh nấu ăn giỏi.
下手|へた|kém|an|私は歌が下手です。|Tôi hát dở.
料理|りょうり|món ăn; nấu ăn|n|日本料理が好きです。|Tôi thích món Nhật.
|スポーツ|thể thao|n||
|サッカー|bóng đá|n|サッカーをします。|Tôi chơi bóng đá.
旅行|りょこう|du lịch|n|旅行が好きです。|Tôi thích du lịch.
歌|うた|bài hát|n||
絵|え|tranh|n|絵が上手ですね。|Bạn vẽ giỏi nhỉ.
日本語|にほんご|tiếng Nhật|n|日本語を勉強しています。|Tôi đang học tiếng Nhật.
英語|えいご|tiếng Anh|n||
漢字|かんじ|chữ Hán|n|漢字が少し分かります。|Tôi hiểu chút chữ Hán.
字|じ|chữ|n|きれいな字ですね。|Chữ đẹp nhỉ.
時間|じかん|thời gian|n|時間がありません。|Tôi không có thời gian.
約束|やくそく|lời hẹn|n|友達と約束があります。|Tôi có hẹn với bạn.
子供|こども|trẻ con|n|子供が二人います。|Tôi có hai con.
|よく|thường; rõ|adv|よく分かります。|Tôi hiểu rõ.
少し|すこし|một chút|adv|少し分かります。|Tôi hiểu một chút.
全然|ぜんぜん|hoàn toàn không|adv|全然分かりません。|Tôi hoàn toàn không hiểu.
|たくさん|nhiều|adv|たくさん食べました。|Tôi đã ăn nhiều.
|どうして|tại sao|q|どうして来ませんでしたか。|Tại sao bạn không đến?
|から|vì (chỉ lý do)|conj|暑いですから、窓を開けます。|Vì nóng nên tôi mở cửa sổ.
#L16 Có ở đâu và vị trí
|いる|có, ở (người, động vật)|v2|公園に子供がいます。|Có trẻ con ở công viên.
男|おとこ|nam giới|n||
女|おんな|nữ giới|n||
男の人|おとこのひと|người đàn ông|n|あそこに男の人がいます。|Ở đằng kia có người đàn ông.
女の人|おんなのひと|người phụ nữ|n||
犬|いぬ|con chó|n|庭に犬がいます。|Trong vườn có con chó.
猫|ねこ|con mèo|n|椅子の下に猫がいます。|Dưới ghế có con mèo.
木|き|cây|n|木の下にベンチがあります。|Dưới cây có ghế băng.
箱|はこ|cái hộp|n|箱の中に何がありますか。|Trong hộp có gì?
冷蔵庫|れいぞうこ|tủ lạnh|n||
窓|まど|cửa sổ|n||
公園|こうえん|công viên|n|公園で散歩します。|Tôi đi dạo ở công viên.
銀行|ぎんこう|ngân hàng|n|銀行は駅の前にあります。|Ngân hàng ở trước ga.
上|うえ|trên|n|机の上に本があります。|Trên bàn có sách.
下|した|dưới|n||
前|まえ|trước|n|駅の前で会いましょう。|Gặp nhau trước ga nhé.
後ろ|うしろ|sau, phía sau|n||
右|みぎ|bên phải|n|右に曲がってください。|Hãy rẽ phải.
左|ひだり|bên trái|n||
中|なか|trong|n|かばんの中に財布があります。|Trong cặp có ví.
外|そと|ngoài|n|外は寒いです。|Bên ngoài lạnh.
隣|となり|bên cạnh|n|銀行の隣に郵便局があります。|Cạnh ngân hàng có bưu điện.
近く|ちかく|gần, chỗ gần|n|家の近くにコンビニがあります。|Gần nhà có cửa hàng tiện lợi.
間|あいだ|giữa|n||
郵便局|ゆうびんきょく|bưu điện|n||
本屋|ほんや|hiệu sách|n|本屋は銀行の隣です。|Hiệu sách ở cạnh ngân hàng.
#L17 Số lượng và gia đình
|ひとつ|một cái|num|りんごをひとつください。|Cho tôi một quả táo.
|ふたつ|hai cái|num||
|みっつ|ba cái|num||
|よっつ|bốn cái|num||
|いつつ|năm cái|num||
|むっつ|sáu cái|num||
|ななつ|bảy cái|num||
|やっつ|tám cái|num||
|ここのつ|chín cái|num||
|とお|mười cái|num||
|いくつ|mấy cái; mấy tuổi|q|いくつありますか。|Có mấy cái?
一人|ひとり|một người|n||
二人|ふたり|hai người|n|二人で行きます。|Hai người cùng đi.
何人|なんにん|mấy người|q|家族は何人ですか。|Gia đình bạn có mấy người?
三人|さんにん|ba người|n||
冊|さつ|quyển (sách, vở)|ctr|本を二冊買いました。|Tôi mua hai quyển sách.
匹|ひき|con (động vật nhỏ)|ctr|猫が三匹います。|Có ba con mèo.
歳|さい|tuổi|ctr|弟は十歳です。|Em trai tôi 10 tuổi.
個|こ|cái (vật nhỏ)|ctr||
枚|まい|tờ, tấm (vật mỏng)|ctr|切手を三枚ください。|Cho tôi ba con tem.
台|だい|chiếc (máy móc, xe)|ctr|車が一台あります。|Có một chiếc ô tô.
回|かい|lần|ctr|一週間に二回泳ぎます。|Một tuần tôi bơi hai lần.
本|ほん|cái (vật dài)|ctr|鉛筆が二本あります。|Có hai cây bút chì.
|りんご|quả táo|n||
切手|きって|tem thư|n||
両親|りょうしん|bố mẹ|n|両親はハノイに住んでいます。|Bố mẹ tôi sống ở Hà Nội.
兄弟|きょうだい|anh chị em|n|兄弟がいますか。|Bạn có anh chị em không?
兄|あに|anh trai (của mình)|n||
姉|あね|chị gái (của mình)|n||
弟|おとうと|em trai|n||
妹|いもうと|em gái|n||
外国|がいこく|nước ngoài|n|外国へ行きたいです。|Tôi muốn đi nước ngoài.
留学生|りゅうがくせい|du học sinh|n|私は留学生です。|Tôi là du học sinh.
全部で|ぜんぶで|tổng cộng|adv|全部でいくらですか。|Tổng cộng bao nhiêu tiền?
|みんな|mọi người|n||
|だけ|chỉ|adv|一人だけ来ました。|Chỉ một người đến.
年|ねん|năm|ctr|日本に二年います。|Tôi ở Nhật được hai năm.
#L18 So sánh, thời tiết và mùa
天気|てんき|thời tiết|n|今日はいい天気ですね。|Hôm nay trời đẹp nhỉ.
雨|あめ|mưa|n|明日は雨です。|Ngày mai mưa.
雪|ゆき|tuyết|n||
雲|くも|mây|n||
晴れ|はれ|trời nắng|n|明日は晴れです。|Ngày mai trời nắng.
曇り|くもり|trời nhiều mây|n||
風|かぜ|gió|n|今日は風が強いです。|Hôm nay gió mạnh.
空|そら|bầu trời|n|空が青いです。|Bầu trời xanh.
春|はる|mùa xuân|n||
夏|なつ|mùa hè|n|夏が一番好きです。|Tôi thích mùa hè nhất.
秋|あき|mùa thu|n||
冬|ふゆ|mùa đông|n||
季節|きせつ|mùa|n|どの季節が好きですか。|Bạn thích mùa nào?
海|うみ|biển|n|海で泳ぎます。|Tôi bơi ở biển.
|ホテル|khách sạn|n||
|どちら|cái nào (giữa hai)|q|どちらが好きですか。|Bạn thích cái nào hơn?
一番|いちばん|nhất|adv|家族で父が一番背が高いです。|Trong nhà bố cao nhất.
|ずっと|hơn hẳn; suốt|adv||
速い|はやい|nhanh|ai|新幹線は速いです。|Tàu Shinkansen nhanh.
多い|おおい|nhiều|ai|東京は人が多いです。|Tokyo đông người.
少ない|すくない|ít|ai||
暖かい|あたたかい|ấm áp|ai||
涼しい|すずしい|mát mẻ|ai|秋は涼しいです。|Mùa thu mát mẻ.
甘い|あまい|ngọt|ai||
重い|おもい|nặng|ai|このかばんは重いです。|Cái cặp này nặng.
軽い|かるい|nhẹ|ai||
近い|ちかい|gần|ai|駅は近いです。|Ga gần.
遠い|とおい|xa|ai||
簡単|かんたん|đơn giản|an|この問題は簡単です。|Câu hỏi này đơn giản.
#L19 Mong muốn và đi chơi
欲しい|ほしい|muốn có|ai|新しいパソコンが欲しいです。|Tôi muốn có máy tính mới.
遊ぶ|あそぶ|chơi|v1|公園で遊びます。|Chơi ở công viên.
泳ぐ|およぐ|bơi|v1|海で泳ぎたいです。|Tôi muốn bơi ở biển.
疲れる|つかれる|mệt|v2|今日は疲れました。|Hôm nay tôi mệt rồi.
買い物|かいもの|mua sắm|n|デパートで買い物します。|Tôi mua sắm ở trung tâm thương mại.
食事|しょくじ|bữa ăn|n||
散歩|さんぽ|đi dạo|n|朝、公園を散歩します。|Buổi sáng tôi đi dạo công viên.
川|かわ|sông|n|川で魚を釣ります。|Câu cá ở sông.
休み|やすみ|ngày nghỉ|n|休みの日は何をしますか。|Ngày nghỉ bạn làm gì?
週末|しゅうまつ|cuối tuần|n|週末は何をしますか。|Cuối tuần bạn làm gì?
広い|ひろい|rộng|ai||
狭い|せまい|chật|ai|私の部屋は狭いです。|Phòng tôi chật.
大変|たいへん|vất vả|an|仕事は大変です。|Công việc vất vả.
|プール|bể bơi|n||
美術館|びじゅつかん|bảo tàng mỹ thuật|n||
何か|なにか|cái gì đó|pron|何か飲みたいです。|Tôi muốn uống gì đó.
|どこか|đâu đó|pron|どこか行きたいです。|Tôi muốn đi đâu đó.
|おなか|bụng|n|おなかがすきました。|Tôi đói bụng rồi.
入る|はいる|vào|v1|部屋に入ります。|Tôi vào phòng.
出る|でる|ra, rời|v2|七時に家を出ます。|7 giờ tôi ra khỏi nhà.
#L20 Nhờ vả lịch sự
|つける|bật (đèn, máy)|v2|電気をつけてください。|Hãy bật đèn lên.
消す|けす|tắt|v1|テレビを消してください。|Hãy tắt ti vi.
開ける|あける|mở|v2|窓を開けてください。|Hãy mở cửa sổ.
閉める|しめる|đóng|v2|ドアを閉めてください。|Hãy đóng cửa.
急ぐ|いそぐ|vội|v1|急いでください。|Hãy nhanh lên.
待つ|まつ|đợi|v1|ちょっと待ってください。|Hãy đợi một chút.
持つ|もつ|cầm, mang|v1|荷物を持ちます。|Tôi xách hành lý.
手伝う|てつだう|giúp đỡ|v1|ちょっと手伝ってください。|Giúp tôi một chút.
呼ぶ|よぶ|gọi|v1|タクシーを呼んでください。|Hãy gọi taxi giúp tôi.
話す|はなす|nói chuyện|v1|ゆっくり話してください。|Hãy nói chậm thôi.
使う|つかう|sử dụng|v1|このペンを使ってください。|Hãy dùng cái bút này.
見せる|みせる|cho xem|v2|切符を見せてください。|Cho tôi xem vé.
言う|いう|nói|v1|もう一度言ってください。|Hãy nói lại một lần nữa.
乗る|のる|lên (xe)|v1|電車に乗ります。|Tôi lên tàu điện.
降りる|おりる|xuống (xe)|v2|次の駅で降ります。|Tôi xuống ở ga sau.
降る|ふる|rơi (mưa, tuyết)|v1|雨が降っています。|Trời đang mưa.
電気|でんき|điện; đèn|n||
荷物|にもつ|hành lý|n||
住所|じゅうしょ|địa chỉ|n|住所を教えてください。|Cho tôi biết địa chỉ.
地図|ちず|bản đồ|n|地図を書いてください。|Vẽ bản đồ giúp tôi.
|すぐ|ngay lập tức|adv|すぐ来てください。|Hãy đến ngay.
|ゆっくり|chậm rãi|adv||
|まっすぐ|thẳng|adv|まっすぐ行ってください。|Hãy đi thẳng.
`]);

if (typeof module !== 'undefined' && module.exports) { module.exports = window.JA_WORDS_RAW; }
