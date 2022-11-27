const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
//const Mongoose = require('mongoose');
const { MongoClient } = require ('mongodb');

const admin = require('firebase-admin')
const { initializeApp,  applicationDefault  } = require('firebase-admin/app');
admin.initializeApp({credential: applicationDefault(), projectId: 'pocket-change-backend' })

const R = require('ramda')

//get SQL data
const database = require('../databases/SQLSchema/db')
const sequelizeConnection = database.sequelize
//entities
const User = database.User
const Business = database.Business
const Pocket = database.Pocket
const ChangeBalance = database.ChangeBalance
const Transaction = database.Transaction
const Geolocation = database.Geolocation
const Contest = database.Contest
const QRScan = database.QRScan
//relationships
const IsIn = database.IsIn
const IsMember = database.IsMember
const Loves = database.Loves
const Role = database.Role
const ParticipatingIn = database.ParticipatingIn

//get Mongo Data
const mongodatabase = require('../databases/mongoSchema/mongodb')
const mongoose = mongodatabase.mongoose
const mongoUser = mongoose.model('mongoUser')
const mongoBusiness = mongoose.model('mongoBusiness')
const mongoPocket = mongoose.model('mongoPocket')
const mongoContest = mongoose.model('mongoContest')

//get type definitions and resolvers
const typeDefs = require('./typeDefinitions.js')
const resolvers = require('./resolvers.js');

const context = async ({req}) => {
  let userID=''
    try {
      //console.log("HEADER", req.headers.authorization)
      //for not playground:
      const encodedToken = req.headers['x-auth-token']
      //for playground:
      //const encodedToken = req.headers.authorization
      console.log("TOKY", encodedToken)
      await admin.auth()
          .verifyIdToken(encodedToken)
          .then((decodedToken) => {
            userID = decodedToken.uid;
            // ...
          })
          .catch((error) => {
            console.log("ERRROR", error)
            // Handle error
          });
      //const currentUser = R.isNil(userID) ? null : await User.findOne({where: {userID: userID}})
      const currentUserID = R.isNil(userID) ? null : userID
      console.log("WITHIN INDEX.JS THE CURRENT USER ID", currentUserID)
      return {
        req,
        currentUserID,
        User,
        Business,
        Pocket,
        ChangeBalance,
        Transaction,
        Geolocation,
        Contest,
        QRScan,
        //relationship schema SQL
        IsIn,
        IsMember,
        Loves,
        Role,
        ParticipatingIn,
        //sequelize connection for functions
        sequelizeConnection,
        //schema Mongo
        mongoUser,
        mongoBusiness,
        mongoPocket,
        mongoContest,
        //mongoose connection
        mongoose,
      }
    }
    catch(error){
      console.log(error)
    }
  }


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const app = express();
const server = new ApolloServer({ typeDefs, resolvers,  csrfPrevention: true, context, debug:true });


server.start().then(res => { 
  server.applyMiddleware({
    app,
  });
})

//START GRAPHQL SERVER ONCE DATABASE CONNECTED & MODELS AVAILABLE
const port = process.env.PORT || 4000;
mongoose.once('open', () => {
  console.log('Mongo connection open')
  sequelizeConnection.authenticate().then(() => {
    console.log('mySQL database connection established successfully')
        app.listen(port, () => {
            console.log(`Server ready at ${port}`);
        })
    })
})
