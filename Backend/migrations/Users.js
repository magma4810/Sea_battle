module.exports = {
    up: async (queryInterface, DataTypes) => {
      await queryInterface.createTable('Users', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        games:{
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        wins:{
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        draw:{
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        defeat:{
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
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