const R = require('ramda')
const RA = require('ramda-adjunct')
const crypto = require('crypto')

//where keysMap is a dictionary of {currentName1 : remappedName1, currentName2 : remappedName2} and obj
// is the object with currentName1, currentName2 field names
// obj {
//      key: {
//        currentName1: 'someValue',
//        currentName2: 'someOtherValue',
//      },
const renameKeys = R.curry((keysMap, obj) =>
  R.reduce((acc, key) => R.assoc(keysMap[key] || key, obj[key], acc), {}, R.keys(obj))
);

//where keysMap is a dictionary of {currentName1 : remappedName1, currentName2 : remappedName2} and obj
// is the object with currentName1, currentName2 field names within the field "key"
//ex:
// obj = 
//[
//    object {
//      key: {
//        currentName1: 'someValue',
//        currentName2: 'someOtherValue',
//      },
//    object {
//      key: {
//        currentName1: 'someValue',
//        currentName2: 'someOtherValue',
//      },
//  ]
const renameNestedKeys = (key, keysMap, obj) => ((R.map((renameKeys (keysMap)), R.map(R.prop([key]), obj))))


//takes an object and converts the specified key to a decimal of 2 places
const decimalValue = (obj, specKey) => {
  Object.keys(obj).forEach((key) => {
    if(key == specKey){
      obj[key] = parseFloat(obj[key]).toFixed(2)
    }
    else{
      obj[key] = obj[key]
    }
  }
  )
  return obj
}

//takes a list of nested objects called obj and by the outerKey defining the objects will convert the specKey to a decimal value of 2 places
const decimalNested = (obj, specKey, outerKey) => (R.map(y => decimalValue(y, specKey), R.map( x=> R.prop(outerKey, x), obj)))

//obfuscate pasword
const obfuscate = (pass) => {
  // (B1) GENERATE RANDOM SALT
  let length = 16;
  let salt =  crypto.randomBytes(Math.ceil(length / 2))
  .toString("hex")
  .slice(0, length); 

  // (B2) SHA512 HASH
  let hash = crypto.createHmac("sha512", salt);
  hash.update(pass);
  return {
    salt: salt,
    hash: hash.digest("hex")
  };
}

const validate = (userpass, hashedpass, salt) => {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(userpass);
  userpass = hash.digest("hex");
  return userpass == hashedpass;
};

module.exports = {
  renameKeys,
  renameNestedKeys,
  decimalValue,
  decimalNested,
  obfuscate,
  validate,


  
}