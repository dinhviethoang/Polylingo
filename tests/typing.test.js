/**
 * tests/typing.test.js
 * Test suite kiểm tra các hàm thuần của tính năng Luyện gõ Pinyin (chạy bằng node thuần).
 */

const assert = require('assert');
const {
  convertPinyinNumbersToMarks,
  markSyllable,
  extractBaseAndTone,
  segmentPinyinWord,
  splitTargetPinyin,
  tokenizeInput,
  compareSyllable,
  compareInputToTarget
} = require('../typing.js');

let passCount = 0;
let failCount = 0;

function test(name, fn) {
  try {
    fn();
    passCount++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failCount++;
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
  }
}

console.log('=== BẮT ĐẦU KIỂM TRA TYPING PRACTICE ===\n');

// 1. Kiểm tra chuyển số -> dấu thanh theo yêu cầu đề bài
console.log('1. Kiểm tra chuyển số -> dấu thanh (convertPinyinNumbersToMarks):');

test('ni3 -> nǐ', () => {
  assert.strictEqual(convertPinyinNumbersToMarks('ni3'), 'nǐ');
});

test('hao3 -> hǎo', () => {
  assert.strictEqual(convertPinyinNumbersToMarks('hao3'), 'hǎo');
});

test('lv4 -> lǜ (v -> ü)', () => {
  assert.strictEqual(convertPinyinNumbersToMarks('lv4'), 'lǜ');
});

test('xie4xie5 -> xièxie (thanh 5 là thanh nhẹ)', () => {
  assert.strictEqual(convertPinyinNumbersToMarks('xie4xie5'), 'xièxie');
});

test('gui4 -> guì (ui đặt dấu ở i)', () => {
  assert.strictEqual(convertPinyinNumbersToMarks('gui4'), 'guì');
});

test('liu2 -> liú (iu đặt dấu ở u)', () => {
  assert.strictEqual(convertPinyinNumbersToMarks('liu2'), 'liú');
});

test('zhong1guo2 -> zhōngguó', () => {
  assert.strictEqual(convertPinyinNumbersToMarks('zhong1guo2'), 'zhōngguó');
});

test('lu:4 -> lǜ (u: -> ü)', () => {
  assert.strictEqual(convertPinyinNumbersToMarks('lu:4'), 'lǜ');
});

test('Giữ nguyên hoa thường: Ni3 Hao3 -> Nǐ Hǎo', () => {
  assert.strictEqual(convertPinyinNumbersToMarks('Ni3 Hao3'), 'Nǐ Hǎo');
});

// 2. Kiểm tra so sánh âm tiết (compareSyllable): đúng / sai thanh / sai chữ
console.log('\n2. Kiểm tra hàm so sánh âm tiết (compareSyllable):');

// Chế độ 'tone_mark'
test('tone_mark: Đúng âm tiết và đúng thanh (nǐ vs nǐ)', () => {
  const res = compareSyllable('nǐ', 'nǐ', 'tone_mark');
  assert.strictEqual(res.status, 'correct');
});

test('tone_mark: Sai thanh điệu (ní vs nǐ -> sai thanh)', () => {
  const res = compareSyllable('ní', 'nǐ', 'tone_mark');
  assert.strictEqual(res.status, 'wrong_tone');
  assert.strictEqual(res.reason, 'sai thanh');
});

test('tone_mark: Quên thanh điệu (ni vs nǐ -> sai thanh)', () => {
  const res = compareSyllable('ni', 'nǐ', 'tone_mark');
  assert.strictEqual(res.status, 'wrong_tone');
  assert.strictEqual(res.reason, 'sai thanh');
});

test('tone_mark: Sai chữ cái (ta vs nǐ -> sai chữ)', () => {
  const res = compareSyllable('ta', 'nǐ', 'tone_mark');
  assert.strictEqual(res.status, 'wrong');
  assert.strictEqual(res.reason, 'sai chữ');
});

// Chế độ 'tone_num'
test('tone_num: Đúng số thanh (ni3 vs nǐ)', () => {
  const res = compareSyllable('ni3', 'nǐ', 'tone_num');
  assert.strictEqual(res.status, 'correct');
});

test('tone_num: Sai số thanh (ni2 vs nǐ -> sai thanh)', () => {
  const res = compareSyllable('ni2', 'nǐ', 'tone_num');
  assert.strictEqual(res.status, 'wrong_tone');
  assert.strictEqual(res.reason, 'sai thanh');
});

