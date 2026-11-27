/**
 * data/ja/talk-scenarios.js
 * 8 kịch bản đàm thoại nhập vai Luyện nói (Talk Practice) N5:
 *  1. Konbini (Cửa hàng tiện lợi)
 *  2. Ga tàu (Train Station)
 *  3. Nhà hàng (Restaurant)
 *  4. Hỏi đường (Asking Directions)
 *  5. Tự giới thiệu (Self-Introduction)
 *  6. Mua vé (Buying Tickets)
 *  7. Khám bệnh (Clinic / Doctor)
 *  8. Khách sạn (Hotel Check-in)
 * Cùng cấu trúc turns t1.. như bản en/zh.
 */

(function () {
  'use strict';

  const TALK_SCENARIOS = [
    {
      id: "konbini",
      title: "Mua sắm tại cửa hàng tiện lợi (Konbini)",
      description: "Thực hành mua đồ ăn, yêu cầu hâm nóng cơm bento, từ chối túi nylon và thanh toán tại quầy thu ngân Konbini Nhật Bản.",
      topic: "Đời sống Nhật",
      difficulty: "N5",
      npc: {
        name: "Kenji",
        role: "Nhân viên thu ngân Konbini",
        avatarColor: "#059669",
        initials: "KJ",
        avatarSvg: "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#D1FAE5\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#059669\"/></svg>"
      },
      initialTurn: "t1",
      turns: {
        t1: {
          id: "t1",
          npc: {
            ja: "いらっしゃいませ！お弁当を温めますか。",
            kana: "いらっしゃいませ！おべんとうをあたためますか。",
            romaji: "Irasshaimase! Obentou o atatamemasu ka.",
            vi: "Kính chào quý khách! Hộp cơm bento này có cần hâm nóng không ạ?",
            en: "Welcome! Would you like me to warm up your bento box?",
            ipa: "Irasshaimase! Obentou o atatamemasu ka.",
            zh: "いらっしゃいませ！お弁当を温めますか。",
            py: "Irasshaimase! Obentou o atatamemasu ka."
          },
          user: {
            goal: "Nói có, xin hãy hâm nóng giúp tôi",
            answers: [
              {
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
                ja: "はい、お願いします。",
                kana: "はい、おねがいします。",
                romaji: "Hai, onegaishimasu.",
                vi: "Vâng, nhờ bạn giúp nhé.",
                en: "Yes, please.",
                ipa: "Hai, onegaishimasu.",
                zh: "はい、お願いします。",
                py: "Hai, onegaishimasu."
              }
            ],
            accept: {
              anyOf: ["はい", "温めて", "あたためて", "お願い", "おねがい", "hai", "atatamete", "onegaishimasu"],
              pattern: {}
            },
            next: "t2",
            fallback: "すみません、もう一度お願いします。(Xin lỗi, bạn có thể nói lại một lần nữa không?)"
          }
        },
        t2: {
          id: "t2",
          npc: {
            ja: "かしこまりました。レジ袋はご利用になりますか。",
            kana: "かしこまりました。レジぶくろはごりようになりますか。",
            romaji: "Kashikomarimashita. Rejibukuro wa goriyou ni narimasu ka.",
            vi: "Tôi hiểu rồi. Bạn có dùng túi nylon đựng hàng không ạ?",
            en: "Understood. Would you like a plastic shopping bag?",
            ipa: "Kashikomarimashita. Rejibukuro wa goriyou ni narimasu ka.",
            zh: "かしこまりました。レジ袋はご利用になりますか。",
            py: "Kashikomarimashita. Rejibukuro wa goriyou ni narimasu ka."
          },
          user: {
            goal: "Nói không cần, tôi có mang túi riêng",
            answers: [
              {
                ja: "いいえ、大丈夫です。袋はいりません。",
                kana: "いいえ、だいじょうぶです。ふくろはいりません。",
                romaji: "Iie, daijoubu desu. Fukuro wa irimasen.",
                vi: "Không, tôi ổn rồi. Tôi không cần túi đâu.",
                en: "No, I am fine. I do not need a bag.",
                ipa: "Iie, daijoubu desu. Fukuro wa irimasen.",
                zh: "いいえ、大丈夫です。袋はいりません。",
                py: "Iie, daijoubu desu. Fukuro wa irimasen."
              },
              {
                ja: "袋は結構です。マイバッグがあります。",
                kana: "ふくろはけっこうです。マイバッグがあります。",
                romaji: "Fukuro wa kekkou desu. Mai baggu ga arimasu.",
                vi: "Tôi không cần túi đâu. Tôi có túi riêng rồi.",
                en: "No bag needed, thank you. I have my own bag.",
                ipa: "Fukuro wa kekkou desu. Mai baggu ga arimasu.",
                zh: "袋は結構です。マイバッグがあります。",
                py: "Fukuro wa kekkou desu. Mai baggu ga arimasu."
              }
            ],
            accept: {
              anyOf: ["いいえ", "大丈夫", "だいじょうぶ", "いりません", "結構", "けっこう", "iie", "daijoubu", "irimasen"],
              pattern: {}
            },
            next: "t3",
            fallback: "レジ袋は必要ですか。(Bạn có cần túi đựng hàng không?)"
          }
        },
        t3: {
          id: "t3",
          npc: {
            ja: "お待たせしました。合計で七百五十円になります。",
            kana: "おまたせしました。ごうけいでななひゃくごじゅうえんになります。",
            romaji: "Omatase shimashita. Goukei de nanahyaku gojuu-en ni narimasu.",
            vi: "Xin lỗi để quý khách đợi lâu. Tổng cộng của quý khách là 750 yên.",
            en: "Thank you for waiting. Your total comes to 750 yen.",
            ipa: "Omatase shimashita. Goukei de nanahyaku gojuu-en ni narimasu.",
            zh: "お待たせしました。合計で七百五十円になります。",
            py: "Omatase shimashita. Goukei de nanahyaku gojuu-en ni narimasu."
          },
          user: {
            goal: "Đưa tiền hoặc nói trả bằng thẻ / tiền mặt",
            answers: [
              {
                ja: "千円札でお願いします。",
                kana: "せんえんさつでおねがいします。",
                romaji: "Sen'ensatsu de onegaishimasu.",
                vi: "Tôi gửi tờ một nghìn yên nhé.",
                en: "Here is a 1,000 yen bill, please.",
                ipa: "Sen'ensatsu de onegaishimasu.",
                zh: "千円札でお願いします。",
                py: "Sen'ensatsu de onegaishimasu."
              },
              {
                ja: "交通系ICカードで払えますか。",
                kana: "こうつうけいアイシーカードではらえますか。",
                romaji: "Koutsuukei aishii kaado de haraemasu ka.",
                vi: "Tôi thanh toán bằng thẻ IC giao thông (Suica/Pasmo) được không?",
                en: "Can I pay with an IC card?",
                ipa: "Koutsuukei aishii kaado de haraemasu ka.",
                zh: "交通系ICカードで払えますか。",
                py: "Koutsuukei aishii kaado de haraemasu ka."
              }
            ],
            accept: {
              anyOf: ["千円", "せんえん", "カード", "払えます", "おねがい", "sen'en", "card", "onegaishimasu"],
              pattern: {}
            },
            next: null,
            fallback: "ちょうど二万五千円お預かりします。ありがとうございました！またお越しくださいませ。"
          }
        }
      }
    },
    {
      id: "train-station",
      title: "Hỏi ga tàu & Đổi tuyến xe điện",
      description: "Thực hành hỏi nhân viên nhà ga Tokyo về tuyến tàu đi Shinjuku, vị trí sân ga và thời gian tàu chạy.",
      topic: "Giao thông",
      difficulty: "N5",
      npc: {
        name: "Sato",
        role: "Nhân viên nhà ga JR",
        avatarColor: "#2563EB",
        initials: "ST",
        avatarSvg: "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#DBEAFE\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#2563EB\"/></svg>"
      },
      initialTurn: "t1",
      turns: {
        t1: {
          id: "t1",
          npc: {
            ja: "ご案内します。何かお困りですか。",
            kana: "ごあんないします。なにかおこまりですか。",
            romaji: "Goannai shimasu. Nanika okomari desu ka.",
            vi: "Tôi có thể hỗ trợ quý khách. Bạn có điều gì cần trợ giúp không ạ?",
            en: "Can I help you? Are you having trouble finding something?",
            ipa: "Goannai shimasu. Nanika okomari desu ka.",
            zh: "ご案内します。何かお困りですか。",
            py: "Goannai shimasu. Nanika okomari desu ka."
          },
          user: {
            goal: "Hỏi đi đến ga Shinjuku thì đi tàu nào",
            answers: [
              {
                ja: "すみません、新宿駅へ行きたいですが、どの電車に乗ればいいですか。",
                kana: "すみません、しんじゅくえきへいきたいですが、どのでんしゃにのればいいですか。",
                romaji: "Sumimasen, Shinjuku-eki e ikitai desu ga, dono densha ni noreba ii desu ka.",
                vi: "Xin lỗi, tôi muốn đến ga Shinjuku, tôi nên lên chuyến tàu điện nào?",
                en: "Excuse me, I want to go to Shinjuku Station, which train should I take?",
                ipa: "Sumimasen, Shinjuku-eki e ikitai desu ga, dono densha ni noreba ii desu ka.",
                zh: "すみません、新宿駅へ行きたいですが、どの電車に乗ればいいですか。",
                py: "Sumimasen, Shinjuku-eki e ikitai desu ga, dono densha ni noreba ii desu ka."
              },
              {
                ja: "新宿へはどう行けばいいですか。",
                kana: "しんじゅくへはどういけばいいですか。",
                romaji: "Shinjuku e wa dou ikeba ii desu ka.",
                vi: "Làm thế nào để tôi đi đến Shinjuku được ạ?",
                en: "How can I get to Shinjuku?",
                ipa: "Shinjuku e wa dou ikeba ii desu ka.",
                zh: "新宿へはどう行けばいいですか。",
                py: "Shinjuku e wa dou ikeba ii desu ka."
              }
            ],
            accept: {
              anyOf: ["新宿", "しんじゅく", "電車", "でんしゃ", "行きたい", "いきたい", "Shinjuku", "densha", "ikitai"],
              pattern: {}
            },
            next: "t2",
            fallback: "どちらの駅まで行かれますか。(Quý khách muốn đi đến ga nào ạ?)"
          }
        },
        t2: {
          id: "t2",
          npc: {
            ja: "新宿でしたら、二番線の山手線内回りに乗ってください。",
            kana: "しんじゅくでしたら、にばんせんのやまのてせんうちまわりにのってください。",
            romaji: "Shinjuku deshitara, nibansen no Yamanote-sen uchimawari ni notte kudasai.",
            vi: "Nếu đến Shinjuku thì bạn hãy lên tàu tuyến Yamanote vòng trong ở đường ray số 2 nhé.",
            en: "For Shinjuku, please take the Yamanote Line inner loop from platform 2.",
            ipa: "Shinjuku deshitara, nibansen no Yamanote-sen uchimawari ni notte kudasai.",
            zh: "新宿でしたら、二番線の山手線内回りに乗ってください。",
            py: "Shinjuku deshitara, nibansen no Yamanote-sen uchimawari ni notte kudasai."
          },
          user: {
            goal: "Hỏi đi mất bao nhiêu phút",
            answers: [
              {
                ja: "何分くらいかかりますか。",
                kana: "なんぷんくらいかかりますか。",
                romaji: "Nanpun kurai kakarimasu ka.",
                vi: "Mất khoảng bao nhiêu phút vậy ạ?",
                en: "About how many minutes will it take?",
                ipa: "Nanpun kurai kakarimasu ka.",
                zh: "何分くらいかかりますか。",
                py: "Nanpun kurai kakarimasu ka."
              },
              {
                ja: "新宿まで時間はどのくらいですか。",
                kana: "しんじゅくまでじかんはどのくらいですか。",
                romaji: "Shinjuku made jikan wa dono kurai desu ka.",
                vi: "Thời gian đến Shinjuku là bao lâu ạ?",
                en: "How long does it take to Shinjuku?",
                ipa: "Shinjuku made jikan wa dono kurai desu ka.",
                zh: "新宿まで時間はどのくらいですか。",
                py: "Shinjuku made jikan wa dono kurai desu ka."
              }
            ],
            accept: {
              anyOf: ["何分", "なんぷん", "時間", "じかん", "どのくらい", "nanpun", "jikan", "kakarimasu"],
              pattern: {}
            },
            next: "t3",
            fallback: "山手線で約十五分ほどで到着しますよ。(Đi tuyến Yamanote khoảng 15 phút là đến nơi thôi.)"
          }
        },
        t3: {
          id: "t3",
          npc: {
            ja: "十五分ほどで着きますよ。次の電車は五分後に出ます。",
            kana: "じゅうごふんほどでつきますよ。つぎのでんしゃはごふんごにでます。",
            romaji: "Juugofun hodo de tsukimasu yo. Tsugi no densha wa gofungo ni demasu.",
            vi: "Khoảng 15 phút là tới nơi nhé. Chuyến tàu tiếp theo sẽ chạy sau 5 phút nữa.",
            en: "It takes about 15 minutes. The next train departs in 5 minutes.",
            ipa: "Juugofun hodo de tsukimasu yo. Tsugi no densha wa gofungo ni demasu.",
            zh: "十五分ほどで着きますよ。次の電車は五分後に出ます。",
            py: "Juugofun hodo de tsukimasu yo. Tsugi no densha wa gofungo ni demasu."
          },
          user: {
            goal: "Cảm ơn nhân viên nhà ga",
            answers: [
              {
                ja: "分かりました。親切に教えていただき、ありがとうございます！",
                kana: "わかりました。しんせつにおしえていただき、ありがとうございます！",
                romaji: "Wakarimashita. Shinsetsu ni oshiete itadaki, arigatou gozaimasu!",
                vi: "Tôi hiểu rồi. Cảm ơn bạn rất nhiều vì đã tận tình chỉ dẫn!",
                en: "I understand. Thank you very much for your kind help!",
                ipa: "Wakarimashita. Shinsetsu ni oshiete itadaki, arigatou gozaimasu!",
                zh: "分かりました。親切に教えていただき、ありがとうございます！",
                py: "Wakarimashita. Shinsetsu ni oshiete itadaki, arigatou gozaimasu!"
              },
              {
                ja: "どうもありがとうございました！",
                kana: "どうもありがとうございました！",
                romaji: "Doumo arigatou gozaimashita!",
                vi: "Cảm ơn bạn rất nhiều!",
                en: "Thank you very much!",
                ipa: "Doumo arigatou gozaimashita!",
                zh: "どうもありがとうございました！",
                py: "Doumo arigatou gozaimashita!"
              }
            ],
            accept: {
              anyOf: ["わかりました", "分かりました", "ありがとう", "どうも", "wakarimashita", "arigatou"],
              pattern: {}
            },
            next: null,
            fallback: "いいえ、どういたしまして。お気をつけていってらっしゃいませ！"
          }
        }
      }
    },
    {
      id: "restaurant",
      title: "Gọi món tại nhà hàng Ramen Nhật Bản",
      description: "Thực hành bước vào quán ăn, yêu cầu chỗ ngồi, gọi mì ramen, gọi đồ uống kèm và xin hóa đơn thanh toán.",
      topic: "Ẩm thực",
      difficulty: "N5",
      npc: {
        name: "Yuki",
        role: "Nhân viên phục vụ quán ăn",
        avatarColor: "#EA580C",
        initials: "YK",
        avatarSvg: "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#FFEDD5\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#EA580C\"/></svg>"
      },
      initialTurn: "t1",
      turns: {
        t1: {
          id: "t1",
          npc: {
            ja: "いらっしゃいませ！何名様でしょうか。",
            kana: "いらっしゃいませ！なんめいさまでしょうか。",
            romaji: "Irasshaimase! Nanmei-sama deshou ka.",
            vi: "Kính chào quý khách! Quý khách đi mấy người ạ?",
            en: "Welcome! How many guests in your party?",
            ipa: "Irasshaimase! Nanmei-sama deshou ka.",
            zh: "いらっしゃいませ！何名様でしょうか。",
            py: "Irasshaimase! Nanmei-sama deshou ka."
          },
          user: {
            goal: "Nói đi hai người và muốn ngồi bàn",
            answers: [
              {
                ja: "二人です。テーブル席をお願いします。",
                kana: "ふたりです。テーブルせきをおねがいします。",
                romaji: "Futari desu. Teeburuseki o onegaishimasu.",
                vi: "Hai người ạ. Cho chúng tôi xin bàn nhé.",
                en: "Two people. A table please.",
                ipa: "Futari desu. Teeburuseki o onegaishimasu.",
                zh: "二人です。テーブル席をお願いします。",
                py: "Futari desu. Teeburuseki o onegaishimasu."
              },
              {
                ja: "一人です。カウンター席でいいです。",
                kana: "ひとりです。カウンターせきでいいです。",
                romaji: "Hitori desu. Kauntaaseki de ii desu.",
                vi: "Một người ạ. Ngồi quầy bar cũng được ạ.",
                en: "Just one person. The counter is fine.",
                ipa: "Hitori desu. Kauntaaseki de ii desu.",
                zh: "一人です。カウンター席でいいです。",
                py: "Hitori desu. Kauntaaseki de ii desu."
              }
            ],
            accept: {
              anyOf: ["二人", "ふたり", "一人", "ひとり", "テーブル", "カウンター", "futari", "hitori", "onegaishimasu"],
              pattern: {}
            },
            next: "t2",
            fallback: "何名様ですか。(Quý khách đi mấy người ạ?)"
          }
        },
        t2: {
          id: "t2",
          npc: {
            ja: "こちらのテーブル席へどうぞ。ご注文はお決まりですか。",
            kana: "こちらのテーブルせきへどうぞ。ごちゅうもんはあきまりですか。",
            romaji: "Kochira no teeburuseki e douzo. Gochuumon wa okimari desu ka.",
            vi: "Mời bạn sang bàn này ạ. Bạn đã chọn xong món chưa ạ?",
            en: "Please take this table. Are you ready to order?",
            ipa: "Kochira no teeburuseki e douzo. Gochuumon wa okimari desu ka.",
            zh: "こちらのテーブル席へどうぞ。ご注文はお決まりですか。",
            py: "Kochira no teeburuseki e douzo. Gochuumon wa okimari desu ka."
          },
          user: {
            goal: "Gọi một bát mì ramen miso và một phần há cảo gyoza",
            answers: [
              {
                ja: "味噌ラーメン一つと、餃子を一皿ください。",
                kana: "みそラーメンひとつと、ぎょうざをひとさらください。",
                romaji: "Miso raamen hitotsu to, gyouza o hitosara kudasai.",
                vi: "Cho tôi một bát mì ramen miso và một đĩa há cảo gyoza nhé.",
                en: "One miso ramen and one plate of gyoza please.",
                ipa: "Miso raamen hitotsu to, gyouza o hitosara kudasai.",
                zh: "味噌ラーメン一つと、餃子を一皿ください。",
                py: "Miso raamen hitotsu to, gyouza o hitosara kudasai."
              },
              {
                ja: "醤油ラーメンとウーロン茶をお願いします。",
                kana: "しょうゆラーメンとウーロンちゃをおねがいします。",
                romaji: "Shouyu raamen to uuroncha o onegaishimasu.",
                vi: "Cho tôi mì ramen xì dầu và trà ô long nhé.",
                en: "Soy sauce ramen and oolong tea please.",
                ipa: "Shouyu raamen to uuroncha o onegaishimasu.",
                zh: "醤油ラーメンとウーロン茶をお願いします。",
                py: "Shouyu raamen to uuroncha o onegaishimasu."
              }
            ],
            accept: {
              anyOf: ["ラーメン", "みそ", "味噌", "餃子", "ぎょうざ", "ひとつ", "ください", "raamen", "gyouza", "kudasai"],
              pattern: {}
            },
            next: "t3",
            fallback: "かしこまりました。ラーメンの麺の硬さはいかがなさいますか。(Quý khách muốn sợi mì cứng vừa hay mềm ạ?)"
          }
        },
        t3: {
          id: "t3",
          npc: {
            ja: "かしこまりました。麺の硬さは普通でよろしいですか。",
            kana: "かしこまりました。めんのかたさはふつうでよろしいですか。",
            romaji: "Kashikomarimashita. Men no katasa wa futsuu de yoroshii desu ka.",
            vi: "Tôi hiểu rồi ạ. Độ cứng sợi mì để mức bình thường quý khách nhé?",
            en: "Understood. Normal noodle firmness is fine?",
            ipa: "Kashikomarimashita. Men no katasa wa futsuu de yoroshii desu ka.",
            zh: "かしこまりました。麺の硬さは普通でよろしいですか。",
            py: "Kashikomarimashita. Men no katasa wa futsuu de yoroshii desu ka."
          },
          user: {
            goal: "Nói vâng mức bình thường là được, cảm ơn bạn",
            answers: [
              {
                ja: "はい、普通でお願いします。ありがとうございます。",
                kana: "はい、ふつうでおねがいします。ありがとうございます。",
                romaji: "Hai, futsuu de onegaishimasu. Arigatou gozaimasu.",
                vi: "Vâng, bình thường là được rồi. Cảm ơn bạn.",
                en: "Yes, normal please. Thank you.",
                ipa: "Hai, futsuu de onegaishimasu. Arigatou gozaimasu.",
                zh: "はい、普通でお願いします。ありがとうございます。",
                py: "Hai, futsuu de onegaishimasu. Arigatou gozaimasu."
              },
              {
                ja: "はい、それでいいです。",
                kana: "はい、それでいいです。",
                romaji: "Hai, sore de ii desu.",
                vi: "Vâng, như vậy là được ạ.",
                en: "Yes, that is fine.",
                ipa: "Hai, sore de ii desu.",
                zh: "はい、それでいいです。",
                py: "Hai, sore de ii desu."
              }
            ],
            accept: {
              anyOf: ["はい", "普通", "ふつう", "それでいい", "おねがい", "hai", "futsuu", "onegaishimasu"],
              pattern: {}
            },
            next: null,
            fallback: "ありがとうございます！少々お待ちくださいませ。(Cảm ơn quý khách, xin vui lòng đợi trong giây lát ạ!)"
          }
        }
      }
    },
    {
      id: "asking-directions",
      title: "Hỏi đường đi đến địa điểm tham quan",
      description: "Thực hành dừng lại hỏi người đi đường về vị trí đền Asakusa Sensoji hoặc bảo tàng mỹ thuật gần nhất.",
      topic: "Du lịch & Chỉ đường",
      difficulty: "N5",
      npc: {
        name: "Haruto",
        role: "Người dân địa phương ở Tokyo",
        avatarColor: "#7C3AED",
        initials: "HT",
        avatarSvg: "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#EDE9FE\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#7C3AED\"/></svg>"
      },
      initialTurn: "t1",
      turns: {
        t1: {
          id: "t1",
          npc: {
            ja: "こんにちは！何かお探しですか。道に迷いましたか。",
            kana: "こんにちは！なにかおさがしですか。みちにまよいましたか。",
            romaji: "Konnichiwa! Nanika osagashi desu ka. Michi ni mayoimashita ka.",
            vi: "Xin chào! Bạn đang tìm nơi nào vậy? Bạn có bị lạc đường không?",
            en: "Hello! Are you looking for something? Are you lost?",
            ipa: "Konnichiwa! Nanika osagashi desu ka. Michi ni mayoimashita ka.",
            zh: "こんにちは！何かお探しですか。道に迷いましたか。",
            py: "Konnichiwa! Nanika osagashi desu ka. Michi ni mayoimashita ka."
          },
          user: {
            goal: "Hỏi xin lỗi, chùa Sensoji ở đâu vậy ạ",
            answers: [
              {
                ja: "すみません、浅草の浅草寺はどこですか。",
                kana: "すみません、あさくさのせんそうじはどこですか。",
                romaji: "Sumimasen, Asakusa no Sensoji wa doko desu ka.",
                vi: "Xin lỗi, chùa Sensoji ở Asakusa nằm ở đâu vậy ạ?",
                en: "Excuse me, where is Sensoji Temple in Asakusa?",
                ipa: "Sumimasen, Asakusa no Sensoji wa doko desu ka.",
                zh: "すみません、浅草の浅草寺はどこですか。",
                py: "Sumimasen, Asakusa no Sensoji wa doko desu ka."
              },
              {
                ja: "あのう、浅草寺への行き方を教えていただけますか。",
                kana: "あのう、せんそうじへのいきかたをおしえていただけますか。",
                romaji: "Anou, Sensoji e no ikikata o oshiete itadakemasu ka.",
                vi: "Dạ xin hỏi, bạn có thể chỉ cho tôi đường đi đến chùa Sensoji được không?",
                en: "Excuse me, could you tell me how to get to Sensoji Temple?",
                ipa: "Anou, Sensoji e no ikikata o oshiete itadakemasu ka.",
                zh: "あのう、浅草寺への行き方を教えていただけますか。",
                py: "Anou, Sensoji e no ikikata o oshiete itadakemasu ka."
              }
            ],
            accept: {
              anyOf: ["すみません", "浅草寺", "せんそうじ", "どこ", "行き方", "いきかた", "sumimasen", "sensoji", "doko"],
              pattern: {}
            },
            next: "t2",
            fallback: "浅草寺ですね。すぐ近くですよ。(Chùa Sensoji phải không? Rất gần đây thôi.)"
          }
        },
        t2: {
          id: "t2",
          npc: {
            ja: "浅草寺ですね！この道をまっすぐ行って、大きな赤い門が見えますよ。",
            kana: "せんそうじですね！このみちをまっすぐいって、おおきなあかいもんがみえますよ。",
            romaji: "Sensoji desu ne! Kono michi o massugu itte, ookina akai mon ga miemasu yo.",
            vi: "Chùa Sensoji đúng không! Bạn cứ đi thẳng con đường này, sẽ nhìn thấy một chiếc cổng màu đỏ rất lớn đấy.",
            en: "Sensoji Temple! Go straight down this street, and you will see a huge red gate.",
            ipa: "Sensoji desu ne! Kono michi o massugu itte, ookina akai mon ga miemasu yo.",
            zh: "浅草寺ですね！この道をまっすぐ行って、大きな赤い門が見えますよ。",
            py: "Sensoji desu ne! Kono michi o massugu itte, ookina akai mon ga miemasu yo."
          },
          user: {
            goal: "Hỏi cổng đó có tên là cổng Kaminarimon (Lôi Môn) không",
            answers: [
              {
                ja: "雷門のことですか。歩いてどのくらいですか。",
                kana: "かみなりもんのことですか。あるいてどのくらいですか。",
                romaji: "Kaminarimon no koto desu ka. Aruite dono kurai desu ka.",
                vi: "Ý bạn là cổng Kaminarimon phải không? Đi bộ mất khoảng bao lâu ạ?",
                en: "Do you mean the Kaminarimon gate? About how long on foot?",
                ipa: "Kaminarimon no koto desu ka. Aruite dono kurai desu ka.",
                zh: "雷門のことですか。歩いてどのくらいですか。",
                py: "Kaminarimon no koto desu ka. Aruite dono kurai desu ka."
              },
              {
                ja: "ここから近いですか。",
                kana: "ここからちかいですか。",
                romaji: "Koko kara chikai desu ka.",
                vi: "Từ đây có gần không ạ?",
                en: "Is it close from here?",
                ipa: "Koko kara chikai desu ka.",
                zh: "ここから近いですか。",
                py: "Koko kara chikai desu ka."
              }
            ],
            accept: {
              anyOf: ["雷門", "かみなりもん", "歩いて", "あるいて", "近い", "ちかい", "kaminarimon", "aruite", "chikai"],
              pattern: {}
            },
            next: "t3",
            fallback: "はい、雷門です。歩いて三分ほどですぐ着きますよ。(Đúng rồi, cổng Lôi Môn đấy. Đi bộ 3 phút là tới thôi.)"
          }
        },
        t3: {
          id: "t3",
          npc: {
            ja: "そうです、雷門です！歩いて三分ほどですよ。門をくぐると仲見世通りです。",
            kana: "そうです、かみなりもんです！あるいてさんぷんほどですよ。もんをくぐるとなかみせどおりです。",
            romaji: "Sou desu, Kaminarimon desu! Aruite sanpun hodo desu yo. Mon o kuguru to Nakamise-doori desu.",
            vi: "Đúng rồi, là cổng Kaminarimon! Đi bộ khoảng 3 phút thôi. Đi qua cổng là đến phố mua sắm Nakamise.",
            en: "Yes, that is Kaminarimon! It is about 3 minutes walk. Passing the gate leads to Nakamise shopping street.",
            ipa: "Sou desu, Kaminarimon desu! Aruite sanpun hodo desu yo. Mon o kuguru to Nakamise-doori desu.",
            zh: "そうです、雷門です！歩いて三分ほどですよ。門をくぐると仲見世通りです。",
            py: "Sou desu, Kaminarimon desu! Aruite sanpun hodo desu yo. Mon o kuguru to Nakamise-doori desu."
          },
          user: {
            goal: "Cảm ơn người chỉ đường rất nhiệt tình",
            answers: [
              {
                ja: "詳しく教えてくれてありがとうございます！行ってきます。",
                kana: "くわしくおしえてくれてありがとうございます！いってきます。",
                romaji: "Kuwashiku oshiete kurete arigatou gozaimasu! Itte kimasu.",
                vi: "Cảm ơn bạn đã chỉ dẫn chi tiết cho tôi! Tôi đi đây ạ.",
                en: "Thank you for explaining so clearly! I am on my way.",
                ipa: "Kuwashiku oshiete kurete arigatou gozaimasu! Itte kimasu.",
                zh: "詳しく教えてくれてありがとうございます！行ってきます。",
                py: "Kuwashiku oshiete kurete arigatou gozaimasu! Itte kimasu."
              },
              {
                ja: "助かりました、どうもありがとうございます！",
                kana: "たすかりました、どうもありがとうございます！",
                romaji: "Tasukarimashita, doumo arigatou gozaimasu!",
                vi: "May quá được bạn giúp, cảm ơn bạn rất nhiều!",
                en: "That was very helpful, thank you so much!",
                ipa: "Tasukarimashita, doumo arigatou gozaimasu!",
                zh: "助かりました、どうもありがとうございます！",
                py: "Tasukarimashita, doumo arigatou gozaimasu!"
              }
            ],
            accept: {
              anyOf: ["ありがとう", "助かりました", "たすかりました", "行ってきます", "arigatou", "tasukarimashita"],
              pattern: {}
            },
            next: null,
            fallback: "良い東京観光を！気をつけて楽しんできてくださいね。(Chúc bạn có chuyến tham quan Tokyo vui vẻ nhé!)"
          }
        }
      }
    },
    {
      id: "self-intro",
      title: "Gặp gỡ lần đầu & Tự giới thiệu bản thân",
      description: "Thực hành chào hỏi xã giao, giới thiệu họ tên, quốc tịch, trường học và sở thích cá nhân với người bạn Nhật.",
      topic: "Giao lưu kết bạn",
      difficulty: "N5",
      npc: {
        name: "Aoi",
        role: "Bạn sinh viên người Nhật",
        avatarColor: "#DB2777",
        initials: "AI",
        avatarSvg: "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#FCE7F3\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#DB2777\"/></svg>"
      },
      initialTurn: "t1",
      turns: {
        t1: {
          id: "t1",
          npc: {
            ja: "初めまして！国際交流サークルの青井です。お名前は何とおっしゃいますか。",
            kana: "はじめまして！こくさいこうりゅうサークルのあおいです。おなまえはなんとおっしゃいますか。",
            romaji: "Hajimemashite! Kokusai kouryuu saakuru no Aoi desu. Onamae wa nan to osshaimasu ka.",
            vi: "Rất vui được gặp bạn! Tôi là Aoi thuộc câu lạc bộ giao lưu quốc tế. Xin hỏi bạn tên là gì ạ?",
            en: "Nice to meet you! I am Aoi from the international club. May I ask your name?",
            ipa: "Hajimemashite! Kokusai kouryuu saakuru no Aoi desu. Onamae wa nan to osshaimasu ka.",
            zh: "初めまして！国際交流サークルの青井です。お名前は何とおっしゃいますか。",
            py: "Hajimemashite! Kokusai kouryuu saakuru no Aoi desu. Onamae wa nan to osshaimasu ka."
          },
          user: {
            goal: "Tự giới thiệu tên của bạn và nói bạn đến từ Việt Nam",
            answers: [
              {
                ja: "初めまして！ナムと申します。ベトナムから来ました。",
                kana: "はじめまして！ナムともうします。ベトナムからきました。",
                romaji: "Hajimemashite! Namu to moushimasu. Betonamu kara kimashita.",
                vi: "Rất vui được gặp bạn! Tôi tên là Nam. Tôi đến từ Việt Nam.",
                en: "Nice to meet you! My name is Nam. I am from Vietnam.",
                ipa: "Hajimemashite! Namu to moushimasu. Betonamu kara kimashita.",
                zh: "初めまして！ナムと申します。ベトナムから来ました。",
                py: "Hajimemashite! Namu to moushimasu. Betonamu kara kimashita."
              },
              {
                ja: "初めまして、ナムです。どうぞよろしくお願いします。",
                kana: "はじめまして、ナムです。どうぞよろしくおねがいします。",
                romaji: "Hajimemashite, Namu desu. Douzo yoroshiku onegaishimasu.",
                vi: "Chào bạn, tôi là Nam. Rất mong nhận được sự giúp đỡ của bạn.",
                en: "Nice to meet you, I am Nam. Pleased to meet you.",
                ipa: "Hajimemashite, Namu desu. Douzo yoroshiku onegaishimasu.",
                zh: "初めまして、ナムです。どうぞよろしくお願いします。",
                py: "Hajimemashite, Namu desu. Douzo yoroshiku onegaishimasu."
              }
            ],
            accept: {
              anyOf: ["初めまして", "はじめまして", "ナム", "ベトナム", "よろしく", "hajimemashite", "Nam", "Betonamu"],
              pattern: {}
            },
            next: "t2",
            fallback: "ナムさんですね！よろしくお願いします。(Bạn Nam đúng không! Rất mong được làm quen với bạn.)"
          }
        },
        t2: {
          id: "t2",
          npc: {
            ja: "ナムさん、よろしくお願いします！日本へは何のために来ましたか。",
            kana: "ナムさん、よろしくおねがいします！にほんへはなんのためにきましたか。",
            romaji: "Namu-san, yoroshiku onegaishimasu! Nihon e wa nan no tame ni kimashita ka.",
            vi: "Chào bạn Nam, rất vui được làm quen! Bạn đến Nhật Bản với mục đích gì vậy?",
            en: "Nice to meet you, Nam! What brought you to Japan?",
            ipa: "Namu-san, yoroshiku onegaishimasu! Nihon e wa nan no tame ni kimashita ka.",
            zh: "ナムさん、よろしくお願いします！日本へは何のために来ましたか。",
            py: "Namu-san, yoroshiku onegaishimasu! Nihon e wa nan no tame ni kimashita ka."
          },
          user: {
            goal: "Nói bạn đến Nhật để học tiếng Nhật và công nghệ",
            answers: [
              {
                ja: "日本語とIT技術を勉強するために来ました。",
                kana: "にほんごとアイティーぎじゅつをべんきょうするためにきました。",
                romaji: "Nihongo to aitii gijutsu o benkyou suru tame ni kimashita.",
                vi: "Tôi đến để học tiếng Nhật và công nghệ thông tin (IT).",
                en: "I came to study Japanese and IT technology.",
                ipa: "Nihongo to aitii gijutsu o benkyou suru tame ni kimashita.",
                zh: "日本語とIT技術を勉強するために来ました。",
                py: "Nihongo to aitii gijutsu o benkyou suru tame ni kimashita."
              },
              {
                ja: "大学で勉強している留学生です。",
                kana: "だいがくでべんきょうしているりゅうがくせいです。",
                romaji: "Daigaku de benkyou shite iru ryuugakusei desu.",
                vi: "Tôi là du học sinh đang học tại trường đại học.",
                en: "I am an international student studying at university.",
                ipa: "Daigaku de benkyou shite iru ryuugakusei desu.",
                zh: "大学で勉強している留学生です。",
                py: "Daigaku de benkyou shite iru ryuugakusei desu."
              }
            ],
            accept: {
              anyOf: ["日本語", "にほんご", "勉強", "べんきょう", "留学生", "りゅうがくせい", "IT", "nihongo", "benkyou"],
              pattern: {}
            },
            next: "t3",
            fallback: "素晴らしいですね！ITの勉強、応援しています。(Tuyệt vời quá! Mình luôn ủng hộ bạn học IT.)"
          }
        },
        t3: {
          id: "t3",
          npc: {
            ja: "素晴らしい目標ですね！休みの日はどんなことをして過ごしていますか。",
            kana: "すばらしいもくひょうですね！やすみのひはどんなことをしてすごしていますか。",
            romaji: "Subarashii mokuhyou desu ne! Yasumi no hi wa donna koto o shite sugoshite imasu ka.",
            vi: "Mục tiêu thật tuyệt vời! Những ngày nghỉ bạn thường làm gì để giải trí?",
            en: "What a great goal! How do you spend your days off?",
            ipa: "Subarashii mokuhyou desu ne! Yasumi no hi wa donna koto o shite sugoshite imasu ka.",
            zh: "素晴らしい目標ですね！休みの日はどんなことをして過ごしていますか。",
            py: "Subarashii mokuhyou desu ne! Yasumi no hi wa donna koto o shite sugoshite imasu ka."
          },
          user: {
            goal: "Chia sẻ bạn thích đi dạo ngắm phố và nấu món ăn Việt Nam",
            answers: [
              {
                ja: "東京の街を散歩したり、ベトナム料理を作ったりします。",
                kana: "とうきょうのまちをさんぽしたり、ベトナムりょうりをつくったりします。",
                romaji: "Toukyou no machi o sanpo shitari, Betonamu ryouri o tsukuttari shimasu.",
                vi: "Tôi thường đi dạo phố phường Tokyo và nấu các món ăn Việt Nam.",
                en: "I often take walks around Tokyo streets and cook Vietnamese food.",
                ipa: "Toukyou no machi o sanpo shitari, Betonamu ryouri o tsukuttari shimasu.",
                zh: "東京の街を散歩したり、ベトナム料理を作ったりします。",
                py: "Toukyou no machi o sanpo shitari, Betonamu ryouri o tsukuttari shimasu."
              },
              {
                ja: "音楽を聞いたり、本を読んだりするのが好きです。",
                kana: "おんがくをきいたり、ほんをよんだりするのがすきです。",
                romaji: "Ongaku o kiitari, hon o yondari suru no ga suki desu.",
                vi: "Tôi thích nghe nhạc và đọc sách.",
                en: "I like listening to music and reading books.",
                ipa: "Ongaku o kiitari, hon o yondari suru no ga suki desu.",
                zh: "音楽を聞いたり、本を読んだりするのが好きです。",
                py: "Ongaku o kiitari, hon o yondari suru no ga suki desu."
              }
            ],
            accept: {
              anyOf: ["散歩", "さんぽ", "料理", "りょうり", "音楽", "おんがく", "好き", "すき", "sanpo", "ryouri", "suki"],
              pattern: {}
            },
            next: null,
            fallback: "ベトナムのフォーや生春巻き、私も大好きです！今度ぜひ教えてくださいね。"
          }
        }
      }
    },
    {
      id: "ticket-buying",
      title: "Mua vé tàu cao tốc Shinkansen",
      description: "Thực hành tại quầy vé Midori-no-Madoguchi ga Tokyo: chọn ga đến Kyoto, loại chỗ ngồi và thời gian khởi hành.",
      topic: "Đặt vé & Du lịch",
      difficulty: "N5",
      npc: {
        name: "Tanaka",
        role: "Nhân viên phòng vé Midori-no-Madoguchi",
        avatarColor: "#0284C7",
        initials: "TN",
        avatarSvg: "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#E0F2FE\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#0284C7\"/></svg>"
      },
      initialTurn: "t1",
      turns: {
        t1: {
          id: "t1",
          npc: {
            ja: "みどりの窓口へようこそ！どちらまでの切符をお求めですか。",
            kana: "みどりのまどぐちへようこそ！どちらまでのきっぷをおもとめですか。",
            romaji: "Midori no madoguchi e youkoso! Dochira made no kippu o omotome desu ka.",
            vi: "Chào mừng quý khách đến với quầy vé! Quý khách muốn mua vé đi đến đâu ạ?",
            en: "Welcome to the ticket office! Where would you like tickets to?",
            ipa: "Midori no madoguchi e youkoso! Dochira made no kippu o omotome desu ka.",
            zh: "みどりの窓口へようこそ！どちらまでの切符をお求めですか。",
            py: "Midori no madoguchi e youkoso! Dochira made no kippu o omotome desu ka."
          },
          user: {
            goal: "Nói muốn mua vé đi Kyoto cho sáng mai",
            answers: [
              {
                ja: "明日の朝、京都までの新幹線の切符を一枚ください。",
                kana: "あしたのあさ、きょうとまでのしんかんせんのきっぷをいちまいください。",
                romaji: "Ashita no asa, Kyouto made no Shinkansen no kippu o ichimai kudasai.",
                vi: "Cho tôi mua một vé tàu Shinkansen đi Kyoto vào sáng mai nhé.",
                en: "One Shinkansen ticket to Kyoto for tomorrow morning please.",
                ipa: "Ashita no asa, Kyouto made no Shinkansen no kippu o ichimai kudasai.",
                zh: "明日の朝、京都までの新幹線の切符を一枚ください。",
                py: "Ashita no asa, Kyouto made no Shinkansen no kippu o ichimai kudasai."
              },
              {
                ja: "京都まで一枚お願いします。",
                kana: "きょうとまでいちまいおねがいします。",
                romaji: "Kyouto made ichimai onegaishimasu.",
                vi: "Cho tôi một vé đi Kyoto ạ.",
                en: "One ticket to Kyoto please.",
                ipa: "Kyouto made ichimai onegaishimasu.",
                zh: "京都まで一枚お願いします。",
                py: "Kyouto made ichimai onegaishimasu."
              }
            ],
            accept: {
              anyOf: ["京都", "きょうと", "新幹線", "しんかんせん", "切符", "きっぷ", "一枚", "いちまい", "Kyouto", "Shinkansen", "ichimai"],
              pattern: {}
            },
            next: "t2",
            fallback: "京都ですね。指定席と自由席のどちらがよろしいですか。(Đi Kyoto đúng không ạ. Bạn muốn ghế chỉ định hay ghế tự do?)"
          }
        },
        t2: {
          id: "t2",
          npc: {
            ja: "京都行きですね。指定席と自由席、どちらがよろしいでしょうか。",
            kana: "きょうといきですね。していせきとじゆうせき、どちらがよろしいでしょうか。",
            romaji: "Kyouto iki desu ne. Shiteiseki to jiyuuseki, dochira ga yoroshii deshou ka.",
            vi: "Đi Kyoto phải không ạ. Ghế chỉ định trước chỗ hay ghế tự do, quý khách muốn loại nào ạ?",
            en: "To Kyoto. Would you prefer a reserved seat or a non-reserved seat?",
            ipa: "Kyouto iki desu ne. Shiteiseki to jiyuuseki, dochira ga yoroshii deshou ka.",
            zh: "京都行きですね。指定席と自由席、どちらがよろしいでしょうか。",
            py: "Kyouto iki desu ne. Shiteiseki to jiyuuseki, dochira ga yoroshii deshou ka."
          },
          user: {
            goal: "Chọn ghế chỉ định và muốn chỗ gần cửa sổ",
            answers: [
              {
                ja: "指定席をお願いします。窓側の席は空いていますか。",
                kana: "していせきをおねがいします。まどがわのせきはあいていますか。",
                romaji: "Shiteiseki o onegaishimasu. Madogawa no seki wa aite imasu ka.",
                vi: "Cho tôi ghế chỉ định nhé. Chỗ ngồi sát cửa sổ có còn trống không ạ?",
                en: "Reserved seat please. Is a window seat available?",
                ipa: "Shiteiseki o onegaishimasu. Madogawa no seki wa aite imasu ka.",
                zh: "指定席をお願いします。窓側の席は空いていますか。",
                py: "Shiteiseki o onegaishimasu. Madogawa no seki wa aite imasu ka."
              },
              {
                ja: "指定席で、窓側がいいです。",
                kana: "していせきで、まどがわがいいです。",
                romaji: "Shiteiseki de, madogawa ga ii desu.",
                vi: "Cho tôi ghế chỉ định, vị trí cửa sổ càng tốt ạ.",
                en: "A reserved seat, by the window please.",
                ipa: "Shiteiseki de, madogawa ga ii desu.",
                zh: "指定席で、窓側がいいです。",
                py: "Shiteiseki de, madogawa ga ii desu."
              }
            ],
            accept: {
              anyOf: ["指定席", "していせき", "窓側", "まどがわ", "お願いします", "おねがい", "shiteiseki", "madogawa"],
              pattern: {}
            },
            next: "t3",
            fallback: "午前九時発ののぞみ号で、窓側の指定席がご用意できますよ。(Chuyến tàu Nozomi lúc 9 giờ sáng còn ghế cửa sổ đấy ạ.)"
          }
        },
        t3: {
          id: "t3",
          npc: {
            ja: "朝九時発の「のぞみ号」で窓側の席がお取りできました。運賃は一万三千九百七十円です。",
            kana: "あさくじはつの「のぞみごう」でまどがわのせきがおとりできました。うんちんはいちまんさんぜんきゅうひゃくななじゅうえんです。",
            romaji: "Asa kuji hatsu no 'Nozomi-gou' de madogawa no seki ga otori dekimashita. Unchin wa ichiman sanzen kyuuhyaku nanajuu-en desu.",
            vi: "Tôi đã giữ được chỗ cạnh cửa sổ trên chuyến Nozomi khởi hành lúc 9 giờ sáng cho quý khách. Tiền vé là 13.970 yên ạ.",
            en: "I secured a window seat on the 9:00 AM Nozomi train. The fare is 13,970 yen.",
            ipa: "Asa kuji hatsu no 'Nozomi-gou' de madogawa no seki ga otori dekimashita. Unchin wa ichiman sanzen kyuuhyaku nanajuu-en desu.",
            zh: "朝九時発の「のぞみ号」で窓側の席がお取りできました。運賃は一万三千九百七十円です。",
            py: "Asa kuji hatsu no 'Nozomi-gou' de madogawa no seki ga otori dekimashita. Unchin wa ichiman sanzen kyuuhyaku nanajuu-en desu."
          },
          user: {
            goal: "Thanh toán bằng thẻ tín dụng và cảm ơn",
            answers: [
              {
                ja: "クレジットカードで支払います。ありがとうございます！",
                kana: "クレジットカードでしはらいます。ありがとうございます！",
                romaji: "Kurejitto kaado de shiharaimasu. Arigatou gozaimasu!",
                vi: "Tôi thanh toán bằng thẻ tín dụng nhé. Cảm ơn bạn rất nhiều!",
                en: "I will pay with a credit card. Thank you very much!",
                ipa: "Kurejitto kaado de shiharaimasu. Arigatou gozaimasu!",
                zh: "クレジットカードで支払います。ありがとうございます！",
                py: "Kurejitto kaado de shiharaimasu. Arigatou gozaimasu!"
              },
              {
                ja: "カードで払います。よろしくお願いします。",
                kana: "カードではらいます。よろしくおねがいします。",
                romaji: "Kaado de haraimasu. Yoroshiku onegaishimasu.",
                vi: "Tôi trả bằng thẻ. Nhờ bạn xử lý giúp nhé.",
                en: "Paying by card please.",
                ipa: "Kaado de haraimasu. Yoroshiku onegaishimasu.",
                zh: "カードで払います。よろしくお願いします。",
                py: "Kaado de haraimasu. Yoroshiku onegaishimasu."
              }
            ],
            accept: {
              anyOf: ["クレジット", "カード", "支払います", "しはらいます", "ありがとう", "card", "arigatou"],
              pattern: {}
            },
            next: null,
            fallback: "切符とレシートでございます。京都までの旅をどうぞお楽しみくださいませ！"
          }
        }
      }
    },
    {
      id: "clinic",
      title: "Đi khám bệnh tại phòng khám (Clinic)",
      description: "Thực hành khai báo triệu chứng sức khỏe với bác sĩ: bị sốt, đau đầu, viêm họng và nhận đơn thuốc hướng dẫn uống.",
      topic: "Y tế & Sức khỏe",
      difficulty: "N5",
      npc: {
        name: "Bác sĩ Nakamura",
        role: "Bác sĩ phòng khám nội khoa",
        avatarColor: "#0D9488",
        initials: "NK",
        avatarSvg: "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#CCFBF1\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#0D9488\"/></svg>"
      },
      initialTurn: "t1",
      turns: {
        t1: {
          id: "t1",
          npc: {
            ja: "こんにちは。今日はどうされましたか。どこが痛みますか。",
            kana: "こんにちは。きょうはどうされましたか。どこがいたみますか。",
            romaji: "Konnichiwa. Kyou wa dou saremashita ka. Doko ga itamimasu ka.",
            vi: "Chào bạn. Hôm nay bạn thấy trong người thế nào? Bạn bị đau ở chỗ nào vậy?",
            en: "Hello. What seems to be the problem today? Where does it hurt?",
            ipa: "Konnichiwa. Kyou wa dou saremashita ka. Doko ga itamimasu ka.",
            zh: "こんにちは。今日はどうされましたか。どこが痛みますか。",
            py: "Konnichiwa. Kyou wa dou saremashita ka. Doko ga itamimasu ka."
          },
          user: {
            goal: "Nói bạn bị đau họng và đầu rất đau",
            answers: [
              {
                ja: "昨日から喉が痛くて、頭もズキズキ痛みます。",
                kana: "きのうからのどがいたくて、あたまもズキズキいたみます。",
                romaji: "Kinou kara nodo ga itakute, atama mo zukizuki itamimasu.",
                vi: "Từ hôm qua họng tôi đã bị đau, và đầu cũng đau nhức nhối nữa.",
                en: "Since yesterday my throat has been hurting, and I have a throbbing headache.",
                ipa: "Kinou kara nodo ga itakute, atama mo zukizuki itamimasu.",
                zh: "昨日から喉が痛くて、頭もズキズキ痛みます。",
                py: "Kinou kara nodo ga itakute, atama mo zukizuki itamimasu."
              },
              {
                ja: "頭が痛いです。喉も痛みます。",
                kana: "あたまがいたいです。のどもいたみます。",
                romaji: "Atama ga itai desu. Nodo mo itamimasu.",
                vi: "Tôi bị đau đầu và họng cũng đau ạ.",
                en: "My head hurts, and my throat hurts too.",
                ipa: "Atama ga itai desu. Nodo mo itamimasu.",
                zh: "頭が痛いです。喉も痛みます。",
                py: "Atama ga itai desu. Nodo mo itamimasu."
              }
            ],
            accept: {
              anyOf: ["喉", "のど", "頭", "あたま", "痛い", "いたい", "痛みます", "nodo", "atama", "itai"],
              pattern: {}
            },
            next: "t2",
            fallback: "熱は測りましたか。(Bạn đã đo nhiệt độ cơ thể xem có sốt không?)"
          }
        },
        t2: {
          id: "t2",
          npc: {
            ja: "熱は測りましたか。何度くらいありましたか。",
            kana: "ねつははかりましたか。なんどくらいありましたか。",
            romaji: "Netsu wa hakarimashita ka. Nando kurai arimashita ka.",
            vi: "Bạn đã đo nhiệt độ cơ thể chưa? Nhiệt độ là bao nhiêu độ vậy?",
            en: "Have you taken your temperature? How high was it?",
            ipa: "Netsu wa hakarimashita ka. Nando kurai arimashita ka.",
            zh: "熱は測りましたか。何度くらいありましたか。",
            py: "Netsu wa hakarimashita ka. Nando kurai arimashita ka."
          },
          user: {
            goal: "Nói sáng nay đo được ba mươi tám độ hai (38.2 độ)",
            answers: [
              {
                ja: "今朝測ったら、三十八度二分ありました。",
                kana: "けさはかったら、さんじゅうはちどにぶありました。",
                romaji: "Kesa hakattara, sanjuuhachido nibu arimashita.",
                vi: "Sáng nay tôi đo thì được 38 độ 2.",
                en: "When I checked this morning, it was 38.2 degrees.",
                ipa: "Kesa hakattara, sanjuuhachido nibu arimashita.",
                zh: "今朝測ったら、三十八度二分ありました。",
                py: "Kesa hakattara, sanjuuhachido nibu arimashita."
              },
              {
                ja: "三十八度くらい熱があります。",
                kana: "さんじゅうはちどくらいねつがあります。",
                romaji: "Sanjuuhachido kurai netsu ga arimasu.",
                vi: "Tôi bị sốt khoảng 38 độ ạ.",
                en: "I have a fever of about 38 degrees.",
                ipa: "Sanjuuhachido kurai netsu ga arimasu.",
                zh: "三十八度くらい熱があります。",
                py: "Sanjuuhachido kurai netsu ga arimasu."
              }
            ],
            accept: {
              anyOf: ["熱", "ねつ", "三十八度", "さんじゅうはちど", "今朝", "けさ", "netsu", "sanjuuhachido"],
              pattern: {}
            },
            next: "t3",
            fallback: "少し高めの熱ですね。風邪の初期症状のようです。喉を見せてください。(Sốt hơi cao đấy, có vẻ là cảm cúm rồi. Hãy há miệng cho tôi xem họng nhé.)"
          }
        },
        t3: {
          id: "t3",
          npc: {
            ja: "風邪ですね。熱冷ましと喉の炎症を抑えるお薬を三日分出します。毎食後飲んで安静にしてください。",
            kana: "かぜですね。ねつさましとのどのえんしょうをおさえるおくすりをみっかぶんだします。まいしょくごのんであんせいにしてください。",
            romaji: "Kaze desu ne. Netsusamashi to nodo no enshou o osaeru okusuri o mikkabun dashimasu. Maishokugo nonde ansei ni shite kudasai.",
            vi: "Bạn bị cảm cúm rồi. Tôi kê đơn thuốc hạ sốt và thuốc giảm viêm họng trong 3 ngày nhé. Nhớ uống sau mỗi bữa ăn và nghỉ ngơi tĩnh dưỡng.",
            en: "It is a cold. I will prescribe three days of fever reducers and throat medicine. Take them after each meal and rest.",
            ipa: "Kaze desu ne. Netsusamashi to nodo no enshou o osaeru okusuri o mikkabun dashimasu. Maishokugo nonde ansei ni shite kudasai.",
            zh: "風邪ですね。熱冷ましと喉の炎症を抑えるお薬を三日分出します。毎食後飲んで安静にしてください。",
            py: "Kaze desu ne. Netsusamashi to nodo no enshou o osaeru okusuri o mikkabun dashimasu. Maishokugo nonde ansei ni shite kudasai."
          },
          user: {
            goal: "Cảm ơn bác sĩ và hứa sẽ uống thuốc đúng giờ",
            answers: [
              {
                ja: "分かりました。指示通りに薬を飲んでしっかり休みます。ありがとうございました！",
                kana: "わかりました。しじどおりにくすりをのんでしっかりやすみます。ありがとうございました！",
                romaji: "Wakarimashita. Shijidoori ni kusuri o nonde shikkari yasumimasu. Arigatou gozaimashita!",
                vi: "Tôi hiểu rồi. Tôi sẽ uống thuốc theo đúng chỉ dẫn và nghỉ ngơi thật tốt. Cảm ơn bác sĩ nhiều ạ!",
                en: "Understood. I will take the medicine as directed and rest well. Thank you very much, doctor!",
                ipa: "Wakarimashita. Shijidoori ni kusuri o nonde shikkari yasumimasu. Arigatou gozaimashita!",
                zh: "分かりました。指示通りに薬を飲んでしっかり休みます。ありがとうございました！",
                py: "Wakarimashita. Shijidoori ni kusuri o nonde shikkari yasumimasu. Arigatou gozaimashita!"
              },
              {
                ja: "先生、どうもありがとうございました！",
                kana: "せんせい、どうもありがとうございました！",
                romaji: "Sensei, doumo arigatou gozaimashita!",
                vi: "Cảm ơn bác sĩ rất nhiều ạ!",
                en: "Thank you very much, doctor!",
                ipa: "Sensei, doumo arigatou gozaimashita!",
                zh: "先生、どうもありがとうございました！",
                py: "Sensei, doumo arigatou gozaimashita!"
              }
            ],
            accept: {
              anyOf: ["わかりました", "分かりました", "薬", "くすり", "休みます", "やすみます", "ありがとう", "wakarimashita", "kusuri", "arigatou"],
              pattern: {}
            },
            next: null,
            fallback: "お大事にどうぞ。もし熱が下がらないときはまた来てくださいね。(Chúc bạn mau bình phục. Nếu sốt không hạ nhớ quay lại khám nhé.)"
          }
        }
      }
    },
    {
      id: "hotel",
      title: "Làm thủ tục nhận phòng khách sạn (Check-in)",
      description: "Thực hành tại quầy lễ tân khách sạn: xuất trình hộ chiếu, xác nhận đặt phòng, hỏi về mật khẩu Wi-Fi và giờ phục vụ bữa sáng.",
      topic: "Khách sạn & Lưu trú",
      difficulty: "N5",
      npc: {
        name: "Emi",
        role: "Nhân viên lễ tân khách sạn",
        avatarColor: "#D97706",
        initials: "EM",
        avatarSvg: "<svg viewBox=\"0 0 40 40\" width=\"40\" height=\"40\" fill=\"none\"><circle cx=\"20\" cy=\"20\" r=\"20\" fill=\"#FEF3C7\"/><path d=\"M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z\" fill=\"#D97706\"/></svg>"
      },
      initialTurn: "t1",
      turns: {
        t1: {
          id: "t1",
          npc: {
            ja: "いらっしゃいませ。サクラホテルへようこそ！チェックインでございますか。",
            kana: "いらっしゃいませ。サクラホテルへようこそ！チェックインでございますか。",
            romaji: "Irasshaimase. Sakura Hoteru e youkoso! Chekkuin de gozaimasu ka.",
            vi: "Kính chào quý khách. Chào mừng bạn đến với khách sạn Sakura! Bạn muốn làm thủ tục nhận phòng phải không ạ?",
            en: "Welcome to Sakura Hotel! Are you checking in?",
            ipa: "Irasshaimase. Sakura Hoteru e youkoso! Chekkuin de gozaimasu ka.",
            zh: "いらっしゃいませ。サクラホテルへようこそ！チェックインでございますか。",
            py: "Irasshaimase. Sakura Hoteru e youkoso! Chekkuin de gozaimasu ka."
          },
          user: {
            goal: "Nói đúng vậy, tôi muốn nhận phòng, tên đặt phòng là Nam",
            answers: [
              {
                ja: "はい、チェックインをお願いします。ナムという名前で予約しています。",
                kana: "はい、チェックインをおねがいします。ナムというなまえでよやくしています。",
                romaji: "Hai, chekkuin o onegaishimasu. Namu to iu namae de yoyaku shite imasu.",
                vi: "Vâng, cho tôi nhận phòng nhé. Tôi có đặt phòng trước dưới tên là Nam.",
                en: "Yes, check-in please. I have a reservation under the name Nam.",
                ipa: "Hai, chekkuin o onegaishimasu. Namu to iu namae de yoyaku shite imasu.",
                zh: "はい、チェックインをお願いします。ナムという名前で予約しています。",
                py: "Hai, chekkuin o onegaishimasu. Namu to iu namae de yoyaku shite imasu."
              },
              {
                ja: "チェックインです。予約の番号はこちらです。",
                kana: "チェックインです。よやくのばんごうはこちらです。",
                romaji: "Chekkuin desu. Yoyaku no bangou wa kochira desu.",
                vi: "Tôi muốn nhận phòng. Mã số đặt phòng của tôi ở đây ạ.",
                en: "Checking in. Here is my booking confirmation number.",
                ipa: "Chekkuin desu. Yoyaku no bangou wa kochira desu.",
                zh: "チェックインです。予約の番号はこちらです。",
                py: "Chekkuin desu. Yoyaku no bangou wa kochira desu."
              }
            ],
            accept: {
              anyOf: ["チェックイン", "予約", "よやく", "名前", "なまえ", "ナム", "check-in", "yoyaku", "Nam"],
              pattern: {}
            },
            next: "t2",
            fallback: "ナム様ですね。ご予約を確認いたしました。パスポートのご提示をお願いできますか。(Khách hàng Nam phải không ạ. Tôi đã thấy thông tin đặt phòng rồi. Quý khách vui lòng cho tôi xem hộ chiếu được không ạ?)"
          }
        },
        t2: {
          id: "t2",
          npc: {
            ja: "ナム様ですね、確認いたしました。恐れ入りますが、パスポートをご提示いただけますか。",
            kana: "ナムさまですね、かくにんいたしました。おそれいりますが、パスポートをごていじいただけますか。",
            romaji: "Namu-sama desu ne, kakunin itashimashita. Osoreirimasu ga, pasupooto o goteiji itadakemasu ka.",
            vi: "Dạ quý khách Nam, tôi đã xác nhận thông tin phòng rồi. Xin phép quý khách vui lòng xuất trình hộ chiếu cho tôi sao chép ạ.",
            en: "Mr. Nam, confirmed. Could you please present your passport?",
            ipa: "Namu-sama desu ne, kakunin itashimashita. Osoreirimasu ga, pasupooto o goteiji itadakemasu ka.",
            zh: "ナム様ですね、確認いたしました。恐れ入りますが、パスポートをご提示いただけますか。",
            py: "Namu-sama desu ne, kakunin itashimashita. Osoreirimasu ga, pasupooto o goteiji itadakemasu ka."
          },
          user: {
            goal: "Đưa hộ chiếu và hỏi về mật khẩu Wi-Fi trong phòng",
            answers: [
              {
                ja: "はい、パスポートです。部屋でWi-Fiは使えますか。",
                kana: "はい、パスポートです。へやでワイファイはつかえますか。",
                romaji: "Hai, pasupooto desu. Heya de waifai wa tsukaemasu ka.",
                vi: "Vâng, hộ chiếu của tôi đây ạ. Trong phòng có dùng được mạng Wi-Fi không ạ?",
                en: "Here is my passport. Is Wi-Fi available in the room?",
                ipa: "Hai, pasupooto desu. Heya de waifai wa tsukaemasu ka.",
                zh: "はい、パスポートです。部屋でWi-Fiは使えますか。",
                py: "Hai, pasupooto desu. Heya de waifai wa tsukaemasu ka."
              },
              {
                ja: "どうぞ。Wi-Fiのパスワードは何ですか。",
                kana: "どうぞ。ワイファイのパスワードはなんですか。",
                romaji: "Douzo. Waifai no pasuwaado wa nan desu ka.",
                vi: "Xin gửi bạn. Mật khẩu Wi-Fi là gì vậy ạ?",
                en: "Here you go. What is the Wi-Fi password?",
                ipa: "Douzo. Waifai no pasuwaado wa nan desu ka.",
                zh: "どうぞ。Wi-Fiのパスワードは何ですか。",
                py: "Douzo. Wi-Fiのパスワードは何ですか。"
              }
            ],
            accept: {
              anyOf: ["パスポート", "Wi-Fi", "ワイファイ", "使えます", "つかえます", "passport", "wifi"],
              pattern: {}
            },
            next: "t3",
            fallback: "全館無料Wi-Fiをご利用いただけます。パスワードはカードキーのケースに記載しております。(Toàn bộ khách sạn có Wi-Fi miễn phí. Mật khẩu được ghi trên bao đựng thẻ phòng ạ.)"
          }
        },
        t3: {
          id: "t3",
          npc: {
            ja: "パスポートをお返しします。全館無料Wi-Fiがございます。お部屋は七階の七〇二号室です。朝食は朝七時から一階レストランでございます。",
            kana: "パスポートをおかえしします。ぜんかんむりょうワイファイがございます。おへやはななかいのななまるにごうしつです。ちょうしょくはあさしちじからいっかいレストランでございます。",
            romaji: "Pasupooto o okaeshi shimasu. Zenkan muryou waifai ga gozaimasu. Oheya wa nanakai no nanamaruni-goushitsu desu. Choushoku wa asa shichiji kara ikkai resutoran de gozaimasu.",
            vi: "Tôi xin gửi lại hộ chiếu. Khách sạn có Wi-Fi miễn phí toàn khuôn viên. Phòng của quý khách là phòng 702 tầng 7. Bữa sáng phục vụ từ 7h sáng tại nhà hàng tầng 1 ạ.",
            en: "Here is your passport back. Free Wi-Fi is available. Your room is 702 on the 7th floor. Breakfast is from 7 AM at the 1st floor restaurant.",
            ipa: "Pasupooto o okaeshi shimasu. Zenkan muryou waifai ga gozaimasu. Oheya wa nanakai no nanamaruni-goushitsu desu. Choushoku wa asa shichiji kara ikkai resutoran de gozaimasu.",
            zh: "パスポートをお返しします。全館無料Wi-Fiがございます。お部屋は七階の七〇二号室です。朝食は朝七時から一階レストランでございます。",
            py: "Pasupooto o okaeshi shimasu. Zenkan muryou waifai ga gozaimasu. Oheya wa nanakai no nanamaruni-goushitsu desu. Choushoku wa asa shichiji kara ikkai resutoran de gozaimasu."
          },
          user: {
            goal: "Cảm ơn nhân viên lễ tân",
            answers: [
              {
                ja: "丁寧にご案内いただき、ありがとうございます。行ってきます！",
                kana: "ていねいにごあんないいただき、ありがとうございます。いってきます！",
                romaji: "Teinei ni goannai itadaki, arigatou gozaimasu. Itte kimasu!",
                vi: "Cảm ơn bạn đã hướng dẫn rất chu đáo. Tôi lên phòng đây ạ!",
                en: "Thank you for the kind information. I will head up!",
                ipa: "Teinei ni goannai itadaki, arigatou gozaimasu. Itte kimasu!",
                zh: "丁寧にご案内いただき、ありがとうございます。行ってきます！",
                py: "Teinei ni goannai itadaki, arigatou gozaimasu. Itte kimasu!"
              },
              {
                ja: "分かりました。どうもありがとうございました！",
                kana: "わかりました。どうもありがとうございました！",
                romaji: "Wakarimashita. Doumo arigatou gozaimashita!",
                vi: "Tôi hiểu rồi. Cảm ơn bạn rất nhiều!",
                en: "Understood. Thank you very much!",
                ipa: "Wakarimashita. Doumo arigatou gozaimashita!",
                zh: "分かりました。どうもありがとうございました！",
                py: "Wakarimashita. Doumo arigatou gozaimashita!"
              }
            ],
            accept: {
              anyOf: ["ありがとう", "わかりました", "分かりました", "どうも", "arigatou", "wakarimashita"],
              pattern: {}
            },
            next: null,
            fallback: "ごゆっくりお寛ぎくださいませ。良いご滞在を！(Chúc quý khách có kỳ nghỉ thoải mái và vui vẻ tại khách sạn!)"
          }
        }
      }
    }
  ];

  if (typeof window !== 'undefined') {
    window.JA_TALK_SCENARIOS = TALK_SCENARIOS;
    window.TALK_SCENARIOS_JA = TALK_SCENARIOS;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TALK_SCENARIOS };
  }
})();
