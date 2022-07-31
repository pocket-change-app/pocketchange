module.exports = (sequelize, Sequelize) => {
    const Pocket = sequelize.define("pocket", {
        pocketID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        circulatingChange: {
            type: Sequelize.DECIMAL(19,4),
            allowNull: false
        },
        changeRate: {
            type: Sequelize.DECIMAL(19,4), 
            allowNull: false
        }
    });
  
    return Pocket;
};