const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);
