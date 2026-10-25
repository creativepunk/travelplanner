"""Contact sheet of candidate photos for a list of slots. Usage: python3 sheet.py <cands_dir> <out.jpg> slot1 slot2 ..."""
import json, os, sys
from PIL import Image, ImageDraw

d, out, slots = sys.argv[1], sys.argv[2], sys.argv[3:]
cands = json.load(open(os.path.join(d, "candidates.json")))
tw, th, cols = 170, 112, 12
rows = len(slots)
sheet = Image.new("RGB", (cols * tw + 140, rows * (th + 18)), "white")
dr = ImageDraw.Draw(sheet)
for r, slot in enumerate(slots):
    y = r * (th + 18)
    dr.text((4, y + th // 2), slot, fill="black")
    for n, c in enumerate(cands.get(slot, [])[:cols]):
        x = 140 + n * tw
        if c.get("file") and os.path.exists(c["file"]):
            try:
                im = Image.open(c["file"]); im.thumbnail((tw - 4, th)); sheet.paste(im, (x, y))
            except Exception:
                dr.text((x, y + 20), "bad file", fill="red")
        else:
            dr.text((x, y + 20), "missing", fill="red")
        dr.text((x + 2, y + th + 2), f"{n} {(c.get('title') or '')[:28]}", fill="black")
sheet.save(out, quality=82)
