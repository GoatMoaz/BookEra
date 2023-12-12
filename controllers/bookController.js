const Book = require('../models/book.js');
const Review = require('../models/review.js');
const Publisher = require('../models/publisher.js');
const Author = require('../models/author.js');
const Category = require('../models/category.js');
const User = require('../models/user.js');
const Cart = require('../models/cart.js');

const multer = require('multer');
const cloudinary = require('cloudinary');
const path = require('path');
// multer config
const storage = multer.diskStorage({});
const upload = multer({ storage });

require('dotenv').config();

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({})
            .populate('publisher')
            .populate('authors')
            .populate('categories');
        // send books to books.ejs
        const cart = req.session.cart || [];
        res.render('books', { title: 'Books', books: books, cart });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// get book by id
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('publisher')
            .populate('authors')
            .populate('categories');
        // send book to bookInstance.ejs with its reviews
        // get reviews with book id = req.params.id and store each user's username in reviews
        const reviews = await Review.find({ book: req.params.id }).populate(
            'user',
            'username',
        );
        res.render('bookInstance', {
            title: 'Book Instance',
            book: book,
            reviews,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// search book by title, author, publisher, category

exports.search_book = async (req, res) => {
    try {
        const title = req.query.title;
        const author = req.query.author;
        const publisher = req.query.publisher;
        const category = req.query.category;
        const query = {};
        if (title) {
            query.title = title;
            query.title = new RegExp(title, 'i');
        }
        if (author) {
            query.authors = author;
            query.authors = new RegExp(author, 'i');
        }
        if (publisher) {
            query.publisher = publisher;
            query.publisher = new RegExp(publisher, 'i');
        }
        if (category) {
            query.categories = category;
            query.categories = new RegExp(category, 'i');
        }
        const books = await Book.find(query)
            .populate('publisher')
            .populate('authors')
            .populate('categories');
        res.render('bookSearchResult', { title: 'Books', books: books });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get book by author
exports.getBookByAuthor = async (req, res) => {
    res.send('get book by author');
};

// get book by publisher
exports.getBookByPublisher = async (req, res) => {
    res.send('get book by publisher');
};

// get book by category
exports.getBookByCategory = async (req, res) => {
    res.send('get book by category');
};

// create book
exports.createBook_get = async (req, res) => {
    // Check if user is logged in

    if (!req.user) {
        req.flash('error', 'You must be logged in to create a book');
        return res.redirect('/users/login');
    } else {
        // check if logged in user is a seller
        const user = await User.findById(req.user._id);
        if (!user.type === 'seller') {
            req.flash('error', 'You must be a seller to create a book');
            return res.redirect('/books');
        }
    }

    try {
        const authors = await Author.find({});
        const publishers = await Publisher.find({});
        const categories = await Category.find({});
        res.render('createBook', { authors, publishers, categories });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

};

       

exports.createBook_post = async (req, res) => {
    try {
        const { title, isbn, description, authors, publisher, price, cover, categories, quantity } = req.body;
        console.log(req.body);
        console.log(req.file);

        // Upload file to Cloudinary using unsigned upload
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'bookstore',
            // resource is a pdf
            resource_type: 'raw',
            // use unsigned upload
            upload_preset: 'bookstore',
        });

        const newBook = new Book({
            title,
            isbn,
            description,
            authors,
            publisher,
            price,
            cover,
            categories,
            quantity,
            softCopy: result.secure_url, // Save Cloudinary URL
            seller: req.user._id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await newBook.save();

        req.flash('success', 'Book created successfully');
        res.redirect(`/books/${newBook._id}`);
    } catch (err) {
        console.log(err);
        req.flash('error', 'Error creating book');
        res.redirect('/books/create');
    }
};

// update book by id
exports.updateBook_get = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('authors')
            .populate('publisher')
            .populate('categories');
        const authors = await Author.find({});
        const publishers = await Publisher.find({});
        const categories = await Category.find({});
        res.render('updateBook', { book, authors, publishers, categories });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.updateBook_post = async (req, res) => {
    try {
        const {
            title,
            isbn,
            description,
            authors,
            publisher,
            price,
            cover,
            categories,
            quantity,
        } = req.body;
        const seller = req.user._id;

        // if not seller, redirect to books
        if (!seller) {
            req.flash('error', 'You are not authorized to update this book');
            return res.redirect('/books');
        }

        const updatedBook = {
            title,
            isbn,
            description,
            authors,
            publisher,
            price,
            cover,
            categories,
            quantity,
            seller,
            updatedAt: new Date(),
        };

        await Book.findByIdAndUpdate(req.params.id, updatedBook);

        req.flash('success', 'Book updated successfully');
        res.redirect(`/books/${req.params.id}`);
    } catch (err) {
        console.log(err);
        req.flash('error', 'Error updating book');
        res.redirect(`/books/${req.params.id}/update`);
    }
};

// delete book by id
exports.deleteBook_get = async (req, res) => {
    res.send('delete book get');
};
exports.deleteBook_post = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!req.user) {
            req.flash('error', 'You are not authorized to delete this book');
            return res.redirect('/books');
        }

        if (req.user._id.toString() === book.seller._id.toString()) {
            // delete reviews of this book
            await Review.deleteMany({ book: req.params.id });

            await Book.findByIdAndDelete(req.params.id);

            req.flash('success', 'Book deleted successfully');
            return res.redirect('/books');
        } else {
            req.flash('error', 'You are not authorized to delete this book');
            return res.redirect('/books');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.addToCart = async function(req, res, next) {
    const userId = req.user._id;
    const bookId = req.body.bookId;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({ user: userId });
    }

    cart.books.push(bookId);
    await cart.save();

    res.redirect('/books');
};exports.addToCart = async function(req, res, next) {
    const userId = req.user._id;
    const bookId = req.body.bookId;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({ user: userId });
    }

    cart.books.push(bookId);
    await cart.save();

    res.redirect('/books');
};