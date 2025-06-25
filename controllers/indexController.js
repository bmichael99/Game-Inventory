const { body, validationResult } = require("express-validator");


exports.showHomePage = (req,res) => {
  res.render('index', {title: 'Express Template!'});
};