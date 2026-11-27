/**
 * tests/videos.test.js
 * Bộ kiểm tra toàn diện cho module Video giải trí (PolyLingo Video)
 * Chạy bằng: node --test tests/videos.test.js
 */

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

// Nạp các hàm từ videos.js
const {
  parseYouTubeId,
  parseTimestampToSeconds,
  parseSrtOrVtt,
  parseBilingualSubs,
  findCueByTime,
  tokenizeLongestWords,
  lookupWord,
  generateQuizFromSubs,
  saveVideoProgress,
  getVideoProgress
} = require('../videos.js');

// Nạp dữ liệu mẫu và Economy
const VIDEOS_ZH = require('../data/zh/videos.js');
const Economy = require('../game/economy.js');

describe('=== KIỂM TRA MODULE VIDEO GIẢI TRÍ (POLYLINGO VIDEO) ===', () => {

  /* ==========================================================================
     1. KIỂM TRA PARSE YOUTUBE ID
     ========================================================================== */
  test('1. parseYouTubeId: Nhận diện chính xác ID từ mọi định dạng link', () => {
    const targetId = 'dQw4w9WgXcQ';

    // Link watch thông thường
    assert.strictEqual(parseYouTubeId(`https://www.youtube.com/watch?v=${targetId}`), targetId);
    assert.strictEqual(parseYouTubeId(`http://www.youtube.com/watch?v=${targetId}`), targetId);

    // Link youtu.be rút gọn
    assert.strictEqual(parseYouTubeId(`https://youtu.be/${targetId}`), targetId);

    // Link YouTube Shorts
    assert.strictEqual(parseYouTubeId(`https://www.youtube.com/shorts/${targetId}`), targetId);

    // Link nhúng Embed
    assert.strictEqual(parseYouTubeId(`https://www.youtube.com/embed/${targetId}`), targetId);

    // Link kèm nhiều tham số query (&t=, &list=, &index=)
    assert.strictEqual(parseYouTubeId(`https://www.youtube.com/watch?v=${targetId}&t=45s&list=PL123&index=2`), targetId);
    assert.strictEqual(parseYouTubeId(`https://youtu.be/${targetId}?t=100`), targetId);

    // ID thô 11 ký tự
    assert.strictEqual(parseYouTubeId(targetId), targetId);

    // Đầu vào không hợp lệ hoặc rỗng
    assert.strictEqual(parseYouTubeId(''), '');
    assert.strictEqual(parseYouTubeId(null), '');
    assert.strictEqual(parseYouTubeId(undefined), '');
    assert.strictEqual(parseYouTubeId('https://google.com'), '');
    assert.strictEqual(parseYouTubeId('invalid_id_length'), '');
  });

  /* ==========================================================================
     2. KIỂM TRA PARSE PHỤ ĐỀ SRT VÀ VTT
     ========================================================================== */
  test('2.1 parseSrtOrVtt: Phân tích file SRT song ngữ 1 file', () => {
    const srtPath = path.join(__dirname, 'fixtures', 'sample_bilingual.srt');
    const content = fs.readFileSync(srtPath, 'utf-8');
    const cues = parseSrtOrVtt(content);

    assert.strictEqual(cues.length, 3);
    assert.strictEqual(cues[0].start, 1.0);
    assert.strictEqual(cues[0].end, 4.5);
    assert.strictEqual(cues[0].zh, '你好，很高兴认识你！');
    assert.strictEqual(cues[0].vi, 'Xin chào, rất vui được làm quen với bạn!');

    assert.strictEqual(cues[1].start, 5.0);
    assert.strictEqual(cues[1].end, 8.2);
    assert.strictEqual(cues[1].zh, '你叫什么名字？');
    assert.strictEqual(cues[1].vi, 'Bạn tên là gì?');
  });

  test('2.2 parseBilingualSubs: Ghép 2 file phụ đề tiếng Trung và tiếng Việt riêng biệt', () => {
    const zhPath = path.join(__dirname, 'fixtures', 'sample_zh.srt');
    const viPath = path.join(__dirname, 'fixtures', 'sample_vi.srt');
    const zhContent = fs.readFileSync(zhPath, 'utf-8');
    const viContent = fs.readFileSync(viPath, 'utf-8');

    const cues = parseBilingualSubs(zhContent, viContent);
    assert.strictEqual(cues.length, 2);
    assert.strictEqual(cues[0].zh, '你好，你好吗？');
    assert.strictEqual(cues[0].vi, 'Xin chào, bạn khỏe không?');
    assert.strictEqual(cues[1].zh, '我很好，谢谢你。');
    assert.strictEqual(cues[1].vi, 'Tôi rất khỏe, cảm ơn bạn.');
  });

  /* ==========================================================================
     3. KIỂM TRA TÌM CÂU THEO THỜI GIAN
     ========================================================================== */
  test('3. findCueByTime: Định vị câu phụ đề theo giây phát', () => {
    const subs = [
      { start: 1.0, end: 4.0, zh: 'Câu 1' },
      { start: 5.0, end: 9.0, zh: 'Câu 2' }
    ];

    // Trước câu 1
    assert.strictEqual(findCueByTime(subs, 0.5), null);

    // Đang trong câu 1
    const c1 = findCueByTime(subs, 2.5);
    assert.ok(c1);
    assert.strictEqual(c1.zh, 'Câu 1');

    // Khoảng giữa câu 1 và câu 2
    assert.strictEqual(findCueByTime(subs, 4.5), null);

    // Đang trong câu 2
    const c2 = findCueByTime(subs, 7.0);
    assert.ok(c2);
    assert.strictEqual(c2.zh, 'Câu 2');

    // Sau khi video kết thúc
    assert.strictEqual(findCueByTime(subs, 12.0), null);
  });

  /* ==========================================================================
     4. KIỂM TRA TÁCH TỪ DÀI NHẤT THEO TỪ ĐIỂN
     ========================================================================== */
  test('4. tokenizeLongestWords: Tách từ ghép dài nhất theo từ điển HSK', () => {
    const mockDict = {
      '你好': { py: 'nǐ hǎo', vi: 'xin chào' },
      '很高兴': { py: 'hěn gāoxìng', vi: 'rất vui' },
      '认识': { py: 'rènshi', vi: 'quen biết' },
      '中国人': { py: 'zhōngguó rén', vi: 'người Trung Quốc' }
    };
    const mockCharMap = {
      '你': 'nǐ',
      '我': 'wǒ',
      '叫': 'jiào'
    };

    const sentence = '你好，很高兴认识你！';
    const tokens = tokenizeLongestWords(sentence, mockDict, mockCharMap);

    // Các token mong đợi: '你好' (từ 2 chữ), '，' (dấu câu), '很高兴' (từ 3 chữ), '认识' (từ 2 chữ), '你' (chữ đơn), '！' (dấu câu)
    const wordsOnly = tokens.filter(t => !t.isPunct).map(t => t.word);
    assert.deepStrictEqual(wordsOnly, ['你好', '很高兴', '认识', '你']);

    // Kiểm tra thông tin từ ghép
    const tokenHngx = tokens.find(t => t.word === '很高兴');
    assert.ok(tokenHngx);
    assert.strictEqual(tokenHngx.isWord, true);
    assert.strictEqual(tokenHngx.py, 'hěn gāoxìng');
    assert.strictEqual(tokenHngx.vi, 'rất vui');
  });

  /* ==========================================================================
     5. KIỂM TRA SINH CÂU HỎI TRẮC NGHIỆM
     ========================================================================== */
  test('5. generateQuizFromSubs: Tự động sinh bộ câu hỏi trắc nghiệm hợp lệ', () => {
    const srtPath = path.join(__dirname, 'fixtures', 'sample_bilingual.srt');
    const cues = parseSrtOrVtt(fs.readFileSync(srtPath, 'utf-8'));

    const questions = generateQuizFromSubs(cues);
    assert.ok(questions.length >= 3 && questions.length <= 5);

    questions.forEach((q, idx) => {
      assert.ok(q.id);
      assert.ok(q.question);
      assert.ok(Array.isArray(q.options));
      assert.strictEqual(q.options.length, 4, `Câu ${idx + 1} phải có 4 lựa chọn`);
      assert.ok(q.answerIndex >= 0 && q.answerIndex < 4);
      assert.ok(q.explanation);
    });
  });

  /* ==========================================================================
     6. KIỂM TRA LƯU / ĐỌC TIẾN ĐỘ XEM
     ========================================================================== */
  test('6. saveVideoProgress & getVideoProgress: Lưu trữ và kích hoạt hoàn thành', () => {
    // Giả lập localStorage trong Node
    const storageMap = {};
    global.localStorage = {
      getItem: (key) => storageMap[key] || null,
      setItem: (key, val) => { storageMap[key] = String(val); },
      removeItem: (key) => { delete storageMap[key]; }
    };
    global.window = { localStorage: global.localStorage };

    const testVidId = 'test-video-progress-1';

    // Lưu tiến độ 50%
    saveVideoProgress(testVidId, { seconds: 15, percent: 50 });
    let prog = getVideoProgress(testVidId);
    assert.strictEqual(prog.percent, 50);
    assert.strictEqual(prog.completed, false);

    // Lưu tiến độ 85% -> Đánh dấu hoàn thành
    saveVideoProgress(testVidId, { seconds: 30, percent: 85 });
    prog = getVideoProgress(testVidId);
    assert.strictEqual(prog.percent, 85);
    assert.strictEqual(prog.completed, true);
  });

  /* ==========================================================================
     7. KIỂM TRA TÍCH HỢP HỆ THỐNG KINH TẾ (ECONOMY) VÀ TRẦN THƯỞNG
     ========================================================================== */
  test('7.1 Economy REWARDS: Đầy đủ khóa videoWatched và videoShadow', () => {
    assert.ok(Economy.REWARDS.videoWatched, 'Phải có phần thưởng videoWatched');
    assert.strictEqual(Economy.REWARDS.videoWatched.coins, 15);
    assert.strictEqual(Economy.REWARDS.videoWatched.xp, 20);

    assert.ok(Economy.REWARDS.videoShadow, 'Phải có phần thưởng videoShadow');
    assert.strictEqual(Economy.REWARDS.videoShadow.coins, 3);
    assert.strictEqual(Economy.REWARDS.videoShadow.xp, 5);
  });

  test('7.2 Economy reward daily cap: Trần thưởng videoWatched (tối đa 5 lần/ngày)', () => {
    // Reset ví hôm nay
    if (typeof Economy._resetState === 'function') Economy._resetState();

    for (let i = 1; i <= 5; i++) {
      const res = Economy.reward('videoWatched');
      assert.ok(res.coins > 0, `Lần ${i} phải nhận được xu`);
    }

    // Lần thứ 6 phải chạm trần
    const cappedRes = Economy.reward('videoWatched');
    assert.strictEqual(cappedRes.coins, 0, 'Lần thứ 6 phải nhận 0 xu vì vượt trần ngày');
    assert.strictEqual(cappedRes.capped, true);
  });

  test('7.3 generateDailyQuests: Có nhiệm vụ Xem 1 video khi có >= 1 video', () => {
    // Khi có video (videoCount: 1)
    const questsWithVideo = Economy.generateDailyQuests('2026-08-20', { videoCount: 1 });
    assert.strictEqual(questsWithVideo.length, 3);

    // Thử nghiệm các ngày khác nhau để kiểm tra xuất hiện videoWatched trong pool
    let foundVideoQuest = false;
    for (let day = 1; day <= 15; day++) {
      const dStr = `2026-08-${String(day).padStart(2, '0')}`;
      const qList = Economy.generateDailyQuests(dStr, { videoCount: 1 });
      if (qList.some(q => q.study.key === 'videoWatched')) {
        foundVideoQuest = true;
        const vq = qList.find(q => q.study.key === 'videoWatched');
        assert.strictEqual(vq.study.title, 'Xem 1 video');
        assert.strictEqual(vq.study.target, 1);
        break;
      }
    }
    assert.ok(foundVideoQuest, 'Nhiệm vụ "Xem 1 video" phải xuất hiện trong các ngày ngẫu nhiên khi có video');
  });

  /* ==========================================================================
     8. KIỂM TRA CÔNG CỤ DÒNG LỆNH PYTHON (tools/them_video.py)
     ========================================================================== */
  test('8. Python them_video.py: Đọc SRT và ghi ra file dữ liệu videos tạm', () => {
    const fixtureSrt = path.join(__dirname, 'fixtures', 'sample_bilingual.srt');
    const tempOutJs = path.join(__dirname, 'fixtures', 'temp_test_videos.js');

    // Dọn dẹp file tạm nếu có từ trước
    if (fs.existsSync(tempOutJs)) fs.unlinkSync(tempOutJs);

    const cmd = `python tools/them_video.py --link "https://www.youtube.com/watch?v=dQw4w9WgXcQ" --tieu-de "Chào hỏi sơ cấp" --cap HSK1 --chu-de "Chào hỏi" --sub "${fixtureSrt}" --out "${tempOutJs}"`;

    try {
      execSync(cmd, { stdio: 'pipe' });
    } catch (e) {
      assert.fail(`Chạy tools/them_video.py thất bại: ${e.stderr ? e.stderr.toString() : e.message}`);
    }

    assert.ok(fs.existsSync(tempOutJs), 'File tạm temp_test_videos.js phải được tạo ra');
    const generatedContent = fs.readFileSync(tempOutJs, 'utf-8');

    assert.ok(generatedContent.includes('Chào hỏi sơ cấp'));
    assert.ok(generatedContent.includes('dQw4w9WgXcQ'));
    assert.ok(generatedContent.includes('你好，很高兴认识你！'));
    assert.ok(generatedContent.includes('Xin chào, rất vui được làm quen với bạn!'));

    // Dọn dẹp sau khi kiểm tra xong
    if (fs.existsSync(tempOutJs)) fs.unlinkSync(tempOutJs);
  });

  /* ==========================================================================
     9. KIỂM TRA DỮ LIỆU MẪU (data/zh/videos.js)
     ========================================================================== */
  test('9. Dữ liệu mẫu VIDEOS_ZH: Chứa video mẫu hợp lệ để người dùng thử nghiệm', () => {
    assert.ok(Array.isArray(VIDEOS_ZH));
    assert.ok(VIDEOS_ZH.length >= 1, 'Phải có ít nhất 1 video mẫu');

    const sample = VIDEOS_ZH.find(v => v.isSample);
    assert.ok(sample, 'Phải có video được đánh dấu isSample: true');
    assert.strictEqual(sample.level, 'HSK1');
    assert.ok(sample.subs.length >= 6, 'Video mẫu phải có từ 6 đến 8 câu');

    sample.subs.forEach(s => {
      assert.ok(s.start !== undefined && s.end !== undefined);
      assert.ok(s.zh && s.py && s.vi);
    });
  });
});
