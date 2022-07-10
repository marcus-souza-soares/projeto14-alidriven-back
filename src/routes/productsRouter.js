import { getProducts, postCart, deleteCart, getCart, deleteItemOfCart } from "../controllers/productsController.js";
import { Router } from "express";
import { userValidate } from "../middlewares/productsMiddleware.js";

const router = Router();

router.get("/products", getProducts);

router.get("/cart", userValidate, getCart);
router.post("/cart", userValidate, postCart);
router.delete("/cart", userValidate, deleteCart);
router.delete("/cartItem", userValidate, deleteItemOfCart);

export default router;