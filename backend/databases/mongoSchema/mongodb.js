const Mongoose = require('mongoose')
const dbConfig = require("./mongodb_config.js");
console.log(dbConfig.url)
console.log(dbConfig.user)
console.log(dbConfig.password)
Mongoose.Promise = global.Promise;
Mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    //user: dbConfig.user,
   // pass: dbConfig.password
}).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log('error connecting to the database');
    console.log(err)
    process.exit();
});
const mongoose = Mongoose.connection

const db = {};

db.Mongoose = Mongoose;
db.mongoose = mongoose;
db.mongoUser =  require('./mongoUser')
db.mongoPocket = require('./mongoPocket')
db.mongoBusiness = require('./mongoBusiness')
db.mongoPocketManager = require('./mongoPocketManager')

mongoose.on('error', console.error.bind(console, 'connection error'))

module.exports = db;