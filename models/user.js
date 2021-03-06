var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = function (models) {
  
    User.hasOne(models.Owner, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    }),
    User.hasOne(models.Sitter, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
