/**
 * tests/en-data.test.js
 * Bộ kiểm tra toàn diện dữ liệu tiếng Anh (EN DATA TESTS) cho Polylingo.
 * Chạy bằng Node.js thuần: node tests/en-data.test.js
 */

const assert = require('assert');
const path = require('path');

// Nạp dữ liệu
const wordsA = require('../data/en/words-a.js');
const wordsB = require('../data/en/words-b.js');
const PHONICS = require('../data/en/phonics.js');
const CURRICULUM = require('../data/en/curriculum.js');
const DIALOGUES = require('../data/en/dialogues.js');
const { TALK_SCENARIOS } = require('../data/en/talk-scenarios.js');
const { TALK_DIALOGUES } = require('../data/en/talk-dialogues.js');
const VIDEOS_EN = require('../data/en/videos.js');

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

console.log('=== BẮT ĐẦU KIỂM TRA DỮ LIỆU TIẾNG ANH (A0 - A2) ===\n');

// ============================================================================
// 1. TỪ VỰNG: data/en/words-a.js & words-b.js (EN_WORDS)
// ============================================================================
runTest('EN_WORDS: Tồn tại và hợp nhất từ words-a và words-b đúng 500 từ', () => {
  assert.ok(global.window && global.window.EN_WORDS, 'global.window.EN_WORDS phải tồn tại');
  const words = global.window.EN_WORDS;
  const keys = Object.keys(words);

  assert.strictEqual(keys.length, 500, `Cần đủ 500 từ vựng thông dụng, hiện có ${keys.length}`);
});

runTest('EN_WORDS: Không có từ trùng lặp (không phân biệt hoa thường)', () => {
  const words = global.window.EN_WORDS;
  const seen = new Set();
  for (const k of Object.keys(words)) {
    const lower = k.toLowerCase();
    assert.strictEqual(seen.has(lower), false, `Phát hiện từ trùng lặp: "${k}"`);
    seen.add(lower);
  }
  assert.strictEqual(seen.size, 500);
});

runTest('EN_WORDS: Mọi từ đều có ipa, pos, vi, topic, level (A1|A2), ex (en, vi)', () => {
  const words = global.window.EN_WORDS;
  for (const [key, w] of Object.entries(words)) {
    assert.ok(w.ipa, `Từ "${key}" thiếu trường ipa`);
    assert.ok(w.ipa.startsWith('/') && w.ipa.endsWith('/'), `Từ "${key}" ipa không đúng định dạng /.../: "${w.ipa}"`);
    assert.ok(w.pos, `Từ "${key}" thiếu trường pos`);
    assert.ok(w.vi, `Từ "${key}" thiếu nghĩa tiếng Việt vi`);
    assert.ok(w.topic, `Từ "${key}" thiếu chủ đề topic`);
    assert.ok(w.level === 'A1' || w.level === 'A2', `Từ "${key}" level phải là A1 hoặc A2, hiện là "${w.level}"`);
    assert.ok(w.ex && typeof w.ex === 'object', `Từ "${key}" thiếu đối tượng ví dụ ex`);
    assert.ok(w.ex.en && w.ex.en.trim().length > 0, `Từ "${key}" thiếu câu ví dụ tiếng Anh ex.en`);
    assert.ok(w.ex.vi && w.ex.vi.trim().length > 0, `Từ "${key}" thiếu dịch câu ví dụ ex.vi`);
  }
});

