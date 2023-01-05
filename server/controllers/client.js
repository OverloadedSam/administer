import User from '../models/User.js';
import ProductStat from '../models/ProductStat.js';
import asyncHandler from '../middlewares/asyncHandler.js';

export const getProducts = asyncHandler(async (req, res, next) => {
  const productsWithStats = await ProductStat.find().populate('productId');

  res.status(200).json({
    success: true,
    status: 200,
    data: productsWithStats,
  });
});

export const getCustomers = asyncHandler(async (req, res, next) => {
  const users = await User.find({ role: 'user' }).select('-password');

  res.status(200).json({
    success: true,
    status: 200,
    data: users,
  });
});
