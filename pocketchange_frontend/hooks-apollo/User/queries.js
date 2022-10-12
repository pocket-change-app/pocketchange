import {gql } from '@apollo/client';

export default {
    user: gql`
        query User($userID: ID){
            user(userID: $userID) {
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
    loginUser: gql`
        query loginUser($emailAddress:String, $password: String){
            loginUser(emailAddress:$emailAddress, password: $password) {
                userID
                firstName
                lastName
                name
                birthDate
                totalChange
                emailAddress
            }
        }
    `,
    getAllUsers: gql`
        query getAllUsers($username:String){
            getAllUsers(username:$username) {
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

    getUserRoles: gql`
        query getUserRoles($userID:ID){
            getUserRoles(userID:$userID) {
                type
                level
                entityID
                entityName
            }
        }
    `, 
    getUsersThatLove: gql`
        query getUsersThatLove($businessID:ID){
            getUsersThatLove(businessID:$businessID) {
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
    getTopUsers: gql`
    query getTopUsers($businessID:ID, $pocketID: ID, $startDate: Date, $endDate: Date, $userNumber:Int){
        getTopUsers(businessID:$businessID, pocketID: $pocketID, startDate: $startDate, endDate: $endDate, userNumber: $userNumber) {
            userID
            firstName
            lastName
            home
            birthDate
            totalChange
            emailAddress
        }
    }`,
}