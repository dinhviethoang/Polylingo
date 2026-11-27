/**
 * data/zh/talk-dialogues.js
 * 10 hội thoại đời thường phục vụ chế độ "Đóng vai A-B" (Roleplay A-B).
 * Cấu trúc:
 *  - id: mã định danh hội thoại
 *  - title: tiêu đề tiếng Việt
 *  - scene: bối cảnh tình huống thực tế
 *  - roleA: { name, char, avatar }
 *  - roleB: { name, char, avatar }
 *  - sentences: [ { who: 'A'|'B', zh, py, vi }, ... ]
 */

(function () {
  'use strict';

  const TALK_DIALOGUES = [
    {
      id: 'td01',
      title: 'Đi chợ mua rau',
      scene: 'Tại sạp rau củ ở chợ truyền thống, bạn hỏi giá bắp cải và cà chua, mặc cả nhẹ và mua hàng.',
      roleA: { name: 'Khách mua (Bạn)', char: '买菜人', avatar: '🛒' },
      roleB: { name: 'Người bán rau', char: '菜贩', avatar: '🥬' },
      sentences: [
        { who: 'A', zh: '您好，请问这白菜多少钱一斤？', py: 'Nín hǎo, qǐngwèn zhè báicài duōshao qián yì jīn?', vi: 'Xin chào, xin hỏi bắp cải này bao nhiêu tiền một cân?' },
        { who: 'B', zh: '白菜两块钱一斤，今天很新鲜。', py: 'Báicài liǎng kuài qián yì jīn, jīntiān hěn xīnxiān.', vi: 'Bắp cải hai đồng một cân, hôm nay rất tươi.' },
        { who: 'A', zh: '那西红柿怎么卖呢？', py: 'Nà xīhóngshì zěnme mài ne?', vi: 'Thế còn cà chua bán thế nào ạ?' },
        { who: 'B', zh: '西红柿四块钱一斤，你想买几斤？', py: 'Xīhóngshì sì kuài qián yì jīn, nǐ xiǎng mǎi jǐ jīn?', vi: 'Cà chua bốn đồng một cân, cháu muốn mua mấy cân?' },
        { who: 'A', zh: '有点儿贵，便宜一点儿可以吗？三块五吧。', py: 'Yǒudiǎnr guì, piányi yìdiǎnr kěyǐ ma? Sān kuài wǔ ba.', vi: 'Hơi đắt một chút, rẻ hơn một chút được không? Ba đồng rưỡi nhé.' },
        { who: 'B', zh: '好吧，买两斤就给你三块五。', py: 'Hǎo ba, mǎi liǎng jīn jiù gěi nǐ sān kuài wǔ.', vi: 'Được thôi, mua hai cân thì bác để cho cháu ba đồng rưỡi.' },
        { who: 'A', zh: '好的，我要两斤西红柿和一棵白菜。', py: 'Hǎo de, wǒ yào liǎng jīn xīhóngshì hé yì kē báicài.', vi: 'Vâng ạ, cháu lấy hai cân cà chua và một cây bắp cải.' },
        { who: 'B', zh: '一共九块钱，菜给你装好了。', py: 'Yígòng jiǔ kuài qián, cài gěi nǐ zhuāng hǎo le.', vi: 'Tổng cộng chín đồng, rau đã đóng túi cho cháu rồi.' },
        { who: 'A', zh: '给你十块钱，不用找了。', py: 'Gěi nǐ shí kuài qián, bú yòng zhǎo le.', vi: 'Gửi bác mười đồng, không cần thối lại đâu ạ.' },
        { who: 'B', zh: '谢谢你，慢走，下次再来！', py: 'Xièxie nǐ, màn zǒu, xià cì zài lái!', vi: 'Cảm ơn cháu, đi cẩn thận, lần sau lại ghé nhé!' }
      ]
    },
    {
      id: 'td02',
      title: 'Gọi món trà sữa',
      scene: 'Tại quầy trà sữa gần trường học, bạn gọi trà sữa trân châu, chọn lượng đường và đá.',
      roleA: { name: 'Khách hàng (Bạn)', char: '顾客', avatar: '🥤' },
      roleB: { name: 'Nhân viên quán', char: '店员', avatar: '🧋' },
      sentences: [
        { who: 'A', zh: '你好，我要一杯珍珠奶茶。', py: 'Nǐ hǎo, wǒ yào yì bēi zhēnzhū nǎichá.', vi: 'Xin chào, tôi muốn một ly trà sữa trân châu.' },
        { who: 'B', zh: '好的，请问你要大杯还是中杯？', py: 'Hǎo de, qǐngwèn nǐ yào dà bēi háishi zhōng bēi?', vi: 'Vâng ạ, xin hỏi bạn muốn ly lớn hay ly vừa?' },
        { who: 'A', zh: '我要大杯的，多少钱一杯？', py: 'Wǒ yào dà bēi de, duōshao qián yì bēi?', vi: 'Tôi lấy ly lớn, bao nhiêu tiền một ly vậy?' },
        { who: 'B', zh: '大杯十五块。你要热的还是冰的？', py: 'Dà bēi shíwǔ kuài. Nǐ yào rè de háishi bīng de?', vi: 'Ly lớn mười lăm đồng. Bạn uống nóng hay lạnh?' },
        { who: 'A', zh: '我要冰的，少放一点儿冰。', py: 'Wǒ yào bīng de, shǎo fàng yìdiǎnr bīng.', vi: 'Tôi lấy đá, cho ít đá thôi nhé.' },
        { who: 'B', zh: '好的，甜度呢？正常甜还是半糖？', py: 'Hǎo de, tiándù ne? Zhèngcháng tián háishi bàn táng?', vi: 'Được ạ, còn độ ngọt? Ngọt bình thường hay nửa đường?' },
        { who: 'A', zh: '半糖就好，不要太甜。', py: 'Bàn táng jiù hǎo, bú yào tài tián.', vi: 'Nửa đường là được, đừng ngọt quá.' },
        { who: 'B', zh: '好的，在这里喝还是带走？', py: 'Hǎo de, zài zhèlǐ hē háishi dài zǒu?', vi: 'Vâng, bạn uống ở đây hay mang đi?' },
        { who: 'A', zh: '我带走，可以用手机付钱吗？', py: 'Wǒ dài zǒu, kěyǐ yòng shǒujī fù qián ma?', vi: 'Tôi mang đi, có thể trả tiền bằng điện thoại không?' },
        { who: 'B', zh: '可以的，请扫这里，稍等两分钟。', py: 'Kěyǐ de, qǐng sǎo zhèlǐ, shāo děng liǎng fēnzhōng.', vi: 'Được chứ ạ, mời quét mã ở đây, đợi hai phút nhé.' }
      ]
    },
    {
      id: 'td03',
      title: 'Hỏi thăm sức khỏe',
      scene: 'Bạn tình cờ gặp lại người bạn cùng lớp sau mấy ngày bạn ấy nghỉ ốm ở nhà.',
      roleA: { name: 'Bạn (Tiểu Minh)', char: '小明', avatar: '😊' },
      roleB: { name: 'Bạn cùng lớp (David)', char: '大卫', avatar: '😷' },
      sentences: [
        { who: 'A', zh: '大卫，好几天没看见你了，你怎么样？', py: 'Dàwèi, hǎo jǐ tiān méi kànjiàn nǐ le, nǐ zěnmeyàng?', vi: 'David, mấy ngày rồi không thấy cậu, cậu thế nào rồi?' },
        { who: 'B', zh: '我前天感冒了，身体有点儿不舒服。', py: 'Wǒ qiántiān gǎnmào le, shēntǐ yǒudiǎnr bù shūfu.', vi: 'Hôm kia tớ bị cảm, trong người hơi khó chịu.' },
        { who: 'A', zh: '现在好一点儿了吗？发烧吗？', py: 'Xiànzài hǎo yìdiǎnr le ma? Fāshāo ma?', vi: 'Bây giờ đã đỡ hơn chút nào chưa? Có sốt không?' },
        { who: 'B', zh: '已经不发烧了，但还是有点儿咳嗽。', py: 'Yǐjīng bù fāshāo le, dàn háishi yǒudiǎnr késou.', vi: 'Hết sốt rồi, nhưng vẫn còn hơi ho.' },
        { who: 'A', zh: '你去看医生了吗？吃药了没有？', py: 'Nǐ qù kàn yīshēng le ma? Chī yào le méiyǒu?', vi: 'Cậu đã đi khám bác sĩ chưa? Đã uống thuốc chưa?' },
        { who: 'B', zh: '去了，医生给我开了药，让我多休息。', py: 'Qù le, yīshēng gěi wǒ kāi le yào, ràng wǒ duō xiūxi.', vi: 'Đi rồi, bác sĩ kê đơn thuốc cho tớ và bảo nghỉ ngơi nhiều.' },
        { who: 'A', zh: '那就好，你要多喝热水，早点儿睡觉。', py: 'Nà jiù hǎo, nǐ yào duō hē rè shuǐ, zǎodiǎnr shuìjiào.', vi: 'Thế thì tốt rồi, cậu nên uống nhiều nước ấm và ngủ sớm nhé.' },
        { who: 'B', zh: '谢谢你的关心，今天的作业多吗？', py: 'Xièxie nǐ de guānxīn, jīntiān de zuòyè duō ma?', vi: 'Cảm ơn sự quan tâm của cậu, bài tập hôm nay có nhiều không?' },
        { who: 'A', zh: '不多，等会儿我把笔记发给你。', py: 'Bù duō, děng huìr wǒ bǎ bǐjì fā gěi nǐ.', vi: 'Không nhiều đâu, lát nữa tớ gửi vở ghi chép cho cậu.' },
        { who: 'B', zh: '太感谢你了，你真好！', py: 'Tài gǎnxiè nǐ le, nǐ zhēn hǎo!', vi: 'Cảm ơn cậu nhiều lắm, cậu thật tốt bụng!' }
      ]
    },
    {
      id: 'td04',
      title: 'Gọi điện hẹn gặp',
      scene: 'Bạn gọi điện cho bạn thân để hẹn cùng đi uống trà và ôn bài vào cuối tuần.',
      roleA: { name: 'Bạn (Tiểu Hoa)', char: '小华', avatar: '📱' },
      roleB: { name: 'Bạn thân (Tiểu Lý)', char: '小李', avatar: '📞' },
      sentences: [
        { who: 'A', zh: '喂，小李，明天下午你有空儿吗？', py: 'Wéi, Xiǎo Lǐ, míngtiān xiàwǔ nǐ yǒu kòngr ma?', vi: 'Alo, Tiểu Lý, chiều mai cậu có rảnh không?' },
        { who: 'B', zh: '喂，小华，明天下午我没事，怎么了？', py: 'Wéi, Xiǎo Huá, míngtiān xiàwǔ wǒ méi shì, zěnme le?', vi: 'Alo, Tiểu Hoa, chiều mai tớ không có việc gì, sao thế cậu?' },
        { who: 'A', zh: '我们一起去学校外面的茶馆喝茶，好吗？', py: 'Wǒmen yìqǐ qù xuéxiào wàimiàn de cháguǎn hē chá, hǎo ma?', vi: 'Chúng mình cùng ra quán trà ngoài trường uống nước nhé, được không?' },
        { who: 'B', zh: '好啊，我也正想找你聊天儿呢。', py: 'Hǎo a, wǒ yě zhèng xiǎng zhǎo nǐ liáotiānr ne.', vi: 'Được chứ, tớ cũng đang định tìm cậu nói chuyện đây.' },
        { who: 'A', zh: '那我们明天下午三点见，可以吗？', py: 'Nà wǒmen míngtiān xiàwǔ sān diǎn jiàn, kěyǐ ma?', vi: 'Thế chúng mình hẹn ba giờ chiều mai gặp nhé, được không?' },
        { who: 'B', zh: '三点半行吗？我想先去买两本书。', py: 'Sān diǎn bàn xíng ma? Wǒ xiǎng xiān qù mǎi liǎng běn shū.', vi: 'Ba rưỡi được không? Tớ muốn đi mua hai quyển sách trước.' },
        { who: 'A', zh: '没问题，那我们在茶馆门口见。', py: 'Méi wèntí, nà wǒmen zài cháguǎn ménkǒu jiàn.', vi: 'Không vấn đề gì, thế gặp nhau ở trước cửa quán trà nhé.' },
        { who: 'B', zh: '行，你把电脑也带上吧，我们一起复习。', py: 'Xíng, nǐ bǎ diànnǎo yě dài shang ba, wǒmen yìqǐ fùxí.', vi: 'Được, cậu mang cả máy tính theo nhé, chúng mình cùng ôn bài.' },
        { who: 'A', zh: '好主意，下周一就要考试了。', py: 'Hǎo zhǔyi, xià zhōu yī jiù yào kǎoshì le.', vi: 'Ý kiến hay, thứ hai tuần sau là thi rồi.' },
        { who: 'B', zh: '那明天见，拜拜！', py: 'Nà míngtiān jiàn, bāibai!', vi: 'Thế mai gặp nhé, tạm biệt!' }
      ]
    },
    {
      id: 'td05',
      title: 'Đi khám bệnh',
      scene: 'Bạn đến phòng khám trường học gặp bác sĩ vì bị đau họng và nhức đầu.',
      roleA: { name: 'Người bệnh (Bạn)', char: '病人', avatar: '🤒' },
      roleB: { name: 'Bác sĩ', char: '医生', avatar: '👨‍⚕️' },
      sentences: [
        { who: 'A', zh: '医生您好，我从昨天开始头很疼。', py: 'Yīshēng nín hǎo, wǒ cóng zuótiān kāishǐ tóu hěn téng.', vi: 'Chào bác sĩ, từ hôm qua đầu cháu đau lắm ạ.' },
        { who: 'B', zh: '请坐，除了头疼，还有哪里不舒服？', py: 'Qǐng zuò, chúle tóuténg, hái yǒu nǎlǐ bù shūfu.', vi: 'Mời ngồi, ngoài đau đầu ra cháu còn khó chịu ở đâu nữa?' },
        { who: 'A', zh: '喉咙也很疼，吃东西的时候不舒服。', py: 'Hóulóng yě hěn téng, chī dōngxi de shíhou bù shūfu.', vi: 'Họng cháu cũng rất đau, khi ăn uống rất khó chịu.' },
        { who: 'B', zh: '我看一下，张开嘴，说“啊”。', py: 'Wǒ kàn yíxià, zhāng kāi zuǐ, shuō "ā".', vi: 'Để bác xem nào, há miệng ra, kêu "a" nhé.' },
        { who: 'A', zh: '啊……医生，问题大吗？', py: 'Ā…… Yīshēng, wèntí dà ma?', vi: 'A... Bác sĩ ơi, có bị nặng lắm không ạ?' },
        { who: 'B', zh: '喉咙有点儿红，量一下体温吧。三十七度八。', py: 'Hóulóng yǒudiǎnr hóng, liáng yíxià tǐwēn ba. Sānshíqī dù bā.', vi: 'Họng hơi đỏ một chút, đo nhiệt độ xem nào. Ba mươi bảy độ tám.' },
        { who: 'A', zh: '我需要打针吗？我有点儿害怕打针。', py: 'Wǒ xūyào dǎzhēn ma? Wǒ yǒudiǎnr hàipà dǎzhēn.', vi: 'Cháu có cần tiêm không ạ? Cháu hơi sợ tiêm.' },
        { who: 'B', zh: '不用打针，我给你开三天药，按时吃。', py: 'Bú yòng dǎzhēn, wǒ gěi nǐ kāi sān tiān yào, ànshí chī.', vi: 'Không cần tiêm đâu, bác kê cho cháu thuốc uống trong ba ngày, uống đúng giờ nhé.' },
        { who: 'A', zh: '好的，请问饮食上需要注意什么吗？', py: 'Hǎo de, qǐngwèn yǐnshí shang xūyào zhùyì shénme ma?', vi: 'Vâng, xin hỏi về ăn uống cháu cần chú ý gì không ạ?' },
        { who: 'B', zh: '多喝温水，别吃辣的，回去好好睡一觉。', py: 'Duō hē wēn shuǐ, bié chī là de, huíqù hǎohǎo shuì yí jiào.', vi: 'Uống nhiều nước ấm, đừng ăn đồ cay, về ngủ một giấc thật ngon nhé.' }
      ]
    },
    {
      id: 'td06',
      title: 'Hỏi giờ tàu xe',
      scene: 'Tại quầy bán vé ga xe lửa, bạn hỏi giờ tàu chạy đi Thượng Hải và giá vé.',
      roleA: { name: 'Hành khách (Bạn)', char: '乘客', avatar: '🧳' },
      roleB: { name: 'Nhân viên bán vé', char: '售票员', avatar: '🎫' },
      sentences: [
        { who: 'A', zh: '您好，请问去上海的火车几点开？', py: 'Nín hǎo, qǐngwèn qù Shànghǎi de huǒchē jǐ diǎn kāi?', vi: 'Xin chào, xin hỏi tàu đi Thượng Hải mấy giờ chạy ạ?' },
        { who: 'B', zh: '下午两点半和四点各有一趟。', py: 'Xiàwǔ liǎng diǎn bàn hé sì diǎn gè yǒu yí tàng.', vi: 'Chiều nay hai giờ rưỡi và bốn giờ mỗi giờ có một chuyến.' },
        { who: 'A', zh: '两点半的那趟几点能到上海？', py: 'Liǎng diǎn bàn de nà tàng jǐ diǎn néng dào Shànghǎi?', vi: 'Chuyến hai giờ rưỡi thì mấy giờ đến Thượng Hải ạ?' },
        { who: 'B', zh: '大概下午五点半到，路上三个小时。', py: 'Dàgài xiàwǔ wǔ diǎn bàn dào, lùshang sān gè xiǎoshí.', vi: 'Khoảng năm giờ rưỡi chiều đến, đi trên đường mất ba tiếng.' },
        { who: 'A', zh: '二等座的票还有吗？一张多少钱？', py: 'Èrděng zuò de piào hái yǒu ma? Yì zhāng duōshao qián?', vi: 'Vé ghế hạng hai còn không ạ? Một vé bao nhiêu tiền?' },
        { who: 'B', zh: '还有票，二等座一张一百五十块。', py: 'Hái yǒu piào, èrděng zuò yì zhāng yì bǎi wǔshí kuài.', vi: 'Vẫn còn vé, ghế hạng hai một vé một trăm năm mươi đồng.' },
        { who: 'A', zh: '那我买一张两点半的二等座。', py: 'Nà wǒ mǎi yì zhāng liǎng diǎn bàn de èrděng zuò.', vi: 'Thế cho tôi mua một vé ghế hạng hai chuyến hai giờ rưỡi.' },
        { who: 'B', zh: '请出示一下您的护照或者身份证。', py: 'Qǐng chūshì yíxià nín de hùzhào huòzhě shēnfènzhèng.', vi: 'Xin vui lòng xuất trình hộ chiếu hoặc căn cước của bạn.' },
        { who: 'A', zh: '好的，给您护照。请问在几号候车室？', py: 'Hǎo de, gěi nín hùzhào. Qǐngwèn zài jǐ hào hòuchēshì?', vi: 'Vâng, gửi bác hộ chiếu. Xin hỏi đợi ở phòng chờ số mấy ạ?' },
        { who: 'B', zh: '二楼三号候车室，请提前十五分钟检票。', py: 'Èr lóu sān hào hòuchēshì, qǐng tíqián shíwǔ fēnzhōng jiǎn piào.', vi: 'Tầng hai phòng chờ số ba, vui lòng soát vé trước mười lăm phút nhé.' }
      ]
    },
    {
      id: 'td07',
      title: 'Mua vé xem phim',
      scene: 'Bạn và nhân viên rạp chiếu phim trao đổi để chọn phim, giờ chiếu và ghế ngồi.',
      roleA: { name: 'Khán giả (Bạn)', char: '观众', avatar: '🎬' },
      roleB: { name: 'Nhân viên rạp phim', char: '影院人员', avatar: '🍿' },
      sentences: [
        { who: 'A', zh: '你好，今晚有什么好看的电影？', py: 'Nǐ hǎo, jīnwǎn yǒu shénme hǎokàn de diànyǐng?', vi: 'Xin chào, tối nay có phim gì hay không ạ?' },
        { who: 'B', zh: '今晚有新出的中国功夫电影，评价很高。', py: 'Jīnwǎn yǒu xīn chū de Zhōngguó gōngfu diànyǐng, píngjià hěn gāo.', vi: 'Tối nay có phim võ thuật Trung Quốc mới ra, đánh giá rất cao.' },
        { who: 'A', zh: '太好了，最近一场是几点开始？', py: 'Tài hǎo le, zuìjìn yì chǎng shì jǐ diǎn kāishǐ?', vi: 'Tuyệt quá, suất gần nhất bắt đầu lúc mấy giờ?' },
        { who: 'B', zh: '七点二十分有一场，现在买票正合适。', py: 'Qī diǎn èrshí fēn yǒu yì chǎng, xiànzài mǎi piào zhèng héshì.', vi: 'Bảy giờ hai mươi có một suất, bây giờ mua vé là vừa đẹp.' },
        { who: 'A', zh: '我想买两张票，一张多少钱？', py: 'Wǒ xiǎng mǎi liǎng zhāng piào, yì zhāng duōshao qián?', vi: 'Tôi muốn mua hai vé, một vé bao nhiêu tiền vậy?' },
        { who: 'B', zh: '一张五十块，学生票可以打八折。', py: 'Yì zhāng wǔshí kuài, xuésheng piào kěyǐ dǎ bā zhé.', vi: 'Một vé năm mươi đồng, vé học sinh sinh viên được giảm hai mươi phần trăm.' },
        { who: 'A', zh: '这是我的学生证，请帮我选中间的位置。', py: 'Zhè shì wǒ de xuéshengzhèng, qǐng bāng wǒ xuǎn zhōngjiān de wèizhi.', vi: 'Đây là thẻ sinh viên của tôi, xin chọn giúp tôi ghế ở giữa nhé.' },
        { who: 'B', zh: '六排七号和八号可以吗？看屏幕很清楚。', py: 'Liù pái qī hào hé bā hào kěyǐ ma? Kàn píngmù hěn qīngchu.', vi: 'Hàng sáu số bảy và số tám được không? Nhìn màn hình rất rõ.' },
        { who: 'A', zh: '很好，一共是八十块对吗？', py: 'Hěn hǎo, yígòng shì bāshí kuài duì ma?', vi: 'Rất tốt, tổng cộng là tám mươi đồng đúng không ạ?' },
        { who: 'B', zh: '对的，这是您的票和爆米花券，祝您观影愉快！', py: 'Duì de, zhè shì nín de piào hé bàomǐhuā quàn, zhù nín guānyǐng yúkuài!', vi: 'Đúng rồi ạ, đây là vé và phiếu bắp rang của bạn, chúc bạn xem phim vui vẻ!' }
      ]
    },
    {
      id: 'td08',
      title: 'Nói chuyện gia đình',
      scene: 'Bạn và bạn bè trò chuyện trong giờ giải lao về gia đình, quê quán và người thân.',
      roleA: { name: 'Bạn (Tiểu Minh)', char: '小明', avatar: '👨' },
      roleB: { name: 'Bạn bè (Anna)', char: '安娜', avatar: '👩' },
      sentences: [
        { who: 'A', zh: '安娜，你家一共有几口人？', py: 'Ānnà, nǐ jiā yígòng yǒu jǐ kǒu rén?', vi: 'Anna, nhà bạn tổng cộng có mấy người?' },
        { who: 'B', zh: '我家有四口人，爸爸、妈妈、一个弟弟和我。', py: 'Wǒ jiā yǒu sì kǒu rén, bàba, māma, yí gè dìdi hé wǒ.', vi: 'Nhà mình có bốn người: bố, mẹ, một em trai và mình.' },
        { who: 'A', zh: '你爸爸妈妈做什么工作？', py: 'Nǐ bàba māma zuò shénme gōngzuò?', vi: 'Bố mẹ bạn làm công việc gì?' },
        { who: 'B', zh: '我爸爸是医生，妈妈在学校当老师。你呢？', py: 'Wǒ bàba shì yīshēng, māma zài xuéxiào dāng lǎoshī. Nǐ ne?', vi: 'Bố mình là bác sĩ, mẹ làm giáo viên ở trường. Còn bạn?' },
        { who: 'A', zh: '我家有三口人，我是独生子。', py: 'Wǒ jiā yǒu sān kǒu rén, wǒ shì dúshēngzǐ.', vi: 'Nhà mình có ba người, mình là con một.' },
        { who: 'B', zh: '你父母身体都好吗？他们住在哪里？', py: 'Nǐ fùmǔ shēntǐ dōu hǎo ma? Tāmen zhù zài nǎlǐ?', vi: 'Bố mẹ bạn sức khỏe đều tốt chứ? Họ sống ở đâu?' },
        { who: 'A', zh: '他们身体都很好，现在住在河内。', py: 'Tāmen shēntǐ dōu hěn hǎo, xiànzài zhù zài Hénèi.', vi: 'Họ đều rất khỏe mạnh, hiện đang sống ở Hà Nội.' },
        { who: 'B', zh: '你想家的时候经常给他们打电话吗？', py: 'Nǐ xiǎng jiā de shíhou jīngcháng gěi tāmen dǎ diànhuà ma?', vi: 'Khi nhớ nhà bạn có hay gọi điện cho bố mẹ không?' },
        { who: 'A', zh: '是的，我每个周末都跟他们视频聊天。', py: 'Shì de, wǒ měi gè zhōumò dōu gēn tāmen shìpín liáotiān.', vi: 'Đúng vậy, mỗi cuối tuần mình đều gọi video nói chuyện với họ.' },
        { who: 'B', zh: '真好，一家人在一起最幸福了。', py: 'Zhēn hǎo, yì jiā rén zài yìqǐ zuì xìngfú le.', vi: 'Thật tốt, cả nhà gắn bó bên nhau là hạnh phúc nhất rồi.' }
      ]
    },
    {
      id: 'td09',
      title: 'Thời tiết & cuối tuần',
      scene: 'Bạn và bạn học nói về thời tiết thay đổi và lên kế hoạch đi công viên cuối tuần.',
      roleA: { name: 'Bạn (Tiểu Vương)', char: '小王', avatar: '☀️' },
      roleB: { name: 'Bạn học (Tiểu Lý)', char: '小李', avatar: '⛅' },
      sentences: [
        { who: 'A', zh: '今天天气真好，一点儿也不冷。', py: 'Jīntiān tiānqì zhēn hǎo, yìdiǎnr yě bù lěng.', vi: 'Hôm nay thời tiết thật đẹp, chẳng lạnh chút nào.' },
        { who: 'B', zh: '是啊，太阳很大，出来走走真舒服。', py: 'Shì a, tàiyáng hěn dà, chūlai zǒuzou zhēn shūfu.', vi: 'Đúng vậy, nắng chan hòa, ra ngoài đi dạo thật dễ chịu.' },
        { who: 'A', zh: '你看天气预报了吗？周末天气怎么样？', py: 'Nǐ kàn tiānqì yùbào le ma? Zhōumò tiānqì zěnmeyàng?', vi: 'Cậu xem dự báo thời tiết chưa? Cuối tuần thời tiết thế nào?' },
        { who: 'B', zh: '预报说星期六是晴天，星期天可能会下雨。', py: 'Yùbào shuō xīngqīliù shì qíngtiān, xīngqītiān kěnéng huì xiàyǔ.', vi: 'Dự báo bảo thứ bảy trời nắng ráo, chủ nhật có thể sẽ mưa.' },
        { who: 'A', zh: '那我们周六去人民公园骑自行车吧？', py: 'Nà wǒmen zhōuliù qù rénmín gōngyuán qí zìxíngchē ba?', vi: 'Thế thứ bảy chúng mình đến công viên Nhân Dân đạp xe đạp nhé?' },
        { who: 'B', zh: '好主意，听说公园里的花都开了，很漂亮。', py: 'Hǎo zhǔyi, tīngshuō gōngyuán lǐ de huā dōu kāi le, hěn piàoliang.', vi: 'Ý hay đấy, nghe nói hoa trong công viên nở hết rồi, đẹp lắm.' },
        { who: 'A', zh: '我们可以带点儿面包和水，在那儿吃午饭。', py: 'Wǒmen kěyǐ dài diǎnr miànbāo hé shuǐ, zài nàr chī wǔfàn.', vi: 'Chúng mình có thể mang theo ít bánh mì và nước, ăn trưa ở đó luôn.' },
        { who: 'B', zh: '太棒了，我们早上九点在学校门口集合？', py: 'Tài bàng le, wǒmen zǎoshang jiǔ diǎn zài xuéxiào ménkǒu jíhé?', vi: 'Tuyệt vời, chín giờ sáng chúng mình tập trung ở cổng trường nhé?' },
        { who: 'A', zh: '没问题，别睡懒觉哦！', py: 'Méi wèntí, bié shuì lǎnjiào o!', vi: 'Nhất trí, đừng ngủ nướng đấy nhé!' },
        { who: 'B', zh: '放心吧，我一定准时到！', py: 'Fàngxīn ba, wǒ yídìng zhǔnshí dào!', vi: 'Cậu yên tâm đi, tớ nhất định đến đúng giờ!' }
      ]
    },
    {
      id: 'td10',
      title: 'Mượn đồ của bạn cùng phòng',
      scene: 'Trong ký túc xá, bạn chuẩn bị đi học thì nhận ra hết vở và mượn tạm bạn cùng phòng.',
      roleA: { name: 'Bạn (Tiểu Trần)', char: '小陈', avatar: '🎒' },
      roleB: { name: 'Bạn cùng phòng (Tiểu Trương)', char: '小张', avatar: '📚' },
      sentences: [
        { who: 'A', zh: '小张，打扰一下，你现在在忙吗？', py: 'Xiǎo Zhāng, dǎrǎo yíxià, nǐ xiànzài zài máng ma?', vi: 'Tiểu Trương, làm phiền cậu một lát, cậu đang bận à?' },
        { who: 'B', zh: '不忙，怎么了？有什么事吗？', py: 'Bù máng, zěnme le? Yǒu shénme shì ma?', vi: 'Không bận, sao thế cậu? Có chuyện gì à?' },
        { who: 'A', zh: '我的汉字本写完了，你能借我一本吗？', py: 'Wǒ de hànzì běn xiě wán le, nǐ néng jiè wǒ yì běn ma?', vi: 'Vở tập viết chữ Hán của tớ viết hết rồi, cậu có thể cho tớ mượn một quyển không?' },
        { who: 'B', zh: '可以啊，我的桌子抽屉里有新的。', py: 'Kěyǐ a, wǒ de zhuōzi chōuti lǐ yǒu xīn de.', vi: 'Được chứ, trong ngăn kéo bàn của tớ có quyển mới đấy.' },
        { who: 'A', zh: '找到了，另外我还想借一下你的黑色笔。', py: 'Zhǎodào le, lìngwài wǒ hái xiǎng jiè yíxià nǐ de hēisè bǐ.', vi: 'Tớ thấy rồi, ngoài ra tớ muốn mượn thêm bút đen của cậu một chút.' },
        { who: 'B', zh: '笔筒里有好几支，你随便拿去用吧。', py: 'Bǐtǒng lǐ yǒu hǎo jǐ zhī, nǐ suíbiàn ná qù yòng ba.', vi: 'Trong ống bút có mấy cây lận, cậu cứ tự nhiên lấy dùng nhé.' },
        { who: 'A', zh: '太感谢你了，下午下课后我去超市买了还你。', py: 'Tài gǎnxiè nǐ le, xiàwǔ xiàkè hòu wǒ qù chāoshì mǎi le huán nǐ.', vi: 'Cảm ơn cậu nhiều nhé, chiều tan học tớ ra siêu thị mua rồi trả lại cậu.' },
        { who: 'B', zh: '没事儿，一本本子而已，不用这么客气。', py: 'Méi shìr, yì běn běnzi éryǐ, bú yòng zhème kèqi.', vi: 'Không sao đâu, có cuốn vở thôi mà, không cần khách sáo thế.' },
        { who: 'A', zh: '哈哈，有你这样的室友真好。', py: 'Hāhā, yǒu nǐ zhèyàng de shìyǒu zhēn hǎo.', vi: 'Haha, có người bạn cùng phòng như cậu thật tuyệt.' },
        { who: 'B', zh: '我们是好朋友嘛，快去上课吧，别迟到了。', py: 'Wǒmen shì hǎo péngyou ma, kuài qù shàngkè ba, bié chídào le.', vi: 'Chúng mình là bạn tốt mà, mau đi học đi kẻo muộn đấy.' }
      ]
    }
  ];

  if (typeof window !== 'undefined') {
    window.TALK_DIALOGUES = TALK_DIALOGUES;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TALK_DIALOGUES };
  }
})();
