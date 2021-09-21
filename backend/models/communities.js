//Import sequelize
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

// Import connection database
const sequelize = require("../config/database");
// const Countries = require("./Countries");

const Community = sequelize.define("communities", {
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {type:DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  members: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  posts: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
});

module.exports = Community;

