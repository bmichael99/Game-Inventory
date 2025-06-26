const { Router } = require("express");
const gameController = require("../controllers/gameController");
const genreRouter = Router();




genreRouter.get("/genres", gameController.getGenres);

module.exports = genreRouter;


