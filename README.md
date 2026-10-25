# Travel planner

Day-by-day map, photos and videos for a Thailand trip (21–28 December 2026), on the way to becoming a planner with an AI chat.

## Run locally

It's a static site. From this folder:

```
npx serve .
```

then open the address it prints. (Opening `index.html` straight from disk also works, but YouTube embeds may refuse to play without a web address.)

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import `creativepunk/travelplanner`.
2. Framework preset: **Other**. Leave build command and output directory empty.
3. Deploy. Every push to `main` redeploys.

## Credits

Photos: Creative Commons images from Wikimedia Commons and Flickr (via Openverse); each photo's author and licence are shown in the app. Coastline: Natural Earth. Videos: embedded from YouTube; Instagram and YouTube search links open in a new tab.

See `CLAUDE.md` for how the app is built and what comes next.
