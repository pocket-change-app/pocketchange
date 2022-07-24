module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        transactionID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        userID: {
            type: Sequelize.UUID,
            allowNull: false
        },
        value:{
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        businessID: {
            type: Sequelize.UUID,
            allowNull: false
        },
        pocketID: {
            type: Sequelize.UUID,
            allowNull: false
        },
        changeRedeemed: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        changeEarned: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        }
    });
  
    return Transaction;
};
