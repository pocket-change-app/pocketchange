const gql = require('graphql-tag')

module.exports = gql`
    """
    Transaction, occurs when a user purchases an item from a business for a specific value and change is either redeemed or earned
    """
    type Transaction {
      transactionID: ID 
      consumerID: ID
      merchantID: ID
      value: Decimal
      date: Date
      businessID: ID
      pocketID: ID
      changeRedeemed: Decimal
      changeEarned: Decimal
      refunded: Boolean
      refundedValue: Decimal
      refundDate: Date
      changeEarnedBeforeRefund: Decimal
      changeRedeemedBeforeRefund: Decimal
    }

    """
    Either a summary of change redeemed or earned across dates if specified
    """
    type ChangeFlow {
        value: Decimal
    }

    type Query {
        """
        Query a specific Transaction from it's ID
        """
        transaction(transactionID:ID): Transaction
        """
        Query all Transactions given a businessID, between certain dates
        """
        getAllTransactions(businessID:ID, pocketID:ID, consumerID:ID, merchantID:ID, startDate: Date, endDate: Date): [Transaction]
        getAllChange(businessID:ID, consumerID:ID, pocketID:ID, startDate: Date, endDate: Date, earned: Boolean): ChangeFlow
    }

    type Mutation {
        """
        Process a new transaction, where a user is either using up the change they have or earning change
        """
        processTransaction(consumerID: ID, merchantID: ID, businessID: ID, pocketID: ID, value: Decimal, changeUsed: Decimal): Transaction
        refundTransaction(transactionID: ID, refundValue: Decimal): Transaction
    }
`