module.exports = (sequelize, Sequelize) => {
    const Change = sequelize.define("change", {
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
        value: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        userID: {
            type: Sequelize.UUID,
            allowNull: false
        },
        expiryDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
  
    return Change;
};