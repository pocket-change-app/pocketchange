const Sequelize = require('sequelize');
const Conn = require("./Conn.js");

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