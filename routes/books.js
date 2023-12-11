const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController.js');

// get all books
router.get('/', bookController.getAllBooks);
// get book by title
router.get('/search', bookController.search_book);

// get book by author
router.get('/author/:author', bookController.getBookByAuthor);

// get book by publisher
router.get('/publisher/:publisher', bookController.getBookByPublisher);

// get book by category
router.get('/category/:category', bookController.getBookByCategory);

// create book
router.get('/create', bookController.createBook_get);
router.post('/create', bookController.createBook_post);

// update book by id
router.get('/:id/update', bookController.updateBook_get);
router.post('/:id/update', bookController.updateBook_post);

// delete book by id
router.get('/:id/delete', bookController.deleteBook_get);
router.post('/:id/delete', bookController.deleteBook_post);

//get book by id
router.get('/:id', bookController.getBookById);

// export
module.exports = router;
