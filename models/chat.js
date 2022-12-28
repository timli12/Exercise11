const mongoose = require('mongoose');
const c = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    say: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("chat", c);