/**
 * tests/talk.test.js
 * Unit tests cho module Luyện nói tiếng Trung (talk.js) và kịch bản (talk-scenarios.js).
 * Chạy bằng node thuần: node tests/talk.test.js
 */

const assert = require('assert');
const {
  buildCharPinyinMap,
  splitPinyin,
  parseSyllable,
  diagnose,
  matchIntent,
  scoreTurn,
  TalkPractice
} = require('../talk.js');
const { TALK_SCENARIOS } = require('../data/zh/talk-scenarios.js');
const { CHAR_PINYIN } = require('../data/zh/char-pinyin.js');
const { TALK_DIALOGUES } = require('../data/zh/talk-dialogues.js');

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

console.log('=== BẮT ĐẦU KIỂM TRA MODULE LUYỆN NÓI (TALK PRACTICE) ===\n');

// ============================================================================
// 1. Kiểm tra tách âm tiết splitPinyin(py)
// ============================================================================
runTest('splitPinyin: Tách từ đơn có dấu thanh (shì, lǜ, ér, zhuàng)', () => {
  assert.deepStrictEqual(splitPinyin('shì'), ['shì']);
  assert.deepStrictEqual(splitPinyin('lǜ'), ['lǜ']);
  assert.deepStrictEqual(splitPinyin('ér'), ['ér']);
  assert.deepStrictEqual(splitPinyin('zhuàng'), ['zhuàng']);
});

runTest('splitPinyin: Tách chuỗi có dấu cách (nǐ hǎo, wǒ shì xuésheng)', () => {
  assert.deepStrictEqual(splitPinyin('nǐ hǎo'), ['nǐ', 'hǎo']);
  assert.deepStrictEqual(splitPinyin('wǒ shì xuésheng'), ['wǒ', 'shì', 'xué', 'sheng']);
});

runTest('splitPinyin: Tách từ ghép pinyin viết liền có dấu thanh', () => {
  const xie = splitPinyin('xièxie');
  assert.deepStrictEqual(xie, ['xiè', 'xie']);

  const dui = splitPinyin('duìbuqǐ');
  assert.deepStrictEqual(dui, ['duì', 'bu', 'qǐ']);
});

// ============================================================================
// 2. Kiểm tra phân tích âm tiết parseSyllable(syl)
// ============================================================================
runTest('parseSyllable: shì -> { initial: "sh", final: "i", tone: 4 }', () => {
  const res = parseSyllable('shì');
  assert.strictEqual(res.initial, 'sh');
  assert.strictEqual(res.final, 'i');
  assert.strictEqual(res.tone, 4);
});

runTest('parseSyllable: lǜ -> { initial: "l", final: "ü", tone: 4 }', () => {
  const res = parseSyllable('lǜ');
  assert.strictEqual(res.initial, 'l');
  assert.strictEqual(res.final, 'ü');
  assert.strictEqual(res.tone, 4);
});

runTest('parseSyllable: ér -> { initial: "", final: "er", tone: 2 }', () => {
  const res = parseSyllable('ér');
  assert.strictEqual(res.initial, '');
  assert.strictEqual(res.final, 'er');
  assert.strictEqual(res.tone, 2);
});

runTest('parseSyllable: zhuàng -> { initial: "zh", final: "uang", tone: 4 }', () => {
  const res = parseSyllable('zhuàng');
  assert.strictEqual(res.initial, 'zh');
  assert.strictEqual(res.final, 'uang');
  assert.strictEqual(res.tone, 4);
});

runTest('parseSyllable: Dạng số thanh (shi4, lv4, er2, zhuang4)', () => {
  assert.deepStrictEqual(parseSyllable('shi4'), { initial: 'sh', final: 'i', tone: 4 });
  assert.deepStrictEqual(parseSyllable('lv4'), { initial: 'l', final: 'ü', tone: 4 });
  assert.deepStrictEqual(parseSyllable('er2'), { initial: '', final: 'er', tone: 2 });
  assert.deepStrictEqual(parseSyllable('zhuang4'), { initial: 'zh', final: 'uang', tone: 4 });
});

// ============================================================================
// 3. Kiểm tra buildCharPinyinMap & diagnose
// ============================================================================
const sampleWords = {
  '是': { py: 'shì' },
  '四': { py: 'sì' },
  '买': { py: 'mǎi' },
  '卖': { py: 'mài' },
  '你好': { py: 'nǐ hǎo' }
};
const charMap = buildCharPinyinMap(sampleWords);

