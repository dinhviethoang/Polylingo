/**
 * data/ru/dialogues.js — 10 bài hội thoại tiếng Nga đời thường trình độ A1 (PolyLingo tự soạn).
 * Viết gọn [người nói, câu tiếng Nga, nghĩa], rồi mở rộng thành { who, ru, tr, vi, zh, py }:
 * tr/py là phiên âm Latinh, zh = ru để các phần dùng chung (Hội thoại, Luyện nói) đọc được.
 * Cần data/ru/ru-core.js tải trước để có phiên âm.
 */
(function () {
  'use strict';
  const W = typeof window !== 'undefined' ? window : global;
  const tr = s => (W.RuCore ? W.RuCore.translit(s) : '');
  const line = ([who, ru, vi]) => ({ who, ru, tr: tr(ru), vi, zh: ru, py: tr(ru) });

  const RAW = [
    ['rd01', 'Chào hỏi và làm quen', [
      ['A', 'Здравствуйте! Меня зовут Нам. А как вас зовут?', 'Xin chào! Tôi tên là Nam. Còn chị tên gì?'],
      ['B', 'Здравствуйте! Меня зовут Анна. Очень приятно.', 'Chào anh! Tôi tên Anna. Rất vui được gặp.'],
      ['A', 'Мне тоже очень приятно. Вы студентка?', 'Tôi cũng rất vui. Chị là sinh viên à?'],
      ['B', 'Да, я студентка. А вы?', 'Vâng, tôi là sinh viên. Còn anh?'],
      ['A', 'Я тоже студент. Я из Вьетнама.', 'Tôi cũng là sinh viên. Tôi đến từ Việt Nam.'],
      ['B', 'Как интересно! Вы хорошо говорите по-русски.', 'Hay quá! Anh nói tiếng Nga giỏi đấy.'],
      ['A', 'Спасибо, но я говорю ещё немного.', 'Cảm ơn, nhưng tôi mới nói được chút ít.'],
      ['B', 'Ничего! До свидания, Нам!', 'Không sao! Tạm biệt anh Nam!']
    ]],
    ['rd02', 'Gia đình', [
      ['A', 'Это фотография твоей семьи?', 'Đây là ảnh gia đình cậu à?'],
      ['B', 'Да. Это мой папа, а это моя мама.', 'Ừ. Đây là bố tớ, còn đây là mẹ tớ.'],
      ['A', 'Кто твой папа по профессии?', 'Bố cậu làm nghề gì?'],
      ['B', 'Он инженер. А мама — врач.', 'Bố tớ là kỹ sư. Còn mẹ là bác sĩ.'],
      ['A', 'А это кто?', 'Thế đây là ai?'],
      ['B', 'Это мой брат и моя сестра.', 'Đây là anh trai và chị gái tớ.'],
      ['A', 'У тебя большая семья!', 'Nhà cậu đông người thật!'],
      ['B', 'Да, и ещё у нас есть собака.', 'Ừ, nhà tớ còn có một con chó nữa.']
    ]],
    ['rd03', 'Ở quán cà phê', [
      ['A', 'Добрый день! Что вы хотите?', 'Xin chào! Anh muốn dùng gì?'],
      ['B', 'Добрый день! Чёрный кофе, пожалуйста.', 'Chào chị! Cho tôi một cà phê đen.'],
      ['A', 'С сахаром?', 'Có đường không ạ?'],
      ['B', 'Нет, без сахара. И ещё пирожок с мясом.', 'Không đường. Thêm một bánh nướng nhân thịt.'],
      ['A', 'Хорошо. Что-нибудь ещё?', 'Vâng. Anh cần gì thêm không?'],
      ['B', 'Нет, спасибо. Сколько это стоит?', 'Không, cảm ơn. Bao nhiêu tiền vậy?'],
      ['A', 'Двести пятьдесят рублей.', 'Hai trăm năm mươi rúp.'],
      ['B', 'Можно картой?', 'Trả bằng thẻ được không?'],
      ['A', 'Да, конечно. Приятного аппетита!', 'Vâng, tất nhiên. Chúc ngon miệng!']
    ]],
    ['rd04', 'Hỏi đường đến ga tàu điện ngầm', [
      ['A', 'Извините, вы не знаете, где метро?', 'Xin lỗi, anh có biết ga tàu điện ngầm ở đâu không?'],
      ['B', 'Метро? Это недалеко. Идите прямо.', 'Ga tàu điện à? Không xa đâu. Chị đi thẳng.'],
      ['A', 'Прямо, а потом?', 'Đi thẳng, rồi sau đó?'],
      ['B', 'Потом на перекрёстке налево. Метро будет справа.', 'Đến ngã tư thì rẽ trái. Ga tàu sẽ ở bên phải.'],
      ['A', 'Это далеко? Можно идти пешком?', 'Có xa không? Đi bộ được không?'],
      ['B', 'Да, пять минут пешком.', 'Được, đi bộ năm phút.'],
      ['A', 'Большое спасибо!', 'Cảm ơn anh nhiều!'],
      ['B', 'Пожалуйста!', 'Không có gì!']
    ]],
    ['rd05', 'Mua áo khoác', [
      ['A', 'Здравствуйте! Можно посмотреть эту куртку?', 'Xin chào! Cho tôi xem chiếc áo khoác này được không?'],
      ['B', 'Конечно. Какой у вас размер?', 'Tất nhiên. Anh mặc cỡ nào?'],
      ['A', 'Сорок восьмой.', 'Cỡ bốn mươi tám.'],
      ['B', 'Вот, пожалуйста. Хотите примерить?', 'Đây ạ. Anh có muốn mặc thử không?'],
      ['A', 'Да, спасибо. Она мне нравится. Сколько она стоит?', 'Có, cảm ơn. Tôi thích nó. Giá bao nhiêu vậy?'],
      ['B', 'Пять тысяч рублей. Сегодня есть скидка десять процентов.', 'Năm nghìn rúp. Hôm nay được giảm mười phần trăm.'],
      ['A', 'Отлично! Я её возьму.', 'Tuyệt! Tôi lấy nó.'],
      ['B', 'Касса там, направо.', 'Quầy thu ngân ở đằng kia, bên phải.']
    ]],
    ['rd06', 'Một ngày của tôi', [
      ['A', 'Во сколько ты обычно встаёшь?', 'Cậu thường dậy lúc mấy giờ?'],
      ['B', 'Обычно в семь часов. А ты?', 'Thường là bảy giờ. Còn cậu?'],
      ['A', 'Я встаю рано, в шесть. Утром я бегаю в парке.', 'Tớ dậy sớm, lúc sáu giờ. Buổi sáng tớ chạy bộ trong công viên.'],
      ['B', 'Молодец! А когда ты завтракаешь?', 'Giỏi thế! Thế cậu ăn sáng lúc nào?'],
      ['A', 'В семь. Потом еду в университет на автобусе.', 'Lúc bảy giờ. Sau đó đi xe buýt đến trường.'],
      ['B', 'Лекции начинаются в девять?', 'Bài giảng bắt đầu lúc chín giờ à?'],
      ['A', 'Да, и кончаются в три. Вечером я учу русский.', 'Ừ, và kết thúc lúc ba giờ. Buổi tối tớ học tiếng Nga.'],
      ['B', 'А когда ты ложишься спать?', 'Thế cậu đi ngủ lúc mấy giờ?'],
      ['A', 'В одиннадцать.', 'Lúc mười một giờ.']
    ]],
    ['rd07', 'Cuối tuần', [
      ['A', 'Что ты делал в субботу?', 'Thứ Bảy cậu làm gì?'],
      ['B', 'Я был в музее с другом. А ты?', 'Tớ đi bảo tàng với bạn. Còn cậu?'],
      ['A', 'Я ездил на дачу к бабушке.', 'Tớ về nhà nghỉ ngoại ô thăm bà.'],
      ['B', 'Было весело?', 'Có vui không?'],
      ['A', 'Да! Мы гуляли в лесу и купались в озере.', 'Vui! Bọn tớ đi dạo trong rừng và tắm hồ.'],
      ['B', 'Здорово! А что ты будешь делать в воскресенье?', 'Tuyệt! Thế Chủ nhật cậu sẽ làm gì?'],
      ['A', 'Ещё не знаю. Может быть, пойду в кино.', 'Chưa biết nữa. Có lẽ sẽ đi xem phim.'],
      ['B', 'Давай пойдём вместе!', 'Đi cùng nhau đi!'],
      ['A', 'Давай!', 'Đi thôi!']
    ]],
    ['rd08', 'Đi khám bác sĩ', [
      ['A', 'Здравствуйте, доктор.', 'Chào bác sĩ.'],
      ['B', 'Здравствуйте. Что у вас болит?', 'Chào anh. Anh đau ở đâu?'],
      ['A', 'У меня болит голова и горло.', 'Tôi đau đầu và đau họng.'],
      ['B', 'Температура есть?', 'Có sốt không?'],
      ['A', 'Да, тридцать восемь.', 'Có, ba mươi tám độ.'],
      ['B', 'Это грипп. Вам нужно лежать дома три дня.', 'Đây là cúm. Anh cần nằm nghỉ ở nhà ba ngày.'],
      ['A', 'Какое лекарство мне принимать?', 'Tôi cần uống thuốc gì?'],
      ['B', 'Вот рецепт. Пейте много чая с лимоном.', 'Đây là đơn thuốc. Uống nhiều trà chanh vào.'],
      ['A', 'Спасибо, доктор!', 'Cảm ơn bác sĩ!'],
      ['B', 'Выздоравливайте!', 'Chóng khỏe nhé!']
    ]],
    ['rd09', 'Thời tiết', [
      ['A', 'Какая сегодня погода?', 'Hôm nay thời tiết thế nào?'],
      ['B', 'Сегодня холодно, минус десять. И идёт снег.', 'Hôm nay lạnh, âm mười độ. Lại có tuyết rơi.'],
      ['A', 'Ой, мне холодно! Во Вьетнаме сейчас тепло.', 'Ôi, lạnh quá! Ở Việt Nam bây giờ ấm áp.'],
      ['B', 'А какая погода в Ханое зимой?', 'Thế mùa đông ở Hà Nội thời tiết thế nào?'],
      ['A', 'Зимой в Ханое прохладно, плюс пятнадцать.', 'Mùa đông Hà Nội se lạnh, khoảng mười lăm độ.'],
      ['B', 'Это не зима, это весна!', 'Thế thì không phải mùa đông, là mùa xuân rồi!'],
      ['A', 'Тебе нравится русская зима?', 'Cậu có thích mùa đông Nga không?'],
      ['B', 'Да, очень! Зимой можно кататься на лыжах.', 'Có, rất thích! Mùa đông có thể đi trượt tuyết.']
    ]],
    ['rd10', 'Mua vé tàu ở nhà ga', [
      ['A', 'Здравствуйте! Один билет до Санкт-Петербурга, пожалуйста.', 'Xin chào! Cho tôi một vé đi Sankt-Peterburg.'],
      ['B', 'На какое число?', 'Ngày nào ạ?'],
      ['A', 'На завтра.', 'Ngày mai.'],
      ['B', 'Есть поезд в восемь утра и в два часа дня.', 'Có chuyến lúc tám giờ sáng và hai giờ chiều.'],
      ['A', 'В восемь утра, пожалуйста. Сколько стоит билет?', 'Chuyến tám giờ sáng ạ. Vé bao nhiêu tiền?'],
      ['B', 'Три тысячи рублей. Ваш паспорт, пожалуйста.', 'Ba nghìn rúp. Cho tôi xem hộ chiếu.'],
      ['A', 'Вот, пожалуйста. С какой платформы отходит поезд?', 'Đây ạ. Tàu chạy từ sân ga nào?'],
      ['B', 'С первой платформы. Счастливого пути!', 'Từ sân ga số một. Chúc thượng lộ bình an!']
    ]]
  ];

  const DIALOGUES = RAW.map(([id, title, lines]) => ({ id, title, lines: lines.map(line) }));
  W.RU_DIALOGUES = DIALOGUES;
  if (typeof module !== 'undefined' && module.exports) module.exports = DIALOGUES;
})();
