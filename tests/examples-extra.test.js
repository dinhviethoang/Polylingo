/**
 * tests/examples-extra.test.js
 * Bộ kiểm tra chất lượng câu ví dụ mở rộng và token pinyin cho 500 từ HSK1.
 * Chạy bằng Node.js thuần: node tests/examples-extra.test.js
 */

const assert = require('assert');

// Khởi tạo window nếu cần và nạp dữ liệu từ vựng HSK1
global.window = global.window || {};
require('../data/zh/hsk1-words-a.js');
require('../data/zh/hsk1-words-b.js');
const { ZH_EXAMPLES_EXTRA, ZH_EXAMPLE_TOKENS } = require('../data/zh/examples-extra.js');

const HSK1_WORDS = global.window.HSK1_WORDS;

let testCount = 0;

function runTest(name, fn) {
  try {
    fn();
    testCount++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ THẤT BẠI: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

console.log('=== BẮT ĐẦU KIỂM TRA CÂU VÍ DỤ MỞ RỘNG HSK1 (ZH EXAMPLES EXTRA) ===\n');

// 1. Kiểm tra số lượng từ
runTest('1. Đủ 501 từ trong ZH_EXAMPLES_EXTRA và ZH_EXAMPLE_TOKENS', () => {
  assert.ok(HSK1_WORDS, 'HSK1_WORDS phải tồn tại');
  const hskKeys = Object.keys(HSK1_WORDS);
  assert.strictEqual(hskKeys.length, 501, `HSK1_WORDS cần đủ 501 từ, hiện có ${hskKeys.length}`);

  assert.ok(ZH_EXAMPLES_EXTRA, 'ZH_EXAMPLES_EXTRA phải tồn tại');
  const extraKeys = Object.keys(ZH_EXAMPLES_EXTRA);
  assert.strictEqual(extraKeys.length, 501, `ZH_EXAMPLES_EXTRA cần đủ 501 từ, hiện có ${extraKeys.length}`);

  assert.ok(ZH_EXAMPLE_TOKENS, 'ZH_EXAMPLE_TOKENS phải tồn tại');
  const tokenKeys = Object.keys(ZH_EXAMPLE_TOKENS);
  assert.strictEqual(tokenKeys.length, 501, `ZH_EXAMPLE_TOKENS cần đủ 501 từ, hiện có ${tokenKeys.length}`);

  for (const w of hskKeys) {
    assert.ok(ZH_EXAMPLES_EXTRA[w], `Từ "${w}" thiếu trong ZH_EXAMPLES_EXTRA`);
    assert.ok(ZH_EXAMPLE_TOKENS[w], `Từ "${w}" thiếu trong ZH_EXAMPLE_TOKENS`);
  }
});

// 2. Kiểm tra số câu mới của mỗi từ
runTest('2. Mỗi từ có >= 2 câu ví dụ mới', () => {
  let totalSentences = 0;
  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    assert.ok(Array.isArray(sentences), `Danh sách câu của "${w}" phải là mảng`);
    assert.ok(
      sentences.length >= 2,
      `Từ "${w}" phải có ít nhất 2 câu ví dụ mới, hiện có ${sentences.length}`
    );
    totalSentences += sentences.length;
  }
  assert.ok(totalSentences >= 1000, `Tổng số câu mới phải >= 1000, hiện có ${totalSentences}`);
});

// 3. Kiểm tra câu mới chứa đúng từ đó
runTest('3. Mọi câu ví dụ mới đều chứa đúng từ mục tiêu', () => {
  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    for (let i = 0; i < sentences.length; i++) {
      const s = sentences[i];
      assert.ok(s.zh, `Câu thứ ${i + 1} của "${w}" thiếu trường zh`);

      if (w.includes('...')) {
        const parts = w.split('...');
        const match = parts.every(p => s.zh.includes(p));
        assert.ok(
          match,
          `Câu "${s.zh}" không khớp mẫu ngữ pháp "${w}"`
        );
      } else {
        assert.ok(
          s.zh.includes(w),
          `Câu "${s.zh}" không chứa từ mục tiêu "${w}"`
        );
      }
    }
  }
});

