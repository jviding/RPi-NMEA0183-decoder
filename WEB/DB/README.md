# Installation

Install postgresql:
> $ sudo apt install postgresql postgresql-contrib

Ensure it's started:
> $ sudo systemctl start postgresql.service

# Configuration

Connect:
> $ sudo -u postgres psql

Configure:
> # create database <DB-NAME>;
> # create user <USER> with encrypted password '<PASSWORD>';
> # grant all privileges on database <DB-NAME> to <USER>;

Add the username and password to /secrets in project root.

Add tables by running the ./init-db.sql script:
> $ psql -h localhost -U <USER> -d <DB-NAME> -a -f init-db.sql


sudo -U postgres -d <DB-NAME> -a -f init-db.sql

