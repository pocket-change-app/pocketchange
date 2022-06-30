const { gql, ApolloError } = require('apollo-server');

module.exports = {
    Query: {
        transaction: async (parent, { transactionID }, { Transaction}) => {
            if (transactionID === '') {
              return null;
            }
            const transactionInfo = await Transaction.findOne({ where : {ID: transactionID}});
            if(transactionInfo ){
                return {
                  "transactionID": transactionInfo.dataValues.ID,
                  "userID": transactionInfo.dataValues.userID,
                  "value": transactionInfo.dataValues.value,
                  "date": transactionInfo.dataValues.Date,
                  "busID": transactionInfo.dataValues.busID,
                  "pocketID": transactionInfo.dataValues.pocketID,
                  "changeRedeemed": transactionInfo.dataValues.changeRedeemed,
                  "changeEarned": transactionInfo.dataValues.changeEarned,
                }
      
            }
            else {
              throw new ApolloError(`transactionID:${transactionID} doesn't exist`);
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