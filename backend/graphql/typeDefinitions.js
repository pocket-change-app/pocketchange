const { gql} = require('apollo-server');

const typeDefs = gql`
  type User {
    userID: ID 
  }
  type Business {
    busID: ID 
    pocketID: ID
  }
  type Pocket {
    pocketID: ID 
    pocketName: String
    customers: [ID]
    businesses: [ID]
  }
  type Query {
    user(userID: ID): User
    business(busID: ID): Business
    loginUser(username:String, password:String):User
  }
  type Mutation {
    registerUser(username: String, password: String): User
  }
`

module.exports = typeDefs
