import gql from 'graphql-tag'

export default {
    Transaction: gql`
        query Transaction($transactionID:ID){
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
`
}