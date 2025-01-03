# EY
to run:
prerequisites:

  python

  mysql


run database-setup.sql

in mysql cli:

  CREATE USER 'ey'@'localhost IDENTIFIED BY 'password';
  
  GRANT ALL PERMISSIONS ON EY.* TO 'ey';


run app.py

open localhost:5000 in web browser and use
