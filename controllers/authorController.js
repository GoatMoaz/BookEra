const Author = require('../models/author.js');

// get all authors
exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find({});
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get author by id
exports.getAuthorById = async (req, res) => {
    res.send('NOT IMPLEMENTED: Author detail');
}

// create author
exports.createAuthor_get = async (req, res) => {
    res.render('author_form', { title: 'Create Author' });
}

exports.createAuthor_post = async (req, res) => {
    const author = new Author({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    });
    try {
        await author.save();
        res.redirect('/books/create');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

// delete author
exports.deleteAuthor_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete GET');
}
exports.deleteAuthor_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete POST');
}

// update author
exports.updateAuthor_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: Author update GET');
}
exports.updateAuthor_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: Author update POST');
}

