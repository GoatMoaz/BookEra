const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Seller', sellerSchema);