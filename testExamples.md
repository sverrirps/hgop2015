##Event based example gathering

####Form:	
>Given[Events],   <br/>
>When[Command],   <br/>
>Then[Resulting Event(s)]


####Failure scenarios (illegal moves)

First contestant puts an 'O':

>Given[GameCreated()],  <br/>
>When[Place(1, 2, O)],   <br/>
>Then[User prompt: "X's turn"]

Contestant 'X' puts two or more times in a row:

>Given[GameCreated(), Placed(0,0,X)],   <br/>
>When[Place(0,1,X)],   <br/>
>Then[User is prompt: "O's turn"]

Contestant 'O' puts in an occupied field:

>Given[GameCreated(), Placed(1,1,X)],   <br/>
>When[Place(1,1,O)],   <br/>
>Then[User is prompt: "Field is occupied!"]


####Winning scenarios

Contestant 'X' has all fields in the same row:

>Given[GameCreated(), Placed(0,0,X), Placed(0,1,X)],   <br/>
>When[Place(0,2,X)],   <br/>
>Then[Placed(0,2,X), X won]

Contestant 'X' has all fields in the same column:

>Given[GameCreated(), Placed(0,0,X), Placed(1,0,X)],   <br/>
>When[Place(2,0,X)],   <br/>
>Then[Placed(2,0,X), X won]

Contestant 'X' has all fields in a diagonal:

>Given[GameCreated(), Placed(0,0,X), Placed(1,1,X)],   <br/>
>When[Place(2,2,X)],   <br/>
>Then[Placed(2,2,X), X won]


####Draw scenarios

All fields are occupied but no three fields in a row have the same symbol:

>Given[GameCreated(), Placed(0,0,X), Placed(0,1,O), Placed(1,0,X), Placed(2,0,O), Placed(2,2,X), Placed(1,1,O), Placed(1,2,X), Placed(2,1,O)],   <br/>
>When[Place(2,0,X)],   <br/>
>Then[Placed(2,0,X), Game tie]

