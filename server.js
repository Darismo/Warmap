var mongoose = require('mongoose');
var express = require('express');
var Post = require('./server/models/post/Post');
var Player = require('./server/models/Player');
var Sector = require('./server/models/Sector');
var BattleReport = require('./server/models/BattleReport');
var bodyParser = require('body-parser');
var config = require('config');
var SectorType = require('./server/models/SectorType');

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
        army: req.body.army,
        color: req.body.color
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
    BattleReport.remove({}, function() {});

    res.send();
});

app.get('/battleReport', function(req, res){
    BattleReport.find()
        .populate('attacker')
        .populate('defender')
        .populate('winner')
        .populate('sector')
        .exec(function(err, battleReport) {
            if(err) {
                console.log(err);
            }
            res.send(battleReport);
        });
});

app.post('/battleReport', function(req, res) {

    Sector.findOne({code: req.body.sector}, function(err, sector) {
        console.log(err);
        var battleReport = new BattleReport({
            name: req.body.name,
            date: req.body.date,
            attacker: req.body.attacker._id,
            defender: req.body.defender._id,
            winner: req.body.winner._id,
            attackingPlayerPoints: req.body.attackingPlayerPoints,
            defendingPlayerPoints: req.body.defendingPlayerPoints,
            sector: sector._id,
            conquered: req.body.conquered,
            mission: req.body.mission
        });

        if(battleReport.conquered) {
            sector.owner = req.body.attacker.name;
            sector.secured = battleReport.date;
            sector.save();
            console.log(sector);
        }

        battleReport.save(function(err){

            if(err) {
                console.log(err);
            }

        });
    });

    res.send('');
});

app.get('/sector', function(req, res){
    Sector.find().populate('upgrade').exec(function(err, sectors) {
        if(err) {
            console.log(err);
        }
        res.send(sectors);
    });
});

app.get('/posts', function(req, res){
    Post.find.populate('upgrade')(function(err, posts) {
        if(err) {
            console.log(err);
        }
        res.send(posts);
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


    SectorType.findOne({ name: 'None' }, function(err, sector) {
        if(err) {
            console.log(err);
        }
        emptyTileType = sector;
        console.log(emptyTileType);

        for(var i=0; i<parseInt(req.body.rows); i++) {
            for(var j=0;j< parseInt(req.body.columns); j++) {
                sector = new Sector({
                    code: i + ":" + j,
                    owner: 'Uncontrolled',
                    upgrade: emptyTileType._id,
                    secured: ''
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

app.listen(config.get('port'));