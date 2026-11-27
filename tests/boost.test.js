/**
 * tests/boost.test.js
 * Kiểm tra lõi chung (boost.js), Nghe gõ câu (dictation.js), Đọc và dịch (reading.js + dữ liệu).
 * Chạy: node tests/boost.test.js
 */
const assert = require('assert');

// localStorage giả cho Node
const mem = {};
global.localStorage = {
  getItem: k => (k in mem ? mem[k] : null),
  setItem: (k, v) => { mem[k] = String(v); },
  removeItem: k => { delete mem[k]; },
  clear: () => { Object.keys(mem).forEach(k => delete mem[k]); }
};
global.window = global;

require('../data/zh/vocab.js');
require('../data/zh/curriculum.js');
require('../data/zh/hsk1-words-a.js');
require('../data/zh/hsk1-words-b.js');
require('../data/zh/vocab-merge.js');
require('../data/zh/dialogues.js');
require('../data/en/words-a.js');
require('../data/en/words-b.js');
require('../data/en/curriculum.js');
require('../data/en/dialogues.js');
require('../data/zh/reading.js');
require('../data/en/reading.js');
const B = require('../boost.js');
const { collectSentences, pickSession } = require('../dictation.js');
const { verdict } = require('../reading.js');

let pass = 0;
let fail = 0;
function test(name, fn) {
  try { fn(); pass++; console.log(`  ✓ ${name}`); } catch (e) { fail++; console.error(`  ✗ ${name}\n    ${e.message}`); }
}

console.log('=== boost.js: so câu ===');
const cmp = B.SentenceCheck.compare;
test('Tiếng Anh gõ đúng (khác hoa thường, dấu câu) là đúng', () => {
  const r = cmp('en', 'Hello, how are you today?', 'hello how are you today');
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.accuracy, 100);
});
test('Tiếng Anh thiếu một từ: từ đó tô sai', () => {
  const r = cmp('en', 'I am fine, thank you.', 'I am fine thank');
  assert.strictEqual(r.ok, false);
  assert.deepStrictEqual(r.wrong, ['you']);
  assert.strictEqual(r.accuracy, 80);
});
test("Tiếng Anh: bỏ dấu nháy (dont = don't) vẫn đúng", () => {
  assert.strictEqual(cmp('en', "I don't know.", 'i dont know').ok, true);
});
test('Tiếng Anh có từ thừa thì chưa đúng', () => {
  const r = cmp('en', 'I like tea.', 'I like green tea');
  assert.strictEqual(r.ok, false);
  assert.strictEqual(r.extra, 1);
});
test('Tiếng Trung gõ pinyin không dấu, viết liền hay cách đều đúng', () => {
  const t = '很高兴认识你。';
  const py = 'Hěn gāoxìng rènshi nǐ.';
  assert.strictEqual(cmp('zh', t, 'hen gao xing ren shi ni', { py }).ok, true);
  assert.strictEqual(cmp('zh', t, 'hengaoxingrenshini', { py }).ok, true);
  assert.strictEqual(cmp('zh', t, 'hen3 gao1xing4 ren4shi ni3', { py }).ok, true);
});
test('Tiếng Trung pinyin sai một từ: từ đó tô sai', () => {
  const r = cmp('zh', '我很好，你呢？', 'wo hen hao ni', { py: 'Wǒ hěn hǎo, nǐ ne?' });
  assert.strictEqual(r.ok, false);
  assert.deepStrictEqual(r.wrong, ['ne']);
  assert.strictEqual(r.mode, 'pinyin');
});
test('Tiếng Trung gõ chữ Hán: so từng chữ', () => {
  const r = cmp('zh', '我很好，你呢？', '我很好你', { py: 'Wǒ hěn hǎo, nǐ ne?' });
  assert.strictEqual(r.mode, 'hanzi');
  assert.deepStrictEqual(r.wrong, ['呢']);
  assert.strictEqual(cmp('zh', '我很好，你呢？', '我很好，你呢', {}).ok, true);
});
test('render trả về HTML có đánh dấu đúng/sai', () => {
  const html = B.SentenceCheck.render(cmp('en', 'I like tea', 'I tea'));
  assert.ok(html.includes('is-bad'));
  assert.ok(html.includes('is-ok'));
});

console.log('\n=== boost.js: chấm bài dịch ===');
test('normalizeVi bỏ dấu và đ', () => {
  assert.strictEqual(B.TextUtil.normalizeVi('Đi học, ĐƯỢC!'), 'di hoc duoc');
});
test('Đủ ý chính, có dấu hay không dấu đều 100%', () => {
  const keys = ['gia đình|nhà', 'bốn|4', 'người'];
  assert.strictEqual(B.scoreTranslation('Gia đình tôi có bốn người.', keys).score, 100);
  assert.strictEqual(B.scoreTranslation('nha toi co 4 nguoi', keys).score, 100);
});
test('Thiếu ý thì điểm giảm và liệt kê ý thiếu', () => {
  const r = B.scoreTranslation('Nhà tôi có người', ['nhà', 'bốn|4', 'người']);
  assert.strictEqual(r.score, 67);
  assert.deepStrictEqual(r.misses, ['bốn']);
});
test('Khớp cả từ, không khớp một phần chữ ("nhanh" không tính là "nhà")', () => {
  assert.strictEqual(B.scoreTranslation('chạy nhanh', ['nhà']).score, 0);
});
test('verdict theo mức điểm', () => {
  assert.strictEqual(verdict(90).text, 'Rất sát nghĩa');
  assert.strictEqual(verdict(20).cls, 'pb-bad');
});

