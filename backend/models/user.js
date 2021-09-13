//Import sequelize
const Sequelize = require("sequelize");

// Import connection database
const sequelize = require("../config/database");
// const Countries = require("./Countries");

const Customers = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
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
module.exports = Customers;


// Customers.belongsTo(Countries, {
//   foreignKey: "countryCode",
//   targetKey: "code"
// });

// Countries.hasMany(Customers, {
//   as: "getCustomers",
// });



