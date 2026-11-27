/**
 * phonics-en.js
 * Module Ngữ âm IPA tiếng Anh chuẩn quốc tế cho Polylingo (#en/phonics)
 * 44 âm IPA, Luyện cặp âm tối thiểu (Minimal Pairs), Âm cuối (-s, -ed), Nhấn âm & Nối âm.
 */

(function () {
  'use strict';

  const LOCAL_ICONS = {
    mouth: '<path d="M12 18c4 0 7-3 8-6-3 0-5 1-8 1s-5-1-8-1c1 3 4 6 8 6z"></path><path d="M4 12c2.5-3 5-4 8-4s5.5 1 8 4"></path>'
  };

  const ic = (name, opts = {}) => {
    if (typeof window !== 'undefined' && window.PolyIcons && window.PolyIcons.has(name)) {
      return window.PolyIcons.svg(name, opts);
    }
    if (typeof PolyIcons !== 'undefined' && PolyIcons.has && PolyIcons.has(name)) {
      return PolyIcons.svg(name, opts);
    }
    if (LOCAL_ICONS[name]) {
      const size = opts.size || opts.width || 24;
      const cls = ('ds-icon ' + (opts.className || opts.class || '')).trim();
      const fill = opts.fill || 'none';
      const strokeWidth = opts.strokeWidth || 2;
      return `<svg class="${cls}" aria-hidden="true" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${fill}" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${LOCAL_ICONS[name]}</svg>`;
    }
    return '';
  };

  function playTts(text) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.85;
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => (v.lang || '').toLowerCase() === 'en-us' || (v.lang || '').startsWith('en'));
      if (enVoice) u.voice = enVoice;
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }

  const PhonicsEn = {
    container: null,
    activeSubtab: 'ipa-chart',
    filterGroup: 'all', // 'all', 'monophthong', 'diphthong', 'consonant'
    selectedSound: null,
    
    // Minimal pairs state
    pairIndex: 0,
    pairScore: 0,
    pairTotal: 0,
    currentPairTarget: null, // 'A' or 'B'
    pairAnswered: false,

    mount(container) {
      this.container = container;
      this.render();
    },

    onShow(params) {
      if (!this.container) return;
      if (params && typeof params.get === 'function') {
        const sub = params.get('sub');
        if (sub && ['ipa-chart', 'minimal-pairs', 'final-sounds', 'stress-linking'].includes(sub)) {
          this.activeSubtab = sub;
        }
      }
      this.render();
    },

    onHide() {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      this.selectedSound = null;
    },

    getData() {
      return (typeof window !== 'undefined' && window.EN_PHONICS) || {
        sounds: [],
        minimalPairs: [],
        finalSounds: {},
        stress: {},
        linking: {}
      };
    },

    render() {
      if (!this.container) return;
      const data = this.getData();

      this.container.innerHTML = `
        <div class="phonics-en-wrap">
          <!-- Header Giới thiệu Ngữ âm IPA -->
          <div class="phonics-en-header">
            <div class="phonics-header-title-box">
              <span class="phonics-badge-royal">Ngữ âm IPA Chuẩn Quốc Tế</span>
              <h1 class="phonics-main-title">44 Âm Tiết IPA Tiếng Anh</h1>
              <p class="phonics-main-desc">
                Nền tảng phát âm chuẩn bản ngữ cho người Việt. Làm chủ khẩu hình, phân biệt cặp âm dễ nhầm, làm chủ âm cuối và ngữ điệu nối âm.
              </p>
            </div>
          </div>

          <!-- Menu điều hướng các chuyên đề -->
          <nav class="phonics-nav-tabs" role="tablist">
            <button class="phonics-tab-btn ${this.activeSubtab === 'ipa-chart' ? 'active' : ''}" data-sub="ipa-chart">
              <span>Bảng 44 âm IPA</span>
            </button>
            <button class="phonics-tab-btn ${this.activeSubtab === 'minimal-pairs' ? 'active' : ''}" data-sub="minimal-pairs">
              <span>Luyện cặp âm tối thiểu</span>
            </button>
            <button class="phonics-tab-btn ${this.activeSubtab === 'final-sounds' ? 'active' : ''}" data-sub="final-sounds">
              <span>Quy tắc Âm cuối (-s, -ed)</span>
            </button>
            <button class="phonics-tab-btn ${this.activeSubtab === 'stress-linking' ? 'active' : ''}" data-sub="stress-linking">
              <span>Nhấn âm & Nối âm</span>
            </button>
          </nav>

          <!-- Vùng nội dung chuyên đề -->
          <div class="phonics-tab-body">
            ${this.renderActiveSubtab(data)}
          </div>

          <!-- Modal chi tiết âm -->
          ${this.selectedSound ? this.renderSoundModal(this.selectedSound) : ''}
        </div>
      `;

      this.attachEvents();
    },

    renderActiveSubtab(data) {
      if (this.activeSubtab === 'minimal-pairs') {
        return this.renderMinimalPairsSection(data.minimalPairs || []);
      }
      if (this.activeSubtab === 'final-sounds') {
        return this.renderFinalSoundsSection(data.finalSounds || {});
      }
      if (this.activeSubtab === 'stress-linking') {
        return this.renderStressLinkingSection(data.stress || {}, data.linking || {});
      }
      return this.renderIpaChartSection(data.sounds || []);
    },

    /* ==========================================================================
       SUBTAB 1: BẢNG 44 ÂM IPA
       ========================================================================== */
    renderIpaChartSection(sounds) {
      const monophthongs = sounds.filter(s => s.group === 'monophthong');
      const diphthongs = sounds.filter(s => s.group === 'diphthong');
      const consonants = sounds.filter(s => s.group === 'consonant');

      let displaySounds = sounds;
      if (this.filterGroup === 'monophthong') displaySounds = monophthongs;
      else if (this.filterGroup === 'diphthong') displaySounds = diphthongs;
      else if (this.filterGroup === 'consonant') displaySounds = consonants;

      return `
        <div class="phonics-section-ipa">
          <div class="phonics-filter-bar">
            <span class="filter-label">Lọc theo nhóm âm:</span>
            <div class="filter-chips">
              <button class="filter-chip ${this.filterGroup === 'all' ? 'active' : ''}" data-filter="all">Tất cả (44)</button>
              <button class="filter-chip ${this.filterGroup === 'monophthong' ? 'active' : ''}" data-filter="monophthong">Nguyên âm đơn (12)</button>
              <button class="filter-chip ${this.filterGroup === 'diphthong' ? 'active' : ''}" data-filter="diphthong">Nguyên âm đôi (8)</button>
              <button class="filter-chip ${this.filterGroup === 'consonant' ? 'active' : ''}" data-filter="consonant">Phụ âm (24)</button>
            </div>
          </div>

          <div class="phonics-sounds-grid">
            ${displaySounds.map(s => {
              const sampleWord = (s.examples && s.examples[0]) ? s.examples[0].word : '';
              return `
                <div class="phonics-sound-card group-${s.group}" data-ipa="${s.ipa}">
                  <div class="sound-card-header">
                    <span class="sound-group-pill">${s.subgroup || (s.group === 'consonant' ? 'phụ âm' : 'nguyên âm')}</span>
                    <button class="sound-audio-mini-btn" data-speak="${sampleWord || s.ipa}" title="Nghe phát âm">${ic('volume')}</button>
                  </div>
                  <div class="sound-ipa-display">${s.ipa}</div>
                  <div class="sound-name-display">${s.name}</div>
                  <div class="sound-samples-preview">
                    ${(s.examples || []).slice(0, 2).map(ex => `<span><b>${ex.word}</b> ${ex.ipa}</span>`).join(' · ')}
                  </div>
                  <div class="sound-card-action">
                    <span class="action-text">Xem khẩu hình & ví dụ →</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    },

    /* Modal hiển thị chi tiết âm */
    renderSoundModal(sound) {
      return `
        <div class="phonics-modal-overlay" id="phonics-sound-modal">
          <div class="phonics-modal-card">
            <button class="phonics-modal-close" id="btn-close-sound-modal" aria-label="Đóng">${ic('x')}</button>

            <div class="modal-sound-header">
              <div class="modal-ipa-badge">${sound.ipa}</div>
              <div class="modal-title-box">
                <h2 class="modal-sound-title">${sound.name}</h2>
                <span class="modal-sound-subgroup">${sound.subgroup || sound.group}</span>
              </div>
              <button class="modal-sound-listen-btn" id="btn-modal-speak-sound" data-speak="${(sound.examples && sound.examples[0]) ? sound.examples[0].word : sound.ipa}">
                ${ic('volume')} Nghe âm mẫu
              </button>
            </div>

            <div class="modal-content-grid">
              <!-- Khẩu hình mô tả tiếng Việt -->
              <div class="modal-info-block block-mouth">
                <h3 class="block-title">${ic('mouth')} Khẩu hình miệng & Vị trí lưỡi:</h3>
                <p class="block-text">${sound.mouth || 'Mở rộng khẩu hình tự nhiên, phát âm rõ ràng.'}</p>
              </div>

              <!-- So sánh âm Việt -->
              <div class="modal-info-block block-compare">
                <h3 class="block-title">${ic('flag')} So sánh với âm tiếng Việt:</h3>
                <p class="block-text">${sound.viCompare || 'Tương đương âm cơ bản trong tiếng Việt.'}</p>
              </div>

              <!-- Lỗi người Việt hay mắc -->
              <div class="modal-info-block block-errors">
                <h3 class="block-title">${ic('alert')} Lỗi người Việt thường gặp:</h3>
                <p class="block-text">${sound.commonErrors || 'Bỏ quên âm cuối hoặc phát âm sai cao độ.'}</p>
              </div>

              <!-- 3 từ ví dụ minh họa -->
              <div class="modal-info-block block-examples">
                <h3 class="block-title">${ic('book')} Từ ví dụ minh họa (Bấm để nghe):</h3>
                <div class="modal-examples-list">
                  ${(sound.examples || []).map(ex => `
                    <div class="modal-example-row" data-speak="${ex.word}">
                      <button class="ex-audio-btn">${ic('volume')}</button>
                      <div class="ex-info">
                        <span class="ex-word">${ex.word}</span>
                        <span class="ex-ipa">${ex.ipa}</span>
                        <span class="ex-vi">${ex.vi}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="modal-actions-footer">
              <button class="btn btn-primary" id="btn-modal-done">Đã hiểu khẩu hình ${ic('check')}</button>
            </div>
          </div>
        </div>
      `;
    },

    /* ==========================================================================
       SUBTAB 2: LUYỆN CẶP ÂM TỐI THIỂU (MINIMAL PAIRS)
       ========================================================================== */
    renderMinimalPairsSection(pairs) {
      if (!pairs || pairs.length === 0) {
        return `<div class="phonics-empty">Chưa có dữ liệu cặp âm tối thiểu.</div>`;
      }

      if (this.pairIndex >= pairs.length) this.pairIndex = 0;
      const curPair = pairs[this.pairIndex];

      if (!this.currentPairTarget) {
        this.currentPairTarget = Math.random() < 0.5 ? 'A' : 'B';
        this.pairAnswered = false;
      }

      const targetWordObj = this.currentPairTarget === 'A' ? curPair.wordA : curPair.wordB;

      return `
        <div class="phonics-section-pairs">
          <div class="pairs-game-card">
            <div class="pairs-card-header">
              <div class="pairs-pair-badge">${curPair.soundA} vs ${curPair.soundB}</div>
              <div class="pairs-score-chip">
                Điểm số: <strong class="score-val">${this.pairScore}</strong> / ${this.pairTotal}
              </div>
            </div>

            <h2 class="pairs-game-title">${ic('headphones')} Nghe và chọn từ phát âm đúng</h2>
            <p class="pairs-game-hint">Bấm nút loa để nghe một trong hai từ, sau đó chọn từ mà bạn nghe thấy:</p>

            <div class="pairs-audio-area">
              <button class="pairs-play-audio-btn" id="btn-play-pair-audio" data-speak="${targetWordObj.word}">
                ${ic('volume')} Nghe từ phát âm
              </button>
            </div>

            <div class="pairs-options-grid">
              <button class="pair-choice-btn" data-choice="A" ${this.pairAnswered ? 'disabled' : ''}>
                <span class="choice-sound">${curPair.soundA}</span>
                <span class="choice-word">${curPair.wordA.word}</span>
                <span class="choice-ipa">${curPair.wordA.ipa}</span>
                <span class="choice-vi">${curPair.wordA.vi}</span>
              </button>

              <button class="pair-choice-btn" data-choice="B" ${this.pairAnswered ? 'disabled' : ''}>
                <span class="choice-sound">${curPair.soundB}</span>
                <span class="choice-word">${curPair.wordB.word}</span>
                <span class="choice-ipa">${curPair.wordB.ipa}</span>
                <span class="choice-vi">${curPair.wordB.vi}</span>
              </button>
            </div>

            <div id="pair-feedback-box" class="pair-feedback-box" style="display: ${this.pairAnswered ? 'block' : 'none'};">
              <div class="pair-tip-box">
                <span class="tip-icon">${ic('lightbulb')}</span>
                <span class="tip-text"><b>Mẹo phân biệt:</b> ${curPair.tip || 'Chú ý độ mở của khẩu hình và độ ngân dài.'}</span>
              </div>
              <button class="btn btn-primary btn-next-pair" id="btn-next-pair">Cặp âm tiếp theo →</button>
            </div>
          </div>
        </div>
      `;
    },

    /* ==========================================================================
       SUBTAB 3: QUY TẮC ÂM CUỐI (-S, -ED, ÂM NUỐT)
       ========================================================================== */
    renderFinalSoundsSection(fs) {
      const sRules = (fs && fs.s_z_iz && fs.s_z_iz.rules) || [];
      const edRules = (fs && fs.t_d_id && fs.t_d_id.rules) || [];
      const unreleased = (fs && fs.unreleasedStop && fs.unreleasedStop.examples) || [];

      return `
        <div class="phonics-section-rules">
          <!-- 1. Phát âm đuôi -s/-es -->
          <div class="rules-card-box">
            <div class="rules-box-header">
              <span class="rules-badge">Quy tắc 1</span>
              <h2>Phát âm đuôi -s / -es (/s/, /z/, /ɪz/)</h2>
            </div>
            <p class="rules-box-intro">
              Đuôi <code>-s / -es</code> của danh từ số nhiều và động từ ngôi thứ 3 số ít có 3 cách đọc phụ thuộc vào âm cuối của từ gốc:
            </p>
            <div class="rules-list-grid">
              ${sRules.map(r => `
                <div class="rule-detail-card">
                  <div class="rule-ipa-head">/<strong>${r.sound}</strong>/</div>
                  <div class="rule-condition">${r.condition}</div>
                  <div class="rule-mnemonic">${ic('lightbulb')} Mẹo nhớ: <em>${r.mnemonic || ''}</em></div>
                  <div class="rule-words-list">
                    ${(r.examples || []).map(w => `
                      <button class="rule-word-chip" data-speak="${w}">
                        <span>${w}</span> <small class="audio-chip-icon">${ic('volume', { size: 14 })}</small>
                      </button>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 2. Phát âm đuôi -ed -->
          <div class="rules-card-box">
            <div class="rules-box-header">
              <span class="rules-badge">Quy tắc 2</span>
              <h2>Phát âm đuôi -ed (/t/, /d/, /ɪd/)</h2>
            </div>
            <p class="rules-box-intro">
              Đuôi <code>-ed</code> ở thì quá khứ và phân từ có 3 cách đọc dựa trên âm kết thúc của động từ nguyên thể:
            </p>
            <div class="rules-list-grid">
              ${edRules.map(r => `
                <div class="rule-detail-card">
                  <div class="rule-ipa-head">/<strong>${r.sound}</strong>/</div>
                  <div class="rule-condition">${r.condition}</div>
                  <div class="rule-mnemonic">${ic('lightbulb')} Mẹo nhớ: <em>${r.mnemonic || ''}</em></div>
                  <div class="rule-words-list">
                    ${(r.examples || []).map(w => `
                      <button class="rule-word-chip" data-speak="${w}">
                        <span>${w}</span> <small class="audio-chip-icon">${ic('volume', { size: 14 })}</small>
                      </button>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 3. Âm nuốt / Chặn hơi -->
          <div class="rules-card-box">
            <div class="rules-box-header">
              <span class="rules-badge">Quy tắc 3</span>
              <h2>Âm cuối bị nuốt / Chặn hơi (Unreleased Stops)</h2>
            </div>
            <p class="rules-box-intro">
              Trong tiếng Anh tự nhiên, các âm tắc <code>/p/, /t/, /k/</code> đứng cuối câu hoặc đứng trước một phụ âm khác thường chỉ đặt khẩu hình chặn luồng hơi lại chứ không bật nổ to như khi đứng đầu từ:
            </p>
            <div class="rules-list-grid">
              ${unreleased.map(ex => `
                <div class="rule-detail-card">
                  <div class="rule-ipa-head">/<strong>${ex.sound || 'Âm cuối'}</strong>/</div>
                  <div class="rule-condition">${ex.rule || 'Chặn hơi tự nhiên, không bật mạnh.'}</div>
                  <div class="rule-words-list">
                    ${(ex.words || [ex.word]).filter(Boolean).map(w => `
                      <button class="rule-word-chip" data-speak="${w}">
                        <span>${w}</span> <small class="audio-chip-icon">${ic('volume', { size: 14 })}</small>
                      </button>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    },

    /* ==========================================================================
       SUBTAB 4: NHẤN ÂM & NỐI ÂM (STRESS & LINKING)
       ========================================================================== */
    renderStressLinkingSection(stress, linking) {
      const wordStress = stress.wordStressRules || [];
      const linkRules = linking.rules || [];

      return `
        <div class="phonics-section-rules">
          <!-- Trọng âm từ & câu -->
          <div class="rules-card-box">
            <div class="rules-box-header">
              <span class="rules-badge">Trọng âm</span>
              <h2>Quy tắc Nhấn Trọng Âm Tiếng Anh (Word & Sentence Stress)</h2>
            </div>
            <p class="rules-box-intro">
              Tiếng Anh là ngôn ngữ đa âm tiết có trọng âm (Stress-timed language). Âm mang trọng âm được đọc <strong>to hơn, cao hơn và ngân dài hơn</strong>:
            </p>
            <div class="rules-list-grid">
              ${wordStress.map(r => `
                <div class="rule-detail-card">
                  <div class="rule-ipa-head">${r.title}</div>
                  <div class="rule-condition">${r.rule}</div>
                  <div class="rule-words-list">
                    ${(r.examples || []).map(ex => `
                      <button class="rule-word-chip" data-speak="${ex.word || ex}">
                        <span><b>${ex.word || ex}</b> ${ex.ipa ? `[${ex.ipa}]` : ''}</span> <small class="audio-chip-icon">${ic('volume', { size: 14 })}</small>
                      </button>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Nối âm tự nhiên -->
          <div class="rules-card-box">
            <div class="rules-box-header">
              <span class="rules-badge">Nối âm</span>
              <h2>Kỹ thuật Nối Âm Tự Nhiên (Connected Speech & Linking)</h2>
            </div>
            <p class="rules-box-intro">
              Người bản xứ luôn nối các âm lại với nhau để lời nói mượt mà, liên tục và không bị đứt đoạn:
            </p>
            <div class="rules-list-grid">
              ${linkRules.map(r => `
                <div class="rule-detail-card">
                  <div class="rule-ipa-head">${r.name || r.title || 'Quy tắc nối âm'}</div>
                  <div class="rule-condition">${r.desc || r.rule || ''}</div>
                  <div class="rule-words-list">
                    ${(r.examples || []).map(ex => `
                      <button class="rule-word-chip phrase-chip" data-speak="${ex.phrase || ex.en || ex}">
                        <span>${ex.phrase || ex.en || ex} ${ex.trans ? `&rarr; <em>${ex.trans}</em>` : ''}</span> <small class="audio-chip-icon">${ic('volume', { size: 14 })}</small>
                      </button>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    },

    attachEvents() {
      if (!this.container) return;

      // Chuyển tab chuyên đề
      this.container.querySelectorAll('.phonics-tab-btn').forEach(btn => {
        btn.onclick = () => {
          this.activeSubtab = btn.getAttribute('data-sub');
          this.render();
        };
      });

      // Lọc nhóm âm ở bảng IPA
      this.container.querySelectorAll('.filter-chip').forEach(btn => {
        btn.onclick = () => {
          this.filterGroup = btn.getAttribute('data-filter');
          this.render();
        };
      });

      // Bấm vào thẻ âm để mở Modal chi tiết
      this.container.querySelectorAll('.phonics-sound-card').forEach(card => {
        card.onclick = (e) => {
          if (e.target.closest('.sound-audio-mini-btn')) return;
          const ipa = card.getAttribute('data-ipa');
          const data = this.getData();
          this.selectedSound = (data.sounds || []).find(s => s.ipa === ipa);
          this.render();
        };
      });

      // Nút phát âm âm nhỏ trên thẻ
      this.container.querySelectorAll('.sound-audio-mini-btn').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          playTts(btn.getAttribute('data-speak'));
        };
      });

      // Modal Events
      const modalClose = this.container.querySelector('#btn-close-sound-modal');
      const modalDone = this.container.querySelector('#btn-modal-done');
      if (modalClose) modalClose.onclick = () => { this.selectedSound = null; this.render(); };
      if (modalDone) modalDone.onclick = () => { this.selectedSound = null; this.render(); };

      const modalSoundSpeak = this.container.querySelector('#btn-modal-speak-sound');
      if (modalSoundSpeak) {
        modalSoundSpeak.onclick = () => playTts(modalSoundSpeak.getAttribute('data-speak'));
      }

      this.container.querySelectorAll('.modal-example-row').forEach(row => {
        row.onclick = () => playTts(row.getAttribute('data-speak'));
      });

      // Minimal Pairs Events
      const playPairBtn = this.container.querySelector('#btn-play-pair-audio');
      if (playPairBtn) {
        playPairBtn.onclick = () => playTts(playPairBtn.getAttribute('data-speak'));
      }

      const pairChoices = this.container.querySelectorAll('.pair-choice-btn');
      pairChoices.forEach(btn => {
        btn.onclick = () => {
          if (this.pairAnswered) return;
          this.pairAnswered = true;
          this.pairTotal++;

          const choice = btn.getAttribute('data-choice');
          const isCorrect = choice === this.currentPairTarget;

          if (isCorrect) {
            this.pairScore++;
            btn.classList.add('correct');
            if (typeof window !== 'undefined' && window.Economy && typeof window.Economy.reward === 'function') {
              try { window.Economy.reward('toneCorrect'); } catch (_) {}
            }
          } else {
            btn.classList.add('wrong');
            // Đánh dấu nút đúng
            pairChoices.forEach(b => {
              if (b.getAttribute('data-choice') === this.currentPairTarget) {
                b.classList.add('correct');
              }
            });
          }

          const fb = this.container.querySelector('#pair-feedback-box');
          if (fb) fb.style.display = 'block';
        };
      });

      const nextPairBtn = this.container.querySelector('#btn-next-pair');
      if (nextPairBtn) {
        nextPairBtn.onclick = () => {
          this.pairIndex++;
          this.currentPairTarget = null;
          this.pairAnswered = false;
          this.render();
        };
      }

      // Rules audio buttons
      this.container.querySelectorAll('.rule-word-chip').forEach(btn => {
        btn.onclick = () => playTts(btn.getAttribute('data-speak'));
      });
    }
  };

  if (typeof window !== 'undefined') {
    window.PhonicsEn = PhonicsEn;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhonicsEn;
  }
})();
