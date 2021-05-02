'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.TEXT
      },
      body: {
        type: Sequelize.TEXT
      },
      created: {
        type: Sequelize.DATE
      },
      updated: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Articles');
  }
};