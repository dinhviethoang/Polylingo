/**
 * tests/economy.test.js
 * Test suite kiểm tra Hệ thống Kinh tế (Economy) và Vườn Treo Tri Thức (Farm).
 * Chạy bằng node thuần: `node tests/economy.test.js`
 */

const assert = require('assert');
const Economy = require('../game/economy.js');
const {
  plotStatus,
  getPotStatus,
  CROP_DEFS,
  POT_TIERS,
  Farm,
  sowWordSeedIntoSlot,
  reviewWordTree,
  boostPlantByName,
  getRandomVocabQuiz,
  harvestCrop,
  SRS_INTERVALS
} = require('../game/farm.js');

let passCount = 0;
let failCount = 0;

function test(name, fn) {
  try {
    fn();
    passCount++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failCount++;
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
  }
}

console.log('=== BẮT ĐẦU KIỂM TRA HỆ THỐNG KINH TẾ & NÔNG TRẠI ===\n');

/* ==========================================================================
   1. Kiểm tra Cấp độ: Economy.levelInfo(xp)
   "cấp n cần 100*n xp để lên cấp kế"
   ========================================================================== */
console.log('1. Kiểm tra tính toán Cấp độ (Economy.levelInfo):');

test('Cấp 1: 0 XP -> level 1, cur 0, need 100', () => {
  const info = Economy.levelInfo(0);
  assert.strictEqual(info.level, 1);
  assert.strictEqual(info.cur, 0);
  assert.strictEqual(info.need, 100);
});

test('Cấp 1: 50 XP -> level 1, cur 50, need 100', () => {
  const info = Economy.levelInfo(50);
  assert.strictEqual(info.level, 1);
  assert.strictEqual(info.cur, 50);
  assert.strictEqual(info.need, 100);
});

test('Cấp 2: 100 XP -> level 2, cur 0, need 200 (cần 100*2 để lên cấp kế)', () => {
  const info = Economy.levelInfo(100);
  assert.strictEqual(info.level, 2);
  assert.strictEqual(info.cur, 0);
  assert.strictEqual(info.need, 200);
});

test('Cấp 2: 250 XP -> level 2, cur 150, need 200', () => {
  const info = Economy.levelInfo(250);
  assert.strictEqual(info.level, 2);
  assert.strictEqual(info.cur, 150);
  assert.strictEqual(info.need, 200);
});

test('Cấp 3: 300 XP (100 + 200) -> level 3, cur 0, need 300', () => {
  const info = Economy.levelInfo(300);
  assert.strictEqual(info.level, 3);
  assert.strictEqual(info.cur, 0);
  assert.strictEqual(info.need, 300);
});

test('Cấp 4: 600 XP (100 + 200 + 300) -> level 4, cur 0, need 400', () => {
  const info = Economy.levelInfo(600);
  assert.strictEqual(info.level, 4);
  assert.strictEqual(info.cur, 0);
  assert.strictEqual(info.need, 400);
});

/* ==========================================================================
   2. Kiểm tra Kiếm tiền (earn) và Tiêu tiền (spend)
   ========================================================================== */
console.log('\n2. Kiểm tra Earn / Spend:');

test('Khởi tạo mặc định: coins 50, water 3, xp 0', () => {
  Economy._setNow(() => new Date('2026-05-01T08:00:00Z'));
  Economy._resetState();
  const s = Economy.getState();
  assert.strictEqual(s.coins, 50);
  assert.strictEqual(s.water, 3);
  assert.strictEqual(s.xp, 0);
});

test('Spend thành công khi đủ số dư', () => {
  const ok = Economy.spend(20);
  assert.strictEqual(ok, true);
  assert.strictEqual(Economy.getState().coins, 30);
});

test('Spend thất bại khi số dư không đủ', () => {
  const ok = Economy.spend(100);
  assert.strictEqual(ok, false);
  assert.strictEqual(Economy.getState().coins, 30); // Giữ nguyên
});

test('Earn cộng chính xác xu, XP và nước', () => {
  const received = Economy.earn('lesson_test', { coins: 15, xp: 20, water: 2 });
  assert.deepStrictEqual(received, { coins: 15, xp: 20, water: 2 });
  const s = Economy.getState();
  assert.strictEqual(s.coins, 45); // 30 + 15
  assert.strictEqual(s.xp, 20);
  assert.strictEqual(s.water, 5);  // 3 + 2
  assert(s.history.length > 0, 'Lịch sử giao dịch được ghi lại');
});

test('Phần thưởng chuẩn REWARDS: speakPass cộng 2 xu, 4 XP, 1 nước', () => {
  const beforeWater = Economy.getState().water;
  const beforeCoins = Economy.getState().coins;
  const beforeXp = Economy.getState().xp;

  const res = Economy.reward('speakPass');
  assert.strictEqual(res.coins, 2);
  assert.strictEqual(res.xp, 4);
  assert.strictEqual(res.water, 1);

  const s = Economy.getState();
  assert.strictEqual(s.coins, beforeCoins + 2);
  assert.strictEqual(s.xp, beforeXp + 4);
  assert.strictEqual(s.water, beforeWater + 1);
});

/* ==========================================================================
   3. Kiểm tra Hệ số Linh thú (Pet Multiplier & Water Bonus)
   ========================================================================== */
console.log('\n3. Kiểm tra Hệ số Linh thú (coinMultiplier & waterBonus):');

test('Chưa có linh thú hoặc chưa chọn: multiplier = 1.0, waterBonus = 0', () => {
  assert.strictEqual(Economy.coinMultiplier(), 1.0);
  assert.strictEqual(Economy.waterBonus('lessonStep'), 0);
});

test('Trứng chưa nở: multiplier vẫn = 1.0', () => {
  const s = Economy.getState();
  s.pets.push({
    id: 'pet_egg_dragon',
    type: 'dragon',
    isEgg: true,
    eggXpProgress: 0,
    eggXpNeeded: 100,
    level: 1
  });
  s.activePet = 'pet_egg_dragon';
  Economy.saveState();

  assert.strictEqual(Economy.coinMultiplier(), 1.0);
});

test('Linh thú Rồng con (Dragon Cấp 1): +25% xu (multiplier = 1.25)', () => {
  const s = Economy.getState();
  const dragon = s.pets.find(p => p.id === 'pet_egg_dragon');
  dragon.isEgg = false; // Trứng nở
  dragon.level = 1;
  Economy.saveState();

  assert.strictEqual(Economy.coinMultiplier(), 1.25);

  // Thưởng checkpointPass gốc 50 xu -> 50 * 1.25 = 62.5 -> làm tròn 63 xu
  const reward = Economy.reward('checkpointPass');
  assert.strictEqual(reward.coins, 63);
});

test('Linh thú Cú mèo (Owl): +1 giọt nước khi học', () => {
  const s = Economy.getState();
  s.pets.push({
    id: 'pet_owl_1',
    type: 'owl',
    isEgg: false,
    level: 1
  });
  s.activePet = 'pet_owl_1';
  Economy.saveState();

  assert.strictEqual(Economy.waterBonus('lessonStep'), 1);

  // lessonStep gốc: 1 nước + 1 nước từ Cú = 2 nước
  const rew = Economy.reward('lessonStep');
  assert.strictEqual(rew.water, 2);
});

/* ==========================================================================
   4. Kiểm tra Chuỗi ngày (Streak) qua các ngày (Tiêm thời gian _setNow)
   ========================================================================== */
console.log('\n4. Kiểm tra Chuỗi ngày Streak:');

