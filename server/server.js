import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

/* CONFIGURATION */
const server = express();
dotenv.config();
server.use(express.json());
server.use(helmet());
server.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
server.use(morgan('common'));
server.use(cors());
connectDB();

/* ROUTES */
server.use('/client', clientRoutes);
server.use('/general', generalRoutes);
server.use('/management', managementRoutes);
server.use('/sales', salesRoutes);

/* CUSTOM ERROR HANDLER */
server.use(errorHandler)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`SERVER IS LISTENING AT PORT ${PORT}...`);
});
