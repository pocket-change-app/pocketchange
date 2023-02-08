//specifies relationship that pocket is participating in the relevant contest
module.exports = (sequelize, Sequelize) => {
    Contest = require("./Contest.model.js")(sequelize, Sequelize);
    Pocket = require("./Pocket.model.js")(sequelize, Sequelize);
    const ParticipatingIn = sequelize.define("participatingIn", {
        contestID: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Contest,
                key: 'contestID'
            },
        },
        pocketID:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Pocket,
                key: 'pocketID'
            }
        }
    });
  
    return ParticipatingIn;
};
