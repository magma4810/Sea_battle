'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        nickname: 'nagibator2005', 
        login: 'nagibator2005',
        password: 'nagibator2005'
      },
      {
        nickname: 'sardelka2018', 
        login: 'sardelka2018',
        password: 'sardelka2018'
      },
      {
        nickname: 'vityok2015', 
        login: 'vityok2015',
        password: 'vityok2015'
      },
      {
        nickname: 'lopuh3000', 
        login: 'lopuh3000',
        password: 'lopuh3000'
      },
      {
        nickname: 'kiborg777', 
        login: 'kiborg777',
        password: 'kiborg777'
      },
      {
        nickname: 'minipekka69', 
        login: 'minipekka69',
        password: 'minipekka69'
      },
      {
        nickname: 'paporotnik4810', 
        login: 'paporotnik4810',
        password: 'paporotnik4810'
      },
      {
        nickname: 'emchous37127609919', 
        login: 'emchous37127609919',
        password: 'emchous37127609919'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};