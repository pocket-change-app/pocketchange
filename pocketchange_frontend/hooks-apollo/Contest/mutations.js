import {gql } from '@apollo/client';

export default {
    createContest: gql`
        mutation createContest($userID: ID, $pocketID: ID, $prizeValue: Decimal, $startDate: Date, $endDate: Date, $contestName: String, $description:String){
            createContest(userID: $userID, pocketID: $pocketID, prizeValue: $prizeValue, startDate: $startDate, endDate: $endDate, contestName: $contestName, description:$description){
                contestID
                pocketID
                prizeValue
                startDate
                endDate
                contestName
                description
                winner
                status{
                    pending
                    approved
                    deactivated
                }
            }
        }
    `,
    deactivateContest: gql`
        mutation deactivateContest($userID: ID, $contestID:ID, $pocketID: ID){
            deactivateContest(userID: $userID, contestID: $contestID, pocketID: $pocketID){
                contestID
                pocketID
                prizeValue
                startDate
                endDate
                contestName
                description
                winner
                status{
                    pending
                    approved
                    deactivated
                }
            }
        }
    `,
    approveContest: gql`
        mutation approveContest($userID: ID, $contestID:ID, $pocketID: ID){
            approveContest(userID: $userID, contestID: $contestID, pocketID: $pocketID){
                contestID
                pocketID
                prizeValue
                startDate
                endDate
                contestName
                description
                winner
                status{
                    pending
                    approved
                    deactivated
                }
            }
        }
    `
}