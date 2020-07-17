const faker = require('faker');
const mongoose = require('mongoose');
const Book = require('../models/bookModel');

const NUM_RECORDS = 100;

const MongoDataBase = process.env.MONGO_URl ||'mongodb://localhost:27017/lms';
mongoose.connect(MongoDataBase,
    {useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    async ()=>{
      console.log('Database Connection to lms ');
    });

faker.seed(7894);

for (let i=0; i<=NUM_RECORDS; i++) {
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
      if (i===NUM_RECORDS) {
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
