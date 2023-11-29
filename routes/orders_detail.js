const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailController.js');

// get all orderDetails
router.get('/', orderDetailController.orderDetail_list);


// create one orderDetail
router.get('/create', orderDetailController.orderDetail_create_get);
router.post('/create', orderDetailController.orderDetail_create_post);

// delete one orderDetail
router.get('/:id/delete', orderDetailController.orderDetail_delete_get);
router.post('/:id/delete', orderDetailController.orderDetail_delete_post);

// update one orderDetail
router.get('/:id/update', orderDetailController.orderDetail_update_get);
router.post('/:id/update', orderDetailController.orderDetail_update_post);

// get one orderDetail
router.get('/:id', orderDetailController.orderDetail_detail);

module.exports = router;