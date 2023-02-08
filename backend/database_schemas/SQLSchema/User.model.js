module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userID: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        }
    });
  
    return User;
};
