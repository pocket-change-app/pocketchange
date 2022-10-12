import {gql } from '@apollo/client';

export default {
    QRScan: gql`
        query QRScan($QRScanID: ID){
            QRScan(QRScanID: $QRScanID) {
                QRScanID
                userID
                businessID
                geolocationID
                date
            }
        }
    `,
    getAllQRScans: gql`
        query getAllQRScans($userID: ID){
            getAllQRScans(userID: $userID) {
                QRScanID
                userID
                businessID
                geolocationID
                date
            }
        }
    `,
}