var request = require('request');
var fs = require('fs');
var server = 'http://localhost:40000';
var player = "/player";
var sectorType = "/sectorType";
var role = "/role";
var result = "/result";
var mission = "/mission";

fs.createReadStream("data/players.json").pipe(request.post(server + player));
fs.createReadStream("data/sectorTypes.json").pipe(request.post(server + sectorType));
fs.createReadStream("data/roles.json").pipe(request.post(server + role));
fs.createReadStream("data/resultTypes.json").pipe(request.post(server + result));
//fs.createReadStream("data/missions.json").pipe(request.post(server + mission));
