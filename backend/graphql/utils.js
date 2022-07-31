const R = require('ramda')
const RA = require('ramda-adjunct')

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


module.exports = {
  renameKeys,
  renameNestedKeys,
  decimalValue,
  decimalNested

  
}