const gql = require('graphql-tag')

module.exports = gql`
    """
    Pocket, representative of a geo-based loyalty network
    """
    type Pocket {
      pocketID: ID 
      pocketName: String
      region: String
      changeRate: Decimal
      circulatingChange: Decimal
      status: Status
    }


    type Status{
        pending: Boolean
        approved: Boolean
        deactivated: Boolean
      }

    type Query {
        """
        Query a specific Pocket from it's ID
        """
        pocket(pocketID:ID):Pocket
        getAllPockets(userID:ID): [Pocket]
        getBusinessPockets(businessID: ID): [Pocket]
    }

    type Mutation {
        """
        Calculate the circulating change in a pocket
        """
        calculatePocketChange(pocketID: ID):Pocket
        createPocket(userID:ID , pocketID:ID, pocketName: String, region: String, managerID:ID): Pocket
        updatePocket(userID:ID , pocketID:ID, pocketName: String, region: String): Pocket
        updatePocketManager(userID: ID, pocketID: ID, managerID: ID) : Pocket
        joinPocketAsMember(userID:ID , pocketID:ID): Pocket
        joinPocketAsBusiness(userID:ID , pocketID:ID, businessID:ID): Pocket
        deactivatePocket(userID: ID, pocketID: ID): Pocket
        approvePocket(userID: ID, pocketID: ID): Pocket
    }
`