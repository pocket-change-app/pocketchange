const R = require('ramda')

module.exports = async function returnAllBusinesses (
    { pocketID, businessType, businessSubtype, businessTag }, { mongoBusiness, IsIn}
) {
  try {
    let filterBusiness = []
    //check to see if type is not null
    if (businessType != null) {
      filterBusiness.push({'businessType': businessType})
    }
    //check to see if subtype is not null
    if (businessSubtype != null) {
      filterBusiness.push({'businessSubtype' : businessSubtype})
    }
    //check to see if tag is not null
    if (businessTag != null) {
      filterBusiness.push({'businessTag': businessTag})
    }
    //make sure only getting active businesses
    filterBusiness.push({'status.deactivated': false})
    let mongoBusinessesInfo;
    mongoBusinessesInfo = await mongoBusiness.find({ $and: filterBusiness}); 
    //if pocket specified filter all business
    //check if pocketID is not null
    if (pocketID != null) {
      //check the pocket-business relationship SQL table IsIn
      const isInInfo = await IsIn.findAll({where: {pocketID: pocketID}})
      //join two object arrays by matching businessIDs
      const joinByBusinessID = R.innerJoin(
        (a, b) => a.businessID === b.businessID
      )
      return joinByBusinessID(mongoBusinessesInfo, isInInfo)
    }
    else{
      return mongoBusinessesInfo
    } 
  }
  catch (error) {
    console.log('returnAllBusinesses', error)
  }
}