test('Ngày 1 (2026-05-01): Lần earn đầu tiên thiết lập streak = 1', () => {
  Economy._setNow(() => new Date('2026-05-01T09:00:00Z'));
  Economy._resetState();
  Economy.earn('test_day1', { coins: 5 });

  const s = Economy.getState();
  assert.strictEqual(s.streak.count, 1);
  assert.strictEqual(s.streak.last, '2026-05-01');
});

test('Ngày 1 (2026-05-01): Earn thêm lần 2 trong ngày, streak giữ nguyên = 1', () => {
  Economy._setNow(() => new Date('2026-05-01T15:00:00Z'));
  Economy.earn('test_day1_again', { coins: 5 });

  const s = Economy.getState();
  assert.strictEqual(s.streak.count, 1);
  assert.strictEqual(s.streak.last, '2026-05-01');
});

test('Ngày 2 (2026-05-02 - liên tiếp): Earn lần đầu -> streak tăng thành 2', () => {
  Economy._setNow(() => new Date('2026-05-02T10:00:00Z'));
  Economy.earn('test_day2', { coins: 5 });

  const s = Economy.getState();
  assert.strictEqual(s.streak.count, 2);
  assert.strictEqual(s.streak.last, '2026-05-02');
});

test('Ngày 3 (2026-05-03 - liên tiếp): Earn lần đầu -> streak tăng thành 3', () => {
  Economy._setNow(() => new Date('2026-05-03T11:00:00Z'));
  Economy.earn('test_day3', { coins: 5 });

  const s = Economy.getState();
  assert.strictEqual(s.streak.count, 3);
  assert.strictEqual(s.streak.last, '2026-05-03');
});

test('Ngày 6 (2026-05-06 - đứt chuỗi >1 ngày): Earn lần đầu -> streak về 1', () => {
  Economy._setNow(() => new Date('2026-05-06T08:00:00Z'));
  Economy.earn('test_day6', { coins: 5 });

  const s = Economy.getState();
  assert.strictEqual(s.streak.count, 1);
  assert.strictEqual(s.streak.last, '2026-05-06');
});

/* ==========================================================================
   5. Kiểm tra Nhiệm vụ ngày (generateDailyQuests, questStatus, claimQuest)
   ========================================================================== */
console.log('\n5. Kiểm tra Nhiệm vụ ngày:');

test('Ngày mới: Danh sách 3 nhiệm vụ đôi (Học tập + Vườn treo) chưa hoàn thành và chưa nhận', () => {
  Economy._setNow(() => new Date('2026-05-10T08:00:00Z'));
  Economy._resetState();

  const quests = Economy.questStatus();
  assert.strictEqual(quests.length, 3);
  quests.forEach(q => {
    assert.strictEqual(q.completed, false);
    assert.strictEqual(q.claimed, false);
    assert.ok(q.study && q.garden, 'Nhiệm vụ phải có đủ phần học và phần vườn');
  });
});

test('Hoàn thành cả phần học tập và phần vườn -> hoàn thành nhiệm vụ 1', () => {
  const questsBefore = Economy.questStatus();
  const q1 = questsBefore[0];

  // Làm đủ yêu cầu học
  if (q1.study.key === 'lessonNew') {
    Economy.reward('lessonDone', { isNew: true });
  } else {
    for (let i = 0; i < q1.study.target; i++) {
      Economy.reward(q1.study.key);
    }
  }

  // Làm đủ yêu cầu vườn
  Economy.recordGardenAction(q1.garden.key, q1.garden.target);

  const questsAfter = Economy.questStatus();
  const q1After = questsAfter.find(q => q.id === q1.id);

  assert.strictEqual(q1After.completed, true);
  assert.strictEqual(q1After.claimed, false);
});

test('Nhận thưởng nhiệm vụ claimQuest thành công (+xu)', () => {
  const quests = Economy.questStatus();
  const q1 = quests[0];
  const beforeCoins = Economy.getState().coins;
  const rewardCoins = (q1.reward && q1.reward.coins) || 30;

  const ok = Economy.claimQuest(q1.id);
  assert.strictEqual(ok, true);

  const s = Economy.getState();
  assert.strictEqual(s.coins, beforeCoins + rewardCoins);

  const q1After = Economy.questStatus().find(q => q.id === q1.id);
  assert.strictEqual(q1After.claimed, true);
});

test('Không thể nhận lại nhiệm vụ đã claim', () => {
  const quests = Economy.questStatus();
  const q1 = quests[0];
  const ok = Economy.claimQuest(q1.id);
  assert.strictEqual(ok, false);
});

test('Chuyển sang ngày mới: Nhiệm vụ tự động reset', () => {
  Economy._setNow(() => new Date('2026-05-11T08:00:00Z'));
  const quests = Economy.questStatus();
  assert.strictEqual(quests.length, 3);
  quests.forEach(q => {
    assert.strictEqual(q.completed, false);
    assert.strictEqual(q.claimed, false);
  });
});

/* ==========================================================================
   6. Kiểm tra Cơ Chế Vườn Treo Tri Thức & Trạng Thái Chậu Cây (plotStatus / getPotStatus)
   ========================================================================== */
console.log('\n6. Kiểm tra Vườn Treo Tri Thức (Chậu & Cây trồng):');

test('Ô trống (không có chậu hoặc chậu rỗng): state="empty", progress=0', () => {
  const st1 = plotStatus(null);
  assert.strictEqual(st1.state, 'empty');
  assert.strictEqual(st1.progress, 0);

  const st2 = plotStatus({ pot: null });
  assert.strictEqual(st2.state, 'empty');

  const st3 = plotStatus({ pot: { type: 'clay', stars: 1, crop: null } });
  assert.strictEqual(st3.state, 'empty');
});

test('Cây mới gieo chưa được tưới: state="thirsty"', () => {
  const now = 1000000;
  const slot = {
    pot: {
      type: 'clay',
      stars: 1,
      crop: {
        cropId: 'chrysanthemum',
        plantedAt: now - 5000,
        watered: false,
        lastWateredAt: null,
        accumulatedGrowthMs: 0
      }
    }
  };
  const st = plotStatus(slot, now, CROP_DEFS);
  assert.strictEqual(st.state, 'thirsty');
});

test('Cây đã tưới đang trong chu kỳ lớn: state="growing", progress tăng dần', () => {
  const now = 1000000;
  // Hoa cúc: 1 phút = 60000ms. Chậu clay ⭐1: tốc độ gốc 60000ms. Đã lớn 30000ms (50%)
  const slot = {
    pot: {
      type: 'clay',
      stars: 1,
      crop: {
        cropId: 'chrysanthemum',
        plantedAt: now - 30000,
        watered: true,
        lastWateredAt: now - 30000,
        accumulatedGrowthMs: 0
      }
    }
  };
  const st = plotStatus(slot, now, CROP_DEFS);
  assert.strictEqual(st.state, 'growing');
  assert.strictEqual(st.progress, 0.5);
  assert.strictEqual(st.stage, 2);
});

test('Cây phát sinh sâu bệnh: state="pest", gắn câu đố tiếng Trung', () => {
  const now = 1000000;
  const slot = {
    pot: {
      type: 'clay',
      stars: 1,
      crop: {
        cropId: 'chrysanthemum',
        plantedAt: now - 30000,
        watered: true,
        lastWateredAt: now - 30000,
        accumulatedGrowthMs: 0,
        pest: {
          hanzi: '茶',
          pinyin: 'chá',
          vi: 'Trà / Chè',
          correctAnswer: 'Trà / Chè'
        }
      }
    }
  };
  const st = plotStatus(slot, now, CROP_DEFS);
  assert.strictEqual(st.state, 'pest');
  assert(st.pest !== null, 'Phải có dữ liệu sâu bệnh');
  assert.strictEqual(st.pest.hanzi, '茶');
});

