/**
 * data/zh/vocab-merge.js
 * Gộp bộ 150 từ cũ (window.VOCAB: Từ vựng, Thẻ ghi nhớ, Kiểm tra, Trò chơi...)
 * với bộ 501 từ HSK1 của Lộ trình (window.HSK1_WORDS) thành MỘT danh sách.
 *
 * - 150 từ cũ giữ nguyên id (v001...) nên tiến độ SM-2 đã học không mất.
 * - Từ HSK1 chưa có được thêm với id "h-<chữ Hán>", chủ đề suy ra từ bài học trong Lộ trình
 *   (hoặc từ loại với hư từ, động từ, tính từ...).
 * Nạp SAU vocab.js, curriculum.js, hsk1-words-a.js, hsk1-words-b.js.
 */
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const vocab = Array.isArray(root.VOCAB) ? root.VOCAB : (root.VOCAB = []);
  const words = root.HSK1_WORDS || {};
  const topics = Array.isArray(root.TOPICS) ? root.TOPICS : (root.TOPICS = []);

  const addTopic = (id, name, icon) => {
    if (!topics.some(t => t.id === id)) topics.push({ id, name, icon });
  };
  addTopic('nhap-mon', 'Nhập môn phát âm & chữ Hán', '🔤');
  addTopic('doi-song', 'Thời tiết, Sở thích & Năng lực', '🌤️');

  // Bài học (unit) của Lộ trình → chủ đề của mục Từ vựng
  const UNIT_TOPIC = {
    'intro-u1': 'nhap-mon',
    'intro-u2': 'nhap-mon',
    'hsk1-u1': 'chao-hoi',
    'hsk1-u2': 'thoi-gian',
    'hsk1-u3': 'gia-dinh',
    'hsk1-u4': 'do-an-uong',
    'hsk1-u5': 'dia-diem',
    'hsk1-u6': 'doi-song'
  };
  const POS_TOPIC = {
    'đại từ': 'dai-tu',
    'số từ': 'so-dem',
    'lượng từ': 'so-dem',
    'phó từ': 'hu-tu',
    'giới từ': 'hu-tu',
    'trợ từ': 'hu-tu',
    'liên từ': 'hu-tu',
    'thán từ': 'hu-tu',
    'cấu trúc': 'hu-tu',
    'động từ': 'dong-tu',
    'tính từ': 'tinh-tu'
  };

  const wordUnit = {};
  const cur = root.CURRICULUM;
  const levels = cur ? (Array.isArray(cur) ? cur : (cur.levels || [])) : [];
  levels.forEach(level => (level.units || []).forEach(unit => (unit.lessons || []).forEach(lesson => {
    (lesson.newWords || []).forEach(w => { if (!wordUnit[w]) wordUnit[w] = unit.id; });
  })));

  const have = new Set(vocab.map(v => v.hanzi));
  let added = 0;
  Object.keys(words).forEach(hanzi => {
    if (have.has(hanzi)) return;
    const w = words[hanzi] || {};
    const topic = POS_TOPIC[w.pos] || UNIT_TOPIC[wordUnit[hanzi]] || 'do-vat';
    vocab.push({
      id: 'h-' + hanzi,
      hanzi,
      pinyin: w.py || '',
      vi: w.vi || '',
      pos: w.pos || '',
      topic,
      hv: w.hv || '',
      ex: w.ex ? { zh: w.ex.zh || '', py: w.ex.py || '', vi: w.ex.vi || '' } : undefined,
      source: 'hsk1'
    });
    have.add(hanzi);
    added++;
  });

  root.VOCAB_MERGE_INFO = { total: vocab.length, added };
  const zh = (root.LANGUAGES || []).find(l => l.id === 'zh');
  if (zh) zh.totalWords = vocab.length;
})();
