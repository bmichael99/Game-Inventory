const { body, validationResult } = require("express-validator");
const db = require("../db/queries")

exports.showHomePage = (req,res) => {
  res.render('index', {title: 'Express Template!'});
  console.log("usernames will be logged here - wip")
};

exports.getUsernames = async (req,res) => {
  

  if(req.query.search){
    console.log(req.query.search);
    const usernames = await db.getUsernameContaining(req.query.search);
    
    res.send("Usernames from search query " + "\"" + req.query.search + "\"" + ": " + usernames.map(user => user.username).join(", "));
    
  }
  else{
    const usernames = await db.getAllUsernames();
    console.log("Usernames: ", usernames);
    res.send("Usernames: " + usernames.map(user => user.username).join(", "));
  }
    
};

exports.gamesCreateGet = (req,res) => {
  res.render("createGame", {title: "Create game"});
};

exports.usersCreatePost = async (req,res) =>{
  console.log("username to be saved: ", req.body.username);
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}