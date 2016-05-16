var mongoose = require('mongoose');
var schema = require('../schemas/SectorTypeSchema');
module.exports = mongoose.model('SectorType', mongoose.Schema(schema));