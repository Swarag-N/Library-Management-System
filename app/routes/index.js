const express = require('express');
const router = new express.Router();

// const indexRouter = require('./app/routes/index');
const usersRouter = require('./users');
const bookRouter = require('./bookRoutes');
const bookRouterAPI = require('./bookRoutesAPI');

// if (process.env.NODE_ENV !== 'test') {
//   // router.use(logger('dev'));
//   const adminRouter = require('./adminRouter');
//   router.use('/admin', adminRouter);
// }

// router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/books', bookRouter);
router.use('/api/books', bookRouterAPI);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

module.exports = router;


