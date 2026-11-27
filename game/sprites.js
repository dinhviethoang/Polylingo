/**
 * game/sprites.js - Thư viện SVG thuần đồ họa nông trại "Vườn Treo Tri Thức"
 * Phong cách Kawaii / Pastel ấm áp, Sticker bo viền nâu mềm, Đồ họa CÂY TRI THỨC & 8 Linh thú chibi
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const s = factory();
    root.Sprites = s;
    root.FarmSprites = s;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ==========================================================================
     1. Dữ liệu Hạt giống & Cây trồng (16 loại cây chuẩn 3 nhóm)
     ========================================================================== */
  const CROP_DEFS = {
    chrysanthemum: { id: 'chrysanthemum', name: 'Hoa Cúc', hanzi: '菊花', pinyin: 'júhua', meaning: 'Hoa cúc vàng', category: 'flower', seedCost: 6, growMinutes: 1, maxHarvests: 1, yield: 2, sellPrice: 6, xp: 6, unlockLevel: 1 },
    lotus:         { id: 'lotus', name: 'Hoa Sen', hanzi: '莲花', pinyin: 'liánhua', meaning: 'Hoa sen thuần khiết', category: 'flower', seedCost: 14, growMinutes: 2, maxHarvests: 2, yield: 2, sellPrice: 14, xp: 12, unlockLevel: 2 },
    peony:         { id: 'peony', name: 'Mẫu Đơn', hanzi: '牡丹', pinyin: 'mǔdan', meaning: 'Mẫu đơn vương giả', category: 'flower', seedCost: 30, growMinutes: 4, maxHarvests: 2, yield: 3, sellPrice: 22, xp: 25, unlockLevel: 5 },
    peach_blossom: { id: 'peach_blossom', name: 'Hoa Đào', hanzi: '桃花', pinyin: 'táohua', meaning: 'Hoa đào ngày Tết', category: 'flower', seedCost: 48, growMinutes: 6, maxHarvests: 3, yield: 3, sellPrice: 32, xp: 40, unlockLevel: 7 },
    plum_blossom:  { id: 'plum_blossom', name: 'Hoa Mai', hanzi: '梅花', pinyin: 'méihua', meaning: 'Hoa mai kiên cường', category: 'flower', seedCost: 75, growMinutes: 8, maxHarvests: 3, yield: 4, sellPrice: 46, xp: 60, unlockLevel: 10 },
    strawberry:    { id: 'strawberry', name: 'Dâu Tây', hanzi: '草莓', pinyin: 'cǎoméi', meaning: 'Dâu tây đỏ mọng', category: 'crop', seedCost: 10, growMinutes: 1.5, maxHarvests: 3, yield: 3, sellPrice: 8, xp: 8, unlockLevel: 1 },
    tomato:        { id: 'tomato', name: 'Cà Chua', hanzi: '西红柿', pinyin: 'xīhóngshì', meaning: 'Cà chua chín đỏ', category: 'crop', seedCost: 16, growMinutes: 2.5, maxHarvests: 2, yield: 3, sellPrice: 13, xp: 14, unlockLevel: 2 },
    pumpkin:       { id: 'pumpkin', name: 'Bí Ngô', hanzi: '南瓜', pinyin: 'nángua', meaning: 'Bí ngô vàng óng', category: 'crop', seedCost: 22, growMinutes: 3.5, maxHarvests: 1, yield: 1, sellPrice: 42, xp: 20, unlockLevel: 3 },
    watermelon:    { id: 'watermelon', name: 'Dưa Hấu', hanzi: '西瓜', pinyin: 'xīgua', meaning: 'Dưa hấu mát ngọt', category: 'crop', seedCost: 35, growMinutes: 5, maxHarvests: 1, yield: 1, sellPrice: 70, xp: 30, unlockLevel: 4 },
    tea:           { id: 'tea', name: 'Cây Trà', hanzi: '茶', pinyin: 'chá', meaning: 'Búp trà xanh thơm', category: 'crop', seedCost: 45, growMinutes: 5, maxHarvests: 4, yield: 3, sellPrice: 24, xp: 36, unlockLevel: 6 },
    bamboo:        { id: 'bamboo', name: 'Tre Trúc', hanzi: '竹子', pinyin: 'zhúzi', meaning: 'Khóm tre măng non', category: 'crop', seedCost: 65, growMinutes: 7, maxHarvests: 2, yield: 4, sellPrice: 50, xp: 52, unlockLevel: 8 },
    grape:         { id: 'grape', name: 'Nho Tím', hanzi: '葡萄', pinyin: 'pútao', meaning: 'Chùm nho mọng nước', category: 'crop', seedCost: 80, growMinutes: 8, maxHarvests: 3, yield: 4, sellPrice: 45, xp: 66, unlockLevel: 9 },
    apple:         { id: 'apple', name: 'Cây Táo', hanzi: '苹果', pinyin: 'píngguǒ', meaning: 'Táo đỏ giòn ngọt', category: 'crop', seedCost: 100, growMinutes: 10, maxHarvests: 4, yield: 4, sellPrice: 58, xp: 85, unlockLevel: 11 },
    orange:        { id: 'orange', name: 'Cây Cam', hanzi: '橙子', pinyin: 'chéngzi', meaning: 'Cam vàng mọng nước', category: 'crop', seedCost: 125, growMinutes: 12, maxHarvests: 4, yield: 5, sellPrice: 65, xp: 100, unlockLevel: 12 },
    ginseng:       { id: 'ginseng', name: 'Nhân Sâm', hanzi: '人参', pinyin: 'rénshēn', meaning: 'Nhân sâm trường thọ', category: 'rare', seedCost: 220, growMinutes: 15, maxHarvests: 2, yield: 2, sellPrice: 240, xp: 180, unlockLevel: 14 },
    celestial_peach: { id: 'celestial_peach', name: 'Đào Tiên', hanzi: '仙桃', pinyin: 'xiāntáo', meaning: 'Đào tiên bồng lai', category: 'rare', seedCost: 380, growMinutes: 20, maxHarvests: 3, yield: 3, sellPrice: 340, xp: 280, unlockLevel: 16 }
  };

  /* ==========================================================================
     2. Dữ liệu Hạng Chậu & Nâng cấp sao
     ========================================================================== */
  const POT_TIERS = {
    clay: {
      id: 'clay',
      name: 'Đất nung',
      fullName: 'Chậu Đất Nung',
      cost: 30,
      unlockLevel: 1,
      color: '#D47E53',
      darkColor: '#8C3D1E',
      highlightColor: '#F5A882',
      accentColor: '#FFFFFF',
      upgrades: [
        { star: 1, speed: 0,    yieldBonus: 0,    xpBonus: 0,    doubleChance: 0 },
        { star: 2, speed: 0.05, yieldBonus: 0.05, xpBonus: 0.05, doubleChance: 0.02 },
        { star: 3, speed: 0.10, yieldBonus: 0.10, xpBonus: 0.10, doubleChance: 0.04 },
        { star: 4, speed: 0.15, yieldBonus: 0.15, xpBonus: 0.15, doubleChance: 0.06 },
        { star: 5, speed: 0.20, yieldBonus: 0.20, xpBonus: 0.20, doubleChance: 0.08 }
      ]
    },
    ceramic: {
      id: 'ceramic',
      name: 'Gốm men',
      fullName: 'Chậu Gốm Men Ngọc',
      cost: 150,
      unlockLevel: 3,
      color: '#2DD4BF',
      darkColor: '#0F766E',
      highlightColor: '#99F6E4',
      accentColor: '#FEF08A',
      upgrades: [
        { star: 1, speed: 0.15, yieldBonus: 0.15, xpBonus: 0.20, doubleChance: 0.12 },
        { star: 2, speed: 0.20, yieldBonus: 0.20, xpBonus: 0.25, doubleChance: 0.15 },
        { star: 3, speed: 0.25, yieldBonus: 0.25, xpBonus: 0.30, doubleChance: 0.18 },
        { star: 4, speed: 0.30, yieldBonus: 0.30, xpBonus: 0.35, doubleChance: 0.22 },
        { star: 5, speed: 0.35, yieldBonus: 0.35, xpBonus: 0.40, doubleChance: 0.26 }
      ]
    },
    porcelain: {
      id: 'porcelain',
      name: 'Sứ lam',
      fullName: 'Chậu Sứ Lam Hoàng Cung',
      cost: 400,
      unlockLevel: 6,
      color: '#FFFFFF',
      darkColor: '#1E3A8A',
      highlightColor: '#BFDBFE',
      accentColor: '#3B82F6',
      upgrades: [
        { star: 1, speed: 0.28, yieldBonus: 0.30, xpBonus: 0.45, doubleChance: 0.22 },
        { star: 2, speed: 0.32, yieldBonus: 0.35, xpBonus: 0.52, doubleChance: 0.26 },
        { star: 3, speed: 0.36, yieldBonus: 0.40, xpBonus: 0.60, doubleChance: 0.30 },
        { star: 4, speed: 0.40, yieldBonus: 0.45, xpBonus: 0.68, doubleChance: 0.35 },
        { star: 5, speed: 0.45, yieldBonus: 0.50, xpBonus: 0.75, doubleChance: 0.40 }
      ]
    },
    jade: {
      id: 'jade',
      name: 'Ngọc bích',
      fullName: 'Chậu Ngọc Bích Thần Thoại',
      cost: 1000,
      unlockLevel: 9,
      color: '#10B981',
      darkColor: '#064E3B',
      highlightColor: '#A7F3D0',
      accentColor: '#FDE047',
      upgrades: [
        { star: 1, speed: 0.40, yieldBonus: 0.55, xpBonus: 0.75, doubleChance: 0.32 },
        { star: 2, speed: 0.44, yieldBonus: 0.62, xpBonus: 0.85, doubleChance: 0.36 },
        { star: 3, speed: 0.48, yieldBonus: 0.70, xpBonus: 0.95, doubleChance: 0.40 },
        { star: 4, speed: 0.52, yieldBonus: 0.78, xpBonus: 1.05, doubleChance: 0.45 },
        { star: 5, speed: 0.56, yieldBonus: 0.85, xpBonus: 1.15, doubleChance: 0.50 }
      ]
    },
    gold: {
      id: 'gold',
      name: 'Hoàng kim',
      fullName: 'Chậu Hoàng Kim Thái Dương',
      cost: 2500,
      unlockLevel: 13,
      color: '#F59E0B',
      darkColor: '#78350F',
      highlightColor: '#FDE68A',
      accentColor: '#FFFFFF',
      upgrades: [
        { star: 1, speed: 0.52, yieldBonus: 0.85, xpBonus: 1.25, doubleChance: 0.42 },
        { star: 2, speed: 0.55, yieldBonus: 0.95, xpBonus: 1.40, doubleChance: 0.48 },
        { star: 3, speed: 0.58, yieldBonus: 1.05, xpBonus: 1.55, doubleChance: 0.54 },
        { star: 4, speed: 0.62, yieldBonus: 1.15, xpBonus: 1.70, doubleChance: 0.60 },
        { star: 5, speed: 0.65, yieldBonus: 1.25, xpBonus: 1.85, doubleChance: 0.65 }
      ]
    }
  };

  /* ==========================================================================
     3. Dữ liệu Phong Cách Tầng Vườn (Themes)
     ========================================================================== */
  const THEMES = {
    chinese:  { id: 'chinese', langCode: 'zh', name: 'Vườn tre Trung Hoa', icon: '🎋', accent: '#B3261E' },
    japanese: { id: 'japanese', langCode: 'ja', name: 'Vườn anh đào Nhật', icon: '🌸', accent: '#E05D82' },
    english:  { id: 'english', langCode: 'en', name: 'Vườn hoa hồng Anh', icon: '🌹', accent: '#2563EB' },
    russian:  { id: 'russian', langCode: 'ru', name: 'Vườn bạch dương Nga', icon: '🍂', accent: '#D97706' }
  };


function renderPotFace(tierId, potState) {
    const isThirsty = (potState === 'thirsty');
    const isRipe = (potState === 'ripe');

    let eyes = '';
    let mouth = '';
    let blush = '';
    let extra = '';

    if (isThirsty) {
      // Mặt khát: mắt buồn ươn ướt, miệng gợn sóng buồn nhỏ, bong bóng giọt nước nảy trên đầu
      eyes = `
        <g class="pot-eye pot-eye-l">
          <ellipse cx="44" cy="46" rx="3.2" ry="3.6" fill="#3D1A04" />
          <circle cx="45" cy="44.2" r="1.2" fill="#FFFFFF" />
          <circle cx="43" cy="47.5" r="0.6" fill="#FFFFFF" />
        </g>
        <g class="pot-eye pot-eye-r">
          <ellipse cx="66" cy="46" rx="3.2" ry="3.6" fill="#3D1A04" />
          <circle cx="67" cy="44.2" r="1.2" fill="#FFFFFF" />
          <circle cx="65" cy="47.5" r="0.6" fill="#FFFFFF" />
        </g>
      `;
      mouth = `<path d="M 52,51 Q 55,48 58,51" stroke="#7A4B2A" stroke-width="2.2" stroke-linecap="round" fill="none" />`;
      blush = `
        <ellipse cx="37" cy="49.5" rx="3.8" ry="2.2" fill="#FF8FB1" opacity="0.65" />
        <ellipse cx="73" cy="49.5" rx="3.8" ry="2.2" fill="#FF8FB1" opacity="0.65" />
      `;
      extra = `
        <!-- Bong bóng giọt nước nhỏ trên đầu chậu khi khát -->
        <g class="pot-thirsty-bubble" transform="translate(55, 10)">
          <circle cx="0" cy="0" r="10.5" fill="#D8F3FF" stroke="#38BDF8" stroke-width="2" />
          <path d="M 0,-5.5 C -3,-1 -4,1.8 -4,4 C -4,6.2 -2.2,8 0,8 C 2.2,8 4,6.2 4,4 C 4,1.8 3,-1 0,-5.5 Z" fill="#0284C7" />
          <circle cx="1.2" cy="3" r="0.9" fill="#FFFFFF" />
        </g>
      `;
    } else if (isRipe) {
      // Mặt vui khi cây chín: mắt cong ^^, cười tươi há miệng hồng, má hồng rực rỡ, lấp lánh
      eyes = `
        <g class="pot-eye-happy">
          <path d="M 40,47 Q 44,41 48,47" stroke="#3D1A04" stroke-width="2.8" stroke-linecap="round" fill="none" />
          <path d="M 62,47 Q 66,41 70,47" stroke="#3D1A04" stroke-width="2.8" stroke-linecap="round" fill="none" />
        </g>
      `;
      mouth = `<path d="M 50.5,48 Q 55,54.5 59.5,48 Z" fill="#FF5376" stroke="#7A4B2A" stroke-width="1.8" />`;
      blush = `
        <ellipse cx="36" cy="49" rx="4.5" ry="2.6" fill="#FF8FB1" opacity="0.9" />
        <ellipse cx="74" cy="49" rx="4.5" ry="2.6" fill="#FF8FB1" opacity="0.9" />
      `;
      extra = `
        <polygon points="31,40 32,42 34,43 32,44 31,46 30,44 28,43 30,42" fill="#FFD966" />
        <polygon points="79,40 80,42 82,43 80,44 79,46 78,44 76,43 78,42" fill="#FFD966" />
      `;
    } else {
      // Trạng thái bình thường / đang lớn: mặt dễ thương theo từng hạng chậu
      if (tierId === 'clay') {
        // Đất nung: 2 mắt chấm tròn đen có đốm sáng trắng to, má hồng elip, nụ cười mỉm nhỏ
        eyes = `
          <g class="pot-eye pot-eye-l">
            <circle cx="44" cy="46" r="3.3" fill="#3D1A04" />
            <circle cx="43" cy="44.7" r="1.3" fill="#FFFFFF" />
          </g>
          <g class="pot-eye pot-eye-r">
            <circle cx="66" cy="46" r="3.3" fill="#3D1A04" />
            <circle cx="65" cy="44.7" r="1.3" fill="#FFFFFF" />
          </g>
        `;
        mouth = `<path d="M 52,48.5 Q 55,51.5 58,48.5" stroke="#7A4B2A" stroke-width="2" stroke-linecap="round" fill="none" />`;
        blush = `
          <ellipse cx="37" cy="49" rx="4" ry="2.3" fill="#FF8FB1" opacity="0.75" />
          <ellipse cx="73" cy="49" rx="4" ry="2.3" fill="#FF8FB1" opacity="0.75" />
        `;
      } else if (tierId === 'ceramic') {
        // Gốm men: mắt cười tròn tươi tỉnh, má hồng + ngôi sao nhỏ lấp lánh
        eyes = `
          <g class="pot-eye pot-eye-l">
            <circle cx="44" cy="46" r="3.3" fill="#14532D" />
            <circle cx="43" cy="44.6" r="1.3" fill="#FFFFFF" />
          </g>
          <g class="pot-eye pot-eye-r">
            <circle cx="66" cy="46" r="3.3" fill="#14532D" />
            <circle cx="65" cy="44.6" r="1.3" fill="#FFFFFF" />
          </g>
        `;
        mouth = `<path d="M 51.5,48 Q 55,52 58.5,48" stroke="#14532D" stroke-width="2.2" stroke-linecap="round" fill="none" />`;
        blush = `
          <ellipse cx="37" cy="49" rx="4.2" ry="2.4" fill="#FF8FB1" opacity="0.8" />
          <ellipse cx="73" cy="49" rx="4.2" ry="2.4" fill="#FF8FB1" opacity="0.8" />
        `;
        extra = `<polygon points="79,45 80,47 82,47.5 80,48 79,50 78,48 76,47.5 78,47" fill="#FFD966" />`;
      } else if (tierId === 'porcelain') {
        // Sứ lam: nháy mắt tinh nghịch dễ thương (mắt trái nháy ^, mắt phải tròn có đốm sáng)
        eyes = `
          <g class="pot-eye-wink">
            <path d="M 41,47 Q 44,42.5 47,47" stroke="#1E40AF" stroke-width="2.6" stroke-linecap="round" fill="none" />
          </g>
          <g class="pot-eye pot-eye-r">
            <circle cx="66" cy="46" r="3.4" fill="#1E40AF" />
            <circle cx="65" cy="44.6" r="1.4" fill="#FFFFFF" />
          </g>
        `;
        mouth = `<path d="M 51.5,48 Q 55,52.2 58.5,48" stroke="#1E40AF" stroke-width="2.2" stroke-linecap="round" fill="none" />`;
        blush = `
          <ellipse cx="37" cy="49" rx="4.2" ry="2.4" fill="#FF8FB1" opacity="0.85" />
          <ellipse cx="73" cy="49" rx="4.2" ry="2.4" fill="#FF8FB1" opacity="0.85" />
        `;
        extra = `<polygon points="30,42 31,43.5 32.5,44 31,44.5 30,46 29,44.5 27.5,44 29,43.5" fill="#60A5FA" />`;
      } else if (tierId === 'jade') {
        // Ngọc bích: mắt to manga lấp lánh 2 đốm sáng trắng, má hồng to, nụ cười vui tươi
        eyes = `
          <g class="pot-eye pot-eye-l">
            <ellipse cx="44" cy="46" rx="3.5" ry="3.8" fill="#047857" />
            <circle cx="43" cy="44.5" r="1.4" fill="#FFFFFF" />
            <circle cx="45.5" cy="47.5" r="0.7" fill="#FFFFFF" />
          </g>
          <g class="pot-eye pot-eye-r">
            <ellipse cx="66" cy="46" rx="3.5" ry="3.8" fill="#047857" />
            <circle cx="65" cy="44.5" r="1.4" fill="#FFFFFF" />
            <circle cx="67.5" cy="47.5" r="0.7" fill="#FFFFFF" />
          </g>
        `;
        mouth = `<path d="M 51,48 Q 55,53 59,48" stroke="#047857" stroke-width="2.4" stroke-linecap="round" fill="none" />`;
        blush = `
          <ellipse cx="36" cy="49" rx="4.5" ry="2.6" fill="#FF8FB1" opacity="0.85" />
          <ellipse cx="74" cy="49" rx="4.5" ry="2.6" fill="#FF8FB1" opacity="0.85" />
        `;
        extra = `
          <polygon points="30,42 31,43.5 32.5,44 31,44.5 30,46 29,44.5 27.5,44 29,43.5" fill="#FFFFFF" />
          <polygon points="80,42 81,43.5 82.5,44 81,44.5 80,46 79,44.5 77.5,44 79,43.5" fill="#FFFFFF" />
        `;
      } else {
        // Hoàng kim: vương miện nhỏ xinh trên miệng chậu, mắt to lấp lánh, cười tươi rạng rỡ há miệng hồng
        eyes = `
          <g class="pot-eye pot-eye-l">
            <ellipse cx="44" cy="46" rx="3.6" ry="3.8" fill="#78350F" />
            <circle cx="43" cy="44.5" r="1.5" fill="#FFFFFF" />
            <circle cx="45.5" cy="47.5" r="0.7" fill="#FFFFFF" />
          </g>
          <g class="pot-eye pot-eye-r">
            <ellipse cx="66" cy="46" rx="3.6" ry="3.8" fill="#78350F" />
            <circle cx="65" cy="44.5" r="1.5" fill="#FFFFFF" />
            <circle cx="67.5" cy="47.5" r="0.7" fill="#FFFFFF" />
          </g>
        `;
        mouth = `<path d="M 50.5,48 Q 55,54 59.5,48 Z" fill="#FF5376" stroke="#78350F" stroke-width="1.8" />`;
        blush = `
          <ellipse cx="36" cy="49" rx="4.6" ry="2.7" fill="#FF8FB1" opacity="0.9" />
          <ellipse cx="74" cy="49" rx="4.6" ry="2.7" fill="#FF8FB1" opacity="0.9" />
        `;
        extra = `
          <!-- Vương miện nhỏ xinh màu vàng bơ -->
          <path d="M 47,21 L 49,15 L 55,18 L 61,15 L 63,21 Z" fill="#FFD966" stroke="#78350F" stroke-width="1.4" stroke-linejoin="round" />
          <circle cx="55" cy="18" r="1.2" fill="#FF5376" />
          <polygon points="80,41 81,42.5 83,43 81,43.5 80,45 79,43.5 77,43 79,42.5" fill="#FEF08A" />
        `;
      }
    }

    return `
      <g class="pot-cute-face face-${potState || 'normal'}">
        ${blush}
        ${eyes}
        ${mouth}
        ${extra}
      </g>
    `;
  }

  /**
   * Sinh SVG cho 1 chiếc chậu (bo viền sticker nâu ấm 3px, có mặt dễ thương)
   */
  function renderPotSVG(tierId, stars = 1, width = 110, height = 75, potState = 'normal') {
    const tier = POT_TIERS[tierId] || POT_TIERS.clay;
    const safeStars = Math.min(5, Math.max(1, stars || 1));

    let defs = '';
    let bodyPath = '';
    let rimPath = '';
    let baseDetails = '';

    if (tierId === 'clay') {
      // 1. Đất nung: Thân bầu đào pastel ấm, viền sticker nâu ấm #7A4B2A
      defs = `
        <linearGradient id="clayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FDB498" />
          <stop offset="35%" stop-color="#F4936B" />
          <stop offset="75%" stop-color="#DE7951" />
          <stop offset="100%" stop-color="#B85832" />
        </linearGradient>
        <linearGradient id="clayRim" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFC5B0" />
          <stop offset="100%" stop-color="#E27F57" />
        </linearGradient>
      `;
      rimPath = `
        <ellipse cx="55" cy="22" rx="44" ry="9.5" fill="url(#clayRim)" stroke="#7A4B2A" stroke-width="3" stroke-linejoin="round" />
        <ellipse cx="55" cy="22" rx="37" ry="6.5" fill="url(#soilDark)" />
        <ellipse cx="55" cy="23" rx="34" ry="5.2" fill="#241108" opacity="0.45" />
      `;
      bodyPath = `
        <path d="M 14,22 C 11,46 22,68 34,70 L 76,70 C 88,68 99,46 96,22 Z" fill="url(#clayGrad)" stroke="#7A4B2A" stroke-width="3" stroke-linejoin="round" />
        <path d="M 76,70 C 88,68 99,46 96,22 L 86,22 C 89,44 80,64 72,69 Z" fill="#4A1C0B" opacity="0.22" />
        <path d="M 23,27 C 18,44 26,62 33,67" stroke="#FFE4D6" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.7" />
      `;
      baseDetails = `
        <path d="M 22,37 Q 55,45 88,37" fill="none" stroke="#FFC5B0" stroke-width="2.4" stroke-linecap="round" opacity="0.8" />
      `;
    } else if (tierId === 'ceramic') {
      // 2. Gốm men: Men ngọc bích bạc hà tươi sáng, viền sticker đậm bo tròn
      defs = `
        <linearGradient id="cerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#88E8A5" />
          <stop offset="30%" stop-color="#55D179" />
          <stop offset="70%" stop-color="#36B35C" />
          <stop offset="100%" stop-color="#1E7A3E" />
        </linearGradient>
        <linearGradient id="cerShine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.1" />
        </linearGradient>
      `;
      rimPath = `
        <ellipse cx="55" cy="20" rx="45" ry="10" fill="#86EFAC" stroke="#1B4D2E" stroke-width="3" stroke-linejoin="round" />
        <ellipse cx="55" cy="20" rx="38" ry="6.8" fill="url(#soilDark)" />
        <ellipse cx="55" cy="21" rx="35" ry="5.5" fill="#14532D" opacity="0.35" />
      `;
      bodyPath = `
        <path d="M 13,20 C 10,44 22,67 33,69 L 77,69 C 88,67 100,44 97,20 Z" fill="url(#cerGrad)" stroke="#1B4D2E" stroke-width="3" stroke-linejoin="round" />
        <path d="M 77,69 C 88,67 100,44 97,20 L 87,20 C 89,42 81,63 73,68 Z" fill="#062E16" opacity="0.25" />
        <path d="M 23,24 C 20,40 28,58 35,66" stroke="url(#cerShine)" stroke-width="4.8" stroke-linecap="round" fill="none" opacity="0.85" />
      `;
      baseDetails = `
        <circle cx="55" cy="35" r="2.8" fill="#FFFFFF" opacity="0.8" />
      `;
    } else if (tierId === 'porcelain') {
      // 3. Sứ lam: Nền trắng sứ kẹo ngọt viền xanh cobalt
      defs = `
        <linearGradient id="porcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="45%" stop-color="#F8FAFC" />
          <stop offset="80%" stop-color="#E0E7FF" />
          <stop offset="100%" stop-color="#A5B4FC" />
        </linearGradient>
      `;
      rimPath = `
        <ellipse cx="55" cy="19" rx="46" ry="10" fill="#FFFFFF" stroke="#1E40AF" stroke-width="3" stroke-linejoin="round" />
        <ellipse cx="55" cy="19" rx="41" ry="8" fill="none" stroke="#60A5FA" stroke-width="1.6" />
        <ellipse cx="55" cy="19" rx="38" ry="6.8" fill="url(#soilDark)" />
      `;
      bodyPath = `
        <path d="M 12,19 C 9,44 23,68 33,69 L 77,69 C 87,68 101,44 98,19 Z" fill="url(#porcGrad)" stroke="#1E40AF" stroke-width="3" stroke-linejoin="round" />
        <path d="M 77,69 C 87,68 101,44 98,19 L 88,19 C 91,42 81,63 73,68 Z" fill="#1E293B" opacity="0.18" />
        <path d="M 22,24 C 18,40 26,58 33,66" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.9" />
      `;
      baseDetails = `
        <g stroke="#3B82F6" stroke-width="2.2" fill="none" stroke-linecap="round">
          <path d="M 28,34 Q 42,26 48,34 Q 55,26 62,34 Q 68,26 82,34" />
        </g>
      `;
    } else if (tierId === 'jade') {
      // 4. Ngọc bích: Xanh ngọc phát sáng viền vàng kim
      defs = `
        <linearGradient id="jadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#A7F3D0" />
          <stop offset="35%" stop-color="#34D399" />
          <stop offset="75%" stop-color="#10B981" />
          <stop offset="100%" stop-color="#047857" />
        </linearGradient>
      `;
      rimPath = `
        <ellipse cx="55" cy="18" rx="47" ry="10.5" fill="#FFD966" stroke="#7A4B2A" stroke-width="3" stroke-linejoin="round" />
        <ellipse cx="55" cy="18" rx="43" ry="8.5" fill="#6EE7B7" stroke="#047857" stroke-width="2" />
        <ellipse cx="55" cy="18" rx="37" ry="6.5" fill="url(#soilDark)" />
      `;
      bodyPath = `
        <path d="M 11,18 C 8,43 22,68 33,70 L 77,70 C 88,68 102,43 99,18 Z" fill="url(#jadeGrad)" stroke="#047857" stroke-width="3" stroke-linejoin="round" />
        <path d="M 77,70 C 88,68 102,43 99,18 L 89,18 C 92,42 82,64 74,69 Z" fill="#022C1A" opacity="0.25" />
        <path d="M 22,23 C 18,40 26,58 33,67" stroke="#E6FFFA" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.85" />
      `;
      baseDetails = `
        <path d="M 20,36 Q 55,46 90,36" fill="none" stroke="#FFD966" stroke-width="3" stroke-linecap="round" />
      `;
    } else {
      // 5. Hoàng kim: Vàng mật ong ấm áp, quai rồng bo tròn, khảm ngọc hồng
      defs = `
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFF5B8" />
          <stop offset="25%" stop-color="#FFD966" />
          <stop offset="60%" stop-color="#FBBF24" />
          <stop offset="100%" stop-color="#D97706" />
        </linearGradient>
      `;
      rimPath = `
        <ellipse cx="55" cy="18" rx="47" ry="10.5" fill="#FFF176" stroke="#7A4B2A" stroke-width="3" stroke-linejoin="round" />
        <ellipse cx="55" cy="18" rx="42" ry="8" fill="#FBBF24" />
        <ellipse cx="55" cy="18" rx="36" ry="6.2" fill="url(#soilDark)" />
      `;
      bodyPath = `
        <path d="M 14,25 Q 4,32 5,42 Q 7,50 16,48 Q 11,42 13,32 Z" fill="url(#goldGrad)" stroke="#7A4B2A" stroke-width="2.2" stroke-linejoin="round" />
        <path d="M 96,25 Q 106,32 105,42 Q 103,50 94,48 Q 99,42 97,32 Z" fill="url(#goldGrad)" stroke="#7A4B2A" stroke-width="2.2" stroke-linejoin="round" />
        <path d="M 11,18 C 9,43 23,68 34,70 L 76,70 C 87,68 101,43 99,18 Z" fill="url(#goldGrad)" stroke="#7A4B2A" stroke-width="3" stroke-linejoin="round" />
        <path d="M 76,70 C 87,68 101,43 99,18 L 89,18 C 91,42 82,64 74,69 Z" fill="#78350F" opacity="0.2" />
        <path d="M 22,23 C 18,40 26,58 33,67" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.9" />
      `;
      baseDetails = `
        <circle cx="55" cy="35" r="4.5" fill="#FF5376" stroke="#7A4B2A" stroke-width="1.8" />
      `;
    }

    const starItems = [];
    const starStartX = 55 - ((safeStars - 1) * 7.5);
    for (let i = 0; i < safeStars; i++) {
      const sx = starStartX + (i * 15);
      starItems.push(`
        <g transform="translate(${sx}, 75) scale(0.75)">
          <polygon points="0,-6 1.8,-1.8 6.3,-1.8 2.7,0.9 4.1,5.4 0,2.7 -4.1,5.4 -2.7,0.9 -6.3,-1.8 -1.8,-1.8"
                   fill="#FFD966" stroke="#7A4B2A" stroke-width="1.5" stroke-linejoin="round" />
        </g>
      `);
    }

    const potFace = renderPotFace(tierId, potState);

    return `
      <svg class="farm-pot-svg farm-pot-${tierId} state-${potState || 'normal'}" viewBox="0 0 110 82" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          ${defs}
          <radialGradient id="soilDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#4A2818" />
            <stop offset="85%" stop-color="#2D180E" />
            <stop offset="100%" stop-color="#190D07" />
          </radialGradient>
        </defs>

        <ellipse cx="55" cy="74" rx="42" ry="5.5" fill="#000000" opacity="0.18" />
        ${bodyPath}
        ${rimPath}
        ${baseDetails}
        ${potFace}
        <g class="pot-stars-group">
          ${starItems.join('')}
        </g>
      </svg>
    `;
  }

  function renderEmptySlotSVG(width = 110, height = 75) {
    return `
      <svg class="farm-empty-slot-svg" viewBox="0 0 110 80" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pedestalGrad" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FDE7CF" />
            <stop offset="65%" stop-color="#F5C99B" />
            <stop offset="100%" stop-color="#C98B5E" />
          </radialGradient>
          <radialGradient id="soilMound" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#5B3824" />
            <stop offset="75%" stop-color="#3D2012" />
            <stop offset="100%" stop-color="#241108" />
          </radialGradient>
        </defs>
        <ellipse cx="55" cy="70" rx="44" ry="6" fill="#000000" opacity="0.15" />
        <ellipse cx="55" cy="62" rx="43" ry="13" fill="#E2B282" stroke="#7A4B2A" stroke-width="2.6" />
        <ellipse cx="55" cy="57" rx="42" ry="12" fill="url(#pedestalGrad)" stroke="#7A4B2A" stroke-width="2.6" />
        <ellipse cx="55" cy="56" rx="35" ry="9" fill="url(#soilMound)" />
        <!-- 2 chồi non xanh nhạt ngộ nghĩnh hai bên -->
        <path d="M 23,53 Q 27,45 32,51" stroke="#8EDC7A" stroke-width="2.6" fill="none" stroke-linecap="round" />
        <circle cx="32" cy="50" r="1.5" fill="#5DBB63" />
        <path d="M 78,53 Q 82,45 87,51" stroke="#8EDC7A" stroke-width="2.6" fill="none" stroke-linecap="round" />
        <circle cx="87" cy="50" r="1.5" fill="#5DBB63" />
        <!-- Nút cộng nhún nhảy phong cách sticker -->
        <g class="vt-empty-plus-pulse" transform="translate(55, 47)">
          <circle cx="0" cy="0" r="16.5" fill="#FFF8EC" stroke="#7A4B2A" stroke-width="3" />
          <circle cx="0" cy="0" r="13" fill="#C7F5C4" />
          <path d="M 0,-7 L 0,7 M -7,0 L 7,0" stroke="#16A34A" stroke-width="3.8" stroke-linecap="round" />
        </g>
      </svg>
    `;
  }


