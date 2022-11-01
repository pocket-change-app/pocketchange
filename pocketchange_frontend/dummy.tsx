//// Dummy Data ////

import { RoleLevel, RoleType } from "./contexts/Auth";

export enum surveyType {
  thumbs,
  choice,
  multiChoice,
}

//// SURVEYS ////

export const dummyChoiceSurvey = {
  type: surveyType.choice,
  prompt: "How did you arrive at this business?",
  choices: [
    'on foot',
    'by bike',
    'by car',
    'by public transport',
    'other'
  ]
}


//// CONTESTS ////


export const contestsData = {
  getAllContests: [
    {
      contestID: '000',
      contestName: 'Snap it UP!',
      description: "To enter, ask for the QR code and Snap it UP after making a purchase in any Uptown Yonge business. Each month, one randomly chosen participant will win $500 in Uptown Yonge Change! Limited to one scan per business per day.",
      startDate: '12-01-2022',
      endDate: '12-31-2022',
      prizeValue: 500.00,
      participants: [
        {
          userID: '1c',
          firstName: 'Hugo',
          lastName: 'Hale',
          birthDate: '1997-03-11',
          totalChange: 30.00,
          emailAddress: 'ilovelocal@gmail.com',
          home: 'Riverside',
          deactivated: false,
        },
        {
          userID: '2c',
          firstName: 'Elias',
          lastName: 'Williams',
          birthDate: '1998-12-16',
          totalChange: 40.50,
          emailAddress: 'localrules@gmail.com',
          home: 'Leslieville',
          deactivated: false,
        },
        {
          userID: '3c',
          firstName: 'Dewmi',
          lastName: 'Seneviratna',
          birthDate: '1999-03-01',
          totalChange: 14.30,
          emailAddress: 'shop123@gmail.com',
          home: 'North York',
          deactivated: false,
        },
        {
          userID: '4c',
          firstName: 'Cole',
          lastName: 'Charboneau',
          birthDate: '1999-05-16',
          totalChange: 10.15,
          emailAddress: 'loyalshop@gmail.com',
          home: 'Outside Toronto',
          deactivated: false,
        },
        {
          userID: '5c',
          firstName: 'Mica',
          lastName: 'Consens',
          birthDate: '1999-05-27',
          totalChange: 8.50,
          emailAddress: 'mmrewards@gmail.com',
          home: 'Leslieville',
          deactivated: false,
        },
      ]
    },
    {
      contestID: '001',
      contestName: 'Snap it UP!',
      description: "To enter, ask for the QR code and Snap it UP after making a purchase in any Uptown Yonge business. Each month, one randomly chosen participant will win $500 in Uptown Yonge Change! Limited to one scan per business per day.",
      startDate: '11-01-2022',
      endDate: '11-30-2022',
      prizeValue: 500.00,
      participants: [
        {
          userID: '1c',
          firstName: 'Hugo',
          lastName: 'Hale',
          birthDate: '1997-03-11',
          totalChange: 30.00,
          emailAddress: 'ilovelocal@gmail.com',
          home: 'Riverside',
          deactivated: false,
        },
        {
          userID: '2c',
          firstName: 'Elias',
          lastName: 'Williams',
          birthDate: '1998-12-16',
          totalChange: 40.50,
          emailAddress: 'localrules@gmail.com',
          home: 'Leslieville',
          deactivated: false,
        },
        {
          userID: '3c',
          firstName: 'Dewmi',
          lastName: 'Seneviratna',
          birthDate: '1999-03-01',
          totalChange: 14.30,
          emailAddress: 'shop123@gmail.com',
          home: 'North York',
          deactivated: false,
        },
        {
          userID: '4c',
          firstName: 'Cole',
          lastName: 'Charboneau',
          birthDate: '1999-05-16',
          totalChange: 10.15,
          emailAddress: 'loyalshop@gmail.com',
          home: 'Outside Toronto',
          deactivated: false,
        },
        {
          userID: '5c',
          firstName: 'Mica',
          lastName: 'Consens',
          birthDate: '1999-05-27',
          totalChange: 8.50,
          emailAddress: 'mmrewards@gmail.com',
          home: 'Leslieville',
          deactivated: false,
        },
      ]
    },
    {
      contestID: '002',
      contestName: 'Snap it UP!',
      description: "To enter, ask for the QR code and Snap it UP after making a purchase in any Uptown Yonge business. Each month, one randomly chosen participant will win $500 in Uptown Yonge Change! Limited to one scan per business per day.",
      startDate: '10-01-2022',
      endDate: '10-31-2022',
      prizeValue: 500.00,
      participants: [
        {
          userID: '1c',
          firstName: 'Hugo',
          lastName: 'Hale',
          birthDate: '1997-03-11',
          totalChange: 30.00,
          emailAddress: 'ilovelocal@gmail.com',
          home: 'Riverside',
          deactivated: false,
        },
        {
          userID: '2c',
          firstName: 'Elias',
          lastName: 'Williams',
          birthDate: '1998-12-16',
          totalChange: 40.50,
          emailAddress: 'localrules@gmail.com',
          home: 'Leslieville',
          deactivated: false,
        },
        {
          userID: '3c',
          firstName: 'Dewmi',
          lastName: 'Seneviratna',
          birthDate: '1999-03-01',
          totalChange: 14.30,
          emailAddress: 'shop123@gmail.com',
          home: 'North York',
          deactivated: false,
        },
        {
          userID: '4c',
          firstName: 'Cole',
          lastName: 'Charboneau',
          birthDate: '1999-05-16',
          totalChange: 10.15,
          emailAddress: 'loyalshop@gmail.com',
          home: 'Outside Toronto',
          deactivated: false,
        },
        {
          userID: '5c',
          firstName: 'Mica',
          lastName: 'Consens',
          birthDate: '1999-05-27',
          totalChange: 8.50,
          emailAddress: 'mmrewards@gmail.com',
          home: 'Leslieville',
          deactivated: false,
        },
      ]
    },
    {
      contestID: '003',
      contestName: 'Snap it UP!',
      description: "To enter, ask for the QR code and Snap it UP after making a purchase in any Uptown Yonge business. Each month, one randomly chosen participant will win $500 in Uptown Yonge Change! Limited to one scan per business per day.",
      startDate: '09-01-2022',
      endDate: '09-31-2022',
      prizeValue: 500.00,
      participants: [
        {
          userID: '1c',
          firstName: 'Hugo',
          lastName: 'Hale',
          birthDate: '1997-03-11',
          totalChange: 30.00,
          emailAddress: 'ilovelocal@gmail.com',
          home: 'Riverside',
          deactivated: false,
        },
        {
          userID: '2c',
          firstName: 'Elias',
          lastName: 'Williams',
          birthDate: '1998-12-16',
          totalChange: 40.50,
          emailAddress: 'localrules@gmail.com',
          home: 'Leslieville',
          deactivated: false,
        },
        {
          userID: '3c',
          firstName: 'Dewmi',
          lastName: 'Seneviratna',
          birthDate: '1999-03-01',
          totalChange: 14.30,
          emailAddress: 'shop123@gmail.com',
          home: 'North York',
          deactivated: false,
        },
        {
          userID: '4c',
          firstName: 'Cole',
          lastName: 'Charboneau',
          birthDate: '1999-05-16',
          totalChange: 10.15,
          emailAddress: 'loyalshop@gmail.com',
          home: 'Outside Toronto',
          deactivated: false,
        },
        {
          userID: '5c',
          firstName: 'Mica',
          lastName: 'Consens',
          birthDate: '1999-05-27',
          totalChange: 8.50,
          emailAddress: 'mmrewards@gmail.com',
          home: 'Leslieville',
          deactivated: false,
        },
      ]
    }
  ]
}


