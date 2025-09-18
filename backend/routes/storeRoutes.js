import { Router } from 'express';
import { getAllStores, searchStores } from '../controllers/store.js';
import {protect } from "../middleware/authMiddleware.js"
import { getProductsByStore } from '../controllers/products.js';
import {upload} from '../middleware/uploadMiddleware.js'
const storeRouter = Router();



storeRouter.get('/search', searchStores); //GET /api/stores/search

storeRouter.get('/', getAllStores); //GET /api/stores

storeRouter.get('/:storeId/products', getProductsByStore);

// Vendor Routes
storeRouter.get('/me', protect(['seller']), getMyStore);
storeRouter.patch('/me', protect(['seller']), updateMyStore);
storeRouter.patch('/me/image', protect(['seller']), upload, uploadStoreImage);

export default storeRouter;