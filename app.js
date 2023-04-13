const express = require('express');

const app = express();
require('@babel/register');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const session = require('express-session'); // Подключаем модуль express-session.
const FileStore = require('session-file-store')(session); // Подключаем модуль session-file-store.

const sessionConfig = {
  name: 'WhalesCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: true,
  },
};

app.use(session(sessionConfig)); // Подключаем сессии как middleware.
app.use((req, res, next) => {
  next();
});

// импорт вспомогательных ф-й
const dbCheck = require('./db/dbCheck');

// импорт роутов
const mainRoute = require('./routes/main.route');
const loginRoute = require('./routes/login.route');
const regRouter = require('./routes/register.route');
const logoutRoute = require('./routes/logout.route');

// вызов функции проверки соединения с базоый данных
dbCheck();

app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// роутеры
app.use('/', mainRoute);
app.use('/auth/login', loginRoute);
app.use('/auth/register', regRouter);
app.use('/auth/logout', logoutRoute);

const PORT = process.env.PORT || 3100;
app.listen(PORT, (err) => {
  if (err) return console.log('Ошибка запуска сервера.', err.message);
  console.log(`Сервер запущен на http://localhost:${PORT} `);
});
