const sequelize = require('../database');

class UserController{
    async createNewUser(req, res) {
        const { username, login, password } = req.body;
      
        // Начинаем транзакцию
        const transaction = await sequelize.transaction();
      
        try {
          // Первый запрос: добавление пользователя
          await sequelize.query(
            'INSERT INTO "Users" (nickname, login, password) VALUES (:username, :login, :password)',
            {
              replacements: { username, login, password },
              transaction, // Передаем транзакцию
            }
          );
      
          // Второй запрос: добавление статистики
          await sequelize.query(
            'INSERT INTO "Stats" (nickname) VALUES (:username)',
            {
              replacements: { username },
              transaction, // Передаем транзакцию
            }
          );
      
          // Фиксируем транзакцию
          await transaction.commit();
      
          res.json({ message: 'Пользователь успешно создан' });
        } catch (error) {
          // Откатываем транзакцию в случае ошибки
          await transaction.rollback();
      
          console.error('Ошибка при добавлении нового пользователя:', error);
          res.status(500).json({ error: 'Ошибка при добавлении нового пользователя' });
        }
      }

    async getUserPassword(req,res){
        const login = req.params.login;
        try {
            const [getData, metadata] = await sequelize.query(
                `select password from "Users" where login = :login;`,
                { 
                    replacements: {login} 
                } 
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при получении данных пользователя', error);
            res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
        }
    }
    async getStatUsers(req,res){
        try {
            const [getData, metadata] = await sequelize.query(
                `select nickname,games,winrate from "Stats" order by winrate desc;`,
                { 
                    replacements: {} 
                } 
            );
            res.json(getData);
        } catch (error) {
            console.error('Ошибка при получении статистики пользователeй', error);
            res.status(500).json({ error: 'Ошибка при получении статистики пользователей' });
        }
    }
    async getStatUserByNickname(req,res){
      const nickname = req.params.nickname;
      try {
          const [getData, metadata] = await sequelize.query(
              `select * from "Stats" where nickname=:nickname;`,
              { 
                  replacements: {nickname} 
              } 
          );
          res.json(getData);
      } catch (error) {
          console.error('Ошибка при получении статистики пользователя', error);
          res.status(500).json({ error: 'Ошибка при получении статистики пользователя' });
      }
  }
  async updateStatUserByNickname(req, res) {
    const { games, winrate, wins, draw, defeat, singleDeck, doubleDecker, threeDeck, fourDeck, shipsDestroyed } = req.body;
    const nickname = req.params.nickname;
  
    try {
      const [getData, metadata] = await sequelize.query(
        `UPDATE "Stats" 
         SET games = :games, 
             winrate = :winrate, 
             wins = :wins, 
             draw = :draw, 
             defeat = :defeat, 
             "singleDeck" = :singleDeck, 
             "doubleDecker" = :doubleDecker, 
             "threeDeck" = :threeDeck, 
             "fourDeck" = :fourDeck, 
             "shipsDestroyed" = :shipsDestroyed 
         WHERE nickname = :nickname;`,
        {
          replacements: { 
            nickname, 
            games, 
            winrate, 
            wins, 
            draw, 
            defeat, 
            singleDeck, 
            doubleDecker, 
            threeDeck, 
            fourDeck, 
            shipsDestroyed 
          },
        }
      );
  
      res.json(getData);
    } catch (error) {
      console.error('Ошибка при изменении статистики пользователя', error);
      res.status(500).json({ error: 'Ошибка при изменении статистики пользователя' });
    }
  }
  async updateDefeatAndWinrate(req, res) {
    const {games,winrate,defeat} = req.body;
    const nickname = req.params.nickname;
  
    try {
      const [getData, metadata] = await sequelize.query(
        `UPDATE "Stats" SET games=:games, winrate = :winrate, defeat = :defeat WHERE nickname = :nickname;`,
        {
          replacements: { 
            games,
            winrate, 
            defeat, 
            nickname
          },
        }
      );
  
      res.json(getData);
    } catch (error) {
      console.error('Ошибка при изменении статистики пользователя', error);
      res.status(500).json({ error: 'Ошибка при изменении статистики пользователя' });
    }
  }
}

module.exports = new UserController();