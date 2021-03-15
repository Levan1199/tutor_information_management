var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//
var session = require('express-session');
var FileStore = require('session-file-store');
var passport = require('passport');
var authenticate = require('./authenticate');
//
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// API routes
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');
var uploadRouter = require('./routes/uploadRouter');
var favoriteRouter = require('./routes/favoriteRouter');
var commentRouter = require('./routes/commentRouter');

var teacherRegRouter = require('./routes/teacherRegRouter');
var studentRegRouter = require('./routes/studentRegRouter');
// Mongoose
const mongoose = require('mongoose');

// Connect to mongoDB
const url = 'mongodb://localhost:27017/tutim';
const connect = mongoose.connect(url,{ useNewUrlParser: true });

connect.then((db)=>{
  console.log('Connected correctly to server');
},(err)=>{ console.log(err); });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
app.use(passport.initialize());
//

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Adding routes of API endpoints
app.use('/leaders', leaderRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/imageUpload', uploadRouter);
app.use('/favorites', favoriteRouter);
app.use('/comments', commentRouter);
app.use('/teacherReg', teacherRegRouter);
app.use('/studentReg', studentRegRouter);

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
