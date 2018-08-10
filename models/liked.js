module.exports = function (sequelize) {
  var Liked = sequelize.define("Liked", {
  // User_ID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   validate: {
  //     len: [1]
  //   }
  // },
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