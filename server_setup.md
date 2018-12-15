# BME 590 Final Project: Image Processor 

##### Author: Haitong(Tina) Wang 
##### Date: December 13, 2018 

----
_This document is for setting up the postgres database and server.py on vcm 
 and local host._

* ubuntu system 16.04  
----

**1.1 Database Instruction**

  1.1.1 Install postgresql on local machine (already installed in the vcm7506)
    
    sudo apt-get install postgresql 
  
  1.1.2 Create new Database
    
  1.1.2.1 Login to postgres (PostgreSQL runs at port 5432 by default )
    
    sudo su -l postgres
    psql 
    
  1.1.2.2 Create new Database and role 
  
    CREATE DATABASE bme590finalproject;
    CREATE USER {USERNAME} WITH PASSWORD {PASSWORD};
    GRANT ALL PRIVILEGES ON DATABASE bme590finalproject TO {USERNAME};
  
  1.1.2.3 To restore a vanilla setting 
    
    DROP DATABASE bme590finalproject;
  
  1.1.3 Check if postgres is active/run and status 
  
    sudo systemctl stop postgresql.service
    sudo systemctl start postgresql.service
    sudo systemctl enable postgresql.service
    sudo systemctl status postgresql.service

  1.1.4 Update server.py with USERNAME and PASSWORD 
  
    engine = create_engine("postgresql://{USERNAME}:{0}@localhost:5432/bme590"
                           "finalproject".format({PASSWORD}), max_overflow=20,
                           client_encoding='utf8')
                                                   
**1.2 VCM Deployment Instruction**  

    sudo apt-get install python3-pip screen
    pip3 install virtualenv
    git clone {HTTP TO GIT REPOSITORIES} 
    virtualenv -p python3 env 
    source env/bin/activate
    pip install -r requirments.txt
    export TIMEOUT = 1800
  
  Down latest ssl-proxy 
  
    wget -qO- https://github.com/suyashkumar/ssl-proxy/releases/download/v0.2.2/ssl-proxy-linux-amd64.tar.gz | tar xvz
    sudo mv ssl-proxy-linux-amd64 /usr/local/bin/ssl-proxy
    
  Use screen to run proxy and server.py separately 
  
    sudo ssl-proxy -from 0.0.0.0:443 -to 127.0.0.1:5001 -domain $YOUR_VCM_DOMAIN_NAME_HERE
  
    gunicorn --bind 127.0.0.1:5001 server:app 
    
    or FLASK_APP=server.py flask run
  

  * This server is run on vcm-7506.vm.duke.edu
  

