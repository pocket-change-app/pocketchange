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


const Pocket = Conn.define('pocket', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    circulatingPoints: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    changeRate: {
        type: Sequelize.DECIMAL, //double check
        allowNull: false
    }

});

module.exports= { Pocket: Pocket }