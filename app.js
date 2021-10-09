const mysql = require('mysql');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const hbs = require('hbs');

require('dotenv').config();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

const indexRouter = require('./routes/index');
const homeRouter = require('./routes/home');
const codeListingRouter = require('./routes/codeListing');
const loginRouter = require('./routes/login');
const uploadRouter = require('./routes/upload');
const profileRouter = require('./routes/profile');
const resultsRouter = require('./routes/API/results');
const codeRouter = require('./routes/API/code');
const viewRouter = require('./routes/viewCode');
const dataRouter = require('./routes/data');
const app = express();

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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

app.use('/', homeRouter);
app.use('/index', indexRouter);
app.use('/codeListing', codeListingRouter);
app.use('/login', loginRouter);
app.use('/upload', uploadRouter);
app.use('/profile', profileRouter);
app.use('/results', resultsRouter);
app.use('/code', codeRouter);
app.use('/viewCode', viewRouter);
app.use('/data', dataRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);

//   // Does not exist?
//   // res.render('error');
// });

module.exports = app;