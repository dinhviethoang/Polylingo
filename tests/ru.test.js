/**
 * tests/ru.test.js — Kiểm tra dữ liệu và lõi tiếng Nga (data/ru/*.js, data/ru/ru-core.js, russian.js).
 * Chạy: node tests/ru.test.js
 */
const assert = require('assert');

global.window = global;
const C = require('../data/ru/ru-core.js');
['alphabet', 'words-a', 'words-b', 'curriculum', 'cases', 'dialogues', 'talk-scenarios', 'talk-dialogues'].forEach(f => require(`../data/ru/${f}.js`));
const LANGS = (() => { const src = require('fs').readFileSync(require('path').join(__dirname, '..', 'languages.js'), 'utf8'); return new Function(src + '; return LANGUAGES;')(); })();

let n = 0;
function t(name, fn) {
  try { fn(); n++; } catch (e) { console.error('  ✗ ' + name); console.error(e); process.exit(1); }
}

const D = C.load();
const ACUTE = C.ACUTE;

t('Có 33 chữ cái, ít nhất 700 từ A1, 35 bài', () => {
  assert.strictEqual(D.letters.length, 33);
  assert.ok(D.words.length >= 700, `chỉ có ${D.words.length} từ`);
  assert.strictEqual(D.lessons.length, 35);
  assert.strictEqual(D.lessons.filter(l => l.checkpoint).length, 7);
});
t('Chữ cái đủ trường, chia đúng 4 nhóm', () => {
  D.letters.forEach(x => {
    assert.ok(x.upper && x.lower && x.latin && x.say && x.example && x.exampleVi && x.tip, `chữ ${x.upper} thiếu trường`);
    assert.ok([1, 2, 3, 4].includes(x.group), `chữ ${x.upper} nhóm ${x.group}`);
    assert.ok(['v', 'c', 's'].includes(x.type));
  });
  assert.strictEqual(D.letters.filter(x => x.type === 'v').length, 10);
  assert.strictEqual(D.letters.filter(x => x.type === 's').length, 2);
});
t('Mỗi từ có nghĩa, từ loại hợp lệ, id không trùng, đúng một trọng âm', () => {
  const ids = new Set();
  D.words.forEach(w => {
    assert.ok(w.vi, `thiếu nghĩa: ${w.word}`);
    assert.ok(C.POS_LABELS[w.pos], `từ loại lạ: ${w.word} ${w.pos}`);
    assert.ok(!ids.has(w.id), `trùng id ${w.id}`);
    ids.add(w.id);
    assert.ok(/^[Ѐ-ӿ́ ?!…,-]+$/.test(w.word), `có ký tự lạ: ${w.word}`);
    if (w.pos !== 'exp' && !/[\s-]/.test(w.plain) && C.vowelCount(w.plain) > 1) {
      const marks = (w.word.match(/́/g) || []).length + (w.plain.match(/ё/gi) || []).length;
      assert.strictEqual(marks, 1, `trọng âm sai: ${w.word}`);
    }
    if (w.word.includes(ACUTE)) assert.ok(/[аеиоуыэюяАЕИОУЫЭЮЯ]́/.test(w.word), `dấu trọng âm không nằm sau nguyên âm: ${w.word}`);
    if (w.ex) assert.ok(w.ex.ru && w.ex.vi, `câu ví dụ thiếu nghĩa: ${w.word}`);
  });
});
t('Danh từ có giống; động từ chia được đủ ngôi và quá khứ', () => {
  D.words.filter(w => w.pos === 'n').forEach(w => assert.ok(C.GENDER_LABELS[w.gender], `danh từ thiếu giống: ${w.word}`));
  D.words.filter(w => w.pos === 'v').forEach(w => {
    C.PRESENT.concat(C.PAST).forEach(f => assert.ok(C.conjugate(w, f), `không chia được ${w.word} ${f}`));
  });
  D.words.filter(w => w.pos === 'adj').forEach(w => assert.ok(C.adjForms(w), `không có đuôi tính từ: ${w.word}`));
});
t('Bài A1 có ≥19 từ và ngữ pháp kèm ví dụ; bài chữ cái có chữ', () => {
  D.lessons.forEach(l => {
    if (l.stage === 'alpha') { assert.ok(l.letters && l.letters.length, `bài ${l.no} thiếu chữ`); return; }
    assert.ok(l.wordIds.length >= 19, `bài ${l.no} chỉ có ${l.wordIds.length} từ`);
    assert.ok((l.grammar || []).length >= 1, `bài ${l.no} thiếu ngữ pháp`);
    l.grammar.forEach(g => assert.ok(g.p && g.vi && g.ex.length, `bài ${l.no} ngữ pháp thiếu ví dụ`));
  });
  assert.strictEqual(new Set(D.lessons.flatMap(l => l.letters || []).map(x => x.lower)).size, 33, 'bài chữ cái chưa phủ đủ 33 chữ');
});
t('Chia động từ nhóm I, II, phản thân, bất quy tắc', () => {
  const W = D.wordMap;
  const exp = {
    'читать': ['чита́ю', 'чита́ешь', 'чита́ет', 'чита́ем', 'чита́ете', 'чита́ют'],
    'говорить': ['говорю́', 'говори́шь', 'говори́т', 'говори́м', 'говори́те', 'говоря́т'],
    'учиться': ['учу́сь', 'у́чишься', 'у́чится', 'у́чимся', 'у́читесь', 'у́чатся'],
    'жить': ['живу́', 'живёшь', 'живёт', 'живём', 'живёте', 'живу́т'],
    'хотеть': ['хочу́', 'хо́чешь', 'хо́чет', 'хоти́м', 'хоти́те', 'хотя́т'],
    'мочь': ['могу́', 'мо́жешь', 'мо́жет', 'мо́жем', 'мо́жете', 'мо́гут']
  };
  Object.entries(exp).forEach(([id, forms]) => {
    assert.ok(W[id], `thiếu từ ${id}`);
    assert.deepStrictEqual(C.presentForms(W[id]), forms, id);
  });
  assert.deepStrictEqual(C.pastForms(W['идти']), ['шёл', 'шла', 'шло', 'шли']);
  assert.deepStrictEqual(C.pastForms(W['читать']), ['чита́л', 'чита́ла', 'чита́ло', 'чита́ли']);
  assert.deepStrictEqual(C.pastForms(W['нравиться']), ['нра́вился', 'нра́вилась', 'нра́вилось', 'нра́вились']);
  assert.strictEqual(C.verbGroup(W['говорить']), 'II');
  assert.strictEqual(C.verbGroup(W['читать']), 'I');
});
t('Đuôi tính từ theo quy tắc chính tả', () => {
  assert.deepStrictEqual(C.adjForms('но́вый'), { m: 'но́вый', f: 'но́вая', n: 'но́вое', pl: 'но́вые' });
  assert.deepStrictEqual(C.adjForms('хоро́ший'), { m: 'хоро́ший', f: 'хоро́шая', n: 'хоро́шее', pl: 'хоро́шие' });
  assert.deepStrictEqual(C.adjForms('си́ний'), { m: 'си́ний', f: 'си́няя', n: 'си́нее', pl: 'си́ние' });
  assert.deepStrictEqual(C.adjForms('большо́й'), { m: 'большо́й', f: 'больша́я', n: 'большо́е', pl: 'больши́е' });
  assert.strictEqual(C.adjForms('ру́сский').pl, 'ру́сские');
});
t('Chuyển tự và gõ phiên âm ra chữ Kirin', () => {
  assert.strictEqual(C.translit('молоко́'), 'molokó');
  assert.strictEqual(C.translit('щи'), 'shchi');
  assert.strictEqual(C.translit('ель'), "yel'");
  const cases = { privet: 'привет', zdravstvuyte: 'здравствуйте', novyy: 'новый', spasibo: 'спасибо', moy: 'мой', shchi: 'щи', yesli: 'если', eto: 'это', chay: 'чай', "den'": 'день', "pod''ezd": 'подъезд', zhurnal: 'журнал' };
  Object.entries(cases).forEach(([l, c]) => assert.strictEqual(C.latinToCyr(l), c, l));
});
t('Chấm đáp án gõ: bỏ qua trọng âm, ё = е, nhận phiên âm', () => {
  assert.ok(C.answerMatches('здра́вствуйте', 'здравствуйте'));
  assert.ok(C.answerMatches('здра́вствуйте', 'zdravstvuyte'));
  assert.ok(C.answerMatches('ёлка', 'елка'));
  assert.ok(C.answerMatches('пожа́луйста', 'pozhalujsta'));
  assert.ok(C.answerMatches('мать', 'mat'));
  assert.ok(C.answerMatches('Как дела́?', 'как дела'));
  assert.ok(!C.answerMatches('мать', 'мат'));
  assert.ok(!C.answerMatches('дом', 'dam'));
});
t('So câu nói (Luyện nói) và SM-2', () => {
  assert.strictEqual(C.compareText('Меня́ зову́т Нам.', 'меня зовут нам').score, 100);
  assert.ok(C.compareText('Здравствуйте, Анна Петровна!', 'здравствуйте').score < 70);
  let c = C.sm2(null, 5); assert.strictEqual(c.interval, 1);
  c = C.sm2(c, 5); assert.strictEqual(c.interval, 3);
  c = C.sm2(c, 1); assert.strictEqual(c.interval, 0);
});
t('6 cách: bảng biến cách đủ 6 dạng, bài luyện có đáp án khác phương án sai', () => {
  assert.strictEqual(D.cases.length, 6);
  D.declensions.concat(D.pronouns).forEach(x => assert.strictEqual(x.forms.length, 6, x.word));
  assert.ok(D.caseDrills.length >= 24);
  D.caseDrills.forEach(x => {
    assert.ok(x.s.includes('___'), x.s);
    assert.strictEqual(x.wrong.length, 3, x.s);
    assert.ok(!x.wrong.includes(x.answer), x.s);
    assert.ok(x.case >= 1 && x.case <= 6);
  });
});
t('languages.js bật tiếng Nga và mọi mục đều có người vẽ', () => {
  const ru = LANGS.find(l => l.id === 'ru');
  assert.ok(ru.ready);
  const studio = require('../russian.js');
  ru.sections.forEach(s => assert.ok(studio.SECTIONS.includes(s.id) || ['talk', 'dialogues'].includes(s.id), `mục ${s.id} chưa có giao diện`));
});
t('Hội thoại, kịch bản nhập vai, đóng vai A–B có chữ Nga, phiên âm, nghĩa', () => {
  const dia = global.window.RU_DIALOGUES;
  assert.ok(dia.length >= 10);
  dia.forEach(d => d.lines.forEach(l => assert.ok(l.ru && l.tr && l.vi && l.zh === l.ru && l.py, `hội thoại ${d.id} thiếu trường`)));
  const sc = global.window.RU_TALK_SCENARIOS;
  assert.ok(sc.length >= 8);
  sc.forEach(s => {
    const turns = Object.values(s.turns);
    assert.ok(turns.length >= 3, s.id);
    turns.forEach(tn => {
      assert.ok(tn.npc.ru && tn.npc.py && tn.npc.vi, `${s.id} ${tn.id} thiếu lời NPC`);
      assert.ok(tn.user.answers.length >= 2 && tn.user.goal, `${s.id} ${tn.id} thiếu câu mẫu`);
      assert.ok(!tn.user.accept.pattern, `${s.id} không dùng pattern rỗng`);
      // Mỗi câu mẫu phải tự khớp một từ khóa của lượt đó
      tn.user.answers.forEach(a => assert.ok(tn.user.accept.anyOf.some(k => a.ru.toLowerCase().replace(/ё/g, 'е').includes(k.replace(/ё/g, 'е'))), `${s.id} ${tn.id}: "${a.ru}" không khớp từ khóa`));
      if (tn.user.next) assert.ok(s.turns[tn.user.next], `${s.id} ${tn.id} trỏ tới lượt không có`);
    });
  });
  const ab = global.window.RU_TALK_DIALOGUES;
  assert.ok(ab.length >= 10);
  ab.forEach(d => { assert.ok(d.sentences.length >= 8, d.id); d.sentences.forEach(x => assert.ok(x.ru && x.py && x.vi)); });
});

console.log(`OK ${n} tests — tiếng Nga: ${D.letters.length} chữ, ${D.words.length} từ, ${D.lessons.length} bài, ${D.caseDrills.length} câu luyện cách`);
