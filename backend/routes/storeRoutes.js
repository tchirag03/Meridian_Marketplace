import { Router } from 'express';
import { getAllStores, searchStores, getMyStore, updateMyStore, uploadStoreImage ,createStore, getTotalStores, getTopRatedStores } from '../controllers/store.js';
import {protect } from "../middleware/authMiddleware.js"
import { getProductsByStore } from '../controllers/products.js';
import { uploadStoreImage as uploadStoreImageMiddleware } from '../middleware/uploadMiddleware.js'
const storeRouter = Router();



storeRouter.post('/search', searchStores); //GET /api/stores/search

storeRouter.get('/', getAllStores); //GET /api/stores
storeRouter.get('/total', protect(['admin']), getTotalStores);
storeRouter.get('/top-rated', protect(['admin']), getTopRatedStores);

storeRouter.get('/:storeId/products', getProductsByStore);

// Vendor Routes
storeRouter.get('/me', protect(['seller']), getMyStore);
storeRouter.post('/create', protect(['seller']), createStore);
storeRouter.patch('/me', protect(['seller']), updateMyStore);
storeRouter.patch('/me/image', protect(['seller']), uploadStoreImageMiddleware, uploadStoreImage);

export default storeRouter;
