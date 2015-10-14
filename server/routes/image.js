var express = require('express');
var router = express.Router();
var models = require('../models/');
var tesseract = require('node-tesseract');
var ImageParser = require('../services/ocrParser')
var fs = require('fs');
var path = require('path');
var multer = require('multer')
var upload = multer({ dest: 'ocr/' })
var Reminder = models.Reminder;
var uuid = require('node-uuid');


/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('image');
});


router.post('/upload/:reminderId?', upload.single('picture'), function (req, res, next) {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	var tmp_path = req.file.path;
	var reminderId = req.params.reminderId;
	/** The original name of the uploaded file
		stored in the variable "originalname". **/
	var targetFileName = uuid.v1() + '.png';
	var target_path = 'public/ocr/' + targetFileName;
	var src = fs.createReadStream(tmp_path);
	var dest = fs.createWriteStream(target_path);
	src.pipe(dest);
	src.on('end', function () {
		/* File is uploaded OK, create db entry */
		models.Picture.create({
			ReminderId: reminderId,
			imageUrl: target_path,
			title: 'test'
		}).then(function (createdImage) {
			/* Db entry created, parse image and update 'content'-column for reminder*/
			var ocrParser = new ImageParser();
			ocrParser.parsePicture(target_path)
			// success
				.then(function (parsedText) {
					models.Reminder.update({
						content: parsedText
					},
						{
							where: {
								id: reminderId
							}
						}).then(function () {

							res.send({
								status: 'OK',
								updated: reminderId
							});

						});
				}, function (error) {
					console.log('ouch');
				});
			/*find and update the appropriate reminder entry */
		});

	});
	src.on('error', function (err) {
		res.send('error');
	});
});

module.exports = router;
