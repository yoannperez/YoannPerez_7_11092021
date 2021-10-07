module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    text: {
      // type: DataTypes.STRING,
      type: DataTypes.TEXT,
      allowNull: false,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      onDelete: "CASCADE",
    });

    Post.hasMany(models.Commentaire, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Post.hasMany(models.Commentaire, {
    //   // through: "PostComments",
    //   foreignKey: {
    //     allowNull: true,
    //   },
    // });
  };

  return Post;
};