//// FOR CONSUMER SIDE ////

export const user = {
  name: {
    first: 'Elias',
    middle: 'Stone',
    last: 'Williams',
  },
  gender: 'Male',
  address: {
    zipCode: 'ABC007'
  },
  type: "merchant",
  worksAt: [
    {
      businessID: '001',
      role: 'employee'
    },
    {
      businessID: '004',
      role: 'manager'
    },
    {
      businessID: '006',
      role: 'owner'
    }
  ],
  roles: [
    {
      type: RoleType.Consumer
    },
    {
      type: RoleType.Merchant,
      level: RoleLevel.Owner,
      entityID: '001',
      entityName: 'La Paella',
    },
    {
      type: RoleType.Leader,
      entityName: 'Leslieville',
      entityID: '007',
    },
  ],
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
  scans: [
    {
      QRScanID: '001',
      userID: '000',
      businessID: '2b',
      geolocationID: '000',
      date: '2022-06-04T09:20:11.000Z'
    },
    {
      QRScanID: '002',
      userID: '000',
      businessID: '1b',
      geolocationID: '000',
      date: '2022-07-04T09:20:11.000Z'
    }
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
    pocketID: '1p',
    name: 'Leslieville',
    //imageURL: require('./assets/images/leslieville.png'),
    //bannerURL: require('./assets/images/leslieville-banner.jpg'),
    description: "Leslieville has a family-friendly-but-hip atmosphere that’s made it one of the city’s most sought-after neighbourhoods for young families to live in, and among the most fun to visit. "
  },


  // {
  //   pocketID: '02',
  //   name: 'Riverside',
  //   imageURL: require('./assets/images/riverside.jpg'),
  //   bannerURL: require('./assets/images/riverside-banner.jpg'),
  //   description: "Toronto’s small town in the big city. Rich in culture, heritage, and art, the area has tons of unique eateries, cafes, shops and attractions — just across the bridge from Toronto’s downtown core along Queen Street East. "
  // },
  {
    pocketID: '2p',
    name: 'Uptown Yonge',
    //imageURL: require('./assets/images/uptown_yonge.png'),
    //bannerURL: require('./assets/images/uptown-yonge-banner.jpg'),
    description: "Located in the heart of North Toronto, Uptown Yonge is the perfect combination of international retailers, local boutiques, fine dining, and quiet parkettes."
  },

  //{
  //  pocketID: '2p',
  //  name: 'Bloor West Village',
    //imageURL: require('./assets/images/bloor_west.png'),
    //bannerURL: require('./assets/images/bloor-west-village-banner.jpg'),
  //  description: "A small village in a big city!  Widely recognized as one of Toronto’s most popular districts, with over 400 cafes, restaurants, distinctive European bakeries, and boutique shops.",
  //},

];

