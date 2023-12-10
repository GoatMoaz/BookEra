const Publisher = require('../models/publisher');

// get all publishers
exports.publisher_list = async (req, res) => {
    try {
        const publisher_list = await Publisher.find();
        res.json(publisher_list);
    } catch (err) {
        res.json({ message: err });
    }
};

// get publisher by id
exports.publisher_detail = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.params.id);
        res.json(publisher);
    } catch (err) {
        res.json({ message: err });
    }
};

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

exports.publisher_delete_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: Publisher delete POST');
};

// update publisher
exports.publisher_update_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: Publisher update GET');
};

exports.publisher_update_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: Publisher update POST');
};