// 4. Kiểm tra độ dài câu ngắn (4-12 chữ Hán, chuỗi <= 14 ký tự)
runTest('4. Mọi câu ví dụ mới đều ngắn (độ dài 4-12 chữ Hán, chuỗi <= 14 ký tự)', () => {
  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    for (const s of sentences) {
      const sChars = s.zh.match(/[\u4e00-\u9fa5]/g) || [];
      assert.ok(
        sChars.length >= 4 && sChars.length <= 12,
        `Câu "${s.zh}" của từ "${w}" có ${sChars.length} chữ Hán (yêu cầu 4-12)`
      );
      assert.ok(
        s.zh.length <= 14,
        `Câu "${s.zh}" của từ "${w}" vượt quá 14 ký tự (dài ${s.zh.length})`
      );
    }
  }
});

// 5. Kiểm tra không câu nào trùng câu ex gốc
runTest('5. Không câu ví dụ mới nào trùng với câu ex sẵn có của từ', () => {
  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    const origEx = HSK1_WORDS[w].ex.zh;
    for (const s of sentences) {
      assert.notStrictEqual(
        s.zh,
        origEx,
        `Từ "${w}" có câu ví dụ mới trùng câu gốc: "${s.zh}"`
      );
    }
  }
});

// 6. Kiểm tra ghép tokens.w = zh
runTest('6. Ghép các tokens.w tái tạo chính xác 100% câu tiếng Hán (zh)', () => {
  // Kiểm tra câu mới
  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    for (const s of sentences) {
      assert.ok(Array.isArray(s.tokens) && s.tokens.length > 0, `Thiếu tokens ở câu "${s.zh}"`);
      const reconstructed = s.tokens.map(t => t.w).join('');
      assert.strictEqual(
        reconstructed,
        s.zh,
        `Nối tokens.w ("${reconstructed}") không khớp zh ("${s.zh}") của từ "${w}"`
      );
    }
  }

  // Kiểm tra tokens của câu gốc
  for (const [w, tokens] of Object.entries(ZH_EXAMPLE_TOKENS)) {
    assert.ok(Array.isArray(tokens) && tokens.length > 0, `Thiếu tokens cho câu gốc của "${w}"`);
    const origZh = HSK1_WORDS[w].ex.zh;
    const reconstructed = tokens.map(t => t.w).join('');
    assert.strictEqual(
      reconstructed,
      origZh,
      `Nối tokens.w câu gốc ("${reconstructed}") không khớp ex.zh ("${origZh}") của từ "${w}"`
    );
  }
});

// 7. Kiểm tra token chữ Hán có pinyin không rỗng
runTest('7. Mọi token có chữ Hán đều có pinyin không rỗng; dấu câu có py rỗng', () => {
  const checkToken = (t, context) => {
    assert.ok(t.w !== undefined, `Token thiếu trường w trong ${context}`);
    assert.ok(t.py !== undefined, `Token thiếu trường py trong ${context}`);

    if (/[\u4e00-\u9fa5]/.test(t.w)) {
      assert.ok(
        t.py.trim().length > 0,
        `Token chữ Hán "${t.w}" có pinyin rỗng trong ${context}`
      );
    } else if (/^[\s\p{P}\p{S}]+$/u.test(t.w)) {
      assert.strictEqual(
        t.py,
        '',
        `Token dấu câu "${t.w}" phải có py rỗng trong ${context}`
      );
    }
  };

  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    for (const s of sentences) {
      for (const t of s.tokens) {
        checkToken(t, `câu mới "${s.zh}" (từ "${w}")`);
      }
    }
  }

  for (const [w, tokens] of Object.entries(ZH_EXAMPLE_TOKENS)) {
    for (const t of tokens) {
      checkToken(t, `câu gốc của từ "${w}"`);
    }
  }
});

