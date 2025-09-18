import { Router } from 'express';
import { getAllStores, searchStores } from '../controllers/store.js';
import authMiddleware from "../middleware/authMiddleware.js"
import { getProductsByStore } from '../controllers/products.js';
const storeRouter = Router();



storeRouter.get('/search', searchStores); //GET /api/stores/search

storeRouter.get('/', getAllStores); //GET /api/stores

storeRouter.get('/:storeId/products', getProductsByStore);

// Vendor Routes
storeRouter.get('/me', authMiddleware, getMyStore);
storeRouter.patch('/me', authMiddleware, updateMyStore);
storeRouter.patch('/me/image', authMiddleware, upload, uploadStoreImage);

export default storeRouter;