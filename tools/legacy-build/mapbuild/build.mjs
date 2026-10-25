// Build simplified land + border SVG paths for the trip region (India -> Thailand).
// Output: map.json { proj:{scale,tx,ty,w,h}, land: "<path d>", borders: "<path d>", stats }
import fs from "node:fs";
import * as d3 from "d3-geo";
import * as topo from "topojson-client";
import * as simp from "topojson-simplify";

const minWeight = parseFloat(process.argv[2] || "1e-9");
const world = JSON.parse(fs.readFileSync("node_modules/world-atlas/countries-10m.json", "utf8"));

// Region of interest (lon/lat). Wide enough for Lucknow (80.9E, 26.8N) and Bangalore (77.6E, 13.0N).
const W = 1000;
const bbox = { lon0: 72, lon1: 106, lat0: 4, lat1: 31 };
const proj = d3.geoMercator();
// Fit the bbox into width W
const feature = { type: "Feature", geometry: { type: "Polygon", coordinates: [[
  [bbox.lon0, bbox.lat0], [bbox.lon1, bbox.lat0], [bbox.lon1, bbox.lat1], [bbox.lon0, bbox.lat1], [bbox.lon0, bbox.lat0]
].reverse()] } };
proj.fitWidth(W, feature);
const [x0, y0] = proj([bbox.lon0, bbox.lat1]);
const [x1, y1] = proj([bbox.lon1, bbox.lat0]);
proj.translate([proj.translate()[0] - x0, proj.translate()[1] - y0]);
const H = Math.round(y1 - y0);
proj.clipExtent([[-20, -20], [W + 20, H + 20]]);

const pre = simp.presimplify(world);
const simplified = simp.simplify(pre, minWeight);

const path = d3.geoPath(proj).digits(2);
const countries = topo.feature(simplified, simplified.objects.countries);
const keep = new Set(["India", "Nepal", "Bangladesh", "Bhutan", "Myanmar", "Thailand", "Laos", "Cambodia", "Vietnam", "Malaysia", "Sri Lanka", "China", "Pakistan", "Indonesia", "Singapore"]);
const feats = countries.features.filter((f) => keep.has(f.properties.name));

const land = path({ type: "FeatureCollection", features: feats }) || "";
const borders = path(topo.mesh(simplified, simplified.objects.countries, (a, b) => a !== b && keep.has(a.properties.name) && keep.has(b.properties.name))) || "";

// Does Ko Yao Noi survive?
const kyn = [98.61, 8.12];
const thai = feats.find((f) => f.properties.name === "Thailand");
const kynIn = d3.geoContains(thai, kyn);

const out = { proj: { scale: proj.scale(), tx: proj.translate()[0], ty: proj.translate()[1], w: W, h: H }, land, borders };
fs.writeFileSync("map.json", JSON.stringify(out));
console.log({ minWeight, landKB: Math.round(land.length / 1024), bordersKB: Math.round(borders.length / 1024), kynIn, H, scale: proj.scale() });
