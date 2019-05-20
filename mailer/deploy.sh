#!/bin/bash
./build.sh

docker push jamesbmc/gravity-mailer

# TODO: replace with new droplet IP address
ssh root@157.230.171.202 'bash -s' < upgrade-server.sh
