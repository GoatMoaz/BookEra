const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');

// get all orders
router.get('/', orderController.order_list);


// create one order
router.get('/create', orderController.order_create_get);
router.post('/create', orderController.order_create_post);

// delete one order
router.get('/:id/delete', orderController.order_delete_get);
router.post('/:id/delete', orderController.order_delete_post);

// update one order
router.get('/:id/update', orderController.order_update_get);
router.post('/:id/update', orderController.order_update_post);

// delete one order
router.get('/:id/delete', orderController.order_delete_get);
router.post('/:id/delete', orderController.order_delete_post);

// get one order
router.get('/:id', orderController.order_detail);

module.exports = router;