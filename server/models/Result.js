var mongoose = require('mongoose');
var schema = require('../schemas/ResultSchema');
module.exports = mongoose.model('Result', mongoose.Schema(schema));