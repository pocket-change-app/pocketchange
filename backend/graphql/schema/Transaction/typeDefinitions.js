const gql = require('graphql-tag')

module.exports = gql`
    """
    Transaction, occurs when a user purchases an item from a business for a specific value and change is either redeemed or earned
    """

    enum TransactionInitiationType {
        CUSTOMER_INITIATED
        MERCHANT_INITIATED
    }

    enum TransactionType {
        PURCHASE
        REFUND
        LOAD_CUSTOMER_WALLET
        LOAD_POCKET_WALLET
    }

    type Transaction {
      transactionID: ID 
      stripeTransactionID: ID
      senderID: ID
      recipientID: ID
      pocketID: ID
      initiatorID: ID
      initiationType: TransactionInitiationType
      transactionType: TransactionType
      refundReference: ID
      sutotal: Decimal
      tip: Decimal
      fee: Decimal
      total: Decimal
      timestamp: Date
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
        transaction(transactionID: ID): Transaction


        getTransactionByStripeID(stripeTransactionID: ID): Transaction
        
        getRefundTransactionByPurchaseTransactionID(purchaseID: ID): Transaction
        getPurchaseTransactionByRefundTransactionID(refundID: ID): Transaction

        """
        Query all Transactions given a businessID, between certain dates
        """
        getAllTransactions(senderID: ID, recipientID: ID, pocketID: ID, initiatorID: ID, initiationType: TransactionInitiationType, transactionType: TransactionType, startDate: Date, endDate: Date): [Transaction]
        getAllChange(customerID: ID, businessID: ID, pocketID: ID, startDate: Date, endDate: Date, earned: Boolean): ChangeFlow
    }
    type Mutation {
        """
        Process a new transaction, where a user is either using up the change they have or earning change
        """
        purchase(stripeTransactionID: ID, customerID: ID, businessID: ID, pocketID: ID, initiatorID: ID, initiationType: TransactionInitiationType, subtotal: Decimal, tip: Decimal, fee: Decimal, changeRedeemed: Decimal): Transaction
        refund(stripeTransactionID: ID, customerID: ID, businessID: ID, pocketID: ID, initiatorID: ID, initiationType: TransactionInitiationType, refundReference: ID): Transaction
        loadCustomerWallet(stripeTransactionID: ID, customerID: ID, subtotal: Decimal, fee: Decimal): Transaction
        loadPocketWallet(stripeTransactionID: ID, leaderID: ID, pocketID: ID, subtotal: Decimal, fee: Decimal): Transaction
    }
`