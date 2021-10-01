module.exports = (sequelize, DataTypes) => {
  const Commentaire = sequelize.define("Commentaire", {
    commentaire: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  });

  Commentaire.associate = (models) => {
    Commentaire.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    Commentaire.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Commentaire;
};