export const businesses = [
  {
    businessID: '1b',
    businessName: 'Avling',
    dateEstablished: '2017-01-01',
    phoneNumber: '416-000-000',
    website: 'avling.ca',
    businessType: 'restaurant',
    businessSubtype: 'brewery',
    emailAddress: 'avling@gmail.com',
    address: {
      streetName: 'Queen St E',
      buildingNumber: '1042',
      unitNumber: '',
      city: 'Toronto',
      region: 'ON',
      postalCode: 'M4M 1K4',
    },
    latitude: 43.6616134,
    longitude: -79.3403008,
    businessTags: ['sustainable', 'farm-to-table'],
    stripeID: '1b',
    description: 'Avling is the norwegian word for crop or harvest, and for us, it is all about our kitchen and brewery and farm working as one.',
    deactivated: false,
  },
  {
    businessID: '2b',
    businessName: 'La Paella',
    dateEstablished: '2015-01-01',
    phoneNumber: '416-000-000',
    website: 'paella.ca',
    businessType: 'restaurant',
    businessSubtype: 'spanish',
    emailAddress: 'paella@gmail.com',
    address: {
      streetName: 'Queen St E',
      buildingNumber: '1146',
      unitNumber: '',
      city: 'Toronto',
      region: 'ON',
      postalCode: 'M4M 1L1',
    },
    latitude: 43.6625197,
    longitude: -79.336471,
    businessTags: [],
    stripeID: '2b',
    description: 'La Paella was originally a Spanish catering company in the GTA that was started in 2010 by partners, Gabriel and Angel.  They decided to open a storefront location in Leslieville in 2017.',
    deactivated: false,
  },
  {
    businessID: '3b',
    businessName: 'Mercury Espresso Bar',
    dateEstablished: '2020-01-01',
    phoneNumber: '416-000-000',
    website: 'mercury.ca',
    businessType: 'restaurant',
    businessSubtype: 'cafe',
    emailAddress: 'mercury@gmail.com',
    address: {
      streetName: 'Queen St E',
      buildingNumber: '915',
      unitNumber: '',
      city: 'Toronto',
      region: 'ON',
      postalCode: 'M4M 1J4',
    },
    latitude: 43.6605726,
    longitude: -79.3435212,
    businessTags: [],
    stripeID: '3b',
    description: 'Indie multi-roaster cafe serving Leslieville since 2006.',
    deactivated: false,
  },
  {
    businessID: '4b',
    businessName: 'Slowhands Pizza',
    dateEstablished: '2022-01-01',
    phoneNumber: '416-000-000',
    website: 'slowhandspizza.ca',
    businessType: 'restaurant',
    businessSubtype: 'pizza',
    emailAddress: 'slowhands@gmail.com',
    address: {
      streetName: 'Pape Ave',
      buildingNumber: '99',
      unitNumber: '',
      city: 'Toronto',
      region: 'ON',
      postalCode: 'M4M 2V7',
    },
    latitude: 43.6619347,
    longitude: -79.3397946,
    businessTags: ['new'],
    stripeID: '4b',
    description: 'At Slowhand we have one obsession: making light, airy, and delicious sourdough pan pizza.Combining our favourite techniques from Italy and Detroit with sourdough culture from the San Francisco gold rush, we create a pizza like you’ve never had before.',
    deactivated: false,
  },
  {
    businessID: '5b',
    businessName: 'De Mello Coffee',
    dateEstablished: '2011-01-01',
    phoneNumber: '416-000-000',
    website: 'demello.ca',
    businessType: 'restaurant',
    businessSubtype: 'cafe',
    emailAddress: 'demello@gmail.com',
    address: {
      streetName: 'Yonge St',
      buildingNumber: '2489',
      unitNumber: '',
      city: 'Toronto',
      region: 'ON',
      postalCode: 'M4P 2H6',
    },
    latitude: 43.7118501,
    longitude: -79.4013567,
    businessTags: [],
    stripeID: '5b',
    description: 'Our cafe represents the soul of De Mello—an eclectic and playful gathering space where the local community gathers to share time over a great coffee.Aside from serving and retailing our freshly roasted coffees daily, all of the pastries at our cafe are baked in-house every morning thanks to our expert pastry chefs.',
    deactivated: false,
  },
  {
    businessID: '6b',
    businessName: 'Himalayan Java House',
    dateEstablished: '2009-01-01',
    phoneNumber: '416-000-000',
    website: 'himalayanjava.ca',
    businessType: 'restaurant',
    businessSubtype: 'cafe',
    emailAddress: 'himalayanjava@gmail.com',
    address: {
      streetName: 'Yonge St',
      buildingNumber: '2552',
      unitNumber: '',
      city: 'Toronto',
      region: 'ON',
      postalCode: 'M4P 2J2',
    },
    latitude: 43.713383,
    longitude: -79.4022449,
    businessTags: [],
    stripeID: '6b',
    description: 'Cozy, brick-walled coffeehouse known for drinks with unique latte art, light bites & pastries.',
    deactivated: false,
  },
  {
    businessID: '7b',
    businessName: 'Isaan Der Yonge',
    dateEstablished: '2019-01-01',
    phoneNumber: '416-000-000',
    website: 'isaander.ca',
    businessType: 'restaurant',
    businessSubtype: 'thai',
    emailAddress: 'isaander@gmail.com',
    address: {
      streetName: 'Yonge St',
      buildingNumber: '2013',
      unitNumber: '',
      city: 'Toronto',
      region: 'ON',
      postalCode: 'M4S 1Z8',
    },
    latitude: 43.7010608,
    longitude: -79.3991778,
    businessTags: [],
    stripeID: '7b',
    description: 'We are a not so traditional Thai restaurant bringing you flavours from The Isaan region of Thailand to everything in between. Simply Delish!',
    deactivated: false,
  },
  {
    businessID: '8b',
    businessName: 'Juicy Dumplings Yonge',
    dateEstablished: '2012-01-01',
    phoneNumber: '416-000-000',
    website: 'juicydumplings.ca',
    businessType: 'restaurant',
    businessSubtype: 'chinese',
    emailAddress: 'juicydumpling@gmail.com',
    address: {
      streetName: 'Yonge St',
      buildingNumber: '2150',
      unitNumber: '',
      city: 'Toronto',
      region: 'ON',
      postalCode: 'M4S 2A8',
    },
    latitude: 43.7037168,
    longitude: -79.4001231,
    businessTags: [],
    stripeID: '8b',
    description: 'Best dumpling/ dimsum/ famous Toronto must try. Tasty and cheap.',
    deactivated: false,
  },
]


