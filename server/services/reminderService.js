var models = require('../models/');
var q = require('q');
var tesseract = require('node-tesseract');
var ImageParser = require('../services/ocrParser')
var fs = require('fs');
var path = require('path');
var Reminder = models.Reminder;
var uuid = require('node-uuid');
var mkdirp = require('mkdirp');

var prototype = ReminderService.prototype;
function ReminderService() {
	// ctor
};

prototype.assignImage = function (reminderId, filePath, user) {
	var deferred = q.defer();

	var tmp_path = filePath;
	/** The original name of the uploaded file
		stored in the variable "originalname". **/
	var targetFileName = uuid.v1() + '.png';
	var staticUrlPath = 'ocr/' + user.id + '/' + targetFileName;
	var target_folder = './server/public/ocr/' + user.id + '/';
	var target_path = target_folder + targetFileName;
	mkdirp(target_folder, function (err) {
		if (!err) {
			var src = fs.createReadStream(tmp_path);
			// create target path if not exists. 
			var dest = fs.createWriteStream(target_path);
			src.pipe(dest);
			src.on('end', function (err, data) {
				
				/* File is uploaded OK, create db entry */
				models.Picture.create({
					ReminderId: reminderId,
					imageUrl: staticUrlPath,
					title: 'test'
				}).then(function (createdImage) {
					/* Db entry created, parse image and update 'content'-column for reminder*/
					try {
						var ocrParser = new ImageParser();
						ocrParser.parsePicture(target_path)
						// success
							.then(function (parsedText) {
								// 
								models.Reminder.update({
									content: parsedText
								}, {
										where: {
											id: reminderId
										}
									});

								deferred.resolve({
									status: 'OK',
									updated: reminderId
								});
							}, function (error) {
								deferred.reject(error);
							});
					}
					catch (ex) {
						deferred.reject('Image Parsing Failed: ', ex);
					}
					/*find and update the appropriate reminder entry */
				});

			});
		}
		
		else {
			deferred.reject('Failed to create directory: ', err);
			throw 'Failed to create directory';
		}
	});


	return deferred.promise;
}


module.exports = ReminderService;  