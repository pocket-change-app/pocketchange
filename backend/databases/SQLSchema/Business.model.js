module.exports = (sequelize, Sequelize) => {
    const Business = sequelize.define("business", {
        businessID: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        }
    });
  
    return Business;
};