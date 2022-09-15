import {gql } from '@apollo/client';

export default {
    calculatePocketChange: gql`
        mutation calculatePocketChange($pocketID: ID){
            calculatePocketChange(pocketID: $pocketID) {
                pocketID
                pocketName
                changeRate
                circulatingChange
                region
                status{
                    pending
                    approved
                    deactivated
                  }
            }
        }
    `,
    createPocket: gql`
        mutation createPocket($pocketID: ID, $userID: ID, $pocketName: String, $region: String, managerID: ID){
            createPocket(pocketID: $pocketID, userID: $userID, pocketName: $pocketName, region: $region, managerID:$managerID) {
                pocketID
                pocketName
                changeRate
                circulatingChange
                region
                status{
                    pending
                    approved
                    deactivated
                  }
            }
        }         
`,
    updatePocket: gql`
        mutation updatePocket($pocketID: ID, $userID: ID, $pocketName: String, $region: String){
            updatePocket(pocketID: $pocketID, userID: $userID, pocketName: $pocketName, region: $region) {
                pocketID
                pocketName
                changeRate
                circulatingChange
                region
                status{
                    pending
                    approved
                    deactivated
                  }
            }
        }         
    `,
    updatePocketManager: gql`
    mutation updatePocketManager($pocketID: ID, $userID: ID, $managerID: ID){
        updatePocketManager(pocketID: $pocketID, userID: $userID, managerID: $managerID) {
            pocketID
            pocketName
            changeRate
            circulatingChange
            region
            status{
                pending
                approved
                deactivated
              }
        }
    }         
    `,
    deactivatePocket: gql`
        mutation deactivatePocket($pocketID: ID, $userID: ID){
            deactivatePocket(pocketID: $pocketID, userID: $userID) {
                pocketID
                pocketName
                changeRate
                circulatingChange
                region
                status{
                    pending
                    approved
                    deactivated
                  }
            }
        }      
`,
    approvePocket: gql`
        mutation approvePocket($pocketID: ID, $userID: ID){
            approvePocket(pocketID: $pocketID, userID: $userID) {
                pocketID
                pocketName
                changeRate
                circulatingChange
                region
                status{
                    pending
                    approved
                    deactivated
                  }
            }
        }      
    `,
    joinPocketAsMember: gql`
        mutation joinPocketAsMember($pocketID: ID, $userID: ID){
            joinPocketAsMember(pocketID: $pocketID, userID: $userID) {
                pocketID
                pocketName
                changeRate
                circulatingChange
                region
                status{
                    pending
                    approved
                    deactivated
                  }
            }
        }         
`,
    joinPocketAsBusiness: gql`
            mutation joinPocketAsBusiness($pocketID: ID, $businessID: ID){
                joinPocketAsBusiness(pocketID: $pocketID, businessID: $businessID) {
                    pocketID
                    pocketName
                    changeRate
                    circulatingChange
                    region
                    status{
                        pending
                        approved
                        deactivated
                      }
                }
            }         
    `,

}