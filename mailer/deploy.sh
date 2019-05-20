#!/bin/bash
./build.sh

docker push jamesbmc/gravity-mailer

# TODO: replace with new droplet IP address
ssh root@134.209.5.145 'bash -s' < upgrade-server.sh
