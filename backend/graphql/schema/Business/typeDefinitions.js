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
      latitude: Float
      longitude: Float
      address: Address
      businessTags: [String]
      stripeID: ID
      description: String
      deactivated: Boolean
    }
    
    type Address{
      streetName: String,
      buildingNumber: String,
      unitNumber: String,
      city: String,
      region: String,
      postalCode: String,
    }


    input AddressInput{
      streetName: String,
      buildingNumber: String,
      unitNumber: String,
      city: String,
      region: String,
      postalCode: String,
    }

    type Query {
        """
        Query a specific business from it's ID
        """
        business(businessID: ID): Business
        getAllBusinesses(pocketID: ID, businessType: String, businessSubtype: String, businessTag: String): [Business]
        getLovedBusinessesByUser(userID: ID): [Business]
        getNearbyBusinesses(latitude: Float, longitude: Float, radius: Float): [Business]
        getSimilarBusinesses(businessID:ID, businessNumber: Int, startDate: Date, endDate: Date): [Business]
      }
      type Mutation {
        """
        Create a new business profile for a business on pocketchange
        """
        createBusiness(userID: ID, ownerID: ID, businessName: String, dateEstablished: String, emailAddress: String, phoneNumber: String, website: String, businessType: String, businessSubtype: String, pocketID:ID, address: AddressInput, latitude: Float, longitude: Float, businessTags: [String], stripeID: ID, description: String): Business
        updateBusiness(userID: ID, businessName: String, dateEstablished: String, emailAddress: String, phoneNumber: String, website: String, businessType: String, businessSubtype: String, pocketID:ID, address: AddressInput, latitude: Float, longitude: Float, businessTags: [String], stripeID: ID, description: String): Business
        updateBusinessOwner(userID: ID, businessID: ID, ownerID: ID) : Business
        deactivateBusiness(userID:ID, businessID:ID): Business
      }
`