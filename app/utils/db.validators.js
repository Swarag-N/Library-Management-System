const validate = require('mongoose-validator');

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Please fill a valid email address',
  }),
];

const passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [6, 50],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'matches',
    arguments: /\d/,
    message: 'Password should contain numbers',
  }),
  validate({
    validator: 'matches',
    arguments: /[a-zA-Z]/,
    message: 'Password should contain letters',
  }),
  validate({
    validator: 'matches',
    arguments: /[A-Z]/,
    message: 'Password must contain one uppercase letter',
  }),
  validate({
    validator: 'matches',
    arguments: /[ ! @ # $ % ^ & * ( ) _ + . , ; :]/,
    // arguments: /[ \! \@ \# \$ \% \^ \& \* \( \) \_ \+ \. \, \; \:]/,
    // arguments: /[\! @ # $ % ^ & * ( ) _ + . , ; :]/,
    message: 'Password should contain a special characters like !@#$%^&*()_+',
  }),
];

module.exports = {emailValidator, passwordValidator};
