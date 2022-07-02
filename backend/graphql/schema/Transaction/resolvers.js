const { gql, ApolloError } = require('apollo-server');
const R = require('ramda');
const { Business } = require('../../../databases/SQLSchema/db');

const updateChangeAcross = async(Change, Pocket, pocketID, userID, updatedChange, updatedChangeCirculating, dateOfTransaction) => {
    transactionDate = new Date(dateOfTransaction)
    var expiryDate = (transactionDate).setMonth(transactionDate.getMonth() + 6)
    //store expiry date in yyyy-mm-dd format
    expiryDate= new Date(expiryDate).toISOString().slice(0, 10)
    await Change.update({
        value: updatedChange,
        expiryDate: expiryDate
      }, {
        where: { pocketID: pocketID, userID:userID }
      })
    //update pocket circulating change
    await Pocket.update({
        circulatingChange: updatedChangeCirculating
      }, {
        where: { ID: pocketID }
      })
}

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
                  "busID": transactionInfo.dataValues.businessID,
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
        processTransaction: async (parent, {userID, busID, pocketID, value, changeUsed}, { Pocket, mongoUser, Transaction, Change}) => {
            if(userID, busID, pocketID, value){
                 //write this resolver TO-DO
                //check to make sure user is in pocket
                const changeUsing = Math.round((Number(changeUsed) + Number.EPSILON) * 100) / 100
                const mongoUserInfo = await mongoUser.findOne({ userID })
                if(mongoUserInfo){
                    const pockets = mongoUserInfo.pockets
                    const exists = pockets.includes(pocketID)
                    //the user is in this pocket so now find out if the business is in this pocket
                    if(exists){
                        //check to make sure business is in pocket
                        const businessInfo = await Business.findOne({ where : {ID: busID}});
                        const businessPocket = businessInfo.dataValues.pocketID
                        var changeEarned = 0
                        if(businessPocket == pocketID){
                            //get pocket Info
                            const pocketInfo = await Pocket.findOne({where:{ID:pocketID}})
                            //get change info
                            const userChangeInfo = await Change.findOne({where:{
                                userID: userID,
                                pocketID: pocketID}
                              })
                            //get date 
                            const dateOfTransaction = new Date().toISOString().slice(0, 10)
                            //business is in the pocket, so now check if change is used
                            if(changeUsing >0.00){
                                //subtract change from users change in SQL and from pockets circulating change
                                //check to make sure user has enough change
                                const availableChange = Number(userChangeInfo.dataValues.value)
                                if(changeUsing <= availableChange){
                                    //user has enough change, subtract the change
                                    var changeRedeemed = changeUsing
                                    const updatedChange = availableChange - changeUsing
                                    //update the change in Change and Pocket
                                    const oldChangeCirculating = pocketInfo.dataValues.circulatingChange
                                    const updatedChangeCirculating = oldChangeCirculating - changeRedeemed
                                    await updateChangeAcross(Change, Pocket, pocketID, userID, updatedChange, updatedChangeCirculating, dateOfTransaction)
                                }
                                else {
                                    throw new ApolloError(`User:${userID} has insufficient change in Pocket: ${pocketID}`);
                                }
                            }
                            else{
                                //get pocket info to calculate rate of change, change is earned
                                var changeRedeemed = 0
                                const changeRate = pocketInfo.dataValues.changeRate
                                changeEarned = Math.round((value*(changeRate)+ Number.EPSILON) * 100) / 100 
                                const currChange = Math.round((Number(userChangeInfo.dataValues.value) + Number.EPSILON) * 100) / 100 
                                const updatedChange = Math.round(((currChange  + changeEarned)+ Number.EPSILON) * 100) / 100 
                                const oldChangeCirculating =  Math.round((Number(pocketInfo.dataValues.circulatingChange) + Number.EPSILON) * 100) / 100
                                const updatedChangeCirculating = oldChangeCirculating + changeEarned
                                await updateChangeAcross(Change, Pocket, pocketID, userID, updatedChange, updatedChangeCirculating, dateOfTransaction)
                            }
                            //change is updated across
                            const newTransaction = await Transaction.create({
                                userID: userID,
                                value: value,
                                businessID: busID,
                                date: dateOfTransaction,
                                pocketID: pocketID,
                                changeRedeemed: changeRedeemed,
                                changeEarned: changeEarned
                            })
                            return {
                                "transactionID": newTransaction.dataValues.ID,
                                "userID": newTransaction.dataValues.userID,
                                "value": newTransaction.dataValues.value,
                                "date": newTransaction.dataValues.Date,
                                "busID": newTransaction.dataValues.businessID,
                                "pocketID": newTransaction.dataValues.pocketID,
                                "changeRedeemed": newTransaction.dataValues.changeRedeemed,
                                "changeEarned": newTransaction.dataValues.changeEarned,
                              }
                        }
                        else {
                            throw new ApolloError(`Business:${busID} is not in Pocket: ${pocketID}`);
                        }
                    }
                    else {
                        throw new ApolloError(`User:${userID} is not in Pocket: ${pocketID}`);
                    }
                }
                else {
                    throw new ApolloError(`User:${userID} does not exist`);
                }
            }
            else {
              throw new ApolloError(`Not enough information about userID, busID, pocketID` );
            }
        },
    }
  }