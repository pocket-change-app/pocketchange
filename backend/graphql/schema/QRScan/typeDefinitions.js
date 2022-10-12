const gql = require('graphql-tag')

module.exports = gql`
    """
    QR Scan, associated with a user and a geolocation
    """
    type QRScan {
      QRScanID: ID
      userID: ID
      businessID: ID
      geolocationID: ID
      date: Date
    }

    type Query {
        """
        Query a specific QRScan from it's ID
        """
        QRScan(QRScanID: ID): QRScan
        getAllQRScans(userID: ID): [QRScan]
      }
      type Mutation {
        """
        Create a new QRScan
        """
        processQRScan(userID: ID, businessID: ID, latitude: Float, longitude: Float): QRScan
      }
`