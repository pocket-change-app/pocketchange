import gql from 'graphql-tag'

export default {
    Change: gql`
        query Change($changeID: ID){
            change(changeID: $changeID) {
                changeID
                pocketID
                value
                userID
                expiryDate
            }
        }
`,
    getUserChange: gql`
        query getUserChange($userID:ID, $pocketID: ID){
            getUserChnage(userID:$userID, pocketID: $pocketID) {
                changeID
                pocketID
                value
                userID
                expiryDate
            }
        }
      `
}