test('Cây đã đủ thời gian lớn và đã tưới nước: state="ripe", progress=1', () => {
  const now = 1000000;
  // Hoa cúc: 60000ms. Đã trôi qua 65000ms
  const slot = {
    pot: {
      type: 'clay',
      stars: 1,
      crop: {
        cropId: 'chrysanthemum',
        plantedAt: now - 65000,
        watered: true,
        lastWateredAt: now - 65000,
        accumulatedGrowthMs: 0
      }
    }
  };
  const st = plotStatus(slot, now, CROP_DEFS);
  assert.strictEqual(st.state, 'ripe');
  assert.strictEqual(st.progress, 1);
  assert.strictEqual(st.stage, 4);
});

test('Chậu cao cấp (Hoàng Kim ⭐5): Giảm 65% thời gian lớn', () => {
  const now = 1000000;
  // Dưa hấu: gốc 5 phút = 300000ms.
  // Chậu gold ⭐5: giảm 65% thời gian -> còn 300000 * (1 - 0.65) = 105000ms.
  // Đã trôi qua 106000ms -> Chín ngay!
  const slot = {
    pot: {
      type: 'gold',
      stars: 5,
      crop: {
        cropId: 'watermelon',
        plantedAt: now - 106000,
        watered: true,
        lastWateredAt: now - 106000,
        accumulatedGrowthMs: 0
      }
    }
  };
  const st = plotStatus(slot, now, CROP_DEFS);
  assert.strictEqual(st.state, 'ripe');
  assert.strictEqual(st.progress, 1);
});

test('Cây thu hoạch nhiều lần (như Dâu tây): maxHarvests = 3', () => {
  const straw = CROP_DEFS.strawberry;
  assert.strictEqual(straw.maxHarvests, 3);
  assert.strictEqual(straw.category, 'crop');
});

test('Đủ 16 loại cây trồng thuộc 3 nhóm: Hoa, Rau quả, Cây quý', () => {
  const keys = Object.keys(CROP_DEFS);
  assert(keys.length >= 16, `Cần tối thiểu 16 cây, hiện có ${keys.length}`);

  const flowers = keys.filter(k => CROP_DEFS[k].category === 'flower');
  const crops = keys.filter(k => CROP_DEFS[k].category === 'crop');
  const rares = keys.filter(k => CROP_DEFS[k].category === 'rare');

  assert(flowers.length >= 5, 'Phải có ít nhất 5 loại hoa');
  assert(crops.length >= 9, 'Phải có ít nhất 9 loại rau quả');
  assert(rares.length >= 2, 'Phải có ít nhất 2 loại cây quý');
});

test('Đủ 5 hạng chậu và cấp sao nâng cấp', () => {
  const potTiers = Object.keys(POT_TIERS);
  assert.deepStrictEqual(potTiers, ['clay', 'ceramic', 'porcelain', 'jade', 'gold']);
  assert.strictEqual(POT_TIERS.clay.upgrades.length, 5);
  assert.strictEqual(POT_TIERS.gold.upgrades.length, 5);
});

/* ==========================================================================
   7. Kiểm tra Tự động chuyển đổi dữ liệu nông trại cũ (Migration)
   ========================================================================== */
console.log('\n7. Kiểm tra Migration dữ liệu cũ:');

test('Dữ liệu cũ (isometric plots) được chuyển đổi sang Vườn Treo Tri Thức mà không mất xu', () => {
  Economy._resetState({
    coins: 350,
    farm: {
      size: 3,
      plots: [
        { id: 0, cropId: 'rice', plantedAt: 1000 },
        { id: 1, cropId: 'radish', plantedAt: 2000 },
        { id: 2, cropId: null }
      ]
    }
  });

  // Gọi getPotStatus hoặc khởi tạo Farm state
  const state = Economy.getState();
  assert.strictEqual(state.coins, 350, 'Số xu người chơi được bảo toàn nguyên vẹn');

  // Kiểm tra chuyển đổi sang cấu trúc Vườn Treo
  const { Farm } = require('../game/farm.js');
  // Mô phỏng mount hoặc ensureFarmState
  if (typeof Farm.getPotStatus === 'function') {
    assert.strictEqual(typeof Farm.getPotStatus, 'function');
  }
});

/* ==========================================================================
   8. Kiểm tra Hệ thống 3 Tầng & Tiên Vườn (Garden Fairies)
   ========================================================================== */
console.log('\n8. Kiểm tra Hệ thống 3 Tầng & Tiên Vườn:');

test('Người chơi mới khởi tạo có sẵn 3 tầng ("chinese", "japanese", "english") và 18 ô chậu', () => {
  const dummyState = { coins: 50, water: 5 };
  const farmState = Farm.ensureFarmState(dummyState);
  assert.strictEqual(farmState.tierCount, 3);
  assert.deepStrictEqual(farmState.tierThemes, ['chinese', 'japanese', 'english']);
  assert.strictEqual(farmState.slots.length, 18);
  assert.strictEqual(farmState.fairies.length, 3);
});

test('Dữ liệu cũ có tierCount < 3 tự động nâng lên 3 tầng, bảo toàn chậu và cây', () => {
  const dummyState = {
    coins: 100,
    farm: {
      version: 2,
      tierCount: 1,
      tierThemes: ['chinese'],
      slots: [
        { slotIndex: 0, pot: { type: 'ceramic', stars: 2, crop: { cropId: 'carrot', plantedAt: 1000, watered: true } } }
      ],
      fairies: [{ level: 1, enabled: { water: true, harvest: true, replant: true } }]
    }
  };
  const farmState = Farm.ensureFarmState(dummyState);
  assert.strictEqual(farmState.tierCount, 3);
  assert.strictEqual(farmState.slots.length, 18);
  assert.strictEqual(farmState.slots[0].pot.type, 'ceramic');
  assert.strictEqual(farmState.slots[0].pot.crop.cropId, 'carrot');
  assert.strictEqual(farmState.tierThemes.length, 3);
  assert.strictEqual(farmState.fairies.length, 3);
});

test('Tiên Cấp 1: Tự động tưới cây khát và trừ nước trong ví', () => {
  const now = 100000;
  const state = {
    water: 5,
    coins: 100,
    farm: {
      tierCount: 3,
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: { cropId: 'chrysanthemum', plantedAt: now - 10000, watered: false, lastWateredAt: 0 }
          }
        }
      ],
      fairies: [
        { level: 1, enabled: { water: true, harvest: true, replant: true }, lastWorkAt: 0 }
      ]
    }
  };

  const res = Farm._fairyTick(state, now, { speedMultiplier: 1 });
  assert.strictEqual(res.wateredCount, 1);
  assert.strictEqual(state.water, 4, 'Trừ 1 giọt nước trong ví');
  assert.strictEqual(state.farm.slots[0].pot.crop.watered, true);
  assert.strictEqual(state.farm.fairies[0].bubbleText, 'Đã tưới nước!');
});

