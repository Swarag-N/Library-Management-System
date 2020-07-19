const mongoose = require('mongoose');

// for  deprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify`
const DB_OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,

};

// Database Connections
const MongoDataBase = process.env.MONGO_URl || 'mongodb://localhost:27017/lms';

/**
 *
 */
function connectToDB() {
  mongoose.connect(MongoDataBase, {...DB_OPTIONS})
      .catch((err)=>{
        throw err;
      });
}


// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

module.exports = {connectToDB};
