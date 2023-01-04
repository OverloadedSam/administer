import User from '../models/User.js';
import asyncHandler from '../middlewares/asyncHandler.js';

export const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    status: 200,
    data: user,
  });
});
