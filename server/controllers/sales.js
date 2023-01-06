import OverallStat from '../models/OverallStat.js';
import asyncHandler from '../middlewares/asyncHandler.js';

export const getSales = asyncHandler(async (req, res, next) => {
  const overallStats = await OverallStat.find();

  res.status(200).json({
    success: true,
    status: 200,
    data: overallStats[0],
  });
});
