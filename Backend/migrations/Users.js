module.exports = {
    up: async (queryInterface, DataTypes) => {
      await queryInterface.createTable('Users', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        login: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password:{
          type: DataTypes.STRING,
          allowNull: false,
        }
      });
    }
  };