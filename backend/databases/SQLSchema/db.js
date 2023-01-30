const dbConfig = require("./db_config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.URL)
// const sequelize = new Sequelize(
//     dbConfig.DB, //name of db
//     dbConfig.USER, //username
//     dbConfig.PASSWORD, //password
//     {
//         dialect: dbConfig.dialect,
//         host: dbConfig.HOST
//     }
// );

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//entities
db.Business = require("./Business.model.js")(sequelize, Sequelize);
db.User = require("./User.model.js")(sequelize, Sequelize);
db.Pocket = require("./Pocket.model.js")(sequelize, Sequelize);
db.Account = require("./Account.model.js")(sequelize, Sequelize);
db.Transaction = require("./Transaction.model.js")(sequelize, Sequelize);
db.Geolocation = require("./Geolocation.model.js")(sequelize, Sequelize);
db.Contest = require("./Contest.model.js")(sequelize, Sequelize);
db.QRScan = require("./QRScans.model.js")(sequelize, Sequelize);

// relationships
// TODO: add all relations and references for transaction table


db.IsIn = require("./IsIn.model.js")(sequelize, Sequelize);
db.IsMember = require("./IsMember.model.js")(sequelize, Sequelize);
db.Loves = require("./Loves.model.js")(sequelize, Sequelize);
db.WorksAt = require("./WorksAt.model.js")(sequelize, Sequelize);
db.ParticipatingIn = require("./ParticipatingIn.model.js")(sequelize, Sequelize);

//a business belongs to many pockets a pocket has many businesses
db.Business.belongsToMany(db.Pocket, { through : db.IsIn, unique: false,  foreignKey: 'businessID'});
db.Pocket.belongsToMany(db.Business, { through : db.IsIn, unique: false,  foreignKey: 'pocketID' });

//users can belong to many pockets, pockets can have many users
db.User.belongsToMany(db.Pocket, { through : db.IsMember, unique: false,  foreignKey: 'userID' });
db.Pocket.belongsToMany(db.User, { through : db.IsMember, unique: false,  foreignKey: 'pocketID'  });

//users can love many businesses, a business can be loved by many users
db.User.belongsToMany(db.Business, { through : db.Loves, unique: false,  foreignKey: 'userID'  });
db.Business.belongsToMany(db.User, { through : db.Loves, unique: false,  foreignKey: 'businessID'  });

//users can work at many businesses, a business can have many workers
db.User.belongsToMany(db.Business, { through : db.WorksAt, unique: false,  foreignKey: 'userID'   });
db.Business.belongsToMany(db.User, { through : db.WorksAt , unique: false,  foreignKey: 'businessID'  });

//QRScans belong to many users, users can have many QR scans

//Pockets belong to many contests, contests can have many pockets
db.Pocket.belongsToMany(db.Contest, { through : db.ParticipatingIn, unique: true,  foreignKey: 'pocketID'   });
db.Contest.belongsToMany(db.Pocket, { through : db.ParticipatingIn , unique: true,  foreignKey: 'contestID'  });


//do not drop databases, do not set force to true
sequelize.sync({})
.then(() => {
    console.log("\n\n\nsuccessfully connected to the SQL database\n\n\n");
})
.catch((error) => {
    console.log('error connecting to the SQL database');
    console.log(error)
});

module.exports = db;
