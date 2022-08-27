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
    getAllChangeBalances: gql`
        query getAllChangeBalances($userID:ID, $pocketID: ID){
            getAllChangeBalances(userID:$userID, pocketID: $pocketID) {
                changeBalanceID
                pocketID
                value
                userID
                expiryDate
            }
        }
    `
}