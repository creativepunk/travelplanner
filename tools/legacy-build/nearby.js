/* Places worth a detour near each stop. Coordinates are approximate (±200 m). q = photo search query. */
const NEARBY = {
  lko: [
    { id: "imambara", n: "Bara Imambara", lat: 26.8692, lon: 80.9128, x: "Nawabi-era complex with the Bhool Bhulaiya maze. Worth an evening visit before the late flight.", q: "Bara Imambara Lucknow" },
    { id: "rumi", n: "Rumi Darwaza", lat: 26.8697, lon: 80.9104, x: "The 18th-century gateway next to the Imambara, lit up after dark.", q: "Rumi Darwaza" }
  ],
  dmk: [
    { id: "ortorkor", n: "Or Tor Kor market", lat: 13.7980, lon: 100.5480, x: "Bangkok's best-kept fresh market; good fruit and breakfast stalls from early morning.", q: "Or Tor Kor market" }
  ],
  palace: [
    { id: "sanamluang", n: "Sanam Luang", lat: 13.7550, lon: 100.4925, x: "The royal field north of the palace; open space with a view of the spires.", q: "Sanam Luang Bangkok" },
    { id: "museumsiam", n: "Museum Siam", lat: 13.7440, lon: 100.4940, x: "Hands-on museum about Thai identity, a short walk south.", q: "Museum Siam Bangkok" },
    { id: "khaosan", n: "Khao San Road", lat: 13.7589, lon: 100.4973, x: "Backpacker street 1 km north; busy, cheap food, best after dark.", q: "Khao San Road" }
  ],
  watpho: [
    { id: "thatien", n: "Tha Tien pier", lat: 13.7466, lon: 100.4905, x: "Riverside pier and old shophouses where the ferry to Wat Arun leaves.", q: "Tha Tien Bangkok" },
    { id: "pakkhlong", n: "Pak Khlong Talat flower market", lat: 13.7400, lon: 100.4960, x: "24-hour flower market, mountains of marigolds and orchids.", q: "Pak Khlong Talat flower market" }
  ],
  watarun: [
    { id: "yaowarat2", n: "Yaowarat (Chinatown)", lat: 13.7405, lon: 100.5098, x: "Street food capital of Bangkok; a short taxi or boat ride east.", q: "Yaowarat Bangkok Chinatown" },
    { id: "talatnoi", n: "Talat Noi", lat: 13.7330, lon: 100.5140, x: "Old riverside quarter of mechanics' shops, street art and cafés.", q: "Talat Noi Bangkok" }
  ],
  krabibus: [
    { id: "khanapnam", n: "Khao Khanap Nam", lat: 8.0640, lon: 98.9130, x: "Twin limestone peaks rising from the river at Krabi Town; longtail ride from the pier.", q: "Khao Khanap Nam Krabi" },
    { id: "krabiriver", n: "Krabi riverside promenade", lat: 8.0610, lon: 98.9190, x: "Waterfront walk with the crab statues and mangrove views.", q: "Krabi town riverside" }
  ],
  aonang: [
    { id: "nopparatbeach", n: "Nopparat Thara beach", lat: 8.0450, lon: 98.7950, x: "Long, quieter beach just west; at low tide you can walk to the islets.", q: "Nopparat Thara beach" },
    { id: "monkeytrail", n: "Monkey Trail to Pai Plong", lat: 8.0285, lon: 98.8270, x: "Short jungle path over the headland to a small private-feeling beach.", q: "Pai Plong beach Krabi" },
    { id: "shellbeach", n: "Shell Fossil Beach (Su San Hoi)", lat: 8.0290, lon: 98.8960, x: "75-million-year-old fossil shell slabs; 20 min by car.", q: "Shell cemetery Krabi" }
  ],
  railay: [
    { id: "phranang", n: "Phra Nang Cave beach", lat: 8.0060, lon: 98.8370, x: "Arguably Krabi's prettiest beach, 10 minutes' walk; the princess shrine cave is at the end.", q: "Phra Nang beach Railay" },
    { id: "railayview", n: "Railay viewpoint and lagoon", lat: 8.0095, lon: 98.8395, x: "Steep, muddy scramble with ropes to a view over both bays. Shoes, not flip-flops.", q: "Railay viewpoint lagoon" },
    { id: "tonsai", n: "Tonsai beach", lat: 8.0135, lon: 98.8310, x: "Climbers' beach next door, reachable at low tide or over the rocks.", q: "Tonsai beach" },
    { id: "diamondcave", n: "Phra Nang Nok (Diamond) cave", lat: 8.0125, lon: 98.8418, x: "Boardwalk cave with glittering rock formations, near Railay East.", q: "Diamond cave Railay" }
  ],
  railayE: [
    { id: "railayview", n: "Railay viewpoint and lagoon", lat: 8.0095, lon: 98.8395, x: "Steep, muddy scramble with ropes to a view over both bays.", q: "Railay viewpoint lagoon" },
    { id: "diamondcave", n: "Phra Nang Nok (Diamond) cave", lat: 8.0125, lon: 98.8418, x: "Boardwalk cave with glittering rock formations.", q: "Diamond cave Railay" },
    { id: "phranang", n: "Phra Nang Cave beach", lat: 8.0060, lon: 98.8370, x: "Walk over for a swim while you wait for the boat.", q: "Phra Nang beach Railay" }
  ],
  poda: [
    { id: "chicken", by: "boat", n: "Chicken Island", lat: 7.9530, lon: 98.8090, x: "The rock shaped like a chicken's head; snorkelling stop on the 4-island loop.", q: "Chicken island Krabi" },
    { id: "tup", by: "boat", n: "Tup sandbar", lat: 7.9640, lon: 98.8050, x: "At low tide a sandbar joins Koh Tup and Koh Mor; walk between them.", q: "Koh Tup Krabi sandbar" }
  ],
  nopparat: [
    { id: "nopparatbeach", n: "Nopparat Thara beach", lat: 8.0450, lon: 98.7950, x: "Long casuarina-lined beach next to the pier; quieter than Ao Nang.", q: "Nopparat Thara beach" }
  ],
  kyn: [
    { id: "pasai", n: "Pasai beach", lat: 8.0978, lon: 98.6155, x: "The island's main beach strip; cafés and the best sunset bars.", q: "Koh Yao Noi beach" },
    { id: "thakhao", n: "Tha Khao", lat: 8.1660, lon: 98.6290, x: "Fishing village and pier on the north-east; views to the Hong islands.", q: "Koh Yao Noi village" },
    { id: "kynmangrove", n: "Mangrove kayaking", lat: 8.1450, lon: 98.6050, x: "Paddle the mangrove channels on the west coast with a local guide.", q: "mangrove kayaking Phang Nga" }
  ],
  hong: [
    { id: "hongview", n: "Koh Hong viewpoint", lat: 8.0800, lon: 98.6760, x: "Short climb on Koh Hong for a view over the lagoon and bay (park fee applies).", q: "Koh Hong Krabi viewpoint" }
  ],
  kyy: [
    { id: "kyyvillage", n: "Koh Yao Yai villages", lat: 8.0100, lon: 98.5800, x: "Rubber plantations and quiet Muslim villages; best seen by scooter.", q: "Koh Yao Yai" }
  ],
  bangrong: [
    { id: "bangpae", n: "Bang Pae waterfall", lat: 8.0330, lon: 98.3960, x: "Jungle walk to a small waterfall in Khao Phra Thaeo park, 10 minutes by car.", q: "Bang Pae waterfall Phuket" }
  ],
  naiharn: [
    { id: "yanui", n: "Ya Nui beach", lat: 7.7690, lon: 98.3060, x: "Tiny cove with good snorkelling just south of Nai Harn.", q: "Ya Nui beach Phuket" },
    { id: "windmill", n: "Windmill viewpoint", lat: 7.7665, lon: 98.3070, x: "Hilltop with the big wind turbine and a view down to Nai Harn bay.", q: "Windmill viewpoint Phuket" },
    { id: "promthep2", n: "Promthep Cape", lat: 7.7593, lon: 98.3054, x: "Phuket's famous sunset point, 5 minutes south.", q: "Promthep cape" }
  ],
  promthep: [
    { id: "yanui", n: "Ya Nui beach", lat: 7.7690, lon: 98.3060, x: "Tiny cove for a swim before sunset.", q: "Ya Nui beach Phuket" },
    { id: "windmill", n: "Windmill viewpoint", lat: 7.7665, lon: 98.3070, x: "Less crowded sunset spot just north.", q: "Windmill viewpoint Phuket" },
    { id: "naiharn2", n: "Nai Harn beach", lat: 7.7780, lon: 98.3040, x: "Wide, local-favourite beach 2 km north.", q: "Nai Harn beach" }
  ],
  oldtown: [
    { id: "romanee", n: "Soi Romanee", lat: 7.8862, lon: 98.3882, x: "The prettiest lane of painted Sino-Portuguese shophouses.", q: "Soi Romanee Phuket" },
    { id: "serene", n: "Shrine of the Serene Light", lat: 7.8858, lon: 98.3878, x: "Hidden 1890s Chinese shrine off Phang Nga Road.", q: "Shrine of the Serene Light Phuket" },
    { id: "khaorang2", n: "Khao Rang viewpoint", lat: 7.8930, lon: 98.3770, x: "Hill above town with a view over Phuket City and the bay.", q: "Khao Rang Phuket" }
  ],
  khaorang: [
    { id: "romanee", n: "Soi Romanee", lat: 7.8862, lon: 98.3882, x: "The prettiest lane of painted Sino-Portuguese shophouses.", q: "Soi Romanee Phuket" },
    { id: "serene", n: "Shrine of the Serene Light", lat: 7.8858, lon: 98.3878, x: "Hidden 1890s Chinese shrine off Phang Nga Road.", q: "Shrine of the Serene Light Phuket" }
  ],
  hkt: [
    { id: "maikhao", n: "Mai Khao beach", lat: 8.1180, lon: 98.3020, x: "Planes land low over this beach at the end of the runway.", q: "Mai Khao beach plane" },
    { id: "naiyang", n: "Nai Yang beach", lat: 8.0900, lon: 98.2950, x: "Calm, shady beach 10 minutes from the terminal; a good last swim.", q: "Nai Yang beach" }
  ],
  samet: [
    { id: "phangngaskywalk", n: "Glass skywalk", lat: 8.2820, lon: 98.4880, x: "Glass-floored walkway above the jungle next to the viewpoint.", q: "Samet Nangshe viewpoint" }
  ],
  jbond: [
    { id: "talu", n: "Talu Island lagoons", lat: 8.2450, lon: 98.5300, x: "Canoe under the cliffs into hidden hongs (enclosed lagoons).", q: "Phang Nga bay canoe hong" }
  ],
  panyee: [
    { id: "panyeefc", n: "Floating football pitch", lat: 8.3350, lon: 98.5040, x: "The village's famous floating pitch, built by local kids in the 1980s.", q: "Koh Panyee football" }
  ],
  tiger: [
    { id: "khanapnam", n: "Khao Khanap Nam", lat: 8.0640, lon: 98.9130, x: "Twin limestone peaks by the river at Krabi Town.", q: "Khao Khanap Nam Krabi" }
  ]
};
