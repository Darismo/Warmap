var mongoose = require('mongoose');
var express = require('express');
var Player = require('./server/models/Player');
var Sector = require('./server/models/Sector');
var BattleReport = require('./server/models/BattleReport');
var Role = require('./server/models/Role');
var Result = require('./server/models/Result');
var bodyParser = require('body-parser');
var config = require('config');
var SectorType = require('./server/models/SectorType');
var BattleReportController = require('./server/controllers/BattleReportController');
var BattleResult = require('./server/models/BattleResult');
var Mission = require('./server/models/Mission');

mongoose.connect(config.get('databaseURI'));
var app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(__dirname + '/dist'));

app.get('/player', function(req, res){
    Player.find(function(err, players) {
        if(err) {
            console.log(err);
        }
        res.send(players);
    });
});

app.post('/player', function(req, res) {
    if(req.body instanceof Array) {
        var model;
        var response = [];
        req.body.forEach(function(player) {
            model = new Player({
                name: player.name,
                army: player.army
            });
            model.save(function(error, player) {
                if(error) {
                    console.log(error);
                }
                
                response.push(player);
            });
        });
        res.send(response);
    } else if (req.body instanceof Object) {
        var player = new Player({
            name: req.body.name,
            army: req.body.army
        });

        player.save(function(err, post){
            var response = post;
            if(err) {
                response = err;
            }
            res.send(response);    
        });        
    }

});

app.delete('/player', function(req, res) {
    Player.findByIdAndRemove(req.body.id, function(err, player) {
        var response = player;
        if(err) {
            response = err;
        }
        res.send(response);
    });
});

app.delete('/battleReport', function(req, res) {
    BattleReportController.removeAll().then(function (response) {
        res.send(response);
    }, function(error) {
        console.log(error);
    });
});

app.get('/battleReport', function(req, res){
    BattleReportController.getAll().then(function(battleReports) {
        res.send(battleReports);
    }, function(error) {
        console.log(error);
    });
});

app.post('/battleReport', function(req, res) {
    BattleReportController.save(req.body).then(function(response) {
        res.send(response);
    }, function(error) {
        console.log(error);
    });
});

app.get('/sector', function(req, res){
    Sector.find().populate('upgrade').exec(function(err, sectors) {
        if(err) {
            console.log(err);
        }
        res.send(sectors);
    });
});

app.post('/sector', function(req, res) {
    var sector = new Sector({
      code: req.body.code,
      owner: req.body.owner,
      upgrade: req.body.upgrade,
      secured: req.body.secured
    });

    sector.save(function(err, post){
        var response = post;
        if(err) {
            response = err;
        }
        res.send(response);
    });
});

app.put('/sector', function(req, res) {
    Sector.update({ _id: req.body._id }, req.body, function(response) {
        console.log(response);
        res.send(req.body);
    });
});

app.delete('/sector', function(req, res) {
    Sector.remove({}, function() {});

    res.send();
});

app.get('/sectorType', function(req, res){
    SectorType.find(function(err, posts) {
        if(err) {
            console.log(err);
        }
        res.send(posts);
    });
});

app.put('/sectorType', function(req, res) {
    SectorType.update({ _id: req.body._id }, req.body, function(response) {
        console.log(response);
        res.send(response);
    });
});

app.post('/sectorType', function(req, res) {
    if(req.body instanceof Array) {
        var sectorType;
        var response = [];
        req.body.forEach(function(data) {
            sectorType = new SectorType({
                name: data.name,
                info: data.info,
                pointValue: data.pointValue
            });
            
            sectorType.save(function (err, sectorType) {
                if(err) {
                    console.log(err);
                }
                response.push(sectorType);
                
            })
        }); 
        res.send(response);
    } else if(req.body instanceof Object) {
        var sectorType = new SectorType({
            name: req.body.name,
            info: req.body.info,
            pointValue: req.body.pointValue
        });

        sectorType.save(function(err, post){
            var response = post;
            if(err) {
                response = err;
            }
            res.send(response);
        });        
    }
});

app.post('/newGame', function(req, res) {
    var emptyTileType;
    BattleReport.remove({}, function() {});
    BattleResult.remove({}, function() {});


    SectorType.findOne({ name: 'None' }, function(err, sector) {
        if(err) {
            console.log(err);
        }
        emptyTileType = sector;
        console.log(emptyTileType);

        var date = new Date();
        var month = date.getMonth() + 1;
        var dateformat = date.getDate();
        if(dateformat < 10) {
            dateformat = "0" + dateformat;
        } else {
            dateformat = "" + dateformat;
        }
        
        if(month < 10) {
            month = "0" + month;
        } else {
            month = "" + month;
        }
        
        date = date.getFullYear() + '-' + month + '-' + dateformat;
        
        for(var i=0; i<parseInt(req.body.rows); i++) {
            for(var j=0;j< parseInt(req.body.columns); j++) {
                sector = new Sector({
                    code: i + ":" + j,
                    owner: 'Uncontrolled',
                    upgrade: emptyTileType._id,
                    secured: date
                });

                sector.save(function(err, sector){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(sector);
                    }
                });
            }
        }
        res.send();
    });
});

app.post('/role', function(req, res) {
    if(req.body instanceof Array) {
        var model;
        var response = [];
        req.body.forEach(function (data) {
            model = new Role({
                name: data.name
            });
            
            model.save(function (err, result) {
                if(err) {
                    console.log(err);
                }   
                
                response.push(result);
            });
            
        });
        res.send(response);
    } else if(req.body instanceof Object) {
        var role = new Role({
            name: req.body.name
        });

        role.save(function (err, role) {
            var response = role;
            if (err) {
                response = err;
            }
            res.send(response);
        });
    }
    
    
});

app.post('/result', function(req, res) {
    if(req.body instanceof Array) {
        var model;
        var response = [];
        req.body.forEach(function (data) {
            model = new Result({
                name: data.name
            });
            
            model.save(function (err, result) {
                if(err) {
                    console.log(err);
                }
                
                response.push(result);
            });
            
        });
        res.send(response);
    } else if(req.body instanceof Object) {
        var result = new Result({
            name: req.body.name
        });

        result.save(function(err, result){
            var response = result;
            if(err) {
                response = err;
            }
            res.send(response);
        });

    }
});

app.get('/battleResult', function (req, res) {
    BattleResult.find()
        .populate('battleReport')
        .populate('player')
        .populate('result')
        .populate('role')
        .exec(function(err, result) {
           var response = result; 
           if(err) {
              response = err; 
           } 
           res.send(response); 
        });
});

app.post('/mission', function (req, res) {
   if(req.body instanceof Array) {
       var mission;
       var response = [];
       req.body.forEach(function (data) {
            mission = new Mission({
                name: data.name 
            });
           
           mission.save(function (err, result) {
              if(err) {
                  console.log(err);
              }
               response.add(result);
           });
       });
       res.send(response);
   } else if(req.body instanceof Object) {
       var mission = new Mission({
           name: req.body.name
       });
       
       mission.save(function (err, result) {
           if(err) {
               console.log(err);
           }
           res.send(result);
       })
   } 
});

app.listen(config.get('port'));