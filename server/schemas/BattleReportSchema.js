var mongoose = require('mongoose');

module.exports = {
    name: String,
    date: String,
    sector: { type: mongoose.Schema.Types.ObjectId, ref: 'Sector' },
    conquered: Boolean
};