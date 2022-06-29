db = connect('mongodb://localhost/pocketchange')

db.mongousers.insertMany( [
   {
      userID: '1c',
      username: 'ilovelocal',
      password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
      pockets: [ '1p', '2p' ],
      favouriteBusiness: ['1b'],
      emailAddress:'ilovelocal@gmail.com'
   },
   {
      userID: '2c',
      username: 'localrules',
      password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
      pockets: [ '2p' ],
      favouriteBusiness: ['8b'],
      emailAddress:'localrules@gmail.com'
   },
   {
      userID: '3c',
      username: 'shop123',
      password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
      pockets: [ '1p'],
      favouriteBusiness: ['2b'],
      emailAddress:'shop123@gmail.com'
   },
   {
      userID: '4c',
      username: 'loyalshop',
      password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
      pockets: [ '2p'],
      favouriteBusiness: ['5b'],
      emailAddress:'loyalshop@gmail.com'
   },
   {
      userID: '5c',
      username: 'mmrewards',
      password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
      pockets: [ '1p'],
      favouriteBusiness: ['3b'],
      emailAddress:'mmrewards@gmail.com'
   },
] )

db.mongobusinesses.insertMany( [
    {
       busID: '1b',
       role: 'BIA',
       busname: 'Avling',
       password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
       pocketID: '1p',
       emailAddress:'avling@gmail.com'
    },
    {
        busID: '2b',
        role: 'owner',
        busname: 'Paella',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '1p',
        emailAddress:'paella@gmail.com'
     },
     {
        busID: '3b',
        role: 'owner',
        busname: 'Mercury Espresso Bar',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '1p',
        emailAddress:'mercury@gmail.com'
     },
     {
        busID: '4b',
        role: 'owner',
        busname: 'Slowhands Pizza',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '1p',
        emailAddress:'slowhands@gmail.com'
     },
     {
        busID: '5b',
        role: 'BIA',
        busname: 'De Mello Coffee',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '2p',
        emailAddress:'demello@gmail.com'
     },
     {
        busID: '6b',
        role: 'owner',
        busname: 'Himalayan Java House',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '2p',
        emailAddress:'himalayanjava@gmail.com'
     },
     {
        busID: '7b',
        role: 'owner',
        busname: 'Isaan Der Yonge',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '2p',
        emailAddress:'isaander@gmail.com'
     },
     {
        busID: '7b',
        role: 'owner',
        busname: 'Juicy Dumplings Yonge',
        password: 'c10b97b87be603d21bd842681f24b644a76d00fc44f1437cb6cdee20ecec74781f24ede27c25071f9bd811dab63df19ca3f64eb4b2f0ccc95bc25619adc2f5ba',
        pocketID: '2p',
        emailAddress:'juicydumpling@gmail.com'
     },
 ] )

 db.mongopockets.insertMany( [
    {
       pocketID: '1p',
       pocketname: 'Leslieville',
       businesses: ['1b', '2b', '3b', '4b'],
       customers: ['1c', '3c', '5c'],
    },
    {
        pocketID: '2p',
        pocketname: 'Uptown Yonge',
        businesses: ['5b', '6b', '7b', '8b'],
        customers: ['1c', '2c', '4c',],
     }
])