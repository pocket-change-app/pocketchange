//specifies relationship that user has favourited a business
module.exports = (sequelize, Sequelize) => {
    const Loves = sequelize.define("loves", {
        userID: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        businessID:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        }
    });
  
    return Loves;
};
