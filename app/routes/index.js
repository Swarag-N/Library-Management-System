const express = require('express');
const router = new express.Router();

const bookRouterAPI = require('./api/api.book.router');
const authRouterAPI = require('./api/api.auth.router');

// Use middleware to set the default Content-Type
router.use((req, res, next)=>{
  res.header('Content-Type', 'application/json');
  next();
});

router.use('/api/books', bookRouterAPI);
router.use('/api/auth', authRouterAPI);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'This is the Root of API',
  });
});


module.exports = router;


