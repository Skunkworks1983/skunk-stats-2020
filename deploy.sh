#!/bin/bash

cd skunk-stats-2020
git fetch --all 
git reset --hard origin/master
npm install
cd client
npm install
npm run build
cd .. 
sudo chmod -x app.js
cd ..
sudo chmod -R 777 skunk-stats-2020 
sudo systemctl restart skunk-stats-2020.service
echo "Deployment Complete!"