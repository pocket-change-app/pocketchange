

//specifies relationship that user is part of the pocket
module.exports = (sequelize, Sequelize) => {
    User = require("./User.model.js")(sequelize, Sequelize);
    Pocket = require("./Pocket.model.js")(sequelize, Sequelize);
    const IsMember = sequelize.define("isMember", {
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
        }
    });
  
    return IsMember;
};