// ============================================================================
// 2. NGỮ ÂM: data/en/phonics.js (EN_PHONICS)
// ============================================================================
runTest('EN_PHONICS: Đủ 44 âm IPA chuẩn quốc tế (12 đơn, 8 đôi, 24 phụ âm)', () => {
  assert.ok(PHONICS && Array.isArray(PHONICS.sounds), 'PHONICS.sounds phải là một mảng');
  assert.strictEqual(PHONICS.sounds.length, 44, `Cần đủ 44 âm IPA, hiện có ${PHONICS.sounds.length}`);

  const monophthongs = PHONICS.sounds.filter(s => s.group === 'monophthong');
  const diphthongs = PHONICS.sounds.filter(s => s.group === 'diphthong');
  const consonants = PHONICS.sounds.filter(s => s.group === 'consonant');

  assert.strictEqual(monophthongs.length, 12, `Cần 12 nguyên âm đơn, hiện có ${monophthongs.length}`);
  assert.strictEqual(diphthongs.length, 8, `Cần 8 nguyên âm đôi, hiện có ${diphthongs.length}`);
  assert.strictEqual(consonants.length, 24, `Cần 24 phụ âm, hiện có ${consonants.length}`);
});

runTest('EN_PHONICS: Mỗi âm có mô tả khẩu hình, so sánh tiếng Việt, 3 ví dụ có IPA, lỗi thường gặp', () => {
  for (const s of PHONICS.sounds) {
    assert.ok(s.ipa, `Âm thiếu ký hiệu ipa: ${JSON.stringify(s)}`);
    assert.ok(s.name, `Âm ${s.ipa} thiếu name`);
    assert.ok(s.mouth && s.mouth.length > 10, `Âm ${s.ipa} thiếu mô tả khẩu hình miệng`);
    assert.ok(s.viCompare && s.viCompare.length > 5, `Âm ${s.ipa} thiếu so sánh tiếng Việt viCompare`);
    assert.ok(s.commonErrors && s.commonErrors.length > 5, `Âm ${s.ipa} thiếu lỗi người Việt commonErrors`);
    assert.ok(Array.isArray(s.examples) && s.examples.length >= 3, `Âm ${s.ipa} cần ít nhất 3 từ ví dụ`);

    for (const ex of s.examples) {
      assert.ok(ex.word, `Ví dụ trong ${s.ipa} thiếu word`);
      assert.ok(ex.ipa, `Ví dụ trong ${s.ipa} thiếu ipa`);
      assert.ok(ex.vi, `Ví dụ trong ${s.ipa} thiếu vi`);
    }
  }
});

runTest('EN_PHONICS: Có ít nhất 20 cặp âm tối thiểu (Minimal Pairs)', () => {
  assert.ok(Array.isArray(PHONICS.minimalPairs), 'PHONICS.minimalPairs phải là mảng');
  assert.ok(PHONICS.minimalPairs.length >= 20, `Cần >= 20 cặp âm tối thiểu, hiện có ${PHONICS.minimalPairs.length}`);

  for (const mp of PHONICS.minimalPairs) {
    assert.ok(mp.soundA && mp.soundB, `Cặp âm thiếu soundA hoặc soundB: ${JSON.stringify(mp)}`);
    assert.ok(mp.wordA && mp.wordA.word && mp.wordA.ipa, `Cặp âm thiếu wordA`);
    assert.ok(mp.wordB && mp.wordB.word && mp.wordB.ipa, `Cặp âm thiếu wordB`);
    assert.ok(mp.tip, `Cặp âm thiếu mẹo phân biệt tip`);
  }
});

runTest('EN_PHONICS: Đầy đủ phần Âm cuối (-s/-es, -ed, âm nuốt) & Nhấn âm, Nối âm', () => {
  assert.ok(PHONICS.finalSounds, 'Thiếu phần finalSounds');
  assert.ok(PHONICS.finalSounds.s_z_iz && PHONICS.finalSounds.s_z_iz.rules.length >= 3, 'Thiếu quy tắc đuôi -s/-es');
  assert.ok(PHONICS.finalSounds.t_d_id && PHONICS.finalSounds.t_d_id.rules.length >= 3, 'Thiếu quy tắc đuôi -ed');
  assert.ok(PHONICS.finalSounds.unreleasedStop && PHONICS.finalSounds.unreleasedStop.examples.length >= 2, 'Thiếu phần âm cuối bị nuốt');

  assert.ok(PHONICS.stress && PHONICS.stress.wordStressRules.length >= 4, 'Thiếu phần quy tắc trọng âm stress');
  assert.ok(PHONICS.linking && PHONICS.linking.rules.length >= 3, 'Thiếu phần quy tắc nối âm linking');
});

