const { Client } = require("pg");
require('dotenv').config()

const SQL = `
CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    release_date DATE NOT NULL,
    cover_image_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS developers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    founded_year INT NOT NULL,
    website TEXT
);

CREATE TABLE IF NOT EXISTS genres (
     id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS game_genres (
    game_id INT REFERENCES games(id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, genre_id)
);

CREATE TABLE IF NOT EXISTS game_developers (
    game_id INT REFERENCES games(id) ON DELETE CASCADE,
    developer_id INT REFERENCES developers(id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, developer_id)
);



INSERT INTO developers (name, founded_year, website)
VALUES ('FromSoftware', 1986, 'https://www.fromsoftware.jp');

INSERT INTO developers (name, founded_year, website)
  VALUES 
  ('Nintendo', 1889, 'https://www.nintendo.com'),
  ('CD Projekt Red', 2002, 'https://en.cdprojektred.com'),
  ('Rockstar Games', 1998, 'https://www.rockstargames.com');


INSERT INTO games (title, description, release_date, cover_image_url, developer_id) VALUES
  ('Elden Ring', 'Elden Ring is an open-world fantasy game where you fight tough enemies and explore a massive, mysterious world.', '2022-02-25', '../assets/elden-ring.jpg', 1),
  ('Dark Souls', 'Dark Souls is a challenging action RPG known for its dark atmosphere, cryptic lore, and punishing combat.', '2011-09-22', '../assets/dark-souls.jpg', 1),
  ('Sekiro', 'Sekiro is a fast-paced action game set in a mythical version of Sengoku-era Japan, focused on stealth, swordplay, and precision.', '2019-03-22', '../assets/sekiro.jpg', 1);

INSERT INTO games (title, description, release_date, cover_image_url, developer_id) VALUES
  ('The Legend of Zelda: Breath of the Wild', 'An open-world adventure game where you explore, solve puzzles, and fight enemies in a vast fantasy land.', '2017-03-03', '../assets/botw.jpg', 2),
  ('Super Mario Odyssey', 'A 3D platformer where Mario travels across imaginative worlds to rescue Princess Peach.', '2017-10-27', '../assets/mario-odyssey.jpg', 2),
  ('Animal Crossing: New Horizons', 'A cozy life simulation game where you build a home on a tropical island with talking animals.', '2020-03-20', '../assets/animal-crossing.jpg', 2);

INSERT INTO games (title, description, release_date, cover_image_url, developer_id) VALUES
  ('The Witcher 3: Wild Hunt', 'An open-world RPG where you play as a monster hunter exploring a dark, story-rich fantasy world.', '2015-05-19', '../assets/witcher3.jpg', 3),
  ('Cyberpunk 2077', 'A sci-fi RPG set in a futuristic city where you play as a mercenary in a high-tech dystopia.', '2020-12-10', '../assets/cyberpunk2077.jpg', 3),
  ('Thronebreaker: The Witcher Tales', 'A story-driven card battle RPG set in the Witcher universe.', '2018-10-23', '../assets/thronebreaker.jpg', 3);

INSERT INTO games (title, description, release_date, cover_image_url, developer_id) VALUES
  ('Grand Theft Auto V', 'An open-world crime game where you switch between three characters in a sprawling city full of chaos.', '2013-09-17', '../assets/gta5.jpg', 4),
  ('Red Dead Redemption 2', 'A western-themed open-world game about outlaws, survival, and life on the frontier.', '2018-10-26', '../assets/rdr2.jpg', 4),
  ('L.A. Noire', 'A detective game set in 1940s Los Angeles where you solve crimes through investigation and interrogation.', '2011-05-17', '../assets/la-noire.jpg', 4);


INSERT INTO genres (name) VALUES
  ('Action'),
  ('RPG'),
  ('Adventure'),
  ('Open World'),
  ('Fantasy'),
  ('Platformer'),
  ('Simulation'),
  ('Shooter'),
  ('Detective'),
  ('Sci-Fi'),
  ('Stealth'),
  ('Western');

INSERT INTO game_genres (game_id, genre_id) VALUES
  -- Elden Ring
  (1, 1), -- Action
  (1, 2), -- RPG
  (1, 4), -- Open World
  (1, 5), -- Fantasy

  -- Dark Souls
  (2, 1), -- Action
  (2, 2), -- RPG
  (2, 5), -- Fantasy

  -- Sekiro
  (3, 1), -- Action
  (3, 11), -- Stealth
  (3, 4), -- Open World

  -- Breath of the Wild
  (4, 2), -- RPG
  (4, 3), -- Adventure
  (4, 4), -- Open World
  (4, 5), -- Fantasy

  -- Super Mario Odyssey
  (5, 1), -- Action
  (5, 6), -- Platformer
  (5, 3), -- Adventure

  -- Animal Crossing
  (6, 7), -- Simulation

  -- The Witcher 3
  (7, 1), -- Action
  (7, 2), -- RPG
  (7, 4), -- Open World
  (7, 5), -- Fantasy

  -- Cyberpunk 2077
  (8, 1), -- Action
  (8, 2), -- RPG
  (8, 4), -- Open World
  (8, 10), -- Sci-Fi

  -- Thronebreaker
  (9, 2), -- RPG
  (9, 5), -- Fantasy

  -- GTA V
  (10, 1), -- Action
  (10, 4), -- Open World
  (10, 8), -- Shooter

  -- RDR2
  (11, 1), -- Action
  (11, 4), -- Open World
  (11, 12), -- Western

  -- L.A. Noire
  (12, 9), -- Detective
  (12, 1); -- Action


`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@localhost:5432/top_users",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();