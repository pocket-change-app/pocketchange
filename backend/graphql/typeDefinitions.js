const { gql} = require('apollo-server');

const typeDefs = gql`
  scalar Date
  scalar Decimal
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
  type Change {
    changeID: ID 
    pocketID: ID
    value: Decimal
    userID: ID
    expiryDate: Date
  }
  type Pocket {
    pocketID: ID 
    pocketName: String
    customers: [ID]
    businesses: [ID]
    changeRate: Decimal
    circulatingChange: Decimal
  }
  type Query {
    user(userID: ID): User
    business(busID: ID): Business
    change(changeID: ID) :Change
    pocket(pocketID:ID):Pocket
    loginUser(username:String, password:String):User
    loginBus(busname:String, password:String):Business
    getUserChange(userID: ID, pocketID: ID):Change
  }
  type Mutation {
    registerUser(username: String, password: String): User
    registerBus(busname: String, password: String, pocketID:String): Business
    calculateUserChange(userID: ID, pocketID: ID):Change
    calculatePocketChange(pocketID: ID):Pocket
  }
`

module.exports = typeDefs
