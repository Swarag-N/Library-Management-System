const mongoose = require('mongoose');

const bookDeatilSchema = new mongoose.Schema({
  bookID: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
    bname: String,
  },
});

/* eslint new-cap: ["error", { "newIsCapExceptionPattern": "^mongoose\.." }] */
const BookDetail = new mongoose.model('BookDetail', bookDeatilSchema);
module.exports = BookDetail;
