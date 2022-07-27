db.Business = require("./Business.model.js")(sequelize, Sequelize);
db.User = require("./User.model.js")(sequelize, Sequelize);

//specifies relationship that a user works at a business in some role
module.exports = (sequelize, Sequelize) => {
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
        pocketID:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Pocket,
                key: 'pocketID'
            }
        },
        role:{
            type: Sequelize.STRING, //owner, cashier, manager
            allowNull: false,
            primaryKey: true
        }
    });
  
    return WorksAt;
};