import gql from 'graphql-tag'

export default {
    calculateUserChange: gql`
        mutation calculateUserChange($userID: ID, $pocketID: ID){
            calculateUserChange(userID: $userID, pocketID: $pocketID) {
                changeID
                pocketID
                value
                userID
                expiryDate
            }
        }
`
}