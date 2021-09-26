module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    text: {
      // type: DataTypes.STRING,
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Post;
};
