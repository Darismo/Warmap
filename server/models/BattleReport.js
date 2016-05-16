var mongoose = require('mongoose');
var schema = require('../schemas/BattleReportSchema');
module.exports = mongoose.model('BattleReport', mongoose.Schema(schema));