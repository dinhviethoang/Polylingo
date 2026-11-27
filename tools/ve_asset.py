"""Công cụ tạo bộ asset Đảo Nhỏ bằng AI (Gemini web qua Playwright)
Dùng cho web học ngoại ngữ Polylingo (hoc-tieng-trung).

Sử dụng:
  python tools/ve_asset.py [danh-sach.json] [--chi <id>] [--profile <path>] [--port <port>] [--dung-sai <int>]
"""
import argparse
import base64
import io
import json
import os
import re
import subprocess
import sys
import time
import urllib.request
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
from playwright.sync_api import sync_playwright

for s in (sys.stdout, sys.stderr):
    try:
        s.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Thư mục gốc dự án hoc-tieng-trung
GOC_DU_AN = Path(__file__).resolve().parent.parent
ASSETS_DIR = GOC_DU_AN / "assets" / "island"
RAW_DIR = ASSETS_DIR / "raw"

# Phong cách chung
PHONG_CACH_CHUNG = (
    "cozy hand-painted storybook game art, soft pastel palette, gentle warm lighting, "
    "clean soft outlines, subtle texture, cute rounded chibi proportions, "
    "3/4 top-down isometric-like view, high detail but uncluttered, original design"
)

# Selector & JS helper
JS_LON = "() => [...document.images].filter(i=>i.complete&&i.naturalWidth*i.naturalHeight>=40000).map(i=>i.currentSrc||i.src)"
O_NHAP = 'rich-textarea div[contenteditable="true"], div.ql-editor[contenteditable="true"]'
JS_CANVAS = """(src) => {
  const i = [...document.images].find(x => (x.currentSrc || x.src) === src);
  if (!i) return '';
  const c = document.createElement('canvas');
  c.width = i.naturalWidth;
  c.height = i.naturalHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(i, 0, 0);
  return c.toDataURL('image/png');
}"""

CHROME_PATHS = (
    Path("C:/Program Files/Google/Chrome/Application/chrome.exe"),
    Path("C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"),
    Path.home() / "AppData/Local/Google/Chrome/Application/chrome.exe",
)


def tim_chrome_exe():
    for p in CHROME_PATHS:
        if p.is_file():
            return p
    raise SystemExit("LỖI: Không tìm thấy chrome.exe trên hệ thống.")


def cong_dang_dung(port):
    try:
        urllib.request.urlopen(f"http://127.0.0.1:{port}/json/version", timeout=1)
        return True
    except OSError:
        return False


def tim_profile_mac_dinh():
    """Tìm profile Chrome có sẵn. Ưu tiên polylingo, fallback sang GoiSach."""
    poly = Path(r"C:\Users\KiNG_613\Projects\polylingo\.chrome-dang")
    if poly.exists():
        return poly, 9336
    goi_sach = Path(r"C:\Users\KiNG_613\Projects\GoiSach\.chrome-dang")
    if goi_sach.exists():
        return goi_sach, 9333
    suc_khoe = Path(r"C:\Users\KiNG_613\Projects\suc-khoe\.chrome-dang")
    if suc_khoe.exists():
        return suc_khoe, 9334
    return poly, 9336


def lay_anh(page, url):
    """Tải ảnh qua context request hoặc fallback canvas."""
    if not url.startswith("blob:"):
        try:
            r = page.context.request.get(url, timeout=60000)
            if r.ok:
                return r.body()
        except Exception as e:
            print("  (request.get lỗi, chuyển sang canvas):", str(e)[:60], flush=True)
    data_url = page.evaluate(JS_CANVAS, url)
    if not data_url or "," not in data_url:
        raise RuntimeError("Không thể lấy dữ liệu ảnh từ canvas.")
    return base64.b64decode(data_url.split(",", 1)[1])


