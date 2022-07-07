import gql from 'graphql-tag'

export default {
    PocketManager: gql`
        query PocketManager($managerID: ID){
            pocketManager(managerID: $managerID) {
              managerID
              name
              managername
              pocketID
              emailAddress
            }
        }
`,
    LoginManager: gql`query loginManager($managername:String, $password: String){
        loginManager(managername:$managername, password: $password) {
          managerID
          pocketID
          name
        }
      }
      `
}