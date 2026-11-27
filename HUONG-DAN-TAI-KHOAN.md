# Hướng dẫn bật tài khoản & tự đăng web (Cloudflare D1 + GitHub Actions)

Web vẫn chạy được khi bấm đúp `index.html` (file://). Khi đó chỉ có **Xuất/Nhập tiến độ** bằng file.
Tài khoản (đăng ký, đăng nhập, đồng bộ tiến độ giữa các máy) chỉ chạy trên bản đăng ở `https://polylingo.pages.dev`.

## Cách hoạt động

| Phần | File |
|---|---|
| Giao diện đăng nhập, xuất/nhập file, tự đồng bộ | `account.js`, `account.css` (nút "Đăng nhập" góc phải header) |
| API `/api/auth/*`, `/api/progress` | `functions/api/[[path]].js` (Cloudflare Pages Functions) |
| Bảng dữ liệu | `migrations/0001_init.sql` (users, sessions, progress, login_attempts) |
| Cấu hình Cloudflare | `wrangler.toml` (binding `DB` → D1 `polylingo-db`) |
| Tự test + đăng khi đẩy code | `.github/workflows/deploy.yml` |

- Mật khẩu băm PBKDF2-SHA256 100.000 vòng, không lưu mật khẩu gốc.
- Phiên đăng nhập là cookie HttpOnly/Secure 30 ngày; D1 chỉ lưu mã băm của cookie.
- Sai mật khẩu 10 lần trong 15 phút thì khóa tạm email đó.
- Tiến độ = toàn bộ localStorage của web (từ đã học SM-2, lộ trình, ví xu, vườn...). Tự đẩy lên mỗi phút khi có thay đổi và khi rời trang. Nếu máy này và tài khoản khác nhau, web hỏi giữ bản nào.

## Làm một lần (trên máy Windows, PowerShell, trong thư mục dự án)

1. Đăng nhập Cloudflare (mở trình duyệt để xác nhận):
   ```powershell
   npx.cmd wrangler@3 login
   ```
2. Tạo cơ sở dữ liệu D1:
   ```powershell
   npx.cmd wrangler@3 d1 create polylingo-db
   ```
   Lệnh in ra `database_id = "xxxxxxxx-...."`. Mở `wrangler.toml`, thay `THAY_BANG_ID_CUA_D1` bằng mã đó.
3. Tạo bảng:
   ```powershell
   npx.cmd wrangler@3 d1 migrations apply polylingo-db --remote
   ```
4. Đăng thử bằng tay (từ nay có cả API):
   ```powershell
   bash tools/dong-goi.sh
   npx.cmd wrangler@3 pages deploy dist --project-name polylingo --branch main --commit-dirty=true
   ```
   Nếu Cloudflare báo dự án chưa gắn D1: vào dash.cloudflare.com → Workers & Pages → polylingo → Settings → Bindings → Add → D1 database, tên biến `DB`, chọn `polylingo-db`, rồi đăng lại.

## Để GitHub tự đăng mỗi khi đẩy code

1. Tạo API token: dash.cloudflare.com → My Profile → API Tokens → Create Token → **Create Custom Token**, quyền:
   - Account → **Cloudflare Pages** → Edit
   - Account → **D1** → Edit
2. Lấy Account ID: dash.cloudflare.com → Workers & Pages → cột phải "Account ID".
3. Trên GitHub: repo `polylingo` → Settings → Secrets and variables → Actions → New repository secret:
   - `CLOUDFLARE_API_TOKEN` = token vừa tạo
   - `CLOUDFLARE_ACCOUNT_ID` = Account ID
4. Từ đó mỗi lần đẩy lên nhánh `main`: GitHub chạy toàn bộ test → đóng gói → cập nhật bảng D1 → đăng lên polylingo.pages.dev (giữ nguyên địa chỉ cũ). Xem kết quả ở tab **Actions** của repo.

## Kiểm tra API

```powershell
node tests/api.test.js
```
Test dùng SQLite giả lập D1 (cần Node 22.5+), không đụng vào dữ liệu thật.
