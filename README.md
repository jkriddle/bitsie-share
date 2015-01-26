# Bitsie SHARE

Development wallet:
https://blockchain.info/wallet/abcdef
Pass: abc1234

## Todo

* Test on mobile
* Play a sound when payment is received prior to redirecting
* Add ability to delete file (link via email receipt)
* Give customer a secret link to view their download without paying the fee (from receipt page)
* Allow customer ability to edit their publication. Add other information (description, author name, etc).
* Metrics for publishers
* Metrics for US!

v2.0
* Add a directory to allow digital publishers to add their files.

## Server Install Instructions

Using Ubuntu 12.04 Server (Digital Ocean)

[Source](https://www.digitalocean.com/community/articles/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps)

Create safe user:

```
useradd -s /bin/bash -m -d /home/node-server -c "Node Server" node-server
usermod -aG sudo node-server
passwd node-server [NEW PASSWORD]
su node-server
cd ~/
```

Install dependencies:

```
sudo apt-get update
sudo apt-get install build-essential libssl-dev curl git-core
sudo apt-get install -y python-software-properties python g++ make
```

Install node.js:

```
git clone https://github.com/joyent/node.git
cd node
git checkout v0.10.24
./configure
make
sudo make install
```

Allow port 80 to node-sever user

```
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep /usr/local/bin/node
```

Add pm2 to restart node on crashes

```
sudo chmod 777 /home/node-server/tmp/
sudo npm install pm2 -g
```

Check out files

```
cd ~/
mkdir apps
cd apps
git clone https://bitbucket.org/jkriddle/bitsie-share.git
cd bitsie-share/bitshare
npm install
```

Update the config 

```
sudo pico lib/config.js
```

Run the site as a service

```
sudo env PATH=$PATH:/usr/local/bin NODE_ENV=production pm2 startup ubuntu -u node-server
pm2 start app.js
```

Install nginx

```
sudo apt-get install nginx
sudo nano /etc/nginx/nginx.conf
```

Uncomment `server_names_hash_bucket_size 64;`
Set `server_names_hash_bucket_size 64;`

```
sudo nano /etc/nginx/conf.d/share.bitsie.com.conf
```

Paste this (note the ":3000" port will need to change if this is ever modified within the source):

```
server {
    listen 80;

    server_name share.bitsie.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Run it and set to start on boot

```
sudo service nginx start
sudo update-rc.d nginx defaults
```

All done! You should see the site at http://share.bitsie.com and http://share.bitsie.com:3000

#Bitcoind Server

@see http://bitcoin.stackexchange.com/questions/10010/how-to-install-a-bitcoin-client-on-ubuntu-server

sudo apt-get install git-core
sudo apt-get install build-essential
sudo apt-get install libssl-dev
sudo apt-get install libboost-all-dev (Ubuntu 12.04)
sudo apt-get install libdb5.1++-dev
git clone https://github.com/bitcoin/bitcoin.git
cd bitcoin
./autogen.sh
./configure --with-incompatible-bdb
make
make install

## IPTables

### Web Server (DEVELOPMENT ONLY!)

sudo iptables -F
sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -p tcp --dport ssh -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 3306 -j ACCEPT
sudo iptables -A INPUT -j DROP
sudo iptables -I INPUT 1 -i lo -j ACCEPT
sudo apt-get install iptables-persistent
sudo service iptables-persistent start

### Web Server (PRODUCTION)

sudo iptables -F
sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -p tcp --dport ssh -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -j DROP
sudo iptables -I INPUT 1 -i lo -j ACCEPT
sudo apt-get install iptables-persistent
sudo service iptables-persistent start
