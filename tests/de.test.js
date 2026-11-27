/**
 * tests/de.test.js — Kiểm tra dữ liệu và lõi tiếng Đức (data/de/*.js, data/de/de-core.js, german.js).
 * Chạy: node tests/de.test.js
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

require('../data/de/words-a.js');
require('../data/de/words-b.js');
require('../data/de/curriculum.js');
require('../data/de/sounds.js');
require('../data/de/grammar.js');
require('../data/de/dialogues.js');
require('../data/de/talk-scenarios.js');
const C = require('../data/de/de-core.js');
const LANGS = (() => { const src = fs.readFileSync(path.join(__dirname, '..', 'languages.js'), 'utf8'); return new Function(src + '; return LANGUAGES;')(); })();

let n = 0;
function t(name, fn) {
  try { fn(); n++; } catch (e) { console.error('  ✗ ' + name); console.error(e); process.exit(1); }
}

const D = C.load();

t('Có ít nhất 650 từ A1, 30 bài, 3 bài phát âm', () => {
  assert.ok(D.words.length >= 650, `chỉ có ${D.words.length} từ`);
  assert.strictEqual(D.lessons.length, 30);
  assert.strictEqual(D.lessons.filter(l => l.stage === 'sounds').length, 3);
});
t('Mỗi từ có nghĩa, từ loại hợp lệ, câu ví dụ có nghĩa, id không trùng', () => {
  const ids = new Set();
  D.words.forEach(w => {
    assert.ok(w.vi, `thiếu nghĩa: ${w.word}`);
    assert.ok(C.POS_LABELS[w.pos], `từ loại lạ: ${w.word} ${w.pos}`);
    assert.ok(!ids.has(w.id), `trùng id ${w.id}`);
    ids.add(w.id);
    assert.ok(w.ex && w.ex.de && w.ex.vi, `thiếu câu ví dụ: ${w.word}`);
    assert.ok(!/\|/.test(w.ex.de + w.ex.vi), `câu ví dụ lẫn dấu |: ${w.word}`);
  });
});
t('Danh từ có mạo từ viết hoa đúng, số nhiều bắt đầu bằng "die"', () => {
  D.words.filter(w => w.pos === 'n').forEach(w => {
    assert.ok(/^[A-ZÄÖÜ]/.test(w.word), `danh từ phải viết hoa: ${w.word}`);
    if (w.art) assert.ok(['der', 'die', 'das', 'pl'].includes(w.art), `mạo từ lạ: ${w.art} ${w.word}`);
    if (w.plural) assert.ok(/^die [A-ZÄÖÜ]/.test(w.plural), `số nhiều phải dạng "die …": ${w.word} → ${w.plural}`);
  });
  const withArt = D.words.filter(w => ['der', 'die', 'das'].includes(w.art));
  ['der', 'die', 'das'].forEach(a => assert.ok(withArt.filter(w => w.art === a).length >= 60, `quá ít danh từ ${a}`));
});
t('Câu ví dụ của danh từ có chứa danh từ đó (hoặc số nhiều)', () => {
  const bad = D.words.filter(w => w.pos === 'n' && w.art).filter(w => {
    const ex = C.fold(w.ex.de);
    const stem = C.fold(w.word).slice(0, Math.max(3, w.word.length - 2));
    const pl = w.plural ? C.fold(w.plural.replace(/^die /, '')).slice(0, 4) : '';
    return !ex.includes(stem) && !(pl && ex.includes(pl));
  }).map(w => w.word);
  assert.ok(bad.length <= 12, `nhiều danh từ có câu ví dụ không dùng từ đó: ${bad.join(', ')}`);
});
t('Mọi động từ có dạng ngôi er và Perfekt (trừ war, hatte, möchten)', () => {
  D.words.filter(w => w.pos === 'v' && !['war', 'hatte'].includes(w.word)).forEach(w => {
    assert.ok(w.forms.er, `thiếu dạng er: ${w.word}`);
    if (w.word !== 'möchten') assert.ok(/^(hat|ist) /.test(w.forms.perfekt), `Perfekt sai: ${w.word} → ${w.forms.perfekt}`);
    if (!/^sich /.test(w.word)) assert.ok(C.verbInfo(w), `không chia được: ${w.word}`);
  });
});
t('Chia động từ hiện tại đúng các dạng mẫu', () => {
  const W = word => D.words.find(x => x.word === word && x.pos === 'v');
  const P = (word, person) => C.conjugate(W(word), person);
  assert.strictEqual(P('wohnen', 'ich'), 'wohne');
  assert.strictEqual(P('arbeiten', 'du'), 'arbeitest');
  assert.strictEqual(P('arbeiten', 'ihr'), 'arbeitet');
  assert.strictEqual(P('heißen', 'du'), 'heißt');
  assert.strictEqual(P('fahren', 'du'), 'fährst');
  assert.strictEqual(P('fahren', 'ihr'), 'fahrt');
  assert.strictEqual(P('lesen', 'du'), 'liest');
  assert.strictEqual(P('essen', 'du'), 'isst');
  assert.strictEqual(P('nehmen', 'du'), 'nimmst');
  assert.strictEqual(P('sprechen', 'er'), 'spricht');
  assert.strictEqual(P('aufstehen', 'ich'), 'stehe auf');
  assert.strictEqual(P('einladen', 'du'), 'lädst ein');
  assert.strictEqual(P('fernsehen', 'er'), 'sieht fern');
  assert.strictEqual(P('wandern', 'ich'), 'wandere');
  assert.strictEqual(P('öffnen', 'du'), 'öffnest');
  assert.strictEqual(P('sein', 'ihr'), 'seid');
  assert.strictEqual(P('können', 'du'), 'kannst');
  assert.strictEqual(P('wissen', 'ich'), 'weiß');
  assert.strictEqual(P('wehtun', 'er'), 'tut weh');
  assert.strictEqual(P('spazieren gehen', 'wir'), 'gehen spazieren');
  assert.strictEqual(C.perfekt(W('fahren'), 'wir'), 'sind gefahren');
  assert.strictEqual(C.perfekt(W('kochen'), 'du'), 'hast gekocht');
  assert.ok(C.verbInfo(W('fahren')).stemChange);
  assert.ok(!C.verbInfo(W('wohnen')).stemChange);
});
t('Chuẩn hóa câu trả lời: ae = ä, ss = ß, không phân biệt hoa thường, dấu câu', () => {
  assert.ok(C.answerMatches('die Brüder', 'die brueder'));
  assert.ok(C.answerMatches('heiß', 'HEISS'));
  assert.ok(C.answerMatches('Wie geht es dir?', 'wie geht es dir'));
  assert.ok(C.answerMatches('schön', 'scho:n'));
  assert.ok(!C.answerMatches('der Tisch', 'die Tisch'));
  assert.ok(!C.answerMatches('schon', 'schön'));
});
t('So khớp lời nói theo từ, đổi số sang chữ', () => {
  const r = C.compareWords('Ich habe zwei Brüder.', 'ich habe 2 brüder');
  assert.strictEqual(r.score, 100);
  const r2 = C.compareWords('Ich komme aus Vietnam.', 'ich komme aus');
  assert.strictEqual(r2.score, 75);
  assert.deepStrictEqual(r2.perWord.map(x => x.ok), [true, true, true, false]);
});
t('Tra từ: bỏ mạo từ, nhận số nhiều và dạng chia', () => {
  assert.strictEqual(C.lookup('der Tisch').word, 'Tisch');
  assert.strictEqual(C.lookup('Bücher').word, 'Buch');
  assert.strictEqual(C.lookup('fährst').word, 'fahren');
  assert.strictEqual(C.lookup('xyzabc'), null);
});
t('Bài A1 có ≥ 20 từ, có ngữ pháp kèm ví dụ; bài phát âm trỏ tới nhóm âm có thật', () => {
  const groups = new Set(D.sounds.groups.map(g => g.id));
  D.lessons.forEach(l => {
    if (l.stage === 'sounds') { l.sounds.forEach(id => assert.ok(groups.has(id), `bài ${l.no} trỏ nhóm âm lạ ${id}`)); return; }
    assert.ok(l.wordIds.length >= 20, `bài ${l.no} chỉ có ${l.wordIds.length} từ`);
    assert.ok((l.grammar || []).length >= 1, `bài ${l.no} thiếu ngữ pháp`);
    l.grammar.forEach(g => assert.ok(g.p && g.vi && g.ex.length, `bài ${l.no} ngữ pháp thiếu ví dụ`));
    l.wordIds.forEach(id => assert.ok(D.wordMap[id], `bài ${l.no} trỏ tới từ không có: ${id}`));
  });
  assert.ok(D.lessons.filter(l => l.checkpoint).length >= 5);
});
t('Bảng chữ cái đủ 30 chữ, mỗi nhóm âm có từ ví dụ, cặp âm đủ 5 cột', () => {
  assert.strictEqual(D.sounds.alphabet.length, 30);
  D.sounds.groups.forEach(g => g.items.forEach(it => assert.ok(it.ex.length && it.tip, `nhóm ${g.id} thiếu ví dụ`)));
  D.sounds.pairs.forEach(p => assert.strictEqual(p.length, 5));
});
t('Bảng ngữ pháp: mỗi hàng đủ cột, bài tham chiếu có thật', () => {
  D.grammar.forEach(g => {
    g.table.rows.forEach(r => assert.strictEqual(r.length, g.table.head.length, `bảng ${g.id} lệch cột`));
    assert.ok(D.lessons.find(l => l.no === g.lesson), `bảng ${g.id} trỏ bài lạ`);
  });
});
t('Hội thoại và tình huống nói đủ dữ liệu cho app.js và talk.js', () => {
  assert.strictEqual(window.DE_DIALOGUES.length, 10);
  window.DE_DIALOGUES.forEach(d => d.lines.forEach(l => assert.ok(l.de && l.vi && l.zh === l.de && /^[AB]$/.test(l.who), `hội thoại ${d.id} lỗi`)));
  assert.ok(window.DE_TALK_SCENARIOS.length >= 6);
  window.DE_TALK_SCENARIOS.forEach(sc => {
    assert.ok(sc.turns[sc.initialTurn], `kịch bản ${sc.id} thiếu lượt đầu`);
    Object.values(sc.turns).forEach(tn => {
      assert.ok(tn.npc.zh && tn.npc.vi && tn.user.answers.length && tn.user.accept.anyOf.length, `kịch bản ${sc.id} lượt ${tn.id} lỗi`);
      if (tn.user.next) assert.ok(sc.turns[tn.user.next], `kịch bản ${sc.id} trỏ lượt lạ`);
      tn.user.answers.forEach(a => {
        const hit = tn.user.accept.anyOf.some(k => a.de.toLowerCase().includes(k.toLowerCase()));
        assert.ok(hit, `câu mẫu "${a.de}" không khớp từ khóa của chính nó (${sc.id}/${tn.id})`);
      });
    });
  });
});
t('languages.js: tiếng Đức đã mở (ready) và có mục Phát âm, Ngữ pháp, Luyện nói', () => {
  const de = LANGS.find(l => l.id === 'de');
  assert.ok(de && de.ready, 'tiếng Đức chưa mở');
  assert.strictEqual(de.tts, 'de-DE');
  ['home', 'learn', 'alphabet', 'vocab', 'grammar', 'flashcards', 'quiz', 'typing', 'talk', 'dialogues'].forEach(id => assert.ok(de.sections.some(s => s.id === id), `thiếu mục ${id}`));
});
t('german.js nạp được và sinh câu hỏi hợp lệ', () => {
  const S = require('../german.js');
  assert.deepStrictEqual(S.SECTIONS.slice(0, 3), ['home', 'alphabet', 'learn']);
  const noun = D.words.find(w => w.word === 'Tisch');
  const q = S._Q.article(noun);
  assert.strictEqual(q.choices[q.answer], 'der');
  const verb = D.words.find(w => w.word === 'fahren');
  assert.deepStrictEqual(S._Q.conj(verb, 'du', 'present').expected, ['fährst']);
  const pl = S._Q.plural(noun);
  assert.ok(C.answerMatches(pl.expected, 'Tische'));
  const typ = S._Q.type(noun);
  assert.ok(C.answerMatches(typ.expected, 'der tisch') && !C.answerMatches(typ.expected, 'tisch'));
});
t('app.js và index.html đã nối tiếng Đức', () => {
  const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.ok(/DE_DATA/.test(app) && /DeStudio/.test(app), 'app.js chưa tải german.js');
  assert.ok(html.includes('id="tab-de"') && html.includes('german.css'), 'index.html thiếu khung tiếng Đức');
  const listed = app.match(/const DE_DATA = \[([\s\S]*?)\];/)[1].match(/'([^']+)'/g).map(x => x.slice(1, -1));
  listed.forEach(f => assert.ok(fs.existsSync(path.join(__dirname, '..', f)), `DE_DATA trỏ file không có: ${f}`));
});

console.log(`de.test.js: ${n} kiểm tra đều đạt`);
