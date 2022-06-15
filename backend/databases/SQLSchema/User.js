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



const User = Conn.define('user', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    }
});

module.exports= { User: User }