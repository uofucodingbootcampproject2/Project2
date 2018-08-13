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
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [1,11]
      }
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [1,5]
      }
    }, 
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Owner.associate = function (models) {
    
    Owner.hasMany(models.Pet, {
      onDelete: "cascade"
    }),
    Owner.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Owner;
};