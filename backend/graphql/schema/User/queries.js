import gql from 'graphql-tag'

export default {
    User: gql`
        query User($userID: ID){
            user(userID: $userID) {
                userID
                username
                home
                name
                birthDate
                totalChange
                emailAddress
            }
        }
`,
    LoginUser: gql`
        query loginUser($username:String, $password: String){
            loginUser(username:$username, password: $password) {
                userID
                username
                home
                name
                birthDate
                totalChange
                emailAddress
            }
        }`
        //getUsersFavouriteBusinesses
        //getUsersPockets
}