runTest('buildCharPinyinMap: Trích xuất pinyin chữ đơn và chữ trong từ ghép', () => {
  assert.strictEqual(charMap['是'], 'shì');
  assert.strictEqual(charMap['四'], 'sì');
  assert.strictEqual(charMap['买'], 'mǎi');
  assert.strictEqual(charMap['卖'], 'mài');
  assert.strictEqual(charMap['你'], 'nǐ');
  assert.strictEqual(charMap['好'], 'hǎo');
});

runTest('diagnose: Chẩn đoán 是 vs 四 (Lỗi âm đầu initial: sh vs s)', () => {
  const res = diagnose('是', '四', charMap);
  assert.strictEqual(res.type, 'initial');
  assert.strictEqual(res.diff.exp, 'sh');
  assert.strictEqual(res.diff.hrd, 's');
  assert.ok(res.advice.includes('sh') && res.advice.includes('s'));
});

runTest('diagnose: Chẩn đoán 买 vs 卖 (Lỗi thanh điệu tone: 3 vs 4)', () => {
  const res = diagnose('买', '卖', charMap);
  assert.strictEqual(res.type, 'tone');
  assert.strictEqual(res.diff.exp, 3);
  assert.strictEqual(res.diff.hrd, 4);
  assert.ok(res.advice.includes('Thanh 3') || res.advice.includes('214'));
});

runTest('diagnose: Chẩn đoán đúng chuẩn 100% (type: "ok")', () => {
  const res = diagnose('是', '是', charMap);
  assert.strictEqual(res.type, 'ok');
});

// ============================================================================
// 4. Kiểm tra matchIntent(transcript, accept)
// ============================================================================
runTest('matchIntent: 你叫什么名字 khớp ý "我叫 + tên"', () => {
  const accept = {
    pattern: /(?:我叫|我是|名字叫|叫)\s*([^\s,，。！？]+)/i,
    required: ['叫']
  };

  const res1 = matchIntent('我叫李明', accept);
  assert.strictEqual(res1.ok, true);
  assert.strictEqual(res1.slots.name, '李明');

  const res2 = matchIntent('你好，我叫王小明。', accept);
  assert.strictEqual(res2.ok, true);
  assert.strictEqual(res2.slots.name, '王小明');

  const resFail = matchIntent('我是学生', accept);
  assert.strictEqual(resFail.ok, false);
});

runTest('matchIntent: Kiểm tra anyOf keywords (uống trà hoặc cà phê)', () => {
  const accept = { anyOf: ['茶', '咖啡', '喝'] };
  assert.strictEqual(matchIntent('我想喝绿茶', accept).ok, true);
  assert.strictEqual(matchIntent('我要一杯热咖啡', accept).ok, true);
  assert.strictEqual(matchIntent('我想吃米饭', accept).ok, false);
});

// ============================================================================
// 5. Kiểm tra scoreTurn(transcript, answers)
// ============================================================================
runTest('scoreTurn: Tính điểm đúng 100% khi khớp chính xác', () => {
  const answers = [
    { zh: '我叫李明。', py: 'Wǒ jiào Lǐ Míng.', vi: 'Tôi tên Lý Minh.' },
    { zh: '我叫王小明。', py: 'Wǒ jiào Wáng Xiǎomíng.', vi: 'Tôi tên Vương Tiểu Minh.' }
  ];
  const res = scoreTurn('我叫李明', answers);
  assert.strictEqual(res.score, 100);
  assert.strictEqual(res.bestAnswer.zh, '我叫李明。');
  assert.strictEqual(res.matched, true);
});

runTest('scoreTurn: So khớp với câu gần nhất trong danh sách mẫu', () => {
  const answers = [
    { zh: '你好！我也很高兴认识你。' },
    { zh: '你好！认识你很高兴。' }
  ];
  const res = scoreTurn('你好认识你很高兴', answers);
  assert.strictEqual(res.score, 100);
  assert.strictEqual(res.bestAnswer.zh, '你好！认识你很高兴。');
});

// ============================================================================
// 6. Kiểm tra tính toàn vẹn của dữ liệu TALK_SCENARIOS
// ============================================================================
runTest('TALK_SCENARIOS: Có ít nhất 8 tình huống hội thoại', () => {
  assert.ok(Array.isArray(TALK_SCENARIOS));
  assert.ok(TALK_SCENARIOS.length >= 8, `Cần ít nhất 8 tình huống, hiện có ${TALK_SCENARIOS.length}`);
});

