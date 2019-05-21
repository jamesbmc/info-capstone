#!/bin/bash

# Pulling the new image from docker hub
docker pull jamesbmc/gravity-mailer

# Removing the old image
docker rm -f mail

docker run -d --name mail jamesbmc/gravity-mailer
