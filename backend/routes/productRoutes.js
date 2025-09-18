import express from 'express';
import { createProduct } from '../controllers/productController.js';
import authMiddleware, { protect } from '../middleware/authMiddleware.js';
// Import the new multiple image upload middleware
import { uploadProductImages } from '../middleware/uploadMiddleware.js';

const productRouter = express.Router();


productRouter.post('/', protect(['seller']), uploadProductImages, createProduct);

export default productRouter;