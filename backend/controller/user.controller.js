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
            const [getWaiters, metadata] = await sequelize.query(
                `select password from "Users" where login = :login;`,
                { 
                    replacements: {login} 
                } 
            );
            res.json(getWaiters);
        } catch (error) {
            console.error('Ошибка при получении данных пользователя', error);
            res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
        }
    }
    async getStatUsers(req,res){
        try {
            const [getWaiters, metadata] = await sequelize.query(
                `select nickname,games,winrate from "Stats" order by winrate desc;`,
                { 
                    replacements: {} 
                } 
            );
            res.json(getWaiters);
        } catch (error) {
            console.error('Ошибка при получении статистики пользователя', error);
            res.status(500).json({ error: 'Ошибка при получении статистики пользователя' });
        }
    }
}

module.exports = new UserController();