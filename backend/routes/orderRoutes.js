import express from 'express';
// Note: We don't import verifyPayment anymore
import { createBuyNowOrder, getTotalOrders, getTotalRevenue, getOrdersByStatus, getRevenueByMonth, getOrderTrends, getAverageOrderValue } from '../controllers/order.js';
import { protect } from '../middleware/authMiddleware.js';

const orderRouter = express.Router();


orderRouter.post('/buy-now', protect(['buyer']), createBuyNowOrder);

orderRouter.get('/total', protect(['seller']), getTotalOrders);
orderRouter.get('/total-revenue', protect(['seller']), getTotalRevenue);
orderRouter.get('/by-status', protect(['seller']), getOrdersByStatus);
orderRouter.get('/revenue-by-month', protect(['seller']), getRevenueByMonth);
orderRouter.get('/trends', protect(['seller']), getOrderTrends);
orderRouter.get('/average-value', protect(['seller']), getAverageOrderValue);


export default orderRouter;
