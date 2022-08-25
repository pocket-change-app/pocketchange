import gql from 'graphql-tag'

export default {
    createBusiness: gql`
        mutation createBusiness($userID: String, $ownerID: ID, $businessName:String, $dateEstablished:String, $emailAddress:String, $phoneNumber:String, $website:String, $businessType: String, $businessSubtype: String, $pocketID: String){
            createBusiness(userID: $userID, ownerID: $ownerID, businessName:$businessname, dateEstablished:$dateEstablished, emailAddress:$emailAddress, phoneNumber:$phoneNumber, website:$website, businessType: $businessType, businessSubtype: $businessSubtype, pocketID:$pocketID) {
                businessID
                businessName
                dateEstablished
                emailAddress
                phoneNumber
                website
                businessType
                businessSubtype
                latitude
                longitude
                businessTags
                stripeID
                description
                deactivated
            }
        }
    `,
    updateBusiness: gql`
        mutation updateBusiness($userID: String, $businessName:String, $dateEstablished:String, $emailAddress:String, $phoneNumber:String, $website:String, $businessType: String, $businessSubtype: String, $pocketID: String, $address: Address, $latitude: Float, $longitude: Float, $businessTags: [String], $stripeID: ID, $description: String){
            updateBusiness(userID: $userID, businessName:$businessname, dateEstablished:$dateEstablished, emailAddress:$emailAddress, phoneNumber:$phoneNumber, website:$website, businessType: $businessType, businessSubtype: $businessSubtype, pocketID:$pocketID, address: $address, latitude: $latitude, longitude: $longitude, businessTags: $businessTags, stripeID: $stripeID, description: $description) {
                businessID
                businessName
                dateEstablished
                emailAddress
                phoneNumber
                website
                businessType
                businessSubtype
                latitude
                longitude
                businessTags
                stripeID
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
    deactivateBusiness: gql`
    mutation deactivateBusiness($userID: String, $businessID: ID){
        updateBusiness(userID: $userID, businessID:$businessID) {
            businessID
            businessName
            dateEstablished
            emailAddress
            phoneNumber
            website
            businessType
            businessSubtype
            latitude
            longitude
            businessTags
            stripeID
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