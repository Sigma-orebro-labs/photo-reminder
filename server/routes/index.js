var express = require('express');
var router = express.Router();
var models = require(__dirname + '/../models');
/* GET home page. */
router.get('/', function (req, res, next) {

  models.User.findAll({
    include: [models.Reminder]
  }).then(function (users) {
    res.render('index', {
      title: 'Express',
      users: users
    });
  });

});

module.exports = router;
