/**
 * data/de/dialogues.js
 * 10 hội thoại tiếng Đức đời thường trình độ A1 (PolyLingo tự soạn).
 * Viết gọn: mỗi câu là [người nói 'A'|'B', câu tiếng Đức, nghĩa tiếng Việt]; cuối file đổi sang dạng
 * lines: [{ who, de, vi, zh }] để mục Hội thoại (app.js) và Đóng vai A–B (talk.js) dùng chung.
 */
if (typeof window === 'undefined') { global.window = global; }

(function () {
  'use strict';

  const RAW = [
    { id: 'de-d01', title: 'Làm quen ở lớp học', scene: 'Buổi đầu tiên của lớp tiếng Đức, hai học viên ngồi cạnh nhau.',
      roleA: { name: 'Minh', char: 'Minh', avatar: '🙋' }, roleB: { name: 'Julia', char: 'Julia', avatar: '👩' },
      lines: [
        ['A', 'Hallo! Ich bin Minh. Wie heißt du?', 'Xin chào! Mình là Minh. Bạn tên là gì?'],
        ['B', 'Hallo Minh, ich heiße Julia. Freut mich!', 'Chào Minh, mình tên là Julia. Rất vui được gặp bạn!'],
        ['A', 'Freut mich auch. Woher kommst du?', 'Mình cũng rất vui. Bạn đến từ đâu?'],
        ['B', 'Ich komme aus Spanien. Und du?', 'Mình đến từ Tây Ban Nha. Còn bạn?'],
        ['A', 'Ich komme aus Vietnam, aus Hanoi.', 'Mình đến từ Việt Nam, từ Hà Nội.'],
        ['B', 'Toll! Wohnst du jetzt hier in Berlin?', 'Tuyệt! Bây giờ bạn sống ở Berlin à?'],
        ['A', 'Ja, ich wohne seit zwei Monaten hier.', 'Ừ, mình sống ở đây được hai tháng rồi.']
      ] },
    { id: 'de-d02', title: 'Ở tiệm bánh mì', scene: 'Buổi sáng, bạn mua bánh mì ở tiệm bánh (Bäckerei) gần nhà.',
      roleA: { name: 'Người bán', char: 'Verkäuferin', avatar: '🥨' }, roleB: { name: 'Khách (bạn)', char: 'Kunde', avatar: '🛍️' },
      lines: [
        ['A', 'Guten Morgen! Was darf es sein?', 'Chào buổi sáng! Quý khách cần gì ạ?'],
        ['B', 'Guten Morgen! Ich hätte gern vier Brötchen, bitte.', 'Chào buổi sáng! Cho tôi bốn ổ bánh mì nhỏ.'],
        ['A', 'Gern. Noch etwas?', 'Vâng. Còn gì nữa không ạ?'],
        ['B', 'Ja, ein Stück Apfelkuchen. Was kostet das?', 'Có, một miếng bánh táo. Tất cả bao nhiêu tiền?'],
        ['A', 'Das macht zusammen fünf Euro zwanzig.', 'Tổng cộng năm euro hai mươi xu.'],
        ['B', 'Kann ich mit Karte bezahlen?', 'Tôi trả bằng thẻ được không?'],
        ['A', 'Ja, natürlich. Danke und einen schönen Tag!', 'Vâng, tất nhiên. Cảm ơn và chúc một ngày tốt lành!']
      ] },
    { id: 'de-d03', title: 'Hỏi đường đến nhà ga', scene: 'Bạn đang ở trung tâm thành phố và cần tìm nhà ga.',
      roleA: { name: 'Bạn', char: 'Tourist', avatar: '🧭' }, roleB: { name: 'Người đi đường', char: 'Passant', avatar: '🧑' },
      lines: [
        ['A', 'Entschuldigung, wo ist der Bahnhof, bitte?', 'Xin lỗi, nhà ga ở đâu ạ?'],
        ['B', 'Der Bahnhof? Gehen Sie hier geradeaus.', 'Nhà ga à? Ông/bà đi thẳng đường này.'],
        ['A', 'Geradeaus, und dann?', 'Đi thẳng, rồi sao nữa ạ?'],
        ['B', 'Dann an der Ampel links. Der Bahnhof ist rechts.', 'Sau đó đến đèn giao thông thì rẽ trái. Nhà ga ở bên phải.'],
        ['A', 'Ist das weit?', 'Có xa không ạ?'],
        ['B', 'Nein, nur fünf Minuten zu Fuß.', 'Không, đi bộ chỉ năm phút thôi.'],
        ['A', 'Vielen Dank!', 'Cảm ơn nhiều ạ!'],
        ['B', 'Gern geschehen.', 'Không có gì.']
      ] },
    { id: 'de-d04', title: 'Gia đình bạn thế nào?', scene: 'Hai đồng nghiệp xem ảnh gia đình trong giờ nghỉ trưa.',
      roleA: { name: 'Thomas', char: 'Thomas', avatar: '👨' }, roleB: { name: 'Lan', char: 'Lan', avatar: '👩' },
      lines: [
        ['A', 'Ist das deine Familie auf dem Foto?', 'Đây là gia đình chị trong ảnh à?'],
        ['B', 'Ja, das sind meine Eltern und mein Bruder.', 'Ừ, đây là bố mẹ và em trai tôi.'],
        ['A', 'Wie alt ist dein Bruder?', 'Em trai chị bao nhiêu tuổi?'],
        ['B', 'Er ist zwanzig. Er studiert in Saigon.', 'Cậu ấy hai mươi tuổi. Cậu ấy học đại học ở Sài Gòn.'],
        ['A', 'Und hast du auch Kinder?', 'Thế chị có con chưa?'],
        ['B', 'Ja, eine Tochter. Sie ist drei Jahre alt.', 'Có, một con gái. Bé ba tuổi.'],
        ['A', 'Wie süß! Ich habe zwei Söhne.', 'Dễ thương quá! Tôi có hai con trai.']
      ] },
    { id: 'de-d05', title: 'Hẹn đi xem phim', scene: 'Hai người bạn hẹn nhau đi chơi cuối tuần qua điện thoại.',
      roleA: { name: 'Anna', char: 'Anna', avatar: '📱' }, roleB: { name: 'Huy', char: 'Huy', avatar: '🎬' },
      lines: [
        ['A', 'Hast du am Samstag Zeit?', 'Thứ Bảy bạn có rảnh không?'],
        ['B', 'Am Samstag? Ja, am Abend habe ich Zeit.', 'Thứ Bảy à? Có, buổi tối mình rảnh.'],
        ['A', 'Hast du Lust auf Kino?', 'Bạn có muốn đi xem phim không?'],
        ['B', 'Ja, gern! Wann beginnt der Film?', 'Có chứ! Mấy giờ phim bắt đầu?'],
        ['A', 'Um halb acht. Wir treffen uns um sieben vor dem Kino.', 'Lúc bảy giờ rưỡi. Mình gặp nhau lúc bảy giờ trước rạp nhé.'],
        ['B', 'Super, bis Samstag!', 'Tuyệt, hẹn thứ Bảy nhé!']
      ] },
    { id: 'de-d06', title: 'Ở nhà hàng', scene: 'Bạn và một người bạn gọi món ở nhà hàng.',
      roleA: { name: 'Bồi bàn', char: 'Kellner', avatar: '🧑‍🍳' }, roleB: { name: 'Khách (bạn)', char: 'Gast', avatar: '🍽️' },
      lines: [
        ['A', 'Guten Abend! Was möchten Sie trinken?', 'Chào buổi tối! Quý khách muốn uống gì ạ?'],
        ['B', 'Ein Mineralwasser und einen Apfelsaft, bitte.', 'Cho một chai nước khoáng và một ly nước táo.'],
        ['A', 'Und was möchten Sie essen?', 'Còn quý khách muốn ăn gì ạ?'],
        ['B', 'Was können Sie empfehlen?', 'Anh gợi ý món gì?'],
        ['A', 'Das Hähnchen mit Kartoffeln ist sehr lecker.', 'Món gà với khoai tây rất ngon ạ.'],
        ['B', 'Gut, dann nehme ich das Hähnchen.', 'Được, vậy tôi chọn món gà.'],
        ['A', 'Hat es Ihnen geschmeckt?', 'Quý khách ăn có ngon miệng không ạ?'],
        ['B', 'Ja, sehr gut. Die Rechnung, bitte.', 'Có, rất ngon. Cho tôi thanh toán.']
      ] },
    { id: 'de-d07', title: 'Ở phòng khám', scene: 'Bạn bị ốm và đến gặp bác sĩ gia đình (Hausarzt).',
      roleA: { name: 'Bác sĩ', char: 'Ärztin', avatar: '🩺' }, roleB: { name: 'Bệnh nhân (bạn)', char: 'Patient', avatar: '🤒' },
      lines: [
        ['A', 'Guten Tag! Was fehlt Ihnen?', 'Xin chào! Ông/bà bị làm sao?'],
        ['B', 'Ich habe Kopfschmerzen und Fieber.', 'Tôi bị đau đầu và sốt.'],
        ['A', 'Seit wann haben Sie Fieber?', 'Ông/bà bị sốt từ khi nào?'],
        ['B', 'Seit gestern. Ich bin sehr müde.', 'Từ hôm qua. Tôi rất mệt.'],
        ['A', 'Sie haben eine Erkältung. Sie müssen viel trinken und schlafen.', 'Ông/bà bị cảm lạnh. Ông/bà phải uống nhiều nước và ngủ nhiều.'],
        ['B', 'Muss ich Tabletten nehmen?', 'Tôi có phải uống thuốc không?'],
        ['A', 'Ja, nehmen Sie diese Tabletten dreimal am Tag. Gute Besserung!', 'Có, ông/bà uống thuốc này ngày ba lần. Chúc mau khỏe!']
      ] },
    { id: 'de-d08', title: 'Cuối tuần của bạn thế nào?', scene: 'Sáng thứ Hai, hai đồng nghiệp kể về cuối tuần.',
      roleA: { name: 'Sara', char: 'Sara', avatar: '☕' }, roleB: { name: 'Nam', char: 'Nam', avatar: '🚴' },
      lines: [
        ['A', 'Wie war dein Wochenende?', 'Cuối tuần của anh thế nào?'],
        ['B', 'Sehr schön! Ich bin mit dem Fahrrad an den See gefahren.', 'Rất tuyệt! Tôi đã đạp xe ra hồ.'],
        ['A', 'Toll! Bist du auch geschwommen?', 'Hay quá! Anh có bơi không?'],
        ['B', 'Nein, das Wasser war zu kalt. Und du?', 'Không, nước lạnh quá. Còn chị?'],
        ['A', 'Ich habe meine Eltern besucht und wir haben zusammen gekocht.', 'Tôi về thăm bố mẹ và chúng tôi đã nấu ăn cùng nhau.'],
        ['B', 'Das klingt gut!', 'Nghe hay đấy!']
      ] },
    { id: 'de-d09', title: 'Nhận phòng khách sạn', scene: 'Bạn đến quầy lễ tân khách sạn đã đặt trước.',
      roleA: { name: 'Lễ tân', char: 'Rezeption', avatar: '🛎️' }, roleB: { name: 'Khách (bạn)', char: 'Gast', avatar: '🧳' },
      lines: [
        ['A', 'Guten Tag! Kann ich Ihnen helfen?', 'Xin chào! Tôi có thể giúp gì cho ông/bà?'],
        ['B', 'Guten Tag! Ich habe eine Reservierung. Mein Name ist Tran.', 'Xin chào! Tôi đã đặt phòng trước. Tôi tên là Trần.'],
        ['A', 'Wie schreibt man das?', 'Tên ông/bà viết thế nào ạ?'],
        ['B', 'T – R – A – N.', 'T – R – A – N.'],
        ['A', 'Danke. Ein Einzelzimmer für zwei Nächte, richtig?', 'Cảm ơn. Một phòng đơn cho hai đêm, đúng không ạ?'],
        ['B', 'Ja, genau. Ist das Frühstück inklusive?', 'Vâng, đúng rồi. Có bao gồm bữa sáng không?'],
        ['A', 'Ja. Das Frühstück ist von sieben bis zehn Uhr. Hier ist Ihr Schlüssel.', 'Có ạ. Bữa sáng từ bảy đến mười giờ. Đây là chìa khóa của ông/bà.']
      ] },
    { id: 'de-d10', title: 'Mua vé tàu', scene: 'Bạn mua vé tàu đi Hamburg ở quầy bán vé.',
      roleA: { name: 'Bạn', char: 'Fahrgast', avatar: '🎫' }, roleB: { name: 'Nhân viên', char: 'Mitarbeiter', avatar: '🚆' },
      lines: [
        ['A', 'Guten Tag, eine Fahrkarte nach Hamburg, bitte.', 'Xin chào, cho tôi một vé đi Hamburg.'],
        ['B', 'Einfach oder hin und zurück?', 'Một chiều hay khứ hồi ạ?'],
        ['A', 'Hin und zurück, bitte. Wann fährt der nächste Zug?', 'Khứ hồi. Chuyến tàu tiếp theo chạy lúc mấy giờ?'],
        ['B', 'Um 10:15 Uhr von Gleis vier.', 'Lúc 10 giờ 15 từ đường ray số bốn.'],
        ['A', 'Muss ich umsteigen?', 'Tôi có phải đổi tàu không?'],
        ['B', 'Nein, der Zug fährt direkt. Das kostet 89 Euro.', 'Không, tàu chạy thẳng. Vé giá 89 euro.'],
        ['A', 'Gut, hier bitte. Danke schön!', 'Được, đây ạ. Cảm ơn nhiều!']
      ] }
  ];

  const DIALOGUES = RAW.map(d => Object.assign({}, d, {
    lines: d.lines.map(([who, de, vi]) => ({ who, de, vi, zh: de, py: '' }))
  }));

  if (typeof window !== 'undefined') {
    window.DE_DIALOGUES = DIALOGUES;
    window.DIALOGUES_DE = DIALOGUES;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = DIALOGUES;
})();