test('tone_num: Quên số thanh (ni vs nǐ -> sai thanh)', () => {
  const res = compareSyllable('ni', 'nǐ', 'tone_num');
  assert.strictEqual(res.status, 'wrong_tone');
  assert.strictEqual(res.reason, 'sai thanh');
});

test('tone_num: Sai chữ cái (ha3 vs nǐ -> sai chữ)', () => {
  const res = compareSyllable('ha3', 'nǐ', 'tone_num');
  assert.strictEqual(res.status, 'wrong');
  assert.strictEqual(res.reason, 'sai chữ');
});

test('tone_num: Thanh nhẹ số 5 hoặc không số (xie5 vs xie và xie vs xie)', () => {
  const res1 = compareSyllable('xie5', 'xie', 'tone_num');
  assert.strictEqual(res1.status, 'correct');
  const res2 = compareSyllable('xie', 'xie', 'tone_num');
  assert.strictEqual(res2.status, 'correct');
});

test('tone_num: ü = v = u: (lv4 vs lǜ và lu:4 vs lǜ)', () => {
  const res1 = compareSyllable('lv4', 'lǜ', 'tone_num');
  assert.strictEqual(res1.status, 'correct');
  const res2 = compareSyllable('lu:4', 'lǜ', 'tone_num');
  assert.strictEqual(res2.status, 'correct');
});

// Chế độ 'no_tone'
test('no_tone: Bỏ qua thanh, chỉ kiểm tra chữ cái đúng (ni vs nǐ)', () => {
  const res = compareSyllable('ni', 'nǐ', 'no_tone');
  assert.strictEqual(res.status, 'correct');
});

test('no_tone: Chữ cái sai (hao vs nǐ -> sai chữ)', () => {
  const res = compareSyllable('hao', 'nǐ', 'no_tone');
  assert.strictEqual(res.status, 'wrong');
  assert.strictEqual(res.reason, 'sai chữ');
});

// 3. Kiểm tra tách từ ghép & câu (segmentPinyinWord & compareInputToTarget)
console.log('\n3. Kiểm tra tách từ ghép và so sánh câu:');

test('Tách từ ghép pinyin: xièxie -> [xiè, xie]', () => {
  const segs = segmentPinyinWord('xièxie');
  assert.deepStrictEqual(segs, ['xiè', 'xie']);
});

test('Tách từ ghép pinyin: duìbuqǐ -> [duì, bu, qǐ]', () => {
  const segs = segmentPinyinWord('duìbuqǐ');
  assert.deepStrictEqual(segs, ['duì', 'bu', 'qǐ']);
});

test('Tách từ có âm đầu đặc biệt: fànguǎn -> [fàn, guǎn]', () => {
  const segs = segmentPinyinWord('fànguǎn');
  assert.deepStrictEqual(segs, ['fàn', 'guǎn']);
});

test('compareInputToTarget: Gõ đúng toàn bộ từ 2 âm tiết (nǐ hǎo)', () => {
  const res = compareInputToTarget('nǐ hǎo', 'nǐ hǎo', 'tone_mark', '你好');
  assert.strictEqual(res.isAllCorrect, true);
  assert.strictEqual(res.results.length, 2);
  assert.strictEqual(res.results[0].status, 'correct');
  assert.strictEqual(res.results[1].status, 'correct');
});

test('compareInputToTarget: Gõ sai thanh âm tiết thứ hai (nǐ hao)', () => {
  const res = compareInputToTarget('nǐ hao', 'nǐ hǎo', 'tone_mark', '你好');
  assert.strictEqual(res.isAllCorrect, false);
  assert.strictEqual(res.results[0].status, 'correct');
  assert.strictEqual(res.results[1].status, 'wrong_tone');
  assert.strictEqual(res.results[1].reason, 'sai thanh');
});

test('compareInputToTarget: Gõ câu có dấu câu và hoa thường (Bỏ qua hoa thường & dấu câu)', () => {
  const res = compareInputToTarget('Nǐ hǎo, xièxie!', 'nǐ hǎo xièxie', 'tone_mark', '你好谢谢');
  assert.strictEqual(res.isAllCorrect, true);
});

// Tổng kết
console.log(`\n=== KẾT QUẢ KIỂM TRA: ${passCount} PASSED, ${failCount} FAILED ===`);
if (failCount > 0) {
  process.exit(1);
} else {
  console.log('Tất cả test cases đã VƯỢT QUA thành công!\n');
}
