const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// add book to cart
router.post('/:id/addToCart', cartController.addToCart);

// delete book from cart
router.post('/:id/deleteFromCart', cartController.deleteFromCart);


module.exports = router;
