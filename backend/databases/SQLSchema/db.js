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

//a business belongs to one pocket ( we have businessId as unique in IsIn ), a pocket has many businesses
db.Business.belongsToMany(db.Pocket, { through : db.IsIn });
db.Pocket.belongsToMany(db.Business, { through : db.IsIn });

//users can belong to many pockets, pockets can have many users
db.User.belongsToMany(db.Pocket, { through : db.IsMember });
db.Pocket.belongsToMany(db.User, { through : db.IsMember });

//users can love many businesses, a business can be loved by many users
db.User.belongsToMany(db.Business, { through : db.Loves });
db.Business.belongsToMany(db.User, { through : db.Loves });

//users can work at many businesses, a business can have many workers
db.User.belongsToMany(db.Business, { through : db.WorksAt });
db.User.belongsToMany(db.Business, { through : db.WorksAt });

//do not drop databases, do not set force to true
sequelize.sync({})
.then(() => {
    console.log("\n\n\nDatabase is up and running!\n\n\n");
})
.catch((error) => console.log(error));

module.exports = db;
