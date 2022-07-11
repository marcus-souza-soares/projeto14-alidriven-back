import { gettingProducts } from '../controllers/productController.js';
import { gettingOneProduct } from '../controllers/productController.js';
import { postPurchase } from '../controllers/cartController.js';
import { userValidate } from '../middlewares/productsMiddleware.js';
import { Router } from 'express';

const router = Router();



router.get('/products', gettingProducts);
router.get('/products/:id',gettingOneProduct);



router.post("/purchases", userValidate, postPurchase)

export default router;