/**
 * tests/learn.test.js
 * Kiểm tra các hàm thuần của Lộ trình học (LearnPath) bằng Node.js thuần.
 * Chạy: node tests/learn.test.js
 * Yêu cầu: Dùng assert, in "OK n tests" khi thành công.
 */

const assert = require('assert');
const CURRICULUM = require('../data/zh/curriculum.js');
const {
  starsFor,
  getStepSummaryLabel,
  calculateLessonResult,
  isLessonUnlocked,
  nextLesson,
  splitSentence,
  buildExercises,
  buildCheckpointExercises,
  comparePinyin,
  chunkWords,
  saveGroupProgress,
  filterWords,
  gradeMatchPair,
  buildRubyHtml,
  loadProgress
} = require('../learn.js');

let testCount = 0;

function runTest(name, fn) {
  try {
    fn();
    testCount++;
  } catch (err) {
    console.error(`✗ FAILED: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// ============================================================================
// 1. Kiểm tra starsFor(pct)
// ============================================================================

runTest('starsFor: >= 90% trả về 3 sao', () => {
  assert.strictEqual(starsFor(100), 3);
  assert.strictEqual(starsFor(95), 3);
  assert.strictEqual(starsFor(90), 3);
});

runTest('starsFor: >= 75% và < 90% trả về 2 sao', () => {
  assert.strictEqual(starsFor(89.9), 2);
  assert.strictEqual(starsFor(80), 2);
  assert.strictEqual(starsFor(75), 2);
});

runTest('starsFor: >= 60% và < 75% trả về 1 sao', () => {
  assert.strictEqual(starsFor(74.9), 1);
  assert.strictEqual(starsFor(70), 1);
  assert.strictEqual(starsFor(60), 1);
});

runTest('starsFor: < 60% trả về 0 sao (không đạt)', () => {
  assert.strictEqual(starsFor(59.9), 0);
  assert.strictEqual(starsFor(50), 0);
  assert.strictEqual(starsFor(0), 0);
  assert.strictEqual(starsFor(-5), 0);
});

// ============================================================================
// 2. Kiểm tra isLessonUnlocked(curriculum, progress, lessonId)
// ============================================================================

runTest('isLessonUnlocked: Bài đầu tiên của Nhập môn (intro-u1-l1) luôn mở khi chưa học gì', () => {
  const emptyProg = { lessons: {}, checkpoints: {}, hardWords: {} };
  assert.strictEqual(isLessonUnlocked(CURRICULUM, emptyProg, 'intro-u1-l1'), true);
});

runTest('isLessonUnlocked: Bài thứ hai (intro-u1-l2) bị khóa khi bài 1 chưa hoàn thành', () => {
  const emptyProg = { lessons: {}, checkpoints: {}, hardWords: {} };
  assert.strictEqual(isLessonUnlocked(CURRICULUM, emptyProg, 'intro-u1-l2'), false);
});

runTest('isLessonUnlocked: Bài thứ hai (intro-u1-l2) mở khi bài 1 đã hoàn thành', () => {
  const prog = {
    lessons: {
      'intro-u1-l1': { stars: 3, best: 100, doneAt: Date.now() }
    },
    checkpoints: {},
    hardWords: {}
  };
  assert.strictEqual(isLessonUnlocked(CURRICULUM, prog, 'intro-u1-l2'), true);
  assert.strictEqual(isLessonUnlocked(CURRICULUM, prog, 'intro-u1-l3'), false);
});

runTest('isLessonUnlocked: Bài đầu của Chương 2 bị khóa nếu chưa đạt Kiểm tra chặng Chương 1', () => {
  const progWithoutCp = {
    lessons: {
      'intro-u1-l1': { stars: 3 },
      'intro-u1-l2': { stars: 3 },
      'intro-u1-l3': { stars: 3 },
      'intro-u1-l4': { stars: 3 },
      'intro-u1-l5': { stars: 3 }
    },
    checkpoints: {},
    hardWords: {}
  };
  assert.strictEqual(isLessonUnlocked(CURRICULUM, progWithoutCp, 'intro-u2-l1'), false);

  // Checkpoint thi được 75% (< 80%) vẫn khóa
  progWithoutCp.checkpoints['intro-u1'] = 75;
  assert.strictEqual(isLessonUnlocked(CURRICULUM, progWithoutCp, 'intro-u2-l1'), false);
});

runTest('isLessonUnlocked: Bài đầu của Chương 2 mở khi Kiểm tra chặng Chương 1 đạt >= 80%', () => {
  const progWithCp = {
    lessons: {},
    checkpoints: { 'intro-u1': 80 },
    hardWords: {}
  };
  assert.strictEqual(isLessonUnlocked(CURRICULUM, progWithCp, 'intro-u2-l1'), true);
});

runTest('isLessonUnlocked: Bài đã hoàn thành thì luôn luôn mở để ôn lại', () => {
  const prog = {
    lessons: { 'intro-u2-l3': { stars: 2, best: 75 } },
    checkpoints: {},
    hardWords: {}
  };
  assert.strictEqual(isLessonUnlocked(CURRICULUM, prog, 'intro-u2-l3'), true);
});

runTest('isLessonUnlocked: Cấp HSK2..HSK7-9 bị khóa vì đang biên soạn', () => {
  const prog = { lessons: {}, checkpoints: {}, hardWords: {} };
  assert.strictEqual(isLessonUnlocked(CURRICULUM, prog, 'hsk2-u1-l1'), false);
  assert.strictEqual(isLessonUnlocked(CURRICULUM, prog, 'hsk3-u1-l1'), false);
});

// ============================================================================
// 3. Kiểm tra nextLesson(curriculum, progress)
// ============================================================================

runTest('nextLesson: Khi chưa học gì, bài tiếp theo là intro-u1-l1', () => {
  const emptyProg = { lessons: {}, checkpoints: {}, hardWords: {} };
  const next = nextLesson(CURRICULUM, emptyProg);
  assert(next !== null);
  assert.strictEqual(next.id, 'intro-u1-l1');
});

runTest('nextLesson: Sau khi hoàn thành intro-u1-l1, bài tiếp theo là intro-u1-l2', () => {
  const prog = {
    lessons: { 'intro-u1-l1': { stars: 3 } },
    checkpoints: {},
    hardWords: {}
  };
  const next = nextLesson(CURRICULUM, prog);
  assert(next !== null);
  assert.strictEqual(next.id, 'intro-u1-l2');
});

runTest('nextLesson: Nhảy sang chương kế tiếp khi hoàn thành checkpoint', () => {
  const unit1 = CURRICULUM.levels[0].units[0];
  const prog = { lessons: {}, checkpoints: {}, hardWords: {} };
  unit1.lessons.forEach(l => {
    prog.lessons[l.id] = { stars: 3 };
  });
  prog.checkpoints['intro-u1'] = 85;

  const next = nextLesson(CURRICULUM, prog);
  assert(next !== null);
  assert.strictEqual(next.id, 'intro-u2-l1');
});

// ============================================================================
// 4. Kiểm tra splitSentence(sentence, knownWords) (Khớp tham lam dài nhất)
// ============================================================================

runTest('splitSentence: Khớp tham lam dài nhất (ưu tiên từ ghép dài hơn từ đơn)', () => {
  const sentence = '今天天气晴';
  const known = ['今天', '天气', '晴', '天'];
  const tokens = splitSentence(sentence, known);
  // '天气' dài hơn '天', nên phải tách '今天' -> '天气' -> '晴'
  assert.deepStrictEqual(tokens, ['今天', '天气', '晴']);
});

runTest('splitSentence: Bỏ qua dấu câu tiếng Trung và khoảng trắng', () => {
  const sentence = '你好，很高兴见到您！';
  const known = ['你好', '很', '高兴', '见到', '您'];
  const tokens = splitSentence(sentence, known);
  assert.deepStrictEqual(tokens, ['你好', '很', '高兴', '见到', '您']);
});

runTest('splitSentence: Xử lý ký tự không có trong danh sách từ đã biết', () => {
  const sentence = '我爱中国';
  const known = ['我', '中国']; // thiếu '爱'
  const tokens = splitSentence(sentence, known);
  // '爱' không có trong known và không phải dấu câu -> tách thành ký tự đơn
  assert.deepStrictEqual(tokens, ['我', '爱', '中国']);
});

runTest('splitSentence: Xử lý chuỗi rỗng hoặc tham số rỗng', () => {
  assert.deepStrictEqual(splitSentence('', ['你好']), []);
  assert.deepStrictEqual(splitSentence(null, ['你好']), []);
});

// ============================================================================
// 5. Kiểm tra buildExercises(lesson, words, rng)
// ============================================================================

runTest('buildExercises: Tạo từ 8 đến 12 câu hỏi bài tập hợp lệ', () => {
  const lesson = CURRICULUM.levels[1].units[0].lessons[0]; // hsk1-u1-l1
  const customWords = {
    '你好': { py: 'nǐ hǎo', vi: 'xin chào', ex: { zh: '你好吗？', vi: 'Bạn khỏe không?' } },
    '谢谢': { py: 'xièxie', vi: 'cảm ơn', ex: { zh: '谢谢你。', vi: 'Cảm ơn bạn.' } },
    '再见': { py: 'zàijiàn', vi: 'tạm biệt' },
    '不': { py: 'bù', vi: 'không' }
  };

  // Giả lập hàm ngẫu nhiên xác định
  let seed = 42;
  const mockRng = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const exercises = buildExercises(lesson, customWords, mockRng);
  assert(Array.isArray(exercises), 'Phải trả về mảng bài tập');
  assert(exercises.length >= 8 && exercises.length <= 12, `Số câu phải từ 8 đến 12 (thực tế: ${exercises.length})`);

  exercises.forEach(q => {
    assert(q.type, 'Mỗi câu hỏi phải có trường type');
    assert(['meaning', 'listen', 'typing', 'order', 'speak'].includes(q.type), `Loại câu không hợp lệ: ${q.type}`);

    if (q.type === 'meaning' || q.type === 'listen') {
      assert(Array.isArray(q.options), 'Câu trắc nghiệm phải có mảng options');
      assert.strictEqual(q.options.length, 4, 'Câu trắc nghiệm phải có 4 lựa chọn');
      assert(q.options.includes(q.correct), 'Mảng options phải chứa đáp án đúng');
    }

    if (q.type === 'typing') {
      assert(q.correctPinyin, 'Câu gõ chữ phải có đáp án Pinyin');
    }

    if (q.type === 'order') {
      assert(Array.isArray(q.tokens), 'Câu sắp xếp phải có mảng tokens');
      assert(Array.isArray(q.correctTokens), 'Câu sắp xếp phải có correctTokens');
    }
  });
});

// ============================================================================
// 6. Kiểm tra so sánh Pinyin (comparePinyin)
// ============================================================================

runTest('comparePinyin: Chấp nhận có dấu, không dấu và số thanh', () => {
  assert.strictEqual(comparePinyin('nǐ hǎo', 'nǐ hǎo', '你好'), true);
  assert.strictEqual(comparePinyin('ni hao', 'nǐ hǎo', '你好'), true);
  assert.strictEqual(comparePinyin('ni3 hao3', 'nǐ hǎo', '你好'), true);
  assert.strictEqual(comparePinyin('xiexie', 'xièxie', '谢谢'), true);
  assert.strictEqual(comparePinyin('ta4', 'nǐ hǎo', '你好'), false);
});

// ============================================================================
// 7. Kiểm tra chia nhóm 5 từ (chunkWords)
// ============================================================================

runTest('chunkWords: Chia bài 12 từ thành 3 nhóm (5, 5, 2)', () => {
  const words12 = ['w1','w2','w3','w4','w5','w6','w7','w8','w9','w10','w11','w12'];
  const chunks = chunkWords(words12, 5);
  assert.strictEqual(chunks.length, 3);
  assert.strictEqual(chunks[0].count, 5);
  assert.strictEqual(chunks[0].label, 'Phần 1 (1–5)');
  assert.strictEqual(chunks[1].count, 5);
  assert.strictEqual(chunks[1].label, 'Phần 2 (6–10)');
  assert.strictEqual(chunks[2].count, 2);
  assert.strictEqual(chunks[2].label, 'Phần 3 (11–12)');
});

runTest('chunkWords: Bài 5 từ tạo đúng 1 nhóm (5)', () => {
  const words5 = ['a', 'b', 'c', 'd', 'e'];
  const chunks5 = chunkWords(words5, 5);
  assert.strictEqual(chunks5.length, 1);
  assert.strictEqual(chunks5[0].count, 5);
  assert.strictEqual(chunks5[0].label, 'Phần 1 (1–5)');
});

runTest('chunkWords: Mảng rỗng hoặc null trả về []', () => {
  assert.deepStrictEqual(chunkWords([]), []);
  assert.deepStrictEqual(chunkWords(null), []);
});

// ============================================================================
// 8. Kiểm tra lưu tiến độ nhóm & luồng 4 bước (saveGroupProgress)
// ============================================================================

runTest('saveGroupProgress: Lưu tiến độ hoàn thành nhóm, từ đã học và từ hay nhầm', () => {
  const prog = { lessons: {}, checkpoints: {}, hardWords: {}, learnedWords: {} };
  const updated = saveGroupProgress(prog, 'intro-u1-l1', 0, {
    correctWords: ['啊', '喔', '鹅', '衣'],
    wrongWords: ['乌'],
    totalCount: 5
  });

  assert.strictEqual(updated.lessons['intro-u1-l1'].groups[0].done, true);
  assert.strictEqual(updated.lessons['intro-u1-l1'].groups[0].correctCount, 4);
  assert.ok(updated.learnedWords['啊']);
  assert.ok(updated.learnedWords['喔']);
  assert.strictEqual(updated.hardWords['乌'], 1);
});

// ============================================================================
// 9. Kiểm tra bộ lọc từ vựng (filterWords)
// ============================================================================

runTest('filterWords: Đếm chính xác số lượng bộ lọc (all, unlearned, hard, learned)', () => {
  const words = ['w1', 'w2', 'w3', 'w4'];
  const prog = {
    lessons: { 'test-l1': { stars: 0 } },
    learnedWords: { 'w1': 1, 'w2': 1 },
    hardWords: { 'w3': 2 }
  };
  const res = filterWords(words, 'all', prog, 'test-l1');
  assert.strictEqual(res.counts.all, 4);
  assert.strictEqual(res.counts.learned, 2);
  assert.strictEqual(res.counts.hard, 1);
  assert.strictEqual(res.counts.unlearned, 2);
});

runTest('filterWords: Lọc trả về đúng danh sách theo từng loại', () => {
  const words = ['w1', 'w2', 'w3', 'w4'];
  const prog = {
    lessons: {},
    learnedWords: { 'w1': 1, 'w2': 1 },
    hardWords: { 'w3': 2 }
  };
  assert.deepStrictEqual(filterWords(words, 'learned', prog).items, ['w1', 'w2']);
  assert.deepStrictEqual(filterWords(words, 'hard', prog).items, ['w3']);
  assert.deepStrictEqual(filterWords(words, 'unlearned', prog).items, ['w3', 'w4']);
});

// ============================================================================
// 10. Kiểm tra chấm ghép nghĩa (gradeMatchPair)
// ============================================================================

runTest('gradeMatchPair: Đúng khi cùng pairId và khác loại (word vs meaning)', () => {
  assert.strictEqual(gradeMatchPair({ pairId: 'w1', type: 'word' }, { pairId: 'w1', type: 'meaning' }), true);
});

runTest('gradeMatchPair: Sai khi khác pairId', () => {
  assert.strictEqual(gradeMatchPair({ pairId: 'w1', type: 'word' }, { pairId: 'w2', type: 'meaning' }), false);
});

runTest('gradeMatchPair: Sai khi cùng loại (word với word)', () => {
  assert.strictEqual(gradeMatchPair({ pairId: 'w1', type: 'word' }, { pairId: 'w1', type: 'word' }), false);
});

// ============================================================================
// 11. Kiểm tra so sánh Pinyin không dấu (comparePinyin)
// ============================================================================

runTest('comparePinyin: Chấp nhận Pinyin không dấu cho từ đơn và từ ghép', () => {
  assert.strictEqual(comparePinyin('ni hao', 'nǐ hǎo', '你好'), true);
  assert.strictEqual(comparePinyin('xiexie', 'xièxie', '谢谢'), true);
  assert.strictEqual(comparePinyin('zaijian', 'zàijiàn', '再见'), true);
  assert.strictEqual(comparePinyin('dui bu qi', 'duìbuqǐ', '对不起'), true);
  assert.strictEqual(comparePinyin('sai tieng', 'nǐ hǎo', '你好'), false);
});

// ============================================================================
// 12. Kiểm tra hiển thị Ruby pinyin & Fallback khi không có tokens (buildRubyHtml)
// ============================================================================

runTest('buildRubyHtml: Hiển thị pinyin bằng tokens khi có tokens', () => {
  const htmlTokens = buildRubyHtml('你好', [{ text: '你好', py: 'nǐ hǎo' }]);
  assert.strictEqual(htmlTokens, '<ruby>你好<rt>nǐ hǎo</rt></ruby>');
});

runTest('buildRubyHtml: Fallback tách từng chữ khi không có tokens', () => {
  const htmlFallback = buildRubyHtml('你好', null, { '你': 'nǐ', '好': 'hǎo' });
  assert.strictEqual(htmlFallback, '<ruby>你<rt>nǐ</rt></ruby><ruby>好<rt>hǎo</rt></ruby>');
});

runTest('buildRubyHtml: Giữ nguyên dấu câu tiếng Trung ngoài thẻ ruby', () => {
  const htmlPunct = buildRubyHtml('你好，世界！', null, { '你': 'nǐ', '好': 'hǎo', '世': 'shì', '界': 'jiè' });
  assert.strictEqual(htmlPunct, '<ruby>你<rt>nǐ</rt></ruby><ruby>好<rt>hǎo</rt></ruby>，<ruby>世<rt>shì</rt></ruby><ruby>界<rt>jiè</rt></ruby>！');
});

// ============================================================================
// 13. Kiểm tra tương thích tiến độ cũ (loadProgress backward compatibility)
// ============================================================================

runTest('loadProgress: Nạp tiến độ cũ an toàn không làm mất dữ liệu đã có', () => {
  const legacyData = {
    lessons: { 'intro-u1-l1': { stars: 3, best: 95 } },
    checkpoints: { 'intro-u1': 85 },
    hardWords: { '怕': 2 }
  };
  const mockStorage = {
    'zh_legacy_key': JSON.stringify(legacyData)
  };
  global.localStorage = {
    getItem: (k) => mockStorage[k] || null,
    setItem: (k, v) => { mockStorage[k] = v; }
  };

  const loaded = loadProgress('zh_legacy_key');
  assert.strictEqual(loaded.lessons['intro-u1-l1'].stars, 3);
  assert.strictEqual(loaded.lessons['intro-u1-l1'].best, 95);
  assert.strictEqual(loaded.checkpoints['intro-u1'], 85);
  assert.strictEqual(loaded.hardWords['怕'], 2);
  assert.ok(typeof loaded.learnedWords === 'object', 'learnedWords phải được khởi tạo an toàn');
  assert.ok(Array.isArray(loaded.savedCards), 'savedCards phải được khởi tạo an toàn');
});

// ============================================================================
// 14. Kiểm tra quy tắc mới (Sửa lần 2): Nhóm >= 60% xong, sao đúng ngưỡng, nhãn bước <= 4/4
// ============================================================================

runTest('Quy tắc mới: nhóm 50% -> không tính xong, không sao, không mở bài kế', () => {
  const prog = { lessons: {}, checkpoints: {}, hardWords: {}, learnedWords: {} };
  const updated = saveGroupProgress(prog, 'intro-u1-l1', 0, {
    pct: 50,
    correctCount: 2,
    totalCount: 4,
    correctWords: ['啊', '喔'],
    wrongWords: ['鹅', '衣']
  });

  assert.strictEqual(updated.lessons['intro-u1-l1'].groups[0].done, false);
  assert.strictEqual(updated.lessons['intro-u1-l1'].groups[0].pct, 50);
  assert.strictEqual(updated.lessons['intro-u1-l1'].stars, 0);
  assert.strictEqual(isLessonUnlocked(CURRICULUM, updated, 'intro-u1-l2'), false);
});

runTest('Quy tắc mới: nhóm 80% -> xong (done = true)', () => {
  const prog = { lessons: {}, checkpoints: {}, hardWords: {}, learnedWords: {} };
  const updated = saveGroupProgress(prog, 'intro-u1-l1', 0, {
    pct: 80,
    correctCount: 4,
    totalCount: 5,
    correctWords: ['啊', '喔', '鹅', '衣'],
    wrongWords: ['乌']
  });

  assert.strictEqual(updated.lessons['intro-u1-l1'].groups[0].done, true);
  assert.strictEqual(updated.lessons['intro-u1-l1'].groups[0].pct, 80);
});

runTest('Quy tắc mới: bài đủ nhóm -> sao đúng ngưỡng (3 sao >= 90%, 2 sao >= 75%, 1 sao >= 60%)', () => {
  // Bài 2 nhóm nhưng 1 nhóm 50% (< 60%) -> chưa xong, 0 sao
  const incompleteRes = calculateLessonResult(2, {
    0: { done: true, pct: 85 },
    1: { done: false, pct: 50 }
  });
  assert.strictEqual(incompleteRes.isComplete, false);
  assert.strictEqual(incompleteRes.stars, 0);

  // Đủ mọi nhóm: trung bình 92% -> 3 sao
  const res3 = calculateLessonResult(2, {
    0: { done: true, pct: 90 },
    1: { done: true, pct: 94 }
  });
  assert.strictEqual(res3.isComplete, true);
  assert.strictEqual(res3.pct, 92);
  assert.strictEqual(res3.stars, 3);

  // Đủ mọi nhóm: trung bình 78% -> 2 sao
  const res2 = calculateLessonResult(2, {
    0: { done: true, pct: 76 },
    1: { done: true, pct: 80 }
  });
  assert.strictEqual(res2.isComplete, true);
  assert.strictEqual(res2.pct, 78);
  assert.strictEqual(res2.stars, 2);

  // Đủ mọi nhóm: trung bình 65% -> 1 sao
  const res1 = calculateLessonResult(2, {
    0: { done: true, pct: 60 },
    1: { done: true, pct: 70 }
  });
  assert.strictEqual(res1.isComplete, true);
  assert.strictEqual(res1.pct, 65);
  assert.strictEqual(res1.stars, 1);
});

runTest('Quy tắc mới: nhãn bước không vượt 4/4 và khi xong hiện Hoàn thành', () => {
  assert.strictEqual(getStepSummaryLabel(1, 'Phần 1 (1–5)'), 'Bước 1/4 • Phần 1 (1–5)');
  assert.strictEqual(getStepSummaryLabel(2, 'Phần 1 (1–5)'), 'Bước 2/4 • Phần 1 (1–5)');
  assert.strictEqual(getStepSummaryLabel(3, 'Phần 1 (1–5)'), 'Bước 3/4 • Phần 1 (1–5)');
  assert.strictEqual(getStepSummaryLabel(4, 'Phần 1 (1–5)'), 'Bước 4/4 • Phần 1 (1–5)');
  assert.strictEqual(getStepSummaryLabel(5, 'Phần 1 (1–5)'), 'Hoàn thành Phần 1 (1–5)');
  assert.strictEqual(getStepSummaryLabel(6, 'Phần 1 (1–5)'), 'Hoàn thành Phần 1 (1–5)');
});

// ============================================================================
// KẾT LUẬN & IN KẾT QUẢ
// ============================================================================

console.log(`OK ${testCount} tests`);
