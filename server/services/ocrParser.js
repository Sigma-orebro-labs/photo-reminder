var models = require('../models/');
var tesseract = require('node-tesseract');
var q = require('q');

var prototype = ImageParser.prototype;

function ImageParser() {
    // this._age = age;
}

prototype.parsePicture = function (pictureUrl) {

    var options = {
        l: 'swe',
        psm: 6
    };

    var deferred = q.defer();
    tesseract.process(pictureUrl, options, function (err, text) {
        if (err) {
            console.error(err);
            deferred.reject(err);
        } else {
            deferred.resolve(text);
        }
    });
    return deferred.promise;
}


module.exports = ImageParser;