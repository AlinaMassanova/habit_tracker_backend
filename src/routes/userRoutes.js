// 📁 src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

// Защищённый маршрут профиля
router.get('/profile', authMiddleware, UserController.getProfile);

module.exports = router;
