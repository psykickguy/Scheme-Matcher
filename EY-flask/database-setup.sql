CREATE DATABASE IF NOT EXISTS EY;

USE EY;

CREATE TABLE users (
    aadhar numeric(12) not null unique PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    mobile numeric(10) not null UNIQUE,
    name text(50) not null
);