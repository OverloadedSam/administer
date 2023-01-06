import mongoose from 'mongoose';

const AffiliateStatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User is required!'],
    },
    affiliateSales: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Transaction',
      required: [true, 'Affiliate sales can not be empty!'],
    },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model('AffiliateStat', AffiliateStatSchema);
export default AffiliateStat;
