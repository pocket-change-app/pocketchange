const { gql} = require('apollo-server');

const typeDefs = gql`
  type User {
    userId: ID 
  }
  type Query {
    user(userID: ID): User
  }
`

module.exports = typeDefs
