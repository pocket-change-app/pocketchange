//specifies relationship that user is part of the pocket (either as a customer or in some management position)
module.exports = (sequelize, Sequelize) => {
    const IsMember = sequelize.define("isMember", {
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
            type: Sequelize.STRING, //member of Pocket, manager of Pocket, BIA-level manager of Pocket
            allowNull: false,
            primaryKey: true
        }
    });
  
    return IsMember;
};
