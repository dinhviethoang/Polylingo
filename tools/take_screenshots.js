const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const base = path.resolve(__dirname, '..', '_anh-kiem-tra');
if (!fs.existsSync(base)) fs.mkdirSync(base, { recursive: true });

const shots = [
  { name: 'en-home.png', size: '1440,900', url: 'http://localhost:5180/index.html?v=402#en/home' },
  { name: 'en-learn.png', size: '1440,900', url: 'http://localhost:5180/index.html?v=402#en/learn' },
  { name: 'en-phonics.png', size: '1440,900', url: 'http://localhost:5180/index.html?v=402#en/phonics' },
  { name: 'en-talk.png', size: '1440,900', url: 'http://localhost:5180/index.html?v=402#en/talk' },
  { name: 'en-videos.png', size: '1440,900', url: 'http://localhost:5180/index.html?v=402#en/videos' },
  { name: 'zh-learn.png', size: '1440,900', url: 'http://localhost:5180/index.html?v=402#zh/learn' },
  { name: 'en-home-mobile.png', size: '375,812', url: 'http://localhost:5180/index.html?v=402#en/home' },
  { name: 'en-learn-mobile.png', size: '375,812', url: 'http://localhost:5180/index.html?v=402#en/learn' },
  { name: 'en-phonics-mobile.png', size: '375,812', url: 'http://localhost:5180/index.html?v=402#en/phonics' }
];

for (const s of shots) {
  const filePath = path.join(base, s.name);
  const args = [
    '--headless=new',
    '--disable-gpu',
    `--window-size=${s.size}`,
    '--virtual-time-budget=8000',
    `--screenshot=${filePath}`,
    s.url
  ];
  try {
    execFileSync(chrome, args, { stdio: 'ignore' });
    console.log(`Captured ${s.name} (${fs.statSync(filePath).size} bytes)`);
  } catch (err) {
    console.error(`Error capturing ${s.name}:`, err.message);
  }
}
