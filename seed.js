const faker = require('faker');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');

const MongoDataBase = process.env.MONGO_URl ||'mongodb://localhost:27017/lms';
mongoose.connect(MongoDataBase,
    {useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    async ()=>{
      console.log('Database Connection to lms ');
    });

faker.seed(7894);

for (let i=0; i<=10; i++) {
  const newBook={
    name: faker.random.words(),
    cupBoardNumber: faker.random.number(),
    genre: faker.random.word(),
  };
  console.warn(newBook);
  Book.create(newBook, (err, savedBook)=>{
    if (err) {
      console.log(err);
    } else {
      console.log(savedBook.id);
    }
  });
}
