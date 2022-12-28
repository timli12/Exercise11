const mongoose = require('mongoose');
const c = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    say: {
        type: String,
        required: true
    },
    time: {
        type: String,
        default: Date
    }
});
module.exports = mongoose.model("chat", c);