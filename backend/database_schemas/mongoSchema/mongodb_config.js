require('dotenv').config({path: __dirname + '/../.env'});
module.exports = {
    url: process.env.MONGODB_URL,
    //user: process.env.MONGODB_USER,
    //password: process.env.MONGODB_PASSWORD,
};