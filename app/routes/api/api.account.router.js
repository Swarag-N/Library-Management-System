const express = require('express');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const AUTH = require('../../config/auth.config');
const User = require('../../db/models/user.model');
const router = new express.Router();

/**
 *
 * @param {object} request
 * @param {object} response
 * @param {callback} next
 */
function isAuthenticated(request, response, next) {
  let token = request.headers['authorization'];
  if (token) {
    if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, AUTH.JWT_PK, (error, userDetails)=>{
      if (error) {
        response.status(400).json(createError(400, error.message));
      } else {
        request.locals= {id: userDetails.id};
        next();
      }
    });
  } else {
    response.status(400).json({message: 'Token Not Sent'});
  }
}

router.get('/', isAuthenticated, (request, response)=>{
  const {id} = request.locals;
  User.findById(id, {password: 0}, (onerror, foundUser)=>{
    if (onerror) {
      response.status(500).json(createError(500));
    } else {
      response.json(foundUser);
    }
  });
});

// router.post('/password', isAuthenticated, (request, response)=>{
//   const {id} = request.locals;
//   const {password} = request.body;
//   User.findOneAndUpdate(id, {password}, {password: 0}, (onerror, foundUser)=>{
//     if (onerror) {
//       response.status(500).json(createError(500, onerror.message));
//     } else {
//       response.json(foundUser);
//     }
//   });
// });


module.exports = router;
