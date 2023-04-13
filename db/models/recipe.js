'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'userId',
      });
      this.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: 'userId',
      });
      this.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'userId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Recipe.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Recipe',
    }
  );
  return Recipe;
};
