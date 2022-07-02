const gql = require('graphql-tag')

module.exports = gql`
    """
    PocketManager, manages a Pocket
    """
    type PocketManager {
        managerID: ID
        name: String
        managername: String
        pocketID: ID
        emailAddress: String
    }
    type Query {
        """
        Query a specific PocketManager from their ID
        """
        pocketManager(managerID: ID): PocketManager
        """
        Login as a pocket manager to the pocketmanager side of the app
        """
        loginManager(managerID:String, password:String):PocketManager
      }
      type Mutation {
        """
        Create a new pocket manager profile for a pocket on pocketchange
        """
        registerManager(managername: String, password: String, pocketID:String): PocketManager
      }
`