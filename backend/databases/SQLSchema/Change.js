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


const Change = Conn.define('change', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    pocketId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    value: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    customerId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    expiryDate: {
        type: Sequelize.DATE,
        allowNull: false
    }

});

module.exports= { Change: Change }