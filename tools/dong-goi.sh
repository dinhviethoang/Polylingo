#!/usr/bin/env bash
# Đóng gói web vào dist/ để đăng Cloudflare Pages (chỉ file web, không hồ sơ Chrome/test/ảnh kiểm tra)
set -e
cd "$(dirname "$0")/.."
rm -rf dist && mkdir -p dist
cp index.html *.css *.js dist/
rm -f dist/_kiem_tra_*.js
cp -r data game dist/
rm -f dist/game/*-demo.html
mkdir -p dist/assets && cp assets/*.svg assets/brand.html dist/assets/
[ -d assets/island ] && cp -r assets/island dist/assets/
[ -d assets/cay-tre ] && { mkdir -p dist/assets/cay-tre; find assets/cay-tre -maxdepth 1 -type f -exec cp {} dist/assets/cay-tre/ \; ; }
printf '/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n' > dist/_headers
echo "dist: $(find dist -type f | wc -l) file, $(du -sh dist | cut -f1)"
