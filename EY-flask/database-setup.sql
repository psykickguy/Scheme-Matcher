CREATE DATABASE IF NOT EXISTS EY;

USE EY;

CREATE TABLE users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    aadhaar numeric(12) not null unique,
    email VARCHAR(50) NOT NULL UNIQUE,
    mobile numeric(10) not null UNIQUE,
    name text(50) not null
);