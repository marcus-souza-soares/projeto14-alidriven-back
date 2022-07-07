import express from 'express';
import router from './routes/authRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



const server = express();
server.use(express.json());
server.use(cors());

server.use(router);

server.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});