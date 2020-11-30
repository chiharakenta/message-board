'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('messages', 'title');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('messages', 'title', {
      allowNull: false,
      type: Sequelize.STRING
    });
  }
};
