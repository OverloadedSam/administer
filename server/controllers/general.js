import User from '../models/User.js';
import OverallStat from '../models/OverallStat.js';
import Transaction from '../models/Transaction.js';
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

export const getDashboardStats = asyncHandler(async (req, res, next) => {
  // Hardcoded values due to limited data availability.
  const currentMonth = 'November';
  const currentYear = 2021;
  const currentDay = '2021-11-15';

  /* Recent Transactions */
  const transactions = await Transaction.find()
    .limit(50)
    .sort({ createdAt: -1 });

  /* Overall Stats */
  const overallStat = await OverallStat.find({ year: currentYear });

  const {
    totalCustomers,
    yearlyTotalSoldUnits,
    yearlySalesTotal,
    monthlyData,
    salesByCategory,
  } = overallStat[0];

  const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
    return month === currentMonth;
  });

  const todayStats = overallStat[0].dailyData.find(({ date }) => {
    return date === currentDay;
  });

  res.status(200).json({
    success: true,
    status: 200,
    data: {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    },
  });
});
