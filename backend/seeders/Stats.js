'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Stats', [
      {
        nickname: 'nagibator2005', 
        games: 0, 
        winrate:0,
        wins: 0,
        draw: 0,
        defeat: 0
      },
      {
        nickname: 'sardelka2018', 
        games: 228,
        winrate: 30,
        wins: 69,
        draw: 5,
        defeat: 154
      },
      {
        nickname: 'vityok2015', 
        games: 632,
        winrate: 61,
        wins: 389,
        draw: 56,
        defeat: 187
      },
      {
        nickname: 'lopuh3000', 
        games: 1021,
        winrate: 90,
        wins: 928,
        draw: 10,
        defeat: 83
      },
      {
        nickname: 'kiborg777', 
        games: 421,
        winrate: 24,
        wins: 102,
        draw: 17,
        defeat: 302
      },
      {
        nickname: 'minipekka69', 
        games: 732,
        winrate: 66,
        wins: 489,
        draw: 29,
        defeat: 214
      },
      {
        nickname: 'paporotnik4810', 
        games: 89,
        winrate: 65,
        wins: 58,
        draw: 11,
        defeat: 30
      },
      {
        nickname: 'emchous37127609919', 
        games: 12392,
        winrate: 91,
        wins: 11311,
        draw: 300,
        defeat: 1081
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stats', null, {});
  }
};