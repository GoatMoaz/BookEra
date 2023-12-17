const express = require('express');
const router = express.Router();
const author_controller = require('../controllers/authorController');

router.post('/create', author_controller.createAuthor_post);

router.post('/:id/delete', author_controller.deleteAuthor_post);


module.exports = router;