function renderToolIconSVG(toolId, size = 34) {
    let inner = '';
    if (toolId === 'water') {
      // Bình tưới nước pastel cute với mặt cười
      inner = `
        <ellipse cx="23" cy="27" rx="14" ry="12" fill="#D6F2FE" stroke="#7A4B2A" stroke-width="2.8" />
        <path d="M 15,19 C 15,11 22,7 28,7 C 33,7 36,10 36,15 L 36,19" fill="none" stroke="#7A4B2A" stroke-width="3.5" stroke-linecap="round" />
        <path d="M 33,26 L 43,18" stroke="#7A4B2A" stroke-width="4" stroke-linecap="round" />
        <ellipse cx="43" cy="17" rx="3" ry="5" fill="#38BDF8" stroke="#7A4B2A" stroke-width="2" />
        <path d="M 9,25 C 5,25 4,31 9,34" fill="none" stroke="#7A4B2A" stroke-width="3" stroke-linecap="round" />
        <!-- Mặt cười trên bình tưới -->
        <circle cx="19" cy="25" r="1.6" fill="#7A4B2A" /><circle cx="18.5" cy="24.4" r="0.6" fill="#FFFFFF" />
        <circle cx="26" cy="25" r="1.6" fill="#7A4B2A" /><circle cx="25.5" cy="24.4" r="0.6" fill="#FFFFFF" />
        <ellipse cx="16.5" cy="28" rx="1.8" ry="1.1" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="28.5" cy="28" rx="1.8" ry="1.1" fill="#FF8FB1" opacity="0.85" />
        <path d="M 21,28.5 Q 22.5,30.5 24,28.5" stroke="#7A4B2A" stroke-width="1.6" stroke-linecap="round" fill="none" />
        <circle cx="45" cy="12" r="1.8" fill="#38BDF8" />
        <circle cx="47" cy="18" r="1.4" fill="#38BDF8" />
      `;
    } else if (toolId === 'seed') {
      // Túi hạt giống pastel với mầm non cười
      inner = `
        <path d="M 14,19 C 12,30 15,40 24,40 C 33,40 36,30 34,19 Z" fill="#FCEFD7" stroke="#7A4B2A" stroke-width="2.8" stroke-linejoin="round" />
        <ellipse cx="24" cy="19" rx="10" ry="4.5" fill="#F5C99B" stroke="#7A4B2A" stroke-width="2.6" />
        <!-- Mầm non xanh vươn ra -->
        <path d="M 24,19 Q 20,10 17,7 C 14,8 15,14 24,14" fill="#8EDC7A" stroke="#2F6A44" stroke-width="1.8" />
        <path d="M 24,17 Q 28,9 31,7 C 33,9 31,15 24,15" fill="#C7F5C4" stroke="#2F6A44" stroke-width="1.8" />
        <!-- Mặt cười trên túi hạt -->
        <circle cx="20" cy="27" r="1.5" fill="#7A4B2A" /><circle cx="19.5" cy="26.4" r="0.6" fill="#FFFFFF" />
        <circle cx="28" cy="27" r="1.5" fill="#7A4B2A" /><circle cx="27.5" cy="26.4" r="0.6" fill="#FFFFFF" />
        <ellipse cx="17.5" cy="29.5" rx="1.8" ry="1.1" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="30.5" cy="29.5" rx="1.8" ry="1.1" fill="#FF8FB1" opacity="0.85" />
        <path d="M 22.5,30 Q 24,32 25.5,30" stroke="#7A4B2A" stroke-width="1.5" stroke-linecap="round" fill="none" />
      `;
    } else if (toolId === 'hand') {
      // Găng tay thu hoạch kawaii mũm mĩm có đệm trái tim
      inner = `
        <path d="M 14,21 C 14,16 17,14 19.5,14 C 22,14 23,16 23,20 L 23,28 L 25,28 L 25,17 C 25,14 27,12 29.5,12 C 32,12 33,14 33,17 L 33,28 L 35,28 L 35,20 C 35,17 37,15 39,15 C 41,15 42,17 42,20 L 42,31 C 42,39 36,44 28,44 C 20,44 14,39 14,31 Z" fill="#FFFDF8" stroke="#7A4B2A" stroke-width="2.8" stroke-linejoin="round" />
        <path d="M 14,27 C 10,27 8,24 8,21 C 8,18 10,17 12,19 L 15,24" fill="#FFFDF8" stroke="#7A4B2A" stroke-width="2.6" stroke-linejoin="round" />
        <rect x="14" y="38" width="28" height="7" rx="3.5" fill="#8EDC7A" stroke="#7A4B2A" stroke-width="2.6" />
        <!-- Trái tim hồng trong lòng bàn tay -->
        <path d="M 28,26 C 28,24 26,22 24,22 C 22,22 21,24 21,25.5 C 21,28 24,31 28,34 C 32,31 35,28 35,25.5 C 35,24 34,22 32,22 C 30,22 28,24 28,26 Z" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="1.4" />
      `;
    } else if (toolId === 'fertilizer') {
      // Bình phân bón phép thuật màu cam pastel với nụ cười
      inner = `
        <path d="M 13,17 C 11,29 13,40 24,40 C 35,40 37,29 35,17 Z" fill="#FFE8D6" stroke="#7A4B2A" stroke-width="2.8" stroke-linejoin="round" />
        <polygon points="18,17 24,10 30,17" fill="#FFD966" stroke="#7A4B2A" stroke-width="2.4" stroke-linejoin="round" />
        <ellipse cx="24" cy="17" rx="7" ry="3" fill="#F5C99B" stroke="#7A4B2A" stroke-width="1.8" />
        <path d="M 14,28 C 17,29 20,27 24,27 C 28,27 31,29 34,28 L 33,35 C 30,38 27,39 24,39 C 21,39 18,38 15,35 Z" fill="#8EDC7A" />
        <!-- Mặt cười trên bình phân bón -->
        <circle cx="20" cy="23" r="1.5" fill="#7A4B2A" /><circle cx="19.5" cy="22.4" r="0.6" fill="#FFFFFF" />
        <circle cx="28" cy="23" r="1.5" fill="#7A4B2A" /><circle cx="27.5" cy="22.4" r="0.6" fill="#FFFFFF" />
        <ellipse cx="17.5" cy="25.5" rx="1.8" ry="1" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="30.5" cy="25.5" rx="1.8" ry="1" fill="#FF8FB1" opacity="0.85" />
        <path d="M 22.5,25 Q 24,27 25.5,25" stroke="#7A4B2A" stroke-width="1.5" stroke-linecap="round" fill="none" />
      `;
    } else if (toolId === 'shop') {
      // Cửa hàng kẹo ngọt pastel với mái che sọc hồng trắng
      inner = `
        <rect x="12" y="23" width="24" height="19" rx="3" fill="#FFF8EC" stroke="#7A4B2A" stroke-width="2.8" />
        <rect x="9" y="40" width="30" height="5" rx="2.5" fill="#F5C99B" stroke="#7A4B2A" stroke-width="2.2" />
        <!-- Mái che sọc pastel hồng -->
        <path d="M 9,13 L 39,13 L 36,24 L 12,24 Z" fill="#FFDCE5" stroke="#7A4B2A" stroke-width="2.8" stroke-linejoin="round" />
        <path d="M 9,13 L 13,24 M 17,13 L 19,24 M 24,13 L 24,24 M 31,13 L 29,24 M 39,13 L 36,24" stroke="#FF8FB1" stroke-width="2.4" />
        <!-- Trái tim nhỏ ở cửa hàng -->
        <path d="M 24,29 C 24,27.5 22.5,26 21,26 C 19.5,26 18.5,27.5 18.5,28.5 C 18.5,30.5 21,33 24,35 C 27,33 29.5,30.5 29.5,28.5 C 29.5,27.5 28.5,26 27,26 C 25.5,26 24,27.5 24,29 Z" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="1.4" />
      `;
    } else if (toolId === 'warehouse') {
      // Rương kho báu gỗ bánh quy cute
      inner = `
        <rect x="10" y="16" width="28" height="26" rx="4" fill="#FCEFD7" stroke="#7A4B2A" stroke-width="2.8" />
        <rect x="8" y="14" width="32" height="10" rx="3" fill="#F5C99B" stroke="#7A4B2A" stroke-width="2.6" />
        <line x1="10" y1="28" x2="38" y2="28" stroke="#7A4B2A" stroke-width="2" />
        <!-- Ổ khóa hình trái tim vàng -->
        <circle cx="24" cy="28" r="5" fill="#FFD966" stroke="#7A4B2A" stroke-width="2" />
        <circle cx="24" cy="28" r="1.6" fill="#7A4B2A" />
      `;
    } else if (toolId === 'orders') {
      // Cuộn thư đơn hàng kẹo ngọt có dấu sáp trái tim
      inner = `
        <path d="M 14,11 C 11,11 10,14 10,16 C 10,18 12,19 14,19 L 34,19 C 36,19 38,18 38,16 C 38,14 37,11 34,11 Z" fill="#FFD966" stroke="#7A4B2A" stroke-width="2.4" />
        <path d="M 12,16 L 12,36 C 12,39 14,41 18,41 L 34,41 C 36,41 38,39 38,36 L 38,16" fill="#FFFDF8" stroke="#7A4B2A" stroke-width="2.8" stroke-linejoin="round" />
        <line x1="16" y1="23" x2="32" y2="23" stroke="#F5C99B" stroke-width="2.6" stroke-linecap="round" />
        <line x1="16" y1="28" x2="28" y2="28" stroke="#F5C99B" stroke-width="2.6" stroke-linecap="round" />
        <line x1="16" y1="33" x2="25" y2="33" stroke="#F5C99B" stroke-width="2.6" stroke-linecap="round" />
        <!-- Con dấu sáp trái tim đỏ -->
        <circle cx="32" cy="34" r="4.5" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="1.8" />
        <path d="M 32,32.5 C 32,31.5 31,30.5 30,30.5 C 29,30.5 28.5,31.5 28.5,32 C 28.5,33.5 30,35 32,36.5 C 34,35 35.5,33.5 35.5,32 C 35.5,31.5 35,30.5 34,30.5 C 33,30.5 32,31.5 32,32.5 Z" fill="#FFFFFF" />
      `;
    } else if (toolId === 'pets') {
      // Dấu chân linh thú hồng kẹo với đệm hình trái tim
      inner = `
        <ellipse cx="24" cy="30" rx="10" ry="8.5" fill="#FFDCE5" stroke="#7A4B2A" stroke-width="2.8" />
        <ellipse cx="13" cy="19" rx="4" ry="5.5" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="2.2" />
        <ellipse cx="20" cy="14" rx="4" ry="6" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="2.2" />
        <ellipse cx="28" cy="14" rx="4" ry="6" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="2.2" />
        <ellipse cx="35" cy="19" rx="4" ry="5.5" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="2.2" />
        <!-- Trái tim trong lòng bàn chân -->
        <path d="M 24,27 C 24,25.5 22.5,24 21,24 C 19.5,24 18.5,25.5 18.5,26.5 C 18.5,28.5 21,31 24,33 C 27,31 29.5,28.5 29.5,26.5 C 29.5,25.5 28.5,24 27,24 C 25.5,24 24,25.5 24,27 Z" fill="#FF8FB1" />
      `;
    } else {
      inner = `<circle cx="24" cy="24" r="16" fill="#FFD966" stroke="#7A4B2A" stroke-width="2.8" />`;
    }

    return `
      <svg class="farm-tool-svg tool-${toolId}" viewBox="0 0 48 48" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        ${inner}
      </svg>
    `;
  }

  function renderHUDIconSVG(type, size = 26) {
    let inner = '';
    if (type === 'coins') {
      // Đồng xu vàng bơ có mắt cười & má hồng
      inner = `
        <circle cx="16" cy="16" r="13" fill="#FFD966" stroke="#7A4B2A" stroke-width="2.6" />
        <circle cx="16" cy="16" r="10" fill="#FFE885" />
        <circle cx="12.5" cy="14" r="1.5" fill="#7A4B2A" /><circle cx="12" cy="13.4" r="0.6" fill="#FFFFFF" />
        <circle cx="19.5" cy="14" r="1.5" fill="#7A4B2A" /><circle cx="19" cy="13.4" r="0.6" fill="#FFFFFF" />
        <ellipse cx="10" cy="16" rx="1.8" ry="1.1" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="22" cy="16" rx="1.8" ry="1.1" fill="#FF8FB1" opacity="0.85" />
        <path d="M 14,16.5 Q 16,18.5 18,16.5" stroke="#7A4B2A" stroke-width="1.6" stroke-linecap="round" fill="none" />
        <polygon points="21,9 22,11 24,11.5 22,12 21,14 20,12 18,11.5 20,11" fill="#FFFFFF" />
      `;
    } else if (type === 'water') {
      // Giọt nước xanh bạc hà tròn trịa có mắt cười & má hồng
      inner = `
        <path d="M 16,4 C 16,4 7,14 7,19.5 C 7,24.5 11,28.5 16,28.5 C 21,28.5 25,24.5 25,19.5 C 25,14 16,4 16,4 Z" fill="#D8F3FF" stroke="#7A4B2A" stroke-width="2.6" />
        <path d="M 16,6 C 16,6 9,15 9,19.5 C 9,23.5 12,26.5 16,26.5 C 20,26.5 23,23.5 23,19.5 C 23,15 16,6 16,6 Z" fill="#38BDF8" />
        <ellipse cx="12" cy="17" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.75" />
        <circle cx="13" cy="19" r="1.5" fill="#0C4A6E" /><circle cx="12.6" cy="18.5" r="0.6" fill="#FFFFFF" />
        <circle cx="19" cy="19" r="1.5" fill="#0C4A6E" /><circle cx="18.6" cy="18.5" r="0.6" fill="#FFFFFF" />
        <ellipse cx="10.8" cy="21" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="21.2" cy="21" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.85" />
        <path d="M 14.5,21.5 Q 16,23 17.5,21.5" stroke="#0C4A6E" stroke-width="1.4" stroke-linecap="round" fill="none" />
      `;
    } else if (type === 'fertilizer') {
      // Bình phân bón phép thuật tròn cute có mắt cười
      inner = `
        <path d="M 13,8 L 19,8 L 19,12 L 24,20 C 26,23.5 24,28 19,28 L 13,28 C 8,28 6,23.5 8,20 L 13,12 Z" fill="#FFFDF8" stroke="#7A4B2A" stroke-width="2.6" />
        <path d="M 10,21 C 12,21 14,20 16,20 C 18,20 20,21 22,21 L 23,23 C 24,26 22,27 19,27 L 13,27 C 10,27 8,26 9,23 Z" fill="#8EDC7A" />
        <rect x="12" y="5" width="8" height="4" rx="2" fill="#F5C99B" stroke="#7A4B2A" stroke-width="1.8" />
        <circle cx="13" cy="17" r="1.4" fill="#7A4B2A" /><circle cx="12.7" cy="16.5" r="0.5" fill="#FFFFFF" />
        <circle cx="19" cy="17" r="1.4" fill="#7A4B2A" /><circle cx="18.7" cy="16.5" r="0.5" fill="#FFFFFF" />
        <ellipse cx="11" cy="19" rx="1.5" ry="0.9" fill="#FF8FB1" opacity="0.8" />
        <ellipse cx="21" cy="19" rx="1.5" ry="0.9" fill="#FF8FB1" opacity="0.8" />
        <path d="M 14.5,19 Q 16,20.5 17.5,19" stroke="#7A4B2A" stroke-width="1.3" stroke-linecap="round" fill="none" />
      `;
    } else if (type === 'materials') {
      // Khối gạch đất nung bánh quy có mắt cười
      inner = `
        <rect x="7" y="10" width="18" height="14" rx="4" fill="#F5C99B" stroke="#7A4B2A" stroke-width="2.6" />
        <rect x="9" y="12" width="14" height="4" rx="2" fill="#FDE7CF" />
        <circle cx="12" cy="18" r="1.4" fill="#7A4B2A" /><circle cx="11.7" cy="17.5" r="0.5" fill="#FFFFFF" />
        <circle cx="20" cy="18" r="1.4" fill="#7A4B2A" /><circle cx="19.7" cy="17.5" r="0.5" fill="#FFFFFF" />
        <ellipse cx="10" cy="20" rx="1.5" ry="0.9" fill="#FF8FB1" opacity="0.8" />
        <ellipse cx="22" cy="20" rx="1.5" ry="0.9" fill="#FF8FB1" opacity="0.8" />
        <path d="M 14.5,20.5 Q 16,22 17.5,20.5" stroke="#7A4B2A" stroke-width="1.3" stroke-linecap="round" fill="none" />
      `;
    } else if (type === 'level') {
      // Ngôi sao vàng bơ có mắt cười & má hồng
      inner = `
        <path d="M 16,4 L 19,11 L 26,12.5 L 21,17.5 L 22.5,25 L 16,21.5 L 9.5,25 L 11,17.5 L 6,12.5 L 13,11 Z" fill="#FFD966" stroke="#7A4B2A" stroke-width="2.6" stroke-linejoin="round" />
        <circle cx="13.5" cy="14" r="1.4" fill="#7A4B2A" /><circle cx="13.2" cy="13.5" r="0.5" fill="#FFFFFF" />
        <circle cx="18.5" cy="14" r="1.4" fill="#7A4B2A" /><circle cx="18.2" cy="13.5" r="0.5" fill="#FFFFFF" />
        <ellipse cx="11.5" cy="16" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="20.5" cy="16" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.85" />
        <path d="M 14.8,16.5 Q 16,18 17.2,16.5" stroke="#7A4B2A" stroke-width="1.4" stroke-linecap="round" fill="none" />
      `;
    }

    return `
      <svg class="farm-hud-svg hud-${type}" viewBox="0 0 32 32" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        ${inner}
      </svg>
    `;
  }


