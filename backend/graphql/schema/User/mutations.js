import gql from 'graphql-tag'

export default {
    registerUser: gql`
        mutation RegisterUser($username:String, $password: String){
            registerUser(username:$username, password: $password) {
                userID
            }
      }
    
`
}