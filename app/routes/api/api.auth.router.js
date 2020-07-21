const express = require('express');
const createError = require('http-errors');

const User = require('../../db/models/user.model');

const router = new express.Router();

router.post('/signUp', (request, response)=>{
  const {email, password, firstname, lastname, username}=request.body;
  User.create({email, password, firstname, lastname, username}, (onerror, newUser)=>{
    if (onerror) {
      response.status(400).json(createError(400, 'Invalid Parameters'));
    } else {
      const {email, username, firstname}=newUser;
      response.status(201).json({email, username, firstname});
    }
  });
});

router.post('/login', (request, response)=>{
  const {username, password} = request.body;
  if (password !== null && password !== undefined) {
    User.findOne({username}, (onerror, foundUser)=>{
      if (onerror) {
        response.status(404).json(createError(404, 'No User Exists'));
      } else {
        if (foundUser.password === password) {
          response.json({message: 'Successful', token: ''});
        } else {
          response.status(400).json(createError(400, 'Wrong Password'));
        }
      }
    });
  } else {
    response.status(400).json(createError(400, 'Password No Sent'));
  }
});

module.exports = router;