module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  });

  // Comments.associate = (models) => {
  //   Comments.belongsTo(models.Post, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  //   Comments.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };

  // Comments.associate = (models) => {
  //   Comments.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };

  return Comments;
};
