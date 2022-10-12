import {gql } from '@apollo/client';

export default {
    competition: gql`
        query competition($competitionID: ID){
            competition(competitionID: $competitionID) {
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
}