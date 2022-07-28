

module.exports = (sequelize, Sequelize) => {
    Business = require("./Business.model.js")(sequelize, Sequelize);
    User = require("./User.model.js")(sequelize, Sequelize);
    Pocket = require("./Pocket.model.js")(sequelize, Sequelize);
    const Transaction = sequelize.define("transaction", {
        transactionID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        userID: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'userID'
            }
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
            allowNull: false,
            references: {
                model: Business,
                key: 'businessID'
            }
        },
        pocketID: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: Pocket,
                key: 'pocketID'
            }
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
