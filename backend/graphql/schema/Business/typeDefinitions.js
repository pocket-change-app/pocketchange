const gql = require('graphql-tag')

module.exports = gql`
    """
    Business, associated with a Pocket
    """
    type Business {
        busID: ID 
        pocketID: ID
        busname: String
        dateEstablished: Date
        emailAddress: String
        role: String
    }
    type Query {
        """
        Query a specific business from it's ID
        """
        business(busID: ID): Business
        """
        Login as a business owner to the business side of the app
        """
        loginBus(busname:String, password:String):Business
      }
      type Mutation {
        """
        Create a new business profile for a business on pocketchange
        """
        registerBus(busname: String, password: String, pocketID:String): Business
      }
`