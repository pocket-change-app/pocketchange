//// Dummy Data ////


//// FOR CONSUMER SIDE ////

export const user = {
  name: {
    first: 'Elias',
    middle: 'Stone',
    last: 'Williams',
  },
  type: "merchant",
  imageURL: require('./assets/images/Elias.jpeg'),
  dateOfBirth: '12/16/1998',
  lifetimeChange: 2308,      // total cents spent in Change. Displayted under name on ID card
  changeTotal: '4.79',
  topPockets: [
    {
      key: '01',
      pocket: 'Riverside',
      change: '2.63',
    },
    {
      key: '02',
      pocket: 'Kensington',
      change: '1.02',
    },
    {
      key: '03',
      pocket: 'Leslieville',
      change: '0.66',
    },
  ],
  transactions: [
    {
      key: '001',
      date: '2022-05-05',
      time: '14:20:23',
      timestamp: '2022-05-05 14:20:23', // yyyy-mm-dd hh:mm:ss
      merchant: "Jimmy's Coffee",
      pocket: 'Riverside',
      subtotal: '3.60',
      tip: '1.00',
      changeUsed: '0.50',
      total: '4.10',
      changeEarned: '0.31',
    },
    {
      key: '002',
      date: '2022-05-03',
      time: '16:09:12',
      timestamp: '2022-05-03 16:09:12',
      merchant: "Wvrst",
      pocket: 'Somewhere',
      subtotal: '52.50',
      tip: '15.00',
      changeUsed: '3.00',
      total: '4.10',
      changeEarned: '4.95',
    },
    {
      key: '003',
      date: '2022-05-02',
      time: '16:09:12',
      timestamp: '2022-05-02 16:09:12',
      merchant: "Cat Land",
      pocket: 'Somewhere',
      subtotal: '12.50',
      tip: '3.00',
      changeUsed: '0.00',
      total: '15.50',
      changeEarned: '1.25',
    },
    {
      key: '004',
      date: '2022-05-01',
      time: '20:19:56',
      timestamp: '2022-05-01 20:19:56',
      merchant: "Wvrst",
      pocket: 'Somewhere',
      subtotal: '20.20',
      tip: '4.00',
      changeUsed: '0.00',
      total: '24.20',
      changeEarned: '2.02',
    },
  ]
};

export const pockets = [
  {
    pocketID: '04',
    name: 'Bloor West',
    imageURL: require('./assets/images/bloor_west.png'),
    bannerURL: require('./assets/images/bloor_west_banner.jpg'),
    description: "",
  },
  {
    pocketID: '01',
    name: 'Leslieville',
    imageURL: require('./assets/images/leslieville.jpg'),
    bannerURL: require('./assets/images/leslieville-logo.jpg'),
    description: "Leslieville has a family-friendly-but-hip atmosphere that’s made it one of the city’s most sought-after neighbourhoods for young families to live in, and among the most fun to visit. "
  },
  {
    pocketID: '02',
    name: 'Riverside',
    imageURL: require('./assets/images/riverside.jpg'),
    bannerURL: require('./assets/images/riverside-banner.jpg'),
    description: "Toronto’s small town in the big city. Rich in culture, heritage, and art, the area has tons of unique eateries, cafes, shops and attractions — just across the bridge from Toronto’s downtown core along Queen Street East. "
  },
  {
    pocketID: '03',
    name: 'Uptown Yonge',
    imageURL: require('./assets/images/uptown_yonge.jpg'),
    bannerURL: require('./assets/images/uptown-yonge-logo.png'),
    description: ""
  },

];

