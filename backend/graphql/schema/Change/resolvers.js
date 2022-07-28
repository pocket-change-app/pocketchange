const { gql, ApolloError } = require('apollo-server');

module.exports = {
  Query: {
    change: async (parent, { changeID }, { Change }) => {
        if (changeID === '') {
          return null;
        }
        const changeInfo = await Change.findOne({ where : {changeID: changeID}});
        if (changeInfo) {
          return {
            changeID: changeInfo.dataValues.changeID,
            pocketID: changeInfo.pocketID,
            value: Math.round((changeInfo.dataValues.value + Number.EPSILON) * 100) / 100 ,
            customerID:changeInfo.customerID,
            expiryDate: changeInfo.expiryDate,
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
          return{
            changeID: userChange.dataValues.changeID,
            pocketID: userChange.pocketID,
            value: Math.round((userChange.dataValues.value + Number.EPSILON) * 100) / 100,
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
        if (changeEarnedPerUserPerPocket[0]){
          const totalChangeEarned = changeEarnedPerUserPerPocket[0].dataValues.totalChangeEarned
          //SELECT `userID`, `pocketID`, SUM(`changeRedeemed`) AS `totalChangeRedeemed` FROM `transactions` AS `transaction` WHERE `transaction`.`userID` = '2c' AND `transaction`.`pocketID` = '2p' GROUP BY `userID`, `pocketID`;
          const changeRedeemedPerUserPerPocket = await Transaction.findAll({ 
            attributes: ["userID", "pocketID", 
            [sequelizeConnection.fn('SUM', sequelizeConnection.col('changeRedeemed')), 'totalChangeRedeemed']
            ],
            group: ["userID", "pocketID"],
            where: {userID: userID, pocketID: pocketID}
          })
          if (changeRedeemedPerUserPerPocket[0]){
            const totalChangeRedeemed =  changeRedeemedPerUserPerPocket[0].dataValues.totalChangeRedeemed
            const currentChange = totalChangeEarned - totalChangeRedeemed
            //update the User change, if the users change for this pocket exists
            var userChange = await Change.findOne({ where: {userID: userID,
              pocketID: pocketID}
            })
            if (userChange){
              await userChange.update({value: Math.round((currentChange+ Number.EPSILON) * 100) / 100 })
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
                pocketID: pocketID, value: Math.round((currentChange+ Number.EPSILON) * 100) / 100, expiryDate: expiryDate})
            }
            return{
              changeID: userChange.dataValues.changeID,
              pocketID: userChange.pocketID,
              value: userChange.value,
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