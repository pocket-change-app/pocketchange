import {gql } from '@apollo/client';

export default {
    updateUserChangeBalance: gql`
        mutation updateUserChangeBalance($userID: ID, $pocketID: ID){
            updateUserChangeBalance(userID: $userID, pocketID: $pocketID) {
                changeBalanceID
                pocketID
                value
                userID
                expiryDate
            }
        }
    `
}