console.log('\n=== boost.js: tra từ ===');
test('Tra từ tiếng Trung lấy đoạn dài nhất có trong từ điển', () => {
  const r = B.lookupWord('朋友们');
  assert.strictEqual(r.word, '朋友');
  assert.ok(r.phonetic && r.vi);
});
test('Tra từ tiếng Anh nhận dạng số nhiều / quá khứ', () => {
  assert.strictEqual(B.lookupWord('books').word, 'book');
  assert.strictEqual(B.lookupWord('Friends,').word, 'friend');
});
test('Từ không có trong từ điển trả về null', () => {
  assert.strictEqual(B.lookupWord('zzzqqq'), null);
});
test('segmentZh tách câu thành từ trong từ điển', () => {
  const seg = B.segmentZh('我的朋友叫小月。').map(v => v.hanzi);
  assert.ok(seg.includes('朋友'));
});

console.log('\n=== boost.js: kho ôn chung ===');
test('Từ đã học ở Lộ trình vào thẻ ôn (hạn ngày mai), từ khó ôn ngay', () => {
  localStorage.clear();
  localStorage.setItem('zh_learn_progress_v1', JSON.stringify({ learnedWords: { '你好': 1 }, hardWords: { '朋友': 2 } }));
  const added = B.ReviewBank.sync('zh');
  assert.strictEqual(added, 2);
  const sm2 = JSON.parse(localStorage.getItem('hsk_sm2_data'));
  const idHard = B.ReviewBank.findId('zh', '朋友');
  const idLearned = B.ReviewBank.findId('zh', '你好');
  assert.ok(sm2[idHard] && sm2[idLearned]);
  assert.ok(sm2[idHard].dueDate < sm2[idLearned].dueDate);
  assert.strictEqual(B.ReviewBank.dueCount('zh'), 1);
  assert.strictEqual(B.ReviewBank.sync('zh'), 0, 'chạy lại không thêm trùng');
});
test('Không ghi đè thẻ đã có tiến độ', () => {
  localStorage.clear();
  const id = B.ReviewBank.findId('zh', '你好');
  localStorage.setItem('hsk_sm2_data', JSON.stringify({ [id]: { interval: 6, repetition: 2, efactor: 2.5, dueDate: '2099-01-01' } }));
  assert.strictEqual(B.ReviewBank.addWord('zh', '你好'), 'exists');
  assert.strictEqual(JSON.parse(localStorage.getItem('hsk_sm2_data'))[id].interval, 6);
});
test('Tiếng Anh: mã thẻ là chính từ, xóa khóa "undefined" cũ', () => {
  localStorage.clear();
  localStorage.setItem('en_sm2_data', JSON.stringify({ undefined: { dueDate: '2000-01-01' } }));
  assert.strictEqual(B.ReviewBank.addWord('en', 'books'), 'added');
  B.ReviewBank.sync('en');
  const sm2 = JSON.parse(localStorage.getItem('en_sm2_data'));
  assert.ok(sm2.book);
  assert.ok(!('undefined' in sm2));
  assert.strictEqual(B.ReviewBank.addWord('en', 'qwertyz'), 'unknown');
});

console.log('\n=== boost.js: phút học ===');
test('addStudySeconds cộng theo ngày và ngôn ngữ', () => {
  let st = B.addStudySeconds({}, '2026-01-01', 'zh', 10);
  st = B.addStudySeconds(st, '2026-01-01', 'en', 20);
  assert.strictEqual(st.days['2026-01-01'].t, 30);
  assert.strictEqual(st.days['2026-01-01'].zh, 10);
});
test('Chỉ giữ 90 ngày gần nhất', () => {
  let st = {};
  for (let i = 0; i < 100; i++) st = B.addStudySeconds(st, `2026-01-${String(i).padStart(3, '0')}`, 'zh', 1);
  assert.strictEqual(Object.keys(st.days).length, 90);
});
test('Mục tiêu phút chỉ nhận giá trị hợp lệ', () => {
  localStorage.clear();
  B.StudyTimer.setGoal(20);
  assert.strictEqual(B.StudyTimer.goal(), 20);
  B.StudyTimer.setGoal(7);
  assert.strictEqual(B.StudyTimer.goal(), 15);
});
test('goalStreak đếm ngày liên tiếp đạt mục tiêu', () => {
  localStorage.clear();
  B.StudyTimer.setGoal(10);
  const d = new Date();
  let st = {};
  for (let i = 1; i <= 3; i++) {
    const x = new Date(d); x.setDate(d.getDate() - i);
    st = B.addStudySeconds(st, B.TextUtil.localDate(x), 'zh', 700);
  }
  localStorage.setItem('app_study_time_v1', JSON.stringify(st));
  assert.strictEqual(B.StudyTimer.goalStreak(), 3);
});

