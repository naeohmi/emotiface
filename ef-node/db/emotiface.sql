DROP DATABASE IF EXISTS emotiface;
CREATE DATABASE emotiface;

\c emotiface;

CREATE TABLE E0 (
    ID SERIAL PRIMARY KEY,
    emoName VARCHAR (255),
    imgUrl VARCHAR (255),
    pts INTEGER
);

CREATE TABLE E1 (
    ID SERIAL PRIMARY KEY,
    emoName VARCHAR (255),
    imgUrl VARCHAR (255),
    pts INTEGER
);

CREATE TABLE E2 (
    ID SERIAL PRIMARY KEY,
    emoName VARCHAR (255),
    imgUrl VARCHAR (255),
    pts INTEGER
);

CREATE TABLE E3 (
    ID SERIAL PRIMARY KEY,
    emoName VARCHAR (255),
    imgUrl VARCHAR (255),
    pts INTEGER
);

CREATE TABLE E4 (
    ID SERIAL PRIMARY KEY,
    emoName VARCHAR (255),
    imgUrl VARCHAR (255),
    pts INTEGER
);

INSERT INTO E0 (emoName, imgUrl, pts)
VALUES ('happy', 'www.happy.com', 3);