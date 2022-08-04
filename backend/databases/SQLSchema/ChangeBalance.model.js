

module.exports = (sequelize, Sequelize) => {
    User = require("./User.model.js")(sequelize, Sequelize);
    Pocket = require("./Pocket.model.js")(sequelize, Sequelize);
    const ChangeBalance = sequelize.define("changeBalance", {
        changeBalanceID: {
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
        pocketID: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: Pocket,
                key: 'pocketID'
            }
        },
        value: {
            type: Sequelize.DECIMAL(19,4),
            allowNull: false
        },
        expiryDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
  
    return ChangeBalance;
};