import {gql } from '@apollo/client';

export default {
    registerUser: gql`
        mutation registerUser($userID: ID, $firstName: String, $lastName: String, $home: String, $birthDate: Date, $emailAddress: String){
            registerUser(userID: $userID, firstName: $firstName, lastName: $lastName, home: $home, birthDate: $birthDate, emailAddress: $emailAddress) {
                userID
                firstName
                lastName
                home
                birthDate
                totalChange
                emailAddress
            }
      }
    `,
    deactivateUser: gql`
        mutation deactivateUser($userID: ID){
            deactivateUser(userID:$userID){
                userID
                firstName
                lastName
                home
                birthDate
                totalChange
                emailAddress
            }
      }
    `,
    updatePassword: gql`
        mutation updatePassword($userID: ID, $password: String){
            updatePassword(userID:$userID, password: $password){
                userID
                firstName
                lastName
                home
                birthDate
                totalChange
                emailAddress
            }
      }
    `,
    updateUserProfile: gql`
    mutation updateUserProfile($userID: String, $firstName: String, $lastName: String, $home: String, $birthDate: Date, $emailAddress: String){
        updateUserProfile(userID: $userID, firstName: $firstName, lastName: $lastName, home: $home, birthDate: $birthDate, emailAddress: $emailAddress) {
            userID
            firstName
            lastName
            home
            birthDate
            totalChange
            emailAddress
        }
    }
    `, 
    loveOrUnloveBusiness: gql`
        mutation loveOrUnloveBusiness($userID: ID, $businessID: ID){
            loveOrUnloveBusiness(userID:$userID, businessID: $businessID) {
                userID
                firstName
                lastName
                home
                birthDate
                totalChange
                emailAddress
            }
    }`, 
    updateUserLocations: gql`
        mutation updateUserLocations($userID: ID, $latitude: Float, $longitude: Float){
            updateUserLocations(userID:$userID, latitude: $latitude, longitude: $longitude) {
                userID
                firstName
                lastName
                home
                birthDate
                totalChange
                emailAddress
            }
        }`,
    addUserRole: gql`
        mutation addUserRole($userID: ID, $role: String, $businessID: ID){
            addUserRole(userID:$userID, role: $role, businessID: $businessID) {
                userID
                firstName
                lastName
                home
                birthDate
                totalChange
                emailAddress
        }
    }`,
    removeUserRole: gql`
        mutation removeUserRole($userID: ID, $role: String, $businessID: ID){
            removeUserRole(userID:$userID, role: $role, businessID: $businessID) {
                userID
                firstName
                lastName
                home
                birthDate
                totalChange
                emailAddress
        }
    }`
    

}