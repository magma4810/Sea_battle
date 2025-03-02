const userRouter = require('./routes/user.routes');
const express = require('express');
const Users = require("./models/Users");
const Stats = require("./models/Stats");
const sequelize = require('./database');
const PORT = 3000;
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const Cookies = require('js-cookie');

app.use(express.json())
app.use(cookieParser());
app.use(cors());

app.use('/api', userRouter);
const path = require('path');
app.use(
  session({
      store: new FileStore(), 
      secret: 'your-secret-key', 
      resave: false, 
      saveUninitialized: false, 
      cookie: {
          maxAge: 1000 * 60 * 60 * 24, 
          httpOnly: true, 
      },
  })
);

app.post('/api/login', (req, res) => {
  res.cookie('authenticated', "true", { maxAge: 86400000, httpOnly: false }); 
  const { nickname, password } = req.body;
  res.cookie('nickname', nickname, { maxAge: 86400000, httpOnly: false }); 
  const user = {
      nickname: nickname,
      password: password,
  };

  req.session.regenerate((err) => {
      if (err) {
          return res.status(500).json({ success: false, message: 'Ошибка при создании сессии' });
      }
      req.session.user = user;
      req.session.isAuthenticated = true;

      res.json({
          success: true,
          message: 'Успешно!',
          user: req.session.user,
      });
  });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('authenticated', { path: '/', domain: 'example.com' });
  res.clearCookie('guest', { path: '/', domain: 'example.com' });
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).json({ success: false, message: 'Ошибка при выходе' });
      }
      res.clearCookie('connect.sid'); 
      res.json({ success: true, message: 'Успешный выход' });
  });
});

// app.use((req, res, next) => {
//   req.setTimeout(10000); // 10 секунд
//   res.setTimeout(10000); // 10 секунд
//   next();
// });

app.get('/api/check-session', (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
});

const startServer = async () => {
  try {
    await sequelize.sync(); 
    console.log('База данных синхронизирована.');
    
    app.listen(PORT,'localhost', () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка синхронизации базы данных:', error);
  }
};

startServer();