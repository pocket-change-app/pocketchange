const gql = require('graphql-tag')

module.exports = gql`
    """
    Competition, associated with a Pocket
    """
    type Competition {
      competitionID: ID
      pocketID: ID
      prizeValue: Decimal
      startDate: Date
      endDate: Date
      competitionName: String
      description: String
      status:Status
    }

    type Status{
        pending: Boolean
        approved: Boolean
        deactivated: Boolean
    }

    type Query {
        """
        Query a specific competition from it's ID
        """
        competition(competitionID: ID): Competition
      }
      type Mutation {
        """
        Create a new competition
        """
        createCompetition(userID: ID, pocketID: ID, prizeValue: Decimal, startDate: Date, endDate: Date, competitionName: String, description: String): Competition
        deactivateCompetition(userID:ID, competitionID:ID, pocketID: ID): Competition
        approveCompetition(userID:ID, competitionID:ID, pocketID: ID): Competition
      }
`