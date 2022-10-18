import {gql } from '@apollo/client';

export default {
    contest: gql`
        query contest($contestID: ID){
            contest(contestID: $contestID) {
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
}