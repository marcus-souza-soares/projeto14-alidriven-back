import { Router } from 'express';
import { gettingOrders } from '../controllers/ordersController.js';
import { gettingOneOrder } from '../controllers/ordersController.js';
import { validateSession } from '../middlewares/userValidate.js';

const router = Router();

router.get('/orders', validateSession, gettingOrders);
router.get('/orders/:id', validateSession, gettingOneOrder);

export default router;