module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        salt: {
            type: Sequelize.UUID,
            allowNull: false
        }
    });
  
    return User;
};
