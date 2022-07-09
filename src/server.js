import express from 'express';
import authRouter from './routes/authRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter);

server.listen(process.env.PORT)