const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// add book to cart
router.post('/:id/addToCart', cartController.addToCart);


module.exports = router;
