module.exports = function (sequelize, DataTypes) {
  var Liked = sequelize.define("Liked", {
    Owner_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  // Dog_ID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   validate: {
  //     len: [1]
  //   }
  // },
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