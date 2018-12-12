This document is for setting up the postsql database and server.py on vcm 
* ubuntu system 

sudo apt-get install postgresql (already installed in the vcm7506)

for checking the db
sudo systemctl stop postgresql.service
sudo systemctl start postgresql.service
sudo systemctl enable postgresql.service
sudo systemctl status postgresql.service

login as postgres user: sudo su -l postgres
PostgreSQL runs at port 5432 by default 

CREATE DATABASE bme590finalproject;
CREATE USER hw188 WITH PASSWORD '123456';
GRANT ALL PRIVILEGES ON DATABASE bme590finalproject TO hw188;

DROP DATABASE bme590finalproject;

virtualenv -p python3 env


https://www.pythoncentral.io/understanding-python-sqlalchemy-session/
https://suhas.org/sqlalchemy-tutorial/
https://websiteforstudents.com/installing-postgresql-10-on-ubuntu-16-04-17-10-18-04/
