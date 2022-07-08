import { loginUser, createUser } from '../controllers/authController.js';
import validateLogin from "../middlewares/loginMiddleware.js";
import validateSignUp from "../middlewares/signUpMiddleware.js"
import { Router } from 'express';

const router = Router();

router.post('/login', validateLogin, loginUser);
router.post('/cadastrar', validateSignUp, createUser);

export default router;