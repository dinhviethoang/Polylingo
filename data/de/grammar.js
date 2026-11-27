/**
 * data/de/grammar.js
 * Bảng ngữ pháp A1 tra nhanh cho mục "Ngữ pháp" (PolyLingo tự soạn, giải thích bằng tiếng Việt).
 * Mỗi chủ đề: { id, title, lesson (bài giới thiệu lần đầu), desc, table: { head, rows }, notes, ex: [[câu Đức, nghĩa]] }
 */
if (typeof window === 'undefined') { global.window = global; }

(function () {
  'use strict';

  const GRAMMAR = [
    { id: 'pron', title: 'Đại từ nhân xưng, sein và haben', lesson: 4,
      desc: 'Hai động từ quan trọng nhất, chia bất quy tắc. Sie (viết hoa) là ngôi lịch sự, chia giống "sie" số nhiều.',
      table: { head: ['Ngôi', 'Nghĩa', 'sein (là)', 'haben (có)'], rows: [
        ['ich', 'tôi', 'bin', 'habe'], ['du', 'bạn (thân)', 'bist', 'hast'], ['er / sie / es', 'anh ấy / cô ấy / nó', 'ist', 'hat'],
        ['wir', 'chúng tôi', 'sind', 'haben'], ['ihr', 'các bạn', 'seid', 'habt'], ['sie / Sie', 'họ / ông, bà', 'sind', 'haben']] },
      notes: ['Gặp người lạ, ở cửa hàng, cơ quan: luôn dùng Sie.', 'Bạn bè, đồng nghiệp trẻ, trẻ em: dùng du.'],
      ex: [['Sind Sie Frau Schulz?', 'Bà có phải bà Schulz không?'], ['Wir haben keine Zeit.', 'Chúng tôi không có thời gian.']] },
    { id: 'present', title: 'Chia động từ ở hiện tại', lesson: 5,
      desc: 'Lấy gốc (bỏ -en) rồi thêm đuôi. Gốc tận cùng -t, -d thêm e cho dễ đọc (du arbeitest); gốc tận cùng -s, -ß, -z thì ngôi du chỉ thêm -t (du heißt).',
      table: { head: ['Ngôi', 'Đuôi', 'wohnen', 'arbeiten', 'heißen'], rows: [
        ['ich', '-e', 'wohne', 'arbeite', 'heiße'], ['du', '-st', 'wohnst', 'arbeitest', 'heißt'], ['er / sie / es', '-t', 'wohnt', 'arbeitet', 'heißt'],
        ['wir', '-en', 'wohnen', 'arbeiten', 'heißen'], ['ihr', '-t', 'wohnt', 'arbeitet', 'heißt'], ['sie / Sie', '-en', 'wohnen', 'arbeiten', 'heißen']] },
      notes: ['Ngôi wir và sie/Sie luôn giống động từ nguyên mẫu.'],
      ex: [['Wo arbeitest du?', 'Bạn làm việc ở đâu?'], ['Sie wohnt in Köln.', 'Cô ấy sống ở Köln.']] },
    { id: 'stemchange', title: 'Động từ đổi nguyên âm', lesson: 13,
      desc: 'Một số động từ mạnh đổi nguyên âm ở ngôi du và er/sie/es. Các ngôi khác chia bình thường.',
      table: { head: ['Kiểu', 'Nguyên mẫu', 'du', 'er / sie / es'], rows: [
        ['e → i', 'sprechen', 'sprichst', 'spricht'], ['e → i', 'essen', 'isst', 'isst'], ['e → i', 'nehmen', 'nimmst', 'nimmt'],
        ['e → ie', 'lesen', 'liest', 'liest'], ['e → ie', 'sehen', 'siehst', 'sieht'], ['a → ä', 'fahren', 'fährst', 'fährt'],
        ['a → ä', 'schlafen', 'schläfst', 'schläft'], ['au → äu', 'laufen', 'läufst', 'läuft']] },
      notes: ['Trong mục Từ vựng, mỗi động từ đều có bảng chia; ngôi đổi nguyên âm được tô màu.'],
      ex: [['Sprichst du Englisch?', 'Bạn có nói tiếng Anh không?'], ['Er fährt mit dem Rad.', 'Anh ấy đi xe đạp.']] },
    { id: 'articles', title: 'Mạo từ và giống của danh từ', lesson: 8,
      desc: 'Mỗi danh từ có một giống. Không có quy tắc tuyệt đối, nên học từ luôn kèm mạo từ (trong app: xanh dương = der, đỏ = die, xanh lá = das).',
      table: { head: ['', 'Giống đực', 'Giống cái', 'Giống trung', 'Số nhiều'], rows: [
        ['Xác định (cái…này)', 'der', 'die', 'das', 'die'], ['Không xác định (một)', 'ein', 'eine', 'ein', '–'], ['Phủ định (không…)', 'kein', 'keine', 'kein', 'keine'],
        ['Sở hữu (của tôi)', 'mein', 'meine', 'mein', 'meine']] },
      notes: ['Gần như luôn là die: từ tận cùng -ung, -heit, -keit, -ion, -tät, -schaft (die Zeitung, die Information).',
        'Luôn là das: từ tận cùng -chen, -lein (das Mädchen, das Brötchen); động từ dùng như danh từ (das Essen).',
        'Thường là der: ngày, tháng, mùa (der Montag, der Mai, der Winter); từ tận cùng -er chỉ người (der Lehrer).',
        'Nhiều từ tận cùng -e là die (die Lampe, die Tasche), nhưng có ngoại lệ (der Name, das Auge).',
        'Danh từ ghép lấy giống của từ cuối: das Haus + die Tür → die Haustür.'],
      ex: [['Das ist ein Stuhl. Der Stuhl ist bequem.', 'Đây là một cái ghế. Cái ghế ngồi thoải mái.']] },
    { id: 'plural', title: 'Số nhiều của danh từ', lesson: 10,
      desc: 'Có năm kiểu chính. Học số nhiều cùng lúc với từ; mạo từ số nhiều luôn là die.',
      table: { head: ['Kiểu', 'Số ít', 'Số nhiều'], rows: [
        ['-e (có thể đổi nguyên âm)', 'der Tisch, der Stuhl', 'die Tische, die Stühle'], ['-(e)n', 'die Frau, die Lampe', 'die Frauen, die Lampen'],
        ['-er (thường đổi nguyên âm)', 'das Kind, das Buch', 'die Kinder, die Bücher'], ['-s (từ mượn)', 'das Auto, das Handy', 'die Autos, die Handys'],
        ['không đổi / chỉ đổi nguyên âm', 'der Lehrer, der Apfel', 'die Lehrer, die Äpfel']] },
      notes: ['Danh từ giống cái nghề nghiệp -in thành -innen: die Lehrerin → die Lehrerinnen.'],
      ex: [['Ich habe zwei Brüder und drei Schwestern.', 'Tôi có hai anh em trai và ba chị em gái.']] },
    { id: 'cases', title: 'Cách 1, 4, 3: Nominativ, Akkusativ, Dativ', lesson: 9,
      desc: 'Mạo từ đổi theo vai trò trong câu. Nominativ: chủ ngữ (ai, cái gì làm?). Akkusativ: tân ngữ trực tiếp (làm gì, cái gì?). Dativ: tân ngữ gián tiếp (cho ai?) và sau mit, bei, nach, aus, von, zu.',
      table: { head: ['', 'Giống đực', 'Giống cái', 'Giống trung', 'Số nhiều'], rows: [
        ['Nominativ', 'der / ein', 'die / eine', 'das / ein', 'die / –'], ['Akkusativ', 'den / einen', 'die / eine', 'das / ein', 'die / –'],
        ['Dativ', 'dem / einem', 'der / einer', 'dem / einem', 'den / – (+n)']] },
      notes: ['Ở Akkusativ chỉ giống đực thay đổi: der → den, ein → einen.', 'Gộp: zu dem = zum, zu der = zur, in dem = im, in das = ins, an dem = am, bei dem = beim.'],
      ex: [['Der Mann kauft einen Apfel.', 'Người đàn ông mua một quả táo.'], ['Ich fahre mit dem Bus zur Arbeit.', 'Tôi đi xe buýt đi làm.']] },
    { id: 'wordorder', title: 'Trật tự từ trong câu', lesson: 5,
      desc: 'Quy tắc vàng: động từ chia luôn ở vị trí thứ 2. Bất cứ thành phần nào đứng đầu (thời gian, nơi chốn), chủ ngữ phải lùi ra sau động từ.',
      table: { head: ['Vị trí 1', 'Vị trí 2 (động từ)', 'Phần giữa', 'Cuối câu'], rows: [
        ['Ich', 'stehe', 'um sechs Uhr', 'auf.'], ['Um sechs Uhr', 'stehe', 'ich', 'auf.'], ['Morgen', 'muss', 'ich lange', 'arbeiten.'],
        ['Gestern', 'habe', 'ich Pizza', 'gegessen.'], ['Wann', 'kommst', 'du?', ''], ['(câu hỏi có/không)', 'Kommst', 'du morgen?', '']] },
      notes: ['Câu hỏi có/không: động từ lên vị trí 1.', 'Phần thứ hai của động từ (tiền tố tách, nguyên mẫu sau động từ khuyết thiếu, Partizip II) đứng cuối câu, tạo thành "khung câu".'],
      ex: [['Am Wochenende besuche ich meine Eltern.', 'Cuối tuần tôi về thăm bố mẹ.']] },
    { id: 'separable', title: 'Động từ tách', lesson: 12,
      desc: 'Tiền tố như an, auf, aus, ein, mit, fern, zurück tách khỏi động từ khi chia và chạy về cuối câu. Tiền tố be-, ver-, er-, ge-, ent-, emp- không bao giờ tách.',
      table: { head: ['Nguyên mẫu', 'Câu', 'Nghĩa'], rows: [
        ['aufstehen', 'Ich stehe früh auf.', 'Tôi dậy sớm.'], ['einkaufen', 'Wir kaufen am Samstag ein.', 'Thứ Bảy chúng tôi đi mua sắm.'],
        ['anrufen', 'Ruf mich an!', 'Gọi cho mình nhé!'], ['fernsehen', 'Er sieht am Abend fern.', 'Buổi tối anh ấy xem tivi.'], ['verstehen (không tách)', 'Ich verstehe das.', 'Tôi hiểu cái đó.']] },
      notes: ['Perfekt của động từ tách: ge- chen vào giữa: aufstehen → aufgestanden, einkaufen → eingekauft.'],
      ex: [['Der Zug kommt um zehn Uhr an.', 'Tàu đến lúc mười giờ.']] },
    { id: 'modal', title: 'Động từ khuyết thiếu', lesson: 18,
      desc: 'können (có thể), müssen (phải), wollen (muốn), sollen (nên), dürfen (được phép), mögen (thích), möchten (muốn, lịch sự). Ngôi ich và er giống nhau, không có đuôi.',
      table: { head: ['Ngôi', 'können', 'müssen', 'wollen', 'dürfen', 'möchten'], rows: [
        ['ich', 'kann', 'muss', 'will', 'darf', 'möchte'], ['du', 'kannst', 'musst', 'willst', 'darfst', 'möchtest'], ['er / sie / es', 'kann', 'muss', 'will', 'darf', 'möchte'],
        ['wir', 'können', 'müssen', 'wollen', 'dürfen', 'möchten'], ['ihr', 'könnt', 'müsst', 'wollt', 'dürft', 'möchtet'], ['sie / Sie', 'können', 'müssen', 'wollen', 'dürfen', 'möchten']] },
      notes: ['Động từ chính ở dạng nguyên mẫu, đứng cuối câu: Ich kann gut schwimmen.'],
      ex: [['Kannst du mir helfen?', 'Bạn giúp mình được không?'], ['Hier darf man nicht parken.', 'Ở đây không được đỗ xe.']] },
    { id: 'perfekt', title: 'Thì quá khứ Perfekt', lesson: 22,
      desc: 'Văn nói dùng Perfekt: haben/sein (chia, vị trí 2) + Partizip II (cuối câu). Dùng sein với động từ di chuyển (gehen, fahren, fliegen, kommen) và thay đổi trạng thái (aufstehen, einschlafen), cùng sein, bleiben, passieren.',
      table: { head: ['Loại', 'Nguyên mẫu', 'Partizip II', 'Ví dụ'], rows: [
        ['có quy tắc: ge-…-t', 'machen', 'gemacht', 'Ich habe Sport gemacht.'], ['bất quy tắc: ge-…-en', 'lesen', 'gelesen', 'Er hat ein Buch gelesen.'],
        ['tách: …ge…', 'einkaufen', 'eingekauft', 'Wir haben eingekauft.'], ['-ieren: không ge-', 'telefonieren', 'telefoniert', 'Ich habe telefoniert.'],
        ['be-, ver-: không ge-', 'besuchen', 'besucht', 'Sie hat Oma besucht.'], ['với sein', 'fahren', 'gefahren', 'Wir sind nach Bonn gefahren.']] },
      notes: ['sein và haben ở quá khứ thường dùng war, hatte thay cho Perfekt.', 'Mục Từ vựng ghi sẵn dạng Perfekt của mọi động từ.'],
      ex: [['Was hast du am Wochenende gemacht?', 'Cuối tuần bạn đã làm gì?'], ['Ich bin zu Hause geblieben.', 'Tôi đã ở nhà.']] },
    { id: 'negation', title: 'Phủ định: nicht và kein', lesson: 15,
      desc: 'kein thay cho ein hoặc khi danh từ không có mạo từ. nicht phủ định động từ, tính từ, trạng từ hoặc danh từ có mạo từ xác định.',
      table: { head: ['Khẳng định', 'Phủ định'], rows: [
        ['Ich habe ein Auto.', 'Ich habe kein Auto.'], ['Ich trinke Kaffee.', 'Ich trinke keinen Kaffee.'], ['Das ist teuer.', 'Das ist nicht teuer.'],
        ['Ich komme heute.', 'Ich komme heute nicht.'], ['Das ist der Bus.', 'Das ist nicht der Bus.']] },
      notes: ['Trả lời câu hỏi phủ định bằng doch nếu ý là khẳng định: Kommst du nicht? – Doch! (Có chứ!)'],
      ex: [['Ich habe leider keine Zeit.', 'Tiếc là tôi không có thời gian.']] },
    { id: 'imperative', title: 'Câu mệnh lệnh', lesson: 15,
      desc: 'Ba dạng: Sie (lịch sự), du (thân mật), ihr (nhiều người). Thêm bitte cho lịch sự.',
      table: { head: ['Nguyên mẫu', 'Sie', 'du', 'ihr'], rows: [
        ['kommen', 'Kommen Sie!', 'Komm!', 'Kommt!'], ['warten', 'Warten Sie!', 'Warte!', 'Wartet!'], ['nehmen', 'Nehmen Sie!', 'Nimm!', 'Nehmt!'],
        ['anrufen', 'Rufen Sie an!', 'Ruf an!', 'Ruft an!'], ['sein', 'Seien Sie ruhig!', 'Sei ruhig!', 'Seid ruhig!']] },
      notes: ['Dạng du: lấy ngôi du, bỏ -st (du nimmst → nimm!). Động từ a → ä không đổi: du fährst → fahr!'],
      ex: [['Sprechen Sie bitte langsam.', 'Xin ông/bà nói chậm thôi.'], ['Mach bitte das Fenster zu!', 'Đóng cửa sổ lại giùm nhé!']] },
    { id: 'prepositions', title: 'Giới từ thường gặp ở A1', lesson: 16,
      desc: 'Giới từ quyết định cách của danh từ đi sau.',
      table: { head: ['Đi với', 'Giới từ', 'Ví dụ'], rows: [
        ['Dativ', 'mit, bei, nach, aus, von, zu, seit', 'mit dem Bus, zum Arzt, aus der Schweiz'], ['Akkusativ', 'für, ohne, durch, um, gegen', 'für dich, ohne Zucker, um acht Uhr'],
        ['Ở đâu? → Dativ', 'in, an, auf, neben, vor, hinter, über, unter, zwischen', 'im Zimmer, auf dem Tisch'], ['Đi đâu? → Akkusativ', 'in, an, auf, neben, vor, hinter, über, unter, zwischen', 'ins Zimmer, auf den Tisch']] },
      notes: ['Thời gian: um + giờ, am + ngày, im + tháng/mùa.'],
      ex: [['Das Geschenk ist für dich.', 'Món quà dành cho bạn.'], ['Ich wohne bei meinen Eltern.', 'Tôi sống cùng bố mẹ.']] }
  ];

  if (typeof window !== 'undefined') window.DE_GRAMMAR = GRAMMAR;
  if (typeof module !== 'undefined' && module.exports) module.exports = GRAMMAR;
})();
