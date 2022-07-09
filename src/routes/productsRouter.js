import { gettingProducts } from '../controllers/productController.js';
import { Router } from 'express';

const router = Router();

router.get('/products', gettingProducts);


export default router;