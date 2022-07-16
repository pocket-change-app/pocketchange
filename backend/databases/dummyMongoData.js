db.mongousers.insertMany( [
   {
      userID: '1c',
      username: 'ilovelocal',
      name: 'Hugo Hale',
      birthDate: '1997-03-11',
      password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
      totalChange: 30.00,
      pockets: [ '1p', '2p' ],
      favouriteBusiness: ['1b'],
      emailAddress:'ilovelocal@gmail.com'
   },
   {
      userID: '2c',
      username: 'localrules',
      name: 'Elias Williams',
      birthDate: '1998-12-16',
      password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
      pockets: [ '2p' ],
      totalChange: 40.50,
      favouriteBusiness: ['8b'],
      emailAddress:'localrules@gmail.com'
   },
   {
      userID: '3c',
      username: 'shop123',
      name: 'Dewmi Seneviratna',
      birthDate: '1999-03-01',
      password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
      pockets: [ '1p'],
      totalChange: 14.30,
      favouriteBusiness: ['2b'],
      emailAddress:'shop123@gmail.com'
   },
   {
      userID: '4c',
      username: 'loyalshop',
      name: 'Cole Charboneau',
      birthDate: '1999-05-16',
      password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
      pockets: [ '2p'],
      totalChange: 10.15,
      favouriteBusiness: ['5b'],
      emailAddress:'loyalshop@gmail.com'
   },
   {
      userID: '5c',
      username: 'mmrewards',
      name: 'Dianna McAllister',
      birthDate: '1999-09-09',
      password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
      pockets: [ '1p'],
      totalChange: 8.50,
      favouriteBusiness: ['3b'],
      emailAddress:'mmrewards@gmail.com'
   },
] )

db.mongobusinesses.insertMany( [
    {
       busID: '1b',
       role: 'BIA',
       busname: 'Avling',
       dateEstablished: '2017-01-01',
       password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
       pocketID: '1p',
       emailAddress:'avling@gmail.com'
    },
    {
        busID: '2b',
        role: 'owner',
        busname: 'Paella',
        dateEstablished: '2015-01-01',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '1p',
        emailAddress:'paella@gmail.com'
     },
     {
        busID: '3b',
        role: 'owner',
        busname: 'Mercury Espresso Bar',
        dateEstablished: '2020-01-01',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '1p',
        emailAddress:'mercury@gmail.com'
     },
     {
        busID: '4b',
        role: 'owner',
        busname: 'Slowhands Pizza',
        dateEstablished: '2022-01-01',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '1p',
        emailAddress:'slowhands@gmail.com'
     },
     {
        busID: '5b',
        role: 'BIA',
        busname: 'De Mello Coffee',
        dateEstablished: '2011-01-01',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '2p',
        emailAddress:'demello@gmail.com'
     },
     {
        busID: '6b',
        role: 'owner',
        busname: 'Himalayan Java House',
        dateEstablished: '2009-01-01',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '2p',
        emailAddress:'himalayanjava@gmail.com'
     },
     {
        busID: '7b',
        role: 'owner',
        busname: 'Isaan Der Yonge',
        dateEstablished: '2019-01-01',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '2p',
        emailAddress:'isaander@gmail.com'
     },
     {
        busID: '7b',
        role: 'owner',
        busname: 'Juicy Dumplings Yonge',
        dateEstablished: '2012-01-01',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '2p',
        emailAddress:'juicydumpling@gmail.com'
     },
 ] )

db.mongopocketmanagers.insertMany( [
   {
      managerID: '1PM',
      password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
      name: 'Manager Vibes',
      managername: 'managervibes',
      pocketID: '1p',
      emailAddress: 'manager@pocket1.com',
   },
   {
      managerID: '2PM',
      password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
      name: 'Manager Also',
      managername: 'manager2Pvibes',
      pocketID: '2p',
      customers: 'manager@pocket2.com',
    }
])

 db.mongopockets.insertMany( [
    {
       pocketID: '1p',
       pocketname: 'Leslieville',
       pocketManagerID: '1PM',
       businesses: ['1b', '2b', '3b', '4b'],
       customers: ['1c', '3c', '5c'],
    },
    {
        pocketID: '2p',
        pocketname: 'Uptown Yonge',
        pocketManagerID: '2PM',
        businesses: ['5b', '6b', '7b', '8b'],
        customers: ['1c', '2c', '4c',],
     }
])