const { gql} = require('apollo-server');

const typeDefs = gql`
  type User {
    userID: ID 
    username: String
    emailAddress: String
    favouriteBusiness: [String]
    pockets: [String]
  }
  type Business {
    busID: ID 
    pocketID: ID
    busname: String
    emailAddress: String
    role: String
  }
  type Pocket {
    pocketID: ID 
    pocketName: String
    customers: [ID]
    businesses: [ID]
    changeRate: Float
    circulatingPoints: Float
  }
  type Query {
    user(userID: ID): User
    business(busID: ID): Business
    pocket(pocketID:ID):Pocket
    loginUser(username:String, password:String):User
    loginBus(busname:String, password:String):Business
  }
  type Mutation {
    registerUser(username: String, password: String): User
    registerBus(busname: String, password: String, pocketID:String): Business
  }
`

module.exports = typeDefs
