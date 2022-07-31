import gql from 'graphql-tag'

export default {
    Transaction: gql`
        query transaction($transactionID:ID){
            transaction(transactionID:$transactionID) {
                transactionID
                userID
                value
                date
                businessID
                pocketID
                changeRedeemed
                changeEarned
            }
        }
    query getAllTransactionsByBus($businessID:ID, $startDate: Date, $endDate: Date){
        getAllTransactionsByBus(businessID:$businessID, startDate: $startDate, endDate: $endDate){
            transactionID
            userID
            value
            date
            businessID
            pocketID
            changeRedeemed
            changeEarned
        }
    }
`
}