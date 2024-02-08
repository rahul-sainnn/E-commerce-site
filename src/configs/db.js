const mongoose = require('mongoose');
require('dotenv').config();
const chalk = require('chalk');

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {  
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(chalk.bgMagenta.white(`Connected to MongoDB ${conn.connection.host}`));
  } catch (error) {
    console.error(chalk.bgRed.white(`Error in connection ${error}`));
  }
};

module.exports = connectDB;
