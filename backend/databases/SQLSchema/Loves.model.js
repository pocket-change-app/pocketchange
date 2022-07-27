db.Business = require("./Business.model.js")(sequelize, Sequelize);
db.User = require("./User.model.js")(sequelize, Sequelize);

//specifies relationship that user has favourited a business
module.exports = (sequelize, Sequelize) => {
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
