const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');

// get all orders
router.get('/', orderController.order_list);
router.post('/create', orderController.order_create_post);

router.get('/mybooks', orderController.order_mybooks);

module.exports = router;