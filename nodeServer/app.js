var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sequelize = require('./models').sequelize;

var fileRouter = require('./routes/listpage');
var imgRouter = require('./routes/imgback');
var detailRouter = require('./routes/detailpage');
var textRouter = require('./routes/textpage');
var interactionRouter = require('./routes/interactionpage');

var app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/listpage', fileRouter);
app.use('/imgback', imgRouter);
app.use('/detailpage', detailRouter);
app.use('/textpage', textRouter);
app.use('/interactionpage', interactionRouter);

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
