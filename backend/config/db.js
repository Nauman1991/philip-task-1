
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/github-integration';


  const connectDB = async () => {
    mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
  };

module.exports = connectDB;