function renderPlantSVG(cropId, stage = 1, isThirsty = false, hasPest = false, width = 110, height = 120, wordHanzi = null) {
    const safeStage = Math.min(4, Math.max(1, stage || 1));
    const thirstyTransform = isThirsty ? 'transform="rotate(6, 55, 105)"' : '';
    const thirstyFilter = isThirsty ? 'filter="saturate(0.7) brightness(0.95)"' : '';

    let plantInner = '';

    // XỬ LÝ CÂY TỪ VỰNG (Cây Tri Thức hiện chữ Hán nhỏ trên lá/hoa/quả)
    if (cropId === 'word_tree' || wordHanzi) {
      const char = wordHanzi || '字';
      if (safeStage === 1) {
        // GIAI ĐOẠN 1: Mầm non tri thức với phiến lá ngọc mang chữ Hán nhỏ
        plantInner = `
          <g class="plant-stage-sprout word-tree-sprout" ${thirstyTransform} ${thirstyFilter}>
            <path d="M 55,108 Q 55,88 55,78" stroke="#15803D" stroke-width="4.5" stroke-linecap="round" fill="none" />
            <path d="M 55,108 Q 55,88 55,78" stroke="#86EFAC" stroke-width="2.6" stroke-linecap="round" fill="none" />
            <ellipse cx="44" cy="78" rx="10" ry="7" fill="#86EFAC" stroke="#15803D" stroke-width="1.8" transform="rotate(-20, 44, 78)" />
            <ellipse cx="66" cy="78" rx="10" ry="7" fill="#BBF7D0" stroke="#15803D" stroke-width="1.8" transform="rotate(20, 66, 78)" />
            <!-- Thẻ chữ Hán nhỏ nổi bật trên chồi mầm -->
            <rect x="43" y="65" width="24" height="22" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8" />
            <text x="55" y="81" font-size="13" font-weight="900" fill="#92400E" text-anchor="middle" font-family="'Noto Sans SC', 'PingFang SC', sans-serif">${char}</text>
          </g>
        `;
      } else if (safeStage === 2) {
        // GIAI ĐOẠN 2: Cây non đang lớn, vươn 4 lá ngọc bích xòe rộng
        plantInner = `
          <g class="plant-stage-seedling word-tree-seedling" ${thirstyTransform} ${thirstyFilter}>
            <path d="M 55,108 Q 53,82 55,60" stroke="#15803D" stroke-width="5" stroke-linecap="round" fill="none" />
            <path d="M 55,108 Q 53,82 55,60" stroke="#4ADE80" stroke-width="3" stroke-linecap="round" fill="none" />
            <ellipse cx="36" cy="80" rx="13" ry="8" fill="#86EFAC" stroke="#15803D" stroke-width="2" transform="rotate(-25, 36, 80)" />
            <ellipse cx="74" cy="78" rx="13" ry="8" fill="#A7F3D0" stroke="#15803D" stroke-width="2" transform="rotate(25, 74, 78)" />
            <ellipse cx="40" cy="62" rx="11" ry="7" fill="#4ADE80" stroke="#15803D" stroke-width="1.8" transform="rotate(-15, 40, 62)" />
            <ellipse cx="70" cy="60" rx="11" ry="7" fill="#86EFAC" stroke="#15803D" stroke-width="1.8" transform="rotate(15, 70, 60)" />
            <!-- Huy hiệu chữ Hán trung tâm thân cây -->
            <circle cx="55" cy="52" r="14" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.2" />
            <text x="55" y="57" font-size="14" font-weight="900" fill="#0369A1" text-anchor="middle" font-family="'Noto Sans SC', 'PingFang SC', sans-serif">${char}</text>
          </g>
        `;
      } else if (safeStage === 3) {
        // GIAI ĐOẠN 3: Đơm hoa ngàn mây rực rỡ, cánh hoa pastel ôm trọn chữ Hán
        plantInner = `
          <g class="plant-stage-flower word-tree-flower" ${thirstyTransform} ${thirstyFilter}>
            <path d="M 55,108 Q 51,75 55,48" stroke="#15803D" stroke-width="5.5" stroke-linecap="round" fill="none" />
            <ellipse cx="32" cy="74" rx="14" ry="8.5" fill="#86EFAC" stroke="#15803D" stroke-width="2" transform="rotate(-28, 32, 74)" />
            <ellipse cx="78" cy="72" rx="14" ry="8.5" fill="#A7F3D0" stroke="#15803D" stroke-width="2" transform="rotate(28, 78, 72)" />
            <!-- Cánh hoa tri thức 6 cánh pastel -->
            <circle cx="55" cy="30" r="11" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5" />
            <circle cx="42" cy="38" r="11" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5" />
            <circle cx="68" cy="38" r="11" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5" />
            <circle cx="44" cy="54" r="11" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5" />
            <circle cx="66" cy="54" r="11" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.5" />
            <!-- Nhụy hoa chữ Hán vàng kim -->
            <circle cx="55" cy="46" r="15" fill="#FEF3C7" stroke="#D97706" stroke-width="2.2" />
            <text x="55" y="52" font-size="16" font-weight="900" fill="#92400E" text-anchor="middle" font-family="'Noto Sans SC', 'PingFang SC', sans-serif">${char}</text>
          </g>
        `;
      } else {
        // GIAI ĐOẠN 4: Chín rộ thành "Quả Tri Thức" vàng kim bồng lai phát sáng
        plantInner = `
          <g class="plant-stage-ripe word-tree-ripe" ${thirstyTransform} ${thirstyFilter}>
            <!-- Tán cây đại thụ tri thức rợp bóng -->
            <ellipse cx="55" cy="45" rx="36" ry="32" fill="#D1FAE5" stroke="#059669" stroke-width="2.5" />
            <ellipse cx="40" cy="38" rx="20" ry="18" fill="#A7F3D0" stroke="#059669" stroke-width="2" />
            <ellipse cx="70" cy="38" rx="20" ry="18" fill="#6EE7B7" stroke="#059669" stroke-width="2" />
            <path d="M 55,108 Q 53,75 55,50" stroke="#78350F" stroke-width="6.5" stroke-linecap="round" fill="none" />
            <!-- Quả Tri Thức to tròn rực rỡ mang chữ Hán màu vàng kim -->
            <circle cx="55" cy="45" r="19" fill="#FEF08A" stroke="#B45309" stroke-width="2.6" />
            <circle cx="55" cy="45" r="15" fill="#FDE047" stroke="#D97706" stroke-width="1.2" />
            <text x="55" y="52" font-size="18" font-weight="900" fill="#78350F" text-anchor="middle" font-family="'Noto Sans SC', 'PingFang SC', sans-serif">${char}</text>
            <!-- Ánh lấp lánh pastel quanh quả -->
            <path d="M 32 20 L 34 25 L 39 26 L 34 27 L 32 32 L 30 27 L 25 26 L 30 25 Z" fill="#FDE047" stroke="#D97706" stroke-width="0.8" />
            <polygon points="74,18 76,23 81,23 77,26 78,31 74,28 70,31 71,26 67,23 72,23" fill="#FDE047" stroke="#D97706" stroke-width="0.8" />
          </g>
        `;
      }
    } else {
      const crop = CROP_DEFS[cropId] || CROP_DEFS.chrysanthemum;
      const palette = getCropPalette(cropId);

      if (safeStage === 1) {
        // GIAI ĐOẠN 1: Mầm non vừa nhú (lá giọt tròn kẹo ngọt)
        plantInner = `
          <g class="plant-stage-sprout" ${thirstyTransform} ${thirstyFilter}>
            <path d="M 55,108 Q 55,90 55,82" stroke="#2F6A44" stroke-width="4.5" stroke-linecap="round" fill="none" />
            <path d="M 55,108 Q 55,90 55,82" stroke="#8EDC7A" stroke-width="2.6" stroke-linecap="round" fill="none" />
            <!-- 2 lá mầm hình giọt tròn kẹo ngọt -->
            <ellipse cx="46" cy="80" rx="9" ry="6" fill="#8EDC7A" stroke="#2F6A44" stroke-width="2" stroke-linejoin="round" transform="rotate(-25, 46, 80)" />
            <ellipse cx="64" cy="80" rx="9" ry="6" fill="#A7F3D0" stroke="#2F6A44" stroke-width="2" stroke-linejoin="round" transform="rotate(25, 64, 80)" />
            <circle cx="55" cy="81" r="2.5" fill="#FFD966" stroke="#7A4B2A" stroke-width="1.2" />
          </g>
        `;
      } else if (safeStage === 2) {
        // GIAI ĐOẠN 2: Cây non đang lớn (thân cong mập mạp, lá giọt nước xanh táo)
        plantInner = `
          <g class="plant-stage-seedling" ${thirstyTransform} ${thirstyFilter}>
            <path d="M 55,108 Q 52,85 55,66" stroke="#2F6A44" stroke-width="5" stroke-linecap="round" fill="none" />
            <path d="M 55,108 Q 52,85 55,66" stroke="#5DBB63" stroke-width="3" stroke-linecap="round" fill="none" />
            <!-- Lá giọt nước tròn trịa bo viền sticker -->
            <ellipse cx="38" cy="85" rx="12" ry="7.5" fill="#8EDC7A" stroke="#2F6A44" stroke-width="2" transform="rotate(-22, 38, 85)" />
            <ellipse cx="72" cy="82" rx="12" ry="7.5" fill="#A7F3D0" stroke="#2F6A44" stroke-width="2" transform="rotate(22, 72, 82)" />
            <ellipse cx="42" cy="69" rx="10" ry="6.5" fill="#8EDC7A" stroke="#2F6A44" stroke-width="1.8" transform="rotate(-18, 42, 69)" />
            <ellipse cx="68" cy="67" rx="10" ry="6.5" fill="#C7F5C4" stroke="#2F6A44" stroke-width="1.8" transform="rotate(18, 68, 67)" />
            <circle cx="55" cy="64" r="3.5" fill="#FFD966" stroke="#7A4B2A" stroke-width="1.4" />
          </g>
        `;
      } else if (safeStage === 3) {
        // GIAI ĐOẠN 3: Ra nụ / Chớm nở
        plantInner = renderStage3Plant(cropId, palette, thirstyTransform, thirstyFilter);
      } else {
        // GIAI ĐOẠN 4: Chín rực rỡ (quả có mặt cười tí hon + lấp lánh pastel)
        plantInner = renderStage4Plant(cropId, palette, thirstyTransform, thirstyFilter);
      }
    }

    // Sâu bướm dễ thương màu xanh chanh má hồng
    const pestElem = hasPest ? `
      <g class="farm-pest-bob" transform="translate(68, 55)">
        <ellipse cx="0" cy="0" rx="9.5" ry="6.5" fill="#BEF264" stroke="#4D7C0F" stroke-width="2" />
        <ellipse cx="7" cy="-2" rx="6.5" ry="5.5" fill="#D9F99D" stroke="#4D7C0F" stroke-width="2" />
        <circle cx="9.5" cy="-3.5" r="2.2" fill="#FFFFFF" />
        <circle cx="10.5" cy="-3.5" r="1.2" fill="#000000" />
        <circle cx="6" cy="-3.5" r="1.8" fill="#FFFFFF" />
        <circle cx="7" cy="-3.5" r="1" fill="#000000" />
        <!-- Má hồng trên chú sâu -->
        <ellipse cx="8" cy="1" rx="1.8" ry="1.2" fill="#FF8FB1" opacity="0.9" />
        <path d="M 10,-6 Q 13,-12 15,-11" stroke="#4D7C0F" stroke-width="1.6" fill="none" stroke-linecap="round" />
        <circle cx="15" cy="-11" r="1.3" fill="#FF5376" />
      </g>
    ` : '';

    return `
      <svg class="farm-plant-svg crop-${cropId} stage-${safeStage} ${safeStage === 4 ? 'is-ripe' : ''}"
           viewBox="0 0 110 120" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${plantInner}
        ${pestElem}
      </svg>
    `;
  }

  function getCropPalette(cropId) {
    const map = {
      chrysanthemum:  { main: '#FFD966', dark: '#B45309', leaf: '#8EDC7A', stem: '#2F6A44', accent: '#FFF5B8' },
      lotus:          { main: '#FF8FB1', dark: '#BE185D', leaf: '#5EEAD4', stem: '#0F766E', accent: '#FFF0F5' },
      peony:          { main: '#FB7185', dark: '#9F1239', leaf: '#6EE7B7', stem: '#047857', accent: '#FECDD3' },
      peach_blossom:  { main: '#FFA4BA', dark: '#BE185D', leaf: '#8EDC7A', stem: '#7A4B2A', accent: '#FFF1F4' },
      plum_blossom:   { main: '#E879F9', dark: '#86198F', leaf: '#A7F3D0', stem: '#581C87', accent: '#FDF4FF' },
      strawberry:     { main: '#FF5376', dark: '#9F1239', leaf: '#5DBB63', stem: '#2F6A44', accent: '#FFE4E6' },
      tomato:         { main: '#FF6B4A', dark: '#9A3412', leaf: '#8EDC7A', stem: '#2F6A44', accent: '#FFEDD5' },
      pumpkin:        { main: '#FFA534', dark: '#B45309', leaf: '#5DBB63', stem: '#7A4B2A', accent: '#FEF3C7' },
      watermelon:     { main: '#34D399', dark: '#064E3B', leaf: '#5DBB63', stem: '#047857', accent: '#FF5376' },
      tea:            { main: '#5DBB63', dark: '#166534', leaf: '#8EDC7A', stem: '#7A4B2A', accent: '#DCFCE7' },
      bamboo:         { main: '#5DBB63', dark: '#14532D', leaf: '#8EDC7A', stem: '#166534', accent: '#BBF7D0' },
      grape:          { main: '#C9B6FF', dark: '#5B21B6', leaf: '#8EDC7A', stem: '#7A4B2A', accent: '#EDE9FE' },
      apple:          { main: '#FF5376', dark: '#991B1B', leaf: '#5DBB63', stem: '#7A4B2A', accent: '#FEE2E2' },
      orange:         { main: '#FFA534', dark: '#C2410C', leaf: '#8EDC7A', stem: '#7A4B2A', accent: '#FED7AA' },
      ginseng:        { main: '#FFD966', dark: '#B45309', leaf: '#5DBB63', stem: '#7A4B2A', accent: '#FF5376' },
      celestial_peach:{ main: '#FF8FB1', dark: '#BE185D', leaf: '#34D399', stem: '#7A4B2A', accent: '#FFD966' }
    };
    return map[cropId] || map.chrysanthemum;
  }

  function renderStage3Plant(cropId, pal, tTransform, tFilter) {
    return `
      <g class="plant-stage-budding" ${tTransform} ${tFilter}>
        <path d="M 55,108 C 53,80 54,62 55,48" stroke="${pal.stem}" stroke-width="5.5" stroke-linecap="round" fill="none" />
        <path d="M 54,82 Q 35,74 26,62" stroke="${pal.stem}" stroke-width="3.5" stroke-linecap="round" fill="none" />
        <path d="M 56,76 Q 74,68 84,58" stroke="${pal.stem}" stroke-width="3.5" stroke-linecap="round" fill="none" />
        <!-- Lá giọt nước mập mạp -->
        <ellipse cx="28" cy="62" rx="12" ry="8" fill="${pal.leaf}" stroke="#2F6A44" stroke-width="2" stroke-linejoin="round" transform="rotate(-20, 28, 62)" />
        <ellipse cx="82" cy="58" rx="12" ry="8" fill="${pal.leaf}" stroke="#2F6A44" stroke-width="2" stroke-linejoin="round" transform="rotate(20, 82, 58)" />
        <ellipse cx="55" cy="54" rx="14" ry="9" fill="${pal.leaf}" stroke="#2F6A44" stroke-width="2" stroke-linejoin="round" />
        <!-- Nụ hoa / quả non tròn xoe -->
        <circle cx="26" cy="50" r="8" fill="${pal.main}" stroke="#7A4B2A" stroke-width="2" />
        <circle cx="84" cy="46" r="8" fill="${pal.main}" stroke="#7A4B2A" stroke-width="2" />
        <circle cx="55" cy="36" r="10.5" fill="${pal.main}" stroke="#7A4B2A" stroke-width="2.2" />
        <circle cx="53" cy="33" r="2.8" fill="${pal.accent}" />
      </g>
    `;
  }

  function renderStage4Plant(cropId, pal, tTransform, tFilter) {
    let customFruits = '';

    if (cropId === 'chrysanthemum' || cropId === 'lotus' || cropId === 'peony' || cropId === 'peach_blossom' || cropId === 'plum_blossom') {
      // Các loài hoa: nhụy hoa có mặt cười tí hon dễ thương
      customFruits = `
        <g transform="translate(55, 30)">
          ${[0, 45, 90, 135, 180, 225, 270, 315].map(deg => `
            <ellipse cx="0" cy="-14" rx="6.5" ry="12" fill="${pal.main}" stroke="#7A4B2A" stroke-width="1.8" stroke-linejoin="round" transform="rotate(${deg})" />
          `).join('')}
          <circle cx="0" cy="0" r="10" fill="#FFD966" stroke="#7A4B2A" stroke-width="2.2" />
          <!-- Mặt cười nhụy hoa -->
          <circle cx="-3" cy="-1" r="1.3" fill="#7A4B2A" />
          <circle cx="3" cy="-1" r="1.3" fill="#7A4B2A" />
          <ellipse cx="-5.5" cy="1.5" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.9" />
          <ellipse cx="5.5" cy="1.5" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.9" />
          <path d="M -1.8,1.8 Q 0,3.5 1.8,1.8" stroke="#7A4B2A" stroke-width="1.4" stroke-linecap="round" fill="none" />
        </g>
        <g transform="translate(24, 46) scale(0.72)">
          ${[0, 60, 120, 180, 240, 300].map(deg => `
            <ellipse cx="0" cy="-12" rx="5.5" ry="10" fill="${pal.main}" stroke="#7A4B2A" stroke-width="1.8" stroke-linejoin="round" transform="rotate(${deg})" />
          `).join('')}
          <circle cx="0" cy="0" r="8" fill="#FFD966" stroke="#7A4B2A" stroke-width="2" />
          <circle cx="-2" cy="-1" r="1" fill="#7A4B2A" /><circle cx="2" cy="-1" r="1" fill="#7A4B2A" />
          <path d="M -1.2,1.2 Q 0,2.5 1.2,1.2" stroke="#7A4B2A" stroke-width="1.2" stroke-linecap="round" fill="none" />
        </g>
        <g transform="translate(86, 42) scale(0.72)">
          ${[0, 60, 120, 180, 240, 300].map(deg => `
            <ellipse cx="0" cy="-12" rx="5.5" ry="10" fill="${pal.main}" stroke="#7A4B2A" stroke-width="1.8" stroke-linejoin="round" transform="rotate(${deg})" />
          `).join('')}
          <circle cx="0" cy="0" r="8" fill="#FFD966" stroke="#7A4B2A" stroke-width="2" />
          <circle cx="-2" cy="-1" r="1" fill="#7A4B2A" /><circle cx="2" cy="-1" r="1" fill="#7A4B2A" />
          <path d="M -1.2,1.2 Q 0,2.5 1.2,1.2" stroke="#7A4B2A" stroke-width="1.2" stroke-linecap="round" fill="none" />
        </g>
      `;
    } else if (cropId === 'watermelon' || cropId === 'pumpkin') {
      const isPumpkin = cropId === 'pumpkin';
      customFruits = `
        <g transform="translate(55, 60)">
          <ellipse cx="0" cy="0" rx="33" ry="25" fill="${pal.main}" stroke="#7A4B2A" stroke-width="2.8" stroke-linejoin="round" />
          ${isPumpkin ? `
            <path d="M -22,-16 Q -28,0 -22,16" stroke="#B45309" stroke-width="2.4" fill="none" />
            <path d="M -10,-22 Q -14,0 -10,22" stroke="#B45309" stroke-width="2.4" fill="none" />
            <path d="M 0,-24 L 0,24" stroke="#B45309" stroke-width="2.4" fill="none" />
            <path d="M 10,-22 Q 14,0 10,22" stroke="#B45309" stroke-width="2.4" fill="none" />
            <path d="M 22,-16 Q 28,0 22,16" stroke="#B45309" stroke-width="2.4" fill="none" />
            <path d="M -3,-24 Q 0,-34 8,-32" stroke="#7A4B2A" stroke-width="4.5" stroke-linecap="round" fill="none" />
          ` : `
            <path d="M -20,-18 Q -26,0 -20,18" stroke="#064E3B" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M -8,-23 Q -11,0 -8,23" stroke="#064E3B" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M 6,-23 Q 9,0 6,23" stroke="#064E3B" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M 20,-18 Q 25,0 20,18" stroke="#064E3B" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M 0,-24 Q 4,-30 10,-28" stroke="#047857" stroke-width="2.8" fill="none" stroke-linecap="round" />
          `}
          <!-- Mặt cười tí hon trên quả bí ngô / dưa hấu -->
          <circle cx="-8" cy="-2" r="2.2" fill="#241108" /><circle cx="-8.7" cy="-2.7" r="0.8" fill="#FFFFFF" />
          <circle cx="8" cy="-2" r="2.2" fill="#241108" /><circle cx="7.3" cy="-2.7" r="0.8" fill="#FFFFFF" />
          <ellipse cx="-13" cy="2" rx="2.6" ry="1.6" fill="#FF8FB1" opacity="0.85" />
          <ellipse cx="13" cy="2" rx="2.6" ry="1.6" fill="#FF8FB1" opacity="0.85" />
          <path d="M -4,2 Q 0,5.5 4,2" stroke="#241108" stroke-width="1.8" stroke-linecap="round" fill="none" />
          <ellipse cx="-12" cy="-10" rx="6" ry="3.5" fill="#FFFFFF" opacity="0.45" />
        </g>
      `;
    } else if (cropId === 'bamboo') {
      customFruits = `
        <g transform="translate(55, 50)">
          <g stroke="#7A4B2A" stroke-width="2.4" stroke-linejoin="round">
            <rect x="-14" y="-30" width="8" height="65" rx="4" fill="#8EDC7A" />
            <rect x="-2" y="-45" width="9" height="80" rx="4.5" fill="#5DBB63" />
            <rect x="11" y="-20" width="7" height="55" rx="3.5" fill="#A7F3D0" />
            <line x1="-16" y1="-10" x2="-4" y2="-10" stroke="#166534" stroke-width="2.5" />
            <line x1="-16" y1="10" x2="-4" y2="10" stroke="#166534" stroke-width="2.5" />
            <line x1="-4" y1="-25" x2="9" y2="-25" stroke="#166534" stroke-width="2.5" />
            <line x1="-4" y1="-2" x2="9" y2="-2" stroke="#166534" stroke-width="2.5" />
            <line x1="-4" y1="20" x2="9" y2="20" stroke="#166534" stroke-width="2.5" />
          </g>
          <!-- Mặt cười trên thân trúc chính -->
          <circle cx="1" cy="-12" r="1.2" fill="#14532D" /><circle cx="5" cy="-12" r="1.2" fill="#14532D" />
          <path d="M 2,-10 Q 3,-9 4,-10" stroke="#14532D" stroke-width="1" stroke-linecap="round" fill="none" />
          <ellipse cx="-14,-10" rx="14" ry="7" fill="#BBF7D0" stroke="#7A4B2A" stroke-width="1.8" transform="rotate(-15, -14, -10)" />
          <ellipse cx="14,-25" rx="14" ry="7" fill="#BBF7D0" stroke="#7A4B2A" stroke-width="1.8" transform="rotate(15, 14, -25)" />
        </g>
      `;
    } else if (cropId === 'ginseng' || cropId === 'celestial_peach') {
      customFruits = `
        <g transform="translate(55, 42)">
          ${cropId === 'celestial_peach' ? `
            <path d="M 0,-24 C -28,-18 -30,16 0,30 C 30,16 28,-18 0,-24 Z" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="2.8" stroke-linejoin="round" />
            <ellipse cx="-8" cy="-6" rx="7" ry="4" fill="#FFFFFF" opacity="0.6" />
            <!-- Mặt cười quả đào tiên -->
            <circle cx="-5" cy="0" r="1.8" fill="#701A25" /><circle cx="-5.5" cy="-0.6" r="0.7" fill="#FFFFFF" />
            <circle cx="5" cy="0" r="1.8" fill="#701A25" /><circle cx="4.5" cy="-0.6" r="0.7" fill="#FFFFFF" />
            <ellipse cx="-8.5" cy="3" rx="2" ry="1.2" fill="#FF5376" opacity="0.9" />
            <ellipse cx="8.5" cy="3" rx="2" ry="1.2" fill="#FF5376" opacity="0.9" />
            <path d="M -2.5,3.5 Q 0,6 2.5,3.5" stroke="#701A25" stroke-width="1.4" stroke-linecap="round" fill="none" />
          ` : `
            <path d="M 0,-15 C -12,-5 -14,14 -4,28 L -6,40 M 4,28 L 6,40 M -12,5 L -22,18 M 12,5 L 22,18"
                  stroke="${pal.main}" stroke-width="5" stroke-linecap="round" fill="none" />
            <circle cx="0" cy="-18" r="9" fill="${pal.main}" stroke="#7A4B2A" stroke-width="2" />
            <circle cx="-3" cy="-19" r="1.2" fill="#7A4B2A" /><circle cx="3" cy="-19" r="1.2" fill="#7A4B2A" />
            <path d="M -1.5,-16 Q 0,-14.5 1.5,-16" stroke="#7A4B2A" stroke-width="1.2" stroke-linecap="round" fill="none" />
            <circle cx="-6" cy="-30" r="3.5" fill="#FF5376" stroke="#7A4B2A" stroke-width="1.2" />
            <circle cx="0" cy="-34" r="4" fill="#FF5376" stroke="#7A4B2A" stroke-width="1.2" />
            <circle cx="6" cy="-30" r="3.5" fill="#FF5376" stroke="#7A4B2A" stroke-width="1.2" />
          `}
        </g>
      `;
    } else {
      // Dâu tây, cà chua, nho, táo, cam, trà... các quả mọng đều có mặt cười!
      customFruits = `
        <g transform="translate(25, 42)">
          <circle cx="0" cy="0" r="11" fill="${pal.main}" stroke="#7A4B2A" stroke-width="2.4" />
          <circle cx="-3" cy="-3" r="3" fill="#FFFFFF" opacity="0.6" />
        </g>
        <g transform="translate(55, 34)">
          <circle cx="0" cy="0" r="14" fill="${pal.main}" stroke="#7A4B2A" stroke-width="2.6" />
          <circle cx="-4" cy="-4" r="4" fill="#FFFFFF" opacity="0.6" />
          <!-- Mặt cười quả chính -->
          <circle cx="-3.5" cy="-1" r="1.5" fill="#3D1A04" /><circle cx="-4" cy="-1.5" r="0.6" fill="#FFFFFF" />
          <circle cx="3.5" cy="-1" r="1.5" fill="#3D1A04" /><circle cx="3" cy="-1.5" r="0.6" fill="#FFFFFF" />
          <ellipse cx="-6" cy="1.5" rx="1.8" ry="1.1" fill="#FF8FB1" opacity="0.85" />
          <ellipse cx="6" cy="1.5" rx="1.8" ry="1.1" fill="#FF8FB1" opacity="0.85" />
          <path d="M -2,1.5 Q 0,3.5 2,1.5" stroke="#3D1A04" stroke-width="1.3" stroke-linecap="round" fill="none" />
        </g>
        <g transform="translate(85, 42)">
          <circle cx="0" cy="0" r="11" fill="${pal.main}" stroke="#7A4B2A" stroke-width="2.4" />
          <circle cx="-3" cy="-3" r="3" fill="#FFFFFF" opacity="0.6" />
        </g>
        <g transform="translate(42, 60)">
          <circle cx="0" cy="0" r="9.5" fill="${pal.main}" stroke="#7A4B2A" stroke-width="2" />
        </g>
        <g transform="translate(68, 60)">
          <circle cx="0" cy="0" r="9.5" fill="${pal.main}" stroke="#7A4B2A" stroke-width="2" />
        </g>
      `;
    }

    return `
      <g class="plant-stage-ripe" ${tTransform} ${tFilter}>
        <path d="M 55,108 C 52,78 54,55 55,38" stroke="${pal.stem}" stroke-width="6.5" stroke-linecap="round" fill="none" />
        <path d="M 54,80 Q 30,72 20,54" stroke="${pal.stem}" stroke-width="4.5" stroke-linecap="round" fill="none" />
        <path d="M 56,74 Q 80,66 90,50" stroke="${pal.stem}" stroke-width="4.5" stroke-linecap="round" fill="none" />
        <ellipse cx="30" cy="50" rx="14" ry="9" fill="${pal.leaf}" stroke="#2F6A44" stroke-width="2" stroke-linejoin="round" />
        <ellipse cx="80" cy="48" rx="14" ry="9" fill="${pal.leaf}" stroke="#2F6A44" stroke-width="2" stroke-linejoin="round" />
        <ellipse cx="55" cy="42" rx="18" ry="11" fill="${pal.leaf}" stroke="#2F6A44" stroke-width="2" stroke-linejoin="round" />
        ${customFruits}
        <!-- Tia sáng và ngôi sao pastel lấp lánh quanh quả chín -->
        <g class="ripe-sparkles">
          <polygon points="18,22 20,27 25,28 20,30 18,35 17,30 12,28 17,27" fill="#FFD966" stroke="#7A4B2A" stroke-width="1.2" />
          <polygon points="92,20 93,24 97,25 93,26 92,30 91,26 87,25 91,24" fill="#FFD966" stroke="#7A4B2A" stroke-width="1.2" />
          <polygon points="55,8 56,12 60,13 56,14 55,18 54,14 50,13 54,12" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="1.2" />
        </g>
      </g>
    `;
  }

  /* ==========================================================================
     6. Vẽ Đồ Họa Cảnh Nền: Ban Công, Khinh Khí Cầu, 8 Linh Thú
     ========================================================================== */

  /**
   * Sinh SVG cho 1 tầng ban công theo phong cách (bo viền sticker, gỗ bánh quy, cờ đuôi nheo, đèn có mặt)
   */
  function renderTierDeckSVG(themeId = 'chinese', tierNumber = 1) {
    const t = THEMES[themeId] || THEMES.chinese;

    let decorElements = '';
    if (themeId === 'chinese') {
      decorElements = `
        <!-- Đèn lồng đỏ tròn kẹo ngọt có mặt cười & má hồng -->
        <g transform="translate(45, 10)">
          <line x1="0" y1="0" x2="0" y2="14" stroke="#7A4B2A" stroke-width="2.6" />
          <ellipse cx="0" cy="28" rx="16" ry="16" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="2.8" />
          <ellipse cx="0" cy="28" rx="11" ry="16" fill="#FF5376" />
          <!-- Mặt cười trên đèn lồng -->
          <circle cx="-5" cy="26" r="1.5" fill="#7A4B2A" /><circle cx="-5.4" cy="25.4" r="0.5" fill="#FFFFFF" />
          <circle cx="5" cy="26" r="1.5" fill="#7A4B2A" /><circle cx="4.6" cy="25.4" r="0.5" fill="#FFFFFF" />
          <ellipse cx="-9" cy="29" rx="1.8" ry="1" fill="#FFD966" opacity="0.9" />
          <ellipse cx="9" cy="29" rx="1.8" ry="1" fill="#FFD966" opacity="0.9" />
          <path d="M -2.5,29 Q 0,31.5 2.5,29" stroke="#7A4B2A" stroke-width="1.4" stroke-linecap="round" fill="none" />
          <ellipse cx="0" cy="14" rx="8" ry="3" fill="#FFD966" stroke="#7A4B2A" stroke-width="2" />
          <ellipse cx="0" cy="42" rx="8" ry="3" fill="#FFD966" stroke="#7A4B2A" stroke-width="2" />
          <line x1="0" y1="44" x2="0" y2="58" stroke="#FFD966" stroke-width="3" stroke-linecap="round" />
        </g>
        <g transform="translate(835, 10)">
          <line x1="0" y1="0" x2="0" y2="14" stroke="#7A4B2A" stroke-width="2.6" />
          <ellipse cx="0" cy="28" rx="16" ry="16" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="2.8" />
          <ellipse cx="0" cy="28" rx="11" ry="16" fill="#FF5376" />
          <circle cx="-5" cy="26" r="1.5" fill="#7A4B2A" /><circle cx="-5.4" cy="25.4" r="0.5" fill="#FFFFFF" />
          <circle cx="5" cy="26" r="1.5" fill="#7A4B2A" /><circle cx="4.6" cy="25.4" r="0.5" fill="#FFFFFF" />
          <ellipse cx="-9" cy="29" rx="1.8" ry="1" fill="#FFD966" opacity="0.9" />
          <ellipse cx="9" cy="29" rx="1.8" ry="1" fill="#FFD966" opacity="0.9" />
          <path d="M -2.5,29 Q 0,31.5 2.5,29" stroke="#7A4B2A" stroke-width="1.4" stroke-linecap="round" fill="none" />
          <ellipse cx="0" cy="14" rx="8" ry="3" fill="#FFD966" stroke="#7A4B2A" stroke-width="2" />
          <ellipse cx="0" cy="42" rx="8" ry="3" fill="#FFD966" stroke="#7A4B2A" stroke-width="2" />
          <line x1="0" y1="44" x2="0" y2="58" stroke="#FFD966" stroke-width="3" stroke-linecap="round" />
        </g>
      `;
    } else if (themeId === 'japanese') {
      decorElements = `
        <!-- Đèn lồng giấy Zen Nhật tròn trịa có nụ cười ấm áp -->
        <g transform="translate(42, 14)">
          <rect x="-12" y="14" width="24" height="24" rx="6" fill="#FFFDF8" stroke="#7A4B2A" stroke-width="2.6" />
          <polygon points="-16,14 16,14 0,0" fill="#F5C99B" stroke="#7A4B2A" stroke-width="2.6" stroke-linejoin="round" />
          <circle cx="-4" cy="25" r="1.4" fill="#7A4B2A" />
          <circle cx="4" cy="25" r="1.4" fill="#7A4B2A" />
          <ellipse cx="-7.5" cy="27" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.8" />
          <ellipse cx="7.5" cy="27" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.8" />
          <path d="M -2,27.5 Q 0,29.5 2,27.5" stroke="#7A4B2A" stroke-width="1.3" stroke-linecap="round" fill="none" />
        </g>
        <g transform="translate(838, 14)">
          <rect x="-12" y="14" width="24" height="24" rx="6" fill="#FFFDF8" stroke="#7A4B2A" stroke-width="2.6" />
          <polygon points="-16,14 16,14 0,0" fill="#F5C99B" stroke="#7A4B2A" stroke-width="2.6" stroke-linejoin="round" />
          <circle cx="-4" cy="25" r="1.4" fill="#7A4B2A" />
          <circle cx="4" cy="25" r="1.4" fill="#7A4B2A" />
          <ellipse cx="-7.5" cy="27" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.8" />
          <ellipse cx="7.5" cy="27" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.8" />
          <path d="M -2,27.5 Q 0,29.5 2,27.5" stroke="#7A4B2A" stroke-width="1.3" stroke-linecap="round" fill="none" />
        </g>
      `;
    } else if (themeId === 'english') {
      decorElements = `
        <!-- Đèn đường quý tộc tròn trịa với ngọn nến cười -->
        <g transform="translate(45, 6)">
          <line x1="0" y1="50" x2="0" y2="14" stroke="#7A4B2A" stroke-width="3.5" stroke-linecap="round" />
          <rect x="-11" y="12" width="22" height="24" rx="5" fill="#FFF8EC" stroke="#7A4B2A" stroke-width="2.6" />
          <polygon points="-12,12 12,12 0,2" fill="#C9B6FF" stroke="#7A4B2A" stroke-width="2.4" stroke-linejoin="round" />
          <circle cx="-3.5" cy="23" r="1.3" fill="#7A4B2A" />
          <circle cx="3.5" cy="23" r="1.3" fill="#7A4B2A" />
          <ellipse cx="-6.5" cy="25" rx="1.5" ry="0.9" fill="#FF8FB1" opacity="0.8" />
          <ellipse cx="6.5" cy="25" rx="1.5" ry="0.9" fill="#FF8FB1" opacity="0.8" />
          <path d="M -1.8,25.5 Q 0,27 1.8,25.5" stroke="#7A4B2A" stroke-width="1.2" stroke-linecap="round" fill="none" />
        </g>
        <g transform="translate(835, 6)">
          <line x1="0" y1="50" x2="0" y2="14" stroke="#7A4B2A" stroke-width="3.5" stroke-linecap="round" />
          <rect x="-11" y="12" width="22" height="24" rx="5" fill="#FFF8EC" stroke="#7A4B2A" stroke-width="2.6" />
          <polygon points="-12,12 12,12 0,2" fill="#C9B6FF" stroke="#7A4B2A" stroke-width="2.4" stroke-linejoin="round" />
          <circle cx="-3.5" cy="23" r="1.3" fill="#7A4B2A" />
          <circle cx="3.5" cy="23" r="1.3" fill="#7A4B2A" />
          <ellipse cx="-6.5" cy="25" rx="1.5" ry="0.9" fill="#FF8FB1" opacity="0.8" />
          <ellipse cx="6.5" cy="25" rx="1.5" ry="0.9" fill="#FF8FB1" opacity="0.8" />
          <path d="M -1.8,25.5 Q 0,27 1.8,25.5" stroke="#7A4B2A" stroke-width="1.2" stroke-linecap="round" fill="none" />
        </g>
      `;
    } else {
      decorElements = `
        <!-- Đèn tháp củ hành Slavic tròn xoe có nụ cười -->
        <g transform="translate(45, 6)">
          <path d="M 0,-8 C -11,4 -13,20 0,25 C 13,20 11,4 0,-8 Z" fill="#FFD966" stroke="#7A4B2A" stroke-width="2.6" stroke-linejoin="round" />
          <line x1="0" y1="-8" x2="0" y2="-16" stroke="#7A4B2A" stroke-width="3" stroke-linecap="round" />
          <circle cx="0" cy="-17" r="2.5" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="1.5" />
          <circle cx="-4" cy="11" r="1.4" fill="#7A4B2A" />
          <circle cx="4" cy="11" r="1.4" fill="#7A4B2A" />
          <ellipse cx="-7" cy="13" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.8" />
          <ellipse cx="7" cy="13" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.8" />
          <path d="M -2,13.5 Q 0,15.5 2,13.5" stroke="#7A4B2A" stroke-width="1.3" stroke-linecap="round" fill="none" />
        </g>
        <g transform="translate(835, 6)">
          <path d="M 0,-8 C -11,4 -13,20 0,25 C 13,20 11,4 0,-8 Z" fill="#FFD966" stroke="#7A4B2A" stroke-width="2.6" stroke-linejoin="round" />
          <line x1="0" y1="-8" x2="0" y2="-16" stroke="#7A4B2A" stroke-width="3" stroke-linecap="round" />
          <circle cx="0" cy="-17" r="2.5" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="1.5" />
          <circle cx="-4" cy="11" r="1.4" fill="#7A4B2A" />
          <circle cx="4" cy="11" r="1.4" fill="#7A4B2A" />
          <ellipse cx="-7" cy="13" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.8" />
          <ellipse cx="7" cy="13" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.8" />
          <path d="M -2,13.5 Q 0,15.5 2,13.5" stroke="#7A4B2A" stroke-width="1.3" stroke-linecap="round" fill="none" />
        </g>
      `;
    }

    // Dây cờ đuôi nheo pastel (Bunting Flags)
    const flagColors = ['#FF8FB1', '#FFD966', '#8EDC7A', '#D8F3FF', '#C9B6FF'];
    const buntingXs = [80, 130, 180, 230, 280, 330, 380, 430, 480, 530, 580, 630, 680, 730, 780];
    const buntingFlags = buntingXs.map((x, i) => {
      const fc = flagColors[i % flagColors.length];
      const yOffset = Math.sin((i / (buntingXs.length - 1)) * Math.PI) * 10;
      const py = 35 + yOffset;
      return `
        <polygon points="${x - 12},${py} ${x + 12},${py} ${x},${py + 18}" fill="${fc}" stroke="#7A4B2A" stroke-width="1.8" stroke-linejoin="round" />
      `;
    }).join('');

    return `
      <svg class="tier-deck-svg tier-theme-${themeId}" viewBox="0 0 880 180" preserveAspectRatio="none" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="deckWoodTop-${tierNumber}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FDE7CF" />
            <stop offset="60%" stop-color="#F5C99B" />
            <stop offset="100%" stop-color="#E2B282" />
          </linearGradient>
          <linearGradient id="deckWoodFront-${tierNumber}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#E2B282" />
            <stop offset="50%" stop-color="#D49A6A" />
            <stop offset="100%" stop-color="#B87B4C" />
          </linearGradient>
          <linearGradient id="railGrad-${tierNumber}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FDE7CF" />
            <stop offset="100%" stop-color="#F5C99B" />
          </linearGradient>
        </defs>

        <!-- 1. MÂY CUỘN KẸO BÔNG BỒNG BỀNH DÀY DẶN DƯỚI CHÂN BAN CÔNG -->
        <g class="deck-cloud-foundation">
          <!-- Lớp bóng pastel mềm phía dưới -->
          <path d="M 10,135 Q 70,88 150,118 Q 240,78 340,112 Q 440,72 550,108 Q 660,72 750,115 Q 820,85 870,135 L 870,180 L 10,180 Z" fill="#D8F3FF" opacity="0.85" />
          <!-- Lớp mây kẹo bông trắng tròn bồng bềnh -->
          <path d="M 25,125 C 60,78 120,78 165,108 C 210,68 300,68 355,102 C 400,62 500,62 560,98 C 610,64 710,64 765,105 C 810,76 850,96 860,125 L 860,180 L 25,180 Z" fill="#FFFFFF" />
          <!-- Điểm sáng highlight bo tròn -->
          <path d="M 90,83 Q 125,74 165,104" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.9" />
          <path d="M 270,70 Q 310,62 355,98" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.9" />
          <path d="M 470,64 Q 515,55 560,94" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.9" />
          <path d="M 680,66 Q 720,58 765,102" stroke="#FFF4E0" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.9" />
        </g>

        <!-- Bóng đổ ấm từ sàn ban công -->
        <ellipse cx="440" cy="112" rx="390" ry="12" fill="#7A4B2A" opacity="0.15" />

        <!-- 2. SÀN GỖ MÀU BÁNH QUY BO VIỀN NÂU ẤM STICKER (Front edge) -->
        <rect x="35" y="94" width="810" height="22" rx="6" fill="url(#deckWoodFront-${tierNumber})" stroke="#7A4B2A" stroke-width="3" />
        ${[135, 235, 335, 435, 535, 635, 735].map(x => `
          <line x1="${x}" y1="95" x2="${x}" y2="115" stroke="#7A4B2A" stroke-width="2.2" opacity="0.65" />
        `).join('')}

        <!-- Mặt trên sàn gỗ dày có vân (Top deck plank) -->
        <polygon points="25,94 855,94 835,68 45,68" fill="url(#deckWoodTop-${tierNumber})" stroke="#7A4B2A" stroke-width="3" stroke-linejoin="round" />
        ${[135, 235, 335, 435, 535, 635, 735].map(x => `
          <line x1="${x}" y1="69" x2="${x - 8}" y2="93" stroke="#7A4B2A" stroke-width="2" opacity="0.45" />
        `).join('')}

        <!-- 3. LAN CAN GỖ TIỆN BO TRÒN (Turned Railings) -->
        <rect x="38" y="26" width="804" height="9" rx="4.5" fill="url(#railGrad-${tierNumber})" stroke="#7A4B2A" stroke-width="2.6" />
        <rect x="38" y="60" width="804" height="8" rx="4" fill="url(#railGrad-${tierNumber})" stroke="#7A4B2A" stroke-width="2.4" />

        <!-- Con tiện gỗ đứng tiện tròn bầu bĩnh -->
        ${[70, 120, 170, 220, 270, 320, 370, 420, 470, 520, 570, 620, 670, 720, 770, 810].map(x => `
          <g transform="translate(${x}, 34)">
            <rect x="-3" y="0" width="6" height="26" rx="3" fill="url(#railGrad-${tierNumber})" stroke="#7A4B2A" stroke-width="2" />
            <circle cx="0" cy="13" r="5" fill="url(#railGrad-${tierNumber})" stroke="#7A4B2A" stroke-width="1.8" />
          </g>
        `).join('')}

        <!-- Trụ góc hai bên có chóp tròn -->
        <rect x="35" y="16" width="13" height="52" rx="4" fill="url(#deckWoodFront-${tierNumber})" stroke="#7A4B2A" stroke-width="2.6" />
        <circle cx="41.5" cy="12" r="8" fill="#FFD966" stroke="#7A4B2A" stroke-width="2.6" />

        <rect x="832" y="16" width="13" height="52" rx="4" fill="url(#deckWoodFront-${tierNumber})" stroke="#7A4B2A" stroke-width="2.6" />
        <circle cx="838.5" cy="12" r="8" fill="#FFD966" stroke="#7A4B2A" stroke-width="2.6" />

        <!-- 4. DÂY CỜ ĐUÔI NHEO PASTEL (Bunting Flags) -->
        ${buntingFlags}

        <!-- Dây leo + hoa nhỏ sắc màu leo quanh lan can -->
        <path d="M 45,46 Q 90,30 140,50 Q 190,66 240,44 Q 290,28 340,50 Q 390,68 440,44 Q 490,28 540,50 Q 590,68 640,44 Q 690,28 740,50 Q 790,68 835,42"
              stroke="#5DBB63" stroke-width="3.5" fill="none" stroke-linecap="round" />
        
        <!-- Lá xanh táo 2 tông -->
        ${[65, 115, 165, 215, 265, 315, 365, 415, 465, 515, 565, 615, 665, 715, 765, 815].map((x, i) => `
          <ellipse cx="${x}" cy="${i % 2 === 0 ? 38 : 54}" rx="6" ry="4" fill="#8EDC7A" stroke="#2F6A44" stroke-width="1.4" transform="rotate(${(i % 3 - 1) * 25}, ${x}, ${i % 2 === 0 ? 38 : 54})" />
          <ellipse cx="${x + 6}" cy="${i % 2 === 0 ? 40 : 52}" rx="4.5" ry="3" fill="#A7F3D0" opacity="0.9" />
        `).join('')}

        <!-- Hoa nhỏ sắc màu kẹo ngọt -->
        ${[95, 185, 290, 395, 490, 595, 690, 785].map((x, i) => {
          const colors = ['#FF8FB1', '#FFD966', '#FF5376', '#C9B6FF'];
          const c = colors[i % colors.length];
          return `
            <g transform="translate(${x}, ${i % 2 === 0 ? 42 : 50})">
              <circle cx="0" cy="0" r="4.8" fill="${c}" stroke="#7A4B2A" stroke-width="1.4" />
              <circle cx="0" cy="0" r="2" fill="#FFF5B8" />
            </g>
          `;
        }).join('')}

        <!-- 5. ĐÈN LỒNG / PHỤ KIỆN THEO PHONG CÁCH TẦNG CÓ MẶT CƯỜI -->
        ${decorElements}
      </svg>
    `;
  }

  function renderBalloonSVG(width = 110, height = 135) {
    return `
      <svg class="farm-balloon-svg" viewBox="0 0 110 135" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="balloonCandyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FF8FB1" />
            <stop offset="25%" stop-color="#FFD966" />
            <stop offset="50%" stop-color="#8EDC7A" />
            <stop offset="75%" stop-color="#D8F3FF" />
            <stop offset="100%" stop-color="#C9B6FF" />
          </linearGradient>
          <linearGradient id="basketBiscuit" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FDE7CF" />
            <stop offset="100%" stop-color="#F5C99B" />
          </linearGradient>
        </defs>

        <!-- Khí cầu kẹo ngọt bo viền sticker -->
        <path d="M 55,8 C 22,8 10,38 25,72 C 34,90 44,98 55,98 C 66,98 76,90 85,72 C 100,38 88,8 55,8 Z"
              fill="url(#balloonCandyGrad)" stroke="#7A4B2A" stroke-width="3.2" stroke-linejoin="round" />

        <path d="M 55,8 C 42,25 42,75 55,98" stroke="#FFFFFF" stroke-width="2.5" fill="none" opacity="0.8" />
        <path d="M 55,8 C 68,25 68,75 55,98" stroke="#FFFFFF" stroke-width="2.5" fill="none" opacity="0.8" />

        <!-- Mặt cười trên khinh khí cầu -->
        <circle cx="47" cy="46" r="2.4" fill="#7A4B2A" /><circle cx="46.3" cy="45.2" r="0.8" fill="#FFFFFF" />
        <circle cx="63" cy="46" r="2.4" fill="#7A4B2A" /><circle cx="62.3" cy="45.2" r="0.8" fill="#FFFFFF" />
        <ellipse cx="42" cy="49.5" rx="3" ry="1.8" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="68" cy="49.5" rx="3" ry="1.8" fill="#FF8FB1" opacity="0.85" />
        <path d="M 52,49 Q 55,52.5 58,49" stroke="#7A4B2A" stroke-width="2" stroke-linecap="round" fill="none" />

        <line x1="39" y1="98" x2="43" y2="114" stroke="#7A4B2A" stroke-width="2.2" />
        <line x1="71" y1="98" x2="67" y2="114" stroke="#7A4B2A" stroke-width="2.2" />
        <line x1="47" y1="98" x2="48" y2="114" stroke="#7A4B2A" stroke-width="1.8" />
        <line x1="63" y1="98" x2="62" y2="114" stroke="#7A4B2A" stroke-width="1.8" />

        <!-- Giỏ khí cầu bánh quy bo tròn -->
        <rect x="41" y="114" width="28" height="19" rx="6" fill="url(#basketBiscuit)" stroke="#7A4B2A" stroke-width="2.8" />
        <!-- Trái tim nhỏ ở giữa giỏ -->
        <path d="M 55,123 C 55,121.5 53.5,120 52,120 C 50.5,120 49.5,121.5 49.5,122.5 C 49.5,124.5 52,127 55,129 C 58,127 60.5,124.5 60.5,122.5 C 60.5,121.5 59.5,120 58,120 C 56.5,120 55,121.5 55,123 Z" fill="#FF8FB1" stroke="#7A4B2A" stroke-width="1.2" />

        <ellipse cx="38" cy="28" rx="8" ry="15" fill="#FFFFFF" opacity="0.5" transform="rotate(-18, 38, 28)" />
      </svg>
    `;
  }

  /**
   * Sinh SVG cho 8 Linh Thú Chibi ngồi trên ban công (thêm má hồng elip đáng yêu)
   */
  

