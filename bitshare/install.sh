environment=$1

npm install

chmod 777 public/files -R
chmod 777 tmp -R
chmod 777 logs -R

# ADD THIS TO CRONTAB (crontab -e)
# 0 * * * * node /home/node-server/apps/bitsie-share/bitshare/send-payouts.js

echo 'Please add these to your crontab (crontab -e):'
echo -n '0 * * * * NODE_ENV='; echo -n $1; echo ' /usr/local/bin/node /home/node-server/apps/bitsie-share/bitshare/cron/send-payouts.js'
echo -n '0 0 * * * NODE_ENV='; echo -n $1; echo ' /usr/local/bin/node /home/node-server/apps/bitsie-share/bitshare/cron/check-status.js'