import express from 'express';
import validateId from '../middlewares/validateId.js';
import { getUser } from '../controllers/general.js';

const router = express.Router();

router.get('/user/:id', validateId('id'), getUser);

export default router;
