var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

it('Should play 100 games in 3 seconds.', function (done) {
  var doneCount = 0;
  var gamesToPlay = 100;
  var x = 3;

  this.timeout(x * 1000);

  var QED = function () {
    if (gamesToPlay === ++doneCount) {
      done();
    }
  };

  for (var gameId = 0; gameId < gamesToPlay; gameId++) {
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
  }
});
