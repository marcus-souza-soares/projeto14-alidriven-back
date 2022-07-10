import { gettingProducts } from '../controllers/productController.js';
import { gettingOneProduct } from '../controllers/productController.js';
import { Router } from 'express';

const router = Router();

router.get('/products', gettingProducts);
router.get('/products/:id',gettingOneProduct);

export default router;