# BME 590 Final Project: Image Processor 

##### Team member: Steven Hua, Angelina Liu, Haitong(Tina) Wang 
##### Date: December 13, 2018 

----
_This document is for setting up the postgres database and server.py on vcm_
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
  
  1.1.3 Check if postgres is active/ run  
  
    sudo systemctl stop postgresql.service
    sudo systemctl start postgresql.service
    sudo systemctl enable postgresql.service
    sudo systemctl status postgresql.service

**1.2 VCM Deployment Instruction**  

    sudo apt-get install python3-pip screen
    pip3 install virtualenv
    git clone {HTTP TO GIT REPOSITORIES} 
    virtualenv -p python3 env 
    source env/bin/activate
    pip install -r requirments.txt
    export TIMEOUT=3600
  
  Build DATABASE AND START IT, Then run 
  
    gunicorn --bind 0.0.0.0:5001 server:app


