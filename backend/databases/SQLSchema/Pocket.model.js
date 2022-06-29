module.exports = (sequelize, Sequelize) => {
    const Pocket = sequelize.define("pocket", {
        ID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        circulatingChange: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        changeRate: {
            type: Sequelize.FLOAT, 
            allowNull: false
        }
    });
  
    return Pocket;
};