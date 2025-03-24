require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Парсинг JSON и cookies
app.use(express.json());
app.use(cookieParser());

// Роуты
app.use('/auth', authRoutes);

// Обработка ошибок
app.use(errorHandler);

module.exports = app;
app.listen(3001, '0.0.0.0', () => console.log('🚀 Сервер запущен на порту 3001'));

