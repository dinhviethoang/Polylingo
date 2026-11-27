/**
 * tests/ja.test.js — Kiểm tra dữ liệu và lõi tiếng Nhật (data/ja/*.js, data/ja/ja-core.js, japanese.js).
 * Chạy: node tests/ja.test.js
 */
const assert = require('assert');

require('../data/ja/kana.js');
require('../data/ja/words-a.js');
require('../data/ja/words-b.js');
require('../data/ja/kanji.js');
require('../data/ja/curriculum.js');
const C = require('../data/ja/ja-core.js');
const LANGS = (() => { const src = require('fs').readFileSync(require('path').join(__dirname, '..', 'languages.js'), 'utf8'); return new Function(src + '; return LANGUAGES;')(); })();

let n = 0;
function t(name, fn) {
  try { fn(); n++; } catch (e) { console.error('  ✗ ' + name); console.error(e); process.exit(1); }
}

const D = C.load();

t('Có ít nhất 700 từ N5, 100 Kanji, 35 bài', () => {
  assert.ok(D.words.length >= 700, `chỉ có ${D.words.length} từ`);
  assert.ok(D.kanji.length >= 100, `chỉ có ${D.kanji.length} Kanji`);
  assert.strictEqual(D.lessons.length, 35);
});
t('Mỗi từ có kana hợp lệ, nghĩa, từ loại đúng, id không trùng', () => {
  const ids = new Set();
  D.words.forEach(w => {
    assert.ok(w.kana && Array.from(w.kana).every(C.isKana), `kana sai: ${w.word} ${w.kana}`);
    assert.ok(w.vi, `thiếu nghĩa: ${w.word}`);
    assert.ok(C.POS_LABELS[w.pos], `từ loại lạ: ${w.word} ${w.pos}`);
    assert.ok(!ids.has(w.id), `trùng id ${w.id}`);
    ids.add(w.id);
    assert.ok(/^[a-z' ]+$/.test(w.romaji), `romaji sai: ${w.kana} → ${w.romaji}`);
    if (w.ex) assert.ok(w.ex.ja && w.ex.vi, `câu ví dụ thiếu nghĩa: ${w.word}`);
  });
});
t('Mọi từ có Kanji đều có âm Hán Việt đủ', () => {
  D.words.filter(w => w.kanji).forEach(w => assert.ok(w.hanViet && !w.hanViet.includes('?'), `thiếu Hán Việt: ${w.kanji} (${w.hanViet})`));
});
t('Mỗi Kanji có âm Hán Việt, nghĩa, số nét, ít nhất 1 từ ví dụ', () => {
  const seen = new Set();
  D.kanji.forEach(k => {
    assert.ok(!seen.has(k.ch), `trùng Kanji ${k.ch}`); seen.add(k.ch);
    assert.ok(k.hv && k.vi && k.strokes > 0, `Kanji thiếu dữ liệu: ${k.ch}`);
    assert.ok(k.on.length + k.kun.length > 0, `Kanji thiếu âm đọc: ${k.ch}`);
    assert.ok(k.examples.length > 0, `Kanji không có từ ví dụ: ${k.ch}`);
    assert.ok(k.lesson >= 7 && k.lesson <= 35, `Kanji ${k.ch} gán bài ${k.lesson}`);
  });
});
t('Bài N5 có ≥19 từ, có ngữ pháp kèm ví dụ; bài Kana có bảng chữ', () => {
  D.lessons.forEach(l => {
    if (l.stage === 'kana') { assert.ok(l.kana && l.kana.set, `bài ${l.no} thiếu kana`); return; }
    assert.ok(l.wordIds.length >= 19, `bài ${l.no} chỉ có ${l.wordIds.length} từ`);
    assert.ok((l.grammar || []).length >= 1, `bài ${l.no} thiếu ngữ pháp`);
    l.grammar.forEach(g => assert.ok(g.p && g.vi && g.ex.length, `bài ${l.no} ngữ pháp thiếu ví dụ`));
    l.wordIds.forEach(id => assert.ok(D.wordMap[id], `bài ${l.no} trỏ tới từ không có: ${id}`));
  });
  assert.strictEqual(D.lessons.filter(l => l.checkpoint).length, 7);
});
t('Kana → romaji theo Hepburn', () => {
  const cases = { がっこう: 'gakkou', ちょっと: 'chotto', しんぶん: 'shinbun', ほんや: "hon'ya", コーヒー: 'koohii', まっちゃ: 'matcha', パーティー: 'paatii', きゃく: 'kyaku', じゅう: 'juu', ふじさん: 'fujisan' };
  Object.entries(cases).forEach(([k, r]) => assert.strictEqual(C.kanaToRomaji(k), r, k));
});
t('Romaji → kana như bộ gõ', () => {
  const cases = { taberu: 'たべる', gakkou: 'がっこう', shinbun: 'しんぶん', sinbun: 'しんぶん', "hon'ya": 'ほんや', kyou: 'きょう', 'ko-hi-': 'こーひー', tukue: 'つくえ', wo: 'を', chotto: 'ちょっと', matcha: 'まっちゃ' };
  Object.entries(cases).forEach(([r, k]) => assert.strictEqual(C.romajiToKana(r), k, r));
  assert.strictEqual(C.romajiToKana('hon', false), 'ほn', 'n cuối chưa đổi khi đang gõ');
});
t('Chấm đáp án gõ chấp nhận nhiều kiểu', () => {
  assert.ok(C.answerMatches('こんにちは', 'konnichiha'));
  assert.ok(C.answerMatches('こんにちは', 'konnnichiha'));
  assert.ok(C.answerMatches('ほんや', 'honnya'));
  assert.ok(C.answerMatches('コーヒー', 'ko-hi-'));
  assert.ok(C.answerMatches('たべる', 'たべる'));
  assert.ok(C.answerMatches('たべる', 'タベル'));
  assert.ok(!C.answerMatches('たべる', 'nomu'));
});
t('Chia động từ ba nhóm, gồm ngoại lệ 行く và ある', () => {
  const W = D.wordMap;
  const exp = {
    '行く': ['行きます', '行って', '行った', '行かない'], '来る': ['来ます', '来て', '来た', '来ない'],
    '勉強する': ['勉強します', '勉強して', '勉強した', '勉強しない'], '食べる': ['食べます', '食べて', '食べた', '食べない'],
    '飲む': ['飲みます', '飲んで', '飲んだ', '飲まない'], '待つ': ['待ちます', '待って', '待った', '待たない'],
    '話す': ['話します', '話して', '話した', '話さない'], '買う': ['買います', '買って', '買った', '買わない'],
    '泳ぐ': ['泳ぎます', '泳いで', '泳いだ', '泳がない'], '書く': ['書きます', '書いて', '書いた', '書かない'],
    '帰る': ['帰ります', '帰って', '帰った', '帰らない'], 'ある': ['あります', 'あって', 'あった', 'ない']
  };
  Object.entries(exp).forEach(([id, forms]) => {
    assert.ok(W[id], `thiếu từ ${id}`);
    ['masu', 'te', 'ta', 'nai'].forEach((f, i) => assert.strictEqual(C.conjugate(W[id], f).written, forms[i], `${id} ${f}`));
  });
  assert.strictEqual(C.conjugate(W['来る'], 'nai').kana, 'こない');
  assert.strictEqual(C.conjugate(W['行く'], 'te').kana, 'いって');
  D.words.filter(w => /^v[123]$/.test(w.pos)).forEach(w => {
    ['masu', 'te', 'ta', 'nai'].forEach(f => assert.ok(C.conjugate(w, f).kana, `không chia được ${w.word} ${f}`));
  });
});
t('So câu nói theo ký tự (dùng cho Luyện nói)', () => {
  assert.strictEqual(C.compareChars('わたしはナムです', 'わたしはなむです').score, 100);
  assert.ok(C.compareChars('おはようございます', 'おはよう').score < 70);
});
t('SM-2: nhớ thì giãn khoảng, quên thì về 0', () => {
  let c = C.sm2(null, 5); assert.strictEqual(c.interval, 1);
  c = C.sm2(c, 5); assert.strictEqual(c.interval, 3);
  c = C.sm2(c, 1); assert.strictEqual(c.interval, 0); assert.strictEqual(c.repetition, 0);
});
t('languages.js bật tiếng Nhật và mọi mục đều có người vẽ', () => {
  const ja = LANGS.find(l => l.id === 'ja');
  assert.ok(ja.ready);
  const studio = require('../japanese.js');
  ja.sections.forEach(s => assert.ok(studio.SECTIONS.includes(s.id) || ['talk', 'dialogues'].includes(s.id), `mục ${s.id} chưa có giao diện`));
});
t('Hội thoại và kịch bản luyện nói có trường ja/kana/romaji', () => {
  const dia = global.window.JA_DIALOGUES;
  require('../data/ja/dialogues.js');
  require('../data/ja/talk-scenarios.js');
  require('../data/ja/talk-dialogues.js');
  const all = (global.window.JA_DIALOGUES || dia || []);
  assert.ok(all.length >= 10);
  all.forEach(d => d.lines.forEach(l => assert.ok(l.ja && l.kana && l.romaji && l.vi, `hội thoại ${d.id} thiếu trường`)));
  assert.ok((global.window.JA_TALK_SCENARIOS || []).length >= 8);
  assert.ok((global.window.JA_TALK_DIALOGUES || []).length >= 10);
});

console.log(`OK ${n} tests — tiếng Nhật: ${D.words.length} từ, ${D.kanji.length} Kanji, ${D.lessons.length} bài`);
