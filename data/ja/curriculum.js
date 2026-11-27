/**
 * data/ja/curriculum.js
 * Lộ trình 35 bài tiếng Nhật cho người Việt (PolyLingo tự soạn, bám khung JLPT N5, xem docs/tai-lieu-tieng-nhat.md mục 5).
 * Giai đoạn 0 (bài 1–6): bảng chữ Kana. Giai đoạn 1 (bài 7–35): N5, mỗi bài một mục tiêu "làm được",
 * 1–2 mẫu ngữ pháp, từ vựng lấy từ data/ja/words-*.js (nhóm #L<số bài>), Kanji tự tính theo từ vựng.
 * Cứ 5 bài có một bài kiểm tra chặng (checkpoint), cần đạt 80%.
 */
if (typeof window === 'undefined') { global.window = global; }

(function () {
  'use strict';

  const K = (set, rows, extra) => Object.assign({ set, rows }, extra || {});
  const G = (p, vi, ex) => ({ p, vi, ex });

  const LESSONS = [
    // ===== Giai đoạn 0: Kana =====
    { no: 1, stage: 'kana', title: 'Hiragana hàng A đến hàng Na', goal: 'Đọc và viết 25 chữ Hiragana đầu tiên.',
      kana: K('hiragana', ['a', 'ka', 'sa', 'ta', 'na']) },
    { no: 2, stage: 'kana', title: 'Hiragana hàng Ha đến chữ ん', goal: 'Đọc trọn bảng 46 chữ Hiragana.',
      kana: K('hiragana', ['ha', 'ma', 'ya', 'ra', 'wa', 'n']) },
    { no: 3, stage: 'kana', title: 'Âm đục, bán đục và âm ghép', goal: 'Đọc が, ぱ, きゃ… và gõ được bằng romaji.',
      kana: K('dakuten', [], { yoon: true }) },
    { no: 4, stage: 'kana', title: 'Katakana hàng A đến hàng Na', goal: 'Đọc 25 chữ Katakana đầu và tên nước ngoài đơn giản.',
      kana: K('katakana', ['a', 'ka', 'sa', 'ta', 'na']) },
    { no: 5, stage: 'kana', title: 'Katakana hàng Ha đến ン, dấu kéo dài ー', goal: 'Đọc trọn bảng Katakana và từ mượn như コーヒー.',
      kana: K('katakana', ['ha', 'ma', 'ya', 'ra', 'wa', 'n']) },
    { no: 6, stage: 'kana', title: 'Âm ngắt っ, trường âm và ôn tập', goal: 'Phân biệt おばさん/おばあさん, きて/きって; qua bài ôn 2 bảng chữ.',
      kana: K('mixed', [], { rules: true }), checkpoint: true },

    // ===== Giai đoạn 1: N5 =====
    { no: 7, title: 'Chào hỏi và giới thiệu bản thân', goal: 'Chào hỏi, nói tên, quốc tịch và nghề nghiệp của mình.',
      grammar: [
        G('N1 は N2 です', 'N1 là N2. は đọc là "wa" khi làm trợ từ.', [['私はナムです。', 'Tôi là Nam.'], ['ミンさんは学生です。', 'Minh là sinh viên.']]),
        G('N1 は N2 ではありません / ですか', 'Phủ định: không phải là. Thêm か cuối câu để hỏi.', [['私は先生ではありません。', 'Tôi không phải giáo viên.'], ['あなたは日本人ですか。', 'Bạn là người Nhật à?']])
      ] },
    { no: 8, title: 'Đồ vật quanh ta', goal: 'Hỏi "đây là gì", "của ai" và trả lời về đồ vật.',
      grammar: [
        G('これ / それ / あれ は N です', 'Cái này (gần mình) / cái đó (gần người nghe) / cái kia (xa cả hai).', [['これは本です。', 'Đây là quyển sách.'], ['あれは何ですか。', 'Kia là cái gì?']]),
        G('N1 の N2', 'の nối hai danh từ: N2 của N1, N2 về N1.', [['これは私の傘です。', 'Đây là ô của tôi.'], ['日本語の本', 'sách tiếng Nhật']])
      ] },
    { no: 9, title: 'Nơi chốn, số đếm và giá tiền', goal: 'Hỏi chỗ, hỏi giá và đọc số đến 100.',
      grammar: [
        G('ここ / そこ / あそこ は N です', 'Chỗ này / chỗ đó / chỗ kia là N. Hỏi: N はどこですか。', [['トイレはあそこです。', 'Nhà vệ sinh ở đằng kia.']]),
        G('N は いくらですか', 'Hỏi giá tiền.', [['このペンはいくらですか。', 'Cái bút này bao nhiêu tiền?'], ['百円です。', '100 yên.']])
      ] },
    { no: 10, title: 'Giờ giấc và sinh hoạt (thể ます)', goal: 'Nói giờ, kể việc làm hằng ngày ở hiện tại và quá khứ.',
      grammar: [
        G('V ます / ません / ました / ませんでした', 'Động từ lịch sự: làm / không làm / đã làm / đã không làm.', [['毎朝六時に起きます。', 'Sáng nào tôi cũng dậy lúc 6 giờ.'], ['昨日勉強しませんでした。', 'Hôm qua tôi đã không học.']]),
        G('時間 に V ます', 'に chỉ thời điểm cụ thể.', [['九時に寝ます。', 'Tôi ngủ lúc 9 giờ.']])
      ], checkpoint: true },
    { no: 11, title: 'Đi lại và phương tiện', goal: 'Nói đi đâu, bằng gì, với ai, khi nào.',
      grammar: [
        G('N(nơi) へ 行きます / 来ます / 帰ります', 'へ (đọc "e") chỉ hướng di chuyển.', [['明日東京へ行きます。', 'Ngày mai tôi đi Tokyo.']]),
        G('N(phương tiện) で / N(người) と', 'で: bằng phương tiện; と: cùng với ai.', [['電車で行きます。', 'Đi bằng tàu điện.'], ['友達と来ました。', 'Tôi đến cùng bạn.']])
      ] },
    { no: 12, title: 'Ăn uống và việc hằng ngày', goal: 'Nói mình ăn, uống, xem gì; rủ người khác làm cùng.',
      grammar: [
        G('N を V ます', 'を (đọc "o") đánh dấu tân ngữ.', [['お茶を飲みます。', 'Tôi uống trà.']]),
        G('N(nơi) で V ます / V ませんか', 'で: nơi diễn ra hành động. ませんか: lời rủ.', [['食堂で食べます。', 'Tôi ăn ở nhà ăn.'], ['一緒に映画を見ませんか。', 'Cùng xem phim nhé?']])
      ] },
    { no: 13, title: 'Dụng cụ và trao nhận', goal: 'Nói làm bằng gì; tặng và nhận đồ.',
      grammar: [
        G('N(dụng cụ) で V ます', 'で: bằng dụng cụ, phương tiện.', [['箸で食べます。', 'Tôi ăn bằng đũa.']]),
        G('N(người) に あげます / もらいます', 'Tặng cho ai / nhận từ ai.', [['母に花をあげました。', 'Tôi tặng hoa cho mẹ.'], ['友達にペンをもらいました。', 'Tôi nhận bút từ bạn.']])
      ] },
    { no: 14, title: 'Tính từ miêu tả', goal: 'Miêu tả người, đồ vật, thành phố bằng tính từ.',
      grammar: [
        G('Aい です / Aくないです', 'Tính từ đuôi い: phủ định bỏ い thêm くない. いい → よくない.', [['この本は面白いです。', 'Sách này thú vị.'], ['高くないです。', 'Không đắt.']]),
        G('Aな です / Aじゃありません', 'Tính từ đuôi な: bổ nghĩa danh từ thì thêm な.', [['静かな町です。', 'Thị trấn yên tĩnh.']])
      ] },
    { no: 15, title: 'Sở thích và lý do', goal: 'Nói mình thích, giỏi gì và giải thích lý do.',
      grammar: [
        G('N が 好きです / 上手です / 分かります', 'Đối tượng của thích, giỏi, hiểu dùng が.', [['音楽が好きです。', 'Tôi thích âm nhạc.']]),
        G('Câu 1 から、Câu 2', 'Vì câu 1 nên câu 2.', [['暑いですから、窓を開けます。', 'Vì nóng nên tôi mở cửa sổ.']])
      ], checkpoint: true },
    { no: 16, title: 'Có ở đâu và vị trí', goal: 'Nói ở đâu có gì, ai; chỉ vị trí trên dưới trong ngoài.',
      grammar: [
        G('N(nơi) に N が あります / います', 'あります: đồ vật, cây; います: người, động vật.', [['机の上に本があります。', 'Trên bàn có sách.'], ['公園に子供がいます。', 'Công viên có trẻ con.']]),
        G('N1 の 上 / 下 / 中 / 前 …', 'Vị trí so với N1.', [['駅の前に銀行があります。', 'Trước ga có ngân hàng.']])
      ] },
    { no: 17, title: 'Số lượng và gia đình', goal: 'Đếm đồ vật, người và giới thiệu gia đình.',
      grammar: [
        G('N を số + lượng từ ください', 'Lượng từ đứng sau tân ngữ, trước động từ.', [['りんごをふたつください。', 'Cho tôi hai quả táo.'], ['切手を三枚ください。', 'Cho tôi ba con tem.']]),
        G('Khoảng thời gian に số lần', 'Tần suất trong một khoảng thời gian.', [['一週間に二回泳ぎます。', 'Một tuần bơi hai lần.']])
      ] },
    { no: 18, title: 'So sánh, thời tiết và mùa', goal: 'So sánh hai thứ, nói cái gì nhất; nói về thời tiết.',
      grammar: [
        G('A は B より Adj です', 'A hơn B.', [['東京はハノイより寒いです。', 'Tokyo lạnh hơn Hà Nội.']]),
        G('N の中で 何が 一番 Adj ですか', 'Trong N, cái gì nhất?', [['季節の中で夏が一番好きです。', 'Trong các mùa tôi thích mùa hè nhất.']])
      ] },
    { no: 19, title: 'Mong muốn và đi chơi', goal: 'Nói mình muốn có gì, muốn làm gì, đi đâu để làm gì.',
      grammar: [
        G('N が 欲しいです / V たいです', 'Muốn có N / muốn làm V (bỏ ます thêm たい).', [['新しい靴が欲しいです。', 'Tôi muốn có giày mới.'], ['日本へ行きたいです。', 'Tôi muốn đi Nhật.']]),
        G('N へ V(bỏ ます) に 行きます', 'Đi đến đâu để làm gì.', [['デパートへ買い物に行きます。', 'Tôi đi trung tâm thương mại để mua sắm.']])
      ] },
    { no: 20, title: 'Nhờ vả lịch sự (thể て)', goal: 'Chia thể て và nhờ người khác làm giúp.',
      grammar: [
        G('V て ください', 'Hãy làm V (lịch sự). Nhóm I: く→いて, ぐ→いで, む/ぶ/ぬ→んで, う/つ/る→って, す→して; 行く→行って.', [['窓を開けてください。', 'Hãy mở cửa sổ.'], ['ちょっと待ってください。', 'Hãy đợi một chút.']])
      ], checkpoint: true },
    { no: 21, title: 'Đang làm và nghề nghiệp', goal: 'Nói việc đang làm, nơi sống, nghề nghiệp, tình trạng hôn nhân.',
      grammar: [
        G('V て います', 'Đang làm; hoặc trạng thái kéo dài (sống ở, đã kết hôn, biết).', [['今雨が降っています。', 'Bây giờ trời đang mưa.'], ['ハノイに住んでいます。', 'Tôi sống ở Hà Nội.']])
      ] },
    { no: 22, title: 'Xin phép và cấm đoán', goal: 'Xin phép làm gì và hiểu biển cấm.',
      grammar: [
        G('V ても いいですか', 'Tôi làm V được không?', [['写真を撮ってもいいですか。', 'Tôi chụp ảnh được không?']]),
        G('V ては いけません', 'Không được làm V.', [['ここでたばこを吸ってはいけません。', 'Không được hút thuốc ở đây.']])
      ] },
    { no: 23, title: 'Chuỗi hành động và cơ thể', goal: 'Kể các việc làm theo thứ tự; miêu tả ngoại hình.',
      grammar: [
        G('V1 て、V2 て、V3 ます', 'Nối các hành động theo thứ tự.', [['朝起きて、顔を洗って、朝ご飯を食べます。', 'Sáng dậy, rửa mặt rồi ăn sáng.']]),
        G('V1 てから、V2', 'Sau khi làm V1 thì V2.', [['歯を磨いてから、寝ます。', 'Đánh răng xong rồi ngủ.']])
      ] },
    { no: 24, title: 'Thể ない và sức khỏe', goal: 'Chia thể ない; khuyên người khác đừng làm gì khi ốm.',
      grammar: [
        G('V ないで ください', 'Xin đừng làm V. Nhóm I: u→a+ない (う→わない); nhóm II: bỏ る+ない; する→しない, 来る→こない.', [['心配しないでください。', 'Đừng lo lắng.'], ['冷たい水を飲まないでください。', 'Đừng uống nước lạnh.']])
      ] },
    { no: 25, title: 'Bắt buộc và không cần', goal: 'Nói việc phải làm và việc không cần làm.',
      grammar: [
        G('V なければ なりません', 'Phải làm V (bỏ い của ない thêm ければなりません).', [['レポートを出さなければなりません。', 'Tôi phải nộp báo cáo.']]),
        G('V なくても いいです', 'Không cần làm V cũng được.', [['ネクタイをしなくてもいいです。', 'Không cần thắt cà vạt.']])
      ], checkpoint: true },
    { no: 26, title: 'Khả năng', goal: 'Nói mình có thể làm gì, biết ngôn ngữ nào.',
      grammar: [
        G('N が できます / V(từ điển) ことが できます', 'Có thể làm N / làm V.', [['日本語ができます。', 'Tôi biết tiếng Nhật.'], ['ピアノを弾くことができます。', 'Tôi biết chơi piano.']])
      ] },
    { no: 27, title: 'Thể từ điển và sở thích', goal: 'Dùng thể từ điển để nói sở thích và việc làm trước khi…',
      grammar: [
        G('趣味は V(từ điển) ことです', 'Sở thích của tôi là làm V.', [['趣味は写真を撮ることです。', 'Sở thích của tôi là chụp ảnh.']]),
        G('V(từ điển) 前に、…', 'Trước khi làm V thì…', [['寝る前に本を読みます。', 'Trước khi ngủ tôi đọc sách.']])
      ] },
    { no: 28, title: 'Kinh nghiệm (thể た)', goal: 'Chia thể た, kể mình đã từng hay chưa từng làm gì.',
      grammar: [
        G('V た ことが あります', 'Đã từng làm V (thể た chia như thể て, đổi て→た, で→だ).', [['富士山に登ったことがあります。', 'Tôi đã từng leo núi Phú Sĩ.'], ['すしを食べたことがありません。', 'Tôi chưa từng ăn sushi.']])
      ] },
    { no: 29, title: 'Liệt kê hành động', goal: 'Kể vài việc tiêu biểu mình làm vào ngày nghỉ.',
      grammar: [
        G('V1 たり、V2 たり します', 'Nào là V1, nào là V2 (liệt kê không theo thứ tự).', [['休みの日は掃除したり、洗濯したりします。', 'Ngày nghỉ tôi dọn dẹp, giặt giũ.']])
      ] },
    { no: 30, title: 'Biến đổi trạng thái', goal: 'Nói sự thay đổi: trời ấm lên, giỏi lên, trở thành…',
      grammar: [
        G('Aい→く / Aな・N→に なります', 'Trở nên, trở thành.', [['暖かくなりました。', 'Trời đã ấm lên.'], ['医者になりたいです。', 'Tôi muốn trở thành bác sĩ.']])
      ], checkpoint: true },
    { no: 31, title: 'Nói chuyện thân mật', goal: 'Hiểu và dùng thể thông thường khi nói với bạn bè.',
      grammar: [
        G('Thể thông thường', 'Bỏ です/ます: 行きます→行く, 行きません→行かない, 学生です→学生だ. Câu hỏi thân mật lên giọng, thường bỏ か.', [['明日、ひま？', 'Mai rảnh không?'], ['うん、ひま。', 'Ừ, rảnh.']])
      ] },
    { no: 32, title: 'Ý kiến và trích dẫn', goal: 'Nêu ý kiến của mình và kể lại lời người khác.',
      grammar: [
        G('Thể thông thường + と 思います', 'Tôi nghĩ là…', [['明日は雨が降ると思います。', 'Tôi nghĩ mai trời mưa.']]),
        G('「…」と 言いました', 'Ai đó đã nói "…".', [['先生は「宿題を出してください」と言いました。', 'Thầy nói: "Hãy nộp bài tập".']])
      ] },
    { no: 33, title: 'Mô tả người và vật', goal: 'Dùng cả câu để bổ nghĩa cho danh từ (ngược trật tự tiếng Việt).',
      grammar: [
        G('Câu (thể thông thường) + N', 'Mệnh đề đứng TRƯỚC danh từ: "người đeo kính" = めがねをかけた人.', [['母が作ったケーキはおいしいです。', 'Bánh mẹ làm thì ngon.'], ['私が生まれた所はハノイです。', 'Nơi tôi sinh ra là Hà Nội.']])
      ] },
    { no: 34, title: 'Khi nào và điều kiện', goal: 'Nói "khi…", "hễ… thì…", "nếu… thì…".',
      grammar: [
        G('… とき、…', 'Khi, lúc…', [['暇なとき、本を読みます。', 'Lúc rảnh tôi đọc sách.']]),
        G('V(từ điển) と、… / V たら、…', 'と: hễ… là (kết quả tất yếu). たら: nếu… thì.', [['このボタンを押すと、お茶が出ます。', 'Ấn nút này là trà ra.'], ['雨が降ったら、行きません。', 'Nếu mưa thì tôi không đi.']])
      ] },
    { no: 35, title: 'Giúp đỡ nhau và ôn tập N5', goal: 'Nói ai làm gì giúp ai; ôn tổng kết toàn bộ N5.',
      grammar: [
        G('V て あげます / もらいます / くれます', 'Làm giúp ai / được ai làm giúp / ai đó làm giúp mình.', [['町を案内してあげます。', 'Tôi sẽ dẫn bạn đi tham quan.'], ['父が自転車を直してくれました。', 'Bố đã sửa xe đạp cho tôi.']])
      ], checkpoint: true }
  ];

  const CURRICULUM = {
    lang: 'ja',
    title: 'Lộ trình tiếng Nhật Nhập môn và N5',
    passPercent: 60,
    checkpointPercent: 80,
    stages: [
      { id: 'kana', title: 'Giai đoạn 0: Bảng chữ Kana', range: [1, 6] },
      { id: 'n5', title: 'Giai đoạn 1: Sơ cấp JLPT N5', range: [7, 35] }
    ],
    lessons: LESSONS.map(l => Object.assign({ id: `ja-l${l.no}`, stage: l.stage || 'n5' }, l))
  };

  if (typeof window !== 'undefined') {
    window.JA_CURRICULUM = CURRICULUM;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CURRICULUM;
  }
})();
