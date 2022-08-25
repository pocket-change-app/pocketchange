import gql from 'graphql-tag'

export default {
    pocket: gql`
        query pocket($pocketID:ID){
            pocket(pocketID:$pocketID) {
                pocketID
                pocketName
                changeRate
                region
                circulatingChange
                deactivated
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
                deactivated
            }
        }
    `

}