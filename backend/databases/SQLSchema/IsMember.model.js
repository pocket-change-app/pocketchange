

//specifies relationship that user is part of the pocket (either as a customer or in some management position)
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
        },
        role:{
            type: Sequelize.STRING, 
            allowNull: false,
            primaryKey: true,
            validate: {
                isIn: [['customer', 'manager']] //customer of Pocket, viewer of Pocket-level data, manager of Pocket
            }
        }
    });
  
    return IsMember;
};
