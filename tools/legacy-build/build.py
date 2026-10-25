"""Assemble the trip viewer: resized photos, land.js, index.html."""
import json, os, re, sys, urllib.parse
from PIL import Image, ImageOps

SRC_PHOTOS = sys.argv[1]
MAP_JSON = sys.argv[2]
OUT = "out"
os.makedirs(os.path.join(OUT, "photos"), exist_ok=True)

meta = json.load(open(os.path.join(SRC_PHOTOS, "meta.json")))
photos = {}
for key, m in meta.items():
    src = os.path.join(SRC_PHOTOS, key + ".jpg")
    if not os.path.exists(src):
        continue
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    if im.width > 1100:
        im = im.resize((1100, round(im.height * 1100 / im.width)), Image.LANCZOS)
    rel = f"photos/{key}.jpg"
    im.save(os.path.join(OUT, rel), "JPEG", quality=80, optimize=True, progressive=True)
    # Credit: the Commons file page for the image itself.
    mm = re.search(r"/commons/(?:thumb/)?\w/\w\w/([^/]+)", urllib.parse.unquote(m["src"]))
    credit = ("https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(mm.group(1))) if mm else m["credit_page"]
    photos[key] = {"src": rel, "credit": credit}

land = json.load(open(MAP_JSON))
open(os.path.join(OUT, "land.js"), "w").write("window.LAND=" + json.dumps(land, separators=(",", ":")) + ";\n")

# Time-of-day galleries: picks.json {slot: [candidate index, ...]} chosen by eye from the contact sheets.
gallery = {}
if len(sys.argv) > 4:
    cdir, picks = sys.argv[3], json.load(open(sys.argv[4]))
    cands = json.load(open(os.path.join(cdir, "candidates.json")))
    os.makedirs(os.path.join(OUT, "gallery"), exist_ok=True)
    for slot, idxs in picks.items():
        items = []
        for n in idxs:
            c = cands[slot][n]
            im = ImageOps.exif_transpose(Image.open(c["file"])).convert("RGB")
            if im.width > 1200:
                im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
            rel = f"gallery/{slot.replace('@', '-')}-{n}.jpg"
            im.save(os.path.join(OUT, rel), "JPEG", quality=80, optimize=True, progressive=True)
            lic = c.get("license") or ""
            if lic and lic not in ("CC0", "PDM"):
                lic = "CC " + lic + (" " + c["license_version"] if c.get("license_version") else "")
            items.append({
                "src": rel, "title": (c.get("title") or "").strip()[:90], "by": (c.get("creator") or "").strip()[:60],
                "lic": lic, "licUrl": c.get("license_url"), "link": c.get("landing"),
                "site": {"flickr": "Flickr", "wikimedia": "Wikimedia Commons"}.get(c.get("source"), (c.get("source") or "Source").title()),
            })
        gallery[slot] = items

t = open("template.html").read()
t = t.replace("/*__PHOTOS__*/", "window.TRIP_PHOTOS=" + json.dumps(photos, ensure_ascii=False) + ";")
t = t.replace("/*__NEARBY__*/", open("nearby.js").read())
t = t.replace("/*__VIDEOS__*/", open("videos.js").read())
near = {}
if len(sys.argv) > 6 and sys.argv[6]:
    ndir, npicks = sys.argv[5], json.load(open(sys.argv[6]))
    ncands = json.load(open(os.path.join(ndir, "candidates.json")))
    for nid, idxs in npicks.items():
        items = []
        for n in idxs:
            c = ncands[nid][n]
            im = ImageOps.exif_transpose(Image.open(c["file"])).convert("RGB")
            if im.width > 1200:
                im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
            rel = f"gallery/near-{nid}-{n}.jpg"
            im.save(os.path.join(OUT, rel), "JPEG", quality=80, optimize=True, progressive=True)
            lic = c.get("license") or ""
            if lic and lic not in ("CC0", "PDM"):
                lic = "CC " + lic + (" " + c["license_version"] if c.get("license_version") else "")
            items.append({"src": rel, "title": (c.get("title") or "").strip()[:90], "by": (c.get("creator") or "").strip()[:60],
                          "lic": lic, "licUrl": c.get("license_url"), "link": c.get("landing"),
                          "site": {"flickr": "Flickr", "wikimedia": "Wikimedia Commons"}.get(c.get("source"), (c.get("source") or "Source").title())})
        near[nid] = items
t = t.replace("/*__GALLERY__*/", "window.TRIP_NEARBY_PHOTOS=" + json.dumps(near, ensure_ascii=False) + ";\n/*__GALLERY__*/")
# Per-place photo grid: grid_picks.json {place: [candidate index]}, skipping images already in that place's carousels.
grid = {}
if len(sys.argv) > 8:
    gdir, gpicks = sys.argv[7], json.load(open(sys.argv[8]))
    gc = json.load(open(os.path.join(gdir, "candidates.json")))
    used = set()
    if len(sys.argv) > 4:
        for slot, idxs in json.load(open(sys.argv[4])).items():
            for n in idxs:
                used.add(cands[slot][n]["id"])
    for pid, idxs in gpicks.items():
        items = []
        for n in idxs:
            c = gc[pid][n]
            if c["id"] in used or not c.get("file"):
                continue
            used.add(c["id"])
            im = ImageOps.exif_transpose(Image.open(c["file"])).convert("RGB")
            if im.width > 1200:
                im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
            rel = f"gallery/grid-{pid}-{n}.jpg"
            im.save(os.path.join(OUT, rel), "JPEG", quality=80, optimize=True, progressive=True)
            lic = c.get("license") or ""
            if lic and lic not in ("CC0", "PDM"):
                lic = "CC " + lic + (" " + c["license_version"] if c.get("license_version") else "")
            items.append({"src": rel, "title": (c.get("title") or "").strip()[:90], "by": (c.get("creator") or "").strip()[:60],
                          "lic": lic, "licUrl": c.get("license_url"), "link": c.get("landing"),
                          "site": {"flickr": "Flickr", "wikimedia": "Wikimedia Commons"}.get(c.get("source"), (c.get("source") or "Source").title())})
        grid[pid] = items
t = t.replace("/*__GRID__*/", "window.TRIP_GRID=" + json.dumps(grid, ensure_ascii=False) + ";")
t = t.replace("/*__GALLERY__*/", "window.TRIP_GALLERY=" + json.dumps(gallery, ensure_ascii=False) + ";")
open(os.path.join(OUT, "index.html"), "w").write(t)
print(len(photos), "photos;", sorted(photos))
