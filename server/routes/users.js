var express = require('express');

var models = require('../models/');
var User = models.User;

module.exports = function (app, passport) {
  /*Signup Auth moved to auth.js -routes */
  var router = express.Router();
  router.get('/profile', function (req, res, next) {
    res.render('profile', {
      user: {
        name: req.user.displayName
      }  
      
      // get the user out of session and pass to template
    });
  });

  router.post('signup', function (req, res, next) {
    var email = req.body.email; 
    
  });
  
  return router;
}