function renderWorldTreeSVG(tierCount = 3, themes = ['chinese', 'japanese', 'english'], options = {}) {
  const isPortrait = !!options.isPortrait;
  const W = isPortrait ? 640 : 960;
  const cx = W / 2;
  const tierHeight = isPortrait ? 236 : 146;
  const step = isPortrait ? 244 : 154;
  const topOffset = 36;
  const H = Math.max(isPortrait ? 840 : 540, topOffset + tierCount * step + 45);

  const getTheme = (t) => {
    if (Array.isArray(themes)) return themes[t] || 'chinese';
    if (themes && typeof themes === 'object') return themes[t] || 'chinese';
    return 'chinese';
  };

  let branchesHTML = '';
  for (let i = 0; i < tierCount; i++) {
    const t = tierCount - 1 - i;
    const themeId = getTheme(t);
    const tierCenterY = topOffset + i * step + Math.round(tierHeight * 0.72);
    const branchThickness = isPortrait ? 30 : 24;

    const lx1 = cx - 35;
    const ly1 = tierCenterY - 10;
    const lx2 = isPortrait ? 25 : 30;
    const ly2 = tierCenterY + 14;
    const lctrlX = isPortrait ? 160 : 240;
    const lctrlY = tierCenterY + 24;

    const rx1 = cx + 35;
    const ry1 = tierCenterY - 10;
    const rx2 = W - (isPortrait ? 25 : 30);
    const ry2 = tierCenterY + 14;
    const rctrlX = W - (isPortrait ? 160 : 240);
    const rctrlY = tierCenterY + 24;

    let branchFoliage = '';
    if (themeId === 'chinese') {
      branchFoliage = `
        <path d="M ${lx2 + 30},${ly2 - 4} Q ${lx2 + 20},${ly2 - 25} ${lx2 + 10},${ly2 - 35}" stroke="#16A34A" stroke-width="2.2" fill="none" stroke-linecap="round" />
        <ellipse cx="${lx2 + 5}" cy="${ly2 - 38}" rx="8" ry="3.5" fill="#4ADE80" stroke="#15803D" stroke-width="1.2" transform="rotate(-30, ${lx2 + 5}, ${ly2 - 38})" />
        <ellipse cx="${lx2 + 18}" cy="${ly2 - 28}" rx="7" ry="3" fill="#86EFAC" stroke="#15803D" stroke-width="1" transform="rotate(20, ${lx2 + 18}, ${ly2 - 28})" />
        <path d="M ${rx2 - 30},${ry2 - 4} Q ${rx2 - 20},${ry2 - 25} ${rx2 - 10},${ry2 - 35}" stroke="#16A34A" stroke-width="2.2" fill="none" stroke-linecap="round" />
        <ellipse cx="${rx2 - 5}" cy="${ry2 - 38}" rx="8" ry="3.5" fill="#4ADE80" stroke="#15803D" stroke-width="1.2" transform="rotate(30, ${rx2 - 5}, ${ry2 - 38})" />
      `;
    } else if (themeId === 'japanese') {
      branchFoliage = `
        <g transform="translate(${lx2 + 25}, ${ly2 - 8})">
          <circle cx="0" cy="0" r="4.5" fill="#FDA4AF" stroke="#BE123C" stroke-width="1" />
          <circle cx="-5" cy="-2" r="3.5" fill="#FECDD3" />
          <circle cx="4" cy="-4" r="3.5" fill="#FECDD3" />
          <circle cx="0" cy="0" r="1.8" fill="#FDE047" />
        </g>
        <g transform="translate(${rx2 - 25}, ${ry2 - 8})">
          <circle cx="0" cy="0" r="4.5" fill="#FDA4AF" stroke="#BE123C" stroke-width="1" />
          <circle cx="0" cy="0" r="1.8" fill="#FDE047" />
        </g>
      `;
    } else if (themeId === 'english') {
      branchFoliage = `
        <path d="M ${lx2 + 15},${ly2} Q ${lx2 + 35},${ly2 - 12} ${lx2 + 55},${ly2 + 2}" stroke="#15803D" stroke-width="1.8" fill="none" />
        <circle cx="${lx2 + 25}" cy="${ly2 - 8}" r="4.5" fill="#FB7185" stroke="#9F1239" stroke-width="1" />
        <circle cx="${lx2 + 45}" cy="${ly2 - 6}" r="4" fill="#F43F5E" stroke="#9F1239" stroke-width="1" />
      `;
    } else {
      branchFoliage = `
        <ellipse cx="${lx2 + 28}" cy="${ly2 - 12}" rx="5" ry="3.2" fill="#FBBF24" stroke="#B45309" stroke-width="1" transform="rotate(-25, ${lx2 + 28}, ${ly2 - 12})" />
        <ellipse cx="${rx2 - 28}" cy="${ry2 - 12}" rx="5" ry="3.2" fill="#FBBF24" stroke="#B45309" stroke-width="1" transform="rotate(25, ${rx2 - 28}, ${ry2 - 12})" />
      `;
    }

    // Cành uốn cong tự nhiên, gốc to dần về thân cây, có vân vỏ và chồi lá
    branchesHTML += `
      <g class="world-tree-branch branch-tier-${t}">
        <!-- Cành trái: gốc to (ly1-16 đến ly1+24), uốn lượn tự nhiên nâng ban công, thon dần về đầu cành -->
        <path d="M ${lx1},${ly1 - 16}
                 C ${lx1 - 70},${ly1 - 8} ${lctrlX + 50},${tierCenterY + 4} ${lctrlX},${tierCenterY + 12}
                 C ${lctrlX - 60},${tierCenterY + 18} ${lx2 + 45},${ly2 - 2} ${lx2},${ly2}
                 L ${lx2},${ly2 + 14}
                 C ${lx2 + 45},${ly2 + 16} ${lctrlX - 55},${tierCenterY + 30} ${lctrlX},${tierCenterY + 26}
                 C ${lctrlX + 55},${tierCenterY + 22} ${lx1 - 60},${ly1 + 18} ${lx1},${ly1 + 24} Z"
              fill="url(#treeBranchGrad)" stroke="#5C280B" stroke-width="2.4" stroke-linejoin="round" />

        <!-- Cành phải: đối xứng uốn cong tự nhiên, gốc to ôm lấy thân cây -->
        <path d="M ${rx1},${ry1 - 16}
                 C ${rx1 + 70},${ry1 - 8} ${rctrlX - 50},${tierCenterY + 4} ${rctrlX},${tierCenterY + 12}
                 C ${rctrlX + 60},${tierCenterY + 18} ${rx2 - 45},${ly2 - 2} ${rx2},${ry2}
                 L ${rx2},${ry2 + 14}
                 C ${rx2 - 45},${ry2 + 16} ${rctrlX + 55},${tierCenterY + 30} ${rctrlX},${tierCenterY + 26}
                 C ${rctrlX - 55},${tierCenterY + 22} ${rx1 + 60},${ry1 + 18} ${rx1},${ry1 + 24} Z"
              fill="url(#treeBranchGrad)" stroke="#5C280B" stroke-width="2.4" stroke-linejoin="round" />

        <!-- Vân vỏ cành trái mềm mại theo thớ gỗ tự nhiên -->
        <path d="M ${lx1 - 8},${ly1 - 4} C ${lx1 - 65},${ly1 + 6} ${lctrlX + 45},${tierCenterY + 12} ${lctrlX},${tierCenterY + 16} C ${lctrlX - 50},${tierCenterY + 20} ${lx2 + 35},${ly2 + 4} ${lx2 + 12},${ly2 + 6}" stroke="#78350F" stroke-width="1.8" fill="none" opacity="0.65" stroke-linecap="round" />
        <path d="M ${lx1 - 14},${ly1 + 6} C ${lx1 - 70},${ly1 + 15} ${lctrlX + 35},${tierCenterY + 20} ${lctrlX},${tierCenterY + 22} C ${lctrlX - 40},${tierCenterY + 23} ${lx2 + 45},${ly2 + 9} ${lx2 + 20},${ly2 + 10}" stroke="#F5C99B" stroke-width="1.6" fill="none" opacity="0.55" stroke-linecap="round" />
        <!-- Vân sọc nhẫn gỗ nhỏ gốc cành -->
        <ellipse cx="${lx1 - 45}" cy="${ly1 + 5}" rx="5.5" ry="3" fill="none" stroke="#603813" stroke-width="1.3" opacity="0.55" transform="rotate(-15, ${lx1 - 45}, ${ly1 + 5})" />

        <!-- Vân vỏ cành phải -->
        <path d="M ${rx1 + 8},${ry1 - 4} C ${rx1 + 65},${ry1 + 6} ${rctrlX - 45},${tierCenterY + 12} ${rctrlX},${tierCenterY + 16} C ${rctrlX + 50},${tierCenterY + 20} ${rx2 - 35},${ry2 + 4} ${rx2 - 12},${ry2 + 6}" stroke="#78350F" stroke-width="1.8" fill="none" opacity="0.65" stroke-linecap="round" />
        <path d="M ${rx1 + 14},${ry1 + 6} C ${rx1 + 70},${ry1 + 15} ${rctrlX - 35},${tierCenterY + 20} ${rctrlX},${tierCenterY + 22} C ${rctrlX + 40},${tierCenterY + 23} ${rx2 - 45},${ry2 + 9} ${rx2 - 20},${ry2 + 10}" stroke="#F5C99B" stroke-width="1.6" fill="none" opacity="0.55" stroke-linecap="round" />
        <ellipse cx="${rx1 + 45}" cy="${ry1 + 5}" rx="5.5" ry="3" fill="none" stroke="#603813" stroke-width="1.3" opacity="0.55" transform="rotate(15, ${rx1 + 45}, ${ry1 + 5})" />

        <!-- Chồi lá xanh non đâm chồi trên cành (Sprouting leaf buds) -->
        <!-- Chồi cành trái -->
        <g class="world-tree-sprouts-l">
          <path d="M ${lx1 - 65},${ly1 + 2} Q ${lx1 - 78},${ly1 - 12} ${lx1 - 88},${ly1 - 16}" stroke="#15803D" stroke-width="1.8" fill="none" stroke-linecap="round" />
          <ellipse cx="${lx1 - 90}" cy="${ly1 - 18}" rx="6" ry="3" fill="#4ADE80" stroke="#15803D" stroke-width="1" transform="rotate(-35, ${lx1 - 90}, ${ly1 - 18})" />
          <ellipse cx="${lx1 - 82}" cy="${ly1 - 10}" rx="5" ry="2.4" fill="#86EFAC" stroke="#15803D" stroke-width="0.8" transform="rotate(25, ${lx1 - 82}, ${ly1 - 10})" />
          <circle cx="${lx1 - 88}" cy="${ly1 - 16}" r="1.4" fill="#BBF7D0" />
          <!-- Chồi non nhỏ ở đoạn giữa cành -->
          <path d="M ${lctrlX + 15},${tierCenterY + 16} Q ${lctrlX + 8},${tierCenterY + 4} ${lctrlX + 2},${tierCenterY - 2}" stroke="#15803D" stroke-width="1.6" fill="none" stroke-linecap="round" />
          <ellipse cx="${lctrlX}" cy="${tierCenterY - 4}" rx="5" ry="2.6" fill="#4ADE80" stroke="#15803D" stroke-width="0.9" transform="rotate(-20, ${lctrlX}, ${tierCenterY - 4})" />
          <ellipse cx="${lctrlX + 7}" cy="${tierCenterY + 2}" rx="4" ry="2" fill="#86EFAC" stroke="#15803D" stroke-width="0.8" transform="rotate(30, ${lctrlX + 7}, ${tierCenterY + 2})" />
        </g>

        <!-- Chồi cành phải -->
        <g class="world-tree-sprouts-r">
          <path d="M ${rx1 + 65},${ry1 + 2} Q ${rx1 + 78},${ry1 - 12} ${rx1 + 88},${ry1 - 16}" stroke="#15803D" stroke-width="1.8" fill="none" stroke-linecap="round" />
          <ellipse cx="${rx1 + 90}" cy="${ry1 - 18}" rx="6" ry="3" fill="#4ADE80" stroke="#15803D" stroke-width="1" transform="rotate(35, ${rx1 + 90}, ${ry1 - 18})" />
          <ellipse cx="${rx1 + 82}" cy="${ry1 - 10}" rx="5" ry="2.4" fill="#86EFAC" stroke="#15803D" stroke-width="0.8" transform="rotate(-25, ${rx1 + 82}, ${ry1 - 10})" />
          <circle cx="${rx1 + 88}" cy="${ry1 - 16}" r="1.4" fill="#BBF7D0" />
          <path d="M ${rctrlX - 15},${tierCenterY + 16} Q ${rctrlX - 8},${tierCenterY + 4} ${rctrlX - 2},${tierCenterY - 2}" stroke="#15803D" stroke-width="1.6" fill="none" stroke-linecap="round" />
          <ellipse cx="${rctrlX}" cy="${tierCenterY - 4}" rx="5" ry="2.6" fill="#4ADE80" stroke="#15803D" stroke-width="0.9" transform="rotate(20, ${rctrlX}, ${tierCenterY - 4})" />
          <ellipse cx="${rctrlX - 7}" cy="${tierCenterY + 2}" rx="4" ry="2" fill="#86EFAC" stroke="#15803D" stroke-width="0.8" transform="rotate(-30, ${rctrlX - 7}, ${tierCenterY + 2})" />
        </g>

        ${branchFoliage}
      </g>
    `;
  }

  const hollowY = topOffset + (tierCount > 1 ? Math.round(step * 0.95) : 150);
  const hollowX = cx - 4;

  const fruitPositions = isPortrait ? [
    [cx - 160, 38], [cx - 90, 22], [cx - 30, 48], [cx + 35, 26], [cx + 110, 42], [cx + 165, 30]
  ] : [
    [cx - 240, 42], [cx - 160, 25], [cx - 85, 48], [cx - 20, 22], [cx + 50, 45], [cx + 130, 28], [cx + 210, 48], [cx + 260, 32]
  ];

  const fruitsHTML = fruitPositions.map(([fx, fy]) => `
    <g class="world-tree-fruit" transform="translate(${fx}, ${fy})">
      <circle cx="0" cy="0" r="10" fill="url(#fruitAuraGlow)" />
      <circle cx="0" cy="0" r="5" fill="#FDE047" stroke="#D97706" stroke-width="1.2" />
      <circle cx="-1.5" cy="-1.5" r="1.5" fill="#FFFFFF" />
    </g>
  `).join('');

  const canopyW = isPortrait ? 240 : 340;
  const canopyHTML = `
    <g class="world-tree-canopy">
      <path d="M ${cx - canopyW},70
               C ${cx - canopyW - 20},20 ${cx - canopyW * 0.6},0 ${cx - canopyW * 0.3},15
               C ${cx - canopyW * 0.2},-12 ${cx + canopyW * 0.2},-12 ${cx + canopyW * 0.3},15
               C ${cx + canopyW * 0.6},0 ${cx + canopyW + 20},20 ${cx + canopyW},70
               C ${cx + canopyW + 15},95 ${cx + canopyW * 0.5},110 ${cx},105
               C ${cx - canopyW * 0.5},110 ${cx - canopyW - 15},95 ${cx - canopyW},70 Z"
            fill="url(#canopyDarkGrad)" stroke="#1F4D2B" stroke-width="3" />
      <circle cx="${cx - canopyW * 0.65}" cy="52" r="${isPortrait ? 42 : 58}" fill="url(#canopyMidGrad)" />
      <circle cx="${cx - canopyW * 0.35}" cy="36" r="${isPortrait ? 52 : 72}" fill="url(#canopyMidGrad)" />
      <circle cx="${cx}" cy="30" r="${isPortrait ? 60 : 80}" fill="url(#canopyLightGrad)" />
      <circle cx="${cx + canopyW * 0.35}" cy="36" r="${isPortrait ? 52 : 72}" fill="url(#canopyMidGrad)" />
      <circle cx="${cx + canopyW * 0.65}" cy="52" r="${isPortrait ? 42 : 58}" fill="url(#canopyMidGrad)" />
      <ellipse cx="${cx - canopyW * 0.4}" cy="32" rx="${isPortrait ? 38 : 52}" ry="${isPortrait ? 26 : 36}" fill="#A7F3D0" opacity="0.45" />
      <ellipse cx="${cx + canopyW * 0.4}" cy="32" rx="${isPortrait ? 38 : 52}" ry="${isPortrait ? 26 : 36}" fill="#A7F3D0" opacity="0.45" />
      <ellipse cx="${cx}" cy="22" rx="${isPortrait ? 48 : 64}" ry="${isPortrait ? 30 : 40}" fill="#BBF7D0" opacity="0.5" />
      ${fruitsHTML}
    </g>
  `;

  const rootStartY = H - 85;
  const cloudBaseY = H - 45;

  return `
    <svg class="vt-world-tree-svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="worldTreeBarkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#5C280B" />
          <stop offset="22%" stop-color="#8B5A2B" />
          <stop offset="50%" stop-color="#B87B4C" />
          <stop offset="78%" stop-color="#8B5A2B" />
          <stop offset="100%" stop-color="#4A2008" />
        </linearGradient>
        <linearGradient id="treeBranchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#D49A6A" />
          <stop offset="35%" stop-color="#B87B4C" />
          <stop offset="85%" stop-color="#8B5A2B" />
          <stop offset="100%" stop-color="#5C280B" />
        </linearGradient>
        <linearGradient id="canopyDarkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2F6A44" />
          <stop offset="100%" stop-color="#1B432A" />
        </linearGradient>
        <linearGradient id="canopyMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#5DBB68" />
          <stop offset="60%" stop-color="#3D8B48" />
          <stop offset="100%" stop-color="#286333" />
        </linearGradient>
        <linearGradient id="canopyLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#8EDC7A" />
          <stop offset="50%" stop-color="#5DBB68" />
          <stop offset="100%" stop-color="#3D8B48" />
        </linearGradient>
        <radialGradient id="fruitAuraGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.85" />
          <stop offset="60%" stop-color="#FDE047" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#FDE047" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="fairyWindowGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFDF0" />
          <stop offset="45%" stop-color="#FEF08A" />
          <stop offset="80%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#B45309" />
        </radialGradient>
        <linearGradient id="cloudSeaGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="65%" stop-color="#F0F9FF" />
          <stop offset="100%" stop-color="#D8F3FF" />
        </linearGradient>
        <linearGradient id="cloudSeaGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="60%" stop-color="#FDF2F8" />
          <stop offset="100%" stop-color="#FCE7F3" />
        </linearGradient>
      </defs>
      ${canopyHTML}
      <g class="world-tree-trunk">
        <path d="M ${cx - 50},80
                 C ${cx - 55},${H * 0.25} ${cx - 62},${H * 0.55} ${cx - 72},${rootStartY}
                 L ${cx + 72},${rootStartY}
                 C ${cx + 62},${H * 0.55} ${cx + 55},${H * 0.25} ${cx + 50},80 Z"
              fill="url(#worldTreeBarkGrad)" stroke="#4A2008" stroke-width="3" stroke-linejoin="round" />
        <path d="M ${cx - 30},90 Q ${cx - 38},${H * 0.3} ${cx - 44},${H * 0.6} Q ${cx - 48},${H * 0.8} ${cx - 54},${rootStartY}"
              stroke="#603813" stroke-width="2.6" fill="none" opacity="0.6" stroke-linecap="round" />
        <path d="M ${cx + 32},90 Q ${cx + 38},${H * 0.3} ${cx + 42},${H * 0.6} Q ${cx + 46},${H * 0.8} ${cx + 54},${rootStartY}"
              stroke="#603813" stroke-width="2.6" fill="none" opacity="0.6" stroke-linecap="round" />
        <path d="M ${cx - 2},90 Q ${cx - 4},${H * 0.35} ${cx - 3},${H * 0.65} Q ${cx - 2},${H * 0.85} ${cx - 4},${rootStartY}"
              stroke="#F5C99B" stroke-width="2.8" fill="none" opacity="0.55" stroke-linecap="round" />
        <g class="world-tree-fairy-house" transform="translate(${hollowX}, ${hollowY})">
          <ellipse cx="0" cy="0" rx="26" ry="30" fill="#2E1305" stroke="#5C280B" stroke-width="3" />
          <circle cx="0" cy="0" r="28" fill="url(#fruitAuraGlow)" opacity="0.6" />
          <circle cx="0" cy="0" r="19" fill="url(#fairyWindowGlow)" stroke="#F59E0B" stroke-width="2.4" />
          <line x1="-19" y1="0" x2="19" y2="0" stroke="#78350F" stroke-width="2.2" stroke-linecap="round" />
          <line x1="0" y1="-19" x2="0" y2="19" stroke="#78350F" stroke-width="2.2" stroke-linecap="round" />
          <rect x="-18" y="14" width="36" height="8" rx="4" fill="#B45309" stroke="#78350F" stroke-width="1.8" />
          <circle cx="-10" cy="13" r="3.5" fill="#FDA4AF" stroke="#BE123C" stroke-width="0.8" />
          <circle cx="0" cy="12" r="4" fill="#FDE047" stroke="#D97706" stroke-width="0.8" />
          <circle cx="10" cy="13" r="3.5" fill="#38BDF8" stroke="#0284C7" stroke-width="0.8" />
        </g>
      </g>
      ${branchesHTML}
      <g class="world-tree-roots">
        <path d="M ${cx - 50},${rootStartY - 10}
                 C ${cx - 90},${rootStartY + 15} ${cx - 160},${rootStartY + 25} ${cx - 220},${H - 10}
                 L ${cx - 180},${H}
                 C ${cx - 130},${rootStartY + 35} ${cx - 70},${rootStartY + 20} ${cx - 30},${rootStartY} Z"
              fill="url(#worldTreeBarkGrad)" stroke="#4A2008" stroke-width="2.4" />
        <path d="M ${cx + 50},${rootStartY - 10}
                 C ${cx + 90},${rootStartY + 15} ${cx + 160},${rootStartY + 25} ${cx + 220},${H - 10}
                 L ${cx + 180},${H}
                 C ${cx + 130},${rootStartY + 35} ${cx + 70},${rootStartY + 20} ${cx + 30},${rootStartY} Z"
              fill="url(#worldTreeBarkGrad)" stroke="#4A2008" stroke-width="2.4" />
        <!-- Rễ phụ uốn lượn tự nhiên -->
        <path d="M ${cx - 15},${rootStartY + 5} Q ${cx - 25},${rootStartY + 35} ${cx - 60},${H - 5}"
              stroke="#603813" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.8" />
        <path d="M ${cx + 15},${rootStartY + 5} Q ${cx + 25},${rootStartY + 35} ${cx + 60},${H - 5}"
              stroke="#603813" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.8" />
      </g>

      <!-- Biển mây bồng bềnh cuộn tròn quấn quanh gốc rễ (không bị cắt phẳng, mép lượn sóng) -->
      <g class="world-tree-cloud-sea">
        <!-- Lớp mây nền xa lượn sóng bồng bềnh -->
        <path d="M -10,${cloudBaseY - 18}
                 C ${W * 0.08},${cloudBaseY - 52} ${W * 0.18},${cloudBaseY - 48} ${W * 0.28},${cloudBaseY - 26}
                 C ${W * 0.38},${cloudBaseY - 58} ${W * 0.48},${cloudBaseY - 54} ${W * 0.58},${cloudBaseY - 28}
                 C ${W * 0.68},${cloudBaseY - 56} ${W * 0.80},${cloudBaseY - 50} ${W * 0.90},${cloudBaseY - 24}
                 C ${W * 0.96},${cloudBaseY - 42} ${W + 5},${cloudBaseY - 30} ${W + 20},${cloudBaseY - 18}
                 L ${W + 20},${H} L -20,${H} Z"
              fill="url(#cloudSeaGrad1)" opacity="0.75" />

        <!-- Lớp mây giữa các múi phồng tròn mềm mại -->
        <path d="M -15,${cloudBaseY - 6}
                 C ${W * 0.06},${cloudBaseY - 36} ${W * 0.14},${cloudBaseY - 34} ${W * 0.22},${cloudBaseY - 10}
                 C ${W * 0.32},${cloudBaseY - 44} ${W * 0.44},${cloudBaseY - 40} ${W * 0.52},${cloudBaseY - 8}
                 C ${W * 0.62},${cloudBaseY - 42} ${W * 0.74},${cloudBaseY - 38} ${W * 0.82},${cloudBaseY - 12}
                 C ${W * 0.90},${cloudBaseY - 36} ${W * 0.96},${cloudBaseY - 32} ${W + 20},${cloudBaseY - 8}
                 L ${W + 20},${H} L -20,${H} Z"
              fill="url(#cloudSeaGrad2)" opacity="0.88" />

        <!-- Cụm mây bông gòn tròn quấn chặt và ôm quanh 2 nhánh rễ lớn -->
        <!-- Cụm mây bên rễ trái -->
        <circle cx="${cx - 190}" cy="${rootStartY + 42}" r="34" fill="#FFFFFF" opacity="0.95" />
        <circle cx="${cx - 145}" cy="${rootStartY + 30}" r="38" fill="#FFFFFF" />
        <circle cx="${cx - 105}" cy="${rootStartY + 25}" r="32" fill="#FFFFFF" />
        <ellipse cx="${cx - 150}" cy="${rootStartY + 20}" rx="42" ry="22" fill="#FFFFFF" opacity="0.9" />

        <!-- Cụm mây trung tâm ôm trước thân rễ -->
        <circle cx="${cx - 65}" cy="${rootStartY + 28}" r="36" fill="#FFFFFF" />
        <circle cx="${cx - 20}" cy="${rootStartY + 18}" r="32" fill="#FFFFFF" />
        <circle cx="${cx + 25}" cy="${rootStartY + 20}" r="34" fill="#FFFFFF" />
        <circle cx="${cx + 70}" cy="${rootStartY + 26}" r="36" fill="#FFFFFF" />
        <ellipse cx="${cx}" cy="${rootStartY + 22}" rx="52" ry="24" fill="#FFFFFF" />

        <!-- Cụm mây bên rễ phải -->
        <circle cx="${cx + 115}" cy="${rootStartY + 26}" r="34" fill="#FFFFFF" />
        <circle cx="${cx + 155}" cy="${rootStartY + 32}" r="38" fill="#FFFFFF" />
        <circle cx="${cx + 195}" cy="${rootStartY + 42}" r="34" fill="#FFFFFF" opacity="0.95" />
        <ellipse cx="${cx + 150}" cy="${rootStartY + 20}" rx="42" ry="22" fill="#FFFFFF" opacity="0.9" />

        <!-- Viền lượn sóng cuộn tròn tiền cảnh tràn mép (Foreground puff bank) -->
        <path d="M -20,${cloudBaseY + 8}
                 C ${W * 0.05},${cloudBaseY - 18} ${W * 0.12},${cloudBaseY - 18} ${W * 0.18},${cloudBaseY + 2}
                 C ${W * 0.24},${cloudBaseY - 24} ${W * 0.32},${cloudBaseY - 24} ${W * 0.40},${cloudBaseY + 4}
                 C ${W * 0.46},${cloudBaseY - 26} ${W * 0.54},${cloudBaseY - 26} ${W * 0.60},${cloudBaseY + 4}
                 C ${W * 0.68},${cloudBaseY - 24} ${W * 0.76},${cloudBaseY - 24} ${W * 0.82},${cloudBaseY + 2}
                 C ${W * 0.88},${cloudBaseY - 20} ${W * 0.95},${cloudBaseY - 20} ${W + 20},${cloudBaseY + 8}
                 L ${W + 20},${H + 20} L -20,${H + 20} Z"
              fill="#FFFFFF" />

        <!-- Highlight vòng sáng viền mây bồng bềnh -->
        <path d="M ${cx - 170},${rootStartY + 14} Q ${cx - 145},${rootStartY + 4} ${cx - 120},${rootStartY + 12}"
              stroke="#FFF9EB" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9" />
        <path d="M ${cx - 45},${rootStartY + 6} Q ${cx},${rootStartY - 2} ${cx + 45},${rootStartY + 6}"
              stroke="#FFF9EB" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.9" />
        <path d="M ${cx + 120},${rootStartY + 12} Q ${cx + 145},${rootStartY + 4} ${cx + 170},${rootStartY + 14}"
              stroke="#FFF9EB" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9" />

        <!-- Dải sương mây quấn quanh thân rễ cây đại thụ -->
        <path d="M ${cx - 85},${rootStartY + 8} C ${cx - 55},${rootStartY - 4} ${cx - 20},${rootStartY + 12} ${cx + 15},${rootStartY + 2}"
              stroke="#E0F2FE" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.75" />
        <path d="M ${cx - 25},${rootStartY + 20} C ${cx + 15},${rootStartY + 6} ${cx + 60},${rootStartY + 18} ${cx + 90},${rootStartY + 10}"
              stroke="#E0F2FE" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.75" />
      </g>
    </svg>
  `;
}



