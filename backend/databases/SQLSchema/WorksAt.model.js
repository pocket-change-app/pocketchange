
//specifies relationship that a user works at a business in some role
module.exports = (sequelize, Sequelize) => {
    Business = require("./Business.model.js")(sequelize, Sequelize);
    User = require("./User.model.js")(sequelize, Sequelize);
    const WorksAt = sequelize.define("worksAt", {
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
        },
        role:{
            type: Sequelize.STRING, //owner, cashier, manager
            allowNull: false,
            primaryKey: true,
            validate: {
                isIn: [['owner', 'cashier', 'manager']] 
            }
        }
    });
  
    return WorksAt;
};