// 📁 src/controllers/AuthController.js
const UserModel = require('../models/UserModel');
const TokenModel = require('../models/TokenModel');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const crypto = require('crypto');

// Регистрация
async function register(req, res) {
  try {
    // Валидация данных
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = req.body;

    // Проверяем, существует ли пользователь
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser.rows.length) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    // Создаём пользователя
    const newUser = await UserModel.createUser(name, email, password);

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser.rows[0] });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

// Вход
async function login(req, res) {
  try {
    // Валидация данных
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    // Проверяем, существует ли пользователь
    const userResult = await UserModel.findByEmail(email);
    if (!userResult.rows.length) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const user = userResult.rows[0];

    // Проверяем пароль (пока без хэша)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    // Создаём токен
    const token = crypto.randomBytes(64).toString('hex');
    await TokenModel.createToken(user.id, token);

    // Сохраняем токен в cookie
    res.cookie('authToken', token, { httpOnly: true });

    res.status(200).json({ message: 'Вход выполнен' });
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

module.exports = { register, login };
