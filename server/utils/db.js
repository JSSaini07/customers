const mongoose = require('mongoose');
const logger = require('./logger'); 

const connectDB = () => {
  // in a prod environment this key should be setup in environment variables
  // i didn't do that because then local setup won't work for others 
  const MONGO_URL = "mongodb+srv://JSSaini07:JWKfPgEW7XAYeqa@customers-c5p2p.mongodb.net/test?retryWrites=true&w=majority";
  logger.info('Connecting to mongoDB');
  mongoose.connect(MONGO_URL, { useNewUrlParser: true },  (err, res) => {
    if(err) {
      logger.error(`Couldn't connect to mongoDB ${err}`);
      return;
    }
    logger.success('Connected to mongoDB');
  })
}

module.exports = connectDB;
