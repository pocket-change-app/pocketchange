const { gql, ApolloError } = require('apollo-server');

//standard for dealing with monetary values in the backend is convert your value to a float, 
//calculate, and then round and store again as a decimal in the backend
//https://stackoverflow.com/questions/224462/storing-money-in-a-decimal-column-what-precision-and-scale

module.exports = {
  Query: {
    change: async (parent, { changeID }, { Change }) => {
        if (changeID === '') {
          return null;
        }
        const changeInfo = await Change.findOne({ where : {changeID: changeID}});
        //comes as a string from backend due to storage of decimal places
        const {value} = changeInfo
        //convert value String to float and then round to 2 decimal places and send to frontend
        const decimalValue = (parseFloat(changeInfo.dataValues.value).toFixed(2));
        if (changeInfo) {
          return {
            changeID: changeInfo.dataValues.changeID,
            pocketID: changeInfo.dataValues.pocketID,
            value: decimalValue,
            userID:changeInfo.dataValues.userID,
            expiryDate: changeInfo.dataValues.expiryDate,
          }
        } else {
          throw new ApolloError(`changeID:${changeID} doesn't exist`);
          return {};
        }
    },
    getUserChange: async (parent, { userID, pocketID }, { Change}) => {
        const userChange = await Change.findOne({where:{
          userID: userID,
          pocketID: pocketID}
        })
        if (userChange){
          //convert value String to float and then round to 2 decimal places and send to frontend
          const decimalValue = (parseFloat(userChange.dataValues.value).toFixed(2));
          return{
            changeID: userChange.dataValues.changeID,
            pocketID: userChange.pocketID,
            value: decimalValue,
            userID:userChange.userID,
            expiryDate: userChange.expiryDate,
          }
        }
        else {
          throw new ApolloError(`user:${userID} doesn't have change in this pocket` );
        }
    },
  },

  Mutation: {
    calculateUserChange: async (parent, { userID, pocketID }, { Change, Transaction, sequelizeConnection}) => {
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
            var userChange = await Change.findOne({ where: {userID: userID,
              pocketID: pocketID}
            })
            if (userChange){
              //round currentChange to 4 decimal places and change to string for precision in the backend
              await userChange.update({value: (currentChange).toFixed(4) })
            }
            else{
              //create new userChange object since the users change for this pocket has not been calculated
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
              userChange = await Change.create({userID: userID,
                pocketID: pocketID, value: (currentChange).toFixed(4), expiryDate: expiryDate})
            }
            return{
              changeID: userChange.dataValues.changeID,
              pocketID: userChange.pocketID,
              //return currentChange to 2 decimal places for front end
              value: (currentChange).toFixed(2),
              userID:userChange.userID,
              expiryDate: userChange.expiryDate,
            }
          }
        }
        else {
          throw new ApolloError(`no change for this userID:${userID} and  pocketID:${pocketID}` );
        }
    },  
  }
}