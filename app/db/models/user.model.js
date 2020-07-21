const mongoose = require('mongoose');

// userSchema defines User Model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
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
});


userSchema.virtual('fullname').get(() => {
  return [this.firstname, this.lastname].filter(Boolean).join(' ');
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
