#!/bin/bash
#export PATH=/root/.nvm/versions/node/v22.2.0/bin/node
cd /root/web/glacierwatch-app/client/
export NODE_ENV=production
exec node server.cjs