def tach_nen_vat(im_rgb, dung_sai=30):
    """
    Tách nền bằng loang màu (flood fill) từ 4 cạnh với ngưỡng dung sai,
    làm mềm viền 1px, cắt sát (trim) + chừa 8px, lưu PNG trong suốt.
    """
    w, h = im_rgb.size
    im_rgba = im_rgb.convert("RGBA")
    working = im_rgba.copy()

    # Loang màu từ 4 cạnh
    edge_points = []
    for x in range(0, w, 2):
        edge_points.append((x, 0))
        edge_points.append((x, h - 1))
    for y in range(0, h, 2):
        edge_points.append((0, y))
        edge_points.append((w - 1, y))

    for pt in edge_points:
        _, _, _, a = working.getpixel(pt)
        if a != 0:
            ImageDraw.floodfill(working, pt, (0, 0, 0, 0), thresh=dung_sai)

    alpha = working.split()[3]

    # Làm mềm viền 1px
    alpha_soft = alpha.filter(ImageFilter.GaussianBlur(radius=0.8))

    r, g, b, _ = im_rgba.split()
    result = Image.merge("RGBA", (r, g, b, alpha_soft))

    # Cắt sát (trim) + chừa 8px
    alpha_bin = alpha_soft.point(lambda p: 255 if p > 20 else 0)
    bbox = alpha_bin.getbbox()
    if not bbox:
        bbox = (0, 0, w, h)

    left, top, right, bottom = bbox
    crop_w = (right - left) + 16
    crop_h = (bottom - top) + 16

    final_img = Image.new("RGBA", (crop_w, crop_h), (0, 0, 0, 0))
    final_img.paste(result.crop(bbox), (8, 8))
    return final_img


def xu_ly_nen(im_rgb, dich_path):
    """Lưu ảnh nền PNG chất lượng cao, đảm bảo <= 600KB."""
    # Thử lưu trực tiếp tối ưu
    buf = io.BytesIO()
    im_rgb.save(buf, format="PNG", optimize=True)
    size_kb = buf.tell() / 1024
    if size_kb <= 600:
        with open(dich_path, "wb") as f:
            f.write(buf.getvalue())
        return

    # Nếu quá 600KB, scale nhẹ hoặc nén tối ưu
    w, h = im_rgb.size
    ratio = 1600.0 / max(w, h)
    if ratio < 1.0:
        new_w, new_h = int(w * ratio), int(h * ratio)
        im_resized = im_rgb.resize((new_w, new_h), Image.LANCZOS)
        buf = io.BytesIO()
        im_resized.save(buf, format="PNG", optimize=True)
        if buf.tell() / 1024 <= 600:
            with open(dich_path, "wb") as f:
                f.write(buf.getvalue())
            return

    # Fallback chất lượng cao
    im_rgb.save(dich_path, format="PNG", optimize=True)


def kiem_tra_dang_nhap(page):
    """Kiểm tra xem Gemini đã đăng nhập chưa."""
    # Kiểm tra avatar hoặc tên tài khoản
    avatar = page.locator('a[aria-label*="Google Account"], a[aria-label*="Tài khoản Google"]')
    if avatar.count() > 0:
        return True
    # Kiểm tra xem có nút Sign In không
    signin = page.locator('a[href*="accounts.google.com"], button[aria-label*="Sign in"], a[aria-label*="Sign in"]')
    if signin.count() > 0:
        return False
    # Kiểm tra ô nhập
    inputs = page.locator(O_NHAP)
    return inputs.count() > 0


def kiem_tra_loi_gemini(page):
    """Kiểm tra thông báo hết lượt / từ chối tạo ảnh."""
    text = page.inner_text("body")
    tu_khoa_loi = [
        "can't create any for you",
        "reached your limit",
        "try again later",
        "quota exceeded",
        "temporarily unavailable",
        "không thể tạo hình ảnh",
    ]
    for tk in tu_khoa_loi:
        if tk.lower() in text.lower():
            return tk
    return None


def gui_va_cho(page, prompt, tong_cho=180):
    truoc = set(page.evaluate(JS_LON))
    o = page.locator(O_NHAP).first
    o.click()
    page.keyboard.insert_text(prompt)
    time.sleep(0.5)
    page.keyboard.press("Enter")
    han = time.time() + tong_cho
    while time.time() < han:
        time.sleep(3)
        moi = [u for u in page.evaluate(JS_LON) if u not in truoc]
        if moi:
            time.sleep(3)
            return [u for u in page.evaluate(JS_LON) if u not in truoc][-1]
        # Kiểm tra nếu Gemini báo lỗi hết lượt
        loi = kiem_tra_loi_gemini(page)
        if loi:
            raise RuntimeError(f"Gemini báo lỗi / giới hạn: '{loi}'")
    return None


