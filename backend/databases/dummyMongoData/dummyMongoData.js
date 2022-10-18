db.mongousers.insertMany( [
   //generic users
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
      userID: 'pocketchangeAdmin',
      firstName: 'pocketchangeAdmin',
      lastName: 'pocketchangeAdmin',
      birthDate: '2022-08-11',
      totalChange: 0.00,
      emailAddress:'outreach@pocketchangeapp.ca',
      home: 'Leslieville',
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

   //leslieville owners
   {
      userID: '6c',
      firstName: 'Angela',
      lastName: 'Bakker',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'bestbuns@gmail.com',
      home: 'Leslieville',
      deactivated: false,
   },
   {
      userID: '7c',
      firstName: 'Will',
      lastName: 'Nguyen',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'getapet@gmail.com',
      home: 'Leslieville',
      deactivated: false,
   },
   {
      userID: '8c',
      firstName: 'Randy',
      lastName: 'Phang',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'handyhardware@gmail.com',
      home: 'Leslieville',
      deactivated: false,
   },
   {
      userID: '9c',
      firstName: 'Siku',
      lastName: 'Consens',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'happytreats@gmail.com',
      home: 'Leslieville',
      deactivated: false,
   },
   //uptown owners
   {
      userID: 'QwduOsS2eBPOAFmVG69anKXIfGC3',
      firstName: 'Sandy',
      lastName: 'Roberts',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'sweetlife@gmail.com',
      home: 'Uptown Yonge',
      deactivated: false,
   },
   {
      userID: '11c',
      firstName: 'Priya',
      lastName: 'Patel',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'lovegame@gmail.com',
      home: 'Uptown Yonge',
      deactivated: false,
   },
   {
      userID: '12c',
      firstName: 'Pop',
      lastName: 'Davidson',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'pops@gmail.com',
      home: 'Uptown Yonge',
      deactivated: false,
   },
   {
      userID: '13c',
      firstName: 'Mustafa',
      lastName: 'Navid',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'coffeetime@gmail.com',
      home: 'Uptown Yonge',
      deactivated: false,
   },
   //riverside owners
   {
      userID: '14c',
      firstName: 'Molly',
      lastName: 'Jones',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'bitesandbooze@gmail.com',
      home: 'Riverside',
      deactivated: false,
   },
   {
      userID: '15c',
      firstName: 'Jasmine',
      lastName: 'Rose',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'jasmine@gmail.com',
      home: 'Riverside',
      deactivated: false,
   },
   {
      userID: '16c',
      firstName: 'Hirim',
      lastName: 'Henkles',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'fishfare@gmail.com',
      home: 'Riverside',
      deactivated: false,
   },
   {
      userID: '17c',
      firstName: 'Andrew',
      lastName: 'Anderson',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'quikitmarket@gmail.com',
      home: 'Riverside',
      deactivated: false,
   },
   //bloor west owners
   {
      userID: '18c',
      firstName: 'Joey',
      lastName: 'De Marco',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'joeybeans@gmail.com',
      home: 'Bloor West',
      deactivated: false,
   },
   {
      userID: '19c',
      firstName: 'Spiff',
      lastName: 'Truman',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'spiffythreads@gmail.com',
      home: 'Bloor West',
      deactivated: false,
   },
   {
      userID: '20c',
      firstName: 'Roman',
      lastName: 'Mars',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'fromaggio@gmail.com',
      home: 'Bloor West',
      deactivated: false,
   },
   {
      userID: '21c',
      firstName: 'Brad',
      lastName: 'Chadley',
      birthDate: '1980-01-01',
      totalChange: 0.00,
      emailAddress:'lovely@gmail.com',
      home: 'Bloor West',
      deactivated: false,
   },
   
] )

