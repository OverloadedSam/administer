import mongoose from 'mongoose';
import getCountryIso3 from 'country-iso-2-to-3';
import User from '../models/User.js';
import ProductStat from '../models/ProductStat.js';
import Transaction from '../models/Transaction.js';
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

export const getTransactions = asyncHandler(async (req, res, next) => {
  const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;
  console.log({ page, pageSize, sort, search });

  const generateSort = (sort) => {
    if (!Boolean(sort)) return {};

    const sortParsed = JSON.parse(sort);
    const sortFormatted = {
      [sortParsed.field]: sortParsed.sort == 'asc' ? 1 : -1,
    };

    return sortFormatted;
  };
  const sortFormatted = generateSort(sort);

  // Make search objects for _id and userId field which are of type ObjectId.
  const matchMongooseIds = [];
  if (mongoose.isValidObjectId(search)) {
    matchMongooseIds.push({ _id: search });
    matchMongooseIds.push({ userId: search });
  }

  const transactions = await Transaction.find({
    $or: [{ cost: { $regex: new RegExp(search, 'i') } }, ...matchMongooseIds],
  })
    .skip(Math.abs(page) * pageSize)
    .limit(pageSize)
    .sort(sortFormatted)
    .collation({ locale: 'en_US', numericOrdering: true });

  const total = await Transaction.countDocuments({
    $or: [{ cost: { $regex: new RegExp(search, 'i') } }, ...matchMongooseIds],
  });

  res.status(200).json({
    success: true,
    status: 200,
    data: {
      page: Math.abs(page),
      count: transactions.length,
      total,
      transactions,
    },
  });
});

export const getGeography = asyncHandler(async (req, res, next) => {
  const users = await User.find().select('_id name country');

  let mappedLocations = users.reduce((acc, { country }) => {
    const countryISO3 = getCountryIso3(country);
    if (!acc[countryISO3]) acc[countryISO3] = 0;
    acc[countryISO3]++;

    return acc;
  }, {});

  const formattedLocations = Object.keys(mappedLocations).map((key) => ({
    id: key,
    value: mappedLocations[key],
  }));

  res.status(200).json({
    success: true,
    status: 200,
    data: formattedLocations,
  });
});
