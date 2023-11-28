const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    order_date: {
        type: Date,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
        min: 0,
    },
    order_details: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderDetail',
    }],
});

module.exports = mongoose.model('Order', orderSchema);