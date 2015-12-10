var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent : events[0],
    board: [['','',''],['','',''],['','','']]
  };

  var eventHandlers={
    'MoveMade': function(event){
      gameState.board[event.x][event.y] = event.side;
    }
  };

  _.each(events, function(event){
    var eventHandler = eventHandlers[event.event];
    if(eventHandler) eventHandler(event);
  });
//
  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameCreated",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          name: cmd.name

        }];
      }
    },
    "JoinGame": function (cmd) {
      {
        if (gameState.gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          event: "GameJoined",
          userName: cmd.userName,
          otherUserName: gameState.gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "MakeMove": function(cmd){
      if(gameState.board[cmd.x][cmd.y]!==''){
        return [{
          id: cmd.id,
          event: "IllegalMove",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }
      //Horizontal win
      if((gameState.board[0][0] == cmd.side && gameState.board[0][1] == cmd.side && cmd.x == 0 && cmd.y == 2)
      || (gameState.board[0][0] == cmd.side && gameState.board[0][2] == cmd.side && cmd.x == 0 && cmd.y == 1)
      || (gameState.board[0][1] == cmd.side && gameState.board[0][2] == cmd.side && cmd.x == 0 && cmd.y == 0)){

        return [{id: cmd.id,
          event: "MoveMade",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        },
        {
          id: cmd.id,
          event: cmd.side + " won, with three in top row",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }

      if((gameState.board[1][0] == cmd.side && gameState.board[1][1] == cmd.side && cmd.x == 1 && cmd.y == 2)
      || (gameState.board[1][0] == cmd.side && gameState.board[1][2] == cmd.side && cmd.x == 1 && cmd.y == 1)
      || (gameState.board[1][1] == cmd.side && gameState.board[1][2] == cmd.side && cmd.x == 1 && cmd.y == 0)){
        return [{id: cmd.id,
          event: "MoveMade",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        },
        {
          id: cmd.id,
          event: cmd.side + " won, with three in middle row",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }

      if((gameState.board[2][0] == cmd.side && gameState.board[2][1] == cmd.side && cmd.x == 2 && cmd.y == 2)
      || (gameState.board[2][0] == cmd.side && gameState.board[2][2] == cmd.side && cmd.x == 2 && cmd.y == 1)
      || (gameState.board[2][1] == cmd.side && gameState.board[2][2] == cmd.side && cmd.x == 2 && cmd.y == 0)){
        return [{id: cmd.id,
          event: "MoveMade",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        },
        {
          id: cmd.id,
          event: cmd.side + " won, with three in bottom row",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }

      //Vertical win
      if((gameState.board[0][0] == cmd.side && gameState.board[1][0] == cmd.side && cmd.x == 2 && cmd.y == 0)
      || (gameState.board[1][0] == cmd.side && gameState.board[2][0] == cmd.side && cmd.x == 0 && cmd.y == 0)
      || (gameState.board[2][0] == cmd.side && gameState.board[0][0] == cmd.side && cmd.x == 1 && cmd.y == 0)){
        return [{id: cmd.id,
          event: "MoveMade",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        },
        {
          id: cmd.id,
          event: cmd.side + " won, with three in left column",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }

      if((gameState.board[0][1] == cmd.side && gameState.board[1][1] == cmd.side && cmd.x == 2 && cmd.y == 1)
      || (gameState.board[1][1] == cmd.side && gameState.board[2][1] == cmd.side && cmd.x == 0 && cmd.y == 1)
      || (gameState.board[2][1] == cmd.side && gameState.board[0][1] == cmd.side && cmd.x == 1 && cmd.y == 1)){
        return [{id: cmd.id,
          event: "MoveMade",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        },
        {
          id: cmd.id,
          event: cmd.side + " won, with three in middle column",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }

      if((gameState.board[0][2] == cmd.side && gameState.board[1][2] == cmd.side && cmd.x == 2 && cmd.y == 2)
      || (gameState.board[1][2] == cmd.side && gameState.board[2][2] == cmd.side && cmd.x == 0 && cmd.y == 2)
      || (gameState.board[2][2] == cmd.side && gameState.board[0][2] == cmd.side && cmd.x == 1 && cmd.y == 2)){
        return [{id: cmd.id,
          event: "MoveMade",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        },
        {
          id: cmd.id,
          event: cmd.side + " won, with three in right column",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }

      //diagonal win
      if((gameState.board[0][0] == cmd.side && gameState.board[1][1] == cmd.side && cmd.x == 2 && cmd.y == 2)
      || (gameState.board[1][1] == cmd.side && gameState.board[2][2] == cmd.side && cmd.x == 0 && cmd.y == 0)
      || (gameState.board[2][2] == cmd.side && gameState.board[0][0] == cmd.side && cmd.x == 1 && cmd.y == 1)){
        return [{id: cmd.id,
          event: "MoveMade",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        },
        {
          id: cmd.id,
          event: cmd.side + " won, with three in descending diagonal",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }

      if((gameState.board[0][2] == cmd.side && gameState.board[1][1] == cmd.side && cmd.x == 2 && cmd.y == 0)
      || (gameState.board[1][1] == cmd.side && gameState.board[2][0] == cmd.side && cmd.x == 0 && cmd.y == 2)
      || (gameState.board[2][0] == cmd.side && gameState.board[0][2] == cmd.side && cmd.x == 1 && cmd.y == 1)){
        return [{id: cmd.id,
          event: "MoveMade",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        },
        {
          id: cmd.id,
          event: cmd.side + " won, with three in ascending diagonal",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }

      if ((gameState.board[0][0] != '') && (gameState.board[0][1] != '') && (gameState.board[0][2] != '')
      && (gameState.board[1][0] != '') && (gameState.board[1][1] != '') && (gameState.board[1][2] != '')
      && (gameState.board[2][0] != '') && (gameState.board[2][1] != '') && (gameState.board[2][2] != '')){
        return [{id: cmd.id,
          event: "MoveMade",
          userName: cmd.userName,
          name: gameState.gameCreatedEvent.name,
          x:cmd.x,
          x:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        },
        {
          id: cmd.id,
          event: "Game ends with draw.",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }

      return [{
        id: cmd.id,
        event: "MoveMade",
        userName: cmd.userName,
        name:gameState.gameCreatedEvent.name,
        x:cmd.x,
        y:cmd.y,
        side:cmd.side,
        timeStamp: cmd.timeStamp
      }]
    }
  };

  return {
    executeCommand: function (cmd) {
      var handler = handlers[cmd.comm];
      if(!handler){
        throw new Error("No handler resolved for command " + JSON.stringify(cmd));
      }
      return handler(cmd);
    }
  };
};