// ============================================================================
// 3. LỘ TRÌNH HỌC: data/en/curriculum.js (EN_CURRICULUM)
// ============================================================================
runTest('CURRICULUM: Đúng cấu trúc cấp (starter và a1 mở, a2 khóa) và đủ 30 bài học', () => {
  assert.ok(CURRICULUM && Array.isArray(CURRICULUM.levels), 'CURRICULUM.levels phải là mảng');

  const starter = CURRICULUM.levels.find(l => l.id === 'starter');
  const a1 = CURRICULUM.levels.find(l => l.id === 'a1');
  const a2 = CURRICULUM.levels.find(l => l.id === 'a2');

  assert.ok(starter, 'Thiếu cấp starter (Pre-A1)');
  assert.ok(a1, 'Thiếu cấp a1 (A1 Elementary)');
  assert.ok(a2, 'Thiếu cấp a2 (A2 Pre-Intermediate)');
  assert.strictEqual(a2.locked, true, 'Cấp a2 phải bị khóa (locked: true)');

  let totalLessons = 0;
  for (const lvl of [starter, a1]) {
    for (const u of lvl.units) {
      assert.ok(Array.isArray(u.lessons), `Unit ${u.id} thiếu mảng bài học lessons`);
      totalLessons += u.lessons.length;
    }
  }

  assert.strictEqual(totalLessons, 30, `Cần đúng 30 bài học qua 2 cấp mở, hiện có ${totalLessons}`);
});

runTest('CURRICULUM: Checkpoint sau mỗi 5 bài học (mỗi unit có 5 bài và có checkpoint)', () => {
  const openLevels = CURRICULUM.levels.filter(l => l.id === 'starter' || l.id === 'a1');
  let unitCount = 0;

  for (const lvl of openLevels) {
    for (const u of lvl.units) {
      unitCount++;
      assert.strictEqual(u.lessons.length, 5, `Unit ${u.id} phải có đúng 5 bài học, hiện có ${u.lessons.length}`);
      assert.ok(u.checkpoint, `Unit ${u.id} phải có checkpoint`);
      assert.ok(u.checkpoint.passPercent >= 80, `Checkpoint ${u.id} cần passPercent >= 80`);
      assert.ok(u.checkpoint.questionsCount >= 10, `Checkpoint ${u.id} cần questionsCount >= 10`);
    }
  }

  assert.strictEqual(unitCount, 6, `Cần 6 units tương ứng 30 bài học, hiện có ${unitCount}`);
});

runTest('CURRICULUM: MỌI từ trong newWords của tất cả bài học đều tồn tại trong EN_WORDS', () => {
  const wordsDict = global.window.EN_WORDS;
  const openLevels = CURRICULUM.levels.filter(l => l.id === 'starter' || l.id === 'a1');

  for (const lvl of openLevels) {
    for (const u of lvl.units) {
      for (const les of u.lessons) {
        assert.ok(Array.isArray(les.newWords), `Bài ${les.id} thiếu mảng newWords`);
        assert.ok(les.newWords.length >= 6 && les.newWords.length <= 10, `Bài ${les.id} cần 6-10 từ mới, hiện có ${les.newWords.length}`);

        for (const w of les.newWords) {
          assert.ok(wordsDict[w], `Từ "${w}" trong bài ${les.id} KHÔNG tồn tại trong EN_WORDS!`);
        }
      }
    }
  }
});

