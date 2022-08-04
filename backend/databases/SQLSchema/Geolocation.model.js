module.exports = (sequelize, Sequelize) => {
    User = require("./User.model.js")(sequelize, Sequelize);
    const Geolocation = sequelize.define("geolocation", {
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
            type: Sequelize.STRING, 
            allowNull: false,
            primaryKey: true,
            validate: {
                isIn: [['customer', 'viewer', 'manager']] //customer of Pocket, viewer of Pocket-level data, manager of Pocket
            }
        }
    });
  
    return Geolocation;
};