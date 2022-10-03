//date, businessID, consumerID, pocketID, competitionID
module.exports = (sequelize, Sequelize) => {
    Business = require("./Business.model.js")(sequelize, Sequelize);
    User = require("./User.model.js")(sequelize, Sequelize);
    Gelocation = require("./Geolocation.model.js")(sequelize, Sequelize);
    const QRScans = sequelize.define("QRScans", {
        QRScanID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        userID: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'userID'
            }
        },
        businessID: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: Business,
                key: 'businessID'
            }
        },
        geolocationID:{
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: Geolocation,
                key: 'geolocationID'
            }
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
  
    return QRScans;
};