var BattleReport = require('../models/BattleReport');
var BattleResult = require('../models/BattleResult');
var Role = require('../models/Role');
var Result = require('../models/Result');
var Sector = require('../models/Sector');

var BattleReportController = {
    
    getAll() {
        return new Promise(function(resolve, reject) {
            BattleReport.find()
                .populate('sector')
                .exec(function(err, battleReports) {
                    if(err) {
                        reject(err);
                    }

                    var combinedBattleReports = [];
                        BattleResult.find()
                            .populate('player')
                            .populate('result')
                            .populate('role')
                            .exec(function(err, battleResults) {
                                
                            if(err) {
                                reject(err);
                            }
                            
                            for(var i = 0; i < battleReports.length; i++) {

                                var combinedBattleReport = {
                                    name: battleReports[i].name,
                                    date: battleReports[i].date,
                                    attacker: {},
                                    defender: {},
                                    draw: false,
                                    winner: {},
                                    attackingPlayerPoints: 0,
                                    defendingPlayerPoints: 0,
                                    sector: battleReports[i].sector,
                                    conquered: battleReports[i].conquered
                                };
                                
                                var currentBattleResults = [];
                                for(var j = 0; j < battleResults.length; j++) {
                                    if('' + battleResults[j].battleReport === '' + battleReports[i]._id) {
                                        currentBattleResults.push(battleResults[j]);
                                    }
                                }

                                currentBattleResults.forEach(function (battleResult) {
                                    if (battleResult.role.name === 'Attacker') {
                                        combinedBattleReport.attacker = battleResult.player;
                                        combinedBattleReport.attackingPlayerPoints = battleResult.points;
                                    } else if (battleResult.role.name === 'Defender') {
                                        combinedBattleReport.defender = battleResult.player;
                                        combinedBattleReport.defendingPlayerPoints = battleResult.points;
                                    }
                                    if (battleResult.result.name === 'Win') {
                                        combinedBattleReport.winner = battleResult.player;
                                    }
                                    if (battleResult.result.name === 'Draw') {
                                        combinedBattleReport.draw = true;
                                    }
                                });
                                combinedBattleReports.push(combinedBattleReport);
                                currentBattleResults = [];
                            }
                                resolve(combinedBattleReports);
                        });
                });
        });
    },

    save(request) {
        return new Promise(function(resolve, reject) {
                    var sector = request.sector;
                    var battleReport = new BattleReport({
                        name: request.name,
                        date: request.date,
                        sector: sector._id,
                        conquered: request.conquered
                    });

                    if(battleReport.conquered) {
                        sector.owner = request.attacker.name;
                        sector.secured = battleReport.date;
                        sector.save(function(err){
                            if(err) {
                                reject(err);
                            }
                        });
                    }

                    battleReport.save(function(err){
                        if(err) {
                            reject(err);
                        }
                    });

                    Result.find(function(err, results) {
                       if(err)  {
                           reject(err);
                       }

                        Role.find(function(err, roles) {
                            if(err) {
                                reject(err);
                            }

                            var attackingPlayerResultId;
                            var defendingPlayerResultId;
                            var attackingPlayerRoleId;
                            var defendingPlayerRoleId;

                            if(request.draw) {
                                for(var i = 0; i < results.length; i++) {
                                    if(results[i].name === 'Draw') {
                                        attackingPlayerResultId = results[i]._id;
                                        defendingPlayerResultId = results[i]._id;
                                    }
                                }
                            } else {
                                var winResultId;
                                var lossResultId;
                                for(var j = 0; j < results.length; j++) {
                                    if(results[j].name === 'Win') {
                                        winResultId = results[j]._id;
                                    } else if (results[j].name === 'Loss') {
                                        lossResultId = results[j]._id;
                                    }
                                }

                                if(request.winner === request.attacker) {
                                    attackingPlayerResultId = winResultId;
                                    defendingPlayerResultId = lossResultId;
                                } else {
                                    attackingPlayerResultId = lossResultId;
                                    defendingPlayerResultId = winResultId;
                                }
                            }

                            for(var k = 0; k < roles.length; k++) {
                                if(roles[k].name === 'Attacker') {
                                    attackingPlayerRoleId = roles[k]._id;
                                } else if(roles[k].name === 'Defender') {
                                    defendingPlayerRoleId = roles[k]._id;
                                }
                            }

                            var attackerBattleResult = new BattleResult({
                                battleReport: battleReport.id,
                                player: request.attacker,
                                result: attackingPlayerResultId,
                                role: attackingPlayerRoleId,
                                points: request.attackingPlayerPoints
                            });

                            var defendingBattleResult = new BattleResult({
                                battleReport: battleReport.id,
                                player: request.defender,
                                result: defendingPlayerResultId,
                                role: defendingPlayerRoleId,
                                points: request.defendingPlayerPoints
                            });

                            attackerBattleResult.save();
                            defendingBattleResult.save();
                        });

                    });
                });
    },
    
    removeAll() {
        return new Promise(function(resolve, reject) {
            BattleReport.remove({}, function() {});
            BattleResult.remove({}, function() {});
            resolve({});
        });
    }
};

module.exports = BattleReportController;