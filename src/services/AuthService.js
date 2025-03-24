const bcrypt = require('bcrypt');
const crypto = require('crypto');
const UserModel = require('../models/UserModel');
const TokenModel = require('../models/TokenModel');

class AuthService {
  // Регистрация пользователя
  static async register(name, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await UserModel.createUser(name, email, hashedPassword);
      return result.rows[0];
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw new Error('Ошибка регистрации');
    }
  }

  // Вход пользователя
  static async login(email, password) {
    try {
      const result = await UserModel.findByEmail(email);
      if (!result || result.rows.length === 0) {
        throw new Error('Неверный email или пароль');
      }

      const user = result.rows[0];
      const isValid = await bcrypt.compare(password, user.password);
      console.log('Введенный пароль:', password);
      console.log('Хэш из базы:', user.password);

      if (!isValid) {
        throw new Error('Неверный email или пароль');
      }

      // Генерируем токен и срок действия (30 дней)
      const token = crypto.randomBytes(64).toString('hex');
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      console.log("Созданный токен:", token);
      console.log("Срок действия токена:", expiresAt);

      await TokenModel.createToken(user.id, token, expiresAt);

      return { userId: user.id, token };
    } catch (error) {
      console.error('Ошибка при входе:', error);
      throw new Error('Ошибка входа');
    }
  }
}

module.exports = AuthService;
