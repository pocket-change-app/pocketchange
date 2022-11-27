module.exports = (sequelize, Sequelize) => {
    Business = require("./Business.model.js")(sequelize, Sequelize);
    User = require("./User.model.js")(sequelize, Sequelize);
    Geolocation = require("./Geolocation.model.js")(sequelize, Sequelize);
    const QRScan = sequelize.define("QRScan", {
        QRScanID: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        userID: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: false,
            references: {
                model: User,
                key: 'userID',
                as: 'userID'
            }
        },
        businessID: {
            type: Sequelize.UUID,
            primaryKey: false,
            allowNull: false,
            references: {
                model: Business,
                key: 'businessID'
            }
        },
        geolocationID:{
            type: Sequelize.UUID,
            primaryKey: false,
            allowNull: false,
            references: {
                model: Geolocation,
                key: 'geolocationID'
            }
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            primaryKey: false
        }
    });
  
    return QRScan;
};