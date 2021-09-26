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
      defaultValue:false,
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Post, {
      onDelete: "cascade",
    });

    User.hasOne(models.Profile, {
        onDelete: "cascade",
      });

  };

  

  return User;
};
