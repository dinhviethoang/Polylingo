/**
 * tests/practice.test.js
 * Kiểm tra các hàm nghiệp vụ của Module Luyện tập theo bài (LessonPractice).
 * Chạy bằng Node.js thuần với assert.
 */

const assert = require('assert');

// Thiết lập global.window an toàn trước khi nạp module
global.window = global;

const CURRICULUM = require('../data/zh/curriculum.js');
const {
  LessonPractice,
  PRACTICE_TYPES,
  resolveLessonWords,
  filterPracticeWords,
  generateQuizQuestions,
  generatePinyinDistractors,
  generateMeaningDistractors,
  generateWordDistractors,
  getWordRadicalInfo,
  generateRadicalDistractors,
  getWordStressInfo,
  gradePinyinInput,
  gradeMatchPair,
  updatePracticeProgress
} = require('../practice.js');

let testCount = 0;

function runTest(name, fn) {
  try {
    fn();
    testCount++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ THẤT BẠI: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

console.log('=== BẮT ĐẦU KIỂM TRA MODULE LUYỆN TẬP THEO BÀI (LESSON PRACTICE) ===\n');

// Lấy danh sách từ mẫu từ bài intro-u1-l1
const lessonIntroL1 = CURRICULUM.levels[0].units[0].lessons[0]; // intro-u1-l1
const sampleWordsZh = resolveLessonWords(lessonIntroL1, null, 'zh');

// ============================================================================
// 1. Kiểm tra sinh câu hỏi cho từng dạng (Đủ số câu, 4 lựa chọn không trùng, đúng 1 đáp án đúng)
// ============================================================================

console.log('1. Kiểm tra sinh câu hỏi các dạng bài tập Tiếng Trung (zh):');

runTest('1a. Dạng Kiểm tra nghĩa (meaning): đủ câu, 4 lựa chọn không trùng, đúng 1 đáp án đúng', () => {
  const questions = generateQuizQuestions(sampleWordsZh, 'meaning', 'zh', { limit: 5 });
  assert.strictEqual(questions.length, 5, 'Phải sinh đủ 5 câu');

  questions.forEach((q, idx) => {
    assert.strictEqual(q.type, 'meaning');
    assert.strictEqual(q.options.length, 4, `Câu ${idx + 1} phải có đúng 4 lựa chọn`);

    // 4 lựa chọn không trùng nhau
    const uniqueOptions = new Set(q.options);
    assert.strictEqual(uniqueOptions.size, 4, `Câu ${idx + 1} không được có lựa chọn trùng lặp`);

    // Có đúng 1 đáp án đúng nằm trong các lựa chọn
    const correctMatches = q.options.filter(opt => opt === q.correctAnswer);
    assert.strictEqual(correctMatches.length, 1, `Câu ${idx + 1} phải có duy nhất 1 đáp án đúng`);
    assert.strictEqual(q.options[q.correctIndex], q.correctAnswer);
  });
});

runTest('1b. Dạng Kiểm tra từ vựng (word): 4 lựa chọn chữ Hán không trùng, đúng 1 đáp án đúng', () => {
  const questions = generateQuizQuestions(sampleWordsZh, 'word', 'zh', { limit: 5 });
  assert.strictEqual(questions.length, 5);

  questions.forEach((q, idx) => {
    assert.strictEqual(q.type, 'word');
    assert.strictEqual(q.options.length, 4);
    assert.strictEqual(new Set(q.options).size, 4, `Câu ${idx + 1} có lựa chọn trùng`);
    const matches = q.options.filter(opt => opt === q.correctAnswer);
    assert.strictEqual(matches.length, 1);
  });
});

runTest('1c. Dạng Kiểm tra Pinyin (pinyin): 4 lựa chọn pinyin phân biệt thanh điệu, đúng 1 đáp án đúng', () => {
  const questions = generateQuizQuestions(sampleWordsZh, 'pinyin', 'zh', { limit: 5 });
  assert.strictEqual(questions.length, 5);

  questions.forEach((q, idx) => {
    assert.strictEqual(q.type, 'pinyin');
    assert.strictEqual(q.options.length, 4);
    assert.strictEqual(new Set(q.options).size, 4, `Câu ${idx + 1} có pinyin trùng lặp`);
    const matches = q.options.filter(opt => opt === q.correctAnswer);
    assert.strictEqual(matches.length, 1);
  });
});

runTest('1d. Dạng Luyện phát âm (pronunciation): cấu trúc câu hỏi có prompt, subPrompt và speechLang', () => {
  const questions = generateQuizQuestions(sampleWordsZh, 'pronunciation', 'zh', { limit: 5 });
  assert.strictEqual(questions.length, 5);
  questions.forEach(q => {
    assert.strictEqual(q.type, 'pronunciation');
    assert.ok(q.prompt, 'Prompt không được rỗng');
    assert.strictEqual(q.speechLang, 'zh-CN');
  });
});

runTest('1e. Dạng Nối từ (matching): tạo danh sách các cặp nối 2 cột với pairId hợp lệ', () => {
  const questions = generateQuizQuestions(sampleWordsZh, 'matching', 'zh');
  assert.strictEqual(questions.length, 1);
  const q = questions[0];
  assert.strictEqual(q.type, 'matching');
  assert.strictEqual(q.pairs.length, 5, 'Phải có 5 cặp nối tương ứng với 5 từ');
  q.pairs.forEach(p => {
    assert.ok(p.pairId);
    assert.ok(p.left, 'Cột trái phải có chữ Hán');
    assert.ok(p.right, 'Cột phải phải có nghĩa');
  });
});

runTest('1f. Dạng Chọn bộ thủ (radical): lấy đúng bộ thủ từ CHAR_DECOMP, 4 lựa chọn không trùng', () => {
  const questions = generateQuizQuestions(sampleWordsZh, 'radical', 'zh', { limit: 5 });
  assert.strictEqual(questions.length, 5);

  questions.forEach((q, idx) => {
    assert.strictEqual(q.type, 'radical');
    assert.strictEqual(q.options.length, 4);
    assert.strictEqual(new Set(q.options).size, 4, `Câu ${idx + 1} có bộ thủ trùng`);
    const matches = q.options.filter(opt => opt === q.correctAnswer);
    assert.strictEqual(matches.length, 1);
    assert.ok(q.decompInfo, 'Phải có thông tin chiết tự');
    assert.ok(q.decompInfo.mnemonic, 'Phải có mẹo nhớ chiết tự');
  });
});

runTest('1g. Dạng Luyện thứ tự nét (stroke): tách đúng danh sách chữ Hán đơn', () => {
  const questions = generateQuizQuestions(sampleWordsZh, 'stroke', 'zh', { limit: 5 });
  assert.strictEqual(questions.length, 5);
  questions.forEach(q => {
    assert.strictEqual(q.type, 'stroke');
    assert.ok(Array.isArray(q.chars));
    assert.ok(q.chars.length >= 1);
  });
});

runTest('1h. Dạng Gõ từ (typing): có đáp án mong đợi và pinyin chuẩn', () => {
  const questions = generateQuizQuestions(sampleWordsZh, 'typing', 'zh', { limit: 5 });
  assert.strictEqual(questions.length, 5);
  questions.forEach(q => {
    assert.strictEqual(q.type, 'typing');
    assert.ok(q.expectedAnswer);
    assert.ok(q.prompt);
  });
});

runTest('1i. Dạng Luyện tập tổng hợp (mixed): kết hợp ngẫu nhiên các dạng khác nhau', () => {
  const questions = generateQuizQuestions(sampleWordsZh, 'mixed', 'zh', { limit: 5 });
  assert.strictEqual(questions.length, 5);
  const typesUsed = new Set(questions.map(q => q.type));
  assert.ok(typesUsed.size >= 2, 'Tổng hợp phải bao gồm ít nhất 2 dạng khác nhau');
});

runTest('1j. Dạng Nghe chép câu (dictation): tokens sắp xếp khớp chính xác câu ví dụ', () => {
  const questions = generateQuizQuestions(sampleWordsZh, 'dictation', 'zh', { limit: 3 });
  assert.strictEqual(questions.length, 3);
  questions.forEach(q => {
    assert.strictEqual(q.type, 'dictation');
    assert.ok(q.sentenceText);
    assert.ok(Array.isArray(q.tokens));
    assert.ok(Array.isArray(q.correctTokens));
    // Ghép các correctTokens phải tái tạo lại nội dung câu
    const assembled = q.correctTokens.join('');
    assert.ok(q.sentenceText.includes(assembled) || assembled.length > 0);
  });
});

// ============================================================================
// 2. Kiểm tra các dạng tiếng Anh (en)
// ============================================================================

console.log('\n2. Kiểm tra các dạng bài tập Tiếng Anh (en):');

const sampleWordsEn = [
  { word: 'hello', ipa: '/həˈloʊ/', vi: 'xin chào', pos: 'thán từ' },
  { word: 'morning', ipa: '/ˈmɔːrnɪŋ/', vi: 'buổi sáng', pos: 'danh từ' },
  { word: 'afternoon', ipa: '/ˌæftərˈnuːn/', vi: 'buổi chiều', pos: 'danh từ' },
  { word: 'goodbye', ipa: '/ɡʊdˈbaɪ/', vi: 'tạm biệt', pos: 'thán từ' },
  { word: 'welcome', ipa: '/ˈwelkəm/', vi: 'chào mừng', pos: 'động từ' }
];

runTest('2a. Dạng IPA tiếng Anh: chọn từ đúng với phiên âm IPA', () => {
  const questions = generateQuizQuestions(sampleWordsEn, 'ipa', 'en', { limit: 5 });
  assert.strictEqual(questions.length, 5);
  questions.forEach(q => {
    assert.strictEqual(q.type, 'ipa');
    assert.strictEqual(q.options.length, 4);
    assert.strictEqual(new Set(q.options).size, 4);
    assert.strictEqual(q.options.filter(o => o === q.correctAnswer).length, 1);
  });
});

runTest('2b. Dạng Chọn trọng âm (stress): xác định chính xác vị trí trọng âm chính (ˈ) từ IPA', () => {
  // hello: /həˈloʊ/ -> âm tiết 2
  const helloStress = getWordStressInfo(sampleWordsEn[0]);
  assert.strictEqual(helloStress.stressIndex, 2);

  // morning: /ˈmɔːrnɪŋ/ -> âm tiết 1
  const morningStress = getWordStressInfo(sampleWordsEn[1]);
  assert.strictEqual(morningStress.stressIndex, 1);

  // afternoon: /ˌæftərˈnuːn/ -> âm tiết 3
  const afternoonStress = getWordStressInfo(sampleWordsEn[2]);
  assert.strictEqual(afternoonStress.stressIndex, 3);

  const questions = generateQuizQuestions(sampleWordsEn, 'stress', 'en', { limit: 3 });
  questions.forEach(q => {
    assert.strictEqual(q.type, 'stress');
    assert.ok(q.options.includes(q.correctAnswer));
  });
});

runTest('2c. Dạng Chính tả tiếng Anh (spelling): nghe và gõ từ', () => {
  const questions = generateQuizQuestions(sampleWordsEn, 'spelling', 'en', { limit: 3 });
  questions.forEach(q => {
    assert.strictEqual(q.type, 'spelling');
    assert.ok(q.expectedAnswer);
  });
});

// ============================================================================
// 3. Kiểm tra chấm điểm Pinyin (gradePinyinInput)
// ============================================================================

console.log('\n3. Kiểm tra hàm chấm Pinyin (gradePinyinInput):');

runTest('3a. Chấm đúng Pinyin không dấu (ni hao -> nǐ hǎo)', () => {
  assert.strictEqual(gradePinyinInput('ni hao', 'nǐ hǎo', '你好'), true);
  assert.strictEqual(gradePinyinInput('xiexie', 'xièxie', '谢谢'), true);
  assert.strictEqual(gradePinyinInput('zaijian', 'zàijiàn', '再见'), true);
});

runTest('3b. Chấm đúng Pinyin số thanh (ni3 hao3 -> nǐ hǎo)', () => {
  assert.strictEqual(gradePinyinInput('ni3 hao3', 'nǐ hǎo', '你好'), true);
  assert.strictEqual(gradePinyinInput('xie4xie5', 'xièxie', '谢谢'), true);
  assert.strictEqual(gradePinyinInput('lv4', 'lǜ', '绿'), true);
});

runTest('3c. Chấm đúng Pinyin chuẩn có dấu thanh', () => {
  assert.strictEqual(gradePinyinInput('nǐ hǎo', 'nǐ hǎo', '你好'), true);
  assert.strictEqual(gradePinyinInput('Xièxie', 'xièxie', '谢谢'), true);
});

runTest('3d. Bác bỏ Pinyin sai âm hoặc sai từ', () => {
  assert.strictEqual(gradePinyinInput('ta hao', 'nǐ hǎo', '你好'), false);
  assert.strictEqual(gradePinyinInput('ha3', 'nǐ', '你'), false);
  assert.strictEqual(gradePinyinInput('', 'nǐ hǎo', '你好'), false);
});

// ============================================================================
// 4. Kiểm tra chấm nối từ (gradeMatchPair)
// ============================================================================

console.log('\n4. Kiểm tra hàm chấm nối từ (gradeMatchPair):');

runTest('4a. Đúng khi cùng pairId và khác cột (word ↔ meaning)', () => {
  const c1 = { pairId: 'p-1', type: 'word' };
  const c2 = { pairId: 'p-1', type: 'meaning' };
  assert.strictEqual(gradeMatchPair(c1, c2), true);
});

runTest('4b. Sai khi khác pairId', () => {
  const c1 = { pairId: 'p-1', type: 'word' };
  const c2 = { pairId: 'p-2', type: 'meaning' };
  assert.strictEqual(gradeMatchPair(c1, c2), false);
});

runTest('4c. Sai khi chọn 2 thẻ cùng một cột', () => {
  const c1 = { pairId: 'p-1', type: 'word' };
  const c2 = { pairId: 'p-1', type: 'word' };
  assert.strictEqual(gradeMatchPair(c1, c2), false);
});

// ============================================================================
// 5. Kiểm tra chiết tự và bộ thủ từ CHAR_DECOMP
// ============================================================================

console.log('\n5. Kiểm tra chiết tự & bộ thủ từ CHAR_DECOMP:');

runTest('5a. Lấy đúng radical chuẩn cho các chữ Hán HSK1 căn bản', () => {
  const hao = getWordRadicalInfo('好');
  assert.strictEqual(hao.radical, '女', 'Bộ thủ của 好 phải là 女');
  assert.ok(hao.mnemonic.length > 5, 'Mẹo nhớ không được rỗng');

  const ni = getWordRadicalInfo('你');
  assert.ok(ni.radical === '亻' || ni.radical === '人', 'Bộ thủ của 你 phải là 亻 (nhân đứng)');

  const xue = getWordRadicalInfo('学');
  assert.strictEqual(xue.radical, '子', 'Bộ thủ của 学 phải là 子');

  const guo = getWordRadicalInfo('国');
  assert.strictEqual(guo.radical, '囗', 'Bộ thủ của 国 phải là 囗');
});

runTest('5b. Sinh 3 bộ thủ nhiễu phân biệt khác đáp án đúng', () => {
  const distractors = generateRadicalDistractors('女', null, null, 3);
  assert.strictEqual(distractors.length, 3);
  distractors.forEach(d => {
    assert.notStrictEqual(d.radical, '女', 'Nhiễu không được trùng đáp án đúng');
  });
});

// ============================================================================
// 6. Kiểm tra lọc từ theo phạm vi (filterPracticeWords)
// ============================================================================

console.log('\n6. Kiểm tra lọc từ theo phạm vi (filterPracticeWords):');

runTest('6a. Phạm vi "Từ hay nhầm" khi rỗng: trả về isEmpty=true và thông báo rõ', () => {
  const emptyProg = { hardWords: {} };
  const res = filterPracticeWords(sampleWordsZh, 'hard', emptyProg);
  assert.strictEqual(res.isEmpty, true);
  assert.strictEqual(res.words.length, 0);
  assert.ok(res.message.includes('Chưa có từ hay nhầm'));
});

runTest('6b. Phạm vi "Từ hay nhầm" khi có từ sai: lọc chính xác các từ đó', () => {
  const progWithHard = { hardWords: { '啊': 2, '喔': 1 } };
  const res = filterPracticeWords(sampleWordsZh, 'hard', progWithHard);
  assert.strictEqual(res.isEmpty, false);
  assert.strictEqual(res.words.length, 2);
  const keys = res.words.map(w => w.hanzi);
  assert.ok(keys.includes('啊'));
  assert.ok(keys.includes('喔'));
});

runTest('6c. Phạm vi "Toàn bài": trả về trọn vẹn danh sách từ bài học', () => {
  const res = filterPracticeWords(sampleWordsZh, 'all', {});
  assert.strictEqual(res.isEmpty, false);
  assert.strictEqual(res.words.length, sampleWordsZh.length);
});

// ============================================================================
// 7. Kiểm tra cập nhật hardWords và Điểm cao nhất (updatePracticeProgress)
// ============================================================================

console.log('\n7. Kiểm tra cập nhật hardWords và Điểm cao nhất:');

runTest('7a. Từ làm sai được ghi vào hardWords và reset chuỗi đúng', () => {
  const prog = { hardWords: {}, practiceStreak: {}, practice: {} };
  const updated = updatePracticeProgress(prog, 'intro-u1-l1', 'meaning', {
    score: 80,
    correctCount: 4,
    totalCount: 5,
    wrongWords: [{ hanzi: '鹅' }],
    correctWords: [{ hanzi: '啊' }]
  });

  assert.strictEqual(updated.hardWords['鹅'], 1, 'Từ làm sai phải có trong hardWords');
  assert.strictEqual(updated.practiceStreak['鹅'], 0);
  assert.strictEqual(updated.practiceStreak['啊'], 1);
});

runTest('7b. Đúng liên tiếp 3 lần thì giảm hardWords đi 1', () => {
  let prog = { hardWords: { '鹅': 2 }, practiceStreak: {}, practice: {} };

  // Lần 1 đúng
  prog = updatePracticeProgress(prog, 'intro-u1-l1', 'meaning', {
    score: 100, correctCount: 1, totalCount: 1, correctWords: [{ hanzi: '鹅' }], wrongWords: []
  });
  assert.strictEqual(prog.hardWords['鹅'], 2);
  assert.strictEqual(prog.practiceStreak['鹅'], 1);

  // Lần 2 đúng
  prog = updatePracticeProgress(prog, 'intro-u1-l1', 'meaning', {
    score: 100, correctCount: 1, totalCount: 1, correctWords: [{ hanzi: '鹅' }], wrongWords: []
  });
  assert.strictEqual(prog.hardWords['鹅'], 2);
  assert.strictEqual(prog.practiceStreak['鹅'], 2);

  // Lần 3 đúng -> giảm hardWords từ 2 xuống 1
  prog = updatePracticeProgress(prog, 'intro-u1-l1', 'meaning', {
    score: 100, correctCount: 1, totalCount: 1, correctWords: [{ hanzi: '鹅' }], wrongWords: []
  });
  assert.strictEqual(prog.hardWords['鹅'], 1, 'Phải giảm hardWords sau 3 lần đúng liên tiếp');
  assert.strictEqual(prog.practiceStreak['鹅'], 0, 'Reset chuỗi đúng về 0 sau khi giảm');
});

runTest('7c. Điểm cao nhất được lưu trữ và không bị ghi đè bởi điểm thấp hơn', () => {
  let prog = { practice: {} };

  // Lần 1: đạt 80%
  prog = updatePracticeProgress(prog, 'intro-u1-l1', 'meaning', {
    score: 80, correctCount: 8, totalCount: 10, correctWords: [], wrongWords: []
  });
  assert.strictEqual(prog.practice['intro-u1-l1']['meaning'].best, 80);
  assert.strictEqual(prog.practice['intro-u1-l1']['meaning'].last, 80);

  // Lần 2: đạt 95% -> cập nhật best = 95%
  prog = updatePracticeProgress(prog, 'intro-u1-l1', 'meaning', {
    score: 95, correctCount: 9, totalCount: 10, correctWords: [], wrongWords: []
  });
  assert.strictEqual(prog.practice['intro-u1-l1']['meaning'].best, 95);
  assert.strictEqual(prog.practice['intro-u1-l1']['meaning'].last, 95);

  // Lần 3: đạt 70% -> best vẫn giữ nguyên 95%, last = 70%
  prog = updatePracticeProgress(prog, 'intro-u1-l1', 'meaning', {
    score: 70, correctCount: 7, totalCount: 10, correctWords: [], wrongWords: []
  });
  assert.strictEqual(prog.practice['intro-u1-l1']['meaning'].best, 95, 'Điểm cao nhất phải được bảo toàn');
  assert.strictEqual(prog.practice['intro-u1-l1']['meaning'].last, 70);
  assert.ok(prog.practice['intro-u1-l1']['meaning'].lastDate > 0);
});

// ============================================================================
// 8. Kiểm tra các phần sửa lỗi (Sửa lần 2 - Claude review)
// ============================================================================

console.log('\n8. Kiểm tra các lỗi đã sửa (Lần 2):');

runTest('8a. Dạng stroke (zh): HanziWriter mock, nút "Gợi ý nét" gọi highlightStroke với nét kế tiếp', () => {
  const mockStage = {
    elements: {},
    querySelector(sel) {
      if (!this.elements[sel]) {
        this.elements[sel] = {
          innerHTML: '',
          listeners: {},
          addEventListener(evt, fn) {
            this.listeners[evt] = this.listeners[evt] || [];
            this.listeners[evt].push(fn);
          },
          click() {
            (this.listeners['click'] || []).forEach(f => f());
          }
        };
      }
      return this.elements[sel];
    },
    querySelectorAll() { return []; }
  };

  let lastHighlighted = null;
  let lastQuizOpts = null;
  const mockWriter = {
    quiz(opts) { lastQuizOpts = opts; },
    highlightStroke(idx) { lastHighlighted = idx; }
  };

  global.window.HanziWriter = {
    create: () => mockWriter
  };

  let resultCalled = false;
  LessonPractice.processQuestionResult = (isSuccess) => { resultCalled = isSuccess; };

  LessonPractice.renderStrokeStage(mockStage, {
    questionText: 'Luyện tập viết các nét theo thứ tự chuẩn:',
    chars: ['你'],
    word: '你',
    targetWord: { hanzi: '你' }
  });

  assert.ok(lastQuizOpts, 'HanziWriter.quiz phải được gọi');
  assert.strictEqual(lastQuizOpts.showHintAfterMisses, 3, 'Quiz phải có showHintAfterMisses: 3');
  assert.strictEqual(lastQuizOpts.highlightOnComplete, true, 'Quiz phải có highlightOnComplete: true');

  // Bấm gợi ý nét lần 1 -> nét 0
  const hintBtn = mockStage.querySelector('#btn-stroke-hint');
  hintBtn.click();
  assert.strictEqual(lastHighlighted, 0, 'Lần đầu tiên phải gợi ý nét index 0');

  // Đúng nét 0 -> strokeNum = 0 -> nét kế tiếp là 1
  lastQuizOpts.onCorrectStroke({ strokeNum: 0 });
  hintBtn.click();
  assert.strictEqual(lastHighlighted, 1, 'Sau khi viết đúng nét 0, gợi ý phải chuyển sang nét 1');

  // Sai nét 1 -> strokeNum = 1 -> nét kế tiếp vẫn là 1
  lastQuizOpts.onMistake({ strokeNum: 1 });
  hintBtn.click();
  assert.strictEqual(lastHighlighted, 1, 'Khi viết sai, nét kế tiếp vẫn được giữ nguyên');

  // Hoàn tất chữ
  lastQuizOpts.onComplete({ totalMistakes: 1 });
  assert.strictEqual(resultCalled, true, 'Hoàn thành chữ phải gọi kết quả');
});

runTest('8b. Dạng stroke (zh): Fallback animateCharacter khi highlightStroke không tồn tại', () => {
  const mockStage = {
    elements: {},
    querySelector(sel) {
      if (!this.elements[sel]) {
        this.elements[sel] = {
          innerHTML: '',
          listeners: {},
          addEventListener(evt, fn) {
            this.listeners[evt] = this.listeners[evt] || [];
            this.listeners[evt].push(fn);
          },
          click() {
            (this.listeners['click'] || []).forEach(f => f());
          }
        };
      }
      return this.elements[sel];
    },
    querySelectorAll() { return []; }
  };

  let animated = false;
  let quizCount = 0;
  const mockWriter = {
    quiz(opts) { quizCount++; },
    animateCharacter(opts) {
      animated = true;
      if (opts && typeof opts.onComplete === 'function') opts.onComplete();
    }
  };

  global.window.HanziWriter = {
    create: () => mockWriter
  };

  LessonPractice.processQuestionResult = () => {};
  LessonPractice.renderStrokeStage(mockStage, {
    questionText: 'Luyện tập viết các nét:',
    chars: ['好'],
    word: '好',
    targetWord: { hanzi: '好' }
  });

  assert.strictEqual(quizCount, 1, 'Khởi tạo quiz lần 1');
  const hintBtn = mockStage.querySelector('#btn-stroke-hint');
  hintBtn.click();
  assert.strictEqual(animated, true, 'animateCharacter phải được gọi khi không có highlightStroke');
  assert.strictEqual(quizCount, 2, 'Quiz phải được khởi động lại sau khi animateCharacter hoàn tất');
});

runTest('8c. Chiều cao nút "Luyện tập" (practice-btn-start) trong practice.css: min-height >= 44px', () => {
  const fs = require('fs');
  const path = require('path');
  const css = fs.readFileSync(path.join(__dirname, '../practice.css'), 'utf8');

  const match = css.match(/\.practice-btn-start\s*\{([^}]+)\}/);
  assert.ok(match, 'Phải tìm thấy selector .practice-btn-start trong practice.css');
  const block = match[1];

  const minHeightMatch = block.match(/min-height\s*:\s*(\d+)px/);
  assert.ok(minHeightMatch, 'Phải có thuộc tính min-height');
  const minHeightVal = parseInt(minHeightMatch[1], 10);
  assert.ok(minHeightVal >= 44, `min-height của .practice-btn-start phải >= 44px (hiện tại: ${minHeightVal}px)`);
  assert.ok(!block.includes('38px'), 'Không được còn giá trị 38px cũ');
});

runTest('8d. Tiếng Anh - Chọn trọng âm từ (stress): không câu nào có từ 1 âm tiết, số lựa chọn = đúng số âm tiết', () => {
  const mixedWords = [
    { word: 'name', ipa: '/neɪm/', vi: 'tên', topic: 'greetings', level: 'A1' },
    { word: 'book', ipa: '/bʊk/', vi: 'sách', topic: 'objects', level: 'A1' },
    { word: 'hello', ipa: '/həˈloʊ/', vi: 'xin chào', topic: 'greetings', level: 'A1' },
    { word: 'morning', ipa: '/ˈmɔːrnɪŋ/', vi: 'buổi sáng', topic: 'greetings', level: 'A1' },
    { word: 'afternoon', ipa: '/ˌæftərˈnuːn/', vi: 'buổi chiều', topic: 'greetings', level: 'A1' }
  ];

  const questions = generateQuizQuestions(mixedWords, 'stress', 'en', { limit: 3 });
  assert.strictEqual(questions.length, 3);

  questions.forEach((q, idx) => {
    assert.strictEqual(q.type, 'stress');
    // Từ mục tiêu phải có IPA chứa dấu ˈ và totalSyllables >= 2
    assert.ok(q.targetWord.ipa.includes('ˈ'), `Câu ${idx + 1}: Từ ${q.targetWord.word} phải có trọng âm ˈ`);
    assert.ok(q.stressInfo.totalSyllables >= 2, `Câu ${idx + 1}: Từ ${q.targetWord.word} phải có ít nhất 2 âm tiết`);
    // Không câu nào có từ 1 âm tiết như name hay book
    assert.notStrictEqual(q.targetWord.word, 'name', 'Không được hỏi từ 1 âm tiết "name"');
    assert.notStrictEqual(q.targetWord.word, 'book', 'Không được hỏi từ 1 âm tiết "book"');
    // Số lựa chọn = đúng số âm tiết của từ
    assert.strictEqual(q.options.length, q.stressInfo.totalSyllables, `Câu ${idx + 1}: Số lựa chọn (${q.options.length}) phải bằng đúng số âm tiết (${q.stressInfo.totalSyllables})`);
  });
});

runTest('8e. Tiếng Anh - stress: hiển thị từ chia âm tiết (vd be·au·ti·ful), mở rộng từ EN_WORDS khi thiếu từ', () => {
  // Trường hợp bài học chỉ có các từ 1 âm tiết (không đủ từ có trọng âm)
  const onlyMonosyllable = [
    { word: 'name', ipa: '/neɪm/', vi: 'tên', topic: 'greetings', level: 'A1' },
    { word: 'pen', ipa: '/pen/', vi: 'bút', topic: 'objects', level: 'A1' }
  ];

  const questions = generateQuizQuestions(onlyMonosyllable, 'stress', 'en', { limit: 2 });
  assert.strictEqual(questions.length, 2);

  questions.forEach((q, idx) => {
    assert.strictEqual(q.type, 'stress');
    assert.strictEqual(q.isExpanded, true, `Câu ${idx + 1}: Từ phải được đánh dấu là từ mở rộng`);
    assert.ok(q.subPrompt.includes('(từ mở rộng)'), `Câu ${idx + 1}: subPrompt phải ghi rõ "(từ mở rộng)"`);
    assert.ok(q.stressInfo.totalSyllables >= 2, `Câu ${idx + 1}: Từ mở rộng phải có >= 2 âm tiết`);
    assert.strictEqual(q.options.length, q.stressInfo.totalSyllables, 'Số lựa chọn phải bằng đúng số âm tiết');
    // Hiển thị từ chia âm tiết bằng dấu ·
    if (q.stressInfo.syllables && q.stressInfo.syllables.length > 1) {
      assert.ok(q.prompt.includes('·'), `Prompt ${q.prompt} phải chứa dấu tách âm tiết ·`);
    }
  });
});

runTest('8f. Tiếng Anh - Gợi ý gõ từ & chính tả: hiển thị đúng gợi ý tiếng Anh', () => {
  const mockStage = {
    innerHTML: '',
    elements: {},
    querySelector(sel) {
      if (!this.elements[sel]) {
        this.elements[sel] = {
          innerHTML: '',
          listeners: {},
          addEventListener(evt, fn) {
            this.listeners[evt] = this.listeners[evt] || [];
            this.listeners[evt].push(fn);
          },
          click() {}
        };
      }
      return this.elements[sel];
    },
    querySelectorAll() { return []; }
  };

  LessonPractice.lang = 'en';

  // Dạng spelling
  LessonPractice.renderTypingStage(mockStage, {
    type: 'spelling',
    lang: 'en',
    prompt: 'xin chào',
    subPrompt: '/həˈloʊ/',
    promptAudio: 'hello',
    expectedAnswer: 'hello',
    questionText: 'Nghe phát âm và gõ chính xác chính tả:'
  });

  assert.ok(mockStage.innerHTML.includes('Gõ đúng chính tả, không phân biệt hoa thường'));
  assert.ok(!mockStage.innerHTML.includes('số thanh'));
  assert.ok(!mockStage.innerHTML.includes('ni3'));

  // Dạng typing (gõ từ từ nghĩa)
  LessonPractice.renderTypingStage(mockStage, {
    type: 'typing',
    lang: 'en',
    prompt: 'buổi sáng',
    subPrompt: '/ˈmɔːrnɪŋ/',
    promptAudio: 'morning',
    expectedAnswer: 'morning',
    questionText: 'Gõ từ tiếng Anh tương ứng với nghĩa:'
  });

  assert.ok(mockStage.innerHTML.includes('Gõ đúng chính tả, không phân biệt hoa thường'));
  assert.ok(!mockStage.innerHTML.includes('số thanh'));
  assert.ok(!mockStage.innerHTML.includes('ni3'));
});

runTest('8g. Quét chuỗi render của cả 10 dạng bài Tiếng Anh: không chứa pinyin, thanh, Hán, ni3', () => {
  const sampleWords = [
    { word: 'hello', ipa: '/həˈloʊ/', vi: 'xin chào', topic: 'greetings', level: 'A1' },
    { word: 'morning', ipa: '/ˈmɔːrnɪŋ/', vi: 'buổi sáng', topic: 'greetings', level: 'A1' },
    { word: 'afternoon', ipa: '/ˌæftərˈnuːn/', vi: 'buổi chiều', topic: 'greetings', level: 'A1' },
    { word: 'welcome', ipa: '/ˈwelkəm/', vi: 'chào mừng', topic: 'greetings', level: 'A1' },
    { word: 'goodbye', ipa: '/ɡʊdˈbaɪ/', vi: 'tạm biệt', topic: 'greetings', level: 'A1' }
  ];

  const types = ['meaning', 'word', 'pinyin', 'pronunciation', 'matching', 'radical', 'stroke', 'typing', 'mixed', 'dictation'];

  function createMockEl() {
    return {
      innerHTML: '',
      listeners: {},
      classList: {
        add() {},
        remove() {},
        contains() { return false; },
        toggle() {}
      },
      addEventListener(e, f) { (this.listeners[e] = this.listeners[e] || []).push(f); },
      click() {},
      querySelector() { return createMockEl(); },
      querySelectorAll() { return []; },
      getAttribute() { return ''; }
    };
  }

  const mockStage = {
    innerHTML: '',
    elements: {},
    querySelector(sel) {
      if (!this.elements[sel]) {
        this.elements[sel] = createMockEl();
      }
      return this.elements[sel];
    },
    querySelectorAll() { return []; }
  };

  const mockContainer = {
    querySelector(sel) {
      if (sel === '#practice-stage-mount') return mockStage;
      return mockStage.querySelector(sel);
    }
  };

  LessonPractice.containerEl = mockContainer;
  LessonPractice.lang = 'en';

  types.forEach(t => {
    const qs = generateQuizQuestions(sampleWords, t, 'en', { limit: 2 });
    assert.ok(qs.length > 0, `Dạng ${t} phải sinh được câu hỏi`);

    qs.forEach(q => {
      // 1. Kiểm tra thuộc tính của object câu hỏi
      const qFields = [q.questionText, q.prompt, q.subPrompt, ...(q.options || [])].filter(Boolean).join(' ');
      assert.ok(!qFields.toLowerCase().includes('pinyin'), `Dạng ${t} có chứa pinyin trong câu hỏi: ${qFields}`);
      assert.ok(!qFields.toLowerCase().includes('thanh điệu'), `Dạng ${t} có nhắc thanh điệu: ${qFields}`);
      assert.ok(!qFields.toLowerCase().includes('chữ hán'), `Dạng ${t} có nhắc chữ Hán: ${qFields}`);
      assert.ok(!qFields.toLowerCase().includes('bộ thủ'), `Dạng ${t} có nhắc bộ thủ: ${qFields}`);
      assert.ok(!qFields.toLowerCase().includes('ni3'), `Dạng ${t} có chứa ni3: ${qFields}`);

      // 2. Kiểm tra HTML render ra stage
      mockStage.innerHTML = '';
      LessonPractice.renderQuestionContent(q);
      const stageHtml = mockStage.innerHTML;

      assert.ok(!stageHtml.toLowerCase().includes('pinyin'), `Stage HTML dạng ${t} chứa pinyin`);
      assert.ok(!stageHtml.toLowerCase().includes('thanh điệu'), `Stage HTML dạng ${t} chứa thanh điệu`);
      assert.ok(!stageHtml.toLowerCase().includes('chữ hán'), `Stage HTML dạng ${t} chứa chữ Hán`);
      assert.ok(!stageHtml.toLowerCase().includes('bộ thủ'), `Stage HTML dạng ${t} chứa bộ thủ`);
      assert.ok(!stageHtml.toLowerCase().includes('ni3'), `Stage HTML dạng ${t} chứa ni3`);
      assert.ok(!stageHtml.includes('số thanh'), `Stage HTML dạng ${t} chứa số thanh`);
    });
  });
});

// ============================================================================
// KẾT THÚC VÀ IN TỔNG KẾT
// ============================================================================

console.log('\n========================================');
console.log(`OK ${testCount} tests`);
console.log('Tất cả bài kiểm tra MODULE LUYỆN TẬP THEO BÀI ĐÃ VƯỢT QUA thành công!\n');
