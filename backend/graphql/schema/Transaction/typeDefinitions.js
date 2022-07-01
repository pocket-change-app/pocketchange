const gql = require('graphql-tag')

module.exports = gql`
    """
    Transaction, occurs when a user purchases an item from a business for a specific value and change is either redeemed or earned
    """
    type Transaction {
      transactionID: ID 
      userID: ID
      value: Decimal
      date: Date
      busID: ID
      pocketID: ID
      changeRedeemed: Decimal
      changeEarned: Decimal
    }

    type Query {
        """
        Query a specific Transaction from it's ID
        """
        transaction(transactionID:ID):Transaction
    }

    type Mutation {
        """
        Process a new transaction, where a user is either using up the change they have or earning change
        """
        processTransaction(userID: ID, busID: ID, pocketID: ID, value: Decimal, changeUsed: Decimal):Transaction
    }
`