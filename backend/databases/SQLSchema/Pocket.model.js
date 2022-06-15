module.exports = (sequelize, Sequelize) => {
    const Pocket = sequelize.define("pocket", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        circulatingPoints: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        changeRate: {
            type: Sequelize.FLOAT, 
            allowNull: false
        }
    });
  
    return Pocket;
};