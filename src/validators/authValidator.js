const Joi = require('joi');

// Валидация для регистрации
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Имя не может быть пустым',
    'string.min': 'Имя должно содержать минимум 2 символа',
    'string.max': 'Имя не может быть длиннее 50 символов',
    'any.required': 'Имя обязательно для заполнения',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Некорректный email',
    'any.required': 'Email обязателен для заполнения',
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': 'Пароль не может быть пустым',
    'string.min': 'Пароль должен содержать минимум 6 символов',
    'string.max': 'Пароль не может быть длиннее 30 символов',
    'any.required': 'Пароль обязателен для заполнения',
  }),
});

// Валидация для входа
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Некорректный email',
    'any.required': 'Email обязателен для заполнения',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Пароль не может быть пустым',
    'any.required': 'Пароль обязателен для заполнения',
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
