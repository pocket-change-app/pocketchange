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
    `,
    deactivateUser: gql`
        mutation deactivateUser($userID: ID){
            deactivateUser(userID:$userID){
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
    `,
    updatePassword: gql`
        mutation updatePassword($userID: ID, $password: String){
            updatePassword(userID:$userID, password: $password){
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
    `,
    updateUserProfile: gql`
    mutation updateUserProfile($username: String, $name: String, $home: String, $birthDate: Date, $emailAddress: String){
        updateUserProfile(username:$username, name: $name, home: $home, birthDate: $birthDate, emailAddress: $emailAddress) {
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
    `, 
    loveOrUnloveBusiness: gql`
        mutation loveOrUnloveBusiness($userID: ID, $businessID: ID){
            loveOrUnloveBusiness(userID:$userID, businessID: $businessID) {
                userID
                home
                username
                name
                birthDate
                password
                totalChange
                emailAddress
            }
    }`, 
    updateUserLocations: gql`
        mutation updateUserLocations($userID: ID, $latitude: Float, $longitude: Float){
            updateUserLocations(userID:$userID, latitude: $latitude, longitude: $longitude) {
                userID
                home
                username
                name
                birthDate
                password
                totalChange
                emailAddress
            }
        }`,
    addUserRole: gql`
        mutation addUserRole($userID: ID, $role: String, $businessID: ID){
            addUserRole(userID:$userID, role: $role, businessID: $businessID) {
                userID
                home
                username
                name
                birthDate
                password
                totalChange
                emailAddress
        }
    }`,
    removeUserRole: gql`
        mutation removeUserRole($userID: ID, $role: String, $businessID: ID){
            removeUserRole(userID:$userID, role: $role, businessID: $businessID) {
                userID
                home
                username
                name
                birthDate
                password
                totalChange
                emailAddress
        }
    }`
    

}