const gql = require('graphql-tag')

module.exports = gql`
    """
    Business, associated with a Pocket
    """
    type Business {
      businessID: ID
      businessName: String
      dateEstablished: Date
      emailAddress: String
      phoneNumber: String
      website: String
      businessType: String
      businessSubtype: String
    }
    type Query {
        """
        Query a specific business from it's ID
        """
        business(businessID: ID): Business
      }
      type Mutation {
        """
        Create a new business profile for a business on pocketchange
        """
        registerBus(userID: ID, businessName: String, dateEstablished: String, emailAddress String, phoneNumber: String, website: String, businessType: String, businessSubtype: String, pocketID:ID) : Business
      }
`