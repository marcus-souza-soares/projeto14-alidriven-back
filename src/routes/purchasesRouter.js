import { Router } from 'express';
import { gettingPurchases } from '../controllers/purchasesController.js';
import { gettingOnePurchase } from '../controllers/purchasesController.js';
import { validateSession } from '../middlewares/userValidate.js';

const router = Router();

router.get('/purchases', validateSession, gettingPurchases);
router.get('/purchases/:id', validateSession, gettingOnePurchase);

export default router;