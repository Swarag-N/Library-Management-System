const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cupBoardNumber: Number,
  genre: String,
});

/* eslint new-cap: ["error", { "newIsCapExceptionPattern": "^mongoose\.." }] */
const Book = new mongoose.model('Book', bookSchema);
module.exports = Book;
