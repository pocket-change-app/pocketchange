require('dotenv').config({path: __dirname + '/../.env'});
console.log(process.env.MONGODB_URL)
console.log(process.env.MONGODB_USER)
console.log(process.env.MONGODB_PASSWORD)
module.exports = {
    url: process.env.MONGODB_URL,
    //user: process.env.MONGODB_USER,
   // password: process.env.MONGODB_PASSWORD,
};