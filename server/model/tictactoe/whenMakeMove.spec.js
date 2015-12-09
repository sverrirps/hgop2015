var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('when make move command', function(){

  var given, when, then;

  beforeEach(function(){
    given= [{
      id:"1234",
      event:"GameCreated",
      name:"TheFirstGame",
      userName: "Gulli",
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id:"12345",
      event:"GameJoined",
      userName: "Halli",
      otherUserName: "Gulli",
      timeStamp: "2015.12.02T11:30:50"
    }];
  });

  describe('on new game', function(){
    it('should join game',function(){
      when={
        id:"12345",
        comm:"MakeMove",
        userName : "Halli",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };
      then=[{
        id:"12345",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    })
  });

  describe("one previous move", function(){
    it('placing move in same place should be illegal',function(){
      given.push({
        id:"12345",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      });

      when={
        id:"12345",
        comm:"MakeMove",
        userName : "Halli",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"12345",
        event:"IllegalMove",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });

  describe("When three identical symbols are in the top row", function(){
    it('player with that symbol should win',function(){
      given = given.concat([{
        id:"12346",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12347",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:1,
        y:0,
        side:'O',
        timeStamp: "2015.12.02T11:30:55"
      },
      {
        id:"12348",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:31:00"
      },
      {
        id:"12349",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:1,
        y:1,
        side:'O',
        timeStamp: "2015.12.02T11:31:05"
      }]);

      when={
        id:"12350",
        comm:"MakeMove",
        userName : "Halli",
        x:0,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      };

      then=[{
        id:"12350",
        event:"X won, with three in top row",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });

  describe("When three identical symbols are in the middle row", function(){
    it('player with that symbol should win',function(){
      given = given.concat([{
        id:"12346",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:1,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12347",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:0,
        y:0,
        side:'O',
        timeStamp: "2015.12.02T11:30:55"
      },
      {
        id:"12348",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:1,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:31:00"
      },
      {
        id:"12349",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'O',
        timeStamp: "2015.12.02T11:31:05"
      }]);

      when={
        id:"12350",
        comm:"MakeMove",
        userName : "Halli",
        x:1,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      };

      then=[{
        id:"12350",
        event:"X won, with three in middle row",
        userName:"Halli",
        name:"TheFirstGame",
        x:1,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });


  describe("When three identical symbols are in the bottom row", function(){
    it('player with that symbol should win',function(){
      given = given.concat([{
        id:"12346",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:2,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12347",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:0,
        y:0,
        side:'O',
        timeStamp: "2015.12.02T11:30:55"
      },
      {
        id:"12348",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:2,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:31:00"
      },
      {
        id:"12349",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'O',
        timeStamp: "2015.12.02T11:31:05"
      }]);

      when={
        id:"12350",
        comm:"MakeMove",
        userName : "Halli",
        x:2,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      };

      then=[{
        id:"12350",
        event:"X won, with three in bottom row",
        userName:"Halli",
        name:"TheFirstGame",
        x:2,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });

  describe("When three identical symbols are in the left column", function(){
    it('player with that symbol should win',function(){
      given = given.concat([{
        id:"12346",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12347",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'O',
        timeStamp: "2015.12.02T11:30:55"
      },
      {
        id:"12348",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:1,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:31:00"
      },
      {
        id:"12349",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:1,
        y:1,
        side:'O',
        timeStamp: "2015.12.02T11:31:05"
      }]);

      when={
        id:"12350",
        comm:"MakeMove",
        userName : "Halli",
        x:2,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      };

      then=[{
        id:"12350",
        event:"X won, with three in left column",
        userName:"Halli",
        name:"TheFirstGame",
        x:2,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });

  describe("When three identical symbols are in the middle column", function(){
    it('player with that symbol should win',function(){
      given = given.concat([{
        id:"12346",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12347",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:0,
        y:0,
        side:'O',
        timeStamp: "2015.12.02T11:30:55"
      },
      {
        id:"12348",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:1,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:31:00"
      },
      {
        id:"12349",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:1,
        y:0,
        side:'O',
        timeStamp: "2015.12.02T11:31:05"
      }]);

      when={
        id:"12350",
        comm:"MakeMove",
        userName : "Halli",
        x:2,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      };

      then=[{
        id:"12350",
        event:"X won, with three in middle column",
        userName:"Halli",
        name:"TheFirstGame",
        x:2,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });

  describe("When three identical symbols are in the right column", function(){
    it('player with that symbol should win',function(){
      given = given.concat([{
        id:"12346",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12347",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:0,
        y:0,
        side:'O',
        timeStamp: "2015.12.02T11:30:55"
      },
      {
        id:"12348",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:1,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:31:00"
      },
      {
        id:"12349",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:1,
        y:0,
        side:'O',
        timeStamp: "2015.12.02T11:31:05"
      }]);

      when={
        id:"12350",
        comm:"MakeMove",
        userName : "Halli",
        x:2,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      };

      then=[{
        id:"12350",
        event:"X won, with three in right column",
        userName:"Halli",
        name:"TheFirstGame",
        x:2,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });

  describe("When three identical symbols are in descending diagonal", function(){
    it('player with that symbol should win',function(){
      given = given.concat([{
        id:"12346",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12347",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'O',
        timeStamp: "2015.12.02T11:30:55"
      },
      {
        id:"12348",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:1,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:31:00"
      },
      {
        id:"12349",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:1,
        y:0,
        side:'O',
        timeStamp: "2015.12.02T11:31:05"
      }]);

      when={
        id:"12350",
        comm:"MakeMove",
        userName : "Halli",
        x:2,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      };

      then=[{
        id:"12350",
        event:"X won, with three in descending diagonal",
        userName:"Halli",
        name:"TheFirstGame",
        x:2,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });

  describe("When three identical symbols are in ascending diagonal", function(){
    it('player with that symbol should win',function(){
      given = given.concat([{
        id:"12346",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12347",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'O',
        timeStamp: "2015.12.02T11:30:55"
      },
      {
        id:"12348",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:1,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:31:00"
      },
      {
        id:"12349",
        event:"MoveMade",
        userName:"Gulli",
        name:"TheFirstGame",
        x:1,
        y:0,
        side:'O',
        timeStamp: "2015.12.02T11:31:05"
      }]);

      when={
        id:"12350",
        comm:"MakeMove",
        userName : "Halli",
        x:2,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      };

      then=[{
        id:"12350",
        event:"X won, with three in ascending diagonal",
        userName:"Halli",
        name:"TheFirstGame",
        x:2,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:31:10"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });

});
