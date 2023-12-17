const Author = require('../models/author.js');



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


exports.deleteAuthor_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete POST');
}
