import {gql } from '@apollo/client';

export default {
    user: gql`
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
    loginUser: gql`
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
        }
    `,
    getAllUsers: gql`
        query getAllUsers($username:String){
            getAllUsers(username:$username) {
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
    getUsersThatLove: gql`
        query getUsersThatLove($businessID:ID){
            getUsersThatLove(businessID:$businessID) {
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
    getTopUsers: gql`
    query getTopUsers($businessID:ID, $pocketID: ID, $startDate: Date, $endDate: Date, $userNumber:Int){
        getTopUsers(businessID:$businessID, pocketID: $pocketID, startDate: $startDate, endDate: $endDate, userNumber: $userNumber) {
            userID
            username
            home
            name
            birthDate
            totalChange
            emailAddress
        }
    }`,
}