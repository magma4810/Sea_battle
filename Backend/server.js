const userRouter = require('./routes/user.routes');
const express = require('express');
const Users = require("./models/Users");
const sequelize = require('./database');
const PORT = 3000;
const app = express();
const cors = require("cors");

app.use(express.json())
app.use('/api', userRouter);
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend/dist")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

const startServer = async () => {
  try {
    await sequelize.sync(); 
    console.log('База данных синхронизирована.');
    
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка синхронизации базы данных:', error);
  }
};

startServer();