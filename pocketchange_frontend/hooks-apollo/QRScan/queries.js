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
}