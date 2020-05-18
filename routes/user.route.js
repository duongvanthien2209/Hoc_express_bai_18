const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/user.controller');

// Validations

// Get all
router.get('/', userController.getAll);

// Delete
router.get('/delete/:id' , userController.getDelete);

module.exports = router;