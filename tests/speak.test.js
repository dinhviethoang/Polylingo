/**
 * tests/speak.test.js
 * Unit tests cho module Luyện phát âm tiếng Trung (speak.js).
 * Chạy bằng node thuần: node tests/speak.test.js
 * In ra: "OK n tests" khi thành công.
 */

const assert = require('assert');
const {
  normalizeHanzi,
  scoreRecognition,
  scoreEnglishRecognition,
  expandEnglishContractions,
  getStressSyllableFromIpa,
  splitEnglishWordSyllables,
  formatWordWithStress,
  getEnglishPronunciationAdvice,
  TONE_INFO,
  TONE_PAIRS,
  SINGLE_TONE_DRILL,
  CONFUSING_GROUPS
} = require('../speak.js');

let testCount = 0;

function runTest(name, fn) {
  try {
    fn();
    testCount++;
    // console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ THẤT BẠI: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// ============================================================================
// 1. Kiểm tra hàm thuần normalizeHanzi(s)
// ============================================================================

runTest('normalizeHanzi: Bỏ dấu câu tiếng Trung (，。！？、“”‘’)', () => {
  const input = '你好，世界！“谢谢”。';
  const expected = '你好世界谢谢';
  assert.strictEqual(normalizeHanzi(input), expected);
});

runTest('normalizeHanzi: Bỏ dấu câu quốc tế và khoảng trắng (.,!?:; -)', () => {
  const input = '  Nǐ hǎo! How are you? -- OK. ';
  const expected = 'NǐhǎoHowareyouOK';
  assert.strictEqual(normalizeHanzi(input), expected);
});

runTest('normalizeHanzi: Xử lý chuỗi rỗng và giá trị null/undefined', () => {
  assert.strictEqual(normalizeHanzi(''), '');
  assert.strictEqual(normalizeHanzi(null), '');
  assert.strictEqual(normalizeHanzi(undefined), '');
});

runTest('normalizeHanzi: Giữ nguyên chuỗi chữ Hán không chứa dấu câu', () => {
  const input = '我是中国留学生';
  assert.strictEqual(normalizeHanzi(input), '我是中国留学生');
});

// ============================================================================
// 2. Kiểm tra hàm thuần scoreRecognition(target, transcripts)
// ============================================================================

runTest('scoreRecognition: Đúng hết 100% (cùng chữ, không dấu câu)', () => {
  const res = scoreRecognition('你好', ['你好']);
  assert.strictEqual(res.score, 100);
  assert.strictEqual(res.best, '你好');
  assert.strictEqual(res.perChar.length, 2);
  assert.strictEqual(res.perChar[0].ok, true);
  assert.strictEqual(res.perChar[1].ok, true);
});

runTest('scoreRecognition: Có dấu câu ở target hoặc transcript (bỏ qua dấu câu)', () => {
  const res = scoreRecognition('你好，我叫李明！', ['你好我叫李明']);
  assert.strictEqual(res.score, 100);
  assert.strictEqual(res.perChar.length, 6);
  assert.strictEqual(res.perChar.every(c => c.ok), true);
});

runTest('scoreRecognition: Sai 1 chữ trong câu 3 chữ (tính đúng tỉ lệ %)', () => {
  // Target: "谢谢你" (3 chữ), máy nhận: "谢谢" (2/3 chữ đúng) -> 67%
  const res = scoreRecognition('谢谢你', ['谢谢']);
  assert.strictEqual(res.score, 67);
  assert.strictEqual(res.perChar.length, 3);
  assert.strictEqual(res.perChar[0].ok, true);
  assert.strictEqual(res.perChar[1].ok, true);
  assert.strictEqual(res.perChar[2].ok, false);
});

runTest('scoreRecognition: Sai 1 chữ ở giữa câu 4 chữ (75%)', () => {
  // Target: "我是学生", Máy nhận: "我不是生" -> 我 (ok), 是 (fail), 学 (fail), 生 (ok)
  // hoặc transcript: "我是老师" -> 我 (ok), 是 (ok), 2 chữ sau fail -> 50%
  const res = scoreRecognition('我是学生', ['我是老师']);
  assert.strictEqual(res.score, 50);
  assert.strictEqual(res.perChar[0].ok, true);
  assert.strictEqual(res.perChar[1].ok, true);
  assert.strictEqual(res.perChar[2].ok, false);
  assert.strictEqual(res.perChar[3].ok, false);
});

runTest('scoreRecognition: Nhiều alternatives - chọn kết quả có điểm cao nhất', () => {
  const alternatives = ['您好', '你好', '泥蒿'];
  const res = scoreRecognition('你好', alternatives);
  // '您好' (50%), '你好' (100%), '泥蒿' (0%) -> phải chọn '你好' (100%)
  assert.strictEqual(res.score, 100);
  assert.strictEqual(res.best, '你好');
  assert.strictEqual(res.perChar.every(c => c.ok), true);
});

runTest('scoreRecognition: Xử lý mảng transcript chứa object {transcript}', () => {
  const alternatives = [
    { transcript: '今天天气' },
    { transcript: '今天天气很好' }
  ];
  const res = scoreRecognition('今天天气很好', alternatives);
  assert.strictEqual(res.score, 100);
  assert.strictEqual(res.best, '今天天气很好');
});

runTest('scoreRecognition: Danh sách transcript rỗng []', () => {
  const res = scoreRecognition('你好', []);
  assert.strictEqual(res.score, 0);
  assert.strictEqual(res.best, '');
  assert.strictEqual(res.perChar.length, 2);
  assert.strictEqual(res.perChar.every(c => c.ok === false), true);
});

runTest('scoreRecognition: Target rỗng ""', () => {
  const res = scoreRecognition('', ['你好']);
  assert.strictEqual(res.score, 0);
  assert.strictEqual(res.best, '');
  assert.strictEqual(res.perChar.length, 0);
});

runTest('scoreRecognition: Hoàn toàn sai (0%)', () => {
  const res = scoreRecognition('苹果', ['香蕉']);
  assert.strictEqual(res.score, 0);
  assert.strictEqual(res.perChar.every(c => c.ok === false), true);
});

runTest('scoreRecognition: Người nói thêm từ thừa vẫn khớp được các chữ đích đúng', () => {
  // Target: "你好", Máy nhận: "你好啊" -> match '你', '好'
  const res = scoreRecognition('你好', ['你好啊']);
  assert.strictEqual(res.score, 100);
  assert.strictEqual(res.perChar[0].ok, true);
  assert.strictEqual(res.perChar[1].ok, true);
});

// ============================================================================
// 3. Kiểm tra cấu trúc dữ liệu cốt lõi (Tones, 16 Cặp Thanh & Âm Dễ Nhầm)
// ============================================================================

runTest('TONE_INFO: Đủ 4 thanh với cao độ chuẩn 55, 35, 214, 51', () => {
  assert.strictEqual(TONE_INFO.length, 4);
  assert.strictEqual(TONE_INFO[0].pitch, '55');
  assert.strictEqual(TONE_INFO[1].pitch, '35');
  assert.strictEqual(TONE_INFO[2].pitch, '214');
  assert.strictEqual(TONE_INFO[3].pitch, '51');
});

runTest('TONE_PAIRS: Đủ 16 tổ hợp cặp thanh 2 âm tiết', () => {
  assert.strictEqual(TONE_PAIRS.length, 16);
  const expectedCombos = [
    '1-1', '1-2', '1-3', '1-4',
    '2-1', '2-2', '2-3', '2-4',
    '3-1', '3-2', '3-3', '3-4',
    '4-1', '4-2', '4-3', '4-4'
  ];
  expectedCombos.forEach(c => {
    const found = TONE_PAIRS.find(p => p.combo === c);
    assert.ok(found, `Thiếu tổ hợp ${c}`);
    assert.ok(found.words.length > 0, `Tổ hợp ${c} không có từ mẫu`);
  });
});

runTest('CONFUSING_GROUPS: Có đủ các nhóm tối thiểu theo đề bài', () => {
  const groupIds = CONFUSING_GROUPS.map(g => g.id);
  assert.ok(groupIds.includes('zh-z-j'), 'Thiếu nhóm zh/z/j');
  assert.ok(groupIds.includes('ch-c-q'), 'Thiếu nhóm ch/c/q');
  assert.ok(groupIds.includes('sh-s-x'), 'Thiếu nhóm sh/s/x');
  assert.ok(groupIds.includes('r-l'), 'Thiếu nhóm r/l');
  assert.ok(groupIds.includes('u-u_dots'), 'Thiếu nhóm ü/u');
  assert.ok(groupIds.includes('an-ang'), 'Thiếu nhóm an/ang');
  assert.ok(groupIds.includes('en-eng'), 'Thiếu nhóm en/eng');
  assert.ok(groupIds.includes('in-ing'), 'Thiếu nhóm in/ing');
  assert.ok(groupIds.includes('aspiration'), 'Thiếu nhóm bật hơi b-p, d-t, g-k');
});

// ============================================================================
// 4. Kiểm tra phát âm tiếng Anh (English Pronunciation & Phonetics)
// ============================================================================

runTest('getStressSyllableFromIpa: Xác định chính xác âm tiết nhấn từ IPA', () => {
  assert.strictEqual(getStressSyllableFromIpa('/ˈmɔːrnɪŋ/'), 1);
  assert.strictEqual(getStressSyllableFromIpa('/həˈloʊ/'), 2);
  assert.strictEqual(getStressSyllableFromIpa('/ˌæftərˈnuːn/'), 3);
  assert.strictEqual(getStressSyllableFromIpa('/ˈbjuːtɪfl/'), 1);
  assert.strictEqual(getStressSyllableFromIpa('/dɪˈlɪʃəs/'), 2);
  assert.strictEqual(getStressSyllableFromIpa('/ˌjuːnɪˈvɜːrsəti/'), 3);
  assert.strictEqual(getStressSyllableFromIpa('/ɪkˈspensɪv/'), 2);
  assert.strictEqual(getStressSyllableFromIpa('/ˌʌndərˈstænd/'), 3);
});

runTest('splitEnglishWordSyllables & formatWordWithStress: Hiển thị từ chia âm tiết đúng chuẩn', () => {
  const syls = splitEnglishWordSyllables('beautiful');
  assert.deepStrictEqual(syls, ['beau', 'ti', 'ful']);
  assert.strictEqual(formatWordWithStress(syls, 1), 'BEAU·ti·ful');
  assert.strictEqual(formatWordWithStress(syls, 2), 'beau·TI·ful');
  assert.strictEqual(formatWordWithStress(syls, 3), 'beau·ti·FUL');

  const sylsTomorrow = splitEnglishWordSyllables('tomorrow');
  assert.deepStrictEqual(sylsTomorrow, ['to', 'mor', 'row']);
  assert.strictEqual(formatWordWithStress(sylsTomorrow, 2), 'to·MOR·row');
});

runTest('scoreEnglishRecognition: So khớp câu tiếng Anh chấp nhận rút gọn và bỏ dấu câu', () => {
  const res1 = scoreEnglishRecognition("I'm a student.", ['i am a student']);
  assert.strictEqual(res1.score, 100);
  assert.ok(res1.perWord.every(w => w.ok));

  const res2 = scoreEnglishRecognition("Don't worry, they're ready!", ['do not worry they are ready']);
  assert.strictEqual(res2.score, 100);
  assert.ok(res2.perWord.every(w => w.ok));
});

runTest('scoreEnglishRecognition: Phát hiện thiếu âm cuối (ending sounds)', () => {
  const res1 = scoreEnglishRecognition('He likes books', ['he like book']);
  assert.ok(res1.advice.includes('âm cuối') || res1.advice.includes('ending sounds'));

  const res2 = scoreEnglishRecognition('She wanted to eat', ['she want to eat']);
  assert.ok(res2.advice.includes('âm cuối') || res2.advice.includes('ending sounds') || res2.advice.includes('-ed'));
});

runTest('scoreEnglishRecognition: Phát hiện lỗi /θ/ /ð/ thành t/d/s/z, /ʃ/ vs /s/, /r/ vs /l/', () => {
  // /θ/ hoặc /ð/ thành t/d/s/z
  const res1 = scoreEnglishRecognition('I think this is good', ['i tink dis is good']);
  assert.ok(res1.advice.includes('/θ/') || res1.advice.includes('th'));

  // /ʃ/ vs /s/
  const res2 = scoreEnglishRecognition('She sells shells', ['see sells sells']);
  assert.ok(res2.advice.includes('/ʃ/') || res2.advice.includes('sh'));

  // /r/ vs /l/
  const res3 = scoreEnglishRecognition('A red river', ['a led liver']);
  assert.ok(res3.advice.includes('/r/') || res3.advice.includes('/l/'));
});

runTest('Cấu trúc dữ liệu & logic Âm dễ nhầm tiếng Anh (Minimal Pairs & Final Sounds)', () => {
  if (typeof window === 'undefined') global.window = global;
  require('../data/en/phonics.js');
  const phonics = window.EN_PHONICS;
  assert.ok(phonics, 'Thiếu dữ liệu EN_PHONICS');
  assert.ok(Array.isArray(phonics.minimalPairs) && phonics.minimalPairs.length >= 20, 'Cần ít nhất 20 cặp âm tối thiểu');
  assert.ok(phonics.finalSounds && phonics.finalSounds.s_z_iz && phonics.finalSounds.t_d_id, 'Thiếu quy tắc âm cuối');
  assert.strictEqual(phonics.finalSounds.s_z_iz.rules.length, 3, 'Đuôi -s/-es phải có 3 trường hợp /s/, /z/, /ɪz/');
  assert.strictEqual(phonics.finalSounds.t_d_id.rules.length, 3, 'Đuôi -ed phải có 3 trường hợp /t/, /d/, /ɪd/');
});

// Kết quả in theo quy ước "OK n tests"
console.log(`OK ${testCount} tests`);