function renderPetInner(petType) {
  let inner = '';
  if (petType === 'panda') {
    inner = `
      <!-- Gấu trúc Chibi ôm cành trúc (Thiết kế gốc) -->
      <g class="pet-chibi-group pet-anim-panda">
        <!-- Đuôi nhỏ tròn xoe -->
        <circle cx="58" cy="58" r="4.5" fill="#1E293B" stroke="#4A2B11" stroke-width="1.8" />
        <!-- Bụng béo tròn -->
        <ellipse cx="40" cy="54" rx="24" ry="18" fill="#FFFDF8" stroke="#4A2B11" stroke-width="2.2" />
        <path d="M 22,54 Q 40,66 58,54" stroke="#E2E8F0" stroke-width="2.2" fill="none" opacity="0.6" />
        <!-- 2 chân sau ngồi -->
        <ellipse cx="23" cy="63" rx="8" ry="5.5" fill="#1E293B" stroke="#4A2B11" stroke-width="1.8" />
        <circle cx="23" cy="63" r="2.8" fill="#FF8FB1" />
        <ellipse cx="57" cy="63" rx="8" ry="5.5" fill="#1E293B" stroke="#4A2B11" stroke-width="1.8" />
        <circle cx="57" cy="63" r="2.8" fill="#FF8FB1" />
        <!-- Tai gấu trúc tròn lông mượt -->
        <circle cx="21" cy="19" r="8" fill="#1E293B" stroke="#4A2B11" stroke-width="1.8" />
        <circle cx="22" cy="20" r="3.5" fill="#FF8FB1" opacity="0.8" />
        <circle cx="59" cy="19" r="8" fill="#1E293B" stroke="#4A2B11" stroke-width="1.8" />
        <circle cx="58" cy="20" r="3.5" fill="#FF8FB1" opacity="0.8" />
        <!-- Đầu tròn to chibi -->
        <circle cx="40" cy="34" r="22" fill="#FFFDF8" stroke="#4A2B11" stroke-width="2.2" />
        <!-- Quầng mắt đen nghiêng dễ thương -->
        <ellipse cx="30" cy="33" rx="6.5" ry="5.5" fill="#1E293B" transform="rotate(-15, 30, 33)" />
        <ellipse cx="50" cy="33" rx="6.5" ry="5.5" fill="#1E293B" transform="rotate(15, 50, 33)" />
        <!-- Mắt to long lanh 2 đốm sáng -->
        <circle cx="31" cy="32" r="3.8" fill="#0F172A" />
        <circle cx="32" cy="30.5" r="1.6" fill="#FFFFFF" />
        <circle cx="29.5" cy="33" r="0.8" fill="#FFFFFF" />
        <circle cx="49" cy="32" r="3.8" fill="#0F172A" />
        <circle cx="50" cy="30.5" r="1.6" fill="#FFFFFF" />
        <circle cx="47.5" cy="33" r="0.8" fill="#FFFFFF" />
        <!-- Má hồng kẹo ngọt -->
        <ellipse cx="22" cy="39" rx="3.5" ry="2" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="58" cy="39" rx="3.5" ry="2" fill="#FF8FB1" opacity="0.85" />
        <!-- Mũi tam giác & miệng cười w -->
        <polygon points="40,37 38,39 42,39" fill="#1E293B" />
        <path d="M 37,41 Q 40,43.5 43,41" stroke="#4A2B11" stroke-width="1.5" stroke-linecap="round" fill="none" />
        <!-- Cành tre non có lá -->
        <path d="M 46,54 Q 60,46 66,35" stroke="#16A34A" stroke-width="2.4" stroke-linecap="round" fill="none" />
        <path d="M 66,35 Q 73,31 75,25 Q 68,31 66,35 Z" fill="#4ADE80" stroke="#15803D" stroke-width="1.2" />
        <path d="M 61,40 Q 72,40 73,35 Q 66,41 61,40 Z" fill="#86EFAC" stroke="#15803D" stroke-width="1.2" />
        <!-- Hai tay béo tròn ôm cành tre -->
        <ellipse cx="32" cy="49" rx="6" ry="5" fill="#1E293B" stroke="#4A2B11" stroke-width="1.8" />
        <ellipse cx="48" cy="48" rx="6" ry="5" fill="#1E293B" stroke="#4A2B11" stroke-width="1.8" />
      </g>
    `;
  } else if (petType === 'dragon') {
    inner = `
      <!-- Rồng con xanh ngọc mềm mại sừng nhỏ cánh mây (Thiết kế gốc) -->
      <g class="pet-chibi-group pet-anim-dragon">
        <!-- Đuôi mềm mại uốn lượn có chỏm mây tròn -->
        <path d="M 50,58 C 62,58 70,52 68,42 C 66,35 58,37 54,44 Z" fill="#2DD4BF" stroke="#134E4A" stroke-width="1.8" stroke-linejoin="round" />
        <circle cx="68" cy="40" r="5.2" fill="#E0F2FE" stroke="#38BDF8" stroke-width="1.5" />
        <circle cx="73" cy="38" r="3.5" fill="#BAE6FD" />
        <!-- 2 cánh mây nhỏ sau lưng mềm mại -->
        <path d="M 22,42 Q 10,36 12,28 Q 18,28 22,34" fill="#E0F2FE" stroke="#38BDF8" stroke-width="1.8" stroke-linejoin="round" />
        <path d="M 58,42 Q 70,36 68,28 Q 62,28 58,34" fill="#E0F2FE" stroke="#38BDF8" stroke-width="1.8" stroke-linejoin="round" />
        <!-- Thân tròn xanh ngọc bích -->
        <ellipse cx="40" cy="55" rx="22" ry="17" fill="#2DD4BF" stroke="#134E4A" stroke-width="2.2" />
        <!-- Bụng vàng bơ có ngấn vảy mềm -->
        <ellipse cx="40" cy="56" rx="14" ry="12" fill="#FEF08A" stroke="#134E4A" stroke-width="1.4" />
        <line x1="30" y1="53" x2="50" y2="53" stroke="#F59E0B" stroke-width="1.4" stroke-linecap="round" />
        <line x1="32" y1="58" x2="48" y2="58" stroke="#F59E0B" stroke-width="1.4" stroke-linecap="round" />
        <!-- Chân ngồi bụ bẫm -->
        <ellipse cx="24" cy="64" rx="7.5" ry="5" fill="#2DD4BF" stroke="#134E4A" stroke-width="1.8" />
        <ellipse cx="56" cy="64" rx="7.5" ry="5" fill="#2DD4BF" stroke="#134E4A" stroke-width="1.8" />
        <!-- Sừng vàng nhỏ nhánh hươu xinh bo tròn mềm mại -->
        <path d="M 28,19 Q 22,11 18,9 Q 23,14 25,17" fill="#FBBF24" stroke="#B45309" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M 52,19 Q 58,11 62,9 Q 57,14 55,17" fill="#FBBF24" stroke="#B45309" stroke-width="1.5" stroke-linejoin="round" />
        <!-- Đầu rồng to tròn ngộ nghĩnh nét mềm -->
        <circle cx="40" cy="33" r="22" fill="#2DD4BF" stroke="#134E4A" stroke-width="2.2" />
        <!-- Mõm tròn nhô nhẹ -->
        <ellipse cx="40" cy="39" rx="9" ry="6" fill="#5EEAD4" stroke="#134E4A" stroke-width="1.4" />
        <circle cx="37" cy="38" r="1.2" fill="#134E4A" />
        <circle cx="43" cy="38" r="1.2" fill="#134E4A" />
        <!-- Mắt ngọc lục bảo to long lanh 2 đốm sáng -->
        <circle cx="29" cy="30" r="5" fill="#064E3B" />
        <circle cx="30.5" cy="28.5" r="2.2" fill="#FFFFFF" />
        <circle cx="28" cy="31.5" r="1" fill="#FFFFFF" />
        <circle cx="51" cy="30" r="5" fill="#064E3B" />
        <circle cx="52.5" cy="28.5" r="2.2" fill="#FFFFFF" />
        <circle cx="50" cy="31.5" r="1" fill="#FFFFFF" />
        <!-- Má hồng vàng óng phát sáng -->
        <ellipse cx="20" cy="36" rx="3.5" ry="2" fill="#FDE047" opacity="0.9" />
        <ellipse cx="60" cy="36" rx="3.5" ry="2" fill="#FDE047" opacity="0.9" />
        <!-- Nụ cười rồng con hiền hòa -->
        <path d="M 37,42 Q 40,44 43,42" stroke="#134E4A" stroke-width="1.4" stroke-linecap="round" fill="none" />
        <!-- Tay con trước ngực -->
        <ellipse cx="33" cy="48" rx="4.5" ry="3.5" fill="#2DD4BF" stroke="#134E4A" stroke-width="1.6" />
        <ellipse cx="47" cy="48" rx="4.5" ry="3.5" fill="#2DD4BF" stroke="#134E4A" stroke-width="1.6" />
      </g>
    `;
  } else if (petType === 'maneki_neko') {
    inner = `
      <!-- Mèo may mắn tài lộc chibi nét mềm mại (Thiết kế gốc) -->
      <g class="pet-chibi-group pet-anim-cat">
        <!-- Đuôi vểnh cong bên trái mềm mại -->
        <path d="M 24,58 Q 14,54 16,42 Q 22,44 24,52" fill="#FFFDF8" stroke="#5C3D24" stroke-width="1.8" stroke-linejoin="round" />
        <!-- Thân béo tròn màu kem sứ bo tròn -->
        <ellipse cx="40" cy="55" rx="22" ry="17" fill="#FFFDF8" stroke="#5C3D24" stroke-width="2.2" />
        <!-- Vòng cổ đỏ thắm & Chuông vàng phát sáng -->
        <path d="M 27,47 Q 40,52 53,47" stroke="#EF4444" stroke-width="3.8" stroke-linecap="round" fill="none" />
        <circle cx="40" cy="51" r="5.5" fill="#FBBF24" stroke="#B45309" stroke-width="1.4" />
        <line x1="36" y1="51" x2="44" y2="51" stroke="#B45309" stroke-width="1.2" />
        <circle cx="40" cy="53" r="1.2" fill="#78350F" />
        <!-- Chân ngồi -->
        <ellipse cx="26" cy="64" rx="7.5" ry="4.5" fill="#FFFDF8" stroke="#5C3D24" stroke-width="1.8" />
        <ellipse cx="54" cy="64" rx="7.5" ry="4.5" fill="#FFFDF8" stroke="#5C3D24" stroke-width="1.8" />
        <!-- Tai tam giác bo góc tròn hồng đào -->
        <polygon points="20,24 16,10 30,16" fill="#FF8FB1" stroke="#5C3D24" stroke-width="1.8" stroke-linejoin="round" />
        <polygon points="60,24 64,10 50,16" fill="#F97316" stroke="#5C3D24" stroke-width="1.8" stroke-linejoin="round" />
        <!-- Đầu tròn to chibi nét viền đồng bộ 2.2 -->
        <circle cx="40" cy="32" r="22" fill="#FFFDF8" stroke="#5C3D24" stroke-width="2.2" />
        <!-- Đốm hoa tam thể calico trên trán -->
        <path d="M 44,11 Q 54,14 52,22 Q 44,20 44,11 Z" fill="#F97316" />
        <path d="M 28,12 Q 34,14 32,20 Q 26,18 28,12 Z" fill="#64748B" />
        <!-- Mắt to long lanh 2 đốm sáng -->
        <circle cx="30" cy="30" r="4.2" fill="#1E293B" />
        <circle cx="31.5" cy="28.5" r="1.8" fill="#FFFFFF" />
        <circle cx="29" cy="31.2" r="0.8" fill="#FFFFFF" />
        <circle cx="50" cy="30" r="4.2" fill="#1E293B" />
        <circle cx="51.5" cy="28.5" r="1.8" fill="#FFFFFF" />
        <circle cx="49" cy="31.2" r="0.8" fill="#FFFFFF" />
        <!-- Mũi hồng, miệng mèo cười w & râu nhỏ thanh thoát -->
        <circle cx="40" cy="35" r="1.4" fill="#FF8FB1" />
        <path d="M 36,37 Q 40,40 44,37" stroke="#5C3D24" stroke-width="1.4" stroke-linecap="round" fill="none" />
        <line x1="22" y1="35" x2="16" y2="34" stroke="#5C3D24" stroke-width="1.2" stroke-linecap="round" />
        <line x1="22" y1="38" x2="15" y2="39" stroke="#5C3D24" stroke-width="1.2" stroke-linecap="round" />
        <line x1="58" y1="35" x2="64" y2="34" stroke="#5C3D24" stroke-width="1.2" stroke-linecap="round" />
        <line x1="58" y1="38" x2="65" y2="39" stroke="#5C3D24" stroke-width="1.2" stroke-linecap="round" />
        <!-- Má hồng đào -->
        <ellipse cx="23" cy="36" rx="3.5" ry="2" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="57" cy="36" rx="3.5" ry="2" fill="#FF8FB1" opacity="0.85" />
        <!-- Tay phải giơ cao vẫy đón tài lộc mềm mại -->
        <g class="pet-cat-paw-wave">
          <path d="M 54,44 Q 63,36 60,24 Q 54,24 52,32" fill="#FFFDF8" stroke="#5C3D24" stroke-width="1.8" stroke-linejoin="round" />
          <circle cx="58" cy="25" r="3" fill="#FF8FB1" />
        </g>
        <!-- Tay trái đặt trên bụng -->
        <ellipse cx="30" cy="51" rx="4.5" ry="3.5" fill="#FFFDF8" stroke="#5C3D24" stroke-width="1.8" />
      </g>
    `;
  } else if (petType === 'kitsune') {
    inner = `
      <!-- Cáo cam đuôi xù đầu trắng (Thiết kế gốc) -->
      <g class="pet-chibi-group pet-anim-kitsune">
        <!-- Đuôi xù lớn màu cam đầu đuôi trắng tuyết -->
        <g class="pet-kitsune-tail">
          <path d="M 48,58 C 72,62 82,44 76,28 C 68,36 58,46 48,52 Z" fill="#FB923C" stroke="#7C2D12" stroke-width="1.8" stroke-linejoin="round" />
          <!-- Đuôi trắng nhọn -->
          <path d="M 76,28 C 74,34 70,38 66,40 C 70,34 74,30 76,28 Z" fill="#FFFDF8" />
          <ellipse cx="73" cy="31" rx="4" ry="2.5" fill="#FFFDF8" />
        </g>
        <!-- Thân cáo màu cam ấm áp -->
        <ellipse cx="40" cy="56" rx="20" ry="16" fill="#FB923C" stroke="#7C2D12" stroke-width="2.2" />
        <!-- Yếm ngực lông trắng hình tam giác -->
        <path d="M 32,46 Q 40,58 48,46 Q 40,50 32,46 Z" fill="#FFFDF8" />
        <!-- Chân ngồi -->
        <ellipse cx="25" cy="64" rx="7" ry="4.5" fill="#FB923C" stroke="#7C2D12" stroke-width="1.8" />
        <ellipse cx="55" cy="64" rx="7" ry="4.5" fill="#FB923C" stroke="#7C2D12" stroke-width="1.8" />
        <!-- Tai cáo vểnh cao có viền sẫm -->
        <polygon points="18,24 12,8 28,16" fill="#FF8FB1" stroke="#7C2D12" stroke-width="1.8" stroke-linejoin="round" />
        <polygon points="12,8 15,14 18,10" fill="#7C2D12" />
        <polygon points="62,24 68,8 52,16" fill="#FF8FB1" stroke="#7C2D12" stroke-width="1.8" stroke-linejoin="round" />
        <polygon points="68,8 65,14 62,10" fill="#7C2D12" />
        <!-- Đầu tròn to chibi đồng bộ viền 2.2 -->
        <circle cx="40" cy="32" r="22" fill="#FB923C" stroke="#7C2D12" stroke-width="2.2" />
        <!-- Mặt trắng 2 bên má của cáo tuyết -->
        <polygon points="22,34 40,43 58,34 40,39" fill="#FFFDF8" />
        <!-- Mắt hồ ly long lanh hổ phách 2 đốm sáng -->
        <circle cx="29" cy="30" r="4.5" fill="#78350F" />
        <circle cx="30.5" cy="28.5" r="2" fill="#FFFFFF" />
        <circle cx="28" cy="31.2" r="0.9" fill="#FFFFFF" />
        <circle cx="51" cy="30" r="4.5" fill="#78350F" />
        <circle cx="52.5" cy="28.5" r="2" fill="#FFFFFF" />
        <circle cx="50" cy="31.2" r="0.9" fill="#FFFFFF" />
        <!-- Mũi nhỏ đen bóng & má hồng -->
        <circle cx="40" cy="36" r="1.5" fill="#1E293B" />
        <ellipse cx="20" cy="36" rx="3.5" ry="2" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="60" cy="36" rx="3.5" ry="2" fill="#FF8FB1" opacity="0.85" />
        <!-- Tay trước chụm dễ thương -->
        <ellipse cx="34" cy="50" rx="4.5" ry="3.5" fill="#FB923C" stroke="#7C2D12" stroke-width="1.5" />
        <ellipse cx="46" cy="50" rx="4.5" ry="3.5" fill="#FB923C" stroke="#7C2D12" stroke-width="1.5" />
      </g>
    `;
  } else if (petType === 'lion') {
    inner = `
      <!-- Sư tử con bờm vàng như hoa (Thiết kế gốc) -->
      <g class="pet-chibi-group pet-anim-lion">
        <!-- Đuôi nhỏ có túm lông hoa xoè -->
        <path d="M 52,58 Q 66,60 68,50" stroke="#FBBF24" stroke-width="3.5" stroke-linecap="round" fill="none" />
        <circle cx="69" cy="48" r="4.5" fill="#F59E0B" stroke="#78350F" stroke-width="1.2" />
        <!-- Bờm hoa tròn xoe rực rỡ quanh đầu (8 cánh hoa vàng) -->
        <g class="pet-lion-mane">
          ${[0, 45, 90, 135, 180, 225, 270, 315].map(deg => `
            <circle cx="40" cy="32" r="24" fill="#F59E0B" stroke="#78350F" stroke-width="1.8" transform="rotate(${deg}, 40, 32) translate(0, -9)" />
            <circle cx="40" cy="32" r="21" fill="#FCD34D" transform="rotate(${deg}, 40, 32) translate(0, -8)" />
          `).join('')}
        </g>
        <!-- Thân béo tròn màu bơ mật ong đồng bộ viền 2.2 -->
        <ellipse cx="40" cy="56" rx="20" ry="16" fill="#FDE047" stroke="#78350F" stroke-width="2.2" />
        <ellipse cx="40" cy="57" rx="12" ry="10" fill="#FFFBEB" />
        <!-- Chân ngồi -->
        <ellipse cx="25" cy="64" rx="7.5" ry="4.5" fill="#FDE047" stroke="#78350F" stroke-width="1.8" />
        <ellipse cx="55" cy="64" rx="7.5" ry="4.5" fill="#FDE047" stroke="#78350F" stroke-width="1.8" />
        <!-- Mặt tròn nhỏ nhắn ở giữa bờm -->
        <circle cx="40" cy="32" r="18" fill="#FFFBEB" stroke="#78350F" stroke-width="2.2" />
        <!-- Vương miện tí hon trên trán -->
        <polygon points="36,16 40,11 44,16 42,17 38,17" fill="#F59E0B" stroke="#78350F" stroke-width="1.2" />
        <!-- Mắt to long lanh chocolate 2 đốm sáng -->
        <circle cx="32" cy="30" r="4.5" fill="#451A03" />
        <circle cx="33.5" cy="28.5" r="2" fill="#FFFFFF" />
        <circle cx="31" cy="31.2" r="0.9" fill="#FFFFFF" />
        <circle cx="48" cy="30" r="4.5" fill="#451A03" />
        <circle cx="49.5" cy="28.5" r="2" fill="#FFFFFF" />
        <circle cx="47" cy="31.2" r="0.9" fill="#FFFFFF" />
        <!-- Mũi hồng trái tim & má đào -->
        <polygon points="40,34 38,37 42,37" fill="#F43F5E" />
        <path d="M 37,39 Q 40,41 43,39" stroke="#78350F" stroke-width="1.4" stroke-linecap="round" fill="none" />
        <ellipse cx="24" cy="35" rx="3.5" ry="2" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="56" cy="35" rx="3.5" ry="2" fill="#FF8FB1" opacity="0.85" />
        <!-- Tay nhỏ -->
        <ellipse cx="34" cy="50" rx="4.5" ry="3.5" fill="#FDE047" stroke="#78350F" stroke-width="1.5" />
        <ellipse cx="46" cy="50" rx="4.5" ry="3.5" fill="#FDE047" stroke="#78350F" stroke-width="1.5" />
      </g>
    `;
  } else if (petType === 'owl') {
    inner = `
      <!-- Cú mèo tròn đeo kính nhỏ (Thiết kế gốc) -->
      <g class="pet-chibi-group pet-anim-owl">
        <!-- Thân hình quả trứng tròn xoe xám tím pastel đồng bộ viền 2.2 -->
        <ellipse cx="40" cy="46" rx="22" ry="24" fill="#94A3B8" stroke="#1E293B" stroke-width="2.2" />
        <!-- Bụng lông trắng hình vỏ sò -->
        <ellipse cx="40" cy="52" rx="14" ry="14" fill="#F8FAFC" />
        <path d="M 34,48 Q 40,52 46,48 M 32,54 Q 40,58 48,54" stroke="#CBD5E1" stroke-width="1.5" fill="none" />
        <!-- 2 cánh nhỏ ôm sát thân -->
        <ellipse cx="19" cy="46" rx="5" ry="12" fill="#64748B" stroke="#1E293B" stroke-width="1.8" />
        <ellipse cx="61" cy="46" rx="5" ry="12" fill="#64748B" stroke="#1E293B" stroke-width="1.8" />
        <!-- Móng vuốt vàng bám cành -->
        <circle cx="34" cy="68" r="3.5" fill="#FBBF24" stroke="#78350F" stroke-width="1.2" />
        <circle cx="46" cy="68" r="3.5" fill="#FBBF24" stroke="#78350F" stroke-width="1.2" />
        <!-- Lông mày sừng nhô 2 bên -->
        <polygon points="20,24 16,14 28,18" fill="#64748B" stroke="#1E293B" stroke-width="1.8" stroke-linejoin="round" />
        <polygon points="60,24 64,14 52,18" fill="#64748B" stroke="#1E293B" stroke-width="1.8" stroke-linejoin="round" />
        <!-- Vòng lông mắt tròn màu trắng -->
        <circle cx="30" cy="32" r="10" fill="#FFFFFF" stroke="#1E293B" stroke-width="1.6" />
        <circle cx="50" cy="32" r="10" fill="#FFFFFF" stroke="#1E293B" stroke-width="1.6" />
        <!-- Kính tròn trí thức gọng vàng nối cầu kính -->
        <circle cx="30" cy="32" r="10.5" fill="none" stroke="#F59E0B" stroke-width="2.0" />
        <circle cx="50" cy="32" r="10.5" fill="none" stroke="#F59E0B" stroke-width="2.0" />
        <line x1="40" y1="32" x2="41" y2="32" stroke="#F59E0B" stroke-width="2.2" />
        <!-- Mắt vàng to long lanh 2 đốm sáng -->
        <circle cx="30" cy="32" r="6" fill="#FDE047" />
        <circle cx="30" cy="32" r="4" fill="#0F172A" />
        <circle cx="31.5" cy="30.5" r="1.8" fill="#FFFFFF" />
        <circle cx="29" cy="33.2" r="0.8" fill="#FFFFFF" />
        <circle cx="50" cy="32" r="6" fill="#FDE047" />
        <circle cx="50" cy="32" r="4" fill="#0F172A" />
        <circle cx="51.5" cy="30.5" r="1.8" fill="#FFFFFF" />
        <circle cx="49" cy="33.2" r="0.8" fill="#FFFFFF" />
        <!-- Mỏ cam nhỏ & má hồng -->
        <polygon points="40,35 37,41 43,41" fill="#EA580C" stroke="#78350F" stroke-width="1.2" />
        <ellipse cx="18" cy="38" rx="3" ry="1.8" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="62" cy="38" rx="3" ry="1.8" fill="#FF8FB1" opacity="0.85" />
      </g>
    `;
  } else if (petType === 'misha') {
    inner = `
      <!-- Gấu nâu nhỏ đội mũ lông tuyết (Thiết kế gốc không bản quyền) -->
      <g class="pet-chibi-group pet-anim-bear">
        <!-- Đuôi nhỏ phía sau -->
        <circle cx="58" cy="58" r="4" fill="#78350F" stroke="#451A03" stroke-width="1.8" />
        <!-- Thân béo tròn màu caramel sẫm đồng bộ viền 2.2 -->
        <ellipse cx="40" cy="56" rx="23" ry="17" fill="#B45309" stroke="#451A03" stroke-width="2.2" />
        <!-- Bụng vàng bơ ấm -->
        <ellipse cx="40" cy="57" rx="13" ry="11" fill="#FDE68A" />
        <!-- Chân ngồi -->
        <ellipse cx="23" cy="64" rx="8" ry="5.5" fill="#B45309" stroke="#451A03" stroke-width="1.8" />
        <circle cx="23" cy="64" r="2.8" fill="#FDE68A" />
        <ellipse cx="57" cy="64" rx="8" ry="5.5" fill="#B45309" stroke="#451A03" stroke-width="1.8" />
        <circle cx="57" cy="64" r="2.8" fill="#FDE68A" />
        <!-- Đầu gấu tròn to -->
        <circle cx="40" cy="34" r="22" fill="#D97706" stroke="#451A03" stroke-width="2.2" />
        <!-- MŨ LÔNG MÙA ĐÔNG DỄ THƯƠNG (Xanh mùa đông & lông tuyết trắng) -->
        <g class="pet-bear-ushanka">
          <!-- Vòm mũ xanh sẫm -->
          <path d="M 22,26 C 22,12 30,8 40,8 C 50,8 58,12 58,26 Z" fill="#0284C7" stroke="#451A03" stroke-width="1.8" />
          <!-- Viền lông cừu trắng muốt phía trước trán -->
          <rect x="22" y="18" width="36" height="10" rx="5" fill="#F8FAFC" stroke="#451A03" stroke-width="1.6" />
          <!-- 2 vành tai mũ rủ xuống má -->
          <rect x="18" y="24" width="8" height="16" rx="4" fill="#0284C7" stroke="#451A03" stroke-width="1.6" />
          <rect x="19" y="32" width="6" height="7" rx="3" fill="#F8FAFC" />
          <rect x="54" y="24" width="8" height="16" rx="4" fill="#0284C7" stroke="#451A03" stroke-width="1.6" />
          <rect x="55" y="32" width="6" height="7" rx="3" fill="#F8FAFC" />
          <!-- Quả bông tròn xinh trên đỉnh mũ -->
          <circle cx="40" cy="7" r="4.5" fill="#F8FAFC" stroke="#451A03" stroke-width="1.4" />
        </g>
        <!-- Mõm tròn màu kem -->
        <ellipse cx="40" cy="39" rx="10" ry="7" fill="#FDE68A" stroke="#451A03" stroke-width="1.4" />
        <polygon points="40,36 37,39 43,39" fill="#1E293B" />
        <path d="M 37,42 Q 40,44.5 43,42" stroke="#451A03" stroke-width="1.4" stroke-linecap="round" fill="none" />
        <!-- Mắt to long lanh nâu hạt dẻ 2 đốm sáng -->
        <circle cx="31" cy="31" r="4.2" fill="#291609" />
        <circle cx="32.5" cy="29.5" r="1.8" fill="#FFFFFF" />
        <circle cx="30" cy="32.2" r="0.8" fill="#FFFFFF" />
        <circle cx="49" cy="31" r="4.2" fill="#291609" />
        <circle cx="50.5" cy="29.5" r="1.8" fill="#FFFFFF" />
        <circle cx="48" cy="32.2" r="0.8" fill="#FFFFFF" />
        <!-- Má hồng -->
        <ellipse cx="23" cy="38" rx="3.5" ry="2" fill="#FF8FB1" opacity="0.85" />
        <ellipse cx="57" cy="38" rx="3.5" ry="2" fill="#FF8FB1" opacity="0.85" />
        <!-- Tay ôm bụng -->
        <ellipse cx="32" cy="51" rx="5" ry="4" fill="#B45309" stroke="#451A03" stroke-width="1.5" />
        <ellipse cx="48" cy="51" rx="5" ry="4" fill="#B45309" stroke="#451A03" stroke-width="1.5" />
      </g>
    `;
  } else if (petType === 'firebird') {
    inner = `
      <!-- Chim lửa cánh cam đỏ đuôi lông vũ phát sáng (Thiết kế gốc) -->
      <g class="pet-chibi-group pet-anim-firebird">
        <!-- Đuôi lửa 3 dải lông vũ uốn lượn rực rỡ có hạt ngọc phát sáng -->
        <g class="pet-firebird-tail">
          <path d="M 32,58 Q 16,66 12,50 Q 22,50 32,54" fill="#F97316" stroke="#991B1B" stroke-width="1.8" />
          <circle cx="12" cy="50" r="4.5" fill="#FDE047" stroke="#D97706" stroke-width="1.2" />
          <path d="M 30,60 Q 8,76 6,58 Q 18,58 30,56" fill="#EF4444" stroke="#991B1B" stroke-width="1.8" />
          <circle cx="6" cy="58" r="5" fill="#FEF08A" stroke="#D97706" stroke-width="1.2" />
          <path d="M 34,62 Q 22,78 18,68 Q 26,62 34,58" fill="#F59E0B" stroke="#991B1B" stroke-width="1.8" />
          <circle cx="18" cy="68" r="4" fill="#FDE047" stroke="#D97706" stroke-width="1.2" />
        </g>
        <!-- Thân chim tròn xoe đỏ cam san hô đồng bộ viền 2.2 -->
        <ellipse cx="42" cy="48" rx="19" ry="18" fill="#EF4444" stroke="#991B1B" stroke-width="2.2" />
        <!-- Yếm ngực lông vàng ánh kim -->
        <ellipse cx="46" cy="52" rx="11" ry="12" fill="#FDE047" />
        <!-- Chân nhỏ vàng -->
        <circle cx="38" cy="65" r="3" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
        <circle cx="48" cy="65" r="3" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
        <!-- Cánh lửa nhiều lớp xếp tầng -->
        <path d="M 36,44 Q 24,42 22,54 Q 32,54 36,48" fill="#F97316" stroke="#991B1B" stroke-width="1.6" />
        <path d="M 34,48 Q 26,48 24,56 Q 32,56 34,50" fill="#FDE047" />
        <!-- Mào lửa vương miện trên đỉnh đầu -->
        <path d="M 46,18 Q 50,8 56,12 Q 52,18 48,22" fill="#FDE047" stroke="#D97706" stroke-width="1.4" />
        <circle cx="56" cy="12" r="3" fill="#FEF08A" />
        <path d="M 42,20 Q 42,10 46,14" stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round" fill="none" />
        <!-- Đầu tròn to chibi đồng bộ viền 2.2 -->
        <circle cx="44" cy="30" r="18" fill="#F97316" stroke="#991B1B" stroke-width="2.2" />
        <!-- Mắt to long lanh ruby đỏ ánh kim 2 đốm sáng -->
        <circle cx="48" cy="28" r="4.5" fill="#7F1D1D" />
        <circle cx="49.5" cy="26.5" r="2" fill="#FFFFFF" />
        <circle cx="47" cy="29.2" r="0.9" fill="#FFFFFF" />
        <!-- Mỏ vàng sắc sảo & má hồng đào -->
        <polygon points="58,29 67,27 60,34" fill="#FDE047" stroke="#B45309" stroke-width="1.2" />
        <ellipse cx="42" cy="34" rx="3.5" ry="2" fill="#FDA4AF" opacity="0.9" />
      </g>
    `;
  } else {
    // Default fallback
    inner = `
      <ellipse cx="40" cy="54" rx="20" ry="16" fill="#D8F3FF" stroke="#4A2B11" stroke-width="2.2" />
      <circle cx="40" cy="32" r="18" fill="#38BDF8" stroke="#4A2B11" stroke-width="2.2" />
      <circle cx="34" cy="30" r="4" fill="#0F172A" />
      <circle cx="35" cy="29" r="1.5" fill="#FFFFFF" />
      <circle cx="46" cy="30" r="4" fill="#0F172A" />
      <circle cx="47" cy="29" r="1.5" fill="#FFFFFF" />
    `;
  }
  return inner;
}

