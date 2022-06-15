const Sequelize = require('sequelize');
require('dotenv').config();
const dbConfig = require("./db_config.js");

const Conn = new Sequelize(
    dbConfig.DB, //name of db
    dbConfig.USER, //username
    dbConfig.PASSWORD, //password
    {
        dialect: dbConfig.dialect,
        host: dbConfig.HOST
    }
);
require('dotenv').config();
const Business = require ("./Business.js")
const User = require("./User.js")
const Pocket = require("./Pocket.js")
const Change = require("./Change.js")
const Transaction = require("./Transaction.js")

Conn.sync({force: true})
.then(() => {
    console.log("\n\n\nDatabase is up and running!\n\n\n");
})
.catch((error) => console.log(error));



module.exports= { 
    Conn: Conn,
    Business: Business,
    User: User,
    Pocket: Pocket,
    Change: Change,
    Transaction: Transaction
};
