import express from 'express';
import { createProduct, getTotalProducts, getProductsByCategory } from '../controllers/products.js';
import { protect } from '../middleware/authMiddleware.js';
// Import the new multiple image upload middleware
import { uploadProductImages } from '../middleware/uploadMiddleware.js';

const productRouter = express.Router();


productRouter.post('/', protect(['seller']), uploadProductImages, createProduct);
productRouter.get('/total', protect(['admin']), getTotalProducts);
productRouter.get('/by-category', protect(['admin']), getProductsByCategory);

export default productRouter;
