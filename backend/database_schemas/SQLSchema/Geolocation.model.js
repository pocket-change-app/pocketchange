module.exports = (sequelize, Sequelize) => {
    User = require("./User.model.js")(sequelize, Sequelize);
    const Geolocation = sequelize.define("geolocation", {
        geolocationID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userID: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: false,
            references: {
                model: User,
                key: 'userID'
            }
        },
        timestamp:{
            type: Sequelize.DATE(6),
            primaryKey: false,
            allowNull: false,
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