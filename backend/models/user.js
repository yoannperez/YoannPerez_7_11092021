//                    -------------------------------------------------------
//                    --                      USER MODEL                   --
//                    -------------------------------------------------------
// --------------------------------------------------------------------------

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
      defaultValue: "https://vtours.360creaciones.com/formation/default-user.jpg",
    },

  });

  User.associate = (models) => {
    
    User.hasMany(models.Post, {
      foreignKey: "UserId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.Commentaire, {
      onDelete: "CASCADE",
    });
  };

  return User;
};