//// FOR MERCHANT SIDE ////

export const transactions = [
  {
    transactionID: "001",
    userID: "Elias",
    value: "10.43",
    date: "2022-06-04 09:22:11",
    businessID: "002",
    pocketID: "001",
    changeRedeemed: "3.40",
    changeEarned: "1.00",
  },
  {
    transactionID: "002",
    userID: "Micas",
    value: "13.02",
    date: "2022-06-04 09:22:11",
    businessID: "001",
    pocketID: "002",
    changeRedeemed: "0.40",
    changeEarned: "2.30",
  },
  {
    transactionID: "003",
    userID: "Siku",
    value: "5.20",
    date: "2022-06-04 09:22:11",
    businessID: "003",
    pocketID: "001",
    changeRedeemed: "3.40",
    changeEarned: "1.00",
  },
]

export const merchantAnalytics = [
  {
    sectionTitle: "Favourites",
    data: [{
      title: "Number of Contest Entries",
      type: "bar",
      rangeName: 'PAST WEEK',
      startDate: "9/16/2022",
      endDate: "9/16/2022",
      data: [
        { x: "mon", y: 60 },
        { x: "tue", y: 34 },
        { x: "wed", y: 27 },
        { x: "thu", y: 60 },
        { x: "fri", y: 88 },
        { x: "sat", y: 122 },
        { x: "sun", y: 170 },
      ]
    },],
  },
  {
    sectionTitle: "Customer Analytics",
    data: [
      {
        title: "PocketChange Participation",
        type: "text-participation-business",
        rangeName: 'PAST 30 DAYS',
        startDate: "9/16/2022",
        endDate: "9/16/2022",
        data: [
          {
            numCustomers: 25,
            visitRate: 2.3,
            pocketShare: 19.2
          }
        ]
      },
      {
        title: "Your Customers Come From",
        type: "pie",
        rangeName: 'PAST 30 DAYS',
        startDate: "9/1/2022",
        endDate: "9/14/2022",
        data: [
          { x: "University-Rosedale", y: 54 },
          { x: "Beaches-East York", y: 62 },
          { x: "Toronto Centre", y: 43 },
          { x: "Toronto-Danforth", y: 88 },
          { x: "Other", y: 20 },
        ]
      },
      {
        title: "Your Top Customers",
        type: "list-top-customers",
        rangeName: 'PAST 30 DAYS',
        startDate: "9/16/2022",
        endDate: "9/16/2022",
        data: [
          {
            userID: '1c',
            firstName: 'Hugo',
            lastName: 'Hale',
            birthDate: '1997-03-11',
            totalChange: 30.00,
            emailAddress:'hugo@gmail.com',
            home: 'Riverside',
            deactivated: false,
         },
         {
            userID: '2c',
            firstName: 'Elias',
            lastName: 'Williams',
            birthDate: '1998-12-16',
            totalChange: 40.50,
            emailAddress:'elias@gmail.com',
            home: 'Leslieville',
            deactivated: false,
         },
         {
            userID: '3c',
            firstName: 'Dewmi',
            lastName: 'Seneviratna',
            birthDate: '1999-03-01',
            totalChange: 14.30,
            emailAddress:'dewmi@gmail.com',
            home: 'North York',
            deactivated: false,
         },
         {
            userID: '4c',
            firstName: 'Cole',
            lastName: 'Charboneau',
            birthDate: '1999-05-16',
            totalChange: 10.15,
            emailAddress:'cole@gmail.com',
            home: 'Outside Toronto',
            deactivated: false,
         },
         {
            userID: '5c',
            firstName: 'Mica',
            lastName: 'Consens',
            birthDate: '1999-05-27',
            totalChange: 8.50,
            emailAddress:'mica@gmail.com',
            home: 'Leslieville',
            deactivated: false,
         },
      
        ]
      },
    ],
  },
  {
    sectionTitle: "Sales Analytics",
    data: [
      {
        title: "Number of Scans",
        type: "bar",
        rangeName: 'PAST WEEK',
        startDate: "9/16/2022",
        endDate: "9/16/2022",
        data: [
          { x: "mon", y: 60 },
          { x: "tue", y: 34 },
          { x: "wed", y: 27 },
          { x: "thu", y: 60 },
          { x: "fri", y: 88 },
          { x: "sat", y: 122 },
          { x: "sun", y: 170 },
        ]
      },
      // {
      //   title: "Sales (dollars per day)",
      //   type: "bar",
      //   rangeName: 'PAST WEEK',
      //   startDate: "9/16/2022",
      //   endDate: "9/16/2022",
      //   data: [
      //     { x: "mon", y: 804.43 },
      //     { x: "tue", y: 456.30 },
      //     { x: "wed", y: 437.23 },
      //     { x: "thu", y: 806.54 },
      //     { x: "fri", y: 1122.10 },
      //     { x: "sat", y: 1366.38 },
      //     { x: "sun", y: 2505.76 },
      //   ]
      // },
    ],
  },
  {
    sectionTitle: "Pocket Analytics",
    data: [
      {
        title: "Pocket Membership",
        type: "text-participation-pocket",
        rangeName: 'PAST 30 DAYS',
        startDate: "9/16/2022",
        endDate: "9/16/2022",
        data: [
          {
            numCustomers: 126,
            visitRate: 6.4,
          }
        ]
      },
      {
        title: "Foot Traffic in Uptown Yonge",
        type: "bar",
        rangeName: 'PAST 2 WEEKS',
        startDate: "9/16/2022",
        endDate: "9/16/2022",
        data: [
          { x: "9/3", y: 57 },
          { x: "9/4", y: 34 },
          { x: "9/5", y: 43 },
          { x: "9/6", y: 75 },
          { x: "9/7", y: 54 },
          { x: "9/8", y: 48 },
          { x: "9/9", y: 69 },
          { x: "9/10", y: 65 },
          { x: "9/11", y: 60 },
          { x: "9/12", y: 78 },
          { x: "9/13", y: 88 },
          { x: "9/14", y: 90 },
          { x: "9/15", y: 123 },
          { x: "9/16", y: 153 },

        ]
      },
      {
        title: "Your Customers Also Visit",
        type: "list-similar-businesses",
        startDate: "9/16/2022",
        endDate: "9/16/2022",
        data: [

          {
              businessID: '6b',
              businessName: 'Pop’s',
              dateEstablished: '1950-01-01',
              phoneNumber: '416-200-000',
              website: 'popsdiner.ca',
              businessType: 'restaurant',
              businessSubtype: 'diner',
              emailAddress:'popsdiner@gmail.com',
              address: {
              streetName: 'Mt Pleasant Ave',
              buildingNumber: '375',
              unitNumber: '',
              city: 'Toronto',
              region: 'ON',
              postalCode: 'M4W 3X8',
              },
              latitude: 43.6918958,
              longitude: -79.3907481,
              businessTags: [],
              stripeID: '6b',
              description: 'A long time staple of the neighbourhood, we’ve been supplying quick and easy food to loyal customers for over 70 years. There may be a fresh coat of paint on our walls, but we’re still Pop’s!',
              hours:{
              "Monday": [],
              "Tuesday":[
                  {
                    start: 600,
                    end: 900,
                  }
              ],
              "Wednesday":[
                  {
                    start: 600,
                    end: 900,
                  }
              ],
              "Thursday":[
                  {
                    start: 600,
                    end: 900,
                  }            
              ],
              "Friday":[
                  {
                    start: 600,
                    end: 900,
                  },
                  {
                    start: 1020,
                    end: 1350,
                  }
              ],
              "Saturday":[],
              "Sunday":[]
            },
            status:{
              pending: false,
              approved: true,
              deactivated: false
              },
          },
  
          {
          businessID: '8b',
          businessName: 'Coffee Time',
          dateEstablished: '2015-01-01',
          phoneNumber: '416-800-000',
          website: 'coffeetime.ca',
          businessType: 'restaurant',
          businessSubtype: 'cafe',
          emailAddress:'coffeetime@gmail.com',
          address: {
           streetName: 'Yonge St',
           buildingNumber: '1414',
           unitNumber: '',
           city: 'Toronto',
           region: 'ON',
           postalCode: 'M4T 1Y5',
          },
          latitude: 43.686082,
          longitude: -79.3983702,
          businessTags: [],
          stripeID: '8b',
          description:'Amazing cups of coffee for everyone’s morning ritual. Enjoy our meticulously brewed espresso drinks and house coffee in a cozy atmosphere. We also have decaf and tea for you aliens :).',
          hours:{
           "Monday": [],
           "Tuesday":[
              {
                 start: 1050,
                 end: 1350,
              }
           ],
           "Wednesday":[
              {
                 start: 720,
                 end: 900,
              },
              {
                 start: 1050,
                 end: 1350,
              }
           ],
           "Thursday":[
              {
                 start: 720,
                 end: 900,
              },
              {
                 start: 1050,
                 end: 1350,
              }
           ],
           "Friday":[
              {
                 start: 720,
                 end: 900,
              },
              {
                 start: 1050,
                 end: 1350,
              }
           ],
           "Saturday":[
              {
                 start: 1050,
                 end: 1350,
              }
           ],
           "Sunday":[
              {
                 start: 1050,
                 end: 1350,
              }
           ]
         },
         status:{
           pending: false,
           approved: true,
           deactivated: false
           },
          },
        ]
      },

    ],
  },
]

