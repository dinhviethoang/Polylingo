#!/usr/bin/env bash
# Đóng gói web vào dist/ để đăng Cloudflare Pages (chỉ file web, không hồ sơ Chrome/test/ảnh kiểm tra).
# Thư mục functions/ (API tài khoản) nằm ở gốc dự án, wrangler tự lấy khi chạy "pages deploy dist".
set -e
cd "$(dirname "$0")/.."
rm -rf dist && mkdir -p dist
cp index.html manifest.webmanifest *.css *.js dist/
cp -r data game dist/
rm -f dist/game/*-demo.html
mkdir -p dist/assets && cp assets/*.svg assets/brand.html dist/assets/
# Ảnh assets/island và assets/cay-tre (~3,6MB) hiện không được trang nào dùng nên không đưa lên.

# Mã phiên bản cho service worker (xóa bộ đệm cũ mỗi lần đăng)
BUILD_ID="${GITHUB_SHA:-$(date +%Y%m%d%H%M%S)}"
sed -i.bak "s/__BUILD_ID__/${BUILD_ID:0:12}/" dist/sw.js && rm -f dist/sw.js.bak

cat > dist/_headers <<'H'
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), geolocation=()
  Strict-Transport-Security: max-age=31536000
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://challenges.cloudflare.com https://www.youtube.com https://s.ytimg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; media-src 'self' data: blob: https:; connect-src 'self' https://cdn.jsdelivr.net https://fonts.googleapis.com https://fonts.gstatic.com https://challenges.cloudflare.com; frame-src https://www.youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com; worker-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'
/sw.js
  Cache-Control: no-cache
H
echo "dist: $(find dist -type f | wc -l) file, $(du -sh dist | cut -f1)"