// 8. Kiểm tra không có chữ số trong pinyin
runTest('8. Pinyin không chứa chữ số (sử dụng dấu thanh chuẩn từ điển)', () => {
  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    for (const s of sentences) {
      assert.ok(
        !/[0-9]/.test(s.py),
        `Câu pinyin chứa chữ số: "${s.py}" trong câu "${s.zh}"`
      );
      for (const t of s.tokens) {
        assert.ok(
          !/[0-9]/.test(t.py),
          `Token pinyin chứa chữ số: "${t.py}" của token "${t.w}" trong câu "${s.zh}"`
        );
      }
    }
  }

  for (const [w, tokens] of Object.entries(ZH_EXAMPLE_TOKENS)) {
    for (const t of tokens) {
      assert.ok(
        !/[0-9]/.test(t.py),
        `Token pinyin câu gốc chứa chữ số: "${t.py}" của "${t.w}" (từ "${w}")`
      );
    }
  }
});

// 9. Kiểm tra nghĩa tiếng Việt đầy đủ và không rỗng
runTest('9. Mọi câu ví dụ mới đều có nghĩa tiếng Việt tự nhiên, không rỗng', () => {
  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    for (const s of sentences) {
      assert.ok(
        typeof s.vi === 'string' && s.vi.trim().length > 0,
        `Câu "${s.zh}" của từ "${w}" thiếu nghĩa tiếng Việt (vi)`
      );
    }
  }
});

// 10. Kiểm tra 0 câu mới có chữ ngoài tập chữ HSK1 (trừ từ mục tiêu)
runTest('10. 0 câu mới có chữ ngoài tập chữ HSK1 (trừ từ mục tiêu)', () => {
  const hanziRegex = /[\u4e00-\u9fa5]/g;
  const allowedChars = new Set();
  for (const k of Object.keys(HSK1_WORDS)) {
    const chars = k.match(hanziRegex);
    if (chars) chars.forEach(c => allowedChars.add(c));
  }

  let outsideCount = 0;
  const violations = [];

  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    const targetChars = new Set((w.match(hanziRegex) || []));
    for (const s of sentences) {
      const sChars = s.zh.match(hanziRegex) || [];
      const outside = sChars.filter(c => !allowedChars.has(c) && !targetChars.has(c));
      if (outside.length > 0) {
        outsideCount++;
        violations.push({ word: w, zh: s.zh, outside: Array.from(new Set(outside)) });
      }
    }
  }

  assert.strictEqual(
    outsideCount,
    0,
    `Có ${outsideCount} câu mới dùng chữ ngoài tập chữ HSK1: ${JSON.stringify(violations.slice(0, 5))}`
  );
});

// 11. Kiểm tra mọi token nhiều chữ có py không chứa dấu cách
runTest('11. Mọi token nhiều chữ có py không chứa dấu cách (viết liền âm tiết)', () => {
  let spaceTokenCount = 0;
  const violations = [];

  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    for (const s of sentences) {
      for (const t of s.tokens) {
        if (t.w.length > 1 && t.py && t.py.includes(' ')) {
          spaceTokenCount++;
          violations.push({ word: w, context: 'ZH_EXAMPLES_EXTRA', token: t, zh: s.zh });
        }
      }
    }
  }

  for (const [w, tokens] of Object.entries(ZH_EXAMPLE_TOKENS)) {
    for (const t of tokens) {
      if (t.w.length > 1 && t.py && t.py.includes(' ')) {
        spaceTokenCount++;
        violations.push({ word: w, context: 'ZH_EXAMPLE_TOKENS', token: t });
      }
    }
  }

  assert.strictEqual(
    spaceTokenCount,
    0,
    `Có ${spaceTokenCount} token nhiều chữ chứa dấu cách trong py: ${JSON.stringify(violations.slice(0, 5))}`
  );
});

