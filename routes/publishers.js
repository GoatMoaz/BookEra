const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');

// create publisher
router.get('/create', publisherController.publisher_create_get);
router.post('/create', publisherController.publisher_create_post);

// delete publisher
router.get('/:id/delete', publisherController.publisher_delete_get);

module.exports = router;