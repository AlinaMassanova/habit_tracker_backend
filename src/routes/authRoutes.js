// 📁 src/routes/authRoutes.js
const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/test', (req, res) => {
  res.send('Сервер работает!');
});
module.exports = router;  