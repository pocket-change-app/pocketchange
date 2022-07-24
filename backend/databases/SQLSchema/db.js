const dbConfig = require("./db_config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB, //name of db
    dbConfig.USER, //username
    dbConfig.PASSWORD, //password
    {
        dialect: dbConfig.dialect,
        host: dbConfig.HOST
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//entities
db.Business = require("./Business.model.js")(sequelize, Sequelize);
db.User = require("./User.model.js")(sequelize, Sequelize);
db.Pocket = require("./Pocket.model.js")(sequelize, Sequelize);
db.Change = require("./Change.model.js")(sequelize, Sequelize);
db.Transaction = require("./Transaction.model.js")(sequelize, Sequelize);

//relationships
db.IsIn = require("./IsIn.model.js")(sequelize, Sequelize);
db.IsMember = require("./IsMember.model.js")(sequelize, Sequelize);
db.Loves = require("./Loves.model.js")(sequelize, Sequelize);
db.WorksAt = require("./WorksAt.model.js")(sequelize, Sequelize);

sequelize.sync({force: true})
.then(() => {
    console.log("\n\n\nDatabase is up and running!\n\n\n");
})
.catch((error) => console.log(error));

module.exports = db;
