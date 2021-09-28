module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    
    description: {
      type: DataTypes.STRING,
      defaultValue:""
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue:"../images/default-user.jpg"
    },


  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Profile;
};
