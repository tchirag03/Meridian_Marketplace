import express from 'express';
// Note: We don't import verifyPayment anymore
import { createBuyNowOrder } from '../controllers/order.js';
import authMiddleware, { protect } from '../middleware/authMiddleware.js';

const orderRouter = express.Router();


orderRouter.post('/buy-now', protect(['buyer']), createBuyNowOrder);


export default orderRouter;