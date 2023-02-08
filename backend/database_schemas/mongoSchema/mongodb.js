const Mongoose = require('mongoose')
const dbConfig = require("./mongodb_config.js");
Mongoose.Promise = global.Promise;
Mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('successfully connected to the MONGO database');
}).catch(err => {
    console.log('error connecting to the MONGO database');
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
db.mongoContest = require('./mongoContest')

mongoose.on('error', console.error.bind(console, 'connection error'))

module.exports = db;