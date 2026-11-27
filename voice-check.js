/**
 * voice-check.js — Báo cho học viên khi máy không có giọng đọc của ngôn ngữ đang học.
 *
 * Mọi module (app, learn, practice, talk, videos...) đều gọi speechSynthesis.speak().
 * File này bọc hàm đó một lần: nếu không tìm thấy giọng khớp utterance.lang
 * thì hiện một thanh thông báo kèm cách cài giọng (mỗi ngôn ngữ một lần mỗi phiên).
 * Nạp sớm, trước các module khác.
 */
(function () {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const LANG_NAMES = { zh: 'tiếng Trung', en: 'tiếng Anh', ja: 'tiếng Nhật', ru: 'tiếng Nga' };
  const warned = {};

  function hasVoice(lang) {
    const voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) return null; // chưa nạp xong danh sách, không kết luận
    const prefix = String(lang || '').toLowerCase().split(/[-_]/)[0];
    if (!prefix) return true;
    return voices.some(v => String(v.lang || '').toLowerCase().replace('_', '-').startsWith(prefix));
  }

  function guideFor(langName) {
    const ua = navigator.userAgent || '';
    if (/Windows/i.test(ua)) {
      return `Windows: Cài đặt → Thời gian và ngôn ngữ → Ngôn ngữ và khu vực → Thêm ngôn ngữ (${langName}) và chọn cài "Chuyển văn bản thành giọng nói", rồi tải lại trang. Hoặc dùng Microsoft Edge (có sẵn giọng online).`;
    }
    if (/Android/i.test(ua)) {
      return `Android: Cài đặt → Hệ thống → Ngôn ngữ → Đầu ra chuyển văn bản thành giọng nói → Công cụ của Google → tải dữ liệu giọng ${langName}.`;
    }
    if (/iPhone|iPad|Macintosh/i.test(ua)) {
      return `iPhone/Mac: Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói → tải giọng ${langName}.`;
    }
    return `Hãy cài gói giọng đọc ${langName} cho hệ điều hành, hoặc mở bằng Chrome/Edge bản mới.`;
  }

  function showBanner(lang) {
    const prefix = String(lang || '').toLowerCase().split(/[-_]/)[0];
    if (warned[prefix]) return;
    warned[prefix] = true;
    const langName = LANG_NAMES[prefix] || lang;

    const old = document.getElementById('voice-missing-banner');
    if (old) old.remove();
    const bar = document.createElement('div');
    bar.id = 'voice-missing-banner';
    bar.setAttribute('role', 'alert');
    bar.style.cssText = [
      'position:fixed', 'left:50%', 'bottom:16px', 'transform:translateX(-50%)', 'z-index:10000',
      'max-width:min(560px,calc(100vw - 24px))', 'background:#2b2118', 'color:#fff7ea',
      'border:1px solid #e0a84f', 'border-radius:14px', 'padding:12px 44px 12px 14px',
      'box-shadow:0 10px 30px rgba(0,0,0,.35)', 'font:500 14px/1.5 "Be Vietnam Pro",system-ui,sans-serif'
    ].join(';');
    const title = document.createElement('strong');
    title.textContent = `Máy chưa có giọng đọc ${langName}, nên bạn sẽ không nghe được phát âm.`;
    const p = document.createElement('div');
    p.style.marginTop = '4px';
    p.style.opacity = '0.9';
    p.textContent = guideFor(langName);
    const close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', 'Đóng thông báo');
    close.textContent = '×';
    close.style.cssText = 'position:absolute;top:6px;right:8px;width:32px;height:32px;border:0;background:transparent;color:inherit;font-size:22px;cursor:pointer;border-radius:8px';
    close.addEventListener('click', () => bar.remove());
    bar.append(title, p, close);
    (document.body || document.documentElement).appendChild(bar);
  }

  const synth = window.speechSynthesis;
  const originalSpeak = synth.speak.bind(synth);
  synth.speak = function (utterance) {
    try {
      const lang = (utterance && (utterance.lang || (utterance.voice && utterance.voice.lang))) || '';
      if (lang && hasVoice(lang) === false) showBanner(lang);
    } catch (_) { /* không chặn việc đọc */ }
    return originalSpeak(utterance);
  };

  window.PolyVoice = { hasVoice, showBanner };
})();