function renderPetSVG(petType = 'panda', width = 64, height = 64) {
  return `
    <svg class="farm-pet-avatar pet-${petType}" viewBox="0 0 80 80" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${renderPetInner(petType)}
    </svg>
  `;
}

function renderPetEggSVG(petType = 'panda', width = 64, height = 64) {
  const eggStyles = {
    panda: { shell: '#FFFDF8', stroke: '#4A2B11', accent: '#16A34A', pattern: 'panda' },
    dragon: { shell: '#99F6E4', stroke: '#134E4A', accent: '#FDE047', pattern: 'dragon' },
    maneki_neko: { shell: '#FFFDF8', stroke: '#5C3D24', accent: '#EF4444', pattern: 'cat' },
    kitsune: { shell: '#FFEDD5', stroke: '#7C2D12', accent: '#F97316', pattern: 'fox' },
    lion: { shell: '#FEF08A', stroke: '#78350F', accent: '#F59E0B', pattern: 'lion' },
    owl: { shell: '#F1F5F9', stroke: '#1E293B', accent: '#F59E0B', pattern: 'owl' },
    misha: { shell: '#FDE68A', stroke: '#451A03', accent: '#0284C7', pattern: 'bear' },
    firebird: { shell: '#FED7AA', stroke: '#991B1B', accent: '#EF4444', pattern: 'firebird' }
  };

  const style = eggStyles[petType] || eggStyles.panda;

  let patternSVG = '';
  if (style.pattern === 'panda') {
    patternSVG = `
      <!-- Đốm tai đen trên đỉnh quả trứng -->
      <circle cx="28" cy="24" r="5" fill="#1E293B" />
      <circle cx="52" cy="24" r="5" fill="#1E293B" />
      <!-- Dải hoa văn lá tre xanh -->
      <path d="M 24,46 Q 34,42 40,46 Q 46,50 56,46" stroke="#22C55E" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <ellipse cx="32" cy="43" rx="5" ry="2.2" fill="#4ADE80" transform="rotate(-20, 32, 43)" />
      <ellipse cx="48" cy="47" rx="5" ry="2.2" fill="#86EFAC" transform="rotate(20, 48, 47)" />
    `;
  } else if (style.pattern === 'dragon') {
    patternSVG = `
      <!-- Vẩy rồng & mây cuộn vàng ngọc -->
      <path d="M 26,40 Q 40,32 54,40" stroke="#FBBF24" stroke-width="2.4" fill="none" stroke-linecap="round" />
      <path d="M 28,48 Q 40,40 52,48" stroke="#FBBF24" stroke-width="2" fill="none" stroke-linecap="round" />
      <circle cx="40" cy="30" r="4" fill="#FEF08A" stroke="#F59E0B" stroke-width="1.2" />
    `;
  } else if (style.pattern === 'cat') {
    patternSVG = `
      <!-- Ruy băng đỏ & chuông vàng may mắn -->
      <path d="M 20,44 Q 40,50 60,44" stroke="#EF4444" stroke-width="4" fill="none" />
      <circle cx="40" cy="47" r="5" fill="#FBBF24" stroke="#B45309" stroke-width="1.5" />
      <circle cx="40" cy="48" r="1.2" fill="#78350F" />
    `;
  } else if (style.pattern === 'fox') {
    patternSVG = `
      <!-- Ngọn lửa hồ ly uốn lượn -->
      <path d="M 40,24 C 48,34 52,44 46,54 C 40,46 36,44 40,24 Z" fill="#F97316" opacity="0.8" />
      <path d="M 40,34 C 44,40 46,46 42,50 C 38,46 36,44 40,34 Z" fill="#FFFDF8" />
    `;
  } else if (style.pattern === 'lion') {
    patternSVG = `
      <!-- Vòng hào quang cánh hoa hướng dương -->
      <circle cx="40" cy="44" r="12" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4,3" />
      <circle cx="40" cy="44" r="5" fill="#F59E0B" />
    `;
  } else if (style.pattern === 'owl') {
    patternSVG = `
      <!-- Họa tiết gọng kính & lông vũ -->
      <circle cx="34" cy="42" r="5" fill="none" stroke="#F59E0B" stroke-width="1.8" />
      <circle cx="46" cy="42" r="5" fill="none" stroke="#F59E0B" stroke-width="1.8" />
      <line x1="39" y1="42" x2="41" y2="42" stroke="#F59E0B" stroke-width="1.8" />
    `;
  } else if (style.pattern === 'bear') {
    patternSVG = `
      <!-- Bông tuyết & viền mũ lông mùa đông -->
      <path d="M 22,46 Q 40,42 58,46" stroke="#0284C7" stroke-width="3" fill="none" stroke-linecap="round" />
      <path d="M 40,30 L 40,38 M 36,34 L 44,34" stroke="#0284C7" stroke-width="1.8" stroke-linecap="round" />
    `;
  } else {
    patternSVG = `
      <!-- Lông vũ lửa bốc lên -->
      <path d="M 36,54 Q 40,34 46,26 Q 42,38 44,54" stroke="#EF4444" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <circle cx="46" cy="26" r="3" fill="#FDE047" />
    `;
  }

  return `
    <svg class="farm-pet-egg-svg egg-${petType}" viewBox="0 0 80 80" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Bóng đổ dưới quả trứng -->
      <ellipse cx="40" cy="68" rx="20" ry="5.5" fill="#7A4B2A" opacity="0.2" />
      <!-- Vỏ trứng tròn trịa 3D -->
      <path d="M 40,14 C 24,14 18,34 18,48 C 18,62 28,68 40,68 C 52,68 62,62 62,48 C 62,34 56,14 40,14 Z"
            fill="${style.shell}" stroke="${style.stroke}" stroke-width="2.5" stroke-linejoin="round" />
      <!-- Hoa văn đặc trưng theo loài -->
      ${patternSVG}
      <!-- Vết nứt ấp nở hình ziczac nhỏ trên đỉnh -->
      <path d="M 36,22 L 39,26 L 37,29 L 42,32 L 40,36" stroke="${style.stroke}" stroke-width="1.6" fill="none" stroke-linecap="round" />
      <!-- Vệt highlight bóng sáng mặt kính -->
      <path d="M 25,28 C 23,36 24,48 26,56" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.75" />
      <circle cx="28" cy="24" r="2.2" fill="#FFFFFF" opacity="0.8" />
    </svg>
  `;
}



