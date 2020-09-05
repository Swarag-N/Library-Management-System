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
 *        example: "ObjectId('5f4399be7c4460234c97a71d')"
 *      name:
 *        type: "string"
 *        format: "string"
 *        example: "War and Peace"
 *      cupBoardNumber:
 *        type: "integer"
 *        format: "int"
 *        example: 7845
 *      genre:
 *        type: "string"
 *        format: "string"
 *        example: "Action"
 *    required:
 *    - name
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
