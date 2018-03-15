#!/bin/bash

ssh -t leo@54.199.147.172 "sudo rm -r /home/leo/weapp/node_modules"
# ssh -t ubuntu@193.112.49.201 "sudo rm -r /home/ubuntu/weapp/node_modules"

echo "remove old modules done"

scp ./package.json leo@54.199.147.172:~/weapp/package.json
# scp ./package.json ubuntu@193.112.49.201:~/weapp/package.json

echo "copy package.json done"

ssh -t leo@54.199.147.172 "cd /home/leo/weapp && npm install --prod"
# ssh -t ubuntu@193.112.49.201 "cd /home/ubuntu/weapp && npm install --prod"

echo "npm install done"