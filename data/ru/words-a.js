/**
 * data/ru/words-a.js — Từ vựng A1 tiếng Nga, bài 7–20 (PolyLingo tự soạn, tham khảo khung Лексический минимум ТРКИ A1).
 * Mỗi bài bắt đầu bằng "#L<số> Tên bài". Mỗi dòng: từ (dấu ́ là trọng âm) | nghĩa | từ loại | thêm | câu ví dụ | nghĩa câu
 * Từ loại: n danh từ, v động từ, adj tính từ, adv trạng từ, pron đại từ, num số từ, prep giới từ, conj liên từ, part tiểu từ, q từ để hỏi, exp cụm từ.
 * Cột "thêm": danh từ ghi giống (m đực, f cái, n trung, pl chỉ số nhiều; thêm a nếu là người/con vật) và có thể có ;pl=số nhiều.
 *   Động từ ghi dạng я,ты,они (hoặc đủ 6 ngôi); ;fut nếu là thể hoàn thành (các dạng là thì tương lai); ;past=đực,cái,trung,số nhiều nếu bất quy tắc.
 */
if (typeof window === 'undefined') { global.window = global; }

window.RU_WORDS_RAW = (window.RU_WORDS_RAW || []).concat([`
#L7 Chào hỏi và làm quen
здра́вствуйте|xin chào (lịch sự, nhiều người)|exp||Здравствуйте, Анна Петровна!|Chào chị Anna Petrovna!
здра́вствуй|xin chào (thân mật, một người)|exp||Здравствуй, Миша!|Chào Misha!
приве́т|chào (thân mật)|exp||Привет! Как дела?|Chào! Dạo này thế nào?
до свида́ния|tạm biệt|exp||До свидания, до завтра!|Tạm biệt, mai gặp nhé!
пока́|chào nhé (thân mật)|exp||Пока, до вечера!|Chào nhé, tối gặp!
до́брое у́тро|chào buổi sáng|exp||Доброе утро, мама!|Con chào mẹ buổi sáng!
до́брый день|xin chào (ban ngày)|exp||Добрый день! Чем могу помочь?|Xin chào! Tôi giúp gì được ạ?
до́брый ве́чер|chào buổi tối|exp||Добрый вечер, друзья!|Chào buổi tối các bạn!
споко́йной но́чи|chúc ngủ ngon|exp||Спокойной ночи, сынок!|Chúc con ngủ ngon!
спаси́бо|cảm ơn|exp||Спасибо за помощь!|Cảm ơn vì đã giúp!
пожа́луйста|làm ơn; không có gì|exp||Чай, пожалуйста.|Cho tôi trà ạ.
извини́те|xin lỗi (lịch sự)|exp||Извините, где метро?|Xin lỗi, ga tàu điện ngầm ở đâu?
да|vâng, có|part||Да, я студент.|Vâng, tôi là sinh viên.
нет|không|part||Нет, я не врач.|Không, tôi không phải bác sĩ.
не|không (đặt trước từ bị phủ định)|part||Я не понимаю.|Tôi không hiểu.
меня́ зову́т|tôi tên là|exp||Меня зовут Нам.|Tôi tên là Nam.
как вас зову́т?|anh/chị tên là gì?|exp||Как вас зовут? — Меня зовут Ольга.|Chị tên gì? — Tôi tên Olga.
как тебя́ зову́т?|bạn tên là gì? (thân mật)|exp||Как тебя зовут? — Саша.|Bạn tên gì? — Sasha.
о́чень прия́тно|rất hân hạnh|exp||Очень приятно, Иван.|Rất vui được gặp anh, Ivan.
как дела́?|dạo này thế nào?|exp||Как дела? — Хорошо, спасибо.|Thế nào rồi? — Tốt, cảm ơn.
хорошо́|tốt, ổn|adv||Всё хорошо.|Mọi thứ đều ổn.
пло́хо|tệ, không tốt; kém|adv||Я плохо понимаю.|Tôi hiểu kém lắm.
норма́льно|bình thường, tạm ổn|adv||— Как дела? — Нормально.|— Thế nào? — Bình thường.
отли́чно|rất tốt, tuyệt|adv||Отлично! Спасибо.|Tuyệt! Cảm ơn.
и|và|conj||Мама и папа дома.|Bố và mẹ ở nhà.
а|còn (đối chiếu)|conj||Я Нам, а вы?|Tôi là Nam, còn anh?
то́же|cũng|adv||Я тоже студент.|Tôi cũng là sinh viên.
#L8 Ai đây? Cái gì đây? Đại từ nhân xưng
кто|ai|q||Кто это? — Это мой брат.|Đây là ai? — Đây là anh trai tôi.
что|cái gì|q||Что это? — Это книга.|Đây là gì? — Đây là quyển sách.
э́то|đây là, đó là; cái này|pron||Это Москва.|Đây là Moskva.
я|tôi|pron||Я Нам.|Tôi là Nam.
ты|bạn, cậu (thân mật)|pron||Ты студент?|Cậu là sinh viên à?
он|anh ấy; nó (giống đực)|pron||Он врач.|Anh ấy là bác sĩ.
она́|cô ấy; nó (giống cái)|pron||Она студентка.|Cô ấy là sinh viên.
оно́|nó (giống trung)|pron||Где окно? — Вот оно.|Cửa sổ đâu? — Nó đây.
мы|chúng tôi, chúng ta|pron||Мы друзья.|Chúng tôi là bạn.
вы|các bạn; anh, chị (lịch sự)|pron||Вы русский?|Anh là người Nga à?
они́|họ, chúng nó|pron||Они дома.|Họ ở nhà.
вот|đây (chỉ vào)|part||Вот мой дом.|Đây là nhà tôi.
там|ở đó|adv||Там парк.|Ở đó là công viên.
тут|ở đây|adv||Тут метро.|Ở đây có ga tàu điện.
здесь|ở đây|adv||Здесь можно сидеть?|Ngồi ở đây được không?
челове́к|người|n|ma;pl=лю́ди|Это хороший человек.|Đây là người tốt.
студе́нт|sinh viên (nam)|n|ma;pl=студе́нты|Мой брат студент.|Anh tôi là sinh viên.
студе́нтка|sinh viên (nữ)|n|fa;pl=студе́нтки|Анна студентка.|Anna là sinh viên.
друг|bạn (nam)|n|ma;pl=друзья́|Это мой друг Саша.|Đây là bạn tôi, Sasha.
подру́га|bạn (nữ)|n|fa;pl=подру́ги|Это моя подруга Лена.|Đây là bạn tôi, Lena.
кни́га|quyển sách|n|f;pl=кни́ги|Это интересная книга.|Đây là cuốn sách hay.
ру́чка|cái bút|n|f;pl=ру́чки|Вот ручка.|Bút đây.
каранда́ш|bút chì|n|m;pl=карандаши́|Это карандаш.|Đây là bút chì.
стол|cái bàn|n|m;pl=столы́|Книга на столе.|Sách ở trên bàn.
стул|cái ghế|n|m;pl=сту́лья|Стул там.|Ghế ở đó.
телефо́н|điện thoại|n|m;pl=телефо́ны|Это мой телефон.|Đây là điện thoại của tôi.
#L9 Ba giống của danh từ
дом|ngôi nhà|n|m;pl=дома́|Это мой дом.|Đây là nhà tôi.
окно́|cửa sổ|n|n;pl=о́кна|Окно большое.|Cửa sổ to.
дверь|cửa ra vào|n|f;pl=две́ри|Дверь там.|Cửa ra vào ở kia.
ко́мната|căn phòng|n|f;pl=ко́мнаты|Это моя комната.|Đây là phòng tôi.
кварти́ра|căn hộ|n|f;pl=кварти́ры|Квартира новая.|Căn hộ mới.
ку́хня|nhà bếp|n|f;pl=ку́хни|Мама на кухне.|Mẹ ở trong bếp.
шко́ла|trường học|n|f;pl=шко́лы|Это наша школа.|Đây là trường của chúng tôi.
го́род|thành phố|n|m;pl=города́|Москва — большой город.|Moskva là thành phố lớn.
у́лица|đường phố|n|f;pl=у́лицы|Это улица Пушкина.|Đây là phố Pushkin.
мо́ре|biển|n|n;pl=моря́|Море красивое.|Biển đẹp.
зда́ние|tòa nhà|n|n;pl=зда́ния|Это высокое здание.|Đây là tòa nhà cao.
пла́тье|cái váy liền|n|n;pl=пла́тья|Это красивое платье.|Đây là cái váy đẹp.
сло́во|từ|n|n;pl=слова́|Это новое слово.|Đây là từ mới.
письмо́|lá thư|n|n;pl=пи́сьма|Вот письмо.|Thư đây.
и́мя|tên|n|n;pl=имена́|Какое красивое имя!|Tên đẹp quá!
вре́мя|thời gian|n|n|Время — деньги.|Thời gian là tiền bạc.
ночь|đêm|n|f;pl=но́чи|Ночь тёмная.|Đêm tối.
тетра́дь|quyển vở|n|f;pl=тетра́ди|Где моя тетрадь?|Vở của tôi đâu?
слова́рь|từ điển|n|m;pl=словари́|Это русский словарь.|Đây là từ điển tiếng Nga.
музе́й|bảo tàng|n|m;pl=музе́и|Музей там.|Bảo tàng ở đó.
па́па|bố|n|ma;pl=па́пы|Мой папа инженер.|Bố tôi là kỹ sư.
дя́дя|chú, bác (trai)|n|ma;pl=дя́ди|Мой дядя врач.|Chú tôi là bác sĩ.
ко́фе|cà phê (giống đực, không biến đổi)|n|m|Кофе горячий.|Cà phê nóng.
метро́|tàu điện ngầm (không biến đổi)|n|n|Метро рядом.|Ga tàu điện ngầm ở gần.
такси́|taxi (không biến đổi)|n|n|Такси здесь.|Taxi ở đây.
маши́на|ô tô|n|f;pl=маши́ны|Это новая машина.|Đây là ô tô mới.
пальто́|áo khoác dài (không biến đổi)|n|n|Это моё пальто.|Đây là áo khoác của tôi.
#L10 Danh từ số nhiều
де́ти|trẻ em, con cái|n|pla|Дети дома.|Bọn trẻ ở nhà.
ребёнок|đứa trẻ|n|ma;pl=де́ти|Ребёнок спит.|Đứa bé đang ngủ.
лю́ди|người (số nhiều)|n|pla|Здесь много людей.|Ở đây đông người.
друзья́|những người bạn|n|pla|Это мои друзья.|Đây là các bạn tôi.
журна́л|tạp chí|n|m;pl=журна́лы|Это новые журналы.|Đây là những tạp chí mới.
газе́та|tờ báo|n|f;pl=газе́ты|Где газеты?|Báo đâu?
уро́к|bài học, tiết học|n|m;pl=уро́ки|Сегодня три урока.|Hôm nay có ba tiết học.
уче́бник|sách giáo khoa|n|m;pl=уче́бники|Вот наши учебники.|Đây là sách giáo khoa của chúng tôi.
су́мка|túi xách|n|f;pl=су́мки|Это твоя сумка?|Đây là túi của cậu à?
рюкза́к|ba lô|n|m;pl=рюкзаки́|Рюкзак тяжёлый.|Ba lô nặng.
ключ|chìa khóa|n|m;pl=ключи́|Где ключи?|Chìa khóa đâu?
очки́|kính mắt|n|pl|Это мои очки.|Đây là kính của tôi.
часы́|đồng hồ|n|pl|Часы на стене.|Đồng hồ ở trên tường.
де́ньги|tiền|n|pl|Деньги в сумке.|Tiền ở trong túi.
брю́ки|quần dài|n|pl|Это новые брюки.|Đây là quần mới.
джи́нсы|quần bò|n|pl|Джинсы синие.|Quần bò màu xanh.
я́блоко|quả táo|n|n;pl=я́блоки|Яблоки красные.|Táo màu đỏ.
цвето́к|bông hoa|n|m;pl=цветы́|Какие красивые цветы!|Hoa đẹp quá!
де́рево|cái cây|n|n;pl=дере́вья|В парке деревья.|Trong công viên có cây.
мно́го|nhiều|adv||Здесь много книг.|Ở đây có nhiều sách.
ма́ло|ít|adv||У нас мало времени.|Chúng ta có ít thời gian.
все|tất cả mọi người|pron||Все дома.|Mọi người đều ở nhà.
ещё|còn, nữa; thêm|adv||Ещё чай, пожалуйста.|Cho thêm trà ạ.
вещь|đồ vật|n|f;pl=ве́щи|Это мои вещи.|Đây là đồ của tôi.
игру́шка|đồ chơi|n|f;pl=игру́шки|Игрушки на полу.|Đồ chơi ở dưới sàn.
ко́шка|con mèo|n|fa;pl=ко́шки|Кошка спит.|Con mèo đang ngủ.
соба́ка|con chó|n|fa;pl=соба́ки|Это моя собака.|Đây là con chó của tôi.
#L11 Đại từ sở hữu và gia đình
мой|của tôi (моя́, моё, мои́)|pron||Это моя мама.|Đây là mẹ tôi.
твой|của bạn (твоя́, твоё, твои́)|pron||Это твой телефон?|Đây là điện thoại của cậu à?
наш|của chúng tôi (на́ша, на́ше, на́ши)|pron||Это наш дом.|Đây là nhà chúng tôi.
ваш|của các bạn; của anh/chị (ва́ша, ва́ше, ва́ши)|pron||Это ваша сумка?|Đây là túi của chị à?
его́|của anh ấy (không đổi)|pron||Это его брат.|Đây là anh trai của anh ấy.
её|của cô ấy (không đổi)|pron||Это её муж.|Đây là chồng cô ấy.
их|của họ (không đổi)|pron||Это их дети.|Đây là con của họ.
чей?|của ai? (чья, чьё, чьи)|q||Чей это телефон?|Điện thoại này của ai?
семья́|gia đình|n|f;pl=се́мьи|У меня большая семья.|Tôi có gia đình đông người.
ма́ма|mẹ|n|fa;pl=ма́мы|Моя мама врач.|Mẹ tôi là bác sĩ.
мать|mẹ (trang trọng)|n|fa;pl=ма́тери|Мать и сын.|Mẹ và con trai.
оте́ц|bố, cha|n|ma;pl=отцы́|Мой отец инженер.|Bố tôi là kỹ sư.
роди́тели|bố mẹ|n|pla|Мои родители в Ханое.|Bố mẹ tôi ở Hà Nội.
брат|anh trai, em trai|n|ma;pl=бра́тья|У меня есть брат.|Tôi có một anh trai.
сестра́|chị gái, em gái|n|fa;pl=сёстры|Это моя сестра.|Đây là chị gái tôi.
сын|con trai|n|ma;pl=сыновья́|Их сын студент.|Con trai họ là sinh viên.
дочь|con gái|n|fa;pl=до́чери|Его дочь школьница.|Con gái anh ấy là học sinh.
муж|chồng|n|ma;pl=мужья́|Её муж врач.|Chồng cô ấy là bác sĩ.
жена́|vợ|n|fa;pl=жёны|Его жена учительница.|Vợ anh ấy là giáo viên.
ба́бушка|bà|n|fa;pl=ба́бушки|Бабушка дома.|Bà ở nhà.
де́душка|ông|n|ma;pl=де́душки|Дедушка читает газету.|Ông đang đọc báo.
тётя|cô, dì, bác gái|n|fa;pl=тёти|Моя тётя живёт в Москве.|Cô tôi sống ở Moskva.
внук|cháu trai (của ông bà)|n|ma;pl=вну́ки|Это наш внук.|Đây là cháu trai của chúng tôi.
вну́чка|cháu gái (của ông bà)|n|fa;pl=вну́чки|Внучка играет.|Cháu gái đang chơi.
фотогра́фия|bức ảnh|n|f;pl=фотогра́фии|Это фотография моей семьи.|Đây là ảnh gia đình tôi.
#L12 Động từ nhóm I (đuôi -ать, -ять)
чита́ть|đọc|v|чита́ю,чита́ешь,чита́ют|Я читаю книгу.|Tôi đọc sách.
понима́ть|hiểu|v|понима́ю,понима́ешь,понима́ют|Вы понимаете? — Да, понимаю.|Anh hiểu không? — Có, tôi hiểu.
знать|biết|v|зна́ю,зна́ешь,зна́ют|Я не знаю.|Tôi không biết.
де́лать|làm|v|де́лаю,де́лаешь,де́лают|Что ты делаешь?|Cậu đang làm gì?
рабо́тать|làm việc|v|рабо́таю,рабо́таешь,рабо́тают|Папа работает.|Bố đang làm việc.
отдыха́ть|nghỉ ngơi|v|отдыха́ю,отдыха́ешь,отдыха́ют|Мы отдыхаем дома.|Chúng tôi nghỉ ở nhà.
слу́шать|nghe|v|слу́шаю,слу́шаешь,слу́шают|Я слушаю музыку.|Tôi nghe nhạc.
игра́ть|chơi|v|игра́ю,игра́ешь,игра́ют|Дети играют.|Bọn trẻ đang chơi.
гуля́ть|đi dạo|v|гуля́ю,гуля́ешь,гуля́ют|Мы гуляем в парке.|Chúng tôi đi dạo trong công viên.
изуча́ть|học, nghiên cứu (một môn)|v|изуча́ю,изуча́ешь,изуча́ют|Я изучаю русский язык.|Tôi học tiếng Nga.
отвеча́ть|trả lời|v|отвеча́ю,отвеча́ешь,отвеча́ют|Студент отвечает.|Sinh viên trả lời.
спра́шивать|hỏi|v|спра́шиваю,спра́шиваешь,спра́шивают|Учитель спрашивает.|Thầy giáo hỏi.
повторя́ть|nhắc lại, ôn|v|повторя́ю,повторя́ешь,повторя́ют|Мы повторяем слова.|Chúng tôi ôn từ.
за́втракать|ăn sáng|v|за́втракаю,за́втракаешь,за́втракают|Я завтракаю дома.|Tôi ăn sáng ở nhà.
обе́дать|ăn trưa|v|обе́даю,обе́даешь,обе́дают|Где вы обедаете?|Anh ăn trưa ở đâu?
у́жинать|ăn tối|v|у́жинаю,у́жинаешь,у́жинают|Мы ужинаем в семь.|Chúng tôi ăn tối lúc bảy giờ.
ду́мать|nghĩ|v|ду́маю,ду́маешь,ду́мают|Я думаю, это хорошо.|Tôi nghĩ thế là tốt.
жить|sống|v|живу́,живёшь,живу́т|Я живу в Ханое.|Tôi sống ở Hà Nội.
писа́ть|viết|v|пишу́,пи́шешь,пи́шут|Он пишет письмо.|Anh ấy viết thư.
ждать|chờ, đợi|v|жду,ждёшь,ждут|Я жду автобус.|Tôi đợi xe buýt.
пить|uống|v|пью,пьёшь,пьют|Я пью чай.|Tôi uống trà.
петь|hát|v|пою́,поёшь,пою́т|Она хорошо поёт.|Cô ấy hát hay.
танцева́ть|nhảy, khiêu vũ|v|танцу́ю,танцу́ешь,танцу́ют|Мы танцуем.|Chúng tôi nhảy.
рисова́ть|vẽ|v|рису́ю,рису́ешь,рису́ют|Ребёнок рисует дом.|Đứa bé vẽ ngôi nhà.
мечта́ть|mơ ước|v|мечта́ю,мечта́ешь,мечта́ют|Я мечтаю о море.|Tôi mơ về biển.
сейча́с|bây giờ|adv||Что ты делаешь сейчас?|Bây giờ cậu đang làm gì?
ча́сто|thường xuyên|adv||Я часто читаю.|Tôi hay đọc sách.
иногда́|thỉnh thoảng|adv||Иногда я слушаю радио.|Thỉnh thoảng tôi nghe đài.
всегда́|luôn luôn|adv||Он всегда работает.|Anh ấy lúc nào cũng làm việc.
#L13 Động từ nhóm II (đuôi -ить, -еть)
говори́ть|nói|v|говорю́,говори́шь,говоря́т|Я говорю по-русски.|Tôi nói tiếng Nga.
учи́ть|học thuộc; dạy|v|учу́,у́чишь,у́чат|Я учу новые слова.|Tôi học từ mới.
учи́ться|học (ở trường)|v|учу́сь,у́чишься,у́чатся|Я учусь в университете.|Tôi học ở trường đại học.
смотре́ть|xem, nhìn|v|смотрю́,смо́тришь,смо́трят|Мы смотрим фильм.|Chúng tôi xem phim.
ви́деть|nhìn thấy|v|ви́жу,ви́дишь,ви́дят|Я вижу море.|Tôi thấy biển.
люби́ть|yêu, thích|v|люблю́,лю́бишь,лю́бят|Я люблю чай.|Tôi thích trà.
стро́ить|xây|v|стро́ю,стро́ишь,стро́ят|Они строят дом.|Họ xây nhà.
звони́ть|gọi điện|v|звоню́,звони́шь,звоня́т|Я звоню маме.|Tôi gọi điện cho mẹ.
кури́ть|hút thuốc|v|курю́,ку́ришь,ку́рят|Здесь нельзя курить.|Ở đây không được hút thuốc.
гото́вить|nấu ăn; chuẩn bị|v|гото́влю,гото́вишь,гото́вят|Мама готовит ужин.|Mẹ nấu bữa tối.
спать|ngủ|v|сплю,спишь,спят|Ребёнок спит.|Đứa bé đang ngủ.
стоя́ть|đứng|v|стою́,стои́шь,стоя́т|Машина стоит там.|Ô tô đậu ở đó.
сиде́ть|ngồi|v|сижу́,сиди́шь,сидя́т|Я сижу дома.|Tôi ngồi ở nhà.
лежа́ть|nằm|v|лежу́,лежи́шь,лежа́т|Книга лежит на столе.|Sách nằm trên bàn.
слы́шать|nghe thấy|v|слы́шу,слы́шишь,слы́шат|Я тебя не слышу.|Tôi không nghe thấy cậu.
по́мнить|nhớ|v|по́мню,по́мнишь,по́мнят|Я помню его имя.|Tôi nhớ tên anh ấy.
хоте́ть|muốn|v|хочу́,хо́чешь,хо́чет,хоти́м,хоти́те,хотя́т|Я хочу пить.|Tôi muốn uống nước.
есть|ăn|v|ем,ешь,ест,еди́м,еди́те,едя́т;past=ел,е́ла,е́ло,е́ли|Что ты ешь?|Cậu đang ăn gì?
плати́ть|trả tiền|v|плачу́,пла́тишь,пла́тят|Я плачу картой.|Tôi trả bằng thẻ.
проси́ть|xin, nhờ|v|прошу́,про́сишь,про́сят|Прошу вас, садитесь.|Mời anh ngồi.
язы́к|ngôn ngữ; cái lưỡi|n|m;pl=языки́|Русский язык красивый.|Tiếng Nga hay.
пра́вильно|đúng|adv||Правильно!|Đúng rồi!
бы́стро|nhanh|adv||Он говорит быстро.|Anh ấy nói nhanh.
ме́дленно|chậm|adv||Говорите медленно, пожалуйста.|Làm ơn nói chậm thôi.
гро́мко|to (tiếng)|adv||Говорите громко.|Hãy nói to lên.
ти́хо|khẽ, yên tĩnh|adv||Здесь тихо.|Ở đây yên tĩnh.
#L14 Ở đâu? Giới cách với в và на
где|ở đâu|q||Где вы живёте? — В Москве.|Anh sống ở đâu? — Ở Moskva.
в|trong, ở (+ cách 6 khi chỉ nơi chốn)|prep||Я живу в Ханое.|Tôi sống ở Hà Nội.
на|trên, ở (+ cách 6 khi chỉ nơi chốn)|prep||Папа на работе.|Bố đang ở chỗ làm.
Москва́|Moskva|n|f|Я живу в Москве.|Tôi sống ở Moskva.
Росси́я|nước Nga|n|f|Россия — большая страна.|Nga là một đất nước rộng lớn.
Вьетна́м|Việt Nam|n|m|Я из Вьетнама.|Tôi đến từ Việt Nam.
Хано́й|Hà Nội|n|m|Ханой — столица Вьетнама.|Hà Nội là thủ đô Việt Nam.
страна́|đất nước|n|f;pl=стра́ны|Это красивая страна.|Đây là một đất nước đẹp.
дере́вня|làng quê|n|f;pl=дере́вни|Бабушка живёт в деревне.|Bà sống ở quê.
магази́н|cửa hàng|n|m;pl=магази́ны|Мама в магазине.|Mẹ đang ở cửa hàng.
апте́ка|hiệu thuốc|n|f;pl=апте́ки|Где аптека?|Hiệu thuốc ở đâu?
банк|ngân hàng|n|m;pl=ба́нки|Он работает в банке.|Anh ấy làm ở ngân hàng.
по́чта|bưu điện|n|f;pl=по́чты|Почта рядом.|Bưu điện ở gần.
рабо́та|công việc; nơi làm việc|n|f;pl=рабо́ты|Она на работе.|Cô ấy đang ở chỗ làm.
заво́д|nhà máy|n|m;pl=заво́ды|Отец работает на заводе.|Bố làm ở nhà máy.
фа́брика|xưởng, nhà máy (nhẹ)|n|f;pl=фа́брики|Мать работает на фабрике.|Mẹ làm ở xưởng.
университе́т|trường đại học|n|m;pl=университе́ты|Я учусь в университете.|Tôi học đại học.
библиоте́ка|thư viện|n|f;pl=библиоте́ки|Мы в библиотеке.|Chúng tôi ở thư viện.
парк|công viên|n|m;pl=па́рки|Дети в парке.|Bọn trẻ ở công viên.
пло́щадь|quảng trường|n|f;pl=пло́щади|Мы на Красной площади.|Chúng tôi đang ở Quảng trường Đỏ.
рестора́н|nhà hàng|n|m;pl=рестора́ны|Мы ужинаем в ресторане.|Chúng tôi ăn tối ở nhà hàng.
кафе́|quán cà phê (không biến đổi)|n|n|Друзья в кафе.|Các bạn đang ở quán cà phê.
гости́ница|khách sạn|n|f;pl=гости́ницы|Гостиница в центре.|Khách sạn ở trung tâm.
больни́ца|bệnh viện|n|f;pl=больни́цы|Врач в больнице.|Bác sĩ ở bệnh viện.
стадио́н|sân vận động|n|m;pl=стадио́ны|Мы на стадионе.|Chúng tôi ở sân vận động.
ры́нок|chợ|n|m;pl=ры́нки|Бабушка на рынке.|Bà đang ở chợ.
вокза́л|nhà ga (tàu hỏa)|n|m;pl=вокза́лы|Мы на вокзале.|Chúng tôi ở nhà ga.
аэропо́рт|sân bay|n|m;pl=аэропо́рты|Брат в аэропорту.|Anh trai đang ở sân bay.
центр|trung tâm|n|m;pl=це́нтры|Я живу в центре.|Tôi sống ở trung tâm.
#L15 Đi bằng phương tiện gì?
е́хать|đi (bằng xe, một hướng)|v|е́ду,е́дешь,е́дут|Я еду на автобусе.|Tôi đi xe buýt.
авто́бус|xe buýt|n|m;pl=авто́бусы|Вот автобус.|Xe buýt đây rồi.
трамва́й|tàu điện mặt đất|n|m;pl=трамва́и|Мы едем на трамвае.|Chúng tôi đi tàu điện.
тролле́йбус|xe buýt điện|n|m;pl=тролле́йбусы|Троллейбус идёт в центр.|Xe buýt điện chạy vào trung tâm.
по́езд|tàu hỏa|n|m;pl=поезда́|Поезд идёт в Москву.|Tàu chạy đi Moskva.
самолёт|máy bay|n|m;pl=самолёты|Мы летим на самолёте.|Chúng tôi bay bằng máy bay.
велосипе́д|xe đạp|n|m;pl=велосипе́ды|Я еду на велосипеде.|Tôi đi xe đạp.
мотоци́кл|xe máy, mô tô|n|m;pl=мотоци́клы|Во Вьетнаме много мотоциклов.|Ở Việt Nam có nhiều xe máy.
пешко́м|đi bộ|adv||Я иду пешком.|Tôi đi bộ.
остано́вка|bến xe, trạm dừng|n|f;pl=остано́вки|Где остановка автобуса?|Bến xe buýt ở đâu?
биле́т|vé|n|m;pl=биле́ты|Один билет, пожалуйста.|Cho một vé ạ.
доро́га|con đường|n|f;pl=доро́ги|Дорога длинная.|Con đường dài.
ста́нция|ga (tàu điện ngầm)|n|f;pl=ста́нции|Следующая станция — «Арбатская».|Ga tiếp theo là Arbatskaya.
мост|cây cầu|n|m;pl=мосты́|Это старый мост.|Đây là cây cầu cổ.
о́зеро|hồ|n|n;pl=озёра|В Ханое много озёр.|Hà Nội có nhiều hồ.
река́|sông|n|f;pl=ре́ки|Волга — большая река.|Volga là con sông lớn.
лес|rừng|n|m;pl=леса́|Мы гуляем в лесу.|Chúng tôi đi dạo trong rừng.
пляж|bãi biển|n|m;pl=пля́жи|Мы на пляже.|Chúng tôi ở bãi biển.
да́ча|nhà nghỉ ngoại ô|n|f;pl=да́чи|Летом мы на даче.|Mùa hè chúng tôi ở nhà nghỉ ngoại ô.
далеко́|xa|adv||Вокзал далеко?|Nhà ga có xa không?
бли́зко|gần|adv||Метро близко.|Ga tàu điện ngầm ở gần.
ря́дом|bên cạnh, gần ngay|adv||Аптека рядом.|Hiệu thuốc ở ngay cạnh.
пря́мо|thẳng|adv||Идите прямо.|Đi thẳng.
нале́во|bên trái, rẽ trái|adv||Потом налево.|Sau đó rẽ trái.
напра́во|bên phải, rẽ phải|adv||Банк направо.|Ngân hàng ở bên phải.
#L16 Nghề nghiệp, quốc tịch, ngôn ngữ
врач|bác sĩ|n|ma;pl=врачи́|Моя мама врач.|Mẹ tôi là bác sĩ.
инжене́р|kỹ sư|n|ma;pl=инжене́ры|Он инженер.|Anh ấy là kỹ sư.
учи́тель|giáo viên (nam)|n|ma;pl=учителя́|Наш учитель хороший.|Thầy giáo chúng tôi tốt.
учи́тельница|giáo viên (nữ)|n|fa;pl=учи́тельницы|Моя тётя учительница.|Cô tôi là giáo viên.
преподава́тель|giảng viên|n|ma;pl=преподава́тели|Это наш преподаватель.|Đây là giảng viên của chúng tôi.
продаве́ц|người bán hàng|n|ma;pl=продавцы́|Продавец в магазине.|Người bán hàng ở trong cửa hàng.
води́тель|tài xế|n|ma;pl=води́тели|Мой брат водитель.|Anh tôi là tài xế.
по́вар|đầu bếp|n|ma;pl=повара́|Он хороший повар.|Anh ấy là đầu bếp giỏi.
журнали́ст|nhà báo|n|ma;pl=журнали́сты|Она журналист.|Cô ấy là nhà báo.
медсестра́|y tá|n|fa;pl=медсёстры|Медсестра в больнице.|Y tá ở bệnh viện.
шко́льник|học sinh (nam)|n|ma;pl=шко́льники|Мой сын школьник.|Con trai tôi là học sinh.
бизнесме́н|doanh nhân|n|ma;pl=бизнесме́ны|Её отец бизнесмен.|Bố cô ấy là doanh nhân.
профе́ссия|nghề nghiệp|n|f;pl=профе́ссии|Какая у вас профессия?|Anh làm nghề gì?
ру́сский|thuộc nước Nga; người Nga (nam)|adj||Он русский.|Anh ấy là người Nga.
ру́сская|người Nga (nữ)|n|fa;pl=ру́сские|Анна русская.|Anna là người Nga.
вьетна́мец|người Việt Nam (nam)|n|ma;pl=вьетна́мцы|Я вьетнамец.|Tôi là người Việt Nam.
вьетна́мка|người Việt Nam (nữ)|n|fa;pl=вьетна́мки|Она вьетнамка.|Cô ấy là người Việt Nam.
вьетна́мский|thuộc Việt Nam|adj||Вьетнамский кофе очень вкусный.|Cà phê Việt Nam rất ngon.
англи́йский|thuộc nước Anh|adj||Я изучаю английский язык.|Tôi học tiếng Anh.
кита́йский|thuộc Trung Quốc|adj||Это китайский ресторан.|Đây là nhà hàng Trung Quốc.
по-ру́сски|bằng tiếng Nga|adv||Вы говорите по-русски?|Anh có nói tiếng Nga không?
по-вьетна́мски|bằng tiếng Việt|adv||Как это по-вьетнамски?|Cái này tiếng Việt nói thế nào?
по-англи́йски|bằng tiếng Anh|adv||Он говорит по-английски.|Anh ấy nói tiếng Anh.
немно́го|một chút|adv||Я немного говорю по-русски.|Tôi nói được chút tiếng Nga.
#L17 Tính từ: Какой? Какая? Какое? Какие?
како́й|nào, như thế nào (кака́я, како́е, каки́е)|q||Какой это город?|Đây là thành phố thế nào?
но́вый|mới|adj||Это новый дом.|Đây là ngôi nhà mới.
ста́рый|cũ, già|adj||Это старая книга.|Đây là cuốn sách cũ.
большо́й|to, lớn|adj||Москва — большой город.|Moskva là thành phố lớn.
ма́ленький|nhỏ|adj||У меня маленькая квартира.|Tôi có căn hộ nhỏ.
хоро́ший|tốt, hay|adj||Это хороший фильм.|Đây là bộ phim hay.
плохо́й|xấu, tồi|adj||Сегодня плохая погода.|Hôm nay thời tiết xấu.
краси́вый|đẹp|adj||Какое красивое платье!|Cái váy đẹp quá!
интере́сный|thú vị, hay|adj||Это интересная книга.|Đây là cuốn sách hay.
ску́чный|nhàm chán|adj||Фильм скучный.|Phim chán.
молодо́й|trẻ|adj||Он молодой врач.|Anh ấy là bác sĩ trẻ.
высо́кий|cao|adj||Это высокое здание.|Đây là tòa nhà cao.
ни́зкий|thấp|adj||Это низкий стол.|Đây là cái bàn thấp.
дорого́й|đắt; thân mến|adj||Это дорогая машина.|Đây là ô tô đắt tiền.
дешёвый|rẻ|adj||Здесь дешёвые фрукты.|Ở đây hoa quả rẻ.
бе́лый|trắng|adj||У меня белая рубашка.|Tôi có áo sơ mi trắng.
чёрный|đen|adj||Я люблю чёрный кофе.|Tôi thích cà phê đen.
кра́сный|đỏ|adj||Красная площадь.|Quảng trường Đỏ.
си́ний|xanh lam đậm|adj||Это синее море.|Đây là biển xanh.
зелёный|xanh lá|adj||Я пью зелёный чай.|Tôi uống trà xanh.
жёлтый|vàng|adj||Это жёлтый цветок.|Đây là bông hoa vàng.
голубо́й|xanh da trời|adj||Голубое небо.|Bầu trời xanh.
се́рый|xám|adj||Серый кот спит.|Con mèo xám đang ngủ.
тру́дный|khó|adj||Это трудный вопрос.|Đây là câu hỏi khó.
лёгкий|dễ; nhẹ|adj||Это лёгкое упражнение.|Đây là bài tập dễ.
вку́сный|ngon|adj||Какой вкусный суп!|Canh ngon quá!
#L18 Đối cách: tân ngữ là đồ vật
чай|trà|n|m|Я люблю чай.|Tôi thích trà.
молоко́|sữa|n|n|Ребёнок пьёт молоко.|Đứa bé uống sữa.
вода́|nước|n|f|Дайте воду, пожалуйста.|Làm ơn cho tôi nước.
сок|nước ép|n|m|Я пью апельсиновый сок.|Tôi uống nước cam.
хлеб|bánh mì|n|m|Я покупаю хлеб.|Tôi mua bánh mì.
мя́со|thịt|n|n|Он не ест мясо.|Anh ấy không ăn thịt.
ры́ба|cá|n|f|Мама готовит рыбу.|Mẹ nấu cá.
рис|cơm, gạo|n|m|Во Вьетнаме едят рис.|Ở Việt Nam người ta ăn cơm.
суп|canh, súp|n|m|Я ем суп.|Tôi ăn súp.
сыр|phô mai|n|m|Я люблю сыр.|Tôi thích phô mai.
ма́сло|bơ; dầu ăn|n|n|Хлеб и масло.|Bánh mì và bơ.
яйцо́|quả trứng|n|n;pl=я́йца|Я ем яйцо на завтрак.|Tôi ăn trứng vào bữa sáng.
сала́т|món salad; rau xà lách|n|m;pl=сала́ты|Она готовит салат.|Cô ấy làm salad.
фру́кты|hoa quả|n|pl|Я покупаю фрукты.|Tôi mua hoa quả.
о́вощи|rau củ|n|pl|Овощи свежие.|Rau tươi.
карто́шка|khoai tây|n|f|Мы едим картошку.|Chúng tôi ăn khoai tây.
са́хар|đường|n|m|Чай без сахара.|Trà không đường.
соль|muối|n|f|Где соль?|Muối đâu?
торт|bánh kem|n|m;pl=то́рты|Мама печёт торт.|Mẹ nướng bánh kem.
моро́женое|kem|n|n|Дети любят мороженое.|Trẻ con thích kem.
пи́во|bia|n|n|Он пьёт пиво.|Anh ấy uống bia.
вино́|rượu vang|n|n;pl=ви́на|Красное вино.|Rượu vang đỏ.
покупа́ть|mua|v|покупа́ю,покупа́ешь,покупа́ют|Что ты покупаешь?|Cậu mua gì thế?
брать|lấy|v|беру́,берёшь,беру́т|Я беру эту книгу.|Tôi lấy cuốn sách này.
#L19 Đối cách: tân ngữ là người, con vật
встреча́ть|gặp, đón|v|встреча́ю,встреча́ешь,встреча́ют|Я встречаю брата.|Tôi đi đón anh trai.
приглаша́ть|mời|v|приглаша́ю,приглаша́ешь,приглаша́ют|Мы приглашаем друзей.|Chúng tôi mời bạn bè.
фотографи́ровать|chụp ảnh|v|фотографи́рую,фотографи́руешь,фотографи́руют|Он фотографирует кошку.|Anh ấy chụp ảnh con mèo.
целова́ть|hôn|v|целу́ю,целу́ешь,целу́ют|Мама целует дочь.|Mẹ hôn con gái.
обнима́ть|ôm|v|обнима́ю,обнима́ешь,обнима́ют|Бабушка обнимает внука.|Bà ôm cháu trai.
сосе́д|hàng xóm (nam)|n|ma;pl=сосе́ди|Я знаю соседа.|Tôi biết anh hàng xóm.
сосе́дка|hàng xóm (nữ)|n|fa;pl=сосе́дки|Это наша соседка.|Đây là cô hàng xóm của chúng tôi.
колле́га|đồng nghiệp|n|ma;pl=колле́ги|Это мой коллега.|Đây là đồng nghiệp của tôi.
нача́льник|sếp, thủ trưởng|n|ma;pl=нача́льники|Я жду начальника.|Tôi đợi sếp.
гость|khách|n|ma;pl=го́сти|Мы ждём гостей.|Chúng tôi đợi khách.
мужчи́на|đàn ông|n|ma;pl=мужчи́ны|Я вижу мужчину.|Tôi thấy một người đàn ông.
же́нщина|phụ nữ|n|fa;pl=же́нщины|Эта женщина — врач.|Người phụ nữ này là bác sĩ.
ма́льчик|cậu bé|n|ma;pl=ма́льчики|Мальчик играет.|Cậu bé đang chơi.
де́вочка|cô bé|n|fa;pl=де́вочки|Девочка рисует.|Cô bé đang vẽ.
де́вушка|cô gái|n|fa;pl=де́вушки|Красивая девушка.|Cô gái xinh đẹp.
па́рень|chàng trai|n|ma;pl=па́рни|Он хороший парень.|Anh ấy là chàng trai tốt.
живо́тное|con vật|n|na;pl=живо́тные|Я люблю животных.|Tôi yêu động vật.
ло́шадь|con ngựa|n|fa;pl=ло́шади|Мальчик видит лошадь.|Cậu bé thấy con ngựa.
коро́ва|con bò|n|fa;pl=коро́вы|В деревне корова.|Ở quê có con bò.
пти́ца|con chim|n|fa;pl=пти́цы|Птица поёт.|Con chim hót.
кот|con mèo (đực)|n|ma;pl=коты́|Я люблю кота.|Tôi yêu con mèo.
медве́дь|con gấu|n|ma;pl=медве́ди|В лесу медведь.|Trong rừng có con gấu.
кого́|ai (đối cách, sinh cách)|q||Кого ты ждёшь?|Cậu đang đợi ai?
меня́|tôi (đối cách, sinh cách)|pron||Ты меня понимаешь?|Cậu hiểu tôi không?
тебя́|bạn (đối cách, sinh cách)|pron||Я тебя люблю.|Anh yêu em.
#L20 Đi bộ hay đi xe: идти и ехать
идти́|đi bộ (một hướng, đang đi)|v|иду́,идёшь,иду́т;past=шёл,шла,шло,шли|Я иду домой.|Tôi đang đi bộ về nhà.
куда́|đi đâu (hướng tới)|q||Куда ты идёшь?|Cậu đi đâu thế?
отку́да|từ đâu|q||Откуда вы? — Из Вьетнама.|Anh từ đâu đến? — Từ Việt Nam.
домо́й|về nhà|adv||Мы едем домой.|Chúng tôi đi xe về nhà.
туда́|đến đó|adv||Я иду туда.|Tôi đi đến đó.
сюда́|đến đây|adv||Иди сюда!|Lại đây!
бежа́ть|chạy (một hướng)|v|бегу́,бежи́шь,бежи́т,бежи́м,бежи́те,бегу́т|Я бегу на автобус.|Tôi chạy cho kịp xe buýt.
лете́ть|bay (một hướng)|v|лечу́,лети́шь,летя́т|Самолёт летит в Ханой.|Máy bay bay tới Hà Nội.
плыть|bơi (một hướng)|v|плыву́,плывёшь,плыву́т|Рыба плывёт.|Con cá đang bơi.
нести́|mang (đi bộ, một hướng)|v|несу́,несёшь,несу́т;past=нёс,несла́,несло́,несли́|Я несу сумку.|Tôi đang xách túi.
везти́|chở (bằng xe, một hướng)|v|везу́,везёшь,везу́т;past=вёз,везла́,везло́,везли́|Папа везёт нас в школу.|Bố chở chúng tôi đến trường.
сего́дня|hôm nay|adv||Сегодня понедельник.|Hôm nay là thứ Hai.
за́втра|ngày mai|adv||Завтра я еду в Москву.|Mai tôi đi Moskva.
вчера́|hôm qua|adv||Вчера было холодно.|Hôm qua trời lạnh.
у́тром|vào buổi sáng|adv||Утром я иду в университет.|Buổi sáng tôi đi học.
днём|vào ban ngày, buổi chiều|adv||Днём я работаю.|Ban ngày tôi làm việc.
ве́чером|vào buổi tối|adv||Вечером мы смотрим фильм.|Buổi tối chúng tôi xem phim.
но́чью|vào ban đêm|adv||Ночью я сплю.|Ban đêm tôi ngủ.
пото́м|sau đó|adv||Сначала урок, потом обед.|Trước là tiết học, sau đó ăn trưa.
тепе́рь|bây giờ (khác với trước)|adv||Теперь я живу в Москве.|Giờ tôi sống ở Moskva.
ско́ро|sắp, chẳng mấy chốc|adv||Скоро лето.|Sắp đến mùa hè rồi.
уже́|đã, rồi|adv||Уже поздно.|Muộn rồi.
опя́ть|lại (lần nữa)|adv||Опять дождь!|Lại mưa!
ра́но|sớm|adv||Я встаю рано.|Tôi dậy sớm.
по́здно|muộn|adv||Он приходит поздно.|Anh ấy về muộn.
`]);

if (typeof module !== 'undefined' && module.exports) module.exports = window.RU_WORDS_RAW;
