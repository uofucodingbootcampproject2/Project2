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
      valide: {
        len: [1]
      }
    },
    zipcode: {
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
      valide: {
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
      allowNull: true
    }
    
  });
  Sitter.associate = function (models) {
    Sitter.hasMany(models.Liked, {
      onDelete: "cascade"
    }),
    Sitter.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Sitter;
};