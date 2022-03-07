# thomas_trasacco_07_28022022

# Installation
  ## Pre-requisite:
    - Node and npm (node package manager) version LTS or 17.4.0
        Click here to see how to install it : https://nodejs.org/en/download/current/
    - MySQL >=V8.0.0
        You can install it with npm : https://www.npmjs.com/package/mysql
        You can also follow this guide to install mySql using apt : https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04-fr 
  ## Front
  - Install angular/cli V13.2.3 globally or in the folder of the project using npm :
    ```npm i -g angular-cli@13.2.3```
  - In the folder angular-groupomania, execute the following commands to install dependencies then host the frontend :
    ```npm i```
    ```ng serve```
  ## MySQL
  - Import the script at the root of the project using the following command :
    ```mysql -u username -p dbname < Dump20220305.sql```
    Replace username and dbname depending of your installation and your willings, note that you could need to change the DATABASE_URL variable in back/.env :
    *DATABASE_URL="mysql://$USER:$PASSWORD@localhost:3306/$DATABASE_NAME"
  ## Back
  - Install Prisma/client 3 using npm : (globally using ```-g``` as above)
    ```npm i prisma@3 @prisma/client@3```
  - In the folder back, execute the following commands to install dependencies then run the backend :
    ```npm i```
    ```npm run start```

The site should now be available on http://localhost:4200/
