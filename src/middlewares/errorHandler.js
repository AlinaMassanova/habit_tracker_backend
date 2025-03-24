// 📁 src/middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error('Ошибка:', err);
  
    const statusCode = err.status || 500;
    const message = err.message || 'Внутренняя ошибка сервера';
  
    res.status(statusCode).json({ error: message });
  };
  module.exports = errorHandler;
  