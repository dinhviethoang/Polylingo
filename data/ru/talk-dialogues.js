/**
 * data/ru/talk-dialogues.js — 10 hội thoại tiếng Nga A1 cho chế độ "Đóng vai A–B" của Luyện nói (PolyLingo tự soạn).
 * Cấu trúc như bản tiếng Nhật: { id, title, scene, roleA, roleB, sentences: [{ who, ru, tr, vi, zh, py }] }.
 * Cần data/ru/ru-core.js tải trước để có phiên âm.
 */
(function () {
  'use strict';
  const W = typeof window !== 'undefined' ? window : global;
  const tr = s => (W.RuCore ? W.RuCore.translit(s) : '');
  const sent = ([who, ru, vi]) => ({ who, ru, tr: tr(ru), vi, zh: ru, py: tr(ru) });

  const RAW = [
    ['rtd01', 'Mua hoa quả ở chợ', 'Ở sạp hoa quả trong chợ, bạn hỏi giá táo, mua thêm chuối và trả tiền.', ['Khách mua (Bạn)', 'Khách', '🛒'], ['Người bán hoa quả', 'Người bán', '🍎'], [
      ['A', 'Здравствуйте! Сколько стоят яблоки?', 'Chào bác! Táo bao nhiêu tiền ạ?'],
      ['B', 'Сто двадцать рублей за килограмм.', 'Một trăm hai mươi rúp một cân.'],
      ['A', 'Дайте, пожалуйста, два килограмма.', 'Bác cho cháu hai cân ạ.'],
      ['B', 'Хорошо. Что ещё?', 'Được. Còn gì nữa không?'],
      ['A', 'А бананы у вас есть?', 'Bác có chuối không ạ?'],
      ['B', 'Есть. Вот, очень хорошие бананы.', 'Có. Đây, chuối rất ngon.'],
      ['A', 'Тогда ещё один килограмм бананов. Сколько всё стоит?', 'Vậy thêm một cân chuối. Tất cả bao nhiêu ạ?'],
      ['B', 'Триста двадцать рублей.', 'Ba trăm hai mươi rúp.'],
      ['A', 'Вот пятьсот.', 'Gửi bác năm trăm.'],
      ['B', 'Ваша сдача — сто восемьдесят рублей. Спасибо!', 'Tiền thừa của cháu là một trăm tám mươi rúp. Cảm ơn!']
    ]],
    ['rtd02', 'Gọi món ở nhà hàng', 'Hai người vào nhà hàng Nga, xin bàn, nhờ gợi ý món, gọi đồ uống và xin hóa đơn.', ['Khách (Bạn)', 'Khách', '🍽️'], ['Bồi bàn', 'Bồi bàn', '🧑‍🍳'], [
      ['A', 'Добрый вечер! Столик на двоих, пожалуйста.', 'Chào buổi tối! Cho một bàn hai người.'],
      ['B', 'Пожалуйста, вот сюда. Вот меню.', 'Mời anh chị vào đây. Thực đơn đây ạ.'],
      ['A', 'Что вы нам посоветуете?', 'Anh gợi ý cho chúng tôi món gì?'],
      ['B', 'Попробуйте наш борщ и пельмени.', 'Anh chị thử canh borsch và pelmeni nhé.'],
      ['A', 'Хорошо. Два борща и пельмени со сметаной.', 'Được. Hai bát borsch và pelmeni với kem chua.'],
      ['B', 'Что будете пить?', 'Anh chị uống gì ạ?'],
      ['A', 'Чай с лимоном и сок.', 'Trà chanh và nước ép.'],
      ['B', 'Хорошо, сейчас принесу.', 'Vâng, tôi mang ra ngay.'],
      ['A', 'Извините, принесите, пожалуйста, счёт.', 'Xin lỗi, làm ơn mang hóa đơn.'],
      ['B', 'Конечно. Вот ваш счёт.', 'Vâng. Hóa đơn của anh đây.']
    ]],
    ['rtd03', 'Nhận phòng khách sạn', 'Bạn đến quầy lễ tân, báo đã đặt phòng, đưa hộ chiếu và hỏi về bữa sáng, internet.', ['Khách (Bạn)', 'Khách', '🧳'], ['Lễ tân', 'Lễ tân', '🛎️'], [
      ['A', 'Здравствуйте! У меня забронирован номер.', 'Xin chào! Tôi đã đặt phòng.'],
      ['B', 'Здравствуйте! Ваша фамилия?', 'Xin chào! Họ của anh là gì?'],
      ['A', 'Нгуен. Нгуен Ван Нам.', 'Nguyễn. Nguyễn Văn Nam.'],
      ['B', 'Да, есть. Номер на три ночи. Ваш паспорт, пожалуйста.', 'Vâng, có. Phòng ba đêm. Cho xem hộ chiếu ạ.'],
      ['A', 'Вот, пожалуйста. Завтрак включён?', 'Đây ạ. Có bao gồm bữa sáng không?'],
      ['B', 'Да, завтрак с семи до десяти.', 'Có, bữa sáng từ bảy đến mười giờ.'],
      ['A', 'А в номере есть интернет?', 'Trong phòng có internet không?'],
      ['B', 'Да, вот пароль. Ваш номер двести пять, второй этаж.', 'Có, mật khẩu đây. Phòng anh là 205, tầng hai.'],
      ['A', 'Спасибо большое!', 'Cảm ơn nhiều!'],
      ['B', 'Хорошего отдыха!', 'Chúc anh nghỉ ngơi vui vẻ!']
    ]],
    ['rtd04', 'Đi taxi ra sân bay', 'Bạn bắt taxi ra sân bay, hỏi có kịp giờ không, hỏi giá và cách trả tiền.', ['Hành khách (Bạn)', 'Khách', '✈️'], ['Tài xế', 'Tài xế', '🚕'], [
      ['A', 'Здравствуйте! Мне нужно в аэропорт.', 'Xin chào! Tôi cần đến sân bay.'],
      ['B', 'Хорошо, садитесь. Какой аэропорт?', 'Được, mời lên xe. Sân bay nào?'],
      ['A', 'Шереметьево, пожалуйста. Мы успеем к шести часам?', 'Sheremetyevo ạ. Có kịp trước sáu giờ không?'],
      ['B', 'Сейчас пробки, но думаю, успеем.', 'Giờ đang tắc đường, nhưng tôi nghĩ kịp.'],
      ['A', 'Сколько стоит поездка?', 'Chuyến đi hết bao nhiêu tiền?'],
      ['B', 'Примерно две тысячи рублей.', 'Khoảng hai nghìn rúp.'],
      ['A', 'Можно заплатить картой?', 'Trả bằng thẻ được không?'],
      ['B', 'Да, можно.', 'Được.'],
      ['A', 'Вот мы и приехали. Спасибо!', 'Đến nơi rồi. Cảm ơn anh!'],
      ['B', 'Счастливого полёта!', 'Chúc chuyến bay vui vẻ!']
    ]],
    ['rtd05', 'Làm thẻ thư viện', 'Bạn muốn mượn sách ở thư viện trường, hỏi cách làm thẻ và thời gian mượn.', ['Sinh viên (Bạn)', 'Sinh viên', '🎒'], ['Thủ thư', 'Thủ thư', '📚'], [
      ['A', 'Здравствуйте! Я хочу взять эту книгу.', 'Xin chào! Tôi muốn mượn cuốn sách này.'],
      ['B', 'Здравствуйте! У вас есть читательский билет?', 'Chào bạn! Bạn có thẻ thư viện không?'],
      ['A', 'Нет. Как его получить?', 'Không ạ. Làm thế nào để có thẻ?'],
      ['B', 'Нужен паспорт и студенческий билет.', 'Cần hộ chiếu và thẻ sinh viên.'],
      ['A', 'Вот, пожалуйста.', 'Đây ạ.'],
      ['B', 'Спасибо. Вот ваш читательский билет.', 'Cảm ơn. Thẻ thư viện của bạn đây.'],
      ['A', 'На сколько дней можно взять книгу?', 'Tôi được mượn sách mấy ngày?'],
      ['B', 'На две недели.', 'Hai tuần.'],
      ['A', 'Спасибо! А где можно читать журналы?', 'Cảm ơn! Đọc tạp chí ở đâu ạ?'],
      ['B', 'В читальном зале, на втором этаже.', 'Ở phòng đọc, tầng hai.']
    ]],
    ['rtd06', 'Gọi điện mời bạn dự sinh nhật', 'Bạn gọi cho Masha, mời đến dự sinh nhật vào tối thứ Sáu và cho địa chỉ.', ['Nam (Bạn)', 'Nam', '📱'], ['Masha', 'Masha', '🎉'], [
      ['A', 'Алло, Маша? Привет, это Нам.', 'Alô, Masha à? Chào, Nam đây.'],
      ['B', 'Привет, Нам! Как дела?', 'Chào Nam! Dạo này thế nào?'],
      ['A', 'Хорошо, спасибо. Что ты делаешь в пятницу вечером?', 'Tốt, cảm ơn. Tối thứ Sáu cậu làm gì?'],
      ['B', 'Пока не знаю. А что?', 'Chưa biết. Sao thế?'],
      ['A', 'У меня день рождения. Приходи ко мне в гости!', 'Sinh nhật tớ. Đến nhà tớ chơi nhé!'],
      ['B', 'С удовольствием! Во сколько?', 'Rất sẵn lòng! Mấy giờ?'],
      ['A', 'В семь часов. Мой адрес: улица Пушкина, дом десять.', 'Lúc bảy giờ. Địa chỉ: phố Pushkin, nhà số mười.'],
      ['B', 'Хорошо, я обязательно приду.', 'Được, tớ nhất định sẽ đến.'],
      ['A', 'Отлично! До пятницы!', 'Tuyệt! Hẹn thứ Sáu!'],
      ['B', 'Пока!', 'Chào nhé!']
    ]],
    ['rtd07', 'Mua thuốc ở hiệu thuốc', 'Bạn bị đau họng, nhờ dược sĩ tư vấn thuốc, hỏi cách uống và giá.', ['Khách (Bạn)', 'Khách', '🤒'], ['Dược sĩ', 'Dược sĩ', '💊'], [
      ['A', 'Здравствуйте! У меня болит горло. Что вы посоветуете?', 'Xin chào! Tôi bị đau họng. Chị khuyên tôi dùng gì?'],
      ['B', 'Вот хорошие таблетки. Принимайте три раза в день.', 'Đây là loại viên tốt. Uống ngày ba lần.'],
      ['A', 'До еды или после еды?', 'Trước hay sau khi ăn ạ?'],
      ['B', 'После еды.', 'Sau khi ăn.'],
      ['A', 'А от температуры у вас что-нибудь есть?', 'Chị có thuốc hạ sốt không?'],
      ['B', 'Да, вот это лекарство.', 'Có, thuốc này đây.'],
      ['A', 'Сколько с меня?', 'Tôi phải trả bao nhiêu?'],
      ['B', 'Четыреста рублей.', 'Bốn trăm rúp.'],
      ['A', 'Спасибо!', 'Cảm ơn!'],
      ['B', 'Выздоравливайте!', 'Chóng khỏe nhé!']
    ]],
    ['rtd08', 'Gửi thư và bưu kiện', 'Ở bưu điện, bạn gửi thư và bưu kiện về Việt Nam, hỏi giá và thời gian.', ['Khách (Bạn)', 'Khách', '✉️'], ['Nhân viên bưu điện', 'Nhân viên', '📮'], [
      ['A', 'Здравствуйте! Я хочу отправить письмо во Вьетнам.', 'Xin chào! Tôi muốn gửi thư về Việt Nam.'],
      ['B', 'Обычное или заказное?', 'Thư thường hay thư bảo đảm?'],
      ['A', 'Обычное. Сколько стоит?', 'Thư thường. Giá bao nhiêu ạ?'],
      ['B', 'Сто рублей. Вот марки.', 'Một trăm rúp. Tem đây.'],
      ['A', 'А посылку можно отправить?', 'Gửi bưu kiện được không ạ?'],
      ['B', 'Можно. Что в посылке?', 'Được. Trong bưu kiện có gì?'],
      ['A', 'Книги и сувениры для семьи.', 'Sách và quà lưu niệm cho gia đình.'],
      ['B', 'Хорошо. Напишите адрес здесь.', 'Được. Viết địa chỉ vào đây.'],
      ['A', 'Когда посылка придёт?', 'Khi nào bưu kiện đến nơi?'],
      ['B', 'Примерно через три недели.', 'Khoảng ba tuần nữa.']
    ]],
    ['rtd09', 'Chọn quà sinh nhật cho mẹ', 'Hai anh em bàn nhau nên tặng mẹ món quà gì nhân dịp sinh nhật.', ['Em (Bạn)', 'Em', '🎁'], ['Chị gái', 'Chị', '💐'], [
      ['A', 'Скоро день рождения мамы. Что ей подарить?', 'Sắp sinh nhật mẹ rồi. Tặng mẹ cái gì nhỉ?'],
      ['B', 'Подари ей цветы. Мама любит цветы.', 'Tặng mẹ hoa đi. Mẹ thích hoa.'],
      ['A', 'Цветы — это хорошо, но я хочу ещё подарок.', 'Hoa thì được, nhưng em muốn có thêm quà.'],
      ['B', 'Может быть, книгу? Она любит читать.', 'Có lẽ là sách? Mẹ thích đọc sách.'],
      ['A', 'Хорошая идея! Какую книгу?', 'Ý hay! Sách gì ạ?'],
      ['B', 'Роман о любви или книгу о Вьетнаме.', 'Tiểu thuyết tình yêu hoặc sách về Việt Nam.'],
      ['A', 'Давай пойдём в книжный магазин вместе.', 'Mình cùng đi hiệu sách đi.'],
      ['B', 'Давай, в субботу.', 'Được, thứ Bảy nhé.']
    ]],
    ['rtd10', 'Làm quen hàng xóm mới', 'Bạn vừa chuyển đến căn hộ mới và chào hỏi bác hàng xóm.', ['Nam (Bạn)', 'Nam', '🏠'], ['Bác Olga', 'Hàng xóm', '👵'], [
      ['A', 'Здравствуйте! Я ваш новый сосед. Меня зовут Нам.', 'Xin chào! Tôi là hàng xóm mới. Tôi tên Nam.'],
      ['B', 'Здравствуйте! Я Ольга Ивановна. Очень приятно.', 'Chào anh! Tôi là Olga Ivanovna. Rất hân hạnh.'],
      ['A', 'Мне тоже. Я живу в квартире двенадцать.', 'Tôi cũng vậy. Tôi sống ở căn hộ mười hai.'],
      ['B', 'А я в квартире четырнадцать. Вы студент?', 'Còn tôi ở căn mười bốn. Anh là sinh viên à?'],
      ['A', 'Да, я учусь в университете.', 'Vâng, tôi học ở trường đại học.'],
      ['B', 'Если нужна помощь, звоните. Вот мой телефон.', 'Nếu cần giúp đỡ cứ gọi. Đây là số điện thoại của tôi.'],
      ['A', 'Большое спасибо! Скажите, где здесь магазин?', 'Cảm ơn bác nhiều! Bác cho hỏi cửa hàng ở đâu ạ?'],
      ['B', 'Рядом, за углом.', 'Ngay gần, ở góc phố.'],
      ['A', 'Спасибо! До свидания!', 'Cảm ơn! Tạm biệt!'],
      ['B', 'До свидания!', 'Tạm biệt!']
    ]]
  ];

  const role = ([name, char, avatar]) => ({ name, char, avatar });
  const TALK_DIALOGUES = RAW.map(([id, title, scene, a, b, lines]) => ({ id, title, scene, roleA: role(a), roleB: role(b), sentences: lines.map(sent) }));
  W.RU_TALK_DIALOGUES = TALK_DIALOGUES;
  if (typeof module !== 'undefined' && module.exports) module.exports = TALK_DIALOGUES;
})();
