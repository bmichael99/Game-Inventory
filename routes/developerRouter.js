const { Router } = require("express");
const developerController = require("../controllers/developerController");
const developerRouter = Router();



developerRouter.get("/developers", developerController.getDevelopers);



module.exports = developerRouter;


