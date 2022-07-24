import gql from 'graphql-tag'

export default {
    registerUser: gql`
        mutation RegisterUser($username: String, $name: String, $home: String, $birthDate: Date, $password: String, $emailAddress: String){
            registerUser(username:$username, name: $name, home: $home, birthDate: $birthDate, emailAddress: $emailAddress, password: $password) {
                userID
                home
                username
                name
                birthDate
                password
                totalChange
                emailAddress
            }
      }
`
    //joinAPocket
    //favouriteABusiness
    //addWorkplace
}