'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('messages', [
      {
        title: 'hoge',
        content: 'fuga',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'hoge',
        content: 'fuga',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('messages');
  }
};
