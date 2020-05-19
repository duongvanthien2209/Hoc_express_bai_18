const express = require('express');
const router = express.Router();

// Controllers
const transactionController = require('../controllers/transaction.controller');

// Get all
router.get('/', transactionController.getAll);

module.exports = router;