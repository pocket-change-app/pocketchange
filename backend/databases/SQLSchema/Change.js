const Sequelize = require('sequelize');
const Conn = require("./Conn.js");

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