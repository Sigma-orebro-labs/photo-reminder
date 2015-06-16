var mongoose = require("mongoose");


module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function callback() {
        console.log("photoreminder db opened");
    });
    
    /* Reminder Schema */
    var reminderSchema = mongoose.Schema({
        title: String,
        created: Date
    });
    var Reminder = mongoose.model('reminder', reminderSchema);
     
    
    Reminder.find({}).exec(function (err, collection) {
        if (!err) {
            if (collection.length == 0){ 
                // if db is empty, create a fake reminder. 
                var newReminder = new Reminder({
                    title: "New Reminder",
                    date: new Date()
                });  
                newReminder.save(); 
                console.log('saved'); 
            }
        } 
    });
}