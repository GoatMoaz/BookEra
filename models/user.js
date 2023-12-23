const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
        enum: ['male', 'female'],
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    wallet_amount: {
        type: Number,
        required: false,
        min: 0,
    },
    type: {
        type: String,
        required: true,
        enum: ['buyer', 'seller'],
    },
    address: {
        type: String,
        required: false,
    },
    cart : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    },
});

userSchema.virtual('fullName').get(function () {
    return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model('User', userSchema);
