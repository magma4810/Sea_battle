'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'nagibator2005', 
        login: 'nagibator2005',
        password: 'nagibator2005'
      },
      {
        username: 'sardelka2018', 
        login: 'sardelka2018',
        password: 'sardelka2018'
      },
      {
        username: 'vityok2015', 
        login: 'vityok2015',
        password: 'vityok2015'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};