def tao_prompt_hoan_chinh(item, ty_le=None):
    kieu = item.get("kieu", "vat")
    p_goc = item.get("prompt", "").strip()
    phong_cach = (item.get("phong_cach", "").strip() or PHONG_CACH_CHUNG).rstrip(".")
    ty_le_chuan = ty_le or item.get("ty_le", "16:9")
    ty_le_map = {
        "16:9": "16:9 widescreen landscape",
        "9:16": "9:16 vertical portrait",
        "1:1": "1:1 square",
    }
    ty_le_str = ty_le_map.get(ty_le_chuan, f"{ty_le_chuan} aspect ratio")

    if kieu == "vat":
        return (
            f"{phong_cach}. {p_goc} "
            f"HARD REQUIREMENTS: Single isolated game object, perfectly centered, "
            f"pure solid plain flat white background (#FFFFFF) with absolutely nothing else in the background, "
            f"no floor, no ground, no shadow on the background, no drop shadow, "
            f"completely floating on pure white background, absolutely NO text, NO letters, NO numbers, NO watermark."
        )
    else:  # nen
        hard_req = item.get("hard_requirements")
        if not hard_req:
            hard_req = (
                f"HARD REQUIREMENTS: {ty_le_str} game environment background scene, "
                f"absolutely NO text, NO letters, NO numbers, NO logo, NO watermark."
            )
        return f"{phong_cach}. {p_goc} {hard_req}"


