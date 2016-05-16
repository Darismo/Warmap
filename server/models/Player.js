var mongoose = require('mongoose');
var schema = require('../schemas/PlayerSchema');
module.exports = mongoose.model('Player', mongoose.Schema(schema));