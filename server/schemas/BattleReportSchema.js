var mongoose = require('mongoose');

module.exports = {
    name: String,
    date: String,
    attacker: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    defender: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    attackingPlayerPoints: Number,
    defendingPlayerPoints: Number,
    sector: { type: mongoose.Schema.Types.ObjectId, ref: 'Sector' },
    conquered: Boolean,
    mission: String
};