def main():
    parser = argparse.ArgumentParser(description="Tạo asset game Đảo Nhỏ bằng Gemini web")
    parser.add_argument("json_file", nargs="?", default=str(GOC_DU_AN / "tools" / "asset-mau.json"), help="File JSON danh sách asset")
    parser.add_argument("--chi", type=str, default="", help="Chỉ vẽ 1 asset theo ID")
    parser.add_argument("--profile", type=str, default="", help="Đường dẫn profile Chrome")
    parser.add_argument("--port", type=int, default=0, help="Cổng CDP điều khiển Chrome")
    parser.add_argument("--dung-sai", type=int, default=30, help="Ngưỡng dung sai loang màu tách nền (mặc định: 30)")
    parser.add_argument("--ty-le", choices=["16:9", "9:16", "1:1"], default=None, help="Tỉ lệ khung hình (16:9, 9:16, 1:1)")
    parser.add_argument("--out-dir", type=str, default="", help="Thư mục xuất ảnh (mặc định: assets/island)")
    args = parser.parse_args()

    # Đọc danh sách asset
    json_path = Path(args.json_file)
    if not json_path.is_file():
        raise SystemExit(f"LỖI: Không tìm thấy file JSON: {json_path}")

    with open(json_path, "r", encoding="utf-8") as f:
        danh_sach = json.load(f)

    if args.chi:
        danh_sach = [m for m in danh_sach if m.get("id") == args.chi]
        if not danh_sach:
            raise SystemExit(f"LỖI: Không tìm thấy ID '{args.chi}' trong file JSON.")

    # Xác định profile
    if args.profile:
        prof_dir = Path(args.profile)
        port = args.port or 9336
    else:
        prof_dir, port_mac_dinh = tim_profile_mac_dinh()
        port = args.port or port_mac_dinh

    if not prof_dir.exists():
        print(f"LỖI: Profile Chrome không tồn tại: {prof_dir}")
        print("Vui lòng kiểm tra đăng nhập Chrome hoặc chỉ định --profile hợp lệ. DỪNG.")
        sys.exit(1)

    print(f"• Dùng Chrome profile: {prof_dir} (CDP port: {port})")
    print(f"• Tổng số asset cần vẽ: {len(danh_sach)}")

    # Tạo thư mục đích
    default_out_dir = Path(args.out_dir) if args.out_dir else ASSETS_DIR
    default_raw_dir = default_out_dir / "raw"
    default_out_dir.mkdir(parents=True, exist_ok=True)
    default_raw_dir.mkdir(parents=True, exist_ok=True)

    # Khởi động Chrome
    chrome_bin = tim_chrome_exe()
    if cong_dang_dung(port):
        raise SystemExit(f"LỖI: Cổng {port} đang bận. Đóng phiên Chrome cũ rồi chạy lại.")

    cmd = [
        str(chrome_bin),
        f"--user-data-dir={prof_dir}",
        f"--remote-debugging-port={port}",
        "--headless=new",
        "about:blank",
    ]
    proc = subprocess.Popen(cmd)
    time.sleep(2)

    ket_qua = []
    try:
        with sync_playwright() as p:
            browser = p.chromium.connect_over_cdp(f"http://127.0.0.1:{port}")
            ctx = browser.contexts[0]
            page = ctx.pages[0] if ctx.pages else ctx.new_page()

            page.goto("https://gemini.google.com/app", wait_until="domcontentloaded")
            try:
                page.wait_for_selector(O_NHAP, timeout=40000)
            except Exception:
                pass

            # Kiểm tra đăng nhập
            if not kiem_tra_dang_nhap(page):
                print("LỖI: Gemini chưa đăng nhập tài khoản Google. DỪNG (không tự đăng nhập, không nhập mật khẩu).")
                sys.exit(1)

            print("✓ Gemini đã sẵn sàng (đã đăng nhập).\n")

            for idx, item in enumerate(danh_sach, 1):
                item_id = item["id"]
                kieu = item.get("kieu", "vat")
                full_prompt = tao_prompt_hoan_chinh(item, ty_le=args.ty_le)

                target_dir = Path(item["thu_muc"]) if "thu_muc" in item else default_out_dir
                target_raw_dir = target_dir / "raw"
                target_dir.mkdir(parents=True, exist_ok=True)
                target_raw_dir.mkdir(parents=True, exist_ok=True)

                print(f"▶ [{idx}/{len(danh_sach)}] Vẽ '{item_id}' ({kieu})...", flush=True)

                url = None
                for lan in (1, 2):
                    try:
                        url = gui_va_cho(page, full_prompt, tong_cho=150)
                        if url:
                            break
                    except Exception as ex:
                        print(f"  Lỗi lần {lan}: {ex}")
                    print(f"  ... Lần {lan} không ra ảnh, thử lại...", flush=True)
                    page.reload()
                    page.wait_for_selector(O_NHAP, timeout=40000)

                if not url:
                    print(f"✗ Thất bại với '{item_id}' sau 2 lần thử.", flush=True)
                    ket_qua.append({"id": item_id, "status": "LỖI", "kich_thuoc": "-", "dung_luong": "-"})
                    continue

                # Tải ảnh gốc
                raw_bytes = lay_anh(page, url)
                raw_file = target_raw_dir / f"{item_id}.png"
                with open(raw_file, "wb") as f:
                    f.write(raw_bytes)

                im_raw = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
                dich_file = target_dir / f"{item_id}.png"

                if kieu == "vat":
                    im_processed = tach_nen_vat(im_raw, dung_sai=args.dung_sai)
                    im_processed.save(dich_file, "PNG")
                else:  # nen
                    xu_ly_nen(im_raw, dich_file)

                # Đo đạc kích thước
                im_out = Image.open(dich_file)
                w, h = im_out.size
                size_kb = dich_file.stat().st_size / 1024
                print(f"  ✓ Đã lưu: {dich_file.name} ({w}x{h}, {size_kb:.1f} KB, raw: {raw_file.name})", flush=True)
                ket_qua.append({
                    "id": item_id,
                    "status": "OK",
                    "file": str(dich_file),
                    "kich_thuoc": f"{w}x{h}",
                    "dung_luong": f"{size_kb:.1f} KB",
                })

            browser.close()
    finally:
        proc.terminate()

    # In bảng tổng kết
    print("\n" + "=" * 65)
    print(f"{'ID':<15} | {'TRẠNG THÁI':<10} | {'KÍCH THƯỚC':<12} | {'DUNG LƯỢNG':<10}")
    print("-" * 65)
    for r in ket_qua:
        print(f"{r['id']:<15} | {r['status']:<10} | {r['kich_thuoc']:<12} | {r['dung_luong']:<10}")
    print("=" * 65)


if __name__ == "__main__":
    main()