// 12. Kiểm tra chuỗi py câu == nối tokens theo quy tắc
runTest('12. Chuỗi py của câu mới == nối tokens theo quy tắc (dấu cách giữa token, dấu câu dính liền, viết hoa đầu câu/tên riêng)', () => {
  const PUNCT_MAP = {
    '，': ',',
    '。': '.',
    '！': '!',
    '？': '?',
    '、': ',',
    '：': ':',
    '；': ';',
    '“': '"',
    '”': '"',
    '（': '(',
    '）': ')',
    '…': '...',
    ' ': ' '
  };

  function joinTokensPinyin(tokens) {
    let res = '';
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      const isPunct = PUNCT_MAP[t.w] !== undefined || /^[\s\p{P}\p{S}]+$/u.test(t.w);
      if (isPunct) {
        const p = PUNCT_MAP[t.w] !== undefined ? PUNCT_MAP[t.w] : t.w;
        res = res.trimEnd() + p;
      } else {
        let py = t.py || '';
        const isStart = res.length === 0 || /[.!?]\s*$/.test(res);
        if (isStart && py.length > 0) {
          py = py.charAt(0).toUpperCase() + py.slice(1);
        }
        if (res.length > 0 && !res.endsWith(' ') && !res.endsWith('"') && !res.endsWith('(')) {
          res += ' ' + py;
        } else {
          res += py;
        }
      }
    }
    return res.trim();
  }

  let mismatchCount = 0;
  const violations = [];

  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    for (const s of sentences) {
      const expectedPy = joinTokensPinyin(s.tokens);
      if (s.py !== expectedPy) {
        mismatchCount++;
        violations.push({
          word: w,
          zh: s.zh,
          py: s.py,
          expectedPy
        });
      }
    }
  }

  assert.strictEqual(
    mismatchCount,
    0,
    `Có ${mismatchCount} câu có chuỗi py không khớp nối tokens: ${JSON.stringify(violations.slice(0, 5))}`
  );
});

// 13. Kiểm tra không token nào bắt đầu bằng 很/太/真 mà dài hơn 1 chữ (ngoại lệ: 真的, 太太, 很多)
runTest('13. Không token nào bắt đầu bằng 很/太/真 mà dài hơn 1 chữ (ngoại lệ: 真的, 太太, 很多)', () => {
  const prefixes = ['很', '太', '真'];
  const ALLOWED_EXCEPTIONS = new Set(['真的', '太太', '很多']);
  const violations = [];

  const checkList = (list, context) => {
    for (const t of list) {
      if (prefixes.some(p => t.w.startsWith(p) && t.w.length > p.length)) {
        if (!ALLOWED_EXCEPTIONS.has(t.w)) {
          violations.push({ context, token: t });
        }
      }
    }
  };

  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    for (const s of sentences) checkList(s.tokens, `câu mới "${s.zh}" (từ "${w}")`);
  }
  for (const [w, tokens] of Object.entries(ZH_EXAMPLE_TOKENS)) {
    checkList(tokens, `câu gốc của từ "${w}"`);
  }

  assert.strictEqual(
    violations.length,
    0,
    `Có ${violations.length} token bắt đầu bằng 很/太/真 không hợp lệ: ${JSON.stringify(violations.slice(0, 5))}`
  );
});

// 14. Kiểm tra trợ từ ngữ khí "啊" ở cuối câu mang thanh nhẹ (py == "a")
runTest('14. Trợ từ ngữ khí "啊" ở cuối câu mang thanh nhẹ (py == "a")', () => {
  const violations = [];
  const checkList = (list, context) => {
    for (let i = 0; i < list.length; i++) {
      const t = list[i];
      if (t.w === '啊') {
        const isEnd = (i === list.length - 1) || (i === list.length - 2 && /^[\s\p{P}\p{S}]+$/u.test(list[list.length - 1].w));
        if (isEnd && t.py !== 'a') {
          violations.push({ context, token: t });
        }
      }
    }
  };

  for (const [w, sentences] of Object.entries(ZH_EXAMPLES_EXTRA)) {
    for (const s of sentences) checkList(s.tokens, `câu mới "${s.zh}" (từ "${w}")`);
  }
  for (const [w, tokens] of Object.entries(ZH_EXAMPLE_TOKENS)) {
    checkList(tokens, `câu gốc của từ "${w}"`);
  }

  assert.strictEqual(
    violations.length,
    0,
    `Có ${violations.length} token "啊" cuối câu không mang thanh nhẹ "a": ${JSON.stringify(violations)}`
  );
});

