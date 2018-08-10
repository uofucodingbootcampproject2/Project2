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
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      valide: {
        len: [1]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      isUppercase: true,
      validate: {
        len: [2,2]
      }
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isNumeric: true,
      validate: {
        len: [4,5]
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
    }
    
  });
  Sitter.associate = function (models) {
    Sitter.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    }),
    Sitter.hasMany(models.Liked, {
      onDelete: "cascade"
    });
  };
  return Sitter;
};