require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');


// Парсинг JSON и cookies
app.use(express.json());
app.use(cookieParser());

// Роуты
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/', testRoutes);
// Обработка ошибок
app.use(errorHandler);

module.exports = app;
app.listen(3001, '0.0.0.0', () => console.log('🚀 Сервер запущен на порту 3001'));

