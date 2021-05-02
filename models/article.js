'use strict';
const {
  Model
} = require('sequelize');
const { getCurrentDate } = require('../helpers')
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
    author: {
      type : DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Article's author can't be null !`
        },
        notEmpty: {
          msg: `Article's author can't be empty !`
        }
      }
    },
    title: {
      type : DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Article's title can't be null !`
        },
        notEmpty: {
          msg: `Article's title can't be empty !`
        }
      }
    },
    body: {
      type : DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Article's body can't be null !`
        },
        notEmpty: {
          msg: `Article's body can't be empty !`
        }
      }
    },
    created: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate (instance) {
        instance.created = getCurrentDate() 
      }
    },
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'Article',
  });
  return Article;
};