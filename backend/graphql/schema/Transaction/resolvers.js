const { gql, ApolloError } = require('apollo-server');

module.exports = {
    Query: {
        pocket: async (parent, { pocketID }, { Pocket, mongoPocket}) => {
            if (pocketID === '') {
              return null;
            }
            const pocketInfo = await Pocket.findOne({ where : {ID: pocketID}});
            const mongoPocketInfo = await mongoPocket.findOne({ pocketID })
            if(pocketInfo && mongoPocketInfo ){
                return {
                  "pocketID": pocketInfo.dataValues.ID,
                  "circulatingChange": pocketInfo.dataValues.circulatingChange,
                  "changeRate": pocketInfo.dataValues.changeRate,
                  "customers": mongoPocketInfo.customers,
                  "businesses": mongoPocketInfo.businesses,
                  "pocketName" : mongoPocketInfo.pocketname
                }
      
            }
            else {
              throw new ApolloError(`pocketID:${pocketID} doesn't exist`);
              return {};
            }
        },
    },
  
    Mutation: {
        processTransaction: async (parent, {userID, busID, pocketID, value, usingChange}, { Pocket, Transaction, mongoPocket, sequelizeConnection}) => {
            if(userID, busID, pocketID, value, usingChange){
                return null //write this resolver TO-DO
                //check to make sure user is in pocket
                //check to make sure business is in pocket
                //if change is being used, go through process of substracting change
                //if change is not being used, get the changeRate of the pocket to calculate new change
                //update the new change of the user
                //update new change of the pocket
                //calculate points expiry date
                //save the transaction
            }
            else {
              throw new ApolloError(`Not enough information about userID, busID, pocketID` );
            }
        },
    }
  }