version: '3.8'

services:
    app:
    image: node:16
    container_name: nestjs-app
    command: npm run start:dev
    working_dir: /usr/src/app
    volumes:
        - .:/usr/src/app
    ports:
        - 3000:3000
    environment:
        - NODE_ENV=development
        - DATABASE_HOST=db
        - DATABASE_PORT=3306
        - DATABASE_USER=root
        - DATABASE_PASSWORD=rootpassword
        - DATABASE_NAME=nestjsdb
        - MONGODB_URI=mongodb://mongodb:27017/nestjsdb
    depends_on:
        - db
        - mongo
    networks:
        -nestjs-network
    db:
        image: mysql:8
        container_name: mysql-db
        environment:
        MYSQL_ROOT_PASSWORD: rootpassword
        MYSQL_DATABASE: nestjsdb
        ports:
            - 3306:3306
        volumes:
            - mysql-data:/var/lib/mysql
        networks:
            -nestjs-network

    mongo:
        image: mongo:latest
        container_name: mongo-db
        ports:
            - 27017:27017
        volumes:
            - mongo-data:/data/db
        networks:
            -nestjs-network

    volumes:
        mysql-data:
        mongo-data:

    networks:
        nestjs-network:
            driver: bridge