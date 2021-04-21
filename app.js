const mysql = require('mysql');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var fileUpload = require('express-fileupload');
var logger = require('morgan');
var hbs = require("hbs");

require('dotenv').config();

hbs.registerPartials(path.join(__dirname, "views/partials"));

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var uploadRouter = require('./routes/upload');
var resultsRouter = require('./routes/results');
var profileRouter = require('./routes/profile');
var codeRouter = require('./routes/API/code');
var app = express();

// creates connection to database
// mysqlConnection takes in a config. object which contains host, user, password and the database name
const pool = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

// creates a pool to handle query requests
pool.connect((err) => {
  if(err) {
    console.log('error has occured');
    throw err;
  }
  console.log('Connected to Database');
});
 db = global.pool;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

app.use('/', homeRouter);
app.use('/index', indexRouter);
app.use('/login', loginRouter);
app.use('/upload', uploadRouter);
app.use('/results', resultsRouter);
app.use('/code', codeRouter);
app.use('/profile', profileRouter);

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
