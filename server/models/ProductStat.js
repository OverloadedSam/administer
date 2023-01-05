import mongoose from 'mongoose';

const ProductStatSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    yearlySalesTotal: {
      type: Number,
    },
    yearlyTotalSoldUnits: {
      type: Number,
    },
    year: {
      type: Number,
    },
    monthlyData: {
      type: [
        {
          month: String,
          totalSales: Number,
          totalUnits: Number,
        },
      ],
    },
    dailyData: {
      type: [
        {
          date: String,
          totalSales: Number,
          totalUnits: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

const ProductStat = mongoose.model('ProductStat', ProductStatSchema);
export default ProductStat;
