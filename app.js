const mysql = require('mysql');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require("hbs");

hbs.registerPartials(path.join(__dirname, "views/partials"));

var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var uploadRouter = require('./routes/upload');
var resultsRouter = require('./routes/results');
var app = express();

// creates connection to database
// mysqlConnection takes in a config. object which contains host, user, password and the database name
const sqlConfig = mysql.createConnection({
  user: "wvdrotk2j9u8n4br",
  password: "onwcrf4b5ve140ca",
  host: "klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: "3306",
  database: "aqz11ng3dobtihrg"
});

// creates a pool to handle query requests
const pool = mysql.createPool(sqlConfig);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/upload', uploadRouter);
app.use('/results', resultsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
