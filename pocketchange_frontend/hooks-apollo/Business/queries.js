import {gql } from '@apollo/client';

export default {
  business: gql`
    query business($businessID: ID) {
      business(businessID: $businessID) {
        businessID
        businessName
        dateEstablished
        emailAddress
        phoneNumber
        website
        businessType
        businessSubtype
        address{
            streetName
            buildingNumber
            unitNumber
            city
            region
            postalCode
        }
        latitude
        longitude
        businessTags
        stripeID
        description
        status{
          pending
          approved
          deactivated
        }
        hours{
          Monday {
            start
            end
          }
          Tuesday{
            start
            end
          }
          Wednesday{
            start
            end
          }
          Thursday{
            start
            end
          }
          Friday{
            start
            end
          }
          Saturday{
            start
            end
          }
          Sunday{
            start
            end
          }
        }
      }
    }
  `,
  getAllBusinesses: gql`
    query getAllBusinesses($pocketID: ID, $businessType: String, $businessSubtype: String, $businessTag: String) {
      getAllBusinesses(pocketID: $pocketID, businessType: $businessType, businessSubtype: $businessSubtype, businessTag: $businessTag) {
        businessID
        businessName
        dateEstablished
        emailAddress
        phoneNumber
        website
        businessType
        businessSubtype
        address{
            streetName
            buildingNumber
            unitNumber
            city
            region
            postalCode
        }
        latitude
        longitude
        businessTags
        stripeID
        description
        status{
          pending
          approved
          deactivated
        }
        hours{
          Monday {
            start
            end
          }
          Tuesday{
            start
            end
          }
          Wednesday{
            start
            end
          }
          Thursday{
            start
            end
          }
          Friday{
            start
            end
          }
          Saturday{
            start
            end
          }
          Sunday{
            start
            end
          }
        }
        }
    }
  `,
  getLovedBusinessesByUser: gql`
    query getLovedBusinessesByUser($userID: ID) {
      getLovedBusinessesByUser(userID: $userID) {
        businessID
        businessName
        dateEstablished
        emailAddress
        phoneNumber
        website
        businessType
        businessSubtype
        address{
            streetName
            buildingNumber
            unitNumber
            city
            region
            postalCode
        }
        latitude
        longitude
        businessTags
        stripeID
        description
        status{
          pending
          approved
          deactivated
        }
        hours{
          Monday {
            start
            end
          }
          Tuesday{
            start
            end
          }
          Wednesday{
            start
            end
          }
          Thursday{
            start
            end
          }
          Friday{
            start
            end
          }
          Saturday{
            start
            end
          }
          Sunday{
            start
            end
          }
        }
        }
    }
  `,
  getNearbyBusinesses: gql`
    query getNearbyBusinesses($latitude: Float, $longitude: Float, $radius: Float) {
      getNearbyBusinesses(latitude: $latitude, longitude: $longitude, radius: $radius) {
        businessID
        businessName
        dateEstablished
        emailAddress
        phoneNumber
        website
        businessType
        businessSubtype
        address{
            streetName
            buildingNumber
            unitNumber
            city
            region
            postalCode
        }
        latitude
        longitude
        businessTags
        stripeID
        description
        status{
          pending
          approved
          deactivated
        }
        hours{
          Monday {
            start
            end
          }
          Tuesday{
            start
            end
          }
          Wednesday{
            start
            end
          }
          Thursday{
            start
            end
          }
          Friday{
            start
            end
          }
          Saturday{
            start
            end
          }
          Sunday{
            start
            end
          }
        }
        }
    }
  `,
  getSimilarBusinesses: gql`
    query getSimilarBusinesses($businessID: ID, $businessNumber: Int, $startDate: Date, $endDate: Date) {
      getSimilarBusinesses(businessID: $businessID, businessNumber: $businessNumber,startDate: $startDate, endDate: $endDate ) {
        businessID
        businessName
        dateEstablished
        emailAddress
        phoneNumber
        website
        businessType
        businessSubtype
        address{
            streetName
            buildingNumber
            unitNumber
            city
            region
            postalCode
        }
        latitude
        longitude
        businessTags
        stripeID
        description
        status{
          pending
          approved
          deactivated
        }
        hours{
          Monday {
            start
            end
          }
          Tuesday{
            start
            end
          }
          Wednesday{
            start
            end
          }
          Thursday{
            start
            end
          }
          Friday{
            start
            end
          }
          Saturday{
            start
            end
          }
          Sunday{
            start
            end
          }
        }
        }
    }
  `,

}