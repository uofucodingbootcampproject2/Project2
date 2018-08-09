module.exports = function (sequelize, DataTypes) {

  var Pet = sequelize.define("Pet", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      valide: {
        len: [1]
      }
    },
    social_w_people: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    social_w_dogs: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    favorite_activities: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 160]
      }
    },
    leashed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    activity_level: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sitter_gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });
  Pet.associate = function (models) {

    Pet.belongsTo(models.Owner, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Pet;
};
