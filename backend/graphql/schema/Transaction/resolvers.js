const { gql, ApolloError } = require('apollo-server');
const R = require('ramda');
const { Business } = require('../../../database_schemas/SQLSchema/db');
const {Op} = require('sequelize');
const {decimalNested} = require('../../utils')
const returnAllChange = require('../helpers/returnAllChange')


//standard for dealing with monetary values in the backend is convert your value to a float, 
//calculate, and then round and store again as a decimal in the backend
//https://stackoverflow.com/questions/224462/storing-money-in-a-decimal-column-what-precision-and-scale


const updateChangeAcross = async(ChangeBalance, Pocket, pocketID, userID, updatedChange, updatedChangeCirculating, dateOfTransaction) => {
    transactionDate = new Date(dateOfTransaction)
    let expiryDate = (transactionDate).setMonth(transactionDate.getMonth() + 6)
    //store expiry date in yyyy-mm-dd format
    expiryDate= new Date(expiryDate).toISOString().slice(0, 10)
    //update all change assuming values are floats and cast them to 4 decimal place strings
    await ChangeBalance.update({
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
                  refunded: transactionInfo.dataValues.refunded,
                  refundDate: transactionInfo.dataValues.refundDate,
                  changeEarnedBeforeRefund: transactionInfo.dataValues.changeEarnedBeforeRefund,
                  changeRedeemedBeforeRefund: transactionInfo.dataValues.changeRedeemedBeforeRefund,
                }
      
            }
            else {
              throw new ApolloError(`transactionID:${transactionID} doesn't exist`);
            }
        },
        getAllTransactions: async (parent, { businessID, pocketID, userID, startDate, endDate }, { Transaction}) => {
          let filterTransactions = []
          if(startDate && endDate){
            filterTransactions.push({date: {
              [Op.between]: [startDate, endDate]
            }})
          }
          //check to see if type is not null
          if (userID != null) {
            filterTransactions.push({'userID': userID})
          }
          //check to see if pocketID is not null
          if (pocketID != null) {
            filterTransactions.push({'pocketID' : pocketID})
          }
          //check to see if businessID is not null
          if (businessID != null) {
            filterTransactions.push({'businessID' : businessID})
          }
          let transactionInfo;
          if (filterTransactions.length == 0) {
            //no filters specified get all
            transactionInfo = await Transaction.findAll({})
            if(transactionInfo){
              const finalTransactionObject = decimalNested(transactionInfo,'value', 'dataValues' )
              return finalTransactionObject
            }
            else{
              return []
            }
          } 
          else {
            //filters specified
            transactionInfo = await Transaction.findAll({ 
              where: filterTransactions,
            })
            if(transactionInfo){
              transactionInfo = decimalNested(transactionInfo,'value', 'dataValues' )
              return transactionInfo
            }
            else{ //no transactions found 
              return []
            }
          }
      },
      getAllChange: async (parent, { businessID, pocketID, userID, startDate, endDate, earned }, { Transaction, sequelizeConnection}) => {
        const value = await returnAllChange (
          { userID: userID, pocketID:pocketID, businessID:businessID, startDate:startDate, endDate:endDate, earned: earned }, { Transaction, sequelizeConnection}
      )
        return {value: value}
      },
    },
  
    Mutation: {
        processTransaction: async (parent, {userID, businessID, pocketID, value, changeUsed}, { Pocket, mongoUser, Transaction, ChangeBalance, IsIn, IsMember}) => {
            if(userID, businessID, pocketID, value){
                //check to make sure user is in pocket
                //turn changeUsed into a float
                const changeUsing = parseFloat(changeUsed)
                const mongoUserInfo = await mongoUser.findOne({ userID })
                if(mongoUserInfo){
                    //get IsMember relationship table to check that the user is in the pocket
                    const exists = await IsMember.findOne({where:{userID: userID, pocketID: pocketID}})
                    //if the user is in this pocket find out if the business is in this pocket
                    if(!exists){
                      //add user to the pocket
                      await IsMember.create({userID: userID, pocketID:pocketID, role:'customer'})
                    }
                        //check to make sure business is in pocket, get IsIn relationship table to check 
                        const businessPocket = await IsIn.findOne({where:{businessID:businessID, pocketID:pocketID }})
                        //get the pocketID of the business
                        let changeEarned = 0
                        if(businessPocket){
                            //get pocket Info
                            const pocketInfo = await Pocket.findOne({where:{pocketID:pocketID}})
                            //get change info
                            const userChangeInfo = await ChangeBalance.findOne({where:{
                                userID: userID,
                                pocketID: pocketID}
                              })
                            //get date 
                            const dateOfTransaction = new Date().toISOString().slice(0, 10)
                            //business is in the pocket, so now check if change is used
                            let changeEarningValue = parseFloat(value)
                            let changeRedeemed = 0
                            if(changeUsing >0.00){
                                //subtract change from users change in SQL and from pockets circulating change
                                //check to make sure user has enough change
                                //turn availableCHange into a float for calculations
                                const availableChange = parseFloat(userChangeInfo.dataValues.value)
                                if(changeUsing <= availableChange){
                                    //user has enough change, subtract the change
                                    changeRedeemed = changeUsing
                                    const updatedChange = availableChange - changeUsing
                                    //update the change in Change and Pocket
                                    //change the circulating change into a float
                                    const oldChangeCirculating = parseFloat(pocketInfo.dataValues.circulatingChange)
                                    //updated change circulating is a float
                                    const updatedChangeCirculating = oldChangeCirculating - changeRedeemed
                                    await updateChangeAcross(Change, Pocket, pocketID, userID, updatedChange, updatedChangeCirculating, dateOfTransaction)
                                    //the value the user can earn change on is now the value of the good minus the change used
                                    changeEarningValue = value - parseFloat(changeUsing)
                                }
                                else {
                                    throw new ApolloError(`User:${userID} has insufficient change in Pocket: ${pocketID}`);
                                }
                            }
                            if(changeEarningValue > 0.00){
                              //there is still value to be earned change on
                              //get pocket info to calculate rate of change, change is earned
                              const changeRate = parseFloat(pocketInfo.dataValues.changeRate)
                              changeEarned = changeEarningValue*(changeRate)
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
                                value: parseFloat(value).toFixed(4),
                                businessID: businessID,
                                date: dateOfTransaction,
                                pocketID: pocketID,
                                changeRedeemed: changeRedeemed,
                                changeEarned: changeEarned,
                                refunded: false,
                                refundDate: null,
                                changeRedeemedBeforeRefund: null,
                                changeEarnedBeforeRefund: null,
                            })
                            return {
                                transactionID: newTransaction.dataValues.transactionID,
                                userID: newTransaction.dataValues.userID,
                                value: parseFloat(newTransaction.dataValues.value).toFixed(2),
                                date: newTransaction.dataValues.date,
                                businessID: newTransaction.dataValues.businessID,
                                pocketID: newTransaction.dataValues.pocketID,
                                changeRedeemed: newTransaction.dataValues.changeRedeemed,
                                changeEarned: newTransaction.dataValues.changeEarned,
                                refunded: newTransaction.dataValues.refunded,
                                refundDate: newTransaction.dataValues.refundDate,
                                changeRedeemedBeforeRefund: newTransaction.dataValues.changeRedeemedBeforeRefund,
                                changeEarnedBeforeRefund: newTransaction.dataValues.changeEarnedBeforeRefund,
                              }
                        }
                        else {
                            throw new ApolloError(`Business:${businessID} is not in Pocket: ${pocketID}`);
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
        refundTransaction: async (parent, {userID, businessID, pocketID, date, refundValue}, { Pocket, mongoUser, Transaction, ChangeBalance, IsIn}) => {
          if(userID, businessID, pocketID, value){
              //check to make sure the transaction exists
              const transactionInfo = await Transaction.findOne({
                where:{
                  userID: userID, 
                  pocketID: pocketID, 
                  businessID: businessID,
                  date: date,
                }
              })
              let finalRefundValue = refundValue
              if(transactionInfo){
                //the transaction exists, so make sure the refundedValue is less than the value of the transaction
                if(transactionInfo.dataValues.value <= finalRefundValue){
                  //valid refund
                  //get the current date
                  const transactionRefundDate = new Date().toISOString()
                  //work out the new change
                  const changeEarnedBeforeRefund = transactionInfo.dataValues.changeEarned
                  const newChangeEarned = 0
                  //get change info
                  const userChangeInfo = await ChangeBalance.findOne({where:{
                    userID: userID,
                    pocketID: pocketID}
                  })
                  //check to see if user redeemed change on the refunded transaction
                  const changeRedeemedBeforeRefund = transactionInfo.dataValues.changeRedeemed
                  const newChangeRedeemed = transactionInfo.dataValues.changeRedeemed
                  if(changeRedeemedBeforeRefund > 0){
                    //the user gets redeemed change back first
                    const changeAddedBack = changeRedeemedBeforeRefund 
                    newChangeRedeemed = 0
                    await transactionInfo.update({
                      changeRedeemed: parseFloat(0).toFixed(4),
                      changeRedeemedBeforeRefund: changeRedeemedBeforeRefund
                    })
                    finalRefundValue = refundValue - changeRedeemedBeforeRefund
                    //update change across 
                    const currChange = parseFloat(userChangeInfo.dataValues.value)
                    //updatedChange is a float
                    const updatedChange = (currChange  + changeAddedBack)
                    const oldChangeCirculating =  parseFloat(pocketInfo.dataValues.circulatingChange)
                    //updatedChangeCirculating is a float
                    const updatedChangeCirculating = oldChangeCirculating + newChangeEarned
                    await updateChangeAcross(Change, Pocket, pocketID, userID, updatedChange, updatedChangeCirculating, transactionRefundDate)
                  }
                  newChangeEarned = changeEarnedBeforeRefund + finalRefundValue 
                  await transactionInfo.update({
                    changeEarned: parseFloat(newChange).toFixed(4),
                    changeEarnedBeforeRefund: changeEarnedBeforeRefund,
                  })
                  const currChange = parseFloat(userChangeInfo.dataValues.value)
                  //updatedChange is a float
                  const updatedChange = (currChange  + newChangeEarned)
                  const oldChangeCirculating =  parseFloat(pocketInfo.dataValues.circulatingChange)
                  //updatedChangeCirculating is a float
                  const updatedChangeCirculating = oldChangeCirculating + newChangeEarned
                  await updateChangeAcross(Change, Pocket, pocketID, userID, updatedChange, updatedChangeCirculating, transactionRefundDate)
                  await transactionInfo.save()
                  //time to update the values of the transaction
                  await transactionInfo.update({
                    changeEarned: newChangeEarned,
                    changeRedeemed: newChangeRedeemed,
                    refunded: true, 
                    refundedValue: finalRefundValue,
                    refundDate: transactionRefundDate,
                    changeRedeemedBeforeRefund: transactionInfo.dataValues.changeRedeemedBeforeRefund,
                    changeEarnedBeforeRefund: transactionInfo.dataValues.changeEarnedBeforeRefund,
                   })
                }
                else {
                  throw new ApolloError(`Refunding more than value of transaction is invalid,refund : ${refundValue}, transactionValue: ${transactionInfo.dataValues.value}} `);
                }
              }
              else {
                throw new ApolloError(`Transaction with user:${userID}, business: ${businessID}, date:${date}, pocket:${pocketID} doesn't exist  `);
              }
             }
        },
        //processWin transaction (need to let businessID allow Null?)
      }
  }