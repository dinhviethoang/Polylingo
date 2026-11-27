/**
 * data/ru/curriculum.js — Lộ trình 35 bài tiếng Nga: 6 bài chữ cái và ngữ âm, 29 bài A1 (khung ТРКИ A1).
 * Từ vựng của từng bài nằm trong data/ru/words-a.js và words-b.js (dòng "#L<số>").
 * Ví dụ ngữ pháp: [câu tiếng Nga, nghĩa]. PolyLingo tự soạn.
 */
if (typeof window === 'undefined') { global.window = global; }

window.RU_CURRICULUM = {
  passPercent: 60,
  checkpointPercent: 80,
  stages: [
    { id: 'alpha', title: 'Chặng 0: Chữ Kirin và phát âm', range: [1, 6] },
    { id: 'a1', title: 'Chặng 1: Sơ cấp A1', range: [7, 35] }
  ],
  lessons: [
    { no: 1, title: 'Chữ quen mặt và "bạn giả"', goal: 'Đọc 12 chữ giống chữ Latinh, nhớ 6 chữ trông quen nhưng đọc khác (В, Р, С, У, Н, Х).', alpha: { groups: [1] } },
    { no: 2, title: 'Chữ riêng của tiếng Nga', goal: 'Đọc Б, Г, Д, П, Л, Ф, З, И, Й và ghép thành từ ngắn.', alpha: { groups: [2] } },
    { no: 3, title: 'Âm xuýt Ж, Ш, Щ, Ч, Ц', goal: 'Phân biệt ж/ш, ш/щ, ч/ц khi nghe và đọc.', alpha: { groups: [3] } },
    { no: 4, title: 'Nguyên âm mềm và dấu mềm, dấu cứng', goal: 'Đọc Я, Ю, Ё, Э, Ы; hiểu Ь làm mềm phụ âm, Ъ tách âm.', alpha: { groups: [4] } },
    { no: 5, title: 'Trọng âm và nhược hóa nguyên âm', goal: 'Đọc đúng trọng âm, biết О không trọng âm đọc gần "a", Е/Я gần "i".', alpha: { groups: [1, 2], rules: [0, 1, 3] } },
    { no: 6, title: 'Phụ âm cứng, mềm và ôn chữ cái', goal: 'Phân biệt мат/мать, đọc cụm phụ âm đầu từ, ôn toàn bộ 33 chữ.', alpha: { groups: [1, 2, 3, 4], rules: [2, 4] }, checkpoint: true },
    { no: 7, title: 'Chào hỏi và làm quen', goal: 'Chào hỏi lịch sự và thân mật, giới thiệu tên, hỏi tên người khác.',
      grammar: [
        { p: 'Здравствуйте / Привет', vi: 'Здравствуйте dùng với người lạ, người lớn tuổi hoặc nhiều người; Привет dùng với bạn bè.', ex: [['Здравствуйте, Иван Петрович!', 'Chào bác Ivan Petrovich!'], ['Привет, Маша!', 'Chào Masha!']] },
        { p: 'Меня зовут… / Как вас зовут?', vi: 'Nghĩa đen "Người ta gọi tôi là…". Hỏi lịch sự dùng вас, thân mật dùng тебя.', ex: [['Меня зовут Лан.', 'Tôi tên là Lan.'], ['Как тебя зовут?', 'Bạn tên gì?']] },
        { p: 'Câu "A là B" không cần động từ', vi: 'Thì hiện tại tiếng Nga bỏ động từ "là". Viết có gạch ngang khi cả hai vế là danh từ.', ex: [['Я студент.', 'Tôi là sinh viên.'], ['Москва — столица России.', 'Moskva là thủ đô nước Nga.']] }
      ] },
    { no: 8, title: 'Ai đây? Cái gì đây?', goal: 'Hỏi và trả lời Кто это? Что это?, dùng 8 đại từ nhân xưng.',
      grammar: [
        { p: 'Кто это? / Что это?', vi: 'Кто hỏi người và con vật, что hỏi đồ vật. Это không đổi theo giống.', ex: [['Кто это? — Это мой друг.', 'Đây là ai? — Đây là bạn tôi.'], ['Что это? — Это стол.', 'Đây là gì? — Đây là cái bàn.']] },
        { p: 'Đại từ я, ты, он, она, оно, мы, вы, они', vi: 'Ты dùng với một người thân; вы dùng với nhiều người hoặc để lịch sự. Он/она/оно thay cho danh từ theo giống.', ex: [['Где книга? — Вот она.', 'Sách đâu? — Nó đây.'], ['Вы студенты?', 'Các bạn là sinh viên à?']] },
        { p: 'Câu hỏi có/không', vi: 'Giữ nguyên trật tự câu, chỉ lên giọng ở từ được hỏi.', ex: [['Это Анна?', 'Đây là Anna à?'], ['Ты дома?', 'Cậu ở nhà à?']] }
      ] },
    { no: 9, title: 'Ba giống của danh từ', goal: 'Nhận biết giống đực, cái, trung qua chữ cái cuối của danh từ.',
      grammar: [
        { p: 'Giống đực: phụ âm, -й (và một số -ь)', vi: 'дом, музей, словарь. Từ chỉ nam giới kết thúc bằng -а/-я vẫn là giống đực: папа, дядя.', ex: [['Это мой дом.', 'Đây là nhà tôi.'], ['Мой папа дома.', 'Bố tôi ở nhà.']] },
        { p: 'Giống cái: -а, -я (và một số -ь)', vi: 'комната, кухня, дверь, ночь. Danh từ đuôi -ь phải học kèm giống.', ex: [['Это моя комната.', 'Đây là phòng tôi.'], ['Дверь там.', 'Cửa ở đó.']] },
        { p: 'Giống trung: -о, -е, -мя', vi: 'окно, море, имя, время. Từ mượn không biến đổi như кафе, метро, такси thường là giống trung (кофе là giống đực).', ex: [['Это моё окно.', 'Đây là cửa sổ của tôi.'], ['Какое красивое имя!', 'Tên đẹp quá!']] }
      ] },
    { no: 10, title: 'Danh từ số nhiều', goal: 'Lập số nhiều bằng -ы, -и, -а và nhớ các dạng bất quy tắc.', checkpoint: true,
      grammar: [
        { p: '-ы / -и', vi: 'Giống đực phụ âm thêm -ы; -а đổi thành -ы; -я, -й, -ь đổi thành -и. Sau г, к, х, ж, ш, ч, щ luôn viết -и.', ex: [['журнал → журналы, газета → газеты', 'tạp chí, tờ báo'], ['книга → книги, ключ → ключи', 'sách, chìa khóa']] },
        { p: 'Giống trung: -о → -а, -е → -я', vi: 'окно → окна, море → моря. Trọng âm hay dịch chuyển.', ex: [['слово → слова', 'từ'], ['яблоко → яблоки (ngoại lệ)', 'quả táo']] },
        { p: 'Bất quy tắc', vi: 'человек → люди, ребёнок → дети, друг → друзья, брат → братья, город → города.', ex: [['Это мои друзья.', 'Đây là các bạn tôi.'], ['Дети в парке.', 'Bọn trẻ ở công viên.']] }
      ] },
    { no: 11, title: 'Của ai? Đại từ sở hữu', goal: 'Dùng мой, твой, наш, ваш hòa hợp giống với danh từ; его, её, их không đổi.',
      grammar: [
        { p: 'мой / моя / моё / мои', vi: 'Đại từ sở hữu đổi theo giống và số của vật được sở hữu, không theo người sở hữu.', ex: [['мой брат, моя сестра, моё письмо, мои родители', 'anh tôi, chị tôi, thư của tôi, bố mẹ tôi'], ['наш дом, наша школа', 'nhà chúng tôi, trường chúng tôi']] },
        { p: 'его, её, их không biến đổi', vi: 'Của anh ấy, của cô ấy, của họ: dùng nguyên dạng với mọi danh từ.', ex: [['Это его машина.', 'Đây là ô tô của anh ấy.'], ['Это их дети.', 'Đây là con của họ.']] },
        { p: 'Чей? Чья? Чьё? Чьи?', vi: 'Câu hỏi "của ai" cũng đổi theo giống của vật.', ex: [['Чья это сумка? — Моя.', 'Túi này của ai? — Của tôi.'], ['Чьи это ключи?', 'Chìa khóa này của ai?']] }
      ] },
    { no: 12, title: 'Động từ nhóm I', goal: 'Chia thì hiện tại các động từ đuôi -ать, -ять: читать, знать, делать.',
      grammar: [
        { p: 'Đuôi nhóm I: -ю, -ешь, -ет, -ем, -ете, -ют', vi: 'Bỏ -ть rồi thêm đuôi: читать → я читаю, ты читаешь, он читает, мы читаем, вы читаете, они читают.', ex: [['Я читаю, а ты?', 'Tôi đọc, còn cậu?'], ['Мы знаем.', 'Chúng tôi biết.']] },
        { p: 'Động từ nhóm I có gốc thay đổi', vi: 'жить → живу, живёшь; писать → пишу, пишешь; пить → пью, пьёшь. Có trọng âm ở đuôi thì -е- thành -ё-.', ex: [['Где ты живёшь?', 'Cậu sống ở đâu?'], ['Что ты пишешь?', 'Cậu đang viết gì?']] },
        { p: 'Trạng từ tần suất', vi: 'всегда, часто, иногда, сейчас thường đứng trước động từ.', ex: [['Я часто слушаю музыку.', 'Tôi hay nghe nhạc.'], ['Сейчас он работает.', 'Bây giờ anh ấy đang làm việc.']] }
      ] },
    { no: 13, title: 'Động từ nhóm II', goal: 'Chia thì hiện tại các động từ đuôi -ить, -еть: говорить, смотреть, любить.',
      grammar: [
        { p: 'Đuôi nhóm II: -ю/-у, -ишь, -ит, -им, -ите, -ят/-ат', vi: 'говорить → говорю, говоришь, говорит, говорим, говорите, говорят.', ex: [['Вы говорите по-русски?', 'Anh nói tiếng Nga chứ?'], ['Они смотрят фильм.', 'Họ xem phim.']] },
        { p: 'Biến âm ở ngôi я', vi: 'Một số phụ âm đổi ở ngôi я: видеть → вижу, любить → люблю, готовить → готовлю, платить → плачу.', ex: [['Я вижу тебя.', 'Tôi thấy cậu.'], ['Я люблю кофе.', 'Tôi thích cà phê.']] },
        { p: 'Động từ phản thân -ся', vi: 'Thêm -ся sau phụ âm, -сь sau nguyên âm: учусь, учишься, учится, учимся, учитесь, учатся.', ex: [['Я учусь в университете.', 'Tôi học đại học.'], ['Где вы учитесь?', 'Anh học ở đâu?']] }
      ] },
    { no: 14, title: 'Ở đâu? Cách 6 với в và на', goal: 'Trả lời Где? bằng в/на + cách 6 (giới cách): в Москве, на работе.',
      grammar: [
        { p: 'Đuôi cách 6: -е', vi: 'Hầu hết danh từ thêm hoặc đổi đuôi thành -е: парк → в парке, школа → в школе, море → на море.', ex: [['Я живу в Москве.', 'Tôi sống ở Moskva.'], ['Мама в магазине.', 'Mẹ đang ở cửa hàng.']] },
        { p: 'Đuôi -и', vi: 'Danh từ cái đuôi -ь và danh từ đuôi -ия, -ие đổi thành -и: площадь → на площади, Россия → в России, здание → в здании.', ex: [['Мы на площади.', 'Chúng tôi ở quảng trường.'], ['Я был в России.', 'Tôi đã ở Nga.']] },
        { p: 'в hay на?', vi: 'в: bên trong không gian kín (в школе, в городе). на: nơi mở, sự kiện, một số nơi cố định (на работе, на почте, на заводе, на вокзале, на улице).', ex: [['Папа на работе.', 'Bố đang ở chỗ làm.'], ['Дети в парке.', 'Bọn trẻ ở công viên.']] }
      ] },
    { no: 15, title: 'Đi bằng gì? на + phương tiện', goal: 'Nói đi bằng phương tiện gì: ехать на автобусе, на метро; đi bộ là пешком.', checkpoint: true,
      grammar: [
        { p: 'ехать на + cách 6', vi: 'Phương tiện đi với на và cách 6: на автобусе, на поезде, на машине. Từ không biến đổi giữ nguyên: на метро, на такси.', ex: [['Я еду на автобусе.', 'Tôi đi xe buýt.'], ['Мы едем на метро.', 'Chúng tôi đi tàu điện ngầm.']] },
        { p: 'Chia động từ ехать', vi: 'еду, едешь, едет, едем, едете, едут. Dùng khi đang đi bằng xe theo một hướng.', ex: [['Куда ты едешь?', 'Cậu đi đâu đấy?'], ['Они едут домой.', 'Họ đang về nhà.']] },
        { p: 'Chỉ đường đơn giản', vi: 'прямо (thẳng), налево (bên trái), направо (bên phải), рядом (ngay cạnh), далеко / близко (xa / gần).', ex: [['Идите прямо, потом налево.', 'Đi thẳng rồi rẽ trái.'], ['Метро близко.', 'Ga tàu ở gần.']] }
      ] },
    { no: 16, title: 'Nghề nghiệp, quốc tịch, ngôn ngữ', goal: 'Nói nghề nghiệp, quốc tịch và hỏi Вы говорите по-русски?',
      grammar: [
        { p: 'Nghề và quốc tịch có dạng nam/nữ', vi: 'студент / студентка, вьетнамец / вьетнамка, учитель / учительница. Nhiều nghề chỉ có một dạng: врач, инженер.', ex: [['Он вьетнамец, а она русская.', 'Anh ấy là người Việt, còn cô ấy là người Nga.'], ['Моя мама врач.', 'Mẹ tôi là bác sĩ.']] },
        { p: 'говорить по-русски / знать русский язык', vi: 'Sau говорить, понимать dùng trạng từ по-русски. Sau знать, изучать dùng danh từ русский язык.', ex: [['Я немного говорю по-русски.', 'Tôi nói được chút tiếng Nga.'], ['Я изучаю русский язык.', 'Tôi học tiếng Nga.']] },
        { p: 'Кем вы работаете?', vi: 'Hỏi nghề lịch sự. Trả lời ngắn: Я инженер. (Cách 5 học ở bài 33.)', ex: [['Кто вы по профессии? — Я журналист.', 'Anh làm nghề gì? — Tôi là nhà báo.'], ['Вы русский? — Нет, я вьетнамец.', 'Anh là người Nga à? — Không, tôi là người Việt.']] }
      ] },
    { no: 17, title: 'Tính từ và màu sắc', goal: 'Hỏi Какой?, chia tính từ theo giống và số: новый дом, новая книга.',
      grammar: [
        { p: 'Đuôi tính từ: -ый/-ой/-ий, -ая, -ое, -ые', vi: 'новый дом, новая квартира, новое окно, новые дома. Tính từ đứng trước danh từ và hòa hợp với nó.', ex: [['Это красивая машина.', 'Đây là ô tô đẹp.'], ['Это новые журналы.', 'Đây là những tạp chí mới.']] },
        { p: 'Quy tắc chính tả sau г, к, х, ж, ш, ч, щ', vi: 'Sau các chữ này viết -и chứ không viết -ы: русский, маленькие, хорошие.', ex: [['хороший день, хорошая погода', 'ngày đẹp, thời tiết đẹp'], ['маленький — маленькие', 'nhỏ (số ít — số nhiều)']] },
        { p: 'Какой? Какая? Какое? Какие?', vi: 'Câu hỏi cũng đổi giống theo danh từ.', ex: [['Какая сегодня погода?', 'Hôm nay thời tiết thế nào?'], ['Какой это город?', 'Đây là thành phố gì?']] }
      ] },
    { no: 18, title: 'Đối cách: tân ngữ là đồ vật', goal: 'Dùng cách 4 cho tân ngữ là đồ vật: Я читаю книгу, Я люблю чай.',
      grammar: [
        { p: 'Giống cái: -а → -у, -я → -ю', vi: 'Chỉ danh từ giống cái đuôi -а/-я thay đổi: книга → книгу, рыба → рыбу.', ex: [['Я читаю книгу.', 'Tôi đọc sách.'], ['Мама готовит рыбу.', 'Mẹ nấu cá.']] },
        { p: 'Đồ vật giống đực, trung, số nhiều: giữ nguyên', vi: 'Tân ngữ là đồ vật không phải giống cái thì giống y nguyên dạng gốc.', ex: [['Я люблю чай.', 'Tôi thích trà.'], ['Я покупаю хлеб и молоко.', 'Tôi mua bánh mì và sữa.']] },
        { p: 'Tính từ đi kèm', vi: 'Giống cái: -ую. Các giống khác (đồ vật) giữ nguyên.', ex: [['Я читаю интересную книгу.', 'Tôi đọc một cuốn sách hay.'], ['Я пью зелёный чай.', 'Tôi uống trà xanh.']] }
      ] },
    { no: 19, title: 'Đối cách: tân ngữ là người, con vật', goal: 'Dùng cách 4 cho người và con vật giống đực: Я знаю этого преподавателя.',
      grammar: [
        { p: 'Giống đực chỉ người, con vật: -а / -я', vi: 'брат → брата, друг → друга, учитель → учителя, кот → кота.', ex: [['Я жду брата.', 'Tôi đợi anh trai.'], ['Я знаю этого преподавателя.', 'Tôi biết thầy giáo này.']] },
        { p: 'Giống cái chỉ người vẫn -у / -ю', vi: 'мама → маму, сестра → сестру, Таня → Таню.', ex: [['Я люблю маму.', 'Tôi yêu mẹ.'], ['Мы встречаем сестру.', 'Chúng tôi đi đón chị gái.']] },
        { p: 'Đại từ ở cách 4', vi: 'меня, тебя, его, её, нас, вас, их.', ex: [['Я тебя люблю.', 'Anh yêu em.'], ['Ты меня понимаешь?', 'Cậu hiểu tôi chứ?']] }
      ] },
    { no: 20, title: 'Đi bộ hay đi xe: идти и ехать', goal: 'Phân biệt идти (đi bộ) và ехать (đi xe) khi đang đi theo một hướng.', checkpoint: true,
      grammar: [
        { p: 'идти: иду, идёшь, идут', vi: 'Đi bộ, đang trên đường, một hướng. Quá khứ bất quy tắc: шёл, шла, шли.', ex: [['Я иду в школу.', 'Tôi đang đi bộ đến trường.'], ['Куда ты идёшь?', 'Cậu đi đâu thế?']] },
        { p: 'ехать: еду, едешь, едут', vi: 'Đi bằng phương tiện, một hướng.', ex: [['Я еду в Москву на поезде.', 'Tôi đi tàu đến Moskva.'], ['Мы едем домой.', 'Chúng tôi đang về nhà (bằng xe).']] },
        { p: 'Где? — Куда? — Откуда?', vi: 'Где hỏi vị trí (cách 6), куда hỏi hướng đến (cách 4), откуда hỏi nơi xuất phát.', ex: [['Где ты? — Я дома.', 'Cậu ở đâu? — Ở nhà.'], ['Куда ты идёшь? — Домой.', 'Cậu đi đâu? — Về nhà.']] }
      ] },
    { no: 21, title: 'Đi thường xuyên: ходить и ездить', goal: 'Dùng ходить/ездить cho đi nhiều lần, có thói quen, đi rồi về.',
      grammar: [
        { p: 'идти / ходить, ехать / ездить', vi: 'Cặp đầu: một hướng, đang đi. Cặp sau: nhiều lần, thói quen, hoặc đi rồi về.', ex: [['Сейчас я иду в бассейн.', 'Bây giờ tôi đang đi bể bơi.'], ['Я хожу в бассейн каждую среду.', 'Thứ Tư nào tôi cũng đi bơi.']] },
        { p: 'в + ngày trong tuần (cách 4)', vi: 'в понедельник, во вторник, в среду, в пятницу, в субботу, в воскресенье.', ex: [['В субботу мы ездим на дачу.', 'Thứ Bảy chúng tôi hay đi nhà nghỉ ngoại ô.'], ['Во вторник у меня урок.', 'Thứ Ba tôi có tiết học.']] },
        { p: 'каждый день, обычно, редко, никогда не', vi: 'Từ chỉ tần suất đi với ходить, ездить. никогда luôn đi kèm не.', ex: [['Я никогда не езжу на такси.', 'Tôi không bao giờ đi taxi.'], ['Обычно я хожу пешком.', 'Tôi thường đi bộ.']] }
      ] },
    { no: 22, title: 'Đi đâu? Cách 4 chỉ hướng', goal: 'Trả lời Куда? bằng в/на + cách 4: в магазин, на почту, в кино.',
      grammar: [
        { p: 'Куда? в/на + cách 4', vi: 'Đi tới đâu dùng cách 4: в школу, в театр, на концерт, на почту. Chọn в hay на giống như ở bài 14.', ex: [['Мы идём в театр.', 'Chúng tôi đi nhà hát.'], ['Я иду на почту.', 'Tôi đi bưu điện.']] },
        { p: 'Где? và Куда? khác đuôi', vi: 'Где? в школе (cách 6) — Куда? в школу (cách 4). Где? в театре — Куда? в театр.', ex: [['Я в кино. Я иду в кино.', 'Tôi ở rạp. Tôi đi rạp.'], ['Он на работе. Он едет на работу.', 'Anh ấy ở chỗ làm. Anh ấy đi làm.']] },
        { p: 'Rủ rê: Давай пойдём…', vi: 'Давай (với bạn) / Давайте (lịch sự) + пойдём/поедем: chúng ta cùng đi nhé.', ex: [['Давай пойдём в кино!', 'Đi xem phim đi!'], ['Давайте поедем на экскурсию.', 'Chúng ta đi tham quan nhé.']] }
      ] },
    { no: 23, title: 'Tôi có: у меня есть', goal: 'Nói sở hữu với у + cách 2 + есть: У меня есть брат.',
      grammar: [
        { p: 'у меня / у тебя / у него / у неё / у нас / у вас / у них', vi: 'Nghĩa đen "ở chỗ tôi có". Người sở hữu ở cách 2, vật sở hữu ở cách 1.', ex: [['У меня есть машина.', 'Tôi có ô tô.'], ['У вас есть вопросы?', 'Các bạn có câu hỏi không?']] },
        { p: 'Đuôi cách 2 số ít của danh từ', vi: 'Đực/trung: -а/-я (брат → брата, словарь → словаря). Cái: -ы/-и (сестра → сестры, Таня → Тани).', ex: [['У брата есть компьютер.', 'Anh trai có máy tính.'], ['У сестры есть собака.', 'Chị gái có con chó.']] },
        { p: 'Bỏ есть khi nói về đặc điểm', vi: 'Khi đã biết là có, chỉ nói tính chất thì bỏ есть.', ex: [['У неё голубые глаза.', 'Cô ấy có mắt xanh.'], ['У меня большая семья.', 'Gia đình tôi đông người.']] }
      ] },
    { no: 24, title: 'Tôi không có: у меня нет', goal: 'Phủ định sở hữu bằng нет + cách 2: нет времени, нет денег.',
      grammar: [
        { p: 'нет + cách 2', vi: 'Vật không có chuyển sang cách 2: брат → нет брата, машина → нет машины, время → нет времени.', ex: [['У меня нет времени.', 'Tôi không có thời gian.'], ['У нас нет машины.', 'Chúng tôi không có ô tô.']] },
        { p: 'Vắng mặt: кого нет?', vi: 'Nói ai đó không có ở đâu cũng dùng нет + cách 2.', ex: [['Мамы нет дома.', 'Mẹ không có nhà.'], ['Сегодня нет урока.', 'Hôm nay không có tiết học.']] },
        { p: 'У меня болит…', vi: 'Tôi bị đau ở đâu: болит + số ít, болят + số nhiều.', ex: [['У меня болит голова.', 'Tôi đau đầu.'], ['У меня болят ноги.', 'Tôi đau chân.']] }
      ] },
    { no: 25, title: 'Số đếm 1–100 và tiền', goal: 'Đếm đến 100, hỏi giá Сколько стоит?, nói đúng рубль / рубля / рублей.', checkpoint: true,
      grammar: [
        { p: '1 — cách 1, 2–4 — cách 2 số ít, 5–20 — cách 2 số nhiều', vi: 'один рубль, два рубля, пять рублей. Từ 21 trở đi theo chữ số cuối: двадцать один рубль, двадцать два рубля.', ex: [['Это стоит пять рублей.', 'Cái này giá năm rúp.'], ['У меня два брата.', 'Tôi có hai anh trai.']] },
        { p: 'один / одна / одно, два / две', vi: 'Số 1 và 2 đổi theo giống: одна книга, две книги, одно окно.', ex: [['Одна чашка кофе, пожалуйста.', 'Cho một tách cà phê.'], ['Две сестры.', 'Hai chị em gái.']] },
        { p: 'Сколько стоит? / Сколько стоят?', vi: 'стоит cho một vật, стоят cho nhiều vật.', ex: [['Сколько стоит этот торт?', 'Cái bánh này bao nhiêu?'], ['Сколько стоят яблоки?', 'Táo bao nhiêu tiền?']] }
      ] },
    { no: 26, title: 'Thì quá khứ', goal: 'Chia quá khứ theo giống và số: -л, -ла, -ло, -ли; quá khứ của быть.',
      grammar: [
        { p: 'Bỏ -ть, thêm -л / -ла / -ло / -ли', vi: 'Quá khứ đổi theo giống của chủ ngữ, không theo ngôi: он читал, она читала, они читали.', ex: [['Вчера я читал (читала) книгу.', 'Hôm qua tôi (nam/nữ) đọc sách.'], ['Мы смотрели фильм.', 'Chúng tôi đã xem phim.']] },
        { p: 'был, была, было, были', vi: 'Quá khứ của быть, dùng cho "đã ở", "đã là", "đã có".', ex: [['Вчера я был в театре.', 'Hôm qua tôi ở nhà hát.'], ['Погода была хорошая.', 'Thời tiết đã đẹp.']] },
        { p: 'Bất quy tắc thường gặp', vi: 'идти → шёл, шла; мочь → мог, могла; есть → ел, ела; помочь → помог.', ex: [['Он шёл домой.', 'Anh ấy đang đi về nhà.'], ['Я не мог прийти.', 'Tôi đã không thể đến.']] }
      ] },
    { no: 27, title: 'Thì tương lai', goal: 'Nói kế hoạch bằng tương lai phức (буду читать) và tương lai đơn (прочитаю).',
      grammar: [
        { p: 'буду, будешь, будет, будем, будете, будут + nguyên mẫu', vi: 'Tương lai phức dùng với động từ thể chưa hoàn thành: hành động kéo dài, lặp lại.', ex: [['Завтра я буду работать.', 'Mai tôi sẽ làm việc.'], ['Летом мы будем отдыхать.', 'Mùa hè chúng tôi sẽ nghỉ ngơi.']] },
        { p: 'Tương lai đơn của động từ hoàn thành', vi: 'Chia động từ thể hoàn thành như hiện tại nhưng nghĩa là tương lai, nhấn kết quả.', ex: [['Я куплю хлеб.', 'Tôi sẽ mua bánh mì.'], ['Я позвоню тебе вечером.', 'Tối tôi sẽ gọi cho cậu.']] },
        { p: 'будет + danh từ', vi: 'Nói sự kiện, thời tiết sắp tới.', ex: [['Завтра будет дождь.', 'Mai trời sẽ mưa.'], ['В субботу будет концерт.', 'Thứ Bảy sẽ có buổi hòa nhạc.']] }
      ] },
    { no: 28, title: 'Cho ai? Cách 3', goal: 'Dùng cách 3 cho người nhận: Я звоню маме, подарок другу.',
      grammar: [
        { p: 'Đuôi cách 3: -у/-ю (đực, trung), -е/-и (cái)', vi: 'брат → брату, учитель → учителю, мама → маме, тётя → тёте, мать → матери.', ex: [['Я звоню маме.', 'Tôi gọi điện cho mẹ.'], ['Я дарю брату книгу.', 'Tôi tặng anh trai cuốn sách.']] },
        { p: 'Đại từ cách 3', vi: 'мне, тебе, ему, ей, нам, вам, им.', ex: [['Дай мне, пожалуйста.', 'Đưa tôi với.'], ['Я помогаю ему.', 'Tôi giúp anh ấy.']] },
        { p: 'к + cách 3, по + cách 3', vi: 'к: đến chỗ ai (иду к врачу). по: dọc theo, qua phương tiện (по городу, по телефону).', ex: [['Я иду к другу.', 'Tôi đến nhà bạn.'], ['Мы говорим по телефону.', 'Chúng tôi nói chuyện qua điện thoại.']] }
      ] },
    { no: 29, title: 'Mình thấy thế nào: мне холодно, мне нравится', goal: 'Dùng cách 3 trong câu vô nhân xưng chỉ cảm giác và нравиться.',
      grammar: [
        { p: 'Ai (cách 3) + trạng từ', vi: 'Мне холодно, тебе весело, ему скучно. Không có chủ ngữ cách 1.', ex: [['Мне холодно.', 'Tôi thấy lạnh.'], ['Нам было весело.', 'Chúng tôi đã rất vui.']] },
        { p: 'Мне нравится / нравятся', vi: 'Người thích ở cách 3, vật được thích là chủ ngữ: нравится (số ít), нравятся (số nhiều).', ex: [['Мне нравится этот город.', 'Tôi thích thành phố này.'], ['Ей нравятся цветы.', 'Cô ấy thích hoa.']] },
        { p: 'нужно, надо, можно, нельзя + nguyên mẫu', vi: 'Cần, phải, được phép, không được.', ex: [['Мне нужно идти.', 'Tôi phải đi rồi.'], ['Здесь нельзя курить.', 'Ở đây không được hút thuốc.']] }
      ] },
    { no: 30, title: 'Thể động từ НСВ và СВ', goal: 'Hiểu thể chưa hoàn thành (quá trình, lặp lại) và thể hoàn thành (kết quả, một lần).', checkpoint: true,
      grammar: [
        { p: 'Cặp thể: делать / сделать', vi: 'Hầu hết động từ có cặp. Thể hoàn thành thường thêm tiền tố (с-, про-, на-) hoặc đổi đuôi (решать / решить).', ex: [['Я долго делал задание.', 'Tôi làm bài rất lâu (quá trình).'], ['Я сделал задание.', 'Tôi làm xong bài rồi (kết quả).']] },
        { p: 'НСВ: quá trình, lặp lại, thói quen', vi: 'Đi với каждый день, часто, всегда, долго.', ex: [['Я каждый день встаю в семь.', 'Ngày nào tôi cũng dậy lúc bảy giờ.'], ['Он всегда опаздывает.', 'Anh ấy luôn đến muộn.']] },
        { p: 'СВ: một lần, có kết quả', vi: 'Đi với уже, наконец, сразу, вдруг. Thể hoàn thành không có thì hiện tại.', ex: [['Я уже прочитал книгу.', 'Tôi đọc xong sách rồi.'], ['Завтра я встану рано.', 'Mai tôi sẽ dậy sớm.']] }
      ] },
    { no: 31, title: 'Nói về ai, về cái gì: о + cách 6', goal: 'Dùng о + cách 6 sau думать, говорить, рассказывать, мечтать.',
      grammar: [
        { p: 'о + cách 6 (trước nguyên âm: об)', vi: 'думать о семье, говорить о погоде, книга об истории.', ex: [['О чём ты думаешь? — О работе.', 'Cậu nghĩ gì vậy? — Về công việc.'], ['Это фильм о любви.', 'Đây là phim về tình yêu.']] },
        { p: 'Đại từ sau о', vi: 'обо мне, о тебе, о нём, о ней, о нас, о вас, о них.', ex: [['Он часто говорит о тебе.', 'Anh ấy hay nói về cậu.'], ['Расскажи о себе.', 'Kể về bản thân đi.']] },
        { p: 'Tính từ cách 6: -ом/-ем, -ой/-ей', vi: 'о новом фильме, о русской литературе.', ex: [['Мы говорим о русской музыке.', 'Chúng tôi nói về âm nhạc Nga.'], ['Я читаю о новом музее.', 'Tôi đọc về bảo tàng mới.']] }
      ] },
    { no: 32, title: 'Cùng với ai: с + cách 5', goal: 'Dùng с + cách 5 chỉ người đi cùng và món ăn kèm: с другом, чай с лимоном.',
      grammar: [
        { p: 'Đuôi cách 5: -ом/-ем (đực, trung), -ой/-ей (cái), -ью (cái đuôi -ь)', vi: 'брат → с братом, мама → с мамой, Таня → с Таней, дочь → с дочерью.', ex: [['Я живу с сестрой.', 'Tôi sống với chị gái.'], ['Чай с лимоном, пожалуйста.', 'Cho tôi trà chanh.']] },
        { p: 'Đại từ cách 5', vi: 'со мной, с тобой, с ним, с ней, с нами, с вами, с ними.', ex: [['Пойдём со мной!', 'Đi với tôi đi!'], ['Можно с вами?', 'Tôi đi cùng được không?']] },
        { p: 'Giới từ vị trí + cách 5', vi: 'над (trên), под (dưới), перед (trước), за (sau), между (giữa).', ex: [['Кошка под столом.', 'Con mèo dưới gầm bàn.'], ['За домом сад.', 'Sau nhà có vườn.']] }
      ] },
    { no: 33, title: 'Bằng gì? Làm nghề gì? Cách 5', goal: 'Dùng cách 5 không giới từ: писать ручкой, работать врачом, стать инженером.',
      grammar: [
        { p: 'Công cụ: cách 5 không giới từ', vi: 'писать ручкой, есть ложкой, резать ножом.', ex: [['Я пишу ручкой.', 'Tôi viết bằng bút.'], ['Во Вьетнаме едят палочками.', 'Ở Việt Nam ăn bằng đũa.']] },
        { p: 'работать / быть / стать + nghề ở cách 5', vi: 'Кем вы работаете? — Я работаю врачом.', ex: [['Она работает учительницей.', 'Cô ấy làm giáo viên.'], ['Я хочу стать переводчиком.', 'Tôi muốn trở thành phiên dịch viên.']] },
        { p: 'заниматься, интересоваться, пользоваться + cách 5', vi: 'Một số động từ luôn đi với cách 5.', ex: [['Я занимаюсь спортом.', 'Tôi chơi thể thao.'], ['Я пользуюсь компьютером.', 'Tôi dùng máy tính.']] }
      ] },
    { no: 34, title: 'Mấy giờ rồi? Giờ giấc', goal: 'Hỏi và nói giờ Который час?, Во сколько?, kể thời gian biểu một ngày.',
      grammar: [
        { p: 'Который час? — час, два часа, пять часов', vi: 'Danh từ час đi theo quy tắc số đếm ở bài 25.', ex: [['Сейчас три часа.', 'Bây giờ là ba giờ.'], ['Сейчас восемь часов десять минут.', 'Bây giờ là tám giờ mười.']] },
        { p: 'Во сколько? — в + giờ (cách 4)', vi: 'в семь часов, в половине восьмого (lúc 7 giờ rưỡi), ровно в девять.', ex: [['Во сколько начинается фильм? — В семь.', 'Mấy giờ phim chiếu? — Lúc bảy giờ.'], ['Я встаю в шесть часов.', 'Tôi dậy lúc sáu giờ.']] },
        { p: 'с … до … (cách 2)', vi: 'Từ … đến …: с девяти до шести.', ex: [['Я работаю с девяти до шести.', 'Tôi làm từ chín giờ đến sáu giờ.'], ['Магазин работает до восьми.', 'Cửa hàng mở đến tám giờ.']] }
      ] },
    { no: 35, title: 'Tổng hợp: mua sắm, hỏi đường, nhà hàng và 6 cách', goal: 'Tự xử lý ba tình huống thường gặp; ôn lại hệ thống 6 cách.', checkpoint: true,
      grammar: [
        { p: 'Lịch sự khi nhờ: Дайте / Скажите / Покажите, пожалуйста', vi: 'Mệnh lệnh lịch sự đuôi -те, luôn kèm пожалуйста.', ex: [['Дайте, пожалуйста, меню.', 'Làm ơn cho xem thực đơn.'], ['Скажите, пожалуйста, как пройти к метро?', 'Làm ơn cho hỏi đường đến ga tàu điện?']] },
        { p: 'Я хочу / Я бы хотел…', vi: 'Gọi món, mua hàng: Я хочу… (thẳng), Я бы хотел(а)… (nhẹ nhàng hơn).', ex: [['Я бы хотел заказать борщ.', 'Tôi muốn gọi canh borsch.'], ['Можно примерить?', 'Tôi mặc thử được không?']] },
        { p: 'Ôn 6 cách', vi: 'Cách 1 chủ ngữ, cách 2 sở hữu và phủ định, cách 3 người nhận, cách 4 tân ngữ và hướng đi, cách 5 công cụ và đi cùng, cách 6 nơi chốn và chủ đề. Xem bảng ở mục 6 cách.', ex: [['У брата нет машины.', 'Anh trai không có ô tô (cách 2).'], ['Я еду к маме на автобусе.', 'Tôi đi xe buýt đến nhà mẹ (cách 3, cách 6).']] }
      ] }
  ]
};

if (typeof module !== 'undefined' && module.exports) module.exports = window.RU_CURRICULUM;
