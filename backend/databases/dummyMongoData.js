db = connect('mongodb://localhost/pocketchange')

db.users.insertMany( [
   {
      userID: '1c',
      username: 'ilovelocal',
      pockets: [ '1p', '2p' ],
      favouriteBusiness: ['1c'],
      emailAddress:'ilovelocal@gmail.com'
   },
   {
      userID: '2c',
      username: 'localrules',
      pockets: [ '2p' ],
      favouriteBusiness: ['8b'],
      emailAddress:'localrules@gmail.com'
   },
   {
      userID: '3c',
      username: 'shop123',
      pockets: [ '1p'],
      favouriteBusiness: ['2b'],
      emailAddress:'shop123@gmail.com'
   },
   {
      userID: '4c',
      username: 'loyalshop',
      pockets: [ '2p'],
      favouriteBusiness: ['5b'],
      emailAddress:'loyalshop@gmail.com'
   },
   {
      userID: '5c',
      username: 'mmrewards',
      pockets: [ '1p'],
      favouriteBusiness: ['3b'],
      emailAddress:'mmrewards@gmail.com'
   },
] )

db.businesses.insertMany( [
    {
       busID: '1b',
       role: 'BIA',
       busname: 'Avling',
       pocket: '1p',
       emailAddress:'avling@gmail.com'
    },
    {
        busID: '2b',
        role: 'owner',
        busname: 'Paella',
        pocket: '1p',
        emailAddress:'paella@gmail.com'
     },
     {
        busID: '3b',
        role: 'owner',
        busname: 'Mercury Espresso Bar',
        pocket: '1p',
        emailAddress:'mercury@gmail.com'
     },
     {
        busID: '4b',
        role: 'owner',
        busname: 'Slowhands Pizza',
        pocket: '1p',
        emailAddress:'slowhands@gmail.com'
     },
     {
        busID: '5b',
        role: 'BIA',
        busname: 'De Mello Coffee',
        pocket: '2p',
        emailAddress:'demello@gmail.com'
     },
     {
        busID: '6b',
        role: 'owner',
        busname: 'Himalayan Java House',
        pocket: '2p',
        emailAddress:'himalayanjava@gmail.com'
     },
     {
        busID: '7b',
        role: 'owner',
        busname: 'Isaan Der Yonge',
        pocket: '2p',
        emailAddress:'isaander@gmail.com'
     },
     {
        busID: '7b',
        role: 'owner',
        busname: 'Juicy Dumplings Yonge',
        pocket: '2p',
        emailAddress:'juicydumpling@gmail.com'
     },
 ] )

 db.pockets.insertMany( [
    {
       pocketId: '1p',
       pocketname: 'Leslieville',
       businesses: ['1b', '2b', '3b', '4b'],
       customers: ['1c', '3c', '5c'],
    },
    {
        pocketId: '2p',
        pocketname: 'Uptown Yonge',
        businesses: ['5b', '6b', '7b', '8b'],
        customers: ['1c', '2c', '4c',],
     }
])