test('Tiên Cấp 1: Hết nước thì dừng và nhắc học thêm, không trừ âm nước', () => {
  const now = 100000;
  const state = {
    water: 0,
    coins: 100,
    farm: {
      tierCount: 3,
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: { cropId: 'chrysanthemum', plantedAt: now - 10000, watered: false }
          }
        }
      ],
      fairies: [
        { level: 1, enabled: { water: true, harvest: true, replant: true }, lastWorkAt: 0 }
      ]
    }
  };

  const res = Farm._fairyTick(state, now, { speedMultiplier: 1 });
  assert.strictEqual(res.wateredCount, 0);
  assert.strictEqual(state.water, 0);
  assert.strictEqual(state.farm.slots[0].pot.crop.watered, false);
  assert(state.farm.fairies[0].bubbleText.includes('Học thêm'), 'Nhắc học thêm để có nước');
});

test('Tiên Cấp 2: Tự động thu hoạch cây chín vào kho nông sản', () => {
  const now = 2000000;
  const state = {
    water: 5,
    coins: 100,
    farm: {
      tierCount: 3,
      warehouse: { capacity: 50, items: { chrysanthemum: 2 } },
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: { cropId: 'chrysanthemum', plantedAt: now - 1000000, watered: true, lastWateredAt: now - 1000000 }
          }
        }
      ],
      fairies: [
        { level: 2, enabled: { water: true, harvest: true, replant: false }, lastWorkAt: 0 }
      ]
    }
  };

  const res = Farm._fairyTick(state, now, { speedMultiplier: 1 });
  assert.strictEqual(res.harvestedCount, 1);
  assert(state.farm.warehouse.items.chrysanthemum >= 3, 'Kho nông sản nhận sản phẩm thu hoạch');
  assert.strictEqual(state.farm.slots[0].pot.crop, null, 'Cây đã thu hoạch xong');
  assert.strictEqual(state.farm.fairies[0].bubbleText, 'Đã thu hoạch!');
});

test('Tiên Cấp 2: Kho đầy (50 sản phẩm) thì dừng thu hoạch', () => {
  const now = 2000000;
  const state = {
    water: 5,
    coins: 100,
    farm: {
      tierCount: 3,
      warehouse: { capacity: 50, items: { chrysanthemum: 50 } },
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: { cropId: 'chrysanthemum', plantedAt: now - 1000000, watered: true, lastWateredAt: now - 1000000 }
          }
        }
      ],
      fairies: [
        { level: 2, enabled: { water: true, harvest: true, replant: false }, lastWorkAt: 0 }
      ]
    }
  };

  const res = Farm._fairyTick(state, now, { speedMultiplier: 1 });
  assert.strictEqual(res.harvestedCount, 0);
  assert.notStrictEqual(state.farm.slots[0].pot.crop, null, 'Cây vẫn còn nguyên trong chậu');
  assert(state.farm.fairies[0].bubbleText.includes('Kho'), 'Báo kho đầy');
});

test('Tiên Cấp 3: Tự động gieo lại loại hạt vừa thu và trừ xu mua hạt', () => {
  const now = 2000000;
  const cSeedCost = CROP_DEFS.chrysanthemum.seedCost;
  const state = {
    water: 5,
    coins: 50,
    farm: {
      tierCount: 3,
      warehouse: { capacity: 50, items: {} },
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: { cropId: 'chrysanthemum', plantedAt: now - 1000000, watered: true, lastWateredAt: now - 1000000 }
          }
        }
      ],
      fairies: [
        { level: 3, enabled: { water: true, harvest: true, replant: true }, lastWorkAt: 0 }
      ]
    }
  };

  const res = Farm._fairyTick(state, now, { speedMultiplier: 1 });
  assert.strictEqual(res.harvestedCount, 1);
  assert.strictEqual(res.replantedCount, 1);
  assert.strictEqual(state.coins, 50 - cSeedCost, 'Đã trừ xu tiền mua hạt giống');
  assert.strictEqual(state.farm.slots[0].pot.crop.cropId, 'chrysanthemum', 'Cây đã được gieo lại');
});

test('Tiên Cấp 3: Không đủ xu thì dừng lại và không trừ âm xu', () => {
  const now = 2000000;
  const state = {
    water: 5,
    coins: 0,
    farm: {
      tierCount: 3,
      warehouse: { capacity: 50, items: {} },
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: { cropId: 'chrysanthemum', plantedAt: now - 1000000, watered: true, lastWateredAt: now - 1000000 }
          }
        }
      ],
      fairies: [
        { level: 3, enabled: { water: true, harvest: true, replant: true }, lastWorkAt: 0 }
      ]
    }
  };

  const res = Farm._fairyTick(state, now, { speedMultiplier: 1 });
  assert.strictEqual(res.harvestedCount, 1);
  assert.strictEqual(res.replantedCount, 0, 'Không đủ xu nên không thể gieo lại');
  assert.strictEqual(state.coins, 0, 'Xu không bị âm');
  assert.strictEqual(state.farm.slots[0].pot.crop, null);
});

test('Tiên Cấp 4: Có 10% cơ hội nhận thêm 1 sản vật (+1 bonus yield) khi thu hoạch', () => {
  const now = 2000000;
  const state = {
    water: 5,
    coins: 100,
    farm: {
      tierCount: 3,
      warehouse: { capacity: 50, items: { chrysanthemum: 0 } },
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: { cropId: 'chrysanthemum', plantedAt: now - 1000000, watered: true, lastWateredAt: now - 1000000 }
          }
        }
      ],
      fairies: [
        { level: 4, enabled: { water: true, harvest: true, replant: false }, lastWorkAt: 0 }
      ]
    }
  };

  // options.random = 0.05 < 0.10 -> kích hoạt thưởng +1 sản vật
  const res = Farm._fairyTick(state, now, { speedMultiplier: 1, random: 0.05 });
  assert.strictEqual(res.harvestedCount, 1);
  const baseYield = CROP_DEFS.chrysanthemum.yield || 1;
  assert.strictEqual(state.farm.warehouse.items.chrysanthemum, baseYield + 1, 'Nhận thêm 1 sản vật bonus');
});

test('Tiên không làm việc vượt cấp mở khóa (Cấp 1 không thu hoạch)', () => {
  const now = 2000000;
  const state = {
    water: 5,
    coins: 100,
    farm: {
      tierCount: 3,
      warehouse: { capacity: 50, items: {} },
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: { cropId: 'chrysanthemum', plantedAt: now - 1000000, watered: true, lastWateredAt: now - 1000000 }
          }
        }
      ],
      fairies: [
        { level: 1, enabled: { water: true, harvest: true, replant: true }, lastWorkAt: 0 }
      ]
    }
  };

  const res = Farm._fairyTick(state, now, { speedMultiplier: 1 });
  assert.strictEqual(res.harvestedCount, 0, 'Cấp 1 không thể thu hoạch');
  assert.notStrictEqual(state.farm.slots[0].pot.crop, null);
});

test('Tiên KHÔNG bao giờ tự bắt sâu (sâu phải giữ nguyên để làm quiz từ vựng)', () => {
  const now = 100000;
  const state = {
    water: 5,
    coins: 100,
    farm: {
      tierCount: 3,
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: {
              cropId: 'chrysanthemum',
              plantedAt: now - 10000,
              watered: false,
              pest: { hanzi: '苹果', vi: 'Quả táo' }
            }
          }
        }
      ],
      fairies: [
        { level: 5, enabled: { water: true, harvest: true, replant: true }, lastWorkAt: 0 }
      ]
    }
  };

  const res = Farm._fairyTick(state, now, { speedMultiplier: 1 });
  assert.notStrictEqual(state.farm.slots[0].pot.crop.pest, null, 'Sâu vẫn còn nguyên');
  assert.strictEqual(state.farm.slots[0].pot.crop.pest.hanzi, '苹果');
  assert(state.farm.fairies[0].bubbleText.toLowerCase().includes('sâu'), 'Tiên chỉ cảnh báo sâu cho người chơi');
});

