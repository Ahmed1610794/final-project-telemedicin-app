const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// مسار تسجيل الحساب
router.post('/register', authController.registerPatient);

// مسار تسجيل الدخول
router.post('/login', authController.loginPatient);

// مسار تسجيل الخروج
router.post('/logout', authController.logoutPatient);

module.exports = router;