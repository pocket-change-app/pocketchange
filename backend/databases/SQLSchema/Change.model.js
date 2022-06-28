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
            type: Sequelize.FLOAT,
            allowNull: false
        },
        customerID: {
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