runTest('TALK_SCENARIOS: Mỗi tình huống có >= 5 lượt người học và next trỏ tới lượt có thật', () => {
  TALK_SCENARIOS.forEach((sc, index) => {
    assert.ok(sc.id, `Tình huống #${index} thiếu ID`);
    assert.ok(sc.title, `Tình huống ${sc.id} thiếu title`);
    assert.ok(sc.npc && sc.npc.name, `Tình huống ${sc.id} thiếu npc`);
    assert.ok(sc.turns && typeof sc.turns === 'object', `Tình huống ${sc.id} thiếu turns`);

    const turnKeys = Object.keys(sc.turns);
    assert.ok(turnKeys.length >= 5, `Tình huống ${sc.id} cần >= 5 lượt người học, hiện có ${turnKeys.length}`);

    // Kiểm tra tính toàn vẹn của mọi next và branch
    for (const [turnId, turnData] of Object.entries(sc.turns)) {
      assert.ok(turnData.npc && turnData.npc.zh, `Turn ${turnId} in ${sc.id} thiếu npc.zh`);
      assert.ok(turnData.user && turnData.user.goal, `Turn ${turnId} in ${sc.id} thiếu user.goal`);
      assert.ok(Array.isArray(turnData.user.answers) && turnData.user.answers.length > 0, `Turn ${turnId} in ${sc.id} thiếu answers`);

      // Kiểm tra next
      const nextId = turnData.user.next;
      if (nextId !== null) {
        assert.ok(sc.turns[nextId], `Lỗi trong ${sc.id} tại ${turnId}: next "${nextId}" không tồn tại`);
      }

      // Kiểm tra branch nếu có
      if (turnData.user.branch && Array.isArray(turnData.user.branch.choices)) {
        for (const choice of turnData.user.branch.choices) {
          assert.ok(sc.turns[choice.next], `Lỗi branch trong ${sc.id} tại ${turnId}: choice next "${choice.next}" không tồn tại`);
        }
      }
    }
  });
});

// ============================================================================
// 7. Kiểm tra các sửa đổi mới: Lạc đề, CHAR_PINYIN, Zero-initial, TALK_DIALOGUES
// ============================================================================

runTest('Trò chuyện nhập vai: Lạc đề (off-topic) không sinh lỗi phát âm', () => {
  const mockScenario = {
    id: 'test_nationality',
    title: 'Hỏi quốc tịch',
    initialTurn: 't1',
    turns: {
      t1: {
        npc: { zh: '你是哪国人？' },
        user: {
          accept: { anyOf: ['中国', '越南', '美国', '人'] },
          answers: [
            { zh: '我是越南人。' },
            { zh: '我是中国人。' }
          ],
          next: null
        }
      }
    }
  };

  TalkPractice.roleplayState = {
    activeScenario: mockScenario,
    currentTurnId: 't1',
    messages: [],
    failCount: 0,
    turnStartTime: Date.now(),
    totalResponseTime: 0,
    responseCount: 0,
    hintCount: 0,
    turnScores: [],
    commonErrors: [],
    isFinished: false
  };
  TalkPractice.charPinyinMap = buildCharPinyinMap(null, CHAR_PINYIN);

  // Người học trả lời câu hoàn toàn lạc đề: "我喜欢猫" khi được hỏi quốc tịch
  TalkPractice.evaluateRoleplayTurn('我喜欢猫');

  // Lạc đề không được đem so từng chữ để tạo lỗi phát âm (như 是 -> 喜)
  assert.strictEqual(TalkPractice.roleplayState.commonErrors.length, 0, 'Câu lạc đề không được ghi vào danh sách lỗi phát âm commonErrors');

  const userMsg = TalkPractice.roleplayState.messages.find(m => m.sender === 'user');
  assert.ok(userMsg, 'Phải ghi nhận tin nhắn của người học');
  assert.strictEqual(userMsg.offTopic, true, 'Tin nhắn phải được đánh dấu offTopic');
  assert.strictEqual(userMsg.advices.length, 0, 'Tin nhắn lạc đề không được có lời khuyên lỗi phát âm từng chữ');
});

