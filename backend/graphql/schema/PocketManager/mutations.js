import gql from 'graphql-tag'

export default {
    RegisterManager: gql`
        mutation RegisterManager($managername:String, $password: String, $pocketID: String){
            registerManager(managername:$busname, password: $password, pocketID:$pocketID) {
                managerID
                pocketID
            }
        }
`
}
