#!/bin/bash

docker push sverrirps/tictactoe
ssh vagrant@192.168.33.10 '
docker stop tictactoeContainer
docker rm tictactoeContainer
docker pull sverrirps/tictactoe
docker run -p 9000:8080 -d --name="tictactoeContainer" -e "NODE_ENV=production" sverrirps/tictactoe 
'
