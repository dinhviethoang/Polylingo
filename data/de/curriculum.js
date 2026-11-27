/**
 * data/de/curriculum.js
 * Lộ trình 30 bài tiếng Đức A1 cho người Việt (PolyLingo tự soạn, bám khung tham chiếu châu Âu CEFR A1).
 * Giai đoạn 0 (bài 1–3): phát âm và bảng chữ cái. Giai đoạn 1 (bài 4–17): A1.1. Giai đoạn 2 (bài 18–30): A1.2.
 * Mỗi bài có mục tiêu "làm được", 1–2 mẫu ngữ pháp kèm ví dụ, từ vựng lấy từ data/de/words-*.js (nhóm #L<số bài>).
 * Bài kiểm tra chặng (checkpoint) cần đạt 80%, bài thường 60%.
 */
if (typeof window === 'undefined') { global.window = global; }

(function () {
  'use strict';

  const G = (p, vi, ex) => ({ p, vi, ex });

  const LESSONS = [
    // ===== Giai đoạn 0: Phát âm =====
    { no: 1, stage: 'sounds', title: 'Bảng chữ cái và nguyên âm', goal: 'Đánh vần được tên mình, đọc đúng nguyên âm dài và ngắn.', sounds: ['abc', 'vowels'] },
    { no: 2, stage: 'sounds', title: 'Ä, Ö, Ü và nguyên âm đôi', goal: 'Đọc đúng ä, ö, ü, ei, ie, eu, au.', sounds: ['umlaut', 'diph'] },
    { no: 3, stage: 'sounds', title: 'Phụ âm khó và trọng âm', goal: 'Đọc đúng ch, sch, st, z, w, v, r và âm cuối b/d/g; qua bài ôn phát âm.', sounds: ['ch', 'cons', 'stress'], checkpoint: true },

    // ===== Giai đoạn 1: A1.1 =====
    { no: 4, title: 'Chào hỏi và giới thiệu', goal: 'Chào hỏi, nói tên và hỏi tên người khác, phân biệt du và Sie.',
      grammar: [
        G('ich bin / du bist / Sie sind', 'Động từ sein (là). Dùng du với bạn bè, trẻ em; dùng Sie (viết hoa) với người lạ, người lớn tuổi.', [['Ich bin Minh.', 'Tôi là Minh.'], ['Sind Sie Herr Weber?', 'Ông có phải ông Weber không?']]),
        G('Wie heißt du? – Ich heiße …', 'Hỏi tên. Wie heißen Sie? là cách hỏi lịch sự.', [['Wie heißt du?', 'Bạn tên là gì?'], ['Ich heiße Lan.', 'Mình tên là Lan.']])
      ] },
    { no: 5, title: 'Đất nước và ngôn ngữ', goal: 'Nói mình đến từ đâu, sống ở đâu, nói tiếng gì.',
      grammar: [
        G('Chia động từ hiện tại: ich -e, du -st, er -t, wir -en, ihr -t, sie -en', 'Bỏ -en ở động từ nguyên mẫu rồi thêm đuôi theo ngôi: wohnen → ich wohne, du wohnst, er wohnt.', [['Ich wohne in Berlin.', 'Tôi sống ở Berlin.'], ['Wo wohnst du?', 'Bạn sống ở đâu?']]),
        G('W-Frage: Woher? Wo? + động từ + chủ ngữ', 'Câu hỏi có từ để hỏi: từ để hỏi đứng đầu, động từ đứng thứ hai.', [['Woher kommen Sie?', 'Ông/bà đến từ đâu?'], ['Ich komme aus Vietnam.', 'Tôi đến từ Việt Nam.']])
      ] },
    { no: 6, title: 'Số đếm, tuổi và số điện thoại', goal: 'Đếm đến 100, nói tuổi, đọc số điện thoại và địa chỉ.',
      grammar: [
        G('haben: ich habe, du hast, er hat', 'Động từ có. Hai động từ sein và haben phải thuộc lòng.', [['Ich habe zwei Kinder.', 'Tôi có hai con.'], ['Hast du ein Handy?', 'Bạn có điện thoại không?']]),
        G('Số 21–99: đơn vị + und + chục', 'Đọc ngược với tiếng Việt: 25 = fünfundzwanzig (năm và hai mươi).', [['Ich bin einunddreißig Jahre alt.', 'Tôi ba mươi mốt tuổi.'], ['Wie alt bist du?', 'Bạn bao nhiêu tuổi?']])
      ] },
    { no: 7, title: 'Gia đình', goal: 'Giới thiệu các thành viên trong gia đình.',
      grammar: [
        G('mein / dein / sein / ihr', 'Từ sở hữu. Trước danh từ giống cái và số nhiều thêm -e: meine Mutter, meine Eltern.', [['Das ist mein Bruder.', 'Đây là anh trai tôi.'], ['Das ist meine Schwester.', 'Đây là chị gái tôi.']]),
        G('Câu hỏi có/không: động từ đứng đầu', 'Đưa động từ lên đầu câu để hỏi: Hast du…? Bist du…?', [['Hast du Geschwister?', 'Bạn có anh chị em không?'], ['Ja, ich habe eine Schwester.', 'Có, mình có một chị gái.']])
      ] },
    { no: 8, title: 'Đồ vật quanh ta', goal: 'Gọi tên đồ vật kèm đúng mạo từ, nói "đây là / không phải là".',
      grammar: [
        G('der / die / das và ein / eine', 'Mỗi danh từ có một giống: đực (der, ein), cái (die, eine), trung (das, ein). Hãy học từ luôn kèm mạo từ.', [['Das ist ein Tisch. Der Tisch ist neu.', 'Đây là một cái bàn. Cái bàn này mới.'], ['Das ist eine Lampe.', 'Đây là một cây đèn.']]),
        G('kein / keine', 'Phủ định danh từ dùng kein (không phải, không có).', [['Das ist kein Buch, das ist ein Heft.', 'Đây không phải sách, đây là vở.']])
      ], checkpoint: true },
    { no: 9, title: 'Đồ ăn và thức uống', goal: 'Nói mình thích ăn uống gì, gọi đồ ăn đơn giản.',
      grammar: [
        G('Akkusativ: einen / den (giống đực)', 'Tân ngữ trực tiếp: chỉ giống đực đổi der → den, ein → einen. Giống cái, trung giữ nguyên.', [['Ich trinke einen Kaffee.', 'Tôi uống một ly cà phê.'], ['Ich esse ein Brot.', 'Tôi ăn một ổ bánh mì.']]),
        G('ich möchte + danh từ / gern', 'möchte: muốn (lịch sự). gern đặt sau động từ: thích làm.', [['Ich möchte einen Tee.', 'Tôi muốn một tách trà.'], ['Ich esse gern Fisch.', 'Tôi thích ăn cá.']])
      ] },
    { no: 10, title: 'Mua sắm và giá tiền', goal: 'Hỏi giá, mua hàng ở siêu thị và chợ, trả tiền.',
      grammar: [
        G('Was kostet …? / Was kosten …?', 'Hỏi giá một món (kostet) hay nhiều món (kosten).', [['Was kostet der Käse?', 'Phô mai giá bao nhiêu?'], ['Die Äpfel kosten zwei Euro.', 'Táo giá hai euro.']]),
        G('Số nhiều của danh từ', 'Có nhiều kiểu: -e (Tische), -en (Frauen), -er (Kinder), -s (Autos), đổi nguyên âm (Äpfel). Mạo từ số nhiều luôn là die.', [['Ich kaufe zwei Flaschen Wasser.', 'Tôi mua hai chai nước.']])
      ] },
    { no: 11, title: 'Giờ giấc', goal: 'Hỏi và nói giờ, hẹn giờ bắt đầu và kết thúc.',
      grammar: [
        G('Wie spät ist es? – Es ist …', 'halb drei = 2 giờ 30 (nửa đường tới ba giờ), Viertel nach drei = 3 giờ 15, zehn vor vier = 4 giờ kém 10.', [['Es ist halb acht.', 'Bây giờ là bảy giờ rưỡi.'], ['Es ist Viertel vor neun.', 'Bây giờ là chín giờ kém mười lăm.']]),
        G('um + giờ; động từ luôn ở vị trí thứ hai', 'Đưa thời gian lên đầu câu thì chủ ngữ đứng sau động từ.', [['Der Kurs beginnt um acht.', 'Khóa học bắt đầu lúc tám giờ.'], ['Um acht beginnt der Kurs.', 'Lúc tám giờ khóa học bắt đầu.']])
      ] },
    { no: 12, title: 'Một ngày của tôi', goal: 'Kể các việc làm hằng ngày theo thứ tự, nói ngày trong tuần.',
      grammar: [
        G('Động từ tách: aufstehen → ich stehe … auf', 'Tiền tố (auf, an, ein, fern…) tách ra và đứng cuối câu.', [['Ich stehe um sechs Uhr auf.', 'Tôi dậy lúc sáu giờ.'], ['Der Film fängt um acht an.', 'Phim bắt đầu lúc tám giờ.']]),
        G('am + ngày trong tuần', 'am Montag (vào thứ Hai), am Wochenende (vào cuối tuần).', [['Am Sonntag schlafe ich lange.', 'Chủ Nhật tôi ngủ dậy muộn.']])
      ] },
    { no: 13, title: 'Sở thích và thời gian rảnh', goal: 'Nói về sở thích, hỏi bạn thích làm gì lúc rảnh.',
      grammar: [
        G('Động từ đổi nguyên âm: e → i, e → ie, a → ä', 'Chỉ ngôi du và er/sie/es đổi: sprechen → du sprichst, lesen → er liest, fahren → du fährst.', [['Liest du gern?', 'Bạn có thích đọc sách không?'], ['Er sieht oft Filme.', 'Anh ấy hay xem phim.']]),
        G('gern, lieber, am liebsten', 'Thích, thích hơn, thích nhất.', [['Ich spiele gern Fußball, aber lieber Tennis.', 'Tôi thích đá bóng nhưng thích tennis hơn.']])
      ], checkpoint: true },
    { no: 14, title: 'Nhà ở', goal: 'Mô tả nhà và phòng, nói nhà có gì.',
      grammar: [
        G('es gibt + Akkusativ', 'Có (tồn tại). Danh từ sau es gibt ở dạng Akkusativ.', [['In der Küche gibt es einen Tisch.', 'Trong bếp có một cái bàn.'], ['Gibt es hier einen Balkon?', 'Ở đây có ban công không?']]),
        G('Tính từ sau sein không đổi đuôi', 'Das Zimmer ist hell. Die Wohnung ist klein.', [['Die Miete ist nicht hoch.', 'Tiền thuê nhà không cao.']])
      ] },
    { no: 15, title: 'Thành phố và chỉ đường', goal: 'Hỏi đường và hiểu chỉ dẫn đơn giản.',
      grammar: [
        G('Mệnh lệnh lịch sự: động từ + Sie', 'Gehen Sie geradeaus! Nehmen Sie die zweite Straße links.', [['Gehen Sie hier rechts.', 'Ông/bà rẽ phải ở đây.'], ['Entschuldigung, wo ist der Bahnhof?', 'Xin lỗi, nhà ga ở đâu?']]),
        G('nicht và kein', 'kein phủ định danh từ có ein hoặc không mạo từ; nicht phủ định động từ, tính từ, danh từ xác định.', [['Der Bahnhof ist nicht weit.', 'Nhà ga không xa.'], ['Hier gibt es keine Apotheke.', 'Ở đây không có hiệu thuốc.']])
      ] },
    { no: 16, title: 'Phương tiện đi lại', goal: 'Nói đi bằng gì, mua vé, hiểu giờ tàu xe.',
      grammar: [
        G('mit + Dativ: mit dem Bus, mit der U-Bahn', 'Sau mit dùng Dativ: der → dem, die → der, das → dem.', [['Ich fahre mit dem Zug nach Hamburg.', 'Tôi đi tàu tới Hamburg.'], ['Sie fährt mit der Straßenbahn.', 'Cô ấy đi tàu điện.']]),
        G('nach + thành phố/nước, zu + người/nơi', 'Ich fahre nach Berlin. Ich gehe zum Arzt (zu dem).', [['Wir fliegen nach Vietnam.', 'Chúng tôi bay về Việt Nam.']])
      ] },
    { no: 17, title: 'Nghề nghiệp và công việc', goal: 'Nói nghề nghiệp, nơi làm việc, công việc hằng ngày.',
      grammar: [
        G('Nghề nam / nữ: -in', 'Lehrer → Lehrerin, Arzt → Ärztin. Nói nghề không cần mạo từ: Ich bin Lehrerin.', [['Ich bin Ingenieur.', 'Tôi là kỹ sư.'], ['Sie arbeitet als Verkäuferin.', 'Cô ấy làm nhân viên bán hàng.']])
      ] },

    // ===== Giai đoạn 2: A1.2 =====
    { no: 18, title: 'Cơ thể và sức khỏe', goal: 'Nói chỗ đau, đặt hẹn khám, hiểu lời khuyên của bác sĩ.',
      grammar: [
        G('Động từ khuyết thiếu müssen, sollen + nguyên mẫu ở cuối câu', 'Động từ khuyết thiếu ở vị trí 2, động từ chính nguyên mẫu đứng cuối (khung câu).', [['Du musst viel schlafen.', 'Bạn phải ngủ nhiều.'], ['Ich soll Tabletten nehmen.', 'Tôi được dặn phải uống thuốc.']]),
        G('Mein … tut weh / Ich habe …schmerzen', 'Nói chỗ đau.', [['Mein Kopf tut weh.', 'Tôi đau đầu.'], ['Ich habe Bauchschmerzen.', 'Tôi bị đau bụng.']])
      ], checkpoint: true },
    { no: 19, title: 'Thời tiết và các mùa', goal: 'Nói về thời tiết, mùa và tháng.',
      grammar: [
        G('Es regnet. Es ist kalt.', 'Thời tiết dùng chủ ngữ giả es.', [['Heute ist es sonnig.', 'Hôm nay trời nắng.'], ['Es schneit im Winter.', 'Mùa đông tuyết rơi.']]),
        G('im + tháng / mùa', 'im Mai, im Sommer (vào tháng Năm, vào mùa hè).', [['Im Juli ist es heiß.', 'Tháng Bảy trời nóng.']])
      ] },
    { no: 20, title: 'Quần áo và màu sắc', goal: 'Mua quần áo, hỏi cỡ, nói mình thích hay không.',
      grammar: [
        G('gefallen + Dativ: … gefällt mir', 'Cái gì làm ai thích: Das Kleid gefällt mir (tôi thích chiếc váy).', [['Die Jacke gefällt mir sehr.', 'Tôi rất thích chiếc áo khoác.'], ['Gefallen dir die Schuhe?', 'Bạn thích đôi giày không?']]),
        G('Đại từ mir, dir', 'Dativ của ich, du.', [['Passt mir die Hose?', 'Cái quần có vừa với tôi không?']])
      ] },
    { no: 21, title: 'Hẹn gặp và lời mời', goal: 'Mời, nhận lời, từ chối và hẹn giờ gặp.',
      grammar: [
        G('können, wollen, mögen', 'Kannst du …? (Bạn có thể…?), Wir wollen … (Chúng ta muốn…), Ich mag … (Tôi thích…).', [['Kannst du am Samstag?', 'Thứ Bảy bạn rảnh không?'], ['Wollen wir ins Kino gehen?', 'Chúng mình đi xem phim nhé?']]),
        G('Hast du Lust auf …? / Leider kann ich nicht', 'Rủ rê và từ chối lịch sự.', [['Hast du Lust auf Pizza?', 'Bạn có muốn ăn pizza không?'], ['Leider kann ich nicht, ich muss arbeiten.', 'Tiếc là mình không đi được, mình phải làm việc.']])
      ] },
    { no: 22, title: 'Đã làm gì (Perfekt với haben)', goal: 'Kể những việc đã làm hôm qua, tuần trước.',
      grammar: [
        G('haben + Partizip II (cuối câu)', 'Quá khứ trong văn nói: ge-…-t cho động từ có quy tắc (machen → gemacht), ge-…-en cho bất quy tắc (lesen → gelesen).', [['Ich habe gestern gekocht.', 'Hôm qua tôi đã nấu ăn.'], ['Hast du das Buch gelesen?', 'Bạn đọc quyển sách đó chưa?']]),
        G('Không có ge-: động từ -ieren và tiền tố be-, ver-, er-', 'telefonieren → telefoniert, besuchen → besucht, vergessen → vergessen.', [['Ich habe Oma besucht.', 'Tôi đã đến thăm bà.']])
      ] },
    { no: 23, title: 'Cuối tuần vừa rồi (Perfekt với sein)', goal: 'Kể chuyến đi, cuối tuần, dùng war và hatte.',
      grammar: [
        G('sein + Partizip II: động từ di chuyển, thay đổi trạng thái', 'fahren, gehen, fliegen, kommen, bleiben, passieren… dùng sein.', [['Wir sind nach Wien gefahren.', 'Chúng tôi đã đi Viên.'], ['Was ist passiert?', 'Đã xảy ra chuyện gì?']]),
        G('war, hatte', 'sein và haben ở quá khứ thường dùng dạng Präteritum: ich war, ich hatte.', [['Ich war krank.', 'Tôi đã bị ốm.'], ['Wir hatten keine Zeit.', 'Chúng tôi đã không có thời gian.']])
      ], checkpoint: true },
    { no: 24, title: 'Ở nhà hàng', goal: 'Gọi món, hỏi gợi ý, khen món ăn và thanh toán.',
      grammar: [
        G('Ich hätte gern … / Ich nehme …', 'Cách gọi món lịch sự.', [['Ich hätte gern eine Suppe.', 'Tôi muốn một bát súp.'], ['Ich nehme das Hähnchen.', 'Tôi chọn món gà.']]),
        G('Dativ của người: Bringen Sie mir …', 'mir (cho tôi), Ihnen (cho ông/bà).', [['Bringen Sie mir bitte die Rechnung.', 'Làm ơn mang hóa đơn cho tôi.']])
      ] },
    { no: 25, title: 'Du lịch và khách sạn', goal: 'Đặt phòng, nhận phòng, hỏi thông tin du lịch.',
      grammar: [
        G('Giới từ hai cách: in, auf, an + Dativ (ở đâu?)', 'Hỏi Wo? (ở đâu) thì dùng Dativ: im Hotel, auf dem Tisch, an der Rezeption.', [['Der Koffer ist im Zimmer.', 'Va li ở trong phòng.'], ['Fragen Sie an der Rezeption.', 'Hãy hỏi ở quầy lễ tân.']]),
        G('in, auf, an + Akkusativ (đi đâu?)', 'Hỏi Wohin? (đi đâu) thì dùng Akkusativ: ins Hotel, in die Stadt.', [['Wir gehen in die Stadt.', 'Chúng tôi đi vào thành phố.']])
      ] },
    { no: 26, title: 'Ngày tháng, lễ hội và lời chúc', goal: 'Nói ngày tháng, chúc mừng sinh nhật và các dịp lễ.',
      grammar: [
        G('Số thứ tự: am ersten, am zweiten …', 'Ngày tháng dùng số thứ tự: der erste Mai (1/5), am dritten Juni (vào 3/6).', [['Mein Geburtstag ist am zwölften März.', 'Sinh nhật tôi vào ngày 12 tháng Ba.'], ['Heute ist der erste Mai.', 'Hôm nay là mùng 1 tháng Năm.']]),
        G('schenken + Dativ (người) + Akkusativ (vật)', 'Tặng ai cái gì.', [['Ich schenke meiner Mutter Blumen.', 'Tôi tặng mẹ hoa.']])
      ] },
    { no: 27, title: 'Trường học và học tập', goal: 'Nói về việc học, kỳ thi, giải thích lý do bằng denn.',
      grammar: [
        G('und, aber, oder, denn', 'Bốn liên từ không làm đổi trật tự từ: sau chúng câu vẫn có động từ ở vị trí 2.', [['Ich lerne Deutsch, denn ich arbeite in Deutschland.', 'Tôi học tiếng Đức vì tôi làm việc ở Đức.'], ['Die Prüfung war schwer, aber ich habe bestanden.', 'Bài thi khó nhưng tôi đã đỗ.']]),
        G('wissen và kennen', 'wissen: biết một thông tin; kennen: biết, quen người hay nơi chốn.', [['Ich weiß die Antwort.', 'Tôi biết câu trả lời.'], ['Ich kenne die Lehrerin.', 'Tôi quen cô giáo.']])
      ] },
    { no: 28, title: 'Con người và cảm xúc', goal: 'Mô tả người, nói cảm xúc, so sánh đơn giản.',
      grammar: [
        G('So sánh: -er als, am -sten', 'groß → größer → am größten; gut → besser → am besten.', [['Mein Bruder ist größer als ich.', 'Anh trai tôi cao hơn tôi.'], ['Heute geht es mir besser.', 'Hôm nay tôi thấy khỏe hơn.']]),
        G('sich freuen (động từ phản thân)', 'ich freue mich, du freust dich, er freut sich.', [['Ich freue mich auf den Urlaub.', 'Tôi mong đến kỳ nghỉ.']])
      ] },
    { no: 29, title: 'Điện thoại, internet và giấy tờ', goal: 'Gọi điện, để lại lời nhắn, hỏi điều gì được phép.',
      grammar: [
        G('dürfen: Darf ich …?', 'Xin phép: Darf ich hier parken? Cấm: Hier darf man nicht rauchen.', [['Darf ich Ihr Telefon benutzen?', 'Tôi dùng điện thoại của ông/bà được không?'], ['Hier darf man nicht rauchen.', 'Ở đây không được hút thuốc.']]),
        G('Mệnh lệnh với du: Ruf mich an!', 'Bỏ đuôi -st của ngôi du: du rufst an → Ruf an! du machst → Mach!', [['Ruf mich bitte morgen an!', 'Mai gọi cho mình nhé!'], ['Schick mir eine Nachricht!', 'Nhắn tin cho mình nhé!']])
      ] },
    { no: 30, title: 'Ôn tập A1: sống ở Đức', goal: 'Dùng tổng hợp kiến thức A1 trong đời sống hằng ngày; qua bài ôn cuối khóa.',
      grammar: [
        G('Trật tự từ: động từ vị trí 2, khung câu', 'Động từ chia luôn ở vị trí 2; động từ thứ hai (nguyên mẫu, Partizip II, tiền tố tách) đứng cuối.', [['Ich möchte neue Leute kennenlernen.', 'Tôi muốn làm quen người mới.'], ['Gestern habe ich meine Nachbarin getroffen.', 'Hôm qua tôi đã gặp bà hàng xóm.']]),
        G('Nominativ, Akkusativ, Dativ của mạo từ xác định', 'der/den/dem, die/die/der, das/das/dem, die/die/den (số nhiều).', [['Der Hund gibt dem Kind den Ball.', 'Con chó đưa quả bóng cho đứa trẻ.']])
      ], checkpoint: true }
  ];

  const CURRICULUM = {
    lang: 'de',
    title: 'Lộ trình tiếng Đức A1',
    passPercent: 60,
    checkpointPercent: 80,
    stages: [
      { id: 'sounds', title: 'Giai đoạn 0: Phát âm và bảng chữ cái', range: [1, 3] },
      { id: 'a11', title: 'Giai đoạn 1: A1.1, giao tiếp cơ bản', range: [4, 17] },
      { id: 'a12', title: 'Giai đoạn 2: A1.2, kể chuyện và xoay xở ở Đức', range: [18, 30] }
    ],
    lessons: LESSONS.map(l => Object.assign({ id: `de-l${l.no}`, stage: l.stage || (l.no <= 17 ? 'a11' : 'a12') }, l))
  };

  if (typeof window !== 'undefined') window.DE_CURRICULUM = CURRICULUM;
  if (typeof module !== 'undefined' && module.exports) module.exports = CURRICULUM;
})();
