var mongoose = require('mongoose');
var schema = require('../../schemas/postSchema');
module.exports = mongoose.model('Post', mongoose.Schema(schema));


