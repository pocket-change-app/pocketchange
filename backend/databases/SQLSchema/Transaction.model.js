module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        customerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        value:{
            type: Sequelize.FLOAT,
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
            type: Sequelize.FLOAT,
            allowNull: false
        },
        changeEarned: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });
  
    return Transaction;
};
