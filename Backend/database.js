const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sea_battle', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres', 
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных установлено успешно.');
  } catch (error) {
    console.error('Не удалось установить соединение с базой данных:', error);
  }
};

connectToDatabase();

module.exports = sequelize;