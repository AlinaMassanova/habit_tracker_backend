// 📁 src/controllers/UserController.js
const UserModel = require('../models/UserModel');

class UserController {
  static async getProfile(req, res) {
    try {
      // Используем req.userId, который передаёт middleware
      const user = await UserModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      // Отправляем профиль пользователя
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error('Ошибка при получении профиля:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = UserController;
