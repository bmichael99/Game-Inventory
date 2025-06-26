const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function getUsernameContaining(username){
  const searchValue = `%${username}%`;
  const { rows } = await pool.query("SELECT * FROM usernames WHERE username LIKE ($1)", [searchValue]);
  return rows;
}

module.exports = {
  getAllGames,
  getAllGenres,
  getAllDevelopers,
  insertUsername,
  getUsernameContaining
};