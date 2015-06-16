var express = require("express"); 
var env = process.env.NODE_ENV = process.env.NODE_ENV || "Development"; 
var app = express(); 

// create a config object dep on environment. 
var config = require("./config")["development"];

// configure express app
require("./express")(app, config); 

// configure mongoDb/Mongoose connection
require("./mongoose")(config);  
    
// configure routing.  
require("./routes")(app);  

app.listen(config.port);  
console.log("listening on port: " + config.port); 
