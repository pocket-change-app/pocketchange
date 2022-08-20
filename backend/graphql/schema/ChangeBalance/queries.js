import gql from 'graphql-tag'

export default {
    changeBalance: gql`
        query changeBalance($changeBalanceID: ID){
            changeBalance(changeBalanceID: $changeBalanceID) {
                changeBalanceID
                pocketID
                value
                userID
                expiryDate
            }
        }
    `,
    getUserChangeBalance: gql`
        query getUserChangeBalance($userID:ID, $pocketID: ID){
            getUserChangeBalance(userID:$userID, pocketID: $pocketID) {
                changeBalanceID
                pocketID
                value
                userID
                expiryDate
            }
        }
    `
}