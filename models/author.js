const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
});

authorSchema.virtual('fullName').get(function () {
    return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model('Author', authorSchema);