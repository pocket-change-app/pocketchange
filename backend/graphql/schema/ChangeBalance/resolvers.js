const { gql, ApolloError } = require('apollo-server');
const e = require('express');
const {decimalNested} = require('../../utils')

//standard for dealing with monetary values in the backend is convert your value to a float, 
//calculate, and then round and store again as a decimal in the backend
//https://stackoverflow.com/questions/224462/storing-money-in-a-decimal-column-what-precision-and-scale

module.exports = {
  Query: {
    changeBalance: async (parent, { changeBalanceID }, { ChangeBalance }) => {
        if (changeBalanceID === '') {
          return null;
        }
        const changeBalanceInfo = await ChangeBalance.findOne({ where : {changeBalanceID: changeBalanceID}});
        //comes as a string from backend due to storage of decimal places
        const {value} = changeBalanceInfo
        //convert value String to float and then round to 2 decimal places and send to frontend
        const decimalValue = (parseFloat(changeBalanceInfo.dataValues.value).toFixed(2));
        if (changeBalanceInfo) {
          return {
            changeBalanceID: changeBalanceInfo.dataValues.changeBalanceID,
            pocketID: changeBalanceInfo.dataValues.pocketID,
            value: decimalValue,
            userID:changeBalanceInfo.dataValues.userID,
            expiryDate: changeBalanceInfo.dataValues.expiryDate,
          }
        } else {
          throw new ApolloError(`changeBalanceID:${changeBalanceID} doesn't exist`);
          return {};
        }
    },
    //get the change a user has in a pocket, or a list of all the change a userID has across many pockets if pocketID is unspecified, 
    //or a list of all the change that users have in a pocket if a userID is unspecified
    getAllChangeBalances: async (parent, { userID, pocketID }, { ChangeBalance}) => {
      let filterChange = []
      //check to see if type is not null
      if (userID != null) {
        filterChange.push({'userID': userID})
      }
      //check to see if subtype is not null
      if (pocketID != null) {
        filterChange.push({'pocketID' : pocketID})
      }
      let changeBalanceInfo;
      if (filterChange.length == 0) {
        //no pocket or userID return all changeBalances
        changeBalanceInfo = await ChangeBalance.findAll({})
        return changeBalanceInfo
      } else {
        changeBalanceInfo = await ChangeBalance.findAll({ 
          where: filterChange
        })
        if(changeBalanceInfo){
          changeBalanceInfo = decimalNested(changeBalanceInfo,'value', 'dataValues' )
          return changeBalanceInfo
        }
        else{ //no change found 
          return []
        }
      }
    },
  },

  Mutation: {
    updateUserChangeBalance: async (parent, { userID, pocketID }, { ChangeBalance, Transaction, sequelizeConnection}) => {
        //SELECT `userID`, `pocketID`, SUM(`changeEarned`) AS `totalChangeEarned` FROM `transactions` AS `transaction` WHERE `transaction`.`userID` = '2c' AND `transaction`.`pocketID` = '2p' GROUP BY `userID`, `pocketID`;
        const changeEarnedPerUserPerPocket = await Transaction.findAll({ 
          attributes: ["userID", "pocketID", 
          [sequelizeConnection.fn('SUM', sequelizeConnection.col('changeEarned')), 'totalChangeEarned']
          ],
          group: ["userID", "pocketID"],
          where: {userID: userID, pocketID: pocketID}
        })
        //if the user has made transactions in the pocket earning change
        if (changeEarnedPerUserPerPocket[0]){
          //convert total change earned into a float for calculations
          const totalChangeEarned = parseFloat(changeEarnedPerUserPerPocket[0].dataValues.totalChangeEarned)
          //SELECT `userID`, `pocketID`, SUM(`changeRedeemed`) AS `totalChangeRedeemed` FROM `transactions` AS `transaction` WHERE `transaction`.`userID` = '2c' AND `transaction`.`pocketID` = '2p' GROUP BY `userID`, `pocketID`;
          const changeRedeemedPerUserPerPocket = await Transaction.findAll({ 
            attributes: ["userID", "pocketID", 
            [sequelizeConnection.fn('SUM', sequelizeConnection.col('changeRedeemed')), 'totalChangeRedeemed']
            ],
            group: ["userID", "pocketID"],
            where: {userID: userID, pocketID: pocketID}
          })
          //if the user has made transactions in the pocket redeeming change
          if (changeRedeemedPerUserPerPocket[0]){
            //convert total change redeemed into a float for calculations
            const totalChangeRedeemed =  parseFloat(changeRedeemedPerUserPerPocket[0].dataValues.totalChangeRedeemed)
            //currentChange is a float
            const currentChange = totalChangeEarned - totalChangeRedeemed
            //update the User change, if the users change for this pocket exists
            var userChangeBalance = await ChangeBalance.findOne({ where: {userID: userID,
              pocketID: pocketID}
            })
            if (userChangeBalance){
              //round currentChange to 4 decimal places and change to string for precision in the backend
              await userChangeBalance.update({value: (currentChange).toFixed(4) })
            }
            else{
              //create new userChangeBalance object since the users change for this pocket has not been calculated
              //get the date of most recent transaction
              const mostRecentDateInfo = await Transaction.findOne({ 
                where: {userID: userID, pocketID: pocketID},
                order: [ [ 'createdAt', 'DESC' ]],
              })
              const mostRecentDate = new Date(mostRecentDateInfo.dataValues.updatedAt)
              //set expiry date to 6 months after last transaction
              var expiryDate = (mostRecentDate).setMonth(mostRecentDate.getMonth() + 6)
              //store expiry date in yyyy-mm-dd format
              expiryDate= new Date(expiryDate).toISOString().slice(0, 10)
              userChangeBalance = await ChangeBalance.create({userID: userID,
                pocketID: pocketID, value: (currentChange).toFixed(4), expiryDate: expiryDate})
            }
            return{
              changeBalanceID: userChangeBalance.dataValues.changeID,
              pocketID: userChangeBalance.pocketID,
              //return currentChange to 2 decimal places for front end
              value: (currentChange).toFixed(2),
              userID:userChangeBalance.userID,
              expiryDate: userChangeBalance.expiryDate,
            }
          }
        }
        else {
          throw new ApolloError(`no change for this userID:${userID} and  pocketID:${pocketID}` );
        }
    },  
  }
}