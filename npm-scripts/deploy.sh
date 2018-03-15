#!/bin/bash

ssh -t leo@54.199.147.172 "sudo -s rm -r /home/leo/weapp/dist"
# ssh -t ubuntu@193.112.49.201 "sudo -s rm -r /home/ubuntu/weapp/dist"

scp -r ./dist leo@54.199.147.172:~/weapp/dist
# scp -r ./dist ubuntu@193.112.49.201:~/weapp/dist

echo "copy dist files done"