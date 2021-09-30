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
      defaultValue:""
    },

    imageUrl: {
      type: DataTypes.STRING,
      defaultValue:"http://localhost:3000/images/default-user.jpg"
    },

  });
  
  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey : 'id',
      onDelete: "cascade",
    });
    Post.belongTo(User);

    // User.hasOne(models.Profile, {
    //   onDelete: "cascade",
    // });
  };

  return User;
};
