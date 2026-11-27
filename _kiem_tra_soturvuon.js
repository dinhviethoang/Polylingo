// _kiem_tra_soturvuon.js
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const URL = 'http://localhost:5180/#farm';
const SCREENSHOT_PATH = path.resolve(__dirname, '_anh-kiem-tra/soturvuon.png');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendCDP(ws, method, params = {}) {
  const id = Math.floor(Math.random() * 1000000);
  return new Promise((resolve, reject) => {
    const handleMsg = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handleMsg);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        }
      } catch (e) {}
    };
    ws.addEventListener('message', handleMsg);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function run() {
  console.log('1. Khởi động Chrome headless với cổng CDP 9222...');
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--window-size=1280,720',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=' + path.resolve(__dirname, '.chrome_profile'),
    URL
  ]);

  await sleep(2500);

  try {
    console.log('2. Kết nối Chrome DevTools Protocol...');
    const listRes = await fetch(`http://127.0.0.1:${PORT}/json`);
    const pages = await listRes.json();
    const targetPage = pages.find(p => p.type === 'page');
    if (!targetPage) throw new Error('Không tìm thấy target page');

    const ws = new WebSocket(targetPage.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });
    console.log('   Đã kết nối CDP WebSocket!');

    await sendCDP(ws, 'Page.enable');
    await sendCDP(ws, 'Runtime.enable');
    await sendCDP(ws, 'DOM.enable');

    await sleep(2000);

    // Chuẩn bị dữ liệu mẫu cho Sổ Từ Vườn và chậu
    console.log('3. Thiết lập dữ liệu mẫu: gieo Cây Từ & tạo mục Sổ Từ Vườn...');
    await sendCDP(ws, 'Runtime.evaluate', {
      expression: `(${function() {
        if (window.Economy) {
          const state = window.Economy.getState();
          if (state && state.farm) {
            if (!state.farm.wordbook) state.farm.wordbook = {};
            state.farm.wordbook['苹果'] = {
              hanzi: '苹果',
              pinyin: 'píngguǒ',
              meaning: 'Quả táo',
              hanViet: 'Bình quả',
              example: { zh: '我喜欢吃苹果。', py: 'Wǒ xǐhuan chī píngguǒ.', vi: 'Tôi thích ăn táo.' },
              status: 'due',
              stage: 2,
              reviewsPassed: 1,
              isWordTree: true
            };
            state.farm.wordbook['水'] = {
              hanzi: '水',
              pinyin: 'shuǐ',
              meaning: 'Nước',
              hanViet: 'Thủy',
              example: { zh: '请喝水。', py: 'Qǐng hē shuǐ.', vi: 'Xin mời uống nước.' },
              status: 'mastered',
              stage: 4,
              reviewsPassed: 4,
              isWordTree: true
            };
            state.farm.wordbook['菊花'] = {
              hanzi: '菊花',
              pinyin: 'júhuā',
              meaning: 'Hoa cúc vàng',
              status: 'normal',
              isNormalCrop: true
            };

            // Gieo cây từ vào slot 0 nếu chưa có
            if (state.farm.slots && state.farm.slots[0] && state.farm.slots[0].pot) {
              state.farm.slots[0].pot.crop = {
                cropId: 'word_tree',
                isWordTree: true,
                wordHanzi: '苹果',
                wordData: state.farm.wordbook['苹果'],
                stage: 2,
                reviewsPassed: 1,
                intervalIndex: 1,
                intervalMs: 86400000,
                plantedAt: Date.now() - 10000,
                lastReviewedAt: Date.now() - 10000,
                dueAt: Date.now() - 1000, // tới hạn ôn
                watered: true,
                isRipe: false,
                pest: null
              };
            }

            window.Economy.saveState();
          }
        }
      }.toString()})()`
    });

    await sleep(500);

    // 4. Kiểm tra elementFromPoint trên mọi chậu và nút
    console.log('4. Kiểm tra mọi chậu và nút bấm được (elementFromPoint)...');
    const evalResult = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `(${function() {
        const results = [];
        // Kiểm tra các chậu cây trên tầng đang hiển thị
        const pots = document.querySelectorAll('#vt-tier-0 .vt-pot-slot');
        pots.forEach((pot, idx) => {
          const rect = pot.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const el = document.elementFromPoint(cx, cy);
          const ok = !!(el && (pot === el || pot.contains(el)));
          results.push({ type: 'pot', index: idx, ok, elTag: el ? el.tagName + '.' + el.className : null });
        });

        // Kiểm tra các nút công cụ dưới đáy
        const buttons = document.querySelectorAll('.vt-bottom-bar .vt-bar-btn');
        buttons.forEach((btn, idx) => {
          const rect = btn.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const el = document.elementFromPoint(cx, cy);
          const ok = !!(el && (btn === el || btn.contains(el)));
          results.push({ type: 'btn', id: btn.id || btn.dataset.tool, ok, elTag: el ? el.tagName + '.' + el.className : null });
        });

        return results;
      }.toString()})()`,
      returnByValue: true
    });

    const checkResults = evalResult.result.value || [];
    let potPass = 0, potFail = 0, btnPass = 0, btnFail = 0;
    checkResults.forEach(r => {
      if (r.type === 'pot') {
        if (r.ok) potPass++; else potFail++;
      } else {
        if (r.ok) btnPass++; else btnFail++;
      }
    });
    console.log(`   Kết quả: Chậu (${potPass} pass, ${potFail} fail), Nút bấm (${btnPass} pass, ${btnFail} fail)`);
    if (potFail > 0 || btnFail > 0) {
      console.warn('   Chi tiết elementFromPoint fail:', checkResults.filter(r => !r.ok));
    }

    // 5. Mở Sổ Từ Vườn
    console.log('5. Mở Sổ Từ Vườn (Garden Wordbook)...');
    await sendCDP(ws, 'Runtime.evaluate', {
      expression: `(${function() {
        const btn = document.getElementById('vt-btn-open-wordbook');
        if (btn) btn.click();
        else if (window.Farm && typeof window.Farm.openGardenWordbookModal === 'function') {
          window.Farm.openGardenWordbookModal();
        }
      }.toString()})()`
    });

    await sleep(1200);

    // 6. Chụp ảnh màn hình lưu vào _anh-kiem-tra/soturvuon.png
    console.log('6. Chụp ảnh màn hình lưu _anh-kiem-tra/soturvuon.png...');
    const shot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.data, 'base64');
    fs.writeFileSync(SCREENSHOT_PATH, buffer);
    console.log(`   Đã lưu ảnh thành công: ${SCREENSHOT_PATH} (${buffer.length} bytes)`);

    ws.close();
  } finally {
    chromeProcess.kill();
  }
}

run().catch(err => {
  console.error('Lỗi kiểm tra UI:', err);
  process.exit(1);
});
