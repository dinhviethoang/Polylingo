#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
tools/them_video.py
Công cụ dòng lệnh tự động thêm/cập nhật video học tiếng Trung vào data/zh/videos.js.

Hỗ trợ:
- Đọc phụ đề SRT hoặc WebVTT (1 file song ngữ Hán/Việt hoặc 2 file riêng biệt)
- Đọc trực tiếp kịch bản từ pipeline polylingo (--kich-ban)
- Tự động sinh Pinyin chuẩn có thanh điệu (ưu tiên pypinyin, dự phòng bảng data/zh/char-pinyin.js)
- Tự động trích xuất YouTube ID và ảnh đại diện thumbnail
- Cập nhật an toàn vào data/zh/videos.js không trùng lặp ID
"""

import os
import sys
import re
import json
import argparse
from pathlib import Path

# Cấu hình UTF-8 cho console Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass


def parse_youtube_id(url: str) -> str:
    """Trích xuất ID 11 ký tự của YouTube từ mọi dạng link."""
    if not url:
        return ""
    url = url.strip()
    if re.match(r"^[a-zA-Z0-9_-]{11}$", url):
        return url
    pattern = r'(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})'
    m = re.search(pattern, url, re.IGNORECASE)
    return m.group(1) if m else ""


def parse_timestamp_to_seconds(ts: str) -> float:
    """Chuyển đổi chuỗi thời gian SRT/VTT sang giây (float)."""
    if not ts:
        return 0.0
    clean = ts.strip().replace(",", ".")
    parts = clean.split(":")
    if len(parts) == 3:
        h, m, s = float(parts[0]), float(parts[1]), float(parts[2])
        return h * 3600 + m * 60 + s
    elif len(parts) == 2:
        m, s = float(parts[0]), float(parts[1])
        return m * 60 + s
    elif len(parts) == 1:
        return float(parts[0])
    return 0.0


def load_char_pinyin_map(base_dir: Path) -> dict:
    """Đọc bảng tra cứu char-pinyin.js dự phòng khi không có thư viện pypinyin."""
    p = base_dir / "data" / "zh" / "char-pinyin.js"
    if not p.exists():
        return {}
    try:
        content = p.read_text(encoding="utf-8")
        # Lấy các cặp "chữ": "pinyin" (file bọc trong hàm nên không đọc thẳng JSON được)
        pairs = re.findall(r'^\s*"([^"\\])":\s*"([^"]*)"', content, re.M)
        return {k: v for k, v in pairs}
    except Exception:
        pass
    return {}


def load_word_pinyin_map(base_dir: Path) -> dict:
    """Đọc pinyin cấp TỪ trong data/zh/hsk1-words-*.js (giữ thanh nhẹ: 谢谢 → xièxie)."""
    words = {}
    for p in sorted((base_dir / "data" / "zh").glob("hsk1-words-*.js")):
        try:
            content = p.read_text(encoding="utf-8")
        except Exception:
            continue
        for m in re.finditer(r"""^\s*['"]([^'"]+)['"]:\s*\{\s*\n\s*py:\s*['"]([^'"]*)['"]""", content, re.M):
            words[m.group(1)] = m.group(2)
    return words


_PUNCT_RE = re.compile(r"[\s\u3000-\u303f\uff00-\uffef!-/:-@\[-`{-~]")


def generate_pinyin(text: str, char_map: dict = None, word_map: dict = None) -> str:
    """Tự động sinh Pinyin có dấu thanh cho chuỗi chữ Hán."""
    if not text:
        return ""

    # 1. Thử dùng thư viện pypinyin nếu có
    try:
        from pypinyin import pinyin, Style
        res = pinyin(text, style=Style.TONE, errors=lambda c: list(c))
        words = []
        for x in res:
            tok = x[0]
            if tok and re.match(r"^[a-zA-Z0-9\u0101-\u01ff\u00e0-\u00ff]", tok):
                words.append(tok)
            elif words:
                words[-1] += tok
            else:
                words.append(tok)
        return " ".join(words)
    except ImportError:
        pass

    # 2. Dự phòng: ghép từ dài nhất trong HSK1 (giữ thanh nhẹ), rồi tới bảng từng chữ
    if char_map or word_map:
        char_map = char_map or {}
        word_map = word_map or {}
        tokens = []
        i = 0
        while i < len(text):
            ch = text[i]
            if _PUNCT_RE.match(ch):
                if ch.strip():
                    if tokens:
                        tokens[-1] += ch
                    else:
                        tokens.append(ch)
                i += 1
                continue
            hit = None
            for n in range(min(5, len(text) - i), 1, -1):
                cand = text[i:i + n]
                if cand in word_map:
                    hit = (word_map[cand], n)
                    break
            if hit:
                tokens.append(hit[0])
                i += hit[1]
                continue
            tokens.append(word_map.get(ch) or char_map.get(ch) or ch)
            i += 1
        return " ".join(tokens)

    return ""


def parse_srt_or_vtt(file_path: Path) -> list:
    """Đọc và bóc tách file phụ đề .srt hoặc .vtt."""
    if not file_path.exists():
        raise FileNotFoundError(f"Không tìm thấy file phụ đề: {file_path}")

    content = file_path.read_text(encoding="utf-8-sig")
    normalized = content.replace("\r\n", "\n").replace("\r", "\n")
    blocks = re.split(r"\n\s*\n", normalized)

    cues = []
    time_regex = re.compile(r"((?:\d{1,2}:)?\d{1,2}:\d{2}[,\.]\d{1,3})\s*-->\s*((?:\d{1,2}:)?\d{1,2}:\d{2}[,\.]\d{1,3})")

    for block in blocks:
        lines = [l.strip() for l in block.split("\n") if l.strip()]
        if not lines:
            continue

        match = None
        time_idx = -1
        for i, line in enumerate(lines):
            match = time_regex.search(line)
            if match:
                time_idx = i
                break

        if not match or time_idx == -1:
            continue

        start = parse_timestamp_to_seconds(match.group(1))
        end = parse_timestamp_to_seconds(match.group(2))
        text_lines = lines[time_idx + 1:]

        if not text_lines:
            continue

        zh = ""
        py = ""
        vi = ""

        if len(text_lines) == 1:
            line = text_lines[0]
            if "//" in line:
                parts = [p.strip() for p in line.split("//")]
                zh = parts[0]
                vi = parts[1] if len(parts) > 1 else ""
            else:
                zh = line
        elif len(text_lines) == 2:
            zh = text_lines[0]
            vi = text_lines[1]
        elif len(text_lines) >= 3:
            zh = text_lines[0]
            py = text_lines[1]
            vi = " ".join(text_lines[2:])

        # Xóa thẻ HTML nếu có
        zh = re.sub(r"<[^>]+>", "", zh).strip()
        py = re.sub(r"<[^>]+>", "", py).strip()
        vi = re.sub(r"<[^>]+>", "", vi).strip()

        if zh or vi:
            cues.append({
                "start": round(start, 2),
                "end": round(end, 2),
                "zh": zh,
                "py": py,
                "vi": vi
            })

    return cues


def parse_bilingual_files(zh_path: Path, vi_path: Path) -> list:
    """Ghép 2 file phụ đề riêng biệt theo thời gian."""
    zh_cues = parse_srt_or_vtt(zh_path)
    vi_cues = parse_srt_or_vtt(vi_path)

    if not vi_cues:
        return zh_cues
    if not zh_cues:
        return vi_cues

    matched_cues = []
    for idx, zh_cue in enumerate(zh_cues):
        matched_vi = ""
        if len(zh_cues) == len(vi_cues) and abs(zh_cue["start"] - vi_cues[idx]["start"]) < 2.0:
            matched_vi = vi_cues[idx]["vi"] or vi_cues[idx]["zh"]
        else:
            best_overlap = 0.0
            best_idx = -1
            for i, v in enumerate(vi_cues):
                overlap = min(zh_cue["end"], v["end"]) - max(zh_cue["start"], v["start"])
                if overlap > best_overlap:
                    best_overlap = overlap
                    best_idx = i
            if best_idx != -1:
                matched_vi = vi_cues[best_idx]["vi"] or vi_cues[best_idx]["zh"]
            elif idx < len(vi_cues):
                matched_vi = vi_cues[idx]["vi"] or vi_cues[idx]["zh"]

        matched_cues.append({
            "start": zh_cue["start"],
            "end": zh_cue["end"],
            "zh": zh_cue["zh"],
            "py": zh_cue["py"],
            "vi": matched_vi or zh_cue["vi"]
        })

    return matched_cues


def parse_kich_ban_polylingo(kb_path: Path) -> list:
    """Đọc file kịch bản Markdown từ pipeline polylingo (chứa các cảnh song ngữ)."""
    if not kb_path.exists():
        raise FileNotFoundError(f"Không tìm thấy file kịch bản: {kb_path}")

    content = kb_path.read_text(encoding="utf-8-sig")
    cues = []
    current_time = 0.0
    default_duration = 4.0

    # Dạng 1: Bảng | [HÌNH ...] | câu vi // câu en // câu zh |
    for line in content.splitlines():
        if line.startswith("|") and "[HÌNH" in line:
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            text_cell = cells[-1] or (cells[-2] if len(cells) > 1 else "")
            text_cell = re.sub(r"<br\s*/?>", " ", text_cell).replace("**", "")
            if "//" in text_cell:
                parts = [p.strip() for p in text_cell.split("//")]
                # Thông thường: vi // en // zh hoặc vi // zh
                vi = parts[0]
                zh = parts[-1]
                end_time = current_time + default_duration
                cues.append({
                    "start": round(current_time, 2),
                    "end": round(end_time, 2),
                    "zh": zh,
                    "py": "",
                    "vi": vi
                })
                current_time = end_time

    # Dạng 2: Cảnh Markdown: - vi: ... \n - zh: ...
    if not cues:
        scenes = re.split(r"(?:^|\n)##\s+Cảnh\s+\d+", content, flags=re.IGNORECASE)
        for scene in scenes:
            if not scene.strip():
                continue
            vi_match = re.search(r"-\s*vi:\s*(.+)", scene)
            zh_match = re.search(r"-\s*zh:\s*(.+)", scene)
            py_match = re.search(r"-\s*pinyin:\s*(.+)", scene)

            if zh_match:
                zh = zh_match.group(1).strip()
                vi = vi_match.group(1).strip() if vi_match else ""
                py = py_match.group(1).strip() if py_match else ""
                end_time = current_time + default_duration
                cues.append({
                    "start": round(current_time, 2),
                    "end": round(end_time, 2),
                    "zh": zh,
                    "py": py,
                    "vi": vi
                })
                current_time = end_time

    return cues


def slugify(text: str) -> str:
    """Tạo slug an toàn từ chuỗi tiếng Việt / tiếng Anh."""
    text = text.lower()
    text = re.sub(r"[áàảãạăắằẳẵặâấầẩẫậ]", "a", text)
    text = re.sub(r"[éèẻẽẹêếềểễệ]", "e", text)
    text = re.sub(r"[íìỉĩị]", "i", text)
    text = re.sub(r"[óòỏõọôốồổỗộơớờởỡợ]", "o", text)
    text = re.sub(r"[úùủũụưứừửữự]", "u", text)
    text = re.sub(r"[ýỳỷỹỵ]", "y", text)
    text = re.sub(r"[đ]", "d", text)
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text or "video"


def generate_ipa(text: str) -> str:
    """Tự động sinh phiên âm IPA bằng thư viện eng_to_ipa nếu có."""
    if not text:
        return ""
    try:
        import eng_to_ipa as ipa_lib
        res = ipa_lib.convert(text)
        return res if res else ""
    except ImportError:
        return ""


def update_videos_js(output_path: Path, new_video_entry: dict, lang: str = "zh"):
    """Cập nhật hoặc thêm mới video vào file JavaScript mà không làm mất dữ liệu cũ."""
    existing_videos = []
    var_name = "VIDEOS_EN" if lang == "en" else "VIDEOS_ZH"
    lang_name = "tiếng Anh" if lang == "en" else "tiếng Trung"

    if output_path.exists():
        content = output_path.read_text(encoding="utf-8")
        # Tìm mảng JSON bên trong VIDEOS_ZH = [ ... ] hoặc VIDEOS_EN = [ ... ]
        start = content.find("[")
        end = content.rfind("]")
        if start != -1 and end != -1:
            try:
                raw_json = content[start:end+1]
                existing_videos = json.loads(raw_json)
            except Exception:
                pass

    found = False
    for i, v in enumerate(existing_videos):
        if v.get("id") == new_video_entry["id"]:
            existing_videos[i] = new_video_entry
            found = True
            break

    if not found:
        existing_videos.append(new_video_entry)

    formatted_json = json.dumps(existing_videos, ensure_ascii=False, indent=2)

    js_code = f"""/**
 * data/{lang}/videos.js
 * Danh sách video học {lang_name} trên nền tảng Polylingo.
 * Tự động cập nhật bởi tools/them_video.py.
 */

(function () {{
  'use strict';

  const {var_name} = {formatted_json};

  if (typeof window !== 'undefined') {{
    window.{var_name} = {var_name};
  }}

  if (typeof module !== 'undefined' && module.exports) {{
    module.exports = {var_name};
  }}
}})();
"""

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(js_code, encoding="utf-8")
    print(f"✓ Đã cập nhật thành công: {output_path} ({len(existing_videos)} video)")


def main():
    parser = argparse.ArgumentParser(description="Thêm video mới vào PolyLingo kèm phụ đề song ngữ.")
    parser.add_argument("--lang", choices=["zh", "en"], default="zh", help="Ngôn ngữ bài học (zh hoặc en, mặc định zh)")
    parser.add_argument("--link", default="", help="Link YouTube hoặc ID video")
    parser.add_argument("--tieu-de", required=True, help="Tiêu đề video bài học")
    parser.add_argument("--cap", default=None, help="Cấp độ (HSK1.. với zh; Starter, A1.. với en)")
    parser.add_argument("--chu-de", default="Tổng hợp", help="Chủ đề video")
    parser.add_argument("--mo-ta", default="", help="Mô tả nội dung video")
    parser.add_argument("--sub", help="Đường dẫn file phụ đề .srt hoặc .vtt (song ngữ hoặc nguyên bản)")
    parser.add_argument("--sub-vi", help="Đường dẫn file phụ đề tiếng Việt riêng (tuỳ chọn)")
    parser.add_argument("--kich-ban", help="Đường dẫn file kịch bản markdown từ pipeline polylingo")
    parser.add_argument("--id", help="Định danh video tuỳ chỉnh")
    parser.add_argument("--out", default=None, help="Đường dẫn file videos.js đầu ra")

    args = parser.parse_args()

    lang = args.lang
    if not args.out:
        args.out = f"data/{lang}/videos.js"
    if not args.cap:
        args.cap = "A1" if lang == "en" else "HSK1"

    base_dir = Path(__file__).resolve().parent.parent
    char_map = load_char_pinyin_map(base_dir) if lang == "zh" else {}
    word_map = load_word_pinyin_map(base_dir) if lang == "zh" else {}

    cues = []
    if args.kich_ban:
        kb_path = Path(args.kich_ban)
        print(f"-> Đang đọc kịch bản từ {kb_path}...")
        cues = parse_kich_ban_polylingo(kb_path)
    elif args.sub:
        sub_path = Path(args.sub)
        if args.sub_vi:
            sub_vi_path = Path(args.sub_vi)
            print(f"-> Đang ghép phụ đề từ {sub_path} và {sub_vi_path}...")
            cues = parse_bilingual_files(sub_path, sub_vi_path)
        else:
            print(f"-> Đang đọc phụ đề từ {sub_path}...")
            cues = parse_srt_or_vtt(sub_path)
    else:
        print("✗ Lỗi: Vui lòng cung cấp --sub hoặc --kich-ban")
        sys.exit(1)

    if not cues:
        print("✗ Lỗi: Không trích xuất được câu phụ đề nào từ dữ liệu cung cấp.")
        sys.exit(1)

    if lang == "en":
        has_eng_to_ipa = False
        try:
            import eng_to_ipa
            has_eng_to_ipa = True
        except ImportError:
            print("! Cảnh báo: Chưa cài đặt thư viện 'eng_to_ipa'. Trường IPA sẽ để trống.")

        print(f"-> Bóc tách được {len(cues)} câu phụ đề. Đang xử lý phụ đề tiếng Anh...")
        for cue in cues:
            en_text = cue.get("en") or cue.get("zh") or ""
            cue["en"] = en_text
            if not cue.get("ipa"):
                cue["ipa"] = generate_ipa(en_text) if has_eng_to_ipa else ""
            cue["zh"] = en_text
            cue["py"] = cue["ipa"]
    else:
        print(f"-> Bóc tách được {len(cues)} câu phụ đề. Đang tự động kiểm tra và sinh Pinyin...")
        for cue in cues:
            if not cue.get("py") and cue.get("zh"):
                cue["py"] = generate_pinyin(cue["zh"], char_map, word_map)

    ytid = parse_youtube_id(args.link)
    duration = math_ceil_duration = int(cues[-1]["end"]) if cues else 60
    prefix = "en" if lang == "en" else "zh"
    vid_id = args.id or (f"{prefix}-yt-{ytid}" if ytid else f"{prefix}-{slugify(args.tieu_de)}")

    video_entry = {
        "id": vid_id,
        "youtube": args.link,
        "title": args.tieu_de,
        "desc": args.mo_ta or f"Bài học video cấp độ {args.cap} chủ đề {args.chu_de}.",
        "level": args.cap,
        "topic": args.chu_de,
        "thumb": f"https://i.ytimg.com/vi/{ytid}/hqdefault.jpg" if ytid else "",
        "duration": duration,
        "subs": cues
    }

    out_path = Path(args.out)
    if not out_path.is_absolute():
        out_path = base_dir / out_path

    update_videos_js(out_path, video_entry, lang=lang)


if __name__ == "__main__":
    main()
