-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS git_users;
DROP TABLE IF EXISTS user_post;

CREATE TABLE git_users(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR,
    avatar VARCHAR 
);

CREATE TABLE user_post(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL
);

INSERT INTO user_post(
    title,
    description
)
VALUES
('KNOB KNOBs diary', 'Ate human, taste good');