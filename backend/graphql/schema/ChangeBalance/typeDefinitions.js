const gql = require('graphql-tag')

module.exports = gql`
    """
    ChangeBalance, associated with a user for a specific Pocket
    """
    type ChangeBalance {
      changeBalanceID: ID 
      pocketID: ID
      value: Decimal
      userID: ID
      expiryDate: Date
    }
    
    type Query {
        """
        Query a users changeBalance by ID
        """
        changeBalance(changeBalanceID: ID) :ChangeBalance
        """
        Query a users changeBalance in a given Pocket
        """
        getAllChangeBalances(userID: ID, pocketID: ID): [ChangeBalance]
      }
      type Mutation {
        """
        Calculate a users changeBalance in a given pocket and update the value
        """
        updateUserChangeBalance(userID: ID, pocketID: ID):ChangeBalance
      }
`