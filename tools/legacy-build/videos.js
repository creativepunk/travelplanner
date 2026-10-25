/* Hand-picked YouTube videos per place (s = vertical Short). Found via search, October 2026. */
const VIDEOS = {
  lko: [{ id: "eixc9P-9T2A", t: "Bara Imambara: legacy of the Nawabs", s: 1 }, { id: "GxwC1jZQzVI", t: "Inside Bara Imambara", s: 1 }, { id: "Efury2DtIvo", t: "Lucknow in one day", s: 1 }],
  palace: [{ id: "SsZGhzRPcfk", t: "Exploring the Grand Palace", s: 1 }, { id: "crijiinuOXk", t: "Changing of the guard", s: 1 }, { id: "gDR8Jc14nBU", t: "Grand Palace walk-through", s: 1 }],
  watpho: [{ id: "vATb4SQKFoE", t: "Wat Pho reclining Buddha", s: 1 }, { id: "LT7UgQP9w78", t: "The giant golden Buddha", s: 1 }, { id: "ViyMl8fYR84", t: "Wat Pho walking tour", s: 1 }],
  watarun: [{ id: "lAzdqGXuggU", t: "Wat Arun, Temple of Dawn", s: 1 }, { id: "3EreV_sLuK0", t: "Bangkok's riverside temple", s: 1 }, { id: "xGM9mrRLzHc", t: "Wat Arun at night", s: 1 }],
  yaowarat: [{ id: "FNUJ7c11a-0", t: "Everything I ate in Chinatown", s: 1 }, { id: "4BDQimVDzR0", t: "Yaowarat Road street food", s: 1 }, { id: "Bim190pBGLw", t: "Michelin patongo doughnuts", s: 1 }],
  saitai: [{ id: "-OIhLj34ix4", t: "Overnight bus Bangkok to Krabi from Sai Tai Mai" }, { id: "QRfx_B_Cz_c", t: "Sleeper bus Bangkok to Krabi" }],
  krabibus: [{ id: "HP9UMpvkoCM", t: "Krabi Town night market" }, { id: "0yX_f5W7c_s", t: "Krabi Town by night" }],
  aonang: [{ id: "cgOGqMD5nV0", t: "Sunset at Ao Nang beach", s: 1 }, { id: "itBUGGvZKwU", t: "Ao Nang sunset", s: 1 }, { id: "4VrhOPwuguI", t: "Fire show on the beach", s: 1 }],
  railay: [{ id: "LBUJTLlxGUY", t: "Railay Beach, Krabi", s: 1 }, { id: "BKtjued0gM4", t: "Phra Nang Cave beach", s: 1 }, { id: "L-nsiBX3x1I", t: "Exploring Railay", s: 1 }],
  railayE: [{ id: "0ktfFmbK-7Y", t: "Getting to Railay", s: 1 }, { id: "LBUJTLlxGUY", t: "Railay Beach, Krabi", s: 1 }],
  poda: [{ id: "_j9xcq0oYrU", t: "Poda Island", s: 1 }, { id: "4ZdDQ9lk6PE", t: "Koh Poda, best of the 4 islands", s: 1 }, { id: "qD0Flx1jX4w", t: "4 islands by private longtail" }],
  nopparat: [{ id: "FpR1LWD9RwA", t: "Beach walk Nopparat Thara to Ao Nang" }, { id: "1_BDQyNgroM", t: "Sunset at Nopparat Thara" }],
  kyn: [{ id: "lRC-8pCCCys", t: "Koh Yao Noi, a film by Philip Bloom" }, { id: "EfaUUm7-xAk", t: "Escape from the crowds" }, { id: "hnEdCcay9SA", t: "Koh Yao Noi in 4K" }],
  hong: [{ id: "CfjHzJtg68M", t: "Koh Hong lagoon", s: 1 }, { id: "MjoVwrG9V2w", t: "Kayaking into the lagoon", s: 1 }, { id: "ZJlZGULMAhI", t: "Why visit Hong lagoon", s: 1 }],
  kyy: [{ id: "INNWLj77osw", t: "Thailand's hidden paradise" }, { id: "1paIzdLSN14", t: "Travelling to Koh Yao Yai" }],
  naiharn: [{ id: "yzsNRd-DROY", t: "Nai Harn beach", s: 1 }, { id: "7_7knl6NJvI", t: "Nai Harn beach in 4K" }],
  oldtown: [{ id: "tKkfyjo5534", t: "Sunday night market vibe", s: 1 }, { id: "_4gkO4Z-Tp0", t: "Lard Yai walking street" }, { id: "5OULoD9iRTA", t: "Old Town Sunday market" }],
  khaorang: [{ id: "R7rJqtQKZCA", t: "Khao Rang hill viewpoint" }, { id: "2tKTYCWYUHs", t: "The view from Khao Rang" }],
  samet: [{ id: "13hxAcxQ21w", t: "Sunrise at Samet Nangshe", s: 1 }, { id: "2X97EBk2Rac", t: "Sunrise from the hill" }, { id: "IxrAuG4RG9I", t: "The most incredible view" }],
  jbond: [{ id: "Fy4voHIwTyU", t: "James Bond Island", s: 1 }, { id: "tYap9KovJL4", t: "Phang Nga Bay boat tour", s: 1 }, { id: "vgVjooygCEQ", t: "Phang Nga Bay", s: 1 }],
  panyee: [{ id: "ZH7Ms5X28YY", t: "Koh Panyee floating village", s: 1 }, { id: "-8DTWac_Md8", t: "Koh Panyi", s: 1 }, { id: "I4rUhoKhu6s", t: "We visited this floating village" }],
  promthep: [{ id: "BpC_HBWcX4M", t: "Sunset at Promthep Cape" }, { id: "tqLyqEIKGxs", t: "Promthep and the windmill viewpoint" }],
  tiger: [{ id: "UiR_cAolJGA", t: "Krabi's ultimate challenge", s: 1 }, { id: "CJUsdhNwiu8", t: "1,200 steps to the top", s: 1 }, { id: "DXKJM7IR0h0", t: "Climbing 1,260 steps in 4K" }]
};
/* Instagram posts or reels to embed, per place: add URLs like "https://www.instagram.com/reel/XXXX/". */
const INSTA = {};