runTest('CHAR_PINYIN: Chữ ngoài HSK1 tra cứu thành công và chẩn đoán đúng pinyin (猫 māo, 喜 xǐ)', () => {
  const map = buildCharPinyinMap(null, CHAR_PINYIN);
  assert.strictEqual(map['猫'], 'māo', 'Chữ 猫 phải có pinyin là māo');
  assert.strictEqual(map['喜'], 'xǐ', 'Chữ 喜 phải có pinyin là xǐ');

  // Chẩn đoán lỗi giữa 2 chữ ngoài HSK1
  const diag = diagnose('猫', '喜', map);
  assert.strictEqual(diag.type, 'initial');
  assert.strictEqual(diag.expectedPy, 'māo');
  assert.strictEqual(diag.heardPy, 'xǐ');
  assert.ok(!diag.advice.includes('Máy nhận diện được'), 'Không được đưa ra nhận xét chung chung');
  assert.ok(diag.advice.includes('māo') && diag.advice.includes('xǐ'), 'Lời khuyên phải chứa pinyin chuẩn');
});

runTest('diagnose: Âm tiết không có âm đầu (Zero-initial) cho câu nhận xét tự nhiên, không chứa rỗng ""', () => {
  const map = buildCharPinyinMap(null, CHAR_PINYIN);

  // 1. Từ đích không có âm đầu (啊 ā), người học đọc có âm đầu (把 bǎ)
  const diag1 = diagnose('啊', '把', map);
  assert.strictEqual(diag1.type, 'initial');
  assert.ok(!diag1.advice.includes('""'), 'Nhận xét không được chứa dấu ngoặc kép rỗng ""');
  assert.ok(diag1.advice.includes('không có phụ âm đầu'), 'Nhận xét phải nói rõ từ đích không có phụ âm đầu');
  assert.ok(diag1.advice.includes('thêm âm b'), 'Nhận xét phải chỉ rõ âm đầu bị thêm');

  // 2. Từ đích có âm đầu (把 bǎ), người học đọc không có âm đầu (啊 ā)
  const diag2 = diagnose('把', '啊', map);
  assert.strictEqual(diag2.type, 'initial');
  assert.ok(!diag2.advice.includes('""'), 'Nhận xét không được chứa dấu ngoặc kép rỗng ""');
  assert.ok(diag2.advice.includes('bắt đầu bằng phụ âm "b"'), 'Nhận xét phải nói rõ từ đích bắt đầu bằng phụ âm "b"');
});

runTest('TALK_DIALOGUES: Dữ liệu hợp lệ (>= 10 bài, mỗi bài >= 8 câu, có cả A và B, pinyin không chứa số)', () => {
  assert.ok(Array.isArray(TALK_DIALOGUES), 'TALK_DIALOGUES phải là mảng');
  assert.ok(TALK_DIALOGUES.length >= 10, `Cần >= 10 bài hội thoại đời thường, hiện có ${TALK_DIALOGUES.length}`);

  TALK_DIALOGUES.forEach((d, idx) => {
    assert.ok(d.id, `Bài #${idx} thiếu id`);
    assert.ok(d.title, `Bài #${idx} thiếu title`);
    assert.ok(d.scene, `Bài #${idx} thiếu scene`);
    assert.ok(d.roleA && d.roleA.name, `Bài #${idx} thiếu roleA.name`);
    assert.ok(d.roleB && d.roleB.name, `Bài #${idx} thiếu roleB.name`);
    assert.ok(Array.isArray(d.sentences), `Bài #${idx} thiếu mảng sentences`);
    assert.ok(d.sentences.length >= 8, `Bài ${d.id} cần >= 8 câu, hiện có ${d.sentences.length}`);

    const roles = new Set(d.sentences.map(s => s.who));
    assert.ok(roles.has('A'), `Bài ${d.id} thiếu câu của vai A`);
    assert.ok(roles.has('B'), `Bài ${d.id} thiếu câu của vai B`);

    d.sentences.forEach((s, sIdx) => {
      assert.ok(s.zh, `Câu #${sIdx} trong ${d.id} thiếu chữ Hán zh`);
      assert.ok(s.py, `Câu #${sIdx} trong ${d.id} thiếu pinyin py`);
      assert.ok(s.vi, `Câu #${sIdx} trong ${d.id} thiếu nghĩa tiếng Việt vi`);
      assert.strictEqual(/[0-9]/.test(s.py), false, `Pinyin câu #${sIdx} trong ${d.id} không được chứa số: "${s.py}"`);
    });
  });
});

console.log(`\n========================================`);
console.log(`OK ${testCount} tests`);
console.log(`Tất cả các bài kiểm tra Luyện nói ĐÃ VƯỢT QUA thành công!\n`);
