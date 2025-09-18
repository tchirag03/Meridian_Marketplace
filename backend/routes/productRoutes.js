import express from 'express';
import { createProduct } from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';
// Import the new multiple image upload middleware
import { uploadProductImages } from '../middleware/uploadMiddleware.js';

const productRouter = express.Router();

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Vendor)
productRouter.post('/', authMiddleware, uploadProductImages, createProduct);

export default productRouter;