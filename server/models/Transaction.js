import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: [true, 'User is required!'],
    },
    cost: {
      type: String,
      require: [true, 'Cost field is mandatory!'],
    },
    products: {
      type: [mongoose.Schema.ObjectId],
      of: Number,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;