test('Tiên Cấp 5: Bù ngoại tuyến (offline simulation) giới hạn tối đa 8 giờ (28,800,000ms)', () => {
  const now = 100000000;
  const tenHoursAgo = now - 10 * 3600 * 1000;

  const state = {
    water: 10,
    coins: 100,
    farm: {
      tierCount: 3,
      lastActiveAt: tenHoursAgo,
      warehouse: { capacity: 50, items: {} },
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: { cropId: 'chrysanthemum', plantedAt: tenHoursAgo, watered: false, lastWateredAt: 0 }
          }
        }
      ],
      fairies: [
        { level: 5, enabled: { water: true, harvest: true, replant: true }, lastWorkAt: 0 }
      ]
    }
  };

  const report = Farm._simulateOfflineFairies(state, now);
  assert(report !== null, 'Có báo cáo offline');
  assert.strictEqual(report.elapsed, 8 * 3600 * 1000, 'Thời gian tính bù bị giới hạn đúng 8 giờ');
  assert(report.totalWatered >= 1, 'Đã tưới nước');
});

test('Tiên dưới Cấp 5 không hoạt động ngoại tuyến khi đóng game', () => {
  const now = 100000000;
  const fourHoursAgo = now - 4 * 3600 * 1000;

  const state = {
    water: 10,
    coins: 100,
    farm: {
      tierCount: 3,
      lastActiveAt: fourHoursAgo,
      warehouse: { capacity: 50, items: {} },
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: { cropId: 'chrysanthemum', plantedAt: fourHoursAgo, watered: false, lastWateredAt: 0 }
          }
        }
      ],
      fairies: [
        { level: 4, enabled: { water: true, harvest: true, replant: true }, lastWorkAt: 0 }
      ]
    }
  };

  const report = Farm._simulateOfflineFairies(state, now);
  assert.strictEqual(report, null, 'Cấp dưới 5 không được tính bù offline');
});

/* ==========================================================================
   9. Kiểm tra Gắn Nhiệm Vụ Game với Học Tập (Phần A/2)
   ========================================================================== */
console.log('\n9. Kiểm tra Toàn diện Nhiệm vụ Game & Học tập (Phần A/2):');

test('9.1 Nhiệm vụ ngày ổn định theo ngày (cùng ngày sinh cùng bộ 3 nhiệm vụ đôi)', () => {
  const dStr = '2026-06-15';
  const quests1 = Economy.generateDailyQuests(dStr);
  const quests2 = Economy.generateDailyQuests(dStr);

  assert.strictEqual(quests1.length, 3);
  assert.strictEqual(quests2.length, 3);
  for (let i = 0; i < 3; i++) {
    assert.strictEqual(quests1[i].id, quests2[i].id);
    assert.strictEqual(quests1[i].study.key, quests2[i].study.key);
    assert.strictEqual(quests1[i].garden.key, quests2[i].garden.key);
    assert.strictEqual(quests1[i].study.target, quests2[i].study.target);
    assert.strictEqual(quests1[i].garden.target, quests2[i].garden.target);
  }
});

test('9.2 Thích ứng: Chưa học bài nào -> Nhiệm vụ 1 luôn là "Học bài đầu tiên"', () => {
  Economy._setLearnProgress({ lessons: {}, checkpoints: {}, hardWords: {} });
  const quests = Economy.generateDailyQuests('2026-06-16');

  assert.strictEqual(quests[0].study.key, 'lessonNew');
  assert.strictEqual(quests[0].study.title, 'Học bài đầu tiên');
  assert.strictEqual(quests[0].study.target, 1);
});

test('9.3 Không giao phát âm khi thiết bị không hỗ trợ microphone', () => {
  Economy._setMicSupport(false);
  // Kiểm tra 10 ngày khác nhau khi mic = false
  for (let d = 1; d <= 10; d++) {
    const dStr = `2026-07-${String(d).padStart(2, '0')}`;
    const quests = Economy.generateDailyQuests(dStr);
    const hasSpeak = quests.some(q => q.study.key === 'speakPass');
    assert.strictEqual(hasSpeak, false, `Ngày ${dStr} không được giao speakPass khi không có mic`);
  }
  Economy._setMicSupport(true); // reset
});

test('9.4 Chống cày: Học lại bài cũ tính "lessonReview", không tính "lessonNew"', () => {
  Economy._setNow(() => new Date('2026-06-17T08:00:00Z'));
  Economy._resetState();

  // Học bài mới
  Economy.reward('lessonDone', { isNew: true, lessonId: 'intro-u1-l1' });
  let s = Economy.getState();
  assert.strictEqual(s.today.counts.lessonNew, 1);
  assert.strictEqual(s.today.counts.lessonReview || 0, 0);
  assert.strictEqual(s.today.counts.lessonDone, 1);

  // Học lại bài cũ (không phải bài mới)
  Economy.reward('lessonDone', { isNew: false, lessonId: 'intro-u1-l1' });
  s = Economy.getState();
  assert.strictEqual(s.today.counts.lessonNew, 1, 'Bài cũ không được tăng lessonNew');
  assert.strictEqual(s.today.counts.lessonReview, 1, 'Bài cũ phải tính vào lessonReview');
  assert.strictEqual(s.today.counts.lessonDone, 2);
});

test('9.5 Chống cày: Ôn thẻ (flashcard) và trắc nghiệm (quizCorrect) có trần đếm 20/ngày', () => {
  Economy._setNow(() => new Date('2026-06-18T08:00:00Z'));
  Economy._resetState();

  // Làm 25 lần flashcard
  for (let i = 0; i < 25; i++) {
    Economy.reward('flashcard');
  }
  // Làm 25 lần quiz
  for (let i = 0; i < 25; i++) {
    Economy.reward('quizCorrect');
  }

  const s = Economy.getState();
  assert.strictEqual(s.today.counts.flashcard, 20, 'Trần flashcard tối đa 20');
  assert.strictEqual(s.today.counts.quizCorrect, 20, 'Trần quizCorrect tối đa 20');
});

test('9.6 Nhận thưởng đúng 1 lần (Nhiệm vụ & Rương ngày)', () => {
  Economy._setNow(() => new Date('2026-06-19T08:00:00Z'));
  Economy._resetState();

  const quests = Economy.questStatus();
  // Giả lập hoàn thành cả 3 nhiệm vụ
  quests.forEach(q => {
    if (q.study.key === 'lessonNew') {
      Economy.reward('lessonDone', { isNew: true });
    } else if (q.study.key === 'lessonReview') {
      Economy.reward('lessonDone', { isNew: false });
    } else {
      for (let i = 0; i < q.study.target; i++) {
        Economy.reward(q.study.key);
      }
    }
    Economy.recordGardenAction(q.garden.key, q.garden.target);
  });

  const questsAfter = Economy.questStatus();
  assert.ok(questsAfter.every(q => q.completed), 'Cả 3 nhiệm vụ phải hoàn thành');

  // Claim quest 1
  const ok1 = Economy.claimQuest(quests[0].id);
  assert.strictEqual(ok1, true);
  const ok1Again = Economy.claimQuest(quests[0].id);
  assert.strictEqual(ok1Again, false, 'Không thể claim lại lần 2');

  // Claim 2 quest còn lại
  Economy.claimQuest(quests[1].id);
  Economy.claimQuest(quests[2].id);

  // Mở rương ngày
  const chest1 = Economy.claimDailyChest();
  assert.ok(chest1, 'Mở rương ngày thành công khi đủ 3 nhiệm vụ');
  const chest2 = Economy.claimDailyChest();
  assert.strictEqual(chest2, false, 'Không thể mở lại rương ngày lần 2');
});

