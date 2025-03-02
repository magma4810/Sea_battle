module.exports = {
    up: async (queryInterface, DataTypes) => {
      await queryInterface.createTable('Stats', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        games:{
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        winrate:{
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
      });
    }
  };