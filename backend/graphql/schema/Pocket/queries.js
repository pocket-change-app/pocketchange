import gql from 'graphql-tag'

export default {
    Pocket: gql`
        query Pocket($pocketID:ID){
            pocket(pocketID:$pocketID) {
                pocketID
                pocketName
                changeRate
                region
                circulatingChange
            }
        }
`
//getAllPocketBusinesses
//getAllPocketCustomers
//getPocketWorkers
}