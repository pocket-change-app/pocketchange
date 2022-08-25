import gql from 'graphql-tag'

export default {
    updateUserChangeBalance: gql`
        mutation updateUserChangeBalance($userID: ID, $pocketID: ID){
            updateUserChange(userID: $userID, pocketID: $pocketID) {
                changeBalanceID
                pocketID
                value
                userID
                expiryDate
            }
        }
    `
}