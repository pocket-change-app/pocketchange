require('dotenv').config({path: __dirname + '/../.env'});
// console.log(process.env.MYSQLDB_HOST)
// console.log(process.env.MYSQLDB_USER)
// console.log(process.env.MYSQLDB_PASSWORD)
// console.log(process.env.MYSQLDB_DB)
module.exports = {
    HOST: process.env.MYSQLDB_HOST,
    USER: process.env.MYSQLDB_USER,
    PASSWORD: process.env.MYSQLDB_PASSWORD,
    DB: process.env.MYSQLDB_DB,
    dialect: "mysql",
    URL: process.env.MYSQLDB_URL
};