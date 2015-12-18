'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var given = require('../fluid-api/tictactoeFluid').given;
var user = require('../fluid-api/tictactoeFluid').user;

describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    /*jshint -W030 */
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command = {
      id: "1234",
      gameId: "100000",
      comm: "CreateGame",
      userName: "Sverrir",
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/100000')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1234",
                "gameId": "100000",
                "event": "GameCreated",
                "userName": "Sverrir",
                "name": "TheFirstGame",
                "timeStamp": "2014-12-02T11:29:29"
              }]);
            done();
          });
      });
  });

    console.log("fyrir");
   it('Should execute fluid API test', function (done) {
     given(user("Sverrir").createsGame("3456").allCommandsByUser())
     .expect("GameCreated").withGameID("3456").isOk(done);
   });
   console.log("eftir");

   it('Should keep playing until one is winner or results with draw', function (done) {

     given(user("Dr Jekyll").createsGame("2345").allCommandsByUser())
      .and(user("Mr Hyde").joinsGame("2345").allCommandsByUser())
      .and(user("Dr Jekyll").makesMove(1,1).inGame("2345").putsDown('X').allCommandsByUser())
      .and(user("Mr Hyde").makesMove(2,0).inGame("2345").putsDown('O').allCommandsByUser())
      .and(user("Dr Jekyll").makesMove(2,2).inGame("2345").putsDown('X').allCommandsByUser())
      .and(user("Mr Hyde").makesMove(0,0).inGame("2345").putsDown('O').allCommandsByUser())
      .and(user("Dr Jekyll").makesMove(1,0).inGame("2345").putsDown('X').allCommandsByUser())
      .and(user("Mr Hyde").makesMove(1,2).inGame("2345").putsDown('O').allCommandsByUser())
      .and(user("Dr Jekyll").makesMove(0,1).inGame("2345").putsDown('X').allCommandsByUser())
      .and(user("Mr Hyde").makesMove(2,1).inGame("2345").putsDown('O').allCommandsByUser())
      .and(user("Dr Jekyll").makesMove(0,2).inGame("2345").putsDown('X').allCommandsByUser())
      .expect("Game ends with draw.").isOk(done);
   })

});