runTest('CURRICULUM: Ngữ pháp đầy đủ, mỗi bài trỏ vào các điểm ngữ pháp hợp lệ', () => {
  assert.ok(Array.isArray(CURRICULUM.grammar), 'CURRICULUM.grammar phải là mảng');
  assert.ok(CURRICULUM.grammar.length >= 10, `Cần >= 10 mẫu ngữ pháp, hiện có ${CURRICULUM.grammar.length}`);

  const grammarMap = new Map(CURRICULUM.grammar.map(g => [g.id, g]));

  const openLevels = CURRICULUM.levels.filter(l => l.id === 'starter' || l.id === 'a1');
  for (const lvl of openLevels) {
    for (const u of lvl.units) {
      for (const les of u.lessons) {
        assert.ok(Array.isArray(les.grammar), `Bài ${les.id} thiếu mảng grammar`);
        for (const gid of les.grammar) {
          assert.ok(grammarMap.has(gid), `Ngữ pháp "${gid}" trong bài ${les.id} không tìm thấy trong CURRICULUM.grammar`);
        }
        assert.ok(les.text && les.text.length > 15, `Bài ${les.id} thiếu đoạn hội thoại / bài khóa text`);
        assert.ok(les.goal && les.goal.length > 10, `Bài ${les.id} thiếu mục tiêu goal`);
      }
    }
  }
});

// ============================================================================
// 4. HỘI THOẠI & LUYỆN NÓI: dialogues.js, talk-scenarios.js, talk-dialogues.js
// ============================================================================
runTest('DIALOGUES: Đủ 10 bài hội thoại đời thường có đầy đủ câu A-B', () => {
  assert.ok(Array.isArray(DIALOGUES), 'DIALOGUES phải là mảng');
  assert.strictEqual(DIALOGUES.length, 10, `Cần đúng 10 bài hội thoại, hiện có ${DIALOGUES.length}`);

  for (const d of DIALOGUES) {
    assert.ok(d.id, `Hội thoại thiếu id`);
    assert.ok(d.title, `Hội thoại ${d.id} thiếu title`);
    assert.ok(Array.isArray(d.lines) && d.lines.length >= 6, `Hội thoại ${d.id} cần ít nhất 6 câu`);

    for (const line of d.lines) {
      assert.ok(line.who === 'A' || line.who === 'B', `Line thiếu speaker A/B`);
      assert.ok(line.en, `Line trong ${d.id} thiếu tiếng Anh`);
      assert.ok(line.ipa, `Line trong ${d.id} thiếu IPA`);
      assert.ok(line.vi, `Line trong ${d.id} thiếu tiếng Việt`);
      // Khả năng tương thích ngược
      assert.ok(line.zh, `Line trong ${d.id} cần zh alias`);
      assert.ok(line.py, `Line trong ${d.id} cần py alias`);
    }
  }
});

