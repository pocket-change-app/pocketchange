const { gql, ApolloError } = require('apollo-server');
const obfuscate = require('../helpers/obfuscate')
const validate = require('../helpers/validate')

module.exports = {
  Query: {
    business: async (parent, { busID }, { Business, mongoBusiness}) => {
      //change to make sure nonempty busID was given
        if (busID === '') {
          return null;
        }
        //get the relevant business info from SQL and mongo
        const businessInfo = await Business.findOne({ where : {ID: busID}});
        const mongoBusInfo = await mongoBusiness.findOne({ busID});
        //if the schemas return with relevant info for both mongo and SQl proceed
        if(businessInfo && mongoBusInfo){
            return {
              //return values described for business
              "busID": businessInfo.dataValues.ID,
              "pocketID": businessInfo.dataValues.pocketID,
              "busname": mongoBusInfo.busname,
              "dateEstablished": mongoBusInfo.dateEstablished,
              "emailAddress": mongoBusInfo.emailAddress,
              "role": mongoBusInfo.role
            }
  
        }
        else {
          throw new ApolloError(`businessID:${busID} doesn't exist`);
          return {};
        }
    },
    loginBus: async (parent, { busname, password }, { mongoBusiness, Business}) => {
        const bus = await mongoBusiness.findOne({ busname })
        //check to make sure business with that username actually exists
        if (bus){
          //check to make sure the business exists in SQL too
          const busTable = await Business.findOne({where: {ID: bus.busID}})
          if(busTable){
            //see if the password passed in matches the password saved in the databases
            const validated = validate(password, bus.password, busTable.dataValues.salt)
            if(validated){
              return bus
            }
            else{
              throw new ApolloError(`password incorrect`);
            }
          }
          else {
            throw new ApolloError(`business username:${busname} doesn't exist in SQL` );
          }
        }
        else {
          throw new ApolloError(`business username:${busname} doesn't exist in MongoDB`);
        }
      },
  },

  Mutation: {
    registerBus: async (parent, { busname, password, pocketID }, { Business, mongoBusiness, mongoPocketManager, mongoUser }) => {
        //immediately encrypt the business users password
        const encryptpass = obfuscate(password);
        //check to see the username they want isnt taken by another user or a business or pm
        const existing = await mongoBusiness.findOne({ busname: busname })
        const userExisting = await mongoUser.findOne({ username: busname })
        const managerExisting = await mongoPocketManager.findOne({ managername: busname })
        if (!existing && !userExisting && !managerExisting) {
          //create a new business in Mongo and SQL
          const newBus = await Business.create({ salt: encryptpass.salt, pocketID: pocketID});
          const newMongoBus = await mongoBusiness.create({ 
            busID: newBus.ID, 
            busname: busname, 
            password: encryptpass.hash,
            pocketID: newBus.pocketID
          })
          newMongoBus.save()
          return newMongoBus
        } else {
          throw new ApolloError('Business already exists, or username taken')
        }
      },  
  }
}