var mongoose = require("mongoose");
module.exports = function (){
  /* Reminder Schema */
    var reminderSchema = mongoose.Schema({
        title: String,
        created: Date
    });
    var Reminder = mongoose.model('reminder', reminderSchema);
    // create some dummy data. 
    Reminder.find({}).exec(function (err, collection) {
        if (!err) {
            if (collection.length == 0){ 
                // if db is empty, create a fake reminder. 
                var today = new Date();
                var newReminder = new Reminder({
                    title: "New Reminder",
                    date: today
                });  
                newReminder.save(); 
                console.log('saved'); 
            }
        } 
    });
    return {
        Reminder: Reminder
    }

}