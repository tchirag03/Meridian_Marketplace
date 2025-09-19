import express from 'express';
import { getDashboardSummary } from '../controllers/dashboard.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/summary', protect(['seller']), getDashboardSummary);

export default dashboardRouter;
