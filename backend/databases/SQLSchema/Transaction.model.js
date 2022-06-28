module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        ID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        customerID: {
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
        businessID: {
            type: Sequelize.UUID,
            allowNull: false
        },
        pocketID: {
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
