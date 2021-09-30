

module.exports = (sequelize, DataTypes) => {
  const PostComment = sequelize.define("PostComment", {
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: model.Commentaire, // 'Movies' would also work
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: model.Post, // 'Movies' would also work
        key: "id",
      },
    },
  });

  // User.associate = (models) => {
    Commentaire.belongsToMany (model.Post, {through : PostComment});
    Post.belongsToMany (model.Commentaire, {through : PostComment});
    
  //   };

  return PostComment;
};



