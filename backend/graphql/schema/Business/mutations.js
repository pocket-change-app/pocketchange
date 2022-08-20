import gql from 'graphql-tag'

export default {
    createBusiness: gql`
        mutation createBusiness($userID: String, $businessName:String, $dateEstablished:String, $emailAddress:String, $phoneNumber:String, $website:String, $businessType: String, $businessSubtype: String, $pocketID: String){
            createBusiness(userID: $userID, businessName:$businessname, dateEstablished:$dateEstablished, emailAddress:$emailAddress, phoneNumber:$phoneNumber, website:$website, businessType: $businessType, businessSubtype: $businessSubtype, pocketID:$pocketID) {
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
    updateBusiness: gql`
        mutation updateBusiness($userID: String, $businessName:String, $dateEstablished:String, $emailAddress:String, $phoneNumber:String, $website:String, $businessType: String, $businessSubtype: String, $pocketID: String){
            updateBusiness(userID: $userID, businessName:$businessname, dateEstablished:$dateEstablished, emailAddress:$emailAddress, phoneNumber:$phoneNumber, website:$website, businessType: $businessType, businessSubtype: $businessSubtype, pocketID:$pocketID) {
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