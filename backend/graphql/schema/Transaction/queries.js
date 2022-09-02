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
                refunded
                refundedValue
                refundDate
            }
        }
    `,
    getAllTransactions: gql`
        query getAllTransactions($businessID:ID,$pocketID:ID, $userID:ID, $startDate: Date, $endDate: Date){
            getAllTransactions(businessID:$businessID, pocketID:$pocketID, userID:$userID, startDate: $startDate, endDate: $endDate){
                transactionID
                userID
                value
                date
                businessID
                pocketID
                changeRedeemed
                changeEarned
                refunded
                refundedValue
                refundDate
            }
        }
`,
    getAllChange: gql`
        query getAllChange($businessID:ID,$pocketID:ID, $userID:ID, $startDate: Date, $endDate: Date, $earned: Boolean){
            getAllChange(businessID:$businessID, pocketID:$pocketID, userID:$userID, startDate: $startDate, endDate: $endDate, earned: $earned){
                value
            }
        }
        `,
}