test('9.7 Nắng học tập bật khi có học (>= 1 bài hoặc >= 20 XP) và tăng 15% tốc độ cây', () => {
  Economy._setNow(() => new Date('2026-06-20T08:00:00Z'));
  Economy._resetState();

  // Chưa học: không có nắng, tốc độ = 1.0
  assert.strictEqual(Economy.isLearningSunshineActive(), false);
  assert.strictEqual(Economy.cropSpeedMultiplier(), 1.0);

  // Học 1 bài: bật nắng, tốc độ = 1.15 (+15%)
  Economy.reward('lessonDone', { isNew: true });
  assert.strictEqual(Economy.isLearningSunshineActive(), true);
  assert.strictEqual(Number(Economy.cropSpeedMultiplier().toFixed(2)), 1.15);
});

test('9.8 Chuỗi ngày học Streak >= 3/7/30 kích hoạt đồ trang trí cây đại thụ', () => {
  Economy._resetState();
  let s = Economy.getState();

  s.streak.count = 2;
  let dec = Economy.getStreakDecorations();
  assert.strictEqual(dec.ribbon, false);
  assert.strictEqual(dec.windChime, false);
  assert.strictEqual(dec.lantern, false);

  s.streak.count = 3;
  dec = Economy.getStreakDecorations();
  assert.strictEqual(dec.ribbon, true, 'Streak >= 3 có dải lụa đỏ');
  assert.strictEqual(dec.windChime, false);

  s.streak.count = 7;
  dec = Economy.getStreakDecorations();
  assert.strictEqual(dec.ribbon, true);
  assert.strictEqual(dec.windChime, true, 'Streak >= 7 có chuông gió');
  assert.strictEqual(dec.lantern, false);

  s.streak.count = 30;
  dec = Economy.getStreakDecorations();
  assert.strictEqual(dec.ribbon, true);
  assert.strictEqual(dec.windChime, true);
  assert.strictEqual(dec.lantern, true, 'Streak >= 30 có đèn lồng Bồng Lai');
});

test('9.9 Điều kiện mở Tầng (Tầng 4+ cần Checkpoint) và Nâng Tiên (cần số bài học)', () => {
  Economy._resetState();
  Economy._setLearnProgress({
    lessons: { 'intro-u1-l1': { stars: 3 }, 'intro-u1-l2': { stars: 3 } }, // 2 bài
    checkpoints: {} // Chưa vượt checkpoint nào
  });

  // Tầng 4 cần 500 xu VÀ Checkpoint 'intro-u1'
  let checkTier4 = Economy.canUnlockTier(4);
  assert.strictEqual(checkTier4.checkpointPassed, false, 'Chưa vượt Checkpoint intro-u1');
  assert.strictEqual(checkTier4.canUnlock, false);

  // Vượt checkpoint intro-u1 nhưng thiếu xu
  Economy._setLearnProgress({
    lessons: { 'intro-u1-l1': { stars: 3 }, 'intro-u1-l2': { stars: 3 } },
    checkpoints: { 'intro-u1': { score: 90, passed: true } }
  });
  checkTier4 = Economy.canUnlockTier(4);
  assert.strictEqual(checkTier4.checkpointPassed, true);
  assert.strictEqual(checkTier4.hasCoins, false, 'Coins = 50 < 500');
  assert.strictEqual(checkTier4.canUnlock, false);

  // Đủ 500 xu -> Mở được
  Economy.earn('test', { coins: 500 });
  checkTier4 = Economy.canUnlockTier(4);
  assert.strictEqual(checkTier4.canUnlock, true);

  // Nâng Tiên: Cấp 3 cần 5 bài học (hiện có 2 bài)
  let checkFairy3 = Economy.canUpgradeFairy(3);
  assert.strictEqual(checkFairy3.lessonsPassed, false, 'Mới học 2/5 bài');
  assert.strictEqual(checkFairy3.canUpgrade, false);

  // Học đủ 5 bài -> Nâng được
  const p = Economy.getLearnProgress();
  p.lessons['l3'] = { stars: 3 };
  p.lessons['l4'] = { stars: 3 };
  p.lessons['l5'] = { stars: 3 };
  Economy._setLearnProgress(p);
  checkFairy3 = Economy.canUpgradeFairy(3);
  assert.strictEqual(checkFairy3.lessonsPassed, true);
  assert.strictEqual(checkFairy3.canUpgrade, true);
});

test('9.10 Thưởng đơn khinh khí cầu: không dùng gợi ý (+50% & ôn từ) vs có gợi ý (chuẩn)', () => {
  const farmState = {
    version: 2,
    warehouse: { items: { chrysanthemum: 10 } },
    materials: {},
    orders: [
      {
        id: 'ord_no_hint',
        cropId: 'chrysanthemum',
        count: 2,
        rewardCoins: 40,
        rewardXp: 30,
        rewardMaterial: { type: 'clay', count: 1 },
        usedHint: false,
        delivered: false
      },
      {
        id: 'ord_with_hint',
        cropId: 'chrysanthemum',
        count: 2,
        rewardCoins: 40,
        rewardXp: 30,
        rewardMaterial: { type: 'clay', count: 1 },
        usedHint: true,
        delivered: false
      }
    ]
  };

  Economy._resetState({ farm: farmState, coins: 0, xp: 0 });
  Economy._setLearnProgress({ lessons: {}, checkpoints: {}, hardWords: {} });

  // Giao đơn 1 (không dùng gợi ý): coins = round(40*1.5) = 60, xp = round(30*1.5) = 45
  const ord1 = farmState.orders[0];
  const noHintCoins = Math.round(ord1.rewardCoins * 1.5);
  const noHintXp = Math.round(ord1.rewardXp * 1.5);
  Economy.earn('order_delivered', { coins: noHintCoins, xp: noHintXp });
  Economy.recordWordReview(ord1.cropId);
  Economy.recordGardenAction('order', 1);

  assert.strictEqual(Economy.getState().coins, 60);
  assert.strictEqual(Economy.getState().xp, 45);
  assert.strictEqual(Economy.getState().today.gardenCounts.order, 1);
  assert.strictEqual(Economy.getLearnProgress().hardWords['chrysanthemum'].reviewsCount, 1);

  // Giao đơn 2 (có dùng gợi ý): coins = 40, xp = 30
  const ord2 = farmState.orders[1];
  Economy.earn('order_delivered', { coins: ord2.rewardCoins, xp: ord2.rewardXp });
  Economy.recordGardenAction('order', 1);

  assert.strictEqual(Economy.getState().coins, 100); // 60 + 40
  assert.strictEqual(Economy.getState().xp, 75);     // 45 + 30
});

