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

const Business = Conn.define('business', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    pocketId: {
        type: Sequelize.UUID,
        allowNull: false
    }

});



module.exports= { Business: Business }