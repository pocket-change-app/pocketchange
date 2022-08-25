import gql from 'graphql-tag'

export default {
    calculatePocketChange: gql`
        mutation calculatePocketChange($pocketID: ID){
            calculatePocketChange(pocketID: $pocketID) {
                pocketID
                pocketName
                changeRate
                circulatingChange
                region
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
                }
            }         
    `,

}