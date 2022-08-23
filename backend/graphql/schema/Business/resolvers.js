const { gql, ApolloError } = require('apollo-server');
const { IsIn, WorksAt } = require('../../../databases/SQLSchema/db');
const obfuscate = require('../helpers/obfuscate')
const validate = require('../helpers/validate')
const R = require('ramda')
const math = require('mathjs')


module.exports = {
  Query: {
    business: async (parent, { businessID }, { Business, mongoBusiness}) => {
      //check to make sure nonempty businessID was given
        if (businessID === '') {
          return null;
        }
        //get the relevant business info from mongo, ensuring SQL exists
        const businessInfo = await Business.findOne({ where : {businessID: businessID}});
        const mongoBusinessInfo = await mongoBusiness.findOne({ businessID});
        //if the schemas return with relevant info for both mongo and SQl proceed
        if(businessInfo && mongoBusinessInfo){
            //subset fields needed which are businessID, businessName, 
            //dateEstablished, emailAddress, phoneNumber, website, businessType,businessSubtype
            return {
              //return values described for business
              businessID: mongoBusinessInfo.businessID, 
              businessName: mongoBusinessInfo.businessName,
              dateEstablished: mongoBusinessInfo.dateEstablished,
              emailAddress: mongoBusinessInfo.emailAddress,
              phoneNumber: mongoBusinessInfo.phoneNumber,
              website: mongoBusinessInfo.website,
              businessType: mongoBusinessInfo.businessType,
              businessSubtype: mongoBusinessInfo.businessSubtype,
            }
  
        }
        else {
          throw new ApolloError(`businessID:${businessID} doesn't exist`);
          return {};
        }
    },
    getAllBusinesses: async (parent, { pocketID, businessType, businessSubtype, businessTag }, { Business, mongoBusiness, IsIn}) => {
      //create filter obejct to hold filters for mongoose
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
      console.log(filterBusiness)

      let mongoBusinessesInfo;
      if (filterBusiness.length == 0) {
        mongoBusinessesInfo = await mongoBusiness.find(); 
      } else {
        mongoBusinessesInfo = await mongoBusiness.find({ $and: filterBusiness}); 
      }
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
      //return mongoBusinessesInfo, if empty it will return an empty list indicating that no businesses matching this criteria were found
      console.log(mongoBusinessesInfo)
      if(mongoBusinessesInfo)
        return mongoBusinessesInfo
      else {
        return []
      }
    },
    getLovedBusinessesByUser: async (parent, { userID }, { Business, mongoBusiness, Loves}) => {
      //get a list of all businesses
      mongoBusinessesInfo = await mongoBusiness.find(); 
      //get a list of user loved businesses
      if (userID != null) {
        //check the user-business relationship SQL table Loves
        const lovesInfo = await Loves.findAll({where: {userID: userID}})
        //join two object arrays by matching businessID
        const joinByBusinessID = R.innerJoin(
          (a, b) => a.businessID === b.businessID
        )
        return joinByBusinessID(mongoBusinessesInfo, lovesInfo)
      } 
      //return mongoBusinessesInfo, if empty it will return an empty list indicating that user loves no businesses
      console.log(mongoBusinessesInfo)
      if(mongoBusinessesInfo)
        return mongoBusinessesInfo
      else {
        return []
      }
    },
    getNearbyBusinesses: async (parent, { latitude, longitude, radius }, { Business, mongoBusiness, Loves}) => {
      //get a list of all businesses
      mongoBusinessesInfo = await mongoBusiness.find(); 
      //check to make sure the distance between the business and the coordinates entered is less than the radius
      
      nearbyLat = abs(businessLats - consumerLat) < radius
      nearbyLong = abs(businessLong - consumerLong) < radius

      nearbyLatAndLong = nearbyLat && nearbyLong

      nearbyBusinessesbusinesses[nearbyBusinessesBool]

      //return mongoBusinessesInfo, if empty it will return an empty list indicating that user loves no businesses
      console.log(mongoBusinessesInfo)
      if(mongoBusinessesInfo)
        return mongoBusinessesInfo
      else {
        return []
      }
    },

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