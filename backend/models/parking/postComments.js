

const comments = require("../comments");
const post = require("../post");

module.exports = (sequelize, DataTypes) => {
  const postComments = sequelize.define("postComments", {
    CommentId: {
      type: DataTypes.INTEGER,
      references: {
        model: comments, // 'Movies' would also work
        key: "id",
      },
    },
    PostId: {
      type: DataTypes.INTEGER,
      references: {
        model: post, // 'Movies' would also work
        key: "id",
      },
    },
  });

  comments.belongsToMany (post, {through : postComments});
  post.belongsToMany (comments, {through : postComments});

  return PostComments;
};



