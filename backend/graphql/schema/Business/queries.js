import gql from 'graphql-tag'

export default {
  business: gql`
    query business($businessID: ID) {
      business(businessID: $businessID) {
        businessID
        businessName
        dateEstablished
        emailAddress
        phoneNumber
        website
        businessType
        businessSubtype
        description
        latitude
        longitude
        businessTags
        stripeID
        description
        deactivated
      }
    }
  `,
  getAllBusinesses: gql`
    query getAllBusinesses($pocketID: ID, $businessType: String, $businessSubtype: String, $businessTag: String) {
      getAllBusinesses(pocketID: $pocketID, businessType: $businessType, businessSubtype: $businessSubtype, businessTag: $businessTag) {
        businessID
        businessName
        dateEstablished
        emailAddress
        phoneNumber
        website
        businessType
        businessSubtype
        description
        latitude
        longitude
        businessTags
        stripeID
        description
        deactivated
        }
    }
  `,
  getLovedBusinessesByUser: gql`
    query getLovedBusinessesByUser($userID: ID) {
      getLovedBusinessesByUser(userID: $userID) {
        businessID
        businessName
        dateEstablished
        emailAddress
        phoneNumber
        website
        businessType
        businessSubtype
        description
        latitude
        longitude
        businessTags
        stripeID
        description
        deactivated
        }
    }
  `,
  getNearbyBusinesses: gql`
    query getNearbyBusinesses($latitude: Float, $longitude: Float, $radius: Float) {
      getNearbyBusinesses(latitude: $latitude, longitude: $longitude, radius: $radius) {
        businessID
        businessName
        dateEstablished
        emailAddress
        phoneNumber
        website
        businessType
        businessSubtype
        description
        latitude
        longitude
        businessTags
        stripeID
        description
        deactivated
        }
    }
  `,
  getSimilarBusinesses: gql`
    query getSimilarBusinesses($businessID: ID, $businessNumber: Int, $startDate: Date, $endDate: Date) {
      getSimilarBusinesses(businessID: $businessID, businessNumber: $businessNumber,startDate: $startDate, endDate: $endDate ) {
        businessID
        businessName
        dateEstablished
        emailAddress
        phoneNumber
        website
        businessType
        businessSubtype
        description
        latitude
        longitude
        businessTags
        stripeID
        description
        deactivated
        }
    }
  `,

}