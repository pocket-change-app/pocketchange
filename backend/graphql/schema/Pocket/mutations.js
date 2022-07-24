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
    
`
}