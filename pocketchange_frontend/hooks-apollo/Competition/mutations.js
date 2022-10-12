import {gql } from '@apollo/client';

export default {
    createCompetition: gql`
        mutation createCompetition($userID: ID, $pocketID: ID, $prizeValue: Decimal, $startDate: Date, $endDate: Date, $competitionName: String, $description:String){
            createCompetition(userID: $userID, pocketID: $pocketID, prizeValue: $prizeValue, startDate: $startDate, endDate: $endDate, competitionName: $competitionName, description:$description){
                competitionID
                pocketID
                prizeValue
                startDate
                endDate
                competitionName
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
    deactivateCompetition: gql`
        mutation deactivateCompetition($userID: ID, $competitionID:ID, $pocketID: ID){
            deactivateCompetition(userID: $userID, competitionID: $competitionID, pocketID: $pocketID){
                competitionID
                pocketID
                prizeValue
                startDate
                endDate
                competitionName
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
    approveCompetition: gql`
        mutation approveCompetition($userID: ID, $competitionID:ID, $pocketID: ID){
            approveCompetition(userID: $userID, competitionID: $competitionID, pocketID: $pocketID){
                competitionID
                pocketID
                prizeValue
                startDate
                endDate
                competitionName
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