export const leaderAnalytics = [
  {
    sectionTitle: "Favourites",
    data: [{
      title: "Number of Contest Entries",
      type: "bar",
      rangeName: 'PAST WEEK',
      startDate: "9/16/2022",
      endDate: "9/16/2022",
      data: [
        { x: "mon", y: 60 },
        { x: "tue", y: 34 },
        { x: "wed", y: 27 },
        { x: "thu", y: 60 },
        { x: "fri", y: 88 },
        { x: "sat", y: 122 },
        { x: "sun", y: 170 },
      ]
    },],
  },
  {
    sectionTitle: "Customer Analytics",
    data: [
      {
        title: "Pocket Membership",
        type: "text-participation-pocket",
        rangeName: 'PAST 30 DAYS',
        startDate: "9/16/2022",
        endDate: "9/16/2022",
        data: [
          {
            numCustomers: 126,
            visitRate: 6.4,
          }
        ]
      },
      {
        title: "Your Customers Come From",
        type: "pie",
        rangeName: 'PAST 30 DAYS',
        startDate: "9/1/2022",
        endDate: "9/14/2022",
        data: [
          { x: "University-Rosedale", y: 54 },
          { x: "Beaches-East York", y: 62 },
          { x: "Toronto Centre", y: 43 },
          { x: "Toronto-Danforth", y: 88 },
          { x: "Other", y: 20 },
        ]
      },
      {
        title: "Your Top Customers",
        type: "list-top-customers",
        rangeName: 'PAST 30 DAYS',
        startDate: "9/16/2022",
        endDate: "9/16/2022",
        data: [
          {
            userID: '1c',
            firstName: 'Hugo',
            lastName: 'Hale',
            birthDate: '1997-03-11',
            totalChange: 30.00,
            emailAddress:'hugo@gmail.com',
            home: 'Riverside',
            deactivated: false,
         },
         {
            userID: '2c',
            firstName: 'Elias',
            lastName: 'Williams',
            birthDate: '1998-12-16',
            totalChange: 40.50,
            emailAddress:'elias@gmail.com',
            home: 'Leslieville',
            deactivated: false,
         },
         {
            userID: '3c',
            firstName: 'Dewmi',
            lastName: 'Seneviratna',
            birthDate: '1999-03-01',
            totalChange: 14.30,
            emailAddress:'dewmi@gmail.com',
            home: 'North York',
            deactivated: false,
         },
         {
            userID: '4c',
            firstName: 'Cole',
            lastName: 'Charboneau',
            birthDate: '1999-05-16',
            totalChange: 10.15,
            emailAddress:'cole@gmail.com',
            home: 'Outside Toronto',
            deactivated: false,
         },
         {
            userID: '5c',
            firstName: 'Mica',
            lastName: 'Consens',
            birthDate: '1999-05-27',
            totalChange: 8.50,
            emailAddress:'mica@gmail.com',
            home: 'Leslieville',
            deactivated: false,
         },
      
        ]
      },
    ],
  },
  {
    sectionTitle: "Contest Analytics",
    data: [
      {
        title: "Number of Scans",
        type: "bar",
        rangeName: 'PAST WEEK',
        startDate: "9/16/2022",
        endDate: "9/16/2022",
        data: [
          { x: "mon", y: 60 },
          { x: "tue", y: 34 },
          { x: "wed", y: 27 },
          { x: "thu", y: 60 },
          { x: "fri", y: 88 },
          { x: "sat", y: 122 },
          { x: "sun", y: 170 },
        ]
      },
      // {
      //   title: "Sales (dollars per day)",
      //   type: "bar",
      //   rangeName: 'PAST WEEK',
      //   startDate: "9/16/2022",
      //   endDate: "9/16/2022",
      //   data: [
      //     { x: "mon", y: 804.43 },
      //     { x: "tue", y: 456.30 },
      //     { x: "wed", y: 437.23 },
      //     { x: "thu", y: 806.54 },
      //     { x: "fri", y: 1122.10 },
      //     { x: "sat", y: 1366.38 },
      //     { x: "sun", y: 2505.76 },
      //   ]
      // },
    ],
  },
]