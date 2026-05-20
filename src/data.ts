export const STATIONS = [
  { id: 'emmanduso',   label: 'CBS FM 89.2', sub: 'Emmanduso – Morning Flagship',  url: 'https://s5.voscast.com:9905/EMMANDUSO' },
  { id: 'eyobujjajja', label: 'CBS FM 88.8', sub: 'Eyobujjajja – Heritage Channel', url: 'https://s5.voscast.com:9909/EYOBUJJAJJA' },
];

export const CLANS = [
  { n: 'Ffumbe',        t: 'Civet Cat',   no: '01', orig: true              },
  { n: 'Lugave',        t: 'Pangolin',    no: '02', orig: true              },
  { n: 'Butiko',        t: 'Mushroom',    no: '03', orig: true              },
  { n: 'Mpindi',        t: 'Beans',       no: '04'                          },
  { n: 'Nyonyi Nyange', t: 'White Bird',  no: '05'                          },
  { n: 'Mbogo',         t: 'Buffalo',     no: '06'                          },
  { n: 'Ngo',           t: 'Leopard',     no: '07', royal: true             },
  { n: 'Njovu',         t: 'Elephant',    no: '08'                          },
  { n: 'Nkima',         t: 'Monkey',      no: '09'                          },
  { n: 'Musu',          t: 'Millet',      no: '10'                          },
  { n: 'Nsenene',       t: 'Grasshopper', no: '11'                          },
  { n: 'Ngabi',         t: 'Bush-buck',   no: '12', royal: true             },
  { n: 'Ngonge',        t: 'Frog',        no: '13'                          },
  { n: 'Kasimba',       t: 'Wild Cat',    no: '14'                          },
  { n: 'Ntalaganya',    t: 'Oriole Bird', no: '15'                          },
  { n: 'Nvubu',         t: 'Hippo',       no: '16'                          },
];

export const HOTELS = [
  { name: 'Kampala Serena',        area: 'City Centre',   stars: 5, ppn: 450000, tag: 'Luxury',   emoji: '🏨' },
  { name: 'Mestil Hotel',          area: 'Kololo Hill',   stars: 4, ppn: 280000, tag: 'Business', emoji: '🏩' },
  { name: 'Hotel Africana',        area: 'Wankulukuku',   stars: 4, ppn: 220000, tag: 'Classic',  emoji: '🏛️' },
  { name: 'Munyonyo Commonwealth', area: 'Lake Victoria', stars: 5, ppn: 520000, tag: 'Resort',   emoji: '🌊' },
  { name: 'Speke Resort',          area: 'Munyonyo',      stars: 5, ppn: 380000, tag: 'Resort',   emoji: '🌴' },
  { name: 'Golf Course Hotel',     area: 'Kitante',       stars: 4, ppn: 195000, tag: 'Leisure',  emoji: '⛳' },
];

export const TICKET_TIERS = [
  { name: 'Day Pass',      sub: 'Any single day',      price: 50000,  icon: '🎫', colorKey: 'primaryLt', perks: ['Single day access', 'All cultural zones', 'Main stage performances', 'Cultural exhibitions'] },
  { name: 'Full Festival', sub: 'All 3 days',          price: 120000, icon: '🎟️', colorKey: 'primary',   perks: ['3-day all-access', 'Priority seating', 'VIP meet & greet', 'Festival souvenir kit'], popular: true },
  { name: 'Family Bundle', sub: '2 Adults + 2 Kids',   price: 200000, icon: '👨‍👩‍👧‍👦', colorKey: 'green',    perks: ['Family of 4', 'All 3 days', 'Kids activity zone', 'Family photo session'] },
  { name: 'Royal VIP',     sub: 'Full premium access', price: 350000, icon: '👑', colorKey: 'accent',   perks: ['VIP lounge access', "Kabaka's viewing area", 'Private dining', 'Dedicated escort'] },
];

export const SCHEDULE = [
  { time: '06:00', prog: 'Emmanduso – Morning Show' },
  { time: '08:00', prog: 'Enkuuka News Bulletin' },
  { time: '10:00', prog: 'Cultural Heritage Hour' },
  { time: '12:00', prog: 'Midday Music' },
  { time: '14:00', prog: 'Clan Stories' },
  { time: '17:00', prog: 'Evening Drive' },
  { time: '19:00', prog: 'Festival Special Live' },
];

export const FESTIVAL_PROGRAMME = [
  { day: 'Day 1', date: 'Aug 1', events: ['Opening Ceremony 09:00', 'Cultural Parade 11:00', 'Traditional Dance 14:00', 'Ekiggwa Night 18:00'] },
  { day: 'Day 2', date: 'Aug 2', events: ['Clan Gatherings 08:00', 'CBS Radio Broadcast 10:00', 'Masaza Cup 13:00', 'Evening Concert 19:00'] },
  { day: 'Day 3', date: 'Aug 3', events: ['Museum Tour 09:00', "Kabaka's Viewing 12:00", 'Closing Gala 17:00', 'Grand Fireworks 21:00'] },
];
