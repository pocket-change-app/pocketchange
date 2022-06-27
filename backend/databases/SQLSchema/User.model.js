module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        salt: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: false
        }
    });
  
    return User;
};