runTest('TALK_SCENARIOS: Đủ 8 tình huống nhập vai với cấu trúc turns chuẩn', () => {
  assert.ok(Array.isArray(TALK_SCENARIOS), 'TALK_SCENARIOS phải là mảng');
  assert.strictEqual(TALK_SCENARIOS.length, 8, `Cần đúng 8 tình huống nhập vai, hiện có ${TALK_SCENARIOS.length}`);

  const requiredScenarios = [
    'ordering-food',
    'asking-directions',
    'shopping',
    'hotel',
    'making-friends',
    'airport',
    'doctor-visit',
    'job-interview'
  ];

  const scenarioIds = new Set(TALK_SCENARIOS.map(s => s.id));
  for (const req of requiredScenarios) {
    assert.ok(scenarioIds.has(req), `Thiếu tình huống nhập vai bắt buộc: "${req}"`);
  }

  for (const s of TALK_SCENARIOS) {
    assert.ok(s.id, 'Scenario thiếu id');
    assert.ok(s.title, `Scenario ${s.id} thiếu title`);
    assert.ok(s.npc && s.npc.name, `Scenario ${s.id} thiếu npc`);
    assert.strictEqual(s.initialTurn, 't1', `Scenario ${s.id} initialTurn phải là t1`);
    assert.ok(s.turns && s.turns.t1, `Scenario ${s.id} thiếu turn t1`);

    let currentTurnId = s.initialTurn;
    let turnCount = 0;
    while (currentTurnId) {
      const turn = s.turns[currentTurnId];
      assert.ok(turn, `Turn ${currentTurnId} trong ${s.id} không tìm thấy`);
      assert.ok(turn.npc && turn.npc.en && turn.npc.ipa && turn.npc.vi, `Turn ${currentTurnId} trong ${s.id} thiếu dữ liệu npc`);
      assert.ok(turn.user && turn.user.goal, `Turn ${currentTurnId} trong ${s.id} thiếu user.goal`);
      assert.ok(Array.isArray(turn.user.answers) && turn.user.answers.length >= 1, `Turn ${currentTurnId} trong ${s.id} thiếu user.answers`);
      assert.ok(turn.user.accept && (turn.user.accept.anyOf || turn.user.accept.pattern), `Turn ${currentTurnId} trong ${s.id} thiếu user.accept`);

      currentTurnId = turn.user.next;
      turnCount++;
      if (turnCount > 10) break; // Tránh vòng lặp vô tận
    }

    assert.ok(turnCount >= 2, `Scenario ${s.id} cần ít nhất 2 turns, hiện có ${turnCount}`);
  }
});

runTest('TALK_DIALOGUES: Đủ 10 hội thoại đời thường Đóng vai A-B chuẩn', () => {
  assert.ok(Array.isArray(TALK_DIALOGUES), 'TALK_DIALOGUES phải là mảng');
  assert.strictEqual(TALK_DIALOGUES.length, 10, `Cần đúng 10 hội thoại đóng vai, hiện có ${TALK_DIALOGUES.length}`);

  for (const d of TALK_DIALOGUES) {
    assert.ok(d.id, 'Talk dialogue thiếu id');
    assert.ok(d.title, `Talk dialogue ${d.id} thiếu title`);
    assert.ok(d.scene, `Talk dialogue ${d.id} thiếu scene`);
    assert.ok(d.roleA && d.roleA.name, `Talk dialogue ${d.id} thiếu roleA`);
    assert.ok(d.roleB && d.roleB.name, `Talk dialogue ${d.id} thiếu roleB`);
    assert.ok(Array.isArray(d.sentences) && d.sentences.length >= 8, `Talk dialogue ${d.id} cần >= 8 câu`);

    const speakers = new Set(d.sentences.map(s => s.who));
    assert.ok(speakers.has('A') && speakers.has('B'), `Talk dialogue ${d.id} phải có cả vai A và B`);

    for (const s of d.sentences) {
      assert.ok(s.en, `Câu thiếu en trong ${d.id}`);
      assert.ok(s.ipa, `Câu thiếu ipa trong ${d.id}`);
      assert.ok(s.vi, `Câu thiếu vi trong ${d.id}`);
      assert.strictEqual(/[0-9]/.test(s.ipa), false, `IPA không được chứa số: "${s.ipa}"`);
    }
  }
});

// ============================================================================
// 5. VIDEOS: data/en/videos.js (VIDEOS_EN)
// ============================================================================
runTest('VIDEOS_EN: Là mảng rỗng để bổ sung video sau này', () => {
  assert.ok(Array.isArray(VIDEOS_EN), 'VIDEOS_EN phải là mảng');
  assert.strictEqual(VIDEOS_EN.length, 0, 'VIDEOS_EN hiện tại phải là mảng rỗng');
});

console.log('\n========================================');
console.log(`OK ${testCount} tests`);
console.log('Tất cả bài kiểm tra DỮ LIỆU TIẾNG ANH ĐÃ VƯỢT QUA thành công!\n');
