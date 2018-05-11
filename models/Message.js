var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    text: String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);