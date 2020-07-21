const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AUTH = require('../../config/auth.config');
const {emailValidator, passwordValidator} = require('../../utils/db.validators');

// userSchema defines User Model
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
}, {
  toObject: {virtuals: true},
  toJSON: {virtuals: true},
},
);


userSchema.virtual('fullname').get(() => {
  return [this.firstname, this.lastname].filter(Boolean).join(' ');
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
