import { Router } from 'express';
import { postCart, deleteCart, getCart, deleteItemOfCart } from "../controllers/cartController.js";
import { userValidate } from "../middlewares/productsMiddleware.js";

const router = Router();

router.get("/cart", userValidate, getCart);
router.put("/cart", userValidate, postCart);
router.delete("/cart", userValidate, deleteCart);
router.delete("/cartItem", userValidate, deleteItemOfCart);

export default router;