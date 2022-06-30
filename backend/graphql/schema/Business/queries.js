import gql from 'graphql-tag'

export default {
    Business: gql`
        query Business($busID: ID){
            business(busID: $busID) {
            busID
            pocketID
            busname
            emailAddress
            role
            }
        }
`,
    LoginBus: gql`query loginBus($busname:String, $password: String){
        loginBus(busname:$busname, password: $password) {
          busID
          pocketID
          busname
        }
      }
      `
}