const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();


//indexRouter.get("/", indexController.showHomePage);
indexRouter.get("/", indexController.getUsernames);
indexRouter.get("/new", indexController.usersCreateGet);
indexRouter.post("/new", indexController.usersCreatePost);



module.exports = indexRouter;


