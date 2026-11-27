/**
 * tests/icons.test.js
 * Kiểm tra bộ icon SVG thuần dùng chung (PolyIcons) bằng Node.js thuần.
 * Chạy: node tests/icons.test.js
 * Yêu cầu: Dùng assert, in "OK n tests" khi thành công.
 */

const assert = require('assert');
const PolyIcons = require('../icons.js');

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

// ============================================================================
// 1. Cấu trúc đối tượng PolyIcons
// ============================================================================

runTest('PolyIcons xuất đủ các hàm cốt lõi svg, has, list', () => {
  assert.ok(PolyIcons, 'PolyIcons phải tồn tại');
  assert.strictEqual(typeof PolyIcons.svg, 'function', 'svg phải là hàm');
  assert.strictEqual(typeof PolyIcons.has, 'function', 'has phải là hàm');
  assert.strictEqual(typeof PolyIcons.list, 'function', 'list phải là hàm');
});

runTest('PolyIcons.list() trả về mảng danh sách icon không rỗng', () => {
  const list = PolyIcons.list();
  assert.ok(Array.isArray(list), 'list() phải trả về một mảng');
  assert.ok(list.length >= 60, `Số lượng icon phải phong phú (hiện có: ${list.length})`);
  // Kiểm tra không có phần tử trùng lặp trong list
  const unique = new Set(list);
  assert.strictEqual(unique.size, list.length, 'Danh sách icon không được trùng lặp');
});

// ============================================================================
// 2. Kiểm tra các icon bắt buộc theo yêu cầu (54 icon mới)
// ============================================================================

const REQUIRED_ICONS = [
  'home', 'map', 'book', 'cards', 'pen', 'check-circle', 'chat', 'mic', 'volume',
  'play', 'pause', 'repeat', 'keyboard', 'gamepad', 'sprout', 'coin', 'droplet',
  'star', 'fire', 'trophy', 'gift', 'video', 'settings', 'search', 'x', 'check',
  'alert', 'info', 'lightbulb', 'target', 'clock', 'calendar', 'chevron-left',
  'chevron-right', 'arrow-left', 'arrow-right', 'plus', 'refresh', 'heart', 'lock',
  'unlock', 'sparkle', 'flag', 'headphones', 'eye', 'eye-off', 'shuffle', 'list',
  'grid', 'user', 'globe', 'music', 'zap', 'award'
];

runTest('Có đủ tất cả 54 icon bắt buộc theo yêu cầu đề bài', () => {
  for (const name of REQUIRED_ICONS) {
    assert.strictEqual(
      PolyIcons.has(name),
      true,
      `Thiếu icon bắt buộc: ${name}`
    );
  }
});

// ============================================================================
// 3. Kiểm tra các icon từ learn.js và practice.js
// ============================================================================

const LEGACY_MODULE_ICONS = [
  'speaker', 'speakerSlow', 'play', 'pause', 'eye', 'eyeOff', 'check', 'repeat',
  'arrowLeft', 'arrowRight', 'starFilled', 'starOutline', 'lock', 'book', 'bookmark',
  'close', 'trophy', 'clock', 'sparkle', 'lightbulb', 'x', 'mic', 'micOff',
  'bookOpen', 'spellCheck', 'languages', 'arrowLeftRight', 'layoutGrid', 'penTool',
  'keyboard', 'shuffle', 'headphones'
];

runTest('Hỗ trợ đầy đủ tất cả icon từ learn.js và practice.js (cả tên camelCase)', () => {
  for (const name of LEGACY_MODULE_ICONS) {
    assert.strictEqual(
      PolyIcons.has(name),
      true,
      `Thiếu icon cũ của module: ${name}`
    );
  }
});

// ============================================================================
// 4. Mọi icon hợp lệ phải trả SVG hợp lệ có aria-hidden="true" và class ds-icon
// ============================================================================

runTest('Mọi icon trong PolyIcons.list() đều trả chuỗi SVG hợp lệ có aria-hidden', () => {
  const list = PolyIcons.list();
  for (const name of list) {
    const svg = PolyIcons.svg(name);
    assert.strictEqual(typeof svg, 'string', `Icon ${name} phải trả về string`);
    assert.ok(svg.startsWith('<svg'), `Icon ${name} phải mở đầu bằng <svg`);
    assert.ok(svg.endsWith('</svg>'), `Icon ${name} phải kết thúc bằng </svg>`);
    assert.ok(svg.includes('class="ds-icon"'), `Icon ${name} phải có class ds-icon`);
    assert.ok(svg.includes('aria-hidden="true"'), `Icon ${name} phải có aria-hidden="true"`);
    assert.ok(svg.includes('viewBox="0 0 24 24"'), `Icon ${name} phải có viewBox 0 0 24 24`);
    assert.ok(svg.includes('stroke="currentColor"'), `Icon ${name} phải có stroke currentColor`);
  }
});

// ============================================================================
// 5. Tên lạ / không tồn tại phải trả về chuỗi rỗng
// ============================================================================

runTest('Tên lạ hoặc rỗng phải trả chuỗi rỗng và has() trả false', () => {
  assert.strictEqual(PolyIcons.svg('khong-ton-tai-xyz-123'), '');
  assert.strictEqual(PolyIcons.has('khong-ton-tai-xyz-123'), false);

  assert.strictEqual(PolyIcons.svg(''), '');
  assert.strictEqual(PolyIcons.has(''), false);

  assert.strictEqual(PolyIcons.svg(null), '');
  assert.strictEqual(PolyIcons.has(null), false);

  assert.strictEqual(PolyIcons.svg(undefined), '');
  assert.strictEqual(PolyIcons.has(undefined), false);

  assert.strictEqual(PolyIcons.svg(123), '');
  assert.strictEqual(PolyIcons.has(123), false);
});

// ============================================================================
// 6. Kiểm tra các tùy chọn opts (size, className, ariaLabel)
// ============================================================================

runTest('Tùy biến size: đổi width và height trong svg', () => {
  const svg = PolyIcons.svg('home', { size: 32 });
  assert.ok(svg.includes('width="32"'), 'Phải có width="32"');
  assert.ok(svg.includes('height="32"'), 'Phải có height="32"');
});

runTest('Tùy biến className: ghép thêm lớp tiện ích ngoài ds-icon', () => {
  const svg = PolyIcons.svg('star', { className: 'text-warning pulse' });
  assert.ok(svg.includes('class="ds-icon text-warning pulse"'), 'Phải chứa class mở rộng');
});

runTest('Tùy biến ariaLabel: sinh thuộc tính aria-label và role="img"', () => {
  const svg = PolyIcons.svg('chat', { ariaLabel: 'Mở cửa sổ trò chuyện' });
  assert.ok(svg.includes('aria-label="Mở cửa sổ trò chuyện"'), 'Phải có aria-label');
  assert.ok(svg.includes('role="img"'), 'Phải có role="img" khi có aria-label');
  assert.ok(!svg.includes('aria-hidden="true"'), 'Không được có aria-hidden="true" khi có aria-label');
});

runTest('Tùy biến strokeWidth: đổi độ dày nét vẽ', () => {
  const svg = PolyIcons.svg('heart', { strokeWidth: 1.5 });
  assert.ok(svg.includes('stroke-width="1.5"'), 'Phải có stroke-width="1.5"');
});

// ============================================================================
// 7. Tổng kết kết quả kiểm thử
// ============================================================================

console.log(`OK ${testCount} tests`);
