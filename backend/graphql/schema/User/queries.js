import gql from 'graphql-tag'

export default {
    User: gql`
        query User($userID: ID){
            user(userID: $userID) {
                userID
                username
                name
                birthDate
                totalChange
                emailAddress
                favouriteBusiness
                pockets
            }
        }
`,
    LoginUser: gql`
        query loginUser($username:String, $password: String){
            loginUser(username:$username, password: $password) {
                userID
            }
        }`
}