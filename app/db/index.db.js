const mongoose = require('mongoose');

const DB = require('../config/db.config');


// for  deprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify`
const DB_OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};


/**
 *
 */
function connectToDB() {
  mongoose.connect(DB.MONGO_URl, {...DB_OPTIONS})
  /* istanbul ignore next */
      .catch((err)=>{
        throw err;
      });
}


module.exports = {connectToDB};
