const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/categoryController');

// get all categories
router.get('/', category_controller.category_list);


// create one category
router.get('/create', category_controller.category_create_get);
router.post('/create', category_controller.category_create_post);

// delete one category
router.get('/:id/delete', category_controller.category_delete_get);
router.post('/:id/delete', category_controller.category_delete_post);

// update one category
router.get('/:id/update', category_controller.category_update_get);
router.post('/:id/update', category_controller.category_update_post);

module.exports = router;
