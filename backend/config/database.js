const { Sequelize } = require('sequelize')

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require ('dotenv').config();

// const database = new Sequelize('mysql://root:root@127.0.0.1:8889/tutofox');
const database = new Sequelize (

    process.env.SQL_DATABASE, //name database
    process.env.SQL_USER, // user database
    process.env.SQL_PASSWORD, // user password

    {
        host:process.env.SQL_SERVER,
        dialect:"mysql",
        port:"3306",
    }

);

database.sync();

module.exports = database