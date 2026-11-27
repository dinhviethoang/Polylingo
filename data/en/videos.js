/**
 * data/en/videos.js
 * Danh sách video học tiếng Anh trên nền tảng Polylingo.
 * Hiện tại để rỗng để sau thêm video thực tế.
 */

(function () {
  'use strict';

  const VIDEOS_EN = [];

  if (typeof window !== 'undefined') {
    window.VIDEOS_EN = VIDEOS_EN;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = VIDEOS_EN;
  }
})();
