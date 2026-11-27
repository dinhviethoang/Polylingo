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
/sw.js
  Cache-Control: no-cache
H
echo "dist: $(find dist -type f | wc -l) file, $(du -sh dist | cut -f1)"
