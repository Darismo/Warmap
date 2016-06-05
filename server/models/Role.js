var mongoose = require('mongoose');
var schema = require('../schemas/RoleSchema');
module.exports = mongoose.model('Role', mongoose.Schema(schema));