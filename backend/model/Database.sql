CREATE DATABASE league;

CREATE TABLE summonerData (
    id SERIAL PRIMARY KEY,
    summonerName VARCHAR(50),
    summonerTagline VARCHAR(50),
    summonerMetaData JSONB
);