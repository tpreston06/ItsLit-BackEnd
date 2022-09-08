const mongoose = require('mongoose');

const littySchema = new mongoose.Schema({
    description: String,
    complete: Boolean
});

const Litty = mongoose.model('ItsLit', littySchema);

module.exports = Litty;