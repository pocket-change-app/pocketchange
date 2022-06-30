import gql from 'graphql-tag'

export default {
    processTransaction: gql`
        mutation processTransaction($userID: ID, $busID: ID, $pocketID: ID, $value: Decimal, $usingChange: Boolean){
            processTransaction(userID: $userID, busID: $busID, pocketID: $pocketID, value: $value, usingChange: $usingChange){
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