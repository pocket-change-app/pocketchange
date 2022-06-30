import gql from 'graphql-tag'

export default {
    registerBus: gql`
        mutation RegisterBus($busname:String, $password: String, $pocketID: String){
            registerBus(busname:$busname, password: $password, pocketID:$pocketID) {
            busID
            pocketID
            }
        }
`
}