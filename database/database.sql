CREATE DATABASE vovoca;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE admin(
    _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    music UUID[]
);

CREATE TABLE music (
    _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    audioBuffer BYTEA NOT NULL,
    downloadCount INT DEFAULT 0,
    tags TEXT[5],
    timestamps TIMESTAMP DEFAULT NOW(),
    createdBy UUID REFERENCES admin(_id)
);

CREATE TABLE customer (
    googleID VARCHAR(100) PRIMARY KEY,
    downloadMusic UUID[]
);