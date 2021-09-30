module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
      
      description: {
        type: DataTypes.STRING,
        defaultValue:""
      },
  
    });
  
    // Profile.associate = (models) => {
    //   Profile.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false,
    //     },
    //   });
    // };
  
    return Comments;
  };