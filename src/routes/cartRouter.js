import { Router } from 'express';
import { validateSession } from '../middlewares/userValidate.js';
import { addingProduct } from '../controllers/cartController.js';
import { postCart, deleteCart, getCart, deleteItemOfCart } from "../controllers/cartController.js";
import { userValidate } from "../middlewares/productsMiddleware.js";

const router = Router();

router.put('/cart', validateSession, addingProduct);


router.get("/cart", userValidate, getCart);
router.post("/cart", userValidate, postCart);
router.delete("/cart", userValidate, deleteCart);
router.delete("/cartItem", userValidate, deleteItemOfCart);

export default router;