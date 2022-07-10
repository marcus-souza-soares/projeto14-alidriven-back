import { Router } from 'express';
import { gettingOrders } from '../controllers/ordersController.js';
import { gettingOneOrder } from '../controllers/ordersController.js';
import { userValidate } from '../middlewares/userValidate.js';

const router = Router();

router.get('/orders', userValidate, gettingOrders);
router.get('/orders/:id', userValidate, gettingOneOrder);

export default router;