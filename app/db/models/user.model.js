const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AUTH = require('../../config/auth.config');
const {emailValidator, passwordValidator} = require('../../utils/db.validators');

// userSchema defines User Model
/**
 * @swagger
 * definitions:
 *  User:
 *    type: 'object'
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidator,
  },
  firstname: {type: String},
  lastname: {type: String},
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
// });
}, {
  // toObject: {virtuals: true},
  toJSON: {virtuals: true},
},
);


// userSchema.virtual('fullname').get(() => (`${this.firstname} ${this.lastname}`));
userSchema.virtual('fullName').
    get(function() {
      return `${this.firstname} ${this.lastname}`;
    }).
    set(function(v) {
    // `v` is the value being set, so use the value to set
      const firstname = v.substring(0, v.indexOf(' '));
      const lastname = v.substring(v.indexOf(' ') + 1);
      this.set({firstname, lastname});
    });

userSchema.pre('save', function(next) {
  if (this.password) {
    bcrypt.hash(this.password, AUTH.SALT_ROUNDS, (onerror, hash)=>{
      if (onerror) throw onerror;
      this.password = hash;
      next();
    });
  }
});

/* eslint new-cap: ["error", { "newIsCapExceptionPattern": "^mongoose\.." }] */
const User = new mongoose.model('User', userSchema);
module.exports = User;

// /**
//  *
//  * @param {object} value
//  * @return {boolean}
//  */
// function borrowValidator(value) {
//   console.log(value);
//   return true;
// }

// borrowed: [
//   {
//     _id: mongoose.Types.ObjectId,
//     took: {
//       type: Date,
//       default: Date.now(),
//     },
//     left: {
//       type: Date,
//       validate: {
//         validator: borrowValidator,
//         message: 'Return Date is Ahead of Taken Date',
//       },
//     },
//   },
// ],
