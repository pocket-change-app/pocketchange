import {gql } from '@apollo/client';

export default {
    createCompetition: gql`
        mutation processQRScan($userID: ID, $latitude: Float, $longitude: Float, $businessID: ID){
            processQRScan(userID: $userID, latitude: $latitude, longitude: $longitude, businessID: $businessID){
                QRScanID
                userID
                businessID
                geolocationID
                date
            }
        }
    `,
}