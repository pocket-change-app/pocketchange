const gql = require('graphql-tag')

module.exports = gql`
    """
    Change, associated with a user for a specific Pocket
    """
    type Change {
      changeID: ID 
      pocketID: ID
      value: Decimal
      userID: ID
      expiryDate: Date
    }
    
    type Query {
        """
        Query a users change by ID
        """
        change(changeID: ID) :Change
        """
        Query a users change in a given Pocket
        """
        getUserChange(userID: ID, pocketID: ID):Change
      }
      type Mutation {
        """
        Calculate a users change in a given pocket
        """
        calculateUserChange(userID: ID, pocketID: ID):Change
      }
`