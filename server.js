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
        if(month < 10) {
            month = "0" + month;
        } else {
            month = "" + month;
        }
        date = date.getFullYear() + '-' + month + '-' + date.getDate();

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
    var role = new Role({
        name: req.body.name
    });

    role.save(function(err, role){
        var response = role;
        if(err) {
            response = err;
        }
        res.send(response);
    });
});

app.post('/result', function(req, res) {
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

app.listen(config.get('port'));