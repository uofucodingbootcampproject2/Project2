var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
  var Sitter = sequelize.define("Sitter", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
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
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
      valide: {
        len: [1]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      valide: {
        len: [1]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preferred_breed: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    preferred_size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      }
    },
    preferred_activity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    image_link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    liked_dogs: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  });

  Sitter.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  Sitter.hook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return Sitter;
};