// 📁 src/models/UserModel.js
const db = require('../config/db');

class UserModel {
  // Создание пользователя
  static async createUser(name, email, password) {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email;
    `;
    return db.query(query, [name, email, password]);
  }

  // Поиск пользователя по email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1;';
    return db.query(query, [email]);
  }

  // Поиск пользователя по id
  static async findById(id) {
    const query = 'SELECT id, name, email FROM users WHERE id = $1;';
    const result = await db.query(query, [id]);
    return result.rows[0]; // Возвращаем пользователя
  }
}

module.exports = UserModel;

