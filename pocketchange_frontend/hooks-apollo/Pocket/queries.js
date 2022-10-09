import {gql } from '@apollo/client';

export default {
    pocket: gql`
        query pocket($pocketID:ID){
            pocket(pocketID:$pocketID) {
                pocketID
                pocketName
                changeRate
                region
                circulatingChange
                status{
                    pending
                    approved
                    deactivated
                  }
                description
            }
        }
`,
    getAllPockets: gql`
        query getAllPockets($userID:ID){
            getAllPockets(userID:$userID) {
                pocketID
                pocketName
                changeRate
                region
                circulatingChange
                status{
                    pending
                    approved
                    deactivated
                  }
                description
            }
        }
    `,
    getBusinessPockets: gql`
        query getBusinessPockets($businessID:ID){
            getBusinessPockets(businessID:$businessID) {
                pocketID
                pocketName
                changeRate
                region
                circulatingChange
                status{
                    pending
                    approved
                    deactivated
                  }
                description
            }
        }
    `
}