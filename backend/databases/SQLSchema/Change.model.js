

module.exports = (sequelize, Sequelize) => {
    User = require("./User.model.js")(sequelize, Sequelize);
    Pocket = require("./Pocket.model.js")(sequelize, Sequelize);
    const Change = sequelize.define("change", {
        changeID: {
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
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        expiryDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
  
    return Change;
};