var mongoose = require('mongoose');
var schema = require('../schemas/SectorSchema');
module.exports = mongoose.model('Sector', mongoose.Schema(schema));