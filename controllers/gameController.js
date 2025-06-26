const { body, validationResult } = require("express-validator");
const db = require("../db/queries")


exports.getGames = async (req,res) => {
  const games = await db.getAllGames();

  //res.send("Games: " + games.map(games => games.title).join(", "));
  res.render("index", {title: "Game Inventory", games: games});
};

exports.getGame = async (req,res) => {
  

};

