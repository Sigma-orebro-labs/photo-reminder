var mongoose = require("./mongoose"); 


module.exports = function(app){
    app.get('/Reminders', function(req, res, next){
        
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify( Reminder.findOne(), null, 3));
    });
} 