console.log('\n=== boost.js: chọn trình độ ===');
test('Bỏ qua cấp Nhập môn: mọi bài intro tính là xong, kiểm tra chặng đạt', () => {
  const res = B.applyLevelSkip({}, window.CURRICULUM, ['intro']);
  assert.strictEqual(res.count, 10);
  const intro = window.CURRICULUM.levels.find(l => l.id === 'intro');
  intro.units.forEach(u => assert.ok(res.progress.checkpoints[u.id] >= 80));
  assert.ok(Object.values(res.progress.lessons).every(l => l.stars >= 1 && l.skipped));
});
test('Không ghi đè bài đã học thật', () => {
  const first = window.CURRICULUM.levels[0].units[0].lessons[0].id;
  const res = B.applyLevelSkip({ lessons: { [first]: { stars: 3, best: 100 } } }, window.CURRICULUM, ['intro']);
  assert.strictEqual(res.progress.lessons[first].stars, 3);
  assert.strictEqual(res.count, 9);
});
test('LevelPick.choose lưu lựa chọn và tiến độ', () => {
  localStorage.clear();
  const n = B.LevelPick.choose('en', 'basic');
  assert.strictEqual(n, 10);
  assert.strictEqual(B.LevelPick.get('en'), 'basic');
  assert.ok(JSON.parse(localStorage.getItem('en_learn_progress_v1')).lessons);
});

console.log('\n=== Học thử trên trang chủ ===');
['en', 'zh'].forEach(lang => {
  test(`buildTryout(${lang}) có 6 bước, đáp án nằm trong lựa chọn`, () => {
    const steps = B.buildTryout(lang);
    assert.strictEqual(steps.length, 6);
    steps.filter(s => s.options).forEach(s => {
      assert.strictEqual(s.options.length, 4);
      assert.strictEqual(new Set(s.options).size, 4);
      assert.ok(s.answer >= 0);
    });
  });
});
test('Câu học thử tiếng Trung tự khớp với pinyin của nó', () => {
  B.buildTryout('zh').filter(s => s.text).forEach(s => {
    const input = s.py.normalize('NFD').replace(/[̀-ͯ]/g, '');
    assert.strictEqual(cmp('zh', s.text, input, { py: s.py }).ok, true);
  });
});

console.log('\n=== Nghe gõ câu ===');
['en', 'zh'].forEach(lang => {
  test(`collectSentences(${lang}) đủ câu, không trùng`, () => {
    const all = collectSentences(lang, 'mixed');
    assert.ok(all.length >= 50, `chỉ có ${all.length} câu`);
    assert.strictEqual(new Set(all.map(s => s.text)).size, all.length);
    assert.ok(collectSentences(lang, 'dialogues').length > 0);
    assert.ok(collectSentences(lang, 'examples').length > 0);
  });
});
test('Mỗi câu tiếng Trung tự khớp khi gõ đúng pinyin không dấu', () => {
  collectSentences('zh', 'mixed').slice(0, 200).forEach(s => {
    const input = s.py.normalize('NFD').replace(/[̀-ͯ]/g, '');
    assert.strictEqual(cmp('zh', s.text, input, { py: s.py }).ok, true, s.text);
  });
});
test('pickSession ưu tiên câu chưa gõ', () => {
  const list = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  const out = pickSession(list, { a: 1 }, 2, () => 0.5);
  assert.ok(out.every(s => s.id !== 'a'));
});

console.log('\n=== Dữ liệu Đọc và dịch ===');
[['zh', window.READING_ZH], ['en', window.READING_EN]].forEach(([lang, list]) => {
  test(`READING_${lang.toUpperCase()} hợp lệ`, () => {
    assert.ok(Array.isArray(list) && list.length >= 6);
    assert.strictEqual(new Set(list.map(t => t.id)).size, list.length);
    list.forEach(t => {
      assert.ok(t.title && t.titleVi && t.sentences.length >= 4, t.id);
      t.sentences.forEach(s => {
        assert.ok(lang === 'zh' ? (s.zh && s.py) : s.en, `${t.id}: thiếu câu gốc`);
        assert.ok(s.vi && Array.isArray(s.keys) && s.keys.length >= 1, `${t.id}: thiếu bản dịch / ý chính`);
        // Bản dịch mẫu phải đạt 100% theo chính ý chính của nó
        assert.strictEqual(B.scoreTranslation(s.vi, s.keys).score, 100, `${t.id}: "${s.vi}" không khớp ${JSON.stringify(B.scoreTranslation(s.vi, s.keys).misses)}`);
      });
    });
  });
});

console.log(`\nKết quả: ${pass} đạt, ${fail} lỗi`);
if (fail > 0) process.exit(1);
