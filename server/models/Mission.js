var mongoose = require('mongoose');
var schema = require('../schemas/MissionSchema');
module.exports = mongoose.model('Mission', mongoose.Schema(schema));