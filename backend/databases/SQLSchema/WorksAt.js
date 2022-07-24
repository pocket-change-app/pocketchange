//specifies relationship that a user works at a business in some role
module.exports = (sequelize, Sequelize) => {
    const WorksAt = sequelize.define("worksAt", {
        userID: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        pocketID:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        role:{
            type: Sequelize.STRING, //owner, cashier, manager
            allowNull: false,
            primaryKey: true
        }
    });
  
    return WorksAt;
};