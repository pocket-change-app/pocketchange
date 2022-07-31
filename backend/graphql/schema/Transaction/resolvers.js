const { gql, ApolloError } = require('apollo-server');
const R = require('ramda');
const { Business } = require('../../../databases/SQLSchema/db');
const {Op} = require('sequelize');
const {decimalNested} = require('../../utils')


//standard for dealing with monetary values in the backend is convert your value to a float, 
//calculate, and then round and store again as a decimal in the backend
//https://stackoverflow.com/questions/224462/storing-money-in-a-decimal-column-what-precision-and-scale


const updateChangeAcross = async(Change, Pocket, pocketID, userID, updatedChange, updatedChangeCirculating, dateOfTransaction) => {
    transactionDate = new Date(dateOfTransaction)
    var expiryDate = (transactionDate).setMonth(transactionDate.getMonth() + 6)
    //store expiry date in yyyy-mm-dd format
    expiryDate= new Date(expiryDate).toISOString().slice(0, 10)
    //update all change assuming values are floats and cast them to 4 decimal place strings
    await Change.update({
        value: updatedChange.toFixed(4),
        expiryDate: expiryDate
      }, {
        where: { pocketID: pocketID, userID:userID }
      })
    //update pocket circulating change
    await Pocket.update({
        circulatingChange: updatedChangeCirculating.toFixed(4)
      }, {
        where: { pocketID: pocketID }
      })
}

module.exports = {
    Query: {
        transaction: async (parent, { transactionID }, { Transaction}) => {
            if (transactionID === '') {
              return null;
            }
            const transactionInfo = await Transaction.findOne({ where : {transactionID: transactionID}});
            if(transactionInfo ){
                //convert value String to float and then round to 2 decimal places and send to frontend
                const decimalValue = (parseFloat(transactionInfo.dataValues.value).toFixed(2));
                return {
                  transactionID: transactionInfo.dataValues.transactionID,
                  userID: transactionInfo.dataValues.userID,
                  value: decimalValue,
                  date: transactionInfo.dataValues.Date,
                  businessID: transactionInfo.dataValues.businessID,
                  pocketID: transactionInfo.dataValues.pocketID,
                  changeRedeemed: transactionInfo.dataValues.changeRedeemed,
                  changeEarned: transactionInfo.dataValues.changeEarned,
                }
      
            }
            else {
              throw new ApolloError(`transactionID:${transactionID} doesn't exist`);
              return {};
            }
        },
        getAllTransactionsByBus: async (parent, { businessID, startDate, endDate }, { Transaction}) => {
          if (businessID === '') {
            return null;
          }
          if(startDate && endDate){
            //get transactions between dates
            //assume start date and end date in yyyy-mm-dd format as that is the Date format specified
            //SELECT `transaction`.* FROM `transactions` AS `transaction` WHERE `transaction`.`businessID` = '2b' AND (DATE(`transaction`.`date`) BETWEEN '2010-01-30' AND '2030-09-29') ORDER BY `date`;
            const where = { businessID: businessID,
                date: {
                  [Op.between]: [startDate, endDate]
                }
            };
            const transactionsByBusInDates = await Transaction.findAll({ 
              where: where
            })
            //need to rename the ID to transactionID and businessID to busID
            //const finalTransactionObject = (renameNestedKeys('dataValues', {'ID': 'transactionID', 'businessID': 'busID'}, transactionsByBusInDates))
            //return finalTransactionObject
            const finalTransactionObject = decimalNested(transactionsByBusInDates,'value', 'dataValues' )
            return finalTransactionObject
          }
          //else get all Transactions
          else{
            const transactionInfo = await Transaction.findAll({ where : {businessID: businessID}});
            if(transactionInfo ){
              //const transactionObj = (renameNestedKeys('dataValues', {'ID': 'transactionID', 'businessID': 'busID'}, transactionInfo))
              //return transactionObj
              const finalTransactionObject = decimalNested(transactionInfo,'value', 'dataValues' )
              return finalTransactionObject
    
            }
          }
      },
    },
  
    Mutation: {
        processTransaction: async (parent, {userID, businessID, pocketID, value, changeUsed}, { Pocket, mongoUser, Transaction, Change, IsIn, IsMemberOf}) => {
            if(userID, businessID, pocketID, value){
                //update this resolver TO-DO: people can use and earn change, just not earn change on the change they used
                //check to make sure user is in pocket
                //turn changeUsed into a float
                const changeUsing = parseFloat(changeUsed)
                const mongoUserInfo = await mongoUser.findOne({ userID })
                if(mongoUserInfo){
                    //get IsMemberOf relationship table to check that the user is in the pocket
                    const exists = await IsMemberOf.findOne({where:{userID: userID, pocketID: pocketID}})
                    //the user is in this pocket so now find out if the business is in this pocket
                    if(exists){
                        //check to make sure business is in pocket, get IsIn relationship table to check 
                        const businessPocket = await IsIn.findOne({where:{businessID:businessID, pocketID:pocketID }})
                        //get the pocketID of the business
                        var changeEarned = 0
                        if(businessPocket){
                            //get pocket Info
                            const pocketInfo = await Pocket.findOne({where:{pocketID:pocketID}})
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
                                //turn availableCHange into a float for calculations
                                const availableChange = parseFloat(userChangeInfo.dataValues.value)
                                if(changeUsing <= availableChange){
                                    //user has enough change, subtract the change
                                    var changeRedeemed = changeUsing
                                    const updatedChange = availableChange - changeUsing
                                    //update the change in Change and Pocket
                                    //change the circulating change into a float
                                    const oldChangeCirculating = parseFloat(pocketInfo.dataValues.circulatingChange)
                                    //updated change circulating is a float
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
                                const changeRate = parseFloat(pocketInfo.dataValues.changeRate)
                                changeEarned = value*(changeRate)
                                const currChange = parseFloat(userChangeInfo.dataValues.value)
                                //updatedChange is a float
                                const updatedChange = (currChange  + changeEarned)
                                const oldChangeCirculating =  parseFloat(pocketInfo.dataValues.circulatingChange)
                                //updatedChangeCirculating is a float
                                const updatedChangeCirculating = oldChangeCirculating + changeEarned
                                await updateChangeAcross(Change, Pocket, pocketID, userID, updatedChange, updatedChangeCirculating, dateOfTransaction)
                            }
                            //change is updated across
                            const newTransaction = await Transaction.create({
                                userID: userID,
                                value: value.toFixed(2),
                                businessID: busID,
                                date: dateOfTransaction,
                                pocketID: pocketID,
                                changeRedeemed: changeRedeemed,
                                changeEarned: changeEarned
                            })
                            return {
                                transactionID: newTransaction.dataValues.transactionID,
                                userID: newTransaction.dataValues.userID,
                                value: (newTransaction.dataValues.value).toFixed(2),
                                date: newTransaction.dataValues.date,
                                businessID: newTransaction.dataValues.businessID,
                                pocketID: newTransaction.dataValues.pocketID,
                                changeRedeemed: newTransaction.dataValues.changeRedeemed,
                                changeEarned: newTransaction.dataValues.changeEarned,
                              }
                        }
                        else {
                            throw new ApolloError(`Business:${businessID} is not in Pocket: ${pocketID}`);
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
              throw new ApolloError(`Not enough information about userID, businessID, pocketID` );
            }
        },
    }
  }