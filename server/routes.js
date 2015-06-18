var mongoose = require("mongoose");  
 var models = require('./models')(); 

module.exports = function(app){
   
  
    
    app.get('/Reminders', function(req, res, next){
        res.setHeader('Content-Type', 'application/json');
        
        console.log(models.Reminder.find({}, function(err, results){
         res.send(results, null, 3);
        })); 
        
       
    });
} 