export const businesses = [
  {
    busID: "001",
    name: "Avling",
    phoneNumber: "+1 (413) 111-1111",
    address: "1042 QUEEN ST E",
    pocket: "Leslieville",
    imageURL: require("./assets/images/avling.jpg"),
    bio: "We offer the best products and service around. I have no idea what to write for this because I can't remember what Avling does :)",
    people: [
      {
        name: 'Max',
        position: 'Owner',
        imageURL: require('./assets/images/max.png')
      }
    ]
  },
  {
    busID: "002",
    name: "La Paella",
    phoneNumber: "(413) 111-1111",
    address: "1146 QUEEN ST E",
    pocket: "Leslieville",
    imageURL: require("./assets/images/la-paella.jpg"),
    bio: "Best paella in the biz'.",
    people: [
      {
        name: 'Mike',
        position: 'Owner',
        imageURL: require('./assets/images/mike.png')
      }
    ]
  },
  {
    busID: "003",
    name: "Wvrst",
    phoneNumber: "(413) 111-1111",
    address: "Somewhere",
    pocket: 'Pckt',
    imageURL: require("./assets/images/wvrst.jpg"),
    bio: "We have the meats.",
    people: [
      {
        name: 'Miguel',
        position: 'Manager',
        imageURL: require('./assets/images/miguel.png')
      }
    ]
  },
  {
    busID: "004",
    name: "Jimmy's Coffee",
    phoneNumber: "(413) 111-1111",
    address: "806 Queen St E",
    pocket: "Riverside",
    imageURL: require("./assets/images/avling.jpg"),
    bio: "Best coffee in Riverside! Come on in and see what we're all about.",
    people: [
      {
        name: 'Jimmy',
        position: 'Owner',
        imageURL: require('./assets/images/max.png')
      }
    ]
  },
  {
    busID: "005",
    name: "Cat Land",
    phoneNumber: "(413) 111-1111",
    address: "1010 QUEEN ST E",
    pocket: "Somewhere",
    imageURL: require("./assets/images/cats.jpg"),
    bio: "Cat stuff. Pretty self explanatory.",
    people: [
      {
        name: 'Margaret',
        position: 'Owner',
        imageURL: require('./assets/images/max.png')
      }
    ]
  },
  {
    busID: "006",
    name: "Cheese Land",
    phoneNumber: "(413) 111-1111",
    address: "1042 QUEEN ST E",
    pocket: "Somewhere",
    imageURL: require("./assets/images/cheese.jpg"),
    bio: "Cheese stuff. Pretty self explanatory.",
    people: [
      {
        name: 'Max',
        position: 'Owner',
        imageURL: require('./assets/images/max.png')
      }
    ]
  },
]


//// FOR MERCHANT SIDE ////

export const transactions = [
  {
    transactionID: "001",
    userID: "Elias",
    value: "10.43",
    date: "2022-06-04 09:22:11",
    busID: "002",
    pocketID: "001",
    changeRedeemed: "3.40",
    changeEarned: "1.00",
  },
  {
    transactionID: "002",
    userID: "Micas",
    value: "13.02",
    date: "2022-06-04 09:22:11",
    busID: "001",
    pocketID: "002",
    changeRedeemed: "0.40",
    changeEarned: "2.30",
  },
  {
    transactionID: "003",
    userID: "Siku",
    value: "5.20",
    date: "2022-06-04 09:22:11",
    busID: "003",
    pocketID: "001",
    changeRedeemed: "3.40",
    changeEarned: "1.00",
  },
]

export const analytics = [
  {
    title: "Today's Sales",
    type: "text",
    data: [
      {date: "17 Sept, 2022", sales: 437.23}
    ]
  },
  {
    title: "Number of Sales",
    type: "bar",
    data: [
      {day: "mon", sales: 60},
      {day: "tue", sales: 34},
      {day: "wed", sales: 27},
      {day: "thu", sales: 60},
      {day: "fri", sales: 88},
      {day: "sat", sales: 122},
      {day: "sun", sales: 170},
    ]
  },
  {
    title: "Sales Volume",
    type: "line",
    data: [
      {day: "mon", sales: 804.43},
      {day: "tue", sales: 456.30},
      {day: "wed", sales: 437.23},
      {day: "thu", sales: 806.54},
      {day: "fri", sales: 1122.10},
      {day: "sat", sales: 1366.38},
      {day: "sun", sales: 2505.76},
    ]
  },
]