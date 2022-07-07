import gql from 'graphql-tag'

export default {
    Transaction: gql`
        query transaction($transactionID:ID){
            transaction(transactionID:$transactionID) {
                transactionID
                userID
                value
                date
                busID
                pocketID
                changeRedeemed
                changeEarned
            }
        }
    query getAllTransactionsByBus($busID:ID, $startDate: Date, $endDate: Date){
        getAllTransactionsByBus(busID:$busID, startDate: $startDate, endDate: $endDate){
            transactionID
            userID
            value
            date
            busID
            pocketID
            changeRedeemed
            changeEarned
        }
    }
`
}