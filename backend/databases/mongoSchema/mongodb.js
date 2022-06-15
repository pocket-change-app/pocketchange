const Mongoose = require('mongoose')
Mongoose.connect('mongodb://localhost/pocketchange', { useNewUrlParser: true })
const mongoose = Mongoose.connection

const db = {};

db.Mongoose = Mongoose;
db.mongoose = mongoose;
db.User =  require('./user')
db.Pocket = require('./pocket')
db.Business = require('./business')

mongoose.on('error', console.error.bind(console, 'connection error'))

module.exports = db;