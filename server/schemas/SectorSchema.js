var mongoose = require('mongoose');

module.exports = {
    code: String,
    owner: String,
    upgrade: { type: mongoose.Schema.Types.ObjectId, ref: 'SectorType' },
    secured: String
};