
//specifies relationship that user has favourited a business
module.exports = (sequelize, Sequelize) => {
    Business = require("./Business.model.js")(sequelize, Sequelize);
    User = require("./User.model.js")(sequelize, Sequelize);
    const Loves = sequelize.define("loves", {
        userID: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: User,
                key: 'userID'
            }
        },
        businessID:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Business,
                key: 'businessID'
            }
        }
    });
  
    return Loves;
};
