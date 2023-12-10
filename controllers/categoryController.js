const Category = require('../models/category');

// Display list of all Categories.
exports.category_list = async (req, res) => {
    try {
        const category_list = await Category.find();
        res.json(category_list);
    } catch (err) {
        res.send(err.message);
    }
};

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

// Display Category delete form on GET.
exports.category_delete_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: Category delete GET');
};

// Handle Category delete on POST.
exports.category_delete_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: Category delete POST');
};

// Display Category update form on GET.
exports.category_update_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: Category update GET');
};

// Handle Category update on POST.
exports.category_update_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: Category update POST');
};
