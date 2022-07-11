import express from 'express';
import authRouter from './routes/authRouter.js';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import purchasesRouter from './routes/purchasesRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(productsRouter);
server.use(cartRouter);
server.use(purchasesRouter);

server.listen(process.env.PORT);


