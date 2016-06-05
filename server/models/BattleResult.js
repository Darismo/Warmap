var mongoose = require('mongoose');
var schema = require('../schemas/BattleResultSchema');
module.exports = mongoose.model('BattleResult', mongoose.Schema(schema));