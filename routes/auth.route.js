const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth.controller');

// Validations
const authValidate = require('../validations/auth.validate');

// Login
router.get('/login', authController.getLogin);

router.post('/login', authValidate.postLogin, authController.postLogin);

// Create
router.get('/create', authController.getCreate);

router.post('/create', authValidate.postCreate, authController.postCreate);

module.exports = router;