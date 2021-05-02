'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Article.init({
    author: DataTypes.TEXT,
    title: DataTypes.TEXT,
    body: DataTypes.TEXT,
    created: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'Article',
  });
  return Article;
};