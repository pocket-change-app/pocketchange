const Sequelize = require('sequelize');
const Conn = require("./Conn.js");

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