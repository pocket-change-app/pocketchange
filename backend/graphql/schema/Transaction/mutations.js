import gql from 'graphql-tag'

export default {
    processTransaction: gql`
        mutation processTransaction($userID: ID, $busID: ID, $pocketID: ID, $value: Decimal, $changeUsed: Boolean){
            processTransaction(userID: $userID, busID: $busID, pocketID: $pocketID, value: $value, changeUsed: $changeUsed){
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