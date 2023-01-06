import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User is required!'],
    },
    cost: {
      type: String,
      required: [true, 'Cost field is mandatory!'],
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
