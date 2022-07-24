import gql from 'graphql-tag'

export default {
    registerBus: gql`
        mutation registerBus($userID: String, $businessName:String, $dateEstablished:String, $emailAddress:String, $phoneNumber:String, $website:String, $businessType: String, $businessSubtype: String, $pocketID: String){
            registerBus(userID: $userID, businessName:$businessname, dateEstablished:$dateEstablished, emailAddress:$emailAddress, phoneNumber:$phoneNumber, website:$website, businessType: $businessType, businessSubtype: $businessSubtype, pocketID:$pocketID) {
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
}