const Sequelize = require('sequelize');
const Conn = require("./Conn.js");

const User = Conn.define('user', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    }
});

module.exports= { User: User }