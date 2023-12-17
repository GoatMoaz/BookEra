const Publisher = require('../models/publisher');


// create publisher
exports.publisher_create_get = async (req, res) => {
    res.render('publisher_form', { title: 'Create Publisher' });
};

exports.publisher_create_post = async (req, res) => {
    const publisher = new Publisher({
        name: req.body.name,
    });

    try {
        await publisher.save();
        res.redirect('/books/create');
    } catch (err) {
        res.json({ message: err });
    }

};

// delete publisher
exports.publisher_delete_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: Publisher delete GET');
};

