import express from 'express';
import validateId from '../middlewares/validateId.js';
import { getAdmins, getPerformanceByUser } from '../controllers/management.js';

const router = express.Router();

router.get('/admins', getAdmins);
router.get('/performance/:id', validateId('id'), getPerformanceByUser);

export default router;
