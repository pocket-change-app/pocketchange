module.exports = (sequelize, Sequelize) => {
    User = require("./User.model.js")(sequelize, Sequelize);
    const Role = sequelize.define("role", {
        roleID:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
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
        entityID:{ //either a businessID or a pocketID or 0 for pocketchange
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: false,
        },
        type:{ //either a merchant, leader, or pocketchange
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: false,
            validate: {
                isIn: [['merchant', 'leader', 'pocketchange']] 
            }
        },
        role:{
            type: Sequelize.STRING, //owner, cashier, manager
            allowNull: false,
            primaryKey: false,
            validate: {
                isIn: [['owner', 'cashier', 'manager', 'leader', 'admin']] 
            }
        }
    });

    //userID, entityID, type(merchant, leader, pocketchange), level(merchant: owner, cashier, manager, leader, pocketchange)
  
    return Role;
};