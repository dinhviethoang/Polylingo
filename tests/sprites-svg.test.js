/**
 * tests/sprites-svg.test.js
 * Kiểm tra các hàm SVG thuần trong game/sprites.js (Theme Icons & NPC Avatars & Pets)
 * Đảm bảo: trả về chuỗi <svg hợp lệ, không chứa emoji.
 */

const assert = require('assert');
const Sprites = require('../game/sprites.js');

const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

let testCount = 0;

function it(name, fn) {
  try {
    fn();
    testCount++;
  } catch (err) {
    console.error(`✗ LỖI: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// -----------------------------------------------------------------------------
// 1. renderThemeIconSVG: 4 themes + fallback
// -----------------------------------------------------------------------------
it('renderThemeIconSVG: Hàm tồn tại và được export', () => {
  assert.strictEqual(typeof Sprites.renderThemeIconSVG, 'function');
});

const THEMES = ['chinese', 'japanese', 'english', 'russian'];

THEMES.forEach(themeId => {
  it(`renderThemeIconSVG: Theme "${themeId}" trả về SVG hợp lệ và không chứa emoji`, () => {
    const svg = Sprites.renderThemeIconSVG(themeId, 24);
    assert.ok(typeof svg === 'string', 'Phải trả về chuỗi');
    assert.ok(svg.trim().startsWith('<svg'), 'Phải bắt đầu bằng thẻ <svg');
    assert.ok(svg.includes('</svg>'), 'Phải có thẻ đóng </svg>');
    assert.ok(!emojiRegex.test(svg), `SVG của theme "${themeId}" không được chứa emoji`);
  });
});

it('renderThemeIconSVG: Fallback cho theme không xác định', () => {
  const svg = Sprites.renderThemeIconSVG('unknown_theme', 24);
  assert.ok(svg.trim().startsWith('<svg'));
  assert.ok(!emojiRegex.test(svg));
});

// -----------------------------------------------------------------------------
// 2. renderNpcAvatarSVG: 6 IDs + fallback + name lookup
// -----------------------------------------------------------------------------
it('renderNpcAvatarSVG: Hàm tồn tại và được export', () => {
  assert.strictEqual(typeof Sprites.renderNpcAvatarSVG, 'function');
});

const NPC_IDS = ['tieu-mai', 'thay-ly', 'bac-vuong', 'co-lan', 'su-phu-chu', 'default'];

NPC_IDS.forEach(npcId => {
  it(`renderNpcAvatarSVG: NPC "${npcId}" trả về SVG hợp lệ và không chứa emoji`, () => {
    const svg = Sprites.renderNpcAvatarSVG(npcId, 40);
    assert.ok(typeof svg === 'string', 'Phải trả về chuỗi');
    assert.ok(svg.trim().startsWith('<svg'), 'Phải bắt đầu bằng thẻ <svg');
    assert.ok(svg.includes('</svg>'), 'Phải có thẻ đóng </svg>');
    assert.ok(!emojiRegex.test(svg), `SVG của NPC "${npcId}" không được chứa emoji`);
  });
});

it('renderNpcAvatarSVG: Tương thích ngược với tên khách cũ trong localStorage', () => {
  const names = ['Tiểu Mai', 'Thầy Lý', 'Bác Vương', 'Cô Lan', 'Sư phụ Chu'];
  names.forEach(name => {
    const svg = Sprites.renderNpcAvatarSVG(name, 40);
    assert.ok(svg.trim().startsWith('<svg'));
    assert.ok(!emojiRegex.test(svg));
  });
});

it('renderNpcAvatarSVG: Fallback an toàn cho mã đơn hàng cũ (ord.id)', () => {
  const svg = Sprites.renderNpcAvatarSVG('order_1740000000000_1', 40);
  assert.ok(svg.trim().startsWith('<svg'));
  assert.ok(svg.includes('npc-default'));
  assert.ok(!emojiRegex.test(svg));
});

// -----------------------------------------------------------------------------
// 3. renderPetSVG: 8 Linh thú
// -----------------------------------------------------------------------------
const PETS = ['panda', 'dragon', 'maneki_neko', 'kitsune', 'lion', 'owl', 'misha', 'firebird'];

PETS.forEach(petId => {
  it(`renderPetSVG: Linh thú "${petId}" trả về SVG hợp lệ và không chứa emoji`, () => {
    const svg = Sprites.renderPetSVG(petId, 64, 64);
    assert.ok(svg.trim().startsWith('<svg'));
    assert.ok(!emojiRegex.test(svg));
  });
});

console.log(`✓ Đã vượt qua tất cả ${testCount} kiểm thử trong sprites-svg.test.js!`);
