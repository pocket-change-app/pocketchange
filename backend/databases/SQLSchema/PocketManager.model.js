module.exports = (sequelize, Sequelize) => {
    const PocketManager = sequelize.define("pocketManager", {
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
  
    return PocketManager;
};