const Sequelize = require('sequelize');
const Conn = require("./Conn.js");

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