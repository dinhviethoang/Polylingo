/**
 * data/zh/reading.js — Bài "Đọc và dịch" tiếng Trung (Polylingo tự soạn, từ vựng HSK1).
 * Mỗi câu: zh (chữ Hán), py (pinyin), vi (bản dịch mẫu), keys (ý chính để chấm; "a|b" là các cách nói tương đương).
 */
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;

  root.READING_ZH = [
    {
      id: 'zh-r01',
      title: '我的家',
      titleVi: 'Gia đình tôi',
      level: 'HSK1',
      sentences: [
        { zh: '我家有四口人。', py: 'Wǒ jiā yǒu sì kǒu rén.', vi: 'Nhà tôi có bốn người.', keys: ['nhà|gia đình', 'bốn|4', 'người'] },
        { zh: '爸爸是医生，妈妈是老师。', py: 'Bàba shì yīshēng, māma shì lǎoshī.', vi: 'Bố là bác sĩ, mẹ là giáo viên.', keys: ['bố|ba|cha', 'bác sĩ', 'mẹ|má', 'giáo viên|cô giáo|thầy giáo'] },
        { zh: '我还有一个哥哥。', py: 'Wǒ hái yǒu yí ge gēge.', vi: 'Tôi còn có một người anh trai.', keys: ['còn|cũng', 'một|1', 'anh'] },
        { zh: '哥哥在北京工作。', py: 'Gēge zài Běijīng gōngzuò.', vi: 'Anh trai làm việc ở Bắc Kinh.', keys: ['anh', 'làm việc|làm', 'bắc kinh'] },
        { zh: '我很爱我的家。', py: 'Wǒ hěn ài wǒ de jiā.', vi: 'Tôi rất yêu gia đình của tôi.', keys: ['rất', 'yêu|thương', 'nhà|gia đình'] }
      ]
    },
    {
      id: 'zh-r02',
      title: '今天的天气',
      titleVi: 'Thời tiết hôm nay',
      level: 'HSK1',
      sentences: [
        { zh: '今天天气很好。', py: 'Jīntiān tiānqì hěn hǎo.', vi: 'Hôm nay thời tiết rất đẹp.', keys: ['hôm nay', 'thời tiết|trời', 'đẹp|tốt'] },
        { zh: '不冷也不热。', py: 'Bù lěng yě bú rè.', vi: 'Không lạnh cũng không nóng.', keys: ['lạnh', 'nóng', 'không|chẳng'] },
        { zh: '我和朋友去公园。', py: 'Wǒ hé péngyou qù gōngyuán.', vi: 'Tôi và bạn đi công viên.', keys: ['bạn', 'đi|tới|đến', 'công viên'] },
        { zh: '我们在公园喝茶。', py: 'Wǒmen zài gōngyuán hē chá.', vi: 'Chúng tôi uống trà ở công viên.', keys: ['chúng tôi|chúng mình|bọn tôi|chúng ta', 'uống', 'trà'] },
        { zh: '明天会下雨吗？', py: 'Míngtiān huì xià yǔ ma?', vi: 'Ngày mai có mưa không?', keys: ['ngày mai|mai', 'mưa', 'không'] }
      ]
    },
    {
      id: 'zh-r03',
      title: '在饭店',
      titleVi: 'Ở nhà hàng',
      level: 'HSK1',
      sentences: [
        { zh: '中午我想吃饭。', py: 'Zhōngwǔ wǒ xiǎng chī fàn.', vi: 'Buổi trưa tôi muốn ăn cơm.', keys: ['trưa', 'muốn', 'ăn'] },
        { zh: '我去学校前面的饭店。', py: 'Wǒ qù xuéxiào qiánmiàn de fàndiàn.', vi: 'Tôi đến nhà hàng ở phía trước trường.', keys: ['nhà hàng|quán ăn|tiệm ăn|quán cơm', 'trước', 'trường'] },
        { zh: '我要一个米饭和一杯茶。', py: 'Wǒ yào yí ge mǐfàn hé yì bēi chá.', vi: 'Tôi gọi một bát cơm và một cốc trà.', keys: ['gọi|muốn|lấy|cần', 'cơm', 'cốc|ly|chén', 'trà'] },
        { zh: '一共二十块钱。', py: 'Yígòng èrshí kuài qián.', vi: 'Tổng cộng hai mươi tệ.', keys: ['tổng cộng|tất cả|hết', 'hai mươi|20', 'tệ|đồng|tiền'] },
        { zh: '菜很好吃，我很高兴。', py: 'Cài hěn hǎochī, wǒ hěn gāoxìng.', vi: 'Món ăn rất ngon, tôi rất vui.', keys: ['món|đồ ăn|thức ăn|thức ăn|rau', 'ngon', 'vui'] }
      ]
    },
    {
      id: 'zh-r04',
      title: '我的朋友',
      titleVi: 'Bạn của tôi',
      level: 'HSK1',
      sentences: [
        { zh: '我的朋友叫小月。', py: 'Wǒ de péngyou jiào Xiǎo Yuè.', vi: 'Bạn tôi tên là Tiểu Nguyệt.', keys: ['bạn', 'tên|gọi', 'nguyệt|tiểu nguyệt|xiao yue'] },
        { zh: '她是中国人，今年二十岁。', py: 'Tā shì Zhōngguó rén, jīnnián èrshí suì.', vi: 'Cô ấy là người Trung Quốc, năm nay hai mươi tuổi.', keys: ['trung quốc', 'năm nay', 'hai mươi|20', 'tuổi'] },
        { zh: '她会说汉语，也会说一点儿越南语。', py: 'Tā huì shuō Hànyǔ, yě huì shuō yìdiǎnr Yuènányǔ.', vi: 'Cô ấy biết nói tiếng Trung, cũng biết nói một chút tiếng Việt.', keys: ['nói', 'tiếng trung|tiếng hán|tiếng hoa', 'một chút|một ít|chút', 'tiếng việt'] },
        { zh: '星期六我们一起看电影。', py: 'Xīngqīliù wǒmen yìqǐ kàn diànyǐng.', vi: 'Thứ bảy chúng tôi cùng nhau xem phim.', keys: ['thứ bảy|thứ 7', 'cùng|với nhau', 'xem', 'phim'] },
        { zh: '我很喜欢和她说话。', py: 'Wǒ hěn xǐhuan hé tā shuōhuà.', vi: 'Tôi rất thích nói chuyện với cô ấy.', keys: ['thích', 'nói chuyện|trò chuyện|tán gẫu'] }
      ]
    },
    {
      id: 'zh-r05',
      title: '买东西',
      titleVi: 'Đi mua đồ',
      level: 'HSK1',
      sentences: [
        { zh: '今天下午我去商店买东西。', py: 'Jīntiān xiàwǔ wǒ qù shāngdiàn mǎi dōngxi.', vi: 'Chiều nay tôi đi cửa hàng mua đồ.', keys: ['chiều', 'cửa hàng|tiệm|siêu thị|shop', 'mua', 'đồ'] },
        { zh: '我想买一些水果。', py: 'Wǒ xiǎng mǎi yìxiē shuǐguǒ.', vi: 'Tôi muốn mua một ít hoa quả.', keys: ['muốn', 'mua', 'trái cây|hoa quả'] },
        { zh: '苹果多少钱一斤？', py: 'Píngguǒ duōshao qián yì jīn?', vi: 'Táo bao nhiêu tiền một cân?', keys: ['táo', 'bao nhiêu|mấy', 'cân|ký|nửa ký'] },
        { zh: '三块钱一斤，不太贵。', py: 'Sān kuài qián yì jīn, bú tài guì.', vi: 'Ba tệ một cân, không đắt lắm.', keys: ['ba|3', 'cân|ký', 'không đắt|không mắc|chẳng đắt|rẻ|không quá đắt'] },
        { zh: '我买了两斤苹果。', py: 'Wǒ mǎi le liǎng jīn píngguǒ.', vi: 'Tôi đã mua hai cân táo.', keys: ['mua', 'hai|2', 'táo'] }
      ]
    },
    {
      id: 'zh-r06',
      title: '我的一天',
      titleVi: 'Một ngày của tôi',
      level: 'HSK1',
      sentences: [
        { zh: '我每天七点起床。', py: 'Wǒ měi tiān qī diǎn qǐchuáng.', vi: 'Mỗi ngày tôi dậy lúc bảy giờ.', keys: ['mỗi ngày|hằng ngày|hàng ngày', 'bảy giờ|7 giờ', 'dậy|thức dậy'] },
        { zh: '八点我坐出租车去学校。', py: 'Bā diǎn wǒ zuò chūzūchē qù xuéxiào.', vi: 'Tám giờ tôi đi taxi đến trường.', keys: ['tám giờ|8 giờ', 'taxi|tắc xi|xe', 'trường'] },
        { zh: '上午我在学校学习汉语。', py: 'Shàngwǔ wǒ zài xuéxiào xuéxí Hànyǔ.', vi: 'Buổi sáng tôi học tiếng Trung ở trường.', keys: ['sáng', 'học', 'tiếng trung|tiếng hán|tiếng hoa'] },
        { zh: '晚上我在家看书、看电视。', py: 'Wǎnshang wǒ zài jiā kàn shū, kàn diànshì.', vi: 'Buổi tối tôi ở nhà đọc sách, xem tivi.', keys: ['tối', 'nhà', 'sách', 'tivi|ti vi|truyền hình'] },
        { zh: '十一点我睡觉。', py: 'Shíyī diǎn wǒ shuìjiào.', vi: 'Mười một giờ tôi đi ngủ.', keys: ['mười một|11', 'ngủ'] }
      ]
    }
  ];

  if (typeof module !== 'undefined' && module.exports) module.exports = root.READING_ZH;
})();
