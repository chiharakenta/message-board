'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('messages', 'title')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('messages', 'title', {
        allowNull: false,
        type: Sequelize.STRING,
        after: 'id'
      })
    ]);
  }
};
