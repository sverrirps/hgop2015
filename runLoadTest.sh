#!/bin/bash
ssh vagrant@192.168.33.10 '
docker restart tictactoeContainer
'

export ACCEPTANCE_URL=http://192.168.33.10:9000
grunt mochaTest:load