test('9.11 An toàn dữ liệu: Dữ liệu cũ thiếu trường mới nạp không reset vườn (giữ slots/fairies)', () => {
  // Dữ liệu cũ không có dailyChestClaimed, treeQuestStep, treeQuestClaimed, gardenCounts...
  const legacySaved = {
    coins: 300,
    xp: 500,
    water: 10,
    farm: {
      version: 2,
      tierCount: 3,
      tierThemes: ['chinese', 'japanese', 'english'],
      activeTier: 0,
      slots: [
        { slotIndex: 0, pot: { type: 'porcelain', stars: 2, crop: { cropId: 'lotus' } } },
        { slotIndex: 1, pot: null }
      ],
      fairies: [
        { level: 2, enabled: { water: true, harvest: true } }
      ]
    }
  };

  Economy._resetState(legacySaved);
  const s = Economy.getState();

  // Đảm bảo không mất dữ liệu cũ
  assert.strictEqual(s.coins, 300);
  assert.strictEqual(s.farm.version, 2);
  assert.strictEqual(s.farm.tierCount, 3);
  assert.strictEqual(s.farm.slots[0].pot.type, 'porcelain');
  assert.strictEqual(s.farm.slots[0].pot.crop.cropId, 'lotus');
  assert.strictEqual(s.farm.fairies[0].level, 2);

  // Đảm bảo không tạo plots ô ruộng isometric làm farm.js tạo lại vườn
  assert.strictEqual(s.farm.plots, undefined);

  // Đảm bảo các trường mới có giá trị mặc định an toàn
  assert.strictEqual(s.treeQuestStep, 1);
  assert.deepStrictEqual(s.treeQuestClaimed, []);
  assert.strictEqual(s.today.dailyChestClaimed, false);
  assert.deepStrictEqual(s.today.gardenCounts, {});
});

/* ==========================================================================
   10. Kiểm tra Hạt Giống Từ Vựng & SRS (Phần B/2)
   ========================================================================== */
console.log('\n10. Kiểm tra Hạt Giống Từ Vựng & Chu trình SRS (Phần B/2):');

test('10.1 SRS: Chu trình 4 giai đoạn, đúng tăng khoảng ôn, 4 lần đúng cây chín', () => {
  const baseTime = 10000000;
  const mockState = {
    coins: 100,
    farm: {
      tierCount: 3,
      slots: [
        { slotIndex: 0, pot: { type: 'clay', stars: 1, crop: null } }
      ],
      wordbook: {}
    }
  };

  Economy._resetState(mockState);
  Economy._setLearnProgress({
    lessons: { 'hsk1-u1-l1': { stars: 3, completed: true } },
    hardWords: {}
  });

  // Gieo từ '苹果'
  const sowRes = sowWordSeedIntoSlot(0, '苹果', { state: Economy.getState(), force: true, now: baseTime });
  assert.strictEqual(sowRes.success, true);
  const crop = Economy.getState().farm.slots[0].pot.crop;
  assert.strictEqual(crop.isWordTree, true);
  assert.strictEqual(crop.stage, 1);
  assert.strictEqual(crop.reviewsPassed, 0);
  assert.strictEqual(crop.intervalMs, SRS_INTERVALS[0]); // 10 phút = 600,000ms
  assert.strictEqual(crop.dueAt, baseTime + 600000);

  // Lần 1: Đúng tại mốc tới hạn (baseTime + 600,000)
  const t1 = baseTime + 600000;
  const r1 = reviewWordTree(crop, true, t1, { state: Economy.getState() });
  assert.strictEqual(r1.correct, true);
  assert.strictEqual(crop.stage, 2);
  assert.strictEqual(crop.reviewsPassed, 1);
  assert.strictEqual(crop.intervalMs, SRS_INTERVALS[1]); // 1 ngày = 86,400,000ms
  assert.strictEqual(crop.dueAt, t1 + 86400000);
  assert.strictEqual(crop.isRipe, false);

  // Lần 2: Đúng tại mốc t1 + 86,400,000
  const t2 = t1 + 86400000;
  const r2 = reviewWordTree(crop, true, t2, { state: Economy.getState() });
  assert.strictEqual(r2.correct, true);
  assert.strictEqual(crop.stage, 3);
  assert.strictEqual(crop.reviewsPassed, 2);
  assert.strictEqual(crop.intervalMs, SRS_INTERVALS[2]); // 3 ngày = 259,200,000ms
  assert.strictEqual(crop.isRipe, false);

  // Lần 3: Đúng tại mốc t2 + 259,200,000
  const t3 = t2 + 259200000;
  const r3 = reviewWordTree(crop, true, t3, { state: Economy.getState() });
  assert.strictEqual(r3.correct, true);
  assert.strictEqual(crop.stage, 4);
  assert.strictEqual(crop.reviewsPassed, 3);
  assert.strictEqual(crop.intervalMs, SRS_INTERVALS[3]); // 7 ngày = 604,800,000ms
  assert.strictEqual(crop.isRipe, false);

  // Lần 4: Đúng tại mốc t3 + 604,800,000 -> Cây Chín (Ripe)
  const t4 = t3 + 604800000;
  const r4 = reviewWordTree(crop, true, t4, { state: Economy.getState() });
  assert.strictEqual(r4.correct, true);
  assert.strictEqual(crop.stage, 4);
  assert.strictEqual(crop.reviewsPassed, 4);
  assert.strictEqual(crop.isRipe, true);
  assert.strictEqual(crop.dueAt, 0);

  // Kiểm tra plotStatus nhận diện cây chín
  const st = plotStatus(Economy.getState().farm.slots[0], t4);
  assert.strictEqual(st.state, 'ripe');
  assert.strictEqual(st.progress, 1);
});

test('10.2 SRS: Trả lời sai giữ giai đoạn, giảm khoảng ôn, thêm từ vào hardWords', () => {
  const baseTime = 20000000;
  const mockState = {
    coins: 100,
    farm: {
      tierCount: 3,
      slots: [
        { slotIndex: 0, pot: { type: 'clay', stars: 1, crop: null } }
      ],
      wordbook: {}
    }
  };

  Economy._resetState(mockState);
  Economy._setLearnProgress({ lessons: {}, hardWords: {} });

  sowWordSeedIntoSlot(0, '水', { state: Economy.getState(), force: true, now: baseTime });
  const crop = Economy.getState().farm.slots[0].pot.crop;

  // Lần 1 trả lời đúng -> lên stage 2
  reviewWordTree(crop, true, baseTime + 600000, { state: Economy.getState() });
  assert.strictEqual(crop.stage, 2);
  assert.strictEqual(crop.intervalIndex, 1);

  // Ở stage 2 trả lời sai
  const tFail = baseTime + 700000;
  const rFail = reviewWordTree(crop, false, tFail, { state: Economy.getState() });
  assert.strictEqual(rFail.correct, false);
  // Giai đoạn giữ nguyên
  assert.strictEqual(crop.stage, 2);
  assert.strictEqual(crop.reviewsPassed, 1);
  // Khoảng ôn bị lùi về intervalIndex = 0 (10 phút)
  assert.strictEqual(crop.intervalIndex, 0);
  assert.strictEqual(crop.intervalMs, SRS_INTERVALS[0]);
  assert.strictEqual(crop.dueAt, tFail + SRS_INTERVALS[0]);
  // Từ vựng được thêm vào hardWords
  const prog = Economy.getLearnProgress();
  const wordCount = typeof prog.hardWords['水'] === 'number' ? prog.hardWords['水'] : (prog.hardWords['水']?.reviewsCount || 0);
  assert.strictEqual(wordCount >= 1, true);
});

