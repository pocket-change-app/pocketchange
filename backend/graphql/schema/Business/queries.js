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
      }
    }
  `,
  getAllBusinesses: gql`
    query getAllBusinesses($pocketID: ID, $type: String, $subtype: String, $tag: String) {
      getAllBusinesses(businessID: $businessID, type: $type, subtype: $subtype, tag: $tag) {
          businessID
          businessName
          dateEstablished
          emailAddress
          phoneNumber
          website
          businessType
          businessSubtype
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
        }
    }
  `,
  getNearbyBusinesses: gql`
    query getNearbyBusinesses($lat: Float, $long: Float, $radius: Float) {
      getNearbyBusinesses(lat: $lat, long: $long, radius: $radius) {
          businessID
          businessName
          dateEstablished
          emailAddress
          phoneNumber
          website
          businessType
          businessSubtype
        }
    }
  `,

}