const R = require('ramda')
const RA = require('ramda-adjunct')

//where keysMap is a dictionary of {currentName1 : remappedName1, currentName2 : remappedName2} and obj
// is the object with currentName1, currentName2 field names
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

module.exports = {
  renameKeys,
  renameNestedKeys

  
}