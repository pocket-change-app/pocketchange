const { Decimal128 } = require('mongodb')
const R = require('ramda')
const {Op} = require('sequelize');

//getAllChange(businessID:ID, userID:ID, pocketID:ID, startDate: Date, endDate: Date, earned: Boolean): ChangeFlow
   

module.exports = async function returnAllChange (
    { userID, pocketID, businessID, startDate, endDate, earned }, { Transaction, sequelizeConnection}
) {
  try {
    let filterTransactions = []
    //check if dates specified
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
    const column = earned? 'changeEarned' : 'changeRedeemed'
    const newColumnName = earned? 'totalChangeEarned' : 'totalChangeRedeemed'
    let changeFlowInfo;
    if (filterTransactions.length == 0) {
      //return sum of all change across all transactions in all businesses in all pockets
      changeFlowInfo = await Transaction.findAll({ 
        attributes: [
        [sequelizeConnection.fn('SUM', sequelizeConnection.col(column)), newColumnName]
        ],
      })
      if(changeFlowInfo){
        if(earned){
            return changeFlowInfo[0].dataValues.totalChangeEarned
        }
        else{
            return changeFlowInfo[0].dataValues.totalChangeRedeemed
        }
      }
      else{ //no transactions found 
        return null
    }
    } else {
        //return conditional sum of all change across all transactions
        changeFlowInfo = await Transaction.findAll({ 
            attributes: [
            [sequelizeConnection.fn('SUM', sequelizeConnection.col(column)), newColumnName]
            ],
            where: filterTransactions
        })
        if(changeFlowInfo){
            if(earned){
                return changeFlowInfo[0].dataValues.totalChangeEarned
            }
            else{
                return changeFlowInfo[0].dataValues.totalChangeRedeemed
            }
          }
        else{ //no transactions found 
            return null
        }
    }
  }
  catch (error) {
    console.log('returnAllChange', error)
  }
}
