require('dotenv').config();
module.exports = {
    HOST: process.env.DB_HOST,
    USER: 'root',
    PASSWORD: 'password',
    DB: process.env.DB_DB,
    dialect: "mysql"
};