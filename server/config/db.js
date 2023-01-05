import mongoose from 'mongoose';
import User from '../models/User.js';
import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import Transaction from '../models/Transaction.js';
// import {
//   dataUser,
//   dataProduct,
//   dataProductStat,
//   dataTransaction,
// } from '../data/index.js';

const connectDB = async () => {
  const URI = process.env.DB_CONNECTION_STRING;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  };

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(URI, options);
    console.log('SUCCESSFULLY CONNECTED TO DB!');

    /* INSERT ONLY FOR 1ST TIME WHEN SETTING UP DEV SERVER */
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
  } catch (error) {
    console.log('CONNECTION FAILED TO DB!');
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
