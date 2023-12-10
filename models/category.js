const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        unique: true,
    },
});

module.exports = mongoose.model('Category', categorySchema);

