/**
 * game/economy.js - Hệ thống kinh tế, phần thưởng, nhiệm vụ và ví người học
 * Web học ngoại ngữ đa ngôn ngữ cho người Việt.
 * Hỗ trợ chạy cả trên trình duyệt và Node.js test runner.
 */

(function () {
  'use strict';

  let PolyIcons = null;
  if (typeof window !== 'undefined' && window.PolyIcons) {
    PolyIcons = window.PolyIcons;
  } else if (typeof require === 'function') {
    try {
      PolyIcons = require('../icons.js');
    } catch (e) {
      try {
        PolyIcons = require('./icons.js');
      } catch (e2) {
        PolyIcons = null;
      }
    }
  }

  function ecoIcon(name, opts = {}) {
    const pi = (typeof window !== 'undefined' && window.PolyIcons) || PolyIcons;
    if (pi && typeof pi.svg === 'function') {
      return pi.svg(name, opts);
    }
    return '';
  }

  /* ==========================================================================
     1. Cấu hình & Dữ liệu phần thưởng / Linh thú / Nhiệm vụ
     ========================================================================== */

  const STORAGE_KEY = 'app_wallet_v1';

  // Phần thưởng chuẩn theo hành động học tập
  const REWARDS = {
    lessonStep:     { xp: 5,  water: 1 },
    lessonDone:     { coins: 20, xp: 20 },
    lessonPerfect:  { coins: 10 },
    flashcard:      { coins: 1,  xp: 2 },
    quizCorrect:    { coins: 2,  xp: 3 },
    typingWord:     { coins: 1,  xp: 1 },
    speakPass:      { coins: 2,  xp: 4, water: 1 },
    toneCorrect:    { coins: 1,  xp: 1 },
    checkpointPass: { coins: 50, xp: 50 },
    videoWatched:   { coins: 15, xp: 20, water: 1 },
    videoShadow:    { coins: 3,  xp: 5,  water: 1 }
  };

  // 8 Linh thú theo văn hóa 4 nước: zh, ja, en, ru
  const PET_DEFS = {
    // Trung Quốc (zh)
    panda: {
      id: 'panda',
      name: 'Gấu trúc',
      country: 'zh',
      countryName: 'Trung Hoa',
      icon: '🐼',
      desc: '+1 giọt nước khi nhận thưởng có nước',
      effectType: 'water',
      waterBonus: (level) => 1
    },
    dragon: {
      id: 'dragon',
      name: 'Rồng con',
      country: 'zh',
      countryName: 'Trung Hoa',
      icon: '🐲',
      rare: true,
      desc: '+25% xu khi học bài (+5% mỗi cấp)',
      effectType: 'coin',
      coinMultiplier: (level) => 1.20 + (level * 0.05)
    },
    // Nhật Bản (ja)
    maneki_neko: {
      id: 'maneki_neko',
      name: 'Mèo thần tài',
      country: 'ja',
      countryName: 'Nhật Bản',
      icon: '🐱',
      desc: '+15% xu khi học bài (+5% mỗi cấp)',
      effectType: 'coin',
      coinMultiplier: (level) => 1.10 + (level * 0.05)
    },
    kitsune: {
      id: 'kitsune',
      name: 'Hồ ly chín đuôi',
      country: 'ja',
      countryName: 'Nhật Bản',
      icon: '🦊',
      desc: 'Cây trồng lớn nhanh hơn 20% (+5% mỗi cấp)',
      effectType: 'speed',
      speedBonus: (level) => 0.15 + (level * 0.05)
    },
    // Nước Anh (en)
    lion: {
      id: 'lion',
      name: 'Sư tử hoàng gia',
      country: 'en',
      countryName: 'Anh Quốc',
      icon: '🦁',
      desc: '+15% xu khi học bài (+5% mỗi cấp)',
      effectType: 'coin',
      coinMultiplier: (level) => 1.10 + (level * 0.05)
    },
    owl: {
      id: 'owl',
      name: 'Cú mèo học giả',
      country: 'en',
      countryName: 'Anh Quốc',
      icon: '🦉',
      desc: '+1 giọt nước khi học đạt chuẩn',
      effectType: 'water',
      waterBonus: (level) => 1
    },
    // Nước Nga (ru)
    misha: {
      id: 'misha',
      name: 'Gấu Misha',
      country: 'ru',
      countryName: 'Nước Nga',
      icon: '🐻',
      desc: 'Tăng 20% giá bán nông sản (+5% mỗi cấp)',
      effectType: 'sell',
      sellMultiplier: (level) => 1.15 + (level * 0.05)
    },
    firebird: {
      id: 'firebird',
      name: 'Chim lửa',
      country: 'ru',
      countryName: 'Nước Nga',
      icon: '🪶',
      rare: true,
      desc: 'Cây lớn nhanh 20% & +10% xu khi học',
      effectType: 'hybrid',
      speedBonus: (level) => 0.15 + (level * 0.05),
      coinMultiplier: (level) => 1.05 + (level * 0.05)
    }
  };

  // Chuỗi nhiệm vụ chính: "Đánh thức Cây Tri Thức" (Tiên Trúc dẫn chuyện)
  const TREE_AWAKENING_QUESTS = [
    {
      step: 1,
      title: 'Gieo Mầm Tri Thức',
      story: 'Chào bạn nhỏ! Cây Tri Thức đang say ngủ trong mây ngàn. Hãy cùng ta học bài đầu tiên để đánh thức mầm xanh nhé!',
      lessonId: 'intro-u1-l1',
      reqText: 'Hoàn thành Bài 1: 6 Vận mẫu đơn & Thanh điệu',
      reward: { coins: 30, seeds: { strawberry: 2 }, materials: { clay: 2 } }
    },
    {
      step: 2,
      title: 'Đón Ánh Bình Minh',
      story: 'Mầm non đã nhú lên đón ánh sáng! Hãy luyện các phụ âm đầu tiên để rễ cây cắm sâu vào mây ngàn.',
      lessonId: 'intro-u1-l2',
      reqText: 'Hoàn thành Bài 2: Thanh mẫu b, p, m, f, d, t, n, l',
      reward: { coins: 35, fertilizer: 1, materials: { clay: 2 } }
    },
    {
      step: 3,
      title: 'Vượt Trạm Thử Thách 1',
      story: 'Thử thách đầu tiên của Cây Tri Thức! Hãy vượt qua bài kiểm tra để cội rễ cắm sâu vào tầng mây thứ nhất.',
      checkpointId: 'intro-u1',
      reqText: 'Vượt Kiểm tra HSK1 phần 1 (Điểm ≥ 80%)',
      reward: { coins: 50, pots: { ceramic: 1 }, materials: { glaze: 2 } }
    },
    {
      step: 4,
      title: 'Nhánh Cây Vươn Xa',
      story: 'Tuyệt vời! Những cành cây đầu tiên đã xòe rộng. Cùng ta học cách chào hỏi để muôn hoa cùng nở rộ.',
      lessonId: 'intro-u2-l1',
      reqText: 'Hoàn thành Bài 3: Chào hỏi căn bản (你好)',
      reward: { coins: 40, seeds: { tomato: 2 }, materials: { clay: 3 } }
    },
    {
      step: 5,
      title: 'Lời Cảm Ơn Thân Thương',
      story: 'Tán cây đang rì rào reo vui! Hãy học cách cảm ơn và tạm biệt để chim muông ghé về làm tổ.',
      lessonId: 'intro-u2-l2',
      reqText: 'Hoàn thành Bài 4: Cảm ơn & Tạm biệt (谢谢)',
      reward: { coins: 45, water: 3, materials: { glaze: 2 } }
    },
    {
      step: 6,
      title: 'Vượt Trạm Thử Thách 2',
      story: 'Một tầng mây mới sắp mở ra! Hãy chứng minh năng lực để mở khóa tầng vườn cao hơn nhé.',
      checkpointId: 'intro-u2',
      reqText: 'Vượt Kiểm tra HSK1 phần 2 (Điểm ≥ 80%)',
      reward: { coins: 60, fertilizer: 2, materials: { glaze: 3 } }
    },
    {
      step: 7,
      title: 'Con Số Diệu Kỳ',
      story: 'Đại thụ đang đơm những nụ hoa đầu tiên! Cùng đếm số từ 1 đến 10 để quả chín ngọt ngào.',
      lessonId: 'hsk1-u1-l1',
      reqText: 'Hoàn thành Bài 5: Số đếm 1-10 (一二三)',
      reward: { coins: 50, seeds: { pumpkin: 2 }, materials: { jadePowder: 1 } }
    },
    {
      step: 8,
      title: 'Vượt Trạm Thử Thách 3',
      story: 'Cây Tri Thức đã bừng tỉnh rực rỡ! Vượt qua trạm này để đạt tới đỉnh mây Bồng Lai.',
      checkpointId: 'hsk1-u1',
      reqText: 'Vượt Kiểm tra HSK1 phần 3 (Điểm ≥ 80%)',
      reward: { coins: 80, pots: { porcelain: 1 }, materials: { jadePowder: 2 } }
    }
  ];

  // Điều kiện mở tầng: Tầng 4+ cần CẢ xu VÀ Checkpoint tương ứng
  const TIER_UNLOCK_CONDITIONS = {
    4: { cost: 500, checkpointId: 'intro-u1', checkpointName: 'Kiểm tra HSK1 phần 1' },
    5: { cost: 900, checkpointId: 'intro-u2', checkpointName: 'Kiểm tra HSK1 phần 2' },
    6: { cost: 1500, checkpointId: 'hsk1-u1', checkpointName: 'Kiểm tra HSK1 phần 3' },
    7: { cost: 2500, checkpointId: 'hsk1-u2', checkpointName: 'Kiểm tra HSK1 phần 4' },
    8: { cost: 4000, checkpointId: 'hsk1-u3', checkpointName: 'Kiểm tra HSK1 phần 5' }
  };

  // Điều kiện nâng tiên vườn: Cấp 3/4/5 cần đã học xong 5/10/20 bài
  const FAIRY_LESSON_REQUIREMENTS = {
    1: { cost: 100, lessonsNeeded: 0 },
    2: { cost: 250, lessonsNeeded: 0 },
    3: { cost: 500, lessonsNeeded: 5 },
    4: { cost: 1000, lessonsNeeded: 10 },
    5: { cost: 2000, lessonsNeeded: 20 }
  };

  // Danh mục nhiệm vụ cơ sở
  const QUESTS = [
    {
      id: 'quest_lesson_1',
      title: 'Học 1 bài học',
      desc: 'Hoàn thành 1 bài học bất kỳ trong ngày',
      target: 1,
      rewardKey: 'lessonDone',
      reward: { coins: 30 }
    },
    {
      id: 'quest_flashcard_10',
      title: 'Ôn 10 thẻ ghi nhớ',
      desc: 'Luyện tập và xem 10 thẻ flashcard',
      target: 10,
      rewardKey: 'flashcard',
      reward: { coins: 15 }
    },
    {
      id: 'quest_speak_5',
      title: '5 lần phát âm đạt',
      desc: 'Luyện phát âm chuẩn xác 5 lần',
      target: 5,
      rewardKey: 'speakPass',
      reward: { coins: 20, water: 2 }
    },
    {
      id: 'quest_xp_50',
      title: 'Đạt 50 KN trong ngày',
      desc: 'Tích lũy tối thiểu 50 kinh nghiệm hôm nay',
      target: 50,
      rewardType: 'xp',
      reward: { coins: 20 }
    }
  ];

  /* ==========================================================================
     2. Tiện ích Thời gian & Lưu trữ (Safe Storage)
     ========================================================================== */

  let _customNowFn = null;

  function getNow() {
    if (typeof _customNowFn === 'function') {
      const custom = _customNowFn();
      return custom instanceof Date ? custom : new Date(custom);
    }
    return new Date();
  }

  function formatDate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getDaysDiff(d1Str, d2Str) {
    if (!d1Str || !d2Str) return 999999;
    const [y1, m1, day1] = d1Str.split('-').map(Number);
    const [y2, m2, day2] = d2Str.split('-').map(Number);
    const utc1 = Date.UTC(y1, m1 - 1, day1);
    const utc2 = Date.UTC(y2, m2 - 1, day2);
    return Math.round((utc2 - utc1) / (1000 * 60 * 60 * 24));
  }

  // Bộ nhớ đệm khi chạy môi trường không có localStorage
  const memoryStore = {};

  function readStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const val = window.localStorage.getItem(STORAGE_KEY);
        if (val) return JSON.parse(val);
      } else if (memoryStore[STORAGE_KEY]) {
        return JSON.parse(memoryStore[STORAGE_KEY]);
      }
    } catch (e) {
      console.warn('[Economy] Lỗi đọc localStorage:', e);
    }
    return null;
  }

  function writeStorage(data) {
    try {
      const json = JSON.stringify(data);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, json);
      }
      memoryStore[STORAGE_KEY] = json;
    } catch (e) {
      console.warn('[Economy] Lỗi ghi localStorage:', e);
    }
  }

  function createInitialPlots(size) {
    const total = size * size;
    const plots = [];
    for (let i = 0; i < total; i++) {
      plots.push({
        id: i,
        cropId: null,
        plantedAt: null,
        wateredCount: 0,
        lastWateredAt: null
      });
    }
    return plots;
  }

  function createDefaultState() {
    const todayStr = formatDate(getNow());
    return {
      coins: 50,
      xp: 0,
      water: 3,
      streak: {
        count: 0,
        last: null
      },
      today: {
        date: todayStr,
        xp: 0,
        counts: {},
        gardenCounts: {},
        questsClaimed: [],
        dailyChestClaimed: false
      },
      treeQuestStep: 1,
      treeQuestClaimed: [],
      inventory: {},
      farm: {
        size: 3,
        plots: createInitialPlots(3)
      },
      pets: [],
      activePet: null,
      decor: [],
      history: []
    };
  }

  /* ==========================================================================
     3. Core Economy Class & Quản lý trạng thái
     ========================================================================== */

  let state = null;
  const listeners = [];
  const namedListeners = {};

  function emitNamed(eventName, ...args) {
    if (Array.isArray(namedListeners[eventName])) {
      namedListeners[eventName].forEach(cb => {
        try { cb(...args); } catch (e) { console.error('[Economy] Lỗi named listener:', e); }
      });
    }
  }

  function ensureState() {
    if (!state) {
      const saved = readStorage();
      state = Object.assign(createDefaultState(), saved || {});
      // Đảm bảo cấu trúc con không bị thiếu
      if (!state.streak) state.streak = { count: 0, last: null };
      if (!state.today) state.today = { date: formatDate(getNow()), xp: 0, counts: {}, gardenCounts: {}, questsClaimed: [], dailyChestClaimed: false };
      if (state.today.dailyChestClaimed === undefined) state.today.dailyChestClaimed = false;
      if (!state.today.counts) state.today.counts = {};
      if (!state.today.gardenCounts) state.today.gardenCounts = {};
      if (!Array.isArray(state.today.questsClaimed)) state.today.questsClaimed = [];
      if (state.treeQuestStep === undefined) state.treeQuestStep = 1;
      if (!Array.isArray(state.treeQuestClaimed)) state.treeQuestClaimed = [];
      if (!state.inventory) state.inventory = {};
      if (!state.farm) state.farm = { size: 3, plots: createInitialPlots(3) };
      if (state.farm && !state.farm.wordbook) state.farm.wordbook = {};
      // Vườn Treo (version 2) không dùng plots ô ruộng cũ — thêm vào sẽ khiến farm.js tưởng là dữ liệu cũ và tạo lại vườn
      if (state.farm.version !== 2 && (!state.farm.plots || state.farm.plots.length === 0)) {
        state.farm.plots = createInitialPlots(state.farm.size || 3);
      }
      if (!Array.isArray(state.pets)) state.pets = [];
      if (!Array.isArray(state.decor)) state.decor = [];
      if (!Array.isArray(state.history)) state.history = [];
    }

    // Kiểm tra chuyển ngày
    const todayStr = formatDate(getNow());
    if (state.today.date !== todayStr) {
      state.today = {
        date: todayStr,
        xp: 0,
        counts: {},
        gardenCounts: {},
        questsClaimed: [],
        dailyChestClaimed: false
      };
      save();
    }
    return state;
  }

  function save() {
    if (state) {
      writeStorage(state);
    }
  }

  function notify(changeMeta) {
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      try {
        const ev = new CustomEvent('economy:change', { detail: { state, change: changeMeta } });
        window.dispatchEvent(ev);
      } catch (e) {
        // Dự phòng môi trường cũ
      }
    }
    for (let i = 0; i < listeners.length; i++) {
      try {
        listeners[i](state, changeMeta);
      } catch (err) {
        console.error('[Economy] Lỗi listener:', err);
      }
    }
  }

  /* ==========================================================================
     4. Cấp độ & Linh thú
     ========================================================================== */

  /**
   * Tính cấp độ theo XP tích lũy:
   * Cấp n cần 100*n XP để lên cấp kế (Cấp 1 cần 100, Cấp 2 cần 200, Cấp 3 cần 300...).
   */
  function levelInfo(xp) {
    let safeXp = Math.max(0, Number(xp) || 0);
    let level = 1;
    while (true) {
      const needForNext = 100 * level;
      if (safeXp < needForNext) {
        return {
          level: level,
          cur: safeXp,
          need: needForNext
        };
      }
      safeXp -= needForNext;
      level++;
    }
  }

  function getActivePet() {
    ensureState();
    if (!state.activePet || !state.pets.length) return null;
    const pet = state.pets.find(p => p.id === state.activePet || p.type === state.activePet);
    // Nếu trứng chưa nở thì chưa kích hoạt hiệu ứng
    if (pet && pet.isEgg) return null;
    return pet || null;
  }

  function coinMultiplier() {
    const pet = getActivePet();
    if (!pet) return 1.0;
    const def = PET_DEFS[pet.type];
    if (def && typeof def.coinMultiplier === 'function') {
      return Number(def.coinMultiplier(pet.level || 1)) || 1.0;
    }
    return 1.0;
  }

  function waterBonus(rewardKey) {
    const pet = getActivePet();
    if (!pet) return 0;
    const def = PET_DEFS[pet.type];
    if (def && typeof def.waterBonus === 'function') {
      return Number(def.waterBonus(pet.level || 1)) || 0;
    }
    return 0;
  }

  /* ==========================================================================
     4b. Nắng Học Tập & Chuỗi ngày học
     ========================================================================== */

  function isLearningSunshineActive() {
    ensureState();
    const lessonsToday = (state.today.counts && state.today.counts.lessonDone) || 0;
    const xpToday = (state.today && state.today.xp) || 0;
    return lessonsToday >= 1 || xpToday >= 20;
  }

  function getStreakDecorations() {
    ensureState();
    const streak = (state.streak && state.streak.count) || 0;
    return {
      ribbon: streak >= 3,
      windChime: streak >= 7,
      lantern: streak >= 30,
      streakCount: streak
    };
  }

  function cropSpeedMultiplier() {
    let speed = 1.0;
    const pet = getActivePet();
    if (pet) {
      const def = PET_DEFS[pet.type];
      if (def && typeof def.speedBonus === 'function') {
        speed += (Number(def.speedBonus(pet.level || 1)) || 0);
      }
    }
    // Nắng học tập: Cây lớn nhanh hơn 15% khi có học trong ngày
    if (isLearningSunshineActive()) {
      speed += 0.15;
    }
    return speed;
  }

  function sellPriceMultiplier() {
    const pet = getActivePet();
    if (!pet) return 1.0;
    const def = PET_DEFS[pet.type];
    if (def && typeof def.sellMultiplier === 'function') {
      return Number(def.sellMultiplier(pet.level || 1)) || 1.0;
    }
    return 1.0;
  }

  /* ==========================================================================
     5. Streak & Nhận thưởng & Tiêu dùng
     ========================================================================== */

  function updateStreakOnEarn() {
    const todayStr = formatDate(getNow());
    const lastStr = state.streak.last;

    if (lastStr === todayStr) {
      return;
    }

    if (!lastStr) {
      state.streak.count = 1;
    } else {
      const diff = getDaysDiff(lastStr, todayStr);
      if (diff === 1) {
        state.streak.count = (state.streak.count || 0) + 1;
      } else if (diff > 1) {
        state.streak.count = 1;
      }
    }
    state.streak.last = todayStr;
  }

  function checkEggHatching(xpGained) {
    if (!xpGained || xpGained <= 0) return;
    let hatchedAny = false;
    state.pets.forEach(pet => {
      if (pet.isEgg) {
        pet.eggXpProgress = (pet.eggXpProgress || 0) + xpGained;
        if (pet.eggXpProgress >= (pet.eggXpNeeded || 100)) {
          pet.isEgg = false;
          pet.level = 1;
          hatchedAny = true;
          showToast(`${ecoIcon('sparkle', { className: 'eco-icon-toast' })} Trứng đã nở thành ${pet.name}!`);
        }
      }
    });
    return hatchedAny;
  }

  function earnInternal(source, amounts, incrementCount) {
    ensureState();
    const todayStr = formatDate(getNow());
    if (state.today.date !== todayStr) {
      state.today = {
        date: todayStr,
        xp: 0,
        counts: {},
        gardenCounts: {},
        questsClaimed: [],
        dailyChestClaimed: false
      };
    }

    updateStreakOnEarn();

    const coinsToAdd = Math.max(0, Math.round(Number(amounts && amounts.coins) || 0));
    const xpToAdd = Math.max(0, Math.round(Number(amounts && amounts.xp) || 0));
    const waterToAdd = Math.max(0, Math.round(Number(amounts && amounts.water) || 0));

    state.coins = Math.max(0, (state.coins || 0) + coinsToAdd);
    state.xp = Math.max(0, (state.xp || 0) + xpToAdd);
    state.water = Math.max(0, (state.water || 0) + waterToAdd);

    state.today.xp = (state.today.xp || 0) + xpToAdd;
    if (source && incrementCount) {
      state.today.counts[source] = (state.today.counts[source] || 0) + 1;
    }

    checkEggHatching(xpToAdd);

    const historyItem = {
      id: Date.now() + Math.random().toString(36).substring(2, 6),
      time: new Date(getNow()).toISOString(),
      source: source || 'unknown',
      coins: coinsToAdd,
      xp: xpToAdd,
      water: waterToAdd
    };
    state.history.unshift(historyItem);
    if (state.history.length > 50) {
      state.history.length = 50;
    }

    save();

    const meta = { type: 'earn', source, received: { coins: coinsToAdd, xp: xpToAdd, water: waterToAdd } };
    notify(meta);

    if (coinsToAdd > 0 || xpToAdd > 0 || waterToAdd > 0) {
      const parts = [];
      if (coinsToAdd > 0) parts.push(`+${coinsToAdd} xu`);
      if (xpToAdd > 0) parts.push(`+${xpToAdd} KN`);
      if (waterToAdd > 0) parts.push(`+${waterToAdd} nước`);
      showToast(parts.join(' · '));
    }

    return { coins: coinsToAdd, xp: xpToAdd, water: waterToAdd };
  }

  function earn(source, amounts) {
    return earnInternal(source, amounts, true);
  }

  function spend(n) {
    ensureState();
    const amount = Math.max(0, Math.round(Number(n) || 0));
    if (amount === 0) return true;
    if ((state.coins || 0) < amount) {
      return false;
    }
    state.coins -= amount;
    const historyItem = {
      id: Date.now() + Math.random().toString(36).substring(2, 6),
      time: new Date(getNow()).toISOString(),
      source: 'spend',
      coins: -amount,
      xp: 0,
      water: 0
    };
    state.history.unshift(historyItem);
    if (state.history.length > 50) state.history.length = 50;
    save();
    notify({ type: 'spend', amount });
    return true;
  }

  function reward(key, payload) {
    const base = REWARDS[key];
    if (!base) {
      console.warn(`[Economy] Phần thưởng không hợp lệ: "${key}"`);
      return { coins: 0, xp: 0, water: 0 };
    }

    ensureState();
    if (!state.today.counts) state.today.counts = {};

    // Quy tắc chống cày và phân loại bài mới / ôn tập
    if (key === 'lessonDone') {
      const isNew = !!(payload && payload.isNew);
      if (isNew) {
        state.today.counts.lessonNew = (state.today.counts.lessonNew || 0) + 1;
      } else {
        state.today.counts.lessonReview = (state.today.counts.lessonReview || 0) + 1;
      }
      state.today.counts.lessonDone = (state.today.counts.lessonDone || 0) + 1;
    } else if (key === 'flashcard') {
      const cur = state.today.counts.flashcard || 0;
      if (cur < 20) {
        state.today.counts.flashcard = cur + 1;
      }
    } else if (key === 'quizCorrect') {
      const cur = state.today.counts.quizCorrect || 0;
      if (cur < 20) {
        state.today.counts.quizCorrect = cur + 1;
      }
    } else if (key === 'videoWatched') {
      const cur = state.today.counts.videoWatched || 0;
      if (cur < 5) {
        state.today.counts.videoWatched = cur + 1;
      } else {
        return { coins: 0, xp: 0, water: 0, capped: true };
      }
    } else if (key === 'videoShadow') {
      const cur = state.today.counts.videoShadow || 0;
      if (cur < 30) {
        state.today.counts.videoShadow = cur + 1;
      } else {
        return { coins: 0, xp: 0, water: 0, capped: true };
      }
    } else {
      state.today.counts[key] = (state.today.counts[key] || 0) + 1;
    }

    const mult = coinMultiplier();
    const bonusW = base.water ? waterBonus(key) : 0;

    const coins = base.coins ? Math.round(base.coins * mult) : 0;
    const water = (base.water || 0) + bonusW;
    const xp = base.xp || 0;

    const res = earnInternal(key, { coins, xp, water }, false);

    emitNamed('reward', key, res, payload);
    return res;
  }

  /* ==========================================================================
     6. Nhiệm vụ ngày Thích ứng & Chuỗi Nhiệm vụ Tri Thức
     ========================================================================== */

  let _mockLearnProgress = null;

  function getLearnProgress() {
    if (_mockLearnProgress) return _mockLearnProgress;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem('zh_learn_progress_v1');
        if (raw) return JSON.parse(raw);
      }
    } catch (_) {}
    return { lessons: {}, checkpoints: {}, hardWords: {} };
  }

  function _setLearnProgress(prog) {
    _mockLearnProgress = prog;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('zh_learn_progress_v1', JSON.stringify(prog));
      }
    } catch (_) {}
  }

  let _mockMicSupport = null;

  function checkMicSupport() {
    if (_mockMicSupport !== null) return _mockMicSupport;
    if (typeof window !== 'undefined') {
      return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    }
    return true;
  }

  function _setMicSupport(val) {
    _mockMicSupport = val;
  }

  function recordGardenAction(actionKey, count = 1) {
    ensureState();
    if (!state.today.gardenCounts) state.today.gardenCounts = {};
    const add = Math.max(1, Number(count) || 1);
    state.today.gardenCounts[actionKey] = (state.today.gardenCounts[actionKey] || 0) + add;
    save();
    notify({ type: 'gardenAction', actionKey, count: add });
  }

  function recordWordReview(cropIdOrHanzi) {
    const prog = getLearnProgress();
    if (!prog.hardWords) prog.hardWords = {};
    const key = cropIdOrHanzi || 'unknown';
    if (!prog.hardWords[key]) {
      prog.hardWords[key] = { reviewsCount: 1, lastReviewed: new Date(getNow()).toISOString() };
    } else {
      prog.hardWords[key].reviewsCount = (prog.hardWords[key].reviewsCount || 0) + 1;
      prog.hardWords[key].lastReviewed = new Date(getNow()).toISOString();
    }
    _setLearnProgress(prog);
    notify({ type: 'wordReview', word: key });
  }

  function seededRNG(seedStr) {
    let h = 0x811c9dc5;
    for (let i = 0; i < seedStr.length; i++) {
      h ^= seedStr.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return (h >>> 0) / 4294967296;
    };
  }

  function generateDailyQuests(dateStr, options = {}) {
    const dStr = dateStr || formatDate(getNow());
    const rng = seededRNG('quest_' + dStr);
    const prog = options.learnProgress || getLearnProgress();
    const completedLessonCount = Object.keys(prog.lessons || {}).length;
    const hasMic = (options.hasMic !== undefined) ? options.hasMic : checkMicSupport();
    const playerLvl = options.playerLevel || (state ? levelInfo(state.xp).level : 1);

    const studyPool = [
      {
        type: 'lessonReview',
        title: 'Ôn 1 bài học cũ',
        key: 'lessonReview',
        target: 1,
        actionUrl: '#zh/learn',
        actionText: 'Đi ôn bài'
      },
      {
        type: 'flashcard',
        title: (t) => `Ôn ${t} thẻ ghi nhớ`,
        key: 'flashcard',
        baseTarget: 8,
        scale: 2,
        actionUrl: '#zh/flashcards',
        actionText: 'Ôn thẻ'
      },
      {
        type: 'quizCorrect',
        title: (t) => `Đúng ${t} câu trắc nghiệm`,
        key: 'quizCorrect',
        baseTarget: 6,
        scale: 2,
        actionUrl: '#zh/quiz',
        actionText: 'Làm trắc nghiệm'
      }
    ];

    if (hasMic) {
      studyPool.push({
        type: 'speakPass',
        title: (t) => `Đọc đúng ${t} câu`,
        key: 'speakPass',
        baseTarget: 4,
        scale: 1,
        actionUrl: '#zh/speak',
        actionText: 'Luyện đọc'
      });
    }

    const getVideoCount = () => {
      if (options && options.videoCount !== undefined) return options.videoCount;
      if (typeof window !== 'undefined') {
        if (Array.isArray(window.VIDEOS_ZH) && window.VIDEOS_ZH.length > 0) return window.VIDEOS_ZH.length;
        try {
          const local = JSON.parse(window.localStorage.getItem('zh_videos_local') || '[]');
          if (Array.isArray(local) && local.length > 0) return local.length;
        } catch (_) {}
      }
      return 0;
    };

    if (getVideoCount() >= 1) {
      studyPool.push({
        type: 'videoWatched',
        title: 'Xem 1 video',
        key: 'videoWatched',
        target: 1,
        actionUrl: '#zh/videos',
        actionText: 'Xem video'
      });
    }

    if (completedLessonCount > 0) {
      studyPool.unshift({
        type: 'lessonNew',
        title: 'Học 1 bài mới',
        key: 'lessonNew',
        target: 1,
        actionUrl: '#zh/learn',
        actionText: 'Học bài mới'
      });
    }

    const gardenPool = [
      {
        type: 'harvest',
        title: (t) => `Thu hoạch ${t} cây`,
        key: 'harvest',
        baseTarget: 3,
        scale: 1
      },
      {
        type: 'water',
        title: (t) => `Tưới ${t} chậu cây`,
        key: 'water',
        baseTarget: 5,
        scale: 1
      },
      {
        type: 'order',
        title: (t) => `Giao ${t} đơn hàng`,
        key: 'order',
        baseTarget: 1,
        scale: 0
      },
      {
        type: 'pest',
        title: (t) => `Bắt ${t} sâu bệnh`,
        key: 'pest',
        baseTarget: 2,
        scale: 0
      }
    ];

    const rewardsList = [
      { coins: 30, water: 2, materials: { clay: 2 } },
      { coins: 35, water: 2, fertilizer: 1 },
      { coins: 40, water: 3, materials: { glaze: 2 } }
    ];

    const quests = [];

    // Chưa học bài nào -> Nhiệm vụ 1 luôn là "Học bài đầu tiên"
    if (completedLessonCount === 0) {
      const q1Study = {
        type: 'lessonNew',
        title: 'Học bài đầu tiên',
        key: 'lessonNew',
        target: 1,
        actionUrl: '#zh/learn',
        actionText: 'Học bài 1'
      };
      const q1Garden = {
        type: 'water',
        title: 'Tưới 3 chậu cây',
        key: 'water',
        target: 3
      };
      quests.push({
        id: `daily_${dStr}_1`,
        title: `${q1Study.title} + ${q1Garden.title}`,
        study: q1Study,
        garden: q1Garden,
        reward: rewardsList[0]
      });
    }

    const remainingStudy = studyPool.filter(s => quests.length === 0 || s.type !== quests[0].study.type);
    for (let i = remainingStudy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [remainingStudy[i], remainingStudy[j]] = [remainingStudy[j], remainingStudy[i]];
    }

    const remainingGarden = [...gardenPool];
    if (quests.length > 0 && quests[0].garden) {
      const idx = remainingGarden.findIndex(g => g.type === quests[0].garden.type);
      if (idx !== -1) remainingGarden.splice(idx, 1);
    }
    for (let i = remainingGarden.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [remainingGarden[i], remainingGarden[j]] = [remainingGarden[j], remainingGarden[i]];
    }

    let studyIdx = 0;
    let gardenIdx = 0;

    while (quests.length < 3) {
      const sTemplate = remainingStudy[studyIdx % remainingStudy.length];
      studyIdx++;
      const gTemplate = remainingGarden[gardenIdx % remainingGarden.length];
      gardenIdx++;

      const sTarget = sTemplate.target || (sTemplate.baseTarget + Math.min(6, (playerLvl - 1) * (sTemplate.scale || 1)));
      const sTitle = typeof sTemplate.title === 'function' ? sTemplate.title(sTarget) : sTemplate.title;

      const gTarget = gTemplate.target || (gTemplate.baseTarget + Math.min(4, Math.floor((playerLvl - 1) / 2) * (gTemplate.scale || 1)));
      const gTitle = typeof gTemplate.title === 'function' ? gTemplate.title(gTarget) : gTemplate.title;

      const qIndex = quests.length + 1;
      quests.push({
        id: `daily_${dStr}_${qIndex}`,
        title: `${sTitle} + ${gTitle}`,
        study: {
          type: sTemplate.type,
          title: sTitle,
          key: sTemplate.key,
          target: sTarget,
          actionUrl: sTemplate.actionUrl,
          actionText: sTemplate.actionText
        },
        garden: {
          type: gTemplate.type,
          title: gTitle,
          key: gTemplate.key,
          target: gTarget
        },
        reward: rewardsList[qIndex - 1]
      });
    }

    return quests;
  }

  function questStatus(options) {
    ensureState();
    const todayStr = state.today.date;
    const quests = generateDailyQuests(todayStr, options);

    return quests.map(q => {
      const studyCur = (state.today.counts && state.today.counts[q.study.key]) || 0;
      const gardenCur = (state.today.gardenCounts && state.today.gardenCounts[q.garden.key]) || 0;

      const studyDone = studyCur >= q.study.target;
      const gardenDone = gardenCur >= q.garden.target;
      const completed = studyDone && gardenDone;
      const claimed = (state.today.questsClaimed || []).includes(q.id);

      const current = Math.min(studyCur, q.study.target) + Math.min(gardenCur, q.garden.target);
      const target = q.study.target + q.garden.target;

      return {
        id: q.id,
        title: q.title,
        desc: `${q.study.title} · ${q.garden.title}`,
        study: Object.assign({}, q.study, { current: Math.min(studyCur, q.study.target), completed: studyDone }),
        garden: Object.assign({}, q.garden, { current: Math.min(gardenCur, q.garden.target), completed: gardenDone }),
        reward: Object.assign({}, q.reward),
        current,
        target,
        completed,
        claimed
      };
    });
  }

  function claimQuest(id) {
    ensureState();
    const list = questStatus();
    const q = list.find(item => item.id === id);
    if (!q || !q.completed || q.claimed) {
      return false;
    }
    state.today.questsClaimed.push(id);

    const coinsToAdd = (q.reward && q.reward.coins) || 0;
    const waterToAdd = (q.reward && q.reward.water) || 0;
    earn(`quest:${id}`, { coins: coinsToAdd, water: waterToAdd });

    if (state.farm) {
      if (q.reward.fertilizer) {
        state.farm.fertilizer = (state.farm.fertilizer || 0) + q.reward.fertilizer;
      }
      if (q.reward.materials) {
        if (!state.farm.materials) state.farm.materials = {};
        Object.entries(q.reward.materials).forEach(([mKey, mVal]) => {
          state.farm.materials[mKey] = (state.farm.materials[mKey] || 0) + mVal;
        });
      }
    }

    save();
    notify({ type: 'claimQuest', questId: id, reward: q.reward });
    return true;
  }

  function claimDailyChest() {
    ensureState();
    const list = questStatus();
    const allClaimed = list.length === 3 && list.every(q => q.claimed);
    if (!allClaimed || state.today.dailyChestClaimed) {
      return false;
    }
    state.today.dailyChestClaimed = true;

    const chestReward = {
      coins: 100,
      water: 5,
      fertilizer: 2,
      rareSeed: null
    };

    const rng = Math.random();
    if (rng > 0.5) {
      const rareSeeds = ['ginseng', 'celestial_peach', 'pumpkin', 'plum_blossom'];
      chestReward.rareSeed = rareSeeds[Math.floor(Math.random() * rareSeeds.length)];
    }

    earn('daily_chest', { coins: chestReward.coins, water: chestReward.water });
    if (state.farm) {
      state.farm.fertilizer = (state.farm.fertilizer || 0) + chestReward.fertilizer;
      if (chestReward.rareSeed) {
        if (!state.farm.seedInventory) state.farm.seedInventory = {};
        state.farm.seedInventory[chestReward.rareSeed] = (state.farm.seedInventory[chestReward.rareSeed] || 0) + 1;
      }
    }

    save();
    notify({ type: 'claimDailyChest', reward: chestReward });
    showToast(`${ecoIcon('gift', { className: 'eco-icon-toast eco-icon-chest' })} Mở Rương Ngày: +100 xu, +5 nước, +2 phân bón${chestReward.rareSeed ? ` & Hạt giống ${chestReward.rareSeed}` : ''}!`);
    return chestReward;
  }

  function canUnlockTier(tier) {
    ensureState();
    const cfg = TIER_UNLOCK_CONDITIONS[tier];
    if (!cfg) {
      return { canUnlock: true, cost: 0, reqCheckpoint: null, checkpointPassed: true, hasCoins: true };
    }

    const prog = getLearnProgress();
    const cp = prog.checkpoints && prog.checkpoints[cfg.checkpointId];
    const checkpointPassed = !!(cp && (cp.passed || (cp.score !== undefined && cp.score >= 80)));
    const hasCoins = (state.coins || 0) >= cfg.cost;

    return {
      canUnlock: checkpointPassed && hasCoins,
      cost: cfg.cost,
      checkpointId: cfg.checkpointId,
      checkpointName: cfg.checkpointName,
      checkpointPassed,
      hasCoins
    };
  }

  function canUpgradeFairy(targetLevel) {
    ensureState();
    const cfg = FAIRY_LESSON_REQUIREMENTS[targetLevel];
    if (!cfg) {
      return { canUpgrade: true, cost: 0, reqLessons: 0, lessonsCompleted: 0, hasCoins: true };
    }

    const prog = getLearnProgress();
    const lessonsCompleted = Object.keys(prog.lessons || {}).length;
    const lessonsPassed = lessonsCompleted >= cfg.lessonsNeeded;
    const hasCoins = (state.coins || 0) >= cfg.cost;

    return {
      canUpgrade: lessonsPassed && hasCoins,
      cost: cfg.cost,
      reqLessons: cfg.lessonsNeeded,
      lessonsCompleted,
      lessonsPassed,
      hasCoins
    };
  }

  function getTreeAwakeningStatus() {
    ensureState();
    const curStepNum = state.treeQuestStep || 1;
    const prog = getLearnProgress();
    const quests = TREE_AWAKENING_QUESTS.map(q => {
      let isUnlocked = q.step <= curStepNum;
      let isCompleted = false;

      if (q.lessonId) {
        const l = prog.lessons && prog.lessons[q.lessonId];
        isCompleted = !!(l && (l.stars > 0 || l.score > 0));
      } else if (q.checkpointId) {
        const cp = prog.checkpoints && prog.checkpoints[q.checkpointId];
        isCompleted = !!(cp && (cp.passed || (cp.score !== undefined && cp.score >= 80)));
      }

      const isClaimed = (state.treeQuestClaimed || []).includes(q.step);

      return {
        step: q.step,
        title: q.title,
        story: q.story,
        reqText: q.reqText,
        lessonId: q.lessonId,
        checkpointId: q.checkpointId,
        reward: q.reward,
        isUnlocked,
        isCompleted,
        isClaimed
      };
    });

    const activeQuest = quests.find(q => q.step === curStepNum) || quests[quests.length - 1];
    return {
      currentStep: curStepNum,
      activeQuest,
      allQuests: quests,
      allDone: curStepNum > TREE_AWAKENING_QUESTS.length
    };
  }

  function claimTreeAwakening(stepNum) {
    ensureState();
    const status = getTreeAwakeningStatus();
    const q = status.allQuests.find(item => item.step === stepNum);
    if (!q || !q.isCompleted || q.isClaimed || stepNum !== state.treeQuestStep) {
      return false;
    }

    state.treeQuestClaimed.push(stepNum);
    state.treeQuestStep = stepNum + 1;

    const rew = q.reward || {};
    earn(`tree_quest_${stepNum}`, { coins: rew.coins || 0, water: rew.water || 0 });

    if (state.farm) {
      if (rew.fertilizer) {
        state.farm.fertilizer = (state.farm.fertilizer || 0) + rew.fertilizer;
      }
      if (rew.materials) {
        if (!state.farm.materials) state.farm.materials = {};
        Object.entries(rew.materials).forEach(([mKey, mVal]) => {
          state.farm.materials[mKey] = (state.farm.materials[mKey] || 0) + mVal;
        });
      }
      if (rew.seeds) {
        if (!state.farm.seedInventory) state.farm.seedInventory = {};
        Object.entries(rew.seeds).forEach(([sKey, sVal]) => {
          state.farm.seedInventory[sKey] = (state.farm.seedInventory[sKey] || 0) + sVal;
        });
      }
      if (rew.pots) {
        if (!state.farm.potInventory) state.farm.potInventory = {};
        Object.entries(rew.pots).forEach(([pKey, pVal]) => {
          state.farm.potInventory[pKey] = (state.farm.potInventory[pKey] || 0) + pVal;
        });
      }
    }

    save();
    notify({ type: 'claimTreeAwakening', step: stepNum, reward: rew });
    showToast(`${ecoIcon('sparkle', { className: 'eco-icon-toast eco-icon-star' })} Tiên Trúc: Chúc mừng bạn hoàn thành Bước ${stepNum}: ${q.title}!`);
    return true;
  }

  /* ==========================================================================
     7. Toast Notification (Góc dưới phải)
     ========================================================================== */

  let toastContainer = null;

  function ensureToastContainer() {
    if (typeof document === 'undefined') return null;
    if (!toastContainer || !document.body.contains(toastContainer)) {
      toastContainer = document.getElementById('economy-toast-container');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'economy-toast-container';
        toastContainer.setAttribute('role', 'status');
        toastContainer.setAttribute('aria-live', 'polite');
        toastContainer.setAttribute('aria-atomic', 'true');
        toastContainer.style.cssText = [
          'position: fixed',
          'bottom: 24px',
          'right: 24px',
          'display: flex',
          'flex-direction: column',
          'gap: 10px',
          'z-index: 10000',
          'pointer-events: none',
          'font-family: inherit'
        ].join(';');
        document.body.appendChild(toastContainer);
      }
    }
    return toastContainer;
  }

  function showToast(text) {
    if (typeof document === 'undefined' || !text) return;
    const container = ensureToastContainer();
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'economy-toast-item';
    if (typeof text === 'string' && (text.includes('<svg') || text.includes('<span') || text.includes('</'))) {
      toast.innerHTML = text;
    } else {
      toast.textContent = text;
    }
    toast.style.cssText = [
      'background: rgba(17, 24, 39, 0.94)',
      'color: #ffffff',
      'border: 1px solid rgba(255, 255, 255, 0.16)',
      'box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
      'padding: 10px 18px',
      'border-radius: 9999px',
      'font-size: 14px',
      'font-weight: 600',
      'letter-spacing: 0.2px',
      'display: flex',
      'align-items: center',
      'gap: 8px',
      'opacity: 0',
      'transform: translateY(16px)',
      'transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      'pointer-events: auto'
    ].join(';');

    container.appendChild(toast);

    // Kích hoạt animation hiện
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    // Tự biến mất sau 2.4s
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2400);
  }

  /* ==========================================================================
     8. Header Widget Chip
     ========================================================================== */

  function mountWidget(target) {
    if (typeof document === 'undefined') return;
    const el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el) return;

    function render() {
      ensureState();
      const info = levelInfo(state.xp);
      el.innerHTML = `
        <div class="economy-widget-chip" title="Bấm để tới Nông Trại Tri Thức" style="
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05));
          font-size: 13px;
          font-weight: 600;
          color: var(--text, #0f172a);
          cursor: pointer;
          user-select: none;
          transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
        ">
          <span class="eco-chip-coins" style="display:inline-flex; align-items:center; gap:4px;" title="Xu học tập">${ecoIcon('coin', { className: 'eco-icon-coins', size: 16 })} <span class="eco-val-coins">${state.coins || 0}</span></span>
          <span class="eco-sep eco-sep-water" style="opacity:0.3;">•</span>
          <span class="eco-chip-water" style="display:inline-flex; align-items:center; gap:4px;" title="Giọt nước tưới cây">${ecoIcon('droplet', { className: 'eco-icon-water', size: 16 })} <span class="eco-val-water">${state.water || 0}</span></span>
          <span class="eco-sep eco-sep-streak" style="opacity:0.3;">•</span>
          <span class="eco-chip-streak" style="display:inline-flex; align-items:center; gap:4px;" title="Chuỗi ngày học liên tục">${ecoIcon('fire', { className: 'eco-icon-streak', size: 16 })} <span class="eco-val-streak">${(state.streak && state.streak.count) || 0}</span></span>
          <span class="eco-sep eco-sep-level" style="opacity:0.3;">•</span>
          <span class="eco-chip-level" style="display:inline-flex; align-items:center; gap:4px; color:var(--accent, #b3261e);" title="Cấp độ người học">${ecoIcon('star', { className: 'eco-icon-level', size: 16 })} Cấp ${info.level}</span>
        </div>
      `;

      const chip = el.querySelector('.economy-widget-chip');
      if (chip) {
        chip.onmouseenter = () => {
          chip.style.transform = 'translateY(-1px)';
          chip.style.borderColor = 'var(--accent, #b3261e)';
          chip.style.boxShadow = 'var(--shadow-md, 0 4px 12px rgba(0,0,0,0.08))';
        };
        chip.onmouseleave = () => {
          chip.style.transform = 'translateY(0)';
          chip.style.borderColor = 'var(--border, #e2e8f0)';
          chip.style.boxShadow = 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05))';
        };
        chip.onclick = () => {
          if (typeof window !== 'undefined') {
            window.location.hash = '#farm';
          }
        };
      }
    }

    render();
    return on(() => render());
  }

  /* ==========================================================================
     9. Event Listeners & Public API
     ========================================================================== */

  function on(eventOrCb, cb) {
    if (typeof eventOrCb === 'function') {
      listeners.push(eventOrCb);
      return () => {
        const idx = listeners.indexOf(eventOrCb);
        if (idx !== -1) listeners.splice(idx, 1);
      };
    }
    if (typeof eventOrCb === 'string' && typeof cb === 'function') {
      if (!namedListeners[eventOrCb]) namedListeners[eventOrCb] = [];
      namedListeners[eventOrCb].push(cb);
      return () => {
        const arr = namedListeners[eventOrCb];
        if (arr) {
          const idx = arr.indexOf(cb);
          if (idx !== -1) arr.splice(idx, 1);
        }
      };
    }
    return () => {};
  }

  function getState() {
    return ensureState();
  }

  function _setNow(fn) {
    _customNowFn = fn;
    // Kiểm tra lại ngày nếu state đang nạp
    if (state) {
      const todayStr = formatDate(getNow());
      if (state.today && state.today.date !== todayStr) {
        state.today = {
          date: todayStr,
          xp: 0,
          counts: {},
          gardenCounts: {},
          questsClaimed: [],
          dailyChestClaimed: false
        };
      }
    }
  }

  function _resetState(customInitial) {
    state = Object.assign(createDefaultState(), customInitial || {});
    if (state.farm && !state.farm.wordbook) state.farm.wordbook = {};
    save();
    notify({ type: 'reset' });
  }

  const Economy = {
    REWARDS,
    QUESTS,
    PET_DEFS,
    TREE_AWAKENING_QUESTS,
    TIER_UNLOCK_CONDITIONS,
    FAIRY_LESSON_REQUIREMENTS,
    reward,
    earn,
    spend,
    getState,
    saveState: save,
    levelInfo,
    coinMultiplier,
    waterBonus,
    cropSpeedMultiplier,
    sellPriceMultiplier,
    questStatus,
    claimQuest,
    claimDailyChest,
    generateDailyQuests,
    isLearningSunshineActive,
    getStreakDecorations,
    recordGardenAction,
    recordWordReview,
    getLearnProgress,
    _setLearnProgress,
    checkMicSupport,
    _setMicSupport,
    canUnlockTier,
    canUpgradeFairy,
    getTreeAwakeningStatus,
    claimTreeAwakening,
    mountWidget,
    showToast,
    on,
    _setNow,
    _resetState
  };

  /* ==========================================================================
     10. Window Export & Node.js Module Export
     ========================================================================== */

  if (typeof window !== 'undefined') {
    window.Economy = Economy;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Economy;
  }

})();
