const Mongoose = require('mongoose')
Mongoose.connect('mongodb://localhost/pocketchange', { useNewUrlParser: true })
const mongoose = Mongoose.connection

const db = {};

db.Mongoose = Mongoose;
db.mongoose = mongoose;
db.mongoUser =  require('./mongoUser')
db.mongoPocket = require('./mongoPocket')
db.mongoBusiness = require('./mongoBusiness')

mongoose.on('error', console.error.bind(console, 'connection error'))

module.exports = db;