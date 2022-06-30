const gql = require('graphql-tag')

module.exports = gql`
    """
    Pocket, representative of a geo-based loyalty network
    """
    type Pocket {
      pocketID: ID 
      pocketName: String
      customers: [ID]
      businesses: [ID]
      changeRate: Decimal
      circulatingChange: Decimal
    }

    type Query {
        """
        Query a specific Pocket from it's ID
        """
        pocket(pocketID:ID):Pocket
    }

    type Mutation {
        """
        Calculate the circulating change in a pocket
        """
        calculatePocketChange(pocketID: ID):Pocket
    }
`