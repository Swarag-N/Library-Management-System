const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
   name:String,
   id:Number,
   genre:String
});

let Book;
Book = new mongoose.model("Book",bookSchema);
module.exports = Book;