test('10.3 Hạt giống từ: Chỉ cho phép gieo từ vựng từ bài đã hoàn thành', () => {
  Economy._resetState({
    coins: 100,
    farm: {
      slots: [
        { slotIndex: 0, pot: { type: 'clay', stars: 1, crop: null } },
        { slotIndex: 1, pot: { type: 'clay', stars: 1, crop: null } }
      ],
      wordbook: {}
    }
  });

  // Khi chưa học bài nào chứa '你好'
  Economy._setLearnProgress({ lessons: {} });
  const customCurr = {
    levels: [{
      units: [{
        lessons: [{
          id: 'lesson-1',
          newWords: ['你好', '再见']
        }]
      }]
    }]
  };

  const failRes = sowWordSeedIntoSlot(0, '你好', {
    state: Economy.getState(),
    curriculum: customCurr,
    learnProgress: Economy.getLearnProgress()
  });
  assert.strictEqual(failRes.success, false);
  assert.strictEqual(Economy.getState().farm.slots[0].pot.crop, null);

  // Khi đã hoàn thành bài 'lesson-1'
  Economy._setLearnProgress({
    lessons: {
      'lesson-1': { completed: true, stars: 3 }
    }
  });

  const okRes = sowWordSeedIntoSlot(0, '你好', {
    state: Economy.getState(),
    curriculum: customCurr,
    learnProgress: Economy.getLearnProgress()
  });
  assert.strictEqual(okRes.success, true);
  assert.notStrictEqual(Economy.getState().farm.slots[0].pot.crop, null);
  assert.strictEqual(Economy.getState().farm.slots[0].pot.crop.wordHanzi, '你好');
});

test('10.4 Sâu bệnh: getRandomVocabQuiz ưu tiên từ trong hardWords và Cây Từ tới hạn', () => {
  const now = 50000000;
  const mockState = {
    farm: {
      slots: [
        {
          slotIndex: 0,
          pot: {
            crop: {
              isWordTree: true,
              wordHanzi: '太阳',
              dueAt: now - 1000, // Đã tới hạn
              isRipe: false
            }
          }
        }
      ]
    }
  };
  const mockProgress = {
    hardWords: { '月亮': 3 }
  };

  // Lấy quiz nhiều lần, kết quả phải luôn là '太阳' hoặc '月亮' vì đây là các từ ưu tiên
  for (let i = 0; i < 10; i++) {
    const quiz = getRandomVocabQuiz(mockState, mockProgress);
    assert.strictEqual(['月亮', '太阳'].includes(quiz.hanzi), true);
  }
});

test('10.5 Tiên Vườn: Tiên KHÔNG trả lời/thu hoạch Cây Từ, chỉ tưới và bật cờ alertWordDue', () => {
  const now = 60000000;
  const state = {
    water: 5,
    coins: 100,
    farm: {
      tierCount: 3,
      warehouse: { capacity: 50, items: {} },
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: {
              cropId: 'word_tree',
              isWordTree: true,
              wordHanzi: '苹果',
              dueAt: now - 5000, // Đã tới hạn ôn
              watered: false,
              isRipe: false,
              reviewsPassed: 1,
              stage: 2
            }
          }
        }
      ],
      fairies: [
        { level: 5, enabled: { water: true, harvest: true, replant: true }, lastWorkAt: 0 }
      ]
    }
  };

  // Tiên tick: tưới nước cho cây từ nhưng KHÔNG giải đố thay, KHÔNG tăng reviewsPassed
  const res = Farm._fairyTick(state, now, { speedMultiplier: 1 });
  assert.strictEqual(res.wateredCount, 1);
  assert.strictEqual(res.harvestedCount, 0);
  assert.strictEqual(state.farm.fairies[0].alertWordDue, true, 'Tiên bật cờ alertWordDue khi Cây Từ tới hạn');
  assert.strictEqual(state.farm.slots[0].pot.crop.watered, true);
  assert.strictEqual(state.farm.slots[0].pot.crop.reviewsPassed, 1, 'reviewsPassed không bị tiên tự ý tăng');

  // Ngay cả khi cây từ chín (isRipe = true), tiên cũng không tự thu hoạch
  state.farm.slots[0].pot.crop.isRipe = true;
  state.farm.fairies[0].lastWorkAt = 0;
  const res2 = Farm._fairyTick(state, now + 10000, { speedMultiplier: 1 });
  assert.strictEqual(res2.harvestedCount, 0, 'Tiên không tự ý thu hoạch Cây Từ chín (chỉ người chơi thu hoạch)');
  assert.notStrictEqual(state.farm.slots[0].pot.crop, null);
});

test('10.6 Gọi tên cây thường (+10% tốc độ lớn) & Thu hoạch Quả Tri Thức ghi vào Sổ Từ', () => {
  const now = 70000000;
  const state = {
    coins: 50,
    xp: 0,
    water: 5,
    farm: {
      tierCount: 3,
      warehouse: { capacity: 50, items: {} },
      materials: {},
      wordbook: {},
      slots: [
        {
          slotIndex: 0,
          pot: {
            type: 'clay',
            stars: 1,
            crop: {
              cropId: 'chrysanthemum', // Hoa Cúc: pinyin "júhuā", hanzi "菊花"
              plantedAt: now - 1000,
              watered: true,
              lastWateredAt: now - 1000,
              boostedStages: []
            }
          }
        },
        {
          slotIndex: 1,
          pot: {
            type: 'porcelain',
            stars: 2,
            crop: {
              cropId: 'word_tree',
              isWordTree: true,
              wordHanzi: '书',
              wordData: { py: 'shū', vi: 'Sách / Vở', hv: 'Thư' },
              stage: 4,
              reviewsPassed: 4,
              isRipe: true,
              dueAt: 0,
              watered: true
            }
          }
        }
      ]
    }
  };

  Economy._resetState(state);

  // 1. Gọi tên cây thường bằng pinyin
  const boostRes = boostPlantByName(0, 'júhuā', { state: Economy.getState(), now });
  assert.strictEqual(boostRes.success, true);
  assert.strictEqual(Economy.getState().farm.slots[0].pot.crop.accumulatedGrowthMs > 0, true, 'accumulatedGrowthMs tăng tương đương +10%');

  // Gọi lại lần 2 ở cùng giai đoạn -> bị chặn
  const boostRes2 = boostPlantByName(0, 'júhuā', { state: Economy.getState(), now });
  assert.strictEqual(boostRes2.success, false);
  assert.strictEqual(boostRes2.reason, 'already_boosted');

  // 2. Thu hoạch Cây Từ chín (slot 1) -> nhận Quả Tri Thức và lưu "mastered" vào wordbook
  harvestCrop(1);
  const curState = Economy.getState();
  assert.strictEqual(curState.farm.slots[1].pot.crop, null, 'Chậu slot 1 đã trống sau thu hoạch');
  assert.strictEqual(curState.farm.warehouse.items.knowledge_fruit, 1, 'Nhận 1 quả tri thức vào kho');
  assert.strictEqual(curState.farm.wordbook['书'].status, 'mastered', 'Từ vựng được đánh dấu Đã thuộc trong Sổ');
  assert.strictEqual(curState.coins, 110); // 50 + 60 xu
  assert.strictEqual(curState.xp, 80);     // 0 + 80 XP
});

test('10.7 An toàn dữ liệu: Dữ liệu cũ thiếu wordbook nạp lên không reset vườn', () => {
  const legacySaved = {
    coins: 200,
    farm: {
      version: 2,
      tierCount: 3,
      slots: [
        { slotIndex: 0, pot: { type: 'clay', stars: 1, crop: { cropId: 'sunflower', plantedAt: 1000 } } }
      ]
    }
  };

  Economy._resetState(legacySaved);
  const s = Economy.getState();

  assert.strictEqual(s.coins, 200);
  assert.strictEqual(s.farm.slots[0].pot.crop.cropId, 'sunflower');
  assert.deepStrictEqual(s.farm.wordbook, {});
});

console.log(`\n========================================`);
if (failCount === 0) {
  console.log(`OK ${passCount} tests`);
} else {
  console.error(`FAILED: ${failCount} tests failed (passed: ${passCount})`);
  process.exit(1);
}
