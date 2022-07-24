import gql from 'graphql-tag'

export default {
    processTransaction: gql`
        mutation processTransaction($userID: ID, $businessID: ID, $pocketID: ID, $value: Decimal, $changeUsed: Boolean){
            processTransaction(userID: $userID, businessID: $busID, pocketID: $pocketID, value: $value, changeUsed: $changeUsed){
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