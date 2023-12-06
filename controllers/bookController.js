const Book = require('../models/book.js');
const Review = require('../models/review.js');
const Publisher = require('../models/publisher.js');
const Author = require('../models/author.js');
const Category = require('../models/category.js');

// get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({}).populate('publisher').populate('authors').populate('categories');
        // send books to books.ejs
        res.render('books', { title: 'Books', books: books });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// get book by id
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('publisher').populate('authors').populate('categories');
        // send book to bookInstance.ejs with its reviews
        // get reviews with book id = req.params.id and store each user's username in reviews
        const reviews = await Review.find({book: req.params.id}).populate('user', 'username');
        res.render('bookInstance', { title: 'Book Instance', book: book, reviews});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// get book by title
exports.getBookByTitle = async (req, res) => {
    try {
        const book = await Book.findOne({title: req.params.title});
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get book by author
exports.getBookByAuthor = async (req, res) => {
    try {
        const book = await Book.findOne({author: req.params.author});
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get book by publisher
exports.getBookByPublisher = async (req, res) => {
    res.send('get book by publisher');
}

// get book by category
exports.getBookByCategory = async (req, res) => {
    res.send('get book by category');
}

// create book
exports.createBook_get = async (req, res) => {
    res.send('create book get');
}
exports.createBook_post = async (req, res) => {
    res.send('create book post');
}

// update book by id
exports.updateBook_get = async (req, res) => {
    res.send('update book get');
}
exports.updateBook_post = async (req, res) => {
    res.send('update book post');
}

// delete book by id
exports.deleteBook_get = async (req, res) => {
    res.send('delete book get');
}
exports.deleteBook_post = async (req, res) => {
    res.send('delete book post');
}
