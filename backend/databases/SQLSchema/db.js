//import Sequelize from 'sequelize';
const Sequelize = require('sequelize');

const Conn = require("./Conn.js")
const User = require("./User.js")
const Business = require ("./Business.js")
const Pocket = require("./Pocket.js")
const Change = require("./Change.js")
const Transaction = require("./Transaction.js")

Conn.sync({force: true})
.then(() => {
    console.log("\n\n\nDatabase is up and running!\n\n\n");
})
.catch((error) => console.log(error));


module.exports= { 
    User: User,
    Conn: Conn,
    Business: Business,
    Pocket: Pocket,
    Change: Change,
    Transaction: Transaction
};