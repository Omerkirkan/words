const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
    enword: {
        type: String,
        required: true
    },
    trword: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Word', WordSchema);