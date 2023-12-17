const Category = require('../models/category');



// Display Category create form on GET.
exports.category_create_get = async (req, res) => {
    res.render('category_form', { title: 'Create Category'});
}
// Handle Category create on POST.
exports.category_create_post = async (req, res) => {
    const category = new Category({
        name: req.body.name
    });
    try {
        await category.save();
        res.redirect('/books/create');
    } catch (err) {
        res.send(err.message);
    }
};

// Handle Category delete on POST.
exports.category_delete_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: Category delete POST');
};

