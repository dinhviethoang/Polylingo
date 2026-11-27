/**
 * PORTAL.JS — Trang chủ chung Polylingo
 * Nền tảng học đa ngôn ngữ tinh giản cho người Việt
 * IIFE module: window.Portal = { render(containerEl) }
 */
(function () {
  'use strict';

  const ic = (n, opts) => (typeof window !== 'undefined' && window.PolyIcons ? window.PolyIcons.svg(n, opts) : (typeof PolyIcons !== 'undefined' ? PolyIcons.svg(n, opts) : ''));

  /* ==========================================================================
     1. TIỆN ÍCH DỮ LIỆU & AN TOÀN
     ========================================================================== */

  function safeGetEconomy() {
    if (typeof window !== 'undefined' && window.Economy) {
      try {
        const state = typeof window.Economy.getState === 'function' ? window.Economy.getState() : {};
        const levelInf = typeof window.Economy.levelInfo === 'function' ? window.Economy.levelInfo(state.xp || 0) : { level: 1, cur: 0, need: 100, pct: 0 };
        const quests = typeof window.Economy.questStatus === 'function' ? window.Economy.questStatus() : [];
        return { state, levelInf, quests };
      } catch (e) {
        console.warn('[Portal] Economy fetch error:', e);
      }
    }
    return {
      state: { coins: 50, water: 3, xp: 0, streak: 0, farm: { plots: [] }, pets: [], activePet: null, today: { xp: 0 } },
      levelInf: { level: 1, cur: 0, need: 100, pct: 0 },
      quests: []
    };
  }

  function safeGetZhProgress() {
    try {
      const raw = localStorage.getItem('zh_learn_progress_v1');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('[Portal] Progress parse error:', e);
    }
    return { lessons: {}, checkpoints: {}, hardWords: {} };
  }

  function safeGetEnProgress() {
    try {
      const raw = localStorage.getItem('en_learn_progress_v1');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('[Portal] EN Progress parse error:', e);
    }
    return { lessons: {}, checkpoints: {}, hardWords: {} };
  }

  function getGreetingByHour() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Chào buổi sáng';
    if (hour >= 12 && hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  }

  function getWordOfTheDay() {
    const dict = (typeof window !== 'undefined' && window.HSK1_WORDS) || {};
    const keys = Object.keys(dict).filter(k => {
      const item = dict[k];
      return item && item.py && item.vi;
    });

    if (!keys.length) {
      return {
        char: '学',
        py: 'xué',
        vi: 'học, học tập, nghiên cứu',
        hv: 'học'
      };
    }

    const now = new Date();
    // Deterministic seed per calendar day
    const seed = now.getFullYear() * 372 + (now.getMonth() + 1) * 31 + now.getDate();
    const char = keys[Math.abs(seed) % keys.length];
    const data = dict[char];
    return {
      char,
      py: data.py || '',
      vi: data.vi || '',
      hv: data.hv || ''
    };
  }

  function getNextLesson(progress) {
    const curriculum = (typeof window !== 'undefined' && window.CURRICULUM) || null;
    if (!curriculum) return null;

    if (typeof window !== 'undefined' && window.LearnPath && typeof window.LearnPath.nextLesson === 'function') {
      try {
        const found = window.LearnPath.nextLesson(curriculum, progress);
        if (found) return found;
      } catch (e) {
        console.warn('[Portal] LearnPath.nextLesson error:', e);
      }
    }

    // Fallback traversal: intro -> hsk1
    if (curriculum.levels) {
      const targetLevels = curriculum.levels.filter(l => l.id === 'intro' || l.id === 'hsk1');
      for (const lvl of targetLevels) {
        if (!lvl.units) continue;
        for (const u of lvl.units) {
          if (!u.lessons) continue;
          for (const lsn of u.lessons) {
            if (!progress.lessons || !progress.lessons[lsn.id]) {
              return {
                ...lsn,
                levelId: lvl.id,
                levelName: lvl.name || lvl.band || 'Cấp 0',
                unitId: u.id,
                unitTitle: u.title || ''
              };
            }
          }
        }
      }
    }
    return null;
  }

  function speakChinese(text) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'zh-CN';
      utt.rate = 0.85;
      window.speechSynthesis.speak(utt);
    } catch (e) {
      console.warn('[Portal] Speech synthesis error:', e);
    }
  }

  /* ==========================================================================
     2. TRANH MINH HỌA GIẤY CẮT NHIỀU LỚP (SVG PAPER-CUT)
     ========================================================================== */

  // 1. TRUNG HOA (zh) — Quế Lâm, Mây lành, Mái đình cong, Đèn lồng, Tông đỏ son / vàng kim / mực đậm
  function renderSvgChina() {
    return `
      <svg class="hp-poster-svg" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hp-zh-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FDF4E3" />
            <stop offset="30%" stop-color="#F7C8A4" />
            <stop offset="65%" stop-color="#D95338" />
            <stop offset="100%" stop-color="#91141B" />
          </linearGradient>
          <radialGradient id="hp-zh-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFF5DF" stop-opacity="0.9" />
            <stop offset="60%" stop-color="#F4C76D" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#E28154" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Lớp 0: Bầu trời hoàng hôn -->
        <rect width="300" height="400" fill="url(#hp-zh-sky)" />
        <circle cx="150" cy="115" r="50" fill="url(#hp-zh-sun)" class="hp-layer-back" />

        <!-- Lớp 1: Núi đá vôi Quế Lâm xa mờ -->
        <g class="hp-layer-back" fill="#B24536" opacity="0.45">
          <path d="M-20 280 C10 220 35 150 70 170 C100 185 120 250 145 280 Z" />
          <path d="M110 280 C135 180 160 120 190 140 C220 160 235 240 260 280 Z" />
          <path d="M210 280 C240 200 265 160 285 175 C310 190 320 250 330 280 Z" />
        </g>

        <!-- Lớp 2: Rặng núi Quế Lâm trung cảnh sắc sảo -->
        <g class="hp-layer-mid" fill="#8C171C" opacity="0.75">
          <path d="M-10 320 C20 230 45 165 75 190 C100 210 115 280 135 320 Z" />
          <path d="M150 320 C180 205 205 155 235 180 C265 200 285 270 310 320 Z" />
        </g>

        <!-- Lớp 3: Mây lành truyền thống (Xiángyún) màu vàng kim -->
        <g class="hp-layer-mid" fill="#E5B248" opacity="0.8">
          <path d="M15 130 C25 120 45 120 52 130 C60 125 75 128 80 136 C85 145 78 152 65 152 C45 152 30 152 18 148 C10 144 8 135 15 130 Z" />
          <path d="M30 135 C38 128 50 132 48 140 C46 145 38 146 34 142 Z" fill="#F8E5AA" opacity="0.7" />
          <path d="M210 95 C222 85 245 86 252 96 C262 92 278 96 282 105 C286 114 278 120 265 120 C245 120 228 120 215 115 C206 110 204 100 210 95 Z" />
        </g>

        <!-- Lớp 4: Mái đình cong đỏ son (Cổ đình lộng gió) -->
        <g class="hp-layer-fore" fill="#42080C">
          <path d="M148 185 L150 172 L152 185 Z" fill="#D4A537" />
          <circle cx="150" cy="170" r="3.5" fill="#D4A537" />
          <path d="M70 218 C110 208 135 188 150 185 C165 188 190 208 230 218 C205 212 180 205 150 204 C120 205 95 212 70 218 Z" />
          <path d="M85 215 L215 215 L205 226 L95 226 Z" />
          <path d="M30 262 C95 248 130 222 150 219 C170 222 205 248 270 262 C230 252 195 242 150 241 C105 242 70 252 30 262 Z" />
          <rect x="75" y="260" width="8" height="85" />
          <rect x="110" y="260" width="7" height="85" />
          <rect x="183" y="260" width="7" height="85" />
          <rect x="217" y="260" width="8" height="85" />
          <rect x="65" y="318" width="170" height="6" />
          <rect x="65" y="338" width="170" height="7" />
          <path d="M83 324 H107 M117 324 H183 M190 324 H217" stroke="#D4A537" stroke-width="2" />
        </g>

        <!-- Lớp 5: Hai đèn lồng đỏ son viền vàng kim treo dưới mái đình -->
        <g class="hp-layer-accent">
          <line x1="62" y1="260" x2="62" y2="274" stroke="#D4A537" stroke-width="1.5" />
          <rect x="56" y="274" width="12" height="3" fill="#D4A537" rx="1" />
          <ellipse cx="62" cy="287" rx="9" ry="11" fill="#B5121B" />
          <ellipse cx="62" cy="287" rx="4" ry="11" fill="#D42D22" />
          <rect x="56" y="297" width="12" height="3" fill="#D4A537" rx="1" />
          <path d="M60 300 L58 318 M62 300 L62 320 M64 300 L66 318" stroke="#D4A537" stroke-width="1.2" />

          <line x1="238" y1="260" x2="238" y2="274" stroke="#D4A537" stroke-width="1.5" />
          <rect x="232" y="274" width="12" height="3" fill="#D4A537" rx="1" />
          <ellipse cx="238" cy="287" rx="9" ry="11" fill="#B5121B" />
          <ellipse cx="238" cy="287" rx="4" ry="11" fill="#D42D22" />
          <rect x="232" y="297" width="12" height="3" fill="#D4A537" rx="1" />
          <path d="M236 300 L234 318 M238 300 L238 320 M240 300 L242 318" stroke="#D4A537" stroke-width="1.2" />
        </g>

        <!-- Lớp 6: Mực đậm soi bóng nước Quế Lâm -->
        <path d="M0 345 C60 340 120 348 180 344 C240 340 270 346 300 344 L300 400 L0 400 Z" fill="#1A0D0E" class="hp-layer-fore" />
        <ellipse cx="150" cy="375" rx="80" ry="3" fill="#3D1216" opacity="0.8" />
      </svg>
    `;
  }

  // 2. NHẬT BẢN (ja) — Núi Phú Sĩ đỉnh tuyết, Cổng Torii đỏ, Cành anh đào hồng, Chàm / Kem
  function renderSvgJapan() {
    return `
      <svg class="hp-poster-svg" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hp-ja-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFF3F4" />
            <stop offset="30%" stop-color="#FCDCE3" />
            <stop offset="65%" stop-color="#93B4D7" />
            <stop offset="100%" stop-color="#1F3A5F" />
          </linearGradient>
          <radialGradient id="hp-ja-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFF0F2" stop-opacity="0.95" />
            <stop offset="45%" stop-color="#F7B5C4" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#7EA4CD" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Lớp 0: Bầu trời bình minh & mặt trời mọc nhẹ -->
        <rect width="300" height="400" fill="url(#hp-ja-sky)" />
        <circle cx="150" cy="130" r="56" fill="url(#hp-ja-sun)" class="hp-layer-back" />

        <!-- Lớp 1: Núi Phú Sĩ -->
        <g class="hp-layer-back">
          <path d="M150 115 C132 155 90 240 10 295 L290 295 C210 240 168 155 150 115 Z" fill="#24436C" />
          <path d="M150 115 C141 135 125 160 112 178 C120 185 128 174 135 186 C143 172 147 188 153 175 C160 186 166 172 173 184 C181 175 185 182 188 178 C175 160 159 135 150 115 Z" fill="#FFFFFF" />
          <path d="M125 174 C132 165 140 170 145 160 C155 168 162 160 168 172" stroke="#E6EEF8" stroke-width="2" fill="none" />
        </g>

        <!-- Lớp 2: Làn sương trắng và đồi thông mờ ảo -->
        <g class="hp-layer-mid" opacity="0.6">
          <path d="M-10 270 C50 255 110 275 180 260 C240 250 275 268 310 260 L310 295 L-10 295 Z" fill="#FFF4F6" />
          <path d="M-10 288 C60 275 120 285 200 278 C250 272 285 285 310 280 L310 320 L-10 320 Z" fill="#1B3354" />
        </g>

        <!-- Lớp 3: Cổng Torii truyền thống đỏ son giữa hồ nước -->
        <g class="hp-layer-fore">
          <path d="M102 245 C125 242 175 242 198 245 L200 251 C175 248 125 248 100 251 Z" fill="#B5201C" />
          <rect x="108" y="254" width="84" height="4.5" fill="#B5201C" />
          <rect x="147" y="251" width="6" height="8" fill="#1F3A5F" />
          <path d="M118 258 L114 325 L121 325 L124 258 Z" fill="#B5201C" />
          <path d="M182 258 L186 325 L179 325 L176 258 Z" fill="#B5201C" />
          <rect x="113" y="318" width="9" height="7" fill="#131B26" />
          <rect x="178" y="318" width="9" height="7" fill="#131B26" />
        </g>

        <!-- Lớp 4: Cành hoa anh đào (Sakura) vươn từ góc trên phải -->
        <g class="hp-layer-accent">
          <path d="M310 50 C260 65 240 100 200 115 C175 125 155 120 135 130" stroke="#3D201A" stroke-width="4.5" stroke-linecap="round" fill="none" />
          <path d="M230 105 C210 120 195 145 180 155" stroke="#3D201A" stroke-width="3" stroke-linecap="round" fill="none" />
          <path d="M265 80 C245 95 235 90 220 98" stroke="#3D201A" stroke-width="2.5" stroke-linecap="round" fill="none" />

          <g transform="translate(198, 112)">
            <circle cx="0" cy="-6" r="4.5" fill="#F2B5C4" />
            <circle cx="6" cy="-2" r="4.5" fill="#F2B5C4" />
            <circle cx="4" cy="5" r="4.5" fill="#F2B5C4" />
            <circle cx="-4" cy="5" r="4.5" fill="#F2B5C4" />
            <circle cx="-6" cy="-2" r="4.5" fill="#F2B5C4" />
            <circle cx="0" cy="0" r="2.5" fill="#D44265" />
          </g>
          <g transform="translate(165, 128)">
            <circle cx="0" cy="-5" r="4" fill="#F8C6D2" />
            <circle cx="5" cy="-2" r="4" fill="#F8C6D2" />
            <circle cx="3" cy="4" r="4" fill="#F8C6D2" />
            <circle cx="-3" cy="4" r="4" fill="#F8C6D2" />
            <circle cx="-5" cy="-2" r="4" fill="#F8C6D2" />
            <circle cx="0" cy="0" r="2" fill="#D44265" />
          </g>
          <g transform="translate(240, 78)">
            <circle cx="0" cy="-6" r="4.5" fill="#F2B5C4" />
            <circle cx="6" cy="-2" r="4.5" fill="#F2B5C4" />
            <circle cx="4" cy="5" r="4.5" fill="#F2B5C4" />
            <circle cx="-4" cy="5" r="4.5" fill="#F2B5C4" />
            <circle cx="-6" cy="-2" r="4.5" fill="#F2B5C4" />
            <circle cx="0" cy="0" r="2.5" fill="#D44265" />
          </g>
          <ellipse cx="140" cy="165" rx="3" ry="5" transform="rotate(35 140 165)" fill="#F2B5C4" opacity="0.9" />
          <ellipse cx="120" cy="205" rx="2.5" ry="4.5" transform="rotate(-25 120 205)" fill="#F8C6D2" opacity="0.85" />
          <ellipse cx="90" cy="260" rx="3" ry="5" transform="rotate(50 90 260)" fill="#F2B5C4" opacity="0.8" />
          <ellipse cx="210" cy="230" rx="2.5" ry="4" transform="rotate(-40 210 230)" fill="#F8C6D2" opacity="0.85" />
        </g>

        <!-- Lớp 5: Mặt nước hồ phẳng lặng phản chiếu đêm chàm -->
        <path d="M0 325 C80 320 160 328 240 322 C270 320 290 324 300 322 L300 400 L0 400 Z" fill="#10213A" class="hp-layer-fore" />
        <line x1="110" y1="334" x2="190" y2="334" stroke="#254773" stroke-width="2" opacity="0.6" />
        <line x1="80" y1="348" x2="220" y2="348" stroke="#1F3A5F" stroke-width="1.5" opacity="0.5" />
      </svg>
    `;
  }

  // 3. ANH QUỐC (en) — London Skyline, Tháp Big Ben, Cầu Tower, Hoàng hôn rực rỡ, Navy / Đỏ đô / Vàng ấm
  function renderSvgEnglish() {
    return `
      <svg class="hp-poster-svg" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hp-en-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#241129" />
            <stop offset="35%" stop-color="#6B1D3E" />
            <stop offset="65%" stop-color="#D95C32" />
            <stop offset="90%" stop-color="#FCA311" />
            <stop offset="100%" stop-color="#E59929" />
          </linearGradient>
          <radialGradient id="hp-en-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFF0BE" stop-opacity="0.9" />
            <stop offset="50%" stop-color="#FCA311" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#D95C32" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Lớp 0: Bầu trời hoàng hôn London -->
        <rect width="300" height="400" fill="url(#hp-en-sky)" />
        <circle cx="205" cy="155" r="44" fill="url(#hp-en-sun)" class="hp-layer-back" />

        <!-- Lớp 1: Đường chân trời xa mờ (Vòm St. Paul) -->
        <g class="hp-layer-back" fill="#5E1C38" opacity="0.55">
          <path d="M190 240 L190 215 C190 200 210 200 210 215 L210 240 Z" />
          <circle cx="200" cy="198" r="14" />
          <line x1="200" y1="184" x2="200" y2="175" stroke="#5E1C38" stroke-width="2" />
          <rect x="220" y="210" width="16" height="40" />
          <rect x="245" y="195" width="22" height="55" />
          <path d="M275 250 L285 200 L295 250 Z" />
        </g>

        <!-- Lớp 2: Tháp Cầu Luân Đôn (Tower Bridge) trung cảnh -->
        <g class="hp-layer-mid" fill="#3D1429" opacity="0.85">
          <rect x="155" y="200" width="16" height="65" />
          <path d="M153 200 L163 175 L173 200 Z" />
          <rect x="225" y="200" width="16" height="65" />
          <path d="M223 200 L233 175 L243 200 Z" />
          <rect x="171" y="185" width="54" height="4" />
          <rect x="171" y="192" width="54" height="3" />
          <path d="M125 245 Q140 220 155 205" stroke="#3D1429" stroke-width="2.5" fill="none" />
          <path d="M241 205 Q265 220 285 245" stroke="#3D1429" stroke-width="2.5" fill="none" />
          <rect x="125" y="245" width="150" height="7" />
        </g>

        <!-- Lớp 3: Cung điện Westminster & Tháp Big Ben -->
        <g class="hp-layer-fore" fill="#14213D">
          <rect x="42" y="195" width="46" height="135" />
          <path d="M42 195 L65 110 L88 195 Z" />
          <line x1="65" y1="110" x2="65" y2="82" stroke="#14213D" stroke-width="2.5" />
          <path d="M39 195 L44 175 L49 195 Z" />
          <path d="M81 195 L86 175 L91 195 Z" />
          <rect x="40" y="195" width="50" height="5" fill="#0E172B" />

          <!-- Mặt đồng hồ Big Ben phát sáng vàng ấm -->
          <rect x="49" y="152" width="32" height="32" rx="2" fill="#FCA311" />
          <circle cx="65" cy="168" r="13" fill="#FFF2CC" />
          <circle cx="65" cy="168" r="1.8" fill="#14213D" />
          <line x1="65" y1="168" x2="65" y2="160" stroke="#14213D" stroke-width="1.8" />
          <line x1="65" y1="168" x2="71" y2="168" stroke="#14213D" stroke-width="1.8" />

          <rect x="88" y="235" width="60" height="95" />
          <path d="M100 235 L106 215 L112 235 Z" />
          <path d="M125 235 L131 215 L137 235 Z" />
          <g fill="#FCA311" opacity="0.75">
            <rect x="52" y="210" width="5" height="15" rx="2" />
            <rect x="62" y="210" width="5" height="15" rx="2" />
            <rect x="73" y="210" width="5" height="15" rx="2" />
            <rect x="52" y="240" width="5" height="15" rx="2" />
            <rect x="62" y="240" width="5" height="15" rx="2" />
            <rect x="73" y="240" width="5" height="15" rx="2" />
            <rect x="100" y="250" width="6" height="18" rx="2" />
            <rect x="120" y="250" width="6" height="18" rx="2" />
          </g>
        </g>

        <!-- Lớp 4: Dòng sông Thames và ánh đèn phản chiếu -->
        <path d="M0 325 C80 320 160 330 240 324 C270 322 290 326 300 324 L300 400 L0 400 Z" fill="#0B132B" class="hp-layer-fore" />
        <ellipse cx="65" cy="345" rx="35" ry="3" fill="#FCA311" opacity="0.6" />
        <ellipse cx="205" cy="355" rx="55" ry="3.5" fill="#E76F51" opacity="0.4" />
      </svg>
    `;
  }

  // 4. NƯỚC NGA (ru) — Mái vòm củ hành, Tuyết rơi, Rừng bạch dương, Xanh cobalt / Trắng sứ
  function renderSvgRussia() {
    return `
      <svg class="hp-poster-svg" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hp-ru-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0A1C38" />
            <stop offset="40%" stop-color="#1B4F9C" />
            <stop offset="75%" stop-color="#7EAEDB" />
            <stop offset="100%" stop-color="#E5F0FA" />
          </linearGradient>
          <radialGradient id="hp-ru-moon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
            <stop offset="50%" stop-color="#E2F0FD" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#7EAEDB" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Lớp 0: Đêm đông nước Nga và trăng bạc -->
        <rect width="300" height="400" fill="url(#hp-ru-sky)" />
        <circle cx="80" cy="90" r="34" fill="url(#hp-ru-moon)" class="hp-layer-back" />

        <!-- Lớp 1: Rừng bạch dương xa mờ -->
        <g class="hp-layer-back" fill="#3D6B9E" opacity="0.45">
          <path d="M-10 260 L10 210 L25 260 L45 200 L60 260 L85 215 L100 260 Z" />
          <path d="M210 260 L230 195 L245 260 L265 210 L280 260 L300 190 L315 260 Z" />
        </g>

        <!-- Lớp 2: Mái vòm củ hành Saint Basil -->
        <g class="hp-layer-mid">
          <rect x="85" y="215" width="34" height="65" fill="#1B4F9C" />
          <path d="M102 165 C85 185 85 205 102 215 C119 205 119 185 102 165 Z" fill="#2E6AC2" />
          <line x1="102" y1="165" x2="102" y2="152" stroke="#FFFFFF" stroke-width="2" />
          <line x1="98" y1="156" x2="106" y2="156" stroke="#FFFFFF" stroke-width="1.5" />

          <rect x="180" y="215" width="34" height="65" fill="#1B4F9C" />
          <path d="M197 165 C180 185 180 205 197 215 C214 205 214 185 197 165 Z" fill="#2E6AC2" />
          <line x1="197" y1="165" x2="197" y2="152" stroke="#FFFFFF" stroke-width="2" />
          <line x1="193" y1="156" x2="201" y2="156" stroke="#FFFFFF" stroke-width="1.5" />

          <rect x="125" y="190" width="50" height="95" fill="#123B75" />
          <polygon points="120,195 150,150 180,195" fill="#18488E" />
          <path d="M150 105 C125 130 125 155 150 168 C175 155 175 130 150 105 Z" fill="#FFFFFF" />
          <path d="M150 105 C136 128 135 152 145 167" stroke="#1B4F9C" stroke-width="3" fill="none" />
          <path d="M150 105 C155 125 162 148 158 168" stroke="#1B4F9C" stroke-width="3" fill="none" />
          <line x1="150" y1="105" x2="150" y2="88" stroke="#FFFFFF" stroke-width="2.5" />
          <line x1="144" y1="94" x2="156" y2="94" stroke="#FFFFFF" stroke-width="2" />
          <line x1="145" y1="101" x2="155" y2="99" stroke="#FFFFFF" stroke-width="1.5" />
        </g>

        <!-- Lớp 3: Đồi tuyết trắng uốn lượn -->
        <g class="hp-layer-fore">
          <path d="M-10 280 C60 260 140 290 220 270 C270 255 295 275 315 265 L315 400 L-10 400 Z" fill="#E3EFFC" />
          <path d="M-10 310 C70 295 150 320 230 300 C275 290 295 305 315 298 L315 400 L-10 400 Z" fill="#F4F8FD" />
        </g>

        <!-- Lớp 4: Cây bạch dương cận cảnh -->
        <g class="hp-layer-fore">
          <path d="M260 150 L256 380 L266 380 L270 150 Z" fill="#FFFFFF" />
          <rect x="258" y="180" width="7" height="3" fill="#1B3860" />
          <rect x="257" y="215" width="9" height="3.5" fill="#1B3860" />
          <rect x="256" y="255" width="10" height="4" fill="#1B3860" />
          <rect x="255" y="300" width="11" height="4" fill="#1B3860" />
          <path d="M268 200 C280 185 295 180 310 175" stroke="#FFFFFF" stroke-width="2" fill="none" />

          <path d="M25 210 L22 380 L28 380 L31 210 Z" fill="#FFFFFF" />
          <rect x="23" y="240" width="6" height="2.5" fill="#1B3860" />
          <rect x="23" y="280" width="6" height="3" fill="#1B3860" />
          <rect x="22" y="325" width="7" height="3" fill="#1B3860" />
        </g>

        <!-- Lớp 5: Bông tuyết mùa đông rơi lất phất -->
        <g class="hp-layer-accent" fill="#FFFFFF" opacity="0.9">
          <circle cx="50" cy="140" r="2.5" />
          <circle cx="110" cy="120" r="1.8" />
          <circle cx="130" cy="180" r="2.2" />
          <circle cx="75" cy="230" r="2" />
          <circle cx="185" cy="140" r="2" />
          <circle cx="220" cy="170" r="2.8" />
          <circle cx="235" cy="115" r="1.8" />
          <circle cx="160" cy="260" r="2.5" />
          <circle cx="280" cy="235" r="2" />
          <circle cx="140" cy="330" r="2.2" />
        </g>
      </svg>
    `;
  }

  // 5. NƯỚC ĐỨC (de) — Lâu đài trên núi, dãy Alps, rừng thông, hoàng hôn đỏ vàng
  function renderSvgGermany() {
    return `
      <svg class="hp-poster-svg" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hp-de-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1A1A1A" />
            <stop offset="40%" stop-color="#7F1D1D" />
            <stop offset="72%" stop-color="#DD6B20" />
            <stop offset="100%" stop-color="#FFCE00" />
          </linearGradient>
          <radialGradient id="hp-de-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFF3B0" stop-opacity="1" />
            <stop offset="60%" stop-color="#FFCE00" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#FFCE00" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Lớp 0: Trời hoàng hôn ba màu cờ và mặt trời -->
        <rect width="300" height="400" fill="url(#hp-de-sky)" />
        <circle cx="220" cy="215" r="46" fill="url(#hp-de-sun)" class="hp-layer-back" />

        <!-- Lớp 1: Dãy Alps xa, đỉnh phủ tuyết -->
        <g class="hp-layer-back">
          <path d="M-10 270 L50 190 L90 235 L140 160 L190 225 L235 175 L310 260 L310 300 L-10 300 Z" fill="#4A1C1C" opacity="0.75" />
          <path d="M128 176 L140 160 L152 177 L145 174 L140 180 L134 174 Z" fill="#FFFFFF" opacity="0.85" />
          <path d="M226 186 L235 175 L246 189 L239 186 L234 191 Z" fill="#FFFFFF" opacity="0.8" />
        </g>

        <!-- Lớp 2: Lâu đài trên đồi -->
        <g class="hp-layer-mid">
          <path d="M60 300 C90 255 150 250 190 270 L190 320 L60 320 Z" fill="#2B1010" />
          <rect x="98" y="215" width="58" height="50" fill="#F3E9DC" />
          <rect x="88" y="200" width="16" height="66" fill="#EADFCF" />
          <polygon points="86,200 96,170 106,200" fill="#1F2937" />
          <rect x="146" y="190" width="18" height="76" fill="#EADFCF" />
          <polygon points="144,190 155,150 166,190" fill="#1F2937" />
          <rect x="118" y="196" width="14" height="22" fill="#EADFCF" />
          <polygon points="116,196 125,176 134,196" fill="#1F2937" />
          <rect x="106" y="230" width="6" height="10" rx="3" fill="#7F1D1D" />
          <rect x="122" y="230" width="6" height="10" rx="3" fill="#7F1D1D" />
          <rect x="138" y="230" width="6" height="10" rx="3" fill="#7F1D1D" />
          <rect x="152" y="205" width="5" height="9" rx="2.5" fill="#FFCE00" />
          <line x1="155" y1="150" x2="155" y2="138" stroke="#FFFFFF" stroke-width="1.5" />
          <path d="M155 138 L166 141 L155 144 Z" fill="#DD0000" />
        </g>

        <!-- Lớp 3: Đồi xanh và rừng thông phía trước -->
        <g class="hp-layer-fore">
          <path d="M-10 315 C60 295 130 320 200 305 C250 295 290 310 315 302 L315 400 L-10 400 Z" fill="#14532D" />
          <path d="M-10 345 C70 330 150 352 230 335 C275 326 298 338 315 333 L315 400 L-10 400 Z" fill="#0F3D22" />
          <polygon points="20,330 34,288 48,330" fill="#0B2E1A" />
          <polygon points="40,338 52,302 64,338" fill="#0B2E1A" />
          <polygon points="240,322 255,276 270,322" fill="#0B2E1A" />
          <polygon points="262,330 274,296 286,330" fill="#0B2E1A" />
        </g>

        <!-- Lớp 4: Chim bay và đốm nắng -->
        <g class="hp-layer-accent" fill="none" stroke="#FFF3B0" stroke-width="1.5" opacity="0.85">
          <path d="M60 120 q6 -6 12 0 q6 -6 12 0" />
          <path d="M90 100 q5 -5 10 0 q5 -5 10 0" />
          <path d="M200 120 q4 -4 8 0 q4 -4 8 0" />
        </g>
      </svg>
    `;
  }

  // Cảnh Nông Trại Thu Nhỏ (Phong Cách Hoạt Hình Dễ Thương: Đồi cỏ pastel, nhà kho đỏ hồng, hàng rào, mây trôi, mặt trời, linh thú nhún nhảy)
  function renderSvgMiniFarm(petType = 'panda') {
    const petSvg = (typeof Sprites !== 'undefined' && Sprites.renderPetSVG)
      ? Sprites.renderPetSVG(petType, 44, 44)
      : (typeof window !== 'undefined' && window.Sprites && window.Sprites.renderPetSVG
        ? window.Sprites.renderPetSVG(petType, 44, 44)
        : `<svg class="ds-icon" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`);

    return `
      <svg class="hp-farm-svg" viewBox="0 0 360 190" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hp-farm-sky-day" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#BDE7FF" />
            <stop offset="65%" stop-color="#DBF2FF" />
            <stop offset="100%" stop-color="#EAF7FF" />
          </linearGradient>
          <linearGradient id="hp-farm-sky-night" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#141C34" />
            <stop offset="60%" stop-color="#1E2B4E" />
            <stop offset="100%" stop-color="#283966" />
          </linearGradient>
          <radialGradient id="hp-farm-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFDF0" />
            <stop offset="40%" stop-color="#FFE885" />
            <stop offset="78%" stop-color="#FFD45C" />
            <stop offset="100%" stop-color="#FFA826" />
          </radialGradient>
          <radialGradient id="hp-farm-moon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFDE8" />
            <stop offset="60%" stop-color="#FDE68A" />
            <stop offset="100%" stop-color="#F59E0B" stop-opacity="0.3" />
          </radialGradient>
        </defs>

        <!-- Lớp 0: Bầu trời (Ngày / Đêm tự đổi qua CSS) -->
        <rect width="360" height="190" class="hp-sky-rect-day" fill="url(#hp-farm-sky-day)" />
        <rect width="360" height="190" class="hp-sky-rect-night" fill="url(#hp-farm-sky-night)" opacity="0" />

        <!-- Mặt trời xoay nhẹ ban ngày & má hồng dễ thương -->
        <g class="hp-svg-sun">
          <!-- Tia nắng mềm -->
          <g class="hp-sun-rays" stroke="#FFD45C" stroke-width="3" stroke-linecap="round" opacity="0.8">
            <line x1="290" y1="16" x2="290" y2="8" />
            <line x1="290" y1="72" x2="290" y2="80" />
            <line x1="262" y1="44" x2="254" y2="44" />
            <line x1="318" y1="44" x2="326" y2="44" />
            <line x1="270" y1="24" x2="264" y2="18" />
            <line x1="310" y1="64" x2="316" y2="70" />
            <line x1="270" y1="64" x2="264" y2="70" />
            <line x1="310" y1="24" x2="316" y2="18" />
          </g>
          <circle cx="290" cy="44" r="21" fill="url(#hp-farm-sun-glow)" filter="drop-shadow(0 2px 6px rgba(255,200,50,0.35))" />
          <!-- Khuôn mặt cười tí hon -->
          <circle cx="283" cy="42" r="2.2" fill="#5B3A1E" />
          <circle cx="297" cy="42" r="2.2" fill="#5B3A1E" />
          <ellipse cx="280" cy="47" rx="2.5" ry="1.6" fill="#FFB3C1" />
          <ellipse cx="300" cy="47" rx="2.5" ry="1.6" fill="#FFB3C1" />
          <path d="M286 46 Q290 50 294 46" stroke="#5B3A1E" stroke-width="1.8" stroke-linecap="round" fill="none" />
        </g>

        <!-- Mặt trăng & Sao ban đêm (hiển thị khi data-theme=dark) -->
        <g class="hp-svg-moon" opacity="0">
          <circle cx="290" cy="44" r="19" fill="url(#hp-farm-moon-glow)" />
          <circle cx="296" cy="40" r="15" fill="#1E2B4E" />
          <!-- Sao lấp lánh -->
          <circle cx="70" cy="30" r="2" fill="#FFFBEB" class="hp-star hp-star-1" />
          <circle cx="150" cy="22" r="2.5" fill="#FFFBEB" class="hp-star hp-star-2" />
          <circle cx="220" cy="38" r="1.8" fill="#FFFBEB" class="hp-star hp-star-3" />
          <circle cx="110" cy="55" r="1.5" fill="#FFFBEB" class="hp-star hp-star-4" />
        </g>

        <!-- Mây trắng bồng bềnh trôi chậm -->
        <g class="hp-svg-cloud hp-cloud-1">
          <path d="M40 38 C40 32 45 28 51 28 C55 24 62 24 67 27 C71 25 77 27 79 31 C84 31 87 35 87 38 C87 42 84 45 79 45 L48 45 C43 45 40 42 40 38 Z" fill="#FFFFFF" opacity="0.92" filter="drop-shadow(0 2px 4px rgba(189,231,255,0.4))" />
        </g>
        <g class="hp-svg-cloud hp-cloud-2">
          <path d="M165 28 C165 24 169 20 174 20 C177 17 183 17 187 20 C190 18 195 20 197 23 C201 23 204 26 204 29 C204 32 201 35 197 35 L171 35 C167 35 165 32 165 28 Z" fill="#FFFFFF" opacity="0.85" />
        </g>

        <!-- Lớp 1: Đồi núi xa xanh non pastel -->
        <path class="hp-hill-back" d="M-20 112 Q80 84 180 102 T380 92 L380 190 L-20 190 Z" fill="#BCEFA3" />

        <!-- Lớp 2: Đồi cỏ giữa + Cây táo nhỏ xinh xắn -->
        <path class="hp-hill-mid" d="M-20 128 Q95 106 210 126 T380 114 L380 190 L-20 190 Z" fill="#9BE08A" />

        <!-- Cây táo tròn xoe bên góc trái -->
        <g class="hp-farm-tree">
          <!-- Thân gỗ -->
          <rect x="25" y="108" width="6" height="24" fill="#C68B4B" rx="2" />
          <!-- Tán lá tròn -->
          <circle cx="28" cy="98" r="16" fill="#6CC56A" />
          <circle cx="23" cy="94" r="10" fill="#7FD97C" />
          <!-- Quả táo đỏ hồng -->
          <circle cx="22" cy="99" r="2.6" fill="#FF5E7E" />
          <circle cx="34" cy="96" r="2.6" fill="#FF5E7E" />
          <circle cx="27" cy="106" r="2.4" fill="#FF5E7E" />
        </g>

        <!-- Nhà kho đỏ hồng nhỏ dễ thương (Red-pink barn) -->
        <g class="hp-farm-barn">
          <!-- Bóng nhà kho -->
          <ellipse cx="88" cy="132" rx="24" ry="5" fill="rgba(80,120,40,0.22)" />
          <!-- Thân nhà kho đỏ hồng -->
          <rect x="70" y="102" width="36" height="28" fill="#FF6B8B" rx="3" stroke="#E04868" stroke-width="1.2" />
          <!-- Mái nhà tam giác ấm áp -->
          <polygon points="66,102 88,80 110,102" fill="#E8505B" />
          <!-- Viền mái trắng gỗ nổi bật (Fascia) -->
          <polyline points="65,103 88,79 111,103" stroke="#FFFDF9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <!-- Cửa sổ tròn áp mái -->
          <circle cx="88" cy="92" r="4.5" fill="#FFFDF9" />
          <circle cx="88" cy="92" r="3.2" class="hp-barn-window" fill="#FFE57F" />
          <!-- Cửa kho gỗ có chữ X -->
          <rect x="81" y="114" width="14" height="16" fill="#E9B97A" rx="2" stroke="#C68B4B" stroke-width="1" />
          <line x1="83" y1="116" x2="93" y2="128" stroke="#C68B4B" stroke-width="1.2" stroke-linecap="round" />
          <line x1="93" y1="116" x2="83" y2="128" stroke="#C68B4B" stroke-width="1.2" stroke-linecap="round" />
        </g>

        <!-- Hàng rào gỗ trắng xinh xinh -->
        <g class="hp-farm-fence" stroke="#FFFDF9" stroke-width="2.5" stroke-linecap="round" filter="drop-shadow(0 1px 2px rgba(60,90,30,0.2))">
          <!-- Thanh ngang rào -->
          <line x1="118" y1="126" x2="195" y2="132" />
          <line x1="118" y1="133" x2="195" y2="139" />
          <!-- Các cọc rào nhọn đầu tròn -->
          <line x1="126" y1="121" x2="126" y2="140" />
          <line x1="142" y1="122" x2="142" y2="142" />
          <line x1="158" y1="124" x2="158" y2="144" />
          <line x1="174" y1="126" x2="174" y2="146" />
          <line x1="190" y1="127" x2="190" y2="147" />
        </g>

        <!-- Lớp 3: Đồi cỏ trước màu xanh đậm đà & hoa đồng nội -->
        <path class="hp-hill-fore" d="M-20 146 Q100 134 220 148 T380 138 L380 190 L-20 190 Z" fill="#6CC56A" />

        <!-- Hoa cúc trắng & hoa vàng nở rực rỡ -->
        <g class="hp-farm-flowers">
          <!-- Hoa 1 -->
          <circle cx="132" cy="154" r="3" fill="#FFFFFF" />
          <circle cx="132" cy="154" r="1.4" fill="#FFD45C" />
          <!-- Hoa 2 -->
          <circle cx="150" cy="158" r="2.6" fill="#FFB3C1" />
          <circle cx="150" cy="158" r="1.2" fill="#FFFFFF" />
          <!-- Hoa 3 -->
          <circle cx="178" cy="156" r="3.2" fill="#FFFFFF" />
          <circle cx="178" cy="156" r="1.5" fill="#FFD45C" />
          <!-- Mầm lúa non -->
          <circle cx="50" cy="152" r="3" fill="#FFE57F" />
          <circle cx="75" cy="158" r="2.8" fill="#FFE57F" />
        </g>

        <!-- Linh thú đang đồng hành hoặc gấu trúc mặc định nhún nhảy -->
        <g class="hp-svg-mascot">
          <!-- Bóng đổ nhún theo -->
          <ellipse cx="265" cy="168" rx="14" ry="4.5" fill="rgba(40,70,25,0.25)" class="hp-mascot-shadow" />
          <!-- Sprite linh thú to rõ dễ thương (SVG chuẩn từ Sprites) -->
          <g transform="translate(243, 126)" class="hp-mascot-sprite">
            ${petSvg}
          </g>
        </g>
      </svg>
    `;
  }

  function getQuestIconInfo(id) {
    if (id === 'quest_lesson_1') {
      return {
        color: '#DC2626',
        bg: 'rgba(220, 38, 38, 0.1)',
        svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>`
      };
    }
    if (id === 'quest_flashcard_10') {
      return {
        color: '#7C3AED',
        bg: 'rgba(124, 58, 237, 0.1)',
        svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
      };
    }
    if (id === 'quest_speak_5') {
      return {
        color: '#D97706',
        bg: 'rgba(217, 119, 6, 0.1)',
        svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`
      };
    }
    return {
      color: '#059669',
      bg: 'rgba(5, 150, 105, 0.1)',
      svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    };
  }

  /* ==========================================================================
     3. RENDER CHÍNH (WINDOW.PORTAL.RENDER)
     ========================================================================== */

  function render(containerEl) {
    if (!containerEl) return;

    const { state: ecoState, levelInf, quests } = safeGetEconomy();
    const zhProg = safeGetZhProgress();
    const completedCount = Object.keys(zhProg.lessons || {}).length;
    const nextLsn = getNextLesson(zhProg);
    const wotd = getWordOfTheDay();

    // Tính % hoàn thành tiếng Trung
    const totalZhWords = (typeof window !== 'undefined' && Array.isArray(window.VOCAB) && window.VOCAB.length) || 521;
    let zhWordsLearned = 0;
    try {
      const sm2 = JSON.parse(localStorage.getItem('hsk_sm2_data') || '{}');
      Object.keys(sm2).forEach(id => {
        const it = sm2[id];
        if (it && (it.repetition >= 2 || it.interval >= 3)) zhWordsLearned++;
      });
    } catch (e) {
      zhWordsLearned = Math.min(completedCount * 10, totalZhWords);
    }
    const zhPct = Math.min(100, Math.max(Math.round((completedCount / 30) * 100), Math.round((zhWordsLearned / totalZhWords) * 100)));

    // Tính % hoàn thành tiếng Anh
    const enProg = safeGetEnProgress();
    const enCompletedCount = Object.keys(enProg.lessons || {}).length;
    const totalEnWords = 500;
    let enWordsLearned = 0;
    try {
      const enSm2 = JSON.parse(localStorage.getItem('en_sm2_data') || '{}');
      Object.keys(enSm2).forEach(id => {
        const it = enSm2[id];
        if (it && (it.repetition >= 2 || it.interval >= 3)) enWordsLearned++;
      });
    } catch (e) {
      enWordsLearned = Math.min(enCompletedCount * 15, totalEnWords);
    }
    const enPct = Math.min(100, Math.max(Math.round((enCompletedCount / 30) * 100), Math.round((enWordsLearned / totalEnWords) * 100)));

    // Tiến độ tiếng Nhật: số bài đã qua trong 35 bài (japanese.js lưu ở ja_learn_progress_v1)
    let jaDone = 0;
    try {
      const jaProg = JSON.parse(localStorage.getItem('ja_learn_progress_v1') || '{}');
      jaDone = Object.values((jaProg && jaProg.lessons) || {}).filter(r => r && r.completed).length;
    } catch (e) { jaDone = 0; }
    const jaPct = Math.min(100, Math.round((jaDone / 35) * 100));

    // Tiến độ tiếng Đức: số bài đã qua trong 30 bài (german.js lưu ở de_learn_progress_v1)
    let deDone = 0;
    try {
      const deProg = JSON.parse(localStorage.getItem('de_learn_progress_v1') || '{}');
      deDone = Object.values((deProg && deProg.lessons) || {}).filter(r => r && r.completed).length;
    } catch (e) { deDone = 0; }
    const dePct = Math.min(100, Math.round((deDone / 30) * 100));
    // Tiến độ tiếng Nga: số bài đã qua trong 35 bài (russian.js lưu ở ru_learn_progress_v1)
    let ruDone = 0;
    try {
      const ruProg = JSON.parse(localStorage.getItem('ru_learn_progress_v1') || '{}');
      ruDone = Object.values((ruProg && ruProg.lessons) || {}).filter(r => r && r.completed).length;
    } catch (e) { ruDone = 0; }
    const ruPct = Math.min(100, Math.round((ruDone / 35) * 100));

    // Số liệu Nông trại
    const plots = (ecoState.farm && Array.isArray(ecoState.farm.plots)) ? ecoState.farm.plots : [];
    let plotsPlanted = 0;
    let plotsRipe = 0;
    plots.forEach(p => {
      if (p && p.cropId) {
        plotsPlanted++;
        if (typeof window !== 'undefined' && window.Farm && typeof window.Farm.plotStatus === 'function') {
          const st = window.Farm.plotStatus(p, Date.now());
          if (st && st.state === 'ripe') plotsRipe++;
        }
      }
    });

    // Linh thú đang đồng hành
    let activePetName = 'Gấu trúc nhỏ';
    let activePetType = 'panda';
    if (ecoState.activePet && Array.isArray(ecoState.pets)) {
      const pet = ecoState.pets.find(p => (p.id === ecoState.activePet || p.type === ecoState.activePet) && !p.isEgg);
      if (pet) {
        const petDef = (window.Economy && window.Economy.PET_DEFS && window.Economy.PET_DEFS[pet.type]) || { name: 'Linh thú' };
        activePetName = `${petDef.name} (Cấp ${pet.level || 1})`;
        activePetType = pet.type || 'panda';
      }
    }
    const activePetIcon = (typeof Sprites !== 'undefined' && Sprites.renderPetSVG)
      ? Sprites.renderPetSVG(activePetType, 20, 20)
      : (typeof window !== 'undefined' && window.Sprites && window.Sprites.renderPetSVG
        ? window.Sprites.renderPetSVG(activePetType, 20, 20)
        : ic('paw', { size: 16 }));

    // Lời chào & Dòng trạng thái
    const greeting = getGreetingByHour();
    const streak = (typeof ecoState.streak === 'number' ? ecoState.streak : (ecoState.streak && ecoState.streak.count)) || 0;
    let statusLine = 'Mỗi ngày 15 phút, bắt đầu từ bài đầu tiên';
    if (streak > 0) {
      statusLine = `Chuỗi ${streak} ngày — đừng để đứt nhé!`;
    } else if (completedCount > 0) {
      statusLine = 'Hôm nay bạn chưa học, bắt đầu bài tiếp theo để giữ nhịp nhé!';
    }

    // Vòng tròn KN hôm nay (mục tiêu 50 KN) — bán kính nhỏ 18px (vòng KN nhỏ)
    const todayXp = (ecoState.today && ecoState.today.xp) || 0;
    const targetXp = 50;
    const smallRadius = 18;
    const smallCircumference = 2 * Math.PI * smallRadius;
    const xpPercent = Math.min(100, Math.round((todayXp / targetXp) * 100));
    const xpOffsetSmall = smallCircumference - (xpPercent / 100) * smallCircumference;

    // Số nhiệm vụ xong
    const questsCompletedCount = quests.filter(q => q.completed).length;

    // Quests items (4 quests)
    const questsHtml = quests.slice(0, 4).map(q => {
      const isDone = !!q.completed;
      const isClaimed = !!q.claimed;
      const cur = Math.min(q.current || 0, q.target || 1);
      const tgt = q.target || 1;
      const pct = Math.min(100, Math.round((cur / tgt) * 100));
      const iconInfo = getQuestIconInfo(q.id);
      const rewardCoins = (q.reward && q.reward.coins) || 30;

      let actionHtml = '';
      if (isClaimed) {
        actionHtml = `<span class="hp-quest-claimed"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Đã nhận</span>`;
      } else if (isDone) {
        actionHtml = `<button type="button" class="hp-btn-claim" data-quest-id="${q.id}" title="Nhận thưởng ${rewardCoins} xu">Nhận</button>`;
      } else {
        actionHtml = `<span class="hp-quest-step hp-tabular">${cur}/${tgt}</span>`;
      }

      return `
        <div class="hp-quest-item ${isDone ? 'is-completed' : ''} ${isClaimed ? 'is-claimed' : ''}">
          <div class="hp-quest-icon-wrap" style="color:${iconInfo.color};background:${iconInfo.bg};">
            ${iconInfo.svg}
          </div>
          <div class="hp-quest-main">
            <div class="hp-quest-row">
              <span class="hp-quest-desc">${q.title || q.desc || 'Nhiệm vụ'}</span>
              <span class="hp-quest-reward hp-tabular">+${rewardCoins} xu</span>
            </div>
            <div class="hp-quest-track">
              <div class="hp-quest-fill ${isDone ? '' : 'pending'}" style="width: ${pct}%"></div>
            </div>
          </div>
          <div class="hp-quest-action">
            ${actionHtml}
          </div>
        </div>
      `;
    }).join('');

    // Khối Hôm nay gồm 2 cột trên Desktop, chuyển đổi thứ tự trên Mobile
    const todayBlockHtml = `
      <section class="hp-today-grid" aria-label="Khu vực học tập hôm nay">
        <!-- Cột Trái -->
        <div class="hp-today-left">
          <!-- 1. Lời chào -->
          <div class="hp-greeting-block">
            <span class="hp-eyebrow hp-eyebrow-caps">POLYLINGO</span>
            <h1 class="hp-greeting-title">${greeting}</h1>
            <p class="hp-greeting-slogan">Gieo chữ mỗi ngày, nói cùng thế giới</p>
            <p class="hp-greeting-status">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--hp-accent-zh);"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/></svg>
              <span>${statusLine}</span>
            </p>
          </div>

          <!-- 2. Thẻ Bài tiếp theo gọn gàng -->
          <div class="hp-next-lesson-card">
            <div class="hp-next-header">
              <span class="hp-next-meta">
                ${nextLsn ? `${nextLsn.levelName || 'Cấp 0: Nhập môn'} · ${nextLsn.unitTitle || 'Khởi động'}` : 'Chương trình HSK 3.0'}
              </span>
              <span class="hp-next-badge">Bài tiếp theo</span>
            </div>
            <h2 class="hp-next-title">
              ${nextLsn ? nextLsn.title : 'Bắt đầu bài học đầu tiên'}
            </h2>
            <p class="hp-next-goal">
              ${nextLsn ? nextLsn.goal : 'Làm quen bảng phiên âm Pinyin, làm chủ 4 thanh điệu và mở rộng vốn từ vựng nền tảng.'}
            </p>
            <div class="hp-next-actions">
              <a href="#zh/learn${nextLsn ? `?lesson=${nextLsn.id}` : ''}" class="hp-btn hp-btn-primary hp-btn-compact">
                <span>${completedCount === 0 ? 'Bắt đầu học' : 'Học tiếp'}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#zh/learn" class="hp-btn hp-btn-outline hp-btn-compact">
                Lộ trình chi tiết
              </a>
            </div>
          </div>

          <!-- 4. Thẻ Từ của ngày nằm ngang: Chữ Hán trái, pinyin/nghĩa/loa phải -->
          <div class="hp-wotd-card">
            <div class="hp-wotd-char" title="${wotd.char}">${wotd.char}</div>
            <div class="hp-wotd-info">
              <div class="hp-wotd-label-row">
                <span class="hp-eyebrow">Từ của ngày</span>
                ${wotd.hv ? `<span class="hp-wotd-hv">[Âm Hán-Việt: ${wotd.hv}]</span>` : ''}
              </div>
              <div class="hp-wotd-py">${wotd.py}</div>
              <div class="hp-wotd-meaning">${wotd.vi}</div>
            </div>
            <button type="button" class="hp-wotd-speaker-btn" id="hp-btn-speak-wotd" aria-label="Phát âm từ ${wotd.char}" title="Nghe phát âm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            </button>
          </div>
        </div>

        <!-- Cột Phải -->
        <div class="hp-today-right">
          <!-- 3. THANH CHỈ SỐ ngang mỏng (vòng KN nhỏ + chuỗi + xu + nước trên 1 hàng) -->
          <div class="hp-metrics-bar">
            <!-- Vòng KN nhỏ -->
            <div class="hp-metric-ring-item" title="Kinh nghiệm hôm nay (Mục tiêu 50 KN)">
              <div class="hp-xp-ring-wrap">
                <svg class="hp-xp-ring" width="44" height="44" viewBox="0 0 44 44">
                  <circle class="hp-xp-ring-bg" cx="22" cy="22" r="${smallRadius}" fill="none" stroke-width="4" />
                  <circle class="hp-xp-ring-bar" cx="22" cy="22" r="${smallRadius}" fill="none" stroke-width="4"
                    stroke-dasharray="${smallCircumference}"
                    stroke-dashoffset="${xpOffsetSmall}"
                    stroke-linecap="round" />
                </svg>
                <div class="hp-xp-ring-center">
                  <span class="hp-xp-ring-num hp-tabular">${todayXp}</span>
                </div>
              </div>
              <div class="hp-metric-ring-text">
                <span class="hp-metric-ring-val hp-tabular">${todayXp}/50</span>
                <span class="hp-metric-label">KN hôm nay</span>
              </div>
            </div>

            <div class="hp-metrics-bar-sep"></div>

            <!-- Chuỗi -->
            <div class="hp-metric-bar-item" title="Chuỗi ngày học liên tục">
              <span class="hp-metric-icon" style="color:#EF4444;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/></svg>
              </span>
              <div class="hp-metric-bar-content">
                <span class="hp-metric-val hp-tabular">${streak}</span>
                <span class="hp-metric-label">Chuỗi ngày</span>
              </div>
            </div>

            <!-- Xu -->
            <div class="hp-metric-bar-item" title="Xu tích lũy qua bài học">
              <span class="hp-metric-icon" style="color:#F59E0B;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 6v12M8 10h8M9 14h6"/></svg>
              </span>
              <div class="hp-metric-bar-content">
                <span class="hp-metric-val hp-tabular">${ecoState.coins || 0}</span>
                <span class="hp-metric-label">Xu</span>
              </div>
            </div>

            <!-- Nước -->
            <div class="hp-metric-bar-item" title="Nước tưới cây nông trại">
              <span class="hp-metric-icon" style="color:#3B82F6;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              </span>
              <div class="hp-metric-bar-content">
                <span class="hp-metric-val hp-tabular">${ecoState.water || 0}</span>
                <span class="hp-metric-label">Nước</span>
              </div>
            </div>

            <!-- Cấp độ -->
            <div class="hp-metric-bar-item hp-metric-level-item" title="Cấp độ người học">
              <span class="hp-metric-icon" style="color:#8B5CF6;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </span>
              <div class="hp-metric-bar-content">
                <span class="hp-metric-val hp-tabular">Cấp ${levelInf.level}</span>
                <span class="hp-metric-label">${levelInf.cur}/${levelInf.need} KN</span>
              </div>
            </div>
          </div>

          <!-- 5. Nhiệm vụ ngày (Thu gọn được, mặc định chỉ hiện số nhiệm vụ xong x/4 trên điện thoại) -->
          <details class="hp-quests-card" id="hp-quests-details">
            <summary class="hp-quests-summary">
              <div class="hp-quests-summary-left">
                <span class="hp-quests-summary-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </span>
                <span class="hp-quests-summary-title">Nhiệm vụ ngày</span>
              </div>
              <div class="hp-quests-summary-right">
                <span class="hp-quests-badge hp-tabular">${questsCompletedCount}/${quests.length || 3} xong</span>
                <svg class="hp-quests-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </summary>
            <div class="hp-quests-list">
              ${questsHtml || '<p style="font-size:0.85rem;color:var(--hp-muted);margin:0;">Tất cả nhiệm vụ đã hoàn thành xuất sắc!</p>'}
            </div>
          </details>
        </div>
      </section>
    `;

    // 4 THẺ ÁP PHÍCH DỌC
    const postersHtml = `
      <section class="hp-posters-wrap" aria-label="Chọn thế giới ngôn ngữ">
        <div class="hp-section-header">
          <span class="hp-eyebrow hp-eyebrow-caps">THẾ GIỚI NGÔN NGỮ</span>
          <h2 class="hp-section-title">Chọn hành trình của bạn</h2>
          <p class="hp-section-sub">Mỗi ngôn ngữ là một cánh cổng văn hóa trọn vẹn với ngữ âm, từ vựng và đàm thoại đời thường.</p>
        </div>

        <div class="hp-posters-grid">
          <!-- 1. Tiếng Trung (zh) — Ngôn ngữ đang học, nổi bật viền vàng kim mảnh -->
          <a href="#zh/learn" class="hp-poster" data-lang="zh" aria-label="Học Tiếng Trung Quốc">
            ${renderSvgChina()}
            <div class="hp-poster-overlay">
              <div class="hp-poster-top">
                <span class="hp-poster-native-giant">中文</span>
              </div>
              <div class="hp-poster-bottom">
                <div class="hp-poster-title-row">
                  <h3 class="hp-poster-name">Tiếng Trung</h3>
                  <span class="hp-poster-badge ready">
                    <span class="hp-dot"></span> Đang học
                  </span>
                </div>
                <p class="hp-poster-greeting">你好 · Nǐ hǎo (Xin chào)</p>
                <div class="hp-poster-progress">
                  <div class="hp-poster-prog-text">
                    <span>Tiến độ bài học</span>
                    <span class="hp-tabular">${zhPct}%</span>
                  </div>
                  <div class="hp-poster-prog-track">
                    <div class="hp-poster-prog-fill" style="width: ${zhPct}%"></div>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <!-- 2. Tiếng Nhật (ja) -->
          <a href="#ja/learn" class="hp-poster" data-lang="ja" aria-label="Học Tiếng Nhật">
            ${renderSvgJapan()}
            <div class="hp-poster-overlay">
              <div class="hp-poster-top">
                <span class="hp-poster-native-giant">日本語</span>
              </div>
              <div class="hp-poster-bottom">
                <div class="hp-poster-title-row">
                  <h3 class="hp-poster-name">Tiếng Nhật</h3>
                  <span class="hp-poster-badge ready">
                    <span class="hp-dot"></span> Đang học
                  </span>
                </div>
                <p class="hp-poster-greeting">こんにちは · Konnichiwa (Xin chào)</p>
                <div class="hp-poster-progress">
                  <div class="hp-poster-prog-text">
                    <span>Tiến độ bài học</span>
                    <span class="hp-tabular">${jaPct}%</span>
                  </div>
                  <div class="hp-poster-prog-track">
                    <div class="hp-poster-prog-fill" style="width: ${jaPct}%"></div>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <!-- 3. Tiếng Anh (en) -->
          <a href="#en/learn" class="hp-poster" data-lang="en" aria-label="Học Tiếng Anh">
            ${renderSvgEnglish()}
            <div class="hp-poster-overlay">
              <div class="hp-poster-top">
                <span class="hp-poster-native-giant">English</span>
              </div>
              <div class="hp-poster-bottom">
                <div class="hp-poster-title-row">
                  <h3 class="hp-poster-name">Tiếng Anh</h3>
                  <span class="hp-poster-badge ready">
                    <span class="hp-dot"></span> Đang học
                  </span>
                </div>
                <p class="hp-poster-greeting">Hello · /həˈləʊ/ (Xin chào)</p>
                <div class="hp-poster-progress">
                  <div class="hp-poster-prog-text">
                    <span>Tiến độ bài học</span>
                    <span class="hp-tabular">${enPct}%</span>
                  </div>
                  <div class="hp-poster-prog-track">
                    <div class="hp-poster-prog-fill" style="width: ${enPct}%"></div>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <!-- 4. Tiếng Đức (de) -->
          <a href="#de/learn" class="hp-poster" data-lang="de" aria-label="Học Tiếng Đức">
            ${renderSvgGermany()}
            <div class="hp-poster-overlay">
              <div class="hp-poster-top">
                <span class="hp-poster-native-giant">Deutsch</span>
              </div>
              <div class="hp-poster-bottom">
                <div class="hp-poster-title-row">
                  <h3 class="hp-poster-name">Tiếng Đức</h3>
                  <span class="hp-poster-badge ready">
                    <span class="hp-dot"></span> Đang học
                  </span>
                </div>
                <p class="hp-poster-greeting">Hallo · Guten Tag (Xin chào)</p>
                <div class="hp-poster-progress">
                  <div class="hp-poster-prog-text">
                    <span>Tiến độ bài học</span>
                    <span class="hp-tabular">${dePct}%</span>
                  </div>
                  <div class="hp-poster-prog-track">
                    <div class="hp-poster-prog-fill" style="width: ${dePct}%"></div>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <!-- 5. Tiếng Nga (ru) -->
          <a href="#ru/learn" class="hp-poster" data-lang="ru" aria-label="Học Tiếng Nga">
            ${renderSvgRussia()}
            <div class="hp-poster-overlay">
              <div class="hp-poster-top">
                <span class="hp-poster-native-giant">Русский</span>
              </div>
              <div class="hp-poster-bottom">
                <div class="hp-poster-title-row">
                  <h3 class="hp-poster-name">Tiếng Nga</h3>
                  <span class="hp-poster-badge ready">
                    <span class="hp-dot"></span> Đang học
                  </span>
                </div>
                <p class="hp-poster-greeting">Привет · Privet (Xin chào)</p>
                <div class="hp-poster-progress">
                  <div class="hp-poster-prog-text">
                    <span>Tiến độ bài học</span>
                    <span class="hp-tabular">${ruPct}%</span>
                  </div>
                  <div class="hp-poster-prog-track">
                    <div class="hp-poster-prog-fill" style="width: ${ruPct}%"></div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>
    `;

    // 3. DẢI NÔNG TRẠI (PHONG CÁCH TƯƠI SÁNG, DỄ THƯƠNG: ĐỒI CỎ PASTEL, NHÀ KHO ĐỎ HỒNG, LINH THÚ NHÚN NHẢY)
    const farmStripHtml = `
      <section class="hp-farm-strip" aria-label="Nông trại của bạn">
        <div class="hp-farm-visual">
          ${renderSvgMiniFarm(activePetType)}
        </div>
        <div class="hp-farm-body">
          <div class="hp-farm-header">
            <div class="hp-farm-title-row">
              <span class="hp-farm-badge">${ic('sparkle', { size: 14 })} Điểm hẹn tri thức</span>
              <h3 class="hp-farm-title">Nông trại của bạn</h3>
            </div>
            <p class="hp-farm-desc">
              Chăm sóc mầm non tri thức, tích nước tưới từ bài học mỗi ngày và vui cùng linh thú đồng hành!
            </p>
          </div>
          <div class="hp-farm-stats-grid">
            <div class="hp-farm-stat-chip chip-planted" title="Số ô đất đang gieo trồng">
              <span class="hp-farm-stat-icon">${ic('sprout', { size: 16 })}</span>
              <div class="hp-farm-stat-info">
                <span class="hp-farm-stat-val hp-tabular">${plotsPlanted}</span>
                <span class="hp-farm-stat-label">Ô đang trồng</span>
              </div>
            </div>

            <div class="hp-farm-stat-chip chip-ripe ${plotsRipe > 0 ? 'is-ripe' : ''}" title="Số cây đã chín có thể thu hoạch">
              <span class="hp-farm-stat-icon">${plotsRipe > 0 ? ic('sparkle', { size: 16 }) : ic('wheat', { size: 16 })}</span>
              <div class="hp-farm-stat-info">
                <span class="hp-farm-stat-val hp-tabular">${plotsRipe}</span>
                <span class="hp-farm-stat-label">Cây chín</span>
              </div>
            </div>

            <div class="hp-farm-stat-chip chip-pet" title="Linh thú đang đồng hành">
              <span class="hp-farm-stat-icon">${activePetIcon}</span>
              <div class="hp-farm-stat-info">
                <span class="hp-farm-stat-val truncate">${activePetName}</span>
                <span class="hp-farm-stat-label">Linh thú</span>
              </div>
            </div>
          </div>
          <div class="hp-farm-action">
            <a href="#farm" class="btn-farm-enter" style="white-space:nowrap;">
              <span>Vào nông trại</span>
              <span class="btn-farm-arrow">${ic('arrow-right', { size: 16 })}</span>
            </a>
          </div>
        </div>
      </section>
    `;

    // 4. LỐI TẮT LUYỆN TẬP (6 Ô NÉT MẢNH, STROKE 1.75)
    const shortcutsHtml = `
      <section class="hp-shortcuts-wrap" aria-label="Lối tắt luyện tập trọng điểm">
        <div class="hp-section-header">
          <span class="hp-eyebrow">Rèn luyện trọng điểm</span>
          <h2 class="hp-section-title">Lối tắt luyện tập tiếng Trung</h2>
          <p class="hp-section-sub">Truy cập nhanh các công cụ thực hành chuyên sâu theo từng kỹ năng.</p>
        </div>

        <div class="hp-shortcuts-grid">
          <!-- 1. Lộ trình -->
          <a href="#zh/learn" class="hp-shortcut-card">
            <div class="hp-shortcut-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
            </div>
            <h3 class="hp-shortcut-title">Lộ trình</h3>
            <p class="hp-shortcut-desc">Từng bước chuẩn HSK 3.0</p>
          </a>

          <!-- 2. Luyện phát âm -->
          <a href="#zh/speak" class="hp-shortcut-card">
            <div class="hp-shortcut-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </div>
            <h3 class="hp-shortcut-title">Luyện phát âm</h3>
            <p class="hp-shortcut-desc">Chuẩn hóa thanh điệu, ngữ điệu</p>
          </a>

          <!-- 3. Gõ Pinyin -->
          <a href="#zh/typing" class="hp-shortcut-card">
            <div class="hp-shortcut-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2.5"/><line x1="6" x2="6.01" y1="8" y2="8"/><line x1="10" x2="10.01" y1="8" y2="8"/><line x1="14" x2="14.01" y1="8" y2="8"/><line x1="18" x2="18.01" y1="8" y2="8"/><line x1="6" x2="6.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="12" y2="12"/><line x1="7" x2="17" y1="16" y2="16"/></svg>
            </div>
            <h3 class="hp-shortcut-title">Gõ Pinyin</h3>
            <p class="hp-shortcut-desc">Rèn phản xạ gõ chuẩn</p>
          </a>

          <!-- 4. Thẻ ôn -->
          <a href="#zh/flashcards" class="hp-shortcut-card">
            <div class="hp-shortcut-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <h3 class="hp-shortcut-title">Thẻ ôn</h3>
            <p class="hp-shortcut-desc">Lặp lại ngắt quãng SM-2</p>
          </a>

          <!-- 5. Trò chơi -->
          <a href="#zh/games" class="hp-shortcut-card">
            <div class="hp-shortcut-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>
            </div>
            <h3 class="hp-shortcut-title">Trò chơi</h3>
            <p class="hp-shortcut-desc">Ghép từ rèn trí nhớ</p>
          </a>

          <!-- 6. Luyện viết -->
          <a href="#zh/writing" class="hp-shortcut-card">
            <div class="hp-shortcut-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4-14 14H4v-4L18 2z"/><line x1="14.5" x2="18.5" y1="5.5" y2="9.5"/></svg>
            </div>
            <h3 class="hp-shortcut-title">Luyện viết</h3>
            <p class="hp-shortcut-desc">Thuận bút từng nét chữ Hán</p>
          </a>
        </div>
      </section>
    `;

    // 5. CHÂN TRANG TỐI GIẢN 1 DÒNG
    const footerHtml = `
      <footer class="hp-footer">
        <span class="hp-footer-brand">Polylingo</span>
        <span class="hp-footer-sep">•</span>
        <span class="hp-footer-slogan">Gieo chữ mỗi ngày, nói cùng thế giới</span>
        <span class="hp-footer-sep">•</span>
        <span>Học tiếng Anh, Trung, Nhật, Đức, Nga — từng bài nhỏ, mỗi ngày.</span>
      </footer>
    `;

    // Khung chứa tổng thể
    containerEl.innerHTML = `
      <div class="hp-portal-shell">
        ${todayBlockHtml}
        ${postersHtml}
        ${farmStripHtml}
        ${shortcutsHtml}
        ${footerHtml}
      </div>
    `;

    // Học thử 1 phút, thẻ phút học / từ cần ôn, phần giới thiệu + hỏi đáp (boost.js)
    if (typeof window !== 'undefined' && window.PolyBoost && typeof window.PolyBoost.decoratePortal === 'function') {
      try { window.PolyBoost.decoratePortal(containerEl); } catch (e) { console.warn('[Portal] PolyBoost:', e); }
    }

    // Mặc định mở rộng Nhiệm vụ ngày trên Desktop (>768px), thu gọn trên điện thoại (<=768px)
    const questsDetails = containerEl.querySelector('#hp-quests-details');
    if (questsDetails && typeof window !== 'undefined') {
      if (window.innerWidth > 768) {
        questsDetails.setAttribute('open', '');
      } else {
        questsDetails.removeAttribute('open');
      }
    }

    // Bắt sự kiện nút loa Từ của ngày
    const speakBtn = containerEl.querySelector('#hp-btn-speak-wotd');
    if (speakBtn) {
      speakBtn.onclick = function (e) {
        e.preventDefault();
        speakChinese(wotd.char);
      };
    }

    // Bắt sự kiện các nút "Nhận" phần thưởng nhiệm vụ
    containerEl.querySelectorAll('.hp-btn-claim').forEach(btn => {
      btn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const qid = btn.getAttribute('data-quest-id');
        if (qid && window.Economy && typeof window.Economy.claimQuest === 'function') {
          const ok = window.Economy.claimQuest(qid);
          if (ok) {
            render(containerEl);
          }
        }
      };
    });
  }

  // Đăng ký toàn cục
  window.Portal = {
    render: render
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.Portal;
  }
})();
