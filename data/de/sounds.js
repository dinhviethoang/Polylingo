/**
 * data/de/sounds.js
 * Bảng chữ cái và phát âm tiếng Đức cho người Việt (PolyLingo tự soạn).
 *  - alphabet: 30 chữ (26 chữ Latinh + Ä Ö Ü ß), tên chữ, cách đọc gần đúng bằng tiếng Việt, từ ví dụ
 *  - groups: nhóm âm theo bài 1–3 của Lộ trình, mỗi nhóm có quy tắc, mẹo và từ ví dụ nghe được
 *  - pairs: cặp từ dễ nhầm để luyện nghe phân biệt
 * Cách đọc "gần đúng" chỉ để người mới hình dung; luôn bấm loa nghe giọng đọc tiếng Đức.
 */
if (typeof window === 'undefined') { global.window = global; }

(function () {
  'use strict';

  const E = (w, vi) => ({ w, vi });

  const ALPHABET = [
    { ch: 'A', name: 'a', say: 'a', ex: [E('Apfel', 'quả táo'), E('Name', 'tên')] },
    { ch: 'B', name: 'be', say: 'bê', ex: [E('Buch', 'sách'), E('Brot', 'bánh mì')] },
    { ch: 'C', name: 'ce', say: 'tsê', ex: [E('Computer', 'máy tính'), E('Café', 'quán cà phê')] },
    { ch: 'D', name: 'de', say: 'đê', ex: [E('Dorf', 'làng'), E('danke', 'cảm ơn')] },
    { ch: 'E', name: 'e', say: 'ê', ex: [E('Essen', 'đồ ăn'), E('lesen', 'đọc')] },
    { ch: 'F', name: 'ef', say: 'éf', ex: [E('Fisch', 'cá'), E('Freund', 'bạn')] },
    { ch: 'G', name: 'ge', say: 'ghê', ex: [E('gut', 'tốt'), E('Geld', 'tiền')] },
    { ch: 'H', name: 'ha', say: 'ha', ex: [E('Haus', 'ngôi nhà'), E('Hund', 'con chó')] },
    { ch: 'I', name: 'i', say: 'i', ex: [E('Insel', 'hòn đảo'), E('Kind', 'đứa trẻ')] },
    { ch: 'J', name: 'jot', say: 'giót', ex: [E('ja', 'vâng'), E('Jahr', 'năm')] },
    { ch: 'K', name: 'ka', say: 'ka', ex: [E('Kaffee', 'cà phê'), E('klein', 'nhỏ')] },
    { ch: 'L', name: 'el', say: 'el', ex: [E('Land', 'đất nước'), E('lernen', 'học')] },
    { ch: 'M', name: 'em', say: 'em', ex: [E('Mutter', 'mẹ'), E('Milch', 'sữa')] },
    { ch: 'N', name: 'en', say: 'en', ex: [E('Nacht', 'ban đêm'), E('neu', 'mới')] },
    { ch: 'O', name: 'o', say: 'ô', ex: [E('Obst', 'trái cây'), E('Oma', 'bà')] },
    { ch: 'P', name: 'pe', say: 'pê', ex: [E('Park', 'công viên'), E('Post', 'bưu điện')] },
    { ch: 'Q', name: 'qu', say: 'ku', ex: [E('Quark', 'sữa đông'), E('bequem', 'thoải mái')] },
    { ch: 'R', name: 'er', say: 'e + r cổ họng', ex: [E('Reis', 'gạo'), E('rot', 'đỏ')] },
    { ch: 'S', name: 'es', say: 'és', ex: [E('Sonne', 'mặt trời'), E('Haus', 'nhà')] },
    { ch: 'T', name: 'te', say: 'tê', ex: [E('Tag', 'ngày'), E('Tee', 'trà')] },
    { ch: 'U', name: 'u', say: 'u', ex: [E('Uhr', 'đồng hồ'), E('gut', 'tốt')] },
    { ch: 'V', name: 'vau', say: 'phau', ex: [E('Vater', 'bố'), E('viel', 'nhiều')] },
    { ch: 'W', name: 'we', say: 'vê', ex: [E('Wasser', 'nước'), E('Wetter', 'thời tiết')] },
    { ch: 'X', name: 'ix', say: 'íks', ex: [E('Taxi', 'taxi'), E('Text', 'bài văn')] },
    { ch: 'Y', name: 'ypsilon', say: 'úp-xi-lon', ex: [E('Yoga', 'yoga'), E('Handy', 'điện thoại')] },
    { ch: 'Z', name: 'zet', say: 'tsét', ex: [E('Zeit', 'thời gian'), E('zehn', 'mười')] },
    { ch: 'Ä', name: 'ä', say: 'e', ex: [E('Äpfel', 'những quả táo'), E('Käse', 'phô mai')] },
    { ch: 'Ö', name: 'ö', say: 'ê tròn môi', ex: [E('schön', 'đẹp'), E('Öl', 'dầu')] },
    { ch: 'Ü', name: 'ü', say: 'i tròn môi (gần "uy")', ex: [E('Tür', 'cửa'), E('müde', 'mệt')] },
    { ch: 'ß', name: 'eszett', say: 'és-tsét (đọc như s)', ex: [E('Straße', 'con đường'), E('heiß', 'nóng')] }
  ];

  const GROUPS = [
    // Bài 1: bảng chữ cái và nguyên âm
    { id: 'abc', lesson: 1, title: 'Bảng chữ cái', desc: 'Tiếng Đức dùng 26 chữ Latinh như tiếng Việt và thêm Ä, Ö, Ü, ß. Hãy thuộc tên chữ để đánh vần tên mình (buchstabieren), một việc rất hay gặp ở Đức.',
      items: [
        { sound: 'Đánh vần tên', tip: 'N-G-U-Y-E-N đọc là "en, ghê, u, úp-xi-lon, ê, en".', ex: [E('Wie schreibt man das?', 'Viết cái đó thế nào?'), E('Können Sie das buchstabieren?', 'Ông/bà đánh vần được không?')] },
        { sound: 'Danh từ viết hoa', tip: 'Mọi danh từ đều viết hoa chữ đầu, ở bất kỳ vị trí nào trong câu: das Buch, der Tisch.', ex: [E('Das Buch liegt auf dem Tisch.', 'Quyển sách nằm trên bàn.')] }
      ] },
    { id: 'vowels', lesson: 1, title: 'Nguyên âm dài và ngắn', desc: 'Mỗi nguyên âm a, e, i, o, u có bản dài và bản ngắn. Đọc sai độ dài có thể đổi nghĩa từ.',
      items: [
        { sound: 'Nguyên âm + h, nguyên âm đôi aa/ee/oo → dài', tip: 'Chữ h sau nguyên âm không đọc, chỉ báo hiệu âm dài.', ex: [E('Bahn', 'đường tàu'), E('Tee', 'trà'), E('Boot', 'con thuyền'), E('Uhr', 'đồng hồ')] },
        { sound: 'Trước hai phụ âm (ss, tt, mm, ck…) → ngắn, dứt khoát', tip: 'Như nói nhanh, gọn: Mann, Bett, Sonne.', ex: [E('Mann', 'người đàn ông'), E('Bett', 'giường'), E('Sonne', 'mặt trời'), E('Mutter', 'mẹ')] },
        { sound: 'e cuối từ, -en, -er', tip: '"e" cuối từ đọc nhẹ như "ơ" (bitte = "bít-tơ"); "-er" cuối từ đọc như "ơ" (Vater = "pha-tơ").', ex: [E('bitte', 'làm ơn'), E('Name', 'tên'), E('Vater', 'bố'), E('lernen', 'học')] }
      ] },
    // Bài 2: Umlaut và nguyên âm đôi
    { id: 'umlaut', lesson: 2, title: 'Ä, Ö, Ü', desc: 'Ba nguyên âm có hai chấm (Umlaut). Không gõ được thì viết ae, oe, ue: Mädchen = Maedchen.',
      items: [
        { sound: 'ä', tip: 'Gần như "e" của tiếng Việt.', ex: [E('Käse', 'phô mai'), E('Mädchen', 'cô bé'), E('spät', 'muộn')] },
        { sound: 'ö', tip: 'Đặt lưỡi như đọc "ê" rồi chu tròn môi như đọc "ô".', ex: [E('schön', 'đẹp'), E('hören', 'nghe'), E('Köln', 'thành phố Köln')] },
        { sound: 'ü', tip: 'Đặt lưỡi như đọc "i" rồi chu tròn môi như đọc "u". Gần với "uy" nhưng không trượt âm.', ex: [E('Tür', 'cửa'), E('grün', 'xanh lá'), E('Frühstück', 'bữa sáng')] }
      ] },
    { id: 'diph', lesson: 2, title: 'Nguyên âm đôi', desc: 'Cách viết khác hẳn tiếng Việt, nên học thuộc: ei đọc "ai", ie đọc "i".',
      items: [
        { sound: 'ei, ai → "ai"', tip: 'mein = "main", Mai = "mai".', ex: [E('mein', 'của tôi'), E('Eis', 'kem'), E('zwei', 'hai')] },
        { sound: 'ie → "i" dài', tip: 'Đừng nhầm với ei: Wien (thành phố Viên) đọc "vin", còn Wein (rượu vang) đọc "vain".', ex: [E('Bier', 'bia'), E('vier', 'bốn'), E('Liebe', 'tình yêu')] },
        { sound: 'eu, äu → "oi"', tip: 'heute = "hoi-tơ", Häuser = "hoi-dơ".', ex: [E('heute', 'hôm nay'), E('Freund', 'bạn'), E('Häuser', 'những ngôi nhà')] },
        { sound: 'au → "ao"', tip: 'Haus = "haos".', ex: [E('Haus', 'nhà'), E('Frau', 'phụ nữ'), E('auch', 'cũng')] }
      ] },
    // Bài 3: phụ âm khó
    { id: 'ch', lesson: 3, title: 'ch, sch, st, sp', desc: 'Những tổ hợp phụ âm người Việt hay đọc sai nhất.',
      items: [
        { sound: 'ch sau a, o, u, au', tip: 'Âm khàn trong cổ họng, gần "kh" tiếng Việt.', ex: [E('Buch', 'sách'), E('acht', 'tám'), E('auch', 'cũng')] },
        { sound: 'ch sau e, i, ä, ö, ü, ei, eu và sau l, n, r', tip: 'Âm xì nhẹ ở giữa lưỡi, như "h" khi cười khẽ "hì". ich ≠ "ích".', ex: [E('ich', 'tôi'), E('Milch', 'sữa'), E('Küche', 'nhà bếp')] },
        { sound: 'sch', tip: 'Như "s" uốn lưỡi, môi chu ra (giống "sh" tiếng Anh).', ex: [E('Schule', 'trường học'), E('Tasche', 'túi'), E('schön', 'đẹp')] },
        { sound: 'st, sp ở đầu từ', tip: 'Đọc thành "sht", "shp": Straße, sprechen. Ở giữa hay cuối từ thì đọc bình thường: Fenster.', ex: [E('Straße', 'con đường'), E('sprechen', 'nói'), E('Stadt', 'thành phố')] }
      ] },
    { id: 'cons', lesson: 3, title: 'z, w, v, s, r, j và âm cuối', desc: 'Chữ quen thuộc nhưng đọc khác tiếng Việt.',
      items: [
        { sound: 'z → "ts"', tip: 'zehn = "tsên", Zeit = "tsai".', ex: [E('zehn', 'mười'), E('Zeit', 'thời gian'), E('Zug', 'tàu hỏa')] },
        { sound: 'w → "v", v → "f"', tip: 'Wasser = "va-xơ", Vater = "pha-tơ".', ex: [E('Wasser', 'nước'), E('wohnen', 'sống'), E('Vater', 'bố'), E('viel', 'nhiều')] },
        { sound: 's trước nguyên âm → "z"', tip: 'Sonne, lesen: s rung như "z". Còn ss và ß luôn là "s" trong.', ex: [E('Sonne', 'mặt trời'), E('lesen', 'đọc'), E('heiß', 'nóng'), E('Wasser', 'nước')] },
        { sound: 'r', tip: 'Đầu từ: rung nhẹ trong cổ họng, như súc miệng nhẹ. Sau nguyên âm và cuối từ: gần như "ơ".', ex: [E('rot', 'đỏ'), E('Reis', 'gạo'), E('hier', 'ở đây'), E('Uhr', 'đồng hồ')] },
        { sound: 'j → "i" ngắn (như "d" miền Nam)', tip: 'ja = "da" (giọng Nam), Jahr = "dar".', ex: [E('ja', 'vâng'), E('jung', 'trẻ'), E('Jacke', 'áo khoác')] },
        { sound: 'b, d, g cuối từ → p, t, k; -ig → "ích"', tip: 'Tag = "ták", Hund = "hunt", gelb = "ghelp", billig = "bí-lích".', ex: [E('Tag', 'ngày'), E('Hund', 'con chó'), E('gelb', 'vàng'), E('billig', 'rẻ')] },
        { sound: 'qu → "kv", pf, tsch', tip: 'bequem = "bơ-kvêm", Apfel = "áp-phơl", Deutsch = "đoi-ch".', ex: [E('bequem', 'thoải mái'), E('Apfel', 'táo'), E('Deutsch', 'tiếng Đức')] }
      ] },
    { id: 'stress', lesson: 3, title: 'Trọng âm và ngữ điệu', desc: 'Từ thuần Đức nhấn âm tiết đầu; từ có tiền tố be-, ge-, er-, ver- không nhấn tiền tố. Câu hỏi có/không lên giọng cuối câu, câu hỏi W- xuống giọng.',
      items: [
        { sound: 'Nhấn âm tiết đầu', tip: 'ARbeiten, FAmilie… nhưng verSTEhen, beZAHlen.', ex: [E('arbeiten', 'làm việc'), E('verstehen', 'hiểu'), E('bezahlen', 'trả tiền')] },
        { sound: 'Ngữ điệu câu hỏi', tip: '"Kommst du?" lên giọng; "Woher kommst du?" xuống giọng.', ex: [E('Kommst du aus Vietnam?', 'Bạn đến từ Việt Nam à?'), E('Woher kommst du?', 'Bạn đến từ đâu?')] }
      ] }
  ];

  // Cặp từ dễ nhầm để luyện nghe: [từ 1, nghĩa 1, từ 2, nghĩa 2, âm cần phân biệt]
  const PAIRS = [
    ['schon', 'đã, rồi', 'schön', 'đẹp', 'o / ö'],
    ['Mutter', 'mẹ', 'Mütter', 'những người mẹ', 'u / ü'],
    ['Bruder', 'anh em trai', 'Brüder', 'các anh em trai', 'u / ü'],
    ['vier', 'bốn', 'für', 'cho', 'ie / ü'],
    ['Stadt', 'thành phố', 'Staat', 'nhà nước', 'a ngắn / a dài'],
    ['Ofen', 'lò', 'offen', 'mở', 'o dài / o ngắn'],
    ['bieten', 'mời, đưa ra', 'bitten', 'xin, nhờ', 'ie dài / i ngắn'],
    ['Wein', 'rượu vang', 'Wien', 'thành phố Viên', 'ei / ie'],
    ['Tasche', 'cái túi', 'Tasse', 'cái tách', 'sch / ss'],
    ['Kirche', 'nhà thờ', 'Kirsche', 'quả anh đào', 'ch / sch'],
    ['lesen', 'đọc', 'lösen', 'giải', 'e / ö'],
    ['fühlen', 'cảm thấy', 'füllen', 'đổ đầy', 'ü dài / ü ngắn'],
    ['Bach', 'con suối', 'Bauch', 'bụng', 'a / au'],
    ['zehn', 'mười', 'sehen', 'nhìn', 'z / s']
  ];

  const SOUNDS = { alphabet: ALPHABET, groups: GROUPS, pairs: PAIRS };

  if (typeof window !== 'undefined') window.DE_SOUNDS = SOUNDS;
  if (typeof module !== 'undefined' && module.exports) module.exports = SOUNDS;
})();
