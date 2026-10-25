"""Search Openverse for each place/time slot and download candidate photos.

Usage: python3 -I fetch_carousel.py <queries.json> <outdir> [per_slot]
Writes <outdir>/<slot>/<n>.jpg and <outdir>/candidates.json. Resumable.
"""
import json, os, sys, time, urllib.parse, urllib.request

UA = "TripItineraryBuilder/1.0 (personal trip planner; low volume)"
queries = json.load(open(sys.argv[1]))
OUT = sys.argv[2]
PER = int(sys.argv[3]) if len(sys.argv) > 3 else 7
os.makedirs(OUT, exist_ok=True)
cand_path = os.path.join(OUT, "candidates.json")
cands = json.load(open(cand_path)) if os.path.exists(cand_path) else {}


def get(url, binary=False, tries=6):
    delay = 3.0
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=40) as r:
                data = r.read()
                return data if binary else json.loads(data)
        except urllib.error.HTTPError as e:
            if e.code in (429, 502, 503, 504) and i < tries - 1:
                ra = e.headers.get("Retry-After")
                time.sleep(float(ra) if ra and ra.isdigit() and float(ra) < 120 else delay)
                delay *= 2
                continue
            raise
        except Exception:
            if i < tries - 1:
                time.sleep(delay); delay *= 2; continue
            raise


for slot, qs in queries.items():
    have = cands.get(slot, [])
    if len(have) >= PER:
        continue
    seen = {c["id"] for c in have}
    picked = list(have)
    for q in qs:
        if len(picked) >= PER:
            break
        params = {"q": q, "page_size": "20", "aspect_ratio": "wide", "mature": "false"}
        try:
            res = get("https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(params))
        except Exception as e:
            print(slot, q, "search failed:", e); continue
        for r in res.get("results", []):
            if len(picked) >= PER:
                break
            if r["id"] in seen:
                continue
            w, h = r.get("width") or 0, r.get("height") or 0
            if w and w < 800:
                continue
            seen.add(r["id"])
            picked.append({
                "id": r["id"], "q": q, "title": r.get("title"), "creator": r.get("creator"),
                "license": (r.get("license") or "").upper(), "license_version": r.get("license_version"),
                "license_url": r.get("license_url"), "landing": r.get("foreign_landing_url"),
                "source": r.get("source"),
            })
        time.sleep(1.5)
    os.makedirs(os.path.join(OUT, slot), exist_ok=True)
    for n, c in enumerate(picked):
        fp = os.path.join(OUT, slot, f"{n}.jpg")
        c["file"] = fp
        if os.path.exists(fp):
            continue
        try:
            blob = get(f"https://api.openverse.org/v1/images/{c['id']}/thumb/?full_size=true", binary=True)
            open(fp, "wb").write(blob)
        except Exception as e:
            print(slot, c["id"], "download failed:", e)
            c["file"] = None
        time.sleep(0.8)
    cands[slot] = picked
    json.dump(cands, open(cand_path, "w"), indent=1)
    print(slot, len([c for c in picked if c.get("file")]), "images", flush=True)
print("DONE", flush=True)
