var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var helmet = require('helmet');
var session = require("express-session");
var config = require('config');
var validate = require('express-validation');
var debug = require('debug')('sd');
var app = express();
app.use(compression()); //Compress all routes. For a high-traffic website in production you wouldn't use this middleware. Instead you would use a reverse proxy like Nginx.
app.use(helmet()); // See https://helmetjs.github.io/docs/ for more information on what headers it sets/vulnerabilities it protects against
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
debug('config.session.secret', config.session.secret);
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false
}))

// Initialize Passport and restore authentication state, if any, from the session.
var authentication = require('./authentication');
app.use(authentication.initialize());
app.use(authentication.session());

app.use((req, res, next) => {
  debug('reqBody', req.body);
  debug('reqParams', req.params);
  debug('reqQuery', req.query);
  next();
});
debug('Registering routes.');
var loginRoutes = require('./routes/login.routes');
app.use('/api', loginRoutes);
var savingDepositRoutes = require('./routes/saving-deposit.routes');
app.use('/api', savingDepositRoutes);
var userRoutes = require('./routes/user.routes');
app.use('/api', userRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new createError.NotFound());
});

// error handler
app.use(function (error, req, res, next) {
  debug(error.stack);
  if(error instanceof validate.ValidationError) {
    return res.status(error.status).json({error});
  }

  res.status(error.status || 500);
  res.json({error: error.message || 'Something went wrong. Please try in a bit.'});
});

module.exports = app;