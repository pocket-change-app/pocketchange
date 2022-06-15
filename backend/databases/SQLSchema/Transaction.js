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

const Transaction = Conn.define('transaction', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    customerId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    businessId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    pocketId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    changeRedeemed: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    changeEarned: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
});

module.exports= { Transaction: Transaction }