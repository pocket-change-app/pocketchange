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
                winners
                status{
                    pending
                    approved
                    deactivated
                }
            }
        }
    `,
    getAllEntries: gql`
        query getAllEntries($contestID: ID, $userID: ID){
            getAllEntries(contestID: $contestID, userID: $userID) {
                contestID
                QRScanID
                userID
                businessID
                geolocationID
                date
            }
        }
    `,
}