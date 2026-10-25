const OPTIONS = {
  option1: {
    label: "Option 1", sub: "Bangkok day + night bus",
    meta: "~5 beach days · ₹3.2–4.45L for 4",
    days: [
      { d: "Mon 21 Dec", h: "Fly out tonight", night: "On the flight", stops: [
        { p: "lko", t: "23:30", tz: "IST", m: "start", x: "Thai AirAsia FD147, the direct flight to Bangkok Don Mueang (flies Mon, Wed, Fri, Sun). Book all four seats on one booking and fill in the TDAC arrival card before check-in.", c: ["From ~₹14,400 each", "3h 20m"] }
      ]},
      { d: "Tue 22 Dec", h: "Bangkok temples, night bus south", night: "Overnight VIP bus to Krabi", stops: [
        { p: "dmk", t: "04:25", m: "flight", x: "Land at Don Mueang. Visa-free entry for 30 days. Grab XL into the old city and find an early breakfast.", c: ["Visa-free 30 days", "Grab XL ~40–60 min"] },
        { p: "palace", t: "08:30", m: "car", x: "Be at the gate when it opens; it gets crowded by 10:00. Shoulders and knees covered.", c: ["฿500 each", "Card at West Gate"] },
        { p: "watpho", t: "10:45", m: "walk", x: "The 46 m reclining Buddha, a short walk south.", c: ["฿300 each", "Cash only"] },
        { p: "watarun", t: "12:30", m: "boat", x: "Cross the river by the small ferry. Then lunch and a few hours' sleep: book a day room or a cheap hotel night so you can shower before the bus.", c: ["฿200 each", "Cash only"] },
        { p: "saitai", t: "17:00", m: "car", x: "Grab XL to the terminal, then a VIP 24-seat sleeper bus to Krabi in the evening. Bring jackets: the AC runs cold.", c: ["~12 h overnight", "Book on 12Go"] }
      ]},
      { d: "Wed 23 Dec", h: "Krabi: Ao Nang and Railay", night: "Ao Nang, Krabi", stops: [
        { p: "krabibus", t: "06:30", m: "bus", x: "Arrive early morning and take a taxi to Ao Nang, about 30 minutes.", c: ["Taxi ~30 min"] },
        { p: "aonang", t: "07:30", m: "car", x: "Drop bags, breakfast, sleep off two nights of travel.", c: ["Family room or 2 doubles"] },
        { p: "railay", t: "15:00", m: "boat", x: "Longtail from Ao Nang beach. Walk over to Phra Nang Cave beach, then back to Railay West for sunset.", c: ["~฿100 each way", "15 min"] }
      ]},
      { d: "Thu 24 Dec", h: "Krabi's islands by longtail", night: "Ao Nang, Krabi", stops: [
        { p: "poda", t: "09:00", m: "boat", x: "Charter a private longtail for the four of you: Poda, Chicken Island, the Tup sandbar and Phra Nang.", c: ["Group tour ฿600–1,200", "+ park fee ฿400–600"] },
        { p: "aonang", t: "17:00", m: "boat", x: "Christmas Eve on the Ao Nang beachfront.", c: [] }
      ]},
      { d: "Fri 25 Dec", h: "Across the bay to Koh Yao Noi", night: "Koh Yao Noi", stops: [
        { p: "nopparat", t: "09:00", m: "car", x: "Green Planet speedboat leaves at 09:20.", c: ["$19–40 each", "~30 min crossing"] },
        { p: "kyn", t: "10:00", m: "boat", x: "Rent two scooters and ride the coast road. Sunset at Pasai or Tha Khao.", c: ["Bungalows ~$35–60/night"] }
      ]},
      { d: "Sat 26 Dec", h: "Phang Nga Bay from the island", night: "Koh Yao Noi", stops: [
        { p: "hong", t: "09:30", m: "boat", x: "Longtail to the Hong islands lagoon, ringed by limestone cliffs; mangrove kayaking on the way back.", c: ["Private longtail"] },
        { p: "kyy", t: "13:30", m: "boat", x: "Optional stop at the Laem Had sandbar on Koh Yao Yai.", c: [] },
        { p: "kyn", t: "18:00", m: "boat", x: "Seafood dinner by the water. This is a Muslim island: cover up in the villages.", c: [] }
      ]},
      { d: "Sun 27 Dec", h: "Back to Phuket", night: "Phuket Old Town", stops: [
        { p: "bangrong", t: "10:00", m: "boat", x: "Speedboat from Koh Yao Noi to Phuket.", c: ["From $13 each", "~30 min"] },
        { p: "naiharn", t: "13:00", m: "car", x: "Swim and lunch at Phuket's quieter south end.", c: [] },
        { p: "oldtown", t: "18:00", m: "car", x: "Lard Yai Sunday Walking Street market on Thalang Road. It only runs on Sundays.", c: ["Hawker meals ฿60–120"] }
      ]},
      { d: "Mon 28 Dec", h: "Old Town morning, fly home", night: null, stops: [
        { p: "khaorang", t: "09:30", m: "car", x: "Soi Romanee, a dim sum breakfast, then the view over Phuket Town from Khao Rang.", c: [] },
        { p: "hkt", t: "14:30", m: "car", x: "Akasa QP624 departs 17:05.", c: ["₹24.5–26k each"] },
        { p: "blr", t: "19:20", tz: "IST", m: "flight", x: "Land at Kempegowda International Airport.", c: ["HKT–BLR ~3h 45m"] }
      ]}
    ]
  },
  option2: {
    label: "Option 2", sub: "Connect on to Phuket",
    meta: "~6 beach days · ₹3.75–4.9L for 4",
    days: [
      { d: "Mon 21 Dec", h: "Fly out tonight", night: "On the flight", stops: [
        { p: "lko", t: "23:30", tz: "IST", m: "start", x: "Thai AirAsia FD147, the direct flight to Bangkok Don Mueang (flies Mon, Wed, Fri, Sun). Book all four seats on one booking and fill in the TDAC arrival card before check-in.", c: ["From ~₹14,400 each", "3h 20m"] }
      ]},
      { d: "Tue 22 Dec", h: "Bangkok to Phuket, easy first day", night: "Phuket Old Town", stops: [
        { p: "dmk", t: "04:25", m: "flight", x: "Land at Don Mueang, clear immigration, and check in for the domestic hop. Pick an 08:00–10:00 Phuket flight to leave a buffer if FD147 runs late.", c: ["Visa-free 30 days", "Self-transfer"] },
        { p: "hkt", t: "10:30", m: "flight", x: "Land in Phuket. Pre-book a van for four with bags.", c: ["DMK–HKT ~1h 25m", "฿2,300+, Dec spikes $50–90"] },
        { p: "oldtown", t: "12:00", m: "car", x: "Check in, sleep, then an afternoon walk: Thalang Road, Soi Romanee, a dim sum or mee hokkien lunch.", c: ["Van ~45 min"] },
        { p: "promthep", t: "18:00", m: "car", x: "Sunset at Phuket's southern tip.", c: [] }
      ]},
      { d: "Wed 23 Dec", h: "Samet Nangshe and Phang Nga Bay", night: "Phuket Old Town", stops: [
        { p: "samet", t: "06:00", m: "car", x: "Sunrise straight over the karsts of Phang Nga Bay. Pickup around 05:00.", c: ["Tours from ฿3,500 each", "Or private van for 4"] },
        { p: "jbond", t: "09:30", m: "boat", x: "Longtail through the bay to James Bond Island, then canoe through Talu Island's lagoons.", c: [] },
        { p: "panyee", t: "12:30", m: "boat", x: "Lunch at the floating Muslim fishing village.", c: [] },
        { p: "oldtown", t: "17:30", m: "car", x: "Back by late afternoon. Dinner in the Old Town.", c: [] }
      ]},
      { d: "Thu 24 Dec", h: "Phuket to Krabi", night: "Ao Nang, Krabi", stops: [
        { p: "aonang", t: "12:00", m: "car", x: "Private car for the four of you, 2.5–3 hours.", c: ["~฿3,000 per car", "≈ ₹2,200 each"] },
        { p: "railay", t: "15:00", m: "boat", x: "Longtail to Railay, Phra Nang Cave beach, then sunset at Railay West. Christmas Eve back in Ao Nang.", c: ["~฿100 each way"] }
      ]},
      { d: "Fri 25 Dec", h: "Christmas on Krabi's islands", night: "Ao Nang, Krabi", stops: [
        { p: "poda", t: "09:00", m: "boat", x: "Private longtail to Poda, Chicken Island, the Tup sandbar and Phra Nang. Or the Hong lagoon by speedboat.", c: ["Group ฿600–1,200", "+ park fee ฿400–600"] },
        { p: "aonang", t: "17:00", m: "boat", x: "Christmas dinner in Ao Nang.", c: [] }
      ]},
      { d: "Sat 26 Dec", h: "Tiger Cave, then Koh Yao Noi", night: "Koh Yao Noi", stops: [
        { p: "tiger", t: "06:00", m: "car", x: "Optional dawn climb: 1,200+ steps to the summit shrine before the heat.", c: ["Go at dawn"] },
        { p: "railayE", t: "12:30", m: "boat", x: "Supaporn boat from Railay East leaves at 13:00. Skip the climb and you can take the 09:20 Green Planet boat from Nopparat Thara instead.", c: ["~1 h crossing"] },
        { p: "kyn", t: "14:00", m: "boat", x: "Rent two scooters and ride the coast road. Sunset at Pasai or Tha Khao.", c: ["Bungalows ~$35–60/night"] }
      ]},
      { d: "Sun 27 Dec", h: "Phang Nga Bay from the island", night: "Koh Yao Noi", stops: [
        { p: "hong", t: "09:30", m: "boat", x: "Longtail to the Hong islands lagoon; mangrove kayaking on the way back.", c: ["Private longtail"] },
        { p: "kyy", t: "13:30", m: "boat", x: "Optional stop at the Laem Had sandbar on Koh Yao Yai.", c: [] },
        { p: "kyn", t: "18:00", m: "boat", x: "Seafood dinner by the water. Cover up in the villages.", c: [] }
      ]},
      { d: "Mon 28 Dec", h: "Boat to Phuket, fly home", night: null, stops: [
        { p: "bangrong", t: "10:00", m: "boat", x: "Morning speedboat to Phuket. Don't leave it to the afternoon: the last boats run around 17:00.", c: ["From $13 each", "~30 min"] },
        { p: "hkt", t: "14:30", m: "car", x: "Lunch on the way; Akasa QP624 departs 17:05.", c: ["₹24.5–26k each"] },
        { p: "blr", t: "19:20", tz: "IST", m: "flight", x: "Land at Kempegowda International Airport.", c: ["HKT–BLR ~3h 45m"] }
      ]}
    ]
  }
};
