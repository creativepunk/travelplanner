"""Turn the artifact build (out/) into a self-hosted site (site/) for GitHub + Vercel.

- Full HTML document with its own <head> and reset (the artifact host normally adds these).
- HD photos (>= 1280x720) from Wikimedia Commons, loaded by the visitor's browser with srcset;
  falls back to the bundled ~1024px photos where no HD match was found.
- Turns on YouTube video embeds (window.TRIP_HOSTED).
Usage: python3 build_site.py <hdmeta.json>
"""
import json, os, re, shutil, sys

meta = json.load(open(sys.argv[1]))
# Title review: drop listings that are a different place or off-topic.
DROP = re.compile(r"Escort|Massage|teller machine|Tcs lucknow|Si Nai|Prathap Chang|Wax Museum|Brand workshop|Jartujak|Pak Khlong Talat|Apron bus|Suvarnabhumi", re.I)
PER_KEY_DROP = {"hong@morning": r"Phuket", "grid:hong": r"Phuket", "aonang@sunset": r"Macaca|street view", "samet@dawn": r".*"}
for k in list(meta):
    pat = PER_KEY_DROP.get(k)
    meta[k] = [c for c in meta[k] if not DROP.search(c["title"]) and not (pat and re.search(pat, c["title"], re.I))]
src = open("out/index.html").read()

def wm(c, w):
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{c['a']}/{c['b']}/{c['name']}/{w}px-{c['name']}"

def orig(c):
    return f"https://upload.wikimedia.org/wikipedia/commons/{c['a']}/{c['b']}/{c['name']}"

def item(c):
    w = c["w"]
    sizes = [s for s in (960, 1280, 1920) if s <= w]
    srcset = ", ".join(f"{wm(c, s)} {s}w" for s in sizes)
    lic = c.get("license") or ""
    if lic and lic not in ("CC0", "PDM"):
        lic = "CC " + lic + (" " + c["license_version"] if c.get("license_version") else "")
    return {"src": wm(c, 1280), "srcset": srcset, "full": wm(c, 1920) if w >= 1920 else orig(c), "thumb": wm(c, 500),
            "title": c["title"], "by": c["by"], "lic": lic, "licUrl": c.get("license_url"), "link": c.get("landing"),
            "site": "Wikimedia Commons", "hd": True}

def grab(name):
    m = re.search(r"window\." + name + r"=(\{.*?\});\n", src)
    return json.loads(m.group(1)), m

gallery, gm = grab("TRIP_GALLERY")
grid, grm = grab("TRIP_GRID")

# Carousels: HD first; keep the curated lower-res set only where HD is thin.
new_gallery, used = {}, {}
slots = set(gallery) | {k for k in meta if "@" in k}
for slot in sorted(slots):
    hd = [item(c) for c in meta.get(slot, [])[:5]]
    for c in meta.get(slot, [])[:5]:
        used.setdefault(slot.split("@")[0], set()).add(c["id"])
    items = hd if len(hd) >= 2 else hd + gallery.get(slot, [])
    if items:
        new_gallery[slot] = items

# Grids: HD place photos not already in that place's carousels.
new_grid = {}
places = set(grid) | {k[5:] for k in meta if k.startswith("grid:")}
for p in sorted(places):
    hd = [item(c) for c in meta.get("grid:" + p, []) if c["id"] not in used.get(p, set())][:12]
    items = hd if len(hd) >= 4 else hd + grid.get(p, [])
    if items:
        new_grid[p] = items

src = src.replace(gm.group(0), "window.TRIP_GALLERY=" + json.dumps(new_gallery, ensure_ascii=False) + ";\n", 1)
src = src.replace(grm.group(0), "window.TRIP_GRID=" + json.dumps(new_grid, ensure_ascii=False) + ";\nwindow.TRIP_HOSTED=true;\n", 1)

# Split the artifact page into head (title, metas, fonts, style) and body.
cut = src.index("</style>") + len("</style>")
head, body = src[:cut], src[cut:]
head = head.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', "")
reset = """<style>
*, *::before, *::after { box-sizing: border-box; }
:root { color-scheme: light; padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }
body { margin: 0; font: 14px/1.5 system-ui, -apple-system, sans-serif; }
img { max-width: 100%; }
[hidden] { display: none !important; }
</style>
"""
page = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<meta name="description" content="Day-by-day map, photos and videos for a Thailand trip, 21-28 December.">\n'
        + reset + head + "\n</head>\n<body>\n" + body + "\n</body>\n</html>\n")

if os.path.exists("site"):
    for f in os.listdir("site"):
        if f in (".git",):
            continue
        p = os.path.join("site", f)
        shutil.rmtree(p) if os.path.isdir(p) else os.remove(p)
os.makedirs("site", exist_ok=True)
open("site/index.html", "w").write(page)
shutil.copy("out/land.js", "site/land.js")
# Bundle only the local images the page still references.
for rel in sorted(set(re.findall(r'"((?:photos|gallery)/[^"]+\.jpg)"', page))):
    if not os.path.exists(os.path.join("out", rel)):
        continue
    os.makedirs(os.path.dirname(os.path.join("site", rel)), exist_ok=True)
    shutil.copy(os.path.join("out", rel), os.path.join("site", rel))
hd_c = sum(1 for v in new_gallery.values() for x in v if x.get("hd"))
hd_g = sum(1 for v in new_grid.values() for x in v if x.get("hd"))
print(f"carousel slots {len(new_gallery)} ({hd_c} HD photos), grids {len(new_grid)} ({hd_g} HD photos)")
