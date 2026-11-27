/**
 * data/ru/talk-scenarios.js — 8 tình huống nhập vai tiếng Nga A1 cho Luyện nói (PolyLingo tự soạn).
 * Cấu trúc turns t1.. như bản tiếng Nhật. Câu viết gọn [tiếng Nga, nghĩa], mở rộng thành { ru, vi, zh, py }.
 * accept.anyOf là các từ khóa viết thường, không dấu trọng âm, dùng е thay ё (máy nhận giọng nói hay trả е).
 * Cần data/ru/ru-core.js tải trước để có phiên âm.
 */
(function () {
  'use strict';
  const W = typeof window !== 'undefined' ? window : global;
  const tr = s => (W.RuCore ? W.RuCore.translit(s) : '');
  const say = ([ru, vi]) => ({ ru, vi, zh: ru, py: tr(ru) });
  const FALLBACK = 'Извините, повторите, пожалуйста. (Xin lỗi, bạn nói lại được không?)';
  const avatar = c => `<svg viewBox="0 0 40 40" width="40" height="40" fill="none"><circle cx="20" cy="20" r="20" fill="${c}22"/><path d="M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z" fill="${c}"/></svg>`;

  const RAW = [
    ['kafe', 'Gọi đồ uống ở quán cà phê', 'Gọi cà phê, chọn có sữa hay không, gọi thêm bánh và trả tiền.', 'Ăn uống', ['Ксения', 'Nhân viên quán cà phê', '#1D4E9E', 'КС'], [
      [['Здравствуйте! Что вы хотите?', 'Xin chào! Anh/chị muốn dùng gì?'], 'Gọi một cà phê', [['Кофе, пожалуйста.', 'Cho tôi cà phê.'], ['Я хочу кофе.', 'Tôi muốn cà phê.']], ['кофе', 'чай', 'сок']],
      [['С молоком или без молока?', 'Có sữa hay không sữa ạ?'], 'Chọn có sữa hoặc không sữa', [['С молоком, пожалуйста.', 'Có sữa ạ.'], ['Без молока.', 'Không sữa.']], ['молок', 'без', 'да', 'нет']],
      [['Что-нибудь ещё?', 'Anh/chị cần gì thêm không?'], 'Gọi thêm bánh hoặc nói không cần', [['Да, пирожок, пожалуйста.', 'Có, cho tôi một bánh nướng.'], ['Нет, спасибо.', 'Không, cảm ơn.']], ['пирож', 'торт', 'нет', 'спасибо', 'да']],
      [['С вас двести рублей.', 'Của anh/chị là hai trăm rúp.'], 'Hỏi trả bằng thẻ hoặc đưa tiền', [['Можно картой?', 'Trả bằng thẻ được không?'], ['Вот, пожалуйста.', 'Gửi chị.']], ['карт', 'вот', 'пожалуйста', 'налич']]
    ]],
    ['vokzal', 'Mua vé tàu đi Moskva', 'Nói nơi muốn đến, chọn ngày, chọn chuyến và thanh toán ở quầy vé.', 'Đi lại', ['Игорь', 'Nhân viên bán vé', '#0F766E', 'ИГ'], [
      [['Здравствуйте! Куда вы едете?', 'Xin chào! Anh/chị đi đâu?'], 'Nói muốn đi Moskva', [['В Москву, пожалуйста.', 'Đi Moskva ạ.'], ['Мне нужен билет в Москву.', 'Tôi cần một vé đi Moskva.']], ['москв']],
      [['На какое число?', 'Ngày nào ạ?'], 'Nói ngày mai', [['На завтра.', 'Ngày mai.'], ['Завтра, пожалуйста.', 'Ngày mai ạ.']], ['завтра', 'сегодня', 'суббот', 'понедельник', 'пятниц']],
      [['Есть поезд утром и вечером. Какой вам удобно?', 'Có chuyến sáng và chuyến tối. Anh/chị chọn chuyến nào?'], 'Chọn chuyến buổi sáng', [['Утром, пожалуйста.', 'Chuyến sáng ạ.'], ['Утренний поезд.', 'Chuyến tàu buổi sáng.']], ['утр', 'вечер']],
      [['Билет стоит две тысячи рублей.', 'Vé giá hai nghìn rúp.'], 'Đồng ý và trả tiền', [['Хорошо, вот деньги.', 'Được, tiền đây.'], ['Можно картой?', 'Trả bằng thẻ được không?']], ['хорошо', 'вот', 'карт', 'деньги']]
    ]],
    ['restoran', 'Gọi món ở nhà hàng Nga', 'Gọi canh borsch, chọn đồ uống, khen món ăn và xin hóa đơn.', 'Ăn uống', ['Дмитрий', 'Bồi bàn', '#B45309', 'ДМ'], [
      [['Добрый вечер! Вы готовы заказать?', 'Chào buổi tối! Anh/chị gọi món chưa ạ?'], 'Gọi canh borsch', [['Да, борщ, пожалуйста.', 'Rồi, cho tôi canh borsch.'], ['Я хочу борщ.', 'Tôi muốn ăn borsch.']], ['борщ', 'суп', 'пельмен', 'салат']],
      [['Что будете пить?', 'Anh/chị uống gì ạ?'], 'Gọi trà hoặc nước', [['Чай, пожалуйста.', 'Cho tôi trà.'], ['Воду, пожалуйста.', 'Cho tôi nước lọc.']], ['чай', 'вод', 'сок', 'кофе']],
      [['Всё было вкусно?', 'Các món có ngon không ạ?'], 'Khen món ăn ngon', [['Да, очень вкусно!', 'Có, rất ngon!'], ['Спасибо, всё было вкусно.', 'Cảm ơn, mọi thứ đều ngon.']], ['вкусн', 'хорошо', 'отлично', 'да']],
      [['Что-нибудь ещё?', 'Anh/chị cần gì thêm không?'], 'Xin hóa đơn', [['Счёт, пожалуйста.', 'Cho tôi hóa đơn.'], ['Принесите, пожалуйста, счёт.', 'Làm ơn mang hóa đơn.']], ['счет', 'счёт']]
    ]],
    ['doroga', 'Hỏi đường đến ga tàu điện ngầm', 'Nhờ người đi đường chỉ ga tàu điện, nhắc lại đường đi và cảm ơn.', 'Đi lại', ['Светлана', 'Người đi đường', '#7C3AED', 'СВ'], [
      [['Вам помочь?', 'Anh/chị cần giúp gì không?'], 'Hỏi đường đến ga tàu điện ngầm', [['Да, скажите, пожалуйста, где метро?', 'Vâng, làm ơn cho hỏi ga tàu điện ở đâu?'], ['Как пройти к метро?', 'Đi đến ga tàu điện thế nào?']], ['метро']],
      [['Идите прямо, потом налево. Понятно?', 'Đi thẳng, rồi rẽ trái. Hiểu không?'], 'Nhắc lại hoặc nói đã hiểu', [['Прямо, потом налево. Понятно!', 'Đi thẳng rồi rẽ trái. Hiểu rồi!'], ['Да, понятно.', 'Vâng, hiểu rồi.']], ['прямо', 'налево', 'понятно', 'да']],
      [['Метро недалеко, пять минут пешком.', 'Ga tàu không xa, đi bộ năm phút.'], 'Cảm ơn người chỉ đường', [['Спасибо большое!', 'Cảm ơn nhiều!'], ['Спасибо, до свидания!', 'Cảm ơn, tạm biệt!']], ['спасибо']]
    ]],
    ['znakomstvo', 'Tự giới thiệu với bạn mới', 'Nói tên, quê quán, việc đang làm ở Nga và đáp lại lời khen.', 'Giao tiếp', ['Маша', 'Bạn cùng lớp', '#DB2777', 'МА'], [
      [['Привет! Как тебя зовут?', 'Chào! Bạn tên gì?'], 'Nói tên của mình', [['Меня зовут Нам.', 'Mình tên là Nam.'], ['Привет! Я Нам.', 'Chào! Mình là Nam.']], ['зовут', 'я ']],
      [['Очень приятно! Откуда ты?', 'Rất vui! Bạn đến từ đâu?'], 'Nói mình đến từ Việt Nam', [['Я из Вьетнама.', 'Mình đến từ Việt Nam.'], ['Из Вьетнама, из Ханоя.', 'Từ Việt Nam, từ Hà Nội.']], ['вьетнам', 'ханой']],
      [['Что ты делаешь в Москве?', 'Bạn làm gì ở Moskva?'], 'Nói mình là sinh viên, học tiếng Nga', [['Я студент, учу русский язык.', 'Mình là sinh viên, học tiếng Nga.'], ['Я учусь в университете.', 'Mình học đại học.']], ['студент', 'уч', 'работ']],
      [['Ты хорошо говоришь по-русски!', 'Bạn nói tiếng Nga giỏi đấy!'], 'Cảm ơn và nói mình mới biết chút ít', [['Спасибо! Я говорю немного.', 'Cảm ơn! Mình nói được chút thôi.'], ['Спасибо большое!', 'Cảm ơn nhiều!']], ['спасибо', 'немного']]
    ]],
    ['magazin', 'Mua áo khoác', 'Xin xem áo, nói cỡ, mặc thử và quyết định mua.', 'Mua sắm', ['Елена', 'Nhân viên bán hàng', '#059669', 'ЕЛ'], [
      [['Здравствуйте! Вам помочь?', 'Xin chào! Tôi giúp gì được ạ?'], 'Nói muốn xem áo khoác', [['Да, покажите, пожалуйста, эту куртку.', 'Vâng, cho tôi xem chiếc áo khoác này.'], ['Я хочу посмотреть куртку.', 'Tôi muốn xem áo khoác.']], ['куртк', 'посмотр', 'покаж']],
      [['Какой у вас размер?', 'Anh/chị mặc cỡ nào?'], 'Nói cỡ 48', [['Сорок восьмой.', 'Cỡ bốn mươi tám.'], ['Мой размер сорок восемь.', 'Cỡ của tôi là bốn mươi tám.']], ['сорок', 'размер', '48']],
      [['Вот, пожалуйста. Хотите примерить?', 'Đây ạ. Anh/chị có muốn thử không?'], 'Đồng ý mặc thử', [['Да, можно примерить?', 'Có, tôi thử được không?'], ['Да, спасибо.', 'Có, cảm ơn.']], ['да', 'пример', 'можно']],
      [['Она стоит пять тысяч рублей.', 'Áo này giá năm nghìn rúp.'], 'Nói sẽ lấy hoặc hỏi giảm giá', [['Хорошо, я её возьму.', 'Được, tôi lấy nó.'], ['Есть скидка?', 'Có giảm giá không?']], ['возьм', 'скидк', 'хорошо', 'дорого']]
    ]],
    ['vrach', 'Đi khám bác sĩ', 'Kể triệu chứng, nói nhiệt độ, hỏi cách uống thuốc và cảm ơn bác sĩ.', 'Sức khỏe', ['Доктор Петров', 'Bác sĩ', '#DC2626', 'ДП'], [
      [['Здравствуйте! Что у вас болит?', 'Chào anh/chị! Anh/chị đau ở đâu?'], 'Nói bị đau đầu', [['У меня болит голова.', 'Tôi bị đau đầu.'], ['Голова болит.', 'Đau đầu ạ.']], ['болит', 'голов', 'горл', 'живот']],
      [['Температура есть?', 'Có sốt không?'], 'Nói có sốt 38 độ', [['Да, тридцать восемь.', 'Có, ba mươi tám độ.'], ['Да, у меня температура.', 'Có, tôi bị sốt.']], ['температур', 'да', 'тридцать', 'нет']],
      [['Вам нужно отдыхать дома три дня. Вот лекарство.', 'Anh/chị cần nghỉ ở nhà ba ngày. Thuốc đây.'], 'Hỏi cách uống thuốc', [['Как принимать лекарство?', 'Uống thuốc thế nào ạ?'], ['Сколько раз в день?', 'Mỗi ngày mấy lần ạ?']], ['как', 'сколько', 'спасибо', 'лекарств']],
      [['Три раза в день после еды. Выздоравливайте!', 'Ngày ba lần sau khi ăn. Chóng khỏe nhé!'], 'Cảm ơn bác sĩ', [['Спасибо, доктор!', 'Cảm ơn bác sĩ!'], ['Большое спасибо! До свидания.', 'Cảm ơn nhiều! Tạm biệt.']], ['спасибо', 'свидания']]
    ]],
    ['gostinica', 'Nhận phòng khách sạn', 'Báo đã đặt phòng, đưa hộ chiếu, hỏi internet và cảm ơn lễ tân.', 'Du lịch', ['Анастасия', 'Lễ tân khách sạn', '#2563EB', 'АН'], [
      [['Добрый вечер! Чем могу помочь?', 'Chào buổi tối! Tôi giúp gì được ạ?'], 'Nói đã đặt phòng', [['У меня забронирован номер.', 'Tôi đã đặt phòng.'], ['Я хочу номер на две ночи.', 'Tôi muốn một phòng hai đêm.']], ['номер', 'заброн']],
      [['Ваш паспорт, пожалуйста.', 'Cho tôi xem hộ chiếu ạ.'], 'Đưa hộ chiếu', [['Вот, пожалуйста.', 'Đây ạ.'], ['Вот мой паспорт.', 'Hộ chiếu của tôi đây.']], ['вот', 'паспорт', 'пожалуйста']],
      [['Ваш номер триста один. Завтрак в семь часов.', 'Phòng của anh/chị là 301. Bữa sáng lúc bảy giờ.'], 'Hỏi trong phòng có internet không', [['Спасибо. В номере есть интернет?', 'Cảm ơn. Trong phòng có internet không?'], ['Где лифт?', 'Thang máy ở đâu ạ?']], ['интернет', 'лифт', 'спасибо']],
      [['Да, пароль на карте. Хорошего отдыха!', 'Có, mật khẩu ghi trên thẻ. Chúc nghỉ ngơi vui vẻ!'], 'Cảm ơn lễ tân', [['Спасибо большое!', 'Cảm ơn nhiều!'], ['Спасибо, до свидания!', 'Cảm ơn, tạm biệt!']], ['спасибо']]
    ]]
  ];

  const TALK_SCENARIOS = RAW.map(([id, title, description, topic, [name, role, color, initials], turns]) => {
    const out = {};
    turns.forEach(([npc, goal, answers, anyOf], i) => {
      const tid = 't' + (i + 1);
      out[tid] = {
        id: tid,
        npc: say(npc),
        user: { goal, answers: answers.map(say), accept: { anyOf }, next: i + 1 < turns.length ? 't' + (i + 2) : null, fallback: FALLBACK }
      };
    });
    return { id, title, description, topic, difficulty: 'A1', npc: { name, role, avatarColor: color, initials, avatarSvg: avatar(color) }, initialTurn: 't1', turns: out };
  });
  W.RU_TALK_SCENARIOS = TALK_SCENARIOS;
  if (typeof module !== 'undefined' && module.exports) module.exports = TALK_SCENARIOS;
})();
