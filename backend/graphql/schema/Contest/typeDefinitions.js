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
      winners: [String]
    }

    type Entry{
      contestID: ID
      QRScanID: ID
      userID: ID
      businessID: ID
      geolocationID: ID
      date: Date
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
        getAllEntries(contestID: ID, userID: ID): [Entry]
      }
      type Mutation {
        """
        Create a new contest
        """
        createContest(userID: ID, pocketID: ID, prizeValue: Decimal, startDate: Date, endDate: Date, contestName: String, description: String): Contest
        deactivateContest(userID:ID, contestID:ID, pocketID: ID): Contest
        approveContest(userID:ID, contestID:ID, pocketID: ID): Contest
        chooseWinningEntries(contestID: ID, userID: ID, winnerNumber: Int): [Entry]
        editContest(userID:ID, contestID:ID, contestName: String, description: String): Contest
      }
`