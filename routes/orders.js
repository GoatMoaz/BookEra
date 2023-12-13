const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');

// get all orders
router.get('/', orderController.order_list);



module.exports = router;