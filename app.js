var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose  = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash')
var configDB = require('./config/db');

//connect to the db server
mongoose.connect(configDB.db.url, function(err){
    if(!err){
        console.log("Connect successfully");
    }else{
        console.log('Error connect to connect to Mongolab: ', err);
    }
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'a4f8071f-c873-4447-8ee2',
    cookie: {path: '/', httpOnly: true, maxAge: 2628000000, secure: false},
    store: new (require('express-sessions'))({
        storage: 'mongodb',
        instance: mongoose, // optional
        host: configDB.db.host, // optional
        port: configDB.db.port, // optional
        db:  configDB.db.name,// optional
        collection: 'sessions', // optional
        expire: 86400 // optional
    })
}));

//==== config passport
app.use(passport.initialize());
app.use(passport.session());//persistent login session
app.use(flash());//use connect-flash for flash messages stored in session
require('./config/passport')(passport); // pass passport for configuration


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//===== routes
require('./routes/index')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
