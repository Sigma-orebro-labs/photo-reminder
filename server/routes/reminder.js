var express = require('express');
var router = express.Router();
var models = require('../models/');
var passport = require('passport');
var auth = require('../services/auth');
var multer = require('multer')
var upload = multer({ dest: 'public/ocr/' })
var ReminderService = require('../services/reminderService');
var Reminders = models.Reminder;


router.get('/get', function (req, res, next) {
	var userId = req.user.id
	Reminders.findAll({
		include: [models.Picture],
		where: {
			userId: userId
		},
		order: [
			['reminderDate', 'DESC']
		]
	}).then(function (usersReminders) {
		res.send(usersReminders);
	});
});

router.get('/list', auth.requiresAuthentication, function (req, res, next) {
	Reminders.findAll({
		where: {
			userId: req.user.id
		},
		order: [
			['reminderDate', 'DESC']
		]
	}).then(function (usersReminders) {
		res.render('reminder', { reminders: usersReminders });
	});
});

router.post('/create', auth.requiresAuthentication, function (req, res, next) {
	var newDate = new Date();
	
	// var filePath = req.file.path;
	Reminders.create({
		title: req.body.title,
		reminderDate: req.body.date,
		UserId: req.user.id
	}).then(function (newReminder) {
		if (newReminder) {
			res.send({
				success: true,
				reminder: newReminder
			})
		}
		else {
			res.status(500).send('failed to create reminder');
		}
	});
});


router.post('/uploadImage', auth.requiresAuthentication, upload.single('reminderImage'), function (req, res, next) {

	var userId = req.user.id;
	var filePath = req.file.path;
	var reminderId = req.body.reminderId;
	Reminders.findOne({
		where: {
			id: reminderId,
			userId: userId
		}
	}).then(function (reminder) {
		var reminderService = new ReminderService;
		var assignImageResult = reminderService.assignImage(reminder.id, filePath, req.user);
		assignImageResult.then(function (assignImageResult) {
			res.send({
				created: true,
				newReminder: reminder,
				hasImage: true,
			});
		});

	});
});

module.exports = router;
