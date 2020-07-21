const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const db = require('./app/db/index.db');

const indexRouter = require('./app/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'ejs');

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
  const adminRouter = require('./app/routes/renders/admin.router');
  app.use('/admin', adminRouter);
}

db.connectToDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(helmet());

app.use(session({
  secret: 'keyboard cat',
  name: 'C4Projects',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: true},
}));

app.use('/', indexRouter);

app.get('*', function(req, res) {
  res.status(404).json({
    message: 'Endpoint You are looking for is not defined',
  });
});

// error handler
// catch 404 and forward to error handler
app.use(
    /* istanbul ignore next */
    function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });


module.exports = app;
