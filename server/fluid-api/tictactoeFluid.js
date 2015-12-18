var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;
var async = require('async');
var theId = 1992;


function buildingRightCommand(_command) {
  var command = {
    id: theId.toString(),
    gameId: _command.gameId,
    comm: _command.comm,
    userName: _command.userName,
  };

  if (_command.comm === 'MakeMove') {
    command.symbol = _command.symbol;
    command.x = _command.x;
    command.y = _command.y;
  }

  theId++;
  return command;
}

function user(userName) {
  var commands = [];
  var _currentCommand = commands.length - 1;
  var userApi = {
    createsGame: function (gameId) {
      commands.push({
          gameId: gameId,
          comm: 'CreateGame',
          userName: userName
      });
      return userApi;
    },
    joinsGame: function (gameId) {
      commands.push({
          gameId: gameId,
          comm: 'JoinGame',
          userName: userName
      });
      return userApi;
    },
    makesMove: function (x, y) {
      commands.push({
        comm: "MakeMove",
        userName: userName,
        x: x,
        y: y
      });
      return userApi;
    },
    inGame: function(gameId){
      commands[commands.length - 1].gameId = gameId;
      return userApi;
    },
    putsDown: function (symbol) {
      commands[commands.length - 1].symbol = symbol;
      return userApi;
    },
    allCommandsByUser: function() {
      return commands;
    }
  };
  return userApi
}

function given(userApi) {
  var expectedEventList=[];
  var _currentEvent = expectedEventList.length - 1;
  var expectApi = {
    expect: function (eventName) {
      expectedEventList.push({
        event: eventName
      });
      return expectApi;
    },
    withGameName: function (gameName) {
      expectedEventList[expectedEventList.length - 1].gameName = gameName;
      return expectApi;
    },
    withGameID: function (gameId) {
      expectedEventList[expectedEventList.length - 1].gameId = gameId;
      return expectApi;
    },
    byUser: function (userName) {
      expectedEventList[expectedEventList.length - 1].userName = userName;
      return expectApi;
    },
    and: function (commands) {
      userApi = userApi.concat(commands);
      return expectApi;
    },
    isOk: function (done) {
      async.eachSeries(userApi, (usrCmd, callback) => {
        var req = request(acceptanceUrl);
        var cmd = buildingRightCommand(usrCmd);
        var url = '';

        if (usrCmd.comm === 'MakeMove') {
          url = '/api/placeMove';
        } else {
          url = '/api/' + usrCmd.comm;
        }
        req
        .post(url)
        .type('json')
        .send(cmd)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          callback();
        });
      }, () => {
        request(acceptanceUrl)
            .get('/api/gameHistory/' + userApi[0].gameId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });
      },
    };

    return expectApi;
}

module.exports.user = user;
module.exports.given = given;
