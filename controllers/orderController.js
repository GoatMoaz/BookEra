const Order = require('../models/order');

// Display list of all Orders.
exports.order_list = async (req, res) => {
    res.send('NOT IMPLEMENTED: Order list');
};

// Display detail page for a specific Order.
exports.order_detail = async (req, res) => {
    res.send('NOT IMPLEMENTED: Order detail: ' + req.params.id);
};

// Display Order create form on GET.
exports.order_create_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: Order create GET');
};

// Handle Order create on POST.
exports.order_create_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: Order create POST');
};

// Display Order delete form on GET.
exports.order_delete_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: Order delete GET');
};

// Handle Order delete on POST.
exports.order_delete_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: Order delete POST');
};

// Display Order update form on GET.
exports.order_update_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: Order update GET');
};

// Handle Order update on POST.
exports.order_update_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: Order update POST');
};
