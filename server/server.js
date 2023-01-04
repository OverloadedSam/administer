import express from 'express';
import dotenv from 'dotenv';

/* CONFIGURATION */
const server = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`SERVER IS LISTENING AT PORT ${PORT}...`);
});
