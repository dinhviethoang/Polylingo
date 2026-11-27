/**
 * tests/games.test.js
 * Kiểm tra các hàm thuần của phân hệ Mini-Game Tiếng Trung bằng Node.js thuần.
 */

const assert = require('assert');
const {
  stripTones,
  matchPinyinLoose,
  pickDistractors,
  scoreCombo,
  calculateGameRewards,
  convertPinyinNumbersToMarks,
  MiniGames
} = require('../games.js');

let testCount = 0;

function it(name, fn) {
  try {
    fn();
    testCount++;
  } catch (err) {
    console.error(`✗ LỖI: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// -----------------------------------------------------------------------------
// 1. stripTones(py)
// -----------------------------------------------------------------------------
it('stripTones: Loại bỏ dấu thanh chuẩn Pinyin', () => {
  assert.strictEqual(stripTones('nǐ hǎo'), 'ni hao');
  assert.strictEqual(stripTones('xièxie'), 'xiexie');
  assert.strictEqual(stripTones('zhōngguó'), 'zhongguo');
  assert.strictEqual(stripTones('wǒ'), 'wo');
  assert.strictEqual(stripTones('hǎo'), 'hao');
});

it('stripTones: Loại bỏ số thanh (1-5)', () => {
  assert.strictEqual(stripTones('ni3 hao3'), 'ni hao');
  assert.strictEqual(stripTones('ni3hao3'), 'nihao');
  assert.strictEqual(stripTones('xie4xie5'), 'xiexie');
});

it('stripTones: Giữ nguyên âm ü khi bỏ dấu', () => {
  assert.strictEqual(stripTones('lǜ'), 'lü');
});

it('stripTones: Xử lý chuỗi rỗng và giá trị không hợp lệ', () => {
  assert.strictEqual(stripTones(''), '');
  assert.strictEqual(stripTones(null), '');
  assert.strictEqual(stripTones(undefined), '');
});

// -----------------------------------------------------------------------------
// 2. convertPinyinNumbersToMarks(str)
// -----------------------------------------------------------------------------
it('convertPinyinNumbersToMarks: Chuyển đổi số thanh sang dấu thanh', () => {
  assert.strictEqual(convertPinyinNumbersToMarks('ni3hao3'), 'nǐhǎo');
  assert.strictEqual(convertPinyinNumbersToMarks('lv4'), 'lǜ');
  assert.strictEqual(convertPinyinNumbersToMarks('xie4xie'), 'xièxie');
});

// -----------------------------------------------------------------------------
// 3. matchPinyinLoose(input, py)
// -----------------------------------------------------------------------------
it('matchPinyinLoose: Khớp pinyin không dấu (nihao vs nǐ hǎo)', () => {
  assert.strictEqual(matchPinyinLoose('nihao', 'nǐ hǎo'), true);
  assert.strictEqual(matchPinyinLoose('ni hao', 'nǐ hǎo'), true);
  assert.strictEqual(matchPinyinLoose('xiexie', 'xièxie'), true);
});

it('matchPinyinLoose: Khớp pinyin có số thanh (ni3hao3, ni3 hao3 vs nǐ hǎo)', () => {
  assert.strictEqual(matchPinyinLoose('ni3hao3', 'nǐ hǎo'), true);
  assert.strictEqual(matchPinyinLoose('ni3 hao3', 'nǐ hǎo'), true);
  assert.strictEqual(matchPinyinLoose('xie4xie', 'xièxie'), true);
  assert.strictEqual(matchPinyinLoose('xie4xie5', 'xièxie'), true);
});

it('matchPinyinLoose: Khớp pinyin có dấu thanh trực tiếp', () => {
  assert.strictEqual(matchPinyinLoose('nǐ hǎo', 'nǐ hǎo'), true);
  assert.strictEqual(matchPinyinLoose('nǐhǎo', 'nǐ hǎo'), true);
  assert.strictEqual(matchPinyinLoose('xièxie', 'xièxie'), true);
});

it('matchPinyinLoose: Không phân biệt hoa thường', () => {
  assert.strictEqual(matchPinyinLoose('NiHao', 'nǐ hǎo'), true);
  assert.strictEqual(matchPinyinLoose('NǏ HǍO', 'nǐ hǎo'), true);
  assert.strictEqual(matchPinyinLoose('NI3HAO3', 'nǐ hǎo'), true);
});

it('matchPinyinLoose: Hỗ trợ ký tự ü qua v hoặc u:', () => {
  assert.strictEqual(matchPinyinLoose('lv', 'lǜ'), true);
  assert.strictEqual(matchPinyinLoose('lü', 'lǜ'), true);
  assert.strictEqual(matchPinyinLoose('lv4', 'lǜ'), true);
  assert.strictEqual(matchPinyinLoose('lu:4', 'lǜ'), true);
});

it('matchPinyinLoose: Từ chối nếu người dùng gõ sai thanh điệu chủ động', () => {
  // Đích là thanh 3 + thanh 3, người dùng gõ thanh 4 + thanh 4
  assert.strictEqual(matchPinyinLoose('ni4hao4', 'nǐ hǎo'), false);
  assert.strictEqual(matchPinyinLoose('lv2', 'lǜ'), false);
});

it('matchPinyinLoose: Từ chối nếu gõ sai từ', () => {
  assert.strictEqual(matchPinyinLoose('chao', 'nǐ hǎo'), false);
  assert.strictEqual(matchPinyinLoose('ta', 'nǐ hǎo'), false);
  assert.strictEqual(matchPinyinLoose('', 'nǐ hǎo'), false);
  assert.strictEqual(matchPinyinLoose(null, 'nǐ hǎo'), false);
});

// -----------------------------------------------------------------------------
// 4. pickDistractors(word, pool, n)
// -----------------------------------------------------------------------------
const mockPool = [
  { hanzi: '你好', pinyin: 'nǐ hǎo', vi: 'xin chào' },
  { hanzi: '谢谢', pinyin: 'xièxie', vi: 'cảm ơn' },
  { hanzi: '再见', pinyin: 'zàijiàn', vi: 'tạm biệt' },
  { hanzi: '不客气', pinyin: 'bù kèqi', vi: 'không có gì' },
  { hanzi: '对不起', pinyin: 'duìbuqǐ', vi: 'xin lỗi' },
  { hanzi: '我', pinyin: 'wǒ', vi: 'tôi' }
];

it('pickDistractors: Lấy đúng số lượng n từ gây nhiễu', () => {
  const distractors = pickDistractors(mockPool[0], mockPool, 3);
  assert.strictEqual(distractors.length, 3);
});

it('pickDistractors: Không chứa từ đích', () => {
  const target = mockPool[0];
  const distractors = pickDistractors(target, mockPool, 4);
  const containsTarget = distractors.some(d => d.hanzi === target.hanzi);
  assert.strictEqual(containsTarget, false);
});

it('pickDistractors: Không có phần tử trùng lặp trong kết quả', () => {
  const distractors = pickDistractors(mockPool[0], mockPool, 4);
  const set = new Set(distractors.map(d => d.hanzi));
  assert.strictEqual(set.size, distractors.length);
});

it('pickDistractors: Xử lý an toàn khi pool nhỏ hơn n', () => {
  const smallPool = [
    { hanzi: '你好', pinyin: 'nǐ hǎo', vi: 'xin chào' },
    { hanzi: '谢谢', pinyin: 'xièxie', vi: 'cảm ơn' }
  ];
  const distractors = pickDistractors(smallPool[0], smallPool, 5);
  assert.strictEqual(distractors.length, 1);
  assert.strictEqual(distractors[0].hanzi, '谢谢');
});

it('pickDistractors: Trả về mảng rỗng khi pool rỗng hoặc n <= 0', () => {
  assert.deepStrictEqual(pickDistractors(mockPool[0], [], 3), []);
  assert.deepStrictEqual(pickDistractors(mockPool[0], mockPool, 0), []);
});

// -----------------------------------------------------------------------------
// 5. scoreCombo(base, streak)
// -----------------------------------------------------------------------------
it('scoreCombo: Điểm cơ bản khi streak 0 hoặc 1', () => {
  assert.strictEqual(scoreCombo(10, 0), 10);
  assert.strictEqual(scoreCombo(10, 1), 10);
});

it('scoreCombo: Tăng điểm theo các mốc combo streak', () => {
  assert.strictEqual(scoreCombo(10, 2), 12);  // 1.2x
  assert.strictEqual(scoreCombo(10, 3), 12);  // 1.2x
  assert.strictEqual(scoreCombo(10, 4), 15);  // 1.5x
  assert.strictEqual(scoreCombo(10, 6), 15);  // 1.5x
  assert.strictEqual(scoreCombo(10, 7), 20);  // 2.0x
  assert.strictEqual(scoreCombo(10, 9), 20);  // 2.0x
  assert.strictEqual(scoreCombo(10, 10), 30); // 3.0x
  assert.strictEqual(scoreCombo(10, 15), 30); // 3.0x
});

it('scoreCombo: Xử lý an toàn khi tham số âm hoặc thiếu', () => {
  assert.strictEqual(scoreCombo(20, -1), 20);
  assert.strictEqual(scoreCombo(undefined, undefined), 10);
});

// -----------------------------------------------------------------------------
// 6. calculateGameRewards(score)
// -----------------------------------------------------------------------------
it('calculateGameRewards: Tính đúng Xu và XP theo điểm số', () => {
  // 120 điểm: coins = floor(120/10) = 12, xp = floor(120/5) = 24
  const r1 = calculateGameRewards(120);
  assert.strictEqual(r1.coins, 12);
  assert.strictEqual(r1.xp, 24);

  // 0 điểm
  const r0 = calculateGameRewards(0);
  assert.strictEqual(r0.coins, 0);
  assert.strictEqual(r0.xp, 0);
});

it('calculateGameRewards: Giới hạn trần thưởng tối đa 30 coins và 40 xp', () => {
  const rMax = calculateGameRewards(500);
  assert.strictEqual(rMax.coins, 30);
  assert.strictEqual(rMax.xp, 40);
});

// -----------------------------------------------------------------------------
// 7. MiniGames API Interface
// -----------------------------------------------------------------------------
it('MiniGames: Cung cấp đầy đủ interface mount, onShow, onHide', () => {
  assert.strictEqual(typeof MiniGames.mount, 'function');
  assert.strictEqual(typeof MiniGames.onShow, 'function');
  assert.strictEqual(typeof MiniGames.onHide, 'function');
});

// In ra kết quả kiểm tra theo quy định "OK n tests"
console.log(`OK ${testCount} tests`);
