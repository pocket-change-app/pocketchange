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
        query getAllQRScans($userID: ID, $startDate: Date, $endDate: Date, $businessID: ID){
            getAllQRScans(userID: $userID, startDate: $startDate, endDate: $endDate, businessID: $businessID) {
                QRScanID
                userID
                businessID
                geolocationID
                date
            }
        }
    `,
}