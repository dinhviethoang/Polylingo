# Hướng dẫn thêm Video vào PolyLingo

Tài liệu hướng dẫn từng bước chuẩn bị phụ đề, tải lên YouTube và đưa video vào học trên web PolyLingo.

---

## 1. Chuẩn bị phụ đề (.srt hoặc .vtt)
Hỗ trợ 2 hình thức:
- **Cách A — 1 file song ngữ (khuyên dùng):** Mỗi khối thời gian gồm 2 dòng (dòng 1 chữ Hán, dòng 2 tiếng Việt):
  ```srt
  1
  00:00:01,000 --> 00:00:04,500
  你好，很高兴认识你！
  Xin chào, rất vui được làm quen với bạn!
  ```
- **Cách B — 2 file riêng biệt:** 1 file chữ Hán (`sub_zh.srt`) và 1 file tiếng Việt (`sub_vi.srt`) khớp theo thời gian.
- **Cách C — Dùng trực tiếp kịch bản polylingo:** Nếu làm video qua pipeline của kênh `polylingo`, có thể dùng thẳng file kịch bản Markdown (`--kich-ban kich-ban/video-NN.md`).

---

## 2. Tải video lên YouTube
Khi upload video lên YouTube Studio:
1. **Chế độ hiển thị:** Chọn **Công khai (Public)** hoặc **Không công khai (Unlisted)** (ai có link đều xem được).
2. **Cài đặt nhúng (bắt buộc):** Vào *Chi tiết video* → *Hiện thêm (Show more)* → mục *Giấy phép và phân phối* → **TÍCH CHỌN "Cho phép nhúng" (Allow embedding)**. Nếu tắt mục này, YouTube sẽ chặn trình phát trên web.

---

## 3. Đưa video vào Web PolyLingo

### Cách 1: Nhanh trên giao diện Web (Khuyên dùng khi thử nghiệm)
1. Mở web: `http://localhost:5180/#zh/videos`
2. Nhấn nút **`＋ Thêm video`** ở góc trên bên phải.
3. Dán link YouTube (hoặc ID 11 ký tự), điền tiêu đề, cấp độ, chủ đề.
4. Tải lên file phụ đề `.srt` / `.vtt` (hoặc dán trực tiếp nội dung).
5. Nhấn **`Lưu & Xem trước ngay`** để trải nghiệm tức thì (dữ liệu lưu tại máy này).
6. Nhấn nút **`Xuất mã JS`** để lấy đoạn code chuẩn dán vào file `data/zh/videos.js` nếu muốn chia sẻ cho mọi người.

### Cách 2: Bằng công cụ dòng lệnh CLI (`tools/them_video.py`)
Mở terminal tại thư mục dự án `C:\Users\KiNG_613\Projects\hoc-tieng-trung`:

- **Thêm video tiếng Trung (mặc định):**
  ```bash
  python tools/them_video.py --link "https://www.youtube.com/watch?v=VIDEO_ID" --tieu-de "Chào hỏi cơ bản" --cap HSK1 --chu-de "Chào hỏi" --sub "duong/dan/phu_de.srt"
  ```

- **Thêm video tiếng Anh (`--lang en`):**
  ```bash
  python tools/them_video.py --lang en --link "https://www.youtube.com/watch?v=VIDEO_ID" --tieu-de "Daily Conversations" --cap A1 --chu-de "Giao tiếp" --sub "duong/dan/sub_en.srt"
  ```
  *Ghi chú cho tiếng Anh:*
  - Tự động ghi vào `data/en/videos.js` (mảng `VIDEOS_EN`).
  - Tự động sinh phiên âm IPA nếu có thư viện `eng_to_ipa` (`pip install eng-to-ipa`). Nếu chưa cài đặt, hệ thống sẽ cảnh báo và để trống trường IPA.
  - Phụ đề có các chế độ xem: *English / English + IPA / English + Việt / Chỉ Việt / Ẩn*.
  - Bấm vào từ để tra nhanh từ điển `EN_WORDS`, nghe giọng `en-US` và thêm vào thẻ ôn.

- **Thêm từ 2 file riêng (Nguyên bản và Việt):**
  ```bash
  python tools/them_video.py --link "https://youtu.be/VIDEO_ID" --tieu-de "Đàm thoại mua sắm" --cap HSK2 --chu-de "Mua sắm" --sub "sub_zh.srt" --sub-vi "sub_vi.srt"
  ```

- **Thêm từ file kịch bản pipeline polylingo:**
  ```bash
  python tools/them_video.py --link "https://youtu.be/VIDEO_ID" --tieu-de "Giao tiếp hàng ngày" --cap HSK1 --chu-de "Đời sống" --kich-ban "C:\Users\KiNG_613\Projects\polylingo\kich-ban\video-01.md"
  ```

*Ghi chú chung:* Công cụ tự động xử lý phụ đề (Pinyin cho tiếng Trung / IPA cho tiếng Anh), tự lấy ảnh bìa YouTube và cập nhật vào `data/<lang>/videos.js` mà không gây trùng lặp ID.

---

## 4. Kiểm tra trên Web
1. Mở trình duyệt vào địa chỉ: `http://localhost:5180/#zh/videos` (Tiếng Trung) hoặc `http://localhost:5180/#en/videos` (Tiếng Anh).
2. Bạn sẽ thấy video xuất hiện trong lưới với ảnh thu nhỏ, nhãn cấp độ, chủ đề và thời lượng.
3. Bấm vào video để mở trang xem:
   - Thử các chế độ phụ đề tương tác tương ứng từng ngôn ngữ.
   - Bấm vào bất kỳ từ nào để tra nghĩa, nghe phát âm và thêm vào thẻ ôn.
   - Thử chế độ **Nói theo (Shadowing)** và hoàn thành bài kiểm tra trắc nghiệm cuối video.
