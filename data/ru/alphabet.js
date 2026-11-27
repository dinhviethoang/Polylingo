/**
 * data/ru/alphabet.js
 * 33 chữ cái Kirin tiếng Nga cho người Việt (PolyLingo tự soạn).
 * Mỗi dòng: Hoa Thường | Latinh | IPA | Cách đọc so với tiếng Việt | loại (v nguyên âm, c phụ âm, s dấu) | bài | từ ví dụ (dấu ́ là trọng âm) | nghĩa | mẹo / bẫy
 * Bài 1: chữ giống Latinh và "bạn giả"; Bài 2: chữ riêng; Bài 3: âm xuýt, tắc xát; Bài 4: nguyên âm mềm, dấu mềm/cứng.
 */
if (typeof window === 'undefined') { global.window = global; }

window.RU_ALPHABET_RAW = `
А а|a|a|như "a" tiếng Việt|v|1|ма́ма|mẹ|Giống chữ A Latinh, đọc y như vậy.
О о|o|o|như "ô" khi có trọng âm, như "a" khi không có trọng âm|v|1|окно́|cửa sổ|Chữ O không mang trọng âm đọc gần thành "a": молоко́ đọc "ma-la-kô".
М м|m|m|như "m"|c|1|мир|thế giới; hòa bình|Giống M Latinh.
Т т|t|t|như "t" (không bật hơi mạnh)|c|1|там|ở đó|Viết thường т trông như chữ m in nghiêng.
К к|k|k|như "c/k"|c|1|ко́шка|con mèo|Giống K Latinh.
Е е|ye|je|như "ye" (i-e); sau phụ âm làm mềm phụ âm|v|1|нет|không|Đầu từ đọc "ye": е́сли → "yê-sli".
В в|v|v|như "v"|c|1|вода́|nước|Bạn giả: trông như B nhưng đọc là V.
Р р|r|r|"r" rung đầu lưỡi|c|1|рука́|bàn tay|Bạn giả: trông như P nhưng đọc là R rung.
С с|s|s|như "x" tiếng Việt|c|1|сок|nước ép|Bạn giả: trông như C nhưng luôn đọc là S.
У у|u|u|như "u"|v|1|у́тро|buổi sáng|Bạn giả: trông như y nhưng đọc là U.
Н н|n|n|như "n"|c|1|нос|cái mũi|Bạn giả: trông như H nhưng đọc là N.
Х х|kh|x|như "kh"|c|1|хлеб|bánh mì|Bạn giả: trông như X nhưng đọc là "kh".
Б б|b|b|như "b"|c|2|брат|anh/em trai|Giống số 6 có mũ.
Г г|g|ɡ|như "g" (gờ)|c|2|го́род|thành phố|Giống chữ Γ Hy Lạp, như cái giá treo.
Д д|d|d|như "đ" nhẹ (đầu lưỡi chạm răng)|c|2|дом|ngôi nhà|Trông như ngôi nhà có chân.
П п|p|p|như "p" (không bật hơi)|c|2|па́па|bố|Hình cái cổng: đọc P.
Л л|l|l|như "l", hơi nặng ở cuối từ|c|2|ла́мпа|đèn|Trông như mái lều chữ Λ.
Ф ф|f|f|như "ph"|c|2|фото|ảnh|Hình người dang hai tay ôm bụng: "ph".
З з|z|z|như "d" miền Bắc (z)|c|2|зо́нт|cái ô|Trông như số 3.
И и|i|i|như "i"|v|2|и́мя|tên|Bạn giả: trông như N ngược nhưng đọc là I.
Й й|y|j|như "i" ngắn, cuối vần "ai, ôi"|c|2|мой|của tôi|И có mũ nhỏ: âm "i" lướt.
Ж ж|zh|ʐ|như "gi" nặng, cong lưỡi (j trong tiếng Pháp)|c|3|жу́рнал|tạp chí|Hình con bọ có nhiều chân, âm "j" kêu vo ve.
Ш ш|sh|ʂ|như "s" cong lưỡi (s miền Nam)|c|3|шко́ла|trường học|Ba cái răng: âm "sh" như suỵt.
Щ щ|shch|ɕː|"s" mềm, dài (như "x" kéo dài, mím cười)|c|3|борщ|canh borsch|Ш có đuôi: mềm hơn và dài hơn ш.
Ч ч|ch|tɕ|như "ch" nhẹ, luôn mềm|c|3|чай|trà|Trông như số 4.
Ц ц|ts|ts|như "ts" (t và x đọc liền)|c|3|центр|trung tâm|Chữ П có đuôi nhỏ: "ts".
Я я|ya|ja|như "ya" (ia); làm mềm phụ âm trước|v|4|я́блоко|quả táo|R lật ngược. Không trọng âm đọc gần "i".
Ю ю|yu|ju|như "yu" (iu)|v|4|юг|phía nam|Cây gậy nối với chữ O: "yu".
Ё ё|yo|jo|như "yô", LUÔN mang trọng âm|v|4|ёлка|cây thông|Hai chấm trên chữ E; sách báo hay bỏ chấm nhưng vẫn đọc "yô".
Э э|e|e|như "e" (không làm mềm)|v|4|э́то|đây là|Chữ E quay ngược: âm "e" mở.
Ы ы|y|ɨ|như "ư" kéo về "i" (miệng cười, lưỡi lùi)|v|4|ты|bạn (thân mật)|Không có trong tiếng Việt: nói "ư" rồi chuyển nhanh sang "i".
Ь ь|'|ʲ|không đọc; làm mềm phụ âm trước|s|4|соль|muối|Dấu mềm: phụ âm trước nó được đọc "mềm", như thêm chút "i".
Ъ ъ|"|-|không đọc; tách phụ âm với nguyên âm sau|s|4|подъе́зд|lối vào nhà|Dấu cứng: hiếm gặp, chỉ ngắt nhẹ trước е, ё, ю, я.
`;

