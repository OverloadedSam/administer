import mongoose from 'mongoose';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import asyncHandler from '../middlewares/asyncHandler.js';

export const getAdmins = asyncHandler(async (req, res, next) => {
  const admins = await User.find({
    role: { $in: ['admin', 'superadmin'] },
  }).select('-password');

  res.status(200).json({
    success: true,
    status: 200,
    count: admins.length,
    data: admins,
  });
});

export const getPerformanceByUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const userWithStats = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'affiliatestats',
        localField: '_id',
        foreignField: 'userId',
        as: 'affiliateStats',
      },
    },
    { $unwind: '$affiliateStats' },
  ]);

  console.log(userWithStats);

  const saleTransactions = await Promise.all(
    userWithStats[0].affiliateStats.affiliateSales.map((id) => {
      return Transaction.findById(id);
    })
  );

  const filteredSaleTransactions = saleTransactions.filter(
    (transaction) => transaction !== null
  );

  res.status(200).json({
    success: true,
    status: 200,
    data: {
      user: userWithStats[0],
      sales: filteredSaleTransactions,
    },
  });
});
