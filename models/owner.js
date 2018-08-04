var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var Owner = sequelize.define("Owner", {
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
  });
  Owner.associate = function(models) {
    Owner.hasMany(models.Pet, {
      onDelete: "cascade"
    });
  };
  Owner.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  Owner.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return Owner;
};