window.RU_SOUND_RULES = [
  { title: 'Trọng âm (ударе́ние)', desc: 'Mỗi từ có một âm tiết đọc mạnh và dài hơn. Trọng âm không cố định, phải học kèm từ. PolyLingo đánh dấu bằng dấu sắc: молоко́.',
    items: ['мо́ре (biển): trọng âm âm tiết đầu', 'окно́ (cửa sổ): trọng âm âm tiết cuối', 'Đặt sai trọng âm có thể đổi nghĩa: за́мок (lâu đài) / замо́к (ổ khóa)'] },
  { title: 'Nhược hóa nguyên âm (а́канье)', desc: 'Nguyên âm không mang trọng âm đọc nhẹ và đổi âm.',
    items: ['О không trọng âm → gần "a": молоко́ đọc "ma-la-kô"', 'Е, Я không trọng âm → gần "i": язы́к đọc "i-zứk", сестра́ đọc "xi-xtra"', 'Hãy nghe nhiều và bắt chước, đừng đọc từng chữ như viết'] },
  { title: 'Phụ âm cứng và mềm', desc: 'Phụ âm đứng trước е, ё, и, ю, я, ь được đọc "mềm": nâng giữa lưỡi lên như chuẩn bị nói "i".',
    items: ['мат (thảm) / мать (mẹ)', 'брат (anh trai) / брать (lấy)', 'Ж, Ш, Ц luôn cứng; Ч, Щ, Й luôn mềm'] },
  { title: 'Vô thanh hóa cuối từ', desc: 'Phụ âm hữu thanh ở cuối từ đọc thành vô thanh tương ứng.',
    items: ['хлеб đọc "khlép"', 'го́род đọc "gô-rat"', 'гара́ж đọc "ga-rás(h)"', 'Cặp: б→п, в→ф, г→к, д→т, ж→ш, з→с'] },
  { title: 'Cụm phụ âm đầu từ', desc: 'Tiếng Nga có nhiều phụ âm liền nhau, người Việt hay chèn thêm nguyên âm. Đọc liền, không thêm "ơ".',
    items: ['здра́вствуйте: đọc "zdrás-tvui-tê" (chữ в đầu tiên không đọc)', 'встре́ча (cuộc gặp): "fstrê-cha"', 'спаси́бо (cảm ơn): "xpa-xi-ba"'] }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RU_ALPHABET_RAW: window.RU_ALPHABET_RAW, RU_SOUND_RULES: window.RU_SOUND_RULES };
}
