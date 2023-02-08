const gql = require('graphql-tag')

module.exports = gql`

  """
  Account, a holder of money.
  """
  type Account {
    accountID: ID 
    ownerID: ID
    balance: Decimal
    currencyType: CurrencyType
    pocketID: ID
    lastUpdated: Date
  }

  enum CurrencyType {
    FIAT
    CHANGE_POCKET
  }
  
  type Query {
    """
    Query an Account by ID
    """
    account(accountID: ID): Account
    """
    Query a users Accounts
    """
    getAccountsByUser(customerID: ID, currencyType: CurrencyType): [Account]
    """
    Query a users Change Account in a specific pocket
    """
    getChangeAccount(customerID: ID, pocketID: ID): Account
  }

  type Mutation {
    """
    Update an Account's balance using the Ledger table
    """
    updateAccount(accountID: ID): Account
  }
`