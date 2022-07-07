const { gql, ApolloError } = require('apollo-server');
const obfuscate = require('../helpers/obfuscate')
const validate = require('../helpers/validate')

module.exports = {
  Query: {
    pocketManager: async (parent, { managerID }, { PocketManager, mongoPocketManager}) => {
      //change to make sure nonempty mangerID was given
        if (managerID === '') {
          return null;
        }
        //get the relevant manager info from SQL and mongo
        const managerInfo = await PocketManager.findOne({ where : {ID: managerID}});
        const mongoManagerInfo = await mongoPocketManager.findOne({ managerID: managerID});
        //if the schemas return with relevant info for both mongo and SQl proceed
        if(managerInfo && mongoManagerInfo){
            return {
              //return values described for manager
              "managerID": managerInfo.dataValues.ID,
              "pocketID": managerInfo.dataValues.pocketID,
              "name": mongoManagerInfo.name,
              "managername": mongoManagerInfo.managername,
              "emailAddress": mongoManagerInfo.emailAddress,
            }
  
        }
        else {
          throw new ApolloError(`PocketManagerID:${managerID} doesn't exist`);
          return {};
        }
    },
    loginManager: async (parent, { managername, password }, { mongoPocketManager, PocketManager}) => {
        const manager = await mongoPocketManager.findOne({ managername })
        //check to make sure manager with that username actually exists
        if (manager){
          //check to make sure the manager exists in SQL too
          const managerTable = await PocketManager.findOne({where: {ID: manager.managerID}})
          if(managerTable){
            //see if the password passed in matches the password saved in the databases
            const validated = validate(password, manager.password, managerTable.dataValues.salt)
            if(validated){
              return manager
            }
            else{
              throw new ApolloError(`password incorrect`);
            }
          }
          else {
            throw new ApolloError(`manager username:${managername} doesn't exist in SQL` );
          }
        }
        else {
          throw new ApolloError(`manager username:${managername} doesn't exist in MongoDB`);
        }
      },
  },

  Mutation: {
    registerManager: async (parent, { managername, password, pocketID }, { PocketManager, Pocket, mongoPocket, mongoBusiness, mongoPocketManager, mongoUser }) => {
        //immediately encrypt the business users password
        const encryptpass = obfuscate(password);
        //check to see the username they want isnt taken by another user or a business or manager
        const existing = await mongoPocketManager.findOne({ managername: managername })
        const userExisting = await mongoUser.findOne({ username: managername })
        const busExisting = await mongoBusiness.findOne({ busname: managername })
        if (!existing && !userExisting && !busExisting) {
          //create a new pocket manager in Mongo and SQL
          const newManager= await PocketManager.create({ salt: encryptpass.salt, pocketID: pocketID});
          //assign to Pocket the PocketManager
          await Pocket.update({
            pocketManager: newManager.ID,
          }, {
            where: {ID: pocketID}
          })
          await mongoPocket.update({pocketManager: newManager.ID})
          const newMongoPocketManager = await mongoPocketManager.create({ 
            managerID: newManager.ID, 
            managername: managername, 
            password: encryptpass.hash,
            pocketID: newManager.pocketID
          })
          newMongoPocketManager.save()
          return newMongoPocketManager
        } else {
          throw new ApolloError('PocketManager already exists, or username taken')
        }
      },  
  }
}