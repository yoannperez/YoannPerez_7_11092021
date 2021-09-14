//Import sequelize
const { Sequelize, Op, Model, DataTypes } = require('sequelize')

// Import connection database
const sequelize = require("../config/database");
// const Countries = require("./Countries");

const Customers = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: DataTypes.STRING,
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
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = Customers;


// Customers.belongsTo(Countries, {
//   foreignKey: "countryCode",
//   targetKey: "code"
// });

// Countries.hasMany(Customers, {
//   as: "getCustomers",
// });



