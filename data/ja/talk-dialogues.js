/**
 * data/ja/talk-dialogues.js
 * 10 hội thoại tiếng Nhật đời thường N5 phục vụ chế độ "Đóng vai A-B" (Roleplay A-B).
 * Cấu trúc:
 *  - id: mã định danh hội thoại
 *  - title: tiêu đề tiếng Việt
 *  - scene: bối cảnh tình huống thực tế
 *  - roleA: { name, char, avatar }
 *  - roleB: { name, char, avatar }
 *  - sentences: [ { who: 'A'|'B', ja, kana, romaji, vi, en, ipa, zh, py }, ... ] (mỗi bài >= 8 câu)
 */

(function () {
  'use strict';

  const TALK_DIALOGUES = [
    {
      id: "jtd01",
      title: "Đi siêu thị mua hoa quả tươi",
      scene: "Tại quầy hoa quả tươi trong siêu thị địa phương, bạn hỏi mua táo đỏ và chuối chín, hỏi giá và thanh toán.",
      roleA: {
        name: "Khách mua (Bạn)",
        char: "Khách hàng",
        avatar: "🛒"
      },
      roleB: {
        name: "Nhân viên bán hoa quả",
        char: "Nhân viên",
        avatar: "🍎"
      },
      sentences: [
        {
          who: "A",
          ja: "すみません、この赤いりんごはいくらですか。",
          kana: "すみません、このあかいりんごはいくらですか。",
          romaji: "Sumimasen, kono akai ringo wa ikura desu ka.",
          vi: "Xin lỗi, những quả táo đỏ này bao nhiêu tiền vậy ạ?",
          en: "Excuse me, how much are these red apples?",
          ipa: "Sumimasen, kono akai ringo wa ikura desu ka.",
          zh: "すみません、この赤いりんごはいくらですか。",
          py: "Sumimasen, kono akai ringo wa ikura desu ka."
        },
        {
          who: "B",
          ja: "一個百五十円です。青森県産で、とても甘くて美味しいですよ。",
          kana: "いっこひゃくごじゅうえんです。あおもりけんさんで、とてもあまくておいしいですよ。",
          romaji: "Ikko hyaku gojuu-en desu. Aomori-ken san de, totemo amakute oishii desu yo.",
          vi: "Một trăm năm mươi yên một quả ạ. Táo vùng Aomori, rất ngọt và ngon đấy ạ.",
          en: "They are 150 yen each. Grown in Aomori, very sweet and delicious.",
          ipa: "Ikko hyaku gojuu-en desu. Aomori-ken san de, totemo amakute oishii desu yo.",
          zh: "一個百五十円です。青森県産で、とても甘くて美味しいですよ。",
          py: "Ikko hyaku gojuu-en desu. Aomori-ken san de, totemo amakute oishii desu yo."
        },
        {
          who: "A",
          ja: "いいですね！そちらの黄色いバナナはいくらですか。",
          kana: "いいですね！そちらのきいろいバナナはいくらですか。",
          romaji: "Ii desu ne! Sochira no kiiroi banana wa ikura desu ka.",
          vi: "Tuyệt quá! Thế nải chuối vàng đằng kia bao nhiêu tiền vậy ạ?",
          en: "Great! How much are those yellow bananas over there?",
          ipa: "Ii desu ne! Sochira no kiiroi banana wa ikura desu ka.",
          zh: "いいですね！そちらの黄色いバナナはいくらですか。",
          py: "Ii desu ne! Sochira no kiiroi banana wa ikura desu ka."
        },
        {
          who: "B",
          ja: "バナナは一房二百円です。",
          kana: "バナナはひとふさにひゃくえんです。",
          romaji: "Banana wa hitofusa nihyaku-en desu.",
          vi: "Chuối hai trăm yên một nải nhé bạn.",
          en: "Bananas are 200 yen per bunch.",
          ipa: "Banana wa hitofusa nihyaku-en desu.",
          zh: "バナナは一房二百円です。",
          py: "Banana wa hitofusa nihyaku-en desu."
        },
        {
          who: "A",
          ja: "じゃ、りんごを二個とバナナを一房ください。",
          kana: "じゃ、りんごをにことバナナをひとふさください。",
          romaji: "Ja, ringo o niko to banana o hitofusa kudasai.",
          vi: "Vậy cho tôi lấy hai quả táo và một nải chuối nhé.",
          en: "Then please give me two apples and one bunch of bananas.",
          ipa: "Ja, ringo o niko to banana o hitofusa kudasai.",
          zh: "じゃ、りんごを二個とバナナを一房ください。",
          py: "Ja, ringo o niko to banana o hitofusa kudasai."
        },
        {
          who: "B",
          ja: "はい、かしこまりました。合計で五百円になります。",
          kana: "はい、かしこまりました。ごうけいでごひゃくえんになります。",
          romaji: "Hai, kashikomarimashita. Goukei de gohyaku-en ni narimasu.",
          vi: "Dạ vâng, tôi hiểu rồi. Tổng cộng là năm trăm yên ạ.",
          en: "Yes, certainly. The total comes to 500 yen.",
          ipa: "Hai, kashikomarimashita. Goukei de gohyaku-en ni narimasu.",
          zh: "はい、かしこまりました。合計で五百円になります。",
          py: "Hai, kashikomarimashita. Goukei de gohyaku-en ni narimasu."
        },
        {
          who: "A",
          ja: "千円札で払います。お釣りをお願いします。",
          kana: "せんえんさつではらいます。おつりをおねがいします。",
          romaji: "Sen'ensatsu de haraimasu. Otsuri o onegaishimasu.",
          vi: "Tôi trả bằng tờ một nghìn yên. Làm ơn thối lại tiền thừa nhé.",
          en: "I will pay with a 1,000 yen bill. Change please.",
          ipa: "Sen'ensatsu de haraimasu. Otsuri o onegaishimasu.",
          zh: "千円札で払います。お釣りをお願いします。",
          py: "Sen'ensatsu de haraimasu. Otsuri o onegaishimasu."
        },
        {
          who: "B",
          ja: "千円お預かりします。五百円のお返しとレシートです。毎度ありがとうございます！",
          kana: "せんえんおあずかりします。ごひゃくえんのおかえしとレシートです。まいどありがとうございます！",
          romaji: "Sen'en oazukari shimasu. Gohyaku-en no okaeshi to reshiito desu. Maido arigatou gozaimasu!",
          vi: "Nhận của bạn một nghìn yên. Tiền thối năm trăm yên và hóa đơn đây ạ. Cảm ơn quý khách rất nhiều!",
          en: "1,000 yen received. Here is 500 yen change and your receipt. Thank you very much!",
          ipa: "Sen'en oazukari shimasu. Gohyaku-en no okaeshi to reshiito desu. Maido arigatou gozaimasu!",
          zh: "千円お預かりします。五百円のお返しとレシートです。毎度ありがとうございます！",
          py: "Sen'en oazukari shimasu. Gohyaku-en no okaeshi to reshiito desu. Maido arigatou gozaimasu!"
        }
      ]
    },
    {
      id: "jtd02",
      title: "Rủ bạn cùng đi ăn trưa",
      scene: "Sau giờ học buổi sáng, hai người bạn rủ nhau đi ăn trưa tại quán mì Udon gần trường đại học.",
      roleA: {
        name: "Nam (Sinh viên)",
        char: "Nam",
        avatar: "👦"
      },
      roleB: {
        name: "Ken (Bạn học)",
        char: "Ken",
        avatar: "🧑"
      },
      sentences: [
        {
          who: "A",
          ja: "ケンさん、もう十二時ですね。お腹が空きましたか。",
          kana: "ケンさん、もうじゅうにじですね。おなかがすきましたか。",
          romaji: "Ken-san, mou juuniji desu ne. Onaka ga sukimashita ka.",
          vi: "Ken ơi, đã 12 giờ rồi nhỉ. Bạn đã thấy đói bụng chưa?",
          en: "Ken, it is already 12 o'clock. Are you hungry?",
          ipa: "Ken-san, mou juuniji desu ne. Onaka ga sukimashita ka.",
          zh: "ケンさん、もう十二時ですね。お腹が空きましたか。",
          py: "Ken-san, mou juuniji desu ne. Onaka ga sukimashita ka."
        },
        {
          who: "B",
          ja: "ええ、ぺこぺこです！一緒に昼ご飯を食べに行きませんか。",
          kana: "ええ、ぺこぺこです！いっしょにひるごはんをたべにいきませんか。",
          romaji: "Ee, pekopeko desu! Isshoni hirugohan o tabe ni ikimasen ka.",
          vi: "Ừ, đói meo rồi! Tụi mình cùng đi ăn trưa nhé?",
          en: "Yeah, starving! Would you like to go have lunch together?",
          ipa: "Ee, pekopeko desu! Isshoni hirugohan o tabe ni ikimasen ka.",
          zh: "ええ、ぺこぺこです！一緒に昼ご飯を食べに行きませんか。",
          py: "Ee, pekopeko desu! Isshoni hirugohan o tabe ni ikimasen ka."
        },
        {
          who: "A",
          ja: "いいですね！何を食べたいですか。",
          kana: "いいですね！なにをたべたいですか。",
          romaji: "Ii desu ne! Nani o tabetai desu ka.",
          vi: "Ý hay đó! Bạn muốn ăn món gì?",
          en: "Sounds good! What do you feel like eating?",
          ipa: "Ii desu ne! Nani o tabetai desu ka.",
          zh: "いいですね！何を食べたいですか。",
          py: "Ii desu ne! Nani o tabetai desu ka."
        },
        {
          who: "B",
          ja: "学校の近くのうどん屋はどうですか。安くて美味しいですよ。",
          kana: "がっこうのちかくのうどんやはどうですか。やすくておいしいですよ。",
          romaji: "Gakkou no chikaku no udon'ya wa dou desu ka. Yasukute oishii desu yo.",
          vi: "Quán mì udon gần trường thì thế nào? Vừa rẻ lại vừa ngon đấy.",
          en: "How about the udon shop near school? It is cheap and delicious.",
          ipa: "Gakkou no chikaku no udon'ya wa dou desu ka. Yasukute oishii desu yo.",
          zh: "学校の近くのうどん屋はどうですか。安くて美味しいですよ。",
          py: "Gakkou no chikaku no udon'ya wa dou desu ka. Yasukute oishii desu yo."
        },
        {
          who: "A",
          ja: "賛成です！きつねうどんが食べたいです。",
          kana: "さんせいです！きつねうどんがたべたいです。",
          romaji: "Sansei desu! Kitsune udon ga tabetai desu.",
          vi: "Mình tán thành! Mình muốn ăn món udon Kitsune đậu phụ ngọt.",
          en: "I agree! I want to eat Kitsune udon.",
          ipa: "Sansei desu! Kitsune udon ga tabetai desu.",
          zh: "賛成です！きつねうどんが食べたいです。",
          py: "Sansei desu! Kitsune udon ga tabetai desu."
        },
        {
          who: "B",
          ja: "私は天ぷらうどんにします。今から歩いて行きましょう。",
          kana: "わたしはてんぷらうどんにします。いまからあるいていきましょう。",
          romaji: "Watashi wa tempura udon ni shimasu. Ima kara aruite ikimashou.",
          vi: "Mình sẽ chọn udon Tempura. Giờ chúng mình đi bộ qua đó thôi.",
          en: "I will have tempura udon. Let us walk there now.",
          ipa: "Watashi wa tempura udon ni shimasu. Ima kara aruite ikimashou.",
          zh: "私は天ぷらうどんにします。今から歩いて行きましょう。",
          py: "Watashi wa tempura udon ni shimasu. Ima kara aruite ikimashou."
        },
        {
          who: "A",
          ja: "混んでいますかね。お昼時はいつも人気ですね。",
          kana: "こんでいますかね。おひるどきはいつもにんきですね。",
          romaji: "Konde imasu ka ne. Ohirudoki wa itsumo ninki desu ne.",
          vi: "Không biết có đông khách không nhỉ. Giờ trưa quán đấy lúc nào cũng hút khách.",
          en: "Will it be crowded? It is always popular at lunchtime.",
          ipa: "Konde imasu ka ne. Ohirudoki wa itsumo ninki desu ne.",
          zh: "混んでいますかね。お昼時はいつも人気ですね。",
          py: "Konde imasu ka ne. Ohirudoki wa itsumo ninki desu ne."
        },
        {
          who: "B",
          ja: "回転が速いから大丈夫です。すぐ座れますよ。行きましょう！",
          kana: "かいてんがはやいからだいじょうぶです。すぐすわれますよ。いきましょう！",
          romaji: "Kaiten ga hayai kara daijoubu desu. Sugu suwaremasu yo. Ikimashou!",
          vi: "Khách ăn nhanh đổi lượt liên tục nên không sao đâu. Ngồi được ngay ấy mà. Đi thôi!",
          en: "Turnover is fast so no worries. We can sit soon. Let us go!",
          ipa: "Kaiten ga hayai kara daijoubu desu. Sugu suwaremasu yo. Ikimashou!",
          zh: "回転が速いから大丈夫です。すぐ座れますよ。行きましょう！",
          py: "Kaiten ga hayai kara daijoubu desu. Sugu suwaremasu yo. Ikimashou!"
        }
      ]
    },
    {
      id: "jtd03",
      title: "Mua vé tàu Shinkansen tại ga Tokyo",
      scene: "Tại quầy Midori-no-Madoguchi ở ga Tokyo, khách mua vé tàu cao tốc Shinkansen đi Kyoto vào cuối tuần.",
      roleA: {
        name: "Hành khách (Bạn)",
        char: "Hành khách",
        avatar: "🧳"
      },
      roleB: {
        name: "Nhân viên quầy vé",
        char: "Nhân viên vé",
        avatar: "🎫"
      },
      sentences: [
        {
          who: "A",
          ja: "すみません、土曜日の京都行きの新幹線の切符を買いたいです。",
          kana: "すみません、どようびのきょうといきのしんかんせんのきっぷをかいたいです。",
          romaji: "Sumimasen, doyoubi no Kyouto iki no Shinkansen no kippu o kaitai desu.",
          vi: "Xin lỗi, tôi muốn mua vé tàu Shinkansen đi Kyoto vào thứ Bảy này.",
          en: "Excuse me, I would like to buy a Shinkansen ticket to Kyoto for Saturday.",
          ipa: "Sumimasen, doyoubi no Kyouto iki no Shinkansen no kippu o kaitai desu.",
          zh: "すみません、土曜日の京都行きの新幹線の切符を買いたいです。",
          py: "Sumimasen, doyoubi no Kyouto iki no Shinkansen no kippu o kaitai desu."
        },
        {
          who: "B",
          ja: "かしこまりました。何時頃の出発をご希望ですか。",
          kana: "かしこまりました。なんじごろのしゅっぱつをごきぼうですか。",
          romaji: "Kashikomarimashita. Nanji goro no shuppatsu o gokibou desu ka.",
          vi: "Tôi hiểu rồi ạ. Quý khách muốn xuất phát vào khoảng mấy giờ ạ?",
          en: "Certainly. Around what time would you like to depart?",
          ipa: "Kashikomarimashita. Nanji goro no shuppatsu o gokibou desu ka.",
          zh: "かしこまりました。何時頃の出発をご希望ですか。",
          py: "Kashikomarimashita. Nanji goro no shuppatsu o gokibou desu ka."
        },
        {
          who: "A",
          ja: "午前九時頃の電車はありますか。",
          kana: "ごぜんくじごろのでんしゃはありますか。",
          romaji: "Gozen kuji goro no densha wa arimasu ka.",
          vi: "Có chuyến tàu nào vào khoảng 9 giờ sáng không ạ?",
          en: "Are there any trains around 9:00 AM?",
          ipa: "Gozen kuji goro no densha wa arimasu ka.",
          zh: "午前九時頃の電車はありますか。",
          py: "Gozen kuji goro no densha wa arimasu ka."
        },
        {
          who: "B",
          ja: "九時十分発の「のぞみ号」がございます。指定席でよろしいですか。",
          kana: "くじじゅっぷんはつの「のぞみごう」がございます。していせきでよろしいですか。",
          romaji: "Kuji juppun hatsu no 'Nozomi-gou' ga gozaimasu. Shiteiseki de yoroshii desu ka.",
          vi: "Có chuyến tàu Nozomi khởi hành lúc 9 giờ 10 phút. Quý khách đi ghế chỉ định trước chỗ chứ ạ?",
          en: "There is the Nozomi departing at 9:10 AM. Is a reserved seat fine?",
          ipa: "Kuji juppun hatsu no 'Nozomi-gou' ga gozaimasu. Shiteiseki de yoroshii desu ka.",
          zh: "九時十分発の「のぞみ号」がございます。指定席でよろしいですか。",
          py: "Kuji juppun hatsu no 'Nozomi-gou' ga gozaimasu. Shiteiseki de yoroshii desu ka."
        },
        {
          who: "A",
          ja: "はい、指定席をお願いします。窓側は空いていますか。",
          kana: "はい、していせきをおねがいします。まどがわはあいていますか。",
          romaji: "Hai, shiteiseki o onegaishimasu. Madogawa wa aite imasu ka.",
          vi: "Vâng, cho tôi ghế chỉ định nhé. Chỗ sát cửa sổ có còn trống không?",
          en: "Yes, reserved seat please. Is a window seat available?",
          ipa: "Hai, shiteiseki o onegaishimasu. Madogawa wa aite imasu ka.",
          zh: "はい、指定席をお願いします。窓側は空いていますか。",
          py: "Hai, shiteiseki o onegaishimasu. Madogawa wa aite imasu ka."
        },
        {
          who: "B",
          ja: "はい、五号車の窓側のお席が取れました。一枚でよろしいですか。",
          kana: "はい、ごごうしゃのまどがわのおせきがとれました。いちまいでよろしいですか。",
          romaji: "Hai, gogousha no madogawa no oseki ga toremashita. Ichimai de yoroshii desu ka.",
          vi: "Vâng, đã đặt được ghế cửa sổ ở toa số 5 cho quý khách rồi. Quý khách lấy một vé phải không?",
          en: "Yes, a window seat in car 5 is booked. Just one ticket?",
          ipa: "Hai, gogousha no madogawa no oseki ga toremashita. Ichimai de yoroshii desu ka.",
          zh: "はい、五号車の窓側のお席が取れました。一枚でよろしいですか。",
          py: "Hai, gogousha no madogawa no oseki ga toremashita. Ichimai de yoroshii desu ka."
        },
        {
          who: "A",
          ja: "はい、一枚です。全部でいくらになりますか。",
          kana: "はい、いちまいです。ぜんぶでいくらになりますか。",
          romaji: "Hai, ichimai desu. Zenbu de ikura ni narimasu ka.",
          vi: "Vâng, một vé thôi ạ. Tổng cộng tất cả là bao nhiêu tiền vậy?",
          en: "Yes, one ticket. How much is the total?",
          ipa: "Hai, ichimai desu. Zenbu de ikura ni narimasu ka.",
          zh: "はい、一枚です。全部でいくらになりますか。",
          py: "Hai, ichimai desu. Zenbu de ikura ni narimasu ka."
        },
        {
          who: "B",
          ja: "一万四千百二十円でございます。クレジットカードもご利用いただけます。",
          kana: "いちまんよんせんひゃくにじゅうえんでございます。クレジットカードもごりよういただけます。",
          romaji: "Ichiman yonsen hyaku nijuu-en de gozaimasu. Kurejitto kaado mo goriyou itadakemasu.",
          vi: "Dạ là 14.120 yên. Bạn có thể thanh toán bằng thẻ tín dụng được ạ.",
          en: "It is 14,120 yen. You can also pay by credit card.",
          ipa: "Ichiman yonsen hyaku nijuu-en de gozaimasu. Kurejitto kaado mo goriyou itadakemasu.",
          zh: "一万四千百二十円でございます。クレジットカードもご利用いただけます。",
          py: "Ichiman yonsen hyaku nijuu-en de gozaimasu. Kurejitto kaado mo goriyou itadakemasu."
        }
      ]
    },
    {
      id: "jtd04",
      title: "Hỏi đường đến bưu điện gần nhất",
      scene: "Người khách nước ngoài hỏi đường người dân địa phương tại ngã tư để tìm bưu điện gửi bưu thiếp.",
      roleA: {
        name: "Người hỏi đường (Bạn)",
        char: "Người hỏi",
        avatar: "🚶"
      },
      roleB: {
        name: "Người dân địa phương",
        char: "Người dân",
        avatar: "👵"
      },
      sentences: [
        {
          who: "A",
          ja: "すみません、この近くに郵便局はありますか。",
          kana: "すみません、このちかくにゆうびんきょくはありますか。",
          romaji: "Sumimasen, kono chikaku ni yuubinkyoku wa arimasu ka.",
          vi: "Xin lỗi, gần đây có bưu điện nào không ạ?",
          en: "Excuse me, is there a post office near here?",
          ipa: "Sumimasen, kono chikaku ni yuubinkyoku wa arimasu ka.",
          zh: "すみません、この近くに郵便局はありますか。",
          py: "Sumimasen, kono chikaku ni yuubinkyoku wa arimasu ka."
        },
        {
          who: "B",
          ja: "ええ、ありますよ。歩いて五分くらいのところにあります。",
          kana: "ええ、ありますよ。あるいてごふんくらいのところにあります。",
          romaji: "Ee, arimasu yo. Aruite gofun kurai no tokoro ni arimasu.",
          vi: "Có đấy cháu. Ở cách đây khoảng 5 phút đi bộ thôi.",
          en: "Yes, there is. About a 5-minute walk from here.",
          ipa: "Ee, arimasu yo. Aruite gofun kurai no tokoro ni arimasu.",
          zh: "ええ、ありますよ。歩いて五分くらいのところにあります。",
          py: "Ee, arimasu yo. Aruite gofun kurai no tokoro ni arimasu."
        },
        {
          who: "A",
          ja: "道順を教えていただけますか。",
          kana: "みちじゅんをおしえていただけますか。",
          romaji: "Michijun o oshiete itadakemasu ka.",
          vi: "Bác có thể chỉ đường giúp cháu được không ạ?",
          en: "Could you tell me the directions?",
          ipa: "Michijun o oshiete itadakemasu ka.",
          zh: "道順を教えていただけますか。",
          py: "Michijun o oshiete itadakemasu ka."
        },
        {
          who: "B",
          ja: "この道をまっすぐ行って、最初の信号を左に曲がってください。",
          kana: "このみちをまっすぐいって、さいしょのしんごうをひだりにまがってください。",
          romaji: "Kono michi o massugu itte, saisho no shingou o hidari ni magatte kudasai.",
          vi: "Cháu cứ đi thẳng con đường này, đến cột đèn giao thông đầu tiên thì rẽ trái nhé.",
          en: "Go straight down this street, and turn left at the first traffic light.",
          ipa: "Kono michi o massugu itte, saisho no shingou o hidari ni magatte kudasai.",
          zh: "この道をまっすぐ行って、最初の信号を左に曲がってください。",
          py: "Kono michi o massugu itte, saisho no shingou o hidari ni magatte kudasai."
        },
        {
          who: "A",
          ja: "最初の信号を左ですね。目印は何かありますか。",
          kana: "さいしょのしんごうをひだりですね。めじるしはなにかありますか。",
          romaji: "Saisho no shingou o hidari desu ne. Mejirushi wa nanika arimasu ka.",
          vi: "Đèn giao thông đầu tiên rẽ trái đúng không ạ. Có dấu hiệu nhận biết nào không bác?",
          en: "Left at the first light, right. Are there any landmarks?",
          ipa: "Saisho no shingou o hidari desu ne. Mejirushi wa nanika arimasu ka.",
          zh: "最初の信号を左ですね。目印は何かありますか。",
          py: "Saisho no shingou o hidari desu ne. Mejirushi wa nanika arimasu ka."
        },
        {
          who: "B",
          ja: "角にコンビニがあります。そこを曲がると右側に赤いポストが見えますよ。",
          kana: "かどにコンビニがあります。そこをまがるとみぎがわにあかいポストがみえますよ。",
          romaji: "Kado ni konbini ga arimasu. Soko o magaru to migigawa ni akai posuto ga miemasu yo.",
          vi: "Ở góc đường có một cửa hàng tiện lợi. Rẽ vào đó là thấy hộp thư màu đỏ bên tay phải ngay.",
          en: "There is a convenience store on the corner. Turn there and you will see a red mailbox on the right.",
          ipa: "Kado ni konbini ga arimasu. Soko o magaru to migigawa ni akai posuto ga miemasu yo.",
          zh: "角にコンビニがあります。そこを曲がると右側に赤いポストが見えますよ。",
          py: "Kado ni konbini ga arimasu. Soko o magaru to migigawa ni akai posuto ga miemasu yo."
        },
        {
          who: "A",
          ja: "分かりました！今日は何時まで開いていますか。",
          kana: "わかりました！きょうはなんじまであいていますか。",
          romaji: "Wakarimashita! Kyou wa nanji made aite imasu ka.",
          vi: "Cháu hiểu rồi! Hôm nay bưu điện mở cửa đến mấy giờ vậy ạ?",
          en: "Got it! What time are they open until today?",
          ipa: "Wakarimashita! Kyou wa nanji made aite imasu ka.",
          zh: "分かりました！今日は何時まで開いていますか。",
          py: "Wakarimashita! Kyou wa nanji made aite imasu ka."
        },
        {
          who: "B",
          ja: "窓口は夕方五時まで開いていますよ。気をつけて行ってね。",
          kana: "まどぐちはゆうがたごじまであいていますよ。きをつけていってね。",
          romaji: "Madoguchi wa yuugata goji made aite imasu yo. Ki o tsukete itte ne.",
          vi: "Quầy giao dịch mở đến 5 giờ chiều đấy cháu. Đi cẩn thận nhé.",
          en: "The counter is open until 5 PM. Take care!",
          ipa: "Madoguchi wa yuugata goji made aite imasu yo. Ki o tsukete itte ne.",
          zh: "窓口は夕方五時まで開いていますよ。気をつけて行ってね。",
          py: "Madoguchi wa yuugata goji made aite imasu yo. Ki o tsukete itte ne."
        }
      ]
    },
    {
      id: "jtd05",
      title: "Gọi món tại tiệm sushi băng chuyền",
      scene: "Thực khách vào quán Kaiten-sushi, gọi món cá hồi, cá ngừ và trà xanh nóng qua màn hình hoặc trực tiếp.",
      roleA: {
        name: "Thực khách (Bạn)",
        char: "Thực khách",
        avatar: "🍣"
      },
      roleB: {
        name: "Đầu bếp sushi",
        char: "Đầu bếp",
        avatar: "👨‍🍳"
      },
      sentences: [
        {
          who: "A",
          ja: "すみません、サーモンを二皿握っていただけますか。",
          kana: "すみません、サーモンをにさらについていただけますか。",
          romaji: "Sumimasen, saamon o nisara nigitte itadakemasu ka.",
          vi: "Xin lỗi bác đầu bếp, có thể làm cho tôi hai đĩa sushi cá hồi được không?",
          en: "Excuse me, could you make two plates of salmon sushi please?",
          ipa: "Sumimasen, saamon o nisara nigitte itadakemasu ka.",
          zh: "すみません、サーモンを二皿握っていただけますか。",
          py: "Sumimasen, saamon o nisara nigitte itadakemasu ka."
        },
        {
          who: "B",
          ja: "へい、喜んで！わさびはお入れしますか。",
          kana: "へい、よろこんで！わさびはおいれしますか。",
          romaji: "Hei, yorokonde! Wasabi wa oire shimasu ka.",
          vi: "Dạ vâng có ngay! Quý khách có dùng mù tạt wasabi không ạ?",
          en: "Yes gladly! Would you like wasabi inside?",
          ipa: "Hei, yorokonde! Wasabi wa oire shimasu ka.",
          zh: "へい、喜んで！わさびはお入れしますか。",
          py: "Hei, yorokonde! Wasabi wa oire shimasu ka."
        },
        {
          who: "A",
          ja: "はい、わさび入りでお願いします。",
          kana: "はい、わさびいりでおねがいします。",
          romaji: "Hai, wasabi iri de onegaishimasu.",
          vi: "Vâng, cho mù tạt wasabi giúp tôi nhé.",
          en: "Yes, with wasabi please.",
          ipa: "Hai, wasabi iri de onegaishimasu.",
          zh: "はい、わさび入りでお願いします。",
          py: "Hai, wasabi iri de onegaishimasu."
        },
        {
          who: "B",
          ja: "はい、サーモン二丁お待ち！他にご注文はございますか。",
          kana: "はい、サーモンにちょうおまち！ほかにごちゅうもんはございますか。",
          romaji: "Hai, saamon nichou omachi! Hoka ni gochuumon wa gozaimasu ka.",
          vi: "Dạ đây, hai đĩa cá hồi xin gửi quý khách! Quý khách có gọi thêm món gì nữa không?",
          en: "Here are your two salmons! Anything else?",
          ipa: "Hai, saamon nichou omachi! Hoka ni gochuumon wa gozaimasu ka.",
          zh: "はい、サーモン二丁お待ち！他にご注文はございますか。",
          py: "Hai, saamon nichou omachi! Hoka ni gochuumon wa gozaimasu ka."
        },
        {
          who: "A",
          ja: "マグロの赤身と、玉子を一皿ずつください。",
          kana: "マグロのあかみと、たまごをひとさらずつください。",
          romaji: "Maguro no akami to, tamago o hitosara zutsu kudasai.",
          vi: "Cho tôi một đĩa cá ngừ nạc và một đĩa sushi trứng cuộn nữa.",
          en: "One plate of lean tuna and one plate of egg sushi, please.",
          ipa: "Maguro no akami to, tamago o hitosara zutsu kudasai.",
          zh: "マグロの赤身と、玉子を一皿ずつください。",
          py: "Maguro no akami to, tamago o hitosara zutsu kudasai."
        },
        {
          who: "B",
          ja: "かしこまりました。マグロと玉子ですね。すぐにお作りします。",
          kana: "かしこまりました。マグロとたまごですね。すぐにおつくりします。",
          romaji: "Kashikomarimashita. Maguro to tamago desu ne. Sugu ni otsukuri shimasu.",
          vi: "Tôi hiểu rồi ạ. Cá ngừ và trứng cuộn nhé. Tôi sẽ làm ngay đây.",
          en: "Certainly. Tuna and tamago coming right up.",
          ipa: "Kashikomarimashita. Maguro to tamago desu ne. Sugu ni otsukuri shimasu.",
          zh: "かしこまりました。マグロと玉子ですね。すぐにお作りします。",
          py: "Kashikomarimashita. Maguro to tamago desu ne. Sugu ni otsukuri shimasu."
        },
        {
          who: "A",
          ja: "温かいお茶はどこで入れますか。",
          kana: "あたたかいおちゃはどこでいれますか。",
          romaji: "Atatakai ocha wa doko de iremasu ka.",
          vi: "Trà nóng thì rót ở đâu vậy ạ?",
          en: "Where can I pour hot tea?",
          ipa: "Atatakai ocha wa doko de iremasu ka.",
          zh: "温かいお茶はどこで入れますか。",
          py: "Atatakai ocha wa doko de iremasu ka."
        },
        {
          who: "B",
          ja: "目の前の緑茶の粉を入れて、お湯のボタンを押してくださいね。",
          kana: "めのまえのりょくちゃのこなをいれて、おゆのボタンをおしてくださいね。",
          romaji: "Me no mae no ryokucha no kona o irete, oyu no botan o oshite kudasai ne.",
          vi: "Quý khách cho bột trà xanh trước mặt vào cốc rồi ấn vòi nước sôi nhé.",
          en: "Put the green tea powder into your cup and press the hot water tap.",
          ipa: "Me no mae no ryokucha no kona o irete, oyu no botan o oshite kudasai ne.",
          zh: "目の前の緑茶の粉を入れて、お湯のボタンを押してくださいね。",
          py: "Me no mae no ryokucha no kona o irete, oyu no botan o oshite kudasai ne."
        }
      ]
    },
    {
      id: "jtd06",
      title: "Làm thủ tục nhận phòng khách sạn (Check-in)",
      scene: "Khách du lịch đến quầy lễ tân khách sạn Tokyo làm thủ tục nhận chìa khóa phòng và hỏi thông tin tiện ích.",
      roleA: {
        name: "Khách thuê phòng (Bạn)",
        char: "Khách trọ",
        avatar: "🧳"
      },
      roleB: {
        name: "Lễ tân khách sạn",
        char: "Lễ tân",
        avatar: "🏨"
      },
      sentences: [
        {
          who: "A",
          ja: "こんばんは。チェックインをお願いします。",
          kana: "こんばんは。チェックインをおねがいします。",
          romaji: "Konbanwa. Chekkuin o onegaishimasu.",
          vi: "Chào buổi tối. Cho tôi làm thủ tục nhận phòng nhé.",
          en: "Good evening. I would like to check in please.",
          ipa: "Konbanwa. Chekkuin o onegaishimasu.",
          zh: "こんばんは。チェックインをお願いします。",
          py: "Konbanwa. Chekkuin o onegaishimasu."
        },
        {
          who: "B",
          ja: "こんばんは、いらっしゃいませ。ご予約のお名前をいただけますか。",
          kana: "こんばんは、いらっしゃいませ。ごよやくのおなまえをいただけますか。",
          romaji: "Konbanwa, irasshaimase. Goyoyaku no onamae o itadakemasu ka.",
          vi: "Chào buổi tối quý khách! Xin vui lòng cho tôi biết tên đặt phòng ạ?",
          en: "Good evening, welcome! May I have your name for the reservation?",
          ipa: "Konbanwa, irasshaimase. Goyoyaku no onamae o itadakemasu ka.",
          zh: "こんばんは、いらっしゃいませ。ご予約のお名前をいただけますか。",
          py: "Konbanwa, irasshaimase. Goyoyaku no onamae o itadakemasu ka."
        },
        {
          who: "A",
          ja: "グエン・ヴァン・ナムです。シングルルームを一泊予約しました。",
          kana: "グエン・ヴァン・ナムです。シングルルームをいっぱくよやくしました。",
          romaji: "Guen Van Namu desu. Shinguru ruumu o ippaku yoyaku shimashita.",
          vi: "Tôi là Nguyễn Văn Nam. Tôi đã đặt trước một phòng đơn trong một đêm.",
          en: "Nguyen Van Nam. I booked a single room for one night.",
          ipa: "Guen Van Namu desu. Shinguru ruumu o ippaku yoyaku shimashita.",
          zh: "グエン・ヴァン・ナムです。シングルルームを一泊予約しました。",
          py: "Guen Van Namu desu. Shinguru ruumu o ippaku yoyaku shimashita."
        },
        {
          who: "B",
          ja: "ナム様、ご予約を確認いたしました。パスポートのご提示をお願いします。",
          kana: "ナムさま、ごよやくをかくにんいたしました。パスポートのごていじをおねがいします。",
          romaji: "Namu-sama, goyoyaku o kakunin itashimashita. Pasupooto no goteiji o onegaishimasu.",
          vi: "Dạ quý khách Nam, tôi đã xác nhận thông tin rồi. Quý khách vui lòng xuất trình hộ chiếu ạ.",
          en: "Mr. Nam, found your reservation. May I see your passport please?",
          ipa: "Namu-sama, goyoyaku o kakunin itashimashita. Pasupooto no goteiji o onegaishimasu.",
          zh: "ナム様、ご予約を確認いたしました。パスポートのご提示をお願いします。",
          py: "Namu-sama, goyoyaku o kakunin itashimashita. Pasupooto no goteiji o onegaishimasu."
        },
        {
          who: "A",
          ja: "はい、どうぞ。朝食は何時からですか。",
          kana: "はい、どうぞ。ちょうしょくはなんじからですか。",
          romaji: "Hai, douzo. Choushoku wa nanji kara desu ka.",
          vi: "Vâng, xin gửi bạn. Bữa sáng bắt đầu từ mấy giờ vậy ạ?",
          en: "Here you go. What time is breakfast?",
          ipa: "Hai, douzo. Choushoku wa nanji kara desu ka.",
          zh: "はい、どうぞ。朝食は何時からですか。",
          py: "Hai, douzo. Choushoku wa nanji kara desu ka."
        },
        {
          who: "B",
          ja: "朝食は朝六時半から九時半まで、二階のラウンジでございます。",
          kana: "ちょうしょくはあさろくじはんからくじはんまで、にかいのラウンジでございます。",
          romaji: "Choushoku wa asa rokuji han kara kuji han made, nikai no raunji de gozaimasu.",
          vi: "Bữa sáng phục vụ từ 6 giờ rưỡi đến 9 giờ rưỡi sáng tại sảnh tầng 2 ạ.",
          en: "Breakfast is from 6:30 to 9:30 AM at the 2nd-floor lounge.",
          ipa: "Choushoku wa asa rokuji han kara kuji han made, nikai no raunji de gozaimasu.",
          zh: "朝食は朝六時半から九時半まで、二階のラウンジでございます。",
          py: "Choushoku wa asa rokuji han kara kuji han made, nikai no raunji de gozaimasu."
        },
        {
          who: "A",
          ja: "チェックアウトの時間は何時ですか。",
          kana: "チェックアウトのじかんはなんじですか。",
          romaji: "Chekkuauto no jikan wa nanji desu ka.",
          vi: "Giờ trả phòng (Check-out) là mấy giờ vậy?",
          en: "What time is check-out?",
          ipa: "Chekkuauto no jikan wa nanji desu ka.",
          zh: "チェックアウトの時間は何時ですか。",
          py: "Chekkuauto no jikan wa nanji desu ka."
        },
        {
          who: "B",
          ja: "午前十一時でございます。こちらがお部屋のカードキーです。ごゆっくりどうぞ！",
          kana: "ごぜんじゅういちじでございます。こちらがおへやのカードキーです。ごゆっくりどうぞ！",
          romaji: "Gozen juuichiji de gozaimasu. Kochira ga oheya no kaadokii desu. Goyukkuri douzo!",
          vi: "Dạ là 11 giờ trưa ạ. Đây là thẻ từ mở phòng của quý khách. Chúc quý khách nghỉ ngơi thoải mái!",
          en: "It is 11:00 AM. Here is your room key card. Enjoy your stay!",
          ipa: "Gozen juuichiji de gozaimasu. Kochira ga oheya no kaadokii desu. Goyukkuri douzo!",
          zh: "午前十一時でございます。こちらがお部屋のカードキーです。ごゆっくりどうぞ！",
          py: "Gozen juuichiji de gozaimasu. Kochira ga oheya no kaadokii desu. Goyukkuri douzo!"
        }
      ]
    },
    {
      id: "jtd07",
      title: "Mua đồ ăn và hâm nóng tại Konbini",
      scene: "Khách mua cơm hộp bento và nước trà tại Lawson, nhờ nhân viên hâm nóng và tính tiền.",
      roleA: {
        name: "Khách mua (Bạn)",
        char: "Khách hàng",
        avatar: "🍱"
      },
      roleB: {
        name: "Thu ngân Konbini",
        char: "Thu ngân",
        avatar: "🏪"
      },
      sentences: [
        {
          who: "A",
          ja: "すみません、このお弁当と緑茶をお願いします。",
          kana: "すみません、このおべんとうとりょくちゃをおねがいします。",
          romaji: "Sumimasen, kono obentou to ryokucha o onegaishimasu.",
          vi: "Làm phiền bạn, tính tiền giúp tôi hộp cơm này và chai trà xanh nhé.",
          en: "Excuse me, this bento and green tea please.",
          ipa: "Sumimasen, kono obentou to ryokucha o onegaishimasu.",
          zh: "すみません、このお弁当と緑茶をお願いします。",
          py: "Sumimasen, kono obentou to ryokucha o onegaishimasu."
        },
        {
          who: "B",
          ja: "はい、お弁当をレンジで温めますか。",
          kana: "はい、おべんとうをレンジであたためますか。",
          romaji: "Hai, obentou o renji de atatamemasu ka.",
          vi: "Vâng, hộp cơm có cần cho vào lò vi sóng hâm nóng không ạ?",
          en: "Yes, shall I heat the bento in the microwave?",
          ipa: "Hai, obentou o renji de atatamemasu ka.",
          zh: "はい、お弁当をレンジで温めますか。",
          py: "Hai, obentou o renji de atatamemasu ka."
        },
        {
          who: "A",
          ja: "はい、温めてください。",
          kana: "はい、あたためてください。",
          romaji: "Hai, atatamete kudasai.",
          vi: "Vâng, làm ơn hâm nóng giúp tôi.",
          en: "Yes, please warm it up.",
          ipa: "Hai, atatamete kudasai.",
          zh: "はい、温めてください。",
          py: "Hai, atatamete kudasai."
        },
        {
          who: "B",
          ja: "お箸は何膳おつけしますか。",
          kana: "おはしはなんぜんおつけしますか。",
          romaji: "Ohashi wa nanzen otsukeshimasu ka.",
          vi: "Tôi lấy cho bạn mấy đôi đũa ạ?",
          en: "How many pairs of chopsticks shall I include?",
          ipa: "Ohashi wa nanzen otsukeshimasu ka.",
          zh: "お箸は何膳おつけしますか。",
          py: "Ohashi wa nanzen otsukeshimasu ka."
        },
        {
          who: "A",
          ja: "一膳でいいです。あと、お手拭きも一枚ください。",
          kana: "いちぜんでいいです。あと、おてふきもいちまいください。",
          romaji: "Ichizen de ii desu. Ato, otefuki mo ichimai kudasai.",
          vi: "Một đôi là được rồi. Cho tôi thêm một chiếc khăn lau tay nữa nhé.",
          en: "One pair is fine. Also one wet wipe please.",
          ipa: "Ichizen de ii desu. Ato, otefuki mo ichimai kudasai.",
          zh: "一膳でいいです。あと、お手拭きも一枚ください。",
          py: "Ichizen de ii desu. Ato, otefuki mo ichimai kudasai."
        },
        {
          who: "B",
          ja: "かしこまりました。レジ袋は五円ですが、いかがなさいますか。",
          kana: "かしこまりました。レジぶくろはごえんですが、いかがなさいますか。",
          romaji: "Kashikomarimashita. Rejibukuro wa go-en desu ga, ikaga nasaimasu ka.",
          vi: "Tôi hiểu rồi ạ. Túi nylon đựng hàng 5 yên, bạn có dùng không?",
          en: "Understood. Bags are 5 yen, would you like one?",
          ipa: "Kashikomarimashita. Rejibukuro wa go-en desu ga, ikaga nasaimasu ka.",
          zh: "かしこまりました。レジ袋は五円ですが、いかがなさいますか。",
          py: "Kashikomarimashita. Rejibukuro wa go-en desu ga, ikaga nasaimasu ka."
        },
        {
          who: "A",
          ja: "袋はいりません。手で持っていきます。",
          kana: "ふくろはいりません。てでもっていきます。",
          romaji: "Fukuro wa irimasen. Te de motte ikimasu.",
          vi: "Tôi không cần túi đâu. Tôi cầm tay mang đi được rồi.",
          en: "No bag needed. I will carry it by hand.",
          ipa: "Fukuro wa irimasen. Te de motte ikimasu.",
          zh: "袋はいりません。手で持っていきます。",
          py: "Fukuro wa irimasen. Te de motte ikimasu."
        },
        {
          who: "B",
          ja: "温まりました！合計で六百三十円になります。ありがとうございました！",
          kana: "あたたまりました！ごうけいでろっぴゃくさんじゅうえんになります。ありがとうございました！",
          romaji: "Atatamarimashita! Goukei de roppyaku sanjuu-en ni narimasu. Arigatou gozaimashita!",
          vi: "Đồ ăn đã nóng rồi ạ! Tổng cộng của bạn là 630 yên. Cảm ơn bạn rất nhiều!",
          en: "All heated up! The total is 630 yen. Thank you very much!",
          ipa: "Atatamarimashita! Goukei de roppyaku sanjuu-en ni narimasu. Arigatou gozaimashita!",
          zh: "温まりました！合計で六百三十円になります。ありがとうございました！",
          py: "Atatamarimashita! Goukei de roppyaku sanjuu-en ni narimasu. Arigatou gozaimashita!"
        }
      ]
    },
    {
      id: "jtd08",
      title: "Khám bệnh tại phòng khám (Clinic)",
      scene: "Bệnh nhân đến phòng khám nội khoa vì bị cảm sốt và đau họng, được bác sĩ khám và kê đơn.",
      roleA: {
        name: "Bệnh nhân (Bạn)",
        char: "Bệnh nhân",
        avatar: "🤒"
      },
      roleB: {
        name: "Bác sĩ",
        char: "Bác sĩ",
        avatar: "🩺"
      },
      sentences: [
        {
          who: "A",
          ja: "先生、こんにちは。昨日から体の調子が悪いです。",
          kana: "せんせい、こんにちは。きのうからからだのちょうしがわるいです。",
          romaji: "Sensei, konnichiwa. Kinou kara karada no choushi ga warui desu.",
          vi: "Chào bác sĩ. Từ hôm qua sức khỏe trong người tôi đã không được tốt.",
          en: "Hello doctor. I have not been feeling well since yesterday.",
          ipa: "Sensei, konnichiwa. Kinou kara karada no choushi ga warui desu.",
          zh: "先生、こんにちは。昨日から体の調子が悪いです。",
          py: "Sensei, konnichiwa. Kinou kara karada no choushi ga warui desu."
        },
        {
          who: "B",
          ja: "どうしましたか。具体的な症状を教えてください。",
          kana: "どうしましたか。ぐたいてきなしょうじょうをおしえてください。",
          romaji: "Dou shimashita ka. Gutaitekina shoujou o oshiete kudasai.",
          vi: "Bạn bị làm sao? Hãy cho tôi biết các triệu chứng cụ thể nhé.",
          en: "What is going on? Please tell me your symptoms.",
          ipa: "Dou shimashita ka. Gutaitekina shoujou o oshiete kudasai.",
          zh: "どうしましたか。具体的な症状を教えてください。",
          py: "Dou shimashita ka. Gutaitekina shoujou o oshiete kudasai."
        },
        {
          who: "A",
          ja: "熱が三十八度あって、咳も少し出ます。",
          kana: "ねつがさんじゅうはちどあって、せきもすこしでます。",
          romaji: "Netsu ga sanjuuhachido atte, seki mo sukoshi demasu.",
          vi: "Tôi bị sốt 38 độ và thỉnh thoảng cũng bị ho một chút.",
          en: "I have a 38-degree fever and a mild cough.",
          ipa: "Netsu ga sanjuuhachido atte, seki mo sukoshi demasu.",
          zh: "熱が三十八度あって、咳も少し出ます。",
          py: "Netsu ga sanjuuhachido atte, seki mo sukoshi demasu."
        },
        {
          who: "B",
          ja: "口を大きく開けてください。「あー」と言ってみてください。",
          kana: "くちをおおきくあけてください。「あー」といってみてください。",
          romaji: "Kuchi o ookiku akete kudasai. 'Aa' to itte mite kudasai.",
          vi: "Bạn hãy há to miệng ra nhé. Hãy phát âm 'Aaa' cho tôi xem nào.",
          en: "Open your mouth wide please. Say 'Ah'.",
          ipa: "Kuchi o ookiku akete kudasai. 'Aa' to itte mite kudasai.",
          zh: "口を大きく開けてください。「あー」と言ってみてください。",
          py: "Kuchi o ookiku akete kudasai. 'Aa' to itte mite kudasai."
        },
        {
          who: "A",
          ja: "あー。喉が赤くなっていますか。",
          kana: "あー。のどがあかくなっていますか。",
          romaji: "Aa. Nodo ga akaku natte imasu ka.",
          vi: "Aaa. Họng của tôi có bị đỏ tấy lên không ạ?",
          en: "Ah. Is my throat red?",
          ipa: "Aa. Nodo ga akaku natte imasu ka.",
          zh: "あー。喉が赤くなっていますか。",
          py: "Aa. Nodo ga akaku natte imasu ka."
        },
        {
          who: "B",
          ja: "ええ、喉がかなり腫れていますね。季節の変わり目の風邪です。",
          kana: "ええ、のどがかなりはれていますね。きせつのかわりめのかぜです。",
          romaji: "Ee, nodo ga kanari harete imasu ne. Kisetsu no kawarime no kaze desu.",
          vi: "Ừ, họng sưng khá to đấy. Bạn bị cảm cúm do thời tiết giao mùa rồi.",
          en: "Yes, quite swollen. It is a seasonal cold.",
          ipa: "Ee, nodo ga kanari harete imasu ne. Kisetsu no kawarime no kaze desu.",
          zh: "ええ、喉がかなり腫れていますね。季節の変わり目の風邪です。",
          py: "Ee, nodo ga kanari harete imasu ne. Kisetsu no kawarime no kaze desu."
        },
        {
          who: "A",
          ja: "お風呂に入っても大丈夫ですか。",
          kana: "おふろにはいってもだいじょうぶですか。",
          romaji: "Ofuro ni haitte mo daijoubu desu ka.",
          vi: "Tôi tắm bồn có sao không bác sĩ?",
          en: "Can I take a bath?",
          ipa: "Ofuro ni haitte mo daijoubu desu ka.",
          zh: "お風呂に入っても大丈夫ですか。",
          py: "Ofuro ni haitte mo daijoubu desu ka."
        },
        {
          who: "B",
          ja: "今日は熱があるので、お風呂は入らずに早く寝てくださいね。お大事に！",
          kana: "きょうはねつがあるので、おふろははいらずにはやくねてくださいね。おだいじに！",
          romaji: "Kyou wa netsu ga aru node, ofuro wa hairazu ni hayaku nete kudasai ne. Odaiji ni!",
          vi: "Hôm nay đang sốt nên đừng tắm bồn nhé, hãy đi ngủ sớm tĩnh dưỡng. Chúc bạn mau khỏe!",
          en: "Since you have a fever, skip the bath and sleep early tonight. Take care!",
          ipa: "Kyou wa netsu ga aru node, ofuro wa hairazu ni hayaku nete kudasai ne. Odaiji ni!",
          zh: "今日は熱があるので、お風呂は入らずに早く寝てくださいね。お大事に！",
          py: "Kyou wa netsu ga aru node, ofuro wa hairazu ni hayaku nete kudasai ne. Odaiji ni!"
        }
      ]
    },
    {
      id: "jtd09",
      title: "Mượn sách tại thư viện",
      scene: "Sinh viên đến quầy dịch vụ thư viện thành phố để làm thẻ đọc sách và mượn giáo trình tiếng Nhật.",
      roleA: {
        name: "Bạn đọc (Bạn)",
        char: "Bạn đọc",
        avatar: "📚"
      },
      roleB: {
        name: "Thủ thư",
        char: "Thủ thư",
        avatar: "👓"
      },
      sentences: [
        {
          who: "A",
          ja: "すみません、初めてですが、本を借りるカードを作りたいです。",
          kana: "すみません、はじめてですが、ほんをかりるカードをつくりたいです。",
          romaji: "Sumimasen, hajimete desu ga, hon o kariru kaado o tsukuritai desu.",
          vi: "Xin lỗi, tôi mới đến lần đầu, tôi muốn làm thẻ mượn sách ạ.",
          en: "Excuse me, it is my first time here, I would like to make a library card.",
          ipa: "Sumimasen, hajimete desu ga, hon o kariru kaado o tsukuritai desu.",
          zh: "すみません、初めてですが、本を借りるカードを作りたいです。",
          py: "Sumimasen, hajimete desu ga, hon o kariru kaado o tsukuritai desu."
        },
        {
          who: "B",
          ja: "かしこまりました。こちらの申込用紙にお名前とご住所を書いてください。",
          kana: "かしこまりました。こちらのもうしこみようしにおなまえとごじゅうしょをかいてください。",
          romaji: "Kashikomarimashita. Kochira no moushikomi youshi ni onamae to gojuusho o kaite kudasai.",
          vi: "Tôi hiểu rồi ạ. Bạn vui lòng điền họ tên và địa chỉ vào phiếu đăng ký này nhé.",
          en: "Certainly. Please write your name and address on this application form.",
          ipa: "Kashikomarimashita. Kochira no moushikomi youshi ni onamae to gojuusho o kaite kudasai.",
          zh: "かしこまりました。こちらの申込用紙にお名前とご住所を書いてください。",
          py: "Kashikomarimashita. Kochira no moushikomi youshi ni onamae to gojuusho o kaite kudasai."
        },
        {
          who: "A",
          ja: "書きました。在留カードも必要ですか。",
          kana: "かきました。ざいりゅうカードもひつようですか。",
          romaji: "Kakimashita. Zairyuu kaado mo hitsuyou desu ka.",
          vi: "Tôi viết xong rồi. Thẻ cư trú (Zairyu Card) có cần xuất trình không ạ?",
          en: "Filled it out. Do you need my residence card as well?",
          ipa: "Kakimashita. Zairyuu kaado mo hitsuyou desu ka.",
          zh: "書きました。在留カードも必要ですか。",
          py: "Kakimashita. Zairyuu kaado mo hitsuyou desu ka."
        },
        {
          who: "B",
          ja: "はい、身元確認のために拝見します。ありがとうございます。",
          kana: "はい、みもとかくにんのためにはいけんします。ありがとうございます。",
          romaji: "Hai, mimoto kakunin no tame ni haiken shimasu. Arigatou gozaimasu.",
          vi: "Vâng, cho tôi xem để xác nhận danh tính nhé. Cảm ơn bạn.",
          en: "Yes, I will check it to verify your identity. Thank you.",
          ipa: "Hai, mimoto kakunin no tame ni haiken shimasu. Arigatou gozaimasu.",
          zh: "はい、身元確認のために拝見します。ありがとうございます。",
          py: "Hai, mimoto kakunin no tame ni haiken shimasu. Arigatou gozaimasu."
        },
        {
          who: "A",
          ja: "一度に何冊まで本を借りられますか。",
          kana: "いちどになんさつまでほんをかりられますか。",
          romaji: "Ichido ni nansatsu made hon o kariraremasu ka.",
          vi: "Một lần tôi có thể mượn tối đa mấy quyển sách vậy ạ?",
          en: "How many books can I borrow at a time?",
          ipa: "Ichido ni nansatsu made hon o kariraremasu ka.",
          zh: "一度に何冊まで本を借りられますか。",
          py: "Ichido ni nansatsu made hon o kariraremasu ka."
        },
        {
          who: "B",
          ja: "一人五冊まで、二週間借りることができます。",
          kana: "ひとりごさつまで、にしゅうかんかりることができます。",
          romaji: "Hitori gosatsu made, nishuukan kariru koto ga dekimasu.",
          vi: "Mỗi người được mượn tối đa 5 cuốn trong vòng hai tuần ạ.",
          en: "Up to 5 books per person for two weeks.",
          ipa: "Hitori gosatsu made, nishuukan kariru koto ga dekimasu.",
          zh: "一人五冊まで、二週間借りることができます。",
          py: "Hitori gosatsu made, nishuukan kariru koto ga dekimasu."
        },
        {
          who: "A",
          ja: "日本語の学習書はこの二冊をお願いします。",
          kana: "にほんごのがくしゅうしょはこのにさつをおねがいします。",
          romaji: "Nihongo no gakushuusho wa kono nisatsu o onegaishimasu.",
          vi: "Sách học tiếng Nhật thì cho tôi mượn hai cuốn này nhé.",
          en: "For Japanese textbooks, I would like these two books please.",
          ipa: "Nihongo no gakushuusho wa kono nisatsu o onegaishimasu.",
          zh: "日本語の学習書はこの二冊をお願いします。",
          py: "Nihongo no gakushuusho wa kono nisatsu o onegaishimasu."
        },
        {
          who: "B",
          ja: "はい、返却期日は来週の木曜日です。こちらが利用者カードです。",
          kana: "はい、へんきゃくきじつはらいしゅうのもくようびです。こちらがりようしゃカードです。",
          romaji: "Hai, henkyaku kijitsu wa raishuu no mokuyoubi desu. Kochira ga riyousha kaado desu.",
          vi: "Vâng, hạn trả sách là thứ Năm tuần sau nhé. Đây là thẻ thư viện của bạn.",
          en: "Here you go, due date is next Thursday. Here is your user card.",
          ipa: "Hai, henkyaku kijitsu wa raishuu no mokuyoubi desu. Kochira ga riyousha kaado desu.",
          zh: "はい、返却期日は来週の木曜日です。こちらが利用者カードです。",
          py: "Hai,返却期日は来週の木曜日です。こちらが利用者カードです。"
        }
      ]
    },
    {
      id: "jtd10",
      title: "Trò chuyện về sở thích cuối tuần",
      scene: "Hai người bạn ngồi nghỉ uống trà sau giờ tan học và hỏi thăm sở thích, thói quen sinh hoạt ngày nghỉ.",
      roleA: {
        name: "Nam (Bạn)",
        char: "Nam",
        avatar: "☕"
      },
      roleB: {
        name: "Yuka (Bạn học)",
        char: "Yuka",
        avatar: "🌸"
      },
      sentences: [
        {
          who: "A",
          ja: "ユカさん、週末はいつもどんなことをして過ごしていますか。",
          kana: "ユカさん、しゅうまつはいつもどんなことをしてすごしていますか。",
          romaji: "Yuka-san, shuumatsu wa itsumo donna koto o shite sugoshite imasu ka.",
          vi: "Yuka ơi, cuối tuần bạn thường trải qua như thế nào?",
          en: "Yuka, how do you usually spend your weekends?",
          ipa: "Yuka-san, shuumatsu wa itsumo donna koto o shite sugoshite imasu ka.",
          zh: "ユカさん、週末はいつもどんなことをして過ごしていますか。",
          py: "Yuka-san, shuumatsu wa itsumo donna koto o shite sugoshite imasu ka."
        },
        {
          who: "B",
          ja: "私はカフェで本を読んだり、写真を撮りに行ったりするのが好きです。",
          kana: "わたしはカフェでほんをよんだり、しゃしんをとりにおこなったりするのがすきです。",
          romaji: "Watashi wa kafe de hon o yondari, shashin o tori ni ittari suru no ga suki desu.",
          vi: "Mình thích đọc sách ở quán cà phê hoặc đi chụp ảnh phong cảnh.",
          en: "I like reading books at cafes and going out to take photos.",
          ipa: "Watashi wa kafe de hon o yondari, shashin o tori ni ittari suru no ga suki desu.",
          zh: "私はカフェで本を読んだり、写真を撮りに行ったりするのが好きです。",
          py: "Watashi wa kafe de hon o yondari, shashin o tori ni ittari suru no ga suki desu."
        },
        {
          who: "A",
          ja: "写真ですか！どんな写真を撮りますか。",
          kana: "しゃしんですか！どんなしゃしんをとりますか。",
          romaji: "Shashin desu ka! Donna shashin o torimasu ka.",
          vi: "Chụp ảnh á! Bạn hay chụp những thể loại ảnh nào?",
          en: "Photography! What kind of photos do you take?",
          ipa: "Shashin desu ka! Donna shashin o torimasu ka.",
          zh: "写真ですか！どんな写真を撮りますか。",
          py: "Shashin desu ka! Donna shashin o torimasu ka."
        },
        {
          who: "B",
          ja: "公園の花や、古い街並みの風景をよく撮ります。ナムさんの趣味は何ですか。",
          kana: "こうえんのはなや、ふるいまちなみのふうけいをよくとります。ナムさんのしゅみはなんですか。",
          romaji: "Kouen no hana ya, furui machinami no fuukei o yoku torimasu. Namu-san no shumi wa nan desu ka.",
          vi: "Mình hay chụp hoa trong công viên và phố cổ. Thế sở thích của Nam là gì?",
          en: "I often shoot park flowers and old townscapes. What is your hobby, Nam?",
          ipa: "Kouen no hana ya, furui machinami no fuukei o yoku torimasu. Namu-san no shumi wa nan desu ka.",
          zh: "公園の花や、古い街並みの風景をよく撮ります。ナムさんの趣味は何ですか。",
          py: "Kouen no hana ya, furui machinami no fuukei o yoku torimasu. Namu-san no shumi wa nan desu ka."
        },
        {
          who: "A",
          ja: "私の趣味は音楽を聞くことと、ギターを弾くことです。",
          kana: "わたしのしゅみはおんがくをきくことと、ギターをひくことです。",
          romaji: "Watashi no shumi wa ongaku o kiku koto to, gitaa o hiku koto desu.",
          vi: "Sở thích của mình là nghe nhạc và chơi đàn guitar.",
          en: "My hobbies are listening to music and playing guitar.",
          ipa: "Watashi no shumi wa ongaku o kiku koto to, gitaa o hiku koto desu.",
          zh: "私の趣味は音楽を聞くことと、ギターを弾くことです。",
          py: "Watashi no shumi wa ongaku o kiku koto to, gitaa o hiku koto desu."
        },
        {
          who: "B",
          ja: "ギターが弾けるんですか！かっこいいですね。",
          kana: "ギターがひけるんですか！かっこいいですね。",
          romaji: "Gitaa ga hikeru n desu ka! Kakkoii desu ne.",
          vi: "Bạn chơi được cả đàn guitar á! Ngầu ghê đó.",
          en: "You can play the guitar! That is so cool.",
          ipa: "Gitaa ga hikeru n desu ka! Kakkoii desu ne.",
          zh: "ギターが弾けるんですか！かっこいいですね。",
          py: "Gitaa ga hikeru n desu ka! Kakkoii desu ne."
        },
        {
          who: "A",
          ja: "まだ練習中ですが、日本のJ-POPの曲も練習しています。",
          kana: "まだれんしゅうちゅうですが、にほんのジェイポップのきょくもれんしゅうしています。",
          romaji: "Mada renshuuchuu desu ga, Nihon no Jeipoppu no kyoku mo renshuu shite imasu.",
          vi: "Mình vẫn đang tập luyện thôi, nhưng mình cũng đang tập các bài hát J-POP của Nhật nữa.",
          en: "Still practicing, but I also practice Japanese J-POP songs.",
          ipa: "Mada renshuuchuu desu ga, Nihon no Jeipoppu no kyoku mo renshuu shite imasu.",
          zh: "まだ練習中ですが、日本のJ-POPの曲も練習しています。",
          py: "Mada renshuuchuu desu ga, Nihon no Jeipoppu no kyoku mo renshuu shite imasu."
        },
        {
          who: "B",
          ja: "いつか聴かせてくださいね！今週末、一緒に新しいカフェへ行きませんか。",
          kana: "いつかきかせてくださいね！こんしゅうまつ、いっしょにあたらしいカフェへいきませんか。",
          romaji: "Itsuka kikasete kudasai ne! Konshuumatsu, isshoni atarashii kafe e ikimasen ka.",
          vi: "Hôm nào đàn cho mình nghe với nhé! Cuối tuần này, cùng mình đi thử quán cà phê mới mở không?",
          en: "Please play for me sometime! Would you like to check out a new cafe together this weekend?",
          ipa: "Itsuka kikasete kudasai ne! Konshuumatsu, isshoni atarashii kafe e ikimasen ka.",
          zh: "いつか聴かせてくださいね！今週末、一緒に新しいカフェへ行きませんか。",
          py: "Itsuka kikasete kudasai ne! Konshuumatsu, isshoni atarashii kafe e ikimasen ka."
        }
      ]
    }
  ];

  if (typeof window !== 'undefined') {
    window.JA_TALK_DIALOGUES = TALK_DIALOGUES;
    window.TALK_DIALOGUES_JA = TALK_DIALOGUES;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TALK_DIALOGUES };
  }
})();
