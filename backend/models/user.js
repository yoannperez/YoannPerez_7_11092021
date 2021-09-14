//Import sequelize
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

// Import connection database
const sequelize = require("../config/database");
// const Countries = require("./Countries");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  // address: Sequelize.STRING,
  // phone: Sequelize.BIGINT,
  // countryCode:{
  //   type: Sequelize.STRING,
  //   references: {
  //     model: Countries,
  //     key: 'code'
  //   }
  // },
});

module.exports = User;

// Customers.belongsTo(Countries, {
//   foreignKey: "countryCode",
//   targetKey: "code"
// });

// Countries.hasMany(Customers, {
//   as: "getCustomers",
// });
