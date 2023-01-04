import mongoose from 'mongoose';

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
  } catch (error) {
    console.log('CONNECTION FAILED TO DB!');
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
