/**
 * tests/en-modules.test.js
 * Bộ kiểm tra toàn diện cho các module tiếng Anh (Polylingo English):
 *  1. Mở khóa bài học theo curriculum en (starter, a1 mở; a2 khóa)
 *  2. So khớp câu nói tiếng Anh (rút gọn I'm/I am, don't/do not, dấu câu, nhận xét phát âm)
 *  3. Sinh bài tập sắp xếp câu tiếng Anh (splitSentence tách khoảng trắng, bỏ dấu câu)
 *  4. Công cụ tools/them_video.py với tham số --lang en ghi file VIDEOS_EN hợp lệ
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Thiết lập môi trường window cho Node.js
global.window = global;

require('../data/en/words-a.js');
require('../data/en/words-b.js');
const EN_CURRICULUM = require('../data/en/curriculum.js');

const {
  isLessonUnlocked,
  nextLesson,
  splitSentence,
  buildExercises,
  getOpenLevels
} = require('../learn.js');

const {
  scoreEnglishRecognition,
  expandEnglishContractions
} = require('../speak.js');

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

console.log('=== KIỂM TRA MODULE TIẾNG ANH (EN-MODULES.TEST.JS) ===');

// ============================================================================
// 1. MỞ KHÓA BÀI HỌC THEO CURRICULUM TIẾNG ANH
// ============================================================================

runTest('1.1 getOpenLevels: Trả về cấp độ mở starter và a1, khóa a2', () => {
  const openLevels = getOpenLevels(EN_CURRICULUM);
  assert.strictEqual(openLevels.length, 2);
  assert.strictEqual(openLevels[0].id, 'starter');
  assert.strictEqual(openLevels[1].id, 'a1');
  const allIds = EN_CURRICULUM.levels.map(l => l.id);
  assert.ok(allIds.includes('a2'), 'Curriculum phải có cấp a2');
  assert.ok(!openLevels.some(l => l.id === 'a2'), 'Cấp a2 không được nằm trong openLevels');
});

runTest('1.2 isLessonUnlocked: Bài đầu tiên starter-u1-l1 mở khóa mặc định', () => {
  const emptyProg = { lessons: {}, checkpoints: {} };
  assert.strictEqual(isLessonUnlocked('starter-u1-l1', EN_CURRICULUM, emptyProg), true);
});

runTest('1.3 isLessonUnlocked: Bài starter-u1-l2 bị khóa khi chưa xong l1', () => {
  const emptyProg = { lessons: {}, checkpoints: {} };
  assert.strictEqual(isLessonUnlocked('starter-u1-l2', EN_CURRICULUM, emptyProg), false);

  const l1DoneProg = {
    lessons: { 'starter-u1-l1': { score: 100, completedAt: 123456 } },
    checkpoints: {}
  };
  assert.strictEqual(isLessonUnlocked('starter-u1-l2', EN_CURRICULUM, l1DoneProg), true);
});

runTest('1.4 isLessonUnlocked: Bài unit 2 (starter-u2-l6) chỉ mở khi checkpoint unit 1 >= 80%', () => {
  const u1LessonsDone = {
    lessons: {
      'starter-u1-l1': { score: 100 },
      'starter-u1-l2': { score: 100 },
      'starter-u1-l3': { score: 100 },
      'starter-u1-l4': { score: 100 },
      'starter-u1-l5': { score: 100 }
    },
    checkpoints: {}
  };
  // Chưa làm checkpoint -> khóa
  assert.strictEqual(isLessonUnlocked('starter-u2-l6', EN_CURRICULUM, u1LessonsDone), false);

  // Checkpoint < 80% -> vẫn khóa
  u1LessonsDone.checkpoints['checkpoint-starter-u1'] = { score: 75 };
  assert.strictEqual(isLessonUnlocked('starter-u2-l6', EN_CURRICULUM, u1LessonsDone), false);

  // Checkpoint >= 80% -> mở khóa
  u1LessonsDone.checkpoints['checkpoint-starter-u1'] = { score: 85 };
  assert.strictEqual(isLessonUnlocked('starter-u2-l6', EN_CURRICULUM, u1LessonsDone), true);
});

runTest('1.5 nextLesson: Trả về chính xác bài học tiếp theo trong curriculum en', () => {
  const emptyProg = { lessons: {}, checkpoints: {} };
  const first = nextLesson(EN_CURRICULUM, emptyProg);
  assert.ok(first, 'Phải tìm thấy bài đầu tiên');
  assert.strictEqual(first.id, 'starter-u1-l1');

  const afterFirst = nextLesson(EN_CURRICULUM, {
    lessons: { 'starter-u1-l1': { score: 100 } },
    checkpoints: {}
  });
  assert.ok(afterFirst);
  assert.strictEqual(afterFirst.id, 'starter-u1-l2');
});

runTest('1.6 isLessonUnlocked: Các bài cấp a2 luôn bị khóa vì a2.locked=true', () => {
  const allStarterA1Done = {
    lessons: {},
    checkpoints: {
      'checkpoint-starter-u1': { score: 100 },
      'checkpoint-starter-u2': { score: 100 }
    }
  };
  // Đánh dấu xong hết bài starter và a1
  EN_CURRICULUM.levels.forEach(lvl => {
    if (lvl.id !== 'a2') {
      lvl.units.forEach(u => {
        allStarterA1Done.checkpoints[`checkpoint-${u.id}`] = { score: 100 };
        u.lessons.forEach(l => {
          allStarterA1Done.lessons[l.id] = { score: 100 };
        });
      });
    }
  });

  const a2Level = EN_CURRICULUM.levels.find(l => l.id === 'a2');
  if (a2Level && a2Level.units && a2Level.units[0] && a2Level.units[0].lessons[0]) {
    const a2LessonId = a2Level.units[0].lessons[0].id;
    assert.strictEqual(isLessonUnlocked(a2LessonId, EN_CURRICULUM, allStarterA1Done), false);
  }
});

// ============================================================================
// 2. SO KHỚP CÂU NÓI TIẾNG ANH (RÚT GỌN, DẤU CÂU, NHẬN XÉT PHÁT ÂM)
// ============================================================================

runTest('2.1 expandEnglishContractions: Mở rộng chuẩn xác các dạng rút gọn phổ biến', () => {
  assert.strictEqual(expandEnglishContractions("I'm a student"), 'i am a student');
  assert.strictEqual(expandEnglishContractions("don't worry"), 'do not worry');
  assert.strictEqual(expandEnglishContractions("They're ready and we've done"), 'they are ready and we have done');
  assert.strictEqual(expandEnglishContractions("It's can't won't"), 'it is cannot will not');
});

runTest('2.2 scoreEnglishRecognition: Khớp 100% khi câu nói bỏ dấu câu và khác chữ hoa thường', () => {
  const res = scoreEnglishRecognition('Hello, world! How are you?', ['hello world how are you']);
  assert.strictEqual(res.score, 100);
  assert.ok(res.perWord.every(w => w.ok));
});

runTest('2.3 scoreEnglishRecognition: Khớp 100% giữa dạng rút gọn và dạng đầy đủ', () => {
  // Mục tiêu rút gọn "I'm", người học nói "i am"
  const res1 = scoreEnglishRecognition("I'm ready", ['I am ready']);
  assert.strictEqual(res1.score, 100);

  // Mục tiêu đầy đủ "do not", người học nói "don't"
  const res2 = scoreEnglishRecognition('Do not touch', ["don't touch"]);
  assert.strictEqual(res2.score, 100);
});

runTest('2.4 scoreEnglishRecognition: Chấm điểm % chính xác theo số từ đúng và tô từ sai', () => {
  const target = 'I have a big red car'; // 6 từ
  const res = scoreEnglishRecognition(target, ['I have a car']); // Đúng 4 từ: I, have, a, car
  assert.ok(res.score >= 60 && res.score <= 70, `Score expected ~67%, got ${res.score}%`);
  
  const missed = res.perWord.filter(w => !w.ok).map(w => w.word.toLowerCase());
  assert.ok(missed.includes('big'));
  assert.ok(missed.includes('red'));
});

runTest('2.5 scoreEnglishRecognition: Đưa ra nhận xét lỗi phát âm người Việt (âm cuối, /θ/, /ʃ/)', () => {
  // Âm ending sounds
  const res1 = scoreEnglishRecognition('He likes books', ['he like book']);
  assert.ok(res1.advice.includes('âm cuối') || res1.advice.includes('ending sounds'));

  // Âm 'th'
  const res2 = scoreEnglishRecognition('I think this is good', ['i tink dis is good']);
  assert.ok(res2.advice.includes("th") || res2.advice.includes('/θ/'));
});

// ============================================================================
// 3. SINH BÀI TẬP SẮP XẾP CÂU TIẾNG ANH
// ============================================================================

runTest('3.1 splitSentence: Tách câu tiếng Anh theo khoảng trắng và bỏ dấu câu', () => {
  const sentence = 'She speaks English very well.';
  const tokens = splitSentence(sentence);
  assert.deepStrictEqual(tokens, ['She', 'speaks', 'English', 'very', 'well']);
});

runTest('3.2 splitSentence: Xử lý các dấu câu phức tạp (!?,:;)"', () => {
  const sentence = '"Where are you from?", he asked!';
  const tokens = splitSentence(sentence);
  assert.deepStrictEqual(tokens, ['Where', 'are', 'you', 'from', 'he', 'asked']);
});

runTest('3.3 buildExercises: Sinh đúng bộ bài tập cho bài học tiếng Anh bao gồm order', () => {
  const lesson = EN_CURRICULUM.levels[0].units[0].lessons[0];
  const exercises = buildExercises(lesson, EN_CURRICULUM);
  assert.ok(Array.isArray(exercises) && exercises.length > 0);

  const types = exercises.map(e => e.type);
  assert.ok(types.includes('order'), 'Phải có dạng sắp xếp câu order');
  assert.ok(types.includes('meaning') || types.includes('listen'), 'Phải có câu trắc nghiệm');

  const orderEx = exercises.find(e => e.type === 'order');
  assert.ok(orderEx.tokens && orderEx.tokens.length >= 2);
  assert.ok(orderEx.prompt);
});

// ============================================================================
// 4. KIỂM TRA them_video.py VỚI THAM SỐ --lang en
// ============================================================================

runTest('4.1 them_video.py --lang en: Đọc phụ đề SRT và ghi ra VIDEOS_EN vào file tạm', () => {
  const tempOut = path.join(__dirname, 'fixtures', 'temp_videos_en.js');
  const subFile = path.join(__dirname, 'fixtures', 'sample_en.srt');

  if (fs.existsSync(tempOut)) {
    fs.unlinkSync(tempOut);
  }

  const cmd = `python tools/them_video.py --lang en --link "https://www.youtube.com/watch?v=dQw4w9WgXcQ" --tieu-de "English Intro Lesson" --cap A1 --chu-de "Greeting" --sub "${subFile}" --out "${tempOut}"`;
  
  execSync(cmd, { cwd: path.resolve(__dirname, '..'), stdio: 'pipe' });

  assert.ok(fs.existsSync(tempOut), 'File đầu ra phải được tạo');
  const content = fs.readFileSync(tempOut, 'utf-8');

  // Kiểm tra khai báo VIDEOS_EN
  assert.ok(content.includes('const VIDEOS_EN ='), 'File phải chứa mảng VIDEOS_EN');
  assert.ok(content.includes('window.VIDEOS_EN = VIDEOS_EN;'));
  assert.ok(content.includes('module.exports = VIDEOS_EN;'));

  // Nạp module vừa sinh để kiểm tra đối tượng
  delete require.cache[require.resolve(tempOut)];
  const generatedVideos = require(tempOut);
  assert.strictEqual(generatedVideos.length, 1);
  const entry = generatedVideos[0];
  assert.strictEqual(entry.id, 'en-yt-dQw4w9WgXcQ');
  assert.strictEqual(entry.title, 'English Intro Lesson');
  assert.strictEqual(entry.level, 'A1');
  assert.strictEqual(entry.subs.length, 2);

  // Kiểm tra trường en, vi, ipa và các alias
  const firstCue = entry.subs[0];
  assert.strictEqual(firstCue.en, 'Hello, nice to meet you!');
  assert.strictEqual(firstCue.vi, 'Xin chào, rất vui được gặp bạn!');
  assert.strictEqual(firstCue.zh, 'Hello, nice to meet you!'); // alias
  assert.ok(firstCue.ipa !== undefined);

  // Dọn dẹp file tạm
  fs.unlinkSync(tempOut);
});

console.log(`\nOK ${testCount} tests`);
