import express from 'express';
import validateId from '../middlewares/validateId.js';
import { getUser, getDashboardStats } from '../controllers/general.js';

const router = express.Router();

router.get('/user/:id', validateId('id'), getUser);
router.get('/dashboard', getDashboardStats);

export default router;
