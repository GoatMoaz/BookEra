const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Buyer', buyerSchema);