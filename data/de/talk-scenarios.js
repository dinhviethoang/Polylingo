/**
 * data/de/talk-scenarios.js
 * 6 kịch bản nhập vai cho mục Luyện nói tiếng Đức (A1), PolyLingo tự soạn:
 *  1. Tiệm bánh mì  2. Quán cà phê  3. Hỏi đường  4. Phòng khám  5. Mua vé tàu  6. Làm quen
 * Viết gọn mỗi lượt: [lời NPC, nghĩa, mục tiêu của bạn, [[câu trả lời mẫu, nghĩa], …], [từ khóa chấp nhận], câu gợi ý khi chưa khớp]
 * Cuối file đổi sang cấu trúc turns t1… giống bản en/ja để talk.js dùng.
 */
if (typeof window === 'undefined') { global.window = global; }

(function () {
  'use strict';

  const avatar = color => `<svg viewBox="0 0 40 40" width="40" height="40" fill="none"><circle cx="20" cy="20" r="20" fill="${color}22"/><path d="M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z" fill="${color}"/></svg>`;

  const RAW = [
    { id: 'baeckerei', title: 'Mua bánh ở tiệm bánh mì', description: 'Gọi bánh mì, hỏi giá và trả tiền ở một tiệm Bäckerei.', topic: 'Mua sắm',
      npc: { name: 'Frau Becker', role: 'Người bán bánh', avatarColor: '#B45309', initials: 'FB' },
      turns: [
        ['Guten Morgen! Was möchten Sie?', 'Chào buổi sáng! Quý khách muốn mua gì?', 'Chào lại và nói bạn muốn mua bánh mì nhỏ',
          [['Guten Morgen! Ich möchte drei Brötchen, bitte.', 'Chào buổi sáng! Tôi muốn ba ổ bánh mì nhỏ.'], ['Ich hätte gern zwei Brötchen.', 'Cho tôi hai ổ bánh mì nhỏ.']],
          ['brötchen', 'broetchen', 'brot', 'möchte', 'hätte'], 'Sagen Sie zum Beispiel: Ich möchte drei Brötchen. (Bạn có thể nói: Tôi muốn ba ổ bánh mì nhỏ.)'],
        ['Gern. Noch etwas?', 'Vâng. Còn gì nữa không ạ?', 'Mua thêm một miếng bánh ngọt',
          [['Ja, ein Stück Kuchen, bitte.', 'Có, một miếng bánh ngọt.'], ['Ja, einen Apfelkuchen, bitte.', 'Có, một cái bánh táo.']],
          ['kuchen', 'stück', 'ja'], 'Möchten Sie noch Kuchen? (Quý khách có muốn bánh ngọt không?)'],
        ['Das macht vier Euro fünfzig.', 'Tổng cộng bốn euro năm mươi.', 'Hỏi có trả bằng thẻ được không',
          [['Kann ich mit Karte bezahlen?', 'Tôi trả bằng thẻ được không?'], ['Nehmen Sie Karte?', 'Ở đây có nhận thẻ không?']],
          ['karte', 'bezahlen', 'zahlen'], 'Bar oder mit Karte? (Tiền mặt hay thẻ?)'],
        ['Ja, natürlich. Schönen Tag noch!', 'Vâng, tất nhiên. Chúc một ngày tốt lành!', 'Cảm ơn và chào tạm biệt',
          [['Danke, Ihnen auch! Tschüss!', 'Cảm ơn, chúc bà cũng vậy! Tạm biệt!'], ['Vielen Dank, auf Wiedersehen!', 'Cảm ơn nhiều, tạm biệt!']],
          ['danke', 'tschüss', 'wiedersehen', 'auch'], 'Auf Wiedersehen!']
      ] },
    { id: 'cafe', title: 'Gọi đồ ở quán cà phê', description: 'Gọi đồ uống, bánh và thanh toán ở quán cà phê.', topic: 'Ăn uống',
      npc: { name: 'Lukas', role: 'Nhân viên quán', avatarColor: '#7C3AED', initials: 'LK' },
      turns: [
        ['Hallo! Was darf ich Ihnen bringen?', 'Xin chào! Tôi mang gì cho quý khách ạ?', 'Gọi một ly cà phê',
          [['Einen Kaffee, bitte.', 'Cho tôi một ly cà phê.'], ['Ich hätte gern einen Cappuccino.', 'Tôi muốn một ly cappuccino.']],
          ['kaffee', 'cappuccino', 'tee', 'bitte'], 'Kaffee, Tee oder Saft? (Cà phê, trà hay nước ép?)'],
        ['Mit Milch und Zucker?', 'Có sữa và đường không ạ?', 'Nói chỉ cần sữa, không cần đường',
          [['Mit Milch, aber ohne Zucker, bitte.', 'Có sữa nhưng không đường.'], ['Nur mit Milch, bitte.', 'Chỉ cho sữa thôi.']],
          ['milch', 'ohne', 'zucker', 'nur'], 'Mit Milch? Mit Zucker? (Có sữa không? Có đường không?)'],
        ['Möchten Sie auch etwas essen?', 'Quý khách có muốn ăn gì không?', 'Hỏi quán có bánh ngọt gì',
          [['Was für Kuchen haben Sie?', 'Quán có những loại bánh ngọt nào?'], ['Ja, gibt es Kuchen?', 'Có, ở đây có bánh ngọt không?']],
          ['kuchen', 'was', 'gibt', 'haben'], 'Wir haben Apfelkuchen und Käsekuchen. (Chúng tôi có bánh táo và bánh phô mai.)'],
        ['Wir haben Apfelkuchen und Käsekuchen.', 'Chúng tôi có bánh táo và bánh phô mai.', 'Chọn một loại bánh',
          [['Ich nehme den Käsekuchen.', 'Tôi chọn bánh phô mai.'], ['Einen Apfelkuchen, bitte.', 'Cho tôi một bánh táo.']],
          ['käsekuchen', 'kaesekuchen', 'apfelkuchen', 'nehme'], 'Apfelkuchen oder Käsekuchen?'],
        ['Gern. Zusammen sieben Euro.', 'Vâng. Tổng cộng bảy euro.', 'Trả tiền và cảm ơn',
          [['Hier, bitte. Stimmt so.', 'Đây ạ. Khỏi thối lại.'], ['Danke schön!', 'Cảm ơn nhiều!']],
          ['bitte', 'danke', 'stimmt', 'hier'], 'Danke!']
      ] },
    { id: 'weg', title: 'Hỏi đường đến bưu điện', description: 'Hỏi đường, hiểu chỉ dẫn trái, phải, đi thẳng.', topic: 'Thành phố',
      npc: { name: 'Herr Wolf', role: 'Người đi đường', avatarColor: '#0369A1', initials: 'HW' },
      turns: [
        ['Ja, bitte? Kann ich Ihnen helfen?', 'Vâng? Tôi giúp gì được ông/bà?', 'Hỏi bưu điện ở đâu',
          [['Entschuldigung, wo ist die Post?', 'Xin lỗi, bưu điện ở đâu ạ?'], ['Ich suche die Post.', 'Tôi đang tìm bưu điện.']],
          ['post', 'wo', 'suche'], 'Was suchen Sie? (Ông/bà tìm gì?)'],
        ['Die Post? Gehen Sie geradeaus und dann rechts.', 'Bưu điện à? Ông/bà đi thẳng rồi rẽ phải.', 'Nhắc lại để chắc mình hiểu đúng',
          [['Geradeaus und dann rechts?', 'Đi thẳng rồi rẽ phải ạ?'], ['Also geradeaus, dann rechts.', 'Vậy là đi thẳng, sau đó rẽ phải.']],
          ['geradeaus', 'rechts'], 'Geradeaus, dann rechts. (Đi thẳng, rồi rẽ phải.)'],
        ['Genau. Die Post ist neben der Bank.', 'Đúng vậy. Bưu điện ở cạnh ngân hàng.', 'Hỏi có xa không',
          [['Ist das weit?', 'Có xa không ạ?'], ['Wie weit ist das?', 'Chỗ đó cách bao xa?']],
          ['weit', 'nah', 'minuten'], 'Fragen Sie: Ist das weit? (Hãy hỏi: Có xa không?)'],
        ['Nein, nur zehn Minuten zu Fuß.', 'Không, chỉ mười phút đi bộ.', 'Cảm ơn người chỉ đường',
          [['Vielen Dank!', 'Cảm ơn nhiều!'], ['Danke schön, tschüss!', 'Cảm ơn nhiều, tạm biệt!']],
          ['danke', 'dank'], 'Gern geschehen!']
      ] },
    { id: 'arzt', title: 'Đặt hẹn và khám bệnh', description: 'Gọi điện đặt hẹn, nói triệu chứng với bác sĩ.', topic: 'Sức khỏe',
      npc: { name: 'Dr. Schulz', role: 'Bác sĩ gia đình', avatarColor: '#059669', initials: 'DS' },
      turns: [
        ['Praxis Dr. Schulz, guten Tag!', 'Phòng khám bác sĩ Schulz xin nghe!', 'Chào và nói bạn muốn đặt hẹn',
          [['Guten Tag, ich möchte einen Termin, bitte.', 'Xin chào, tôi muốn đặt một lịch hẹn.'], ['Ich brauche einen Termin.', 'Tôi cần một lịch hẹn.']],
          ['termin'], 'Möchten Sie einen Termin? (Ông/bà muốn đặt hẹn à?)'],
        ['Was haben Sie denn?', 'Ông/bà bị làm sao?', 'Nói bạn bị đau họng và sốt',
          [['Ich habe Halsschmerzen und Fieber.', 'Tôi bị đau họng và sốt.'], ['Mein Hals tut weh und ich habe Fieber.', 'Họng tôi đau và tôi bị sốt.']],
          ['hals', 'fieber', 'schmerzen', 'weh'], 'Haben Sie Fieber? Tut etwas weh? (Có sốt không? Có đau chỗ nào không?)'],
        ['Können Sie heute um drei Uhr kommen?', 'Hôm nay ba giờ ông/bà đến được không?', 'Nhận lời hẹn lúc ba giờ',
          [['Ja, um drei Uhr ist gut.', 'Được, ba giờ là được.'], ['Ja, das passt.', 'Vâng, giờ đó được.']],
          ['ja', 'gut', 'passt', 'drei'], 'Passt Ihnen drei Uhr? (Ba giờ có tiện cho ông/bà không?)'],
        ['Gut. Wie ist Ihr Name, bitte?', 'Được. Xin cho biết tên ông/bà?', 'Nói tên của bạn',
          [['Mein Name ist Nguyen.', 'Tên tôi là Nguyễn.'], ['Ich heiße Mai Nguyen.', 'Tôi tên là Mai Nguyễn.']],
          ['name', 'heiße', 'heisse', 'bin'], 'Ihr Name, bitte?'],
        ['Danke. Bis heute Nachmittag!', 'Cảm ơn. Hẹn gặp chiều nay!', 'Cảm ơn và chào',
          [['Danke, auf Wiederhören!', 'Cảm ơn, chào bác sĩ (khi nói điện thoại)!'], ['Vielen Dank, tschüss!', 'Cảm ơn nhiều, tạm biệt!']],
          ['danke', 'wiederhören', 'tschüss'], 'Auf Wiederhören!']
      ] },
    { id: 'bahnhof', title: 'Mua vé tàu ở nhà ga', description: 'Mua vé, hỏi giờ tàu và đường ray.', topic: 'Đi lại',
      npc: { name: 'Herr Klein', role: 'Nhân viên bán vé', avatarColor: '#DC2626', initials: 'HK' },
      turns: [
        ['Guten Tag! Wohin möchten Sie fahren?', 'Xin chào! Ông/bà muốn đi đâu?', 'Nói bạn muốn đi München',
          [['Nach München, bitte.', 'Đi München ạ.'], ['Ich möchte nach München fahren.', 'Tôi muốn đi München.']],
          ['münchen', 'muenchen', 'nach'], 'Wohin? Nach Berlin, nach München …? (Đi đâu? Berlin, München…?)'],
        ['Einfach oder hin und zurück?', 'Một chiều hay khứ hồi?', 'Chọn vé một chiều',
          [['Einfach, bitte.', 'Một chiều ạ.'], ['Nur einfach.', 'Chỉ một chiều thôi.']],
          ['einfach', 'zurück'], 'Einfach oder hin und zurück?'],
        ['Das kostet 65 Euro.', 'Vé giá 65 euro.', 'Hỏi tàu chạy lúc mấy giờ',
          [['Wann fährt der Zug?', 'Tàu chạy lúc mấy giờ?'], ['Um wie viel Uhr fährt der nächste Zug?', 'Chuyến tiếp theo chạy lúc mấy giờ?']],
          ['wann', 'uhr', 'fährt', 'faehrt'], 'Fragen Sie: Wann fährt der Zug? (Hãy hỏi: Tàu chạy lúc mấy giờ?)'],
        ['Um 9:30 Uhr von Gleis zwei.', 'Lúc 9 giờ 30 từ đường ray số hai.', 'Hỏi có phải đổi tàu không',
          [['Muss ich umsteigen?', 'Tôi có phải đổi tàu không?'], ['Fährt der Zug direkt?', 'Tàu có chạy thẳng không?']],
          ['umsteigen', 'direkt'], 'Fragen Sie: Muss ich umsteigen? (Hãy hỏi: Tôi có phải đổi tàu không?)'],
        ['Nein, der Zug fährt direkt. Gute Reise!', 'Không, tàu chạy thẳng. Chúc thượng lộ bình an!', 'Cảm ơn nhân viên',
          [['Danke schön!', 'Cảm ơn nhiều!'], ['Vielen Dank, tschüss!', 'Cảm ơn nhiều, tạm biệt!']],
          ['danke', 'dank'], 'Bitte schön!']
      ] },
    { id: 'kennenlernen', title: 'Làm quen ở bữa tiệc', description: 'Giới thiệu bản thân, quê quán, nghề nghiệp và sở thích.', topic: 'Giao tiếp',
      npc: { name: 'Sophie', role: 'Bạn mới quen', avatarColor: '#DB2777', initials: 'SO' },
      turns: [
        ['Hallo! Ich bin Sophie. Und wie heißt du?', 'Xin chào! Mình là Sophie. Còn bạn tên là gì?', 'Giới thiệu tên của bạn',
          [['Hallo Sophie, ich heiße Minh.', 'Chào Sophie, mình tên là Minh.'], ['Ich bin Lan. Freut mich!', 'Mình là Lan. Rất vui được gặp bạn!']],
          ['heiße', 'heisse', 'bin', 'name'], 'Wie heißt du? (Bạn tên là gì?)'],
        ['Freut mich! Woher kommst du?', 'Rất vui được gặp bạn! Bạn đến từ đâu?', 'Nói bạn đến từ Việt Nam',
          [['Ich komme aus Vietnam.', 'Mình đến từ Việt Nam.'], ['Aus Vietnam, aus Da Nang.', 'Từ Việt Nam, từ Đà Nẵng.']],
          ['vietnam', 'komme', 'aus'], 'Kommst du aus Vietnam? (Bạn đến từ Việt Nam à?)'],
        ['Cool! Was machst du hier in Deutschland?', 'Hay quá! Bạn làm gì ở Đức?', 'Nói bạn là sinh viên hoặc nói nghề của mình',
          [['Ich bin Studentin. Ich studiere Informatik.', 'Mình là sinh viên. Mình học ngành tin học.'], ['Ich arbeite als Koch.', 'Mình làm đầu bếp.']],
          ['student', 'studiere', 'arbeite', 'bin'], 'Studierst du oder arbeitest du? (Bạn đi học hay đi làm?)'],
        ['Und was machst du gern in der Freizeit?', 'Thế lúc rảnh bạn thích làm gì?', 'Kể một sở thích của bạn',
          [['Ich spiele gern Fußball.', 'Mình thích đá bóng.'], ['Ich lese gern und ich höre Musik.', 'Mình thích đọc sách và nghe nhạc.']],
          ['gern', 'spiele', 'lese', 'höre', 'hoere', 'musik'], 'Was ist dein Hobby? (Sở thích của bạn là gì?)'],
        ['Toll! Wollen wir mal zusammen etwas machen?', 'Tuyệt! Hôm nào mình cùng đi chơi nhé?', 'Nhận lời rủ',
          [['Ja, gern!', 'Có chứ, sẵn lòng!'], ['Gute Idee! Hast du am Samstag Zeit?', 'Ý hay đấy! Thứ Bảy bạn rảnh không?']],
          ['ja', 'gern', 'idee', 'samstag'], 'Ja oder nein? (Có hay không?)']
      ] }
  ];

  const toLine = (de, vi) => ({ de, zh: de, py: '', vi });
  const SCENARIOS = RAW.map(sc => {
    const turns = {};
    sc.turns.forEach((t, i) => {
      const id = `t${i + 1}`;
      turns[id] = {
        id,
        npc: toLine(t[0], t[1]),
        user: {
          goal: t[2],
          answers: t[3].map(a => toLine(a[0], a[1])),
          accept: { anyOf: t[4] },
          next: i + 1 < sc.turns.length ? `t${i + 2}` : null,
          fallback: t[5]
        }
      };
    });
    return {
      id: sc.id, title: sc.title, description: sc.description, topic: sc.topic, difficulty: 'A1',
      npc: Object.assign({ avatarSvg: avatar(sc.npc.avatarColor) }, sc.npc),
      initialTurn: 't1',
      turns
    };
  });

  if (typeof window !== 'undefined') {
    window.DE_TALK_SCENARIOS = SCENARIOS;
    window.TALK_SCENARIOS_DE = SCENARIOS;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = SCENARIOS;
})();
