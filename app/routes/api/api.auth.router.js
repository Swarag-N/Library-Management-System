const express = require('express');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AUTH = require('../../config/auth.config');
const User = require('../../db/models/user.model');


const router = new express.Router();

router.post('/signUp', (request, response)=>{
  const {email, password, firstname, lastname, username}=request.body;
  User.create({email, password, firstname, lastname, username}, (onerror, newUser)=>{
    if (onerror) {
      response.status(400).json(createError(400, onerror.message));
    } else {
      const {email, username, firstname}=newUser;
      response.status(201).json({email, username, firstname});
    }
  });
});

router.post('/login', (request, response)=>{
  const {username, password} = request.body;
  // const valid = (password !== null && password !== undefined);
  // console.log('******************************', valid);
  if (password && username) {
    User.findOne({username}, (onerror, foundUser)=>{
      if (onerror) {
        response.status(500).json(createError(500));
      } else {
        if (foundUser) {
          bcrypt.compare(password, foundUser.password)
              .then(function(result) {
                if (result) {
                  jwt.sign({id: foundUser._id}, AUTH.JWT_PK, {algorithm: 'HS256'}, (err, token)=>{
                    response.json({message: 'Successful', token: token});
                  });
                } else {
                  response.status(400).json(createError(400, 'Wrong Password'));
                }
              })
              .catch((err)=>{
                response.status(500).json(createError(500, err.message));
              });
        } else {
          response.status(404).json(createError(404, 'No User Exists'));
        }
      }
    });
  } else {
    response.status(400).json(createError(400, `${username?'password':'username'} Not Sent`));
  }
});

module.exports = router;
