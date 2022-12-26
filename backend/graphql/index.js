const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
require('dotenv').config({path: __dirname + '/../.env'});

//const Mongoose = require('mongoose');
const { MongoClient } = require ('mongodb');

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
const WorksAt = database.WorksAt
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
const resolvers = require('./resolvers.js')

const context = async ({ req }) => {
  return {
    req,
    //entity schema SQL
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
    WorksAt,
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

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const app = express();
app.use(express.json())
const server = new ApolloServer({ typeDefs, resolvers,  csrfPrevention: true, context });

server.start().then(res => { 
  server.applyMiddleware({
    app,
  });
})

//START GRAPHQL SERVER ONCE DATABASE CONNECTED & MODELS AVAILABLE
const port = process.env.NODE_DOCKER_PORT || 4000;
mongoose.once('open', () => {
  console.log('Mongo connection open')
  sequelizeConnection.authenticate().then(() => {
    console.log('mySQL database connection established successfully')
        app.listen(port, () => {
            console.log(`Server ready at ${port}`);
        })
    })
})


// STRIPE ENDPOINT
// TODO: change key from test
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/payment-sheet', async (req, res) => {
  // TODO: Use an existing Customer ID if this is a returning customer.
  console.log(req.body);
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2022-11-15'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'cad',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.STRIPE_PUBLISH_KEY
  });
});
