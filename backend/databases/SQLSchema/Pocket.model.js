module.exports = (sequelize, Sequelize) => {
    const Pocket = sequelize.define("pocket", {
        pocketID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        circulatingChange: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        changeRate: {
            type: Sequelize.DECIMAL(10,2), 
            allowNull: false
        }
    });
  
    return Pocket;
};