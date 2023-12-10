const express = require('express');
const router = express.Router();
const author_controller = require('../controllers/authorController');

// get all authors
router.get('/', author_controller.getAllAuthors);

// create author
router.get('/create', author_controller.createAuthor_get);
router.post('/create', author_controller.createAuthor_post);

// delete author
router.get('/:id/delete', author_controller.deleteAuthor_get);
router.post('/:id/delete', author_controller.deleteAuthor_post);

// update author
router.get('/:id/update', author_controller.updateAuthor_get);
router.post('/:id/update', author_controller.updateAuthor_post);

// get author by id
router.get('/:id', author_controller.getAuthorById);

module.exports = router;
