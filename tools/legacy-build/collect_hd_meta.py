"""Collect HD (>=1280x720, landscape) Wikimedia Commons photo listings via the Openverse API.

No image downloads: the hosted app loads these straight from Wikimedia in the visitor's browser.
Usage: python3 -I collect_hd_meta.py <queries.json> <keywords.json> <out.json> <per_key>
"""
import json, re, sys, time, urllib.parse, urllib.request

UA = "TripItineraryBuilder/1.0 (personal trip planner; low volume)"
queries = json.load(open(sys.argv[1]))
keywords = json.load(open(sys.argv[2]))
out_path, PER = sys.argv[3], int(sys.argv[4])
try:
    out = json.load(open(out_path))
except Exception:
    out = {}
BAD = re.compile(r"\b(map|logo|diagram|flag|seal|plan|chart|crab|portrait|selfie|bikini|sexy|girl)\b", re.I)
TOD = {"dawn": r"sunrise|dawn|morning|mist", "sunset": r"sunset|dusk|evening|golden", "evening": r"evening|night|dusk|sunset|lights",
       "night": r"night|lights|illuminat|evening", "morning": r"morning|day", "day": r"day"}


def get(url, tries=6):
    delay = 3.0
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=40) as r:
                return json.loads(r.read())
        except Exception:
            if i == tries - 1:
                raise
            time.sleep(delay); delay *= 2


def base_url(u):
    m = re.match(r"https://upload\.wikimedia\.org/wikipedia/commons/(\w)/(\w\w)/([^/?#]+)$", u or "")
    if not m or m.group(3).rsplit(".", 1)[-1].lower() not in ("jpg", "jpeg"):
        return None
    return m.groups()


for key, qs in queries.items():
    if key in out:
        continue
    place = key.split("@")[0]
    slot = key.split("@")[1] if "@" in key else None
    kw = re.compile("|".join(re.escape(k) for k in keywords.get(place, [place])), re.I)
    found, seen = [], set()
    for q in qs:
        params = {"q": q, "source": "wikimedia", "size": "large", "page_size": "20", "mature": "false"}
        try:
            res = get("https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(params))
        except Exception as e:
            print(key, "search failed", e, flush=True); continue
        for r in res.get("results", []):
            w, h = r.get("width") or 0, r.get("height") or 0
            title = r.get("title") or ""
            parts = base_url(r.get("url"))
            if r["id"] in seen or not parts or w < 1280 or h < 720 or w < h or w / h > 2.1:
                continue
            if not kw.search(title + " " + " ".join(t.get("name", "") for t in (r.get("tags") or []))) or BAD.search(title):
                continue
            seen.add(r["id"])
            score = 2 if kw.search(title) else 1
            if slot and re.search(TOD.get(slot, "$^"), title, re.I):
                score += 2
            a, b, name = parts
            found.append({"id": r["id"], "a": a, "b": b, "name": name, "w": w, "h": h, "title": title[:90],
                          "by": (r.get("creator") or "")[:60], "license": (r.get("license") or "").upper(),
                          "license_version": r.get("license_version"), "license_url": r.get("license_url"),
                          "landing": r.get("foreign_landing_url"), "score": score})
        time.sleep(1.0)
    found.sort(key=lambda c: -c["score"])
    out[key] = found[:PER]
    json.dump(out, open(out_path, "w"), indent=1)
    print(key, len(out[key]), flush=True)
print("DONE", flush=True)
