const { body, validationResult } = require("express-validator");

//imports the express framework
const express = require("express");
//node module for handling paths
const path = require("path");
//initalizes the express application
const app = express();


//set the folder containing view templates to ./views
app.set("views", path.join(__dirname, "views"));
//set the view engine to EJS, for rendering .ejs files with res.render()
app.set("view engine", "ejs");

// sets up middleware to serve static files (CSS,images,etc) from
// the public directory
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//parse form data into req.body
app.use(express.urlencoded({ extended: true }));

//serve index router when root is visited
const indexRouter = require("./routes/indexRouter");
app.use("/",indexRouter);

//starts the server and listens on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My Express app - listening on port ${PORT}!`);
});