import gql from 'graphql-tag'

export default {
    Business: gql`
        query Business($businessID: ID){
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
`
//getBusinessPockets
//getBusinessEmployees
}