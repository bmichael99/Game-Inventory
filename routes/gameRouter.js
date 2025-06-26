const { Router } = require("express");
const gameController = require("../controllers/gameController");
const gameRouter = Router();


//indexRouter.get("/", indexController.showHomePage);
gameRouter.get("/", gameController.getGames);



module.exports = gameRouter;


