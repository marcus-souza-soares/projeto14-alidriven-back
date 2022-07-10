import { Router } from 'express';
import { userValidate } from '../middlewares/userValidate.js';
import { addingProduct } from '../controllers/cartController.js';
const router = Router();

router.put('/cart', userValidate, addingProduct);

export default router;