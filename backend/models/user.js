const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "http://localhost:3000/images/default-user.jpg",
    },

    // PostsIds:{
    //   allowNull:true,
    //   type :DataTypes.INTEGER,
    //   onDelete: 'CASCASDE',
    //   references:{
    //     model:'Post',
    //     key:'UserId'
    //   }
    // }
  });

  User.associate = (models) => {
    // User.hasMany(models.Post, {
    //   foreignKey:'UserId',
    //   as: 'Post',
    //   constraints:false,
    //   allowNull:true,
    //   defaultValue:null,
    //   onDelete: "cascade",
    // });
    User.hasMany(models.Post, {
      foreignKey: "UserId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // User.hasMany(models.Commentaire, {
    //   onDelete: "cascade",
    // });
  };

  return User;
};
