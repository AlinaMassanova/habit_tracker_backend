// 📁 src/controllers/AuthController.js
const AuthService = require('../services/AuthService');

class AuthController {
  // Регистрация пользователя
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const result = await AuthService.register(name, email, password);
      res.status(201).json({ message: 'Пользователь зарегистрирован', userId: result.id });
    } catch (error) {
      next(error);
    }
  }

  // Вход пользователя
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { userId, token } = await AuthService.login(email, password);
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
      });      
      res.json({ message: 'Вход выполнен' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
