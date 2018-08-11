module.exports = function (sequelize, DataTypes) {
  var Liked = sequelize.define("Liked", {
    Owner_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    Owner_likes_Sitter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  Liked.associate = function (models) {

    Liked.belongsTo(models.Pet, {
      foreignKey: {
        allowNull: false
      }
    }),

    Liked.belongsTo(models.Sitter, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Liked;
  
};
