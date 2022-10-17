const gql = require('graphql-tag')

module.exports = gql`
    """
    Contest, associated with a Pocket
    """
    type Contest {
      contestID: ID
      pocketID: ID
      prizeValue: Decimal
      startDate: Date
      endDate: Date
      contestName: String
      description: String
      status:Status
      winner: String
    }

    type Status{
        pending: Boolean
        approved: Boolean
        deactivated: Boolean
    }

    type Query {
        """
        Query a specific contest from it's ID
        """
        contest(contestID: ID): Contest
      }
      type Mutation {
        """
        Create a new contest
        """
        createContest(userID: ID, pocketID: ID, prizeValue: Decimal, startDate: Date, endDate: Date, contestName: String, description: String): Contest
        deactivateContest(userID:ID, contestID:ID, pocketID: ID): Contest
        approveContest(userID:ID, contestID:ID, pocketID: ID): Contest
      }
`