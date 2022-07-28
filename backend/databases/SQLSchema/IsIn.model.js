

//specifies relationship that business is in the relevant pocket
module.exports = (sequelize, Sequelize) => {
    Business = require("./Business.model.js")(sequelize, Sequelize);
    Pocket = require("./Pocket.model.js")(sequelize, Sequelize);
    const IsIn = sequelize.define("isIn", {
        businessID: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Business,
                key: 'businessID'
            },
            unique: true
        },
        pocketID:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Pocket,
                key: 'pocketID'
            }
        }
    });
  
    return IsIn;
};
