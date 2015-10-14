var express = require('express');
var models = require('../models/');
var auth = require('../services/auth');
var User = models.User;

module.exports = function (passport) {
	var router = express.Router();
	router.get('/google/callback', passport.authenticate('google', {
		successRedirect: '/reminder/list',
		failureRedirect: '/error'
	}));

	router.get('/google/', passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));
	
	router.post('/local', auth.authenticate);
	return router;
}