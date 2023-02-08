const { gql, ApolloError } = require('apollo-server');
const { IsIn, WorksAt } = require('../../../database_schemas/SQLSchema/db');
const {decimalNested} = require('../../utils')
const returnAllBusinesses = require('../helpers/returnAllBusinesses')
const R = require('ramda')
const math = require('mathjs')
const {Op} = require('sequelize')
//sk_test must be replaced with private key
require('dotenv').config('../../.env');
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(STRIPE_SECRET_KEY);
                                                                                                                                                                                                                                                                                                       
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
            if(mongoBusinessInfo.status.deactivated == false){
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
              status: mongoBusinessInfo.status,
              latitude: mongoBusinessInfo.latitude,
              longitude:  mongoBusinessInfo.longitude,
              address: mongoBusinessInfo.address,
              businessTags: mongoBusinessInfo.businessTags,
              stripeID: mongoBusinessInfo.stripeID,
              description: mongoBusinessInfo.description,
              hours: mongoBusinessInfo.hours,
              status: mongoBusinessInfo.status,
            }
          }
          else {
            throw new ApolloError(`This businessID:${businessID} no longer exists`);
            return {};
          }
        }
        else {
          throw new ApolloError(`businessID:${businessID} doesn't exist`);
          return {};
        }
    },
    getAllBusinesses: async (parent, { pocketID, businessType, businessSubtype, businessTag }, { mongoBusiness, IsIn}) => {
      //create filter obejct to hold filters for mongoose
      const mongoBusinessesInfo = await returnAllBusinesses({
        pocketID: pocketID, businessType: businessType, businessSubtype: businessSubtype, businessTag:businessTag
      },{IsIn, mongoBusiness}) 
      //return mongoBusinessesInfo, if empty it will return an empty list indicating that no businesses matching this criteria were found
      console.log(mongoBusinessesInfo)
      if(mongoBusinessesInfo)
        return mongoBusinessesInfo
      else {
        return []
      }
    },
    getLovedBusinessesByUser: async (parent, { userID }, { Business, mongoBusiness, Loves}) => {
      //get a list of all businesses that are active
      mongoBusinessesInfo = await mongoBusiness.find({'status.deactivated': false}); 
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
    getNearbyBusinesses: async (parent, { latitude, longitude, radius }, { Business, mongoBusiness}) => {
      //get a list of all businesses that are active
      businessList = await mongoBusiness.find({'status.deactivated': false}); 
      console.log(businessList)
      //check to make sure the distance between the business and the coordinates entered is less than the radius
      
      const businessLats = (R.pluck('latitude', businessList))
      const businessLongs = (R.pluck('longitude', businessList))
      const latOnes = (math.multiply(math.ones(businessLats.length), latitude))
      const longOnes =  (math.multiply(math.ones(businessLongs.length), longitude))

      const node1 = math.parse('math.abs(math.subtract((businessLats), latOnes)) <= radius')
      const node2 = math.parse('math.abs(math.subtract((businessLongs), longOnes)) <= radius')
      const code1 = node1.compile()
      const code2 = node2.compile()
      let scope = {
          math: math,
          businessLats: businessLats,
          latOnes: latOnes,
          radius: radius,
          longOnes:longOnes,
          businessLongs: businessLongs,
      }
      const nearbyLat = (code1.evaluate(scope))
      const nearbyLong = (code2.evaluate(scope))

      const node3 = math.parse('nearbyLat and nearbyLong')
      const code3 = node3.compile()
      let scope2 = {
          nearbyLat: nearbyLat,
          nearbyLong: nearbyLong
      }
      const nearbyLatAndLong = (code3.evaluate(scope2))
      //function to subset list by a list of true and false
      const f = (as, bs) => as.filter((_, i) => bs[i])
      const closestBusinesses = (f(businessList, nearbyLatAndLong._data))

      //return closestBusinesses info, if empty it will return an empty list indicating that there are no close businesses
      if(closestBusinesses)
        return closestBusinesses
      else {
        return []
      }
    },
    getSimilarBusinesses: async (parent, { businessID, businessNumber, startDate, endDate }, { Business, mongoBusiness, Transaction, sequelizeConnection}) => {
      //find the top n (n = businessNumbr) list of all businesses that have customer overlap with the business in question (businessID) within dates if specified
      if (businessID == null) {
        return null;
      }
      if(startDate && endDate){
        //get transactions between dates
        //assume start date and end date in yyyy-mm-dd format as that is the Date format specified
        //SELECT `transaction`.* FROM `transactions` AS `transaction` WHERE `transaction`.`businessID` = '2b' AND (DATE(`transaction`.`date`) BETWEEN '2010-01-30' AND '2030-09-29') ORDER BY `date`;
        const whereBusiness = { businessID: businessID,
            date: {
              [Op.between]: [startDate, endDate]
            }
        };
        const transactionsByBusInDates = await Transaction.findAll({ 
          where: whereBusiness
        })
        const finalTransactionObject = decimalNested(transactionsByBusInDates,'value', 'dataValues' )
        console.log(finalTransactionObject)
        //need to get a list of all the userIDs from the transaction object
        const userIDs = R.pluck("userID", finalTransactionObject);
        console.log(userIDs)
        const whereUser = { userID: { [Op.or]:  userIDs},
          date: {
            [Op.between]: [startDate, endDate]
          }
        };
        let transactionsInBusinessesWithCommonUsersBetweenDates = await Transaction.findAll({ 
          attributes: [
            'businessID',
            [sequelizeConnection.fn('COUNT', sequelizeConnection.col('businessID')), "businessCount"],
            'userID'
          ],
          group: ["userID", "businessID"],
          where: whereUser,
          order: [ [ sequelizeConnection.fn('COUNT', sequelizeConnection.col('businessID')), 'DESC' ]],
        })
        console.log(transactionsInBusinessesWithCommonUsersBetweenDates)
        transactionsInBusinessesWithCommonUsersBetweenDates = decimalNested(transactionsInBusinessesWithCommonUsersBetweenDates,'value', 'dataValues' )
        //need to get a list of all the businessIDs from the transaction object
        let businessIDs = R.pluck("businessID", transactionsInBusinessesWithCommonUsersBetweenDates);
        console.log(businessIDs)
        if(businessNumber != null){
          businessIDs = businessIDs.slice(0, businessNumber);
        }
        //find common businesses that are active
        const commonBusinesses = await mongoBusiness.find({ $and: [{businessID: { $in: businessIDs }, 'status.deactivated': false }] })
        return commonBusinesses
      } 
    },
  },

  Mutation: {
    createBusiness: async (parent, { 
      userID,
      businessName, 
      dateEstablished, 
      phoneNumber, 
      website, 
      businessType,
      businessSubtype,
      emailAddress, 
      address,
      latitude,
      longitude,
      businessTags,
      pocketID,
      hours,
      description, 
      ownerID,
    }, { Business, mongoBusiness, IsIn, WorksAt}) => {
        //check to see the business name they want isn't taken by another business
        const existing = await mongoBusiness.findOne({ businessName: businessName })
        if (!existing) {
          //create a new business in Mongo and SQL
          const newBus = await Business.create({});
          const newMongoBus = await mongoBusiness.create({ 
            businessID: newBus.businessID, 
            businessName: businessName,
            dateEstablished: dateEstablished? dateEstablished : null,
            emailAddress: emailAddress? emailAddress : null,
            phoneNumber: phoneNumber? phoneNumber : null,
            website: website ? website: null,
            businessType: businessType,
            businessSubtype: businessSubtype? businessSubtype: null ,
            address: address,
            latitude: latitude ? latitude: null,
            longitude: longitude ? longitude: null,
            businessTags: businessTags? businessTags : null,
            stripeID: null,
            description: description,
            status: {
              pending: true,
              approved: false,
              deactivated: false,
            },
            hours: hours? hours: null,
          })
          //create the relationship where the business is part of a pocket
          await IsIn.create({
            businessID: newBus.businessID,
            pocketID: pocketID
          })
          //create the relationship where the user who made the business is the owner of the business if owner wasn't specified
          const businessOwner = ownerID? ownerID: userID
          await WorksAt.create({
            userID: businessOwner,
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
            status: newMongoBus.status,
            hours: newMongoBus.hours,
          }
        } else {
          throw new ApolloError('Business already exists')
        }
    },  
    updateBusiness: async (parent, { 
      userID,
      businessID,
      businessName, 
      dateEstablished, 
      emailAddress, 
      phoneNumber, 
      website, 
      businessType,
      businessSubtype,
      hours,
    }, { Business, mongoBusiness, IsIn, WorksAt, mongoUser}) => {
        //check to make sure the userID is the business owner 
        const worksAtInfo = await WorksAt.findOne({where:{ userID:userID, businessID: businessID}})
        if(worksAtInfo && worksAtInfo.dataValues.role == 'owner' || userID == 'pocketchangeAdmin'){
          //the user is the owner of this business, proceed (or its pocketchange admin)
          //update the business with specified values
          const mongoBusinessInfo = await mongoBusiness.findOne({ businessID: businessID })
          await mongoBusiness.updateOne({ businessID: businessID },
            {
              businessName: businessName == null ? mongoBusinessInfo.businessName : businessName,
              dateEstablished: dateEstablished ==null ? mongoBusinessInfo.dateEstablished : dateEstablished ,
              emailAddress: emailAddress ==null ? mongoBusinessInfo.emailAddress : emailAddress ,
              phoneNumber: phoneNumber ==null ? mongoBusinessInfo.phoneNumber : phoneNumber ,
              website: website ==null ? mongoBusinessInfo.website : website ,
              businessType: businessType ==null ? mongoBusinessInfo.businessType : businessType ,
              businessSubtype: businessSubtype ==null ? mongoBusinessInfo.businessSubtype : businessSubtype ,
              address: address ==null ? mongoBusinessInfo.address : address ,
              latitude: latitude ==null ? mongoBusinessInfo.latitude : latitude ,
              longitude: longitude ==null ? mongoBusinessInfo.longitude : longitude ,
              businessTags: businessTags ==null ? mongoBusinessInfo.businessTags : businessTags ,
              description: description ==null ? mongoBusinessInfo.description : description ,
              hours: hours ==null ? mongoBusinessInfo.hours : hours ,
            })
            mongoBusinessInfo.save()
          return(mongoBusinessInfo)
        }
        else {
          throw new ApolloError('this isn\'t the owner of the business or pocketchange admin')
        }
    }, 
    createStripeLink: async (parent, { 
      userID,
      businessID
    }, { Business, mongoBusiness, IsIn, WorksAt, mongoUser}) => {
        //check to make sure the userID is the business owner 
        const worksAtInfo = await WorksAt.findOne({where:{ userID: userID, businessID: businessID}})
        if(worksAtInfo && worksAtInfo.dataValues.role == 'owner' || userID == 'pocketchangeAdmin'){
          // the user is the current owner of this business, proceed (or its pocketchange admin)

          // fetch user and business info
          const mongoUserInfo = await mongoUser.findOne({ userID: userID })
          const mongoBusinessInfo = await mongoBusiness.findOne({ businessID: businessID })

          // create stripe account
          const account = await stripe.accounts.create({
            type: 'express',  
            //email: mongoUserInfo.emailAddress,
            //country: 'CA'
          });
          await mongoBusiness.updateOne({ businessID: businessID }, {stripeID: account.id})
          const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: 'https://example.com/reauth',
            return_url: 'https://example.com/return', //TODO: have this go to home page in pocketchange app
            type: 'account_onboarding',
          });
          return accountLink
        }
        else {
          throw new ApolloError('this isn\'t the owner of the business or pocketchange admin')
        }
    },  
    updateBusinessOwner: async (parent, { 
      userID,
      ownerID,
      businessID
    }, { Business, mongoBusiness, IsIn, WorksAt, mongoUser}) => {
        //check to make sure the userID is the business owner 
        const worksAtInfo = await WorksAt.findOne({where:{ userID:userID, businessID: businessID}})
        if(worksAtInfo && worksAtInfo.dataValues.role == 'owner' || userID == 'pocketchangeAdmin'){
          //the user is the current owner of this business, proceed (or its pocketchange admin)
          //update the role of the business
          const WorksAt = await WorksAt.update(
            {
              userID: ownerID,
            },
            {
              where: { pocketID: pocketID, role: "owner" },
            }
          )
          const mongoBusinessInfo = await mongoBusiness.findOne({ businessID: businessID })
          return(mongoBusinessInfo)
        }
        else {
          throw new ApolloError('this isn\'t the owner of the business or pocketchange admin')
        }
    },  
    deactivateBusiness: async (parent, { 
      userID,
      businessID
    }, { Business, mongoBusiness, IsIn, WorksAt, mongoUser}) => {
        //check to make sure the userID is the business owner 
        const worksAtInfo = await WorksAt.findOne({where:{ userID:userID, businessID: businessID}})
        if(worksAtInfo && worksAtInfo.dataValues.role == 'owner' || userID == 'pocketchangeAdmin'){
          //the user is the owner of this business, proceed (or its pocketchange admin)
          //deactivate the business
          await mongoBusiness.updateOne({ businessID: businessID },
            {
              status: {
                pending: false,
                approved: false,
                deactivated: true
              },
            })
          const mongoBusinessInfo = await mongoBusiness.findOne({ businessID: businessID })
          console.log(mongoBusinessInfo)
          return(mongoBusinessInfo)
        }
        else {
          throw new ApolloError('this isn\'t the owner of the business or pocketchange admin')
        }
    },  
    approveBusiness: async (parent, { 
      userID,
      businessID
    }, { Business, mongoBusiness,  WorksAt, IsIn}) => {
      //check to make sure the userID is the business manager 
      const worksAtInfo = await WorksAt.findOne({ where:{ userID:userID, businessID: businessID}})
      if(worksAtInfo && worksAtInfo.dataValues.role == 'owner' || userID == 'pocketchangeAdmin'){
        //the user is the manager of this pocket, proceed (or its pocketchange admin)
          //approve the business
          await mongoBusiness.updateOne({ businessID: businessID },
            {
              status: {
                pending: false,
                approved: true,
                deactivated: false
              },
            })
          const mongoBusinessInfo = await mongoBusiness.findOne({ businessID: businessID })
          console.log(mongoBusinessInfo)
          return(mongoBusinessInfo)
        }
        else {
          throw new ApolloError('this isn\'t the manager of the pocket or pocketchange admin')
        }
    },  
  }
}