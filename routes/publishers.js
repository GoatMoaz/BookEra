const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');

// get all publishers
router.get('/', publisherController.publisher_list);


// create publisher
router.get('/create', publisherController.publisher_create_get);
router.post('/create', publisherController.publisher_create_post);

// delete publisher
router.get('/:id/delete', publisherController.publisher_delete_get);
router.post('/:id/delete', publisherController.publisher_delete_post);

// update publisher
router.get('/:id/update', publisherController.publisher_update_get);
router.post('/:id/update', publisherController.publisher_update_post);

// get publisher by id
router.get('/:id', publisherController.publisher_detail);

module.exports = router;