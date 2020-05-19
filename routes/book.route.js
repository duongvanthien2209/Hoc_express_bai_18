const express = require('express');
const router = express.Router();

// Controllers
const bookController = require('../controllers/book.controller');

router.get('/', bookController.getInPage);

module.exports = router;