const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/categoryController');

router.get('/create', category_controller.category_create_get);
router.post('/create', category_controller.category_create_post);
router.post('/:id/delete', category_controller.category_delete_post);

module.exports = router;
