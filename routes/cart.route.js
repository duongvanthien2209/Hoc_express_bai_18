const express = require('express');
const router = express.Router();

// Controllers
const cartController = require('../controllers/cart.controller');

// Thêm sách vào giỏ
router.get('/add/:id', cartController.addBook);

// Thuê tất cả
router.get('/addAll', cartController.addAll);

module.exports = router;