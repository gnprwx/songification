DROP TABLE IF EXISTS songs;
CREATE TABLE songs (
  "id" SERIAL PRIMARY KEY,
  "url" VARCHAR(255) UNIQUE,
  "text" TEXT
);