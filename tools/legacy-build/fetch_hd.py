"""HD photo candidates (>= 1280x720, landscape) from Wikimedia Commons via Openverse search.

Usage: python3 -I fetch_hd.py <queries.json> <outdir> <per_key>
Downloads a 1920px-wide rendition (1280px when the original is smaller) from upload.wikimedia.org. Resumable.
"""
import json, os, re, sys, time, urllib.parse, urllib.request

UA = "TripItineraryBuilder/1.0 (personal trip planner; low volume)"
queries = json.load(open(sys.argv[1]))
OUT = sys.argv[2]
PER = int(sys.argv[3])
os.makedirs(OUT, exist_ok=True)
cand_path = os.path.join(OUT, "candidates.json")
cands = json.load(open(cand_path)) if os.path.exists(cand_path) else {}


def get(url, binary=False, tries=7):
    delay = 3.0
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                data = r.read()
                return data if binary else json.loads(data)
        except urllib.error.HTTPError as e:
            if e.code in (429, 502, 503, 504) and i < tries - 1:
                time.sleep(delay); delay = min(delay * 2, 60); continue
            raise
        except Exception:
            if i < tries - 1:
                time.sleep(delay); delay = min(delay * 2, 60); continue
            raise


def thumb1600(url):
    m = re.match(r"https://upload\.wikimedia\.org/wikipedia/commons/(\w)/(\w\w)/(.+)$", url)
    if not m:
        return None
    a, b, name = m.groups()
    ext = name.rsplit(".", 1)[-1].lower()
    if ext not in ("jpg", "jpeg"):
        return None
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{a}/{b}/{name}/1920px-{name}"


for key, qs in queries.items():
    have = [c for c in cands.get(key, []) if c.get("file")]
    if len(have) >= PER or (key in cands and cands[key] and all("file" in c for c in cands[key])):
        continue
    seen, picked = set(), []
    for q in qs:
        if len(picked) >= PER:
            break
        params = {"q": q, "source": "wikimedia", "size": "large", "page_size": "20", "mature": "false"}
        try:
            res = get("https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(params))
        except Exception as e:
            print(key, "search failed:", e, flush=True); continue
        for r in res.get("results", []):
            if len(picked) >= PER:
                break
            w, h = r.get("width") or 0, r.get("height") or 0
            if r["id"] in seen or w < 1280 or h < 720 or w < h or w / h > 2.1:
                continue
            t = thumb1600(r.get("url") or "")
            if not t:
                continue
            seen.add(r["id"])
            picked.append({"id": r["id"], "q": q, "title": r.get("title"), "creator": r.get("creator"),
                           "license": (r.get("license") or "").upper(), "license_version": r.get("license_version"),
                           "license_url": r.get("license_url"), "landing": r.get("foreign_landing_url"),
                           "source": "wikimedia", "w": w, "h": h, "thumb": t})
        time.sleep(1.2)
    os.makedirs(os.path.join(OUT, key), exist_ok=True)
    for n, c in enumerate(picked):
        fp = os.path.join(OUT, key, f"{n}.jpg")
        try:
            if not os.path.exists(fp):
                try:
                    blob = get(c["thumb"], binary=True)
                except urllib.error.HTTPError as e:
                    if e.code != 400:
                        raise
                    blob = get(c["thumb"].replace("/1920px-", "/1280px-"), binary=True)
                open(fp, "wb").write(blob)
                time.sleep(1.0)
            c["file"] = fp
        except Exception as e:
            print(key, n, "download failed:", e, flush=True)
            c["file"] = None
    cands[key] = picked
    json.dump(cands, open(cand_path, "w"), indent=1)
    print(key, len([c for c in picked if c.get("file")]), "HD images", flush=True)
print("DONE", flush=True)
