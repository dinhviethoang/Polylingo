# Polylingo — Gieo chữ mỗi ngày, nói cùng thế giới

Ứng dụng web tĩnh đa ngôn ngữ hỗ trợ người Việt mới bắt đầu học ngoại ngữ (Tiếng Trung 🇨🇳, Tiếng Anh 🇬🇧, Tiếng Nhật 🇯🇵, Tiếng Nga 🇷🇺). "Học tiếng Anh, Trung, Nhật, Nga — từng bài nhỏ, mỗi ngày." Chạy 100% bằng HTML/CSS/JS thuần, mở trực tiếp bằng cách bấm đúp `index.html` (giao thức `file://`), không cần server hay bước build phức tạp.

> 🎨 Xem hệ thống nhận diện thương hiệu chi tiết tại [assets/brand.html](assets/brand.html).

## 🌐 Tính Năng & Kiến Trúc Đa Ngôn Ngữ

1. **Cấu Trúc Đa Ngôn Ngữ (`languages.js`)**:
   - `window.LANGUAGES`: Mảng cấu hình trung tâm định nghĩa các ngôn ngữ, cờ hiệu, tên bản ngữ, font chữ, mã giọng TTS, màu nhấn (`accentColor`) và danh sách phân hệ học (`sections`).
   - Dữ liệu khóa học Tiếng Trung được tổ chức trong thư mục `data/zh/` (`pinyin.js`, `vocab.js`, `dialogues.js`, `radicals.js`).
   - Tương thích ngược: Toàn bộ khóa lưu trữ `localStorage` (`hsk_sm2_data`, `hsk_streak`, `hsk_daily_target`, `hsk_speech_rate`, `hsk_theme`, `hsk_quiz_wrongs`) được giữ nguyên vẹn, không làm mất tiến độ học của người dùng cũ.

2. **Thương Hiệu & Header (Menu ngang)**:
   - Logo **Polylingo** (`assets/logo.svg` trên nền sáng, `assets/logo-dark.svg` trên nền tối) và biểu tượng hoa hội thoại 4 cánh (`assets/logo-mark.svg`), bấm vào luôn đưa về Trang chủ chung (`#/`).
   - Thanh chọn ngôn ngữ sinh tự động từ `window.LANGUAGES`: Cờ + Tên, nhãn "Sắp có" cho ngôn ngữ chưa sẵn sàng, ngôn ngữ đang chọn được tô nổi bật.
   - Nút chuyển đổi giao diện Sáng / Tối (Dark mode).

3. **Sidebar Linh Hoạt (Menu dọc - 240px)**:
   - Tiêu đề hiển thị cờ + tên ngôn ngữ đang học.
   - Danh sách các mục học (`sections`) của ngôn ngữ tương ứng, tự động đánh dấu mục đang mở.
   - Chân sidebar tích hợp:
     - Nút cài đặt tốc độ đọc riêng (`🐇 0.9x` / `🐢 0.6x`).
     - Hộp tiến độ trực quan: Số từ đã thuộc / 150, chuỗi ngày học 🔥.

4. **Trang Chủ Chung (Portal - hash `#/` hoặc trống)**:
   - Lời chào mừng và lưới thẻ ngôn ngữ (cờ lớn, tên Việt + bản ngữ, mô tả 1 dòng, thanh tiến độ, nút Bắt đầu học).
   - Tự động ẩn sidebar để trải nghiệm xem tổng quan toàn màn hình.

5. **Tiếng Nhật (`#ja/...`)**: `japanese.js` + `japanese.css` vẽ Tổng quan, Lộ trình 35 bài, Bảng chữ Kana, Từ vựng N5 (703 từ), Kanji (103 chữ có âm Hán Việt), Thẻ ghi nhớ, Tập viết (nét KanjiVG), Luyện gõ, Kiểm tra; Luyện nói và Hội thoại dùng chung `talk.js`/`app.js`. Dữ liệu ở `data/ja/`, lõi xử lý `data/ja/ja-core.js`, chỉ tải khi vào tiếng Nhật. Test: `node tests/ja.test.js`.

6. **Trang Sắp Ra Mắt (`#ru/...`)**:
   - Sidebar hiển thị danh sách mục dự kiến dưới dạng làm mờ (dimmed).
   - Trang nội dung "Sắp ra mắt" đẹp mắt kèm nút chuyển nhanh sang "Học tiếng Trung trước".

7. **Định Tuyến SPA (Hash Router)**:
   - Định dạng chuẩn: `#{langId}/{sectionId}?{params}` (ví dụ: `#zh/vocab`, `#zh/writing?char=你`).
   - Tự động chuyển tiếp thông minh từ các hash cũ (`#vocab` &rarr; `#zh/vocab`).
   - Ghi nhớ ngôn ngữ và phân hệ học cuối cùng trong `localStorage` qua `try/catch`.

8. **Font Chữ & Giọng Đọc**:
   - Giao diện người dùng sử dụng font chuẩn tiếng Việt **Be Vietnam Pro** qua Google Fonts.
   - Font chữ Hán **Noto Sans SC** được áp dụng riêng biệt cho phần hiển thị chữ Hán.
   - Giọng đọc Web Speech API (`SpeechSynthesis`) tự động chọn theo cấu hình TTS của từng ngôn ngữ.

8. **Tương Thích Di Động (<860px và 375px)**:
   - Header thu gọn, menu ngôn ngữ cuộn ngang mượt mà.
   - Nút ☰ mở ngăn kéo (drawer) trượt từ mép trái với lớp phủ làm mờ (overlay). Tự động đóng ngăn kéo khi chọn mục hoặc bấm ra ngoài.
   - Giao diện được tối ưu không tràn ngang trên màn hình nhỏ từ 375px trở lên.

9. **Tài khoản & đồng bộ tiến độ** (`account.js`, `functions/api/`, `migrations/`):
   - Nút "Đăng nhập" ở header: đăng ký/đăng nhập, tự lưu tiến độ lên Cloudflare D1 và học tiếp trên máy khác.
   - Xuất/Nhập tiến độ ra file JSON (dùng được cả khi mở bằng file://).
   - Cài đặt một lần và tự đăng qua GitHub Actions: xem [HUONG-DAN-TAI-KHOAN.md](HUONG-DAN-TAI-KHOAN.md).

10. **Khác**: báo khi máy thiếu giọng đọc (`voice-check.js`), cờ SVG (`langFlag()` trong `languages.js`), dữ liệu nặng tiếng Trung tải khi mở Lộ trình, PWA (`manifest.webmanifest`, `sw.js`).

## Chạy test

```bash
for t in tests/*.test.js; do node "$t"; done
```
