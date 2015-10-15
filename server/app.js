var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var usersRoutes = require('./routes/users');
var imageRoutes = require('./routes/image');
var reminderRoutes = require('./routes/reminder');
var authRoutes = require('./routes/auth');
var models = require("./models");
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

// config passport. 
require('./config/passport')(passport);

var app = express();

// sync db
models.sequelize.sync().then(function () {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  /* passport stuff */

  app.use(session({
    secret: 'balmerpeak',
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in sessiosn
  
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  /* Seed db with dev user */
  models.User.seedDev();

  app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header('Access-Control-Allow-Credentials', "true");
    return next();
  })
  
  /* Routing configs files to use*/
  // app.use('/', routes);
  app.use('/users', usersRoutes(app, passport));
  // app.use('/image', imageRoutes);
  app.use('/reminder', reminderRoutes);
  app.use('/auth', authRoutes(passport)); 
  
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  app.listen(3000);
});


module.exports = app;
