-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS git_users;

CREATE TABLE git_users(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    avatar VARCHAR NOT NULL
);