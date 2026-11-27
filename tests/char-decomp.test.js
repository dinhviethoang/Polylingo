/**
 * tests/char-decomp.test.js
 * Bộ kiểm thử tự động cho dữ liệu chiết tự chữ Hán HSK1 (data/zh/char-decomp.js).
 * Chạy: node tests/char-decomp.test.js
 */

const assert = require('assert');

// Khởi tạo window nếu chạy môi trường Node.js thuần
if (typeof window === 'undefined') {
  global.window = {};
}

// Nạp dữ liệu
require('../data/zh/hsk1-words-a.js');
require('../data/zh/hsk1-words-b.js');
require('../data/zh/radicals.js');
const CHAR_DECOMP = require('../data/zh/char-decomp.js');

let testCount = 0;
function test(name, fn) {
  try {
    fn();
    testCount++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ ${name}`);
    throw err;
  }
}

console.log('=== BẮT ĐẦU KIỂM TRA DỮ LIỆU CHIẾT TỰ HÁN TỰ (CHAR-DECOMP) ===\n');

// 1. Kiểm tra độ phủ 100% chữ trong HSK1_WORDS
test('1. Phủ đủ 100% chữ Hán xuất hiện trong window.HSK1_WORDS', () => {
  const words = window.HSK1_WORDS;
  assert.ok(words, 'window.HSK1_WORDS phải tồn tại');

  const allChars = new Set();
  for (const word of Object.keys(words)) {
    for (const ch of word) {
      if (/[\u4e00-\u9fa5]/.test(ch)) {
        allChars.add(ch);
      }
    }
  }

  assert.strictEqual(allChars.size, 478, `Số chữ Hán khác nhau phải đúng 478, nhận được: ${allChars.size}`);

  const missing = [];
  for (const ch of allChars) {
    if (!CHAR_DECOMP[ch]) {
      missing.push(ch);
    }
  }

  assert.strictEqual(missing.length, 0, `Còn thiếu các chữ sau trong CHAR_DECOMP: ${missing.join(', ')}`);
  assert.ok(Object.keys(CHAR_DECOMP).length >= 478, 'CHAR_DECOMP phải có ít nhất 478 mục');
});

// 2. Kiểm tra cấu trúc trường dữ liệu chuẩn của từng chữ
test('2. Mỗi mục có đầy đủ py, hv, meaning, strokes > 0, radical, structure, parts hợp lệ', () => {
  const validCJK = /^[\u2e80-\u2fd5\u3400-\u9fff]$/;
  const validStructures = new Set([
    'trái-phải', 'trên-dưới', 'bao quanh', 'nửa bao', 'độc thể',
    'trên-giữa-dưới', 'trái-giữa-phải', 'lồng nhau'
  ]);
  const validRoles = new Set(['nghĩa', 'âm', 'hình']);
  const validPositions = new Set(['trái', 'phải', 'trên', 'dưới', 'ngoài', 'trong', 'giữa']);

  for (const [ch, entry] of Object.entries(CHAR_DECOMP)) {
    // py
    assert.strictEqual(typeof entry.py, 'string', `${ch}: py phải là chuỗi`);
    assert.ok(entry.py.trim().length > 0, `${ch}: py không được rỗng`);

    // hv
    assert.strictEqual(typeof entry.hv, 'string', `${ch}: hv phải là chuỗi`);
    assert.ok(entry.hv.trim().length > 0, `${ch}: hv không được rỗng`);

    // meaning
    assert.strictEqual(typeof entry.meaning, 'string', `${ch}: meaning phải là chuỗi`);
    assert.ok(entry.meaning.trim().length > 0, `${ch}: meaning không được rỗng`);

    // strokes
    assert.strictEqual(typeof entry.strokes, 'number', `${ch}: strokes phải là số`);
    assert.ok(entry.strokes > 0, `${ch}: strokes phải > 0 (nhận ${entry.strokes})`);

    // radical
    assert.strictEqual(typeof entry.radical, 'string', `${ch}: radical phải là chuỗi`);
    assert.ok(entry.radical.trim().length > 0, `${ch}: radical không được rỗng`);

    // structure
    assert.ok(validStructures.has(entry.structure), `${ch}: structure không hợp lệ (${entry.structure})`);

    // parts
    assert.ok(Array.isArray(entry.parts), `${ch}: parts phải là mảng`);
    if (entry.structure === 'độc thể') {
      assert.strictEqual(entry.parts.length, 0, `${ch}: chữ độc thể parts phải là mảng rỗng`);
    } else {
      assert.ok(entry.parts.length >= 2, `${ch}: chữ hợp thể parts phải có ít nhất 2 thành phần`);
      for (const part of entry.parts) {
        assert.ok(part.c && typeof part.c === 'string', `${ch}: part.c phải là chuỗi`);
        assert.ok(validCJK.test(part.c), `${ch}: part.c (${part.c}) phải là chữ Hán hoặc bộ thủ CJK hợp lệ`);
        assert.ok(part.name && part.name.trim().length > 0, `${ch}: part.name không được rỗng`);
        assert.ok(part.vi && part.vi.trim().length > 0, `${ch}: part.vi không được rỗng`);
        assert.ok(validPositions.has(part.pos), `${ch}: part.pos (${part.pos}) không hợp lệ`);
        assert.ok(validRoles.has(part.role), `${ch}: part.role (${part.role}) phải là nghĩa | âm | hình`);
      }
    }
  }
});

// 3. Kiểm tra mnemonic: không rỗng, <= 200 ký tự, <= 30 từ
test('3. Mẹo nhớ (mnemonic) không rỗng, dài ≤ 200 ký tự và ≤ 30 từ tiếng Việt', () => {
  for (const [ch, entry] of Object.entries(CHAR_DECOMP)) {
    assert.strictEqual(typeof entry.mnemonic, 'string', `${ch}: mnemonic phải là chuỗi`);
    const mne = entry.mnemonic.trim();
    assert.ok(mne.length > 0, `${ch}: mnemonic không được rỗng`);
    assert.ok(mne.length <= 200, `${ch}: mnemonic dài ${mne.length} ký tự, vượt quá trần 200 ký tự`);
    const words = mne.split(/\s+/).filter(Boolean);
    assert.ok(words.length <= 30, `${ch}: mnemonic có ${words.length} từ, vượt quá trần 30 từ`);
  }
});

// 4. Kiểm tra tay 30 chữ Hán thông dụng về số nét và bộ thủ
test('4. Kiểm tra tay 30 chữ Hán chuẩn mực về số nét và bộ thủ (人, 好, 你, 我, 是, 的, 妈, 谢, 学, 中, 国, 爱 ...)', () => {
  const manual30 = [
    { ch: '人', strokes: 2, radicals: ['人'] },
    { ch: '好', strokes: 6, radicals: ['女'] },
    { ch: '你', strokes: 7, radicals: ['亻', '人'] },
    { ch: '我', strokes: 7, radicals: ['戈', '手'] },
    { ch: '是', strokes: 9, radicals: ['日'] },
    { ch: '的', strokes: 8, radicals: ['白'] },
    { ch: '妈', strokes: 6, radicals: ['女'] },
    { ch: '谢', strokes: 12, radicals: ['讠', '言'] },
    { ch: '学', strokes: 8, radicals: ['子'] },
    { ch: '中', strokes: 4, radicals: ['丨', '口'] },
    { ch: '国', strokes: 8, radicals: ['囗'] },
    { ch: '爱', strokes: 10, radicals: ['爫', '爪'] },
    { ch: '一', strokes: 1, radicals: ['一'] },
    { ch: '大', strokes: 3, radicals: ['大'] },
    { ch: '小', strokes: 3, radicals: ['小'] },
    { ch: '不', strokes: 4, radicals: ['一'] },
    { ch: '他', strokes: 5, radicals: ['亻', '人'] },
    { ch: '她', strokes: 6, radicals: ['女'] },
    { ch: '吃', strokes: 6, radicals: ['口'] },
    { ch: '喝', strokes: 12, radicals: ['口'] },
    { ch: '叫', strokes: 5, radicals: ['口'] },
    { ch: '话', strokes: 8, radicals: ['讠', '言'] },
    { ch: '说', strokes: 9, radicals: ['讠', '言'] },
    { ch: '请', strokes: 10, radicals: ['讠', '言'] },
    { ch: '想', strokes: 13, radicals: ['心'] },
    { ch: '家', strokes: 10, radicals: ['宀'] },
    { ch: '看', strokes: 9, radicals: ['目'] },
    { ch: '见', strokes: 4, radicals: ['见'] },
    { ch: '书', strokes: 4, radicals: ['丨', '乛', '乙'] },
    { ch: '点', strokes: 9, radicals: ['灬', '火'] }
  ];

  assert.strictEqual(manual30.length, 30, 'Phải có đủ 30 chữ kiểm tra tay');

  for (const item of manual30) {
    const entry = CHAR_DECOMP[item.ch];
    assert.ok(entry, `Không tìm thấy chữ ${item.ch} trong CHAR_DECOMP`);
    assert.strictEqual(
      entry.strokes,
      item.strokes,
      `Số nét của chữ ${item.ch} sai: nhận ${entry.strokes}, kỳ vọng ${item.strokes}`
    );
    assert.ok(
      item.radicals.includes(entry.radical),
      `Bộ thủ của chữ ${item.ch} (${entry.radical}) không nằm trong danh sách kỳ vọng [${item.radicals.join(', ')}]`
    );
  }
});

// 5. Kiểm tra tính hợp lệ của phân loại hình thanh, hội ý, độc thể
test('5. Tỷ lệ chữ độc thể và hợp thể phân loại chính xác, không bịa chiết tự', () => {
  let docTheCount = 0;
  let hopTheCount = 0;
  for (const entry of Object.values(CHAR_DECOMP)) {
    if (entry.structure === 'độc thể') {
      docTheCount++;
      assert.strictEqual(entry.parts.length, 0);
    } else {
      hopTheCount++;
      assert.ok(entry.parts.length >= 2);
    }
  }

  assert.ok(docTheCount >= 100, `Số chữ độc thể hợp lý (>= 100 chữ), nhận: ${docTheCount}`);
  assert.ok(hopTheCount >= 300, `Số chữ hợp thể hợp lý (>= 300 chữ), nhận: ${hopTheCount}`);
  assert.strictEqual(docTheCount + hopTheCount, 478, 'Tổng số chữ phải đúng 478');
});

// 6. Kiểm tra không chứa cụm từ sáo rỗng bị cấm và tránh lối mòn cho 你, 好, 我
test('6. Mẹo nhớ không chứa cụm sáo rỗng (kết hợp hài hòa, biểu thị ý nghĩa, chuẩn mực, sâu sắc, Chữ kết hợp, Hội ý từ, âm mượn từ) và tránh lối mòn 你, 好, 我', () => {
  const forbiddenPhrases = [
    'kết hợp hài hòa',
    'biểu thị ý nghĩa',
    'chuẩn mực',
    'sâu sắc',
    'chữ kết hợp',
    'hội ý từ',
    'âm mượn từ'
  ];

  for (const [ch, entry] of Object.entries(CHAR_DECOMP)) {
    const mneLower = entry.mnemonic.toLowerCase();
    for (const phrase of forbiddenPhrases) {
      assert.ok(
        !mneLower.includes(phrase),
        `Chữ ${ch} chứa cụm từ bị cấm "${phrase}": "${entry.mnemonic}"`
      );
    }
  }

  // Kiểm tra riêng 你, 好, 我 theo yêu cầu
  const niMne = CHAR_DECOMP['你'].mnemonic.toLowerCase();
  assert.ok(!niMne.includes('người đối diện'), 'Chữ 你 không được dùng lối giải thích "người đối diện"');

  const haoMne = CHAR_DECOMP['好'].mnemonic.toLowerCase();
  assert.ok(!haoMne.includes('con trai con gái') && !haoMne.includes('viên mãn'), 'Chữ 好 không được dùng lối giải thích "con trai con gái/viên mãn"');

  const woMne = CHAR_DECOMP['我'].mnemonic.toLowerCase();
  assert.ok(!woMne.includes('bảo vệ bản thân'), 'Chữ 我 không được dùng lối giải thích "bảo vệ bản thân"');
});

// 7. Kiểm tra độ dài mỗi mnemonic đạt 12–40 từ tiếng Việt
test('7. Mỗi mẹo nhớ (mnemonic) phải có độ dài từ 12 đến 40 từ tiếng Việt', () => {
  for (const [ch, entry] of Object.entries(CHAR_DECOMP)) {
    const words = entry.mnemonic.trim().split(/\s+/).filter(Boolean);
    assert.ok(
      words.length >= 12 && words.length <= 40,
      `Chữ ${ch} có số từ (${words.length}) không nằm trong khoảng 12–40 từ: "${entry.mnemonic}"`
    );
  }
});

// 8. Kiểm tra tính đa dạng mở đầu: không quá 3 mnemonic có cùng 5 từ đầu
test('8. Tính đa dạng: không quá 3 mẹo nhớ có cùng 5 từ đầu', () => {
  const prefixCounts = {};
  for (const [ch, entry] of Object.entries(CHAR_DECOMP)) {
    const words = entry.mnemonic.trim().split(/\s+/).filter(Boolean);
    const prefix5 = words.slice(0, 5).join(' ').toLowerCase();
    if (!prefixCounts[prefix5]) {
      prefixCounts[prefix5] = [];
    }
    prefixCounts[prefix5].push(ch);
  }

  for (const [prefix, chars] of Object.entries(prefixCounts)) {
    assert.ok(
      chars.length <= 3,
      `Có ${chars.length} chữ cùng mở đầu bằng 5 từ "${prefix}": [${chars.join(', ')}] (tối đa cho phép 3)`
    );
  }
});

// 9. Kiểm tra mọi chữ có parts thì mnemonic nhắc ít nhất 1 ký tự trong parts
test('9. Mọi chữ có parts thì mnemonic phải nhắc ít nhất 1 ký tự trong parts', () => {
  for (const [ch, entry] of Object.entries(CHAR_DECOMP)) {
    if (entry.parts && entry.parts.length > 0) {
      const partChars = entry.parts.map(p => p.c);
      const mentionsPart = partChars.some(c => entry.mnemonic.includes(c));
      assert.ok(
        mentionsPart,
        `Chữ ${ch} có parts [${partChars.join(', ')}] nhưng mnemonic không nhắc ký tự nào: "${entry.mnemonic}"`
      );
    }
  }
});

// ============================================================================
// KẾT LUẬN & IN KẾT QUẢ
// ============================================================================

console.log('\n========================================');
console.log(`OK ${testCount} tests`);
console.log('Tất cả các bài kiểm tra CHIẾT TỰ HÁN TỰ ĐÃ VƯỢT QUA thành công!\n');
