import gql from 'graphql-tag'

export default {
    calculateUserChangeBalance: gql`
        mutation calculateUserChangeBalance($userID: ID, $pocketID: ID){
            calculateUserChange(userID: $userID, pocketID: $pocketID) {
                changeBalanceID
                pocketID
                value
                userID
                expiryDate
            }
        }
`
}