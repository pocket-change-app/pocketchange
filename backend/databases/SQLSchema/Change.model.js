module.exports = (sequelize, Sequelize) => {
    const Change = sequelize.define("change", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        pocketId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        value: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        customerId: {
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