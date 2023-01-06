import User from '../models/User.js';
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
