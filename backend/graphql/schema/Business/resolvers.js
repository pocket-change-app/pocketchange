const { gql, ApolloError } = require('apollo-server');
const { IsIn, WorksAt } = require('../../../databases/SQLSchema/db');
const obfuscate = require('../helpers/obfuscate')
const validate = require('../helpers/validate')

module.exports = {
  Query: {
    business: async (parent, { businessID }, { Business, mongoBusiness}) => {
      //change to make sure nonempty businessID was given
        if (businessID === '') {
          return null;
        }
        //get the relevant business info from mongo, ensuring SQL exists
        const businessInfo = await Business.findOne({ where : {businessID: businessID}});
        const mongoBusInfo = await mongoBusiness.findOne({ businessID});
        //if the schemas return with relevant info for both mongo and SQl proceed
        if(businessInfo && mongoBusInfo){
            //subset fields needed which are businessID, businessName, 
            //dateEstablished, emailAddress, phoneNumber, website, businessType,businessSubtype
            return {
              //return values described for business
              businessID: mongoBusInfo.businessID, 
              businessName: mongoBusInfo.businessName,
              dateEstablished: mongoBusInfo.dateEstablished,
              emailAddress: mongoBusInfo.emailAddress,
              phoneNumber: mongoBusInfo.phoneNumber,
              website: mongoBusInfo.website,
              businessType: mongoBusInfo.businessType,
              businessSubtype: mongoBusInfo.businessSubtype,
            }
  
        }
        else {
          throw new ApolloError(`businessID:${businessID} doesn't exist`);
          return {};
        }
    }
  },

  Mutation: {
    createBusiness: async (parent, { 
      userID,
      businessName, 
      dateEstablished, 
      emailAddress, 
      phoneNumber, 
      website, 
      businessType,
      businessSubtype,
      pocketID 
    }, { Business, mongoBusiness, IsIn, WorksAt}) => {
        //immediately encrypt the business users password
        const encryptpass = obfuscate(password);
        //check to see the business name they want isn't taken by another business
        const existing = await mongoBusiness.findOne({ businessName: businessName })
        if (!existing) {
          //create a new business in Mongo and SQL
          const newBus = await Business.create({});
          const newMongoBus = await mongoBusiness.create({ 
            businessID: newBus.businessID, 
            businessName: businessName,
            dateEstablished: dateEstablished,
            emailAddress: emailAddress,
            phoneNumber: phoneNumber,
            website: website,
            businessType: businessType,
            businessSubtype,
            busname: busname, 
          })
          //create the relationship where the business is part of a pocket
          await IsIn.create({
            businessID: newBus.businessID,
            pocketID: pocketID
          })
          //create the relationship where the user who made the business is the owner of the business
          await WorksAt.create({
            userID: userID,
            businessID: newBus.businessID,
            role: 'owner'
          })
          newMongoBus.save()
          return {
            businessID: newMongoBus.businessID, 
            businessName: newMongoBus.businessName,
            dateEstablished: newMongoBus.dateEstablished,
            emailAddress: newMongoBus.emailAddress,
            phoneNumber: newMongoBus.phoneNumber,
            website: newMongoBus.website,
            businessType: newMongoBus.businessType,
            businessSubtype: newMongoBus.businessSubtype,
          }
        } else {
          throw new ApolloError('Business already exists')
        }
      },  
  }
}