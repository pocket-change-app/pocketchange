const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/pocketchange', { useNewUrlParser: true })
const db = mongoose.connection
const user = require('./user')
const pocket = require('./pocket')
const business = require('./business')

db.on('error', console.error.bind(console, 'connection error'))

module.exports = {
  user,
  pocket,
  business,
  mongoose,
  db
}