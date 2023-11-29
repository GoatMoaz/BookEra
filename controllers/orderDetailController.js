const OrderDetail = require('../models/orderDetail');

// Display list of all OrderDetails.
exports.orderDetail_list = async (req, res) => {
    try {
        const orderDetails = await OrderDetail.find({});
        res.status(200).json(orderDetails);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Display detail page for a specific OrderDetail.
exports.orderDetail_detail = async (req, res) => {
    try {
        const orderDetail = await OrderDetail.findById(req.params.id);
        res.status(200).json(orderDetail);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Display OrderDetail create form on GET.
exports.orderDetail_create_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: OrderDetail create GET');
};

// Handle OrderDetail create on POST.
exports.orderDetail_create_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: OrderDetail create POST');
};

// Display OrderDetail delete form on GET.
exports.orderDetail_delete_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: OrderDetail delete GET');
};

// Handle OrderDetail delete on POST.
exports.orderDetail_delete_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: OrderDetail delete POST');
};

// Display OrderDetail update form on GET.
exports.orderDetail_update_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: OrderDetail update GET');
};

// Handle OrderDetail update on POST.
exports.orderDetail_update_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: OrderDetail update POST');
};