db.mongobusinesses.insertMany( [
   //LESLIEVILLE POCKET
{
        businessID: '1b',
        businessName: 'Best Bun Bakery',
        dateEstablished: '2011-01-01',
        phoneNumber: '416-100-000',
        website: 'bestbunbakery.ca',
        businessType: 'restaurant',
        businessSubtype: 'bakery',
        emailAddress:'bestbunbakery@gmail.com',
        address: {
         streetName: 'Greenwood Ave',
         buildingNumber: '150',
         unitNumber: '',
         city: 'Toronto',
         region: 'ON',
         postalCode: 'M4L 2R1',
        },
        latitude: 43.6688949,
        longitude: -79.3307535,
        businessTags: [],
        stripeID: '1b',
        description: 'Our commitment to our craft is second to none and it shows in our buns! We provide premium breads and confectionaries to our customers. Come get your daily bread at Best Bun Bakery!',
        hours:{
         "Monday": [],
         "Tuesday":[
            {
               start: 420,
               end: 840,
            }
         ],
         "Wednesday":[
            {
               start: 420,
               end: 720,
            },
            {
               start: 480,
               end: 720,
            }
         ],
         "Thursday":[
            {
               start: 480,
               end: 720,
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
{
        businessID: '2b',
        businessName: 'Get a Pet',
        dateEstablished: '2010-01-01',
        phoneNumber: '416-200-000',
        website: 'getapet.ca',
        businessType: 'retail',
        businessSubtype: 'animal goods',
        emailAddress:'getapet@gmail.com',
        address: {
         streetName: 'Audley Ave',
         buildingNumber: '23',
         unitNumber: '',
         city: 'Toronto',
         region: 'ON',
         postalCode: 'M4M 1P5',
        },
        latitude: 43.6646563,
        longitude: -79.3390735,
        businessTags: [],
        stripeID: '1b',
        description: 'We’ve got dogs, cats, birds, rats, ferrets, fish, lizards, and bugs. Bring part of the animal kingdom home with you today! We hold ourselves to high ethical standards in the sourcing and treatment of our animals; we love them first, so you can love them for life.',
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
        businessID: '3b',
        businessName: 'Handy Hardware',
        dateEstablished: '2011-01-01',
        phoneNumber: '416-300-000',
        website: 'hndyhrdwr.ca',
        businessType: 'retail',
        businessSubtype: 'hardware',
        emailAddress:'hndyhrdwr@gmail.com',
        address: {
         streetName: 'Queen St',
         buildingNumber: '1158',
         unitNumber: '',
         city: 'Toronto',
         region: 'ON',
         postalCode: 'M4M 1L2',
        },
        latitude: 43.663147,
        longitude: -79.3354164,
        businessTags: [],
        stripeID: '3b',
        description:'Pick up anything you need for your projects. From casual home improvement to the professional worksite, we’ve got you covered. We have the tools and equipment to help you do your work right the first time.',
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
{
        businessID: '4b',
        businessName: 'Happy Treats',
        dateEstablished: '2015-01-01',
        phoneNumber: '416-400-000',
        website: 'happytreats.ca',
        businessType: 'retail',
        businessSubtype: 'animal goods',
        emailAddress:'happytreats@gmail.com',
        address: {
         streetName: 'Gerrard St',
         buildingNumber: '953',
         unitNumber: '',
         city: 'Toronto',
         region: 'ON',
         postalCode: 'M4M 1Z4',
        },
        latitude: 43.6680567,
        longitude: -79.340654,
        businessTags: [],
        stripeID: '4b',
        description:"We provide delicious organic treats for your favorite animals. Our treats and food are packed with nutrients to keep your pets’ stomachs happy and their coats glossy. Swing by and grab some treats, your dog won't be disappointed!",
        hours: {
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
//Uptown Yonge
{
        businessID: '5b',
        businessName: 'Sweet Life',
        dateEstablished: '2011-01-01',
        phoneNumber: '416-500-000',
        website: 'bestbunbakery.ca',
        businessType: 'restaurant',
        businessSubtype: 'desert',
        emailAddress:'sweetlife@gmail.com',
        address: {
         streetName: 'Eglinton Ave',
         buildingNumber: '200',
         unitNumber: '',
         city: 'Toronto',
         region: 'ON',
         postalCode: 'M4R 1C3',
        },
        latitude: 43.7074465,
        longitude: -79.4095224,
        businessTags: [],
        stripeID: '5b',
        description: 'Everything ice cream from your trusted classics like chocolate, vanilla, and strawberry, to novelty flavours like lemon grass, pretzel, and cinnamon. Come in and grab a scoop, or two, or three! Feel free to sit in our cozy diner style booths and share a banana split with your special someone or grab some cones at our takeout window and take them for a stoll.',
        hours:{
         "Monday": [],
         "Tuesday":[
            {
               start: 900,
               end: 1350,
            }
         ],
         "Wednesday":[
            {
               start: 900,
               end: 1350,
            }
         ],
         "Thursday":[
            {
               start: 600,
               end: 1200,
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
        businessID: '7b',
        businessName: 'For the Love of the Game',
        dateEstablished: '2003-01-01',
        phoneNumber: '416-700-000',
        website: 'loveofthegame.ca',
        businessType: 'retail',
        businessSubtype: 'sporting goods',
        emailAddress:'loveofthegame@gmail.com',
        address: {
         streetName: 'Rosehill Ave',
         buildingNumber: '75',
         unitNumber: '',
         city: 'Toronto',
         region: 'ON',
         postalCode: 'M4T 1G4',
        },
        latitude: 43.685118,
        longitude: -79.3949814,
        businessTags: [],
        stripeID: '7b',
        description:"We’ve got your sports needs covered. Need to pick up some skates for the hockey season? We’ve got ‘em. Basketballs for the hoopers? We’ve got ‘em. Looking for weights to deck out your home gym? We’ve got 'em. Come in and get all of this and much more at For the Love of the Game.",
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
//bloor west
{
        businessID: '9b',
        businessName: 'Bites and Booze',
        dateEstablished: '2009-01-01',
        phoneNumber: '416-900-000',
        website: 'bitesandbooze.ca',
        businessType: 'restaurant',
        businessSubtype: 'bar',
        emailAddress:'bitesandbooze@gmail.com',
        address: {
         streetName: 'Saulter St',
         buildingNumber: '25',
         unitNumber: '',
         city: 'Toronto',
         region: 'ON',
         postalCode: 'M4M 2H7',
        },
        latitude: 43.6575789,
        longitude: -79.3486182,
        businessTags: [],
        stripeID: '9b',
        description: 'Bites and Booze offers just that– we sell tapas for you to nibble on while you’re enjoying a drink with your pals. We’ve got a wide selection of brews on tap and specialty cocktails that our team of mixologists refreshes seasonally.',
        hours:{
         "Monday": [],
         "Tuesday":[
            {
               start: 900,
               end: 1350,
            }
         ],
         "Wednesday":[
            {
               start: 900,
               end: 1350,
            }
         ],
         "Thursday":[
            {
               start: 600,
               end: 1200,
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

{
        businessID: '10b',
        businessName: 'Jasmine',
        dateEstablished: '1999-01-01',
        phoneNumber: '416-010-000',
        website: 'jasmineflowershop.ca',
        businessType: 'retail',
        businessSubtype: 'flower shop',
        emailAddress:'jasmineflowers@gmail.com',
        address: {
         streetName: 'Broadview Ave',
         buildingNumber: '120',
         unitNumber: '',
         city: 'Toronto',
         region: 'ON',
         postalCode: 'M4M 2E9',
        },
        latitude: 43.6593247,
        longitude: -79.3528045,
        businessTags: [],
        stripeID: '10b',
        description: 'Jasmine has beautiful fresh flowers and botanicals. We’re a great option to beautify your apartement, adorn your special events, and anything in between.',
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
        businessID: '11b',
        businessName: 'Fish Fare',
        dateEstablished: '2017-01-01',
        phoneNumber: '416-120-000',
        website: 'fishfare.ca',
        businessType: 'retail',
        businessSubtype: 'grocer',
        emailAddress:'fishfare@gmail.com',
        address: {
         streetName: 'Thompson St',
         buildingNumber: '10',
         unitNumber: '',
         city: 'Toronto',
         region: 'ON',
         postalCode: 'M4M 1L9',
        },
        latitude: 43.6594918,
        longitude: -79.3549587,
        businessTags: [],
        stripeID: '11b',
        description:'Fresh fish received with deals that are a real catch-of-the-day. If you’re looking for premium fish and shellfish stop by and talk to our expert fishmongers.',
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

{
        businessID: '12b',
        businessName: 'Quikit Market',
        dateEstablished: '2000-01-01',
        phoneNumber: '416-130-000',
        website: 'quikitmarket.ca',
        businessType: 'retail',
        businessSubtype: 'convenience',
        emailAddress:'quikitmarket@gmail.com',
        address: {
         streetName: 'Queen St',
         buildingNumber: '870',
         unitNumber: '',
         city: 'Toronto',
         region: 'ON',
         postalCode: 'M4M 3G9',
        },
        latitude: 43.6615414,
        longitude: -79.3467604,
        businessTags: [],
        stripeID: '12b',
        description:'Quikit Market offers basic groceries, snacks, beverages, home supplies, and tobacco products. We’re a quick and convenient stop for your spur of the moment needs.',
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
//riverside

// {
//         businessID: '13b',
//         businessName: 'Joey Beans',
//         dateEstablished: '2002-01-01',
//         phoneNumber: '416-140-000',
//         website: 'joeybeans.ca',
//         businessType: 'restaurant',
//         businessSubtype: 'cafe',
//         emailAddress:'joeybeans@gmail.com',
//         address: {
//          streetName: 'Durie St',
//          buildingNumber: '266',
//          unitNumber: '',
//          city: 'Toronto',
//          region: 'ON',
//          postalCode: 'M6S 3G3',
//         },
//         latitude: 43.6509,
//         longitude: -79.4821079,
//         businessTags: [],
//         stripeID: '13b',
//         description: 'Joey Beans offers quality coffee, delicious pastries, and warm lit tables for you to sit with some friends or your laptop. We’ve got a lot of space for you to set up and work for a few hours while enjoying a good bite and drink.',
//         hours:{
//          "Monday": [],
//          "Tuesday":[
//             {
//                start: 900,
//                end: 1350,
//             }
//          ],
//          "Wednesday":[
//             {
//                start: 900,
//                end: 1350,
//             }
//          ],
//          "Thursday":[
//             {
//                start: 600,
//                end: 1200,
//             }
//          ],
//          "Friday":[
//             {
//                start: 720,
//                end: 900,
//             },
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ],
//          "Saturday":[
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ],
//          "Sunday":[
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ]
//        },
//        status:{
//          pending: false,
//          approved: true,
//          deactivated: false
//          },
//      },

// {
//         businessID: '14b',
//         businessName: 'Spiffy Threads',
//         dateEstablished: '1999-01-01',
//         phoneNumber: '416-150-000',
//         website: 'spiffythreads.ca',
//         businessType: 'retail',
//         businessSubtype: 'clothing',
//         emailAddress:'spiffythreads@gmail.com',
//         address: {
//          streetName: 'Beresford Ave',
//          buildingNumber: '263',
//          unitNumber: '',
//          city: 'Toronto',
//          region: 'ON',
//          postalCode: 'M6S 1N6',
//         },
//         latitude: 43.6515207,
//         longitude: -79.4793476,
//         businessTags: [],
//         stripeID: '14b',
//         description: 'We’ve got clothes that are good for everyone and good for the planet. Our tops and bottoms are made from a sustainable hemp composite that is durable, breathable, and stylish. We’ve got a variety of sizes and colors in stock so that you can find the Spiffy Threads that fit just right.',
//         hours:{
//          "Monday": [],
//          "Tuesday":[
//             {
//                start: 600,
//                end: 900,
//             }
//          ],
//          "Wednesday":[
//             {
//                start: 600,
//                end: 900,
//             }
//          ],
//          "Thursday":[
//             {
//                start: 600,
//                end: 900,
//             }            
//          ],
//          "Friday":[
//             {
//                start: 600,
//                end: 900,
//             },
//             {
//                start: 1020,
//                end: 1350,
//             }
//          ],
//          "Saturday":[],
//          "Sunday":[]
//       },
//        status:{
//          pending: false,
//          approved: true,
//          deactivated: false
//          },
//      },

// {
//         businessID: '15b',
//         businessName: 'Fromaggio’s',
//         dateEstablished: '2017-01-01',
//         phoneNumber: '416-120-000',
//         website: 'fromaggio.ca',
//         businessType: 'retail',
//         businessSubtype: 'grocer',
//         emailAddress:'fromaggio@gmail.com',
//         address: {
//          streetName: 'Mayfield Ave',
//          buildingNumber: '55',
//          unitNumber: '',
//          city: 'Toronto',
//          region: 'ON',
//          postalCode: 'M6S 1J8',
//         },
//         latitude: 43.647898,
//         longitude: -79.4832883,
//         businessTags: [],
//         stripeID: '15b',
//         description:'Fromaggio’s provides fine cheeses and charcuterie. Our owner is the foremost cheesemonger in Canada and ensures our cheeses are of the highest quality and fashion.',
//         hours:{
//          "Monday": [],
//          "Tuesday":[
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ],
//          "Wednesday":[
//             {
//                start: 720,
//                end: 900,
//             },
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ],
//          "Thursday":[
//             {
//                start: 720,
//                end: 900,
//             },
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ],
//          "Friday":[
//             {
//                start: 720,
//                end: 900,
//             },
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ],
//          "Saturday":[
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ],
//          "Sunday":[
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ]
//        },
//        status:{
//          pending: false,
//          approved: true,
//          deactivated: false
//          },
//      },
// {
//         businessID: '16b',
//         businessName: 'Lovely',
//         dateEstablished: '2014-01-01',
//         phoneNumber: '416-150-000',
//         website: 'lovelyrestaurant.ca',
//         businessType: 'restaurant',
//         businessSubtype: 'full-service',
//         emailAddress:'lovelyrestaurant@gmail.com',
//         address: {
//          streetName: 'Mayfield Ave',
//          buildingNumber: '55',
//          unitNumber: '',
//          city: 'Toronto',
//          region: 'ON',
//          postalCode: 'M6S 1J8',
//         },
//         latitude: 43.648349,
//         longitude: -79.483675,
//         businessTags: [],
//         stripeID: '16b',
//         description:'Lovely is committed to offering a fine dining experience that is perfect no matter that occasion. Our menu is updated seasonally by Chef Charbonneau and his dedicated staff. Our space boasts exposed brick, chestnut beaming, candlelight, and two hearths making it a perfect spot to enjoy magnificent foods and libations in extraordinarily beautiful and comfortable setting.',
//         hours:{
//          "Monday": [],
//          "Tuesday":[
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ],
//          "Wednesday":[
//             {
//                start: 720,
//                end: 900,
//             },
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ],
//          "Thursday":[
//             {
//                start: 720,
//                end: 900,
//             },
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ],
//          "Friday":[
//             {
//                start: 720,
//                end: 900,
//             },
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ],
//          "Saturday":[
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ],
//          "Sunday":[
//             {
//                start: 1050,
//                end: 1350,
//             }
//          ]
//        },
//        status:{
//          pending: false,
//          approved: true,
//          deactivated: false
//          },
//      }
 ] )

 db.mongopockets.insertMany( [
    {
       pocketID: '1p',
       pocketName: 'Leslieville',
       region: 'Toronto',
       description: 'Leslieville has a family-friendly-but-hip atmosphere that’s made it one of the city’s most sought-after neighbourhoods for young families to live in, and among the most fun to visit.',
       status:{
         pending: false, 
         approved: true, 
         deactivated: false
         },
    },
    {
        pocketID: '2p',
        pocketName: 'Uptown Yonge',
        region: 'Toronto',
        description: 'Located in the heart of North Toronto, Uptown Yonge is the perfect combination of local boutiques, fine dining, and quiet parkettes.',
        status:{
         pending: false, 
         approved: true, 
         deactivated: false
         },
     },
    {
        pocketID: '3p',
        pocketName: 'Bloor West Village',
        region: 'Toronto',
        description: 'Experience the Bloor West Village lifestyle, a small village in a big city!  Widely recognized as one of Toronto’s most popular dining and shopping districts, here you’ll find a great mix of over 400 cafes and tea rooms, pubs and restaurants, distinctive European bakeries and delicatessens, boutique retail shops and service providers.  ',
        status:{
         pending: false, 
         approved: true, 
         deactivated: false
         },
     },
   //   {
   //    pocketID: '4p',
   //    pocketName: 'Riverside',
   //    region: 'Toronto',
   //    description: 'Come and explore Riverside neighbourhood: Toronto’s small town in the big city. Rich in culture, heritage, and art, the area has tons of unique eateries, cafes, shops and attractions – just across the bridge from Toronto’s downtown core along Queen Street East from the iconic Queen Street Viaduct (‘Riverside Bridge‘) to just east of the world famous De Grassi Street.',
   //    status:{
   //     pending: false, 
   //     approved: true, 
   //     deactivated: false
   //     },
   // }
])

db.mongocontests.insertMany([
   {
      contestID: '1contest', // no auto since generated in SQL
      contestName: 'SNAP it UP',
      description: 'Enter to win $500 uptown yonge gift cards! Simply shop at any business within the uptown yonge pocket, scan a QR code at these participating businesses to confirm your visit, and be entered to win!', //
      status:{
         pending: false,
         approved: true,
         deactivated: false,
      },
      winner: null,
   }
])