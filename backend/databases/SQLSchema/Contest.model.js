module.exports = (sequelize, Sequelize) => {
    Pocket = require("./Pocket.model.js")(sequelize, Sequelize);
    const Contest = sequelize.define("contest", {
        contestID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        prizeValue:{
            type: Sequelize.DECIMAL(19,4),
            allowNull: false
        },
        pocketID: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: Pocket,
                key: 'pocketID'
            }
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
  
    return Contest;
};