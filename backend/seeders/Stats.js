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
        defeat: 0,
        singleDeck: 0,
        doubleDecker: 0,
        threeDeck: 0,
        fourDeck: 0,
        shipsDestroyed: 0
      },
      {
        nickname: 'sardelka2018', 
        games: 228,
        winrate: 30,
        wins: 69,
        draw: 5,
        defeat: 154,
        singleDeck: 43,
        doubleDecker: 12,
        threeDeck: 432,
        fourDeck: 16,
        shipsDestroyed: 523
      },
      {
        nickname: 'vityok2015', 
        games: 632,
        winrate: 61,
        wins: 389,
        draw: 56,
        defeat: 187,
        singleDeck: 4251,
        doubleDecker: 532,
        threeDeck: 311,
        fourDeck: 139,
        shipsDestroyed: 4921
      },
      {
        nickname: 'lopuh3000', 
        games: 1021,
        winrate: 90,
        wins: 928,
        draw: 10,
        defeat: 83,
        singleDeck: 4751,
        doubleDecker: 332,
        threeDeck: 211,
        fourDeck: 39,
        shipsDestroyed: 5521
      },
      {
        nickname: 'kiborg777', 
        games: 421,
        winrate: 24,
        wins: 102,
        draw: 17,
        defeat: 302,
        singleDeck: 3751,
        doubleDecker: 1032,
        threeDeck: 161,
        fourDeck: 69,
        shipsDestroyed: 5021
      },
      {
        nickname: 'minipekka69', 
        games: 732,
        winrate: 66,
        wins: 489,
        draw: 29,
        defeat: 214,
        singleDeck: 3151,
        doubleDecker: 432,
        threeDeck: 111,
        fourDeck: 89,
        shipsDestroyed: 3721
      },
      {
        nickname: 'paporotnik4810', 
        games: 89,
        winrate: 65,
        wins: 58,
        draw: 11,
        defeat: 30,
        singleDeck: 325,
        doubleDecker: 150,
        threeDeck: 71,
        fourDeck: 28,
        shipsDestroyed: 611
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stats', null, {});
  }
};