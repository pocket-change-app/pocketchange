//specifies relationship that business is in the relevant pocket
module.exports = (sequelize, Sequelize) => {
    const IsIn = sequelize.define("isIn", {
        businessID: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        pocketID:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        }
    });
  
    return IsIn;
};
