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
        timestamp:{
            type: Sequelize.timestamp,
            allowNull: false,
            primaryKey: true,
        },
        latitude:{
            type: Sequelize.DECIMAL(9,6),
            allowNull: false,
            primaryKey: false,
        },
        longitude:{
            type: Sequelize.DECIMAL(9,6), 
            allowNull: false,
            primaryKey: false,
        }
    });
  
    return Geolocation;
};