const express = require('express');
const router = new express.Router();

const bookRouterAPI = require('./bookRoutesAPI');

// Use middleware to set the default Content-Type
router.use((req, res, next)=>{
  res.header('Content-Type', 'application/json');
  next();
});

router.use('/api/books', bookRouterAPI);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'This is the Root of API',
  });
});


module.exports = router;


