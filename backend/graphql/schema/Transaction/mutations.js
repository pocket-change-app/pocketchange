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
                refunded
                refundedValue
                refundDate
                changeEarnedBeforeRefund
                changeEarnedAfterRefund
            }
        }
    
`,
    refundTransaction: gql`
    mutation refundTransaction($userID: ID, $businessID: ID, $pocketID: ID, $refundValue: Decimal){
        refundTransaction(userID: $userID, businessID: $busID, pocketID: $pocketID, refundValue: $refundValue){
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
            changeEarnedBeforeRefund
            changeEarnedAfterRefund
        }
    }

    `
}