var mongoose = require('mongoose');

module.exports = {
    battleReport: { type: mongoose.Schema.Types.ObjectId, ref: 'BattleReport'},
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    result: { type: mongoose.Schema.Types.ObjectId, ref: 'Result'},
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
    points: Number
};