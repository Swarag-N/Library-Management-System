const DB = {
  MONGO_URl: process.env.MONGO_URl || 'mongodb://localhost:27017/lms',
  NUM_RECORDS: process.env.NUM_RECORDS||100,
  FAKER_SEED: process.env.FAKER_SEED || 7894,
};

module.exports =DB;
