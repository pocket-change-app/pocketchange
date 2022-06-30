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
        calculatePocketChange: async (parent, {pocketID }, { Pocket, Transaction, mongoPocket, sequelizeConnection}) => {
            //SELECT `pocketID`, SUM(`changeEarned`) AS `totalChangeEarned` FROM `transactions` AS `transaction` WHERE `transaction`.`pocketID` = '2p' GROUP BY `pocketID`;
            //console.log(pocketID)
            const changeEarnedPerPocket = await Transaction.findAll({ 
              attributes: ["pocketID", 
              [sequelizeConnection.fn('SUM', sequelizeConnection.col('changeEarned')), 'totalChangeEarned']
              ],
              group: ["pocketID"],
              where: {pocketID: pocketID}
            })
            if (changeEarnedPerPocket[0]){
              const totalChangeEarned = changeEarnedPerPocket[0].dataValues.totalChangeEarned
              //onsole.log("change earned", totalChangeEarned)
              //SELECT `userID`, `pocketID`, SUM(`changeRedeemed`) AS `totalChangeRedeemed` FROM `transactions` AS `transaction` WHERE `transaction`.`userID` = '2c' AND `transaction`.`pocketID` = '2p' GROUP BY `userID`, `pocketID`;
              const changeRedeemedPerPocket = await Transaction.findAll({ 
                attributes: ["pocketID", 
                [sequelizeConnection.fn('SUM', sequelizeConnection.col('changeRedeemed')), 'totalChangeRedeemed']
                ],
                group: ["pocketID"],
                where: {pocketID: pocketID}
              })
              if (changeRedeemedPerPocket[0]){
                const totalChangeRedeemed =  changeRedeemedPerPocket[0].dataValues.totalChangeRedeemed
                //console.log("change redeemed", totalChangeRedeemed)
                const currentChange = totalChangeEarned - totalChangeRedeemed
               //console.log("CUR CHANGE", currentChange)
                //update the Pocket circulating change
                const pocketChange = await Pocket.findOne({ where: {ID: pocketID}})
                const mongoPocketInfo = await mongoPocket.findOne({ pocketID })
                if (pocketChange && mongoPocketInfo){
                  await pocketChange.update({circulatingChange: currentChange})
                  return{
                    "pocketID": pocketChange.dataValues.ID,
                    "circulatingChange": (pocketChange.dataValues.circulatingChange).toFixed(2),
                    "changeRate": pocketChange.dataValues.changeRate,
                    "customers": mongoPocketInfo.customers,
                    "businesses": mongoPocketInfo.businesses,
                    "pocketName" : mongoPocketInfo.pocketname
                  }
                }
              }
            }
            else {
              throw new ApolloError(`no change for this userID:${userID} and  pocketID:${pocketID}` );
            }
        },
    }
  }