import gql from 'graphql-tag'

export default {
    transaction: gql`
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
    `,
    getAllTransactionsByBusiness: gql`
        query getAllTransactionsByBusiness($businessID:ID, $startDate: Date, $endDate: Date){
            getAllTransactionsByBusiness(businessID:$businessID, startDate: $startDate, endDate: $endDate){
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