module.exports = (sequelize, Sequelize) => {
    const Business = sequelize.define("business", {
        ID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        pocketID: {
            type: Sequelize.UUID,
            allowNull: false
        },
        salt: {
            type: Sequelize.UUID,
            allowNull: false
        }
    });
  
    return Business;
};