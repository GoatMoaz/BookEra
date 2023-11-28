// use bookController.js instead:

// routes for books
// =============================================================
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController.js');

// get all books
router.get('/', bookController.getAllBooks);

// export
module.exports = router;
