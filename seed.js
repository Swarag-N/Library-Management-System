const faker = require('faker'),
    mongoose = require('mongoose'),
    Book = require('./models/bookModel');

const MongoDataBase = process.env.MONGO_URl ||"mongodb://localhost:27017/lms";
mongoose.connect(MongoDataBase,
    {useNewUrlParser: true,
        useUnifiedTopology: true
    },
    async ()=>{console.log("Database Connection to lms ");
    });

faker.seed(7894);

for (let i=0;i<=10;i++){
    let new_book={
        name:faker.random.words(),
        cupBoardNumber:faker.random.number(),
        genre:faker.random.word()
    };
    console.warn(new_book);
    Book.create(new_book,(err,saved_book)=>{
       if (err){
           console.log(err)
       } else{
           console.log(saved_book.id)
       }
    });
}