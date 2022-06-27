module.exports = (sequelize, Sequelize) => {
    const Business = sequelize.define("business", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        pocketId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        salt: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: false
        }
    });
  
    return Business;
};