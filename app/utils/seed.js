const faker = require('faker');
const mongoose = require('mongoose');
const Book = require('../db/models/book.model');
const db = require('../db/index.db');
db.connectToDB();

const DB = require('../config/db.config');
const NUMRECORDS = DB.NUM_RECORDS;
faker.seed(DB.FAKER_SEED);

for (let i=0; i<=NUMRECORDS; i++) {
  const newBook={
    name: faker.random.words(),
    cupBoardNumber: faker.random.number(),
    genre: faker.random.word(),
  };
  Book.create(newBook, (err, savedBook)=>{
    /* istanbul ignore if */
    if (err) {
      throw err;
    } else {
      console.log(savedBook.id);
      if (i===NUMRECORDS) {
        process.exit();
      }
    }
  });
}

process.on('exit', function(code) {
  mongoose.connection.close();
  /* istanbul ignore else */
  if (code===0) {
    return console.log('\n Data Added TO DB');
  } else {
    return console.log(`About to exit with code ${code}`);
  }
});
