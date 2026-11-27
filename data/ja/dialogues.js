/**
 * data/ja/dialogues.js
 * 10 bài hội thoại tiếng Nhật đời thường N5 cho người mới bắt đầu.
 * Định dạng lines: [{ who: 'A'|'B', ja, kana, romaji, vi, en, zh, py, ipa }]
 */

(function () {
  'use strict';

  const DIALOGUES = [
    {
      id: "d01",
      title: "Chào hỏi & Làm quen",
      lines: [
        {
          who: "A",
          ja: "こんにちは！お元気ですか。",
          kana: "こんにちは！おげんきですか。",
          romaji: "Konnichiwa! Ogenki desu ka.",
          vi: "Xin chào! Bạn có khỏe không?",
          en: "Hello! How are you?",
          zh: "こんにちは！お元気ですか。",
          py: "Konnichiwa! Ogenki desu ka.",
          ipa: "Konnichiwa! Ogenki desu ka."
        },
        {
          who: "B",
          ja: "はい、元気です。ありがとうございます。あなたは？",
          kana: "はい、げんきです。ありがとうございます。あなたは？",
          romaji: "Hai, genki desu. Arigatou gozaimasu. Anata wa?",
          vi: "Vâng, tôi khỏe. Cảm ơn bạn. Còn bạn thì sao?",
          en: "Yes, I am fine. Thank you. And you?",
          zh: "はい、元気です。ありがとうございます。あなたは？",
          py: "Hai, genki desu. Arigatou gozaimasu. Anata wa?",
          ipa: "Hai, genki desu. Arigatou gozaimasu. Anata wa?"
        },
        {
          who: "A",
          ja: "私も元気です。初めまして、ナムです。",
          kana: "わたしもげんきです。はじめまして、ナムです。",
          romaji: "Watashi mo genki desu. Hajimemashite, Namu desu.",
          vi: "Tôi cũng khỏe. Rất vui được gặp bạn, tôi tên là Nam.",
          en: "I am fine too. Nice to meet you, I am Nam.",
          zh: "私も元気です。初めまして、ナムです。",
          py: "Watashi mo genki desu. Hajimemashite, Namu desu.",
          ipa: "Watashi mo genki desu. Hajimemashite, Namu desu."
        },
        {
          who: "B",
          ja: "初めまして、田中です。どうぞよろしくお願いします。",
          kana: "はじめまして、たなかです。どうぞよろしくおねがいします。",
          romaji: "Hajimemashite, Tanaka desu. Douzo yoroshiku onegaishimasu.",
          vi: "Rất vui được gặp bạn, tôi là Tanaka. Rất mong nhận được sự giúp đỡ của bạn.",
          en: "Nice to meet you, I am Tanaka. Pleased to meet you.",
          zh: "初めまして、田中です。どうぞよろしくお願いします。",
          py: "Hajimemashite, Tanaka desu. Douzo yoroshiku onegaishimasu.",
          ipa: "Hajimemashite, Tanaka desu. Douzo yoroshiku onegaishimasu."
        },
        {
          who: "A",
          ja: "ナムさんはどちらから来ましたか。",
          kana: "ナムさんはどちらからきましたか。",
          romaji: "Namu-san wa dochira kara kimashita ka.",
          vi: "Bạn Nam đến từ đâu vậy?",
          en: "Where are you from, Nam?",
          zh: "ナムさんはどちらから来ましたか。",
          py: "Namu-san wa dochira kara kimashita ka.",
          ipa: "Namu-san wa dochira kara kimashita ka."
        },
        {
          who: "B",
          ja: "ベトnamから来ました。日本は初めてです。",
          kana: "ベトナムからきました。にほんははじめてです。",
          romaji: "Betonamu kara kimashita. Nihon wa hajimete desu.",
          vi: "Tôi đến từ Việt Nam. Đây là lần đầu tiên tôi đến Nhật Bản.",
          en: "I am from Vietnam. This is my first time in Japan.",
          zh: "ベトナムから来ました。日本は初めてです。",
          py: "Betonamu kara kimashita. Nihon wa hajimete desu.",
          ipa: "Betonamu kara kimashita. Nihon wa hajimete desu."
        }
      ]
    },
    {
      id: "d02",
      title: "Giới thiệu bản thân & Nghề nghiệp",
      lines: [
        {
          who: "A",
          ja: "自己紹介をお願いできますか。",
          kana: "じこしょうかいをおねがいできますか。",
          romaji: "Jikoshoukai o onegai dekimasu ka.",
          vi: "Bạn có thể vui lòng tự giới thiệu về mình được không?",
          en: "Could you please introduce yourself?",
          zh: "自己紹介をお願いできますか。",
          py: "Jikoshoukai o onegai dekimasu ka.",
          ipa: "Jikoshoukai o onegai dekimasu ka."
        },
        {
          who: "B",
          ja: "はい、喜んで。私はマイです。今年二十二歳です。",
          kana: "はい、よろこんで。わたしはマイです。ことしにじゅうにさいです。",
          romaji: "Hai, yorokonde. Watashi wa Mai desu. Kotoshi nijuuni-sai desu.",
          vi: "Vâng, rất sẵn lòng. Tôi tên là Mai. Năm nay tôi 22 tuổi.",
          en: "Certainly! I am Mai. I am 22 years old this year.",
          zh: "はい、喜んで。私はマイです。今年二十二歳です。",
          py: "Hai, yorokonde. Watashi wa Mai desu. Kotoshi nijuuni-sai desu.",
          ipa: "Hai, yorokonde. Watashi wa Mai desu. Kotoshi nijuuni-sai desu."
        },
        {
          who: "A",
          ja: "マイさんのお仕事は何ですか。",
          kana: "マイさんのおしごとはなんですか。",
          romaji: "Mai-san no oshigoto wa nan desu ka.",
          vi: "Nghề nghiệp của bạn Mai là gì vậy?",
          en: "What is your job, Mai?",
          zh: "マイさんのお仕事は何ですか。",
          py: "Mai-san no oshigoto wa nan desu ka.",
          ipa: "Mai-san no oshigoto wa nan desu ka."
        },
        {
          who: "B",
          ja: "東京の大学で情報工学を勉強している留学生です。",
          kana: "とうきょうのだいがくでじょうほうこうがくをべんきょうしているりゅうがくせいです。",
          romaji: "Toukyou no daigaku de jouhoukougaku o benkyou shite iru ryuugakusei desu.",
          vi: "Tôi là du học sinh đang học ngành công nghệ thông tin tại một trường đại học ở Tokyo.",
          en: "I am an international student studying computer science at a university in Tokyo.",
          zh: "東京の大学で情報工学を勉強している留学生です。",
          py: "Toukyou no daigaku de jouhoukougaku o benkyou shite iru ryuugakusei desu.",
          ipa: "Toukyou no daigaku de jouhoukougaku o benkyou shite iru ryuugakusei desu."
        },
        {
          who: "A",
          ja: "趣味は何ですか。",
          kana: "しゅみはなんですか。",
          romaji: "Shumi wa nan desu ka.",
          vi: "Sở thích của bạn là gì?",
          en: "What are your hobbies?",
          zh: "趣味は何ですか。",
          py: "Shumi wa nan desu ka.",
          ipa: "Shumi wa nan desu ka."
        },
        {
          who: "B",
          ja: "音楽を聞くことと、写真を撮ることです。",
          kana: "おんがくをきくことと、しゃしんをとることです。",
          romaji: "Ongaku o kiku koto to, shashin o toru koto desu.",
          vi: "Sở thích của tôi là nghe nhạc và chụp ảnh.",
          en: "My hobbies are listening to music and taking photos.",
          zh: "音楽を聞くことと、写真を撮ることです。",
          py: "Ongaku o kiku koto to, shashin o toru koto desu.",
          ipa: "Ongaku o kiku koto to, shashin o toru koto desu."
        }
      ]
    },
    {
      id: "d03",
      title: "Mua sắm & Hỏi giá cả",
      lines: [
        {
          who: "A",
          ja: "いらっしゃいませ！何かお探しですか。",
          kana: "いらっしゃいませ！なにかおさがしですか。",
          romaji: "Irasshaimase! Nanika osagashi desu ka.",
          vi: "Kính chào quý khách! Bạn đang tìm món đồ gì ạ?",
          en: "Welcome! Are you looking for anything?",
          zh: "いらっしゃいませ！何かお探しですか。",
          py: "Irasshaimase! Nanika osagashi desu ka.",
          ipa: "Irasshaimase! Nanika osagashi desu ka."
        },
        {
          who: "B",
          ja: "すみません、その青い傘を見せてください。",
          kana: "すみません、そのあおいかさをみせてください。",
          romaji: "Sumimasen, sono aoi kasa o misete kudasai.",
          vi: "Xin lỗi, làm ơn cho tôi xem chiếc ô màu xanh dương đó với.",
          en: "Excuse me, could you show me that blue umbrella please?",
          zh: "すみません、その青い傘を見せてください。",
          py: "Sumimasen, sono aoi kasa o misete kudasai.",
          ipa: "Sumimasen, sono aoi kasa o misete kudasai."
        },
        {
          who: "A",
          ja: "はい、どうぞ。とても軽くて丈夫ですよ。",
          kana: "はい、どうぞ。とてもかるくてじょうぶですよ。",
          romaji: "Hai, douzo. Totemo karukute joubu desu yo.",
          vi: "Dạ vâng, xin gửi bạn. Chiếc này rất nhẹ mà lại bền lắm đấy ạ.",
          en: "Here you go. It is very light and durable.",
          zh: "はい、どうぞ。とても軽くて丈夫ですよ。",
          py: "Hai, douzo. Totemo karukute joubu desu yo.",
          ipa: "Hai, douzo. Totemo karukute joubu desu yo."
        },
        {
          who: "B",
          ja: "これはいくらですか。",
          kana: "これはいくらですか。",
          romaji: "Kore wa ikura desu ka.",
          vi: "Chiếc này giá bao nhiêu tiền vậy ạ?",
          en: "How much is this?",
          zh: "これはいくらですか。",
          py: "Kore wa ikura desu ka.",
          ipa: "Kore wa ikura desu ka."
        },
        {
          who: "A",
          ja: "千五百円です。消費税込みです。",
          kana: "せんごひゃくえんです。しょうひぜいこみです。",
          romaji: "Sen gohyaku-en desu. Shouhizei komi desu.",
          vi: "Dạ một nghìn năm trăm yên (1.500 yên). Đã bao gồm thuế rồi ạ.",
          en: "It is 1,500 yen, including sales tax.",
          zh: "千五百円です。消費税込みです。",
          py: "Sen gohyaku-en desu. Shouhizei komi desu.",
          ipa: "Sen gohyaku-en desu. Shouhizei komi desu."
        },
        {
          who: "B",
          ja: "じゃ、これをください。クレジットカードで払えますか。",
          kana: "じゃ、これをください。クレジットカードではらえますか。",
          romaji: "Ja, kore o kudasai. Kurejitto kaado de haraemasu ka.",
          vi: "Thế thì lấy cho tôi chiếc này nhé. Tôi trả bằng thẻ tín dụng được không?",
          en: "Then I will take this. Can I pay by credit card?",
          zh: "じゃ、これをください。クレジットカードで払えますか。",
          py: "Ja, kore o kudasai. Kurejitto kaado de haraemasu ka.",
          ipa: "Ja, kore o kudasai. Kurejitto kaado de haraemasu ka."
        }
      ]
    },
    {
      id: "d04",
      title: "Hỏi giờ giấc & Lịch trình hàng ngày",
      lines: [
        {
          who: "A",
          ja: "すみません、今何時ですか。",
          kana: "すみません、いまなんじですか。",
          romaji: "Sumimasen, ima nanji desu ka.",
          vi: "Xin lỗi, bây giờ là mấy giờ rồi ạ?",
          en: "Excuse me, what time is it now?",
          zh: "すみません、今何時ですか。",
          py: "Sumimasen, ima nanji desu ka.",
          ipa: "Sumimasen, ima nanji desu ka."
        },
        {
          who: "B",
          ja: "午前八時半ですよ。",
          kana: "ごぜんはちじはんですよ。",
          romaji: "Gozen hachiji han desu yo.",
          vi: "Tám giờ rưỡi sáng bạn nhé.",
          en: "It is eight thirty in the morning.",
          zh: "午前八時半ですよ。",
          py: "Gozen hachiji han desu yo.",
          ipa: "Gozen hachiji han desu yo."
        },
        {
          who: "A",
          ja: "学校は何時から始まりますか。",
          kana: "がっこうはなんじからはじまりますか。",
          romaji: "Gakkou wa nanji kara hajimarimasu ka.",
          vi: "Trường học bắt đầu từ mấy giờ vậy?",
          en: "What time does school start?",
          zh: "学校は何時から始まりますか。",
          py: "Gakkou wa nanji kara hajimarimasu ka.",
          ipa: "Gakkou wa nanji kara hajimarimasu ka."
        },
        {
          who: "B",
          ja: "九時から始まります。三時半に終わります。",
          kana: "くじからはじまります。さんじはんにおわります。",
          romaji: "Kuji kara hajimarimasu. Sanji han ni owarimasu.",
          vi: "Bắt đầu từ 9 giờ và kết thúc lúc 3 giờ rưỡi chiều.",
          en: "It starts at nine and ends at three thirty.",
          zh: "九時から始まります。三時半に終わります。",
          py: "Kuji kara hajimarimasu. Sanji han ni owarimasu.",
          ipa: "Kuji kara hajimarimasu. Sanji han ni owarimasu."
        },
        {
          who: "A",
          ja: "毎朝何時に起きますか。",
          kana: "まいあさなんじにおきますか。",
          romaji: "Maiasa nanji ni okimasu ka.",
          vi: "Mỗi sáng bạn thức dậy lúc mấy giờ?",
          en: "What time do you wake up every morning?",
          zh: "毎朝何時に起きますか。",
          py: "Maiasa nanji ni okimasu ka.",
          ipa: "Maiasa nanji ni okimasu ka."
        },
        {
          who: "B",
          ja: "たいてい七時に起きて、朝ご飯を食べます。",
          kana: "たいていしちじにおきて、あさごはんをたべます。",
          romaji: "Taitei shichiji ni okite, asagohan o tabemasu.",
          vi: "Thường thì tôi thức dậy lúc 7 giờ rồi ăn bữa sáng.",
          en: "I usually wake up at seven and have breakfast.",
          zh: "たいてい七時に起きて、朝ご飯を食べます。",
          py: "Taitei shichiji ni okite, asagohan o tabemasu.",
          ipa: "Taitei shichiji ni okite, asagohan o tabemasu."
        }
      ]
    },
    {
      id: "d05",
      title: "Đi lại & Phương tiện giao thông",
      lines: [
        {
          who: "A",
          ja: "明日はどこへ行きますか。",
          kana: "あしたはどこへいきますか。",
          romaji: "Ashita wa doko e ikimasu ka.",
          vi: "Ngày mai bạn đi đâu thế?",
          en: "Where are you going tomorrow?",
          zh: "明日はどこへ行きますか。",
          py: "Ashita wa doko e ikimasu ka.",
          ipa: "Ashita wa doko e ikimasu ka."
        },
        {
          who: "B",
          ja: "友達と新宿へ行きます。",
          kana: "ともだちとしんじゅくへいきます。",
          romaji: "Tomodachi to Shinjuku e ikimasu.",
          vi: "Tôi đi Shinjuku cùng với bạn.",
          en: "I am going to Shinjuku with my friends.",
          zh: "友達と新宿へ行きます。",
          py: "Tomodachi to Shinjuku e ikimasu.",
          ipa: "Tomodachi to Shinjuku e ikimasu."
        },
        {
          who: "A",
          ja: "何で行きますか。バスですか。",
          kana: "なんでいきますか。バスですか。",
          romaji: "Nan de ikimasu ka. Basu desu ka.",
          vi: "Bạn đi bằng phương tiện gì? Xe buýt à?",
          en: "How will you get there? By bus?",
          zh: "何で行きますか。バスですか。",
          py: "Nan de ikimasu ka. Basu desu ka.",
          ipa: "Nan de ikimasu ka. Basu desu ka."
        },
        {
          who: "B",
          ja: "いいえ、電車で行きます。JR山手線に乗ります。",
          kana: "いいえ、でんしゃでいきます。ジェイアールやまのてせんにのります。",
          romaji: "Iie, densha de ikimasu. Jeiaaru Yamanote-sen ni norimasu.",
          vi: "Không, tôi đi bằng tàu điện. Tôi sẽ lên tuyến tàu JR Yamanote.",
          en: "No, I will take the train. I will take the JR Yamanote line.",
          zh: "いいえ、電車で行きます。JR山手線に乗ります。",
          py: "Iie, densha de ikimasu. Jeiaaru Yamanote-sen ni norimasu.",
          ipa: "Iie, densha de ikimasu. Jeiaaru Yamanote-sen ni norimasu."
        },
        {
          who: "A",
          ja: "ここから新宿までどのくらいかかりますか。",
          kana: "ここからしんじゅくまでどのくらいかかりますか。",
          romaji: "Koko kara Shinjuku made dono kurai kakarimasu ka.",
          vi: "Từ đây đến Shinjuku mất khoảng bao lâu?",
          en: "How long does it take from here to Shinjuku?",
          zh: "ここから新宿までどのくらいかかりますか。",
          py: "Koko kara Shinjuku made dono kurai kakarimasu ka.",
          ipa: "Koko kara Shinjuku made dono kurai kakarimasu ka."
        },
        {
          who: "B",
          ja: "電車で二十分くらいかかります。とても近いです。",
          kana: "でんしゃでにじゅっぷんくらいかかります。とてもちかいです。",
          romaji: "Densha de nijuppun kurai kakarimasu. Totemo chikai desu.",
          vi: "Đi tàu điện mất khoảng 20 phút. Rất gần thôi.",
          en: "It takes about twenty minutes by train. It is quite close.",
          zh: "電車で二十分くらいかかります。とても近いです。",
          py: "Densha de nijuppun kurai kakarimasu. Totemo chikai desu.",
          ipa: "Densha de nijuppun kurai kakarimasu. Totemo chikai desu."
        }
      ]
    },
    {
      id: "d06",
      title: "Gọi món tại nhà hàng",
      lines: [
        {
          who: "A",
          ja: "いらっしゃいませ！何名様ですか。",
          kana: "いらっしゃいませ！なんめいさまですか。",
          romaji: "Irasshaimase! Nanmei-sama desu ka.",
          vi: "Kính chào quý khách! Quý khách đi mấy người ạ?",
          en: "Welcome! How many guests in your party?",
          zh: "いらっしゃいませ！何名様ですか。",
          py: "Irasshaimase! Nanmei-sama desu ka.",
          ipa: "Irasshaimase! Nanmei-sama desu ka."
        },
        {
          who: "B",
          ja: "二人です。禁煙席をお願いします。",
          kana: "ふたりです。きんえんせきをおねがいします。",
          romaji: "Futari desu. Kin'enseki o onegaishimasu.",
          vi: "Hai người ạ. Cho chúng tôi xin bàn ở khu vực không hút thuốc nhé.",
          en: "Two people, please. A non-smoking table please.",
          zh: "二人です。禁煙席をお願いします。",
          py: "Futari desu. Kin'enseki o onegaishimasu.",
          ipa: "Futari desu. Kin'enseki o onegaishimasu."
        },
        {
          who: "A",
          ja: "こちらへどうぞ。ご注文はお決まりですか。",
          kana: "こちらへどうぞ。ごちゅうもんはあきまりですか。",
          romaji: "Kochira e douzo. Gochuumon wa okimari desu ka.",
          vi: "Mời hai vị đi lối này ạ. Quý khách đã chọn xong món chưa ạ?",
          en: "Right this way please. Are you ready to order?",
          zh: "こちらへどうぞ。ご注文はお決まりですか。",
          py: "Kochira e douzo. Gochuumon wa okimari desu ka.",
          ipa: "Kochira e douzo. Gochuumon wa okimari desu ka."
        },
        {
          who: "B",
          ja: "醤油ラーメン二つと、餃子を一皿ください。",
          kana: "しょうゆラーメンふたつと、ぎょうざをひとさらください。",
          romaji: "Shouyu raamen futatsu to, gyouza o hitosara kudasai.",
          vi: "Cho chúng tôi hai bát mì ramen vị xì dầu và một đĩa bánh bao áp chảo gyoza.",
          en: "Two soy sauce ramens and one plate of gyoza, please.",
          zh: "醤油ラーメン二つと、餃子を一皿ください。",
          py: "Shouyu raamen futatsu to, gyouza o hitosara kudasai.",
          ipa: "Shouyu raamen futatsu to, gyouza o hitosara kudasai."
        },
        {
          who: "A",
          ja: "お飲み物はいかがですか。",
          kana: "おのみものはいかがですか。",
          romaji: "Onomimono wa ikaga desu ka.",
          vi: "Quý khách có dùng đồ uống gì không ạ?",
          en: "Would you like anything to drink?",
          zh: "お飲み物はいかがですか。",
          py: "Onomimono wa ikaga desu ka.",
          ipa: "Onomimono wa ikaga desu ka."
        },
        {
          who: "B",
          ja: "冷たいお茶を二つお願いします。",
          kana: "つめたいおちゃをふたつおねがいします。",
          romaji: "Tsumetai ocha o futatsu onegaishimasu.",
          vi: "Cho chúng tôi hai ly trà xanh mát lạnh nhé.",
          en: "Two cold green teas, please.",
          zh: "冷たいお茶を二つお願いします。",
          py: "Tsumetai ocha o futatsu onegaishimasu.",
          ipa: "Tsumetai ocha o futatsu onegaishimasu."
        }
      ]
    },
    {
      id: "d07",
      title: "Rủ bạn đi chơi cuối tuần",
      lines: [
        {
          who: "A",
          ja: "今週の日曜日は暇ですか。",
          kana: "こんしゅうのにちようびはひまですか。",
          romaji: "Konshuu no nichiyoubi wa hima desu ka.",
          vi: "Chủ nhật tuần này bạn có rảnh không?",
          en: "Are you free this Sunday?",
          zh: "今週の日曜日は暇ですか。",
          py: "Konshuu no nichiyoubi wa hima desu ka.",
          ipa: "Konshuu no nichiyoubi wa hima desu ka."
        },
        {
          who: "B",
          ja: "はい、特に予定はありません。どうしてですか。",
          kana: "はい、とくによていはありません。どうしてですか。",
          romaji: "Hai, tokuni yotei wa arimasen. Doushite desu ka.",
          vi: "Vâng, tôi không có kế hoạch gì đặc biệt cả. Sao thế bạn?",
          en: "Yes, I have no plans. Why do you ask?",
          zh: "はい、特に予定はありません。どうしてですか。",
          py: "Hai, tokuni yotei wa arimasen. Doushite desu ka.",
          ipa: "Hai, tokuni yotei wa arimasen. Doushite desu ka."
        },
        {
          who: "A",
          ja: "一緒に新しい日本のアニメ映画を見に行きませんか。",
          kana: "いっしょにあたらしいにほんのアニメえいがをみにいきませんか。",
          romaji: "Isshoni atarashii Nihon no anime eiga o mi ni ikimasen ka.",
          vi: "Bạn có muốn cùng tôi đi xem bộ phim hoạt hình anime mới của Nhật không?",
          en: "Would you like to go watch a new Japanese anime movie with me?",
          zh: "一緒に新しい日本のアニメ映画を見に行きませんか。",
          py: "Isshoni atarashii Nihon no anime eiga o mi ni ikimasen ka.",
          ipa: "Isshoni atarashii Nihon no anime eiga o mi ni ikimasen ka."
        },
        {
          who: "B",
          ja: "いいですね！ぜひ行きましょう。何時に会いましょうか。",
          kana: "いいですね！ぜひいきましょう。なんじにあいましょうか。",
          romaji: "Ii desu ne! Zehi ikimashou. Nanji ni aimashou ka.",
          vi: "Ý kiến hay quá! Nhất định phải đi rồi. Mấy giờ chúng mình gặp nhau đây?",
          en: "That sounds great! Let us definitely go. What time shall we meet?",
          zh: "いいですね！ぜひ行きましょう。何時に会いましょうか。",
          py: "Ii desu ne! Zehi ikimashou. Nanji ni aimashou ka.",
          ipa: "Ii desu ne! Zehi ikimashou. Nanji ni aimashou ka."
        },
        {
          who: "A",
          ja: "午後二時に渋谷駅のハチ公の前でどうですか。",
          kana: "ごごにじにしぶやえきのはちこうのまえでどうですか。",
          romaji: "Gogo niji ni Shibuya-eki no Hachikou no mae de dou desu ka.",
          vi: "Hai giờ chiều trước tượng chú chó Hachiko ở ga Shibuya được không bạn?",
          en: "How about meeting at 2 PM in front of the Hachiko statue at Shibuya Station?",
          zh: "午後二時に渋谷駅のハチ公の前でどうですか。",
          py: "Gogo niji ni Shibuya-eki no Hachikou no mae de dou desu ka.",
          ipa: "Gogo niji ni Shibuya-eki no Hachikou no mae de dou desu ka."
        },
        {
          who: "B",
          ja: "分かりました。楽しみにしています！",
          kana: "わかりました。たのしみにしています！",
          romaji: "Wakarimashita. Tanoshimi ni shite imasu!",
          vi: "Nhất trí rồi nhé. Mình rất mong chờ đến ngày đó!",
          en: "Got it. I am looking forward to it!",
          zh: "分かりました。楽しみにしています！",
          py: "Wakarimashita. Tanoshimi ni shite imasu!",
          ipa: "Wakarimashita. Tanoshimi ni shite imasu!"
        }
      ]
    },
    {
      id: "d08",
      title: "Hỏi đường tại Tokyo",
      lines: [
        {
          who: "A",
          ja: "すみません、郵便局はどこにありますか。",
          kana: "すみません、ゆうびんきょくはどこにありますか。",
          romaji: "Sumimasen, yuubinkyoku wa doko ni arimasu ka.",
          vi: "Xin lỗi làm phiền bạn, bưu điện ở đâu vậy ạ?",
          en: "Excuse me, where is the post office?",
          zh: "すみません、郵便局はどこにありますか。",
          py: "Sumimasen, yuubinkyoku wa doko ni arimasu ka.",
          ipa: "Sumimasen, yuubinkyoku wa doko ni arimasu ka."
        },
        {
          who: "B",
          ja: "この道をまっすぐ行って、二つ目の角を右に曲がってください。",
          kana: "このみちをまっすぐいって、ふたつめのかどをみぎにまがってください。",
          romaji: "Kono michi o massugu itte, futatsume no kado o migi ni magatte kudasai.",
          vi: "Bạn hãy đi thẳng con đường này, rồi rẽ phải ở ngã rẽ thứ hai nhé.",
          en: "Go straight down this street, and turn right at the second corner.",
          zh: "この道をまっすぐ行って、二つ目の角を右に曲がってください。",
          py: "Kono michi o massugu itte, futatsume no kado o migi ni magatte kudasai.",
          ipa: "Kono michi o massugu itte, futatsume no kado o migi ni magatte kudasai."
        },
        {
          who: "A",
          ja: "右ですね。遠いですか。",
          kana: "みぎですね。とおいですか。",
          romaji: "Migi desu ne. Tooi desu ka.",
          vi: "Rẽ phải đúng không ạ. Có xa lắm không bạn?",
          en: "Turn right, got it. Is it far?",
          zh: "右ですね。遠いですか。",
          py: "Migi desu ne. Tooi desu ka.",
          ipa: "Migi desu ne. Tooi desu ka."
        },
        {
          who: "B",
          ja: "いいえ、歩いて五分くらいですよ。銀行の隣にあります。",
          kana: "いいえ、あるいてごふんくらいですよ。ぎんこうのとなりにあります。",
          romaji: "Iie, aruite gofun kurai desu yo. Ginkou no tonari ni arimasu.",
          vi: "Không, đi bộ chỉ khoảng 5 phút thôi. Nó nằm ngay cạnh ngân hàng đấy.",
          en: "No, about a five-minute walk. It is next to the bank.",
          zh: "いいえ、歩いて五分くらいですよ。銀行の隣にあります。",
          py: "Iie, aruite gofun kurai desu yo. Ginkou no tonari ni arimasu.",
          ipa: "Iie, aruite gofun kurai desu yo. Ginkou no tonari ni arimasu."
        },
        {
          who: "A",
          ja: "赤い看板がありますか。",
          kana: "あかいかんばんがありますか。",
          romaji: "Akai看板 ga arimasu ka.",
          vi: "Nó có biển hiệu màu đỏ phải không ạ?",
          en: "Does it have a red sign?",
          zh: "赤い看板がありますか。",
          py: "Akai kanban ga arimasu ka.",
          ipa: "Akai kanban ga arimasu ka."
        },
        {
          who: "B",
          ja: "はい、赤いマークが目印です。すぐ分かりますよ。",
          kana: "はい、あかいマークがめじるしです。すぐわかりますよ。",
          romaji: "Hai, akai maaku ga mejirushi desu. Sugu wakarimasu yo.",
          vi: "Vâng, biểu tượng màu đỏ làm dấu hiệu nhận biết. Bạn sẽ thấy ngay thôi.",
          en: "Yes, the red symbol is the landmark. You will spot it right away.",
          zh: "はい、赤いマークが目印です。すぐ分かりますよ。",
          py: "Hai, akai maaku ga mejirushi desu. Sugu wakarimasu yo.",
          ipa: "Hai, akai maaku ga mejirushi desu. Sugu wakarimasu yo."
        }
      ]
    },
    {
      id: "d09",
      title: "Mua hàng tại cửa hàng tiện lợi Konbini",
      lines: [
        {
          who: "A",
          ja: "いらっしゃいませ！お弁当を温めますか。",
          kana: "いらっしゃいませ！おべんとうをあたためますか。",
          romaji: "Irasshaimase! Obentou o atatamemasu ka.",
          vi: "Kính chào quý khách! Quý khách có muốn hâm nóng hộp cơm bento không ạ?",
          en: "Welcome! Would you like your bento box warmed up?",
          zh: "いらっしゃいませ！お弁当を温めますか。",
          py: "Irasshaimase! Obentou o atatamemasu ka.",
          ipa: "Irasshaimase! Obentou o atatamemasu ka."
        },
        {
          who: "B",
          ja: "はい、温めてください。",
          kana: "はい、あたためてください。",
          romaji: "Hai, atatamete kudasai.",
          vi: "Vâng, làm ơn hâm nóng giúp tôi.",
          en: "Yes, please warm it up.",
          zh: "はい、温めてください。",
          py: "Hai, atatamete kudasai.",
          ipa: "Hai, atatamete kudasai."
        },
        {
          who: "A",
          ja: "お箸はおつけしますか。",
          kana: "おはしはおつけしますか。",
          romaji: "Ohashi wa otsukeshimasu ka.",
          vi: "Tôi lấy thêm đũa cho bạn nhé?",
          en: "Shall I include chopsticks?",
          zh: "お箸はおつけしますか。",
          py: "Ohashi wa otsukeshimasu ka.",
          ipa: "Ohashi wa otsukeshimasu ka."
        },
        {
          who: "B",
          ja: "はい、一膳お願いします。スプーンも一つください。",
          kana: "はい、いちぜんおねがいします。スプーンもひとつください。",
          romaji: "Hai, ichizen onegaishimasu. Supuun mo hitotsu kudasai.",
          vi: "Vâng, cho tôi xin một đôi đũa. Cho tôi thêm một chiếc thìa nữa nhé.",
          en: "Yes, one pair please. Also a spoon as well.",
          zh: "はい、一膳お願いします。スプーンも一つください。",
          py: "Hai, ichizen onegaishimasu. Supuun mo hitotsu kudasai.",
          ipa: "Hai, ichizen onegaishimasu. Supuun mo hitotsu kudasai."
        },
        {
          who: "A",
          ja: "レジ袋はご利用になりますか。五円になります。",
          kana: "レジぶくろはごりようになりますか。ごえんになります。",
          romaji: "Rejibukuro wa goriyou ni narimasu ka. Go-en ni narimasu.",
          vi: "Bạn có dùng túi nylon đựng hàng không ạ? Giá túi là năm yên.",
          en: "Would you like a plastic shopping bag? It is 5 yen.",
          zh: "レジ袋はご利用になりますか。五円になります。",
          py: "Rejibukuro wa goriyou ni narimasu ka. Go-en ni narimasu.",
          ipa: "Rejibukuro wa goriyou ni narimasu ka. Go-en ni narimasu."
        },
        {
          who: "B",
          ja: "大丈夫です。マイバッグを持っています。",
          kana: "だいじょうぶです。マイバッグをもっています。",
          romaji: "Daijoubu desu. Mai baggu o motte imasu.",
          vi: "Không cần đâu ạ. Tôi có mang theo túi riêng của mình rồi.",
          en: "No thank you, I brought my own reusable bag.",
          zh: "大丈夫です。マイバッグを持っています。",
          py: "Daijoubu desu. Mai baggu o motte imasu.",
          ipa: "Daijoubu desu. Mai baggu o motte imasu."
        }
      ]
    },
    {
      id: "d10",
      title: "Thăm hỏi sức khỏe & Lời chia tay",
      lines: [
        {
          who: "A",
          ja: "顔色が悪いですね。体の具合はどうですか。",
          kana: "かおいろがわるいですね。からだのぐあいはどうですか。",
          romaji: "Kaoiro ga warui desu ne. Karada no guai wa dou desu ka.",
          vi: "Sắc mặt bạn trông nhợt nhạt quá. Sức khỏe trong người bạn thế nào rồi?",
          en: "You look pale. How are you feeling?",
          zh: "顔色が悪いですね。体の具合はどうですか。",
          py: "Kaoiro ga warui desu ne. Karada no guai wa dou desu ka.",
          ipa: "Kaoiro ga warui desu ne. Karada no guai wa dou desu ka."
        },
        {
          who: "B",
          ja: "少し頭が痛くて、熱もあります。",
          kana: "すこしあたまがいたくて、ねつもあります。",
          romaji: "Sukoshi atama ga itakute, netsu mo arimasu.",
          vi: "Tôi hơi đau đầu và người cũng bị sốt nữa.",
          en: "I have a slight headache and a fever too.",
          zh: "少し頭が痛くて、熱もあります。",
          py: "Sukoshi atama ga itakute, netsu mo arimasu.",
          ipa: "Sukoshi atama ga itakute, netsu mo arimasu."
        },
        {
          who: "A",
          ja: "それは大変ですね！もう病院へ行きましたか。",
          kana: "それはたいへんですね！もうびょういんへいきましたか。",
          romaji: "Sore wa taihen desu ne! Mou byouin e ikimashita ka.",
          vi: "Thế thì vất vả quá! Bạn đã đi bệnh viện khám chưa?",
          en: "That sounds bad! Have you been to the hospital yet?",
          zh: "それは大変ですね！もう病院へ行きましたか。",
          py: "Sore wa taihen desu ne! Mou byouin e ikimashita ka.",
          ipa: "Sore wa taihen desu ne! Mou byouin e ikimashita ka."
        },
        {
          who: "B",
          ja: "まだです。これから薬を飲んで、家で休みます。",
          kana: "まだです。これからくすりをのんで、いえでやすみます。",
          romaji: "Mada desu. Kore kara kusuri o nonde, ie de yasumimasu.",
          vi: "Tôi chưa đi. Lát nữa tôi sẽ uống thuốc rồi nghỉ ngơi ở nhà.",
          en: "Not yet. I will take some medicine now and rest at home.",
          zh: "まだです。これから薬を飲んで、家で休みます。",
          py: "Mada desu. Kore kara kusuri o nonde, ie de yasumimasu.",
          ipa: "Mada desu. Kore kara kusuri o nonde, ie de yasumimasu."
        },
        {
          who: "A",
          ja: "無理をしないで、暖かくしてくださいね。お大事に！",
          kana: "むりをしないで、あたたかくしてくださいね。おだいじに！",
          romaji: "Muri o shinaide, atatakaku shite kudasai ne. Odaiji ni!",
          vi: "Đừng cố quá sức, hãy giữ ấm cơ thể nhé. Chúc bạn mau khỏe!",
          en: "Do not push yourself and stay warm. Take good care of yourself!",
          zh: "無理をしないで、暖かくしてくださいね。お大事に！",
          py: "Muri o shinaide, atatakaku shite kudasai ne. Odaiji ni!",
          ipa: "Muri o shinaide, atatakaku shite kudasai ne. Odaiji ni!"
        },
        {
          who: "B",
          ja: "ありがとうございます。また明日、連絡します。",
          kana: "ありがとうございます。またあした、れんらくします。",
          romaji: "Arigatou gozaimasu. Mata ashita, renraku shimasu.",
          vi: "Cảm ơn bạn rất nhiều. Ngày mai tôi sẽ liên lạc lại nhé.",
          en: "Thank you very much. I will contact you tomorrow.",
          zh: "ありがとうございます。また明日、連絡します。",
          py: "Arigatou gozaimasu. Mata ashita, renraku shimasu.",
          ipa: "Arigatou gozaimasu. Mata ashita, renraku shimasu."
        }
      ]
    }
  ];

  if (typeof window !== 'undefined') {
    window.JA_DIALOGUES = DIALOGUES;
    window.DIALOGUES_JA = DIALOGUES;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DIALOGUES;
  }
})();