function renderFairySVG(themeId = 'chinese', level = 1, isSilhouette = false, size = 78) {
    const isUnhired = (isSilhouette || level === 0);

    const styles = {
      chinese: {
        hair: '#1E293B',
        bunColor: '#10B981',
        dress1: '#10B981',
        dress2: '#34D399',
        ribbon: '#059669',
        heldColor: '#6EE7B7'
      },
      japanese: {
        hair: '#F472B6',
        bunColor: '#FB7185',
        dress1: '#FB7185',
        dress2: '#FDA4AF',
        ribbon: '#E11D48',
        heldColor: '#F9A8D4'
      },
      english: {
        hair: '#D97706',
        bunColor: '#E11D48',
        dress1: '#38BDF8',
        dress2: '#7DD3FC',
        ribbon: '#0284C7',
        heldColor: '#E2B282'
      },
      russian: {
        hair: '#CBD5E1',
        bunColor: '#F59E0B',
        dress1: '#F59E0B',
        dress2: '#FBBF24',
        ribbon: '#D97706',
        heldColor: '#FDE68A'
      }
    };

    const s = styles[themeId] || styles.chinese;

    // Tiên chưa thuê: Màu pastel nhạt (opacity ~0.6), có hiệu ứng lấp lánh nhẹ thay vì xám chìm
    if (isUnhired) {
      return `
        <svg class="farm-fairy-svg is-silhouette is-unhired-pastel theme-${themeId}" viewBox="0 0 80 80" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fairyWingGradUnhired-${themeId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
              <stop offset="60%" stop-color="#E0F2FE" stop-opacity="0.65" />
              <stop offset="100%" stop-color="#BAE6FD" stop-opacity="0.45" />
            </linearGradient>
            <radialGradient id="fairyAuraUnhired-${themeId}" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.25" />
              <stop offset="100%" stop-color="#FEF08A" stop-opacity="0" />
            </radialGradient>
          </defs>

          <!-- Hiệu ứng lấp lánh nhẹ (Sparkles) quanh tiên chưa thuê -->
          <g class="fairy-sparkles">
            <path class="vt-sparkle sp-1" d="M 16,18 Q 16,22 12,22 Q 16,22 16,26 Q 16,22 20,22 Q 16,22 16,18 Z" fill="#FDE047" opacity="0.9" />
            <path class="vt-sparkle sp-2" d="M 64,16 Q 64,20 60,20 Q 64,20 64,24 Q 64,20 68,20 Q 64,20 64,16 Z" fill="#FFFFFF" opacity="0.95" />
            <circle class="vt-sparkle sp-3" cx="19" cy="44" r="1.5" fill="#FEF08A" opacity="0.85" />
            <circle class="vt-sparkle sp-4" cx="61" cy="46" r="1.5" fill="#FEF08A" opacity="0.85" />
          </g>

          <!-- Cô tiên màu pastel nhạt (opacity 0.6) -->
          <g opacity="0.62" transform="translate(0, -6)">
            <circle cx="40" cy="42" r="28" fill="url(#fairyAuraUnhired-${themeId})" />

            <!-- Cánh tiên mềm mại -->
            <g class="fairy-wings">
              <path d="M 34,40 C 12,20 8,36 14,48 C 20,56 30,46 34,42 Z" fill="url(#fairyWingGradUnhired-${themeId})" stroke="#7DD3FC" stroke-width="1.3" />
              <path d="M 32,44 C 18,48 16,60 24,64 C 28,66 32,54 34,46 Z" fill="url(#fairyWingGradUnhired-${themeId})" stroke="#7DD3FC" stroke-width="1.1" />
              <path d="M 46,40 C 68,20 72,36 66,48 C 60,56 50,46 46,42 Z" fill="url(#fairyWingGradUnhired-${themeId})" stroke="#7DD3FC" stroke-width="1.3" />
              <path d="M 48,44 C 62,48 64,60 56,64 C 52,66 48,54 46,46 Z" fill="url(#fairyWingGradUnhired-${themeId})" stroke="#7DD3FC" stroke-width="1.1" />
            </g>

            <!-- Váy cô tiên màu pastel theo tầng -->
            <g class="fairy-body">
              <path d="M 34,44 L 46,44 L 52,62 C 46,65 34,65 28,62 Z" fill="${s.dress1}" stroke="#7A4B2A" stroke-width="1.6" stroke-linejoin="round" />
              <path d="M 30,59 Q 40,63 50,59" fill="none" stroke="${s.dress2}" stroke-width="2.2" />
              <polygon points="40,44 36,49 44,49" fill="#FFFDF8" />
              <circle cx="40" cy="48" r="2" fill="${s.ribbon}" />
            </g>

            <!-- Chân nhỏ xinh -->
            <line x1="36" y1="62" x2="36" y2="69" stroke="#FDE2D2" stroke-width="2.8" stroke-linecap="round" />
            <circle cx="36" cy="69" r="2" fill="${s.dress1}" />
            <line x1="44" y1="62" x2="44" y2="69" stroke="#FDE2D2" stroke-width="2.8" stroke-linecap="round" />
            <circle cx="44" cy="69" r="2" fill="${s.dress1}" />

            <!-- Tóc sau -->
            <path d="M 28,32 C 24,42 26,50 32,54 L 48,54 C 54,50 56,42 52,32 Z" fill="${s.hair}" />

            <!-- Khuôn mặt Chibi Kawaii tròn trĩnh -->
            <ellipse cx="40" cy="32" rx="14" ry="13" fill="#FDE2D2" stroke="#7A4B2A" stroke-width="1.6" />

            <!-- Mắt tròn long lanh -->
            <ellipse cx="35" cy="32" rx="2.6" ry="3.5" fill="#4A2B11" />
            <ellipse cx="45" cy="32" rx="2.6" ry="3.5" fill="#4A2B11" />
            <circle cx="34" cy="30.5" r="1.2" fill="#FFFFFF" />
            <circle cx="44" cy="30.5" r="1.2" fill="#FFFFFF" />

            <!-- Má hồng pastel -->
            <ellipse cx="30" cy="35.5" rx="2.5" ry="1.5" fill="#FF8FB1" opacity="0.85" />
            <ellipse cx="50" cy="35.5" rx="2.5" ry="1.5" fill="#FF8FB1" opacity="0.85" />

            <!-- Khuôn miệng cười mỉm nhỏ xinh -->
            <path d="M 38,36 Q 40,38 42,36" fill="none" stroke="#7A4B2A" stroke-width="1.3" stroke-linecap="round" />

            <!-- Mái tóc & kiểu tóc đặc trưng -->
            <path d="M 26,29 C 30,22 40,21 54,29 C 48,24 38,24 26,29 Z" fill="${s.hair}" />
            <path d="M 27,28 C 33,32 37,32 40,29 C 43,32 47,32 53,28 C 50,22 30,22 27,28 Z" fill="${s.hair}" stroke="#7A4B2A" stroke-width="1.3" />

            <!-- Búi tóc hai bên -->
            <circle cx="28" cy="22" r="5" fill="${s.hair}" stroke="#7A4B2A" stroke-width="1.4" />
            <circle cx="52" cy="22" r="5" fill="${s.hair}" stroke="#7A4B2A" stroke-width="1.4" />
            <circle cx="28" cy="22" r="2.5" fill="${s.bunColor}" />
            <circle cx="52" cy="22" r="2.5" fill="${s.bunColor}" />

            <!-- Tay nhỏ xinh -->
            <path d="M 33,46 C 30,50 33,54 36,52" fill="none" stroke="#FDE2D2" stroke-width="2.4" stroke-linecap="round" />
            <path d="M 47,46 C 50,50 51,52 54,50" fill="none" stroke="#FDE2D2" stroke-width="2.4" stroke-linecap="round" />
          </g>
        </svg>
      `;
    }

    let heldItemSVG = '';
    if (level >= 2) {
      heldItemSVG = `
        <g transform="translate(50, 48)">
          <path d="M 0,0 L 14,0 L 12,10 L 2,10 Z" fill="#D49A6A" stroke="#7A4B2A" stroke-width="1.5" />
          <path d="M 2,0 C 2,-5 12,-5 12,0" fill="none" stroke="#7A4B2A" stroke-width="1.5" />
          <circle cx="5" cy="0" r="3" fill="#EF4444" />
          <circle cx="9" cy="-1" r="3" fill="#F59E0B" />
        </g>
      `;
    } else {
      heldItemSVG = `
        <g transform="translate(50, 48)">
          <rect x="0" y="2" width="10" height="9" rx="2" fill="${s.heldColor}" stroke="#7A4B2A" stroke-width="1.5" />
          <path d="M 10,4 L 15,2" stroke="#7A4B2A" stroke-width="1.5" stroke-linecap="round" />
          <path d="M 2,2 C 2,-3 8,-3 8,2" fill="none" stroke="#7A4B2A" stroke-width="1.5" />
          <circle cx="15" cy="2" r="1.5" fill="#38BDF8" />
        </g>
      `;
    }

    return `
      <svg class="farm-fairy-svg is-active theme-${themeId}" viewBox="0 0 80 80" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fairyWingGrad-${themeId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
            <stop offset="60%" stop-color="#E0F2FE" stop-opacity="0.75" />
            <stop offset="100%" stop-color="#BAE6FD" stop-opacity="0.55" />
          </linearGradient>
          <radialGradient id="fairyAura-${themeId}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#FEF08A" stop-opacity="0" />
          </radialGradient>
        </defs>

        <circle cx="40" cy="36" r="32" fill="url(#fairyAura-${themeId})" />

        <g transform="translate(0, -6)">
          <!-- Cánh tiên trong suốt lấp lánh -->
          <g class="fairy-wings">
            <path d="M 34,40 C 12,20 8,36 14,48 C 20,56 30,46 34,42 Z" fill="url(#fairyWingGrad-${themeId})" stroke="#7DD3FC" stroke-width="1.4" />
            <path d="M 32,44 C 18,48 16,60 24,64 C 28,66 32,54 34,46 Z" fill="url(#fairyWingGrad-${themeId})" stroke="#7DD3FC" stroke-width="1.2" />
            <path d="M 46,40 C 68,20 72,36 66,48 C 60,56 50,46 46,42 Z" fill="url(#fairyWingGrad-${themeId})" stroke="#7DD3FC" stroke-width="1.4" />
            <path d="M 48,44 C 62,48 64,60 56,64 C 52,66 48,54 46,46 Z" fill="url(#fairyWingGrad-${themeId})" stroke="#7DD3FC" stroke-width="1.2" />
            <circle cx="22" cy="34" r="1.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="58" cy="34" r="1.5" fill="#FFFFFF" opacity="0.9" />
          </g>

          <!-- Thân váy cô tiên -->
          <g class="fairy-body">
            <path d="M 34,44 L 46,44 L 52,62 C 46,65 34,65 28,62 Z" fill="${s.dress1}" stroke="#7A4B2A" stroke-width="1.8" stroke-linejoin="round" />
            <path d="M 30,59 Q 40,63 50,59" fill="none" stroke="${s.dress2}" stroke-width="2.5" />
            <polygon points="40,44 36,49 44,49" fill="#FFFDF8" />
            <circle cx="40" cy="48" r="2" fill="${s.ribbon}" />
          </g>

          <!-- Chân nhỏ xinh -->
          <line x1="36" y1="62" x2="36" y2="69" stroke="#FDE2D2" stroke-width="3" stroke-linecap="round" />
          <circle cx="36" cy="69" r="2" fill="${s.dress1}" />
          <line x1="44" y1="62" x2="44" y2="69" stroke="#FDE2D2" stroke-width="3" stroke-linecap="round" />
          <circle cx="44" cy="69" r="2" fill="${s.dress1}" />

          <!-- Tóc sau -->
          <path d="M 28,32 C 24,42 26,50 32,54 L 48,54 C 54,50 56,42 52,32 Z" fill="${s.hair}" />

          <!-- Khuôn mặt Chibi Kawaii tròn trĩnh -->
          <ellipse cx="40" cy="32" rx="14" ry="13" fill="#FDE2D2" stroke="#7A4B2A" stroke-width="1.8" />

          <!-- Đôi mắt to tròn long lanh Chibi -->
          <ellipse cx="35" cy="32" rx="2.8" ry="3.8" fill="#4A2B11" />
          <ellipse cx="45" cy="32" rx="2.8" ry="3.8" fill="#4A2B11" />
          <circle cx="34" cy="30.5" r="1.3" fill="#FFFFFF" />
          <circle cx="36" cy="33.5" r="0.6" fill="#FFFFFF" />
          <circle cx="44" cy="30.5" r="1.3" fill="#FFFFFF" />
          <circle cx="46" cy="33.5" r="0.6" fill="#FFFFFF" />

          <!-- Má hồng e ấp -->
          <ellipse cx="30" cy="35.5" rx="2.6" ry="1.6" fill="#FF8FB1" opacity="0.85" />
          <ellipse cx="50" cy="35.5" rx="2.6" ry="1.6" fill="#FF8FB1" opacity="0.85" />

          <!-- Khuôn miệng cười mỉm nhỏ xinh -->
          <path d="M 38,36 Q 40,38 42,36" fill="none" stroke="#7A4B2A" stroke-width="1.4" stroke-linecap="round" />

          <!-- Mái tóc & kiểu tóc đặc trưng -->
          <path d="M 26,29 C 30,22 40,21 54,29 C 48,24 38,24 26,29 Z" fill="${s.hair}" />
          <path d="M 27,28 C 33,32 37,32 40,29 C 43,32 47,32 53,28 C 50,22 30,22 27,28 Z" fill="${s.hair}" stroke="#7A4B2A" stroke-width="1.4" />

          <!-- Búi tóc hai bên hoặc hoa cài tóc -->
          <circle cx="28" cy="22" r="5" fill="${s.hair}" stroke="#7A4B2A" stroke-width="1.5" />
          <circle cx="52" cy="22" r="5" fill="${s.hair}" stroke="#7A4B2A" stroke-width="1.5" />
          <circle cx="28" cy="22" r="2.5" fill="${s.bunColor}" />
          <circle cx="52" cy="22" r="2.5" fill="${s.bunColor}" />

          <!-- Tay nhỏ & đồ vật cầm -->
          <path d="M 33,46 C 30,50 33,54 36,52" fill="none" stroke="#FDE2D2" stroke-width="2.5" stroke-linecap="round" />
          <path d="M 47,46 C 50,50 51,52 54,50" fill="none" stroke="#FDE2D2" stroke-width="2.5" stroke-linecap="round" />
          ${heldItemSVG}
        </g>
      </svg>
    `;
  }


  


  


  


  



  /* ==========================================================================
     6d. Biểu tượng Chủ Đề Tầng & Chân dung Khách Chibi (SVG thuần)
     ========================================================================== */

  /**
   * Vẽ biểu tượng nhỏ cho 4 phong cách chủ đề tầng vườn:
   * chinese (cành tre), japanese (hoa anh đào), english (hoa hồng), russian (lá/nhánh bạch dương)
   */
  function renderThemeIconSVG(themeId = 'chinese', size = 24) {
    const tid = String(themeId || '').toLowerCase().trim();
    let inner = '';

    if (tid === 'chinese') {
      inner = `
        <path d="M7 21 C8 15 10 9 14 3" stroke="#2E7D32" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="8.3" cy="16.5" r="1.3" fill="#1B5E20"/>
        <circle cx="10.4" cy="11.2" r="1.3" fill="#1B5E20"/>
        <path d="M10 11 C7 9 4 10 3 13 C6 13 9 12 10 11 Z" fill="#4ADE80" stroke="#166534" stroke-width="0.8"/>
        <path d="M10 11 C8 7 9 4 12 3 C12 6 11 9 10 11 Z" fill="#86EFAC" stroke="#166534" stroke-width="0.8"/>
        <path d="M14 3 C16 4 19 6 20 9 C17 9 15 6 14 3 Z" fill="#4ADE80" stroke="#166534" stroke-width="0.8"/>
        <path d="M12 7 C15 7 18 9 19 12 C16 12 13 10 12 7 Z" fill="#86EFAC" stroke="#166534" stroke-width="0.8"/>
        <path d="M8.5 16.5 Q6 18 5 21" stroke="#B3261E" stroke-width="1.2" stroke-linecap="round"/>
        <rect x="5.5" y="17" width="3.2" height="4.5" rx="0.8" fill="#B3261E" transform="rotate(-15 7 19)"/>
      `;
    } else if (tid === 'japanese') {
      inner = `
        <g transform="translate(12, 12)">
          <path d="M-3,-2 C-4.5,-6 -3,-10 0,-11 C3,-10 4.5,-6 3,-2 Z" fill="#FCE7F3" stroke="#E05D82" stroke-width="0.9"/>
          <path d="M-3,-2 C-4.5,-6 -3,-10 0,-11 C3,-10 4.5,-6 3,-2 Z" fill="#FBCFE8" stroke="#E05D82" stroke-width="0.9" transform="rotate(72)"/>
          <path d="M-3,-2 C-4.5,-6 -3,-10 0,-11 C3,-10 4.5,-6 3,-2 Z" fill="#FCE7F3" stroke="#E05D82" stroke-width="0.9" transform="rotate(144)"/>
          <path d="M-3,-2 C-4.5,-6 -3,-10 0,-11 C3,-10 4.5,-6 3,-2 Z" fill="#FBCFE8" stroke="#E05D82" stroke-width="0.9" transform="rotate(216)"/>
          <path d="M-3,-2 C-4.5,-6 -3,-10 0,-11 C3,-10 4.5,-6 3,-2 Z" fill="#FCE7F3" stroke="#E05D82" stroke-width="0.9" transform="rotate(288)"/>
          <circle cx="0" cy="0" r="2.8" fill="#F472B6"/>
          <circle cx="0" cy="0" r="1.5" fill="#E05D82"/>
          <circle cx="0" cy="-3.8" r="0.7" fill="#FDE047"/>
          <circle cx="3.6" cy="-1.2" r="0.7" fill="#FDE047"/>
          <circle cx="2.2" cy="3.1" r="0.7" fill="#FDE047"/>
          <circle cx="-2.2" cy="3.1" r="0.7" fill="#FDE047"/>
          <circle cx="-3.6" cy="-1.2" r="0.7" fill="#FDE047"/>
        </g>
      `;
    } else if (tid === 'english') {
      inner = `
        <path d="M6 16 C3 14 3 10 7 11 C10 11 9 15 6 16 Z" fill="#86EFAC" stroke="#15803D" stroke-width="0.9"/>
        <path d="M18 16 C21 14 21 10 17 11 C14 11 15 15 18 16 Z" fill="#86EFAC" stroke="#15803D" stroke-width="0.9"/>
        <path d="M12 16 L12 21" stroke="#15803D" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M12 19 L9 21 M12 19 L15 21" stroke="#2563EB" stroke-width="1.4" stroke-linecap="round"/>
        <circle cx="12" cy="19" r="1.2" fill="#2563EB"/>
        <circle cx="12" cy="11" r="7.5" fill="#FDA4AF" stroke="#BE123C" stroke-width="1"/>
        <path d="M7.5 9 C8.5 6 15.5 6 16.5 9 C17.5 12 15 16 12 16 C9 16 6.5 12 7.5 9 Z" fill="#F43F5E" stroke="#9F1239" stroke-width="0.8"/>
        <path d="M9 10 C10 7.5 14 7.5 15 10 C15.5 12 13.5 14.5 12 14.5 C10.5 14.5 8.5 12 9 10 Z" fill="#FB7185"/>
        <ellipse cx="12" cy="10.5" rx="2" ry="1.4" fill="#FFE4E6" stroke="#BE123C" stroke-width="0.7"/>
      `;
    } else if (tid === 'russian') {
      inner = `
        <path d="M6 21 C8 17 10 13 12 9" stroke="#78350F" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M12 4 C8 7 6 12 9 16 C11 18 13 18 15 16 C18 12 16 7 12 4 Z" fill="#FBBF24" stroke="#D97706" stroke-width="1"/>
        <path d="M12 5.5 L12 16" stroke="#B45309" stroke-width="0.9" stroke-linecap="round"/>
        <path d="M12 9 L9.5 7.5 M12 9 L14.5 7.5" stroke="#B45309" stroke-width="0.7" stroke-linecap="round"/>
        <path d="M12 12 L9 10.5 M12 12 L15 10.5" stroke="#B45309" stroke-width="0.7" stroke-linecap="round"/>
        <path d="M12 14.5 L10 13.5 M12 14.5 L14 13.5" stroke="#B45309" stroke-width="0.7" stroke-linecap="round"/>
        <path d="M6 15 C4 13 5 10 7 10 C9 10 9 13 7 15 Z" fill="#FDE68A" stroke="#D97706" stroke-width="0.8"/>
      `;
    } else {
      inner = `
        <circle cx="12" cy="12" r="9" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.2"/>
        <path d="M12 7 C9 9 9 14 12 17 C15 14 15 9 12 7 Z" fill="#22C55E"/>
      `;
    }

    return `<svg class="farm-theme-icon theme-${tid}" viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  /**
   * Vẽ chân dung chibi tròn (đầu + vai) cho 5 khách khinh khí cầu + default:
   * tieu-mai, thay-ly, bac-vuong, co-lan, su-phu-chu, default
   */
  function renderNpcAvatarSVG(npcId = 'default', size = 40) {
    let nid = String(npcId || '').toLowerCase().trim();

    const nameMap = {
      'tiểu mai': 'tieu-mai',
      'thầy lý': 'thay-ly',
      'bác vương': 'bac-vuong',
      'cô lan': 'co-lan',
      'sư phụ chu': 'su-phu-chu'
    };
    if (nameMap[nid]) nid = nameMap[nid];
    const validIds = ['tieu-mai', 'thay-ly', 'bac-vuong', 'co-lan', 'su-phu-chu'];
    if (!validIds.includes(nid)) {
      nid = 'default';
    }

    let inner = '';
    if (nid === 'tieu-mai') {
      inner = `
        <circle cx="20" cy="20" r="18.5" fill="#FFF1F2" stroke="#4A2B11" stroke-width="1.8"/>
        <path d="M10,38 C11,31 15,29 20,29 C25,29 29,31 30,38 Z" fill="#FB7185" stroke="#4A2B11" stroke-width="1.4"/>
        <path d="M17,29 L20,33 L23,29 Z" fill="#FFFFFF" stroke="#4A2B11" stroke-width="1"/>
        <circle cx="10" cy="14" r="5" fill="#1E293B" stroke="#4A2B11" stroke-width="1.3"/>
        <circle cx="30" cy="14" r="5" fill="#1E293B" stroke="#4A2B11" stroke-width="1.3"/>
        <circle cx="13" cy="16" r="2" fill="#EF4444"/>
        <circle cx="27" cy="16" r="2" fill="#EF4444"/>
        <ellipse cx="20" cy="21.5" rx="8.5" ry="7.5" fill="#FFF3E8" stroke="#4A2B11" stroke-width="1.3"/>
        <path d="M12,18 C15,16 25,16 28,18 C28,15 25,12 20,12 C15,12 12,15 12,18 Z" fill="#1E293B"/>
        <circle cx="16.5" cy="21" r="1.5" fill="#1E293B"/><circle cx="16" cy="20.5" r="0.6" fill="#FFFFFF"/>
        <circle cx="23.5" cy="21" r="1.5" fill="#1E293B"/><circle cx="23" cy="20.5" r="0.6" fill="#FFFFFF"/>
        <ellipse cx="14" cy="23.2" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.85"/>
        <ellipse cx="26" cy="23.2" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.85"/>
        <path d="M18.8,24 Q20,25.5 21.2,24" stroke="#4A2B11" stroke-width="1.1" stroke-linecap="round" fill="none"/>
      `;
    } else if (nid === 'thay-ly') {
      inner = `
        <circle cx="20" cy="20" r="18.5" fill="#E0F2FE" stroke="#4A2B11" stroke-width="1.8"/>
        <path d="M10,38 C11,31 15,29 20,29 C25,29 29,31 30,38 Z" fill="#0284C7" stroke="#4A2B11" stroke-width="1.4"/>
        <path d="M16,29 L20,34 L24,29 Z" fill="#FFFFFF" stroke="#4A2B11" stroke-width="1"/>
        <path d="M19.5,33 L20.5,33 L20,37 Z" fill="#DC2626"/>
        <ellipse cx="20" cy="21" rx="8.5" ry="7.5" fill="#FFF3E8" stroke="#4A2B11" stroke-width="1.3"/>
        <path d="M12,18 C13,13 17,11 20,11 C25,11 28,14 28,18 C26,16 22,15 19,16 C16,16 13,17 12,18 Z" fill="#334155"/>
        <circle cx="16.5" cy="20.5" r="2.8" fill="none" stroke="#78350F" stroke-width="1.2"/>
        <circle cx="23.5" cy="20.5" r="2.8" fill="none" stroke="#78350F" stroke-width="1.2"/>
        <path d="M19.3,20.5 L20.7,20.5" stroke="#78350F" stroke-width="1.2"/>
        <circle cx="16.5" cy="20.5" r="1.1" fill="#1E293B"/>
        <circle cx="23.5" cy="20.5" r="1.1" fill="#1E293B"/>
        <path d="M18.8,24.5 Q20,25.8 21.2,24.5" stroke="#4A2B11" stroke-width="1.1" stroke-linecap="round" fill="none"/>
      `;
    } else if (nid === 'bac-vuong') {
      inner = `
        <circle cx="20" cy="20" r="18.5" fill="#FEF3C7" stroke="#4A2B11" stroke-width="1.8"/>
        <path d="M10,38 C11,31 15,29 20,29 C25,29 29,31 30,38 Z" fill="#78350F" stroke="#4A2B11" stroke-width="1.4"/>
        <ellipse cx="20" cy="21" rx="8.5" ry="7.5" fill="#FFE8D6" stroke="#4A2B11" stroke-width="1.3"/>
        <path d="M12,16 C12,11 16,9 20,9 C24,9 28,11 28,16 Z" fill="#1E293B" stroke="#4A2B11" stroke-width="1.2"/>
        <ellipse cx="20" cy="16" rx="8" ry="2" fill="#334155"/>
        <circle cx="20" cy="14" r="1.4" fill="#34D399" stroke="#065F46" stroke-width="0.6"/>
        <path d="M15,19 Q16.5,17.5 18,19" stroke="#4A2B11" stroke-width="1.3" stroke-linecap="round" fill="none"/>
        <path d="M22,19 Q23.5,17.5 25,19" stroke="#4A2B11" stroke-width="1.3" stroke-linecap="round" fill="none"/>
        <path d="M14.5,17 Q16.5,16 18,17" stroke="#F1F5F9" stroke-width="1.4" stroke-linecap="round" fill="none"/>
        <path d="M22,17 Q23.5,16 25.5,17" stroke="#F1F5F9" stroke-width="1.4" stroke-linecap="round" fill="none"/>
        <ellipse cx="14" cy="21.5" rx="1.5" ry="0.9" fill="#FCA5A5" opacity="0.8"/>
        <ellipse cx="26" cy="21.5" rx="1.5" ry="0.9" fill="#FCA5A5" opacity="0.8"/>
        <path d="M16.5,22 C15,24 16,28 20,28 C24,28 25,24 23.5,22 C22,23 18,23 16.5,22 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="0.9"/>
      `;
    } else if (nid === 'co-lan') {
      inner = `
        <circle cx="20" cy="20" r="18.5" fill="#FDF2F8" stroke="#4A2B11" stroke-width="1.8"/>
        <path d="M11,18 C10,24 10,31 12,35 C13,35 14,29 14,24" fill="#1E293B"/>
        <path d="M29,18 C30,24 30,31 28,35 C27,35 26,29 26,24" fill="#1E293B"/>
        <path d="M11,38 C12,31 16,29 20,29 C24,29 28,31 29,38 Z" fill="#6EE7B7" stroke="#4A2B11" stroke-width="1.4"/>
        <path d="M18,29 L20,33 L22,29 Z" fill="#A7F3D0"/>
        <ellipse cx="20" cy="21.5" rx="8" ry="7.5" fill="#FFF3E8" stroke="#4A2B11" stroke-width="1.3"/>
        <path d="M12,18 C14,13 18,12 20,12 C24,12 27,14 28,18 C26,16 23,15 20,15 C16,15 13,16 12,18 Z" fill="#1E293B"/>
        <circle cx="26.5" cy="15.5" r="2.2" fill="#F43F5E"/>
        <circle cx="26.5" cy="15.5" r="0.8" fill="#FDE047"/>
        <circle cx="16.5" cy="21" r="1.3" fill="#1E293B"/><circle cx="16" cy="20.5" r="0.5" fill="#FFFFFF"/>
        <path d="M15,19.5 L17,19.8" stroke="#1E293B" stroke-width="0.8" stroke-linecap="round"/>
        <circle cx="23.5" cy="21" r="1.3" fill="#1E293B"/><circle cx="23" cy="20.5" r="0.5" fill="#FFFFFF"/>
        <path d="M23,19.8 L25,19.5" stroke="#1E293B" stroke-width="0.8" stroke-linecap="round"/>
        <ellipse cx="14" cy="23" rx="1.6" ry="1" fill="#FDA4AF" opacity="0.85"/>
        <ellipse cx="26" cy="23" rx="1.6" ry="1" fill="#FDA4AF" opacity="0.85"/>
        <path d="M19,24.5 Q20,25.6 21,24.5" stroke="#4A2B11" stroke-width="1.1" stroke-linecap="round" fill="none"/>
      `;
    } else if (nid === 'su-phu-chu') {
      inner = `
        <circle cx="20" cy="20" r="18.5" fill="#FFEDD5" stroke="#4A2B11" stroke-width="1.8"/>
        <path d="M10,38 C11,30 15,28 20,28 C25,28 29,30 30,38 Z" fill="#C2410C" stroke="#4A2B11" stroke-width="1.4"/>
        <path d="M16,28 L20,33 L24,28 Z" fill="#FDBA74"/>
        <ellipse cx="20" cy="20.5" rx="8.5" ry="7.5" fill="#FED7AA" stroke="#4A2B11" stroke-width="1.3"/>
        <path d="M12,16 C14,12 18,11 20,11 C24,11 27,13 28,16 Z" fill="#1E293B"/>
        <rect x="11.5" y="14" width="17" height="3.2" rx="1.2" fill="#DC2626" stroke="#4A2B11" stroke-width="0.9"/>
        <path d="M28,15 Q31,16 32,19 Q30,19 28,17 Z" fill="#DC2626"/>
        <path d="M14.5,17.5 L18,18.5" stroke="#1E293B" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M22,18.5 L25.5,17.5" stroke="#1E293B" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="16.5" cy="20.5" r="1.3" fill="#1E293B"/>
        <circle cx="23.5" cy="20.5" r="1.3" fill="#1E293B"/>
        <path d="M17,23 Q18.5,24 20,23 Q21.5,24 23,23" stroke="#1E293B" stroke-width="1.3" stroke-linecap="round" fill="none"/>
        <ellipse cx="20" cy="25.5" rx="1.3" ry="1.8" fill="#1E293B"/>
        <path d="M19,23.5 Q20,24.5 21,23.5" stroke="#4A2B11" stroke-width="1.1" stroke-linecap="round" fill="none"/>
      `;
    } else {
      inner = `
        <circle cx="20" cy="20" r="18.5" fill="#ECFDF5" stroke="#4A2B11" stroke-width="1.8"/>
        <path d="M10,38 C11,31 15,29 20,29 C25,29 29,31 30,38 Z" fill="#10B981" stroke="#4A2B11" stroke-width="1.4"/>
        <path d="M17,29 L20,33 L23,29 Z" fill="#FFFFFF" stroke="#4A2B11" stroke-width="1"/>
        <ellipse cx="20" cy="21" rx="8.5" ry="7.5" fill="#FFF3E8" stroke="#4A2B11" stroke-width="1.3"/>
        <path d="M12,18 C13,12 17,11 20,11 C25,11 28,13 28,18 C26,16 23,15 20,16 C16,16 13,17 12,18 Z" fill="#854D0E"/>
        <circle cx="16.5" cy="21" r="1.4" fill="#1E293B"/><circle cx="16" cy="20.5" r="0.5" fill="#FFFFFF"/>
        <circle cx="23.5" cy="21" r="1.4" fill="#1E293B"/><circle cx="23" cy="20.5" r="0.5" fill="#FFFFFF"/>
        <ellipse cx="14" cy="23" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.85"/>
        <ellipse cx="26" cy="23" rx="1.6" ry="1" fill="#FF8FB1" opacity="0.85"/>
        <path d="M18.5,24 Q20,25.8 21.5,24" stroke="#4A2B11" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      `;
    }

    return `<svg class="farm-npc-avatar npc-${nid}" viewBox="0 0 40 40" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  /* ==========================================================================
     7. Public API Export
     ========================================================================== */
  return {
    CROP_DEFS,
    POT_TIERS,
    THEMES,
    renderPotSVG,
    renderPlantSVG,
    renderTierDeckSVG,
    renderBalloonSVG,
    renderWorldTreeSVG,
    renderPetSVG,
    renderPetEggSVG,
    renderFairySVG,
    renderEmptySlotSVG,
    renderToolIconSVG,
    renderHUDIconSVG,
    renderThemeIconSVG,
    renderNpcAvatarSVG
  };
}));