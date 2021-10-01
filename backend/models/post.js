module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    text: {
      // type: DataTypes.STRING,
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Post.associate = (models) => {
    // Post.belongsTo(models.User, {
    //   foreignKey: {
    //     allowNull: false,
    //   },
    // });
    Post.belongsTo(models.User,{
      onDelete: "CASCADE",
    }
      
      
      );

    // Post.hasMany(models.Commentaire, {
    //   // through: "PostComments",
    //   foreignKey: {
    //     allowNull: true,
    //   },
    // });
  };

  return Post;
};