// 15. Kiểm tra các ví dụ lỗi tiêu biểu đã sửa đúng tokens và pinyin
runTest('15. Kiểm tra các ví dụ lỗi tiêu biểu đã sửa đúng tokens và pinyin', () => {
  // 1. 这部新电影真的很好看。 -> py kết thúc "hěn hǎokàn.", tách 很 | 好看
  const haokanSentences = ZH_EXAMPLES_EXTRA['好看'];
  const s1 = haokanSentences.find(s => s.zh === '这部新电影真的很好看。');
  assert.ok(s1, 'Phải có câu "这部新电影真的很好看。"');
  assert.ok(s1.py.endsWith('hěn hǎokàn.'), `py phải kết thúc bằng "hěn hǎokàn.", hiện là "${s1.py}"`);
  assert.ok(s1.tokens.some(t => t.w === '很' && t.py === 'hěn'), 'Phải có token "很"');
  assert.ok(s1.tokens.some(t => t.w === '好看' && t.py === 'hǎokàn'), 'Phải có token "好看"');

  // 2. 喔，我明白了。 -> "明白" là 1 token "míngbai"
  const oSentences = ZH_EXAMPLES_EXTRA['喔'];
  const s2 = oSentences.find(s => s.zh === '喔，我明白了。');
  assert.ok(s2, 'Phải có câu "喔，我明白了。"');
  assert.ok(s2.tokens.some(t => t.w === '明白' && t.py === 'míngbai'), 'Token "明白" phải có py "míngbai"');
  assert.ok(s2.py.includes('míngbai'), `py phải chứa "míngbai", hiện là "${s2.py}"`);

  // 3. 毛笔字 -> 毛笔 là 1 token "máobǐ"
  const kuaiSentences = ZH_EXAMPLES_EXTRA['块'];
  const s3a = kuaiSentences.find(s => s.zh.includes('毛笔'));
  assert.ok(s3a, 'Phải có câu chứa "毛笔" trong từ "块"');
  assert.ok(s3a.tokens.some(t => t.w === '毛笔' && t.py === 'máobǐ'), 'Token "毛笔" phải có py "máobǐ"');

  const xieSentences = ZH_EXAMPLES_EXTRA['写'];
  const s3b = xieSentences.find(s => s.zh.includes('毛笔'));
  assert.ok(s3b, 'Phải có câu chứa "毛笔" trong từ "写"');
  assert.ok(s3b.tokens.some(t => t.w === '毛笔' && t.py === 'máobǐ'), 'Token "毛笔" phải có py "máobǐ"');

  // 4. 还是 -> 1 token "háishi"
  const heSentences = ZH_EXAMPLES_EXTRA['喝'];
  const s4 = heSentences.find(s => s.zh === '你喜欢喝咖啡还是红茶？');
  assert.ok(s4, 'Phải có câu "你喜欢喝咖啡还是红茶？"');
  assert.ok(s4.tokens.some(t => t.w === '还是' && t.py === 'háishi'), 'Token "还是" phải có py "háishi"');

  // 5. 时间过得真快啊！ -> "啊" cuối câu là "a"
  const shijianSentences = ZH_EXAMPLES_EXTRA['时间'];
  const s5 = shijianSentences.find(s => s.zh === '时间过得真快啊！');
  assert.ok(s5, 'Phải có câu "时间过得真快啊！"');
  assert.strictEqual(s5.py, 'Shíjiān guò de zhēn kuài a!');
  const ahToken = s5.tokens.find(t => t.w === '啊');
  assert.ok(ahToken && ahToken.py === 'a', 'Token "啊" cuối câu phải có py "a"');

  // 6. 得 sau động từ (过得, 写得) là bổ ngữ -> "de"
  const kuaiSentences2 = ZH_EXAMPLES_EXTRA['快'];
  const s6 = kuaiSentences2.find(s => s.zh.includes('时间过得真快'));
  assert.ok(s6, 'Phải có câu chứa "时间过得真快" trong từ "快"');
  assert.ok(s6.tokens.some(t => t.w === '过' && t.py === 'guò'), 'Token "过" phải có py "guò"');
  assert.ok(s6.tokens.some(t => t.w === '得' && t.py === 'de'), 'Token "得" phải có py "de"');
});

console.log(`\n========================================`);
console.log(`OK ${testCount} tests`);
console.log(`Tất cả bài kiểm tra CÂU VÍ DỤ MỞ RỘNG ĐÃ VƯỢT QUA thành công!\n`);
