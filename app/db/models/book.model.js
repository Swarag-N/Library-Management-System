const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *  Book:
 *    type: "object"
 *    properties:
 *      id:
 *        type: "string"
 *        format: "ObjectId"
 *      name:
 *        type: "string"
 *        format: "string"
 *      cupBoardNumber:
 *        type: "integer"
 *        format: "int"
 *      genre:
 *        type: "string"
 *        format: "string"
 *    xml:
 *      name: "Order"
 */
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
