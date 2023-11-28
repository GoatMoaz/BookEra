// routes for books
// =============================================================
const express = require('express');
const router = express.Router();
const Book = require('../models/book.js');
const User = require('../models/user.js');

// get all books async
module.exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json(err);
    }
}


