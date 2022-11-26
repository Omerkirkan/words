const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: [20, '{PATH} cannot be longer than {MAXLENGTH} characters'],
        minlength: [3, '{PATH} cannot be shorter than {MINLENGTH} characters']
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', UserSchema);