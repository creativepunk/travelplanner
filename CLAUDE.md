# Travel planner

A trip viewer for a family trip to Thailand (4 travellers, 21–28 Dec 2026), growing into a web app with an AI chat that can plan and edit the itinerary. Hosted on Vercel from this repo (`creativepunk/travelplanner`).

The full build plan (architecture, chat tools, data model, phases, costs) is in the claude.ai doc "Travel planner app: build plan". Its phases are summarised below; follow them in order.

## What is here now (Phase 0)

A static site, no build step. Vercel serves the repo root (framework "Other"); `.vercelignore` keeps `tools/` out of the deploy.

| Path | What it is |
| --- | --- |
| `index.html` | The whole app: HTML, CSS and JS in one file, with all trip data inlined as JS objects |
| `land.js` | Coastline and borders (Natural Earth 1:10m, India to Malaysia) as SVG paths in a Mercator projection: `window.LAND = {proj, land, borders}` |
| `photos/`, `gallery/` | ~1024px Creative Commons photos used where no HD photo was found |
| `data/trip.json` | The same trip data exported as JSON (places, options/days/stops, nearby, stays, videos, social tags, media). Phase 1 starts from this |
| `tools/legacy-build/` | Scripts that produced the current `index.html` (see below). Reference only |

### How the app works

- Three panels: itinerary list (left) drives a map (centre) and a photo panel (right). Panels are resizable; on phones the map is sticky on top.
- Scrolling the list selects the stop nearest the focus line; the map flies to that leg. Dragging or zooming the map frees it; scrolling the list again re-centres.
- Page colours follow a 24-hour spectrum keyed by the selected stop's time (`SKY` keyframes, `applySky`). Text and route colours flip with background lightness.
- Photo panel: time-of-day carousel (HD Wikimedia images via `srcset`, 960/1280/1920), stay info, YouTube embeds (lite: thumbnail first, iframe on click via youtube-nocookie), photo grid, Instagram embeds (`INSTA`, currently empty), reel search links, nearby places.
- Two options (`option1` Bangkok day + night bus, `option2` connect on to Phuket); `#option1` / `#option2` in the URL selects one.

### Data conventions

- Stop: `{p: placeId, t: "HH:MM", tz?: "IST", m: start|flight|bus|car|boat|walk, x: text, c: [chips], g?: "sunset"}`. `m` is how you arrive at the stop.
- Times are local (Thailand UTC+7; IST shown for India).
- Every photo keeps title, author, licence and source link; the UI shows the credit. Keep that for any new media.
- Wikimedia thumbnails only work at standard widths (e.g. 500, 960, 1280, 1920). Other widths return HTTP 400.
- Prices are estimates from late Oct 2026 and must stay labelled as such.

### Legacy build (tools/legacy-build)

`template.html` + `options.js` + `nearby.js` + `videos.js` were assembled by `build.py` (local photos, map) and `build_site.py` (HD Wikimedia swap, hosted mode). The raw candidate images they read are not in the repo, so treat these as reference for Phase 1 rather than something to rerun. `hdmeta.json` holds the HD photo listings (Openverse search of Wikimedia Commons).

## Next phases

1. **Phase 1:** Next.js (App Router, TypeScript) app with the same look and behaviour; trip data in `data/trip.json` validated with Zod; the map, list and photo panel as components. Done when editing a stop in the JSON updates list, map and colours.
2. **Phase 2:** Chat panel + streaming route `/api/chat` calling the Claude API (start with `claude-sonnet-5-5`) with the trip as context; tools `get_trip` and the API's built-in web search. Key in `ANTHROPIC_API_KEY`, server-side only.
3. **Phase 3:** `propose_changes` tool returning operations; diff card with Apply / Discard; dashed preview route; version history with restore; data moved to Supabase (tables: trips, options, days, stops, places, nearby, media, versions, chats).
4. **Phase 4:** `search_places`, `travel_time`, `find_photos` (Openverse/Wikimedia), `find_videos` (YouTube Data API), `check_plan` rule checks.
5. **Phase 5:** sign-in for the group, read-only share link, offline cache for travel days, calendar export, Instagram embeds.

Rules for the chat: Claude only proposes; app code validates and applies. Never book or pay for anything.

## Open items

- Check the HD photo picks by eye; titles were reviewed but not every image. Replace any that show the wrong place.
- Samet Nangshe and a few stops still use the lower-res bundled photos.
- Add Instagram reel URLs to `INSTA` (per place) when the user sends them.
