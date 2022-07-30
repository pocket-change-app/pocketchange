// Dummy Data

export const user = {
  name: {
    first: 'Elias',
    middle: 'Stone',
    last: 'Williams',
  },
  imageURL: require('./assets/images/Elias.jpeg'),
  dateOfBirth: '12/16/1998',
  lifetimeChange: 2308,      // total cents spent in Change. Displayted under name on ID card
  changeTotal: '$4.79',
  topPockets: [
    {
      key: '01',
      pocket: 'Riverside',
      change: '$2.63',
    },
    {
      key: '02',
      pocket: 'Kensington',
      change: '$1.02',
    },
    {
      key: '03',
      pocket: 'Leslieville',
      change: '$0.66',
    },
  ],
};

export const pockets = [
  {
    pocketID: '01',
    name: 'Leslieville',
    imageURL: require('./assets/images/leslieville.jpg'),
  },
  {
    pocketID: '02',
    name: 'Riverside',
    imageURL: require('./assets/images/riverside.jpg'),
  },
  {
    pocketID: '03',
    name: 'Uptown Yonge',
    imageURL: require('./assets/images/uptown_yonge.jpg'),
  },
  {
    pocketID: '04',
    name: 'Chinatown',
    imageURL: require('./assets/images/chinatown.jpg'),
  },
  {
    pocketID: '05',
    name: 'Little Italy',
    imageURL: require('./assets/images/little_italy.jpg'),
  },
];

export const businesses = [
  {
    busID: "001",
    name: "Avling",
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
    address: "10000000 QUEEN ST E",
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